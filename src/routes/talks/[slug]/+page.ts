import { error } from '@sveltejs/kit';
import { papersOfTalk, talkPath, talks } from '$lib/data/talks';
import type { Section } from '$lib/state/sections.svelte';

export function entries() {
  return talks.filter((talk) => talkPath(talk)).map((talk) => ({ slug: talk.slug }));
}

export function load({ params }: { params: { slug: string } }) {
  const talk = talks.find((t) => t.slug === params.slug);
  if (!talk?.slides) error(404, 'Talk not found');

  const papers = papersOfTalk(talk);

  const sections: Section[] = [{ id: 'top', label: 'Top' }];
  if (talk.summary) sections.push({ id: 'summary', label: 'Summary' });
  sections.push({ id: 'slides', label: 'Slides' });
  if (papers.length) sections.push({ id: 'papers', label: 'Papers' });

  return { talk, slides: talk.slides, papers, sections };
}
