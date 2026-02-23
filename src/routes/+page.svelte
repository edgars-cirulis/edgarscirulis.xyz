<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let mounted = false;
	let visible = false;

	// Target: 2026-02-20 00:00:00 GMT+2 (Riga)
	const target = new Date('2026-01-00T00:00:00+02:00').getTime();

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
		setTimeout(() => (visible = true), 100);
	});

	onDestroy(() => {
		if (tick) clearInterval(tick);
	});
</script>

<svelte:head>
	<title>Atvēršana drīzumā — edgarscirulis.xyz</title>
	<meta name="theme-color" content="#09090b" />
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
	<meta name="description" content="Vietne drīz atgriezīsies. Atvēršana 20.02.2026." />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="scene" class:mounted>
	<div class="ambient-glow" aria-hidden="true"></div>
	
	<main class="container" class:visible>
		<div class="card">
			<div class="header">
				<div class="status">
					<span class="status-dot" aria-hidden="true"></span>
					<span class="status-text">Vietne atgriezīsies</span>
				</div>
			</div>

			<h1 class="title">Atvēršana drīzumā</h1>
			
			<p class="description">
				Pārtaisām visu no jauna..
			</p>

			<div class="countdown-section" data-done={done}>
				<div class="countdown-header">Atlikušais laiks līdz atvēršanai</div>
				
				<div class="timer" role="timer" aria-live="polite">
					<div class="unit">
						<div class="value" aria-label="{days} dienas">{days}</div>
						<div class="label">dienas</div>
					</div>
					
					<div class="separator" aria-hidden="true"></div>
					
					<div class="unit">
						<div class="value" aria-label="{pad2(hours)} stundas">{pad2(hours)}</div>
						<div class="label">stundas</div>
					</div>
					
					<div class="separator" aria-hidden="true"></div>
					
					<div class="unit">
						<div class="value" aria-label="{pad2(minutes)} minūtes">{pad2(minutes)}</div>
						<div class="label">minūtes</div>
					</div>
					
					<div class="separator" aria-hidden="true"></div>
					
					<div class="unit">
						<div class="value seconds" aria-label="{pad2(seconds)} sekundes">{pad2(seconds)}</div>
						<div class="label">sekundes</div>
					</div>
				</div>

				<div class="meta">
					{#if done}
						<div class="complete-badge">
							<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
								<path d="M3 8L7 12L13 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
							</svg>
							<span>Gatavs — atsvaidzini lapu</span>
						</div>
					{:else}
						<div class="meta-divider"></div>
						<time datetime="2026-02-20T00:00:00+02:00" class="target-date">
							20.02.2026
						</time>
						<span class="timezone">Rīga (GMT+2)</span>
					{/if}
				</div>
			</div>

			<footer class="footer">
				<p>Paldies, ka gaidi. <span class="emphasis">Drīz atgriezīsimies.</span></p>
			</footer>
		</div>
	</main>
</div>

<style>
	:root {
		--bg: #09090b;
		--bg-elevated: #18181b;
		--surface: rgba(24, 24, 27, 0.6);
		
		--text-primary: #fafafa;
		--text-secondary: #a1a1aa;
		--text-tertiary: #71717a;
		
		--accent: #a78bfa;
		--accent-glow: rgba(167, 139, 250, 0.15);
		
		--border: rgba(255, 255, 255, 0.06);
		--border-strong: rgba(255, 255, 255, 0.1);
		
		--shadow: 0 0 0 1px var(--border), 0 24px 48px -12px rgba(0, 0, 0, 0.6);
		
		--radius-sm: 6px;
		--radius-md: 12px;
		--radius-lg: 20px;
		--radius-full: 9999px;
		
		--space-xs: 0.5rem;   /* 8px */
		--space-sm: 0.75rem;  /* 12px */
		--space-md: 1rem;     /* 16px */
		--space-lg: 1.5rem;   /* 24px */
		--space-xl: 2rem;     /* 32px */
		--space-2xl: 2.5rem;  /* 40px */
	}

	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
		background: var(--bg);
		color: var(--text-primary);
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.scene {
		min-height: 100dvh;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		padding: var(--space-md);
		background: 
			radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.12), transparent),
			radial-gradient(ellipse 60% 40% at 50% 120%, rgba(139, 92, 246, 0.08), transparent);
	}

	.ambient-glow {
		position: absolute;
		inset: 0;
		pointer-events: none;
		overflow: hidden;
	}

	.ambient-glow::before {
		content: '';
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 600px;
		height: 600px;
		background: radial-gradient(circle, var(--accent-glow) 0%, transparent 60%);
		opacity: 0;
		transition: opacity 1.5s ease;
	}

	.mounted .ambient-glow::before {
		opacity: 1;
	}

	.container {
		width: 100%;
		max-width: 440px;
		opacity: 0;
		transform: translateY(12px);
		transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.container.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.card {
		background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, transparent 100%), var(--surface);
		backdrop-filter: blur(24px) saturate(180%);
		-webkit-backdrop-filter: blur(24px) saturate(180%);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--space-2xl);
		box-shadow: var(--shadow);
		position: relative;
		overflow: hidden;
	}

	.header {
		margin-bottom: var(--space-lg);
	}

	.status {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 6px 12px;
		background: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border);
		border-radius: var(--radius-full);
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--text-secondary);
		letter-spacing: 0.01em;
	}

	.status-dot {
		width: 5px;
		height: 5px;
		background: var(--accent);
		border-radius: 50%;
		box-shadow: 0 0 10px var(--accent);
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.4; }
	}

	.title {
		font-size: clamp(1.5rem, 5vw, 2rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.2;
		margin-bottom: var(--space-sm);
		color: var(--text-primary);
	}

	.description {
		font-size: 0.9375rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: var(--space-xl);
	}

	.countdown-section {
		background: rgba(0, 0, 0, 0.25);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: var(--space-xl) var(--space-lg);
		margin-bottom: var(--space-xl);
	}

	.countdown-header {
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--text-tertiary);
		margin-bottom: var(--space-lg);
		text-align: center;
		opacity: 0.8;
	}

	.timer {
		display: flex;
		align-items: flex-start;
		justify-content: center;
		gap: var(--space-xs);
		margin-bottom: var(--space-lg);
	}

	.unit {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 56px;
		flex: 1;
	}

	.value {
		font-variant-numeric: tabular-nums;
		font-size: clamp(2rem, 6vw, 2.5rem);
		font-weight: 700;
		line-height: 1;
		color: var(--text-primary);
		letter-spacing: -0.03em;
		margin-bottom: var(--space-xs);
		font-feature-settings: "tnum";
		transition: transform 0.1s ease;
	}

	.value.seconds {
		color: var(--accent);
		animation: tick 1s ease-in-out infinite;
	}

	@keyframes tick {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.7; }
	}

	.label {
		font-size: 0.625rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.12em;
		color: var(--text-tertiary);
		opacity: 0.9;
	}

	.separator {
		width: 3px;
		height: 3px;
		background: var(--text-tertiary);
		border-radius: 50%;
		opacity: 0.2;
		margin-top: 1.25rem;
	}

	.meta {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.375rem;
	}

	.meta-divider {
		width: 40px;
		height: 1px;
		background: linear-gradient(90deg, transparent, var(--border-strong), transparent);
		margin-bottom: var(--space-sm);
		opacity: 0.6;
	}

	.target-date {
		font-variant-numeric: tabular-nums;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--text-secondary);
		letter-spacing: 0.02em;
	}

	.timezone {
		font-size: 0.8125rem;
		color: var(--text-tertiary);
		font-weight: 500;
	}

	.complete-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-sm) var(--space-md);
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.2);
		border-radius: var(--radius-full);
		color: #4ade80;
		font-size: 0.875rem;
		font-weight: 600;
		animation: ready-pulse 2s ease-in-out infinite;
	}

	@keyframes ready-pulse {
		0%, 100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.2); }
		50% { box-shadow: 0 0 20px 2px rgba(34, 197, 94, 0.15); }
	}

	.footer {
		text-align: center;
		font-size: 0.875rem;
		color: var(--text-secondary);
		line-height: 1.5;
	}

	.emphasis {
		color: var(--text-primary);
		font-weight: 500;
	}

	@media (max-width: 480px) {
		.card {
			padding: var(--space-xl) var(--space-lg);
		}

		.timer {
			gap: 2px;
		}

		.unit {
			min-width: 48px;
		}

		.value {
			margin-bottom: 6px;
		}

		.separator {
			margin-top: 1rem;
		}
	}

	@media (max-width: 360px) {
		.timer {
			gap: 0;
		}

		.unit {
			min-width: 42px;
		}

		.value {
			font-size: 1.75rem;
		}

		.separator {
			display: none;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		* {
			animation: none !important;
			transition: none !important;
		}
	}
</style>
