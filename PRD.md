# Product Requirements Document (PRD)
## Layout Experiment — Layout Generation Engine

**Version:** 0.3  
**Status:** Draft  
**Last updated:** March 6, 2025

**Location:** This feature is a **subset of the main website**, available at the route **`/layoutexperiment`**.

---

## 1. Overview

The **Layout Experiment** is one area within the main website: a **layout generation engine** where you choose **layout principles** and **content options**, and the system **generates layouts** that satisfy those specs. It lives at **`/layoutexperiment`**. The main UI is **controls** (layout-related options you toggle through); the engine composes content blocks according to the selected principles and produces live layout variations. The main site is web-only and semi-responsive (desktop/laptop first); the layout experiment is the core interactive tool within it.

---

## 2. Goals

- **Layout generation engine:** Core product is a system that generates layouts from a set of layout principles and a chosen content set—not pre-baked templates, but rules-driven composition.
- **Layout controls first:** Primary UI is layout-related controls (e.g. grid type, alignment, hierarchy, rhythm) that you can toggle or cycle through; changing controls updates the generated layout.
- **Configurable content:** A defined set of content options (images, title, headline, paragraph, website, logo, etc.) that you can **add or remove** from the generation—the engine only lays out what you’ve enabled.
- **Semi-responsive:** Layout and UI work across common desktop/laptop widths; mobile is out of scope for v1.
- **Designer-first:** You can explore how different layout principles behave with different content combinations without coding each variation by hand.

---

## 3. Target Audience

- **Primary:** You (the designer)—main user of the layout engine and controls.
- **Secondary:** Peers or visitors who see the playground (and optional semi-portfolio) and get a sense of your approach to layout.

---

## 4. Scope

### In scope (v1)

- **Layout generation engine:** Logic that, given layout specs + content options, produces valid layouts (structure and placement).
- **Layout controls (UI):** Controls for layout-related options—e.g. principle/system (grid, alignment, hierarchy), density, balance—that you can toggle or cycle through; the canvas updates to reflect the current spec.
- **Content options (UI):** Controls to add/remove content building blocks from the generation (e.g. 0/1/2/3 images, title, headline, paragraph, website, logo); the engine only includes and lays out enabled items.
- Web-only, semi-responsive (desktop/laptop).
- **Route:** `/layoutexperiment` — single main view (controls + generated layout canvas). Other areas of the main site (e.g. Home, About, Work) are separate.

### Out of scope (v1)

- Full mobile-responsive design and touch optimization.
- Complex backend, user accounts, or CMS.
- E-commerce or heavy interactivity beyond the playground controls and canvas.

---

## 5. Product Core: Layout Engine + Controls + Content

### 5.1 Layout generation engine

- **Inputs:** (1) Current **layout principle/spec** (from controls), (2) **Content set** (which blocks are enabled).
- **Behavior:** Generates one or more layout(s) that respect the chosen principle and include only the enabled content blocks. “Generate” can mean: pick from a set of rule-based layouts, or compute placement (e.g. grid cells, order, alignment) from the principle.
- **Output:** Rendered layout on a canvas (and optionally structural data for export or reuse).

### 5.2 Layout controls (layout-related options)

The **main part of the UI** is controls that drive layout behavior. You toggle or cycle through options; the system applies them and regenerates/updates the layout. Examples (to be refined):

| Control area | Examples (candidate) |
|--------------|----------------------|
| **Layout principle / system** | Grid-based, alignment-based, hierarchy-led, radial, asymmetric, etc. |
| **Grid / structure** | Column count, gutter, baseline rhythm, optional modules. |
| **Density / spacing** | Tight, normal, loose; or explicit spacing scale. |
| **Balance / weight** | Visual weight (e.g. image-heavy vs type-heavy), alignment (left, center, right, justified). |
| **Order / flow** | Reading order, visual priority (what appears first/second). |

*Exact controls and principles will be defined in a later design/tech pass; the engine should be extensible so new principles can be added.*

### 5.3 Content options (what gets laid out)

A fixed set of **content building blocks** that you can **add or remove** from the layout generation. Only enabled blocks are included when the engine generates a layout.

| Content type | Description | Add/remove |
|--------------|-------------|------------|
| **Images** | 0, 1, 2, 3, or more (e.g. 0 images, 1 image, 2 images, …); placeholder or real assets. | Toggle count or on/off per slot. |
| **Title** | Main title (e.g. project or page title). | Include / exclude. |
| **Headline** | Secondary headline or subhead. | Include / exclude. |
| **Paragraph** | Body text block. | Include / exclude. |
| **Website** | Link or “website” element (e.g. URL label or button). | Include / exclude. |
| **Logo** | Logo block (placeholder or asset). | Include / exclude. |
| *(extensible)* | e.g. Caption, label, date, tag. | Add more later. |

- **UI:** Checkboxes, toggles, or a “content palette” where you add/remove each type; the engine’s content set is the union of enabled items (with image count as a separate choice).
- **Data:** Each content type can have placeholder or editable copy/assets; the engine places them according to layout specs.

### 5.4 Flow (user + system)

1. You **set layout controls** (e.g. principle, grid, density).
2. You **set content options** (e.g. 2 images, title, headline, paragraph, logo; no website).
3. The **engine** generates a layout that (a) follows the current layout spec and (b) includes only the selected content blocks.
4. The **canvas** shows the result; you can toggle controls again to see new variations.

---

## 6. Relationship to Main Website

The **main website** contains other areas; **`/layoutexperiment`** is one route within it. The rest of the site can include:

- **Landing / Home (**`/`**):** Entry point, with a link to `/layoutexperiment`.
- **Work / Projects:** Optional curated projects (separate from the layout experiment).
- **About / Contact:** Short bio and contact if desired.

These are secondary to the layout experiment. The layout engine (controls + content options + generation) is built for `/layoutexperiment`; other pages can be added before or after.

---

## 7. Non-Functional Requirements

- **Performance:** Fast response when toggling layout or content options (no heavy recompute or flicker).
- **Maintainability:** Layout principles and content types should be easy to add or change (e.g. config or modular rules).
- **Semi-responsive:** Controls and generated canvas work across target desktop/laptop widths; layout engine can take viewport into account if needed.

---

## 8. Technical Direction (High Level)

- **Platform:** Web (HTML/CSS/JS); framework TBD (e.g. React, Vue, Astro) to support dynamic controls and canvas updates.
- **Layout engine:** Implemented in JS: takes (layout spec, content set) → produces layout structure (and/or CSS/classes) for the canvas. Rules can be data-driven (e.g. principle → grid/placement rules).
- **UI:** Control panel (layout options + content toggles) + canvas area; semi-responsive shell (e.g. CSS Grid/Flexbox, 1–2 breakpoints).
- **Content:** Placeholder copy and assets for each content type; optional later: editable fields or simple CMS.

---

## 9. Success Criteria

- Changing **layout controls** updates the canvas with layouts that clearly reflect the selected principle/spec.
- Changing **content options** (add/remove title, images, headline, paragraph, website, logo, etc.) correctly adds or removes those elements in the generated layout.
- New layout principles and new content types can be added without rewriting the core engine.
- The experience is smooth and usable on desktop/laptop viewports.

---

## 10. Open Questions / Later

- **Concrete layout principles:** Final list and naming (grid-based, alignment-based, hierarchy-led, etc.) and how each maps to engine rules.
- **Image count:** Upper limit (e.g. max 5 images) and how multiple images are distributed in the layout.
- **Export:** Whether to export generated layout (e.g. as code or image) for use elsewhere.
- Stack, hosting, and optional semi-portfolio pages.

---

## 11. Next Steps

1. **Define layout principles:** List 3–5 principles with clear rules (e.g. "12-column grid, title top-left, images in right column").
2. **Define content model:** Final list of content types and how image count is specified (slider, presets, or N toggles).
3. Lock in tech stack and set up project (controls UI + canvas + engine interface).
4. Implement layout engine (spec in → layout out) and wire controls + content toggles to it.
5. Implement 2–3 layout principles and all content types; refine UX (feedback, presets, "randomize").
6. Optional: Add landing, About, or Work pages.

---

*This PRD is a living document; update as scope and priorities evolve.*
