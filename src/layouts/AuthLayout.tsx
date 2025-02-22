import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header";

const AuthLayout = () => {
  const location = useLocation();
  const showLogout = location.pathname === "/profile";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <Header showLogout={showLogout} />
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        <div className="w-full max-w-sm p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;