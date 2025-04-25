import React from "react";
import Sidebar from "./SideBar";
import {
  FiHome,
  FiCamera,
  FiFileText,
  FiHelpCircle,
  FiMap,
  FiUser,
  FiLogOut,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";

const UserSidebar: React.FC = () => {
  const userItems = [
    {
      icon: <FiHome className="w-5 h-5" />,
      label: "Dashboard",
      path: "/user-dashboard",
    },
    {
      icon: <FiCamera className="w-5 h-5" />,
      label: "Cameras",
      path: "/cameras",
    },
    {
      icon: <FiFileText className="w-5 h-5" />,
      label: "Reports",
      path: "/user-dashboard",
    },
    { icon: <FiMap className="w-5 h-5" />, label: "Crime Map", path: "/map" },
    {
      icon: <FiHelpCircle className="w-5 h-5" />,
      label: "Help & Support",
      path: "/help",
    },
    {
      icon: <FiUsers className="w-5 h-5" />,
      label: "All System Users",
      path: "/users",
    },
    {
      icon: <FiUserPlus className="w-5 h-5" />,
      label: "Register new User",
      path: "/register",
    },
    {
      icon: <FiUser className="w-5 h-5" />,
      label: "Profile",
      path: "/user-dashboard",
    },
    { icon: <FiLogOut className="w-5 h-5" />, label: "Logout", path: "/" },
  ];

  return <Sidebar items={userItems} />;
};

export default UserSidebar;
