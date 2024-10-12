import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import { FaBars, FaTimes } from 'react-icons/fa';

interface HeaderProps {
  mode?: 'default' | 'dashboard';
}

const Header = ({ mode = 'default' }: HeaderProps) => {
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

  const headerClass = mode === 'dashboard' 
    ? 'bg-white shadow-md' 
    : scrolled ? 'bg-gray-900/90 backdrop-blur-md' : 'bg-transparent';

  const textColor = mode === 'dashboard' ? 'text-black' : 'text-white';

  return (
    <header className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${headerClass}`}>
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to='/'>
          <img src={Logo} alt="Logo" className="w-16 h-16" />
        </Link>

        <button className={`md:hidden menu-btn z-20 ${textColor}`} onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <ul className={`hidden md:flex space-x-6 ${textColor}`}>
          <li><Link to="/" className={`font-semibold hover:text-gray-300 ${textColor}`}>HOME</Link></li>
          <li><Link to="/about" className={`font-semibold hover:text-gray-300 ${textColor}`}>ABOUT US</Link></li>
          <li><Link to="/map" className={`font-semibold hover:text-gray-300 ${textColor}`}>MAP</Link></li>
          <li><Link to="/learn-more" className={`font-semibold hover:text-gray-300 ${textColor}`}>LEARN MORE</Link></li>
          <li><Link to="/contact" className={`font-semibold hover:text-gray-300 ${textColor}`}>CONTACT</Link></li>
        </ul>

        <button className={`hidden md:block border px-4 py-2 rounded-full transition-colors ${
          mode === 'dashboard' ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'
        }`}>
          Connect Wallet
        </button>

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