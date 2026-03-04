import type { Section } from '$lib/state/sections.svelte';

export function load() {
  const sections: Section[] = [
    { id: 'hero', label: 'Top' },
    { id: 'about', label: 'About' },
    { id: 'research', label: 'Research' },
    { id: 'projects', label: 'Projects' }
  ];
  return { sections };
}
