import Image from "next/image";
import Link from "next/link";
import "./app-cta.css";

export function AppCta() {
  return (
    <section className="app-cta grid-surface" id="aplicativo">
      <div className="site-shell app-cta-inner" data-reveal>
        <div className="app-cta-copy"><span className="section-kicker">Aplicativo VEKKO</span><h2>Seu carro limpo começa com um plano.</h2><p>Acompanhe o lançamento em Uberlândia e saiba quando as assinaturas estiverem disponíveis.</p>
          <div className="hero-actions"><a className="button button-primary" href="mailto:contato@vekko.com.br?subject=Quero%20acompanhar%20o%20lançamento%20da%20VEKKO">Acompanhar lançamento <i className="bi bi-arrow-up-right" /></a><Link className="text-link" href="/seja-parceiro">Cadastrar estabelecimento</Link></div>
        </div>
        <div className="app-cta-visual" aria-hidden="true"><Image src="/vekko-symbol.png" alt="" width={470} height={370} /></div>
      </div>
    </section>
  );
}
