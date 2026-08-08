import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

async function processDir(dir, maxWidth) {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    const srcPath = path.join(dir, file);
    const stat = await fs.stat(srcPath);
    if (stat.isDirectory()) {
      await processDir(srcPath, maxWidth);
    } else if (['.jpg', '.jpeg', '.png'].includes(ext)) {
      const destPath = path.join(dir, path.basename(file, ext) + '.webp');
      console.log(`Processing ${file}...`);
      try {
        await sharp(srcPath)
          .resize(maxWidth, null, { withoutEnlargement: true })
          .webp({ quality: 80 })
          .toFile(destPath);
      } catch (err) {
        console.error(`Error processing ${file}:`, err);
      }
    }
  }
}

async function run() {
  await processDir(path.resolve('src/assets'), 1000);
  console.log('Done!');
}

run();
