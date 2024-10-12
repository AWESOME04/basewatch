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
    <aside className="w-64 h-screen bg-white border-r border-gray-200 fixed left-0 top-24 overflow-y-auto">
      <nav className="p-4">
        <ul className="space-y-4">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center space-x-3 p-2 rounded-lg transition-colors ${
                  activePage === item.path
                    ? 'text-blue-500 bg-blue-50'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <item.icon className={`text-2xl ${activePage === item.path ? 'text-blue-500' : ''}`} />
                <span className={`text-lg font-semibold ${activePage === item.path ? 'text-blue-500' : ''}`}>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="absolute bottom-8 left-0 right-0 px-4">
        <button className="w-full bg-red-500 text-white py-3 rounded-full font-semibold hover:bg-red-600 transition-colors">
          Report Activity
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;