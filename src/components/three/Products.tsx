"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { ContactShadows, Float } from "@react-three/drei";
import * as THREE from "three";
import { getParallax } from "./useParallax";

// ---------------------------------------------------------------------------
// PLACEHOLDER_PRODUCT_1: "Bottle" — CylinderGeometry with a neck
// PLACEHOLDER_PRODUCT_2: "Box" — BoxGeometry (perfume-box style)
// PLACEHOLDER_PRODUCT_3: "Bag" — slightly tapered box
// PLACEHOLDER_PRODUCT_4: "Jar" — short wide cylinder
//
// To swap any placeholder for a real asset:
//   1. Change the <mesh> children in this component to your <Image>-as-texture
//      plane or <MeshReflectorMaterial> with loaded texture, OR
//   2. Replace the entire component with a <GLTF> / <useGLTF> model import
//   3. The <ProductItem /> wrapper accepts { src, variant } props ready for this
// ---------------------------------------------------------------------------

type ProductShape = "bottle" | "box" | "bag" | "jar";

interface ProductItemProps {
  productId?: string;
  src?: string;
  variant?: "placeholder" | "image" | "model";
  shape?: ProductShape;
  position?: [number, number, number];
  scale?: number;
  rotation?: [number, number, number];
  color?: string;
  opacity?: number;
  children?: React.ReactNode;
}

function BottlePlaceholder({ color, opacity }: { color: string; opacity: number }) {
  return (
    <group>
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.6, 16]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.4}
          metalness={0.3}
          clearcoat={0.2}
          envMapIntensity={0.5}
        />
      </mesh>
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.15, 16]} />
        <meshPhysicalMaterial color={color} transparent opacity={opacity} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.78, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={opacity * 0.7} roughness={0.3} metalness={0.4} />
      </mesh>
    </group>
  );
}

function BoxPlaceholder({ color, opacity }: { color: string; opacity: number }) {
  return (
    <group>
      <mesh>
        <boxGeometry args={[0.6, 0.4, 0.6]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.15}
          metalness={0.8}
          clearcoat={0.6}
          clearcoatRoughness={0.2}
          envMapIntensity={1.5}
          emissive={color}
          emissiveIntensity={0.08}
        />
      </mesh>
      <mesh position={[0.31, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.05, 0.65, 0.05]} />
        <meshPhysicalMaterial color="#e2e8f0" transparent opacity={opacity * 0.8} roughness={0.3} metalness={0.2} />
      </mesh>
    </group>
  );
}

function BagPlaceholder({ color, opacity }: { color: string; opacity: number }) {
  return (
    <group>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.5, 0.1, 0.35]} />
        <meshPhysicalMaterial color={color} transparent opacity={opacity} roughness={0.6} metalness={0.1} />
      </mesh>
      <mesh position={[0, 0.35, 0]} scale={[0.9, 1, 0.9]}>
        <cylinderGeometry args={[0.25, 0.28, 0.5, 12]} />
        <meshPhysicalMaterial color={color} transparent opacity={opacity} roughness={0.5} metalness={0.2} />
      </mesh>
      <mesh position={[0.15, 0.65, 0]} rotation={[0, 0, 0.3]}>
        <torusGeometry args={[0.08, 0.02, 8, 12, Math.PI]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={opacity * 0.5} roughness={0.3} metalness={0.5} />
      </mesh>
      <mesh position={[-0.15, 0.65, 0]} rotation={[0, 0, -0.3]}>
        <torusGeometry args={[0.08, 0.02, 8, 12, Math.PI]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={opacity * 0.5} roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
}

function JarPlaceholder({ color, opacity }: { color: string; opacity: number }) {
  return (
    <group>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.35, 0.3, 0.4, 20]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.2}
          clearcoat={0.3}
          clearcoatRoughness={0.3}
          envMapIntensity={0.6}
        />
      </mesh>
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.08, 20]} />
        <meshPhysicalMaterial color="#a1a1aa" transparent opacity={opacity * 0.6} roughness={0.4} metalness={0.3} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// ProductItem — the single import you'll change when swapping to real assets
// ---------------------------------------------------------------------------
export function ProductItem({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  productId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  src,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  variant = "placeholder",
  shape = "box",
  position,
  scale = 1,
  rotation,
  color = "#0f766e",
  opacity = 0.9,
  children,
}: ProductItemProps) {
  // ---- SWAP HERE ----
  // When you have real product images or GLB models, change this block:
  //
  //   if (variant === "image" && src) {
  //     return <ImageProduct src={src} position={position} scale={scale} />;
  //   }
  //   if (variant === "model" && src) {
  //     return <ModelProduct src={src} position={position} scale={scale} />;
  //   }
  // ---- END SWAP ----

  const content = children ?? (
    shape === "bottle" ? <BottlePlaceholder color={color} opacity={opacity} /> :
    shape === "bag"    ? <BagPlaceholder color={color} opacity={opacity} /> :
    shape === "jar"    ? <JarPlaceholder color={color} opacity={opacity} /> :
    /* default "box" */  <BoxPlaceholder color={color} opacity={opacity} />
  );

  const groupProps = {
    ...(position && { position }),
    ...(rotation && { rotation }),
    scale,
  };

  return (
    <group {...groupProps}>
      {content}
    </group>
  );
}

// ---------------------------------------------------------------------------
// CenterpieceProduct — large hero product, right-of-center, strong parallax
// ---------------------------------------------------------------------------
interface CenterpieceProductProps {
  position?: [number, number, number];
  color?: string;
}

export function CenterpieceProduct({
  position: basePos = [2.2, -0.1, 0.8],
  color = "#0f766e",
}: CenterpieceProductProps) {
  const groupRef = useRef<THREE.Group>(null);
  const baseRef = useRef(basePos);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const { x, y, scrollY } = getParallax(1.8);

      groupRef.current.position.x = baseRef.current[0] + x * 0.6;
      groupRef.current.position.y = baseRef.current[1] + y * 0.6;
      groupRef.current.position.z = baseRef.current[2] + scrollY * 0.008;

      groupRef.current.rotation.y += delta * 0.3;
      groupRef.current.position.y += Math.sin(Date.now() * 0.0006) * 0.003;
    }
  });

  return (
    <group>
      <ContactShadows
        position={[basePos[0], -0.6, basePos[2] ?? 0]}
        scale={5}
        blur={2}
        opacity={0.5}
        far={3}
      />

      <group
        ref={groupRef}
        position={basePos}
        rotation={[0.05, 0, 0]}
      >
        <Float speed={0.6} rotationIntensity={0.03} floatIntensity={0.15}>
          <ProductItem
            productId="centerpiece"
            shape="box"
            color={color}
            opacity={1}
            scale={1.5}
          />
        </Float>
      </group>
    </group>
  );
}

// ---------------------------------------------------------------------------
// SmallFloatingProduct — smaller products scattered around, independent bobbing
// ---------------------------------------------------------------------------
interface SmallFloatingProductProps {
  productId: string;
  shape: ProductShape;
  position: [number, number, number];
  color?: string;
  phase?: number;
  bobSpeed?: number;
}

export function SmallFloatingProduct({
  productId,
  shape,
  position: basePos,
  color = "#0f766e",
  phase = 0,
  bobSpeed = 0.6,
}: SmallFloatingProductProps) {
  const groupRef = useRef<THREE.Group>(null);
  const baseRef = useRef(basePos);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const { x, y, scrollY } = getParallax(1.2);

      // Medium parallax depth
      groupRef.current.position.x = baseRef.current[0] + x * 0.3;
      groupRef.current.position.y = baseRef.current[1] + y * 0.3;
      groupRef.current.position.z = baseRef.current[2] + y * 0.1 + scrollY * 0.005;

      // Independent bob — each product has different phase/speed
      const bob = Math.sin(Date.now() * 0.001 * bobSpeed + phase) * 0.15;
      groupRef.current.position.y += bob;

      // Gentle auto-rotation on a tilted axis
      groupRef.current.rotation.x += delta * 0.06 + Math.sin(Date.now() * 0.0005 + phase) * 0.002;
      groupRef.current.rotation.z += delta * 0.03 + Math.cos(Date.now() * 0.0004 + phase) * 0.002;
    }
  });

  return (
    /* PLACEHOLDER_PRODUCT_{2|3|4} — small floating product
       To swap: replace <ProductItem> with a real asset component */
    <group ref={groupRef} position={basePos} scale={0.5}>
      <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.12}>
        <ProductItem
          productId={productId}
          shape={shape}
          color={color}
          opacity={0.5}
          scale={1}
        />
      </Float>
    </group>
  );
}
