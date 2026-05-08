import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Code, Cpu, PlaySquare, Globe, Megaphone, FileText, Clock, Zap, TrendingUp, Users, Hexagon } from 'lucide-react';

interface ServiceDetailProps {
  id: string; // we ignore this now as the user requested static content "as it is"
  onBack: () => void;
  onContact: () => void;
}

const listData = [
  {
    num: '01',
    icon: <Code className="w-5 h-5 text-brand-dark" />,
    title: 'Digital Platforms',
    desc: 'Websites, Android Apps & Digital Platforms built for performance, scale and exceptional UX.'
  },
  {
    num: '02',
    icon: <Cpu className="w-5 h-5 text-brand-dark" />,
    title: 'Intelligent Automation',
    desc: 'AI agents, workflow automation & orchestration systems that eliminate manual work.'
  },
  {
    num: '03',
    icon: <PlaySquare className="w-5 h-5 text-brand-dark" />,
    title: 'AI Animation',
    desc: 'AI-powered animation, visual storytelling & cinematic content creation.'
  },
  {
    num: '04',
    icon: <Globe className="w-5 h-5 text-brand-dark" />,
    title: 'GIS Mapping',
    desc: 'Geospatial intelligence, mapping solutions & location-based analytics.'
  },
  {
    num: '05',
    icon: <Megaphone className="w-5 h-5 text-brand-dark" />,
    title: 'Social Media Advertising',
    desc: 'Performance campaigns on TikTok, X (Twitter), Instagram & more.'
  },
  {
    num: '06',
    icon: <FileText className="w-5 h-5 text-brand-dark" />,
    title: 'Technical Documentation',
    desc: 'Clear, structured & developer-friendly documentation that drives adoption.'
  }
];

export const ServiceDetail = ({ onBack, onContact }: ServiceDetailProps) => {
  return (
    <div className="bg-[#EBEBE6] min-h-screen text-brand-dark font-mono pb-20">
      <div className="max-w-[1400px] mx-auto px-6 py-12 md:py-16">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#93ACA7] hover:text-brand-dark transition-colors group cursor-pointer mb-12 font-medium"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-16 xl:gap-24 items-start mb-20">
          
          {/* Left Column */}
          <div className="flex flex-col">
            <div className="text-brand-[#93ACA7] text-lg font-mono mb-2 opacity-60">02</div>
            <div className="text-xs uppercase tracking-widest text-brand-accent font-bold mb-6">Our Engineered Services</div>
            
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight text-brand-dark leading-[1.1] mb-8 font-sans">
              Systems. Engineered <br className="hidden md:block" /> for Impact.
            </h1>
            
            <p className="text-sm md:text-base text-brand-dark/70 leading-relaxed mb-16 max-w-md font-mono">
              We deliver end-to-end digital solutions across multiple disciplines. Each service is designed as a modular system—built to integrate, scale, and drive measurable outcomes.
            </p>

            <div className="text-xs uppercase tracking-widest text-brand-accent font-bold mb-8">Explore Our Capabilities</div>
            
            {/* Simple Graphic Graphic Placeholder corresponding to image */}
            <div className="relative w-full max-w-[300px] aspect-video">
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="absolute inset-0 border border-brand-dark/10 rounded-xl flex items-center justify-center overflow-hidden"
               >
                 {/* Representing the isometric graphic roughly */}
                 <div className="relative w-full h-full p-4">
                   <div className="absolute top-4 left-4 text-[8px] text-[#93ACA7]">AUTOMATE &middot;</div>
                   <div className="absolute top-8 right-12 text-[8px] text-[#93ACA7]">ANALYZE &middot;</div>
                   <div className="absolute bottom-4 left-16 text-[8px] text-[#93ACA7]">BUILD &middot;</div>
                   <div className="absolute bottom-12 right-4 text-[8px] text-[#93ACA7]">SCALE &middot;</div>
                   <Hexagon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 text-[#D8DCD6] stroke-[0.5]" />
                   <Hexagon className="absolute top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-16 h-16 text-[#C9D0C8] stroke-[0.5]" />
                 </div>
               </motion.div>
            </div>
          </div>

          {/* Right Column (List) */}
          <div className="flex flex-col bg-[#F3F4F1] rounded-2xl border border-[#D5D8D3] overflow-hidden shadow-sm">
            {listData.map((item, index) => (
              <div 
                key={index} 
                className={`group flex items-start sm:items-center gap-4 sm:gap-6 p-6 sm:p-8 cursor-pointer transition-colors hover:bg-white
                  ${index !== listData.length - 1 ? 'border-b border-[#D5D8D3]' : ''}
                `}
                onClick={onContact}
              >
                {/* Index */}
                <div className="text-sm font-medium text-brand-dark/50 w-6 shrink-0 pt-1 sm:pt-0">
                  {item.num}
                </div>
                
                {/* Icon Box */}
                <div className="w-12 h-12 rounded-xl border border-[#D5D8D3] bg-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>

                {/* Content */}
                <div className="flex-1 pr-4">
                  <h3 className="text-base sm:text-lg font-bold text-brand-dark mb-1 font-mono">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#798885] leading-relaxed max-w-xl font-mono">
                    {item.desc}
                  </p>
                </div>

                {/* Arrow */}
                <div className="shrink-0 pt-1 sm:pt-0 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                  <ArrowRight size={18} className="text-brand-dark" />
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Dark Section */}
        <div className="bg-brand-dark rounded-3xl p-8 md:p-12 lg:p-16 text-white grid grid-cols-1 xl:grid-cols-[1.5fr_2fr] gap-12 items-center">
          
          <div className="flex flex-col">
             <div className="text-[10px] uppercase tracking-widest text-[#93ACA7] font-bold mb-4">Built for Complexity</div>
             <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium font-sans leading-tight text-white max-w-lg">
               From concept to scale – we engineer systems that power your business forward.
             </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 lg:gap-8">
            <div className="flex flex-col">
              <Clock className="w-6 h-6 text-white mb-4 opacity-80" strokeWidth={1.5} />
              <div className="text-2xl lg:text-3xl font-bold mb-2">99.9%</div>
              <div className="text-[10px] text-[#93ACA7] uppercase tracking-widest">System Reliability</div>
            </div>
            
            <div className="flex flex-col">
              <Zap className="w-6 h-6 text-white mb-4 opacity-80" strokeWidth={1.5} />
              <div className="text-2xl lg:text-3xl font-bold mb-2">4.5x</div>
              <div className="text-[10px] text-[#93ACA7] uppercase tracking-widest">Process Velocity</div>
            </div>

            <div className="flex flex-col">
              <TrendingUp className="w-6 h-6 text-white mb-4 opacity-80" strokeWidth={1.5} />
              <div className="text-2xl lg:text-3xl font-bold mb-2">300+</div>
              <div className="text-[10px] text-[#93ACA7] uppercase tracking-widest">Projects Delivered</div>
            </div>

            <div className="flex flex-col">
              <Users className="w-6 h-6 text-white mb-4 opacity-80" strokeWidth={1.5} />
              <div className="text-2xl lg:text-3xl font-bold mb-2">50+</div>
              <div className="text-[10px] text-[#93ACA7] uppercase tracking-widest">Happy Clients</div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

