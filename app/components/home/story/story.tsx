import "./story.css";

/**
 * O parágrafo vira 3 linhas grandes. Cada uma entra de 72% para 100% de opacidade (≈ --ink-muted → --ink)
 * ao chegar na viewport (ver lib/motion.ts, `.story-line`).
 */
export function Story() {
  return (
    <section className="section section-tint story" aria-labelledby="historia-title">
      <div className="shell">
        <h2 className="h2 story-title" id="historia-title" data-reveal>
          Você já adiou essa lavagem umas três vezes.
        </h2>
        <div className="story-lines">
          <p>
            <span className="story-line">
              Fila, preço diferente em cada lugar, dinheiro na mão, lava-jato fechado quando você passa.
            </span>{" "}
            <span className="story-line">Sempre tem um motivo pra deixar pra depois.</span>
          </p>
          <p className="story-line">Com a VEKKO, você assina uma vez e o resto é só chegar e lavar.</p>
        </div>
      </div>
    </section>
  );
}
