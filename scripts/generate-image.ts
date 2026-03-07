// Gemini image generation + sharp compression to WebP (max 100KB)
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'blog');

interface GeneratedImage {
  filename: string;
  path: string;
  publicPath: string;
  altText: string;
}

export async function generateBlogImage(
  prompt: string,
  filename: string,
  altText: string
): Promise<GeneratedImage> {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not set');

  console.log(`  [Image] Generating: ${filename}`);

  // Use Gemini's Imagen 4 model to generate image
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/imagen-4.0-generate-001:predict?key=${GEMINI_API_KEY}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        instances: [{ prompt }],
        parameters: {
          sampleCount: 1,
          aspectRatio: '16:9',
          safetyFilterLevel: 'block_few',
        },
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const base64Image = data.predictions?.[0]?.bytesBase64Encoded;

  if (!base64Image) {
    throw new Error('No image data returned from Gemini');
  }

  // Decode base64 to buffer
  const imageBuffer = Buffer.from(base64Image, 'base64');

  // Compress to WebP, max 100KB
  const webpFilename = filename.replace(/\.[^.]+$/, '') + '.webp';
  const outputPath = path.join(OUTPUT_DIR, webpFilename);

  // Ensure output directory exists
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  // Try different quality levels to stay under 100KB
  let quality = 80;
  let outputBuffer: Buffer;

  do {
    outputBuffer = await sharp(imageBuffer)
      .resize(1200, 675, { fit: 'cover' }) // 16:9 aspect ratio
      .webp({ quality })
      .toBuffer();

    if (outputBuffer.length <= 100 * 1024) break;
    quality -= 5;
  } while (quality >= 20);

  fs.writeFileSync(outputPath, outputBuffer);
  const sizeKB = Math.round(outputBuffer.length / 1024);
  console.log(`  [Image] Saved: ${webpFilename} (${sizeKB}KB, q=${quality})`);

  return {
    filename: webpFilename,
    path: outputPath,
    publicPath: `/images/blog/${webpFilename}`,
    altText,
  };
}

export async function generateArticleImages(
  slug: string,
  descriptions: { prompt: string; filename: string; altText: string }[]
): Promise<GeneratedImage[]> {
  const results: GeneratedImage[] = [];

  for (const desc of descriptions) {
    try {
      const img = await generateBlogImage(
        desc.prompt,
        `${slug}-${desc.filename}`,
        desc.altText
      );
      results.push(img);
    } catch (err) {
      console.error(`  [Image] Failed to generate ${desc.filename}:`, err);
    }
  }

  return results;
}

// CLI usage: tsx scripts/generate-image.ts "prompt" "filename" "alt text"
if (process.argv[2] && !process.argv[1]?.includes('process-trello')) {
  const prompt = process.argv[2];
  const filename = process.argv[3] || 'test-image';
  const altText = process.argv[4] || prompt;

  generateBlogImage(prompt, filename, altText)
    .then((img) => console.log('Generated:', img))
    .catch((err) => {
      console.error('Error:', err);
      process.exit(1);
    });
}
