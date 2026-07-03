"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageLoader() {
  const pathname = usePathname();
  const prevPath = useRef(pathname);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (prevPath.current !== pathname) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        prevPath.current = pathname;
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [pathname]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-primary via-primary-light to-accent z-[100] origin-left"
          style={{ transformOrigin: "left" }}
        />
      )}
    </AnimatePresence>
  );
}
