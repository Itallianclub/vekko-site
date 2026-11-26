import { ArrowDown } from "lucide-react";
import { ButtonWithIcon } from "@/components/ui/button-with-icon";
import "./hero.css";

/** Hero de tela cheia: só tipografia sobre o campo marinho. Sem imagem, mock ou print. */
export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title" data-nav-sentinel>
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-sheen" aria-hidden="true" />
      <div className="shell">
        <div className="hero-copy">
          <h1 className="hero-title" id="hero-title">
            Seu carro limpo o mês inteiro. Sem lavar, sem pensar.
          </h1>
          <p className="hero-sub">
            Assine um plano pro seu carro, lave nos parceiros VEKKO e controle tudo pelo app.
          </p>
          {/* "Ver planos ↓": a seta da copy é o ícone do círculo. */}
          <div className="hero-cta">
            <ButtonWithIcon className="w-full md:w-fit" href="#planos" icon={ArrowDown} rotateIconOnHover={false}>
              Ver planos
            </ButtonWithIcon>
          </div>
        </div>
      </div>

      {/* Transição para a História: do transparente direto para o --mist. */}
      <div className="hero-fade" aria-hidden="true" />

      {/* Âncora na base: mostra que o hero preenche a tela. Copy nova — aguardando aprovação. */}
      <div className="hero-anchor">
        <span className="hero-anchor__pill">Assine. Lave. Repita.</span>
        <span className="hero-anchor__cue" aria-hidden="true">↓</span>
      </div>
    </section>
  );
}
