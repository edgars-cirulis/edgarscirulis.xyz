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
	};

	type HoroscopeMeta = {
		week?: string | null;
		month?: string | null;
		challenging_days?: string | null;
		standout_days?: string | null;
	};

	type HoroscopeEntry = {
		text: string | null;
		meta: HoroscopeMeta;
	};

	type HoroscopePeriods = {
		daily: HoroscopeEntry;
		weekly: HoroscopeEntry;
		monthly: HoroscopeEntry;
	};

	export let data: {
		spotify: Spotify | null;
		me: typeof import('$lib/me').me;
		lang: 'lv' | 'en';
		horoscopes?: {
			aquarius: HoroscopePeriods;
			pisces: HoroscopePeriods;
		};
	};

	const { me, lang } = data;
	const nowPlayingModule = import('$lib/components/NowPlaying.svelte');

	const t = (lv: string, en: string) => (lang === 'lv' ? lv : en);

	// ────────────────────────────────────────────────
	//  Password protection – modern gate
	// ────────────────────────────────────────────────
	let password = '';
	let isAuthenticated = false;
	let error = false;

	const CORRECT_PASSWORD = '21:26'; // or '2126' without colon — your choice

	function checkPassword() {
		if (password.trim() === CORRECT_PASSWORD) {
			isAuthenticated = true;
			error = false;
			localStorage.setItem('access_granted_2026', 'true');
		} else {
			error = true;
			password = '';
		}
	}

	// ────────────────────────────────────────────────
	//  Daily love quote
	// ────────────────────────────────────────────────
	const loveQuotes = [
  // ... previous entries ...
  {
    lv: 'Viņš ievelk viņu dušā aiz matiem, ieslēdz ledus ūdeni pilnā spēkā un piespiež seju pie slapjās flīzes. „Atver muti kā laba kucēna un turies — es tev tagad ielauzīšu kaklu ar savu locekli, kamēr tu slīksti aukstumā. Ja izvilksi to ārā vai sāksi elst — es tevi apgriezīšu otrādi, piesienu pie dušas stieņa un ļaušu ūdenim sist pa izstieptu pīķi, līdz tu gaudosi un lūgsies, lai es tevi beidzot izdrāžu kā pelnītu caurumu.” Viņas ceļi trīc, ūdens tek pa vaigiem sajaukts ar siekalām, bet mute paliek vaļā — dziļa, trokšņaina rīšana sākas, kamēr viņa ķermenis nodevīgi saraujas no aukstuma un pazemojošas kāres. 🖤🧊⛓️💦',
    en: 'He yanks her into the shower by the hair, cranks the ice-cold water full blast and slams her face against the wet tile. “Open that mouth like a good little bitch and stay — I’m throat-fucking you raw while you drown in the cold. Pull away or gasp for air — I’ll flip you upside down, cuff you to the shower rod and let the stream pound your stretched cunt until you’re howling and begging to finally get used like the earned hole you are.” Her knees buckle, water streams down her cheeks mixed with drool, but her mouth stays open — deep, noisy gagging begins as her body betrays her with shivers of cold and humiliating need. 🖤🧊⛓️💦'
  }
] as const;

	const dayKey = new Intl.DateTimeFormat('en-CA', {
		timeZone: 'Europe/Riga',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit'
	}).format(new Date());

	const hash = (s: string) => {
		let h = 0;
		for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
		return h;
	};

	const quoteIndex = hash(dayKey + me.name) % loveQuotes.length;
	const quote = loveQuotes[quoteIndex];
	const quoteText = t(quote.lv, quote.en);

	// ────────────────────────────────────────────────
	//  Riga time helper
	// ────────────────────────────────────────────────
	function getRigaNow(): Date {
		const str = new Intl.DateTimeFormat('en-US', {
			timeZone: 'Europe/Riga',
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric',
			hour12: false
		}).format(new Date());

		const [datePart, timePart] = str.split(', ');
		const [month, day, year] = datePart.split('/');
		const [hour, minute, second] = timePart.split(':');

		return new Date(+year, +month - 1, +day, +hour, +minute, +second);
	}

	// ────────────────────────────────────────────────
	//  Time known
	// ────────────────────────────────────────────────
	const knownSince = new Date('2026-01-09T21:26:00+02:00');

	let knownMonths = 0;
	let knownDays = 0;
	let knownHours = 0;
	let knownMinutes = 0;

	function updateKnownTime() {
		const now = getRigaNow();
		const diffMs = now.getTime() - knownSince.getTime();
		if (diffMs < 0) {
			knownMonths = knownDays = knownHours = knownMinutes = 0;
			return;
		}

		let months = 0;
		let temp = new Date(knownSince);
		while (true) {
			const next = new Date(temp);
			next.setMonth(next.getMonth() + 1);
			if (next > now) break;
			temp = next;
			months++;
		}

		const remainingMs = now.getTime() - temp.getTime();
		const remainingDays = Math.floor(remainingMs / 86400000);

		knownMonths = months;
		knownDays = remainingDays >= 0 ? remainingDays : 0;

		const totalHours = Math.floor(diffMs / 3600000);
		knownHours = totalHours % 24;
		knownMinutes = Math.floor((diffMs % 3600000) / 60000);
	}

	// ────────────────────────────────────────────────
	//  Destiny countdown
	// ────────────────────────────────────────────────
	const destinyDeadline = new Date('2026-02-23T23:59:00+02:00');

	let cdDays = 0;
	let cdHours = 0;
	let cdMinutes = 0;
	let cdSeconds = 0;
	let cdProgress = 0;

	function updateCountdown() {
		const now = getRigaNow();
		const leftMs = destinyDeadline.getTime() - now.getTime();
		const safeLeft = Math.max(0, leftMs);

		const totalMs = destinyDeadline.getTime() - knownSince.getTime();
		cdProgress = totalMs > 0 ? Math.min(100, 100 - (safeLeft / totalMs) * 100) : 100;

		const totalSeconds = Math.floor(safeLeft / 1000);
		cdDays = Math.floor(totalSeconds / 86400);
		cdHours = Math.floor((totalSeconds % 86400) / 3600);
		cdMinutes = Math.floor((totalSeconds % 3600) / 60);
		cdSeconds = totalSeconds % 60;
	}

	onMount(() => {
		// Check saved access
		if (localStorage.getItem('access_granted_2026') === 'true') {
			isAuthenticated = true;
		}

		updateKnownTime();
		updateCountdown();

		const knownInterval = setInterval(updateKnownTime, 60000);
		const countdownInterval = setInterval(updateCountdown, 1000);

		return () => {
			clearInterval(knownInterval);
			clearInterval(countdownInterval);
		};
	});

	// ────────────────────────────────────────────────
	//  Horoscope UI logic
	// ────────────────────────────────────────────────
	let hzPeriod: 'daily' | 'weekly' | 'monthly' = 'daily';

	const periodLabel = (p: typeof hzPeriod) =>
		p === 'daily'
			? t('Šodien', 'Today')
			: p === 'weekly'
				? t('Nedēļa', 'Week')
				: t('Mēnesis', 'Month');

	const getEntry = (sign: 'aquarius' | 'pisces') => data.horoscopes?.[sign]?.[hzPeriod];

	const periodPill = () => dayKey;

	const cardBadge = () => dayKey;

	const splitDays = (s?: string | null) =>
		(s ?? '')
			.split(',')
			.map((x) => x.trim())
			.filter(Boolean);
</script>

<svelte:head>
	<title>{me.name} · {t('Šobrīd skan', 'Now playing')}</title>
	<meta name="description" content={t('Spotify “Now playing”', 'Spotify “Now playing”')} />
</svelte:head>

{#if !isAuthenticated}
	<div class="auth-wrapper">
		<div class="auth-container">
			<div class="auth-glow"></div>

			<div class="auth-content">
				<div class="auth-header">
					<div class="auth-symbol">✦</div>
					<h1>Private Access</h1>
				</div>

				<form on:submit|preventDefault={checkPassword} class="auth-form">
					<div class="input-wrapper">
						<input
							type="password"
							bind:value={password}
							placeholder="Enter the time"
							autofocus
							autocomplete="off"
							class:error={error}
							required
						/>
						<div class="input-glow"></div>
					</div>

					{#if error}
						<div class="error-message fade-in">Incorrect • Try again</div>
					{/if}

					<button
						type="submit"
						class="auth-submit"
						disabled={password.trim().length < 4}
					>
						Unlock
					</button>
				</form>

				<div class="auth-hint">
					<span>Time when we started everything</span>
				</div>
			</div>
		</div>
	</div>
{:else}
	<div class="page">
		<header class="top">
			<nav class="lang">
				<a href="/" class:active={lang === 'lv'}>LV</a>
				<span>·</span>
				<a href="/en" class:active={lang === 'en'}>EN</a>
			</nav>
		</header>

		<main class="wrap">
			<!-- Now Playing -->
			<section class="card">
				<div class="card-head">
					<h1 class="title">
						<Icon icon="lucide:audio-lines" width="18" />
						<span>{t('Šobrīd skan', 'Now playing')}</span>
					</h1>
				</div>
				{#await nowPlayingModule then mod}
					<svelte:component this={mod.default} spotify={data.spotify} />
				{/await}
			</section>

			<!-- Samantha quote -->
			<section class="card love">
				<div class="love-ic">
					<Icon icon="lucide:heart" width="18" />
				</div>
				<div class="love-body">
					<div class="love-title">Samantha</div>
					<p class="love-text">{quoteText}</p>
					<div class="love-meta muted">
						<Icon icon="lucide:sparkles" width="14" />
						<span>{t('Šodienas citāts', 'Today’s quote')}</span>
					</div>
				</div>
			</section>

			<!-- Horoscopes -->
			{#if data.horoscopes}
				<section class="card hz" aria-label={t('Horoskops', 'Horoscope')}>
					<div class="card-head">
						<h2 class="title">
							<Icon icon="lucide:stars" width="18" aria-hidden="true" />
							<span>{t('Horoskops', 'Horoscope')}</span>
						</h2>
					</div>

					<div class="hz-grid">
						{#each ['aquarius', 'pisces'] as sign}
							{@const entry = getEntry(sign as 'aquarius' | 'pisces')}
							{#if entry?.text}
								<article class="hz-item">
									<div class="hz-head">
										<div class="hz-sign">{sign === 'aquarius' ? '♒ Aquarius' : '♓ Pisces'}</div>
										<div class="hz-badge">{cardBadge()}</div>
									</div>

									{#if hzPeriod !== 'daily' && (entry.meta?.challenging_days || entry.meta?.standout_days)}
										<div class="hz-days">
											{#if entry.meta?.standout_days}
												<div class="hz-days-row">
													<span class="hz-days-label">{t('Labās dienas', 'Standout')}</span>
													<div class="hz-days-chips">
														{#each splitDays(entry.meta.standout_days) as d}
															<span class="chip">{d}</span>
														{/each}
													</div>
												</div>
											{/if}
											{#if entry.meta?.challenging_days}
												<div class="hz-days-row">
													<span class="hz-days-label">{t('Sarežģītās', 'Challenging')}</span>
													<div class="hz-days-chips">
														{#each splitDays(entry.meta.challenging_days) as d}
															<span class="chip chip-warn">{d}</span>
														{/each}
													</div>
												</div>
											{/if}
										</div>
									{/if}

									<p class="hz-text">{entry.text}</p>
								</article>
							{/if}
						{/each}
					</div>
				</section>
			{/if}

			<!-- Countdown -->
			<section class="card countdown" data-urgent={cdDays === 0} aria-label="Likteņa taimeris">
				<div class="card-head">
					<h2 class="title">
						<Icon icon="lucide:hourglass" width="18" />
						<span>Likteņa taimeris</span>
					</h2>
					<span class="pill">2026-02-23 · 23:59</span>
				</div>

				<div class="cd-grid">
					<div class="cd-box">
						<div class="cd-num">{cdDays}</div>
						<div class="cd-label">{t('dienas', 'days')}</div>
					</div>
					<div class="cd-box">
						<div class="cd-num">{cdHours}</div>
						<div class="cd-label">{t('stundas', 'hours')}</div>
					</div>
					<div class="cd-box">
						<div class="cd-num">{cdMinutes}</div>
						<div class="cd-label">{t('minūtes', 'minutes')}</div>
					</div>
					<div class="cd-box">
						<div class="cd-num">{cdSeconds}</div>
						<div class="cd-label">{t('sekundes', 'seconds')}</div>
					</div>
				</div>

				<div class="cd-bar" aria-label={t('Progresa josla', 'Progress bar')}>
					<div class="cd-bar-fill" style="width: {cdProgress}%"></div>
				</div>

				<p class="muted cd-note">
					{t('Laiks līdz neizbēgamajam lēmumam.', 'Time until the inevitable moment.')}
				</p>
			</section>

			<!-- Time known -->
			<section class="card time">
				<div class="card-head">
					<h2 class="title">
						<Icon icon="lucide:clock" width="18" />
						<span>{t('Cik ilgi mēs pazīstami?', 'Time we’ve known each other?')}</span>
					</h2>
				</div>

				<div class="time-grid">
					{#if knownMonths > 0}
						<div class="time-box">
							<div class="time-num">{knownMonths}</div>
							<div class="time-label">{t('mēneši', 'months')}</div>
						</div>
					{/if}
					<div class="time-box">
						<div class="time-num">{knownDays}</div>
						<div class="time-label">{t('dienas', 'days')}</div>
					</div>
					<div class="time-box">
						<div class="time-num">{knownHours}</div>
						<div class="time-label">{t('stundas', 'hours')}</div>
					</div>
					<div class="time-box">
						<div class="time-num">{knownMinutes}</div>
						<div class="time-label">{t('minūtes', 'minutes')}</div>
					</div>
				</div>

				<p class="time-note muted">
					{t(
						'Kopš 2026. gada 9. janvāra, 21:26 (Latvijas laiks)',
						'Since January 9, 2026, 21:26 (Latvia time)'
					)}
				</p>
			</section>
		</main>
	</div>
{/if}

<style>
	/* ──────────────────────────────────────────────── */
	/*          Modern password screen (2025–2026 vibe) */
	/* ──────────────────────────────────────────────── */
	.auth-wrapper {
		position: fixed;
		inset: 0;
		background: #0a0a0f;
		display: grid;
		place-items: center;
		z-index: 10000;
		overflow: hidden;
	}

	.auth-container {
		position: relative;
		width: 100%;
		max-width: 380px;
		padding: 3.5rem 2rem;
		border-radius: 1.5rem;
		background: linear-gradient(145deg, rgba(20, 20, 35, 0.85), rgba(10, 10, 20, 0.92));
		backdrop-filter: blur(20px) saturate(180%);
		border: 1px solid rgba(120, 100, 255, 0.12);
		box-shadow:
			0 25px 60px -15px rgba(0, 0, 0, 0.7),
			0 0 0 1px rgba(120, 100, 255, 0.08) inset;
		overflow: hidden;
	}

	.auth-glow {
		position: absolute;
		inset: -40%;
		background: radial-gradient(
			circle at 30% 20%,
			rgba(139, 92, 246, 0.18) 0%,
			rgba(79, 70, 229, 0.09) 30%,
			transparent 60%
		);
		opacity: 0.7;
		pointer-events: none;
		animation: slow-breathe 18s infinite ease-in-out;
	}

	@keyframes slow-breathe {
		0%, 100% { opacity: 0.6; transform: scale(1); }
		50%      { opacity: 0.9; transform: scale(1.08); }
	}

	.auth-content {
		position: relative;
		z-index: 2;
	}

	.auth-header {
		text-align: center;
		margin-bottom: 2.5rem;
	}

	.auth-symbol {
		font-size: 2.8rem;
		line-height: 1;
		margin-bottom: 0.6rem;
		color: #a5b4fc;
		opacity: 0.9;
		letter-spacing: -0.05em;
	}

	.auth-header h1 {
		font-size: 1.85rem;
		font-weight: 700;
		color: white;
		margin: 0;
		letter-spacing: -0.025em;
		background: linear-gradient(90deg, #c4b5fd, #a5b4fc);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
	}

	.auth-form {
		display: flex;
		flex-direction: column;
		gap: 1.4rem;
	}

	.input-wrapper {
		position: relative;
	}

	input[type='password'] {
		width: 100%;
		padding: 1.1rem 1.4rem;
		font-size: 1.15rem;
		background: rgba(30, 30, 50, 0.6);
		border: 1px solid rgba(120, 100, 255, 0.25);
		border-radius: 0.9rem;
		color: #f1f5f9;
		font-family: inherit;
		transition: all 0.25s ease;
		text-align: center;
		letter-spacing: 0.08em;
	}

	input:focus {
		outline: none;
		border-color: #a5b4fc;
		box-shadow: 0 0 0 3.5px rgba(165, 180, 252, 0.22);
		background: rgba(40, 40, 65, 0.7);
	}

	input.error {
		border-color: #f87171;
		animation: error-shake 0.4s ease;
	}

	@keyframes error-shake {
		0%, 100% { transform: translateX(0); }
		20%, 60% { transform: translateX(-6px); }
		40%, 80% { transform: translateX(6px); }
	}

	.input-glow {
		position: absolute;
		inset: 0;
		border-radius: 0.9rem;
		pointer-events: none;
		opacity: 0;
		transition: opacity 0.4s;
		background: linear-gradient(90deg, transparent, rgba(165, 180, 252, 0.15), transparent);
	}

	input:focus + .input-glow {
		opacity: 1;
	}

	.auth-submit {
		padding: 1rem;
		font-size: 1.05rem;
		font-weight: 600;
		color: white;
		background: linear-gradient(90deg, #7c3aed, #a78bfa);
		border: none;
		border-radius: 0.9rem;
		cursor: pointer;
		transition: all 0.3s ease;
		letter-spacing: 0.02em;
	}

	.auth-submit:hover:not(:disabled) {
		transform: translateY(-2px);
		box-shadow: 0 12px 32px rgba(124, 58, 237, 0.35);
	}

	.auth-submit:disabled {
		opacity: 0.4;
		cursor: not-allowed;
	}

	.error-message {
		color: #fca5a5;
		font-size: 0.95rem;
		text-align: center;
		animation: fadeIn 0.5s ease;
	}

	.auth-hint {
		margin-top: 2.2rem;
		font-size: 0.9rem;
		color: #94a3b8;
		text-align: center;
		letter-spacing: 0.01em;
	}

	.auth-hint span {
		opacity: 0.85;
		font-style: italic;
	}

	.fade-in {
		animation: fadeIn 0.6s ease-out;
	}

	@keyframes fadeIn {
		from { opacity: 0; transform: translateY(8px); }
		to   { opacity: 1; transform: translateY(0); }
	}

	/* ──────────────────────────────────────────────── */
	/*               Original page styles               */
	/* ──────────────────────────────────────────────── */
	.page {
		min-height: 100vh;
		margin: 0;
		padding: 0;
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 18px;
		width: 100%;
		box-sizing: border-box;
	}

	.top {
		display: flex;
		justify-content: flex-end;
		padding: 12px 16px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--surface) 85%, rgba(0, 0, 0, 0.1));
		border: 1px solid var(--border);
		backdrop-filter: blur(14px) saturate(140%);
		box-shadow: var(--ring), 0 8px 32px rgba(0, 0, 0, 0.25);
	}

	.lang {
		display: flex;
		gap: 8px;
		align-items: center;
		padding: 6px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.04);
	}

	.lang a {
		padding: 4px 8px;
		border-radius: 999px;
		color: var(--muted);
		text-decoration: none;
		font-size: 0.9rem;
		transition: all 0.15s ease;
	}

	.lang a.active {
		background: rgba(255, 255, 255, 0.12);
		color: var(--text);
		font-weight: 600;
	}

	.wrap {
		width: 100%;
		max-width: 100%;
		margin: 0;
		padding: 0 10px;
		display: grid;
		gap: 14px;
		align-content: start;
		box-sizing: border-box;
	}

	.card {
		border-radius: 20px;
		padding: 20px;
		background: var(--surface-strong);
		border: 1px solid var(--border-strong);
		backdrop-filter: blur(var(--glass-blur, 12px)) saturate(var(--glass-sat, 180%));
		box-shadow: 0 8px 32px rgba(0, 0, 0, 0.22);
		position: relative;
		overflow: hidden;
	}

	.card::before {
		content: '';
		position: absolute;
		inset: -50% -30% auto -30%;
		height: 70%;
		background: radial-gradient(ellipse at 30% 20%, rgba(255, 255, 255, 0.14), transparent 60%);
		pointer-events: none;
	}

	.card-head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
		margin-bottom: 16px;
		gap: 12px;
	}

	.title {
		display: flex;
		align-items: center;
		gap: 10px;
		font-size: 1.18rem;
		font-weight: 700;
		letter-spacing: -0.01em;
		margin: 0;
	}

	.love {
		display: grid;
		grid-template-columns: 48px 1fr;
		gap: 16px;
		background: linear-gradient(145deg, rgba(139, 92, 246, 0.08), transparent 60%), var(--surface-strong);
		border: 1px solid color-mix(in srgb, var(--tint), var(--border-strong) 70%);
		border-radius: 24px;
		padding: 20px;
	}

	.love-title {
		font-weight: 800;
		font-size: 1.15rem;
		margin-bottom: 6px;
	}

	.love-text {
		line-height: 1.7;
		color: color-mix(in srgb, var(--text) 90%, transparent);
		margin: 0;
	}

	.love-meta {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 0.88rem;
		margin-top: 12px;
	}

	.hz-grid {
		display: grid;
		gap: 14px;
	}

	.hz-item {
		padding: 16px;
		border-radius: 16px;
		background: rgba(255, 255, 255, 0.035);
		border: 1px solid var(--border);
		box-shadow: var(--ring);
	}

	.hz-head {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12px;
	}

	.hz-sign {
		font-weight: 800;
		font-size: 1.1rem;
	}

	.hz-badge {
		font-size: 0.82rem;
		padding: 4px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.04);
		color: var(--muted);
	}

	.hz-text {
		line-height: 1.65;
		color: color-mix(in srgb, var(--text) 88%, transparent);
		margin: 0;
	}

	.cd-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;
		margin: 16px 0;
	}

	.cd-box {
		text-align: center;
		padding: 12px 8px;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--border);
		box-shadow: var(--ring);
	}

	.cd-num {
		font-size: 1.6rem;
		font-weight: 900;
		line-height: 1;
	}

	.cd-label {
		font-size: 0.82rem;
		color: var(--muted);
		margin-top: 4px;
	}

	.cd-bar {
		height: 12px;
		background: rgba(255, 255, 255, 0.08);
		border-radius: 999px;
		overflow: hidden;
		border: 1px solid var(--border);
		margin: 12px 0;
	}

	.cd-bar-fill {
		height: 100%;
		background: linear-gradient(90deg, var(--tint), color-mix(in srgb, var(--tint) 40%, #000));
		transition: width 0.8s ease;
		animation: pulse 4s infinite ease-in-out;
	}

	@keyframes pulse {
		0%, 100% { opacity: 0.92; }
		50%      { opacity: 1; }
	}

	.countdown[data-urgent='true'] .cd-bar-fill {
		background: linear-gradient(90deg, #f43f5e, #fb7185);
	}

	.time-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(88px, 1fr));
		gap: 12px;
		margin: 16px 0;
	}

	.time-box {
		text-align: center;
		padding: 12px 8px;
		border-radius: 14px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--border);
		box-shadow: var(--ring);
	}

	.time-num {
		font-size: 1.55rem;
		font-weight: 900;
		line-height: 1;
	}

	.time-label {
		font-size: 0.84rem;
		color: var(--muted);
		margin-top: 4px;
	}

	.pill {
		padding: 6px 12px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid var(--border);
		font-size: 0.84rem;
		color: var(--muted);
	}

	.muted {
		color: var(--muted);
	}

	@media (max-width: 480px) {
		.cd-grid,
		.time-grid {
			grid-template-columns: repeat(2, 1fr);
		}
	}
</style>
