<script lang="ts">
	import Icon from '@iconify/svelte';
	import Avatar from '$lib/assets/58264013.jpg';
	import { mailto } from '$lib/utils';
	import NowPlaying from '$lib/components/NowPlaying.svelte';

	type Spotify = {
		playing: boolean;
		title: string;
		artist: string;
		album: string;
		url: string;
		image: string;
	};

	export let data: {
		spotify: Spotify | null;
		me: typeof import('$lib/me').me;
		lang: 'lv' | 'en';
	};

	const { me, lang } = data;
	const nowItems = me.now.filter(Boolean);
</script>

<section class="card hero" aria-labelledby="hero-heading">
	<header class="hero-header">
		<div class="hero-main">
			<img
				class="avatar"
				src={Avatar}
				alt={lang === 'lv'
					? 'Portrets: Edgars Cīrulis, frontend inženieris no Latvijas'
					: 'Portrait of Edgars Cīrulis, frontend engineer from Latvia'}
				width="72"
				height="72"
				fetchpriority="high"
				decoding="async"
				sizes="72px"
			/>

			<div class="who">
				<div class="eyebrow">
					{lang === 'lv'
						? 'Frontend inženieris un IT speciālists'
						: 'Frontend engineer & IT specialist'}
				</div>
				<h1 id="hero-heading" class="name">{me.name}</h1>

				<p class="title">
					{me.title} · <span class="muted">{me.location} 🇱🇻</span>
				</p>
			</div>
		</div>

		<nav class="lang-switch" aria-label="Language switcher">
			<a href="/" class:active={lang === 'lv'}>LV</a>
			<span>·</span>
			<a href="/en" class:active={lang === 'en'}>EN</a>
		</nav>
	</header>

	<div class="hero-actions">
		<a class="btn primary" href={mailto(me.email)} rel="noopener">
			<Icon icon="lucide:mail" width="18" />
			<span>{lang === 'lv' ? 'Sazināties' : 'Contact'}</span>
		</a>

		{#if me.links.length}
			<nav class="links" aria-label="Social links">
				{#each me.links as l (l.href)}
					<a
						class="chip-btn subtle"
						href={l.href}
						rel="me external noopener noreferrer"
						target="_blank"
					>
						<Icon icon={l.icon} width="18" />
						<span class="hide-sm">{l.label}</span>
					</a>
				{/each}
			</nav>
		{/if}
	</div>

	<NowPlaying spotify={data.spotify} />
</section>

<section class="card section" id="services" aria-labelledby="services-heading">
	<header class="section-head">
		<div>
			<h2 id="services-heading">{lang === 'lv' ? 'Pakalpojumi' : 'Services'}</h2>
			<p class="section-subtitle muted">
				{lang === 'lv'
					? 'Praktisks IT atbalsts un frontendi, kurus tiešām var lietot.'
					: 'Hands-on IT help and frontends you can actually use.'}
			</p>
		</div>
	</header>

	{#if me.services?.length}
		<div class="services">
			{#each me.services as s (s.name)}
				<article class="service">
					<div class="service-icon" aria-hidden="true">
						<Icon icon={s.icon} width="18" />
					</div>
					<div class="service-body">
						<h3>{s.name}</h3>
						<p class="muted">{s.blurb}</p>
						{#if s.highlight}
							<p class="service-highlight">{s.highlight}</p>
						{/if}
					</div>
				</article>
			{/each}
		</div>
	{:else}
		<p class="muted">
			{lang === 'lv'
				? 'Datoru remonts, optimizācija, IT atbalsts un frontend izstrāde.'
				: 'PC repair, optimisation, IT support and frontend development.'}
		</p>
	{/if}
</section>

<section class="card section" id="about" aria-labelledby="about-heading">
	<header class="section-head">
		<div>
			<h2 id="about-heading">{lang === 'lv' ? 'Par mani' : 'About'}</h2>
			<p class="section-subtitle muted">
				{lang === 'lv' ? 'Kas es esmu un kā strādāju.' : 'Who I am and how I work.'}
			</p>
		</div>
	</header>

	<p class="lead">{me.bio}</p>

	{#if me.skills.length}
		<ul class="chips" aria-label={lang === 'lv' ? 'Prasmes' : 'Skills'}>
			{#each me.skills as s (s)}
				<li class="chip">{s}</li>
			{/each}
		</ul>
	{/if}
</section>

<section class="card section" id="life" aria-labelledby="life-heading">
	<header class="section-head">
		<div>
			<h2 id="life-heading">{lang === 'lv' ? 'Ikdiena' : 'Life'}</h2>
			<p class="section-subtitle muted">
				{lang === 'lv' ? 'Ko daru ārpus koda.' : 'What I’m doing outside of code.'}
			</p>
		</div>
	</header>

	<div class="life">
		{#each me.life as item (item.title)}
			<div class="life-item">
				<div class="life-icon" aria-hidden="true">
					<Icon icon={item.icon} width="18" />
				</div>

				<div class="life-body">
					<div class="life-title">{item.title}</div>
					<div class="life-text muted">{item.text}</div>
				</div>
			</div>
		{/each}
	</div>
</section>

<section class="card section" id="now" aria-labelledby="now-heading">
	<header class="section-head">
		<div>
			<h2 id="now-heading">{lang === 'lv' ? 'Tagad' : 'Now'}</h2>
			<p class="section-subtitle muted">
				{lang === 'lv' ? 'Kam šobrīd pievēršu uzmanību.' : 'What I’m focusing on at this moment.'}
			</p>
		</div>
	</header>

	{#if nowItems.length}
		<ul class="now">
			{#each nowItems as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	{:else}
		<p class="muted">
			{lang === 'lv'
				? 'Atpūšos, uzpildu baterijas un plānoju nākamos soļus.'
				: 'Resting, recharging, and planning what’s next.'}
		</p>
	{/if}
</section>

<section class="card section" id="projects" aria-labelledby="projects-heading">
	<header class="section-head">
		<div>
			<h2 id="projects-heading">{lang === 'lv' ? 'Projekti' : 'Projects'}</h2>
			<p class="section-subtitle muted">
				{lang === 'lv' ? 'Lietas, ko esmu uzbūvējis.' : 'Things I’ve built and shipped.'}
			</p>
		</div>
	</header>

	{#if me.projects.length}
		<div class="grid">
			{#each me.projects as p (p.name)}
				<a class="project" href={p.href} rel="external noopener noreferrer" target="_blank">
					<div class="row">
						<h3>{p.name}</h3>
						<Icon icon="lucide:arrow-up-right" width="16" aria-hidden="true" />
					</div>

					<p class="muted">{p.desc}</p>
				</a>
			{/each}
		</div>
	{:else}
		<p class="muted">
			{lang === 'lv' ? 'Šobrīd nav publisku projektu.' : 'No public projects right now.'}
		</p>
	{/if}
</section>

<section class="card section" id="experience" aria-labelledby="experience-heading">
	<header class="section-head">
		<div>
			<h2 id="experience-heading">{lang === 'lv' ? 'Pieredze' : 'Experience'}</h2>
			<p class="section-subtitle muted">
				{lang === 'lv'
					? 'Kur esmu strādājis un ko darījis.'
					: 'Where I’ve worked and what I’ve done.'}
			</p>
		</div>
	</header>

	{#if me.experience.length}
		<ul class="roles">
			{#each me.experience as e (e.role)}
				<li class="role">
					<div class="meta">
						<div class="titleline">
							<strong>{e.role}</strong>
							<span class="company">· {e.company}</span>
						</div>

						<div class="years">{e.years}</div>
					</div>

					<ul class="bullets">
						{#each e.bullets as b (b)}
							<li>{b}</li>
						{/each}
					</ul>
				</li>
			{/each}
		</ul>
	{:else}
		<p class="muted">
			{lang === 'lv'
				? 'Atvērts jaunām iespējām. CV pieejams pēc pieprasījuma.'
				: 'Open to opportunities. CV available on request.'}
		</p>
	{/if}
</section>

<style>
	:global(section[id]) {
		scroll-margin-top: 80px;
	}

	.card {
		position: relative;
		overflow: hidden;
		background:
			radial-gradient(120% 160% at 0% -40%, rgba(255, 255, 255, 0.05), transparent 60%),
			color-mix(in srgb, var(--surface) 70%, transparent);
		border-radius: var(--radius);
		padding: var(--pad);

		border: 1px solid color-mix(in srgb, var(--border) 65%, transparent);

		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--text) 4%, transparent) inset,
			0 18px 40px rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(22px) saturate(120%);
	}

	.card::before {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		border-radius: inherit;
		background: radial-gradient(
			140% 140% at 0% 0%,
			color-mix(in srgb, var(--tint) 8%, transparent),
			transparent 55%
		);
		opacity: 0.7;
		mix-blend-mode: soft-light;
	}

	.card > * {
		position: relative;
		z-index: 1;
	}

	.card + .card {
		margin-top: 10px;
	}

	h1,
	h2,
	h3 {
		margin: 0;
	}

	h2 {
		font-size: 0.9rem;
		letter-spacing: 0.11em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--text) 72%, var(--bg));
		font-weight: 700;
	}

	h3 {
		font-size: 1.02rem;
	}

	p {
		margin: 0;
	}

	.lead {
		color: color-mix(in srgb, var(--text) 88%, var(--bg));
		font-size: 0.98rem;
	}

	.muted {
		color: color-mix(in srgb, var(--text) 54%, var(--bg));
	}

	.eyebrow {
		font-size: 0.75rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: color-mix(in srgb, var(--text) 54%, var(--bg));
		margin-bottom: 4px;
	}

	.btn,
	.chip-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 10px 13px;
		border-radius: 999px;
		background: var(--ghost);
		color: var(--text);
		text-decoration: none;
		border: 1px solid color-mix(in srgb, var(--border) 88%, transparent);
		box-shadow: none;
		font-size: 0.9rem;
		transition:
			transform 0.12s ease,
			border-color 0.12s ease,
			background 0.12s ease,
			box-shadow 0.12s ease;
		white-space: nowrap;
	}

	.btn:hover,
	.chip-btn:hover {
		transform: translateY(-1px);
		border-color: color-mix(in srgb, var(--text) 10%, var(--border));
		box-shadow: 0 10px 20px rgba(0, 0, 0, 0.35);
	}

	.btn:active,
	.chip-btn:active {
		transform: translateY(0);
		box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
	}

	.btn.primary {
		background: radial-gradient(
			circle at 0% 0%,
			color-mix(in srgb, var(--tint) 40%, var(--ghost)),
			var(--ghost)
		);
		border-color: color-mix(in srgb, var(--tint) 45%, var(--border));
	}

	.btn.primary:hover {
		border-color: color-mix(in srgb, var(--tint) 60%, var(--border));
	}

	.chip-btn.subtle {
		background: color-mix(in srgb, var(--chip) 92%, transparent);
	}

	.btn:focus-visible,
	.chip-btn:focus-visible {
		outline: 2px solid color-mix(in srgb, var(--tint) 65%, white);
		outline-offset: 2px;
		border-radius: 999px;
	}

	.hero {
		display: grid;
		gap: 14px;
	}

	.hero-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
	}

	.hero-main {
		display: flex;
		gap: 14px;
		align-items: center;
	}

	.avatar {
		width: 72px;
		height: 72px;
		border-radius: 24px;
		border: 1px solid var(--border);
		background: var(--icon-surface);
		object-fit: cover;
		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--text) 5%, transparent) inset,
			0 5px 14px rgba(0, 0, 0, 0.3);
	}

	.name {
		font-size: 1.52rem;
		font-weight: 780;
		letter-spacing: 0.16px;
	}

	.title {
		color: color-mix(in srgb, var(--text) 72%, var(--bg));
		margin-top: 3px;
		font-size: 0.95rem;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		column-gap: 10px;
		row-gap: 8px;
	}

	.lang-switch {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 4px 10px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--chip) 90%, transparent);
		border: 1px solid color-mix(in srgb, var(--border) 85%, transparent);
		font-size: 0.78rem;
	}

	.lang-switch a {
		text-decoration: none;
		color: color-mix(in srgb, var(--text) 70%, var(--bg));
		opacity: 0.7;
		transition:
			opacity 0.12s ease,
			color 0.12s ease,
			transform 0.12s ease;
	}

	.lang-switch a.active {
		font-weight: 600;
		opacity: 1;
		color: color-mix(in srgb, var(--text) 90%, var(--bg));
		transform: translateY(-0.5px);
	}

	.lang-switch a:hover {
		opacity: 1;
	}

	.links {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.section .section-head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 14px;
		padding-bottom: 8px;
		border-bottom: 1px solid color-mix(in srgb, var(--border) 92%, transparent);
	}

	.section-subtitle {
		font-size: 0.82rem;
		max-width: 260px;
		text-align: left;
		margin-top: 4px;
	}

	.chips {
		list-style: none;
		padding: 0;
		margin: 14px 0 0;
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.chip {
		padding: 6px 11px;
		border-radius: 999px;
		background: linear-gradient(
			180deg,
			var(--chip),
			color-mix(in srgb, var(--chip) 92%, transparent)
		);
		border: 1px solid color-mix(in srgb, var(--border) 88%, transparent);
		color: color-mix(in srgb, var(--text) 90%, var(--bg));
		font-size: 0.9rem;
	}

	/* Services */

	.services {
		display: grid;
		grid-template-columns: 1fr;
		gap: 10px;
	}

	.service {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 10px;
		padding: 12px;
		border-radius: 14px;
		background: color-mix(in srgb, var(--elev) 65%, transparent);
		border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
	}

	.service-icon {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border-radius: 999px;
		background: var(--icon-surface);
		border: 1px solid var(--border);
	}

	.service-body h3 {
		font-size: 0.98rem;
		margin-bottom: 3px;
	}

	.service-highlight {
		margin-top: 4px;
		font-size: 0.86rem;
		color: color-mix(in srgb, var(--text) 72%, var(--bg));
	}

	.life {
		display: grid;
		grid-template-columns: 1fr;
		gap: 10px;
	}

	.life-item {
		display: flex;
		gap: 10px;
		align-items: flex-start;
		padding: 12px;
		border-radius: 12px;
		background: color-mix(in srgb, var(--elev) 65%, transparent);
		border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
	}

	.life-icon {
		display: grid;
		place-items: center;
		width: 30px;
		height: 30px;
		border-radius: 999px;
		background: var(--icon-surface);
		border: 1px solid var(--border);
	}

	.life-title {
		font-weight: 650;
	}

	.life-text {
		margin-top: 3px;
		font-size: 0.92rem;
	}

	.now {
		margin: 0;
		padding-left: 18px;
		color: color-mix(in srgb, var(--text) 78%, var(--bg));
		display: grid;
		gap: 6px;
		font-size: 0.95rem;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 10px;
	}

	.project {
		position: relative;
		overflow: hidden;
		display: grid;
		gap: 6px;
		padding: 14px;
		background: color-mix(in srgb, var(--elev) 65%, transparent);
		border: 1px solid color-mix(in srgb, var(--border) 70%, transparent);
		border-radius: 14px;
		text-decoration: none;
		color: inherit;
		transition:
			transform 0.16s ease,
			border-color 0.16s ease,
			box-shadow 0.16s ease,
			background 0.16s ease;
	}

	.project::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 14px;
		border: 1px solid transparent;
		background: linear-gradient(
				120deg,
				color-mix(in srgb, var(--tint) 14%, transparent),
				transparent 30%
			)
			border-box;
		mask:
			linear-gradient(#000 0 0) padding-box,
			linear-gradient(#000 0 0);
		-webkit-mask:
			linear-gradient(#000 0 0) padding-box,
			linear-gradient(#000 0 0);
		-webkit-mask-composite: xor;
		mask-composite: exclude;
		opacity: 0;
		transition: opacity 0.16s ease;
	}

	.project:hover {
		transform: translateY(-2px);
		border-color: color-mix(in srgb, var(--tint) 18%, var(--border));
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.35);
		background:
			radial-gradient(
				circle at top left,
				color-mix(in srgb, var(--tint) 10%, transparent),
				transparent 55%
			),
			var(--elev);
	}

	.project:hover::after {
		opacity: 0.95;
	}

	.row {
		display: flex;
		gap: 6px;
		align-items: center;
	}

	.row h3 {
		font-weight: 700;
	}

	.roles {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 16px;
		position: relative;
		padding-left: 12px;
	}

	.roles::before {
		content: '';
		position: absolute;
		left: 8px;
		top: 0;
		bottom: 0;
		width: 2px;
		border-radius: 2px;
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--tint) 18%, transparent),
			transparent 70%
		);
	}

	.role {
		position: relative;
		padding: 12px 12px 10px;
		border-radius: 14px;
		background: color-mix(in srgb, var(--elev) 65%, transparent);
		border: 1px solid color-mix(in srgb, var(--border) 72%, transparent);
	}

	.role::before {
		content: '';
		position: absolute;
		left: -3px;
		top: 18px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--tint) 70%, var(--bg));
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--bg) 80%, transparent);
	}

	.meta {
		display: flex;
		gap: 8px;
		align-items: baseline;
		flex-wrap: wrap;
	}

	.company {
		color: color-mix(in srgb, var(--text) 70%, var(--bg));
	}

	.years {
		margin-left: auto;
		color: var(--muted);
		font-size: 0.9rem;
	}

	.bullets {
		margin: 7px 0 0 18px;
		color: color-mix(in srgb, var(--text) 78%, var(--bg));
		font-size: 0.94rem;
	}

	@media (min-width: 760px) {
		.hero-header {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
		}

		.name {
			font-size: 1.65rem;
		}

		.grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}

		.life {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.services {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.card {
			border-radius: 22px;
		}
	}

	@media (max-width: 540px) {
		.hero-header {
			gap: 10px;
		}

		.hero-actions {
			flex-direction: column;
			align-items: stretch;
		}

		.links {
			width: 100%;
			justify-content: flex-start;
		}

		.chip-btn {
			flex: 1 0 auto;
			justify-content: center;
		}

		.section-subtitle {
			display: none;
		}
	}

	@media (max-width: 420px) {
		.hide-sm {
			display: none;
		}
	}

	@media (prefers-reduced-transparency: reduce) {
		.card {
			backdrop-filter: none;
		}
	}
</style>
