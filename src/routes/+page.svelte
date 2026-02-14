<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	type Spotify = {
		playing: boolean;
		title: string;
		artist: string;
		album: string;
		url: string;
		image: string;
		// Optional: if you want to show a playlist instead/in addition
		playlist?: { name: string; tracks: { title: string; artist: string }[] };
	};

	export let data: {
		spotify: Spotify | null;
		lang: 'lv' | 'en';
	};

	const t = (lv: string, en: string) => (data.lang === 'lv' ? lv : en);

	// Simple iOS-like vibration/haptic feedback simulation (optional, browser may block)
	function hapticFeedback() {
		if ('vibrate' in navigator) navigator.vibrate(10);
	}

	onMount(() => {
		// Could add auto-play or fetch playlist here if needed
	});
</script>

<svelte:head>
	<title>Spotify • {t('Mūzika', 'Music')}</title>
	<meta name="description" content={t('Spotify tagad spēlē', 'Spotify Now Playing')} />
	<meta name="theme-color" content="#000000" />
</svelte:head>

<div class="ios-container">
	<!-- Site unavailable overlay – covers everything on load -->
	<div class="unavailable-overlay">
		<div class="alert-card glass">
			<Icon icon="lucide:alert-triangle" width="48" class="alert-icon" />
			<h1>{t('Vietne vairs nav pieejama', 'Site No Longer Available')}</h1>
			<p class="muted">
				{t(
					'Šī lapa ir arhivēta.',
					'This page has been archived.'
				)}
			</p>
		</div>
	</div>

	<!-- Main content – Spotify focused, blurred behind overlay if desired -->
	<main class="music-player glass">
		<header class="player-header">
			<div class="lang-toggle">
				<a href="/" class:active={data.lang === 'lv'}>LV</a>
				<span>·</span>
				<a href="/en" class:active={data.lang === 'en'}>EN</a>
			</div>
			<h2>{t('Spotify', 'Spotify')}</h2>
		</header>

		{#if data.spotify}
			<div class="now-playing">
				{#if data.spotify.image}
					<img
						src={data.spotify.image}
						alt={data.spotify.album}
						class="album-art glass"
						width="240"
						height="240"
					/>
				{:else}
					<div class="album-placeholder glass">
						<Icon icon="lucide:music" width="80" />
					</div>
				{/if}

				<div class="track-info">
					<h1 class="track-title">{data.spotify.title || '—'}</h1>
					<p class="artist">{data.spotify.artist || '—'}</p>
					<p class="album muted">{data.spotify.album || '—'}</p>
				</div>

				{#if data.spotify.playing}
					<div class="playback-status playing">
						<Icon icon="lucide:play" width="24" />
						<span>{t('Tagad atskaņo', 'Now Playing')}</span>
					</div>
				{:else}
					<div class="playback-status paused">
						<Icon icon="lucide:pause" width="24" />
						<span>{t('Pauze', 'Paused')}</span>
					</div>
				{/if}

				<a
					href={data.spotify.url}
					target="_blank"
					rel="noopener noreferrer"
					class="open-spotify glass"
					on:click={hapticFeedback}
				>
					<Icon icon="lucide:external-link" width="18" />
					{t('Atvērt Spotify', 'Open in Spotify')}
				</a>
			</div>
		{:else}
			<div class="empty-state glass">
				<Icon icon="lucide:music" width="64" class="empty-icon" />
				<h2>{t('Nekas netiek atskaņots', 'Nothing Playing')}</h2>
				<p class="muted">
					{t('Atver Spotify un sāc atskaņošanu.', 'Open Spotify and start playing something.')}
				</p>
			</div>
		{/if}

		<!-- Optional: mini playlist view if data provides it -->
		{#if data.spotify?.playlist}
			<section class="playlist glass">
				<h3>{data.spotify.playlist.name}</h3>
				<ul>
					{#each data.spotify.playlist.tracks.slice(0, 5) as track}
						<li>{track.title} • {track.artist}</li>
					{/each}
				</ul>
				<p class="more muted">+ {data.spotify.playlist.tracks.length - 5} vairāk</p>
			</section>
		{/if}
	</main>
</div>

<style>
	/* iOS 2025–2026 inspired: Liquid Glass + dark mode minimalism */
	:root {
		--bg: #000000;
		--surface: rgba(30, 30, 46, 0.65);
		--glass-bg: rgba(40, 40, 60, 0.35);
		--blur: blur(24px);
		--accent: #c084fc;
		--text: #f1f5f9;
		--muted: #94a3b8;
		--radius: 28px;
	}

	.ios-container {
		min-height: 100vh;
		background: var(--bg);
		color: var(--text);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	/* Glassmorphism / Liquid Glass base */
	.glass {
		background: var(--glass-bg);
		backdrop-filter: var(--blur) saturate(180%);
		-webkit-backdrop-filter: var(--blur) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: var(--radius);
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
		overflow: hidden;
		position: relative;
	}

	.glass::before {
		content: '';
		position: absolute;
		inset: -50%;
		background: radial-gradient(circle at 30% 20%, rgba(192, 132, 252, 0.12), transparent 60%);
		pointer-events: none;
		opacity: 0.7;
	}

	/* Unavailable overlay – iOS alert style */
	.unavailable-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.85);
		backdrop-filter: blur(20px);
		display: grid;
		place-items: center;
		z-index: 100;
		padding: 2rem;
	}

	.alert-card {
		max-width: 360px;
		text-align: center;
		padding: 2.5rem 1.8rem;
	}

	.alert-icon {
		color: #f87171;
		margin-bottom: 1rem;
	}

	.alert-card h1 {
		font-size: 1.8rem;
		font-weight: 700;
		margin: 0 0 1rem;
	}

	.alert-card p {
		font-size: 1.05rem;
		line-height: 1.5;
	}

	/* Main music player layout – like Apple Music / Spotify now playing */
	.music-player {
		flex: 1;
		display: flex;
		flex-direction: column;
		padding: 2rem 1.2rem;
		gap: 2rem;
		max-width: 420px;
		margin: 0 auto;
		width: 100%;
	}

	.player-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.player-header h2 {
		font-size: 1.4rem;
		font-weight: 600;
		letter-spacing: -0.02em;
	}

	.lang-toggle {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.95rem;
	}

	.lang-toggle a {
		padding: 0.4rem 0.8rem;
		border-radius: 999px;
		color: var(--muted);
		text-decoration: none;
	}

	.lang-toggle a.active {
		background: rgba(255, 255, 255, 0.12);
		color: white;
		font-weight: 600;
	}

	.now-playing {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1.8rem;
	}

	.album-art,
	.album-placeholder {
		width: 240px;
		height: 240px;
		border-radius: 18px;
		object-fit: cover;
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);
	}

	.album-placeholder {
		display: grid;
		place-items: center;
		background: linear-gradient(145deg, #2d1b47, #1e1b2f);
		color: var(--muted);
	}

	.track-info {
		text-align: center;
	}

	.track-title {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0 0.4rem;
		line-height: 1.2;
	}

	.artist {
		font-size: 1.3rem;
		color: var(--accent);
		margin: 0 0 0.3rem;
	}

	.playback-status {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 1rem;
		padding: 0.6rem 1.2rem;
		border-radius: 999px;
	}

	.playing {
		background: rgba(34, 197, 94, 0.18);
		color: #22c55e;
	}

	.paused {
		background: rgba(249, 115, 22, 0.18);
		color: #f97316;
	}

	.open-spotify {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 1rem 1.8rem;
		font-weight: 600;
		color: white;
		text-decoration: none;
		border-radius: 999px;
		background: linear-gradient(90deg, #1db954, #1ed760);
		margin-top: 1rem;
		transition: transform 0.2s;
	}

	.open-spotify:hover {
		transform: scale(1.04);
	}

	.empty-state {
		flex: 1;
		display: grid;
		place-items: center;
		text-align: center;
		gap: 1.2rem;
		padding: 4rem 2rem;
	}

	.empty-icon {
		color: var(--muted);
		opacity: 0.7;
	}

	.playlist {
		padding: 1.2rem;
	}

	.playlist h3 {
		font-size: 1.2rem;
		margin: 0 0 1rem;
	}

	.playlist ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 0.8rem;
	}

	.playlist li {
		font-size: 1rem;
		color: var(--muted);
	}

	.more {
		margin-top: 0.8rem;
		font-size: 0.9rem;
	}

	.muted {
		color: var(--muted);
	}

	@media (max-width: 480px) {
		.album-art,
		.album-placeholder {
			width: 200px;
			height: 200px;
		}

		.track-title {
			font-size: 1.7rem;
		}
	}
</style>
