const fs = require('node:fs');
const path = require('node:path');
const sharp = require('sharp');

async function main() {
  const files = ['components', 'data'].flatMap(dir => fs.readdirSync(dir).filter(name => /\.(jsx|js)$/.test(name)).map(name => path.join(dir, name)));
  const assets = new Set();
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(/"([^"\r\n]+\.(?:png|jpg|webp))"/g)) {
      let asset = match[1].replace(/^\/media\//, '');
      if (asset.endsWith('.webp')) {
        const original = ['.png', '.jpg'].map(ext => asset.replace(/\.webp$/, ext)).find(name => fs.existsSync(path.join('public/media', name)));
        if (original) asset = original;
      }
      if (fs.existsSync(path.join('public/media', asset))) assets.add(asset);
    }
  }
  let before = 0, after = 0;
  const report = [];
  for (const asset of assets) {
    if (asset.endsWith('.webp')) continue;
    const source = path.join('public/media', asset);
    const output = source.replace(/\.(png|jpg)$/i, '.webp');
    const background = asset.includes('Background');
    let maxSize = background ? 1920 : 1200;
    let buffer;
    let quality = 82;
    for (;;) {
      buffer = await sharp(source).resize({ width: maxSize, height: maxSize, fit: 'inside', withoutEnlargement: true }).webp({ quality, effort: 6, alphaQuality: 90 }).toBuffer();
      if (buffer.length <= 100 * 1024 || maxSize <= 700) break;
      if (quality > 66) quality -= 8;
      else { maxSize = Math.round(maxSize * .85); quality = 78; }
    }
    fs.writeFileSync(output, buffer);
    const original = fs.statSync(source).size;
    before += original; after += buffer.length;
    report.push({ asset, before: original, after: buffer.length });
  }
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const updated = content.replace(/"([^"\r\n]+)\.(png|jpg)"/g, (full, name) => {
      const asset = name.replace(/^\/media\//, '') + '.webp';
      return fs.existsSync(path.join('public/media', asset)) ? '"' + name + '.webp"' : full;
    });
    if (updated !== content) fs.writeFileSync(file, updated);
  }
  console.log(JSON.stringify({ before, after, reduction: ((1-after/before)*100).toFixed(1)+'%', images: report }, null, 2));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
