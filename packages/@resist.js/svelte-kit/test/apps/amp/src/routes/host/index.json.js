/** @type {import('@resistjs/svelte-kit').RequestHandler} */
export function get({ host }) {
	return {
		body: { host }
	};
}
