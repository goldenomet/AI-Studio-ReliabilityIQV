
import React, { useState, useRef, useEffect } from 'react';
import upArrow3D from '../assets/images/up_arrow_3d_1787579872621.jpg';
import { useWidgetVisibility } from '../hooks/useWidgetVisibility';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { 
  ArrowRight, ChevronRight, MapPin, Phone, Mail, Filter, Search, Info, Star, Globe, Cpu, 
  Map as MapIcon, FileText, PenTool, Zap, ChevronDown, ChevronUp, Monitor, Wifi, Printer, 
  Mail as MailIcon, Layers, Laptop, HardDrive, UserCheck, Headphones, Video, Sparkles, 
  Server, ShoppingCart, Layout, Briefcase, Bot, Workflow, FileSpreadsheet, MailCheck, 
  Share2, CalendarCheck, CheckCircle2, Code, Palette, ShieldCheck, Check, X, SlidersHorizontal
} from 'lucide-react';
import { 
  signInWithGmail, 
  sendFormSubmissionViaGmail, 
  getGmailAccessToken, 
  logoutGmail, 
  initGmailAuth 
} from '../lib/gmail';
import { User } from 'firebase/auth';
import { MagneticGlowButton } from './MagneticGlowButton';
import { SmartTypewriter, TextEngine, PixelSnow, TextScroll, GrainyGradient } from './Effects';
import { ServiceDetailModal, ServiceDetail as IServiceDetail } from './ServiceDetailModal';

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
import { useSectionFlow } from './SectionFlow';

export const CompetenciesSection = ({ onContact }: { onContact: () => void }) => {
  const [selectedService, setSelectedService] = useState<IServiceDetail | null>(null);
  const { ref: flowRef, style: flowStyle } = useSectionFlow();

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
    <motion.section ref={flowRef} style={flowStyle} className="relative mt-0 bg-transparent py-24 text-text-primary transition-colors duration-500 overflow-hidden border-t border-border-subtle">
      {/* Diffused Serene Light Pools */}
      <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[480px] h-[480px] bg-white/70 dark:bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-8 right-1/4 w-[440px] h-[440px] bg-sky-200/45 dark:bg-sky-400/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 mb-12 pointer-events-none text-center flex flex-col items-center relative z-10">
         <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3 font-semibold">
           Regional &amp; International Expertise
         </p>
         <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight tracking-tight" style={{ textWrap: 'balance' }}>
           What We Deliver.
         </h2>
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
    </motion.section>
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
  const { ref: narrativeFlowRef, style: narrativeFlowStyle } = useSectionFlow();

  const handleAnimationComplete = () => {
    setActiveIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
  };

  return (
    <motion.section ref={narrativeFlowRef} style={narrativeFlowStyle} className="relative bg-transparent text-text-primary z-20 border-t border-border-subtle transition-colors duration-500 pb-24 md:pb-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[500px] h-[500px] bg-sky-200/40 dark:bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />
      
      <div className="pt-28 pb-12 px-6 max-w-5xl mx-auto relative z-10 text-center">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-4 font-semibold">
          The Narrative
        </p>
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-text-primary tracking-tight leading-tight justify-center flex flex-wrap" style={{ textWrap: 'balance' }}>
          Driven by logic, defined by results.
        </h2>
        <p className="mt-5 text-base sm:text-lg text-text-secondary max-w-2xl mx-auto font-sans leading-relaxed">
          A showcase of our journey, built with precision and intent.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 w-full max-w-7xl mx-auto px-6 relative z-10 items-stretch">
        <div className="w-full lg:w-5/12 flex flex-col gap-4 justify-center">
          {SHOWCASE_ITEMS.map((item, index) => {
            const isActive = index === activeIndex;
            
            return (
              <div 
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`relative overflow-hidden transition-all duration-500 rounded-[28px] cursor-pointer p-6 md:p-7 flex flex-col
                  ${isActive
                    ? 'frosted-panel-elevated border-accent/40 text-text-primary'
                    : 'frosted-panel opacity-75 hover:opacity-100 text-text-secondary'}`}
              >
                {/* Progress Bar Container */}
                <div className="absolute top-0 left-0 w-full h-[3px] bg-accent/15">
                  {isActive && (
                    <motion.div
                      key={`progress-${activeIndex}`}
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: DURATION / 1000, ease: "linear" }}
                      onAnimationComplete={handleAnimationComplete}
                      className="h-full bg-accent"
                    />
                  )}
                </div>
                
                <div className="flex items-center gap-4 mb-2 mt-1">
                  <span className={`font-mono text-xs font-bold flex items-center justify-center w-8 h-8 rounded-full border transition-colors duration-500 tabular-nums ${isActive ? 'border-accent/40 text-accent bg-accent/10' : 'border-border-subtle text-text-secondary bg-white/40 dark:bg-white/5'}`}>
                    {item.num}
                  </span>
                  <h3 className={`text-xl md:text-2xl font-bold font-sans tracking-tight transition-colors duration-500 ${isActive ? 'text-text-primary' : 'text-text-secondary'}`}>
                    {item.title}
                  </h3>
                </div>

                <motion.div
                  initial={false}
                  animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
                  className="overflow-hidden"
                >
                   <div className="pt-2 pb-1 pl-12 text-sm md:text-base text-text-secondary leading-relaxed font-sans">
                     {item.description}
                     
                     {/* Mobile Image */}
                     <div className="lg:hidden w-full h-[220px] md:h-[280px] mt-5 rounded-2xl overflow-hidden relative shadow-md border border-border-primary">
                       <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                     </div>
                   </div>
                </motion.div>
              </div>
            )
          })}
        </div>
        
        {/* Desktop Image Panel */}
        <div className="hidden lg:block w-full lg:w-7/12 h-[580px] xl:h-[640px] relative rounded-[36px] overflow-hidden frosted-panel-elevated p-3.5">
           <div className="w-full h-full relative rounded-[26px] overflow-hidden">
             <AnimatePresence mode="wait">
                <motion.img 
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  src={SHOWCASE_ITEMS[activeIndex].img}
                  alt={SHOWCASE_ITEMS[activeIndex].title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
             </AnimatePresence>
             <div className="absolute inset-0 glass-reflection z-10" />
             <div className="absolute inset-0 bg-gradient-to-t from-[#07142b]/85 via-[#07142b]/20 to-transparent z-10 pointer-events-none" />
             
             {/* Title over image */}
             <div className="absolute bottom-8 left-8 z-20 overflow-hidden text-white pr-10">
               <AnimatePresence mode="wait">
                  <motion.div
                     key={activeIndex}
                     initial={{ y: 18, opacity: 0 }}
                     animate={{ y: 0, opacity: 1 }}
                     exit={{ y: -18, opacity: 0 }}
                     transition={{ duration: 0.4 }}
                  >
                      <p className="font-mono text-xs tracking-widest text-sky-200 mb-2 font-semibold uppercase">Phase {SHOWCASE_ITEMS[activeIndex].num}</p>
                      <h4 className="text-3xl md:text-4xl font-bold font-sans tracking-tight leading-tight text-white">
                        {SHOWCASE_ITEMS[activeIndex].title}
                      </h4>
                  </motion.div>
               </AnimatePresence>
             </div>
           </div>
        </div>
      </div>
    </motion.section>
  );
};

export const ContactSection = () => {
  const { ref: contactFlowRef, style: contactFlowStyle } = useSectionFlow();
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', service: 'Web Operations', details: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState('Data Transmitted');
  const [gmailUser, setGmailUser] = useState<User | null>(null);
  const [gmailToken, setGmailTokenState] = useState<string | null>(null);
  const [isGmailConnecting, setIsGmailConnecting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  
  // Spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const unsubscribe = initGmailAuth(
      (user, token) => {
        setGmailUser(user);
        setGmailTokenState(token);
        if (user.email && !formData.email) {
          setFormData(prev => ({ ...prev, email: user.email || '' }));
        }
      },
      () => {
        setGmailUser(null);
        setGmailTokenState(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleConnectGmail = async () => {
    setIsGmailConnecting(true);
    try {
      const res = await signInWithGmail();
      if (!res) {
        // User closed or dismissed the sign-in modal
        return;
      }
      setGmailUser(res.user);
      setGmailTokenState(res.accessToken);
      if (res.user.email) {
        setFormData(prev => ({ 
          ...prev, 
          email: prev.email || res.user.email || '',
          firstName: prev.firstName || res.user.displayName?.split(' ')[0] || '',
          lastName: prev.lastName || res.user.displayName?.split(' ').slice(1).join(' ') || ''
        }));
      }
    } catch (err: any) {
      if (err?.code !== 'auth/popup-closed-by-user' && err?.code !== 'auth/cancelled-popup-request') {
        console.warn("Gmail OAuth connection notice:", err?.message || err);
      }
    } finally {
      setIsGmailConnecting(false);
    }
  };

  const handleDisconnectGmail = async () => {
    await logoutGmail();
    setGmailUser(null);
    setGmailTokenState(null);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    let sentToGmailDirectly = false;
    const fullName = `${formData.firstName} ${formData.lastName}`.trim();

    try {
      const token = gmailToken || getGmailAccessToken();
      
      // 1. Send via Client-side Gmail REST API if authenticated
      if (token) {
        try {
          await sendFormSubmissionViaGmail(
            token,
            {
              name: fullName,
              email: formData.email,
              service: formData.service,
              details: formData.details,
              subject: `[ReliabilityIQ] Inquiry from ${fullName}`
            },
            'reliabilityiqventures@gmail.com'
          );
          sentToGmailDirectly = true;
        } catch (gErr) {
          console.warn("Direct Gmail API dispatch failed, trying backend proxy:", gErr);
        }
      }

      // 2. Post to backend `/api/lead`
      const leadResponse = await fetch("/api/lead", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          ...(token ? { "Authorization": `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          name: fullName,
          email: formData.email,
          service: formData.service,
          details: formData.details,
          message: formData.details,
          gmailToken: token
        }),
      });

      const resData = await leadResponse.json().catch(() => ({}));
      if (sentToGmailDirectly || resData.deliveredViaGmail) {
        setSuccessMessage("Delivered Directly to Gmail Inbox");
      } else {
        setSuccessMessage("Data Transmitted & Logged");
      }

      setIsSuccess(true);
      setFormData({ firstName: '', lastName: '', email: gmailUser?.email || '', service: 'Web Operations', details: '' });
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (error) {
      console.error("Submission Error:", error);
      const subject = encodeURIComponent(`Inquiry from ${fullName}`);
      const body = encodeURIComponent(`Name: ${fullName}\nEmail: ${formData.email}\nService: ${formData.service}\nDetails: ${formData.details}`);
      window.location.href = `mailto:reliabilityiqventures@gmail.com?subject=${subject}&body=${body}`;
      setSuccessMessage("Opening Mail Client");
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = (name: string) => `
    w-full bg-white/80 dark:bg-[#0b1c3b]/75 backdrop-blur-md px-4 py-3.5 rounded-xl 
    outline-none border transition-all duration-300
    text-text-primary placeholder:text-text-secondary/50 font-sans text-sm
    ${errors[name] ? 'border-red-500/60 focus:border-red-500' : 'border-border-subtle focus:border-accent'}
    focus:ring-2 focus:ring-accent/15
  `;

  return (
    <motion.section ref={contactFlowRef} style={contactFlowStyle} id="contact-section" className="pb-28 px-4 md:px-6 bg-transparent text-text-primary transition-colors duration-500 overflow-hidden relative border-t border-border-subtle pt-20">
      {/* Diffused serene ambient light pools */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[780px] h-[780px] bg-white/60 dark:bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[460px] h-[460px] bg-sky-200/45 dark:bg-sky-400/10 rounded-full blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="frosted-panel-elevated rounded-[36px] md:rounded-[44px] overflow-hidden flex flex-col lg:flex-row text-text-primary transition-colors duration-500 group/container relative"
             onMouseMove={handleMouseMove}
        >
          {/* Reactive Spotlight Effect */}
          <motion.div 
            className="pointer-events-none absolute -inset-px opacity-0 group-hover/container:opacity-100 transition-opacity duration-300"
            style={{
              background: useTransform(
                [mouseX, mouseY],
                ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.14), transparent 45%)`
              )
            }}
          />

          {/* Form Side */}
          <div className="lg:w-[55%] p-8 md:p-12 lg:p-14 border-b lg:border-b-0 lg:border-r border-border-subtle relative transition-colors duration-500">
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center justify-between gap-3 mb-4 flex-wrap">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent font-semibold">
                  Client Inquiries
                </p>
                {gmailUser ? (
                  <button
                    type="button"
                    onClick={handleDisconnectGmail}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/75 dark:bg-white/10 border border-border-primary text-[11px] font-medium text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                    title="Disconnect Google Account"
                  >
                    <CheckCircle2 size={12} className="text-emerald-600 dark:text-emerald-400" />
                    <span className="truncate max-w-[160px]">{gmailUser.email}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleConnectGmail}
                    disabled={isGmailConnecting}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/75 dark:bg-white/10 border border-border-primary text-[11px] font-medium text-text-secondary hover:text-accent transition-colors cursor-pointer disabled:opacity-50"
                  >
                    <Mail size={12} className="text-accent" />
                    <span>{isGmailConnecting ? 'Connecting...' : 'Autofill with Gmail'}</span>
                  </button>
                )}
              </div>
              
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-10 tracking-tight text-text-primary leading-[1.08]" style={{ textWrap: 'balance' }}>
                Establish <br /> <span className="text-accent">Communication.</span>
              </h2>

              <form 
                ref={formRef}
                name="contact" 
                data-netlify="true" 
                className="space-y-6 font-sans" 
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group/field relative">
                    <label className="block text-xs uppercase text-text-secondary mb-2 font-semibold tracking-wider transition-colors duration-300 group-focus-within/field:text-accent">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Jane" 
                      className={inputClasses('firstName')}
                    />
                    {errors.firstName && <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-xs mt-1 font-medium">{errors.firstName}</motion.p>}
                  </div>

                  <div className="group/field relative">
                    <label className="block text-xs uppercase text-text-secondary mb-2 font-semibold tracking-wider transition-colors duration-300 group-focus-within/field:text-accent">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe" 
                      className={inputClasses('lastName')}
                    />
                    {errors.lastName && <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-xs mt-1 font-medium">{errors.lastName}</motion.p>}
                  </div>
                </div>

                <div className="group/field relative">
                  <label className="block text-xs uppercase text-text-secondary mb-2 font-semibold tracking-wider transition-colors duration-300 group-focus-within/field:text-accent">Work Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@company.com" 
                    className={inputClasses('email')}
                  />
                  {errors.email && <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-xs mt-1 font-medium">{errors.email}</motion.p>}
                </div>

                <div className="group/field relative">
                  <label className="block text-xs uppercase text-text-secondary mb-2 font-semibold tracking-wider transition-colors duration-300 group-focus-within/field:text-accent">Project Stream</label>
                  <div className="relative">
                    <select 
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`${inputClasses('service')} appearance-none pr-10 cursor-pointer`}
                    >
                      <option className="bg-white dark:bg-[#0c1f40] text-[#0f2547] dark:text-[#f1f6ff]">Web Operations</option>
                      <option className="bg-white dark:bg-[#0c1f40] text-[#0f2547] dark:text-[#f1f6ff]">AI Automations</option>
                      <option className="bg-white dark:bg-[#0c1f40] text-[#0f2547] dark:text-[#f1f6ff]">GIS Mapping</option>
                      <option className="bg-white dark:bg-[#0c1f40] text-[#0f2547] dark:text-[#f1f6ff]">Technical Reports</option>
                      <option className="bg-white dark:bg-[#0c1f40] text-[#0f2547] dark:text-[#f1f6ff]">Content Studio</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-accent">
                      <ChevronDown size={18} />
                    </div>
                  </div>
                </div>

                <div className="group/field relative">
                  <label className="block text-xs uppercase text-text-secondary mb-2 font-semibold tracking-wider transition-colors duration-300 group-focus-within/field:text-accent">Project Brief</label>
                  <textarea 
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={4} 
                    placeholder="Tell us about your objectives, timeline, or technical goals..." 
                    className={`${inputClasses('details')} resize-none`}
                  ></textarea>
                  {errors.details && <motion.p initial={{ opacity: 0, x: -5 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-xs mt-1 font-medium">{errors.details}</motion.p>}
                </div>

                <div className="pt-4">
                  <AnimatePresence mode="wait">
                    {isSuccess ? (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        className="w-full frosted-panel border border-emerald-400/50 text-emerald-700 dark:text-emerald-300 p-7 rounded-3xl flex flex-col items-center justify-center text-center gap-3"
                      >
                        <div className="w-14 h-14 bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 rounded-full flex items-center justify-center">
                          <CheckCircle2 size={28} />
                        </div>
                        <div>
                          <p className="font-bold text-lg tracking-tight">{successMessage}</p>
                          <p className="text-xs text-text-secondary mt-1">Our engineering advisory team will respond within 24 hours.</p>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <button 
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full swimtopia-pill-btn justify-center !py-4 text-base sm:text-lg disabled:opacity-50 group cursor-pointer"
                        >
                          <span className="swimtopia-pill-badge">
                            {isSubmitting ? (
                              <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                                <Cpu size={14} />
                              </motion.span>
                            ) : (
                              <ChevronRight size={14} strokeWidth={3} />
                            )}
                          </span>
                          <span>{isSubmitting ? 'Submitting Request...' : 'Submit Consultation Request'}</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>
            </div>
          </div>

          {/* Logistics Side */}
          <div className="lg:w-[45%] bg-white/40 dark:bg-white/[0.04] backdrop-blur-xl relative flex flex-col p-8 md:p-12 lg:p-14 transition-colors duration-500 group/logistics">
            <div className="relative z-10 flex flex-col h-full gap-10">
              <div className="space-y-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent font-semibold">Studio Headquarters</p>
                <div className="relative rounded-[28px] overflow-hidden border border-border-primary bg-sky-50 dark:bg-[#08152e] shadow-sm h-72 lg:h-80 transition-all duration-500">
                  <iframe 
                    src="https://maps.google.com/maps?q=Ipaja,%20Lagos%20State,%20Nigeria&t=&z=14&ie=UTF8&iwloc=&output=embed"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true}
                    loading="lazy" 
                    className="absolute inset-0 dark:invert-[.9] dark:hue-rotate-180 opacity-90 hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3.5 frosted-panel-elevated p-3.5 rounded-2xl">
                    <div className="p-2.5 bg-accent text-white rounded-xl shrink-0 shadow-sm">
                      <MapPin size={20} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-text-primary truncate">ReliabilityIQ Headquarters</p>
                      <p className="text-xs text-text-secondary truncate">Ipaja District, Lagos State, Nigeria</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div className="space-y-2.5">
                  <div className="font-mono text-xs uppercase tracking-wider text-text-secondary font-semibold flex items-center gap-2">
                    <Phone size={13} className="text-accent" /> Direct Telephone
                  </div>
                  <div className="flex flex-col gap-1.5 font-mono text-sm sm:text-base font-semibold text-text-primary tabular-nums">
                    <a href="tel:+2349075934287" className="hover:text-accent transition-all hover:translate-x-1 inline-block w-fit">+234 907 593 4287</a>
                    <a href="tel:+2349065394605" className="hover:text-accent transition-all hover:translate-x-1 inline-block w-fit">+234 906 539 4605</a>
                  </div>
                </div>

                <div className="space-y-2.5">
                  <div className="font-mono text-xs uppercase tracking-wider text-text-secondary font-semibold flex items-center gap-2">
                    <Mail size={13} className="text-accent" /> Electronic Mail
                  </div>
                  <div className="font-mono text-sm sm:text-base font-semibold text-text-primary">
                    <a href="mailto:reliabilityiqventures@gmail.com" className="hover:text-accent transition-all hover:translate-x-1 inline-block break-all">reliabilityiqventures@gmail.com</a>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto pt-6 border-t border-border-subtle flex items-center justify-between font-mono text-xs text-text-secondary">
                <span>Lagos, Nigeria</span>
                <span className="text-accent font-semibold">Global Operations</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
export const TrendingProducts = () => {
  const { ref: trendingFlowRef, style: trendingFlowStyle } = useSectionFlow({ isHero: true });
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
      id: "obs-studio",
      title: "OBS Studio Setup",
      tag: "Studio Rigging",
      badgeColor: "bg-amber-500 text-white",
      desc: "Turnkey broadcast and streaming studio configuration. Multi-camera switching, high-bitrate encoding, clean audio routing, overlay branding, and live streaming workflows.",
      status: "Custom Studio Build",
      img: trendingStudioImg,
      category: "creative",
      rating: 5,
      highlights: ["Multi-Camera OBS Studio Rigging", "Audio Mixer & Noise Gate Setup", "Custom Stream Overlays & Stinger Transitions", "Local Recording & Cloud Multi-Stream"],
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
    <motion.section ref={trendingFlowRef} style={trendingFlowStyle} className="pt-24 pb-28 px-6 bg-transparent text-text-primary transition-colors duration-500 relative overflow-hidden border-t border-border-subtle">
      <div className="absolute top-1/4 left-1/4 w-[480px] h-[480px] bg-white/60 dark:bg-blue-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[440px] h-[440px] bg-sky-200/45 dark:bg-sky-400/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent mb-3 font-semibold">
              In-Demand Technology &amp; Services
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-primary leading-tight tracking-tight" style={{ textWrap: 'balance' }}>
              Trending Capabilities.
            </h2>
            <p className="text-text-secondary text-sm md:text-base mt-4 max-w-xl font-sans leading-relaxed">
              Explore our most requested website development, practical AI automations, broadcast studio setups, creative training, and enterprise IT support solutions.
            </p>
          </div>
          
          <div className="flex flex-col gap-3 w-full md:w-auto font-sans">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full">
              {/* Search Input */}
              <div className="relative flex-1 sm:w-72">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input
                  type="text"
                  placeholder="Search services (e.g. Printer, E-commerce)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-9 py-2.5 frosted-panel rounded-xl text-xs text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:border-accent transition-colors"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary p-0.5 rounded-full hover:bg-white/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
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
                  className="w-full pl-9 pr-9 py-2.5 frosted-panel rounded-xl text-xs font-semibold text-text-primary appearance-none focus:outline-none focus:border-accent transition-colors cursor-pointer"
                >
                  <option className="bg-white dark:bg-[#0c1f40]" value="all">Category: All Trending</option>
                  <option className="bg-white dark:bg-[#0c1f40]" value="web">Category: Web & UI/UX</option>
                  <option className="bg-white dark:bg-[#0c1f40]" value="ai">Category: AI Automation</option>
                  <option className="bg-white dark:bg-[#0c1f40]" value="it">Category: IT Support</option>
                  <option className="bg-white dark:bg-[#0c1f40]" value="creative">Category: Studio & Creative</option>
                  <option className="bg-white dark:bg-[#0c1f40]" value="infra">Category: Cloud & Infra</option>
                </select>
                <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-accent pointer-events-none" />
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" />
              </div>

              {/* Desktop Category Filter Tabs */}
              <div className="hidden sm:flex items-center gap-1 frosted-panel p-1.5 rounded-xl overflow-x-auto">
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
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                      activeTab === tab.id 
                        ? 'bg-accent text-white font-semibold shadow-sm' 
                        : 'text-text-secondary hover:text-text-primary hover:bg-white/50 dark:hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Search Tag Suggestions */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 text-[11px] text-text-secondary">
              <span className="shrink-0 font-medium">Quick Search:</span>
              <div className="flex items-center gap-1.5 flex-nowrap">
                {popularSearchTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className={`px-2.5 py-0.5 rounded-md border text-[11px] whitespace-nowrap transition-all cursor-pointer ${
                      searchQuery.toLowerCase() === tag.toLowerCase()
                        ? 'border-accent text-accent bg-accent/10 font-semibold'
                        : 'border-border-subtle hover:border-accent/40 text-text-secondary hover:text-text-primary bg-white/60 dark:bg-white/5'
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
          <div className="mb-6 flex items-center justify-between font-sans text-xs text-text-secondary frosted-panel p-3.5 rounded-xl">
            <div>
              Found <span className="font-bold text-accent tabular-nums">{filteredItems.length}</span> matching service{filteredItems.length === 1 ? '' : 's'} for "<span className="text-text-primary font-bold">{searchQuery}</span>"
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-accent hover:underline flex items-center gap-1 font-semibold cursor-pointer"
            >
              <X size={12} /> Clear search
            </button>
          </div>
        )}

        {/* Empty Search State */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 frosted-panel-elevated rounded-[32px] font-sans px-6">
            <div className="w-12 h-12 rounded-2xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4">
              <Search size={24} />
            </div>
            <h3 className="text-lg font-bold text-text-primary mb-2">No matching services found</h3>
            <p className="text-text-secondary text-sm max-w-md mx-auto mb-6">
              We couldn't find any capability matching "{searchQuery}". Try searching for general terms like "Wi-Fi", "Design", "Automation", or "Studio".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveTab('all');
              }}
              className="px-5 py-2.5 rounded-xl bg-accent text-white font-semibold text-xs hover:brightness-110 transition-all cursor-pointer"
            >
              Reset Search &amp; Filters
            </button>
          </div>
        ) : (
          /* Trending Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredItems.map((prod, i) => {
            const hasDropdown = Boolean(prod.dropdownKey && prod.dropdownItems);
            const isWide = hasDropdown;
            const isOpen = prod.dropdownKey ? openDropdowns[prod.dropdownKey] : false;

            return (
              <motion.div 
                key={prod.id || i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className={`frosted-panel-elevated rounded-[32px] overflow-hidden group hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between relative ${
                  isWide ? 'md:col-span-2 lg:col-span-3' : ''
                }`}
              >
                <div className="relative z-10">
                  <div className={`${isWide ? 'aspect-[21/9] md:aspect-[3.2/1]' : 'aspect-video'} relative overflow-hidden bg-sky-50 dark:bg-[#08152e]`}>
                    <img 
                      src={prod.img} 
                      alt={prod.title} 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 glass-reflection" />
                    <div className="absolute inset-0 bg-gradient-to-t from-white/85 dark:from-[#0e2044]/85 via-transparent to-transparent opacity-65" />
                    
                    <div className="absolute top-4 right-4 bg-white/90 dark:bg-[#0b1c3d]/90 text-accent border border-white/80 dark:border-blue-300/25 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-mono font-semibold uppercase tracking-wider shadow-sm">
                      {prod.tag}
                    </div>
                    
                    {hasDropdown && (
                      <div className="absolute bottom-4 left-6 md:left-8">
                        <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-[#0b1c3d]/90 backdrop-blur-md border border-white/80 dark:border-blue-300/25 text-text-primary text-xs font-mono font-semibold shadow-sm">
                          <Layers size={13} className="text-accent" /> Interactive Service Suite
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 lg:p-8">
                    <div className="flex justify-between items-start mb-3 gap-2">
                      <h3 className="text-xl lg:text-2xl font-bold font-sans tracking-tight group-hover:text-accent transition-colors text-text-primary">
                        {prod.title}
                      </h3>
                      <div className="flex text-amber-400 shrink-0 mt-1">
                        {[...Array(prod.rating || 5)].map((_, idx) => (
                          <Star key={idx} size={13} fill="currentColor" />
                        ))}
                      </div>
                    </div>
                    
                    <p className="text-text-secondary font-sans text-sm leading-relaxed mb-6">
                      {prod.desc}
                    </p>

                    {/* Highlights for standard cards */}
                    {prod.highlights && (
                      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {prod.highlights.map((hl, hlIdx) => (
                          <div key={hlIdx} className="flex items-center gap-2 text-xs font-sans text-text-secondary">
                            <Check size={14} className="text-accent shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Interactive Dropdown Section */}
                    {hasDropdown && prod.dropdownItems && prod.dropdownKey && (
                      <div className="mt-6 pt-6 border-t border-border-subtle">
                        <button
                          onClick={() => toggleDropdown(prod.dropdownKey!)}
                          className="w-full flex items-center justify-between p-4 rounded-2xl bg-white/70 dark:bg-white/[0.06] hover:bg-white/95 dark:hover:bg-white/10 border border-border-primary transition-all cursor-pointer group/btn"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/25 text-accent flex items-center justify-center font-bold">
                              {prod.dropdownType === 'web' ? <Layout size={18} /> : prod.dropdownType === 'ai' ? <Bot size={18} /> : <Layers size={18} />}
                            </div>
                            <div className="text-left">
                              <span className="font-sans text-xs md:text-sm font-bold text-text-primary block">
                                {prod.dropdownTitle}
                              </span>
                              <span className="font-sans text-xs text-text-secondary">
                                Click to {isOpen ? 'collapse modules' : 'expand and explore details'}
                              </span>
                            </div>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-white/80 dark:bg-white/10 border border-border-subtle flex items-center justify-center text-text-primary group-hover/btn:bg-accent group-hover/btn:text-white transition-colors">
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
                                      className="p-4 rounded-2xl bg-white/65 dark:bg-white/[0.05] border border-border-primary hover:border-accent/40 hover:bg-white/90 dark:hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between group/item"
                                    >
                                      <div className="flex items-start gap-3.5 mb-2">
                                        <div className="p-2.5 rounded-xl bg-white/90 dark:bg-white/10 text-accent border border-border-subtle group-hover/item:scale-105 group-hover/item:border-accent/40 transition-all shrink-0">
                                          <IconComp size={18} />
                                        </div>
                                        <div>
                                          <div className="flex items-center gap-2 flex-wrap">
                                            <h4 className="font-sans text-xs md:text-sm font-bold text-text-primary group-hover/item:text-accent transition-colors">
                                              {item.title}
                                            </h4>
                                            {item.badge && (
                                              <span className="px-2 py-0.5 rounded-md bg-accent/10 text-accent text-[10px] font-mono font-semibold uppercase">
                                                {item.badge}
                                              </span>
                                            )}
                                          </div>
                                          <p className="font-sans text-xs text-text-secondary leading-relaxed mt-1.5">
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

                <div className="p-6 lg:p-8 pt-0 mt-auto relative z-10">
                  <div className="flex justify-between items-center border-t border-border-subtle pt-5">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-text-secondary block">Engagement Model</span>
                      <div className="font-sans font-semibold text-xs md:text-sm text-text-primary flex items-center gap-2 mt-0.5">
                        <span className="w-2 h-2 rounded-full bg-accent" />
                        {prod.status}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <MagneticGlowButton
                        onClick={() => document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' })}
                        className="!py-2.5 !px-5 text-xs font-sans font-semibold flex items-center gap-2"
                      >
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
    </motion.section>
  );
};

// --- Main App ---

export const ScrollToTopButton = ({ isMenuOpen = false }: { isMenuOpen?: boolean }) => {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);
  const { isVisible } = useWidgetVisibility(5000);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShow(scrollY > 300);
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <AnimatePresence>
      {(show && isVisible) && (
        <motion.button
          key="scroll-to-top"
          initial={{ opacity: 0, scale: 0.75, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.75, y: 20 }}
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          aria-label="Scroll to top"
          title="Back to top"
          className={`fixed bottom-24 right-6 w-12 h-12 frosted-panel-elevated hover:border-accent/60 text-text-primary hover:text-accent rounded-full items-center justify-center z-40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-accent group ${
            isMenuOpen ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Live Scroll Progress Ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="riq-scroll-ring-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1d6ce0" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="currentColor"
              strokeOpacity="0.12"
              strokeWidth="2.25"
            />
            <circle
              cx="24"
              cy="24"
              r={radius}
              fill="none"
              stroke="url(#riq-scroll-ring-grad)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              className="transition-[stroke-dashoffset] duration-150 ease-out"
            />
          </svg>

          {/* Bespoke Dual-Chevron Kinetic Ascent Icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="relative z-10 overflow-visible"
          >
            <path
              d="M7 11.5L12 6.5L17 11.5"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-y-0.5 transition-transform duration-200"
            />
            <path
              d="M8.5 17L12 13.5L15.5 17"
              stroke="currentColor"
              strokeOpacity="0.55"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:-translate-y-1 group-hover:opacity-100 transition-all duration-200"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

