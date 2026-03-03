<script lang="ts">
  import { browser } from '$app/environment';
  import { PUBLIC_CONTACT_EMAIL_B64 } from '$env/static/public';

  let { variant }: { variant: 'icon' | 'text' } = $props();

  let copied = $state(false);
  let timer: ReturnType<typeof setTimeout>;

  function copy() {
    if (!browser || !PUBLIC_CONTACT_EMAIL_B64) return;
    navigator.clipboard.writeText(atob(PUBLIC_CONTACT_EMAIL_B64));
    copied = true;
    clearTimeout(timer);
    timer = setTimeout(() => (copied = false), 2000);
  }
</script>

{#if variant === 'icon'}
  <button class="icon-btn" onclick={copy} aria-label="Copy email address">
    <!-- Envelope icon -->
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
    {#if copied}
      <span class="toast" role="status">Copied!</span>
    {/if}
  </button>
{:else}
  <button class="text-btn" onclick={copy}>
    Email
    {#if copied}
      <span class="toast toast--text" role="status">Copied!</span>
    {/if}
  </button>
{/if}

<style>
  /* ── icon variant ── */
  .icon-btn {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border: none;
    border-radius: var(--radius-base);
    background: transparent;
    color: var(--color-muted);
    cursor: pointer;
    padding: 0;
    transition: all var(--transition-fast);

    &:hover {
      color: var(--color-accent);
      background: var(--color-accent-dim);
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }

  /* ── text variant ── */
  .text-btn {
    position: relative;
    border: none;
    background: transparent;
    padding: 0;
    cursor: pointer;
    color: var(--color-muted);
    font-size: var(--text-sm);
    font-family: inherit;
    transition: color var(--transition-fast);

    &:hover {
      color: var(--color-accent);
    }
  }

  /* ── toast ── */
  .toast {
    position: absolute;
    bottom: calc(100% + 8px);
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    background: var(--color-surface);
    color: var(--color-text);
    font-size: var(--text-xs);
    padding: 4px 8px;
    border-radius: var(--radius-base);
    border: 1px solid var(--color-border);
    pointer-events: none;
    z-index: 300;
  }

  .toast--text {
    bottom: auto;
    top: calc(100% + 4px);
  }
</style>
