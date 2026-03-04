<script lang="ts">
  import { publications, aistProjects } from '$lib/data/publications';
  import { sectionNav } from '$lib/state/sections.svelte';

  // All publications: under-review first, then reverse-chronological
  const allPubs = [...publications].sort((a, b) => {
    if (a.status === 'under-review' && b.status !== 'under-review') return -1;
    if (a.status !== 'under-review' && b.status === 'under-review') return 1;
    return b.year - a.year;
  });

  const areaLabels: Record<string, string> = {
    'data-engineering': 'Data Engineering',
    security: 'Security',
    'augmented-reality': 'Augmented Reality'
  };

  $effect(() => {
    sectionNav.set([
      { id: 'publications', label: 'Publications' },
      { id: 'applied', label: 'Applied Research' }
    ]);
    return () => sectionNav.set([]);
  });
</script>

<svelte:head>
  <title>Research — Johann Glock</title>
</svelte:head>

<div class="page-header">
  <h1>Research</h1>
  <nav class="page-nav">
    <a class="page-nav-pill" href="#publications">Publications</a>
    <a class="page-nav-pill" href="#applied">Applied Research</a>
  </nav>
</div>

<!-- ── Publications ────────────────────────────────────────────── -->
<section class="section" id="publications">
  <div class="section-head">
    <span class="section-label">Publications</span>
  </div>

  {#each allPubs as pub (pub.slug)}
    <article class="pub-card">
      <div class="pub-header">
        <div class="pub-title">
          <a href="/research/{pub.slug}/">{pub.title}</a>
        </div>
        <div class="pub-meta">
          {#if pub.status === 'under-review'}
            <span class="badge badge-review">Under Review</span>
          {:else}
            <span class="badge badge-accent">{pub.venueShort}</span>
            <span class="badge badge-year">{pub.year}</span>
          {/if}
        </div>
      </div>
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
        {#if pub.status === 'under-review' && pub.arxivId}
          <span class="venue-inline">&nbsp;&middot;&nbsp;arXiv:{pub.arxivId}</span>
        {:else}
          <span class="venue-inline">&nbsp;&middot;&nbsp;{pub.venue}</span>
        {/if}
      </div>
      {#if pub.tldr}
        <p class="pub-tldr">{pub.tldr}</p>
      {/if}
      {#if pub.pdf || pub.doi || pub.arxivId || pub.github || pub.zenodo || pub.overleaf}
        <div class="pub-links">
          {#if pub.pdf}
            <a class="pub-link" href={pub.pdf} download>PDF</a>
          {/if}
          {#if pub.doi}
            <a class="pub-link" href="https://doi.org/{pub.doi}">DOI</a>
          {/if}
          {#if pub.arxivId}
            <a class="pub-link" href="https://arxiv.org/abs/{pub.arxivId}">Preprint</a>
          {/if}
          {#if pub.github}
            <a class="pub-link" href={pub.github}>Code</a>
          {/if}
          {#if pub.zenodo}
            <a class="pub-link" href={pub.zenodo}>Dataset</a>
          {/if}
          {#if pub.overleaf}
            <a class="pub-link" href={pub.overleaf}>Overleaf</a>
          {/if}
        </div>
      {/if}
    </article>
  {/each}
</section>

<!-- ── Applied Research ────────────────────────────────────────── -->
<section class="section" id="applied">
  <div class="section-head">
    <span class="section-label">Applied Research</span>
  </div>
  <p class="applied-intro">
    Applied research conducted at the University of Applied Sciences Upper Austria as part of funded
    industry-partnered projects (2018–2021).
  </p>

  <div class="aist-grid">
    {#each aistProjects as project (project.title)}
      <article class="aist-card">
        {#if project.area}
          <span class="badge badge-area">{areaLabels[project.area] ?? project.area}</span>
        {/if}
        <a class="aist-title" href={project.url}>{project.title}</a>
        <span class="aist-desc">{project.description}</span>
        {#if project.funding || project.years}
          <span class="aist-meta">
            {#if project.funding}{project.funding}{/if}
            {#if project.funding && project.years}
              ·
            {/if}
            {#if project.years}{project.years}{/if}
          </span>
        {/if}
      </article>
    {/each}
  </div>
</section>

<style>
  /* ── Page header ── */
  .page-header {
    padding: 40px 0 20px;
  }

  .page-header h1 {
    font-size: var(--text-3xl);
    font-weight: 800;
    letter-spacing: -0.03em;
  }

  .page-nav {
    display: flex;
    gap: 8px;
    margin-top: 16px;
  }

  .page-nav-pill {
    display: inline-flex;
    align-items: center;
    padding: 5px 14px;
    border-radius: 20px;
    font-size: var(--text-xs);
    font-weight: 600;
    background: var(--color-tag-bg);
    color: var(--color-tag-text);
    text-decoration: none;
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--color-accent-dim);
      color: var(--color-accent);
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
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 24px;
  }

  .section-label {
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  /* ── Publication cards ── */
  .pub-card {
    padding: 20px 24px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .pub-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 8px;
  }

  .pub-title {
    font-size: var(--text-lg);
    font-weight: 700;
    line-height: 1.35;
    color: var(--color-heading);

    a {
      color: var(--color-accent);

      &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
        text-decoration-color: var(--color-link-underline);
      }
    }
  }

  .pub-meta {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
    align-items: center;
    flex-wrap: wrap;
    justify-content: flex-end;
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

  .badge-area {
    background: var(--color-tag-bg);
    color: var(--color-tag-text);
  }

  .pub-authors {
    font-size: var(--text-sm);
    color: var(--color-muted);
    padding-bottom: 2px;

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

  .venue-inline {
    color: var(--color-muted);
  }

  .pub-tldr {
    font-size: var(--text-sm);
    color: var(--color-muted);
    line-height: 1.6;
    margin-top: 10px;
  }

  .pub-links {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .pub-link {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-accent);

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }

  /* ── AIST cards ── */
  .applied-intro {
    font-size: var(--text-sm);
    color: var(--color-muted);
    line-height: 1.6;
    margin-bottom: 20px;
  }

  .aist-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  .aist-card {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 16px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
  }

  .aist-title {
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--color-accent);
    align-self: flex-start;

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
      text-decoration-color: var(--color-link-underline);
    }
  }

  .aist-desc {
    font-size: var(--text-sm);
    color: var(--color-muted);
    line-height: 1.5;
  }

  .aist-meta {
    font-size: var(--text-xs);
    color: var(--color-muted);
    margin-top: auto;
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .page-header {
      padding: 40px 0 16px;
    }

    .page-header h1 {
      font-size: 2rem;
    }

    .pub-header {
      flex-direction: column-reverse;
      gap: 8px;
    }

    .pub-meta {
      justify-content: flex-start;
    }

    .aist-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
