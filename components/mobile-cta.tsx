"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const nearEnd =
        window.scrollY + window.innerHeight >
        document.documentElement.scrollHeight - 240;
      setVisible(window.scrollY > 680 && !nearEnd);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink/95 px-4 py-3 backdrop-blur-md transition-transform duration-500 md:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-faint">
            Demo · 30 minutos
          </p>
          <p className="mt-1 text-[11.5px] text-muted">Com os seus números</p>
        </div>
        <a
          href="#contato"
          className="flex h-11 items-center gap-3 bg-copper px-5 font-mono text-[10px] uppercase tracking-[0.14em] text-ink"
        >
          Agendar
          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden="true">
            <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </a>
      </div>
    </div>
  );
}
