import { useAuth } from "../contexts/AuthContext";

export function Dashboard() {
  const { user, logout, loading } = useAuth();

  if (loading) return <p>Carregando...</p>;

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
      <button onClick={logout}>Sair</button>
    </div>
  );
}
