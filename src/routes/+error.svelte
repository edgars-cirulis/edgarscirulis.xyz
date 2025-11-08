<script lang="ts">
	export let error;
	export let status;
</script>

<section class="card" role="alert" aria-labelledby="error-heading">
	<div class="badge">Error {status}</div>

	<h2 id="error-heading">Something went wrong</h2>

	<p class="muted">
		{error?.message || 'The page you’re looking for isn’t available right now.'}
	</p>

	<a class="btn" href="/">Back home</a>
</section>

<style>
	.card {
		margin-inline: auto;
		margin-top: 20vh;
		max-width: 420px;
		background:
			linear-gradient(180deg, color-mix(in srgb, var(--surface) 96%, transparent), var(--surface)),
			radial-gradient(
				140% 140% at 10% -20%,
				color-mix(in srgb, var(--tint) 12%, transparent),
				transparent 60%
			);
		border: 1px solid color-mix(in srgb, var(--border) 92%, transparent);
		border-radius: var(--radius);
		padding: var(--pad);
		box-shadow:
			0 1px 0 rgba(255, 255, 255, 0.02) inset,
			0 18px 40px rgba(0, 0, 0, 0.3);
		text-align: left;
	}

	h2 {
		font-size: 1.1rem;
		margin: 6px 0 4px;
	}

	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 4px 10px;
		border-radius: 999px;
		font-size: 0.78rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		background: color-mix(in srgb, var(--tint) 18%, var(--chip));
		border: 1px solid color-mix(in srgb, var(--tint) 35%, var(--border));
		color: color-mix(in srgb, #022c22 10%, var(--text));
	}

	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		margin-top: 16px;
		background: var(--ghost);
		border: 1px solid color-mix(in srgb, var(--border) 88%, transparent);
		padding: 10px 14px;
		border-radius: 999px;
		text-decoration: none;
		color: var(--text);
		font-size: 0.9rem;
		transition:
			transform 0.12s ease,
			border-color 0.12s ease,
			box-shadow 0.12s ease;
	}

	.btn:hover {
		transform: translateY(-1px);
		border-color: color-mix(in srgb, var(--tint) 25%, var(--border));
		box-shadow: 0 10px 22px rgba(0, 0, 0, 0.35);
	}

	.muted {
		color: var(--muted);
	}
</style>
