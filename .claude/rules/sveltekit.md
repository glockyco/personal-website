---
paths:
  - "src/routes/**"
  - "svelte.config.*"
  - "vite.config.*"
---

# SvelteKit / adapter-static

## Prerendering

Enable globally in `src/routes/+layout.ts` — do not set per-page:

```ts
export const prerender = true;
export const trailingSlash = 'always';
```

`trailingSlash = 'always'` is required for Cloudflare Workers, which
serves `foo/index.html` but not `foo.html`.

Dynamic routes (e.g. `/research/[slug]`) require an `entries()` export.
Omitting it silently produces no output for those routes — the build
succeeds but the pages do not exist.

## Load Functions

Use `+page.ts` only. With adapter-static there is no runtime server, so
`+page.server.ts` is misleading — it only runs at build time and offers
no benefit over `+page.ts` for this project.

`load` functions import and return already-validated data from `$lib/data/`:

```ts
// src/routes/research/+page.ts
import { publications } from '$lib/data/publications';
import type { PageLoad } from './$types';

export const load: PageLoad = () => ({ publications });
```

Zod validation belongs in `$lib/data/`, not in `load`.

## Browser API Guard

All routes run in Node during prerender. Guard every browser API:

```ts
import { browser } from '$app/environment';
if (browser) { /* localStorage, window, document, etc. */ }
```

## Loud Prerender Failures

In `svelte.config.js`, make prerender failures fail the build explicitly:

```js
kit: {
  prerender: {
    handleHttpError: 'fail',
    handleMissingId: 'fail',
  },
},
```

## Type Generation

Run `pnpm check` (which runs `svelte-kit sync`) after adding new routes.
Missing generated `$types` are the most common first-run failure after
adding a route file.
