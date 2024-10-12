import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/homepage/Header';
import Sidebar from '../components/feed/Sidebar';
import TrendingSection from '../components/feed/TrendingSection';
import ExploreGrid from '../components/explore/ExploreGrid';

const Explore: React.FC = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className='pt-4'>
        <Header mode="dashboard" />
      </div>
      <div className="max-w-7xl mx-auto px-4 pt-20 lg:pt-24">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <Sidebar activePage={location.pathname} />
          </div>
          <main className="w-full lg:flex-grow mb-8">
            <h1 className="text-2xl font-bold mb-4">Explore Topics</h1>
            <ExploreGrid />
          </main>
          <div className="w-full lg:w-80 mt-8 lg:mt-0">
            <div className="lg:sticky lg:top-24">
              <TrendingSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Explore;