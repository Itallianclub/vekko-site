"use client";

import { FirebaseError } from "firebase/app";
import {
  confirmPasswordReset,
  verifyPasswordResetCode,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { firebaseAuth } from "./firebase-client";

type ResetState =
  | "checking"
  | "ready"
  | "submitting"
  | "success"
  | "invalid";

function maskEmail(email: string): string {
  const [local, domain] = email.split("@");
  if (!local || !domain) return email;
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${"•".repeat(Math.max(3, local.length - visible.length))}@${domain}`;
}

function getFirebaseMessage(error: unknown): string {
  if (!(error instanceof FirebaseError)) {
    return "Não foi possível redefinir sua senha agora. Tente novamente.";
  }
  const messages: Record<string, string> = {
    "auth/expired-action-code":
      "Este link expirou. Solicite uma nova redefinição de senha pelo aplicativo VEKKO.",
    "auth/invalid-action-code":
      "Este link é inválido ou já foi utilizado. Solicite uma nova redefinição.",
    "auth/network-request-failed":
      "Não foi possível conectar ao Firebase. Verifique sua internet e tente novamente.",
    "auth/too-many-requests":
      "Muitas tentativas foram feitas. Aguarde alguns minutos e tente novamente.",
    "auth/weak-password":
      "A nova senha não atende aos requisitos mínimos de segurança.",
  };

  return (
    messages[error.code] ??
    "Não foi possível redefinir sua senha agora. Solicite um novo link e tente novamente."
  );
}

export function ResetPasswordClient() {
  const [state, setState] = useState<ResetState>("checking");
  const [oobCode, setOobCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function validateResetLink() {
      const params = new URLSearchParams(window.location.search);
      const mode = params.get("mode");
      const code = params.get("oobCode")?.trim() ?? "";

      await Promise.resolve();
      if (!active) return;

      if (mode !== "resetPassword" || !code) {
        setErrorMessage(
          "O link de redefinição está incompleto ou é inválido. Solicite um novo link pelo aplicativo VEKKO.",
        );
        setState("invalid");
        return;
      }

      setOobCode(code);
      try {
        const resolvedEmail = await verifyPasswordResetCode(firebaseAuth, code);
        if (!active) return;
        setEmail(resolvedEmail);
        setState("ready");
      } catch (error) {
        if (!active) return;
        setErrorMessage(getFirebaseMessage(error));
        setState("invalid");
      }
    }

    void validateResetLink();
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    if (password.length < 6) {
      setErrorMessage("Use uma senha com pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmation) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    setState("submitting");

    try {
      await confirmPasswordReset(firebaseAuth, oobCode, password);
      setState("success");
      setPassword("");
      setConfirmation("");
    } catch (error) {
      setErrorMessage(getFirebaseMessage(error));
      if (
        error instanceof FirebaseError &&
        (error.code === "auth/expired-action-code" ||
          error.code === "auth/invalid-action-code")
      ) {
        setState("invalid");
      } else {
        setState("ready");
      }
    }
  }

  const isBusy = state === "checking" || state === "submitting";

  return (
    <main className="reset-page">
      <header className="reset-page__header">
        <Link href="/" aria-label="VEKKO — início" className="reset-page__brand">
          <Image
            src="/vekko-logo-navbar.png"
            alt="VEKKO"
            width={185}
            height={58}
            priority
          />
        </Link>
        <a href="https://app.usevekko.com" className="reset-page__app-link">
          Ir para o app <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="reset-page__shell">
        <div className="reset-page__glow reset-page__glow--one" />
        <div className="reset-page__glow reset-page__glow--two" />
        <div className="reset-page__card" aria-live="polite">
          <div className="reset-page__symbol">
            <Image src="/vekko-symbol.png" alt="" width={72} height={72} />
          </div>

          {state === "checking" ? (
            <div className="reset-page__status">
              <span className="reset-page__spinner" aria-hidden="true" />
              <p>Validando seu link com segurança...</p>
            </div>
          ) : null}

          {state === "invalid" ? (
            <div className="reset-page__content">
              <span className="reset-page__eyebrow">LINK INDISPONÍVEL</span>
              <h1>Esse link não pode mais ser usado.</h1>
              <p>{errorMessage}</p>
              <a className="reset-page__primary" href="https://app.usevekko.com">
                Voltar para o app <span aria-hidden="true">→</span>
              </a>
              <small>
                No app, toque em “Esqueci minha senha” para solicitar um novo e-mail.
              </small>
            </div>
          ) : null}

          {state === "success" ? (
            <div className="reset-page__content">
              <div className="reset-page__success-mark" aria-hidden="true">✓</div>
              <span className="reset-page__eyebrow">SENHA ATUALIZADA</span>
              <h1>Sua nova senha já está ativa.</h1>
              <p>Agora você pode voltar para a VEKKO e entrar normalmente.</p>
              <a className="reset-page__primary" href="https://app.usevekko.com">
                Entrar na VEKKO <span aria-hidden="true">→</span>
              </a>
            </div>
          ) : null}

          {state === "ready" || state === "submitting" ? (
            <div className="reset-page__content">
              <span className="reset-page__eyebrow">REDEFINIÇÃO DE SENHA</span>
              <h1>Crie uma nova senha.</h1>
              <p>
                Defina uma nova senha para sua conta VEKKO
                {email ? <> vinculada a <strong>{maskEmail(email)}</strong>.</> : "."}
              </p>

              <form className="reset-page__form" onSubmit={handleSubmit} noValidate>
                <label htmlFor="new-password">Nova senha</label>
                <div className="reset-page__field">
                  <input
                    id="new-password"
                    name="new-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={6}
                    disabled={isBusy}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Mínimo de 6 caracteres"
                    required
                  />
                  <button
                    className="reset-page__toggle"
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>

                <label htmlFor="confirm-password">Confirmar nova senha</label>
                <div className="reset-page__field">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={6}
                    disabled={isBusy}
                    value={confirmation}
                    onChange={(event) => setConfirmation(event.target.value)}
                    placeholder="Digite novamente"
                    required
                  />
                </div>

                {errorMessage ? (
                  <div className="reset-page__feedback" role="alert">
                    <span aria-hidden="true">!</span>
                    <p>{errorMessage}</p>
                  </div>
                ) : null}

                <button
                  className="reset-page__primary reset-page__submit"
                  type="submit"
                  disabled={isBusy || !password || !confirmation}
                >
                  {state === "submitting" ? (
                    <><span className="reset-page__spinner reset-page__spinner--button" /> Atualizando...</>
                  ) : (
                    <>Redefinir senha <span aria-hidden="true">→</span></>
                  )}
                </button>
              </form>

              <div className="reset-page__security-note">
                <span aria-hidden="true">✓</span>
                <p>Seu link é validado diretamente pelo Firebase. A VEKKO não recebe sua senha.</p>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <footer className="reset-page__footer">
        <span>VEKKO</span>
        <span aria-hidden="true">•</span>
        <span>Carros mais livres, rotina mais leve.</span>
      </footer>
    </main>
  );
}
