import { projects } from '$lib/data/projects';

export function entries() {
  return projects.map((p) => ({ slug: p.slug }));
}
