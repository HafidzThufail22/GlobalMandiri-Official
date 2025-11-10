document.addEventListener("DOMContentLoaded", () => {
  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector(".hamburger");
  const navMenu = document.querySelector(".nav-menu");

  // Toggle mobile menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when clicking a nav link
  document.querySelectorAll(".nav-menu a").forEach((link) =>
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    })
  );

  // --- Smooth Scrolling untuk Tautan Navigasi ---
  // Fungsi ini membuat halaman bergulir dengan mulus ke section yang dituju
  // saat tautan di menu navigasi di-klik.
  const navLinks = document.querySelectorAll(
    '.nav-menu a[href^="#"], .btn[href^="#"]'
  );

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // Mencegah perilaku default 'jump'

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // --- Animasi Scroll Sederhana dengan Intersection Observer API ---
  // Fungsi ini akan menambahkan class 'visible' ke setiap section
  // saat section tersebut masuk ke dalam viewport (layar pengguna),
  // yang memicu animasi fade-in/slide-up dari CSS.
  // Ini lebih efisien daripada menggunakan event listener 'scroll'.

  const sectionsToAnimate = document.querySelectorAll(".hidden-section");

  const observerOptions = {
    root: null, // relative to the viewport
    rootMargin: "0px",
    threshold: 0.1, // trigger when 10% of the element is visible
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      // Jika elemen (section) terlihat di layar
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        // Berhenti mengamati elemen ini setelah animasi dijalankan sekali
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Mulai amati setiap section yang memiliki class '.hidden-section'
  sectionsToAnimate.forEach((section) => {
    observer.observe(section);
  });

  // --- Hero Background Slideshow ---
  // Ganti background header dengan gambar dari folder assets/landingpage_*.png
  const heroBg = document.querySelector(".hero-bg");
  if (heroBg) {
    const images = [
      "assets/landingpage_01.png",
      "assets/landingpage_02.png",
      "assets/landingpage_03.png",
    ];
    let idx = 0;
    const heroTitleEl = document.querySelector(".hero-title-rotating");
    // We'll use an in-file Typed-like effect to type/delete titles on the H1
    const typedOptions = {
      strings: [
        "Belajar Setir Mobil dengan Percaya Diri & Aman bersama Global Mandiri",
        "Kursus Mengemudi Paket 10 Jam + SIM A Hanya 1,4 Juta",
        "Dari Nol Hingga Profesional: Instruktur Berpengalaman, Pembelajaran yang Sabar.",
      ],
      typeSpeed: 100, // ms per character
      backSpeed: 100, // ms per character when deleting
      backDelay: 1000, // ms delay before deleting
      loop: true,
    };

    // simple helper sleep
    const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

    // Typed-like function (no external lib)
    async function startTyped(el, opts) {
      if (!el) return;
      const { strings, typeSpeed, backSpeed, backDelay, loop } = opts;
      let ix = 0;
      while (true) {
        const str = strings[ix % strings.length];
        // type
        el.textContent = "";
        for (let i = 0; i < str.length; i++) {
          el.textContent += str.charAt(i);
          await sleep(typeSpeed);
        }
        // wait before deleting
        await sleep(backDelay);
        // delete
        for (let i = str.length - 1; i >= 0; i--) {
          el.textContent = str.substring(0, i);
          await sleep(backSpeed);
        }
        ix++;
        if (!loop && ix >= strings.length) break;
      }
    }
    // Preload images to avoid blank frames during swap
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });

    // Set initial image only after it's likely loaded (small timeout)
    heroBg.style.opacity = 0;
    setTimeout(() => {
      heroBg.style.backgroundImage = `url('${images[idx]}')`;
      if (heroTitleEl) startTyped(heroTitleEl, typedOptions);
      heroBg.style.opacity = 1;
    }, 80);

    // Change image every 5 seconds with a simple fade
    setInterval(() => {
      idx = (idx + 1) % images.length;
      // fade out
      heroBg.style.opacity = 0;
      setTimeout(() => {
        heroBg.style.backgroundImage = `url('${images[idx]}')`;
        // update title with a small fade
        if (heroTitleEl) {
          heroTitleEl.classList.add("fade-out");
          setTimeout(() => {
            heroTitleEl.classList.remove("fade-out");
          }, 220);
        }
        // fade in background
        heroBg.style.opacity = 1;
      }, 400); // slightly shorter but still smooth
    }, 5000);
  }
});
