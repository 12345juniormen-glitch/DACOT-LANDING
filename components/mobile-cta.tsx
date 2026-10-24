"use client";

import { useEffect, useState } from "react";
import { ContactTrigger } from "@/components/contact-modal";
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
        <ContactTrigger primary className="!min-h-11 !px-4 !text-[10px]">Agendar</ContactTrigger>
      </div>
    </div>
  );
}
