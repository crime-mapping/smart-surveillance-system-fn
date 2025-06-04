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
  FiMapPin,
  FiBarChart,
} from "react-icons/fi";

const UserSidebar: React.FC = () => {
  const userRole = sessionStorage.getItem("userRole");
  const isSuperAdmin = userRole === "SUPERADMIN";

  const userItems = [
    {
      icon: <FiHome className="w-5 h-5" />,
      label: "Dashboard",
      path: "/user-dashboard",
    },
    {
      icon: <FiBarChart className="w-5 h-5" />,
      label: "Analytics",
      path: "/analytics",
    },
    {
      icon: <FiCamera className="w-5 h-5" />,
      label: "Cameras",
      path: "/cameras",
    },
    {
      icon: <FiFileText className="w-5 h-5" />,
      label: "Reports",
      path: "/reports",
    },
    {
      icon: <FiMapPin className="w-5 h-5" />,
      label: "Locations",
      path: "/locations",
    },
    { icon: <FiMap className="w-5 h-5" />, label: "Crime Map", path: "/map" },
    ...(isSuperAdmin
      ? [
          {
            icon: <FiUsers />,
            label: "All System Users",
            path: "/users",
          },
          {
            icon: <FiUserPlus />,
            label: "Register new User",
            path: "/register",
          },
        ]
      : []),
    {
      icon: <FiUser className="w-5 h-5" />,
      label: "Profile",
      path: "/profile",
    },
    {
      icon: <FiHelpCircle className="w-5 h-5" />,
      label: "Help & Support",
      path: "/help",
    },
    { icon: <FiLogOut className="w-5 h-5" />, label: "Logout", path: "/login" },
  ];

  return <Sidebar items={userItems} />;
};

export default UserSidebar;
