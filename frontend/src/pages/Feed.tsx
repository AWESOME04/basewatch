import React from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import { FaHome, FaHashtag, FaMap, FaUser, FaEllipsisH } from 'react-icons/fa';
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
          <div className="hidden lg:block lg:w-64 flex-shrink-0">
            <Sidebar activePage={location.pathname} />
          </div>
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
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
        <ul className="flex justify-around">
          <li><Link to="/feed" className={location.pathname === '/feed' ? "text-blue-500" : "text-gray-500"}><FaHome size={24} /></Link></li>
          <li><Link to="/explore" className={location.pathname === '/explore' ? "text-blue-500" : "text-gray-500"}><FaHashtag size={24} /></Link></li>
          <li><Link to="/maps" className={location.pathname === '/maps' ? "text-blue-500" : "text-gray-500"}><FaMap size={24} /></Link></li>
          <li><Link to="/profile" className={location.pathname === '/profile' ? "text-blue-500" : "text-gray-500"}><FaUser size={24} /></Link></li>
          <li><Link to="/more" className={location.pathname === '/more' ? "text-blue-500" : "text-gray-500"}><FaEllipsisH size={24} /></Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Feed;