import { Link } from 'react-router-dom';
import mockTopics from '../../data/topics';


const ExploreGrid = () => {
  return (
    <Link to='/feed'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockTopics.map((topic) => (
          <div key={topic.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img src={topic.imageUrl} alt={topic.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{topic.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </Link>
  );
};

export default ExploreGrid;