import csv
import json
import os
import re
import shutil
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = r"D:\Projects\qpl"
OUT_DIR = os.path.join(BASE_DIR, "batch-listings")
PINS_DIR = os.path.join(OUT_DIR, "pinterest-pins")
SITE_PINS_DIR = os.path.join(BASE_DIR, "pins")
SOCIAL_DIR = os.path.join(OUT_DIR, "social-media-kit")
IG_DIR = os.path.join(SOCIAL_DIR, "instagram-facebook-posts")

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(PINS_DIR, exist_ok=True)
os.makedirs(SITE_PINS_DIR, exist_ok=True)
os.makedirs(IG_DIR, exist_ok=True)

def load_font(name, size):
    path = os.path.join(r"C:\Windows\Fonts", name)
    if os.path.exists(path):
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()

FONT_BRAND = load_font("segoeuib.ttf", 19)
FONT_TITLE = load_font("georgiab.ttf", 28)
FONT_VERSE = load_font("georgiai.ttf", 24)
FONT_SUB = load_font("segoeui.ttf", 19)
FONT_BTN = load_font("segoeuib.ttf", 20)

# Parse all 36 products directly from app.js so website, Printful CSV, Pinterest, and Socials are 100% unified
with open(os.path.join(BASE_DIR, "app.js"), "r", encoding="utf-8") as f:
    js = f.read()

block = js[js.index("const productsData = ["):js.index("const affirmationDeck = [")]
products = []
for m in re.finditer(r"\{\s*id:\s*'([^']+)',(.*?)\}", block, re.S):
    pid = m.group(1)
    body = m.group(2)
    def gf(name):
        fm = re.search(rf"{name}:\s*'([^']*)'", body)
        return fm.group(1) if fm else ""
    products.append({
        "id": pid,
        "sku": gf("sku") or pid,
        "category": gf("category"),
        "title": gf("title"),
        "categoryName": gf("categoryName"),
        "defaultFormat": gf("defaultFormat") or "PRT",
        "description": gf("description"),
        "verse": gf("verse"),
        "image": gf("image").split("?")[0],
        "mockupImage": gf("mockupImage").split("?")[0],
        "badge": gf("badge"),
    })

print(f"Loaded {len(products)} verified products from app.js")

# 8 Official Printful-Verified Product Formats (Pillar A + Pillar B)
PRINTFUL_FORMATS = [
    {
        "code": "DIG",
        "name": "Instant Digital Download (5-Ratio Archival Pack)",
        "shortName": "Digital Download (300 DPI)",
        "printful_item": "Instant Digital Download (Etsy / Direct PDF & PNG Zip)",
        "printful_id": "DIGITAL-300DPI",
        "retail": 7.50,
        "cost": 0.00,
        "ship": 0.00,
        "etsy_fee": 0.94,
        "profit_etsy": 6.56,
        "profit_direct": 7.20
    },
    {
        "code": "MUG",
        "name": "Artisan Ceramic Morning Ritual Mug (11oz / 15oz)",
        "shortName": "Ceramic Morning Mug",
        "printful_item": "Printful White Glossy Mug (11oz / 15oz)",
        "printful_id": "PF-MUG-19",
        "retail": 24.00,
        "cost": 6.75,
        "ship": 5.49,
        "etsy_fee": 2.54,
        "profit_etsy": 9.22,
        "profit_direct": 11.06
    },
    {
        "code": "PRT",
        "name": "Archival Enhanced Matte Art Print (8x10\" to 24x36\")",
        "shortName": "Archival Matte Print",
        "printful_item": "Printful Enhanced Matte Paper Poster (in)",
        "printful_id": "PF-POSTER-1",
        "retail": 28.00,
        "cost": 8.97,
        "ship": 4.99,
        "etsy_fee": 2.93,
        "profit_etsy": 11.11,
        "profit_direct": 13.23
    },
    {
        "code": "PIL",
        "name": "Heirloom Linen-Feel Throw Pillow (18x18\" / 20x20\")",
        "shortName": "Linen-Feel Throw Pillow",
        "printful_item": "Printful All-Over Print Premium Linen-Feel Pillow / Cotton Pillow",
        "printful_id": "PF-PILLOW-83",
        "retail": 42.00,
        "cost": 21.50,
        "ship": 6.49,
        "etsy_fee": 4.29,
        "profit_etsy": 9.72,
        "profit_direct": 12.79
    },
    {
        "code": "LIN",
        "name": "Heirloom Cotton Twill Table Runner / Napkin Set",
        "shortName": "Table Runner / Napkins",
        "printful_item": "Printful Sublimation Table Runner (16x90\") / Cloth Napkins (Set of 4)",
        "printful_id": "PF-TABLE-LINEN",
        "retail": 48.00,
        "cost": 21.95,
        "ship": 5.99,
        "etsy_fee": 4.87,
        "profit_etsy": 15.19,
        "profit_direct": 18.67
    },
    {
        "code": "FRM",
        "name": "Alder Wood Framed Archival Print (12x16\" / 18x24\")",
        "shortName": "Alder Wood Framed Art",
        "printful_item": "Printful Enhanced Matte Paper Framed Poster (Black / White / Oak)",
        "printful_id": "PF-FRAMED-2",
        "retail": 68.00,
        "cost": 27.50,
        "ship": 8.99,
        "etsy_fee": 6.81,
        "profit_etsy": 24.70,
        "profit_direct": 29.53
    },
    {
        "code": "BLK",
        "name": "Heirloom Throw Blanket (50x60\" / 60x80\")",
        "shortName": "Cozy Throw Blanket",
        "printful_item": "Printful Throw Blanket (50x60\" / 60x80\")",
        "printful_id": "PF-BLANKET-395",
        "retail": 78.00,
        "cost": 28.50,
        "ship": 8.99,
        "etsy_fee": 7.78,
        "profit_etsy": 32.73,
        "profit_direct": 38.25
    },
    {
        "code": "CAN",
        "name": "Gallery Wrapped Stretched Canvas (16x20\" / 24x36\")",
        "shortName": "Stretched Gallery Canvas",
        "printful_item": "Printful Stretched Canvas (in) (1.25\" depth)",
        "printful_id": "PF-CANVAS-3",
        "retail": 88.00,
        "cost": 28.56,
        "ship": 11.99,
        "etsy_fee": 8.75,
        "profit_etsy": 38.70,
        "profit_direct": 44.90
    },
    {
        "code": "DUV",
        "name": "Heirloom Microfiber Duvet Cover / Comforter (Twin / Queen / King)",
        "shortName": "Custom Duvet Cover",
        "printful_item": "Printful Microfiber Duvet Cover / Comforter (Twin / Queen / King)",
        "printful_id": "PF-DUVET-COVER",
        "retail": 108.00,
        "cost": 67.69,
        "ship": 9.99,
        "etsy_fee": 10.69,
        "profit_etsy": 19.63,
        "profit_direct": 27.19
    }
]

BOARD_MAP = {
    "winter": "Cozy Winter Sanctuary & Holiday Decor",
    "morning": "Morning Tea Rituals & Cozy Kitchen",
    "autumn": "Autumn Harvest & Botanical Home",
    "pets": "Cozy Cats & Peaceful Pet Art",
    "bedside": "Cottagecore Bedroom & Heirloom Bedding",
    "tabletop": "Heirloom Landscapes & Peaceful Living",
    "digital": "Printable Cottagecore Art & Affirmations"
}

KEYWORDS_MAP = {
    "winter": "winter cabin art, christmas village print, cottagecore holiday, watercolor winter, cozy cabin decor, holiday throw pillow, winter wall art, quiet path living",
    "morning": "morning tea print, teapot watercolor, coffee bar decor, cottagecore kitchen, slow morning ritual, breakfast nook art, tea lover gift, quiet path living",
    "autumn": "sunflower wall art, autumn farmhouse decor, watercolor sunflower, harvest throw pillow, botanical fall print, cottagecore autumn, quiet path living",
    "pets": "cozy cat wall art, dog watercolor print, sleeping cat print, cottagecore pet art, cat lover gift, dog lover gift, peaceful pet art, quiet path living",
    "bedside": "cottagecore bedding, storybook duvet cover, songbird pillowcase, heirloom bedroom decor, woodland cottage bedding, cozy sanctuary bed, quiet path living",
    "tabletop": "heirloom wall art, songbird watercolor print, serene landscape print, cottagecore dining, mindful home decor, neutral gallery wall, quiet path living",
    "digital": "printable wall art, affirmation card deck, morning coffee sign, instant download art, cottagecore printable, mindful home pdf, quiet path living"
}

seal_logo_path = os.path.join(BASE_DIR, "logo-seal-ivory.png")
seal_im = None
if os.path.exists(seal_logo_path):
    seal_im = Image.open(seal_logo_path).convert("RGBA")
    seal_im.thumbnail((82, 82), Image.Resampling.LANCZOS)

# 1. Generate Complete 36-Product Printful + Etsy Batch Matrix (36 artworks x 9 formats = 324 SKUs)
etsy_csv_path = os.path.join(OUT_DIR, "etsy_printful_batch_listings.csv")
with open(etsy_csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow([
        "Full_SKU", "Base_ID", "Artwork_Title", "Category", "Format_Code", "Format_Name",
        "Printful_Catalog_Product", "Printful_Template_Code", "Retail_Price_USD",
        "Printful_Base_Cost_USD", "Printful_Shipping_Est_USD", "Etsy_Profit_Net_USD",
        "Direct_Site_Profit_Net_USD", "Primary_Image_Path", "Mockup_Image_Path", "Direct_Order_URL"
    ])
    for p in products:
        for fmt in PRINTFUL_FORMATS:
            full_sku = f"{p['sku']}-{fmt['code']}"
            url = f"https://quietpathliving.com/?sku={p['id']}&format={fmt['code']}#shop"
            writer.writerow([
                full_sku, p["id"], p["title"], p["categoryName"], fmt["code"], fmt["name"],
                fmt["printful_item"], fmt["printful_id"], f"{fmt['retail']:.2f}",
                f"{fmt['cost']:.2f}", f"{fmt['ship']:.2f}", f"{fmt['profit_etsy']:.2f}",
                f"{fmt['profit_direct']:.2f}", p["image"], p["mockupImage"], url
            ])

# 2. Generate 36 Branded Pinterest Pins (1000x1500) + Pinterest Bulk Upload CSV + 36 Instagram/FB Posts (1080x1350)
pin_csv_path = os.path.join(OUT_DIR, "pinterest_bulk_upload_pins.csv")
social_csv_path = os.path.join(SOCIAL_DIR, "social_media_36_day_calendar.csv")

with open(pin_csv_path, "w", newline="", encoding="utf-8") as pf, \
     open(social_csv_path, "w", newline="", encoding="utf-8") as sf:
    p_writer = csv.writer(pf)
    s_writer = csv.writer(sf)

    p_writer.writerow(["Title", "Media URL", "Pinterest board", "Thumbnail", "Description", "Link", "Publish date", "Keywords"])
    s_writer.writerow(["Day", "Product_ID", "SKU", "Title", "Pinterest_Board", "Pinterest_Pin_URL", "Instagram_Image_File", "Instagram_Facebook_Caption", "Direct_Shop_Link"])

    for idx, p in enumerate(products):
        pin_code = p["sku"]
        pin_filename = f"PIN_{pin_code}.jpg"
        pin_local = os.path.join(PINS_DIR, pin_filename)
        pin_site = os.path.join(SITE_PINS_DIR, pin_filename)

        art_path = os.path.join(BASE_DIR, p["image"].replace("/", os.sep))
        mock_path = os.path.join(BASE_DIR, p["mockupImage"].replace("/", os.sep)) if p["mockupImage"] else None

        # --- Build 1000x1500 Pinterest Pin ---
        canvas = Image.new("RGB", (1000, 1500), (250, 246, 238))
        draw = ImageDraw.Draw(canvas)
        draw.rectangle([0, 0, 1000, 125], fill=(30, 24, 21))
        draw.rectangle([0, 122, 1000, 126], fill=(140, 72, 48))
        if seal_im:
            canvas.paste(seal_im, (32, 21), seal_im)
            tx = 132
        else:
            tx = 40

        draw.text((tx, 26), "QUIET PATH LIVING   |   MINDFUL HOME & HEIRLOOM ART", font=FONT_BRAND, fill=(212, 196, 174))
        t_short = p["title"] if len(p["title"]) <= 46 else p["title"][:44] + "..."
        draw.text((tx, 62), t_short, font=FONT_TITLE, fill=(255, 253, 249))

        if os.path.exists(art_path):
            with Image.open(art_path) as im:
                im_rgb = im.convert("RGB")
                im_rgb.thumbnail((900, 1030), Image.Resampling.LANCZOS)
                px = (1000 - im_rgb.width) // 2
                py = 145 + (1050 - im_rgb.height) // 2
                draw.rectangle([px - 14, py - 14, px + im_rgb.width + 14, py + im_rgb.height + 14], fill=(255, 253, 249), outline=(195, 180, 160), width=3)
                canvas.paste(im_rgb, (px, py))

        if mock_path and os.path.exists(mock_path) and os.path.abspath(mock_path) != os.path.abspath(art_path):
            with Image.open(mock_path) as mim:
                mim_rgb = mim.convert("RGB")
                mim_rgb.thumbnail((320, 320), Image.Resampling.LANCZOS)
                mx = 1000 - mim_rgb.width - 38
                my = 1205 - mim_rgb.height - 12
                draw.rectangle([mx - 8, my - 8, mx + mim_rgb.width + 8, my + mim_rgb.height + 8], fill=(255, 253, 249), outline=(140, 72, 48), width=4)
                canvas.paste(mim_rgb, (mx, my))

        draw.rectangle([0, 1225, 1000, 1500], fill=(42, 34, 30))
        draw.rectangle([0, 1225, 1000, 1231], fill=(140, 72, 48))

        verse_str = f"\"{p['verse']}\""
        if len(verse_str) > 72:
            verse_str = verse_str[:69] + "...\""
        draw.text((45, 1252), verse_str, font=FONT_VERSE, fill=(250, 246, 238))
        draw.text((45, 1308), "Available on Digital Prints, Framed Art, Canvas, Pillows, Blankets & Mugs", font=FONT_SUB, fill=(212, 196, 174))
        draw.rectangle([45, 1365, 640, 1445], fill=(140, 72, 48), outline=(212, 196, 174), width=2)
        draw.text((75, 1392), "SHOP DIRECT: QUIETPATHLIVING.COM  \u2192", font=FONT_BTN, fill=(255, 253, 249))

        canvas.save(pin_local, "JPEG", quality=90, optimize=True)
        shutil.copy2(pin_local, pin_site)

        # --- Build 1080x1350 Instagram / Facebook Portrait Card ---
        ig_filename = f"IG_{pin_code}.jpg"
        ig_path = os.path.join(IG_DIR, ig_filename)
        ig_canvas = Image.new("RGB", (1080, 1350), (250, 246, 238))
        ig_draw = ImageDraw.Draw(ig_canvas)
        ig_draw.rectangle([0, 0, 1080, 95], fill=(30, 24, 21))
        ig_draw.text((40, 32), f"QUIET PATH LIVING  •  {p['categoryName'].upper()}", font=FONT_BRAND, fill=(212, 196, 174))
        if os.path.exists(art_path):
            with Image.open(art_path) as im:
                im_rgb = im.convert("RGB")
                im_rgb.thumbnail((960, 960), Image.Resampling.LANCZOS)
                px = (1080 - im_rgb.width) // 2
                py = 115 + (980 - im_rgb.height) // 2
                ig_draw.rectangle([px - 12, py - 12, px + im_rgb.width + 12, py + im_rgb.height + 12], fill=(255, 253, 249), outline=(195, 180, 160), width=3)
                ig_canvas.paste(im_rgb, (px, py))
        ig_draw.rectangle([0, 1120, 1080, 1350], fill=(42, 34, 30))
        ig_draw.rectangle([0, 1120, 1080, 1125], fill=(140, 72, 48))
        ig_draw.text((45, 1145), t_short, font=FONT_TITLE, fill=(255, 253, 249))
        ig_draw.text((45, 1195), verse_str, font=FONT_VERSE, fill=(212, 196, 174))
        ig_draw.text((45, 1255), "Order on Any Format at QuietPathLiving.com  •  Save 15% with Code QUIET15", font=FONT_SUB, fill=(250, 246, 238))
        ig_canvas.save(ig_path, "JPEG", quality=88, optimize=True)

        board = BOARD_MAP.get(p["category"], "Cozy Cottagecore & Mindful Home Decor")
        kw = KEYWORDS_MAP.get(p["category"], "cottagecore art, mindful home decor, quiet path living")
        direct_link = f"https://quietpathliving.com/?sku={p['id']}&utm_source=pinterest&utm_medium=pin#shop"
        pin_url = f"https://quietpathliving.com/pins/{pin_filename}"
        pin_title = f"{p['title']} | Quiet Path Living Heirloom Decor"
        pin_desc = (
            f"{p['title']} — \"{p['verse']}\" | {p['description']} "
            f"Order this artwork on archival prints, framed wall art, stretched canvas, throw pillows, blankets, duvet covers, or mugs at quietpathliving.com. Use code QUIET15 for 15% off!"
        )

        p_writer.writerow([pin_title[:100], pin_url, board, "", pin_desc[:500], direct_link, "", kw])

        ig_caption = (
            f"✨ \"{p['verse']}\"\n\n"
            f"Featured Piece: {p['title']} ({p['categoryName']})\n"
            f"{p['description']}\n\n"
            f"Whether you love this illustration as an instant printable ($7.50), an archival matte print ($28), a cozy linen-feel throw pillow ($42), a morning ceramic mug ($24), a framed print ($68), a woven blanket ($78), or a custom duvet cover ($108)—you can order it in your favorite format directly on our site.\n\n"
            f"🌿 Shop direct & save 15% with code QUIET15:\n"
            f"👉 https://quietpathliving.com/?sku={p['id']}#shop\n\n"
            f"#QuietPathLiving #CottagecoreDecor #MindfulHome #SlowLiving #HeirloomDecor #CozyHome #WatercolorArt #HomeSanctuary"
        )
        s_writer.writerow([f"Day {idx+1:02d}", p["id"], p["sku"], p["title"], board, pin_url, ig_filename, ig_caption, f"https://quietpathliving.com/?sku={p['id']}#shop"])

print("Generated all 36 Pinterest Pins, 36 Instagram/FB Posts, 324 Printful Batch SKUs, and 36-Day Social Calendar!")
