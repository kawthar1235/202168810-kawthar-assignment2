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
// ===== Contact form interaction (no backend) =====
(function contactForm() {
  const form = $("#contactForm");
  const status = $("#formStatus");
  const submitBtn = $("#submitBtn");
  const nameInput = $("#name");
  const emailInput = $("#email");
  const messageInput = $("#message");

  if (!form || !status || !submitBtn) return;

  function showStatus(message, type) {
    status.textContent = message;
    status.className = `form-status small show ${type}`;
  }

  function clearErrors() {
    [nameInput, emailInput, messageInput].forEach((input) => {
      input.classList.remove("input-error");
    });
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !message) {
      if (!name) nameInput.classList.add("input-error");
      if (!email) emailInput.classList.add("input-error");
      if (!message) messageInput.classList.add("input-error");

      showStatus("Please fill in all fields before sending.", "error");
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      emailInput.classList.add("input-error");
      showStatus("Please enter a valid email address.", "error");
      return;
    }

    submitBtn.textContent = "Sending...";

    setTimeout(() => {
      showStatus(`Thanks, ${name}! Your message was prepared successfully.`, "success");
      form.reset();
      submitBtn.textContent = "Send";
    }, 700);
  });
})();

/* ===== Mouse Gradient Follow — Whole Page ===== */

document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  document.documentElement.style.setProperty("--mx", x + "%");
  document.documentElement.style.setProperty("--my", y + "%");
});
// ===== Project Modal =====
(function projectModal() {
  const modal = $("#projectModal");
  const modalClose = $("#modalClose");
  const modalTitle = $("#modalTitle");
  const modalDescription = $("#modalDescription");
  const modalTools = $("#modalTools");
  const modalLink = $("#modalLink");
  const detailButtons = document.querySelectorAll(".details-btn");

  if (!modal || !modalClose || !modalTitle || !modalDescription || !modalTools || !modalLink) return;

  detailButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modalTitle.textContent = button.dataset.title;
      modalDescription.textContent = button.dataset.description;
      modalTools.textContent = button.dataset.tools;
      modalLink.href = button.dataset.link;

      modal.classList.remove("hidden");
      modal.setAttribute("aria-hidden", "false");
    });
  });

  modalClose.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      modal.classList.add("hidden");
      modal.setAttribute("aria-hidden", "true");
    }
  });
})();

// ===== Reveal sections on scroll =====
(function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");

  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    {
      threshold: 0.15,
    }
  );

  reveals.forEach((section) => observer.observe(section));
})();

// ===== Typing name animation =====
(function typingNameEffect() {
  const target = document.getElementById("typingName");
  if (!target) return;

  const text = "Kawthar Ali,";
  let index = 0;

  function typeLetter() {
    if (index < text.length) {
      target.textContent += text.charAt(index);
      index++;
      setTimeout(typeLetter, 140);
    }
  }

  typeLetter();
})();

// ===== Cinematic Design Stack =====
(function designStack() {
  const stack = document.getElementById("designStack");
  if (!stack) return;

  let isAnimating = false;

  stack.addEventListener("click", () => {
    if (isAnimating) return;

    const first = stack.querySelector(".stack-img");
    if (!first) return;

    isAnimating = true;
    first.classList.add("exit-right");

    setTimeout(() => {
      first.classList.remove("exit-right");
      stack.appendChild(first);
      isAnimating = false;
    }, 700);
  });
})();