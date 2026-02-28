import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gamepad2, 
  Search, 
  X, 
  Maximize2, 
  TrendingUp, 
  Clock, 
  Trophy,
  ChevronRight,
  Filter
} from 'lucide-react';
import { GAMES } from './games';

export default function App() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(GAMES.map(g => g.category)))];

  const filteredGames = useMemo(() => {
    return GAMES.filter(game => {
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Marquee Header */}
      <div className="bg-neon-green text-black py-2 overflow-hidden whitespace-nowrap border-b-2 border-black">
        <div className="flex animate-marquee">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="font-display text-sm uppercase tracking-widest mx-8">
              UNBLOCKED • HIGH PERFORMANCE • NO LAG • NOVA GAMES • PLAY NOW •
            </span>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="border-b-2 border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedGame(null)}>
            <div className="w-10 h-10 bg-neon-green flex items-center justify-center rounded-sm rotate-3">
              <Gamepad2 className="text-black w-6 h-6 -rotate-3" />
            </div>
            <h1 className="font-display text-3xl tracking-tighter uppercase">Nova Games</h1>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-neon-green" />
              <input 
                type="text"
                placeholder="Search games..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-zinc-900 border-2 border-zinc-800 py-2 pl-10 pr-4 rounded-sm focus:outline-none focus:border-neon-green w-64 transition-all"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <AnimatePresence mode="wait">
          {!selectedGame ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <section className="relative overflow-hidden rounded-sm border-2 border-zinc-800 bg-zinc-900 p-8 md:p-16">
                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-green/10 text-neon-green text-xs font-mono uppercase tracking-widest mb-6 border border-neon-green/20">
                    <TrendingUp className="w-3 h-3" />
                    Trending Now
                  </div>
                  <h2 className="font-display text-5xl md:text-7xl uppercase leading-none mb-6">
                    Play the best <span className="text-neon-green">unblocked</span> games.
                  </h2>
                  <p className="text-zinc-400 text-lg mb-8 max-w-lg">
                    No downloads, no blocks. Just pure gaming performance directly in your browser.
                  </p>
                  <button 
                    onClick={() => setSelectedGame(GAMES[0])}
                    className="bg-neon-green text-black font-display text-xl px-8 py-4 uppercase tracking-tight hover:scale-105 transition-transform active:scale-95"
                  >
                    Start Playing
                  </button>
                </div>
                <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 pointer-events-none hidden lg:block">
                  <div className="grid grid-cols-4 gap-4 p-8 rotate-12">
                    {GAMES.map((g, i) => (
                      <div key={i} className="aspect-square bg-zinc-800 border-2 border-zinc-700 rounded-sm" />
                    ))}
                  </div>
                </div>
              </section>

              {/* Filters */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
                  <Filter className="w-5 h-5 text-zinc-500 shrink-0" />
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-1.5 rounded-sm font-mono text-sm uppercase tracking-wider whitespace-nowrap transition-all ${
                        activeCategory === cat 
                        ? 'bg-neon-green text-black font-bold' 
                        : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
                <div className="text-zinc-500 font-mono text-sm">
                  Showing {filteredGames.length} games
                </div>
              </div>

              {/* Game Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {filteredGames.map((game) => (
                  <motion.div
                    layout
                    key={game.id}
                    onClick={() => setSelectedGame(game)}
                    className="group cursor-pointer bg-zinc-900 border-2 border-zinc-800 rounded-sm overflow-hidden transition-all duration-300 hover:border-neon-green hover:-translate-y-1 game-card-shadow"
                  >
                    <div className="aspect-[4/3] relative overflow-hidden">
                      <img 
                        src={game.thumbnail} 
                        alt={game.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-black/80 backdrop-blur-sm text-neon-green text-[10px] font-mono px-2 py-1 uppercase tracking-widest border border-neon-green/30">
                          {game.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-display text-xl uppercase tracking-tight group-hover:text-neon-green transition-colors">
                          {game.title}
                        </h3>
                        <ChevronRight className="w-5 h-5 text-zinc-700 group-hover:text-neon-green group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-zinc-500 text-sm line-clamp-2 font-sans">
                        {game.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {filteredGames.length === 0 && (
                <div className="text-center py-24 border-2 border-dashed border-zinc-800 rounded-sm">
                  <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500 font-mono">No games found matching your search.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="player"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col gap-8"
            >
              {/* Game Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedGame(null)}
                    className="p-2 bg-zinc-900 border-2 border-zinc-800 hover:border-neon-green transition-colors rounded-sm"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <div>
                    <h2 className="font-display text-3xl uppercase tracking-tight">{selectedGame.title}</h2>
                    <div className="flex items-center gap-4 text-zinc-500 text-xs font-mono uppercase tracking-widest mt-1">
                      <span className="text-neon-green">{selectedGame.category}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> Just updated</span>
                      <span className="flex items-center gap-1"><Trophy className="w-3 h-3" /> High Scores Enabled</span>
                    </div>
                  </div>
                </div>
                <button className="hidden md:flex items-center gap-2 bg-zinc-900 border-2 border-zinc-800 px-4 py-2 rounded-sm hover:border-neon-green transition-all font-mono text-xs uppercase tracking-widest">
                  <Maximize2 className="w-4 h-4" />
                  Fullscreen
                </button>
              </div>

              {/* Game Frame */}
              <div className="aspect-video w-full bg-black border-2 border-zinc-800 rounded-sm overflow-hidden relative group">
                <iframe 
                  src={selectedGame.url}
                  className="w-full h-full border-none"
                  title={selectedGame.title}
                  allowFullScreen
                />
              </div>

              {/* Game Info & Related */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-6">
                  <div className="bg-zinc-900 border-2 border-zinc-800 p-8 rounded-sm">
                    <h4 className="font-display text-xl uppercase mb-4">About the game</h4>
                    <p className="text-zinc-400 leading-relaxed">
                      {selectedGame.description} Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                      Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                  </div>
                </div>
                <div className="space-y-6">
                  <h4 className="font-display text-xl uppercase">You might also like</h4>
                  <div className="space-y-4">
                    {GAMES.filter(g => g.id !== selectedGame.id).slice(0, 3).map(game => (
                      <div 
                        key={game.id}
                        onClick={() => setSelectedGame(game)}
                        className="flex gap-4 p-3 bg-zinc-900 border-2 border-zinc-800 rounded-sm cursor-pointer hover:border-neon-green transition-all group"
                      >
                        <img src={game.thumbnail} alt="" className="w-20 h-20 object-cover rounded-sm grayscale group-hover:grayscale-0" />
                        <div>
                          <h5 className="font-display text-sm uppercase group-hover:text-neon-green">{game.title}</h5>
                          <p className="text-zinc-500 text-xs mt-1">{game.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t-2 border-zinc-800 bg-zinc-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-zinc-800 flex items-center justify-center rounded-sm">
                <Gamepad2 className="text-zinc-500 w-5 h-5" />
              </div>
              <span className="font-display text-xl uppercase tracking-tight">Nova Games</span>
            </div>
            <div className="flex gap-8 font-mono text-xs uppercase tracking-widest text-zinc-500">
              <a href="#" className="hover:text-neon-green transition-colors">Terms</a>
              <a href="#" className="hover:text-neon-green transition-colors">Privacy</a>
              <a href="#" className="hover:text-neon-green transition-colors">Contact</a>
              <a href="#" className="hover:text-neon-green transition-colors">DMCA</a>
            </div>
            <div className="text-zinc-600 font-mono text-[10px] uppercase tracking-widest">
              © 2026 Nova Games • Built for performance
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
