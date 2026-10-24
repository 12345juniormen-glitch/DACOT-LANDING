"use client";

export function SocialContactLink({ channel, children, className, onClick, ...props }: { channel: "instagram" | "whatsapp"; children: React.ReactNode; className?: string; onClick?: () => void; "aria-label"?: string }) {
  const phone = process.env.NEXT_PUBLIC_DACOT_WHATSAPP?.replace(/\D/g, "");
  const href = channel === "instagram"
    ? "https://www.instagram.com/dacot.odn/"
    : phone && phone.length >= 10 && phone.length <= 15 ? `https://wa.me/${phone}` : undefined;

  if (!href) return <span {...props} role="link" aria-disabled="true" title="WhatsApp ainda não configurado" className={className}>{children}</span>;
  return <a {...props} href={href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>{children}</a>;
}
