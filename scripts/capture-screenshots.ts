/**
 * Capture project screenshots and export WebP assets.
 *
 * Usage:
 *   pnpm screenshots                       (all projects with a liveUrl or githubUrl)
 *   pnpm screenshots erenshor ancient-kingdoms  (only the given slugs)
 *
 * Prerequisites:
 *   pnpm add -D playwright sharp          (one-time)
 *   pnpm exec playwright install chromium  (one-time)
 *
 * For each project with a liveUrl, this script:
 *   - Launches headless Chromium at a 1200x675 base viewport with 2x device scale
 *   - Applies a project-specific zoom override by enlarging that logical viewport
 *   - Navigates to the liveUrl with ?theme=dark appended
 *   - Takes a viewport screenshot (no scrolling — captures the initial view)
 *
 * For projects without a liveUrl but with a githubUrl, this script:
 *   - Navigates to the GitHub repository page
 *   - Scrolls to the rendered README
 *   - Takes a viewport screenshot from the start of the README
 *
 * Both capture paths export two WebP variants via sharp:
 *       <slug>-thumb.webp  900px wide  (used on project cards)
 *       <slug>-hero.webp  1200px wide  (used on detail pages without a live demo)
 *
 * Projects without a liveUrl or githubUrl are skipped; any manually placed screenshots
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

/** Per-project browser zoom. Values below 1 capture more of the page. */
const SCREENSHOT_ZOOM_OVERRIDES: Record<string, number> = {
  erenshor: 0.85
};

/** GitHub README captures use a taller square content slice inside the final 16:9 frame. */
const GITHUB_CONTENT_HEIGHT_RATIO = 1;

/** How long to wait after navigation before capturing (ms) */
const SETTLE_MS = 2000;

// ── Main ──────────────────────────────────────────────────────────────────────

const slugFilter = process.argv.slice(2);
const toCapture = projects.filter(
  (p) => (p.liveUrl || p.githubUrl) && (slugFilter.length === 0 || slugFilter.includes(p.slug))
);

if (slugFilter.length > 0) {
  const matched = new Set(toCapture.map((p) => p.slug));
  const unknown = slugFilter.filter((s) => !matched.has(s));
  if (unknown.length > 0) {
    console.error(`Unknown or non-screenshot project slug(s): ${slugFilter.join(', ')}`);
    process.exit(1);
  }
}
console.log(`Capturing ${toCapture.length} project screenshot(s)...\n`);

const browser = await chromium.launch();

for (const project of toCapture) {
  const captureUrl = project.liveUrl
    ? (() => {
        const url = new URL(project.liveUrl);
        url.searchParams.set('theme', 'dark');
        return url.toString();
      })()
    : (() => {
        const url = new URL(project.githubUrl!);
        url.hash = 'readme';
        return url.toString();
      })();
  const isGitHubCapture = !project.liveUrl;

  const zoom = SCREENSHOT_ZOOM_OVERRIDES[project.slug] ?? 1;
  const captureWidth = Math.round(VIEWPORT_W / zoom);
  const captureHeight = Math.round(VIEWPORT_H / zoom);
  const zoomLabel = zoom === 1 ? '' : ` (zoom ${Math.round(zoom * 100)}%)`;

  console.log(`  ${project.slug}: ${captureUrl}${zoomLabel}`);

  const context = await browser.newContext({
    viewport: { width: captureWidth, height: captureHeight },
    deviceScaleFactor: DEVICE_SCALE
  });

  const page = await context.newPage();

  await page.goto(captureUrl, {
    waitUntil: isGitHubCapture ? 'domcontentloaded' : 'networkidle',
    timeout: 30000
  });
  const readme = isGitHubCapture ? page.locator('article.markdown-body') : null;
  let pngBuffer;
  if (readme) {
    await readme.waitFor({ state: 'visible', timeout: 30000 });
    await page.addStyleTag({
      content: '[class*="OverviewRepoFiles-module__Box_3__"] { display: none !important; }'
    });
    await readme.scrollIntoViewIfNeeded();

    const readmeBox = await readme.boundingBox();
    if (!readmeBox) {
      throw new Error(`Could not measure README for ${project.slug}`);
    }
    const frameHeight = Math.min(readmeBox.height, readmeBox.width * GITHUB_CONTENT_HEIGHT_RATIO);
    pngBuffer = await page.screenshot({
      clip: {
        x: readmeBox.x,
        y: readmeBox.y,
        width: readmeBox.width,
        height: frameHeight
      }
    });
  } else {
    await page.waitForTimeout(SETTLE_MS);
    pngBuffer = await page.screenshot();
  }

  await context.close();

  const thumbPipeline = sharp(pngBuffer);
  const heroPipeline = sharp(pngBuffer);
  if (isGitHubCapture) {
    thumbPipeline.resize(THUMB_W, Math.round(THUMB_W * (VIEWPORT_H / VIEWPORT_W)), {
      fit: 'contain',
      background: '#ffffff'
    });
    heroPipeline.resize(HERO_W, HERO_W * (VIEWPORT_H / VIEWPORT_W), {
      fit: 'contain',
      background: '#ffffff'
    });
  } else {
    thumbPipeline.resize(THUMB_W);
    heroPipeline.resize(HERO_W);
  }

  // Export thumb
  const thumbPath = resolve(OUT_DIR, `${project.slug}-thumb.webp`);
  await thumbPipeline.webp({ quality: QUALITY }).toFile(thumbPath);

  // Export hero
  const heroPath = resolve(OUT_DIR, `${project.slug}-hero.webp`);
  await heroPipeline.webp({ quality: QUALITY }).toFile(heroPath);

  const thumbSize = statSync(thumbPath).size;
  const heroSize = statSync(heroPath).size;
  console.log(
    `    thumb: ${(thumbSize / 1024).toFixed(1)} kB  hero: ${(heroSize / 1024).toFixed(1)} kB`
  );
}

await browser.close();
console.log(`\nDone. Screenshots written to src/lib/assets/screenshots/`);
