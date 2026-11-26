"use client";

import type { ReactNode } from "react";
import { track } from "../../lib/analytics";
import type { Store } from "../../lib/platform";
import { storeLinks, usePlatform } from "./platform-context";
import "./store-buttons.css";

type StoreButtonsProps = {
  /** Seção onde o botão aparece; vai junto no evento `store_click`. */
  section: string;
  /** QR code renderizado no servidor, exibido só no computador. */
  qr?: ReactNode;
  /**
   * `compact`: para a barra fixa. Botão menor; sem QR; quando o sistema não é identificado,
   * mostra as duas lojas só com ícone (o nome completo fica no aria-label).
   */
  variant?: "default" | "compact";
};

/**
 * iOS → só App Store. Android → só Google Play. Computador → as duas lojas + QR code.
 */
export function StoreButtons({ section, qr, variant = "default" }: StoreButtonsProps) {
  const compact = variant === "compact";
  const platform = usePlatform();
  const iconOnly = compact && platform === "desktop";
  const stores: Store[] =
    platform === "ios" ? ["app_store"] : platform === "android" ? ["google_play"] : ["app_store", "google_play"];

  return (
    <div className={`store-buttons is-${platform}${compact ? " is-compact" : ""}`}>
      <ul className="store-list">
        {stores.map((store) => {
          const link = storeLinks[store];
          return (
            <li key={store}>
              <a
                aria-label={iconOnly ? link.label : undefined}
                className={`button button-store${iconOnly ? " is-icon" : ""}`}
                href={link.href}
                onClick={() => track("store_click", { store, section })}
                rel="noopener"
              >
                <svg aria-hidden="true" className="store-icon" fill="currentColor" focusable="false" viewBox="0 0 16 16">
                  <path d={link.iconPath} />
                </svg>
                {iconOnly ? null : link.label}
              </a>
            </li>
          );
        })}
      </ul>

      {platform === "desktop" && qr && !compact ? (
        <figure className="store-qr">
          {qr}
          <figcaption>Aponte a câmera do celular e baixe em segundos</figcaption>
        </figure>
      ) : null}
    </div>
  );
}
