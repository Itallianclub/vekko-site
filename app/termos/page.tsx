import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description:
    "Condições gerais para uso do site, aplicativo e serviços da plataforma VEKKO.",
};

export default function TermsPage() {
  return (
    <LegalPage
      title="Termos de Uso"
      description="Estes termos apresentam as condições gerais de acesso e utilização dos canais e serviços VEKKO."
    >
      <section>
        <h2>1. A VEKKO</h2>
        <p>
          A VEKKO conecta clientes, veículos e estabelecimentos credenciados por
          meio de planos de assinatura e benefícios automotivos. A operação
          inicial começa com lavagem automotiva em Uberlândia/MG.
        </p>
      </section>
      <section>
        <h2>2. Cadastro e conta</h2>
        <p>
          O usuário deve fornecer informações verdadeiras, manter seus dados
          atualizados e proteger suas credenciais. O uso da conta é pessoal, e
          atividades suspeitas podem levar a bloqueios preventivos.
        </p>
      </section>
      <section>
        <h2>3. Veículos e assinaturas</h2>
        <ul>
          <li>cada assinatura pertence a um único veículo;</li>
          <li>cada veículo pode ter somente uma assinatura ativa;</li>
          <li>um cadastro pode possuir até cinco veículos;</li>
          <li>planos e benefícios dependem da elegibilidade do veículo;</li>
          <li>SUV e Pickup não podem contratar o plano Basic.</li>
        </ul>
      </section>
      <section>
        <h2>4. Utilização dos benefícios</h2>
        <p>
          Os benefícios são usados somente em estabelecimentos credenciados. A
          autorização ocorre pelo aplicativo e pelo QR Code validado pelo
          parceiro. Benefícios não acumulam para ciclos futuros e estão sujeitos
          aos limites do plano contratado.
        </p>
      </section>
      <section>
        <h2>5. Plano Ilimitado</h2>
        <p>
          O plano Ilimitado não significa uso irrestrito no mesmo dia. Existe o
          limite máximo de uma lavagem por veículo a cada dia, além das demais
          regras operacionais apresentadas na contratação.
        </p>
      </section>
      <section>
        <h2>6. Pagamentos, renovação e cancelamento</h2>
        <p>
          Preços, ciclo, renovação, formas de pagamento e condições de
          cancelamento são apresentados antes da contratação. A ativação do
          benefício depende da confirmação do pagamento.
        </p>
      </section>
      <section>
        <h2>7. Estabelecimentos parceiros</h2>
        <p>
          Os parceiros são responsáveis pela execução dos serviços autorizados
          em suas unidades. A VEKKO organiza o credenciamento, a validação e o
          registro da utilização, sem prometer disponibilidade em qualquer
          estabelecimento fora da rede.
        </p>
      </section>
      <section>
        <h2>8. Uso adequado</h2>
        <p>
          Não é permitido fraudar autorizações, compartilhar acessos, manipular
          informações do veículo, explorar falhas ou utilizar a plataforma para
          finalidade ilícita. Violações podem resultar em suspensão e medidas
          cabíveis.
        </p>
      </section>
      <section>
        <h2>9. Disponibilidade e alterações</h2>
        <p>
          A plataforma pode receber ajustes de recursos, planos, rede e regras,
          sempre respeitando direitos adquiridos, legislação aplicável e as
          informações apresentadas ao usuário.
        </p>
      </section>
      <section>
        <h2>10. Contato</h2>
        <p>
          Para dúvidas sobre estes termos, fale com a VEKKO pelo e-mail
          <a href="mailto:contato@vekko.com.br"> contato@vekko.com.br</a> ou
          pelos canais oficiais informados na plataforma.
        </p>
      </section>
    </LegalPage>
  );
}
