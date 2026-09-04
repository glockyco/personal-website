# Personal website

Personal portfolio website for Johann Glock, a researcher and senior software
engineer at SCCH and a PhD candidate in Informatics at the University of
Klagenfurt. His work connects academic research and practical engineering.

## Tech Stack

- SvelteKit 2 + Svelte 5 + TypeScript
- Plain CSS — native only, no Tailwind, no preprocessor
- Zod — build-time data validation
- Cloudflare Workers — static asset hosting via wrangler
- adapter-static — full prerendering, all routes

## Key Decisions

- No Tailwind, no shadcn-svelte. Own CSS with custom properties.
- 6 themes (indigo/navy/warm × dark/light) via `[data-theme]` on `<html>`.
- All content in TypeScript data files under `src/lib/data/`, validated with Zod.
- Teaching is folded into /cv — no dedicated /teaching page or nav item.
- PASDA and Teralizer are research outputs — they live under /research, not /projects.
- Private working notes live in `notes/` (gitignored).
- Job application content lives in `applications/` — a git submodule pointing
  to the private `glockyco/job-applications` repo. The submodule is not
  cloneable without access to that repo. Without it, cover letter compilation
  will fail. Run `git submodule update --init` after cloning.

## Dev Commands

```bash
pnpm dev                     # start dev server
pnpm build                   # production build (prerenders all routes)
pnpm preview                 # preview production build locally
pnpm check                   # svelte-kit sync + svelte-check + tsc
pnpm lint                    # eslint
pnpm format                  # prettier --write
pnpm pdf                     # build site + generate public CV PDF (no contact) → static/johann-glock-cv-web.pdf
pnpm pdf:full                # build site + generate application CV PDF (with contact) → outputs/johann-glock-cv.pdf
pnpm cover-letter <app>      # compile cover letter → outputs/<app>/johann-glock-cover-letter.pdf
pnpm cover-letter:full <app> # same but with email/phone from .env.local
```

`pnpm build` and `pnpm pdf` are intentionally separate. `pnpm build` is used
by Cloudflare Workers deployments, which don't have Typst installed. The PDF
is generated locally with `pnpm pdf` into `static/johann-glock-cv-web.pdf`
(gitignored), then `pnpm build` picks it up from `static/` and includes it in
the `build/` output for deployment.

### PDF Generation

The CV PDF is generated from a Typst template (`scripts/cv.typ`) using data
exported from the TypeScript data files. No separate content — single source
of truth.

**Prerequisite:** `brew install typst` (one-time local setup).

- `pnpm pdf` outputs `static/johann-glock-cv-web.pdf` (deployed with the site, linked from /cv).
- `pnpm pdf:full` outputs `outputs/johann-glock-cv.pdf` (local only, for job applications).
  Set `CV_EMAIL` and `CV_PHONE` env vars — passed as Typst inputs at compile
  time. These never touch git or the deployed site.
  ```bash
  CV_EMAIL="you@example.com" CV_PHONE="+43 ..." pnpm pdf:full
  ```

**Pipeline:** `scripts/export-cv-data.ts` → `scripts/cv-data.json` (gitignored)
→ `typst compile --font-path scripts/fonts --root . scripts/cv.typ <output>`
→ JSON cleaned up.

**Fonts:** Inter static weights in `scripts/fonts/` (committed). Typst picks
them up via `--font-path`.

### Cover Letters

Application-specific cover letter content lives in `applications/` (a git
submodule pointing to the private `glockyco/job-applications` repo). The
shared Typst template (`scripts/cover-letter-base.typ`) provides layout,
styling, and the header. Each application has its own `letter.typ` that
imports the base template and contains the letter text.

**Prerequisite:** `git submodule update --init` (one-time after cloning).

- `pnpm cover-letter scch` outputs `outputs/scch/johann-glock-cover-letter.pdf`.
- `pnpm cover-letter:full scch` — same but with email/phone from `.env.local`.
  Requires `CV_EMAIL` and `CV_PHONE` to be set.

**Adding a new application:** Create `applications/<name>/letter.typ`,
import the base template with `#import "/scripts/cover-letter-base.typ": cover-letter`,
and use `#show: cover-letter` to apply the shared layout.

## Commits

Use `skill://commit-policy`. The repository hooks and `commitlint.config.js` own the permitted Conventional Commit shape. Never push without an explicit request.
