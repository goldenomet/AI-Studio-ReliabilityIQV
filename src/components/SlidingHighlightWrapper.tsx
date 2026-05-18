import React, { useRef, useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import section1 from '@/src/assets/images/section1.png';

export const ServicesSlidingGrid = ({ services, onAction, bgImage }: { services: any[], onAction: (s: any) => void, bgImage?: string }) => {
  const cards = services.map(s => ({
    category: "SERVICE",
    title: s.title,
    body: s.description,
    link: "#",
    linkLabel: "View Details",
    originalService: s
  }));

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const columns = isMobile ? 1 : 2;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [highlight, setHighlight] = useState<{ top: number, left: number, width: number, height: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [arrowVisible, setArrowVisible] = useState(false);
  const ARROW_SIZE = 64;

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
    setArrowVisible(true);
  };

  const handleMouseLeave = () => {
    setHighlight(null);
    setActiveIndex(null);
    setArrowVisible(false);
  };

  return (
    <div 
      className="w-full relative shadow-2xl overflow-hidden mb-10 border border-border-primary bg-bg-card/40 backdrop-blur-md rounded-[24px]" 
      ref={wrapRef} 
      onMouseLeave={handleMouseLeave}
    >
      {bgImage && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src={section1}
            alt="Grid Background"
            className="w-full h-full object-cover opacity-[0.85] mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-card/90 via-transparent to-bg-card/40" />
          <div className="absolute inset-0 bg-bg-primary/40" />
        </div>
      )}

      <div 
        className="absolute pointer-events-none z-[1] shadow-2xl"
        style={{
          backgroundColor: '#1d8a7d',
          top: highlight ? highlight.top : 0,
          left: highlight ? highlight.left : 0,
          width: highlight ? highlight.width : 0,
          height: highlight ? highlight.height : 0,
          opacity: highlight ? 1 : 0,
          transform: highlight ? "scale(1.02)" : "scale(1)",
          transition: "all 0.4s ease"
        }}
      />
      
      <div 
        className="grid w-full h-full relative z-[2] bg-transparent" 
        style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
      >
        {cards.map((card, i) => {
          const isActive = activeIndex === i;
          const isAnyActive = activeIndex !== null;
          return (
            <div 
              key={i}
              className={`p-6 md:p-8 border-[0.5px] border-border-primary/50 flex flex-col justify-between cursor-pointer min-h-[300px] md:min-h-[350px] transition-all duration-400 ease-out relative ${isActive ? 'z-20' : 'z-10'} ${isAnyActive && !isActive ? 'opacity-55' : 'opacity-100'}`}
              onMouseEnter={(e) => handleMouseEnter(e, i)}
              onClick={() => onAction(card.originalService)}
            >
              <div className={`flex flex-col h-full justify-between transition-transform duration-400 ease-out ${isActive ? 'scale-[1.02]' : 'scale-100'} origin-center`}>
                
                <div className="flex justify-between items-start w-full gap-4">
                  <h3 className={`font-sans text-xl md:text-[26px] font-medium leading-[1.1] max-w-[70%] transition-colors duration-400 ${isActive ? 'text-white' : 'text-text-primary'}`}>
                    {card.title}
                  </h3>
                  
                  <div className={`px-4 py-1 rounded-full border transition-all duration-400 whitespace-nowrap ${isActive ? 'border-white/50 text-white opacity-100' : 'opacity-0'}`}>
                    <span className="font-sans text-xs mb-0">{card.category}</span>
                  </div>
                </div>

                <div className="flex justify-between items-end w-full mt-auto pt-8 gap-4">
                  <div className={`max-w-[75%] transition-opacity duration-400 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                    <p className="font-sans text-sm md:text-base leading-snug text-white/90">
                      {card.body}
                    </p>
                  </div>
                  
                  <span className={`font-sans text-lg md:text-xl font-bold transition-colors duration-400 ${isActive ? 'text-white' : 'text-text-primary'}`}>
                    ({i + 1})
                  </span>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

