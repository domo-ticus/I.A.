/* Carrusel básico con teclado y swipe */
(function () {
  const track = document.querySelector('.carousel .track');
  if (!track) return;

  const slides = Array.from(track.querySelectorAll('img'));
  const prev = document.querySelector('.carousel .prev');
  const next = document.querySelector('.carousel .next');
  const dotsWrap = document.querySelector('.carousel .dots');

  let index = 0;

  // Crear dots
  slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.setAttribute('aria-label', `Ir a la imagen ${i + 1}`);
    b.addEventListener('click', () => show(i));
    dotsWrap.appendChild(b);
  });

  function updateDots() {
    [...dotsWrap.children].forEach((b, i) =>
      b.setAttribute('aria-selected', i === index ? 'true' : 'false')
    );
  }

  function show(i) {
    if (i < 0) index = slides.length - 1;
    else if (i >= slides.length) index = 0;
    else index = i;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe
  let startX = null;
  const surface = document.querySelector('.carousel');
  surface.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  surface.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 40) show(index - 1);
    if (dx < -40) show(index + 1);
    startX = null;
  }, { passive: true });

  // Inicial
  show(0);
})();
