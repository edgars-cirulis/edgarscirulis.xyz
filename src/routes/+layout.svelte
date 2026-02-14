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
				? 'Frontend inženieris no Latvijas, kas piedāvā IT atbalstu un web izstrādi.'
				: 'Frontend engineer from Latvia offering IT support and web development.';
		}
	};

	const personSchema = {
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Edgars Cirulis',
		jobTitle: 'Frontend Engineer / IT Specialist',
		url: site.url,
		address: { '@type': 'PostalAddress', addressCountry: 'LV' },
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

	<title>{site.title}</title>
	<meta name="description" content={site.desc} />

	<meta property="og:type" content="website" />
	<meta property="og:title" content={site.title} />
	<meta property="og:description" content={site.desc} />
	<meta property="og:url" content={site.url} />

	{@html `<script type="application/ld+json">${JSON.stringify(personSchema)}</script>`}
</svelte:head>

<div class="app">
	<div class="ambient" aria-hidden="true"></div>

	<main class="wrap">
		{@render children()}
	</main>
</div>

<style>
	:root {
		--bg: #050607;
		--bg-soft: #0a0c10;
		--text: #e9edf3;
	}

	:global(html) {
		background: radial-gradient(1200px 900px at 50% -10%, var(--bg-soft), var(--bg));
		scrollbar-gutter: stable; /* ✅ keeps center stable */
	}

	:global(body) {
		margin: 0;
		min-height: 100%;
		color: var(--text);
		font-family: Inter, system-ui, sans-serif;
		-webkit-font-smoothing: antialiased;
	}

	* {
		box-sizing: border-box;
	}

	.app {
		min-height: 100vh;
		position: relative;
	}

	.wrap {
		position: relative;
		z-index: 1;
		width: 100%;
		padding: 0;
	}

	.ambient {
		position: fixed;
		inset: 0;
		pointer-events: none;
		background:
			radial-gradient(800px 600px at 10% 0%, rgba(125, 211, 252, 0.08), transparent 60%),
			radial-gradient(900px 700px at 90% 10%, rgba(167, 139, 250, 0.08), transparent 60%),
			radial-gradient(700px 600px at 50% 100%, rgba(52, 211, 153, 0.06), transparent 60%);
		filter: blur(40px);
		opacity: 0.8;
	}
</style>
