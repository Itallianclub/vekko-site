import { ArrowUpRight, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ButtonWithIconProps = {
  href: string;
  children: ReactNode;
  /** Ícone do círculo (lucide-react). */
  icon?: LucideIcon;
  /** Gira o ícone 45° no hover (faz sentido para setas diagonais). */
  rotateIconOnHover?: boolean;
  className?: string;
};

/**
 * Botão pill com ícone em círculo: no hover o texto e o círculo trocam de lado.
 * Cores vêm do tema (primary = azul de ação VEKKO, background = branco).
 * Transições só com `prefers-reduced-motion: no-preference` (variante `motion-safe:`).
 */
export function ButtonWithIcon({
  href,
  children,
  icon: Icon = ArrowUpRight,
  rotateIconOnHover = true,
  className,
}: ButtonWithIconProps) {
  return (
    <Button
      asChild
      className={cn(
        "group relative h-14 w-fit cursor-pointer overflow-hidden rounded-full p-1 ps-8 pe-16 text-base font-semibold",
        "hover:bg-[var(--blue-action-hover)] hover:shadow-[0_0_24px_rgb(8_120_232/0.35)] hover:ps-16 hover:pe-8",
        // Interação entre 120 e 250ms, só com movimento permitido.
        "motion-safe:transition-all motion-safe:duration-[250ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)] motion-safe:active:scale-[0.97]",
        className,
      )}
    >
      <a href={href}>
        <span className="relative z-10">{children}</span>
        <span
          aria-hidden="true"
          className={cn(
            "absolute right-1 flex size-12 items-center justify-center rounded-full bg-background text-primary",
            "group-hover:right-[calc(100%-52px)]",
            "motion-safe:transition-all motion-safe:duration-[250ms] motion-safe:ease-[cubic-bezier(0.16,1,0.3,1)]",
            rotateIconOnHover && "group-hover:rotate-45",
          )}
        >
          <Icon size={20} strokeWidth={2.25} />
        </span>
      </a>
    </Button>
  );
}

export default ButtonWithIcon;
