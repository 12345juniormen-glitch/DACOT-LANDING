import { SectionLabel } from "@/components/section-label";

const steps = [
  {
    index: "01",
    title: "Dados",
    copy: "Pedidos, vendas, fichas técnicas e compras entram em um só lugar.",
  },
  {
    index: "02",
    title: "Diagnóstico",
    copy: "O que aconteceu é comparado com o que deveria ter acontecido.",
  },
  {
    index: "03",
    title: "Recomendação",
    copy: "O problema aparece com causa, impacto e prioridade.",
  },
  {
    index: "04",
    title: "Execução",
    copy: "Preço, compra, ficha técnica ou rotina. Ajustado dentro da DACOT.",
  },
  {
    index: "05",
    title: "Resultado",
    copy: "O efeito é medido. A próxima decisão parte do que funcionou.",
  },
];

export function Method() {
  return (
    <section id="plataforma" className="relative overflow-hidden bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <SectionLabel index="02">O método</SectionLabel>
            <h2 className="section-title mt-7 text-fg">
              Do dado à decisão.
              <br />
              Sem etapa pulada.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2" data-reveal>
            <p className="max-w-[40ch] text-[15.5px] leading-[1.7] text-muted">
              A DACOT não entrega um painel para você interpretar. Ela lê a
              operação, encontra o que está custando dinheiro e aponta o que
              fazer — na ordem certa.
            </p>
          </div>
        </div>

        <div className="relative mt-16 md:mt-20" data-reveal>
          <div className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true">
            <span className="line-grow block h-full w-full bg-copper/60" />
          </div>

          <ol className="grid gap-8 pt-7 sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
            {steps.map((step, index) => (
              <li
                key={step.index}
                className="relative lg:px-6 lg:first:pl-0 lg:last:pr-0"
                data-reveal
                style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}
              >
                <span
                  className="absolute -top-[30px] left-0 size-1.5 bg-copper lg:left-6 lg:first:left-0"
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] tracking-[0.18em] text-faint">
                  {step.index}
                </span>
                <h3 className="mt-3 font-display text-[22px] font-medium tracking-[-0.02em] text-fg">
                  {step.title}
                </h3>
                <p className="mt-3 text-[13.5px] leading-relaxed text-muted">
                  {step.copy}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* recommendation artifact */}
        <div
          className="mt-16 border border-line bg-[linear-gradient(160deg,#15120f_0%,#0d0b0a_100%)] md:mt-20"
          data-reveal
        >
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 md:px-8">
            <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-copper">
              Exemplo de recomendação
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint/70">
              Ontem, 23:58 · módulo análise
            </span>
          </div>

          <div className="grid gap-0 lg:grid-cols-12">
            <div className="border-b border-line px-5 py-8 md:px-8 md:py-10 lg:col-span-7 lg:border-b-0 lg:border-r">
              <h3 className="max-w-[24ch] font-display text-[clamp(1.5rem,2.6vw,2.15rem)] font-medium leading-[1.15] tracking-[-0.03em] text-fg">
                O frango vende bem.
                <br />
                E está dando prejuízo.
              </h3>

              <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-3">
                <Metric label="Margem do prato" value="6,2%" tone="bad" />
                <Metric label="Custo do insumo" value="+18%" detail="em 21 dias" tone="bad" />
                <Metric label="Impacto estimado" value="R$ 1.240" detail="por mês" tone="copper" />
              </div>

              <p className="mt-8 max-w-[52ch] border-l-2 border-copper/70 pl-4 text-[13.5px] leading-relaxed text-faint">
                Leitura simulada com dados de exemplo. Na sua operação, os
                números são os seus.
              </p>
            </div>

            <div className="flex flex-col px-5 py-8 md:px-8 md:py-10 lg:col-span-5">
              <p className="eyebrow">Recomendação priorizada</p>
              <p className="mt-4 text-[15px] leading-relaxed text-fg/90">
                Ajustar o preço de <span className="text-fg">R$ 52</span> para{" "}
                <span className="text-copper-soft">R$ 58</span> ou reduzir a
                porção em <span className="text-fg">40 g</span>. Impacto maior
                no preço, com menor risco de percepção.
              </p>

              <p className="mt-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-copper">
                <span className="size-1 bg-copper" aria-hidden="true" />
                Prioridade 1 de 3 · impacto R$ 1.240/mês
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <span className="inline-flex h-10 items-center gap-2 bg-copper px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-ink">
                  Aplicar ajuste
                  <svg viewBox="0 0 12 12" className="size-3" fill="none" aria-hidden="true">
                    <path d="M1 6h9M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.2" />
                  </svg>
                </span>
                <span className="inline-flex h-10 items-center border border-line px-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  Ver ficha técnica
                </span>
              </div>

              <p className="mt-auto border-t border-line/70 pt-5 text-[12px] leading-relaxed text-faint lg:mt-10">
                Você aprova. A DACOT registra a decisão e acompanha o efeito no
                fechamento.
              </p>
            </div>
          </div>
        </div>

        <p className="mt-6 flex items-center gap-3 font-mono text-[9.5px] uppercase tracking-[0.15em] text-faint/80">
          <svg viewBox="0 0 16 16" className="size-3.5 text-copper" fill="none" aria-hidden="true">
            <path
              d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9M13.5 1.5v3h-3"
              stroke="currentColor"
              strokeWidth="1.2"
            />
          </svg>
          O ciclo não termina no resultado. Termina em um dado melhor.
        </p>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  detail,
  tone,
}: {
  label: string;
  value: string;
  detail?: string;
  tone: "bad" | "copper";
}) {
  return (
    <div>
      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint">
        {label}
      </p>
      <p
        className={
          tone === "bad"
            ? "mt-2 font-display text-[26px] font-medium leading-none tracking-[-0.03em] text-rust"
            : "mt-2 font-display text-[26px] font-medium leading-none tracking-[-0.03em] text-copper-soft"
        }
      >
        {value}
        {detail && (
          <span className="ml-1.5 font-mono text-[9px] uppercase tracking-[0.1em] text-faint">
            {detail}
          </span>
        )}
      </p>
    </div>
  );
}
