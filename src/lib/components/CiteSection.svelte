<script lang="ts">
  import { bibtexEntry } from '$lib/bibtex';
  import type { Publication } from '$lib/data/publications';

  const { pub }: { pub: Publication } = $props();

  const entry = $derived(bibtexEntry(pub));
  let copied = $state(false);

  async function copy() {
    await navigator.clipboard.writeText(entry);
    copied = true;
    setTimeout(() => (copied = false), 2000);
  }
</script>

<section class="section" id="cite">
  <div class="section-head">
    <span class="section-label">Cite</span>
  </div>
  <div class="cite-block">
    <div class="cite-head">
      <span class="cite-format">BibTeX</span>
      <button class="copy-btn" type="button" onclick={copy}>{copied ? 'Copied' : 'Copy'}</button>
    </div>
    <pre><code>{entry}</code></pre>
  </div>
</section>

<style>
  .section {
    padding: 40px 0;
    border-top: 1px solid var(--color-border);
    scroll-margin-top: 72px;
    transition: border-color var(--transition-base);
  }

  .section-head {
    margin-bottom: 16px;
  }

  .section-label {
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .cite-block {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-base);
  }

  .cite-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 10px 8px 20px;
    border-bottom: 1px solid var(--color-border);
  }

  .cite-format {
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-muted);
  }

  .copy-btn {
    padding: 4px 14px;
    border-radius: var(--radius-base);
    border: 1px solid var(--color-border);
    background: var(--color-surface);
    color: var(--color-accent);
    font: inherit;
    font-size: var(--text-xs);
    font-weight: 600;
    cursor: pointer;
    transition: all var(--transition-fast);

    &:hover {
      border-color: var(--color-accent);
      background: var(--color-accent-dim);
    }
  }

  /* Long titles and author lists wrap, so that the whole entry shows without scrolling. */
  pre {
    margin: 0;
    padding: 16px 20px;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--color-text);
  }

  /* The entry is the block's content, so it loses the tint and padding of inline code. */
  pre code {
    background: none;
    padding: 0;
    font-size: inherit;
  }

  @media (max-width: 768px) {
    .cite-head {
      padding-left: 16px;
    }

    pre {
      padding: 12px 16px;
      font-size: var(--text-xs);
    }
  }
</style>
