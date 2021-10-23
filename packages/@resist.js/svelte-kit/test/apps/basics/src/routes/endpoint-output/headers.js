/** @type {import('@resistjs/svelte-kit').RequestHandler} */
export function get() {
	return {
		headers: {
			'Set-Cookie': 'foo=bar'
		}
	};
}
