"use client";

import { useEffect, useState } from "react";
import { StoreButtons } from "../../store/store-buttons";
import "./download-bar.css";

/**
 * Barra fixa de download (CTA principal no celular; escondida a partir de 900px).
 * Reaproveita o StoreButtons do CTA final: iOS → App Store, Android → Google Play.
 *
 * Aparece depois de 240px de rolagem e some enquanto o CTA final está na tela (evita CTA duplicado).
 * A visibilidade é controlada aqui, não pelo GSAP: assim ela aparece também com
 * `prefers-reduced-motion` (quando o motion.ts nem roda) e nunca "pisca" antes do GSAP carregar.
 */
export function DownloadBar() {
  const [scrolled, setScrolled] = useState(false);
  const [finalCtaVisible, setFinalCtaVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 240);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const target = document.getElementById("baixar");
    const observer = target
      ? new IntersectionObserver(([entry]) => setFinalCtaVisible(entry.isIntersecting))
      : null;
    if (target) observer?.observe(target);

    return () => {
      window.removeEventListener("scroll", onScroll);
      observer?.disconnect();
    };
  }, []);

  const visible = scrolled && !finalCtaVisible;

  return (
    <div className={`download-bar${visible ? " is-visible" : ""}`} inert={!visible}>
      <span className="download-bar__label">Baixe o app VEKKO</span>
      <StoreButtons section="sticky_bar" variant="compact" />
    </div>
  );
}
