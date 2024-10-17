import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, title }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className='pt-4'>
        <Header mode="dashboard" isHomePage={false} />
      </div>
      <div className="flex">
        <Sidebar activePage={location.pathname} />
        <div className="flex-1 lg:ml-64 p-4 pt-24">
          <h1 className="text-2xl font-bold mb-6 text-light-blue px-10">{title}</h1>
          <main className="w-full lg:max-w-4xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;