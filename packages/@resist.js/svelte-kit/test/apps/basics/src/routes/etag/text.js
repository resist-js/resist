/** @type {import('@resistjs/svelte-kit').RequestHandler} */
export function get() {
	return {
		body: 'some text'
	};
}
