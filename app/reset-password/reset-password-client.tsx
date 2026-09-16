"use client";

import Image from "next/image";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";

const API_BASE_URL = "https://api.usevekko.com/api/v1";

type ResetState =
  | "checking"
  | "ready"
  | "submitting"
  | "success"
  | "invalid";

type ApiError = {
  code?: string;
  message?: string;
};

async function postJson(path: string, body: object): Promise<Response> {
  return fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function errorMessageFor(status: number, body?: ApiError): string {
  if (body?.code === "PASSWORD_RESET_TOKEN_INVALID_OR_EXPIRED") {
    return "Este link é inválido, expirou ou já foi utilizado. Solicite um novo link pelo aplicativo VEKKO.";
  }
  if (status === 429) {
    return "Muitas tentativas foram feitas. Aguarde alguns minutos e tente novamente.";
  }
  return (
    body?.message ??
    "Não foi possível redefinir sua senha agora. Tente novamente em alguns instantes."
  );
}

async function readApiError(response: Response): Promise<ApiError | undefined> {
  try {
    return (await response.json()) as ApiError;
  } catch {
    return undefined;
  }
}

export function ResetPasswordClient() {
  const [state, setState] = useState<ResetState>("checking");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let active = true;

    async function validateResetLink() {
      const fragment = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      const candidate = fragment.get("token")?.trim() ?? "";
      if (!candidate) {
        if (!active) return;
        setErrorMessage(
          "O link de redefinição está incompleto ou é inválido. Solicite um novo link pelo aplicativo VEKKO.",
        );
        setState("invalid");
        return;
      }

      try {
        const response = await postJson("/auth/password-reset/validate", {
          token: candidate,
        });
        if (!active) return;
        if (!response.ok) {
          const body = await readApiError(response);
          setErrorMessage(errorMessageFor(response.status, body));
          setState("invalid");
          return;
        }
        setToken(candidate);
        setState("ready");
      } catch {
        if (!active) return;
        setErrorMessage("Não foi possível validar o link agora. Verifique sua internet e tente novamente.");
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

    if (password.length < 8) {
      setErrorMessage("Use uma senha com pelo menos 8 caracteres.");
      return;
    }
    if (password !== confirmation) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    setState("submitting");
    try {
      const response = await postJson("/auth/password-reset/confirm", {
        token,
        password,
      });
      if (!response.ok) {
        const body = await readApiError(response);
        const message = errorMessageFor(response.status, body);
        setErrorMessage(message);
        setState(
          body?.code === "PASSWORD_RESET_TOKEN_INVALID_OR_EXPIRED"
            ? "invalid"
            : "ready",
        );
        return;
      }

      window.history.replaceState(null, "", window.location.pathname);
      setPassword("");
      setConfirmation("");
      setToken("");
      setState("success");
    } catch {
      setErrorMessage(
        "Não foi possível conectar à VEKKO. Verifique sua internet e tente novamente.",
      );
      setState("ready");
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
              <p>Defina uma nova senha para sua conta VEKKO.</p>

              <form className="reset-page__form" onSubmit={handleSubmit} noValidate>
                <label htmlFor="new-password">Nova senha</label>
                <div className="reset-page__field">
                  <input
                    id="new-password"
                    name="new-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    minLength={8}
                    disabled={isBusy}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Mínimo de 8 caracteres"
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
                    minLength={8}
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
                    <>
                      <span className="reset-page__spinner reset-page__spinner--button" />
                      Atualizando...
                    </>
                  ) : (
                    <>Redefinir senha <span aria-hidden="true">→</span></>
                  )}
                </button>
              </form>

              <div className="reset-page__security-note">
                <span aria-hidden="true">✓</span>
                <p>O link é temporário, de uso único e a alteração é concluída em conexão segura com a VEKKO.</p>
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
