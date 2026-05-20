#!/usr/bin/env python3
"""Audit all Sesoris blog articles vs /artikel-seo standard.

Scoring (max 100):
  - Content depth (word count + section depth): 25
  - Structure (H2 count + FAQ + TOC + answer-first): 20
  - Linking (internal + external): 15
  - Images (count + caption): 10
  - E-E-A-T (data + author + sources): 15
  - Originality markers (case study, opinion, contrarian): 10
  - Currency (no fabricated price ranges, IDR-only): 5

Threshold for "passing" /artikel-seo: 75+
"""
import json
import re
import os
import sys
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / 'content' / 'blog'

# Anti-pattern patterns (fabricated/AI smell)
FILLER_PHRASES = [
    'hal ini sangat penting',
    'tentunya hal ini',
    'seperti yang kita ketahui',
    'in summary',
    'in conclusion',
    'as we all know',
    'it is important to note',
    'it goes without saying',
]

# Indonesian PEUBI errors
PEUBI_ERRORS = ['mempengaruhi', 'merubah', 'diperbaharui', 'menterjemahkan', 'analisa ', 'resiko', 'praktek', 'sistim', 'aktifitas', 'kreatifitas']

# Fabricated US authority namedrops without link
FAKE_AUTHORITY = [
    r'\bEPA\b(?![^<]*</a>)',
    r'\bACS\b(?![^<]*</a>)',
    r'\bFDA\b(?![^<]*</a>)',
    r'\bMcKinsey\b(?![^<]*</a>)',
]

# USD pricing leak (should be IDR only)
USD_PATTERNS = [r'\$\d', r'USD\s*\d', r'\d+\s*dollar', r'\d+\s*USD']

# Em dash check
EM_DASH = '—'

def load_article(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        return None

def strip_md(text):
    """Strip markdown formatting for word count."""
    text = re.sub(r'!\[[^\]]*\]\([^\)]+\)', '', text)  # images
    text = re.sub(r'\[([^\]]+)\]\([^\)]+\)', r'\1', text)  # links
    text = re.sub(r'\*\*([^*]+)\*\*', r'\1', text)
    text = re.sub(r'_([^_]+)_', r'\1', text)
    text = re.sub(r'`([^`]+)`', r'\1', text)
    text = re.sub(r'<[^>]+>', '', text)
    return text

def audit(path):
    data = load_article(path)
    if not data:
        return {'slug': path.stem, 'error': 'cannot parse', 'score': 0}

    content = data.get('content', [])
    if isinstance(content, list):
        lines = content
        body = '\n'.join(content)
    else:
        body = content
        lines = body.split('\n')

    title = data.get('title', '')
    excerpt = data.get('excerpt', '')

    # Word count (body only, no HTML/MD)
    plain = strip_md(body)
    words = len(re.findall(r'\b\w+\b', plain))

    # Structure counts
    h2_lines = [l for l in lines if l.strip().startswith('## ')]
    h3_lines = [l for l in lines if l.strip().startswith('### ')]
    h2 = len(h2_lines)
    h3 = len(h3_lines)

    # Images (markdown ![...](...) format)
    imgs = len(re.findall(r'!\[[^\]]*\]\([^\)]+\)', body))

    # Internal links
    int_links = len(re.findall(r'\]\(/[^\)]+\)', body)) + len(re.findall(r'\]\(https?://(?:www\.)?sesoris\.com[^\)]+\)', body))

    # External (non-sesoris) links
    ext_links = len(re.findall(r'\]\(https?://(?!(?:www\.)?sesoris\.com)[^\)]+\)', body))

    # FAQ detection
    has_faq = bool(re.search(r'##.*\b(faq|frequently asked|pertanyaan)', body, re.IGNORECASE))
    faq_count = 0
    if has_faq:
        # count Q&A pairs in FAQ section
        faq_section_match = re.search(r'(##.*\b(?:faq|frequently asked|pertanyaan).*?)(?=\n## |\Z)', body, re.IGNORECASE | re.DOTALL)
        if faq_section_match:
            faq_text = faq_section_match.group(1)
            # count ### or **Q:** patterns
            faq_count = len(re.findall(r'^###\s', faq_text, re.MULTILINE)) + len(re.findall(r'\*\*Q[:.]\s', faq_text))

    # Answer-first: first non-image line contains keyword or **bold**
    answer_first = False
    for line in lines[:5]:
        if line.startswith('!') or line.startswith('#'):
            continue
        if '**' in line or len(line) > 80:
            answer_first = True
            break

    # USD leak
    usd_hits = sum(len(re.findall(p, body, re.IGNORECASE)) for p in USD_PATTERNS)

    # Em dash
    em_dash_count = body.count(EM_DASH)

    # IDR presence (positive)
    idr_count = len(re.findall(r'\bRp\s*[\d.]+', body))

    # Filler phrases
    filler_count = sum(body.lower().count(p) for p in FILLER_PHRASES)

    # Fake authority without link
    fake_authority = 0
    for pat in FAKE_AUTHORITY:
        fake_authority += len(re.findall(pat, body))

    # Read-also blocks (good signal)
    read_also = len(re.findall(r':::read-also', body))

    # E-E-A-T: tim sesoris byline check
    author_obj = data.get('author', {})
    author_name = author_obj.get('name', '') if isinstance(author_obj, dict) else str(author_obj)
    has_byline = bool(author_name)

    # Originality markers (1st person "we/our", case study mentions, opinion markers)
    we_count = len(re.findall(r'\b(we|our|us|kita|kami)\b', body, re.IGNORECASE))
    opinion_markers = len(re.findall(r'\b(in our experience|menurut kami|jujur saja|honestly|the truth is|surprisingly)\b', body, re.IGNORECASE))

    # ===== SCORING =====
    score = 0

    # Content depth (25 pts)
    if words >= 2000: score += 25
    elif words >= 1500: score += 20
    elif words >= 1000: score += 14
    elif words >= 700: score += 8
    else: score += 3

    # Structure (20 pts)
    structure_score = 0
    if h2 >= 8: structure_score += 8
    elif h2 >= 5: structure_score += 6
    elif h2 >= 3: structure_score += 3
    if has_faq and faq_count >= 5: structure_score += 6
    elif has_faq and faq_count >= 3: structure_score += 4
    elif has_faq: structure_score += 2
    if answer_first: structure_score += 3
    if h3 >= 3: structure_score += 3
    score += min(structure_score, 20)

    # Linking (15 pts)
    link_score = 0
    if int_links >= 8: link_score += 8
    elif int_links >= 5: link_score += 6
    elif int_links >= 3: link_score += 4
    elif int_links >= 1: link_score += 2
    if ext_links >= 3: link_score += 7
    elif ext_links >= 2: link_score += 5
    elif ext_links >= 1: link_score += 3
    score += min(link_score, 15)

    # Images (10 pts)
    img_score = 0
    if imgs >= 5: img_score += 8
    elif imgs >= 3: img_score += 6
    elif imgs >= 2: img_score += 4
    elif imgs >= 1: img_score += 2
    if read_also >= 1: img_score += 2
    score += min(img_score, 10)

    # E-E-A-T (15 pts)
    eat_score = 0
    if has_byline and author_name != 'Tim Sesoris': eat_score += 3
    elif has_byline: eat_score += 2
    if ext_links >= 2: eat_score += 4  # authority sources
    if idr_count >= 2: eat_score += 4  # specific data with currency
    elif idr_count >= 1: eat_score += 2
    if h2 >= 5 and words >= 1500: eat_score += 4  # signals real research
    score += min(eat_score, 15)

    # Originality (10 pts)
    orig_score = 0
    if opinion_markers >= 2: orig_score += 4
    elif opinion_markers >= 1: orig_score += 2
    if we_count >= 5: orig_score += 3
    elif we_count >= 2: orig_score += 2
    if filler_count == 0: orig_score += 3
    elif filler_count <= 2: orig_score += 1
    score += min(orig_score, 10)

    # Currency / fabrication (5 pts)
    curr_score = 5
    if usd_hits > 0: curr_score -= 3
    if fake_authority > 2: curr_score -= 1
    if em_dash_count > 0: curr_score -= 1
    score += max(curr_score, 0)

    # Cap at 100
    score = min(score, 100)

    return {
        'slug': data.get('slug', path.stem),
        'title': title,
        'date': data.get('date', ''),
        'words': words,
        'h2': h2,
        'h3': h3,
        'imgs': imgs,
        'int_links': int_links,
        'ext_links': ext_links,
        'has_faq': has_faq,
        'faq_count': faq_count,
        'answer_first': answer_first,
        'usd_hits': usd_hits,
        'em_dash': em_dash_count,
        'idr_count': idr_count,
        'filler_count': filler_count,
        'fake_authority': fake_authority,
        'we_count': we_count,
        'opinion_markers': opinion_markers,
        'author': author_name,
        'read_also': read_also,
        'score': score,
    }

def main():
    results = []
    for path in sorted(BLOG_DIR.glob('*.json')):
        r = audit(path)
        results.append(r)

    results.sort(key=lambda x: x.get('score', 0))

    # write CSV
    csv_path = BLOG_DIR.parent.parent / 'data' / 'audit_report.csv'
    csv_path.parent.mkdir(exist_ok=True)
    with open(csv_path, 'w', encoding='utf-8') as f:
        f.write('score,slug,words,h2,h3,imgs,int_links,ext_links,faq_count,usd_hits,em_dash,idr_count,filler_count,fake_authority,opinion_markers,author\n')
        for r in results:
            if 'error' in r:
                continue
            f.write(f"{r['score']},{r['slug']},{r['words']},{r['h2']},{r['h3']},{r['imgs']},{r['int_links']},{r['ext_links']},{r['faq_count']},{r['usd_hits']},{r['em_dash']},{r['idr_count']},{r['filler_count']},{r['fake_authority']},{r['opinion_markers']},\"{r['author']}\"\n")

    # summary
    total = len([r for r in results if 'error' not in r])
    scores = [r['score'] for r in results if 'error' not in r]
    avg = sum(scores) / len(scores) if scores else 0

    buckets = {
        '0-39 (Critical)': sum(1 for s in scores if s < 40),
        '40-59 (Poor)': sum(1 for s in scores if 40 <= s < 60),
        '60-74 (Below Standard)': sum(1 for s in scores if 60 <= s < 75),
        '75-89 (Passing)': sum(1 for s in scores if 75 <= s < 90),
        '90-100 (Excellent)': sum(1 for s in scores if s >= 90),
    }

    print(f'Total articles: {total}')
    print(f'Average score: {avg:.1f}/100')
    print('Distribution:')
    for k, v in buckets.items():
        pct = (v/total*100) if total else 0
        print(f'  {k}: {v} ({pct:.1f}%)')

    print(f'\nBottom 10 articles (priority for uplift):')
    for r in results[:10]:
        if 'error' in r:
            continue
        print(f"  {r['score']:3d}  w={r['words']:4d} h2={r['h2']:2d} img={r['imgs']} extL={r['ext_links']} USD={r['usd_hits']} | {r['slug'][:70]}")

    # Issues by type
    print(f'\nIssue counts (across all articles):')
    print(f'  Articles with USD leak: {sum(1 for r in results if r.get("usd_hits",0) > 0)}')
    print(f'  Articles with em-dash: {sum(1 for r in results if r.get("em_dash",0) > 0)}')
    print(f'  Articles <1500 words: {sum(1 for r in results if r.get("words",0) < 1500)}')
    print(f'  Articles <2000 words: {sum(1 for r in results if r.get("words",0) < 2000)}')
    print(f'  Articles with 0 external links: {sum(1 for r in results if r.get("ext_links",0) == 0)}')
    print(f'  Articles with <5 H2: {sum(1 for r in results if r.get("h2",0) < 5)}')
    print(f'  Articles with no FAQ: {sum(1 for r in results if not r.get("has_faq"))}')
    print(f'  Articles with <3 images: {sum(1 for r in results if r.get("imgs",0) < 3)}')
    print(f'  Articles with filler phrases: {sum(1 for r in results if r.get("filler_count",0) > 0)}')
    print(f'  Articles with fake authority: {sum(1 for r in results if r.get("fake_authority",0) > 2)}')
    print(f'  Articles with no IDR pricing: {sum(1 for r in results if r.get("idr_count",0) == 0)}')

    print(f'\nReport written: {csv_path}')

    return results

if __name__ == '__main__':
    main()
