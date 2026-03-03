import { z } from 'zod';

// ── Schemas ──────────────────────────────────────────────────────────────────

export const ToolCategorySchema = z.enum([
  'editor',
  'ai',
  'terminal',
  'version-control',
  'database',
  'notes',
  'communication',
  'wiki',
  'platform'
]);

export const ToolSchema = z.object({
  name: z.string(),
  category: ToolCategorySchema,
  icon: z.string(),
  url: z.string().url().optional(),
  usage: z.string().optional()
});

// ── Types ─────────────────────────────────────────────────────────────────────

export type ToolCategory = z.infer<typeof ToolCategorySchema>;
export type Tool = z.infer<typeof ToolSchema>;

// ── Data ──────────────────────────────────────────────────────────────────────

const rawTools = [
  {
    name: 'VS Code',
    category: 'editor' as const,
    icon: 'vscode',
    url: 'https://code.visualstudio.com'
  },
  { name: 'Zed', category: 'editor' as const, icon: 'zed', url: 'https://zed.dev' },
  {
    name: 'JetBrains IDEs',
    category: 'editor' as const,
    icon: 'jetbrains',
    url: 'https://www.jetbrains.com'
  },
  { name: 'Claude', category: 'ai' as const, icon: 'anthropic', url: 'https://claude.ai' },
  { name: 'Opencode', category: 'ai' as const, icon: 'opencode', url: 'https://opencode.ai' },
  { name: 'iTerm2', category: 'terminal' as const, icon: 'iterm2', url: 'https://iterm2.com' },
  { name: 'Fork', category: 'version-control' as const, icon: 'fork', url: 'https://git-fork.com' },
  {
    name: 'PostgreSQL',
    category: 'database' as const,
    icon: 'postgresql',
    url: 'https://www.postgresql.org'
  },
  { name: 'RemNote', category: 'notes' as const, icon: 'remnote', url: 'https://www.remnote.com' },
  {
    name: 'Discord',
    category: 'communication' as const,
    icon: 'discord',
    url: 'https://discord.com'
  },
  { name: 'wiki.gg', category: 'wiki' as const, icon: 'wikigg', url: 'https://wiki.gg' },
  {
    name: 'CrossOver',
    category: 'platform' as const,
    icon: 'crossover',
    url: 'https://www.codeweavers.com/crossover'
  }
];

// Validate at build time
export const tools: Tool[] = rawTools.map((t) => ToolSchema.parse(t));
