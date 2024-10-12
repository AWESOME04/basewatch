import LeafImage from '../assets/leaves.svg';
import SunsetImage from '../assets/sunset.svg';

const AboutUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img src={LeafImage} alt="Leaf" className="w-full h-auto" />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold mb-4">Exploring the Profound Cultural and Ecological Significance of Trees and Water Bodies</h2>
            <p className="text-gray-600 mb-4">
              BaseWatch Ghana is a pioneering citizen science project dedicated to empowering citizens to report, track, and monitor illegal activities that threaten Ghana's environment.
            </p>
            <button className="text-blue-500 hover:underline">Read More</button>
          </div>
        </div>
      </div>
      
      <div className="mt-16 relative">
        <img src={SunsetImage} alt="Sunset" className="w-full h-auto" />
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        </div>
      </div>
    </section>
  );
};

export default AboutUs;