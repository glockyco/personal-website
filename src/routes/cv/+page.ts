import type { Section } from '$lib/state/sections.svelte';

export function load() {
  const sections: Section[] = [
    { id: 'top', label: 'Top' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'continuing-education', label: 'Continuing Ed.' },
    { id: 'publications', label: 'Publications' },
    { id: 'projects', label: 'Projects' },
    { id: 'teaching', label: 'Teaching' },
    { id: 'service', label: 'Service & Outreach' },
    { id: 'skills', label: 'Skills' }
  ];
  return { sections };
}
