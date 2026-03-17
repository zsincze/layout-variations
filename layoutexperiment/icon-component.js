/**
 * Icon component: single source for all icons in the layout variations experience.
 * Two types:
 * - UI icons: delete, back, drag, size, close, chevron-down, chevron-right (toolbar/actions)
 * - Preview icons: intent layouts, artboard aspects, content types (image, text, logo), micro layouts
 */
(function (global) {
  var ASSET_BASE = '../assets/assets-vector/icons/';
  var deleteSvgUrl = ASSET_BASE + 'delete.svg';

  var UI_ICONS = [
    'add',
    'delete',
    'back',
    'drag',
    'size',
    'options',
    'close',
    'chevron-down',
    'chevron-right'
  ];

  var PREVIEW_ICONS = {
    intent: ['inform', 'compare', 'promote', 'storytell', 'showcase', 'explain', 'educate'],
    artboard: ['square', 'portrait', 'landscape', 'wide-portrait', 'wide-landscape'],
    content: ['image', 'text', 'logo'],
    micro: [
      'heading-content', 'two-headings-contents', 'heading-image', 'two-col-heading-image',
      'image-caption', 'heading-two-contents', 'media-object', 'quote',
      'stack', 'grid', 'columns', 'cluster', 'cover',
      'heading-with-rules', 'label-value', 'step-numbered', 'list-icon'
    ]
  };

  var SIZE_ICON_SVG = '<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><rect x="2" y="2" width="5" height="5" rx="0.5"/><rect x="9" y="2" width="5" height="5" rx="0.5"/><rect x="2" y="9" width="5" height="5" rx="0.5"/><rect x="9" y="9" width="5" height="5" rx="0.5"/></svg>';

  /**
   * Render icon HTML.
   * @param {string} type - 'ui' | 'preview'
   * @param {string} name - e.g. 'delete', 'intent-inform', 'artboard-portrait', 'micro-stack'
   * @param {object} opts - optional: { assetBase: string, className: string, ariaHidden: true }
   * @returns {string} HTML string
   */
  function render(type, name, opts) {
    opts = opts || {};
    var assetBase = opts.assetBase || ASSET_BASE;
    var extraClass = opts.className ? ' ' + opts.className : '';
    var ariaHidden = opts.ariaHidden !== false;
    var aria = ariaHidden ? ' aria-hidden="true"' : '';

    if (type === 'ui') {
      var uiClass = 'icon icon--ui icon--ui--' + name + extraClass;
      if (name === 'add') {
        var addSrc = (opts.assetBase ? opts.assetBase.replace(/\/?$/, '/') : ASSET_BASE) + 'add.svg';
        return '<span class="' + uiClass + '"' + aria + '><img src="' + addSrc + '" alt="" /></span>';
      }
      if (name === 'delete') {
        var src = (opts.assetBase ? opts.assetBase.replace(/\/?$/, '/') : ASSET_BASE) + 'delete.svg';
        return '<span class="' + uiClass + '"' + aria + '><img src="' + src + '" alt="" /></span>';
      }
      if (name === 'drag') {
        var dragSrc = (opts.assetBase ? opts.assetBase.replace(/\/?$/, '/') : ASSET_BASE) + 'drag.svg';
        return '<span class="' + uiClass + '"' + aria + '><img src="' + dragSrc + '" alt="" /></span>';
      }
      if (name === 'options') {
        var optionsSrc = (opts.assetBase ? opts.assetBase.replace(/\/?$/, '/') : ASSET_BASE) + 'options.svg';
        return '<span class="' + uiClass + '"' + aria + '><img src="' + optionsSrc + '" alt="" /></span>';
      }
      if (name === 'size') {
        return '<span class="' + uiClass + '"' + aria + '>' + SIZE_ICON_SVG + '</span>';
      }
      if (name === 'chevron-down') {
        var chevronSrc = (opts.assetBase ? opts.assetBase.replace(/\/?$/, '/') : ASSET_BASE) + 'chevron-down.svg';
        return '<span class="' + uiClass + '"' + aria + '><img src="' + chevronSrc + '" alt="" /></span>';
      }
      return '<span class="' + uiClass + '"' + aria + '></span>';
    }

    if (type === 'preview') {
      var parts = name.indexOf('-') >= 0 ? name.split('-') : [name];
      var kind = parts[0];
      var sub = parts.slice(1).join('-');
      var previewClass = 'icon icon--preview' + extraClass;
      if (kind === 'intent' && sub) {
        return '<span class="' + previewClass + ' intent-icon intent-icon-' + sub + '"' + aria + '></span>';
      }
      if (kind === 'artboard' && sub) {
        return '<span class="' + previewClass + ' artboard-thumb artboard-thumb-' + sub + '"' + aria + '></span>';
      }
      if (kind === 'micro' && sub) {
        return '<span class="' + previewClass + ' micro-option-icon micro-icon-' + sub + '"' + aria + '></span>';
      }
      if (kind === 'content' && sub) {
        return '<span class="' + previewClass + ' icon--preview--content icon--preview--content-' + sub + '"' + aria + '></span>';
      }
      if (kind === 'image' || kind === 'text' || kind === 'logo') {
        return '<span class="' + previewClass + ' icon--preview--content icon--preview--content-' + kind + '"' + aria + '></span>';
      }
      return '<span class="' + previewClass + '"' + aria + '></span>';
    }

    return '';
  }

  /**
   * Flatten list of all preview icon names for showcase.
   */
  function getAllPreviewIconNames() {
    var list = [];
    PREVIEW_ICONS.intent.forEach(function (n) { list.push({ group: 'intent', name: 'intent-' + n, label: n }); });
    PREVIEW_ICONS.artboard.forEach(function (n) { list.push({ group: 'artboard', name: 'artboard-' + n, label: n }); });
    PREVIEW_ICONS.content.forEach(function (n) { list.push({ group: 'content', name: 'content-' + n, label: n }); });
    PREVIEW_ICONS.micro.forEach(function (n) { list.push({ group: 'micro', name: 'micro-' + n, label: n }); });
    return list;
  }

  global.IconComponent = {
    UI_ICONS: UI_ICONS,
    PREVIEW_ICONS: PREVIEW_ICONS,
    getAllPreviewIconNames: getAllPreviewIconNames,
    render: render,
    SIZE_ICON_SVG: SIZE_ICON_SVG,
    DELETE_ICON_URL: deleteSvgUrl
  };
})(typeof window !== 'undefined' ? window : this);
