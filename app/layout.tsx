import type { Metadata } from "next";
import { Geist_Mono, Sora } from "next/font/google";
import { SITE_URL } from "./config/app-links";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

// Usada só nos rótulos das páginas de parceiro e legais: sem preload na home.
const geistMono = Geist_Mono({
  preload: false,
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadataBase = new URL(SITE_URL);
const socialImage = new URL("/golf.png", metadataBase).toString();
const title = "VEKKO | Lavagem de carro por assinatura";
const description =
  "Assine um plano e lave seu carro nos parceiros VEKKO perto de você. Baixe o app na App Store ou no Google Play.";

// Metadados estáticos: assim o <title>, a description e o Smart App Banner saem no <head>.
export const metadata: Metadata = {
  metadataBase,
  title: {
    default: title,
    template: "%s | VEKKO",
  },
  description,
  icons: {
    icon: "/vekko-symbol.png",
    shortcut: "/vekko-symbol.png",
  },
  openGraph: {
    description,
    images: [{ alt: title, url: socialImage }],
    locale: "pt_BR",
    siteName: "VEKKO",
    title,
    type: "website",
    url: metadataBase,
  },
  twitter: {
    card: "summary_large_image",
    description,
    images: [socialImage],
    title,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${sora.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
