"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";

interface SceneContainerProps {
  children: React.ReactNode;
  className?: string;
  cameraPosition?: [number, number, number];
  cameraFov?: number;
  responsive?: boolean;
}

export function SceneContainer({
  children,
  className = "",
  cameraPosition = [0, 0, 6],
  cameraFov = 45,
}: SceneContainerProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: cameraPosition, fov: cameraFov }}
        dpr={[0.75, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.4} />

          {/* Key light — warm, from upper-right */}
          <directionalLight position={[5, 5, 5]} intensity={1} />

          {/* Rim light — cool teal from behind-right, catches edges */}
          <directionalLight position={[-3, 1, -4]} intensity={0.8} color="#5eead4" />

          {/* Fill light — subtle warm glow from below */}
          <directionalLight position={[0, -5, 3]} intensity={0.25} color="#0d9488" />

          {/* Accent point light near centerpiece */}
          <pointLight position={[2.5, 0.5, 2]} intensity={0.4} color="#14b8a6" />

          {children}
          <AdaptiveDpr />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
}
