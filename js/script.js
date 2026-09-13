/* =========================
   MOBILE NAVIGATION
========================= */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn?.addEventListener("click", () => {
    // Opens/closes the mobile navigation menu.
    navLinks?.classList.toggle("active");
    const isOpen = navLinks?.classList.contains("active");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
});

document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
        // Close the menu after a mobile navigation link is selected.
        navLinks?.classList.remove("active");
        menuBtn?.setAttribute("aria-expanded", "false");
    });
});

/* =========================
   DARK / LIGHT THEME
========================= */
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

function applyTheme(theme) {
    // Changes the page theme and remembers the user's choice.
    root.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);

    if (themeToggle) {
        themeToggle.textContent = theme === "dark" ? "☀️" : "🌙";
        themeToggle.setAttribute(
            "aria-label",
            theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
        );
        themeToggle.title = theme === "dark" ? "Switch to light theme" : "Switch to dark theme";
    }
}

const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
applyTheme(savedTheme);

themeToggle?.addEventListener("click", () => {
    // Toggles between dark and light mode.
    const nextTheme = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(nextTheme);
});

/* =========================
   TYPING EFFECT
========================= */
const typingElement = document.getElementById("typing-text");
const typingTexts = [
    "Full Stack Developer",
    "Java Developer",
    "Python Developer",
    "Flutter Developer",
    "Cloud Enthusiast",
    "AI & ML Enthusiast"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    // Creates the rotating typing animation in the hero section.
    if (!typingElement) return;

    const currentText = typingTexts[textIndex];
    charIndex += isDeleting ? -1 : 1;
    typingElement.textContent = currentText.substring(0, charIndex);

    let speed = isDeleting ? 45 : 85;

    if (!isDeleting && charIndex === currentText.length) {
        isDeleting = true;
        speed = 1500;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        speed = 350;
    }

    setTimeout(typeEffect, speed);
}
typeEffect();

/* =========================
   ACTIVE NAVIGATION
========================= */
const sections = document.querySelectorAll("main section");
const navItems = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
    // Highlights the navigation item for the section currently on screen.
    let current = "home";

    sections.forEach((section) => {
        if (window.scrollY >= section.offsetTop - 180) {
            current = section.id;
        }
    });

    navItems.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
}
window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

/* =========================
   NAVBAR SCROLL EFFECT
========================= */
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    // Adds a stronger navbar background after the user starts scrolling.
    if (!navbar) return;
    navbar.style.background = window.scrollY > 40
        ? "color-mix(in srgb, var(--bg) 96%, transparent)"
        : "color-mix(in srgb, var(--bg) 84%, transparent)";
}, { passive: true });

/* =========================
   SMOOTH SCROLL
========================= */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        // Smoothly scrolls to an internal section instead of jumping.
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

/* =========================
   CURRENT YEAR
========================= */
const yearElement = document.getElementById("currentYear");
if (yearElement) {
    // Keeps the footer year automatically up to date.
    yearElement.textContent = new Date().getFullYear();
}


/* =========================
   CONTACT FORM
========================= */
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

contactForm?.addEventListener("submit", async (event) => {
    // Sends the contact form through FormSubmit without taking the visitor away from the portfolio.
    event.preventDefault();

    const submitButton = contactForm.querySelector(".send-btn");
    const originalButtonText = submitButton?.innerHTML;

    if (submitButton) {
        submitButton.disabled = true;
        submitButton.innerHTML = "Sending…";
    }
    if (formStatus) formStatus.textContent = "Sending your message…";

    try {
        const response = await fetch(contactForm.action, {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: new FormData(contactForm)
        });

        const result = await response.json();

        if (!response.ok || result.success === false) {
            throw new Error("Message could not be sent.");
        }

        contactForm.reset();
        if (formStatus) {
            formStatus.textContent = "Message sent successfully. Thank you!";
        }
    } catch (error) {
        // If AJAX is blocked by a browser/network, the normal form endpoint is used as a fallback.
        if (formStatus) {
            formStatus.textContent = "Opening the secure form submission page…";
        }
        contactForm.action = "https://formsubmit.co/neerajrajbhar56@gmail.com";
        contactForm.submit();
        return;
    } finally {
        if (submitButton) {
            submitButton.disabled = false;
            submitButton.innerHTML = originalButtonText || "Send Message ➤";
        }
    }
});
