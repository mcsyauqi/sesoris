// Brand-caption scrub (cycle #66).
//
// Every blog image on this site is an AI-generated illustration of a generic
// home setting. When the keyword is a brand keyword ("pyrex food storage
// containers") the writing model happily produced alt text like "Pyrex glass
// food storage containers on a countertop" — and src/app/blog/[slug]/page.tsx
// prints markdown alt text as a visible <figcaption>, so that is a
// reader-facing claim that the picture shows a real product it does not show.
// 15 articles shipped that way before this scrub existed; the Glasslock and
// Pyrex renders show unbranded snap-lock containers with no maker's identity
// anywhere in frame.
//
// Brand names in the ARTICLE PROSE are legitimate editorial content and are
// left alone. This module only touches image alt text and image prompts.
// The prompt is scrubbed too: asking an image model for "a Pyrex dish" invites
// it to invent that brand's trade dress on a picture we then publish.
//
// scripts/check-scheduled-publishing.mjs enforces the same rule as an
// exit-code backstop over the whole corpus.

const REPLACEMENTS: Array<[RegExp, string]> = [
  [/\bRubbermaid\s+Brilliance\b/gi, 'clear plastic'],
  [/\bAmazon\s+Basics\b/gi, 'value'],
  [/\bAnchor\s+Hocking\b/gi, 'tempered glass'],
  [/\bContainer\s+Store\b/gi, 'specialty storage'],
  [/\bLock\s*&\s*Lock\b/gi, 'snap-lock'],
  [/\bLe\s+Creuset\b/gi, 'enameled cast iron'],
  [/\bGlasslock\b/gi, 'tempered glass'],
  [/\bPyrex\b/gi, 'tempered glass'],
  [/\bCorelle\b/gi, 'tempered glass'],
  [/\bRubbermaid\b/gi, 'clear plastic'],
  [/\bTupperware\b/gi, 'plastic'],
  [/\bSterilite\b/gi, 'clear plastic'],
  [/\bSnapware\b/gi, 'snap-lock'],
  [/\bIKEA\b/gi, 'modular'],
  // IKEA product-line names name the brand just as plainly as "IKEA" does.
  [/\b(?:PAX|IVAR|ALGOT|BOAXEL|KALLAX|BILLY|TROFAST|SKUBB)\b/g, ''],
  [/\bClosetMaid\b/gi, 'wire shelving'],
  [/\bElfa\b/gi, 'modular wire'],
  [/\bSimplehuman\b/gi, 'stainless steel'],
  [/\bmDesign\b/gi, 'clear acrylic'],
  [/\bOXO\b/g, 'pop-top'],
  [/\bZiploc\b/gi, 'zip-top'],
  [/\bWayfair\b/gi, 'online-retail'],
];

/** Rewrite one caption or image prompt so it describes material and form, not a maker. */
export function scrubBrandsFromCaption(text: string): string {
  let out = text;
  for (const [re, replacement] of REPLACEMENTS) out = out.replace(re, replacement);
  return out
    // "tempered glass glass containers" -> "tempered glass containers"
    .replace(/\b(glass)\s+glass\b/gi, '$1')
    .replace(/\b(plastic)\s+plastic\b/gi, '$1')
    .replace(/\b(modular)\s+modular\b/gi, '$1')
    .replace(/\s{2,}/g, ' ')
    .replace(/\s+([,.;:])/g, '$1')
    .replace(/^[\s,.;:]+/, '')
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
}

/** Scrub every markdown image caption in an article body. */
export function scrubBrandsFromImageLines(lines: string[]): { lines: string[]; scrubbed: string[] } {
  const scrubbed: string[] = [];
  const next = lines.map((line) =>
    line.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (whole, alt: string, src: string) => {
      const cleaned = scrubBrandsFromCaption(alt);
      if (cleaned === alt) return whole;
      scrubbed.push(`${alt} -> ${cleaned}`);
      return `![${cleaned}](${src})`;
    }),
  );
  return { lines: next, scrubbed };
}
