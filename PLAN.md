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
│   └── /research/[slug]    # Paper detail (abstract, TL;DR, related, tags)
├── /talks                  # Talks & presentations list
│   └── /talks/[slug]       # Talk detail (description, slides, video, related)
├── /projects               # Hobby project grid (4 projects)
│   └── /projects/[slug]    # Project detail (challenge, solution, demo, tech stack)
├── /cv                     # CV page (experience, education, teaching, supervision, service)
├── /uses                   # Tools and daily workflow  [not yet built]
└── /404                    # Custom 404 page
```

Teaching is folded into /cv — no separate page or nav item.
Contact is not a separate page — email and social links in footer and floating icon strip.

### Navigation

- Nav items: Research, Talks, Projects, CV, Uses
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

| Decision                                    | Rationale                                                                                                  |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| No Tailwind, no preprocessor                | Own CSS with custom properties; control over everything                                                    |
| 6 themes via `[data-theme]` on `<html>`     | Default indigo-light; picker in floating strip                                                             |
| All content in `src/lib/data/*.ts` with Zod | Single source of truth, build-time validation                                                              |
| No filters (deferred)                       | Too few items; schemas include filterable fields for later                                                 |
| No carousels                                | Use grids; all content visible at once                                                                     |
| Teaching folded into /cv                    | Not enough content for a separate page                                                                     |
| No contact page                             | Six links don't justify a route; in footer + icon strip                                                    |
| PASDA/Teralizer under /research only        | Research outputs tied to papers, not standalone projects                                                   |
| AIST projects as compact card grid          | External; link to AIST site; no detail pages                                                               |
| Featured projects = Erenshor + AK only      | Two cards is cleaner on homepage                                                                           |
| MSc thesis not counted as publication       | Not peer-reviewed in the same sense                                                                        |
| Screenshots auto-generated via Playwright   | `pnpm screenshots`; thumb (900px) + hero (1200px) WebP per project                                         |
| PDF generated separately from build         | Cloudflare Workers don't have Typst; `pnpm pdf` generates locally                                          |
| Hero images shown only when no `liveUrl`    | Iframe demo already shows the live site                                                                    |
| Email via copy-to-clipboard only            | Never appears in DOM; decoded from `PUBLIC_CONTACT_EMAIL_B64` at click time                                |
| Talks as top-level route                    | Presentations span multiple papers/projects; hiding them on paper pages makes them hard to discover        |
| Relations registry (`relations.ts`)         | Single-declaration bidirectional cross-links between any entity types; no schema coupling between entities |
| Presentations consolidated into talks       | Single source of truth; old inline `PaperPresentationSchema` and CV `PresentationSchema` removed           |

---

## Remaining Work

### Phase 1 — Talks & Cross-Linking

- [ ] **Talk data model** — `src/lib/data/talks.ts` with `TalkSchema` (slug, title, event,
      location, year, type, description, slides, video, figures, tags, note, featured);
      migrate 3 existing presentations from `cv.ts` + 1 from `publications.ts` (deduplicated)
- [ ] **Relations registry** — `src/lib/data/relations.ts` with `RelationSchema`
      (`{ a: EntityRef, b: EntityRef, label? }`); helper functions `getRelated(type, slug)`
      and `getRelatedOfType(type, slug, targetType)` for build-time bidirectional lookups
- [ ] **Schema cleanup** — remove `PaperPresentationSchema` and `presentations` field from
      `PublicationSchema`; remove `PresentationSchema` and `presentations` array from `cv.ts`;
      remove unused `relatedPapers`/`relatedProjects` fields from `PublicationSchema` and
      `ProjectSchema`
- [ ] **Talks overview page** (`/talks/`) — reverse-chronological list of talk cards with
      type badges, event info, and action links (slides, video)
- [ ] **Talk detail pages** (`/talks/[slug]/`) — header, description, embedded slides PDF,
      embedded video, figures, related entities (from registry), tags
- [ ] **Nav update** — add "Talks" between Research and Projects in `Nav.svelte`
- [ ] **Cross-link UI: research detail** — replace inline presentations section with
      "Related" section showing related talks, projects, and papers from the registry
- [ ] **Cross-link UI: project detail** — add "Related" section showing related papers
      and talks from the registry
- [ ] **Cross-link UI: CV page** — add "Presentations" section importing from `talks` data,
      linking to `/talks/[slug]/` detail pages
- [ ] **Sitemap update** — add talk routes to `sitemap.xml/+server.ts`

### Phase 2 — Uses Page

- [ ] **Uses page** — icon grid with category headings; short intro paragraph; optional
      per-tool one-liners (style of paper TL;DRs). Tool inventory in `src/lib/data/links.ts`
      (or new `uses.ts`).

### Phase 3 — Polish

- [ ] **Breadcrumbs** on research, talks, and projects detail pages (`Home > Research > Paper Title`)
- [ ] **Meta tags / SEO** — per-page `<title>` + `<meta description>`, Open Graph tags,
      JSON-LD structured data (Person, ScholarlyArticle). Canonical URLs and sitemap.xml
      are already in place.

### Phase 4 — Interactive Enhancements

- [ ] **One-click citation copy** — BibTeX and APA formats on paper detail pages
- [ ] **Figure grid galleries** — key figures in responsive grid on paper detail pages (not carousel)

### Phase 5 — Nice-to-Have

- [ ] **Stats/metrics row on homepage** — static counts: 4 publications, 7 semesters teaching, 2 research tools; maybe supervision count
- [ ] **Interactive timeline CV** — multiple tracks (Education, Work, Research, Projects); traditional view always available as toggle
- [ ] **Filter UI** for publications/projects/talks — data schemas already support it; no migration needed
- [ ] **Data exploration** — sql.js browser for project databases (pre-built queries, schema browser)
- [ ] **Now page** (`/now`) — current focus / what I'm working on

### Deferred

- [ ] **Unified visibility system** — configurable per-entity inclusion/exclusion for web CV
      vs. PDF CV vs. site-wide display; applicable to all entity types (talks, papers, projects)
- [ ] **Talk grouping toggle** — "by date" vs "by tag" view on `/talks/` overview page;
      tags on talks serve as lightweight topic grouping
- [ ] **Featured talks on homepage** — `featured: true` talks shown in a homepage section
- [ ] **Slide PDF assets** — add actual slide PDFs to `static/pdfs/` and reference from talk data
