import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Youtube, Volume2, VolumeX } from 'lucide-react';
import { bgMusic } from '../lib/backgroundMusic';

export const WelcomeVideoWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const YOUTUBE_SHORT_ID = "6W0wKw3zz6w";
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

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: -20 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.6 }}
      className="fixed top-24 right-4 sm:right-6 z-50 pointer-events-auto select-none font-sans"
    >
      {/* Full Floating YouTube Video Card */}
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
          <div className="flex items-center gap-1.5">
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
        </div>
      </motion.div>
    </motion.div>
  );
};
