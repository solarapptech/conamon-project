/* ============================================================
   Conamon Project — Lightbox (screenshot viewer with zoom)
   Exposes window.CP_lightbox.bind(container) for grids whose
   children carry [data-lightbox="<image src>"].
   Requires js/i18n.js.
   ============================================================ */

(function () {
  let box = null;
  let img = null;
  let items = [];
  let index = 0;
  let scale = 1;

  function t(key) { return window.CP_i18n.t(key); }

  function ensureBox() {
    if (box) return;
    box = document.createElement('div');
    box.className = 'lightbox';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'true');
    box.innerHTML =
      '<div class="lightbox-stage"><img alt=""></div>' +
      '<button class="lightbox-btn lightbox-close" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg></button>' +
      '<button class="lightbox-btn lightbox-prev" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg></button>' +
      '<button class="lightbox-btn lightbox-next" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6l6 6-6 6"/></svg></button>' +
      '<div class="lightbox-zoom">' +
      '<button class="lightbox-btn zoom-out" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M8 11h6"/></svg></button>' +
      '<button class="lightbox-btn zoom-in" type="button"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/></svg></button>' +
      '</div>';
    document.body.appendChild(box);
    img = box.querySelector('img');

    box.querySelector('.lightbox-close').addEventListener('click', close);
    box.querySelector('.lightbox-prev').addEventListener('click', () => step(-1));
    box.querySelector('.lightbox-next').addEventListener('click', () => step(1));
    box.querySelector('.zoom-in').addEventListener('click', () => zoom(0.35));
    box.querySelector('.zoom-out').addEventListener('click', () => zoom(-0.35));
    box.addEventListener('click', (e) => { if (e.target === box) close(); });
    img.addEventListener('dblclick', () => zoom(0.5));
    document.addEventListener('keydown', (e) => {
      if (!box.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === '+' || e.key === '=') zoom(0.35);
      if (e.key === '-') zoom(-0.35);
    });
  }

  function applyLabels() {
    box.querySelector('.lightbox-close').setAttribute('aria-label', t('lightbox.close'));
    box.querySelector('.lightbox-prev').setAttribute('aria-label', t('lightbox.prev'));
    box.querySelector('.lightbox-next').setAttribute('aria-label', t('lightbox.next'));
    box.querySelector('.zoom-in').setAttribute('aria-label', t('lightbox.zoomIn'));
    box.querySelector('.zoom-out').setAttribute('aria-label', t('lightbox.zoomOut'));
  }

  function applyScale() {
    img.style.transform = 'scale(' + scale + ')';
    img.style.maxWidth = scale > 1 ? 'none' : '92vw';
    img.style.maxHeight = scale > 1 ? 'none' : '86vh';
  }

  function zoom(delta) {
    scale = Math.min(4, Math.max(1, scale + delta));
    applyScale();
  }

  function show(i) {
    index = (i + items.length) % items.length;
    scale = 1;
    img.src = items[index].src;
    img.alt = items[index].alt;
    applyScale();
  }

  function step(dir) { show(index + dir); }

  function open(i) {
    ensureBox();
    applyLabels();
    show(i);
    box.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    box.classList.remove('open');
    document.body.style.overflow = '';
  }

  window.CP_lightbox = {
    bind(container) {
      items = Array.from(container.querySelectorAll('[data-lightbox]')).map((el) => ({
        el,
        src: el.getAttribute('data-lightbox'),
        alt: (el.querySelector('img') || {}).alt || ''
      }));
      items.forEach((item, i) => {
        item.el.addEventListener('click', () => open(i));
      });
    }
  };
})();
