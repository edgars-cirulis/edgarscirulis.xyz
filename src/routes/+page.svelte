<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let mounted = false;
	let visible = false;

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
				Mēs pārtaisām visu no jauna — tīrāk, skaistāk un asāk.
			</p>

			<div class="countdown-section" data-done={done}>
				<div class="countdown-header">Atlikušais laiks līdz atvēršanai</div>
				
				<div class="timer" role="timer" aria-live="polite">
					<div class="unit">
						<div class="value" aria-label="{days} dienas">{days}</div>
						<div class="label">Dienas</div>
					</div>
					
					<div class="separator" aria-hidden="true"></div>
					
					<div class="unit">
						<div class="value" aria-label="{pad2(hours)} stundas">{pad2(hours)}</div>
						<div class="label">Stundas</div>
					</div>
					
					<div class="separator" aria-hidden="true"></div>
					
					<div class="unit">
						<div class="value" aria-label="{pad2(minutes)} minūtes">{pad2(minutes)}</div>
						<div class="label">Minūtes</div>
					</div>
					
					<div class="separator" aria-hidden="true"></div>
					
					<div class="unit">
						<div class="value seconds" aria-label="{pad2(seconds)} sekundes">{pad2(seconds)}</div>
						<div class="label">Sekundes</div>
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
		
		--accent: #8b5cf6;
		--accent-glow: rgba(139, 92, 246, 0.15);
		
		--border: rgba(255, 255, 255, 0.08);
		--border-strong: rgba(255, 255, 255, 0.12);
		
		--shadow: 0 0 0 1px var(--border), 0 20px 50px -10px rgba(0, 0, 0, 0.5);
		
		--radius-sm: 8px;
		--radius-md: 12px;
		--radius-lg: 16px;
		
		--space-xs: 0.5rem;
		--space-sm: 0.75rem;
		--space-md: 1rem;
		--space-lg: 1.5rem;
		--space-xl: 2rem;
		--space-2xl: 3rem;
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
		padding: var(--space-lg);
		background: radial-gradient(ellipse 80% 50% at 50% -20%, rgba(139, 92, 246, 0.15), transparent);
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
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 800px;
		height: 800px;
		background: radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, transparent 60%);
		opacity: 0;
		transition: opacity 1.5s ease;
	}

	.mounted .ambient-glow::before {
		opacity: 1;
	}

	.container {
		width: 100%;
		max-width: 480px;
		opacity: 0;
		transform: translateY(20px);
		transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
	}

	.container.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.card {
		background: var(--surface);
		backdrop-filter: blur(20px) saturate(180%);
		-webkit-backdrop-filter: blur(20px) saturate(180%);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		padding: var(--space-2xl);
		box-shadow: var(--shadow);
		position: relative;
		overflow: hidden;
	}

	.card::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, transparent 100%);
		pointer-events: none;
	}

	.header {
		margin-bottom: var(--space-xl);
	}

	.status {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-xs) var(--space-md);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border);
		border-radius: var(--radius-full);
		font-size: 0.8125rem;
		font-weight: 500;
		color: var(--text-secondary);
		letter-spacing: 0.01em;
	}

	.status-dot {
		width: 6px;
		height: 6px;
		background: var(--accent);
		border-radius: 50%;
		box-shadow: 0 0 8px var(--accent);
		animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; }
		50% { opacity: 0.5; }
	}

	.title {
		font-size: clamp(1.75rem, 5vw, 2.25rem);
		font-weight: 700;
		letter-spacing: -0.02em;
		line-height: 1.2;
		margin-bottom: var(--space-md);
		color: var(--text-primary);
	}

	.description {
		font-size: 1rem;
		color: var(--text-secondary);
		line-height: 1.6;
		margin-bottom: var(--space-2xl);
	}

	.countdown-section {
		background: rgba(0, 0, 0, 0.2);
		border: 1px solid var(--border);
		border-radius: var(--radius-md);
		padding: var(--space-xl);
		margin-bottom: var(--space-xl);
		position: relative;
	}

	.countdown-header {
		font-size: 0.75rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-tertiary);
		margin-bottom: var(--space-lg);
		text-align: center;
	}

	.timer {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-md);
		margin-bottom: var(--space-lg);
	}

	.unit {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 60px;
	}

	.value {
		font-variant-numeric: tabular-nums;
		font-size: clamp(2rem, 6vw, 2.75rem);
		font-weight: 700;
		line-height: 1;
		color: var(--text-primary);
		letter-spacing: -0.02em;
		margin-bottom: var(--space-xs);
		font-feature-settings: "tnum";
	}

	.value.seconds {
		color: var(--accent);
		min-width: 2ch;
		text-align: center;
	}

	.label {
		font-size: 0.6875rem;
		font-weight: 600;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		color: var(--text-tertiary);
	}

	.separator {
		width: 4px;
		height: 4px;
		background: var(--text-tertiary);
		border-radius: 50%;
		opacity: 0.3;
		margin-top: -1.5rem;
	}

	.meta {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		padding-top: var(--space-lg);
		border-top: 1px solid var(--border);
	}

	.target-date {
		font-variant-numeric: tabular-nums;
		font-size: 0.9375rem;
		font-weight: 600;
		color: var(--text-secondary);
		letter-spacing: 0.05em;
	}

	.timezone {
		font-size: 0.8125rem;
		color: var(--text-tertiary);
	}

	.complete-badge {
		display: inline-flex;
		align-items: center;
		gap: var(--space-sm);
		padding: var(--space-sm) var(--space-md);
		background: rgba(34, 197, 94, 0.1);
		border: 1px solid rgba(34, 197, 94, 0.2);
		border-radius: var(--radius-full);
		color: #22c55e;
		font-size: 0.875rem;
		font-weight: 500;
	}

	.footer {
		text-align: center;
		font-size: 0.9375rem;
		color: var(--text-secondary);
	}

	.emphasis {
		color: var(--text-primary);
		font-weight: 500;
	}

	@media (max-width: 480px) {
		.scene {
			padding: var(--space-md);
		}

		.card {
			padding: var(--space-xl);
		}

		.timer {
			gap: var(--space-sm);
		}

		.unit {
			min-width: 48px;
		}
	}

	@media (max-width: 360px) {
		.timer {
			gap: var(--space-xs);
		}

		.unit {
			min-width: 40px;
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
