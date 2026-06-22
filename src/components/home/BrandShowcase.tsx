"use client";

import { motion } from "framer-motion";

interface ShowcaseCard {
  label: string;
  tag: string;
  gradient: string;
  rotate: number;
  x: string;
  y: string;
  w: string;
  h: string;
  delay: number;
  accentColor: string;
}

const cards: ShowcaseCard[] = [
  {
    label: "Premium Tote",
    tag: "New Collection",
    gradient: "from-emerald-500 via-teal-500 to-emerald-600",
    rotate: -3,
    x: "55%",
    y: "8%",
    w: "220px",
    h: "280px",
    delay: 0.2,
    accentColor: "#0f766e",
  },
  {
    label: "Designer Sneakers",
    tag: "Best Seller",
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    rotate: 5,
    x: "28%",
    y: "22%",
    w: "190px",
    h: "240px",
    delay: 0.35,
    accentColor: "#f97316",
  },
  {
    label: "Silk Dress",
    tag: "Premium",
    gradient: "from-rose-400 via-pink-500 to-fuchsia-600",
    rotate: -5,
    x: "42%",
    y: "58%",
    w: "210px",
    h: "260px",
    delay: 0.5,
    accentColor: "#ec4899",
  },
  {
    label: "Gold Watch",
    tag: "Luxury",
    gradient: "from-yellow-300 via-amber-400 to-orange-500",
    rotate: 7,
    x: "72%",
    y: "42%",
    w: "160px",
    h: "200px",
    delay: 0.65,
    accentColor: "#eab308",
  },
];

function Card({ card }: { card: ShowcaseCard }) {
  return (
    <motion.div
      className="absolute"
      style={{
        left: card.x,
        top: card.y,
        transform: `translate(-50%, -50%) rotate(${card.rotate}deg)`,
      }}
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, delay: card.delay, ease: "easeOut" }}
    >
      <div
        className="group relative rounded-2xl shadow-xl border border-white/20 overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:-translate-y-2"
        style={{ width: card.w, height: card.h }}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${card.gradient}`}
        />

        <div className="absolute inset-3 rounded-xl bg-white/10 backdrop-blur-[2px] flex flex-col items-center justify-center gap-3 p-4">
          <div
            className="w-3/4 aspect-square rounded-xl flex items-center justify-center"
            style={{ backgroundColor: `${card.accentColor}33` }}
          >
            <svg
              className="w-8 h-8 text-white/60"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
          </div>
          <span className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-medium">
            {card.tag}
          </span>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/40 to-transparent">
          <p className="text-white font-semibold text-sm">{card.label}</p>
          <p className="text-white/60 text-xs">CholoKini</p>
        </div>
      </div>
    </motion.div>
  );
}

export function BrandShowcase() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/10 via-primary/5 to-transparent blur-3xl" />
      <div className="absolute bottom-20 -left-20 w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-amber-400/10 via-amber-300/5 to-transparent blur-3xl" />

      <div className="relative w-full h-full">
        {cards.map((card) => (
          <Card key={card.label} card={card} />
        ))}
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-primary/5 animate-[spin_40s_linear_infinite]" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] rounded-full border border-primary/5 animate-[spin_60s_linear_infinite]"
        style={{ animationDirection: "reverse" }}
      />
    </div>
  );
}
