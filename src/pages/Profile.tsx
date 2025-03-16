import { useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

const Profile = () => {
  const { user } = useAuth();

  useEffect(() => {
    document.title = "Profile";
  }, []);

  return (
    <div className="p-6 text-center">
      {user ? (
        <div className="flex flex-col items-center">
          <p className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-2">Welcome, <span className="italic">{user.full_name}</span>!</p>
          <p className="text-lg text-gray-600 dark:text-gray-400 mb-2">Here's your username: <span className="font-semibold">{user.username}</span></p>
          <p className="text-lg text-gray-600 dark:text-gray-400">And your email: <span className="italic">{user.email}</span></p>
        </div>
      ) : (
        <p className="text-gray-700 dark:text-gray-300">Failed to load user details.</p>
      )}
    </div>
  );
};

export default Profile;
