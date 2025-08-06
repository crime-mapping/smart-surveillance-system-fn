import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import useLogout from "../utils/logout";
import Logo from "./Logo";

const UserSidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogout = useLogout();
  const userRole = sessionStorage.getItem("userRole");
  const isSuperAdmin = userRole === "SUPERADMIN";

  const navigationItems = [
    {
      title: "Dashboard",
      url: "/user-dashboard",
      icon: FiHome,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: FiBarChart,
    },
    {
      title: "Cameras",
      url: "/cameras",
      icon: FiCamera,
    },
    {
      title: "Crime Reports",
      url: "/reports",
      icon: FiFileText,
    },
    {
      title: "Locations",
      url: "/locations",
      icon: FiMapPin,
    },
    {
      title: "Crime Map",
      url: "/map",
      icon: FiMap,
    },
  ];

  const adminItems = isSuperAdmin
    ? [
      {
        title: "All System Users",
        url: "/users",
        icon: FiUsers,
      },
      {
        title: "Register new User",
        url: "/register",
        icon: FiUserPlus,
      },
    ]
    : [];

  const accountItems = [
    {
      title: "Profile",
      url: "/profile",
      icon: FiUser,
    },
    {
      title: "Help & Support",
      url: "/help",
      icon: FiHelpCircle,
    },
  ];

  const handleItemClick = (url: string, title: string) => {
    if (title === "Logout") {
      handleLogout();
    } else {
      navigate(url);
    }
  };

  return (
    <Sidebar collapsible="icon" className="border-r border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
      <SidebarHeader className="border-b border-slate-200 dark:border-slate-700 px-6 py-4 bg-white dark:bg-slate-800">
        <div className="flex items-center space-x-2">
          <Logo />
          <span className="font-bold text-slate-900 dark:text-white text-lg">CM&SS</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white dark:bg-slate-800">
        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wider">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    onClick={() => handleItemClick(item.url, item.title)}
                    className={`
                      group flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                      ${location.pathname === item.url
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400'
                      }
                    `}
                  >
                    <a href={item.url} onClick={(e) => e.preventDefault()}>
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {adminItems.length > 0 && (
          <SidebarGroup>
            <SidebarGroupLabel className="text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wider">
              Administration
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname === item.url}
                      onClick={() => handleItemClick(item.url, item.title)}
                      className={`
                        group flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                        ${location.pathname === item.url
                          ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400'
                        }
                      `}
                    >
                      <a href={item.url} onClick={(e) => e.preventDefault()}>
                        <item.icon className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className="text-slate-500 dark:text-slate-400 font-medium text-xs uppercase tracking-wider">
            Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    onClick={() => handleItemClick(item.url, item.title)}
                    className={`
                      group flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200
                      ${location.pathname === item.url
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-r-2 border-blue-600'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-blue-400'
                      }
                    `}
                  >
                    <a href={item.url} onClick={(e) => e.preventDefault()}>
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span className="truncate">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => handleLogout()}
              className="group flex items-center space-x-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/50 hover:text-red-700 dark:hover:text-red-300"
            >
              <FiLogOut className="w-4 h-4 flex-shrink-0" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
};

export default UserSidebar;
