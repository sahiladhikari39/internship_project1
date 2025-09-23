// script.js - reusable slider function for multiple sliders
document.addEventListener('DOMContentLoaded', () => {

  function initSlider(sliderSelector, slideClass) {
    const slider = document.querySelector(sliderSelector);
    if (!slider) return; // no slider found

    const slides = Array.from(slider.querySelectorAll(slideClass));
    const nextBtn = slider.querySelector('.next');
    const prevBtn = slider.querySelector('.prev');
    const dotsContainer = slider.querySelector('.dots');

    let current = 0;
    const AUTOPLAY_INTERVAL = 4000; // ms
    let timer = null;

    // create dots
    function createDots() {
      slides.forEach((_, i) => {
        const btn = document.createElement('button');
        btn.className = 'dot';
        btn.type = 'button';
        btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
        btn.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(btn);
      });
    }

    function updateUI() {
      slides.forEach((s, idx) => s.classList.toggle('active', idx === current));
      const dots = Array.from(dotsContainer.querySelectorAll('.dot'));
      dots.forEach((d, idx) => d.classList.toggle('active', idx === current));
    }

    function goTo(index) {
      current = (index + slides.length) % slides.length;
      updateUI();
      resetAutoplay();
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAutoplay() {
      stopAutoplay();
      timer = setInterval(next, AUTOPLAY_INTERVAL);
    }
    function stopAutoplay() {
      if (timer) { clearInterval(timer); timer = null; }
    }
    function resetAutoplay() {
      stopAutoplay();
      startAutoplay();
    }

    // init
    createDots();
    updateUI();
    startAutoplay();

    // event listeners
    if (nextBtn) nextBtn.addEventListener('click', next);
    if (prevBtn) prevBtn.addEventListener('click', prev);

    // pause on hover/focus
    slider.addEventListener('mouseenter', stopAutoplay);
    slider.addEventListener('mouseleave', startAutoplay);
    slider.addEventListener('focusin', stopAutoplay);
    slider.addEventListener('focusout', startAutoplay);

    // keyboard support (optional: applies to active slider only if hovered/focused)
    slider.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    });
  }

  // initialize both sliders
  initSlider('.slider-container', '.slide');
  initSlider('.slider-container-fifth', '.slide-fifth');
});
