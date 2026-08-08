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
        <Link className="brand brand-header" href="/" aria-label="VEKKO — página inicial">
          <Image
            src="/vekko-logo-navbar.png"
            alt=""
            width="774"
            height="183"
            priority
          />
        </Link>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navigation.map((item) => (
            <Link href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="button portal-button header-cta" href="/seja-parceiro#portal">
          <span>Acessar portal</span>
          <span className="portal-button-icon" aria-hidden="true">
            <i className="bi bi-arrow-up" />
          </span>
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
