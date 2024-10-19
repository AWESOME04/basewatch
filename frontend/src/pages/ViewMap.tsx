import React from 'react';
import DashboardLayout from '../components/shared/DashboardLayout';
import Map from '../components/map/Map';

const ViewMap: React.FC = () => {
  return (
    <DashboardLayout title="Open Maps">
      <div className="relative h-[calc(100vh-200px)]">
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
              Mildly Polluted Zones
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-2"></span>
              Low / No Polluted Zones
            </li>
          </ul>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ViewMap;