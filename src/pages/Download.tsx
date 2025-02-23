import { useState } from "react";
import { motion } from 'framer-motion';
import {
  Download,
  Monitor,
  Smartphone,
  Apple,
  AlertCircle,
  CheckCircle2,
  Clock,
  ChevronDown,
} from 'lucide-react';



type ExecutorStatus = 'working' | 'patched' | 'discontinued';

interface Executor_Version {
  name: string;
  status: 'available' | 'wip' | string;
  url?: string;
}

interface Executor {
  id: string;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  status: ExecutorStatus;
  statusIcon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  statusColor: string;
  description: string;
  features: string[];
  versions?: Executor_Version[];
}
// could have add a json file link but whatever
const executors: Executor[] = [
  {
    id: 'windows',
    name: 'Windows Executor',
    icon: Monitor,
    status: 'patched',
    statusIcon: AlertCircle,
    statusColor: 'red',
    description: 'Executor for Windows.',
    features: ['Test 1', 'Test 2', 'Test 3'],
  },
  {
    id: 'android',
    name: 'Android Executor',
    icon: Smartphone,
    status: 'working',
    statusIcon: CheckCircle2,
    statusColor: 'green',
    description: 'Mobile executor for Android devices',
    features: ['Test 1', 'Test 2', 'Test 3'],
    versions: [
      { name: '64-bit', status: 'available', url: '#' },
      { name: '32-bit', status: 'wip' },
    ],
  },
  {
    id: 'ios',
    name: 'iOS Executor',
    icon: Apple,
    status: 'discontinued',
    statusIcon: Clock,
    statusColor: 'gray',
    description: 'Currently discontinued for iOS devices',
    features: ['Test 1', 'Test 2', 'Test 3'],
  },
];

const Status_Style = (status: ExecutorStatus): string => {
  const styles: { [key in ExecutorStatus]: string } = {
    working: 'bg-green-500/10 text-green-400 border-green-500/30',
    patched: 'bg-red-500/10 text-red-400 border-red-500/30',
    discontinued: 'bg-gray-500/10 text-gray-400 border-gray-500/30',
  };
  return styles[status] || styles.discontinued;
};

interface VersionSelectorProps {
  versions: Executor_Version[];
  onSelect: (version: Executor_Version) => void;
  SelectedVersion: Executor_Version | null;
}

const VersionSelector: React.FC<VersionSelectorProps> = ({ versions, onSelect, SelectedVersion }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg flex items-center justify-between transition-all"
      >
        <span className="text-blue-200">{SelectedVersion?.name || 'Select Version'}</span>
        <ChevronDown
          className={`w-4 h-4 text-blue-400 transition-transform duration-300 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 glass-effect rounded-lg overflow-hidden z-10">
          {versions.map((version: Executor_Version) => (
            <button
              key={version.name}
              onClick={() => {
                onSelect(version);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-left text-blue-200 hover:bg-blue-500/10 transition-colors"
            >
              {version.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

interface ExecutorCardProps {
  executor: Executor;
}

const ExecutorCard: React.FC<ExecutorCardProps> = ({ executor }) => {
  const [SelectedVersion, setSelectedVersion] = useState<Executor_Version | null>(
    executor.versions?.find((v: Executor_Version) => v.status === 'available') || null
  );
  const StatusIcon = executor.statusIcon;
  const StatusStyle = Status_Style(executor.status);
  const ExecutorIcon = executor.icon;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -5 }}
      className="glass-effect rounded-2xl border border-blue-500/10 overflow-hidden group"
    >
      <div className="p-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-lg group-hover:blur-xl transition-all"></div>
            <ExecutorIcon className="w-12 h-12 text-blue-400 relative z-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2 gradient-text">{executor.name}</h3>
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border ${StatusStyle}`}
            >
              <StatusIcon className="w-4 h-4" />
              <span className="capitalize">{executor.status}</span>
            </span>
          </div>
        </div>

        <div className="mt-6">
          <p className="text-blue-200/90 mb-4">{executor.description}</p>
          <div className="space-y-2">
            {executor.features.map((feature: string, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400/60" />
                <span className="text-blue-200/80 text-sm">{feature}</span>
              </div>
            ))}
          </div>

          {executor.status === 'working' && executor.versions && (
            <div className="mt-6 space-y-4">
              <VersionSelector
                versions={executor.versions}
                SelectedVersion={SelectedVersion}
                onSelect={setSelectedVersion}
              />

              {SelectedVersion && (
                <motion.a
                  href={SelectedVersion.status === 'available' ? SelectedVersion.url : '#'}
                  className={`w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg transition-all group ${
                    SelectedVersion.status === 'available'
                      ? 'bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30'
                      : 'bg-gray-500/10 border border-gray-500/30 cursor-not-allowed'
                  }`}
                  onClick={(e) => {
                    if (SelectedVersion.status !== 'available') {
                      e.preventDefault();
                    }
                  }}
                >
                  <Download
                    className={`w-4 h-4 ${
                      SelectedVersion.status === 'available' ? 'text-blue-400' : 'text-gray-400'
                    } group-hover:scale-110 transition-transform`}
                  />
                  <span
                    className={`${
                      SelectedVersion.status === 'available'
                        ? 'text-blue-200 group-hover:text-white'
                        : 'text-gray-400'
                    } transition-colors`}
                  >
                    {SelectedVersion.status === 'available' ? 'Download' : 'Not Available'}
                  </span>
                </motion.a>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const DownloadPage: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-32 pb-20 px-4"
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
            <Download className="w-16 h-16 text-blue-400 relative z-10" />
          </div>
        </motion.div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
          Download Frostware
        </h1>
        <p className="text-lg text-blue-200/90 max-w-2xl mx-auto">
          Choose your platform and get started with Frostware today.
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {executors.map((executor) => (
            <ExecutorCard key={executor.id} executor={executor} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default DownloadPage;
