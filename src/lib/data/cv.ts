import { z } from 'zod';

// ── Schemas ──────────────────────────────────────────────────────────────────

export const EducationSchema = z.object({
  degree: z.string(),
  field: z.string(),
  institution: z.string(),
  location: z.string(),
  startYear: z.number().int(),
  endYear: z.number().int().optional(),
  expectedEnd: z.string().optional(),
  thesis: z.string().optional(),
  theses: z.array(z.object({ label: z.string(), title: z.string() })).optional(),
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
  description: z.string().optional(),
  topics: z.string().optional()
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

export const ContinuingEducationSchema = z.object({
  category: z.string(),
  hours: z.number().int(),
  providers: z.array(z.string())
});

// ── Types ─────────────────────────────────────────────────────────────────────

export type Education = z.infer<typeof EducationSchema>;
export type WorkExperience = z.infer<typeof WorkExperienceSchema>;
export type TeachingExperience = z.infer<typeof TeachingExperienceSchema>;
export type Supervision = z.infer<typeof SupervisionSchema>;
export type AcademicService = z.infer<typeof AcademicServiceSchema>;
export type Presentation = z.infer<typeof PresentationSchema>;
export type Skill = z.infer<typeof SkillSchema>;
export type ContinuingEducation = z.infer<typeof ContinuingEducationSchema>;

// ── Data ──────────────────────────────────────────────────────────────────────

export const researchSummary =
  'My research focuses on automated program analysis for regression detection and software test generalization. I develop tools that apply symbolic execution to practical software engineering problems, bridging formal verification techniques and real-world developer workflows.';

export const education: Education[] = [
  {
    degree: 'Dr. techn. (PhD)',
    field: 'Informatics',
    institution: 'University of Klagenfurt',
    location: 'Klagenfurt, Austria',
    startYear: 2021,
    expectedEnd: '2026',
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
    advisor: 'Prof. Josef Pichler',
    gpa: '1.07',
    distinction: 'With Distinction',
    scholarship: 'Merit Scholarship'
  },
  {
    degree: 'BSc',
    field: 'Software Engineering',
    institution: 'University of Applied Sciences Upper Austria',
    location: 'Hagenberg, Austria',
    startYear: 2015,
    endYear: 2018,
    advisor: 'Prof. Herwig Mayr',
    theses: [
      {
        label: 'Theoretical',
        title: 'Evaluating and Adapting Trello for Use in Scrum Teams'
      },
      {
        label: 'Practical',
        title: 'Design and Implementation of the System Architecture for a Mixed Reality Board Game'
      }
    ],
    distinction: 'With Distinction',
    scholarship: 'Merit Scholarship'
  },
  {
    degree: 'Matura',
    field: 'Electronics \u2014 Technical Informatics',
    institution: 'HTL Braunau',
    location: 'Braunau am Inn, Austria',
    startYear: 2007,
    endYear: 2012,
    distinction: 'With Distinction'
  }
].map((e) => EducationSchema.parse(e));

export const workExperience: WorkExperience[] = [
  {
    title: 'University Assistant (PhD Candidate)',
    company: 'University of Klagenfurt \u2013 Software Engineering Research Group',
    location: 'Klagenfurt, Austria',
    startYear: 2021,
    highlights: [
      'Research on semantic differencing and software test generalization under Prof. Martin Pinzger.',
      'Lab instructor for Software Engineering I & II (7 semesters). Ran lab sections independently.',
      'Supervised BSc and MSc theses and projects in software testing, analysis, and engineering.'
    ]
  },
  {
    title: 'Research Associate',
    company: 'University of Applied Sciences Upper Austria \u2013 AIST Research Group',
    location: 'Hagenberg, Austria',
    startYear: 2018,
    endYear: 2021,
    highlights: [
      'Technical lead for applied research prototypes in FFG-funded projects with industry partners.',
      'Designed and built prototypes in security intelligence, data engineering, and augmented reality.',
      'Collaborated with industry partners and other research groups across 5 projects.'
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
    location: 'Ried im Innkreis, Austria',
    startYear: 2012,
    endYear: 2018,
    highlights: [
      'Full-stack web development for clients in insurance, agriculture, tourism, and other industries.',
      'Managed client relationships from requirements gathering through delivery and support.',
      "Built and maintained the company's proprietary CMS using PHP, JavaScript, and HTML/CSS."
    ]
  }
].map((w) => WorkExperienceSchema.parse(w));

export const teaching: TeachingExperience[] = [
  {
    course: 'Software Engineering I',
    role: 'instructor',
    institution: 'University of Klagenfurt',
    semesters: ['Winter 2022/23', 'Winter 2023/24', 'Winter 2024/25'],
    description:
      'Lab instructor for BSc-level exercise course. Independently planned and ran lab sections, designed exercises, and graded.',
    topics:
      'Program analysis, software testing (unit, integration, mutation, TDD), refactoring, and code metrics'
  },
  {
    course: 'Software Engineering II',
    role: 'instructor',
    institution: 'University of Klagenfurt',
    semesters: ['Summer 2022', 'Summer 2023', 'Summer 2024', 'Summer 2025'],
    description:
      'Lab instructor for BSc-level exercise course. Independently planned and ran lab sections, designed exercises, and graded.',
    topics: 'Agile development (Scrum), multiplayer board/card game Android apps in teams of 4–7'
  },
  {
    course: 'Advanced Image Processing and Analysis',
    role: 'ta',
    institution: 'University of Applied Sciences Upper Austria',
    semesters: ['Summer 2020'],
    description: 'Tutor for MSc-level course. Graded student homework and projects.'
  },
  {
    course: 'Basic Web Technology',
    role: 'ta',
    institution: 'University of Applied Sciences Upper Austria',
    semesters: ['Summer 2021'],
    description: 'Tutor for BSc-level course. Graded student homework and projects.'
  }
].map((t) => TeachingExperienceSchema.parse(t));

export const supervision: Supervision[] = [
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
  // BSc interns (AIST / i2f project)
  {
    type: 'bsc-intern',
    status: 'completed',
    note: 'AIST summer internship (i2f project)'
  },
  {
    type: 'bsc-intern',
    status: 'completed',
    note: 'AIST summer internship (i2f project)'
  },
  {
    type: 'bsc-intern',
    status: 'completed',
    note: 'AIST summer internship (i2f project)'
  },
  // High-school interns (AAU)
  {
    type: 'highschool-intern',
    status: 'completed',
    note: 'Course scheduling prototype (FFG summer internship at AAU)'
  },
  {
    type: 'highschool-intern',
    status: 'completed',
    note: 'Course scheduling prototype (FFG summer internship at AAU)'
  },
  {
    type: 'highschool-intern',
    status: 'completed',
    note: 'Research data visualization (FFG summer internship at AAU)'
  }
].map((s) => SupervisionSchema.parse(s));

export const academicService: AcademicService[] = [
  {
    type: 'reviewer',
    venue: 'TOSEM',
    note: '1 paper + revision'
  },
  { type: 'subreviewer', venue: 'FSE', year: 2026, count: 2 },
  { type: 'subreviewer', venue: 'FSE', year: 2025, count: 1 },
  { type: 'subreviewer', venue: 'ICSE', year: 2024, count: 1 },
  { type: 'subreviewer', venue: 'SANER', year: 2024, count: 1 },
  {
    type: 'outreach',
    venue: 'TechTalents',
    note: '3 editions (2022\u20132023), introducing high-school students to software testing'
  },
  {
    type: 'outreach',
    venue: 'Long Night of Research',
    year: 2025,
    note: 'Hands-on demos of software engineering research for the public'
  }
].map((s) => AcademicServiceSchema.parse(s));

export const presentations: Presentation[] = [
  {
    title:
      'Aiding Developer Understanding of Software Changes via Symbolic Execution-based Semantic Differencing',
    event: 'ICSE 2024 Doctoral Symposium',
    location: 'Lisbon, Portugal',
    year: 2024,
    type: 'talk',
    note: 'Oral presentation and poster. Selected as 1 of 7 oral presentations from 35 accepted (55 submissions).'
  },
  {
    title: 'Invited Participant',
    event: '2nd SCCH Research Day',
    year: 2024,
    type: 'invited'
  },
  {
    title: 'PhD Research Presentation',
    event: '3rd International Software Engineering Summer School',
    location: 'Lugano, Switzerland',
    year: 2023,
    type: 'talk'
  }
].map((p) => PresentationSchema.parse(p));

export const skills: Skill[] = [
  {
    category: 'Research Areas',
    items: [
      'Test Generalization',
      'Test Generation',
      'Regression Test Selection',
      'Property-Based Testing',
      'Symbolic Execution',
      'Constraint Solving',
      'Semantic Differencing',
      'Equivalence Checking',
      'Regression Verification',
      'Fault Localization',
      'Fuzzing',
      'Mining Software Repositories'
    ]
  },
  {
    category: 'Languages & Tools',
    items: [
      'Java',
      'C#/.NET',
      'Python',
      'PHP',
      'TypeScript',
      'JavaScript',
      'HTML/CSS',
      'SQL',
      'Git',
      'Docker + Compose',
      'GitHub Actions',
      'Agentic Coding',
      'Claude Code',
      'OpenCode'
    ]
  }
].map((s) => SkillSchema.parse(s));

export const continuingEducation: ContinuingEducation[] = [
  {
    category: 'Research Methods',
    hours: 9,
    providers: ['IEEE', 'Wiley']
  },
  {
    category: 'Leadership & Organization',
    hours: 8,
    providers: ['AAU']
  },
  {
    category: 'Diversity & Inclusion',
    hours: 58,
    providers: ['AAU', 'iMoox']
  },
  {
    category: 'Higher Education Didactics',
    hours: 16,
    providers: ['AAU']
  }
].map((c) => ContinuingEducationSchema.parse(c));
