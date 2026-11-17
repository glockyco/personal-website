import type { Publication } from './data/publications.ts';

const ENTRY_TYPE: Record<Publication['type'], string> = {
  journal: 'article',
  conference: 'inproceedings',
  'doctoral-symposium': 'inproceedings',
  thesis: 'mastersthesis',
  preprint: 'misc'
};

const VENUE_FIELD: Record<Publication['type'], string | undefined> = {
  journal: 'journal',
  conference: 'booktitle',
  'doctoral-symposium': 'booktitle',
  thesis: 'school',
  preprint: undefined
};

/** "Rainer W. Alexandrowicz" as "Alexandrowicz, Rainer W.", the form BibTeX sorts and abbreviates. */
function bibtexName(name: string): string {
  const parts = name.trim().split(/\s+/);
  const family = parts.pop();
  return parts.length ? `${family}, ${parts.join(' ')}` : name;
}

/** The publication as a BibTeX entry, for readers who want to cite it. */
export function bibtexEntry(pub: Publication): string {
  const family = pub.authors[0].name.trim().split(/\s+/).pop() ?? '';
  const key = `${family}_${pub.year}_${pub.slug.replaceAll('-', '_')}`.toLowerCase();

  const fields: [string, string | undefined][] = [
    ['title', `{${pub.title}}`],
    ['author', pub.authors.map((author) => bibtexName(author.name)).join(' and ')],
    [VENUE_FIELD[pub.type] ?? '', VENUE_FIELD[pub.type] ? pub.venue : undefined],
    ['year', String(pub.year)],
    ['doi', pub.doi],
    ['eprint', pub.arxivId],
    ['archivePrefix', pub.arxivId ? 'arXiv' : undefined],
    ['url', pub.arxivId && !pub.doi ? `https://arxiv.org/abs/${pub.arxivId}` : undefined]
  ];

  const lines = fields
    .filter((field): field is [string, string] => field[1] !== undefined)
    .map(([name, value]) => `  ${name.padEnd(13)} = {${value}}`);

  return `@${ENTRY_TYPE[pub.type]}{${key},\n${lines.join(',\n')}\n}`;
}
