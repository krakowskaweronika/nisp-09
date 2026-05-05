const CONFIG = {
  countdownDate: new Date("2026-05-20T18:00:00"),
  animationThreshold: 0.2
};

const formatTime = (value) => String(value).padStart(2, "0");

/* SCROLL ANIMATOR */
class ScrollAnimator {
  constructor() {
    this.elements = document.querySelectorAll(".fade-in");
    this.init();
  }

  init() {
    if (!("IntersectionObserver" in window)) {
      this.elements.forEach(el => this.animate(el));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animate(entry.target);
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: CONFIG.animationThreshold
    });

    this.elements.forEach(el => observer.observe(el));
  }

  animate(el) {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  }
}

/* COUNTDOWN */
class Countdown {
  constructor(id) {
    this.container = document.getElementById(id);
    if (!this.container) return;

    this.update();
    setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date();
    const diff = CONFIG.countdownDate - now;

    if (diff <= 0) {
      this.container.innerHTML = "🎉 Zaczynamy!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    this.container.innerHTML = `
      <h2>Start za:</h2>
      <div>
        ${days}d ${formatTime(hours)}h ${formatTime(minutes)}m ${formatTime(seconds)}s
      </div>
    `;
  }
}

/* CTA */
class CTAHandler {
  constructor(id) {
    this.button = document.getElementById(id);
    if (!this.button) return;

    this.button.addEventListener("click", () => {
      this.button.innerText = "🔥 Widzimy się!";
      document.querySelector(".lineup").scrollIntoView({
        behavior: "smooth"
      });
    });
  }
}

/* PARALLAX */
class Parallax {
  constructor() {
    this.hero = document.querySelector(".hero");
    if (!this.hero) return;

    window.addEventListener("scroll", () => {
      const offset = window.scrollY;
      this.hero.style.transform = `translateY(${offset * 0.2}px)`;
    });
  }
}

/* START */
document.addEventListener("DOMContentLoaded", () => {
  new ScrollAnimator();
  new Countdown("countdown");
  new CTAHandler("cta");
  new Parallax();
});