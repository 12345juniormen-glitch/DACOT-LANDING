import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-instrument",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "DACOT — Plataforma de otimização para restaurantes",
  description:
    "Pedidos, estoque e decisão em módulos independentes. O seu restaurante contrata só o que precisa e opera com clareza.",
  keywords: [
    "gestão de restaurantes",
    "estoque para restaurantes",
    "PDV modular",
    "operação de restaurante",
    "CMV",
    "DACOT",
  ],
  openGraph: {
    title: "DACOT — Plataforma de otimização para restaurantes",
    description:
      "Escolha só o que o seu restaurante precisa. Módulos de operação, estoque e decisão que funcionam sozinhos — e melhor juntos.",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0908",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt-BR"
      className={`${archivo.variable} ${instrument.variable} ${jetbrains.variable}`}
    >
      <body className="bg-ink text-fg antialiased">
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-ink"
        >
          Ir para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
