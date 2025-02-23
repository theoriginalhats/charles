import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Developers from './pages/Developers';
import Download from './pages/Download';
import Scripts from './pages/Scripts';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-custom text-white relative overflow-hidden">
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-48 -left-48 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.15] animate-blob"></div>
          <div className="absolute -top-48 -right-48 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.15] animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-48 left-48 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-[0.15] animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10">
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/developers" element={<Developers />} />
              <Route path="/download" element={<Download />} />
              <Route path="/scripts" element={<Scripts />} />
            </Routes>
          </AnimatePresence>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App
