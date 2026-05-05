import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Menu, X, Home, Info, Cpu, Star, Mail, Sun, Moon } from 'lucide-react';
import logo from '@/src/assets/images/automation.png';

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

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
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
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10 h-10 lg:h-12">
        <div /> {/* Spacer for centering when logo is gone */}

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1.5 lg:gap-3 p-1.5 rounded-full absolute left-1/2 -translate-x-1/2 bg-black/20 backdrop-blur-md border border-white/10 shadow-lg transition-all duration-500">
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
                  className={`relative flex items-center justify-center font-mono text-xs lg:text-sm tracking-wide transition-all z-10 rounded-full h-8 lg:h-10 ${isActive ? 'text-white' : 'text-brand-dark/70 hover:text-brand-dark'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="liquid-nav-pill"
                      className="absolute inset-0 bg-brand-accent rounded-full -z-10"
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
                className="bg-brand-card px-2 py-1 lg:py-2 rounded-full font-mono hover:bg-brand-accent/10 transition-all shadow-md active:scale-95 h-8 lg:h-10 flex items-center justify-center border border-brand-dark/5"
              >
                <img src={logo} alt="logo" className="h-5 w-5 lg:h-6 lg:w-6 object-contain" />
              </button>
              <button
                 onClick={toggleTheme}
                 className="ml-[25px] bg-brand-dark/10 hover:bg-brand-dark/20 p-2 rounded-full text-brand-dark transition-all active:scale-90 h-8 lg:h-10 w-8 lg:w-10 flex items-center justify-center"
                 aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              </button>
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
                  className={`relative flex items-center justify-center font-mono text-xs lg:text-sm tracking-wide transition-all z-10 rounded-full h-8 lg:h-10 ${isActive ? 'text-white' : 'text-brand-dark/70 hover:text-brand-dark'}`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="liquid-nav-pill"
                      className="absolute inset-0 bg-brand-accent rounded-full -z-10"
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
          </LayoutGroup>
        </div>

        {/* Mobile Toggle */}
        <button className="lg:hidden text-brand-dark" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 right-0 bg-brand-bg/95 backdrop-blur-xl border-b border-brand-dark/10 overflow-hidden lg:hidden shadow-xl"
          >
            <div className="p-6 flex flex-col gap-4">
              <motion.div
                variants={{
                  open: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
                  closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                }}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex flex-col gap-4"
              >
                {navItems.map((item) => (
                  <motion.div key={item.id} variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -20 } }} transition={{ duration: 0.2 }}>
                    <button
                      onClick={() => {
                        setCurrentPage(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`font-mono text-lg text-left w-full flex items-center gap-3 transition-all duration-200 hover:scale-105 origin-left hover:text-brand-accent ${currentPage === item.id ? 'text-brand-accent' : 'text-brand-dark'}`}
                    >
                      <item.icon size={20} />
                      {item.name}
                    </button>
                  </motion.div>
                ))}
                <motion.div variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -20 } }} transition={{ duration: 0.2 }}>
                  <button 
                    onClick={() => {
                      setCurrentPage('home');
                      setMobileMenuOpen(false);
                    }}
                    className="mt-4 bg-brand-accent text-white px-6 py-3 rounded-full flex justify-center w-full shadow-md"
                  >
                    <img src={logo} alt="logo" className="h-6 w-6 object-contain" />
                  </button>
                </motion.div>
                <motion.div variants={{ open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -20 } }} transition={{ duration: 0.2 }}>
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-between w-full p-4 rounded-2xl bg-brand-dark/5 text-brand-dark font-mono"
                  >
                    <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                    {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
                  </button>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
