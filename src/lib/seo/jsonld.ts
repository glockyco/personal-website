/**
 * Schema.org JSON-LD builders.
 *
 * Each builder returns a plain object that the `Seo` component serializes
 * into a `<script type="application/ld+json">` tag. We keep the builders
 * small and explicit per page type rather than a single generic factory
 * so each SERP-relevant schema (`Person`, `WebSite`, `ScholarlyArticle`,
 * `CreativeWork`, `BreadcrumbList`) declares its required fields up front.
 */
import { profile } from '$lib/data/links';
import type { Publication } from '$lib/data/publications';
import type { Project } from '$lib/data/projects';
import { SAME_AS, SITE_AUTHOR, SITE_NAME, SITE_URL, absoluteUrl, canonicalUrl } from './site';

export interface BreadcrumbItem {
  name: string;
  path: string;
}

/** schema.org/WebSite for the site as a whole. */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: 'en',
    author: { '@id': `${SITE_URL}/#person` }
  };
}

/** schema.org/Person describing the site owner. Stable @id so other
 *  entities (`WebSite.author`, `ScholarlyArticle.author`) can reference it. */
export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE_URL}/#person`,
    name: profile.name,
    jobTitle: profile.tagline,
    url: SITE_URL,
    affiliation: {
      '@type': 'Organization',
      name: profile.affiliation,
      url: profile.affiliationUrl
    },
    sameAs: [...SAME_AS]
  };
}

/** schema.org/ScholarlyArticle for a publication detail page. */
export function scholarlyArticleJsonLd(pub: Publication) {
  const authors = pub.authors.map((author) =>
    author.isMe
      ? { '@type': 'Person', '@id': `${SITE_URL}/#person`, name: author.name }
      : author.url
        ? { '@type': 'Person', name: author.name, url: author.url }
        : { '@type': 'Person', name: author.name }
  );

  const sameAs: string[] = [];
  if (pub.doi) sameAs.push(`https://doi.org/${pub.doi}`);
  if (pub.arxivId) sameAs.push(`https://arxiv.org/abs/${pub.arxivId}`);
  if (pub.zenodo) sameAs.push(pub.zenodo);

  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: pub.title,
    name: pub.title,
    description: pub.tldr ?? truncate(pub.abstract, 300),
    abstract: pub.abstract,
    author: authors,
    datePublished: String(pub.year),
    isPartOf: {
      '@type': 'Periodical',
      name: pub.venue
    },
    keywords: pub.tags,
    url: canonicalUrl(`/research/${pub.slug}/`),
    ...(pub.doi ? { identifier: `doi:${pub.doi}` } : {}),
    ...(sameAs.length ? { sameAs } : {})
  };
}

/** schema.org/CreativeWork for a software project detail page. */
export function projectJsonLd(project: Project) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.tagline,
    url: canonicalUrl(`/projects/${project.slug}/`),
    creator: { '@id': `${SITE_URL}/#person` },
    author: { '@id': `${SITE_URL}/#person` },
    keywords: project.techStack,
    ...(project.liveUrl ? { sameAs: [project.liveUrl] } : {}),
    ...(project.githubUrl ? { codeRepository: project.githubUrl } : {}),
    ...(project.heroImage ? { image: absoluteUrl(project.heroImage) } : {})
  };
}

/** schema.org/BreadcrumbList for nested pages. */
export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.name,
      item: canonicalUrl(item.path)
    }))
  };
}

/** Truncate at a sentence or word boundary so meta descriptions read naturally. */
function truncate(text: string, max: number): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  if (flat.length <= max) return flat;
  const sliced = flat.slice(0, max);
  const lastSentence = sliced.lastIndexOf('. ');
  if (lastSentence > max * 0.6) return sliced.slice(0, lastSentence + 1);
  const lastSpace = sliced.lastIndexOf(' ');
  return `${sliced.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

// Re-export for convenience so call sites can import from one place.
export { SITE_AUTHOR };
