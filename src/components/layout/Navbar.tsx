import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'motion/react';
import { Menu, X, Home, Info, Cpu, Star, Mail, Sun, Moon, User } from 'lucide-react';
import logo from '@/src/assets/images/logo.png';

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

  const [scrollProgress, setScrollProgress] = useState(0);

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
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10 h-10 lg:h-12">
        {/* Mobile Logo */}
        <div className="block lg:hidden">
          <img src={logo} alt="logo" className="h-10 w-auto object-contain dark:invert" />
        </div>
        <div className="hidden lg:block w-10" />

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
                <img src={logo} alt="logo" referrerPolicy="no-referrer" className="h-5 w-5 lg:h-6 lg:w-6 object-contain" />
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

        {/* Mobile Toggle Pill */}
        <div className={`lg:hidden flex items-center bg-brand-dark text-brand-bg rounded-full p-1.5 gap-1.5 transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
           <button className="flex items-center gap-2 pl-3 pr-4 py-2 rounded-full hover:bg-brand-bg/10 transition-colors" onClick={() => setMobileMenuOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 9h16M4 15h16" /></svg>
              <span className="text-base font-medium">Menu</span>
           </button>
           
           <button onClick={toggleTheme} className="w-10 h-10 shrink-0 bg-brand-bg/10 rounded-full flex items-center justify-center border border-brand-bg/10 hover:bg-brand-bg/20 transition-colors">
              {theme === 'light' ? <Moon size={18} strokeWidth={1.5} /> : <Sun size={18} strokeWidth={1.5} />}
           </button>
           
           <div className="h-10 px-4 shrink-0 bg-brand-bg/10 rounded-full flex items-center justify-center text-sm font-medium text-brand-bg/90">
              {scrollProgress}%
           </div>
        </div>
      </div>

      {/* Mobile Menu Modal */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex justify-end lg:hidden"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-transparent" onClick={() => setMobileMenuOpen(false)} />
            
            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-[220px] max-w-[85vw] h-[calc(100vh-2rem)] my-4 mr-4 bg-brand-bg rounded-[32px] overflow-hidden flex flex-col shadow-2xl text-[25px] font-[Arial] font-bold leading-[22px]"
            >
              <div className="p-4 flex flex-col h-full">
                {/* Header Pill */}
                <div className="flex items-center justify-between bg-brand-dark text-brand-bg rounded-[28px] p-1.5 mb-6 shadow-sm">
                   <button className="flex items-center gap-1.5 pl-3 pr-3 py-2 rounded-full hover:bg-brand-bg/10 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <X size={16} strokeWidth={1.5} />
                      <span className="text-sm font-medium">Close</span>
                   </button>
                   
                   <div className="flex items-center gap-1">
                     <button onClick={toggleTheme} className="w-8 h-8 shrink-0 bg-brand-bg/10 rounded-full flex items-center justify-center border border-brand-bg/10 hover:bg-brand-bg/20 transition-colors">
                        {theme === 'light' ? <Moon size={16} strokeWidth={1.5} /> : <Sun size={16} strokeWidth={1.5} />}
                     </button>
                   </div>
                </div>

                {/* Links Content */}
                <div className="flex-1 overflow-y-auto w-full max-w-full">
                   <div className="text-[12px] text-brand-dark/50 mb-3 font-medium uppercase tracking-wider">Menu</div>
                   <div className="flex flex-col gap-3 mb-6">
                       {navItems.map(item => (
                           <button 
                             key={item.id} 
                             onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); }} 
                             className="text-[25px] font-[Arial] font-bold leading-[22px] text-left text-brand-dark hover:opacity-70 transition-opacity"
                           >
                               {item.name}
                           </button>
                       ))}
                   </div>

                   <hr className="border-brand-dark/10 my-6" />

                   <div className="text-[12px] text-brand-dark/50 mb-3 font-medium uppercase tracking-wider">Other</div>
                   <div className="flex flex-col gap-3 mb-6">
                       <button className="text-[14px] font-medium text-left text-brand-dark hover:opacity-70 transition-opacity">Privacy Policy</button>
                       <button className="text-[14px] font-medium text-left text-brand-dark hover:opacity-70 transition-opacity">Terms of Service</button>
                       <button className="text-[14px] font-medium text-left text-brand-dark hover:opacity-70 transition-opacity">Cookie Policy</button>
                   </div>

                   <div className="text-[12px] text-brand-dark/50 mb-3 font-medium uppercase tracking-wider">Social media</div>
                   <div className="flex flex-col gap-3 mb-4">
                       <button className="text-[14px] font-medium text-left text-brand-dark hover:opacity-70 transition-opacity">Instagram</button>
                   </div>
                </div>

                {/* Footer Buttons */}
                <div className="mt-auto pt-4 flex gap-2">
                    <button className="flex-1 bg-brand-dark text-brand-bg rounded-full py-3 text-sm font-medium hover:bg-brand-dark/80 transition-colors shadow-sm">
                        Get started
                    </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
