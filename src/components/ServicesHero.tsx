import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export const ServicesHero = () => {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -300]);

  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  const displacementScale = useSpring(30, { stiffness: 50, damping: 20 });

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 40;
      const y = (e.clientY / innerHeight - 0.5) * 40;
      mouseX.set(x);
      mouseY.set(y);

      // Calculate mouse velocity for displacement scale
      const vX = e.clientX - lastX;
      const vY = e.clientY - lastY;
      const velocity = Math.sqrt(vX * vX + vY * vY);
      
      // Map velocity to displacement scale (base 30, max 100)
      displacementScale.set(Math.min(30 + velocity * 2, 100));

      lastX = e.clientX;
      lastY = e.clientY;
      
      // Decay scale back to 30 when mouse stops
      clearTimeout((window as any).mouseStopTimeout);
      (window as any).mouseStopTimeout = setTimeout(() => {
        displacementScale.set(30);
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, displacementScale]);
  
  return (
    <section ref={containerRef} className="relative w-full h-[calc(100svh+120px)] min-h-[700px] z-0 -mt-[120px] flex items-center justify-center bg-white overflow-hidden pb-[120px] pt-[120px]">
      
      {/* SVG Liquid Filter Definition */}
      <svg className="hidden">
        <filter id="liquid">
          <feTurbulence type="fractalNoise" baseFrequency="0.015 0.02" numOctaves="3" result="noise" seed="0">
             <animate attributeName="baseFrequency" dur="15s" values="0.015 0.02; 0.02 0.01; 0.015 0.02" repeatCount="indefinite" />
          </feTurbulence>
          <motion.feDisplacementMap 
            in="SourceGraphic" 
            in2="noise" 
            scale={displacementScale} 
            xChannelSelector="R" 
            yChannelSelector="G" 
          />
        </filter>
      </svg>

      {/* Background Featured Image */}
      <motion.div 
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <motion.div 
          style={{ y: y1, height: '150%', x: mouseX }} 
          className="w-full relative scale-[1.1]"
        >
          <motion.img 
            style={{ y: mouseY, filter: 'url(#liquid) grayscale(100%)' }}
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2564&auto=format&fit=crop" 
            alt="Digital Infrastructure" 
            className="w-full h-full object-cover opacity-80"
          />
        </motion.div>
        {/* Overlay to ensure text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/20 via-white/50 to-white pointer-events-none" />
      </motion.div>

      {/* Foreground Content */}
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-10 flex flex-col items-center justify-center max-w-4xl px-6 text-center"
      >
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-[80px] font-medium tracking-tight text-[#202020] leading-[1.05] mb-6 font-sans bg-white/60 backdrop-blur-md p-4 rounded-3xl mt-2 shadow-sm border border-white/50"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.5 }
            }
          }}
          initial="hidden"
          animate="show"
        >
          <motion.span variants={{ hidden: { opacity: 0, y: 20, filter: 'blur(5px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="inline-block mr-[0.2em]">Services</motion.span>
          <br className="hidden md:block" />
          <motion.span variants={{ hidden: { opacity: 0, y: 20, filter: 'blur(5px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="inline-block mr-[0.2em] text-brand-accent">that</motion.span>
          <motion.span variants={{ hidden: { opacity: 0, y: 20, filter: 'blur(5px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="inline-block text-brand-accent">work.</motion.span>
        </motion.h1>
        
        <motion.p 
          className="text-base md:text-xl text-[#202020]/80 max-w-2xl leading-relaxed bg-white/60 backdrop-blur-md px-6 py-4 rounded-2xl shadow-sm border border-white/50 flex flex-wrap justify-center overflow-hidden"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.04, delayChildren: 1.0 }
            }
          }}
          initial="hidden"
          animate="show"
        >
          {"ReliabilityIQ Ventures transforms how organizations understand and manage their technological infrastructure through rigorous research and documentation.".split(" ").map((word, i) => (
            <motion.span key={i} variants={{ hidden: { opacity: 0, y: 15, filter: 'blur(3px)' }, show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } }} className="inline-block mr-[0.3em]">
              {word}
            </motion.span>
          ))}
        </motion.p>
      </motion.div>

    </section>
  );
};
