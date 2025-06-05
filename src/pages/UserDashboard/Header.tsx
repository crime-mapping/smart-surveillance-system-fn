import React, { useEffect, useState } from "react";
import Notifications from "../../components/Notifications";
import { useNavigate } from "react-router-dom";
import axios from "../../config/axios";
import { FaUser } from "react-icons/fa";
import ThemeToggle from "../../components/ThemeToggle";
const Header: React.FC = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axios.get("/users/profile", {
          withCredentials: true,
        });
        setUsername(res.data.names);
      } catch (err: any) {
        console.log(err);
      }
    };
    fetchUserProfile();
  }, []);

  const navigate = useNavigate();
  return (
    <header className="flex fixed top-0 left-56 right-0 z-50 items-center justify-between py-2 px-4 bg-[var(--card-bg)] text-[var(--text-color)] shadow-md">
      <h1 className="text-xl italic font-semibold">
        Smart Surveillance System
      </h1>
      <div className="flex items-center space-x-0">
        <ThemeToggle />
        <Notifications />
        <div
          onClick={() => {
            navigate("/profile");
          }}
          className="flex flex-col cursor-pointer items-center"
        >
          <div className="w-16 h-16 rounded-full bg-[var(--bg-color)] flex items-center justify-center">
            <FaUser className="text-gray-600 h-8 w-8 text-5xl" />
          </div>
          <span className="ml-2">{username}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
