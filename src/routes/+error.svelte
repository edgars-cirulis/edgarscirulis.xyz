<script lang="ts">
	export let error;
	export let status;
</script>

<section class="card" role="alert">
	<h2>{status}</h2>

	<p class="muted">
		{error?.message || 'Something went wrong.'}
	</p>

	<a class="btn" href="/">Back home</a>
</section>

<style>
	.card {
		background: var(--surface);
		border: 1px solid var(--border);
		border-radius: var(--radius);
		padding: var(--pad);
	}

	.btn {
		display: inline-flex;
		margin-top: 12px;
		background: var(--surface-2);
		border: 1px solid var(--border);
		padding: 10px 12px;
		border-radius: 10px;
		text-decoration: none;
		color: var(--text);
	}

	.muted {
		color: var(--muted);
	}
</style>
