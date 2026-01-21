<script lang="ts">
	import Icon from '@iconify/svelte';
	import { mailto } from '$lib/utils';

	type Spotify = {
		playing: boolean;
		title: string;
		artist: string;
		album: string;
		url: string;
		image: string;
	};

	export let data: {
		spotify: Spotify | null;
		me: typeof import('$lib/me').me;
		lang: 'lv' | 'en';
	};

	const { me, lang } = data;
	const nowPlayingModule = import('$lib/components/NowPlaying.svelte');

	const t = (lv: string, en: string) => (lang === 'lv' ? lv : en);
</script>

<svelte:head>
	<title>{me.name} · {t('Šobrīd skan', 'Now playing')}</title>
	<meta
		name="description"
		content={t(
			'Spotify “Now playing” un neliels sveiciens Samantai.',
			'Spotify “Now playing” and a small note for Samantha.'
		)}
	/>
</svelte:head>

<div class="page">
	<header class="top">
		<nav class="lang" aria-label="Language switcher">
			<a href="/" class:active={lang === 'lv'}>LV</a>
			<span aria-hidden="true">·</span>
			<a href="/en" class:active={lang === 'en'}>EN</a>
		</nav>

		<a class="cta" href={mailto(me.email)} rel="noopener">
			<Icon icon="lucide:mail" width="16" />
			<span>{t('Sazināties', 'Contact')}</span>
		</a>
	</header>

	<main class="wrap">
		<section class="card" aria-labelledby="np-heading">
			<div class="card-head">
				<h1 id="np-heading" class="title">
					<Icon icon="lucide:audio-lines" width="18" aria-hidden="true" />
					<span>{t('Šobrīd skan', 'Now playing')}</span>
				</h1>
				<span class="hint">{t('Ja ir ieslēgts Spotify.', 'If Spotify is active.')}</span>
			</div>

			{#await nowPlayingModule then mod}
				<svelte:component this={mod.default} spotify={data.spotify} />
			{/await}
		</section>

		<section class="card love" aria-label={t('Sveiciens Samantai', 'A note for Samantha')}>
			<div class="love-ic" aria-hidden="true">
				<Icon icon="lucide:heart" width="18" />
			</div>

			<div class="love-body">
				<div class="love-title">{t('Samantha', 'Samantha')}</div>
				<p class="love-text">
					{t(
						'Paldies, ka esi. Lai šodiena ir maiga, un mūzika — tieši īstajā noskaņā. 💜',
						'Thank you for being you. May today be gentle, and the music land exactly right. 💜'
					)}
				</p>
			</div>
		</section>
	</main>
</div>

<style>
	.page {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 18px;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 10px 12px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--surface) 85%, rgba(0, 0, 0, 0.1));
		border: 1px solid var(--border);
		box-shadow: var(--ring), 0 16px 50px rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(14px) saturate(140%);
	}

	.lang {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 7px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.03);
	}

	.lang a {
		color: var(--muted);
		text-decoration: none;
		opacity: 0.85;
		transition: opacity 0.12s ease, color 0.12s ease;
		font-size: 0.85rem;
	}

	.lang a.active {
		opacity: 1;
		color: var(--text);
		font-weight: 750;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		border-radius: 999px;
		text-decoration: none;
		color: var(--text);
		border: 1px solid color-mix(in srgb, var(--tint) 38%, var(--border));
		background: radial-gradient(120% 140% at 0% 0%, rgba(139, 92, 246, 0.18), transparent 55%),
			rgba(255, 255, 255, 0.03);
		box-shadow: var(--ring);
		transition: transform 0.14s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.14s ease,
			box-shadow 0.14s ease;
	}

	.cta:hover {
		transform: translateY(-1px);
		border-color: color-mix(in srgb, var(--tint) 55%, var(--border));
		box-shadow: var(--ring), 0 0 30px rgba(139, 92, 246, 0.28);
	}

	.wrap {
		width: 100%;
		display: grid;
		gap: 14px;
		align-content: start;
	}

	.card {
		position: relative;
		overflow: hidden;
		border-radius: var(--radius-xl);
		padding: 18px;
		background: var(--surface-strong);
		border: 1px solid var(--border-strong);
		box-shadow: var(--shadow-1);
		backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-sat))
			brightness(var(--glass-bright));
	}

	.card::before {
		content: '';
		position: absolute;
		inset: -40% -20% auto -20%;
		height: 60%;
		background: radial-gradient(800px 260px at 30% 0%, rgba(255, 255, 255, 0.12), transparent 70%);
		opacity: 0.45;
		pointer-events: none;
	}

	.card-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 10px;
	}

	.title {
		margin: 0;
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-head);
		font-size: 1.05rem;
		letter-spacing: -0.01em;
	}

	.hint {
		color: var(--muted);
		font-size: 0.85rem;
	}

	/* Samantha note */
	.love {
		display: grid;
		grid-template-columns: 40px 1fr;
		gap: 12px;
		align-items: start;
		background: radial-gradient(900px 260px at 0% 0%, rgba(139, 92, 246, 0.14), transparent 60%),
			var(--surface-strong);
	}

	.love-ic {
		width: 40px;
		height: 40px;
		display: grid;
		place-items: center;
		border-radius: 14px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.05);
		box-shadow: var(--ring);
	}

	.love-title {
		font-weight: 850;
		letter-spacing: -0.01em;
		margin-bottom: 6px;
	}

	.love-text {
		margin: 0;
		color: color-mix(in srgb, var(--text) 90%, transparent);
		line-height: 1.6;
	}

	@media (prefers-reduced-transparency: reduce) {
		.card,
		.top {
			backdrop-filter: none;
		}
	}
</style>
