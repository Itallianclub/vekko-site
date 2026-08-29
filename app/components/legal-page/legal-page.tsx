import type { ReactNode } from "react";
import { SiteFooter } from "../layout/site-footer/site-footer";
import { SiteHeader } from "../layout/site-header/site-header";
import "./legal-page.css";

type LegalPageProps = {
  children: ReactNode;
  description: string;
  title: string;
};

export function LegalPage({ children, description, title }: LegalPageProps) {
  return (
    <>
      <SiteHeader />
      <main className="page-main">
        <section className="legal-hero grid-surface">
          <div className="site-shell">
            <span className="section-kicker">VEKKO · Documento institucional</span>
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
        </section>
        <div className="legal-content">
          <aside className="legal-meta">
            Última atualização
            <br />
            07 de agosto de 2026
          </aside>
          <article className="legal-body">{children}</article>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
