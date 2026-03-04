import { error } from '@sveltejs/kit';
import { publications } from '$lib/data/publications';
import type { Section } from '$lib/state/sections.svelte';

export function entries() {
  return publications.map((p) => ({ slug: p.slug }));
}

export function load({ params }: { params: { slug: string } }) {
  const pub = publications.find((p) => p.slug === params.slug);
  if (!pub) error(404, 'Publication not found');

  const sections: Section[] = [{ id: 'top', label: 'Top' }];
  if (pub.tldr) sections.push({ id: 'tldr', label: 'TL;DR' });
  sections.push({ id: 'abstract', label: 'Abstract' });
  if (pub.presentations?.length) sections.push({ id: 'presentations', label: 'Presentations' });
  sections.push({ id: 'tags', label: 'Tags' });

  return { pub, sections };
}
