<script lang="ts">
  import { profile } from '$lib/data/links';
  import ThemePicker from './ThemePicker.svelte';
  import CopyEmail from './CopyEmail.svelte';
</script>

<div class="strip">
  <a href={profile.github} aria-label="GitHub">
    <!-- GitHub icon -->
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path
        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
      />
    </svg>
  </a>

  <a href={profile.scholar} aria-label="Google Scholar">
    <!-- Graduation cap icon -->
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c0 2 4 3 6 3s6-1 6-3v-5" />
    </svg>
  </a>

  <a href={profile.linkedin} aria-label="LinkedIn">
    <!-- LinkedIn icon -->
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  </a>

  <CopyEmail variant="icon" />

  <div class="divider"></div>

  <ThemePicker />
</div>

<style>
  .strip {
    position: fixed;
    left: 16px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 200;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 10px 6px;
    background: var(--color-strip-bg);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
    transition:
      background var(--transition-base),
      border-color var(--transition-base);
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-base);
    color: var(--color-muted);
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

  .divider {
    width: 20px;
    height: 1px;
    background: var(--color-border);
    margin: 4px 0;
    transition: background var(--transition-base);
  }

  @media (max-width: 768px) {
    .strip {
      left: auto;
      right: 8px;
      top: auto;
      bottom: 16px;
      transform: none;
      flex-direction: row;
      padding: 6px 10px;
    }

    .divider {
      width: 1px;
      height: 20px;
      margin: 0 4px;
    }
  }
</style>
