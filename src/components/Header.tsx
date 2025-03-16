import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import LogoutIcon from "../assets/LogoutIcon";

interface HeaderProps {
  showLogout?: boolean;
}

const Header = ({ showLogout }: HeaderProps) => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <header className={`w-full flex items-center ${showLogout ? 'justify-between' : 'justify-center'} p-4 bg-white dark:bg-gray-800 shadow-md`}>
      {showLogout && (
        <div className="p-2" />
      )}
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Logo" className="w-12 h-12" />
      {showLogout && (
        <LogoutIcon onClick={handleLogout} />
      )}
    </header>
  );
};

export default Header;
