/** @type {import('@resistjs/svelte-kit').RequestHandler} */
export function get(req) {
	return { body: req.params.slug };
}
