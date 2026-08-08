import type { Metadata } from "next";
import { SiteFooter } from "../components/SiteFooter";
import { SiteHeader } from "../components/SiteHeader";

export const metadata: Metadata = {
  title: "Seja um parceiro",
  description:
    "Faça parte da rede VEKKO em Uberlândia, receba clientes assinantes e valide os atendimentos com segurança.",
};

const partnerBenefits = [
  {
    number: "01",
    title: "Novos clientes",
    text: "Conecte seu estabelecimento a motoristas com planos ativos e interesse recorrente em cuidado automotivo.",
  },
  {
    number: "02",
    title: "Operação organizada",
    text: "Valide cada atendimento pelo portal e acompanhe as informações necessárias para a sua rotina.",
  },
  {
    number: "03",
    title: "Rede confiável",
    text: "Participe de uma operação com regras claras, credenciamento e suporte desde a entrada na rede.",
  },
] as const;

const partnerSteps = [
  {
    number: "01",
    title: "O cliente chega ao local",
    text: "O motorista escolhe um estabelecimento credenciado e apresenta a autorização gerada no aplicativo.",
  },
  {
    number: "02",
    title: "Você valida o QR Code",
    text: "O portal confere o veículo, o plano, a elegibilidade e a disponibilidade do benefício.",
  },
  {
    number: "03",
    title: "O serviço é realizado",
    text: "Com a autorização válida, o estabelecimento realiza o atendimento previsto para aquele plano.",
  },
  {
    number: "04",
    title: "O atendimento é concluído",
    text: "A conclusão registra o consumo do benefício e alimenta o acompanhamento operacional do parceiro.",
  },
] as const;

export default function PartnerPage() {
  return (
    <>
      <SiteHeader />
      <main className="page-main">
        <section className="partner-hero grid-surface">
          <div className="site-shell partner-hero-grid">
            <div>
              <span className="section-kicker">Rede VEKKO · Uberlândia/MG</span>
              <h1>
                Mais clientes para o seu estabelecimento.
                <em>Operação simples e segura.</em>
              </h1>
            </div>
            <div>
              <p>
                Faça parte da rede VEKKO, receba clientes assinantes e valide
                os atendimentos pelo portal do parceiro.
              </p>
              <div className="hero-actions">
                <a className="button button-green" href="#cadastro">
                  Quero ser parceiro <i className="bi bi-arrow-down" aria-hidden="true" />
                </a>
                <a className="text-link" href="#portal">
                  Já sou parceiro
                  <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="partner-benefits">
          <div className="site-shell">
            <div className="section-heading compact">
              <div>
                <span className="section-kicker">Por que participar</span>
                <h2>Uma parceria feita para funcionar na rotina real.</h2>
              </div>
            </div>
            <div className="partner-benefits-grid">
              {partnerBenefits.map((benefit) => (
                <article className="partner-info-card" key={benefit.number}>
                  <span>{benefit.number}</span>
                  <h3>{benefit.title}</h3>
                  <p>{benefit.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="partner-process" id="operacao">
          <div className="site-shell">
            <div className="section-heading">
              <div>
                <span className="section-kicker section-kicker-light">Atendimento</span>
                <h2>Do QR Code à conclusão, tudo fica registrado.</h2>
              </div>
              <p>
                O backend da VEKKO confere as regras do plano e do veículo. O
                parceiro executa uma jornada objetiva pelo portal.
              </p>
            </div>
            <div className="steps-grid">
              {partnerSteps.map((step) => (
                <article className="step-card" key={step.number}>
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

        <section className="partner-signup" id="cadastro">
          <div className="site-shell partner-signup-grid">
            <div className="partner-copy">
              <span className="section-kicker">Cadastro do estabelecimento</span>
              <h2>Prepare sua operação para entrar na rede.</h2>
              <p>
                A VEKKO analisa cada solicitação antes de liberar o acesso. Os
                valores, condições de atendimento e repasses são apresentados
                no processo de credenciamento — sem promessa de volume ou ganho
                garantido.
              </p>
              <a
                className="button button-green"
                href="mailto:parceiros@vekko.com.br?subject=Quero%20ser%20parceiro%20VEKKO"
              >
                Solicitar cadastro
                <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
              </a>
            </div>
            <ul className="partner-checklist" aria-label="Informações para o cadastro">
              <li><i className="bi bi-check-lg" aria-hidden="true" />Dados do responsável e do estabelecimento</li>
              <li><i className="bi bi-check-lg" aria-hidden="true" />CNPJ e informações comerciais</li>
              <li><i className="bi bi-check-lg" aria-hidden="true" />Endereço e localização da unidade</li>
              <li><i className="bi bi-check-lg" aria-hidden="true" />Horários de atendimento</li>
              <li><i className="bi bi-check-lg" aria-hidden="true" />Serviços e tipos de veículo atendidos</li>
              <li><i className="bi bi-check-lg" aria-hidden="true" />Fotos e informações da estrutura</li>
            </ul>
          </div>
        </section>

        <section className="portal-section" id="portal">
          <div className="site-shell portal-grid">
            <div className="portal-badge" aria-hidden="true">
              <strong>PORTAL DO PARCEIRO</strong>
              <i className="bi bi-shop-window" />
            </div>
            <div className="portal-copy">
              <span className="section-kicker">Já faz parte da rede?</span>
              <h2>Seu acesso é liberado após a aprovação.</h2>
              <p>
                Parceiros aprovados recebem as orientações de acesso ao portal.
                Se você já concluiu o cadastro e precisa de ajuda com sua conta,
                fale com o time VEKKO.
              </p>
              <a
                className="button button-dark"
                href="mailto:parceiros@vekko.com.br?subject=Ajuda%20com%20o%20portal%20VEKKO"
              >
                Solicitar ajuda de acesso
                <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
