import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="topo" className="grain relative flex min-h-[100svh] flex-col overflow-hidden bg-ink">
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
        <div className="lg:col-span-12">
          <div className="flex items-center gap-3">
            <span className="pulse-dot size-1.5 shrink-0 bg-copper" aria-hidden="true" />
            <p className="eyebrow text-muted">
              <span className="md:hidden">Plataforma modular</span>
              <span className="hidden md:inline">
                Plataforma modular para restaurantes
              </span>
            </p>
          </div>

          <h1 className="display-xl mt-7 text-fg md:mt-9">
            <span className="block">Menos improviso.</span>
            <span className="block">Mais <span className="text-copper-soft">controle.</span></span>
          </h1>

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
              href="#como-funciona"
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

        </div>
      </div>
    </section>
  );
}
