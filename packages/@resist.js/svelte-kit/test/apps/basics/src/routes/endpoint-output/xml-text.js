/** @type {import('@resistjs/svelte-kit').RequestHandler} */
export const get = () => {
	const body = '<foo />';
	return { status: 200, headers: { 'content-type': 'application/xml' }, body };
};
