/* =========================================================
   EDWIN LEONEL LÓPEZ VENEGAS
   PORTFOLIO MOTION SYSTEM

   Anime.js
   ========================================================= */

import {
  animate,
  createTimeline,
  stagger,
} from "https://cdn.jsdelivr.net/npm/animejs/+esm";

/* =========================================================
   01. MOTION PREFERENCE
   ========================================================= */

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

/* =========================================================
   02. DOM
   ========================================================= */

const DOM = {
  html: document.documentElement,

  body: document.body,

  intro: document.querySelector(".intro"),

  header: document.querySelector(".header"),

  themeToggle: document.querySelector(".theme-toggle"),

  portrait: document.querySelector(".hero-photo__image img"),

  portraitContainer: document.querySelector(".hero-photo__image"),

  year: document.querySelector("#year"),
};

/* =========================================================
   03. THEME
   ========================================================= */

function syncThemeControl() {
  if (!DOM.themeToggle) return;

  const isDark = DOM.html.dataset.theme === "dark";

  DOM.themeToggle.setAttribute("aria-pressed", String(isDark));
}

function toggleTheme() {
  const current = DOM.html.dataset.theme || "light";

  const next = current === "light" ? "dark" : "light";

  DOM.html.dataset.theme = next;

  localStorage.setItem("edwin-theme", next);

  syncThemeControl();

  if (reducedMotion) {
    return;
  }

  /*
   * Deliberately restrained.
   * Theme switching should feel polished,
   * not like a scene transition.
   */

  animate("body", {
    opacity: [
      {
        to: 0.95,
        duration: 100,
      },

      {
        to: 1,
        duration: 380,
      },
    ],

    ease: "out(3)",
  });
}

DOM.themeToggle?.addEventListener("click", toggleTheme);

syncThemeControl();

/* =========================================================
   04. INTRO
   ========================================================= */

function runIntro() {
  if (reducedMotion) {
    DOM.intro?.remove();

    DOM.body.classList.remove("is-loading");

    revealHero();

    return;
  }

  DOM.body.classList.add("is-loading");

  const timeline = createTimeline({
    defaults: {
      ease: "out(4)",
    },
  });

  timeline.add(".intro__eyebrow", {
    opacity: {
      from: 0,
      to: 0.55,
    },

    y: {
      from: 12,
      to: 0,
    },

    duration: 450,
  });

  timeline.add(
    ".intro__name span",
    {
      opacity: {
        from: 0,
        to: 1,
      },

      y: {
        from: 55,
        to: 0,
      },

      duration: 850,

      delay: stagger(90),
    },

    "-=150",
  );

  timeline.add(
    ".intro__line i",
    {
      scaleX: {
        from: 0,
        to: 1,
      },

      duration: 750,

      ease: "inOut(4)",
    },

    "-=400",
  );

  timeline.add(
    ".intro__message",
    {
      opacity: {
        from: 0,
        to: 0.55,
      },

      y: {
        from: 8,
        to: 0,
      },

      duration: 450,
    },

    "-=350",
  );

  timeline.add(
    DOM.intro,
    {
      y: "-100%",

      duration: 950,

      ease: "inOut(5)",

      onComplete: () => {
        DOM.intro?.remove();

        DOM.body.classList.remove("is-loading");

        revealHero();
      },
    },

    "+=250",
  );
}

/* =========================================================
   05. HERO ENTRANCE
   ========================================================= */

function revealHero() {
  if (reducedMotion) {
    document.querySelectorAll(".hero-reveal").forEach((element) => {
      element.style.opacity = "1";
    });

    return;
  }

  const timeline = createTimeline({
    defaults: {
      ease: "out(4)",
    },
  });

  /*
   * First establish identity.
   */

  timeline.add(".hero__identity", {
    opacity: {
      from: 0,
      to: 1,
    },

    y: {
      from: 14,
      to: 0,
    },

    duration: 550,
  });

  /*
   * Main statement.
   *
   * The movement is intentionally shorter
   * than the previous version.
   *
   * Large text already creates visual impact.
   * It does not need excessive travel.
   */

  timeline.add(
    ".hero-line",
    {
      opacity: {
        from: 0,
        to: 1,
      },

      y: {
        from: "65%",
        to: "0%",
      },

      duration: 900,

      delay: stagger(70),
    },

    "-=250",
  );

  /*
   * Supporting copy.
   */

  timeline.add(
    ".hero__intro",
    {
      opacity: {
        from: 0,
        to: 1,
      },

      y: {
        from: 20,
        to: 0,
      },

      duration: 650,
    },

    "-=400",
  );

  /*
   * Actions.
   */

  timeline.add(
    ".hero__actions",
    {
      opacity: {
        from: 0,
        to: 1,
      },

      y: {
        from: 15,
        to: 0,
      },

      duration: 600,
    },

    "-=450",
  );

  /*
   * Portrait enters last.
   *
   * The visitor receives the message first
   * and the portrait becomes context rather
   * than competing for initial attention.
   */

  timeline.add(
    ".hero__side",
    {
      opacity: {
        from: 0,
        to: 1,
      },

      x: {
        from: 22,
        to: 0,
      },

      duration: 800,
    },

    "-=550",
  );

  /*
   * Availability pulse.
   */

  animate(".availability-dot", {
    scale: [1, 1.45, 1],

    opacity: [1, 0.55, 1],

    duration: 2000,

    loop: true,

    ease: "inOut(3)",
  });
}

/* =========================================================
   06. SCROLL REVEAL
   ========================================================= */

function initReveals() {
  const elements = document.querySelectorAll(".reveal");

  if (reducedMotion) {
    elements.forEach((element) => {
      element.style.opacity = "1";
    });

    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const element = entry.target;

        animate(element, {
          opacity: {
            from: 0,
            to: 1,
          },

          y: {
            from: 36,
            to: 0,
          },

          duration: 800,

          ease: "out(4)",
        });

        observer.unobserve(element);
      });
    },

    {
      threshold: 0.12,

      rootMargin: "0px 0px -7% 0px",
    },
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

/* =========================================================
   07. COUNTERS
   ========================================================= */

function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");

  if (!counters.length) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        const element = entry.target;

        const target = Number(element.dataset.counter);

        if (reducedMotion) {
          element.textContent = String(target);

          observer.unobserve(element);

          return;
        }

        const state = {
          value: 0,
        };

        animate(state, {
          value: target,

          duration: 1500,

          ease: "out(4)",

          onUpdate: () => {
            element.textContent = String(Math.round(state.value));
          },

          onComplete: () => {
            element.textContent = String(target);
          },
        });

        observer.unobserve(element);
      });
    },

    {
      threshold: 0.45,
    },
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}

/* =========================================================
   08. PORTRAIT INTERACTION
   ========================================================= */

function initPortrait() {
  if (
    reducedMotion ||
    !DOM.portrait ||
    !DOM.portraitContainer ||
    !window.matchMedia("(pointer: fine)").matches
  ) {
    return;
  }

  DOM.portraitContainer.addEventListener("pointermove", (event) => {
    const rect = DOM.portraitContainer.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    /*
     * Very small parallax.
     *
     * Portrait remains human,
     * not an interactive tech demo.
     */

    animate(DOM.portrait, {
      x: x * 7,

      y: y * 7,

      scale: 1.05,

      duration: 700,

      ease: "out(4)",
    });
  });

  DOM.portraitContainer.addEventListener("pointerleave", () => {
    animate(DOM.portrait, {
      x: 0,
      y: 0,

      scale: 1.025,

      duration: 850,

      ease: "out(4)",
    });
  });
}

/* =========================================================
   09. PROJECT INTERACTIONS
   ========================================================= */

function initProjects() {
  if (reducedMotion || !window.matchMedia("(pointer: fine)").matches) {
    return;
  }

  document.querySelectorAll(".project").forEach((project) => {
    const title = project.querySelector("h3");

    const arrow = project.querySelector(".project__arrow");

    project.addEventListener("mouseenter", () => {
      animate(title, {
        x: 7,

        duration: 400,

        ease: "out(4)",
      });

      if (arrow) {
        animate(arrow, {
          x: 4,
          y: -4,

          duration: 400,

          ease: "out(4)",
        });
      }
    });

    project.addEventListener("mouseleave", () => {
      animate(title, {
        x: 0,

        duration: 450,

        ease: "out(4)",
      });

      if (arrow) {
        animate(arrow, {
          x: 0,
          y: 0,

          duration: 450,

          ease: "out(4)",
        });
      }
    });
  });
}

/* =========================================================
   10. CONTACT TITLE
   ========================================================= */

function initContactTitle() {
  const title = document.querySelector(".contact__title");

  if (!title || reducedMotion) {
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animate(".contact__title span", {
          opacity: {
            from: 0,
            to: 1,
          },

          y: {
            from: "75%",
            to: "0%",
          },

          duration: 950,

          delay: stagger(100),

          ease: "out(4)",
        });

        observer.disconnect();
      });
    },

    {
      threshold: 0.25,
    },
  );

  observer.observe(title);
}

/* =========================================================
   11. CONTACT STATUS
   ========================================================= */

function initContactStatus() {
  if (reducedMotion) {
    return;
  }

  animate(".contact__status i", {
    scale: [1, 1.55, 1],

    opacity: [1, 0.45, 1],

    duration: 1900,

    loop: true,

    ease: "inOut(3)",
  });
}

/* =========================================================
   12. HEADER
   ========================================================= */

let scrollScheduled = false;

function updateHeader() {
  DOM.header?.classList.toggle("is-scrolled", window.scrollY > 35);
}

function handleScroll() {
  if (scrollScheduled) {
    return;
  }

  scrollScheduled = true;

  requestAnimationFrame(() => {
    updateHeader();

    scrollScheduled = false;
  });
}

window.addEventListener("scroll", handleScroll, {
  passive: true,
});

/* =========================================================
   13. YEAR
   ========================================================= */

function setYear() {
  if (!DOM.year) {
    return;
  }

  DOM.year.textContent = String(new Date().getFullYear());
}

/* =========================================================
   14. INITIALIZATION
   ========================================================= */

function init() {
  setYear();

  updateHeader();

  initReveals();

  initCounters();

  initPortrait();

  initProjects();

  initContactTitle();

  initContactStatus();

  runIntro();
}

/* =========================================================
   BOOT
   ========================================================= */

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
