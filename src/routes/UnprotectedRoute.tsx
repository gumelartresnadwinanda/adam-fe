import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

const UnprotectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const redirectUrl = urlParams.get('redirect');

  useEffect(() => {
    if (user) {
      console.log(redirectUrl)
      if (redirectUrl) {
        if (redirectUrl.startsWith('http')) {
          const separator = redirectUrl.includes('?') ? '&' : '?';
          window.location.href = `${redirectUrl}${separator}ref=adam`;
        } else {
          navigate(redirectUrl);
        }
      } else {
        navigate("/profile");
      }
    }
  }, [user, navigate, redirectUrl])

  return children;
};

export default UnprotectedRoute;
