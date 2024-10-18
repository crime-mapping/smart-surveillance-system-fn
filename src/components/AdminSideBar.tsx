import React from 'react';
import Sidebar from './SideBar';
import { FiHome, FiUsers, FiUserPlus, FiFileText, FiSettings, FiUser, FiLogOut } from 'react-icons/fi';

const AdminSidebar: React.FC = () => {
  const adminItems = [
    { icon: <FiHome className="w-5 h-5" />, label: 'Dashboard', path: '/user-dashboard'},
    { icon: <FiUsers className="w-5 h-5" />, label: 'System Users',  path: '/users' },
    { icon: <FiUserPlus className="w-5 h-5" />, label: 'Add New User', path: '/register' },
    { icon: <FiFileText className="w-5 h-5" />, label: 'Reports', path: '/reports' },
    { icon: <FiSettings className="w-5 h-5" />, label: 'Settings', path: '/settings' },
    { icon: <FiUser className="w-5 h-5" />, label: 'Profile',path: '/profile' },
    { icon: <FiLogOut className="w-5 h-5" />, label: 'Logout', path: '/logout' },
  ];

  return <Sidebar items={adminItems} />;
};

export default AdminSidebar;