const products = [
  {
    id: "standard-business-cards",
    name: "Standard Business Cards",
    category: "OFFSET PRINTING",
    desc: "Clean everyday cards for founders, teams, retail counters, and events.",
    price: 75,
    badge: "Popular",
    img: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?q=80&w=900&auto=format&fit=crop",
    options: ["Matt or gloss", "Premium stock", "Rounded corners"],
  },
  {
    id: "premium-business-cards",
    name: "Premium Business Cards",
    category: "OFFSET PRINTING",
    desc: "Textured, kraft, shimmer, waterproof, foil, and spot UV card options.",
    price: 145,
    badge: "Premium",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop",
    options: ["Foil", "Spot UV", "Textured paper"],
  },
  {
    id: "flyers-leaflets",
    name: "Flyers & Leaflets",
    category: "OFFSET PRINTING",
    desc: "Standard, express, laminated, kraft, square, waterproof, and folded flyers.",
    price: 95,
    badge: "Campaign",
    img: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=900&auto=format&fit=crop",
    options: ["A6 to A3", "Gloss or matt", "Folded"],
  },
  {
    id: "booklets-catalogues",
    name: "Booklets & Catalogues",
    category: "OFFSET PRINTING",
    desc: "Stapled booklets, company profiles, glue-bound catalogues, and brochures.",
    price: 180,
    badge: "Branding",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=900&auto=format&fit=crop",
    options: ["Stapled", "Glue-bound", "Profiles"],
  },
  {
    id: "stickers-labels",
    name: "Stickers & Labels",
    category: "UV PRINTING",
    desc: "Round, square, paper, waterproof, and custom-shape stickers for brands.",
    price: 70,
    badge: "Labels",
    img: "https://images.unsplash.com/photo-1607703703520-bb638e84caf2?q=80&w=900&auto=format&fit=crop",
    options: ["Any shape", "Waterproof", "Kiss-cut"],
  },
  {
    id: "rollup-banners",
    name: "Roll-up Banners",
    category: "UV PRINTING",
    desc: "Portable roll-up displays for exhibitions, counters, launches, and offices.",
    price: 220,
    badge: "Events",
    img: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=900&auto=format&fit=crop",
    options: ["Normal base", "Premium base", "Custom sizes"],
  },
  {
    id: "foam-board-panels",
    name: "Foam Board Panels",
    category: "UV PRINTING",
    desc: "Rigid display panels for presentations, retail signage, and event stands.",
    price: 85,
    badge: "Display",
    img: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=900&auto=format&fit=crop",
    options: ["5mm", "10mm", "Mounted print"],
  },
  {
    id: "corporate-gifts",
    name: "Laser Branded Gifts",
    category: "LASER PRINTING",
    desc: "Precision-marked corporate gifts, plaques, notebooks, tags, desk pieces, and branded keepsakes.",
    price: 12,
    badge: "Laser",
    img: "assets/laser-samples/laser-corporate-gift-set.jpeg",
    options: ["Logo print", "Gift sets", "Bulk orders"],
  },
  {
    id: "laser-wooden-signs",
    name: "Laser Wooden Signs & Plaques",
    category: "LASER PRINTING",
    desc: "Wooden QR plaques, table signs, wall pieces, wayfinding signs, and custom engraved decor.",
    price: 85,
    badge: "Engraved",
    img: "assets/laser-samples/laser-restaurant-table-signs.jpeg",
    options: ["QR plaques", "Table signs", "Wall decor"],
  },
  {
    id: "tshirts-polos",
    name: "T-shirts & Polos",
    category: "DIRECT TO FILM (DTF)",
    desc: "Round neck shirts, heavyweight shirts, kids shirts, and branded polos.",
    price: 55,
    badge: "Apparel",
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=900&auto=format&fit=crop",
    options: ["T-shirts", "Polos", "Team wear"],
  },
  {
    id: "retail-packaging",
    name: "Retail Product Boxes",
    category: "OFFSET PRINTING",
    desc: "Retail boxes, interlock formats, custom shapes, and countertop displays.",
    price: 250,
    badge: "Packaging",
    img: "https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=900&auto=format&fit=crop",
    options: ["Custom dieline", "Retail ready", "Display boxes"],
  },
  {
    id: "food-packaging",
    name: "Food Packaging",
    category: "OFFSET PRINTING",
    desc: "Fast food boxes, bakery boxes, greaseproof wrappers, cups, and paper bags.",
    price: 190,
    badge: "Food",
    img: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=900&auto=format&fit=crop",
    options: ["Bakery", "Takeaway", "Paper bags"],
  },
  {
    id: "embroidered-uniforms",
    name: "Embroidered Uniforms",
    category: "EMBROIDERY",
    desc: "Thread-embroidered logos for polos, caps, uniforms, aprons, workwear, bags, and towels.",
    price: 35,
    badge: "Thread",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=900&auto=format&fit=crop",
    options: ["Polos", "Caps", "Uniforms"],
  },
  {
    id: "silk-screen-branded-merch",
    name: "Silk Screen Branded Merchandise",
    category: "SILK SCREEN PRINTING",
    desc: "Durable spot-colour prints for tote bags, apparel, packaging, labels, and promotional items.",
    price: 45,
    badge: "Screen",
    img: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?q=80&w=900&auto=format&fit=crop",
    options: ["Tote bags", "Apparel", "Bulk branding"],
  },
];

const productGrid = document.querySelector("#productGrid");
const siteHeader = document.querySelector("#siteHeader");
const filters = document.querySelectorAll(".filter");
const galleryFilters = document.querySelectorAll(".gallery-filter");
const galleryItems = Array.from(document.querySelectorAll("[data-gallery-category]"));
const lightbox = document.querySelector("#galleryLightbox");
const lightboxImage = document.querySelector("#lightboxImage");
const lightboxCaption = document.querySelector("#lightboxCaption");
const lightboxCloseButtons = document.querySelectorAll("[data-lightbox-close]");
const lightboxPrev = document.querySelector("[data-lightbox-prev]");
const lightboxNext = document.querySelector("[data-lightbox-next]");
const quoteForm = document.querySelector("#quoteForm");
const serviceSelect = quoteForm?.querySelector('select[name="service"]');
let activeGalleryIndex = 0;
let lastFocusedElement = null;

function money(value) {
  return `AED ${value.toLocaleString("en-AE")}`;
}

function renderProducts(filter = "all") {
  const shown = filter === "all" ? products : products.filter((product) => product.category === filter);
  productGrid.innerHTML = shown
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-img" style="background-image:url('${product.img}')">
            <span class="product-badge">${product.badge}</span>
          </div>
          <div class="product-body">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <div class="product-options">
              ${product.options.map((option) => `<span>${option}</span>`).join("")}
            </div>
            <div class="product-footer">
              <div class="price">${money(product.price)} <span>starting from</span></div>
              <a class="add-btn" href="#quote">Enquire</a>
            </div>
          </div>
        </article>
      `,
    )
    .join("");
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");
    renderProducts(button.dataset.filter);
  });
});

galleryItems.forEach((item, index) => {
  item.tabIndex = 0;
  item.setAttribute("role", "button");
  item.setAttribute("aria-label", `Open ${item.querySelector("figcaption")?.textContent || "gallery image"}`);

  item.addEventListener("click", () => openLightbox(index));
  item.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openLightbox(index);
    }
  });
});

galleryFilters.forEach((button) => {
  button.addEventListener("click", () => {
    galleryFilters.forEach((filter) => filter.classList.remove("active"));
    button.classList.add("active");

    galleryItems.forEach((item) => {
      const shouldShow = button.dataset.galleryFilter === "all" || item.dataset.galleryCategory === button.dataset.galleryFilter;
      item.classList.toggle("is-hidden", !shouldShow);
    });
  });
});

function getVisibleGalleryItems() {
  return galleryItems.filter((item) => !item.classList.contains("is-hidden"));
}

function updateLightbox(item) {
  const image = item.querySelector("img");
  const caption = item.querySelector("figcaption")?.textContent || image.alt;
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;
  lightboxCaption.textContent = caption;
}

function openLightbox(index) {
  if (!lightbox) return;
  const item = galleryItems[index];
  if (!item || item.classList.contains("is-hidden")) return;

  activeGalleryIndex = getVisibleGalleryItems().indexOf(item);
  lastFocusedElement = document.activeElement;
  updateLightbox(item);
  lightbox.classList.add("open");
  lightbox.setAttribute("aria-hidden", "false");
  document.body.classList.add("lightbox-active");
  lightbox.querySelector(".lightbox-close")?.focus();
}

function closeLightbox() {
  if (!lightbox?.classList.contains("open")) return;
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden", "true");
  document.body.classList.remove("lightbox-active");
  lastFocusedElement?.focus();
}

function moveLightbox(direction) {
  const visibleItems = getVisibleGalleryItems();
  if (!visibleItems.length) return;
  activeGalleryIndex = (activeGalleryIndex + direction + visibleItems.length) % visibleItems.length;
  updateLightbox(visibleItems[activeGalleryIndex]);
}

lightboxCloseButtons.forEach((button) => button.addEventListener("click", closeLightbox));
lightboxPrev?.addEventListener("click", () => moveLightbox(-1));
lightboxNext?.addEventListener("click", () => moveLightbox(1));

document.addEventListener("keydown", (event) => {
  if (!lightbox?.classList.contains("open")) return;

  if (event.key === "Escape") closeLightbox();
  if (event.key === "ArrowLeft") moveLightbox(-1);
  if (event.key === "ArrowRight") moveLightbox(1);

  if (event.key === "Tab") {
    const focusable = Array.from(lightbox.querySelectorAll("button"));
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

function updateHeaderState() {
  siteHeader?.classList.toggle("scrolled", window.scrollY > 12);
}

function showReveals() {
  const revealItems = document.querySelectorAll(".reveal");

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.22 },
  );

  revealItems.forEach((item) => observer.observe(item));
}

document.querySelectorAll("[data-service-quote]").forEach((link) => {
  link.addEventListener("click", () => {
    if (!serviceSelect) return;
    serviceSelect.value = link.dataset.serviceQuote;
  });
});

quoteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(quoteForm);
  const message = [
    "Hi ScienPrintUAE, I would like a print quote.",
    `Name: ${formData.get("name")}`,
    `Contact: ${formData.get("contact")}`,
    `Service: ${formData.get("service")}`,
    `Notes: ${formData.get("notes") || "No notes"}`,
  ].join("\n");

  navigator.clipboard
    ?.writeText(message)
    .then(() => alert("Your enquiry is copied. Send it to ScienPrintUAE on Instagram."))
    .catch(() => alert(message));
});

window.addEventListener("scroll", updateHeaderState, { passive: true });
updateHeaderState();
showReveals();
renderProducts();
