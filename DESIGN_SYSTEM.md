# Trelis Life — Brand Design System Spec
**Editorial. Culinary. Science-First. Built in the Open.**

This design system spec outlines the exact visual, structural, and interactive principles that define the Trelis Life platform. It is extracted directly from the actual values and patterns used within the codebase, ensuring that any future platform, product page, or asset remains perfectly aligned with the brand's premium, minimalist aesthetic.

---

## 1. Color Palette

Trelis Life is styled around a high-end editorial look that feels like premium, textured card stock ("paper"). Colors are warm, natural, and soft, avoiding harsh synthetic darks and high-contrast clinical white.

### Foundational Colors

| Token | CSS Variable | Hex Code | Role & Usage |
| :--- | :--- | :--- | :--- |
| **Paper Base** | `--background` | `#F7F6F2` | Warm off-white background representing organic card stock. Never use pure white (`#FFF`) for pages. |
| **Ink/Text** | `--foreground` | `#0F172A` | Slate 900 for crisp, high-contrast headings and body text. |
| **Primary Accent** | `--color-brand-teal` | `#2A7F7F` | Deep brand teal used for active states, CTA borders, navigation capsules, and progress indicators. |
| **Card Glass** | `--card-bg` | `rgba(255, 255, 255, 0.45)` | Glassmorphic white overlay base used for clean layout tiles and modules. |
| **Border Soft** | `--card-border` | `rgba(0, 0, 0, 0.04)` | Extremely faint black border line to separate glass containers without adding visual weight. |
| **Grid Lines** | *Inline style* | `rgba(0, 0, 0, 0.028)` | Decorative background structural layout lines. |

### Flavour Accents (Ember/Glow Palette)
Each product flavor features a unique theme color used for glowing backdrop ambiances (`glowColor` at `15%` opacity) and active accent strokes:

| Flavor SKU | Hex Accent | Glow RGBA | Role / Mood |
| :--- | :--- | :--- | :--- |
| **Lime** | `#A3E635` | `rgba(163, 230, 53, 0.15)` | Zesty, bright, glowing lime green representing active cultures and fresh citrus. |
| **Ginger** | `#F59E0B` | `rgba(245, 158, 11, 0.15)` | Warm, comforting amber-gold reflecting throat-soothing heat. |
| **Spice** | `#B45309` | `rgba(180, 83, 9, 0.15)` | Earthy, deep copper-brown signaling digestive warmth and savory roots. |
| **Berry** | `#8B5CF6` | `rgba(139, 92, 246, 0.15)` | Rich, deep royal purple/violet capturing wild jamun and purple fruits. |

---

## 2. Typography

Trelis Life treats text as a premium editorial journal. The hierarchy relies on weight contrast (ultra-light vs. bold) and character spacing rather than size alone.

### Font Families
*   **Primary Sans (Body & Labels)**: `Geist Sans` (Fallback: `ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`). Used for clean, technical data representation.
*   **Mono Face (Meta/Data)**: `Geist Mono` (Fallback: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`). Used for clock, stats, numbers, and system-synced markers.
*   **Editorial Focus**: Utilizes a highly structured layout pairing. Custom headings use a combination of **Extra-Light** weights with **Italicized Semibold/Bold** accents to mimic a high-end physical magazine format.

### Type Scale & Weights

*   **Hero Headers**: `text-4xl` to `text-6xl` (36px–60px) | `font-extralight` (weight 200) | `tracking-tight` | Line height `leading-[1.15]`.
*   **Section Headers**: `text-3xl` to `text-5xl` (30px–48px) | `font-extralight` (weight 200) | `tracking-tight`.
*   **Card Headers**: `text-base` to `text-lg` (16px–18px) | `font-semibold` (weight 600) | `text-slate-900`.
*   **Body Copy**: `text-sm` to `text-base` (14px–16px) | `font-light` (weight 300) | `leading-relaxed` (1.625) | `text-slate-500`.
*   **Uppercase Micro-Labels**:
    *   **Size**: `text-[9px]` to `text-[11px]` (9px–11px)
    *   **Weight**: `font-bold` (weight 700)
    *   **Case**: `UPPERCASE`
    *   **Spacing**: `tracking-widest` (0.1em–0.15em)
    *   **Color**: `#2A7F7F` for active tags, or neutral slate (`#94A3B8`) for metadata categories.
    *   **Pill Background**: `rgba(42, 127, 127, 0.05)` (Teal/5%) with a border of `rgba(42, 127, 127, 0.1)`.

---

## 3. Spacing & Layout

The layout system is airy, calm, and structured, mimicking grid-aligned block prints.

*   **Decorative Background Grid**: A mandatory background overlay set at size `3rem x 3rem` (`48px x 48px`) with lines colored at `rgba(0, 0, 0, 0.028)` opacity:
    ```css
    background-image: 
      linear-gradient(to right, rgba(0,0,0,0.028) 1px, transparent 1px),
      linear-gradient(to bottom, rgba(0,0,0,0.028) 1px, transparent 1px);
    background-size: 3rem 3rem;
    ```
*   **Whitespace Rhythm**: Sections are separated using generous padding: `py-20` (80px) to `py-24` (96px).
*   **Column Widths**: Reading containers are bounded to prevent long line lengths.
    *   *Hero copy*: `max-w-3xl` (768px) or `max-w-4xl` (896px).
    *   *Informational copy / text blocks*: `max-w-xl` (576px) to `max-w-2xl` (672px).
*   **Page Padding**: Gutters start at `px-6` (24px) on mobile and scale to `px-12` (48px) on desktop screens.

---

## 4. Motion Language (Framer Motion)

Animations represent the fluid, living nature of active probiotic cultures. Transitions must feel weightless, organic, and never mechanical.

*   **Background Aurora / Drift**: Floating background blobs use slow, smooth paths:
    *   *Duration*: `12s` to `15s`
    *   *Easing*: `easeInOut`
    *   *Transform*: Subtle translation along X and Y axes (+/- 15px to 30px).
*   **Carbonation Bubbles**: Upward rising small circular elements:
    *   *Dimensions*: `2px` to `6px` diameter.
    *   *Path*: Linearly ascend from the bottom to top, fading out near the top.
    *   *Duration*: `4s` to `9s` (randomized).
*   **Breathing Rings**: Pulsing indicators:
    *   *Scale*: Transitioning between `1.0` and `1.06`.
    *   *Color*: Fading border-opacity between `15%` and `35%`.
    *   *Duration*: `6s` loop cycle with `easeInOut`.
*   **Scroll-Linked Reveals**: Elements fade up as they enter view:
    *   *Style*: `initial={{ opacity: 0, y: 15 }}` to `whileInView={{ opacity: 1, y: 0 }}`.
    *   *Duration*: `0.7s` | Easing: Standard spring/damping.
*   **Page Transitions & Modals**: Instant snapping is avoided in favor of spring animations:
    *   *Layout Animations*: Smooth layout-aware animations (`layoutId`) for navigation indicators and active tabs.
*   **Passcode Shaking Fallback**: Incorrect state triggers:
    *   *Path*: `x: [-10, 10, -8, 8, -5, 5, 0]` over `0.5s` duration.
*   **Accessibility (Reduced Motion)**:
    *   Every interactive page must query `window.matchMedia("(prefers-reduced-motion: reduce)")`.
    *   If active, all scroll-linked translations, heavy scaling sequences, and infinite translations are bypassed to prevent motion sickness.

---

## 5. Component Patterns

### Glassmorphic Tiles & Cards
Cards do not use solid backgrounds. They float as translucent sheets over the grid pattern.
*   **Background**: `var(--card-bg)` | `rgba(255, 255, 255, 0.45)`.
*   **Blur**: `backdrop-filter: blur(20px)`.
*   **Border**: `1px solid var(--card-border)` | `rgba(0, 0, 0, 0.04)`.
*   **Shadow**: `box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.03)`.
*   **Rounding**: `rounded-3xl` (24px) for cards, `rounded-full` (9999px) for pill buttons and tags.

### Premium Sticky Navigation
*   **Placement**: Fixed header at `h-20` (80px).
*   **Aesthetic**: Translucent `bg-[#F7F6F2]/75` with `backdrop-blur-md` and a thin border `border-black/[0.03]`.
*   **Layout Indicator**: Active pills slide smoothly behind text elements using Framer Motion's `layoutId`.

### Buttons
*   **Pill Format**: Must use `rounded-full` (9999px).
*   **Text Styling**: Text uses uppercase micro-label rules: `text-[11px]` to `text-xs` | `font-bold` | `tracking-widest` | `uppercase`.
*   **Primary Pill**: Solid `#2A7F7F` background with white text, casting a soft teal shadow.
*   **Secondary/Glass Pill**: Translucent white `bg-white/40` with border `border-[#2A7F7F]/15` and brand teal text `#2A7F7F`.
*   **Hover Behavior**: Elevates slightly `hover:scale-[1.02]` with smooth icon animations (e.g., arrow icons translating right `hover:translate-x-1` over `300ms`).

---

## 6. Voice & Tone

Trelis Life is not an intimidating medical platform; it is a kitchen-first, flavor-obsessed companion. The messaging reflects humble mastery, transparent learning, and culinary pleasure.

### Core Values
1.  **Taste-First**: If a gut-healthy food does not taste spectacular, it does not belong on the table.
2.  **Built in the Open**: We share recipes, configurations, database designs, and ingredient specs transparently.
3.  **Honest Learner**: We speak as fellow explorers of the microbiome, never as condescending clinical experts.
4.  **Calm Confidence**: Clean layouts and quiet, deliberate UI choices replace high-volume sales pitches.

### Copywriting Rules

| DO | DON'T |
| :--- | :--- |
| **Do** talk about taste, aroma, temperature, and spice finishes first. | **Don't** sound like a sterile clinic or a pharmacy bottle. |
| **Do** invite users to check logs, explore recipes, and customize ingredients. | **Don't** hide recipe blueprints, formulas, or full ingredient weights. |
| **Do** use simple, crisp language (e.g. "It starts in the gut"). | **Don't** clutter screens with jargon, pop-ups, or aggressive sales timers. |
| **Do** display active probiotic counts transparently (e.g., "1.2 Billion Live Cultures"). | **Don't** make vague claims like "cures bloating" or "gut miracle". |
| **Do** celebrate Indian culinary traditions (Jeera, Jamun, Kala Namak, Kanji). | **Don't** posture as a western-only scientific replacement. |
