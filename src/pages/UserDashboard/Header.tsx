import React, { useEffect, useState } from "react";
import Notifications from "../../components/Notifications";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { FaUser } from "react-icons/fa";
import ThemeToggle from "../../components/ThemeToggle";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const Header: React.FC = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("/users/profile", {
          withCredentials: true,
        });
        setUsername(res.data.names);
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 flex h-16 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-b border-slate-200/50 dark:border-slate-700/50 px-4 shadow-sm">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700" />
        <Separator orientation="vertical" className="mr-2 h-4 bg-slate-200 dark:bg-slate-700" />
      </div>

      <div className="flex flex-1 items-center justify-between">
        {/* Title */}
        <div className="flex items-center">
          <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
            Smart Surveillance System
          </h1>
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <ThemeToggle />
          <Notifications />

          {/* User Profile */}
          <div
            onClick={() => navigate("/profile")}
            className="flex items-center space-x-3 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors duration-200"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
              <FaUser className="text-white text-sm" />
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-medium text-slate-900 dark:text-white">
                {username || "User"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
