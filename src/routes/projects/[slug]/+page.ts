import { projects } from '$lib/data/projects';

export function entries() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function load() {
  return { sections: [] };
}
