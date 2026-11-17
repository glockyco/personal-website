/**
 * Google Scholar's bibliographic meta tags for a publication's page.
 *
 * Scholar indexes a page that carries them and offers the PDF it names
 * as a copy of the paper, so the tags follow its inclusion guidelines:
 * one `citation_author` per author in order, the year as the date, and
 * the venue under the tag of the publication's kind.
 */
import type { Publication } from '$lib/data/publications';
import { absoluteUrl } from './site';

export interface MetaTag {
  name: string;
  content: string;
}

const VENUE_TAG: Record<Publication['type'], string> = {
  journal: 'citation_journal_title',
  conference: 'citation_conference_title',
  'doctoral-symposium': 'citation_conference_title',
  thesis: 'citation_dissertation_institution',
  preprint: 'citation_technical_report_institution'
};

export function scholarMetaTags(pub: Publication): MetaTag[] {
  const tags: MetaTag[] = [
    { name: 'citation_title', content: pub.title },
    ...pub.authors.map((author) => ({ name: 'citation_author', content: author.name })),
    { name: 'citation_publication_date', content: String(pub.year) },
    { name: VENUE_TAG[pub.type], content: pub.venue }
  ];
  if (pub.doi) tags.push({ name: 'citation_doi', content: pub.doi });
  if (pub.arxivId) tags.push({ name: 'citation_arxiv_id', content: pub.arxivId });
  if (pub.pdf) tags.push({ name: 'citation_pdf_url', content: absoluteUrl(pub.pdf) });
  return tags;
}
