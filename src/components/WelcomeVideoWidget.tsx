import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, X, Volume2, VolumeX } from 'lucide-react';
import { bgMusic } from '../lib/backgroundMusic';

export const WelcomeVideoWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startPlayback = useCallback(() => {
    if (!videoRef.current) return;
    
    videoRef.current.muted = false;
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
        })
        .catch(() => {
          // Autoplay with sound prevented by browser policy -> start muted, then unmute on first gesture
          if (videoRef.current) {
            videoRef.current.muted = true;
            setIsMuted(true);
            videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }

          const unmuteOnInteraction = () => {
            if (videoRef.current && !videoRef.current.paused) {
              videoRef.current.muted = false;
              setIsMuted(false);
            }
          };

          window.addEventListener('click', unmuteOnInteraction, { once: true, passive: true });
          window.addEventListener('keydown', unmuteOnInteraction, { once: true, passive: true });
          window.addEventListener('touchstart', unmuteOnInteraction, { once: true, passive: true });
        });
    }
  }, []);

  useEffect(() => {
    startPlayback();
  }, [startPlayback]);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isMinimized) {
      setIsMinimized(false);
      if (videoRef.current) {
        bgMusic.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
      return;
    }
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        bgMusic.pause();
        if (videoRef.current.ended) {
          videoRef.current.currentTime = 0;
        }
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !isMuted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    // Start background music loop
    bgMusic.play();
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsMinimized(true);
    // Start continuous looping playlist of the 4 background songs
    bgMusic.play();
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
      animate={isMinimized ? { opacity: 0.6, scale: 0.4, x: '40%', y: 0 } : { opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
      transition={{ type: "spring", stiffness: 220, damping: 24, delay: isMinimized ? 0 : 0.6 }}
      className={`fixed top-24 lg:top-24 right-4 lg:right-6 z-50 pointer-events-auto transform-gpu will-change-transform ${isMinimized ? 'cursor-pointer hover:opacity-100' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="relative w-40 h-56 md:w-48 md:h-64 lg:w-56 lg:h-72 cursor-pointer overflow-hidden rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.35)] border border-white/20 transform-gpu [mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_15%,black_85%,transparent_100%)]" 
        onClick={(e) => {
          if (isMinimized) {
            togglePlay(e);
          } else {
            toggleMute(e);
          }
        }}
      >
        <video
          ref={videoRef}
          src="/intro-video.mp4"
          className="w-full h-full object-cover transform-gpu [backface-visibility:hidden] [transform:translateZ(0)]"
          autoPlay
          muted={isMuted}
          playsInline
          preload="auto"
          disablePictureInPicture
          onEnded={handleVideoEnded}
        />
        
        {/* Hover Overlay Controls */}
        <AnimatePresence>
          {isHovered && !isMinimized && (
            <motion.div
              key="hover-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="absolute inset-0 bg-black/30 flex items-center justify-center gap-3 backdrop-blur-[2px] rounded-2xl z-20"
            >
              <button 
                onClick={togglePlay}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="w-9 h-9 rounded-full bg-white/30 hover:bg-white/50 active:scale-90 flex items-center justify-center text-white backdrop-blur-md transition-all shadow-lg"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>
              
              <button 
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute video" : "Mute video"}
                className="w-9 h-9 rounded-full bg-white/30 hover:bg-white/50 active:scale-90 flex items-center justify-center text-white backdrop-blur-md transition-all shadow-lg"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Close Button */}
        {!isMinimized && (
          <button
            onClick={handleClose}
            aria-label="Close intro video"
            className="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center hover:bg-black/60 active:scale-90 transition-all z-30 shadow-md backdrop-blur-sm"
          >
            <X size={13} />
          </button>
        )}
      </div>
      
      {/* Tooltip / Welcome Text */}
      <AnimatePresence>
        {!isHovered && isPlaying && isMuted && !isMinimized && (
          <motion.div
            key="tooltip"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-bg-card/90 backdrop-blur-xl px-3 py-1.5 rounded-full text-xs font-medium text-text-primary border border-border-primary shadow-xl pointer-events-none flex items-center gap-1.5"
          >
            <VolumeX size={12} className="text-accent" />
            <span>Click to unmute</span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
