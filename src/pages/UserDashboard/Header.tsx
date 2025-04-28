import React from "react";
import profilePicture from "../../assets/new-profile.jpg";
import Notifications from "../../components/Notifications";
import { useNavigate } from "react-router-dom";
const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <header className="flex fixed top-0 left-56 right-0 z-50 items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-xl italic font-semibold">
        Smart Surveillance System
      </h1>
      <div className="flex items-center space-x-2">
        <Notifications />
        <div
          onClick={() => {
            navigate("/profile");
          }}
          className="flex flex-col cursor-pointer items-center"
        >
          <img
            src={profilePicture}
            alt="User"
            className="rounded-full w-10 h-10"
          />
          <span className="ml-2">Nyanja Cyane</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
