import MapImage from '../../assets/map.svg';

const MapSection = () => {
  return (
    <section className="relative h-screen">
      <img src={MapImage} alt="Map" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <div className="text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Visualize Our Impact</h2>
          <p className="mb-8">Explore the areas where we've made a difference</p>
          <button className="bg-white text-gray-900 px-6 py-3 rounded-full hover:bg-gray-200">
            View Full Map
          </button>
        </div>
      </div>
    </section>
  );
};

export default MapSection;