<script lang="ts">
	import favicon from '$lib/assets/58264013.jpg';

	let { children } = $props();

	const site = {
		url: 'https://edgarscirulis.xyz',
		title: 'Edgars Cīrulis',
		desc: 'Frontend Engineer in Latvia.'
	};
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="theme-color" content="#000000" />
	<link rel="canonical" href={site.url} />

	<title>{site.title}</title>
	<meta name="description" content={site.desc} />
	<meta name="robots" content="index,follow" />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={site.title} />
	<meta property="og:description" content={site.desc} />
	<meta property="og:url" content={site.url} />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={site.title} />
	<meta name="twitter:description" content={site.desc} />
</svelte:head>

<div class="app">
	<div class="ambient" aria-hidden="true">
		<span class="bg"></span>
		<span class="weave"></span>
		<span class="grain"></span>
		<span class="ringlight"></span>
		<span class="vignette"></span>
	</div>

	<main class="wrap">
		{@render children()}
	</main>
</div>

<style>
	:root {
		color-scheme: light dark;

		--bg: #070708;
		--surface: #0b0b0c;
		--surface-2: #111113;
		--elev: #0e0e10;
		--chip: #101113;
		--icon-surface: #121214;
		--ghost: #0f1012;
		--border: #1a1b1e;
		--text: #e9e9ee;
		--muted: #9da1a8;

		--radius: 20px;
		--pad: 18px;

		--carbon-a: #0a0b0d;
		--carbon-b: #0f1013;
		--carbon-gloss: rgba(255, 255, 255, 0.03);

		--vig-top: 0.5;
		--vig-bottom: 0.52;
	}

	@media (prefers-color-scheme: light) {
		:root {
			--bg: #fbfbfd;
			--surface: #ffffff;
			--surface-2: #ffffff;
			--elev: #ffffff;
			--chip: #ffffff;
			--icon-surface: #f3f4f6;
			--ghost: #f6f7f9;
			--border: #e6e8ee;
			--text: #0c0d10;
			--muted: #606571;

			--carbon-a: #f3f4f7;
			--carbon-b: #ffffff;
			--carbon-gloss: rgba(0, 0, 0, 0.04);

			--vig-top: 0.08;
			--vig-bottom: 0.1;
		}
	}

	:global(html),
	:global(body) {
		margin: 0;
		height: 100%;
		background: var(--bg);
		color: var(--text);
		font:
			500 16px/1.55 -apple-system,
			BlinkMacSystemFont,
			'SF Pro Text',
			'SF Pro Display',
			Segoe UI,
			Roboto,
			Inter,
			Arial,
			sans-serif;
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeLegibility;
		-webkit-tap-highlight-color: transparent;
	}

	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}

	.app {
		min-height: 100dvh;
	}

	.wrap {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 760px;
		margin-inline: auto;
		padding: max(20px, env(safe-area-inset-top)) clamp(16px, 4vw, 28px)
			max(44px, env(safe-area-inset-bottom));
		display: grid;
		gap: 16px;
	}

	.ambient {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
		transform: translateZ(0);
		contain: paint;
	}

	.bg {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			var(--bg) 0%,
			color-mix(in srgb, var(--bg) 90%, #101217) 55%,
			var(--bg) 100%
		);
	}

	.weave {
		position: absolute;
		inset: 0;
		opacity: 0.55;
		background:
			repeating-linear-gradient(45deg, var(--carbon-a) 0 6px, var(--carbon-b) 6px 12px),
			repeating-linear-gradient(-45deg, transparent 0 6px, var(--carbon-gloss) 6px 12px);
		background-blend-mode: normal;
	}

	@media (min-width: 900px) {
		.weave {
			opacity: 0.5;
		}
	}

	.grain {
		position: absolute;
		inset: 0;
		opacity: 0.06;
		mix-blend-mode: overlay;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAQAAACENnfnAAAAF0lEQVQYV2NkYGD4z0AaGJiBBTgAQ9oAA2cJ3g8g7e7iAAAAAElFTkSuQmCC');
		background-size: 200px 200px;
	}
	@media (prefers-color-scheme: light) {
		.grain {
			opacity: 0.08;
			mix-blend-mode: multiply;
		}
	}

	.ringlight {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			120vmax 90vmax at 50% 60%,
			rgba(255, 255, 255, 0.05),
			transparent 60%
		);
	}

	@media (prefers-color-scheme: light) {
		.ringlight {
			background: radial-gradient(120vmax 90vmax at 50% 60%, rgba(0, 0, 0, 0.03), transparent 60%);
		}
	}

	.vignette {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(120vmax 120vmax at 50% -10%, rgba(0, 0, 0, var(--vig-top)), transparent 55%),
			radial-gradient(
				130vmax 130vmax at 50% 115%,
				rgba(0, 0, 0, var(--vig-bottom)),
				transparent 60%
			);
	}

	:global(:focus-visible) {
		outline: 2px solid color-mix(in srgb, #86e7c2 55%, white);
		outline-offset: 2px;
		border-radius: 12px;
	}
</style>
