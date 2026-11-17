<script lang="ts">
  import LinkIcon from '$lib/components/LinkIcon.svelte';
  import { paperListLinks } from '$lib/page-links';
  import type { Publication } from '$lib/data/publications';

  /** A publication's links on one line, for the lists of publications. */
  const { pub }: { pub: Publication } = $props();
  const links = $derived(paperListLinks(pub));
</script>

{#if links.length}
  <div class="links">
    {#each links as link (link.href)}
      <a href={link.href}><LinkIcon kind={link.kind} />{link.label}</a>
    {/each}
  </div>
{/if}

<style>
  .links {
    display: flex;
    flex-wrap: wrap;
    gap: 8px 20px;
    margin-top: 12px;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-accent);

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }
</style>
