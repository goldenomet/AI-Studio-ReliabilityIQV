import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CircleCursor } from './components/CircleCursor';
import { FeatureFlipper } from './components/FeatureFlipper';
import { ServiceDetail } from './components/ServiceDetail';
import { HeroSection, MissionSection } from './components/SectionsPart1';
import { CompetenciesSection, NarrativeSection, ContactSection, TrendingProducts, ScrollToTopButton } from './components/SectionsPart2';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'light';
    }
    return 'light';
  });

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
            <MissionSection />
            <CompetenciesSection onContact={() => setCurrentPage('contact')} />
            <NarrativeSection />
          </motion.div>
        );
      case 'about':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
            <NarrativeSection />
            <MissionSection />
          </motion.div>
        );
      case 'services':
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
            <FeatureFlipper onNavigate={setCurrentPage} />
            <div className="bg-brand-footer text-white py-32 px-6 text-center transition-colors duration-500">
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
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">
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
    <div className="relative min-h-screen flex flex-col font-sans">
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
  );
}
