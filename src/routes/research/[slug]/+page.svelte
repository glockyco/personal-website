<script lang="ts">
  const { data } = $props();
  const pub = $derived(data.pub);
</script>

<svelte:head>
  <title>{pub.title} — Johann Glock</title>
</svelte:head>

<div class="page-header" id="top">
  <a class="back-link" href="/research/">&larr; Research</a>

  <div class="pub-badges">
    {#if pub.status === 'under-review'}
      <span class="badge badge-review">Under Review</span>
    {:else}
      <span class="badge badge-accent">{pub.venueShort}</span>
      <span class="badge badge-year">{pub.year}</span>
    {/if}
  </div>

  <h1>{pub.title}</h1>

  <div class="pub-authors">
    {#each pub.authors as author, i (author.name)}
      {#if i > 0}<span class="sep">, </span>{/if}
      {#if author.isMe}
        <span class="me">{author.name}</span>
      {:else if author.url}
        <a href={author.url}>{author.name}</a>
      {:else}
        <span>{author.name}</span>
      {/if}
    {/each}
  </div>

  <p class="pub-venue">
    {#if pub.status === 'under-review' && pub.arxivId}
      arXiv:{pub.arxivId}
    {:else}
      {pub.venue}
    {/if}
    {#if pub.acceptanceRate}
      <span class="acceptance-rate">&middot; {pub.acceptanceRate}</span>
    {/if}
  </p>

  {#if pub.pdf || pub.doi || pub.arxivId || pub.github || pub.zenodo || pub.overleaf}
    <div class="pub-links">
      {#if pub.pdf}
        <a class="link-btn" href={pub.pdf} download>PDF</a>
      {/if}
      {#if pub.doi}
        <a class="link-btn" href="https://doi.org/{pub.doi}">DOI</a>
      {/if}
      {#if pub.arxivId}
        <a class="link-btn" href="https://arxiv.org/abs/{pub.arxivId}">Preprint</a>
      {/if}
      {#if pub.github}
        <a class="link-btn" href={pub.github}>Code</a>
      {/if}
      {#if pub.zenodo}
        <a class="link-btn" href={pub.zenodo}>Dataset</a>
      {/if}
      {#if pub.overleaf}
        <a class="link-btn" href={pub.overleaf}>Overleaf</a>
      {/if}
    </div>
  {/if}
</div>

<!-- ── TL;DR ───────────────────────────────────────────────────── -->
{#if pub.tldr}
  <section class="section" id="tldr">
    <div class="section-head">
      <span class="section-label">TL;DR</span>
    </div>
    <div class="tldr-block">
      <p>{pub.tldr}</p>
    </div>
  </section>
{/if}

<!-- ── Abstract ────────────────────────────────────────────────── -->
<section class="section" id="abstract">
  <div class="section-head">
    <span class="section-label">Abstract</span>
  </div>
  {#each pub.abstract.split('\n') as paragraph, i (i)}
    <p class="abstract-text">{paragraph}</p>
  {/each}
</section>

<!-- ── Presentations ───────────────────────────────────────────── -->
{#if pub.presentations?.length}
  <section class="section" id="presentations">
    <div class="section-head">
      <span class="section-label">Presentations</span>
    </div>
    <ul class="presentation-list">
      {#each pub.presentations as pres (pres.event)}
        <li>
          <span class="pres-type">{pres.type.charAt(0).toUpperCase() + pres.type.slice(1)}</span>
          <span class="pres-event">{pres.event}</span>
          {#if pres.location}
            <span class="pres-location">, {pres.location}</span>
          {/if}
          <span class="pres-year"> ({pres.year})</span>
          {#if pres.slides}
            <a class="pres-slides" href={pres.slides} download>Slides</a>
          {/if}
        </li>
      {/each}
    </ul>
  </section>
{/if}

<!-- ── Tags ────────────────────────────────────────────────────── -->
<section class="section" id="tags">
  <div class="section-head">
    <span class="section-label">Tags</span>
  </div>
  <div class="tag-list">
    {#each pub.tags as tag (tag)}
      <span class="tag">{tag}</span>
    {/each}
  </div>
</section>

<style>
  /* ── Page header ── */
  .page-header {
    padding: 40px 0 40px;
  }

  .back-link {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-accent);
    display: inline-block;
    margin-bottom: 20px;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }

  .pub-badges {
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
  }

  h1 {
    font-size: var(--text-2xl);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.3;
    margin-bottom: 12px;
  }

  .pub-authors {
    font-size: var(--text-sm);
    color: var(--color-muted);
    margin-bottom: 4px;

    .me {
      color: var(--color-text);
      font-weight: 600;
    }

    a {
      color: var(--color-muted);
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-color: var(--color-link-underline);

      &:hover {
        color: var(--color-accent);
      }
    }
  }

  .pub-venue {
    font-size: var(--text-sm);
    color: var(--color-muted);
    margin-bottom: 20px;
  }

  .acceptance-rate {
    color: var(--color-muted);
  }

  .pub-links {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .link-btn {
    display: inline-flex;
    align-items: center;
    padding: 6px 16px;
    border-radius: var(--radius-base);
    font-size: var(--text-sm);
    font-weight: 600;
    background: var(--color-surface);
    color: var(--color-accent);
    border: 1px solid var(--color-border);
    text-decoration: none;
    transition: all var(--transition-fast);

    &:hover {
      border-color: var(--color-accent);
      background: var(--color-accent-dim);
    }
  }

  /* ── Sections ── */
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

  .badge {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: var(--text-xs);
    font-weight: 600;
    letter-spacing: 0.02em;
    white-space: nowrap;
  }

  .badge-accent {
    background: var(--color-badge-bg);
    color: var(--color-badge-text);
  }

  .badge-year {
    background: var(--color-tag-bg);
    color: var(--color-tag-text);
  }

  .badge-review {
    background: oklch(70% 0.15 55 / 0.15);
    color: oklch(55% 0.15 55);
  }

  /* ── TL;DR ── */
  .tldr-block {
    background: var(--color-accent-dim);
    border-left: 3px solid var(--color-accent);
    border-radius: 0 var(--radius-base) var(--radius-base) 0;
    padding: 16px 20px;

    p {
      font-size: var(--text-base);
      line-height: 1.7;
      color: var(--color-text);
    }
  }

  /* ── Abstract ── */
  .abstract-text {
    font-size: var(--text-base);
    line-height: 1.7;
    color: var(--color-text);
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  /* ── Presentations ── */
  .presentation-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .presentation-list li {
    font-size: var(--text-sm);
    color: var(--color-text);
    line-height: 1.5;
  }

  .pres-type {
    font-weight: 600;
    color: var(--color-heading);

    &::after {
      content: ' @ ';
      color: var(--color-muted);
      font-weight: 400;
    }
  }

  .pres-location,
  .pres-year {
    color: var(--color-muted);
  }

  .pres-slides {
    font-weight: 600;
    color: var(--color-accent);
    margin-left: 8px;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }

  /* ── Tags ── */
  .tag-list {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .tag {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: var(--text-xs);
    font-weight: 600;
    background: var(--color-tag-bg);
    color: var(--color-tag-text);
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .page-header {
      padding: 24px 0 0;
    }

    h1 {
      font-size: var(--text-xl);
    }
  }
</style>
