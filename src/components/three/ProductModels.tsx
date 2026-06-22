"use client";

interface ModelProps {
  color: string;
  opacity?: number;
}

// ---------------------------------------------------------------------------
// Tote Bag
// ---------------------------------------------------------------------------
export function BagModel({ color, opacity = 1 }: ModelProps) {
  const mat = (
    <meshPhysicalMaterial
      color={color}
      transparent
      opacity={opacity}
      roughness={0.25}
      metalness={0.35}
      clearcoat={0.4}
      clearcoatRoughness={0.2}
      envMapIntensity={1}
    />
  );

  return (
    <group>
      <mesh position={[0, 0.02, 0]} scale={[1, 0.85, 0.5]}>
        <boxGeometry args={[0.55, 0.45, 0.3]} />
        {mat}
      </mesh>

      <mesh position={[-0.12, 0.3, 0]} rotation={[0, 0, Math.PI * 0.5]}>
        <torusGeometry args={[0.1, 0.02, 8, 12, Math.PI * 0.85]} />
        <meshPhysicalMaterial color={color} transparent opacity={opacity} roughness={0.3} metalness={0.3} />
      </mesh>
      <mesh position={[0.12, 0.3, 0]} rotation={[0, 0, Math.PI * 0.5]}>
        <torusGeometry args={[0.1, 0.02, 8, 12, Math.PI * 0.85]} />
        <meshPhysicalMaterial color={color} transparent opacity={opacity} roughness={0.3} metalness={0.3} />
      </mesh>

      <mesh position={[0.28, 0.02, 0]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[0.02, 0.5, 0.01]} />
        <meshBasicMaterial color="white" transparent opacity={opacity * 0.15} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Sneakers
// ---------------------------------------------------------------------------
export function ShoeModel({ color, opacity = 1 }: ModelProps) {
  return (
    <group rotation={[0, 0.15, 0.05]} scale={[0.9, 0.9, 0.9]}>
      <mesh position={[0.03, -0.12, 0]}>
        <boxGeometry args={[0.6, 0.04, 0.24]} />
        <meshPhysicalMaterial
          color="#334155"
          transparent
          opacity={opacity}
          roughness={0.8}
          metalness={0}
        />
      </mesh>

      <mesh position={[0.03, 0.04, 0]}>
        <boxGeometry args={[0.4, 0.2, 0.22]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.35}
          metalness={0.15}
          clearcoat={0.3}
          envMapIntensity={0.8}
        />
      </mesh>

      <mesh position={[-0.18, -0.03, 0]} scale={[1, 0.6, 1]}>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.2}
          clearcoat={0.4}
        />
      </mesh>

      <mesh position={[0.28, -0.05, 0]} scale={[1, 0.5, 0.8]}>
        <sphereGeometry args={[0.08, 12, 12]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.2}
        />
      </mesh>

      <mesh position={[0, 0.12, 0.12]}>
        <boxGeometry args={[0.3, 0.06, 0.01]} />
        <meshBasicMaterial color="white" transparent opacity={opacity * 0.12} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Folded T-Shirt
// ---------------------------------------------------------------------------
export function ShirtModel({ color, opacity = 1 }: ModelProps) {
  const clothMat = (
    <meshPhysicalMaterial
      color={color}
      transparent
      opacity={opacity}
      roughness={0.7}
      metalness={0.05}
      clearcoat={0.05}
    />
  );

  return (
    <group rotation={[0.05, 0.2, 0]}>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.45, 0.06, 0.35]} />
        {clothMat}
      </mesh>

      <mesh position={[0, 0.04, -0.1]}>
        <boxGeometry args={[0.35, 0.04, 0.2]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity * 0.7}
          roughness={0.7}
          metalness={0.05}
        />
      </mesh>

      <mesh position={[-0.2, 0.02, 0]} rotation={[0, 0, -0.15]}>
        <boxGeometry args={[0.15, 0.04, 0.1]} />
        {clothMat}
      </mesh>
      <mesh position={[0.2, 0.02, 0]} rotation={[0, 0, 0.15]}>
        <boxGeometry args={[0.15, 0.04, 0.1]} />
        {clothMat}
      </mesh>

      <mesh position={[0, 0.03, -0.18]}>
        <boxGeometry args={[0.1, 0.03, 0.04]} />
        <meshPhysicalMaterial color="#1a1a2e" transparent opacity={opacity * 0.3} roughness={0.9} metalness={0} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Watch
// ---------------------------------------------------------------------------
export function WatchModel({ color, opacity = 1 }: ModelProps) {
  return (
    <group rotation={[-0.1, 0.3, 0.05]}>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.05, 24]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.15}
          metalness={0.8}
          clearcoat={0.3}
          envMapIntensity={1.2}
        />
      </mesh>

      <mesh position={[0, 0, 0.04]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.01, 24]} />
        <meshBasicMaterial color="#1a1a2e" transparent opacity={opacity * 0.5} />
      </mesh>

      <mesh position={[0, -0.18, 0]}>
        <boxGeometry args={[0.04, 0.12, 0.12]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <boxGeometry args={[0.04, 0.12, 0.12]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.5}
        />
      </mesh>

      <mesh position={[0.16, 0.03, 0]} rotation={[0, 0, Math.PI / 4]}>
        <boxGeometry args={[0.04, 0.01, 0.01]} />
        <meshBasicMaterial color="white" transparent opacity={opacity * 0.3} />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Bottle (improved from Products.tsx)
// ---------------------------------------------------------------------------
export function BottleModel({ color, opacity = 1 }: ModelProps) {
  return (
    <group rotation={[0, -0.2, 0.05]} scale={[0.8, 0.8, 0.8]}>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.28, 0.32, 0.5, 20]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.1}
          metalness={0.6}
          clearcoat={0.8}
          clearcoatRoughness={0.1}
          envMapIntensity={1.5}
        />
      </mesh>

      <mesh position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.1, 0.14, 0.18, 16]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.4}
          clearcoat={0.3}
        />
      </mesh>

      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 16]} />
        <meshPhysicalMaterial
          color="#e2e8f0"
          transparent
          opacity={opacity * 0.8}
          roughness={0.2}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

// ---------------------------------------------------------------------------
// Headphones
// ---------------------------------------------------------------------------
export function HeadphoneModel({ color, opacity = 1 }: ModelProps) {
  return (
    <group rotation={[-0.05, 0.25, 0]}>
      <mesh position={[0, 0.12, 0]} rotation={[0.2, 0, 0]} scale={[1, 0.15, 0.6]}>
        <torusGeometry args={[0.2, 0.03, 12, 24]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.3}
          metalness={0.3}
          clearcoat={0.2}
        />
      </mesh>

      <mesh position={[-0.2, -0.05, 0]} scale={[0.12, 0.18, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.4}
          metalness={0.2}
          clearcoat={0.3}
        />
      </mesh>
      <mesh position={[0.2, -0.05, 0]} scale={[0.12, 0.18, 0.08]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={opacity}
          roughness={0.4}
          metalness={0.2}
          clearcoat={0.3}
        />
      </mesh>

      <mesh position={[-0.2, -0.05, 0.04]} scale={[0.08, 0.12, 0.04]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color="#1a1a2e"
          transparent
          opacity={opacity * 0.5}
          roughness={0.9}
          metalness={0}
        />
      </mesh>
      <mesh position={[0.2, -0.05, 0.04]} scale={[0.08, 0.12, 0.04]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial
          color="#1a1a2e"
          transparent
          opacity={opacity * 0.5}
          roughness={0.9}
          metalness={0}
        />
      </mesh>
    </group>
  );
}
