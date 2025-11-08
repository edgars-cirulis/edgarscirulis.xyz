import type { PageServerLoad } from './$types';
import { getNowPlaying, getRecentTrack } from '$lib/server/spotify';

const toPayload = (t: any, playing: boolean) => ({
	playing,
	title: t?.name ?? '',
	artist: Array.isArray(t?.artists) ? t.artists.map((a: any) => a.name).join(', ') : '',
	album: t?.album?.name ?? '',
	url: t?.external_urls?.spotify ?? '',
	image: t?.album?.images?.[1]?.url ?? t?.album?.images?.[0]?.url ?? ''
});

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({ 'cache-control': 'no-store' });

	try {
		const now = await getNowPlaying();

		if (now?.item) {
			return {
				spotify: toPayload(now.item, true)
			};
		}

		const recent = await getRecentTrack();

		if (recent?.track) {
			return {
				spotify: toPayload(recent.track, false)
			};
		}

		return { spotify: null };
	} catch {
		return { spotify: null };
	}
};
