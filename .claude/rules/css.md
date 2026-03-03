---
paths:
  - 'src/**/*.svelte'
  - 'src/**/*.css'
---

# CSS Architecture

## Global (`src/app.css`)

Declare layers at the top: `@layer base, theme`. Put resets and typography
in `base`, theme tokens in `theme`. Do not create a `components` layer —
Svelte's scoped styles are unlayered and always win over layered rules,
so specificity fights never arise.

## Theme Tokens

All colour values live in `[data-theme]` blocks as CSS custom properties.
Use semantic names only — never encode the colour value in the name:

```css
[data-theme='indigo-light'] {
  --color-surface: oklch(97% 0.02 245);
  --color-surface-alt: oklch(93% 0.03 245);
  --color-text: oklch(20% 0.05 245);
  --color-text-muted: oklch(45% 0.05 245);
  --color-accent: oklch(55% 0.18 245);
  --color-border: oklch(85% 0.04 245);
}
```

Use `oklch()` for all colour values. Derive hover/active colours with
`color-mix()` rather than defining separate tokens:

```css
background: color-mix(in oklch, var(--color-accent) 85%, transparent);
```

Standard token categories: `--color-*`, `--space-*`, `--text-*` (font
sizes), `--radius-*`, `--transition-*`.

## Motion and Focus

Define in `app.css`, not per-component:

```css
@media (prefers-reduced-motion: reduce) {
  --transition-fast: 0ms;
  --transition-base: 0ms;
}
```

Focus ring applied once in `@layer base` using tokens:

```css
@layer base {
  :focus-visible {
    outline: var(--focus-ring);
    outline-offset: var(--focus-ring-offset);
  }
}
```

## Theme Flash Prevention

`app.html` must include an inline `<script>` (before the bundle) that
reads `localStorage` and sets `data-theme` on `<html>` synchronously.
Without this, users will see a flash of the default theme on every load.

## Component Styles

Use Svelte scoped `<style>` blocks. Short semantic class names (`.title`,
`.meta`, `.card`) — no BEM needed, Svelte handles scoping automatically.

Use native CSS nesting. Do not use `:global()` inside nested rules — hoist
any `:global()` to the top level of the style block instead.
