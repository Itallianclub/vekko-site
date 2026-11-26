"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../../config/app-links";
import { detectPlatform, storeForPlatform, type Platform, type Store } from "../../lib/platform";

const PlatformContext = createContext<Platform>("desktop");

const subscribe = () => () => {};
const detectOnClient = () => detectPlatform(navigator.userAgent, navigator.maxTouchPoints);

/**
 * O servidor já renderiza com a plataforma lida do user agent (sem troca visual).
 * No cliente confirmamos com `navigator`, o que cobre iPadOS e respostas em cache.
 */
export function PlatformProvider({ initial, children }: { initial: Platform; children: ReactNode }) {
  const platform = useSyncExternalStore(subscribe, detectOnClient, () => initial);
  return <PlatformContext.Provider value={platform}>{children}</PlatformContext.Provider>;
}

export function usePlatform() {
  return useContext(PlatformContext);
}

export const storeLinks: Record<Store, { href: string; label: string; iconPath: string }> = {
  app_store: { href: APP_STORE_URL, label: "Baixar na App Store", iconPath:
      "M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282" },
  google_play: { href: GOOGLE_PLAY_URL, label: "Baixar no Google Play", iconPath: "M14.222 9.374c1.037-.61 1.037-2.137 0-2.748L11.528 5.04 8.32 8l3.207 2.96zm-3.595 2.116L7.583 8.68 1.03 14.73c.201 1.029 1.36 1.61 2.303 1.055zM1 13.396V2.603L6.846 8zM1.03 1.27l6.553 6.05 3.044-2.81L3.333.215C2.39-.341 1.231.24 1.03 1.27" },
};

/** Loja do aparelho atual, ou `null` no computador. */
export function useDeviceStore() {
  const platform = usePlatform();
  const store = storeForPlatform(platform);
  return store ? { store, ...storeLinks[store] } : null;
}
