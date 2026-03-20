/**
 * Optimize all images in public/ to WebP, max 100KB
 * - Converts PNG/JPG to WebP
 * - Compresses WebP files over 100KB
 * - Updates references in source files
 */
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '..', 'public');
const srcDir = path.join(__dirname, '..', 'src');
const contentDir = path.join(__dirname, '..', 'content');
const MAX_SIZE = 100 * 1024; // 100KB

let converted = 0;
let compressed = 0;
let skipped = 0;
let failed = 0;

async function findAllImages(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...await findAllImages(fullPath));
    } else if (/\.(png|jpg|jpeg|webp)$/i.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const stats = fs.statSync(filePath);
  const relPath = path.relative(publicDir, filePath);

  // Skip SVGs
  if (ext === '.svg') return null;

  // For PNG/JPG: convert to WebP
  if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
    const webpPath = filePath.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    const relWebpPath = relPath.replace(/\.(png|jpg|jpeg)$/i, '.webp');

    try {
      // Try different quality levels to get under 100KB
      let quality = 80;
      let buffer;
      let img = sharp(filePath);
      const metadata = await img.metadata();

      // Resize if very large (width > 1200px for blog, 400px for icons)
      const maxWidth = relPath.includes('blog') ? 1200 : (relPath.includes('logo') || relPath.includes('icon') ? 400 : 800);
      if (metadata.width && metadata.width > maxWidth) {
        img = img.resize(maxWidth);
      }

      buffer = await img.webp({ quality }).toBuffer();

      // Keep reducing quality until under 100KB
      while (buffer.length > MAX_SIZE && quality > 20) {
        quality -= 10;
        img = sharp(filePath);
        if (metadata.width && metadata.width > maxWidth) {
          img = img.resize(maxWidth);
        }
        buffer = await img.webp({ quality }).toBuffer();
      }

      // If still over 100KB, resize more aggressively
      if (buffer.length > MAX_SIZE && metadata.width) {
        const newWidth = Math.floor(maxWidth * 0.7);
        buffer = await sharp(filePath).resize(newWidth).webp({ quality: 60 }).toBuffer();
      }

      fs.writeFileSync(webpPath, buffer);

      // Remove original PNG/JPG
      if (webpPath !== filePath) {
        fs.unlinkSync(filePath);
      }

      const savings = stats.size - buffer.length;
      console.log(`✅ ${relPath} → ${relWebpPath} (${(stats.size/1024).toFixed(0)}KB → ${(buffer.length/1024).toFixed(0)}KB, saved ${(savings/1024).toFixed(0)}KB)`);
      converted++;
      return { oldPath: '/' + relPath.replace(/\\/g, '/'), newPath: '/' + relWebpPath.replace(/\\/g, '/') };
    } catch (err) {
      console.error(`❌ ${relPath}: ${err.message}`);
      failed++;
      return null;
    }
  }

  // For WebP over 100KB: compress
  if (ext === '.webp' && stats.size > MAX_SIZE) {
    try {
      let quality = 75;
      let img = sharp(filePath);
      const metadata = await img.metadata();

      const maxWidth = relPath.includes('blog') ? 1200 : 800;
      if (metadata.width && metadata.width > maxWidth) {
        img = img.resize(maxWidth);
      }

      let buffer = await img.webp({ quality }).toBuffer();

      while (buffer.length > MAX_SIZE && quality > 20) {
        quality -= 10;
        img = sharp(filePath);
        if (metadata.width && metadata.width > maxWidth) {
          img = img.resize(maxWidth);
        }
        buffer = await img.webp({ quality }).toBuffer();
      }

      if (buffer.length > MAX_SIZE && metadata.width) {
        const newWidth = Math.floor(maxWidth * 0.7);
        buffer = await sharp(filePath).resize(newWidth).webp({ quality: 50 }).toBuffer();
      }

      fs.writeFileSync(filePath, buffer);
      const savings = stats.size - buffer.length;
      console.log(`🔧 ${relPath} (${(stats.size/1024).toFixed(0)}KB → ${(buffer.length/1024).toFixed(0)}KB, saved ${(savings/1024).toFixed(0)}KB)`);
      compressed++;
    } catch (err) {
      console.error(`❌ ${relPath}: ${err.message}`);
      failed++;
    }
    return null;
  }

  skipped++;
  return null;
}

function updateReferences(oldPath, newPath) {
  // Update all .tsx, .ts, .json files in src/ and content/
  const dirs = [srcDir, contentDir];
  for (const dir of dirs) {
    if (!fs.existsSync(dir)) continue;
    walkAndReplace(dir, oldPath, newPath);
  }
}

function walkAndReplace(dir, oldStr, newStr) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      walkAndReplace(fullPath, oldStr, newStr);
    } else if (/\.(tsx?|json)$/.test(entry.name)) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      if (content.includes(oldStr)) {
        fs.writeFileSync(fullPath, content.replaceAll(oldStr, newStr), 'utf-8');
        console.log(`  📝 Updated ref in ${path.relative(path.join(__dirname, '..'), fullPath)}`);
      }
    }
  }
}

async function main() {
  console.log('=== Image Optimization ===\n');

  const images = await findAllImages(publicDir);
  console.log(`Found ${images.length} images\n`);

  // Process PNG/JPG conversions first (need to update refs)
  const renames = [];
  for (const img of images) {
    const ext = path.extname(img).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const result = await optimizeImage(img);
      if (result) renames.push(result);
    }
  }

  // Update references for renamed files
  if (renames.length > 0) {
    console.log(`\n--- Updating ${renames.length} references ---`);
    for (const { oldPath, newPath } of renames) {
      updateReferences(oldPath, newPath);
    }
  }

  // Now compress oversized WebP files
  console.log('\n--- Compressing oversized WebP files ---');
  const webpImages = await findAllImages(publicDir);
  for (const img of webpImages) {
    if (path.extname(img).toLowerCase() === '.webp') {
      await optimizeImage(img);
    }
  }

  console.log(`\n=== DONE ===`);
  console.log(`Converted to WebP: ${converted}`);
  console.log(`Compressed WebP: ${compressed}`);
  console.log(`Skipped (already OK): ${skipped}`);
  console.log(`Failed: ${failed}`);
}

main().catch(console.error);
