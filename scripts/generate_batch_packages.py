import csv
import json
import os
from PIL import Image, ImageDraw, ImageFont, ImageChops

BASE_DIR = r"D:\Projects\qpl"
PNG_DIR = os.path.join(BASE_DIR, "Etsy_300DPI_PNGs")
OUT_DIR = os.path.join(BASE_DIR, "batch-listings")
PINS_DIR = os.path.join(OUT_DIR, "pinterest-pins")

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(PINS_DIR, exist_ok=True)

# Load Windows Fonts for luxury typography
def load_font(name, size):
    path = os.path.join(r"C:\Windows\Fonts", name)
    if os.path.exists(path):
        return ImageFont.truetype(path, size)
    return ImageFont.load_default()

FONT_BRAND = load_font("segoeuib.ttf", 19)
FONT_TITLE = load_font("georgiab.ttf", 30)
FONT_VERSE = load_font("georgiai.ttf", 25)
FONT_SUB = load_font("segoeui.ttf", 20)
FONT_BTN = load_font("segoeuib.ttf", 21)

def trim_white_bars(im):
    """Trim artificial solid-white top/bottom phone letterbox bars if present."""
    bg = Image.new(im.mode, im.size, (255, 255, 255))
    diff = ImageChops.difference(im, bg).convert("L")
    # Threshold slight off-white noise
    diff = diff.point(lambda p: 255 if p > 18 else 0)
    bbox = diff.getbbox()
    if bbox:
        # Keep a small margin
        w, h = im.size
        left = max(0, bbox[0] - 20)
        top = max(0, bbox[1] - 20)
        right = min(w, bbox[2] + 20)
        bottom = min(h, bbox[3] + 20)
        if (bottom - top) > h * 0.35 and (right - left) > w * 0.35:
            return im.crop((left, top, right, bottom))
    return im

# 1. STRICT TRIAGE CLASSIFICATION
# Originals (Annika's physical hand sketches/paintings on paper) -> DO NOT SELL / DO NOT PRINT
ORIGINAL_DRAWING_IDS = {2, 10, 11, 16, 18, 87, 88, 96, 154}

# Non-art screenshots, UI captures, or unrelated project photos -> EXCLUDE
EXCLUDED_IDS = {
    3, 4, 13, 14, 15, 20, 22, 23, 29, 30, 31, 32, 33, 34, 35, 36, 37,
    42, 61, 62, 71, 75, 109, 111, 115, 118, 152
}

# Curated Master Artworks (Generated from Annika's concepts - Eligible for Print & Sale across all products)
MASTER_CATALOG = [
    # --- WINTER SANCTUARY & HOLIDAY VILLAGE ---
    {
        "sku": "QPL-WIN-001",
        "master_id": 5,
        "variant_ids": [91],
        "mockup_ids": [6, 17, 19, 21, 130, 142, 146, 1, 9, 129],
        "collection": "Winter Sanctuary & Holiday",
        "title_core": "Swirling Evergreen Christmas Tree Watercolor",
        "etsy_title": "Swirling Evergreen Christmas Tree Art Print, Whimsical Holiday Pine Watercolor, Cozy Winter Cabin Decor, Printable & Framed Wall Art",
        "subject": "an heirloom folk-art evergreen Christmas tree adorned with warm glowing ornaments nestled against snowy mountain peaks",
        "verse": "Warm fires, kind hands, and peace to this cherished home.",
        "tags": [
            "christmas tree art", "winter pine print", "holiday wall decor", "cottagecore winter",
            "watercolor christmas", "cozy cabin art", "folk art holiday", "christmas pillow",
            "evergreen tree print", "printable christmas", "heirloom holiday", "neutral christmas", "winter sanctuary"
        ],
        "pinterest_board": "Cozy Winter Sanctuary & Holiday Decor"
    },
    {
        "sku": "QPL-WIN-002",
        "master_id": 12,
        "variant_ids": [103, 107],
        "mockup_ids": [63, 104, 113, 121, 132, 139, 216, 7],
        "collection": "Winter Sanctuary & Holiday",
        "title_core": "Red Cardinal & Glowing Winter Lantern Watercolor",
        "etsy_title": "Red Cardinal & Glowing Lantern Winter Art Print, Snowy Holly Pine Watercolor, Heirloom Christmas Bird Decor, Pillow & Canvas Art",
        "subject": "a vibrant red cardinal perched beside a warm glowing brass lantern surrounded by holly berries, snowy pines, and swirling winter wind",
        "verse": "Even in the quiet of winter, light and song remain.",
        "tags": [
            "red cardinal art", "winter lantern print", "christmas bird art", "cardinal memorial",
            "holly berry print", "snowy pine decor", "cottagecore holiday", "winter throw pillow",
            "botanical winter art", "cozy christmas print", "watercolor bird art", "heirloom winter", "quiet path living"
        ],
        "pinterest_board": "Cozy Winter Sanctuary & Holiday Decor"
    },
    {
        "sku": "QPL-WIN-003",
        "master_id": 8,
        "variant_ids": [28, 137, 147, 157],
        "mockup_ids": [24, 26],
        "collection": "Winter Sanctuary & Holiday",
        "title_core": "Snowy European Canal Village & Stone Bridge",
        "etsy_title": "Snowy European Canal Village Watercolor Print, Old World Winter Bridge & Boats Wall Art, Cozy Christmas Town Decor, Framed or Digital",
        "subject": "a serene snowy European canal village with half-timbered houses, festive holiday wreaths on glowing streetlamps, a stone arch bridge, and wooden canal boats",
        "verse": "Peace be to every threshold, and stillness upon the waters.",
        "tags": [
            "winter village art", "european canal print", "snowy town watercolor", "christmas village",
            "old world holiday", "stone bridge art", "cozy winter print", "canal boat painting",
            "cottagecore christmas", "blue winter wall art", "nordic winter decor", "holiday gallery wall", "heirloom art print"
        ],
        "pinterest_board": "Cozy Winter Sanctuary & Holiday Decor"
    },
    {
        "sku": "QPL-WIN-004",
        "master_id": 27,
        "variant_ids": [],
        "mockup_ids": [24, 26],
        "collection": "Winter Sanctuary & Holiday",
        "title_core": "Moonlit Nordic Harbor Sailboat & Snowy Village",
        "etsy_title": "Moonlit Winter Harbor Sailboat Watercolor Print, Snowy Coastal Village Wall Art, Peaceful Blue Maritime Holiday Decor, Print & Canvas",
        "subject": "a tranquil moonlit winter harbor where a wooden sailboat with a glowing holiday tree drifts past snow-covered waterside cottages",
        "verse": "Guided by quiet stars into a peaceful harbor.",
        "tags": [
            "winter harbor print", "sailboat watercolor", "coastal christmas", "nautical winter art",
            "snowy village print", "blue watercolor art", "nordic harbor decor", "moonlit boat print",
            "peaceful sea wall art", "maritime holiday", "cottage coastal art", "quiet path living", "winter wall decor"
        ],
        "pinterest_board": "Cozy Winter Sanctuary & Holiday Decor"
    },
    {
        "sku": "QPL-WIN-005",
        "master_id": 150,
        "variant_ids": [166],
        "mockup_ids": [67],
        "collection": "Winter Sanctuary & Holiday",
        "title_core": "Terracotta Harbor Village & Holiday Sailboats",
        "etsy_title": "Terracotta Harbor Village Watercolor Art, Warm Nordic Coastal Boats Print, Cozy Storybook Maritime Bedding & Wall Decor",
        "subject": "warm terracotta and ochre harborside cottages reflecting in calm emerald waters beside wooden sailboats carrying festive evergreen trees",
        "verse": "Every journey finds its rest in a warm and welcoming port.",
        "tags": [
            "harbor village art", "terracotta wall art", "storybook boat print", "nordic coastal decor",
            "christmas sailboat", "warm neutral art", "watercolor harbor", "custom bedding art",
            "scandinavian winter", "cozy home print", "folk art village", "quiet path living", "heirloom decor"
        ],
        "pinterest_board": "Cozy Winter Sanctuary & Holiday Decor"
    },
    {
        "sku": "QPL-WIN-006",
        "master_id": 161,
        "variant_ids": [164, 172],
        "mockup_ids": [86, 95],
        "collection": "Winter Sanctuary & Holiday",
        "title_core": "Circular Winter Cove & Pastel Harbor Sailboats",
        "etsy_title": "Winter Harbor Cove Watercolor Print, Storybook Coastal Village & Sailboats Art, Serene Blue & Cream Nautical Wall Decor",
        "subject": "a circular harbour cove encircled by snow-dusted gabled cottages and gentle sailboats gliding over mirror-still winter water",
        "verse": "Still waters and safe shelter for the unhurried heart.",
        "tags": [
            "coastal village art", "winter cove print", "sailboat wall decor", "storybook harbor",
            "pastel winter art", "nautical bedroom art", "nordic village print", "serene sea art",
            "watercolor boats", "cottagecore coastal", "calm bedroom decor", "heirloom wall print", "quiet path living"
        ],
        "pinterest_board": "Cozy Winter Sanctuary & Holiday Decor"
    },
    {
        "sku": "QPL-WIN-007",
        "master_id": 169,
        "variant_ids": [170],
        "mockup_ids": [],
        "collection": "Winter Sanctuary & Holiday",
        "title_core": "Nordic Viking Wooden Ship in Snowy Fjord",
        "etsy_title": "Nordic Viking Ship Watercolor Print, Snowy Fjord & Northern Lights Wall Art, Scandinavian Maritime Heritage Decor, Framed or Digital",
        "subject": "an heirloom wooden Nordic ship sailing across a snow-rimmed blue fjord beneath swirling winter skies and northern lights",
        "verse": "Steadfast through the deep waters, guided by ancient light.",
        "tags": [
            "viking ship art", "nordic fjord print", "northern lights art", "scandinavian decor",
            "wooden ship painting", "winter sea watercolor", "aurora borealis art", "nautical study print",
            "heritage wall art", "blue ocean print", "rustic cabin decor", "men office wall art", "quiet path living"
        ],
        "pinterest_board": "Cozy Winter Sanctuary & Holiday Decor"
    },
    {
        "sku": "QPL-WIN-008",
        "master_id": 85,
        "variant_ids": [183, 188],
        "mockup_ids": [],
        "collection": "Winter Sanctuary & Holiday",
        "title_core": "Glowing Winter Log Cabins in Deep Snow",
        "etsy_title": "Cozy Winter Log Cabin Watercolor Print, Glowing Mountain Retreat in Snow Wall Art, Rustic Woodland Sanctuary Decor, Canvas & Print",
        "subject": "warmly lit timber log cabins with curling chimney smoke, wooden fences, and snow-laden evergreen pines under a twilight winter sky",
        "verse": "Inside, the hearth is warm; outside, the world is still.",
        "tags": [
            "winter cabin print", "snowy log cabin art", "mountain retreat art", "cozy hearth decor",
            "woodland winter art", "rustic lodge print", "snowscape watercolor", "christmas cabin art",
            "ski chalet decor", "peaceful winter art", "pine forest print", "heirloom wall decor", "quiet path living"
        ],
        "pinterest_board": "Cozy Winter Sanctuary & Holiday Decor"
    },
    {
        "sku": "QPL-WIN-009",
        "master_id": 178,
        "variant_ids": [198],
        "mockup_ids": [],
        "collection": "Winter Sanctuary & Holiday",
        "title_core": "Snowy Half-Timbered Christmas Village Street",
        "etsy_title": "Old World Christmas Village Street Watercolor Print, Snowy Half-Timbered Town & Wreaths Wall Art, Festive Holiday Home Decor",
        "subject": "a picturesque Old World village street in winter with glowing windows, decorated outdoor Christmas trees, and red-bow evergreen wreaths",
        "verse": "May every window glow with warmth and welcome.",
        "tags": [
            "christmas street art", "old world christmas", "european winter art", "holiday town print",
            "half timbered house", "festive village art", "snowy street print", "cozy holiday decor",
            "traditional christmas", "watercolor town art", "winter mantle decor", "printable holiday", "quiet path living"
        ],
        "pinterest_board": "Cozy Winter Sanctuary & Holiday Decor"
    },
    {
        "sku": "QPL-WIN-010",
        "master_id": 177,
        "variant_ids": [184, 193, 196],
        "mockup_ids": [],
        "collection": "Winter Sanctuary & Holiday",
        "title_core": "Twilight Cobblestone Alley with Two Little Dogs",
        "etsy_title": "Winter Cobblestone Street & Dogs Watercolor Print, Cozy Twilight Village Alley Wall Art, Dog Lover Christmas Decor, Print & Pillow",
        "subject": "two sweet little dogs meeting on a snow-dusted cobblestone lane lit by warm golden lanterns and festive holiday garlands",
        "verse": "Faithful companions and warm lanterns along the quiet way.",
        "tags": [
            "christmas dog art", "winter alley print", "cobblestone street", "dog lover holiday",
            "twilight village art", "terrier winter print", "cozy street painting", "holiday pet art",
            "vertical wall art", "european alley art", "festive dog decor", "watercolor dog print", "quiet path living"
        ],
        "pinterest_board": "Cozy Winter Sanctuary & Holiday Decor"
    },
    {
        "sku": "QPL-WIN-011",
        "master_id": 187,
        "variant_ids": [191, 195],
        "mockup_ids": [],
        "collection": "Winter Sanctuary & Holiday",
        "title_core": "Vintage Holiday Car & Farmhouse Porch in Snow",
        "etsy_title": "Vintage Christmas Truck & Cabin Watercolor Print, Nostalgic Country Farmhouse Winter Porch Wall Art, Holiday Birds & Cat Decor",
        "subject": "a nostalgic vintage car carrying a fresh evergreen tree parked beside a welcoming country porch visited by winter songbirds, squirrels, and a cozy black cat",
        "verse": "Coming home through the quiet snow to the ones we love.",
        "tags": [
            "vintage truck art", "christmas car print", "farmhouse christmas", "winter porch decor",
            "nostalgic holiday", "country winter art", "black cat christmas", "woodland cabin print",
            "red cardinal snow", "rustic christmas art", "holiday kitchen art", "watercolor farmhouse", "quiet path living"
        ],
        "pinterest_board": "Cozy Winter Sanctuary & Holiday Decor"
    },
    {
        "sku": "QPL-WIN-012",
        "master_id": 192,
        "variant_ids": [176, 194, 199, 201, 39, 217],
        "mockup_ids": [],
        "collection": "Winter Sanctuary & Holiday",
        "title_core": "Winter Berry Tree & Songbird Sanctuary",
        "etsy_title": "Winter Songbirds & Red Berry Tree Watercolor Print, Snowy Woodland Birds Wall Art, Nature Lover Holiday Decor, Print, Canvas & Pillow",
        "subject": "a gathering of cheerful winter robins, cardinals, and songbirds perched among crimson winter berries against a tranquil snowy forest",
        "verse": "Every small bird is remembered in the quiet of the woods.",
        "tags": [
            "winter songbird art", "red berry tree print", "snowy bird watercolor", "robin wall art",
            "botanical winter", "bird watcher gift", "woodland nature art", "christmas bird print",
            "cottagecore bird art", "peaceful forest art", "heirloom bird print", "naturalist decor", "quiet path living"
        ],
        "pinterest_board": "Cozy Winter Sanctuary & Holiday Decor"
    },
    {
        "sku": "QPL-WIN-013",
        "master_id": 108,
        "variant_ids": [131, 136],
        "mockup_ids": [158, 159, 162, 165, 167, 171, 126, 127, 128, 133, 134, 135, 140, 141, 143, 144, 145, 153, 155, 160, 173],
        "collection": "Winter Sanctuary & Holiday",
        "title_core": "Storybook Winter Cottage, Bunny & Snowman Family",
        "etsy_title": "Storybook Winter Cottage & Snowman Family Print, Whimsical Woodland Bunny Nursery Art, Cozy Holiday Throw Pillow & Bedding Decor",
        "subject": "a whimsical storybook cottage beneath a crescent moon with gentle woodland bunnies and joyful watercolor snowmen wrapped in cozy scarves",
        "verse": "A joyful home is built of wonder, warmth, and gentle hearts.",
        "tags": [
            "snowman family art", "storybook cottage", "winter nursery print", "woodland bunny art",
            "whimsical christmas", "snowman throw pillow", "holiday kids bedding", "cottagecore winter",
            "crescent moon art", "folk art snowman", "cozy cottage print", "watercolor snowman", "quiet path living"
        ],
        "pinterest_board": "Cozy Winter Sanctuary & Holiday Decor"
    },

    # --- AUTUMN HARVEST, SUNFLOWERS & COZY WINDOW CATS ---
    {
        "sku": "QPL-AUT-001",
        "master_id": 41,
        "variant_ids": [40, 47, 52, 53],
        "mockup_ids": [49, 50, 43, 44],
        "collection": "Autumn Harvest & Botanicals",
        "title_core": "Golden Sunflower & Rustic Red Barn Watercolor",
        "etsy_title": "Golden Sunflower & Red Barn Watercolor Print, Autumn Harvest Country Farmhouse Wall Art, Fall Botanical Throw Pillow & Canvas Decor",
        "subject": "a radiant golden sunflower in full bloom surrounded by autumn oak and maple leaves with a weathered red country barn in the soft distance",
        "verse": "Turn gently toward the light and let the season ripen in grace.",
        "tags": [
            "sunflower wall art", "autumn barn print", "fall farmhouse decor", "watercolor sunflower",
            "harvest throw pillow", "rustic country art", "botanical fall print", "red barn painting",
            "cottagecore autumn", "golden floral art", "thanksgiving decor", "meadow flower print", "quiet path living"
        ],
        "pinterest_board": "Autumn Harvest & Botanical Home"
    },
    {
        "sku": "QPL-AUT-002",
        "master_id": 56,
        "variant_ids": [46, 54, 55, 57, 58],
        "mockup_ids": [50, 49],
        "collection": "Autumn Harvest & Botanicals",
        "title_core": "Sunlit Meadow Sunflower & Dried Autumn Flora Study",
        "etsy_title": "Botanical Sunflower Watercolor Art Print, Delicate Meadow Wildflower Wall Decor, Slow Living Kitchen & Entryway Art, Printable & Framed",
        "subject": "a delicate botanical study of sunlit yellow sunflowers, sage green leaves, and wild meadow grasses painted in airy washes",
        "verse": "In quiet soil, beauty takes root without hurry.",
        "tags": [
            "botanical sunflower", "yellow flower print", "meadow flora art", "wildflower painting",
            "kitchen floral art", "cottagecore botanical", "summer sunflower art", "sage green decor",
            "deckled edge print", "herbarium style art", "garden lover gift", "minimalist floral", "quiet path living"
        ],
        "pinterest_board": "Autumn Harvest & Botanical Home"
    },
    {
        "sku": "QPL-AUT-003",
        "master_id": 45,
        "variant_ids": [38, 48, 51, 59],
        "mockup_ids": [],
        "collection": "Autumn Harvest & Botanicals",
        "title_core": "Cozy Cat Napping in Autumn Window Basket",
        "etsy_title": "Autumn Cat in Window Basket Watercolor Print, Cozy Fall Pumpkins & Falling Leaves Wall Art, Cat Lover Gift, Print, Pillow & Mug",
        "subject": "a peaceful cat curled inside a woven wicker basket on a sunlit windowsill surrounded by mini harvest pumpkins and golden autumn leaves",
        "verse": "Rest deeply in the warmth of a quiet afternoon.",
        "tags": [
            "autumn cat print", "cat in basket art", "fall window decor", "pumpkin watercolor",
            "cozy cat wall art", "siamese cat print", "calico cat painting", "cottagecore cat art",
            "fall kitchen print", "cat lover gift idea", "harvest home decor", "peaceful pet art", "quiet path living"
        ],
        "pinterest_board": "Autumn Harvest & Botanical Home"
    },

    # --- BELOVED PETS & PEACEFUL HOME COMPANIONS ---
    {
        "sku": "QPL-PET-001",
        "master_id": 180,
        "variant_ids": [181, 185, 214],
        "mockup_ids": [],
        "collection": "Peaceful Home & Beloved Pets",
        "title_core": "Holiday Tabby Cat with Vintage Ornament & Cinnamon",
        "etsy_title": "Christmas Tabby Cat Watercolor Print, Cozy Holiday Cat with Ornament & Holly Wall Art, Festive Pet Lover Gift, Print, Pillow & Cards",
        "subject": "a gentle tabby cat resting by a frosted winter window with a vintage glass bauble, holly sprigs, and tied cinnamon sticks",
        "verse": "Quiet purrs and twinkling lights make a house a sanctuary.",
        "tags": [
            "christmas cat print", "tabby cat watercolor", "holiday cat wall art", "cozy cat christmas",
            "cat lover christmas", "festive pet decor", "winter window cat", "calico christmas art",
            "cottagecore pet art", "holly and pine print", "christmas card art", "cat throw pillow", "quiet path living"
        ],
        "pinterest_board": "Cozy Cats & Peaceful Pet Art"
    },
    {
        "sku": "QPL-PET-002",
        "master_id": 156,
        "variant_ids": [174, 182, 202, 203],
        "mockup_ids": [],
        "collection": "Peaceful Home & Beloved Pets",
        "title_core": "Garden Bench Cats in Snow & Summer Greenery",
        "etsy_title": "Cats on Garden Bench Watercolor Print, Peaceful Backyard Tabby Cat Wall Art, Cottage Garden Pet Illustration, Framed, Canvas & Digital",
        "subject": "contented tabby cats lounging on a weathered wooden garden bench surrounded by gentle snowfalls or lush summer cottage greenery",
        "verse": "Pause awhile in the garden; there is nowhere else you need to be.",
        "tags": [
            "garden cat wall art", "cats on bench print", "tabby cat painting", "cottage garden art",
            "backyard cat decor", "outdoor cat print", "vintage bicycle art", "peaceful cat art",
            "watercolor pet print", "cat memorial gift", "slow living art", "botanical cat print", "quiet path living"
        ],
        "pinterest_board": "Cozy Cats & Peaceful Pet Art"
    },
    {
        "sku": "QPL-PET-003",
        "master_id": 215,
        "variant_ids": [204, 207, 208, 210, 211, 213],
        "mockup_ids": [],
        "collection": "Peaceful Home & Beloved Pets",
        "title_core": "Sleeping Bedroom Cats on Heirloom Linen & Quilts",
        "etsy_title": "Sleeping Tabby Cats Watercolor Art Print, Cozy Bedroom Quilt & Sunlit Kitchen Cat Decor, Mindful Slow Living Pet Art, Print & Pillow",
        "subject": "beloved household cats curled in peaceful slumber on soft linen quilts, red flannel blankets, and sunlit country kitchen floors",
        "verse": "Let the quiet rhythm of a peaceful home restore your spirit.",
        "tags": [
            "sleeping cat print", "bedroom cat wall art", "two tabby cats art", "cozy quilt cat",
            "country kitchen art", "ginger cat painting", "calico cat decor", "minimalist cat art",
            "cat mom gift print", "peaceful bedroom art", "watercolor cat study", "heirloom home decor", "quiet path living"
        ],
        "pinterest_board": "Cozy Cats & Peaceful Pet Art"
    },
    {
        "sku": "QPL-PET-004",
        "master_id": 186,
        "variant_ids": [175, 179, 197, 205, 206, 209, 212],
        "mockup_ids": [],
        "collection": "Peaceful Home & Beloved Pets",
        "title_core": "Golden Dogs & Terriers in Meadow, Lake & Cozy Bed",
        "etsy_title": "Cozy Dogs Watercolor Art Print, Terrier & Labrador Retriever Wall Decor, Dogs Sleeping & Playing in Lake Painting, Dog Lover Gift",
        "subject": "faithful terrier and retriever dogs napping together on soft blankets, exploring wildflower meadows, and wading in golden sunset lakes",
        "verse": "Joy is found in muddy paws, warm blankets, and loyal hearts.",
        "tags": [
            "dog watercolor print", "terrier wall art", "golden dog painting", "dogs sleeping art",
            "lake dog illustration", "dog lover gift print", "pet portrait style", "cat and dog napping",
            "cottagecore dog art", "rustic dog decor", "camper van dogs art", "faithful friend art", "quiet path living"
        ],
        "pinterest_board": "Cozy Cats & Peaceful Pet Art"
    },

    # --- MORNING RITUALS, TEA & MINDFUL VERSE PRINTS ---
    {
        "sku": "QPL-MOR-001",
        "master_id": 93,
        "variant_ids": [89, 90, 97],
        "mockup_ids": [117, 120, 92, 119, 123],
        "collection": "Morning Rituals & Tea",
        "title_core": "Terracotta Teapot & Steaming Cups by Arch Window",
        "etsy_title": "Artisan Teapot & Botanical Watercolor Print, Cozy Morning Tea Ritual Wall Art, Cottagecore Kitchen & Coffee Bar Decor, Pillow & Print",
        "subject": "an artisan terracotta teapot pouring warm fragrant tea into stoneware cups beside a curtained arch window framed by sage and autumn leaves",
        "verse": "Breathe in grace, step gently into the morning.",
        "tags": [
            "morning tea print", "teapot watercolor", "kitchen tea wall art", "coffee bar decor",
            "cottagecore kitchen", "botanical tea print", "terracotta decor", "tea lover gift",
            "slow morning ritual", "cozy breakfast nook", "sage green kitchen", "heirloom tea art", "quiet path living"
        ],
        "pinterest_board": "Morning Tea Rituals & Cozy Kitchen"
    },
    {
        "sku": "QPL-MOR-002",
        "master_id": 78,
        "variant_ids": [94, 116],
        "mockup_ids": [],
        "collection": "Morning Rituals & Tea",
        "title_core": "Sunlit Cafe Table for Two by Curtained Window",
        "etsy_title": "Sunlit Morning Tea Table Watercolor Print, Cozy Breakfast Nook & Curtained Window Wall Art, Friendship Tea Gift, Dining Room Decor",
        "subject": "a warm wooden table with two woven chairs set beside a sunlit curtained window with fresh greenery and steaming cups of morning tea",
        "verse": "May this table hold laughter, warm cups, and quiet peace.",
        "tags": [
            "breakfast nook art", "tea table painting", "sunlit window print", "friendship tea gift",
            "dining room wall art", "cozy cafe watercolor", "morning coffee art", "french country art",
            "warm neutral kitchen", "hospitality print", "cottage dining decor", "slow living print", "quiet path living"
        ],
        "pinterest_board": "Morning Tea Rituals & Cozy Kitchen"
    },
    {
        "sku": "QPL-MOR-003",
        "master_id": 82,
        "variant_ids": [66, 69, 79, 83],
        "mockup_ids": [60, 64, 65, 68, 70, 72, 73, 74, 76, 77, 80, 81, 84],
        "collection": "Morning Rituals & Tea",
        "title_core": "Heirloom Morning Tea & Coffee Blessing Verse Suite",
        "etsy_title": "Morning Coffee & Tea Blessing Printable Wall Art, Deckled Edge Poetry Sign for Coffee Bar & Airbnb Guest Nook, Mindful Home Decor",
        "subject": "hand-lettered serif morning blessings and botanical line-art wreaths formatted for deckled-edge cotton paper and kitchen coffee bars",
        "verse": "May the kettle boil greatly, your coffee brew deep, and the calm of the morning be a blessing to keep.",
        "tags": [
            "coffee bar sign", "morning blessing art", "tea station print", "airbnb guest sign",
            "deckled edge print", "kitchen quote art", "mindful morning art", "poetry wall decor",
            "cottagecore quote", "printable tea sign", "hospitality decor", "slow living quote", "quiet path living"
        ],
        "pinterest_board": "Morning Tea Rituals & Cozy Kitchen"
    },
    {
        "sku": "QPL-LND-001",
        "master_id": 138,
        "variant_ids": [25, 124, 125],
        "mockup_ids": [100, 101, 102, 105, 106, 110, 114, 122, 189, 190, 200],
        "collection": "Tabletop & Serene Landscapes",
        "title_core": "Serene Winding River Marsh & Coastal Mountains",
        "etsy_title": "Serene River Marsh Watercolor Print Set, Neutral Sage & Earthy Landscape Wall Art, Minimalist Pastoral Living Room Gallery Decor",
        "subject": "a tranquil winding river meadow with graceful marsh birds, cattails, and soft sage hilltops painted in soothing earth tones",
        "verse": "Beside quiet waters, the hurried mind finds rest.",
        "tags": [
            "neutral landscape", "river marsh print", "sage green wall art", "pastoral watercolor",
            "diptych wall art", "minimalist nature", "living room gallery", "marsh birds print",
            "earthy home decor", "calming bedroom art", "organic modern art", "coastal mountain art", "quiet path living"
        ],
        "pinterest_board": "Heirloom Landscapes & Peaceful Living"
    }
]

PRODUCT_FORMATS = [
    {
        "format_code": "DIG",
        "format_name": "Instant Digital Download (5-Ratio Archival Pack)",
        "pillar": "Pillar A (Digital - GO)",
        "fulfillment": "Instant Digital Download",
        "retail_price": 7.50,
        "base_cost": 0.00,
        "shipping_cost": 0.00,
        "etsy_fees_est": 0.94,
        "net_profit": 6.56,
        "margin_pct": "87.5%"
    },
    {
        "format_code": "PRT",
        "format_name": "Archival Enhanced Matte Art Print (8x10\" to 24x36\")",
        "pillar": "Pillar B (Printful Multi-Product)",
        "fulfillment": "Printful Enhanced Matte Poster (#1)",
        "retail_price": 28.00,
        "base_cost": 11.50,
        "shipping_cost": 4.99,
        "etsy_fees_est": 2.93,
        "net_profit": 8.58,
        "margin_pct": "30.6%"
    },
    {
        "format_code": "FRM",
        "format_name": "Alder Wood Framed Archival Print (12x16\" / 18x24\")",
        "pillar": "Pillar B (Printful Multi-Product)",
        "fulfillment": "Printful Framed Enhanced Matte Poster (#2)",
        "retail_price": 68.00,
        "base_cost": 31.00,
        "shipping_cost": 8.99,
        "etsy_fees_est": 6.81,
        "net_profit": 21.20,
        "margin_pct": "31.2%"
    },
    {
        "format_code": "CAN",
        "format_name": "Gallery Wrapped Stretched Canvas (16x20\" / 24x36\")",
        "pillar": "Pillar B (Printful Multi-Product)",
        "fulfillment": "Printful Stretched Canvas (#3)",
        "retail_price": 88.00,
        "base_cost": 38.50,
        "shipping_cost": 11.99,
        "etsy_fees_est": 8.75,
        "net_profit": 28.76,
        "margin_pct": "32.7%"
    },
    {
        "format_code": "PIL",
        "format_name": "Heirloom Textured Throw Pillow / Case (18x18\" / 20x20\")",
        "pillar": "Pillar B (Printful Multi-Product)",
        "fulfillment": "Printful All-Over Print Throw Pillow (#83)",
        "retail_price": 42.00,
        "base_cost": 18.25,
        "shipping_cost": 6.49,
        "etsy_fees_est": 4.29,
        "net_profit": 12.97,
        "margin_pct": "30.9%"
    },
    {
        "format_code": "MUG",
        "format_name": "Artisan Ceramic Morning Ritual Mug (11oz / 15oz)",
        "pillar": "Pillar B (Printful Multi-Product)",
        "fulfillment": "Printful White Glossy / Accent Mug (#19)",
        "retail_price": 24.00,
        "base_cost": 7.95,
        "shipping_cost": 5.49,
        "etsy_fees_est": 2.54,
        "net_profit": 8.02,
        "margin_pct": "33.4%"
    },
    {
        "format_code": "BLK",
        "format_name": "Heirloom Woven Throw Blanket / Coverlet (50x60\" / 60x80\")",
        "pillar": "Pillar B (Printful Multi-Product)",
        "fulfillment": "Printful Sublimation / Woven Blanket (#395)",
        "retail_price": 78.00,
        "base_cost": 32.00,
        "shipping_cost": 8.99,
        "etsy_fees_est": 7.78,
        "net_profit": 29.23,
        "margin_pct": "37.5%"
    }
]

with open(os.path.join(PNG_DIR, "manifest_300dpi.json"), "r", encoding="utf-8") as f:
    raw_manifest = json.load(f)

id_to_item = {item["id"]: item for item in raw_manifest}

# Load QPL Wax Seal Logo
seal_logo_path = os.path.join(BASE_DIR, "logo-seal-ivory.png")
seal_im = None
if os.path.exists(seal_logo_path):
    seal_im = Image.open(seal_logo_path).convert("RGBA")
    seal_im.thumbnail((82, 82), Image.Resampling.LANCZOS)

# Generate Pinterest Bulk Upload CSV & Visual Pin Cards (1000x1500 2:3 ratio)
pin_csv_path = os.path.join(OUT_DIR, "pinterest_bulk_upload_pins.csv")
with open(pin_csv_path, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow([
        "Title", "Media URL", "Pinterest board", "Thumbnail", "Description", "Link", "Publish date", "Keywords"
    ])

    for entry in MASTER_CATALOG:
        sku = entry["sku"]
        pin_filename = f"PIN_{sku}.jpg"
        pin_local_path = os.path.join(PINS_DIR, pin_filename)
        src_id = entry["mockup_ids"][0] if entry["mockup_ids"] else entry["master_id"]
        src_file = os.path.join(PNG_DIR, id_to_item[src_id]["exported_file"])
        art_file = os.path.join(PNG_DIR, id_to_item[entry["master_id"]]["exported_file"])

        # Create a 1000x1500 Pinterest-optimized Pin Card
        canvas = Image.new("RGB", (1000, 1500), (250, 246, 238))
        draw = ImageDraw.Draw(canvas)

        # Header bar
        draw.rectangle([0, 0, 1000, 125], fill=(30, 24, 21))
        draw.rectangle([0, 122, 1000, 126], fill=(140, 72, 48))
        if seal_im:
            canvas.paste(seal_im, (32, 21), seal_im)
            text_x = 132
        else:
            text_x = 40

        draw.text((text_x, 26), "QUIET PATH LIVING   |   MINDFUL HOME & HEIRLOOM ART", font=FONT_BRAND, fill=(212, 196, 174))
        draw.text((text_x, 62), entry["title_core"], font=FONT_TITLE, fill=(255, 253, 249))

        # Main image area (top 135 to 1215)
        if os.path.exists(art_file):
            with Image.open(art_file) as im:
                im_rgb = trim_white_bars(im.convert("RGB"))
                im_rgb.thumbnail((900, 1030), Image.Resampling.LANCZOS)
                px = (1000 - im_rgb.width) // 2
                py = 145 + (1050 - im_rgb.height) // 2
                # Warm heirloom double mat frame
                draw.rectangle([px - 14, py - 14, px + im_rgb.width + 14, py + im_rgb.height + 14], fill=(255, 253, 249), outline=(195, 180, 160), width=3)
                canvas.paste(im_rgb, (px, py))

        # If a separate mockup exists, place a larger styled lifestyle inset badge in bottom right
        if entry["mockup_ids"] and os.path.exists(src_file):
            with Image.open(src_file) as mim:
                mim_rgb = trim_white_bars(mim.convert("RGB"))
                mim_rgb.thumbnail((330, 330), Image.Resampling.LANCZOS)
                mx = 1000 - mim_rgb.width - 38
                my = 1205 - mim_rgb.height - 12
                draw.rectangle([mx - 8, my - 8, mx + mim_rgb.width + 8, my + mim_rgb.height + 8], fill=(255, 253, 249), outline=(140, 72, 48), width=4)
                canvas.paste(mim_rgb, (mx, my))

        # Footer callout bar (1225 to 1500)
        draw.rectangle([0, 1225, 1000, 1500], fill=(42, 34, 30))
        draw.rectangle([0, 1225, 1000, 1231], fill=(140, 72, 48))

        verse_display = f"\"{entry['verse']}\""
        if len(verse_display) > 72:
            verse_display = verse_display[:69] + "...\""
        draw.text((45, 1252), verse_display, font=FONT_VERSE, fill=(250, 246, 238))
        draw.text((45, 1308), "Order on Prints, Framed Art, Canvases, Pillows, Bedding & Mugs", font=FONT_SUB, fill=(212, 196, 174))

        # CTA Button
        draw.rectangle([45, 1365, 640, 1445], fill=(140, 72, 48), outline=(212, 196, 174), width=2)
        draw.text((75, 1392), "SHOP DIRECT: QUIETPATHLIVING.COM  \u2192", font=FONT_BTN, fill=(255, 253, 249))

        canvas.save(pin_local_path, "JPEG", quality=92)

        pin_title = f"{entry['title_core']} | Cozy Cottagecore & Mindful Home Decor"
        pin_desc = (
            f"{entry['title_core']} — \"{entry['verse']}\" | Order this illustration as an instant digital print, "
            f"framed wall art, canvas, cozy throw pillow, duvet cover, or morning mug at quietpathliving.com. "
            f"Use code QUIET15 for 15% off!"
        )
        pin_link = f"https://quietpathliving.com/?sku={sku}&utm_source=pinterest&utm_medium=pin#shop"

        writer.writerow([
            pin_title[:100],
            f"https://quietpathliving.com/pins/{pin_filename}",
            entry["pinterest_board"],
            "",
            pin_desc[:500],
            pin_link,
            "",
            ", ".join(entry["tags"])
        ])

print("Successfully upgraded all 24 Pinterest Mockup Pins with luxury typography and wax seal branding!")
