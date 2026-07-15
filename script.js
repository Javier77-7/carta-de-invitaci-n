const EVENT_CONFIG = {
  // Usa formato ISO: año-mes-díaThh:mm:ss
  eventDateISO: "2026-08-01T18:00:00",
  eventDateText: "1 de agosto",
  eventTimeText: "6:00 PM",
  eventPlaceText: "Residencia de papá",
  momPhone: "573215028587",
  dadPhone: "573043731090"
};

const revealHintBtn = document.getElementById("revealHintBtn");
const firstCover = document.getElementById("firstCover");
const envelope = document.getElementById("envelope");
const thirdCover = document.querySelector(".third-cover");
const backToMainBtn = document.getElementById("backToMainBtn");
const toThirdCoverBtn = document.getElementById("toThirdCoverBtn");
const backToSecondBtn = document.getElementById("backToSecondBtn");
const hintText = document.getElementById("hintText");
const rsvpForm = document.getElementById("rsvpForm");
const momLink = document.getElementById("momLink");
const dadLink = document.getElementById("dadLink");

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

const eventDateTextEl = document.getElementById("eventDateText");
const eventTimeTextEl = document.getElementById("eventTimeText");
const eventPlaceTextEl = document.getElementById("eventPlaceText");

function buildWhatsAppLink(phone, message) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

function fillEventText() {
  if (eventDateTextEl) eventDateTextEl.textContent = EVENT_CONFIG.eventDateText;
  if (eventTimeTextEl) eventTimeTextEl.textContent = EVENT_CONFIG.eventTimeText;
  if (eventPlaceTextEl) eventPlaceTextEl.textContent = EVENT_CONFIG.eventPlaceText;

  const baseMessage = "si voy a ir a tu baby shower";
  if (momLink) momLink.href = buildWhatsAppLink(EVENT_CONFIG.momPhone, baseMessage);
  if (dadLink) dadLink.href = buildWhatsAppLink(EVENT_CONFIG.dadPhone, baseMessage);
}

function updateCountdown() {
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
    return;
  }

  const target = new Date(EVENT_CONFIG.eventDateISO).getTime();
  const now = Date.now();
  const diff = target - now;

  if (Number.isNaN(target)) {
    daysEl.textContent = "--";
    hoursEl.textContent = "--";
    minutesEl.textContent = "--";
    secondsEl.textContent = "--";
    return;
  }

  if (diff <= 0) {
    daysEl.textContent = "00";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}

const mainContent = document.getElementById("mainContent");

function openReveal() {
  if (envelope.classList.contains("open")) {
    return;
  }

  envelope.classList.add("open");
  firstCover.classList.add("cover-hidden");
  thirdCover.classList.remove("main-visible");
  thirdCover.classList.add("main-hidden");
  mainContent.classList.remove("main-hidden");
  mainContent.classList.add("main-visible");

  setTimeout(() => {
    mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 500);
}

envelope.addEventListener("click", openReveal);

backToMainBtn.addEventListener("click", () => {
  mainContent.classList.remove("main-visible");
  mainContent.classList.add("main-hidden");
  thirdCover.classList.remove("main-visible");
  thirdCover.classList.add("main-hidden");
  firstCover.classList.remove("cover-hidden");
  envelope.classList.remove("open");
  window.scrollTo({ top: 0, behavior: "smooth" });
});

toThirdCoverBtn.addEventListener("click", () => {
  mainContent.classList.remove("main-visible");
  mainContent.classList.add("main-hidden");
  thirdCover.classList.remove("main-hidden");
  thirdCover.classList.add("main-visible");
  setTimeout(() => {
    thirdCover.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 160);
});

backToSecondBtn.addEventListener("click", () => {
  thirdCover.classList.remove("main-visible");
  thirdCover.classList.add("main-hidden");
  mainContent.classList.remove("main-hidden");
  mainContent.classList.add("main-visible");
  setTimeout(() => {
    mainContent.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 120);
});

if (revealHintBtn) {
  revealHintBtn.addEventListener("click", () => {
    hintText.hidden = !hintText.hidden;
    revealHintBtn.textContent = hintText.hidden ? "Ver pista" : "Ocultar pista";
  });
}

if (rsvpForm) {
  rsvpForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const guests = document.getElementById("guests").value;
    const team = document.getElementById("team").value;

    const message = [
      "¡Hola! Confirmo asistencia a la revelación.",
      `Nombre: ${name || "Invitado"}`,
      `Asistentes: ${guests}`,
      `Team: ${team}`
    ].join("\n");

    const url = buildWhatsAppLink(EVENT_CONFIG.momPhone, message);
    window.open(url, "_blank", "noopener,noreferrer");
  });
}

fillEventText();
updateCountdown();

if (daysEl && hoursEl && minutesEl && secondsEl) {
  setInterval(updateCountdown, 1000);
}

/* Chroma key processing removed */
