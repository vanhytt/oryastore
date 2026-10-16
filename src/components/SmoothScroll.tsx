"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      lerp: 0.08,
      infinite: false,
      gestureOrientation: "vertical",
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    const bodyResizeObserver = new ResizeObserver(() => lenis.resize());
    bodyResizeObserver.observe(document.body);

    const handleLoad = () => lenis.resize();
    window.addEventListener("load", handleLoad);

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      bodyResizeObserver.disconnect();
      window.removeEventListener("load", handleLoad);
      lenis.destroy();
    };
  }, []);

  return null;
}
