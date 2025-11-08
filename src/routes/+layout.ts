import type { LayoutLoad } from './$types';
import { me as me_en } from '$lib/me';
import { me_lv } from '$lib/me_lv';

export const load: LayoutLoad = ({ url }) => {
	// URL pattern:
	//   /      -> lv (default)
	//   /en    -> en
	const [, firstSegment] = url.pathname.split('/');

	const lang: 'lv' | 'en' = firstSegment === 'en' ? 'en' : 'lv';
	const profile = lang === 'en' ? me_en : me_lv;

	return {
		lang,
		me: profile
	};
};

export const ssr = true;
export const prerender = false;
