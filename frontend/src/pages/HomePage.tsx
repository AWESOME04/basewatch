import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutUs from '../components/AboutUs';
import MapSection from '../components/MapSection';
import LearnMore from '../components/LearnMore';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <AboutUs />
        <MapSection />
        <LearnMore />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;