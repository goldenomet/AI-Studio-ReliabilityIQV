import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Youtube, Volume2, VolumeX, Minus, Play, Sparkles, ExternalLink } from 'lucide-react';
import { bgMusic } from '../lib/backgroundMusic';

export const WelcomeVideoWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const YOUTUBE_SHORT_ID = "6W0wKw3zz6w";
  const EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_SHORT_ID}?autoplay=1&mute=${isMuted ? 1 : 0}&playsinline=1&controls=1&rel=0&loop=1&playlist=${YOUTUBE_SHORT_ID}&modestbranding=1`;

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuteState = !isMuted;
    setIsMuted(nextMuteState);
    if (!nextMuteState) {
      bgMusic.pause();
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    bgMusic.play();
  };

  const handleToggleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(prev => !prev);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.5 }}
      className="fixed top-24 right-4 sm:right-6 z-40 pointer-events-auto select-none font-sans"
    >
      <AnimatePresence mode="wait">
        {isMinimized ? (
          /* Minimized Serene Frosted Pill */
          <motion.button
            key="minimized-pill"
            layout
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            onClick={() => setIsMinimized(false)}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full frosted-panel-elevated text-text-primary group cursor-pointer hover:-translate-y-0.5 transition-all"
          >
            <span className="w-6 h-6 rounded-full bg-[#1d6ce0] flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform">
              <Play size={11} className="fill-white translate-x-0.5" />
            </span>
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-accent font-mono font-semibold leading-none">ReliabilityIQ</span>
              <span className="text-xs font-bold text-text-primary tracking-tight leading-snug">Watch Tour</span>
            </div>
          </motion.button>
        ) : (
          /* Expanded Frosted Glass Card */
          <motion.div 
            key="expanded-card"
            layout
            className="relative w-56 sm:w-64 frosted-panel-elevated rounded-[24px] overflow-hidden group/card"
          >
            {/* Header Bar */}
            <div className="relative z-10 flex items-center justify-between px-3.5 py-2.5 bg-white/60 dark:bg-white/10 backdrop-blur-xl border-b border-border-subtle text-text-primary">
              <div className="flex items-center gap-2 min-w-0">
                <span className="w-5 h-5 rounded-full bg-red-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                  <Youtube size={12} className="fill-white" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-xs font-bold tracking-tight text-text-primary">
                    Company Tour
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                {/* Audio Button */}
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-mono font-semibold transition-all active:scale-95 cursor-pointer ${
                    isMuted 
                      ? 'bg-white/80 dark:bg-white/10 text-text-secondary hover:text-text-primary border border-border-subtle' 
                      : 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border border-emerald-400/30'
                  }`}
                  title={isMuted ? "Unmute Audio" : "Mute Audio"}
                  aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
                >
                  {isMuted ? <VolumeX size={11} /> : <Volume2 size={11} />}
                  <span>{isMuted ? "Mute" : "Sound"}</span>
                </button>

                {/* Minimize Button */}
                <button
                  onClick={handleToggleMinimize}
                  className="p-1 text-text-secondary hover:text-text-primary hover:bg-white/70 dark:hover:bg-white/10 rounded-full transition-all cursor-pointer"
                  title="Minimize Tour"
                  aria-label="Minimize video"
                >
                  <Minus size={13} strokeWidth={2.5} />
                </button>

                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="p-1 text-text-secondary hover:text-text-primary hover:bg-white/70 dark:hover:bg-white/10 rounded-full transition-all cursor-pointer"
                  title="Close"
                  aria-label="Close video"
                >
                  <X size={13} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* YouTube Shorts Embed Container (9:16 Aspect Ratio) */}
            <div className="relative aspect-[9/16] w-full bg-[#07142b] overflow-hidden">
              <iframe
                src={EMBED_URL}
                title="ReliabilityIQ Introduction"
                className="w-full h-full border-0 block"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>

            {/* Inset Footer Pill */}
            <div className="relative z-10 px-3 py-2 bg-white/70 dark:bg-white/10 backdrop-blur-md border-t border-border-subtle flex items-center justify-between text-[10px] text-text-secondary">
              <span className="flex items-center gap-1 font-mono text-[10px] text-accent font-medium">
                <Sparkles size={11} className="text-accent" />
                Spotlight
              </span>
              <a 
                href="https://youtube.com/shorts/6W0wKw3zz6w?si=Qfu9R35C7ozK7vQh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-text-primary hover:text-accent transition-colors font-semibold"
              >
                YouTube <ExternalLink size={10} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
