import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Youtube, Volume2, VolumeX, Minus, Play, Sparkles, ExternalLink, PanelRightClose, PanelLeftClose } from 'lucide-react';
import { bgMusic } from '../lib/backgroundMusic';
import { useMovableDock } from '../hooks/useMovableDock';
import { SideDockGuide, MinimizeEdgeHandle, DockedSideTab } from './SideDockControls';

export const WelcomeVideoWidget = ({ isMenuOpen = false }: { isMenuOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const dock = useMovableDock({
    storageKey: 'riq-dock-video-widget',
    defaultSide: 'right',
    estimatedWidth: isMinimized ? 154 : 256,
    estimatedHeight: isMinimized ? 44 : 380,
  });

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
    <>
      <SideDockGuide side={dock.dockPreview} />
      <motion.div
        ref={dock.containerRef}
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: -20 }}
        transition={{ type: "spring", stiffness: 260, damping: 24, delay: 0.5 }}
        style={dock.positionStyle}
        onPointerDown={isMinimized || dock.docked ? dock.handlePointerDown : undefined}
        onClickCapture={dock.handleClickCapture}
        className={`fixed z-40 pointer-events-auto select-none font-sans ${
          !dock.isMoved && !dock.docked ? 'top-24 right-4 sm:right-6' : ''
        } ${isMenuOpen ? 'hidden lg:block' : 'block'}`}
      >
        <div
          className={`transition-opacity duration-300 ${
            dock.isDragging
              ? 'opacity-100'
              : dock.docked
                ? 'opacity-70 hover:opacity-100 lg:opacity-90'
                : isMinimized
                  ? 'opacity-50 hover:opacity-100 focus-within:opacity-100 lg:opacity-100'
                  : 'opacity-100'
          }`}
        >
          <AnimatePresence mode="wait">
            {dock.docked ? (
              <DockedSideTab
                key="docked-video-tab"
                side={dock.docked}
                label="Watch Tour"
                accentDotClass="bg-[#1d6ce0]"
                icon={
                  <span className="w-6 h-6 rounded-full bg-[#1d6ce0] flex items-center justify-center text-white shadow-xs">
                    <Play size={11} className="fill-white translate-x-0.5" />
                  </span>
                }
                onRestore={dock.restoreFromSide}
              />
            ) : isMinimized ? (
              /* Minimized Serene Frosted Pill */
              <div key="minimized-pill-wrap" className="relative group/dock">
                <motion.button
                  key="minimized-pill"
                  layout
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  onClick={() => setIsMinimized(false)}
                  title="Drag to move or snap to side"
                  className={`flex items-center gap-2.5 px-4 py-2 rounded-full frosted-panel-elevated text-text-primary group hover:-translate-y-0.5 transition-all touch-none select-none ${
                    dock.isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab'
                  }`}
                >
                  <span className="w-6 h-6 rounded-full bg-[#1d6ce0] flex items-center justify-center text-white shadow-sm shrink-0 group-hover:scale-105 transition-transform">
                    <Play size={11} className="fill-white translate-x-0.5" />
                  </span>
                  <div className="flex flex-col text-left">
                    <span className="text-[10px] text-accent font-mono font-semibold leading-none">ReliabilityIQ</span>
                    <span className="text-xs font-bold text-text-primary tracking-tight leading-snug">Watch Tour</span>
                  </div>
                </motion.button>

                <MinimizeEdgeHandle
                  side={dock.horizontalSide}
                  onMinimize={dock.minimizeToSide}
                  title="Minimize tour button to side of screen"
                  className={`absolute -top-1.5 ${
                    dock.horizontalSide === 'left' ? '-left-1.5' : '-right-1.5'
                  } opacity-90 lg:opacity-0 lg:group-hover/dock:opacity-100 focus:opacity-100 z-10`}
                />
              </div>
            ) : (
              /* Expanded Frosted Glass Card */
              <motion.div 
                key="expanded-card"
                layout
                className="relative w-56 sm:w-64 frosted-panel-elevated rounded-[24px] overflow-hidden group/card"
              >
                {/* Header Bar (Draggable handle when expanded) */}
                <div
                  onPointerDown={dock.handlePointerDown}
                  className={`relative z-10 flex items-center justify-between px-3.5 py-2.5 bg-white/60 dark:bg-white/10 backdrop-blur-xl border-b border-border-subtle text-text-primary touch-none ${
                    dock.isDragging ? 'cursor-grabbing' : 'cursor-grab'
                  }`}
                >
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

                  <div className="flex items-center gap-1 shrink-0" data-no-drag="true">
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

                    {/* Dock to side Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        setIsMinimized(true);
                        dock.minimizeToSide(e);
                      }}
                      className="p-1 text-text-secondary hover:text-accent hover:bg-white/70 dark:hover:bg-white/10 rounded-full transition-all cursor-pointer"
                      title="Minimize to side of screen"
                      aria-label="Minimize to side of screen"
                    >
                      {dock.horizontalSide === 'left' ? (
                        <PanelLeftClose size={13} strokeWidth={2.2} />
                      ) : (
                        <PanelRightClose size={13} strokeWidth={2.2} />
                      )}
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
                <div className={`relative aspect-[9/16] w-full bg-[#07142b] overflow-hidden ${dock.isDragging ? 'pointer-events-none' : ''}`}>
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
        </div>
      </motion.div>
    </>
  );
};
