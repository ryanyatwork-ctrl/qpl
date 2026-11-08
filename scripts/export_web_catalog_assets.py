import json
import os
import shutil
from PIL import Image, ImageChops, ImageFilter

BASE_DIR = r"D:\Projects\qpl"
PNG_DIR = os.path.join(BASE_DIR, "Etsy_300DPI_PNGs")
CAT_IMG_DIR = os.path.join(BASE_DIR, "images", "catalog")
SITE_PINS_DIR = os.path.join(BASE_DIR, "pins")
BATCH_PINS_DIR = os.path.join(BASE_DIR, "batch-listings", "pinterest-pins")

os.makedirs(CAT_IMG_DIR, exist_ok=True)
os.makedirs(SITE_PINS_DIR, exist_ok=True)

# Copy all 24 Pinterest pins into D:\Projects\qpl\pins\ for Cloudflare Pages hosting
for fname in os.listdir(BATCH_PINS_DIR):
    if fname.endswith(".jpg"):
        shutil.copy2(os.path.join(BATCH_PINS_DIR, fname), os.path.join(SITE_PINS_DIR, fname))

def trim_white_bars(im):
    bg = Image.new(im.mode, im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg).convert("L")
    diff = diff.point(lambda p: 255 if p > 18 else 0)
    bbox = diff.getbbox()
    if bbox:
        w, h = im.size
        left = max(0, bbox[0] - 12)
        top = max(0, bbox[1] - 12)
        right = min(w, bbox[2] + 12)
        bottom = min(h, bbox[3] + 12)
        if (bottom - top) > h * 0.35 and (right - left) > w * 0.35:
            return im.crop((left, top, right, bottom))
    return im

def clean_corner_sparkle(im):
    """Gently heal the tiny bottom-right AI sparkle icon by patch-cloning adjacent paper texture."""
    w, h = im.size
    # The sparkle typically sits within the bottom-right 7% width/height
    patch_w = int(w * 0.075)
    patch_h = int(h * 0.075)
    # Sample a clean patch immediately to the left of the bottom-right corner
    src_box = (w - patch_w * 2 - 10, h - patch_h, w - patch_w - 10, h)
    dst_box = (w - patch_w, h - patch_h, w, h)
    if src_box[0] > 0:
        sample = im.crop(src_box)
        # Create soft feathered mask
        mask = Image.new("L", (patch_w, patch_h), 0)
        from PIL import ImageDraw
        mdraw = ImageDraw.Draw(mask)
        mdraw.rectangle([6, 6, patch_w - 1, patch_h - 1], fill=255)
        mask = mask.filter(ImageFilter.GaussianBlur(radius=6))
        im.paste(sample, dst_box, mask)
    return im

# Import MASTER_CATALOG from generate_batch_packages.py
import sys
sys.path.insert(0, os.path.join(BASE_DIR, "scripts"))
from generate_batch_packages import MASTER_CATALOG, id_to_item

for entry in MASTER_CATALOG:
    sku = entry["sku"].lower()
    art_id = entry["master_id"]
    art_path = os.path.join(PNG_DIR, id_to_item[art_id]["exported_file"])

    if os.path.exists(art_path):
        with Image.open(art_path) as im:
            im_rgb = clean_corner_sparkle(trim_white_bars(im.convert("RGB")))
            im_rgb.thumbnail((900, 900), Image.Resampling.LANCZOS)
            out_art = os.path.join(CAT_IMG_DIR, f"{sku}-art.jpg")
            im_rgb.save(out_art, "JPEG", quality=85, optimize=True)

    if entry["mockup_ids"]:
        mock_id = entry["mockup_ids"][0]
        mock_path = os.path.join(PNG_DIR, id_to_item[mock_id]["exported_file"])
        if os.path.exists(mock_path):
            with Image.open(mock_path) as mim:
                mim_rgb = trim_white_bars(mim.convert("RGB"))
                mim_rgb.thumbnail((900, 900), Image.Resampling.LANCZOS)
                out_mock = os.path.join(CAT_IMG_DIR, f"{sku}-mockup.jpg")
                mim_rgb.save(out_mock, "JPEG", quality=85, optimize=True)

print("Exported all web-optimized catalog images to images/catalog/ and copied 24 Pinterest pins to pins/!")
