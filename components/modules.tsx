import Link from "next/link";
import { SectionLabel } from "@/components/section-label";

const modules = [
  {
    index: "01",
    title: "Pedidos & Operação",
    tag: "Tempo real",
    problem:
      "O pedido entra por três canais e a cozinha descobre por um só.",
    outcomes: [
      "Salão, delivery e balcão em uma única fila de preparo.",
      "Status visível para quem cozinha e para quem serve.",
      "Repasse e fechamento de caixa conferidos no fim do turno.",
    ],
    schematic: <OrdersSchematic />,
  },
  {
    index: "02",
    title: "Estoque & Compras",
    tag: "Custo por prato",
    problem:
      "A falta de insumo aparece no meio do serviço. A compra é feita no achismo.",
    outcomes: [
      "Baixa automática pela ficha técnica a cada venda.",
      "Alerta de ruptura antes de o prato acabar.",
      "Lista de compra calculada pelo consumo real.",
    ],
    schematic: <StockSchematic />,
  },
  {
    index: "03",
    title: "Análise & Decisão",
    tag: "Decisão",
    problem:
      "Relatório bonito, muitas colunas, nenhuma resposta.",
    outcomes: [
      "Margem real por prato, canal e horário.",
      "CMV comparado com o preço praticado.",
      "Recomendações priorizadas por impacto.",
    ],
    schematic: <AnalysisSchematic />,
  },
];

export function Modules() {
  return (
    <section id="modulos" className="relative border-t border-line bg-ink">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" data-reveal>
            <SectionLabel index="03">Os módulos</SectionLabel>
            <h2 className="section-title mt-7 text-fg">
              Três módulos.
              <br />
              Nenhuma dependência
              <br />
              <span className="text-muted">obrigatória.</span>
            </h2>
          </div>
          <div className="lg:col-span-5 lg:pb-2" data-reveal>
            <p className="max-w-[38ch] text-[15.5px] leading-[1.7] text-muted">
              Cada um resolve um problema específico. Você pode começar por
              qualquer um — e incluir os outros quando a operação pedir.
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
                <div className="lg:col-span-4">
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

                  <p className="mt-5 max-w-[32ch] text-[15px] leading-[1.6] text-muted">
                    {module.problem}
                  </p>
                </div>

                <div className="lg:col-span-5 lg:pt-1">
                  <p className="eyebrow">O que muda</p>
                  <ul className="mt-4 space-y-3.5">
                    {module.outcomes.map((outcome) => (
                      <li
                        key={outcome}
                        className="flex gap-3 text-[14px] leading-relaxed text-fg/85"
                      >
                        <span
                          className="mt-[8px] size-1 shrink-0 bg-copper"
                          aria-hidden="true"
                        />
                        {outcome}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-7 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.12em] text-faint">
                    <svg
                      viewBox="0 0 12 12"
                      className="size-3 text-copper/80"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 6.5 4.5 9 10 3.5"
                        stroke="currentColor"
                        strokeWidth="1.3"
                      />
                    </svg>
                    Funciona sozinho · ganha força com os outros
                  </p>
                </div>

                <div className="lg:col-span-3">{module.schematic}</div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[9.5px] uppercase tracking-[0.14em] text-faint">
            Sem taxa de adesão por módulo · sem fidelidade de pacote
          </p>
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

function PanelShell({
  title,
  meta,
  children,
  footer,
}: {
  title: string;
  meta: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <div className="h-full border border-line bg-ink-soft/70">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-faint">
          {title}
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-faint/70">
          <span className="size-1 bg-copper/80" aria-hidden="true" />
          {meta}
        </span>
      </div>
      <div className="px-4 py-4">{children}</div>
      <div className="border-t border-line px-4 py-3 font-mono text-[8px] uppercase tracking-[0.12em] text-faint/80">
        {footer}
      </div>
    </div>
  );
}

function OrdersSchematic() {
  const rows = [
    { label: "Mesa 04", value: "Pronto", tone: "copper" },
    { label: "Delivery #4813", value: "03:12", tone: "muted" },
    { label: "Balcão #4814", value: "Novo", tone: "muted" },
  ];

  return (
    <PanelShell title="Fila de preparo" meta="agora" footer="Perdidos 00 · repasse conferido">
      <div className="space-y-3">
        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between border-b border-line/60 pb-2.5 last:border-b-0 last:pb-0"
          >
            <span className="font-mono text-[9.5px] text-fg/80">{row.label}</span>
            <span
              className={
                row.tone === "copper"
                  ? "font-mono text-[8px] uppercase tracking-[0.1em] text-copper"
                  : "font-mono text-[8px] uppercase tracking-[0.1em] text-faint"
              }
            >
              {row.value}
            </span>
          </div>
        ))}
        <div className="mt-4 space-y-2">
          {[92, 64, 38].map((width, index) => (
            <div key={index} className="h-[2px] w-full bg-line/60">
              <span
                className="block h-full bg-copper/70"
                style={{ width: `${width}%` }}
              />
            </div>
          ))}
        </div>
      </div>
    </PanelShell>
  );
}

function StockSchematic() {
  const rows = [
    { label: "Mussarela", value: "1,2 / 2,0 kg", width: 26, alert: true },
    { label: "Frango", value: "8,4 kg", width: 72, alert: false },
    { label: "Arroz", value: "12,0 kg", width: 58, alert: false },
  ];

  return (
    <PanelShell title="Estoque crítico" meta="3 itens" footer="CMV 31,4% · compra sugerida: 4 itens">
      <div className="space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="font-mono text-[9.5px] text-fg/80">{row.label}</span>
              <span
                className={
                  row.alert
                    ? "font-mono text-[8px] tracking-[0.06em] text-rust"
                    : "font-mono text-[8px] tracking-[0.06em] text-faint"
                }
              >
                {row.value}
              </span>
            </div>
            <div className="mt-2 h-[3px] w-full bg-line/60">
              <span
                className={row.alert ? "block h-full bg-rust/80" : "block h-full bg-fg/25"}
                style={{ width: `${row.width}%` }}
              />
            </div>
            {row.alert && (
              <p className="mt-1.5 font-mono text-[7.5px] uppercase tracking-[0.15em] text-rust/90">
                Ruptura prevista · hoje
              </p>
            )}
          </div>
        ))}
      </div>
    </PanelShell>
  );
}

function AnalysisSchematic() {
  return (
    <PanelShell title="Margem · 7 dias" meta="+1,8 pp" footer="1 recomendação prioritária">
      <svg viewBox="0 0 140 48" className="h-12 w-full" fill="none" aria-hidden="true">
        <path d="M0 38H140" stroke="rgba(236,229,219,0.1)" strokeWidth="0.6" />
        <path d="M0 24H140" stroke="rgba(236,229,219,0.06)" strokeWidth="0.6" />
        <path
          d="M2 37 18 33 34 35 50 27 66 29 82 21 98 24 114 15 132 11"
          stroke="var(--color-copper)"
          strokeWidth="1.3"
        />
        <path
          d="M2 37 18 33 34 35 50 27 66 29 82 21 98 24 114 15 132 11V46H2Z"
          fill="url(#spark)"
        />
        <defs>
          <linearGradient id="spark" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="rgba(185,124,79,0.28)" />
            <stop offset="1" stopColor="rgba(185,124,79,0)" />
          </linearGradient>
        </defs>
        <circle cx="132" cy="11" r="2" fill="var(--color-copper)" />
      </svg>

      <div className="mt-4 space-y-2.5">
        {[
          ["Margem", "12,4%", "text-fg"],
          ["CMV", "31,4%", "text-muted"],
          ["Rupturas", "3", "text-rust"],
        ].map(([label, value, tone]) => (
          <div key={label} className="flex items-center justify-between">
            <span className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-faint">
              {label}
            </span>
            <span className={`font-mono text-[10px] ${tone}`}>{value}</span>
          </div>
        ))}
      </div>
    </PanelShell>
  );
}
