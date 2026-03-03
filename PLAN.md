# Personal Website Plan

## Profile Summary

**Current:** PhD student/researcher (finishing soon, expected Q4 2026)
**Primary audience:** Academia (hiring committees, postdoc supervisors, collaborators)
**Secondary audience:** Industry (technical hiring managers, research scientist roles)
**Location:** Hagenberg / Linz (Austria) or Remote
**Experience:** 6 years industry web development (MICROLAB), 3.5 years applied research (AIST), PhD since 2021

> **Note:** The research statement and professional summary below are placeholders.
> These must be written before or alongside Phase 1 — they are the site's center of gravity.
> Every homepage design decision depends on this content being real.

### Research Statement

_(To be written — this is the highest priority content task)_

My research focuses on [empirical software engineering / mining software repositories], exploring how [data mining and data engineering approaches] can [improve software quality and developer productivity]. I build tools and pipelines to extract insight from large-scale software data, combining backend engineering with empirical research methods.

### Role Targeting

Open to:

- Postdoctoral research positions
- Research Scientist / Applied Scientist positions
- Senior Software Engineer roles (data mining, data engineering, backend development, developer tools)

### TL;DR Professional Summary

_(To be written — must be specific and differentiating, not generic SE PhD boilerplate)_

PhD researcher with X years of software engineering experience. Published in top SE venues (JSS, ICSE). Ships production software used by real communities. Combines academic rigor with practical engineering.

### What to Showcase

**Academic:**

- 4 peer-reviewed publications (2 first-author JSS, 1 second-author JSS, 1 ICSE DS oral)
  - Note: MSc thesis exists on Zenodo/Scholar but is NOT counted as a peer-reviewed publication
- Presentations and talks (slides integrated with paper detail pages)
- Research tools: PASDA (semantic differencing), Teralizer (test generalization) — explained on paper detail pages, not listed separately under /projects
- Datasets / replication packages released (all first-authored works)
- Teaching: 7 semesters as main instructor (SE I: 3×, SE II: 4×) — on /cv, not a separate page
- Academic service (reviewing: TOSEM; subreview: FSE, ICSE, SANER)
- AIST applied research projects (FFG grants) — compact card grid on /research, linking to AIST website

**Technical/Hobby (on /projects):**

- Erenshor ecosystem: interactive maps (SvelteKit + deck.gl), spreadsheet tool, wiki bot, mods (C# / MelonLoader)
- Ancient Kingdoms ecosystem: compendium website, modding
- 10-Man Idle: wiki-like website
- One detail page per ecosystem (/projects/[slug])
- Framing: curiosity, digging deep, helping the community, presenting results clearly for non-technical audiences

**Professional Background (on /cv):**

- 6 years web development at MICROLAB (PHP, jQuery)
- 3.5 years applied research at AIST (data engineering, security intelligence, AR)
- 7 semesters main instructor (Teaching Assistant roles in background only — grading/feedback, no direct student contact; on CV but not featured)
- Student supervision:
  - 4 completed BSc theses
  - 2 completed MSc projects (course, not thesis)
  - 3 ongoing MSc theses
  - 3 BSc-level summer interns (AIST)
  - 3 high-school interns (AAU IT-Ferialpraktikum / FFG Schüler:innenpraktika)

---

## Site Structure

### Sitemap

```
/                           # Home / Landing (research identity first)
├── /research               # Publications list + AIST projects card grid
│   └── /research/[slug]    # Paper detail (includes slides/talks, tool links)
├── /teaching               # NOT a separate page — folded into /cv
├── /projects               # Hobby project grid (Erenshor, AK, 10-Man Idle)
│   └── /projects/[slug]    # Project detail (one per ecosystem)
├── /cv                     # CV page (education, experience, teaching, supervision, service)
├── /uses                   # Tools and daily workflow
└── /404                    # Custom 404 page
```

Contact is not a separate page — social links and email appear in the footer and floating icon strip.

**Optional future routes:**

- `/now` - Current focus / what I'm working on

**Planned routes (promoted from optional):**

- `/uses` - Tools and daily workflow

### Core Sections

| Section      | Purpose                | Content                                                                                                                            |
| ------------ | ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| **Home**     | First impression       | Hero (name, tagline, affiliation, ORCID), stats row, research focus, selected publications, featured projects (Erenshor + AK only) |
| **Research** | Academic credibility   | 4 peer-reviewed papers with full metadata; AIST projects compact card grid (links out)                                             |
| **Teaching** | —                      | Not a separate page. Folded into /cv.                                                                                              |
| **Projects** | Technical/hobby skills | Erenshor, Ancient Kingdoms, 10-Man Idle — one card per ecosystem, detail pages                                                     |
| **CV**       | Formal credentials     | Traditional view (Phase 1); interactive timeline (Phase 3); teaching, supervision, service, awards, PDF download                   |
| **Uses**     | Daily workflow         | Icon grid with category filters and optional prose; tools across editor, AI, terminal, DB, etc.                                    |
| **Contact**  | Reachability           | Email, GitHub, LinkedIn, Scholar, ORCID, Semantic Scholar, Institution — in footer and floating icon strip only                    |

### Navigation

**Desktop:**

```
┌─────────────────────────────────────────────────────────────────┐
│  [Name]   Research  Projects  CV  Uses                          │
└─────────────────────────────────────────────────────────────────┘
```

- Nav items: Research, Projects, CV, Uses (Teaching folded into CV, not a nav item)
- No "Contact" nav item — contact links live in footer and floating icon strip
- Floating icon strip (left side, vertically centred): GitHub, Scholar, LinkedIn, Email, divider, theme toggle
- Theme toggle opens a popover with 6 theme swatches (indigo dark/light, navy dark/light, warm dark/light)
- Section dots (right side, vertically centred): one dot per page section, click to jump, scroll spy
- Back-to-top chevron above section dots, appears after scrolling 200px
- Sticky nav: transparent at top, frosted glass background materialises on scroll
- Links open in same tab (browser default behavior)

**Mobile (≤768px):**

- Hamburger menu (animated → X) opens a dropdown with nav links
- Floating icon strip moves to bottom-right horizontal bar
- Section dots hidden on mobile

**Footer:**

- Name and tagline
- Social links (GitHub, LinkedIn, Scholar, ORCID, Email)
- Site navigation links
- Copyright and last updated date

**Breadcrumbs (on detail pages):**

```
Home > Research > Paper Title
Home > Projects > Project Name
```

### Design Decisions

| Decision                                            | Rationale                                                                                                                   |
| --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **No filters (deferred)**                           | Too few items now (4 papers, 3 projects); schemas include filterable fields so UI can be added later without data migration |
| **No carousels**                                    | Poor UX, accessibility issues; use grids instead                                                                            |
| **Talks/Slides**                                    | Part of Research detail pages, not a separate page                                                                          |
| **Teaching**                                        | Part of CV page, not a separate page                                                                                        |
| **No contact page**                                 | Six links don't justify a route; email + social icons in footer and floating icon strip                                     |
| **No audience toggle**                              | Clean navigation lets users self-select                                                                                     |
| **Same-tab links**                                  | Respect browser defaults (Ctrl+Click for new tab)                                                                           |
| **Theme toggle in floating strip**                  | Always accessible without cluttering the nav                                                                                |
| **Traditional CV as alternative**                   | Recruiters/committees need scannable format                                                                                 |
| **Manual data entry**                               | Better than fragile API scrapers                                                                                            |
| **Static metrics ("X+")**                           | Avoids API failures, clearly not real-time                                                                                  |
| **Research leads homepage**                         | Primary audience is academia; research statement and publications come before projects                                      |
| **PASDA/Teralizer under /research only**            | They are research outputs tied to papers, not standalone hobby projects; explained on paper detail pages                    |
| **AIST projects as compact card grid on /research** | External projects, link to AIST website; no detail pages needed                                                             |
| **Featured projects = Erenshor + AK only**          | 10-Man Idle on /projects but not homepage; two cards is cleaner                                                             |
| **MSc thesis not counted as publication**           | Not peer-reviewed in same sense; listed on Scholar/Zenodo but excluded from publication count                               |
| **Default theme: indigo-light**                     | More inviting as default; dark/other themes available via theme picker                                                      |
| **Stats row on homepage**                           | Safe stats: 4 publications, 7 semesters teaching, research tools, supervised students — values TBD                          |

---

## User Journeys

### Academic Visitor

Professor, postdoc, hiring committee member evaluating research credentials.

```
Home → Research → Paper Detail → [Read PDF / Copy Citation]
                              ↘ CV → [Download PDF]
```

### Industry Recruiter

Technical recruiter, hiring manager assessing technical skills.

```
Home → Projects → Project Detail → [View Live Demo]
                               ↘ "How I Built This"
     → CV → [Download PDF]
```

### Developer / Community Member

Erenshor player, modder, open source contributor.

```
Home → Projects → Erenshor Maps → [Embedded Demo]
                               ↘ GitHub
```

### Direct Link Visitor

Someone who received a link to a specific paper/project.

```
Paper/Project Detail → [View content]
                    ↘ Home → Explore other work
```

---

## Technology Stack

### Recommended Stack

```
SvelteKit + Tailwind CSS + TypeScript
                    ↓
             adapter-static
                    ↓
           Cloudflare Pages
```

**Rationale:**

- Already proficient in SvelteKit (from Erenshor maps)
- Tailwind + shadcn-svelte (already using)
- Static output = fast, cheap, secure
- Cloudflare = already using, free, fast CDN

### Alternatives Considered

| Option      | Pros                                     | Cons                             |
| ----------- | ---------------------------------------- | -------------------------------- |
| **Astro**   | Content-focused, island architecture     | Learning curve, less familiar    |
| **Hugo**    | Blazing fast builds, academic themes     | Go templating, less flexible     |
| **Quarto**  | Popular in academia, Jupyter integration | Less control, academic-only feel |
| **Next.js** | Industry standard                        | Overkill, React ecosystem        |

### Hosting

**Cloudflare Pages (Recommended)**

- Already using for Erenshor maps
- Free tier is generous
- Global CDN
- Easy custom domain
- Good analytics (privacy-friendly)

### Domain

- `firstname-lastname.com` or `.dev` / `.io`
- Professional, memorable
- Avoid institution domains (not portable)

---

## Project Structure

```
src/
├── routes/
│   ├── +page.svelte              # Homepage
│   ├── +layout.svelte            # Global layout, nav, footer
│   ├── research/
│   │   ├── +page.svelte          # Publications list
│   │   └── [slug]/+page.svelte   # Paper detail
│   ├── projects/
│   │   ├── +page.svelte          # Project grid
│   │   └── [slug]/+page.svelte   # Project detail
│   ├── cv/+page.svelte           # CV page
│   └── uses/+page.svelte         # Uses / tools page
├── lib/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.svelte
│   │   │   ├── MobileNav.svelte
│   │   │   ├── Footer.svelte
│   │   │   └── PageHeader.svelte
│   │   ├── home/
│   │   │   ├── HeroSection.svelte
│   │   │   ├── FeaturedPublications.svelte
│   │   │   ├── FeaturedProjects.svelte
│   │   │   └── StatsGrid.svelte        # Phase 4 (nice-to-have)
│   │   ├── research/
│   │   │   ├── PublicationCard.svelte
│   │   │   ├── PublicationList.svelte
│   │   │   ├── PaperHeader.svelte
│   │   │   ├── FigureGrid.svelte       # Phase 3 (grid, not carousel)
│   │   │   ├── CitationBlock.svelte
│   │   │   └── PdfViewer.svelte        # Phase 3 (lazy-loaded, collapsible)
│   │   ├── projects/
│   │   │   ├── ProjectCard.svelte
│   │   │   ├── ProjectGrid.svelte
│   │   │   ├── ProjectHero.svelte
│   │   │   ├── DemoEmbed.svelte
│   │   │   ├── HowIBuiltThis.svelte
│   │   │   └── TechStackTags.svelte
│   │   ├── cv/
│   │   │   ├── TimelineView.svelte     # Phase 3
│   │   │   ├── DetailPanel.svelte
│   │   │   ├── TeachingSection.svelte
│   │   │   └── SkillsSection.svelte
│   │   ├── uses/
│   │   │   ├── ToolGrid.svelte         # Icon grid with category filter
│   │   │   └── ToolCard.svelte         # Individual tool icon + optional prose
│   │   └── shared/
│   │       ├── ActionButton.svelte
│   │       ├── StatusBadge.svelte
│   │       ├── TagList.svelte
│   │       └── DarkModeToggle.svelte
│   └── data/
│       ├── publications.ts       # Structured publication data
│       ├── projects.ts           # Structured project data
│       ├── cv.ts                 # CV data
│       ├── uses.ts               # Tools inventory
│       └── links.ts              # Social/academic links
```

> This is a reference, not a contract — components emerge during implementation.
> No `content/` directory. Project case studies live in structured TypeScript
> data or directly in Svelte components.

---

## Content Management

All content managed via TypeScript files with Zod validation at build time. Project case studies are structured data, not Markdown files.

Schemas include filterable fields (tags, year, type, venue) even though no filter UI is exposed yet. This allows filter UI to be added in future without data migration.

### Publication Schema

```typescript
// src/lib/data/publications.ts
export type Author = {
  name: string;
  url?: string; // Link to their website/profile
  isMe?: boolean; // Highlight own name
};

export type Publication = {
  slug: string;
  title: string;
  authors: Author[];
  venue: string;
  year: number;
  abstract: string;
  tldr: string; // 2-3 sentence summary

  // Classification
  type: 'journal' | 'conference' | 'workshop' | 'doctoral-symposium' | 'thesis' | 'preprint';
  status: 'published' | 'in-press' | 'under-review' | 'preprint';
  authorPosition: 'first' | 'co-first' | 'contributing' | 'senior';

  // Academic metadata
  award?: string; // "Best Paper", "Honorable Mention"
  acceptanceRate?: string; // "26%"
  citationCount?: number; // Manual update

  // Links
  pdf?: string;
  doi?: string;
  arxiv?: string;
  scholarUrl?: string; // Google Scholar link for this paper
  dataset?: string;

  tags: string[]; // filterable when UI supports it
  links?: {
    demo?: string;
    code?: string;
    slides?: string;
    video?: string;
  };

  // Related content (manual curation by slug)
  relatedPapers?: string[];
  relatedProjects?: string[];

  // Key figures for gallery (grid layout, not carousel)
  figures?: {
    src: string;
    alt: string;
    caption: string;
  }[];
};
```

### Project Schema

```typescript
// src/lib/data/projects.ts
export type Project = {
  slug: string;
  title: string;
  tagline: string;
  description: string; // The challenge
  solution: string; // The solution
  status: 'active' | 'maintained' | 'archived';

  // Media
  heroImage: string;
  screenshots?: string[];

  // Links
  liveUrl?: string;
  githubUrl?: string;
  steamGuideUrl?: string;

  // Technical details
  techStack: string[];

  // "How I Built This" content
  architecture?: string; // Markdown description
  technicalDecisions?: {
    decision: string;
    rationale: string;
  }[];

  // Reflection (shows growth mindset)
  whatIdDoDifferently?: string;

  // Complexity indicators
  metrics?: {
    linesOfCode?: string; // "~15,000"
    components?: number;
    dataScale?: string; // "500k+ entities"
    users?: string; // "X monthly active users"
  };

  // Performance evidence
  performance?: {
    lighthouseScore?: number;
    loadTime?: string;
    optimizations?: string[];
  };

  // Related content
  relatedPapers?: string[];
  relatedProjects?: string[];
};
```

### CV Data Structures

```typescript
// src/lib/data/cv.ts
export type Education = {
  degree: string;
  field: string;
  institution: string;
  location: string;
  startYear: number;
  endYear?: number; // undefined = present
  thesis?: string;
  advisor?: string;
  description?: string;
};

export type WorkExperience = {
  title: string;
  company: string;
  location: string;
  startYear: number;
  endYear?: number;
  description: string;
  highlights?: string[];
};

export type TeachingExperience = {
  course: string;
  role: 'instructor' | 'ta' | 'guest-lecturer';
  institution: string;
  semesters: string[]; // ["Fall 2022", "Spring 2023"]
  enrollment?: number;
  evaluationScore?: string; // "4.5/5.0"
  description?: string;
};

export type Supervision = {
  name: string;
  type: 'bsc-thesis' | 'msc-thesis' | 'msc-project' | 'bsc-intern' | 'highschool-intern';
  status: 'completed' | 'ongoing';
  year?: number; // completion year (if completed)
  topic?: string;
  note?: string; // e.g. "AIST summer internship", "FFG Schüler:innenpraktikum"
};

export type AcademicService = {
  type: 'reviewer' | 'subreviewer' | 'committee' | 'organizer';
  venue: string;
  year: number;
  note?: string; // "As subreviewer for supervisor"
};

export type Award = {
  title: string;
  organization: string;
  years: string; // "2019-2022"
  description?: string;
};

export type Skill = {
  category: string; // "Languages", "Frameworks", "Tools"
  items: string[];
};
```

### Uses / Tool Schema

```typescript
// src/lib/data/uses.ts
export type ToolCategory =
  | 'editor'
  | 'ai'
  | 'terminal'
  | 'version-control'
  | 'database'
  | 'notes'
  | 'communication'
  | 'wiki'
  | 'platform';

export type Tool = {
  name: string;
  category: ToolCategory;
  icon: string; // path to SVG/PNG icon, or simple-icons slug
  url?: string;
  usage?: string; // optional one-liner: how/why I use this — like a paper TL;DR
  // shown below the icon or on hover; not every tool needs one
};

export const tools: Tool[] = [
  { name: 'VS Code', category: 'editor', icon: 'vscode', url: 'https://code.visualstudio.com' },
  { name: 'Zed', category: 'editor', icon: 'zed', url: 'https://zed.dev' },
  {
    name: 'JetBrains IDEs',
    category: 'editor',
    icon: 'jetbrains',
    url: 'https://www.jetbrains.com'
  },
  { name: 'Claude', category: 'ai', icon: 'anthropic', url: 'https://claude.ai' },
  { name: 'Opencode', category: 'ai', icon: 'opencode', url: 'https://opencode.ai' },
  { name: 'iTerm2', category: 'terminal', icon: 'iterm2', url: 'https://iterm2.com' },
  { name: 'Fork', category: 'version-control', icon: 'fork', url: 'https://git-fork.com' },
  {
    name: 'PostgreSQL',
    category: 'database',
    icon: 'postgresql',
    url: 'https://www.postgresql.org'
  },
  { name: 'RemNote', category: 'notes', icon: 'remnote', url: 'https://www.remnote.com' },
  { name: 'Discord', category: 'communication', icon: 'discord', url: 'https://discord.com' },
  { name: 'wiki.gg', category: 'wiki', icon: 'wikigg', url: 'https://wiki.gg' },
  {
    name: 'CrossOver',
    category: 'platform',
    icon: 'crossover',
    url: 'https://www.codeweavers.com/crossover'
  }
];
```

### Academic Links

```typescript
// src/lib/data/links.ts
export const academicLinks = {
  orcid: '0000-0002-0152-8611',
  semanticScholar: 'https://www.semanticscholar.org/author/Johann-Glock/2266466770',
  googleScholar: 'https://scholar.google.com/citations?user=33UUDmcAAAAJ',
  institution: 'https://www.aau.at/en/isys/serg/team/glock-johann/',
  github: 'https://github.com/glockyco',
  linkedin: '...'
};
```

---

## UI/UX Design

### Design Principles

1. **Clean and professional** - Both academia and tech value clarity
2. **Readable** - Good typography, proper line lengths (60-80 chars)
3. **Fast** - Static = fast by default
4. **Accessible** - Semantic HTML, keyboard nav, good contrast
5. **Mobile-friendly** - Responsive, touch-friendly

### Page Layouts

**Homepage:**

```
┌─────────────────────────────────────────────────────────────────┐
│ [NAV: Johann Glock · Research · Projects · CV · Uses]           │
│ [floating icon strip: GitHub · Scholar · LinkedIn · Email · ☀]  │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────┐  Johann Glock                                        │
│  │ PHOTO  │  [Specific research identity — to be written]        │
│  │        │  PhD Researcher · University of Klagenfurt           │
│  └────────┘  ORCID: 0000-0002-0152-8611 · Hagenberg, Austria    │
│              [View Research] [Download CV] [See Projects]        │
├─────────────────────────────────────────────────────────────────┤
│  STATS ROW                                                       │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│  │ 4            │ │ 7            │ │ 2            │             │
│  │ Publications │ │ Semesters    │ │ Research     │             │
│  │              │ │ Teaching     │ │ Tools        │             │
│  └──────────────┘ └──────────────┘ └──────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│  RESEARCH FOCUS                                                  │
│  [Specific, differentiated research statement — to be written]   │
├─────────────────────────────────────────────────────────────────┤
│  SELECTED PUBLICATIONS                                           │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Paper Title                         2024 | JSS | First Auth ││
│  │ TL;DR...                                        [PDF] [Cite] ││
│  └─────────────────────────────────────────────────────────────┘│
│  [→ All Publications]                                            │
├─────────────────────────────────────────────────────────────────┤
│  FEATURED PROJECTS                                               │
│  ┌─────────────────┐ ┌─────────────────┐                        │
│  │ Erenshor        │ │ Ancient Kingdoms│                        │
│  │ (ecosystem)     │ │ (ecosystem)     │                        │
│  └─────────────────┘ └─────────────────┘                        │
│  [→ All Projects]                                                │
├─────────────────────────────────────────────────────────────────┤
│ [FOOTER: name · tagline · social links · nav · copyright]        │
└─────────────────────────────────────────────────────────────────┘
```

**Research page:**

```
┌─────────────────────────────────────────────────────────────────┐
│ [NAV]                                                    [dots] │
├─────────────────────────────────────────────────────────────────┤
│  Research                               (h1, no intro text yet) │
├──────────────────────────── id="publications" ─────────────────┤
│  PUBLICATIONS                                                   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ [Under Review]  Teralizer: Semantics-Based...               ││
│  │ J. Glock, C. Bauer, M. Pinzger · arXiv:2512.14475 · 2025   ││
│  │ TL;DR...                                                    ││
│  │ [PDF ↓] [Preprint] [Code] [Dataset]                         ││
│  └─────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ [JSS] [2024]  PASDA: A Partition-based...                   ││
│  │ J. Glock, J. Pichler, M. Pinzger · JSS · 2024              ││
│  │ TL;DR...                                                    ││
│  │ [PDF ↓] [DOI] [Code] [Dataset]                              ││
│  └─────────────────────────────────────────────────────────────┘│
│  ... (api-evolution · icse-ds · msc-thesis)                     │
│  All publications incl. thesis; under-review first, then        │
│  reverse-chronological. Same card style as homepage.            │
├──────────────────────────── id="applied" ──────────────────────┤
│  APPLIED RESEARCH                                               │
│  Applied research conducted at FH Hagenberg as part of          │
│  FFG-funded projects (2018–2021).                               │
│                                                                 │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │ [data-eng]      │ │ [security]      │ │ [ar]            │   │
│  │ KIMIKU          │ │ SOC-Toolkit     │ │ Rudy Games      │   │
│  │ Short desc      │ │ Short desc      │ │ Short desc      │   │
│  │ [→ AIST]        │ │ [→ AIST]        │ │ [→ AIST]        │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
│  5 cards total; compact grid; links out — no detail pages.      │
├─────────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                        │
└─────────────────────────────────────────────────────────────────┘
```

Section dots: Publications · Applied Research

**Paper detail page:**

```
┌─────────────────────────────────────────────────────────────────┐
│ [NAV]                                                    [dots] │
├─────────────────────────────────────────────────────────────────┤
│  ← Research                                                     │
├─────────────────────────────────────────────────────────────────┤
│  [Under Review] / [JSS] [2024]                   (badges)       │
│  Paper Title Here                                (h1)           │
│  J. Glock (bold), Coauthor A (linked), Coauthor B (linked)      │
│  Venue · Year  ·  acceptance rate (muted, if set)               │
│                                                                 │
│  [PDF ↓] [DOI] [Preprint] [Code] [Dataset] [Overleaf]          │
│  (each button shown only if the data field is set)              │
├──────────────────────────── id="tldr" ─────────────────────────┤
│  TL;DR  (section only rendered if pub.tldr is set)              │
│  2–3 sentence summary...                                        │
├──────────────────────────── id="abstract" ─────────────────────┤
│  Abstract                                                       │
│  Full abstract text...                                          │
├──────────────────────────── id="presentations" ────────────────┤
│  Presentations  (section only rendered if presentations set)    │
│  · Talk @ ICSE 2024 Doctoral Symposium, Lisbon · [Slides ↓]    │
│  · Privatissima, Klagenfurt · [Slides ↓]                       │
├──────────────────────────── id="tags" ─────────────────────────┤
│  Tags                                                           │
│  [semantic differencing] [symbolic execution] [program analysis]│
├─────────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                        │
└─────────────────────────────────────────────────────────────────┘
```

Section dots: TL;DR (if set) · Abstract · Presentations (if set) · Tags

Deferred to later:

- Inline PDF / slides viewer (lazy-loads pdf.js, collapsed by default)
- BibTeX / citation copy block
- Key figures grid
- Related papers / related projects section

**Projects page:**

```
┌─────────────────────────────────────────────────────────────────┐
│ [NAV]                                                           │
├─────────────────────────────────────────────────────────────────┤
│  Projects                                                       │
│  Things I've built outside of research — community tools,       │
│  game modding ecosystems, and hobby sites                       │
├─────────────────────────────────────────────────────────────────┤
│  (No filters needed — 3 cards, one per ecosystem)               │
│  ┌───────────────────┐ ┌───────────────────┐ ┌───────────────┐ │
│  │ ┌───────────────┐ │ │ ┌───────────────┐ │ │ ┌───────────┐ │ │
│  │ │  Screenshot   │ │ │ │  Screenshot   │ │ │ │Screenshot │ │ │
│  │ └───────────────┘ │ │ └───────────────┘ │ │ └───────────┘ │ │
│  │ Erenshor          │ │ Ancient Kingdoms  │ │ 10-Man Idle  │ │
│  │ Maps, mods, wiki, │ │ Compendium, mods  │ │ Wiki-like    │ │
│  │ bots, guides      │ │ Python pipelines  │ │ site         │ │
│  │ [SvelteKit][C#]   │ │ [SvelteKit][Py]   │ │ [SvelteKit]  │ │
│  │ ● Active          │ │ ● Active          │ │ ● Active     │ │
│  └───────────────────┘ └───────────────────┘ └───────────────┘ │
├─────────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                        │
└─────────────────────────────────────────────────────────────────┘
```

**Project detail page:**

```
┌─────────────────────────────────────────────────────────────────┐
│ [NAV]                                                           │
├─────────────────────────────────────────────────────────────────┤
│  Home > Projects > Project Name                                 │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐│
│  │                    Hero Screenshot                          ││
│  └─────────────────────────────────────────────────────────────┘│
│  Erenshor Interactive Maps                         ● Active     │
│  Community tools for game exploration                           │
│                                                                 │
│  [Live Demo] [GitHub] [Steam Guide]                             │
├─────────────────────────────────────────────────────────────────┤
│  THE CHALLENGE                                                  │
│  Players needed better tools for navigation and discovery...   │
├─────────────────────────────────────────────────────────────────┤
│  THE SOLUTION                                                   │
│  Built a data pipeline that extracts game data and presents... │
├─────────────────────────────────────────────────────────────────┤
│  DEMO                                                           │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              [Embedded iframe of live maps]                 ││
│  └─────────────────────────────────────────────────────────────┘│
│                                    [Open in new tab →]          │
├─────────────────────────────────────────────────────────────────┤
│  ▶ HOW I BUILT THIS (expandable)                                │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ ARCHITECTURE                                                ││
│  │ [Diagram: MelonMod → Python → SQLite → SvelteKit → deck.gl]││
│  │                                                             ││
│  │ TECHNICAL DECISIONS                                         ││
│  │ • deck.gl over Leaflet: 500k+ entities needed WebGL        ││
│  │ • SQLite: No server needed, ships as static file           ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  TECH STACK                                                     │
│  [SvelteKit] [TypeScript] [deck.gl] [SQLite] [Python] [C#]     │
├─────────────────────────────────────────────────────────────────┤
│  IMPACT                                                         │
│  • X monthly active users                                       │
│  • Community adoption by Z                                      │
├─────────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                        │
└─────────────────────────────────────────────────────────────────┘
```

**CV page:**

```
┌─────────────────────────────────────────────────────────────────┐
│ [NAV]                                                           │
├─────────────────────────────────────────────────────────────────┤
│  Curriculum Vitae                          [⬇ Download PDF]     │
│                                                                 │
│  View as: [● Timeline] [○ Traditional]   ← prominent toggle     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  TIMELINE VIEW (interactive, Phase 3)                           │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Education ═══════════════════                               ││
│  │ Work      ═══════════    ════════════                       ││
│  │ Research      ══════════════════════                        ││
│  │ Projects          ════  ════  ══════                        ││
│  │ ──────────────────────────────────────────────────────────  ││
│  │ 2018    2019    2020    2021    2022    2023    2024    Now ││
│  └─────────────────────────────────────────────────────────────┘│
│  ⌨ Keyboard navigable · 🔊 Screen reader accessible             │
│  Click any item to see details                                  │
├─────────────────────────────────────────────────────────────────┤
│  [Selected item details appear here]                            │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ PhD in Computer Science                      2020 - Present ││
│  │ University Name                                             ││
│  │ Research focus: ...                                         ││
│  │ [View related publications →]                               ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ─────────────────────────────────────────────────────────────  │
│                                                                 │
│  TRADITIONAL VIEW (always available, default for Phase 1-2)    │
│  Sections: Education | Experience | Teaching | Service |       │
│            Awards | Skills | Publications                       │
│                                                                 │
│  TEACHING                                                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Course Name                                    TA · 2022-23 ││
│  │ Institution · X students · 4.5/5.0 evaluation               ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  ACADEMIC SERVICE                                               │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ • Reviewer: TOSEM (2024)                                    ││
│  │ • Subreviewer: ICSE, FSE, SANER, TOSEM                      ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│  AWARDS                                                         │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ • Leistungsstipendium · University · 2019-2022              ││
│  └─────────────────────────────────────────────────────────────┘│
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                        │
└─────────────────────────────────────────────────────────────────┘
```

_(No dedicated contact page — email and social links appear in footer and nav header icons only.)_

**Uses page:**

```
┌─────────────────────────────────────────────────────────────────┐
│ [NAV]                                                           │
├─────────────────────────────────────────────────────────────────┤
│  Uses                                                           │
│  Tools and software I use day-to-day                            │
├─────────────────────────────────────────────────────────────────┤
│  [Short intro paragraph — overall setup, OS, workflow context,  │
│   general philosophy. To be written.]                           │
├─────────────────────────────────────────────────────────────────┤
│  [All] [Editors] [AI] [Terminal] [Database] [Notes]             │
│        [Communication] [Version Control] [OS / Platform]        │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐        │
│  │ icon │ │ icon │ │ icon │ │ icon │ │ icon │ │ icon │        │
│  │VSCode│ │ Zed  │ │JBrain│ │Claude│ │iTerm │ │ Fork │        │
│  │one-  │ │liner │ │      │ │      │ │      │ │      │        │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘        │
│  ...                                                            │
├─────────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                        │
└─────────────────────────────────────────────────────────────────┘
```

### Uses — Tool Inventory

| Category              | Tools                                                  |
| --------------------- | ------------------------------------------------------ |
| **Editors / IDEs**    | VS Code, Zed, JetBrains IDEs (IntelliJ, PyCharm, etc.) |
| **AI**                | Claude, Opencode                                       |
| **Terminal**          | iTerm2                                                 |
| **Version Control**   | Fork (Git UI), git CLI                                 |
| **Database**          | PostgreSQL                                             |
| **Knowledge / Notes** | RemNote                                                |
| **Communication**     | Discord                                                |
| **Wiki**              | wiki.gg (MediaWiki-based)                              |
| **OS / Platform**     | CrossOver (running Windows apps on macOS)              |

_Two levels of prose: (1) a short page-level intro about overall setup and workflow philosophy — to be written; (2) optional per-tool one-liners (`usage` field) in the style of paper TL;DRs: "here's how/why I use this." Not every tool needs one._

### Color Scheme

- **Default: indigo-light** — more inviting as landing experience; dark/other themes available via picker
- **6 themes total:** indigo-dark, indigo-light, navy-dark, navy-light, warm-dark, warm-light
- Theme picker: popover with 6 swatches, opened from floating icon strip
- CSS custom properties on `[data-theme]` attribute on `<html>`
- Accent: indigo tones (brand consistency with Erenshor maps)

### Typography

- Clean sans-serif: Inter, Geist, or Source Sans Pro
- Monospace for code: JetBrains Mono, Fira Code
- Good sizing and spacing

---

## Erenshor/AK Case Study

This is a **significant portfolio piece** demonstrating:

- Reverse engineering / data mining
- Database design (SQLite pipeline)
- Full-stack web development (SvelteKit)
- Interactive visualization (deck.gl, Leaflet)
- Community building (wiki, guides)
- Self-directed initiative

### Presentation Structure

```
┌─────────────────────────────────────────────────┐
│ Erenshor Interactive Maps                       │
│ A community tool for game exploration           │
├─────────────────────────────────────────────────┤
│ [Screenshot of world map]                       │
├─────────────────────────────────────────────────┤
│ THE CHALLENGE                                   │
│ Players needed better tools for navigation      │
│ and discovery in a complex game world...        │
│                                                 │
│ THE SOLUTION                                    │
│ Built a data pipeline that extracts game data   │
│ and presents it as interactive maps...          │
│                                                 │
│ TECHNICAL DETAILS                               │
│ • MelonLoader mods (C#) for data extraction    │
│ • Python build pipeline → SQLite               │
│ • SvelteKit + deck.gl for visualization        │
│ • Cloudflare Workers for hosting               │
│                                                 │
│ IMPACT                                          │
│ • X monthly users                               │
│ • Community adoption...                         │
│                                                 │
│ [Live Demo] [GitHub] [Steam Guide]              │
└─────────────────────────────────────────────────┘
```

---

## Technical Implementation Details

### SEO

- Proper meta tags per page
- Open Graph for social sharing
- JSON-LD structured data (Person, Article, ScholarlyArticle)
- Sitemap generation
- robots.txt

### Analytics

- Cloudflare Analytics (free, privacy-friendly) - Recommended
- Or Plausible (paid, very privacy-friendly)
- Avoid Google Analytics (privacy concerns, overkill)

### PDF Generation for CV

Options:

1. **Manual** (Recommended initially): Maintain separate PDF, link to it
2. **Automated**: Use Puppeteer/Playwright to render CV page as PDF
3. **LaTeX**: Maintain CV in LaTeX, export PDF

### Image Optimization

- Use **WebP** format (fallback to JPEG/PNG for older browsers)
- Responsive images with `srcset` for different screen sizes
- Lazy load below-fold images with `loading="lazy"`
- Consider `@sveltejs/enhanced-img` for automatic optimization
- Keep hero images optimized (aim for <200KB)

### Font Loading

- Use **@fontsource** packages for self-hosted fonts (privacy, reliability)
- Apply `font-display: swap` to prevent invisible text during load
- Subset fonts to Latin characters to reduce file size
- Preload critical fonts in `<head>`

### Build-time Validation

- Use **Zod schemas** to validate all content data (publications, projects, CV)
- Fail build on invalid content (catches errors before deploy)
- Validate required fields, URL formats, date ranges
- Type-safe content with TypeScript inference from Zod schemas

### Error Handling

- **Custom 404 page** with navigation back to main sections
- **Loading states** for embedded iframes (maps, demos)
- **Error states** with fallback links when embeds fail to load
- Graceful degradation: core content works without JavaScript

### Accessibility Baseline

- Semantic HTML with proper heading hierarchy (h1 → h2 → h3)
- Skip-to-content link for keyboard users
- Visible focus indicators on all interactive elements
- Color contrast ratio ≥4.5:1 for text
- `alt` text for all images
- ARIA labels for icon-only buttons

---

## What to Avoid

| Pitfall         | Solution                                       |
| --------------- | ---------------------------------------------- |
| Stale content   | Use dates, status badges, "last updated"       |
| Broken links    | Regular audits, archive.org fallbacks          |
| Over-designed   | Substance over flashy animations               |
| Hard to contact | Clear email, maybe contact form                |
| No live demos   | Host demos on Cloudflare, link prominently     |
| Wall of text    | Cards, progressive disclosure, clear hierarchy |

---

## Implementation Phases

Development is iterative — the site goes live when Phase 1 is useful, then extended incrementally. No big-bang launch.

### Pre-Phase: Content First

- [ ] Write the research statement (specific, differentiated — not generic SE PhD boilerplate)
- [ ] Write the professional tagline / TL;DR
- [ ] Ensure PDF CV is excellent before the site goes live

### Phase 0: Design Prototype (Complete)

- [x] `theme-demo.html` — self-contained HTML prototype with 6 themes, floating icon strip, section dots, sticky nav, hamburger menu, card styles, layout chrome

### Phase 1: Scaffold

Scaffold the SvelteKit project, wire up all tooling, and get a working
deployment pipeline before writing any real content.

**Scaffold command:**

```bash
npx sv create . --template minimal --types ts --no-add-ons
```

Then manually add:

```bash
pnpm add -D @sveltejs/adapter-static wrangler
pnpm add zod
```

**After scaffolding, complete in this order:**

- [ ] Configure `svelte.config.js`:
  - `adapter-static` with `pages: 'build'`, `assets: 'build'`
  - `prerender.handleHttpError: 'fail'`, `handleMissingId: 'fail'`
- [ ] Create `wrangler.toml` (Cloudflare Workers static assets):
  ```toml
  name = "personal-website"
  compatibility_date = "<today>"
  [assets]
  directory = "./build"
  ```
- [ ] Set `export const prerender = true` and `trailingSlash = 'always'`
      in `src/routes/+layout.ts`
- [ ] Wire up ESLint (flat config, `eslint-plugin-svelte`,
      `typescript-eslint`) and Prettier (`prettier-plugin-svelte`)
- [ ] Wire up Lefthook pre-commit hooks:
  - Install: `brew install lefthook` (or `pnpm add -D lefthook`)
  - Run `lefthook install` after creating `lefthook.yml`
  - Hooks: prettier check, eslint, svelte-check (parallel)
  - commit-msg hook: commitlint with `@commitlint/config-conventional`
  - Install commitlint: `pnpm add -D @commitlint/cli
@commitlint/config-conventional`
- [ ] Wire up GitHub Actions CI (`.github/workflows/ci.yml`):
  - Trigger: push to main + pull_request
  - Jobs: `pnpm install`, `pnpm check`, `pnpm lint`, `pnpm build`
  - Use `pnpm/action-setup`, `actions/setup-node` with
    `node-version: lts/*` and `cache: pnpm`
- [ ] Confirm `pnpm build` produces a valid `build/` directory
- [ ] Confirm `wrangler deploy` succeeds to Cloudflare Workers

**Then continue with layout and pages:**

- [ ] Global CSS: `src/app.css` with `@layer base, theme`, theme tokens
      for all 6 themes, resets, typography scale, layout utilities
- [ ] Theme flash prevention: inline script in `app.html`
- [ ] Basic layout:
  - Sticky nav (Research, Projects, CV, Uses; frosted glass on scroll)
  - Floating icon strip (left: GitHub, Scholar, LinkedIn, Email, theme toggle)
  - Section dots (right: one per section, scroll spy, back-to-top chevron)
  - Mobile: hamburger menu + bottom-right icon bar + hidden section dots
  - Footer (name, tagline, social links, nav, copyright)
- [ ] Custom 404 page (`src/routes/+error.svelte`)
- [ ] Zod schemas for all content types in `src/lib/data/`
- [ ] Homepage: hero (name, tagline, affiliation, ORCID), stats row,
      research focus, selected publications, featured projects (Erenshor + AK)
- [ ] Research page (publications list + AIST compact card grid)
- [ ] Projects page (Erenshor, AK, 10-Man Idle — one card per ecosystem)
- [ ] CV page (education, experience, teaching, supervision, service, awards)
- [ ] Uses page (icon grid with category filters)
- [ ] Deploy to Cloudflare Workers

### Phase 2: Content & Polish

- [ ] All publications with full schema (type, awards, acceptance rates, co-author links)
- [ ] Project case studies with "How I Built This" and "What I'd Do Differently" sections
- [ ] Teaching section in CV (courses, roles, evaluations)
- [ ] Academic service section (reviewing: TOSEM, subreviewing)
- [ ] Awards section (Leistungsstipendium)
- [ ] Breadcrumbs on detail pages
- [ ] Embed interactive maps (iframe with loading/error states)
- [ ] Image optimization (WebP, responsive)
- [ ] Meta tags / SEO / canonical URLs / JSON-LD structured data (Person, ScholarlyArticle)

### Phase 3: Interactive Elements

- [ ] PDF viewer (pdf.js, collapsible, lazy-loaded) for papers and slides
- [ ] Figure grid galleries (not carousel)
- [ ] One-click citation copy (BibTeX, APA, MLA, Chicago)
- [ ] Interactive timeline CV (with prominent traditional view toggle)
- [ ] Dark mode persistence

### Phase 4 (Nice-to-Have): Metrics Dashboard

- [ ] "By the Numbers" section on homepage — safe static stats confirmed:
  - 4 publications (peer-reviewed)
  - 7 semesters teaching (as main instructor)
  - 2 research tools (PASDA, Teralizer)
  - Student supervision count (framing TBD — mix of BSc/MSc/interns)
  - DO NOT include: citation counts, GitHub star counts (fragile/misleading)
- [ ] Semantic Scholar citations (build-time fetch, cached fallback)
- [ ] GitHub stats (build-time fetch with token, cached fallback)
- [ ] MediaWiki contribution stats
- [ ] Steam guide stats
- [ ] Complexity indicators on projects (LOC, data scale, users)

### Phase 5+: Future Enhancements

- [ ] Filter UI for publications/projects (data schemas already support it)
- [ ] Slide deck viewer (Reveal.js/Slidev) if PDFs aren't sufficient
- [ ] Data exploration / SQL browser (sql.js)
- [ ] Now page (current focus)

---

## Key Differentiator

**You bridge academia and practical engineering:**

- Research rigor + shipping real products
- Academic publications + community tools with real users
- This combination is rare and valuable for both audiences

Emphasize this throughout the site.

---

## Interactive Features

The portfolio should demonstrate skills through _how_ it presents content, not just list achievements. Prioritize inline, interactive experiences over external links and static screenshots.

### Contribution Metrics Dashboard (Phase 4 — Nice-to-Have)

Aggregate real data from multiple sources, fetched at build time:

```
┌─────────────────────────────────────────────────────────────┐
│  BY THE NUMBERS                            (auto-updated)   │
├──────────────────┬──────────────────┬──────────────────────┤
│  RESEARCH        │  OPEN SOURCE     │  COMMUNITY           │
│  ─────────────   │  ─────────────   │  ─────────────       │
│  X Publications  │  Y commits       │  Z wiki articles     │
│  N venues        │  M repos         │  K guide views       │
└──────────────────┴──────────────────┴──────────────────────┘
```

**Data sources (fetched at build time):**

- **GitHub API** → commits, repos, languages, contribution calendar (use token for rate limits)
- **Semantic Scholar API** → citations, paper metadata (free official API, unlike Google Scholar)
- **MediaWiki API** → article count, edit count, bytes contributed
- **Steam API** → guide views, ratings, favorites (requires API key)

**Fallback:** Cache API responses so build doesn't fail if an API is temporarily down.

### Interactive Timeline CV

Replace static CV list with a zoomable, interactive timeline:

- Multiple tracks: Education, Work, Research, Projects
- Click to expand details
- Milestone markers for publications, major releases
- **Traditional view always available** as prominent alternative toggle
- Libraries: vis-timeline, d3, or custom Svelte implementation

**Accessibility requirements:**

- Keyboard navigable (arrow keys, Tab, Enter)
- Screen reader support with ARIA labels
- Respects `prefers-reduced-motion`
- Not the default view in Phase 1-2 (traditional view first)

### Paper/Publication Experience

Go beyond PDF links:

| Feature                | Description                                                    |
| ---------------------- | -------------------------------------------------------------- |
| **Inline PDF viewer**  | pdf.js, **collapsed by default**, lazy-loaded on expand        |
| **Download PDF**       | Primary action - prominent button above viewer                 |
| **Figure gallery**     | Key figures in **responsive grid** (not carousel), all visible |
| **Paper TL;DR**        | 2-3 sentence summary + key contribution                        |
| **One-click citation** | Copy BibTeX, APA, MLA, Chicago formats                         |
| **Awards/metrics**     | Best Paper badges, acceptance rates displayed                  |

### Slide Deck Viewer

**Phase 3:** Use pdf.js to display slide PDFs inline - same viewer as papers, works well for landscape slides. Add keyboard navigation (arrow keys for prev/next slide).

**Phase 5+ (optional):** If converting to web-native format becomes valuable:

- **Reveal.js** or **Slidev** (Markdown → slides) integration
- Deep links to specific slides
- Optional speaker notes toggle

The PDF approach is pragmatic since slides are already available as PDFs.

### Embedded Project Demos

**Maps (Erenshor/Ancient Kingdoms):**

- Embed full interactive maps via iframe
- Show the actual production site—don't hide functionality
- Demonstrates real shipped work

**Live project indicators:**

- Status badges (online/offline)
- Last updated timestamps
- Usage stats where available

### Data Exploration (Future)

Interactive SQL explorer for project databases:

- Uses sql.js (SQLite → WebAssembly, already used in Erenshor/AK)
- Ship database files, query in-browser

**UX challenge:** Raw SQL input isn't accessible. Solutions:

- Pre-built "questions" (e.g., "Find all items in Heartlands")
- Schema browser with table/column discovery
- Visual query builder for common operations
- Example queries with one-click execution

Lower priority, but impressive differentiation when implemented.

### "How I Built This" Sections

Expandable technical deep-dives for each project:

```
▶ How I Built This
  ┌─────────────────────────────────────────────────────────┐
  │ ARCHITECTURE                                            │
  │ [Interactive diagram showing data flow]                 │
  │                                                         │
  │ WHY THESE CHOICES                                       │
  │ • deck.gl over Leaflet: 500k+ entities, needed WebGL   │
  │ • SQLite over Postgres: No server, ships as file       │
  └─────────────────────────────────────────────────────────┘
```

Shows engineering _thinking_, not just output.

### Design Philosophy

- **No audience toggle**: Clean navigation lets users self-select
- **No search or filters**: Too few items to warrant complexity (~4 papers, ~5 projects)
- **No carousels**: Use accessible grids instead; all content visible at once
- **Progressive disclosure**: Overview → details on demand
- **Inline over external**: Keep visitors on-site when possible
- **Real data**: Metrics from APIs at build time, with fallback caching
- **The portfolio demonstrates the skills it claims**

---

## Quick Start Commands

```bash
# Initialize project
cd ~/Projects/personal-website
pnpm create svelte@latest . # Choose: Skeleton, TypeScript, ESLint, Prettier

# Add dependencies
pnpm add -D tailwindcss postcss autoprefixer
pnpm add -D @tailwindcss/typography
pnpm add -D @sveltejs/adapter-static
pnpm add zod

# shadcn-svelte (optional, for components)
pnpm dlx shadcn-svelte@next init
```

---

## Resources

### Core Stack

- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-svelte](https://www.shadcn-svelte.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

### Build & Validation

- [Zod](https://zod.dev/) - TypeScript-first schema validation
- [@sveltejs/enhanced-img](https://kit.svelte.dev/docs/images) - Automatic image optimization

### Fonts & Typography

- [@fontsource](https://fontsource.org/) - Self-hosted fonts (Inter, Source Sans Pro, JetBrains Mono)
- [@tailwindcss/typography](https://tailwindcss.com/docs/typography-plugin) - Prose styling for Markdown

### Interactive Features

- [pdf.js](https://mozilla.github.io/pdf.js/) - PDF rendering in browser
- [vis-timeline](https://visjs.github.io/vis-timeline/) - Interactive timelines
- [Reveal.js](https://revealjs.com/) - HTML presentation framework
- [Slidev](https://sli.dev/) - Markdown-based slides (alternative)
- [sql.js](https://sql.js.org/) - SQLite compiled to WebAssembly

### Data Visualization

- [D3.js](https://d3js.org/) - General-purpose visualization

### APIs

- [GitHub REST API](https://docs.github.com/en/rest) - Commits, repos, contribution data
- [Semantic Scholar API](https://api.semanticscholar.org/) - Academic paper metadata and citations
- [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page) - Wiki contribution stats
- [Steam Web API](https://developer.valvesoftware.com/wiki/Steam_Web_API) - Guide views and ratings

---

## Email Handling & History Cleanup

### Problem

`feat(data): add Zod-validated content data files` (371d875) committed
`REDACTED` in plain text inside `src/lib/data/links.ts`.
The repo has not been pushed yet, so history can be rewritten locally.

### Constraints

- Email must never appear in the repo or DOM in any form (plain, encoded, or as an href attribute value)
- No `mailto:` links — user does not use the native mail client
- Solution: copy-to-clipboard button; address decoded from env var only at click time in the browser

### Steps

1. **Install git-filter-repo** via `brew install git-filter-repo`
2. **Scrub history**: `git filter-repo --replace-text <(printf 'REDACTED==>REDACTED\n')`
   - Rewrites all blobs across all commits that contain the address
   - Leaves the remote ref intact (remote not yet pushed to)
3. **Verify**: `git log --all -S 'REDACTED'` must return nothing
4. **Remove leftover email infrastructure**:
   - Remove `emailEncoded` / `PUBLIC_CONTACT_EMAIL_B64` entirely from `links.ts`
   - Delete `EmailLink.svelte`
   - Delete `.env.example` (no env var approach anymore)
   - Keep `.env.local` gitignored but change approach (see below)
5. **Implement `CopyEmail` component** (`src/lib/components/layout/CopyEmail.svelte`):
   - Props: `variant: 'icon' | 'text'`
   - `'icon'`: 36×36 button with envelope SVG, matching icon strip button style
   - `'text'`: inline button styled like footer links
   - On click: reads `PUBLIC_CONTACT_EMAIL_B64` from `$env/static/public`, calls
     `navigator.clipboard.writeText(atob(...))` — address is decoded only at click
     time, never written to the DOM
   - Toast: a small `"Email copied!"` message that appears for 2 s then fades,
     positioned near the button, no library needed
   - Graceful fallback if env var is missing: button is hidden
6. **Wire into `IconStrip` and `Footer`** replacing the old email links
7. **Commit**: `fix(layout): replace email link with copy-to-clipboard button`
8. **Set env var for local dev and CI**:
   - `.env.local` (gitignored): `PUBLIC_CONTACT_EMAIL_B64=<base64>`
   - GitHub Actions secret: `PUBLIC_CONTACT_EMAIL_B64` added to repo secrets,
     referenced in `ci.yml` as `env: PUBLIC_CONTACT_EMAIL_B64: ${{ secrets.PUBLIC_CONTACT_EMAIL_B64 }}`
