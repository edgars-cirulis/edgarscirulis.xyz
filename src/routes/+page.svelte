<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let visible = false;

	// Europe/Riga: 2026-02-20 00:00:00 (GMT+2)
	const target = new Date('2026-02-20T00:00:00+02:00').getTime();

	let days = 0;
	let hours = 0;
	let minutes = 0;
	let seconds = 0;
	let done = false;

	let tick: number;

	function pad2(n: number) {
		return String(n).padStart(2, '0');
	}

	function calc() {
		const now = Date.now();
		const t = Math.max(0, target - now);
		done = t === 0;

		const total = Math.floor(t / 1000);

		days = Math.floor(total / 86400);
		const r1 = total % 86400;

		hours = Math.floor(r1 / 3600);
		const r2 = r1 % 3600;

		minutes = Math.floor(r2 / 60);
		seconds = r2 % 60;
	}

	onMount(() => {
		setTimeout(() => (visible = true), 200);
		calc();
		tick = window.setInterval(calc, 1000);
	});

	onDestroy(() => clearInterval(tick));
</script>

<svelte:head>
	<title>✦ Atvēršana drīzumā</title>
	<meta name="theme-color" content="#050509" />
	<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
</svelte:head>

<div class="scene">
	<div class="fx" aria-hidden="true">
		<div class="aurora a1"></div>
		<div class="aurora a2"></div>
		<div class="aurora a3"></div>
		<div class="grain"></div>
	</div>

	<div class="content" class:visible>
		<div class="card">
			<div class="badge">
				<span class="dot"></span>
				<span>Vietne atgriezīsies</span>
			</div>

			<h1 class="title">Atvēršana drīzumā</h1>

			<p class="subtitle">
				Mēs pārtaisām visu no jauna — tīrāk, skaistāk un asāk.<br />
				Atlikušais laiks līdz atvēršanai:
			</p>

			<div class="countdown" data-done={done}>
				<div class="blob" aria-hidden="true"></div>

				<div class="row" role="timer" aria-live="polite">
					<div class="unit">
						<div class="num">{days}</div>
						<div class="lbl">dienas</div>
					</div>

					<div class="sep" aria-hidden="true">:</div>

					<div class="unit">
						<div class="num">{pad2(hours)}</div>
						<div class="lbl">stundas</div>
					</div>

					<div class="sep" aria-hidden="true">:</div>

					<div class="unit">
						<div class="num">{pad2(minutes)}</div>
						<div class="lbl">minūtes</div>
					</div>

					<div class="sep" aria-hidden="true">:</div>

					<div class="unit">
						<div class="num pulse">{pad2(seconds)}</div>
						<div class="lbl">sekundes</div>
					</div>
				</div>

				<div class="hint">
					{#if done}
						<span class="ready">✅ Gatavs. Vari atsvaidzināt lapu.</span>
					{:else}
						<span class="date">20 · 02 · 2026</span>
						<span class="mini">Rīga (GMT+2)</span>
					{/if}
				</div>
			</div>

			<div class="line"></div>

			<p class="footer">Paldies, ka gaidi. <span class="soft">Drīz atgriezīsimies.</span></p>
		</div>
	</div>
</div>

<style>
	:root {
		--bg: #050509;
		--text: #f1f5f9;
		--muted: #94a3b8;

		--accent: #c084fc;
		--accent2: #60a5fa;
		--accent3: #34d399;

		--glass: rgba(18, 18, 28, 0.42);
		--glass2: rgba(255, 255, 255, 0.06);
		--stroke: rgba(255, 255, 255, 0.12);

		--radius: 28px;
	}

	.scene {
		min-height: 100dvh;
		width: 100vw;
		margin-left: calc(50% - 50vw);
		margin-right: calc(50% - 50vw);

		background: var(--bg);
		display: grid;
		place-items: center;
		color: var(--text);
		position: relative;
		overflow: hidden;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

		padding:
			max(18px, env(safe-area-inset-top))
			max(16px, env(safe-area-inset-right))
			max(22px, env(safe-area-inset-bottom))
			max(16px, env(safe-area-inset-left));
	}

	.fx {
		position: absolute;
		inset: -40px;
		z-index: 0;
		pointer-events: none;
	}

	.aurora {
		position: absolute;
		inset: -30%;
		filter: blur(28px);
		opacity: 0.55;
		transform: translate3d(0, 0, 0);
		mix-blend-mode: screen;
	}

	.a1 {
		background: radial-gradient(circle at 20% 30%, rgba(192, 132, 252, 0.55) 0%, transparent 55%),
			radial-gradient(circle at 70% 60%, rgba(96, 165, 250, 0.45) 0%, transparent 55%);
		animation: drift1 10s ease-in-out infinite;
	}
	.a2 {
		background: radial-gradient(circle at 30% 80%, rgba(52, 211, 153, 0.35) 0%, transparent 55%),
			radial-gradient(circle at 85% 20%, rgba(167, 139, 250, 0.35) 0%, transparent 55%);
		animation: drift2 14s ease-in-out infinite;
	}
	.a3 {
		background: radial-gradient(circle at 55% 45%, rgba(255, 255, 255, 0.18) 0%, transparent 60%);
		animation: drift3 18s ease-in-out infinite;
		opacity: 0.35;
	}

	.grain {
		position: absolute;
		inset: 0;
		opacity: 0.12;
		background-image:
			repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.03) 0 1px, transparent 1px 2px),
			repeating-linear-gradient(90deg, rgba(0, 0, 0, 0.03) 0 1px, transparent 1px 3px);
		mix-blend-mode: overlay;
		animation: grainMove 2.5s steps(8) infinite;
	}

	@keyframes drift1 {
		0% { transform: translate(-4%, -2%) rotate(0deg); }
		50% { transform: translate(3%, 2%) rotate(10deg); }
		100% { transform: translate(-4%, -2%) rotate(0deg); }
	}
	@keyframes drift2 {
		0% { transform: translate(3%, 0%) rotate(0deg); }
		50% { transform: translate(-2%, 3%) rotate(-12deg); }
		100% { transform: translate(3%, 0%) rotate(0deg); }
	}
	@keyframes drift3 {
		0% { transform: translate(0%, 0%) scale(1); }
		50% { transform: translate(2%, -2%) scale(1.04); }
		100% { transform: translate(0%, 0%) scale(1); }
	}
	@keyframes grainMove {
		0% { transform: translate(0, 0); }
		100% { transform: translate(12px, -10px); }
	}

	.content {
		position: relative;
		z-index: 1;
		opacity: 0;
		transform: translateY(18px);
		transition: all 0.75s cubic-bezier(0.23, 1, 0.32, 1);
		width: 100%;
		display: grid;
		place-items: center;
	}
	.content.visible {
		opacity: 1;
		transform: translateY(0);
	}

	.card {
		width: min(560px, 92vw);
		padding: 2.4rem 1.6rem 2.1rem;
		text-align: center;

		background: linear-gradient(180deg, var(--glass2), transparent), var(--glass);
		border: 1px solid var(--stroke);
		border-radius: var(--radius);

		backdrop-filter: blur(22px) saturate(170%);
		-webkit-backdrop-filter: blur(22px) saturate(170%);

		box-shadow:
			0 30px 90px rgba(0, 0, 0, 0.62),
			inset 0 1px 0 rgba(255, 255, 255, 0.08);
		position: relative;
		overflow: hidden;
	}

	.card::before {
		content: '';
		position: absolute;
		inset: -2px;
		background: radial-gradient(circle at 20% 10%, rgba(255, 255, 255, 0.14), transparent 55%),
			linear-gradient(120deg, transparent 30%, rgba(255, 255, 255, 0.06), transparent 70%);
		opacity: 0.9;
		pointer-events: none;
		animation: sheen 6s ease-in-out infinite;
	}

	@keyframes sheen {
		0% { transform: translateX(-6%) translateY(-2%); }
		50% { transform: translateX(6%) translateY(2%); }
		100% { transform: translateX(-6%) translateY(-2%); }
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		padding: 8px 12px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid rgba(255, 255, 255, 0.1);
		color: rgba(241, 245, 249, 0.92);
		font-size: 0.9rem;
		letter-spacing: 0.02em;
		margin-bottom: 18px;
	}

	.dot {
		width: 10px;
		height: 10px;
		border-radius: 999px;
		background: linear-gradient(90deg, var(--accent), var(--accent2), var(--accent3));
		box-shadow: 0 0 18px rgba(192, 132, 252, 0.6);
		animation: blink 1.2s ease-in-out infinite;
	}

	@keyframes blink {
		0%, 100% { transform: scale(1); opacity: 0.85; }
		50% { transform: scale(1.25); opacity: 1; }
	}

	.title {
		font-size: clamp(1.8rem, 3.2vw, 2.45rem);
		font-weight: 900;
		margin-bottom: 0.8rem;
		background: linear-gradient(90deg, #e9d5ff, var(--accent), var(--accent2));
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.subtitle {
		font-size: 1.05rem;
		line-height: 1.6;
		color: var(--muted);
		margin-bottom: 1.4rem;
	}

	.countdown {
		position: relative;
		padding: 16px 14px 12px;
		border-radius: 22px;
		border: 1px solid rgba(255, 255, 255, 0.12);
		background: rgba(255, 255, 255, 0.04);
		backdrop-filter: blur(18px) saturate(175%);
		-webkit-backdrop-filter: blur(18px) saturate(175%);
		overflow: hidden;

		width: 100%;
		max-width: 520px;
		margin: 0 auto;
	}

	.blob {
		position: absolute;
		inset: -30%;
		background: radial-gradient(circle at 30% 35%, rgba(192, 132, 252, 0.25), transparent 55%),
			radial-gradient(circle at 70% 65%, rgba(96, 165, 250, 0.18), transparent 55%),
			radial-gradient(circle at 55% 55%, rgba(52, 211, 153, 0.12), transparent 60%);
		filter: blur(16px);
		opacity: 0.9;
		animation: blob 7s ease-in-out infinite;
	}

	@keyframes blob {
		0% { transform: translate(-2%, -1%) scale(1) rotate(0deg); }
		50% { transform: translate(2%, 1%) scale(1.06) rotate(12deg); }
		100% { transform: translate(-2%, -1%) scale(1) rotate(0deg); }
	}

	.row {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: stretch;
		gap: 10px;
		flex-wrap: nowrap;
	}

	.unit {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 10px 10px;
		border-radius: 18px;
		background: rgba(0, 0, 0, 0.14);
		border: 1px solid rgba(255, 255, 255, 0.08);
		box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
		min-width: 92px;
	}

	.num {
		font-variant-numeric: tabular-nums;
		font-weight: 900;
		font-size: clamp(1.35rem, 4.4vw, 2.2rem);
		letter-spacing: 0.02em;
		min-width: 2ch;
		text-align: center;
		text-shadow:
			0 0 22px rgba(192, 132, 252, 0.35),
			0 0 34px rgba(96, 165, 250, 0.18);
	}

	.lbl {
		margin-top: 4px;
		font-size: 0.78rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: rgba(148, 163, 184, 0.92);
	}

	.sep {
		display: grid;
		place-items: center;
		font-weight: 900;
		opacity: 0.6;
		transform: translateY(-8px);
		width: 10px;
	}

	.pulse {
		animation: pulse 1s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { transform: translateY(0) scale(1); }
		50% { transform: translateY(-1px) scale(1.04); }
	}

	.hint {
		margin-top: 12px;
		display: flex;
		justify-content: center;
		align-items: baseline;
		gap: 10px;
		color: rgba(148, 163, 184, 0.9);
		position: relative;
	}

	.date {
		letter-spacing: 0.12em;
		font-size: 0.92rem;
		opacity: 0.85;
	}

	.mini {
		font-size: 0.82rem;
		opacity: 0.7;
	}

	.ready {
		color: rgba(241, 245, 249, 0.92);
	}

	.countdown[data-done='true'] .blob {
		animation-play-state: paused;
		opacity: 0.75;
	}

	.line {
		width: 70px;
		height: 2px;
		background: linear-gradient(90deg, transparent, var(--accent), transparent);
		margin: 1.4rem auto 1.1rem;
		opacity: 0.9;
	}

	.footer {
		color: rgba(148, 163, 184, 0.92);
		font-size: 0.98rem;
	}

	.soft {
		color: rgba(241, 245, 249, 0.9);
	}

	@media (max-width: 420px) {
		.card {
			padding: 2.1rem 1.2rem 1.9rem;
		}

		.row {
			gap: 8px;
		}

		.unit {
			min-width: 78px;
			padding: 10px 8px;
		}

		.sep {
			transform: translateY(-6px);
		}
	}

	@media (max-width: 340px) {
		.row {
			flex-wrap: wrap;
			row-gap: 8px;
		}
		.sep {
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
