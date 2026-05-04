/**
 * Site-wide SEO config and URL helpers.
 *
 * This is the single source of truth for the canonical site URL, default
 * Open Graph image, and locale. Other SEO modules (`jsonld.ts`,
 * `$lib/components/Seo.svelte`), the sitemap, and robots.txt all read
 * from here so the public domain and brand metadata stay in sync.
 */
import { profile } from '$lib/data/links';

export const SITE_URL = 'https://glockyco.com';

export const SITE_NAME = profile.name;

export const SITE_AUTHOR = profile.name;

export const DEFAULT_TITLE = `${profile.name} — ${profile.tagline}`;

export const DEFAULT_DESCRIPTION =
  'Personal website of Johann Glock — PhD candidate in software engineering at the University of Klagenfurt. Research, projects, and CV.';

export const OG_LOCALE = 'en_US';

export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;

export const DEFAULT_OG_IMAGE = '/og-image.png';

export const DEFAULT_OG_IMAGE_ALT = `${profile.name} — ${profile.tagline}`;

/**
 * External profile URLs surfaced as `sameAs` in JSON-LD and as
 * fallback structured-data identifiers.
 */
export const SAME_AS = [
  `https://orcid.org/${profile.orcid}`,
  profile.github,
  profile.scholar,
  profile.semanticScholar,
  profile.linkedin,
  profile.affiliationUrl
] as const;

/**
 * Compute the absolute canonical URL for a page path.
 *
 * Accepts both `/foo` and `foo`. The site uses `trailingSlash='always'`
 * (see `src/routes/+layout.ts`), so canonical URLs preserve the trailing
 * slash on non-root paths; the root maps to `${SITE_URL}/`.
 */
export function canonicalUrl(path: string): string {
  if (path === '/' || path === '') return `${SITE_URL}/`;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const withTrailing = normalized.endsWith('/') ? normalized : `${normalized}/`;
  return `${SITE_URL}${withTrailing}`;
}

/** Absolute URL for an asset path (typically the OG image). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}
