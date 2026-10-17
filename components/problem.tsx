import { SectionLabel } from "@/components/section-label";

const failures = [
  {
    time: "19:08",
    event: "O pedido chegou no WhatsApp e não entrou no sistema.",
    tag: "Pedido perdido",
  },
  {
    time: "19:26",
    event: "A cozinha recebeu o mesmo prato duas vezes.",
    tag: "Insumo perdido",
  },
  {
    time: "20:02",
    event: "O repasse do delivery fechou R$ 214 abaixo do vendido.",
    tag: "Margem vazando",
  },
  {
    time: "20:47",
    event: "Acabou a mussarela no meio do serviço.",
    tag: "Ruptura",
  },
  {
    time: "21:30",
    event: "Sobremesa descongelada sem baixa na ficha técnica.",
    tag: "CMV sem controle",
  },
  {
    time: "23:59",
    event: "Fechamento sem saber qual prato realmente deu lucro.",
    tag: "Decisão no escuro",
  },
];

export function Problem() {
  return (
    <section id="problema" className="relative border-t border-line bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5 lg:pr-10">
            <div className="lg:sticky lg:top-32">
              <SectionLabel index="01">O custo do improviso</SectionLabel>

              <h2 className="section-title mt-7 text-fg">
                Não é falta
                <br />
                de sistema.
                <br />
                <span className="text-copper-soft">
                  É falta
                  <br className="hidden sm:block" /> de visão.
                </span>
              </h2>

              <p className="mt-7 max-w-[42ch] text-[15.5px] leading-[1.7] text-muted">
                O PDV registra o que passou. Mas não avisa o que está
                acontecendo agora — nem o que já custou dinheiro.
              </p>

              <div className="mt-8 flex items-center gap-3 border-t border-line pt-5">
                <span className="size-1.5 bg-rust" aria-hidden="true" />
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-faint">
                  Seis falhas comuns em um único sábado
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="border border-line bg-ink-soft/60">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-5 py-4 md:px-7">
                <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-faint">
                  Registro · Sábado, 12/10
                </span>
                <span className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint/70">
                  19:08 — 23:59
                </span>
              </div>

              <ol>
                {failures.map((failure, index) => (
                  <li
                    key={failure.time}
                    data-reveal
                    style={{ "--reveal-delay": `${index * 70}ms` } as React.CSSProperties}
                    className="group relative grid grid-cols-[54px_1fr] gap-x-4 gap-y-2 border-b border-line px-5 py-5 transition-colors duration-300 last:border-b-0 hover:bg-surface/60 md:grid-cols-[64px_1fr_auto] md:items-center md:px-7 md:py-6"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-copper transition-transform duration-500 group-hover:scale-y-100"
                    />
                    <span className="font-mono text-[11px] tracking-[0.06em] text-faint">
                      {failure.time}
                    </span>
                    <p className="text-[14.5px] leading-snug text-fg/90 transition-colors group-hover:text-fg">
                      {failure.event}
                    </p>
                    <span className="col-start-2 flex items-center gap-2 md:col-start-3 md:justify-end">
                      <span className="size-1 bg-rust/80" aria-hidden="true" />
                      <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.13em] text-faint">
                        {failure.tag}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>

              <div className="flex flex-col justify-between gap-2 border-t border-line bg-surface/40 px-5 py-4 sm:flex-row sm:items-center md:px-7">
                <p className="text-[13px] text-muted">
                  Nenhuma dessas falhas aparece no relatório do PDV.
                </p>
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-copper">
                  6 falhas / 1 turno
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
