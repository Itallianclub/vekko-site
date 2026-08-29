import { plans } from "../home-data";
import "./plans.css";

export function Plans() {
  return (
    <section className="section plans-section" id="planos">
      <div className="site-shell">
        <div className="section-heading" data-reveal>
          <div><span className="section-kicker">Planos VEKKO</span><h2>Escolha sua frequência.</h2></div>
        </div>
        <div className="plans-grid" data-reveal>
          {plans.map((plan) => (
            <article className={`plan-card${plan.accent ? " plan-featured" : ""}`} key={plan.name}>
              {plan.accent ? <span className="plan-tag">Mais escolhido</span> : <span className="plan-index">VEKKO</span>}
              <div className="plan-name">{plan.name}</div>
              <div className="plan-price"><sup>R$</sup><strong>{plan.price}</strong><span>/mês</span></div>
              <p>{plan.description}</p><div className="plan-divider" />
              <ul><li><i className="bi bi-check2" aria-hidden="true" />{plan.washes}</li><li><i className="bi bi-check2" aria-hidden="true" />Rede credenciada</li><li><i className="bi bi-check2" aria-hidden="true" />Autorização pelo app</li></ul>
              <div className="plan-eligibility"><span>Veículos elegíveis</span><strong>{plan.eligibility}</strong></div>
              <a className="button button-plan" href="#aplicativo">Quero esse plano <i className="bi bi-arrow-right" /></a>
            </article>
          ))}
        </div>
        <p className="plans-note" data-reveal>* Benefícios não acumulam. O plano Ilimitado permite no máximo uma lavagem por veículo ao dia.</p>
      </div>
    </section>
  );
}
