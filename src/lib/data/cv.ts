import { z } from 'zod';

// ── Schemas ──────────────────────────────────────────────────────────────────

export const EducationSchema = z.object({
  degree: z.string(),
  field: z.string(),
  institution: z.string(),
  location: z.string(),
  startYear: z.number().int(),
  endYear: z.number().int().optional(),
  thesis: z.string().optional(),
  advisor: z.string().optional(),
  gpa: z.string().optional(),
  distinction: z.string().optional(),
  scholarship: z.string().optional(),
  description: z.string().optional()
});

export const WorkExperienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  startYear: z.number().int(),
  startMonth: z.number().int().min(1).max(12).optional(),
  endYear: z.number().int().optional(),
  endMonth: z.number().int().min(1).max(12).optional(),
  description: z.string().optional(),
  highlights: z.array(z.string()).optional(),
  projectUrls: z.array(z.object({ label: z.string(), url: z.string().url() })).optional()
});

export const TeachingExperienceSchema = z.object({
  course: z.string(),
  role: z.enum(['instructor', 'ta']),
  institution: z.string(),
  semesters: z.array(z.string()),
  description: z.string().optional()
});

export const SupervisionSchema = z.object({
  type: z.enum(['bsc-thesis', 'msc-thesis', 'msc-project', 'bsc-intern', 'highschool-intern']),
  status: z.enum(['completed', 'ongoing']),
  name: z.string().optional(),
  topic: z.string().optional(),
  year: z.number().int().optional(),
  note: z.string().optional()
});

export const AcademicServiceSchema = z.object({
  type: z.enum(['reviewer', 'subreviewer', 'committee', 'outreach']),
  venue: z.string(),
  year: z.number().int().optional(),
  count: z.number().int().optional(),
  note: z.string().optional()
});

export const AwardSchema = z.object({
  title: z.string(),
  organization: z.string(),
  years: z.string(),
  description: z.string().optional()
});

export const PresentationSchema = z.object({
  title: z.string(),
  event: z.string(),
  location: z.string().optional(),
  year: z.number().int(),
  type: z.enum(['talk', 'poster', 'invited', 'outreach']),
  note: z.string().optional()
});

export const SkillSchema = z.object({
  category: z.string(),
  items: z.array(z.string())
});

// ── Types ─────────────────────────────────────────────────────────────────────

export type Education = z.infer<typeof EducationSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type TeachingExperience = z.infer<typeof TeachingExperienceSchema>;
export type Supervision = z.infer<typeof SupervisionSchema>;
export type AcademicService = z.infer<typeof AcademicServiceSchema>;
export type Award = z.infer<typeof AwardSchema>;
export type Presentation = z.infer<typeof PresentationSchema>;
export type Skill = z.infer<typeof SkillSchema>;

// ── Data ──────────────────────────────────────────────────────────────────────

export const education: Education[] = [
  {
    degree: 'Dr. techn. (PhD)',
    field: 'Informatics',
    institution: 'University of Klagenfurt',
    location: 'Klagenfurt, Austria',
    startYear: 2021,
    thesis:
      'Formal Guarantees Meet Practical Constraints: From Semantic Differencing to Test Generalization for Regression Detection',
    advisor: 'Prof. Martin Pinzger'
  },
  {
    degree: 'MSc',
    field: 'Software Engineering',
    institution: 'University of Applied Sciences Upper Austria',
    location: 'Hagenberg, Austria',
    startYear: 2018,
    endYear: 2020,
    thesis: 'Mining Software Repositories for the Effects of Design Patterns on Software Quality',
    gpa: '1.07 (weighted)',
    distinction: 'Ausgezeichneter Erfolg',
    scholarship: 'Leistungsstipendium'
  },
  {
    degree: 'BSc',
    field: 'Software Engineering',
    institution: 'University of Applied Sciences Upper Austria',
    location: 'Hagenberg, Austria',
    startYear: 2015,
    endYear: 2018,
    distinction: 'Ausgezeichneter Erfolg',
    scholarship: 'Leistungsstipendium'
  },
  {
    degree: 'Matura',
    field: 'Electronics and Computer Engineering',
    institution: 'HTL Braunau',
    location: 'Braunau am Inn, Austria',
    startYear: 2007,
    endYear: 2012,
    distinction: 'Mit ausgezeichnetem Erfolg',
    description:
      'Specialization in Technical Informatics with autonomy focus on Media Engineering and Communication.'
  }
].map((e) => EducationSchema.parse(e));

export const workExperience: WorkExperience[] = [
  {
    title: 'University Assistant (PhD Candidate)',
    company: 'University of Klagenfurt',
    location: 'Klagenfurt, Austria',
    startYear: 2021,
    startMonth: 9,
    highlights: [
      'Research on semantic differencing and software test generalization under Prof. Martin Pinzger.',
      'Developed PASDA, a partition-based semantic differencing tool using differential symbolic execution. Published in JSS (2024).',
      'Developed Teralizer, which automatically transforms JUnit tests into property-based jqwik tests via symbolic analysis. Under review at TOSEM.',
      'Main instructor for Software Engineering I (3 semesters) and Software Engineering II (4 semesters).',
      'Supervised 4 completed BSc theses, 2 completed MSc projects, and 3 ongoing MSc theses.',
      'Reviewed for TOSEM; sub-reviewer for FSE (2025, 2026), ICSE (2024), SANER (2024).'
    ]
  },
  {
    title: 'Research Associate',
    company: 'University of Applied Sciences Upper Austria – AIST Research Group',
    location: 'Hagenberg, Austria',
    startYear: 2018,
    startMonth: 1,
    endYear: 2021,
    endMonth: 8,
    highlights: [
      'Applied research in data engineering, security intelligence, and augmented reality.',
      'Contributed to industry-partnered projects: KIMIKU, Cooperation Weigl (data engineering), SOC-Toolkit (security), Rudy Games, Formel Racing (AR).'
    ],
    projectUrls: [
      {
        label: 'KIMIKU',
        url: 'https://aist.fh-hagenberg.at/index.php/en/projects/project-kimiku'
      },
      {
        label: 'SOC-Toolkit',
        url: 'https://aist.fh-hagenberg.at/index.php/en/projects/soc-toolkit'
      }
    ]
  },
  {
    title: 'Web Developer',
    company: 'MICROLAB GmbH',
    location: 'Austria',
    startYear: 2012,
    startMonth: 10,
    endYear: 2018,
    endMonth: 9,
    highlights: [
      'Planned and implemented web projects (PHP, HTML, JavaScript/jQuery) across the full development lifecycle.',
      "Maintained and extended the company's proprietary CMS. Delivered projects for clients in insurance, agriculture, consulting, and other industries."
    ]
  }
].map((w) => WorkExperienceSchema.parse(w));

export const teaching: TeachingExperience[] = [
  {
    course: 'Software Engineering I',
    role: 'instructor',
    institution: 'University of Klagenfurt',
    semesters: ['Winter 2022/23', 'Winter 2023/24', 'Winter 2024/25'],
    description: 'Main instructor for BSc-level exercise course.'
  },
  {
    course: 'Software Engineering II',
    role: 'instructor',
    institution: 'University of Klagenfurt',
    semesters: ['Summer 2022', 'Summer 2023', 'Summer 2024', 'Summer 2025'],
    description: 'Main instructor for BSc-level exercise course.'
  },
  {
    course: 'Advanced Image Processing and Analysis',
    role: 'ta',
    institution: 'University of Applied Sciences Upper Austria',
    semesters: ['Summer 2020'],
    description: 'Teaching assistant for MSc-level course.'
  },
  {
    course: 'Basic Web Technology',
    role: 'ta',
    institution: 'University of Applied Sciences Upper Austria',
    semesters: ['Summer 2021'],
    description: 'Teaching assistant for BSc-level course.'
  }
].map((t) => TeachingExperienceSchema.parse(t));

export const supervision: Supervision[] = [
  // Completed BSc theses
  {
    type: 'bsc-thesis',
    status: 'completed',
    name: 'Bodo Thausing',
    topic: 'Onboarding Methods in Software as a Service'
  },
  {
    type: 'bsc-thesis',
    status: 'completed',
    name: 'Dominik Hartl',
    topic:
      'Automated Testing of a Spring Boot Application Using the Testcontainers Framework and Continuous Integration'
  },
  {
    type: 'bsc-thesis',
    status: 'completed',
    name: 'Markus Kofler',
    topic: 'Kubernetes Operator Management'
  },
  {
    type: 'bsc-thesis',
    status: 'completed',
    name: 'Richard Neumann',
    topic: 'Digital Assistant for a Hospital Information System'
  },
  // Completed MSc projects
  {
    type: 'msc-project',
    status: 'completed',
    name: 'Clemens Bauer',
    topic: 'SymPreProc: Code Transformations Aiding Symbolic Execution'
  },
  {
    type: 'msc-project',
    status: 'completed',
    name: 'Roberto Van Eeden',
    topic: 'Minifuzz: Implementation of a Binary Concolic Fuzzer'
  },
  // Ongoing MSc theses
  {
    type: 'msc-thesis',
    status: 'ongoing',
    name: 'Clemens Bauer',
    topic: 'Generating Property-based Tests for Java Methods'
  },
  {
    type: 'msc-thesis',
    status: 'ongoing',
    name: 'Merlin Volkmer',
    topic: 'Automated Detection and Refactoring of Test Smells in Java Test Suites'
  },
  {
    type: 'msc-thesis',
    status: 'ongoing',
    name: 'Olivier Aartsen',
    topic: 'Evaluation of Optimization Methods that Improve the Performance of Videogames on PC'
  },
  // AIST summer interns
  {
    type: 'bsc-intern',
    status: 'completed',
    note: 'AIST summer internship'
  },
  {
    type: 'bsc-intern',
    status: 'completed',
    note: 'AIST summer internship'
  },
  {
    type: 'bsc-intern',
    status: 'completed',
    note: 'AIST summer internship'
  },
  // High-school interns
  {
    type: 'highschool-intern',
    status: 'completed',
    note: 'AAU IT-Ferialpraktikum / FFG Schüler:innenpraktikum'
  },
  {
    type: 'highschool-intern',
    status: 'completed',
    note: 'AAU IT-Ferialpraktikum / FFG Schüler:innenpraktikum'
  },
  {
    type: 'highschool-intern',
    status: 'completed',
    note: 'AAU IT-Ferialpraktikum / FFG Schüler:innenpraktikum'
  }
].map((s) => SupervisionSchema.parse(s));

export const academicService: AcademicService[] = [
  {
    type: 'reviewer',
    venue: 'TOSEM',
    note: '1 paper + revision'
  },
  { type: 'subreviewer', venue: 'FSE', year: 2025, count: 1 },
  { type: 'subreviewer', venue: 'FSE', year: 2026, count: 2 },
  { type: 'subreviewer', venue: 'ICSE', year: 2024, count: 1 },
  { type: 'subreviewer', venue: 'SANER', year: 2024, count: 1 },
  {
    type: 'outreach',
    venue: 'TechTalents',
    note: '~3 workshop editions introducing high school students to software engineering'
  },
  {
    type: 'outreach',
    venue: 'Lange Nacht der Forschung',
    year: 2025,
    note: 'Represented institute research to the public'
  }
].map((s) => AcademicServiceSchema.parse(s));

export const awards: Award[] = [
  {
    title: 'Leistungsstipendium',
    organization: 'University of Applied Sciences Upper Austria',
    years: '2015–2018, 2018–2020',
    description: 'Merit scholarship awarded throughout BSc and MSc studies.'
  }
].map((a) => AwardSchema.parse(a));

export const presentations: Presentation[] = [
  {
    title:
      'Aiding Developer Understanding of Software Changes via Symbolic Execution-based Semantic Differencing',
    event: 'ICSE 2024 Doctoral Symposium',
    location: 'Lisbon, Portugal',
    year: 2024,
    type: 'talk',
    note: 'Oral presentation and poster. Selected as 1 of 7 oral presentations from 35 accepted.'
  },
  {
    title: 'PhD Research Presentation',
    event: '3rd International Software Engineering Summer School',
    location: 'Lugano, Switzerland',
    year: 2023,
    type: 'talk'
  },
  {
    title: 'Invited Participant',
    event: '2nd SCCH Research Day',
    year: 2024,
    type: 'invited',
    note: 'Invited by Rudolf Ramler, Research Manager Software Science, SCCH'
  },
  {
    title: 'Public Research Exhibit',
    event: 'Lange Nacht der Forschung',
    year: 2025,
    type: 'outreach'
  }
].map((p) => PresentationSchema.parse(p));

export const skills: Skill[] = [
  {
    category: 'Programming Languages',
    items: ['Java', 'C#/.NET', 'Python', 'SQL']
  },
  {
    category: 'Research Techniques',
    items: [
      'Symbolic execution (Java PathFinder / SPF)',
      'SMT solving (Z3)',
      'Differential program analysis',
      'Property-based testing (jqwik, JUnit)'
    ]
  },
  {
    category: 'Development Practices',
    items: ['Git', 'GitHub Actions CI/CD', 'Docker', 'Test-driven development', 'Code review']
  },
  {
    category: 'Academic Writing',
    items: ['LaTeX', 'Scientific publishing workflows', 'Peer review']
  }
].map((s) => SkillSchema.parse(s));
