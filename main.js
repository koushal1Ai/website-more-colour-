/* ==========================================================================
   TEACH TO LEARN - JAVASCRIPT LOGIC
   5-Second Hero Slider, Dropdown Navigation & Stats Counter
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --------------------------------------------------
  // 1. HERO SLIDER AUTOMATIC TRANSITION (5 SECONDS DELAY, CONTINUOUS)
  // --------------------------------------------------
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.slider-dots-vertical .dot');
  let currentSlideIndex = 0;
  const slideIntervalTime = 5000; // 5 Seconds automatic switch
  let slideTimer = null;

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentSlideIndex = index;
  }

  function nextSlide() {
    let nextIndex = (currentSlideIndex + 1) % slides.length;
    goToSlide(nextIndex);
  }

  function startSlideTimer() {
    if (slideTimer) clearInterval(slideTimer);
    slideTimer = setInterval(nextSlide, slideIntervalTime);
  }

  // Dot click events
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      goToSlide(index);
      startSlideTimer(); // Reset 5-second interval on manual click
    });
  });

  // Start slider
  if (slides.length > 0) {
    goToSlide(0);
    startSlideTimer();
  }

  // --------------------------------------------------
  // 2. STICKY HEADER & BACK TO TOP BUTTON
  // --------------------------------------------------
  const header = document.querySelector('.main-header');
  const backToTopBtn = document.getElementById('backToTopBtn');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    if (window.scrollY > 300) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  backToTopBtn?.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // --------------------------------------------------
  // 3. MOBILE MENU TOGGLE
  // --------------------------------------------------
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  mobileToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('mobile-open');
  });

  // --------------------------------------------------
  // 4. ANIMATED STATS COUNTER ON SCROLL
  // --------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateCounters() {
    const achievementsGrid = document.querySelector('.achievements-banner-wrap');
    if (!achievementsGrid || animated) return;

    const rect = achievementsGrid.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      animated = true;
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target') || stat.innerText);
        if (isNaN(target)) return;

        let current = 0;
        const increment = Math.ceil(target / 40);
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            stat.innerText = target + '+';
            clearInterval(timer);
          } else {
            stat.innerText = current + '+';
          }
        }, 30);
      });
    }
  }

  window.addEventListener('scroll', animateCounters);
  animateCounters(); // Initial check
});
