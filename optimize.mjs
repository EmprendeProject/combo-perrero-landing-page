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

async function run() {
  await processDir(path.resolve('src/assets'));

  // Favicon / apple-touch-icon: el original pesa >1 MB
  await sharp('src/assets/logo.png')
    .resize(256, 256, { fit: 'inside' })
    .png({ compressionLevel: 9, palette: true })
    .toFile('public/logo.png');

  console.log('Done!');
}

run();
