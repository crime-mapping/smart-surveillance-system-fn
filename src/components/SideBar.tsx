import React, { useEffect } from "react";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import useLogout from "../utils/logout";
import { tokenDecoder } from "../utils/tokenDecoder";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  onClick: () => void;
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  icon,
  label,
  path,
  onClick,
  isActive,
}) => (
  <li className="mb-1">
    <Link
      to={path}
      className={`flex items-center px-4 py-3 mx-3 rounded-lg transition-all duration-200 group ${isActive
          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
          : "text-slate-700 dark:text-slate-300 hover:bg-slate-200/70 dark:hover:bg-slate-700/50 hover:text-slate-900 dark:hover:text-white"
        }`}
      onClick={onClick}
    >
      <div className={`transition-transform duration-200 ${isActive ? "scale-110" : "group-hover:scale-105"}`}>
        {icon}
      </div>
      <span className="ml-3 font-medium">{label}</span>
    </Link>
  </li>
);

interface SidebarProps {
  items: { icon: React.ReactNode; label: string; path: string }[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const handleLogout = useLogout();
  const location = useLocation();

  useEffect(() => {
    const checkTokenExpiration = () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        handleLogout();
        return;
      }

      try {
        const decodedToken = tokenDecoder();
        const currentTime = Date.now() / 1000;
        if (decodedToken?.exp && decodedToken.exp < currentTime) {
          handleLogout();
        }
      } catch (error) {
        console.error("Token validation error:", error);
        handleLogout();
      }
    };

    checkTokenExpiration();

    const interval = setInterval(checkTokenExpiration, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleItemClick = (label: string) => {
    if (label === "Logout") {
      handleLogout();
    }
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-slate-100 dark:bg-slate-900 border-r border-slate-300 dark:border-slate-700 shadow-xl z-40 overflow-y-auto">
      {/* Logo Section */}
      <div className="px-6 py-6 border-b border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="mt-6 px-3 pb-20">
        <ul className="space-y-1">
          {items.map((item, index) => (
            <SidebarItem
              key={index}
              {...item}
              path={item.path}
              onClick={() => handleItemClick(item.label)}
              isActive={location.pathname === item.path}
            />
          ))}
        </ul>
      </nav>

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-slate-100 dark:from-slate-900 to-transparent pointer-events-none"></div>
    </div>
  );
};

export default Sidebar;
