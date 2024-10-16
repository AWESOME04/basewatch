import { Link } from 'react-router-dom';
import { ArrowUp } from 'lucide-react';
import FooterImage from '../../assets/footer-image.svg';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer
      className="relative bg-cover bg-center text-white py-16"
      style={{ backgroundImage: `url(${FooterImage})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative container mx-auto px-8 lg:px-24">
        <div className="grid md:grid-cols-4 gap-64 text-center md:text-left">
          <div className="col-span-2">
            <h4 className="text-2xl font-semibold mb-4">Subscribe to BaseWatch</h4>
            <p className="mb-4">
              Subscribe to our monthly newsletter and stay up to date.
            </p>
            <form>
              <input
                type="email"
                placeholder="Your email address"
                className="w-full p-3 rounded-lg mb-4 text-black"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full"
              >
                GET UPDATED
              </button>
            </form>
          </div>

          <div className="col-span-2">
            <h4 className="text-2xl font-semibold mb-4">Informations</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-gray-300">Traffic Report</Link></li>
              <li><Link to="/" className="hover:text-gray-300">Transparency Report</Link></li>
              <li><Link to="/" className="hover:text-gray-300">F.A.Q.</Link></li>
              <li><Link to="/" className="hover:text-gray-300">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-gray-300">About the Map</Link></li>
              <li><Link to="/" className="hover:text-gray-300">Blogging Guidelines</Link></li>
              <li><Link to="/" className="hover:text-gray-300">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-600 text-center">
          <p>&copy; 2024 | BaseWatch Ghana | All rights reserved.</p>
        </div>
      </div>

      <button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-lg transition-all duration-300 ease-in-out"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>
    </footer>
  );
};

export default Footer;