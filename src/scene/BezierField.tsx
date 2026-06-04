import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from './scrollStore';

// One continuous line. In its unraveled "field" form it is a single smooth
// serpentine: a cosine sweep (rounded turnarounds, zero-slope, pushed off the
// viewport edges) over a gently descending y, so it reads as several flowing
// near-horizontal lines while remaining C1-smooth end to end. No discrete
// strands and no hard connectors, so the morph never produces jagged segments.
const ROWS = 8; // horizontal passes across the viewport
const SAMPLES_PER_ROW = 200;
const N = ROWS * SAMPLES_PER_ROW; // total points on the one line

// scroll range over which the glyph unravels into the field
const UNRAVEL_START = 0.02;
const UNRAVEL_END = 0.62;

// smoother than smoothstep (zero 1st & 2nd derivative at the ends)
function smootherstep(x: number): number {
  const t = THREE.MathUtils.clamp(x, 0, 1);
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function buildShape(): Float32Array {
  // assembled form: one continuous rose/spirograph squiggle through all N points
  const shape = new Float32Array(N * 3);
  const TAU = Math.PI * 2;
  const loops = 5; // revolutions of the whole stroke
  const petals = 7; // lobes -> intricate symmetric mark
  for (let g = 0; g < N; g++) {
    const u = g / (N - 1); // 0..1 along the whole stroke
    const a = u * TAU * loops;
    const r = 1.15 + Math.sin(a * (petals / loops)) * 0.55 + Math.sin(a * 0.5) * 0.25;
    shape[g * 3] = Math.cos(a) * r;
    shape[g * 3 + 1] = Math.sin(a) * r;
    shape[g * 3 + 2] = Math.sin(u * TAU * 2) * 0.4;
  }
  return shape;
}

export function BezierField() {
  const groupRef = useRef<THREE.Group>(null);
  const shape = useMemo(buildShape, []);

  const line = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    geom.setAttribute('position', new THREE.BufferAttribute(new Float32Array(N * 3), 3));
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#c4ff3a'),
      transparent: true,
      opacity: 0.4,
    });
    return new THREE.Line(geom, mat);
  }, []);

  const smoothed = useRef({ progress: 0 });

  useFrame((state, dt) => {
    const time = state.clock.elapsedTime;

    smoothed.current.progress = THREE.MathUtils.damp(
      smoothed.current.progress,
      scrollState.progress,
      4,
      dt,
    );
    const prog = smoothed.current.progress;

    // morph: 0 = assembled glyph, 1 = fully unraveled field
    const m = THREE.MathUtils.smoothstep(prog, UNRAVEL_START, UNRAVEL_END);

    // half-width of the world at z=0, plus generous margin so the rounded
    // turnarounds sit well off-screen at any aspect ratio.
    const halfW = state.viewport.width / 2 + 2.6;
    const topY = 2.5;
    const botY = -2.5;

    const pos = line.geometry.attributes.position as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;

    for (let g = 0; g < N; g++) {
      const uGlobal = g / (N - 1);

      // --- unraveled field: smooth serpentine ---
      const s = uGlobal * ROWS; // 0..ROWS
      // cosine sweep => rounded, zero-slope turnarounds (no cusps, no corners)
      const fx = -Math.cos(Math.PI * s) * halfW;
      // gentle monotonic descent => near-horizontal lines, woven at the edges
      const yBase = THREE.MathUtils.lerp(topY, botY, uGlobal);
      // subtle traveling ripple for life (low amplitude, smooth)
      const ripple =
        Math.sin(uGlobal * Math.PI * 5 + time * 0.25) * 0.16 +
        Math.sin(uGlobal * Math.PI * 11 + time * 0.13) * 0.08;
      const fy = yBase + ripple;
      const fz = Math.sin(Math.PI * s) * 0.35;

      // --- assembled glyph (breathes gently when still) ---
      const breathe = 1 + Math.sin(time * 0.6 + uGlobal * 6.0) * 0.02 * (1 - m);
      const sx = shape[g * 3] * breathe;
      const sy = shape[g * 3 + 1] * breathe;
      const sz = shape[g * 3 + 2];

      // unravel slightly staggered along the stroke, eased so there is no
      // hard front sweeping through the line.
      const local = smootherstep(m * 1.18 - uGlobal * 0.18);

      arr[g * 3] = sx + (fx - sx) * local;
      arr[g * 3 + 1] = sy + (fy - sy) * local;
      arr[g * 3 + 2] = sz + (fz - sz) * local;
    }

    pos.needsUpdate = true;
    line.geometry.computeBoundingSphere();

    if (groupRef.current) {
      // gentle bounded rock while assembled, fading out as it unravels —
      // no accumulating spin, so fast scrolling can't whip it around.
      groupRef.current.rotation.z = (1 - m) * Math.sin(time * 0.12) * 0.1;
      groupRef.current.position.y = m * prog * 1.0;
    }
  });

  return (
    <group ref={groupRef}>
      <primitive object={line} />
    </group>
  );
}
