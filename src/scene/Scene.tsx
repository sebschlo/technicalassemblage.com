import { Canvas } from '@react-three/fiber';
import { BezierField } from './BezierField';

export function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <color attach="background" args={['#0a0a0a']} />
      <BezierField />
    </Canvas>
  );
}
