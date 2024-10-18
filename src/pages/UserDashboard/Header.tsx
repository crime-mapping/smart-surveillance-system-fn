import React from 'react';
import profilePicture from '../../assets/new-profile.jpg'
import NotificationsIcon from '@mui/icons-material/Notifications';
const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-md">
      <h1 className="text-xl font-semibold">General Analytics (On Monthly Basis)</h1>
      <div className="flex items-center space-x-2">
        <button className="relative w-[20px] bg-inherit m-0 p-0 ">
          <NotificationsIcon className="text-yellow-500 text-4xl" />
          <span className="absolute top-0 left-4 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
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
