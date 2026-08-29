"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { steps } from "../home-data";
import "./how-it-works.css";

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const stepElements = gsap.utils.toArray<HTMLElement>("[data-how-step]");
      const progress = section.querySelector<HTMLElement>("[data-how-progress]");

      const activateStep = (activeIndex: number) => {
        stepElements.forEach((step, index) => {
          step.classList.toggle("is-active", index === activeIndex);
        });

        if (progress) {
          gsap.to(progress, {
            duration: 0.45,
            ease: "power2.out",
            scaleY: (activeIndex + 1) / stepElements.length,
          });
        }
      };

      stepElements.forEach((step, index) => {
        ScrollTrigger.create({
          end: "bottom 42%",
          onEnter: () => activateStep(index),
          onEnterBack: () => activateStep(index),
          start: "top 58%",
          trigger: step,
        });
      });
    }, section);

    return () => context.revert();
  }, []);

  return (
    <section className="section how-section" id="como-funciona" ref={sectionRef}>
      <div className="site-shell how-process">
        <div className="how-copy how-sticky" data-reveal>
          <span className="section-kicker">Como funciona</span>
          <h2>Da assinatura ao carro limpo em <em>quatro passos.</em></h2>
          <p>Tudo acontece pelo app — do plano à autorização da lavagem.</p>

          <div className="how-progress" aria-hidden="true">
            <span data-how-progress />
          </div>
        </div>

        <div className="how-steps">
          {steps.map((step, index) => (
            <article
              className={`how-step${index === 0 ? " is-active" : ""}`}
              data-how-step
              key={step.number}
            >
              <span className="how-step-number">{step.number}</span>
              <div className="how-step-copy">
                <span>Etapa {step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
              <span className="how-step-marker" aria-hidden="true">
                <i className={`bi ${step.icon}`} />
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
