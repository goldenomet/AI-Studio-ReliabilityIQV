/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { 
  Menu, X, Cpu, Globe, Zap, FileText, Map as MapIcon, 
  PenTool, ArrowRight, Linkedin, Twitter, Github, 
  Mail, Phone, MapPin, Search, Filter, Star, Info, ArrowUp
} from 'lucide-react';
import logoUrl from './assets/logo.svg';

// --- Shared Components ---

const Logo = () => (
  <div className="flex items-center gap-2">
    <img src={logoUrl} alt="ReliabilityIQ Logo" className="h-[50px] w-[50px] object-contain" />
    <span className="font-mono text-xl font-bold tracking-tight text-brand-dark">
      ReliabilityIQ Ventures
    </span>
  </div>
);

const Navbar = ({ currentPage, setCurrentPage }: { currentPage: string, setCurrentPage: (p: string) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Trending Products', id: 'trending' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 backdrop-blur-md overflow-hidden ${isScrolled ? 'bg-brand-bg/40 py-3 shadow-sm border-b border-brand-dark/5' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between relative z-10">
        <button onClick={() => setCurrentPage('about')} className="cursor-pointer">
          <Logo />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`font-mono text-sm tracking-wide transition-colors hover:text-brand-accent ${currentPage === item.id ? 'text-brand-accent border-b-2 border-brand-accent pb-0.5' : 'text-brand-dark/70'}`}
            >
              {item.name}
            </button>
          ))}
          <button 
            onClick={() => setCurrentPage('contact')}
            className="bg-brand-accent text-white px-6 py-2 rounded-full font-mono text-sm hover:bg-brand-accent-light transition-all shadow-md active:scale-95"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-dark" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-bg border-b border-brand-dark/10 p-6 md:hidden flex flex-col gap-4 shadow-xl"
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentPage(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`font-mono text-lg text-left ${currentPage === item.id ? 'text-brand-accent' : 'text-brand-dark'}`}
              >
                {item.name}
              </button>
            ))}
            <button 
              onClick={() => {
                setCurrentPage('contact');
                setMobileMenuOpen(false);
              }}
              className="mt-4 bg-brand-accent text-white px-6 py-3 rounded-full font-mono text-center"
            >
              Get Started
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Footer = () => (
  <footer className="bg-brand-dark text-white pt-20 pb-10">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 md:col-span-1">
          <div className="flex items-center gap-2 mb-6">
            <img src={logoUrl} alt="ReliabilityIQ Logo" className="h-[50px] w-[50px] object-contain brightness-0 invert" />
            <span className="font-mono text-xl font-bold tracking-tight">
              ReliabilityIQ
            </span>
          </div>
          <p className="text-brand-bg/60 font-mono text-sm leading-relaxed mb-8 max-w-xs">
            Engineering resilient digital infrastructures for enterprises that demand perfection.
          </p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-brand-accent transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="hover:text-brand-accent transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-brand-accent transition-colors"><Github size={20} /></a>
          </div>
        </div>

        <div>
          <h4 className="font-mono text-sm uppercase tracking-widest text-brand-accent-light mb-6">Services</h4>
          <ul className="flex flex-col gap-4 font-mono text-sm text-brand-bg/70">
            <li><a href="#" className="hover:text-white transition-colors">Web Operations</a></li>
            <li><a href="#" className="hover:text-white transition-colors">AI Automations</a></li>
            <li><a href="#" className="hover:text-white transition-colors">GIS Mapping</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Technical Reports</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Content & Design</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-sm uppercase tracking-widest text-brand-accent-light mb-6">Company</h4>
          <ul className="flex flex-col gap-4 font-mono text-sm text-brand-bg/70">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Leadership Team</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-sm uppercase tracking-widest text-brand-accent-light mb-6">System Status</h4>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-xs">
            <div className="flex items-center justify-between mb-3">
              <span>Global API</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Operational
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Cloud Nodes</span>
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                Operational
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-brand-bg/40 font-mono text-[10px] uppercase tracking-widest">
        <p>© 2024 ReliabilityIQ Ventures. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Security</a>
        </div>
      </div>
    </div>
  </footer>
);

// --- Page Content Components ---

const TiltCard = ({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) => {
  const ref = React.useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...style
      }}
      className="relative w-full h-full"
    >
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d", width: '100%', height: '100%' }}>
        {children}
      </div>
    </motion.div>
  );
};

const HeroSection = ({ onNavigate }: { onNavigate: (p: string) => void }) => {
  return (
  <section className="pt-16 pb-20 md:pt-24 md:pb-32 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent/10 rounded-full text-brand-accent font-mono text-xs mb-6">
          <span className="w-1.5 h-1.5 bg-brand-accent rounded-full"></span>
          Innovating the Future of IT
        </div>
        <h1 className="text-6xl md:text-8xl font-bold text-brand-dark leading-[0.9] mb-8">
          Building <br /> Reliable <br /> Ventures.
        </h1>
        <p className="text-lg md:text-xl text-brand-dark/70 mb-10 max-w-md leading-relaxed font-mono">
          We deliver enterprise-grade web operations, advanced AI automations, and strategic GIS mapping to scale your technological infrastructure.
        </p>
        <div className="flex flex-wrap gap-4 font-mono">
          <button 
            onClick={() => onNavigate('services')}
            className="bg-brand-accent text-white px-8 py-3 rounded-full hover:bg-brand-accent-light transition-all shadow-lg hover:shadow-brand-accent/20"
          >
            Explore Services
          </button>
          <button 
            onClick={() => onNavigate('about')}
            className="border-2 border-brand-accent/20 px-8 py-3 rounded-full hover:bg-brand-accent/5 transition-all text-brand-dark"
          >
            Our Story
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <div className="rounded-3xl overflow-hidden shadow-2xl relative aspect-square md:aspect-auto md:h-[600px]">
          <TiltCard style={{ width: '100%', height: '100%' }}>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
              alt="Team working" 
              className="w-full h-full object-cover filter grayscale brightness-75 rounded-3xl"
              referrerPolicy="no-referrer"
            />
          </TiltCard>
          {/* Glass Overlays */}
          <div className="absolute top-12 right-12 glass p-6 rounded-2xl w-48 animate-bounce-slow">
             <div className="flex items-center gap-2 text-brand-accent mb-2">
                <Cpu size={16} />
                <span className="font-mono text-[10px] uppercase tracking-tighter">AI Automations</span>
             </div>
             <div className="text-3xl font-bold font-mono">500+</div>
             <div className="text-[10px] text-white/60 font-mono">Deployed globally</div>
          </div>

          <div className="absolute bottom-12 left-12 glass p-8 rounded-2xl w-64">
             <div className="flex items-center gap-2 text-brand-accent mb-4">
                <Zap size={18} />
                <span className="font-mono text-xs uppercase tracking-tighter">System Uptime</span>
             </div>
             <div className="text-4xl font-bold font-mono flex items-end gap-1">
               99.99<span className="text-lg opacity-60">%</span>
             </div>
             <div className="text-xs text-brand-accent font-mono mt-2 flex items-center gap-1">
               <ArrowRight size={12} className="-rotate-45" /> +0.01% this quarter
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  </section>
  );
};

const MissionSection = () => (
  <section className="bg-brand-dark text-white py-32 px-6 relative overflow-hidden">
    {/* Grid Pattern */}
    <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
    
    <div className="max-w-4xl mx-auto text-center relative z-10">
      <div className="flex justify-center mb-8">
        <span className="text-6xl font-mono opacity-20">“</span>
      </div>
      <h2 className="text-3xl md:text-5xl font-bold font-mono leading-tight mb-16 tracking-tight">
        Our mission is to engineer flawless digital ecosystems that empower ambitious companies to scale without friction.
      </h2>
      
      <div className="flex flex-wrap justify-center gap-12 md:gap-24">
        <div className="text-center group">
          <div className="text-brand-accent text-4xl md:text-5xl font-mono font-bold mb-2 group-hover:scale-110 transition-transform">10+</div>
          <div className="text-xs font-mono tracking-widest text-brand-bg/40 uppercase">Years Exp</div>
        </div>
        <div className="text-center group">
          <div className="text-brand-accent text-4xl md:text-5xl font-mono font-bold mb-2 group-hover:scale-110 transition-transform">250+</div>
          <div className="text-xs font-mono tracking-widest text-brand-bg/40 uppercase">Projects</div>
        </div>
        <div className="text-center group">
          <div className="text-brand-accent text-4xl md:text-5xl font-mono font-bold mb-2 group-hover:scale-110 transition-transform">50m</div>
          <div className="text-xs font-mono tracking-widest text-brand-bg/40 uppercase">Data Points</div>
        </div>
      </div>
    </div>
  </section>
);

const ServiceCard = ({ 
  icon: Icon, 
  title, 
  description, 
  onAction,
  hasImage = false 
}: { 
  icon: any, 
  title: string, 
  description: string, 
  onAction: () => void,
  hasImage?: boolean
}) => (
  <div className="bg-white rounded-[40px] p-10 shadow-sm border border-brand-dark/5 flex flex-col items-start h-full group hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
    <div className="p-4 bg-brand-accent/10 rounded-2xl text-brand-accent mb-8 group-hover:bg-brand-accent group-hover:text-white transition-colors duration-500">
      <Icon size={24} />
    </div>
    <h3 className="text-2xl font-bold mb-6 font-mono tracking-tight">{title}</h3>
    <p className="text-brand-dark/60 font-mono text-sm leading-relaxed mb-8">
      {description}
    </p>
    
    {hasImage && (
      <div className="mt-auto w-full aspect-video rounded-3xl overflow-hidden mb-8">
         <img 
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop" 
            alt={title} 
            className="w-full h-full object-cover filter grayscale opacity-50 contrast-125"
            referrerPolicy="no-referrer"
         />
      </div>
    )}

    <button 
      onClick={onAction}
      className="mt-auto flex items-center gap-2 text-brand-accent font-mono text-sm font-bold group-hover:gap-4 transition-all"
    >
      Explore Service <ArrowRight size={16} />
    </button>
  </div>
);

const CompetenciesSection = ({ onContact }: { onContact: () => void }) => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-brand-accent mb-4">Core Competencies</div>
          <h2 className="text-5xl md:text-7xl font-bold text-brand-dark leading-[0.9]">
            Engineered for <br /> maximum impact.
          </h2>
        </div>
        <p className="max-w-sm font-mono text-sm text-brand-dark/60 leading-relaxed">
          Comprehensive IT solutions designed to automate, visualize, and scale your operations with military-grade reliability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <ServiceCard 
          icon={Globe}
          title="Web Operations"
          description="Robust server management, cloud infrastructure deployment, and high-availability architecture to keep your platforms running 24/7."
          onAction={onContact}
        />
        <ServiceCard 
          icon={Cpu}
          title="AI Automations"
          description="Custom machine learning models and workflow automations that eliminate manual tasks and accelerate decision-making processes."
          onAction={onContact}
        />
        <ServiceCard 
          icon={MapIcon}
          title="GIS Mapping"
          description="Advanced spatial data analysis and interactive map development for logistics, urban planning, and resource management."
          onAction={onContact}
        />
        <ServiceCard 
          icon={FileText}
          title="Technical Reports"
          description="In-depth research, data synthesis, and professional technical documentation tailored for stakeholders and regulatory compliance."
          onAction={onContact}
        />
        <div className="md:col-span-2">
           <ServiceCard 
            icon={PenTool}
            title="Content & Design Studio"
            description="Full-stack creative services combining AI-driven animation, UX/UI design, and compelling copywriting to elevate your brand's digital presence across all touchpoints."
            onAction={onContact}
            hasImage
          />
        </div>
      </div>
    </div>
  </section>
);

const NarrativeSection = () => (
  <section className="py-32 px-6">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
      <div className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-[4/5]">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
          alt="Office work" 
          className="w-full h-full object-cover filter grayscale contrast-125"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-10 left-10 p-10 glass rounded-3xl max-w-xs">
          <h4 className="text-brand-accent font-mono text-2xl font-bold mb-2">Founded in 2014</h4>
          <p className="text-white/70 font-mono text-xs leading-relaxed">
            From a small room of 3 engineers to a global powerhouse of 50+ experts.
          </p>
        </div>
      </div>

      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-brand-accent mb-6">The Narrative</div>
        <h2 className="text-5xl md:text-7xl font-bold text-brand-dark mb-12 tracking-tight leading-[0.9]">
          Driven by logic, defined by results.
        </h2>

        <div className="space-y-12">
          {[
            { num: '01', title: 'The Genesis', text: 'We recognized a critical gap in how enterprises approached IT—too much theory, not enough robust execution. ReliabilityIQ was born to build systems that simply don\'t fail.' },
            { num: '02', title: 'The AI Pivot', text: 'As technology evolved, so did we. Integrating advanced AI automations allowed us to transition our clients from reactive maintenance to proactive scaling.' },
            { num: '03', title: 'Global Reach', text: 'Today, we manage web operations and spatial data for Fortune 500s, maintaining the same obsessive attention to detail we had on day one.' }
          ].map((step) => (
            <div key={step.num} className="flex gap-8 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-brand-accent/20 flex items-center justify-center font-mono text-sm font-bold text-brand-accent group-hover:bg-brand-accent group-hover:text-white transition-all">
                {step.num}
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3 font-mono">{step.title}</h4>
                <p className="text-brand-dark/50 font-mono text-sm leading-relaxed">
                  {step.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const ContactSection = () => {
  return (
    <section id="contact-section" className="pb-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-[48px] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-brand-dark/10">
          {/* Form */}
          <div className="lg:w-1/2 p-12 md:p-20 border-r border-brand-dark/10">
            <div className="font-mono text-xs uppercase tracking-widest text-brand-accent mb-4">Start a Conversation</div>
            <h2 className="text-4xl md:text-5xl font-bold font-mono mb-12 leading-tight text-brand-dark">
              Ready to upgrade your infrastructure?
            </h2>

            <form className="space-y-8 font-mono text-sm" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-[10px] uppercase text-brand-dark/50 mb-2 font-bold tracking-tighter">First Name</label>
                  <input 
                    type="text" 
                    placeholder="John" 
                    className="w-full bg-brand-bg p-4 rounded-xl outline-none border border-transparent focus:border-brand-accent/20 focus:bg-white transition-all text-brand-dark placeholder:text-brand-dark/40"
                  />
                </div>
                <div>
                   <label className="block text-[10px] uppercase text-brand-dark/50 mb-2 font-bold tracking-tighter">Last Name</label>
                   <input 
                    type="text" 
                    placeholder="Doe" 
                    className="w-full bg-brand-bg p-4 rounded-xl outline-none border border-transparent focus:border-brand-accent/20 focus:bg-white transition-all text-brand-dark placeholder:text-brand-dark/40"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-brand-dark/50 mb-2 font-bold tracking-tighter">Work Email</label>
                <input 
                  type="email" 
                  placeholder="john@company.com" 
                  className="w-full bg-brand-bg p-4 rounded-xl outline-none border border-transparent focus:border-brand-accent/20 focus:bg-white transition-all text-brand-dark placeholder:text-brand-dark/40"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase text-brand-dark/50 mb-2 font-bold tracking-tighter">Service Interest</label>
                <select className="w-full bg-brand-bg p-4 rounded-xl outline-none font-mono text-sm cursor-pointer border border-transparent focus:border-brand-accent/20 focus:bg-white transition-all text-brand-dark">
                  <option>Web Operations</option>
                  <option>AI Automations</option>
                  <option>GIS Mapping</option>
                  <option>Technical Reports</option>
                  <option>Content & Design</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase text-brand-dark/50 mb-2 font-bold tracking-tighter">Project Details</label>
                <textarea 
                  rows={4} 
                  placeholder="Tell us about your technical challenges..." 
                  className="w-full bg-brand-bg p-4 rounded-xl outline-none border border-transparent focus:border-brand-accent/20 focus:bg-white transition-all resize-none text-brand-dark placeholder:text-brand-dark/40"
                ></textarea>
              </div>

              <button className="w-full bg-brand-accent text-white py-5 rounded-2xl text-lg font-bold hover:bg-brand-accent-light transition-all shadow-xl active:scale-95">
                Submit Request
              </button>
            </form>
          </div>

          {/* Map/Info */}
          <div className="lg:w-1/2 relative bg-brand-bg/50 p-12 md:p-20 flex flex-col justify-between overflow-hidden">
            {/* Map Placeholder */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
               <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5ce?q=80&w=2066&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale" 
                alt="map"
              />
            </div>
            
            <div className="relative z-10 flex-grow flex items-center justify-center">
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ repeat: Infinity, duration: 3 }}
                 className="relative"
               >
                 <div className="bg-brand-accent p-4 rounded-full text-white shadow-2xl relative z-10 border-4 border-white">
                   <MapPin size={24} />
                 </div>
                 
                 <div className="absolute top-[calc(100%+20px)] left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] w-64 text-center border border-white/50">
                   <h5 className="font-bold font-mono text-sm text-brand-dark mb-1">ReliabilityIQ HQ</h5>
                   <p className="text-[10px] uppercase tracking-tighter font-mono text-brand-dark/40">Tech District, San Francisco</p>
                 </div>
               </motion.div>
            </div>

            <div className="relative z-10 bg-transparent border border-brand-dark/10 p-8 rounded-[24px] mt-20 md:mt-0 flex flex-col md:flex-row gap-8 justify-between">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-brand-dark/50 mb-2 font-bold">Direct Line</div>
                <div className="font-mono text-sm text-brand-dark tracking-tighter leading-none font-medium">+1 (800) 555-0199</div>
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-brand-dark/50 mb-2 font-bold">Support Email</div>
                <div className="font-mono text-sm text-brand-dark tracking-tighter leading-none font-medium">ops@reliabilityiq.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TrendingProducts = () => (
  <section className="pt-20 pb-32 px-6">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-brand-accent mb-4">Market Favorites</div>
          <h2 className="text-5xl md:text-7xl font-bold text-brand-dark leading-[0.9]">
            Trending <br /> Infrastructures.
          </h2>
        </div>
        <div className="flex gap-3 font-mono">
          <button className="p-3 bg-brand-dark text-white rounded-xl shadow-md"><Search size={18} /></button>
          <button className="flex items-center gap-2 p-3 border-2 border-brand-dark/5 rounded-xl text-brand-dark/60 text-sm"><Filter size={18} /> Sort by popularity</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "IQ-Nodes Cluster", tag: "Hot", desc: "Edge computing cluster with sub-10ms latency for real-time AI processing.", price: "$2,400/mo", img: "https://images.unsplash.com/photo-1558494949-ef0109dec8d8?q=80&w=2012&auto=format&fit=crop" },
          { title: "Sentinel AI Firewall", tag: "New", desc: "Behavioral-based network security layer that predics attacks before they manifest.", price: "$1,850/mo", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" },
          { title: "Geo-Insight Dashboard", tag: "Bestseller", desc: "Real-time logistics visualization engine with integrated weather and traffic data.", price: "$900/mo", img: "https://images.unsplash.com/photo-1551288049-bbbda536339a?q=80&w=2070&auto=format&fit=crop" },
          { title: "Auto-Scale VPS Pro", tag: "Efficiency", desc: "Server resources that fluctuate with your traffic without any downtime or manual config.", price: "Custom", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=2070&auto=format&fit=crop" },
          { title: "DataCleanse API", tag: "AI", desc: "Sanitize and structure messy enterprise data at the scale of terabytes per hour.", price: "$0.05/req", img: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop" },
          { title: "Vortex CDN", tag: "Speed", desc: "Global asset delivery with integrated image compression and intelligent caching.", price: "$120/mo", img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" },
        ].map((prod, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-[32px] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500"
          >
            <div className="aspect-video relative overflow-hidden">
               <img 
                src={prod.img} 
                alt={prod.title} 
                className="w-full h-full object-cover grayscale brightness-75 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" 
                referrerPolicy="no-referrer"
              />
               <div className="absolute top-4 right-4 bg-brand-accent text-white px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">{prod.tag}</div>
            </div>
            <div className="p-8">
               <div className="flex justify-between items-start mb-4">
                 <h3 className="text-xl font-bold font-mono tracking-tight group-hover:text-brand-accent transition-colors">{prod.title}</h3>
                 <div className="flex text-amber-400"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div>
               </div>
               <p className="text-brand-dark/50 font-mono text-[11px] leading-relaxed mb-6">{prod.desc}</p>
               <div className="flex justify-between items-center border-t border-brand-dark/5 pt-6">
                 <div className="font-mono font-bold text-brand-dark">{prod.price}</div>
                 <button className="bg-brand-dark text-white p-3 rounded-xl hover:bg-brand-accent transition-colors"><Info size={16} /></button>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Main App ---

const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-brand-accent text-white rounded-full shadow-xl hover:bg-opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-brand-accent/50 cursor-pointer"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('about');

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <HeroSection onNavigate={setCurrentPage} />
            <MissionSection />
            <CompetenciesSection onContact={() => setCurrentPage('contact')} />
            <NarrativeSection />
          </motion.div>
        );
      case 'services':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <CompetenciesSection onContact={() => setCurrentPage('contact')} />
            {/* Additional detailed services content could go here */}
            <div className="bg-brand-dark text-white py-32 px-6">
               <div className="max-w-4xl mx-auto text-center">
                  <h2 className="text-4xl md:text-6xl font-bold font-mono mb-12">Looking for a custom solution?</h2>
                  <p className="text-brand-bg/60 font-mono mb-12 text-lg">Our engineering team specializes in scaling legacy infrastructures and integrating greenfield AI solutions.</p>
                  <button 
                  onClick={() => setCurrentPage('contact')}
                  className="bg-brand-accent text-white px-12 py-5 rounded-full text-xl font-bold font-mono hover:bg-brand-accent-light transition-all"
                  >
                    Request a Custom Quote
                  </button>
               </div>
            </div>
          </motion.div>
        );
      case 'trending':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <TrendingProducts />
          </motion.div>
        );
      case 'contact':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24"
          >
            <ContactSection />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {renderPage()}
        </AnimatePresence>

        {/* Contact Section added before footer on all pages except explicit contact page */}
        {currentPage !== 'contact' && (
          <ContactSection />
        )}
      </main>

      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
