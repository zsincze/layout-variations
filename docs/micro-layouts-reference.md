# Micro Layouts — Reference List (from online research)

Micro layouts are **component-level** layout patterns: self-contained blocks that work regardless of where they sit on the page (main content, sidebar, etc.). They adapt to their **container**, not only to the viewport.

Sources: web.dev (Micro layouts, Layout patterns), Every Layout, design systems (Stack/Columns/Tiles), editorial and card patterns.

---

## 1. Primitive / structural

| Name | Description |
|------|-------------|
| **Stack** | Vertical stack of elements with consistent spacing (flexbox column). Can align (top/center/bottom) and nest. |
| **Box** | Simple rectangular container; base primitive for padding/sizing. |
| **Center** | Horizontally (and optionally vertically) center content within available space. |
| **Cluster** | Inline-style arrangement of items that wrap like words (e.g. tags, chips, buttons). |
| **Grid** | Equal-sized or proportional grid of items (e.g. 2×2, 3×3); can be used at component level. |
| **Columns** | Horizontal split into columns; each column can have its own vertical stack. Often collapses to stack on narrow. |
| **Tiles** | Grid of equal-width items that wrap; responsive column count. |
| **Switcher** | Switches between horizontal and vertical layout based on container width (no media queries). |
| **Cover** | Full-height block with one main centered element and optional header/footer strips. |
| **Aside** | Main content + sidebar (left or right); sidebar can be fixed width or flexible. |

---

## 2. Content-led patterns

| Name | Description |
|------|-------------|
| **Heading + content** | Single heading (or title) with one body block below. |
| **Heading + two contents** | One heading with two text blocks (e.g. intro + body). |
| **Two headings + contents** | Two columns (or two rows), each with its own heading and content. |
| **Media object** | Image (or media) on one side, text on the other; can be left/right and nested. Classic for comments, cards, list items. |
| **Heading + image** | Title above an image (or image above title). |
| **Two col: heading + image** | Two columns, each with a heading and image (e.g. before/after, comparison). |
| **Image + caption** | Image with caption below (or overlay). |
| **Quote / testimonial** | Quoted text + optional attribution (name, role, avatar). |
| **Feature card** | Icon or image + title + short description; often in a grid. |
| **Profile card** | Avatar + name + role + short bio (or link). |
| **Call to action (CTA)** | Short headline + supporting line + button (or link). |
| **Hero** | Large headline + optional subhead + primary action; often full-width with background or image. |
| **Deck / lede** | Short lede paragraph + optional byline/date. |

---

## 3. Decorative / typographic

| Name | Description |
|------|-------------|
| **Heading with rules** | Heading with a line (or double line) before/after; often `1fr auto 1fr` grid. |
| **Label + value** | Two-column row (e.g. “Date”, “Author”) for metadata. |
| **Step / numbered** | Number or step indicator + title + content (explain, how-to). |
| **List + icon** | List items with a small icon or bullet; vertical stack. |

---

## 4. Summary for this project

**Already in the app:** Heading + content, Two headings + contents, Heading + image, Two col: heading + image, Image + caption, Heading + two contents.

**Good next additions (from research):** Media object, Quote / testimonial, Feature card, CTA block, Heading with rules, Step / numbered, Label + value.

Use **container queries** (`container-type: inline-size`, `@container`) so micro layouts respond to their container width, not only the viewport.
