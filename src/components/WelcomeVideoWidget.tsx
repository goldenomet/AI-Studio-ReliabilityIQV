import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Minimize2, ExternalLink, Youtube, Volume2, VolumeX } from 'lucide-react';
import { bgMusic } from '../lib/backgroundMusic';

export const WelcomeVideoWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const YOUTUBE_SHORT_ID = "6W0wKw3zz6w";
  const YOUTUBE_URL = `https://youtube.com/shorts/${YOUTUBE_SHORT_ID}?si=Qfu9R35C7ozK7vQh`;
  const EMBED_URL = `https://www.youtube-nocookie.com/embed/${YOUTUBE_SHORT_ID}?autoplay=1&mute=${isMuted ? 1 : 0}&playsinline=1&controls=1&rel=0&loop=1&playlist=${YOUTUBE_SHORT_ID}&modestbranding=1`;

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const nextMuteState = !isMuted;
    setIsMuted(nextMuteState);
    if (!nextMuteState) {
      // Pause background music if unmuting video
      bgMusic.pause();
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    bgMusic.play();
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMinimized(true);
  };

  const handleExpand = () => {
    setIsMinimized(false);
    bgMusic.pause();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={
        isMinimized 
          ? { opacity: 0.95, scale: 0.85, x: 0, y: 0 } 
          : { opacity: 1, scale: 1, x: 0, y: 0 }
      }
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: isMinimized ? 0 : 0.6 }}
      className="fixed top-24 right-4 sm:right-6 z-50 pointer-events-auto select-none font-sans"
    >
      {/* Minimized Pill View */}
      {isMinimized ? (
        <motion.div
          layout
          onClick={handleExpand}
          className="flex items-center gap-2 px-3.5 py-2 bg-bg-card/95 hover:bg-bg-card text-text-primary backdrop-blur-xl border border-border-primary rounded-full shadow-xl cursor-pointer hover:border-red-500/50 transition-all group"
        >
          <div className="w-5 h-5 rounded-full bg-red-600/20 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
            <Youtube size={12} className="fill-red-500 text-red-500" />
          </div>
          <p className="text-xs font-semibold tracking-wide">Watch Intro</p>
          <button
            onClick={handleClose}
            className="text-text-secondary hover:text-text-primary p-0.5 rounded-full hover:bg-white/10 transition-colors ml-0.5"
            title="Close"
            aria-label="Close widget"
          >
            <X size={12} />
          </button>
        </motion.div>
      ) : (
        /* Full Floating YouTube Video Card */
        <motion.div 
          layout
          className="relative w-52 sm:w-60 md:w-64 bg-black/95 backdrop-blur-2xl border border-border-primary rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group/card"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-3 py-2 bg-black/80 border-b border-white/10 text-white text-[11px] font-medium">
            <div className="flex items-center gap-2 truncate">
              <Youtube size={14} className="text-red-500 fill-red-500 shrink-0" />
              <p className="truncate font-semibold tracking-tight text-white/90">Intro Video</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleToggleMute}
                className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors ${
                  isMuted ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30'
                }`}
                title={isMuted ? "Unmute Audio" : "Mute Audio"}
                aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
              >
                {isMuted ? <VolumeX size={12} /> : <Volume2 size={12} />}
                <span>{isMuted ? "Muted" : "Audio On"}</span>
              </button>
              <a
                href={YOUTUBE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Open on YouTube"
                aria-label="Open on YouTube"
              >
                <ExternalLink size={13} />
              </a>
              <button
                onClick={handleMinimize}
                className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Minimize"
                aria-label="Minimize video"
              >
                <Minimize2 size={13} />
              </button>
              <button
                onClick={handleClose}
                className="p-1 text-white/70 hover:text-white hover:bg-white/10 rounded transition-colors"
                title="Close"
                aria-label="Close video"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* YouTube Shorts Embed Container (9:16 Aspect Ratio) */}
          <div className="relative aspect-[9/16] w-full bg-black overflow-hidden">
            <iframe
              src={EMBED_URL}
              title="ReliabilityIQ Introduction"
              className="w-full h-full border-0 block"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* Floating Audio Control Overlay Button */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 pointer-events-auto">
              <button
                type="button"
                onClick={handleToggleMute}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold shadow-xl backdrop-blur-md transition-all active:scale-95 ${
                  isMuted 
                    ? 'bg-black/80 hover:bg-black text-amber-300 border-amber-500/40 hover:border-amber-400' 
                    : 'bg-black/80 hover:bg-black text-emerald-300 border-emerald-500/40 hover:border-emerald-400'
                }`}
              >
                {isMuted ? (
                  <>
                    <VolumeX size={14} className="text-amber-400 animate-pulse" />
                    <span>Tap to Unmute</span>
                  </>
                ) : (
                  <>
                    <Volume2 size={14} className="text-emerald-400" />
                    <span>Sound Active</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};
