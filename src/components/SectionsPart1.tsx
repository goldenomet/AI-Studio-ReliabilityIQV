
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { ArrowRight, Zap, Globe, Cpu, ArrowLeft, Code, BrainCircuit, Video, Map, Megaphone, FileText, ArrowUpRight, Clock, TrendingUp, Users } from 'lucide-react';
import { MagneticGlowButton } from './MagneticGlowButton';
import { TiltCard } from './Cards';
import { ScramblyText, TextEngine, RealTimeCursors, PixelSnow, SmartTypewriter, TextScroll } from './Effects';
import fallbackLogo from '@/src/assets/images/logo.png';
import newImage1778002658766 from '@/src/assets/images/regenerated_image_1778002658766.jpg';
import newImage1778001962382 from '@/src/assets/images/regenerated_image_1778001962382.jpg';

export const HeroSection = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  return (
  <section className="pt-[110px] pb-20 md:pt-32 md:pb-32 px-6 relative overflow-hidden bg-bg-primary text-text-primary transition-colors duration-500" style={{ backgroundColor: '#e9f6f7' }}>
    <RealTimeCursors />
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-16 gap-10 items-center relative z-10">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-mono text-sm font-bold text-accent mb-3 uppercase tracking-[0.2em]"
        >
          ReliabilityIQ Ventures
        </motion.div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent/10 rounded-full text-text-secondary font-mono text-xs mb-6 border border-border-primary">
          <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse"></span>
          Lagos to London — IT Infrastructure for Global Scale
        </div>
        <ScramblyText 
          texts={[
            "We optimize digital platforms.",
            "Scaling Global Digital Infrastructure.",
            "Powering Next-Gen Web Operations."
          ]}
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6"
        />
        <SmartTypewriter 
          texts={[
            "ReliabilityIQ Ventures delivers global-standard web operations, AI automations, and strategic digital infrastructure for ambitious firms in Nigeria and beyond.",
            "Building resilient systems for the modern global enterprise, from Lagos-edge networks to London cloud infrastructures.",
            "Specialized engineering that bridges Nigerian technical ingenuity with international execution standards since 2024."
          ]}
          className="text-lg md:text-xl text-text-secondary mb-10 max-w-md leading-relaxed font-mono min-h-[140px] md:min-h-[120px]"
        />
        <div className="flex flex-nowrap items-center gap-3 md:gap-4 font-mono">
          <MagneticGlowButton 
            onClick={() => onNavigate('services')}
          >
            Learn More
          </MagneticGlowButton>
          <MagneticGlowButton 
            onClick={() => onNavigate('about')}
            className="bg-bg-secondary/50 border-border-primary text-text-primary"
          >
            Our Story
          </MagneticGlowButton>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-square md:aspect-auto md:h-[600px] border border-border-primary">
          <TiltCard style={{ width: '100%', height: '100%' }}>
            <img 
              src={newImage1778001962382} 
              alt="Team working" 
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter grayscale brightness-75 group-hover:grayscale-0 transition-all duration-500 rounded-3xl"
            />
          </TiltCard>
          {/* Glass Overlays */}
          <div className="absolute inset-0 m-auto md:inset-auto md:m-0 md:top-8 md:right-12 h-fit bg-bg-card/40 backdrop-blur-md border border-border-primary p-6 rounded-2xl w-[80%] max-w-[240px] md:w-48 md:max-w-none md:animate-bounce-slow mobile-swipe-1 shadow-xl">
             <div className="flex items-center gap-2 text-accent mb-2">
                <Cpu size={16} />
                <span className="font-mono text-[10px] uppercase tracking-tighter font-bold">AI Automations</span>
             </div>
             <div className="text-3xl font-bold font-mono text-text-primary">20+</div>
             <div className="text-[10px] text-text-secondary font-mono">Deployed globally</div>
          </div>

          <div className="absolute inset-0 m-auto md:inset-auto md:m-0 md:bottom-20 md:left-12 h-fit bg-bg-card/40 backdrop-blur-md border border-border-primary p-8 rounded-2xl w-[85%] max-w-[280px] md:w-64 md:max-w-none lg:animate-none mobile-swipe-2 shadow-xl">
             <div className="flex items-center gap-2 text-accent mb-4">
                <Zap size={18} />
                <span className="font-mono text-xs uppercase tracking-tighter font-bold">System Uptime</span>
             </div>
             <div className="text-4xl font-bold font-mono flex items-end gap-1 text-text-primary">
               99.99<span className="text-lg opacity-60">%</span>
             </div>
             <div className="text-xs text-accent font-mono mt-2 flex items-center gap-1">
               <ArrowRight size={12} className="-rotate-45" /> +0.01% this quarter
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

export const MissionSection = ({ onBack, onExplore }: { onBack?: () => void, onExplore?: () => void }) => {
  return (
    <section className="bg-bg-secondary text-text-primary py-32 px-6 relative overflow-hidden transition-colors duration-500 border-y border-border-primary" style={{ backgroundColor: '#e9f6f7' }}>
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="flex justify-center mb-8">
          <span className="text-6xl font-mono opacity-20 text-text-secondary">“</span>
        </div>
        <TextScroll 
          text="ReliabilityIQ design scalable digital infrastructure for modern organizations — from intelligent automation and AI media systems to geospatial platforms and growth architecture."
          className="text-3xl md:text-5xl font-bold font-mono leading-tight mb-16 tracking-tight text-center text-text-primary"
        />
        
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 lg:gap-24">
          <div className="text-center group border border-transparent hover:border-accent/10 rounded-2xl p-4 transition-all">
            <div className="text-accent text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-2 group-hover:scale-110 transition-transform">4+</div>
            <div className="text-[10px] font-mono tracking-[0.3em] text-text-primary uppercase opacity-60">Years Exp</div>
          </div>
          <div className="text-center group border border-transparent hover:border-accent/10 rounded-2xl p-4 transition-all">
            <div className="text-accent text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-2 group-hover:scale-110 transition-transform">20+</div>
            <div className="text-[10px] font-mono tracking-[0.3em] text-text-primary uppercase opacity-60">Projects</div>
          </div>
          <div className="text-center group border border-transparent hover:border-accent/10 rounded-2xl p-4 transition-all">
            <div className="text-accent text-4xl md:text-5xl lg:text-6xl font-mono font-bold mb-2 group-hover:scale-110 transition-transform">5m</div>
            <div className="text-[10px] font-mono tracking-[0.3em] text-text-primary uppercase opacity-60">Data Points</div>
          </div>
        </div>
      </div>
    </section>
  );
};

