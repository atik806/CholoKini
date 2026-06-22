"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame, type RootState } from "@react-three/fiber";
import * as THREE from "three";
import { getParallax } from "./useParallax";

type ProductType = "bag" | "shoes" | "shirt" | "watch" | "bottle" | "headphones";

interface ProductCardProps {
  label: string;
  productType: ProductType;
  accentColor: string;
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  phase?: number;
  bobSpeed?: number;
  parallaxDepth?: number;
  scrollFadeStart?: number;
  scrollSpreadFactor?: number;
}

// ---------------------------------------------------------------------------
// Canvas helpers
// ---------------------------------------------------------------------------
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number, w: number, h: number, r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

// ---------------------------------------------------------------------------
// Product silhouette drawing functions
// ---------------------------------------------------------------------------
function drawBag(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const bw = s * 0.55;
  const bh = s * 0.55;
  const by = cy - bh / 2 + s * 0.08;

  roundRect(ctx, cx - bw / 2, by, bw, bh, s * 0.05);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - bw * 0.25, by);
  ctx.quadraticCurveTo(cx - bw * 0.25, by - s * 0.25, cx - bw * 0.35, by - s * 0.2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx + bw * 0.25, by);
  ctx.quadraticCurveTo(cx + bw * 0.25, by - s * 0.25, cx + bw * 0.35, by - s * 0.2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx - bw * 0.08, by + s * 0.02);
  ctx.lineTo(cx - bw * 0.08, by + bh * 0.7);
  ctx.moveTo(cx + bw * 0.08, by + s * 0.02);
  ctx.lineTo(cx + bw * 0.08, by + bh * 0.7);
  ctx.stroke();

  ctx.restore();
}

function drawShoes(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const sw = s * 0.6;
  const sh = s * 0.3;
  const sx = cx - sw / 2;
  const sy = cy - sh / 2;

  roundRect(ctx, sx + sh * 0.3, sy, sw - sh * 0.3, sh, s * 0.04);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(sx + sh * 0.3, sy);
  ctx.quadraticCurveTo(sx, sy - sh * 0.25, sx - sh * 0.15, sy + sh * 0.1);
  ctx.quadraticCurveTo(sx - sh * 0.1, sy + sh * 0.5, sx + sh * 0.3, sy + sh * 0.55);
  ctx.quadraticCurveTo(cx, sy + sh * 0.45, cx + sw * 0.4, sy + sh * 0.5);
  ctx.lineTo(sx + sw, sy + sh * 0.5);
  ctx.lineTo(sx + sw, sy);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(sx + sw * 0.65, sy + sh * 0.05);
  ctx.lineTo(sx + sw * 0.65, sy + sh * 0.45);
  ctx.moveTo(sx + sw * 0.75, sy + sh * 0.05);
  ctx.lineTo(sx + sw * 0.75, sy + sh * 0.45);
  ctx.stroke();

  ctx.restore();
}

function drawShirt(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const tw = s * 0.5;
  const th = s * 0.65;
  const tx = cx - tw / 2;
  const ty = cy - th / 2;

  ctx.beginPath();
  ctx.moveTo(tx + tw * 0.35, ty);
  ctx.quadraticCurveTo(cx, ty - s * 0.04, tx + tw * 0.65, ty);
  ctx.lineTo(tx + tw * 0.8, ty + th * 0.08);
  ctx.lineTo(tx + tw * 0.95, ty + th * 0.12);
  ctx.quadraticCurveTo(tx + tw * 0.9, ty + th * 0.2, tx + tw * 0.75, ty + th * 0.2);
  ctx.lineTo(tx + tw * 0.7, ty + th * 0.22);
  ctx.lineTo(tx + tw * 0.7, ty + th);
  ctx.lineTo(tx + tw * 0.3, ty + th);
  ctx.lineTo(tx + tw * 0.3, ty + th * 0.22);
  ctx.lineTo(tx + tw * 0.25, ty + th * 0.2);
  ctx.quadraticCurveTo(tx + tw * 0.1, ty + th * 0.2, tx + tw * 0.05, ty + th * 0.12);
  ctx.quadraticCurveTo(tx + tw * 0.1, ty + th * 0.08, tx + tw * 0.2, ty + th * 0.08);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function drawWatch(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const r = s * 0.2;

  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.7, 0, Math.PI * 2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(cx, cy - r * 0.5);
  ctx.lineTo(cx, cy + r * 0.01);
  ctx.lineTo(cx + r * 0.4, cy - r * 0.1);
  ctx.stroke();

  const bandW = s * 0.06;
  const bandH = s * 0.28;

  roundRect(ctx, cx - bandW / 2, cy - r - bandH, bandW, bandH, bandW / 2);
  ctx.fill();
  ctx.stroke();
  roundRect(ctx, cx - bandW / 2, cy + r, bandW, bandH, bandW / 2);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function drawBottle(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const bw = s * 0.28;
  const bh = s * 0.55;
  const by = cy - bh / 2 + s * 0.04;

  roundRect(ctx, cx - bw / 2, by + bh * 0.2, bw, bh * 0.8, s * 0.03);
  ctx.fill();
  ctx.stroke();

  const nw = bw * 0.35;
  const nh = bh * 0.22;

  ctx.beginPath();
  ctx.moveTo(cx - nw / 2, by + bh * 0.2);
  ctx.lineTo(cx - nw / 2, by + bh * 0.02);
  ctx.lineTo(cx + nw / 2, by + bh * 0.02);
  ctx.lineTo(cx + nw / 2, by + bh * 0.2);
  ctx.stroke();

  roundRect(ctx, cx - nw * 0.65, by - nh * 0.2, nw * 1.3, nh * 0.3, s * 0.02);
  ctx.fill();
  ctx.stroke();

  ctx.restore();
}

function drawHeadphones(ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) {
  ctx.save();
  ctx.strokeStyle = "rgba(255,255,255,0.6)";
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  ctx.lineWidth = 2.5;
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  const br = s * 0.32;

  ctx.beginPath();
  ctx.arc(cx, cy - s * 0.02, br, Math.PI * 1.2, Math.PI * 1.8);
  ctx.stroke();

  const ew = s * 0.18;
  const eh = s * 0.25;

  roundRect(ctx, cx - br - ew / 2, cy - eh / 2 - s * 0.02, ew, eh, s * 0.04);
  ctx.fill();
  ctx.stroke();

  roundRect(ctx, cx + br - ew / 2, cy - eh / 2 - s * 0.02, ew, eh, s * 0.04);
  ctx.fill();
  ctx.stroke();

  roundRect(ctx, cx - br - ew / 2 + s * 0.02, cy - eh / 2 + s * 0.02 - s * 0.02, ew * 0.7, eh * 0.8, s * 0.06);
  ctx.fillStyle = "rgba(255,255,255,0.06)";
  ctx.fill();
  ctx.fillStyle = "rgba(255,255,255,0.12)";
  roundRect(ctx, cx + br - ew / 2 + s * 0.02, cy - eh / 2 + s * 0.02 - s * 0.02, ew * 0.7, eh * 0.8, s * 0.06);
  ctx.fill();

  ctx.restore();
}

const PRODUCT_DRAWERS: Record<ProductType, (ctx: CanvasRenderingContext2D, cx: number, cy: number, s: number) => void> = {
  bag: drawBag,
  shoes: drawShoes,
  shirt: drawShirt,
  watch: drawWatch,
  bottle: drawBottle,
  headphones: drawHeadphones,
};

// ---------------------------------------------------------------------------
// Texture generation
// ---------------------------------------------------------------------------
function createCardTexture(
  label: string,
  color: string,
  productType: ProductType,
): THREE.CanvasTexture {
  const w = 400;
  const h = 500;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d")!;
  const r = 24;

  roundRect(ctx, 0, 0, w, h, r);
  ctx.fillStyle = color;
  ctx.fill();

  roundRect(ctx, 2, 2, w - 4, h - 4, r - 2);
  ctx.strokeStyle = "rgba(255,255,255,0.18)";
  ctx.lineWidth = 2;
  ctx.stroke();

  const py = 28;
  const ph = 300;
  roundRect(ctx, 20, py, w - 40, ph, 16);
  ctx.fillStyle = "rgba(255,255,255,0.08)";
  ctx.fill();

  const drawer = PRODUCT_DRAWERS[productType];
  if (drawer) {
    drawer(ctx, w / 2, py + ph / 2, ph * 0.7);
  }

  ctx.fillStyle = "white";
  ctx.font = "bold 22px system-ui";
  ctx.textAlign = "center";
  ctx.textBaseline = "top";
  ctx.fillText(label, w / 2, py + ph + 20);

  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = "12px system-ui";
  ctx.fillText("CholoKini × Collection", w / 2, py + ph + 52);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ---------------------------------------------------------------------------
// prefers-reduced-motion hook (lazy initial state to avoid lint warning)
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// ProductCard component
// ---------------------------------------------------------------------------
export function ProductCard({
  label,
  productType,
  accentColor,
  position,
  rotation = [0, 0, 0],
  scale = 1,
  phase = 0,
  bobSpeed = 0.5,
  parallaxDepth = 1,
  scrollFadeStart = 1.5,
  scrollSpreadFactor = 1,
}: ProductCardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const shadowRef = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const shadowMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const baseRef = useRef(position);
  const initScale = useRef(scale);
  const [hovered, setHovered] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const texture = useMemo(
    () => createCardTexture(label, accentColor, productType),
    [label, accentColor, productType],
  );

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

      group.rotation.x += Math.sin(t * 0.5 + phase) * 0.0006;
      group.rotation.z += Math.cos(t * 0.4 + phase) * 0.0006;
    }

    if (p.scrollY > scrollFadeStart) {
      const progress = Math.min((p.scrollY - scrollFadeStart) / 3, 1);
      const spread = progress * scrollSpreadFactor;
      const dirX = baseRef.current[0] > 0 ? 1 : -1;
      group.position.x += dirX * spread;
      group.position.y -= spread * 0.4;
      if (matRef.current) {
        matRef.current.opacity = 1 - progress;
        matRef.current.transparent = true;
      }
    } else if (matRef.current) {
      matRef.current.opacity = 1;
    }

    const targetScale = hovered ? initScale.current * 1.05 : initScale.current;
    const cur = group.scale.x;
    const lerp = cur + (targetScale - cur) * (hovered ? 0.08 : 0.04);
    group.scale.set(lerp, lerp, lerp);

    if (shadowMatRef.current) {
      shadowMatRef.current.opacity +=
        (hovered ? 0.22 : 0.1) - shadowMatRef.current.opacity * 0.06;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <mesh ref={shadowRef} position={[0.03, -0.04, -0.01]} scale={[0.9, 0.9, 1]}>
        <planeGeometry args={[1, 1.25]} />
        <meshBasicMaterial ref={shadowMatRef} color="black" transparent opacity={0.1} />
      </mesh>

      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <planeGeometry args={[1, 1.25]} />
        <meshBasicMaterial ref={matRef} map={texture} transparent />
      </mesh>
    </group>
  );
}
