/* ============================
   DOM READY
============================ */
document.addEventListener("DOMContentLoaded", () => {

  /* ============================
     COUNTER ANIMATION (ON VIEW)
  ============================ */
  const counters = document.querySelectorAll(".counter");

  const runCounter = (counter) => {
    counter.innerText = "0";

    const update = () => {
      const target = +counter.getAttribute("data-target");
      const current = +counter.innerText;
      const increment = target / 80;

      if (current < target) {
        counter.innerText = Math.ceil(current + increment);
        setTimeout(update, 20);
      } else {
        counter.innerText = target + "+";
      }
    };

    update();
  };

  const counterObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        obs.unobserve(entry.target);
      }
    });
  });

  counters.forEach(counter => counterObserver.observe(counter));


  /* ============================
     DARK MODE TOGGLE + SAVE
  ============================ */
  const toggle = document.getElementById("themeToggle");

  if (toggle) {
    toggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");

      const isLight = document.body.classList.contains("dark-mode");
      toggle.innerText = isLight ? "☀️" : "🌙";

      localStorage.setItem("theme", isLight ? "light" : "dark");
    });

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "light") {
      document.body.classList.add("dark-mode");
      toggle.innerText = "☀️";
    }
  }


  /* ============================
     SMOOTH SCROLL
  ============================ */
  document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));

      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }
    });
  });


  /* ============================
     ACTIVE NAV LINK
  ============================ */
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");

      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });


  /* ============================
     SCROLL REVEAL (SMOOTH)
  ============================ */
  const revealElements = document.querySelectorAll(
    ".feature-box, .user-card, .stat, .cta-content"
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  revealElements.forEach(el => revealObserver.observe(el));


  /* ============================
     NAVBAR SCROLL EFFECT
  ============================ */
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });


  /* ============================
     BUTTON RIPPLE EFFECT 🔥
  ============================ */
  document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", function(e) {
      const circle = document.createElement("span");
      const diameter = Math.max(this.clientWidth, this.clientHeight);

      circle.style.width = circle.style.height = diameter + "px";
      circle.style.left = e.clientX - this.offsetLeft - diameter / 2 + "px";
      circle.style.top = e.clientY - this.offsetTop - diameter / 2 + "px";
      circle.classList.add("ripple");

      const ripple = this.getElementsByClassName("ripple")[0];
      if (ripple) ripple.remove();

      this.appendChild(circle);
    });
  });

});
