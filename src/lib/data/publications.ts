import { z } from 'zod';

// ── Schemas ──────────────────────────────────────────────────────────────────

export const AuthorSchema = z.object({
  name: z.string(),
  url: z.string().url().optional(),
  isMe: z.boolean().optional()
});

export const FigureSchema = z.object({
  src: z.string(),
  alt: z.string(),
  caption: z.string().optional()
});

export const PublicationSchema = z.object({
  slug: z.string(),
  title: z.string(),
  authors: z.array(AuthorSchema),
  venue: z.string(),
  venueShort: z.string(),
  year: z.number().int(),

  type: z.enum(['journal', 'conference', 'doctoral-symposium', 'thesis', 'preprint']),
  status: z.enum(['published', 'under-review']),
  authorPosition: z.enum(['first', 'contributing']),

  abstract: z.string(),
  tldr: z.string().optional(),

  award: z.string().optional(),
  acceptanceRate: z.string().optional(),
  citationCount: z.number().int().optional(),

  pdf: z.string().url().optional(),
  doi: z.string().optional(),
  arxiv: z.string().optional(),
  scholarUrl: z.string().url().optional(),
  zenodo: z.string().url().optional(),
  github: z.string().url().optional(),

  tags: z.array(z.string()),

  links: z
    .object({
      slides: z.string().url().optional(),
      video: z.string().url().optional(),
      demo: z.string().url().optional()
    })
    .optional(),

  relatedPapers: z.array(z.string()).optional(),
  relatedProjects: z.array(z.string()).optional(),

  figures: z.array(FigureSchema).optional()
});

export const AistProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  years: z.string().optional(),
  area: z.enum(['data-engineering', 'security', 'augmented-reality']).optional()
});

// ── Types ─────────────────────────────────────────────────────────────────────

export type Author = z.infer<typeof AuthorSchema>;
export type Figure = z.infer<typeof FigureSchema>;
export type Publication = z.infer<typeof PublicationSchema>;
export type AistProject = z.infer<typeof AistProjectSchema>;

// ── Data ──────────────────────────────────────────────────────────────────────

const rawPublications = [
  {
    slug: 'pasda',
    title:
      'PASDA: A Partition-based Semantic Differencing Approach with Best Effort Classification of Undecided Cases',
    authors: [
      { name: 'Johann Glock', isMe: true },
      { name: 'Josef Pichler', url: 'https://pure.fh-ooe.at/de/persons/josef-pichler/' },
      { name: 'Martin Pinzger', url: 'https://pinzger.github.io/' }
    ],
    venue: 'Journal of Systems and Software',
    venueShort: 'JSS',
    year: 2024,
    type: 'journal' as const,
    status: 'published' as const,
    authorPosition: 'first' as const,
    abstract: '',
    doi: '10.1016/j.jss.2024.112053',
    arxiv: 'arXiv:2311.08071',
    zenodo: 'https://zenodo.org/records/10033132',
    github: 'https://github.com/glockyco/PASDA',
    tags: ['semantic differencing', 'symbolic execution', 'program analysis', 'regression testing']
  },
  {
    slug: 'teralizer',
    title:
      'Teralizer: Semantics-Based Test Generalization from Conventional Unit Tests to Property-Based Tests',
    authors: [
      { name: 'Johann Glock', isMe: true },
      { name: 'Clemens Bauer', url: 'https://www.aau.at/en/team/bauer-clemens/' },
      { name: 'Martin Pinzger', url: 'https://pinzger.github.io/' }
    ],
    venue: 'ACM Transactions on Software Engineering and Methodology',
    venueShort: 'TOSEM',
    year: 2025,
    type: 'journal' as const,
    status: 'under-review' as const,
    authorPosition: 'first' as const,
    abstract: '',
    arxiv: 'arXiv:2512.14475',
    zenodo: 'https://zenodo.org/records/18242626',
    github: 'https://github.com/glockyco/Teralizer',
    tags: ['property-based testing', 'test generalization', 'symbolic execution', 'jqwik']
  },
  {
    slug: 'api-evolution',
    title: 'Microservice API Evolution in Practice: A Study on Strategies and Challenges',
    authors: [
      { name: 'Alexander Lercher', url: 'https://alexx882.github.io/' },
      { name: 'Johann Glock', isMe: true },
      { name: 'Christian Macho', url: 'https://mitschi.github.io/' },
      { name: 'Martin Pinzger', url: 'https://pinzger.github.io/' }
    ],
    venue: 'Journal of Systems and Software',
    venueShort: 'JSS',
    year: 2024,
    type: 'journal' as const,
    status: 'published' as const,
    authorPosition: 'contributing' as const,
    abstract: '',
    doi: '10.1016/j.jss.2024.112110',
    tags: ['microservices', 'API evolution', 'empirical study', 'mining software repositories']
  },
  {
    slug: 'icse-2024-doctoral-symposium',
    title:
      'Aiding Developer Understanding of Software Changes via Symbolic Execution-based Semantic Differencing',
    authors: [{ name: 'Johann Glock', isMe: true }],
    venue: 'ICSE 2024 Doctoral Symposium',
    venueShort: 'ICSE DS',
    year: 2024,
    type: 'doctoral-symposium' as const,
    status: 'published' as const,
    authorPosition: 'first' as const,
    abstract: '',
    acceptanceRate: '7 of 35 accepted for oral presentation',
    doi: '10.1145/3639478.3639783',
    tags: ['semantic differencing', 'symbolic execution', 'program comprehension']
  },
  {
    slug: 'msc-thesis-2020',
    title: 'Mining Software Repositories for the Effects of Design Patterns on Software Quality',
    authors: [{ name: 'Johann Glock', isMe: true }],
    venue: 'University of Applied Sciences Upper Austria',
    venueShort: 'MSc Thesis',
    year: 2020,
    type: 'thesis' as const,
    status: 'published' as const,
    authorPosition: 'first' as const,
    abstract: '',
    zenodo: 'https://zenodo.org/records/4048275',
    github: 'https://github.com/jaichberg/qualisign',
    links: {
      demo: 'https://www.overleaf.com/read/vnfhydqxmpvx'
    },
    tags: ['mining software repositories', 'design patterns', 'software quality', 'empirical study']
  }
];

const rawAistProjects = [
  {
    title: 'KIMIKU',
    description: 'Data engineering research project in collaboration with industry partners.',
    url: 'https://aist.fh-hagenberg.at/index.php/en/projects/project-kimiku',
    years: '2018–2021',
    area: 'data-engineering' as const
  },
  {
    title: 'Cooperation Weigl',
    description: 'Applied data engineering research project.',
    url: 'https://aist.fh-hagenberg.at/index.php/en/projects/projectcooperation-weigl',
    years: '2018–2021',
    area: 'data-engineering' as const
  },
  {
    title: 'SOC-Toolkit',
    description: 'Security intelligence tooling for security operations center workflows.',
    url: 'https://aist.fh-hagenberg.at/index.php/en/projects/soc-toolkit',
    years: '2018–2021',
    area: 'security' as const
  },
  {
    title: 'Rudy Games',
    description: 'Augmented reality application development in collaboration with Rudy Games.',
    url: 'https://aist.fh-hagenberg.at/index.php/en/projects/project-rudy-games',
    years: '2018–2021',
    area: 'augmented-reality' as const
  },
  {
    title: 'Formel Racing',
    description: 'Augmented reality experience for Formula Racing events.',
    url: 'https://aist.fh-hagenberg.at/index.php/en/projects/project-formelracing',
    years: '2018–2021',
    area: 'augmented-reality' as const
  }
];

// Validate at build time
export const publications: Publication[] = rawPublications.map((p) => PublicationSchema.parse(p));

export const aistProjects: AistProject[] = rawAistProjects.map((p) => AistProjectSchema.parse(p));
