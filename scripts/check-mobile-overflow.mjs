/**
 * Mobile Overflow Detection Script
 * Checks all pages for horizontal overflow on mobile viewport (375px width)
 * Uses Playwright to render each page and detect elements that exceed viewport width
 */

import { chromium } from 'playwright';

const BASE_URL = 'http://localhost:3847';
const VIEWPORT = { width: 375, height: 812 }; // iPhone 13 Mini

// All pages to check (static routes + sample dynamic routes)
const PAGES = [
  '/',
  '/about',
  '/best-sellers',
  '/blog',
  '/careers',
  '/cart',
  '/collections',
  '/contact',
  '/faq',
  '/login',
  '/new-arrivals',
  '/on-sale',
  '/press',
  '/privacy',
  '/register',
  '/returns',
  '/shipping',
  '/shop',
  '/size-guide',
  '/terms',
  '/track-order',
  '/wishlist',
  '/account',
  '/checkout',
];

async function checkOverflow(page, url) {
  const fullUrl = `${BASE_URL}${url}`;
  const issues = [];

  try {
    await page.goto(fullUrl, { waitUntil: 'networkidle', timeout: 15000 });
    // Wait a bit for any animations/lazy loading
    await page.waitForTimeout(1000);
  } catch (e) {
    // Even if networkidle times out, page may still be usable
    await page.waitForTimeout(2000);
  }

  // Check document-level horizontal overflow
  const docOverflow = await page.evaluate(() => {
    const docWidth = document.documentElement.scrollWidth;
    const viewportWidth = window.innerWidth;
    return {
      scrollWidth: docWidth,
      viewportWidth: viewportWidth,
      overflows: docWidth > viewportWidth,
      overflowAmount: docWidth - viewportWidth
    };
  });

  if (docOverflow.overflows) {
    issues.push({
      type: 'DOCUMENT_OVERFLOW',
      message: `Page is ${docOverflow.overflowAmount}px wider than viewport (${docOverflow.scrollWidth}px vs ${docOverflow.viewportWidth}px)`
    });
  }

  // Find specific elements causing overflow
  const overflowingElements = await page.evaluate(() => {
    const viewportWidth = window.innerWidth;
    const results = [];
    const allElements = document.querySelectorAll('*');

    for (const el of allElements) {
      const rect = el.getBoundingClientRect();
      // Skip elements inside fixed ancestors or overflow-clipped containers
      let skipEl = false;
      let ancestor = el.parentElement;
      while (ancestor && ancestor !== document.body) {
        const ancestorStyles = window.getComputedStyle(ancestor);
        if (ancestorStyles.position === 'fixed') { skipEl = true; break; }
        const ov = ancestorStyles.overflow + ancestorStyles.overflowX;
        if (ov.includes('hidden') || ov.includes('auto') || ov.includes('scroll')) {
          // Check if this ancestor actually clips the overflow
          const ancestorRect = ancestor.getBoundingClientRect();
          if (ancestorRect.right <= viewportWidth + 1) { skipEl = true; break; }
        }
        ancestor = ancestor.parentElement;
      }
      if (skipEl) continue;

      if (rect.right > viewportWidth + 1) { // +1 for rounding
        const tag = el.tagName.toLowerCase();
        const id = el.id ? `#${el.id}` : '';
        const classes = el.className && typeof el.className === 'string'
          ? `.${el.className.split(' ').filter(Boolean).join('.')}`
          : '';
        const text = el.textContent?.substring(0, 50)?.trim() || '';

        // Get computed styles that might cause overflow
        const styles = window.getComputedStyle(el);

        results.push({
          selector: `${tag}${id}${classes}`,
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          overflowBy: Math.round(rect.right - viewportWidth),
          text: text.length > 40 ? text.substring(0, 40) + '...' : text,
          computedWidth: styles.width,
          computedOverflow: styles.overflow,
          computedPosition: styles.position,
          parentTag: el.parentElement?.tagName?.toLowerCase() || 'none',
          parentClasses: el.parentElement?.className && typeof el.parentElement.className === 'string'
            ? el.parentElement.className.split(' ').filter(Boolean).slice(0, 3).join(' ')
            : ''
        });
      }

      // Also check if element extends beyond left edge
      if (rect.left < -1) {
        const tag = el.tagName.toLowerCase();
        const id = el.id ? `#${el.id}` : '';
        const classes = el.className && typeof el.className === 'string'
          ? `.${el.className.split(' ').filter(Boolean).join('.')}`
          : '';

        results.push({
          selector: `${tag}${id}${classes}`,
          left: Math.round(rect.left),
          width: Math.round(rect.width),
          overflowBy: Math.round(Math.abs(rect.left)),
          direction: 'left',
          computedPosition: window.getComputedStyle(el).position,
        });
      }
    }

    // Deduplicate - keep only the most specific (deepest) elements
    // Filter out parents whose children are already in the list
    const filtered = results.filter((el, i) => {
      // Keep elements that aren't parents of other overflow elements
      return !results.some((other, j) =>
        i !== j &&
        other.selector !== el.selector &&
        other.overflowBy >= el.overflowBy - 2 &&
        other.selector.length > el.selector.length
      );
    });

    return filtered.slice(0, 20); // Limit to 20 per page
  });

  for (const el of overflowingElements) {
    if (el.direction === 'left') {
      issues.push({
        type: 'ELEMENT_OVERFLOW_LEFT',
        selector: el.selector,
        overflowBy: el.overflowBy,
        position: el.computedPosition,
      });
    } else {
      issues.push({
        type: 'ELEMENT_OVERFLOW_RIGHT',
        selector: el.selector,
        overflowBy: el.overflowBy,
        width: el.width,
        computedWidth: el.computedWidth,
        text: el.text,
        parent: `${el.parentTag}.${el.parentClasses}`,
      });
    }
  }

  return issues;
}

async function main() {
  console.log('=== Mobile Overflow Check (375px viewport) ===\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: VIEWPORT,
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
  });

  const page = await context.newPage();
  const allResults = {};
  let pagesWithIssues = 0;

  for (const url of PAGES) {
    process.stdout.write(`Checking ${url}... `);
    const issues = await checkOverflow(page, url);

    if (issues.length > 0) {
      pagesWithIssues++;
      console.log(`❌ ${issues.length} issue(s)`);
      allResults[url] = issues;

      for (const issue of issues) {
        if (issue.type === 'DOCUMENT_OVERFLOW') {
          console.log(`  📐 ${issue.message}`);
        } else if (issue.type === 'ELEMENT_OVERFLOW_RIGHT') {
          console.log(`  → ${issue.selector} overflows by ${issue.overflowBy}px (width: ${issue.computedWidth})`);
          if (issue.text) console.log(`    text: "${issue.text}"`);
          if (issue.parent) console.log(`    parent: ${issue.parent}`);
        } else if (issue.type === 'ELEMENT_OVERFLOW_LEFT') {
          console.log(`  ← ${issue.selector} overflows left by ${issue.overflowBy}px`);
        }
      }
    } else {
      console.log('✅ OK');
    }
  }

  console.log('\n=== SUMMARY ===');
  console.log(`Total pages checked: ${PAGES.length}`);
  console.log(`Pages with overflow: ${pagesWithIssues}`);
  console.log(`Pages OK: ${PAGES.length - pagesWithIssues}`);

  if (pagesWithIssues > 0) {
    console.log('\n--- Pages needing fixes ---');
    for (const [url, issues] of Object.entries(allResults)) {
      const docOverflow = issues.find(i => i.type === 'DOCUMENT_OVERFLOW');
      console.log(`  ${url}: ${docOverflow ? docOverflow.message : `${issues.length} element(s) overflow`}`);
    }
  }

  await browser.close();

  // Write detailed results to JSON
  const fs = await import('fs');
  fs.writeFileSync(
    'scripts/overflow-results.json',
    JSON.stringify(allResults, null, 2)
  );
  console.log('\nDetailed results saved to scripts/overflow-results.json');
}

main().catch(console.error);
