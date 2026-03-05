import { z } from 'zod';

// ── Schemas ──────────────────────────────────────────────────────────────────

export const TechnicalDecisionSchema = z.object({
  decision: z.string(),
  rationale: z.string()
});

export const ProjectMetricsSchema = z.object({
  users: z.string().optional(),
  dataScale: z.string().optional()
});

export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  tagline: z.string(),
  status: z.enum(['active', 'maintained', 'inactive', 'archived']),
  featured: z.boolean(),

  challenge: z.string().optional(),
  solution: z.string().optional(),

  heroImage: z.string().optional(),
  screenshots: z.array(z.string()).optional(),

  liveUrl: z.string().url().optional(),
  githubUrl: z.string().url().optional(),
  steamUrl: z.string().url().optional(),
  thunderstoreUrl: z.string().url().optional(),
  wikiUrl: z.string().url().optional(),

  techStack: z.array(z.string()),

  architecture: z.string().optional(),
  technicalDecisions: z.array(TechnicalDecisionSchema).optional(),
  whatIdDoDifferently: z.string().optional(),

  metrics: ProjectMetricsSchema.optional(),

  relatedPapers: z.array(z.string()).optional()
});

// ── Types ─────────────────────────────────────────────────────────────────────

export type TechnicalDecision = z.infer<typeof TechnicalDecisionSchema>;
export type ProjectMetrics = z.infer<typeof ProjectMetricsSchema>;
export type Project = z.infer<typeof ProjectSchema>;

// ── Data ──────────────────────────────────────────────────────────────────────

const rawProjects = [
  {
    slug: 'erenshor',
    title: 'Erenshor Community Tools',
    tagline: 'Interactive maps, mods, and wiki bot for the Erenshor community',
    status: 'active' as const,
    featured: true,
    liveUrl: 'https://erenshor-maps.wowmuch1.workers.dev/',
    githubUrl: 'https://github.com/glockyco/erenshor-data-mining',
    steamUrl: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3500398991',
    thunderstoreUrl: 'https://thunderstore.io/c/erenshor/p/WoW_Much/',
    wikiUrl: 'https://erenshor.wiki.gg/wiki/User:WoWMuch',
    techStack: [
      'SvelteKit',
      'TypeScript',
      'deck.gl',
      'Leaflet',
      'SQLite',
      'Tailwind CSS',
      'Python',
      'C#',
      'MediaWiki',
      'Cloudflare Workers'
    ]
  },
  {
    slug: 'ancient-kingdoms',
    title: 'Ancient Kingdoms Compendium',
    tagline: 'Data-mined compendium and interactive world map for Ancient Kingdoms',
    status: 'active' as const,
    featured: true,
    liveUrl: 'https://ancient-kingdoms-compendium.wowmuch1.workers.dev',
    githubUrl: 'https://github.com/glockyco/ancient-kingdoms-mods',
    steamUrl: 'https://steamcommunity.com/sharedfiles/filedetails/?id=3616580411',
    techStack: [
      'SvelteKit',
      'TypeScript',
      'deck.gl',
      'SQLite',
      'Tailwind CSS',
      'Python',
      'C#',
      'Cloudflare Workers'
    ]
  },
  {
    slug: 'personal-website',
    title: 'Personal Website',
    tagline: 'Portfolio and CV presenting my research and engineering work',
    status: 'active' as const,
    featured: false,
    liveUrl: 'https://glockyco.com/',
    githubUrl: 'https://github.com/glockyco/personal-website',
    techStack: ['SvelteKit', 'TypeScript', 'Typst', 'Zod', 'Playwright', 'Cloudflare Workers']
  },
  {
    slug: '10-man-idle',
    title: '10-Man Codex',
    tagline: 'Data-mined game codex for the 10-Man Idle community',
    status: 'inactive' as const,
    featured: false,
    liveUrl: 'https://10-man-codex.wowmuch1.workers.dev/',
    githubUrl: 'https://github.com/glockyco/10-man-idle-mods',
    techStack: ['Astro', 'TypeScript', 'Cloudflare Workers']
  }
];

// Validate at build time
export const projects: Project[] = rawProjects.map((p) => ProjectSchema.parse(p));
