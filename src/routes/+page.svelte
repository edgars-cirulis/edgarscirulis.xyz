<script lang="ts">
	import { onMount } from 'svelte';

	let visible = false;

	onMount(() => {
		setTimeout(() => (visible = true), 250);
	});
</script>

<svelte:head>
	<title>✦ Archived</title>
	<meta name="theme-color" content="#050509" />
</svelte:head>

<div class="scene">
	<div class="content" class:visible>
		<div class="card">
			<div class="icon">
				<span class="symbol">🖤</span>
			</div>

			<h1 class="title">This has ended</h1>

			<p class="subtitle">
				What once lived here is now memory.<br />
				Thank you for being part of it.
			</p>

			<div class="line"></div>

			<p class="date">14 · 02 · 2026</p>
		</div>
	</div>
</div>

<style>
	:root {
		--bg: #050509;
		--accent: #c084fc;
		--text: #f1f5f9;
		--muted: #94a3b8;
		--glass: rgba(30, 30, 50, 0.28);
		--radius: 28px;
	}

	/* background */
	.scene {
		min-height: 100vh;
		background: var(--bg);
		display: grid;
		place-items: center;
		color: var(--text);
		position: relative;
		overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	.scene::before {
		content: '';
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 20% 30%, #2d1b47 0%, transparent 45%),
			radial-gradient(circle at 80% 70%, #1e0f38 0%, transparent 50%);
		opacity: 0.45;
	}

	/* entrance */
	.content {
		opacity: 0;
		transform: translateY(24px);
		transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	/* card */
	.card {
		width: 90%;
		max-width: 420px;
		padding: 3.2rem 2rem 2.8rem;
		text-align: center;
		background: var(--glass);
		backdrop-filter: blur(24px) saturate(160%);
		border-radius: var(--radius);
		box-shadow: 0 25px 70px rgba(0, 0, 0, 0.55);
	}

	/* heart */
	.icon {
		font-size: 4.5rem;
		margin-bottom: 1.4rem;
	}

	.symbol {
		display: inline-block;
		animation: heartbeat 2.4s ease-in-out infinite;
	}

	@keyframes heartbeat {
		0%,
		100% {
			transform: scale(1);
		}
		40% {
			transform: scale(1.15);
		}
		60% {
			transform: scale(0.92);
		}
	}

	/* text */
	.title {
		font-size: 2.2rem;
		font-weight: 800;
		margin-bottom: 1rem;
		background: linear-gradient(90deg, #e0bbff, #c084fc, #a78bfa);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.subtitle {
		font-size: 1.05rem;
		line-height: 1.6;
		color: var(--muted);
		margin-bottom: 1.6rem;
	}

	.line {
		width: 60px;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--accent), transparent);
		margin: 0 auto 1.4rem;
	}

	.date {
		font-size: 0.9rem;
		color: var(--muted);
		letter-spacing: 0.12em;
		opacity: 0.7;
	}
</style>
