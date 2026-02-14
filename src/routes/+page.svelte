<script lang="ts">
	import { onMount } from 'svelte';

	let visible = false;

	onMount(() => {
		setTimeout(() => (visible = true), 300);
	});
</script>

<svelte:head>
	<title>✦ Archived</title>
	<meta name="theme-color" content="#0a0a0f" />
</svelte:head>

<div class="scene">
	<div class="particles"></div>
	<div class="glow-orbit"></div>

	<div class="content" class:visible>
		<div class="card glass">
			<div class="icon-heartbeat">
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
		--accent-dim: #a78bfa33;
		--text: #f1f5f9;
		--muted: #94a3b8;
		--glass: rgba(30, 30, 50, 0.28);
		--radius: 32px;
	}

	.scene {
		min-height: 100vh;
		background: var(--bg);
		color: var(--text);
		display: grid;
		place-items: center;
		overflow: hidden;
		position: relative;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
	}

	.particles {
		position: absolute;
		inset: 0;
		background:
			radial-gradient(circle at 20% 30%, #2d1b47 0%, transparent 40%),
			radial-gradient(circle at 80% 70%, #1e0f38 0%, transparent 50%);
		pointer-events: none;
		animation: drift 120s linear infinite;
		opacity: 0.6;
	}

	@keyframes drift {
		0% {
			transform: translate(0, 0);
		}
		100% {
			transform: translate(-15%, -10%);
		}
	}

	.glow-orbit {
		position: absolute;
		width: 800px;
		height: 800px;
		border-radius: 50%;
		background: radial-gradient(circle, var(--accent-dim) 10%, transparent 60%);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: orbit 40s linear infinite;
		opacity: 0.4;
		pointer-events: none;
	}

	@keyframes orbit {
		0% {
			transform: translate(-50%, -50%) rotate(0deg) scale(1);
		}
		50% {
			transform: translate(-50%, -50%) rotate(180deg) scale(1.1);
		}
		100% {
			transform: translate(-50%, -50%) rotate(360deg) scale(1);
		}
	}

	.content {
		opacity: 0;
		transform: translateY(30px);
		transition: all 1.2s cubic-bezier(0.23, 1, 0.32, 1);
	}

	.content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.card {
		position: relative;
		width: 90%;
		max-width: 420px;
		padding: 3.5rem 2rem 3rem;
		text-align: center;
		background: var(--glass);
		backdrop-filter: blur(28px) saturate(180%);
		-webkit-backdrop-filter: blur(28px) saturate(180%);
		border: 1px solid rgba(192, 132, 252, 0.14);
		border-radius: var(--radius);
		box-shadow:
			0 30px 80px -20px rgba(0, 0, 0, 0.7),
			inset 0 0 0 1px rgba(192, 132, 252, 0.08);
		overflow: hidden;
	}

	.card::before {
		content: '';
		position: absolute;
		inset: -50%;
		background: radial-gradient(circle at 30% 20%, rgba(192, 132, 252, 0.18), transparent 60%);
		pointer-events: none;
		animation: breathe 14s ease-in-out infinite;
	}

	@keyframes breathe {
		0%,
		100% {
			opacity: 0.6;
			transform: scale(1);
		}
		50% {
			opacity: 1;
			transform: scale(1.12);
		}
	}

	.icon-heartbeat {
		font-size: 4.8rem;
		line-height: 1;
		margin-bottom: 1.8rem;
		position: relative;
		display: inline-block;
	}

	.symbol {
		animation: heartbeat 2.4s ease-in-out infinite;
		display: inline-block;
	}

	@keyframes heartbeat {
		0%,
		100% {
			transform: scale(1);
		}
		40% {
			transform: scale(1.18);
		}
		60% {
			transform: scale(0.92);
		}
	}

	.title {
		font-size: 2.4rem;
		font-weight: 800;
		letter-spacing: -0.04em;
		margin: 0 0 1.2rem;
		background: linear-gradient(90deg, #e0bbff, #c084fc, #a78bfa);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.subtitle {
		font-size: 1.15rem;
		line-height: 1.6;
		color: var(--muted);
		margin: 0 0 2rem;
	}

	.line {
		width: 60px;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--accent), transparent);
		margin: 0 auto 1.8rem;
		border-radius: 2px;
	}

	.date {
		font-size: 1rem;
		color: var(--muted);
		letter-spacing: 0.1em;
		opacity: 0.7;
	}
</style>
