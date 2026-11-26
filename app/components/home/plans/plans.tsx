import { plans } from "../home-data";
import { PlanCta } from "./plan-cta";
import "./plans.css";

export function Plans() {
  return (
    <section className="section section-tint" id="planos" aria-labelledby="planos-title">
      <div className="shell">
        <h2 className="h2 section-title" id="planos-title" data-reveal>
          Quantas lavagens você usa por mês?
        </h2>

        {/* .plan-card: o GSAP anima a entrada. .plan-card__inner: o CSS cuida do lift e do hover. */}
        <ul className="plan-list">
          {plans.map((plan) => (
            <li className={`plan-card${plan.featured ? " is-featured" : ""}`} key={plan.name}>
              <div className="plan-card__inner">
                <div className="plan-head">
                  <h3 className="plan-name">{plan.name}</h3>
                  {plan.featured ? <span className="plan-badge">Mais escolhido</span> : null}
                </div>
                <p className="plan-price">
                  R$ {plan.price}<span>/mês</span>
                </p>
                <p className="plan-washes">{plan.washes}</p>
                <p className="plan-description">{plan.description}</p>
                <PlanCta featured={plan.featured} plan={plan.name} />
              </div>
            </li>
          ))}
        </ul>

        <p className="plans-note measure" data-reveal>
          Lavagem simples. Use seu saldo quando quiser, sem esperar entre uma e outra. O saldo vale dentro do mês.
        </p>
      </div>
    </section>
  );
}
