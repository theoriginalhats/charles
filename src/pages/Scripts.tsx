import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Eye,
  Clock,
  Shield,
  AlertTriangle,
  Copy,
  Link as LinkIcon,
  ChevronDown,
} from 'lucide-react';
import { FaKey } from 'react-icons/fa';

interface Game {
  gameId: number;
  name: string;
  imageUrl: string;
}

interface Owner {
  username: string;
  verified: boolean;
  profilePicture: string;
}

interface Script {
  _id: string;
  title: string;
  game: Game;
  owner?: Owner;
  verified: boolean;
  key: boolean;
  keyLink?: string;
  views: number;
  scriptType: 'free' | 'paid';
  isPatched: boolean;
  createdAt: string;
  likeCount?: number;
  dislikeCount?: number;
  script?: string;
  slug?: string;
}

interface SearchResponse {
  result: {
    totalPages: number;
    scripts: Script[];
  };
}

interface CacheItem {
  data: SearchResponse;
  timestamp: number;
}

const CACHE_DURATION = 5 * 60 * 1000; 
const RATE_LIMIT_DELAY = 2000;

const cache: Record<string, CacheItem> = {};

const getCachedData = (cacheKey: string): SearchResponse | null => {
  const item = cache[cacheKey];
  if (!item) return null;
  
  const now = Date.now();
  if (now - item.timestamp > CACHE_DURATION) {
    delete cache[cacheKey];
    return null;
  }
  
  return item.data;
};

const setCachedData = (cacheKey: string, data: SearchResponse) => {
  cache[cacheKey] = {
    data,
    timestamp: Date.now(),
  };
};

const ScriptCard: React.FC<{ script: Script }> = ({ script }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [copied, setCopied] = useState(false);
  const contentRef = React.useRef(null);
  
  const Formatted_Date = new Date(script.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const H_Copy = () => {
    navigator.clipboard.writeText(script.script || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const Original_Post_Url = `https://scriptblox.com/script/${script.slug || encodeURIComponent(script.title.replace(/\s+/g, '-'))}`;
  const gameUrl = `https://www.roblox.com/games/${script.game.gameId}`;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="glass-effect rounded-xl overflow-hidden group hover:bg-blue-500/10 transition-all duration-300"
    >
      <div className="p-6">
        <div className="script-card-content">
          <a 
            href={gameUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="script-card-image block relative group"
          >
            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/20 transition-colors rounded-lg flex items-center justify-center">
              <ExternalLink className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <img
              src={script.game.imageUrl.startsWith('/') ? `https://scriptblox.com${script.game.imageUrl}` : script.game.imageUrl}
              alt={script.game.name}
              className="w-full h-full object-contain rounded-lg"
              onError={(e) => { e.currentTarget.src = 'https://files.catbox.moe/o5nmea.png'; e.currentTarget.classList.add('object-contain'); }}
            />
          </a>

          <div className="script-card-info">
            <div className="script-card-header">
              <div>
                <h3 className="text-xl font-bold text-blue-200 mb-1">{script.title}</h3>
                <a
                  href={gameUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-300 hover:text-blue-200 transition-colors inline-flex items-center gap-1"
                >
                  {script.game.name}
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="flex items-center gap-2">
                {script.verified && (
                  <div className="text-green-400" title="Verified">
                    <Shield className="w-5 h-5" />
                  </div>
                )}
                {script.isPatched && (
                  <div className="text-red-400" title="Patched">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                )}
              </div>
            </div>

            <div className="script-card-stats">
              <div className="flex items-center gap-1.5 text-blue-300">
                <Eye className="w-4 h-4" />
                <span>{script.views.toLocaleString()}</span>
              </div>
              {script.likeCount !== undefined && (
                <div className="flex items-center gap-1.5 text-blue-300">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{script.likeCount}</span>
                </div>
              )}
              {script.dislikeCount !== undefined && (
                <div className="flex items-center gap-1.5 text-blue-300">
                  <ThumbsDown className="w-4 h-4" />
                  <span>{script.dislikeCount}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-blue-300">
                <Clock className="w-4 h-4" />
                <span>{Formatted_Date}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mt-3">
              <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                script.scriptType === 'free' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
              }`}>
                {script.scriptType.toUpperCase()}
              </span>
              {script.key && (
                <span className="px-2 py-1 rounded-md text-xs font-medium bg-yellow-500/20 text-yellow-400 flex items-center gap-1">
                  <FaKey className="w-3 h-3" />
                  KEY REQUIRED
                </span>
              )}
              {script.isPatched && (
                <span className="px-2 py-1 rounded-md text-xs font-medium bg-red-500/20 text-red-400 flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  PATCHED
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="script-card-actions">
          {script.keyLink && (
            <a
              href={script.keyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 border border-yellow-500/30 text-yellow-400 text-sm flex items-center gap-2 transition-all"
            >
              <FaKey className="w-4 h-4" />
              Get Key
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm flex items-center gap-2 transition-all"
          >
            {isExpanded ? 'Hide Script' : 'View Script'}
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </button>
        </div>

        <div 
          ref={contentRef}
          className="script-content"
          style={{ height: isExpanded ? 'auto' : '0px' }}
        >
          <div className="border-t border-blue-500/20 pt-4 mt-4">
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <h3 className="text-lg font-semibold text-blue-200">Script</h3>
              <div className="flex flex-wrap gap-2">
                <a
                  href={Original_Post_Url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <LinkIcon className="w-4 h-4" />
                  Original Post
                </a>
                <button
                  onClick={H_Copy}
                  className="w-full sm:w-auto px-3 py-1.5 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy Script'}
                </button>
              </div>
            </div>
            <div className="bg-blue-950/50 rounded-lg p-4 overflow-x-auto">
              <pre className="text-blue-200 whitespace-pre-wrap font-mono text-sm">
                {script.script || 'Script content not available'}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Scripts: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [query, setQuery] = useState<string | null>(null);
  const [scriptType, setScriptType] = useState<'all' | 'free' | 'paid'>('all');
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  const lastRequestTimeRef = useRef(0);

  const fetchScripts = useCallback(async (page: number = 1, search: string = '') => {
    setLoading(true);
    setError(null);

    const cacheKey = `${search}-${scriptType}-${page}`;
    const cachedData = getCachedData(cacheKey);
    
    if (cachedData) {
      setScripts(cachedData.result.scripts);
      setTotalPages(cachedData.result.totalPages);
      setLoading(false);
      return;
    }

    const now = Date.now();
    const timeSinceLastRequest = now - lastRequestTimeRef.current;
    if (timeSinceLastRequest < RATE_LIMIT_DELAY) {
      await new Promise(resolve => setTimeout(resolve, RATE_LIMIT_DELAY - timeSinceLastRequest));
    }

    try {
      const url = new URL('https://scriptblox-api-proxy.vercel.app/api/search');
      if (search) url.searchParams.set('q', search);
      if (scriptType !== 'all') url.searchParams.set('mode', scriptType);
      url.searchParams.set('page', page.toString());

      const response = await fetch(url.toString());
      
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
      }
      
      if (!response.ok) {
        throw new Error('Failed to fetch scripts. Please try again later.');
      }

      const data: SearchResponse = await response.json();
      setCachedData(cacheKey, data);
      setScripts(data.result.scripts);
      setTotalPages(data.result.totalPages);
      lastRequestTimeRef.current = Date.now();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch scripts. Please try again later.');
      const cachedData = getCachedData(cacheKey);
      if (cachedData) {
        setScripts(cachedData.result.scripts);
        setTotalPages(cachedData.result.totalPages);
      }
    } finally {
      setLoading(false);
    }
  }, [scriptType]);

  useEffect(() => {
    if (query !== null) {
      fetchScripts(currentPage, query);
    }
  }, [currentPage, query, fetchScripts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    setQuery(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setCurrentPage(1);
      setQuery(searchTerm);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-32 pb-20 px-4"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Scripts</h1>
        <p className="text-lg text-blue-200/90 max-w-2xl mx-auto">
          Browse and search through many collection of scripts.
        </p>
      </div>

      <div className="max-w-6xl mx-auto mb-8">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search scripts..."
                className="w-full pl-10 pr-4 py-3 bg-blue-500/10 border border-blue-500/30 rounded-lg text-blue-200 placeholder-blue-400/50 focus:outline-none focus:border-blue-500/50"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="relative min-w-[160px]">
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400" />
                <select
                  value={scriptType}
                  onChange={(e) => setScriptType(e.target.value as 'all' | 'free' | 'paid')}
                  className="w-full pl-10 pr-8 py-3 bg-blue-950/50 border border-blue-500/30 rounded-lg text-blue-200 appearance-none cursor-pointer focus:outline-none focus:border-blue-500/50 hover:bg-blue-500/20 transition-colors"
                >
                  <option value="all" className="bg-blue-950 text-blue-200">All Scripts</option>
                  <option value="free" className="bg-blue-950 text-blue-200">Free Only</option>
                  <option value="paid" className="bg-blue-950 text-blue-200">Paid Only</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-400 pointer-events-none" />
              </div>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-200 transition-all flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="max-w-6xl mx-auto mt-8">
        {loading ? (
          <div className="text-center text-blue-200">Loading scripts...</div>
        ) : error && scripts.length === 0 && query !== null ? (
          <div className="glass-effect rounded-xl p-4 text-center">
            <p className="text-red-400 mb-2">{error}</p>
          </div>
        ) : scripts.length === 0 && query !== null ? (
          <div className="text-center text-blue-200 mt-8">No scripts found.</div>
        ) : (
          scripts.length > 0 && (
            <div className="space-y-6">
              {scripts.map((script) => (
                <ScriptCard key={script._id} script={script} />
              ))}
            </div>
          )
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1 || loading}
            className="px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-blue-200">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || loading}
            className="px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Scripts;
