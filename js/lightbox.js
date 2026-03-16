/* =============================================
   LIGHTBOX JAVASCRIPT
   
   Key concepts used here:
   - querySelectorAll: grabs all matching elements
   - addEventListener: listens for user events
   - dataset: reads data-* attributes from HTML
   - Array.from: converts a NodeList to an Array
     so we can use array methods like indexOf
   ============================================= */

(function () {
  // The IIFE (Immediately Invoked Function Expression)
  // wraps everything so our variables don't pollute
  // the global scope — a good JS hygiene habit.

  const lightbox     = document.querySelector('.lightbox');
  const lightboxImg  = document.querySelector('.lightbox img');
  const closeBtn     = document.querySelector('.lightbox-close');
  const prevBtn      = document.querySelector('.lightbox-prev');
  const nextBtn      = document.querySelector('.lightbox-next');
  const counter      = document.querySelector('.lightbox-counter');
  const photoItems   = document.querySelectorAll('.photo-item');

  if (!lightbox) return; // exit if no lightbox on this page

  // Build a simple array of image sources from the grid
  const images = Array.from(photoItems).map(item => ({
    src: item.querySelector('img').src,
    alt: item.querySelector('img').alt,
  }));

  let current = 0; // tracks which photo is open

  function open(index) {
    current = index;
    render();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // prevent background scroll
  }

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  function render() {
    lightboxImg.src = images[current].src;
    lightboxImg.alt = images[current].alt;
    counter.textContent = `${current + 1} / ${images.length}`;
  }

  function prev() {
    // Modulo wraps around: if at 0, go to last
    current = (current - 1 + images.length) % images.length;
    render();
  }

  function next() {
    current = (current + 1) % images.length;
    render();
  }

  // Attach click listeners to each photo item
  photoItems.forEach((item, index) => {
    item.addEventListener('click', () => open(index));
  });

  closeBtn.addEventListener('click', close);
  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // Close when clicking the dark backdrop (not the image)
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) close();
  });

  // =============================================
  // KEYBOARD NAVIGATION
  // keydown fires when any key is pressed.
  // e.key tells us which key it was.
  // =============================================
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'ArrowLeft')  prev();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'Escape')     close();
  });

})();
