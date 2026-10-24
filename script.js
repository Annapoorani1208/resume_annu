// Certifications data
const certs = [
  ["Programming in Python", "Coursera"],
  ["C Programming with DSA Foundation", "Coursera"],
  ["Advanced Java Development", "Coursera"],
  ["Create a Supermarket App using Java OOP", "Coursera"],
  ["Preparing for the AZ-900 Microsoft Azure Fundamentals Exam", "Coursera"],
  ["MongoDB Basics for Students - Skill Badge", "ICT Academy (Skill-a-thon 2026)"],
  ["Celonis Foundations", "Celonis Academy"],
  ["Get Data Into Celonis", "Celonis Academy"],
  ["Process Mining - From Theory to Execution", "Celonis Academy"],
  ["Build Action Flows", "Celonis Academy"],
  ["Process Mining Audit Professional", "Celonis Academy"],
  ["Process Automation Concepts", "Celonis Academy"],
  ["Digital Application Fundamentals (STEM)", "FutureSkills Prime (NASSCOM)"]
];

const certList = document.getElementById("certList");
if (certList) {
  certs.forEach(([name, org]) => {
    const li = document.createElement("li");
    li.innerHTML = `<b>${name}</b><small>${org}</small>`;
    certList.appendChild(li);
  });
}

// Typing effect in Hero subtitle
const words = ["Problem Solver", "Computer Science Student", "Python Developer", "Java Learner"];
const typed = document.getElementById("typed");
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typed) return;
  const currentWord = words[wordIndex];

  if (isDeleting) {
    charIndex--;
    typed.textContent = currentWord.slice(0, charIndex);
  } else {
    charIndex++;
    typed.textContent = currentWord.slice(0, charIndex);
  }

  let delay = isDeleting ? 40 : 90;

  if (!isDeleting && charIndex === currentWord.length) {
    delay = 1800; // Pause at end of word
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    delay = 400; // Pause before typing next word
  }

  setTimeout(typeEffect, delay);
}
typeEffect();

// Mobile Navigation Toggle
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!menuBtn.contains(e.target) && !navLinks.contains(e.target) && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });

  // Close menu on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("open")) {
      navLinks.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
      menuBtn.focus();
    }
  });
}

// Dark Mode Toggle with localStorage
const themeBtn = document.getElementById("themeBtn");

function applyTheme(isDark) {
  document.body.classList.toggle("dark", isDark);
  if (themeBtn) {
    themeBtn.innerHTML = isDark ? "&#9728;" : "&#9790;";
    themeBtn.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
  }
}

// Load saved theme preference
try {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    applyTheme(true);
  } else if (savedTheme === "light") {
    applyTheme(false);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme(true);
  }
} catch (e) {
  // localStorage may be disabled or restricted
}

if (themeBtn) {
  themeBtn.addEventListener("click", () => {
    const isDark = !document.body.classList.contains("dark");
    applyTheme(isDark);
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch (e) {}
  });
}

// Scroll Reveal & Animated Skill Progress Bars
const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -40px 0px"
};

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
      
      // Animate skill bars inside this section
      const bars = entry.target.querySelectorAll(".bar i");
      bars.forEach(bar => {
        const targetWidth = bar.getAttribute("data-w");
        if (targetWidth) {
          bar.style.width = targetWidth + "%";
        }
      });

      revealObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Floating Back-to-Top Button
const topBtn = document.getElementById("topBtn");
if (topBtn) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      topBtn.style.display = "inline-flex";
    } else {
      topBtn.style.display = "none";
    }
  });

  topBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ==========================================
// Contact Form & Name Field Validation
// ==========================================
const contactForm = document.getElementById("contactForm");
const cName = document.getElementById("cName");
const cEmail = document.getElementById("cEmail");
const cMsg = document.getElementById("cMsg");
const nameError = document.getElementById("nameError");
const formError = document.getElementById("formError");
const formStatus = document.getElementById("formStatus");

// Strict Regular Expression for Name Field:
// Allows alphabetic characters (A-Z, a-z) with single spaces between words.
const NAME_REGEX = /^[A-Za-z]+(?: [A-Za-z]+)*$/;

function showNameFieldError(msg) {
  if (nameError) {
    nameError.textContent = msg;
  }
  if (cName) {
    cName.setAttribute("aria-invalid", "true");
  }
}

function clearNameFieldError() {
  if (nameError) {
    nameError.textContent = "";
  }
  if (cName) {
    cName.removeAttribute("aria-invalid");
  }
}

if (cName) {
  // Prevent invalid characters during typing
  cName.addEventListener("beforeinput", (e) => {
    if (e.data) {
      // Reject any non-alphabetic character (except space)
      if (!/^[A-Za-z ]+$/.test(e.data)) {
        e.preventDefault();
        showNameFieldError("Only alphabetic letters and spaces are allowed. Numbers, symbols, and emojis are rejected.");
        return;
      }

      // Prevent leading space or consecutive spaces
      const cursor = cName.selectionStart;
      const val = cName.value;
      if (e.data === " ") {
        if (cursor === 0) {
          e.preventDefault();
          showNameFieldError("Name cannot begin with a space.");
          return;
        }
        if (val[cursor - 1] === " ") {
          e.preventDefault();
          showNameFieldError("Consecutive spaces are not allowed.");
          return;
        }
      }
    }
  });

  // Handle pasted text: validate, sanitize, and remove invalid characters
  cName.addEventListener("paste", (e) => {
    e.preventDefault();
    const pasted = (e.clipboardData || window.clipboardData).getData("text") || "";
    // Filter out everything except letters and spaces, and collapse multiple spaces
    const sanitized = pasted.replace(/[^A-Za-z ]/g, "").replace(/\s+/g, " ");

    if (sanitized !== pasted) {
      showNameFieldError("Invalid characters (numbers, punctuation, symbols) were removed from pasted text.");
    } else {
      clearNameFieldError();
    }

    const start = cName.selectionStart;
    const end = cName.selectionEnd;
    const current = cName.value;
    const updated = current.substring(0, start) + sanitized + current.substring(end);
    cName.value = updated;
    const newPos = start + sanitized.length;
    cName.setSelectionRange(newPos, newPos);
  });

  // Real-time input listener fallback (handles virtual keyboards, autofill, IME, drag-and-drop)
  cName.addEventListener("input", () => {
    if (/[^A-Za-z ]/.test(cName.value)) {
      cName.value = cName.value.replace(/[^A-Za-z ]/g, "").replace(/\s+/g, " ");
      showNameFieldError("Only alphabetic characters (A-Z, a-z) and spaces are allowed.");
    } else {
      if (nameError && !nameError.textContent.includes("removed")) {
        clearNameFieldError();
      }
    }
  });

  // On blur, trim unnecessary spaces and validate
  cName.addEventListener("blur", () => {
    const trimmed = cName.value.trim().replace(/\s+/g, " ");
    cName.value = trimmed;
    if (trimmed && !NAME_REGEX.test(trimmed)) {
      showNameFieldError("Please enter a valid name using letters and single spaces between words (e.g. S Annapoorani).");
    } else if (trimmed) {
      clearNameFieldError();
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Reset status and errors
    if (formError) formError.textContent = "";
    if (formStatus) {
      formStatus.innerHTML = "";
      formStatus.className = "form-status";
    }

    // 1. Trim unnecessary leading and trailing spaces from Name before submission
    const rawName = cName ? cName.value : "";
    const trimmedName = rawName.trim().replace(/\s+/g, " ");
    if (cName) cName.value = trimmedName;

    // Read email and message (do not modify email/message validation rules beyond standard requirements)
    const emailVal = cEmail ? cEmail.value.trim() : "";
    const msgVal = cMsg ? cMsg.value.trim() : "";

    // Check required fields
    if (!trimmedName || !emailVal || !msgVal) {
      if (formError) formError.textContent = "Please fill in all fields.";
      if (!trimmedName) {
        showNameFieldError("Please enter your name.");
        cName.focus();
      } else if (!emailVal) {
        cEmail.focus();
      } else {
        cMsg.focus();
      }
      return;
    }

    // 2. Strict Name Field Validation via regular expression: ^[A-Za-z]+(?: [A-Za-z]+)*$
    if (!NAME_REGEX.test(trimmedName)) {
      showNameFieldError("Invalid name format. Only letters and single spaces between words are allowed (e.g. S Annapoorani, Mary Jane). Numbers and special characters are rejected.");
      if (formError) formError.textContent = "Please provide a valid name.";
      cName.focus();
      return;
    }
    clearNameFieldError();

    // 3. Standard Email validation (preserve original rule)
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!EMAIL_REGEX.test(emailVal)) {
      if (formError) formError.textContent = "Please enter a valid email address.";
      cEmail.focus();
      return;
    }

    // 4. Form Submission & Demo Mode notification:
    // Display clear indication that portfolio is in demo mode with no backend email service,
    // and launch the mailto link with pre-filled content.
    if (formStatus) {
      formStatus.className = "form-status demo-mode";
      formStatus.innerHTML = `<strong>Demo Mode Notice:</strong> Form submitted successfully with validated name <em>"${trimmedName}"</em>. Since no backend email service is configured, preparing your default email application to deliver the message to <strong>annapooranis298@gmail.com</strong>.`;
    }

    // Launch email client
    const subject = encodeURIComponent("Portfolio message from " + trimmedName);
    const body = encodeURIComponent(msgVal + "\n\nFrom: " + trimmedName + " (" + emailVal + ")");
    setTimeout(() => {
      window.location.href = `mailto:annapooranis298@gmail.com?subject=${subject}&body=${body}`;
    }, 400);
  });
}

// Current Year in Footer
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
