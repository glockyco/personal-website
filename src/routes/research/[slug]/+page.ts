import { error } from '@sveltejs/kit';
import { publications, relatedPublications } from '$lib/data/publications';
import { talksForPaper } from '$lib/data/talks';
import type { Section } from '$lib/state/sections.svelte';

export function entries() {
  return publications.map((p) => ({ slug: p.slug }));
}

export function load({ params }: { params: { slug: string } }) {
  const pub = publications.find((p) => p.slug === params.slug);
  if (!pub) error(404, 'Publication not found');

  const talks = talksForPaper(pub.slug);
  const related = relatedPublications(pub.slug);

  const sections: Section[] = [{ id: 'top', label: 'Top' }];
  if (pub.tldr) sections.push({ id: 'tldr', label: 'TL;DR' });
  sections.push({ id: 'abstract', label: 'Abstract' });
  if (pub.pdf) sections.push({ id: 'paper', label: 'Paper' });
  if (talks.length) sections.push({ id: 'presentations', label: 'Presentations' });
  if (related.length) sections.push({ id: 'related', label: 'Related' });
  sections.push({ id: 'cite', label: 'Cite' });
  sections.push({ id: 'tags', label: 'Tags' });

  return { pub, talks, related, sections };
}
