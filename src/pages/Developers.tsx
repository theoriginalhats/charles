import { useState, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Code, Github, X } from 'lucide-react';
import { FaDiscord } from 'react-icons/fa';

const owners = [
  {
    name: 'Jakey',
    role: 'Owner & Founder',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1240729572077604935/image',
    discord: 'jake_brock',
    description: 'The owner and founder of Frostware',
    socials: {
      discord: 'jake_brock'
    }
  },
  {
    name: 'Kakey',
    role: 'Co-Owner',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1261072045123571773/image',
    discord: 'ovalcatt',
    description: 'Co-Owner.',
    socials: {
      discord: 'ovalcatt'
    }
  },
  {
    name: 'Mini',
    role: 'Co-Owner',
    image: 'https://avatar-cyan.vercel.app/api/pfp/912961349695455282/image',
    discord: 'minidreamgamer132',
    description: 'Co-Owner.',
    socials: {
      discord: 'minidreamgamer132'
    }
  }
];

const co_owners = [
  {
    name: 'Vani',
    role: 'Lead COO',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1271532481467781241/image',
    discord: 'vani.pierce',
    description: 'Lead COO of Frostware.',
    socials: {
      discord: 'vani.pierce'
    }
  },
  {
    name: 'Scarlet',
    role: 'Secondary COO',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1023164246642659438/image',
    discord: 'urf4vmutualx',
    description: 'Secondary COO of FrostWare.',
    socials: {
      discord: 'urf4vmutualx'
    }
  },
  {
    name: 'Ari',
    role: 'Third COO',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1313711946956148786/image',
    discord: '6ariii',
    description: 'Third COO of FrostWare.',
    socials: {
      discord: '6ariii'
    }
  },
  {
    name: 'Zen',
    role: 'Fourth COO',
    image: 'https://avatar-cyan.vercel.app/api/pfp/774872516422271016/image',
    discord: 'zen_ae',
    description: 'Fourth COO of FrostWare.',
    socials: {
      discord: 'zen_ae'
    }
  }
];

const developers = [
  {
    name: 'Nop',
    role: 'Android Shared Library/API Maker',
    image: 'https://avatar-cyan.vercel.app/api/pfp/926894280797224980/image',
    discord: 'nop',
    socials: {
      discord: 'noppedout',
    }
  },
  {
    name: 'Selunar',
    role: 'Script Developer',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1083989352297807992/image',
    discord: 'selunariorium',
    socials: {
      discord: 'selunariorium'
    }
  },
  {
    name: 'Maxlasertech',
    role: 'Script Developer',
    image: 'https://avatar-cyan.vercel.app/api/pfp/691944570312851556/image',
    discord: 'maxlasertech',
    socials: {
      discord: 'maxlasertech'
    }
  },
  {
    name: 'Tuff',
    role: 'Script Developer',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1220375983463333921/image',
    discord: 'very.tuff.no.cap.lol',
    socials: {
      discord: 'very.tuff.no.cap.lol'
    }
  },
  {
    name: 'Ackton',
    role: 'Script Developer',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1198902713971388437/image',
    discord: 'ackton_.',
    socials: {
      discord: 'ackton_.'
    }
  },
  {
    name: 'Fsploit',
    role: 'Script Developer',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1235572551430967470/image',
    discord: 'dwimback69',
    socials: {
      discord: 'dwimback69'
    }
  },
  {
    name: 'Zleak',
    role: 'Script Developer',
    image: 'https://avatar-cyan.vercel.app/api/pfp/849652633261834241/image',
    discord: 'z13ak',
    socials: {
      discord: 'z13ak'
    }
  },
  {
    name: 'Clock',
    role: 'UI & Script Developer',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1268497369272553534/image',
    discord: 'codertoolroblox',
    socials: {
      discord: 'codertoolroblox'
    }
  },
  {
    name: 'Khang',
    role: 'UI Developer',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1049145878801293473/image',
    discord: 'itskh4ng',
    socials: {
      discord: 'itskh4ng'
    }
  },
  {
    name: 'Jext',
    role: 'UI Developer',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1185629456996499588/image',
    discord: 'jext1',
    socials: {
      discord: 'jext1'
    }
  },
  {
    name: 'Kayzi',
    role: 'Windows UI & Shared Library Maker',
    image: 'https://avatar-cyan.vercel.app/api/pfp/968099366948704350/image',
    discord: 'kayzi_jzx',
    socials: {
      discord: 'kayzi_jzx'
    }
  },
  {
    name: 'Waffle',
    role: 'Windows Shared Library/API Maker',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1334522190829322314/image',
    discord: 'renderview',
    socials: {
      discord: 'renderview'
    }
  },
  {
    name: 'Boltz',
    role: 'Game Cheat Developer',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1326816897559302165/image',
    discord: 'italktogod',
    socials: {
      discord: 'italktogod'
    }
  },
  {
    name: 'Rupo',
    role: 'Game Cheat Developer',
    image: 'https://avatar-cyan.vercel.app/api/pfp/1301658176671715330/image',
    discord: '43cs',
    socials: {
      discord: '43cs'
    }
  },
  {
    name: 'YellowGreg',
    role: 'Web Developer',
    image: 'https://avatar-cyan.vercel.app/api/pfp/773952016036790272/image',
    github: 'https://github.com/YellowGregs',
    discord: 'yellowgreg',
    socials: {
      github: 'https://github.com/YellowGregs',
      discord: 'yellowgreg'
    }
  },
  {
    name: 'Wspboy12',
    role: 'Web Developer',
    image: 'https://avatar-cyan.vercel.app/api/pfp/804955810820128798/image',
    github: 'https://github.com/wspboy12',
    discord: 'wspboy12',
    socials: {
      github: 'https://github.com/wspboy12',
      discord: 'wspboy12'
    }
  }
];

const Categories = {
  owners: {
    title: "Owner",
    members: owners
  },
  co_owners: {
    title: "Co-Owner",
    members: co_owners
  },
  developers: {
    title: "Development Team",
    members: developers
  }
};

interface Developer {
  name: string;
  role: string;
  image: string;
  discord: string;
  description?: string;
  socials: {
    discord: string;
    github?: string;
  };
}

const Developer_Modal = ({ dev, onClose }: { dev: Developer; onClose: () => void }) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
        onClick={onClose}
      >
        <motion.div
          className="modal-overlay absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="glass-effect-strong rounded-2xl p-6 max-w-md w-full relative z-10"
          onClick={e => e.stopPropagation()}
        >
          <button
            type="button"
            title="Close"
            onClick={onClose}
            className="absolute top-4 right-4 text-blue-400 hover:text-blue-300 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg"></div>
              <img
                src={dev.image}
                alt={dev.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-blue-500/50 relative z-10"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold gradient-text">{dev.name}</h3>
              <p className="text-blue-400">{dev.role}</p>
            </div>
          </div>

          <div className="space-y-4">
            {Object.entries(dev.socials).map(([platform, value]) => (
              <a
                key={platform}
                href={platform === 'discord' ? '#' : value}
                className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 transition-all group"
                onClick={(e) => {
                  if (platform === 'discord') {
                    e.preventDefault();
                    navigator.clipboard.writeText(value);
                  }
                }}
              >
                {platform === 'github' && <Github className="w-5 h-5 text-blue-400" />}
                {platform === 'discord' && <FaDiscord className="w-5 h-5 text-blue-400" />}
                <span className="text-blue-200 group-hover:text-white transition-colors capitalize">
                  {platform === 'discord' ? 'Copy Discord Username' : platform}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const Developer_Card = ({ dev }: { dev: Developer }) => {
  const [Show_Modal, setShow_Modal] = useState(false);

  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="dev-card group cursor-pointer"
        onClick={() => setShow_Modal(true)}
      >
        <div className="glass-effect rounded-xl p-6 hover:bg-blue-500/10 transition-all">
          <div className="flex items-center gap-4 mb-4">
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-sm group-hover:blur-md transition-all"></div>
              <img
                src={dev.image}
                alt={dev.name}
                className="w-16 h-16 rounded-full object-cover border-2 border-blue-500/50 relative z-10"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold gradient-text">{dev.name}</h3>
              <p className="text-blue-400 text-sm">{dev.role}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {Show_Modal && (
        <Developer_Modal dev={dev} onClose={() => setShow_Modal(false)} />
      )}
    </>
  );
};

const Developers = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="pt-32 pb-20 px-4 max-w-7xl mx-auto"
    >
      <div className="text-center mb-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-6"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-lg"></div>
            <Code className="w-16 h-16 text-blue-400 relative z-10" />
          </div>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Team</h1>
        <p className="text-xl text-blue-200 max-w-2xl mx-auto">
          Meet the team behind Frostware.
        </p>
      </div>

      {Object.entries(Categories).map(([key, category]) => (
        category.members.length > 0 && (
          <div key={key} className="mb-16">
            <h2 className="text-3xl font-bold mb-8 gradient-text text-center">{category.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.members.map((dev, index) => (
                <Developer_Card key={index} dev={dev} />
              ))}
            </div>
          </div>
        )
      ))}
    </motion.div>
  );
};

export default Developers;
