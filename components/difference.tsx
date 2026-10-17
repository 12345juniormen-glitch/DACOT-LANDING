import { SectionLabel } from "@/components/section-label";

const rows = [
  {
    dimension: "Escopo",
    common: "Pacote fechado. Você paga por tudo.",
    dacot: "Módulos independentes. Você paga pelo que usa.",
  },
  {
    dimension: "Função",
    common: "Registra o que já aconteceu.",
    dacot: "Aponta o que fazer em seguida.",
  },
  {
    dimension: "Estoque",
    common: "Planilha paralela, atualizada à mão.",
    dacot: "Baixa automática pela ficha técnica.",
  },
  {
    dimension: "Relatório",
    common: "Números empilhados, sem prioridade.",
    dacot: "Causa, impacto e ação na mesma tela.",
  },
  {
    dimension: "Implantação",
    common: "Meses de projeto e treinamento.",
    dacot: "Um módulo por vez, no seu ritmo.",
  },
];

export function Difference() {
  return (
    <section id="diferenca" className="relative border-t border-line bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <SectionLabel index="05">Diferença</SectionLabel>
            <h2 className="section-title mt-7 text-fg">
              Não é um PDV
              <br />
              com um gráfico
              <br />
              <span className="text-muted">em cima.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2" data-reveal>
            <p className="max-w-[38ch] text-[15.5px] leading-[1.7] text-muted">
              Sistema comum registra a operação. A DACOT lê a operação — e
              devolve a próxima decisão.
            </p>
          </div>
        </div>

        <div className="mt-14 md:mt-20" data-reveal>
          <div className="hidden grid-cols-[190px_1fr_1fr] gap-8 border-b border-line-strong pb-4 md:grid">
            <span className="eyebrow">Comparação</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
              Sistema comum
            </span>
            <span className="flex items-center gap-2 border-line/70 font-mono text-[9px] uppercase tracking-[0.18em] text-copper md:border-l md:pl-6">
              <span className="size-1 bg-copper" aria-hidden="true" />
              DACOT
            </span>
          </div>

          <div className="border-t border-line md:border-t-0">
            {rows.map((row) => (
              <div
                key={row.dimension}
                className="group grid gap-4 border-b border-line py-6 transition-colors duration-300 hover:bg-surface/40 md:grid-cols-[190px_1fr_1fr] md:items-center md:gap-8 md:py-7"
              >
                <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                  {row.dimension}
                </span>

                <div className="flex items-start gap-3">
                  <span
                    className="mt-[9px] hidden h-px w-3 shrink-0 bg-line-strong md:block"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.16em] text-faint/70 md:hidden">
                      Sistema comum
                    </span>
                    <p className="text-[14px] leading-snug text-faint transition-colors group-hover:text-muted">
                      {row.common}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 md:self-stretch md:border-l md:border-line/70 md:pl-6">
                  <span
                    className="mt-[9px] hidden h-px w-3 shrink-0 bg-copper/60 md:block md:self-center"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.16em] text-copper/80 md:hidden">
                      Dacot
                    </span>
                    <p className="text-[14.5px] leading-snug text-fg/90">
                      {row.dacot}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <blockquote
          className="mt-16 border border-line bg-surface/30 px-6 py-10 md:mt-20 md:px-12 md:py-14"
          data-reveal
        >
          <p className="max-w-[26ch] font-display text-[clamp(1.8rem,3.8vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.04em] text-fg">
            Você não precisa trocar o restaurante inteiro para caber em um
            sistema.
          </p>
          <footer className="mt-6 flex items-center gap-3">
            <span className="h-px w-8 bg-copper/60" aria-hidden="true" />
            <cite className="font-mono text-[9px] uppercase not-italic tracking-[0.18em] text-faint">
              O que a modularidade resolve
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
