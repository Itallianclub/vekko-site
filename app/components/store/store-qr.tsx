import QRCode from "qrcode";
import { DOWNLOAD_URL } from "../../config/app-links";

/**
 * QR code gerado no servidor (SVG inline, nenhum JS no cliente).
 * Aponta para /baixar, que redireciona cada celular para a loja certa.
 */
export async function StoreQr() {
  const svg = await QRCode.toString(DOWNLOAD_URL, {
    color: { dark: "#0b1a2e", light: "#ffffff" },
    errorCorrectionLevel: "M",
    margin: 1,
    type: "svg",
  });

  return (
    <span
      aria-label="QR code para baixar o app VEKKO"
      className="store-qr-code"
      dangerouslySetInnerHTML={{ __html: svg }}
      role="img"
    />
  );
}
