import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Menu, X, Home, Info, Cpu, Star, Mail, Sun, Moon, User, ArrowRight, Volume2, VolumeX, SkipForward, Music } from 'lucide-react';
import { MagneticGlowButton } from '../MagneticGlowButton';
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
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [showMusicInfo, setShowMusicInfo] = useState(false);

  const { isPlaying: isAudioPlaying, currentTrack, toggle: toggleBgAudio, playNext } = useBackgroundMusic();

  const toggleAudio = async () => {
    await ambientSynth.playClickSound();
    toggleBgAudio();
  };

  const [scrollProgress, setScrollProgress] = useState(0);
  const [navigatingTo, setNavigatingTo] = useState<string | null>(null);

  const handleMobileNav = (id: string) => {
    setNavigatingTo(id);
    setTimeout(() => {
      setCurrentPage(id);
      setMobileMenuOpen(false);
      setNavigatingTo(null);
    }, 600); // Delay to show animation
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress(Math.round((window.scrollY / totalHeight) * 100));
      } else {
        setScrollProgress(0);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // init
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', id: 'home', icon: Home },
    { name: 'About', id: 'about', icon: Info },
    { name: 'Services', id: 'services', icon: Cpu },
    { name: 'Trending', id: 'trending', icon: Star },
    { name: 'Contact', id: 'contact', icon: Mail },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10 h-10 lg:h-12">
        {/* Mobile Logo */}
        <button 
          onClick={() => setCurrentPage('home')}
          className="block lg:hidden cursor-pointer transition-transform hover:scale-105 active:scale-95 outline-hidden"
          aria-label="Home"
        >
          <img src={logo} alt="logo" className="h-10 w-auto object-contain" />
        </button>
        <div className="hidden lg:block w-10" />

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1.5 lg:gap-3 p-1.5 rounded-full absolute left-1/2 -translate-x-1/2 transition-all duration-500 overflow-hidden bg-bg-card/30 backdrop-blur-md border border-border-primary shadow-lg dark:crystal-glass">
          <div className="absolute top-0 left-0 right-0 h-[10px] bg-white/5 pointer-events-none" />
          <LayoutGroup>
            {navItems.slice(0, 3).map((item) => {
              const isActive = currentPage === item.id;
              const isHovered = hoveredNav === item.id;
              const showText = isActive || isHovered;
              
              return (
                <button
                  key={item.id}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  onClick={() => setCurrentPage(item.id)}
                  className={`relative flex items-center justify-center font-mono text-xs lg:text-sm tracking-wide transition-all z-10 rounded-full h-8 lg:h-10 ${isActive ? 'text-text-primary text-glow font-bold' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="liquid-nav-pill"
                      className="absolute inset-0 rounded-full -z-10 bg-accent/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]"
                      transition={{ type: "spring", stiffness: 450, damping: 30, mass: 1 }}
                    />
                  )}
                  <motion.div layout className="flex items-center h-full px-2 lg:px-4" transition={{ type: "spring", stiffness: 450, damping: 30, mass: 1 }}>
                    <item.icon className="shrink-0 w-4 h-4 lg:w-[18px] lg:h-[18px]" />
                    <motion.div
                      animate={{ 
                        width: showText ? "auto" : 0, 
                        opacity: showText ? 1 : 0,
                        marginLeft: showText ? 8 : 0
                      }}
                      initial={false}
                      transition={{ type: "spring", stiffness: 450, damping: 30, mass: 1 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {item.name}
                    </motion.div>
                  </motion.div>
                </button>
              );
            })}

            {/* Utilities in the middle */}
            <div className="flex items-center gap-1.5 lg:gap-3 mx-3 lg:mx-4">
              <button 
                onClick={() => setCurrentPage('home')}
                className="bg-bg-card/40 backdrop-blur-[40px] px-2 py-1 lg:py-2 rounded-full font-mono hover:bg-bg-card/60 transition-all active:scale-95 h-8 lg:h-10 flex items-center justify-center border border-border-primary shadow-sm"
              >
                <img src={logo} alt="logo" referrerPolicy="no-referrer" className="h-5 w-5 lg:h-6 lg:w-6 object-contain" />
              </button>
              <div className="ml-[10px] flex items-center gap-1.5 relative">
                <div 
                  className="relative flex items-center"
                  onMouseEnter={() => setShowMusicInfo(true)}
                  onMouseLeave={() => setShowMusicInfo(false)}
                >
                  <button
                    onClick={toggleAudio}
                    className={`bg-bg-card/20 hover:bg-bg-card/40 p-2 rounded-full transition-all active:scale-90 h-8 lg:h-10 w-8 lg:w-10 flex items-center justify-center border border-border-primary text-text-primary ${
                      isAudioPlaying ? 'text-accent border-accent/40 shadow-[0_0_12px_rgba(var(--color-accent),0.3)]' : ''
                    }`}
                    title={isAudioPlaying ? `Playing: ${currentTrack?.title || 'Background Music'}` : "Play Background Music"}
                  >
                    {isAudioPlaying ? (
                      <div className="flex items-end justify-center gap-[2px] h-3.5 w-3.5">
                        <span className="w-[2.5px] bg-accent rounded-full animate-[bounce_0.8s_infinite_ease-in-out]" style={{ height: '70%' }} />
                        <span className="w-[2.5px] bg-accent rounded-full animate-[bounce_0.6s_infinite_ease-in-out_0.2s]" style={{ height: '100%' }} />
                        <span className="w-[2.5px] bg-accent rounded-full animate-[bounce_0.9s_infinite_ease-in-out_0.4s]" style={{ height: '50%' }} />
                      </div>
                    ) : (
                      <VolumeX size={18} />
                    )}
                  </button>

                  {/* Now Playing Tooltip Popover */}
                  <AnimatePresence>
                    {showMusicInfo && isAudioPlaying && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-bg-card/95 backdrop-blur-xl border border-border-primary rounded-xl shadow-xl flex items-center gap-2.5 whitespace-nowrap z-50 pointer-events-auto text-xs"
                      >
                        <Music size={13} className="text-accent shrink-0 animate-pulse" />
                        <div className="flex flex-col">
                          <span className="text-[10px] text-text-secondary uppercase font-mono tracking-wider">Now Playing</span>
                          <span className="font-medium text-text-primary max-w-[130px] truncate">{currentTrack?.title}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playNext();
                          }}
                          className="p-1 hover:bg-white/10 rounded-full text-text-secondary hover:text-text-primary transition-colors ml-1"
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
                  className="bg-bg-card/20 hover:bg-bg-card/40 p-2 rounded-full transition-all active:scale-90 h-8 lg:h-10 w-8 lg:w-10 flex items-center justify-center border border-border-primary text-text-primary"
                  aria-label="Toggle theme"
                >
                  {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                </button>
              </div>
            </div>

            {navItems.slice(3).map((item) => {
              const isActive = currentPage === item.id;
              const isHovered = hoveredNav === item.id;
              const showText = isActive || isHovered;
              
              return (
                <button
                  key={item.id}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  onClick={() => setCurrentPage(item.id)}
                  className={`relative flex items-center justify-center font-mono text-xs lg:text-sm tracking-wide transition-all z-10 rounded-full h-8 lg:h-10 ${isActive ? 'text-text-primary text-glow font-bold' : 'text-text-secondary hover:text-text-primary'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="liquid-nav-pill"
                      className="absolute inset-0 rounded-full -z-10 bg-accent/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.1)] dark:shadow-[inset_0_1px_2px_rgba(255,255,255,0.3)]"
                      transition={{ type: "spring", stiffness: 450, damping: 30, mass: 1 }}
                    />
                  )}
                  <motion.div layout className="flex items-center h-full px-2 lg:px-4" transition={{ type: "spring", stiffness: 450, damping: 30, mass: 1 }}>
                    <item.icon className={`shrink-0 w-4 h-4 lg:w-[18px] lg:h-[18px] ${isActive && theme === 'dark' ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]' : ''}`} />
                    <motion.div
                      animate={{ 
                        width: showText ? "auto" : 0, 
                        opacity: showText ? 1 : 0,
                        marginLeft: showText ? 8 : 0
                      }}
                      initial={false}
                      transition={{ type: "spring", stiffness: 450, damping: 30, mass: 1 }}
                      className="overflow-hidden whitespace-nowrap"
                    >
                      {item.name}
                    </motion.div>
                  </motion.div>
                </button>
              );
            })}
          </LayoutGroup>
        </div>

        {/* Mobile Toggle Pill */}
        <div className="lg:hidden flex items-center justify-end">
          <AnimatePresence mode="wait">
            {!mobileMenuOpen && (
              <motion.div 
                layoutId="morphed-mobile-menu"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                className="flex items-center backdrop-blur-xl border border-border-primary bg-bg-card/70 rounded-full p-1.5 gap-1.5 shadow-md dark:bg-white/5 dark:border-white/10"
                style={{ borderRadius: 9999 }}
              >
                 <button className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full hover:bg-text-primary/5 transition-colors text-text-primary" onClick={() => setMobileMenuOpen(true)}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 9h16M4 15h16" /></svg>
                    <span className="text-base font-medium font-sans">Menu</span>
                 </button>
                 
                 <button onClick={toggleTheme} className="w-10 h-10 shrink-0 bg-text-primary/5 rounded-full flex items-center justify-center border border-border-primary transition-colors text-text-primary hover:bg-text-primary/10">
                    {theme === 'light' ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
                 </button>

                 <button onClick={toggleAudio} className={`w-10 h-10 shrink-0 bg-text-primary/5 rounded-full flex items-center justify-center border border-border-primary transition-colors text-text-primary hover:bg-text-primary/10 ${isAudioPlaying ? 'text-accent border-accent/40 shadow-[0_0_10px_rgba(var(--color-accent),0.3)]' : ''}`}>
                    {isAudioPlaying ? (
                      <div className="flex items-end justify-center gap-[2px] h-3.5 w-3.5">
                        <span className="w-[2px] bg-accent rounded-full animate-[bounce_0.8s_infinite_ease-in-out]" style={{ height: '70%' }} />
                        <span className="w-[2px] bg-accent rounded-full animate-[bounce_0.6s_infinite_ease-in-out_0.2s]" style={{ height: '100%' }} />
                        <span className="w-[2px] bg-accent rounded-full animate-[bounce_0.9s_infinite_ease-in-out_0.4s]" style={{ height: '50%' }} />
                      </div>
                    ) : (
                      <VolumeX size={18} strokeWidth={1.5} />
                    )}
                 </button>
                 
                 <div className="h-10 px-4 shrink-0 bg-text-primary/5 rounded-full flex items-center justify-center text-sm font-medium font-sans border border-border-primary text-text-primary/90">
                    {scrollProgress}%
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile Menu Modal Morphing Container */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-[100] lg:hidden flex justify-end">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-bg-primary/20 backdrop-blur-sm" 
              onClick={() => setMobileMenuOpen(false)} 
            />
            
            {/* Morphing Panel */}
            <div className="relative w-full h-[100dvh] p-4 flex justify-end pt-[1.5rem]">
              <motion.div
                layoutId="morphed-mobile-menu"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                className="relative w-[85vw] max-w-[320px] h-[calc(100%-1rem)] max-h-[700px] backdrop-blur-xl border border-border-primary bg-bg-card/95 rounded-[32px] overflow-hidden flex flex-col shadow-2xl dark:bg-bg-primary/95 dark:border-white/20 origin-top-right"
                style={{ borderRadius: 32 }}
              >
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex flex-col h-full p-5 relative z-10"
                >
                  {/* Header Pill */}
                  <div className="flex items-center justify-between bg-bg-card/50 backdrop-blur-md border border-border-primary rounded-full p-1.5 mb-8 shadow-sm dark:bg-white/5 dark:border-white/10">
                     <button className="flex items-center gap-1.5 pl-3 pr-3 py-2 rounded-full transition-colors text-text-primary hover:bg-text-primary/10 bg-text-primary/5" onClick={() => setMobileMenuOpen(false)}>
                        <X size={16} strokeWidth={1.5} />
                        <span className="text-sm font-medium font-sans">Close</span>
                     </button>
                     
                     <div className="flex items-center gap-1">
                       <button onClick={toggleAudio} className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center border border-border-primary bg-text-primary/5 hover:bg-text-primary/10 text-text-primary transition-colors ${isAudioPlaying ? 'text-accent border-accent/40 shadow-[0_0_8px_rgba(var(--color-accent),0.3)]' : ''}`}>
                          {isAudioPlaying ? (
                            <div className="flex items-end justify-center gap-[1.5px] h-3 w-3">
                              <span className="w-[1.5px] bg-accent rounded-full animate-[bounce_0.8s_infinite_ease-in-out]" style={{ height: '70%' }} />
                              <span className="w-[1.5px] bg-accent rounded-full animate-[bounce_0.6s_infinite_ease-in-out_0.2s]" style={{ height: '100%' }} />
                              <span className="w-[1.5px] bg-accent rounded-full animate-[bounce_0.9s_infinite_ease-in-out_0.4s]" style={{ height: '50%' }} />
                            </div>
                          ) : (
                            <VolumeX size={16} strokeWidth={1.5} />
                          )}
                       </button>
                       <button onClick={toggleTheme} className="w-8 h-8 shrink-0 rounded-full flex items-center justify-center border border-border-primary bg-text-primary/5 hover:bg-text-primary/10 text-text-primary transition-colors">
                          {theme === 'light' ? <Moon size={16} strokeWidth={1.5} /> : <Sun size={16} strokeWidth={1.5} />}
                       </button>
                     </div>
                  </div>

                  {/* Links Content */}
                  <div className="flex-1 overflow-y-auto w-full max-w-full custom-scrollbar pb-10 flex flex-col gap-2">
                     <div className="text-[12px] mb-2 font-medium uppercase tracking-wider text-text-secondary pl-2">Menu</div>
                     <div className="flex flex-col gap-2 mb-8">
                         {navItems.map((item, i) => {
                             const isNavigating = navigatingTo === item.id;
                             
                             return (
                               <motion.button 
                                 initial={{ opacity: 0, x: -20 }}
                                 animate={{ 
                                   opacity: 1, 
                                   x: isNavigating ? 15 : 0,
                                 }}
                                 transition={{ 
                                   delay: isNavigating ? 0 : 0.1 + i * 0.05, 
                                   type: "spring", 
                                   stiffness: 300, 
                                   damping: 24 
                                 }}
                                 key={item.id} 
                                 onClick={() => handleMobileNav(item.id)}
                                 disabled={navigatingTo !== null && !isNavigating}
                                 className={`flex items-center gap-4 text-3xl font-sans font-bold leading-[1.2] tracking-tighter p-4 rounded-2xl text-left transition-all duration-300 relative overflow-hidden ${isNavigating ? 'text-accent' : 'text-text-primary hover:bg-text-primary/5 hover:pl-6'}`}
                               >
                                   <AnimatePresence mode="wait">
                                     {isNavigating ? (
                                       <motion.div
                                         key="arrow"
                                         initial={{ opacity: 0, x: -10 }}
                                         animate={{ opacity: 1, x: 0 }}
                                         exit={{ opacity: 0, x: 10 }}
                                         className="text-accent"
                                       >
                                         <ArrowRight size={32} strokeWidth={2.5} />
                                       </motion.div>
                                     ) : null}
                                   </AnimatePresence>
                                   <span className="relative z-10">{item.name}</span>
                                   
                                   {isNavigating && (
                                     <motion.div 
                                       layoutId="active-nav-glow"
                                       className="absolute inset-0 bg-accent/5 -z-10"
                                       initial={{ opacity: 0 }}
                                       animate={{ opacity: 1 }}
                                     />
                                   )}
                               </motion.button>
                             );
                         })}
                     </div>

                     <hr className="border-border-primary opacity-50 my-4" />

                     <div className="text-[12px] mb-2 font-medium uppercase tracking-wider text-text-secondary pl-2">Socials</div>
                     <div className="flex flex-col gap-2 mb-4">
                         <a href="https://youtube.com/shorts/6W0wKw3zz6w?si=Qfu9R35C7ozK7vQh" target="_blank" rel="noopener noreferrer" className="text-base font-sans font-medium text-left p-2 rounded-xl transition-all duration-300 text-text-secondary hover:text-text-primary hover:bg-text-primary/5 flex items-center justify-between">
                           <span>YouTube Shorts</span>
                           <span className="text-xs bg-red-500/15 text-red-500 px-2 py-0.5 rounded-full font-medium">Channel</span>
                         </a>
                         <a href="#" className="text-base font-sans font-medium text-left p-2 rounded-xl transition-all duration-300 text-text-secondary hover:text-text-primary hover:bg-text-primary/5">Instagram</a>
                         <a href="#" className="text-base font-sans font-medium text-left p-2 rounded-xl transition-all duration-300 text-text-secondary hover:text-text-primary hover:bg-text-primary/5">Twitter</a>
                     </div>
                  </div>

                  {/* Footer Buttons */}
                  <div className="mt-auto pt-4 flex gap-2">
                      <MagneticGlowButton className="flex-1 !py-4 text-base font-medium shadow-xl !bg-accent" onClick={() => { setCurrentPage('contact'); setMobileMenuOpen(false); }}>
                          Get started
                      </MagneticGlowButton>
                  </div>
                </motion.div>
                
                {/* Decorative background flair */}
                <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/10 blur-[80px] rounded-full pointer-events-none z-0 translate-y-1/2 translate-x-1/2" />
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </nav>
  );
};
