# Personal Website Plan

## Profile Summary

**Current:** PhD candidate (finishing expected Q4 2026)
**Primary audience:** Academia (hiring committees, postdoc supervisors, collaborators)
**Secondary audience:** Industry (technical hiring managers, research scientist roles)
**Location:** Hagenberg / Linz / Klagenfurt (Austria) or Remote

### Role Targeting

- Postdoctoral research positions
- Research Scientist / Applied Scientist positions
- Senior Software Engineer (data mining, data engineering, backend, developer tools)

### What to Showcase

**Academic:**

- 4 peer-reviewed publications (2 first-author JSS, 1 second-author JSS, 1 ICSE DS oral)
- Research tools: PASDA, Teralizer — explained on paper detail pages, not listed under /projects
- Datasets / replication packages released (all first-authored works)
- Teaching: 7 semesters as main instructor — on /cv, not a separate page
- Academic service (reviewing: TOSEM; subreview: FSE, ICSE, SANER)
- AIST applied research projects (FFG grants) — compact card grid on /research

**Technical/Hobby (on /projects):**

- Erenshor Community Tools: Interactive maps, mods, and wiki bot for the Erenshor community
- Ancient Kingdoms Compendium: Data-mined compendium and interactive world map
- 10-Man Codex: Data-mined game codex for the 10-Man Idle community (inactive)
- Personal Website: Portfolio and CV

---

## Site Structure

### Sitemap

```
/                           # Home (research identity, selected pubs, featured projects)
├── /research               # Publications list + AIST projects card grid
│   └── /research/[slug]    # Paper detail (abstract, TL;DR, presentations, tags)
├── /projects               # Hobby project grid (4 projects)
│   └── /projects/[slug]    # Project detail (challenge, solution, demo, tech stack)
├── /cv                     # CV page (experience, education, teaching, supervision, service)
├── /uses                   # Tools and daily workflow  [not yet built]
└── /404                    # Custom 404 page
```

Teaching is folded into /cv — no separate page or nav item.
Contact is not a separate page — email and social links in footer and floating icon strip.

### Navigation

- Nav items: Research, Projects, CV, Uses
- Floating icon strip (left, vertically centred): GitHub, Scholar, LinkedIn, Email (copy), divider, theme toggle
- Theme toggle opens a popover with 6 swatches (indigo/navy/warm × dark/light)
- Section dots (right, vertically centred): one dot per page section, scroll spy
- Back-to-top chevron above section dots, appears after 200px scroll
- Sticky nav: transparent at top, frosted glass on scroll
- Mobile (≤768px): hamburger menu, bottom-right icon bar, dots hidden

### Footer

- Name and tagline, social links, site nav links, copyright

---

## Key Decisions

| Decision                                    | Rationale                                                                   |
| ------------------------------------------- | --------------------------------------------------------------------------- |
| No Tailwind, no preprocessor                | Own CSS with custom properties; control over everything                     |
| 6 themes via `[data-theme]` on `<html>`     | Default indigo-light; picker in floating strip                              |
| All content in `src/lib/data/*.ts` with Zod | Single source of truth, build-time validation                               |
| No filters (deferred)                       | Too few items; schemas include filterable fields for later                  |
| No carousels                                | Use grids; all content visible at once                                      |
| Teaching folded into /cv                    | Not enough content for a separate page                                      |
| No contact page                             | Six links don't justify a route; in footer + icon strip                     |
| PASDA/Teralizer under /research only        | Research outputs tied to papers, not standalone projects                    |
| AIST projects as compact card grid          | External; link to AIST site; no detail pages                                |
| Featured projects = Erenshor + AK only      | Two cards is cleaner on homepage                                            |
| MSc thesis not counted as publication       | Not peer-reviewed in the same sense                                         |
| Screenshots auto-generated via Playwright   | `pnpm screenshots`; thumb (900px) + hero (1200px) WebP per project          |
| PDF generated separately from build         | Cloudflare Workers don't have Typst; `pnpm pdf` generates locally           |
| Hero images shown only when no `liveUrl`    | Iframe demo already shows the live site                                     |
| Email via copy-to-clipboard only            | Never appears in DOM; decoded from `PUBLIC_CONTACT_EMAIL_B64` at click time |

---

## Implementation Status

### Completed

- Project scaffold: SvelteKit 2 + Svelte 5 + TypeScript + adapter-static + Zod
- Tooling: ESLint, Prettier, Lefthook pre-commit hooks, commitlint
- 6-theme CSS system with oklch tokens, theme flash prevention
- Layout chrome: sticky nav, floating icon strip, section dots, footer, mobile nav
- CopyEmail component (env-var-based, clipboard only)
- Custom 404 page
- All Zod schemas for content types in `src/lib/data/`
- Homepage: hero, about/bio, featured publications, featured projects
- Research list: publications + AIST applied research card grid
- Research detail pages: TL;DR, abstract, presentations, tags, inline PDF viewer
- CV page: experience, education, publications, projects, teaching & supervision, presentations, service, skills; PDF download link
- Projects list: 2-column card grid, inset screenshot thumbnails, status badges, tech pills, link buttons
- Projects detail pages: challenge, solution, demo iframe (`?theme=dark`), How I Built This, tech stack, impact metrics
- Automated screenshot pipeline (`pnpm screenshots` — Playwright + sharp)
- Screenshot assets: 8 WebP files (thumb + hero per project), barrel file at `src/lib/assets/screenshots/index.ts`
- PDF pipeline: `pnpm pdf` → `static/johann-glock-cv-web.pdf` (deployed); `pnpm pdf:full` → `johann-glock-cv.pdf` (local, with contact)
- Git LFS tracking for all binary assets (WebP, PNG, PDF, fonts)
- Deployed to Cloudflare Workers at glockyco.com
- Research statement (bio) and professional tagline written

---

## Remaining Work

### Phase 2 — Remaining Pages

- [ ] **Uses page** — icon grid with category headings; short intro paragraph; optional per-tool one-liners (style of paper TL;DRs). Tool inventory in `src/lib/data/links.ts` (or new `uses.ts`).
- [ ] **Slide PDFs** — add presentation slide PDFs to `static/pdfs/`; link from CV presentations section and from research detail pages (schema fields already exist)

### Phase 3 — Polish

- [ ] **Breadcrumbs** on research and projects detail pages (`Home > Research > Paper Title`)
- [ ] **Meta tags / SEO** — per-page `<title>` + `<meta description>`, Open Graph tags, canonical URLs, JSON-LD structured data (Person, ScholarlyArticle)

### Phase 4 — Interactive Enhancements

- [ ] **One-click citation copy** — BibTeX and APA formats on paper detail pages
- [ ] **Figure grid galleries** — key figures in responsive grid on paper detail pages (not carousel)

### Phase 5 — Nice-to-Have

- [ ] **Stats/metrics row on homepage** — static counts: 4 publications, 7 semesters teaching, 2 research tools; maybe supervision count
- [ ] **Interactive timeline CV** — multiple tracks (Education, Work, Research, Projects); traditional view always available as toggle
- [ ] **Filter UI** for publications/projects — data schemas already support it; no migration needed
- [ ] **Data exploration** — sql.js browser for project databases (pre-built queries, schema browser)
- [ ] **Now page** (`/now`) — current focus / what I'm working on
