import React from 'react';
import Sidebar from './SideBar';
import { FiHome, FiCamera, FiFileText, FiHelpCircle, FiUser, FiLogOut } from 'react-icons/fi';

const UserSidebar: React.FC = () => {
  const userItems = [
    { icon: <FiHome className="w-5 h-5" />, label: 'Dashboard' },
    { icon: <FiCamera className="w-5 h-5" />, label: 'Cameras' },
    { icon: <FiFileText className="w-5 h-5" />, label: 'Reports' },
    { icon: <FiHelpCircle className="w-5 h-5" />, label: 'Help & Support' },
    { icon: <FiUser className="w-5 h-5" />, label: 'Profile' },
    { icon: <FiLogOut className="w-5 h-5" />, label: 'Logout' },
  ];

  return <Sidebar items={userItems} />;
};

export default UserSidebar;