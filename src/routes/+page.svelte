<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let visible = false;
	let mounted = false;

	// Target: 2026-02-20 00:00:00 GMT+2 (Riga)
	const target = new Date('2026-02-20T00:00:00+02:00').getTime();

	let days = 0;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;
	let done = false;
	let tick: ReturnType<typeof setInterval>;

	function pad2(n: number) {
		return String(n).padStart(2, '0');
	}

	function calc() {
		const now = Date.now();
		const diff = Math.max(0, target - now);
		done = diff === 0;

		const totalSeconds = Math.floor(diff / 1000);
		days = Math.floor(totalSeconds / 86400);
		const remainder = totalSeconds % 86400;
		hours = Math.floor(remainder / 3600);
		const remainder2 = remainder % 3600;
		minutes = Math.floor(remainder2 / 60);
		seconds = remainder2 % 60;
	}

	onMount(() => {
		mounted = true;
		calc();
		tick = setInterval(calc, 1000);
		// Stagger entrance animations
		setTimeout(() => (visible = true), 100);
	});

	onDestroy(() => {
		if (tick) clearInterval(tick);
	});
</script>

<svelte:head>
	<title>✦ Atvēršana drīzumā</title>
	<meta name="theme-color" content="#0a0a0f" />
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	<meta name="description" content="Vietne drīz atgriezīsies. Atvēršana 20.02.2026." />
</svelte:head>

<div class="scene" class:mounted>
	<div class="fx" aria-hidden="true">
		<div class="gradient-sphere sphere-1"></div>
		<div class="gradient-sphere sphere-2"></div>
		<div class="gradient-sphere sphere-3"></div>
		<div class="noise"></div>
	</div>

	<main class="content" class:visible>
		<div class="card">
			<div class="card-glow" aria-hidden="true"></div>
			
			<div class="badge">
				<span class="dot" aria-hidden="true"></span>
				<span class="badge-text">Vietne atgriezīsies</span>
			</div>

			<h1 class="title">Atvēršana drīzumā</h1>

			<p class="subtitle">
				Mēs pārtaisām visu no jauna — tīrāk, skaistāk un asāk.
				<span class="subtitle-break">Atlikušais laiks līdz atvēršanai:</span>
			</p>

			<div class="countdown-container" data-done={done}>
				<div class="countdown-glow" aria-hidden="true"></div>
				
				<div class="countdown" role="timer" aria-live="polite" aria-label="Atvēršanas laika atskaite">
					<div class="time-unit">
						<div class="time-value" aria-label="{days} dienas">
							<span class="digit">{days}</span>
						</div>
						<span class="time-label">dienas</span>
					</div>

					<span class="separator" aria-hidden="true">:</span>

					<div class="time-unit">
						<div class="time-value" aria-label="{pad2(hours)} stundas">
							<span class="digit">{pad2(hours)}</span>
						</div>
						<span class="time-label">stundas</span>
					</div>

					<span class="separator" aria-hidden="true">:</span>

					<div class="time-unit">
						<div class="time-value" aria-label="{pad2(minutes)} minūtes">
							<span class="digit">{pad2(minutes)}</span>
						</div>
						<span class="time-label">minūtes</span>
					</div>

					<span class="separator" aria-hidden="true">:</span>

					<div class="time-unit seconds-unit">
						<div class="time-value" aria-label="{pad2(seconds)} sekundes">
							<span class="digit seconds">{pad2(seconds)}</span>
						</div>
						<span class="time-label">sekundes</span>
					</div>
				</div>

				<div class="meta">
					{#if done}
						<span class="ready-badge">
							<span class="check">✓</span>
							Gatavs — atsvaidzini lapu
						</span>
					{:else}
						<time datetime="2026-02-20T00:00:00+02:00" class="target-date">
							20 · 02 · 2026
						</time>
						<span class="timezone">Rīga (GMT+2)</span>
					{/if}
				</div>
			</div>

			<div class="divider" aria-hidden="true"></div>

			<p class="footer">
				Paldies, ka gaidi. <span class="accent">Drīz atgriezīsimies.</span>
			</p>
		</div>
	</main>
</div>

<style>
	:root {
		--bg: #050509;
		--bg-elevated: #0a0a12;
		--text: #f8fafc;
		--text-muted: #94a3b8;
		--text-subtle: #64748b;
		
		--accent-purple: #c084fc;
		--accent-blue: #60a5fa;
		--accent-emerald: #34d399;
		--accent-pink: #e879f9;
		
		--glass-bg: rgba(15, 15, 25, 0.6);
		--glass-border: rgba(255, 255, 255, 0.08);
		--glass-highlight: rgba(255, 255, 255, 0.05);
		
		--shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);
		--shadow-lg: 0 25px 80px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(0, 0, 0, 0.3);
		
		--radius-sm: 16px;
		--radius-md: 24px;
		--radius-lg: 32px;
		--radius-full: 9999px;
	}

	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		margin: 0;
		background: var(--bg);
		color: var(--text);
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.scene {
		min-height: 100dvh;
		width: 100%;
		display: grid;
		place-items: center;
		position: relative;
		overflow: hidden;
		background: radial-gradient(ellipse at top, #0f0f1a 0%, var(--bg) 50%, #020205 100%);
		padding: env(safe-area-inset-top) env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
	}

	/* Background Effects */
	.fx {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
	}

	.gradient-sphere {
		position: absolute;
		border-radius: 50%;
		filter: blur(80px);
		opacity: 0;
		transition: opacity 1.5s ease;
	}

	.mounted .gradient-sphere {
		opacity: 0.4;
	}

	.sphere-1 {
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, var(--accent-purple) 0%, transparent 70%);
		top: -200px;
		left: -100px;
		animation: float 20s ease-in-out infinite;
	}

	.sphere-2 {
		width: 500px;
		height: 500px;
		background: radial-gradient(circle, var(--accent-blue) 0%, transparent 70%);
		bottom: -150px;
		right: -100px;
		animation: float 25s ease-in-out infinite reverse;
	}

	.sphere-3 {
		width: 400px;
		height: 400px;
		background: radial-gradient(circle, var(--accent-emerald) 0%, transparent 70%);
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		animation: pulse-glow 15s ease-in-out infinite;
		opacity: 0.2;
	}

	.noise {
		position: absolute;
		inset: 0;
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
		pointer-events: none;
	}

	@keyframes float {
		0%, 100% { transform: translate(0, 0) scale(1); }
		33% { transform: translate(30px, -30px) scale(1.05); }
		66% { transform: translate(-20px, 20px) scale(0.95); }
	}

	@keyframes pulse-glow {
		0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
		50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.3; }
	}

	/* Content Layout */
	.content {
		position: relative;
		z-index: 1;
		width: 100%;
		max-width: 600px;
		padding: 20px;
		opacity: 0;
		transform: translateY(30px) scale(0.95);
		transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.content.visible {
		opacity: 1;
		transform: translateY(0) scale(1);
	}

	.card {
		position: relative;
		background: var(--glass-bg);
		backdrop-filter: blur(24px) saturate(180%);
		-webkit-backdrop-filter: blur(24px) saturate(180%);
		border: 1px solid var(--glass-border);
		border-radius: var(--radius-lg);
		padding: clamp(2rem, 6vw, 3rem) clamp(1.5rem, 5vw, 2.5rem);
		box-shadow: var(--shadow-lg), inset 0 1px 0 var(--glass-highlight);
		overflow: hidden;
	}

	.card-glow {
		position: absolute;
		inset: 0;
		background: linear-gradient(135deg, rgba(192, 132, 252, 0.1) 0%, transparent 50%, rgba(96, 165, 250, 0.1) 100%);
		pointer-events: none;
		opacity: 0;
		transition: opacity 1s ease;
	}

	.visible .card-glow {
		opacity: 1;
	}

	/* Badge */
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 16px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: var(--radius-full);
		margin-bottom: 1.5rem;
		font-size: 0.875rem;
		color: var(--text-muted);
		letter-spacing: 0.02em;
	}

	.dot {
		width: 8px;
		height: 8px;
		background: linear-gradient(135deg, var(--accent-purple), var(--accent-emerald));
		border-radius: 50%;
		box-shadow: 0 0 12px rgba(192, 132, 252, 0.6);
		animation: blink 2s ease-in-out infinite;
	}

	@keyframes blink {
		0%, 100% { opacity: 0.6; transform: scale(0.9); }
		50% { opacity: 1; transform: scale(1.1); }
	}

	/* Typography */
	.title {
		font-size: clamp(1.75rem, 5vw, 2.5rem);
		font-weight: 800;
		line-height: 1.2;
		margin-bottom: 1rem;
		background: linear-gradient(135deg, #fff 0%, #e9d5ff 25%, var(--accent-purple) 50%, var(--accent-blue) 100%);
		background-size: 200% auto;
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		animation: gradient-shift 8s ease infinite;
	}

	@keyframes gradient-shift {
		0%, 100% { background-position: 0% center; }
		50% { background-position: 100% center; }
	}

	.subtitle {
		font-size: clamp(0.9375rem, 2vw, 1.0625rem);
		line-height: 1.7;
		color: var(--text-muted);
		margin-bottom: 2rem;
		max-width: 90%;
		margin-left: auto;
		margin-right: auto;
	}

	.subtitle-break {
		display: block;
		margin-top: 0.25rem;
	}

	/* Countdown */
	.countdown-container {
		position: relative;
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: var(--radius-md);
		padding: 1.5rem 1rem;
		margin: 0 auto;
		overflow: hidden;
	}

	.countdown-glow {
		position: absolute;
		inset: -50%;
		background: radial-gradient(circle at 50% 50%, rgba(192, 132, 252, 0.15) 0%, transparent 60%);
		opacity: 0.5;
		pointer-events: none;
	}

	.countdown {
		display: flex;
		justify-content: center;
		align-items: center;
		gap: clamp(0.25rem, 2vw, 0.75rem);
		position: relative;
		z-index: 1;
	}

	.time-unit {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.5rem;
		min-width: clamp(60px, 15vw, 80px);
	}

	.time-value {
		background: rgba(0, 0, 0, 0.4);
		border: 1px solid rgba(255, 255, 255, 0.08);
		border-radius: var(--radius-sm);
		padding: clamp(0.75rem, 3vw, 1rem) clamp(0.5rem, 2vw, 1rem);
		width: 100%;
		text-align: center;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.05);
	}

	.digit {
		display: block;
		font-variant-numeric: tabular-nums;
		font-weight: 700;
		font-size: clamp(1.5rem, 5vw, 2.25rem);
		line-height: 1;
		color: var(--text);
		text-shadow: 0 0 20px rgba(192, 132, 252, 0.3);
	}

	.digit.seconds {
		color: var(--accent-purple);
		animation: seconds-pulse 1s ease-in-out infinite;
	}

	@keyframes seconds-pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}

	.time-label {
		font-size: clamp(0.625rem, 1.5vw, 0.75rem);
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-subtle);
		font-weight: 500;
	}

	.separator {
		font-size: clamp(1.25rem, 3vw, 1.75rem);
		font-weight: 300;
		color: var(--text-subtle);
		opacity: 0.5;
		margin-top: -1.5rem;
		animation: pulse-opacity 2s ease-in-out infinite;
	}

	@keyframes pulse-opacity {
		0%, 100% { opacity: 0.3; }
		50% { opacity: 0.6; }
	}

	/* Meta info */
	.meta {
		margin-top: 1.25rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		font-size: 0.875rem;
		position: relative;
		z-index: 1;
	}

	.target-date {
		color: var(--text-muted);
		letter-spacing: 0.1em;
		font-variant-numeric: tabular-nums;
	}

	.timezone {
		color: var(--text-subtle);
		font-size: 0.8125rem;
	}

	.ready-badge {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 1rem;
		background: rgba(52, 211, 153, 0.1);
		border: 1px solid rgba(52, 211, 153, 0.2);
		border-radius: var(--radius-full);
		color: var(--accent-emerald);
		font-weight: 500;
		animation: ready-pulse 2s ease-in-out infinite;
	}

	@keyframes ready-pulse {
		0%, 100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.2); }
		50% { box-shadow: 0 0 20px 4px rgba(52, 211, 153, 0.1); }
	}

	.check {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		background: var(--accent-emerald);
		color: var(--bg);
		border-radius: 50%;
		font-size: 0.75rem;
		font-weight: 700;
	}

	/* Footer */
	.divider {
		width: 60px;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--accent-purple), transparent);
		margin: 1.75rem auto 1.25rem;
		opacity: 0.6;
		border-radius: 2px;
	}

	.footer {
		font-size: 0.9375rem;
		color: var(--text-muted);
		line-height: 1.6;
	}

	.accent {
		color: var(--text);
		font-weight: 500;
	}

	/* Responsive */
	@media (max-width: 480px) {
		.content {
			padding: 16px;
		}

		.countdown-container {
			padding: 1.25rem 0.75rem;
		}

		.time-unit {
			min-width: 56px;
		}

		.separator {
			margin-top: -1rem;
		}
	}

	@media (max-width: 360px) {
		.countdown {
			gap: 0.25rem;
		}

		.time-value {
			padding: 0.625rem 0.375rem;
			border-radius: 12px;
		}

		.separator {
			font-size: 1rem;
		}
	}

	/* Reduced motion */
	@media (prefers-reduced-motion: reduce) {
		* {
			animation-duration: 0.01ms !important;
			animation-iteration-count: 1 !important;
			transition-duration: 0.01ms !important;
		}
	}

	/* Dark mode optimization */
	@media (prefers-color-scheme: dark) {
		:root {
			--bg: #020205;
		}
	}
</style>
