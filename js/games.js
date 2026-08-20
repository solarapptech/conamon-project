/* ============================================================
   Conamon Project — Game catalog data & card rendering
   Used by index.html (#gameGrid) and games.html (#catalogGrid).
   Requires window.BASE (path prefix to site root) and js/i18n.js.
   ============================================================ */

/* Maximum number of games shown in the header "Games" dropdown.
   Change this number to show more/fewer items in the nav dropdown. */
const NAV_GAME_LIMIT = 4;

const GAMES = [
  {
    id: 'stop-the-game',
    title: 'Stop The Game',
    status: 'released',
    descKey: 'games.stop.desc',
    page: 'games/stop-the-game.html',
    play: 'https://www.playstop.xyz',
    coverDesktop: 'Assets/stop-the-game/images/Landscape-16.9-1920x1080.jpg',
    coverMobile: 'Assets/stop-the-game/images/portrait-2.3-800x1200.jpg'
  },
  {
    id: 'conamon',
    title: 'Conamon',
    status: 'indev',
    descKey: 'games.tba',
    page: 'games/conamon.html',
    play: null,
    coverDesktop: null, // TODO: add cover when artwork is ready
    coverMobile: null
  },
  {
    id: 'stomp-blocks',
    title: 'Stomp Blocks',
    status: 'indev',
    descKey: 'games.tba',
    page: 'games/stomp-blocks.html',
    play: null,
    coverDesktop: null, // TODO: add cover when artwork is ready
    coverMobile: null
  }
];

(function () {
  const BASE = window.BASE || '';

  function placeholderHTML() {
    return (
      '<div class="img-placeholder">' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      '<path d="M6 12h4m-2-2v4m7-3h.01M18 13h.01M17.32 5H6.68a4 4 0 0 0-3.98 3.59C2.6 9.42 2 14.46 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.54-.6-6.58-.68-7.26A4 4 0 0 0 17.32 5z"/>' +
      '</svg><span data-i18n="img.placeholder">Image coming soon</span></div>'
    );
  }

  function cardHTML(game) {
    const t = window.CP_i18n.t;
    const badgeClass = game.status === 'released' ? 'released' : 'dev';
    const badgeKey = game.status === 'released' ? 'status.released' : 'status.indev';
    const media = game.coverDesktop
      ? '<img src="' + BASE + game.coverDesktop + '" alt="' + game.title + ' cover art" loading="lazy" ' +
        'onerror="this.outerHTML=this.dataset.ph" data-ph=\'' + placeholderHTML().replace(/'/g, '&#39;') + '\'>'
      : placeholderHTML();
    return (
      '<a class="game-card reveal" href="' + BASE + game.page + '">' +
      '<div class="game-card-media">' + media +
      '<span class="badge ' + badgeClass + '" data-i18n="' + badgeKey + '">' + t(badgeKey) + '</span>' +
      '</div>' +
      '<div class="game-card-body"><h3>' + game.title + '</h3>' +
      '<p data-i18n="' + game.descKey + '">' + t(game.descKey) + '</p>' +
      '<span class="game-card-cta">' + t('games.viewGame') +
      ' <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>' +
      '</span></div></a>'
    );
  }

  function sortedGames(mode) {
    const list = GAMES.slice();
    if (mode === 'name') list.sort((a, b) => a.title.localeCompare(b.title));
    if (mode === 'status') list.sort((a, b) => (a.status === b.status ? 0 : a.status === 'released' ? -1 : 1));
    return list;
  }

  function renderInto(el, games) {
    el.innerHTML = games.map(cardHTML).join('');
    if (window.CP_observeReveals) window.CP_observeReveals(el);
  }

  /* ---------- Header "Games" dropdown ---------- */
  function navGameItemHTML(game) {
    const t = window.CP_i18n.t;
    const badgeClass = game.status === 'released' ? 'released' : 'dev';
    const badgeKey = game.status === 'released' ? 'status.released' : 'status.indev';
    return (
      '<a href="' + BASE + game.page + '"><span>' + game.title + '</span>' +
      '<span class="badge ' + badgeClass + '" data-i18n="' + badgeKey + '">' + t(badgeKey) + '</span></a>'
    );
  }

  function renderNavGames() {
    const menus = document.querySelectorAll('[data-nav-games-menu]');
    if (!menus.length) return;
    const t = window.CP_i18n ? window.CP_i18n.t : (k => k);
    const games = sortedGames('featured').slice(0, NAV_GAME_LIMIT);
    let html = games.map(navGameItemHTML).join('');
    // If there are more games than the limit, add a "View All" link.
    if (GAMES.length > NAV_GAME_LIMIT) {
      html += '<a class="dropdown-view-all" href="' + BASE + 'games.html"><span>' + t('games.showAll') + '</span>' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></a>';
    }
    menus.forEach(m => { m.innerHTML = html; });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderNavGames();

    const homeGrid = document.getElementById('gameGrid');
    if (homeGrid) {
      renderInto(homeGrid, sortedGames('featured').slice(0, 3));
      // The "Show All" button is only relevant when there are more games than
      // the home grid preview (3). Hide it otherwise.
      const showAll = document.querySelector('#games .games-actions');
      if (showAll) showAll.style.display = GAMES.length > 3 ? '' : 'none';
    }

    const catalogGrid = document.getElementById('catalogGrid');
    const sortSelect = document.getElementById('catalogSort');
    if (catalogGrid) {
      renderInto(catalogGrid, sortedGames(sortSelect ? sortSelect.value : 'featured'));
      if (sortSelect) {
        sortSelect.addEventListener('change', () => renderInto(catalogGrid, sortedGames(sortSelect.value)));
      }
    }

    document.addEventListener('langchange', () => {
      renderNavGames();
      if (homeGrid) renderInto(homeGrid, sortedGames('featured').slice(0, 3));
      if (catalogGrid) renderInto(catalogGrid, sortedGames(sortSelect ? sortSelect.value : 'featured'));
    });
  });
})();
