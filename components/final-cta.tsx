import { SectionLabel } from "@/components/section-label";

export function FinalCta() {
  const phone = process.env.NEXT_PUBLIC_DACOT_WHATSAPP?.replace(/\D/g, "");
  const whatsappUrl = phone
    ? `https://wa.me/${phone}`
    : undefined;

  return (
    <section id="contato" className="relative overflow-hidden border-t border-line bg-ink-soft">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(55%_60%_at_20%_30%,rgba(185,124,79,0.12),transparent_70%)]" />
      <div className="relative mx-auto max-w-[1440px] px-5 py-24 md:px-10 md:py-32">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7 lg:pr-10" data-reveal>
            <SectionLabel index="04">Próximo passo</SectionLabel>
            <h2 className="mt-8 font-display text-[clamp(2.4rem,5.2vw,4.6rem)] font-medium leading-[0.98] tracking-[-0.045em] text-fg">
              Conheça o<br /><span className="text-copper-soft">DACOT</span>
            </h2>
            <p className="mt-8 max-w-[44ch] text-[15.5px] leading-[1.7] text-muted md:text-[16.5px]">
              Fale com a gente pelo WhatsApp e veja como o DACOT Pedidos pode funcionar no seu restaurante.
            </p>
          </div>
          <div id="solicitar-demo" className="scroll-mt-28 lg:col-span-5" data-reveal>
            <div className="w-full max-w-[320px] border-t border-line lg:ml-auto">
              {whatsappUrl ? (
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
                  className="group flex min-h-20 items-center gap-5 border-b border-line py-5 text-fg transition-colors hover:border-copper/50 hover:text-copper-soft">
                  <WhatsAppIcon />
                  <span className="text-[14px] tracking-[-0.01em]">WhatsApp</span>
                  <ContactArrow />
                </a>
              ) : (
                <div aria-disabled="true" className="flex min-h-20 items-center gap-5 border-b border-line py-5 text-muted">
                  <WhatsAppIcon />
                  <div>
                    <span className="block text-[14px] tracking-[-0.01em]">WhatsApp</span>
                    <span className="mt-1 block font-mono text-[8px] uppercase tracking-[0.14em] text-faint">Em breve</span>
                  </div>
                </div>
              )}
              <a href="https://www.instagram.com/dacot.odn/" target="_blank" rel="noopener noreferrer"
                aria-label="Instagram da DACOT: @dacot.odn (abre em nova aba)"
                className="group flex min-h-20 items-center gap-5 border-b border-line py-5 text-fg transition-colors hover:border-copper/50 hover:text-copper-soft">
                <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-copper" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
                </svg>
                <span className="text-[14px] tracking-[-0.01em]">@dacot.odn</span>
                <ContactArrow />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 shrink-0 text-copper" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7a8.5 8.5 0 1 1 16.2-4.1Z" />
      <path d="m8.2 7.5 1.2-.2 1.1 2.5-.9 1.1a8.4 8.4 0 0 0 3.5 3.4l1.1-1 2.4 1.2-.2 1.2c-.2 1-1.3 1.5-2.3 1.2-3.5-1-6.1-3.6-7-6.9-.3-1 .1-2.1 1.1-2.5Z" />
    </svg>
  );
}

function ContactArrow() {
  return (
    <svg viewBox="0 0 16 16" className="ml-auto size-3 shrink-0 text-faint transition-colors group-hover:text-copper-soft" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M4 12 12 4M4 4h8v8" />
    </svg>
  );
}
