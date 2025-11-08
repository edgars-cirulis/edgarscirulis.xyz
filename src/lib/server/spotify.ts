const TOKEN_URL = 'https://accounts.spotify.com/api/token';

async function getAccessToken() {
	const res = await fetch(TOKEN_URL, {
		method: 'POST',
		headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
		body: new URLSearchParams({
			grant_type: 'refresh_token',
			refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? '',
			client_id: process.env.SPOTIFY_CLIENT_ID ?? '',
			client_secret: process.env.SPOTIFY_CLIENT_SECRET ?? ''
		})
	});

	if (!res.ok) throw new Error('Failed to refresh Spotify token');

	const json = await res.json();
	return json.access_token as string;
}

export async function getNowPlaying() {
	const access = await getAccessToken();

	const r = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
		headers: { Authorization: `Bearer ${access}` }
	});

	if (r.status === 204) return null;
	if (!r.ok) return null;

	const text = await r.text();
	if (!text) return null;

	return JSON.parse(text);
}

export async function getRecentTrack() {
	const access = await getAccessToken();

	const r = await fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
		headers: { Authorization: `Bearer ${access}` }
	});

	if (!r.ok) return null;

	const j = await r.json();
	return j.items?.[0] ?? null;
}

export type NowPayload = {
	playing: boolean;
	title: string;
	artist: string;
	album: string;
	url: string;
	image: string;
};
