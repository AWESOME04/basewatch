import React from 'react';
import DashboardLayout from '../components/shared/DashboardLayout';
import ExploreGrid from '../components/explore/ExploreGrid';
import TrendingSection from '../components/feed/TrendingSection';

const Explore: React.FC = () => {
  return (
    <DashboardLayout title="Explore Topics">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:flex-grow">
          <ExploreGrid />
        </div>
        <div className="w-full lg:w-80 mt-8 lg:mt-0">
          <div className="lg:sticky lg:top-24">
            <TrendingSection />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Explore;