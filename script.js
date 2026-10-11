/* =========================================================
   Being Human Kids Wear
   1) Edit SHOP below: phones, WhatsApp, email, address, hours, links.
      It updates every place on the page automatically.
   ========================================================= */
const SHOP = {
  phone1: "+91 80779 06616",
  phone2: "+91 74177 77107",
  whatsapp: "918077906616",   // WhatsApp number with country code, no + or spaces
  whatsappMsg: "Hi, I would like to know more about Being Human Kids Wear.",
  email: "beinghumankidsstore@gmail.com",
  address: "Biddiwara Bazaar, Khatauli",
  hours: "10:00 AM - 9:00 PM",
  directions: "https://maps.app.goo.gl/LHQA8Mj2EXviEQHg9",
  instagram: "https://www.instagram.com/beinghumankidsstore?srtk=MW1na3l3dnM5OHFyMA==",
  facebook: "https://www.facebook.com/"   // TODO: replace with the shop's Facebook page link
};
// The map itself is the <iframe> in index.html (Google Maps > Share > Embed a map).

const digits = n => n.replace(/[^\d+]/g, "");

/* ---------- fill text + links from SHOP ---------- */
document.querySelectorAll("[data-shop]").forEach(el => {
  const v = SHOP[el.dataset.shop];
  if (v) el.textContent = v;
});

const hrefs = {
  tel1: "tel:" + digits(SHOP.phone1),
  tel2: "tel:" + digits(SHOP.phone2),
  mailto: "mailto:" + SHOP.email,
  whatsapp: "https://wa.me/" + digits(SHOP.whatsapp).replace("+", "") + "?text=" + encodeURIComponent(SHOP.whatsappMsg),
  directions: SHOP.directions,
  instagram: SHOP.instagram,
  facebook: SHOP.facebook
};
document.querySelectorAll("[data-shop-href]").forEach(el => {
  const h = hrefs[el.dataset.shopHref];
  if (h) el.setAttribute("href", h);
});

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
