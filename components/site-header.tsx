"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { BrandMark, Wordmark } from "@/components/brand";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Plataforma", href: "#plataforma" },
  { label: "Módulos", href: "#modulos" },
  { label: "Monte a sua", href: "#montar" },
  { label: "Diferencial", href: "#diferenca" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const progressRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : previous;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
          scrolled || open
            ? "border-b border-line bg-ink/85 backdrop-blur-xl"
            : "border-b border-transparent",
        )}
      >
        <div className="mx-auto flex h-[68px] max-w-[1440px] items-center justify-between px-5 md:h-[76px] md:px-10">
          <Link
            href="#topo"
            className="relative z-10 flex items-center gap-3"
            aria-label="DACOT — início"
            onClick={() => setOpen(false)}
          >
            <BrandMark className="text-fg" />
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-9 lg:flex" aria-label="Principal">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative py-2 font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted transition-colors hover:text-fg"
              >
                {item.label}
                <span className="absolute inset-x-0 -bottom-px h-px origin-left scale-x-0 bg-copper transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-4">
            <div className="hidden md:block">
              <ButtonLink href="#contato" variant="outline" size="sm">
                Agendar demo
                <Arrow />
              </ButtonLink>
            </div>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              className="flex size-10 items-center justify-center border border-line-strong text-fg lg:hidden"
            >
              <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
              <span className="relative block h-[9px] w-[18px]">
                <span
                  className={cn(
                    "absolute left-0 top-0 h-px w-full bg-current transition-transform duration-300",
                    open && "translate-y-[4px] rotate-45",
                  )}
                />
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-px w-full bg-current transition-transform duration-300",
                    open && "-translate-y-[4px] -rotate-45",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        <span className="absolute inset-x-0 bottom-0 h-px overflow-hidden">
          <span
            ref={progressRef}
            className="block h-full w-full origin-left scale-x-0 bg-copper/80"
          />
        </span>
      </header>

      <div
        id="menu-mobile"
        className={cn(
          "fixed inset-0 z-40 flex flex-col bg-ink px-5 pb-8 pt-[100px] transition-[opacity,visibility] duration-300 lg:hidden",
          open ? "visible opacity-100" : "invisible opacity-0",
        )}
      >
        <nav className="flex flex-col" aria-label="Menu móvel">
          {navItems.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="flex items-baseline gap-4 border-b border-line py-5 font-display text-[30px] font-medium tracking-[-0.03em]"
            >
              <span className="font-mono text-[10px] tracking-[0.2em] text-copper">
                0{index + 1}
              </span>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="mt-8 flex flex-col gap-3">
          <ButtonLink
            href="#contato"
            size="lg"
            className="w-full justify-between"
            onClick={() => setOpen(false)}
          >
            Agendar uma demo
            <Arrow />
          </ButtonLink>
          <a
            href="mailto:contato@dacot.com.br"
            className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
          >
            contato@dacot.com.br
          </a>
        </div>

        <p className="mt-auto max-w-[280px] text-[13px] leading-relaxed text-faint">
          Plataforma de otimização para restaurantes. Módulos independentes,
          operação sob controle.
        </p>
      </div>
    </>
  );
}

function Arrow() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
    >
      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
