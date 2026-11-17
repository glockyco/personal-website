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

  const featuredTalks = sortedTalks.filter((talk) => talk.featured);
  const otherTalks = sortedTalks.filter((talk) => !talk.featured);
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

<!-- ── Featured ────────────────────────────────────────────────── -->
{#if featuredTalks.length}
  <section class="section" id="featured">
    <div class="section-head">
      <span class="section-label">Featured</span>
    </div>

    {#each featuredTalks as talk (talk.slug)}
      <article class="featured-card">
        {#if talk.preview}
          <a class="featured-thumb" href={talkPath(talk)} tabindex="-1" aria-hidden="true">
            <img
              src={talk.preview}
              alt="Title slide of {talk.title}"
              width="1200"
              height="675"
              loading="lazy"
            />
          </a>
        {/if}
        <div class="featured-body">
          <div class="talk-meta">
            <span class="badge" class:badge-accent={talk.kind !== 'seminar'}>
              {talkKindLabels[talk.kind]}
            </span>
            <span class="badge">{talk.date.slice(0, 4)}</span>
          </div>
          <div class="talk-title">
            <a href={talkPath(talk)}>{talk.title}</a>
          </div>
          <div class="talk-event">
            {talk.event}{#if talk.location}, {talk.location}{/if}
            &middot; {formatTalkDate(talk)}
          </div>
          {#if talk.summary}
            <p class="talk-summary">{talk.summary}</p>
          {/if}
          <div class="talk-links">
            <a class="talk-link" href={talkPath(talk)}>Slides</a>
          </div>
        </div>
      </article>
    {/each}
  </section>
{/if}

<!-- ── Other talks ─────────────────────────────────────────────── -->
<section class="section" id="more">
  <div class="section-head">
    <span class="section-label">{featuredTalks.length ? 'More Talks' : 'All Talks'}</span>
  </div>

  {#each otherTalks as talk (talk.slug)}
    <article class="talk-card">
      <div class="talk-header">
        <div class="talk-title">
          {#if talkPath(talk)}
            <a href={talkPath(talk)}>{talk.title}</a>
          {:else}
            {talk.title}
          {/if}
        </div>
        <div class="talk-meta">
          <span class="badge" class:badge-accent={talk.kind !== 'seminar'}>
            {talkKindLabels[talk.kind]}
          </span>
          <span class="badge">{talk.date.slice(0, 4)}</span>
        </div>
      </div>
      <div class="talk-event">
        {talk.event}{#if talk.location}, {talk.location}{/if}
        &middot; {formatTalkDate(talk)}
      </div>
      {#if talk.note}
        <p class="talk-note">{talk.note}</p>
      {/if}
      <!-- A row links to what there is: the talk's page, or else the papers it presents. -->
      {#if talkPath(talk)}
        <div class="talk-links">
          <a class="talk-link" href={talkPath(talk)}>Slides</a>
        </div>
      {:else if talk.papers.length}
        <div class="talk-links">
          {#each papersOfTalk(talk) as pub (pub.slug)}
            <a class="talk-link" href="/research/{pub.slug}/">Paper: {pub.title}</a>
          {/each}
        </div>
      {/if}
    </article>
  {/each}
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

  /* ── Sections ── */
  .section {
    padding: 40px 0;
    border-top: 1px solid var(--color-border);
    scroll-margin-top: 72px;
    transition: border-color var(--transition-base);
  }

  .section-head {
    margin-bottom: 24px;
  }

  .section-label {
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--color-accent);
  }

  /* ── Cards ── */
  .featured-card,
  .talk-card {
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-lg);
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .talk-card {
    padding: 20px 24px;
  }

  .featured-card {
    display: grid;
    grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
    overflow: hidden;
  }

  .featured-thumb {
    display: block;
    border-right: 1px solid var(--color-border);
    background: #fff;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  .featured-body {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 20px 24px;
  }

  .talk-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 8px;
  }

  .talk-title {
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

  .talk-meta {
    display: flex;
    gap: 6px;
    flex-shrink: 0;
    align-items: center;
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
    background: var(--color-tag-bg);
    color: var(--color-tag-text);
  }

  .badge-accent {
    background: var(--color-badge-bg);
    color: var(--color-badge-text);
  }

  .talk-event {
    font-size: var(--text-sm);
    color: var(--color-muted);
  }

  .talk-summary,
  .talk-note {
    font-size: var(--text-sm);
    color: var(--color-muted);
    line-height: 1.6;
  }

  .talk-note {
    margin-top: 10px;
  }

  .talk-links {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    margin-top: 12px;
  }

  .featured-body .talk-links {
    margin-top: auto;
    padding-top: 4px;
  }

  .talk-link {
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

    .featured-card {
      grid-template-columns: 1fr;
    }

    .featured-thumb {
      border-right: none;
      border-bottom: 1px solid var(--color-border);
    }

    .talk-header {
      flex-direction: column-reverse;
      gap: 8px;
    }
  }
</style>
