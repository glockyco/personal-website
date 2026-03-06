<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import { Nav, IconStrip, SectionDots, Footer } from '$lib/components/layout';

  let { children } = $props();

  const sections = $derived(page.data.sections ?? []);
</script>

<svelte:head>
  <title>Johann Glock</title>
  <link rel="canonical" href="https://glockyco.com{page.url.pathname}" />
</svelte:head>

<!-- 3px accent bar at the very top -->
<div class="accent-bar"></div>

<div class="layout-shell">
  <div class="page">
    <Nav />
    <main>
      {@render children()}
    </main>
    <Footer />
  </div>
</div>

<IconStrip />
<SectionDots {sections} />

<style>
  .accent-bar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    z-index: 100;
    background: var(--color-top-bar);
    transition: background var(--transition-base);
  }
</style>
