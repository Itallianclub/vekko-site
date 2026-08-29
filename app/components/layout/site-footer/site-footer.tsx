import Image from "next/image";
import Link from "next/link";
import "./site-footer.css";

export function SiteFooter() {
  return (
    <footer className="site-footer" id="contato">
      <div className="site-shell footer-grid">
        <div>
          <Link className="brand brand-footer" href="/" aria-label="VEKKO — página inicial">
            <Image src="/vekko-symbol.png" alt="" width="50" height="39" />
            <span>VEKKO</span>
          </Link>
          <p>
            Assinatura e benefícios automotivos por veículo, conectados a uma
            rede de estabelecimentos parceiros.
          </p>
        </div>

        <div>
          <strong>Motoristas</strong>
          <Link href="/#como-funciona">Como funciona</Link>
          <Link href="/#planos">Planos</Link>
          <Link href="/#rede">Rede credenciada</Link>
          <Link href="/#faq">Dúvidas frequentes</Link>
        </div>

        <div>
          <strong>Parceiros</strong>
          <Link href="/seja-parceiro">Seja parceiro</Link>
          <Link href="/seja-parceiro#operacao">Como funciona</Link>
          <Link href="/seja-parceiro#cadastro">Cadastro</Link>
          <Link href="/seja-parceiro#portal">Acessar portal</Link>
        </div>

        <div>
          <strong>Institucional</strong>
          <a href="mailto:contato@vekko.com.br">contato@vekko.com.br</a>
          <Link href="/privacidade">Política de Privacidade</Link>
          <Link href="/termos">Termos de Uso</Link>
          <span>Uberlândia · Minas Gerais</span>
        </div>
      </div>
      <div className="site-shell footer-bottom">
        <span>© 2026 VEKKO. Todos os direitos reservados.</span>
        <span>Começando por Uberlândia/MG.</span>
      </div>
    </footer>
  );
}
