"use client";

import { track } from "../../../lib/analytics";
import { useDeviceStore } from "../../store/platform-context";

/**
 * No celular leva direto à loja do aparelho. No computador desce até o QR code de download.
 */
export function PlanCta({ plan, featured }: { plan: string; featured: boolean }) {
  const deviceStore = useDeviceStore();

  return (
    <a
      aria-label={`Quero esse plano: ${plan}`}
      className={`button ${featured ? "button-primary" : "button-outline"} plan-cta`}
      href={deviceStore?.href ?? "#baixar"}
      onClick={() => track("plan_cta_click", { plan })}
      rel={deviceStore ? "noopener" : undefined}
    >
      Quero esse plano
    </a>
  );
}
