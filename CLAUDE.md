# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

One-page marketing site for **Malavar Mx** (luxury executive vehicle rental, Morelos / CDMX). Plain static HTML + CSS + vanilla JS. No build step, no package manager, no dependencies, no tests, not a git repo.

Everything user-facing is in **Spanish** (`<html lang="es">`), and so are the CSS section comments. Keep new copy and comments in Spanish.

## Running it

Serve from the project root so the relative `assets/` paths resolve:

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

Opening `index.html` via `file://` mostly works but breaks the `data-clean-logo` canvas path in `script.js` (tainted canvas) and can block video autoplay.

## Architecture

### The CSS cascade *is* the architecture

`index.html` loads six stylesheets (plus Swiper's from a CDN), and **load order is the whole design system**. Later files deliberately override earlier ones; nothing is scoped or modular.

| Order | File | Role |
|---|---|---|
| 0 | `swiper-bundle.min.css` (jsDelivr, pinned to Swiper 11.2.6) | Base carousel styles; loaded first so every project sheet can override it. |
| 1 | `styles.css` | Base layout + original **light** palette (`--paper` cream, dark ink text). Minified into a single line — hard to edit; prefer overriding it. |
| 2 | `experience.css` | Dark repaint, custom SUV cursor, intro sequence work, plus a legacy scene-navigation system that is explicitly disabled at the top of the file. |
| 3 | `intro-override.css` | Final version of the opening logo animation (supersedes the intro rules in the two files above). |
| 4 | `clients-gallery.css` | Layout for the `#clientes` section. |
| 5 | `reference-style.css` | **The current visual direction** — dark cinematic (`#05080c`, brass `--gold`), grain overlay, every vehicle card, the galleries, and the final typography pass. ~1500 lines. |
| 6 | `clients-swiper.css` | The `#clientes` logo carousel (Swiper, 2 rows of cards). Loaded last because it replaces the old `.client-list` grid that used to live in `reference-style.css`, **and** because it restacks the section: `reference-style.css` lays `.clients` out as two columns (heading beside the logos) and this file overrides it to a single centred column with the heading on top. |

Practical consequence: **`reference-style.css` is where almost all real work happens.** It is organized as a chronological log of commented Spanish blocks, each a later refinement of an earlier one (e.g. the heading typography is redefined three separate times further down the file). Follow that convention — append a new commented block at the bottom rather than surgically editing an older rule, because an older rule you "fix" is often already overridden below.

It is loaded with a cache-buster: `reference-style.css?v=20260903-3` (and `clients-swiper.css` carries the same one). **Bump that string whenever you edit either file**, otherwise browsers serve the stale copy.

Mobile breakpoint is `max-width: 760px` across all files; the narrower breakpoints are one-off fixes.

### Dead / partially-dead CSS

Do not assume a file is live before grepping the markup:

- `clients-gallery.css`'s `.clients-gallery` / `.client-card` / `.client-page` rules have no matching markup, and so do the `.clients-gallery` / `.clients-pagination` touch-ups in `reference-style.css` (~line 450). Only `clients-gallery.css`'s `.clients` / `.clients-heading` / `.clients-description` rules still apply.
- `styles.css` `.vehicle-photo` rules and `experience.css`'s clients carousel (line ~301) target markup that no longer exists.

### Vehicle cards

`#flota` holds six `<article class="vehicle">` blocks, numbered in `.vehicle-no` (`01 /` … `06 /`). Two presentation patterns:

- **Video card** — a `.vehicle-video` with `<video autoplay muted loop playsinline preload="metadata">` (Cadillac, Yukon, Suburban).
- **Gallery card** — a CSS-only crossfade gallery (Hiace, SUVs, Van Ejecutiva), plus `.statement-gallery` in the `#nosotros` section.

If you renumber or reorder cards, the numbering is hand-written in the HTML; nothing generates it.

### CSS-only crossfade galleries — the one real gotcha

`.statement-gallery`, `.van-gallery`, `.hiace-gallery` and `.suv-gallery` each hold N stacked absolutely-positioned `<img>` elements that fade in sequence with **no JavaScript**. The timing is encoded in two coupled places in `reference-style.css`:

1. A per-image `animation-delay`, hand-listed as `:nth-child(1..N)`, spaced evenly across the cycle.
2. A `@keyframes …-slide` whose visible window is `100 / N` percent (e.g. the 9-image van gallery holds until `11.111%`).

**Adding or removing an image means updating both** — the `nth-child` delay list *and* the keyframe percentages *and* the total `animation` duration. Getting only one right produces overlapping or blank frames rather than an obvious error.

### `script.js`

Small and unbundled; five independent blocks:

- `data-clean-logo` — canvas pass that knocks white backgrounds out of logo PNGs. **Currently no element in `index.html` carries this attribute**, so it is inert; keep it if reintroducing raw client logos.
- Mobile nav toggle (`.menu-toggle` ↔ `nav.open`).
- Contact form — intercepts submit, builds a `mailto:` URL from the fields, and navigates to it. The `<form action="mailto:…">` is only a no-JS fallback. There is no backend.
- `.reveal` IntersectionObserver → adds `.visible` (threshold `0.18`, unobserves after firing). Any new element that should animate in needs `class="reveal"` (add `delayed` for the staggered variant); an element that never enters the viewport stays invisible.
- Clients carousel — initializes Swiper on `.clients-swiper`, with `loop: true` and autoplay. Each slide is a card. The grid is 2 rows everywhere, 2 columns on mobile and 3 from the `761` breakpoint up. Two hard constraints:
  - `grid.fill` **must** stay `'column'` — Swiper refuses to loop a `fill: 'row'` grid.
  - `rows x slidesPerView` **must** stay below 12 (the number of logos). If all twelve fit in one view, Swiper leaves `snapGrid` at 1, sets `isLocked` and the autoplay freezes while still reporting `autoplay.running === true`.

  Desktop uses 3 columns rather than the 4 of the design reference on purpose: at 1440px, 4 columns shrink the drawn logo from 346px to 244px wide, and logo size has been the client's repeated complaint. `clients-swiper.css` mirrors two numbers from the JS: `--filas-cliente` must match `grid.rows` and `--hueco-cliente` must match `spaceBetween`, because the Grid module divides the container's CSS height between the rows. The `.reveal` class sits on `.clients-heading` and on the wrapping `.clients-swiper-shell`, not on the Swiper element itself.

  The cards are painted **darker than the section background** on purpose: most of the client PNGs ship with an opaque black background baked in, and on a light card they read as hard black rectangles.

### Contact details are hardcoded in several places

Phone `+52 55 2212 1359` and `s.p.ejecutivo@gmail.com` appear in `index.html` as `tel:`, `mailto:`, `wa.me/…`, and the form's `data-recipient`, and again as the fallback default inside `script.js`. Change all of them together.

## Directories

- `assets/` — everything `index.html` references (videos, vehicle photo sets, `client-logos/`, the SVG cursor). Subfolders match the gallery they feed (`toyota-hiace/`, `suvs/`, `van-express/`, `statement-fleet/`).
- `output/` — generated image deliverables from ImageGen sessions, one folder per batch (`<tema>-<formato>-<fecha>`), files numbered `01-…`, `02-…`. Some batches carry an `edicion-y-prompts.md` documenting the exact prompts, source files and resampling used. **Deliverables, not site assets** — an image only ships once it is copied into `assets/`.
- `tmp/` — working scratch for those image sessions.
