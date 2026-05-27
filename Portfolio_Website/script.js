AOS.init();
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
const reveals = document.querySelectorAll(".reveal");
const timelineProgress = document.getElementById("timeline-progress");
const typedTextSpan = document.querySelector(".typed-text");
const cursor = document.querySelector(".cursor");
const spans = document.querySelectorAll(".image-container span");
const total = spans.length;
const angle = 360 / total;

spans.forEach((span, i) => {
  span.style.setProperty('--i', i);
  span.style.setProperty('--deg', `${i * angle}deg`);
});

// const sentences = [
//   "From Logic to Launch — Building Smarter Web Apps",
//   "From Backend to Browser — Code that Connects",
//   "From API to UI — Crafting Seamless Experiences",
//   "From Data to Decisions — Engineering Intelligent Systems",
//   "From Problem to Product — Powered by Code",
//   "From Codebase to Cloud — Full-Stack Without Limits",
//   "From Functions to Firewalls — Engineering with Precision",
//   "From Mongo to Oracle — Fluent in Data",
//   "From Script to Scale — Web Development that Works",
//   "From Syntax to Systems — Code that Solves"
// ];
const sentences = [
  "5 Patents Deep — Where FinTech Meets Paranoia 🔐",
  "Yantra 2026 — Won It. Shipped It. Slept Later.",
  "SAIL Intern: Teaching Steel to Think with AI 🏭",
  "BlueStock Fintech — Where My Code Met Real Money",
  "Oracle OCI Certified — Cloud Isn't Scary Anymore ☁️",
  "9 Projects. 0 Half-Built. All Production-Ready.",
  "CGPA 9.24 — Nerd by Day, Builder by Night 🌙",
  "LSTM + ZKP + Graph AI = Fraud Doesn't Stand a Chance",
  "GDG Women Techies Finalist — Showed Up, Stood Out",
  "SIH Submitted — Because Real Problems Need Real Code 🇮🇳"
];

const typingDelay = 60;
const erasingDelay = 30;
const newSentenceDelay = 2000;
let sentenceIndex = 0;
let charIndex = 0;

let wordIndex = 0;
let letterIndex = 0;
let wordsInSentence = [];

document.addEventListener("DOMContentLoaded", () => {
  if (sentences.length) setTimeout(type, newSentenceDelay);
});

function type() {
  if (wordIndex === 0 && letterIndex === 0) {
    typedTextSpan.innerHTML = "";
    wordsInSentence = sentences[sentenceIndex].split(" ");
  }

  if (wordIndex < wordsInSentence.length) {
    if (letterIndex === 0) {
      const span = document.createElement("span");
      span.style.color = (wordIndex % 2 === 0) ? "#20c20e" : "white";
      typedTextSpan.appendChild(span);
    }

    const currentSpan = typedTextSpan.querySelectorAll("span")[wordIndex];
    currentSpan.textContent += wordsInSentence[wordIndex][letterIndex];
    letterIndex++;

    if (letterIndex < wordsInSentence[wordIndex].length) {
      setTimeout(type, typingDelay);
    } else {
      currentSpan.textContent += " ";
      wordIndex++;
      letterIndex = 0;
      setTimeout(type, typingDelay);
    }
  } else {
    setTimeout(erase, newSentenceDelay);
  }
}

function erase() {
  const spans = typedTextSpan.querySelectorAll("span");
  if (spans.length === 0) {
    wordIndex = 0;
    letterIndex = 0;
    sentenceIndex = (sentenceIndex + 1) % sentences.length;
    setTimeout(type, typingDelay + 500);
    return;
  }

  const lastSpan = spans[spans.length - 1];
  const text = lastSpan.textContent;

  if (text.length > 0) {
    lastSpan.textContent = text.substring(0, text.length - 1);
    setTimeout(erase, erasingDelay);
  } else {
    lastSpan.remove();
    setTimeout(erase, erasingDelay);
  }
}

function getOffsetTopRelativeToParent(el, parent) {
  let top = 0;
  while (el && el !== parent) {
    top += el.offsetTop;
    el = el.offsetParent;
  }
  return top;
}

function revealOnScroll() {
  const windowHeight = window.innerHeight;
  const wrapper = document.querySelector("#education .timeline-wrapper");
  let lastActive = null;

  reveals.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < windowHeight - 150) {
      item.classList.add("active");
      lastActive = item;
    }
  });

  if (lastActive && timelineProgress && wrapper) {
    const itemTop = getOffsetTopRelativeToParent(lastActive, wrapper);
    timelineProgress.style.top = (itemTop + 20) + "px";
  }
}

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });

  revealOnScroll();
});

window.addEventListener("load", () => {
  revealOnScroll();
});

// Certifications
const certificationItems = document.querySelectorAll("#certifications .timeline-item");
const certificationProgress = document.getElementById("certification-progress");

function revealCertifications() {
  const windowHeight = window.innerHeight;
  const wrapper = document.querySelector("#certifications .timeline-wrapper");
  let lastActive = null;

  certificationItems.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < windowHeight - 150) {
      item.classList.add("active");
      lastActive = item;
    }
  });

  if (lastActive && certificationProgress && wrapper) {
    const itemTop = getOffsetTopRelativeToParent(lastActive, wrapper);
    certificationProgress.style.top = (itemTop + 20) + "px";
  }
}

window.addEventListener("scroll", revealCertifications);
window.addEventListener("load", revealCertifications);

// Internships
const internshipItems = document.querySelectorAll("#internships .timeline-item");
const internshipProgress = document.getElementById("internship-progress");

function revealInternships() {
  const windowHeight = window.innerHeight;
  const wrapper = document.querySelector("#internships .timeline-wrapper");
  let lastActive = null;

  internshipItems.forEach((item) => {
    const rect = item.getBoundingClientRect();
    if (rect.top < windowHeight - 150) {
      item.classList.add("active");
      lastActive = item;
    }
  });

  if (lastActive && internshipProgress && wrapper) {
    const itemTop = getOffsetTopRelativeToParent(lastActive, wrapper);
    internshipProgress.style.top = (itemTop + 20) + "px";
  }
}

window.addEventListener("scroll", revealInternships);
window.addEventListener("load", revealInternships);
document.addEventListener("DOMContentLoaded", revealInternships);

// Hackathons
const hackathonItems = document.querySelectorAll("#hackathons .timeline-item");
const hackathonProgress = document.getElementById("hackathon-progress");

function revealHackathons() {
  const windowHeight = window.innerHeight;
  const wrapper = document.querySelector("#hackathons .timeline-wrapper");
  let lastActive = null;

  hackathonItems.forEach((item) => {
    const top = item.getBoundingClientRect().top;
    if (top < windowHeight - 150) {
      item.classList.add("active");
      lastActive = item;
    }
  });

  if (lastActive && hackathonProgress && wrapper) {
    const itemTop = getOffsetTopRelativeToParent(lastActive, wrapper);
    hackathonProgress.style.top = (itemTop + 20) + "px";
  }
}

window.addEventListener("scroll", revealHackathons);
window.addEventListener("load", revealHackathons);
document.addEventListener("DOMContentLoaded", revealHackathons);
