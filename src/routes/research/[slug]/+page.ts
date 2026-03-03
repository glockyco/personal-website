import { publications } from '$lib/data/publications';

export function entries() {
  return publications.map((p) => ({ slug: p.slug }));
}
