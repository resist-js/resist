/** @type {import('@resistjs/svelte-kit').RequestHandler<any, string>} */
export function post(request) {
	return {
		body: request.body.toUpperCase()
	};
}
