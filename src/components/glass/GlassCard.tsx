import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface GlassCardProps extends HTMLMotionProps<'article'> {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  delay?: number;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  interactive = true,
  delay = 0,
  ...rest
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={interactive ? { y: -3 } : undefined}
      transition={{ duration: 0.28, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden champagne-glass-card rounded-[24px] text-white transition-all duration-200 ${className}`}
      {...rest}
    >
      <div aria-hidden="true" className="absolute inset-0 champagne-glass-specular" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/70 to-transparent"
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.article>
  );
};
