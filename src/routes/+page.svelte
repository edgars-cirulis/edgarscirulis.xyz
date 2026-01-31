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
		lv: 'Es stāvu tev tik tuvu, ka tu jūti manu cietumu pret tavu vēderu, bet neaiztiekšu. Tava elpa kļūst smaga, tu mēģini nesaspiest kājas, bet es redzu — tu jau teci. Es čukstu ausī: “Saglabā to mitrumu manam mēlei vēlāk... es gribu to visu izlaizīt lēni, līdz tu trīc un lūdzies pēc mana locekļa iekšā.” 😈💦',
		en: 'I stand so close you feel my hardness pressing against your stomach, but I won’t touch yet. Your breathing gets heavy, you try not to squeeze your thighs, but I see — you’re already dripping. I whisper in your ear: “Save that wetness for my tongue later… I want to lick it all slowly until you’re shaking and begging for my cock inside.” 😈💦'
	},
	{
		lv: 'Man patīk vilkt garumā brīdi, kad tu jau esi kaila man priekšā, bet es tikai skatos. Tavas sprauslas cietas, pīpīte sārta un mitra, tu knapi atturies nesatikt sevi. Es saku: “Pieskaries sev manā priekšā... rādi, kā tu sevi gatavo manam dziļajam triecienam.” Un es zinu — tu to izdarīsi. 🔥🫦',
		en: 'I love dragging out the moment when you’re already naked in front of me, but I just watch. Nipples hard, pussy pink and wet, you can barely stop yourself from touching. I say: “Touch yourself for me… show me how you prepare for my deep thrusts.” And I know — you’ll do it. 🔥🫦'
	},
	{
		lv: 'Es turu tevi aiz gurniem, spiežu pie sienas, bet vēl neielaižu. Tu jūti manu galviņu pie ieejas, karstu un pulsējošu. Tava pīpīte saraujas no gaidīšanas. Es čukstu: “Saki man, cik dziļi tu gribi, lai es tevi izplešu... vai varbūt tu gribi, lai es tevi paņemu brutāli, līdz tu kliedz?” 😏🍆',
		en: 'I hold you by the hips, pin you against the wall, but I don’t enter yet. You feel my tip at your entrance, hot and throbbing. Your pussy clenches in anticipation. I whisper: “Tell me how deep you want me to stretch you… or do you want it rough, until you scream?” 😏🍆'
	},
	{
		lv: 'Kad tu esi uz ceļiem man priekšā, es neļauju tev uzreiz paņemt mutē. Vispirms es berzu galviņu pa tavām lūpām, lieku tev laizīt tikai nedaudz. Tu jau elso, acis ūdeņainas no vēlmes. Tad es saku: “Tagad ņem dziļi... līdz kaklam... un rādi, cik ļoti tu gribi manu spermu.” 🌶️👅',
		en: 'When you’re on your knees in front of me, I don’t let you take it in your mouth right away. First I rub the head across your lips, make you lick just a little. You’re already panting, eyes watery with want. Then I say: “Now take it deep… to the throat… and show me how badly you want my cum.” 🌶️👅'
	},
	{
		lv: 'Es lieku tev apsēsties man virsū, bet neļauju kustēties. Tu jūti mani pilnībā iekšā, bet es turu tevi stingri aiz vidukļa. Tava pīpīte pulsē ap mani, tu jau gandrīz raudi no spriedzes. Es čukstu: “Lūdzies... saki, cik stipri tu gribi, lai es tevi izdrāžu līdz squirtingam.” 💦😈',
		en: 'I make you sit on me, but I don’t let you move. You feel me fully inside, but I grip your waist tight. Your pussy pulses around me, you’re almost crying from the tension. I whisper: “Beg… tell me how hard you want me to fuck you until you squirt.” 💦😈'
	},
	{
		lv: 'Man patīk skatīties, kā tu trīc, kad es tevi laizu no aizmugures — mēle ap tavu dupsi, tad dziļāk iekšā, kamēr tu spiež dupsi pret manu seju. Tu jau gaudi, rokas dreb, tu lūdzies: “Lūdzu, ieliec to iekšā...” Un es tikai smaidu — jo es zinu, ka tu vēl neesi gatava tam, cik stipri es tevi paņemšu. 🍑🔥',
		en: 'I love watching you tremble when I eat you from behind — tongue around your ass, then deeper inside while you push back against my face. You’re already moaning, hands shaking, begging: “Please, put it in…” And I just smile — because I know you’re not ready for how hard I’m going to take you. 🍑🔥'
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
	const knownSince = new Date('2026-01-09T12:06:00+02:00');

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

	onMount(() => {
		updateKnownTime();
		const interval = setInterval(updateKnownTime, 60_000);
		return () => clearInterval(interval);
	});
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

		<section class="card time">
			<div class="card-head">
				<h2 class="title">
					<Icon icon="lucide:clock" width="18" />
					<span>{t('Cik ilgi mēs pazīstamies', 'Time we’ve known each other')}</span>
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
				{t(
					'Kopš 2026. gada 9. janvāra, 12:06 (Latvijas laiks)',
					'Since January 9, 2026, 12:06 PM (Latvia time)'
				)}
			</p>
		</section>
	</main>
</div>

<style>
	/* layout + cards omitted for brevity — KEEP YOUR EXISTING STYLES HERE */
</style>
