import React, { useState } from 'react';
import Logo from './Logo';
import { Link} from 'react-router-dom';

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  path: string;
  onClick: () => void; 
  isActive: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ icon, label,path,onClick, isActive}) => (
  <li className="mb-4">
     <Link
      to={path}
      className={`flex items-center text-gray-300 hover:text-white ${isActive ? 'bg-blue-500' : ''} p-2 rounded`} // Add active background
      onClick={onClick}
    >
      {icon}
      <span className="ml-2">{label}</span>
    </Link>
  </li>
);

interface SidebarProps {
  items: { icon: React.ReactNode; label: string; path: string; }[]; 
}

const Sidebar: React.FC<SidebarProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemClick = (index: number) => {
    setActiveIndex(index);
  };
 return(
  <div className="w-[15%] flex fixed top-0 flex-col gap-[50px] py-[50px] h-screen bg-primaryBackground text-white px-4 py-6">
    <Logo />
    <nav>
      <ul className='flex flex-col'>
        {items.map((item, index) => (
          <SidebarItem
            key={index}
            {...item}
            path={item.path}
            onClick={() => handleItemClick(index)} 
            isActive={index === activeIndex}
          />
        ))}
      </ul>
    </nav>
    </div>
 )
};

export default Sidebar;