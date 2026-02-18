console.log("VISION PRO CAROUSEL FINAL");

document.addEventListener('DOMContentLoaded', () => {

  const wrapper = document.getElementById('slider-wrapper');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');


  // =========================
  // CREATE SLIDES
  // =========================

  slides.forEach(s => {

    const slide = document.createElement('a');
    slide.className = 'slide';
    slide.href = s.link || '#';

    const img = document.createElement('img');
    img.src = s.src;

    const overlay = document.createElement('div');
    overlay.className = 'slide-overlay';
    overlay.textContent = s.id.toUpperCase();

    slide.appendChild(img);
    slide.appendChild(overlay);

    slide.addEventListener('click', (e) => {

      e.preventDefault();

      centerSlide(slide);

    });

    wrapper.appendChild(slide);

  });


  const slideElements =
    document.querySelectorAll('.slide');


  // =========================
  // CENTER FUNCTION
  // =========================

  function centerSlide(slide) {

    wrapper.scrollTo({

      left:
        slide.offsetLeft
        - wrapper.offsetWidth / 2
        + slide.offsetWidth / 2,

      behavior: 'smooth'
    });
  }


  // =========================
  // VISION PRO EFFECT
  // =========================

  function updateCarousel() {

    const center =
      wrapper.scrollLeft + wrapper.offsetWidth / 2;

    const isMobile =
      window.innerWidth <= 768;

    slideElements.forEach(slide => {

      const slideCenter =
        slide.offsetLeft + slide.offsetWidth / 2;

      const distance =
        Math.abs(center - slideCenter);

      const maxDistance =
        wrapper.offsetWidth / 2;

      const normalized =
        Math.min(distance / maxDistance, 1);


      // SAFE SCALE
      const scale =
        isMobile
        ? 1.06 - normalized * 0.35
        : 1.18 - normalized * 0.55;


      // SAFE Y OFFSET
      const y =
        isMobile
        ? normalized * 12
        : normalized * 28;


      // OPACITY
      const opacity =
        1 - normalized * 0.6;


      slide.style.transform =
        `translateY(${y}px) scale(${scale})`;

      slide.style.opacity =
  0.7 + (1 - normalized) * 0.3;


    });
  }


  // =========================
  // SCROLL
  // =========================

  wrapper.addEventListener(
    'scroll',
    () => requestAnimationFrame(updateCarousel)
  );


  // =========================
  // BUTTON CONTROL
  // =========================

  function scrollNext() {

    wrapper.scrollBy({
      left: wrapper.offsetWidth * 0.6,
      behavior: 'smooth'
    });
  }

  function scrollPrev() {

    wrapper.scrollBy({
      left: -wrapper.offsetWidth * 0.6,
      behavior: 'smooth'
    });
  }

  prevBtn?.addEventListener('click', scrollPrev);
  nextBtn?.addEventListener('click', scrollNext);


  // =========================
  // MOUSE WHEEL
  // =========================

  wrapper.addEventListener('wheel', (e) => {

    e.preventDefault();

    wrapper.scrollBy({
      left: e.deltaY,
      behavior: 'auto'
    });

  }, { passive:false });


  // =========================
  // INIT
  // =========================

  updateCarousel();


  // =========================
  // NAVBAR EFFECT
  // =========================

  window.addEventListener('scroll', () => {

    const navbar =
      document.querySelector('.navbar');

    if (window.scrollY > 50)
      navbar.classList.add('scrolled');
    else
      navbar.classList.remove('scrolled');

  });

});
