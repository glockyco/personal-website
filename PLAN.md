# Personal Website Plan

## Profile Summary

**Current:** PhD student/researcher (finishing soon)
**Primary audience:** Academia (hiring committees, postdoc supervisors, collaborators)
**Secondary audience:** Industry (technical hiring managers, research scientist roles)
**Location:** Hagenberg / Linz (Austria) or Remote
**Experience:** ~X years in software engineering, Y years in research

> **Note:** The research statement and professional summary below are placeholders.
> These must be written before or alongside Phase 1 — they are the site's center of gravity.
> Every homepage design decision depends on this content being real.

### Research Statement

*(To be written — this is the highest priority content task)*

My research focuses on [empirical software engineering / mining software repositories], exploring how [data mining and data engineering approaches] can [improve software quality and developer productivity]. I build tools and pipelines to extract insight from large-scale software data, combining backend engineering with empirical research methods.

### Role Targeting

Open to:
- Postdoctoral research positions
- Research Scientist / Applied Scientist positions
- Senior Software Engineer roles (data mining, data engineering, backend development, developer tools)

### TL;DR Professional Summary

*(To be written — must be specific and differentiating, not generic SE PhD boilerplate)*

PhD researcher with X years of software engineering experience. Published in top SE venues (JSS, ICSE). Ships production software used by real communities. Combines academic rigor with practical engineering.

### What to Showcase

**Academic:**
- Papers and publications (with full metadata: type, awards, citations)
- Presentations and talks (slides integrated with papers)
- Research prototypes and demos
- Datasets released
- Teaching experience
- Academic service (reviewing)

**Technical/Hobby:**
- Erenshor + Ancient Kingdoms modding ecosystem
  - Framing: curiosity, digging deep, helping the community, presenting results clearly for non-technical audiences
  - Data mining and reverse engineering
  - Interactive maps (SvelteKit + deck.gl)
  - Build pipelines (Python + SQLite)
  - Wiki contributions (primary maintainer)
  - Bot writing
  - Steam guide writing
- Other side projects

**Professional Background:**
- Prior web development experience
- Research experience before PhD
- Teaching (TA and during PhD)
- Student supervision (Bachelor's, Master's, interns)

---

## Site Structure

### Sitemap

```
/                           # Home / Landing (research identity first)
├── /research               # Publications list
│   └── /research/[slug]    # Paper detail (includes slides/talks)
├── /projects               # Projects grid
│   └── /projects/[slug]    # Project detail
├── /cv                     # CV page
└── /404                    # Custom 404 page
```

Contact is not a separate page — social links and email appear in the footer and nav header.

**Optional future routes:**
- `/now` - Current focus / what I'm working on
- `/uses` - Tools and setup (dev community standard)

### Core Sections

| Section | Purpose | Content |
|---------|---------|---------|
| **Home** | First impression | Research statement, bio, photo, tagline, featured work, optional stats |
| **Research** | Academic credibility | Papers with full metadata, presentations (slides), demos, datasets |
| **Projects** | Technical skills | Erenshor/AK ecosystem, other side projects, "How I Built This" |
| **CV** | Formal credentials | Timeline view + traditional view, teaching, service, awards, PDF download |
| **Contact** | Reachability | Email, GitHub, LinkedIn, Scholar, ORCID, Semantic Scholar, Institution — in footer and nav, not a dedicated page |

### Navigation

**Desktop:**
```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo/Name]   Research  Projects  CV  [GitHub] [🌙]           │
└─────────────────────────────────────────────────────────────────┘
```
- No "Contact" nav item — contact links live in footer and nav header icons
- Dark mode toggle [🌙] always visible in header
- Links open in same tab (browser default behavior)

**Mobile:** Hamburger menu with same items + social icons + dark mode toggle

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

| Decision | Rationale |
|----------|-----------|
| **No filters (deferred)** | Too few items now (4 papers, ~5 projects); schemas include filterable fields (tags, year, type) so UI filters can be added later without data migration |
| **No carousels** | Poor UX, accessibility issues; use grids instead |
| **Talks/Slides** | Part of Research detail pages |
| **Teaching** | Part of CV page, not a separate section |
| **No contact page** | Six links don't justify a route; email + social icons in footer and nav |
| **No audience toggle** | Clean navigation lets users self-select |
| **Same-tab links** | Respect browser defaults (Ctrl+Click for new tab) |
| **Dark mode in header** | Always accessible, not buried in menu |
| **Traditional CV as alternative** | Recruiters/committees need scannable format |
| **Manual data entry** | Better than fragile API scrapers |
| **Static metrics ("X+")** | Avoids API failures, clearly not real-time |
| **No MDsveX** | Unnecessary complexity for ~5 project case studies; TypeScript data files are sufficient |
| **Research leads homepage** | Primary audience is academia; research statement and publications come before projects |

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

| Option | Pros | Cons |
|--------|------|------|
| **Astro** | Content-focused, island architecture | Learning curve, less familiar |
| **Hugo** | Blazing fast builds, academic themes | Go templating, less flexible |
| **Quarto** | Popular in academia, Jupyter integration | Less control, academic-only feel |
| **Next.js** | Industry standard | Overkill, React ecosystem |

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
│   └── cv/+page.svelte           # CV page
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
│   │   └── shared/
│   │       ├── ActionButton.svelte
│   │       ├── StatusBadge.svelte
│   │       ├── TagList.svelte
│   │       └── DarkModeToggle.svelte
│   └── data/
│       ├── publications.ts       # Structured publication data
│       ├── projects.ts           # Structured project data
│       ├── cv.ts                 # CV data
│       └── links.ts              # Social/academic links
```

> This is a reference, not a contract — components emerge during implementation.
> No `content/` directory; MDsveX is not used. Project case studies live in
> structured TypeScript data or directly in Svelte components.

---

## Content Management

All content managed via TypeScript files with Zod validation at build time. No MDsveX — project case studies are structured data, not Markdown files.

Schemas include filterable fields (tags, year, type, venue) even though no filter UI is exposed yet. This allows filter UI to be added in future without data migration.

### Publication Schema

```typescript
// src/lib/data/publications.ts
export type Author = {
  name: string;
  url?: string;        // Link to their website/profile
  isMe?: boolean;      // Highlight own name
};

export type Publication = {
  slug: string;
  title: string;
  authors: Author[];
  venue: string;
  year: number;
  abstract: string;
  tldr: string;        // 2-3 sentence summary

  // Classification
  type: 'journal' | 'conference' | 'workshop' | 'doctoral-symposium' | 'thesis' | 'preprint';
  status: 'published' | 'in-press' | 'under-review' | 'preprint';
  authorPosition: 'first' | 'co-first' | 'contributing' | 'senior';

  // Academic metadata
  award?: string;           // "Best Paper", "Honorable Mention"
  acceptanceRate?: string;  // "26%"
  citationCount?: number;   // Manual update

  // Links
  pdf?: string;
  doi?: string;
  arxiv?: string;
  scholarUrl?: string;      // Google Scholar link for this paper
  dataset?: string;

  tags: string[];           // filterable when UI supports it
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
  description: string;      // The challenge
  solution: string;         // The solution
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
  architecture?: string;    // Markdown description
  technicalDecisions?: {
    decision: string;
    rationale: string;
  }[];

  // Reflection (shows growth mindset)
  whatIdDoDifferently?: string;

  // Complexity indicators
  metrics?: {
    linesOfCode?: string;   // "~15,000"
    components?: number;
    dataScale?: string;     // "500k+ entities"
    users?: string;         // "X monthly active users"
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
  endYear?: number;         // undefined = present
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
  semesters: string[];      // ["Fall 2022", "Spring 2023"]
  enrollment?: number;
  evaluationScore?: string; // "4.5/5.0"
  description?: string;
};

export type AcademicService = {
  type: 'reviewer' | 'subreviewer' | 'committee' | 'organizer';
  venue: string;
  year: number;
  note?: string;            // "As subreviewer for supervisor"
};

export type Award = {
  title: string;
  organization: string;
  years: string;            // "2019-2022"
  description?: string;
};

export type Skill = {
  category: string;         // "Languages", "Frameworks", "Tools"
  items: string[];
};
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
  linkedin: '...',
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
│ [NAV]                                         [GitHub] [Scholar] [🌙] │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────┐  Johann Glock                                        │
│  │ PHOTO  │  [Specific research identity — to be written]        │
│  │        │  Hagenberg/Linz, Austria · Open to Remote            │
│  └────────┘  [View Research] [Download CV] [See Projects]        │
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
│  │ Erenshor Maps   │ │ AK Compendium   │                        │
│  └─────────────────┘ └─────────────────┘                        │
│  [→ All Projects]                                                │
├─────────────────────────────────────────────────────────────────┤
│  BY THE NUMBERS (nice-to-have, future)                           │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐             │
│  │ X+ Papers    │ │ Y Citations  │ │ Z+ Wiki Pages│             │
│  └──────────────┘ └──────────────┘ └──────────────┘             │
├─────────────────────────────────────────────────────────────────┤
│ [FOOTER: social links, nav, copyright]                           │
└─────────────────────────────────────────────────────────────────┘
```

**Research page:**
```
┌─────────────────────────────────────────────────────────────────┐
│ [NAV]                                              [GitHub] [🌙] │
├─────────────────────────────────────────────────────────────────┤
│  Research & Publications                                        │
│  Brief intro about research interests / areas                   │
├─────────────────────────────────────────────────────────────────┤
│  (No filters needed - only 4 papers)                            │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Paper Title Here                    2024 | JSS | First Auth ││
│  │ Authors: Johann Glock, Coauthor A, Coauthor B               ││
│  │ TL;DR summary of key contribution...             [▼ More]   ││
│  │ [PDF] [Cite] [Demo] [Code]                                  ││
│  └─────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Another Paper Title                 2024 | ICSE | First Auth││
│  │ ...                                                         ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                        │
└─────────────────────────────────────────────────────────────────┘
```

**Paper detail page:**
```
┌─────────────────────────────────────────────────────────────────┐
│ [NAV]                                                           │
├─────────────────────────────────────────────────────────────────┤
│  Home > Research > Paper Title                                  │
├─────────────────────────────────────────────────────────────────┤
│  Paper Title Here                                               │
│  Authors: You, Coauthor A, Coauthor B                           │
│  Published in CHI 2024 · DOI: 10.1145/...                       │
│  🏆 Best Paper Award · 26% acceptance rate                      │
│                                                                 │
│  [⬇ Download PDF] [Cite] [Demo] [Code] [Slides] [Video]        │
├─────────────────────────────────────────────────────────────────┤
│  TL;DR                                                          │
│  2-3 sentence summary of key contribution...                    │
├─────────────────────────────────────────────────────────────────┤
│  KEY FIGURES (grid layout - all visible)                        │
│  ┌────────────────┐ ┌────────────────┐ ┌────────────────┐      │
│  │                │ │                │ │                │      │
│  │    Figure 1    │ │    Figure 2    │ │    Figure 3    │      │
│  │                │ │                │ │                │      │
│  └────────────────┘ └────────────────┘ └────────────────┘      │
│  Caption 1           Caption 2           Caption 3              │
├─────────────────────────────────────────────────────────────────┤
│  ABSTRACT                                                       │
│  Full abstract text...                                          │
├─────────────────────────────────────────────────────────────────┤
│  ▶ VIEW PDF INLINE (collapsed by default, lazy-loads pdf.js)   │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │              [Embedded PDF Viewer]                          ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  CITATION                                                       │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ @inproceedings{glock2024paper,                              ││
│  │   title = {...},                                            ││
│  │   ...                                                       ││
│  │ }                                          [Copy BibTeX]    ││
│  └─────────────────────────────────────────────────────────────┘│
│  [APA] [MLA] [Chicago] - format toggles                         │
├─────────────────────────────────────────────────────────────────┤
│  RELATED                                                        │
│  ┌─────────────────┐ ┌─────────────────┐                       │
│  │ Related Paper   │ │ Related Project │                       │
│  └─────────────────┘ └─────────────────┘                       │
├─────────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                        │
└─────────────────────────────────────────────────────────────────┘
```

**Projects page:**
```
┌─────────────────────────────────────────────────────────────────┐
│ [NAV]                                                           │
├─────────────────────────────────────────────────────────────────┤
│  Projects                                                       │
│  Things I've built - from research tools to community resources │
├─────────────────────────────────────────────────────────────────┤
│  (No filters needed - only ~5 projects)                         │
│  ┌─────────────────────┐ ┌─────────────────────┐               │
│  │ ┌─────────────────┐ │ │ ┌─────────────────┐ │               │
│  │ │   Screenshot    │ │ │ │   Screenshot    │ │               │
│  │ └─────────────────┘ │ │ └─────────────────┘ │               │
│  │ Erenshor Maps       │ │ AK Compendium       │               │
│  │ Interactive game... │ │ Community wiki...   │               │
│  │ [SvelteKit][deck.gl]│ │ [MediaWiki][Python] │               │
│  │ ● Active            │ │ ● Active            │               │
│  └─────────────────────┘ └─────────────────────┘               │
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

*(No dedicated contact page — email and social links appear in footer and nav header icons only.)*

### Color Scheme

- **Light mode default** (academia prefers)
- **Dark mode toggle** (developers appreciate)
- Accent color: Consider purple/blue for brand consistency with Erenshor maps

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

| Pitfall | Solution |
|---------|----------|
| Stale content | Use dates, status badges, "last updated" |
| Broken links | Regular audits, archive.org fallbacks |
| Over-designed | Substance over flashy animations |
| Hard to contact | Clear email, maybe contact form |
| No live demos | Host demos on Cloudflare, link prominently |
| Wall of text | Cards, progressive disclosure, clear hierarchy |

---

## Implementation Phases

Development is iterative — the site goes live when Phase 1 is useful, then extended incrementally. No big-bang launch.

### Pre-Phase: Content First
- [ ] Write the research statement (specific, differentiated — not generic SE PhD boilerplate)
- [ ] Write the professional tagline / TL;DR
- [ ] Ensure PDF CV is excellent before the site goes live

### Phase 1: Foundation
- [ ] Set up SvelteKit project with adapter-static
- [ ] Basic layout (nav: Research, Projects, CV + social icons + dark mode toggle; footer with all social/academic links)
- [ ] Custom 404 page
- [ ] Homepage: research statement leads, selected publications, featured projects
- [ ] Research page (publication list — schemas include filterable fields, no filter UI yet)
- [ ] Projects page (grid — same)
- [ ] CV page (traditional layout)
- [ ] Zod schemas for content validation
- [ ] Deploy to Cloudflare Pages

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
- [ ] "By the Numbers" section on homepage
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
- [ ] Uses page (tools and setup)

---

## Key Differentiator

**You bridge academia and practical engineering:**
- Research rigor + shipping real products
- Academic publications + community tools with real users
- This combination is rare and valuable for both audiences

Emphasize this throughout the site.

---

## Interactive Features

The portfolio should demonstrate skills through *how* it presents content, not just list achievements. Prioritize inline, interactive experiences over external links and static screenshots.

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

| Feature | Description |
|---------|-------------|
| **Inline PDF viewer** | pdf.js, **collapsed by default**, lazy-loaded on expand |
| **Download PDF** | Primary action - prominent button above viewer |
| **Figure gallery** | Key figures in **responsive grid** (not carousel), all visible |
| **Paper TL;DR** | 2-3 sentence summary + key contribution |
| **One-click citation** | Copy BibTeX, APA, MLA, Chicago formats |
| **Awards/metrics** | Best Paper badges, acceptance rates displayed |

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

Shows engineering *thinking*, not just output.

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

> No MDsveX — not needed without Markdown-based content authoring.

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
