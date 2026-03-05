<script lang="ts">
  import { projects } from '$lib/data/projects';
</script>

<svelte:head>
  <title>Projects — Johann Glock</title>
</svelte:head>

<div class="page-header" id="top">
  <h1>Projects</h1>
  <p class="page-intro">
    Things I've built outside of research — community tools, game mods, and this site.
  </p>
</div>

<div class="project-grid">
  {#each projects as project (project.slug)}
    <article class="project-card">
      <div class="card-top">
        <span class="card-title">
          <a href="/projects/{project.slug}/">{project.title}</a>
        </span>
        <span
          class="card-status"
          class:status-inactive={project.status === 'inactive' || project.status === 'archived'}
        >
          <span class="status-dot"></span>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
      </div>

      <p class="card-tagline">{project.tagline}</p>

      <div class="card-tech">
        {#each project.techStack as tech (tech)}
          <span class="tech-pill">{tech}</span>
        {/each}
      </div>

      {#if project.liveUrl || project.githubUrl || project.steamUrl || project.thunderstoreUrl || project.wikiUrl}
        <div class="card-links">
          {#if project.liveUrl}
            <a class="card-link" href={project.liveUrl}>Website</a>
          {/if}
          {#if project.githubUrl}
            <a class="card-link" href={project.githubUrl}>GitHub</a>
          {/if}
          {#if project.steamUrl}
            <a class="card-link" href={project.steamUrl}>Steam</a>
          {/if}
          {#if project.thunderstoreUrl}
            <a class="card-link" href={project.thunderstoreUrl}>Thunderstore</a>
          {/if}
          {#if project.wikiUrl}
            <a class="card-link" href={project.wikiUrl}>Wiki</a>
          {/if}
        </div>
      {/if}
    </article>
  {/each}
</div>

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

  .page-intro {
    font-size: var(--text-sm);
    color: var(--color-muted);
    line-height: 1.6;
    margin-top: 8px;
  }

  /* ── Project grid ── */
  .project-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    padding: 32px 0 40px;
  }

  /* ── Project card ── */
  .project-card {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 20px 24px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    transition: border-color var(--transition-base);
  }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
  }

  .card-title {
    font-size: var(--text-lg);
    font-weight: 700;
    line-height: 1.35;

    a {
      color: var(--color-accent);

      &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
        text-decoration-color: var(--color-link-underline);
      }
    }
  }

  .card-status {
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

  .status-inactive {
    color: var(--color-muted);

    .status-dot {
      background: var(--color-muted);
    }
  }

  .card-tagline {
    font-size: var(--text-sm);
    color: var(--color-muted);
    line-height: 1.5;
  }

  .card-tech {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-top: auto;
  }

  .tech-pill {
    display: inline-flex;
    align-items: center;
    padding: 3px 10px;
    border-radius: 20px;
    font-size: var(--text-xs);
    font-weight: 600;
    background: var(--color-tag-bg);
    color: var(--color-tag-text);
  }

  .card-links {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
  }

  .card-link {
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
    .page-header {
      padding: 40px 0 16px;
    }

    .page-header h1 {
      font-size: 2rem;
    }

    .project-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
