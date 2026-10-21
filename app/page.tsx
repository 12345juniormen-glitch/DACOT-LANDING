import { HeroParallax } from "@/components/hero-parallax";
import { screenshots } from "@/lib/hero-screenshots";
import { DemoConfiguration } from "@/components/demo-configuration";
import { Configurator } from "@/components/configurator";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { Method } from "@/components/method";
import { MobileCta } from "@/components/mobile-cta";
import { Modules } from "@/components/modules";
import { MotionRoot } from "@/components/motion-root";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "DACOT",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "Plataforma modular de otimização para restaurantes: pedidos, estoque e análise em módulos independentes.",
  areaServed: "BR",
  inLanguage: "pt-BR",
  publisher: {
    "@type": "Organization",
    name: "DACOT",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-ink pb-[72px] md:pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <SiteHeader />
      <MotionRoot />

      <main id="conteudo">
        <HeroParallax screenshots={screenshots}>
        <Hero />
        <section id="plataforma" className="border-t border-line">
          <div className="mx-auto grid max-w-[1440px] gap-8 px-5 py-24 md:px-10 md:py-32 lg:grid-cols-12">
            <h2 className="section-title lg:col-span-7">A DACOT cresce<br /><span className="text-muted">com a sua operação.</span></h2>
            <p className="max-w-[40ch] text-[16.5px] leading-[1.7] text-muted lg:col-span-5">Uma plataforma modular para restaurantes. Comece com o que precisa e adicione novos módulos conforme o negócio cresce.</p>
          </div>
        </section>
        <Modules />
        </HeroParallax>
        <Method />
        <DemoConfiguration>
          <Configurator />
          <FinalCta />
        </DemoConfiguration>
      </main>

      <SiteFooter />
      <MobileCta />
    </div>
  );
}
