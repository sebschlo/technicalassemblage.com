// Lightweight module-level store for normalized scroll progress (0..1)
// and instantaneous scroll velocity. Written by the Lenis hook, read
// inside the R3F frame loop without triggering React re-renders.

export const scrollState = {
  progress: 0,
  velocity: 0,
};
