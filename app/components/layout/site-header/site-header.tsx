"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { PARTNER_PORTAL_URL } from "../../../config/app-links";
import "./site-header.css";

const navigation = [
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#planos", label: "Planos" },
  { href: "/seja-parceiro", label: "Seja parceiro" },
] as const;

/**
 * Pílula flutuante.
 * - Depois que o hero sai da tela (`data-nav-sentinel`), encolhe para logo + botão.
 * - Some ao rolar para baixo (passado 120px) e volta ao rolar para cima.
 * - `overHero`: versão escura (translúcida, texto branco) enquanto está sobre o hero marinho;
 *   volta à clara depois. IntersectionObserver (não GSAP): funciona também com movimento reduzido.
 */
export function SiteHeader({ overHero: startsOverHero = false }: { overHero?: boolean } = {}) {
  const [compact, setCompact] = useState(false);
  const [overHero, setOverHero] = useState(startsOverHero);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      const delta = y - lastY;
      if (Math.abs(delta) < 4) return; // ignora tremidas do scroll
      setHidden(delta > 0 && y > 120);
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const sentinel = document.querySelector("[data-nav-sentinel]");
    if (!sentinel) return;
    // -80px ≈ altura da pílula + margem: "o hero ainda está por baixo do header?"
    const observer = new IntersectionObserver(
      ([entry]) => {
        setCompact(!entry.isIntersecting);
        setOverHero(entry.isIntersecting);
      },
      { rootMargin: "-80px 0px 0px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <header className={`site-header${compact ? " is-compact" : ""}${hidden ? " is-hidden" : ""}${overHero ? " is-over-hero" : ""}`}>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <div className="site-header-pill">
        <Link className="brand" href="/" aria-label="VEKKO — página inicial">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-on-light" src="/vekko-logo-224.webp" alt="VEKKO" width={224} height={53} />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="logo-on-dark" src="/vekko-logo-white-224.webp" alt="" width={224} height={53} />
        </Link>

        <nav className="site-nav" aria-label="Navegação principal" inert={compact}>
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>{item.label}</Link>
          ))}
        </nav>

        <Link className="header-button" href={PARTNER_PORTAL_URL}>
          Acessar portal
        </Link>
      </div>
    </header>
  );
}
