import Image from "next/image";
import Link from "next/link";
import "./partner-preview.css";

export function PartnerPreview() {
  return (
    <section className="section partner-preview">
      <div className="site-shell partner-panel" data-reveal>
        <div className="partner-mark">
          <span className="partner-orbit partner-orbit-outer" aria-hidden="true" />
          <span className="partner-orbit partner-orbit-inner" aria-hidden="true" />
          <span className="partner-orbit-dot" aria-hidden="true" />
          <Image src="/vekko-symbol.png" alt="" width={132} height={105} />
          <span className="partner-mark-label">PARCEIROS</span>
        </div>

        <div className="partner-panel-copy">
          <span className="section-kicker">Para estabelecimentos</span>
          <h2>
            <span>Clientes recorrentes.</span>
            <span>Operação simples.</span>
          </h2>
          <p>
            Entre para a rede VEKKO, valide os atendimentos pelo portal e
            acompanhe cada serviço realizado.
          </p>

          <div className="partner-mini-steps" aria-label="Etapas da parceria">
            <div className="partner-step">
              <div className="partner-step-marker">
                <b>01</b>
                <span className="partner-step-icon">
                  <i className="bi bi-file-earmark-check" aria-hidden="true" />
                </span>
              </div>
              <strong>Receba</strong>
            </div>

            <div className="partner-step">
              <div className="partner-step-marker">
                <b>02</b>
                <span className="partner-step-icon">
                  <i className="bi bi-shield-check" aria-hidden="true" />
                </span>
              </div>
              <strong>Valide</strong>
            </div>

            <div className="partner-step">
              <div className="partner-step-marker">
                <b>03</b>
                <span className="partner-step-icon">
                  <i className="bi bi-check-circle" aria-hidden="true" />
                </span>
              </div>
              <strong>Conclua</strong>
            </div>
          </div>

          <Link className="button button-primary partner-cta" href="/seja-parceiro">
            Conhecer parceria <i className="bi bi-arrow-right" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
