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

## 4. Master Artwork Inventory (Annika's Complete Suite)

- **Total Count**: **217 Master Artworks** in 300 DPI high resolution.
- **File Location**: `D:\Projects\qpl\Etsy_300DPI_PNGs\`
- **Catalog Manifest**: `D:\Projects\qpl\Etsy_300DPI_PNGs\manifest_300dpi.json`
- **Visual Lookbook**: `D:\Projects\qpl\Etsy_300DPI_PNGs\Lookbook_Catalog.html`
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
   - **Pillar A: Digital Art Downloads (100% Margin)**:
     - List all 217 pieces as instant digital downloads (single $5.99–$7.99, bundles of 3–5 for $14.99–$21.99).
     - Delivery is instant, automated, $0 COGS, 85–90% net profit.
   - **Pillar B: High Average Order Value (AOV) Printful Items**:
     - Focus physical fulfillment on higher-ticket items where dollar margin is \$20–\$45+:
       - Framed Archival Matte Canvas / Stretched Canvas (18x24", 24x36"): Sell \$75–\$140.
       - Heirloom Duvet Sets & Quilts: Sell \$85–\$160.
       - Premium Heavyweight Flanged Pillows & Throws: Sell \$42–\$65.
   - **Pillar C: Direct Website Sales on quietpathliving.com**:
     - Avoid Etsy's 10–15% fee entirely for organic visitors.
     - Convert traffic directly into email subscribers via the `QUIET15` lead magnet.

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
