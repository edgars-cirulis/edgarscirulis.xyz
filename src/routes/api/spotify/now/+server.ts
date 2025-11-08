import type { RequestHandler } from './$types';
import {
	getNowPlaying,
	getRecentTracks,
	getTopArtists,
	getTopTracks,
	toNowTrackPayload,
	toHistoryItem,
	toTopTrackPayload,
	toTopArtistPayload,
	type NowTrackPayload,
	type HistoryItemPayload,
	type TopArtistPayload,
	type TopTrackPayload,
	type SpotifyNowResponse
} from '$lib/server/spotify';

const headers = {
	'Content-Type': 'application/json',
	'cache-control': 'no-store'
};

export const GET: RequestHandler = async () => {
	try {
		const [nowRaw, historyRaw, topTracksRaw, topArtistsRaw] = await Promise.all([
			getNowPlaying(),
			getRecentTracks(6),
			getTopTracks('short_term', 5),
			getTopArtists('short_term', 5)
		]);

		let now: NowTrackPayload | null = null;

		if (nowRaw?.item) {
			now = toNowTrackPayload(nowRaw.item, {
				playing: nowRaw.is_playing ?? false,
				progressMs: nowRaw.progress_ms ?? null,
				device: nowRaw.device ?? null
			});
		}

		if (!now && historyRaw.length && historyRaw[0]?.track) {
			now = toNowTrackPayload(historyRaw[0].track, {
				playing: false,
				progressMs: null,
				device: null
			});
		}

		const history = historyRaw
			.map((i) => toHistoryItem(i))
			.filter((x): x is HistoryItemPayload => Boolean(x));

		const topTracks = topTracksRaw.map((t) => toTopTrackPayload(t));
		const topArtists = topArtistsRaw.map((a) => toTopArtistPayload(a));

		const payload: SpotifyNowResponse = {
			now,
			history,
			topTracks,
			topArtists
		};

		return new Response(JSON.stringify(payload), { headers });
	} catch {
		const fallback: SpotifyNowResponse = {
			now: null,
			history: [],
			topTracks: [],
			topArtists: []
		};

		return new Response(JSON.stringify(fallback), { headers, status: 200 });
	}
};
