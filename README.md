# DACOT — landing page

Landing page da DACOT, plataforma modular de otimização para restaurantes.
Visual escuro, acento cobre discreto, tipografia forte e um configurador de módulos
que materializa a proposta comercial: **cada restaurante contrata só o que precisa**.

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Tailwind CSS v4 (`@theme` tokens em `app/globals.css`)
- Componentes no padrão shadcn/ui (variantes com `class-variance-authority`)
- Fontes self-hosted via `next/font`: Archivo, Instrument Sans e JetBrains Mono

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
npm test         # verifica a montagem do e-mail de demo
```

## Onde mexer

| Objetivo | Arquivo |
|---|---|
| Cores, tipografia, texturas, motion | `app/globals.css` |
| Copy de cada seção | componentes em `components/` |
| Módulos exibidos no configurador | `components/configurator.tsx` |
| E-mail/destino do formulário | `lib/contact-mailto.ts` |
| Navegação e CTA | `components/site-header.tsx` |
| Metadados e SEO | `app/layout.tsx`, `app/page.tsx` |

## Formulário de demo

Hoje o formulário monta um `mailto:` com nome, restaurante, WhatsApp e prioridade —
sem backend. `contato@dacot.com.br` é um **placeholder**: troque em
`lib/contact-mailto.ts` e conecte o envio a um endpoint/CRM antes de publicar.
O comportamento é coberto por `npm test`.

## Documentação de design

Estrutura completa, copy deck, paleta, tipografia, motion e inventário de
componentes: [`docs/dacot-landing.md`](docs/dacot-landing.md).
