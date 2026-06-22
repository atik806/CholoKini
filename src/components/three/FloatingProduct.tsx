"use client";

import { useRef, useState, useEffect } from "react";
import { useFrame, type RootState } from "@react-three/fiber";
import * as THREE from "three";
import { getParallax } from "./useParallax";

interface FloatingProductProps {
  children: React.ReactNode;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  phase?: number;
  bobSpeed?: number;
  parallaxDepth?: number;
  scrollFadeStart?: number;
  scrollSpreadFactor?: number;
}

function usePrefersReducedMotion(): boolean {
  const [prefers, setPrefers] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  });

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefers(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return prefers;
}

export function FloatingProduct({
  children,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  phase = 0,
  bobSpeed = 0.5,
  parallaxDepth = 1,
  scrollFadeStart = 1.5,
  scrollSpreadFactor = 1,
}: FloatingProductProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wobbleRef = useRef<THREE.Group>(null);
  const baseRef = useRef(position);
  const initScale = useRef(scale);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useFrame((state: RootState) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    const group = groupRef.current;
    const p = getParallax(parallaxDepth);

    group.position.x = baseRef.current[0] + p.x * parallaxDepth * 0.12;
    group.position.y = baseRef.current[1] + p.y * parallaxDepth * 0.12;
    group.position.z = baseRef.current[2] + p.scrollY * 0.004;

    if (!prefersReducedMotion) {
      const bob = Math.sin(t * bobSpeed + phase) * 0.04 * scale;
      group.position.y += bob;

      if (wobbleRef.current) {
        wobbleRef.current.rotation.x += Math.sin(t * 0.5 + phase) * 0.0006;
        wobbleRef.current.rotation.z += Math.cos(t * 0.4 + phase) * 0.0006;
      }
    }

    if (p.scrollY > scrollFadeStart) {
      const progress = Math.min((p.scrollY - scrollFadeStart) / 3, 1);
      const spread = progress * scrollSpreadFactor;
      const dirX = baseRef.current[0] > 0 ? 1 : -1;
      group.position.x += dirX * spread;
      group.position.y -= spread * 0.4;
      group.scale.setScalar(initScale.current * (1 - progress * 0.3));
      return;
    }

    const targetScale = hovered ? initScale.current * 1.05 : initScale.current;
    const cur = group.scale.x;
    const lerp = cur + (targetScale - cur) * (hovered ? 0.08 : 0.04);
    group.scale.set(lerp, lerp, lerp);
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <group
        ref={wobbleRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {children}
      </group>
    </group>
  );
}
