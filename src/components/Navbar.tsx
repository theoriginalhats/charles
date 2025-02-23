import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';
import { FaDiscord } from 'react-icons/fa';
import { Menu, X, Home, Code, Download, FileText } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const Scrolled = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', Scrolled);
    return () => window.removeEventListener('scroll', Scrolled);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const Nav_Links = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/developers', label: 'Developers', icon: Code },
    { path: '/download', label: 'Download', icon: Download },
    { path: '/scripts', label: 'Scripts', icon: FileText },
  ];

  return (
    <nav className={`fixed w-full z-50 nav-scroll-transition px-4 ${
      isScrolled ? 'py-2 translate-y-0' : 'py-4 translate-y-2'
    }`}>
      <div className={`max-w-6xl mx-auto rounded-2xl transition-all duration-500 glass-effect-strong ${
        isScrolled ? 'py-3 px-4' : 'py-4 px-6'
      }`}>
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <img 
              src="https://files.catbox.moe/o5nmea.png" 
              alt="Logo" 
              className="w-10 h-10 object-contain transition-transform duration-500 group-hover:scale-110" 
            />
            <span className="text-xl font-bold gradient-text">
              Frostware
            </span>
          </Link>
          
          {/* Desktop */}
          <div className="hidden md:flex items-center gap-4">
            {Nav_Links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-blue-200 hover:text-white transition-colors duration-300 relative group flex items-center gap-2 px-4 py-2 rounded-lg ${
                  location.pathname === link.path ? 'nav-link-active text-white' : 'hover:bg-blue-500/10'
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 transition-all duration-500 group-hover:w-full ${
                  location.pathname === link.path ? 'w-full' : ''
                }`} />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://discord.gg/getfrost"
              target="_blank"
              rel="noopener noreferrer"
              className="discord-button px-4 py-2 rounded-lg bg-blue-500/10 border border-blue-400/30 flex items-center gap-2 hover:border-blue-400/50 transition-all duration-300"
            >
              <FaDiscord className="w-5 h-5 text-blue-400" />
              <span className="text-blue-200 hidden sm:block">Join Discord</span>
            </a>
            
            <button
              className="md:hidden text-blue-400 hover:text-blue-300 transition-colors duration-300 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            isMobileMenuOpen ? 'max-h-[400px] mt-4' : 'max-h-0 mt-0'
          }`}
        >
          <div className="space-y-1 py-2">
            {Nav_Links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-lg text-blue-200 hover:text-white transition-all duration-300 flex items-center gap-3 ${
                  location.pathname === link.path 
                    ? 'text-white bg-blue-500/20 border border-blue-400/20' 
                    : 'hover:bg-blue-500/10'
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
