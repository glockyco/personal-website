<script lang="ts">
  import LinkTiles from '$lib/components/LinkTiles.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { formatTalkDate, talkKindLabels } from '$lib/data/talks';
  import { talkLinks } from '$lib/page-links';
  import { breadcrumbJsonLd, talkJsonLd } from '$lib/seo/jsonld';

  const { data } = $props();
  const talk = $derived(data.talk);

  const description = $derived(
    talk.metaDescription ??
      talk.summary ??
      `${talk.title} — ${talkKindLabels[talk.kind]} at ${talk.event}, ${formatTalkDate(talk)}.`
  );
</script>

<Seo
  path={`/talks/${talk.slug}/`}
  title={`${talk.title} — Johann Glock`}
  {description}
  type="article"
  image={talk.preview}
  imageWidth={talk.preview ? 1200 : undefined}
  imageHeight={talk.preview ? 675 : undefined}
  imageAlt={talk.preview ? `Title slide of ${talk.title}` : undefined}
  jsonLd={[
    breadcrumbJsonLd([
      { name: 'Home', path: '/' },
      { name: 'Talks', path: '/talks/' },
      { name: talk.title, path: `/talks/${talk.slug}/` }
    ]),
    talkJsonLd(talk, data.papers)
  ]}
/>

<div class="page-header" id="top">
  <a class="back-link" href="/talks/">&larr; Talks</a>

  <div class="talk-badges">
    <span class="badge" class:badge-accent={talk.kind !== 'seminar'}>
      {talkKindLabels[talk.kind]}
    </span>
    <span class="badge">{talk.date.slice(0, 4)}</span>
  </div>

  <h1>{talk.title}</h1>

  <p class="talk-event">
    {talk.event}{#if talk.location}, {talk.location}{/if}
    &middot; {formatTalkDate(talk)}
  </p>
  {#if talk.note}
    <p class="talk-note">{talk.note}</p>
  {/if}

  <div class="talk-links">
    <LinkTiles
      primary={{ label: 'Open the slides', where: 'PDF', href: data.slides }}
      links={talkLinks(talk)}
    />
  </div>
</div>

<!-- ── Summary ─────────────────────────────────────────────────── -->
{#if talk.summary}
  <section class="section" id="summary">
    <div class="section-head">
      <span class="section-label">Summary</span>
    </div>
    <div class="summary-block">
      <p>{talk.summary}</p>
    </div>
  </section>
{/if}

<!-- ── Slides (inline PDF) ─────────────────────────────────────── -->
<section class="section section-no-bottom" id="slides">
  <div class="section-head">
    <span class="section-label">Slides</span>
  </div>
</section>
<div class="pdf-viewer wide">
  <object data={data.slides} type="application/pdf" title="Slides of {talk.title}">
    <p class="pdf-fallback">
      Your browser does not support inline PDF viewing.
      <a href={data.slides} download>Download the slides</a> instead.
    </p>
  </object>
</div>

<!-- ── Poster ──────────────────────────────────────────────────── -->
{#if talk.poster}
  <section class="section" id="poster">
    <div class="section-head">
      <span class="section-label">Poster</span>
    </div>
    <a class="poster" href={talk.poster.pdf}>
      <img
        src={talk.poster.image}
        alt="Poster of {talk.title}"
        width={talk.poster.width}
        height={talk.poster.height}
        loading="lazy"
      />
    </a>
  </section>
{/if}

<!-- ── Papers ──────────────────────────────────────────────────── -->
{#if data.papers.length}
  <section class="section" id="papers">
    <div class="section-head">
      <span class="section-label">Papers</span>
    </div>
    <ul class="paper-list">
      {#each data.papers as pub (pub.slug)}
        <li>
          <a href="/research/{pub.slug}/">{pub.title}</a>
          <span class="paper-venue">{pub.venueShort}, {pub.year}</span>
        </li>
      {/each}
    </ul>
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

  .talk-badges {
    display: flex;
    gap: 6px;
    margin-bottom: 12px;
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

  h1 {
    font-size: var(--text-2xl);
    font-weight: 800;
    letter-spacing: -0.02em;
    line-height: 1.3;
    margin-bottom: 12px;
  }

  .talk-event,
  .talk-note {
    font-size: var(--text-sm);
    color: var(--color-muted);
  }

  .talk-note {
    margin-top: 4px;
  }

  .talk-links {
    margin-top: 20px;
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

  /* ── Summary ── */
  .summary-block {
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

  /* ── PDF viewer ── */
  .section-no-bottom {
    padding-bottom: 0;
  }

  .pdf-viewer {
    border: 1px solid var(--color-border);
    border-radius: var(--radius-base);
    overflow: hidden;
    transition: border-color var(--transition-base);
    margin-bottom: 40px;
  }

  .pdf-viewer object {
    display: block;
    width: 100%;
    height: 80vh;
    min-height: 600px;
  }

  /* A poster is read as a whole, so it is shown at the width of the text and opens as a PDF. */
  .poster {
    display: block;
    border: 1px solid var(--color-border);
    border-radius: var(--radius-base);
    overflow: hidden;
    transition: border-color var(--transition-base);

    &:hover {
      border-color: var(--color-accent);
    }

    img {
      display: block;
      width: 100%;
      height: auto;
    }
  }

  .pdf-fallback {
    padding: 40px 20px;
    text-align: center;
    font-size: var(--text-sm);
    color: var(--color-muted);

    a {
      color: var(--color-accent);
      font-weight: 600;

      &:hover {
        text-decoration: underline;
        text-underline-offset: 3px;
      }
    }
  }

  /* ── Papers ── */
  .paper-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .paper-list li {
    font-size: var(--text-sm);
    line-height: 1.5;
  }

  .paper-list a {
    font-weight: 600;
    color: var(--color-accent);

    &:hover {
      text-decoration: underline;
      text-underline-offset: 3px;
    }
  }

  .paper-venue {
    color: var(--color-muted);
    margin-left: 8px;
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .page-header {
      padding: 24px 0 32px;
    }

    h1 {
      font-size: var(--text-xl);
    }
  }
</style>
