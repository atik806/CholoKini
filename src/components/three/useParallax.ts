import { useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Module-level shared state — updated each frame, read by any component
const mouseTarget = new THREE.Vector2();
const mouseCurrent = new THREE.Vector2();
const scrollTarget = { value: 0 };
const scrollCurrent = { value: 0 };

const DAMP = 0.06;

// Read inside useFrame() for reactive per-frame values
export function getParallax(depth = 1) {
  const x = (mouseCurrent.x - (1 - depth)) * depth * 0.3;
  const y = (mouseCurrent.y - (1 - depth)) * depth * 0.3;
  return { x, y, scrollY: scrollCurrent.value };
}

// Hook version — returns stable values updated every render (use in JSX)
export function useParallax(depth = 1) {
  return getParallax(depth);
}

// Hook that sets up window listeners and drives the damping loop
export function useParallaxUpdater() {
  const onPointerMove = useCallback((e: MouseEvent) => {
    mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouseTarget.y = -(e.clientY / window.innerHeight) * 2 + 1;
  }, []);

  const onScroll = useCallback(() => {
    scrollTarget.value = window.scrollY;
  }, []);

  useFrame(() => {
    mouseCurrent.lerp(mouseTarget, DAMP);
    scrollCurrent.value += (scrollTarget.value - scrollCurrent.value) * DAMP;
  });

  const attach = useCallback(() => {
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("scroll", onScroll, { passive: true });
  }, [onPointerMove, onScroll]);

  const detach = useCallback(() => {
    window.removeEventListener("mousemove", onPointerMove);
    window.removeEventListener("scroll", onScroll);
  }, [onPointerMove, onScroll]);

  return { attach, detach };
}
