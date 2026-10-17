export const CONTACT_EMAIL = "contato@dacot.com.br";

export const PRIORITIES = [
  { value: "operacao", label: "Pedidos e operação" },
  { value: "estoque", label: "Estoque e custo" },
  { value: "analise", label: "Análise e decisão" },
  { value: "tudo", label: "Os três — quero entender o conjunto" },
] as const;

export type DemoRequest = {
  nome: string;
  restaurante: string;
  whatsapp: string;
  prioridade: string;
};

function priorityLabel(value: string) {
  return PRIORITIES.find((item) => item.value === value)?.label ?? value;
}

export function buildDemoMailto(request: DemoRequest) {
  const subject = `Demo DACOT — ${request.restaurante}`;
  const body = [
    `Nome: ${request.nome}`,
    `Restaurante: ${request.restaurante}`,
    `WhatsApp: ${request.whatsapp}`,
    `Prioridade: ${priorityLabel(request.prioridade)}`,
    "",
    "Quero entender qual configuração da DACOT faz sentido para a minha operação.",
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
