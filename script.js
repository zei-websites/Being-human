/* =========================================================
   Being Human Kids Wear
   1) Edit SHOP below: phone, email, address, hours, map, social links.
      It updates every place on the page automatically.
   ========================================================= */
const SHOP = {
  phone: "+91 00000 00000",
  email: "hello@yourshop.com",
  address: "Shop No. __, Street Name, Landmark, City, State - PIN Code",
  hours: "10:00 AM - 9:00 PM",
  // Google Maps: type the shop address / name here (used for the map and directions)
  mapQuery: "Being Human Kids Wear",
  // Optional: paste the src="..." link from Google Maps > Share > Embed a map.
  // If filled, it overrides mapQuery for the embedded map.
  mapEmbedSrc: "",
  instagram: "https://www.instagram.com/",
  facebook: "https://www.facebook.com/"
};

/* ---------- fill text + links from SHOP ---------- */
document.querySelectorAll("[data-shop]").forEach(el => {
  const v = SHOP[el.dataset.shop];
  if (v) el.textContent = v;
});

const hrefs = {
  tel: "tel:" + SHOP.phone.replace(/[^\d+]/g, ""),
  mailto: "mailto:" + SHOP.email,
  directions: "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(SHOP.mapQuery),
  instagram: SHOP.instagram,
  facebook: SHOP.facebook
};
document.querySelectorAll("[data-shop-href]").forEach(el => {
  const h = hrefs[el.dataset.shopHref];
  if (h) el.setAttribute("href", h);
});

/* ---------- Google map ---------- */
const mapFrame = document.getElementById("map-frame");
if (mapFrame) {
  mapFrame.src = SHOP.mapEmbedSrc ||
    "https://www.google.com/maps?q=" + encodeURIComponent(SHOP.mapQuery) + "&output=embed";
}

/* ---------- image slots: hide placeholder when the image loads ---------- */
document.querySelectorAll(".photo img").forEach(img => {
  const slot = img.parentElement;
  const ok = () => slot.classList.add("has-img");
  const fail = () => { img.classList.add("is-broken"); slot.classList.remove("has-img"); };
  img.addEventListener("load", ok);
  img.addEventListener("error", fail);
  if (img.complete) (img.naturalWidth > 0 ? ok : fail)();
});

/* ---------- mobile menu ---------- */
const toggle = document.querySelector(".nav__toggle");
const menu = document.getElementById("nav-menu");
function setMenu(open) {
  menu.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}
toggle.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", e => { if (e.key === "Escape") setMenu(false); });
document.addEventListener("click", e => {
  if (!e.target.closest(".nav")) setMenu(false);
});

/* ---------- highlight current section in navbar ---------- */
const links = document.querySelectorAll(".nav__links a[data-section]");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => l.setAttribute("aria-current", String(l.dataset.section === entry.target.id)));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  ["home", "categories", "about", "find-us"].forEach(id => {
    const s = document.getElementById(id);
    if (s) io.observe(s);
  });
}

/* ---------- footer year ---------- */
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();
