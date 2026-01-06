<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import type {
		NowPayload,
		HistoryItemPayload,
		TopArtistPayload,
		TopTrackPayload,
		SpotifyNowResponse
	} from '$lib/server/spotify';

	export let spotify: NowPayload | null;

	let now: SpotifyNowResponse['now'] = null;
	let history: HistoryItemPayload[] = [];
	let topTracks: TopTrackPayload[] = [];
	let topArtists: TopArtistPayload[] = [];

	let isPreviewPlaying = false;
	let audioEl: HTMLAudioElement | null = null;
	let activeTopTab: 'artists' | 'tracks' = 'artists';

	let isVisible = true;
	let poll: ReturnType<typeof setInterval> | null = null;
	let showHistory = false;
	let hasLoaded = false;

	let albumColor = 'rgba(34, 197, 94, 0.85)';
	let albumColorSoft = 'rgba(34, 197, 94, 0.3)';

	const colorCache = new Map<string, RGB>();

	type RGB = { r: number; g: number; b: number };

	const extractAverageColor = (src: string): Promise<RGB | null> =>
		new Promise((resolve) => {
			const img = new Image();
			img.crossOrigin = 'anonymous';
			img.onload = () => {
				const canvas = document.createElement('canvas');
				const ctx = canvas.getContext('2d');
				if (!ctx) {
					resolve(null);
					return;
				}
				const size = 32;
				canvas.width = size;
				canvas.height = size;

				ctx.drawImage(img, 0, 0, size, size);
				const data = ctx.getImageData(0, 0, size, size).data;

				let r = 0;
				let g = 0;
				let b = 0;
				let count = 0;

				for (let i = 0; i < data.length; i += 4) {
					const alpha = data[i + 3];
					if (alpha < 128) continue;
					r += data[i];
					g += data[i + 1];
					b += data[i + 2];
					count++;
				}

				if (!count) {
					resolve(null);
					return;
				}

				resolve({
					r: Math.round(r / count),
					g: Math.round(g / count),
					b: Math.round(b / count)
				});
			};
			img.onerror = () => resolve(null);
			img.src = src;
		});

	const updateAlbumGlow = async (imageUrl: string | null | undefined) => {
		if (typeof window === 'undefined' || !imageUrl) return;

		const cached = colorCache.get(imageUrl);
		if (cached) {
			const { r, g, b } = cached;
			albumColor = `rgba(${r}, ${g}, ${b}, 0.88)`;
			albumColorSoft = `rgba(${r}, ${g}, ${b}, 0.32)`;
			return;
		}

		const rgb = await extractAverageColor(imageUrl);
		if (!rgb) {
			albumColor = 'rgba(34, 197, 94, 0.85)';
			albumColorSoft = 'rgba(34, 197, 94, 0.3)';
			return;
		}

		colorCache.set(imageUrl, rgb);
		const { r, g, b } = rgb;
		albumColor = `rgba(${r}, ${g}, ${b}, 0.88)`;
		albumColorSoft = `rgba(${r}, ${g}, ${b}, 0.32)`;
	};

	onMount(() => {
		if (spotify) {
			now = {
				playing: spotify.playing,
				title: spotify.title,
				artist: spotify.artist,
				album: spotify.album,
				url: spotify.url,
				uri: '',
				image: spotify.image,
				progressMs: null,
				durationMs: null,
				device: null,
				previewUrl: null
			};
			updateAlbumGlow(spotify.image);
			hasLoaded = true;
		}

		const fetchNow = async (includeMeta = false) => {
			try {
				const res = await fetch('/api/spotify/now', { cache: 'no-store' });
				if (!res.ok) return;

				const json = (await res.json()) as SpotifyNowResponse;

				now = json.now;

				if (now?.image) {
					updateAlbumGlow(now.image);
				}

				if (includeMeta) {
					history = json.history ?? [];
					topTracks = json.topTracks ?? [];
					topArtists = json.topArtists ?? [];
				}

				hasLoaded = true;
			} catch {
				// ignore
			}
		};

		const handleVisibility = () => {
			isVisible = document.visibilityState === 'visible';
		};

		if (typeof document !== 'undefined') {
			isVisible = document.visibilityState === 'visible';
			document.addEventListener('visibilitychange', handleVisibility);
		}

		fetchNow(true);

		poll = window.setInterval(() => {
			if (!isVisible) return;
			fetchNow(false);
		}, 60_000);

		return () => {
			if (poll) clearInterval(poll);
			if (typeof document !== 'undefined') {
				document.removeEventListener('visibilitychange', handleVisibility);
			}
			if (audioEl) {
				audioEl.pause();
			}
		};
	});

	const togglePreview = () => {
		if (!audioEl) return;
		if (audioEl.paused) {
			audioEl.play().catch(() => {});
			isPreviewPlaying = true;
		} else {
			audioEl.pause();
			isPreviewPlaying = false;
		}
	};

	const stopPreview = () => {
		if (!audioEl) return;
		audioEl.pause();
		audioEl.currentTime = 0;
		isPreviewPlaying = false;
	};

	const deviceLabel = () => {
		if (!now?.device) return '';
		const type = now.device.type?.toLowerCase() ?? '';
		const name = now.device.name || 'Unknown device';

		if (type === 'computer') return `Playing on ${name}`;
		if (type === 'smartphone') return `Playing on phone (${name})`;
		if (type === 'speaker') return `Playing on speaker (${name})`;

		return `Playing on ${name}`;
	};

	const openSpotifyUri = (uri: string) => {
		if (!uri) return;
		if (typeof window !== 'undefined') {
			window.location.href = uri;
		}
	};

	const handleOpenInSpotify = () => {
		if (!now?.uri) return;
		openSpotifyUri(now.uri);
	};
</script>

<div class="nowplay" aria-live="polite">
	{#if now}
		<div class="track" style:--album-glow={albumColor} style:--album-glow-soft={albumColorSoft}>
			<!--
				Accessibility/valid HTML: avoid placing interactive controls (buttons)
				inside a single giant <a>. We use an overlay link instead.
			-->
			<a
				class="track-link"
				href={now.url}
				rel="external noopener noreferrer"
				target="_blank"
				aria-label={`Open on Spotify: ${now.title} by ${now.artist}`}
			></a>
			<div class="badge-row">
				<span class="badge">
					<Icon icon="lucide:spotify" width="14" />
					<span>{now.playing ? 'Listening on Spotify' : 'Recently played'}</span>
				</span>

				{#if now.uri}
					<button type="button" class="mini-link" on:click|stopPropagation={handleOpenInSpotify}>
						<Icon icon="lucide:external-link" width="14" />
						<span class="hide-xs">Open app</span>
					</button>
				{/if}
			</div>

			<div class="track-inner">
				<img
					class="cover"
					src={now.image}
					alt=""
					width="48"
					height="48"
					decoding="async"
					loading="lazy"
				/>

				<div class="tmeta">
					<div class="tline">
						<div class="title-block">
							<span class="eq-wrap" aria-hidden="true">
								<span class="bar bar-1" class:active={now.playing}></span>
								<span class="bar bar-2" class:active={now.playing}></span>
								<span class="bar bar-3" class:active={now.playing}></span>
								<span class="bar bar-4" class:active={now.playing}></span>
							</span>

							<span class="tname">{now.title}</span>
						</div>
					</div>

					<div class="muted ellip">
						{now.artist} · {now.album}
					</div>

					<div class="meta-row">
						{#if now.device}
							<div class="device muted">
								<Icon icon="lucide:monitor-speaker" width="14" />
								<span>{deviceLabel()}</span>
								{#if typeof now.device.volumePercent === 'number'}
									<span class="vol">· {now.device.volumePercent}%</span>
								{/if}
							</div>
						{/if}

						{#if now.previewUrl}
							<button type="button" class="preview-btn" on:click|stopPropagation={togglePreview}>
								<Icon
									icon={isPreviewPlaying ? 'lucide:pause-circle' : 'lucide:play-circle'}
									width="16"
								/>
								<span>{isPreviewPlaying ? 'Stop preview' : 'Play preview'}</span>
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>

		{#if now.previewUrl}
			<audio bind:this={audioEl} src={now.previewUrl} on:ended={stopPreview}></audio>
		{:else}
			<!-- no preview -->
		{/if}
	{:else if hasLoaded}
		<div class="muted tiny">No recent playback.</div>
	{:else}
		<div class="muted tiny">Loading Spotify…</div>
	{/if}

	{#if history.length}
		<div class="panel">
			<div class="panel-head">
				<div class="panel-title">
					<h3>Recent listening</h3>
					<p class="muted tiny">Last few tracks played.</p>
				</div>

				<button
					type="button"
					class="panel-toggle"
					on:click={() => (showHistory = !showHistory)}
					aria-expanded={showHistory}
					aria-controls="history-list"
				>
					<Icon icon={showHistory ? 'lucide:chevron-up' : 'lucide:chevron-down'} width="16" />
				</button>
			</div>

			{#if showHistory}
				<ul id="history-list" class="history">
					{#each history.slice(0, 5) as item (item.playedAt + item.url)}
						<li class="history-item">
							<img
								class="history-cover"
								src={item.image}
								alt=""
								width="32"
								height="32"
								loading="lazy"
							/>
							<div class="history-meta">
								<div class="history-title ellip">{item.title}</div>
								<div class="history-sub muted ellip">
									{item.artist} · {item.album}
								</div>
							</div>
							<a
								class="history-open"
								href={item.url}
								target="_blank"
								rel="external noopener noreferrer"
								aria-label={`Open on Spotify: ${item.title} by ${item.artist}`}
							>
								<Icon icon="lucide:arrow-up-right" width="14" />
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}

	{#if topArtists.length || topTracks.length}
		<div class="panel">
			<div class="panel-head">
				<div class="panel-title">
					<h3>Favorites (last few weeks)</h3>
					<p class="muted tiny">Short-term top artists and tracks.</p>
				</div>

				<div class="panel-tabs" role="tablist">
					<button
						type="button"
						class:active={activeTopTab === 'artists'}
						on:click={() => (activeTopTab = 'artists')}
						role="tab"
						aria-selected={activeTopTab === 'artists'}
					>
						<Icon icon="lucide:users" width="14" /> Artists
					</button>
					<button
						type="button"
						class:active={activeTopTab === 'tracks'}
						on:click={() => (activeTopTab = 'tracks')}
						role="tab"
						aria-selected={activeTopTab === 'tracks'}
					>
						<Icon icon="lucide:music-2" width="14" /> Tracks
					</button>
				</div>
			</div>

			{#if activeTopTab === 'artists' && topArtists.length}
				<ul class="tops">
					{#each topArtists as a, i (a.url + i)}
						<li class="top-item">
							<span class="top-rank">{i + 1}</span>
							<img class="top-cover" src={a.image} alt="" width="32" height="32" loading="lazy" />
							<div class="top-meta">
								<div class="top-title ellip">{a.name}</div>
								<div class="top-sub muted">Artist</div>
							</div>
							<a
								class="history-open"
								href={a.url}
								target="_blank"
								rel="external noopener noreferrer"
								aria-label={`Open Spotify artist: ${a.name}`}
							>
								<Icon icon="lucide:arrow-up-right" width="14" />
							</a>
						</li>
					{/each}
				</ul>
			{:else if activeTopTab === 'tracks' && topTracks.length}
				<ul class="tops">
					{#each topTracks as t, i (t.url + i)}
						<li class="top-item">
							<span class="top-rank">{i + 1}</span>
							<img class="top-cover" src={t.image} alt="" width="32" height="32" loading="lazy" />
							<div class="top-meta">
								<div class="top-title ellip">{t.title}</div>
								<div class="top-sub muted ellip">{t.artist}</div>
							</div>
							<a
								class="history-open"
								href={t.url}
								target="_blank"
								rel="external noopener noreferrer"
								aria-label={`Open Spotify track: ${t.title} by ${t.artist}`}
							>
								<Icon icon="lucide:arrow-up-right" width="14" />
							</a>
						</li>
					{/each}
				</ul>
			{/if}
		</div>
	{/if}
</div>

<style>
	.nowplay {
		grid-column: 1 / -1;
		margin-top: 10px;
		display: grid;
		gap: 10px;
	}

	.track {
		--album-glow: rgba(34, 197, 94, 0.85);
		--album-glow-soft: rgba(34, 197, 94, 0.3);

		position: relative;
		z-index: 0;
		overflow: hidden;

		display: grid;
		gap: 6px;
		color: inherit;
		padding: 10px 10px 11px;
		border-radius: 14px;
		cursor: pointer;

		border: 1px solid color-mix(in srgb, var(--album-glow) 40%, var(--border));
		box-shadow:
			0 0 26px color-mix(in srgb, var(--album-glow-soft) 70%, transparent),
			0 8px 20px rgba(0, 0, 0, 0.4);
		background:
			radial-gradient(circle at 0% 0%, var(--album-glow-soft) 0, transparent 65%),
			linear-gradient(
				135deg,
				color-mix(in srgb, var(--album-glow-soft) 40%, var(--chip)),
				var(--elev)
			);

		transition:
			border-color 0.15s ease,
			transform 0.15s ease,
			box-shadow 0.15s ease,
			background 0.15s ease;
		min-height: 70px;
	}

	.track:hover {
		transform: translateY(-1px);
	}

	.track::before {
		content: '';
		position: absolute;
		inset: -20%;
		border-radius: inherit;
		pointer-events: none;
		z-index: 0;

		background:
			radial-gradient(circle at 0% 0%, var(--album-glow-soft) 0, transparent 55%),
			conic-gradient(
				from 0deg,
				color-mix(in srgb, var(--album-glow) 90%, white) 0%,
				color-mix(in srgb, var(--album-glow) 70%, black) 25%,
				color-mix(in srgb, var(--album-glow) 80%, #22c55e) 50%,
				color-mix(in srgb, var(--album-glow) 80%, #0ea5e9) 75%,
				color-mix(in srgb, var(--album-glow) 90%, white) 100%
			);

		opacity: 0.38;
		filter: blur(22px);
		mix-blend-mode: screen;
		background-size: 220% 220%;

		animation: album-glow-flow 16s ease-in-out infinite alternate;
	}

	.track > * {
		position: relative;
		z-index: 2;
	}

	.track-link {
		position: absolute;
		inset: 0;
		z-index: 1;
		border-radius: inherit;
		text-decoration: none;
		color: inherit;
	}

	@keyframes album-glow-flow {
		0% {
			transform: translate3d(-6%, -2%, 0) scale(1.02);
			background-position: 0% 50%;
			filter: blur(18px);
		}
		50% {
			transform: translate3d(4%, 4%, 0) scale(1.05);
			background-position: 100% 50%;
			filter: blur(24px);
		}
		100% {
			transform: translate3d(-3%, 2%, 0) scale(1.03);
			background-position: 0% 60%;
			filter: blur(20px);
		}
	}

	.track-link:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--album-glow) 70%, white);
		outline-offset: 2px;
		border-radius: 14px;
	}

	.badge-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 8px;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 0.74rem;
		padding: 3px 8px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--album-glow) 40%, var(--chip));
		color: color-mix(in srgb, #022c22 10%, var(--text));
		border: 1px solid color-mix(in srgb, var(--album-glow) 55%, var(--border));
	}

	.mini-link {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		font-size: 0.78rem;
		padding: 3px 6px;
		border-radius: 999px;
		text-decoration: none;
		color: color-mix(in srgb, var(--text) 80%, var(--bg));
		border: 1px dashed color-mix(in srgb, var(--border) 90%, transparent);
		background: transparent;
		cursor: pointer;
	}

	.mini-link:hover {
		border-style: solid;
	}

	.track-inner {
		display: grid;
		grid-template-columns: 48px 1fr;
		align-items: center;
		gap: 10px;
	}

	.cover {
		width: 48px;
		height: 48px;
		border-radius: 10px;
		object-fit: cover;
		border: 1px solid color-mix(in srgb, var(--border) 80%, var(--album-glow-soft));
		box-shadow: 0 0 24px var(--album-glow-soft);
	}

	.tmeta {
		min-width: 0;
		display: grid;
		gap: 3px;
	}

	.tline {
		display: flex;
		align-items: center;
		gap: 8px;
		min-width: 0;
		justify-content: flex-start;
	}

	.title-block {
		display: flex;
		align-items: center;
		gap: 6px;
		min-width: 0;
	}

	.eq-wrap {
		display: inline-flex;
		align-items: flex-end;
		gap: 1px;
		width: 18px;
		height: 12px;
	}

	.bar {
		width: 3px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--album-glow) 60%, var(--text));
		opacity: 0.6;
	}

	.bar-1 {
		animation: eq-bounce 0.7s ease-in-out infinite;
	}

	.bar-2 {
		animation: eq-bounce 0.7s ease-in-out infinite 0.15s;
	}

	.bar-3 {
		animation: eq-bounce 0.7s ease-in-out infinite 0.3s;
	}

	.bar-4 {
		animation: eq-bounce 0.7s ease-in-out infinite 0.45s;
	}

	.bar:not(.active) {
		animation-play-state: paused;
		height: 4px;
		opacity: 0.3;
	}

	.bar.active {
		animation-play-state: running;
	}

	@keyframes eq-bounce {
		0%,
		100% {
			height: 4px;
		}
		50% {
			height: 12px;
		}
	}

	.tname {
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 1.2;
		font-size: 0.96rem;
	}

	.ellip {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.88rem;
	}

	.muted {
		color: var(--muted);
	}

	.tiny {
		font-size: 12px;
	}

	.meta-row {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 4px;
		gap: 8px;
		flex-wrap: wrap;
	}

	.device {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		font-size: 0.78rem;
	}

	.device .vol {
		opacity: 0.8;
	}

	.preview-btn {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--border) 90%, transparent);
		background: transparent;
		font-size: 0.78rem;
		padding: 4px 8px;
		color: color-mix(in srgb, var(--text) 88%, var(--bg));
		cursor: pointer;
	}

	.preview-btn:hover {
		border-color: color-mix(in srgb, var(--album-glow) 35%, var(--border));
	}

	.panel {
		border-radius: 12px;
		border: 1px solid color-mix(in srgb, var(--border) 92%, transparent);
		background: linear-gradient(
			160deg,
			color-mix(in srgb, var(--elev) 96%, transparent),
			var(--surface)
		);
		padding: 9px 10px;
		display: grid;
		gap: 6px;
	}

	.panel-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
	}

	.panel-toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		border: none;
		background: transparent;
		color: color-mix(in srgb, var(--muted) 90%, var(--bg));
		cursor: pointer;
		padding: 4px;
		border-radius: 6px;
	}

	.panel-toggle:hover {
		background: color-mix(in srgb, var(--ghost) 94%, transparent);
	}

	.panel-title h3 {
		margin: 0;
		font-size: 0.78rem;
		text-transform: uppercase;
		letter-spacing: 0.12em;
	}

	.panel-title .tiny {
		margin-top: 2px;
	}

	.panel-tabs {
		display: inline-flex;
		gap: 4px;
		border-radius: 999px;
		padding: 2px;
		background: color-mix(in srgb, var(--chip) 95%, transparent);
	}

	.panel-tabs button {
		border: none;
		border-radius: 999px;
		font-size: 0.76rem;
		padding: 3px 7px;
		background: transparent;
		color: color-mix(in srgb, var(--muted) 90%, var(--bg));
		display: inline-flex;
		align-items: center;
		gap: 4px;
		cursor: pointer;
	}

	.panel-tabs button.active {
		background: color-mix(in srgb, var(--elev) 96%, transparent);
		color: color-mix(in srgb, var(--text) 88%, var(--bg));
	}

	.history,
	.tops {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 4px;
	}

	.history-item,
	.top-item {
		display: grid;
		grid-template-columns: auto 1fr auto;
		align-items: center;
		gap: 6px;
		padding: 4px 3px;
		border-radius: 8px;
	}

	.history-item:hover,
	.top-item:hover {
		background: color-mix(in srgb, var(--ghost) 94%, transparent);
	}

	.history-cover,
	.top-cover {
		width: 32px;
		height: 32px;
		border-radius: 7px;
		border: 1px solid var(--border);
		object-fit: cover;
	}

	.history-meta,
	.top-meta {
		min-width: 0;
	}

	.history-title,
	.top-title {
		font-size: 0.84rem;
	}

	.history-sub,
	.top-sub {
		font-size: 0.78rem;
	}

	.history-open {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 22px;
		height: 22px;
		border-radius: 999px;
		border: 1px solid color-mix(in srgb, var(--border) 90%, transparent);
		color: color-mix(in srgb, var(--muted) 100%, var(--bg));
		text-decoration: none;
	}

	.history-open:hover {
		border-color: color-mix(in srgb, var(--album-glow) 35%, var(--border));
	}

	.top-rank {
		font-size: 0.8rem;
		color: var(--muted);
		width: 1.5rem;
		text-align: right;
	}

	@media (max-width: 360px) {
		.track {
			padding: 8px;
		}

		.hide-xs {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			transition: none;
		}
	}
</style>
