document.addEventListener("DOMContentLoaded", () => {
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
});
