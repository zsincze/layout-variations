(function () {
  // Add filenames from assets/assets-images/ here (e.g. 'photo.jpg', 'hero.png')
  const ASSET_IMAGES = [
    'alyona-grishina-BBmi4nJjKk8-unsplash.jpg',
    'andres-garcia-duzqs13jvGc-unsplash.jpg',
    'annie-spratt-0ZPSX_mQ3xI-unsplash.jpg',
    'bailey-zindel-NRQV-hBF10M-unsplash.jpg',
    'ben-o-bro-wpU4veNGnHg-unsplash.jpg',
    'chang-duong-Sj0iMtq_Z4w-unsplash.jpg',
    'christopher-campbell-rDEOVtE7vOs-unsplash.jpg',
    'cristina-gottardi-CSpjU6hYo_0-unsplash.jpg',
    'daniela-kokina-hOhlYhAiizc-unsplash.jpg',
    'jeremy-cai-ucYWe5mzTMU-unsplash.jpg',
    'john-towner-3Kv48NS4WUU-unsplash.jpg',
    'kevin-matos-Nl_FMFpXo2g-unsplash.jpg',
    'luca-bravo-zAjdgNXsMeg-unsplash.jpg',
    'lucas-gouvea-aoEwuEH7YAs-unsplash.jpg',
    'matheus-ferrero-TkrRvwxjb_8-unsplash.jpg',
    'mymind-XUlsF9LYeVk-unsplash.jpg',
    'omar-lopez-1qfy-jDc_jo-unsplash.jpg',
    'pietro-de-grandi-T7K4aEPoGGk-unsplash.jpg',
    'pine-watt-2Hzmz15wGik-unsplash.jpg',
    'priscilla-du-preez-nF8xhLMmg0c-unsplash.jpg',
    'ryan-schroeder-Gg7uKdHFb_c-unsplash.jpg',
    'sean-pollock-PhYq704ffdA-unsplash.jpg',
    'silas-baisch-Wn4ulyzVoD4-unsplash.jpg',
    'simone-hutsch-jbyLu_fh5fY-unsplash.jpg',
    'simone-hutsch-l8fyK9RS-OU-unsplash.jpg',
    'stefan-stefancik-QXevDflbl8A-unsplash.jpg',
    'tobias-keller-73F4pKoUkM0-unsplash.jpg',
  ];

  const LABELS = {
    text: {
      title: 'Title',
      headline: 'Headline',
      paragraph: 'Paragraph',
      website: 'Website',
      logo: 'Logo',
    },
    micro: {
      'heading-content': 'Heading + content',
      'two-headings-contents': 'Two headings + contents',
      'heading-image': 'Heading + image',
      'two-col-heading-image': 'Two col: heading + image',
      'image-caption': 'Image + caption',
      'heading-two-contents': 'Heading + two contents',
      'media-object': 'Media object',
      'quote': 'Quote / testimonial',
      'stack': 'Stack',
      'grid': 'Grid',
      'columns': 'Columns',
      'cluster': 'Cluster',
      'cover': 'Cover',
      'heading-with-rules': 'Heading with rules',
      'label-value': 'Label + value',
      'step-numbered': 'Step / numbered',
      'list-icon': 'List + icon',
    },
  };

  const STORAGE_KEY = 'layout-experiment-state';
  const addWrap = document.getElementById('content-add-wrap');
  const addMenu = document.getElementById('content-add-menu');
  const imageSubmenu = document.getElementById('content-image-submenu');
  const textSubmenu = document.getElementById('content-text-submenu');
  const listEl = document.getElementById('content-list');

  function getFullState() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function saveFullState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {}
  }

  function getContentState() {
    if (!listEl) return [];
    return Array.from(listEl.querySelectorAll('.content-list-item')).map(function (li) {
      return {
        type: li.dataset.type || 'text',
        role: li.dataset.role || '',
        asset: li.dataset.asset || '',
      };
    });
  }

  var restoringFromStorage = false;

  function restoreContentFromStorage() {
    var state = getFullState();
    if (!state.content || !Array.isArray(state.content) || state.content.length === 0) return;
    if (!listEl) return;
    restoringFromStorage = true;
    listEl.innerHTML = '';
    state.content.forEach(function (block) {
      addItem(block.type, block.role || '', block.asset || '');
    });
    restoringFromStorage = false;
    document.dispatchEvent(new CustomEvent('content-changed'));
  }

  function getLabel(type, role, asset) {
    if (type === 'image') return asset || 'Image';
    if (type === 'micro') return LABELS.micro[role] || role || 'Micro layout';
    return LABELS.text[role] || role;
  }

  function addItem(type, role, asset) {
    var li = document.createElement('li');
    li.className = 'content-list-item';
    li.dataset.type = type;
    if (type === 'image' && asset) li.dataset.asset = asset;
    else if (role) li.dataset.role = role;

    if (type === 'image') {
      var thumbWrap = document.createElement('span');
      thumbWrap.className = 'content-list-thumb';
      var img = document.createElement('img');
      img.src = ASSETS_THUMBS_BASE + (asset || '');
      img.alt = '';
      img.className = 'content-list-thumb-img';
      thumbWrap.appendChild(img);
      var labelSpan = document.createElement('span');
      labelSpan.className = 'content-list-label';
      labelSpan.textContent = 'Image';
      li.appendChild(thumbWrap);
      li.appendChild(labelSpan);
    } else {
      var label = getLabel(type, role);
      li.innerHTML =
        '<span class="content-list-label">' +
        escapeHtml(label) +
        '</span>';
    }

    var moveWrap = document.createElement('span');
    moveWrap.className = 'content-list-move';
    var upBtn = document.createElement('button');
    upBtn.type = 'button';
    upBtn.className = 'content-list-move-btn content-list-move-up';
    upBtn.setAttribute('aria-label', 'Move up');
    upBtn.innerHTML = '<span aria-hidden="true">▲</span>';
    var downBtn = document.createElement('button');
    downBtn.type = 'button';
    downBtn.className = 'content-list-move-btn content-list-move-down';
    downBtn.setAttribute('aria-label', 'Move down');
    downBtn.innerHTML = '<span aria-hidden="true">▼</span>';
    moveWrap.appendChild(upBtn);
    moveWrap.appendChild(downBtn);
    li.appendChild(moveWrap);

    var removeBtn = document.createElement('button');
    removeBtn.type = 'button';
    removeBtn.className = 'content-list-remove';
    removeBtn.setAttribute('aria-label', 'Remove');
    removeBtn.textContent = '×';
    li.appendChild(removeBtn);
    listEl.appendChild(li);

    function updateMoveButtons() {
      var items = listEl.querySelectorAll('.content-list-item');
      items.forEach(function (item, i) {
        var up = item.querySelector('.content-list-move-up');
        var down = item.querySelector('.content-list-move-down');
        if (up) up.disabled = i === 0;
        if (down) down.disabled = i === items.length - 1;
      });
    }

    upBtn.addEventListener('click', function () {
      if (upBtn.disabled) return;
      var prev = li.previousElementSibling;
      if (prev) {
        listEl.insertBefore(li, prev);
        updateMoveButtons();
        document.dispatchEvent(new CustomEvent('content-changed'));
      }
    });
    downBtn.addEventListener('click', function () {
      if (downBtn.disabled) return;
      var next = li.nextElementSibling;
      if (next) {
        listEl.insertBefore(li, next.nextElementSibling);
        updateMoveButtons();
        document.dispatchEvent(new CustomEvent('content-changed'));
      }
    });
    removeBtn.addEventListener('click', function () {
      li.remove();
      updateMoveButtons();
      document.dispatchEvent(new CustomEvent('content-changed'));
    });
    updateMoveButtons();
    if (!restoringFromStorage) document.dispatchEvent(new CustomEvent('content-changed'));
  }

  function escapeHtml(s) {
    var div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function closeMenus() {
    if (addMenu) addMenu.hidden = true;
    if (addWrap) addWrap.hidden = true;
    if (addMenu) {
      addMenu.querySelectorAll('.content-add-submenu').forEach(function (s) { s.hidden = true; });
    }
    document.querySelectorAll('.content-add-submenu-trigger').forEach(function (t) {
      t.setAttribute('aria-expanded', 'false');
    });
  }

  var ASSETS_THUMBS_BASE = '../assets/assets-images/thumbs/';

  function buildImageSubmenu() {
    if (!imageSubmenu) return;
    imageSubmenu.innerHTML = '';
    if (ASSET_IMAGES.length === 0) {
      var empty = document.createElement('span');
      empty.className = 'content-add-empty';
      empty.textContent = 'No images';
      imageSubmenu.appendChild(empty);
      return;
    }
    ASSET_IMAGES.forEach(function (filename) {
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.setAttribute('role', 'menuitem');
      btn.setAttribute('aria-label', filename);
      btn.className = 'content-add-option content-add-option-thumb';
      btn.dataset.type = 'image';
      btn.dataset.asset = filename;
      var img = document.createElement('img');
      img.src = ASSETS_THUMBS_BASE + filename;
      img.alt = '';
      img.className = 'content-add-thumb-img';
      btn.appendChild(img);
      imageSubmenu.appendChild(btn);
    });
  }

  var menuJustOpened = false;

  document.querySelectorAll('.content-add-submenu-wrap').forEach(function (wrap) {
    var trigger = wrap.querySelector('.content-add-submenu-trigger');
    var submenu = wrap.querySelector('.content-add-submenu');
    if (!trigger || !submenu) return;
    wrap.addEventListener('mouseenter', function () {
      if (menuJustOpened) return;
      submenu.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
    });
    wrap.addEventListener('mouseleave', function () {
      submenu.hidden = true;
      trigger.setAttribute('aria-expanded', 'false');
    });
  });

  addMenu.addEventListener('click', function (e) {
    e.stopPropagation();
    var btn = e.target.closest('.content-add-option[data-type]');
    if (!btn) return;
    var type = btn.dataset.type;
    var role = btn.dataset.role || '';
    var asset = btn.dataset.asset || '';
    if (window.__contentAddCallback) {
      try { window.__contentAddCallback(type, role, asset); } catch (err) {}
      delete window.__contentAddCallback;
      closeMenus();
      return;
    }
    addItem(type, role, asset);
    closeMenus();
  });

  window.openContentMenuForCell = function (callback) {
    window.__contentAddCallback = callback;
    if (addWrap) addWrap.hidden = false;
    if (addMenu) addMenu.hidden = false;
    if (addMenu) addMenu.querySelectorAll('.content-add-submenu').forEach(function (s) { s.hidden = true; });
    document.querySelectorAll('.content-add-submenu-trigger').forEach(function (t) { t.setAttribute('aria-expanded', 'false'); });
  };

  document.addEventListener('click', function (e) {
    if (addMenu && addMenu.contains(e.target)) return;
    if (addWrap && addWrap.contains(e.target)) return;
    closeMenus();
  });

  document.addEventListener('content-changed', function () {
    if (restoringFromStorage) return;
    var state = getFullState();
    state.content = getContentState();
    saveFullState(state);
  });

  buildImageSubmenu();
  restoreContentFromStorage();
})();
