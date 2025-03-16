import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  return user ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
