(function () {
  const track = document.querySelector('.carousel-images');
  const slides = document.querySelectorAll('.carousel-images img');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  if (!track || slides.length === 0 || !prevBtn || !nextBtn) return;

  let index = 0;

  function showImage(i) {
    if (i < 0) index = slides.length - 1;
    else if (i >= slides.length) index = 0;
    else index = i;
    track.style.transform = `translateX(-${index * 100}%)`;
  }

  prevBtn.addEventListener('click', () => showImage(index - 1));
  nextBtn.addEventListener('click', () => showImage(index + 1));

  // Teclado ← →
  window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') showImage(index - 1);
    if (e.key === 'ArrowRight') showImage(index + 1);
  });
})();
