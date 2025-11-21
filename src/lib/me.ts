export type Link = { label: string; icon: string; href: string };
export type Project = { name: string; desc: string; href: string };
export type Experience = { role: string; company: string; years: string; bullets: string[] };
export type LifeItem = { icon: string; title: string; text: string };

export const me = {
	name: 'Edgars Cīrulis',
	title: 'Frontend Engineer / Developer & IT Support',
	location: 'Latvia',
	email: 'e.cirulis@proton.me',
	bio: 'Frontend engineer from Latvia offering computer repair, IT support and friendly tech help. Friendly, but not customer service.',
	skills: ['SvelteKit', 'C++', 'UI/UX', 'Testing', 'Computer repair', 'IT support'],
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

	projects: [] as Project[],
	experience: [] as Experience[],

	life: [
		{
			icon: 'lucide:music',
			title: 'Music',
			text: 'Drum & Bass, electronic & ambient while coding.'
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
