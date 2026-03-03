<script lang="ts">
  import { page } from '$app/state';
</script>

<svelte:head>
  <title>{page.status} — Johann Glock</title>
</svelte:head>

<div class="error">
  <h1>{page.status}</h1>
  <p>{page.error?.message ?? 'Something went wrong.'}</p>
  <a href="/">Go home</a>
</div>

<style>
  .error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
    gap: 16px;
    text-align: center;
  }

  h1 {
    font-size: var(--text-4xl);
    font-weight: 700;
    color: var(--color-text);
  }

  p {
    color: var(--color-muted);
  }

  a {
    color: var(--color-accent);
    font-size: var(--text-sm);
  }
</style>
