"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

const steps = [
  {
    number: "01",
    title: "Cadastre seu veículo",
    text: "A assinatura é individual: cada veículo tem seu próprio plano e seus próprios benefícios.",
  },
  {
    number: "02",
    title: "Escolha um plano",
    text: "Compare as opções elegíveis para o tipo do seu veículo e escolha a melhor frequência.",
  },
  {
    number: "03",
    title: "Encontre um parceiro",
    text: "Localize estabelecimentos credenciados disponíveis na rede VEKKO em Uberlândia.",
  },
  {
    number: "04",
    title: "Autorize pelo QR Code",
    text: "Gere a autorização no aplicativo e apresente o QR Code ao parceiro para validar o atendimento.",
  },
] as const;

const benefits = [
  {
    className: "benefit-wide",
    eyebrow: "Rotina simples",
    title: "Seu carro limpo sem transformar isso em mais uma tarefa.",
    text: "Plano, saldo, parceiros e histórico ficam organizados no aplicativo VEKKO.",
    visual: "01 — 04",
  },
  {
    className: "benefit-dark",
    eyebrow: "Autorização segura",
    title: "Um QR Code para cada atendimento.",
    text: "A utilização é autorizada pelo cliente e validada pelo estabelecimento credenciado.",
    visual: "QR",
  },
  {
    className: "benefit-green",
    eyebrow: "Previsibilidade",
    title: "Você sabe o que contratou e quanto pode utilizar.",
    text: "Regras, elegibilidade e limites ficam claros antes da assinatura.",
    visual: "R$",
  },
  {
    className: "benefit-network",
    eyebrow: "Rede credenciada",
    title: "Escolha onde cuidar do seu veículo.",
    text: "A operação começa em Uberlândia/MG e cresce junto com a rede de parceiros VEKKO.",
    visual: "UDI",
  },
] as const;

const plans = [
  {
    name: "Basic",
    price: "79,90",
    washes: "2 lavagens por ciclo",
    description: "O essencial para manter seu veículo sempre limpo.",
    eligibility: "Hatch e Sedan",
    accent: false,
  },
  {
    name: "Essential",
    price: "119,90",
    washes: "4 lavagens por ciclo",
    description: "Mais frequência para acompanhar a rotina do seu veículo.",
    eligibility: "Hatch, Sedan, SUV e Pickup",
    accent: true,
  },
  {
    name: "Premium",
    price: "179,90",
    washes: "8 lavagens por ciclo",
    description: "Cobertura ampliada para quem cuida do carro toda semana.",
    eligibility: "Hatch, Sedan, SUV e Pickup",
    accent: false,
  },
  {
    name: "Ilimitado",
    price: "379,90",
    washes: "Máximo de 1 lavagem por dia",
    description: "Lavagens sem saldo mensal, respeitando o limite diário.",
    eligibility: "Hatch, Sedan, SUV e Pickup",
    accent: false,
  },
] as const;

const questions = [
  {
    question: "A assinatura pertence ao cliente ou ao veículo?",
    answer:
      "Ao veículo. Cada carro cadastrado precisa de uma assinatura própria, com benefícios e utilização controlados individualmente.",
  },
  {
    question: "Quantos veículos posso cadastrar?",
    answer:
      "Cada pessoa pode cadastrar até cinco veículos, sempre respeitando as regras de propriedade, elegibilidade e uma assinatura ativa por veículo.",
  },
  {
    question: "Posso utilizar em qualquer estabelecimento?",
    answer:
      "Não. Os benefícios são utilizados exclusivamente nos estabelecimentos credenciados e disponíveis na rede VEKKO.",
  },
  {
    question: "Como funciona o QR Code?",
    answer:
      "O aplicativo gera uma autorização para o atendimento. O parceiro lê e valida o QR Code antes de concluir o serviço e consumir o benefício.",
  },
  {
    question: "Os benefícios acumulam?",
    answer:
      "Não. Os benefícios seguem o ciclo e as regras do plano contratado e não são acumulados para ciclos futuros.",
  },
  {
    question: "Como cancelar?",
    answer:
      "O cancelamento será solicitado pelos canais disponíveis no aplicativo, conforme as condições apresentadas na contratação.",
  },
  {
    question: "Quais veículos podem contratar cada plano?",
    answer:
      "Hatch e Sedan podem contratar qualquer plano. SUV e Pickup não são elegíveis para o Basic e podem escolher Essential, Premium ou Ilimitado.",
  },
] as const;

export function HomeExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) return;

    const context = gsap.context(() => {
      gsap.from("[data-hero-reveal]", {
        delay: 0.12,
        duration: 0.9,
        ease: "power3.out",
        opacity: 0,
        stagger: 0.1,
        y: 28,
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          duration: 0.82,
          ease: "power3.out",
          opacity: 0,
          scrollTrigger: {
            start: "top 84%",
            toggleActions: "play none none none",
            trigger: element,
          },
          y: 44,
        });
      });

      gsap.to(".marquee-track", {
        ease: "none",
        scrollTrigger: {
          end: "bottom top",
          scrub: 1,
          start: "top bottom",
          trigger: ".marquee-band",
        },
        xPercent: -16,
      });
    }, root);

    const magneticCleanups = Array.from(
      root.querySelectorAll<HTMLElement>("[data-magnetic-zone]"),
    ).map((zone) => {
      const button = zone.querySelector<HTMLElement>("[data-magnetic-button]");
      if (!button) return () => undefined;

      const handlePointerMove = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;

        const rect = zone.getBoundingClientRect();
        const x = gsap.utils.mapRange(
          rect.left,
          rect.right,
          -rect.width / 2,
          rect.width / 2,
          event.clientX,
        );
        const y = gsap.utils.mapRange(
          rect.top,
          rect.bottom,
          -rect.height / 2,
          rect.height / 2,
          event.clientY,
        );

        gsap.to(button, {
          duration: 0.4,
          ease: "power2.out",
          overwrite: true,
          x: x * 0.6,
          y: y * 0.6,
        });
      };

      const resetButton = () => {
        gsap.to(button, {
          duration: 0.7,
          ease: "elastic.out(1, 0.4)",
          overwrite: true,
          x: 0,
          y: 0,
        });
      };

      zone.addEventListener("pointermove", handlePointerMove);
      zone.addEventListener("pointerleave", resetButton);

      return () => {
        zone.removeEventListener("pointermove", handlePointerMove);
        zone.removeEventListener("pointerleave", resetButton);
        gsap.killTweensOf(button);
      };
    });

    return () => {
      magneticCleanups.forEach((cleanup) => cleanup());
      context.revert();
    };
  }, []);

  return (
    <div ref={rootRef}>
      <SiteHeader />
      <main>
        <section className="hero grid-surface" id="hero">
          <div className="site-shell hero-shell">
            <div className="hero-grid">
              <div className="hero-copy">
                <div className="eyebrow-pill" data-hero-reveal>
                  <span className="status-dot" />
                  Piloto inicial · Uberlândia/MG
                </div>
                <h1 data-hero-reveal>
                  Cuidar do seu carro ficou <em>mais simples.</em>
                </h1>
                <p className="hero-lead" data-hero-reveal>
                  Assine um plano por veículo, encontre parceiros credenciados e
                  utilize seus benefícios diretamente pelo aplicativo VEKKO.
                </p>
                <div className="hero-actions" data-hero-reveal>
                  <div className="magnetic-zone" data-magnetic-zone>
                    <a
                      className="button button-magnetic"
                      data-magnetic-button
                      href="#planos"
                    >
                      <span>Conhecer planos</span>
                      <span aria-hidden="true">↓</span>
                    </a>
                  </div>
                  <a className="text-link" href="/seja-parceiro">
                    Quero ser parceiro <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>

              <aside className="hero-definition" data-hero-reveal>
                <span className="hero-definition-label">VEKKO em uma frase</span>
                <p>
                  Uma plataforma de assinatura e benefícios automotivos por
                  veículo.
                </p>
                <div className="hero-definition-list">
                  <span><b>01</b> Uma assinatura para cada veículo</span>
                  <span><b>02</b> Uso em parceiros credenciados</span>
                  <span><b>03</b> Validação segura pelo aplicativo</span>
                </div>
              </aside>
            </div>

            <div
              className="product-showcase"
              data-hero-reveal
              aria-label="Prévia conceitual da plataforma VEKKO"
            >
              <div className="product-window">
                <div className="product-toolbar">
                  <div className="product-wordmark">
                    <Image src="/vekko-icon.svg" alt="" width="30" height="30" priority />
                    <strong>VEKKO</strong>
                  </div>
                  <span className="product-toolbar-location">Uberlândia/MG</span>
                  <span className="product-avatar">IS</span>
                </div>

                <div className="product-dashboard">
                  <nav className="product-nav" aria-label="Prévia da navegação do aplicativo">
                    <strong>Meu veículo</strong>
                    <span>Plano e benefícios</span>
                    <span>Parceiros próximos</span>
                    <span>Histórico de uso</span>
                  </nav>

                  <div className="product-content">
                    <div className="product-content-heading">
                      <div>
                        <span>Visão do veículo</span>
                        <h2>Olá, Isaac.</h2>
                      </div>
                      <span className="product-status">Plano ativo</span>
                    </div>

                    <div className="product-metrics">
                      <article className="product-metric product-metric-dark">
                        <span>Plano atual</span>
                        <strong>Essential</strong>
                        <small>ABC1D23 · Sedan</small>
                      </article>
                      <article className="product-metric">
                        <span>Benefícios disponíveis</span>
                        <strong>3 de 4</strong>
                        <small>neste ciclo</small>
                      </article>
                    </div>

                    <article className="product-partner-card">
                      <div>
                        <span>Parceiro credenciado próximo</span>
                        <strong>Auto Clean · Centro</strong>
                      </div>
                      <div className="product-partner-distance">
                        <strong>1,2 km</strong>
                        <span>Ver rota →</span>
                      </div>
                    </article>
                  </div>
                </div>
              </div>

              <div className="product-phone">
                <div className="phone-topline">
                  <span>9:41</span>
                  <span>● ● ●</span>
                </div>
                <div className="phone-brand">VEKKO</div>
                <div className="phone-greeting">Seu plano</div>
                <div className="vehicle-chip">
                  <span>Veículo</span>
                  <strong>ABC1D23 · Sedan</strong>
                </div>
                <div className="phone-plan">
                  <span>Plano Essential</span>
                  <strong>3 de 4</strong>
                  <small>benefícios disponíveis</small>
                  <div className="phone-progress"><i /></div>
                </div>
                <div className="phone-qr">
                  <b>QR</b>
                  <span>Autorizar atendimento</span>
                </div>
              </div>

              <div className="product-assurance">
                <span>Seguro em cada uso</span>
                <strong>Autorização pelo app + QR Code</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="trust-strip" aria-label="Pilares da VEKKO">
          <div className="site-shell trust-grid">
            <span>Simples para o motorista</span>
            <span>Seguro para o parceiro</span>
            <span>Transparente em cada uso</span>
          </div>
        </section>

        <section className="section" id="como-funciona">
          <div className="site-shell">
            <div className="section-heading" data-reveal>
              <div>
                <span className="section-kicker">Como funciona</span>
                <h2>Da assinatura ao carro limpo em quatro passos.</h2>
              </div>
              <p>
                A VEKKO organiza toda a jornada pelo veículo — do plano à
                autorização do atendimento.
              </p>
            </div>

            <div className="steps-grid">
              {steps.map((step) => (
                <article className="step-card" data-reveal key={step.number}>
                  <span>{step.number}</span>
                  <div>
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <div className="marquee-band" aria-hidden="true">
          <div className="marquee-track">
            ASSINE · ENCONTRE · AUTORIZE · CUIDE · ASSINE · ENCONTRE ·
            AUTORIZE · CUIDE ·
          </div>
        </div>

        <section className="section section-soft" id="beneficios">
          <div className="site-shell">
            <div className="section-heading compact" data-reveal>
              <div>
                <span className="section-kicker">Benefícios</span>
                <h2>Tecnologia para simplificar o cuidado.</h2>
              </div>
            </div>
            <div className="benefits-grid">
              {benefits.map((benefit) => (
                <article
                  className={`benefit-card ${benefit.className}`}
                  data-reveal
                  key={benefit.title}
                >
                  <span className="benefit-visual">{benefit.visual}</span>
                  <div>
                    <span className="section-kicker">{benefit.eyebrow}</span>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section plans-section" id="planos">
          <div className="site-shell">
            <div className="section-heading" data-reveal>
              <div>
                <span className="section-kicker">Planos VEKKO</span>
                <h2>Uma frequência para cada rotina.</h2>
              </div>
              <p>
                Valores mensais por veículo. A disponibilidade final considera
                o tipo do veículo e as regras de elegibilidade.
              </p>
            </div>

            <div className="plans-grid">
              {plans.map((plan) => (
                <article
                  className={`plan-card${plan.accent ? " plan-featured" : ""}`}
                  data-reveal
                  key={plan.name}
                >
                  {plan.accent ? <span className="plan-tag">Mais versátil</span> : null}
                  <div className="plan-name">{plan.name}</div>
                  <div className="plan-price">
                    <sup>R$</sup>
                    <strong>{plan.price}</strong>
                    <span>/mês</span>
                  </div>
                  <p>{plan.description}</p>
                  <ul>
                    <li>{plan.washes}</li>
                    <li>Uso na rede credenciada</li>
                    <li>Autorização pelo aplicativo</li>
                  </ul>
                  <div className="plan-eligibility">
                    <span>Veículos elegíveis</span>
                    <strong>{plan.eligibility}</strong>
                  </div>
                  <a className="button button-plan" href="#aplicativo">
                    Quero esse plano <span aria-hidden="true">→</span>
                  </a>
                </article>
              ))}
            </div>
            <p className="plans-note" data-reveal>
              O plano Ilimitado não representa utilizações simultâneas ou sem
              regra: há limite máximo de uma lavagem por veículo a cada dia.
            </p>
          </div>
        </section>

        <section className="section network-section" id="rede">
          <div className="site-shell network-grid">
            <div data-reveal>
              <span className="section-kicker section-kicker-light">Rede de parceiros</span>
              <h2>Começamos por Uberlândia. E queremos crescer junto com a cidade.</h2>
              <p>
                Os benefícios VEKKO são utilizados exclusivamente em
                estabelecimentos credenciados. Em breve, o aplicativo mostrará
                a rede disponível, serviços e distância de cada parceiro.
              </p>
              <a className="button button-light" href="/seja-parceiro">
                Quero fazer parte da rede <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="map-card" data-reveal aria-label="Operação inicial em Uberlândia, Minas Gerais">
              <div className="map-roads road-one" />
              <div className="map-roads road-two" />
              <div className="map-roads road-three" />
              <div className="map-pin"><i />Uberlândia</div>
              <div className="map-caption">
                <span>Operação inicial</span>
                <strong>Uberlândia · MG</strong>
              </div>
            </div>
          </div>
        </section>

        <section className="section partner-preview">
          <div className="site-shell partner-panel" data-reveal>
            <div>
              <span className="section-kicker">Para estabelecimentos</span>
              <h2>Mais clientes para o seu estabelecimento, com uma operação simples e segura.</h2>
            </div>
            <div>
              <p>
                Faça parte da rede VEKKO, receba clientes assinantes e valide
                os atendimentos pelo portal do parceiro.
              </p>
              <div className="partner-mini-steps">
                <span><b>01</b> Receba o cliente</span>
                <span><b>02</b> Valide o QR Code</span>
                <span><b>03</b> Conclua o atendimento</span>
              </div>
              <a className="button button-green" href="/seja-parceiro">
                Quero ser parceiro <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section faq-section" id="faq">
          <div className="site-shell faq-grid">
            <div className="faq-intro" data-reveal>
              <span className="section-kicker">FAQ</span>
              <h2>Dúvidas? A gente simplifica.</h2>
              <p>
                O básico que você precisa saber antes de cadastrar seu veículo
                e escolher um plano.
              </p>
            </div>
            <div className="faq-list" data-reveal>
              {questions.map((item, index) => (
                <details key={item.question} open={index === 0}>
                  <summary>
                    {item.question}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="app-cta grid-surface" id="aplicativo">
          <div className="site-shell app-cta-inner" data-reveal>
            <span className="app-orbit">V</span>
            <span className="section-kicker">Aplicativo VEKKO</span>
            <h2>Seu plano, seu veículo e seus benefícios em um só lugar.</h2>
            <p>
              Acompanhe a chegada da VEKKO a Uberlândia e seja avisado quando o
              aplicativo estiver disponível para contratação.
            </p>
            <div className="hero-actions center-actions">
              <a
                className="button button-green"
                href="mailto:contato@vekko.com.br?subject=Quero%20acompanhar%20o%20lançamento%20da%20VEKKO"
              >
                Acompanhar lançamento <span aria-hidden="true">↗</span>
              </a>
              <a className="text-link" href="/seja-parceiro">
                Cadastrar estabelecimento
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
