import type { RequestHandler } from './$types';
import { getNowPlaying, getRecentTrack, type NowPayload } from '$lib/server/spotify';

const headers = {
	'Content-Type': 'application/json',
	'Cache-Control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=60'
};

const toPayload = (t: any, playing: boolean): NowPayload => ({
	playing,
	title: t?.name ?? '',
	artist: Array.isArray(t?.artists) ? t.artists.map((a: any) => a.name).join(', ') : '',
	album: t?.album?.name ?? '',
	url: t?.external_urls?.spotify ?? '',
	image: t?.album?.images?.[1]?.url ?? t?.album?.images?.[0]?.url ?? ''
});

export const GET: RequestHandler = async () => {
	try {
		const now = await getNowPlaying();

		if (now?.item) {
			return new Response(JSON.stringify(toPayload(now.item, true)), { headers });
		}

		const recent = await getRecentTrack();

		if (recent?.track) {
			return new Response(JSON.stringify(toPayload(recent.track, false)), { headers });
		}

		return new Response(JSON.stringify(null), { headers });
	} catch {
		return new Response(JSON.stringify(null), { headers, status: 200 });
	}
};
