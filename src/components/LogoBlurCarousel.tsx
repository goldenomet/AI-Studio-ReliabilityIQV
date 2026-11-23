import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useSectionFlow } from './SectionFlow';

interface Company {
  id: string;
  name: string;
  renderLogo: () => React.ReactNode;
}

const companies: Company[] = [
  {
    id: 'google-ai-studio',
    name: 'Google AI Studio',
    renderLogo: () => (
      <div className="flex items-center">
        <img
          src="/Google%20AI%20Studio%20Gradient%20Wordmark.png"
          alt="Google AI Studio"
          className="h-7 md:h-8 w-auto object-contain block drop-shadow-xs"
          loading="eager"
        />
      </div>
    ),
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    renderLogo: () => (
      <div className="flex items-center">
        <div className="h-8 md:h-9 w-auto flex items-center justify-center px-2 py-1 rounded-lg bg-white shadow-xs shrink-0 border border-white/30">
          <img
            src="/cloudflare.png"
            alt="Cloudflare"
            className="h-6 md:h-7 w-auto object-contain block"
            loading="eager"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'invideo',
    name: 'InVideo',
    renderLogo: () => (
      <div className="flex items-center">
        <div className="h-8 md:h-9 w-auto flex items-center justify-center px-2 py-1 rounded-lg bg-white shadow-xs shrink-0 border border-white/30">
          <img
            src="/invideo-logo.png"
            alt="InVideo"
            className="h-6 md:h-7 w-auto object-contain block"
            loading="eager"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    renderLogo: () => (
      <div className="flex items-center">
        <div className="h-8 md:h-9 w-auto flex items-center justify-center px-2 py-1 rounded-lg bg-white shadow-xs shrink-0 border border-white/30">
          <img
            src="/Linkedin.png"
            alt="LinkedIn"
            className="h-5 md:h-6 w-auto object-contain block"
            loading="eager"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'chify-nigeria',
    name: 'Chify Nigeria',
    renderLogo: () => (
      <div className="flex items-center">
        <div className="h-8 md:h-9 w-auto flex items-center justify-center p-1 rounded-lg bg-white shadow-xs shrink-0 border border-white/30">
          <img
            src="/chify-nigeria-logo.png"
            alt="Chify Nigeria"
            className="h-7 md:h-8 w-auto object-contain block"
            loading="eager"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'bytes-ahead',
    name: 'Bytes Ahead Limited',
    renderLogo: () => (
      <div className="flex items-center">
        <div className="h-8 md:h-9 w-auto flex items-center justify-center rounded-lg overflow-hidden shadow-xs shrink-0 border border-white/30 bg-[#54676b]">
          <img
            src="/Bytes%20Ahead.jpg"
            alt="Bytes Ahead Limited"
            className="h-8 md:h-9 w-auto object-contain block"
            loading="eager"
          />
        </div>
      </div>
    ),
  },
  {
    id: 'christmaths-digital',
    name: 'Christmaths Digital Network Services',
    renderLogo: () => (
      <div className="flex items-center">
        <div className="h-8 md:h-9 w-auto flex items-center justify-center rounded-lg overflow-hidden shadow-xs shrink-0 border border-white/30 bg-[#05182d]">
          <img
            src="/Christmaths%20Digital%20Network%20Logo.png"
            alt="Christmaths Digital Network Services"
            className="h-8 md:h-9 w-auto object-contain block"
            loading="eager"
          />
        </div>
      </div>
    ),
  },
];

export const LogoBlurCarousel: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { ref: carouselFlowRef, style: carouselFlowStyle } = useSectionFlow();

  // Duplicating the logos to create a seamless infinite marquee
  const tickerItems = [...companies, ...companies, ...companies, ...companies];

  return (
    <motion.section
      ref={carouselFlowRef}
      style={carouselFlowStyle}
      className="py-14 md:py-18 relative bg-white/40 dark:bg-white/5 backdrop-blur-xl overflow-hidden border-y border-border-primary"
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8 text-center relative z-10">
        <div className="font-mono text-xs uppercase tracking-widest text-accent font-semibold mb-2">
          Trusted Ecosystem
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-text-primary">
          Companies We Work With
        </h2>
      </div>

      {/* Carousel Wrapper with Soft Atmospheric Edge Masking */}
      <div 
        className="relative w-full overflow-hidden py-3"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-20 pointer-events-none bg-gradient-to-r from-[#eef5ff] via-[#eef5ff]/85 to-transparent dark:from-[#08152e] dark:via-[#08152e]/85" />
        
        {/* Right Fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-20 pointer-events-none bg-gradient-to-l from-[#eef5ff] via-[#eef5ff]/85 to-transparent dark:from-[#08152e] dark:via-[#08152e]/85" />

        {/* Marquee Track */}
        <div className="flex items-center gap-6 md:gap-8 w-max">
          <motion.div
            className="flex items-center gap-6 md:gap-8"
            animate={{
              x: isHovered ? undefined : ['0%', '-50%'],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: 'loop',
                duration: 28,
                ease: 'linear',
              },
            }}
          >
            {tickerItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="shrink-0 px-6 py-3.5 rounded-2xl bg-white/85 dark:bg-white/95 hover:bg-white border border-white/95 hover:border-blue-300 transition-all duration-300 hover:-translate-y-0.5 group shadow-[0_6px_22px_rgba(30,64,175,0.06)] flex items-center justify-center cursor-default"
              >
                <div className="transition-transform duration-300 group-hover:scale-105">
                  {item.renderLogo()}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
