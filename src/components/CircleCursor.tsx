import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export const CircleCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700, mass: 0.1 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="fixed top-0 left-0 rounded-full border border-brand-accent pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        translateX: "-50%",
        translateY: "-50%",
      }}
      animate={{
        width: isHovering ? 48 : 32,
        height: isHovering ? 48 : 32,
        backgroundColor: isHovering ? "white" : "rgba(255, 255, 255, 0)"
      }}
      transition={{
        width: { type: "spring", stiffness: 300, damping: 20 },
        height: { type: "spring", stiffness: 300, damping: 20 },
        backgroundColor: { duration: 0.2 }
      }}
    />
  );
};
