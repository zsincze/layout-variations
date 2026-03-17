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
  var sizeIconHtml = ic ? ic.render('ui', 'options') : '<span class="grid-cells-size-icon" aria-hidden="true"><img src="../assets/assets-vector/icons/options.svg" alt="" /></span>';

  var uiIconsSectionHtml = '';
  var previewIconsSectionHtml = '';
  if (ic) {
    uiIconsSectionHtml = '<div class="section-block ui-component-outline icon-showcase"><div class="icon-list icon-list--ui">';
    ic.UI_ICONS.forEach(function (name) {
      uiIconsSectionHtml += '<div class="icon-item ui-component-outline"><span class="icon-item-icon">' + ic.render('ui', name) + '</span></div>';
    });
    uiIconsSectionHtml += '</div></div>';
    var previewList = ic.getAllPreviewIconNames();
    previewIconsSectionHtml = '<div class="section-block ui-component-outline icon-showcase"><div class="icon-list icon-list--preview">';
    previewList.forEach(function (item) {
      previewIconsSectionHtml += '<div class="icon-item ui-component-outline"><span class="icon-item-icon">' + ic.render('preview', item.name) + '</span></div>';
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
  var artboardTriggerChevron = ic
    ? '<span class="btn__chevron" aria-hidden="true">' + ic.render('ui', 'chevron-down') + '</span>'
    : '<span class="btn__chevron" aria-hidden="true"><span class="icon icon--ui icon--ui--chevron-down"><img src="../assets/assets-vector/icons/chevron-down.svg" alt="" /></span></span>';
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

  var btnIcon = ic ? ic.render('ui', 'options') : '<span class="icon icon--ui" aria-hidden="true"></span>';
  var btnChevron = '<span class="btn__chevron" aria-hidden="true">' + (ic ? ic.render('ui', 'chevron-down') : '&#9662;') + '</span>';
  var buttonSSectionHtml =
    '<div class="section-block ui-component-outline"><div class="btn-row">' +
      '<button type="button" class="btn btn--s btn--icon-only" aria-label="Options"><span class="btn__icon">' + btnIcon + '</span></button>' +
      '<button type="button" class="btn btn--s"><span class="btn__label">Label</span></button>' +
      '<button type="button" class="btn btn--s btn--icon-label"><span class="btn__icon">' + btnIcon + '</span><span class="btn__label">Options</span></button>' +
    '</div></div>' +
    '<div class="section-block ui-component-outline"><div class="btn-row">' +
      '<button type="button" class="btn btn--s btn--icon-only btn--dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Options menu"><span class="btn__icon">' + btnIcon + '</span>' + btnChevron + '</button>' +
      '<button type="button" class="btn btn--s btn--dropdown" aria-haspopup="true" aria-expanded="false"><span class="btn__label">Menu</span>' + btnChevron + '</button>' +
      '<button type="button" class="btn btn--s btn--icon-label btn--dropdown" aria-haspopup="true" aria-expanded="false"><span class="btn__icon">' + btnIcon + '</span><span class="btn__label">Options</span>' + btnChevron + '</button>' +
    '</div></div>' +
    '<div class="section-block ui-component-outline"><div class="btn-row">' +
      '<button type="button" class="btn btn--s btn--muted btn--icon-only" aria-label="Options"><span class="btn__icon">' + btnIcon + '</span></button>' +
      '<button type="button" class="btn btn--s btn--muted"><span class="btn__label">Label</span></button>' +
      '<button type="button" class="btn btn--s btn--muted btn--icon-label"><span class="btn__icon">' + btnIcon + '</span><span class="btn__label">Options</span></button>' +
      '<button type="button" class="btn btn--s btn--muted btn--icon-only btn--dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Options menu"><span class="btn__icon">' + btnIcon + '</span>' + btnChevron + '</button>' +
      '<button type="button" class="btn btn--s btn--muted btn--dropdown" aria-haspopup="true" aria-expanded="false"><span class="btn__label">Menu</span>' + btnChevron + '</button>' +
      '<button type="button" class="btn btn--s btn--muted btn--icon-label btn--dropdown" aria-haspopup="true" aria-expanded="false"><span class="btn__icon">' + btnIcon + '</span><span class="btn__label">Options</span>' + btnChevron + '</button>' +
    '</div></div>';

  var buttonMSectionHtml =
    '<div class="section-block ui-component-outline"><div class="btn-row">' +
      '<button type="button" class="btn btn--m btn--icon-only" aria-label="Options"><span class="btn__icon">' + btnIcon + '</span></button>' +
      '<button type="button" class="btn btn--m"><span class="btn__label">Label</span></button>' +
      '<button type="button" class="btn btn--m btn--icon-label"><span class="btn__icon">' + btnIcon + '</span><span class="btn__label">Options</span></button>' +
    '</div></div>' +
    '<div class="section-block ui-component-outline"><div class="btn-row">' +
      '<button type="button" class="btn btn--m btn--icon-only btn--dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Options menu"><span class="btn__icon">' + btnIcon + '</span>' + btnChevron + '</button>' +
      '<button type="button" class="btn btn--m btn--dropdown" aria-haspopup="true" aria-expanded="false"><span class="btn__label">Menu</span>' + btnChevron + '</button>' +
      '<button type="button" class="btn btn--m btn--icon-label btn--dropdown" aria-haspopup="true" aria-expanded="false"><span class="btn__icon">' + btnIcon + '</span><span class="btn__label">Options</span>' + btnChevron + '</button>' +
    '</div></div>' +
    '<div class="section-block ui-component-outline"><div class="btn-row">' +
      '<button type="button" class="btn btn--m btn--muted btn--icon-only" aria-label="Options"><span class="btn__icon">' + btnIcon + '</span></button>' +
      '<button type="button" class="btn btn--m btn--muted"><span class="btn__label">Label</span></button>' +
      '<button type="button" class="btn btn--m btn--muted btn--icon-label"><span class="btn__icon">' + btnIcon + '</span><span class="btn__label">Options</span></button>' +
      '<button type="button" class="btn btn--m btn--muted btn--icon-only btn--dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Options menu"><span class="btn__icon">' + btnIcon + '</span>' + btnChevron + '</button>' +
      '<button type="button" class="btn btn--m btn--muted btn--dropdown" aria-haspopup="true" aria-expanded="false"><span class="btn__label">Menu</span>' + btnChevron + '</button>' +
      '<button type="button" class="btn btn--m btn--muted btn--icon-label btn--dropdown" aria-haspopup="true" aria-expanded="false"><span class="btn__icon">' + btnIcon + '</span><span class="btn__label">Options</span>' + btnChevron + '</button>' +
    '</div></div>';

  var buttonLSectionHtml =
    '<div class="section-block ui-component-outline"><div class="btn-row">' +
      '<button type="button" class="btn btn--l btn--icon-only" aria-label="Options"><span class="btn__icon">' + btnIcon + '</span></button>' +
      '<button type="button" class="btn btn--l"><span class="btn__label">Label</span></button>' +
      '<button type="button" class="btn btn--l btn--icon-label"><span class="btn__icon">' + btnIcon + '</span><span class="btn__label">Options</span></button>' +
    '</div></div>' +
    '<div class="section-block ui-component-outline"><div class="btn-row">' +
      '<button type="button" class="btn btn--l btn--icon-only btn--dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Options menu"><span class="btn__icon">' + btnIcon + '</span>' + btnChevron + '</button>' +
      '<button type="button" class="btn btn--l btn--dropdown" aria-haspopup="true" aria-expanded="false"><span class="btn__label">Menu</span>' + btnChevron + '</button>' +
      '<button type="button" class="btn btn--l btn--icon-label btn--dropdown" aria-haspopup="true" aria-expanded="false"><span class="btn__icon">' + btnIcon + '</span><span class="btn__label">Options</span>' + btnChevron + '</button>' +
    '</div></div>' +
    '<div class="section-block ui-component-outline"><div class="btn-row">' +
      '<button type="button" class="btn btn--l btn--muted btn--icon-only" aria-label="Options"><span class="btn__icon">' + btnIcon + '</span></button>' +
      '<button type="button" class="btn btn--l btn--muted"><span class="btn__label">Label</span></button>' +
      '<button type="button" class="btn btn--l btn--muted btn--icon-label"><span class="btn__icon">' + btnIcon + '</span><span class="btn__label">Options</span></button>' +
      '<button type="button" class="btn btn--l btn--muted btn--icon-only btn--dropdown" aria-haspopup="true" aria-expanded="false" aria-label="Options menu"><span class="btn__icon">' + btnIcon + '</span>' + btnChevron + '</button>' +
      '<button type="button" class="btn btn--l btn--muted btn--dropdown" aria-haspopup="true" aria-expanded="false"><span class="btn__label">Menu</span>' + btnChevron + '</button>' +
      '<button type="button" class="btn btn--l btn--muted btn--icon-label btn--dropdown" aria-haspopup="true" aria-expanded="false"><span class="btn__icon">' + btnIcon + '</span><span class="btn__label">Options</span>' + btnChevron + '</button>' +
    '</div></div>';

  var grayVars = [
    { name: '--gray-0', hex: '#ffffff' },
    { name: '--gray-100', hex: '#f0f0f0' },
    { name: '--gray-200', hex: '#e0e0e0' },
    { name: '--gray-300', hex: '#808080' },
    { name: '--gray-400', hex: '#484848' },
    { name: '--gray-500', hex: '#363636' },
    { name: '--gray-600', hex: '#242424' },
    { name: '--gray-700', hex: '#121212' },
    { name: '--gray-800', hex: '#0a0a0a' },
    { name: '--gray-900', hex: '#000000' }
  ];
  var grayVarsTableRows = grayVars.map(function (v) {
    return '<tr><td class="gray-var-name"><code>' + v.name + '</code></td><td><span class="gray-var-swatch" style="background: var(' + v.name + ');" aria-hidden="true"></span></td><td class="gray-var-hex"><code>' + v.hex + '</code></td></tr>';
  }).join('');
  var grayVarsSectionHtml =
    '<div class="section-block ui-component-outline"><table class="gray-var-table" role="table"><thead><tr><th scope="col">Variable</th><th scope="col">Swatch</th><th scope="col">Hex</th></tr></thead><tbody>' + grayVarsTableRows + '</tbody></table></div>';

  var sections = [
    {
      sectionId: 'section-gray-vars',
      headingId: 'h-gray-vars',
      title: 'Gray variables',
      html: grayVarsSectionHtml
    },
    {
      sectionId: 'section-buttons',
      headingId: 'h-buttons',
      title: 'Buttons',
      html:
        '<div class="section-block ui-component-outline"><div class="btn-row"><button type="button" class="btn btn--m">Create new composition</button><a href="ui-components.html" class="btn btn--m btn--muted">UI components</a></div></div>' +
        '<div class="section-block ui-component-outline"><div class="btn-row"><button type="button" class="btn btn--m">Save a copy</button><button type="button" class="btn btn--m btn--muted">Open</button><button type="button" class="btn btn--m btn--muted">Delete</button></div></div>' +
        '<div class="section-block ui-component-outline"><div class="btn-row"><button type="button" class="btn btn--l btn--icon-label">' +
        '<span class="btn__icon">' + (ic ? ic.render('ui', 'add') : '<span class="icon icon--ui icon--ui--add" aria-hidden="true"><img src="../assets/assets-vector/icons/add.svg" alt="" /></span>') + '</span>' +
        '<span class="btn__label">Add content</span></button></div></div>'
    },
    {
      sectionId: 'section-button-s',
      headingId: 'h-button-s',
      title: 'Button — size S (24px)',
      html: buttonSSectionHtml
    },
    {
      sectionId: 'section-button-m',
      headingId: 'h-button-m',
      title: 'Button — size M (32px)',
      html: buttonMSectionHtml
    },
    {
      sectionId: 'section-button-l',
      headingId: 'h-button-l',
      title: 'Button — size L (42px, 16px label)',
      html: buttonLSectionHtml
    },
    {
      sectionId: 'section-links',
      headingId: 'h-links',
      title: 'Links',
      html:
        '<div class="section-block ui-component-outline"><a href="compositions.html" style="color: var(--color-link); text-decoration: none;">← Back to compositions</a></div>'
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
        '<div class="section-block ui-component-outline control-intent" role="group" aria-labelledby="intent-demo-label">' +
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
        '<div class="section-block ui-component-outline control-artboard" role="group" aria-labelledby="artboard-demo-label">' +
          '<label id="artboard-demo-label" class="control-label">Aspect Ratio</label>' +
          '<div class="artboard-custom-wrap">' +
            '<button type="button" class="btn btn--l btn--icon-label btn--dropdown artboard-custom-trigger" aria-haspopup="listbox" aria-expanded="false" aria-labelledby="artboard-demo-label" aria-controls="artboard-demo-listbox">' +
              '<span class="btn__icon">' + artboardTriggerIcon + '</span>' +
              '<span class="btn__label artboard-custom-label">Portrait</span>' +
              artboardTriggerChevron +
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
        '<div class="section-block ui-component-outline control-margin" role="group" aria-labelledby="margin-demo-label">' +
          '<label id="margin-demo-label" class="control-label" for="margin-demo-input">Margin (px)</label>' +
          '<div class="slider-input-wrap">' +
            '<input type="range" id="margin-demo-slider" class="slider-input-range" min="0" max="100" value="20" step="1" aria-labelledby="margin-demo-label" />' +
            '<input type="number" id="margin-demo-input" class="margin-input slider-input-number" min="0" max="100" value="20" step="1" aria-labelledby="margin-demo-label" />' +
          '</div>' +
        '</div>' +
        '<div class="section-block ui-component-outline control-css-grid-gap" role="group" aria-labelledby="gap-demo-label">' +
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
        '<div class="section-block ui-component-outline">' +
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
        '<div class="section-block ui-component-outline grid-cells-wrap">' +
          '<button type="button" class="btn btn--l btn--icon-label">' +
            '<span class="btn__icon">' + (ic ? ic.render('ui', 'add') : '<span class="icon icon--ui icon--ui--add" aria-hidden="true"><img src="../assets/assets-vector/icons/add.svg" alt="" /></span>') + '</span>' +
            '<span class="btn__label">Add content</span></button>' +
          '<ul class="grid-cells-list" aria-label="Content areas in grid">' +
            '<li class="grid-cells-item">' +
              '<div class="grid-cells-item-summary">' +
                '<span class="grid-cells-drag-handle" aria-hidden="true" title="Drag to reorder">' + (ic ? ic.render('ui', 'drag') : '⋮⋮') + '</span>' +
                '<div class="grid-cells-content-wrap">' +
                  '<button type="button" class="btn btn--l btn--icon-label btn--dropdown grid-cells-content-trigger" aria-haspopup="listbox" aria-expanded="false" aria-label="Content type">' +
                    '<span class="btn__icon"><span class="grid-cells-content-trigger-thumb grid-cells-content-trigger-thumb-color" style="background-color: #3b82f6;"></span></span>' +
                    '<span class="btn__label grid-cells-content-trigger-label">Solid color</span>' +
                    '<span class="btn__chevron" aria-hidden="true">' + (ic ? ic.render('ui', 'chevron-down') : '▼') + '</span>' +
                  '</button>' +
                '</div>' +
                '<button type="button" class="btn btn--m btn--muted btn--icon-only grid-cells-size-toggle" aria-label="Options" aria-haspopup="dialog" aria-expanded="false">' +
                  '<span class="btn__icon">' + sizeIconHtml + '</span>' +
                '</button>' +
                '<button type="button" class="btn btn--m btn--muted btn--icon-only grid-cells-remove" aria-label="Remove cell">' +
                  '<span class="btn__icon">' + deleteIconHtml + '</span>' +
                '</button>' +
              '</div>' +
            '</li>' +
          '</ul>' +
        '</div>'
    },
    {
      sectionId: 'section-align',
      headingId: 'h-align',
      title: 'Alignment button group (from size popup)',
      html:
        '<div class="section-block ui-component-outline">' +
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
        '<div class="section-block ui-component-outline">' +
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
        '<div class="section-block ui-component-outline">' +
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
        '<div class="section-block ui-component-outline"><div class="compositions-empty">No compositions yet. Create one to get started.</div></div>' +
        '<div class="section-block ui-component-outline" style="margin-top: var(--space-l);"><div class="compositions-error">Failed to load compositions. Check the server and try again.</div></div>'
    },
    {
      sectionId: 'section-labels',
      headingId: 'h-labels',
      title: 'Labels & headings',
      html:
        '<div class="section-block ui-component-outline"><p class="control-label">Label</p></div>' +
        '<div class="section-block ui-component-outline"><h3 class="grid-cells-heading">Heading</h3></div>'
    }
  ];

  global.UI_ELEMENTS = sections;
})(typeof window !== 'undefined' ? window : this);
