import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { 
  Menu, X, Home, Info, Cpu, Star, Sun, Moon, 
  VolumeX, SkipForward, Music, ChevronRight, ChevronDown,
  Code, BrainCircuit, Video, Map, Megaphone, FileText, ArrowRight
} from 'lucide-react';
import { ambientSynth } from '../../lib/audio';
import { useBackgroundMusic } from '../../hooks/useBackgroundMusic';

const logo = '/assets/aistudio/Glossy_Teal_Growth_Arrow_Emblem_587c276c.png';

const SERVICE_DETAIL_LINKS = [
  { id: 'service-branding', title: 'Digital Platforms', subtitle: 'Websites, Apps & Systems', icon: Code },
  { id: 'service-automation', title: 'Intelligent Automation', subtitle: 'AI Agents & Workflows', icon: BrainCircuit },
  { id: 'service-animation', title: 'AI Animation', subtitle: 'Generative Video & Motion', icon: Video },
  { id: 'service-gis', title: 'GIS Mapping', subtitle: 'Geospatial Intelligence', icon: Map },
  { id: 'service-social', title: 'Social Media Advertising', subtitle: 'Growth & Ad Campaigns', icon: Megaphone },
  { id: 'service-documentation', title: 'Technical Documentation', subtitle: 'APIs & System Specs', icon: FileText },
];

export const Navbar = ({ 
  currentPage, 
  setCurrentPage, 
  theme, 
  toggleTheme,
  onMobileMenuChange
}: { 
  currentPage: string, 
  setCurrentPage: (p: string) => void, 
  theme: string, 
  toggleTheme: () => void,
  onMobileMenuChange?: (open: boolean) => void
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    onMobileMenuChange?.(mobileMenuOpen);
  }, [mobileMenuOpen, onMobileMenuChange]);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [showMusicInfo, setShowMusicInfo] = useState(false);
  const [servicesMenuOpen, setServicesMenuOpen] = useState(false);
  const [servicesMenuPinned, setServicesMenuPinned] = useState(false);
  const servicesNavRef = React.useRef<HTMLDivElement | null>(null);
  const closeTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const openServicesMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setServicesMenuOpen(true);
  };

  const closeServicesMenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setServicesMenuOpen(false);
    setServicesMenuPinned(false);
  };

  const scheduleCloseServicesMenu = () => {
    if (servicesMenuPinned) return;
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setServicesMenuOpen(false);
    }, 150);
  };

  const toggleServicesDropdown = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    if (servicesMenuOpen && servicesMenuPinned) {
      setServicesMenuOpen(false);
      setServicesMenuPinned(false);
    } else {
      setServicesMenuOpen(true);
      setServicesMenuPinned(true);
    }
  };

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      if (servicesNavRef.current && !servicesNavRef.current.contains(e.target as Node)) {
        closeServicesMenu();
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeServicesMenu();
      }
    };
    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

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
    <header className={`fixed top-0 left-0 w-full transition-all duration-300 ${mobileMenuOpen ? 'z-[120]' : 'z-50'} ${isScrolled ? 'py-3' : 'py-5'}`}>
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
                const isServicesItem = item.id === 'services';
                const isActive = isServicesItem
                  ? currentPage === 'services' || currentPage.startsWith('service-')
                  : currentPage === item.id;

                if (isServicesItem) {
                  return (
                    <div
                      key={item.id}
                      ref={servicesNavRef}
                      className="relative"
                      onMouseEnter={openServicesMenu}
                      onMouseLeave={scheduleCloseServicesMenu}
                    >
                      <div
                        className={`relative rounded-full flex items-center whitespace-nowrap shrink-0 transition-colors duration-200 ${
                          isActive
                            ? 'text-accent dark:text-white font-semibold'
                            : 'text-text-secondary hover:text-text-primary'
                        }`}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="active-nav-glow-pill"
                            className="absolute inset-0 rounded-full bg-gradient-to-b from-white/95 to-sky-50/75 dark:from-white/25 dark:to-white/10 backdrop-blur-md border border-white dark:border-white/30 shadow-[0_6px_18px_rgba(29,108,224,0.16),inset_0_1px_0_rgba(255,255,255,0.95)] pointer-events-none"
                            transition={{ type: "spring", stiffness: 400, damping: 32 }}
                          />
                        )}
                        <button
                          type="button"
                          onClick={() => {
                            setCurrentPage('services');
                            closeServicesMenu();
                          }}
                          className="relative z-10 pl-4 pr-1 py-2 text-sm font-medium tracking-tight rounded-l-full cursor-pointer whitespace-nowrap"
                        >
                          {item.name}
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleServicesDropdown();
                          }}
                          aria-expanded={servicesMenuOpen}
                          aria-haspopup="menu"
                          aria-label="Toggle services dropdown list"
                          title="Show service details menu"
                          className="relative z-10 pl-0.5 pr-2.5 py-2 rounded-r-full flex items-center justify-center cursor-pointer"
                        >
                          <span
                            className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors ${
                              servicesMenuOpen
                                ? 'bg-accent/15 text-accent'
                                : 'hover:bg-accent/10 hover:text-accent'
                            }`}
                          >
                            <ChevronDown
                              size={13}
                              strokeWidth={2.35}
                              className={`transition-transform duration-200 ${
                                servicesMenuOpen ? 'rotate-180 text-accent' : ''
                              }`}
                            />
                          </span>
                        </button>
                      </div>

                      <AnimatePresence>
                        {servicesMenuOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.96, filter: 'blur(6px)' }}
                            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, y: 8, scale: 0.96, filter: 'blur(4px)' }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
                            role="menu"
                          >
                            <div className="w-[316px] frosted-panel-elevated rounded-2xl p-2 text-text-primary relative overflow-hidden">
                              <div className="absolute inset-0 glass-reflection" />
                              <div className="relative z-10 px-3 py-1.5 flex items-center justify-between">
                                <span className="font-mono text-[10px] uppercase tracking-[0.18em] font-semibold text-accent">
                                  Service Capabilities
                                </span>
                                <span className="font-mono text-[10px] text-text-secondary">
                                  6 Pages
                                </span>
                              </div>

                              <div className="space-y-0.5 mt-1">
                                {SERVICE_DETAIL_LINKS.map((service, idx) => {
                                  const ServiceIcon = service.icon;
                                  const isSelected = currentPage === service.id;

                                  return (
                                    <motion.button
                                      key={service.id}
                                      type="button"
                                      role="menuitem"
                                      initial={{ opacity: 0, x: -6 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        duration: 0.2,
                                        delay: idx * 0.03,
                                        ease: [0.16, 1, 0.3, 1],
                                      }}
                                      onClick={() => {
                                        setCurrentPage(service.id);
                                        closeServicesMenu();
                                      }}
                                      className={`w-full flex items-center justify-between gap-3 px-2.5 py-2 rounded-xl text-left transition-all duration-150 group/item cursor-pointer ${
                                        isSelected
                                          ? 'bg-accent/12 text-accent'
                                          : 'hover:bg-white/75 dark:hover:bg-white/10 text-text-primary'
                                      }`}
                                    >
                                      <div className="flex items-center gap-2.5 min-w-0">
                                        <span
                                          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                                            isSelected
                                              ? 'bg-accent text-white shadow-xs'
                                              : 'bg-sky-100/80 dark:bg-white/10 text-accent group-hover/item:bg-accent group-hover/item:text-white'
                                          }`}
                                        >
                                          <ServiceIcon size={15} />
                                        </span>
                                        <div className="min-w-0">
                                          <div className="text-xs font-semibold leading-tight truncate">
                                            {service.title}
                                          </div>
                                          <div className="text-[11px] text-text-secondary truncate mt-0.5">
                                            {service.subtitle}
                                          </div>
                                        </div>
                                      </div>

                                      <ArrowRight
                                        size={13}
                                        className={`shrink-0 transition-all duration-150 ${
                                          isSelected
                                            ? 'opacity-100 text-accent translate-x-0'
                                            : 'opacity-0 -translate-x-1 group-hover/item:opacity-100 group-hover/item:translate-x-0 text-accent'
                                        }`}
                                      />
                                    </motion.button>
                                  );
                                })}
                              </div>

                              <div className="mt-1.5 pt-1.5 border-t border-border-subtle">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCurrentPage('services');
                                    closeServicesMenu();
                                  }}
                                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-accent hover:bg-accent/10 transition-colors cursor-pointer"
                                >
                                  <span>All Services &amp; Consultation Booking</span>
                                  <ChevronRight size={14} />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

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
                        className="absolute inset-0 rounded-full bg-gradient-to-b from-white/95 to-sky-50/75 dark:from-white/25 dark:to-white/10 backdrop-blur-md border border-white dark:border-white/30 shadow-[0_6px_18px_rgba(29,108,224,0.16),inset_0_1px_0_rgba(255,255,255,0.95)]"
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
                className="group crystal-button liquid-hover-sheen flex items-center gap-2 text-white text-sm font-semibold px-4 py-2 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span className="w-5 h-5 rounded-full bg-white/25 border border-white/40 text-white flex items-center justify-center transition-transform group-hover:translate-x-0.5">
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
          <div className="fixed inset-0 z-[120] lg:hidden flex justify-end">
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
              className="relative w-full max-w-xs h-full frosted-panel-elevated text-text-primary p-6 shadow-2xl flex flex-col justify-between border-l border-white/85 dark:border-white/20"
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
                  {navItems.map((item) => {
                    const isServicesItem = item.id === 'services';
                    const isItemActive = isServicesItem
                      ? currentPage === 'services' || currentPage.startsWith('service-')
                      : currentPage === item.id;

                    if (isServicesItem) {
                      return (
                        <div key={item.id} className="flex flex-col gap-1">
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => {
                                setCurrentPage(item.id);
                                setMobileMenuOpen(false);
                              }}
                              className={`flex-1 flex items-center justify-between px-4 py-3 rounded-2xl font-semibold text-left transition-all cursor-pointer ${
                                isItemActive
                                  ? 'bg-[#1d6ce0] text-white shadow-md'
                                  : 'text-text-primary hover:bg-white/50 dark:hover:bg-white/10'
                              }`}
                            >
                              <span className="flex items-center gap-3">
                                <item.icon size={18} />
                                {item.name}
                              </span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setMobileServicesOpen((prev) => !prev)}
                              aria-label="Toggle service pages"
                              className="p-3 rounded-2xl frosted-panel text-text-primary cursor-pointer"
                            >
                              <ChevronDown
                                size={16}
                                className={`transition-transform duration-200 ${
                                  mobileServicesOpen ? 'rotate-180 text-accent' : ''
                                }`}
                              />
                            </button>
                          </div>

                          <AnimatePresence initial={false}>
                            {mobileServicesOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden pl-4 pr-1 space-y-1"
                              >
                                {SERVICE_DETAIL_LINKS.map((srv) => {
                                  const SrvIcon = srv.icon;
                                  return (
                                    <button
                                      key={srv.id}
                                      onClick={() => {
                                        setCurrentPage(srv.id);
                                        setMobileMenuOpen(false);
                                      }}
                                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${
                                        currentPage === srv.id
                                          ? 'bg-accent/15 text-accent font-semibold'
                                          : 'text-text-secondary hover:text-text-primary hover:bg-white/40 dark:hover:bg-white/10'
                                      }`}
                                    >
                                      <SrvIcon size={14} className="text-accent shrink-0" />
                                      <span className="truncate">{srv.title}</span>
                                    </button>
                                  );
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setCurrentPage(item.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`flex items-center justify-between px-4 py-3 rounded-2xl font-semibold text-left transition-all cursor-pointer ${
                          isItemActive
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
                    );
                  })}
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
