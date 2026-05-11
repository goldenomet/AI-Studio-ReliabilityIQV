import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CircleCursor } from './components/CircleCursor';
import { EngineeredServicesSection } from './components/FeatureFlipper';
import { ServicesHero } from './components/ServicesHero';
import { ServiceDetail } from './components/ServiceDetail';
import { HeroSection, MissionSection } from './components/SectionsPart1';
import { CompetenciesSection, NarrativeSection, ContactSection, TrendingProducts, ScrollToTopButton } from './components/SectionsPart2';
import { Preloader } from './components/Preloader';
import ScrollPath from './components/ScrollPath';
import { OmniReveal } from './components/OmniReveal';
import { MagneticGlowButton } from './components/MagneticGlowButton';

import rufusImg from './assets/images/Rufus portfolio.jpg';
import theophilusImg from './assets/images/Theo portfolio.jpg';
import kikaImg from './assets/images/Kika portfolio.jpg';

const FOUNDERS = [
  {
    name: "Rufus",
    image: rufusImg
  },
  {
    name: "Theophilus",
    image: theophilusImg
  },
  {
    name: "Kika",
    image: kikaImg
  }
];

const FounderToggle = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleStackClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % FOUNDERS.length);
  };

  // Modern background colors for non-front cards
  const bgColors = ['bg-accent/80', 'bg-accent/60', 'bg-accent/40'];
  const currentFounder = FOUNDERS[currentIndex];

  return (
    <span 
      className="inline-block relative z-20 align-middle w-[150px] h-[100px] md:w-[220px] md:h-[145px] ml-1 pt-[103px] pb-[23px] px-0 cursor-pointer group transition-transform duration-300 ease-out hover:scale-[1.03]"
      onClick={handleStackClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Click to see more of us"
    >
      {/* Floating Name Pill - Positioned outside and above the stack with sufficient gap */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[calc(100%+20px)] md:-translate-y-[calc(100%+32px)] z-50 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentFounder.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-bg-card/95 backdrop-blur-sm px-3 py-1 rounded-[8px] shadow-sm border border-accent/20 whitespace-nowrap ring-1 ring-white/10"
          >
            <span className="text-text-primary text-[12px] md:text-xs font-medium tracking-tight leading-none">
              {currentFounder.name}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Soft Background Pattern behind the stack */}
      <div className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-accent)_0.8px,transparent_0.8px)] [background-size:12px_12px] opacity-20" />
      </div>

      {FOUNDERS.map((founder, index) => {
        const relativeIndex = (index - currentIndex + FOUNDERS.length) % FOUNDERS.length;
        
        let zIndex = 30 - relativeIndex;
        let yOffset = relativeIndex * -8;
        let xOffset = 0;
        let rotate = 0;
        let scale = 1;

        if (relativeIndex === 1) {
          xOffset = 18;
          rotate = 5;
          scale = 0.94;
        } else if (relativeIndex === 2) {
          xOffset = -18;
          rotate = -5;
          scale = 0.94;
        }

        const isFront = relativeIndex === 0;

        return (
          <motion.div
            key={founder.name}
            animate={{ 
              y: yOffset, 
              x: xOffset, 
              rotate: rotate, 
              scale: scale, 
              zIndex: zIndex 
            }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className={`absolute inset-0 rounded-2xl ring-2 transition-shadow duration-300 ${
              isFront 
                ? "bg-bg-card ring-accent/20 shadow-2xl shadow-black/10 group-hover:shadow-black/20" 
                : `${bgColors[index % bgColors.length]} ring-white/20 shadow-lg`
            } origin-bottom pointer-events-none overflow-hidden`}
          >
            <img 
              src={founder.image} 
              className={`w-full h-full object-cover transition-all duration-500 ${
                !isFront ? "opacity-30 grayscale blur-[1px]" : "opacity-100"
              }`} 
              alt={founder.name} 
            />
            
            {/* Glossy overlay for front card */}
            {isFront && (
              <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none" />
            )}
          </motion.div>
        );
      })}
    </span>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [loading]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <HeroSection onNavigate={setCurrentPage} />
            <MissionSection onBack={() => setCurrentPage('services')} onExplore={() => setCurrentPage('services')} />
            <CompetenciesSection onContact={() => setCurrentPage('contact')} />
            <NarrativeSection />
          </motion.div>
        );
      case 'about':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-0">
            <section className="w-full min-h-screen -mt-[120px] pt-[120px] relative bg-bg-primary overflow-hidden flex flex-col justify-end pb-8">
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2564&auto=format&fit=crop" alt="Abstract 3D Theme" className="w-full h-full object-cover dark:opacity-20 contrast-125" />
                <div className="absolute inset-0 bg-bg-primary/40 backdrop-blur-[2px]" />
              </div>
              
              <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 flex flex-col gap-6 md:gap-10 pb-4 h-full justify-end flex-grow" style={{ minHeight: '806px' }}>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2 max-sm:mb-[15px] max-sm:pt-0 max-sm:pb-0 mt-auto">
                   <h1 className="text-6xl md:text-[100px] lg:text-[130px] leading-[0.9] font-medium text-text-primary tracking-tight">About Us</h1>
                   <p className="text-lg md:text-xl text-text-secondary max-w-[360px] pb-2 md:pb-6 leading-relaxed">
                     ReliabilityIQ Ventures is an information service company headquartered in Lagos, Nigeria.
                   </p>
                </div>
                
                <div className="flex flex-col items-center justify-center pt-8 pb-4">
                  <div className="text-center text-sm md:text-base text-text-secondary/60 font-medium animate-pulse">
                    Scroll down <span className="ml-2">↓</span>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="w-full py-24 md:py-48 px-6 bg-bg-primary relative z-10 flex flex-col items-center transition-colors duration-500">
               <div className="max-w-5xl mx-auto">
                 <OmniReveal 
                   ContainerTag="h2"
                   className="text-2xl md:text-4xl lg:text-[40px] font-medium text-text-primary leading-[1.4] tracking-tight"
                   text="We provide innovative [] services that combine technology, research, and operational intelligence. Founded by [] in 2026, our focus is on delivering accurate insights, structured data solutions, and digital systems that support smarter decision-making. As a growing company, we are committed to helping businesses and organizations transform information into actionable [] through modern tools, analysis, and efficient workflows. Now onboarding a limited number of early clients. Only 2/6 July spots left — []"
                   components={[
                     <span key="1" className="bg-accent text-white px-3 py-1 md:py-0 rounded-full inline-flex translate-y-[-0.05em]">information</span>,
                     <FounderToggle key="2" />,
                     <span key="3" className="border-2 border-accent text-accent px-3 py-0 rounded-full inline-flex translate-y-[-0.05em]">value</span>,
                     <MagneticGlowButton key="4" onClick={() => setCurrentPage('contact')} className="mt-2 text-xl md:text-3xl font-mono !px-10">Claim Your Spot.</MagneticGlowButton>
                   ]}
                   scrollHeight={400}
                   initialOpacity={0.05}
                   initialBlur={12}
                 />
               </div>
            </section>
            
            {/* Motion Path Section */}
            <section className="w-full bg-bg-primary transition-colors duration-500 relative z-10">
              <ScrollPath onNavigate={setCurrentPage} />
            </section>
          </motion.div>
        );
      case 'services':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-0">
            <ServicesHero />
            <EngineeredServicesSection onNavigate={setCurrentPage} />
            <div className="bg-bg-secondary text-text-primary py-32 px-6 text-center transition-colors duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-border-primary" />
              <h2 className="text-4xl md:text-6xl font-bold font-mono mb-12">Looking for a custom solution?</h2>
              <MagneticGlowButton 
                onClick={() => setCurrentPage('contact')}
                className="text-xl !px-16 !py-6"
              >
                Learn More
              </MagneticGlowButton>
            </div>
          </motion.div>
        );
      case 'service-branding':
      case 'service-development':
      case 'service-automation':
      case 'service-animation':
      case 'service-gis':
      case 'service-social':
      case 'service-documentation':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-0 w-full">
            <ServiceDetail 
              id={currentPage} 
              onBack={() => setCurrentPage('services')}
              onContact={() => setCurrentPage('contact')}
            />
          </motion.div>
        );
      case 'trending':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <TrendingProducts />
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
            <ContactSection />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <div className={`relative min-h-screen flex flex-col font-sans transition-opacity duration-1000 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        <CircleCursor />
        <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} theme={theme} toggleTheme={toggleTheme} />
        
        <main className="flex-grow relative">
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
          {currentPage !== 'contact' && (
            <ContactSection />
          )}
        </main>

        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
}
