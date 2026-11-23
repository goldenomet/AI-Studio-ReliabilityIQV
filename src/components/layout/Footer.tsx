import React from 'react';
import { Linkedin, Twitter, Github, Youtube, Instagram, Lock, ArrowUpRight, Globe } from 'lucide-react';
import logo from '@/src/assets/images/logo.png';

export const SocialLink = ({ href, icon: Icon, label }: { href: string, icon: any, label: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer" 
    className="w-10 h-10 rounded-full frosted-panel hover:bg-accent hover:text-white flex items-center justify-center text-text-primary hover:scale-105 transition-all duration-200"
    aria-label={label}
    title={label}
  >
    <Icon size={17} />
  </a>
);

export const Footer = ({ onNavigate }: { onNavigate?: (p: string) => void }) => (
  <footer className="bg-white/60 dark:bg-[#07142b]/85 backdrop-blur-2xl text-text-primary pt-20 pb-12 transition-colors duration-500 border-t border-border-primary relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-6 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        
        {/* Brand column */}
        <div className="col-span-1">
          <div 
            className="flex items-center gap-3 mb-5 cursor-pointer group w-fit"
            onClick={() => onNavigate?.('home')}
          >
            <div className="w-10 h-10 rounded-full frosted-panel flex items-center justify-center p-1.5 group-hover:scale-105 transition-transform">
              <img src={logo} alt="ReliabilityIQ" className="w-full h-full object-contain" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-text-primary font-sans">
              Reliability<span className="text-accent">IQ</span>
            </span>
          </div>
          <p className="text-text-secondary font-sans text-sm leading-relaxed mb-7 max-w-xs">
            Optimizing mission-critical digital infrastructure from Lagos to the world. We build resilient systems for modern enterprises.
          </p>
          <div className="flex gap-2.5 items-center">
            <SocialLink href="https://youtube.com/shorts/6W0wKw3zz6w?si=Qfu9R35C7ozK7vQh" icon={Youtube} label="YouTube" />
            <SocialLink href="https://www.instagram.com/reliabilityiqventures?igsi=MWM3NngzdmF2dmtwbA==" icon={Instagram} label="Instagram" />
            <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
            <SocialLink href="#" icon={Twitter} label="Twitter" />
            <SocialLink href="#" icon={Github} label="Github" />
          </div>
        </div>

        {/* Services Links */}
        <div>
          <h4 className="font-sans text-xs uppercase tracking-widest text-accent font-bold mb-5">Services</h4>
          <ul className="flex flex-col gap-3 font-sans text-sm text-text-secondary">
            <li><button onClick={() => onNavigate?.('service-development')} className="hover:text-accent transition-colors text-left flex items-center gap-1.5 group cursor-pointer"><span>Web Operations</span> <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
            <li><button onClick={() => onNavigate?.('service-automation')} className="hover:text-accent transition-colors text-left flex items-center gap-1.5 group cursor-pointer"><span>AI Automations</span> <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
            <li><button onClick={() => onNavigate?.('service-gis')} className="hover:text-accent transition-colors text-left flex items-center gap-1.5 group cursor-pointer"><span>GIS Mapping</span> <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
            <li><button onClick={() => onNavigate?.('service-documentation')} className="hover:text-accent transition-colors text-left flex items-center gap-1.5 group cursor-pointer"><span>Technical Reports</span> <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
            <li><button onClick={() => onNavigate?.('service-branding')} className="hover:text-accent transition-colors text-left flex items-center gap-1.5 group cursor-pointer"><span>Content &amp; Design</span> <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 transition-opacity" /></button></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="font-sans text-xs uppercase tracking-widest text-accent font-bold mb-5">Company</h4>
          <ul className="flex flex-col gap-3 font-sans text-sm text-text-secondary">
            <li><button onClick={() => onNavigate?.('about')} className="hover:text-accent transition-colors text-left cursor-pointer">About Us</button></li>
            <li><button onClick={() => onNavigate?.('home')} className="hover:text-accent transition-colors text-left cursor-pointer">Case Studies</button></li>
            <li><button onClick={() => onNavigate?.('trending')} className="hover:text-accent transition-colors text-left cursor-pointer">Trending Solutions</button></li>
            <li><button onClick={() => onNavigate?.('contact')} className="hover:text-accent transition-colors text-left cursor-pointer">Contact &amp; Consult</button></li>
          </ul>
        </div>

        {/* Regional Presence */}
        <div>
          <h4 className="font-sans text-xs uppercase tracking-widest text-accent font-bold mb-5">Headquarters</h4>
          <div className="frosted-panel rounded-2xl p-5 font-sans text-xs space-y-3">
            <div className="flex items-start gap-2.5 pb-3 border-b border-border-subtle">
              <Globe size={16} className="text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-text-primary">Lagos, Nigeria</p>
                <p className="text-text-secondary mt-0.5">Ipaja Operations Hub · West Africa</p>
              </div>
            </div>
            <div>
              <p className="font-semibold text-text-primary">Direct Inquiries</p>
              <a href="mailto:reliabilityiqventures@gmail.com" className="text-accent hover:underline break-all mt-0.5 inline-block">
                reliabilityiqventures@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4 text-text-secondary font-sans text-xs">
        <p className="flex items-center gap-2">
          © {new Date().getFullYear()} ReliabilityIQ Ventures. All rights reserved.
          <button 
            onClick={() => onNavigate?.('admin')} 
            className="hover:text-accent transition-colors ml-2 opacity-40 hover:opacity-100 cursor-pointer"
            title="Admin Dashboard"
            aria-label="Admin Dashboard"
          >
            <Lock size={12} />
          </button>
        </p>
        <div className="flex gap-6 text-text-secondary">
          <a href="#" className="hover:text-text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-text-primary transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-text-primary transition-colors">Security Standards</a>
        </div>
      </div>
    </div>
  </footer>
);
