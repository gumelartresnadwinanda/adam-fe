import { createContext, useState, ReactNode, useEffect } from "react";
import axios from "axios";
import { redirect } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  login: (userLoggedIn: User) => void;
  loading: boolean
}
interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
}
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response && (error.response.status === 401 || error.response.status === 403)) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userLoggedIn: User) => {
    setUser(userLoggedIn);
  }

  const logout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/logout`, {}, { withCredentials: true });
      setUser(null);
      redirect("/login");
    } catch (error) {
      redirect("/login");
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, login, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
