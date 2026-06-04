# Technical Assemblage — Web

Marketing site for Technical Assemblage LLC, a software consulting & development practice.

## Stack

- **Vite + React 19 + TypeScript** — SPA, no router (single-page scrolly site).
- **React Three Fiber + drei** — declarative three.js. WebGL canvas is pinned full-viewport behind content.
- **GSAP + ScrollTrigger** — scroll-driven timelines.
- **Lenis** — smooth scroll, bridged to ScrollTrigger via `src/hooks/useSmoothScroll.ts`.
- **CSS Modules** — per-component styles. Global tokens in `src/styles/globals.css`.

## Layout

- `src/App.tsx` — composes a fixed `<Scene>` layer behind a stacked `<main>` of sections.
- `src/scene/` — R3F canvas + meshes. `AbstractMesh.tsx` is the current placeholder; swap with shader/custom geometry.
- `src/sections/` — one component per scroll section (Hero, About, Services, Work, Contact). Shared layout in `Section.module.css`.
- `src/hooks/useSmoothScroll.ts` — wires Lenis to GSAP's ticker and ScrollTrigger.

## Dev

```
npm run dev      # vite dev server
npm run build    # tsc -b && vite build
npm run preview  # serve build
npm run lint     # eslint
```

Node ≥ 20.19 recommended (project may warn on older).

## Conventions

- Three.js code is client-only — no SSR concerns here, but keep DOM/window access guarded if that changes.
- Animations: declare timelines inside `useGSAP` / `useLayoutEffect` hooks scoped to the component that owns the target. Use `ScrollTrigger` markers during dev, strip before commit.
- Keep the canvas a single persistent `<Canvas>` — don't mount/unmount per section. Drive scene state from scroll progress.
- Reduced motion: respect `prefers-reduced-motion` when adding animations (TODO: utility hook).

## Not yet decided

- Hosting target (Vercel / Cloudflare Pages / other).
- CMS for case studies (likely MDX-in-repo to start).
- Analytics, contact form backend.
