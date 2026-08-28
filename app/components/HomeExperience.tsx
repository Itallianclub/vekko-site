"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

const steps = [
  { number: "01", title: "Cadastre seu veículo", text: "Adicione seu carro e deixe a VEKKO organizar tudo por veículo.", icon: "bi-car-front" },
  { number: "02", title: "Escolha um plano", text: "Selecione a frequência ideal para a sua rotina.", icon: "bi-card-checklist" },
  { number: "03", title: "Encontre um parceiro", text: "Veja os estabelecimentos credenciados perto de você.", icon: "bi-geo-alt" },
  { number: "04", title: "Autorize pelo QR Code", text: "Gere o acesso no app e valide diretamente no parceiro.", icon: "bi-qr-code-scan" },
] as const;

const benefits = [
  {
    className: "benefit-wide",
    icon: "bi-calendar2-check",
    eyebrow: "Rotina simples",
    title: "Seu carro limpo sem depender de decisões de última hora.",
    text: "Plano, saldo, parceiros e histórico organizados em um único aplicativo.",
    stat: "1 APP",
  },
  {
    className: "benefit-dark",
    icon: "bi-qr-code-scan",
    eyebrow: "Uso seguro",
    title: "Uma autorização para cada atendimento.",
    text: "O QR Code conecta motorista, veículo e parceiro antes do serviço começar.",
    stat: "QR",
  },
  {
    className: "benefit-blue",
    icon: "bi-eye",
    eyebrow: "Tudo transparente",
    title: "Você acompanha cada benefício utilizado.",
    text: "Sem surpresa: frequência, elegibilidade e saldo sempre visíveis.",
    stat: "100%",
  },
  {
    className: "benefit-network",
    icon: "bi-buildings",
    eyebrow: "Rede credenciada",
    title: "Liberdade para escolher onde cuidar do veículo.",
    text: "A VEKKO começa em Uberlândia e cresce junto com parceiros selecionados.",
    stat: "UDI",
  },
] as const;

const plans = [
  { name: "Basic", price: "79,90", washes: "2 lavagens por ciclo", description: "Para manter o cuidado em dia sem complicar a rotina.", eligibility: "Hatch e Sedan", accent: false },
  { name: "Essential", price: "119,90", washes: "4 lavagens por ciclo", description: "A frequência certa para quem usa o carro todos os dias.", eligibility: "Hatch, Sedan, SUV e Pickup", accent: true },
  { name: "Premium", price: "179,90", washes: "8 lavagens por ciclo", description: "Mais cuidado para quem quer o carro sempre pronto.", eligibility: "Hatch, Sedan, SUV e Pickup", accent: false },
  { name: "Ilimitado", price: "379,90", washes: "Até 1 lavagem por dia", description: "Para uma rotina intensa, sem saldo mensal de lavagens.", eligibility: "Hatch, Sedan, SUV e Pickup", accent: false },
] as const;

const questions = [
  { question: "A assinatura pertence ao cliente ou ao veículo?", answer: "Ao veículo. Cada carro cadastrado tem sua própria assinatura, benefícios e histórico de utilização." },
  { question: "Quantos veículos posso cadastrar?", answer: "Cada pessoa pode cadastrar até cinco veículos. Cada um pode ter uma assinatura ativa individual." },
  { question: "Posso utilizar em qualquer estabelecimento?", answer: "Os benefícios são utilizados nos estabelecimentos credenciados que aparecem como disponíveis no aplicativo VEKKO." },
  { question: "Como funciona o QR Code?", answer: "Você gera uma autorização no aplicativo. O parceiro lê o QR Code, confere o veículo e valida o atendimento antes do serviço." },
  { question: "Os benefícios acumulam?", answer: "Não. Cada plano segue o próprio ciclo e os benefícios não utilizados não passam para o ciclo seguinte." },
  { question: "Quais veículos podem contratar cada plano?", answer: "Hatch e Sedan podem contratar qualquer plano. SUV e Pickup podem escolher Essential, Premium ou Ilimitado." },
] as const;

function PhoneMockup({ className = "" }: { className?: string }) {
  return (
    <div className={`app-phone ${className}`} aria-label="Prévia conceitual do aplicativo VEKKO" role="img">
      <div className="phone-island" />
      <div className="phone-statusbar">
        <span>9:41</span>
        <span aria-hidden="true"><i className="bi bi-reception-4" /><i className="bi bi-wifi" /><i className="bi bi-battery-full" /></span>
      </div>
      <div className="phone-appbar">
        <Image src="/vekko-logo-navbar.png" alt="VEKKO" width={108} height={26} />
        <i className="bi bi-bell" aria-hidden="true" />
      </div>
      <div className="phone-search"><i className="bi bi-search" aria-hidden="true" />Buscar parceiro próximo</div>
      <div className="phone-map" aria-hidden="true">
        <span className="map-line map-line-a" />
        <span className="map-line map-line-b" />
        <span className="map-line map-line-c" />
        <span className="app-pin pin-a"><i className="bi bi-droplet-fill" /></span>
        <span className="app-pin pin-b"><i className="bi bi-droplet-fill" /></span>
        <span className="app-location"><i className="bi bi-navigation-fill" /></span>
      </div>
      <div className="phone-partner">
        <span>Mais próximo</span>
        <strong>Vekko Wash · Centro</strong>
        <small><i className="bi bi-star-fill" aria-hidden="true" /> 4,9 · 1,2 km de você</small>
      </div>
      <div className="phone-tabbar" aria-hidden="true"><i className="bi bi-house-fill" /><i className="bi bi-geo-alt" /><i className="bi bi-qr-code-scan" /><i className="bi bi-person" /></div>
    </div>
  );
}

function RegisterPhone() {
  return (
    <div className="app-phone register-phone" aria-label="Tela conceitual de cadastro de veículo" role="img">
      <div className="phone-island" />
      <div className="phone-statusbar">
        <span>9:41</span>
        <span aria-hidden="true"><i className="bi bi-reception-4" /><i className="bi bi-wifi" /><i className="bi bi-battery-full" /></span>
      </div>
      <span className="phone-back" aria-hidden="true"><i className="bi bi-chevron-left" /></span>
      <div className="register-content">
        <span className="phone-step">Passo 1 de 4</span>
        <h3>Cadastre seu veículo</h3>
        <p>Comece pela placa. É rápido e seguro.</p>
        <div className="register-field"><b>Placa do veículo</b><span>ABC1D23</span></div>
        <div className="register-field"><b>Marca</b><span>Selecione a marca</span></div>
        <div className="register-field"><b>Modelo</b><span>Selecione o modelo</span></div>
        <span className="phone-primary">Adicionar veículo</span>
      </div>
      <div className="phone-homebar" />
    </div>
  );
}

export function HomeExperience() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const context = gsap.context(() => {
      gsap.from("[data-hero-reveal]", { delay: 0.08, duration: 0.86, ease: "power3.out", opacity: 0, stagger: 0.08, y: 26 });
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, { duration: 0.76, ease: "power3.out", opacity: 0, scrollTrigger: { start: "top 86%", trigger: element }, y: 38 });
      });
      gsap.to(".hero-phone", { duration: 5, ease: "sine.inOut", repeat: -1, y: -10, yoyo: true });
      gsap.to(".hero-car", { duration: 6, ease: "sine.inOut", repeat: -1, x: 8, yoyo: true });
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef}>
      <SiteHeader />
      <main>
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
                <PhoneMockup className="hero-phone" />
                <Image className="hero-car" src="/hero-car.webp" alt="Automóvel representando os veículos atendidos pela VEKKO" width={1586} height={992} priority />
                <div className="floating-plan"><span>Plano ativo</span><strong>Vekko Essential</strong><p><b>4</b> lavagens por ciclo</p><small>Próxima renovação · 12 set</small></div>
                <div className="floating-location" aria-hidden="true"><i className="bi bi-geo-alt-fill" /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section how-section" id="como-funciona">
          <div className="site-shell how-grid">
            <div className="how-copy" data-reveal>
              <span className="section-kicker">Como funciona</span>
              <h2>Da assinatura ao carro limpo em quatro passos.</h2>
              <p>Tudo acontece pelo app — do plano à autorização da lavagem.</p>
              <div className="steps-list">
                {steps.map((step, index) => (
                  <article className={index === 0 ? "active" : ""} key={step.number}>
                    <span>{step.number}</span><i className={`bi ${step.icon}`} aria-hidden="true" /><div><h3>{step.title}</h3><p>{step.text}</p></div>
                  </article>
                ))}
              </div>
            </div>
            <div className="how-visual" data-reveal>
              <span className="how-orbit orbit-one" aria-hidden="true" /><span className="how-orbit orbit-two" aria-hidden="true" />
              <RegisterPhone /><div className="how-badge"><i className="bi bi-shield-check" /> Cadastro protegido</div>
            </div>
          </div>
        </section>

        <section className="section section-soft" id="beneficios">
          <div className="site-shell">
            <div className="section-heading" data-reveal>
              <div><span className="section-kicker">Feito para a vida real</span><h2>Menos improviso. Mais cuidado.</h2></div>
              <p>A VEKKO transforma uma tarefa recorrente em uma experiência simples, previsível e rastreável.</p>
            </div>
            <div className="benefits-deck">
              {benefits.map((benefit) => (
                <article className={`benefit-card ${benefit.className}`} data-reveal key={benefit.title}>
                  <div className="benefit-top"><i className={`bi ${benefit.icon}`} aria-hidden="true" /><span>{benefit.stat}</span></div>
                  <div><span className="section-kicker">{benefit.eyebrow}</span><h3>{benefit.title}</h3><p>{benefit.text}</p></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section plans-section" id="planos">
          <div className="site-shell">
            <div className="section-heading" data-reveal>
              <div><span className="section-kicker">Planos VEKKO</span><h2>Escolha sua frequência.</h2></div>
              <p>Uma assinatura mensal para cada veículo. Você escolhe o plano e acompanha tudo pelo app.</p>
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

        <section className="section network-section" id="rede">
          <div className="site-shell network-grid">
            <div className="network-copy" data-reveal>
              <span className="section-kicker section-kicker-light">Rede VEKKO</span><h2>Encontre um parceiro perto de você.</h2>
              <p>Escolha pelo mapa, confira os serviços disponíveis e autorize o atendimento sem sair do aplicativo.</p>
              <ul><li><i className="bi bi-check-circle-fill" /> Parceiros credenciados</li><li><i className="bi bi-check-circle-fill" /> Distância e rota no app</li><li><i className="bi bi-check-circle-fill" /> Avaliações após o atendimento</li></ul>
              <Link className="button button-light" href="/seja-parceiro">Quero ser parceiro <i className="bi bi-arrow-up-right" /></Link>
            </div>
            <div className="network-map" data-reveal aria-label="Representação da rede VEKKO em Uberlândia">
              <div className="network-road road-a" /><div className="network-road road-b" /><div className="network-road road-c" />
              <span className="network-pin pin-1"><i className="bi bi-droplet-fill" /></span><span className="network-pin pin-2"><i className="bi bi-droplet-fill" /></span><span className="network-pin pin-3"><i className="bi bi-droplet-fill" /></span>
              <div className="network-card"><span>Operação inicial</span><strong>Uberlândia · MG</strong><small>Novos parceiros em credenciamento</small></div>
            </div>
          </div>
        </section>

        <section className="section partner-preview">
          <div className="site-shell partner-panel" data-reveal>
            <div className="partner-mark"><Image src="/vekko-symbol.png" alt="" width={88} height={70} /><span>PARCEIROS</span></div>
            <div className="partner-panel-copy">
              <span className="section-kicker">Para estabelecimentos</span><h2>Clientes recorrentes. Operação simples.</h2>
              <p>Entre para a rede VEKKO, valide os atendimentos pelo portal e acompanhe cada serviço realizado.</p>
              <div className="partner-mini-steps"><span><b>01</b> Receba</span><span><b>02</b> Valide</span><span><b>03</b> Conclua</span></div>
              <Link className="button button-primary" href="/seja-parceiro">Conhecer parceria <i className="bi bi-arrow-right" /></Link>
            </div>
          </div>
        </section>

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

        <section className="app-cta grid-surface" id="aplicativo">
          <div className="site-shell app-cta-inner" data-reveal>
            <div className="app-cta-copy"><span className="section-kicker">Aplicativo VEKKO</span><h2>Seu carro limpo começa com um plano.</h2><p>Acompanhe o lançamento em Uberlândia e saiba quando as assinaturas estiverem disponíveis.</p>
              <div className="hero-actions"><a className="button button-primary" href="mailto:contato@vekko.com.br?subject=Quero%20acompanhar%20o%20lançamento%20da%20VEKKO">Acompanhar lançamento <i className="bi bi-arrow-up-right" /></a><Link className="text-link" href="/seja-parceiro">Cadastrar estabelecimento</Link></div>
            </div>
            <div className="app-cta-visual" aria-hidden="true"><Image src="/vekko-symbol.png" alt="" width={470} height={370} /></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
