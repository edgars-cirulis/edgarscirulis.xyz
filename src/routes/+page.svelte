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


const loveQuotes = [
	{
		lv: 'Man patīk, ka tu zini, ka esi karsta — un tev nav jācenšas. 🔥',
		en: 'I love that you know you’re hot — and you don’t have to try. 🔥'
	},
	{
		lv: 'Tu mani uzvelc pat tad, kad neko nedari. 😈',
		en: 'You turn me on even when you’re doing nothing. 😈'
	},
	{
		lv: 'Ir grūti domāt skaidri, kad tu esi man tik tuvu. 🫦',
		en: 'It’s hard to think clearly when you’re this close to me. 🫦'
	},
	{
		lv: 'Man patīk, cik viegli tu mani izsit no līdzsvara. ⚡',
		en: 'I like how easily you knock me off balance. ⚡'
	},
	{
		lv: 'Tu esi kā kārdinājums, kuram negribas pretoties. 🔥',
		en: 'You’re the kind of temptation I don’t want to resist. 🔥'
	},
	{
		lv: 'Tava klātbūtne dara mani nepacietīgu. 😏',
		en: 'Your presence makes me impatient. 😏'
	},
	{
		lv: 'Man patīk doma, ka tu jūti, cik ļoti es tevi gribu. 🖤',
		en: 'I like the thought of you feeling how much I want you. 🖤'
	},
	{
		lv: 'Tu liec man gribēt lietas, ko es parasti neteiktu skaļi. 🌑',
		en: 'You make me want things I wouldn’t usually say out loud. 🌑'
	},
	{
		lv: 'Ar tevi robežas kļūst izplūdušas ļoti ātri. 🔥',
		en: 'With you, boundaries blur very fast. 🔥'
	},
	{
		lv: 'Man patīk, ka tu mani skaties tā, it kā jau zinātu, kas notiks. 👀',
		en: 'I love when you look at me like you already know what’s coming. 👀'
	},
	{
		lv: 'Tu mani padari bīstami godīgu par savām vēlmēm. 😈',
		en: 'You make me dangerously honest about my desires. 😈'
	},
	{
		lv: 'Ir kaut kas ļoti netīri pievilcīgs tavā mierā. 🖤',
		en: 'There’s something dirty-attractive about how calm you are. 🖤'
	},
	{
		lv: 'Man patīk, ka ar tevi spriedze tikai aug. 🔥',
		en: 'I love how the tension only builds with you. 🔥'
	},
	{
		lv: 'Tu esi iemesls, kāpēc man grūti turēt rokas pie sevis. 🫦',
		en: 'You’re the reason it’s hard for me to keep my hands to myself. 🫦'
	},
	{
		lv: 'Es tevi gribu ne skaļi — bet ļoti skaidri. 😏',
		en: 'I want you not loudly — but very clearly. 😏'
	},
	{
		lv: 'Tu mani padari mazliet bīstamu. 🔥',
		en: 'You make me a little dangerous. 🔥'
	},
	{
		lv: 'Man patīk, ka tu nejautā — tu jūti. 🖤',
		en: 'I love that you don’t ask — you feel it. 🖤'
	},
	{
		lv: 'Ar tevi pat skatieni ir netīri. 👁️🔥',
		en: 'With you, even looks are dirty. 👁️🔥'
	},
	{
		lv: 'Tu mani ievelc sevī lēni… un es ļauju. 🌒',
		en: 'You pull me in slowly… and I let you. 🌒'
	},
	{
		lv: 'Man patīk doma par tevi pārāk bieži. 😈',
		en: 'I think about you way too often. 😈'
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
