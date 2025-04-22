import React from "react";
import profilePicture from "../../assets/new-profile.jpg";
import Notifications from "../../components/Notifications";
const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-xl italic font-semibold">
        Smart Surveillance System
      </h1>
      <div className="flex items-center space-x-2">
        <Notifications />
        <div className="flex flex-col items-center">
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
