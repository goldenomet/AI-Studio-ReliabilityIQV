
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Founder {
  name: string;
  image: string;
}

interface FounderToggleProps {
  founders: Founder[];
}

const FounderToggle: React.FC<FounderToggleProps> = ({ founders }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleStackClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % founders.length);
  };

  const bgColors = ['bg-accent/80', 'bg-accent/60', 'bg-accent/40'];
  const currentFounder = founders[currentIndex];

  return (
    <span 
      className="inline-block relative z-20 align-middle w-[140px] h-[90px] md:w-[200px] md:h-[130px] mx-2 cursor-pointer group transition-transform duration-300 ease-out hover:scale-[1.03]"
      onClick={handleStackClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title="Click to see more of us"
    >
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

      <div className="absolute -inset-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(var(--color-accent)_0.8px,transparent_0.8px)] [background-size:12px_12px] opacity-20" />
      </div>

      {founders.map((founder, index) => {
        const relativeIndex = (index - currentIndex + founders.length) % founders.length;
        
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
            {isFront && (
              <div className="absolute inset-0 bg-linear-to-tr from-white/10 to-transparent pointer-events-none" />
            )}
          </motion.div>
        );
      })}
    </span>
  );
};

export default FounderToggle;
