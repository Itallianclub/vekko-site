/**
 * Links do app VEKKO — fonte única para todo o site.
 *
 * IDs oficiais das lojas:
 * - APPLE_APP_ID: o número que aparece na URL da App Store (…/app/vekko/id1234567890 → "1234567890").
 * - PLAY_PACKAGE: o pacote Android (confirmado no app.config do vekko-mobile).
 */
export const APPLE_APP_ID = "6833514367";
export const PLAY_PACKAGE = "com.usevekko.app";

export const APP_STORE_URL = `https://apps.apple.com/br/app/vekko-benef%C3%ADcios-automotivos/id${APPLE_APP_ID}`;
export const GOOGLE_PLAY_URL = `https://play.google.com/store/apps/details?id=${PLAY_PACKAGE}`;

/** Domínio público do site. O QR code de download aponta para `${SITE_URL}/baixar`. */
export const SITE_URL = "https://www.usevekko.com";

/** Rota que redireciona para a loja certa conforme o sistema do celular. */
export const DOWNLOAD_PATH = "/baixar";
export const DOWNLOAD_URL = `${SITE_URL}${DOWNLOAD_PATH}`;

/** Portal do parceiro (botão "Acessar portal" do header). */
export const PARTNER_PORTAL_URL = "/seja-parceiro#portal";

export const CONTACT_EMAIL = "contato@vekko.com.br";

/**
 * Cena "de sujo a limpo" (sequência de imagens controlada pela rolagem).
 * Frames: `public/wash/001.webp` … `048.webp` (máx. 1280px de largura e 80KB cada) + `public/wash/final.webp`.
 *
 * Enquanto `ready` for `false`, a seção NÃO é renderizada: sem os arquivos, até o fallback
 * (`final.webp`) daria 404, imagem quebrada e erro no console. Coloque os arquivos e mude para `true`.
 */
export const WASH_SEQUENCE = { ready: false, frames: 48, width: 1280, height: 720 } as const;
