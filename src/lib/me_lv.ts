import type { Link, Project, Experience, LifeItem, Service } from './me';

export const me_lv = {
	name: 'Edgars Cīrulis',
	title: 'Frontend inženieris un IT atbalsts',
	location: 'Latvija',
	email: 'e.cirulis@proton.me',
	bio: 'Frontenda inženieris un praktisks IT speciālists no Latvijas. Salaboju lēnus vai bojātus Windows un Linux datorus, sakārtoju mazo uzņēmumu tehnoloģijas un veidoju ātrus, minimālistiskus SvelteKit frontendus, kas patiešām labi lietojas. Skaidra komunikācija, reālistiskas gaidas un īsti risinājumi — bez viltota “customer-service” smaida.',

	skills: [
		'SvelteKit',
		'TypeScript',
		'C++',
		'UI/UX',
		'Testēšana',
		'Veiktspējas optimizācija',
		'Datoru remonts',
		'IT atbalsts'
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
			name: 'Datoru un portatīvo remonts',
			blurb: 'Diagnostika, detaļu maiņa un tīras Windows/Linux instalācijas.',
			highlight: 'Zilie ekrāni, lēna ielāde vai dīvainas skaņas — varu apskatīties.'
		},
		{
			icon: 'lucide:gauge',
			name: 'Veiktspējas optimizācija',
			blurb:
				'Sistēmas tīrīšana, konfigurēšana un ieteikumi uzlabojumiem, lai dators atkal justos ātrs.',
			highlight: 'Lieliski der spēļu datoriem un vecākām darba stacijām.'
		},
		{
			icon: 'lucide:server-cog',
			name: 'Mājas un mazo uzņēmumu IT atbalsts',
			blurb:
				'Tīkli, rezerves kopijas, pamata serveri un ikdienas “kāpēc tas atkal nestrādā?” problēmu risināšana.',
			highlight: 'Attālināts atbalsts pieejams; uz vietas Latvijā pēc vienošanās.'
		},
		{
			icon: 'lucide:code-2',
			name: 'Mājaslapas un frontendi',
			blurb: 'Tīri, ātri frontendi, veidoti ar SvelteKit un moderniem rīkiem.',
			highlight: 'No mazām landing lapām līdz web aplikācijām un iekšējiem paneļiem.'
		}
	] as Service[],

	projects: [
		{
			name: 'Šī mājaslapa',
			desc: 'Personīgā lapa, veidota ar SvelteKit.',
			href: 'https://edgarscirulis.xyz'
		}
	] as Project[],

	experience: [] as Experience[],

	life: [
		{
			icon: 'lucide:music',
			title: 'Mūzika',
			text: 'Drum & Bass, elektronika un ambient.'
		},
		{
			icon: 'lucide:palette',
			title: 'Dizains',
			text: 'Vienkārši izkārtojumi, plašas atstarpes, jēgpilna tipogrāfija.'
		},
		{
			icon: 'lucide:footprints',
			title: 'Pastaigas',
			text: 'Gari gājieni, skaidra galva, labākas idejas.'
		}
	] as LifeItem[],

	now: [] as string[]
};
