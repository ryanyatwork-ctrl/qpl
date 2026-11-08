/**
 * Quiet Path Living - Main JavaScript Interaction & Multi-Product Catalog Engine
 * Supports Pillar A (Instant Digital Downloads), Pillar B (Printful Multi-Product POD),
 * and Pillar C (Direct Site Ordering & Pinterest Deep-Linking).
 */

document.addEventListener('DOMContentLoaded', () => {
  renderExpandedCatalog();
  initMobileMenu();
  initCategoryFilters();
  initVerseCardFlipper();
  initLeadMagnet();
  initContactForm();
  initQuickViewModal();
  checkUrlDeepLink();
});

// 7 Universal Product Formats ("When someone loves the image, order it on whatever product they want")
const productFormats = [
  {
    code: 'DIG',
    name: 'Instant Digital Download (5-Ratio Pack)',
    shortName: 'Digital Download (300 DPI)',
    price: 7.50,
    priceDisplay: '$7.50',
    fulfillment: 'Instant Download • Print up to 24x36"'
  },
  {
    code: 'MUG',
    name: 'Artisan Ceramic Morning Ritual Mug (11oz / 15oz)',
    shortName: 'Ceramic Morning Mug',
    price: 24.00,
    priceDisplay: '$24.00',
    fulfillment: 'Printful Custom Fulfillment • Ships in 2–4 days'
  },
  {
    code: 'PRT',
    name: 'Archival Enhanced Matte Art Print (8x10" to 24x36")',
    shortName: 'Archival Matte Print',
    price: 28.00,
    priceDisplay: '$28.00',
    fulfillment: 'Museum-grade 200gsm matte paper'
  },
  {
    code: 'PIL',
    name: 'Heirloom Textured Throw Pillow (18x18" / 20x20")',
    shortName: 'Textured Throw Pillow',
    price: 42.00,
    priceDisplay: '$42.00',
    fulfillment: 'Soft cotton-linen feel • Hidden zipper'
  },
  {
    code: 'FRM',
    name: 'Alder Wood Framed Archival Print (12x16" / 18x24")',
    shortName: 'Alder Wood Framed Art',
    price: 68.00,
    priceDisplay: '$68.00',
    fulfillment: 'Solid wood frame • Acrylite front protector'
  },
  {
    code: 'BLK',
    name: 'Heirloom Woven Throw Blanket / Coverlet (50x60")',
    shortName: 'Woven Throw Blanket',
    price: 78.00,
    priceDisplay: '$78.00',
    fulfillment: 'Cozy heirloom throw • Full artwork weave'
  },
  {
    code: 'CAN',
    name: 'Gallery Wrapped Stretched Canvas (16x20" / 24x36")',
    shortName: 'Stretched Gallery Canvas',
    price: 88.00,
    priceDisplay: '$88.00',
    fulfillment: '1.5" gallery depth • Ready to hang'
  }
];

// Complete 36-Item Catalog (12 Signature Curated Pieces + 24 Generated Master Artwork Suites)
const productsData = [
  // --- ORIGINAL 12 FEATURED SHOWCASE ITEMS ---
  {
    id: 'm1',
    sku: 'QPL-ORIG-M1',
    category: 'morning',
    title: 'Morning Teapot & Steaming Cups Arch Window Print',
    categoryName: 'Morning Rituals & Tea',
    price: '$24.00',
    defaultFormat: 'PRT',
    description: 'Soft watercolor illustration of an artisan morning teapot, steaming stoneware cups, and autumn sage foliage beside a curtained arch window. Available as digital download, print, canvas, pillow, or mug.',
    verse: 'Breathe in grace, step gently into the morning.',
    image: 'images/catalog/qpl-mor-001-art.jpg?v=5',
    mockupImage: 'images/catalog/qpl-mor-001-mockup.jpg?v=5',
    pinImage: 'pins/PIN_QPL-MOR-001.jpg?v=5',
    badge: 'Signature Art'
  },
  {
    id: 'm2',
    sku: 'QPL-ORIG-M2',
    category: 'morning',
    title: 'Sunlit Morning Tea & Swirling Sage Art Print',
    categoryName: 'Morning Rituals & Tea',
    price: '$24.00',
    defaultFormat: 'PRT',
    description: 'Delicate botanical watercolor celebrating quiet morning teas, an artisan terracotta teapot, and swirling sage greenery.',
    verse: 'May this table hold laughter, warm cups, and quiet peace.',
    image: 'images/catalog/qpl-mor-001-sage-teapot.jpg?v=5',
    mockupImage: 'images/catalog/qpl-mor-001-linen-staging.jpg?v=5',
    badge: 'Handcrafted'
  },
  {
    id: 'm3',
    sku: 'QPL-ORIG-M3',
    category: 'morning',
    title: 'Morning Ritual Teapot & Breakfast Linen Staging Suite',
    categoryName: 'Morning Rituals & Tea',
    price: '$38.00',
    defaultFormat: 'PIL',
    description: 'Artisan styled morning teapot table linens, napkins, and stoneware mug pairing designed to grace your morning coffee bar, breakfast nook, or kitchen counter.',
    verse: 'Good things take root in quiet soil. Tend your hours with gentle hands.',
    image: 'images/catalog/qpl-mor-001-linen-staging.jpg?v=5',
    mockupImage: 'images/catalog/qpl-mor-003-mockup.jpg?v=5',
    badge: 'Best Seller'
  },
  {
    id: 'b1',
    sku: 'QPL-ORIG-B1',
    category: 'bedside',
    title: 'Songbird Meadow Heirloom Linen Bedding & Pillow Set',
    categoryName: 'Bedside & Rest',
    price: '$68.00',
    defaultFormat: 'BLK',
    description: 'Soft heirloom cotton-linen pillowcases and bedding featuring Annika’s songbird family emblem and subtle neutral plaid accents.',
    verse: 'Lay down your striving; let the quiet of the night mend your soul.',
    image: 'images/songbird-linen-bedding.jpg?v=5',
    mockupImage: 'images/vintage-bird-family.jpg?v=5',
    badge: 'Heirloom Favorite'
  },
  {
    id: 'b2',
    sku: 'QPL-ORIG-B2',
    category: 'bedside',
    title: 'Woodland Cottage Storybook Duvet & Pillow Set',
    categoryName: 'Bedside & Rest',
    price: '$74.00',
    defaultFormat: 'BLK',
    description: 'Enchanting storybook cottage illustration with gentle woodland bunnies, lambs, and evergreen pines on breathable natural cotton bedding.',
    verse: 'Peace be to this room, and grace to all who rest here.',
    image: 'images/woodland-cottage-bed-scene.jpg?v=5',
    mockupImage: 'images/catalog/qpl-win-013-art.jpg?v=5',
    badge: 'Artisan Bedding'
  },
  {
    id: 'b3',
    sku: 'QPL-ORIG-B3',
    category: 'bedside',
    title: 'Winter Sanctuary Storybook Cabin Bedding Suite',
    categoryName: 'Bedside & Rest',
    price: '$78.00',
    defaultFormat: 'BLK',
    description: 'Whimsical winter cabin watercolor print featuring snowmen, gentle pine forests, and storybook cottages crafted for cozy mindful homes.',
    verse: 'Warm fires, kind hands, and peace to this cherished home.',
    image: 'images/winter-cabin-bed-scene.jpg?v=5',
    mockupImage: 'images/catalog/qpl-win-013-mockup.jpg?v=5',
    badge: 'Seasonal Collection'
  },
  {
    id: 'b4',
    sku: 'QPL-ORIG-B4',
    category: 'bedside',
    title: 'Meadow Songbird Flanged Pillowcase & Linen Bedding',
    categoryName: 'Bedside & Rest',
    price: '$42.00',
    defaultFormat: 'PIL',
    description: 'Custom flanged cotton-linen pillowcase featuring Annika’s songbird family and summer meadow flora design.',
    verse: 'Rest your head in stillness and awaken with a grateful heart.',
    image: 'images/cottage-meadow-pillowcase.jpg?v=5',
    mockupImage: 'images/vintage-bird-family.jpg?v=5',
    badge: 'Handmade'
  },
  {
    id: 't1',
    sku: 'QPL-ORIG-T1',
    category: 'tabletop',
    title: 'Songbird Family Heirloom Meadow Art & Decor Suite',
    categoryName: 'Tabletop & Landscapes',
    price: '$32.00',
    defaultFormat: 'PRT',
    description: 'Heirloom songbird family watercolor in a sunlit wildflower meadow, ready to order as framed tabletop art, throw pillows, mugs, or woven linens.',
    verse: 'A joyful home is built of quiet moments, loving hands, and grateful hearts.',
    image: 'images/vintage-bird-family.jpg?v=5',
    mockupImage: 'images/songbird-linen-bedding.jpg?v=5',
    badge: 'Signature Piece'
  },
  {
    id: 't2',
    sku: 'QPL-ORIG-T2',
    category: 'tabletop',
    title: 'Storybook Cottage Cabin Quilted Coverlet & Pillow',
    categoryName: 'Tabletop & Landscapes',
    price: '$72.00',
    defaultFormat: 'BLK',
    description: 'Heirloom woven coverlet and textured pillow suite with rich forest tones, storybook woodland cabin imagery, and cozy comfort.',
    verse: 'A place of warmth, quiet shelter, and gentle hospitality.',
    image: 'images/catalog/qpl-win-013-mockup.jpg?v=5',
    mockupImage: 'images/woodland-cottage-bed-scene.jpg?v=5',
    badge: 'Heirloom Quilt'
  },
  {
    id: 't3',
    sku: 'QPL-ORIG-T3',
    category: 'tabletop',
    title: 'Songbird Family Heirloom Watercolor Print (8x10")',
    categoryName: 'Tabletop & Landscapes',
    price: '$26.00',
    defaultFormat: 'PRT',
    description: 'Whimsical watercolor painting of a loving songbird family in a summer wildflower meadow. Available on paper, canvas, pillow, or digital.',
    verse: 'A joyful home is built of quiet moments, loving hands, and grateful hearts.',
    image: 'images/vintage-bird-family.jpg?v=5',
    mockupImage: 'images/cottage-meadow-pillowcase.jpg?v=5',
    badge: 'Archival Art'
  },
  {
    id: 'd1',
    sku: 'QPL-ORIG-D1',
    category: 'digital',
    title: 'Complete Morning & Evening Mindful Art Print Bundle',
    categoryName: 'Digital Studio',
    price: '$14.00',
    defaultFormat: 'DIG',
    description: 'Instant download high-resolution print files for Annika’s morning coffee blessings, affirmation cards, and cut guides for standard framing.',
    verse: 'Instant access. Print at home on your favorite linen or cotton cardstock.',
    image: 'images/catalog/qpl-mor-003-framed.jpg?v=5',
    mockupImage: 'images/catalog/qpl-mor-003-art.jpg?v=5',
    badge: 'Instant Download'
  },
  {
    id: 'd2',
    sku: 'QPL-ORIG-D2',
    category: 'digital',
    title: 'Heirloom Storybook Home Printable Art Collection',
    categoryName: 'Digital Studio',
    price: '$12.00',
    defaultFormat: 'DIG',
    description: 'Printable storybook cottage art, place cards, and daily verses with delicate heirloom border designs ready for framing.',
    verse: 'Download instantly and create a tranquil sanctuary in minutes.',
    image: 'images/catalog/qpl-win-013-art.jpg?v=5',
    mockupImage: 'images/catalog/qpl-win-013-mockup.jpg?v=5',
    badge: 'Printable PDF'
  },

  // --- 24 MASTER ARTWORK SUITES (ALL AVAILABLE ON DIGITAL, PRINTS, FRAMED, CANVAS, PILLOWS, MUGS & BLANKETS) ---
  {
    id: 'QPL-WIN-001',
    sku: 'QPL-WIN-001',
    category: 'winter',
    title: 'Swirling Evergreen Christmas Tree Watercolor',
    categoryName: 'Winter & Holiday Sanctuary',
    price: '$7.50 – $88.00',
    defaultFormat: 'PIL',
    description: 'An heirloom folk-art evergreen Christmas tree adorned with warm glowing ornaments nestled against snowy mountain peaks. Order as an instant digital print, throw pillow, framed wall art, canvas, blanket, or mug.',
    verse: 'Warm fires, kind hands, and peace to this cherished home.',
    image: 'images/catalog/qpl-win-001-art.jpg?v=5',
    mockupImage: 'images/catalog/qpl-win-001-mockup.jpg?v=5',
    pinImage: 'pins/PIN_QPL-WIN-001.jpg?v=5',
    badge: '7 Formats Available'
  },
  {
    id: 'QPL-WIN-002',
    sku: 'QPL-WIN-002',
    category: 'winter',
    title: 'Red Cardinal & Glowing Winter Lantern Watercolor',
    categoryName: 'Winter & Holiday Sanctuary',
    price: '$7.50 – $88.00',
    defaultFormat: 'PIL',
    description: 'A vibrant red cardinal perched beside a warm glowing brass lantern surrounded by holly berries, snowy pines, and swirling winter wind.',
    verse: 'Even in the quiet of winter, light and song remain.',
    image: 'images/catalog/qpl-win-002-art.jpg?v=5',
    mockupImage: 'images/catalog/qpl-win-002-mockup.jpg?v=5',
    pinImage: 'pins/PIN_QPL-WIN-002.jpg?v=5',
    badge: 'Best Seller Suite'
  },
  {
    id: 'QPL-WIN-003',
    sku: 'QPL-WIN-003',
    category: 'winter',
    title: 'Snowy European Canal Village & Stone Bridge',
    categoryName: 'Winter & Holiday Sanctuary',
    price: '$7.50 – $88.00',
    defaultFormat: 'FRM',
    description: 'A serene snowy European canal village with half-timbered houses, festive holiday wreaths on glowing streetlamps, a stone arch bridge, and wooden canal boats.',
    verse: 'Peace be to every threshold, and stillness upon the waters.',
    image: 'images/catalog/qpl-win-003-art.jpg?v=5',
    mockupImage: 'images/catalog/qpl-win-003-mockup.jpg?v=5',
    pinImage: 'pins/PIN_QPL-WIN-003.jpg?v=5',
    badge: '7 Formats Available'
  },
  {
    id: 'QPL-WIN-004',
    sku: 'QPL-WIN-004',
    category: 'winter',
    title: 'Moonlit Nordic Harbor Sailboat & Snowy Village',
    categoryName: 'Winter & Holiday Sanctuary',
    price: '$7.50 – $88.00',
    defaultFormat: 'FRM',
    description: 'A tranquil moonlit winter harbor where a wooden sailboat with a glowing holiday tree drifts past snow-covered waterside cottages.',
    verse: 'Guided by quiet stars into a peaceful harbor.',
    image: 'images/catalog/qpl-win-004-art.jpg?v=5',
    mockupImage: 'images/catalog/qpl-win-004-mockup.jpg?v=5',
    pinImage: 'pins/PIN_QPL-WIN-004.jpg?v=5',
    badge: '7 Formats Available'
  },
  {
    id: 'QPL-WIN-005',
    sku: 'QPL-WIN-005',
    category: 'winter',
    title: 'Terracotta Harbor Village & Holiday Sailboats',
    categoryName: 'Winter & Holiday Sanctuary',
    price: '$7.50 – $88.00',
    defaultFormat: 'BLK',
    description: 'Warm terracotta and ochre harborside cottages reflecting in calm emerald waters beside wooden sailboats carrying festive evergreen trees.',
    verse: 'Every journey finds its rest in a warm and welcoming port.',
    image: 'images/catalog/qpl-win-005-art.jpg?v=5',
    mockupImage: 'images/catalog/qpl-win-005-mockup.jpg?v=5',
    pinImage: 'pins/PIN_QPL-WIN-005.jpg?v=5',
    badge: 'Bedding & Prints'
  },
  {
    id: 'QPL-WIN-006',
    sku: 'QPL-WIN-006',
    category: 'winter',
    title: 'Circular Winter Cove & Pastel Harbor Sailboats',
    categoryName: 'Winter & Holiday Sanctuary',
    price: '$7.50 – $88.00',
    defaultFormat: 'PRT',
    description: 'A circular harbor cove encircled by snow-dusted gabled cottages and gentle sailboats gliding over mirror-still winter water.',
    verse: 'Still waters and safe shelter for the unhurried heart.',
    image: 'images/catalog/qpl-win-006-art.jpg?v=5',
    mockupImage: 'images/catalog/qpl-win-006-mockup.jpg?v=5',
    pinImage: 'pins/PIN_QPL-WIN-006.jpg?v=5',
    badge: '7 Formats Available'
  },
  {
    id: 'QPL-WIN-007',
    sku: 'QPL-WIN-007',
    category: 'winter',
    title: 'Nordic Viking Wooden Ship in Snowy Fjord',
    categoryName: 'Winter & Holiday Sanctuary',
    price: '$7.50 – $88.00',
    defaultFormat: 'CAN',
    description: 'An heirloom wooden Nordic ship sailing across a snow-rimmed blue fjord beneath swirling winter skies and northern lights.',
    verse: 'Steadfast through the deep waters, guided by ancient light.',
    image: 'images/catalog/qpl-win-007-art.jpg?v=5',
    pinImage: 'pins/PIN_QPL-WIN-007.jpg?v=5',
    badge: 'Nordic Heritage'
  },
  {
    id: 'QPL-WIN-008',
    sku: 'QPL-WIN-008',
    category: 'winter',
    title: 'Glowing Winter Log Cabins in Deep Snow',
    categoryName: 'Winter & Holiday Sanctuary',
    price: '$7.50 – $88.00',
    defaultFormat: 'CAN',
    description: 'Warmly lit timber log cabins with curling chimney smoke, wooden fences, and snow-laden evergreen pines under a twilight winter sky.',
    verse: 'Inside, the hearth is warm; outside, the world is still.',
    image: 'images/catalog/qpl-win-008-art.jpg?v=5',
    pinImage: 'pins/PIN_QPL-WIN-008.jpg?v=5',
    badge: 'Cabin Sanctuary'
  },
  {
    id: 'QPL-WIN-009',
    sku: 'QPL-WIN-009',
    category: 'winter',
    title: 'Snowy Half-Timbered Christmas Village Street',
    categoryName: 'Winter & Holiday Sanctuary',
    price: '$7.50 – $88.00',
    defaultFormat: 'FRM',
    description: 'A picturesque Old World village street in winter with glowing windows, decorated outdoor Christmas trees, and red-bow evergreen wreaths.',
    verse: 'May every window glow with warmth and welcome.',
    image: 'images/catalog/qpl-win-009-art.jpg?v=5',
    pinImage: 'pins/PIN_QPL-WIN-009.jpg?v=5',
    badge: '7 Formats Available'
  },
  {
    id: 'QPL-WIN-010',
    sku: 'QPL-WIN-010',
    category: 'winter',
    title: 'Twilight Cobblestone Alley with Two Little Dogs',
    categoryName: 'Winter & Holiday Sanctuary',
    price: '$7.50 – $88.00',
    defaultFormat: 'PRT',
    description: 'Two sweet little dogs meeting on a snow-dusted cobblestone lane lit by warm golden lanterns and festive holiday garlands.',
    verse: 'Faithful companions and warm lanterns along the quiet way.',
    image: 'images/catalog/qpl-win-010-art.jpg?v=5',
    pinImage: 'pins/PIN_QPL-WIN-010.jpg?v=5',
    badge: '7 Formats Available'
  },
  {
    id: 'QPL-WIN-011',
    sku: 'QPL-WIN-011',
    category: 'winter',
    title: 'Vintage Holiday Car & Farmhouse Porch in Snow',
    categoryName: 'Winter & Holiday Sanctuary',
    price: '$7.50 – $88.00',
    defaultFormat: 'FRM',
    description: 'A nostalgic vintage car carrying a fresh evergreen tree parked beside a welcoming country porch visited by winter songbirds, squirrels, and a cozy black cat.',
    verse: 'Coming home through the quiet snow to the ones we love.',
    image: 'images/catalog/qpl-win-011-art.jpg?v=5',
    pinImage: 'pins/PIN_QPL-WIN-011.jpg?v=5',
    badge: 'Country Holiday'
  },
  {
    id: 'QPL-WIN-012',
    sku: 'QPL-WIN-012',
    category: 'winter',
    title: 'Winter Berry Tree & Songbird Sanctuary',
    categoryName: 'Winter & Holiday Sanctuary',
    price: '$7.50 – $88.00',
    defaultFormat: 'PRT',
    description: 'A gathering of cheerful winter robins, cardinals, and songbirds perched among crimson winter berries against a tranquil snowy forest.',
    verse: 'Every small bird is remembered in the quiet of the woods.',
    image: 'images/catalog/qpl-win-012-art.jpg?v=5',
    pinImage: 'pins/PIN_QPL-WIN-012.jpg?v=5',
    badge: '7 Formats Available'
  },
  {
    id: 'QPL-WIN-013',
    sku: 'QPL-WIN-013',
    category: 'winter',
    title: 'Storybook Winter Cottage, Bunny & Snowman Family',
    categoryName: 'Winter & Holiday Sanctuary',
    price: '$7.50 – $88.00',
    defaultFormat: 'PIL',
    description: 'A whimsical storybook cottage beneath a crescent moon with gentle woodland bunnies and joyful watercolor snowmen wrapped in cozy scarves.',
    verse: 'A joyful home is built of wonder, warmth, and gentle hearts.',
    image: 'images/catalog/qpl-win-013-art.jpg?v=5',
    mockupImage: 'images/catalog/qpl-win-013-mockup.jpg?v=5',
    pinImage: 'pins/PIN_QPL-WIN-013.jpg?v=5',
    badge: 'Pillow & Bedding Hit'
  },
  {
    id: 'QPL-AUT-001',
    sku: 'QPL-AUT-001',
    category: 'autumn',
    title: 'Golden Sunflower & Rustic Red Barn Watercolor',
    categoryName: 'Autumn & Sunflowers',
    price: '$7.50 – $88.00',
    defaultFormat: 'PIL',
    description: 'A radiant golden sunflower in full bloom surrounded by autumn oak and maple leaves with a weathered red country barn in the soft distance.',
    verse: 'Turn gently toward the light and let the season ripen in grace.',
    image: 'images/catalog/qpl-aut-001-art.jpg?v=5',
    mockupImage: 'images/catalog/qpl-aut-001-mockup.jpg?v=5',
    pinImage: 'pins/PIN_QPL-AUT-001.jpg?v=5',
    badge: '7 Formats Available'
  },
  {
    id: 'QPL-AUT-002',
    sku: 'QPL-AUT-002',
    category: 'autumn',
    title: 'Sunlit Meadow Sunflower & Dried Autumn Flora Study',
    categoryName: 'Autumn & Sunflowers',
    price: '$7.50 – $88.00',
    defaultFormat: 'PRT',
    description: 'A delicate botanical study of sunlit yellow sunflowers, sage green leaves, and wild meadow grasses painted in airy washes.',
    verse: 'In quiet soil, beauty takes root without hurry.',
    image: 'images/catalog/qpl-aut-002-art.jpg?v=5',
    mockupImage: 'images/catalog/qpl-aut-002-mockup.jpg?v=5',
    pinImage: 'pins/PIN_QPL-AUT-002.jpg?v=5',
    badge: 'Botanical Study'
  },
  {
    id: 'QPL-AUT-003',
    sku: 'QPL-AUT-003',
    category: 'autumn',
    title: 'Cozy Cat Napping in Autumn Window Basket',
    categoryName: 'Autumn & Sunflowers',
    price: '$7.50 – $88.00',
    defaultFormat: 'PRT',
    description: 'A peaceful cat curled inside a woven wicker basket on a sunlit windowsill surrounded by mini harvest pumpkins and golden autumn leaves.',
    verse: 'Rest deeply in the warmth of a quiet afternoon.',
    image: 'images/catalog/qpl-aut-003-art.jpg?v=5',
    pinImage: 'pins/PIN_QPL-AUT-003.jpg?v=5',
    badge: '7 Formats Available'
  },
  {
    id: 'QPL-PET-001',
    sku: 'QPL-PET-001',
    category: 'pets',
    title: 'Holiday Tabby Cat with Vintage Ornament & Cinnamon',
    categoryName: 'Beloved Pets',
    price: '$7.50 – $88.00',
    defaultFormat: 'PRT',
    description: 'A gentle tabby cat resting by a frosted winter window with a vintage glass bauble, holly sprigs, and tied cinnamon sticks.',
    verse: 'Quiet purrs and twinkling lights make a house a sanctuary.',
    image: 'images/catalog/qpl-pet-001-art.jpg?v=5',
    pinImage: 'pins/PIN_QPL-PET-001.jpg?v=5',
    badge: 'Cat Lover Favorite'
  },
  {
    id: 'QPL-PET-002',
    sku: 'QPL-PET-002',
    category: 'pets',
    title: 'Garden Bench Cats in Snow & Summer Greenery',
    categoryName: 'Beloved Pets',
    price: '$7.50 – $88.00',
    defaultFormat: 'FRM',
    description: 'Contented tabby cats lounging on a weathered wooden garden bench surrounded by gentle snowfalls or lush cottage greenery.',
    verse: 'Pause awhile in the garden; there is nowhere else you need to be.',
    image: 'images/catalog/qpl-pet-002-art.jpg?v=5',
    pinImage: 'pins/PIN_QPL-PET-002.jpg?v=5',
    badge: '7 Formats Available'
  },
  {
    id: 'QPL-PET-003',
    sku: 'QPL-PET-003',
    category: 'pets',
    title: 'Sleeping Bedroom Cats on Heirloom Linen & Quilts',
    categoryName: 'Beloved Pets',
    price: '$7.50 – $88.00',
    defaultFormat: 'PRT',
    description: 'Beloved household cats curled in peaceful slumber on soft linen quilts, red flannel blankets, and sunlit country kitchen floors.',
    verse: 'Let the quiet rhythm of a peaceful home restore your spirit.',
    image: 'images/catalog/qpl-pet-003-art.jpg?v=5',
    pinImage: 'pins/PIN_QPL-PET-003.jpg?v=5',
    badge: '7 Formats Available'
  },
  {
    id: 'QPL-PET-004',
    sku: 'QPL-PET-004',
    category: 'pets',
    title: 'Golden Dogs & Terriers in Meadow, Lake & Cozy Bed',
    categoryName: 'Beloved Pets',
    price: '$7.50 – $88.00',
    defaultFormat: 'FRM',
    description: 'Faithful terrier and retriever dogs napping together on soft blankets, exploring wildflower meadows, and wading in golden sunset lakes.',
    verse: 'Joy is found in muddy paws, warm blankets, and loyal hearts.',
    image: 'images/catalog/qpl-pet-004-art.jpg?v=5',
    pinImage: 'pins/PIN_QPL-PET-004.jpg?v=5',
    badge: 'Dog Lover Gift'
  },
  {
    id: 'QPL-MOR-001',
    sku: 'QPL-MOR-001',
    category: 'morning',
    title: 'Terracotta Teapot & Steaming Cups by Arch Window',
    categoryName: 'Morning Rituals & Tea',
    price: '$7.50 – $88.00',
    defaultFormat: 'PIL',
    description: 'An artisan terracotta teapot pouring warm fragrant tea into stoneware cups beside a curtained arch window framed by sage and autumn leaves.',
    verse: 'Breathe in grace, step gently into the morning.',
    image: 'images/catalog/qpl-mor-001-art.jpg?v=5',
    mockupImage: 'images/catalog/qpl-mor-001-mockup.jpg?v=5',
    pinImage: 'pins/PIN_QPL-MOR-001.jpg?v=5',
    badge: '7 Formats Available'
  },
  {
    id: 'QPL-MOR-002',
    sku: 'QPL-MOR-002',
    category: 'morning',
    title: 'Sunlit Cafe Table for Two by Curtained Window',
    categoryName: 'Morning Rituals & Tea',
    price: '$7.50 – $88.00',
    defaultFormat: 'PRT',
    description: 'A warm wooden table with two woven chairs set beside a sunlit curtained window with fresh greenery and steaming cups of morning tea.',
    verse: 'May this table hold laughter, warm cups, and quiet peace.',
    image: 'images/catalog/qpl-mor-002-art.jpg?v=5',
    pinImage: 'pins/PIN_QPL-MOR-002.jpg?v=5',
    badge: '7 Formats Available'
  },
  {
    id: 'QPL-MOR-003',
    sku: 'QPL-MOR-003',
    category: 'morning',
    title: 'Heirloom Morning Tea & Coffee Blessing Verse Suite',
    categoryName: 'Morning Rituals & Tea',
    price: '$7.50 – $88.00',
    defaultFormat: 'DIG',
    description: 'Hand-lettered serif morning blessings and botanical line-art wreaths formatted for deckled-edge cotton paper and kitchen coffee bars.',
    verse: 'May the kettle boil greatly, your coffee brew deep, and the calm of the morning be a blessing to keep.',
    image: 'images/catalog/qpl-mor-003-art.jpg?v=5',
    mockupImage: 'images/catalog/qpl-mor-003-mockup.jpg?v=5',
    pinImage: 'pins/PIN_QPL-MOR-003.jpg?v=5',
    badge: 'Coffee Bar Favorite'
  },
  {
    id: 'QPL-LND-001',
    sku: 'QPL-LND-001',
    category: 'tabletop',
    title: 'Serene Winding River Marsh & Coastal Mountains',
    categoryName: 'Tabletop & Landscapes',
    price: '$7.50 – $88.00',
    defaultFormat: 'FRM',
    description: 'A tranquil winding river meadow with graceful marsh birds, cattails, and soft sage hilltops painted in soothing earth tones.',
    verse: 'Beside quiet waters, the hurried mind finds rest.',
    image: 'images/catalog/qpl-lnd-001-art.jpg?v=5',
    mockupImage: 'images/catalog/qpl-lnd-001-mockup.jpg?v=5',
    pinImage: 'pins/PIN_QPL-LND-001.jpg?v=5',
    badge: 'Gallery Wall Suite'
  }
];

// Curated Affirmation Deck for interactive flipper
const affirmationDeck = [
  {
    theme: 'Slow Morning',
    quote: 'Breathe in grace, step gently into the day. There is no rush in a well-loved morning.',
    verseNum: '01 / 06'
  },
  {
    theme: 'Peaceful Rest',
    quote: 'Lay down your striving; let the quiet of the night mend your soul and restore your peace.',
    verseNum: '02 / 06'
  },
  {
    theme: 'Tabletop Gathering',
    quote: 'May this table hold warm bread, honest laughter, and hearts that feel cherished and heard.',
    verseNum: '03 / 06'
  },
  {
    theme: 'Patient Growth',
    quote: 'Good things take root in quiet soil. Tend your hours with gentle hands and unhurried faith.',
    verseNum: '04 / 06'
  },
  {
    theme: 'Sanctuary Threshold',
    quote: 'Leave the noise at the door. Within these walls, kindness is spoken and rest is honored.',
    verseNum: '05 / 06'
  },
  {
    theme: 'Grateful Heart',
    quote: 'Notice the sunlight on the linen, the warmth of the cup, and the gift of this ordinary hour.',
    verseNum: '06 / 06'
  }
];

let currentCardIndex = 0;

// Render the 24 Master Suites dynamically into #productGrid and enhance existing cards
function renderExpandedCatalog() {
  const grid = document.getElementById('productGrid');
  if (!grid) return;

  const newItems = productsData.slice(12);
  newItems.forEach(item => {
    const displayImg = item.mockupImage || item.image;
    const card = document.createElement('div');
    card.className = 'product-item product-card bg-cream-50 rounded-lg border border-linen overflow-hidden flex flex-col justify-between';
    card.setAttribute('data-category', item.category);
    card.innerHTML = `
      <div class="relative">
        <img src="${displayImg}" alt="${item.title}" class="w-full h-56 object-cover bg-cream-100" loading="lazy" />
        <span class="absolute top-3 left-3 bg-espresso-800 text-cream-100 text-[10px] uppercase tracking-widest px-2.5 py-1 rounded">${item.badge}</span>
        <div class="absolute inset-0 bg-espresso-900/20 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button onclick="openProductModal('${item.id}')" class="bg-cream-50 text-espresso-900 text-xs px-4 py-2 rounded font-medium shadow-md">
            Choose Product Format
          </button>
        </div>
      </div>
      <div class="p-5 flex flex-col flex-grow justify-between">
        <div>
          <span class="text-[10px] tracking-widest text-stitch uppercase font-medium">${item.categoryName}</span>
          <h3 class="font-serif text-lg text-espresso-900 font-medium mt-1 mb-1">${item.title}</h3>
          <p class="text-xs text-espresso-600 font-light line-clamp-2">${item.description}</p>
        </div>
        <div class="mt-4 pt-3 border-t border-dashed border-linen flex items-center justify-between">
          <div>
            <span class="block text-[10px] uppercase tracking-wider text-espresso-500">Digital, Print, Pillow &amp; More</span>
            <span class="font-serif text-base font-semibold text-espresso-900">${item.price}</span>
          </div>
          <button onclick="openProductModal('${item.id}')" class="btn-heirloom px-3 py-1.5 rounded text-[11px] uppercase tracking-wider font-medium">
            Select Format
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });
}

// Mobile Menu Logic
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const closeBtn = document.getElementById('closeMobileMenu');
  const menuLinks = document.querySelectorAll('.mobile-nav-link');

  if (!toggleBtn || !mobileMenu) return;

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.add('hidden');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  menuLinks.forEach(link => link.addEventListener('click', closeMenu));
}

// Category Filter Logic
function initCategoryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const productCards = document.querySelectorAll('.product-item');
      filterBtns.forEach(b => {
        b.classList.remove('bg-espresso-800', 'bg-[#2A221E]', 'text-cream-100', 'text-[#FAF7F2]', 'shadow-sm');
        b.classList.add('bg-transparent', 'text-espresso-700');
      });
      btn.classList.add('bg-espresso-800', 'text-cream-100', 'shadow-sm');
      btn.classList.remove('bg-transparent', 'text-espresso-700');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || filter === category) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.96)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });
}

// Interactive Affirmation Card Flipper
function initVerseCardFlipper() {
  const flipper = document.getElementById('flipperContainer');
  const flipBtn = document.getElementById('flipCardBtn');
  const nextVerseBtn = document.getElementById('nextVerseBtn');
  const verseText = document.getElementById('verseQuoteText');
  const verseTheme = document.getElementById('verseThemeText');
  const verseNum = document.getElementById('verseNumText');

  if (!flipper || !flipBtn) return;

  flipBtn.addEventListener('click', () => {
    flipper.classList.toggle('card-flipped');
  });

  if (nextVerseBtn) {
    nextVerseBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentCardIndex = (currentCardIndex + 1) % affirmationDeck.length;
      const nextCard = affirmationDeck[currentCardIndex];

      if (verseText) {
        verseText.style.opacity = '0';
        verseTheme.style.opacity = '0';
        setTimeout(() => {
          verseText.textContent = `"${nextCard.quote}"`;
          verseTheme.textContent = nextCard.theme;
          if (verseNum) verseNum.textContent = nextCard.verseNum;
          verseText.style.opacity = '1';
          verseTheme.style.opacity = '1';
        }, 200);
      }
      showToast(`Now displaying: ${nextCard.theme}`);
    });
  }
}

// Quick View & Multi-Product Format Studio Modal
function initQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  const modalClose = document.getElementById('closeQuickView');
  const modalImage = document.getElementById('modalProductImage');
  const modalSku = document.getElementById('modalProductSku');
  const modalSwitcher = document.getElementById('modalImageSwitcher');
  const modalCategory = document.getElementById('modalProductCategory');
  const modalTitle = document.getElementById('modalProductTitle');
  const modalPrice = document.getElementById('modalProductPrice');
  const modalFulfillment = document.getElementById('modalFulfillmentNote');
  const modalDesc = document.getElementById('modalProductDesc');
  const modalVerse = document.getElementById('modalProductVerse');
  const modalFormatSelector = document.getElementById('modalFormatSelector');
  const modalDirectOrderBtn = document.getElementById('modalDirectOrderBtn');
  const modalEtsyBtn = document.getElementById('modalEtsyBtn');

  if (!modal) return;

  let activeProduct = null;
  let activeFormat = productFormats[0];

  function selectFormat(fmt) {
    activeFormat = fmt;
    const baseSku = activeProduct.sku || activeProduct.id.toUpperCase();
    const fullSku = `${baseSku}-${fmt.code}`;
    if (modalSku) modalSku.textContent = `SKU: ${fullSku}`;
    if (modalPrice) modalPrice.textContent = fmt.priceDisplay;
    if (modalFulfillment) modalFulfillment.textContent = fmt.fulfillment;

    // Highlight active format button
    if (modalFormatSelector) {
      const buttons = modalFormatSelector.querySelectorAll('button');
      buttons.forEach(b => {
        if (b.getAttribute('data-fmt') === fmt.code) {
          b.className = 'text-left px-3 py-2 rounded border border-wax bg-espresso-800 text-cream-100 text-[11px] font-medium transition-all flex items-center justify-between shadow-sm';
        } else {
          b.className = 'text-left px-3 py-2 rounded border border-linen bg-cream-100 text-espresso-800 hover:border-stitch text-[11px] font-light transition-all flex items-center justify-between';
        }
      });
    }
  }

  window.openProductModal = function(productId) {
    const product = productsData.find(p => p.id.toLowerCase() === productId.toLowerCase() || (p.sku && p.sku.toLowerCase() === productId.toLowerCase()));
    if (!product) return;

    activeProduct = product;
    modalImage.src = product.image;
    modalImage.alt = product.title;
    modalCategory.textContent = product.categoryName;
    modalTitle.textContent = product.title;
    modalDesc.textContent = product.description;
    modalVerse.textContent = `"${product.verse}"`;
    modalEtsyBtn.href = 'https://quietpathliving.etsy.com?coupon=QUIET15';

    // Build Image View Switcher (Artwork vs. Lifestyle Mockup vs. Pinterest Pin)
    if (modalSwitcher) {
      modalSwitcher.innerHTML = '';
      const views = [{ label: 'Master Artwork', src: product.image }];
      if (product.mockupImage) views.push({ label: 'Room / Product Mockup', src: product.mockupImage });
      if (product.pinImage) views.push({ label: 'Pinterest Card', src: product.pinImage });

      if (views.length > 1) {
        views.forEach((v, idx) => {
          const btn = document.createElement('button');
          btn.type = 'button';
          btn.className = idx === 0
            ? 'px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-medium bg-espresso-800 text-cream-100 border border-espresso-800'
            : 'px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-medium bg-cream-100 text-espresso-700 border border-linen hover:bg-cream-200';
          btn.textContent = v.label;
          btn.addEventListener('click', () => {
            modalImage.src = v.src;
            Array.from(modalSwitcher.children).forEach(c => {
              c.className = 'px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-medium bg-cream-100 text-espresso-700 border border-linen hover:bg-cream-200';
            });
            btn.className = 'px-2.5 py-1 rounded text-[10px] uppercase tracking-wider font-medium bg-espresso-800 text-cream-100 border border-espresso-800';
          });
          modalSwitcher.appendChild(btn);
        });
      }
    }

    // Build 7-Format Selector Buttons
    if (modalFormatSelector) {
      modalFormatSelector.innerHTML = '';
      productFormats.forEach(fmt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.setAttribute('data-fmt', fmt.code);
        btn.innerHTML = `
          <span class="truncate pr-2">${fmt.shortName}</span>
          <span class="font-serif font-semibold">${fmt.priceDisplay}</span>
        `;
        btn.addEventListener('click', () => selectFormat(fmt));
        modalFormatSelector.appendChild(btn);
      });
    }

    const defaultFmt = productFormats.find(f => f.code === product.defaultFormat) || productFormats[0];
    selectFormat(defaultFmt);

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  if (modalDirectOrderBtn) {
    modalDirectOrderBtn.addEventListener('click', () => {
      if (!activeProduct || !activeFormat) return;
      const baseSku = activeProduct.sku || activeProduct.id.toUpperCase();
      const fullSku = `${baseSku}-${activeFormat.code}`;
      const discounted = (activeFormat.price * 0.85).toFixed(2);

      closeModal();

      const topicSelect = document.getElementById('contactTopic');
      const msgBox = document.getElementById('contactMessage');
      const contactSection = document.getElementById('contact');

      if (topicSelect) topicSelect.value = 'order';
      if (msgBox) {
        msgBox.value =
          `Direct Order Request (Code QUIET15 Applied - 15% Off):\n` +
          `• Artwork: ${activeProduct.title}\n` +
          `• Product Format: ${activeFormat.name}\n` +
          `• SKU: ${fullSku}\n` +
          `• Retail Price: ${activeFormat.priceDisplay} (With QUIET15: $${discounted})\n\n` +
          `Please send my direct checkout / payment link for this item!`;
      }
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
      showToast(`Selected ${activeFormat.shortName} (${fullSku}) — Complete your direct order below!`);
    });
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

// Automatically open artwork modal when arriving from a Pinterest Pin (?sku=QPL-WIN-001)
function checkUrlDeepLink() {
  const params = new URLSearchParams(window.location.search);
  const sku = params.get('sku') || params.get('item');
  if (sku && typeof window.openProductModal === 'function') {
    setTimeout(() => {
      window.openProductModal(sku);
    }, 300);
  }
}

// Lead Magnet & Newsletter Modal / Reward
function initLeadMagnet() {
  const form = document.getElementById('newsletterForm');
  const rewardModal = document.getElementById('newsletterRewardModal');
  const closeReward = document.getElementById('closeRewardModal');
  const copyCodeBtn = document.getElementById('copyCodeBtn');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletterEmail');
      if (!emailInput || !emailInput.value.trim()) return;

      const email = emailInput.value.trim();

      // Persist subscriber locally so leads are never lost
      try {
        const list = JSON.parse(localStorage.getItem('qpl_subscribers') || '[]');
        if (!list.some(entry => entry.email === email)) {
          list.push({ email, timestamp: new Date().toISOString(), source: window.location.search || 'direct' });
          localStorage.setItem('qpl_subscribers', JSON.stringify(list));
        }
      } catch (_) {}

      if (rewardModal) {
        rewardModal.classList.remove('hidden');
        rewardModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
      }

      showToast(`Welcome! Free printable & code QUIET15 unlocked for ${email}`);
      form.reset();
    });
  }

  if (closeReward && rewardModal) {
    closeReward.addEventListener('click', () => {
      rewardModal.classList.add('hidden');
      rewardModal.classList.remove('flex');
      document.body.style.overflow = '';
    });
    rewardModal.addEventListener('click', (e) => {
      if (e.target === rewardModal) {
        rewardModal.classList.add('hidden');
        rewardModal.classList.remove('flex');
        document.body.style.overflow = '';
      }
    });
  }

  if (copyCodeBtn) {
    copyCodeBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('QUIET15').then(() => {
        copyCodeBtn.innerHTML = `
          <svg class="w-4 h-4 mr-1 text-[#75816F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          Copied: QUIET15
        `;
        showToast('Coupon code QUIET15 copied to clipboard!');
        setTimeout(() => {
          copyCodeBtn.innerHTML = `
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
            </svg>
            Copy Code (QUIET15)
          `;
        }, 3000);
      });
    });
  }
}

// Contact & Direct Order Form Handler
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value || 'Friend';
    const email = document.getElementById('contactEmail')?.value || '';
    const topic = document.getElementById('contactTopic')?.value || 'general';
    const message = document.getElementById('contactMessage')?.value || '';

    try {
      const orders = JSON.parse(localStorage.getItem('qpl_inquiries') || '[]');
      orders.push({ name, email, topic, message, timestamp: new Date().toISOString() });
      localStorage.setItem('qpl_inquiries', JSON.stringify(orders));
    } catch (_) {}

    const subject = encodeURIComponent(`Quiet Path Living [${topic.toUpperCase()}] from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`);
    window.location.href = `mailto:hello@quietpathliving.com?subject=${subject}&body=${body}`;

    showToast(`Thank you, ${name}. Opening your email client to send your request to Quiet Path Living!`);
    contactForm.reset();
  });
}

// Toast System Initialization
function initToastSystem() {}

// Toast Notification Helper
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'bg-[#2A221E] text-[#FAF7F2] px-5 py-3 rounded-sm shadow-xl flex items-center space-x-3 border border-[#B59E87] transform transition-all duration-300 translate-y-4 opacity-0 text-sm font-medium';
  toast.innerHTML = `
    <span class="inline-block w-2 h-2 rounded-full bg-[#B59E87]"></span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}
