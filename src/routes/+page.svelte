<script lang="ts">
	import Icon from '@iconify/svelte';
	import Avatar from '$lib/assets/58264013.jpg';
	import { mailto } from '$lib/utils';

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
	const nowPlayingModule = import('$lib/components/NowPlaying.svelte');
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
				width="76"
				height="76"
				loading="eager"
			/>

			<div class="who">
				<div class="eyebrow">
					{lang === 'lv'
						? 'Frontend inženieris un IT speciālists'
						: 'Frontend engineer & IT specialist'}
				</div>
				<h1 id="hero-heading" class="name">{me.name}</h1>

				<div class="visually-hidden" aria-hidden="true">
					Edgars Cīrulis, Edgars Cirulis — datoru remonts, IT speciālists, frontend inženieris,
					SvelteKit, veiktspējas optimizācija.
				</div>

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

	{#await nowPlayingModule then mod}
		<svelte:component this={mod.default} spotify={data.spotify} />
	{/await}
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
		scroll-margin-top: 90px;
	}

	.visually-hidden {
		position: absolute !important;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px, 1px, 1px, 1px);
		white-space: nowrap;
		border: 0;
		padding: 0;
		margin: -1px;
	}

	.card {
		position: relative;
		overflow: hidden;
		border-radius: var(--radius-xl);
		padding: var(--pad);
		background: var(--surface);
		border: 1px solid var(--border);
		box-shadow: var(--ring), var(--shadow-1);
		backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-sat))
			brightness(var(--glass-bright));
		transition:
			transform 0.2s cubic-bezier(0.2, 0.8, 0.2, 1),
			border-color 0.2s ease,
			box-shadow 0.2s ease,
			background 0.2s ease;
	}

	.card::before {
		content: '';
		position: absolute;
		inset: -30% -10% auto -10%;
		height: 50%;
		background: radial-gradient(
			700px 240px at 30% 0%,
			color-mix(in srgb, white 10%, transparent),
			transparent 70%
		);
		opacity: 0.4;
		pointer-events: none;
	}

	.card:hover {
		transform: translateY(-3px);
		border-color: var(--border-strong);
		box-shadow: var(--ring), var(--shadow-2);
	}

	h1,
	h2,
	h3 {
		margin: 0;
		font-family: var(--font-head);
	}

	h2 {
		font-size: 0.9rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--text) 80%, transparent);
		font-weight: 800;
	}

	h3 {
		font-size: 1.02rem;
	}

	p {
		margin: 0;
	}

	.lead {
		font-size: 0.98rem;
		color: color-mix(in srgb, var(--text) 92%, transparent);
	}

	.muted {
		color: var(--muted);
	}

	.eyebrow {
		font-size: 0.74rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: var(--muted);
		margin-bottom: 6px;
	}

	.btn,
	.chip-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 10px 14px;
		border-radius: 999px;
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02)),
			rgba(255, 255, 255, 0.03);
		color: var(--text);
		text-decoration: none;
		border: 1px solid var(--border);
		font-size: 0.92rem;
		box-shadow: var(--ring);
		backdrop-filter: blur(8px) saturate(140%);
		transition:
			transform 0.15s cubic-bezier(0.2, 0.8, 0.2, 1),
			border-color 0.15s ease,
			background 0.15s ease,
			box-shadow 0.15s ease;
		white-space: nowrap;
	}

	.btn:hover,
	.chip-btn:hover {
		transform: translateY(-1px);
		border-color: var(--border-strong);
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.03)),
			rgba(255, 255, 255, 0.04);
	}

	.btn:active,
	.chip-btn:active {
		transform: translateY(0) scale(0.98);
	}

	.btn.primary {
		background:
			radial-gradient(
				140% 180% at 0% 0%,
				color-mix(in srgb, var(--tint) 22%, transparent),
				transparent 55%
			),
			linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03)),
			rgba(255, 255, 255, 0.045);
		border-color: color-mix(in srgb, var(--tint) 35%, var(--border));
	}

	.btn.primary:hover {
		box-shadow:
			var(--ring),
			0 0 26px color-mix(in srgb, var(--tint) 45%, transparent),
			0 12px 26px rgba(0, 0, 0, 0.35);
		border-color: color-mix(in srgb, var(--tint) 55%, var(--border));
	}

	.chip-btn.subtle {
		background:
			linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02)),
			rgba(255, 255, 255, 0.02);
	}

	.hero {
		display: grid;
		gap: 16px;
	}

	.hero-header {
		display: flex;
		align-items: center;
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
		width: 76px;
		height: 76px;
		border-radius: 26px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.04);
		object-fit: cover;
		box-shadow:
			var(--ring),
			0 8px 18px rgba(0, 0, 0, 0.32);
	}

	.name {
		font-size: 1.95rem;
		font-weight: 800;
		letter-spacing: -0.01em;
	}

	.title {
		color: color-mix(in srgb, var(--text) 80%, transparent);
		margin-top: 4px;
		font-size: 0.98rem;
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
		gap: 8px;
		padding: 5px 12px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--border);
		font-size: 0.8rem;
		backdrop-filter: blur(6px);
	}

	.lang-switch a {
		text-decoration: none;
		color: var(--muted);
		opacity: 0.8;
		transition:
			opacity 0.12s ease,
			color 0.12s ease;
	}

	.lang-switch a.active {
		font-weight: 700;
		opacity: 1;
		color: var(--text);
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
		padding-bottom: 10px;
		border-bottom: 1px solid var(--border);
	}

	.section-subtitle {
		font-size: 0.84rem;
		max-width: 280px;
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
		padding: 6px 12px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.04);
		border: 1px solid var(--border);
		font-size: 0.9rem;
	}

	.services {
		display: grid;
		grid-template-columns: 1fr;
		gap: 12px;
	}

	.service {
		display: grid;
		grid-template-columns: 36px 1fr;
		gap: 12px;
		align-items: center;
		padding: var(--pad-sm);
		border-radius: var(--radius-lg);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border);
	}

	.service-icon {
		width: 36px;
		height: 36px;
		border-radius: 999px;
		display: grid;
		place-items: center;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid var(--border);
		box-shadow: var(--ring);
		line-height: 0;
	}

	.service-icon :global(svg) {
		width: 18px !important;
		height: 18px !important;
		display: block;
	}

	.life {
		display: grid;
		grid-template-columns: 1fr;
		gap: 12px;
	}

	.life-item {
		display: grid;
		grid-template-columns: 36px 1fr;
		gap: 12px;
		align-items: center;
		padding: var(--pad-sm);
		border-radius: var(--radius-lg);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border);
	}

	.life-icon {
		width: 36px;
		height: 36px;
		border-radius: 999px;
		display: grid;
		place-items: center;
		background: rgba(255, 255, 255, 0.06);
		border: 1px solid var(--border);
		box-shadow: var(--ring);
		line-height: 0;
	}

	.life-icon :global(svg) {
		width: 18px !important;
		height: 18px !important;
		display: block;
		opacity: 0.95;
	}

	.now {
		margin: 0;
		padding-left: 18px;
		color: color-mix(in srgb, var(--text) 85%, transparent);
		display: grid;
		gap: 6px;
		font-size: 0.96rem;
	}

	.grid {
		display: grid;
		grid-template-columns: 1fr;
		gap: 12px;
	}

	.project {
		position: relative;
		overflow: hidden;
		display: grid;
		gap: 6px;
		padding: 14px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		text-decoration: none;
		color: inherit;
		transition:
			transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1),
			border-color 0.18s ease,
			box-shadow 0.18s ease,
			background 0.18s ease;
	}

	.project:hover {
		transform: translateY(-2px);
		border-color: var(--border-strong);
		box-shadow: var(--shadow-1);
		background:
			radial-gradient(
				600px 180px at 0% 0%,
				color-mix(in srgb, var(--tint) 12%, transparent),
				transparent 65%
			),
			rgba(255, 255, 255, 0.035);
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
			color-mix(in srgb, var(--tint) 40%, transparent),
			transparent 70%
		);
	}

	.role {
		position: relative;
		padding: 12px;
		border-radius: var(--radius-lg);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border);
	}

	.role::before {
		content: '';
		position: absolute;
		left: -3px;
		top: 18px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--tint) 80%, transparent);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--bg) 85%, transparent);
	}

	@media (min-width: 760px) {
		.name {
			font-size: 2.1rem;
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
	}

	@media (max-width: 540px) {
		.hero-actions {
			flex-direction: column;
			align-items: stretch;
			gap: 10px;
		}
		.links {
			width: 100%;
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
		.btn,
		.chip-btn,
		.lang-switch {
			backdrop-filter: none;
		}
	}
</style>
