import { useMemo, useState } from "react";
import { Tabs } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";
import "./Login.css";

type AuthMode = "login" | "register" | "recovery";

export function Login() {
  const { login } = useAuth();

  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cdMaster, setCdMaster] = useState("1");
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isPasswordStrong = useMemo(() => {
    return (
      senha.length >= 8 &&
      /[A-Z]/.test(senha) &&
      /[a-z]/.test(senha) &&
      /\d/.test(senha)
    );
  }, [senha]);

  function resetFeedback() {
    setErro(null);
    setSucesso(null);
  }

  function handleModeChange(value: string) {
    if (value === "login" || value === "register" || value === "recovery") {
      setMode(value);
      resetFeedback();
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    resetFeedback();
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const master = Number(cdMaster);

      if (!Number.isInteger(master) || master <= 0) {
        throw new Error("Informe um Unidade Organizacional valido.");
      }

      if (mode === "login") {
        await login(master, normalizedEmail, senha);
        setSucesso("Login realizado com sucesso.");
        return;
      }

      if (mode === "register") {
        if (!isPasswordStrong) {
          throw new Error("A senha precisa ter ao menos 8 caracteres com maiuscula, minuscula e numero.");
        }

        if (senha !== confirmarSenha) {
          throw new Error("A confirmacao de senha nao confere.");
        }

        await api.post("/auth/register", {
          cdMaster: master,
          email: normalizedEmail,
          senha,
          confirmarSenha,
        });

        setSucesso("Conta criada com sucesso. Faca login para continuar.");
        setMode("login");
        setSenha("");
        setConfirmarSenha("");
        return;
      }

      await api.post("/auth/recovery/request", {
        cdMaster: master,
        email: normalizedEmail,
      });

      setSucesso(
        "Se existir uma conta para este e-mail, enviaremos instrucoes de recuperacao."
      );
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        (error instanceof Error ? error.message : null) ??
        (mode === "login"
          ? "E-mail ou senha invalidos."
          : "Nao foi possivel concluir sua solicitacao.");
      setErro(message);
    } finally {
      setLoading(false);
    }
  }

  const confirmMismatch =
    mode === "register" && confirmarSenha.length > 0 && confirmarSenha !== senha;
  const passwordWeak = mode === "register" && senha.length > 0 && !isPasswordStrong;

  const submitLabel =
    mode === "login"
      ? "Entrar"
      : mode === "register"
        ? "Criar conta"
        : "Enviar recuperacao";

  return (
    <main className="auth-page">
      <div className="auth-glow auth-glow-left" aria-hidden="true" />
      <div className="auth-glow auth-glow-right" aria-hidden="true" />

      <section className="auth-card" aria-label="Acesso a plataforma Cecom Saúde">
        <header className="auth-header">
          <p className="auth-eyebrow">Cecom Saúde - Igreja Batista da Graça</p>
          <h2>Centro Comunitário Clériston Andrade</h2>
          <p>Entre, crie uma conta ou recupere sua senha em um fluxo unico e seguro.</p>
        </header>

        <Tabs.Root value={mode} onValueChange={handleModeChange} className="auth-tabs-root">
          <Tabs.List className="auth-tabs-list" aria-label="Opcoes de autenticacao">
            <Tabs.Trigger value="login" className="auth-tab-trigger">
              Entrar
            </Tabs.Trigger>
            <Tabs.Trigger value="register" className="auth-tab-trigger">
              Criar conta
            </Tabs.Trigger>
            <Tabs.Trigger value="recovery" className="auth-tab-trigger">
              Recuperar senha
            </Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="login" className="auth-panel">
            <p className="mode-description">Use seu e-mail corporativo e senha para entrar.</p>
          </Tabs.Content>
          <Tabs.Content value="register" className="auth-panel">
            <p className="mode-description">Crie seu acesso vinculado ao Unidade Organizacional.</p>
          </Tabs.Content>
          <Tabs.Content value="recovery" className="auth-panel">
            <p className="mode-description">Informe os dados para receber instrucoes de recuperacao.</p>
          </Tabs.Content>
        </Tabs.Root>

        <form onSubmit={handleSubmit} className="auth-form" noValidate>
          <label className="input-group">
            Unidade Organizacional
            <input
              type="number"
              min={1}
              value={cdMaster}
              onChange={(e) => setCdMaster(e.target.value)}
              required
              aria-invalid={!!erro}
            />
          </label>

          <label className="input-group">
            E-mail corporativo
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              aria-invalid={!!erro}
            />
          </label>

          {mode !== "recovery" && (
            <label className="input-group">
              Senha
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                required
                aria-invalid={passwordWeak || !!erro}
              />
            </label>
          )}

          {mode === "register" && (
            <>
              <label className="input-group">
                Confirmar senha
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  autoComplete="new-password"
                  required
                  aria-invalid={confirmMismatch || !!erro}
                />
              </label>
              <p className={`password-hint ${isPasswordStrong ? "ok" : "warn"}`} aria-live="polite">
                Sua senha deve conter 8+ caracteres, com maiuscula, minuscula e numero.
              </p>
            </>
          )}

          {erro && (
            <p className="feedback error" role="alert">
              {erro}
            </p>
          )}

          {sucesso && (
            <p className="feedback success" role="status" aria-live="polite">
              {sucesso}
            </p>
          )}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Processando..." : submitLabel}
          </button>
        </form>
      </section>
    </main>
  );
}
