import Image from "next/image";
import Link from "next/link";
import "./network.css";

export function Network() {
  return (
    <section className="section network-section" id="rede">
      <div className="site-shell network-grid">
        <div className="network-copy" data-reveal>
          <span className="section-kicker">Rede VEKKO</span>
          <h2><span>Encontre um</span><span>parceiro</span><span>perto de você</span></h2>
          <p>Escolha pelo mapa, confira os serviços disponíveis e autorize o atendimento sem sair do aplicativo.</p>
          <ul>
            <li><i className="bi bi-shield-check" /> Parceiros credenciados</li>
            <li><i className="bi bi-geo-alt-fill" /> Distância e rota no app</li>
            <li><i className="bi bi-star-fill" /> Avaliações após o atendimento</li>
          </ul>
          <Link className="button button-primary" href="/seja-parceiro">Quero ser parceiro <i className="bi bi-arrow-right" /></Link>
        </div>
        <div className="network-map" data-reveal aria-label="Representação da rede VEKKO em Uberlândia">
          <svg className="network-streets" viewBox="0 0 900 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
            <g transform="translate(450 300) rotate(-15) translate(-450 -300)">
              <path className="street-main" d="M-400 150H1300M-400 450H1300M250-400V1000M650-400V1000" />
              <path className="street-secondary" d="M-400 0H1300M-400 300H1300M-400 600H1300M50-400V1000M450-400V1000M850-400V1000" />
              <path className="street-diagonal" d="M-200-100L1100 700M900-200L-100 800" />
            </g>
          </svg>
          <span className="network-current" aria-hidden="true"><i /></span>
          <span className="network-pin pin-1"><Image src="/vekko-symbol.png" alt="" width={30} height={24} /></span>
          <span className="network-pin pin-2"><Image src="/vekko-symbol.png" alt="" width={30} height={24} /></span>
          <span className="network-pin pin-3"><Image src="/vekko-symbol.png" alt="" width={30} height={24} /></span>
          <span className="network-pin pin-4"><Image src="/vekko-symbol.png" alt="" width={30} height={24} /></span>
          <div className="network-card"><span>Operação inicial</span><strong>Uberlândia · MG</strong><small>Novos parceiros em credenciamento</small></div>
        </div>
      </div>
    </section>
  );
}
