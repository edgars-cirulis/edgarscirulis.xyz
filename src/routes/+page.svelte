<script lang="ts">
	import Icon from '@iconify/svelte';
	import { mailto } from '$lib/utils';
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

const loveQuotes = [
  {
    lv: 'Edgars ievelk Samantu tumšā alejā, spiež pret koku, rokas paceltas virs galvas, turētas stingri. Viņš čukst ausī: “Klusi, mīļā, kāds var dzirdēt... bet es zinu, ka tu gribi, lai es tevi paņemu tieši šeit, riskanti un ātri, līdz tu trīc no baudas.” Viņa elsojums ir atbilde. 🌑😈',
    en: 'Edgars pulls Samantha into a dark alley, presses her against a tree, hands raised above her head, held tight. He whispers in her ear: “Quiet, darling, someone might hear... but I know you want me to take you right here, risky and fast, until you shake with pleasure.” Her panting is the answer. 🌑😈'
  },
  {
    lv: 'Samanta ir sasieta ar zīda šallēm pie krēsla, acis aizsietas, un Edgars lēnām glāsta viņas ķermeni ar ledus gabaliņu, liekot ādai sarauties. Viņš saka: “Pastāsti man savus tumšākos noslēpumus, vai es turpināšu šo mocīšanu... līdz tu lūdzies pēc mana pieskāriena, kas aizvedīs tevi līdz ekstāzei.” Viņa balsī dzirdama vēlme. ❄️🔥',
    en: 'Samantha is tied with silk scarves to the chair, eyes blindfolded, and Edgars slowly traces her body with an ice cube, making her skin contract. He says: “Tell me your darkest secrets, or I’ll continue this torment... until you beg for my touch that will take you to ecstasy.” Her voice reveals desire. ❄️🔥'
  },
  {
    lv: 'Edgars aizved Samantu uz jumta, vēja šalkā, un spiež viņu pret margu, ķermenis pret ķermeni. Viņš čukst: “Skaties uz pilsētu zem mums, kamēr es tevi aizpildīšu ar savu kaisli... ātri, intensīvi, līdz tu kliedz vējam līdzi.” Viņas rokas satver margu stingrāk. 🌃💨',
    en: 'Edgars leads Samantha to the rooftop, in the whisper of the wind, and presses her against the railing, body to body. He whispers: “Look at the city below us while I fill you with my passion... fast, intense, until you scream with the wind.” Her hands grip the railing tighter. 🌃💨'
  },
  {
    lv: 'Samanta guļ uz vēdera meža pļavā, Edgars virs viņas, rokas tur viņas plaukstas zemē. Viņš murmina: “Šeit, dabā, es tevi paņemšu primitīvi, kā dzīvnieks... līdz tu sajūti katru triecienu dziļi dvēselē.” Viņas elpa paātrinās no uzbudinājuma. 🌿🐺',
    en: 'Samantha lies on her stomach in a forest clearing, Edgars above her, hands holding her wrists to the ground. He murmurs: “Here, in nature, I’ll take you primitively, like an animal... until you feel every thrust deep in your soul.” Her breath quickens with excitement. 🌿🐺'
  },
  {
    lv: 'Edgars ieslēdz Samantu tumšā istabā ar vibrējošu rotaļlietu, bet neļauj tai pieskarties. Viņš vēro caur durvju spraugu un saka: “Lūdzies man, lai es ienāku un pastiprinu tavu baudu... līdz tu eksplodē no intensitātes.” Viņas saucieni piepilda telpu. 🖤🕯️',
    en: 'Edgars locks Samantha in a dark room with a vibrating toy, but doesn’t let her touch it. He watches through the door crack and says: “Beg me to come in and amplify your pleasure... until you explode from the intensity.” Her cries fill the space. 🖤🕯️'
  }
] as const;


	// ---------------- DAILY QUOTE PICK ----------------
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

	// ---------------- TIME KNOWN COUNTER ----------------
	const knownSince = new Date('2026-01-09T21:26:00+02:00');

	let knownDays = 0;
	let knownHours = 0;
	let knownMinutes = 0;

	const updateKnownTime = () => {
		const now = new Date(
			new Intl.DateTimeFormat('en-US', {
				timeZone: 'Europe/Riga',
				hour12: false,
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			}).format(new Date())
		);

		const diffMs = now.getTime() - knownSince.getTime();
		const totalMinutes = Math.floor(diffMs / 60000);

		knownDays = Math.floor(totalMinutes / (60 * 24));
		knownHours = Math.floor((totalMinutes % (60 * 24)) / 60);
		knownMinutes = totalMinutes % 60;
	};

	// ---------------- DESTINY COUNTDOWN ----------------
	const destinyDeadline = new Date('2026-02-23T23:59:00+02:00');

	let cdDays = 0;
	let cdHours = 0;
	let cdMinutes = 0;
	let cdSeconds = 0;
	let cdProgress = 0;

	let countdownStart: Date;

	const updateCountdown = () => {
		const now = new Date(
			new Intl.DateTimeFormat('en-US', {
				timeZone: 'Europe/Riga',
				hour12: false,
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit'
			}).format(new Date())
		);

		if (!countdownStart) countdownStart = now;

		const totalMs = destinyDeadline.getTime() - countdownStart.getTime();
		const leftMs = destinyDeadline.getTime() - now.getTime();

		const safeLeft = Math.max(0, leftMs);
		const totalSeconds = Math.floor(safeLeft / 1000);

		cdDays = Math.floor(totalSeconds / 86400);
		cdHours = Math.floor((totalSeconds % 86400) / 3600);
		cdMinutes = Math.floor((totalSeconds % 3600) / 60);
		cdSeconds = totalSeconds % 60;

		const elapsed = totalMs - safeLeft;
		cdProgress = Math.min(100, Math.max(0, (elapsed / totalMs) * 100));
	};

	onMount(() => {
		updateKnownTime();
		updateCountdown();

		const knownInterval = setInterval(updateKnownTime, 60_000);
		const countdownInterval = setInterval(updateCountdown, 1000);

		return () => {
			clearInterval(knownInterval);
			clearInterval(countdownInterval);
		};
	});

	// ---------------- HOROSCOPE PERIOD UI ----------------
	let hzPeriod: 'daily' | 'weekly' | 'monthly' = 'daily';

	const periodLabel = (p: typeof hzPeriod) =>
		p === 'daily' ? t('Šodien', 'Today') : p === 'weekly' ? t('Nedēļa', 'Week') : t('Mēnesis', 'Month');

	const getEntry = (sign: 'aquarius' | 'pisces') => data.horoscopes?.[sign]?.[hzPeriod];

	const periodPill = () => {
		const aq = getEntry('aquarius');
		const meta = aq?.meta;

		if (hzPeriod === 'weekly' && meta?.week) return meta.week;
		if (hzPeriod === 'monthly' && meta?.month) return meta.month;

		return dayKey; // daily fallback
	};

const cardBadge = (entry?: HoroscopeEntry | null) => {
	if (!entry) return '';

	if (hzPeriod === 'weekly') return entry.meta.week ?? t('Nedēļa', 'Week');
	if (hzPeriod === 'monthly') return entry.meta.month ?? t('Mēnesis', 'Month');

	// daily
	return dayKey;
};

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

<div class="page">
	<header class="top">
		<nav class="lang">
			<a href="/" class:active={lang === 'lv'}>LV</a>
			<span>·</span>
			<a href="/en" class:active={lang === 'en'}>EN</a>
		</nav>

		<a class="cta" href={mailto(me.email)}>
			<Icon icon="lucide:mail" width="16" />
			<span>{t('Sazināties', 'Contact')}</span>
		</a>
	</header>

	<main class="wrap">
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

		{#if data.horoscopes}
			<section class="card hz" aria-label={t('Horoskops', 'Horoscope')}>
				<div class="card-head">
					<h2 class="title">
						<Icon icon="lucide:stars" width="18" aria-hidden="true" />
						<span>{t('Horoskops', 'Horoscope')}</span>
					</h2>

					<div class="hz-right">
						<div class="hz-tabs">
							<button class:active={hzPeriod === 'daily'} on:click={() => (hzPeriod = 'daily')}>
								{t('Šodien', 'Today')}
							</button>
							<button class:active={hzPeriod === 'weekly'} on:click={() => (hzPeriod = 'weekly')}>
								{t('Nedēļa', 'Week')}
							</button>
							<button class:active={hzPeriod === 'monthly'} on:click={() => (hzPeriod = 'monthly')}>
								{t('Mēnesis', 'Month')}
							</button>
						</div>

						<span class="pill">{periodPill()}</span>
					</div>
				</div>

				<div class="hz-grid">
					{#each (['aquarius', 'pisces'] as const) as sign}
						{#if getEntry(sign)?.text}
							<article class="hz-item">
								<div class="hz-head">
									<div class="hz-sign">{sign === 'aquarius' ? '♒ Aquarius' : '♓ Pisces'}</div>
									<div class="hz-badge">{cardBadge(getEntry(sign))}</div>
								</div>

								{#if hzPeriod !== 'daily' &&
								(getEntry(sign)?.meta?.challenging_days || getEntry(sign)?.meta?.standout_days)}
									<div class="hz-days">
										{#if getEntry(sign)?.meta?.standout_days}
											<div class="hz-days-row">
												<span class="hz-days-label">{t('Labās dienas', 'Standout')}</span>
												<div class="hz-days-chips">
													{#each splitDays(getEntry(sign)?.meta?.standout_days) as d}
														<span class="chip">{d}</span>
													{/each}
												</div>
											</div>
										{/if}

										{#if getEntry(sign)?.meta?.challenging_days}
											<div class="hz-days-row">
												<span class="hz-days-label">{t('Sarežģītās', 'Challenging')}</span>
												<div class="hz-days-chips">
													{#each splitDays(getEntry(sign)?.meta?.challenging_days) as d}
														<span class="chip chip-warn">{d}</span>
													{/each}
												</div>
											</div>
										{/if}
									</div>
								{/if}

								<p class="hz-text">{getEntry(sign)?.text}</p>
							</article>
						{/if}
					{/each}
				</div>
			</section>
		{/if}

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

			<p class="muted cd-note">{t('Laiks līdz neizbēgamajam lēmumam.', 'Time until the inevitable moment.')}</p>
		</section>

		<section class="card time">
			<div class="card-head">
				<h2 class="title">
					<Icon icon="lucide:clock" width="18" />
					<span>{t('Cik ilgi mēs pazīstami?', 'Time we’ve known each other?')}</span>
				</h2>
			</div>

			<div class="time-grid">
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
				{t('Kopš 2026. gada 9. janvāra, 21:26 (Latvijas laiks)', 'Since January 9, 2026, 9:26 AM (Latvia time)')}
			</p>
		</section>
	</main>
</div>

<style>
	.page {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 18px;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 12px 14px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--surface) 85%, rgba(0, 0, 0, 0.1));
		border: 1px solid var(--border);
		box-shadow: var(--ring), 0 16px 50px rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(14px) saturate(140%);
	}

	.lang {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 7px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.03);
	}

	.lang a {
		color: var(--muted);
		text-decoration: none;
		opacity: 0.85;
		transition: opacity 0.12s ease, color 0.12s ease;
		font-size: 0.85rem;
		padding: 4px 6px;
		border-radius: 999px;
	}

	.lang a.active {
		opacity: 1;
		color: var(--text);
		font-weight: 750;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		border-radius: 999px;
		text-decoration: none;
		color: var(--text);
		border: 1px solid color-mix(in srgb, var(--tint) 38%, var(--border));
		background: radial-gradient(120% 140% at 0% 0%, rgba(139, 92, 246, 0.18), transparent 55%),
			rgba(255, 255, 255, 0.03);
		box-shadow: var(--ring);
		transition: transform 0.14s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.14s ease,
			box-shadow 0.14s ease;
	}

	.cta:hover {
		transform: translateY(-1px);
		border-color: color-mix(in srgb, var(--tint) 55%, var(--border));
		box-shadow: var(--ring), 0 0 30px rgba(139, 92, 246, 0.28);
	}

	.wrap {
		width: 100%;
		display: grid;
		gap: 14px;
		align-content: start;
	}

	.card {
		position: relative;
		overflow: hidden;
		border-radius: var(--radius-xl);
		padding: 18px;
		background: var(--surface-strong);
		border: 1px solid var(--border-strong);
		box-shadow: var(--shadow-1);
		backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-sat)) brightness(var(--glass-bright));
	}

	.card::before {
		content: '';
		position: absolute;
		inset: -40% -20% auto -20%;
		height: 60%;
		background: radial-gradient(800px 260px at 30% 0%, rgba(255, 255, 255, 0.12), transparent 70%);
		opacity: 0.45;
		pointer-events: none;
	}

	.card-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 10px;
	}

	.title {
		margin: 0;
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-head);
		font-size: 1.05rem;
		letter-spacing: -0.01em;
	}

	.muted {
		color: var(--muted);
	}

	/* Samantha note */
	.love {
		display: grid;
		grid-template-columns: 40px 1fr;
		gap: 12px;
		align-items: start;
		background: radial-gradient(
				900px 300px at 10% 0%,
				color-mix(in srgb, var(--tint) 18%, transparent),
				transparent 60%
			),
			var(--surface-strong);
		border: 1px solid color-mix(in srgb, var(--tint) 22%, var(--border-strong));
		border-radius: 26px;
		box-shadow: var(--ring), 0 0 0 1px color-mix(in srgb, var(--tint) 25%, transparent),
			0 25px 80px rgba(139, 92, 246, 0.18);
	}

	.love-ic {
		width: 40px;
		height: 40px;
		display: grid;
		place-items: center;
		border-radius: 14px;
		border: 1px solid color-mix(in srgb, var(--tint) 28%, var(--border));
		background: radial-gradient(120% 120% at 30% 20%, color-mix(in srgb, var(--tint) 22%, transparent), rgba(255, 255, 255, 0.03) 55%);
		box-shadow: var(--ring);
	}

	.love-title {
		font-weight: 850;
		letter-spacing: -0.01em;
		margin-bottom: 6px;
	}

	.love-text {
		margin: 0;
		color: color-mix(in srgb, var(--text) 92%, transparent);
		line-height: 1.75;
		font-size: 1.05rem;
	}

	.love-meta {
		margin-top: 10px;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 0.9rem;
	}

	.pill {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.04);
		color: var(--muted);
		font-size: 0.82rem;
	}

	/* Horoscope */
	.hz {
		background: radial-gradient(
				900px 280px at 0% 0%,
				color-mix(in srgb, var(--tint) 12%, transparent),
				transparent 60%
			),
			var(--surface-strong);
	}

	.hz-right {
		display: inline-flex;
		align-items: center;
		gap: 10px;
	}

	.hz-tabs {
		display: inline-flex;
		gap: 6px;
	}

	.hz-tabs button {
		padding: 6px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.04);
		color: var(--muted);
		font-size: 0.75rem;
		cursor: pointer;
		transition: all 0.15s ease;
	}

	.hz-tabs button.active {
		color: var(--text);
		font-weight: 700;
		border-color: color-mix(in srgb, var(--tint) 45%, var(--border));
		box-shadow: var(--ring);
	}

	.hz-grid {
		display: grid;
		gap: 12px;
	}

	.hz-item {
		position: relative;
		padding: 14px;
		border-radius: 18px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.035);
		box-shadow: var(--ring);
		overflow: hidden;
	}

	.hz-item::after {
		content: '';
		position: absolute;
		inset: auto 0 0 0;
		height: 40px;
		background: linear-gradient(to bottom, transparent, rgba(0, 0, 0, 0.25));
		pointer-events: none;
	}

	.hz-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		margin-bottom: 10px;
	}

	.hz-sign {
		font-weight: 850;
		letter-spacing: -0.01em;
	}

	.hz-badge {
		font-size: 0.78rem;
		color: var(--muted);
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.03);
		padding: 4px 8px;
		border-radius: 999px;
	}

	.hz-days {
		display: grid;
		gap: 8px;
		margin: 8px 0 10px;
	}

	.hz-days-row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
	}

	.hz-days-label {
		font-size: 0.78rem;
		color: var(--muted);
		white-space: nowrap;
	}

	.hz-days-chips {
		display: flex;
		flex-wrap: wrap;
		justify-content: flex-end;
		gap: 6px;
	}

	.chip {
		font-size: 0.72rem;
		padding: 3px 8px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.03);
		color: var(--text);
		opacity: 0.9;
	}

	.chip-warn {
		border-color: rgba(244, 63, 94, 0.35);
	}

	.hz-text {
		margin: 0;
		line-height: 1.6;
		color: color-mix(in srgb, var(--text) 88%, transparent);
		font-size: 0.95rem;
		max-height: none;
		overflow: visible;
	}

	/* Countdown */
	.countdown {
		background: radial-gradient(
				900px 280px at 10% 0%,
				color-mix(in srgb, var(--tint) 16%, transparent),
				transparent 60%
			),
			var(--surface-strong);
	}

	.cd-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 12px;
		margin-bottom: 14px;
	}

	.cd-box {
		text-align: center;
		padding: 10px 6px;
		border-radius: 14px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.035);
		box-shadow: var(--ring);
	}

	.cd-num {
		font-size: 1.25rem;
		font-weight: 900;
		letter-spacing: -0.03em;
	}

	.cd-label {
		font-size: 0.75rem;
		color: var(--muted);
	}

	.cd-bar {
		position: relative;
		height: 10px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.08);
		overflow: hidden;
		border: 1px solid var(--border);
		box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.25);
	}

	@keyframes destinyPulse {
		0%,
		100% {
			filter: brightness(1);
		}
		50% {
			filter: brightness(1.15);
		}
	}

	.cd-bar-fill {
		height: 100%;
		background: linear-gradient(
			90deg,
			color-mix(in srgb, var(--tint) 65%, #fff),
			color-mix(in srgb, var(--tint) 35%, #000)
		);
		transition: width 0.6s ease;
		animation: destinyPulse 3.5s ease-in-out infinite;
		will-change: width;
	}

	.countdown[data-urgent='true'] .cd-bar-fill {
		background: linear-gradient(90deg, #f43f5e, #fb7185);
	}

	.cd-note {
		margin-top: 10px;
		font-size: 0.85rem;
	}

	.time-num {
		letter-spacing: -0.03em;
		transition: transform 0.25s ease, opacity 0.25s ease;
		will-change: transform;
	}

	@media (prefers-reduced-transparency: reduce) {
		.card,
		.top {
			backdrop-filter: none;
		}
	}
</style>
