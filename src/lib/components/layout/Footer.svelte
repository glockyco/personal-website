<script lang="ts">
  import { profile } from '$lib/data/links';

  const currentYear = new Date().getFullYear();

  const links = [
    { href: profile.github, label: 'GitHub' },
    { href: profile.scholar, label: 'Scholar' },
    { href: `https://orcid.org/${profile.orcid}`, label: 'ORCID' },
    { href: profile.linkedin, label: 'LinkedIn' },
    { href: `mailto:${profile.email}`, label: 'Email' }
  ];
</script>

<footer class="footer">
  <ul class="social">
    {#each links as { href, label } (label)}
      <li>
        <a
          {href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel="noopener noreferrer">{label}</a
        >
      </li>
    {/each}
  </ul>
  <p class="copy">{profile.name} &middot; {currentYear}</p>
</footer>

<style>
  .footer {
    padding: 48px 0 40px;
    text-align: center;
    border-top: 1px solid var(--color-border);
    margin-top: 48px;
    transition: border-color var(--transition-base);
  }

  .social {
    display: flex;
    gap: 24px;
    justify-content: center;
    list-style: none;
    flex-wrap: wrap;
    margin-bottom: 16px;

    a {
      color: var(--color-muted);
      font-size: var(--text-sm);
      transition: color var(--transition-fast);

      &:hover {
        color: var(--color-accent);
      }
    }
  }

  .copy {
    font-size: var(--text-xs);
    color: var(--color-muted);
  }
</style>
