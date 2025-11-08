<script lang="ts">
	import favicon from '$lib/assets/58264013.jpg';

	export let children: any;
	export let data: { lang?: 'lv' | 'en' };

	$: lang = data.lang ?? 'lv';

	const site = {
		url: 'https://edgarscirulis.xyz',
		get title() {
			return lang === 'lv'
				? 'Edgars Cīrulis – Frontend inženieris un IT pakalpojumi Latvijā'
				: 'Edgars Cīrulis – Frontend Engineer & IT Services in Latvia';
		},
		get desc() {
			return lang === 'lv'
				? 'Edgara Cīrulis – frontend inženieris no Latvijas, kas piedāvā datoru remontu, IT atbalstu un web izstrādi.'
				: 'Edgars Cīrulis - frontend engineer from Latvia offering computer repair, IT support and web development services.';
		}
	};

	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Edgars Cirulis',
		alternateName: [
			'Edgars Cīrulis',
			'Edgars Cirulis',
			'Edgars C. Cīrulis',
			'Edgars C. Cirulis',
			'Edgars Cirulis (datoru remonts)',
			'Edgars Cirulis IT specialist'
		],
		jobTitle: 'Frontend Engineer / IT Specialist',
		url: site.url,
		address: { '@type': 'PostalAddress', addressCountry: 'LV' },
		knowsAbout: [
			'Computer repair',
			'Datoru remonts',
			'IT support',
			'IT speciālists',
			'Frontend development',
			'SvelteKit',
			'Web development',
			'Veiktspējas optimizācija'
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
	<meta name="theme-color" content="#050607" />
	<link rel="canonical" href={site.url} />
	<meta
		name="keywords"
		content="Edgars Cīrulis, Edgars Cirulis, Edgars Cirulis datoru remonts, Edgars Cīrulis IT, datoru remonts, IT speciālists, frontend engineer, SvelteKit, web development, Latvija"
	/>

	<link
		rel="preload"
		href="/fonts/inter-v20-latin-500.woff2"
		as="font"
		type="font/woff2"
		crossorigin="anonymous"
	/>

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
		<span class="aurora a1"></span>
		<span class="aurora a2"></span>
		<span class="aurora a3"></span>
		<span class="vignette"></span>
	</div>

	<main class="wrap">
		{@render children()}
	</main>
</div>

<style>
	/* Fonts: reduced to essential weights for perf */
	@font-face {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url('/fonts/inter-v20-latin-regular.woff2') format('woff2');
	}
	@font-face {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 500;
		font-display: swap;
		src: url('/fonts/inter-v20-latin-500.woff2') format('woff2');
	}
	@font-face {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 700;
		font-display: swap;
		src: url('/fonts/inter-v20-latin-700.woff2') format('woff2');
	}

	@font-face {
		font-family: 'Sora';
		font-style: normal;
		font-weight: 700;
		font-display: swap;
		src: url('/fonts/sora-v17-latin-700.woff2') format('woff2');
	}

	:root {
		color-scheme: light dark;

		--bg: #050607;
		--bg-2: #0a0c10;

		--surface: rgba(18, 19, 22, 0.7);
		--surface-strong: rgba(22, 23, 26, 0.92);
		--surface-soft: rgba(255, 255, 255, 0.05);

		--border: rgba(255, 255, 255, 0.08);
		--border-strong: rgba(255, 255, 255, 0.14);

		--text: #e9edf3;
		--muted: rgba(233, 237, 243, 0.68);

		--tint: #7dd3fc;
		--tint-2: #a78bfa;
		--tint-green: #34d399;

		--radius-xl: 22px;
		--radius-lg: 18px;
		--radius-md: 14px;

		--pad: 24px;
		--pad-sm: 14px;

		--font-body: 'Inter', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
		--font-head: 'Sora', var(--font-body);

		--shadow-1: 0 10px 30px rgba(0, 0, 0, 0.35);
		--shadow-2: 0 18px 60px rgba(0, 0, 0, 0.5);

		--glass-blur: 26px;
		--glass-sat: 160%;
		--glass-bright: 1.05;

		--ring: 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
	}

	@media (prefers-color-scheme: light) {
		:root {
			--bg: #f4f6fb;
			--bg-2: #eef2f8;

			--surface: rgba(255, 255, 255, 0.8);
			--surface-strong: rgba(255, 255, 255, 0.98);
			--surface-soft: rgba(0, 0, 0, 0.03);

			--border: rgba(8, 10, 15, 0.08);
			--border-strong: rgba(8, 10, 15, 0.12);

			--text: #0b0f16;
			--muted: rgba(11, 15, 22, 0.62);

			--tint: #0ea5e9;
			--tint-2: #6366f1;
			--tint-green: #10b981;

			--shadow-1: 0 8px 24px rgba(12, 18, 28, 0.08);
			--shadow-2: 0 16px 50px rgba(12, 18, 28, 0.12);
			--ring: 0 0 0 1px rgba(0, 0, 0, 0.03) inset;
		}
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	:global(html),
	:global(body) {
		margin: 0;
		height: 100%;
		background: radial-gradient(1200px 900px at 50% -10%, var(--bg-2), var(--bg));
		color: var(--text);
		font: 500 15px/1.6 var(--font-body);
		-webkit-font-smoothing: antialiased;
		text-rendering: optimizeLegibility;
		-webkit-tap-highlight-color: transparent;
	}

	:global(body) {
		-webkit-overflow-scrolling: touch;
	}

	:global(*) {
		box-sizing: border-box;
	}

	.app {
		min-height: 100dvh;
		position: relative;
		isolation: isolate;
	}

	.wrap {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 1120px; /* was 900px */
		margin-inline: auto;
		padding: max(28px, env(safe-area-inset-top)) clamp(16px, 4vw, 32px)
			max(56px, env(safe-area-inset-bottom));
		display: grid;
		gap: 22px;
	}

	.ambient {
		position: fixed;
		inset: 0;
		z-index: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.bg {
		position: absolute;
		inset: -12% -12% 0 -12%;
		background:
			radial-gradient(
				1200px 800px at 8% -12%,
				color-mix(in srgb, var(--tint) 15%, transparent),
				transparent 58%
			),
			radial-gradient(
				1100px 900px at 92% 8%,
				color-mix(in srgb, var(--tint-2) 14%, transparent),
				transparent 62%
			),
			radial-gradient(900px 900px at 50% 90%, rgba(255, 255, 255, 0.05), transparent 60%),
			linear-gradient(180deg, var(--bg-2), var(--bg));
		filter: saturate(115%);
	}

	.aurora {
		position: absolute;
		width: 60vmax;
		height: 60vmax;
		border-radius: 999px;
		filter: blur(48px) saturate(125%);
		opacity: 0.2;
		animation: float 18s ease-in-out infinite;
	}

	.aurora.a1 {
		left: -10vmax;
		top: -15vmax;
		background: radial-gradient(
			circle,
			color-mix(in srgb, var(--tint) 80%, transparent),
			transparent 60%
		);
	}

	.aurora.a2 {
		right: -12vmax;
		top: -8vmax;
		background: radial-gradient(
			circle,
			color-mix(in srgb, var(--tint-2) 80%, transparent),
			transparent 60%
		);
		animation-duration: 22s;
	}

	.aurora.a3 {
		left: 10vmax;
		bottom: -18vmax;
		background: radial-gradient(
			circle,
			color-mix(in srgb, var(--tint-green) 65%, transparent),
			transparent 60%
		);
		animation-duration: 26s;
	}

	@keyframes float {
		0%,
		100% {
			transform: translate3d(0, 0, 0) scale(1);
		}
		50% {
			transform: translate3d(0, 4vmax, 0) scale(1.06);
		}
	}

	.vignette {
		position: absolute;
		inset: 0;
		/* softer than before */
		background:
			radial-gradient(120vmax 120vmax at 50% -20%, rgba(0, 0, 0, 0.22), transparent 55%),
			radial-gradient(140vmax 140vmax at 50% 120%, rgba(0, 0, 0, 0.28), transparent 65%);
	}

	:global(:focus-visible) {
		outline: 2px solid color-mix(in srgb, var(--tint) 60%, white);
		outline-offset: 3px;
		border-radius: 12px;
	}

	@media (prefers-reduced-transparency: reduce) {
		:root {
			--glass-blur: 0px;
		}
		.aurora {
			animation: none;
			filter: blur(30px);
			opacity: 0.12;
		}
	}
</style>
