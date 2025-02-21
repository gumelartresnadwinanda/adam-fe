import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [authState, setAuthState] = useState(isAuthenticated);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated && !authState) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, { withCredentials: true });
          if (response.status === 200) {
            login();
            setAuthState(true);
          } else {
            setAuthState(false);
          }
        } catch {
          setAuthState(false);
        }
      } else {
        setAuthState(true);
      }
      setLoading(false);
    };

    checkAuth();
  }, [isAuthenticated, authState, login]);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner or any other loading indicator
  }

  return authState ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
