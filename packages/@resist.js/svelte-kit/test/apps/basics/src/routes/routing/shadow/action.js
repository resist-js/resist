let random = 0;

/** @type {import('@resistjs/svelte-kit').RequestHandler<any, FormData>} */
export function post({ body }) {
	random = +body.get('random');
}

export function get() {
	return {
		body: {
			random
		}
	};
}
