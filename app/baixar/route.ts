import { APP_STORE_URL, GOOGLE_PLAY_URL } from "../config/app-links";
import { detectPlatform } from "../lib/platform";

/**
 * Destino do QR code: manda cada celular direto para a sua loja.
 * Em computadores (ou sistemas desconhecidos) volta para a área de download da home.
 */
export function GET(request: Request) {
  const platform = detectPlatform(request.headers.get("user-agent"));
  const target =
    platform === "ios"
      ? APP_STORE_URL
      : platform === "android"
        ? GOOGLE_PLAY_URL
        : new URL("/#baixar", request.url).toString();

  return new Response(null, {
    status: 302,
    headers: { "cache-control": "no-store", location: target, vary: "User-Agent" },
  });
}
