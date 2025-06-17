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
  <li className="mb-2">
    <Link
      to={path}
      className={`flex items-center text-gray-300 hover:text-white ${
        isActive ? "bg-blue-500" : ""
      } p-2 rounded`}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{label}</span>
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

      const decodedToken: any = tokenDecoder();
      const currentTime = Date.now() / 1000;
      if (decodedToken.exp < currentTime) {
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
    <div className="w-[14.5%] flex fixed top-0 flex-col gap-[40px] h-screen bg-primaryBackground  text-[var(--text-color)] py-6">
      <Logo />
      <nav>
        <ul className="flex flex-col">
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
    </div>
  );
};

export default Sidebar;
