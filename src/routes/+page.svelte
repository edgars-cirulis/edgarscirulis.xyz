<script lang="ts">
	import Icon from '@iconify/svelte';
	import Avatar from '$lib/assets/58264013.jpg';
	import { me } from '$lib/me';
	import { mailto } from '$lib/utils';
	import NowPlaying from '$lib/components/NowPlaying.svelte';

	export let data: {
		spotify: {
			playing: boolean;
			title: string;
			artist: string;
			album: string;
			url: string;
			image: string;
		} | null;
	};
</script>

<section class="card hero">
	<img
		class="avatar"
		src={Avatar}
		alt="Edgars Cīrulis"
		width="60"
		height="60"
		fetchpriority="high"
		decoding="async"
		sizes="60px"
	/>

	<div class="who">
		<h1 class="name">{me.name}</h1>
		<p class="title">
			{me.title} · <span class="muted">{me.location} 🇱🇻</span>
		</p>
	</div>

	<div class="cta">
		{#if me.links.length}
			<nav class="links" aria-label="Elsewhere">
				{#each me.links as l (l.href)}
					<a class="chip-btn" href={l.href} rel="external noopener noreferrer" target="_blank">
						<Icon icon={l.icon} width="18" />
						<span class="hide-sm">{l.label}</span>
					</a>
				{/each}
			</nav>
		{/if}

		<a class="btn primary" href={mailto(me.email)} rel="external">
			<Icon icon="lucide:mail" width="18" />
			Contact
		</a>
	</div>

	<NowPlaying spotify={data.spotify} />
</section>

<section class="card section">
	<header class="section-head">
		<h2>About</h2>
	</header>

	<p class="lead">{me.bio}</p>

	<ul class="chips">
		{#each me.skills as s (s)}
			<li class="chip">{s}</li>
		{/each}
	</ul>
</section>

<section class="card section">
	<header class="section-head">
		<h2>Life</h2>
	</header>

	<div class="life">
		{#each me.life as item (item.title)}
			<div class="life-item">
				<div class="life-icon">
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

<section class="card section">
	<header class="section-head">
		<h2>Now</h2>
	</header>

	{#if me.now.filter(Boolean).length}
		<ul class="now">
			{#each me.now as item (item)}
				<li>{item}</li>
			{/each}
		</ul>
	{:else}
		<p class="muted">Resting, recharging, and planning what’s next.</p>
	{/if}
</section>

{#if me.projects.length}
	<section class="card section">
		<header class="section-head">
			<h2>Projects</h2>
		</header>

		<div class="grid">
			{#each me.projects as p (p.name)}
				<a class="project" href={p.href} rel="external noopener noreferrer" target="_blank">
					<div class="row">
						<h3>{p.name}</h3>
						<Icon icon="lucide:arrow-up-right" width="16" />
					</div>

					<p class="muted">{p.desc}</p>
				</a>
			{/each}
		</div>
	</section>
{:else}
	<section class="card section">
		<header class="section-head">
			<h2>Projects</h2>
		</header>

		<p class="muted">No public projects right now.</p>
	</section>
{/if}

{#if me.experience.length}
	<section class="card section">
		<header class="section-head">
			<h2>Experience</h2>
		</header>

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
	</section>
{:else}
	<section class="card section">
		<header class="section-head">
			<h2>Experience</h2>
		</header>

		<p class="muted">Open to opportunities. CV available on request.</p>
	</section>
{/if}

<style>
	.card {
		background:
			linear-gradient(180deg, color-mix(in srgb, var(--surface) 94%, transparent), var(--surface)),
			radial-gradient(
				120% 140% at 50% -20%,
				color-mix(in srgb, var(--text) 4%, transparent),
				transparent 60%
			);
		border: 1px solid color-mix(in srgb, var(--border) 92%, transparent);
		border-radius: 18px;
		padding: var(--pad);
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 0.02) inset,
			0 0 0 1px color-mix(in srgb, var(--text) 2%, transparent) inset,
			0 14px 28px rgba(0, 0, 0, 0.22),
			0 2px 6px rgba(0, 0, 0, 0.18);
	}

	.card + .card {
		margin-top: 16px;
	}

	h1,
	h2,
	h3 {
		margin: 0;
	}

	h2 {
		font-size: 0.92rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--text) 70%, var(--bg));
		font-weight: 700;
	}

	h3 {
		font-size: 1rem;
	}

	p {
		margin: 0;
	}

	.lead {
		color: color-mix(in srgb, var(--text) 86%, var(--bg));
	}

	.muted {
		color: color-mix(in srgb, var(--text) 56%, var(--bg));
	}

	.btn,
	.chip-btn {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 12px;
		border-radius: 12px;
		background: var(--ghost);
		color: var(--text);
		text-decoration: none;
		border: 1px solid color-mix(in srgb, var(--border) 88%, transparent);
		box-shadow: none;
		transition:
			transform 0.12s ease,
			border-color 0.12s ease,
			background 0.12s ease;
	}

	.btn:hover,
	.chip-btn:hover {
		transform: translateY(-1px);
		border-color: color-mix(in srgb, var(--text) 12%, var(--border));
	}

	.btn:active,
	.chip-btn:active {
		transform: translateY(0);
	}

	.btn.primary {
		background: var(--ghost);
		border-color: color-mix(in srgb, var(--text) 22%, var(--border));
	}

	.btn.primary:hover {
		border-color: color-mix(in srgb, var(--text) 34%, var(--border));
	}

	.btn:focus-visible,
	.chip-btn:focus-visible {
		outline: 2px solid color-mix(in srgb, #86e7c2 58%, white);
		outline-offset: 2px;
		border-radius: 12px;
	}

	.hero {
		display: grid;
		grid-template-columns: auto 1fr;
		gap: 12px;
		align-items: center;
	}

	.avatar {
		width: 60px;
		height: 60px;
		border-radius: 18px;
		border: 1px solid var(--border);
		background: var(--icon-surface);
		object-fit: cover;
		box-shadow:
			0 0 0 1px color-mix(in srgb, var(--text) 5%, transparent) inset,
			0 2px 8px rgba(0, 0, 0, 0.08);
	}

	.name {
		font-size: 1.38rem;
		font-weight: 780;
		letter-spacing: 0.2px;
	}

	.title {
		color: color-mix(in srgb, var(--text) 68%, var(--bg));
	}

	.cta {
		grid-column: 1 / -1;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		column-gap: 10px;
		row-gap: 8px;
		margin-top: 8px;
	}

	.links {
		display: inline-flex;
		gap: 8px;
	}

	.section .section-head {
		display: flex;
		align-items: center;
		gap: 10px;
		margin-bottom: 12px;
	}

	.section .section-head::after {
		content: '';
		height: 1px;
		flex: 1;
		background: linear-gradient(
			90deg,
			color-mix(in srgb, var(--text) 10%, var(--bg)),
			transparent 70%
		);
	}

	.chips {
		list-style: none;
		padding: 0;
		margin: 12px 0 0;
		display: flex;
		gap: 8px;
		flex-wrap: wrap;
	}

	.chip {
		padding: 5px 10px;
		border-radius: 999px;
		background: linear-gradient(
			180deg,
			var(--chip),
			color-mix(in srgb, var(--chip) 92%, transparent)
		);
		border: 1px solid color-mix(in srgb, var(--border) 88%, transparent);
		color: color-mix(in srgb, var(--text) 90%, var(--bg));
		font-size: 0.92rem;
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
		background: linear-gradient(
			180deg,
			var(--elev),
			color-mix(in srgb, var(--elev) 92%, transparent)
		);
		border: 1px solid color-mix(in srgb, var(--border) 88%, transparent);
	}

	.life-icon {
		display: grid;
		place-items: center;
		width: 28px;
		height: 28px;
		border-radius: 8px;
		background: var(--icon-surface);
		border: 1px solid var(--border);
	}

	.life-title {
		font-weight: 650;
	}

	.life-text {
		margin-top: 2px;
	}

	.now {
		margin: 0;
		padding-left: 18px;
		color: color-mix(in srgb, var(--text) 78%, var(--bg));
		display: grid;
		gap: 6px;
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
		background: var(--elev);
		border: 1px solid color-mix(in srgb, var(--border) 86%, transparent);
		border-radius: 12px;
		text-decoration: none;
		color: inherit;
		transition:
			transform 0.15s ease,
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.project::after {
		content: '';
		position: absolute;
		inset: 0;
		border-radius: 12px;
		border: 1px solid transparent;
		background: linear-gradient(
				120deg,
				color-mix(in srgb, var(--text) 8%, transparent),
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
		transition: opacity 0.15s ease;
	}

	.project:hover {
		transform: translateY(-2px);
		border-color: color-mix(in srgb, var(--text) 16%, var(--border));
		box-shadow: 0 12px 28px rgba(0, 0, 0, 0.26);
	}

	.project:hover::after {
		opacity: 0.9;
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
		padding-left: 8px;
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
			color-mix(in srgb, var(--text) 10%, transparent),
			transparent 70%
		);
	}

	.role {
		position: relative;
		padding: 12px;
		border-radius: 12px;
		background: linear-gradient(
			180deg,
			var(--elev),
			color-mix(in srgb, var(--elev) 92%, transparent)
		);
		border: 1px solid color-mix(in srgb, var(--border) 86%, transparent);
	}

	.role::before {
		content: '';
		position: absolute;
		left: -3px;
		top: 20px;
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: color-mix(in srgb, var(--text) 70%, var(--bg));
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--bg) 70%, transparent);
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
		margin: 6px 0 0 18px;
		color: color-mix(in srgb, var(--text) 78%, var(--bg));
	}

	@media (min-width: 760px) {
		.grid {
			grid-template-columns: repeat(3, 1fr);
		}

		.life {
			grid-template-columns: repeat(2, 1fr);
		}

		.name {
			font-size: 1.44rem;
		}

		.card {
			border-radius: 20px;
		}
	}

	@media (max-width: 420px) {
		.cta {
			flex-direction: column;
			align-items: stretch;
		}

		.links {
			width: 100%;
		}

		.chip-btn {
			justify-content: center;
		}

		.hide-sm {
			display: none;
		}
	}
</style>
