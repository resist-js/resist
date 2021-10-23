<script context="module">
	/** @type {import('@resistjs/svelte-kit').Load} */
	export async function load({ page, stuff }) {
		return {
			stuff: {
				message: `${stuff.message} + new`,
				x: page.params.x
			}
		};
	}
</script>

<slot></slot>
