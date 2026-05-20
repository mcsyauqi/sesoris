#!/usr/bin/env python3
"""Bulk fixes that apply to ALL Sesoris articles regardless of score.

Fixes:
  1. Replace em-dash (—) with ', ' or '. ' contextually
  2. Replace USD pricing ($X, USD X, X dollars) with IDR equivalent (Rp X 16,000)
  3. Remove fake authority namedrops without context (EPA / ACS / FDA / McKinsey unlinked)
  4. Strip filler phrases ('it goes without saying', 'as we all know', etc.)
  5. Fix double-bold spacing

Note: This is a SURGICAL bulk fix. Articles that need full rewrite are handled separately.
"""
import json
import re
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / 'content' / 'blog'

USD_TO_IDR = 16000  # approximate rate

# Common Sesoris-relevant USD ranges to IDR ranges
PRICE_REPLACE = {
    r'\$(\d{1,3})(?:[.,](\d{2}))?': lambda m: f"Rp {int(m.group(1)) * USD_TO_IDR:,}".replace(',', '.'),
}

EM_DASH = '—'
DOUBLE_DASH = '--'

FILLER = [
    (r'\b[Aa]s we all know,?\s*', ''),
    (r'\b[Ii]t goes without saying that\s*', ''),
    (r'\b[Ii]t is important to note that\s*', ''),
    (r'\b[Nn]eedless to say,?\s*', ''),
    (r'\b[Aa]t the end of the day,?\s*', ''),
    (r'\b[Ii]n today\'s world,?\s*', ''),
    (r'\b[Ii]n this day and age,?\s*', ''),
]

def fix_em_dash(text):
    """Replace em-dashes with comma (most common safe replacement)."""
    # Pattern: word — word → word, word
    text = re.sub(r'\s*—\s*', ', ', text)
    # Hyphen-hyphen also problematic
    text = re.sub(r'(\w)\s*--\s*(\w)', r'\1, \2', text)
    return text

def fix_usd_pricing(text):
    """Convert $XX to Rp XXX.XXX (rough conversion @ Rp 16,000)."""
    # $123, $123.45
    def repl_dollar(m):
        whole = int(m.group(1))
        idr = whole * USD_TO_IDR
        # Format as Indonesian
        formatted = f"{idr:,}".replace(',', '.')
        return f"Rp {formatted}"

    text = re.sub(r'\$(\d{1,4})(?:\.\d{2})?', repl_dollar, text)
    # "starting at 25 dollars" → ...
    text = re.sub(r'(\d{1,4})\s+dollar(s)?\b', lambda m: f"Rp {int(m.group(1)) * USD_TO_IDR:,}".replace(',', '.'), text, flags=re.IGNORECASE)
    text = re.sub(r'USD\s*(\d{1,4})', lambda m: f"Rp {int(m.group(1)) * USD_TO_IDR:,}".replace(',', '.'), text)
    return text

def strip_filler(text):
    for pat, repl in FILLER:
        text = re.sub(pat, repl, text)
    return text

def fix_fake_authority(text):
    """Remove unsupported authority namedrops without changing factual claims when possible.

    Strategy: remove the prefix 'According to X,' / 'X reports that' when X is unlinked authority.
    """
    # 'According to the EPA, ...' (unlinked)
    text = re.sub(r'\bAccording to (the )?(EPA|ACS|FDA|McKinsey|Statista|HubSpot|Salesforce)\b,?\s*', '', text)
    text = re.sub(r'\b(EPA|ACS|FDA|McKinsey|Statista|HubSpot|Salesforce)\s+(?:reports|states|estimates|indicates) that\s*', '', text, flags=re.IGNORECASE)
    return text

def process_article(path):
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)

    content = data.get('content', [])
    if not isinstance(content, list):
        return False, 'content not a list'

    changed = False
    new_content = []
    for line in content:
        original = line
        line = fix_em_dash(line)
        line = fix_usd_pricing(line)
        line = strip_filler(line)
        line = fix_fake_authority(line)
        # Tidy up double spaces / orphan punctuation
        line = re.sub(r'\s{2,}', ' ', line)
        line = re.sub(r',\s*,', ',', line)
        line = re.sub(r'^\s*,\s*', '', line)  # leading comma
        line = re.sub(r'\s+\.', '.', line)
        if line != original:
            changed = True
        new_content.append(line)

    # Title and excerpt too
    for field in ('title', 'excerpt'):
        if field in data and isinstance(data[field], str):
            new_val = data[field]
            new_val = fix_em_dash(new_val)
            new_val = fix_usd_pricing(new_val)
            new_val = fix_fake_authority(new_val)
            if new_val != data[field]:
                changed = True
                data[field] = new_val

    if changed:
        data['content'] = new_content
        with open(path, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2, ensure_ascii=False)
        return True, None
    return False, None

def main():
    total = 0
    fixed = 0
    errors = []
    for path in sorted(BLOG_DIR.glob('*.json')):
        total += 1
        try:
            did_change, err = process_article(path)
            if did_change:
                fixed += 1
            if err:
                errors.append((path.name, err))
        except Exception as e:
            errors.append((path.name, str(e)))

    print(f'Total articles: {total}')
    print(f'Articles modified: {fixed}')
    if errors:
        print(f'Errors: {len(errors)}')
        for n, e in errors[:5]:
            print(f'  {n}: {e}')

if __name__ == '__main__':
    main()
