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
import { BlogPage } from './components/BlogPage';
import { FluidGradientSeparator } from './components/FluidGradientSeparator';

import rufusImg from './assets/images/Rufus portfolio.jpg';
import theophilusImg from './assets/images/Theo portfolio.jpg';
import kikaImg from './assets/images/Kika portfolio.jpg';
import section3Img from './assets/images/section3.jpg';

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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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
            <FluidGradientSeparator variant="horizon" />
            <MissionSection onBack={() => handlePageChange('services')} onExplore={() => handlePageChange('services')} />
            <FluidGradientSeparator variant="aurora" />
            <CompetenciesSection onContact={() => handlePageChange('contact')} />
            <FluidGradientSeparator variant="prism" flipped />
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
                  animate={{ scale: 1, opacity: 0.65 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  src={section3Img} 
                  alt="ReliabilityIQ Ventures Architectural Backdrop" 
                  className="w-full h-full object-cover object-center dark:opacity-45" 
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#eff5ff]/55 via-[#e2eeff]/65 to-[#eef5ff] dark:from-[#07142b]/70 dark:via-[#0b1c3b]/75 dark:to-[#07142b] backdrop-blur-[1px]" />
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
                     className="frosted-panel-elevated liquid-hover-sheen rounded-2xl p-5 max-w-[380px] relative overflow-hidden"
                   >
                     <div className="absolute inset-0 glass-reflection" />
                     <p className="relative z-10 text-base md:text-lg text-text-primary leading-relaxed font-medium">
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
                  <button
                    type="button"
                    onClick={() => window.scrollBy({ top: window.innerHeight * 0.78, behavior: 'smooth' })}
                    aria-label="Scroll down to explore"
                    className="group text-center text-sm text-text-secondary hover:text-text-primary font-medium flex items-center gap-3.5 transition-all cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full px-5 py-2 frosted-panel liquid-hover-sheen"
                  >
                    <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-text-secondary/40 group-hover:to-accent/60 transition-colors" />
                    <span className="tracking-tight">Scroll to explore</span>
                    <span className="relative w-5 h-8 rounded-full border-2 border-accent/70 group-hover:border-accent flex items-start justify-center pt-1.5 transition-colors">
                      <motion.span
                        animate={{ y: [0, 8, 0], opacity: [1, 0.35, 1] }}
                        transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                        className="w-1 h-2 rounded-full bg-accent"
                      />
                    </span>
                    <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-text-secondary/40 group-hover:to-accent/60 transition-colors" />
                  </button>
                </motion.div>
              </div>
            </FlowSection>
            
            <FluidGradientSeparator variant="horizon" />
            <FlowSection className="w-full pt-20 pb-12 md:pt-28 md:pb-16 px-6 bg-transparent relative z-10 flex flex-col items-center transition-colors duration-500">
               <div className="max-w-5xl mx-auto frosted-panel-elevated rounded-[36px] p-8 md:p-12 relative overflow-hidden">
                 <div className="absolute inset-0 glass-reflection" />
                 <div className="relative z-10">
                 <OmniReveal 
                   ContainerTag="h2"
                   className="text-2xl md:text-4xl lg:text-[40px] font-semibold text-text-primary leading-[1.4] tracking-tight"
                   text="We provide innovative [] services that combine technology, research, and operational intelligence. Founded by [] in 2024, our focus is on delivering accurate insights, structured data solutions, and digital systems that support smarter decision-making. As a growing company, we are committed to helping businesses and organizations transform information into actionable [] through modern tools, analysis, and efficient workflows. Now onboarding a limited number of early clients. Only 2/6 July spots left — []"
                   components={[
                     <span key="1" className="crystal-button px-4 py-0.5 inline-flex translate-y-[-0.05em]">information</span>,
                     <FounderToggle key="2" founders={FOUNDERS} />,
                     <span key="3" className="frosted-panel border border-accent/45 text-accent px-4 py-0 rounded-full inline-flex translate-y-[-0.05em]">value</span>,
                     <MagneticGlowButton key="4" onClick={() => handlePageChange('contact')} className="mt-2 text-xl md:text-3xl font-mono !px-10">Claim Your Spot.</MagneticGlowButton>
                   ]}
                   scrollHeight={400}
                   initialOpacity={0.6}
                   initialBlur={3}
                 />
                 </div>
               </div>
            </FlowSection>
            
            <FluidGradientSeparator variant="aurora" intensity="medium" />
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
            <FluidGradientSeparator variant="prism" />
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
      case 'blog':
      case 'blog-develop':
      case 'blog-train':
      case 'blog-automate': {
        const trackMap = {
          blog: 'all',
          'blog-develop': 'develop',
          'blog-train': 'train',
          'blog-automate': 'automate',
        } as const;
        const initialTrack = trackMap[currentPage as keyof typeof trackMap] ?? 'all';
        return (
          <motion.div key={currentPage} {...PAGE_TRANSITION_PROPS} className="w-full">
            <BlogPage initialTrack={initialTrack} onNavigate={handlePageChange} />
          </motion.div>
        );
      }
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
        {/* Soft Diffused Liquid Light Layer for Glass Refraction */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-36 -left-28 w-[680px] h-[680px] rounded-full bg-white/80 dark:bg-sky-400/18 blur-[120px]" />
          <div className="absolute top-[28%] -right-32 w-[620px] h-[620px] rounded-full bg-sky-300/45 dark:bg-blue-500/20 blur-[135px]" />
          <div className="absolute -bottom-24 left-[18%] w-[680px] h-[480px] rounded-full bg-blue-300/40 dark:bg-indigo-500/18 blur-[145px]" />
          <div className="absolute top-[60%] left-[-8%] w-[440px] h-[440px] rounded-full bg-cyan-200/35 dark:bg-cyan-400/12 blur-[120px]" />
        </div>
        
        <CircleCursor />
        <Navbar currentPage={currentPage} setCurrentPage={handlePageChange} theme={theme} toggleTheme={toggleTheme} onMobileMenuChange={setIsMobileMenuOpen} />
        
        <main className="flex-grow relative z-10">
          <AnimatePresence mode="wait">
            {renderPage()}
          </AnimatePresence>
          {currentPage !== 'contact' && currentPage !== 'about' && currentPage !== 'services' && currentPage !== 'admin' && (
            <>
              <FluidGradientSeparator variant="aurora" />
              <ContactSection />
            </>
          )}
        </main>

        <Footer onNavigate={handlePageChange} />
        <ScrollToTopButton isMenuOpen={isMobileMenuOpen} />
        <WhatsAppWidget isMenuOpen={isMobileMenuOpen} />
        <ChatbotWidget isMenuOpen={isMobileMenuOpen} />
        <WelcomeVideoWidget isMenuOpen={isMobileMenuOpen} />
      </div>
    </>
  );
}
