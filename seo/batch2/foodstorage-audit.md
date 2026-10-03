# Audit 6 Artikel Food Storage (sesoris.com) - 2026-09-28

Kartu: https://trello.com/c/HT1tDVIi (board seo-sesoris_com, list To Do)
Dikerjakan slot non-repo (aturan koordinator 2026-09-24): audit dan rekomendasi persis, TANPA eksekusi repo/deploy.

## Ringkasan temuan (membantah premis awal kartu)

Premis kartu: enam artikel food storage "tipis" dan tidak berimpresi GSC. **Hasil cek live membantah sebagian premis ini**: kontennya TIDAK tipis (1.976-3.131 kata, 14-21 H2), dan 4 dari 6 URL sudah `Submitted and indexed` di GSC. Masalah sesungguhnya lebih sempit dari dugaan.

## Tabel keputusan (6 baris, per URL)

| # | URL | GSC coverageState (dicek live 2026-09-28) | Kata | H2 | Tabel | Published | Keputusan |
|---|---|---|---|---|---|---|---|
| 1 | /blog/container-box | Submitted and indexed (crawl 2026-09-13) | 3.131 | 21 | 2 | 2026-03-24 | **PERDALAM**: konten sudah bagus dan terindeks, performa terbaik di GA4 (8% engagement). Perkuat internal link dari halaman kategori/produk storage. |
| 2 | /blog/box-storage | URL is unknown to Google (memang redirect 308) | - | - | - | - | **SUDAH BENAR, TIDAK PERLU AKSI**: sudah 308 redirect ke /blog/container-box (dibuktikan `curl -sL`, final_url=container-box). Konsolidasi ini yang benar; GSC memang tidak akan index URL redirect secara terpisah. |
| 3 | /blog/rubbermaid-food-storage-containers-complete-guide-premium-kitchen-organization-2026 | Submitted and indexed (crawl 2026-06-11, TERAKHIR dicrawl >3 bulan lalu) | 2.122 | 16 | 0 | 2026-04-25 | **PERDALAM + resubmit sitemap**: terindeks tapi crawl basi (Juni), kemungkinan sinyal freshness lemah. Perkuat internal link, resubmit sitemap dengan lastmod baru supaya Google re-crawl. |
| 4 | /blog/storage-containers-for-food-bpa-free-complete-tutorial-guide-2026 | Submitted and indexed (crawl 2026-09-22, baru) | 2.820 | 17 | 0 | 2026-04-08 | **PERDALAM**: sudah terindeks dan baru dicrawl. Konten cukup. Tunggu maturitas ranking, tambah internal link dari hub "air-tight-food-storage-containers". |
| 5 | /blog/pyrex-food-storage-containers-complete-review-buying-guide-2026 | **Discovered - currently not indexed** | 2.754 | 17 | 0 | 2026-04-04 | **TULIS ULANG / GABUNG (masalah nyata)**: satu-satunya dari 6 URL yang benar-benar TIDAK diindex Google meski sudah di-crawl. Root cause paling mungkin: kanibalisasi intent. `seo/batch2/intent-map.csv` menandai TIGA keyword ("rubbermaid brilliance...", "rubbermaid food storage...", "pyrex glass...", "pyrex food storage...", "storage containers for food bpa free") semuanya dengan `canonical_topic=air-tight-food-storage-containers` dan `primary=true`, padahal masing-masing sudah dapat artikel sendiri-sendiri. Google kemungkinan menganggap pyrex sebagai variasi tipis dari kluster yang sama. Rekomendasi: GABUNG bagian unik Pyrex (kaca vs plastik) ke artikel hub `air-tight-food-storage-containers`, redirect 301 URL pyrex ke hub, ATAU tulis ulang dengan differensiasi kuat (fokus spesifik Pyrex glass, bukan generic food storage) dan minta re-index via resubmit sitemap. |
| 6 | /blog/storage-racks-for-items-complete-guide-home-organization-2026 | Submitted and indexed (crawl 2026-07-24) | 1.976 | 14 | 0 | 2026-05-21 | **PERDALAM**: terindeks, konten paling tipis dari 6 tapi masih 1.976 kata (bukan thin content). Tidak ada di intent-map.csv (kemungkinan artikel di luar tracking terjadwal). Tambahkan internal link dan cek posisi keyword di rank tracker. |

## Root cause dugaan untuk "nol impresi" (belum diverifikasi ke query GSC individual karena API baru bisa dites inspeksi URL, bukan search analytics per-URL dalam sesi ini)

1. **Kanibalisasi cluster "food storage containers"**: intent-map.csv menandai 3+ keyword primary=true menunjuk ke canonical_topic yang sama (`air-tight-food-storage-containers`) tapi masing-masing sudah jadi artikel terpisah (rubbermaid x2 varian, pyrex x2 varian, storage-containers-for-food-bpa-free). Ini pola yang sama dengan temuan pyrex tidak terindeks.
2. **DR situs rendah (1,1)** per catatan CLAUDE.md project, memperberat semua artikel baru bersaing di keyword KD 10-33.
3. **box-storage sudah benar dikonsolidasi** (redirect 308 ke container-box) - bukan masalah, item ini SELESAI, jangan disentuh lagi.
4. Rubbermaid crawl basi (Juni) mengindikasikan sitemap/internal link tidak cukup kuat mendorong recrawl rutin.

## Yang TIDAK bisa dieksekusi di slot ini (butuh slot repo)

Kartu meminta eksekusi keputusan (gabung/tulis ulang/perdalam), deploy via Coolify, dan submit ulang lewat indexing-pp-cli. Semua ini butuh akses tulis ke repo `D:/Projects/Sesoris/sesoris` yang sedang dipegang agen lain (aturan koordinator slot non-repo 2026-09-24). Pekerjaan repo yang tersisa persis:

1. Edit/gabung konten `pyrex-food-storage-containers-complete-review-buying-guide-2026` sesuai keputusan di atas (gabung ke hub air-tight-food-storage-containers ATAU tulis ulang dengan diferensiasi).
2. Perkuat internal linking dari halaman kategori/hub ke keempat artikel yang sudah terindeks (container-box, rubbermaid, storage-containers-for-food-bpa-free, storage-racks-for-items).
3. Deploy via `POST https://coolify.mcsyauqi.com/api/v1/deploy?uuid=<uuid>&force=true`, verifikasi hash live.
4. Resubmit sitemap (BUKAN `indexing-pp-cli publish` untuk artikel, itu no-op per memory `pp-indexing` - Google Indexing API tidak berlaku untuk artikel/blog).
5. 21 hari kemudian: re-run url-inspection untuk 5 URL live, pastikan `coverageState=Submitted and indexed` semua, terutama pyrex.

## Cara re-cek GSC (dipakai dan berhasil dalam audit ini)

`GOOGLE_GSC_ACCESS_TOKEN` di `.env` sudah kedaluwarsa (401). Refresh manual:
```
curl -X POST https://oauth2.googleapis.com/token \
  -d client_id=$GOOGLE_CLIENT_ID -d client_secret=$GOOGLE_CLIENT_SECRET \
  -d refresh_token=$GOOGLE_GSC_REFRESH_TOKEN -d grant_type=refresh_token
```
Site property yang benar: `sc-domain:sesoris.com` (bukan `https://www.sesoris.com/`, itu 403 "You do not own this site").

## Eksekusi slot repo (2026-09-28)

- PERDALAM (internal link masuk): artikel rubbermaid sebelumnya hanya punya 1 link masuk, storage-racks 3. Ditambah blok read-also di 6 artikel live: food-storage-containers-airtight, food-storage-containers-for-pantry-complete-guide-organization-2026, glass-containers-food-storage (ke rubbermaid); cheap-kitchen-storage-racks, kitchen-spice-rack-guide-best-organization-solutions-2026, container-box (ke storage-racks).
- Koreksi audit: hub `air-tight-food-storage-containers` sudah retired dan redirect ke `food-storage-containers-airtight`, jadi hub yang hidup adalah yang kedua.
- GABUNG pyrex: temuan tambahan, ada 4 artikel pyrex live (pyrex-food-storage-containers, pyrex-glass-food-storage-containers, pyrex-glass-food-storage-containers-complete-guide-2026, pyrex-food-storage-containers-complete-review-buying-guide-2026). Usulan: retire `pyrex-food-storage-containers-complete-review-buying-guide-2026` dan redirect ke `pyrex-food-storage-containers` (keyword identik). Disiapkan di branch terpisah `seo/pyrex-merge-proposal`, BELUM di-merge, menunggu keputusan Syauqi.

## Recheck GSC url-inspection 2026-10-03 (hari ke-5 dari jendela 21 hari)

Dicek live via URL Inspection API (`sc-domain:sesoris.com`), bukti mentah: `D:/Projects/Creativism App/temp/catchup/6a641902c7f4fc05038ab951/inspect-2026-10-03.json`.

| URL | coverageState | lastCrawlTime |
|---|---|---|
| /blog/container-box | Submitted and indexed | 2026-09-13 |
| /blog/box-storage | URL is unknown to Google (308 ke container-box, sesuai keputusan) | - |
| /blog/rubbermaid-...-2026 | Submitted and indexed | 2026-06-11 (belum di-recrawl sejak link baru 09-28) |
| /blog/storage-containers-for-food-bpa-free-...-2026 | Submitted and indexed | 2026-09-28 |
| /blog/pyrex-food-storage-containers-complete-review-buying-guide-2026 | Submitted and indexed | 2026-09-30 |
| /blog/storage-racks-for-items-...-2026 | Submitted and indexed | 2026-07-24 |

Status baris 5 (pyrex): URL ini sekarang terindeks, jadi alasan GABUNG (tidak terindeks) sudah tidak berlaku. Branch `seo/pyrex-merge-proposal` tetap TIDAK di-merge; per komentar kartu 2026-10-03 (Syauqi via MinTiv) merge/redirect tidak lagi diperlukan. Keputusan efektif baris 5: PERDALAM (dipertahankan).

Sisa Definition of Done: recheck kelima URL yang dipertahankan pada 2026-10-19 (21 hari setelah deploy 2026-09-28).
