---
paths:
  - 'src/routes/**'
  - 'svelte.config.*'
  - 'vite.config.*'
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
if (browser) {
  /* localStorage, window, document, etc. */
}
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

## SSR-First Rendering

All content determinable at build/SSR time must be rendered during SSR —
never deferred to `$effect`. `$effect` runs only on the client after
hydration; anything gated behind it will flash or pop in.

Pass static page metadata (section navigation, page titles, structured
data) through `load()` so it is available during SSR. The root layout can
access child page data via `page.data` from `$app/state`:

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import { page } from '$app/state';
  const sections = $derived(page.data.sections ?? []);
</script>

<SectionDots {sections} />
```

```ts
// +page.ts
export function load() {
  return { sections: [{ id: 'hero', label: 'Top' }, ...] };
}
```

Reserve `$effect` for genuinely client-only concerns: scroll listeners,
`localStorage`, `IntersectionObserver`, `window`, `document`. For
components with both SSR structure and client behaviour (e.g. a nav that
shows a backdrop when scrolled), choose the CSS default that is correct
for the majority of page loads and adjust on the client — never start
invisible or unstyled.

## Type Generation

Run `pnpm check` (which runs `svelte-kit sync`) after adding new routes.
Missing generated `$types` are the most common first-run failure after
adding a route file.
