/**
 * Capture project screenshots and export WebP assets.
 *
 * Usage:
 *   pnpm screenshots
 *
 * Prerequisites:
 *   pnpm add -D playwright sharp          (one-time)
 *   pnpm exec playwright install chromium  (one-time)
 *
 * For each project with a liveUrl, this script:
 *   - Launches headless Chromium at 1200x675 (16:9) with 2x device scale
 *   - Navigates to the liveUrl with ?theme=dark appended
 *   - Takes a viewport screenshot (no scrolling — captures the initial view)
 *   - Exports two WebP variants via sharp:
 *       <slug>-thumb.webp  900px wide  (used on project cards)
 *       <slug>-hero.webp  1200px wide  (used on detail pages without a live demo)
 *
 * Projects without a liveUrl are skipped; any manually placed screenshots
 * in src/lib/assets/screenshots/ are preserved.
 */

import { chromium } from 'playwright';
import sharp from 'sharp';
import { mkdirSync, statSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Node can't resolve $lib aliases — import directly by path.
import { projects } from '../src/lib/data/projects.ts';

// ── Paths ─────────────────────────────────────────────────────────────────────

const ROOT_DIR = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = resolve(ROOT_DIR, 'src/lib/assets/screenshots');

mkdirSync(OUT_DIR, { recursive: true });

// ── Config ────────────────────────────────────────────────────────────────────

/** Viewport in logical pixels — 16:9 */
const VIEWPORT_W = 1200;
const VIEWPORT_H = 675;

/** Device scale factor — 2x gives us 2400x1350 capture for crisp retina display */
const DEVICE_SCALE = 2;

/** WebP quality (0–100) */
const QUALITY = 85;

/** Output widths in CSS pixels (the WebP files are generated at 1x, displayed at 1x–2x by browser) */
const THUMB_W = 900;
const HERO_W = 1200;

/** How long to wait after navigation before capturing (ms) */
const SETTLE_MS = 2000;

// ── Main ──────────────────────────────────────────────────────────────────────

const toCapture = projects.filter((p) => p.liveUrl);
console.log(`Capturing ${toCapture.length} project screenshot(s)...\n`);

const browser = await chromium.launch();

for (const project of toCapture) {
  const url = new URL(project.liveUrl!);
  url.searchParams.set('theme', 'dark');
  const captureUrl = url.toString();

  console.log(`  ${project.slug}: ${captureUrl}`);

  const context = await browser.newContext({
    viewport: { width: VIEWPORT_W, height: VIEWPORT_H },
    deviceScaleFactor: DEVICE_SCALE
  });

  const page = await context.newPage();

  await page.goto(captureUrl, { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(SETTLE_MS);

  // Clip to exact viewport — no full-page scrolling
  const pngBuffer = await page.screenshot({
    clip: { x: 0, y: 0, width: VIEWPORT_W * DEVICE_SCALE, height: VIEWPORT_H * DEVICE_SCALE }
  });

  await context.close();

  // Export thumb
  const thumbPath = resolve(OUT_DIR, `${project.slug}-thumb.webp`);
  await sharp(pngBuffer).resize(THUMB_W).webp({ quality: QUALITY }).toFile(thumbPath);

  // Export hero
  const heroPath = resolve(OUT_DIR, `${project.slug}-hero.webp`);
  await sharp(pngBuffer).resize(HERO_W).webp({ quality: QUALITY }).toFile(heroPath);

  const thumbSize = statSync(thumbPath).size;
  const heroSize = statSync(heroPath).size;
  console.log(
    `    thumb: ${(thumbSize / 1024).toFixed(1)} kB  hero: ${(heroSize / 1024).toFixed(1)} kB`
  );
}

await browser.close();
console.log(`\nDone. Screenshots written to src/lib/assets/screenshots/`);
