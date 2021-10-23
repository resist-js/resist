<script context="module">
	/** @type {import('@resistjs/svelte-kit').Load} */
	export async function load() {
		return { status: 555, error: new Error('Not found') };
	}
</script>
