import React from 'react';
import Sidebar from './SideBar';
import { FiHome, FiUsers, FiUserPlus, FiFileText, FiSettings, FiUser, FiLogOut } from 'react-icons/fi';

const AdminSidebar: React.FC = () => {
  const adminItems = [
    { icon: <FiHome className="w-5 h-5" />, label: 'Dashboard' },
    { icon: <FiUsers className="w-5 h-5" />, label: 'System Users' },
    { icon: <FiUserPlus className="w-5 h-5" />, label: 'Add New User' },
    { icon: <FiFileText className="w-5 h-5" />, label: 'Reports' },
    { icon: <FiSettings className="w-5 h-5" />, label: 'Settings' },
    { icon: <FiUser className="w-5 h-5" />, label: 'Profile' },
    { icon: <FiLogOut className="w-5 h-5" />, label: 'Logout' },
  ];

  return <Sidebar items={adminItems} />;
};

export default AdminSidebar;