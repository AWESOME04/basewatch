import Header from '../components/shared/Header';
import HeroSection from '../components/homepage/HeroSection';
import AboutUs from '../components/homepage/AboutUs';
import MapSection from '../components/homepage/MapSection';
import LearnMore from '../components/homepage/LearnMore';
import Footer from '../components/homepage/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header mode="default" isHomePage={true} />
      <main className="flex-grow">
        <section id="hero">
          <HeroSection />
        </section>
        <section id="about">
          <AboutUs />
        </section>
        <section id="map">
          <MapSection />
        </section>
        <section id="learn-more">
          <LearnMore />
        </section>
      </main>
      <footer id="footer">
        <Footer />
      </footer>
    </div>
  );
};

export default HomePage;