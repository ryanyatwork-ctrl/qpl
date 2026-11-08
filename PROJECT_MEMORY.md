# Quiet Path Living (QPL) — Project Master Memory & Source of Truth

*Last Updated: November 2026*  
*Permanent memory file for AI agents and project contributors. Do not delete.*

---

## 1. Project Overview & Brand Identity

- **Brand Name**: Quiet Path Living (QPL)
- **Tagline**: Mindful Home Decor & Heirloom Prints  
  *"A touch of grace for the everyday spaces you cherish most."*
- **Aesthetic**: Slow living, cottagecore, heirloom needle-punch running stitch, wax seal medallions, warm neutrals, deckled edge paper, mindful affirmations.
- **Color Palette**:
  - Espresso Deep: `#1E1815`, `#2A221E`
  - Warm Cream / Ivory: `#FAF7F2`, `#FFFDF9`, `#FAF6EE`
  - Soft Linen / Sage: `#F4EFE6`, `#2D4E3A`
  - Wax Seal Terracotta / Bronze: `#8C4830`, `#9E472A`
- **Typography**: Hairline Roman serif (*Cormorant Garamond*, *Cinzel*) paired with clean geometric body (*Plus Jakarta Sans*).
- **Core Creator / Artist**: Annika (Designer & Founder).
- **Technical Operator**: Ryan Young (`ryanyatwork@gmail.com`).

---

## 2. Infrastructure & Digital Properties

| Channel | URL / Details | Notes |
| :--- | :--- | :--- |
| **Website** | [quietpathliving.com](https://quietpathliving.com) | Hosted on **Cloudflare Pages**, static HTML5/CSS3/Vanilla JS. |
| **Etsy Storefront** | [etsy.com/shop/QuietPathLiving](https://www.etsy.com/shop/QuietPathLiving) | Primary discovery marketplace & initial sales engine. |
| **Fulfillment Engine** | **Printful** integration | Direct-to-garment/direct-to-print POD for physical prints, canvases, pillows, bedding. |
| **GitHub Repository**| [github.com/ryanyatwork-ctrl/qpl](https://github.com/ryanyatwork-ctrl/qpl) | Remote origin for version control & Cloudflare automatic deployments. |
| **Local Project Root**| `D:\Projects\qpl` | Master development workspace on local workstation. |

---

## 3. Local Workspace Directory Map

```text
D:\Projects\qpl\
├── index.html                   # Production storefront layout (Cloudflare Pages)
├── styles.css                   # Custom styling, heirloom textures & wax seal badges
├── app.js                       # Interactive catalog, affirmation card flipper, quick-view modals
├── _headers                     # Cloudflare Pages security & CSP headers
├── README.md                    # Public GitHub repo documentation
├── PROJECT_MEMORY.md            # This persistent AI memory and operational guide
│
├── etsy-assets/                 # Banners (3360x840, 1200x300, 1200x160), shop icons, seals
│   ├── etsy-big-banner-3360x840.png
│   ├── etsy-shop-icon-bronze.png
│   └── master-seal-*.png
│
├── images/                      # Authentic staging photography featuring Annika's products
│   ├── morning-ritual-tea-staging.jpg
│   ├── morning-tea-butterflies-art.jpg
│   ├── songbird-linen-bedding.jpg
│   ├── woodland-story-bedding.jpg
│   └── winter-sanctuary-duvet.jpg (and 25+ more staging images)
│
└── Etsy_300DPI_PNGs/            # MASTER ARTWORK INVENTORY (217 300-DPI high-res pieces, ~1.85 GB)
    ├── manifest_300dpi.json     # Metadata manifest of all 217 artworks (dimensions, DPI, size)
    ├── Lookbook_Catalog.html    # Full visual lookbook gallery of all 217 pieces
    └── QPL_IMG_*_300DPI.png     # Upscaled, print-ready archival master PNGs
```

---

## 4. Master Artwork Inventory & Strict Content Rules

> **CRITICAL RULE — NO ORIGINAL HAND DRAWINGS FOR SALE**:
> Any of Annika's actual hand drawings or sketches are the **originals** (concept sources) and must **NEVER** be included in print runs, digital downloads, or store listings. **Only the finished artwork generated from those concepts** is to be made available to print and sell.

- **Raw Folder Count**: 217 files in `D:\Projects\qpl\Etsy_300DPI_PNGs\` (~1.85 GB)
- **Catalog Manifest**: `D:\Projects\qpl\Etsy_300DPI_PNGs\manifest_300dpi.json`
- **Visual Lookbook**: `D:\Projects\qpl\Etsy_300DPI_PNGs\Lookbook_Catalog.html`
- **Required Triage & Pre-Flight Filtering**:
  The 217 files in `Etsy_300DPI_PNGs/` are a mixed batch that must be filtered before listing:
  1. **Exclude Original Drawings/Sketches**: Photos/scans of Annika's physical pencil/pen drawings (e.g., `QPL_IMG_20260904_155650_300DPI.png`, `QPL_IMG_20260904_155652_300DPI.png`) are strictly off-limits for sale.
  2. **Exclude Non-Art Captures**: Filter out phone screenshots (e.g., `QPL_Screenshot_*`) and personal/exterior photos (e.g., `QPL_IMG_20260926_154355_300DPI.png`).
  3. **Separate Mockups vs. Flat Print Masters**: Distinguish staged product mockups/infographics (e.g., pillow dimension graphics, staged room shots) from flat full-bleed artwork meant for Printful printing.
  4. **Watermark Removal**: Clean any bottom-right generation sparkle watermarks from the flat print masters prior to uploading to Printful or packaging as digital downloads.
- **Primary Aspect Ratios**:
  - Vertical / Portrait (7.6 x 15 in, 11.3 x 15 in, 10.9 x 15 in, 12.1 x 15 in)
  - Horizontal / Landscape (15 x 8.2 in, 15 x 11.3 in, 15 x 8.4 in)
  - Square (15 x 15 in)

### Core Collections / Thematic Taxonomy:
1. **Morning Rituals & Botanical Tea**: Teapots, wild garden flowers, quiet coffee nooks, warm steam illustrations.
2. **Bedside & Rest**: Songbird families, gentle dusk poetry, calm woodland flora.
3. **Tabletop & Vintage**: Heirloom place settings, botanical watercolor plates, cottage linens.
4. **Woodland & Storybook Sanctuary**: Forest cottages, lambs, pine trees, rustic cabins.
5. **Seasonal & Holiday**: Winter snow cabins, festive hearths, seasonal blessings.
6. **Mindful Verse & Affirmation Cards**: Slow living quotes, scriptures, and blessings on deckled paper backgrounds.

---

## 5. Profitability Blueprint & Etsy/Printful Execution Plan

### Why the Shop Must Pivot to a Hybrid Model:
1. **Printful Physical POD Alone Yields Thin Margins**:
   - Small physical items (single mug or 8x10 print) after Printful base cost ($10-$18) + shipping ($6-$10) + Etsy fees (6.5% transaction + 3%+$0.25 payment processing + $0.20 listing fee + 15% offsite ads) leave thin margins ($3–$6).
2. **The 3-Pillar High-Margin Architecture**:
   - **Pillar A: Digital Art Downloads (STATUS: GO — 100% Margin)**:
     - List all eligible generated artworks as instant digital downloads (single $5.99–$7.99, bundles of 3–5 for $14.99–$21.99).
     - Delivery is instant, automated, $0 COGS, 85–90% net profit.
   - **Pillar B: Full Multi-Product POD Availability (Annika's Vision)**:
     - When a customer falls in love with an artwork, they should be able to order it on **whatever product they want** via Printful fulfillment:
       - Framed Archival Matte Prints & Stretched Canvases
       - Throw Pillows & Flanged Cushion Covers
       - Duvet Covers, Quilts & Woven Blankets
       - Ceramic Mugs, Tote Bags, Greeting Cards & Home Accents
   - **Pillar C: Direct Website Ordering & Pinterest Visual Funnel (Target Endgame)**:
     - Drive traffic directly to `quietpathliving.com` for ordering to avoid Etsy's 10–15% fee cut.
     - Automatically generate lifestyle mockups and publish them to **Pinterest** with direct links back to `quietpathliving.com`.

### Systematic Rollout Roadmap:
1. **Batch Listing Generator**:
   - Script that converts `manifest_300dpi.json` into Etsy listing batches (CSV or Printful API sync).
   - Generates 13 high-intent SEO tags, keyword-frontloaded titles, and clear print-ratio guides.
2. **Etsy Storefront Polish**:
   - Install custom high-res banners and icons from `etsy-assets/`.
   - Organize Etsy shop sections according to the 6 thematic collections.
3. **Website Lead Capture Connection**:
   - Wire up `newsletterForm` in `app.js` to an email marketing endpoint (MailerLite/ConvertKit/Cloudflare Worker) to capture emails permanently.
4. **Pinterest & Organic Distribution**:
   - Turn the 217 mockups and staging shots into Pinterest Idea Pins and Rich Pins linking directly to listings.
