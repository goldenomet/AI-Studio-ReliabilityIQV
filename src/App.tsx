import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CircleCursor } from './components/CircleCursor';
import { EngineeredServicesSection } from './components/FeatureFlipper';
import { ServicesHero } from './components/ServicesHero';
import { ServiceDetail } from './components/ServiceDetail';
import { HeroSection, MissionSection } from './components/SectionsPart1';
import { LogoBlurCarousel } from './components/LogoBlurCarousel';
import { CompetenciesSection, NarrativeSection, ContactSection, TrendingProducts, ScrollToTopButton } from './components/SectionsPart2';
import { Preloader } from './components/Preloader';
import ScrollPath from './components/ScrollPath';
import { OmniReveal } from './components/OmniReveal';
import { MagneticGlowButton } from './components/MagneticGlowButton';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { WelcomeVideoWidget } from './components/WelcomeVideoWidget';
import { ChatbotWidget } from './components/ChatbotWidget';
import { AdminPanel } from './components/AdminPanel';
import FounderToggle from './components/FounderToggle';
import { FlowSection, PAGE_TRANSITION_PROPS } from './components/SectionFlow';

import rufusImg from './assets/images/Rufus portfolio.jpg';
import theophilusImg from './assets/images/Theo portfolio.jpg';
import kikaImg from './assets/images/Kika portfolio.jpg';
import section1Img from './assets/images/section1.png';

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
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    window.history.pushState(null, '', `#${page}`);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash !== currentPage) {
        setCurrentPage(hash);
      }
    };
    
    // Read initial hash
    if (window.location.hash) {
      handleHashChange();
    }
    
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentPage]);

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
    setTheme(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      if (next === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('theme', next);
      return next;
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <motion.div key="home" {...PAGE_TRANSITION_PROPS}>
            <HeroSection onNavigate={handlePageChange} />
            <LogoBlurCarousel />
            <MissionSection onBack={() => handlePageChange('services')} onExplore={() => handlePageChange('services')} />
            <CompetenciesSection onContact={() => handlePageChange('contact')} />
            <NarrativeSection />
          </motion.div>
        );
      case 'about':
        return (
          <motion.div key="about" {...PAGE_TRANSITION_PROPS} className="pt-0">
            <FlowSection isHero className="w-full min-h-screen -mt-[120px] pt-[120px] relative bg-bg-primary overflow-hidden flex flex-col justify-end pb-8">
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <motion.img 
                  initial={{ scale: 1.06, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.5 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src={section1Img} 
                  alt="Modern Architectural Glassmorphism Infrastructure" 
                  className="w-full h-full object-cover dark:opacity-30" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#eff5ff]/70 via-[#e2eeff]/75 to-[#eef5ff] dark:from-[#07142b]/80 dark:via-[#0b1c3b]/80 dark:to-[#07142b] backdrop-blur-[2px]" />
              </div>
              
              <div className="relative z-10 w-full px-6 md:px-12 lg:px-24 flex flex-col gap-6 md:gap-10 pb-4 h-full justify-end flex-grow" style={{ minHeight: '760px' }}>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-2 max-sm:mb-[15px] max-sm:pt-0 max-sm:pb-0 mt-auto">
                   <motion.div
                     initial={{ y: 50, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                   >
                     <h1 className="text-6xl md:text-[96px] lg:text-[124px] lg:mb-[-10px] leading-[0.95] font-extrabold text-text-primary tracking-tight">
                       About <span className="text-accent">Us</span>
                     </h1>
                   </motion.div>
                   
                   <motion.div
                     initial={{ y: 30, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                     className="frosted-panel rounded-2xl p-5 max-w-[380px]"
                   >
                     <p className="text-base md:text-lg text-text-primary leading-relaxed font-medium">
                       ReliabilityIQ Ventures is an information service company headquartered in Lagos, Nigeria.
                     </p>
                   </motion.div>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                  className="flex flex-col items-center justify-center pt-8 pb-4"
                >
                  <div className="text-center text-sm text-text-secondary font-medium flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-text-secondary/30"></span>
                    <span>Scroll to explore</span>
                    <span className="text-accent">↓</span>
                    <span className="w-8 h-[1px] bg-text-secondary/30"></span>
                  </div>
                </motion.div>
              </div>
            </FlowSection>
            
            <FlowSection className="w-full pt-20 pb-12 md:pt-28 md:pb-16 px-6 bg-transparent relative z-10 flex flex-col items-center transition-colors duration-500">
               <div className="max-w-5xl mx-auto frosted-panel-elevated rounded-[36px] p-8 md:p-12">
                 <OmniReveal 
                   ContainerTag="h2"
                   className="text-2xl md:text-4xl lg:text-[40px] font-semibold text-text-primary leading-[1.4] tracking-tight"
                   text="We provide innovative [] services that combine technology, research, and operational intelligence. Founded by [] in 2024, our focus is on delivering accurate insights, structured data solutions, and digital systems that support smarter decision-making. As a growing company, we are committed to helping businesses and organizations transform information into actionable [] through modern tools, analysis, and efficient workflows. Now onboarding a limited number of early clients. Only 2/6 July spots left — []"
                   components={[
                     <span key="1" className="bg-accent text-white px-3.5 py-0.5 rounded-full inline-flex translate-y-[-0.05em]">information</span>,
                     <FounderToggle key="2" founders={FOUNDERS} />,
                     <span key="3" className="border-2 border-accent text-accent px-3.5 py-0 rounded-full inline-flex translate-y-[-0.05em]">value</span>,
                     <MagneticGlowButton key="4" onClick={() => handlePageChange('contact')} className="mt-2 text-xl md:text-3xl font-mono !px-10">Claim Your Spot.</MagneticGlowButton>
                   ]}
                   scrollHeight={400}
                   initialOpacity={0.6}
                   initialBlur={3}
                 />
               </div>
            </FlowSection>
            
            {/* Motion Path Section */}
            <FlowSection mode="fade" className="w-full bg-transparent transition-colors duration-500 relative z-10">
              <ScrollPath onNavigate={handlePageChange} />
            </FlowSection>
          </motion.div>
        );
      case 'services':
        return (
          <motion.div key="services" {...PAGE_TRANSITION_PROPS} className="pt-0">
            <ServicesHero />
            <EngineeredServicesSection onNavigate={handlePageChange} />
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
          <motion.div key={currentPage} {...PAGE_TRANSITION_PROPS} className="pt-0 w-full">
            <ServiceDetail 
              id={currentPage} 
              onBack={() => handlePageChange('services')}
              onContact={() => handlePageChange('contact')}
            />
          </motion.div>
        );
      case 'trending':
        return (
          <motion.div key="trending" {...PAGE_TRANSITION_PROPS}>
            <TrendingProducts />
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div key="contact" {...PAGE_TRANSITION_PROPS} className="pt-24">
            <ContactSection />
          </motion.div>
        );
      case 'admin':
        return (
          <motion.div key="admin" {...PAGE_TRANSITION_PROPS} className="w-full">
            <AdminPanel />
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

      <div className={`relative min-h-screen flex flex-col font-sans serene-glass-bg text-text-primary transition-opacity duration-700 ${loading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}>
        {/* Soft Diffused Ambient Light Layer */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-32 -left-24 w-[620px] h-[620px] rounded-full bg-white/70 dark:bg-blue-500/10 blur-[130px]" />
          <div className="absolute top-1/3 -right-32 w-[560px] h-[560px] rounded-full bg-blue-200/45 dark:bg-sky-400/10 blur-[140px]" />
          <div className="absolute bottom-0 left-1/4 w-[640px] h-[420px] rounded-full bg-sky-100/60 dark:bg-indigo-500/10 blur-[150px]" />
        </div>
        
        <CircleCursor />
        <Navbar currentPage={currentPage} setCurrentPage={handlePageChange} theme={theme} toggleTheme={toggleTheme} />
        
        <main className="flex-grow relative z-10">
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
          {currentPage !== 'contact' && currentPage !== 'about' && currentPage !== 'services' && currentPage !== 'admin' && (
            <ContactSection />
          )}
        </main>

        <Footer onNavigate={handlePageChange} />
        <ScrollToTopButton />
        <WhatsAppWidget />
        <ChatbotWidget />
        <WelcomeVideoWidget />
      </div>
    </>
  );
}
