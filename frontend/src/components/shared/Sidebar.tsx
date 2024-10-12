import { Link } from 'react-router-dom';
import { FaHome, FaHashtag, FaMap, FaUser, FaEllipsisH } from 'react-icons/fa';

interface SidebarProps {
  activePage: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activePage }) => {
  const menuItems = [
    { path: '/feed', icon: FaHome, label: 'Home' },
    { path: '/explore', icon: FaHashtag, label: 'Explore Topics' },
    { path: '/maps', icon: FaMap, label: 'Open Maps' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
    { path: '/more', icon: FaEllipsisH, label: 'More' },
  ];

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-24 flex flex-col">
      <nav className="p-4 flex-grow overflow-y-auto">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  activePage === item.path
                    ? 'text-[#1DA1F2] bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon
                  className={`text-2xl ${
                    activePage === item.path ? 'text-[#1DA1F2]' : ''
                  }`}
                />
                <span
                  className={`text-lg font-semibold ${
                    activePage === item.path ? 'text-[#1DA1F2]' : ''
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="py-8 border-t border-gray-200">
          <Link to='/report'>
            <button className="w-full bg-red-500 text-white py-3 rounded-full font-semibold hover:bg-red-600 transition-colors">
              Report Activity
            </button>
          </Link>
      </div>
      </nav>
    </aside>
  );
};

export default Sidebar;