// ====== EDIT THESE ======
const LINKS = {
  linkedin: "",   // e.g. "https://www.linkedin.com/in/your-profile"
  github: ""      // e.g. "https://github.com/your-username"
};
// Resume: place your PDF in this folder as "resume.pdf" (or change the href in index.html)
// ========================

// Connect LinkedIn / GitHub links (shown as placeholders until a URL is set)
document.querySelectorAll("[data-placeholder]").forEach(a => {
  const url = LINKS[a.dataset.placeholder];
  if (url) {
    a.href = url;
  } else {
    a.addEventListener("click", e => e.preventDefault());
    a.title = "Add your " + a.dataset.placeholder + " URL in script.js";
  }
});

// Mobile menu
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menuBtn");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  menu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", false);
}));

// Nav border on scroll + active link highlight
const nav = document.getElementById("nav");
window.addEventListener("scroll", () => nav.classList.toggle("scrolled", scrollY > 10), { passive: true });

const links = [...menu.querySelectorAll("a:not(.nav-cta)")];
const spy = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) {
      links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + en.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
links.forEach(l => { const s = document.querySelector(l.getAttribute("href")); if (s) spy.observe(s); });

// Gentle reveal on section headings only
document.querySelectorAll(".section h2").forEach(h => h.classList.add("reveal"));
const rev = new IntersectionObserver(entries => entries.forEach(en => {
  if (en.isIntersecting) { en.target.classList.add("in"); rev.unobserve(en.target); }
}), { threshold: 0.3 });
document.querySelectorAll(".reveal").forEach(el => rev.observe(el));

// Dashboard category filter
const chips = document.querySelectorAll(".chip");
chips.forEach(chip => chip.addEventListener("click", () => {
  chips.forEach(c => c.classList.remove("active"));
  chip.classList.add("active");
  const f = chip.dataset.filter;
  document.querySelectorAll(".shot").forEach(card => {
    card.classList.toggle("hide", f !== "all" && card.dataset.cat !== f);
  });
}));
