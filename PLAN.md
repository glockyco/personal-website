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

### Core Sections

| Section | Purpose | Content |
|---------|---------|---------|
| **About** | First impression | Brief bio, photo, current role, interests, contact links |
| **Research** | Academic credibility | Papers, presentations, demos, datasets |
| **Projects** | Technical skills | Erenshor/AK ecosystem, other side projects |
| **CV** | Formal credentials | Education, work, teaching, skills, downloadable PDF |
| **Contact** | Reachability | Email, LinkedIn, GitHub, Scholar |

### Optional Sections

| Section | Value | Notes |
|---------|-------|-------|
| **Blog/Writing** | SEO, thought leadership | Technical posts, research explainers, project deep-dives |
| **Talks/Presentations** | Communication skills | Embedded slides, video links |
| **Teaching** | Mentorship evidence | Courses, materials, student feedback |
| **Now Page** | Shows you're active | Current focus, recent updates |
| **Uses Page** | Dev community standard | Tools, setup (optional, fun) |

### Audience-Specific Emphasis

**For Academia:**
- Publication list with proper citations (BibTeX export)
- Research statement/interests
- Teaching philosophy
- Mentorship/supervision
- Service (reviewing, organizing)

**For Industry:**
- Technical projects with live demos
- Clear tech stacks
- Problem-solving narratives
- GitHub activity
- Impact metrics (users, downloads)

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
- MDsveX for content authoring (papers, blog posts in Markdown)
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
│   ├── blog/                     # Optional
│   │   ├── +page.svelte
│   │   └── [slug]/+page.md       # MDsveX posts
│   └── contact/+page.svelte
├── lib/
│   ├── components/
│   │   ├── Nav.svelte
│   │   ├── Footer.svelte
│   │   ├── PublicationCard.svelte
│   │   ├── ProjectCard.svelte
│   │   └── ...
│   └── data/
│       ├── publications.ts       # Structured publication data
│       ├── projects.ts           # Structured project data
│       └── cv.ts                 # CV data
└── content/                      # Markdown content (if using MDsveX)
    ├── blog/
    └── projects/
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

### Option B: Markdown + Frontmatter (Recommended for Blog/Long-form)

Better for long-form content with rich formatting:

```markdown
---
title: Paper Title
authors: [You, Coauthor]
venue: CHI 2024
year: 2024
doi: 10.1145/...
tags: [HCI, Visualization]
---

## Abstract
...

## Key Contributions
...
```

**Recommendation:** Use Option A for publications/projects (structured) and Option B for blog posts (long-form).

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
┌─────────────────────────────────────────────────┐
│  [Photo]  Hi, I'm [Name]                        │
│           PhD Researcher @ [University]          │
│           Building tools for [domain]            │
│                                                 │
│  [Research] [Projects] [CV] [Blog] [Contact]    │
├─────────────────────────────────────────────────┤
│  FEATURED                                       │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │ Paper    │ │ Erenshor │ │ Recent   │        │
│  │ 2024     │ │ Maps     │ │ Post     │        │
│  └──────────┘ └──────────┘ └──────────┘        │
└─────────────────────────────────────────────────┘
```

**Research page:**
- Filter by year/topic/type
- Each paper as card with: title, venue, year, quick actions (PDF, cite, demo)
- Expandable abstracts

**Projects page:**
- Grid of cards with screenshots
- Tags for tech stack
- Status badges (active/completed)
- Links to live demos

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
- [ ] Blog with MDsveX
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
