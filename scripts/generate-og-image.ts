/**
 * Generate the default Open Graph card at static/og-image.png (1200×630).
 *
 * Usage:
 *   pnpm og-image
 *
 * The card is rendered from an inline SVG layout via sharp. We commit the
 * resulting PNG so it does not block CI deploys; re-run this script when
 * the brand name, tagline, or palette changes.
 */
import { writeFileSync, mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

import { profile } from '../src/lib/data/links.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = resolve(__dirname, '..');
const OUT = resolve(ROOT, 'static/og-image.png');

const WIDTH = 1200;
const HEIGHT = 630;

// Brand palette — kept in sRGB to avoid color-management surprises in
// social-card scrapers. Rough match of the indigo brand used in the
// site's web manifest theme color.
const BG = '#1E1B4B';
const ACCENT = '#7C3AED';
const TEXT_PRIMARY = '#FFFFFF';
const TEXT_SECONDARY = '#C4B5FD';
const TEXT_MUTED = '#A5B4FC';

const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}" viewBox="0 0 ${WIDTH} ${HEIGHT}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG}"/>
      <stop offset="100%" stop-color="#312E81"/>
    </linearGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="url(#bg)"/>
  <rect x="0" y="0" width="${WIDTH}" height="8" fill="${ACCENT}"/>

  <!-- Subtle accent dot -->
  <circle cx="${WIDTH - 96}" cy="96" r="14" fill="${ACCENT}"/>

  <text x="80" y="${HEIGHT - 320}" font-family="Helvetica, Arial, sans-serif"
        font-size="96" font-weight="800" fill="${TEXT_PRIMARY}"
        letter-spacing="-3">${escapeXml(profile.name)}</text>

  <text x="80" y="${HEIGHT - 230}" font-family="Helvetica, Arial, sans-serif"
        font-size="44" font-weight="500" fill="${TEXT_SECONDARY}">
    ${escapeXml(profile.tagline)}
  </text>

  <text x="80" y="${HEIGHT - 160}" font-family="Helvetica, Arial, sans-serif"
        font-size="30" font-weight="400" fill="${TEXT_MUTED}">
    ${escapeXml(profile.affiliation)}
  </text>

  <text x="80" y="${HEIGHT - 60}" font-family="Helvetica, Arial, sans-serif"
        font-size="26" font-weight="600" fill="${ACCENT}"
        letter-spacing="2">glockyco.com</text>
</svg>`;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

mkdirSync(dirname(OUT), { recursive: true });

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();

writeFileSync(OUT, png);

console.log(`Wrote ${OUT} (${png.length} bytes, ${WIDTH}×${HEIGHT})`);
