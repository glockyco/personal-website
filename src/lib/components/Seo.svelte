<script lang="ts">
  /**
   * Per-page SEO emitter.
   *
   * Every page renders this component with its own title/description/path
   * so the head accumulates from a single source of truth. Defaults pull
   * from `$lib/seo/site` so callers only specify what differs from the
   * site-wide brand values.
   */
  import {
    DEFAULT_DESCRIPTION,
    DEFAULT_OG_IMAGE,
    DEFAULT_OG_IMAGE_ALT,
    DEFAULT_TITLE,
    OG_IMAGE_HEIGHT,
    OG_IMAGE_WIDTH,
    OG_LOCALE,
    SITE_AUTHOR,
    SITE_NAME,
    absoluteUrl,
    canonicalUrl
  } from '$lib/seo/site';

  interface Props {
    /** `<title>`. Should already include the brand suffix per page conventions. */
    title?: string;
    /** `<meta name="description">` body. One or two sentences, plain prose. */
    description?: string;
    /** Current path, e.g. `/research/pasda/`. Drives canonical and og:url. */
    path: string;
    /** Open Graph type. Use `article` for publications, `website` everywhere else. */
    type?: 'website' | 'article' | 'profile';
    /** Path to the OG image (defaults to the site-wide card). */
    image?: string;
    /** Alt text describing the OG image. */
    imageAlt?: string;
    /** Set true to suppress indexing (e.g., error pages). */
    noindex?: boolean;
    /** Optional JSON-LD object(s) embedded as `<script type="application/ld+json">`. */
    jsonLd?: object | object[];
  }

  const {
    title = DEFAULT_TITLE,
    description = DEFAULT_DESCRIPTION,
    path,
    type = 'website',
    image = DEFAULT_OG_IMAGE,
    imageAlt = DEFAULT_OG_IMAGE_ALT,
    noindex = false,
    jsonLd
  }: Props = $props();

  const url = $derived(canonicalUrl(path));
  const ogImage = $derived(absoluteUrl(image));
  const ldArray = $derived(jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : []);
  // svelte:element with a literal "script" name keeps the JSON-LD payload
  // out of the compiler's static analysis path.
  const scriptTag = 'script';
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="author" content={SITE_AUTHOR} />
  <link rel="canonical" href={url} />
  {#if noindex}
    <meta name="robots" content="noindex, nofollow" />
  {/if}

  <meta property="og:type" content={type} />
  <meta property="og:locale" content={OG_LOCALE} />
  <meta property="og:site_name" content={SITE_NAME} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={url} />
  <meta property="og:image" content={ogImage} />
  <meta property="og:image:width" content={OG_IMAGE_WIDTH.toString()} />
  <meta property="og:image:height" content={OG_IMAGE_HEIGHT.toString()} />
  <meta property="og:image:alt" content={imageAlt} />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={ogImage} />
  <meta name="twitter:image:alt" content={imageAlt} />

  {#each ldArray as ld, index (index)}
    <svelte:element this={scriptTag} type="application/ld+json">{JSON.stringify(ld)}</svelte:element
    >
  {/each}
</svelte:head>
