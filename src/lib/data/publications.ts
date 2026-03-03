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

export const PaperPresentationSchema = z.object({
  event: z.string(),
  location: z.string().optional(),
  year: z.number().int(),
  type: z.enum(['talk', 'poster', 'invited', 'outreach']),
  slides: z.string().optional()
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
  featured: z.boolean().optional(),

  abstract: z.string(),
  tldr: z.string().optional(),

  award: z.string().optional(),
  acceptanceRate: z.string().optional(),
  citationCount: z.number().int().optional(),

  pdf: z.string().optional(),
  doi: z.string().optional(),
  arxivId: z.string().optional(),
  scholarUrl: z.string().url().optional(),
  zenodo: z.string().url().optional(),
  github: z.string().url().optional(),
  overleaf: z.string().url().optional(),

  tags: z.array(z.string()),

  presentations: z.array(PaperPresentationSchema).optional(),

  relatedPapers: z.array(z.string()).optional(),
  relatedProjects: z.array(z.string()).optional(),

  figures: z.array(FigureSchema).optional()
});

export const AistProjectSchema = z.object({
  title: z.string(),
  description: z.string(),
  url: z.string().url(),
  years: z.string().optional(),
  area: z.enum(['data-engineering', 'security', 'augmented-reality']).optional(),
  funding: z.string().optional()
});

// ── Types ─────────────────────────────────────────────────────────────────────

export type Author = z.infer<typeof AuthorSchema>;
export type Figure = z.infer<typeof FigureSchema>;
export type PaperPresentation = z.infer<typeof PaperPresentationSchema>;
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
    featured: true,
    abstract:
      "Equivalence checking is used to verify whether two programs produce equivalent outputs when given equivalent inputs. Research in this field mainly focused on improving equivalence checking accuracy and runtime performance. However, for program pairs that cannot be proven to be either equivalent or non-equivalent, existing approaches only report a classification result of unknown, which provides no information regarding the programs' non-/equivalence.\nIn this paper, we introduce PASDA, our partition-based semantic differencing approach with best effort classification of undecided cases. While PASDA aims to formally prove non-/equivalence of analyzed program pairs using a variant of differential symbolic execution, its main novelty lies in its handling of cases for which no formal non-/equivalence proof can be found. For such cases, PASDA provides a best effort equivalence classification based on a set of classification heuristics.\nWe evaluated PASDA with an existing benchmark consisting of 141 non-/equivalent program pairs. PASDA correctly classified 61%–74% of these cases at timeouts from 10 s to 3600 s. Thus, PASDA achieved equivalence checking accuracies that are 3%–7% higher than the best results achieved by three existing tools. Furthermore, PASDA's best effort classifications were correct for 70%–75% of equivalent and 55%–85% of non-equivalent cases across the different timeouts.",
    tldr: 'PASDA uses differential symbolic execution to classify behavioral equivalence between program versions, and introduces best-effort heuristics for cases where no formal proof can be found — outperforming three existing tools by 3–7% on a standard benchmark.',
    pdf: '/pdfs/glock_2024_pasda.pdf',
    doi: '10.1016/j.jss.2024.112037',
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
    featured: true,
    abstract:
      'Conventional unit tests validate single input-output pairs, leaving most inputs of an execution path untested. Property-based testing addresses this shortcoming by generating multiple inputs satisfying properties but requires significant manual effort to define properties and their constraints. We propose a semantics-based approach that automatically transforms unit tests into property-based tests by extracting specifications from implementations via single-path symbolic analysis. We demonstrate this approach through Teralizer, a prototype for Java that transforms JUnit tests into property-based jqwik tests. Unlike prior work that generalizes from input-output examples, Teralizer derives specifications from program semantics.\nWe evaluated Teralizer on three progressively challenging datasets. On EvoSuite-generated tests for EqBench and Apache Commons utilities, Teralizer improved mutation scores by 1-4 percentage points. Generalization of mature developer-written tests from Apache Commons utilities showed only 0.05-0.07 percentage points improvement. Analysis of 632 real-world Java projects from RepoReapers highlights applicability barriers: only 1.7% of projects completed the generalization pipeline, with failures primarily due to type support limitations in symbolic analysis and static analysis limitations in our prototype. Based on the results, we provide a roadmap for future work, identifying research and engineering challenges that need to be tackled to advance the field of test generalization.',
    tldr: 'Teralizer automatically transforms JUnit unit tests into property-based jqwik tests by deriving input specifications from program semantics via symbolic analysis, improving mutation scores on generated tests while surfacing practical barriers to wider applicability.',
    pdf: '/pdfs/glock_2025_teralizer.pdf',
    arxivId: '2512.14475',
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
    abstract:
      'Nowadays, many companies design and develop their software systems as a set of loosely coupled microservices that communicate via their Application Programming Interfaces (APIs). While the loose coupling improves maintainability, scalability, and fault tolerance, it poses new challenges to the API evolution process. Related works identified communication and integration as major API evolution challenges but did not provide the underlying reasons and research directions to mitigate them. In this paper, we aim to identify microservice API evolution strategies and challenges in practice and gain a broader perspective of their relationships. We conducted 17 semi-structured interviews with developers, architects, and managers in 11 companies and analyzed the interviews with open coding used in grounded theory. In total, we identified six strategies and six challenges for REpresentational State Transfer (REST) and event-driven communication via message brokers. The strategies mainly focus on API backward compatibility, versioning, and close collaboration between teams. The challenges include change impact analysis efforts, ineffective communication of changes, and consumer reliance on outdated versions, leading to API design degradation. We defined two important problems in microservice API evolution resulting from the challenges and their coping strategies: tight organizational coupling and consumer lock-in. To mitigate these two problems, we propose automating the change impact analysis and investigating effective communication of changes as open research directions.',
    tldr: 'Through 17 interviews across 11 companies, we identify six REST and event-driven API evolution strategies and six challenges, revealing tight organizational coupling and consumer lock-in as the two core problems — and proposing automated change impact analysis and better change communication as research directions.',
    pdf: '/pdfs/lercher_2024_apis.pdf',
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
    abstract:
      'According to a recent observational study, developers spend an average of 48% of their development time on debugging tasks. Approaches such as equivalence checking and fault localization support developers during debugging tasks by providing information that enables developers to more quickly identify and deal with unintended changes in program behavior. The accuracy and runtime performance of these approaches have seen continuous improvements throughout the years. However, the outputs of existing tools are often difficult to understand for developers due to a lack of context information and result explanations. Our goal is to improve upon this issue by developing a new equivalence checking approach that (i) is at least as accurate as existing approaches but (ii) provides more detailed descriptions of identified behavioral / semantic differences and (iii) presents these results in a way that is useful for developers, thus aiding developer understanding of equivalence checking results and corresponding software changes.',
    tldr: 'Doctoral symposium paper proposing a new equivalence checking approach that goes beyond accuracy — providing richer, developer-oriented descriptions of behavioral differences to better support debugging and program comprehension.',
    pdf: '/pdfs/glock_2024_docsym.pdf',
    acceptanceRate: '35 of 55 accepted; 7 of 35 selected for oral presentation',
    doi: '10.1145/3639478.3639783',
    tags: ['semantic differencing', 'symbolic execution', 'program comprehension'],
    presentations: [
      {
        event: 'ICSE 2024 Doctoral Symposium',
        location: 'Lisbon, Portugal',
        year: 2024,
        type: 'talk' as const
      }
    ]
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
    abstract:
      'Design patterns are reusable solutions for commonly occurring problems in software design. First described in 1994 by the Gang of Four, they have gained widespread adoption in many areas of software development throughout the years. Furthermore, design patterns have also garnered an active research community around them, which investigates the effects that design patterns have on different software quality attributes. However, a common shortcoming of existing studies is that they only analyze the quality effects of design patterns on a relatively small scale, covering no more than a few hundred projects per case study. This calls into question how generalizable the results of these small-scale case studies are.\nPursuing more generalizable results, this thesis conducts a much larger-scale analysis of the quality effects of design patterns. To accomplish this, software metric and design pattern data for 90,000 projects from the Maven Central repository is collected using the metrics calculation tool CKJM extended and the design pattern detection tool SSA. Correlations between design patterns and software quality attributes are then analyzed using software metrics as proxies for software quality by following the methodology described by the QMOOD quality model. The results of the analysis suggest that design patterns are positively correlated with functionality and reusability, but negatively correlated with understandability, which is consistent with the results of existing smaller-scale case studies.',
    tldr: 'A large-scale mining study of 90,000 Maven Central projects finds that design patterns are positively correlated with software functionality and reusability but negatively correlated with understandability — consistent with smaller prior studies, but on a far larger and more generalizable scale.',
    pdf: '/pdfs/aichberger_2020_msc_thesis.pdf',
    zenodo: 'https://zenodo.org/records/4048275',
    github: 'https://github.com/jaichberg/qualisign',
    overleaf: 'https://www.overleaf.com/read/vnfhydqxmpvx',
    tags: ['mining software repositories', 'design patterns', 'software quality', 'empirical study']
  }
];

const rawAistProjects = [
  {
    title: 'SOC-Toolkit',
    description:
      'Automated enrichment and correlation of security data from multiple sources to reduce incident response times for security analysts.',
    url: 'https://aist.fh-hagenberg.at/index.php/en/projects/soc-toolkit',
    years: '2020–2022',
    area: 'security' as const,
    funding: 'FFG General Programme'
  },
  {
    title: 'KIMIKU',
    description:
      'AI-supported customer loyalty optimization, personalizing vouchers and offers using anonymized cross-company user data.',
    url: 'https://aist.fh-hagenberg.at/index.php/en/projects/project-kimiku',
    years: '2019–2021',
    area: 'data-engineering' as const,
    funding: 'FFG General Programme'
  },
  {
    title: 'i2f',
    description:
      'Mixed reality boardgame extending classical boardgames with AR, communication sensors, and software for up to 4 players.',
    url: 'https://aist.fh-hagenberg.at/index.php/en/projects/project-rudy-games',
    years: '2017–2020',
    area: 'augmented-reality' as const,
    funding: 'FFG General Programme'
  },
  {
    title: 'Cooperation Weigl',
    description:
      'Emotion and stress prediction from sensor data on a wellness couch using ML time-series forecasting.',
    url: 'https://aist.fh-hagenberg.at/index.php/en/projects/projectcooperation-weigl',
    years: '2020',
    area: 'data-engineering' as const,
    funding: 'FFG Innovation Voucher'
  },
  {
    title: 'D4K',
    description:
      'AR driving safety training for civil service personnel using AR glasses and sensors to capture reaction times and vital signs.',
    url: 'https://aist.fh-hagenberg.at/index.php/en/projects/project-formelracing',
    area: 'augmented-reality' as const,
    funding: 'FFG Innovation Voucher'
  }
];

// Validate at build time
export const publications: Publication[] = rawPublications.map((p) => PublicationSchema.parse(p));

export const aistProjects: AistProject[] = rawAistProjects.map((p) => AistProjectSchema.parse(p));
