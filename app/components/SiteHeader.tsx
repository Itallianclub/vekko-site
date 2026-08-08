import Image from "next/image";
import Link from "next/link";

const navigation = [
  { href: "/#como-funciona", label: "Como funciona" },
  { href: "/#planos", label: "Planos" },
  { href: "/#rede", label: "Parceiros" },
  { href: "/seja-parceiro", label: "Seja parceiro" },
] as const;

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-shell header-shell">
        <Link className="brand" href="/" aria-label="VEKKO — página inicial">
          <Image src="/vekko-icon.svg" alt="" width="38" height="38" priority />
          <span>VEKKO</span>
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="button button-dark header-cta" href="/seja-parceiro#portal">
          Acessar portal <i className="bi bi-box-arrow-up-right" aria-hidden="true" />
        </Link>

        <details className="mobile-menu">
          <summary aria-label="Abrir menu">Menu</summary>
          <nav aria-label="Navegação para celular">
            {navigation.map((item) => (
              <Link href={item.href} key={item.href}>
                {item.label}
              </Link>
            ))}
            <Link href="/seja-parceiro#portal">Acessar portal</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
