/** @type {import('@resistjs/svelte-kit').RequestHandler} */
export function get({ params }) {
	return {
		body: {
			name: params.dynamic
		}
	};
}
