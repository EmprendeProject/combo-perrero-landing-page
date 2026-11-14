import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

// Ancho máximo (px) y calidad por carpeta, según el tamaño real al que se muestran.
const DEFAULT = { width: 1000, quality: 80 };
const BY_DIR = {
  combos: { width: 800, quality: 78 },            // carrusel (máx. 720px de ancho)
  productos: { width: 400, quality: 75 },         // tira de fotos (200px de alto)
  'logos de marcas': { width: 300, quality: 80 }, // logos (48px de alto)
};

async function processDir(dir, opts = DEFAULT) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const srcPath = path.join(dir, file);
    const stat = await fs.stat(srcPath);
    if (stat.isDirectory()) {
      await processDir(srcPath, BY_DIR[file] ?? opts);
    } else if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const destPath = path.join(dir, path.basename(file, ext) + '.webp');
      console.log(`Processing ${file}...`);
      try {
        await sharp(srcPath)
          .resize(opts.width, null, { withoutEnlargement: true })
          .webp({ quality: opts.quality })
          .toFile(destPath);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

// Variantes AVIF responsivas para las imágenes de la primera pantalla.
// Se sirven con <picture> + srcset (ver src/components/Picture.jsx).
const RESPONSIVE = [
  { src: 'titulo tcp.png', name: 'titulo', widths: [480, 720, 1000] },
  { src: 'mocup 1.png', name: 'mocup', widths: [480, 880] },
  ...['1', '2', '3', '4', '5', '6', '7', '9', '10'].map((n) => ({
    src: `combos/${n}.png`, name: `combo-${n}`, widths: [480, 800],
  })),
];

async function processResponsive() {
  const outDir = path.resolve('src/assets/avif');
  await fs.mkdir(outDir, { recursive: true });
  for (const { src, name, widths } of RESPONSIVE) {
    for (const w of widths) {
      const dest = path.join(outDir, `${name}-${w}.avif`);
      console.log(`AVIF ${name}-${w}...`);
      await sharp(path.resolve('src/assets', src))
        .resize(w, null, { withoutEnlargement: true })
        .avif({ quality: 55, effort: 6 })
        .toFile(dest);
    }
  }
}

async function run() {
  if (process.argv.includes('--avif-only')) {
    await processResponsive();
    console.log('Done!');
    return;
  }
  await processDir(path.resolve('src/assets'));
  await processResponsive();

  // Favicon / apple-touch-icon: el original pesa >1 MB
  await sharp('src/assets/logo.png')
    .resize(256, 256, { fit: 'inside' })
    .png({ compressionLevel: 9, palette: true })
    .toFile('public/logo.png');

  console.log('Done!');
}

run();
