<script lang="ts">
  import { page } from '$app/state';

  const { project } = $derived(page.data as { project: import('$lib/data/projects').Project });

  /** Embed URL with dark theme forced for supported sites */
  const demoUrl = $derived(() => {
    if (!project.liveUrl) return '';
    const url = new URL(project.liveUrl);
    url.searchParams.set('theme', 'dark');
    return url.toString();
  });
</script>

<svelte:head>
  <title>{project.title} — Johann Glock</title>
</svelte:head>

<!-- ── Header ──────────────────────────────────────────────────── -->
<div class="page-header" id="top">
  <a class="back-link" href="/projects/">← Projects</a>

  <div class="title-row">
    <h1>{project.title}</h1>
    <span
      class="project-status"
      class:status-inactive={project.status === 'inactive' || project.status === 'archived'}
    >
      <span class="status-dot"></span>
      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
    </span>
  </div>

  <p class="project-tagline">{project.tagline}</p>

  {#if project.liveUrl || project.githubUrl || project.steamUrl || project.thunderstoreUrl || project.wikiUrl}
    <div class="project-links">
      {#if project.liveUrl}
        <a class="link-btn" href={project.liveUrl}>Website</a>
      {/if}
      {#if project.githubUrl}
        <a class="link-btn" href={project.githubUrl}>GitHub</a>
      {/if}
      {#if project.steamUrl}
        <a class="link-btn" href={project.steamUrl}>Steam</a>
      {/if}
      {#if project.thunderstoreUrl}
        <a class="link-btn" href={project.thunderstoreUrl}>Thunderstore</a>
      {/if}
      {#if project.wikiUrl}
        <a class="link-btn" href={project.wikiUrl}>Wiki</a>
      {/if}
    </div>
  {/if}
</div>

<!-- ── Challenge ───────────────────────────────────────────────── -->
{#if project.challenge}
  <section class="section" id="challenge">
    <div class="section-head">
      <span class="section-label">The Challenge</span>
    </div>
    <p class="prose">{project.challenge}</p>
  </section>
{/if}

<!-- ── Solution ────────────────────────────────────────────────── -->
{#if project.solution}
  <section class="section" id="solution">
    <div class="section-head">
      <span class="section-label">The Solution</span>
    </div>
    <p class="prose">{project.solution}</p>
  </section>
{/if}

<!-- ── Demo ────────────────────────────────────────────────────── -->
{#if project.liveUrl}
  <section class="section" id="demo">
    <div class="section-head">
      <span class="section-label">Demo</span>
      <a class="section-more" href={project.liveUrl}>Open website &rarr;</a>
    </div>
  </section>
  <div class="demo-frame wide">
    <iframe src={demoUrl()} title="{project.title} demo" loading="lazy"></iframe>
  </div>
{/if}

<!-- ── How I Built This ────────────────────────────────────────── -->
{#if project.architecture || project.technicalDecisions?.length}
  <section class="section" id="how-i-built-this">
    <div class="section-head">
      <span class="section-label">How I Built This</span>
    </div>

    {#if project.architecture}
      <div class="subsection">
        <h3>Architecture</h3>
        <p class="prose">{project.architecture}</p>
      </div>
    {/if}

    {#if project.technicalDecisions?.length}
      <div class="subsection">
        <h3>Technical Decisions</h3>
        <dl class="decisions">
          {#each project.technicalDecisions as td (td.decision)}
            <dt>{td.decision}</dt>
            <dd>{td.rationale}</dd>
          {/each}
        </dl>
      </div>
    {/if}

    {#if project.whatIdDoDifferently}
      <div class="subsection">
        <h3>What I'd Do Differently</h3>
        <p class="prose">{project.whatIdDoDifferently}</p>
      </div>
    {/if}
  </section>
{/if}

<!-- ── Tech Stack ──────────────────────────────────────────────── -->
<section class="section" id="tech-stack">
  <div class="section-head">
    <span class="section-label">Tech Stack</span>
  </div>
  <div class="tech-list">
    {#each project.techStack as tech (tech)}
      <span class="tech-pill">{tech}</span>
    {/each}
  </div>
</section>

<!-- ── Impact / Metrics ────────────────────────────────────────── -->
{#if project.metrics}
  <section class="section" id="impact">
    <div class="section-head">
      <span class="section-label">Impact</span>
    </div>
    <div class="metrics-grid">
      {#if project.metrics.users}
        <div class="metric">
          <span class="metric-value">{project.metrics.users}</span>
          <span class="metric-label">Users</span>
        </div>
      {/if}
      {#if project.metrics.dataScale}
        <div class="metric">
          <span class="metric-value">{project.metrics.dataScale}</span>
          <span class="metric-label">Data Scale</span>
        </div>
      {/if}
    </div>
  </section>
{/if}

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

  .title-row {
    display: flex;
    align-items: center;
    gap: 16px;
    flex-wrap: wrap;
    margin-bottom: 8px;
  }

  h1 {
    font-size: var(--text-2xl);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.3;
  }

  .project-status {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-status-active);
    white-space: nowrap;
  }

  .status-dot {
    width: 6px;
    height: 6px;
    background: var(--color-status-active);
    border-radius: 50%;
  }

  .status-inactive {
    color: var(--color-muted);

    .status-dot {
      background: var(--color-muted);
    }
  }

  .project-tagline {
    font-size: var(--text-base);
    color: var(--color-muted);
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .project-links {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }

  .link-btn {
    display: inline-flex;
    align-items: center;
    padding: 6px 16px;
    border-radius: 20px;
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--color-accent);
    border: 1px solid var(--color-accent);
    transition:
      background var(--transition-fast),
      color var(--transition-fast);

    &:hover {
      background: var(--color-accent);
      color: white;
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
    margin-bottom: 20px;
  }

  .section-label {
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  .section-more {
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-muted);

    &:hover {
      color: var(--color-accent);
    }
  }

  .prose {
    font-size: var(--text-base);
    color: var(--color-text);
    line-height: 1.7;
  }

  /* ── Demo embed ── */
  #demo {
    padding-bottom: 0;
  }

  .demo-frame {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-base);
    overflow: hidden;
    transition: border-color var(--transition-base);
    margin-bottom: 40px;
  }

  .demo-frame iframe {
    display: block;
    width: 100%;
    height: 70vh;
    min-height: 500px;
    border: none;
  }

  /* ── How I Built This ── */
  .subsection {
    margin-bottom: 28px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .subsection h3 {
    font-size: var(--text-base);
    font-weight: 700;
    color: var(--color-heading);
    margin-bottom: 10px;
  }

  .decisions {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .decisions dt {
    font-size: var(--text-sm);
    font-weight: 700;
    color: var(--color-heading);
  }

  .decisions dd {
    font-size: var(--text-sm);
    color: var(--color-muted);
    line-height: 1.6;
    margin-left: 0;
    margin-top: 2px;
  }

  /* ── Tech Stack ── */
  .tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .tech-pill {
    display: inline-flex;
    align-items: center;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: var(--text-xs);
    font-weight: 600;
    background: var(--color-tag-bg);
    color: var(--color-tag-text);
  }

  /* ── Impact / Metrics ── */
  .metrics-grid {
    display: flex;
    gap: 32px;
  }

  .metric {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .metric-value {
    font-size: var(--text-lg);
    font-weight: 800;
    color: var(--color-heading);
  }

  .metric-label {
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .page-header {
      padding: 24px 0 32px;
    }

    h1 {
      font-size: var(--text-xl);
    }

    .demo-frame iframe {
      height: 50vh;
      min-height: 300px;
    }
  }
</style>
