import React, { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  MotionStyle,
} from 'motion/react';

export interface UseSectionFlowOptions {
  /**
   * - "full": Smooth GPU transform (y + scale) + opacity on enter & exit.
   * - "fade": Opacity-only transition so nested `position: sticky` or GSAP ScrollTrigger geometry stays intact.
   */
  mode?: 'full' | 'fade';
  /**
   * Hero sections start fully visible at rest and gently transition out as the user scrolls past.
   */
  isHero?: boolean;
  /**
   * Disable exit transition (useful for compact bottom footers).
   */
  skipExit?: boolean;
  /**
   * Optional existing ref if the section already attaches a scroll ref.
   */
  externalRef?: React.RefObject<HTMLElement | null>;
}

export function useSectionFlow<T extends HTMLElement = HTMLElement>({
  mode = 'full',
  isHero = false,
  skipExit = false,
  externalRef,
}: UseSectionFlowOptions = {}) {
  const internalRef = useRef<T>(null);
  const targetRef = (externalRef as React.RefObject<T | null>) || internalRef;
  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress: rawEnter } = useScroll({
    target: targetRef,
    offset: ['start 0.97', 'start 0.7'],
  });

  const { scrollYProgress: rawExit } = useScroll({
    target: targetRef,
    offset: ['end 0.3', 'end 0'],
  });

  const smoothEnter = useSpring(rawEnter, {
    stiffness: 170,
    damping: 26,
    mass: 0.55,
  });

  const smoothExit = useSpring(rawExit, {
    stiffness: 170,
    damping: 26,
    mass: 0.55,
  });

  const opacity = useTransform(
    [smoothEnter, smoothExit],
    ([enter, exit]: number[]) => {
      const enterAlpha = isHero ? 1 : Math.min(1, Math.max(0, enter));
      const exitAlpha = skipExit ? 1 : 1 - Math.min(1, Math.max(0, exit)) * 0.82;
      return Number((enterAlpha * exitAlpha).toFixed(3));
    }
  );

  const y = useTransform(
    [smoothEnter, smoothExit],
    ([enter, exit]: number[]) => {
      if (mode === 'fade') return 0;
      const enterY = isHero ? 0 : (1 - Math.min(1, Math.max(0, enter))) * 34;
      const exitY = skipExit ? 0 : -Math.min(1, Math.max(0, exit)) * 26;
      return enterY + exitY;
    }
  );

  const scale = useTransform(
    [smoothEnter, smoothExit],
    ([enter, exit]: number[]) => {
      if (mode === 'fade') return 1;
      const enterScale = isHero
        ? 1
        : 0.975 + Math.min(1, Math.max(0, enter)) * 0.025;
      const exitDelta = skipExit ? 0 : Math.min(1, Math.max(0, exit)) * 0.022;
      return Number((enterScale - exitDelta).toFixed(4));
    }
  );

  const style: MotionStyle = shouldReduceMotion
    ? {}
    : mode === 'fade'
      ? { opacity }
      : {
          opacity,
          y,
          scale,
          willChange: 'transform, opacity',
        };

  return { ref: targetRef, style };
}

/**
 * Shared page-level enter/exit variants for AnimatePresence route transitions.
 */
export const PAGE_TRANSITION_PROPS = {
  initial: { opacity: 0, y: 18, scale: 0.992, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -14, scale: 0.992, filter: 'blur(6px)' },
  transition: { duration: 0.42, ease: [0.22, 1, 0.36, 1] as const },
};

interface SectionFlowProps extends Omit<UseSectionFlowOptions, 'externalRef'> {
  children: React.ReactNode;
  className?: string;
}

export const SectionFlow: React.FC<SectionFlowProps> = ({
  children,
  className = '',
  ...options
}) => {
  const { ref, style } = useSectionFlow<HTMLDivElement>(options);

  return (
    <motion.div ref={ref} style={style} className={className}>
      {children}
    </motion.div>
  );
};

export const FlowSection: React.FC<SectionFlowProps> = ({
  children,
  className = '',
  ...options
}) => {
  const { ref, style } = useSectionFlow<HTMLElement>(options);

  return (
    <motion.section ref={ref} style={style} className={className}>
      {children}
    </motion.section>
  );
};
