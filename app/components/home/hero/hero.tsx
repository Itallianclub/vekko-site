import Image from "next/image";
import "./hero.css";

export function Hero() {
  return (
    <section className="hero grid-surface" id="hero">
      <div className="site-shell hero-shell">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow-pill" data-hero-reveal><span className="status-dot" />Piloto inicial · Uberlândia</div>
            <h1 data-hero-reveal>Lave seu carro <em>sem pagar por cada lavagem.</em></h1>
            <p className="hero-lead" data-hero-reveal>Assine um plano para o seu veículo, lave em parceiros credenciados e controle tudo pelo aplicativo VEKKO.</p>
            <div className="hero-actions" data-hero-reveal>
              <a className="button button-primary" href="#planos">Conhecer planos <i className="bi bi-arrow-down" aria-hidden="true" /></a>
              <a className="text-link" href="#como-funciona">Como funciona <i className="bi bi-arrow-up-right" aria-hidden="true" /></a>
            </div>
            <div className="hero-proof" data-hero-reveal><span>Planos por veículo</span><span>Parceiros credenciados</span><span>Tudo pelo app</span></div>
          </div>

          <div className="hero-visual" data-hero-reveal>
            <div className="route-orbit" aria-hidden="true"><i /><i /><i /></div>
            <Image
              className="hero-phone"
              src="/mockup-trimmed.png"
              alt="Aplicativo VEKKO exibindo parceiros próximos"
              width={735}
              height={1402}
              sizes="(max-width: 560px) 200px, (max-width: 820px) 220px, 240px"
              priority
            />
            <Image
              className="hero-car"
              src="/golf.png"
              alt="Automóvel representando os veículos atendidos pela VEKKO"
              width={813}
              height={363}
              sizes="(max-width: 820px) 100vw, 720px"
              priority
            />
            <div className="floating-plan"><span>Plano ativo</span><strong>Vekko Essential</strong><p><b>4</b> lavagens por ciclo</p><small>Próxima renovação · 12 set</small></div>
            <div className="floating-location" aria-hidden="true"><i className="bi bi-geo-alt-fill" /></div>
          </div>
        </div>
      </div>
    </section>
  );
}
