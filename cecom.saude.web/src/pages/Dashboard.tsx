import { useAuth } from "../contexts/AuthContext";
import "./Dashboard.css";

export function Dashboard() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <main className="dashboard-page">
        <p>Carregando...</p>
      </main>
    );
  }

  return (
    <main className="dashboard-page">
      <section className="dashboard-card">
        <p className="dashboard-eyebrow">Área autenticada</p>
        <h1>Dashboard Cecom Saúde</h1>
        <p className="dashboard-copy">
          Sua autenticação foi validada na API. Abaixo estão os dados da sessão atual.
        </p>

        <dl className="dashboard-grid" aria-label="Resumo da sessão">
          <div>
            <dt>ID do usuário</dt>
            <dd>{user?.id ?? "-"}</dd>
          </div>
          <div>
            <dt>Perfil</dt>
            <dd>{user?.role ?? "-"}</dd>
          </div>
          <div>
            <dt>Código Master</dt>
            <dd>{user?.cdMaster ?? "-"}</dd>
          </div>
        </dl>

        <button onClick={logout} className="logout-btn">
          Sair
        </button>
      </section>
    </main>
  );
}
