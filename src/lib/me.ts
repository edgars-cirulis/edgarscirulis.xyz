export type Link = { label: string; icon: string; href: string };
export type Project = { name: string; desc: string; href: string };
export type Experience = { role: string; company: string; years: string; bullets: string[] };
export type LifeItem = { icon: string; title: string; text: string };
export type Service = { icon: string; name: string; blurb: string; highlight?: string };

export const me = {
	name: 'Edgars Cīrulis',
	title: 'Frontend engineer & IT support',
	location: 'Latvia',
	email: 'e.cirulis@proton.me',
	bio: 'Frontend engineer and hands-on IT generalist from Latvia. I fix slow or broken Windows and Linux PCs, untangle small-business tech and build fast, minimal SvelteKit frontends that feel good to use. Clear communication, realistic expectations and real problem-solving — without fake customer-service energy.',
	skills: [
		'SvelteKit',
		'TypeScript',
		'C++',
		'UI/UX',
		'Testing',
		'Performance optimisation',
		'Computer repair',
		'IT support'
	],

	links: [
		{
			label: 'GitHub',
			icon: 'lucide:github',
			href: 'https://github.com/edgars-cirulis'
		},
		{
			label: 'Facebook',
			icon: 'lucide:facebook',
			href: 'https://facebook.com/edgarsscirulis'
		},
		{
			label: 'Instagram',
			icon: 'lucide:instagram',
			href: 'https://instagram.com/e.cirulis'
		}
	] as Link[],

	services: [
		{
			icon: 'lucide:monitor-smartphone',
			name: 'PC & laptop repair',
			blurb: 'Diagnostics, hardware replacement and clean installs for Windows/Linux machines.',
			highlight: 'Blue screens, slow boot or weird noises — I can take a look.'
		},
		{
			icon: 'lucide:gauge',
			name: 'Performance optimisation',
			blurb: 'Cleanup, tuning and upgrade recommendations so your PC actually feels fast again.',
			highlight: 'Great for gaming rigs and older work machines.'
		},
		{
			icon: 'lucide:server-cog',
			name: 'Home & small business IT support',
			blurb:
				'Networking, backup, basic server setups and everyday “why is this broken again?” support.',
			highlight: 'Remote help available; on-site in Latvia by agreement.'
		},
		{
			icon: 'lucide:code-2',
			name: 'Websites & frontends',
			blurb: 'Clean, fast frontends built with SvelteKit and modern tooling.',
			highlight: 'From small landing pages to web apps and internal dashboards.'
		}
	] as Service[],

	projects: [
		{
			name: 'This website',
			desc: 'Personal site built with SvelteKit.',
			href: 'https://edgarscirulis.xyz'
		}
	] as Project[],

	experience: [] as Experience[],

	life: [
		{
			icon: 'lucide:music',
			title: 'Music',
			text: 'Drum & Bass, electronic and ambient while coding.'
		},
		{
			icon: 'lucide:palette',
			title: 'Design',
			text: 'Simple layouts, generous spacing, purposeful type.'
		},
		{
			icon: 'lucide:footprints',
			title: 'Outside',
			text: 'Long walks, clear head, better ideas.'
		}
	] as LifeItem[],

	now: [] as string[]
};
