export function Manifesto() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface/25">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_80%_at_18%_50%,rgba(185,124,79,0.1),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 select-none font-display text-[26rem] font-semibold leading-none tracking-[-0.06em] text-fg/[0.02] lg:block"
      >
        D
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div data-reveal>
          <p className="eyebrow eyebrow-accent">Princípio</p>
          <p className="mt-6 max-w-[21ch] font-display text-[clamp(2.3rem,5.4vw,4.8rem)] font-medium leading-[1.02] tracking-[-0.045em] text-fg">
            Seu restaurante não precisa de mais um sistema. Precisa de{" "}
            <span className="text-copper-soft">menos improviso.</span>
          </p>
        </div>

        <div
          className="mt-10 flex flex-col justify-between gap-3 border-t border-line pt-5 sm:flex-row sm:items-center lg:mt-12"
          data-reveal
        >
          <p className="text-[13px] leading-relaxed text-faint">
            É por isso que a DACOT começa pelo problema, não pelo módulo.
          </p>
          <p className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-faint/80">
            <span className="h-px w-6 bg-copper/60" aria-hidden="true" />
            Princípio de produto · 01
          </p>
        </div>
      </div>
    </section>
  );
}
