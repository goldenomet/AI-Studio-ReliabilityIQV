import React from 'react';
import { motion } from 'motion/react';
import { Linkedin, Twitter, Github } from 'lucide-react';
import logo from '../../assets/images/logo.png';

export const SocialLink = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => (
  <div className="relative group">
    <a href={href} className="hover:text-brand-accent transition-colors block">
      <Icon size={20} />
    </a>
    <motion.div
      initial={{ opacity: 0, y: 10, x: '-50%' }}
      whileHover={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-brand-accent text-white text-[10px] font-mono font-bold uppercase tracking-wider rounded pointer-events-none opacity-0 group-hover:opacity-100 whitespace-nowrap z-20"
    >
      {label}
      <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] border-t-brand-accent"></div>
    </motion.div>
  </div>
);

export const Footer = () => (
  <footer className="bg-brand-footer text-white pt-20 pb-10 transition-colors duration-500">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1">
          <div className="flex items-center gap-2 mb-6 text-white font-mono">
            <img src={logo} alt="logo" loading="lazy" referrerPolicy="no-referrer" className="h-[50px] w-[50px] object-contain brightness-0 invert" />
            <span className="text-xl font-bold tracking-tight">
              ReliabilityIQ
            </span>
          </div>
          <p className="text-white/60 font-mono text-sm leading-relaxed mb-8 max-w-xs">
            Optimizing digital infrastructure from Lagos to the world. We build resilient systems for the modern global enterprise.
          </p>
          <div className="flex gap-4">
            <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
            <SocialLink href="#" icon={Twitter} label="Twitter" />
            <SocialLink href="#" icon={Github} label="Github" />
          </div>
        </div>

        <div>
          <h4 className="font-mono text-sm uppercase tracking-widest text-brand-accent mb-6">Services</h4>
          <ul className="flex flex-col gap-4 font-mono text-sm text-white/70">
            <li><a href="#" className="hover:text-white transition-colors">Web Operations</a></li>
            <li><a href="#" className="hover:text-white transition-colors">AI Automations</a></li>
            <li><a href="#" className="hover:text-white transition-colors">GIS Mapping</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Technical Reports</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Content & Design</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-sm uppercase tracking-widest text-brand-accent mb-6">Company</h4>
          <ul className="flex flex-col gap-4 font-mono text-sm text-white/70">
            <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Leadership Team</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Case Studies</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-sm uppercase tracking-widest text-brand-accent mb-6">System Status</h4>
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

      <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-white/40 font-mono text-[10px] uppercase tracking-widest">
        <p>© 2026 ReliabilityIQ Ventures. All rights reserved.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
          <a href="#" className="hover:text-white">Security</a>
        </div>
      </div>
    </div>
  </footer>
);
