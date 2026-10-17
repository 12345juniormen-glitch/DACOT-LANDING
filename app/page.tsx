import { Configurator } from "@/components/configurator";
import { Difference } from "@/components/difference";
import { FinalCta } from "@/components/final-cta";
import { Hero } from "@/components/hero";
import { Manifesto } from "@/components/manifesto";
import { Method } from "@/components/method";
import { MobileCta } from "@/components/mobile-cta";
import { Modules } from "@/components/modules";
import { MotionRoot } from "@/components/motion-root";
import { Problem } from "@/components/problem";
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
    email: "contato@dacot.com.br",
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
        <Hero />
        <Problem />
        <Manifesto />
        <Method />
        <Modules />
        <Configurator />
        <Difference />
        <FinalCta />
      </main>

      <SiteFooter />
      <MobileCta />
    </div>
  );
}
