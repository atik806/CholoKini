"use client";

import { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, MeshTransmissionMaterial } from "@react-three/drei";
import * as THREE from "three";
import { useParallax, useParallaxUpdater } from "./useParallax";
import { CenterpieceProduct, SmallFloatingProduct } from "./Products";

// ---------------------------------------------------------------------------
// Background particles (back-most layer)
// ---------------------------------------------------------------------------
function generatePositions(count: number, range: number) {
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    pos[i3] = (Math.random() - 0.5) * range;
    pos[i3 + 1] = (Math.random() - 0.5) * range;
    pos[i3 + 2] = (Math.random() - 0.5) * range * 0.5;
  }
  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  return geo;
}

const PARTICLE_GEOMETRY = generatePositions(200, 12);

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const { scrollY } = useParallax(0.3);

  useFrame((_, delta) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += delta * 0.02;
      particlesRef.current.rotation.x += scrollY * 0.0001;
    }
  });

  return (
    <points ref={particlesRef} geometry={PARTICLE_GEOMETRY}>
      <pointsMaterial
        size={0.02}
        color="#0f766e"
        transparent
        opacity={0.3}
        sizeAttenuation
      />
    </points>
  );
}

// ---------------------------------------------------------------------------
// Abstract geometric shapes (back layer — behind products)
// ---------------------------------------------------------------------------
const ICOSAHEDRON_POSITIONS: [number, number, number][] = [
  [2.5, 0.8, 0],
  [-2.2, -0.5, 0.5],
  [0, 1.5, -1],
  [1.8, -1.2, 0.8],
  [-1.5, 1, -0.5],
];

const COLORS = ["#0f766e", "#14b8a6", "#f59e0b", "#0d9488", "#10b981"];

function FloatingIcosahedron({
  position,
  color,
  index,
}: {
  position: [number, number, number];
  color: string;
  index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const { x, y, scrollY } = useParallax(0.6);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2 * (index % 2 === 0 ? 1 : -1);
      meshRef.current.rotation.y += delta * 0.3 * (index % 2 === 0 ? -1 : 1);
    }
    if (groupRef.current) {
      groupRef.current.position.x = position[0] + x * 0.15;
      groupRef.current.position.y = position[1] + y * 0.15 + scrollY * 0.002;
      groupRef.current.position.z = position[2] + scrollY * 0.003;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Float speed={1.5 + index * 0.3} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.5 + index * 0.08, 0]} />
          <MeshTransmissionMaterial
            color={color}
            transparent
            opacity={0.6}
            roughness={0.1}
            metalness={0.9}
            thickness={0.5}
            ior={1.5}
            chromaticAberration={0.1}
            backside
          />
        </mesh>
        <mesh scale={[1.15, 1.15, 1.15]}>
          <icosahedronGeometry args={[0.5 + index * 0.08, 0]} />
          <meshBasicMaterial color={color} transparent opacity={0.08} wireframe />
        </mesh>
      </Float>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Orbital rings (decoration, still behind products)
// ---------------------------------------------------------------------------
function CenterRing() {
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -0.5]}>
      <ringGeometry args={[1.2, 1.5, 64]} />
      <meshBasicMaterial color="#0f766e" transparent opacity={0.08} side={THREE.DoubleSide} />
    </mesh>
  );
}

function OrbitingRing({ radius, speed, color }: { radius: number; speed: number; color: string }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
    }
  });

  const dots = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 24; i++) {
      const angle = (i / 24) * Math.PI * 2;
      arr.push({
        x: Math.cos(angle) * radius,
        z: Math.sin(angle) * radius,
      });
    }
    return arr;
  }, [radius]);

  return (
    <group ref={groupRef}>
      {dots.map((dot, i) => (
        <mesh key={i} position={[dot.x, 0, dot.z]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshBasicMaterial color={color} transparent opacity={0.4} />
        </mesh>
      ))}
    </group>
  );
}

// ---------------------------------------------------------------------------
// Small floating products (middle layer)
// ---------------------------------------------------------------------------
const smallProducts = [
  {
    // PLACEHOLDER_PRODUCT_2: bottle — right side, slightly behind centerpiece
    productId: "floating-bottle",
    shape: "bottle" as const,
    position: [3.2, -0.2, -0.5] as [number, number, number],
    color: "#14b8a6",
    phase: 0,
    bobSpeed: 0.5,
  },
  {
    // PLACEHOLDER_PRODUCT_3: bag — upper right
    productId: "floating-bag",
    shape: "bag" as const,
    position: [1.2, 1.5, -0.8] as [number, number, number],
    color: "#f59e0b",
    phase: Math.PI * 0.5,
    bobSpeed: 0.7,
  },
  {
    // PLACEHOLDER_PRODUCT_4: jar — lower right
    productId: "floating-jar",
    shape: "jar" as const,
    position: [2.8, -1.2, -0.3] as [number, number, number],
    color: "#0d9488",
    phase: Math.PI,
    bobSpeed: 0.4,
  },
];

// ---------------------------------------------------------------------------
// Hero3DShowcase — main export
// ---------------------------------------------------------------------------
export function Hero3DShowcase() {
  const { attach, detach } = useParallaxUpdater();

  useEffect(() => {
    attach();
    return () => detach();
  }, [attach, detach]);

  return (
    <group>
      {/* === LAYER 1: Background (back-most) === */}
      <Particles />
      <CenterRing />
      <OrbitingRing radius={1.8} speed={0.2} color="#0f766e" />
      <OrbitingRing radius={2.2} speed={-0.15} color="#f59e0b" />

      {/* === LAYER 2: Abstract geometric shapes === */}
      {ICOSAHEDRON_POSITIONS.map((pos, i) => (
        <FloatingIcosahedron key={i} position={pos} color={COLORS[i]} index={i} />
      ))}

      {/* === LAYER 3: Small floating products (middle layer) === */}
      {smallProducts.map((p) => (
        <SmallFloatingProduct
          key={p.productId}
          productId={p.productId}
          shape={p.shape}
          position={p.position}
          color={p.color}
          phase={p.phase}
          bobSpeed={p.bobSpeed}
        />
      ))}

      {/* === LAYER 4: Centerpiece product (front-most == strongest parallax) === */}
      <CenterpieceProduct position={[1.8, 0, 0.5]} color="#0f766e" />
    </group>
  );
}
