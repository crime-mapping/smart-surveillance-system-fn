import React from 'react';
import Logo from './Logo';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label }) => (
  <li className="mb-4">
    <a href="#" className="flex items-center text-gray-300 hover:text-white">
      {icon}
      <span className="ml-2">{label}</span>
    </a>
  </li>
);

interface SidebarProps {
  items: SidebarItemProps[];
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => (
  <div className="w-[15%] flex fixed flex-col gap-[50px] px-[30px] py-[50px] h-screen bg-primaryBackground text-white p-6">
    <Logo/>
    <nav>
      <ul className='flex flex-col gap-2'>
        {items.map((item, index) => (
          <SidebarItem key={index} {...item} />
        ))}
      </ul>
    </nav>
  </div>
);

export default Sidebar;