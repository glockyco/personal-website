import assert from 'node:assert/strict';
import { test } from 'node:test';

import { sortedPublications } from '../src/lib/data/publications.ts';

test('publications are sorted reverse-chronologically regardless of review status', () => {
  const years = sortedPublications.map((publication) => publication.year);
  const descendingYears = [...years].sort((a, b) => b - a);

  assert.deepStrictEqual(years, descendingYears);
});
