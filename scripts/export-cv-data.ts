/**
 * Export CV data from TypeScript data modules to a JSON file for Typst.
 *
 * Run via: node --experimental-strip-types scripts/export-cv-data.ts
 * Output:  scripts/cv-data.json  (gitignored — temp file for Typst compile)
 */

import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Node can't resolve $lib aliases — import directly by path.
import { profile } from '../src/lib/data/links.ts';
import {
  researchSummary,
  workExperience,
  education,
  teaching,
  supervision,
  academicService,
  skills
} from '../src/lib/data/cv.ts';
import { publications } from '../src/lib/data/publications.ts';
import { projects } from '../src/lib/data/projects.ts';

// ── Publications: under-review first, then reverse-chronological ──────────────

const sortedPubs = [...publications].sort((a, b) => {
  if (a.status === 'under-review' && b.status !== 'under-review') return -1;
  if (a.status !== 'under-review' && b.status === 'under-review') return 1;
  return b.year - a.year;
});

// ── Teaching split ────────────────────────────────────────────────────────────

const labInstructors = teaching
  .filter((t) => t.role === 'instructor')
  .map((t) => ({
    course: t.course,
    institution: t.institution,
    semesterCount: t.semesters.length,
    topics: t.topics ?? null
  }));

const tutors = teaching
  .filter((t) => t.role === 'ta')
  .map((t) => ({
    course: t.course,
    institution: t.institution,
    semesterCount: t.semesters.length
  }));

// ── Supervision counts ────────────────────────────────────────────────────────

function counts(type: string) {
  const items = supervision.filter((s) => s.type === type);
  return { total: items.length, ongoing: items.filter((s) => s.status === 'ongoing').length };
}

// ── Service display strings ───────────────────────────────────────────────────

const reviewerItems = academicService
  .filter((s) => s.type === 'reviewer')
  .map((s) => ({ venue: s.venue, note: s.note ?? null }));

const subreviewerItems = academicService
  .filter((s) => s.type === 'subreviewer')
  .map((s) => ({ venue: s.venue, year: s.year ?? null, count: s.count ?? 1 }));

const outreachItems = academicService
  .filter((s) => s.type === 'outreach')
  .map((s) => ({ venue: s.venue, year: s.year ?? null, note: s.note ?? null }));

// ── Assemble output ───────────────────────────────────────────────────────────

const data = {
  profile: {
    name: profile.name,
    tagline: profile.tagline,
    affiliation: profile.affiliation,
    affiliationUrl: profile.affiliationUrl,
    orcid: profile.orcid,
    github: profile.github,
    linkedin: profile.linkedin
  },
  researchSummary,
  workExperience: workExperience.map((job) => ({
    title: job.title,
    company: job.company,
    location: job.location,
    startYear: job.startYear,
    endYear: job.endYear ?? null,
    highlights: job.highlights ?? []
  })),
  education: education.map((edu) => ({
    degree: edu.degree,
    field: edu.field,
    institution: edu.institution,
    location: edu.location,
    startYear: edu.startYear,
    endYear: edu.endYear ?? null,
    thesis: edu.thesis ?? null,
    theses: edu.theses ?? null,
    advisor: edu.advisor ?? null,
    gpa: null,
    distinction: edu.distinction ?? null,
    scholarship: edu.scholarship ?? null
  })),
  publications: sortedPubs
    .filter((pub) => pub.type !== 'thesis')
    .map((pub) => ({
      slug: pub.slug,
      title: pub.title,
      authors: pub.authors.map((a) => ({ name: a.name, isMe: a.isMe ?? false })),
      venue: pub.venue,
      venueShort: pub.venueShort,
      year: pub.year,
      status: pub.status,
      doi: pub.doi ?? null,
      arxivId: pub.arxivId ?? null,
      venueDisplay: pub.type === 'doctoral-symposium' ? pub.venue : pub.venueShort
    })),
  projects: projects
    .filter((p) => p.status !== 'inactive' && p.status !== 'archived')
    .map((p) => ({ slug: p.slug, title: p.title, tagline: p.tagline, techStack: p.techStack })),
  teaching: { labInstructors, tutors },
  supervision: {
    mscTheses: counts('msc-thesis'),
    mscProjects: counts('msc-project'),
    bscTheses: counts('bsc-thesis'),
    bscInterns: counts('bsc-intern'),
    hsInterns: counts('highschool-intern')
  },
  service: {
    reviewer: reviewerItems,
    subreviewer: subreviewerItems,
    outreach: outreachItems
  },
  skills: skills.map((s) => ({ category: s.category, items: s.items }))
};

const outPath = resolve(import.meta.dirname ?? '.', 'cv-data.json');
writeFileSync(outPath, JSON.stringify(data, null, 2));
console.log(`Exported CV data to ${outPath}`);
