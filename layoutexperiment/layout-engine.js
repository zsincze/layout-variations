(function () {
  const ASSETS_BASE = '../assets/assets-images/';
  // Same list as content-options.js – used for micro layout image placeholders
  const MICRO_ASSET_IMAGES = [
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

  const PLACEHOLDER = {
    imagePlaceholder: function (label) {
      return '<div class="layout-block-placeholder layout-block-placeholder-image" aria-hidden="true">' + (label || 'Image') + '</div>';
    },
    text: {
      title: '<span class="layout-block-text">The Future of Digital Design</span>',
      headline: '<span class="layout-block-text">How we’re rethinking layout systems for the next decade.</span>',
      paragraph: '<span class="layout-block-text">We started with a simple question: what if every layout could adapt to its content and intent, instead of the other way around? The result is a system that balances structure with flexibility, so designers can move quickly without losing control. This approach is now used across product, marketing, and editorial.</span>',
      website: '<span class="layout-block-text">studio.example.com</span>',
      logo: '<span class="layout-block-text">Studio</span>',
    },
  };

  const STORAGE_KEY = 'layout-experiment-state';
  const outputEl = document.getElementById('layout-output');
  const placeholderEl = document.getElementById('layout-placeholder');
  const intentSelect = document.getElementById('intent-select');
  const contentList = document.getElementById('content-list');
  const artboard = document.getElementById('artboard');

  function getGridCellsFromState() {
    try {
      var state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return Array.isArray(state.gridCells) ? state.gridCells : [];
    } catch (e) {
      return [];
    }
  }

  function getIntent() {
    if (!intentSelect) return 'inform';
    return intentSelect.getAttribute('data-value') || intentSelect.value || 'inform';
  }

  function getGridOption() {
    return (artboard && artboard.getAttribute('data-grid')) || 'css-grid';
  }

  function getContentSet() {
    if (!contentList) return [];
    return Array.from(contentList.querySelectorAll('.content-list-item')).map(function (li) {
      return {
        type: li.dataset.type || 'text',
        role: li.dataset.role || '',
        asset: li.dataset.asset || '',
      };
    });
  }

  function microEl(tag, className, text) {
    var e = document.createElement(tag);
    if (className) e.className = className;
    if (text) e.textContent = text;
    return e;
  }

  function microImageEl(assetIndex) {
    var idx = (assetIndex || 0) % MICRO_ASSET_IMAGES.length;
    var filename = MICRO_ASSET_IMAGES[idx];
    var wrap = document.createElement('div');
    wrap.className = 'micro-image';
    var img = document.createElement('img');
    img.src = ASSETS_BASE + filename;
    img.alt = '';
    wrap.appendChild(img);
    return wrap;
  }

  function buildMicroLayout(role) {
    var wrap = document.createElement('div');
    wrap.className = 'micro-layout micro-layout-' + (role || 'heading-content');

    switch (role) {
      case 'heading-content':
        wrap.appendChild(microEl('div', 'micro-heading', 'Design principles'));
        wrap.appendChild(microEl('div', 'micro-content', 'Clarity, hierarchy, and rhythm guide every decision. We use a consistent spacing scale and type system so that layouts feel intentional at any size.'));
        break;
      case 'two-headings-contents':
        wrap.classList.add('micro-two-col');
        var col1 = document.createElement('div');
        col1.className = 'micro-col';
        col1.appendChild(microEl('div', 'micro-heading', 'Research'));
        col1.appendChild(microEl('div', 'micro-content', 'User interviews and testing inform the structure of each project from day one.'));
        var col2 = document.createElement('div');
        col2.className = 'micro-col';
        col2.appendChild(microEl('div', 'micro-heading', 'Delivery'));
        col2.appendChild(microEl('div', 'micro-content', 'We hand off with clear specs and components so build matches design.'));
        wrap.appendChild(col1);
        wrap.appendChild(col2);
        break;
      case 'heading-image':
        wrap.appendChild(microEl('div', 'micro-heading', 'Case study: Layout system'));
        wrap.appendChild(microImageEl(0));
        break;
      case 'two-col-heading-image':
        wrap.classList.add('micro-two-col');
        var cell1 = document.createElement('div');
        cell1.className = 'micro-col';
        cell1.appendChild(microEl('div', 'micro-heading', 'Before'));
        cell1.appendChild(microImageEl(0));
        wrap.appendChild(cell1);
        var cell2 = document.createElement('div');
        cell2.className = 'micro-col';
        cell2.appendChild(microEl('div', 'micro-heading', 'After'));
        cell2.appendChild(microImageEl(1));
        wrap.appendChild(cell2);
        break;
      case 'image-caption':
        wrap.appendChild(microImageEl(2));
        wrap.appendChild(microEl('div', 'micro-caption', 'Exploration for the 2024 design system. Photography by the team.'));
        break;
      case 'heading-two-contents':
        wrap.appendChild(microEl('div', 'micro-heading', 'What we do'));
        wrap.appendChild(microEl('div', 'micro-content', 'We design digital products and brand experiences that are clear, scalable, and built to last.'));
        wrap.appendChild(microEl('div', 'micro-content', 'Our work spans identity, interfaces, and editorial—always with a focus on how people actually use what we make.'));
        break;
      case 'media-object':
        wrap.classList.add('micro-media-object');
        wrap.appendChild(microImageEl(3));
        var textSide = document.createElement('div');
        textSide.className = 'micro-media-text';
        textSide.appendChild(microEl('div', 'micro-heading', 'Media object'));
        textSide.appendChild(microEl('div', 'micro-content', 'Image on one side, text on the other. Classic for comments, cards, list items.'));
        wrap.appendChild(textSide);
        break;
      case 'quote':
        wrap.appendChild(microEl('div', 'micro-quote-text', '“Clarity, hierarchy, and rhythm guide every decision we make.”'));
        wrap.appendChild(microEl('div', 'micro-caption', '— Designer, Studio'));
        break;
      case 'stack':
        wrap.appendChild(microEl('div', 'micro-stack-item', 'Block one'));
        wrap.appendChild(microEl('div', 'micro-stack-item', 'Block two'));
        wrap.appendChild(microEl('div', 'micro-stack-item', 'Block three'));
        break;
      case 'grid':
        wrap.classList.add('micro-grid-box');
        for (var g = 0; g < 4; g++) wrap.appendChild(microEl('div', 'micro-grid-item', 'Item ' + (g + 1)));
        break;
      case 'columns':
        wrap.classList.add('micro-two-col');
        var c1 = document.createElement('div');
        c1.className = 'micro-col';
        c1.appendChild(microEl('div', 'micro-content', 'Column one.'));
        var c2 = document.createElement('div');
        c2.className = 'micro-col';
        c2.appendChild(microEl('div', 'micro-content', 'Column two.'));
        wrap.appendChild(c1);
        wrap.appendChild(c2);
        break;
      case 'cluster':
        wrap.classList.add('micro-cluster');
        wrap.appendChild(microEl('span', 'micro-cluster-item', 'Tag one'));
        wrap.appendChild(microEl('span', 'micro-cluster-item', 'Tag two'));
        wrap.appendChild(microEl('span', 'micro-cluster-item', 'Tag three'));
        break;
      case 'cover':
        wrap.classList.add('micro-cover');
        wrap.appendChild(microEl('div', 'micro-cover-header', 'Header'));
        wrap.appendChild(microEl('div', 'micro-cover-main', 'Centered content'));
        wrap.appendChild(microEl('div', 'micro-cover-footer', 'Footer'));
        break;
      case 'heading-with-rules':
        wrap.classList.add('micro-heading-rules');
        wrap.appendChild(microEl('div', 'micro-heading', 'Section title'));
        break;
      case 'label-value':
        wrap.appendChild(microEl('div', 'micro-label-value', 'Label'));
        wrap.appendChild(microEl('div', 'micro-label-value', 'Value'));
        wrap.appendChild(microEl('div', 'micro-label-value', 'Date'));
        wrap.appendChild(microEl('div', 'micro-label-value', 'March 2025'));
        break;
      case 'step-numbered':
        wrap.appendChild(microEl('div', 'micro-step', '1. First step'));
        wrap.appendChild(microEl('div', 'micro-step', '2. Second step'));
        wrap.appendChild(microEl('div', 'micro-step', '3. Third step'));
        break;
      case 'list-icon':
        wrap.appendChild(microEl('div', 'micro-list-row', '• List item one'));
        wrap.appendChild(microEl('div', 'micro-list-row', '• List item two'));
        wrap.appendChild(microEl('div', 'micro-list-row', '• List item three'));
        break;
      default:
        wrap.appendChild(microEl('div', 'micro-heading', 'Overview'));
        wrap.appendChild(microEl('div', 'micro-content', 'This micro layout can be used for short intros, labels, or feature callouts. Replace with your own copy.'));
    }
    return wrap;
  }

  function createBlockElement(block) {
    var el = document.createElement('div');
    el.className = 'layout-block layout-block-' + block.type + (block.role ? ' layout-block-' + block.role : '');
    el.dataset.type = block.type;
    if (block.role) el.dataset.role = block.role;
    if (block.asset) el.dataset.asset = block.asset;

    if (block.type === 'image') {
      if (block.asset) {
        var img = document.createElement('img');
        img.src = ASSETS_BASE + block.asset;
        img.alt = '';
        img.className = 'layout-block-img';
        img.onerror = function () {
          this.style.display = 'none';
          var next = this.nextElementSibling;
          if (next) next.hidden = false;
        };
        var fallback = document.createElement('div');
        fallback.className = 'layout-block-placeholder layout-block-placeholder-image';
        fallback.hidden = true;
        fallback.textContent = '';
        el.appendChild(img);
        el.appendChild(fallback);
      } else {
        el.innerHTML = PLACEHOLDER.imagePlaceholder('Image');
      }
    } else if (block.type === 'color') {
      el.classList.add('layout-block-color');
    } else if (block.type === 'micro') {
      el.classList.add('layout-block-micro');
      el.appendChild(buildMicroLayout(block.role));
    } else {
      el.innerHTML = PLACEHOLDER.text[block.role] || '<span class="layout-block-text">' + (block.role || 'Text') + '</span>';
    }
    return el;
  }

  function render(intent, contentSet) {
    var output = document.getElementById('layout-output');
    if (!output) return;
    output.hidden = true;
    output.innerHTML = '';
    if (placeholderEl) placeholderEl.hidden = false;

    var gridOption = getGridOption();
    var gridCells = getGridCellsFromState();
    var artboardEl = document.getElementById('artboard');
    var useGridCells = gridOption === 'css-grid' && gridCells.length > 0 && artboardEl;

    if (useGridCells) {
      var cols = parseInt(artboardEl.getAttribute('data-grid-cols') || '12', 10);
      var rows = parseInt(artboardEl.getAttribute('data-grid-rows') || '16', 10);
      var wrapper = document.createElement('div');
      wrapper.className = 'layout-root layout-intent-' + intent + ' layout-grid-css-grid';
      wrapper.setAttribute('data-intent', intent);
      wrapper.setAttribute('data-grid', 'css-grid');
      wrapper.style.display = 'grid';
      wrapper.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
      wrapper.style.gridTemplateRows = 'repeat(' + rows + ', 1fr)';
      wrapper.style.flex = '1 1 0';
      wrapper.style.minHeight = '0';
      wrapper.style.height = '100%';
      gridCells.forEach(function (cell, i) {
        var cellEl = document.createElement('div');
        cellEl.className = 'layout-grid-cell';
        var cs = cell.colStart != null ? cell.colStart : 1;
        var ce = cell.colEnd != null ? cell.colEnd : 2;
        var rs = cell.rowStart != null ? cell.rowStart : 1;
        var re = cell.rowEnd != null ? cell.rowEnd : 2;
        /* UI stores inclusive last cell; CSS Grid uses exclusive end line */
        cellEl.style.gridColumn = cs + ' / ' + (ce + 1);
        cellEl.style.gridRow = rs + ' / ' + (re + 1);
        cellEl.style.zIndex = String(gridCells.length - i); /* top of list = highest z-order */
        cellEl.style.position = 'relative';
        cellEl.style.minHeight = '0';
        cellEl.style.overflow = 'hidden';
        cellEl.style.display = 'flex';
        cellEl.style.flexDirection = 'column';
        var block = { type: cell.type || 'text', role: cell.role || 'title', asset: cell.asset || '' };
        var blockEl = createBlockElement(block);
        var alignH = cell.alignH || 'left';
        var alignV = cell.alignV || 'top';
        blockEl.style.justifyContent = alignV === 'top' ? 'flex-start' : alignV === 'bottom' ? 'flex-end' : 'center';
        blockEl.style.alignItems = alignH === 'left' ? 'flex-start' : alignH === 'right' ? 'flex-end' : 'center';
        blockEl.style.textAlign = alignH === 'left' ? 'left' : alignH === 'right' ? 'right' : 'center';
        if (cell.textColor) {
          blockEl.style.color = cell.textColor;
          var textSelectors = '.layout-block-text, .micro-heading, .micro-content, .micro-caption, .micro-quote-text, .micro-label-value, .micro-step, .micro-list-row';
          var textEls = blockEl.querySelectorAll(textSelectors);
          for (var t = 0; t < textEls.length; t++) textEls[t].style.color = 'inherit';
        }
        if (cell.backgroundColor) {
          blockEl.style.backgroundColor = cell.backgroundColor;
        } else if (block.type === 'color') {
          blockEl.style.backgroundColor = '#cccccc';
        }
        cellEl.appendChild(blockEl);
        wrapper.appendChild(cellEl);
      });
      output.appendChild(wrapper);
      output.hidden = false;
      output.removeAttribute('hidden');
      if (placeholderEl) placeholderEl.hidden = true;
      return;
    }

    if (contentSet.length === 0) return;
  }

  function update() {
    render(getIntent(), getContentSet());
  }

  window.__layoutEngineUpdate = update;

  if (intentSelect) intentSelect.addEventListener('change', update);
  document.addEventListener('content-changed', update);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', update);
  } else {
    update();
  }
})();
