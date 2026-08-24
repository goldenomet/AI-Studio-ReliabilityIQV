import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, X, Volume2, VolumeX } from 'lucide-react';

export const WelcomeVideoWidget = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isMinimized) {
      setIsMinimized(false);
    }
    
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(false);
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsMinimized(true);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
      animate={isMinimized ? { opacity: 0.6, scale: 0.4, x: '40%', y: 0 } : { opacity: 1, scale: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: 20, y: -20 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: isMinimized ? 0 : 1 }}
      className={`fixed top-24 lg:top-24 right-4 lg:right-6 z-50 pointer-events-auto ${isMinimized ? 'cursor-pointer hover:opacity-100' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={(e) => {
        if (isMinimized) togglePlay(e);
      }}
    >
      <div className="relative w-40 h-56 md:w-48 md:h-64 lg:w-56 lg:h-72 mix-blend-multiply dark:mix-blend-screen [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)] cursor-pointer" onClick={toggleMute}>
        <video
          ref={videoRef}
          src="/intro-video.mp4"
          className="w-full h-full object-cover"
          autoPlay
          muted={isMuted}
          playsInline
          onEnded={handleVideoEnded}
        />
        
        {/* Hover Overlay Controls */}
        <AnimatePresence>
          {isHovered && !isMinimized && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/20 flex items-center justify-center gap-3 backdrop-blur-[2px] rounded-2xl"
            >
              <button 
                onClick={togglePlay}
                className="w-8 h-8 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center text-white backdrop-blur-md transition-colors"
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-1" />}
              </button>
              
              <button 
                onClick={toggleMute}
                className="w-8 h-8 rounded-full bg-white/30 hover:bg-white/50 flex items-center justify-center text-white backdrop-blur-md transition-colors"
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
            className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/30 text-white flex items-center justify-center hover:bg-black/50 transition-colors z-10"
          >
            <X size={12} />
          </button>
        )}
      </div>
      
      {/* Tooltip / Welcome Text */}
      <AnimatePresence>
        {!isHovered && isPlaying && isMuted && !isMinimized && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 whitespace-nowrap bg-bg-card/80 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-text-primary border border-border-primary shadow-lg pointer-events-none"
          >
            Click to unmute
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
