<script lang="ts">
	import Icon from '@iconify/svelte';
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
	const nowPlayingModule = import('$lib/components/NowPlaying.svelte');

	const t = (lv: string, en: string) => (lang === 'lv' ? lv : en);
</script>

<svelte:head>
	<title>{me.name} · {t('Šobrīd skan', 'Now playing')}</title>
	<meta
		name="description"
		content={t(
			'Spotify “Now playing” un neliels sveiciens Samantai.',
			'Spotify “Now playing” and a small note for Samantha.'
		)}
	/>
</svelte:head>

<div class="page">
	<header class="top">
		<nav class="lang" aria-label="Language switcher">
			<a href="/" class:active={lang === 'lv'}>LV</a>
			<span aria-hidden="true">·</span>
			<a href="/en" class:active={lang === 'en'}>EN</a>
		</nav>

		<a class="cta" href={mailto(me.email)} rel="noopener">
			<Icon icon="lucide:mail" width="16" />
			<span>{t('Sazināties', 'Contact')}</span>
		</a>
	</header>

	<main class="wrap">
		<section class="card" aria-labelledby="np-heading">
			<div class="card-head">
				<h1 id="np-heading" class="title">
					<Icon icon="lucide:audio-lines" width="18" aria-hidden="true" />
					<span>{t('Šobrīd skan', 'Now playing')}</span>
				</h1>
				<span class="hint">{t('Ja ir ieslēgts Spotify.', 'If Spotify is active.')}</span>
			</div>

			{#await nowPlayingModule then mod}
				<svelte:component this={mod.default} spotify={data.spotify} />
			{/await}
		</section>

		<section class="card love" aria-label={t('Sveiciens Samantai', 'A note for Samantha')}>
			<div class="love-ic" aria-hidden="true">
				<Icon icon="lucide:heart" width="18" />
			</div>

			<div class="love-body">
				<div class="love-title">{t('Samantha', 'Samantha')}</div>
				<p class="love-text">
					{t(
						'Paldies, ka esi. Lai šodiena ir maiga, un mūzika — tieši īstajā noskaņā. 💜',
						'Thank you for being you. May today be gentle, and the music land exactly right. 💜'
					)}
				</p>
			</div>
		</section>
	</main>
</div>

<style>
	.page {
		min-height: 100vh;
		display: grid;
		grid-template-rows: auto 1fr;
		gap: 18px;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 10px 12px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--surface) 85%, rgba(0, 0, 0, 0.1));
		border: 1px solid var(--border);
		box-shadow: var(--ring), 0 16px 50px rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(14px) saturate(140%);
	}

	.lang {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 7px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.03);
	}

	.lang a {
		color: var(--muted);
		text-decoration: none;
		opacity: 0.85;
		transition: opacity 0.12s ease, color 0.12s ease;
		font-size: 0.85rem;
	}

	.lang a.active {
		opacity: 1;
		color: var(--text);
		font-weight: 750;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		border-radius: 999px;
		text-decoration: none;
		color: var(--text);
		border: 1px solid color-mix(in srgb, var(--tint) 38%, var(--border));
		background: radial-gradient(120% 140% at 0% 0%, rgba(139, 92, 246, 0.18), transparent 55%),
			rgba(255, 255, 255, 0.03);
		box-shadow: var(--ring);
		transition: transform 0.14s cubic-bezier(0.2, 0.8, 0.2, 1), border-color 0.14s ease,
			box-shadow 0.14s ease;
	}

	.cta:hover {
		transform: translateY(-1px);
		border-color: color-mix(in srgb, var(--tint) 55%, var(--border));
		box-shadow: var(--ring), 0 0 30px rgba(139, 92, 246, 0.28);
	}

	.wrap {
		width: 100%;
		display: grid;
		gap: 14px;
		align-content: start;
	}

	.card {
		position: relative;
		overflow: hidden;
		border-radius: var(--radius-xl);
		padding: 18px;
		background: var(--surface-strong);
		border: 1px solid var(--border-strong);
		box-shadow: var(--shadow-1);
		backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-sat))
			brightness(var(--glass-bright));
	}

	.card::before {
		content: '';
		position: absolute;
		inset: -40% -20% auto -20%;
		height: 60%;
		background: radial-gradient(800px 260px at 30% 0%, rgba(255, 255, 255, 0.12), transparent 70%);
		opacity: 0.45;
		pointer-events: none;
	}

	.card-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 10px;
	}

	.title {
		margin: 0;
		display: inline-flex;
		align-items: center;
		gap: 10px;
		font-family: var(--font-head);
		font-size: 1.05rem;
		letter-spacing: -0.01em;
	}

	.hint {
		color: var(--muted);
		font-size: 0.85rem;
	}

	/* Samantha note */
	.love {
		display: grid;
		grid-template-columns: 40px 1fr;
		gap: 12px;
		align-items: start;
		background: radial-gradient(900px 260px at 0% 0%, rgba(139, 92, 246, 0.14), transparent 60%),
			var(--surface-strong);
	}

	.love-ic {
		width: 40px;
		height: 40px;
		display: grid;
		place-items: center;
		border-radius: 14px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.05);
		box-shadow: var(--ring);
	}

	.love-title {
		font-weight: 850;
		letter-spacing: -0.01em;
		margin-bottom: 6px;
	}

	.love-text {
		margin: 0;
		color: color-mix(in srgb, var(--text) 90%, transparent);
		line-height: 1.6;
	}

	@media (prefers-reduced-transparency: reduce) {
		.card,
		.top {
			backdrop-filter: none;
		}
	}
</style>					<span aria-hidden="true">·</span>
					<a href="/en" class:active={lang === 'en'}>EN</a>
				</nav>

				<a class="cta" href={mailto(me.email)} rel="noopener">
					<Icon icon="lucide:mail" width="16" />
					<span class="hide-sm">{t('Sazināties', 'Contact')}</span>
				</a>
			</div>
		</div>
	</header>

	<main class="layout">
		<!-- LEFT: Hero + quick modules -->
		<section class="hero card" aria-labelledby="hero-heading">
			<div class="hero-shell">
				<div class="hero-top">
					<div class="identity">
						<img
							class="avatar"
							src={Avatar}
							alt={lang === 'lv'
								? 'Portrets: Edgars Cīrulis, frontend inženieris no Latvijas'
								: 'Portrait of Edgars Cīrulis, frontend engineer from Latvia'}
							width="88"
							height="88"
							loading="eager"
						/>

						<div class="id-text">
							<div class="eyebrow">
								{t('Frontend inženieris un IT speciālists', 'Frontend engineer & IT specialist')}
							</div>

							<h1 id="hero-heading" class="name">{me.name}</h1>

							<div class="visually-hidden" aria-hidden="true">
								Edgars Cīrulis, Edgars Cirulis — datoru remonts, IT speciālists, frontend
								inženieris, SvelteKit, veiktspējas optimizācija.
							</div>

							<p class="title">
								{me.title} <span class="dot" aria-hidden="true">·</span>
								<span class="muted">{me.location} 🇱🇻</span>
							</p>
						</div>
					</div>

					<div class="hero-cta">
						<a class="btn primary" href={mailto(me.email)} rel="noopener">
							<Icon icon="lucide:mail" width="18" />
							<span>{t('Uzraksti', 'Email me')}</span>
						</a>

						{#if me.links.length}
							<nav class="links" aria-label={t('Sociālie profili', 'Social links')}>
								{#each me.links as l (l.href)}
									<a
										class="chip"
										href={l.href}
										rel="me external noopener noreferrer"
										target="_blank"
									>
										<Icon icon={l.icon} width="18" />
										<span class="hide-xs">{l.label}</span>
									</a>
								{/each}
							</nav>
						{/if}
					</div>
				</div>

				<!-- stats row -->
				<div class="stats" aria-label={t('Ātrie akcenti', 'Quick highlights')}>
					{#each stats as s (s.k)}
						<div class="stat">
							<div class="stat-ic" aria-hidden="true">
								<Icon icon={s.icon} width="16" />
							</div>
							<div class="stat-txt">
								<div class="stat-k muted">{s.k}</div>
								<div class="stat-v">{s.v}</div>
							</div>
						</div>
					{/each}
				</div>

				<!-- now playing -->
				<div class="module">
					<div class="module-head">
						<div class="module-title">
							<Icon icon="lucide:audio-lines" width="16" aria-hidden="true" />
							<span>{t('Šobrīd skan', 'Now playing')}</span>
						</div>
						<span class="module-hint muted"
							>{t('Ja ir ieslēgts Spotify.', 'If Spotify is active.')}</span
						>
					</div>

					{#await nowPlayingModule then mod}
						<svelte:component this={mod.default} spotify={data.spotify} />
					{/await}
				</div>
			</div>
		</section>

		<!-- RIGHT: Content stack -->
		<div class="stack">
			<section class="card section" id="services" aria-labelledby="services-heading">
				<header class="section-head">
					<div class="head-left">
						<div class="badge">
							<Icon icon="lucide:sparkles" width="14" />
							<span>{t('Pakalpojumi', 'Services')}</span>
						</div>
						<h2 id="services-heading">
							{t('Ko varu izdarīt ātri un kvalitatīvi', 'What I can ship fast')}
						</h2>
						<p class="sub muted">
							{t(
								'Praktisks IT atbalsts un frontendi, kurus tiešām var lietot.',
								'Hands-on IT help and frontends you can actually use.'
							)}
						</p>
					</div>
				</header>

				{#if me.services?.length}
					<div class="tiles">
						{#each me.services as s (s.name)}
							<article class="tile">
								<div class="tile-ic" aria-hidden="true">
									<Icon icon={s.icon} width="18" />
								</div>
								<div class="tile-bd">
									<h3>{s.name}</h3>
									<p class="muted">{s.blurb}</p>
									{#if s.highlight}
										<p class="hl">{s.highlight}</p>
									{/if}
								</div>
							</article>
						{/each}
					</div>
				{:else}
					<p class="muted">
						{t(
							'Datoru remonts, optimizācija, IT atbalsts un frontend izstrāde.',
							'PC repair, optimisation, IT support and frontend development.'
						)}
					</p>
				{/if}
			</section>

			<section class="card section" id="about" aria-labelledby="about-heading">
				<header class="section-head">
					<div class="head-left">
						<div class="badge">
							<Icon icon="lucide:user" width="14" />
							<span>{t('Par mani', 'About')}</span>
						</div>
						<h2 id="about-heading">
							{t('Skaidri, mierīgi, bez lieka trokšņa', 'Clear, calm, no fluff')}
						</h2>
						<p class="sub muted">{t('Kas es esmu un kā strādāju.', 'Who I am and how I work.')}</p>
					</div>
				</header>

				<p class="lead">{me.bio}</p>

				{#if me.skills.length}
					<ul class="chips" aria-label={t('Prasmes', 'Skills')}>
						{#each me.skills as s (s)}
							<li class="chip2">{s}</li>
						{/each}
					</ul>
				{/if}
			</section>

			<section class="card section" id="life" aria-labelledby="life-heading">
				<header class="section-head">
					<div class="head-left">
						<div class="badge">
							<Icon icon="lucide:heart" width="14" />
							<span>{t('Ikdiena', 'Life')}</span>
						</div>
						<h2 id="life-heading">{t('Ārpus koda', 'Outside of code')}</h2>
						<p class="sub muted">{t('Ko daru ārpus koda.', 'What I’m doing outside of code.')}</p>
					</div>
				</header>

				<div class="tiles life">
					{#each me.life as item (item.title)}
						<div class="tile mini">
							<div class="tile-ic" aria-hidden="true">
								<Icon icon={item.icon} width="18" />
							</div>
							<div class="tile-bd">
								<div class="mini-title">{item.title}</div>
								<div class="muted">{item.text}</div>
							</div>
						</div>
					{/each}
				</div>
			</section>

			<section class="card section" id="now" aria-labelledby="now-heading">
				<header class="section-head">
					<div class="head-left">
						<div class="badge">
							<Icon icon="lucide:focus" width="14" />
							<span>{t('Tagad', 'Now')}</span>
						</div>
						<h2 id="now-heading">{t('Šobrīd fokusā', 'Currently focusing')}</h2>
						<p class="sub muted">
							{t('Kam šobrīd pievēršu uzmanību.', 'What I’m focusing on at this moment.')}
						</p>
					</div>
				</header>

				{#if nowItems.length}
					<ul class="list">
						{#each nowItems as item (item)}
							<li>
								<Icon icon="lucide:check" width="16" aria-hidden="true" />
								<span>{item}</span>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="muted">
						{t(
							'Atpūšos, uzpildu baterijas un plānoju nākamos soļus.',
							'Resting, recharging, and planning what’s next.'
						)}
					</p>
				{/if}
			</section>

			<section class="card section" id="projects" aria-labelledby="projects-heading">
				<header class="section-head">
					<div class="head-left">
						<div class="badge">
							<Icon icon="lucide:folder" width="14" />
							<span>{t('Projekti', 'Projects')}</span>
						</div>
						<h2 id="projects-heading">{t('Būvēts un palaists', 'Built & shipped')}</h2>
						<p class="sub muted">
							{t('Lietas, ko esmu uzbūvējis.', 'Things I’ve built and shipped.')}
						</p>
					</div>
				</header>

				{#if me.projects.length}
					<div class="projects">
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
					<p class="muted">{t('Šobrīd nav publisku projektu.', 'No public projects right now.')}</p>
				{/if}
			</section>

			<section class="card section" id="experience" aria-labelledby="experience-heading">
				<header class="section-head">
					<div class="head-left">
						<div class="badge">
							<Icon icon="lucide:briefcase" width="14" />
							<span>{t('Pieredze', 'Experience')}</span>
						</div>
						<h2 id="experience-heading">{t('Kur esmu bijis', 'Where I’ve been')}</h2>
						<p class="sub muted">
							{t('Kur esmu strādājis un ko darījis.', 'Where I’ve worked and what I’ve done.')}
						</p>
					</div>
				</header>

				{#if me.experience.length}
					<ul class="timeline">
						{#each me.experience as e (e.role)}
							<li class="tl-item">
								<div class="tl-dot" aria-hidden="true"></div>
								<div class="tl-card">
									<div class="tl-top">
										<div class="tl-title">
											<strong>{e.role}</strong>
											<span class="muted">· {e.company}</span>
										</div>
										<div class="tl-years muted">{e.years}</div>
									</div>

									<ul class="bullets">
										{#each e.bullets as b (b)}
											<li>{b}</li>
										{/each}
									</ul>
								</div>
							</li>
						{/each}
					</ul>
				{:else}
					<p class="muted">
						{t(
							'Atvērts jaunām iespējām. CV pieejams pēc pieprasījuma.',
							'Open to opportunities. CV available on request.'
						)}
					</p>
				{/if}
			</section>

			<footer class="foot card" aria-label={t('Kājene', 'Footer')}>
				<div class="foot-inner">
					<div class="foot-left">
						<div class="foot-title">{t('Ātrs kontakts', 'Quick contact')}</div>
						<a class="foot-link" href={mailto(me.email)} rel="noopener">
							<Icon icon="lucide:mail" width="16" />
							<span>{me.email}</span>
						</a>
					</div>

					<div class="foot-right muted">
						<span>© {new Date().getFullYear()} {me.name}</span>
						<span class="sep" aria-hidden="true">·</span>
						<a class="foot-mini" href="#top">{t('Uz augšu', 'Back to top')}</a>
					</div>
				</div>
			</footer>
		</div>
	</main>
</div>

<style>
	:global(section[id]) {
		scroll-margin-top: 96px;
	}

	.page {
		position: relative;
		min-height: 100vh;
		padding: 0;
	}

	/* Topbar */
	.topbar {
		position: sticky;
		top: 10px;
		z-index: 50;
		margin: 0 auto 14px;
		max-width: 100%;
	}

	.topbar-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 10px 12px;
		border-radius: 999px;
		background: color-mix(in srgb, var(--surface) 85%, rgba(0, 0, 0, 0.1));
		border: 1px solid var(--border);
		box-shadow:
			var(--ring),
			0 16px 50px rgba(0, 0, 0, 0.35);
		backdrop-filter: blur(14px) saturate(140%);
	}

	.brand {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		text-decoration: none;
		color: var(--text);
		min-width: 170px;
	}

	.brand-mark {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: radial-gradient(circle at 30% 30%, var(--tint), rgba(34, 211, 238, 0.9));
		box-shadow:
			0 0 0 4px rgba(255, 255, 255, 0.06),
			0 0 26px rgba(139, 92, 246, 0.45);
	}

	.brand-text {
		font-weight: 750;
		letter-spacing: -0.01em;
		font-size: 0.95rem;
	}

	.topnav {
		display: flex;
		align-items: center;
		gap: 6px;
		overflow: auto;
		scrollbar-width: none;
	}

	.topnav::-webkit-scrollbar {
		display: none;
	}

	.topnav-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 10px;
		border-radius: 999px;
		border: 1px solid transparent;
		color: color-mix(in srgb, var(--text) 78%, transparent);
		text-decoration: none;
		background: rgba(255, 255, 255, 0.02);
		transition:
			transform 0.14s cubic-bezier(0.2, 0.8, 0.2, 1),
			border-color 0.14s ease,
			background 0.14s ease;
		white-space: nowrap;
	}

	.topnav-link:hover {
		transform: translateY(-1px);
		border-color: var(--border);
		background: rgba(255, 255, 255, 0.04);
	}

	.topbar-right {
		display: inline-flex;
		align-items: center;
		gap: 10px;
	}

	.lang {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 7px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.03);
	}

	.lang a {
		color: var(--muted);
		text-decoration: none;
		opacity: 0.85;
		transition:
			opacity 0.12s ease,
			color 0.12s ease;
		font-size: 0.85rem;
	}

	.lang a.active {
		opacity: 1;
		color: var(--text);
		font-weight: 750;
	}

	.cta {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		border-radius: 999px;
		text-decoration: none;
		color: var(--text);
		border: 1px solid color-mix(in srgb, var(--tint) 38%, var(--border));
		background:
			radial-gradient(120% 140% at 0% 0%, rgba(139, 92, 246, 0.18), transparent 55%),
			rgba(255, 255, 255, 0.03);
		box-shadow: var(--ring);
		transition:
			transform 0.14s cubic-bezier(0.2, 0.8, 0.2, 1),
			border-color 0.14s ease,
			box-shadow 0.14s ease;
	}

	.cta:hover {
		transform: translateY(-1px);
		border-color: color-mix(in srgb, var(--tint) 55%, var(--border));
		box-shadow:
			var(--ring),
			0 0 30px rgba(139, 92, 246, 0.28);
	}

	/* Layout */
	.layout {
		max-width: 1120px;
		margin: 0 auto;
		display: grid;
		gap: 14px;
	}

	.stack {
		display: grid;
		gap: 14px;
	}

	/* Cards */
	.card {
		position: relative;
		overflow: hidden;
		border-radius: var(--radius-xl);
		padding: var(--pad);

		/* key change: stronger background */
		background: var(--surface-strong);
		border: 1px solid var(--border-strong);

		box-shadow: var(--shadow-1);
		backdrop-filter: blur(var(--glass-blur)) saturate(var(--glass-sat))
			brightness(var(--glass-bright));
		transition:
			transform 0.18s cubic-bezier(0.2, 0.8, 0.2, 1),
			border-color 0.18s ease,
			box-shadow 0.18s ease;
	}

	.card::before {
		content: '';
		position: absolute;
		inset: -40% -20% auto -20%;
		height: 60%;
		background: radial-gradient(800px 260px at 30% 0%, rgba(255, 255, 255, 0.12), transparent 70%);
		opacity: 0.5;
		pointer-events: none;
	}

	.card:hover {
		transform: translateY(-2px);
		border-color: var(--border-strong);
		box-shadow: var(--ring), var(--shadow-2);
	}

	/* Typography */
	h1,
	h2,
	h3 {
		margin: 0;
		font-family: var(--font-head);
	}

	h2 {
		font-size: 1.05rem;
		letter-spacing: -0.01em;
	}

	h3 {
		font-size: 1rem;
	}

	p {
		margin: 0;
	}

	.muted {
		color: var(--muted);
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

	/* Hero */
	.hero {
		padding: 0;
	}

	.hero-shell {
		padding: 18px;
		display: grid;
		gap: 14px;
	}

	.hero-top {
		display: grid;
		gap: 14px;
	}

	.identity {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.avatar {
		width: 88px;
		height: 88px;
		border-radius: 26px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.04);
		object-fit: cover;
		box-shadow:
			var(--ring),
			0 18px 45px rgba(0, 0, 0, 0.45),
			0 0 0 1px color-mix(in srgb, var(--tint) 25%, transparent);
	}

	.eyebrow {
		font-size: 0.74rem;
		text-transform: uppercase;
		letter-spacing: 0.18em;
		color: var(--muted);
		margin-bottom: 6px;
	}

	.name {
		font-size: 2.05rem;
		font-weight: 850;
		letter-spacing: -0.02em;
		background: linear-gradient(
			180deg,
			var(--text),
			color-mix(in srgb, var(--tint) 35%, var(--text))
		);
		-webkit-background-clip: text;
		background-clip: text;
		color: transparent;
	}

	.title {
		margin-top: 6px;
		color: color-mix(in srgb, var(--text) 82%, transparent);
	}

	.dot {
		padding: 0 8px;
		opacity: 0.65;
	}

	.hero-cta {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 10px;
		flex-wrap: wrap;
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 10px 14px;
		border-radius: 999px;
		text-decoration: none;
		color: var(--text);
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.03);
		box-shadow: var(--ring);
		transition:
			transform 0.14s cubic-bezier(0.2, 0.8, 0.2, 1),
			border-color 0.14s ease,
			background 0.14s ease,
			box-shadow 0.14s ease;
		white-space: nowrap;
	}

	.btn:hover {
		transform: translateY(-1px);
		border-color: var(--border-strong);
		background: rgba(255, 255, 255, 0.05);
	}

	.btn.primary {
		border-color: color-mix(in srgb, var(--tint) 45%, var(--border));
		background:
			radial-gradient(140% 180% at 0% 0%, rgba(139, 92, 246, 0.22), transparent 55%),
			rgba(255, 255, 255, 0.03);
	}

	.btn.primary:hover {
		box-shadow:
			var(--ring),
			0 0 30px rgba(139, 92, 246, 0.35);
		border-color: color-mix(in srgb, var(--tint) 60%, var(--border));
	}

	.links {
		display: inline-flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.chip {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 9px 12px;
		border-radius: 999px;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border);
		text-decoration: none;
		color: var(--text);
		transition:
			transform 0.14s cubic-bezier(0.2, 0.8, 0.2, 1),
			border-color 0.14s ease,
			background 0.14s ease;
	}

	.chip:hover {
		transform: translateY(-1px);
		border-color: var(--border-strong);
		background: rgba(255, 255, 255, 0.05);
	}

	/* Stats */
	.stats {
		display: grid;
		grid-template-columns: 1fr;
		gap: 10px;
		padding: 12px;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.02);
	}

	.stat {
		display: flex;
		align-items: center;
		gap: 10px;
	}

	.stat-ic {
		width: 34px;
		height: 34px;
		display: grid;
		place-items: center;
		border-radius: 12px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.04);
		box-shadow: var(--ring);
	}

	.stat-k {
		font-size: 0.78rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.stat-v {
		font-weight: 700;
		color: color-mix(in srgb, var(--text) 92%, transparent);
	}

	/* Module */
	.module {
		padding: 12px;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.02);
	}

	.module-head {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 10px;
	}

	.module-title {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		font-weight: 750;
	}

	.module-hint {
		font-size: 0.82rem;
	}

	/* Sections */
	.section-head {
		display: flex;
		align-items: flex-end;
		justify-content: space-between;
		gap: 12px;
		margin-bottom: 12px;
		padding-bottom: 10px;
		border-bottom: 1px solid var(--border);
	}

	.badge {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 6px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.03);
		color: color-mix(in srgb, var(--text) 88%, transparent);
		font-size: 0.84rem;
		width: fit-content;
		margin-bottom: 10px;
	}

	.sub {
		margin-top: 8px;
		max-width: 60ch;
	}

	.lead {
		font-size: 1.02rem;
		line-height: 1.6;
		color: color-mix(in srgb, var(--text) 92%, transparent);
	}

	/* Tiles */
	.tiles {
		display: grid;
		grid-template-columns: 1fr;
		gap: 12px;
	}

	.tile {
		display: grid;
		grid-template-columns: 40px 1fr;
		gap: 12px;
		align-items: start;
		padding: 14px;
		border-radius: var(--radius-lg);
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid var(--border);
		transition:
			transform 0.16s cubic-bezier(0.2, 0.8, 0.2, 1),
			border-color 0.16s ease,
			background 0.16s ease;
	}

	.tile:hover {
		transform: translateY(-1px);
		border-color: var(--border-strong);
		background: rgba(255, 255, 255, 0.04);
	}

	.tile-ic {
		width: 40px;
		height: 40px;
		display: grid;
		place-items: center;
		border-radius: 14px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.05);
		box-shadow: var(--ring);
		line-height: 0;
	}

	.hl {
		margin-top: 8px;
		padding: 10px 12px;
		border-radius: 14px;
		border: 1px solid color-mix(in srgb, var(--tint) 28%, var(--border));
		background:
			radial-gradient(140% 160% at 0% 0%, rgba(139, 92, 246, 0.14), transparent 60%),
			rgba(255, 255, 255, 0.02);
		color: color-mix(in srgb, var(--text) 92%, transparent);
	}

	.tile.mini {
		grid-template-columns: 40px 1fr;
	}

	.mini-title {
		font-weight: 750;
		margin-bottom: 4px;
	}

	/* Skills chips */
	.chips {
		list-style: none;
		padding: 0;
		margin: 14px 0 0;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
	}

	.chip2 {
		padding: 7px 12px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.03);
		color: color-mix(in srgb, var(--text) 88%, transparent);
		font-size: 0.92rem;
	}

	/* Now list */
	.list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 10px;
	}

	.list li {
		display: grid;
		grid-template-columns: 18px 1fr;
		gap: 10px;
		align-items: start;
		padding: 12px 12px;
		border-radius: 16px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.02);
	}

	/* Projects */
	.projects {
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
		box-shadow:
			var(--ring),
			0 18px 60px rgba(0, 0, 0, 0.35);
		background:
			radial-gradient(700px 220px at 0% 0%, rgba(139, 92, 246, 0.14), transparent 65%),
			rgba(255, 255, 255, 0.03);
	}

	.row {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
	}

	/* Timeline */
	.timeline {
		list-style: none;
		padding: 0;
		margin: 0;
		display: grid;
		gap: 14px;
		position: relative;
	}

	.timeline::before {
		content: '';
		position: absolute;
		left: 10px;
		top: 8px;
		bottom: 8px;
		width: 2px;
		border-radius: 2px;
		background: linear-gradient(
			180deg,
			color-mix(in srgb, var(--tint) 55%, transparent),
			transparent 70%
		);
		opacity: 0.9;
	}

	.tl-item {
		position: relative;
		padding-left: 28px;
	}

	.tl-dot {
		position: absolute;
		left: 4px;
		top: 18px;
		width: 14px;
		height: 14px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--tint) 85%, transparent);
		box-shadow:
			0 0 0 4px color-mix(in srgb, rgba(0, 0, 0, 0.25) 40%, transparent),
			0 0 24px rgba(139, 92, 246, 0.25);
	}

	.tl-card {
		padding: 14px;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.03);
	}

	.tl-top {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: 12px;
	}

	.tl-years {
		font-size: 0.9rem;
		white-space: nowrap;
	}

	.bullets {
		margin: 10px 0 0;
		padding-left: 18px;
		color: color-mix(in srgb, var(--text) 86%, transparent);
		display: grid;
		gap: 6px;
	}

	/* Footer */
	.foot {
		padding: 14px;
	}

	.foot-inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		flex-wrap: wrap;
	}

	.foot-title {
		font-weight: 800;
		margin-bottom: 6px;
	}

	.foot-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		text-decoration: none;
		color: var(--text);
		padding: 8px 10px;
		border-radius: 999px;
		border: 1px solid var(--border);
		background: rgba(255, 255, 255, 0.03);
	}

	.foot-right {
		display: inline-flex;
		align-items: center;
		gap: 8px;
	}

	.foot-mini {
		color: var(--muted);
		text-decoration: none;
	}

	.sep {
		opacity: 0.5;
	}

	/* Responsive */
	@media (min-width: 900px) {
		.layout {
			grid-template-columns: 420px 1fr;
			align-items: start;
		}

		.hero {
			position: sticky;
			top: 86px;
			align-self: start;
		}

		.hero-top {
			gap: 16px;
		}

		.stats {
			grid-template-columns: 1fr;
		}

		.tiles {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.tiles.life {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.projects {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 720px) {
		.topnav {
			display: none;
		}
		.brand {
			min-width: auto;
		}
		.name {
			font-size: 1.85rem;
		}
	}

	@media (max-width: 460px) {
		.hide-sm {
			display: none;
		}
		.hide-xs {
			display: none;
		}
		.avatar {
			width: 78px;
			height: 78px;
		}
		.hero-shell {
			padding: 16px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.card,
		.topnav-link,
		.btn,
		.chip,
		.project,
		.cta,
		.tile {
			transition: none !important;
		}
		.card:hover,
		.project:hover,
		.tile:hover,
		.btn:hover,
		.chip:hover,
		.cta:hover {
			transform: none !important;
		}
	}

	@media (prefers-reduced-transparency: reduce) {
		.card,
		.topbar-inner {
			backdrop-filter: none;
		}
	}
</style>
