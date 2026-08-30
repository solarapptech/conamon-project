/* ============================================================
   Conamon Project — i18n (client-side EN/ES)
   - Default: English
   - Persisted in localStorage ('cp-lang'), overridable via ?lang=es
   - Dispatches 'langchange' CustomEvent after a switch
   ============================================================ */

const I18N = {
  en: {
    'nav.games': 'Games',
    'nav.ourTeam': 'Team',
    'nav.contact': 'Contact',
    'nav.playNow': 'Play Now',
    'nav.menu': 'Menu',

    'status.released': 'Released',
    'status.indev': 'In-Development',

    'hero.tagline': 'A word game where speed and wit win. Stop the game before your friends do!',
    'hero.playFree': 'Explore the game',
    'hero.watchTrailer': 'Watch Trailer',
    'hero.watchTrailerAria': 'Slide to gameplay trailer',
    'hero.goBack': 'Go Back',
    'hero.goBackAria': 'Slide back to cover',

    'games.title': 'Our Games',
    'games.subtitle': 'Worlds we are bringing to life! Play what is already out (it is free!) or come sneak a peek at what is coming.',
    'games.showAll': 'Show All',
    'games.viewGame': 'View Game',
    'games.stop.desc': 'The fast-paced multiplayer word game. Stop the game, steal the win!',
    'games.tba': 'Description: TBA',

    'team.title': 'Our Team',
    'team.bio': 'Greetings from Conamon Project, fellow traveler! We\'re Mages and game devs. We hope you enjoy your stay here. Let me introduce you to the crew',
    'team.role.tenubar': 'Programmer & Story Director',
    'team.role.dluci': 'Art Director & Illustrator',
    'team.role.jean': 'Music Composer',
    'team.noPhoto': 'No photo yet',

    'contact.title': 'Contact',
    'contact.text': 'Questions, feedback or just want to say hi? Reach us at',

    'footer.about': 'Conamon Project is an indie studio formed by magicians. We create original, fun games and worlds we would love to live in.',
    'footer.pages': 'Pages',
    'footer.home': 'Home',
    'footer.aboutLink': 'About',
    'footer.allGames': 'All Games',
    'footer.rights': '© 2026 Conamon Project. All rights reserved.',

    'catalog.title': 'All Games',
    'catalog.subtitle': 'Every world from Conamon Project in one place.',
    'catalog.sortBy': 'Sort by',
    'catalog.sortFeatured': 'Featured',
    'catalog.sortName': 'Name (A–Z)',
    'catalog.sortStatus': 'Release status',

    'detail.backToGames': 'Go Back',
    'detail.backHome': 'Back to Home',
    'detail.status': 'Status',
    'detail.studio': 'Studio',
    'detail.platforms': 'Platforms',
    'detail.platformsValue': 'Web (Browser)',
    'detail.genre': 'Genre',
    'detail.genreWord': 'Word / Party / Multiplayer',
    'detail.tba': 'TBA',
    'detail.descTba': 'Description: TBA',
    'detail.noImage': 'Artwork coming soon',

    'stop.trailerTitle': 'Gameplay Trailer',
    'stop.screenshots': 'Screenshots',
    'stop.about': 'About the Game',
    'stop.aboutText': 'Stop The Game is a fast-paced multiplayer word game where quick thinking wins. Find words across categories before the timer runs out — and be the one to stop the game!',
    'stop.playFree': 'Play For Free',

    'trailer.unavailable': 'Trailer coming soon for this device',

    'lightbox.close': 'Close',
    'lightbox.prev': 'Previous screenshot',
    'lightbox.next': 'Next screenshot',
    'lightbox.zoomIn': 'Zoom in',
    'lightbox.zoomOut': 'Zoom out',

    'lang.switching': 'Switching language…',
    'lang.english': 'English',
    'lang.spanish': 'Español',

    'img.placeholder': 'Image coming soon'
  },
  es: {
    'nav.games': 'Juegos',
    'nav.ourTeam': 'Equipo',
    'nav.contact': 'Contacto',
    'nav.playNow': 'Jugar Ahora',
    'nav.menu': 'Menú',

    'status.released': 'Lanzado',
    'status.indev': 'En Desarrollo',

    'hero.tagline': 'Un juego de palabras donde ganan la rapidez y el ingenio. ¡¡Stop The Game antes que tus amigos!!',
    'hero.playFree': 'Explorar el juego',
    'hero.watchTrailer': 'Ver Tráiler',
    'hero.watchTrailerAria': 'Deslizar al tráiler del juego',
    'hero.goBack': 'Volver',
    'hero.goBackAria': 'Volver a la portada',

    'games.title': 'Nuestros Juegos',
    'games.subtitle': '¡¡Mundos a los que estamos dando vida!! Juega lo que ya salió (¡Es Grátis!) o ven a chismear lo que se viene',
    'games.showAll': 'Ver Todos',
    'games.viewGame': 'Ver Juego',
    'games.stop.desc': 'El juego de palabras multijugador más trepidante. ¡Detén la partida y roba la victoria!',
    'games.tba': 'Descripción: Por anunciar',

    'team.title': 'Nuestro Equipo',
    'team.bio': '¡Saludos desde Conamon Project, viajero! Somos magos y desarrolladores de videojuegos. Esperamos que disfrutes de tu estancia aquí. Déjame presentarte al equipo',
    'team.role.tenubar': 'Programador y Director de Historia',
    'team.role.dluci': 'Directora de Arte e Ilustradora',
    'team.role.jean': 'Compositor de Música',
    'team.noPhoto': 'Foto próximamente',

    'contact.title': 'Contacto',
    'contact.text': '¿Preguntas, sugerencias o solo quieres saludar? Escríbenos a',

    'footer.about': 'Conamon Project es un estudio indie formado por magos. Creamos juegos originales, divertidos y mundos en los que nos encantaría vivir.',
    'footer.pages': 'Páginas',
    'footer.home': 'Inicio',
    'footer.aboutLink': 'Nosotros',
    'footer.allGames': 'Todos los Juegos',
    'footer.rights': '© 2026 Conamon Project. Todos los derechos reservados.',

    'catalog.title': 'Todos los Juegos',
    'catalog.subtitle': 'Todos los mundos de Conamon Project en un solo lugar.',
    'catalog.sortBy': 'Ordenar por',
    'catalog.sortFeatured': 'Destacados',
    'catalog.sortName': 'Nombre (A–Z)',
    'catalog.sortStatus': 'Estado de lanzamiento',

    'detail.backToGames': 'Volver',
    'detail.backHome': 'Volver al Inicio',
    'detail.status': 'Estado',
    'detail.studio': 'Estudio',
    'detail.platforms': 'Plataformas',
    'detail.platformsValue': 'Web (Navegador)',
    'detail.genre': 'Género',
    'detail.genreWord': 'Palabras / Fiesta / Multijugador',
    'detail.tba': 'Por anunciar',
    'detail.descTba': 'Descripción: Por anunciar',
    'detail.noImage': 'Arte próximamente',

    'stop.trailerTitle': 'Tráiler del Juego',
    'stop.screenshots': 'Capturas',
    'stop.about': 'Sobre el Juego',
    'stop.aboutText': 'Stop The Game es un trepidante juego de palabras multijugador donde gana quien piensa más rápido. Encuentra palabras en cada categoría antes de que acabe el tiempo — ¡y sé quien detenga la partida!',
    'stop.playFree': 'Jugar Gratis',

    'trailer.unavailable': 'Tráiler próximamente para este dispositivo',

    'lightbox.close': 'Cerrar',
    'lightbox.prev': 'Captura anterior',
    'lightbox.next': 'Captura siguiente',
    'lightbox.zoomIn': 'Acercar',
    'lightbox.zoomOut': 'Alejar',

    'lang.switching': 'Cambiando idioma…',
    'lang.english': 'English',
    'lang.spanish': 'Español',

    'img.placeholder': 'Imagen próximamente'
  }
};

(function () {
  const STORAGE_KEY = 'cp-lang';
  const SUPPORTED = ['en', 'es'];

  let overlay = null;

  function currentLang() {
    const urlParam = new URLSearchParams(window.location.search).get('lang');
    if (urlParam && SUPPORTED.includes(urlParam)) return urlParam;
    const saved = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(saved) ? saved : 'en';
  }

  function t(key) {
    const lang = window.CP_LANG || 'en';
    return (I18N[lang] && I18N[lang][key]) || I18N.en[key] || key;
  }

  function ensureOverlay() {
    if (overlay) return overlay;
    overlay = document.createElement('div');
    overlay.className = 'lang-overlay';
    overlay.innerHTML = '<div class="lang-spinner" role="status" aria-live="polite"></div><p></p>';
    document.body.appendChild(overlay);
    return overlay;
  }

  function apply(lang) {
    window.CP_LANG = lang;
    document.documentElement.setAttribute('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.getAttribute('data-i18n'));
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.getAttribute('data-i18n-aria')));
    });
    document.querySelectorAll('[data-i18n-content]').forEach((el) => {
      el.setAttribute('content', t(el.getAttribute('data-i18n-content')));
    });
    const toggle = document.getElementById('langCurrent');
    if (toggle) toggle.textContent = t(lang === 'en' ? 'lang.english' : 'lang.spanish');
    // The dropdown always offers the OTHER language.
    const other = lang === 'en' ? 'es' : 'en';
    document.querySelectorAll('[data-lang-switch]').forEach((el) => {
      el.setAttribute('data-lang-switch', other);
      const label = el.querySelector('span');
      if (label) label.textContent = I18N[other]['lang.' + (other === 'en' ? 'english' : 'spanish')];
    });
  }

  function setLang(lang, opts) {
    const initial = opts && opts.initial;
    if (!SUPPORTED.includes(lang)) lang = 'en';
    if (!initial) {
      const ov = ensureOverlay();
      ov.querySelector('p').textContent = I18N[lang]['lang.switching'];
      ov.classList.add('active');
    }
    localStorage.setItem(STORAGE_KEY, lang);
    apply(lang);
    if (!initial) {
      setTimeout(() => {
        overlay.classList.remove('active');
        document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
      }, 650);
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    setLang(currentLang(), { initial: true });
    document.querySelectorAll('[data-lang-switch]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const target = el.getAttribute('data-lang-switch');
        if (target !== window.CP_LANG) {
          const dd = el.closest('.nav-dropdown');
          if (dd) {
            dd.classList.add('force-close');
            dd.classList.remove('open');
            const btn = dd.querySelector('button');
            if (btn) { btn.setAttribute('aria-expanded', 'false'); btn.blur(); }
            dd.addEventListener('mouseenter', () => dd.classList.remove('force-close'), { once: true });
          }
          document.body.classList.remove('nav-open');
          setLang(target);
        }
      });
    });
  });

  window.CP_i18n = { t, setLang, get lang() { return window.CP_LANG || 'en'; } };
})();
