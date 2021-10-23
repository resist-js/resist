/** @type {import('@resistjs/svelte-kit').RequestHandler} */
export function del(req) {
	return {
		status: 200,
		body: {
			id: req.params.id
		}
	};
}
