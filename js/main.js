/* ============================================================
   Conamon Project — Main site behavior
   Header, mobile nav, hero cover/trailer slider, device- and
   language-aware trailers, screenshots gallery, cover fallback.
   Requires js/i18n.js. Optionally uses js/lightbox.js.
   ============================================================ */

/* Trailer YouTube video IDs.
   TODO: add the mobile (portrait) trailer URLs once uploaded. */
const TRAILERS = {
  desktop: { en: 'v2JzwsFJEd4', es: 'QeX-KmxnC6E' },
  mobile: { en: '', es: '' } // '' = not uploaded yet -> falls back to desktop
};

(function () {
  const BASE = window.BASE || '';
  const mobileQuery = window.matchMedia('(max-width: 767px)');

  function isMobile() { return mobileQuery.matches; }

  function currentTrailerId() {
    const lang = window.CP_LANG || 'en';
    const device = isMobile() ? 'mobile' : 'desktop';
    const id = TRAILERS[device][lang];
    // Fall back to the desktop trailer when the mobile one is not set.
    return id || TRAILERS.desktop[lang];
  }

  /* ---------- Trailer facades ---------- */
  function buildTrailer(container) {
    const t = window.CP_i18n.t;
    const id = currentTrailerId();
    container.innerHTML = '';
    if (!id) {
      const msg = document.createElement('div');
      msg.className = 'video-facade';
      msg.innerHTML = '<span class="video-unavailable">' + t('trailer.unavailable') + '</span>';
      container.appendChild(msg);
      return;
    }
    const facade = document.createElement('button');
    facade.className = 'video-facade';
    facade.style.backgroundImage = 'url(https://i.ytimg.com/vi/' + id + '/hqdefault.jpg)';
    facade.setAttribute('aria-label', t('hero.watchTrailer'));
    facade.innerHTML =
      '<span class="video-play"><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.14v13.72a1 1 0 0 0 1.52.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86A1 1 0 0 0 8 5.14z"/></svg></span>';
    facade.addEventListener('click', () => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0';
      iframe.title = 'YouTube video player';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.allowFullscreen = true;
      container.innerHTML = '';
      container.appendChild(iframe);
      // Mark the hero as "playing" so the trailer toggle / overlay icons hide
      // out of the way (see initHero + .hero.video-playing in style.css).
      const hero = container.closest('.hero');
      if (hero) hero.classList.add('video-playing');
    });
    container.appendChild(facade);
  }

  function rebuildTrailers() {
    document.querySelectorAll('[data-trailer]').forEach(buildTrailer);
  }

  /* ---------- Header ---------- */
  function initHeader() {
    const header = document.querySelector('.site-header');
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const burger = document.getElementById('hamburger');
    if (burger) {
      burger.addEventListener('click', () => {
        const open = document.body.classList.toggle('nav-open');
        burger.setAttribute('aria-expanded', open);
      });
    }

    // Dropdowns toggle on click (needed for touch devices); hover works via CSS on desktop.
    // Handles both the classic single-button dropdowns and the split Games
    // dropdown (link + .nav-dropdown-caret toggle).
    document.querySelectorAll('.nav-dropdown > button, .nav-dropdown-caret').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const dd = btn.closest('.nav-dropdown');
        const wasOpen = dd.classList.contains('open');
        document.querySelectorAll('.nav-dropdown.open').forEach((d) => {
          d.classList.remove('open');
          const b = d.querySelector('button');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        dd.classList.toggle('open', !wasOpen);
        btn.setAttribute('aria-expanded', String(!wasOpen));
      });
    });
    document.addEventListener('click', () => {
      document.querySelectorAll('.nav-dropdown.open').forEach((d) => d.classList.remove('open'));
    });

    // Close mobile nav when a link is tapped.
    document.querySelectorAll('.main-nav a').forEach((a) => {
      a.addEventListener('click', () => document.body.classList.remove('nav-open'));
    });
  }

  /* ---------- Hero slider (cover <-> trailer) ---------- */
  function initHero() {
    const hero = document.querySelector('.hero');
    const toggle = document.getElementById('trailerToggle');
    if (!hero || !toggle) return;

    const toggleLabel = toggle.querySelector('[data-i18n="hero.watchTrailer"]');
    function syncToggleLabel() {
      if (!window.CP_i18n || !toggleLabel) return;
      const onTrailer = hero.classList.contains('show-video');
      const key = onTrailer ? 'hero.goBack' : 'hero.watchTrailer';
      toggleLabel.textContent = window.CP_i18n.t(key);
      toggleLabel.setAttribute('data-i18n', key);
      toggle.setAttribute('aria-label', window.CP_i18n.t(onTrailer ? 'hero.goBackAria' : 'hero.watchTrailerAria'));
    }

    toggle.addEventListener('click', () => {
      const wasPlaying = hero.classList.contains('video-playing');
      hero.classList.toggle('show-video');
      syncToggleLabel();
      // Going back to the cover: stop the trailer and clear the playing state
      // so the toggle/overlay icons are fully visible again on the cover.
      if (wasPlaying && !hero.classList.contains('show-video')) {
        hero.classList.remove('video-playing', 'show-toggle');
        rebuildTrailers();
      }
    });

    // Keep the toggle label in sync with the current language.
    document.addEventListener('langchange', syncToggleLabel);

    // While the trailer plays, the toggle (and any overlay icons) auto-hide so
    // they don't sit on top of the video. Briefly reveal them on mouse/touch
    // movement so the user can still slide back to the cover — mirrors how
    // YouTube's own controls behave.
    let hideTimer = null;
    function revealToggleBriefly() {
      if (!hero.classList.contains('video-playing')) return;
      hero.classList.add('show-toggle');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => hero.classList.remove('show-toggle'), 2600);
    }
    hero.addEventListener('mousemove', revealToggleBriefly, { passive: true });
    hero.addEventListener('touchstart', revealToggleBriefly, { passive: true });
    hero.addEventListener('click', revealToggleBriefly);
  }

  /* ---------- Screenshots gallery (device-aware) ---------- */
  function initScreenshots() {
    const grid = document.getElementById('screenshotsGrid');
    if (!grid) return;
    const dir = isMobile()
      ? 'Assets/stop-the-game/images/screenshots-phone/'
      : 'Assets/stop-the-game/images/screenshots-desktop/';
    const prefix = isMobile() ? 'screenshot-stopthegame-mobile-' : 'screenshot-stopthegame-';
    const count = isMobile() ? 7 : 8;
    grid.classList.toggle('phone-shots', isMobile());
    grid.innerHTML = '';
    for (let i = 0; i < count; i++) {
      const src = BASE + dir + prefix + i + '.jpg';
      const btn = document.createElement('button');
      btn.className = 'shot';
      btn.setAttribute('data-lightbox', src);
      btn.innerHTML = '<img src="' + src + '" alt="Stop The Game screenshot ' + (i + 1) + '" loading="lazy">';
      grid.appendChild(btn);
    }
    if (window.CP_lightbox) window.CP_lightbox.bind(grid);
  }

  /* ---------- Cover images with desktop fallback ---------- */
  function initCovers() {
    document.querySelectorAll('[data-cover-desktop]').forEach((el) => {
      const desktop = el.getAttribute('data-cover-desktop');
      const mobile = el.getAttribute('data-cover-mobile');
      const t = window.CP_i18n.t;
      function showPlaceholder() {
        el.innerHTML =
          '<div class="img-placeholder">' +
          '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 12h4m-2-2v4m7-3h.01M18 13h.01M17.32 5H6.68a4 4 0 0 0-3.98 3.59C2.6 9.42 2 14.46 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.54-.6-6.58-.68-7.26A4 4 0 0 0 17.32 5z"/></svg>' +
          '<span>' + t('detail.noImage') + '</span></div>';
      }
      function load(src, next) {
        if (!src) { next(); return; }
        const probe = new Image();
        probe.onload = () => {
          el.innerHTML = '<img src="' + BASE + src + '" alt="' + (el.getAttribute('data-cover-alt') || 'Game cover') + '">';
        };
        probe.onerror = next;
        probe.src = BASE + src;
      }
      const preferred = isMobile() && mobile ? mobile : desktop;
      load(preferred, () => load(desktop, showPlaceholder));
    });
  }

  /* ---------- Scroll reveal ---------- */
  let revealObserver = null;
  function observeReveals(root) {
    if (!('IntersectionObserver' in window)) {
      (root || document).querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
    }
    (root || document).querySelectorAll('.reveal:not(.visible)').forEach((el) => revealObserver.observe(el));
  }
  window.CP_observeReveals = observeReveals;

  /* ---------- Back link (history-aware) ---------- */
  function initBackLink() {
    const link = document.getElementById('backLink');
    if (!link) return;
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (window.history.length > 1) {
        window.history.back();
      } else {
        window.location.href = link.getAttribute('href');
      }
    });
  }

  /* ---------- Back to top button ---------- */
  function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;
    let ticking = false;
    function update() {
      // Show after scrolling past ~1.5 viewport heights; hide again near the top.
      btn.classList.toggle('visible', window.scrollY > window.innerHeight * 1.2);
      ticking = false;
    }
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    update();
  }

  /* ---------- Boot ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initHero();
    initBackLink();
    initBackToTop();
    rebuildTrailers();
    initScreenshots();
    initCovers();
    observeReveals(document);
  });

  // Rebuild device-dependent content when language or viewport class changes.
  document.addEventListener('langchange', () => {
    rebuildTrailers();
    initScreenshots();
  });
  mobileQuery.addEventListener('change', () => {
    rebuildTrailers();
    initScreenshots();
    initCovers();
  });
})();
