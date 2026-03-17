# Performance Regression Analysis: 6666f09 → HEAD

Commit **6666f09** achieved a **100** Netlify Lighthouse score. Differences in **current files only** (no deleted files, no new components).

---

## Differences in Current Files

### app/layout.tsx
- Added `import '@mux/mux-player/themes/minimal'`

### app/Client.tsx
- Removed Loader (moved to template)
- Cursor now dynamic import

### app/(home)/template.tsx
- Loader + children (removed document.fonts.ready)

### app/(home)/layout.tsx
- Added preload, preconnect, poster metadata

### app/Server.tsx
- Added `contact` to destructure, `contactTitle` to Header

### src/components/Contexts/index.tsx
- Removed `lenisRef`
- Added `areModalsReady`, `setAreModalsReady`

### src/components/Contexts/Performance.tsx
- Formatting only

### src/css/global.css
- Added media queries (max-width 379px, 1024–1399px, 1800px) for `font-size`
- Lenis rules expanded (lenis-autoToggle, lenis-prevent, iframe pointer-events)
- `.disable-hover`: `pointer-events: none !important` → `pointer-events: none`
- View transition `!important` removed

### src/components/NestedLenis/index.tsx
- RAF now starts/stops with `isOpen` (was always running)
- Scroll reset on open
- Added `allowNestedScroll: true`

### src/components/Modal/index.tsx
- `isOpen` prop → `modalActive === title` (derived from context)
- Layout changed (Copyright, Clip, VerticalLine moved)

### src/components/Hero/index.tsx
- SplitText `aria: 'none'` added

### src/components/Loader/index.tsx
- Added `areModalsReady` gate; removed `isFontsLoaded`

### src/components/AnimationPlugins/index.tsx
- ScrambleTextPlugin → SplitText

### next.config.js
- Added `output: 'standalone'`, cache headers, `inlineCss: true`, datocms remotePatterns

---

## Items to Try

1. **Simplify Loader** – Pulse on `pageLoaded` only; outro on `isLoaderFinished`; add timeout fallback
2. **Remove areModalsReady from Loader**
3. **Revert global.css Lenis rules**
4. **Revert .disable-hover** to `!important`
5. **Revert AnimationPlugins** – ScrambleTextPlugin → SplitText
