import { Plus } from "lucide-react";
import { questions } from "../home-data";
import "./faq.css";

export function Faq() {
  return (
    <section className="section section-white" id="duvidas" aria-labelledby="duvidas-title">
      <div className="shell">
        <h2 className="h2 section-title" id="duvidas-title" data-reveal>O básico, sem letra miúda.</h2>

        <div className="faq-list" data-reveal-group>
          {questions.map((item) => (
            <details className="faq-item" key={item.question}>
              <summary>
                <span>{item.question}</span>
                <Plus aria-hidden="true" className="faq-icon" size={20} strokeWidth={2.25} />
              </summary>
              {/* Altura animada sem JS: grid 0fr → 1fr ao abrir. */}
              <div className="faq-body">
                <div>
                  <p>{item.answer}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
