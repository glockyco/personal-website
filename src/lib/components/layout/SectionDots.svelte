<script lang="ts">
  import { browser } from '$app/environment';
  import { sectionNav } from '$lib/state/sections.svelte';

  let activeSectionId = $state<string | null>(null);
  let showTopBtn = $state(false);
  let suppressSpy = false;
  let spyTimer: ReturnType<typeof setTimeout>;

  function getActiveSection(navHeight: number): string | null {
    const sections = sectionNav.sections;
    if (!sections.length) return null;
    const threshold = navHeight + 20;
    let active: string | null = null;
    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= threshold) {
        active = id;
      }
    }
    const atBottom =
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5;
    if (atBottom) return sections[sections.length - 1].id;
    return active ?? sections[0].id;
  }

  function getNavHeight(): number {
    const nav = document.querySelector('.nav-wrap');
    return nav ? nav.getBoundingClientRect().height : 60;
  }

  $effect(() => {
    if (!browser) return;
    function onScroll() {
      showTopBtn = window.scrollY > 200;
      if (!suppressSpy) {
        activeSectionId = getActiveSection(getNavHeight());
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    activeSectionId = id;
    suppressSpy = true;
    clearTimeout(spyTimer);
    const y = el.getBoundingClientRect().top + window.scrollY - getNavHeight() - 3;
    window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    spyTimer = setTimeout(() => {
      suppressSpy = false;
      activeSectionId = getActiveSection(getNavHeight());
    }, 800);
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
</script>

{#if sectionNav.sections.length > 0}
  <nav class="dots" aria-label="Page sections">
    <button
      class="top-btn"
      class:visible={showTopBtn}
      aria-label="Back to top"
      onclick={scrollToTop}
    >
      <!-- Chevron up -->
      <svg
        viewBox="0 0 24 24"
        width="14"
        height="14"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>

    {#each sectionNav.sections as { id, label } (id)}
      <button
        class="dot"
        class:active={activeSectionId === id}
        aria-label={label}
        title={label}
        onclick={() => scrollToSection(id)}
      ></button>
    {/each}
  </nav>
{/if}

<style>
  .dots {
    position: fixed;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 200;
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
  }

  .top-btn {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-muted);
    margin-bottom: 4px;
    opacity: 0;
    pointer-events: none;
    transition:
      color var(--transition-base),
      background var(--transition-base),
      opacity var(--transition-base);

    &.visible {
      opacity: 1;
      pointer-events: auto;
    }

    &:hover {
      color: var(--color-accent);
      background: var(--color-accent-dim);
    }
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: var(--color-border);
    border: none;
    padding: 0;
    cursor: pointer;
    transition:
      background var(--transition-base),
      transform var(--transition-base);
    display: block;

    &:hover {
      background: var(--color-muted);
      transform: scale(1.3);
    }

    &.active {
      background: var(--color-accent);
      transform: scale(1.3);
    }
  }

  @media (max-width: 768px) {
    .dots {
      display: none;
    }
  }
</style>
