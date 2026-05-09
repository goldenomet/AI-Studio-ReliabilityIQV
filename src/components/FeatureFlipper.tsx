import React from 'react';
import { ArrowRight, Code, BrainCircuit, Video, Map, Megaphone, FileText, Clock, Zap, TrendingUp, Users, ArrowLeft } from 'lucide-react';

export const EngineeredServicesSection = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const serviceList = [
    {
      id: "01",
      icon: <Code size={24} />,
      title: "Digital Platforms",
      desc: "Websites, Android Apps & Digital Platforms built for performance, scale and exceptional UX.",
      target: "service-branding"
    },
    {
      id: "02",
      icon: <BrainCircuit size={24} />,
      title: "Intelligent Automation",
      desc: "AI agents, workflow automation & orchestration systems that eliminate manual work.",
      target: "service-automation"
    },
    {
      id: "03",
      icon: <Video size={24} />,
      title: "AI Animation",
      desc: "AI-powered animation, visual storytelling & cinematic content creation.",
      target: "service-animation"
    },
    {
      id: "04",
      icon: <Map size={24} />,
      title: "GIS Mapping",
      desc: "Geospatial intelligence, mapping solutions & location-based analytics.",
      target: "service-gis"
    },
    {
      id: "05",
      icon: <Megaphone size={24} />,
      title: "Social Media Advertising",
      desc: "Performance campaigns on TikTok, X (Twitter), Instagram & more.",
      target: "service-social"
    },
    {
      id: "06",
      icon: <FileText size={24} />,
      title: "Technical Documentation",
      desc: "Clear, structured & developer-friendly documentation that drives adoption.",
      target: "service-documentation"
    }
  ];

  return (
    <section className="bg-[#e8f1ee] py-20 px-6 font-mono text-[#0a3a40]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 mb-20">
          {/* Left Column */}
          <div className="lg:w-[40%]">
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#15464a] mb-6">Our Engineered Services</div>
            
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              Systems. Engineered <br /> for Impact.
            </h2>
            
            <p className="text-sm leading-relaxed opacity-70 mb-12 max-w-sm">
              We deliver end-to-end digital solutions across multiple disciplines. Each service is designed as a modular system—built to integrate, scale, and drive measurable outcomes.
            </p>
            
            <button 
              className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold group"
            >
              Explore Our Capabilities
              <div className="flex">
                <span className="w-1 h-1 bg-[#15464a] rounded-full mx-0.5 opacity-20 group-hover:opacity-100 transition-all"></span>
                <span className="w-1 h-1 bg-[#15464a] rounded-full mx-0.5 opacity-40 group-hover:opacity-100 transition-all"></span>
                <span className="w-1 h-1 bg-[#15464a] rounded-full mx-0.5 opacity-100"></span>
              </div>
            </button>

            {/* Illustration Placeholder (Wireframe boxes) */}
            <div className="mt-20 opacity-20 hidden md:block">
               {/* Simplified Isometric Grid Illustration */}
               <div className="relative w-full h-48">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <svg width="300" height="200" viewBox="0 0 300 200" fill="none">
                      <path d="M150 20L280 90L150 160L20 90L150 20Z" stroke="currentColor" strokeWidth="0.5" />
                      <rect x="130" y="70" width="40" height="60" stroke="currentColor" strokeWidth="1" />
                      <rect x="80" y="100" width="30" height="30" stroke="currentColor" strokeWidth="1" />
                      <rect x="190" y="110" width="20" height="20" stroke="currentColor" strokeWidth="1" />
                      <circle cx="240" cy="80" r="10" stroke="currentColor" strokeWidth="1" />
                      <path d="M150 130L150 160" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                      <path d="M130 100L80 115" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
                      <text x="50" y="150" fill="currentColor" fontSize="8" className="tracking-widest uppercase">Build</text>
                      <text x="250" y="60" fill="currentColor" fontSize="8" className="tracking-widest uppercase">Analyze</text>
                    </svg>
                  </div>
               </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-[60%] space-y-4">
            {serviceList.map((service) => (
              <div 
                key={service.id} 
                onClick={() => onNavigate(service.target)}
                className="group p-6 bg-white/[0.3] backdrop-blur-sm rounded-2xl border border-white/40 flex items-center gap-6 hover:bg-white/60 transition-all cursor-pointer"
              >
                <div className="text-xs font-bold opacity-30 group-hover:opacity-60 transition-opacity shrink-0">{service.id}</div>
                <div className="w-12 h-12 rounded-xl border border-[#0a3a40]/10 flex items-center justify-center shrink-0">
                  {service.icon}
                </div>
                <div className="flex-grow">
                  <h4 className="text-lg font-bold mb-1">{service.title}</h4>
                  <p className="text-[10px] opacity-60 leading-relaxed max-w-md">{service.desc}</p>
                </div>
                <div className="w-10 h-10 rounded-full border border-[#0a3a40]/10 bg-white/50 flex justify-center items-center opacity-50 group-hover:opacity-100 group-hover:bg-[#0a3a40] group-hover:text-white transition-colors">
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Banner */}
        <div className="bg-[#0a3a40] rounded-[32px] p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="text-[10px] uppercase tracking-widest opacity-40 font-bold mb-4">Built for Complexity</div>
            <h3 className="text-2xl md:text-3xl font-bold leading-tight">
              From concept to scale — we engineer systems that power your business forward.
            </h3>
          </div>
          <div className="md:w-1/2 grid grid-cols-2 md:grid-cols-4 gap-8 w-full border-l border-white/10 pl-0 md:pl-12">
            <div className="space-y-1">
              <Clock size={20} className="text-[#a7d0c3] mb-2" />
              <div className="text-xl font-bold">99.9%</div>
              <div className="text-[8px] uppercase tracking-widest opacity-40">System Reliability</div>
            </div>
            <div className="space-y-1">
              <Zap size={20} className="text-[#a7d0c3] mb-2" />
              <div className="text-xl font-bold">4.5x</div>
              <div className="text-[8px] uppercase tracking-widest opacity-40">Process Velocity</div>
            </div>
            <div className="space-y-1">
              <TrendingUp size={20} className="text-[#a7d0c3] mb-2" />
              <div className="text-xl font-bold">300+</div>
              <div className="text-[8px] uppercase tracking-widest opacity-40">Projects Delivered</div>
            </div>
            <div className="space-y-1">
              <Users size={20} className="text-[#a7d0c3] mb-2" />
              <div className="text-xl font-bold">50+</div>
              <div className="text-[8px] uppercase tracking-widest opacity-40">Happy Clients</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

