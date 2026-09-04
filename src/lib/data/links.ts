const employment = {
  title: 'Researcher and Senior Software Engineer',
  organization: 'Software Competence Center Hagenberg',
  shortOrganization: 'SCCH',
  organizationUrl: 'https://www.scch.at/',
  group: 'AISYS',
  groupName: 'AI-based Engineering of Sustainable Systems',
  groupUrl: 'https://www.scch.at/software-science/projekte/detail/aisys'
} as const;

const doctorate = {
  title: 'PhD candidate in Informatics',
  institution: 'University of Klagenfurt',
  institutionUrl: 'https://www.aau.at/en/',
  group: 'Software Engineering Research Group (SERG)',
  groupUrl: 'https://www.aau.at/en/isys/serg/',
  advisors: 'Prof. Martin Pinzger and Prof. Johann Eder',
  expectedGraduation: 'Q4 2026'
} as const;

export const profile = {
  name: 'Johann Glock',
  tagline: 'Researcher, Senior Software Engineer, PhD Candidate',
  location: 'Hagenberg / Linz, Austria',
  employment,
  doctorate,
  orcid: '0000-0002-0152-8611',
  github: 'https://github.com/glockyco',
  scholar: 'https://scholar.google.com/citations?user=33UUDmcAAAAJ',
  semanticScholar: 'https://www.semanticscholar.org/author/Johann-Glock/2266466770',
  linkedin: 'https://www.linkedin.com/in/johann-glock-486a9b221/',

  bioHtml: `Johann Glock is a researcher and senior software engineer in the <a href="${employment.groupUrl}">${employment.group} group</a> at the <a href="${employment.organizationUrl}">${employment.organization} (${employment.shortOrganization})</a>. He is also a PhD candidate in Informatics at the <a href="${doctorate.institutionUrl}">${doctorate.institution}</a>, supervised by ${doctorate.advisors}. His doctoral research focuses on practical applications of formal program analysis, including semantic differencing and software test generalization. He developed <a href="/research/pasda/">PASDA</a> and <a href="/research/teralizer/">Teralizer</a>. Outside his professional work, he data-mines games, builds interactive maps and mods, and contributes tools to their communities.`
} as const;
