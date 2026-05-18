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
import { WhatsAppWidget } from './components/WhatsAppWidget';
import FounderToggle from './components/FounderToggle';

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
                <motion.img 
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.8 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2564&auto=format&fit=crop" 
                  alt="Abstract 3D Theme" 
                  className="w-full h-full object-cover dark:opacity-40 contrast-110 brightness-110" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-primary/10 to-bg-primary/60 backdrop-blur-[1px]" />
                
                {/* Floating animated elements */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ 
                        opacity: 0, 
                        x: Math.random() * 100 - 50 + '%', 
                        y: Math.random() * 100 - 50 + '%' 
                      }}
                      animate={{ 
                        opacity: [0.1, 0.4, 0.1],
                        y: ['-5%', '5%', '-5%'],
                        x: ['-2%', '2%', '-2%'],
                        rotate: [0, 10, -10, 0]
                      }}
                      transition={{ 
                        duration: 8 + Math.random() * 7,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                      className="absolute w-64 h-64 bg-accent/10 rounded-full blur-[80px]"
                    />
                  ))}
                </div>
              </div>
              
              <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 flex flex-col gap-6 md:gap-10 pb-4 h-full justify-end flex-grow" style={{ minHeight: '806px' }}>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2 max-sm:mb-[15px] max-sm:pt-0 max-sm:pb-0 mt-auto">
                   <motion.div
                     initial={{ y: 80, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                   >
                     <h1 className="text-6xl md:text-[100px] lg:text-[130px] lg:mb-[-10px] leading-[0.9] font-medium text-text-primary tracking-tight">
                       About <span className="text-accent">Us</span>
                     </h1>
                   </motion.div>
                   
                   <motion.p 
                     initial={{ y: 40, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                     className="text-lg md:text-xl text-text-secondary max-w-[360px] pb-2 md:pb-6 leading-relaxed font-light"
                   >
                     ReliabilityIQ Ventures is an information service company headquartered in Lagos, Nigeria.
                   </motion.p>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 1 }}
                  className="flex flex-col items-center justify-center pt-8 pb-4"
                >
                  <div className="text-center text-sm md:text-base text-text-secondary/60 font-medium animate-pulse flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-text-secondary/30"></span>
                    Scroll down <span className="text-accent">↓</span>
                    <span className="w-8 h-[1px] bg-text-secondary/30"></span>
                  </div>
                </motion.div>
              </div>
            </section>
            
            <section className="w-full py-24 md:py-48 px-6 bg-bg-primary relative z-10 flex flex-col items-center transition-colors duration-500">
               <div className="max-w-5xl mx-auto">
                 <OmniReveal 
                   ContainerTag="h2"
                   className="text-2xl md:text-4xl lg:text-[40px] font-medium text-text-primary leading-[1.4] tracking-tight"
                   text="We provide innovative [] services that combine technology, research, and operational intelligence. Founded by [] in 2024, our focus is on delivering accurate insights, structured data solutions, and digital systems that support smarter decision-making. As a growing company, we are committed to helping businesses and organizations transform information into actionable [] through modern tools, analysis, and efficient workflows. Now onboarding a limited number of early clients. Only 2/6 July spots left — []"
                   components={[
                     <span key="1" className="bg-accent text-white px-3 py-1 md:py-0 rounded-full inline-flex translate-y-[-0.05em]">information</span>,
                     <FounderToggle key="2" founders={FOUNDERS} />,
                     <span key="3" className="border-2 border-accent text-accent px-3 py-0 rounded-full inline-flex translate-y-[-0.05em]">value</span>,
                     <MagneticGlowButton key="4" onClick={() => setCurrentPage('contact')} className="mt-2 text-xl md:text-3xl font-mono !px-10">Claim Your Spot.</MagneticGlowButton>
                   ]}
                   scrollHeight={400}
                   initialOpacity={0.6}
                   initialBlur={3}
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
          {currentPage !== 'contact' && currentPage !== 'about' && currentPage !== 'services' && (
            <ContactSection />
          )}
        </main>

        <Footer onNavigate={setCurrentPage} />
        <ScrollToTopButton />
        <WhatsAppWidget />
      </div>
    </>
  );
}
