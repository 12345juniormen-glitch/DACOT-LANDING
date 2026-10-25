"use client";

import { useEffect, useRef, useState } from "react";
import { CursorDrivenParticleTypography } from "@/components/cursor-driven-particle-typography";
import { initialVisualImages, waitForImage } from "@/lib/critical-images";

type Phase = "loading" | "explode" | "reveal" | "done";

export function LandingPreloader({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>("loading");
  const content = useRef<HTMLDivElement>(null);
  const overlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const started = performance.now();
    const controller = new AbortController();
    let disposed = false, released = false, minimumDone = false, imagesDone = false;
    let frame = 0;
    const timers: number[] = [];
    const later = (fn: () => void, delay: number) => {
      const timer = window.setTimeout(() => { if (!disposed) fn(); }, delay);
      timers.push(timer);
    };
    const previousOverflow = document.body.style.overflow;
    const previousGutter = document.documentElement.style.scrollbarGutter;
    const restore = () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.scrollbarGutter = previousGutter;
    };
    // Stable gutters protect the page underneath; use physical CSS pixels so
    // the fullscreen canvas is still centred on the entire visible viewport.
    const fitOverlay = () => { if (overlay.current) overlay.current.style.width = `${innerWidth}px`; };
    fitOverlay();
    window.addEventListener("resize", fitOverlay, { passive: true });
    window.visualViewport?.addEventListener("resize", fitOverlay, { passive: true });
    document.documentElement.style.scrollbarGutter = "stable";
    document.body.style.overflow = "hidden";

    const release = () => {
      if (disposed || released || !minimumDone || !imagesDone) return;
      released = true;
      timers.forEach(window.clearTimeout);
      timers.length = 0;
      content.current?.setAttribute("data-entry-wait-ms", String(Math.round(performance.now() - started)));
      controller.abort();
      const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
      setPhase("explode");
      later(() => setPhase("reveal"), reduced ? 0 : 380);
      later(() => { restore(); setPhase("done"); }, reduced ? 220 : 620);
    };
    later(() => { minimumDone = true; release(); }, 800);
    later(() => {
      content.current?.setAttribute("data-load-result", "failsafe");
      imagesDone = true; release();
    }, 8000);

    // One frame lets the existing parallax's responsive mount effect settle.
    // Loading the actual img nodes reuses Next's srcset, cache and optimizer URLs.
    frame = requestAnimationFrame(() => {
      const root = content.current;
      if (!root || disposed) return;
      const images = initialVisualImages(root);
      content.current?.setAttribute("data-critical-count", String(images.length));
      content.current?.setAttribute("data-critical-images", images.map((image) => image.currentSrc || image.getAttribute("src") || "").join("|"));
      Promise.all([document.fonts.ready.catch(() => {}), ...images.map((image) => waitForImage(image, controller.signal))]).then(() => {
        if (disposed || released) return;
        content.current?.setAttribute("data-load-result", "settled");
        imagesDone = true; release();
      });
    });
    return () => {
      disposed = true; controller.abort(); cancelAnimationFrame(frame);
      window.removeEventListener("resize", fitOverlay);
      window.visualViewport?.removeEventListener("resize", fitOverlay);
      timers.forEach(window.clearTimeout); restore();
    };
  }, []);

  const revealed = phase === "reveal" || phase === "done";
  return <>
    <div ref={content} className="dacot-entry-content" data-revealed={revealed} aria-busy={!revealed}>{children}</div>
    {phase !== "done" && <div ref={overlay} className="dacot-preloader" data-phase={phase} role="status" aria-label="Carregando DACOT">
      <CursorDrivenParticleTypography explode={phase !== "loading"} />
    </div>}
    <noscript><style>{".dacot-preloader{display:none!important}.dacot-entry-content{visibility:visible!important}"}</style></noscript>
  </>;
}
