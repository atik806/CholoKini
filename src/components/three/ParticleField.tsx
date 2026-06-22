"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface ParticleFieldProps {
  count?: number;
  color?: string;
  size?: number;
  opacity?: number;
}

function createParticleSystem(count: number) {
  const pos = new Float32Array(count * 3);
  const vel = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    pos[i3] = (Math.random() - 0.5) * 20;
    pos[i3 + 1] = (Math.random() - 0.5) * 20;
    pos[i3 + 2] = (Math.random() - 0.5) * 10 - 5;
    vel[i3] = (Math.random() - 0.5) * 0.005;
    vel[i3 + 1] = (Math.random() - 0.5) * 0.005;
    vel[i3 + 2] = (Math.random() - 0.5) * 0.005;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  return { geometry: geo, velocities: vel };
}

const PARTICLE_SYSTEM = createParticleSystem(300);

export function ParticleField({
  count = 300,
  color = "#0f766e",
  size = 0.015,
  opacity = 0.2,
}: ParticleFieldProps) {
  const pointsRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (pointsRef.current) {
      const pos = PARTICLE_SYSTEM.geometry.attributes.position.array as Float32Array;
      const vel = PARTICLE_SYSTEM.velocities;
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        pos[i3] += vel[i3];
        pos[i3 + 1] += vel[i3 + 1];
        pos[i3 + 2] += vel[i3 + 2];
        if (Math.abs(pos[i3]) > 10) vel[i3] *= -1;
        if (Math.abs(pos[i3 + 1]) > 10) vel[i3 + 1] *= -1;
        if (Math.abs(pos[i3 + 2]) > 5) vel[i3 + 2] *= -1;
      }
      PARTICLE_SYSTEM.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef} geometry={PARTICLE_SYSTEM.geometry}>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
