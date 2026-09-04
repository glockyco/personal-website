# Personal Website

Personal portfolio and CV for Johann Glock, a researcher and senior software engineer at SCCH and a PhD candidate in Informatics.

Live site: <https://glockyco.com>

## What this is

The site presents research and engineering work in one place. It includes:

- portfolio sections for projects and research
- a web-rendered CV at `/cv`
- a downloadable PDF CV (web variant, no private contact info)
- a local pipeline for application-specific PDF CVs and cover letters

## Tech stack

- SvelteKit 2 and Svelte 5
- TypeScript
- Plain CSS with custom properties (no Tailwind)
- Zod for build-time data validation
- Typst for PDF CV and cover letter generation
- Cloudflare Workers via Wrangler
- pnpm

## Project structure

```text
src/lib/data/         site content (projects, publications, CV, links)
src/lib/components/   shared UI components
src/lib/assets/       images and project screenshots
src/routes/           SvelteKit routes
scripts/              PDF, cover letter, and screenshot pipelines
applications/         private submodule for application-specific letters
notes/                local working notes (gitignored)
```

All site content lives as TypeScript modules under `src/lib/data/` and is validated with Zod at build time.

## Local development

Install Nix with flakes and direnv support. Then allow the project environment:

```bash
direnv allow
```

The development shell supplies Node.js, pnpm, and Typst. Enter it directly if you do not use direnv:

```bash
nix develop
```

Download the Git LFS assets:

```bash
git lfs pull
```

Install dependencies:

```bash
pnpm install --frozen-lockfile
```

If you have access to the private application content repository, initialize the submodule:

```bash
git submodule update --init
```

Without the submodule, cover letter compilation will fail. Everything else still works.

Start the development server:

```bash
pnpm dev
```

## Build and preview

```bash
pnpm build
pnpm preview
```

## Quality checks

```bash
pnpm check
pnpm lint
pnpm format
```

## PDF CV

Two flavors, generated locally from the same TypeScript data:

```bash
pnpm pdf           # web variant, no contact info -> static/johann-glock-cv-web.pdf
pnpm pdf:full      # application variant with email and phone -> outputs/johann-glock-cv.pdf
```

Requires the Typst CLI:

```bash
brew install typst
```

`pnpm build` and `pnpm pdf` are intentionally separate. Cloudflare Workers builds do not have Typst available, so the web variant is generated locally and picked up from `static/` during deploy.

For the full variant, set `CV_EMAIL` and `CV_PHONE` in the shell or in `.env.local` (see `.env.example`). These values never touch git or the deployed site.

## Cover letters

```bash
pnpm cover-letter <app>       # public variant
pnpm cover-letter:full <app>  # with contact info from the shell or .env.local
```

Application-specific content lives in the private `applications/` submodule. The shared Typst template is in `scripts/cover-letter-base.typ`.

## Project screenshots

```bash
pnpm screenshots
```

Captures viewport thumbnails for each project's live URL via Playwright. One-time setup:

```bash
pnpm exec playwright install chromium
```

## Deployment

```bash
pnpm cf-deploy
```

Builds the site, regenerates the web PDF CV, and deploys via Wrangler.

## License

Source code in this repository is licensed under the MIT License. See [LICENSE](LICENSE).

Site content (text, photographs, CV data, visual design, and other non-code assets) is © Johann Glock. All rights reserved. The MIT permissions apply to source code only.
