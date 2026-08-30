---
name: Keyli Sublimaciones Editorial System
source: Stitch project "Catálogo Editorial Keyli Sublimaciones v2" (projects/9197813770905051520)
colors:
  surface: '#fbf9fc'
  surface-dim: '#dbd9dc'
  surface-bright: '#fbf9fc'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f6'
  surface-container: '#efedf0'
  surface-container-high: '#e9e7ea'
  surface-container-highest: '#e3e2e5'
  on-surface: '#1b1b1e'
  on-surface-variant: '#4a454e'
  inverse-surface: '#303033'
  inverse-on-surface: '#f2f0f3'
  outline: '#7b757f'
  outline-variant: '#ccc4cf'
  surface-tint: '#6c538b'
  primary: '#6c538b'
  on-primary: '#ffffff'
  primary-container: '#a78bc7'
  on-primary-container: '#3b2358'
  inverse-primary: '#d8baf9'
  secondary: '#675970'
  on-secondary: '#ffffff'
  secondary-container: '#efdcf8'
  on-secondary-container: '#6d5f76'
  tertiary: '#605d66'
  on-tertiary: '#ffffff'
  tertiary-container: '#99959f'
  on-tertiary-container: '#302e36'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eedbff'
  primary-fixed-dim: '#d8baf9'
  on-primary-fixed: '#270e43'
  on-primary-fixed-variant: '#543b71'
  secondary-fixed: '#efdcf8'
  secondary-fixed-dim: '#d2c0db'
  on-secondary-fixed: '#22172b'
  on-secondary-fixed-variant: '#4f4258'
  tertiary-fixed: '#e5e0eb'
  tertiary-fixed-dim: '#c9c5cf'
  on-tertiary-fixed: '#1c1b22'
  on-tertiary-fixed-variant: '#48464e'
  background: '#fbf9fc'
  on-background: '#1b1b1e'
  surface-variant: '#e3e2e5'
typography:
  display-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 72px
    fontWeight: '800'
    lineHeight: 68px
    letterSpacing: -0.04em
  display-md:
    fontFamily: Bricolage Grotesque
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-sm-mobile:
    fontFamily: Bricolage Grotesque
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  body-main:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: 0.01em
  body-secondary:
    fontFamily: Hanken Grotesk
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0.01em
  label-caps:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.15em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  section-gap-desktop: 120px
  section-gap-mobile: 80px
  grid-gutter: 24px
  container-margin: 64px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

The design system is built upon a high-contrast editorial aesthetic tailored for a custom sublimation studio. It balances the artistic nature of printing with a sophisticated, minimalist structure. The personality is intentional, creative, and premium, evoking a sense of bespoke craftsmanship.

The visual style leans into Modern Editorialism. It avoids the clutter of traditional e-commerce by utilizing large-scale typography, intentional white space, and an asymmetric layout. There is a strict rejection of digital-native trends like gradients or glassmorphism in favor of a tactile, print-inspired feel. The emotional response should be one of clarity, inspiration, and high-end curation.

## Colors

The palette is rooted in a sophisticated range of purples and neutrals.

*   **Primary (Lilac):** Used exclusively for high-impact accents, call-to-action elements, and highlighting key interactive states.
*   **Secondary (Deep Plum):** Reserved for primary headings and core body text to ensure maximum legibility and an authoritative editorial feel.
*   **Tertiary (Pale Lavender):** Used for large-scale section bands and background shifts to break the vertical rhythm without introducing high contrast.
*   **Surface (Off-White):** The dominant background color, providing a clean, "paper-like" canvas.
*   **Support (Warm Gray):** Used for secondary information, metadata, and placeholder text to create a clear visual hierarchy.

## Typography

This design system uses a sharp contrast between a characterful grotesque and a functional sans-serif.

*   **Headlines:** Utilize tight tracking and leading to create a "block" effect, characteristic of high-end magazines.
*   **Body Text:** Employs generous line heights (1.75x) to ensure breathability and a premium reading experience.
*   **Section Labels:** Always in uppercase with wide letter spacing to act as structural markers rather than mere content.
*   **Language:** All default microcopy and system messages are in Mexican Spanish (e.g., "Añadir al carrito", "Detalles del diseño", "Personalización").

## Layout & Spacing

The layout follows an asymmetric editorial grid. Content should not always be centered; instead, it should utilize "white space as a boundary."

*   **Vertical Rhythm:** Use large gaps (100px-140px) between major sections to prevent visual fatigue.
*   **Asymmetry:** On desktop, text blocks and images should often be offset (e.g., text occupying the left 5 columns and images occupying the right 7 columns, or staggered vertical placement).
*   **Dividers:** Avoid solid blocks for separation. Use 1px hairline dividers in Warm Gray (#8A8394) at 20% opacity to define zones.
*   **Mobile Adaptivity:** Collapse asymmetric offsets into a single-column stack, maintaining the generous vertical margins between distinct content groups.

## Elevation & Depth

This design system is strictly flat. It prohibits the use of drop shadows, inner shadows, or blurs.

*   **Tonal Layering:** Depth is achieved exclusively through color blocking. Elements placed on Pale Lavender (#F1ECF7) surfaces are perceived as distinct from the Off-White (#FAF8FB) base.
*   **Outlines:** Use hairline borders (1px) for interactive elements like input fields or card outlines.
*   **Hierarchy:** Importance is conveyed through scale and color (Lilac) rather than physical elevation or "lifting" elements off the page.

## Shapes

The shape language is a mix of structured containers and organic roundedness.

*   **Cards & Imagery:** Use a 16px corner radius to soften the impact of high-contrast photos and product displays.
*   **Interactive Elements:** Buttons and tags must be fully pill-shaped (rounded-full) to provide a clear distinction from the rectangular grid.
*   **Icons:** Use thin-stroke (1.5px) linear icons. Avoid filled icons unless indicating an active state.

## Components

### Buttons
*   **Primary:** Pill-shaped, Lilac (#A78BC7) background, White text, no shadow.
*   **Secondary:** Pill-shaped, Deep Plum (#3E3247) hairline border, Deep Plum text.
*   **Label:** Always `label-caps` for button text.

### Cards
*   Background: Off-White (#FAF8FB).
*   Border: 1px hairline in Warm Gray (#8A8394) at 30% opacity.
*   Radius: 16px.
*   Spacing: 24px internal padding.

### Input Fields
*   Style: Bottom-border only (editorial style) or 1px hairline stroke with 12px radius.
*   Text: `body-secondary` in Deep Plum.
*   Focus State: Border color shifts to Lilac (#A78BC7).

### Chips & Tags
*   Pill-shaped, Pale Lavender (#F1ECF7) background with `label-caps` text in Deep Plum.

### Lists
*   Unstyled bullets. Use Deep Plum for item headers and Warm Gray for descriptions. Separate items with a full-bleed hairline divider.

## Screens in Stitch project

Frontend público:
- **Inicio** — projects/9197813770905051520/screens/1b0701c41e754c65ae1c98c6d86162da
- **Temporadas** — projects/9197813770905051520/screens/598cafc614c741fabd37d87490a8368b
- **Artículos (catálogo)** — projects/9197813770905051520/screens/794c87a1559241129c12a5e74e40b856
- **Navidad (landing estacional)** — projects/9197813770905051520/screens/d2aa2e0490d84c6e93ae87a57bc53eb6

Admin:
- **Dashboard** — projects/9197813770905051520/screens/2c5e5aec1c9f47feb557ccdce23c9a31
- **Productos** — projects/9197813770905051520/screens/cfbc2804d14f42aa9eb306c6987e7959
- **Editar Producto** — projects/9197813770905051520/screens/d4f43e69d49047da8077331535941f80
- **Temporadas (admin)** — projects/9197813770905051520/screens/f3e95d39ffad4fb7a3cdd6f104755330
- **Configuración** — projects/9197813770905051520/screens/0f8895aa689e41359d04e2cce878e0ff
