const CONFIG = {
  countdownDate: new Date("2026-05-20T18:00:00"),
  animationThreshold: 0.2
};

const formatTime = (value) => String(value).padStart(2, "0");

class ScrollAnimator {
  constructor() {
    this.elements = document.querySelectorAll(".fade-in");
    this.init();
  }

  init() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animate(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: CONFIG.animationThreshold }
    );

    this.elements.forEach(el => observer.observe(el));
  }

  animate(el) {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  }
}

class Countdown {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    if (!this.container) return;

    this.start();
  }

  start() {
    this.update();
    this.interval = setInterval(() => this.update(), 1000);
  }

  update() {
    const now = new Date();
    const diff = CONFIG.countdownDate - now;

    if (diff <= 0) {
      this.container.innerHTML = "🎉 Zaczynamy!";
      clearInterval(this.interval);
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    this.container.innerHTML = `
      <h2>Start za:</h2>
      <div style="font-size: 2rem; letter-spacing: 2px;">
        ${days}d ${formatTime(hours)}h ${formatTime(minutes)}m ${formatTime(seconds)}s
      </div>
    `;
  }
}

class CTAHandler {
  constructor(buttonId) {
    this.button = document.getElementById(buttonId);
    if (!this.button) return;

    this.init();
  }

  init() {
    this.button.addEventListener("click", () => this.handleClick());
  }

  handleClick() {
    this.button.innerText = "🔥 Widzimy się!";
    this.button.style.transform = "scale(1.1)";
    
    setTimeout(() => {
      this.button.style.transform = "scale(1)";
    }, 200);

    document.querySelector(".lineup")?.scrollIntoView({
      behavior: "smooth"
    });
  }
}

class Parallax {
  constructor() {
    this.hero = document.querySelector(".hero");
    if (!this.hero) return;

    this.bind();
  }

  bind() {
    window.addEventListener("scroll", () => {
      const offset = window.scrollY;
      this.hero.style.transform = `translateY(${offset * 0.3}px)`;
    });
  }
}

class App {
  constructor() {
    document.addEventListener("DOMContentLoaded", () => {
      new ScrollAnimator();
      new Countdown("countdown");
      new CTAHandler("cta");
      new Parallax();
    });
  }
}

new App();