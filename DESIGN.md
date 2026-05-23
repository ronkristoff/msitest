# Contentful-Inspired — Style Reference

**Register:** Product — design serves the task, not itself.
**Theme:** Light only. Dark sidebar for navigation.

> Precise, calm, technical. The UI feels like a well-calibrated instrument: reliable, quiet, focused. Failures are data, not drama. Screenshots over prose, exact numbers over summaries.

## Font

- **Primary:** Avenir Next — humanist sans-serif with warmth at scale, enterprise-grade readability
- **Mono:** JetBrains Mono — for code, logs, test output, tabular data
- **Icon system:** Tabler Icons (@tabler/icons-react)

## Tokens — Colors

### Primary Palette

| Name | Value | Token | Role |
|------|-------|-------|------|
| Brand Dark | `#1B1E28` | `--color-brand-dark` | Primary text, dark sidebar background, headings |
| Surface | `#FFFFFF` | `--color-surface` | Cards, panels, elevated surfaces |
| Background | `#F7F9FA` | `--color-background` | Page background |
| Brand Blue | `#0286C3` | `--color-brand-blue` | CTAs, links, active states, focus rings |
| Brand Blue Dark | `#0073AA` | `--color-brand-blue-dark` | Hover states for brand-blue elements |

### Neutral Scale

| Name | Value | Token | Role |
|------|-------|-------|------|
| Secondary | `#536171` | `--color-secondary` | Captions, metadata, secondary text |
| Muted | `#8DA4BE` | `--color-muted` | Placeholders, disabled text, muted icons |
| Border | `#CFD9E0` | `--color-border` | Input borders, visible dividers |
| Border Subtle | `#E5EBED` | `--color-border-subtle` | Section dividers, subtle separators |

### Semantic Status Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Success | `#17B897` | `--color-success` | Test passed, published — teal |
| Error | `#D32F2F` | `--color-error` | Test failed, blocked — red |
| Warning | `#F5A623` | `--color-warning` | Warnings, flaky tests — amber |
| Running | `#0286C3` | `--color-running` | In progress — brand blue |

### Data-Viz Accent Colors

Used only for feature category badges and data visualization. Never decorative.

| Name | Value | Token | Role |
|------|-------|-------|------|
| Electric | `#2563EB` | `--color-electric` | Functional category |
| Rose | `#BE185D` | `--color-rose` | Security category |
| Copper | `#C2410C` | `--color-copper` | Error handling category |

## Tokens — Typography

### Avenir Next — Primary typeface. Humanist sans-serif with warmth and readability at enterprise scale. `--font-sans`
- **Substitute:** -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
- **Weights:** 400, 500, 600, 700
- **Source:** System font (bundled with macOS). Falls back to -apple-system / Segoe UI / Roboto
- **Body size:** 14px for dense editorial UI
- **Body max-width:** 65-75ch

### Type Scale

| Role | Size | Line Height | Weight | Token |
|------|------|-------------|--------|-------|
| caption | 12px | 1.5 | 400 | `--text-caption` |
| body-sm | 12px | 1.6 | 400 | `--text-body-sm` |
| body | 14px | 1.6 | 400 | `--text-body` |
| subheading | 20px | 1.4 | 500 | `--text-subheading` |
| heading-sm | 20px | 1.3 | 600 | `--text-heading-sm` |
| heading | 32px | 1.2 | 700 | `--text-heading` |
| heading-lg | 44px | 1.1 | 700 | `--text-heading-lg` |
| display | 60px | 1.0 | 700 | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

4, 8, 12, 16, 20, 24, 32, 36, 40, 48

### Border Radius

| Element | Value | Token |
|---------|-------|-------|
| Buttons, inputs, badges | 6px | `--radius-default` |
| Cards, modals | 8px | `--radius-cards` |
| Large containers | 12px | `--radius-large` |
| Pill, chip, avatar | 9999px | `--radius-pill` |

### Shadows — 4-Tier Elevation

| Level | Value | Token | Use |
|-------|-------|-------|-----|
| Raised | `0 1px 2px rgba(0,0,0,0.1)` | `--shadow-raised` | Cards |
| Overlay | `0 4px 8px rgba(0,0,0,0.12)` | `--shadow-overlay` | Dropdowns |
| Modal | `0 8px 24px rgba(0,0,0,0.15)` | `--shadow-modal` | Dialogs |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 32px
- **Card padding:** 16px

## Components

### Primary Action Button
Brand Blue background (`#0286C3`), white text, 6px border-radius, 8px 16px padding. High-visibility CTAs.

### Secondary Outline Button
White background, border `#CFD9E0`, brand-dark text. Used for less emphasized actions.

### Cards
White background, 8px border-radius, 16px padding, `--color-border-subtle` border, `--shadow-raised` elevation. Hover: `--shadow-overlay` with border darkening to `--color-border`.

### Inputs & Forms
Border `#CFD9E0`, 6px border-radius, 8px 12px padding. Focus: border `#0286C3`, shadow `0 0 0 3px rgba(2,134,195,0.2)`.

### Sidebar Navigation
- **Background:** Dark navy (`#242736`), 240px width
- **Title:** Brand-blue dot + white text, 56px header
- **Active item:** Brand Blue at 15% opacity background, Brand Blue text, 2px left accent bar in brand-blue, 6px radius
- **Inactive item:** White text at 80% opacity, hover shows subtle brand-blue tint
- **Spacing-only separators:** No horizontal border lines — whitespace groups sections

### Data Tables
- Header: secondary color (#536171), caption size, uppercase
- Row: body-sm, compact height
- Border: brand-border on bottom only
- No zebra stripes, no vertical borders

### Code & Log Blocks
- Background: `--color-background`
- Border: `--color-border`, 8px radius
- Font: JetBrains Mono
- Padding: 16px

## Color Strategy

**Restrained** — Gray-tinted neutrals carry 90% of the surface. Brand Blue (`#0286C3`) as the sole accent for interactive moments. Semantic status colors (success/error/warning) used only for test result signals. Data-viz colors (electric/rose/copper) reserved for feature category badges only.

## Design Principles

1. **Status at a glance.** Pass/fail scannable without reading. Green/red signals visible immediately.
2. **Show, don't tell.** Screenshots are primary evidence. Text supports, not replaces, visual proof.
3. **Technical confidence.** Exact data builds trust. No rounding without reason. No hiding failures behind summaries.
4. **Fast read.** Strong hierarchy, consistent layout, minimal prose. Scanning beats reading.
5. **Calm under pressure.** When tests fail, the UI helps. No red-alert banners, no frantic animations. Clear, actionable, composed.

## References & Anti-references

**References:**
- Contentful (Forma 36) — enterprise structure, sky-blue primary on clean white, dark sidebar
- Linear's focused density — information-rich without clutter
- GitHub Actions run views — step-by-step results, screenshot evidence

**Anti-references:**
- Purple gradients, glassmorphism, nested cards, Inter font everywhere
- Hero banners, scroll-driven reveals, marketing-speak
- Emoji-heavy microcopy, playful illustrations
- Overly rounded corners, decorative blurs, gratuitous shadows

## Accessibility

- WCAG 2.1 AA minimum
- Full keyboard navigation
- Screen reader support for all result views
- Reduced motion: `prefers-reduced-motion` respected (all animations disabled)
- Color is never the sole indicator of status — icons and labels always accompany pass/fail signals
- Minimum 44x44px touch targets on mobile

## Component Library

**shadcn v4 with BaseUI primitives (base-nova style).** All components in `components/ui/` use `@base-ui/react` as the primitive layer, not Radix. Configured in `components.json` with `"style": "base-nova"` and `"rsc": true`.

Key active components: button, card, dialog, table, tabs, badge, sidebar, toast, skeleton, progress, input, select, form, field, alert, separator, accordion, avatar, checkbox, combobox, command, drawer, menu, popover, sheet, slider, switch, tooltip.

### BaseUI-specific patterns

- Use `mergeProps` from `@base-ui/react/merge-props` for prop composition (replaces Radix's `asChild`)
- Use `useRender` from `@base-ui/react/use-render` for polymorphic rendering
- BaseUI primitives handle ARIA and keyboard interactions internally

## Layout Patterns

- **Dashboard:** dark sidebar navigation (240px) + main content area
- **Sidebar active item:** Brand Blue at 15% background, Brand Blue text, 2px left accent bar, 6px radius
- **Data tables:** Secondary caption headers (uppercase), Border bottom only, compact rows
- **Code/log blocks:** Background surface, JetBrains Mono, 8px radius
- **Cards:** White surface, Border Subtle border, 8px radius, 16px padding, `shadow-raised` default, `shadow-overlay` hover with border darkening to `--color-border`
- **Buttons:** Brand Blue primary (6px radius), Border outline secondary, 9999px Pill for tags/chips

## Do's and Don'ts

### Do
- Use Brand Dark (`#1B1E28`) for primary text and headings, ensuring high contrast against white surfaces.
- Apply Border (`#CFD9E0`) for input borders and visible dividers.
- Use 6px radius for buttons, inputs, and interactive elements; 8px for cards and modals.
- Use Brand Blue (`#0286C3`) consistently for CTAs, links, and active states.
- Use 9999px radius for all pill/chip-shaped elements.
- Semantic status colors (success/error/warning) are used ONLY for test result signals. Never decoratively.
- Keep the sidebar dark (`#242736`) — navigation should anchor the page.
- Use `shadow-raised` on all cards by default — flat surfaces feel unfinished.
- Use Avenir Next at 14px for body — enterprise readability.

### Don't
- Avoid introducing new shadow effects beyond the 4-tier elevation system.
- Do not use highly saturated colors for large text blocks; reserve them for accent elements and status signals.
- Do not introduce body text sizes below 12px.
- Avoid gradient text, glassmorphism, nested cards, purple gradients.
- Don't use Avenir Next below 12px.

## Quick Start

### Tailwind v4

```css
@import "tailwindcss";

@theme inline {
  /* Colors — Contentful-inspired */
  --color-brand-dark: #1b1e28;
  --color-sidebar-bg: #242736;
  --color-surface: #ffffff;
  --color-background: #f7f9fa;
  --color-secondary: #536171;
  --color-muted: #8da4be;
  --color-border: #cfd9e0;
  --color-border-subtle: #e5ebed;
  --color-brand-blue: #0286c3;
  --color-brand-blue-dark: #0073aa;
  --color-electric: #2563eb;
  --color-rose: #be185d;
  --color-copper: #c2410c;

  /* Semantic status colors */
  --color-success: #17b897;
  --color-error: #d32f2f;
  --color-warning: #f5a623;
  --color-running: #0286c3;

  /* Typography */
  --font-sans: 'Avenir Next', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Border Radius */
  --radius-default: 6px;
  --radius-cards: 8px;
  --radius-large: 12px;
  --radius-pill: 9999px;

  /* Shadows */
  --shadow-raised: 0 1px 2px rgba(0, 0, 0, 0.1);
  --shadow-overlay: 0 4px 8px rgba(0, 0, 0, 0.12);
  --shadow-modal: 0 8px 24px rgba(0, 0, 0, 0.15);
}
```
