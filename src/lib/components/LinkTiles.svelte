<script lang="ts">
  import type { PageLink } from '$lib/page-links';

  /** `primary` is the page's main thing, such as the paper itself, and stands first. */
  const { primary, links }: { primary?: PageLink; links: PageLink[] } = $props();
</script>

{#if primary || links.length}
  <div class="tiles">
    {#if primary}
      <a class="tile primary" href={primary.href}>
        <span class="tile-label">{primary.label}</span>
        <span class="tile-where">{primary.where}</span>
      </a>
    {/if}
    {#each links as link (link.href)}
      <a class="tile" href={link.href}>
        <span class="tile-label">{link.label}</span>
        <span class="tile-where">{link.where}</span>
      </a>
    {/each}
  </div>
{/if}

<style>
  .tiles {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 8px;
  }

  .tile {
    display: flex;
    flex-direction: column;
    gap: 2px;
    padding: 10px 16px;
    border-radius: var(--radius-base);
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    text-decoration: none;
    transition: all var(--transition-fast);

    &:hover {
      border-color: var(--color-accent);
      background: var(--color-accent-dim);
    }
  }

  .tile-label {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-accent);
  }

  .tile-where {
    font-size: var(--text-xs);
    color: var(--color-muted);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .primary {
    background: var(--color-accent);
    border-color: var(--color-accent);

    .tile-label {
      color: oklch(100% 0 0);
    }

    .tile-where {
      color: oklch(100% 0 0 / 0.8);
    }

    &:hover {
      background: var(--color-accent-hover);
      border-color: var(--color-accent-hover);
    }
  }

  @media (max-width: 768px) {
    .tiles {
      grid-template-columns: 1fr;
    }
  }
</style>
