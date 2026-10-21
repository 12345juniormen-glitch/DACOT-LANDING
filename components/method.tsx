import { SectionLabel } from "@/components/section-label";

const steps = [
  { index: "01", title: "Dados", copy: "Registre a operação." },
  { index: "02", title: "Problema", copy: "Entenda o que precisa de atenção." },
  { index: "03", title: "Decisão", copy: "Defina o próximo passo." },
  { index: "04", title: "Resultado", copy: "Acompanhe o efeito." },
];

export function Method() {
  return (
    <section id="como-funciona" className="relative overflow-hidden bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <SectionLabel index="02">Como funciona</SectionLabel>
            <h2 className="section-title mt-7 text-fg">
              Do dado à decisão.
              <br />
              Com clareza.
            </h2>
          </div>
        </div>

        <div className="relative mt-16 md:mt-20" data-reveal>
          <div className="absolute inset-x-0 top-0 h-px bg-line" aria-hidden="true">
            <span className="line-grow block h-full w-full bg-copper/60" />
          </div>

          <ol className="grid gap-8 pt-7 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
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

      </div>
    </section>
  );
}
