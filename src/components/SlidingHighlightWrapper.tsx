import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import sereneGlassLayers from '@/src/assets/images/serene_glass_layers_1795460787074.jpg';

export const ServicesSlidingGrid = ({ services, onAction }: { services: any[], onAction: (s: any) => void, bgImage?: string }) => {
  const cards = services.map((s, idx) => ({
    indexLabel: `0${idx + 1}`,
    title: s.title,
    body: s.description,
    originalService: s
  }));

  const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth < 768 : false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columns = isMobile ? 1 : 2;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState<{ top: number, left: number, width: number, height: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!wrapRef.current) return;
    const wrapRect = wrapRef.current.getBoundingClientRect();
    const cardRect = e.currentTarget.getBoundingClientRect();
    setHighlight({
      top: cardRect.top - wrapRect.top,
      left: cardRect.left - wrapRect.left,
      width: cardRect.width,
      height: cardRect.height
    });
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setHighlight(null);
    setActiveIndex(null);
  };

  return (
    <div 
      className="w-full relative overflow-hidden mb-8 frosted-panel-elevated rounded-[28px]" 
      ref={wrapRef} 
      onMouseLeave={handleMouseLeave}
    >
      {/* Serene Subtle Frosted Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-35 dark:opacity-15">
        <img 
          src={sereneGlassLayers}
          alt="Frosted Architectural Layers"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white/75 via-white/45 to-white/65 dark:from-[#08162e]/85 dark:via-[#0b1f42]/65 dark:to-[#08162e]/85" />
      </div>

      {/* Sliding Azure Frosted Glass Highlight */}
      <div 
        className="absolute pointer-events-none z-[1] rounded-2xl backdrop-blur-xl border border-white/40 shadow-[0_14px_34px_-8px_rgba(29,108,224,0.35)]"
        style={{
          background: 'linear-gradient(135deg, rgba(29, 108, 224, 0.94) 0%, rgba(59, 130, 246, 0.88) 100%)',
          top: highlight ? highlight.top : 0,
          left: highlight ? highlight.left : 0,
          width: highlight ? highlight.width : 0,
          height: highlight ? highlight.height : 0,
          opacity: highlight ? 1 : 0,
          transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)"
        }}
      />
      
      <div 
        className="grid w-full h-full relative z-[2] bg-transparent" 
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {cards.map((card, i) => {
          const isActive = activeIndex === i;
          return (
            <div 
              key={i}
              className={`p-7 md:p-9 border border-border-subtle flex flex-col justify-between cursor-pointer min-h-[260px] md:min-h-[300px] transition-all duration-300 relative ${isActive ? 'z-20' : 'z-10'}`}
              onMouseEnter={(e) => handleMouseEnter(e, i)}
              onClick={() => onAction(card.originalService)}
            >
              <div className="flex flex-col h-full justify-between">
                <div className="flex justify-between items-start w-full gap-4">
                  <h3 className={`font-sans text-xl md:text-2xl font-bold leading-snug max-w-[75%] transition-colors duration-300 ${isActive ? 'text-white' : 'text-text-primary'}`}>
                    {card.title}
                  </h3>
                  
                  <span className={`font-mono text-sm font-semibold tabular-nums transition-colors duration-300 ${isActive ? 'text-white/90' : 'text-accent'}`}>
                    {card.indexLabel}
                  </span>
                </div>

                <div className="flex justify-between items-end w-full mt-auto pt-8 gap-4">
                  <div className="max-w-[78%]">
                    <p className={`font-sans text-sm md:text-[15px] leading-relaxed transition-colors duration-300 ${isActive ? 'text-white/90' : 'text-text-secondary'}`}>
                      {card.body}
                    </p>
                  </div>
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 border ${isActive ? 'bg-white text-[#1d6ce0] border-white shadow-md scale-105' : 'bg-white/60 dark:bg-white/10 text-accent border-border-primary'}`}>
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isActive ? '-rotate-45' : 'rotate-0'}`} />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
