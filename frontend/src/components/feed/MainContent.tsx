import { Link } from 'react-router-dom';
import posts from '../../data/posts';
import { FaComment, FaRetweet, FaHeart, FaShare } from 'react-icons/fa';

const MainContent = () => {
  return (
    <div className="space-y-4">
      {posts.map((post, index) => (
        <Link to={`/post/${index}`} key={index} className="block">
          <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
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
        </Link>
      ))}
    </div>
  );
};

export default MainContent;