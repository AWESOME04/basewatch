import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/shared/Header';
import Sidebar from '../components/shared/Sidebar';
import Map from '../components/map/Map';

const ViewMap: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className='pt-4'>
        <Header mode="dashboard" isHomePage={false} />
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-20 lg:pt-24">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <Sidebar activePage={location.pathname} />
          <main className="w-full lg:flex-grow mb-8">
            <h1 className="text-2xl font-semibold text-gray-900 mb-6 text-light-blue">Open Maps</h1>
            <div className="relative h-[calc(100vh-250px)]">
              <Map />
              <div className="absolute bottom-4 right-4 bg-white p-4 rounded shadow-md z-[1000]">
                <h3 className="font-bold mb-2">KEY / LEGEND</h3>
                <ul>
                  <li className="flex items-center mb-1">
                    <span className="w-4 h-4 bg-red-500 rounded-full mr-2"></span>
                    Heavily Polluted Zones
                  </li>
                  <li className="flex items-center mb-1">
                    <span className="w-4 h-4 bg-orange-500 rounded-full mr-2"></span>
                    Midly Polluted Zones
                  </li>
                  <li className="flex items-center">
                    <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
                    Low / No Polluted Zones
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ViewMap;