/**
 * Generate a CV PDF using Typst.
 *
 * Usage:
 *   pnpm pdf                     # public version (no email/phone)
 *   pnpm pdf:full                # application version (with email/phone)
 *
 * Prerequisites:
 *   brew install typst
 *
 * The full variant reads CV_EMAIL and CV_PHONE from environment variables
 * and passes them as Typst inputs — they never touch git or the deployed site.
 */

import { execFileSync, spawnSync } from 'child_process';
import { unlinkSync, existsSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';

const SCRIPTS_DIR = resolve(import.meta.dirname ?? '.');
const ROOT_DIR = resolve(SCRIPTS_DIR, '..');
const DATA_FILE = resolve(SCRIPTS_DIR, 'cv-data.json');
const TEMPLATE = resolve(SCRIPTS_DIR, 'cv.typ');
const FONTS_DIR = resolve(SCRIPTS_DIR, 'fonts');
const OUTPUT_PUBLIC = resolve(ROOT_DIR, 'static', 'johann-glock-cv-web.pdf');
const OUTPUT_FULL = resolve(ROOT_DIR, 'outputs', 'johann-glock-cv.pdf');

// ── Check prerequisites ───────────────────────────────────────────────────────

const typstCheck = spawnSync('typst', ['--version'], { encoding: 'utf8' });
if (typstCheck.error) {
  console.error('typst not found. Install it with: brew install typst');
  process.exit(1);
}

// ── Parse args + env ─────────────────────────────────────────────────────────

const isFullVariant = process.argv.includes('--full');
const email = process.env.CV_EMAIL ?? '';
const phone = process.env.CV_PHONE ?? '';
const outputPath = isFullVariant ? OUTPUT_FULL : OUTPUT_PUBLIC;

if (isFullVariant && !email) {
  console.error('CV_EMAIL environment variable required for --full variant.');
  process.exit(1);
}

// ── Step 1: Export CV data to JSON ───────────────────────────────────────────

console.log('Exporting CV data...');
execFileSync(
  process.execPath,
  ['--experimental-strip-types', resolve(SCRIPTS_DIR, 'export-cv-data.ts')],
  { stdio: 'inherit' }
);

// ── Step 2: Compile Typst template ───────────────────────────────────────────

console.log('Compiling Typst template...');

mkdirSync(dirname(outputPath), { recursive: true });

const typstArgs = ['compile', '--font-path', FONTS_DIR, '--root', ROOT_DIR];

if (isFullVariant) {
  if (email) typstArgs.push('--input', `email=${email}`);
  if (phone) typstArgs.push('--input', `phone=${phone}`);
}

typstArgs.push(TEMPLATE, outputPath);

const result = spawnSync('typst', typstArgs, { stdio: 'inherit', cwd: SCRIPTS_DIR });

// ── Step 3: Clean up temp data file ──────────────────────────────────────────

if (existsSync(DATA_FILE)) {
  unlinkSync(DATA_FILE);
}

if (result.status !== 0) {
  console.error('Typst compilation failed.');
  process.exit(result.status ?? 1);
}

console.log(`PDF generated: ${outputPath}`);
