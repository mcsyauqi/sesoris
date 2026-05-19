"""
Bulk-fix script for Sesoris fabricated content audit (2026-05-19).

Removes fake US source citations, fake hyperlinks, USD pricing,
"$1,500/year savings" claims, and fixes author personas.

Anti-pattern lesson: AI-generated SEO content templates injected
US blog citations (The Spruce, Good Housekeeping, Real Simple, Better Homes)
into Indonesian e-commerce articles. These citations were fabricated.
Pricing in USD on IDR site = wrong currency for target audience.
Author bylines were rotated from fixed fake persona pool.
"""
import json
import re
import sys
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "content" / "blog"

# Stats trackers
stats = {
    "pass1_files_modified": set(),
    "pass1_sentences_stripped": 0,
    "pass2_files_modified": set(),
    "pass2_usd_converted": 0,
    "pass3_files_modified": set(),
    "pass3_savings_removed": 0,
    "pass4_files_modified": set(),
}

# Pass 1 regex patterns
# Pattern: "According to [Source...](url), <rest of sentence>." - strip the attribution
# Strategy: replace "According to [X...](url), " with "" (preserve rest of sentence, capitalize first letter)
# Sources are fabricated US blogs/magazines: The Spruce, Good Housekeeping, Real Simple,
# Better Homes, Architectural Digest, plus possessive/descriptor variants.
US_SOURCE_KEYWORDS = r"(?:The\s+Spruce|Good\s+Housekeeping|Real\s+Simple|Better\s+Homes(?:\s*&\s*Gardens)?|Architectural\s+Digest)"

# Bracket content like [The Spruce], [The Spruce's kitchen guide],
# [Good Housekeeping research], [food safety experts at Good Housekeeping],
# [Real Simple's product testing], [Architectural Digest's 2026 report]
US_BRACKET_CONTENT = rf"\[[^\]]*{US_SOURCE_KEYWORDS}[^\]]*\]"

# Optional URL part: most fake citations have (https://...) but some are bare [source]
US_LINK = rf"{US_BRACKET_CONTENT}(?:\(https?://[^\)]+\))?"

# Patterns to remove fake citations - we strip attribution but keep the claim,
# capitalizing the next letter properly.
ACCORDING_TO_PATTERN = re.compile(
    rf"According to {US_LINK},\s*(.)",
    re.IGNORECASE,
)

# "Research from [Source](url) shows that..." -> "Research shows that..."
RESEARCH_FROM_PATTERN = re.compile(
    rf"Research (?:from|by|conducted by) {US_LINK}\s*(shows|indicates|reveals|found|demonstrates|suggests)\s*(that)?",
    re.IGNORECASE,
)

# "A study by [Source](url) found..."
STUDY_BY_PATTERN = re.compile(
    rf"(?:A study by|Studies (?:from|by)|Data from|According to a study (?:by|from)) {US_LINK},?\s*",
    re.IGNORECASE,
)

# "as reported by/featured in/published by [Source](url)"
REPORTED_BY_PATTERN = re.compile(
    rf"(?:as reported (?:by|in)|as featured in|as published (?:by|in)|reported (?:by|in)) {US_LINK}",
    re.IGNORECASE,
)

# Standalone fake link references like "[Source](url) reports..." / "[Source] notes..."
SOURCE_REPORTS_PATTERN = re.compile(
    rf"{US_LINK}\s+(reports?|notes?|recommends?|states?|found|highlights?|emphasizes?|suggests?|recommends?|advises?)\s+",
    re.IGNORECASE,
)

# Generic bare hyperlinks to fake sources -> "industry experts"
BARE_LINK_PATTERN = re.compile(US_LINK)

# Catch generic-text brackets that link to fake US domains
# e.g. "[professional organizers](https://www.thespruce.com)" -> "professional organizers" (drop link)
FAKE_DOMAIN_LINK_PATTERN = re.compile(
    r"\[([^\]]+)\]\(https?://(?:www\.)?(?:thespruce|goodhousekeeping|realsimple|bhg|architecturaldigest)\.com[^\)]*\)",
    re.IGNORECASE,
)

# "According to <fake-link>, ..." where the bracket text didn't include the keyword
# but link domain is a fake source
ACCORDING_FAKE_DOMAIN_PATTERN = re.compile(
    r"According to \[[^\]]+\]\(https?://(?:www\.)?(?:thespruce|goodhousekeeping|realsimple|bhg|architecturaldigest)\.com[^\)]*\),\s*(.)",
    re.IGNORECASE,
)

# Pass 2: USD pricing patterns
# $X.99, $X.XX, $X-Y, $X-$Y, $X,XXX patterns
USD_RANGE_PATTERN = re.compile(r"\$(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\s*[-–]\s*\$?(\d{1,3}(?:,\d{3})*(?:\.\d+)?)")
USD_PRICE_PATTERN = re.compile(r"\$(\d{1,3}(?:,\d{3})*(?:\.\d+)?)\+?")

# Pass 3: $1,500 savings claim variations (REMOVE these whole phrases)
# Note: $1,500 is also matched in budget tables/ranges; those are NOT savings claims
# and we leave them for Pass 2 (USD->IDR conversion). Pass 3 targets specific
# fabricated savings phrasing only.
SAVINGS_PATTERNS = [
    # Bullet: ", saving average households $1,500+ annually" — trailing fragment after "Reduces food waste"
    re.compile(r",\s*saving\s+(?:the\s+)?average\s+(?:family|families|households)\s+\$1,500\+?\s*(?:annually|per year|a year)?", re.IGNORECASE),
    # Bullet: "Reduced food waste saves average families $1,500+ annually"
    re.compile(r"\s+saves?\s+(?:the\s+)?average\s+(?:family|families|households)\s+\$1,500\+?\s*(?:annually|per year|a year)?", re.IGNORECASE),
    # "The average American family throws away $1,500 worth of food annually."
    re.compile(r"(?:The\s+)?average\s+American\s+family\s+throws?\s+away\s+\$1,500\s+worth\s+of\s+food\s+annually\.\s*", re.IGNORECASE),
    # "Based on USDA data, the average family discards $1,500 worth of food annually."
    re.compile(r"Based\s+on\s+USDA\s+data,\s+the\s+average\s+family\s+discards?\s+\$1,500\s+worth\s+of\s+food\s+annually\.\s*", re.IGNORECASE),
    # "save families an average of $1,500 annually in reduced food waste..."
    re.compile(r"\s+save\s+families\s+an\s+average\s+of\s+\$1,500\s+annually[^.]*\.", re.IGNORECASE),
    # "saving the average family $1,500 annually" - mid-sentence
    re.compile(r",?\s*saving\s+(?:the\s+)?average\s+(?:family|households|families)\s+\$1,500\s*(?:annually|per year|a year)?", re.IGNORECASE),
    # Bullet "**Cost savings**: Reduces food waste, saving..." catch-all
    re.compile(r",?\s*saving\s+\$1,500\+?\s*(?:annually|per year|a year)?", re.IGNORECASE),
]


def usd_to_idr(usd_str):
    """Convert USD value to IDR (Rp), rounded to nearest thousand."""
    val = float(usd_str.replace(",", ""))
    idr = int(round(val * 16000 / 1000) * 1000)
    # Format with thousand separator
    return f"Rp {idr:,}".replace(",", ".")


def convert_usd_in_text(text):
    """Convert all USD prices in text to IDR equivalents."""
    converted_count = [0]

    def replace_range(m):
        converted_count[0] += 2
        low = usd_to_idr(m.group(1))
        high = usd_to_idr(m.group(2))
        return f"{low} - {high}"

    def replace_single(m):
        converted_count[0] += 1
        return usd_to_idr(m.group(1))

    # Range first to avoid conflicts
    text = USD_RANGE_PATTERN.sub(replace_range, text)
    text = USD_PRICE_PATTERN.sub(replace_single, text)
    return text, converted_count[0]


def fix_pass1(text, filename):
    """Pass 1: Strip fake US source citations + hyperlinks."""
    original = text
    count = 0

    def cap_next(m):
        nonlocal count
        count += 1
        rest = m.group(1)
        if rest and rest.isalpha():
            rest = rest.upper()
        return rest

    text = ACCORDING_TO_PATTERN.sub(cap_next, text)

    def repl_research(m):
        nonlocal count
        count += 1
        verb = m.group(1) if m.group(1) else "shows"
        that = " that" if m.group(2) else ""
        return f"Research {verb}{that}"

    text = RESEARCH_FROM_PATTERN.sub(repl_research, text)

    def repl_study(m):
        nonlocal count
        count += 1
        return ""

    text = STUDY_BY_PATTERN.sub(repl_study, text)

    def repl_reported(m):
        nonlocal count
        count += 1
        return "as documented by industry experts"

    text = REPORTED_BY_PATTERN.sub(repl_reported, text)

    def repl_reports(m):
        nonlocal count
        count += 1
        verb = m.group(1)
        return f"Industry experts {verb} "

    text = SOURCE_REPORTS_PATTERN.sub(repl_reports, text)

    # "According to [generic text](fake-domain.com)," -> capitalize next word
    text = ACCORDING_FAKE_DOMAIN_PATTERN.sub(cap_next, text)

    # Generic-text bracket linking to fake domain -> keep text, drop link
    def repl_fake_domain(m):
        nonlocal count
        count += 1
        return m.group(1)

    text = FAKE_DOMAIN_LINK_PATTERN.sub(repl_fake_domain, text)

    # Any remaining bare fake-source links -> "industry experts"
    def repl_bare(m):
        nonlocal count
        count += 1
        return "industry experts"

    text = BARE_LINK_PATTERN.sub(repl_bare, text)

    # Cleanup: double spaces, leading whitespace, capitalize sentence start
    text = re.sub(r"\s{2,}", " ", text)
    text = re.sub(r"^\s+", "", text)
    # Fix awkward "Industry experts" at sentence start after our substitution
    text = re.sub(r"(^|\. )industry experts ", lambda m: m.group(1) + "Industry experts ", text)
    # Subject-verb agreement fix: "Industry experts recommends" -> "Industry experts recommend"
    text = re.sub(r"(I|i)ndustry experts (recommends|notes|reports|states|suggests|advises|emphasizes|highlights)\b",
                  lambda m: f"{m.group(1)}ndustry experts {m.group(2)[:-1]}", text)

    if text != original:
        stats["pass1_files_modified"].add(filename)
        stats["pass1_sentences_stripped"] += count
    return text


def fix_pass2(text, filename):
    """Pass 2: Convert USD pricing to IDR."""
    original = text
    text, n = convert_usd_in_text(text)
    if text != original:
        stats["pass2_files_modified"].add(filename)
        stats["pass2_usd_converted"] += n
    return text


def fix_pass3(text, filename):
    """Pass 3: Remove $1,500 savings claims."""
    original = text
    count = 0
    for pat in SAVINGS_PATTERNS:
        new_text, n = pat.subn("", text)
        if n > 0:
            count += n
            text = new_text
    # Cleanup leftover ", annually" or ", per year" fragments
    text = re.sub(r",\s*annually\b", "", text)
    text = re.sub(r"\s+,", ",", text)
    text = re.sub(r"\s+\.", ".", text)
    # Remove leftover bullet line that becomes empty/stub
    text = re.sub(r"\*\*Cost savings\*\*:\s*Reduces?\s+food\s+waste\s*\.?", "**Cost savings**: Reduces food waste significantly", text)
    text = re.sub(r"\*\*Cost savings\*\*:\s*Reduced?\s+food\s+waste\s*\.?", "**Cost savings**: Reduces food waste significantly", text)
    if text != original:
        stats["pass3_files_modified"].add(filename)
        stats["pass3_savings_removed"] += count
    return text


def fix_pass4_author(article, filename):
    """Pass 4: Replace fabricated author personas with 'Tim Sesoris'."""
    if "author" not in article:
        return article
    fabricated = {
        "Ayu Lestari", "Hendra Kusuma", "Rina Wijaya", "Budi Santoso",
        "Dian Pratama", "Sari Dewi", "Rizki Pratama", "Dina Maharani",
        "Sarah Putri",
    }
    author = article["author"]
    if isinstance(author, dict) and author.get("name") in fabricated:
        article["author"] = {
            "name": "Tim Sesoris",
            "avatar": "TS",
            "role": "Editorial Team"
        }
        stats["pass4_files_modified"].add(filename)
    return article


def process_file(filepath):
    """Process a single JSON file through all passes."""
    with open(filepath, "r", encoding="utf-8") as f:
        article = json.load(f)

    filename = filepath.name

    # Process content array (list of strings)
    # Pass order matters: 1 (strip citations) -> 3 (remove $1500 savings claims, includes $) -> 2 (USD->IDR)
    if "content" in article and isinstance(article["content"], list):
        new_content = []
        for paragraph in article["content"]:
            if isinstance(paragraph, str):
                p = fix_pass1(paragraph, filename)
                p = fix_pass3(p, filename)
                p = fix_pass2(p, filename)
                new_content.append(p)
            else:
                new_content.append(paragraph)
        article["content"] = new_content

    # Also process excerpt and title (less common but possible)
    for field in ["excerpt", "title", "description"]:
        if field in article and isinstance(article[field], str):
            v = fix_pass1(article[field], filename)
            v = fix_pass3(v, filename)
            v = fix_pass2(v, filename)
            article[field] = v

    # Pass 4: author
    article = fix_pass4_author(article, filename)

    # Write back
    with open(filepath, "w", encoding="utf-8") as f:
        json.dump(article, f, ensure_ascii=False, indent=2)


def main():
    files = sorted(BLOG_DIR.glob("*.json"))
    print(f"Processing {len(files)} files...")
    for fp in files:
        try:
            process_file(fp)
        except Exception as e:
            print(f"ERROR {fp.name}: {e}")
    print("\n=== STATS ===")
    print(f"Pass 1 (fake citations): {len(stats['pass1_files_modified'])} files, {stats['pass1_sentences_stripped']} citations stripped")
    print(f"Pass 2 (USD->IDR): {len(stats['pass2_files_modified'])} files, {stats['pass2_usd_converted']} prices converted")
    print(f"Pass 3 ($1500 claims): {len(stats['pass3_files_modified'])} files, {stats['pass3_savings_removed']} claims removed")
    print(f"Pass 4 (author personas): {len(stats['pass4_files_modified'])} files updated to 'Tim Sesoris'")


if __name__ == "__main__":
    main()
