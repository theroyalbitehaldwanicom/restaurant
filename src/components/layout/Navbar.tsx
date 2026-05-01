import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu as MenuIcon, X, LogIn, LogOut, User } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import BrandLogo from './BrandLogo';
import { useAuth } from '../../contexts/AuthContext';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Menu', path: '/menu' },
  { name: 'Events & Kitty Parties', path: '/events' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Reviews', path: '/reviews' },
  { name: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, login, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-royal-900/95 backdrop-blur-md shadow-lg shadow-black/50 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center group hover:scale-105 transition-transform duration-300">
            <BrandLogo />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors hover:text-gold ${
                    isActive ? 'text-gold' : 'text-gray-300'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/contact"
              className="bg-gold text-royal-900 px-6 py-2 rounded-full font-semibold hover:bg-gold-light transition-colors shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_20px_rgba(212,175,55,0.5)]"
            >
              Book Table
            </Link>
            
            {user ? (
              <button
                onClick={logout}
                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-gold transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <button
                onClick={login}
                className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-gold transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Login
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
             {user ? (
              <button
                onClick={logout}
                className="text-gray-300 hover:text-gold"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={login}
                className="text-gray-300 hover:text-gold"
                 title="Login"
              >
                <LogIn className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-royal-800 border-t border-royal-700"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-3 text-base font-medium rounded-md transition-colors ${
                      isActive ? 'text-gold bg-royal-700/50' : 'text-gray-300 hover:text-gold hover:bg-royal-700/30'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-4 mt-2 border-t border-royal-700/50 flex flex-col gap-3">
                 <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-center bg-gold text-royal-900 px-6 py-3 rounded-md font-semibold"
                >
                  Book Table
                </Link>
                {user ? (
                   <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-center bg-royal-900 border border-royal-700 text-gray-300 px-6 py-3 rounded-md font-semibold"
                  >
                    Logout
                  </button>
                ) : (
                   <button
                    onClick={() => {
                      login();
                      setIsOpen(false);
                    }}
                    className="block w-full text-center bg-royal-900 border border-royal-700 text-gray-300 px-6 py-3 rounded-md font-semibold"
                  >
                    Login
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
