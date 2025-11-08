const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const SPOTIFY_API_BASE = 'https://api.spotify.com/v1';

const { SPOTIFY_REFRESH_TOKEN, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = process.env;

if (!SPOTIFY_REFRESH_TOKEN || !SPOTIFY_CLIENT_ID || !SPOTIFY_CLIENT_SECRET) {
	console.warn(
		'[spotify] Missing SPOTIFY_REFRESH_TOKEN, SPOTIFY_CLIENT_ID or SPOTIFY_CLIENT_SECRET env vars.'
	);
}

let cachedToken: { token: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
	if (cachedToken && Date.now() < cachedToken.expiresAt) {
		return cachedToken.token;
	}

	const body = new URLSearchParams({
		grant_type: 'refresh_token',
		refresh_token: SPOTIFY_REFRESH_TOKEN ?? '',
		client_id: SPOTIFY_CLIENT_ID ?? '',
		client_secret: SPOTIFY_CLIENT_SECRET ?? ''
	});

	const res = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body
	});

	if (!res.ok) {
		console.error('[spotify] Failed to refresh Spotify token', res.status, await res.text());
		throw new Error('Failed to refresh Spotify token');
	}

	const json = (await res.json()) as {
		access_token: string;
		expires_in?: number;
	};

	const expiresInSec = typeof json.expires_in === 'number' ? json.expires_in : 3600;
	const expiresAt = Date.now() + (expiresInSec - 60) * 1000;

	cachedToken = {
		token: json.access_token,
		expiresAt
	};

	return json.access_token;
}

type SpotifyArtist = { name: string };
type SpotifyImage = { url: string };
type SpotifyAlbum = { name?: string; images?: SpotifyImage[] };
type SpotifyTrack = {
	name?: string;
	artists?: SpotifyArtist[];
	album?: SpotifyAlbum;
	external_urls?: { spotify?: string };
	uri?: string;
	duration_ms?: number | null;
	preview_url?: string | null;
};

type SpotifyDevice = {
	name?: string;
	type?: string;
	volume_percent?: number | null;
};

type SpotifyCurrentlyPlaying = {
	is_playing?: boolean;
	progress_ms?: number | null;
	item?: SpotifyTrack;
	device?: SpotifyDevice;
};

type SpotifyRecentlyPlayedItem = {
	played_at?: string;
	track?: SpotifyTrack;
};

type SpotifyTopItem = {
	name?: string;
	external_urls?: { spotify?: string };
	images?: SpotifyImage[];
	artists?: SpotifyArtist[];
};

export type NowTrackPayload = {
	playing: boolean;
	title: string;
	artist: string;
	album: string;
	url: string;
	uri: string;
	image: string;
	progressMs: number | null;
	durationMs: number | null;
	device: {
		name: string;
		type: string;
		volumePercent: number | null;
	} | null;
	previewUrl: string | null;
};

export type HistoryItemPayload = {
	title: string;
	artist: string;
	album: string;
	image: string;
	url: string;
	playedAt: string; // ISO string
};

export type TopTrackPayload = {
	title: string;
	artist: string;
	image: string;
	url: string;
};

export type TopArtistPayload = {
	name: string;
	image: string;
	url: string;
};

export type NowPayload = {
	playing: boolean;
	title: string;
	artist: string;
	album: string;
	url: string;
	image: string;
};

export type SpotifyNowResponse = {
	now: NowTrackPayload | null;
	history: HistoryItemPayload[];
	topTracks: TopTrackPayload[];
	topArtists: TopArtistPayload[];
};

const mapArtists = (artists?: SpotifyArtist[]): string =>
	Array.isArray(artists) ? artists.map((a) => a.name).join(', ') : '';

const pickImage = (images?: SpotifyImage[]): string => images?.[1]?.url ?? images?.[0]?.url ?? '';

export const toNowTrackPayload = (
	t: SpotifyTrack | null | undefined,
	meta: {
		playing: boolean;
		progressMs?: number | null;
		device?: SpotifyDevice | null;
	}
): NowTrackPayload | null => {
	if (!t) return null;

	const album = t.album ?? {};
	const images = album.images ?? [];

	return {
		playing: meta.playing,
		title: t.name ?? '',
		artist: mapArtists(t.artists),
		album: album.name ?? '',
		url: t.external_urls?.spotify ?? '',
		uri: t.uri ?? '',
		image: pickImage(images),
		progressMs: meta.progressMs ?? null,
		durationMs: t.duration_ms ?? null,
		device: meta.device
			? {
					name: meta.device.name ?? '',
					type: meta.device.type ?? '',
					volumePercent:
						typeof meta.device.volume_percent === 'number' ? meta.device.volume_percent : null
				}
			: null,
		previewUrl: t.preview_url ?? null
	};
};

export const toNowPayload = (t: SpotifyTrack | null | undefined, playing: boolean): NowPayload => ({
	playing,
	title: t?.name ?? '',
	artist: mapArtists(t?.artists),
	album: t?.album?.name ?? '',
	url: t?.external_urls?.spotify ?? '',
	image: pickImage(t?.album?.images)
});

export const toHistoryItem = (item: SpotifyRecentlyPlayedItem): HistoryItemPayload | null => {
	const t = item.track;
	if (!t) return null;

	const album = t.album ?? {};
	const images = album.images ?? [];

	return {
		title: t.name ?? '',
		artist: mapArtists(t.artists),
		album: album.name ?? '',
		url: t.external_urls?.spotify ?? '',
		image: pickImage(images),
		playedAt: item.played_at ?? ''
	};
};

export const toTopTrackPayload = (t: SpotifyTopItem): TopTrackPayload => {
	const images = t.images ?? [];

	return {
		title: t.name ?? '',
		artist: mapArtists(t.artists),
		url: t.external_urls?.spotify ?? '',
		image: pickImage(images)
	};
};

export const toTopArtistPayload = (a: SpotifyTopItem): TopArtistPayload => {
	const images = a.images ?? [];

	return {
		name: a.name ?? '',
		url: a.external_urls?.spotify ?? '',
		image: pickImage(images)
	};
};

async function spotifyFetch<T>(path: string): Promise<T | null> {
	const access = await getAccessToken();

	const r = await fetch(`${SPOTIFY_API_BASE}${path}`, {
		headers: { Authorization: `Bearer ${access}` }
	});

	if (!r.ok) {
		if (r.status === 204) return null;
		console.warn('[spotify] API error', r.status, path);
		return null;
	}

	const text = await r.text();
	if (!text) return null;

	try {
		return JSON.parse(text) as T;
	} catch (err) {
		console.error('[spotify] Failed to parse JSON for', path, err);
		return null;
	}
}

export async function getNowPlaying(): Promise<SpotifyCurrentlyPlaying | null> {
	return spotifyFetch<SpotifyCurrentlyPlaying>('/me/player/currently-playing');
}

export async function getRecentTrack(): Promise<SpotifyRecentlyPlayedItem | null> {
	const res = await spotifyFetch<{ items?: SpotifyRecentlyPlayedItem[] }>(
		'/me/player/recently-played?limit=1'
	);
	if (!res || !Array.isArray(res.items) || !res.items.length) return null;
	return res.items[0];
}

export async function getRecentTracks(limit = 5): Promise<SpotifyRecentlyPlayedItem[]> {
	const res = await spotifyFetch<{ items?: SpotifyRecentlyPlayedItem[] }>(
		`/me/player/recently-played?limit=${limit}`
	);
	if (!res || !Array.isArray(res.items)) return [];
	return res.items;
}

type TimeRange = 'short_term' | 'medium_term' | 'long_term';

export async function getTopTracks(
	range: TimeRange = 'short_term',
	limit = 5
): Promise<SpotifyTopItem[]> {
	const res = await spotifyFetch<{ items?: SpotifyTopItem[] }>(
		`/me/top/tracks?time_range=${range}&limit=${limit}`
	);
	if (!res || !Array.isArray(res.items)) return [];
	return res.items;
}

export async function getTopArtists(
	range: TimeRange = 'short_term',
	limit = 5
): Promise<SpotifyTopItem[]> {
	const res = await spotifyFetch<{ items?: SpotifyTopItem[] }>(
		`/me/top/artists?time_range=${range}&limit=${limit}`
	);
	if (!res || !Array.isArray(res.items)) return [];
	return res.items;
}
