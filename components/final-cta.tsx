"use client";

import { useState } from "react";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";
import {
  buildDemoMailto,
  CONTACT_EMAIL as EMAIL,
  PRIORITIES,
} from "@/lib/contact-mailto";

export function FinalCta() {
  const [ready, setReady] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    window.location.href = buildDemoMailto({
      nome: String(data.get("nome") ?? ""),
      restaurante: String(data.get("restaurante") ?? ""),
      whatsapp: String(data.get("whatsapp") ?? ""),
      prioridade: String(data.get("prioridade") ?? ""),
    });
    setReady(true);
  }

  return (
    <section
      id="contato"
      className="relative overflow-hidden border-t border-line bg-ink-soft"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_20%_30%,rgba(185,124,79,0.12),transparent_70%)]"
      />
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7 lg:pr-10" data-reveal>
            <SectionLabel index="06">Próximo passo</SectionLabel>

            <h2 className="mt-8 font-display text-[clamp(2.4rem,5.2vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em] text-fg">
              Vamos olhar a sua
              <br />
              operação
              <br />
              <span className="text-copper-soft">de verdade.</span>
            </h2>

            <p className="mt-8 max-w-[44ch] text-[15.5px] leading-[1.7] text-muted md:text-[16.5px]">
              Uma demo de 30 minutos, com os seus números. Sem tour por 40
              telas: a gente olha onde o dinheiro está parando e o que dá para
              resolver primeiro.
            </p>

            <ul className="mt-9 flex flex-col gap-3">
              {[
                "Com dados do seu restaurante",
                "Direto com quem implanta",
                "Sem compromisso de contratação",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 text-[13.5px] text-fg/85"
                >
                  <svg
                    viewBox="0 0 12 12"
                    className="size-3 shrink-0 text-copper"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path d="M2 6.5 4.5 9 10 3.5" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-10 border-t border-line pt-6">
              <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
                Prefere escrever direto
              </p>
              <a
                href={`mailto:${EMAIL}`}
                className="group mt-2 inline-flex items-center gap-3 font-display text-[19px] tracking-[-0.01em] text-fg transition-colors hover:text-copper-soft md:text-[21px]"
              >
                {EMAIL}
                <svg
                  viewBox="0 0 16 16"
                  className="size-4 text-copper transition-transform group-hover:translate-x-1"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </a>
              <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.14em] text-faint/80">
                Atendimento online · restaurantes em todo o Brasil
              </p>
            </div>
          </div>

          <div className="lg:col-span-5" data-reveal>
            <div className="relative border border-line bg-[linear-gradient(165deg,#171310_0%,#0c0a09_100%)] p-6 md:p-8">
              <div className="flex items-baseline justify-between gap-4 border-b border-line pb-4">
                <h3 className="font-display text-[19px] font-medium tracking-[-0.02em] text-fg">
                  Solicitar demo
                </h3>
                <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-faint">
                  Resposta em até 1 dia útil
                </span>
              </div>

              <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-5">
                <Field id="nome" label="Nome" placeholder="Como te chamamos" />
                <Field
                  id="restaurante"
                  label="Restaurante"
                  placeholder="Nome do restaurante"
                />
                <Field
                  id="whatsapp"
                  label="WhatsApp"
                  placeholder="(00) 00000-0000"
                  type="tel"
                  inputMode="tel"
                />

                <div>
                  <label
                    htmlFor="prioridade"
                    className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-faint"
                  >
                    O que pesa mais hoje
                  </label>
                  <div className="relative">
                    <select
                      id="prioridade"
                      name="prioridade"
                      defaultValue="operacao"
                      className="w-full appearance-none border-b border-line bg-transparent py-2.5 pr-7 text-[14px] text-fg outline-none transition-colors focus:border-copper/70"
                    >
                      {PRIORITIES.map((item) => (
                        <option key={item.value} value={item.value} className="bg-ink">
                          {item.label}
                        </option>
                      ))}
                    </select>
                    <svg
                      viewBox="0 0 12 12"
                      className="pointer-events-none absolute right-0 top-1/2 size-3 -translate-y-1/2 text-copper"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path d="M2 4.5 6 8.5l4-4" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </div>
                </div>

                <Button type="submit" size="lg" className="mt-2 w-full justify-between">
                  Preparar solicitação
                  <svg viewBox="0 0 16 16" className="size-3.5" fill="none" aria-hidden="true">
                    <path d="M1 8h13M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
                  </svg>
                </Button>

                <p aria-live="polite" className="min-h-[32px] text-[11.5px] leading-relaxed text-faint">
                  {ready
                    ? "Sua solicitação foi preparada no e-mail. Se a janela não abrir, escreva para contato@dacot.com.br."
                    : "Abrimos seu e-mail com os dados preenchidos. Você decide se envia."}
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
  inputMode,
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[9px] uppercase tracking-[0.16em] text-faint"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        required
        placeholder={placeholder}
        autoComplete={
          id === "nome" ? "name" : id === "whatsapp" ? "tel" : "organization"
        }
        className="w-full border-b border-line bg-transparent py-2.5 text-[14px] text-fg outline-none transition-colors placeholder:text-faint/60 focus:border-copper/70"
      />
    </div>
  );
}
