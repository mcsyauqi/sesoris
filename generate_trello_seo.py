#!/usr/bin/env python3
"""
Trello SEO Import Generator - Sesoris
======================================
Generate comprehensive 3-month SEO plan CSV for Trello import.
Keywords researched via DataForSEO API.

Run: python generate_trello_seo.py
Output: trello_seo_sesoris.csv
"""

import csv
from datetime import datetime, timedelta
from typing import List, Dict, Tuple

# =============================================================================
# CLIENT CONFIG
# =============================================================================

CLIENT = {
    'NAMA_CLIENT': 'Sesoris',
    'WEBSITE': 'https://www.sesoris.com',
    'TAGLINE': 'Hidup Lebih Teratur',
    'TIPE_BISNIS': 'E-commerce Home Organization & Lifestyle Products',
    'LOKASI': 'Yogyakarta, Indonesia',
    'LAYANAN': 'Home Organizer, Kitchen Storage, Bags & Pouches, Tools & Gadgets, Office Desk Organizer, Outdoor Travel Gear',
    'TRACK_RECORD': 'Produk berkualitas premium untuk rumah modern Indonesia',
    'KEUNGGULAN': 'Desain minimalis, material premium, solusi organisasi rumah all-in-one',
    'WHATSAPP': '',
    'EMAIL': '',
}

PROJECT = {
    'START_DATE': '2026-03-09',
    'END_DATE': '2026-06-07',
    'DURATION_MONTHS': 3,
    'ARTICLES_PER_DAY': 1,
    'PAID_BACKLINK_DAYS': [1, 4],  # Tue, Fri
    'FREE_BACKLINK_DAY': 2,        # Wed
    'GBP_POST_DAY': 0,             # Mon
    'GBP_POSTS_PER_WEEK': 1,
    'WEEKLY_MONITORING_DAY': 4,    # Fri
    'MONTHLY_FEE': 'Internal Project',
    'PAYMENT_DATE': 7,
    'PAYMENT_PLATFORM': 'Internal',
    'TARGET_TRAFFIC': '500-1000/bulan',
    'TARGET_DR': '5-10',
    'TARGET_404': '0',
    'CURRENT_TRAFFIC': 0,
    'CURRENT_DR': 0,
    'CURRENT_404': 0,
}

AUDIT = {
    '404_PAGES': 0,
    'BROKEN_LINKS': 0,
    'PAGES_NO_META': 0,
    'PAGES_NO_TITLE': 0,
    'PAGES_H1_ISSUES': 0,
    'IMAGES_NO_ALT': 0,
    'PAGES_SPEED_ISSUES': 0,
    'PAGES_INTERNAL_LINK': 0,
    'PAGES_NO_OG': 0,
    'SITE_HEALTH': 0,
}

# =============================================================================
# KEYWORDS (from DataForSEO API research - March 2026)
# =============================================================================

# Format: (keyword, search_volume, keyword_difficulty)
# Filtered: KD <= 35, Volume >= 50, relevant to home organization niche
KEYWORDS = [
    # ===== STORAGE & ORGANIZATION (Core Products) =====
    ('storage box', 6600, 0),
    ('rak penyimpanan barang', 880, 0),
    ('box storage', 720, 0),
    ('rak penyimpanan', 590, 0),
    ('storage box plastik', 480, 0),
    ('rak penyimpanan makanan', 390, 0),
    ('rak penyimpanan barang dapur', 210, 0),
    ('rak penyimpanan barang di gudang', 210, 0),
    ('rak penyimpanan barang tertutup', 210, 0),
    ('storage box mini', 210, 0),
    ('storage box lipat', 170, 0),
    ('rak penyimpanan serbaguna', 140, 0),
    ('storage box organizer', 140, 0),
    ('collapsible storage box', 140, 0),
    ('foldable storage box', 140, 0),
    ('plastic storage box', 140, 4),
    ('container storage box', 140, 0),
    ('harga storage box', 110, 4),
    ('diy storage box', 110, 0),
    ('storage box baju', 110, 0),
    ('kotak penyimpanan', 720, 0),
    ('kotak penyimpanan barang', 720, 0),
    ('kotak kayu penyimpanan', 320, 1),

    # ===== KITCHEN ORGANIZATION =====
    ('kitchen set minimalis', 18100, 0),
    ('kitchen set minimalis dapur kecil', 4400, 0),
    ('model kitchen set minimalis', 2900, 0),
    ('wadah makanan', 2400, 0),
    ('kitchen set modern minimalis', 1600, 0),
    ('wadah makanan plastik', 1600, 0),
    ('model kitchen set minimalis terbaru', 1300, 0),
    ('gambar kitchen set minimalis', 1000, 0),
    ('desk organizer', 880, 0),
    ('desain kitchen set minimalis', 880, 0),
    ('kitchen set minimalis dapur kecil murah', 880, 0),
    ('contoh kitchen set minimalis', 880, 0),
    ('dekorasi dapur minimalis', 880, 0),
    ('harga kitchen set minimalis dapur kecil', 720, 0),
    ('wadah makanan untuk jualan', 480, 0),
    ('dekorasi dapur', 480, 0),
    ('rak dapur', 2900, 0),
    ('rak dapur minimalis', 1600, 0),
    ('rak dapur sederhana', 590, 0),
    ('rak dapur aluminium', 480, 0),
    ('rak bumbu dapur', 390, 0),
    ('rak piring dapur', 320, 0),
    ('rak gantung dapur', 260, 0),
    ('rak dinding dapur', 210, 0),
    ('rak dapur besi', 170, 0),
    ('wadah makanan stainless', 390, 0),

    # ===== HOME DECOR & INTERIOR =====
    ('rumah minimalis', 90500, 5),
    ('desain rumah minimalis', 49500, 0),
    ('rumah minimalis modern', 40500, 0),
    ('rumah minimalis sederhana', 33100, 5),
    ('model rumah minimalis terbaru', 27100, 0),
    ('teras rumah minimalis', 22200, 0),
    ('warna cat rumah minimalis', 14800, 0),
    ('cat rumah minimalis', 12100, 0),
    ('desain rumah minimalis 3 kamar', 9900, 0),
    ('denah rumah minimalis', 9900, 4),
    ('desain rumah minimalis 2 lantai', 9900, 0),
    ('interior rumah', 6600, 0),
    ('desain dapur minimalis', 8100, 0),
    ('desain dapur minimalis 2x2', 6600, 0),
    ('desain rumah minimalis elegan', 6600, 0),
    ('taman depan rumah minimalis lahan sempit', 5400, 0),

    # ===== SUSTAINABLE LIVING =====
    ('sustainable living tips', 880, 19),
    ('tips sustainable living', 880, 28),
    ('living sustainable life', 480, 5),
    ('sustainable living', 390, 1),

    # ===== TRAVEL & BAGS =====
    ('travel bag organizer', 480, 0),
    ('organizer travel bag', 480, 0),
    ('travel organizer bag', 480, 0),
    ('organizer makeup', 480, 0),
    ('tas organizer', 260, 0),

    # ===== MISC HOME =====
    ('tempat penyimpanan baju', 590, 0),
    ('tempat penyimpanan asi', 480, 0),
    ('tempat penyimpanan makanan', 320, 0),
    ('tempat penyimpanan sepatu', 260, 0),
    ('tempat penyimpanan obat', 210, 0),
    ('keranjang penyimpanan', 260, 0),
]

# =============================================================================
# EXISTING PAGES TO UPGRADE
# =============================================================================

EXISTING_PAGES = [
    {'name': 'Homepage', 'url': '/', 'issues': 'Perlu content expansion, keyword optimization'},
    {'name': 'About Us', 'url': '/about', 'issues': 'Perlu LocalBusiness schema, expand brand story'},
    {'name': 'Shop', 'url': '/shop', 'issues': 'Perlu category descriptions, filter optimization'},
    {'name': 'Category: Home Living', 'url': '/category/home-living', 'issues': 'Thin content, perlu deskripsi panjang'},
    {'name': 'Category: Kitchen Dining', 'url': '/category/kitchen-dining', 'issues': 'Thin content, perlu deskripsi panjang'},
    {'name': 'Category: Tools Gadgets', 'url': '/category/tools-gadgets', 'issues': 'Thin content, perlu deskripsi panjang'},
    {'name': 'Category: Bags Pouches', 'url': '/category/bags-pouches', 'issues': 'Thin content, perlu deskripsi panjang'},
    {'name': 'Category: Office Desk', 'url': '/category/office-desk', 'issues': 'Thin content, perlu deskripsi panjang'},
    {'name': 'Category: Outdoor Travel', 'url': '/category/outdoor-travel', 'issues': 'Thin content, perlu deskripsi panjang'},
    {'name': 'Blog Index', 'url': '/blog', 'issues': 'Perlu categorization, search, pagination'},
    {'name': 'FAQ Page', 'url': '/faq', 'issues': 'Perlu FAQPage schema markup'},
    {'name': 'Contact Page', 'url': '/contact', 'issues': 'Perlu LocalBusiness schema'},
]

# =============================================================================
# HOLIDAYS & UTILITIES
# =============================================================================

HOLIDAYS_2026 = [
    datetime(2026, 1, 1),   datetime(2026, 1, 16),
    datetime(2026, 2, 17),  datetime(2026, 3, 19),
    datetime(2026, 3, 21),  datetime(2026, 3, 22),
    datetime(2026, 4, 3),   datetime(2026, 4, 5),
    datetime(2026, 5, 1),   datetime(2026, 5, 14),
    datetime(2026, 5, 27),  datetime(2026, 5, 31),
    datetime(2026, 6, 1),   datetime(2026, 6, 16),
    datetime(2026, 8, 17),  datetime(2026, 12, 25),
]

def is_holiday(date):
    return date.date() in [h.date() for h in HOLIDAYS_2026]

def is_working_day(date):
    return date.weekday() != 6 and not is_holiday(date)

def get_next_working_day(date):
    while not is_working_day(date):
        date += timedelta(days=1)
    return date

def get_working_days(start, count):
    dates, current = [], start
    while len(dates) < count:
        if is_working_day(current):
            dates.append(current)
        current += timedelta(days=1)
    return dates

def get_specific_weekdays(start, end, weekdays):
    dates, current = [], start
    while current <= end:
        if current.weekday() in weekdays and not is_holiday(current):
            dates.append(current)
        current += timedelta(days=1)
    return dates

def fmt(dt): return dt.strftime('%Y-%m-%d')

def fmt_indo(dt):
    months = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
    days = ['Senin','Selasa','Rabu','Kamis','Jumat','Sabtu','Minggu']
    return f"{dt.day} {months[dt.month-1]} {dt.year} ({days[dt.weekday()]})"

# =============================================================================
# TRANSACTIONAL DETECTION
# =============================================================================

TRANS_SIGNALS = ['jasa','sewa','harga','biaya','tarif','beli','order','murah','jual','toko','beli']

def detect_intent(kw):
    k = kw.lower()
    is_trans = any(s in k for s in TRANS_SIGNALS)
    if is_trans:
        return ('Transactional', 'Fokus: harga, proses order, CTA kuat', True)
    elif any(x in k for x in ['cara','tips','langkah','panduan','tutorial']):
        return ('Informational', 'Fokus: step-by-step, tips praktis', False)
    elif any(x in k for x in ['terbaik','rekomendasi','review','top','pilihan']):
        return ('Commercial', 'Fokus: perbandingan, pros-cons', False)
    elif any(x in k for x in ['desain','model','gambar','contoh','inspirasi','ide']):
        return ('Inspirational', 'Fokus: visual, gallery, inspirasi', False)
    else:
        return ('Informational', 'Fokus: konten informatif, comprehensive', False)

def calc_score(kw, vol, kd):
    is_trans = any(s in kw.lower() for s in TRANS_SIGNALS)
    return (1000 if is_trans else 0) + min(vol/10, 500) - (kd * 3)

# =============================================================================
# ANCHOR TEXTS
# =============================================================================

ANCHOR_TEXTS = [
    ('Sesoris', 'https://www.sesoris.com'),
    ('sesoris.com', 'https://www.sesoris.com'),
    ('toko organizer online', 'https://www.sesoris.com/shop'),
    ('jual organizer rumah', 'https://www.sesoris.com/shop'),
    ('produk home organization', 'https://www.sesoris.com/shop'),
    ('organizer dapur berkualitas', 'https://www.sesoris.com/category/kitchen-dining'),
    ('storage solution terbaik', 'https://www.sesoris.com/shop'),
    ('kunjungi Sesoris', 'https://www.sesoris.com'),
    ('lihat koleksi', 'https://www.sesoris.com/shop'),
    ('baca selengkapnya', 'https://www.sesoris.com/blog'),
    ('tips rumah rapi', 'https://www.sesoris.com/blog'),
    ('organizer travel premium', 'https://www.sesoris.com/category/outdoor-travel'),
]

# =============================================================================
# BACKLINK DATABASES
# =============================================================================

PAID_BACKLINKS = [
    {'domain': 'Gelora.co', 'dr': 34, 'traffic': '479K', 'kategori': 'Media', 'harga': 'Rp 345.000'},
    {'domain': 'Roonby.com', 'dr': 37, 'traffic': '450K', 'kategori': 'Teknologi', 'harga': 'Rp 400.000'},
    {'domain': 'Sepenuhnya.com', 'dr': 38, 'traffic': '107K', 'kategori': 'Bisnis', 'harga': 'Rp 100.000'},
    {'domain': 'Carisaham.com', 'dr': 53, 'traffic': '102K', 'kategori': 'Bisnis', 'harga': 'Rp 350.000'},
    {'domain': 'Mahasiswaindonesia.id', 'dr': 58, 'traffic': '73K', 'kategori': 'Media', 'harga': 'Rp 250.000'},
    {'domain': 'Ruangojol.com', 'dr': 55, 'traffic': '49K', 'kategori': 'Bisnis', 'harga': 'Rp 200.000'},
    {'domain': 'Evotekno.com', 'dr': 20, 'traffic': '34K', 'kategori': 'Teknologi', 'harga': 'Rp 90.000'},
    {'domain': 'Kangamir.com', 'dr': 18, 'traffic': '32K', 'kategori': 'Bisnis', 'harga': 'Rp 75.000'},
    {'domain': 'Nexzine.id', 'dr': 17, 'traffic': '34K', 'kategori': 'Media', 'harga': 'Rp 50.000'},
    {'domain': 'An-nur.ac.id', 'dr': 34, 'traffic': '87K', 'kategori': 'Edukasi', 'harga': 'Rp 150.000'},
    {'domain': 'Wislah.com', 'dr': 16, 'traffic': '90K', 'kategori': 'Bisnis', 'harga': 'Rp 350.000'},
    {'domain': 'Infojatengpos.com', 'dr': 11, 'traffic': '99K', 'kategori': 'Media Lokal', 'harga': 'Rp 125.000'},
    {'domain': 'Suaraislam.id', 'dr': 27, 'traffic': '122K', 'kategori': 'Media', 'harga': 'Rp 144.500'},
    {'domain': 'Kabarbaru.co', 'dr': 38, 'traffic': '62K', 'kategori': 'Media', 'harga': 'Rp 50.000'},
    {'domain': 'Democrazy.id', 'dr': 28, 'traffic': '56K', 'kategori': 'Media', 'harga': 'Rp 50.000'},
]

FREE_BACKLINKS = [
    {'platform': 'Kumparan', 'url': 'kumparan.com', 'da': 73, 'traffic': '36.7M', 'akses': 'Contributor Program'},
    {'platform': 'Kompasiana', 'url': 'kompasiana.com', 'da': 83, 'traffic': '8.5M', 'akses': 'Open registration'},
    {'platform': 'IDN Times Community', 'url': 'idntimes.com', 'da': 82, 'traffic': '28.5M', 'akses': 'Community Program'},
    {'platform': 'Indonesiana (Tempo)', 'url': 'indonesiana.id', 'da': 31, 'traffic': '52K', 'akses': 'Open registration'},
    {'platform': 'LinkedIn Articles', 'url': 'linkedin.com', 'da': 99, 'traffic': 'Global', 'akses': 'Direct publish'},
    {'platform': 'Medium Indonesia', 'url': 'medium.com', 'da': 96, 'traffic': 'Global', 'akses': 'Direct publish'},
    {'platform': 'Good News Indonesia', 'url': 'goodnewsfromindonesia.id', 'da': 70, 'traffic': '2M', 'akses': 'Open registration'},
    {'platform': 'Retizen Republika', 'url': 'republika.co.id/retizen', 'da': 86, 'traffic': '15M', 'akses': 'Open registration'},
]

BACKLINK_TOPICS = [
    ('Tren Home Organization 2026', 'home organization, tren rumah, organizer, penyimpanan'),
    ('Tips Menata Rumah Minimalis', 'rumah minimalis, tips menata, organisasi rumah'),
    ('Solusi Penyimpanan Dapur Kecil', 'dapur kecil, penyimpanan dapur, kitchen organizer'),
    ('Sustainable Living di Indonesia', 'sustainable living, ramah lingkungan, eco-friendly'),
    ('Panduan Memilih Storage Box', 'storage box, kotak penyimpanan, kontainer'),
    ('Dekorasi Rumah Modern Budget', 'dekorasi rumah, home decor, budget friendly'),
    ('Produktivitas dengan Desk Organization', 'desk organizer, meja kerja rapi, produktivitas'),
    ('Travel Packing Tips & Organizer', 'travel organizer, packing tips, tas organizer'),
]

GBP_TOPICS = [
    ('Produk Baru & Promo', 'Highlight produk baru atau promo spesial Sesoris'),
    ('Tips Organisasi Rumah', 'Tips menata rumah dengan produk Sesoris'),
    ('Customer Review Spotlight', 'Showcase review positif dari pelanggan'),
    ('Behind the Scenes', 'Proses kurasi produk dan quality control Sesoris'),
]

# =============================================================================
# CARD GENERATORS
# =============================================================================

def card_brief(start_date):
    return {
        'Card Name': f'📋 Project Brief - Sesoris SEO Campaign (3 Bulan)',
        'Card Description': f'''⏱️ DURASI REVIEW: 30 menit

📋 PROJECT BRIEF - SESORIS SEO CAMPAIGN

🎯 OBJECTIVE
Meningkatkan organic traffic dan visibility website {CLIENT['WEBSITE']} melalui strategi SEO komprehensif selama 3 bulan.

📊 KONDISI SAAT INI
• Domain Rating: {PROJECT['CURRENT_DR']}
• Organic Traffic: {PROJECT['CURRENT_TRAFFIC']}/bulan
• Website: Next.js 16 (sudah live)
• Blog: 6 artikel existing
• GA4: Sudah terinstall (G-V2Y9KVBKFP)
• Sitemap & Robots.txt: Sudah ada
• JSON-LD: Organization & WebSite schema sudah ada

📈 TARGET KPI (3 Bulan)
• Organic Traffic: 0 → {PROJECT['TARGET_TRAFFIC']}
• Domain Rating: 0 → {PROJECT['TARGET_DR']}
• Indexed Pages: 30+ halaman
• Blog Posts: 75+ artikel baru
• Backlinks: 30+ dari berbagai domain

📅 TIMELINE
• Start: {fmt_indo(start_date)}
• End: {fmt_indo(parse_date(PROJECT['END_DATE']))}
• Duration: 3 bulan

📈 PRODUCTION RATE
• Artikel: 1/hari (Senin-Sabtu)
• Paid Backlink: 2x/minggu (Selasa & Jumat)
• Free Backlink: 1x/minggu (Rabu)
• GBP Post: 1x/minggu (Senin)
• Monitoring: Weekly (Jumat) + Monthly

🏢 TENTANG SESORIS
{CLIENT['NAMA_CLIENT']} - "{CLIENT['TAGLINE']}"
{CLIENT['TIPE_BISNIS']}
Produk: {CLIENT['LAYANAN']}
Lokasi: {CLIENT['LOKASI']}
{CLIENT['WEBSITE']}

📝 KEYWORDS RESEARCH
Keyword research dilakukan via DataForSEO API (Maret 2026).
Total 80+ keywords terfilter berdasarkan:
• Search Volume > 50
• Keyword Difficulty ≤ 35
• Relevan dengan niche home organization

📊 KEYWORD CATEGORIES:
• Storage & Organization: 23 keywords
• Kitchen Organization: 26 keywords
• Home Decor & Interior: 16 keywords
• Sustainable Living: 4 keywords
• Travel & Bags: 5 keywords
• Misc Home: 6 keywords
''',
        'Labels': 'Strategy', 'Members': '', 'Due Date': fmt(start_date), 'List Name': 'Brief'
    }

def card_credentials(start_date):
    return {
        'Card Name': '🔐 Setup Credentials & Akses',
        'Card Description': f'''⏱️ DEADLINE: Week 1

📌 AKSES YANG DIBUTUHKAN

✅ CHECKLIST AKSES

☐ Google Search Console
   - Property: www.sesoris.com
   - Level: Owner

☐ Google Analytics 4
   - Property: G-V2Y9KVBKFP (sudah ada)
   - Pastikan tracking berjalan

☐ Google Business Profile
   - Claim/verify untuk Sesoris Yogyakarta

☐ DataForSEO API
   - Login: (lihat .env)
   - Untuk keyword research otomatis

☐ Seedbacklink Account
   - Untuk order paid backlinks

☐ Platform Free Backlink
   - Kumparan, Kompasiana, IDN Times, LinkedIn, Medium

📝 NOTES
- Semua credentials tersimpan di file .env
- File .env sudah di-gitignore
''',
        'Labels': 'Strategy', 'Members': '', 'Due Date': fmt(start_date), 'List Name': 'To Do'
    }

def card_backlinks_plan(start_date):
    return {
        'Card Name': '🔗 Backlinks Strategy Plan',
        'Card Description': f'''📊 BACKLINK CAMPAIGN PLAN - SESORIS

📌 RINGKASAN STRATEGI
• Paid Backlinks: 2x/minggu (Selasa & Jumat)
• Free Backlinks: 1x/minggu (Rabu)
• Total estimasi 3 bulan: ~36 paid + ~12 free = 48 backlinks

📋 DOMAIN BERBAYAR PRIORITAS
''' + '\n'.join([f"• {b['domain']} - DR {b['dr']}, Traffic {b['traffic']}, {b['harga']}" for b in PAID_BACKLINKS[:8]]) + f'''

📋 PLATFORM GRATIS
''' + '\n'.join([f"• {b['platform']} (DA {b['da']}) - {b['akses']}" for b in FREE_BACKLINKS]) + f'''

🔗 ANCHOR TEXT STRATEGY
Untuk website baru (DR 0):
• Branded (Sesoris): 40%
• Naked URL: 20%
• Generic: 15%
• Partial Match: 15%
• Exact Match: 10%

📍 LANDING PAGE DISTRIBUTION
• Homepage: 30%
• Shop/Category Pages: 30%
• Blog/Articles: 20%
• About Page: 10%
• Other Pages: 10%
''',
        'Labels': 'Offpage', 'Members': '', 'Due Date': fmt(start_date), 'List Name': 'Brief'
    }

def card_monthly_report(month_num, date):
    return {
        'Card Name': f'💰 Monthly Report Bulan {month_num} - {fmt_indo(date)}',
        'Card Description': f'''📅 MONTHLY REPORT - BULAN {month_num}

📊 MONTHLY REPORT BULAN {month_num}
Laporan progress SEO bulan ke-{month_num} dari 3.

📝 AI PROMPT:

```
Kamu adalah SEO Report Specialist. Buatkan monthly report untuk Sesoris.

PERIODE: Bulan {month_num} dari 3
WEBSITE: https://www.sesoris.com

Buatkan report dengan struktur:
1. Executive Summary
2. KPI Progress vs Target
3. Traffic Analysis (GSC data)
4. Ranking Progress (top keywords)
5. Content Performance (artikel published)
6. Backlink Progress (new backlinks)
7. Technical Health
8. Next Month Plan
```

✅ CHECKLIST
☐ Export data traffic dari GSC
☐ Export data ranking
☐ Compile backlinks acquired
☐ Compile content published
☐ Generate monthly report
☐ Review & finalize
''',
        'Labels': 'Monitoring', 'Members': '', 'Due Date': fmt(date), 'List Name': 'Brief'
    }

# =============================================================================
# SETUP TASKS (customized for Next.js site)
# =============================================================================

SETUP_TASKS = [
    {'name': 'Verify Google Search Console', 'duration': '1 jam', 'tools': 'GSC', 'label': 'Monitoring', 'priority': 'CRITICAL',
     'desc': 'Verify ownership www.sesoris.com di GSC. Submit sitemap.xml. Cek coverage & indexation status.'},
    {'name': 'Verify Google Analytics 4', 'duration': '30 menit', 'tools': 'GA4', 'label': 'Monitoring', 'priority': 'CRITICAL',
     'desc': 'Pastikan GA4 (G-V2Y9KVBKFP) tracking berjalan. Setup conversion goals. Link dengan GSC.'},
    {'name': 'Setup Google Business Profile', 'duration': '2-3 jam', 'tools': 'GBP', 'label': 'Local SEO', 'priority': 'CRITICAL',
     'desc': 'Claim & verify Google Business Profile untuk Sesoris Yogyakarta. Complete semua informasi bisnis.'},
    {'name': 'Setup Bing Webmaster Tools', 'duration': '30 menit', 'tools': 'Bing Webmaster', 'label': 'Technical', 'priority': 'HIGH',
     'desc': 'Setup Bing Webmaster Tools untuk coverage lebih luas. Submit sitemap.'},
    {'name': 'Setup Rank Tracking (DataForSEO)', 'duration': '1 jam', 'tools': 'DataForSEO API', 'label': 'Monitoring', 'priority': 'HIGH',
     'desc': 'Setup automated rank tracking untuk top 20 target keywords menggunakan DataForSEO API.'},
    {'name': 'Audit & Optimize Sitemap', 'duration': '1 jam', 'tools': 'GSC, Next.js', 'label': 'Technical', 'priority': 'CRITICAL',
     'desc': 'Review sitemap.ts di Next.js. Pastikan semua halaman penting ter-include. Submit ke GSC & Bing.'},
    {'name': 'Audit robots.txt Configuration', 'duration': '30 menit', 'tools': 'GSC', 'label': 'Technical', 'priority': 'HIGH',
     'desc': 'Review robots.ts config. Pastikan tidak blocking halaman penting. Verify di GSC.'},
    {'name': 'Verify HTTPS & Domain Version', 'duration': '30 menit', 'tools': 'SSL Checker', 'label': 'Technical', 'priority': 'CRITICAL',
     'desc': 'Pastikan HTTPS enforce. Redirect www ke non-www (atau sebaliknya). Check SSL certificate.'},
    {'name': 'Setup Seedbacklink Account', 'duration': '30 menit', 'tools': 'Seedbacklink', 'label': 'Offpage', 'priority': 'HIGH',
     'desc': 'Daftar dan setup akun Seedbacklink untuk kampanye paid backlink.'},
    {'name': 'Register Platform Free Backlink', 'duration': '2 jam', 'tools': 'Web Browser', 'label': 'Offpage', 'priority': 'HIGH',
     'desc': 'Register akun di Kumparan, Kompasiana, IDN Times Community, LinkedIn, Medium untuk free backlink campaign.'},
]

def card_setup(task, due_date):
    p_icon = '🔴' if task['priority'] == 'CRITICAL' else '🟡'
    return {
        'Card Name': f"⚙️ Setup: {task['name']}",
        'Card Description': f'''⏱️ DURASI: {task['duration']}
⚠️ PRIORITY: {p_icon} {task['priority']}

📌 SETUP TASK
{task['name']}

📝 DESKRIPSI
{task['desc']}

📝 AI PROMPT:

```
Kamu adalah SEO Implementer Expert. Bantu setup {task['name']} untuk website {CLIENT['WEBSITE']}.

Website: {CLIENT['WEBSITE']}
Tech Stack: Next.js 16, Vercel hosting
Task: {task['name']}

Berikan:
1. Step-by-step guide lengkap
2. Best practices untuk Next.js site
3. Common mistakes yang harus dihindari
4. Cara validasi setup sudah benar
```

🛠️ TOOLS: {task['tools']}

✅ CHECKLIST
☐ Check requirements
☐ Implement setup
☐ Validate installation
☐ Document configuration
''',
        'Labels': task['label'], 'Members': '', 'Due Date': fmt(due_date), 'List Name': 'Inbox'
    }

# =============================================================================
# TECHNICAL SEO CARDS
# =============================================================================

TECHNICAL_TASKS = [
    {'name': 'Implement Product Schema (JSON-LD)', 'issue': 'Product pages belum punya Product schema',
     'target': 'Semua 12 product pages punya Product schema', 'duration': '3-4 jam',
     'tools': 'Next.js, Schema.org', 'priority': 'CRITICAL'},
    {'name': 'Implement BlogPosting Schema', 'issue': 'Blog posts belum punya Article/BlogPosting schema',
     'target': 'Semua blog posts punya schema', 'duration': '2-3 jam',
     'tools': 'Next.js, Schema.org', 'priority': 'HIGH'},
    {'name': 'Implement FAQPage Schema', 'issue': 'FAQ page belum punya FAQPage schema',
     'target': 'FAQ page tampil rich result', 'duration': '1-2 jam',
     'tools': 'Next.js, Rich Results Test', 'priority': 'HIGH'},
    {'name': 'Implement BreadcrumbList Schema', 'issue': 'Belum ada breadcrumb schema',
     'target': 'Semua halaman punya breadcrumb schema', 'duration': '2 jam',
     'tools': 'Next.js, Schema.org', 'priority': 'MEDIUM'},
    {'name': 'Optimize Core Web Vitals (LCP, CLS, INP)', 'issue': 'Perlu audit performance',
     'target': 'Score 90+ di PageSpeed Insights', 'duration': '4-5 jam',
     'tools': 'PageSpeed Insights, Lighthouse', 'priority': 'HIGH'},
    {'name': 'Optimize Image Alt Text & Compression', 'issue': 'Images perlu alt text & optimization',
     'target': 'Semua images punya alt text deskriptif', 'duration': '3-4 jam',
     'tools': 'Next.js Image, Sharp', 'priority': 'MEDIUM'},
    {'name': 'Internal Linking Audit & Improvement', 'issue': 'Internal linking structure perlu perbaikan',
     'target': 'Minimal 5 internal links per halaman', 'duration': '3-4 jam',
     'tools': 'Screaming Frog, Manual', 'priority': 'MEDIUM'},
    {'name': 'Implement Canonical Tags', 'issue': 'Perlu canonical tags untuk avoid duplicate',
     'target': 'Semua halaman punya canonical tag', 'duration': '1-2 jam',
     'tools': 'Next.js Metadata API', 'priority': 'HIGH'},
    {'name': 'Optimize Meta Titles & Descriptions', 'issue': 'Beberapa halaman perlu optimasi meta',
     'target': 'Semua halaman punya unique, optimized meta', 'duration': '3-4 jam',
     'tools': 'Next.js Metadata API', 'priority': 'HIGH'},
    {'name': 'Mobile Usability Audit', 'issue': 'Perlu verifikasi mobile experience',
     'target': 'Mobile-friendly semua halaman', 'duration': '2-3 jam',
     'tools': 'GSC Mobile Report, Chrome DevTools', 'priority': 'MEDIUM'},
]

def card_technical(task, due_date):
    icons = {'CRITICAL': '🔴', 'HIGH': '🟡', 'MEDIUM': '🟢', 'LOW': '⚪'}
    return {
        'Card Name': f"🔧 {task['name']}",
        'Card Description': f'''⏱️ DURASI: {task['duration']}
⚠️ PRIORITY: {icons.get(task['priority'],'⚪')} {task['priority']}

📌 OBJECTIVE
{task['name']}

📊 ISSUE
{task['issue']}

🎯 TARGET
{task['target']}

📝 AI PROMPT:

```
Kamu adalah Technical SEO Expert dengan keahlian Next.js. Bantu saya {task['name']} untuk {CLIENT['WEBSITE']}.

Website: {CLIENT['WEBSITE']}
Tech Stack: Next.js 16, React 19, Tailwind CSS 4
Issue: {task['issue']}
Target: {task['target']}

Berikan:
1. Step-by-step implementation untuk Next.js
2. Code snippets yang siap pakai
3. Cara testing & validasi
4. Best practices
```

🛠️ TOOLS: {task['tools']}

✅ CHECKLIST
☐ Audit current state
☐ Implement fixes/improvements
☐ Test di staging
☐ Deploy ke production
☐ Verify di GSC / Rich Results Test
''',
        'Labels': 'Technical', 'Members': '', 'Due Date': fmt(due_date), 'List Name': 'Inbox'
    }

# =============================================================================
# CONTENT (ARTICLE) CARDS
# =============================================================================

def card_article(num, keyword, volume, kd, due_date):
    intent_type, intent_guide, is_trans = detect_intent(keyword)
    trans_icon = '🎯 ' if is_trans else ''
    kw_display = keyword[:40] + '...' if len(keyword) > 40 else keyword
    score = calc_score(keyword, volume, kd)
    slug = keyword.lower().replace(' ', '-')[:50]

    return {
        'Card Name': f'📝 NEW #{num}: {trans_icon}{kw_display}',
        'Card Description': f'''⏱️ DURASI: 1.5-2 jam
📊 PRIORITY: {'🔥 HIGH' if is_trans else 'MEDIUM'}
📈 SCORE: {score:.0f}

📌 INFORMASI DASAR
Keyword Utama     : {keyword}
Search Volume     : {volume}/bulan
Keyword Difficulty: {kd}/100
URL Target        : {CLIENT['WEBSITE']}/blog/{slug}
Data Source        : DataForSEO API (Maret 2026)

🎯 SEARCH INTENT: {intent_type}
{intent_guide}

🔑 KEYWORD STRATEGY
PRIMARY: "{keyword}"

📝 AI PROMPT - COPY KE CLAUDE/GEMINI:

```
Kamu adalah Senior SEO Content Writer dengan pengalaman 15+ tahun. Buatkan artikel SEO-optimized:

KEYWORD UTAMA: "{keyword}"
SEARCH VOLUME: {volume}/bulan
URL TARGET: {CLIENT['WEBSITE']}/blog/{slug}

TENTANG CLIENT:
• Nama: Sesoris
• Tagline: "Hidup Lebih Teratur"
• Bisnis: E-commerce Home Organization & Lifestyle Products
• Produk: Organizer, Kitchen Storage, Bags, Tools, Office, Outdoor
• Website: {CLIENT['WEBSITE']}

INSTRUKSI:
1. Riset TOP 3 kompetitor di Google untuk keyword ini
2. Word count: 1.800-2.500 kata
3. Struktur: H1, multiple H2/H3, FAQ minimal 5
4. Keyword di: Title, Meta, H1, 100 kata pertama, H2, kesimpulan
5. Internal link ke {CLIENT['WEBSITE']} minimal 5
6. CTA ke Sesoris di kesimpulan
7. Bahasa Indonesia, tone: informatif & friendly
8. Sisipkan rekomendasi produk Sesoris yang relevan

OUTPUT:
1. Meta Title (50-60 char, keyword included)
2. Meta Description (150-160 char, dengan CTA)
3. Artikel lengkap dengan struktur heading
4. FAQ 5+ pertanyaan
5. Alt text untuk featured image
```

✅ CHECKLIST SEBELUM PUBLISH
☐ Keyword di title, meta, H1, 100 kata pertama
☐ Word count minimal 1.800 kata
☐ Internal link minimal 5
☐ FAQ minimal 5
☐ CTA ke Sesoris di kesimpulan
☐ Featured image dengan alt text
☐ Publish di website
☐ Submit URL ke GSC
''',
        'Labels': 'Content', 'Members': '', 'Due Date': fmt(due_date), 'List Name': 'Inbox'
    }

# =============================================================================
# EXISTING CONTENT UPGRADE CARDS
# =============================================================================

def card_upgrade(num, page, due_date):
    return {
        'Card Name': f"🔄 UPD #{num}: {page['name']}",
        'Card Description': f'''⏱️ DURASI: 1.5-2 jam

📌 UPGRADE EXISTING CONTENT #{num}
URL: {CLIENT['WEBSITE']}{page['url']}
Nama: {page['name']}
Issues: {page['issues']}

📝 AI PROMPT:

```
Kamu adalah On-Page SEO Specialist. Optimasi halaman existing untuk Sesoris.

URL: {CLIENT['WEBSITE']}{page['url']}
Halaman: {page['name']}
Known Issues: {page['issues']}
Tech Stack: Next.js 16, React 19

⚠️ PENTING: Buka URL tersebut dan analisis sebelum memberikan rekomendasi!

STEP 1 - ANALISIS:
• Cek current title, meta, H1
• Cek struktur heading
• Cek word count
• Cek internal/external links
• Cek images dan alt text

STEP 2 - OPTIMASI:
1. New Title Tag (50-60 char, keyword-optimized)
2. New Meta Description (150-160 char, dengan CTA)
3. H1 Recommendation
4. Content expansion (tambah 500-1000 kata)
5. Internal linking opportunities
6. Alt text untuk semua gambar
7. Schema markup suggestions

Client: Sesoris - "Hidup Lebih Teratur"
Produk: {CLIENT['LAYANAN']}
```

✅ CHECKLIST
☐ Audit current state
☐ Optimize title tag
☐ Optimize meta description
☐ Fix H1 structure
☐ Expand content
☐ Add/fix alt text
☐ Improve internal linking
☐ Add schema markup
☐ Deploy & verify
☐ Submit ke GSC
''',
        'Labels': 'Onpage', 'Members': '', 'Due Date': fmt(due_date), 'List Name': 'Inbox'
    }

# =============================================================================
# BACKLINK CARDS
# =============================================================================

def card_paid_backlink(backlink, date, week_num, anchor1, anchor2, topic):
    topic_title, topic_kw = topic
    return {
        'Card Name': f"🔗 Paid W{week_num}: {backlink['domain']}",
        'Card Description': f'''📋 BACKLINK ORDER CARD

📅 JADWAL
• Tanggal: {fmt_indo(date)}
• Week: {week_num}

🌐 MEDIA INFO
• Domain: {backlink['domain']}
• DR: {backlink['dr']}
• Traffic: {backlink['traffic']}
• Kategori: {backlink['kategori']}
• Harga: {backlink['harga']}

🔗 SEEDBACKLINK FILL FORM

Anchor Text 1:
```
{anchor1[0]}
```

Link 1:
```
{anchor1[1]}
```

Anchor Text 2:
```
{anchor2[0]}
```

Link 2:
```
{anchor2[1]}
```

Catatan Tambahan:
```
Artikel untuk {backlink['domain']} ({backlink['kategori']})

PENTING:
- Artikel minimal 1200 kata, original, informatif
- Sisipkan link secara natural
- Jangan over-optimize
- Fokus: home organization, lifestyle, interior

TARGET AUDIENCE:
- Pembaca {backlink['kategori']} yang tertarik home improvement & organization
```

📝 AI PROMPT (Min. 1200 Kata):

```
Buatkan artikel SEO-friendly untuk dipublikasikan di {backlink['domain']}:

TOPIK: {topic_title}
KEYWORDS: {topic_kw}

STRUKTUR:
1. Judul menarik dan mengandung keyword utama
2. Hook engaging di paragraf pertama
3. 5-7 subheading (H2/H3)
4. CTA subtle di penutup

INSTRUKSI:
- Minimal 1200 kata
- Bahasa Indonesia profesional
- Paragraf pendek (2-3 kalimat)
- Sisipkan data/statistik pendukung

SISIPKAN 2 LINK SECARA NATURAL:
Link 1: "{anchor1[0]}" → {anchor1[1]}
Link 2: "{anchor2[0]}" → {anchor2[1]}

CATATAN:
- Jangan menyebut "Sesoris" terlalu sering (max 2-3x)
- Link harus terasa natural
- Fokus memberikan value, bukan promosi langsung

INFO SESORIS:
E-commerce home organization & lifestyle products
Tagline: "Hidup Lebih Teratur"
Produk: Organizer, Kitchen Storage, Bags, Tools, Office, Outdoor
```

✅ CHECKLIST
☐ Cek ketersediaan domain di Seedbacklink
☐ Generate artikel dengan AI
☐ Review artikel (min 1200 kata)
☐ Submit order di Seedbacklink
☐ Follow up status publikasi
☐ Verify backlink live
☐ Document backlink URL
''',
        'Labels': 'Offpage', 'Members': '', 'Due Date': fmt(date), 'List Name': 'Inbox'
    }

def card_free_backlink(platform, date, week_num, anchor1, anchor2, topic):
    topic_title, topic_kw = topic
    return {
        'Card Name': f"🔗 Free W{week_num}: {platform['platform']}",
        'Card Description': f'''📋 FREE BACKLINK CARD

📅 JADWAL
• Tanggal: {fmt_indo(date)}
• Week: {week_num}

🌐 PLATFORM INFO
• Platform: {platform['platform']}
• URL: {platform['url']}
• DA: {platform['da']}
• Akses: {platform['akses']}
• Harga: GRATIS

🔗 LINK YANG DISISIPKAN

Anchor Text 1: "{anchor1[0]}" → {anchor1[1]}
Anchor Text 2: "{anchor2[0]}" → {anchor2[1]}

📝 AI PROMPT (1000-1500 Kata):

```
Buatkan artikel untuk {platform['platform']}:

TOPIK: {topic_title}
PLATFORM: {platform['platform']} ({platform['akses']})
KEYWORDS: {topic_kw}

SISIPKAN LINK NATURAL:
Link 1: "{anchor1[0]}" → {anchor1[1]}
Link 2: "{anchor2[0]}" → {anchor2[1]}

TONE: Sesuai {platform['platform']} - informatif, tidak promosi langsung
PANJANG: 1000-1500 kata

INFO SESORIS:
E-commerce home organization, Tagline: "Hidup Lebih Teratur"
```

✅ CHECKLIST
☐ Login/daftar {platform['platform']}
☐ Generate artikel
☐ Review & edit
☐ Submit artikel
☐ Monitor approval
☐ Verify publication
☐ Document backlink URL
''',
        'Labels': 'Offpage', 'Members': '', 'Due Date': fmt(date), 'List Name': 'Inbox'
    }

# =============================================================================
# GBP & MONITORING CARDS
# =============================================================================

def card_gbp(week_num, date, topic):
    topic_name, topic_desc = topic
    return {
        'Card Name': f"📍 GBP Post Week {week_num}: {topic_name}",
        'Card Description': f'''⏱️ DURASI: 30-45 menit

📌 GBP POST - WEEK {week_num}
Topic: {topic_name}

📝 AI PROMPT:

```
Buatkan Google Business Profile post untuk Sesoris:

Topic: {topic_name}
Deskripsi: {topic_desc}

Data Bisnis:
• Sesoris - "Hidup Lebih Teratur"
• E-commerce Home Organization & Lifestyle
• Produk: Organizer, Kitchen Storage, Bags, Tools, Office, Outdoor
• Lokasi: Yogyakarta, Indonesia

Buatkan:
1. Caption engaging (max 1500 char)
2. Hook menarik di awal
3. CTA kuat (kunjungi website / WhatsApp)
4. Hashtags relevan (5-7)
5. Ide visual untuk Canva (1200x900px)

Tone: Friendly, inspiring, aesthetic
```

✅ CHECKLIST
☐ Create image di Canva (1200x900px)
☐ Write caption (max 1500 char)
☐ Include CTA + link
☐ Publish di GBP
☐ Monitor engagement
''',
        'Labels': 'Local SEO', 'Members': '', 'Due Date': fmt(date), 'List Name': 'Inbox'
    }

def card_monitoring(week_num, due_date):
    return {
        'Card Name': f'📊 Weekly Monitoring - Week {week_num}',
        'Card Description': f'''⏱️ DURASI: 1-1.5 jam

📊 WEEKLY MONITORING - WEEK {week_num}

📋 DATA YANG DICEK:
1. Rankings (DataForSEO) - target keywords
2. Traffic (GSC) - clicks, impressions, CTR
3. Indexation status - halaman baru indexed?
4. GSC errors/warnings
5. New backlinks acquired
6. Content published minggu ini

📝 AI PROMPT:

```
Analisis data SEO mingguan untuk https://www.sesoris.com.

Data Rankings: [PASTE FROM DATAFORSEO]
Data Traffic: [PASTE FROM GSC]
Content Published: [LIST ARTICLES]
Backlinks: [LIST NEW BACKLINKS]

Analisis:
1. Keywords naik/turun signifikan?
2. Traffic trend vs minggu lalu?
3. Halaman baru yang indexed?
4. Technical issues di GSC?
5. Quick wins untuk minggu depan?
6. Backlink impact assessment
```

✅ CHECKLIST
☐ Check rankings (DataForSEO)
☐ Check traffic (GSC)
☐ Check indexation
☐ Check GSC errors
☐ Review backlinks acquired
☐ Update tracking spreadsheet
☐ Note action items for next week
''',
        'Labels': 'Monitoring', 'Members': '', 'Due Date': fmt(due_date), 'List Name': 'Inbox'
    }

# =============================================================================
# STRATEGY CARDS
# =============================================================================

def card_strategy_midproject(date):
    return {
        'Card Name': '🎯 Mid-Project Review (6 Minggu)',
        'Card Description': f'''📊 MID-PROJECT EVALUATION - 6 MINGGU

📌 EVALUASI TENGAH PROJECT
Due: {fmt_indo(date)}

REVIEW:
1. Traffic progress vs target ({PROJECT['TARGET_TRAFFIC']})
2. Ranking progress - berapa keyword masuk top 100?
3. Backlinks acquired - kualitas & kuantitas
4. Content published - on track?
5. Technical SEO health

📝 AI PROMPT:

```
Evaluasi progress SEO 6 minggu untuk Sesoris (https://www.sesoris.com):

TARGET:
• Traffic: 0 → {PROJECT['TARGET_TRAFFIC']}
• DR: 0 → {PROJECT['TARGET_DR']}

ACTUAL DATA:
Traffic: [PASTE GSC DATA]
Rankings: [PASTE RANKING DATA]
Backlinks: [COUNT & QUALITY]
Content: [ARTICLES PUBLISHED]

Berikan:
1. Score card (on track / behind / ahead)
2. Gap analysis
3. Adjusted strategy for remaining 6 weeks
4. Quick wins yang bisa dilakukan segera
```

✅ CHECKLIST
☐ Compile semua data
☐ Generate evaluation report
☐ Identify gaps
☐ Adjust strategy if needed
☐ Document revised plan
''',
        'Labels': 'Strategy', 'Members': '', 'Due Date': fmt(date), 'List Name': 'Inbox'
    }

def card_strategy_final(date):
    return {
        'Card Name': '🎯 Final Project Evaluation & Next Steps',
        'Card Description': f'''📊 FINAL EVALUATION - 3 BULAN

📌 EVALUASI AKHIR PROJECT
Due: {fmt_indo(date)}

OUTPUT:
1. Final KPI Report (Traffic, DR, Rankings, Backlinks)
2. Before vs After comparison
3. Top performing content
4. Top performing keywords
5. Backlink profile analysis
6. Recommendations for next 3 months
7. Content gap analysis
8. Competitor positioning

📝 AI PROMPT:

```
Evaluasi akhir project SEO 3 bulan untuk Sesoris:

BASELINE (Maret 2026):
• Traffic: 0
• DR: 0
• Blog Posts: 6
• Backlinks: 0

TARGET:
• Traffic: {PROJECT['TARGET_TRAFFIC']}
• DR: {PROJECT['TARGET_DR']}

ACTUAL (Juni 2026):
Traffic: [PASTE]
DR: [PASTE]
Rankings: [PASTE]
Total Articles: [COUNT]
Total Backlinks: [COUNT]

Berikan:
1. Comprehensive final report
2. ROI analysis
3. What worked vs what didn't
4. Strategy recommendations for next quarter
```

✅ CHECKLIST
☐ Final data compilation
☐ Before/After comparison
☐ Generate comprehensive report
☐ Recommendations document
☐ Plan next quarter
''',
        'Labels': 'Strategy', 'Members': '', 'Due Date': fmt(date), 'List Name': 'Inbox'
    }

# =============================================================================
# HELPER
# =============================================================================

def parse_date(s):
    return datetime.strptime(s, '%Y-%m-%d')

# =============================================================================
# MAIN GENERATOR
# =============================================================================

def generate():
    cards = []
    start = parse_date(PROJECT['START_DATE'])
    end = parse_date(PROJECT['END_DATE'])

    print("=" * 60)
    print("GENERATING TRELLO SEO CSV FOR SESORIS")
    print(f"Period: {fmt_indo(start)} - {fmt_indo(end)}")
    print("=" * 60)

    # === BRIEF ===
    print("\n📋 Brief cards...")
    cards.append(card_brief(start))
    cards.append(card_credentials(start))
    cards.append(card_backlinks_plan(start))

    # Monthly reports
    for m in range(1, 4):
        if m == 3:
            d = end
        else:
            d = datetime(start.year, start.month + m, start.day)
        d = get_next_working_day(d)
        cards.append(card_monthly_report(m, d))

    # === SETUP ===
    print("⚙️ Setup cards...")
    setup_dates = get_working_days(start, len(SETUP_TASKS))
    for i, task in enumerate(SETUP_TASKS):
        cards.append(card_setup(task, setup_dates[i]))

    # === TECHNICAL ===
    print("🔧 Technical cards...")
    tech_start = start + timedelta(days=7)
    tech_dates = get_working_days(tech_start, len(TECHNICAL_TASKS) * 2)
    for i, task in enumerate(TECHNICAL_TASKS):
        cards.append(card_technical(task, tech_dates[i * 2]))

    # === EXISTING CONTENT UPGRADES ===
    print("🔄 Existing content upgrade cards...")
    upgrade_start = start + timedelta(days=14)
    upgrade_interval = timedelta(days=5)
    for i, page in enumerate(EXISTING_PAGES):
        d = get_next_working_day(upgrade_start + upgrade_interval * i)
        cards.append(card_upgrade(i + 1, page, d))

    # === CONTENT (ARTICLES) ===
    print("📝 Content cards...")
    # Sort keywords by score (transactional first, then by volume)
    scored = [(kw, vol, kd, calc_score(kw, vol, kd)) for kw, vol, kd in KEYWORDS]
    scored.sort(key=lambda x: x[3], reverse=True)

    # Get all working days (Mon-Sat) for articles: 1 per day
    content_dates = get_working_days(start, len(scored) + 10)

    for i, (kw, vol, kd, _) in enumerate(scored):
        if i >= len(content_dates):
            break
        cards.append(card_article(i + 1, kw, vol, kd, content_dates[i]))

    total_articles = min(len(scored), len(content_dates))
    print(f"  → {total_articles} article cards generated")

    # === PAID BACKLINKS ===
    print("🔗 Paid backlink cards...")
    paid_dates = get_specific_weekdays(start, end, PROJECT['PAID_BACKLINK_DAYS'])
    week_num = 1
    for i, date in enumerate(paid_dates):
        bl = PAID_BACKLINKS[i % len(PAID_BACKLINKS)]
        a1 = ANCHOR_TEXTS[i % len(ANCHOR_TEXTS)]
        a2 = ANCHOR_TEXTS[(i + 1) % len(ANCHOR_TEXTS)]
        topic = BACKLINK_TOPICS[i % len(BACKLINK_TOPICS)]
        cards.append(card_paid_backlink(bl, date, week_num, a1, a2, topic))
        if date.weekday() == 4:  # Friday
            week_num += 1
    print(f"  → {len(paid_dates)} paid backlink cards")

    # === FREE BACKLINKS ===
    print("🔗 Free backlink cards...")
    free_dates = get_specific_weekdays(start, end, [PROJECT['FREE_BACKLINK_DAY']])
    for i, date in enumerate(free_dates):
        plat = FREE_BACKLINKS[i % len(FREE_BACKLINKS)]
        a1 = ANCHOR_TEXTS[(i + 2) % len(ANCHOR_TEXTS)]
        a2 = ANCHOR_TEXTS[(i + 3) % len(ANCHOR_TEXTS)]
        topic = BACKLINK_TOPICS[(i + 1) % len(BACKLINK_TOPICS)]
        cards.append(card_free_backlink(plat, date, i + 1, a1, a2, topic))
    print(f"  → {len(free_dates)} free backlink cards")

    # === GBP ===
    print("📍 GBP cards...")
    gbp_dates = get_specific_weekdays(start, end, [PROJECT['GBP_POST_DAY']])
    for i, date in enumerate(gbp_dates):
        topic = GBP_TOPICS[i % len(GBP_TOPICS)]
        cards.append(card_gbp(i + 1, date, topic))
    print(f"  → {len(gbp_dates)} GBP post cards")

    # === MONITORING ===
    print("📊 Monitoring cards...")
    monitor_dates = get_specific_weekdays(start, end, [PROJECT['WEEKLY_MONITORING_DAY']])
    for i, date in enumerate(monitor_dates):
        cards.append(card_monitoring(i + 1, date))
    print(f"  → {len(monitor_dates)} weekly monitoring cards")

    # === STRATEGY ===
    print("🎯 Strategy cards...")
    mid_date = start + timedelta(days=42)
    mid_date = get_next_working_day(mid_date)
    cards.append(card_strategy_midproject(mid_date))
    cards.append(card_strategy_final(end))

    # === EXPORT ===
    output = 'd:/Projects/Sesoris/sesoris/trello_seo_sesoris.csv'
    with open(output, 'w', newline='', encoding='utf-8') as f:
        writer = csv.writer(f, quoting=csv.QUOTE_ALL)
        writer.writerow(['Card Name', 'Card Description', 'Labels', 'Members', 'Due Date', 'List Name'])
        for card in cards:
            writer.writerow([
                card['Card Name'],
                card['Card Description'],
                card['Labels'],
                card['Members'],
                card['Due Date'],
                card['List Name']
            ])

    print(f"\n{'='*60}")
    print(f"Total cards: {len(cards)}")
    print(f"CSV saved to: {output}")

    # Summary
    labels = {}
    for c in cards:
        l = c['Labels']
        labels[l] = labels.get(l, 0) + 1

    print("\n=== SUMMARY BY LABEL ===")
    for label in sorted(labels.keys()):
        print(f"  {label}: {labels[label]}")

    lists = {}
    for c in cards:
        l = c['List Name']
        lists[l] = lists.get(l, 0) + 1

    print("\n=== SUMMARY BY LIST ===")
    for lst in sorted(lists.keys()):
        print(f"  {lst}: {lists[lst]}")

    return output

if __name__ == '__main__':
    generate()
