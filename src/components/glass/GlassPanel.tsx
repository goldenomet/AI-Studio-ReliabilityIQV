import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

export interface GlassPanelProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glossy?: boolean;
  delay?: number;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  glossy = true,
  delay = 0,
  ...rest
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative overflow-hidden champagne-glass-panel rounded-[26px] text-white ${className}`}
      {...rest}
    >
      {glossy && (
        <>
          <div aria-hidden="true" className="absolute inset-0 champagne-glass-specular" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/75 to-transparent"
          />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};
