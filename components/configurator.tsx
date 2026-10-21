"use client";

import { useMemo, useState } from "react";
import { SectionLabel } from "@/components/section-label";
import { cn } from "@/lib/utils";

import type { ModuleId } from "@/lib/contact-mailto";
import { useDemoConfiguration } from "@/components/demo-configuration";

const modules: {
  id: ModuleId;
  index: string;
  name: string;
  short: string;
  covers: string;
}[] = [
  {
    id: "pedidos",
    index: "01",
    name: "Pedidos & Operação",
    short: "Pedidos, preparo e entrega em um fluxo claro.",
    covers: "Operação",
  },
  {
    id: "estoque",
    index: "02",
    name: "Estoque & Compras",
    short: "Controle de insumos e planejamento de compras.",
    covers: "Custo",
  },
  {
    id: "analise",
    index: "03",
    name: "Análise & Decisão",
    short: "Dados para orientar as decisões da operação.",
    covers: "Decisão",
  },
];

const messages: Record<string, string> = {
  none: "Selecione os módulos que fazem sentido para a sua operação.",
  pedidos: "Sua configuração reúne pedidos, preparo e entrega.",
  estoque: "Sua configuração prioriza insumos e compras.",
  analise: "Sua configuração prioriza a leitura dos dados e as decisões.",
  "pedidos,estoque": "Sua configuração conecta a operação ao controle de insumos e compras.",
  "pedidos,analise": "Sua configuração conecta os pedidos à análise da operação.",
  "estoque,analise": "Sua configuração reúne controle de insumos e análise para decidir.",
  "pedidos,estoque,analise": "Sua configuração reúne operação, estoque e decisão em uma plataforma modular.",
};

export function Configurator() {
  const { setSelected: setDemoSelected } = useDemoConfiguration();
  const [selected, setSelected] = useState<Record<ModuleId, boolean>>({
    pedidos: true,
    estoque: false,
    analise: false,
  });

  const activeIds = useMemo(
    () =>
      modules
        .filter((module) => selected[module.id])
        .map((module) => module.id),
    [selected],
  );

  const count = activeIds.length;
  const message =
    count === 0 ? messages.none : messages[activeIds.join(",")] ?? messages.none;
  const coverage = Math.round((count / modules.length) * 100);

  const toggle = (id: ModuleId) => {
    setSelected((current) => ({ ...current, [id]: !current[id] }));
  };

  return (
    <section
      id="montar"
      className="relative overflow-hidden border-t border-line bg-ink-soft"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_20%,rgba(185,124,79,0.07),transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <SectionLabel index="03">Configuração</SectionLabel>
            <h2 className="section-title mt-7 text-fg">
              Monte a DACOT
              <br />
              do tamanho da sua
              <br />
              <span className="text-muted">operação.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2" data-reveal>
            <p className="max-w-[38ch] text-[15.5px] leading-[1.7] text-muted">
              Escolha os módulos que fazem sentido para a sua operação e combine conforme a sua necessidade.
            </p>
          </div>
        </div>

        <div className="mt-14 grid gap-8 md:mt-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7" data-reveal>
            <p className="eyebrow mb-4">Selecione os módulos</p>

            <div className="flex flex-col gap-3" role="group" aria-label="Módulos DACOT">
              {modules.map((module) => {
                const isActive = selected[module.id];
                return (
                  <button
                    key={module.id}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => toggle(module.id)}
                    className={cn(
                      "group relative flex w-full items-start gap-5 border p-5 text-left transition-all duration-300 md:p-6",
                      isActive
                        ? "border-copper/45 bg-surface"
                        : "border-line bg-ink/40 hover:border-line-strong hover:bg-surface/50",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-y-0 left-0 w-[2px] bg-copper transition-opacity duration-300",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                    />

                    <span
                      className={cn(
                        "mt-1 flex size-5 shrink-0 items-center justify-center border transition-colors",
                        isActive
                          ? "border-copper bg-copper"
                          : "border-line-strong group-hover:border-faint",
                      )}
                    >
                      <svg
                        viewBox="0 0 12 12"
                        className={cn(
                          "size-2.5 text-ink transition-opacity",
                          isActive ? "opacity-100" : "opacity-0",
                        )}
                        fill="none"
                        aria-hidden="true"
                      >
                        <path d="M2 6.2 4.6 8.8 10 3.4" stroke="currentColor" strokeWidth="1.6" />
                      </svg>
                    </span>

                    <span className="flex-1">
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
                          Módulo {module.index}
                        </span>
                        <span
                          className={cn(
                            "font-mono text-[9px] uppercase tracking-[0.14em] transition-colors",
                            isActive ? "text-copper" : "text-faint/70",
                          )}
                        >
                          {isActive ? "Incluído" : "Incluir"}
                        </span>
                      </span>

                      <span className="mt-3 block font-display text-[clamp(1.3rem,2.1vw,1.7rem)] font-medium leading-tight tracking-[-0.025em] text-fg">
                        {module.name}
                      </span>

                      <span className="mt-2 block max-w-[42ch] text-[13.5px] leading-relaxed text-muted">
                        {module.short}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28" data-reveal>
              <div className="relative border border-line bg-[linear-gradient(165deg,#171310_0%,#0c0a09_100%)]">
                <CornerMarks />

                <div className="flex items-center justify-between border-b border-line px-5 py-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
                    Sua configuração
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-copper">
                    {String(count).padStart(2, "0")} / 03
                  </span>
                </div>

                <div className="px-5 py-6">
                  <ul className="space-y-0">
                    {modules.map((module) => {
                      const isActive = selected[module.id];
                      return (
                        <li
                          key={module.id}
                          className="flex items-center justify-between gap-3 border-b border-line/70 py-3 first:pt-0"
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={cn(
                                "size-1.5 transition-colors",
                                isActive ? "bg-copper" : "bg-line-strong",
                              )}
                              aria-hidden="true"
                            />
                            <span
                              className={cn(
                                "text-[13px] transition-colors",
                                isActive ? "text-fg" : "text-faint/70",
                              )}
                            >
                              {module.name}
                            </span>
                          </span>
                          <span
                            className={cn(
                              "font-mono text-[8px] uppercase tracking-[0.12em]",
                              isActive ? "text-copper/90" : "text-faint/50",
                            )}
                          >
                            {isActive ? "on" : "off"}
                          </span>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="mt-6">
                    <div className="flex items-baseline justify-between">
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
                        Módulos selecionados
                      </span>
                      <span className="font-mono text-[10px] text-fg/80">
                        {coverage}%
                      </span>
                    </div>
                    <div className="mt-2.5 grid grid-cols-3 gap-1" aria-hidden="true">
                      {modules.map((module) => (
                        <span
                          key={module.id}
                          className={cn(
                            "h-[3px] transition-colors duration-500",
                            selected[module.id] ? "bg-copper" : "bg-line",
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <p
                    aria-live="polite"
                    className="mt-6 min-h-[76px] border-l border-copper/60 pl-4 text-[13.5px] leading-relaxed text-fg/85"
                  >
                    {message}
                  </p>
                </div>

                <div className="border-t border-line px-5 py-5">
                  <a
                    href="#solicitar-demo"
                    onClick={() => setDemoSelected([...activeIds])}
                    className="group flex h-12 w-full items-center justify-between bg-copper px-5 font-mono text-[10.5px] uppercase tracking-[0.15em] text-ink transition-colors hover:bg-copper-soft"
                  >
                    Levar essa configuração
                    <svg viewBox="0 0 16 16" className="size-3.5 transition-transform group-hover:translate-x-1" fill="none" aria-hidden="true">
                      <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
                    </svg>
                  </a>
                  <p className="mt-3 text-center font-mono text-[8.5px] uppercase tracking-[0.12em] text-faint/80">
                    Você fala com quem implanta · sem compromisso
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CornerMarks() {
  return (
    <span aria-hidden="true" className="pointer-events-none absolute inset-0">
      {[
        "left-0 top-0 border-l border-t",
        "right-0 top-0 border-r border-t",
        "left-0 bottom-0 border-l border-b",
        "right-0 bottom-0 border-r border-b",
      ].map((position) => (
        <span key={position} className={cn("absolute size-2 border-copper/50", position)} />
      ))}
    </span>
  );
}
