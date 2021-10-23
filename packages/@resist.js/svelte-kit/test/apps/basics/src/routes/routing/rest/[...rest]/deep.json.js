/** @type {import('@resistjs/svelte-kit').RequestHandler} */
export function get({ params }) {
	return { body: params.rest };
}
