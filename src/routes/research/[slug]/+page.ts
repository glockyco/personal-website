import { error } from '@sveltejs/kit';
import { publications } from '$lib/data/publications';

export function entries() {
  return publications.map((p) => ({ slug: p.slug }));
}

export function load({ params }: { params: { slug: string } }) {
  const pub = publications.find((p) => p.slug === params.slug);
  if (!pub) error(404, 'Publication not found');
  return { pub };
}
