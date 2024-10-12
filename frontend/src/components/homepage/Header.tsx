import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuOpen && !(e.target as Element).closest('.menu-btn') && !(e.target as Element).closest('.menu')) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${
      scrolled ? 'bg-gray-900/90 backdrop-blur-md' : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to='/'>
          <img src={Logo} alt="Logo" className="w-16 h-16" />
        </Link>

        {/* Hamburger Button */}
        <button className="md:hidden menu-btn z-20" onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} className="text-white" /> : <FaBars size={24} className="text-white" />}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="font-semibold text-white hover:text-gray-300">HOME</Link></li>
          <li><Link to="/about" className="font-semibold text-white hover:text-gray-300">ABOUT US</Link></li>
          <li><Link to="/map" className="font-semibold text-white hover:text-gray-300">MAP</Link></li>
          <li><Link to="/learn-more" className="font-semibold text-white hover:text-gray-300">LEARN MORE</Link></li>
          <li><Link to="/contact" className="font-semibold text-white hover:text-gray-300">CONTACT</Link></li>
        </ul>

        <button className="hidden md:block text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
          Connect Wallet
        </button>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-0 bg-gray-900 z-10 transition-all duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } menu`}>
          <ul className="flex flex-col items-center justify-center h-full space-y-6 text-white text-lg">
            <li><Link to="/" className="hover:text-gray-300" onClick={toggleMenu}>HOME</Link></li>
            <li><Link to="/about" className="hover:text-gray-300" onClick={toggleMenu}>ABOUT US</Link></li>
            <li><Link to="/map" className="hover:text-gray-300" onClick={toggleMenu}>MAP</Link></li>
            <li><Link to="/learn-more" className="hover:text-gray-300" onClick={toggleMenu}>LEARN MORE</Link></li>
            <li><Link to="/contact" className="hover:text-gray-300" onClick={toggleMenu}>CONTACT</Link></li>
            <button className="text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors">
              Connect Wallet
            </button>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;