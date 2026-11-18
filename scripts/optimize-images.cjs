// Generates responsive WebP/AVIF width variants for every published WebP in public/media
// and writes data/image-manifest.json, which components/OptimizedImage.jsx uses for srcset.
//
//   node scripts/optimize-images.cjs
//
// Variants are encoded from the original PNG/JPG next to the WebP when it exists (same
// aspect ratio), otherwise from the WebP itself. The full-size WebP/AVIF files are kept as-is,
// so printed packaging and logos are never re-encoded at their published size.
// `sharp` ships with Next.js (optional dependency); install it explicitly if it is missing.
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..");
const MEDIA = path.join(ROOT, "public/media");
const MANIFEST = path.join(ROOT, "data/image-manifest.json");
const WIDTHS = [320, 640, 960];
// Skip a variant unless it is meaningfully smaller than the published file.
const MIN_GAIN = 0.8;
const VARIANT = /-\d+w\.(webp|avif)$/;

const walk = (dir) => fs.readdirSync(dir, { withFileTypes: true })
  .flatMap((entry) => entry.isDirectory() ? walk(path.join(dir, entry.name)) : [path.join(dir, entry.name)]);

async function sourceFor(webp, width, height) {
  for (const ext of [".png", ".jpg"]) {
    const candidate = webp.replace(/\.webp$/, ext);
    if (!fs.existsSync(candidate)) continue;
    const meta = await sharp(candidate).metadata();
    if (Math.abs(meta.width / meta.height - width / height) < 0.01) return candidate;
  }
  return webp;
}

async function main() {
  const manifest = {};
  let written = 0;
  const files = walk(MEDIA).filter((file) => file.endsWith(".webp") && !VARIANT.test(file)).sort();
  for (const webp of files) {
    const { width, height } = await sharp(webp).metadata();
    const key = "/" + path.relative(path.join(ROOT, "public"), webp).split(path.sep).join("/");
    const source = await sourceFor(webp, width, height);
    const avif = webp.replace(/\.webp$/, ".avif");
    if (!fs.existsSync(avif)) {
      await sharp(source).resize({ width }).avif({ quality: 60, effort: 6 }).toFile(avif);
      written++;
    }
    const widths = WIDTHS.filter((w) => w <= width * MIN_GAIN);
    for (const w of widths) {
      const base = webp.replace(/\.webp$/, `-${w}w`);
      if (!fs.existsSync(`${base}.webp`)) { await sharp(source).resize({ width: w }).webp({ quality: 82, effort: 6, alphaQuality: 90 }).toFile(`${base}.webp`); written++; }
      if (!fs.existsSync(`${base}.avif`)) { await sharp(source).resize({ width: w }).avif({ quality: 60, effort: 6 }).toFile(`${base}.avif`); written++; }
    }
    manifest[key] = { width, height, widths };
  }
  fs.writeFileSync(MANIFEST, JSON.stringify(manifest, null, 2) + "\n");
  console.log(`${files.length} images in manifest, ${written} files written.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
