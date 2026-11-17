import { sortedTalks } from '$lib/data/talks';
import type { Section } from '$lib/state/sections.svelte';

export function load() {
  const featured = sortedTalks.some((talk) => talk.featured);
  const sections: Section[] = [{ id: 'top', label: 'Top' }];
  if (featured) sections.push({ id: 'featured', label: 'Featured' });
  sections.push({ id: 'more', label: featured ? 'More Talks' : 'All Talks' });
  return { sections };
}
