import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Post } from '../interfaces/Post';
import { FaComment, FaRetweet, FaHeart, FaShare } from 'react-icons/fa';
import posts from '../data/posts';
import Header from '../components/shared/Header';
import Sidebar from '../components/shared/Sidebar';
import TrendingSection from '../components/feed/TrendingSection';

const SinglePostPage: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();
  const post: Post | undefined = posts.find((p, index) => index === Number(postId));
  const location = useLocation();

  if (!post) {
    return <div>Post not found</div>;
  }

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
            <div className="max-w-2xl mx-auto">
              <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex items-start space-x-3">
                  <img src={post.author.avatar} alt={post.author.name} className="w-12 h-12 rounded-full" />
                  <div className="flex-grow">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-bold">{post.author.name}</h3>
                      <span className="text-gray-500">@{post.author.username}</span>
                      <span className="text-gray-500">· {post.timestamp}</span>
                    </div>
                    <p className="mt-2">{post.content}</p>
                    {post.image && (
                      <img src={post.image} alt="Post content" className="mt-3 rounded-lg w-full" />
                    )}
                    <div className="flex justify-between mt-3 text-gray-500">
                      <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                        <FaComment /> <span>{post.comments}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-green-500 transition-colors">
                        <FaRetweet /> <span>{post.retweets}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-red-500 transition-colors">
                        <FaHeart /> <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center space-x-2 hover:text-blue-500 transition-colors">
                        <FaShare />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
                <h4 className="font-bold mb-2">Comments</h4>
                <div className="border-t border-gray-200 pt-4">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={3}
                    placeholder="Write a comment..."
                  ></textarea>
                  <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
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

export default SinglePostPage;