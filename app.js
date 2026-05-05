const eventDate = new Date("2026-05-23T18:00:00");

/* COUNTDOWN */
const countdown = document.getElementById("countdown");

function updateCountdown() {
  const now = new Date();
  const diff = eventDate - now;

  if (diff <= 0) {
    countdown.innerHTML = "🎉 JUWENALIA TRWAJĄ!";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  countdown.innerHTML = `Do startu: ${days} dni`;
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* SCROLL ANIMATION */
const elements = document.querySelectorAll(".fade");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.2 });

elements.forEach(el => observer.observe(el));

/* CTA SCROLL */
document.getElementById("cta").addEventListener("click", () => {
  document.querySelector(".lineup").scrollIntoView({
    behavior: "smooth"
  });
});