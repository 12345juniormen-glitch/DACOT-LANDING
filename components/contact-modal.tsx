"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Interest = "pedidos" | "estoque" | "dacot";
const ContactContext = createContext<(interest?: Interest) => void>(() => {});

export function ContactArrow() {
  return (
    <span aria-hidden="true" className="contact-arrow">
      <svg className="contact-arrow-out" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <svg className="contact-arrow-in" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M9 3l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </span>
  );
}

export function ContactTrigger({ children, className, primary = false, interest, onClick, ...props }: Omit<React.ComponentProps<"button">, "onClick"> & { primary?: boolean; interest?: Interest; onClick?: () => void }) {
  const open = useContext(ContactContext);
  return <button {...props} type="button" data-contact-trigger aria-haspopup="dialog" onClick={() => { onClick?.(); open(interest); }} className={cn(primary && "contact-primary", className)}>{children}</button>;
}

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const form = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [interest, setInterest] = useState<Interest>("dacot");
  const [message, setMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const phone = process.env.NEXT_PUBLIC_DACOT_WHATSAPP?.replace(/\D/g, "");

  useEffect(() => {
    if (!open) return;
    const node = dialog.current!;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    form.current?.querySelectorAll("input").forEach((input) => { input.value = ""; });
    node.showModal();
    node.querySelector<HTMLInputElement>('input[name="nome"]')?.focus();
    return () => {
      node.close();
      document.body.style.overflow = previous;
      const trigger = opener.current;
      if (trigger?.closest("#menu-mobile")) {
        document.querySelector<HTMLButtonElement>('[aria-controls="menu-mobile"]')?.focus();
      } else if (trigger?.isConnected) trigger.focus();
    };
  }, [open]);

  const close = () => setClosing(true);
  useEffect(() => {
    if (!closing) return;
    const timer = window.setTimeout(() => { setOpen(false); setClosing(false); }, 160);
    return () => window.clearTimeout(timer);
  }, [closing]);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const labels = { pedidos: "Pedidos & Operação", estoque: "Estoque & Compras", dacot: "Conhecer a DACOT" };
    const text = ["Olá! Quero conhecer a DACOT.", `Nome: ${data.get("nome")}`, `Restaurante/empresa: ${data.get("empresa")}`, `WhatsApp: ${data.get("whatsapp")}`, `Cidade: ${data.get("cidade")}`, `Interesse: ${labels[interest]}`].join("\n");
    if (phone && phone.length >= 10 && phone.length <= 15) {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      return;
    }
    setMessage(text);
    try { await navigator.clipboard.writeText(text); setCopied(true); }
    catch { setCopied(false); }
  }

  return <ContactContext.Provider value={(value = "dacot") => {
    opener.current = document.activeElement as HTMLElement;
    setInterest(value); setMessage(""); setCopied(false); setClosing(false); setOpen(true);
  }}>
    {children}
    <dialog ref={dialog} aria-labelledby="contact-title" aria-describedby="contact-description" className="dacot-contact" data-closing={closing}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const items = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button, input, select, textarea, a[href]')).filter((item) => item.getClientRects().length && !item.hasAttribute("disabled"));
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}
      onCancel={(event) => { event.preventDefault(); close(); }}
      onClick={(event) => { if (event.target === event.currentTarget) { const rect = event.currentTarget.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close(); } }}>
      <div className="relative p-6 sm:p-9">
        <button type="button" onClick={close} aria-label="Fechar contato" className="absolute right-4 top-4 flex size-10 items-center justify-center border border-[#26241F] text-[#EEE9E1] transition-colors hover:text-[#DA9358]">
          <svg viewBox="0 0 20 20" className="size-4" fill="none" aria-hidden="true"><path d="m5 5 10 10M15 5 5 15" stroke="currentColor" strokeWidth="1.3" /></svg>
        </button>
        <p className="mb-5 font-mono text-[9px] uppercase tracking-[0.18em] text-[#C37B45]">Contato · DACOT</p>
        <h2 id="contact-title" className="pr-8 font-display text-[clamp(1.8rem,5vw,2.4rem)] font-semibold leading-tight tracking-[-0.035em]">Conheça a DACOT</h2>
        <p id="contact-description" className="mt-3 max-w-[40ch] text-[14px] leading-relaxed text-[#a1968a]">Conte um pouco sobre o seu negócio e fale diretamente com a gente.</p>
        <form ref={form} onSubmit={submit} className="mt-7 grid gap-5" onChange={() => setMessage("")}>
          <ContactField name="nome" label="Nome" autoComplete="name" />
          <ContactField name="empresa" label="Restaurante/empresa" autoComplete="organization" />
          <div className="grid gap-5 sm:grid-cols-2">
            <ContactField name="whatsapp" label="WhatsApp" type="tel" autoComplete="tel" />
            <ContactField name="cidade" label="Cidade" autoComplete="address-level2" />
          </div>
          <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#a1968a]">
            Interesse <span className="sr-only">opcional</span>
            <select name="interesse" value={interest} onChange={(event) => setInterest(event.target.value as Interest)} className="contact-input font-sans normal-case tracking-normal">
              <option value="dacot">Conhecer a DACOT</option><option value="pedidos">Pedidos & Operação</option><option value="estoque">Estoque & Compras</option>
            </select>
          </label>
          <button type="submit" className="contact-primary mt-1 w-full">Falar com a DACOT<ContactArrow /></button>
          <p className="text-[12px] leading-relaxed text-[#a1968a]">{phone ? "Abriremos o WhatsApp com sua mensagem. Você decide se envia." : "Vamos preparar sua mensagem para você enviar pelo Instagram. Nenhum dado é enviado automaticamente."}</p>
        </form>
        {message && <div className="mt-5 border-t border-[#26241F] pt-5" role="status">
          <p className="text-[13px] leading-relaxed">{copied ? "Mensagem copiada. Abra o Instagram e cole na conversa com @dacot.odn." : "Copie a mensagem abaixo e envie na conversa com @dacot.odn."}</p>
          {!copied && <textarea aria-label="Mensagem para copiar" readOnly value={message} onFocus={(event) => event.target.select()} className="contact-input mt-3 h-40 w-full" />}
          <a href="https://www.instagram.com/dacot.odn/" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center gap-3 border-b border-[#C37B45] text-sm text-[#DA9358]">Abrir Instagram da DACOT <span aria-hidden="true">↗</span></a>
        </div>}
      </div>
    </dialog>
  </ContactContext.Provider>;
}

function ContactField({ label, name, type = "text", autoComplete }: { label: string; name: string; type?: string; autoComplete: string }) {
  return <label className="grid gap-2 font-mono text-[10px] uppercase tracking-[0.12em] text-[#a1968a]">{label}<input name={name} type={type} autoComplete={autoComplete} required maxLength={120} className="contact-input font-sans normal-case tracking-normal" /></label>;
}
