<script context="module">
	/** @type {import('@resistjs/svelte-kit').Load} */
	export async function load({ fetch }) {
		const res = await fetch('/load/serialization.json');
		return {
			props: await res.json()
		};
	}
</script>

<script>
	/** @type {number} */
	export let answer;
</script>

<h1>{answer}</h1>
