<script lang="ts">
  import { formatTalkDate, talkKindLabels, talkPath, type Talk } from '$lib/data/talks';

  /** The talks of a paper, each with its title slide and a link to its page. */
  const { talks }: { talks: Talk[] } = $props();
</script>

<div class="rows">
  {#each talks as talk (talk.slug)}
    <a class="row" href={talkPath(talk)}>
      <img
        src={talk.preview}
        alt="Title slide of {talk.title}"
        width="1200"
        height="675"
        loading="lazy"
      />
      <span class="body">
        <span class="title">{talk.title}</span>
        <span class="meta">
          {talkKindLabels[talk.kind]} &middot; {talk.event}{#if talk.location}, {talk.location}{/if}
          &middot; {formatTalkDate(talk)}
        </span>
      </span>
    </a>
  {/each}
</div>

<style>
  .rows {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .row {
    display: grid;
    grid-template-columns: 160px minmax(0, 1fr);
    gap: 16px;
    align-items: center;
    padding: 10px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-base);
    text-decoration: none;
    transition: border-color var(--transition-fast);

    &:hover {
      border-color: var(--color-accent);

      .title {
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }
  }

  img {
    display: block;
    width: 100%;
    height: auto;
    border: 1px solid var(--color-border);
    border-radius: 4px;
  }

  .body {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .title {
    font-size: var(--text-sm);
    font-weight: 600;
    line-height: 1.4;
    color: var(--color-accent);
  }

  .meta {
    font-size: var(--text-xs);
    color: var(--color-muted);
  }

  /* Beside the text a title slide is too small to read on a phone, so it goes on top. */
  @media (max-width: 768px) {
    .rows {
      gap: 12px;
    }

    .row {
      grid-template-columns: 1fr;
      gap: 12px;
      padding: 12px 12px 14px;
    }

    .body {
      padding: 0 4px;
    }
  }
</style>
