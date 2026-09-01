/**
 * Quiet Path Living - Main JavaScript Interaction Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initCategoryFilters();
  initVerseCardFlipper();
  initLeadMagnet();
  initContactForm();
  initQuickViewModal();
  initToastSystem();
});

// Product Data
const productsData = [
  {
    id: 'm1',
    category: 'morning',
    title: 'Morning Light Linen Affirmation Tags (Set of 6)',
    categoryName: 'Morning Rituals',
    price: '$18.00',
    description: 'Tied with raw silk cord, these slow-morning affirmation tags are printed on 300gsm deckle-edge cotton paper. Designed to rest against your coffee mug or hang near your morning pour-over.',
    verse: 'Breathe in grace, step gently into the morning.',
    image: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    badge: 'Bestseller'
  },
  {
    id: 'm2',
    category: 'morning',
    title: 'Slow Mornings Oak Framed Verse Sign',
    categoryName: 'Morning Rituals',
    price: '$34.00',
    description: 'A handcrafted solid oak wood frame with archival museum glass encasing our signature slow-morning verse. Designed for kitchen ledges, coffee bars, and breakfast nooks.',
    verse: 'May this table hold laughter, warm cups, and quiet peace.',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    badge: 'Handcrafted'
  },
  {
    id: 'b1',
    category: 'bedside',
    title: 'Evening Solace Poetry Print (8x10")',
    categoryName: 'Bedside & Rest',
    price: '$22.00',
    description: 'An unhurried poem on nightfall, restful slumber, and releasing the day. Printed on tactile handmade cream cardstock with subtle gold-embossed heirloom stitch border.',
    verse: 'Lay down your striving; let the quiet of the night mend your soul.',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80',
    badge: 'Mindful Favorite'
  },
  {
    id: 'b2',
    category: 'bedside',
    title: 'Nightstand Slumber Blessing Cards',
    categoryName: 'Bedside & Rest',
    price: '$16.00',
    description: 'A boxed deck of 12 quiet evening verses with a miniature brass easel stand. Set one out each evening before turning down the lamps.',
    verse: 'Peace be to this room, and grace to all who rest here.',
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    badge: 'Heirloom Gift'
  },
  {
    id: 't1',
    category: 'tabletop',
    title: 'Heirloom Linen Place Cards (Set of 10)',
    categoryName: 'Tabletop & Vintage',
    price: '$20.00',
    description: 'Featuring hand-stitched border motifs and warm espresso calligraphy. Ideal for intimate dinner parties, holiday gatherings, and memorable Sunday tables.',
    verse: 'Gather with gratitude. There is always a place for you here.',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=800&q=80',
    badge: 'Host Essential'
  },
  {
    id: 't2',
    category: 'tabletop',
    title: 'Vintage Botanical Verse Accent Plaque',
    categoryName: 'Tabletop & Vintage',
    price: '$28.00',
    description: 'A freestanding antique brass and glass display featuring pressed meadow florals alongside mindful hospitality words.',
    verse: 'A joyful home is built of quiet moments and grateful hearts.',
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    badge: 'Artisan Decor'
  },
  {
    id: 'd1',
    category: 'digital',
    title: 'Complete Morning & Evening Affirmation PDF Bundle',
    categoryName: 'Digital Studio',
    price: '$12.00',
    description: 'Instant download vector PDF kit with 24 high-resolution printable cards, cut guides for standard 3x5 and 5x7 cardstock, and printing tips for archival results.',
    verse: 'Instant access. Print at home on your favorite linen or cotton cardstock.',
    image: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80',
    badge: 'Instant Download'
  },
  {
    id: 'd2',
    category: 'digital',
    title: 'Heirloom Table Blessing Printable Sheets',
    categoryName: 'Digital Studio',
    price: '$8.00',
    description: 'Printable place cards, menu accents, and hospitality verses with delicate hand-drawn heirloom border designs ready for scissors or rotary cutter.',
    verse: 'Download instantly and create a tranquil table setting in minutes.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
    badge: 'Printable PDF'
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
    theme: 'Warm Gatherings',
    quote: 'May this table hold honest laughter, warm cups, and the quiet comfort of being known.',
    verseNum: '02 / 06'
  },
  {
    theme: 'Evening Rest',
    quote: 'Lay down your striving. Let the stillness of twilight gently mend the hurry of the day.',
    verseNum: '03 / 06'
  },
  {
    theme: 'Mindful Home',
    quote: 'A peaceful home is not absence of noise, but the presence of patient love and quiet beauty.',
    verseNum: '04 / 06'
  },
  {
    theme: 'Daily Grace',
    quote: 'Wherever you are standing right now, there is enough beauty to hold your heart steady.',
    verseNum: '05 / 06'
  },
  {
    theme: 'Patience & Craft',
    quote: 'Good things take root in quiet soil. Tend your hours with gentle hands.',
    verseNum: '06 / 06'
  }
];

let currentCardIndex = 0;

// Mobile Navigation
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
  const productCards = document.querySelectorAll('.product-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => {
        b.classList.remove('bg-[#2A221E]', 'text-[#FAF7F2]', 'shadow-sm');
        b.classList.add('bg-transparent', 'text-[#3C302A]');
      });
      btn.classList.add('bg-[#2A221E]', 'text-[#FAF7F2]', 'shadow-sm');
      btn.classList.remove('bg-transparent', 'text-[#3C302A]');

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
      
      // Gentle fade transition
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

// Quick View Modal
function initQuickViewModal() {
  const modal = document.getElementById('quickViewModal');
  const modalClose = document.getElementById('closeQuickView');
  const modalImage = document.getElementById('modalProductImage');
  const modalCategory = document.getElementById('modalProductCategory');
  const modalTitle = document.getElementById('modalProductTitle');
  const modalPrice = document.getElementById('modalProductPrice');
  const modalDesc = document.getElementById('modalProductDesc');
  const modalVerse = document.getElementById('modalProductVerse');
  const modalEtsyBtn = document.getElementById('modalEtsyBtn');

  if (!modal) return;

  window.openProductModal = function(productId) {
    const product = productsData.find(p => p.id === productId);
    if (!product) return;

    modalImage.src = product.image;
    modalImage.alt = product.title;
    modalCategory.textContent = product.categoryName;
    modalTitle.textContent = product.title;
    modalPrice.textContent = product.price;
    modalDesc.textContent = product.description;
    modalVerse.textContent = `"${product.verse}"`;
    modalEtsyBtn.href = "https://www.etsy.com/shop/QuietPathLiving";

    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
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
      
      // Open Reward Modal
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

// Contact Form Simulation
function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contactName')?.value || 'Friend';
    showToast(`Thank you, ${name}. Your message has been sent with quiet grace.`);
    contactForm.reset();
  });
}

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

  // Animate in
  setTimeout(() => {
    toast.classList.remove('translate-y-4', 'opacity-0');
  }, 10);

  // Remove after 4s
  setTimeout(() => {
    toast.classList.add('opacity-0', 'translate-y-2');
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 4000);
}
