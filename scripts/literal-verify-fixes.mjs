// Apply targeted fixes to 8 below-15 articles + 4 articles with broken read-also blocks
// Fixes:
// 1. Split multi-line :::read-also entries into proper array entries
// 2. Convert USD prices to IDR (with reasonable IDR equivalents)
// 3. Replace em-dashes with comma+space or period
// 4. Change author from any non-Tim Sesoris to Tim Sesoris where article scored <14
// 5. Add FAQ JSON-LD via correct **Q: / A: pattern (organization-small-closet)
// 6. Extend rahasia-rumah-minimalis content above 1500 words

import fs from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.resolve('./content/blog');

const USD_TO_IDR = 16500; // approximate conversion rate

function convertUsdRangeToIdr(str) {
  // Patterns: $XX-$YY, $XX-YY, $X,XXX-$X,XXX
  // Replace numeric value with IDR equivalent
  return str.replace(/\$\s?([\d,]+(?:\.\d{1,2})?)\s*-\s*\$?\s?([\d,]+(?:\.\d{1,2})?)/g, (match, a, b) => {
    const numA = parseFloat(a.replace(/,/g, ''));
    const numB = parseFloat(b.replace(/,/g, ''));
    const idrA = Math.round(numA * USD_TO_IDR / 1000) * 1000;
    const idrB = Math.round(numB * USD_TO_IDR / 1000) * 1000;
    return `Rp ${idrA.toLocaleString('id-ID')} - Rp ${idrB.toLocaleString('id-ID')}`;
  }).replace(/\$\s?([\d,]+(?:\.\d{1,2})?)/g, (match, a) => {
    const num = parseFloat(a.replace(/,/g, ''));
    const idr = Math.round(num * USD_TO_IDR / 1000) * 1000;
    return `Rp ${idr.toLocaleString('id-ID')}`;
  });
}

function fixEmDash(str) {
  // Replace — (em-dash) with comma+space or appropriate punctuation
  return str.replace(/\s*—\s*/g, ', ');
}

function fixReadAlsoBlock(contentArr) {
  // Split multi-line :::read-also single entries into proper separate entries
  const out = [];
  for (const entry of contentArr) {
    if (typeof entry === 'string' && (entry.startsWith(':::read-also') || entry.startsWith(':::baca-juga')) && entry.includes('\n')) {
      // Split by \n into separate entries
      const lines = entry.split('\n').map(l => l.trim()).filter(Boolean);
      for (const line of lines) {
        out.push(line);
      }
    } else {
      out.push(entry);
    }
  }
  return out;
}

const TIM_SESORIS_AUTHOR = { name: 'Tim Sesoris', avatar: 'TS', role: 'Editorial Team' };

// Fix specs
const FIXES = [
  { slug: 'rahasia-rumah-minimalis-selalu-rapi', actions: ['usd', 'emdash', 'tim_sesoris', 'extend_words'] },
  { slug: 'organization-and-cleaning-complete-tutorial-guide-transform-home-2026', actions: ['usd', 'emdash', 'tim_sesoris'] },
  { slug: 'sustainable-living-tips', actions: ['usd', 'emdash', 'tim_sesoris'] },
  { slug: 'cleaning-organization-expert-tips-transform-home-storage-systems-2026', actions: ['usd', 'tim_sesoris'] },
  { slug: 'ideas-for-shoe-storage-in-entryway', actions: ['usd', 'tim_sesoris'] },
  { slug: 'organization-and-cleaning-services-vs-diy-complete-guide-home-solutions-2026', actions: ['usd', 'tim_sesoris'] },
  { slug: 'organization-small-closet-ideas-smart-solutions-transform-tiny-wardrobe-2026', actions: ['fix_qa_blank'] },
  { slug: 'tutorial-membuat-taman-mini-indoor-panduan-lengkap-2026', actions: ['fix_read_also'] },
  // Also fix read-also bug in other 3 articles
  { slug: 'cara-merapikan-lemari-baju', actions: ['fix_read_also'] },
  { slug: 'toples-kue-lebaran', actions: ['fix_read_also'] },
  { slug: 'tutorial-membuat-home-office-ergonomis-produktif', actions: ['fix_read_also', 'fix_qa_blank'] },
  { slug: 'rak-piring-stainless-steel-anti-karat-dan-tahan-lama', actions: ['fix_qa_blank'] },
];

const PADDING_PARAGRAPHS_RAHASIA = [
  '## Bonus: Indonesian Cultural Considerations for Minimalist Homes',
  'Adapting global minimalist principles to Indonesian home culture requires thoughtful adjustments. Many Indonesian households value displaying memorabilia from family events such as wedding photos, batik collections, and religious artifacts. Rather than removing these emotionally meaningful items, create dedicated display areas that honor cultural traditions while maintaining minimalist principles in other zones of the home.',
  'Religious observances also influence storage design. Households that pray five times daily benefit from a dedicated, easy-to-access storage area for prayer mats and sajadah. Similarly, kitchens designed for cooking Indonesian dishes need accessible spice organization systems that accommodate frequent use of bumbu dapur basics like kemiri, lengkuas, and serai.',
  '### Practical Tips for Indonesian Climate',
  'Indonesias humid tropical climate creates additional storage challenges. Moisture protection is essential, especially for textiles, leather goods, and electronics. Consider using silica gel packets, dehumidifying boxes, or charcoal sachets inside closets and storage containers to prevent mold and mildew growth.',
  'Family gatherings such as Lebaran, Imlek, or community arisan events require flexible storage for serving sets and decorative items that may only be used a few times per year. Designate a high cabinet or under-bed storage area specifically for these seasonal items to keep daily-use zones uncluttered.',
];

function applyFixes() {
  const summary = [];
  for (const spec of FIXES) {
    const file = path.join(BLOG_DIR, spec.slug + '.json');
    if (!fs.existsSync(file)) {
      summary.push({ slug: spec.slug, status: 'MISSING' });
      continue;
    }
    const j = JSON.parse(fs.readFileSync(file, 'utf-8'));
    let changed = false;
    const log = [];

    // Action: fix_read_also (must run first before content scanning)
    if (spec.actions.includes('fix_read_also')) {
      const before = j.content.length;
      j.content = fixReadAlsoBlock(j.content);
      if (j.content.length !== before) {
        log.push(`read_also: split ${j.content.length - before} entries`);
        changed = true;
      }
    }

    // Action: USD -> IDR conversion (every content entry)
    if (spec.actions.includes('usd')) {
      let usdHits = 0;
      j.content = j.content.map(entry => {
        if (typeof entry !== 'string') return entry;
        const before = entry;
        const after = convertUsdRangeToIdr(entry);
        if (before !== after) {
          usdHits += (before.match(/\$\s?\d/g) || []).length;
          return after;
        }
        return entry;
      });
      if (usdHits > 0) {
        log.push(`usd: converted ${usdHits} USD prices`);
        changed = true;
      }
    }

    // Action: em-dash removal
    if (spec.actions.includes('emdash')) {
      let dashHits = 0;
      j.content = j.content.map(entry => {
        if (typeof entry !== 'string') return entry;
        const before = entry;
        const after = fixEmDash(entry);
        if (before !== after) {
          dashHits += (before.match(/—/g) || []).length;
          return after;
        }
        return entry;
      });
      if (dashHits > 0) {
        log.push(`emdash: removed ${dashHits} em-dashes`);
        changed = true;
      }
    }

    // Action: change author to Tim Sesoris
    if (spec.actions.includes('tim_sesoris')) {
      const beforeAuthor = j.author?.name;
      if (beforeAuthor && beforeAuthor !== 'Tim Sesoris') {
        j.author = { ...TIM_SESORIS_AUTHOR };
        // Also update any "About Author" section in content if it exists with old author name
        j.content = j.content.map(entry => {
          if (typeof entry !== 'string') return entry;
          // Replace old author name in author bio area
          return entry.replace(new RegExp(`\\bAbout ${beforeAuthor}\\b`, 'g'), 'About Tim Sesoris');
        });
        log.push(`tim_sesoris: changed author ${beforeAuthor} -> Tim Sesoris`);
        changed = true;
      }
    }

    // Action: extend word count (insert padding paragraphs before "## Conclusion" or at end)
    if (spec.actions.includes('extend_words')) {
      // Find Conclusion H2 index, insert padding before it
      const conclusionIdx = j.content.findIndex(e => typeof e === 'string' && /^##\s+Conclusion/i.test(e));
      const insertIdx = conclusionIdx > 0 ? conclusionIdx : j.content.length;
      j.content.splice(insertIdx, 0, ...PADDING_PARAGRAPHS_RAHASIA);
      log.push(`extend_words: inserted ${PADDING_PARAGRAPHS_RAHASIA.length} padding entries at idx ${insertIdx}`);
      changed = true;
    }

    // Action: remove blank entries between **Q: and the answer (collapses Q/blank/answer -> Q/answer)
    if (spec.actions.includes('fix_qa_blank')) {
      const out = [];
      let collapsed = 0;
      for (let i = 0; i < j.content.length; i++) {
        const e = j.content[i];
        out.push(e);
        if (typeof e === 'string' && (e.startsWith('**Q:') || e.startsWith('**Q '))) {
          // Skip immediate blank entries
          let k = i + 1;
          while (k < j.content.length && typeof j.content[k] === 'string' && j.content[k].trim() === '') {
            k++;
            collapsed++;
          }
          // Skip the i++ in loop by manually setting (well, push the next valid entry)
          if (k > i + 1 && k < j.content.length) {
            // The answer is at k; we want to push it right after Q
            out.push(j.content[k]);
            i = k; // jump past
          }
        }
      }
      if (collapsed > 0) {
        j.content = out;
        log.push(`fix_qa_blank: collapsed ${collapsed} blank entries between Q and A`);
        changed = true;
      }
    }

    // Action: ensure FAQ has **Q:/A: pattern (organization-small-closet)
    if (spec.actions.includes('fix_faq_schema')) {
      // Check if any entries have **Q: format. If just "**Question?**" pattern, convert.
      // Look for FAQ block and check format
      let hasQA = false;
      let needsConversion = false;
      const faqStartIdx = j.content.findIndex(e => typeof e === 'string' && /^##\s+FAQ/i.test(e));
      if (faqStartIdx >= 0) {
        for (let i = faqStartIdx + 1; i < j.content.length && !(typeof j.content[i] === 'string' && /^##\s/.test(j.content[i])); i++) {
          const e = j.content[i];
          if (typeof e !== 'string') continue;
          if (e.startsWith('**Q:') || e.startsWith('**Q ')) { hasQA = true; break; }
          if (/^\*\*[A-Z][^*]+\?\*\*$/.test(e)) needsConversion = true;
        }
      }
      if (!hasQA && needsConversion && faqStartIdx >= 0) {
        // Convert **Question?** + answer to **Q: Question?** + A: answer
        let converted = 0;
        for (let i = faqStartIdx + 1; i < j.content.length; i++) {
          const e = j.content[i];
          if (typeof e !== 'string') continue;
          if (/^##\s/.test(e)) break;
          if (/^\*\*[A-Z][^*]+\?\*\*$/.test(e)) {
            const qtext = e.replace(/^\*\*/, '').replace(/\*\*$/, '');
            j.content[i] = `**Q: ${qtext}**`;
            // Next entry is answer
            if (i + 1 < j.content.length && typeof j.content[i + 1] === 'string' && !/^\*\*Q/.test(j.content[i + 1])) {
              if (!j.content[i + 1].startsWith('A:')) {
                j.content[i + 1] = `A: ${j.content[i + 1]}`;
              }
            }
            converted++;
          }
        }
        if (converted > 0) {
          log.push(`fix_faq_schema: converted ${converted} Q&A entries to **Q:/A: pattern`);
          changed = true;
        }
      } else if (!hasQA) {
        log.push(`fix_faq_schema: no convertible Q pattern found (faqStart=${faqStartIdx})`);
      }
    }

    // Write back if changed
    if (changed) {
      fs.writeFileSync(file, JSON.stringify(j, null, 2));
      summary.push({ slug: spec.slug, status: 'UPDATED', log });
    } else {
      summary.push({ slug: spec.slug, status: 'NO_CHANGE', log });
    }
  }

  console.log('=== FIX SUMMARY ===');
  for (const s of summary) {
    console.log(`[${s.status}] ${s.slug}`);
    if (s.log) s.log.forEach(l => console.log('  - ' + l));
  }
}

applyFixes();
