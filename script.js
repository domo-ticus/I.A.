/* Carrusel minimal con autoplay, pausa al hover, teclado y swipe */
(() => {
  const wrap = document.querySelector('.carousel');
  if (!wrap) return;

  const track = wrap.querySelector('.track');
  const slides = [...wrap.querySelectorAll('img')];
  const prev = wrap.querySelector('.prev');
  const next = wrap.querySelector('.next');
  const dotsWrap = wrap.querySelector('.dots');

  let index = 0;
  let auto = null;
  const INTERVAL = 5000;

  // Crear dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Ir a la imagen ${i + 1}`);
    dot.addEventListener('click', () => show(i));
    dotsWrap.appendChild(dot);
  });

  function updateDots() {
    [...dotsWrap.children].forEach((d, i) =>
      d.setAttribute('aria-selected', i === index ? 'true' : 'false')
    );
  }

  function show(i) {
    if (i < 0) index = slides.length - 1;
    else if (i >= slides.length) index = 0;
    else index = i;
    track.style.transform = `translateX(-${index * 100}%)`;
    updateDots();
  }

  // Controles
  prev.addEventListener('click', () => show(index - 1));
  next.addEventListener('click', () => show(index + 1));

  // Teclado
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });

  // Swipe
  let startX = null;
  wrap.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  }, { passive: true });

  wrap.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (dx > 40) show(index - 1);
    if (dx < -40) show(index + 1);
    startX = null;
  }, { passive: true });

  // Autoplay
  function startAuto(){ stopAuto(); auto = setInterval(() => show(index + 1), INTERVAL); }
  function stopAuto(){ if (auto) clearInterval(auto), auto = null; }
  wrap.addEventListener('mouseenter', stopAuto);
  wrap.addEventListener('mouseleave', startAuto);

  // Init
  show(0);
  startAuto();
})();

