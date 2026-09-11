import type { Metadata } from "next";
import { LegalPage } from "../components/legal-page/legal-page";

export const metadata: Metadata = {
  title: "Exclusão de conta",
  description: "Saiba como solicitar a exclusão da sua conta VEKKO e dos dados associados.",
};

export default function AccountDeletionPage() {
  return (
    <LegalPage
      title="Exclusão de conta"
      description="A exclusão pode ser iniciada diretamente no aplicativo VEKKO. Este canal permanece como alternativa de suporte."
    >
      <section>
        <h2>1. Como excluir pelo aplicativo</h2>
        <p>
          No aplicativo VEKKO, acesse Perfil, abra a seção Privacidade e conta
          e toque em Excluir minha conta. Confirme a ação para iniciar o
          processo de exclusão.
        </p>
        <p>
          Se você não conseguir entrar no aplicativo, use o mesmo e-mail
          cadastrado na conta para falar com nosso canal de privacidade.
        </p>
        <p>
          <a href="mailto:privacidade@vekko.com.br?subject=Exclus%C3%A3o%20de%20conta%20VEKKO">
            Falar com o canal de privacidade
          </a>
        </p>
      </section>
      <section>
        <h2>2. Antes da exclusão</h2>
        <p>
          Se existir assinatura ativa, pagamento pendente ou atendimento em
          andamento, a VEKKO poderá orientar a regularização ou o encerramento
          desses vínculos antes de concluir a exclusão.
        </p>
      </section>
      <section>
        <h2>3. O que acontece com os dados</h2>
        <p>
          Dados que não precisarem ser mantidos serão eliminados ou
          anonimizados. Informações cuja conservação seja necessária para
          cumprir obrigações legais, prevenir fraudes ou exercer direitos
          poderão ser retidas pelo prazo aplicável.
        </p>
      </section>
      <section>
        <h2>4. Privacidade</h2>
        <p>
          Consulte também nossa <a href="/privacidade">Política de Privacidade</a>
          para entender como tratamos dados pessoais e quais direitos podem ser
          exercidos.
        </p>
      </section>
    </LegalPage>
  );
}
