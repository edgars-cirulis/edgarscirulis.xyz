import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const [, first] = event.url.pathname.split('/');
	const lang: 'lv' | 'en' = first === 'en' ? 'en' : 'lv';

	(event.locals as any).lang = lang;

	return resolve(event, {
		transformPageChunk: ({ html }) => html.replace('%lang%', lang)
	});
};
