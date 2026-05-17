# Clay — Style Reference
> Playful Precision Playground. A brightly lit space filled with meticulously arranged, colorful building blocks.

**Theme:** light

This design system feels like a thoughtfully organized play-space, balancing crisp professional typography with unexpected bursts of vibrant, playful color in testimonial cards and illustrations. The overall tone is light and inviting, grounded by a clean, spacious layout. Subtle border treatments and generous radii on containers soften the digital edge, creating a friendly yet authoritative aesthetic.

## Font

- **Primary:** Satoshi (free, Fontshare) — geometric sans-serif with friendly character, substitutes Roobert
- **Mono:** JetBrains Mono — for code, logs, test output, tabular data
- **Icon system:** Phosphor Icons

## Tokens — Colors

| Name | Value | Token | Role |
|------|-------|-------|------|
| Pitch Black | `#000000` | `--color-pitch-black` | Primary text, button backgrounds, strong accents for contrast |
| Ghost White | `#ffffff` | `--color-ghost-white` | Page backgrounds, card backgrounds, inverse text on dark elements |
| Cloud Gray | `#f9f8f6` | `--color-cloud-gray` | Subtle background for UI elements like secondary cards or sections |
| Inkwell | `#55534e` | `--color-inkwell` | Secondary body text, softer contrast against white backgrounds |
| Platinum Gray | `#e6e8ec` | `--color-platinum-gray` | Subtle borders and separators, secondary button borders |
| Oatmeal | `#dad4c8` | `--color-oatmeal` | Border color for various UI elements, providing a warm, subtle distinction |
| Clay Violet | `#3859f9` | `--color-clay-violet` | Primary brand accent for interactive elements like links and key call-to-action details |
| Vivid Sky | `#429dff` | `--color-vivid-sky` | Highlight color for cards, bringing a clear, energetic blue to sections |
| Tangerine | `#ff7614` | `--color-tangerine` | Energetic accent color for cards and visual elements, signaling warmth and dynamism |
| Lime Pop | `#cbd810` | `--color-lime-pop` | Vibrant accent color for cards, indicating freshness and vibrancy |
| Azure Glow | `#3bd3fd` | `--color-azure-glow` | Bright accent color for cards, contributing to a playful and modern feel |
| Matcha Green | `#02693e` | `--color-matcha-green` | Deep, rich accent color for cards, providing a grounded but still vibrant option |
| Dragonfruit Pink | `#8b045c` | `--color-dragonfruit-pink` | Bold accent color for cards, adding a strong, distinctive pop |
| Blueberry Deep | `#0667d9` | `--color-blueberry-deep` | Core accent color for cards, serving as a primary vibrant blue |
| Ube Haze | `#c1b0ff` | `--color-ube-haze` | Pastel accent often used as a background for special sections or badges |

### Semantic Status Colors

Additional tokens for pass/fail/warning signals in the test platform. These are used only for test results, never decoratively.

| Name | Value | Token | Role |
|------|-------|-------|------|
| Success | `#16a34a` | `--color-success` | Test passed — green |
| Error | `#dc2626` | `--color-error` | Test failed — red |
| Warning | `#d97706` | `--color-warning` | Warnings, flaky tests — amber |
| Running | `#3859f9` | `--color-running` | In progress — clay violet (same as brand accent) |

## Tokens — Typography

### Satoshi — The primary typeface for all text elements. Its geometric yet friendly character defines the brand's voice, using varying weights to articulate hierarchy and emphasis. · `--font-sans`
- **Substitute:** system-ui, -apple-system, sans-serif
- **Weights:** 400, 500, 700, 900
- **Source:** [Fontshare](https://www.fontshare.com/fonts/satoshi) (free)

### Type Scale

| Role | Size | Line Height | Weight | Token |
|------|------|-------------|--------|-------|
| caption | 10px | 1.4 | 400 | `--text-caption` |
| body-sm | 13px | 1.6 | 400 | `--text-body-sm` |
| body | 16px | 1.6 | 400 | `--text-body` |
| subheading | 18px | 1.5 | 500 | `--text-subheading` |
| heading-sm | 20px | 1.5 | 600 | `--text-heading-sm` |
| heading | 32px | 1.2 | 700 | `--text-heading` |
| heading-lg | 44px | 1.1 | 700 | `--text-heading-lg` |
| display | 60px | 1.0 | 900 | `--text-display` |

## Tokens — Spacing & Shapes

**Base unit:** 4px

**Density:** comfortable

### Spacing Scale

4, 8, 12, 16, 20, 24, 32, 36, 40, 48, 60, 64, 76, 96, 112, 120

### Border Radius

| Element | Value | Token |
|---------|-------|-------|
| Interactive elements | 8px | `--radius-interactiveelements` |
| Cards | 12px | `--radius-cards` |
| Buttons | 12px | `--radius-buttons` |
| Large cards | 40px | `--radius-largecards` |
| Pill / chip | 1584px | `--radius-pill` |

### Shadows

| Name | Value | Token |
|------|-------|-------|
| subtle | `rgba(0, 0, 0, 0.1) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px -1px 1px 0px inset, rgba(0, 0, 0, 0.05) 0px -0.5px 1px 0px` | `--shadow-subtle` |

### Layout

- **Page max-width:** 1200px
- **Section gap:** 64px
- **Card padding:** 20px
- **Element gap:** 8px

## Components

### Primary Action Button
Solid black background (`--color-pitch-black`), white text (`--color-ghost-white`), 12px border-radius, compact vertical padding. Delivers clear, high-contrast calls to action.

### Secondary Outline Button
Transparent background, dark gray text (`--color-pitch-black`), border `--color-oatmeal`, 12px border-radius. Used for less emphasized actions.

### Ghost Button
White background (`--color-ghost-white`), black text (`--color-pitch-black`), 12px border-radius. Provides a prominent but less assertive alternative.

### Pill Button
White background (`--color-ghost-white`), black text (`--color-pitch-black`), 1584px (full pill) border-radius. Used for chips, tags, or compact interactive elements.

### Card
White background (`--color-ghost-white`), 12px border-radius, 20px padding, `--color-oatmeal` border. Subtle definition, no heavy shadow.

### Sidebar Navigation
- Active item: `--color-clay-violet` at 10% opacity background, `--color-clay-violet` text
- Inactive item: `--color-inkwell` text
- Item radius: `--radius-interactiveelements` (8px)
- No separators — white space groups items

### Data Tables
- Header: `--color-inkwell`, caption size, uppercase
- Row: body-sm, compact height
- Border: `--color-oatmeal` on bottom only
- No zebra stripes, no vertical borders

### Code & Log Blocks
- Background: `--color-cloud-gray`
- Border: `--color-oatmeal`, 12px radius
- Font: JetBrains Mono
- Padding: 16px

## Do's and Don'ts

### Do
- Use Pitch Black (`#000000`) for primary text and CTAs, ensuring high contrast against Ghost White (`#ffffff`) or Cloud Gray (`#f9f8f6`) backgrounds.
- Apply Oatmeal (`#dad4c8`) for subtle borders on UI elements, contributing to a warm, approachable feel without harsh lines.
- Use 12px radius as the default for most interactive elements and cards.
- Use Clay Violet (`#3859f9`) consistently for primary interactive elements, links, and key brand highlights.
- Use 1584px radius for all pill/chip-shaped elements.
- Semantic status colors (success/error/warning) are used ONLY for test result signals. Never decoratively.

### Don't
- Avoid introducing new shadow effects beyond the subtle inset shadow.
- Do not use highly saturated colors for large text blocks; reserve them for accent elements and status signals.
- Do not introduce body text sizes smaller than 13px for content; captions at 10px are for labels/metadata only.
- Avoid gradient text, glassmorphism, nested cards, purple gradients.

## Quick Start

### Tailwind v4

```css
@import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap');
@import "tailwindcss";

@theme inline {
  /* Colors */
  --color-pitch-black: #000000;
  --color-ghost-white: #ffffff;
  --color-cloud-gray: #f9f8f6;
  --color-inkwell: #55534e;
  --color-platinum-gray: #e6e8ec;
  --color-oatmeal: #dad4c8;
  --color-clay-violet: #3859f9;
  --color-vivid-sky: #429dff;
  --color-tangerine: #ff7614;
  --color-lime-pop: #cbd810;
  --color-azure-glow: #3bd3fd;
  --color-matcha-green: #02693e;
  --color-dragonfruit-pink: #8b045c;
  --color-blueberry-deep: #0667d9;
  --color-ube-haze: #c1b0ff;

  /* Semantic status colors */
  --color-success: #16a34a;
  --color-success-bg: rgb(22 163 74 / 0.1);
  --color-error: #dc2626;
  --color-error-bg: rgb(220 38 38 / 0.1);
  --color-warning: #d97706;
  --color-running: #3859f9;
  --color-running-bg: rgb(56 89 249 / 0.1);

  /* Typography */
  --font-sans: 'Satoshi', ui-sans-serif, system-ui, -apple-system, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;

  /* Border Radius */
  --radius-interactiveelements: 8px;
  --radius-cards: 12px;
  --radius-buttons: 12px;
  --radius-largecards: 40px;
  --radius-pill: 1584px;

  /* Shadows */
  --shadow-subtle: rgba(0, 0, 0, 0.1) 0px 1px 1px 0px, rgba(0, 0, 0, 0.04) 0px -1px 1px 0px inset, rgba(0, 0, 0, 0.05) 0px -0.5px 1px 0px;
}
```
