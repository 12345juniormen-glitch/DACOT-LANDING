"use client";

import { useEffect, useRef } from "react";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let pointerFrame = 0;
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;

    const tickets = Array.from(
      section.querySelectorAll<HTMLElement>("[data-depth]"),
    );

    const renderScroll = () => {
      frame = 0;
      const progress = Math.min(
        1,
        Math.max(0, window.scrollY / Math.max(1, window.innerHeight)),
      );

      if (copyRef.current) {
        copyRef.current.style.transform = `translate3d(0, ${progress * 46}px, 0)`;
        copyRef.current.style.opacity = String(1 - progress * 0.85);
      }
      if (stageRef.current) {
        stageRef.current.style.transform = `translate3d(0, ${progress * -54}px, 0)`;
      }
      tickets.forEach((ticket) => {
        const depth = Number(ticket.dataset.depth ?? 0);
        ticket.style.translate = `0 ${progress * depth * 30}px`;
      });
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(renderScroll);
    };

    const renderTilt = () => {
      pointerFrame = 0;
      currentX += (targetX - currentX) * 0.07;
      currentY += (targetY - currentY) * 0.07;
      if (tiltRef.current) {
        tiltRef.current.style.transform = `rotateX(${currentY * 3.2}deg) rotateY(${currentX * 4.4}deg)`;
      }
      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        pointerFrame = requestAnimationFrame(renderTilt);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = section.getBoundingClientRect();
      targetX = (event.clientX - rect.left) / rect.width - 0.5;
      targetY = (event.clientY - rect.top) / rect.height - 0.5;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(renderTilt);
    };

    const onPointerLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!pointerFrame) pointerFrame = requestAnimationFrame(renderTilt);
    };

    renderScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    section.addEventListener("pointermove", onPointerMove);
    section.addEventListener("pointerleave", onPointerLeave);

    return () => {
      window.removeEventListener("scroll", onScroll);
      section.removeEventListener("pointermove", onPointerMove);
      section.removeEventListener("pointerleave", onPointerLeave);
      cancelAnimationFrame(frame);
      cancelAnimationFrame(pointerFrame);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="topo"
      className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink"
    >
      {/* atmosphere */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(65%_55%_at_76%_18%,rgba(185,124,79,0.16),transparent_72%)]"
      />
      <div
        aria-hidden="true"
        className="blueprint pointer-events-none absolute inset-0 z-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-1/2 z-0 hidden w-px bg-line lg:block"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-14 px-5 pb-10 pt-[108px] md:px-10 lg:grid-cols-12 lg:gap-6 lg:pb-12 lg:pt-[112px]">
        <div ref={copyRef} className="lg:col-span-7 lg:pr-10">
          <div className="flex items-center gap-3">
            <span className="pulse-dot size-1.5 shrink-0 bg-copper" aria-hidden="true" />
            <p className="eyebrow text-muted">
              <span className="md:hidden">Plataforma de otimização</span>
              <span className="hidden md:inline">
                Plataforma de otimização para restaurantes
              </span>
            </p>
          </div>

          <h1 className="display-xl mt-7 text-fg md:mt-9">
            <span className="block">Menos incêndio.</span>
            <span className="block">
              Mais <span className="text-copper-soft">operação.</span>
            </span>
          </h1>

          <p className="mt-8 max-w-[46ch] text-[16.5px] leading-[1.65] text-muted md:mt-10 md:text-[18px]">
            A DACOT organiza pedidos, estoque e decisões do seu restaurante.
            Você contrata só o módulo que precisa — e cresce quando quiser.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-11">
            <ButtonLink href="#contato" size="lg" className="justify-between sm:justify-center">
              Agendar uma demo
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </ButtonLink>

            <a
              href="#plataforma"
              className="group inline-flex h-14 items-center gap-3 border-b border-line px-1 font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:border-copper/60 hover:text-fg"
            >
              Entender o método
              <svg
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="size-3.5 transition-transform duration-300 group-hover:translate-y-0.5"
              >
                <path d="M8 1v13M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </a>
          </div>

          <ul className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5 md:mt-11">
            {[
              "Sem pacote fechado",
              "Implantação por módulo",
              "Feito para o Brasil",
            ].map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.14em] text-faint"
              >
                <span className="size-1 bg-copper/80" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* pass / ticket composition */}
        <div className="lg:col-span-5">
          <div className="relative mx-auto w-full max-w-[420px] [perspective:1400px] lg:mr-0">
            <div ref={stageRef} className="relative">
              <div
                ref={tiltRef}
                className="relative transition-transform duration-300 ease-out [transform-style:preserve-3d]"
              >
                {/* board */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-3 -top-1 bottom-16 border border-line bg-[linear-gradient(155deg,rgba(27,23,20,0.9),rgba(12,10,9,0.92))] shadow-[0_40px_90px_-50px_rgba(0,0,0,0.9)] md:inset-x-0"
                >
                  <div className="flex items-center justify-between border-b border-line px-4 py-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-faint">
                      Passe · turno noite
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[9px] tracking-[0.12em] text-muted">
                      <span className="size-1 bg-copper" />
                      19:42
                    </span>
                  </div>
                  <div className="pointer-events-none absolute inset-x-0 top-12 h-px bg-copper/15" />
                  <div className="absolute bottom-4 left-4 hidden items-center gap-2 font-mono text-[8.5px] uppercase tracking-[0.18em] text-faint/70 sm:flex">
                    <span className="size-1 bg-copper/70" />
                    <span>Expedidos 34</span>
                  </div>
                </div>

                {/* tickets */}
                <div className="relative px-6 pb-16 pt-[86px] sm:px-10 sm:pb-24 lg:pb-20 lg:pt-[104px]">
                  <Ticket
                    data-depth="1.35"
                    className="-rotate-[1.6deg]"
                    channel="Salão"
                    number="4812"
                    meta="Mesa 12 · 2 pessoas"
                    items={[
                      ["2× Risoto de cogumelos", "38"],
                      ["1× Vinho da casa", "28"],
                    ]}
                    note="Aberto 19:31"
                    status="Em preparo"
                    statusTone="copper"
                  />
                  <Ticket
                    data-depth="0.6"
                    className="-mt-4 ml-6 rotate-[1.2deg] sm:ml-10"
                    channel="Delivery"
                    number="4813"
                    meta="iFood · retirada"
                    items={[
                      ["1× Picanha na brasa", "64"],
                      ["1× Batata rústica", "24"],
                      ["1× Cerveja long neck", "12"],
                    ]}
                    note="Repasse conferido"
                    status="Pronto"
                    statusTone="ok"
                  />
                  <Ticket
                    data-depth="1.8"
                    className="-mt-2 -rotate-[0.5deg] opacity-95"
                    channel="Balcão"
                    number="4814"
                    meta="Consumo no local"
                    items={[["1× Frango na brasa", "46"]]}
                    note="À espera de baixa"
                    status="Servido"
                    statusTone="neutral"
                  />
                </div>

                {/* floating annotation */}
                <div className="absolute bottom-2 right-0 z-20 hidden items-center gap-3 border border-line bg-ink/85 px-4 py-3 backdrop-blur-md lg:flex md:-right-4">
                  <span className="relative flex size-6 items-center justify-center border border-copper/40">
                    <span className="size-1.5 bg-copper" />
                  </span>
                  <span className="font-mono text-[9.5px] uppercase leading-relaxed tracking-[0.13em] text-muted">
                    Um pedido.
                    <br />
                    <span className="text-fg">Três pontos de controle.</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* operational status strip */}
      <div className="relative z-10 mt-auto border-t border-line bg-ink/60">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-5 py-4 md:flex-row md:items-center md:justify-between md:px-10">
          <p className="flex items-center gap-3 font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
            <span className="size-1 bg-copper" aria-hidden="true" />
            Escolha só o que o seu restaurante precisa
          </p>
          <p className="hidden font-mono text-[9.5px] uppercase tracking-[0.16em] text-faint/80 md:block">
            01 Pedidos &amp; Operação
            <span className="mx-3 text-faint/40">/</span>
            02 Estoque &amp; Compras
            <span className="mx-3 text-faint/40">/</span>
            03 Análise &amp; Decisão
          </p>
        </div>
      </div>
    </section>
  );
}

type TicketProps = {
  channel: string;
  number: string;
  meta: string;
  items: [string, string][];
  note: string;
  status: string;
  statusTone: "copper" | "ok" | "neutral";
  className?: string;
  "data-depth"?: string;
};

function Ticket({
  channel,
  number,
  meta,
  items,
  note,
  status,
  statusTone,
  className,
  ...rest
}: TicketProps) {
  return (
    <article
      {...rest}
      className={cn(
        "relative w-full max-w-[300px] bg-[linear-gradient(180deg,#f4ede2,#eae1d3)] px-4 pb-4 pt-3 text-ink shadow-[0_26px_60px_-24px_rgba(0,0,0,0.95)] sm:px-5 sm:pb-5 sm:pt-4",
        className,
      )}
    >
      <div className="flex items-baseline justify-between border-b border-ink/20 pb-2.5">
        <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink/60">
          {channel}
        </span>
        <span className="font-mono text-[13px] font-bold tracking-tight">
          #{number}
        </span>
      </div>

      <p className="mt-2.5 font-mono text-[8.5px] uppercase tracking-[0.18em] text-ink/55">
        {meta}
      </p>

      <ul className="mt-2 space-y-1 font-mono text-[11px] leading-snug">
        {items.map(([label, price]) => (
          <li key={label} className="flex items-baseline justify-between gap-3">
            <span>{label}</span>
            <span className="text-ink/45">{price}</span>
          </li>
        ))}
      </ul>

      <div className="my-3 border-t border-dashed border-ink/30" />

      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-ink/55">
          {note}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-ink/70">
          <span
            className={cn(
              "size-1.5",
              statusTone === "copper" && "bg-copper",
              statusTone === "ok" && "bg-[#5d6b4a]",
              statusTone === "neutral" && "bg-ink/30",
            )}
          />
          {status}
        </span>
      </div>
    </article>
  );
}
