import assert from "node:assert/strict";
import { buildDemoMailto } from "../lib/contact-mailto.ts";

const href = buildDemoMailto({
  nome: "Ana Souza",
  restaurante: "Cantina do Porto",
  whatsapp: "(11) 98888-7777",
  prioridade: "estoque",
});

assert.ok(href.startsWith("mailto:contato@dacot.com.br?"), "email do destinatário");
const url = new URL(href);
assert.equal(url.searchParams.get("subject"), "Demo DACOT — Cantina do Porto");
const body = url.searchParams.get("body") ?? "";
assert.ok(body.includes("Nome: Ana Souza"), "nome");
assert.ok(body.includes("Restaurante: Cantina do Porto"), "restaurante");
assert.ok(body.includes("WhatsApp: (11) 98888-7777"), "whatsapp");
assert.ok(body.includes("Prioridade: Estoque e custo"), "rótulo da prioridade");
assert.ok(body.includes("configuração da DACOT"), "mensagem final");

const fallback = buildDemoMailto({
  nome: "",
  restaurante: "",
  whatsapp: "",
  prioridade: "inexistente",
});
assert.ok(fallback.includes("Prioridade%3A%20inexistente"), "fallback da prioridade");

console.log("mailto ok");
