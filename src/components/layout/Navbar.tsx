import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { 
  Menu, X, Home, Info, Cpu, Star, Sun, Moon, 
  VolumeX, SkipForward, Music, ChevronRight 
} from 'lucide-react';
import logo from '@/src/assets/images/logo.png';
import { ambientSynth } from '../../lib/audio';
import { useBackgroundMusic } from '../../hooks/useBackgroundMusic';

export const Navbar = ({ 
  currentPage, 
  setCurrentPage, 
  theme, 
  toggleTheme 
}: { 
  currentPage: string, 
  setCurrentPage: (p: string) => void, 
  theme: string, 
  toggleTheme: () => void 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMusicInfo, setShowMusicInfo] = useState(false);

  const { isPlaying: isAudioPlaying, currentTrack, toggle: toggleBgAudio, playNext } = useBackgroundMusic();

  const toggleAudio = async () => {
    await ambientSynth.playClickSound();
    toggleBgAudio();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Platform', id: 'home', icon: Home },
    { name: 'About Us', id: 'about', icon: Info },
    { name: 'Services', id: 'services', icon: Cpu },
    { name: 'Trending', id: 'trending', icon: Star },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-3' : 'py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-8 relative">
        
        {/* Brand Wordmark */}
        <button 
          onClick={() => setCurrentPage('home')}
          className="flex items-center gap-2.5 group cursor-pointer text-left outline-hidden whitespace-nowrap shrink-0"
          aria-label="ReliabilityIQ Home"
        >
          <div className="w-11 h-11 flex items-center justify-center group-hover:scale-105 transition-transform">
            <img src={logo} alt="ReliabilityIQ" className="w-full h-full object-contain" />
          </div>
          <span className="text-lg sm:text-xl font-bold tracking-tight text-text-primary font-sans whitespace-nowrap shrink-0">
            Reliability<span className="text-accent">IQ</span>
          </span>
        </button>

        {/* Frosted Center Navigation Panel */}
        <nav className="hidden lg:flex items-center gap-1 p-1.5 rounded-full frosted-panel">
          <LayoutGroup>
            <div className="flex items-center gap-1 px-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`relative px-4 py-2 text-sm font-medium tracking-tight rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap shrink-0 ${
                      isActive 
                        ? 'text-accent dark:text-white font-semibold' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-glow-pill"
                        className="absolute inset-0 rounded-full bg-white/95 dark:bg-white/15 border border-white dark:border-white/20 shadow-[0_4px_14px_rgba(29,108,224,0.10)]"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="pl-1">
              <button
                onClick={() => setCurrentPage('contact')}
                className="group flex items-center gap-2 bg-[#1d6ce0] hover:bg-[#1659be] text-white text-sm font-semibold px-4 py-2 rounded-full shadow-[0_6px_18px_-4px_rgba(29,108,224,0.36)] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer whitespace-nowrap shrink-0"
              >
                <span className="w-5 h-5 rounded-full bg-white/20 text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
                  <ChevronRight size={13} strokeWidth={2.5} />
                </span>
                <span>Contact Us</span>
              </button>
            </div>
          </LayoutGroup>
        </nav>

        {/* Utility Cluster: Audio & Theme */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-full frosted-panel text-text-primary">
            <div 
              className="relative flex items-center"
              onMouseEnter={() => setShowMusicInfo(true)}
              onMouseLeave={() => setShowMusicInfo(false)}
            >
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-full hover:bg-white/60 dark:hover:bg-white/10 transition-all active:scale-95 flex items-center justify-center cursor-pointer ${
                  isAudioPlaying ? 'text-accent' : 'text-text-secondary'
                }`}
                title={isAudioPlaying ? `Playing: ${currentTrack?.title || 'Ambient Track'}` : "Play Background Music"}
                aria-label="Toggle ambient audio"
              >
                {isAudioPlaying ? (
                  <div className="flex items-end justify-center gap-[2px] h-3.5 w-3.5">
                    <span className="w-[2px] bg-accent rounded-full animate-[bounce_0.8s_infinite_ease-in-out]" style={{ height: '70%' }} />
                    <span className="w-[2px] bg-accent rounded-full animate-[bounce_0.6s_infinite_ease-in-out_0.2s]" style={{ height: '100%' }} />
                    <span className="w-[2px] bg-accent rounded-full animate-[bounce_0.9s_infinite_ease-in-out_0.4s]" style={{ height: '50%' }} />
                  </div>
                ) : (
                  <VolumeX size={17} />
                )}
              </button>

              <AnimatePresence>
                {showMusicInfo && isAudioPlaying && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    className="absolute top-full right-0 mt-2 px-3 py-2 frosted-panel-elevated rounded-xl flex items-center gap-2.5 whitespace-nowrap z-50 text-xs text-text-primary"
                  >
                    <Music size={13} className="text-accent shrink-0" />
                    <div className="flex flex-col">
                      <span className="text-[10px] text-text-secondary font-mono">Atmosphere</span>
                      <span className="font-semibold text-text-primary max-w-[120px] truncate">{currentTrack?.title}</span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playNext();
                      }}
                      className="p-1 hover:bg-accent/10 rounded-full text-text-secondary hover:text-accent transition-colors cursor-pointer"
                      title="Next Track"
                    >
                      <SkipForward size={14} />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-white/60 dark:hover:bg-white/10 transition-all active:scale-95 text-text-secondary hover:text-text-primary cursor-pointer"
              title="Toggle theme appearance"
              aria-label="Toggle theme appearance"
            >
              {theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2.5 rounded-full frosted-panel text-text-primary active:scale-95 cursor-pointer"
            aria-label="Open navigation menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/25 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="relative w-full max-w-xs h-full serene-glass-bg text-text-primary p-6 shadow-2xl flex flex-col justify-between border-l border-white/80 dark:border-white/15"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-border-subtle mb-6">
                  <div className="flex items-center gap-2">
                    <img src={logo} alt="ReliabilityIQ" className="w-8 h-8 object-contain" />
                    <span className="font-bold text-lg text-text-primary">ReliabilityIQ</span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-full frosted-panel text-text-primary cursor-pointer"
                    aria-label="Close navigation menu"
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentPage(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center justify-between px-4 py-3 rounded-2xl font-semibold text-left transition-all cursor-pointer ${
                        currentPage === item.id
                          ? 'bg-[#1d6ce0] text-white shadow-md'
                          : 'text-text-primary hover:bg-white/50 dark:hover:bg-white/10'
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <item.icon size={18} />
                        {item.name}
                      </span>
                      <ChevronRight size={16} opacity={0.6} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-border-subtle flex flex-col gap-4">
                <button
                  onClick={() => {
                    setCurrentPage('contact');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full swimtopia-pill-btn justify-center"
                >
                  <span className="swimtopia-pill-badge">
                    <ChevronRight size={13} strokeWidth={2.5} />
                  </span>
                  <span>Contact Us</span>
                </button>

                <div className="flex items-center justify-between px-2 pt-2 text-text-secondary">
                  <span className="text-xs font-mono">Audio / Theme</span>
                  <div className="flex items-center gap-2">
                    <button onClick={toggleAudio} className="p-2 rounded-full frosted-panel text-text-primary cursor-pointer" aria-label="Toggle audio">
                      {isAudioPlaying ? <Music size={16} className="text-accent" /> : <VolumeX size={16} />}
                    </button>
                    <button onClick={toggleTheme} className="p-2 rounded-full frosted-panel text-text-primary cursor-pointer" aria-label="Toggle theme">
                      {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};
