import { StoreButtons } from "../../store/store-buttons";
import { StoreQr } from "../../store/store-qr";
import "./final-cta.css";

export function FinalCta() {
  return (
    <section className="section section-blue final-cta" id="baixar" aria-labelledby="baixar-title">
      <div className="shell final-cta-inner" data-reveal-group>
        <h2 className="h2" id="baixar-title">Seu próximo carro limpo está a um download de distância.</h2>
        <StoreButtons qr={<StoreQr />} section="final_cta" />
        <p className="final-cta-note">Grátis para baixar.</p>
      </div>
    </section>
  );
}
