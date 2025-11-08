<script lang="ts">
	import Icon from '@iconify/svelte';

	export let spotify: {
		playing: boolean;
		title: string;
		artist: string;
		album: string;
		url: string;
		image: string;
	} | null;
</script>

<div class="nowplay" aria-live="polite">
	{#if spotify}
		<a
			class="track"
			href={spotify.url}
			rel="external noopener noreferrer"
			target="_blank"
			aria-label={`Open on Spotify: ${spotify.title} by ${spotify.artist}`}
		>
			<img
				class="cover"
				src={spotify.image}
				alt=""
				width="40"
				height="40"
				decoding="async"
				loading="lazy"
			/>

			<div class="tmeta">
				<div class="tline">
					<span class="tname">{spotify.title}</span>

					{#if spotify.playing}
						<span class="pill playing">
							<Icon icon="lucide:waveform" width="14" /> Now playing
						</span>
					{:else}
						<span class="pill">
							<Icon icon="lucide:history" width="14" /> Last played
						</span>
					{/if}
				</div>

				<div class="muted ellip">
					{spotify.artist} · {spotify.album}
				</div>
			</div>
		</a>
	{:else}
		<div class="muted tiny">No recent playback.</div>
	{/if}
</div>

<style>
	.nowplay {
		grid-column: 1 / -1;
		margin-top: 8px;
	}

	.track {
		display: grid;
		grid-template-columns: 40px 1fr;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		color: inherit;
		padding: 10px;
		border: 1px solid var(--border);
		border-radius: 12px;
		background: var(--elev);
		transition:
			border-color 0.15s ease,
			transform 0.15s ease;
		min-height: 60px;
	}

	.track:hover {
		border-color: color-mix(in srgb, var(--text) 10%, var(--border));
		transform: translateY(-1px);
	}

	.track:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--tint) 65%, white);
		outline-offset: 2px;
		border-radius: 12px;
	}

	.cover {
		width: 40px;
		height: 40px;
		border-radius: 8px;
		object-fit: cover;
		border: 1px solid var(--border);
	}

	.tmeta {
		min-width: 0;
	}

	.tline {
		display: grid;
		grid-template-columns: 1fr auto;
		align-items: center;
		gap: 8px;
		min-width: 0;
	}

	.tname {
		font-weight: 700;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		line-height: 1.2;
	}

	.pill {
		display: inline-flex;
		gap: 6px;
		align-items: center;
		justify-content: center;
		padding: 4px 10px;
		border-radius: 999px;
		font-size: 0.8rem;
		line-height: 1;
		background: var(--chip);
		border: 1px solid var(--border);
		color: var(--muted);
		white-space: nowrap;
		min-width: 108px;
	}

	.playing {
		color: color-mix(in srgb, #3b82f6 70%, var(--text));
		border-color: color-mix(in srgb, #3b82f6 30%, var(--border));
	}

	.ellip {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.tiny {
		font-size: 12px;
	}

	.muted {
		color: var(--muted);
	}

	@media (max-width: 360px) {
		.pill {
			min-width: 96px;
			font-size: 0.78rem;
		}

		.track {
			padding: 8px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.track {
			transition: none;
		}

		.track:hover {
			transform: none;
		}
	}
</style>
