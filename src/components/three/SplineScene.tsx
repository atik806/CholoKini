"use client";

import { useEffect } from "react";

const SPLINE_URL = "https://my.spline.design/interactiveaiwebsite-Tj6WM6pTYsKwPBnB2UFa2lmQ/";

export function SplineScene({ className = "" }: { className?: string }) {
  useEffect(() => {
    const existing = document.querySelector(
      'script[src*="spline-viewer"]'
    );
    if (existing) return;

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@splinetool/viewer@1.12.97/build/spline-viewer.js";
    script.async = true;
    document.head.appendChild(script);

    return () => {};
  }, []);

  return (
    <div className={className}>
      <div
        style={{ width: "100%", height: "100%" }}
        dangerouslySetInnerHTML={{
          __html: `<spline-viewer url="${SPLINE_URL}" style="width:100%;height:100%;border:none;"></spline-viewer>`,
        }}
      />
    </div>
  );
}
