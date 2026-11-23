import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight, Layers, Play, Pause } from 'lucide-react';
import { CountingNumber } from './Effects';
import { useSectionFlow } from './SectionFlow';
import heroGlassBackdrop from '@/src/assets/images/hero_glass_backdrop_1795460786501.jpg';
import heroAutomationGlass from '@/src/assets/images/hero_automation_glass_1795462668369.jpg';
import heroSpatialGlass from '@/src/assets/images/hero_spatial_glass_1795462668998.jpg';
import sereneGlassLayers from '@/src/assets/images/serene_glass_layers_1795460787074.jpg';
import webOpsThumb from '@/src/assets/images/trending_web_design_1787603569100.jpg';
import aiAutoThumb from '@/src/assets/images/trending_ai_auto_1787603581694.jpg';
import gisMapThumb from '@/src/assets/images/regenerated_image_1778002658766.jpg';

const SERVICE_NODES = [
  {
    num: '01',
    label: 'SYSTEMS',
    title: 'Web Operations & Cloud',
    summary: 'High-availability web architecture, automated failover pipelines, CMS engineering, and 99.99% uptime cloud delivery.',
    thumb: webOpsThumb,
    heroImage: heroGlassBackdrop,
    page: 'service-development',
  },
  {
    num: '02',
    label: 'AUTOMATION',
    title: 'AI Workflow Intelligence',
    summary: 'Custom AI agents and automated data pipelines that streamline enterprise reporting, document triage, and decision support.',
    thumb: aiAutoThumb,
    heroImage: heroAutomationGlass,
    page: 'service-automation',
  },
  {
    num: '03',
    label: 'SPATIAL GIS',
    title: 'Geospatial & Data Mapping',
    summary: 'Precision GIS mapping, spatial analytics, and structured technical documentation across African and global corridors.',
    thumb: gisMapThumb,
    heroImage: heroSpatialGlass,
    page: 'service-gis',
  },
];

export const HeroSection = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  const [activeNode, setActiveNode] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { ref: heroFlowRef, style: heroFlowStyle } = useSectionFlow({ isHero: true });

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setActiveNode((prev) => (prev + 1) % SERVICE_NODES.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentService = SERVICE_NODES[activeNode];

  return (
    <motion.section
      ref={heroFlowRef}
      style={heroFlowStyle}
      className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden flex items-center justify-center"
    >
      {/* Ambient Outer Atmospheric Glow */}
      <div className="absolute top-12 left-1/4 w-[480px] h-[360px] bg-white/75 dark:bg-blue-400/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-8 right-12 w-[520px] h-[400px] bg-blue-200/45 dark:bg-sky-400/12 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* Main Framed Editorial 16:9 Glass Canvas (Echoing Reference Layout) */}
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-[1320px] rounded-[28px] sm:rounded-[36px] frosted-panel-elevated overflow-hidden shadow-[0_32px_90px_-20px_rgba(15,37,71,0.22)] dark:shadow-[0_32px_90px_-20px_rgba(2,8,23,0.75)] min-h-[580px] lg:min-h-[650px] flex flex-col justify-between"
      >
        {/* Background Layer 1: Right-side Luminous Alabaster / Twilight Sapphire Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#eef5ff] via-[#f8fbff] to-[#ffffff] dark:from-[#08152e] dark:via-[#0b1d40] dark:to-[#0f254f] z-0" />

        {/* Background Layer 2: Left-side Architectural Imagery synced with Carousel */}
        <div className="absolute inset-y-0 left-0 w-full lg:w-[56%] z-0 pointer-events-none overflow-hidden">
          <div className="relative w-full h-full opacity-95 dark:opacity-75">
            <AnimatePresence mode="sync">
              <motion.img
                key={currentService.num}
                src={currentService.heroImage}
                alt={`${currentService.title} Architectural Visualization`}
                referrerPolicy="no-referrer"
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1.02 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
            </AnimatePresence>
          </div>
          {/* Rich Atmospheric Feathered Blend into Right Luminous Field */}
          <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#dbeafe]/30 via-[#eef5ff]/20 to-[#f8fbff] dark:from-[#050e20]/60 dark:via-[#08152e]/35 dark:to-[#0b1d40]" />
          <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2 bg-gradient-to-r from-transparent via-[#f5f9ff]/85 to-[#f8fbff] dark:via-[#0b1d40]/85 dark:to-[#0b1d40]" />
          <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#eaf2ff]/55 via-[#f5f9ff]/88 to-[#f8fbff] dark:from-[#050e20]/55 dark:via-[#0b1d40]/88 dark:to-[#0b1d40]" />
          {/* Bottom vignette for crisp white PLAY bar contrast */}
          <div className="hidden lg:block absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#07142b]/80 via-[#07142b]/35 to-transparent" />
        </div>

        {/* Background Layer 3: Subtle Faint Concentric Arcs & Geospatial Contour Lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-[1] opacity-45 dark:opacity-25"
          viewBox="0 0 1320 650"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          {/* Upper Left Concentric Sweep Arcs */}
          <circle cx="290" cy="40" r="240" stroke="currentColor" strokeOpacity="0.16" strokeWidth="1" className="text-accent" />
          <circle cx="290" cy="40" r="340" stroke="currentColor" strokeOpacity="0.12" strokeWidth="1" className="text-accent" />
          <circle cx="290" cy="40" r="450" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" className="text-accent" />

          {/* Subtle Geospatial Continent / Network Contour Lines on Lower Right */}
          <path
            d="M720 650 C760 540, 840 480, 950 475 C1060 470, 1140 520, 1210 650"
            stroke="currentColor"
            strokeOpacity="0.10"
            strokeWidth="1"
            className="text-text-secondary"
          />
          <path
            d="M780 650 C815 570, 885 525, 975 525 C1070 525, 1135 575, 1170 650"
            stroke="currentColor"
            strokeOpacity="0.09"
            strokeWidth="1"
            strokeDasharray="4 4"
            className="text-text-secondary"
          />
          {/* Subtle Network Grid Nodes in Right Watermark Area */}
          <circle cx="980" cy="180" r="145" stroke="currentColor" strokeOpacity="0.05" strokeWidth="1.2" className="text-accent" />
          <circle cx="980" cy="180" r="195" stroke="currentColor" strokeOpacity="0.04" strokeWidth="1" className="text-accent" />
        </svg>

        {/* Top Inner Brand Micro-Header (Inside Canvas — Untouched Main Navbar sits above) */}
        <div className="relative z-20 flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8">
          <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-text-primary">
            Information Services
          </span>
        </div>

        {/* Center Editorial Composition */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-8 lg:py-4">
          {/* Centered Headline & Dynamic Service Brief */}
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center min-w-0">
            <h1
              className="text-4xl sm:text-5xl lg:text-[64px] xl:text-[74px] font-extrabold tracking-tight leading-[0.96] text-text-primary select-none drop-shadow-[0_2px_18px_rgba(255,255,255,0.65)] dark:drop-shadow-[0_2px_20px_rgba(7,20,43,0.85)]"
              style={{ textWrap: 'balance' }}
            >
              INTELLIGENCE
            </h1>

            <div className="mt-4 max-w-lg mx-auto min-h-[76px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentService.num}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                >
                  <p className="text-xs font-mono font-semibold uppercase tracking-widest text-accent mb-1.5">
                    {currentService.num} · {currentService.title}
                  </p>
                  <p className="text-sm sm:text-[15px] text-text-secondary leading-relaxed font-normal">
                    {currentService.summary}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3.5 mt-6">
              <button
                onClick={() => onNavigate(currentService.page)}
                className="swimtopia-pill-btn group !py-2.5 !px-5 text-sm"
              >
                <span className="swimtopia-pill-badge">
                  <ChevronRight size={14} strokeWidth={2.5} />
                </span>
                <span>Explore {currentService.label.charAt(0) + currentService.label.slice(1).toLowerCase()}</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full frosted-panel hover:bg-white/90 dark:hover:bg-white/15 text-text-primary font-semibold text-sm transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Request Consultation</span>
                <ArrowRight size={15} className="text-accent" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Row: Play Track Bar (Left) + Curved Orbital Arc with 01/02/03 Nodes (Right) */}
        <div className="relative z-20 flex flex-col lg:flex-row items-stretch lg:items-end justify-between px-6 sm:px-10 pb-6 sm:pb-8 gap-8">
          {/* Bottom-Left PLAY Showcase Progress Control */}
          <div className="flex items-center gap-3.5 lg:mb-3">
            <button
              onClick={() => setIsPlaying((prev) => !prev)}
              aria-label={isPlaying ? 'Pause showcase tour' : 'Play showcase tour'}
              className="w-11 h-11 rounded-full bg-white text-[#0f2547] shadow-lg ring-4 ring-white/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform cursor-pointer shrink-0"
            >
              {isPlaying ? (
                <Pause size={14} className="fill-[#0f2547]" />
              ) : (
                <Play size={14} className="fill-[#0f2547] translate-x-0.5" />
              )}
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying((prev) => !prev)}
                className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-text-primary lg:text-white cursor-pointer whitespace-nowrap"
              >
                {isPlaying ? 'PLAY' : 'PAUSED'}
              </button>

              {/* Horizontal Track Line */}
              <div className="w-28 sm:w-40 h-[2px] bg-text-secondary/25 lg:bg-white/30 rounded-full overflow-hidden relative">
                <motion.div
                  key={`${activeNode}-${isPlaying}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: isPlaying ? 1 : (activeNode + 1) / SERVICE_NODES.length }}
                  transition={{ duration: isPlaying ? 5.5 : 0.3, ease: 'linear' }}
                  style={{ transformOrigin: 'left center' }}
                  className="h-full w-full bg-accent lg:bg-white"
                />
              </div>

              <span className="font-mono text-[11px] font-semibold text-text-secondary lg:text-white/85 tabular-nums">
                {currentService.num} / 03
              </span>
            </div>
          </div>

          {/* Bottom-Right Curved Orbital Arc with 3 Circular Thumbnail Nodes */}
          <div className="relative w-full lg:w-[540px] xl:w-[580px] pt-4 lg:pt-8">
            {/* Orbital Curved Track SVG (Desktop) */}
            <svg
              className="hidden sm:block absolute inset-x-0 -top-2 w-full h-36 pointer-events-none text-accent/35 dark:text-sky-300/30"
              viewBox="0 0 580 150"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M 28 145 Q 290 2 552 145"
                stroke="currentColor"
                strokeWidth="1.25"
              />
              {/* Arrowhead near right end of arc */}
              <path
                d="M 526 122 L 534 134 L 520 135"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* 3 Circular Service Nodes positioned smoothly along the arc */}
            <div className="grid grid-cols-3 gap-3 sm:gap-6 items-end relative z-10">
              {SERVICE_NODES.map((node, index) => {
                const isActive = index === activeNode;
                const arcOffset = index === 1 ? 'sm:-translate-y-7' : 'sm:translate-y-0';
                return (
                  <button
                    key={node.num}
                    onClick={() => {
                      setActiveNode(index);
                      setIsPlaying(false);
                    }}
                    className={`flex flex-col items-center text-center group cursor-pointer transition-transform duration-300 ${arcOffset}`}
                  >
                    <div
                      className={`relative rounded-full p-1 transition-all duration-300 ${
                        isActive
                          ? 'w-16 h-16 sm:w-20 sm:h-20 bg-white dark:bg-[#132954] ring-2 ring-accent shadow-[0_12px_28px_-6px_rgba(29,108,224,0.38)] scale-105'
                          : 'w-14 h-14 sm:w-16 sm:h-16 bg-white/80 dark:bg-[#0e2044] border border-border-primary hover:scale-105 opacity-85 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={node.thumb}
                        alt={node.title}
                        referrerPolicy="no-referrer"
                        className="w-full h-full rounded-full object-cover"
                      />
                    </div>

                    <span className={`mt-2.5 font-mono text-xs sm:text-sm font-bold tabular-nums transition-colors ${isActive ? 'text-accent' : 'text-text-primary'}`}>
                      {node.num}
                    </span>
                    <span className="font-mono text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase text-text-secondary group-hover:text-text-primary transition-colors">
                      {node.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Subtle Regional & Spatial Arc Strip */}
            <div className="mt-4 pt-3 border-t border-border-subtle/70 flex flex-wrap items-center justify-center sm:justify-end sm:pl-8 pr-1 sm:pr-2 gap-x-3.5 gap-y-1 font-mono text-[10px] tracking-wide text-text-secondary/75">
              <span className="whitespace-nowrap">West Africa</span>
              <span aria-hidden="true">·</span>
              <span className="whitespace-nowrap">Cloud Edge</span>
              <span aria-hidden="true">·</span>
              <span className="whitespace-nowrap">AI Pipelines</span>
              <span aria-hidden="true">·</span>
              <span className="whitespace-nowrap">GIS Spatial</span>
              <span aria-hidden="true">·</span>
              <span className="whitespace-nowrap">Technical Docs</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export const MissionSection = ({ onExplore }: { onBack?: () => void, onExplore?: () => void }) => {
  const { ref: missionFlowRef, style: missionFlowStyle } = useSectionFlow();

  return (
    <motion.section
      ref={missionFlowRef}
      style={missionFlowStyle}
      className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden text-text-primary border-t border-border-subtle"
    >
      {/* Subtle 16:9 Layered Glass Refraction Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-45 dark:opacity-20">
        <img
          src={sereneGlassLayers}
          alt="Serene frosted glass depth layers"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#eef5ff]/85 via-[#eef5ff]/60 to-[#eef5ff]/90 dark:from-[#07142b]/90 dark:via-[#07142b]/75 dark:to-[#07142b]/95" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 text-accent text-xs font-mono uppercase tracking-widest mb-5 font-semibold">
          <Layers size={14} />
          <span>Architected For Resilient Growth</span>
        </div>

        <h2
          className="text-2xl sm:text-4xl md:text-[42px] font-extrabold text-text-primary leading-tight tracking-tight mb-6 mx-auto max-w-4xl"
          style={{ textWrap: 'balance' }}
        >
          ReliabilityIQ designs calm, scalable digital infrastructure — from intelligent automation and AI media systems to geospatial intelligence and web operations.
        </h2>

        {/* 4 Layered Frosted Glass Stat Capsules */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mt-12">
          <div className="frosted-panel-elevated rounded-2xl text-center p-6 hover:-translate-y-0.5 transition-transform duration-200">
            <div className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-1.5 tabular-nums font-mono">
              <CountingNumber value={4} suffix="+" duration={1.6} />
            </div>
            <div className="text-xs text-text-secondary font-medium">Years Engineering</div>
          </div>

          <div className="frosted-panel-elevated rounded-2xl text-center p-6 hover:-translate-y-0.5 transition-transform duration-200">
            <div className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-1.5 tabular-nums font-mono">
              <CountingNumber value={20} suffix="+" duration={1.8} />
            </div>
            <div className="text-xs text-text-secondary font-medium">Enterprise Clients</div>
          </div>

          <div className="frosted-panel-elevated rounded-2xl text-center p-6 hover:-translate-y-0.5 transition-transform duration-200">
            <div className="text-3xl sm:text-4xl font-extrabold text-text-primary mb-1.5 tabular-nums font-mono">
              <CountingNumber value={5} suffix="M+" duration={2} />
            </div>
            <div className="text-xs text-text-secondary font-medium">Data Points Mapped</div>
          </div>

          <div className="frosted-panel-elevated rounded-2xl text-center p-6 hover:-translate-y-0.5 transition-transform duration-200">
            <div className="text-3xl sm:text-4xl font-extrabold text-accent mb-1.5 tabular-nums font-mono">
              <CountingNumber value={99.99} suffix="%" decimals={2} duration={2.2} />
            </div>
            <div className="text-xs text-text-secondary font-medium">Target Uptime SLA</div>
          </div>
        </div>

        {onExplore && (
          <div className="mt-12 flex justify-center">
            <button
              onClick={onExplore}
              className="swimtopia-pill-btn group"
            >
              <span className="swimtopia-pill-badge">
                <ChevronRight size={14} strokeWidth={2.5} />
              </span>
              <span>Discover All Services</span>
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};
