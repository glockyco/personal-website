import assert from 'node:assert/strict';
import { test } from 'node:test';

import { bibtexEntry } from '../src/lib/bibtex.ts';
import { publications } from '../src/lib/data/publications.ts';

const entry = (slug: string) => bibtexEntry(publications.find((pub) => pub.slug === slug)!);

test('a preprint cites its arXiv identifier and puts family names first', () => {
  assert.equal(
    entry('teralizer-tool'),
    `@misc{glock_2026_teralizer_tool,
  title         = {{Teralizer: A Tool for Generalizing JUnit Tests into Property-Based jqwik Tests}},
  author        = {Glock, Johann and Bauer, Clemens and Pinzger, Martin},
  year          = {2026},
  eprint        = {2611.19242},
  archivePrefix = {arXiv},
  url           = {https://arxiv.org/abs/2611.19242}
}`
  );
});

test('a journal article cites its journal and DOI, and keeps middle initials with the given name', () => {
  assert.match(entry('pasda'), /^@article\{glock_2024_pasda,/);
  assert.match(entry('pasda'), /journal {7}= \{Journal of Systems and Software\}/);
  assert.match(entry('pasda'), /doi {11}= \{10\.1016\/j\.jss\.2024\.112037\}/);
  assert.match(entry('security-incentivization'), /Alexandrowicz, Rainer W\./);
});
