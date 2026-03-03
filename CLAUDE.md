# CLAUDE.md

Personal portfolio website for a PhD researcher transitioning to industry/continuing in academia.

## Tech Stack (Planned)

- SvelteKit + adapter-static
- Tailwind CSS + shadcn-svelte
- TypeScript
- Cloudflare Pages hosting

## Key Context

This site bridges academia and practical engineering:
- Academic: papers, presentations, research prototypes, datasets, teaching
- Technical: Erenshor/Ancient Kingdoms modding ecosystem (data mining, interactive maps, wikis)
- Prior: web development, research, teaching

Target audiences: both academia and industry.

## Getting Started

See PLAN.md "Quick Start Commands" section for project initialization.

## Git Conventions

Follow https://cbea.ms/git-commit/ plus conventional commits.

**Subject line** (`type(scope): imperative summary`):
- Format: `type(scope): imperative summary of change`
- 50 characters or less (72 hard limit)
- Lowercase after the colon; no trailing period
- Imperative mood: "add feature" not "added feature"
- Common types: `feat`, `fix`, `docs`, `style`, `refactor`, `chore`
- Scope is optional but encouraged (e.g. `plan`, `theme-demo`, `layout`)

**Body** (when needed):
- Blank line between subject and body
- Wrap at 72 characters
- Explain *what* and *why*, not how
- Prose paragraphs, not bullet lists

## Related Projects

- `~/Projects/Erenshor` - Interactive maps (SvelteKit + deck.gl)
- `~/Projects/ancient-kingdoms-mods` - Game modding ecosystem
