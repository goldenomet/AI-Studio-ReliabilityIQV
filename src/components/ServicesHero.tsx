import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import servicehero from '@/src/assets/images/service hero.png';


export const ServicesHero = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={containerRef} className="relative w-full h-screen z-0 overflow-hidden bg-[#201c18] pt-[110px]">
      
      {/* Background Image Container */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <motion.div 
          style={{ y: y1 }} 
          className="w-full h-[120%] relative"
        >
          <img 
            src={servicehero}
            alt="Modern Architecture" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>
        
        {/* Dark Gradient Overlay at the bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a1a14] via-transparent to-black/10 pointer-events-none" />
      </motion.div>

      {/* Hero Content - Bottom Aligned */}
      <motion.div 
        style={{ opacity: textOpacity }}
        className="absolute bottom-0 left-0 w-full z-10 px-8 md:px-16 pb-12 md:pb-20"
      >
        <div className="max-w-[1400px] mx-auto w-full">
          
          {/* Main Heading */}
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-serif text-white tracking-normal leading-tight mb-4 text-3xl sm:text-4xl md:text-[38px]"
            style={{ 
              maxWidth: '600px',
              minHeight: '50px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            Services that work.
          </motion.h1>

          {/* Horizontal Line */}
          <motion.div 
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2, ease: "circOut" }}
            className="w-full h-[1px] bg-white/30 origin-left mb-8"
          />

          {/* Bottom Row: Section Label + Description */}
          <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-24">
            
            {/* Dot Label */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex items-center gap-3 shrink-0"
            >
              <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              <span className="text-white text-xs md:text-sm font-medium tracking-[0.05em]">Services</span>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-white/80 text-sm md:text-base max-w-xl leading-relaxed font-light"
            >
              Experience features that simplify your tech life with flair and functionality.
            </motion.p>

          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator or additional aesthetics can go here if needed */}
    </section>
  );
};
