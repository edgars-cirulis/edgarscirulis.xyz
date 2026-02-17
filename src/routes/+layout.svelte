<script lang="ts">
	// no logic needed
</script>

<!-- Full-bleed layout wrapper (prevents any parent container from breaking centering) -->
<div class="app">
	<slot />
</div>

<style>
	:global(html, body) {
		margin: 0;
		padding: 0;
		height: 100%;
		background: #050509;
	}

	:global(body) {
		overflow-x: hidden;
	}

	/* Ensures the route always has full height */
	.app {
		min-height: 100dvh;
	}
</style>
