import {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  type ReactNode,
  type Context,
} from "react";
import { api } from "../services/api";

interface User {
  id: number;
  role: string;
  cdMaster: number;
}

interface AuthContextData {
  user: User | null;
  loading: boolean;
  login(cdMaster: number, email: string, senha: string): Promise<void>;
  logout(): void;
}

const AuthContext: Context<AuthContextData | undefined> =
  createContext<AuthContextData | undefined>(undefined);

// ✅ PROVIDER (apenas UM)
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    try {
      const response = await api.get("/auth/me");
      setUser(response.data);
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }

  async function login(cdMaster: number, email: string, senha: string) {
    const response = await api.post("/auth/login", { cdMaster, email, senha });
    localStorage.setItem("token", response.data.token);
    setUser(response.data.usuario);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  useEffect(() => {
    loadUser();
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, logout }),
    [user, loading]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// ✅ HOOK (nome correto)
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}

