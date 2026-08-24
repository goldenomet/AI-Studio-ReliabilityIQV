
import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useScroll, useSpring, useTransform } from 'motion/react';
export const TextEngine = ({ text, className }: { text: string, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const words = text.split(" ");
  
  return (
    <h3 ref={ref} className={className} style={{ perspective: "1000px" }}>
      {words.map((word, i) => (
        <span key={i} className="inline-block whitespace-nowrap overflow-hidden py-4 -my-4 mr-[0.2em] last:mr-0">
          {word.split("").map((char, j) => (
            <motion.span
              key={j}
              initial={{ y: "110%", opacity: 0 }}
              animate={isInView ? { y: 0, opacity: 1 } : { y: "110%", opacity: 0 }}
              transition={{
                duration: 0.8,
                delay: (i * 0.1) + (j * 0.02),
                ease: [0.33, 1, 0.68, 1]
              }}
              style={{ display: "inline-block" }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </h3>
  );
};

export const TextScroll = ({ text, className }: { text: string, className?: string }) => {
  const ref = useRef(null);
  const { scrollYProgress: rawScrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const scrollYProgress = useSpring(rawScrollYProgress, {
    stiffness: 300, 
    damping: 60,
    restDelta: 0.001
  });

  const words = text.split(" ");
  
  return (
    <h2 ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        
        return (
          <ScrollWord key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </ScrollWord>
        );
      })}
    </h2>
  );
};

export const ScrollWord = ({ children, progress, range }: { children: string, progress: any, range: [number, number], key?: any }) => {
  const opacity = useTransform(progress, range, [0.5, 1]);
  const y = useTransform(progress, range, [5, 0]);
  
  return (
    <span className="inline-block mr-[0.25em] last:mr-0 relative">
      <motion.span style={{ opacity, y }} className="inline-block">
        {children}
      </motion.span>
    </span>
  );
};

export const SmartTypewriter = ({ texts, className }: { texts: string[], className?: string }) => {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = texts[textIndex];
    
    const handleTyping = () => {
      if (!isDeleting) {
        if (charIndex < fullText.length) {
          setCurrentText(fullText.substring(0, charIndex + 1));
          setCharIndex(prev => prev + 1);
        } else {
          // Pause at the end before deleting
          setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        if (charIndex > 0) {
          setCurrentText(fullText.substring(0, charIndex - 1));
          setCharIndex(prev => prev - 1);
        } else {
          setIsDeleting(false);
          setTextIndex(prev => (prev + 1) % texts.length);
        }
      }
    };

    const typingSpeed = isDeleting ? 15 : 30;
    const timeout = setTimeout(handleTyping, typingSpeed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts]);

  return (
    <div className={className}>
      <span className="relative">
        {currentText}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
          className="inline-block w-[2px] h-[1.1em] bg-accent ml-1 align-middle"
        />
      </span>
    </div>
  );
};

export const ScramblyText = ({ texts, className }: { texts: string[], className?: string }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(texts[0]);
  const chars = "!<>-_\\/[]{}—=+*^?#________";
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const triggerScramble = () => {
      const nextIndex = (index + 1) % texts.length;
      const targetText = texts[nextIndex];
      let step = 0;
      const totalSteps = 40;

      const animate = () => {
        if (step <= totalSteps) {
          const progress = step / totalSteps;
          const decodedCount = Math.floor(progress * targetText.length);
          
          const scrambled = targetText
            .split("")
            .map((char, i) => {
              if (i < decodedCount) return char;
              if (char === " ") return " ";
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");
          
          setDisplayText(scrambled);
          step++;
          frameRef.current = requestAnimationFrame(animate);
        } else {
          setDisplayText(targetText);
          setIndex(nextIndex);
        }
      };

      frameRef.current = requestAnimationFrame(animate);
    };

    const timeout = setTimeout(triggerScramble, 4000);
    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(frameRef.current);
    };
  }, [index, texts]);

  return (
    <div className="min-h-[120px] md:min-h-[160px] lg:min-h-[220px] mb-4 md:mb-6 flex items-center">
      <h1 className={`${className} font-mono tracking-tighter uppercase leading-[1.05] md:leading-[0.95]`}>
        {displayText}
      </h1>
    </div>
  );
};

export const PixelSnow = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let particles: { x: number; y: number; size: number; speed: number; opacity: number }[] = [];

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles();
    };

    const initParticles = () => {
      if (!canvas) return;
      // Cap particle count for silky 60fps performance
      const particleCount = Math.min(45, Math.floor((canvas.width * canvas.height) / 16000));
      particles = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.floor(Math.random() * 2) + 1.5,
        speed: Math.random() * 0.6 + 0.25,
        opacity: Math.random() * 0.4 + 0.15,
      }));
    };

    let isVisible = true;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const draw = () => {
      if (isVisible && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0D838E'; 

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          ctx.globalAlpha = p.opacity;
          ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
          
          p.y += p.speed;
          if (p.y > canvas.height) {
            p.y = -p.size;
            p.x = Math.random() * canvas.width;
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    window.addEventListener('resize', resize, { passive: true });
    resize();
    draw();

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-70 z-0 transform-gpu" />;
};

export const RealTimeCursors = () => {
  const [others, setOthers] = useState<any[]>([]);

  useEffect(() => {
    const cursorNames = ['SRE_Lead', 'DevOps_Pro', 'Sys_Architect', 'Operations_AI', 'Infrastructure_Lead'];
    const colors = [
      'rgba(13, 131, 142, 0.7)', 
      'rgba(245, 158, 11, 0.7)', 
      'rgba(16, 185, 129, 0.7)', 
      'rgba(99, 102, 241, 0.7)',
      'rgba(236, 72, 153, 0.7)'
    ];
    
    const targets = [
      { x: 18, y: 22 },
      { x: 28, y: 35 },
      { x: 22, y: 68 },
      { x: 72, y: 48 },
      { x: 78, y: 24 },
    ];

    const initialOthers = Array.from({ length: 5 }, (_, i) => {
      const isHeroSticky = i === 4;
      const target = isHeroSticky ? targets[3] : targets[i % targets.length];
      return {
        id: i,
        name: cursorNames[i],
        color: colors[i],
        x: target.x + (Math.random() * 8 - 4),
        y: target.y + (Math.random() * 8 - 4),
        duration: 3.5 + Math.random() * 2,
      };
    });
    
    setOthers(initialOthers);

    // Update targets at low frequency so CSS/Framer motion interpolates smoothly with 0 CPU strain
    const interval = setInterval(() => {
      if (document.hidden) return;
      setOthers(prev => prev.map((cursor, i) => {
        const isSticky = i === 4;
        const target = isSticky ? targets[3] : targets[Math.floor(Math.random() * targets.length)];
        return {
          ...cursor,
          x: Math.max(10, Math.min(88, target.x + (Math.random() * 12 - 6))),
          y: Math.max(10, Math.min(85, target.y + (Math.random() * 12 - 6))),
          duration: 3 + Math.random() * 2,
        };
      }));
    }, 3200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
      {others.map((cursor) => (
        <motion.div
          key={cursor.id}
          className="absolute transform-gpu will-change-transform"
          animate={{ left: `${cursor.x}%`, top: `${cursor.y}%` }}
          transition={{ duration: cursor.duration, ease: "easeInOut" }}
          style={{ x: '-50%', y: '-50%' }}
        >
          <div className="flex items-center gap-1.5">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-md shrink-0"
            >
              <path
                d="M3 3L11.5 21L14.5 14L21.5 11L3 3Z"
                fill={cursor.color}
                stroke="rgba(0, 0, 0, 0.4)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <div 
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold text-text-primary shadow-lg backdrop-blur-md border border-border-primary whitespace-nowrap"
              style={{ 
                backgroundColor: cursor.color.replace('0.7', '0.12'), 
                boxShadow: `0 0 10px ${cursor.color}` 
              }}
            >
              {cursor.name}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export const GrainyGradient = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base Layer */}
      <div className="absolute inset-0 bg-bg-primary" />
      
      {/* Animated Mesh Gradients */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1.1, 1],
          x: [-50, 50, -20, -50],
          y: [-50, 20, 40, -50],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-[20%] -left-[20%] w-[80%] h-[80%] rounded-full bg-accent/10 blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1.1, 0.9, 1.2, 1.1],
          x: [50, -30, 20, 50],
          y: [40, -60, -20, 40],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-[20%] -right-[20%] w-[70%] h-[70%] rounded-full bg-accent/5 blur-[100px]"
      />
      
      {/* Middle Accent */}
      <motion.div
        animate={{
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-accent/5 via-transparent to-accent/5"
      />

      {/* SVG Grain Overlay */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.2] dark:opacity-[0.4] contrast-150 brightness-100 mix-blend-overlay">
        <filter id="premium-grain">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#premium-grain)" />
      </svg>
    </div>
  );
};

export const CountingNumber = ({
  value,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
}: {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      
      // Easing: easeOutExpo
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = easeProgress * value;
      
      setDisplayValue(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  const formattedValue = decimals > 0 
    ? displayValue.toFixed(decimals) 
    : Math.floor(displayValue).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

