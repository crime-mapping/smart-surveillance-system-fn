import { useTheme } from "../contexts/ThemeContext";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 mr-4 rounded-full text-white bg-blue-300 transition-all"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? <FiMoon /> : <FiSun />}
    </button>
  );
};

export default ThemeToggle;
