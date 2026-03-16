/**
 * Single source of truth for all UI component markup in the layout variations experience.
 * Reference this file from ui-components.html (and elsewhere) to render the component showcase.
 * Load icon-component.js before this file to use IconComponent for icons.
 */
(function (global) {
  var ic = global.IconComponent;
  var DELETE_ICON = '../assets/assets-vector/icons/delete.svg';
  var SIZE_ICON_SVG = ic ? ic.SIZE_ICON_SVG : '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="2" y="2" width="5" height="5" rx="0.5"/><rect x="9" y="2" width="5" height="5" rx="0.5"/><rect x="2" y="9" width="5" height="5" rx="0.5"/><rect x="9" y="9" width="5" height="5" rx="0.5"/></svg>';
  var deleteIconHtml = ic ? ic.render('ui', 'delete') : '<img src="' + DELETE_ICON + '" alt="" aria-hidden="true" />';
  var sizeIconHtml = ic ? ic.render('ui', 'size') : '<span class="grid-cells-size-icon" aria-hidden="true">' + SIZE_ICON_SVG + '</span>';

  var uiIconsSectionHtml = '';
  var previewIconsSectionHtml = '';
  if (ic) {
    uiIconsSectionHtml = '<div class="section-block icon-showcase"><p class="control-label" style="margin-bottom: var(--space-m);">UI icons (toolbar/actions)</p><div class="icon-list icon-list--ui">';
    ic.UI_ICONS.forEach(function (name) {
      uiIconsSectionHtml += '<div class="icon-item"><span class="icon-item-icon">' + ic.render('ui', name) + '</span><span class="icon-item-label">' + name + '</span></div>';
    });
    uiIconsSectionHtml += '</div></div>';
    var previewList = ic.getAllPreviewIconNames();
    previewIconsSectionHtml = '<div class="section-block icon-showcase"><p class="control-label" style="margin-bottom: var(--space-m);">Preview icons (layouts / content types)</p><div class="icon-list icon-list--preview">';
    previewList.forEach(function (item) {
      previewIconsSectionHtml += '<div class="icon-item"><span class="icon-item-icon">' + ic.render('preview', item.name) + '</span><span class="icon-item-label">' + item.group + ': ' + item.label + '</span></div>';
    });
    previewIconsSectionHtml += '</div></div>';
  }

  var intentTriggerIcon = ic ? ic.render('preview', 'intent-inform') : '<span class="intent-custom-icon intent-icon-inform" aria-hidden="true"></span>';
  var intentOptionsHtml = ic
    ? (ic.PREVIEW_ICONS.intent.map(function (n) {
        var label = n.charAt(0).toUpperCase() + n.slice(1);
        return '<li role="option" tabindex="-1" data-value="' + n + '" aria-selected="' + (n === 'inform' ? 'true' : 'false') + '"><span class="intent-option-icon">' + ic.render('preview', 'intent-' + n) + '</span><span class="intent-option-label">' + label + '</span></li>';
      }).join(''))
    : '<li role="option" tabindex="-1" data-value="inform" aria-selected="true"><span class="intent-option-icon intent-icon-inform" aria-hidden="true"></span><span class="intent-option-label">Inform</span></li>' +
      '<li role="option" tabindex="-1" data-value="compare"><span class="intent-option-icon intent-icon-compare" aria-hidden="true"></span><span class="intent-option-label">Compare</span></li>' +
      '<li role="option" tabindex="-1" data-value="promote"><span class="intent-option-icon intent-icon-promote" aria-hidden="true"></span><span class="intent-option-label">Promote</span></li>' +
      '<li role="option" tabindex="-1" data-value="storytell"><span class="intent-option-icon intent-icon-storytell" aria-hidden="true"></span><span class="intent-option-label">Storytell</span></li>' +
      '<li role="option" tabindex="-1" data-value="showcase"><span class="intent-option-icon intent-icon-showcase" aria-hidden="true"></span><span class="intent-option-label">Showcase</span></li>' +
      '<li role="option" tabindex="-1" data-value="explain"><span class="intent-option-icon intent-icon-explain" aria-hidden="true"></span><span class="intent-option-label">Explain</span></li>' +
      '<li role="option" tabindex="-1" data-value="educate"><span class="intent-option-icon intent-icon-educate" aria-hidden="true"></span><span class="intent-option-label">Educate</span></li>';
  var artboardTriggerIcon = ic ? ic.render('preview', 'artboard-portrait') : '<span class="artboard-thumb artboard-thumb-portrait" aria-hidden="true"></span>';
  var artboardOptionsHtml = ic
    ? (ic.PREVIEW_ICONS.artboard.map(function (n) {
        var label = n.split('-').map(function (s) { return s.charAt(0).toUpperCase() + s.slice(1); }).join(' ');
        return '<li role="option" tabindex="-1" data-value="' + n + '" aria-selected="' + (n === 'portrait' ? 'true' : 'false') + '">' + ic.render('preview', 'artboard-' + n) + '<span class="artboard-option-label">' + label + '</span></li>';
      }).join(''))
    : '<li role="option" tabindex="-1" data-value="square" aria-selected="false"><span class="artboard-thumb artboard-thumb-square" aria-hidden="true"></span><span class="artboard-option-label">Square</span></li>' +
      '<li role="option" tabindex="-1" data-value="portrait" aria-selected="true"><span class="artboard-thumb artboard-thumb-portrait" aria-hidden="true"></span><span class="artboard-option-label">Portrait</span></li>' +
      '<li role="option" tabindex="-1" data-value="landscape" aria-selected="false"><span class="artboard-thumb artboard-thumb-landscape" aria-hidden="true"></span><span class="artboard-option-label">Landscape</span></li>' +
      '<li role="option" tabindex="-1" data-value="wide-portrait" aria-selected="false"><span class="artboard-thumb artboard-thumb-wide-portrait" aria-hidden="true"></span><span class="artboard-option-label">Wide portrait</span></li>' +
      '<li role="option" tabindex="-1" data-value="wide-landscape" aria-selected="false"><span class="artboard-thumb artboard-thumb-wide-landscape" aria-hidden="true"></span><span class="artboard-option-label">Wide landscape</span></li>';

  var sections = [
    {
      sectionId: 'section-buttons',
      headingId: 'h-buttons',
      title: 'Buttons',
      html:
        '<div class="section-block">' +
          '<p class="control-label" style="margin-bottom: var(--space-s);">Primary (index-cta)</p>' +
          '<button type="button" class="index-cta" style="cursor: pointer; border: 0; font: inherit;">Create new composition</button>' +
        '</div>' +
        '<div class="section-block">' +
          '<p class="control-label" style="margin-bottom: var(--space-s);">Secondary (grid-cells-btn)</p>' +
          '<button type="button" class="grid-cells-btn">Save a copy</button>' +
          '<button type="button" class="grid-cells-btn">Open</button>' +
          '<button type="button" class="grid-cells-btn">Delete</button>' +
        '</div>' +
        '<div class="section-block">' +
          '<p class="control-label" style="margin-bottom: var(--space-s);">Add cell (grid-cells-add-btn)</p>' +
          '<button type="button" class="grid-cells-add-btn">Add cell</button>' +
        '</div>'
    },
    {
      sectionId: 'section-links',
      headingId: 'h-links',
      title: 'Links',
      html:
        '<div class="section-block">' +
          '<a href="compositions.html" style="color: var(--color-link); text-decoration: none;">← Back to compositions</a>' +
          '<span style="color: var(--color-muted);"> (hover: underline)</span>' +
        '</div>'
    },
    {
      sectionId: 'section-icons-ui',
      headingId: 'h-icons-ui',
      title: 'Icon component — UI icons',
      html: uiIconsSectionHtml || '<p class="control-label">Load icon-component.js to show UI icons.</p>'
    },
    {
      sectionId: 'section-icons-preview',
      headingId: 'h-icons-preview',
      title: 'Icon component — Preview icons',
      html: previewIconsSectionHtml || '<p class="control-label">Load icon-component.js to show preview icons.</p>'
    },
    {
      sectionId: 'section-toggle',
      headingId: 'h-toggle',
      title: 'Toggle',
      html:
        '<div class="section-block" role="group" aria-labelledby="toggle-demo-label">' +
          '<label class="toggle-wrap" for="toggle-demo">' +
            '<input type="checkbox" id="toggle-demo" class="toggle-input" checked aria-describedby="toggle-demo-label" />' +
            '<span id="toggle-demo-label" class="control-label toggle-label">Decorations</span>' +
          '</label>' +
        '</div>'
    },
    {
      sectionId: 'section-intent',
      headingId: 'h-intent',
      title: 'Intent dropdown',
      html:
        '<div class="section-block control-intent" role="group" aria-labelledby="intent-demo-label">' +
          '<label id="intent-demo-label" class="control-label">Intent</label>' +
          '<div class="intent-custom-wrap">' +
            '<button type="button" class="intent-custom-trigger" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="intent-demo-label" aria-controls="intent-demo-listbox">' +
              intentTriggerIcon +
              '<span class="intent-custom-label">Inform</span>' +
              '<span class="intent-custom-chevron" aria-hidden="true">▼</span>' +
            '</button>' +
            '<ul id="intent-demo-listbox" class="intent-custom-list" role="listbox" aria-labelledby="intent-demo-label" hidden>' +
              intentOptionsHtml +
            '</ul>' +
          '</div>' +
        '</div>'
    },
    {
      sectionId: 'section-artboard',
      headingId: 'h-artboard',
      title: 'Artboard aspect dropdown',
      html:
        '<div class="section-block control-artboard" role="group" aria-labelledby="artboard-demo-label">' +
          '<label id="artboard-demo-label" class="control-label">Artboard</label>' +
          '<div class="artboard-custom-wrap">' +
            '<button type="button" class="artboard-custom-trigger" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="artboard-demo-label" aria-controls="artboard-demo-listbox">' +
              artboardTriggerIcon +
              '<span class="artboard-custom-label">Portrait</span>' +
              '<span class="artboard-custom-chevron" aria-hidden="true">▼</span>' +
            '</button>' +
            '<ul id="artboard-demo-listbox" class="artboard-custom-list" role="listbox" aria-labelledby="artboard-demo-label" hidden>' +
              artboardOptionsHtml +
            '</ul>' +
          '</div>' +
        '</div>'
    },
    {
      sectionId: 'section-color',
      headingId: 'h-color',
      title: 'Color picker (artboard background)',
      html:
        '<div class="section-block control-artboard-bg" role="group" aria-labelledby="artboard-bg-demo-label">' +
          '<label id="artboard-bg-demo-label" class="control-label" for="artboard-bg-demo-input">Background</label>' +
          '<div class="artboard-bg-wrap">' +
            '<input type="color" id="artboard-bg-demo-color" class="artboard-bg-swatch" value="#ffffff" aria-label="Pick color" title="Pick color" />' +
            '<input type="text" id="artboard-bg-demo-input" class="artboard-bg-input" value="#ffffff" placeholder="#ffffff" maxlength="9" aria-labelledby="artboard-bg-demo-label" spellcheck="false" />' +
          '</div>' +
        '</div>'
    },
    {
      sectionId: 'section-slider',
      headingId: 'h-slider',
      title: 'Slider + number input',
      html:
        '<div class="section-block control-margin" role="group" aria-labelledby="margin-demo-label">' +
          '<label id="margin-demo-label" class="control-label" for="margin-demo-input">Margin (px)</label>' +
          '<div class="slider-input-wrap">' +
            '<input type="range" id="margin-demo-slider" class="slider-input-range" min="0" max="100" value="20" step="1" aria-labelledby="margin-demo-label" />' +
            '<input type="number" id="margin-demo-input" class="margin-input slider-input-number" min="0" max="100" value="20" step="1" aria-labelledby="margin-demo-label" />' +
          '</div>' +
        '</div>' +
        '<div class="section-block control-css-grid-gap" role="group" aria-labelledby="gap-demo-label">' +
          '<label id="gap-demo-label" class="control-label" for="gap-demo-input">Gap (px)</label>' +
          '<div class="slider-input-wrap">' +
            '<input type="range" id="gap-demo-slider" class="slider-input-range" min="0" max="50" value="10" step="1" aria-labelledby="gap-demo-label" />' +
            '<input type="number" id="gap-demo-input" class="margin-input slider-input-number" min="0" max="50" value="10" step="1" aria-labelledby="gap-demo-label" />' +
          '</div>' +
        '</div>'
    },
    {
      sectionId: 'section-content-add',
      headingId: 'h-content-add',
      title: 'Content add menu',
      html:
        '<div class="section-block">' +
          '<div class="content-add-menu" role="menu">' +
            '<button type="button" role="menuitem" class="content-add-option content-add-option-color" data-type="color">Solid color</button>' +
            '<button type="button" role="menuitem" class="content-add-option" data-type="text" data-role="title">Title</button>' +
            '<button type="button" role="menuitem" class="content-add-option" data-type="text" data-role="headline">Headline</button>' +
            '<button type="button" role="menuitem" class="content-add-option content-add-submenu-trigger">Image <span class="content-add-submenu-chevron" aria-hidden="true">▸</span></button>' +
          '</div>' +
        '</div>'
    },
    {
      sectionId: 'section-grid-cells',
      headingId: 'h-grid-cells',
      title: 'Grid cells list (one item)',
      html:
        '<div class="section-block grid-cells-wrap">' +
          '<h3 class="grid-cells-heading">Grid cells</h3>' +
          '<ul class="grid-cells-list" aria-label="Content areas in grid">' +
            '<li class="grid-cells-item">' +
              '<div class="grid-cells-item-summary">' +
                '<span class="grid-cells-drag-handle" aria-hidden="true" title="Drag to reorder">' + (ic ? ic.render('ui', 'drag') : '⋮⋮') + '</span>' +
                '<div class="grid-cells-content-wrap">' +
                  '<button type="button" class="grid-cells-content-trigger" aria-haspopup="listbox" aria-expanded="false" aria-label="Content type">' +
                    '<span class="grid-cells-content-trigger-thumb grid-cells-content-trigger-thumb-color" style="background-color: #3b82f6;"></span>' +
                    '<span class="grid-cells-content-trigger-label">Solid color</span>' +
                    '<span class="grid-cells-content-trigger-chevron" aria-hidden="true">▼</span>' +
                  '</button>' +
                '</div>' +
                '<button type="button" class="grid-cells-size-toggle" aria-label="Size" aria-haspopup="dialog" aria-expanded="false">' +
                  sizeIconHtml +
                '</button>' +
                '<button type="button" class="grid-cells-remove" aria-label="Remove cell">' +
                  deleteIconHtml +
                '</button>' +
              '</div>' +
            '</li>' +
          '</ul>' +
          '<button type="button" class="grid-cells-add-btn">Add cell</button>' +
        '</div>'
    },
    {
      sectionId: 'section-align',
      headingId: 'h-align',
      title: 'Alignment button group (from size popup)',
      html:
        '<div class="section-block">' +
          '<div class="grid-cells-align-group">' +
            '<span class="grid-cells-align-label">Horizontal</span>' +
            '<div class="grid-cells-align-btns">' +
              '<button type="button" class="grid-cells-align-btn is-selected" data-value="left">Left</button>' +
              '<button type="button" class="grid-cells-align-btn" data-value="center">Centre</button>' +
              '<button type="button" class="grid-cells-align-btn" data-value="right">Right</button>' +
            '</div>' +
          '</div>' +
          '<div class="grid-cells-align-group" style="margin-top: var(--space-m);">' +
            '<span class="grid-cells-align-label">Vertical</span>' +
            '<div class="grid-cells-align-btns">' +
              '<button type="button" class="grid-cells-align-btn is-selected" data-value="top">Top</button>' +
              '<button type="button" class="grid-cells-align-btn" data-value="center">Centre</button>' +
              '<button type="button" class="grid-cells-align-btn" data-value="bottom">Bottom</button>' +
            '</div>' +
          '</div>' +
        '</div>'
    },
    {
      sectionId: 'section-cell-color',
      headingId: 'h-cell-color',
      title: 'Cell text/background color (from size popup)',
      html:
        '<div class="section-block">' +
          '<div class="grid-cells-align-group">' +
            '<span class="grid-cells-align-label">Text color</span>' +
            '<div class="grid-cells-text-color-wrap">' +
              '<input type="color" class="grid-cells-text-color-swatch" value="#1a1a1a" aria-label="Pick text color" />' +
              '<input type="text" class="grid-cells-text-color-input" value="#1a1a1a" placeholder="#1a1a1a" maxlength="9" aria-label="Text color hex" spellcheck="false" />' +
            '</div>' +
          '</div>' +
          '<div class="grid-cells-align-group" style="margin-top: var(--space-m);">' +
            '<span class="grid-cells-align-label">Background</span>' +
            '<div class="grid-cells-text-color-wrap">' +
              '<input type="color" class="grid-cells-text-color-swatch" value="#f3f4f6" aria-label="Pick background color" />' +
              '<input type="text" class="grid-cells-text-color-input" value="#f3f4f6" placeholder="#ffffff" maxlength="9" aria-label="Background hex" spellcheck="false" />' +
              '<button type="button" class="grid-cells-bg-none-btn">None</button>' +
            '</div>' +
          '</div>' +
        '</div>'
    },
    {
      sectionId: 'section-compositions',
      headingId: 'h-compositions',
      title: 'Compositions list item',
      html:
        '<div class="section-block">' +
          '<ul class="compositions-list" aria-label="Saved compositions" style="list-style: none; margin: 0; padding: 0;">' +
            '<li class="compositions-item">' +
              '<div>' +
                '<span class="compositions-item-name">My layout</span>' +
                '<div class="compositions-item-meta">Updated 3/6/25, 2:30 PM</div>' +
              '</div>' +
              '<div class="compositions-item-actions">' +
                '<button type="button" class="grid-cells-btn">Open</button>' +
                '<button type="button" class="grid-cells-btn">Delete</button>' +
              '</div>' +
            '</li>' +
          '</ul>' +
        '</div>'
    },
    {
      sectionId: 'section-empty-error',
      headingId: 'h-empty-error',
      title: 'Empty state & error',
      html:
        '<div class="section-block">' +
          '<p class="control-label" style="margin-bottom: var(--space-s);">Empty state (compositions-empty)</p>' +
          '<div class="compositions-empty">No compositions yet. Create one to get started.</div>' +
        '</div>' +
        '<div class="section-block" style="margin-top: var(--space-l);">' +
          '<p class="control-label" style="margin-bottom: var(--space-s);">Error message (compositions-error)</p>' +
          '<div class="compositions-error">Failed to load compositions. Check the server and try again.</div>' +
        '</div>'
    },
    {
      sectionId: 'section-labels',
      headingId: 'h-labels',
      title: 'Labels & headings',
      html:
        '<div class="section-block">' +
          '<p class="control-label">Control label (control-label)</p>' +
        '</div>' +
        '<div class="section-block">' +
          '<h3 class="grid-cells-heading">Section heading (grid-cells-heading)</h3>' +
        '</div>'
    }
  ];

  global.UI_ELEMENTS = sections;
})(typeof window !== 'undefined' ? window : this);
