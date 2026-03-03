<script lang="ts">
  import { theme, themes } from '$lib/state/theme.svelte';

  let open = $state(false);

  function toggleOpen(e: MouseEvent) {
    e.stopPropagation();
    open = !open;
  }

  function pick(id: (typeof themes)[number]['id'], e: MouseEvent) {
    e.stopPropagation();
    theme.set(id);
    open = false;
  }

  $effect(() => {
    if (!open) return;
    function close() {
      open = false;
    }
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  });
</script>

<!-- Theme toggle button (rendered inside IconStrip) -->
<button class="toggle" aria-label="Change theme" onclick={toggleOpen}>
  <div class="icon"></div>
</button>

{#if open}
  <div
    class="popover"
    role="menu"
    tabindex="-1"
    onclick={(e) => e.stopPropagation()}
    onkeydown={(e) => e.stopPropagation()}
  >
    <span class="label">Theme</span>
    {#each themes as t (t.id)}
      <button
        class="option"
        class:active={theme.current === t.id}
        data-pick-theme={t.id}
        onclick={(e) => pick(t.id, e)}
      >
        <span class="swatch" style="--swatch-bg: {t.swatchBg}; --swatch-accent: {t.swatchAccent}"
        ></span>
        {t.label}
      </button>
    {/each}
  </div>
{/if}

<style>
  .toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-base);
    border: none;
    background: transparent;
    color: var(--color-muted);
    cursor: pointer;
    padding: 0;
    transition: all var(--transition-fast);

    &:hover {
      color: var(--color-accent);
      background: var(--color-accent-dim);
    }
  }

  /* Diagonal split circle: left = bg colour, right = accent */
  .icon {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    position: relative;
    overflow: hidden;
    border: 2px solid var(--color-muted);
    transition: border-color var(--transition-fast);
    flex-shrink: 0;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--theme-icon-left);
      clip-path: polygon(0 0, 100% 0, 0 100%);
      transition: background var(--transition-base);
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--theme-icon-right);
      clip-path: polygon(100% 0, 100% 100%, 0 100%);
      transition: background var(--transition-base);
    }
  }

  .toggle:hover .icon {
    border-color: var(--color-accent);
  }

  .popover {
    position: fixed;
    left: 64px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 201;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-width: 160px;
    box-shadow: 0 8px 32px oklch(0% 0 0 / 0.25);
    transition:
      background var(--transition-base),
      border-color var(--transition-base);
  }

  .label {
    font-size: var(--text-xs);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--color-muted);
    padding: 2px 8px;
  }

  .option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 10px;
    border: none;
    border-radius: var(--radius-base);
    background: transparent;
    color: var(--color-heading);
    font-family: inherit;
    font-size: 0.8rem;
    cursor: pointer;
    transition: background var(--transition-fast);
    width: 100%;
    text-align: left;

    &:hover {
      background: var(--color-surface-hover);
    }

    &.active {
      background: var(--color-accent-dim);
      font-weight: 600;
    }
  }

  /* Diagonal split circle swatch using CSS vars set inline */
  .swatch {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    flex-shrink: 0;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--swatch-bg);
      clip-path: polygon(0 0, 100% 0, 0 100%);
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: var(--swatch-accent);
      clip-path: polygon(100% 0, 100% 100%, 0 100%);
    }
  }

  @media (max-width: 768px) {
    .popover {
      left: auto;
      right: 8px;
      top: auto;
      bottom: 72px;
      transform: none;
    }
  }
</style>
