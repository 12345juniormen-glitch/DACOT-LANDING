import assert from "node:assert/strict";
import { buildDemoMailto, moduleSummary, MODULE_OPTIONS } from "../lib/contact-mailto.ts";

const href = buildDemoMailto({
  nome: "Ana Souza",
  restaurante: "Cantina do Porto",
  whatsapp: "(11) 98888-7777",
  modules: ["estoque"],
});

assert.ok(href.startsWith("mailto:contato@dacot.com.br?"), "email do destinatário");
const url = new URL(href);
assert.equal(url.searchParams.get("subject"), "Demo DACOT — Cantina do Porto");
const body = url.searchParams.get("body") ?? "";
assert.ok(body.includes("Nome: Ana Souza"), "nome");
assert.ok(body.includes("Restaurante: Cantina do Porto"), "restaurante");
assert.ok(body.includes("WhatsApp: (11) 98888-7777"), "whatsapp");
assert.ok(body.includes("Prioridade: Estoque & Compras"), "rótulo da prioridade");
assert.ok(body.includes("configuração da DACOT"), "mensagem final");

// All combinations, including empty selection, preserve exactly the chosen modules.
for (let mask = 0; mask < 8; mask++) {
  const modules = MODULE_OPTIONS.filter((_, index) => mask & (1 << index)).map((item) => item.id);
  const expected = modules.length === 3
    ? "Os três — quero entender o conjunto"
    : MODULE_OPTIONS.filter((item) => modules.includes(item.id)).map((item) => item.label).join(" + ");
  assert.equal(moduleSummary([...modules].reverse()), expected);
  const result = new URL(buildDemoMailto({ nome: "Ana", restaurante: "A & B", whatsapp: "123", modules }));
  assert.ok(result.searchParams.get("body")?.includes(`Prioridade: ${expected}\n`));
}
console.log("mailto: all module combinations ok");
