/**
 * Generate PWA icons + favicon from the brand logo.
 * Produces (in public/):
 *   - pwa-192.png        (192x192, "any"      — logo on white)
 *   - pwa-512.png        (512x512, "any"      — logo on white)
 *   - pwa-maskable-512.png (512x512, "maskable" — logo in safe zone on brand orange)
 *   - apple-touch-icon.png (180x180)
 *   - favicon.svg is left as-is if present; we also emit favicon-32.png
 * Run: node scripts/generateIcons.js
 */
import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const LOGO = path.join(root, 'public/images/hadijaya/makanan/hadijaya-catering-logo.webp');
const outDir = path.join(root, 'public');

const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };
const ORANGE = { r: 249, g: 115, b: 22, alpha: 1 }; // #f97316

async function makeIcon({ size, bg, contentRatio, out }) {
  // contentRatio = fraction of the canvas the logo's longest side may occupy
  const target = Math.round(size * contentRatio);
  const logo = await sharp(LOGO)
    .resize(target, target, { fit: 'inside', withoutEnlargement: false })
    .png()
    .toBuffer();
  const meta = await sharp(logo).metadata();
  const left = Math.round((size - meta.width) / 2);
  const top = Math.round((size - meta.height) / 2);
  await sharp({
    create: { width: size, height: size, channels: 4, background: bg },
  })
    .composite([{ input: logo, left, top }])
    .png()
    .toFile(path.join(outDir, out));
  console.log('  wrote', out, `${size}x${size}`);
}

async function main() {
  console.log('Generating icons from', path.relative(root, LOGO));
  await makeIcon({ size: 192, bg: WHITE, contentRatio: 0.8, out: 'pwa-192.png' });
  await makeIcon({ size: 512, bg: WHITE, contentRatio: 0.8, out: 'pwa-512.png' });
  // Maskable: keep logo inside the ~80% safe zone so no part is clipped by the OS mask
  await makeIcon({ size: 512, bg: ORANGE, contentRatio: 0.6, out: 'pwa-maskable-512.png' });
  await makeIcon({ size: 180, bg: WHITE, contentRatio: 0.82, out: 'apple-touch-icon.png' });
  await makeIcon({ size: 32, bg: WHITE, contentRatio: 0.9, out: 'favicon-32.png' });
  console.log('Done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
