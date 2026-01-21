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
		<!-- Spotify -->
		<section class="card">
			<div class="card-head">
				<h1 class="title">
					<Icon icon="lucide:audio-lines" width="18" />
					<span>{t('Šobrīd skan', 'Now playing')}</span>
				</h1>
				<span class="hint">{t('Ja ir ieslēgts Spotify.', 'If Spotify is active.')}</span>
			</div>

			{#await nowPlayingModule then mod}
				<svelte:component this={mod.default} spotify={data.spotify} />
			{/await}
		</section>

		<!-- Samantha -->
		<section class="card love" aria-label={t('Sveiciens Samantai', 'A note for Samantha')}>
			<div class="love-left">
				<div class="heartchip" aria-hidden="true">
					<Icon icon="lucide:heart" width="18" />
				</div>

				<div class="beats" aria-hidden="true">
					<span></span><span></span><span></span><span></span><span></span>
				</div>
			</div>

			<div class="love-body">
				<div class="love-top">
					<div class="love-title">Samantha</div>
					<span class="love-tag">
						<Icon icon="lucide:sparkles" width="14" />
						{t('mazs sveiciens', 'a little note')}
					</span>
				</div>

				<p class="love-text">
					{t(
						'Paldies, ka esi. Lai šodiena ir maiga, un mūzika — tieši īstajā noskaņā. 💜',
						'Thank you for being you. May today be gentle, and the music land exactly right. 💜'
					)}
				</p>

				<div class="love-footer muted">
					<span class="pulse-dot"></span>
					<span>{t('Sirds ritmā ar mūziku.', 'In rhythm with the music.')}</span>
				</div>
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
		justify-content: space-between;
		align-items: center;
		padding: 10px 12px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--surface) 85%, rgba(0, 0, 0, 0.1));
		border: 1px solid var(--border);
		box-shadow: var(--ring), 0 16px 50px rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(14px) saturate(140%);
	}

	.lang {
		display: inline-flex;
		gap: 8px;
		padding: 7px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.03);
	}

	.lang a {
		text-decoration: none;
		color: var(--muted);
		font-size: 0.85rem;
	}

	.lang a.active {
		color: var(--text);
		font-weight: 750;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--tint) 40%, var(--border));
		text-decoration: none;
		color: var(--text);
		background: rgba(255, 255, 255, 0.03);
	}

	.wrap {
		display: grid;
		gap: 14px;
	}

	.card {
		padding: 18px;
		border-radius: var(--radius-xl);
		background: var(--surface-strong);
		border: 1px solid var(--border-strong);
		box-shadow: var(--shadow-1);
		backdrop-filter: blur(var(--glass-blur));
	}

	.card-head {
		display: flex;
		justify-content: space-between;
		margin-bottom: 10px;
	}

	.title {
		display: flex;
		align-items: center;
		gap: 8px;
		font-family: var(--font-head);
		font-size: 1.05rem;
	}

	.hint {
		color: var(--muted);
		font-size: 0.85rem;
	}

	/* Samantha card */
	.love {
		display: grid;
		grid-template-columns: 84px 1fr;
		gap: 14px;
		background:
			radial-gradient(900px 320px at 0% 0%, rgba(139, 92, 246, 0.18), transparent 60%),
			var(--surface-strong);
	}

	.love-left {
		display: grid;
		justify-items: center;
		gap: 10px;
	}

	.heartchip {
		width: 46px;
		height: 46px;
		border-radius: 16px;
		display: grid;
		place-items: center;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.05);
		animation: pulse 1.8s ease-in-out infinite;
	}

	@keyframes pulse {
		50% {
			transform: scale(1.06);
		}
	}

	.beats {
		display: grid;
		grid-auto-flow: column;
		gap: 4px;
		height: 22px;
	}

	.beats span {
		width: 4px;
		background: linear-gradient(var(--tint), var(--tint-2));
		border-radius: 999px;
		animation: beat 1.1s ease-in-out infinite;
	}

	.beats span:nth-child(odd) {
		animation-delay: -0.3s;
	}

	@keyframes beat {
		50% {
			height: 100%;
		}
	}

	.love-title {
		font-weight: 900;
		font-size: 1.05rem;
	}

	.love-tag {
		font-size: 0.85rem;
		color: var(--muted);
	}

	.love-text {
		line-height: 1.65;
	}

	.love-footer {
		margin-top: 10px;
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.pulse-dot {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background: var(--tint-green);
		animation: dot 1.6s ease-in-out infinite;
	}

	@keyframes dot {
		50% {
			transform: scale(1.3);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.heartchip,
		.beats span,
		.pulse-dot {
			animation: none;
		}
	}
</style>
