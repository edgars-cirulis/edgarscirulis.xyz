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
		// ~360 chars
		lv: 'Man patīk tas brīdis, kad tu esi pietiekami tuvu, lai sajustu manu klātbūtni, bet vēl ne tik tuvu, lai pieskartos. Tā spriedze starp mums paliek gaisā, un es to nesteidzinu. Es gribu, lai tu to pamani, sajūti un ļauj tai augt pati. 😌',
		en: 'I love that moment when you’re close enough to feel my presence, but not close enough to touch. The tension hangs between us, and I don’t rush it. I want you to notice it, feel it, and let it build on its own. 😌'
	},
	{
		// ~400 chars
		lv: 'Es runāju klusi ne tāpēc, ka man nav ko teikt, bet tāpēc, ka man patīk, kad tev jānāk tuvāk. Kad tava uzmanība sašaurinās tikai uz mani, manu balsi, manu elpu. Tieši tajā mirklī viss kļūst daudz personīgāks. 🖤',
		en: 'I speak softly not because I have nothing to say, but because I like when you have to come closer. When your attention narrows to just me, my voice, my breath. That’s when everything starts to feel much more personal. 🖤'
	},
	{
		// ~420 chars
		lv: 'Man patīk vilkt garumā to brīdi pirms pieskāriena. Tas ir mans mīļākais. Kad vēl nekas nav noticis, bet abi jau zina, ka tas ir tikai laika jautājums. Kad ķermenis reaģē ātrāk par prātu, un tu vairs neesi droša, kurš kuru kontrolē. 🔥',
		en: 'I love stretching out the moment before a touch. It’s my favorite part. When nothing has happened yet, but both already know it’s only a matter of time. When the body reacts faster than the mind, and you’re no longer sure who’s controlling whom. 🔥'
	},
	{
		// ~310 chars
		lv: 'Es nesteidzos ar tevi. Man patīk vērot, kā tu lēnām kļūsti uzmanīgāka, klusāka, jūtīgāka. Kā tavs ķermenis sāk klausīties vēl pirms tu pati to apzinies. Tieši tur sākas īstā spriedze. 🌑',
		en: 'I don’t rush with you. I like watching you slowly become more attentive, quieter, more sensitive. How your body starts listening before you even realize it. That’s exactly where the real tension begins. 🌑'
	},
	{
		// ~380 chars
		lv: 'Ir kaut kas ļoti intīms tajā, ka es tevi neaiztieku uzreiz. Ka es ļauju tev sajust manu tuvumu bez pierādījumiem. Tā, lai tava iztēle izdara pusi darba manā vietā. Un es zinu — tā parasti ir bīstamākā daļa. 😏',
		en: 'There’s something deeply intimate about not touching you right away. About letting you feel my closeness without proof. So your imagination does half the work for me. And I know — that’s usually the most dangerous part. 😏'
	},
	{
		// ~340 chars
		lv: 'Man patīk, kā mainās tava elpa, kad starp mums kļūst pārāk kluss. It kā ķermenis saprastu ātrāk par vārdiem, ka notiek kaut kas svarīgs. Es neko nesaku. Es tikai palieku. Un ļauju tam notikt. 🫦',
		en: 'I like how your breathing changes when it gets too quiet between us. As if your body understands before words do that something important is happening. I don’t say anything. I just stay. And let it happen. 🫦'
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
