import React, { useLayoutEffect, useRef } from 'react';
import { ArrowRight, Code, BrainCircuit, Video, Map, Megaphone, FileText, Clock, Zap, TrendingUp, Users } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceCardProps {
  service: any;
  onNavigate: (page: string) => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onNavigate 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !glowRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    gsap.to(cardRef.current, {
      rotateX: rotateX,
      rotateY: rotateY,
      duration: 0.5,
      ease: 'power2.out',
      transformPerspective: 1000
    });

    gsap.to(glowRef.current, {
      left: x,
      top: y,
      opacity: 1,
      duration: 0.3
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !glowRef.current) return;
    
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: 'back.out(1.7)'
    });

    gsap.to(glowRef.current, {
      opacity: 0,
      duration: 0.3
    });
  };

  const handleMouseEnter = () => {
    if (!cardRef.current) return;
    gsap.to(cardRef.current, {
      scale: 1.02,
      y: -5,
      duration: 0.4,
      ease: 'power2.out'
    });
  };

  return (
    <div 
      ref={cardRef}
      onClick={() => onNavigate(service.target)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="service-card group relative p-6 bg-white/10 backdrop-blur-xl rounded-[24px] border border-white/20 flex items-center gap-6 cursor-pointer overflow-hidden transition-colors hover:border-white/40"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Glossy Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Interactive Glow */}
      <div 
        ref={glowRef}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#338f82]/20 blur-[60px] rounded-full pointer-events-none opacity-0"
      />

      {/* Content */}
      <div className="relative z-10 text-xs font-bold opacity-30 group-hover:opacity-60 transition-opacity shrink-0 font-mono" style={{ transform: 'translateZ(20px)' }}>{service.id}</div>
      <div className="relative z-10 w-12 h-12 rounded-xl border border-[#0a3a40]/10 bg-white/20 flex items-center justify-center shrink-0 shadow-inner" style={{ transform: 'translateZ(30px)' }}>
        {service.icon}
      </div>
      <div className="relative z-10 flex-grow" style={{ transform: 'translateZ(25px)' }}>
        <h4 className="text-lg font-bold mb-1 tracking-tight">{service.title}</h4>
        <p className="text-[10px] opacity-60 leading-relaxed max-w-sm">{service.desc}</p>
      </div>
      <div className="relative z-10 w-10 h-10 rounded-full border border-white/20 bg-white/10 flex justify-center items-center group-hover:bg-[#0a3a40] group-hover:text-white transition-all duration-300 shadow-lg" style={{ transform: 'translateZ(40px)' }}>
        <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </div>
  );
};

export const EngineeredServicesSection = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const containerRef = useRef<HTMLDivElement>(null);

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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        x: 20,
        filter: "blur(10px)",
        stagger: 0.15,
        duration: 1,
        ease: "power3.out"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-[#e8f1ee] py-28 px-6 font-mono text-[#0a3a40] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 mb-20 items-start">
          {/* Left Column (Unchanged structure) */}
          <div className="lg:w-[40%] lg:sticky lg:top-32">
            <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#15464a] mb-6">Our Engineered Services</div>
            
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8">
              Systems. Engineered <br /> for Impact.
            </h2>
            
            <p className="text-sm leading-relaxed opacity-70 mb-12 max-w-sm font-sans">
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

            {/* Illustration Placeholder */}
            <div className="mt-20 opacity-20 hidden md:block">
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

          {/* Right Column - Advanced GSAP Interactive Section */}
          <div ref={containerRef} className="lg:w-[60%] space-y-6 relative">
            {/* Background Accent Gradients */}
            <div className="absolute -top-20 -right-20 w-96 h-96 bg-[#338f82]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#15464a]/5 blur-[100px] rounded-full pointer-events-none" />

            {serviceList.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onNavigate={onNavigate} 
              />
            ))}
          </div>
        </div>

        {/* Footer Banner */}
        <div className="bg-[#0a3a40] rounded-[40px] p-8 md:p-16 text-white flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="md:w-1/2 relative z-10">
            <div className="text-[10px] uppercase tracking-widest opacity-50 font-bold mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-white/30" />
              Built for Complexity
            </div>
            <h3 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight">
              From concept to scale — <br />
              <span className="text-[#a7d0c3]">we engineer systems</span> that power your business forward.
            </h3>
          </div>
          
          <div className="md:w-1/2 grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 w-full relative z-10 xl:border-l border-white/10 xl:pl-12">
            {[
              { icon: <Clock size={20} />, value: "99.9%", label: "Reliability" },
              { icon: <Zap size={20} />, value: "4.5x", label: "Velocity" },
              { icon: <TrendingUp size={20} />, value: "300+", label: "Delivered" },
              { icon: <Users size={20} />, value: "50+", label: "Clients" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2 group/stat">
                <div className="text-[#a7d0c3] mb-3 group-hover/stat:scale-110 transition-transform duration-300 transform-gpu">{stat.icon}</div>
                <div className="text-2xl font-bold tracking-tight">{stat.value}</div>
                <div className="text-[8px] uppercase tracking-widest opacity-40 font-bold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


