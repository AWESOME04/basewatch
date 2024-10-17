import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../components/shared/DashboardLayout';
import MainContent from '../components/feed/MainContent';
import SinglePostPage from './SinglePostPage';
import TrendingSection from '../components/feed/TrendingSection';

const Feed: React.FC = () => {
  return (
    <DashboardLayout title="Home">
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        <div className="lg:flex-grow">
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/post/:postId" element={<SinglePostPage />} />
          </Routes>
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

export default Feed;