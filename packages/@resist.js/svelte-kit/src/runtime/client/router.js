import { get_base_uri } from './utils';

function scroll_state() {
	return {
		x: pageXOffset,
		y: pageYOffset
	};
}

/**
 * @param {Node | null} node
 * @returns {HTMLAnchorElement | SVGAElement | null}
 */
function find_anchor(node) {
	while (node && node.nodeName.toUpperCase() !== 'A') node = node.parentNode; // SVG <a> elements have a lowercase name
	return /** @type {HTMLAnchorElement | SVGAElement} */ (node);
}

/**
 * @param {HTMLAnchorElement | SVGAElement} node
 * @returns {URL}
 */
function get_href(node) {
	return node instanceof SVGAElement
		? new URL(node.href.baseVal, document.baseURI)
		: new URL(node.href);
}

export class Router {
	/**
	 * @param {{
	 *    base: string;
	 *    routes: import('types/internal').CSRRoute[];
	 *    trailing_slash: import('types/internal').TrailingSlash;
	 *    renderer: import('./renderer').Renderer
	 * }} opts
	 */
	constructor({ base, routes, trailing_slash, renderer }) {
		this.base = base;
		this.routes = routes;
		this.trailing_slash = trailing_slash;
		/** Keeps tracks of multiple navigations caused by redirects during rendering */
		this.navigating = 0;

		/** @type {import('./renderer').Renderer} */
		this.renderer = renderer;
		renderer.router = this;

		this.enabled = true;

		// make it possible to reset focus
		document.body.setAttribute('tabindex', '-1');

		// create initial history entry, so we can return here
		history.replaceState(history.state || {}, '', location.href);
	}

	init_listeners() {
		if ('scrollRestoration' in history) {
			history.scrollRestoration = 'manual';
		}

		// Adopted from Nuxt.js
		// Reset scrollRestoration to auto when leaving page, allowing page reload
		// and back-navigation from other pages to use the browser to restore the
		// scrolling position.
		addEventListener('beforeunload', () => {
			history.scrollRestoration = 'auto';
		});

		// Setting scrollRestoration to manual again when returning to this page.
		addEventListener('load', () => {
			history.scrollRestoration = 'manual';
		});

		// There's no API to capture the scroll location right before the user
		// hits the back/forward button, so we listen for scroll events

		/** @type {NodeJS.Timeout} */
		let scroll_timer;
		addEventListener('scroll', () => {
			clearTimeout(scroll_timer);
			scroll_timer = setTimeout(() => {
				// Store the scroll location in the history
				// This will persist even if we navigate away from the site and come back
				const new_state = {
					...(history.state || {}),
					'sveltekit:scroll': scroll_state()
				};
				history.replaceState(new_state, document.title, window.location.href);
			}, 50);
		});

		/** @param {MouseEvent|TouchEvent} event */
		const trigger_prefetch = (event) => {
			const a = find_anchor(/** @type {Node} */ (event.target));
			if (a && a.href && a.hasAttribute('sveltekit:prefetch')) {
				this.prefetch(get_href(a));
			}
		};

		/** @type {NodeJS.Timeout} */
		let mousemove_timeout;

		/** @param {MouseEvent|TouchEvent} event */
		const handle_mousemove = (event) => {
			clearTimeout(mousemove_timeout);
			mousemove_timeout = setTimeout(() => {
				trigger_prefetch(event);
			}, 20);
		};

		addEventListener('touchstart', trigger_prefetch);
		addEventListener('mousemove', handle_mousemove);

		/** @param {MouseEvent} event */
		addEventListener('click', (event) => {
			if (!this.enabled) return;

			// Adapted from https://github.com/visionmedia/page.js
			// MIT license https://github.com/visionmedia/page.js#license
			if (event.button || event.which !== 1) return;
			if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
			if (event.defaultPrevented) return;

			const a = find_anchor(/** @type {Node} */ (event.target));
			if (!a) return;

			if (!a.href) return;

			const url = get_href(a);
			const url_string = url.toString();
			if (url_string === location.href) {
				if (!location.hash) event.preventDefault();
				return;
			}

			// Ignore if tag has
			// 1. 'download' attribute
			// 2. 'rel' attribute includes external
			const rel = (a.getAttribute('rel') || '').split(/\s+/);

			if (a.hasAttribute('download') || (rel && rel.includes('external'))) {
				return;
			}

			// Ignore if <a> has a target
			if (a instanceof SVGAElement ? a.target.baseVal : a.target) return;

			if (!this.owns(url)) return;

			const noscroll = a.hasAttribute('sveltekit:noscroll');

			const i1 = url_string.indexOf('#');
			const i2 = location.href.indexOf('#');
			const u1 = i1 >= 0 ? url_string.substring(0, i1) : url_string;
			const u2 = i2 >= 0 ? location.href.substring(0, i2) : location.href;
			history.pushState({}, '', url.href);
			if (u1 === u2) {
				window.dispatchEvent(new HashChangeEvent('hashchange'));
			}
			this._navigate(url, noscroll ? scroll_state() : null, false, [], url.hash);
			event.preventDefault();
		});

		addEventListener('popstate', (event) => {
			if (event.state && this.enabled) {
				const url = new URL(location.href);
				this._navigate(url, event.state['sveltekit:scroll'], false, []);
			}
		});
	}

	/** @param {URL} url */
	owns(url) {
		return url.origin === location.origin && url.pathname.startsWith(this.base);
	}

	/**
	 * @param {URL} url
	 * @returns {import('./types').NavigationInfo | undefined}
	 */
	parse(url) {
		if (this.owns(url)) {
			const path = url.pathname.slice(this.base.length) || '/';

			const decoded_path = decodeURI(path);
			const routes = this.routes.filter(([pattern]) => pattern.test(decoded_path));

			const query = new URLSearchParams(url.search);
			const id = `${path}?${query}`;

			return { id, routes, path, decoded_path, query };
		}
	}

	/**
	 * @typedef {Parameters<typeof import('$app/navigation').goto>} GotoParams
	 *
	 * @param {GotoParams[0]} href
	 * @param {GotoParams[1]} opts
	 * @param {string[]} chain
	 */
	async goto(
		href,
		{ noscroll = false, replaceState = false, keepfocus = false, state = {} } = {},
		chain
	) {
		const url = new URL(href, get_base_uri(document));

		if (this.enabled && this.owns(url)) {
			history[replaceState ? 'replaceState' : 'pushState'](state, '', href);
			return this._navigate(url, noscroll ? scroll_state() : null, keepfocus, chain, url.hash);
		}

		location.href = url.href;
		return new Promise(() => {
			/* never resolves */
		});
	}

	enable() {
		this.enabled = true;
	}

	disable() {
		this.enabled = false;
	}

	/**
	 * @param {URL} url
	 * @returns {Promise<import('./types').NavigationResult>}
	 */
	async prefetch(url) {
		const info = this.parse(url);

		if (!info) {
			throw new Error('Attempted to prefetch a URL that does not belong to this app');
		}

		return this.renderer.load(info);
	}

	/**
	 * @param {URL} url
	 * @param {{ x: number, y: number }?} scroll
	 * @param {boolean} keepfocus
	 * @param {string[]} chain
	 * @param {string} [hash]
	 */
	async _navigate(url, scroll, keepfocus, chain, hash) {
		const info = this.parse(url);

		if (!info) {
			throw new Error('Attempted to navigate to a URL that does not belong to this app');
		}

		if (!this.navigating) {
			dispatchEvent(new CustomEvent('sveltekit:navigation-start'));
		}
		this.navigating++;

		// remove trailing slashes
		if (info.path !== '/') {
			const has_trailing_slash = info.path.endsWith('/');

			const incorrect =
				(has_trailing_slash && this.trailing_slash === 'never') ||
				(!has_trailing_slash &&
					this.trailing_slash === 'always' &&
					!(info.path.split('/').pop() || '').includes('.'));

			if (incorrect) {
				info.path = has_trailing_slash ? info.path.slice(0, -1) : info.path + '/';
				history.replaceState({}, '', `${this.base}${info.path}${location.search}`);
			}
		}

		await this.renderer.handle_navigation(info, chain, false, { hash, scroll, keepfocus });

		this.navigating--;
		if (!this.navigating) {
			dispatchEvent(new CustomEvent('sveltekit:navigation-end'));
		}
	}
}
