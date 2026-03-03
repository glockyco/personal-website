---
paths:
  - "src/lib/components/**"
  - "src/routes/**/*.svelte"
---

# Component Architecture

## Granularity

If two or more components share identical structure, collapse them into one
with a `title` prop (e.g. teaching/supervision/service sections → single
`CvSection`). Inline small sub-components into their parent unless they
appear in more than one place.

Cards (`PublicationCard`, `ProjectCard`) accept a snippet for their action
area — list and featured contexts differ.

## Prop Patterns (Svelte 5)

Use `$props()` with an inline type annotation:

```ts
let { publication, compact = false }: {
  publication: Publication;
  compact?: boolean;
} = $props();
```

Pass full typed objects to data-driven components; destructure internally:

```svelte
<!-- Good -->
<PublicationCard {publication} />

<!-- Avoid -->
<PublicationCard title={pub.title} year={pub.year} venue={pub.venue} />
```

Use primitive props only for UI-only primitives (`ActionButton`,
`StatusBadge`) that have no data schema object to reference.

## Snippets

Use `{@render children?.()}` over boolean props — prefer snippets for
anything that varies across call sites. A third boolean flag is the signal
to switch to a snippet. Do not mix `{@render}` with legacy `<slot name="">`.

## State

No Svelte stores. For cross-cutting reactive state (e.g. mobile nav open),
use a `.svelte.ts` module:

```ts
// src/lib/state/nav.svelte.ts
let open = $state(false);
export const nav = {
  get open() { return open; },
  toggle() { open = !open; },
};
```

`$page.data` and prop drilling cover all page data needs.

## What Belongs in `+page.svelte`

Keep in the page: data destructured from `$page.data`, section ordering,
`<svelte:head>`, one-off structural markup that won't recur elsewhere.

Extract to a component when: it has its own state or events, it appears on
more than one page, its markup exceeds ~40 lines, or it needs variation
(e.g. compact vs. full card). If you would name it in a design mockup,
it is a component.

## Primitive Component Rules

1. No layout assumptions — primitives never set `margin`, `width`, or
   `position`. Callers handle placement.
2. `ActionButton` must require a `type` attribute as a typed prop.
3. Icon links (e.g. in `IconStrip`) require `aria-label` as a required prop.
4. Enforce accessibility requirements as required typed props, not docs.

## Barrel Exports

Each subdirectory under `src/lib/components/` gets an `index.ts`.
`src/lib/data/index.ts` re-exports all types. This keeps import paths
stable as the component tree grows.
