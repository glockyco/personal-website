<script lang="ts">
  import { profile } from '$lib/data/links';
  import profilePhoto from '$lib/assets/profile.png';
  import { publications } from '$lib/data/publications';
  import { projects } from '$lib/data/projects';
  import { sectionNav } from '$lib/state/sections.svelte';

  // Exclude thesis; show under-review first, then published by year desc
  const featuredPubs = publications
    .filter((p) => p.type !== 'thesis')
    .sort((a, b) => {
      if (a.status === 'under-review' && b.status !== 'under-review') return -1;
      if (a.status !== 'under-review' && b.status === 'under-review') return 1;
      return b.year - a.year;
    });
  const featuredProjects = projects.filter((p) => p.featured);

  $effect(() => {
    sectionNav.set([
      { id: 'hero', label: 'Top' },
      { id: 'about', label: 'About' },
      { id: 'research', label: 'Research' },
      { id: 'projects', label: 'Projects' }
    ]);
    return () => sectionNav.set([]);
  });
</script>

<svelte:head>
  <title>Johann Glock</title>
</svelte:head>

<!-- ── Hero ──────────────────────────────────────────────────────────── -->
<section class="hero" id="hero">
  <div class="hero-intro">
    <img class="avatar" src={profilePhoto} alt="Johann Glock" />
    <div class="hero-text">
      <h1 class="name">{profile.name}</h1>
      <p class="tagline">{profile.tagline}</p>
      <p class="meta">
        {profile.location} &middot;
        <a href={profile.affiliationUrl}>{profile.affiliation}</a>
      </p>
      <div class="actions">
        <a class="btn btn-primary" href="/research/">View Research</a>
        <a class="btn btn-secondary" href="/projects/">View Projects</a>
        <a class="btn btn-secondary" href="/cv/">View CV</a>
      </div>
    </div>
  </div>
</section>

<!-- ── About ─────────────────────────────────────────────────────────── -->
<section class="section" id="about">
  <div class="section-head">
    <span class="section-label">About</span>
  </div>
  <!-- eslint-disable-next-line svelte/no-at-html-tags -- bioHtml is authored in links.ts, not user input -->
  <p class="bio">{@html profile.bioHtml}</p>
</section>

<!-- ── Selected Publications ─────────────────────────────────────────── -->
<section class="section" id="research">
  <div class="section-head">
    <span class="section-label">Selected Publications</span>
    <a class="section-more" href="/research/">All publications &rarr;</a>
  </div>

  {#each featuredPubs as pub (pub.slug)}
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
          <span class="venue-inline"
            >&nbsp;&middot;&nbsp;arXiv:{pub.arxivId}&nbsp;&middot;&nbsp;{pub.year}</span
          >
        {:else}
          <span class="venue-inline"
            >&nbsp;&middot;&nbsp;{pub.venue}&nbsp;&middot;&nbsp;{pub.year}</span
          >
        {/if}
      </div>
      {#if pub.tldr}
        <p class="pub-tldr">{pub.tldr}</p>
      {/if}
      {#if pub.pdf || pub.doi || pub.arxivId || pub.github || pub.zenodo}
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
        </div>
      {/if}
    </article>
  {/each}
</section>

<!-- ── Featured Projects ─────────────────────────────────────────────── -->
<section class="section" id="projects">
  <div class="section-head">
    <span class="section-label">Featured Projects</span>
    <a class="section-more" href="/projects/">All projects &rarr;</a>
  </div>

  <div class="projects-grid">
    {#each featuredProjects as project (project.slug)}
      <article class="project-card">
        <div class="project-top">
          <span class="project-title">
            <a href="/projects/{project.slug}/">{project.title}</a>
          </span>
          <span class="project-status">
            <span class="status-dot"></span>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </span>
        </div>
        <p class="project-tagline">{project.tagline}</p>
        {#if project.liveUrl}
          <div class="project-links">
            <a class="pub-link" href={project.liveUrl}>Live &rarr;</a>
          </div>
        {/if}
      </article>
    {/each}
  </div>
</section>

<style>
  /* ── Hero ── */
  .hero {
    padding: 80px 0 40px;
  }

  .hero-intro {
    display: flex;
    gap: 40px;
    align-items: flex-start;
  }

  .hero-text {
    flex: 1;
    min-width: 0;
  }

  .avatar {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    object-fit: cover;
    object-position: center top;
    flex-shrink: 0;
    border: 3px solid var(--color-border);
    transition: border-color var(--transition-base);
  }

  .name {
    font-size: var(--text-3xl);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.15;
    margin-bottom: 8px;
  }

  .tagline {
    font-size: var(--text-lg);
    color: var(--color-muted);
    margin-bottom: 8px;
  }

  .meta {
    font-size: var(--text-sm);
    color: var(--color-muted);
    margin-bottom: 16px;

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

  .bio {
    font-size: var(--text-base);
    line-height: 1.7;
    color: var(--color-text);
  }

  .actions {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    padding: 8px 20px;
    border-radius: var(--radius-base);
    font-size: var(--text-sm);
    font-weight: 600;
    transition: all var(--transition-fast);
    text-decoration: none;
  }

  .btn-primary {
    background: var(--color-accent);
    color: oklch(100% 0 0);

    &:hover {
      background: var(--color-accent-hover);
      color: oklch(100% 0 0);
    }
  }

  .btn-secondary {
    background: var(--color-surface);
    color: var(--color-text);
    border: 1px solid var(--color-border);

    &:hover {
      border-color: var(--color-accent);
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

  .section-more {
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-accent);

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
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

  /* ── Project cards ── */
  .projects-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .project-card {
    padding: 24px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .project-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .project-title {
    font-size: var(--text-lg);
    font-weight: 700;

    a {
      color: var(--color-accent);

      &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
        text-decoration-color: var(--color-link-underline);
      }
    }
  }

  .project-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-status-active);
    white-space: nowrap;
    flex-shrink: 0;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    background: var(--color-status-active);
    border-radius: 50%;
    flex-shrink: 0;
  }

  .project-tagline {
    font-size: var(--text-sm);
    color: var(--color-muted);
    line-height: 1.5;
  }

  .project-links {
    margin-top: 4px;
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

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .hero {
      padding: 40px 0 32px;
    }

    .hero-intro {
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 20px;
    }

    .actions {
      justify-content: center;
    }

    .avatar {
      width: 88px;
      height: 88px;
    }

    .name {
      font-size: 2rem;
    }

    .pub-header {
      flex-direction: column-reverse;
      gap: 8px;
    }

    .pub-meta {
      justify-content: flex-start;
    }

    .projects-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
