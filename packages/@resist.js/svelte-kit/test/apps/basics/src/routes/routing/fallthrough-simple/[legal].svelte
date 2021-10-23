<script context="module">
	/** @type {import("@resistjs/svelte-kit").Load} */
	export const load = ({ page }) => {
		if (page.path === '/valid') {
			return {
				props: {}
			};
		} else {
			return;
		}
	};
</script>

<h1>Legal</h1>
