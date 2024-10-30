import React from 'react';
import Sidebar from './SideBar';
import { FiHome, FiCamera, FiFileText, FiHelpCircle,FiMap, FiUser, FiLogOut } from 'react-icons/fi';

const UserSidebar: React.FC = () => {
  const userItems = [
    { icon: <FiHome className="w-5 h-5" />, label: 'Dashboard',path: '/user-dashboard' },
    { icon: <FiCamera className="w-5 h-5" />, label: 'Cameras',path: '/cameras' },
    { icon: <FiFileText className="w-5 h-5" />, label: 'Reports', path: '/user-dashboard' },
     { icon: <FiMap className="w-5 h-5" />, label: 'Crime Map',path: '/map' },
    { icon: <FiHelpCircle className="w-5 h-5" />, label: 'Help & Support',path: '/help' },
    { icon: <FiUser className="w-5 h-5" />, label: 'Profile',path: '/user-dashboard' },
    { icon: <FiLogOut className="w-5 h-5" />, label: 'Logout',path: '/' },
  ];

  return <Sidebar items={userItems} />;
};

export default UserSidebar;