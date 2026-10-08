import React, { useState } from 'react';
import { motion } from 'motion/react';

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
          className="h-7 md:h-8 w-auto object-contain block"
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
        <div className="h-8 md:h-9 w-auto flex items-center justify-center px-2 py-1 rounded bg-white shadow-xs shrink-0 border border-border-primary/20">
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
        <div className="h-8 md:h-9 w-auto flex items-center justify-center px-2 py-1 rounded bg-white shadow-xs shrink-0 border border-border-primary/20">
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
        <div className="h-8 md:h-9 w-auto flex items-center justify-center px-2 py-1 rounded bg-white shadow-xs shrink-0 border border-border-primary/20">
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
        <div className="h-8 md:h-9 w-auto flex items-center justify-center p-0.5 rounded bg-white/95 shadow-xs shrink-0 border border-border-primary/20">
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
        <div className="h-8 md:h-9 w-auto flex items-center justify-center rounded overflow-hidden shadow-xs shrink-0 border border-border-primary/20 bg-[#54676b]">
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
        <div className="h-8 md:h-9 w-auto flex items-center justify-center rounded overflow-hidden shadow-xs shrink-0 border border-border-primary/20 bg-[#05182d]">
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

  // Duplicating the 5 logos to create a seamless infinite marquee
  const tickerItems = [...companies, ...companies, ...companies, ...companies];

  return (
    <section className="py-12 md:py-16 relative bg-bg-primary overflow-hidden border-y border-border-primary/40 transition-colors duration-500">
      {/* Subtle Background Glows */}
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-80 h-28 bg-accent/10 blur-[90px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-80 h-28 bg-blue-500/10 blur-[90px] rounded-full pointer-events-none" />

      {/* Clean Centered Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8 md:mb-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-accent font-semibold">
            Trusted Ecosystem
          </span>
        </div>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold font-mono tracking-tight text-text-primary">
          Companies We Work With
        </h2>
      </div>

      {/* Main Carousel Wrapper with Blur Edge Masking */}
      <div 
        className="relative w-full overflow-hidden py-2"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Left Edge Blur & Gradient Mask */}
        <div className="absolute left-0 top-0 bottom-0 w-24 md:w-44 z-20 pointer-events-none bg-gradient-to-r from-bg-primary via-bg-primary/90 to-transparent backdrop-blur-[2px]" />
        
        {/* Right Edge Blur & Gradient Mask */}
        <div className="absolute right-0 top-0 bottom-0 w-24 md:w-44 z-20 pointer-events-none bg-gradient-to-l from-bg-primary via-bg-primary/90 to-transparent backdrop-blur-[2px]" />

        {/* Ticker Track */}
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
                duration: 25,
                ease: 'linear',
              },
            }}
          >
            {tickerItems.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                className="shrink-0 px-7 py-3.5 rounded-xl bg-bg-secondary/40 hover:bg-bg-secondary/80 border border-border-primary/40 hover:border-accent/50 transition-all duration-300 hover:scale-105 group backdrop-blur-md shadow-xs flex items-center justify-center cursor-default"
              >
                <div className="transition-transform duration-300 group-hover:scale-102">
                  {item.renderLogo()}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
