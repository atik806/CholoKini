"use client";

import { motion } from "framer-motion";
import { Check, Package } from "lucide-react";
import Link from "next/link";
import { Button } from "@/src/components/ui/Button";
import { Breadcrumbs } from "@/src/components/ui/Breadcrumbs";

export function OrderComplete() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="container py-20 bg-[#FBF6EC]"
    >
      <Breadcrumbs items={[{ label: "Order Complete" }]} />
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="w-20 h-20 rounded-full bg-[#1F6F50] flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-widest text-[#F5A300] bg-[#132A3A] px-3 py-1 border border-[#F5A300]/40 rounded-[2px] mb-4 -rotate-1">
            <Package className="w-3.5 h-3.5" /> LEDGER ORDER CONFIRMED
          </div>
          <h1 className="font-serif text-3xl font-extrabold text-[#132A3A] mb-3">
            Order Placed!
          </h1>
          <p className="text-[#1C1A17]/70 text-sm mb-8 font-sans">
            Thank you for your order. You&apos;ll receive a confirmation
            email shortly. Cash on delivery — pay at your door.
          </p>
          <Link href="/shop">
            <Button>CONTINUE BROWSING LEDGER</Button>
          </Link>
        </motion.div>

        <div className="mt-12 flex justify-center gap-2">
          {[1.5, 2.3, 1.8, 3.0, 2.7, 1.2, 2.5, 3.5, 1.0, 2.1, 2.8, 1.6].map((dur, i) => (
            <motion.div
              key={i}
              initial={{ y: -20, opacity: 0, rotate: 0 }}
              animate={{
                y: [0, 300],
                opacity: [1, 0],
                rotate: 360,
              }}
              transition={{
                duration: dur,
                delay: i * 0.15,
                repeat: Infinity,
                repeatDelay: 3,
              }}
              className="fixed w-2 h-2 rounded-full"
              style={{
                left: `${5 + i * 8}%`,
                backgroundColor: [
                  "#1F6F50",
                  "#F5A300",
                  "#BE3D1F",
                  "#132A3A",
                  "#F5A300",
                ][i % 5],
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
