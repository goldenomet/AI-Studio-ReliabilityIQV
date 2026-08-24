import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const brandName = "ReliabilityIQ";
  const letters = Array.from(brandName);

  useEffect(() => {
    // Total animation time calculation:
    // Delay: 0.2s
    // Stagger for 13 letters: 13 * 0.1s = 1.3s
    // Spring physics settling time ~ 0.5s
    // Total visual reveal ~ 2.0s
    // Hold for briefly before transitioning out
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 20,
      scale: 0.9,
    },
  };

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-bg-primary"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.8, ease: "easeInOut" } }}
    >
      <motion.div
        className="flex overflow-hidden px-4 py-8"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {letters.map((letter, index) => (
          <motion.span
            key={index}
            variants={child}
            className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono tracking-tight text-text-primary"
          >
            {letter === " " ? "\u00A0" : letter}
          </motion.span>
        ))}
      </motion.div>
    </motion.div>
  );
};
