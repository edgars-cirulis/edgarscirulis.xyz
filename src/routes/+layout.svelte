<script lang="ts">
	import favicon from '$lib/assets/58264013.jpg';

	let { children } = $props();

	const site = {
		url: 'https://edgarscirulis.xyz',
		title: 'Edgars Cirulis (Cīrulis) – Frontend Engineer & IT Services in Latvia',
		desc: 'Official website of Edgars Cirulis (Cīrulis), a frontend engineer from Latvia offering computer repair, IT support and web development services.'
	};

	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Edgars Cirulis',
		alternateName: 'Edgars Cīrulis',
		jobTitle: 'Frontend Engineer / Developer & IT Specialist',
		url: site.url,
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'LV'
		},
		knowsAbout: [
			'Computer repair',
			'IT support',
			'Frontend development',
			'Web development',
			'SvelteKit'
		],
		sameAs: [
			'https://github.com/edgars-cirulis',
			'https://facebook.com/edgarsscirulis',
			'https://instagram.com/e.cirulis'
		]
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

	{@html `
    <script type="application/ld+json">
      ${JSON.stringify(personSchema)}
    </script>
  `}
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
		--pad: 20px;

		--tint: #22c55e;

		--carbon-a: #0a0b0d;
		--carbon-b: #0f1013;
		--carbon-gloss: rgba(255, 255, 255, 0.03);

		--vig-top: 0.5;
		--vig-bottom: 0.52;
	}

	@media (prefers-color-scheme: light) {
		:root {
			--bg: #f5f5f9;
			--surface: #ffffff;
			--surface-2: #ffffff;
			--elev: #ffffff;
			--chip: #f9fafb;
			--icon-surface: #f3f4f6;
			--ghost: #f6f7f9;
			--border: #e1e4ee;
			--text: #0c0d10;
			--muted: #606571;

			--tint: #16a34a;

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
		background: radial-gradient(circle at top, #0e1118 0%, var(--bg) 42%, #050608 100%);
		color: var(--text);
		font:
			500 15px/1.55 system-ui,
			-apple-system,
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
		max-width: 880px;
		margin-inline: auto;
		padding: max(32px, env(safe-area-inset-top)) clamp(16px, 4vw, 32px)
			max(48px, env(safe-area-inset-bottom));
		display: grid;
		gap: 18px;
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
		background: radial-gradient(120% 150% at 50% -10%, #111827 0%, var(--bg) 48%, #020409 100%);
	}

	.weave {
		position: absolute;
		inset: 0;
		opacity: 0.5;
		background:
			repeating-linear-gradient(45deg, var(--carbon-a) 0 6px, var(--carbon-b) 6px 12px),
			repeating-linear-gradient(-45deg, transparent 0 6px, var(--carbon-gloss) 6px 12px);
		background-blend-mode: normal;
	}

	@media (min-width: 900px) {
		.weave {
			opacity: 0.45;
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
			120vmax 90vmax at 50% 62%,
			color-mix(in srgb, var(--tint) 18%, transparent),
			transparent 60%
		);
	}

	@media (prefers-color-scheme: light) {
		.ringlight {
			background: radial-gradient(
				120vmax 90vmax at 50% 60%,
				color-mix(in srgb, var(--tint) 12%, transparent),
				transparent 60%
			);
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
		outline: 2px solid color-mix(in srgb, var(--tint) 55%, white);
		outline-offset: 2px;
		border-radius: 12px;
	}
</style>
