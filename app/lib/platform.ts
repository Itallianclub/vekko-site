export type Platform = "ios" | "android" | "desktop";
export type Store = "app_store" | "google_play";

/** Detecta o sistema pelo user agent. iPadOS se apresenta como Mac; o cliente corrige isso via touch. */
export function detectPlatform(userAgent: string | null | undefined, maxTouchPoints = 0): Platform {
  const ua = userAgent ?? "";
  if (/android/i.test(ua)) return "android";
  if (/iphone|ipad|ipod/i.test(ua)) return "ios";
  if (/macintosh/i.test(ua) && maxTouchPoints > 1) return "ios";
  return "desktop";
}

export function storeForPlatform(platform: Platform): Store | null {
  if (platform === "ios") return "app_store";
  if (platform === "android") return "google_play";
  return null;
}
