
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'motion/react';
import { ArrowRight, Zap, Globe, Cpu } from 'lucide-react';
import { MagneticGlowButton } from './MagneticGlowButton';
import { FlipCard, TiltCard } from './Cards';
import { ScramblyText, TextEngine, RealTimeCursors, PixelSnow, SmartTypewriter, TextScroll } from './Effects';
import fallbackLogo from '../assets/images/logo.png';
import newImage1778002658766 from '../assets/images/regenerated_image_1778002658766.jpg';
import newImage1778001962382 from '../assets/images/regenerated_image_1778001962382.jpg';

export const HeroSection = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  return (
  <section className="pt-16 pb-20 md:pt-24 md:pb-32 px-6 relative overflow-hidden">
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
          className="font-mono text-sm font-bold text-brand-accent mb-3 uppercase tracking-[0.2em]"
        >
          ReliabilityIQ Ventures
        </motion.div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 rounded-full text-brand-dark/80 font-mono text-xs mb-6 border border-brand-accent/10">
          <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
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
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter grayscale brightness-75 rounded-3xl"
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

export const MissionSection = () => (
  <section className="bg-brand-footer text-white py-32 px-6 relative overflow-hidden transition-colors duration-500">
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
          <div className="text-xs font-mono tracking-widest text-white/40 uppercase">Years Exp</div>
        </div>
        <div className="text-center group">
          <div className="text-brand-accent text-4xl md:text-5xl font-mono font-bold mb-2 group-hover:scale-110 transition-transform">250+</div>
          <div className="text-xs font-mono tracking-widest text-white/40 uppercase">Projects</div>
        </div>
        <div className="text-center group">
          <div className="text-brand-accent text-4xl md:text-5xl font-mono font-bold mb-2 group-hover:scale-110 transition-transform">50m</div>
          <div className="text-xs font-mono tracking-widest text-white/40 uppercase">Data Points</div>
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
  image: any;
  progress: any;
  range: number[];
  onAction: () => void;
}

