import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/button";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [user, setUser] = useState<{ full_name: string; username: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Profile";

    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/me`, { withCredentials: true });
        setUser({
          full_name: response.data.user.full_name,
          username: response.data.user.username,
          email: response.data.user.email,
        });
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const handleLogout = async () => {
    await logout(); 
    navigate("/login");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Your Profile</h2>
        {user ? (
          <div>
            <p className="text-gray-700 dark:text-gray-300">Full Name: {user.full_name}</p>
            <p className="text-gray-700 dark:text-gray-300">Username: {user.username}</p>
            <p className="text-gray-700 dark:text-gray-300">Email: {user.email}</p>
          </div>
        ) : (
          <p className="text-gray-700 dark:text-gray-300">Failed to load user details.</p>
        )}
        <Button onClick={handleLogout} className="mt-4">Logout</Button>
      </div>
  );
};

export default Profile;
