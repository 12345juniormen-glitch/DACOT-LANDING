import Link from "next/link";
import { SectionLabel } from "@/components/section-label";

const modules = [
  { index: "01", title: "Pedidos & Operação", tag: "Disponível agora", problem: "Organize os pedidos e acompanhe o fluxo de preparo e entrega." },
  { index: "02", title: "Estoque & Compras", tag: "Em desenvolvimento", problem: "O próximo passo para o controle de insumos e compras." },
  { index: "03", title: "Análise & Decisão", tag: "Em desenvolvimento", problem: "Uma visão dos dados para apoiar as próximas decisões." },
];

export function Modules() {
  return (
    <section id="modulos" className="relative border-t border-line">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <SectionLabel index="01">Os módulos</SectionLabel>
            <h2 className="section-title mt-7 text-fg">
              Uma plataforma.
              <br />
              Módulos que
              <br />
              <span className="text-muted">acompanham você.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2" data-reveal>
            <p className="max-w-[38ch] text-[15.5px] leading-[1.7] text-muted">
              Comece com Pedidos & Operação. Estoque & Compras e Análise & Decisão estão em desenvolvimento.
            </p>
          </div>
        </div>

        <div className="mt-14 md:mt-20">
          {modules.map((module, index) => (
            <article
              key={module.index}
              className="group relative border-t border-line last:border-b"
              data-reveal
              style={{ "--reveal-delay": `${index * 60}ms` } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-px origin-top scale-y-0 bg-copper/80 transition-transform duration-700 group-hover:scale-y-100"
              />

              <div className="grid gap-8 py-10 transition-colors duration-500 md:py-14 lg:grid-cols-12 lg:gap-10">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] tracking-[0.18em] text-copper">
                      {module.index}
                    </span>
                    <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-faint">
                      {module.tag}
                    </span>
                  </div>

                  <h3 className="mt-5 max-w-[14ch] font-display text-[clamp(1.65rem,2.8vw,2.3rem)] font-medium leading-[1.05] tracking-[-0.035em] text-fg">
                    {module.title}
                  </h3>

                </div>

                <div className="lg:col-span-7 lg:pt-1">
                  <p className="max-w-[38ch] text-[15px] leading-[1.6] text-muted">
                    {module.problem}
                  </p>
                </div>

              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <Link
            href="#montar"
            className="group inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-copper-soft"
          >
            Ver como combinar
            <svg viewBox="0 0 16 16" className="size-3.5 transition-transform group-hover:translate-y-0.5" fill="none" aria-hidden="true">
              <path d="M8 2v11M3.5 9 8 13.5 12.5 9" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
