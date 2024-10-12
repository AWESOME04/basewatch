import Header from '../components/shared/Header';
import HeroSection from '../components/homepage/HeroSection';
import AboutUs from '../components/homepage/AboutUs';
import MapSection from '../components/homepage/MapSection';
import LearnMore from '../components/homepage/LearnMore';
import Footer from '../components/homepage/Footer';

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