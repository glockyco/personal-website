# CLAUDE.md

Personal portfolio website for Johann Glock — PhD researcher in empirical
software engineering at University of Klagenfurt, bridging academia and
practical engineering.

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

## Dev Commands

```bash
pnpm dev        # start dev server
pnpm build      # production build (prerenders all routes)
pnpm preview    # preview production build locally
pnpm check      # svelte-kit sync + svelte-check + tsc
pnpm lint       # eslint
pnpm format     # prettier --write
```

## Git Conventions

Follow https://cbea.ms/git-commit/ plus conventional commits.

**Subject line** (`type(scope): imperative summary`):
- 50 characters or less (72 hard limit)
- Lowercase after the colon; no trailing period
- Imperative mood: "add feature" not "added feature"
- Types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`, `ci`
- Scope encouraged: `nav`, `cv`, `research`, `data`, `config`, `layout`

**Body** (when needed):
- Blank line between subject and body
- Wrap at 72 characters
- Explain what and why, not how
- Prose paragraphs, not bullet lists

## Related Projects

- `~/Projects/Erenshor` — SvelteKit 2, Svelte 5, TypeScript, deck.gl 9,
  Leaflet, sql.js (SQLite/WASM), Tailwind CSS 4, BepInEx C# mods (Unity,
  netstandard2.1), Unity Editor C# scripts, Python 3.13 (Typer CLI,
  SQLModel, Pydantic, Pillow, httpx, Jinja2, MediaWiki bot), SteamCMD,
  Thunderstore, Cloudflare Workers

- `~/Projects/ancient-kingdoms-mods` — SvelteKit 2, Svelte 5, TypeScript,
  deck.gl 9, sql.js + better-sqlite3 (SQLite/WASM + SSG), Tailwind CSS 4,
  MelonLoader C# mods (Unity IL2CPP, net6.0), Python 3.12 (Typer CLI,
  Pydantic, Pillow, UnityPy, Rich), steamcmd, ilspycmd, Cloudflare Workers

- `~/Projects/10-man-idle-mods` (github: glockyco/10-man-idle-mods) —
  Astro 5, TypeScript, Tailwind CSS 4, better-sqlite3 (SSG), Pagefind,
  Lefthook, Biome, C# (.NET 8, custom StartupHook loader, Harmony),
  Cloudflare Workers
