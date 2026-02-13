import { useMemo, useState } from "react";
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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    resetFeedback();
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const master = Number(cdMaster);
      
      if (mode === "login") {
      try {
        console.log("Senha recebida:", email);
        console.log("Hash do banco:", senha);  
        await login(normalizedEmail, senha);
        setSucesso("Login realizado com sucesso.");
       } catch {
        setErro("E-mail ou senha inválidos");
       } finally {
        setLoading(false);
       }
      }

      if (mode === "register") {
        await api.post("/auth/register", {
          cdMaster: master,
          email: normalizedEmail,
          senha,
          confirmarSenha,
        });
        setSucesso("Conta criada com sucesso. Faça login para continuar.");
        setMode("login");
        setSenha("");
        setConfirmarSenha("");
      }

      if (mode === "recovery") {
        await api.post("/auth/recovery/request", {
          cdMaster: master,
          email: normalizedEmail,
        });
        setSucesso(
          "Se existir uma conta para este e-mail, enviaremos instruções de recuperação."
        );
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        (mode === "login" ? "E-mail ou senha inválidos" : "Não foi possível concluir sua solicitação.");
      setErro(message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="auth-page">
      <section className="auth-card" aria-label="Acesso à plataforma Cecom Saúde">
        <header className="auth-header">
          <p className="auth-eyebrow">Cecom Saúde</p>
          <h1>Acesso seguro à plataforma</h1>
          <p>
            Entre com sua conta corporativa, crie um novo acesso vinculado ao Master
            ou inicie o processo de recuperação de senha.
          </p>
        </header>

        <nav className="auth-tabs" aria-label="Opções de autenticação">
          <button type="button" onClick={() => setMode("login")} className={mode === "login" ? "active" : ""}>Entrar</button>
          <button type="button" onClick={() => setMode("register")} className={mode === "register" ? "active" : ""}>Criar conta</button>
          <button type="button" onClick={() => setMode("recovery")} className={mode === "recovery" ? "active" : ""}>Recuperar senha</button>
        </nav>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            Código Master
            <input
              type="number"
              min={1}
              value={cdMaster}
              onChange={(e) => setCdMaster(e.target.value)}
              required
            />
          </label>

          <label>
            E-mail corporativo
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>

          {mode !== "recovery" && (
            <label>
              Senha
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                autoComplete={mode === "login" ? "current-password" : "new-password"}
                required
              />
            </label>
          )}

          {mode === "register" && (
            <>
              <label>
                Confirmar senha
                <input
                  type="password"
                  value={confirmarSenha}
                  onChange={(e) => setConfirmarSenha(e.target.value)}
                  autoComplete="new-password"
                  required
                />
              </label>
              <p className={`password-hint ${isPasswordStrong ? "ok" : "warn"}`}>
                Sua senha deve conter 8+ caracteres, com maiúscula, minúscula e número.
              </p>
            </>
          )}

          {erro && <p className="feedback error">{erro}</p>}
          {sucesso && <p className="feedback success">{sucesso}</p>}

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? "Processando..." : mode === "login" ? "Entrar" : mode === "register" ? "Criar conta" : "Enviar recuperação"}
          </button>
        </form>
      </section>
    </main>
  );
}
