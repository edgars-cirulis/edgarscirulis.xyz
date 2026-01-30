<script lang="ts">
	import Icon from '@iconify/svelte';
	import { mailto } from '$lib/utils';

	type Spotify = {
		playing: boolean;
		title: string;
		artist: string;
		album: string;
		url: string;
		image: string;
	};

	export let data: {
		spotify: Spotify | null;
		me: typeof import('$lib/me').me;
		lang: 'lv' | 'en';
		horoscopes?: {
			aquarius: string | null;
			pisces: string | null;
		};
	};

	const { me, lang } = data;
	const nowPlayingModule = import('$lib/components/NowPlaying.svelte');

	const t = (lv: string, en: string) => (lang === 'lv' ? lv : en);

	// --- Love quotes (edit freely) ---
	const loveQuotes = [
		{
			lv: 'Paldies, ka esi. Tu padari pasauli mierīgāku ar savu klātbūtni. 💜',
			en: 'Thank you for being you. You make the world feel calmer just by being in it. 💜'
		},
		{
			lv: 'Ja šodien kaut kas ir smags — es esmu tepat. Vienmēr. 🤍',
			en: 'If today feels heavy — I’m right here. Always. 🤍'
		},
		{
			lv: 'Tu esi mana mīļākā doma dienas vidū. ✨',
			en: 'You’re my favorite thought in the middle of the day. ✨'
		},
		{
			lv: 'Es tevi izvēlētos vēlreiz. Un vēlreiz. Un vēlreiz. ♾️',
			en: 'I’d choose you again. And again. And again. ♾️'
		},
		{
			lv: 'Tu esi mans miers un mana iedvesma vienlaikus. 🌙',
			en: 'You are my peace and my inspiration at the same time. 🌙'
		},
		{
			lv: 'Katru reizi, kad smaidi, man gribas apstāties un paskatīties. ☀️',
			en: 'Every time you smile, I want to pause and just look. ☀️'
		},
		{
			lv: 'Tevī ir kaut kas ļoti skaists — un tas nav tikai ārpusē. 🌷',
			en: 'There’s something truly beautiful about you — and it’s not only on the outside. 🌷'
		},

		// --- deeper additions ---
		{
			lv: 'Tu man atgādini, ka maigums nav vājums — tas ir spēks. 🕊️',
			en: 'You remind me that softness isn’t weakness — it’s strength. 🕊️'
		},
		{
			lv: 'Es nemeklēju perfektu. Es meklēju īstu. Un tu esi īsta. 🤍',
			en: 'I’m not looking for perfect. I’m looking for real. And you feel real. 🤍'
		},
		{
			lv: 'Tu esi tā vieta manī, kur stress apklust. 🌙',
			en: 'You’re the place in me where the noise goes quiet. 🌙'
		},
		{
			lv: 'Kad tu esi laimīga, man kļūst vieglāk elpot. ☁️',
			en: 'When you’re happy, it feels easier for me to breathe. ☁️'
		},
		{
			lv: 'Es gribu būt tev blakus ne tikai skaistajās dienās, bet arī tajās, kurās vajag plecu. 🤍',
			en: 'I want to be next to you not only on the good days, but also on the days you need a shoulder. 🤍'
		},
		{
			lv: 'Tu esi vairāk nekā mirkļa sajūta — tu esi kaut kas, ko gribas sargāt. 🫶',
			en: 'You’re more than a moment — you’re something I want to protect. 🫶'
		},
		{
			lv: 'Es mīlu to, kā tu jūti pasauli. Tā ir reta lieta. ✨',
			en: 'I love the way you feel the world. That’s a rare thing. ✨'
		},
		{
			lv: 'Ja man būtu jāizvēlas viens “mājās” — man šķiet, tas būtu tavā balsī. 🕯️',
			en: 'If I had to choose one “home,” I think it would be in your voice. 🕯️'
		},
		{
			lv: 'Tu man iemāci, ka tuvums var būt drošs. 🤍',
			en: 'You teach me that closeness can be safe. 🤍'
		},
		{
			lv: 'Es tevi redzu. Ne tikai skatoties — bet pa īstam. 👁️✨',
			en: 'I see you. Not just looking — truly. 👁️✨'
		},
		{
			lv: 'Pat klusumā ar tevi ir siltums. 🫧',
			en: 'Even in silence with you, there’s warmth. 🫧'
		},
		{
			lv: 'Tu esi mans “jā” mieram. Mans “jā” maigumam. 🌿',
			en: 'You are my “yes” to peace. My “yes” to softness. 🌿'
		},
		{
			lv: 'Es gribu tevi kopt, nevis mainīt. 🌷',
			en: 'I want to care for you, not change you. 🌷'
		},
		{
			lv: 'Ja pasaule skrien, es ar tevi atceros, kā ir palikt. 🕊️',
			en: 'When the world runs, with you I remember how to stay. 🕊️'
		},
		{
			lv: 'Tu esi tāda gaisma, kas nesadedzina — tikai sasilda. 🕯️',
			en: 'You’re a kind of light that doesn’t burn — it only warms. 🕯️'
		},
		{
			lv: 'Man patīk, kā tu esi. Bez maskām. Bez lieka. Vienkārši tu. 🤍',
			en: 'I love how you are. No mask. No extra. Just you. 🤍'
		},
		{
			lv: 'Es tev uzticos ar savu mieru. Un tas man ir daudz. 🌙',
			en: 'I trust you with my peace. And that means a lot to me. 🌙'
		},
		{
			lv: 'Tu esi tas “kāpēc” manām labākajām domām. ✨',
			en: 'You’re the “why” behind my better thoughts. ✨'
		},
		{
			lv: 'Ja tev kādreiz pietrūkst ticības sev — es aizdošu savējo. 🤍',
			en: 'If you ever run out of belief in yourself — I’ll lend you mine. 🤍'
		}
	] as const;

	// Latvia timezone (Europe/Riga)
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
</script>

<svelte:head>
	<title>{me.name} · {t('Šobrīd skan', 'Now playing')}</title>
	<meta name="description" content={t('Spotify “Now playing”', 'Spotify “Now playing”')} />
</svelte:head>

<div class="page">
	<header class="top">
		<nav class="lang" aria-label="Language switcher">
			<a href="/" class:active={lang === 'lv'}>LV</a>
			<span aria-hidden="true">·</span>
			<a href="/en" class:active={lang === 'en'}>EN</a>
		</nav>

		<a class="cta" href={mailto(me.email)} rel="noopener">
			<Icon icon="lucide:mail" width="16" />
			<span>{t('Sazināties', 'Contact')}</span>
		</a>
	</header>

	<main class="wrap">
		<section class="card" aria-labelledby="np-heading">
			<div class="card-head">
				<h1 id="np-heading" class="title">
					<Icon icon="lucide:audio-lines" width="18" aria-hidden="true" />
					<span>{t('Šobrīd skan', 'Now playing')}</span>
				</h1>
			</div>

			{#await nowPlayingModule then mod}
				<svelte:component this={mod.default} spotify={data.spotify} />
			{/await}
		</section>

		<section class="card love" aria-label={t('Sveiciens Samantai', 'A note for Samantha')}>
			<div class="love-ic" aria-hidden="true">
				<Icon icon="lucide:heart" width="18" />
			</div>

			<div class="love-body">
				<div class="love-title">{t('Samantha', 'Samantha')}</div>
				<p class="love-text">{quoteText}</p>

				<div class="love-meta muted">
					<Icon icon="lucide:sparkles" width="14" aria-hidden="true" />
					<span>{t('Šodienas citāts', 'Today’s quote')}</span>
				</div>
			</div>
		</section>

		{#if data.horoscopes && (data.horoscopes.aquarius || data.horoscopes.pisces)}
			<section class="card hz" aria-label={t('Dienas horoskops', 'Daily horoscope')}>
				<div class="card-head">
					<h2 class="title">
						<Icon icon="lucide:stars" width="18" aria-hidden="true" />
						<span>{t('Dienas horoskops', 'Daily horoscope')}</span>
					</h2>
					<span class="pill">{dayKey}</span>
				</div>

				<div class="hz-grid">
					{#if data.horoscopes.aquarius}
						<article class="hz-item">
							<div class="hz-head">
								<div class="hz-sign">♒ Aquarius</div>
								<div class="hz-badge">{t('Šodien', 'Today')}</div>
							</div>
							<p class="hz-text">{data.horoscopes.aquarius}</p>
						</article>
					{/if}

					{#if data.horoscopes.pisces}
						<article class="hz-item">
							<div class="hz-head">
								<div class="hz-sign">♓ Pisces</div>
								<div class="hz-badge">{t('Šodien', 'Today')}</div>
							</div>
							<p class="hz-text">{data.horoscopes.pisces}</p>
						</article>
					{/if}
				</div>
			</section>
		{/if}
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
		padding: 10px 12px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--surface) 85%, rgba(0, 0, 0, 0.1));
		border: 1px solid var(--border);
		box-shadow:
			var(--ring),
			0 16px 50px rgba(0, 0, 0, 0.35);
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
		transition:
			opacity 0.12s ease,
			color 0.12s ease;
		font-size: 0.85rem;
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
		background:
			radial-gradient(120% 140% at 0% 0%, rgba(139, 92, 246, 0.18), transparent 55%),
			rgba(255, 255, 255, 0.03);
		box-shadow: var(--ring);
		transition:
			transform 0.14s cubic-bezier(0.2, 0.8, 0.2, 1),
			border-color 0.14s ease,
			box-shadow 0.14s ease;
	}

	.cta:hover {
		transform: translateY(-1px);
		border-color: color-mix(in srgb, var(--tint) 55%, var(--border));
		box-shadow:
			var(--ring),
			0 0 30px rgba(139, 92, 246, 0.28);
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
		backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-sat))
			brightness(var(--glass-bright));
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

	.hint {
		color: var(--muted);
		font-size: 0.85rem;
	}

	/* Samantha note (cleaner tint) */
	.love {
		display: grid;
		grid-template-columns: 40px 1fr;
		gap: 12px;
		align-items: start;
		background:
			radial-gradient(
				900px 300px at 10% 0%,
				color-mix(in srgb, var(--tint) 18%, transparent),
				transparent 60%
			),
			var(--surface-strong);
		border: 1px solid color-mix(in srgb, var(--tint) 22%, var(--border-strong));
	}

	.love-ic {
		width: 40px;
		height: 40px;
		display: grid;
		place-items: center;
		border-radius: 14px;
		border: 1px solid color-mix(in srgb, var(--tint) 28%, var(--border));
		background: radial-gradient(
			120% 120% at 30% 20%,
			color-mix(in srgb, var(--tint) 22%, transparent),
			rgba(255, 255, 255, 0.03) 55%
		);
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
		line-height: 1.7;
		font-size: 1.02rem;
	}

	.love-meta {
		margin-top: 10px;
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-size: 0.9rem;
	}

	/* pill for date */
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
		background:
			radial-gradient(
				900px 280px at 0% 0%,
				color-mix(in srgb, var(--tint) 12%, transparent),
				transparent 60%
			),
			var(--surface-strong);
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

	.hz-text {
		margin: 0;
		line-height: 1.65;
		color: color-mix(in srgb, var(--text) 88%, transparent);
		font-size: 0.98rem;

		/* show full text */
		max-height: none;
		overflow: visible;
	}

	@media (prefers-reduced-transparency: reduce) {
		.card,
		.top {
			backdrop-filter: none;
		}
	}
</style>
