import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const imagesDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'images');

async function makeVariant(src, width, quality) {
  const base = src.replace(/\.webp$/, '');
  const outName = `${base}-${width}.webp`;
  const input = path.join(imagesDir, src);
  const output = path.join(imagesDir, outName);

  const info = await sharp(input)
    .resize(width, null, { withoutEnlargement: true, fit: 'inside' })
    .webp({ quality, effort: 6 })
    .toFile(output);

  console.log(`${outName}: ${Math.round(info.size / 1024)} KiB`);
  return outName;
}

const hero768 = await makeVariant('hero-bg.webp', 768, 68);
const hero1280 = await makeVariant('hero-bg.webp', 1280, 70);
const hero1920 = await makeVariant('hero-bg.webp', 1920, 72);

for (const name of ['nav-about.webp', 'nav-services.webp', 'nav-contact.webp']) {
  await makeVariant(name, 420, 75);
  await makeVariant(name, 800, 75);
}

await makeVariant('service-equipment.webp', 600, 75);
await makeVariant('service-equipment.webp', 800, 75);

console.log('Hero variants:', hero768, hero1280, hero1920);
