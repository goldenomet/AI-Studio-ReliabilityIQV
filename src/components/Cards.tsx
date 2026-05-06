
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { TextEngine } from './Effects';
import { ArrowRight } from 'lucide-react';

export interface StackCardProps {
  i: number;
  title: string;
  description: string;
  icon: any;
  image: string;
  progress: any;
  range: [number, number];
  onAction?: () => void;
}
export const FlipCard = ({ frontContent, backContent, className }: { frontContent: React.ReactNode, backContent: React.ReactNode, className?: string }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className={`relative perspective-1000 cursor-pointer ${className || ''}`}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="absolute inset-0 backface-hidden">
          {frontContent}
        </div>
        <div className="absolute inset-0 backface-hidden [transform:rotateY(180deg)]">
          {backContent}
        </div>
      </motion.div>
    </div>
  );
};

// --- Page Content Components ---

export const TiltCard = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...style
      }}
      className="relative w-full h-full"
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d", width: '100%', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
};

export const StackCard: React.FC<StackCardProps> = ({ i, title, description, icon: Icon, image, progress, range, onAction }) => {
  const scale = useTransform(progress, range, [1, 0.9 + (i * 0.02)]);
  // Keep opacity at 1 so cards are solidly colored and not transparent when stacking
  
  return (
    <div className="h-screen sticky top-0 flex items-center justify-center py-16">
       <motion.div 
         whileHover={{ 
           scale: 1.025,
           boxShadow: "0 60px 120px -30px rgba(13, 131, 142, 0.25), 0 0 50px rgba(13, 131, 142, 0.2)",
           borderColor: "rgba(13, 131, 142, 0.5)",
           y: -8
         }}
         transition={{ type: "spring", stiffness: 400, damping: 25 }}
         style={{ 
           scale, 
           transformOrigin: "center top"
         }}
         className="bg-brand-card p-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-brand-dark/5 flex flex-col md:flex-row gap-6 w-full max-w-4xl h-auto min-h-[280px] md:h-[350px] relative overflow-hidden group transition-colors duration-500 rounded-[30px] md:rounded-[40px] isolate"
       >
         <div className="md:w-1/2 flex flex-col justify-center h-full z-10 w-full">
            <div className="p-3 bg-brand-accent/10 rounded-2xl text-brand-accent w-fit mb-4 md:mb-6 group-hover:bg-brand-accent group-hover:text-white transition-all duration-500">
              <Icon size={24} className="md:w-6 md:h-6" />
            </div>
            <TextEngine text={title} className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 font-mono tracking-tighter text-brand-dark leading-none" />
            <p className="text-brand-dark/60 font-mono text-xs leading-relaxed mb-6 md:mb-8 max-w-sm">
              {description}
            </p>
            <button 
              onClick={onAction}
              className="group/btn flex items-center gap-2 text-brand-accent font-mono text-xs md:text-sm font-bold w-fit bg-brand-bg px-4 py-2 md:px-6 md:py-3 rounded-full hover:bg-brand-accent hover:text-white transition-all duration-300"
            >
              Learn More <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
            </button>
         </div>
         
         <div className="md:w-1/2 relative overflow-hidden rounded-3xl h-64 md:h-auto">
            <div className="absolute inset-0 bg-brand-bg">
               <img 
                 src={image}
                 loading="lazy"
                 referrerPolicy="no-referrer"
                 className="w-full h-full object-cover filter grayscale contrast-125 brightness-90 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700"
                 alt={title}
               />
               <div className="absolute inset-0 bg-brand-accent/10 mix-blend-overlay group-hover:opacity-0 transition-opacity"></div>
            </div>
            <div className="absolute bottom-8 right-8">
               <div className="h-12 w-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                  <span className="font-mono text-xs font-bold">0{i + 1}</span>
               </div>
            </div>
         </div>

         {/* Fluid mesh background decorative element */}
         <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-accent/10 transition-colors"></div>
       </motion.div>
    </div>
  )
}

