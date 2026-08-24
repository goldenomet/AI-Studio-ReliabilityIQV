
import React, { useState, useRef, useEffect } from 'react';
import upArrow3D from '../assets/images/up_arrow_3d_1787579872621.jpg';
import { useWidgetVisibility } from '../hooks/useWidgetVisibility';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, MapPin, Phone, Mail, Filter, Search, Info, ArrowUp, Star, Globe, Cpu, 
  Map as MapIcon, FileText, PenTool, Zap, ChevronDown, ChevronUp, Monitor, Wifi, Printer, 
  Mail as MailIcon, Layers, Laptop, HardDrive, UserCheck, Headphones, Video, Sparkles, 
  Server, ShoppingCart, Layout, Briefcase, Bot, Workflow, FileSpreadsheet, MailCheck, 
  Share2, CalendarCheck, CheckCircle2, Code, Palette, ShieldCheck, Check, X, SlidersHorizontal
} from 'lucide-react';
import { MagneticGlowButton } from './MagneticGlowButton';
import { SmartTypewriter, TextEngine, PixelSnow, TextScroll, GrainyGradient } from './Effects';
import { ServiceDetailModal, ServiceDetail as IServiceDetail } from './ServiceDetailModal';

import fallbackLogo from '@/src/assets/images/logo.png';
import newImage1778002658766 from '@/src/assets/images/regenerated_image_1778002658766.jpg';
import newImage1778003940043 from '@/src/assets/images/regenerated_image_1778003940043.jpg';
import newImage1778003942890 from '@/src/assets/images/regenerated_image_1778003942890.jpg';
import newImage1778003945349 from '@/src/assets/images/regenerated_image_1778003945349.jpg';
import newImage1778001962382 from '@/src/assets/images/regenerated_image_1778001962382.jpg';
import newImage1778002234657 from '@/src/assets/images/regenerated_image_1778002234657.jpg';
import iqv from '@/src/assets/images/iqv.png';
import ai from '@/src/assets/images/ai.png';
import solutionImg from '@/src/assets/images/solution.jpg';
const solution = solutionImg;
import servicesBgImage from '@/src/assets/images/section3.jpg';

import servicesectionImg from '@/src/assets/images/servicesection.png';
import serviceHeroImg from '@/src/assets/images/service hero.png';
import section1Img from '@/src/assets/images/section1.png';
import section2Img from '@/src/assets/images/section2.png';
import section4Img from '@/src/assets/images/section4.jpg';
import automationImg from '@/src/assets/images/automation.png';
import regenArtImg from '@/src/assets/images/regenerated_image_1778354245165.jpg';

// Dedicated Trending Generated Visual Assets
import trendingWebDesignImg from '@/src/assets/images/trending_web_design_1787603569100.jpg';
import trendingAiAutoImg from '@/src/assets/images/trending_ai_auto_1787603581694.jpg';
import trendingItDeskImg from '@/src/assets/images/trending_it_desk_1787603594996.jpg';
import trendingStudioImg from '@/src/assets/images/trending_studio_1787603608297.jpg';
import trendingAiAnimImg from '@/src/assets/images/trending_ai_anim_1787603621070.jpg';
import trendingInfraImg from '@/src/assets/images/trending_infra_1787603632437.jpg';

import { ServicesSlidingGrid } from './SlidingHighlightWrapper';

export const CompetenciesSection = ({ onContact }: { onContact: () => void }) => {
  const [selectedService, setSelectedService] = useState<IServiceDetail | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const servicesData: IServiceDetail[] = [
    {
      id: "web-ops",
      title: "Web Operations",
      icon: Globe,
      image: newImage1778002234657,
      description: "Website development, CMS, detect bugs, and cloud services.",
      longDescription: "Our performance-driven web operations unit specializes in end-to-end website development, seamless CMS integration, proactive bug detection, and enterprise-grade cloud services architecture. We ensure your digital systems are always optimized, secure, and ready to scale.",
      useCases: ["Website Development", "CMS Implementation", "Proactive Bug Detection", "Cloud Services Orchestration"],
      caseStudy: {
        title: "Global E-commerce Expansion",
        result: "Implemented a unified CMS and cloud strategy that reduced deployment times by 70% and eliminated critical runtime bugs."
      }
    },
    {
      id: "ai-auto",
      title: "AI Automations",
      icon: Cpu,
      image: newImage1778001962382,
      description: "Intelligent workflow automations and ML models designed to optimize Nigerian supply chains and international business processes.",
      longDescription: "We build intelligent systems that bridge the gap between human effort and machine precision. Our AI solutions are tailored to solve specific regional bottlenecks—such as supply chain optimization in emerging markets—while applying international standards of data processing and predictive analytics to drive global competitiveness.",
      useCases: ["Supply Chain Route Optimization", "Automated Compliance Auditing", "Smart Customer Retention Bots", "Predictive Inventory for Retailers"],
      caseStudy: {
        title: "Nigerian Distribution Giant",
        result: "Deployed an AI-driven route optimization engine that cut fuel costs by 25% and improved delivery accuracy by 40%."
      }
    },
    {
      id: "gis",
      title: "GIS Mapping",
      icon: MapIcon,
      image: newImage1778002658766,
      description: "Advanced spatial intelligence for African logistics, urban planning, and international resource management.",
      longDescription: "Geospatial data is the backbone of modern logistics. Our GIS team provides deep insights into the African landscape, from mapping informal urban sectors to planning large-scale agricultural expansions. We combine global satellite imagery with local ground-truth data to provide a comprehensive view for international investors and regional planners alike.",
      useCases: ["Logistics Fleet Tracking", "Agricultural Land Use Analysis", "Real Estate Demand Heatmaps", "Infrastructure Pipeline Planning"],
      caseStudy: {
        title: "Federal Infrastructure Project",
        result: "Mapped 500km of proposed utility corridors using LiDAR data, identifying optimal routes and saving $1.2M in potential land disputes."
      }
    },
    {
      id: "tech-reports",
      title: "Technical Reports",
      icon: FileText,
      image: newImage1778003940043,
      description: "Professional technical documentation meeting international ISO standards and local regulatory requirements.",
      longDescription: "Precision in documentation is non-negotiable for international growth. We produce investor-ready technical reports, SOC2/ISO audit preparations, and feasibility studies that bridge the gap between Nigerian technical operations and international boardrooms. Our reports provide the clarity required for high-stakes funding and complex regulatory approvals.",
      useCases: ["ISO/SOC2 Audit Readiness", "Venture Capital Due Diligence", "System Architecture Audits", "Environmental Impact Studies"],
      caseStudy: {
        title: "Tech Unicorn Series C Round",
        result: "Authored comprehensive technical architecture documentation that passed a Tier-1 international VC due diligence with zero findings."
      }
    },
    {
      id: "design-studio",
      title: "Content Studio",
      icon: PenTool,
      image: newImage1778003942890,
      description: "Global brand storytelling and UX/UI design that resonates with Nigerian audiences and international consumers.",
      longDescription: "We blend engineering precision with creative flair. Our Content Studio creates digital experiences that honor Nigerian cultural nuances while adhering to the highest global standards of UI/UX design. We use AI-assisted tools to scale content production, ensuring your brand story is consistent and compelling across every global touchpoint.",
      useCases: ["International Brand Identity", "Conversion-Optimized UI/UX", "Multi-Language Content Strategy", "AI-Generated Digital Marketing"],
      caseStudy: {
        title: "Premium West African Lifestyle Brand",
        result: "Complete digital rebranding and UX overhaul resulting in a 50% increase in international orders within the first quarter."
      }
    }
  ];

  return (
    <section ref={containerRef} className="relative mt-20 bg-bg-primary py-24 transition-colors duration-500 overflow-hidden">
      <div className="absolute inset-0 z-[0] pointer-events-none">
        <img 
          src={servicesBgImage}
          alt="Grid Background"
          className="w-full h-full object-cover opacity-90 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg-primary via-transparent to-bg-primary" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-12 pointer-events-none text-center flex flex-col items-center relative z-10">
         <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4 font-bold">Regional & International Expertise</div>
         <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary transition-colors duration-500 leading-[0.9] tracking-tighter">What We Deliver.</h2>
      </div>

      <div className="px-6 relative z-10 w-full max-w-7xl mx-auto">
        <ServicesSlidingGrid 
            services={servicesData} 
            onAction={setSelectedService} 
            bgImage={servicesBgImage}
        />
      </div>

      <ServiceDetailModal 
        service={selectedService}
        isOpen={!!selectedService}
        onClose={() => setSelectedService(null)}
        onContact={onContact}
      />
    </section>
  );
};

const SHOWCASE_ITEMS = [
  {
    num: "01",
    title: "The Genesis",
    description: "Born in Nigeria to address a local gap in enterprise IT, we evolved quickly by prioritizing robust execution over theory. ReliabilityIQ was established to prove that African tech could match and exceed global standards.",
    img: iqv,
  },
  {
    num: "02",
    title: "The AI Pivot",
    description: "As technology shifted, we integrated advanced AI to move our clients from reactive maintenance to proactive scaling, serving both growing Nigerian firms and established international entities.",
    img: ai,
  },
  {
    num: "03",
    title: "Global Operations",
    description: "Today, we manage web operations and spatial data from Lagos to London and beyond, maintaining an obsessive attention to detail for a diverse portfolio of global partners.",
    img: solution,
  }
];

export const NarrativeSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const DURATION = 6000; // 6 seconds per tab

  const handleAnimationComplete = () => {
    setActiveIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
  };

  return (
    <section className="relative bg-bg-primary z-20 border-t border-border-primary transition-colors duration-500 pb-24 md:pb-32">
      <PixelSnow />
      
      <div className="pt-32 pb-12 px-6 max-w-5xl mx-auto relative z-10 text-center">
        <div className="font-mono text-xs uppercase tracking-widest text-[#0d838e] mb-6 font-bold">The Narrative</div>
        <TextScroll 
          text="Driven by logic, defined by results."
          className="text-4xl md:text-6xl font-bold text-text-primary tracking-tight leading-tight justify-center flex flex-wrap"
        />
        <p className="mt-6 text-xl text-text-secondary max-w-2xl mx-auto font-sans">
          A showcase of our journey, built with precision and intent.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full max-w-7xl mx-auto px-6 relative z-10 items-stretch">
        <div className="w-full lg:w-5/12 flex flex-col gap-4 justify-center">
          {SHOWCASE_ITEMS.map((item, index) => {
            const isActive = index === activeIndex;
            
            return (
              <div 
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative overflow-hidden transition-all duration-500 rounded-3xl cursor-pointer p-6 md:p-8 flex flex-col
                  ${isActive ? 'bg-bg-card shadow-xl border border-border-primary' : 'bg-transparent border border-transparent hover:bg-bg-card/40'}`}
              >
                {/* Progress Bar Container */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-border-primary/20">
                  {isActive && (
                    <motion.div
                      key={`progress-${activeIndex}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: DURATION / 1000, ease: "linear" }}
                      onAnimationComplete={handleAnimationComplete}
                      className="h-full bg-[#0d838e]"
                    />
                  )}
                </div>
                
                <div className="flex items-center gap-4 mb-2 mt-2">
                  <span className={`font-mono text-sm font-bold flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-500 ${isActive ? 'border-[#0d838e] text-[#0d838e] bg-[#0d838e]/10' : 'border-border-primary text-text-secondary/50'}`}>
                    {item.num}
                  </span>
                  <h3 className={`text-2xl md:text-3xl font-bold font-sans tracking-tight transition-colors duration-500 ${isActive ? 'text-text-primary' : 'text-text-secondary/50'}`}>
                    {item.title}
                  </h3>
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                  className="overflow-hidden"
                >
                   <div className="pt-2 pb-2 pl-12 text-base md:text-lg text-text-secondary leading-relaxed font-sans">
                     {item.description}
                     
                     {/* Mobile Image */}
                     <div className="lg:hidden w-full h-[220px] md:h-[300px] mt-6 rounded-[20px] overflow-hidden relative shadow-lg">
                       <img src={item.img} alt={item.title} className="w-full h-full object-cover filter contrast-125" />
                     </div>
                   </div>
                </motion.div>
              </div>
            )
          })}
        </div>
        
        {/* Desktop Image Panel */}
        <div className="hidden lg:block w-full lg:w-7/12 h-[600px] xl:h-[700px] relative rounded-[40px] overflow-hidden border border-border-primary shadow-2xl bg-bg-card">
           <div className="w-full h-full relative p-4">
             <div className="w-full h-full relative rounded-[28px] overflow-hidden">
               <AnimatePresence mode="wait">
                  <motion.img 
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    src={SHOWCASE_ITEMS[activeIndex].img}
                    alt={SHOWCASE_ITEMS[activeIndex].title}
                    className="absolute inset-0 w-full h-full object-cover filter contrast-125"
                  />
               </AnimatePresence>
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10 pointer-events-none" />
               
               {/* Optional Title over image */}
               <div className="absolute bottom-10 left-10 z-20 overflow-hidden text-white drop-shadow-lg pr-10">
                 <AnimatePresence mode="wait">
                    <motion.div
                       key={activeIndex}
                       initial={{ y: 20, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       exit={{ y: -20, opacity: 0 }}
                       transition={{ duration: 0.4 }}
                    >
                        <p className="font-mono text-xs tracking-widest text-white/70 mb-3 font-bold uppercase backdrop-blur-md px-3 py-1 rounded-full border border-white/20 inline-block bg-black/20">Phase {SHOWCASE_ITEMS[activeIndex].num}</p>
                        <h4 className="text-4xl md:text-5xl font-bold font-sans tracking-tight leading-tight">
                          {SHOWCASE_ITEMS[activeIndex].title}
                        </h4>
                    </motion.div>
                 </AnimatePresence>
               </div>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export const ContactSection = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', service: 'Web Operations', details: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "Required";
    if (!formData.lastName.trim()) newErrors.lastName = "Required";
    if (!formData.email.trim()) {
      newErrors.email = "Required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid format";
    }
    if (formData.details.trim().length < 10) newErrors.details = "More details needed (min 10 chars)";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      if (formRef.current) {
        const data = {
          "form-name": "contact",
          ...formData,
          name: `${formData.firstName} ${formData.lastName}`
        };
        await fetch("/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: encode(data as any),
        });
      }
      
      setIsSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', service: 'Web Operations', details: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Submission Error:", error);
      const subject = encodeURIComponent(`Inquiry from ${formData.firstName} ${formData.lastName}`);
      const body = encodeURIComponent(`Name: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nService: ${formData.service}\nDetails: ${formData.details}`);
      window.location.href = `mailto:reliabilityiqventures@gmail.com?subject=${subject}&body=${body}`;
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (name: string) => `
    w-full bg-white/5 dark:bg-black/20 backdrop-blur-md px-4 py-4 rounded-xl 
    outline-none border transition-all duration-300
    text-text-primary placeholder:text-text-secondary/30 font-mono text-sm
    ${errors[name] ? 'border-red-500/50 focus:border-red-500' : 'border-border-primary focus:border-accent'}
    focus:ring-1 focus:ring-accent/20
  `;

  return (
    <section id="contact-section" className="pb-32 px-4 md:px-6 bg-bg-primary transition-colors duration-500 overflow-hidden relative">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="bg-bg-card/40 backdrop-blur-2xl rounded-[40px] md:rounded-[64px] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-border-primary transition-colors duration-500 group/container"
             onMouseMove={handleMouseMove}
        >
          {/* Reactive Spotlight Effect */}
          <motion.div 
            className="pointer-events-none absolute -inset-px opacity-0 group-hover/container:opacity-100 transition-opacity duration-300"
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, var(--color-accent-glow), transparent 40%)`
              )
            }}
          />

          {/* Form Side */}
          <div className="lg:w-[55%] p-8 md:p-12 lg:p-16 border-b lg:border-b-0 lg:border-r border-border-primary relative transition-colors duration-500">
            <div className="relative z-10 flex flex-col h-full">
              <div className="inline-flex items-center gap-2 mb-6">
                <div className="w-10 h-[1px] bg-accent" />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent font-bold">Node Invitation</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-mono mb-12 tracking-tighter text-text-primary leading-[0.85] transition-colors duration-500">
                Establish <br /> <span className="text-accent italic">Communication.</span>
              </h2>

              <form 
                ref={formRef}
                name="contact" 
                data-netlify="true" 
                className="space-y-8 font-mono" 
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group/field relative">
                    <label className="block text-[9px] uppercase text-text-secondary/60 mb-2 font-bold tracking-widest transition-colors duration-500 group-focus-within/field:text-accent">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Protocol A" 
                      className={inputClasses('firstName')}
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-focus-within/field:w-full transition-all duration-500" />
                    {errors.firstName && <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[10px] mt-1 absolute font-bold">{errors.firstName}</motion.p>}
                  </div>

                  <div className="group/field relative">
                    <label className="block text-[9px] uppercase text-text-secondary/60 mb-2 font-bold tracking-widest transition-colors duration-500 group-focus-within/field:text-accent">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Protocol B" 
                      className={inputClasses('lastName')}
                    />
                    <div className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-focus-within/field:w-full transition-all duration-500" />
                    {errors.lastName && <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[10px] mt-1 absolute font-bold">{errors.lastName}</motion.p>}
                  </div>
                </div>

                <div className="group/field relative">
                  <label className="block text-[9px] uppercase text-text-secondary/60 mb-2 font-bold tracking-widest transition-colors duration-500 group-focus-within/field:text-accent">Work Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="direct@link.network" 
                    className={inputClasses('email')}
                  />
                  <div className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-focus-within/field:w-full transition-all duration-500" />
                  {errors.email && <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[10px] mt-1 absolute font-bold">{errors.email}</motion.p>}
                </div>

                <div className="group/field relative">
                  <label className="block text-[9px] uppercase text-text-secondary/60 mb-2 font-bold tracking-widest transition-colors duration-500 group-focus-within/field:text-accent">Project Stream</label>
                  <div className="relative">
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`${inputClasses('service')} appearance-none pr-10 cursor-pointer`}
                    >
                      <option className="bg-bg-card">Web Operations</option>
                      <option className="bg-bg-card">AI Automations</option>
                      <option className="bg-bg-card">GIS Mapping</option>
                      <option className="bg-bg-card">Technical Reports</option>
                      <option className="bg-bg-card">Content Studio</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-accent">
                      <ArrowRight size={18} className="rotate-90" />
                    </div>
                  </div>
                </div>

                <div className="group/field relative">
                  <label className="block text-[9px] uppercase text-text-secondary/60 mb-2 font-bold tracking-widest transition-colors duration-500 group-focus-within/field:text-accent">Transmission Packet</label>
                  <textarea 
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={4} 
                    placeholder="Input detailed project requirements..." 
                    className={`${inputClasses('details')} resize-none`}
                  ></textarea>
                  <div className="absolute bottom-0 left-0 h-[2px] bg-accent w-0 group-focus-within/field:w-full transition-all duration-500 bottom-[6px]" />
                  {errors.details && <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[10px] mt-1 absolute font-bold">{errors.details}</motion.p>}
                </div>

                <div className="pt-6">
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="w-full bg-green-500/10 border border-green-500/50 text-green-500 p-8 rounded-3xl flex flex-col items-center justify-center text-center gap-4"
                      >
                        <div className="w-16 h-16 bg-green-500 text-bg-primary rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(34,197,94,0.3)]">
                          <Zap size={32} fill="currentColor" />
                        </div>
                        <div>
                          <p className="font-black text-xl uppercase tracking-tighter italic">Data Transmitted</p>
                          <p className="text-[10px] opacity-70 tracking-widest">ENCRYPTION ACTIVE • NODE ACKNOWLEDGED</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <MagneticGlowButton 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-6 text-xl font-black italic uppercase tracking-tighter disabled:opacity-50 !rounded-2xl shadow-3xl group/btn overflow-hidden"
                        >
                          <span className="relative z-10 flex items-center justify-center gap-4">
                            {isSubmitting ? (
                              <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                <Cpu size={28} />
                              </motion.span>
                            ) : (
                              <>Submit <ArrowRight size={28} className="group-hover/btn:translate-x-2 transition-transform" /></>
                            )}
                          </span>
                        </MagneticGlowButton>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>

          {/* Logistics Side */}
          <div className="lg:w-[45%] bg-bg-secondary/20 relative flex flex-col p-8 md:p-12 lg:p-16 transition-colors duration-500 group/logistics">
            {/* Animated Grid overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(var(--color-accent) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="relative z-10 flex flex-col h-full gap-12">
              <div className="space-y-4">
                <div className="font-mono text-[9px] uppercase tracking-[0.4em] text-accent font-bold">Host Coordinate</div>
                <div className="relative rounded-[32px] overflow-hidden border border-border-primary bg-black/40 shadow-inner h-80 lg:flex-grow grayscale contrast-125 transition-all duration-700 hover:grayscale-0 hover:contrast-100">
                  <iframe 
                    src="https://maps.google.com/maps?q=Ipaja,%20Lagos%20State,%20Nigeria&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true}
                    loading="lazy" 
                    className="absolute inset-0 dark:invert-[.9] dark:hue-rotate-180 brightness-75 lg:brightness-100"
                  />
                  <div className="absolute inset-0 pointer-events-none bg-linear-to-t from-bg-card via-transparent to-transparent opacity-60" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-center gap-4 bg-bg-card/80 backdrop-blur-xl p-4 rounded-2xl border border-accent/20">
                    <div className="p-3 bg-accent text-bg-primary rounded-xl shrink-0">
                      <MapPin size={24} />
                    </div>
                    <div className="font-mono min-w-0">
                      <p className="text-xs font-black text-text-primary truncate">ReliabilityIQ HQ</p>
                      <p className="text-[9px] text-text-secondary/70 truncate uppercase tracking-widest font-bold">Ipaja Sector • Lagos State</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-10 group/terminal">
                <div className="space-y-3">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-text-secondary/50 font-bold flex items-center gap-2 group-hover/terminal:text-accent transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Audio Channels
                  </div>
                  <div className="flex flex-col gap-2 font-mono text-base font-bold tracking-tighter text-text-primary">
                    <a href="tel:+2349075934287" className="hover:text-accent transition-all hover:translate-x-1 inline-block w-fit">+234 907 593 4287</a>
                    <a href="tel:+234906539605" className="hover:text-accent transition-all hover:translate-x-1 inline-block w-fit">+234 906 539 605</a>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="font-mono text-[9px] uppercase tracking-widest text-text-secondary/50 font-bold flex items-center gap-2 group-hover/terminal:text-accent transition-colors">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" /> Data Up-Link
                  </div>
                  <div className="font-mono text-base font-bold tracking-tighter text-text-primary">
                    <a href="mailto:reliabilityiqventures@gmail.com" className="hover:text-accent transition-all hover:translate-x-1 inline-block break-all">reliabilityiqventures@gmail.com</a>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-8 border-t border-border-primary flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.2em] text-text-secondary/40">
                <div className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-green-500" /> Node: Lagos-Alpha
                </div>
                <div>Status: Primary</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export const TrendingProducts = () => {
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    'web-dev': true,
    'ai-auto': true,
    'it-support': true,
  });
  const [activeTab, setActiveTab] = useState<'all' | 'web' | 'ai' | 'it' | 'creative' | 'infra'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const toggleDropdown = (id: string) => {
    setOpenDropdowns(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // 1. Web Development & UI/UX Modules
  const webDevModules = [
    {
      title: "E-commerce",
      icon: ShoppingCart,
      badge: "High Conversion",
      desc: "Custom Shopify, WooCommerce & headless stores. Frictionless checkout flows, multi-currency payment gateways (Stripe, Paystack, PayPal), and automated inventory management."
    },
    {
      title: "SaaS Website",
      icon: Layout,
      badge: "Product-Led",
      desc: "High-impact SaaS landing pages, interactive live feature previews, tiered pricing calculators, customer onboarding funnels, and enterprise authentication dashboards."
    },
    {
      title: "Portfolio",
      icon: Briefcase,
      badge: "Creative Showcase",
      desc: "Interactive visual showcases, bespoke case study layouts, fluid motion choreography, custom typography pairings, and ultra-fast SEO-optimized gallery experiences."
    }
  ];

  // 2. Simple AI Automation Services
  const aiAutomationServices = [
    {
      title: "24/7 AI Customer Support & Chatbots",
      icon: Bot,
      badge: "24/7 Live",
      desc: "Smart conversational assistants trained on your company FAQs, product catalog, and knowledge base to instantly answer questions and capture bookings on web & WhatsApp."
    },
    {
      title: "Automated Lead Capture & CRM Sync",
      icon: Workflow,
      badge: "Zero Drop-off",
      desc: "Instantly capture leads from web forms, ad campaigns, and emails, qualify prospects with AI scoring, and sync data into HubSpot, Notion, Airtable, or Google Sheets."
    },
    {
      title: "Automated Invoicing & Receipt Processing",
      icon: FileSpreadsheet,
      badge: "Smart OCR",
      desc: "AI extracts line items, totals, and vendor details from PDF invoices and receipts directly into your accounting software without manual data entry."
    },
    {
      title: "Email Inbox Triage & Smart Auto-Drafts",
      icon: MailCheck,
      badge: "Inbox Zero",
      desc: "Categorizes incoming emails by intent (sales inquiries, urgent support, billing) and generates context-aware draft replies ready for quick one-click approval."
    },
    {
      title: "Social Media & Content Auto-Publisher",
      icon: Share2,
      badge: "Multi-Channel",
      desc: "Transforms single ideas or articles into scheduled multi-platform posts, draft captions, and visual assets for LinkedIn, X/Twitter, and Instagram."
    },
    {
      title: "AI Meeting Summaries & Task Delegation",
      icon: CalendarCheck,
      badge: "Auto Sync",
      desc: "Transcribes calls and meetings, distills key discussion takeaways, and automatically creates assigned action items and tickets in Trello, Asana, or Slack."
    }
  ];

  // 3. Small Business IT Support Services
  const itSupportServices = [
    { title: "Computer Problems", icon: Monitor, desc: "Diagnostics, hardware repairs, blue screens, crash fixes, and OS recovery." },
    { title: "Wi-Fi & Network", icon: Wifi, desc: "Office mesh Wi-Fi setup, firewall configuration, secure router provisioning, and speed diagnosis." },
    { title: "Printer Setup", icon: Printer, desc: "Wireless network printers, shared network scan-to-folder, and driver troubleshooting." },
    { title: "Business Email", icon: MailIcon, desc: "Custom domain email routing, anti-spam filters, DKIM/SPF/DMARC authentication." },
    { title: "Microsoft 365 / Google Workspace", icon: Layers, desc: "Tenant setup, license management, team migration, SharePoint & Google Drive administration." },
    { title: "Computer Optimization", icon: Zap, desc: "Speed optimization, disk cleanup, malware purging, and hardware resource fine-tuning." },
    { title: "Backup Setup", icon: HardDrive, desc: "Automated cloud & local NAS backup solutions with ransomware protection and rapid disaster recovery." },
    { title: "Employee PC Setup", icon: UserCheck, desc: "Standardized imaging, productivity software pre-install, VPN, security agent, and user onboarding." },
    { title: "Remote IT Support", icon: Headphones, desc: "Instant helpdesk ticketing, SLA-backed live remote access, and ongoing proactive maintenance." },
  ];

  const trendingItems = [
    {
      id: "web-dev-design",
      title: "Website Development & UI/UX Design",
      tag: "Top In-Demand",
      badgeColor: "bg-accent text-bg-primary font-bold",
      desc: "Bespoke digital experiences built with modern frontend frameworks, fluid animations, conversion-engineered layouts, and brand-defining design systems.",
      status: "Custom Scope & Delivery",
      img: trendingWebDesignImg,
      category: "web",
      rating: 5,
      dropdownKey: "web-dev",
      dropdownTitle: "Web & UI/UX Solutions (E-commerce, SaaS, Portfolio)",
      dropdownItems: webDevModules,
      dropdownType: "web"
    },
    {
      id: "ai-automation",
      title: "AI Automation Services",
      tag: "AI Powered",
      badgeColor: "bg-purple-600 text-white",
      desc: "Tailored intelligent automation systems that streamline repetitive operations, automate customer touchpoints, and eliminate manual bottlenecks.",
      status: "Turnkey Implementation",
      img: trendingAiAutoImg,
      category: "ai",
      rating: 5,
      dropdownKey: "ai-auto",
      dropdownTitle: "Recommended AI Automation Modules",
      dropdownItems: aiAutomationServices,
      dropdownType: "ai"
    },
    {
      id: "small-business-it",
      title: "Small Business IT Support",
      tag: "Essential",
      badgeColor: "bg-emerald-500 text-white",
      desc: "Comprehensive on-demand and fully managed IT support tailored for growing businesses, physical offices, and remote teams.",
      status: "Dedicated IT Support",
      img: trendingItDeskImg,
      category: "it",
      rating: 5,
      dropdownKey: "it-support",
      dropdownTitle: "Included IT Support Modules (9 Core Services)",
      dropdownItems: itSupportServices,
      dropdownType: "it"
    },
    {
      id: "obd-studio",
      title: "OBD Studio Setup",
      tag: "Studio Rigging",
      badgeColor: "bg-amber-500 text-white",
      desc: "Turnkey broadcast and streaming studio configuration. Multi-camera switching, high-bitrate encoding, clean audio routing, overlay branding, and live streaming workflows.",
      status: "Custom Studio Build",
      img: trendingStudioImg,
      category: "creative",
      rating: 5,
      highlights: ["Multi-Camera OBS/OBD Rigging", "Audio Mixer & Noise Gate Setup", "Custom Stream Overlays & Stinger Transitions", "Local Recording & Cloud Multi-Stream"],
    },
    {
      id: "ai-animation-training",
      title: "AI Animation Training",
      tag: "Masterclass",
      badgeColor: "bg-indigo-600 text-white",
      desc: "Hands-on professional masterclass on generative AI animation, motion synthesis, frame interpolation, character consistency, and production pipeline integration.",
      status: "Live Workshop & Mentorship",
      img: trendingAiAnimImg,
      category: "creative",
      rating: 5,
      highlights: ["Generative Video Models & ComfyUI", "Character Consistency Workflows", "Audio-Driven Lip Sync & 3D Rigging", "Commercial Animation Pipeline"],
    },
    {
      id: "sentinel-cloud-infra",
      title: "Cloud & Enterprise Infrastructure",
      tag: "99.99% Uptime",
      badgeColor: "bg-cyan-600 text-white",
      desc: "Enterprise network security with Sentinel AI Firewall, DDoS shielding, global edge CDN caching, and automated high-availability server architecture.",
      status: "Enterprise Scalability",
      img: trendingInfraImg,
      category: "infra",
      rating: 5,
      highlights: ["Sentinel AI Network Firewall", "Sub-10ms Global Edge CDN", "Automated Load Balancing & Failover", "Zero-Downtime Migration Services"],
    },
  ];

  const query = searchQuery.trim().toLowerCase();

  const filteredItems = trendingItems.filter(item => {
    const matchesCategory = activeTab === 'all' || item.category === activeTab;
    if (!matchesCategory) return false;
    if (!query) return true;

    // Deep search checking main title, desc, tag, status, highlights
    const matchesMain = 
      item.title.toLowerCase().includes(query) ||
      item.desc.toLowerCase().includes(query) ||
      item.tag.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query) ||
      (item.highlights && item.highlights.some(h => h.toLowerCase().includes(query)));

    // Deep search checking sub-dropdown items
    const matchesSub = item.dropdownItems && item.dropdownItems.some((sub: any) => 
      sub.title.toLowerCase().includes(query) || 
      (sub.desc && sub.desc.toLowerCase().includes(query)) ||
      (sub.badge && sub.badge.toLowerCase().includes(query))
    );

    return matchesMain || matchesSub;
  });

  // Auto-expand dropdowns when searching if a query matches sub-items inside that card
  useEffect(() => {
    if (query) {
      const newOpen: Record<string, boolean> = { ...openDropdowns };
      trendingItems.forEach(item => {
        if (item.dropdownKey && item.dropdownItems) {
          const subMatch = item.dropdownItems.some((sub: any) =>
            sub.title.toLowerCase().includes(query) ||
            (sub.desc && sub.desc.toLowerCase().includes(query)) ||
            (sub.badge && sub.badge.toLowerCase().includes(query))
          );
          if (subMatch) {
            newOpen[item.dropdownKey] = true;
          }
        }
      });
      setOpenDropdowns(newOpen);
    }
  }, [searchQuery]);

  const popularSearchTags = ["E-commerce", "Chatbot", "Wi-Fi", "Printer", "SaaS", "OBS", "Email", "Backup"];

  return (
    <section className="pt-20 pb-32 px-6 bg-bg-primary transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4 font-bold">In-Demand Technology & Services</div>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[0.9]">
              Trending <br /> Capabilities.
            </h2>
            <p className="text-text-secondary text-sm md:text-base mt-4 max-w-xl font-mono leading-relaxed">
              Explore our most requested website development, practical AI automations, broadcast studio setups, creative training, and small business IT support solutions.
            </p>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto font-mono">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
              {/* Search Input */}
              <div className="relative flex-1 sm:w-72">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search services (e.g. Printer, E-commerce, Chatbot)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 bg-bg-card border border-border-primary rounded-xl text-xs text-text-primary focus:outline-none focus:border-accent transition-colors"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary p-0.5 rounded-full hover:bg-bg-primary transition-colors"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Mobile Category Dropdown Select */}
              <div className="relative sm:hidden w-full">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as any)}
                  className="w-full pl-9 pr-9 py-2.5 bg-bg-card border border-border-primary rounded-xl text-xs font-mono font-bold text-text-primary appearance-none focus:outline-none focus:border-accent transition-colors cursor-pointer"
                >
                  <option value="all">Category: All Trending</option>
                  <option value="web">Category: Web & UI/UX</option>
                  <option value="ai">Category: AI Automation</option>
                  <option value="it">Category: IT Support</option>
                  <option value="creative">Category: Studio & Creative</option>
                  <option value="infra">Category: Cloud & Infra</option>
                </select>
                <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
              </div>

              {/* Desktop Category Filter Tabs */}
              <div className="hidden sm:flex items-center gap-1 bg-bg-card p-1 rounded-xl border border-border-primary overflow-x-auto">
                {[
                  { id: 'all', label: 'All Trending' },
                  { id: 'web', label: 'Web & UI/UX' },
                  { id: 'ai', label: 'AI Automation' },
                  { id: 'it', label: 'IT Support' },
                  { id: 'creative', label: 'Studio & Creative' },
                  { id: 'infra', label: 'Cloud & Infra' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium capitalize whitespace-nowrap transition-all ${
                      activeTab === tab.id 
                        ? 'bg-accent text-bg-primary font-bold shadow-sm' 
                        : 'text-text-secondary hover:text-text-primary'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Search Tag Suggestions */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] text-text-secondary">
              <span className="shrink-0 text-text-secondary/70">Quick Search:</span>
              <div className="flex items-center gap-1.5 flex-nowrap">
                {popularSearchTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className={`px-2 py-0.5 rounded-md border text-[10px] whitespace-nowrap transition-all ${
                      searchQuery.toLowerCase() === tag.toLowerCase()
                        ? 'border-accent text-accent bg-accent/10 font-bold'
                        : 'border-border-primary hover:border-text-secondary text-text-secondary hover:text-text-primary bg-bg-card'
                    }`}
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Search Result Status */}
        {searchQuery && (
          <div className="mb-6 flex items-center justify-between font-mono text-xs text-text-secondary bg-bg-card p-3 rounded-xl border border-border-primary">
            <div>
              Found <span className="font-bold text-accent">{filteredItems.length}</span> matching service{filteredItems.length === 1 ? '' : 's'} for "<span className="text-text-primary font-bold">{searchQuery}</span>"
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-accent hover:underline flex items-center gap-1 font-bold"
            >
              <X size={12} /> Clear search
            </button>
          </div>
        )}

        {/* Empty Search State */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-bg-card rounded-[32px] border border-border-primary font-mono px-6">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">No matching services found</h3>
            <p className="text-text-secondary text-xs max-w-md mx-auto mb-6">
              We couldn't find any capability matching "{searchQuery}". Try searching for general terms like "WiFi", "Design", "Automation", or "Studio".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-accent text-bg-primary font-bold text-xs hover:opacity-90 transition-opacity"
            >
              Reset Search & Filters
            </button>
          </div>
        ) : (
          /* Trending Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((prod, i) => {
            const hasDropdown = Boolean(prod.dropdownKey && prod.dropdownItems);
            const isWide = hasDropdown;
            const isOpen = prod.dropdownKey ? openDropdowns[prod.dropdownKey] : false;

            return (
              <motion.div 
                key={prod.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className={`bg-bg-card rounded-[32px] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 border border-border-primary flex flex-col justify-between ${
                  isWide ? 'md:col-span-2 lg:col-span-3 border-accent/40 ring-1 ring-accent/20' : ''
                }`}
              >
                <div>
                  <div className={`${isWide ? 'aspect-[21/9] md:aspect-[3.2/1]' : 'aspect-video'} relative overflow-hidden bg-bg-card`}>
                    <img 
                      src={prod.img} 
                      alt={prod.title} 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover filter grayscale brightness-85 group-hover:scale-105 group-hover:grayscale-0 transition-all duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-card via-transparent to-transparent opacity-75" />
                    
                    <div className={`absolute top-4 right-4 ${prod.badgeColor || 'bg-accent text-bg-primary'} px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest shadow-md`}>
                      {prod.tag}
                    </div>
                    
                    {hasDropdown && (
                      <div className="absolute bottom-4 left-6 md:left-8">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-bg-primary/90 backdrop-blur-md border border-border-primary text-text-primary text-xs font-mono font-semibold shadow-lg">
                          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Interactive Service Suite
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 lg:p-8">
                    <div className="flex justify-between items-start mb-4 gap-2">
                      <h3 className="text-xl lg:text-2xl font-bold font-mono tracking-tight group-hover:text-accent transition-colors text-text-primary">
                        {prod.title}
                      </h3>
                      <div className="flex text-amber-400 shrink-0">
                        {[...Array(prod.rating || 5)].map((_, idx) => (
                          <Star key={idx} size={13} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-text-secondary font-mono text-xs md:text-sm leading-relaxed mb-6">
                      {prod.desc}
                    </p>

                    {/* Highlights for standard cards */}
                    {prod.highlights && (
                      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {prod.highlights.map((hl, hlIdx) => (
                          <div key={hlIdx} className="flex items-center gap-2 text-xs font-mono text-text-secondary">
                            <Check size={14} className="text-accent shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Interactive Dropdown Section */}
                    {hasDropdown && prod.dropdownItems && prod.dropdownKey && (
                      <div className="mt-6 pt-6 border-t border-border-primary">
                        <button
                          onClick={() => toggleDropdown(prod.dropdownKey!)}
                          className="w-full flex items-center justify-between p-4 rounded-2xl bg-bg-primary hover:bg-bg-primary/80 border border-border-primary transition-all cursor-pointer group/btn"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/30 text-accent flex items-center justify-center font-bold">
                              {prod.dropdownType === 'web' ? <Layout size={18} /> : prod.dropdownType === 'ai' ? <Bot size={18} /> : <Layers size={18} />}
                            </div>
                            <div className="text-left">
                              <span className="font-mono text-xs md:text-sm font-bold text-text-primary uppercase tracking-wide block">
                                {prod.dropdownTitle}
                              </span>
                              <span className="font-mono text-[11px] text-text-secondary">
                                Click to {isOpen ? 'collapse modules' : 'expand and explore details'}
                              </span>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-bg-card flex items-center justify-center text-text-primary group-hover/btn:bg-accent group-hover/btn:text-bg-primary transition-colors">
                            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </div>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.35, ease: "easeInOut" }}
                              className="overflow-hidden"
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-4 pt-2">
                                {prod.dropdownItems.map((item: any, sIdx: number) => {
                                  const IconComp = item.icon || CheckCircle2;
                                  return (
                                    <div 
                                      key={sIdx}
                                      className="p-4 rounded-2xl bg-bg-primary/70 border border-border-primary hover:border-accent/50 hover:bg-bg-primary transition-all duration-300 flex flex-col justify-between group/item"
                                    >
                                      <div className="flex items-start gap-3.5 mb-2">
                                        <div className="p-2.5 rounded-xl bg-bg-card text-accent border border-border-primary group-hover/item:scale-110 group-hover/item:border-accent transition-all shrink-0">
                                          <IconComp size={18} />
                                        </div>
                                        <div>
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <h4 className="font-mono text-xs md:text-sm font-bold text-text-primary group-hover/item:text-accent transition-colors">
                                              {item.title}
                                            </h4>
                                            {item.badge && (
                                              <span className="px-2 py-0.5 rounded-md bg-accent/15 text-accent text-[9px] font-mono font-bold uppercase">
                                                {item.badge}
                                              </span>
                                            )}
                                          </div>
                                          <p className="font-mono text-[11px] text-text-secondary/80 leading-relaxed mt-1.5">
                                            {item.desc}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 lg:p-8 pt-0 mt-auto">
                  <div className="flex justify-between items-center border-t border-border-primary pt-6">
                    <div>
                      <span className="text-[10px] font-mono uppercase text-text-secondary block">Engagement Status</span>
                      <div className="font-mono font-bold text-xs md:text-sm text-text-primary flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        {prod.status}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MagneticGlowButton className="p-3 !px-4 text-xs font-mono font-bold flex items-center gap-2">
                        <span>Inquire Now</span>
                        <ArrowRight size={14} />
                      </MagneticGlowButton>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        )}
      </div>
    </section>
  );
};

// --- Main App ---

export const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);
  const { isVisible } = useWidgetVisibility(5000);

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
      {(show && isVisible) && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-24 right-6 w-12 h-12 bg-bg-card/90 hover:bg-accent hover:text-white text-text-primary border border-white/10 rounded-full flex items-center justify-center z-40 shadow-xl backdrop-blur-md hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer outline-none group"
        >
          <ArrowUp size={20} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

