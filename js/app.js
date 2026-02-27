/* ========================================================================
   PREMIUM CAFÉ — APP.JS
   Animations, Interactivity, Menu Data, Particles & Smooth Scroll
   ======================================================================== */

/* ---------- MENU DATA ---------- */
const CATEGORY_IMAGES = {
  espresso: 'assets/images/menu_espresso.png',
  signature: 'assets/images/menu_signature.png',
  seasonal: 'assets/images/menu_seasonal.png',
  pastries: 'assets/images/menu_pastries.png',
  brunch: 'assets/images/menu_brunch.png',
};

const MENU_DATA = {
  espresso: [
    { name: 'Classic Espresso', desc: 'Bold, full-bodied with a velvety crema finish', price: '₱120', badge: false },
    { name: 'Café Americano', desc: 'Smooth espresso diluted with hot water for a clean taste', price: '₱130', badge: false },
    { name: 'Flat White', desc: 'Double ristretto with silky microfoam, Australian-style', price: '₱165', badge: true },
    { name: 'Cappuccino', desc: 'Equal parts espresso, steamed milk, and dense foam', price: '₱155', badge: false },
    { name: 'Cortado', desc: 'Espresso cut with warm milk — balanced and elegant', price: '₱145', badge: false },
    { name: 'Double Shot Macchiato', desc: 'Intense espresso stained with a kiss of foam', price: '₱140', badge: false },
  ],
  signature: [
    { name: 'Golden Hour Latte', desc: 'Turmeric, oat milk, vanilla bean & espresso — our bestseller', price: '₱195', badge: true },
    { name: 'Velvet Mocha', desc: 'Belgian dark chocolate melted into a double shot with cream', price: '₱185', badge: false },
    { name: 'Coco Caramel Cloud', desc: 'Coconut milk, house caramel, cold brew & meringue foam', price: '₱195', badge: true },
    { name: 'Honey Rosemary Latte', desc: 'Fresh rosemary-infused honey with steamed milk & espresso', price: '₱180', badge: false },
    { name: 'Matcha Ceremonia', desc: 'Ceremonial-grade Uji matcha whisked with oat milk', price: '₱190', badge: false },
    { name: 'Lavender Dream', desc: 'French lavender syrup, vanilla, steamed milk & espresso', price: '₱185', badge: false },
  ],
  seasonal: [
    { name: 'Mango Sunrise Cold Brew', desc: 'Philippine mango purée layered over 18-hour cold brew', price: '₱210', badge: true },
    { name: 'Ube Velvet Latte', desc: 'Purple yam from Bohol blended with espresso & cream', price: '₱200', badge: true },
    { name: 'Calamansi Espresso Tonic', desc: 'Sparkling tonic, fresh calamansi & single-origin espresso', price: '₱195', badge: false },
    { name: 'Pandan Coconut Frappé', desc: 'Pandan-infused coconut cream blended with cold brew ice', price: '₱210', badge: false },
  ],
  pastries: [
    { name: 'Burnt Basque Cheesecake', desc: 'Creamy, caramelized crust — served warm with sea salt', price: '₱185', badge: true },
    { name: 'Almond Croissant', desc: 'Twice-baked French croissant with frangipane & toasted almonds', price: '₱155', badge: false },
    { name: 'Matcha Financier', desc: 'Delicate French almond cake with ceremonial matcha glaze', price: '₱135', badge: false },
    { name: 'Dark Chocolate Kouign-Amann', desc: 'Buttery Breton pastry with Valrhona dark chocolate', price: '₱165', badge: false },
    { name: 'Cinnamon Cardamom Roll', desc: 'Spiced brioche roll with cream cheese frosting', price: '₱145', badge: false },
  ],
  brunch: [
    { name: 'Artisan Eggs Benedict', desc: 'Poached eggs, hollandaise, smoked salmon on sourdough', price: '₱295', badge: true },
    { name: 'Avocado Toast Luxe', desc: 'Smashed avo, poached eggs, dukkah, microgreens on rye', price: '₱265', badge: false },
    { name: 'Shakshuka', desc: 'Spiced tomato, baked eggs, feta & warm pita bread', price: '₱255', badge: false },
    { name: 'Ricotta Hotcakes', desc: 'Fluffy ricotta pancakes, honeycomb butter & berry compote', price: '₱245', badge: false },
    { name: 'The Surigao Breakfast', desc: 'Sourdough, eggs your way, bacon, roasted tomato, greens', price: '₱325', badge: true },
  ],
};

/* ---------- Currently active category (for image lookup) ---------- */
let activeCategory = 'espresso';

/* ---------- HELPER: Render Menu Items ---------- */
function renderMenuItems(category) {
  const grid = document.getElementById('menuGrid');
  if (!grid) return;

  activeCategory = category;
  const items = MENU_DATA[category] || [];
  const categoryImage = CATEGORY_IMAGES[category];
  grid.classList.add('fading');

  setTimeout(() => {
    grid.innerHTML = items.map((item, idx) => `
      <div class="menu-card" data-idx="${idx}" data-category="${category}">
        <div class="menu-card-image">
          <img src="${categoryImage}" alt="${item.name}" loading="lazy">
          <span class="menu-card-view">View</span>
        </div>
        <div class="menu-card-body">
          <div class="menu-card-header">
            <span class="menu-card-name">${item.name}</span>
            <span class="menu-card-price">${item.price}</span>
          </div>
          <p class="menu-card-desc">${item.desc}</p>
          ${item.badge ? `
            <div class="menu-card-badge">
              <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Barista's Signature
            </div>
          ` : ''}
        </div>
      </div>
    `).join('');

    grid.classList.remove('fading');

    // Animate cards in
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(grid.querySelectorAll('.menu-card'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out' }
      );
    }

    // Attach card click handlers for modal
    grid.querySelectorAll('.menu-card').forEach(card => {
      card.addEventListener('click', () => {
        const cat = card.dataset.category;
        const idx = parseInt(card.dataset.idx);
        const item = MENU_DATA[cat][idx];
        if (item) openMenuModal(item, CATEGORY_IMAGES[cat]);
      });
    });
  }, 350);
}

/* ---------- MODAL FUNCTIONS ---------- */
function openMenuModal(item, imageSrc) {
  const overlay = document.getElementById('menuModal');
  const img = document.getElementById('modalImage');
  const name = document.getElementById('modalName');
  const price = document.getElementById('modalPrice');
  const desc = document.getElementById('modalDesc');
  const badge = document.getElementById('modalBadge');

  img.src = imageSrc;
  img.alt = item.name;
  name.textContent = item.name;
  price.textContent = item.price;
  desc.textContent = item.desc;
  badge.classList.toggle('hidden', !item.badge);

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMenuModal() {
  const overlay = document.getElementById('menuModal');
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function initMenuModal() {
  const overlay = document.getElementById('menuModal');
  const closeBtn = document.getElementById('modalClose');

  if (closeBtn) closeBtn.addEventListener('click', closeMenuModal);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeMenuModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenuModal();
  });
}

/* ---------- INIT: Menu Tabs ---------- */
function initMenuTabs() {
  const tabs = document.querySelectorAll('.menu-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderMenuItems(tab.dataset.category);
    });
  });
  // Render default
  renderMenuItems('espresso');
}

/* ---------- INIT: Navbar Scroll ---------- */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* ---------- INIT: Mobile Menu Toggle ---------- */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open');
    links.classList.toggle('open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      toggle.classList.remove('open');
      links.classList.remove('open');
    });
  });
}

/* ---------- INIT: Hero Particles ---------- */
function initParticles() {
  const canvas = document.getElementById('hero-particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.floor(window.innerWidth / 18);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: -Math.random() * 0.4 - 0.1,
        opacity: Math.random() * 0.35 + 0.05,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(203, 184, 157, ${p.opacity})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      // Wrap around
      if (p.y < -5) { p.y = canvas.height + 5; p.x = Math.random() * canvas.width; }
      if (p.x < -5) p.x = canvas.width + 5;
      if (p.x > canvas.width + 5) p.x = -5;
    });
    animFrame = requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  draw();

  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });
}

/* ---------- INIT: Hero Animations ---------- */
function initHeroAnimations() {
  const hero = document.querySelector('.hero');
  if (!hero || typeof gsap === 'undefined') return;

  // Mark as loaded for CSS Ken Burns effect
  setTimeout(() => hero.classList.add('loaded'), 100);

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.to('.hero-tagline', { opacity: 1, y: 0, duration: 0.8, delay: 0.3 })
    .to('.hero-title', { opacity: 1, y: 0, duration: 0.9 }, '-=0.4')
    .to('.hero-subtitle', { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
    .to('.hero-ctas', { opacity: 1, y: 0, duration: 0.7 }, '-=0.3')
    .to('#scrollIndicator', { opacity: 1, y: 0, duration: 0.6 }, '-=0.2');

  // Set initial y offsets
  gsap.set(['.hero-tagline', '.hero-title', '.hero-subtitle', '.hero-ctas', '#scrollIndicator'], {
    y: 30,
  });
}

/* ---------- INIT: Scroll Reveal (GSAP ScrollTrigger) ---------- */
function initScrollReveal() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el, i) => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          toggleActions: 'play none none none',
        },
      }
    );
  });

  // Gallery stagger
  const galleryItems = document.querySelectorAll('.gallery-item');
  if (galleryItems.length) {
    gsap.fromTo(galleryItems,
      { opacity: 0, y: 50, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#galleryGrid',
          start: 'top 85%',
        },
      }
    );
  }

  // Parallax hero image
  gsap.to('.hero-bg img', {
    yPercent: 20,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    },
  });
}

/* ---------- INIT: Lenis Smooth Scroll ---------- */
let lenisInstance = null;

function initSmoothScroll() {
  if (typeof Lenis === 'undefined') return;

  lenisInstance = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 1,
  });

  // Use GSAP ticker as the SOLE driver for Lenis (no separate RAF loop)
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    lenisInstance.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenisInstance.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);
  } else {
    // Fallback if GSAP isn't loaded
    function raf(time) {
      lenisInstance.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }
}

/* ---------- INIT: Live Open/Closed Status ---------- */
function initLiveStatus() {
  const statusEl = document.getElementById('liveStatus');
  if (!statusEl) return;

  function update() {
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 6=Sat
    const h = now.getHours();
    const m = now.getMinutes();
    const time = h + m / 60;

    let isOpen = false;
    if (day >= 1 && day <= 5) {
      // Mon-Fri: 7 AM - 10 PM
      isOpen = time >= 7 && time < 22;
    } else if (day === 6) {
      // Sat: 8 AM - 11 PM
      isOpen = time >= 8 && time < 23;
    } else {
      // Sun: 8 AM - 9 PM
      isOpen = time >= 8 && time < 21;
    }

    if (isOpen) {
      statusEl.className = 'location-status open';
      statusEl.innerHTML = '<div class="status-dot"></div><span>Open Now</span>';
    } else {
      statusEl.className = 'location-status closed';
      statusEl.innerHTML = '<div class="status-dot"></div><span>Closed</span>';
    }
  }

  update();
  setInterval(update, 60000);
}

/* ---------- INIT: Reservation Form ---------- */
function initReservationForm() {
  const form = document.getElementById('reservationForm');
  const btn = document.getElementById('submitReservation');
  if (!form || !btn) return;

  btn.addEventListener('click', () => {
    const name = document.getElementById('resName').value.trim();
    const date = document.getElementById('resDate').value;
    const time = document.getElementById('resTime').value;
    const guests = document.getElementById('resGuests').value;

    if (!name || !date || !time || !guests) {
      btn.textContent = 'Please Fill All Fields';
      btn.style.background = 'linear-gradient(135deg, #c44, #a33)';
      setTimeout(() => {
        btn.textContent = 'Reserve Now';
        btn.style.background = '';
      }, 2000);
      return;
    }

    btn.textContent = 'Reservation Confirmed ✓';
    btn.style.background = 'linear-gradient(135deg, #3a9e3a, #2d7e2d)';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = 'Reserve Now';
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 3000);
  });
}

/* ---------- INIT: Smooth Anchor Links ---------- */
function initAnchorLinks() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const hash = anchor.getAttribute('href');
      if (hash === '#') return;
      e.preventDefault();
      const target = document.querySelector(hash);
      if (!target) return;

      // Use Lenis for smooth scroll if available, otherwise fallback
      if (lenisInstance) {
        lenisInstance.scrollTo(target, { offset: 0, duration: 1.2 });
      } else {
        window.scrollTo({
          top: target.offsetTop,
          behavior: 'smooth',
        });
      }
    });
  });
}

/* ---------- BOOT ---------- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initMenuTabs();
  initMenuModal();
  initParticles();
  initHeroAnimations();
  initLiveStatus();
  initReservationForm();

  // Init smooth scroll + scroll reveals once GSAP/Lenis are ready
  setTimeout(() => {
    initSmoothScroll();
    initScrollReveal();
    // Anchor links MUST init after Lenis so they use lenis.scrollTo()
    initAnchorLinks();
  }, 300);
});
