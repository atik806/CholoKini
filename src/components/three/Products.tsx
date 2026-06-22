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
  /* Product identifier — swap placeholder by changing this component's internals */
  productId?: string;
  /* For future use: path to .png cutout or .glb model */
  src?: string;
  /* How to render — currently only "placeholder", tomorrow also "image" | "model" */
  variant?: "placeholder" | "image" | "model";
  /* Placeholder shape variant */
  shape?: ProductShape;
  /* Scene position — optional; inherits from parent group if omitted */
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
      {/* Body */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.25, 0.3, 0.6, 16]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.6}
          clearcoat={0.4}
        />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 0.15, 16]} />
        <meshPhysicalMaterial color={color} transparent opacity={opacity} roughness={0.4} metalness={0.3} />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.78, 0]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={opacity * 0.9} roughness={0.2} metalness={0.8} />
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
          roughness={0.2}
          metalness={0.7}
          clearcoat={0.3}
        />
      </mesh>
      {/* Ribbon/strap accent */}
      <mesh position={[0.31, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.05, 0.65, 0.05]} />
        <meshPhysicalMaterial color="#ffffff" transparent opacity={opacity * 0.6} roughness={0.5} metalness={0.1} />
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
      {/* Handles */}
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
      {/* Body */}
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.35, 0.3, 0.4, 20]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.1}
          metalness={0.3}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      {/* Lid */}
      <mesh position={[0, 0.45, 0]}>
        <cylinderGeometry args={[0.32, 0.32, 0.08, 20]} />
        <meshPhysicalMaterial color="#d4d4d4" transparent opacity={opacity * 0.8} roughness={0.3} metalness={0.7} />
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
  position: basePos = [1.8, 0, 0.5],
  color = "#0f766e",
}: CenterpieceProductProps) {
  const groupRef = useRef<THREE.Group>(null);
  const baseRef = useRef(basePos);

  useFrame((_, delta) => {
    if (groupRef.current) {
      const { x, y } = getParallax(1.8);
      groupRef.current.position.x = baseRef.current[0] + x * 0.5;
      groupRef.current.position.y = baseRef.current[1] + y * 0.5;
      groupRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group>
      {/* Contact shadow beneath the centerpiece */}
      <ContactShadows
        position={[basePos[0], -0.5, basePos[2] ?? 0]}
        scale={4}
        blur={2}
        opacity={0.3}
        far={2}
      />

      {/* PLACEHOLDER_PRODUCT_1 — centerpiece hero product
          To swap: replace <ProductItem> with a real <Image> plane or <GLTF> model */}
      <group
        ref={groupRef}
        position={basePos}
        rotation={[0.05, 0, 0]}
      >
        <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.2}>
          <ProductItem
            productId="centerpiece"
            shape="box"
            color={color}
            opacity={0.95}
            scale={1}
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
      const { x, y } = getParallax(1.2);
      // Independent bob — each product has different phase/speed
      const bob = Math.sin(Date.now() * 0.001 * bobSpeed + phase) * 0.12;
      groupRef.current.position.x = baseRef.current[0] + x * 0.3;
      groupRef.current.position.y = baseRef.current[1] + y * 0.3 + bob;
      groupRef.current.position.z = baseRef.current[2] + y * 0.1;

      // Gentle auto-rotation on a tilted axis
      groupRef.current.rotation.x += delta * 0.08;
      groupRef.current.rotation.z += delta * 0.04;
    }
  });

  return (
    /* PLACEHOLDER_PRODUCT_{2|3|4} — small floating product
       To swap: replace <ProductItem> with a real asset component */
    <group ref={groupRef} scale={0.55}>
      <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.15}>
        <ProductItem
          productId={productId}
          shape={shape}
          color={color}
          opacity={0.7}
          scale={1}
        />
      </Float>
    </group>
  );
}
