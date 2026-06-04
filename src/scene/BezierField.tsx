import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { scrollState } from './scrollStore';

const CURVE_COUNT = 10;
const SAMPLES = 220; // points sampled along each line
// scroll range over which the glyph unravels into the field
const UNRAVEL_START = 0.0;
const UNRAVEL_END = 0.34;

type LineSpec = {
  // --- assembled "glyph" form (a nested rosette squiggle) ---
  shape: Float32Array;
  // --- unraveled "field" form (flowing cubic bezier) ---
  p0: THREE.Vector3;
  p1: THREE.Vector3;
  p2: THREE.Vector3;
  p3: THREE.Vector3;
  phase: number;
  speed: number;
  amp: number;
};

function buildSpecs(): LineSpec[] {
  const specs: LineSpec[] = [];
  const TAU = Math.PI * 2;

  for (let i = 0; i < CURVE_COUNT; i++) {
    const t = i / (CURVE_COUNT - 1); // 0..1

    // assembled shape: each line is a rose/spirograph loop, nested by index,
    // phase-rotated so together they read as one symmetric squiggle mark.
    const shape = new Float32Array(SAMPLES * 3);
    const loops = 1; // one full revolution
    const petals = 3 + (i % 4); // varying lobe count -> intricate mark
    const baseR = THREE.MathUtils.lerp(0.55, 1.7, t);
    const wobbleR = 0.28 + t * 0.35;
    const rot = (i / CURVE_COUNT) * TAU;
    for (let j = 0; j < SAMPLES; j++) {
      const u = j / (SAMPLES - 1);
      const a = u * TAU * loops + rot;
      const r = baseR + Math.sin(a * petals + rot) * wobbleR;
      shape[j * 3] = Math.cos(a) * r;
      shape[j * 3 + 1] = Math.sin(a) * r;
      shape[j * 3 + 2] = Math.sin(u * TAU + rot) * 0.35;
    }

    // unraveled field: horizontal flowing bezier across the viewport
    const y = THREE.MathUtils.lerp(-2.2, 2.2, t);
    const spread = 3.6;
    specs.push({
      shape,
      p0: new THREE.Vector3(-spread, y + (Math.random() - 0.5), (Math.random() - 0.5) * 1.5),
      p1: new THREE.Vector3(-spread * 0.33, y + (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2),
      p2: new THREE.Vector3(spread * 0.33, y + (Math.random() - 0.5) * 2, (Math.random() - 0.5) * 2),
      p3: new THREE.Vector3(spread, y + (Math.random() - 0.5), (Math.random() - 0.5) * 1.5),
      phase: Math.random() * TAU,
      speed: 0.15 + Math.random() * 0.25,
      amp: 0.5 + Math.random() * 0.9,
    });
  }
  return specs;
}

export function BezierField() {
  const groupRef = useRef<THREE.Group>(null);
  const specs = useMemo(buildSpecs, []);

  const curve = useMemo(
    () =>
      new THREE.CubicBezierCurve3(
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ),
    [],
  );

  // build one THREE.Line per spec imperatively (avoids <line> JSX/SVG typing clash)
  const lines = useMemo(
    () =>
      specs.map((_, i) => {
        const geom = new THREE.BufferGeometry();
        geom.setAttribute(
          'position',
          new THREE.BufferAttribute(new Float32Array(SAMPLES * 3), 3),
        );
        const mat = new THREE.LineBasicMaterial({
          color: new THREE.Color('#c4ff3a'),
          transparent: true,
          opacity: 0.32 + (i / specs.length) * 0.25,
        });
        return new THREE.Line(geom, mat);
      }),
    [specs],
  );

  const smoothed = useRef({ progress: 0, velocity: 0 });
  const tmpField = useMemo(() => new THREE.Vector3(), []);

  useFrame((state, dt) => {
    const time = state.clock.elapsedTime;

    smoothed.current.progress = THREE.MathUtils.damp(
      smoothed.current.progress,
      scrollState.progress,
      4,
      dt,
    );
    smoothed.current.velocity = THREE.MathUtils.damp(
      smoothed.current.velocity,
      scrollState.velocity,
      6,
      dt,
    );
    const prog = smoothed.current.progress;
    const vel = smoothed.current.velocity;

    // morph factor: 0 = assembled glyph, 1 = fully unraveled field
    const m = THREE.MathUtils.smoothstep(prog, UNRAVEL_START, UNRAVEL_END);

    for (let i = 0; i < specs.length; i++) {
      const s = specs[i];
      const wobble = time * s.speed + s.phase;

      // animated field control points (idle drift + scroll push)
      curve.v0.copy(s.p0);
      curve.v3.copy(s.p3);
      curve.v1.set(
        s.p1.x,
        s.p1.y + Math.sin(wobble) * s.amp * (0.6 + prog * 1.2),
        s.p1.z + Math.cos(wobble * 0.7) * s.amp + vel * 0.05,
      );
      curve.v2.set(
        s.p2.x,
        s.p2.y + Math.cos(wobble * 1.1) * s.amp * (0.6 + (1 - prog) * 1.2),
        s.p2.z + Math.sin(wobble * 0.9) * s.amp - vel * 0.05,
      );

      const pos = lines[i].geometry.attributes.position as THREE.BufferAttribute;
      const arr = pos.array as Float32Array;
      const shape = s.shape;

      // subtle breathing on the assembled glyph so it's alive when still
      const breathe = 1 + Math.sin(time * 0.6 + s.phase) * 0.015 * (1 - m);

      for (let j = 0; j < SAMPLES; j++) {
        const u = j / (SAMPLES - 1);
        curve.getPoint(u, tmpField);

        const sx = shape[j * 3] * breathe;
        const sy = shape[j * 3 + 1] * breathe;
        const sz = shape[j * 3 + 2];

        // unravel later along the strand first -> a "loosening" feel
        const local = THREE.MathUtils.clamp(m * 1.25 - u * 0.25, 0, 1);

        arr[j * 3] = sx + (tmpField.x - sx) * local;
        arr[j * 3 + 1] = sy + (tmpField.y - sy) * local;
        arr[j * 3 + 2] = sz + (tmpField.z - sz) * local;
      }
      pos.needsUpdate = true;
      lines[i].geometry.computeBoundingSphere();
    }

    if (groupRef.current) {
      // assembled glyph slowly spins; once unraveled, gentle scroll parallax
      const spin = (1 - m) * time * 0.08;
      groupRef.current.rotation.z = spin + m * (prog * 0.3);
      groupRef.current.rotation.y = m * (prog - 0.5) * 0.5;
      groupRef.current.position.y = m * prog * 1.2;
    }
  });

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}
