import assert from 'node:assert/strict';
import { test } from 'node:test';

import { projects } from '../src/lib/data/projects.ts';

test('projects are ordered for the website project list', () => {
  assert.deepStrictEqual(
    projects.map((project) => project.slug),
    ['erenshor', 'ancient-kingdoms', 'u27-gazette', 'hotrepl', 'personal-website', '10-man-idle']
  );
});
