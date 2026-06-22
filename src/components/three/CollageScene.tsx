"use client";

import { useEffect } from "react";
import { useParallaxUpdater } from "./useParallax";
import { ProductCard } from "./ProductCard";

interface CardConfig {
  label: string;
  productType: "bag" | "shoes" | "shirt" | "watch" | "bottle" | "headphones";
  color: string;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  depth: number;
  phase: number;
  speed: number;
}

const CARDS: CardConfig[] = [
  {
    label: "Tote Bag",
    productType: "bag",
    color: "#0f766e",
    position: [2.0, 0.5, 1.0],
    rotation: [0.05, -0.1, 0.08],
    scale: 1.4,
    depth: 1.5,
    phase: 0,
    speed: 0.4,
  },
  {
    label: "Sneakers",
    productType: "shoes",
    color: "#f97316",
    position: [3.5, -0.3, 0.7],
    rotation: [-0.03, 0.15, -0.05],
    scale: 1.2,
    depth: 1.3,
    phase: Math.PI * 0.7,
    speed: 0.6,
  },
  {
    label: "T-Shirt",
    productType: "shirt",
    color: "#ec4899",
    position: [1.2, 1.5, 0.2],
    rotation: [0.08, 0.05, -0.1],
    scale: 0.9,
    depth: 1.0,
    phase: Math.PI * 0.3,
    speed: 0.5,
  },
  {
    label: "Watch",
    productType: "watch",
    color: "#eab308",
    position: [4.0, 0.8, -0.1],
    rotation: [-0.05, -0.08, 0.06],
    scale: 0.8,
    depth: 0.8,
    phase: Math.PI * 1.2,
    speed: 0.7,
  },
  {
    label: "Bottle",
    productType: "bottle",
    color: "#14b8a6",
    position: [2.8, -1.3, -0.3],
    rotation: [0.03, -0.12, -0.03],
    scale: 0.7,
    depth: 0.6,
    phase: Math.PI * 1.5,
    speed: 0.3,
  },
  {
    label: "Headphones",
    productType: "headphones",
    color: "#8b5cf6",
    position: [4.8, -0.6, -0.8],
    rotation: [-0.08, 0.1, 0.05],
    scale: 0.5,
    depth: 0.4,
    phase: Math.PI * 0.9,
    speed: 0.8,
  },
];

export function CollageScene() {
  const { attach, detach } = useParallaxUpdater();

  useEffect(() => {
    attach();
    return () => detach();
  }, [attach, detach]);

  return (
    <group>
      {CARDS.map((card, i) => (
        <ProductCard
          key={i}
          label={card.label}
          productType={card.productType}
          accentColor={card.color}
          position={card.position}
          rotation={card.rotation}
          scale={card.scale}
          phase={card.phase}
          bobSpeed={card.speed}
          parallaxDepth={card.depth}
          scrollFadeStart={1.5 + card.depth * 0.5}
          scrollSpreadFactor={card.depth * 0.8}
        />
      ))}
    </group>
  );
}
