"use client";

import { useEffect, useRef, useState } from "react";
import { MODULE_OPTIONS, moduleSummary } from "@/lib/contact-mailto";
import { useDemoConfiguration } from "@/components/demo-configuration";
import { cn } from "@/lib/utils";

export function ModulePicker({ invalid }: { invalid: boolean }) {
  const { selected, setSelected } = useDemoConfiguration();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", dismiss);
    return () => document.removeEventListener("pointerdown", dismiss);
  }, [open]);

  return (
    <div ref={root}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          setOpen(false);
          trigger.current?.focus();
        }
      }}
    >
      <label htmlFor="prioridade" id="prioridade-label"
        className="mb-2 block cursor-pointer font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
        O que pesa mais hoje
      </label>
      <button ref={trigger} id="prioridade" type="button"
        aria-expanded={open} aria-controls="modulos-demo"
        aria-labelledby="prioridade-label prioridade-resumo"
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? "prioridade-error" : undefined}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 border-b border-line bg-transparent py-2.5 text-left text-[14px] leading-relaxed text-fg transition-colors focus-visible:border-copper/70">
        <span id="prioridade-resumo" aria-live="polite">
          {moduleSummary(selected) || "Selecione um ou mais módulos"}
        </span>
        <svg viewBox="0 0 12 12" className={cn("size-3 shrink-0 text-copper transition-transform", open && "rotate-180")} fill="none" aria-hidden="true">
          <path d="M2 4.5 6 8.5l4-4" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      </button>
      <div id="modulos-demo" hidden={!open} role="group" aria-labelledby="prioridade-label"
        className="mt-3 border border-line bg-ink-soft">
        {MODULE_OPTIONS.map((module) => {
          const active = selected.includes(module.id);
          return (
            <label key={module.id} className={cn(
              "relative flex min-h-14 cursor-pointer items-center gap-3 border-b border-line p-4 last:border-b-0 transition-colors hover:bg-surface",
              active && "bg-surface",
            )}>
              {active && <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[2px] bg-copper" />}
              <input type="checkbox" name="modules" value={module.id} checked={active}
                onChange={() => setSelected((current) => active
                  ? current.filter((id) => id !== module.id)
                  : [...current, module.id])}
                className="peer sr-only" />
              <span aria-hidden="true" className={cn(
                "flex size-5 shrink-0 items-center justify-center border peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-copper",
                active ? "border-copper bg-copper" : "border-line-strong",
              )}>
                {active && <svg viewBox="0 0 12 12" className="size-2.5 text-ink" fill="none">
                  <path d="M2 6.2 4.6 8.8 10 3.4" stroke="currentColor" strokeWidth="1.6" />
                </svg>}
              </span>
              <span className="text-[13.5px] leading-relaxed text-fg">{module.label}</span>
            </label>
          );
        })}
      </div>
      {invalid && <p id="prioridade-error" role="alert" className="mt-2 text-[12px] text-copper-soft">Selecione pelo menos um módulo.</p>}
    </div>
  );
}
