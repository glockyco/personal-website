import type { Project } from './data/projects.ts';
import type { Publication } from './data/publications.ts';
import type { Talk } from './data/talks.ts';

/** One place a reader can go from a detail page. */
export interface PageLink {
  /** What the reader gets there, in plain words. */
  label: string;
  /** The address or identifier the link leads to, as the reader would recognize it. */
  where: string;
  href: string;
}

/** A publication's link also says what kind of thing it leads to. */
export interface PaperLink extends PageLink {
  kind: LinkKind;
}

/** What a publication's link leads to, which picks its icon. */
export type LinkKind = 'paper' | 'published' | 'archive' | 'code' | 'package' | 'sources';

/** "https://github.com/glockyco/Teralizer/" as "github.com/glockyco/Teralizer". */
function address(url: string): string {
  const { host, pathname } = new URL(url);
  return `${host.replace(/^www\./, '')}${pathname.replace(/\/$/, '')}`;
}

/** The publication itself as a PDF. */
export function paperPdfLink(pub: Publication): PaperLink | undefined {
  if (!pub.pdf) return undefined;
  const label = pub.type === 'thesis' ? 'Read the thesis' : 'Read the paper';
  return { label, where: 'PDF', kind: 'paper', href: pub.pdf };
}

/** The publication's poster as a PDF. */
export function paperPosterLink(pub: Publication): PageLink | undefined {
  return pub.poster && { label: 'View the poster', where: 'PDF', href: pub.poster.pdf };
}

/** The PDF and every other link of a publication, for the lists of publications. */
export function paperListLinks(pub: Publication): PaperLink[] {
  const pdf = paperPdfLink(pub);
  return pdf ? [pdf, ...paperLinks(pub)] : paperLinks(pub);
}
/** Where else the publication and what belongs to it live, in the order a reader needs them. */
export function paperLinks(pub: Publication): PaperLink[] {
  const links: PaperLink[] = [];
  if (pub.doi) {
    links.push({
      label: 'Published version',
      where: `doi.org/${pub.doi}`,
      kind: 'published',
      href: `https://doi.org/${pub.doi}`
    });
  }
  if (pub.arxivId) {
    links.push({
      label: 'Preprint',
      where: `arXiv:${pub.arxivId}`,
      kind: 'archive',
      href: `https://arxiv.org/abs/${pub.arxivId}`
    });
  }
  if (pub.github) {
    links.push({
      label: 'Code',
      where: address(pub.github),
      kind: 'code',
      href: pub.github
    });
  }
  if (pub.zenodo) {
    // A paper's Zenodo record is its replication package, a thesis's is a copy of the thesis.
    const label = pub.type === 'thesis' ? 'Archived copy' : 'Replication package';
    links.push({
      label,
      where: address(pub.zenodo),
      kind: pub.type === 'thesis' ? 'archive' : 'package',
      href: pub.zenodo
    });
  }
  if (pub.latex) {
    links.push({
      label: 'LaTeX sources',
      where: address(pub.latex),
      kind: 'sources',
      href: pub.latex
    });
  }
  if (pub.overleaf) {
    links.push({
      label: 'LaTeX sources',
      where: 'overleaf.com',
      kind: 'sources',
      href: pub.overleaf
    });
  }
  return links;
}

/** Where a talk's deck lives apart from its PDF. */
export function talkLinks(talk: Talk): PageLink[] {
  const links: PageLink[] = [];
  if (talk.source) {
    links.push({
      label: 'Deck sources',
      where: address(talk.source).split('/tree/')[0],
      href: talk.source
    });
  }
  return links;
}

/** Where a project lives, with its website first. */
export function projectLinks(project: Project): PageLink[] {
  const links: PageLink[] = [];
  if (project.liveUrl) {
    links.push({ label: 'Website', where: address(project.liveUrl), href: project.liveUrl });
  }
  if (project.githubUrl) {
    links.push({
      label: 'Source code',
      where: address(project.githubUrl),
      href: project.githubUrl
    });
  }
  if (project.steamUrl) {
    links.push({ label: 'Steam', where: 'steamcommunity.com', href: project.steamUrl });
  }
  if (project.thunderstoreUrl) {
    links.push({
      label: 'Thunderstore',
      where: address(project.thunderstoreUrl),
      href: project.thunderstoreUrl
    });
  }
  if (project.wikiUrl) {
    links.push({ label: 'Wiki', where: address(project.wikiUrl), href: project.wikiUrl });
  }
  return links;
}
