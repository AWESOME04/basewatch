import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.svg';
import Logo2 from '../../assets/logo-2.svg';
import { FaBars, FaTimes, FaUserCircle } from 'react-icons/fa';
import { useWallet } from '../auth/WalletProvider';

interface HeaderProps {
  mode?: 'default' | 'dashboard';
  isHomePage?: boolean;
}

const Header: React.FC<HeaderProps> = ({ mode = 'default', isHomePage = false }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isConnected, account, connectWallet, disconnectWallet } = useWallet();

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

  const scrollToSection = (sectionId: string) => {
    if (isHomePage) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        setMenuOpen(false);
      }
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  const navItems = [
    { label: 'HOME', sectionId: 'hero' },
    { label: 'ABOUT US', sectionId: 'about' },
    { label: 'MAP', sectionId: 'map' },
    { label: 'LEARN MORE', sectionId: 'learn-more' },
    { label: 'CONTACT', sectionId: 'footer' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-10 transition-all duration-300 ${headerClass}`}>
      <nav className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to='/'>
          <img src={mode === 'dashboard' ? Logo2 : Logo} alt="Logo" className="w-16 h-16" />
        </Link>

        <button className={`md:hidden menu-btn z-20 ${textColor}`} onClick={toggleMenu}>
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>

        <ul className={`hidden md:flex space-x-6 ${textColor}`}>
          {navItems.map((item) => (
            <li key={item.sectionId}>
              <a
                href={isHomePage ? `#${item.sectionId}` : `/#${item.sectionId}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.sectionId);
                }}
                className={`font-semibold hover:text-gray-300 ${textColor}`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {isConnected && account ? (
          <div className={`hidden md:flex items-center space-x-2 ${textColor}`}>
            <FaUserCircle size={24} />
            <span className="text-sm">{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
            <button
              onClick={disconnectWallet}
              className={`border px-2 py-1 rounded-full text-sm transition-colors ${
                mode === 'dashboard' ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'
              }`}
            >
              Disconnect
            </button>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            className={`hidden md:block border px-4 py-2 rounded-full transition-colors ${
              mode === 'dashboard' ? 'border-black text-black hover:bg-black hover:text-white' : 'border-white text-white hover:bg-white hover:text-black'
            }`}
          >
            Connect MetaMask
          </button>
        )}

        <div className={`md:hidden fixed inset-0 bg-gray-900 z-10 transition-all duration-300 ${
          menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } menu`}>
          <ul className="flex flex-col items-center justify-center h-full space-y-6 text-white text-lg">
            {navItems.map((item) => (
              <li key={item.sectionId}>
                <a
                  href={isHomePage ? `#${item.sectionId}` : `/#${item.sectionId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.sectionId);
                  }}
                  className="hover:text-gray-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
            {isConnected && account ? (
              <div className="flex flex-col items-center space-y-2">
                <FaUserCircle size={24} />
                <span className="text-sm">{`${account.slice(0, 6)}...${account.slice(-4)}`}</span>
                <button
                  onClick={disconnectWallet}
                  className="text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors"
                >
                  Disconnect
                </button>
              </div>
            ) : (
              <button
                onClick={connectWallet}
                className="text-white border border-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors"
              >
                Connect MetaMask
              </button>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;