import type { Metadata } from "next";
import { ResetPasswordClient } from "./reset-password-client";
import "./reset-password.css";

export const metadata: Metadata = {
  title: "Redefinir senha",
  description: "Crie uma nova senha para sua conta VEKKO.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
