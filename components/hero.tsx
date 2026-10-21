import { ButtonLink } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="topo" className="relative flex min-h-[100svh] items-center">
      <div className="mx-auto w-full max-w-[1440px] px-5 pb-10 pt-[108px] md:px-10 lg:pb-12 lg:pt-[112px]">
        <div className="lg:max-w-[85%]">
          <div className="flex items-center gap-3">
            <span className="pulse-dot size-1.5 shrink-0 bg-copper" aria-hidden="true" />
            <p className="eyebrow text-muted">Plataforma modular para restaurantes</p>
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
