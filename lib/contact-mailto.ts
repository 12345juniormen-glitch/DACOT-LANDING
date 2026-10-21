export const CONTACT_EMAIL = "contato@dacot.com.br";

export const MODULE_OPTIONS = [
  { id: "pedidos", label: "Pedidos & Operação" },
  { id: "estoque", label: "Estoque & Compras" },
  { id: "analise", label: "Análise & Decisão" },
] as const;

export type ModuleId = (typeof MODULE_OPTIONS)[number]["id"];

export function moduleSummary(ids: ModuleId[]) {
  const selected = MODULE_OPTIONS.filter((item) => ids.includes(item.id));
  if (selected.length === 3) return "Os três — quero entender o conjunto";
  return selected.map((item) => item.label).join(" + ");
}

export type DemoRequest = {
  nome: string;
  restaurante: string;
  whatsapp: string;
  modules: ModuleId[];
};

export function buildDemoMailto(request: DemoRequest) {
  const subject = `Demo DACOT — ${request.restaurante}`;
  const body = [
    `Nome: ${request.nome}`,
    `Restaurante: ${request.restaurante}`,
    `WhatsApp: ${request.whatsapp}`,
    `Prioridade: ${moduleSummary(request.modules)}`,
    "",
    "Quero entender qual configuração da DACOT faz sentido para a minha operação.",
  ].join("\n");

  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
