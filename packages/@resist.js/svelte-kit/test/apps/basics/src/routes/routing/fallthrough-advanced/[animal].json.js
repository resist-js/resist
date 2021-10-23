const animals = new Set(['antelope', 'barracuda', 'camel', 'dingo', 'elephant']);

/** @type {import("@resistjs/svelte-kit").RequestHandler} */
export function get({ params }) {
	if (animals.has(params.animal)) {
		return {
			body: { type: 'animal' }
		};
	}
}
