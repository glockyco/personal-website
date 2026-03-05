<script lang="ts">
  import { page } from '$app/state';
  import { profile } from '$lib/data/links';
  import monogram from '$lib/assets/monogram.png';

  const navLinks = [
    { href: '/research/', label: 'Research' },
    { href: '/projects/', label: 'Projects' },
    { href: '/cv/', label: 'CV' }
  ];

  let atTop = $state(true);
  let mobileOpen = $state(false);

  $effect(() => {
    function onScroll() {
      atTop = window.scrollY <= 50;
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function isActive(href: string) {
    return page.url.pathname.startsWith(href);
  }

  function closeMobile() {
    mobileOpen = false;
  }
</script>

<header class="nav-wrap" class:at-top={atTop}>
  <nav class="nav">
    <a class="name" href="/">
      <img class="monogram" src={monogram} alt="" width="28" height="28" />
      {profile.name}
    </a>

    <ul class="links">
      {#each navLinks as { href, label } (href)}
        <li>
          <a {href} class:active={isActive(href)} onclick={closeMobile}>{label}</a>
        </li>
      {/each}
    </ul>

    <button
      class="hamburger"
      aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
      aria-expanded={mobileOpen}
      onclick={() => (mobileOpen = !mobileOpen)}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>
  </nav>
</header>

{#if mobileOpen}
  <div class="mobile-menu">
    <ul>
      {#each navLinks as { href, label } (href)}
        <li>
          <a {href} class:active={isActive(href)} onclick={closeMobile}>{label}</a>
        </li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  .nav-wrap {
    position: sticky;
    top: 0;
    z-index: 50;
    background: var(--color-strip-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-border);
    transition:
      background var(--transition-base),
      border-color var(--transition-base),
      backdrop-filter var(--transition-base);
  }

  .nav-wrap.at-top {
    background: transparent;
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    border-bottom-color: transparent;
  }

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 900px;
    margin: 0 auto;
    padding: 20px 0;
  }

  .name {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-heading);
    letter-spacing: -0.02em;

    &:hover {
      color: var(--color-heading);
    }
  }

  .monogram {
    width: 28px;
    height: 28px;
    border-radius: 4px;
  }

  .links {
    display: flex;
    gap: 28px;
    list-style: none;
    align-items: center;

    a {
      color: var(--color-muted);
      font-size: 0.9rem;
      font-weight: 500;
      transition: color var(--transition-fast);
      position: relative;

      &:hover {
        color: var(--color-text);
      }

      &.active {
        color: var(--color-accent);

        &::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--color-accent);
          border-radius: 1px;
        }
      }
    }
  }

  .hamburger {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 36px;
    height: 36px;
    padding: 6px;
    border: none;
    background: transparent;
    cursor: pointer;
    border-radius: var(--radius-base);
    transition: background var(--transition-fast);

    &:hover {
      background: var(--color-accent-dim);
    }

    span {
      display: block;
      width: 100%;
      height: 2px;
      background: var(--color-muted);
      border-radius: 2px;
      transition:
        transform var(--transition-base),
        opacity var(--transition-base);
    }

    &[aria-expanded='true'] {
      span:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
        background: var(--color-accent);
      }
      span:nth-child(2) {
        opacity: 0;
      }
      span:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
        background: var(--color-accent);
      }
    }
  }

  .mobile-menu {
    position: fixed;
    left: 0;
    right: 0;
    z-index: 48;
    background: var(--color-surface);
    border-bottom: 1px solid var(--color-border);
    padding: 8px 40px 16px;
    box-shadow: 0 4px 16px oklch(0% 0 0 / 0.08);
    transition:
      background var(--transition-base),
      border-color var(--transition-base);

    ul {
      list-style: none;
    }

    a {
      display: block;
      padding: 10px 0;
      color: var(--color-muted);
      font-size: 1rem;
      font-weight: 500;
      border-bottom: 1px solid var(--color-border);
      transition: color var(--transition-fast);

      &:hover,
      &.active {
        color: var(--color-accent);
      }
    }

    li:last-child a {
      border-bottom: none;
    }
  }

  @media (max-width: 768px) {
    .links {
      display: none;
    }

    .hamburger {
      display: flex;
    }
  }
</style>
