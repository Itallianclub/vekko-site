import { WASH_SEQUENCE } from "../../../config/app-links";
import "./wash.css";

/**
 * Cena do carro de sujo a limpo. O canvas é desenhado pelo motion.ts (carWashSequence).
 * - Abaixo de 640px e com movimento reduzido: mostra só o `final.webp`.
 * - Sem os assets (`WASH_SEQUENCE.ready = false`): a seção não é renderizada.
 */
export function Wash() {
  if (!WASH_SEQUENCE.ready) return null;
  const { frames, height, width } = WASH_SEQUENCE;

  return (
    <section className="section section-tint wash" aria-labelledby="wash-title">
      <div className="shell">
        {/* Copy nova — aguardando aprovação. */}
        <h2 className="h2 section-title wash-title" id="wash-title" data-reveal>
          De sujo a limpo, sem você fazer nada.
        </h2>
        <canvas aria-hidden="true" className="wash-canvas" data-frames={frames} height={height} width={width} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt="Carro limpo após lavagem VEKKO"
          className="wash-fallback"
          decoding="async"
          height={height}
          loading="lazy"
          src="/wash/final.webp"
          width={width}
        />
      </div>
    </section>
  );
}
