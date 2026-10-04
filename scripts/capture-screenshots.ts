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
 * Both capture paths wait until the captured area has rendered: the load event has
 * fired, web fonts are ready, the DOM has stopped changing, and every image in the
 * area has loaded and decoded. Network activity is not a readiness signal, because
 * pages keep background requests open. A capture fails when an image is broken or
 * the page never settles.
 *
 * Both capture paths export two WebP variants via sharp, unless the new hero differs from
 * the existing one only by rendering noise, in which case both existing files are kept:
 *       <slug>-thumb.webp  900px wide  (used on project cards)
 *       <slug>-hero.webp  1200px wide  (used on detail pages without a live demo)
 *
 * Projects without a liveUrl or githubUrl are skipped; any manually placed screenshots
 * in src/lib/assets/screenshots/ are preserved.
 */

import { chromium, type Page } from 'playwright';
import sharp from 'sharp';
import { existsSync, mkdirSync, statSync, writeFileSync } from 'fs';
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
  erenshor: 0.85,
  afallon: 0.8,
  compendiums: 0.8
};

/** GitHub README captures use a taller square content slice inside the final 16:9 frame. */
const GITHUB_CONTENT_HEIGHT_RATIO = 1;

/** How long a page may take to render the captured area before the capture fails (ms) */
const READY_TIMEOUT_MS = 30000;

/** The DOM counts as settled once it has not changed for this long (ms) */
const DOM_QUIET_MS = 500;

// ── Readiness ─────────────────────────────────────────────────────────────────

/** A rectangle in viewport coordinates. */
type Area = { x: number; y: number; width: number; height: number };

/**
 * Wait until the content inside `area` has rendered: web fonts are ready, the DOM has
 * not changed for DOM_QUIET_MS, and every image intersecting the area has loaded and
 * decoded. Playwright discourages 'networkidle' because background requests (bot
 * detection, analytics) can keep the network busy indefinitely.
 */
async function waitForRenderedContent(page: Page, area: Area): Promise<void> {
  await page.waitForLoadState('load', { timeout: READY_TIMEOUT_MS });
  await page.evaluate(
    async ({ area, quietMs, timeoutMs }) => {
      const deadline = performance.now() + timeoutMs;
      const expire = (describe: () => string) =>
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error(describe())), Math.max(0, deadline - performance.now()))
        );

      await Promise.race([document.fonts.ready, expire(() => 'Web fonts did not finish loading')]);

      let observer: MutationObserver | undefined;
      await Promise.race([
        new Promise<void>((resolve) => {
          const settle = () => {
            observer?.disconnect();
            resolve();
          };
          let quiet = setTimeout(settle, quietMs);
          observer = new MutationObserver(() => {
            clearTimeout(quiet);
            quiet = setTimeout(settle, quietMs);
          });
          observer.observe(document, {
            subtree: true,
            childList: true,
            attributes: true,
            characterData: true
          });
        }),
        expire(() => {
          observer?.disconnect();
          return `The page kept changing for ${timeoutMs} ms`;
        })
      ]);

      const images = [...document.images].filter((img) => {
        const r = img.getBoundingClientRect();
        return (
          r.width > 0 &&
          r.height > 0 &&
          r.left < area.x + area.width &&
          r.right > area.x &&
          r.top < area.y + area.height &&
          r.bottom > area.y
        );
      });
      await Promise.race([
        Promise.all(
          images.map(
            (img) =>
              new Promise<void>((resolve) => {
                img.addEventListener('load', () => resolve(), { once: true });
                img.addEventListener('error', () => resolve(), { once: true });
                if (img.complete) resolve();
              })
          )
        ),
        expire(
          () =>
            `Images did not finish loading: ${images
              .filter((img) => !img.complete)
              .map((img) => img.currentSrc || img.src)
              .join(', ')}`
        )
      ]);

      const broken = images.filter((img) => img.naturalWidth === 0);
      if (broken.length > 0) {
        throw new Error(
          `Images failed to load: ${broken.map((img) => img.currentSrc || img.src).join(', ')}`
        );
      }
      await Promise.race([
        Promise.all(images.map((img) => img.decode())),
        expire(() => 'Images did not finish decoding')
      ]);
    },
    { area, quietMs: DOM_QUIET_MS, timeoutMs: READY_TIMEOUT_MS }
  );
}

/**
 * A recapture that changes fewer pixels than this keeps the existing image, because the
 * difference is rendering noise. Unchanged pages measured 0 changed pixels and the smallest
 * real change, three small cards on compendiums.org, measured 3,392.
 */
const CHANGED_PIXELS = 500;

/** Pixels whose summed RGB difference exceeds 60 between the existing image and `candidate`. */
async function changedPixels(existingPath: string, candidate: Buffer): Promise<number> {
  const [a, b] = await Promise.all(
    [existingPath, candidate].map((input) =>
      sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true })
    )
  );
  if (a.info.width !== b.info.width || a.info.height !== b.info.height) return Infinity;
  let changed = 0;
  for (let i = 0; i < a.data.length; i += 3) {
    const delta =
      Math.abs(a.data[i] - b.data[i]) +
      Math.abs(a.data[i + 1] - b.data[i + 1]) +
      Math.abs(a.data[i + 2] - b.data[i + 2]);
    if (delta > 60) changed++;
  }
  return changed;
}

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

  await page.goto(captureUrl, { waitUntil: 'domcontentloaded', timeout: READY_TIMEOUT_MS });
  const readme = isGitHubCapture ? page.locator('article.markdown-body') : null;
  let pngBuffer;
  if (readme) {
    await readme.waitFor({ state: 'visible', timeout: READY_TIMEOUT_MS });
    await page.addStyleTag({
      content: '[class*="OverviewRepoFiles-module__Box_3__"] { display: none !important; }'
    });
    await readme.scrollIntoViewIfNeeded();

    const readmeBox = await readme.boundingBox();
    if (!readmeBox) {
      throw new Error(`Could not measure README for ${project.slug}`);
    }
    const frameHeight = Math.min(readmeBox.height, readmeBox.width * GITHUB_CONTENT_HEIGHT_RATIO);
    const clip = {
      x: readmeBox.x,
      y: readmeBox.y,
      width: readmeBox.width,
      height: frameHeight
    };
    await waitForRenderedContent(page, clip);
    pngBuffer = await page.screenshot({ clip, animations: 'disabled' });
  } else {
    await waitForRenderedContent(page, { x: 0, y: 0, width: captureWidth, height: captureHeight });
    pngBuffer = await page.screenshot({ animations: 'disabled' });
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

  const thumbPath = resolve(OUT_DIR, `${project.slug}-thumb.webp`);
  const heroPath = resolve(OUT_DIR, `${project.slug}-hero.webp`);
  const hero = await heroPipeline.webp({ quality: QUALITY }).toBuffer();
  if (existsSync(heroPath) && (await changedPixels(heroPath, hero)) < CHANGED_PIXELS) {
    console.log('    unchanged, kept the existing images');
    continue;
  }
  await thumbPipeline.webp({ quality: QUALITY }).toFile(thumbPath);
  writeFileSync(heroPath, hero);
  console.log(
    `    thumb: ${(statSync(thumbPath).size / 1024).toFixed(1)} kB  hero: ${(hero.length / 1024).toFixed(1)} kB`
  );
}

await browser.close();
console.log(`\nDone. Screenshots written to src/lib/assets/screenshots/`);
