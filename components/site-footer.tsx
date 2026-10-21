import Link from "next/link";
import { BrandMark, Wordmark } from "@/components/brand";

const columns = [
  {
    title: "Plataforma",
    links: [
      ["Plataforma", "#plataforma"],
      ["Módulos", "#modulos"],
      ["Monte a sua", "#montar"],
      ["Como funciona", "#como-funciona"],
    ],
  },
  {
    title: "Módulos",
    links: [
      ["Pedidos & Operação", "#modulos"],
      ["Estoque & Compras", "#modulos"],
      ["Análise & Decisão", "#modulos"],
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="grid gap-12 py-14 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link href="#topo" className="inline-flex items-center gap-3" aria-label="DACOT — início">
              <BrandMark className="text-fg" />
              <Wordmark />
            </Link>
            <p className="mt-5 max-w-[30ch] text-[13.5px] leading-relaxed text-faint">
              Plataforma de otimização para restaurantes. Operação, estoque e
              decisão — em módulos independentes.
            </p>
            <a
              href="#contato"
              className="mt-6 inline-flex items-center gap-2 border-b border-line pb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-copper/60 hover:text-fg"
            >
              Falar no WhatsApp
            </a>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-7">
            {columns.map((column) => (
              <nav key={column.title} aria-label={column.title}>
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
                  {column.title}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map(([label, href]) => (
                    <li key={label}>
                      <Link
                        href={href}
                        className="text-[13px] text-muted transition-colors hover:text-fg"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-faint">
                Contato
              </p>
              <ul className="mt-4 space-y-2.5">
                <li>
                  <Link
                    href="#contato"
                    className="text-[13px] text-muted transition-colors hover:text-fg"
                  >
                    Agendar uma demo
                  </Link>
                </li>
                <li>
                  <a
                    href="#contato"
                    className="text-[13px] text-muted transition-colors hover:text-fg"
                  >
                    Falar com o time
                  </a>
                </li>
              </ul>
              <p className="mt-6 max-w-[20ch] text-[11.5px] leading-relaxed text-faint/80">
                Atendimento online em todo o Brasil.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-line py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint/80">
            © 2026 DACOT · Todos os direitos reservados
          </p>
          <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-faint/80">
            Feito para quem opera
          </p>
          <Link
            href="#topo"
            className="group inline-flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-muted transition-colors hover:text-fg"
          >
            Voltar ao topo
            <svg
              viewBox="0 0 16 16"
              className="size-3 transition-transform group-hover:-translate-y-0.5"
              fill="none"
              aria-hidden="true"
            >
              <path d="M8 14V2M3 7l5-5 5 5" stroke="currentColor" strokeWidth="1.3" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1440px] px-5 md:px-10">
        <div className="relative -mb-3 flex select-none items-baseline overflow-hidden pt-2 md:-mb-6">
          <span className="font-display text-[clamp(4.5rem,17vw,15rem)] font-semibold leading-[0.72] tracking-[-0.055em] text-fg/[0.07]">
            DACOT
          </span>
        </div>
      </div>
    </footer>
  );
}
