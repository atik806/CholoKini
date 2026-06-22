"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

interface ShapeConfig {
  type: "icosahedron" | "torus" | "octahedron" | "dodecahedron";
  position: [number, number, number];
  scale: number;
  color: string;
  speed: number;
  distort: number;
}

const SHAPES: ShapeConfig[] = [
  { type: "icosahedron", position: [3.5, 1.8, -2.0], scale: 0.5, color: "#0f766e", speed: 0.5, distort: 0.2 },
  { type: "torus", position: [4.5, -1.0, -2.5], scale: 0.35, color: "#14b8a6", speed: 0.7, distort: 0.3 },
  { type: "dodecahedron", position: [2.0, -1.8, -3.0], scale: 0.3, color: "#10b981", speed: 0.4, distort: 0.25 },
];

function Shape({ config }: { config: ShapeConfig }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * config.speed * 0.3;
      meshRef.current.rotation.y += delta * config.speed * 0.5;
    }
  });

  return (
    <Float speed={config.speed} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={config.position} scale={config.scale}>
        {config.type === "icosahedron" && <icosahedronGeometry args={[1, 0]} />}
        {config.type === "torus" && <torusGeometry args={[1, 0.4, 16, 32]} />}
        {config.type === "octahedron" && <octahedronGeometry args={[1, 0]} />}
        {config.type === "dodecahedron" && <dodecahedronGeometry args={[1, 0]} />}
        <MeshDistortMaterial
          color={config.color}
          distort={config.distort}
          speed={config.speed * 0.5}
          transparent
          opacity={0.08}
          wireframe
        />
      </mesh>
    </Float>
  );
}

export function FloatingShapes({ count = SHAPES.length }: { count?: number }) {
  const shapes = useMemo(() => SHAPES.slice(0, count), [count]);

  return (
    <group>
      {shapes.map((config, i) => (
        <Shape key={i} config={config} />
      ))}
    </group>
  );
}
