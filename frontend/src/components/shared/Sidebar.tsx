import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaHashtag, FaMap, FaUser, FaEllipsisH } from 'react-icons/fa';

interface SidebarProps {
  activePage: string;
}

interface MenuItem {
  path: string;
  icon: React.ElementType;
  label: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const menuItems: MenuItem[] = [
    { path: '/feed', icon: FaHome, label: 'Home' },
    { path: '/explore', icon: FaHashtag, label: 'Explore Topics' },
    { path: '/maps', icon: FaMap, label: 'Open Maps' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
  ];

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  const MenuItem: React.FC<{ item: MenuItem }> = ({ item }) => (
    <li>
      <Link
        to={item.path}
        className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
          activePage === item.path
            ? 'text-light-blue'
            : 'text-gray-700 hover:bg-gray-100'
        }`}
      >
        <item.icon
          className={`text-2xl ${
            activePage === item.path ? 'text-light-blue' : ''
          }`}
        />
        <span
          className={`text-lg font-semibold ${
            activePage === item.path ? 'text-light-blue' : ''
          }`}
        >
          {item.label}
        </span>
      </Link>
    </li>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-24 flex flex-col">
        <nav className="p-4 flex-grow overflow-y-auto">
          <ul className="space-y-4">
            {menuItems.map((item) => (
              <MenuItem key={item.path} item={item} />
            ))}
          </ul>
          <div className="py-8 border-t border-gray-200 mt-4">
            <Link to='/report'>
              <button className="w-full bg-red-500 text-white py-3 rounded-full font-semibold hover:bg-red-600 transition-colors">
                Report Activity
              </button>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
        <ul className="flex justify-around">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={location.pathname === item.path ? "text-light-blue" : "text-gray-500"}
              >
                <item.icon size={24} />
              </Link>
            </li>
          ))}
          <li className="relative">
            <button onClick={toggleDropdown} className="text-gray-500">
              <FaEllipsisH size={24} />
            </button>
            {isDropdownOpen && (
              <div className="absolute bottom-full right-0 mb-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200">
                <Link 
                  to='/report' 
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={toggleDropdown}
                >
                  Report Activity
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;