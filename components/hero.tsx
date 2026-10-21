import { ButtonLink } from "@/components/ui/button";
import { HeroParallax, type ProductScreenshot } from "@/components/hero-parallax";

const screenshots: ProductScreenshot[] = [
  { src: "/hero-parallax/01-login.png", label: "Login", alt: "Login do DACOT Pedidos" },
  { src: "/hero-parallax/02-dashboard.png", label: "Dashboard", alt: "Dashboard operacional do DACOT Pedidos" },
  { src: "/hero-parallax/03-pedidos.png", label: "Pedidos", alt: "Acompanhamento operacional de pedidos" },
  { src: "/hero-parallax/04-pedido-detalhes.png", label: "Detalhes", alt: "Detalhes completos de um pedido" },
  { src: "/hero-parallax/05-criar-pedido.png", label: "Novo pedido", alt: "Criação de pedido no DACOT" },
  { src: "/hero-parallax/06-kds.png", label: "Cozinha", alt: "KDS da cozinha com pedidos em produção" },
  { src: "/hero-parallax/07-produtos.png", label: "Produtos", alt: "Catálogo de produtos do restaurante" },
  { src: "/hero-parallax/08-clientes.png", label: "Clientes", alt: "Cadastro de clientes do DACOT" },
  { src: "/hero-parallax/09-cliente-detalhes.png", label: "Cliente", alt: "Histórico de pedidos de uma cliente" },
  { src: "/hero-parallax/10-historico.png", label: "Histórico", alt: "Histórico completo de pedidos" },
  { src: "/hero-parallax/11-auditoria.png", label: "Auditoria", alt: "Linha do tempo auditável de um pedido" },
  { src: "/hero-parallax/12-whatsapp-lista.png", label: "WhatsApp", alt: "Caixa de entrada do WhatsApp integrada" },
  { src: "/hero-parallax/13-whatsapp-conversa.png", label: "Atendimento", alt: "Conversa real de atendimento no WhatsApp" },
  { src: "/hero-parallax/14-usuarios.png", label: "Equipe", alt: "Gestão da equipe e permissões" },
  { src: "/hero-parallax/15-mobile.png", label: "Mobile", alt: "KDS do DACOT em uma tela mobile", mobile: true },
];

export function Hero() {
  return (
    <HeroParallax screenshots={screenshots}>
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
    </HeroParallax>
  );
}
