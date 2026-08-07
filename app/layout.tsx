import type { Metadata } from "next";
import { Geist_Mono, Sora } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get("x-forwarded-host");
  const requestHost = forwardedHost ?? requestHeaders.get("host") ?? "localhost:5173";
  const safeHost = requestHost.replace(/[^a-zA-Z0-9.:[\]-]/g, "");
  const forwardedProtocol = requestHeaders.get("x-forwarded-proto");
  const protocol =
    forwardedProtocol === "http" || safeHost.startsWith("localhost")
      ? "http"
      : "https";
  const metadataBase = new URL(`${protocol}://${safeHost || "localhost:5173"}`);
  const socialImage = new URL("/og.png", metadataBase).toString();

  return {
    metadataBase,
    title: {
      default: "VEKKO — Cuidar do seu carro ficou mais simples",
      template: "%s | VEKKO",
    },
    description:
      "Assinatura e benefícios automotivos por veículo, conectados a uma rede de estabelecimentos parceiros.",
    icons: {
      icon: "/vekko-icon.svg",
      shortcut: "/vekko-icon.svg",
    },
    openGraph: {
      description:
        "Planos por veículo, rede credenciada e utilização segura pelo aplicativo VEKKO.",
      images: [{ alt: "VEKKO — Cuidar do seu carro ficou mais simples", url: socialImage }],
      locale: "pt_BR",
      siteName: "VEKKO",
      title: "VEKKO — Cuidar do seu carro ficou mais simples",
      type: "website",
      url: metadataBase,
    },
    twitter: {
      card: "summary_large_image",
      description:
        "Planos por veículo, rede credenciada e utilização segura pelo aplicativo VEKKO.",
      images: [socialImage],
      title: "VEKKO — Cuidar do seu carro ficou mais simples",
    },
  };
}

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
