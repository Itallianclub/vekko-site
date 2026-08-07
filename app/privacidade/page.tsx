import type { Metadata } from "next";
import { LegalPage } from "../components/LegalPage";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description:
    "Saiba como a VEKKO trata dados pessoais em seus canais digitais, aplicativo e operação.",
};

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Política de Privacidade"
      description="Esta política explica, de forma clara, como os dados pessoais podem ser utilizados para oferecer e proteger a experiência VEKKO."
    >
      <section>
        <h2>1. Sobre esta política</h2>
        <p>
          A VEKKO é uma plataforma de assinatura e benefícios automotivos por
          veículo. Esta política se aplica ao site, ao aplicativo, aos portais
          operacionais e aos canais oficiais relacionados à plataforma.
        </p>
      </section>
      <section>
        <h2>2. Dados que podemos tratar</h2>
        <p>Conforme o serviço utilizado, podemos tratar:</p>
        <ul>
          <li>dados de identificação, contato e conta;</li>
          <li>dados do veículo, como placa, tipo e informações cadastrais;</li>
          <li>dados de assinatura, pagamento e histórico de utilização;</li>
          <li>localização aproximada para exibir parceiros próximos;</li>
          <li>dados de estabelecimentos, responsáveis e unidades parceiras;</li>
          <li>informações técnicas de segurança e funcionamento dos serviços.</li>
        </ul>
      </section>
      <section>
        <h2>3. Para que usamos os dados</h2>
        <p>
          Utilizamos dados para criar e proteger contas, cadastrar veículos,
          apresentar planos elegíveis, processar assinaturas, localizar
          parceiros, autorizar atendimentos, prevenir fraudes, prestar suporte,
          cumprir obrigações legais e melhorar a plataforma.
        </p>
      </section>
      <section>
        <h2>4. Compartilhamento</h2>
        <p>
          Dados podem ser compartilhados, no limite necessário, com
          estabelecimentos credenciados, provedores de pagamento, autenticação,
          infraestrutura, armazenamento, comunicação e autoridades competentes.
          A VEKKO não comercializa dados pessoais.
        </p>
      </section>
      <section>
        <h2>5. Segurança e retenção</h2>
        <p>
          Adotamos controles técnicos e organizacionais adequados ao risco. Os
          dados são mantidos apenas pelo período necessário para as finalidades
          informadas, para o cumprimento de obrigações legais e para o exercício
          regular de direitos.
        </p>
      </section>
      <section>
        <h2>6. Seus direitos</h2>
        <p>
          O titular pode solicitar confirmação de tratamento, acesso, correção,
          portabilidade quando aplicável, informações sobre compartilhamento,
          oposição, revogação de consentimento e eliminação nos casos previstos
          na legislação.
        </p>
      </section>
      <section>
        <h2>7. Cookies e tecnologias semelhantes</h2>
        <p>
          O site pode usar tecnologias essenciais para segurança, desempenho e
          funcionamento. Caso ferramentas adicionais de análise ou publicidade
          sejam adotadas, os controles e informações correspondentes serão
          apresentados ao visitante.
        </p>
      </section>
      <section>
        <h2>8. Contato</h2>
        <p>
          Dúvidas e solicitações sobre privacidade podem ser encaminhadas para
          <a href="mailto:privacidade@vekko.com.br"> privacidade@vekko.com.br</a>
          ou pelos canais oficiais disponíveis no aplicativo.
        </p>
      </section>
    </LegalPage>
  );
}
