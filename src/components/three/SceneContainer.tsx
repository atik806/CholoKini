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
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />
          {children}
          <AdaptiveDpr />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
}
