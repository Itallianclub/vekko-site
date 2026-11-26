import Link from "next/link";
import { CONTACT_EMAIL } from "../../../config/app-links";
import "./site-footer.css";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer-line">
        <span>© 2026 VEKKO</span>
        <nav aria-label="Links institucionais">
          <Link href="/privacidade">Privacidade</Link>
          <Link href="/termos">Termos</Link>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </nav>
      </div>
    </footer>
  );
}
