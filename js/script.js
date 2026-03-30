// ===== SAFE SELECTORS =====
const typingElement = document.querySelector(".typing-text");
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("section");
const toTopBtn = document.getElementById("to-top");
const yearEl = document.getElementById("year");
const themeToggle = document.getElementById("theme-toggle");

// ===== TYPING ANIMATION =====
const roles = [
  "AI/ML Engineer",
  "Backend Developer",
  "Machine Learning Developer",
  "REST APIs & Flask"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typingElement) return;

  const current = roles[roleIndex];

  typingElement.textContent = isDeleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);

  let speed = isDeleting ? 40 : 90;

  if (!isDeleting && charIndex === current.length) {
    speed = 1500;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 400;
  }

  setTimeout(typeEffect, speed);
}

// ===== SMOOTH SCROLL =====
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ===== NAVBAR ACTIVE LINK =====
window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });

  if (toTopBtn) {
    if (window.scrollY > 600) toTopBtn.classList.add("show");
    else toTopBtn.classList.remove("show");
  }
});

// ===== MOBILE NAV =====
if (burger && navLinks) {
  burger.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    const expanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!expanded));
  });
}

// Close nav on click (mobile UX)
navItems.forEach(link => {
  link.addEventListener("click", () => {
    if (navLinks) navLinks.classList.remove("open");
    if (burger) burger.setAttribute("aria-expanded", "false");
  });
});

// ===== CONTACT FORM =====
const form = document.querySelector(".contact-form");
const statusEl = document.getElementById("form-status");

if (form && statusEl) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    statusEl.style.color = "#93c5fd";
    statusEl.textContent = "Sending message...";

    setTimeout(() => {
      statusEl.style.color = "#22c55e";
      statusEl.textContent = "Message sent successfully!";
      form.reset();
    }, 1200);
  });
}

// ===== SCROLL REVEAL ANIMATION =====
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.15 }
);

// apply animation safely
document.querySelectorAll(".section, .project-card, .glass-card, .timeline-item, .simple-list li, .cert-item")
  .forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });

// ===== BACK TO TOP =====
if (toTopBtn) {
  toTopBtn.addEventListener("click", scrollToTop);
}

// ===== YEAR =====
if (yearEl) yearEl.textContent = String(new Date().getFullYear());

// ===== THEME TOGGLE =====
function getPreferredTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
}

function applyTheme(theme) {
  if (theme === "light") document.body.setAttribute("data-theme", "light");
  else document.body.removeAttribute("data-theme");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isLight = document.body.getAttribute("data-theme") === "light";
    const next = isLight ? "dark" : "light";
    localStorage.setItem("theme", next);
    applyTheme(next);
  });
}

// ===== START =====
document.addEventListener("DOMContentLoaded", () => {
  applyTheme(getPreferredTheme());
  setTimeout(typeEffect, 500);
});
