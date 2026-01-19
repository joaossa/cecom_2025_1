// cecom.saude.web/src/App.tsx
import { useAuth } from "./contexts/AuthContext";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";

export default function App() {
  const { user, loading } = useAuth();

  if (loading) return <p>Carregando aplicação...</p>;

  if (!user) {
    return <Login />;
  }

  return <Dashboard />;
}
