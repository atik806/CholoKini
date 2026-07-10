"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltDegree?: number;
  perspective?: number;
  scale?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className = "",
  tiltDegree = 8,
  perspective = 1000,
  scale = 1.02,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (isTouch) return;
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const rotateX = ((mouseY - height / 2) / height) * -tiltDegree;
      const rotateY = ((mouseX - width / 2) / width) * tiltDegree;

      x.set(rotateX);
      y.set(rotateY);

      if (glare) {
        setGlareX((mouseX / width) * 100);
        setGlareY((mouseY / height) * 100);
      }
    },
    [tiltDegree, x, y, glare, isTouch]
  );

  const handlePointerLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    if (glare) {
      setGlareX(50);
      setGlareY(50);
    }
  }, [x, y, glare]);

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  return (
    <motion.div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={{
        perspective,
        rotateX: isTouch ? 0 : springX,
        rotateY: isTouch ? 0 : springY,
        scale,
      }}
      className={`relative ${className}`}
    >
      {children}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
}
