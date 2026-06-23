---
name: Obsidian Flux
colors:
  surface: '#131315'
  surface-dim: '#131315'
  surface-bright: '#39393b'
  surface-container-lowest: '#0e0e10'
  surface-container-low: '#1c1b1d'
  surface-container: '#201f22'
  surface-container-high: '#2a2a2c'
  surface-container-highest: '#353437'
  on-surface: '#e5e1e4'
  on-surface-variant: '#c7c4d7'
  inverse-surface: '#e5e1e4'
  inverse-on-surface: '#313032'
  outline: '#908fa0'
  outline-variant: '#464554'
  surface-tint: '#c0c1ff'
  primary: '#c0c1ff'
  on-primary: '#1000a9'
  primary-container: '#8083ff'
  on-primary-container: '#0d0096'
  inverse-primary: '#494bd6'
  secondary: '#ddb7ff'
  on-secondary: '#490080'
  secondary-container: '#6f00be'
  on-secondary-container: '#d6a9ff'
  tertiary: '#ffb783'
  on-tertiary: '#4f2500'
  tertiary-container: '#d97721'
  on-tertiary-container: '#452000'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#f0dbff'
  secondary-fixed-dim: '#ddb7ff'
  on-secondary-fixed: '#2c0051'
  on-secondary-fixed-variant: '#6900b3'
  tertiary-fixed: '#ffdcc5'
  tertiary-fixed-dim: '#ffb783'
  on-tertiary-fixed: '#301400'
  on-tertiary-fixed-variant: '#703700'
  background: '#131315'
  on-background: '#e5e1e4'
  surface-variant: '#353437'
typography:
  display-lg:
    fontFamily: Geist
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-md:
    fontFamily: Geist
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Geist
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '450'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-xs:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.05em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  2xl: 80px
  gutter: 24px
  container-max: 1280px
---

## Brand & Style
This design system is engineered for high-performance developer tools and premium technical interfaces. It rejects generic "SaaS-blue" aesthetics in favor of a **Sophisticated Minimalist** approach with a **Technical Edge**. 

The brand personality is precise, intentional, and high-end. It evokes an emotional response of absolute reliability and elite craftsmanship. The visual style utilizes a "Dark Mode First" philosophy, mixing deep zinc foundations with subtle glassmorphic overlays and razor-sharp typography. Every element is designed to feel like a precision instrument—dense with information but hyper-legible and balanced through generous whitespace and logical layering.

## Colors
The palette is rooted in a "Deep Slate" spectrum, moving from a near-black neutral base (`#09090b`) to a mid-range zinc. This provides a high-contrast environment where the "Electric Indigo" (`#6366f1`) primary accent can vibrate against the dark background.

- **Primary:** Electric Indigo for high-action signals and focus states.
- **Secondary:** Vivid Violet for supplemental data visualization or secondary highlights.
- **Surface Strategy:** Use a tiered gray scale for containment. Surfaces should never be pure black; they utilize subtle shifts in zinc values to denote hierarchy.
- **Accents:** Use a refined "Success" emerald and "Critical" rose, muted slightly to maintain the premium feel.

## Typography
Typography is the core of this design system's "designer-grade" feel. 
- **Headings:** Use **Geist** with tight tracking (`-0.02em` to `-0.04em`) to create a dense, authoritative look.
- **Body:** **Inter** provides maximum legibility for long-form technical documentation.
- **Monospace:** **JetBrains Mono** is used exclusively for code snippets, IDs, and technical metadata.
- **Hierarchy:** Emphasize weight over size. A small, bold label often carries more hierarchy than a large, thin headline in this system.

## Layout & Spacing
This system utilizes an **Editorial Bento-Box** layout model. Components are housed in distinct, modular containers that fit into a rigid 12-column grid.

- **Whitespace:** Use extreme padding within containers (minimum 32px for desktop cards) to allow the content to "breathe" against the dark UI.
- **Grid:** Use a 24px gutter. For marketing or high-level dashboard views, use asymmetrical bento layouts (e.g., a 2/3 and 1/3 split).
- **Responsive:** On mobile, collapse grids to a single column but maintain 16px margins to preserve the sleek, compact feel.

## Elevation & Depth
Depth is created through **Tonal Layering** and **Subtle Glassmorphism** rather than traditional heavy shadows.

- **Surfaces:** Use `zinc-950` for the base and `zinc-900` for cards.
- **Glassmorphism:** For overlays like modals or navigation bars, use a 12px backdrop blur with a 40% opaque surface color and a 1px "inner-glow" border (`white` at 10% opacity).
- **Shadows:** Use a single, very soft ambient shadow for floating elements: `0 20px 40px rgba(0,0,0,0.4)`. 
- **Borders:** All containers must have a 1px solid border using the `border_subtle_hex`. This defines the "physical" edge of the component in a dark environment.

## Shapes
The shape language is "Soft-Technical." Elements use a consistent `0.25rem` (4px) or `0.5rem` (8px) radius. This provides enough roundness to feel modern and premium while maintaining the architectural precision of sharp corners. Avoid pill shapes for everything except status tags and toggle switches.

## Components
- **Buttons:** Primary buttons use a solid Electric Indigo background with white text. Secondary buttons use a "Ghost" style: a subtle zinc border that brightens on hover.
- **Inputs:** Dark backgrounds (`#09090b`) with a 1px border. On focus, the border changes to Electric Indigo with a 2px outer glow (ring).
- **Cards:** The "Bento" card is the hero component. It should have a subtle gradient stroke (Zinc-800 to Zinc-900) and a very faint background noise texture to add a tactile, premium feel.
- **Code Blocks:** Use a slightly darker background than the card it sits in. Include a "Copy" button that only appears on hover. Use JetBrains Mono with custom syntax highlighting based on the Electric Indigo/Violet palette.
- **Chips/Tags:** Small, monospace font, semi-transparent background with a border matching the text color.