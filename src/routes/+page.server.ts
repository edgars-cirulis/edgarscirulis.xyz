import type { PageServerLoad } from './$types';
import { getNowPlaying, getRecentTrack, toNowPayload } from '$lib/server/spotify';

export const load: PageServerLoad = async ({ setHeaders }) => {
	setHeaders({ 'cache-control': 'public, max-age=0, s-maxage=30, stale-while-revalidate=300' });

	try {
		const now = await getNowPlaying();

		if (now?.item) {
			return {
				spotify: toNowPayload(now.item, now.is_playing ?? false)
			};
		}

		const recent = await getRecentTrack();

		if (recent?.track) {
			return {
				spotify: toNowPayload(recent.track, false)
			};
		}

		return { spotify: null };
	} catch {
		return { spotify: null };
	}
};
