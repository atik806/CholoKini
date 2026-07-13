"use client";

import { useEffect } from "react";

export function ThemeInit() {
  useEffect(() => {
    try {
      const t = localStorage.getItem("theme");
      if (
        t === "dark" ||
        (!t && window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else if (t === "light") {
        document.documentElement.classList.remove("dark");
      }
    } catch {}
  }, []);

  return null;
}
