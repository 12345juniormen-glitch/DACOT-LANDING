# DACOT — Landing page premium

Documento de design, copy e implementação da landing da DACOT.
Stack: Next.js (App Router) + TypeScript + Tailwind CSS v4 + componentes no padrão shadcn/ui.

---

## 1. Posicionamento

**DACOT é uma plataforma de otimização para restaurantes.** Não é "mais um PDV".

| | |
|---|---|
| Foco | operação, estoque, análise e decisão |
| Promessa | organizar a operação, dar visibilidade e transformar dado em ação |
| Diferencial | modularidade real: o cliente compra só o que precisa |
| Tom | direto, inteligente, confiável, operacional |

Mensagens comerciais que atravessam a página:

- "Escolha só o que o seu restaurante precisa."
- "Sem pagar por um sistema inteiro se um módulo já resolve."
- "Os módulos funcionam sozinhos, mas ficam mais poderosos juntos."

**Anti-referências (o que a página deliberadamente não é):** template SaaS genérico, site de agência, "IA fez em 5 minutos", dashboard aleatório, ilustração genérica.

---

## 2. Proposta visual

### Paleta

| Token | Hex | Uso |
|---|---|---|
| `--color-ink` | `#0a0908` | fundo dominante |
| `--color-ink-soft` | `#0e0c0a` | seções alternadas |
| `--color-surface` | `#14110f` | painéis, cartões |
| `--color-surface-2` | `#1b1714` | camadas elevadas |
| `--color-paper` | `#efe8dd` | comanda / bilhete térmico |
| `--color-fg` | `#ece5db` | texto principal |
| `--color-muted` | `#a1968a` | texto secundário |
| `--color-faint` | `#8b8177` | rótulos mono, legendas |
| `--color-copper` | `#b97c4f` | acento marrom/cobre |
| `--color-copper-soft` | `#d3a37d` | acento em texto grande |
| `--color-rust` | `#bb5a41` | sinais de falha / perda |
| `--color-line` | `rgba(236,229,219,.10)` | fios de 1px |

Regras: cobre em dose pequena (fios, marcadores, uma palavra por título). Vermelho-ferrugem só sinaliza perda. Nada de gradiente chamativo — as duas únicas manchas de luz são radiais quase imperceptíveis nos extremos das seções.

### Tipografia

- **Display** — Archivo, 400–700. Títulos com `letter-spacing: -0.045em` e `line-height` 0.86–1.0. O peso vem do tamanho, não do negrito.
- **Texto** — Instrument Sans. Corpo 13–18px, `line-height` 1.6–1.7.
- **Rótulos e dados** — JetBrains Mono em caixa alta, `tracking` 0.12–0.22em. É o que dá o caráter operacional: parecem etiquetas de sistema, não decoração.

Escala: `display-xl` (hero, `clamp(3.2rem, 8.4vw, 7.3rem)`), `section-title` (`clamp(2.35rem, 5.2vw, 4.4rem)`), corpo 13–18px, mono 8–11px.

### Superfícies e formas

- Raio de borda: **2px no máximo** (botões), cantos retos em painéis e cartões.
- Nada de sombra colorida nem glow: profundidade vem de camada + fio de 1px + leve diferença de luminância.
- Texturas: grade de "blueprint" a 3% no hero e no CTA final; grão SVG (`feTurbulence`, blend overlay) no hero.
- Estado ativo: fio de cobre de 2px na lateral, fundo sobe um passo, rótulo mono troca de cor.

### Movimento (com propósito)

| Efeito | Onde | Como |
|---|---|---|
| Parallax de profundidade | hero | comandas com velocidades diferentes conforme o scroll (`data-depth`) |
| Tilt 3D suave | hero | `rotateX/rotateY` interpolado com o ponteiro, em `< 5°` |
| Revelação no scroll | todas as seções | `IntersectionObserver` + `data-reveal`, deslocamento de 20px, stagger de 60–90ms |
| Fio que cresce | método, módulos, comparação | `scaleX/scaleY` de 0 para 1 em 300–1200ms |
| Leitura dinâmica | configurador | mensagem e cobertura mudam com a seleção |

Tudo respeita `prefers-reduced-motion: reduce` (revelações aparecem prontas, animações desligadas).

---

## 3. Estrutura e copy

### 1. Hero — "Menos incêndio. Mais operação."

- Rótulo: `Plataforma de otimização para restaurantes`
- Título: **Menos incêndio.** / **Mais `operação.`** (a palavra `operação` em cobre)
- Subheadline: "A DACOT organiza pedidos, estoque e decisões do seu restaurante. Você contrata só o módulo que precisa — e cresce quando quiser."
- CTA primário: **Agendar uma demo** · CTA secundário: **Entender o método**
- Linha de confiança: Sem pacote fechado · Implantação por módulo · Feito para o Brasil
- Visual: painel "Passe · turno noite" com três comandas (salão, delivery, balcão) em camadas, com parallax e tilt. Mensagem: *um pedido, três pontos de controle*.
- Faixa inferior (linguagem de sistema operacional): "Escolha só o que o seu restaurante precisa" + `01 Pedidos & Operação / 02 Estoque & Compras / 03 Análise & Decisão`.

### 2. O problema — "Não é falta de sistema. É falta de visão."

Registro de um sábado, 19:08–23:59, seis falhas reais: pedido perdido, insumo perdido, margem vazando, ruptura, CMV sem controle, decisão no escuro. Fecho: **"Nenhuma dessas falhas aparece no relatório do PDV."**

### 3. Manifesto — "Seu restaurante não precisa de mais um sistema. Precisa de menos improviso."

Faixa de transição entre problema e método, com marca d'água "D" no fundo.

### 4. Método — "Do dado à decisão. Sem etapa pulada."

`01 Dados → 02 Diagnóstico → 03 Recomendação → 04 Execução → 05 Resultado`, com fio de cobre que cresce no scroll.

Prova concreta (rótulo "exemplo de recomendação"): "O frango vende bem. E está dando prejuízo." — margem 6,2%, insumo +18% em 21 dias, impacto R$ 1.240/mês, recomendação priorizada e ação. Nota explícita: leitura simulada com dados de exemplo.

### 5. Módulos — "Três módulos. Nenhuma dependência obrigatória."

Cada linha traz **o problema**, **o que muda** e um fragmento de produto (fila de preparo, estoque crítico, margem em 7 dias).

- `01 Pedidos & Operação` — "O pedido entra por três canais e a cozinha descobre por um só."
- `02 Estoque & Compras` — "A falta de insumo aparece no meio do serviço. A compra é feita no achismo."
- `03 Análise & Decisão` — "Relatório bonito, muitas colunas, nenhuma resposta."

### 6. Monte a sua DACOT — "Monte a DACOT do tamanho da sua operação."

Configurador interativo: ligar/desligar módulos recalcula cobertura do ciclo e reescreve a leitura, incluindo as combinações ("Ficha técnica cruzada com a venda: baixa automática, compra calculada e menos desperdício."). CTA leva a configuração para o contato.

### 7. Diferença — "Não é um PDV com um gráfico em cima."

Comparação em cinco dimensões (escopo, função, estoque, relatório, implantação) contra o "sistema comum", com separador de coluna em cobre. Fecho: **"Você não precisa trocar o restaurante inteiro para caber em um sistema."**

### 8. Próximo passo — "Vamos olhar a sua operação de verdade."

Demo de 30 minutos com os dados do restaurante, direto com quem implanta, sem compromisso. Formulário mínimo (nome, restaurante, WhatsApp, prioridade) que monta o e-mail para `contato@dacot.com.br`. Alternativa de contato direto e horário de resposta (1 dia útil).

### 9. Rodapé

Navegação completa, contato e marca d'água DACOT em 17vw.

---

## 4. Componentes

```
app/
  layout.tsx          fontes, metadata, viewport, skip-link
  page.tsx            composição da página + JSON-LD
  globals.css         tokens, tipografia, texturas, motion, reduced-motion
components/
  brand.tsx           marca (glifo) e wordmark
  site-header.tsx     nav fixa, barra de progresso de leitura, menu mobile
  hero.tsx            hero + composição de comandas + parallax/tilt
  problem.tsx         registro de falhas do turno
  manifesto.tsx       faixa de princípio
  method.tsx          fluxo de 5 etapas + exemplo de recomendação
  modules.tsx         três módulos + fragmentos de produto (SVG/CSS)
  configurator.tsx    seletor de módulos + painel de configuração
  difference.tsx      comparação PDV comum × DACOT + citação
  final-cta.tsx       formulário de demo (mailto) + contato direto
  site-footer.tsx     rodapé com marca d'água
  mobile-cta.tsx      barra fixa de conversão no mobile
  motion-root.tsx     observador global de revelação no scroll
  section-label.tsx   rótulo numerado de seção
  ui/button.tsx       botão e link-botão (variantes cva, padrão shadcn)
lib/
  utils.ts            cn()
  contact-mailto.ts   montagem do e-mail de demo (testável)
```

---

## 5. Regras de responsividade

- **Mobile-first na usabilidade, desktop-first na composição.** 390px, 768px, 1024px e 1440px validados sem scroll horizontal.
- Mobile: uma coluna; menus e configurador empilhados; barra fixa de CTA aparece após o hero e desaparece perto do rodapé.
- Tipografia fluida por `clamp()`, sem media query para tamanho de título.
- Alvos de toque com no mínimo 40px; `scroll-margin-top: 84px` para âncoras sob a nav fixa.

## 6. Acessibilidade

- Contraste de texto ≥ 4.5:1 (rótulos mono usam `--color-faint` calibrado).
- Navegação completa por teclado, `:focus-visible` em cobre, skip-link para o conteúdo.
- Menu mobile com `aria-expanded`/`aria-controls` e fechamento por `Esc`; seleção de módulos com `aria-pressed`; mensagens dinâmicas em `aria-live="polite"`; formulário com `label` associado e validação nativa.
- `prefers-reduced-motion` desliga parallax, tilt, revelações e animações.

## 7. Pendências para produção

1. Substituir `contato@dacot.com.br` pelo endereço real e apontar o formulário para um endpoint/CRM em vez do `mailto:`.
2. Definir WhatsApp comercial e trocar o CTA secundário do formulário por esse canal, se fizer sentido.
3. Medir e revisar o conteúdo dos fragmentos de produto quando houver dados reais de cliente.
