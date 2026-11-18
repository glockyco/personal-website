import { z } from 'zod';
import { publications, type Publication } from './publications.ts';

// ── Schema ───────────────────────────────────────────────────────────────────

export const TalkSchema = z.object({
  slug: z.string(),
  title: z.string(),
  /** A seminar is a talk inside the speaker's own institution. Lists label it as such. */
  kind: z.enum(['talk', 'poster', 'invited', 'seminar']),
  event: z.string(),
  location: z.string().optional(),
  /** Day of the talk, as YYYY-MM-DD. */
  date: z.iso.date(),
  /** One line on the talk itself, such as how it was selected. */
  note: z.string().optional(),

  /** Two or three sentences for the talk's page. */
  summary: z.string().optional(),
  /** ≤155-char SERP-facing description. Falls back to `summary`. */
  metaDescription: z.string().max(160).optional(),

  /** Slugs of the publications the talk presents. */
  papers: z.array(z.string()),

  /** Path of the slides as a PDF. A talk with slides gets its own page. */
  slides: z.string().optional(),
  /** Path of a 1200×675 picture of the title slide, for the talk's card and link previews. */
  preview: z.string(),
  /** Repository of the slides' sources. */
  source: z.url().optional()
});

export type Talk = z.infer<typeof TalkSchema>;

// ── Data ──────────────────────────────────────────────────────────────────────

const rawTalks = [
  {
    slug: '2026-11-17-phd-seminar',
    title:
      'Formal Guarantees Meet Practical Constraints: From Semantic Differencing to Test Generalization for Regression Detection',
    kind: 'seminar' as const,
    event: 'SCCH PhD Seminar',
    location: 'Hagenberg, Austria',
    date: '2026-11-17',
    summary:
      'My PhD thesis topic in 20 minutes, around one question: how can symbolic analysis support regression detection without a complete proof? PASDA uses the partial results of an incomplete equivalence proof to give best-effort verdicts, and Teralizer uses the analysis to generalize existing unit tests into property-based tests.',
    metaDescription:
      'My PhD thesis topic in 20 minutes: how symbolic analysis supports regression detection without a complete proof, with PASDA and Teralizer.',
    papers: ['pasda', 'teralizer', 'teralizer-tool', 'icse-2024-doctoral-symposium'],
    slides: '/slides/glock_2026_phd_seminar.pdf',
    preview: '/slides/glock_2026_phd_seminar.png',
    source: 'https://github.com/glockyco/talks/tree/2026-11-17-phd-seminar/2026-11-17-phd-seminar'
  },
  {
    slug: '2024-06-07-benchmarking',
    title: 'Benchmarking of Software Systems',
    kind: 'seminar' as const,
    event: 'Study Planning, University of Klagenfurt',
    date: '2024-06-07',
    papers: [],
    slides: '/slides/glock_2024_benchmarking.pdf',
    preview: '/slides/glock_2024_benchmarking.png'
  },
  {
    slug: '2024-06-03-scch-research-day',
    title: 'Symbolic Execution-based Semantic Differencing',
    kind: 'invited' as const,
    event: '2nd SCCH Research Day',
    date: '2024-06-03',
    papers: ['pasda'],
    slides: '/slides/glock_2024_scch_research_day.pdf',
    preview: '/slides/glock_2024_scch_research_day.png'
  },
  {
    slug: '2024-04-16-icse-doctoral-symposium',
    title:
      'Aiding Developer Understanding of Software Changes via Symbolic Execution-based Semantic Differencing',
    kind: 'talk' as const,
    event: 'ICSE 2024 Doctoral Symposium',
    location: 'Lisbon, Portugal',
    date: '2024-04-16',
    note: 'Oral presentation and poster. Selected as 1 of 7 oral presentations from 35 accepted (55 submissions).',
    papers: ['icse-2024-doctoral-symposium'],
    slides: '/slides/glock_2024_icse_doctoral_symposium.pdf',
    preview: '/slides/glock_2024_icse_doctoral_symposium.png'
  }
];

// Validate at build time
export const talks: Talk[] = rawTalks.map((t) => TalkSchema.parse(t));

// A mistyped slug would drop a link without a trace, so it fails the build instead.
for (const talk of talks) {
  for (const slug of talk.papers) {
    if (!publications.some((publication) => publication.slug === slug)) {
      throw new Error(`Talk "${talk.slug}" names the unknown publication "${slug}"`);
    }
  }
}

/** Default display order: newest first. */
export const sortedTalks: Talk[] = [...talks].sort((a, b) => b.date.localeCompare(a.date));

export const talkKindLabels: Record<Talk['kind'], string> = {
  talk: 'Talk',
  poster: 'Poster',
  invited: 'Invited Talk',
  seminar: 'Seminar'
};

/** Path of the talk's own page, which only a talk with slides has. */
export function talkPath(talk: Talk): string | undefined {
  return talk.slides ? `/talks/${talk.slug}/` : undefined;
}

/** The talks that present the given publication, newest first. */
export function talksForPaper(slug: string): Talk[] {
  return sortedTalks.filter((talk) => talk.papers.includes(slug));
}

/** The publications a talk presents, in the order the talk names them. */
export function papersOfTalk(talk: Talk): Publication[] {
  return talk.papers.flatMap((slug) => publications.filter((p) => p.slug === slug));
}

/** The talk's day for display, such as "17 November 2026". */
export function formatTalkDate(talk: Talk): string {
  return new Date(`${talk.date}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });
}
