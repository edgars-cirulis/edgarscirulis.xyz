import type { PageServerLoad } from './$types';
import { getNowPlaying, getRecentTrack, toNowPayload } from '$lib/server/spotify';

export const prerender = false;

type HoroscopeApiResponse = {
	data?: {
		horoscope_data?: string;
		horoscope?: string;

		week?: string;
		month?: string;
		challenging_days?: string;
		standout_days?: string;
	};
	status?: number;
	success?: boolean;
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

type Horoscopes = {
	aquarius: HoroscopePeriods;
	pisces: HoroscopePeriods;
};

const pickBestText = (a?: string, b?: string) => {
	const A = (a ?? '').trim();
	const B = (b ?? '').trim();
	if (!A && !B) return null;
	// pick the longer one (monthly is usually much longer)
	return (A.length >= B.length ? A : B) || null;
};

const getHoroscope = async (
	fetchFn: typeof globalThis.fetch,
	sign: string,
	period: 'daily' | 'weekly' | 'monthly'
): Promise<HoroscopeEntry> => {
	const base = `https://horoscope-app-api.vercel.app/api/v1/get-horoscope/${period}?sign=${encodeURIComponent(
		sign
	)}`;

	// Only daily supports day=today (per this API)
	const url = period === 'daily' ? `${base}&day=today` : base;

	// Cache buster (prevents edge/proxy/browser from reusing the daily response)
	const cacheBustedUrl = `${url}${url.includes('?') ? '&' : '?'}_=${Date.now()}-${period}-${sign}`;

	const res = await fetchFn(cacheBustedUrl, {
		cache: 'no-store',
		headers: {
			'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
			pragma: 'no-cache'
		}
	});

	if (!res.ok) return { text: null, meta: {} };

	const json = (await res.json()) as HoroscopeApiResponse;
	const data = json?.data ?? {};

	// ✅ Robust: choose whichever text field is longer / more complete
	const text = pickBestText(data.horoscope_data, data.horoscope);

	return {
		text,
		meta: {
			week: data.week ?? null,
			month: data.month ?? null,
			challenging_days: data.challenging_days ?? null,
			standout_days: data.standout_days ?? null
		}
	};
};

export const load: PageServerLoad = async ({ setHeaders, fetch }) => {
	setHeaders({
		'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
		pragma: 'no-cache'
	});

	// Fetch all horoscope periods in parallel
	const horoscopesPromise: Promise<Horoscopes> = Promise.all([
		getHoroscope(fetch, 'aquarius', 'daily'),
		getHoroscope(fetch, 'aquarius', 'weekly'),
		getHoroscope(fetch, 'aquarius', 'monthly'),
		getHoroscope(fetch, 'pisces', 'daily'),
		getHoroscope(fetch, 'pisces', 'weekly'),
		getHoroscope(fetch, 'pisces', 'monthly')
	])
		.then(([aqD, aqW, aqM, piD, piW, piM]) => ({
			aquarius: { daily: aqD, weekly: aqW, monthly: aqM },
			pisces: { daily: piD, weekly: piW, monthly: piM }
		}))
		.catch(() => ({
			aquarius: {
				daily: { text: null, meta: {} },
				weekly: { text: null, meta: {} },
				monthly: { text: null, meta: {} }
			},
			pisces: {
				daily: { text: null, meta: {} },
				weekly: { text: null, meta: {} },
				monthly: { text: null, meta: {} }
			}
		}));

	try {
		const now = await getNowPlaying();
		const horoscopes = await horoscopesPromise;

		if (now?.item) {
			return {
				spotify: toNowPayload(now.item, now.is_playing ?? false),
				horoscopes
			};
		}

		const recent = await getRecentTrack();

		if (recent?.track) {
			return {
				spotify: toNowPayload(recent.track, false),
				horoscopes
			};
		}

		return { spotify: null, horoscopes };
	} catch {
		return { spotify: null, horoscopes: await horoscopesPromise };
	}
};
