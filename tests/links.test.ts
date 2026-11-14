import assert from 'node:assert/strict';
import { test } from 'node:test';

import { linkParts } from '../src/lib/links.ts';

test('a URL ending a sentence links without the period', () => {
  assert.deepStrictEqual(linkParts('Available at https://github.com/glockyco/Teralizer.'), [
    { text: 'Available at ' },
    { text: 'https://github.com/glockyco/Teralizer', href: 'https://github.com/glockyco/Teralizer' },
    { text: '.' }
  ]);
});

test('text without a URL stays one plain part', () => {
  assert.deepStrictEqual(linkParts('No link here.'), [{ text: 'No link here.' }]);
});
