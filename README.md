# Quiet Path Living — Mindful Home Decor & Heirloom Prints

Welcome to the official web repository for **Quiet Path Living** ([quietpathliving.com](https://quietpathliving.com)).

## Brand Identity & Aesthetic Overview
- **Aesthetic**: Heirloom Stitch Monogram & Mindful Slow Living
- **Logo**: Handcrafted interlocking `QPL` monogram with needle-punch running stitch border and wax seal medallion
- **Color Palette**: Deep espresso brown (`#1E1815`, `#2A221E`) on warm cream (`#FAF7F2`), natural ivory (`#FFFDF9`), soft linen weave textures (`#F4EFE6`), and wax seal terracotta (`#8C4830`)
- **Typography**: Roman serif hairline display fonts (*Cormorant Garamond*, *Playfair Display*) paired with clean geometric body text (*Plus Jakarta Sans*)
- **Storefront Link**: [Quiet Path Living Etsy Shop](https://www.etsy.com/shop/QuietPathLiving)

---

## Site Architecture & Content Sections

1. **Header / Navigation**
   - Brand monogram & typography lockup
   - Links: Home, Shop Collections, About the Maker, Contact
   - Primary Header CTA: `Shop on Etsy`

2. **Hero Section**
   - Headline: *A touch of grace for the everyday spaces you cherish most.*
   - Copy: *"Quiet Path Living was born out of a love for slow mornings, warm gatherings, and the comfort of a peaceful home. Every print, tag, and verse is created to help you pause, take a deep breath, and bring a touch of grace to the everyday spaces you cherish most."*
   - Interactive 3D deckled affirmation card with wax seal badge
   - Primary CTA: `Explore the Collection` (Links directly to Etsy)

3. **Shop / Featured Collections**
   - Category filtering & 8 curated product showcase cards with Quick View modals:
     - **Morning Rituals**: Coffee bar affirmation tags and framed signs.
     - **Bedside & Rest**: Calming evening poetry prints and nightstand cards.
     - **Tabletop & Vintage**: Heirloom place cards and artful decor accents.
     - **Digital Studio**: Instant-download printable PDFs.

4. **Interactive Mindful Moment Studio**
   - 3D flippable affirmation deck allowing visitors to draw a daily verse or blessing for their home.

5. **About the Maker (Annika, Designer & Founder)**
   - Headline: *Handcrafted words and quiet grace, inspired by generations of mindful making.*
   - Full story reflecting traditional needlework, linencraft, and patient intentions, signed by Annika.

6. **Customer Appreciation & Reviews**
   - Verified buyer notes highlighting paper quality, slow mornings, and tabletop gatherings.

7. **Contact & Inquiries**
   - Custom order, digital PDF support, and wholesale inquiry form + FAQ accordion.

8. **Footer & Lead Magnet**
   - Newsletter Capture: *"Join our quiet community. Sign up to receive a free printable morning affirmation tag and 15% off your next Etsy order (Code: QUIET15)."*
   - Interactive reward modal that unlocks the copyable `QUIET15` coupon and direct Etsy redirect.
   - Comprehensive footer with domain, copyright, and Etsy link.

---

## File Structure

```text
D:\projects\qpl\
├── index.html       # Complete semantic, mobile-first responsive HTML5 layout
├── styles.css       # Custom heirloom stitch styling, linen overlays & wax seal styling
├── app.js           # Interactive category filters, modals, flippers, and form handlers
└── README.md        # Brand and project documentation
```

## How to View & Run Locally
You can open `index.html` directly in any modern web browser or serve it using any static server:

```powershell
# Using Python
cd D:\projects\qpl
python -m http.server 3000

# Or using npx serve
npx serve D:\projects\qpl
```
Then visit `http://localhost:3000` in your browser.
