import Link from "next/link";
import "./partner-strip.css";

export function PartnerStrip() {
  return (
    <aside className="partner-strip" aria-label="Para lava-jatos">
      <div className="shell partner-strip-inner">
        <p>
          Tem um lava-jato? <strong>Receba clientes recorrentes com a VEKKO.</strong>
        </p>
        <Link className="text-link" href="/seja-parceiro">
          <span aria-hidden="true">→</span> Seja parceiro
        </Link>
      </div>
    </aside>
  );
}
