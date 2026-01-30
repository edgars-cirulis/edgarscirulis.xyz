import type { PageServerLoad } from './$types';
import { getNowPlaying, getRecentTrack, toNowPayload } from '$lib/server/spotify';

type HoroscopeApiResponse = {
	data?: {
		horoscope_data?: string;
		horoscope?: string;
	};
};

const getHoroscope = async (fetch: typeof globalThis.fetch, sign: string) => {
	const res = await fetch(
		`https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign=${encodeURIComponent(
			sign
		)}&day=today`
	);

	if (!res.ok) return null;

	const json = (await res.json()) as HoroscopeApiResponse;
	return json?.data?.horoscope_data ?? json?.data?.horoscope ?? null;
};

export const load: PageServerLoad = async ({ setHeaders, fetch }) => {
	setHeaders({ 'cache-control': 'no-store' });

	// Fetch horoscopes in parallel (no-key API)
	const horoscopesPromise = Promise.all([
		getHoroscope(fetch, 'aquarius'),
		getHoroscope(fetch, 'pisces')
	])
		.then(([aquarius, pisces]) => ({ aquarius, pisces }))
		.catch(() => ({ aquarius: null, pisces: null }));

	try {
		const now = await getNowPlaying();

		// Wait for horoscopes (so we always return them)
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
		const horoscopes = await horoscopesPromise;
		return { spotify: null, horoscopes };
	}
};
