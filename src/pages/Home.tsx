import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, 
  Key, 
  Shield, 
  Zap, 
  Lock, 
  Cloud, 
  Cpu,
  Globe,
  ChevronDown
 } from 'lucide-react';
import { Link } from 'react-router-dom';

//
// TYPES
//

interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}

interface Snowflake {
  id: number;
  left: string;
  size: number;
  opacity: number;
  duration: number;
}

interface FAQ_I {
  question: string;
  answer: string;
}

//
// DATA
//

const features: Feature[] = [
  { icon: Shield, title: 'Maximum security', description: 'we all know safety is our first priority. Frostware provides maximum security to make sure our user are safe and secure with their script.' },
  { icon: Zap, title: '100% UNC', description: 'We provide 100% UNC so our user can enjoy their favorite script without any hassle' },
  { icon: Lock, title: 'fast key system', description: 'Our key system can be done very fast as we provide 1 step for 12 and 2 steps for 24 hours key!' },
  { icon: Cloud, title: 'user-friendly UI', description: 'Our ui design is extremely smooth with amazing animations allowing our user to navigate easily' },
  { icon: Cpu, title: 'Lag-Free gameplay', description: 'as I mentioned, the ui is slick with smooth animations. Due to these feature you will face almost no lag at all!' },
  { icon: Globe, title: 'best customer care', description: 'facing an error? Join the discord server and open a ticket, our staff member will help as soon as possible!' },
];

const faqs: { question: string; answer: string }[] = [
  { question: 'What is Frostware?', answer: 'Frostware is the best executor at your service. With its slick and smooth Ui design and animation it provides an amazing gameplay.' },
  { question: 'How do I get started?', answer: 'Simply go up and click on the Download Button in the homepage and click on any of the downloads for your device.' },
  { question: 'Is this safe to use?', answer: 'Yes, it is 100% safe to use.' },
  { question: 'Do I need a key?', answer: 'Yes, Frostware provides a short duration key system for both 12 hours and 24 hours..' },
];

//
// COMPONENTS
//

const Snowflakes: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const createSnowflake = () => {
      const snowflake: Snowflake = {
        id: Math.random(),
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 2,
        opacity: Math.random() * 0.6 + 0.4,
        duration: Math.random() * 10 + 10,
      };
      setSnowflakes((prev: Snowflake[]) => [...prev, snowflake]);
      setTimeout(() => {
        setSnowflakes((prev: Snowflake[]) => prev.filter((s) => s.id !== snowflake.id));
      }, snowflake.duration * 1000);
    };

    const interval = setInterval(createSnowflake, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {snowflakes.map((snowflake) => (
        <div
          key={snowflake.id}
          className="snowflake"
          style={{
            left: snowflake.left,
            width: `${snowflake.size}px`,
            height: `${snowflake.size}px`,
            opacity: snowflake.opacity,
            animationDuration: `${snowflake.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

const FAQ_I: React.FC<{ question: string; answer: string }> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="glass-effect rounded-xl overflow-hidden border border-blue-500/10"
      initial={false}
      animate={{ backgroundColor: isOpen ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0)' }}
      transition={{ duration: 0.2 }}
    >
      <button
        className="w-full px-6 py-4 flex items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-xl font-semibold text-blue-300">{question}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
        >
          <ChevronDown className="w-5 h-5 text-blue-400" />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
                opacity: { duration: 0.15, delay: 0.05 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.2, ease: [0.23, 1, 0.32, 1] },
                opacity: { duration: 0.1 }
              }
            }}
          >
            <p className="px-6 pb-4 text-blue-200 leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24"
    >
      <Snowflakes />
      
      <section className="min-h-[calc(100vh-6rem)] flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div 
            className="flex justify-center mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <img src="https://files.catbox.moe/o5nmea.png" alt="Logo" className="w-32 h-32" />
          </motion.div>
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-200"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Frostware
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl text-blue-200 mb-8 max-w-2xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Next Gen Exploit.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to="/download" className="px-8 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center gap-2 transition-all duration-300 justify-center group">
                <Download className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-blue-200 group-hover:text-white transition-colors duration-300">Download</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <a 
                href="https://linkvertise.com/1096342/fwkeys-1?o=sharing" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center gap-2 transition-all duration-300 justify-center group"
              >
                <Key className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-blue-200 group-hover:text-white transition-colors duration-300">Get Key</span>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="feature-card p-8 rounded-xl glass-effect hover:bg-blue-500/10"
            >
              <div className="feature-icon-bg">
                <feature.icon className="w-8 h-8 text-blue-400 relative z-10" />
              </div>
              <h3 className="text-xl font-semibold mt-6 mb-2">{feature.title}</h3>
              <div className="feature-divider" />
              <p className="text-blue-200">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 gradient-text">FAQ</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <FAQ_I question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
