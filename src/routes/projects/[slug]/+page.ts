import { error } from '@sveltejs/kit';
import { projects } from '$lib/data/projects';
import type { Section } from '$lib/state/sections.svelte';

export function entries() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function load({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) error(404, 'Project not found');

  const sections: Section[] = [{ id: 'top', label: 'Top' }];
  if (project.challenge) sections.push({ id: 'challenge', label: 'Challenge' });
  if (project.solution) sections.push({ id: 'solution', label: 'Solution' });
  if (project.liveUrl) sections.push({ id: 'demo', label: 'Demo' });
  if (project.architecture || project.technicalDecisions?.length)
    sections.push({ id: 'how-i-built-this', label: 'How I Built This' });
  sections.push({ id: 'tech-stack', label: 'Tech Stack' });
  if (project.metrics) sections.push({ id: 'impact', label: 'Impact' });

  return { project, sections };
}
