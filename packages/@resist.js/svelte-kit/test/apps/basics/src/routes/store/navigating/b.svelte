<script context="module">
	/** @type {import('@resistjs/svelte-kit').Load} */
	export async function load() {
		await new Promise((f) => setTimeout(f, 50));
		return {};
	}
</script>

<p>b</p>
