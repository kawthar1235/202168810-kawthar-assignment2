// ===== Helpers =====
const $ = (sel) => document.querySelector(sel);

// ===== Footer year =====
$("#year").textContent = new Date().getFullYear();

// ===== Greeting by time of day (JS feature) =====
(function greetingByTime(){
  const hours = new Date().getHours();
  let text = "Hello!";
  if (hours < 12) text = "Good morning ☀️";
  else if (hours < 18) text = "Good afternoon 🌤️";
  else text = "Good evening 🌙";
  $("#greetingBadge").textContent = text;
})();

// ===== Theme Toggle (Dark/Light) =====
(function themeSetup(){
  const root = document.documentElement;
  const btn = $("#themeToggle");

  // load saved preference
  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") {
    root.setAttribute("data-theme", saved);
  }

  const updateIcon = () => {
    const theme = root.getAttribute("data-theme");
    btn.textContent = theme === "light" ? "🌙" : "☀️";
  };
  updateIcon();

  btn.addEventListener("click", () => {
    const current = root.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
    updateIcon();
  });
})();

// ===== Mobile nav toggle =====
(function navToggle(){
  const toggle = $("#navToggle");
  const menu = $("#navMenu");

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  // close menu after clicking a link (mobile)
  menu.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      menu.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
})();

// ===== Contact form interaction (no backend) =====
(function contactForm(){
  const form = $("#contactForm");
  const status = $("#formStatus");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();

    if (!name || !email || !message) {
      status.textContent = "Please fill in all fields.";
      return;
    }

    // Simple email check
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      status.textContent = "Please enter a valid email address.";
      return;
    }

    status.textContent = `Thanks, ${name}! Your message is ready (no backend connected).`;
    form.reset();
  });
})();

/* ===== Mouse Gradient Follow — Whole Page ===== */

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  document.documentElement.style.setProperty("--mx", x + "%");
  document.documentElement.style.setProperty("--my", y + "%");
});
