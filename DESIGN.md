# Sesoris Design System (2026-10 redesign)

Source of truth for tokens: `src/app/globals.css` (`:root`). Strategy and audience: `PRODUCT.md`.

## Theme

Light, product-led storefront. Deep green carries identity in large blocks (hero, newsletter card, footer); everything else is calm near-white with green-tinted neutrals so product photos read clearly. One recurring brand device: the orange tape-measure `.ruler` strip (measure-first positioning).

## Color (OKLCH, tinted toward hue 157-160)

| Token | Use |
|---|---|
| `--brand` `#1B5E3B` | Primary actions, links, icons. Kept from the original brand. |
| `--brand-strong` | Hover for primary buttons |
| `--brand-deep` | Hero, newsletter card, popup header |
| `--brand-ink` | Footer, announcement bar |
| `--brand-tint` / `--brand-line` | Soft panels (measure section, size & fit box, Also Read box) and their dividers |
| `--surface` / `--surface-2` / `--surface-3` | Page / product tiles / pressed states |
| `--ink` / `--ink-2` / `--ink-muted` | Headings / body / secondary text (muted still passes 4.5:1 on white) |
| `--ink-faint` | Decorative only, never text |
| `--line` / `--line-strong` | Dividers / form borders |
| `--accent` | Tape-measure orange for graphics only; text uses `--accent-ink` |
| `--danger`, `--star` | Sale badge and errors / rating stars |

Product photos sit on `--surface-2` tiles with `mix-blend-mode: multiply`, so white JPG backgrounds disappear into the tile. When the blended element has its own stacking context (z-index), put the blend on that element, not on the image inside it.

## Typography

One family: **Archivo** (variable, `wdth` + `wght`) via `next/font`. Headings use the width axis (`font-stretch: 112-120%`) and weight 650-750 with -0.02 to -0.03em tracking; body stays at normal width. No serif, no mono.

- Hero: `clamp(2.25rem, …, 4rem)`; section titles `.section-title` `clamp(1.75rem, …, 2.625rem)`; article H1 `.article-title` up to 3.25rem.
- Article body 17px / 1.75, measure 760px.

## Components

- Buttons `.btn` + `.btn-primary | .btn-outline | .btn-light | .btn-ghost-light`, radius 10px, min-height 46px. No pill buttons.
- Text links `.text-link` (underline offset, thicker on hover).
- Product card `.pcard` (tile, name, imperial dimensions from `src/lib/product-dims.ts`, price). Add-to-cart and wishlist are always visible on touch devices, revealed on hover elsewhere.
- Chips `.chip` (blog categories, related collections), radius 6px.
- FAQ uses native `<details>`; answers stay in the HTML for search engines.
- Header: server wrapper `Header.tsx` passes category data to `HeaderClient.tsx` (keeps the catalog out of the sitewide bundle). Dropdown opens on hover and keyboard focus.

## Rules

- Copy must match `src/lib/shipping.ts` / `checkout.ts` and the policy pages. No invented ratings, counts, or "24/7".
- No side-stripe borders, gradient text, glass cards, numbered eyebrows, cream backgrounds.
- `prefers-reduced-motion` collapses all transitions.
