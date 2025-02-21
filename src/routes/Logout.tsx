import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const performLogout = async () => {
      await logout(); // Trigger the logout function
      navigate("/login"); // Redirect to login page
    };

    performLogout();
  }, [logout, navigate]);

  return null;
};

export default Logout;
