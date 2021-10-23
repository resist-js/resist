import { read_only_form_data } from './read_only_form_data.js';

/**
 * @param {import('types/app').RawBody} raw
 * @param {import('types/helper').RequestHeaders} headers
 */
export function parse_body(raw, headers) {
	if (!raw) return raw;

	const content_type = headers['content-type'];
	const [type, ...directives] = content_type ? content_type.split(/;\s*/) : [];

	const text = () => new TextDecoder(headers['content-encoding'] || 'utf-8').decode(raw);

	switch (type) {
		case 'text/plain':
			return text();

		case 'application/json':
			return JSON.parse(text());

		case 'application/x-www-form-urlencoded':
			return get_urlencoded(text());

		case 'multipart/form-data': {
			const boundary = directives.find((directive) => directive.startsWith('boundary='));
			if (!boundary) throw new Error('Missing boundary');
			return get_multipart(text(), boundary.slice('boundary='.length));
		}
		default:
			return raw;
	}
}

/** @param {string} text */
function get_urlencoded(text) {
	const { data, append } = read_only_form_data();

	text
		.replace(/\+/g, ' ')
		.split('&')
		.forEach((str) => {
			const [key, value] = str.split('=');
			append(decodeURIComponent(key), decodeURIComponent(value));
		});

	return data;
}

/**
 * @param {string} text
 * @param {string} boundary
 */
function get_multipart(text, boundary) {
	const parts = text.split(`--${boundary}`);

	if (parts[0] !== '' || parts[parts.length - 1].trim() !== '--') {
		throw new Error('Malformed form data');
	}

	const { data, append } = read_only_form_data();

	parts.slice(1, -1).forEach((part) => {
		const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
		if (!match) {
			throw new Error('Malformed form data');
		}
		const raw_headers = match[1];
		const body = match[2].trim();

		let key;

		/** @type {Record<string, string>} */
		const headers = {};
		raw_headers.split('\r\n').forEach((str) => {
			const [raw_header, ...raw_directives] = str.split('; ');
			let [name, value] = raw_header.split(': ');

			name = name.toLowerCase();
			headers[name] = value;

			/** @type {Record<string, string>} */
			const directives = {};
			raw_directives.forEach((raw_directive) => {
				const [name, value] = raw_directive.split('=');
				directives[name] = JSON.parse(value); // TODO is this right?
			});

			if (name === 'content-disposition') {
				if (value !== 'form-data') throw new Error('Malformed form data');

				if (directives.filename) {
					// TODO we probably don't want to do this automatically
					throw new Error('File upload is not yet implemented');
				}

				if (directives.name) {
					key = directives.name;
				}
			}
		});

		if (!key) throw new Error('Malformed form data');

		append(key, body);
	});

	return data;
}
