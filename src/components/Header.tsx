import ThemeSwitch from "./ThemeSwitch";

const Header = () => {
  return (
    <header className="w-full flex items-center justify-between p-4 bg-white dark:bg-gray-800 shadow-md">
      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Logo" className="w-12 h-12" />
      <ThemeSwitch />
    </header>
  );
};

export default Header;
