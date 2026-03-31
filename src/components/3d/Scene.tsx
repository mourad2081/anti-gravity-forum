"use client";

import { Canvas } from "@react-three/fiber";
import { GravityField } from "./GravityField";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";

export default function Scene() {
  return (
    <div className="fixed inset-0 z-[-1] bg-black">
      <Canvas dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <GravityField />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}
