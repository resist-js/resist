<script context="module">
	/** @type {import('@resistjs/svelte-kit').Load} */
	export async function load() {
		return {
			stuff: {
				message: 'original'
			}
		};
	}
</script>

<slot></slot>
