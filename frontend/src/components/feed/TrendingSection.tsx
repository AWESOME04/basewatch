import trendingTopics from '../../data/trendingTopic';

const TrendingSection = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
      <h2 className="text-xl font-bold mb-4">What's happening</h2>
      {trendingTopics.map((topic, index) => (
        <div key={index} className="mb-4 pb-4 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors">
          <p className="text-sm text-gray-500">{topic.category} · {topic.time}</p>
          <h3 className="font-semibold">{topic.title}</h3>
          {topic.trendingWith && (
            <p className="text-sm text-gray-500">Trending with {topic.trendingWith}</p>
          )}
        </div>
      ))}
      <button className="text-blue-500 hover:text-blue-600 font-semibold">Show more</button>
    </div>
  );
};

export default TrendingSection;
