import React, { useState, useEffect, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ArrowRight, Layers, Play, Pause } from 'lucide-react';
import { CountingNumber } from './Effects';
import { useSectionFlow } from './SectionFlow';
import heroGlassBackdrop from '@/src/assets/images/hero_glass_backdrop_1795460786501.jpg';
import heroAutomationGlass from '@/src/assets/images/hero_automation_glass_1795462668369.jpg';
import heroSpatialGlass from '@/src/assets/images/hero_spatial_glass_1795462668998.jpg';
import sereneGlassLayers from '@/src/assets/images/serene_glass_layers_1795460787074.jpg';
import heroComputerTelecomSketch from '@/src/assets/images/hero_computer_telecom_sketch_1795552311548.jpg';

const SERVICE_NODES = [
  {
    num: '01',
    label: 'DEVELOP',
    title: 'Custom Software & Application Development',
    summary: 'Scalable web platforms, enterprise software engineering, and resilient cloud systems built for speed, security, and measurable business growth.',
    thumb: '/assets/aistudio/13097_b15c39b9.jpg',
    heroImage: heroGlassBackdrop,
    page: 'service-development',
  },
  {
    num: '02',
    label: 'TRAIN',
    title: 'Enterprise AI Training & Data Readiness',
    summary: 'Hands-on AI training, domain-tuned models, and practical technical upskilling that equip organizations to adopt intelligent tools with confidence.',
    thumb: '/assets/aistudio/2149001149_94f84c99.jpg',
    heroImage: heroAutomationGlass,
    page: 'service-automation',
  },
  {
    num: '03',
    label: 'AUTOMATE',
    title: 'Workflow Automation & Data Analytics',
    summary: 'End-to-end workflow automation, real-time data analysis pipelines, and operational intelligence that eliminate manual bottlenecks and guide decisions.',
    thumb: '/assets/aistudio/1795560970040_c60b505c.jpg',
    heroImage: heroSpatialGlass,
    page: 'service-gis',
  },
];

export const HeroSection = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  const [activeNode, setActiveNode] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [sketchError, setSketchError] = useState(false);
  const uid = useId().replace(/:/g, '');
  const mapMaskId = `riq-hero-mask-${uid}`;
  const mapFeatherId = `riq-hero-feather-${uid}`;
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
        {/* SVG Soft Feathered Geographic Coastline Mask (blends image landmass into background color) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
          <defs>
            <filter id={mapFeatherId} filterUnits="objectBoundingBox" x="-0.25" y="-0.25" width="1.5" height="1.5">
              <feGaussianBlur stdDeviation="0.0055 0.010" />
            </filter>
            <mask id={mapMaskId} maskUnits="objectBoundingBox" maskContentUnits="objectBoundingBox">
              <rect x="-0.25" y="-0.25" width="1.5" height="1.5" fill="black" />
              <g filter={`url(#${mapFeatherId})`}>
                {/* Padded left/top/bottom edges stay solid while eastern bays & peninsulas feather softly */}
                <path
                  fill="white"
                  d="
                    M -0.25 -0.25
                    L 0.72 -0.25
                    L 0.71 0
                    L 0.698 0.022 L 0.706 0.044 L 0.690 0.068 L 0.695 0.092 L 0.678 0.116 L 0.684 0.136 L 0.664 0.148
                    L 0.640 0.158 L 0.616 0.150 L 0.602 0.168 L 0.580 0.175 L 0.560 0.198 L 0.554 0.218 L 0.572 0.236
                    L 0.556 0.256 L 0.542 0.270 L 0.566 0.284 L 0.590 0.268 L 0.612 0.282 L 0.604 0.302 L 0.628 0.315
                    L 0.648 0.338 L 0.640 0.360 L 0.658 0.382 L 0.672 0.406 L 0.652 0.422 L 0.634 0.415 L 0.624 0.436
                    L 0.646 0.454 L 0.654 0.478 L 0.632 0.496 L 0.610 0.488 L 0.596 0.510 L 0.576 0.526 L 0.588 0.548
                    L 0.566 0.566 L 0.546 0.578 L 0.530 0.596 L 0.506 0.588 L 0.490 0.612 L 0.508 0.630 L 0.496 0.652
                    L 0.470 0.644 L 0.456 0.668 L 0.480 0.688 L 0.494 0.710 L 0.474 0.728 L 0.496 0.746 L 0.514 0.768
                    L 0.486 0.788 L 0.464 0.798 L 0.480 0.822 L 0.454 0.842 L 0.468 0.864 L 0.444 0.882 L 0.458 0.904
                    L 0.472 0.924 L 0.454 0.946 L 0.466 0.968 L 0.448 0.986 L 0.458 1
                    L 0.44 1.25
                    L -0.25 1.25 Z
                  "
                />
                {/* Softly feathered coastal islets */}
                <path fill="white" fillOpacity="0.88" d="M 0.608 0.348 L 0.618 0.343 L 0.622 0.354 L 0.613 0.363 L 0.604 0.356 Z" />
                <path fill="white" fillOpacity="0.85" d="M 0.516 0.668 L 0.527 0.661 L 0.532 0.678 L 0.524 0.695 L 0.512 0.688 Z" />
                <path fill="white" fillOpacity="0.82" d="M 0.482 0.865 L 0.491 0.861 L 0.494 0.874 L 0.484 0.879 Z" />
              </g>
            </mask>
          </defs>
        </svg>

        {/* Background Layer 1: Clean Solid / Luminous Backdrop Field (Exposed East of the Map Coastline) */}
        <div className="absolute inset-0 bg-[#ffffff] dark:bg-gradient-to-br dark:from-[#08152e] dark:via-[#0b1d40] dark:to-[#0f254f] z-0" />

        {/* Background Layer 2: Soft-Blended Map-Masked Architectural Imagery & Sweeping Latitude Arcs */}
        <div
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
          style={
            {
              maskImage: `url(#${mapMaskId})`,
              WebkitMaskImage: `url(#${mapMaskId})`,
              maskSize: '100% 100%',
              WebkitMaskSize: '100% 100%',
            } as React.CSSProperties
          }
        >
          <div className="relative w-full h-full opacity-88 dark:opacity-78">
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

          {/* Uniform atmospheric tint inside the map boundary */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#eef3ff]/58 via-[#e8effc]/38 to-[#dfe9fb]/28 dark:from-[#07142b]/60 dark:via-[#091a38]/40 dark:to-[#050e20]/60" />
          {/* Light inner shoreline soften without washing out the coastal contour */}
          <div className="absolute inset-y-0 left-[42%] right-0 bg-gradient-to-r from-transparent via-[#f4f8ff]/18 to-[#ffffff]/45 dark:from-transparent dark:via-[#0a1b3b]/20 dark:to-[#0b1d40]/45" />
          {/* Mobile/tablet readability veil over landmass */}
          <div className="lg:hidden absolute inset-0 bg-gradient-to-b from-[#f5f8ff]/48 via-[#f5f8ff]/62 to-[#f8fbff]/72 dark:from-[#08152e]/38 dark:via-[#08152e]/52 dark:to-[#08152e]/62" />
          {/* Bottom vignette for crisp white PLAY bar contrast inside the lower landmass */}
          <div className="hidden lg:block absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#07142b]/78 via-[#07142b]/32 to-transparent" />

          {/* Delicate white sweeping latitude arcs melting softly toward the coastline */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none opacity-55 dark:opacity-30"
            viewBox="0 0 1320 650"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            aria-hidden="true"
          >
            <path
              d="M -60 120 Q 380 310 920 265"
              stroke="white"
              strokeOpacity="0.6"
              strokeWidth="1.25"
            />
            <path
              d="M -40 315 Q 410 410 900 345"
              stroke="white"
              strokeOpacity="0.52"
              strokeWidth="1.15"
            />
            <path
              d="M -20 495 Q 360 545 780 475"
              stroke="white"
              strokeOpacity="0.48"
              strokeWidth="1.1"
            />
          </svg>
        </div>

        {/* Delicate feathered mist right along the coastline contour */}
        <svg
          className="absolute inset-0 w-full h-full z-0 pointer-events-none blur-[5px] opacity-30 dark:opacity-35"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="
              M 710 0
              L 698 22 L 706 44 L 690 68 L 695 92 L 678 116 L 684 136 L 664 148
              L 640 158 L 616 150 L 602 168 L 580 175 L 560 198 L 554 218 L 572 236
              L 556 256 L 542 270 L 566 284 L 590 268 L 612 282 L 604 302 L 628 315
              L 648 338 L 640 360 L 658 382 L 672 406 L 652 422 L 634 415 L 624 436
              L 646 454 L 654 478 L 632 496 L 610 488 L 596 510 L 576 526 L 588 548
              L 566 566 L 546 578 L 530 596 L 506 588 L 490 612 L 508 630 L 496 652
              L 470 644 L 456 668 L 480 688 L 494 710 L 474 728 L 496 746 L 514 768
              L 486 788 L 464 798 L 480 822 L 454 842 L 468 864 L 444 882 L 458 904
              L 472 924 L 454 946 L 466 968 L 448 986 L 458 1000
            "
            fill="none"
            className="stroke-[#ffffff] dark:stroke-[#0b1d40]"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

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

        {/* Top-Right Computer & Telecom Mast Sketch Artwork (Responsive Mobile Stacked vs Desktop Side-by-Side) */}
        <figure
          aria-hidden="true"
          className="absolute -top-3 sm:-top-5 -right-2 sm:-right-1 w-[86%] h-[340px] sm:h-auto sm:w-[66%] lg:w-[60%] max-w-[655px] sm:aspect-[4/3] z-[2] pointer-events-none select-none overflow-hidden"
          style={
            {
              maskImage:
                'radial-gradient(ellipse 76% 90% at 76% 46%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.68) 76%, rgba(0,0,0,0) 98%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 76% 90% at 76% 46%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.68) 76%, rgba(0,0,0,0) 98%)',
            } as React.CSSProperties
          }
        >
          {!sketchError ? (
            <div className="relative w-full aspect-[4/3] translate-x-[5%] opacity-[0.24] dark:opacity-[0.30] mix-blend-multiply dark:invert dark:mix-blend-screen grayscale contrast-110">
              {/* Telecom Mast & Concentric Signal Arcs (nudged right on mobile) */}
              <img
                src={heroComputerTelecomSketch}
                alt=""
                referrerPolicy="no-referrer"
                onError={() => setSketchError(true)}
                style={{ clipPath: 'inset(0% 0% 0% 44%)' }}
                className="absolute inset-0 w-full h-full object-contain object-right-top translate-x-[7%] -translate-y-[3%] sm:translate-x-0 sm:translate-y-0"
              />
              {/* Computer Workstation placed below the mast on mobile, beside the mast on sm+ */}
              <img
                src={heroComputerTelecomSketch}
                alt=""
                referrerPolicy="no-referrer"
                onError={() => setSketchError(true)}
                style={{ clipPath: 'inset(44% 56% 5% 6%)' }}
                className="absolute inset-0 w-full h-full object-contain object-right-top translate-x-[50%] translate-y-[42%] sm:translate-x-[23%] sm:-translate-y-[14%]"
              />
            </div>
          ) : (
            <svg
              className="w-full h-full translate-x-[5%] opacity-[0.24] dark:opacity-[0.30] text-text-primary"
              viewBox="0 0 600 420"
              fill="none"
            >
              {/* Fallback Architectural Line Sketch: Grouped Workstation + Lattice Telecom Mast */}
              <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="215" y="160" width="130" height="86" rx="5" />
                <line x1="280" y1="246" x2="280" y2="270" />
                <line x1="252" y1="270" x2="308" y2="270" />
                <rect x="356" y="180" width="36" height="90" rx="3" />
                <path d="M 438 45 L 406 340 M 462 45 L 494 340 M 438 45 L 462 45 M 422 140 L 478 140 M 414 230 L 486 230" />
                <circle cx="450" cy="88" r="58" strokeOpacity="0.45" strokeDasharray="4 4" />
                <circle cx="450" cy="88" r="92" strokeOpacity="0.35" strokeDasharray="5 5" />
              </g>
            </svg>
          )}
        </figure>

        {/* Top Inner Brand Micro-Header (Inside Canvas — Untouched Main Navbar sits above) */}
        <div className="relative z-20 flex items-center justify-between px-6 sm:px-10 pt-6 sm:pt-8">
          <span className="font-mono text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-text-primary">
            Information Services
          </span>
        </div>

        {/* Center Editorial Composition Overlaid Directly Above the Sketch Artwork */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-6 sm:px-10 py-8 lg:py-4">
          {/* Centered Headline & Dynamic Service Brief */}
          <div className="w-full max-w-2xl mx-auto flex flex-col items-center text-center min-w-0">
            <h1
              className="text-4xl sm:text-5xl lg:text-[64px] xl:text-[74px] font-extrabold tracking-tight leading-[0.96] text-text-primary select-none drop-shadow-[0_1px_10px_rgba(255,255,255,0.45)] dark:drop-shadow-[0_2px_14px_rgba(7,20,43,0.7)]"
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
                    {currentService.title}
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

          {/* Bottom-Right Circular Orbital Dome (Responsive Mobile + Desktop) */}
          <div className="relative w-full max-w-[460px] sm:max-w-[600px] lg:w-[520px] xl:w-[640px] mx-auto lg:mx-0 lg:ml-auto shrink-0 select-none">
            {/* Mobile-First Orbital Dome (< 640px) — Zero overlap or clipped SVG text */}
            <div className="sm:hidden flex flex-col items-center w-full">
              <div className="relative w-full max-w-[380px] aspect-[360/178]">
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none"
                  viewBox="0 0 360 178"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M 26 142 A 158 122 0 0 1 334 142"
                    className="text-accent/40 dark:text-sky-300/35"
                    stroke="currentColor"
                    strokeWidth="1.35"
                  />
                  {/* Tangent-aligned clockwise downward arrow centered on the mobile arc */}
                  <path
                    d="M 320.6 122.5 L 327.5 125.6 L 329.2 118.3"
                    className="text-accent/70 dark:text-sky-300/65"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {SERVICE_NODES.map((node, index) => {
                  const isActive = index === activeNode;
                  const mobilePositions = [
                    { left: '16.5%', top: '50.8%' },
                    { left: '50%', top: '26.6%' },
                    { left: '83.5%', top: '50.8%' },
                  ];
                  const pos = mobilePositions[index];

                  return (
                    <button
                      key={`mobile-${node.num}`}
                      type="button"
                      onClick={() => {
                        setActiveNode(index);
                        setIsPlaying(false);
                      }}
                      style={{ left: pos.left, top: pos.top }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group cursor-pointer z-10 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
                    >
                      <div
                        className={`relative rounded-full p-1 transition-all duration-300 ${
                          isActive
                            ? 'w-14 h-14 bg-white dark:bg-[#132954] ring-2 ring-accent shadow-[0_10px_24px_-6px_rgba(29,108,224,0.42)] scale-105'
                            : 'w-11 h-11 bg-white/90 dark:bg-[#0e2044] ring-1 ring-border-primary hover:ring-accent/60 shadow-md'
                        }`}
                      >
                        <img
                          src={node.thumb}
                          alt={node.title}
                          referrerPolicy="no-referrer"
                          className={`w-full h-full rounded-full object-cover transition-all duration-300 ${
                            node.num === '03' ? 'object-right' : 'object-center'
                          } ${
                            isActive ? 'grayscale-0' : 'grayscale opacity-85'
                          }`}
                        />
                      </div>

                      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 flex flex-col items-center leading-none whitespace-nowrap pointer-events-none">
                        <span
                          className={`font-mono text-xs font-extrabold tabular-nums transition-colors ${
                            isActive ? 'text-accent' : 'text-text-primary/85'
                          }`}
                        >
                          {node.num}
                        </span>
                        <span
                          className={`mt-0.5 font-mono text-[9px] font-bold tracking-[0.09em] uppercase transition-colors ${
                            isActive ? 'text-accent' : 'text-text-secondary'
                          }`}
                        >
                          {node.label}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Clean Mobile Capability Captions + Vibrant Quality Checkmark Sticker Below the Orbital Arc */}
              <div className="w-full max-w-[350px] mt-1.5 flex flex-col items-center">
                <p className="text-[12px] leading-snug font-medium tracking-[0.015em] text-text-secondary/85 text-center max-w-[340px]">
                  Application Development · AI Training · Automate Workflow · Data Analysis
                </p>

                <motion.svg
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="w-[74px] h-[74px] mt-2 pointer-events-none select-none overflow-visible"
                  viewBox="-34 -32 68 78"
                  fill="none"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient id={`riq-quality-grad-m-${uid}`} x1="-22" y1="-22" x2="22" y2="24" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.96" />
                      <stop offset="32%" stopColor="#fbbf24" stopOpacity="0.92" />
                      <stop offset="72%" stopColor="#f59e0b" stopOpacity="0.90" />
                      <stop offset="100%" stopColor="#b45309" stopOpacity="0.95" />
                    </linearGradient>
                    <linearGradient id={`riq-quality-gloss-m-${uid}`} x1="0" y1="-21" x2="0" y2="6" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.82" />
                      <stop offset="55%" stopColor="#fef9c3" stopOpacity="0.34" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                    </linearGradient>
                    <radialGradient id={`riq-quality-caustic-m-${uid}`} cx="0.68" cy="0.72" r="0.55">
                      <stop offset="0%" stopColor="#fef08a" stopOpacity="0.65" />
                      <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </radialGradient>
                    <filter id={`riq-quality-shadow-m-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
                      <feDropShadow dx="0" dy="4" stdDeviation="4.5" floodColor="#92400e" floodOpacity="0.28" />
                    </filter>
                  </defs>

                  <g filter={`url(#riq-quality-shadow-m-${uid})`}>
                    {/* Frosted champagne die-cut liquid glass outer border */}
                    <path
                      d="M 21.2 0 Q 26.66 7.14 18.36 10.6 Q 19.52 19.52 10.6 18.36 Q 7.14 26.66 0 21.2 Q -7.14 26.66 -10.6 18.36 Q -19.52 19.52 -18.36 10.6 Q -26.66 7.14 -21.2 0 Q -26.66 -7.14 -18.36 -10.6 Q -19.52 -19.52 -10.6 -18.36 Q -7.14 -26.66 0 -21.2 Q 7.14 -26.66 10.6 -18.36 Q 19.52 -19.52 18.36 -10.6 Q 26.66 -7.14 21.2 0 Z"
                      fill="#fffbeb"
                      fillOpacity="0.72"
                      stroke="white"
                      strokeOpacity="0.92"
                      strokeWidth="3.5"
                      strokeLinejoin="round"
                    />
                    {/* Molten gold liquid glass body */}
                    <path
                      d="M 21.2 0 Q 26.66 7.14 18.36 10.6 Q 19.52 19.52 10.6 18.36 Q 7.14 26.66 0 21.2 Q -7.14 26.66 -10.6 18.36 Q -19.52 19.52 -18.36 10.6 Q -26.66 7.14 -21.2 0 Q -26.66 -7.14 -18.36 -10.6 Q -19.52 -19.52 -10.6 -18.36 Q -7.14 -26.66 0 -21.2 Q 7.14 -26.66 10.6 -18.36 Q 19.52 -19.52 18.36 -10.6 Q 26.66 -7.14 21.2 0 Z"
                      fill={`url(#riq-quality-grad-m-${uid})`}
                    />
                    {/* Warm bottom-right liquid caustic refraction */}
                    <circle cx="0" cy="0" r="19" fill={`url(#riq-quality-caustic-m-${uid})`} />
                    {/* Upper liquid glass specular dome reflection */}
                    <ellipse cx="-1" cy="-8.5" rx="14.5" ry="9" fill={`url(#riq-quality-gloss-m-${uid})`} />
                    {/* Beveled glass rim hairlines */}
                    <circle cx="0" cy="0" r="16.8" stroke="white" strokeOpacity="0.65" strokeWidth="1" />
                    <circle cx="0" cy="0" r="15.2" stroke="#fef3c7" strokeOpacity="0.45" strokeWidth="0.7" />
                    {/* Luminous pearl checkmark */}
                    <path
                      d="M -7.5 0.5 L -2.2 5.8 L 8.5 -5.2"
                      stroke="#78350f"
                      strokeOpacity="0.22"
                      strokeWidth="4.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M -7.5 0.5 L -2.2 5.8 L 8.5 -5.2"
                      stroke="white"
                      strokeWidth="3.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>

                  <text
                    x="0"
                    y="38"
                    textAnchor="middle"
                    className="fill-amber-700 dark:fill-amber-300 font-mono text-[7.5px] font-bold tracking-[0.14em] uppercase"
                  >
                    QUALITY ASSURED
                  </text>
                </motion.svg>
              </div>
            </div>

            {/* Tablet & Desktop Stretched Circular Orbital Dome (sm: >= 640px) */}
            <div className="hidden sm:block relative w-full aspect-[640/295]">
              {/* Stretched Circular Orbital Arc, Quality Sticker & Curved Captions */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 640 295"
                fill="none"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="riq-orbital-inner-arc"
                    d="M 96 276 A 232 146 0 0 1 544 276"
                  />
                  <linearGradient id={`riq-quality-grad-d-${uid}`} x1="-22" y1="-22" x2="22" y2="24" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.96" />
                    <stop offset="32%" stopColor="#fbbf24" stopOpacity="0.92" />
                    <stop offset="72%" stopColor="#f59e0b" stopOpacity="0.90" />
                    <stop offset="100%" stopColor="#b45309" stopOpacity="0.95" />
                  </linearGradient>
                  <linearGradient id={`riq-quality-gloss-d-${uid}`} x1="0" y1="-21" x2="0" y2="6" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.82" />
                    <stop offset="55%" stopColor="#fef9c3" stopOpacity="0.34" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                  </linearGradient>
                  <radialGradient id={`riq-quality-caustic-d-${uid}`} cx="0.68" cy="0.72" r="0.55">
                    <stop offset="0%" stopColor="#fef08a" stopOpacity="0.65" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                  </radialGradient>
                  <filter id={`riq-quality-shadow-d-${uid}`} x="-40%" y="-40%" width="180%" height="180%">
                    <feDropShadow dx="0" dy="4" stdDeviation="4.8" floodColor="#92400e" floodOpacity="0.28" />
                  </filter>
                </defs>

                {/* Gold Liquid Glass Quality Checkmark Sticker Centered inside the Dome */}
                <g transform="translate(320, 236)" aria-hidden="true">
                  <g filter={`url(#riq-quality-shadow-d-${uid})`}>
                    {/* Frosted champagne die-cut liquid glass outer rim */}
                    <path
                      d="M 21.2 0 Q 26.66 7.14 18.36 10.6 Q 19.52 19.52 10.6 18.36 Q 7.14 26.66 0 21.2 Q -7.14 26.66 -10.6 18.36 Q -19.52 19.52 -18.36 10.6 Q -26.66 7.14 -21.2 0 Q -26.66 -7.14 -18.36 -10.6 Q -19.52 -19.52 -10.6 -18.36 Q -7.14 -26.66 0 -21.2 Q 7.14 -26.66 10.6 -18.36 Q 19.52 -19.52 18.36 -10.6 Q 26.66 -7.14 21.2 0 Z"
                      fill="#fffbeb"
                      fillOpacity="0.72"
                      stroke="white"
                      strokeOpacity="0.92"
                      strokeWidth="3.6"
                      strokeLinejoin="round"
                    />
                    {/* Molten gold liquid glass body */}
                    <path
                      d="M 21.2 0 Q 26.66 7.14 18.36 10.6 Q 19.52 19.52 10.6 18.36 Q 7.14 26.66 0 21.2 Q -7.14 26.66 -10.6 18.36 Q -19.52 19.52 -18.36 10.6 Q -26.66 7.14 -21.2 0 Q -26.66 -7.14 -18.36 -10.6 Q -19.52 -19.52 -10.6 -18.36 Q -7.14 -26.66 0 -21.2 Q 7.14 -26.66 10.6 -18.36 Q 19.52 -19.52 18.36 -10.6 Q 26.66 -7.14 21.2 0 Z"
                      fill={`url(#riq-quality-grad-d-${uid})`}
                    />
                    {/* Warm bottom-right liquid caustic refraction */}
                    <circle cx="0" cy="0" r="19" fill={`url(#riq-quality-caustic-d-${uid})`} />
                    {/* Upper liquid glass specular dome reflection */}
                    <ellipse cx="-1" cy="-8.5" rx="14.5" ry="9" fill={`url(#riq-quality-gloss-d-${uid})`} />
                    {/* Beveled glass rim hairlines */}
                    <circle cx="0" cy="0" r="16.8" stroke="white" strokeOpacity="0.65" strokeWidth="1" />
                    <circle cx="0" cy="0" r="15.2" stroke="#fef3c7" strokeOpacity="0.45" strokeWidth="0.7" />
                    {/* Luminous pearl checkmark */}
                    <path
                      d="M -7.5 0.5 L -2.2 5.8 L 8.5 -5.2"
                      stroke="#78350f"
                      strokeOpacity="0.22"
                      strokeWidth="4.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M -7.5 0.5 L -2.2 5.8 L 8.5 -5.2"
                      stroke="white"
                      strokeWidth="3.3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <text
                    x="0"
                    y="41"
                    textAnchor="middle"
                    className="fill-amber-700 dark:fill-amber-300 font-mono text-[9px] font-bold tracking-[0.14em] uppercase"
                  >
                    QUALITY ASSURED
                  </text>
                </g>

                {/* Main Outer Stretched Semicircular Orbital Arc */}
                <path
                  d="M 24 288 A 296 224 0 0 1 616 288"
                  className="text-accent/40 dark:text-sky-300/35"
                  stroke="currentColor"
                  strokeWidth="1.45"
                />

                {/* Tangent-Aligned Clockwise Downward Arrow on Right Descending Arc */}
                <path
                  d="M 602.2 236.8 L 609.7 242.0 L 613.4 233.8"
                  className="text-accent/70 dark:text-sky-300/65"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Curved Inner Concentric Capability Captions (Stretched Arc & Larger Font Size) */}
                <text
                  className="fill-text-secondary/85 dark:fill-sky-100/75 font-sans text-[11.2px] font-medium tracking-[0.025em]"
                >
                  <textPath
                    href="#riq-orbital-inner-arc"
                    startOffset="50%"
                    textAnchor="middle"
                  >
                    Application Development · AI Training · Automate Workflow · Data Analysis
                  </textPath>
                </text>
              </svg>

              {/* 3 Circular Service Nodes Anchored Directly Along the Stretched Orbital Arc */}
              {SERVICE_NODES.map((node, index) => {
                const isActive = index === activeNode;
                // Exact arc coordinates on M 24 288 A 296 224 0 0 1 616 288 (cx=320, cy=288)
                const nodePositions = [
                  { left: '12.5%', top: '53.2%' },
                  { left: '50%', top: '21.7%' },
                  { left: '87.5%', top: '53.2%' },
                ];
                const pos = nodePositions[index];

                return (
                  <button
                    key={node.num}
                    type="button"
                    onClick={() => {
                      setActiveNode(index);
                      setIsPlaying(false);
                    }}
                    style={{ left: pos.left, top: pos.top }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group cursor-pointer z-10 outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-full"
                  >
                    <div
                      className={`relative rounded-full p-1 transition-all duration-300 ${
                        isActive
                          ? 'w-[76px] h-[76px] bg-white dark:bg-[#132954] ring-2 ring-accent shadow-[0_12px_28px_-6px_rgba(29,108,224,0.42)] scale-105'
                          : 'w-[58px] h-[58px] bg-white/90 dark:bg-[#0e2044] ring-1 ring-border-primary hover:ring-accent/60 hover:scale-105 shadow-md'
                      }`}
                    >
                      <img
                        src={node.thumb}
                        alt={node.title}
                        referrerPolicy="no-referrer"
                        className={`w-full h-full rounded-full object-cover transition-all duration-300 ${
                          node.num === '03' ? 'object-right' : 'object-center'
                        } ${
                          isActive ? 'grayscale-0' : 'grayscale opacity-85 group-hover:grayscale-0 group-hover:opacity-100'
                        }`}
                      />
                    </div>

                    {/* Label Stack Hanging Directly Below Each Orbital Circle */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1.5 flex flex-col items-center leading-none whitespace-nowrap pointer-events-none">
                      <span
                        className={`font-mono text-[12.5px] sm:text-[13px] font-extrabold tabular-nums transition-colors ${
                          isActive ? 'text-accent' : 'text-text-primary/80 group-hover:text-text-primary'
                        }`}
                      >
                        {node.num}
                      </span>
                      <span
                        className={`mt-0.5 font-mono text-[9.5px] sm:text-[10px] font-bold tracking-[0.1em] uppercase transition-colors ${
                          isActive ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary'
                        }`}
                      >
                        {node.label}
                      </span>
                    </div>
                  </button>
                );
              })}
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
