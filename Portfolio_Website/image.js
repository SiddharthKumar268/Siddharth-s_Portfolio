// ═══ Skills Gallery Rotation ═══
const container = document.querySelector(".image-container");

let currentAngle = 0;
const skillsMobile = window.innerWidth <= 768;
const rotationSpeed = skillsMobile ? 0.5 : 0.2;
let skillsVisible = true;

let dragging = false;
let dragStartX = 0;
let angleAtStart = 0;

// Pause when off-screen
if ('IntersectionObserver' in window && container) {
  const skillsObs = new IntersectionObserver((entries) => {
    skillsVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 });
  skillsObs.observe(container);
}

function animateRotation() {
  if (skillsVisible) {
    if (!dragging) {
      currentAngle = currentAngle + rotationSpeed;
    }
    container.style.transform = `translateZ(-150px) rotateY(${currentAngle}deg)`;
  }
  requestAnimationFrame(animateRotation);
}

animateRotation();

container.addEventListener("mousedown", (e) => {
  dragging = true;
  dragStartX = e.clientX;
  angleAtStart = currentAngle;
});

window.addEventListener("mouseup", () => {
  dragging = false;
});

window.addEventListener("mousemove", (e) => {
  if (!dragging) return;
  const moveX = e.clientX - dragStartX;
  currentAngle = (angleAtStart + moveX * 0.5) % 360;
});

container.addEventListener("touchstart", (e) => {
  dragging = true;
  dragStartX = e.touches[0].clientX;
  angleAtStart = currentAngle;
});

window.addEventListener("touchend", () => {
  dragging = false;
});

window.addEventListener("touchmove", (e) => {
  if (!dragging) return;
  const moveX = e.touches[0].clientX - dragStartX;
  currentAngle = (angleAtStart + moveX * 0.5) % 360;
  e.preventDefault();
}, { passive: false });


// ═══ Achievements Gallery Rotation + Blue Glow Trail ═══
const achievementsContainer = document.querySelector(".achievements-gallery-container");

if (achievementsContainer) {
  let achAngle = 0;
  const isMobile = window.innerWidth <= 768;
  const achSpeed = isMobile ? 0.5 : 0.2; // Same speed as skills carousel
  let achDragging = false;
  let achDragEngaged = false; // true only after min threshold
  let achDragStartX = 0;
  let achAngleAtStart = 0;
  const achCards = achievementsContainer.querySelectorAll("span");
  const ACH_DRAG_THRESHOLD = 10; // px before drag engages
  let achVisible = true; // pause when off-screen
  let glowFrame = 0; // throttle glow updates

  function getAnglePerCard() {
    return window.innerWidth <= 768 ? 40 : 45;
  }

  function updateBlueGlow() {
    const anglePerCard = getAnglePerCard();
    achCards.forEach((card) => {
      const i = parseInt(card.style.getPropertyValue("--i"));
      // Calculate each card's effective angle relative to viewer
      const cardAngle = ((i * anglePerCard) + achAngle) % 360;
      const normalizedAngle = ((cardAngle % 360) + 360) % 360;

      // Cards facing away (90-270 degrees) get the blue glow
      if (normalizedAngle > 90 && normalizedAngle < 270) {
        card.classList.add("ach-back");
        card.classList.remove("ach-front");
      } else {
        card.classList.remove("ach-back");
        card.classList.add("ach-front");
      }
    });
  }

  // Pause animation when not visible (saves CPU/GPU)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      achVisible = entries[0].isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(achievementsContainer);
  }

  function animateAchievements() {
    if (achVisible) {
      if (!achDragEngaged) {
        achAngle = achAngle + achSpeed;
      }
      achievementsContainer.style.transform = `translateZ(-150px) rotateY(${achAngle}deg)`;
      // Throttle glow updates: every 3rd frame on mobile, every frame on desktop
      glowFrame++;
      if (!isMobile || glowFrame % 3 === 0) {
        updateBlueGlow();
      }
    }
    requestAnimationFrame(animateAchievements);
  }

  animateAchievements();

  achievementsContainer.addEventListener("mousedown", (e) => {
    achDragging = true;
    achDragEngaged = false;
    achDragStartX = e.clientX;
    achAngleAtStart = achAngle;
  });

  window.addEventListener("mouseup", () => {
    achDragging = false;
    achDragEngaged = false;
  });

  window.addEventListener("mousemove", (e) => {
    if (!achDragging) return;
    const moveX = e.clientX - achDragStartX;
    if (!achDragEngaged && Math.abs(moveX) >= ACH_DRAG_THRESHOLD) {
      achDragEngaged = true;
    }
    if (achDragEngaged) {
      achAngle = (achAngleAtStart + moveX * 0.5) % 360;
    }
  });

  achievementsContainer.addEventListener("touchstart", (e) => {
    achDragging = true;
    achDragEngaged = false;
    achDragStartX = e.touches[0].clientX;
    achAngleAtStart = achAngle;
  }, { passive: true });

  window.addEventListener("touchend", () => {
    achDragging = false;
    achDragEngaged = false;
  });

  window.addEventListener("touchmove", (e) => {
    if (!achDragging) return;
    const moveX = e.touches[0].clientX - achDragStartX;
    if (!achDragEngaged && Math.abs(moveX) >= ACH_DRAG_THRESHOLD) {
      achDragEngaged = true;
    }
    if (achDragEngaged) {
      achAngle = (achAngleAtStart + moveX * 0.5) % 360;
      e.preventDefault(); // only block scroll when intentionally dragging gallery
    }
  }, { passive: false });


  // ═══ Achievement Card Click → Open Modal ═══
  achCards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (achDragEngaged) return; // don't open modal if user was dragging
      e.stopPropagation();
      openAchievementModal(card);
    });
  });
}


// ═══ Achievement Modal Functions ═══
function openAchievementModal(card) {
  const modal = document.getElementById("achievementModal");
  const modalImg = document.getElementById("achievementModalImage");
  const modalTitle = document.getElementById("achievementModalTitle");
  const modalDesc = document.getElementById("achievementModalDesc");
  const modalEvent = document.getElementById("achievementModalEvent");
  const modalDate = document.getElementById("achievementModalDate");

  if (!modal) return;

  // Pull data from card's data attributes
  modalImg.src = card.getAttribute("data-img") || "";
  modalImg.alt = card.getAttribute("data-title") || "Achievement";
  modalTitle.textContent = card.getAttribute("data-title") || "Achievement";
  modalDesc.textContent = card.getAttribute("data-desc") || "";
  modalEvent.textContent = card.getAttribute("data-event") || "Achievement";
  modalDate.textContent = card.getAttribute("data-date") || "";

  // Show modal
  modal.classList.add("active");
  document.body.classList.add("modal-open");
}

function closeAchievementModal() {
  const modal = document.getElementById("achievementModal");
  if (!modal) return;
  modal.classList.remove("active");
  document.body.classList.remove("modal-open");

  // Clear image src to free memory
  setTimeout(() => {
    const modalImg = document.getElementById("achievementModalImage");
    if (modalImg) modalImg.src = "";
  }, 400);
}

// Close on overlay click
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("achievementModal");
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeAchievementModal();
    });
  }
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeAchievementModal();
  }
});
