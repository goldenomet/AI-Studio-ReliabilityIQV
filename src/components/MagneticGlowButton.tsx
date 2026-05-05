import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';

export const MagneticGlowButton: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}> = ({ children, className = '', onClick, type = 'button', disabled = false }) => {
  const boundingRef = useRef<HTMLButtonElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!boundingRef.current || !glowRef.current || disabled) return;
    const { left, top, width, height } = boundingRef.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    const centerX = width / 2;
    const centerY = height / 2;
    const maxPull = 15;
    
    const pullX = ((x - centerX) / centerX) * maxPull;
    const pullY = ((y - centerY) / centerY) * maxPull;

    setPosition({ x: pullX, y: pullY });
    setOpacity(1);
    
    glowRef.current.style.setProperty('--x', `${x}px`);
    glowRef.current.style.setProperty('--y', `${y}px`);
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
    setOpacity(0);
  };

  return (
    <motion.button
      ref={boundingRef}
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={`relative overflow-hidden group ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      <div 
        ref={glowRef}
        className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
        style={{
          background: `radial-gradient(120px circle at var(--x) var(--y), rgba(255,255,255,0.4), transparent 40%)`
        }}
      />
      <span className="relative z-10 flex items-center justify-center pointer-events-none">{children}</span>
    </motion.button>
  );
};
