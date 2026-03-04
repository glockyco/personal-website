import type { Section } from '$lib/state/sections.svelte';

export function load() {
  const sections: Section[] = [
    { id: 'top', label: 'Top' },
    { id: 'publications', label: 'Publications' },
    { id: 'applied', label: 'Applied Research' }
  ];
  return { sections };
}
