/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform, useScroll, useInView, LayoutGroup } from 'motion/react';
import { 
  Menu, X, Cpu, Globe, Zap, FileText, Map as MapIcon, 
  PenTool, ArrowRight, Linkedin, Twitter, Github, 
  Mail, Phone, MapPin, Search, Filter, Star, Info, ArrowUp, Home
} from 'lucide-react';

import logo from './assets/images/automation.png';

import newImage1778001962382 from './assets/images/regenerated_image_1778001962382.jpg';
import newImage1778002234657 from './assets/images/regenerated_image_1778002234657.jpg';
import newImage1778002658766 from './assets/images/regenerated_image_1778002658766.jpg';
import newImage1778003940043 from './assets/images/regenerated_image_1778003940043.jpg';
import newImage1778003942890 from './assets/images/regenerated_image_1778003942890.jpg';
import newImage1778003945349 from './assets/images/regenerated_image_1778003945349.jpg';
import fallbackLogo from './assets/images/logo.png';

import { ServicesList } from './components/ServicesList';
import { FeatureFlipper } from './components/FeatureFlipper';
import { ServiceDetail } from './components/ServiceDetail';

const MagneticGlowButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}> = ({ children, className = '', onClick, type = 'button', disabled = false }) => {
  const boundingRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!boundingRef.current || !glowRef.current || disabled) return;
    const { left, top, width, height } = boundingRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    // Magnetic pull calculation
    const centerX = width / 2;
    const centerY = height / 2;
    const maxPull = 15;
    
    const pullX = ((x - centerX) / centerX) * maxPull;
    const pullY = ((y - centerY) / centerY) * maxPull;

    setPosition({ x: pullX, y: pullY });
    setOpacity(1);
    
    // Glow effect
    glowRef.current.style.setProperty('--x', `${x}px`);
    glowRef.current.style.setProperty('--y', `${y}px`);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <motion.button
      ref={boundingRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden group ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div 
        ref={glowRef}
        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
        style={{
          background: `radial-gradient(120px circle at var(--x) var(--y), rgba(255,255,255,0.4), transparent 40%)`
        }}
      />
      <span className="relative z-10 flex items-center justify-center pointer-events-none">{children}</span>
    </motion.button>
  );
};

// --- Core Components ---
const CircleCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full border border-brand-accent pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovering ? 48 : 32,
        height: isHovering ? 48 : 32,
        backgroundColor: isHovering ? "white" : "transparent"
      }}
      transition={{
        width: { type: "spring", stiffness: 300, damping: 20 },
        height: { type: "spring", stiffness: 300, damping: 20 },
        backgroundColor: { duration: 0.2 }
      }}
    />
  );
};

const Logo = () => (
  <div className="flex items-center gap-2">
    <img src={logo} alt="logo" className="h-[36px] w-[36px] lg:h-[50px] lg:w-[50px] object-contain" />
    <span className="font-mono text-base md:text-sm lg:text-xl font-bold tracking-tight text-brand-dark hidden sm:block">
      ReliabilityIQ Ventures
    </span>
  </div>
);

const SocialLink = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => (
  <div className="relative group">
    <a href={href} className="hover:text-brand-accent transition-colors block">
      <Icon size={20} />
    </a>
    <motion.div
      initial={{ opacity: 0, y: 10, x: '-50%' }}
      whileHover={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-brand-accent text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded pointer-events-none opacity-0 group-hover:opacity-100 whitespace-nowrap z-20"
    >
      {label}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-brand-accent"></div>
    </motion.div>
  </div>
);

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (p: string) => void }) => {
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
    <nav className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md ${isScrolled ? 'bg-black/10 py-3 shadow-sm border-b border-brand-dark/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10">
        <button onClick={() => setCurrentPage('home')} className="cursor-pointer">
          <Logo />
        </button>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1 lg:gap-2 bg-brand-dark/5 p-1 lg:p-1.5 rounded-full relative">
          <LayoutGroup>
            {navItems.map((item) => {
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
          <div className="ml-2 lg:ml-4 mr-1">
            <button 
              onClick={() => setCurrentPage('home')}
              className="bg-white px-2 py-1 lg:py-2 rounded-full font-mono hover:bg-gray-100 transition-all shadow-md active:scale-95 h-8 lg:h-10 flex items-center justify-center"
            >
              <img src={logo} alt="logo" className="h-5 w-5 lg:h-6 lg:w-6 object-contain" />
            </button>
          </div>
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
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-brand-dark text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-6 text-white font-mono">
            <img src={logo} alt="logo" className="h-[50px] w-[50px] object-contain brightness-0 invert" />
            <span className="text-xl font-bold tracking-tight">
              ReliabilityIQ
            </span>
          </div>
          <p className="text-brand-bg/60 font-mono text-sm leading-relaxed mb-8 max-w-xs">
            Optimizing digital infrastructure from Lagos to the world. We build resilient systems for the modern global enterprise.
          </p>
          <div className="flex gap-4">
            <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
            <SocialLink href="#" icon={Twitter} label="Twitter" />
            <SocialLink href="#" icon={Github} label="Github" />
          </div>
        </div>

        <div>
          <h4 className="font-mono text-sm uppercase tracking-widest text-brand-accent-light mb-6">Services</h4>
          <ul className="flex flex-col gap-4 font-mono text-sm text-brand-bg/70">
            <li><a href="#" className="hover:text-white transition-colors">Web Operations</a></li>
            <li><a href="#" className="hover:text-white transition-colors">AI Automations</a></li>
            <li><a href="#" className="hover:text-white transition-colors">GIS Mapping</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Technical Reports</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Content & Design</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-sm uppercase tracking-widest text-brand-accent-light mb-6">Company</h4>
          <ul className="flex flex-col gap-4 font-mono text-sm text-brand-bg/70">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Leadership Team</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-sm uppercase tracking-widest text-brand-accent-light mb-6">System Status</h4>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-xs">
            <div className="flex items-center justify-between mb-3">
              <span>Global API</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Cloud Nodes</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-bg/40 font-mono text-[10px] uppercase tracking-widest">
        <p>© 2026 ReliabilityIQ Ventures. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Security</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Shared Components ---
interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: any;
  longDescription: string;
  useCases: string[];
  caseStudy: {
    title: string;
    result: string;
  };
}

const ServiceDetailModal = ({ 
  service, 
  isOpen, 
  onClose,
  onContact
}: { 
  service: ServiceDetail | null, 
  isOpen: boolean, 
  onClose: () => void,
  onContact: () => void
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, service]);

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-md"
          />
          <motion.div
            layoutId={`service-card-${service.id}`}
            className="bg-white w-full max-w-4xl h-full max-h-[800px] rounded-[40px] overflow-hidden relative z-10 flex flex-col shadow-2xl"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 md:top-8 md:right-8 z-20 p-3 md:p-4 bg-brand-bg rounded-full hover:bg-brand-accent hover:text-white transition-all shadow-lg"
            >
              <X size={24} />
            </button>

            <div className="flex-grow overflow-y-auto custom-scrollbar">
              <div className="p-6 md:p-16">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                  <div className="md:w-1/3 flex flex-col gap-8">
                    <div className="p-6 bg-brand-accent/10 rounded-3xl text-brand-accent w-fit inline-block">
                      <service.icon size={48} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-mono tracking-tighter leading-tight text-brand-dark">
                      {service.title}
                    </h2>
                    <div className="h-1 w-20 bg-brand-accent"></div>
                    <p className="text-brand-dark/60 font-mono text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="md:w-2/3 space-y-12">
                    {loading ? (
                      <>
                        <div className="space-y-4 animate-pulse">
                          <div className="h-3 w-24 bg-brand-dark/10 rounded-full"></div>
                          <div className="h-4 w-full bg-brand-dark/5 rounded-lg"></div>
                          <div className="h-4 w-full bg-brand-dark/5 rounded-lg"></div>
                          <div className="h-4 w-3/4 bg-brand-dark/5 rounded-lg"></div>
                        </div>

                        <div className="space-y-4 animate-pulse pt-4">
                          <div className="h-3 w-32 bg-brand-dark/10 rounded-full"></div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="h-10 bg-brand-dark/5 rounded-xl"></div>
                            <div className="h-10 bg-brand-dark/5 rounded-xl"></div>
                            <div className="h-10 bg-brand-dark/5 rounded-xl"></div>
                            <div className="h-10 bg-brand-dark/5 rounded-xl"></div>
                          </div>
                        </div>

                        <div className="space-y-4 animate-pulse pt-4 border-l-4 border-brand-accent/20 pl-8">
                          <div className="h-3 w-40 bg-brand-dark/10 rounded-full"></div>
                          <div className="h-6 w-full bg-brand-dark/5 rounded-lg"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <motion.section
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-brand-accent mb-6 font-bold">Deep Dive</h4>
                          <p className="text-lg text-brand-dark/80 leading-relaxed font-sans">
                            {service.longDescription}
                          </p>
                        </motion.section>

                        <motion.section 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="bg-brand-bg/50 p-8 rounded-3xl border border-brand-dark/5"
                        >
                          <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-brand-accent mb-6 font-bold">Primary Use-Cases</h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {service.useCases.map((useCase, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm font-mono text-brand-dark/70">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-brand-accent shrink-0"></span>
                                {useCase}
                              </li>
                            ))}
                          </ul>
                        </motion.section>

                        <motion.section 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="border-l-4 border-brand-accent pl-8"
                        >
                          <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-brand-accent mb-4 font-bold">Case Study: {service.caseStudy.title}</h4>
                          <p className="text-xl font-medium text-brand-dark italic mb-4">
                            "{service.caseStudy.result}"
                          </p>
                        </motion.section>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-brand-bg border-t border-brand-dark/5 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-[10px] font-mono text-brand-dark/40 uppercase tracking-widest text-center sm:text-left">ReliabilityIQ Ventures – Specialized Services</span>
              <button 
                onClick={() => {
                  onClose();
                  onContact();
                }}
                className="bg-brand-dark text-white px-8 py-4 rounded-full font-mono text-sm font-bold hover:bg-brand-accent transition-all shadow-xl w-full sm:w-auto"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const TextEngine = ({ text, className }: { text: string, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");
  
  return (
    <h3 ref={ref} className={className} style={{ perspective: "1000px" }}>
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap overflow-hidden py-4 -my-4 mr-[0.2em] last:mr-0">
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              initial={{ y: "110%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: (i * 0.1) + (j * 0.02),
                ease: [0.33, 1, 0.68, 1]
              }}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h3>
  );
};

const TextScroll = ({ text, className }: { text: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scrollYProgress = useSpring(rawScrollYProgress, {
    stiffness: 300, 
    damping: 60,
    restDelta: 0.001
  });

  const words = text.split(" ");
  
  return (
    <h2 ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        return (
          <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </ScrollWord>
        );
      })}
    </h2>
  );
};

const ScrollWord = ({ children, progress, range }: { children: string, progress: any, range: [number, number], key?: any }) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const y = useTransform(progress, range, [10, 0]);
  
  return (
    <span className="inline-block mr-[0.25em] last:mr-0 relative">
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
};

const SmartTypewriter = ({ texts, className }: { texts: string[], className?: string }) => {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = texts[textIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        if (charIndex < fullText.length) {
          setCurrentText(fullText.substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        } else {
          // Pause at the end before deleting
          setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        if (charIndex > 0) {
          setCurrentText(fullText.substring(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setTextIndex(prev => (prev + 1) % texts.length);
        }
      }
    };

    const typingSpeed = isDeleting ? 15 : 30;
    const timeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <div className={className}>
      <span className="relative">
        {currentText}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-[2px] h-[1.1em] bg-brand-accent ml-1 align-middle"
        />
      </span>
    </div>
  );
};

const ScramblyText = ({ texts, className }: { texts: string[], className?: string }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(texts[0]);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const triggerScramble = () => {
      const nextIndex = (index + 1) % texts.length;
      const targetText = texts[nextIndex];
      let step = 0;
      const totalSteps = 40;

      const animate = () => {
        if (step <= totalSteps) {
          const progress = step / totalSteps;
          const decodedCount = Math.floor(progress * targetText.length);
          
          const scrambled = targetText
            .split("")
            .map((char, i) => {
              if (i < decodedCount) return char;
              if (char === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
          
          setDisplayText(scrambled);
          step++;
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayText(targetText);
          setIndex(nextIndex);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    };

    const timeout = setTimeout(triggerScramble, 4000);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [index, texts]);

  return (
    <div className="min-h-[120px] md:min-h-[160px] lg:min-h-[220px] mb-4 md:mb-6 flex items-center">
      <h1 className={`${className} font-mono tracking-tighter uppercase leading-[1.05] md:leading-[0.95]`}>
        {displayText}
      </h1>
    </div>
  );
};

const PixelSnow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      const particleCount = Math.floor((canvas.width * canvas.height) / 5000); // More particles
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.floor(Math.random() * 3) + 1, // Slightly larger
        speed: Math.random() * 0.8 + 0.3,
        opacity: Math.random() * 0.6 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#0D838E'; // Use brand-accent color for better visibility

      particles.forEach((p) => {
        ctx.globalAlpha = p.opacity;
        // Draw squares instead of blurred points for 'pixel' look
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
        
        p.y += p.speed;
        if (p.y > canvas.height) {
          p.y = -p.size;
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize);
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-80 z-0" />;
};

const RealTimeCursors = () => {
  const [others, setOthers] = useState<any[]>([]);

  useEffect(() => {
    const cursorNames = ['SRE_Lead', 'DevOps_Pro', 'Sys_Architect', 'Operations_AI', 'Infrastructure_Lead'];
    // Brand colors with lower alpha for blending
    const colors = [
      'rgba(13, 131, 142, 0.6)', 
      'rgba(245, 158, 11, 0.6)', 
      'rgba(16, 185, 129, 0.6)', 
      'rgba(99, 102, 241, 0.6)',
      'rgba(236, 72, 153, 0.6)'
    ];
    
    // Key target zones in the hero section (percentage based)
    const targets = [
      { x: 15, y: 15 }, // Menu area
      { x: 25, y: 30 }, // Title text
      { x: 20, y: 70 }, // Buttons area
      { x: 75, y: 50 }, // Main image/card
      { x: 80, y: 20 }, // Top right
    ];

    const initialOthers = Array.from({ length: 5 }, (_, i) => {
      const isHeroSticky = i === 4; // Fifth cursor is sticky
      return {
        id: i,
        name: cursorNames[i],
        color: colors[i],
        x: isHeroSticky ? 75 : Math.random() * 100,
        y: isHeroSticky ? 50 : Math.random() * 100,
        targetX: isHeroSticky ? 75 : targets[Math.floor(Math.random() * targets.length)].x,
        targetY: isHeroSticky ? 50 : targets[Math.floor(Math.random() * targets.length)].y,
        speed: 0.02 + Math.random() * 0.05,
        isHeroSticky,
        pulseCounter: 0
      };
    });
    
    setOthers(initialOthers);

    const interval = setInterval(() => {
      setOthers(prev => prev.map(cursor => {
        const dx = cursor.targetX - cursor.x;
        const dy = cursor.targetY - cursor.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        let nx = cursor.x;
        let ny = cursor.y;
        let tx = cursor.targetX;
        let ty = cursor.targetY;
        let pulse = cursor.pulseCounter;

        if (dist < 2) {
          pulse++;
          // Choose a new logical target
          if (cursor.isHeroSticky) {
            // Stay specifically around the hero image area (Target 3)
            const heroTarget = targets[3];
            tx = heroTarget.x + (Math.random() * 15 - 7.5);
            ty = heroTarget.y + (Math.random() * 15 - 7.5);
          } else {
            const nextTarget = targets[Math.floor(Math.random() * targets.length)];
            tx = nextTarget.x + (Math.random() * 10 - 5);
            ty = nextTarget.y + (Math.random() * 10 - 5);
          }
        } else {
          nx += dx * cursor.speed;
          ny += dy * cursor.speed;
        }

        return { ...cursor, x: nx, y: ny, targetX: tx, targetY: ty, pulseCounter: pulse };
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {others.map((cursor) => (
        <motion.div
          key={cursor.id}
          className="absolute"
          animate={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
          transition={{ type: "spring", damping: 30, stiffness: 80 }}
          style={{ x: '-50%', y: '-50%' }}
        >
          <motion.div
            key={cursor.pulseCounter}
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex items-center gap-1"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              <path
                d="M3 3L11.5 21L14.5 14L21.5 11L3 3Z"
                fill={cursor.color}
                stroke="rgba(0, 0, 0, 0.4)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <div 
              className="px-3 py-1 rounded-full text-[11px] font-mono font-bold text-black shadow-xl backdrop-blur-md border border-black/10"
              style={{ 
                backgroundColor: cursor.color.replace('0.6', '0.15'), 
                boxShadow: `0 0 15px ${cursor.color}` 
              }}
            >
              {cursor.name}
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const FlipCard = ({ frontContent, backContent, className }: { frontContent: React.ReactNode, backContent: React.ReactNode, className?: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`relative perspective-1000 cursor-pointer ${className || ''}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="absolute inset-0 backface-hidden">
          {frontContent}
        </div>
        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)]">
          {backContent}
        </div>
      </motion.div>
    </div>
  );
};

// --- Page Content Components ---

const TiltCard = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...style
      }}
      className="relative w-full h-full"
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d", width: '100%', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
};

const HeroSection = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  return (
  <section className="pt-16 pb-20 md:pt-24 md:pb-32 px-6 relative overflow-hidden">
    <RealTimeCursors />
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-16 gap-10 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 rounded-full text-brand-accent font-mono text-xs mb-6">
          <span className="w-1.5 h-1.5 bg-brand-accent rounded-full"></span>
          Lagos to London — IT Infrastructure for Global Scale
        </div>
        <ScramblyText 
          texts={[
            "Optimizing African Tech Giants.",
            "Scaling Global Digital Infrastructure.",
            "Powering Next-Gen Web Operations."
          ]}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-dark"
        />
        <SmartTypewriter 
          texts={[
            "ReliabilityIQ Ventures delivers global-standard web operations, AI automations, and strategic digital infrastructure for ambitious firms in Nigeria and beyond.",
            "Building resilient systems for the modern global enterprise, from Lagos-edge networks to London cloud infrastructures.",
            "Specialized engineering that bridges Nigerian technical ingenuity with international execution standards since 2026."
          ]}
          className="text-lg md:text-xl text-brand-dark mb-10 max-w-md leading-relaxed font-mono min-h-[140px] md:min-h-[120px]"
        />
        <div className="flex flex-wrap gap-4 font-mono">
          <button 
            onClick={() => onNavigate('services')}
            className="bg-brand-accent text-white px-8 py-3 rounded-full hover:bg-brand-accent-light transition-all shadow-lg hover:shadow-brand-accent/20"
          >
            Learn More
          </button>
          <button 
            onClick={() => onNavigate('about')}
            className="border-2 border-brand-accent/20 px-8 py-3 rounded-full hover:bg-brand-accent/5 transition-all text-brand-dark"
          >
            Our Story
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-square md:aspect-auto md:h-[600px]">
          <TiltCard style={{ width: '100%', height: '100%' }}>
            <img 
              src={newImage1778001962382} 
              alt="Team working" 
              className="w-full h-full object-cover rounded-3xl"
              referrerPolicy="no-referrer"
            />
          </TiltCard>
          {/* Glass Overlays */}
          <div className="absolute inset-0 m-auto md:inset-auto md:m-0 md:top-12 md:right-12 h-fit glass p-6 rounded-2xl w-[80%] max-w-[240px] md:w-48 md:max-w-none md:animate-bounce-slow mobile-swipe-1">
             <div className="flex items-center gap-2 text-brand-accent mb-2">
                <Cpu size={16} />
                <span className="font-mono text-[10px] uppercase tracking-tighter">AI Automations</span>
             </div>
             <div className="text-3xl font-bold font-mono">500+</div>
             <div className="text-[10px] text-white/60 font-mono">Deployed globally</div>
          </div>

          <div className="absolute inset-0 m-auto md:inset-auto md:m-0 md:bottom-12 md:left-12 h-fit glass p-8 rounded-2xl w-[85%] max-w-[280px] md:w-64 md:max-w-none lg:animate-none mobile-swipe-2">
             <div className="flex items-center gap-2 text-brand-accent mb-4">
                <Zap size={18} />
                <span className="font-mono text-xs uppercase tracking-tighter">System Uptime</span>
             </div>
             <div className="text-4xl font-bold font-mono flex items-end gap-1">
               99.99<span className="text-lg opacity-60">%</span>
             </div>
             <div className="text-xs text-brand-accent font-mono mt-2 flex items-center gap-1">
               <ArrowRight size={12} className="-rotate-45" /> +0.01% this quarter
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

const MissionSection = () => (
  <section className="bg-brand-dark text-white py-32 px-6 relative overflow-hidden">
    {/* Grid Pattern */}
    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
    
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className="flex justify-center mb-8">
        <span className="text-6xl font-mono opacity-20">“</span>
      </div>
      <TextScroll 
        text="ReliabilityIQ bridges Nigerian technical ingenuity with international execution standards to engineer flawless digital ecosystems for the world's next industry leaders."
        className="text-3xl md:text-5xl font-bold font-mono leading-tight mb-16 tracking-tight text-center"
      />
      
      <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24">
        <div className="text-center group">
          <div className="text-brand-accent text-4xl md:text-5xl font-mono font-bold mb-2 group-hover:scale-110 transition-transform">10+</div>
          <div className="text-xs font-mono tracking-widest text-brand-bg/40 uppercase">Years Exp</div>
        </div>
        <div className="text-center group">
          <div className="text-brand-accent text-4xl md:text-5xl font-mono font-bold mb-2 group-hover:scale-110 transition-transform">250+</div>
          <div className="text-xs font-mono tracking-widest text-brand-bg/40 uppercase">Projects</div>
        </div>
        <div className="text-center group">
          <div className="text-brand-accent text-4xl md:text-5xl font-mono font-bold mb-2 group-hover:scale-110 transition-transform">50m</div>
          <div className="text-xs font-mono tracking-widest text-brand-bg/40 uppercase">Data Points</div>
        </div>
      </div>
    </div>
  </section>
);

interface StackCardProps {
  i: number;
  title: string;
  description: string;
  icon: any;
  progress: any;
  range: number[];
  onAction: () => void;
}

const StackCard: React.FC<StackCardProps> = ({ i, title, description, icon: Icon, progress, range, onAction }) => {
  const scale = useTransform(progress, range, [1, 0.9 + (i * 0.02)]);
  const opacity = useTransform(progress, range, [1, 0.3 + (i * 0.1)]);
  
  return (
    <div className="h-screen sticky top-0 flex items-center justify-center py-16">
       <motion.div 
         whileHover={{ 
           scale: 1.025,
           boxShadow: "0 60px 120px -30px rgba(13, 131, 142, 0.25), 0 0 50px rgba(13, 131, 142, 0.2)",
           borderColor: "rgba(13, 131, 142, 0.5)",
           y: -8
         }}
         transition={{ type: "spring", stiffness: 400, damping: 25 }}
         style={{ 
           scale, 
           opacity,
           transformOrigin: "center center"
         }}
         className="bg-white rounded-[30px] md:rounded-[40px] p-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-brand-dark/5 flex flex-col md:flex-row gap-6 w-full max-w-4xl h-auto min-h-[280px] md:h-[350px] relative overflow-hidden group transition-all duration-500"
       >
         <div className="md:w-1/2 flex flex-col justify-center h-full z-10 w-full">
            <div className="p-3 bg-brand-accent/10 rounded-2xl text-brand-accent w-fit mb-4 md:mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all duration-500">
              <Icon size={24} className="md:w-6 md:h-6" />
            </div>
            <TextEngine text={title} className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 font-mono tracking-tighter text-brand-dark leading-none" />
            <p className="text-brand-dark/60 font-mono text-xs leading-relaxed mb-6 md:mb-8 max-w-sm">
              {description}
            </p>
            <button 
              onClick={onAction}
              className="group/btn flex items-center gap-2 text-brand-accent font-mono text-xs md:text-sm font-bold w-fit bg-brand-bg px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-brand-accent hover:text-white transition-all duration-300"
            >
              Learn More <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
            </button>
         </div>
         
         <div className="md:w-1/2 relative hidden md:block overflow-hidden rounded-3xl">
            <div className="absolute inset-0 bg-brand-bg">
               <img 
                 src={i === 0 ? newImage1778002234657 : i === 2 ? newImage1778002658766 : i === 3 ? newImage1778003940043 : i === 4 ? newImage1778003942890 : fallbackLogo}
                 className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700"
                 alt={title}
                 referrerPolicy="no-referrer"
               />
               <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay group-hover:opacity-0 transition-opacity"></div>
            </div>
            <div className="absolute bottom-8 right-8">
               <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                  <span className="font-mono text-xs font-bold">0{i + 1}</span>
               </div>
            </div>
         </div>

         {/* Fluid mesh background decorative element */}
         <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-accent/10 transition-colors"></div>
       </motion.div>
    </div>
  )
}

const CompetenciesSection = ({ onContact }: { onContact: () => void }) => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const servicesData: ServiceDetail[] = [
    {
      id: "web-ops",
      title: "Web Operations",
      icon: Globe,
      description: "Website development, CMS, detect bugs, and cloud services.",
      longDescription: "Our performance-driven web operations unit specializes in end-to-end website development, seamless CMS integration, proactive bug detection, and enterprise-grade cloud services architecture. We ensure your digital systems are always optimized, secure, and ready to scale.",
      useCases: ["Website Development", "CMS Implementation", "Proactive Bug Detection", "Cloud Services Orchestration"],
      caseStudy: {
        title: "Global E-commerce Expansion",
        result: "Implemented a unified CMS and cloud strategy that reduced deployment times by 70% and eliminated critical runtime bugs."
      }
    },
    {
      id: "ai-auto",
      title: "AI Automations",
      icon: Cpu,
      description: "Intelligent workflow automations and ML models designed to optimize Nigerian supply chains and international business processes.",
      longDescription: "We build intelligent systems that bridge the gap between human effort and machine precision. Our AI solutions are tailored to solve specific regional bottlenecks—such as supply chain optimization in emerging markets—while applying international standards of data processing and predictive analytics to drive global competitiveness.",
      useCases: ["Supply Chain Route Optimization", "Automated Compliance Auditing", "Smart Customer Retention Bots", "Predictive Inventory for Retailers"],
      caseStudy: {
        title: "Nigerian Distribution Giant",
        result: "Deployed an AI-driven route optimization engine that cut fuel costs by 25% and improved delivery accuracy by 40%."
      }
    },
    {
      id: "gis",
      title: "GIS Mapping",
      icon: MapIcon,
      description: "Advanced spatial intelligence for African logistics, urban planning, and international resource management.",
      longDescription: "Geospatial data is the backbone of modern logistics. Our GIS team provides deep insights into the African landscape, from mapping informal urban sectors to planning large-scale agricultural expansions. We combine global satellite imagery with local ground-truth data to provide a comprehensive view for international investors and regional planners alike.",
      useCases: ["Logistics Fleet Tracking", "Agricultural Land Use Analysis", "Real Estate Demand Heatmaps", "Infrastructure Pipeline Planning"],
      caseStudy: {
        title: "Federal Infrastructure Project",
        result: "Mapped 500km of proposed utility corridors using LiDAR data, identifying optimal routes and saving $1.2M in potential land disputes."
      }
    },
    {
      id: "tech-reports",
      title: "Technical Reports",
      icon: FileText,
      description: "Professional technical documentation meeting international ISO standards and local regulatory requirements.",
      longDescription: "Precision in documentation is non-negotiable for international growth. We produce investor-ready technical reports, SOC2/ISO audit preparations, and feasibility studies that bridge the gap between Nigerian technical operations and international boardrooms. Our reports provide the clarity required for high-stakes funding and complex regulatory approvals.",
      useCases: ["ISO/SOC2 Audit Readiness", "Venture Capital Due Diligence", "System Architecture Audits", "Environmental Impact Studies"],
      caseStudy: {
        title: "Tech Unicorn Series C Round",
        result: "Authored comprehensive technical architecture documentation that passed a Tier-1 international VC due diligence with zero findings."
      }
    },
    {
      id: "design-studio",
      title: "Content Studio",
      icon: PenTool,
      description: "Global brand storytelling and UX/UI design that resonates with Nigerian audiences and international consumers.",
      longDescription: "We blend engineering precision with creative flair. Our Content Studio creates digital experiences that honor Nigerian cultural nuances while adhering to the highest global standards of UI/UX design. We use AI-assisted tools to scale content production, ensuring your brand story is consistent and compelling across every global touchpoint.",
      useCases: ["International Brand Identity", "Conversion-Optimized UI/UX", "Multi-Language Content Strategy", "AI-Generated Digital Marketing"],
      caseStudy: {
        title: "Premium West African Lifestyle Brand",
        result: "Complete digital rebranding and UX overhaul resulting in a 50% increase in international orders within the first quarter."
      }
    }
  ];

  return (
    <section ref={containerRef} className="relative mt-20">
      <div className="max-w-7xl mx-auto px-6 mb-12 pointer-events-none text-center flex flex-col items-center">
         <div className="font-mono text-xs uppercase tracking-widest text-brand-accent mb-4">Regional & International Expertise</div>
         <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-dark leading-[0.9] tracking-tighter mix-blend-multiply">African Engineering.<br />Global Standards.</h2>
      </div>

      <div className="px-6">
        {servicesData.map((service, i) => (
          <StackCard 
            key={service.id} 
            i={i} 
            title={service.title}
            description={service.description}
            icon={service.icon}
            progress={scrollYProgress} 
            range={[i * 0.2, 1]} 
            onAction={() => setSelectedService(service)}
          />
        ))}
      </div>

      <ServiceDetailModal 
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onContact={onContact}
      />
    </section>
  );
};

const NarrativeSection = () => (
  <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-brand-bg z-20">
    <PixelSnow />
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-20 gap-12 items-center relative z-10">
      <div className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-[4/5] group">
        <FlipCard
          className="w-full h-full absolute inset-0"
          frontContent={
            <img 
              src={newImage1778003945349} 
              alt="Office work" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          }
          backContent={
             <div className="w-full h-full bg-brand-dark flex flex-col items-center justify-center p-8 text-center text-white">
                <Star size={32} className="text-brand-accent mb-4" />
                <h3 className="text-xl font-mono font-bold mb-3">Our Core Philosophy</h3>
                <p className="text-white/80 font-mono text-xs leading-relaxed max-w-[200px] mb-16">Building systems that simply perform, without compromise.</p>
             </div>
          }
        />
        <div className="absolute bottom-10 left-10 p-10 glass rounded-3xl max-w-xs pointer-events-none transition-opacity duration-300 group-hover:opacity-0">
          <h4 className="text-brand-accent font-mono text-2xl font-bold mb-2">Founded in 2014</h4>
          <p className="text-white/70 font-mono text-xs leading-relaxed">
            From a small room of 3 engineers to a global powerhouse of 50+ experts.
          </p>
        </div>
      </div>

      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-brand-accent mb-6">The Narrative</div>
        <TextScroll 
          text="Driven by logic, defined by results."
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-brand-dark mb-10 tracking-tight leading-tight flex flex-wrap"
        />

        <div className="space-y-12">
          {[
            { num: '01', title: 'The Genesis', text: 'Born in Nigeria to address a local gap in enterprise IT, we evolved quickly by prioritizing robust execution over theory. ReliabilityIQ was established to prove that African tech could match and exceed global standards.' },
            { num: '02', title: 'The AI Pivot', text: 'As technology shifted, we integrated advanced AI to move our clients from reactive maintenance to proactive scaling, serving both growing Nigerian firms and established international entities.' },
            { num: '03', title: 'Global Operations', text: 'Today, we manage web operations and spatial data from Lagos to London and beyond, maintaining an obsessive attention to detail for a diverse portfolio of global partners.' }
          ].map((step) => (
            <div key={step.num} className="flex gap-8 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-brand-accent/20 flex items-center justify-center font-mono text-sm font-bold text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                {step.num}
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3 font-mono">{step.title}</h4>
                <p className="text-brand-dark/50 font-mono text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', service: 'Web Operations', details: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.details.trim().length < 10) newErrors.details = "Please provide more details (min 10 characters)";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    // Construct the email body
    const subject = encodeURIComponent(`New Contact Form Submission from ${formData.firstName} ${formData.lastName}`);
    const body = encodeURIComponent(`You have a new inquiry from your website.

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Service Required: ${formData.service}

Message/Details:
${formData.details}
`);

    // Open user's default mail client to send the email
    window.location.href = `mailto:reliabilityiqventures@gmail.com?subject=${subject}&body=${body}`;

    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ firstName: '', lastName: '', email: '', service: 'Web Operations', details: '' });
    setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  return (
    <section id="contact-section" className="pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[48px] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-brand-dark/10">
          {/* Form */}
          <div className="lg:w-1/2 p-6 md:p-12 lg:p-20 border-r border-brand-dark/10">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-accent mb-4">Start a Conversation</div>
            <h2 className="text-3xl md:text-5xl font-bold font-mono mb-12 leading-tight text-brand-dark">
              Ready to upgrade your infrastructure?
            </h2>

            <form className="space-y-8 font-mono text-sm" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase text-brand-dark/50 mb-2 font-bold tracking-tighter">First Name</label>
                  <input 
                    type="text" 
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="John" 
                    className={`w-full bg-brand-bg p-4 rounded-xl outline-none border ${errors.firstName ? 'border-red-500' : 'border-transparent'} focus:border-brand-accent/20 focus:bg-white transition-all text-brand-dark placeholder:text-brand-dark/40`}
                  />
                  {errors.firstName && <p className="text-red-500 text-[10px] mt-1">{errors.firstName}</p>}
                </div>
                <div>
                   <label className="block text-[10px] uppercase text-brand-dark/50 mb-2 font-bold tracking-tighter">Last Name</label>
                   <input 
                    type="text" 
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Doe" 
                    className={`w-full bg-brand-bg p-4 rounded-xl outline-none border ${errors.lastName ? 'border-red-500' : 'border-transparent'} focus:border-brand-accent/20 focus:bg-white transition-all text-brand-dark placeholder:text-brand-dark/40`}
                  />
                  {errors.lastName && <p className="text-red-500 text-[10px] mt-1">{errors.lastName}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-brand-dark/50 mb-2 font-bold tracking-tighter">Work Email</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@company.com" 
                  className={`w-full bg-brand-bg p-4 rounded-xl outline-none border ${errors.email ? 'border-red-500' : 'border-transparent'} focus:border-brand-accent/20 focus:bg-white transition-all text-brand-dark placeholder:text-brand-dark/40`}
                />
                {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-[10px] uppercase text-brand-dark/50 mb-2 font-bold tracking-tighter">Service Interest</label>
                <select 
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="w-full bg-brand-bg p-4 rounded-xl outline-none font-mono text-sm cursor-pointer border border-transparent focus:border-brand-accent/20 focus:bg-white transition-all text-brand-dark"
                >
                  <option>Web Operations</option>
                  <option>AI Automations</option>
                  <option>GIS Mapping</option>
                  <option>Technical Reports</option>
                  <option>Content & Design</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-brand-dark/50 mb-2 font-bold tracking-tighter">Project Details</label>
                <textarea 
                  name="details"
                  value={formData.details}
                  onChange={handleChange}
                  rows={4} 
                  placeholder="Tell us about your technical challenges..." 
                  className={`w-full bg-brand-bg p-4 rounded-xl outline-none border ${errors.details ? 'border-red-500' : 'border-transparent'} focus:border-brand-accent/20 focus:bg-white transition-all resize-none text-brand-dark placeholder:text-brand-dark/40`}
                ></textarea>
                {errors.details && <p className="text-red-500 text-[10px] mt-1">{errors.details}</p>}
              </div>

              <MagneticGlowButton 
                type="submit"
                disabled={isSubmitting}
                className={`w-full ${isSuccess ? 'bg-green-500' : 'bg-brand-accent'} text-white py-5 rounded-2xl text-lg font-bold hover:opacity-90 transition-all shadow-xl active:scale-95 disabled:opacity-50 border border-transparent hover:border-white/20`}
              >
                {isSubmitting ? 'Processing...' : isSuccess ? 'Request Sent!' : 'Submit Request'}
              </MagneticGlowButton>
            </form>
          </div>

          {/* Map/Info */}
          <div className="lg:w-1/2 relative bg-brand-bg/50 p-6 md:p-12 lg:p-20 flex flex-col justify-between overflow-hidden">
            {/* Map Placeholder */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
               <img 
                src={fallbackLogo} 
                className="w-full h-full object-cover opacity-20" 
                alt="map"
              />
            </div>
            
            <div className="relative z-10 flex-grow w-full rounded-2xl overflow-hidden shadow-lg mb-8 h-64 md:h-auto shrink-0 md:shrink">
               <iframe 
                src="https://maps.google.com/maps?q=41%20Akeem%20Salami%20St,%20Idimu,%20Lagos%20102213,%20Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              />
            </div>

            <div className="relative z-10 bg-transparent border border-brand-dark/10 p-6 lg:p-8 rounded-[24px] md:mt-0 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between flex-wrap items-start sm:items-center">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-brand-dark/50 mb-2 font-bold">Direct Line</div>
                <div className="font-mono text-[13px] md:text-sm text-brand-dark tracking-tighter leading-relaxed font-medium whitespace-nowrap">
                  +234 9075934287 <br className="sm:hidden" /> <span className="hidden sm:inline">&bull;</span> +234 906539605
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-brand-dark/50 mb-2 font-bold sm:text-right">Support Email</div>
                <div className="font-mono text-[13px] md:text-[14px] text-brand-dark tracking-tighter leading-normal font-medium break-all sm:break-normal truncate sm:text-right">reliabilityiqventures@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrendingProducts = () => (
  <section className="pt-20 pb-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-brand-accent mb-4">Domestic & Global Solutions</div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-brand-dark leading-[0.9]">
            Market-Leading <br /> Infrastructures.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 font-mono">
          <button className="p-3 bg-brand-dark text-white rounded-xl shadow-md"><Search size={18} /></button>
          <button className="flex items-center gap-2 p-3 border-2 border-brand-dark/5 rounded-xl text-brand-dark/60 text-xs sm:text-sm"><Filter size={18} /> Sort by popularity</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "IQ-Nodes Cluster", tag: "Hot", desc: "Edge computing for Lagos and beyond. Sub-10ms latency for regional AI processing and low-latency African app delivery.", price: "$2,400/mo", img: fallbackLogo },
          { title: "Sentinel AI Firewall", tag: "New", desc: "International standard network security layer. Protecting Nigerian digital assets from sophisticated global zero-day threats.", price: "$1,850/mo", img: fallbackLogo },
          { title: "Geo-Insight Dashboard", tag: "Bestseller", desc: "Master African logistics. Real-time visualization for cross-border transit, supply chain nodes, and regional traffic patterns.", price: "$900/mo", img: fallbackLogo },
          { title: "Auto-Scale VPS Pro", tag: "Efficiency", desc: "Flexible cloud resources that adapt automatically to local demand cycles and global traffic spikes without downtime.", price: "Custom", img: fallbackLogo },
          { title: "DataCleanse API", tag: "AI", desc: "Sanitize raw enterprise data at scale. Tailored for Nigerian data structures while maintaining global privacy compliance.", price: "$0.05/req", img: fallbackLogo },
          { title: "Vortex CDN", tag: "Speed", desc: "Global asset delivery with dedicated Nigerian edge nodes. Optimize your digital reach across every continent seamlessly.", price: "$120/mo", img: fallbackLogo },
        ].map((prod, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[32px] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <div className="aspect-video relative overflow-hidden">
               <img 
                src={prod.img} 
                alt={prod.title} 
                className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                referrerPolicy="no-referrer"
              />
               <div className="absolute top-4 right-4 bg-brand-accent text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">{prod.tag}</div>
            </div>
            <div className="p-6 lg:p-8">
               <div className="flex justify-between items-start mb-4 gap-2">
                 <h3 className="text-lg lg:text-xl font-bold font-mono tracking-tight group-hover:text-brand-accent transition-colors">{prod.title}</h3>
                 <div className="flex text-amber-400 shrink-0"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
               </div>
               <p className="text-brand-dark/50 font-mono text-[11px] leading-relaxed mb-6">{prod.desc}</p>
               <div className="flex justify-between items-center border-t border-brand-dark/5 pt-6">
                 <div className="font-mono font-bold text-brand-dark">{prod.price}</div>
                 <button className="bg-brand-dark text-white p-3 rounded-xl hover:bg-brand-accent transition-colors"><Info size={16} /></button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Main App ---

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-brand-accent text-white rounded-full shadow-xl hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent/50 cursor-pointer"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeroSection onNavigate={setCurrentPage} />
            <MissionSection />
            <CompetenciesSection onContact={() => setCurrentPage('contact')} />
            <NarrativeSection />
          </motion.div>
        );
      case 'about':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24"
          >
            <NarrativeSection />
            <MissionSection />
          </motion.div>
        );
      case 'services':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24"
          >
            <FeatureFlipper onNavigate={setCurrentPage} />
            <div className="bg-brand-dark text-white py-32 px-6 text-center">
              <h2 className="text-4xl md:text-6xl font-bold font-mono mb-12">Looking for a custom solution?</h2>
              <button 
                onClick={() => setCurrentPage('contact')}
                className="bg-brand-accent text-white px-12 py-5 rounded-full text-xl font-bold font-mono hover:bg-brand-accent-light transition-all"
              >
                Learn More
              </button>
            </div>
          </motion.div>
        );
      case 'service-branding':
      case 'service-development':
      case 'service-automation':
      case 'service-documentation':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24"
          >
            <ServiceDetail 
              id={currentPage} 
              onBack={() => setCurrentPage('services')}
              onContact={() => setCurrentPage('contact')}
            />
          </motion.div>
        );
      case 'trending':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TrendingProducts />
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24"
          >
            <ContactSection />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <CircleCursor />
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>

        {/* Contact Section added before footer on all pages except explicit contact page */}
        {currentPage !== 'contact' && (
          <ContactSection />
        )}
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
