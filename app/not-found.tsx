import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="vekko-404">
      <header className="vekko-404__header">
        <Link className="vekko-404__brand" href="/" aria-label="VEKKO — início">
          <Image src="/vekko-logo-navbar.png" alt="VEKKO" width={185} height={58} priority />
        </Link>
        <Link className="vekko-404__top-link" href="/">
          <span aria-hidden="true">←</span> Voltar para o início
        </Link>
      </header>

      <section className="vekko-404__content" aria-labelledby="not-found-title">
        <div className="vekko-404__code" aria-hidden="true">404</div>
        <div className="vekko-404__visual" aria-hidden="true">
          <div className="vekko-404__shadow" />
          <div className="vekko-404__bucket">
            <span className="vekko-404__bubble vekko-404__bubble--one" />
            <span className="vekko-404__bubble vekko-404__bubble--two" />
            <span className="vekko-404__bubble vekko-404__bubble--three" />
            <div className="vekko-404__symbol-shell">
              <Image src="/vekko-symbol.png" alt="" width={88} height={88} />
            </div>
          </div>
        </div>
        <div className="vekko-404__copy">
          <h1 id="not-found-title">Ops... página não encontrada.</h1>
          <p>
            A página que você procura pode ter sido removida, o endereço pode
            estar incorreto ou ainda não existe.
          </p>
          <Link className="vekko-404__button" href="/">
            Voltar para o início <span aria-hidden="true">→</span>
          </Link>
          <small>SEU CARRO, DO SEU JEITO.</small>
        </div>
      </section>
    </main>
  );
}
