import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { test } from 'node:test';

import { projects } from '../src/lib/data/projects.ts';

test('projects are ordered for the website project list', () => {
  assert.deepStrictEqual(
    projects.map((project) => project.slug),
    [
      'erenshor',
      'ancient-kingdoms',
      'u27-gazette',
      'hotrepl',
      'compendiums',
      'personal-website',
      '10-man-idle'
    ]
  );
});

test('compendiums landing page is listed on the website but not the PDF CV', () => {
  const project = projects.find((candidate) => candidate.slug === 'compendiums');

  assert.ok(project);
  assert.equal(project.title, 'Compendiums Landing Page');
  assert.equal(project.liveUrl, 'https://compendiums.org/');
  assert.equal(project.githubUrl, 'https://github.com/glockyco/compendiums.org');
  assert.equal(project.inPdfCv, false);
});

test('compendiums landing page has generated screenshot assets wired for display', () => {
  const screenshotIndex = readFileSync('src/lib/assets/screenshots/index.ts', 'utf8');

  assert.equal(existsSync('src/lib/assets/screenshots/compendiums-thumb.webp'), true);
  assert.equal(existsSync('src/lib/assets/screenshots/compendiums-hero.webp'), true);
  assert.equal(
    screenshotIndex.includes("import compendiumsThumb from './compendiums-thumb.webp';"),
    true
  );
  assert.equal(
    screenshotIndex.includes("import compendiumsHero from './compendiums-hero.webp';"),
    true
  );
  assert.match(screenshotIndex, /compendiums: compendiumsThumb/);
  assert.match(screenshotIndex, /compendiums: compendiumsHero/);
});
