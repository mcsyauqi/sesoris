// Gemini image generation + sharp compression to WebP (max 100KB).
//
// 2026-09-14 (cycle #64): the old call was
//   POST /v1beta/models/imagen-4.0-generate-001:predict
// which has returned `404 ... is not found for API version v1beta, or is not
// supported for predict` on every single run since roughly 2026-08-20. Because
// generateArticleImages() swallowed the error, generate-blog-post.ts fell back
// to /images/blog/default-hero.webp and stripped every PLACEHOLDER_IMAGE line,
// so 63 articles shipped with the same hero and no body images while the
// workflow stayed green. ListModels on the live key shows no imagen-*:predict
// model at all; the supported path is <gemini-*-image>:generateContent with
// responseModalities: ['IMAGE']. Failures are now surfaced to the caller so the
// hero gate in generate-blog-post.ts can fail the run loudly.
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY!;
const OUTPUT_DIR = path.join(process.cwd(), 'public', 'images', 'blog');

// Ordered preference. Override with GEMINI_IMAGE_MODEL to pin one.
const IMAGE_MODELS = (process.env.GEMINI_IMAGE_MODEL || 'gemini-3.1-flash-image,gemini-2.5-flash-image')
  .split(',')
  .map((m) => m.trim())
  .filter(Boolean);

// Every blog image is a concept illustration of a generic home setting, never a
// claim about a real place or product, and must carry no burnt-in typography.
const NO_TEXT_GUARD =
  ' Wide 16:9 full-bleed framing. Absolutely no text, no letters, no numbers, no labels, no logos, no watermark, no signage anywhere in the image.';

export interface GeneratedImage {
  filename: string;
  path: string;
  publicPath: string;
  altText: string;
}

export interface ImageFailure {
  filename: string;
  error: string;
}

export interface ArticleImageResult {
  images: GeneratedImage[];
  failures: ImageFailure[];
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

async function requestImageBytes(prompt: string): Promise<Buffer> {
  const errors: string[] = [];

  for (const model of IMAGE_MODELS) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: prompt + NO_TEXT_GUARD }] }],
            generationConfig: {
              responseModalities: ['IMAGE'],
              imageConfig: { aspectRatio: '16:9' },
            },
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        const parts = data?.candidates?.[0]?.content?.parts ?? [];
        const inline = parts.find((p: Record<string, unknown>) => p.inlineData || p.inline_data);
        const payload = (inline?.inlineData ?? inline?.inline_data) as { data?: string } | undefined;
        if (payload?.data) return Buffer.from(payload.data, 'base64');
        errors.push(`${model}: 200 but no inline image data`);
        break; // a 200 with no image is not worth retrying on this model
      }

      const errorText = (await response.text()).slice(0, 400);
      errors.push(`${model}: HTTP ${response.status} ${errorText}`);

      // 404/400 mean the model id is wrong for this key: try the next model now.
      if (response.status === 404 || response.status === 400 || response.status === 403) break;
      // 429/5xx are transient: back off and retry the same model.
      if (attempt < 3) await sleep(attempt * 4000);
    }
  }

  throw new Error(`All image models failed. ${errors.join(' | ')}`);
}

export async function generateBlogImage(
  prompt: string,
  filename: string,
  altText: string
): Promise<GeneratedImage> {
  if (!GEMINI_API_KEY) throw new Error('GEMINI_API_KEY not set');

  console.log(`  [Image] Generating: ${filename}`);
  const imageBuffer = await requestImageBytes(prompt);

  // Compress to WebP, max 100KB
  const webpFilename = filename.replace(/\.[^.]+$/, '') + '.webp';
  const outputPath = path.join(OUTPUT_DIR, webpFilename);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  let quality = 82;
  let outputBuffer: Buffer;
  do {
    outputBuffer = await sharp(imageBuffer)
      .resize(1200, 675, { fit: 'cover' }) // 16:9
      .webp({ quality })
      .toBuffer();
    if (outputBuffer.length <= 100 * 1024) break;
    quality -= 5;
  } while (quality >= 20);

  fs.writeFileSync(outputPath, outputBuffer);
  console.log(`  [Image] Saved: ${webpFilename} (${Math.round(outputBuffer.length / 1024)}KB, q=${quality})`);

  return {
    filename: webpFilename,
    path: outputPath,
    publicPath: `/images/blog/${webpFilename}`,
    altText,
  };
}

/**
 * Generates every image for one article.
 *
 * Individual failures no longer vanish into a console.error: they come back in
 * `failures` so the caller can decide (the blog generator fails the whole run
 * when the hero is missing, instead of silently shipping the shared default).
 */
export async function generateArticleImages(
  slug: string,
  descriptions: { prompt: string; filename: string; altText: string }[]
): Promise<ArticleImageResult> {
  const images: GeneratedImage[] = [];
  const failures: ImageFailure[] = [];

  for (const desc of descriptions) {
    try {
      images.push(await generateBlogImage(desc.prompt, `${slug}-${desc.filename}`, desc.altText));
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(`  [Image] Failed to generate ${desc.filename}: ${message}`);
      failures.push({ filename: desc.filename, error: message });
    }
  }

  return { images, failures };
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
