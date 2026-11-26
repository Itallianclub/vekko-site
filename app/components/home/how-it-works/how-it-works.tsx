import { CalendarCheck, Car, MapPin, QrCode, type LucideIcon } from "lucide-react";
import { steps } from "../home-data";
import "./how-it-works.css";

const icons: Record<(typeof steps)[number]["icon"], LucideIcon> = {
  car: Car,
  plan: CalendarCheck,
  pin: MapPin,
  qr: QrCode,
};

export function HowItWorks() {
  return (
    <section className="section section-white" id="como-funciona" aria-labelledby="como-funciona-title">
      <div className="shell">
        <h2 className="h2 section-title" id="como-funciona-title" data-reveal>
          Da assinatura ao carro limpo em quatro passos.
        </h2>

        <ol className="steps">
          {steps.map((step, index) => {
            const Icon = icons[step.icon];
            const glue = "glue" in step ? step.glue : 1;
            const words = step.after.split(" ");
            const firstWord = words.slice(0, glue).join(" ");
            const rest = words.slice(glue).join(" ");
            return (
              <li className="step" key={step.before}>
                <span className="step-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="step-title">
                  {step.before}{" "}
                  {/* Chip + palavra seguinte num bloco que não quebra: o ícone nunca fica órfão. */}
                  <span className="chip-group">
                    <span className="icon-chip" aria-hidden="true">
                      <Icon size={16} strokeWidth={2} />
                    </span>
                    {firstWord}
                  </span>
                  {rest ? ` ${rest}` : null}
                </h3>
                <p className="step-support">{step.support}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
