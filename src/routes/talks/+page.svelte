<script lang="ts">
  import Seo from '$lib/components/Seo.svelte';
  import {
    formatTalkDate,
    papersOfTalk,
    sortedTalks,
    talkKindLabels,
    talkPath
  } from '$lib/data/talks';
  import { breadcrumbJsonLd } from '$lib/seo/jsonld';
</script>

<Seo
  path="/talks/"
  title="Talks — Johann Glock"
  description="Talks and presentations by Johann Glock, with slides to read online and links to the papers they present."
  jsonLd={breadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Talks', path: '/talks/' }
  ])}
/>

<div class="page-header" id="top">
  <h1>Talks</h1>
</div>

<div class="talk-grid">
  {#each sortedTalks as talk (talk.slug)}
    {@const path = talkPath(talk)}
    <article class="talk-card">
      {#if path}
        <a href={path} tabindex="-1" aria-hidden="true">
          <img
            class="card-thumb"
            src={talk.preview}
            alt="Title slide of {talk.title}"
            width="1200"
            height="675"
            loading="lazy"
          />
        </a>
      {:else}
        <img
          class="card-thumb"
          src={talk.preview}
          alt="Title slide of {talk.title}"
          width="1200"
          height="675"
          loading="lazy"
        />
      {/if}
      <div class="card-body">
        <div class="card-top">
          <span class="card-kind">{talkKindLabels[talk.kind]}</span>
          <span class="card-date">{formatTalkDate(talk)}</span>
        </div>

        <span class="card-title">
          {#if path}
            <a href={path}>{talk.title}</a>
          {:else}
            {talk.title}
          {/if}
        </span>

        <p class="card-event">
          {talk.event}{#if talk.location}, {talk.location}{/if}
        </p>

        <!-- A card links to what there is: the talk's page, or else the papers it presents. -->
        {#if path || talk.papers.length}
          <div class="card-links">
            {#if path}
              <a class="card-link" href={path}>Slides</a>
            {:else}
              {#each papersOfTalk(talk) as pub (pub.slug)}
                <a class="card-link" href="/research/{pub.slug}/">Paper</a>
              {/each}
            {/if}
          </div>
        {/if}
      </div>
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

  /* ── Talk grid ── */
  .talk-grid {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 16px;
    padding: 32px 0 40px;
  }

  /* ── Talk card ── */
  .talk-card {
    display: flex;
    flex-direction: column;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    transition: border-color var(--transition-base);
  }

  /* Slides are white, so the picture needs an edge of its own on a light card. */
  .card-thumb {
    display: block;
    width: calc(100% - 24px);
    height: auto;
    margin: 12px 12px 0;
    aspect-ratio: 16 / 9;
    border: 1px solid var(--color-border);
    border-radius: calc(var(--radius-lg) - 4px);
  }

  .card-body {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 16px 24px 20px;
    flex: 1;
  }

  .card-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    font-size: var(--text-xs);
    font-weight: 600;
    color: var(--color-muted);
  }

  .card-title {
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

  .card-event {
    font-size: var(--text-sm);
    color: var(--color-muted);
    line-height: 1.5;
  }

  .card-links {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: auto;
    padding-top: 4px;
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

  /* ── Responsive ── */
  @media (max-width: 768px) {
    .page-header {
      padding: 40px 0 16px;
    }

    .page-header h1 {
      font-size: 2rem;
    }

    .talk-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
