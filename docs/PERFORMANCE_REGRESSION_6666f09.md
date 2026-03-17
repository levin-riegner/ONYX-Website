# Performance Regression Analysis: 6666f09 → HEAD

Commit **6666f09** achieved a **100** Netlify Lighthouse score. This document compares it to the current state to identify likely causes of the performance regression.

---

## Summary: Key Differences

| Area | 6666f09 (100 score) | Current (poor score) |
|------|---------------------|------------------------|
| **Hero video** | Native `<video>` + local file `/stone-desktop.mp4` | Mux `VideoPlayer` + `@mux/mux-player-react` |
| **mux-player theme** | Not used | `import '@mux/mux-player/themes/minimal'` in root layout |
| **Page content** | Hero + Activation only | Hero + Activation + DataSupply + (About, Contact, Legal) |
| **Loader** | Simple: `pageLoaded` only | Complex: `pageLoaded` + `isFontsLoaded` + `allModalsReady` |
| **Contexts** | Minimal state | `areModalsReady`, `isFontsLoaded`, `useScrollPerformance` |
| **Data query** | ~37 lines | ~297 lines (EVERYTHING) |
| **AnimationPlugins** | ScrambleTextPlugin | SplitText |

---

## High-Impact Regressions

### 1. **Mux / mux-player (largest impact)**

**6666f09:** Native `<video>` with local MP4. No Mux, no `react-datocms` VideoPlayer.

**Current:**
- `@mux/mux-player-react` added to dependencies
- `import '@mux/mux-player/themes/minimal'` in `app/layout.tsx` (root layout)
- `VideoPlayer` from `react-datocms` in Hero Background

**Impact:** Mux adds a large JS bundle (mux-player, media-chrome, playback-core). The theme import in the root layout pulls it into the main bundle and blocks initial load.

**Recommendations:**
- Move the mux-player theme import into the Video component (dynamic import or lazy load)
- Or use native `<video>` for the hero and reserve Mux for non-critical video
- Consider `next/dynamic` for the Video component with `ssr: false` (already done, but theme is still in layout)

---

### 2. **Root layout: mux-player theme**

```ts
// app/layout.tsx (current)
import '@mux/mux-player/themes/minimal';
```

This runs on every page load and increases main-bundle size and parse time.

**Recommendation:** Import the theme only where the video is used (e.g. inside the Video component or a dynamic import).

---

### 3. **Page size and data**

**6666f09:** Hero + Activation only. Small query.

**Current:** Hero + Activation + DataSupply + (About, Contact, Legal commented). Query grew from ~37 to ~297 lines. More components, more DOM, more JS.

**Impact:** More HTML, more React components, more work for the main thread.

**Recommendations:**
- Keep dynamic imports for sections (already in place)
- Consider route-based code splitting or loading below-the-fold content after LCP
- Ensure PageBuilder sections are lazy-loaded where possible

---

### 4. **Loader complexity**

**6666f09:**
- Pulse stops when `pageLoaded`
- Outro runs when `isLoaderFinished`
- No `isFontsLoaded`, no `areModalsReady`

**Current:**
- Pulse stops when `pageLoaded && isFontsLoaded && allModalsReady`
- Outro runs when `isLoaderFinished && allModalsReady && isFontsLoaded`
- `document.fonts.ready` in template

**Impact:** Loader stays visible longer and blocks interaction until fonts and modals are ready. `document.fonts.ready` can be slow.

**Recommendations:**
- Reintroduce a timeout fallback for the loader so it does not block indefinitely
- Consider not gating the loader on `document.fonts.ready` if fonts are not critical for LCP

---

### 5. **Contexts and scroll performance**

**Current additions:**
- `areModalsReady` (6 booleans)
- `isFontsLoaded`
- `useScrollPerformance()` (disables hover during scroll)

**Impact:** Extra state and effects on every render. Likely minor compared to Mux, but adds overhead.

---

### 6. **AnimationPlugins: ScrambleTextPlugin → SplitText**

**6666f09:** ScrambleTextPlugin  
**Current:** SplitText

Both are GSAP plugins. SplitText is typically heavier (DOM splitting). If ScrambleTextPlugin is unused, removing it helps; if SplitText is required, the trade-off is acceptable.

---

## Medium-Impact Changes

- **UnicornScene:** Dynamic import added (good). FPS reduced 120 → 60 (good).
- **Cursor:** Dynamic import added (good).
- **next.config:** `output: 'standalone'`, `inlineCss: true`, cache headers (generally positive).
- **Preload/preconnect:** Added for LCP (positive).

---

## Recommended Fix Order

1. **Move or defer mux-player theme** – Remove from root layout; load only with the Video component.
2. **Re-evaluate Mux for hero** – Consider native `<video>` for the hero background to avoid Mux on the critical path.
3. **Loader timeout** – Add a fallback so the loader does not block indefinitely when fonts or modals are slow.
4. **Reduce initial payload** – Ensure DataSupply and other heavy sections are not blocking LCP.

---

## Quick Win: Defer mux-player theme

```ts
// app/layout.tsx - REMOVE:
import '@mux/mux-player/themes/minimal';

// src/components/Hero/Background/Video/index.tsx - ADD at top:
import '@mux/mux-player/themes/minimal';
```

This keeps the theme but loads it only when the Video component is used, instead of on every page load.

**Caveat:** A previous attempt to move the theme caused "media-controller failed to upgrade" — the theme may need to load before the Video component mounts. If moving it breaks the player, consider using native `<video>` for the hero instead of Mux.
