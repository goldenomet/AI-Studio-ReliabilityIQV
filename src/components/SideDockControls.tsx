import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, GripVertical } from 'lucide-react';
import type { DockSide } from '../hooks/useMovableDock';

export const SideDockGuide = ({ side }: { side: DockSide | null }) => {
  return (
    <AnimatePresence>
      {side && (
        <motion.div
          key={`dock-guide-${side}`}
          initial={{ opacity: 0, scaleY: 0.7 }}
          animate={{ opacity: 1, scaleY: 1 }}
          exit={{ opacity: 0, scaleY: 0.7 }}
          transition={{ duration: 0.16 }}
          className={`fixed top-20 bottom-6 w-2.5 z-[39] pointer-events-none rounded-full ${
            side === 'left' ? 'left-1.5' : 'right-1.5'
          } bg-gradient-to-b from-cyan-400/75 via-blue-500/85 to-indigo-500/75 shadow-[0_0_24px_rgba(29,108,224,0.65)]`}
        />
      )}
    </AnimatePresence>
  );
};

interface MinimizeEdgeHandleProps {
  side: DockSide;
  onMinimize: (e: React.MouseEvent) => void;
  title?: string;
  className?: string;
}

export const MinimizeEdgeHandle = ({
  side,
  onMinimize,
  title = 'Minimize to side of screen',
  className = '',
}: MinimizeEdgeHandleProps) => {
  return (
    <button
      type="button"
      data-no-drag="true"
      onClick={onMinimize}
      title={title}
      aria-label={title}
      className={`w-5 h-5 rounded-full bg-white/95 dark:bg-[#11264f]/95 border border-blue-200/90 dark:border-blue-300/30 text-text-secondary hover:text-accent hover:border-accent shadow-md flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-90 ${className}`}
    >
      {side === 'left' ? (
        <ChevronLeft size={12} strokeWidth={2.5} />
      ) : (
        <ChevronRight size={12} strokeWidth={2.5} />
      )}
    </button>
  );
};

interface DockedSideTabProps {
  side: DockSide;
  label: string;
  icon: React.ReactNode;
  accentDotClass?: string;
  onRestore: (e: React.MouseEvent) => void;
}

export const DockedSideTab = ({
  side,
  label,
  icon,
  accentDotClass = 'bg-accent',
  onRestore,
}: DockedSideTabProps) => {
  const isLeft = side === 'left';

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: isLeft ? -16 : 16, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: isLeft ? -16 : 16, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      onClick={onRestore}
      aria-label={`Restore ${label}`}
      title={`Restore ${label} (or drag to move)`}
      className={`group flex items-center gap-1 py-2.5 backdrop-blur-2xl bg-white/85 dark:bg-[#0e2044]/85 border border-blue-200/80 dark:border-blue-300/25 shadow-[0_8px_24px_-4px_rgba(15,37,71,0.22)] text-text-primary hover:bg-white dark:hover:bg-[#132b5a] hover:border-accent/60 transition-all duration-200 cursor-grab active:cursor-grabbing select-none touch-none ${
        isLeft
          ? 'pl-1.5 pr-2 rounded-r-2xl border-l-0 flex-row'
          : 'pr-1.5 pl-2 rounded-l-2xl border-r-0 flex-row-reverse'
      }`}
    >
      <span className={`w-1.5 h-4 rounded-full shrink-0 ${accentDotClass} opacity-80 group-hover:opacity-100 transition-opacity`} />
      <span className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
        {icon}
      </span>
      <span className="text-text-secondary group-hover:text-accent transition-colors shrink-0">
        {isLeft ? <ChevronRight size={13} strokeWidth={2.5} /> : <ChevronLeft size={13} strokeWidth={2.5} />}
      </span>
      <GripVertical size={10} className="text-text-secondary/45 hidden sm:block shrink-0" />
    </motion.button>
  );
};
