import { Link } from 'react-router-dom';
import { Shield, Github } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="glass-effect mt-20">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg"></div>
                <Shield className="w-8 h-8 text-blue-400 relative z-10" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200">
                Frostware
              </span>
            </div>
            <p className="text-blue-200 max-w-md">
              Description.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-4 text-blue-300">Links</h3>
              <ul className="space-y-3">
                {['Home', 'Developers', 'Download', 'Scripts'].map((item) => (
                  <li key={item}>
                    <Link 
                      to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} 
                      className="text-blue-200 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-400/60 group-hover:bg-blue-400 transition-colors duration-300"></span>
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-blue-300">Connect</h3>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="text-blue-200 hover:text-white transition-colors duration-300 group"
                >
                  <Github className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </a>
                <a 
                  href="https://discord.gg/getfrost" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-blue-200 hover:text-white transition-colors duration-300 group"
                >
                  <FaDiscord className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-900/50 mt-8 pt-8 text-center">
          <p className="text-blue-200">&copy; {new Date().getFullYear()} Frostware. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
