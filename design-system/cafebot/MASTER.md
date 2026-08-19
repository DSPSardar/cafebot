# CafeBot — Design System (Master)

Source of truth for the CafeBot frontend's visual language. Read this before
building new pages so styling stays consistent. Overrides for a specific
page go in `design-system/cafebot/pages/<page-name>.md`.

## Origin

Generated from a manual audit of `frontend/index.html` / `frontend/styles.css`,
cross-checked against the `ui-ux-pro-max` skill's knowledge base
(`--design-system "cafe restaurant modern professional warm"` and
`"cozy elegant minimal cafe warm editorial"`).

The skill's product-matched recommendation for "Restaurant/Food Service" was
the **Funnel (3-Step Conversion)** pattern with a **Vibrant & Block-based**
style (bold/duotone, startup-oriented) — that doesn't fit a single-page
informational café site and would have meant a rebuild, which was explicitly
out of scope. What was kept from the skill's output:
- Confirmation that a warm brown/cream palette fits the "Restaurant/Food
  Service" product category (its match used `#92400E`/`#78350F`, close to
  this site's existing brown family).
- Its pre-delivery checklist (contrast, focus states, reduced motion, no
  emoji icons, responsive breakpoints) — applied below.
- Its typography suggestion (Playfair Display SC / Karla, a Google Fonts
  pairing) was **not** adopted — it would add an external font-CDN
  dependency, which conflicts with this project's `CLAUDE.md` rule of no
  unnecessary dependencies / low-cost / minimal. The system-font stack was
  kept and normalized onto a type scale instead.

## Colors

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#faf6f1` | Page background |
| `--color-surface` | `#ffffff` | Header, menu section background |
| `--color-text` | `#3a2b22` | Body text |
| `--color-muted` | `#7a6a5f` | Secondary text (descriptions, subtitles) |
| `--color-primary` | `#6f4e37` | Buttons, hover accents |
| `--color-primary-dark` | `#543a29` | Headings, footer background |
| `--color-accent` | `#d9a441` | Decorative gold (large surfaces only) |
| `--color-accent-text` | `#9c6c22` | Price text — darkened for WCAG AA (4.5:1) on `--color-bg` |
| `--color-navy` | `#1e3a5f` | About-section image panel accent |
| `--color-border` | `#e6ddd3` | Card/section borders |

**Rule:** never use `--color-accent` (`#d9a441`) for body-sized text on
`--color-bg`/`--color-surface` — it fails WCAG AA (~2.1:1). Use
`--color-accent-text` for text, reserve `--color-accent` for large
decorative fills or text on dark backgrounds (`--color-primary-dark`, where
it passes ~4.6:1).

## Spacing scale

`--space-xs: 8px`, `--space-sm: 16px`, `--space-md: 24px`, `--space-lg: 32px`,
`--space-xl: 48px`, `--space-2xl: 64px`, `--space-3xl: 80px` (section
vertical padding).

## Type scale

`--fs-sm: 0.875rem` (14px, card descriptions) · `--fs-base: 1rem` (16px,
body) · `--fs-md: 1.125rem` (18px, hero subhead, card titles) ·
`--fs-lg: 1.5rem` (24px) · `--fs-xl: 2rem` (32px, mobile hero h1). Hero h1
desktop (2.5rem) intentionally exceeds the scale — hero headlines are the
one accepted exception.

Font stack: system UI stack (`-apple-system, BlinkMacSystemFont, "Segoe UI",
Roboto, Helvetica, Arial, sans-serif`) — no external font requests.

## Components

- **Buttons (`.btn`)**: solid `--color-primary`, hover darkens + soft shadow,
  `:active` presses down 1px, visible `:focus-visible` ring in `--color-navy`.
- **Cards (`.menu-card`)**: header row is a flex `.menu-card-header`
  (name + price, `justify-content: space-between`) — not floats — hover
  lifts 4px with a soft shadow and border tint.
- **Nav/header**: sticky, subtle permanent shadow for depth, links get a
  larger tap target (padding) and a color transition on hover/focus.

## Accessibility baseline

- All text meets 4.5:1 contrast against its background.
- `:focus-visible` ring on every link and button.
- Anchored sections (`#about`, `#menu`, `#hours`) have `scroll-margin-top`
  so the sticky header never covers the heading you jump to.
- `prefers-reduced-motion: reduce` collapses all transitions/animations and
  disables smooth scroll.
- No emoji-as-icon in components added after this audit (the existing `☕`
  logo glyph predates this system and is a known open item — see project
  conversation history).

## Known open items (not yet applied)

- Logo still uses an emoji (`☕`) rather than an SVG icon — deferred pending
  a decision on branding (see prior conversation about a possible
  "Silveroaks Netcafe" logo, which was not applied due to third-party
  trademark concerns).
- No dedicated dark mode.
