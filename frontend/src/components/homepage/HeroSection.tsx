import { useNavigate } from 'react-router-dom';
import HeroImage from '../../assets/hero-image.svg';
import { useWallet } from '../auth/WalletProvider';

const HeroSection = () => {
  const navigate = useNavigate();
  const { isConnected, connectWallet } = useWallet();

  const scrollToLearnMore = () => {
    const learnMoreSection = document.getElementById('learn-more');
    if (learnMoreSection) {
      learnMoreSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    if (isConnected) {
      navigate('/feed');
    } else {
      connectWallet();
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-900 text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${HeroImage})` }}
      ></div>
      
      <div className="absolute inset-0 bg-black opacity-50"></div>
      
      <div className="relative z-10 text-center">
        <h1 className="text-5xl font-bold mb-4">
          BaseWatch Ghana: Empowering Citizens,<br />Protecting Our Environment
        </h1>
        <p className="text-xl mb-8">
          Join the movement to combat illegal activities in Ghana using our FREEDOM OF SPEECH!
        </p>
        
        <div className="flex justify-center space-x-4">
          <button onClick={scrollToLearnMore} className="bg-blue-500 text-white px-6 py-3 rounded-full hover:bg-blue-600">
            Learn More
          </button>
          <button onClick={handleGetStarted} className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-gray-900">
            {isConnected ? 'Go to Feed' : 'Get Started'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
