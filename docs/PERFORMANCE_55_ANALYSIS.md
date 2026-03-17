# Performance 55 Analysis – Hero-Only Page

With modals removed, query reduced, and only Hero visible, the score stays ~55. This doc maps what still loads and blocks the main thread.

---

## Critical Path (What Loads on First Paint)

### 1. Client (main bundle)
- **`@parts/AnimationPlugins`** – **synchronous import** in Client.tsx
  - Registers: GSAP + ScrollTrigger + CustomEase + SplitText + useGSAP
  - All of this loads before any content
  - Loader only uses `gsap.timeline`, `gsap.to`, `gsap.set` – no ScrollTrigger or SplitText
  - Hero uses SplitText for heading/description animation

### 2. Loader (template)
- GSAP pulse animation with `repeat: -1` until `pageLoaded`
- Continuous RAF-style loop until poster/video reports load
- Uses `useAnimation` → `useGSAP` → `gsap.matchMedia` (3 breakpoints)

### 3. Hero
- **SplitText** – splits heading into chars, description into lines
- **useAnimation** – matchMedia for breakpoints
- **Background** – `useResponsive` (matchMedia + resize listener)
- **Video** – dynamic import, but loads as soon as `isDesktop || isMobile` (immediate on mount)
- **UnicornScene** – dynamic, desktop only (WebGL/Three.js)

### 4. Other
- **react-datocms** `VideoPlayer` – uses Mux under the hood
- **styled-components** – runtime CSS-in-JS
- **4 font files** – preloaded
- **Cursor** – dynamic, ssr: false (good)

---

## Chunk Sizes (from build)

| Chunk | Size | Likely contents |
|-------|------|-----------------|
| 799 | 512KB | Vendor/shared |
| a4634e51 | 500KB | Vendor/shared |
| 4bd1b696 | 196KB | React/Next |
| framework | 188KB | React |
| 794 | 184KB | Next.js routing |
| main | 132KB | App bootstrap |
| polyfills | 112KB | Browser polyfills |
| 42 | 80KB | Fonts, SVG utils |
| c15bf2b0 | 52KB | Styled-components |

First-load JS is well over 1MB before gzip.

---

## Main Thread Blockers

1. **Parse/compile** – large JS payload
2. **Loader pulse** – GSAP timeline with `repeat: -1` until page load
3. **useAnimation** – matchMedia setup for every animation
4. **SplitText** – DOM splitting and GSAP-driven animation
5. **Hydration** – React tree for Loader + Hero + Header

---

## Recommended Experiments (in order)

### A. Move AnimationPlugins out of Client
- Loader does not need ScrollTrigger, CustomEase, or SplitText
- Import only core GSAP in Client; register plugins where they’re used (e.g. Hero)
- Or: lazy-load `AnimationPlugins` only when Hero mounts

### B. Replace SplitText with CSS
- Hero heading/description could use CSS `@keyframes` + `animation`
- Removes SplitText from the critical path

### C. Simplify or remove Loader
- Loader drives a lot of GSAP and matchMedia work
- Try: remove Loader temporarily and measure
- Or: replace with a CSS-only loader

### D. Defer Video/Unicorn until after load
- Poster is LCP; Video and UnicornScene can load after `load` or `requestIdleCallback`
- Background already waits for `useResponsive`; add an extra delay before loading Video/Unicorn

### E. Profile with Chrome DevTools
- Performance tab → record load → inspect long tasks
- Identify which scripts or components cause the longest blocks
