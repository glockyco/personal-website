# Personal Website Plan

## Profile Summary

**Current:** PhD student/researcher (finishing soon)
**Target audiences:** Academia + Industry (unique bridge position)

### What to Showcase

**Academic:**
- Papers and publications
- Presentations and talks
- Research prototypes and demos
- Datasets released
- Teaching experience

**Technical/Hobby:**
- Erenshor + Ancient Kingdoms modding ecosystem
  - Data mining and reverse engineering
  - Interactive maps (SvelteKit + deck.gl)
  - Build pipelines (Python + SQLite)
  - Wiki contributions
  - Bot writing
  - Steam guide writing
- Other side projects

**Professional Background:**
- Prior web development experience
- Research experience before PhD
- Teaching (TA and during PhD)

---

## Site Structure

### Sitemap

```
/                           # Home / Landing
├── /research               # Publications list
│   └── /research/[slug]    # Paper detail (includes slides/talks)
├── /projects               # Projects grid
│   └── /projects/[slug]    # Project detail
├── /cv                     # Interactive timeline CV (includes teaching)
└── /contact                # Contact info (email + links)
```

**Optional future routes:**
- `/now` - Current focus / what I'm working on
- `/uses` - Tools and setup (dev community standard)

### Core Sections

| Section | Purpose | Content |
|---------|---------|---------|
| **Home** | First impression | Brief bio, photo, tagline, featured work, stats |
| **Research** | Academic credibility | Papers, presentations (slides), demos, datasets |
| **Projects** | Technical skills | Erenshor/AK ecosystem, other side projects |
| **CV** | Formal credentials | Interactive timeline, education, work, teaching, skills, PDF |
| **Contact** | Reachability | Email, GitHub, LinkedIn, Scholar |

### Navigation

**Desktop:**
```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo/Name]       Research   Projects   CV   Contact  [GitHub] │
└─────────────────────────────────────────────────────────────────┘
```

**Mobile:** Hamburger menu with same items + social links + dark mode toggle

**Footer:**
- Name and tagline
- Social links (GitHub, LinkedIn, Scholar, Email)
- Site navigation links
- Copyright and last updated date

### Design Decisions

- **Talks/Slides** - Part of Research detail pages
- **Teaching** - Part of CV page, not a separate section
- **Contact** - Simple email + social links, no form
- **No audience toggle** - Clean navigation lets users self-select

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
SvelteKit + MDsveX + Tailwind CSS + TypeScript
                    ↓
             adapter-static
                    ↓
           Cloudflare Pages
```

**Rationale:**
- Already proficient in SvelteKit (from Erenshor maps)
- MDsveX for content authoring (project case studies in Markdown)
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
│   ├── cv/+page.svelte           # CV page
│   └── contact/+page.svelte
├── lib/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.svelte
│   │   │   ├── MobileNav.svelte
│   │   │   ├── Footer.svelte
│   │   │   ├── PageHeader.svelte
│   │   │   └── BackLink.svelte
│   │   ├── home/
│   │   │   ├── HeroSection.svelte
│   │   │   ├── StatsGrid.svelte        # Phase 4
│   │   │   └── FeaturedGrid.svelte
│   │   ├── research/
│   │   │   ├── PublicationCard.svelte
│   │   │   ├── PublicationList.svelte
│   │   │   ├── FilterBar.svelte        # Phase 5
│   │   │   ├── PaperHeader.svelte
│   │   │   ├── FigureGallery.svelte    # Phase 3
│   │   │   ├── CitationBlock.svelte
│   │   │   ├── SlideViewer.svelte      # Phase 5
│   │   │   └── PdfViewer.svelte        # Phase 3
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
│   │   ├── contact/
│   │   │   ├── EmailBlock.svelte
│   │   │   └── SocialLinks.svelte
│   │   └── shared/
│   │       ├── ActionButton.svelte
│   │       ├── StatusBadge.svelte
│   │       ├── TagList.svelte
│   │       ├── DarkModeToggle.svelte
│   │       └── RelatedContent.svelte
│   └── data/
│       ├── publications.ts       # Structured publication data
│       ├── projects.ts           # Structured project data
│       └── cv.ts                 # CV data
└── content/                      # Markdown content (if using MDsveX)
    └── projects/                 # Project case studies
```

---

## Content Management

### Option A: TypeScript Files (Recommended for Publications)

Type-safe, queryable, easy to filter/sort:

```typescript
// src/lib/data/publications.ts
export type Publication = {
    slug: string;
    title: string;
    authors: string[];
    venue: string;
    year: number;
    abstract: string;
    pdf?: string;
    doi?: string;
    tags: string[];
    links?: {
        demo?: string;
        code?: string;
        slides?: string;
        video?: string;
    };
};

export const publications: Publication[] = [
    {
        slug: "paper-2024",
        title: "Paper Title",
        authors: ["You", "Coauthor"],
        venue: "CHI 2024",
        year: 2024,
        abstract: "...",
        pdf: "/papers/paper-2024.pdf",
        doi: "10.1145/...",
        tags: ["HCI", "Visualization"],
        links: { demo: "https://...", code: "https://github.com/..." }
    }
];
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
│ [NAV]                                                           │
├─────────────────────────────────────────────────────────────────┤
│  ┌────────┐  Hi, I'm Johann Glock                               │
│  │ PHOTO  │  PhD Researcher finishing at [University]           │
│  │        │  Building tools that bridge research and practice   │
│  └────────┘  [View Research] [See Projects]                     │
├─────────────────────────────────────────────────────────────────┤
│  BY THE NUMBERS (Phase 4)                                       │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ X Papers     │ │ Y Commits    │ │ Z Wiki Pages │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
├─────────────────────────────────────────────────────────────────┤
│  FEATURED WORK                                                  │
│  ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐   │
│  │ Recent paper    │ │ Erenshor Maps   │ │ AK Compendium   │   │
│  └─────────────────┘ └─────────────────┘ └─────────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                        │
└─────────────────────────────────────────────────────────────────┘
```

**Research page:**
```
┌─────────────────────────────────────────────────────────────────┐
│ [NAV]                                                           │
├─────────────────────────────────────────────────────────────────┤
│  Research & Publications                                        │
│  Brief intro about research interests / areas                   │
├─────────────────────────────────────────────────────────────────┤
│  Filter: [All ▾] [2024 ▾] [Topic ▾]              [Search 🔍]   │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Paper Title Here                                 2024 | CHI ││
│  │ Authors: You, Coauthor A, Coauthor B                        ││
│  │ Brief abstract or TL;DR...                       [▼ More]   ││
│  │ [PDF] [Cite] [Demo] [Code]                                  ││
│  └─────────────────────────────────────────────────────────────┘│
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Another Paper Title                              2023 | ICSE││
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
│  ← Back to Research                                             │
├─────────────────────────────────────────────────────────────────┤
│  Paper Title Here                                               │
│  Authors: You, Coauthor A, Coauthor B                           │
│  Published in CHI 2024 · DOI: 10.1145/...                       │
│                                                                 │
│  [PDF] [Cite] [Demo] [Code] [Slides] [Video]                    │
├─────────────────────────────────────────────────────────────────┤
│  TL;DR                                                          │
│  2-3 sentence summary of key contribution...                    │
├─────────────────────────────────────────────────────────────────┤
│  KEY FIGURES                                                    │
│  ┌────────┐ ┌────────┐ ┌────────┐                              │
│  │ Fig 1  │ │ Fig 2  │ │ Fig 3  │  ← → carousel navigation     │
│  └────────┘ └────────┘ └────────┘                              │
│  Caption for selected figure...                                 │
├─────────────────────────────────────────────────────────────────┤
│  ABSTRACT                                                       │
│  Full abstract text...                                          │
├─────────────────────────────────────────────────────────────────┤
│  [Embedded PDF Viewer - collapsible or tab]                     │
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
│  Filter: [All ▾] [Active ▾] [Tech ▾]                           │
├─────────────────────────────────────────────────────────────────┤
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
│  ← Back to Projects                                             │
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
│  Curriculum Vitae                          [Download PDF]       │
├─────────────────────────────────────────────────────────────────┤
│  [Interactive Timeline - full width]                            │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ Education ═══════════════════                               ││
│  │ Work      ═══════════    ════════════                       ││
│  │ Research      ══════════════════════                        ││
│  │ Projects          ════  ════  ══════                        ││
│  │ ──────────────────────────────────────────────────────────  ││
│  │ 2018    2019    2020    2021    2022    2023    2024    Now ││
│  └─────────────────────────────────────────────────────────────┘│
│  Click any item to see details                                  │
├─────────────────────────────────────────────────────────────────┤
│  [Selected item details appear here]                            │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │ PhD in Computer Science                      2020 - Present ││
│  │ University Name                                             ││
│  │ Research focus: ...                                         ││
│  │ [View related publications →]                               ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  Or view as traditional sections:                               │
│  [Education] [Experience] [Teaching] [Skills] [Publications]   │
├─────────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                        │
└─────────────────────────────────────────────────────────────────┘
```

**Contact page:**
```
┌─────────────────────────────────────────────────────────────────┐
│ [NAV]                                                           │
├─────────────────────────────────────────────────────────────────┤
│  Get in Touch                                                   │
├─────────────────────────────────────────────────────────────────┤
│  The best way to reach me is via email:                         │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────────┐│
│  │  📧  email@example.com                         [Copy]       ││
│  └─────────────────────────────────────────────────────────────┘│
├─────────────────────────────────────────────────────────────────┤
│  You can also find me on:                                       │
│                                                                 │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐ ┌────────────┐   │
│  │  GitHub    │ │  LinkedIn  │ │  Scholar   │ │  Twitter   │   │
│  │  @handle   │ │  /in/name  │ │  profile   │ │  @handle   │   │
│  └────────────┘ └────────────┘ └────────────┘ └────────────┘   │
├─────────────────────────────────────────────────────────────────┤
│ [FOOTER]                                                        │
└─────────────────────────────────────────────────────────────────┘
```

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

### Phase 1: Foundation
- [ ] Set up SvelteKit project with adapter-static
- [ ] Basic layout (nav, footer)
- [ ] Homepage with brief intro
- [ ] Research page with publication list
- [ ] Projects page with project cards
- [ ] CV page (static initially)
- [ ] Contact info
- [ ] Deploy to Cloudflare Pages

### Phase 2: Content & Structure
- [ ] Add all publications with structured data
- [ ] Write project case studies (Erenshor, AK, others)
- [ ] "How I Built This" expandable sections for projects
- [ ] Create CV content
- [ ] Embed interactive maps (iframe)
- [ ] Add proper meta tags / SEO

### Phase 3: Interactive Elements
- [ ] Inline PDF viewer (pdf.js) for papers
- [ ] Paper figure galleries
- [ ] One-click BibTeX/citation copy
- [ ] Interactive timeline CV (vis-timeline or d3)
- [ ] PDF CV export from timeline data
- [ ] Dark mode toggle

### Phase 4: API Integrations
- [ ] GitHub stats integration (commits, repos, languages)
- [ ] Contribution metrics dashboard
- [ ] Google Scholar data (manual or automated)
- [ ] Steam guide stats
- [ ] Wiki contribution stats (if applicable)
- [ ] Live project status indicators

### Phase 5: Advanced Features
- [ ] Slide deck viewer (Reveal.js/Slidev integration)
- [ ] Paper relationship graph visualization
- [ ] Publication filters (year, topic, venue)
- [ ] Search functionality

### Phase 6: Future Enhancements
- [ ] Data exploration / SQL browser (sql.js)
  - Schema discovery UI
  - Pre-built example queries
  - Visual query builder
- [ ] Now page
- [ ] Advanced analytics

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

### Contribution Metrics Dashboard

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

**Data sources:**
- **GitHub API** → commits, repos, languages, contribution calendar
- **Google Scholar** → citations, h-index (manual or scraped)
- **MediaWiki API** → article count, edit count, bytes contributed
- **Steam API** → guide views, ratings, favorites

### Interactive Timeline CV

Replace static CV list with a zoomable, interactive timeline:
- Multiple tracks: Education, Work, Research, Projects
- Click to expand details
- Milestone markers for publications, major releases
- "Export as PDF" generates clean traditional format
- Libraries: vis-timeline, d3, or custom Svelte implementation

### Paper/Publication Experience

Go beyond PDF links:

| Feature | Description |
|---------|-------------|
| **Inline PDF viewer** | pdf.js with custom UI, stays on-site |
| **Figure gallery** | Key figures extracted with captions, carousel view |
| **Paper TL;DR** | 2-3 sentence summary + key contribution |
| **One-click citation** | Copy BibTeX, formatted citations |
| **Paper relationship graph** | Visualize connections between papers (d3/vis.js) |

### Slide Deck Viewer

Convert presentations to web-native format:
- **Reveal.js** or **Slidev** (Markdown → slides) integration
- Embedded viewer with keyboard navigation
- Optional speaker notes toggle
- Deep links to specific slides
- Shows presentation skills, not just that slides exist

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
- **Progressive disclosure**: Overview → details on demand
- **Inline over external**: Keep visitors on-site when possible
- **Real data**: Metrics from APIs, not static claims
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
pnpm add -D mdsvex
pnpm add -D @sveltejs/adapter-static

# shadcn-svelte (optional, for components)
pnpm dlx shadcn-svelte@next init
```

---

## Resources

### Core Stack
- [SvelteKit Docs](https://kit.svelte.dev/docs)
- [MDsveX](https://mdsvex.pngwn.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn-svelte](https://www.shadcn-svelte.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

### Interactive Features
- [pdf.js](https://mozilla.github.io/pdf.js/) - PDF rendering in browser
- [vis-timeline](https://visjs.github.io/vis-timeline/) - Interactive timelines
- [Reveal.js](https://revealjs.com/) - HTML presentation framework
- [Slidev](https://sli.dev/) - Markdown-based slides (alternative)
- [sql.js](https://sql.js.org/) - SQLite compiled to WebAssembly

### Data Visualization
- [D3.js](https://d3js.org/) - General-purpose visualization
- [vis-network](https://visjs.github.io/vis-network/) - Network/graph visualization

### APIs
- [GitHub REST API](https://docs.github.com/en/rest)
- [GitHub GraphQL API](https://docs.github.com/en/graphql)
- [MediaWiki API](https://www.mediawiki.org/wiki/API:Main_page)
- [Steam Web API](https://developer.valvesoftware.com/wiki/Steam_Web_API)
