import { questions } from "../home-data";
import "./faq.css";

export function Faq() {
  return (
    <section className="section faq-section" id="faq">
      <div className="site-shell faq-grid">
        <div className="faq-intro" data-reveal><span className="section-kicker">Dúvidas frequentes</span><h2>O básico, sem letra miúda.</h2><p>As principais respostas para escolher seu plano com segurança.</p></div>
        <div className="faq-list" data-reveal>
          {questions.map((item, index) => (
            <details key={item.question} open={index === 0}><summary>{item.question}<span aria-hidden="true"><i className="bi bi-plus-lg" /></span></summary><p>{item.answer}</p></details>
          ))}
        </div>
      </div>
    </section>
  );
}
