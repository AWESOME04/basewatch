import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Header from '../components/shared/Header';
import Sidebar from '../components/shared/Sidebar';
import TrendingSection from '../components/feed/TrendingSection';
import MainContent from '../components/feed/MainContent';
import SinglePostPage from './SinglePostPage';

const Feed: React.FC = () => {
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
            <Routes>
              <Route path="/" element={
                <>
                  <h1 className="text-2xl font-bold mb-4 text-light-blue">Home</h1>
                  <MainContent />
                </>
              } />
              <Route path="/post/:postId" element={<SinglePostPage />} />
            </Routes>
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

export default Feed;