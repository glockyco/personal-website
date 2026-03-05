import type { Section } from '$lib/state/sections.svelte';

export function load() {
  const sections: Section[] = [{ id: 'top', label: 'Top' }];
  return { sections };
}
