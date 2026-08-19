---
name: Digital Choreography & Velvet Terminal
colors:
  surface: '#FAF7F5'
  surface-dim: '#EBD8D3'
  surface-bright: '#FAF7F5'
  surface-container-lowest: '#FFFFFF'
  surface-container-low: '#F5EBE8'
  surface-container: '#F5EBE8'
  surface-container-high: '#F0E2DE'
  surface-container-highest: '#EBD8D3'
  on-surface: '#1F1518'
  on-surface-variant: '#5A4550'
  inverse-surface: '#1A1216'
  inverse-on-surface: '#F2EDE9'
  outline: '#80747B'
  outline-variant: '#E5D5CF'
  surface-tint: '#6B2D5B'
  primary: '#6B2D5B'
  on-primary: '#FFFFFF'
  primary-container: '#F5EBE8'
  on-primary-container: '#2A1525'
  secondary: '#D4764E'
  on-secondary: '#FFFFFF'
  secondary-container: '#FCEEED'
  on-secondary-container: '#7A514D'
  tertiary: '#4A7A5E'
  on-tertiary: '#FFFFFF'
  tertiary-container: '#D1E0C4'
  on-tertiary-container: '#1D3019'
  error: '#BA1A1A'
  on-error: '#FFFFFF'
  error-container: '#FFDAD6'
  on-error-container: '#93000A'
  background: '#FAF7F5'
  on-background: '#1F1518'
  surface-variant: '#EBD8D3'
  dark-background: '#1A1216'
  dark-surface-card: '#241A1F'
  dark-surface-control: '#2D2025'
  dark-border: '#3D2E35'
  dark-border-hover: '#5A4550'
  dark-accent-orchid: '#C98DB8'
  dark-accent-copper: '#E8996E'
  dark-accent-fern: '#7EBF96'
typography:
  display-hero:
    fontFamily: Playfair Display
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 54px
    letterSpacing: -0.02em
  display-hero-mobile:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Playfair Display
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Playfair Display
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 30px
  headline-sm:
    fontFamily: Playfair Display
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-base:
    fontFamily: Sora
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 26px
  body-small:
    fontFamily: Sora
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 22px
  caption:
    fontFamily: Sora
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 18px
  label-mono:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-micro:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '500'
    lineHeight: 14px
  label-nano:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
rounded:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  full: 9999px
spacing:
  base: 8px
  unit-1: 4px
  unit-2: 8px
  unit-3: 12px
  unit-4: 16px
  unit-6: 24px
  unit-8: 32px
  unit-12: 48px
  unit-16: 64px
  container-max: 1100px
---

## Full Vertical Stack Architecture & Velvet Terminal Dark Theme

### 1. Vertical Progressive Disclosure Workflow
- **Pre-Submission Initial State**:
  - The **"Build A SaaS Studio"** workspace is cleanly hidden.
  - The UI is presented as a high-focus vertical workbench (`max-w-5xl mx-auto`):
    - **Hero Section**: Editorial headline, elevator pitch, and preset inspiration pills.
    - **Prompt Studio**: Full-width input deck with 6 service integration cards, specification canvas, and synthesis action bar.
    - **Architecture Preview Dock**: Structural preview of the 4-tier pipeline ready to be dispatched.
- **Active / Generated State**:
  - When the user clicks "Synthesize App" (or presses `⌘+Enter`), the **"Build A SaaS Studio"** (`ResponseViewer`) mounts vertically beneath the Prompt Studio with smooth GSAP autoAlpha/y transition and auto-scrolls into view.
  - Houses the 5 unified sub-studios in a wide, expansive canvas:
    1. **Interactive Sandbox**
    2. **Architecture & Flow**
    3. **Production Code**
    4. **System Prompt**
    5. **Raw Markdown**

### 2. Default Light Mode: Digital Choreography (Warm Stone & Orchid)
- **Ground (`#FAF7F5`)**: Warm stone parchment.
- **Surfaces (`#FFFFFF` / `#F5EBE8`)**: Clean cards with warm blush borders (`#E5D5CF`).
- **Typography (`#2A1525` / `#6B2D5B`)**: Deep plum editorial headlines in *Playfair Display* and UI copy in *Sora*.
- **Accents (`#D4764E` Burnt Sienna & `#4A7A5E` Forest Fern)**: Warm sienna accents and status badges.

### 3. Unified Dark Mode: Velvet Terminal (Harmonious Companion)
- **Shared Hue DNA**: Dark mode colors share the exact same hue spectrum as light mode, preserving visual harmony across theme switches.
- **Ground (`#1A1216`)**: Deep velvet wine ground (never cold blue-gray).
- **Surfaces (`#241A1F` / `#2D2025`)**: Warm wine cards with plum borders (`#3D2E35` / `#5A4550`) and soft orchid specular highlights.
- **Typography (`#F2EDE9`)**: Warm ivory headlines and soft taupe-rose descriptions (`#A89B9F`).
- **Accents (`#C98DB8` Soft Orchid, `#E8996E` Copper, `#7EBF96` Mint Fern)**: Luminance-lifted companion colors sharing hue identity with their light counterparts.
