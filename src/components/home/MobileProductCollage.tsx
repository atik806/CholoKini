"use client";

import { useState, useEffect } from "react";

interface MobileCardConfig {
  label: string;
  color: string;
  x: number;
  y: number;
  rotate: number;
  scale: number;
}

const mobileCards: MobileCardConfig[] = [
  { label: "Tote Bag", color: "#0f766e", x: 60, y: 15, rotate: -6, scale: 1.15 },
  { label: "Sneakers", color: "#f97316", x: 28, y: 32, rotate: 5, scale: 0.95 },
  { label: "T-Shirt", color: "#ec4899", x: 72, y: 50, rotate: -4, scale: 0.8 },
  { label: "Watch", color: "#eab308", x: 20, y: 62, rotate: 3, scale: 0.7 },
  { label: "Bottle", color: "#14b8a6", x: 55, y: 78, rotate: -2, scale: 0.65 },
  { label: "Headphones", color: "#8b5cf6", x: 82, y: 30, rotate: 7, scale: 0.6 },
];

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

export function MobileProductCollage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <div className="relative w-full h-[340px] mt-8 lg:hidden sm:h-[400px]">
      {mobileCards.map((card, idx) => {
        const w = 120;
        const h = 150;
        const animDelay = `${idx * 0.5}s`;
        const fontSize = 12;

        return (
          <div
            key={card.label}
            className="absolute"
            style={{
              left: `${card.x}%`,
              top: `${card.y}%`,
              transform: `translate(-50%, -50%) rotate(${card.rotate}deg) scale(${card.scale})`,
            }}
          >
            <div
              className="rounded-2xl flex items-center justify-center font-bold text-white shadow-xl border border-white/20"
              style={{
                width: `${w}px`,
                height: `${h}px`,
                backgroundColor: card.color,
                fontSize: `${fontSize}px`,
                animation: prefersReducedMotion
                  ? "none"
                  : "float 3s ease-in-out infinite",
                animationDelay: animDelay,
              }}
            >
              <div className="flex flex-col items-center gap-1.5 px-2">
                <div
                  className="rounded-lg bg-white/10 flex items-center justify-center"
                  style={{ width: `${w * 0.55}px`, height: `${h * 0.55}px` }}
                >
                  <span className="text-lg opacity-40 select-none">✦</span>
                </div>
                <span className="tracking-wider leading-tight text-center text-[11px] sm:text-xs">
                  {card.label}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
