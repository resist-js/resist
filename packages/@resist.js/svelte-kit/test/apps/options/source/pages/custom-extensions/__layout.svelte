<script>
	import { goto, prefetch, prefetchRoutes } from '$app/navigation';

	if (typeof window !== 'undefined') {
		Object.assign(window, { goto, prefetch, prefetchRoutes });
	}
</script>

<slot />

<footer>Custom layout</footer>
