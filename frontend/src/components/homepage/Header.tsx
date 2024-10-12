import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.svg';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/90 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to='/'>
          <img src={Logo} alt="Logo" className="w-16 h-16" />
        </Link>
        <ul className="flex space-x-6">
          <li><Link to="/" className="font-semibold text-white hover:text-gray-300">HOME</Link></li>
          <li><Link to="/about" className="font-semibold text-white hover:text-gray-300">ABOUT US</Link></li>
          <li><Link to="/map" className="font-semibold text-white hover:text-gray-300">MAP</Link></li>
          <li><Link to="/learn-more" className="font-semibold text-white hover:text-gray-300">LEARN MORE</Link></li>
          <li><Link to="/contact" className="font-semibold text-white hover:text-gray-300">CONTACT</Link></li>
        </ul>
        <button className="text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
          Connect Wallet
        </button>
      </nav>
    </header>
  );
};

export default Header;
