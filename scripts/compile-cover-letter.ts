/**
 * Compile a cover letter PDF using Typst.
 *
 * Usage:
 *   pnpm cover-letter <application>        # e.g. pnpm cover-letter scch
 *   pnpm cover-letter:full <application>   # with email/phone from .env.local
 *
 * Prerequisites:
 *   brew install typst
 *
 * Each application has its own letter.typ in applications/<name>/.
 * The compiled PDF is written to outputs/<name>/johann-glock-cover-letter.pdf.
 *
 * The full variant reads CV_EMAIL and CV_PHONE from environment variables
 * (loaded via --env-file=.env.local) and passes them as Typst inputs.
 */

import { existsSync, mkdirSync } from 'fs';
import { resolve } from 'path';
import { spawnSync } from 'child_process';

const SCRIPTS_DIR = resolve(import.meta.dirname ?? '.');
const ROOT_DIR = resolve(SCRIPTS_DIR, '..');
const FONTS_DIR = resolve(SCRIPTS_DIR, 'fonts');

// ── Check prerequisites ───────────────────────────────────────────────────────

const typstCheck = spawnSync('typst', ['--version'], { encoding: 'utf8' });
if (typstCheck.error) {
  console.error('typst not found. Install it with: brew install typst');
  process.exit(1);
}

// ── Parse args + env ─────────────────────────────────────────────────────────

const isFullVariant = process.argv.includes('--full');
const args = process.argv.filter(
  (a) => !a.startsWith('--') && !a.endsWith('.ts') && a !== process.execPath
);
const applicationName = args[args.length - 1];

if (!applicationName) {
  console.error('Usage: pnpm cover-letter <application>');
  console.error('       pnpm cover-letter:full <application>');
  process.exit(1);
}

const letterFile = resolve(ROOT_DIR, 'applications', applicationName, 'letter.typ');
if (!existsSync(letterFile)) {
  console.error(`Letter not found: ${letterFile}`);
  console.error(`Does applications/${applicationName}/letter.typ exist?`);
  process.exit(1);
}

const email = process.env.CV_EMAIL ?? '';
const phone = process.env.CV_PHONE ?? '';

if (isFullVariant && !email) {
  console.error('CV_EMAIL environment variable required for --full variant.');
  console.error('Set it in .env.local or pass it directly.');
  process.exit(1);
}

// ── Compile ──────────────────────────────────────────────────────────────────

const outputDir = resolve(ROOT_DIR, 'outputs', applicationName);
mkdirSync(outputDir, { recursive: true });

const outputPath = resolve(outputDir, 'johann-glock-cover-letter.pdf');

console.log(`Compiling cover letter for "${applicationName}"...`);

const typstArgs = ['compile', '--font-path', FONTS_DIR, '--root', ROOT_DIR];

if (isFullVariant) {
  if (email) typstArgs.push('--input', `email=${email}`);
  if (phone) typstArgs.push('--input', `phone=${phone}`);
}

typstArgs.push(letterFile, outputPath);

const result = spawnSync('typst', typstArgs, { stdio: 'inherit' });

if (result.status !== 0) {
  console.error('Typst compilation failed.');
  process.exit(result.status ?? 1);
}

console.log(`PDF generated: ${outputPath}`);
