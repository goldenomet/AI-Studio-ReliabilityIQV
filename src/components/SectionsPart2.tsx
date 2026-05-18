
import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'motion/react';
import { ArrowRight, MapPin, Phone, Mail, Filter, Search, Info, ArrowUp, Star, Globe, Cpu, Map as MapIcon, FileText, PenTool } from 'lucide-react';
import { StackCard, TiltCard, FlipCard } from './Cards';
import { MagneticGlowButton } from './MagneticGlowButton';
import { SmartTypewriter, TextEngine, PixelSnow, TextScroll, GrainyGradient } from './Effects';
import { ServiceDetailModal, ServiceDetail as IServiceDetail } from './ServiceDetailModal';
import { ServiceDetail } from './ServiceDetail';

import fallbackLogo from '@/src/assets/images/logo.png';
import newImage1778002658766 from '@/src/assets/images/regenerated_image_1778002658766.jpg';
import newImage1778003940043 from '@/src/assets/images/regenerated_image_1778003940043.jpg';
import newImage1778003942890 from '@/src/assets/images/regenerated_image_1778003942890.jpg';
import newImage1778003945349 from '@/src/assets/images/regenerated_image_1778003945349.jpg';
import newImage1778001962382 from '@/src/assets/images/regenerated_image_1778001962382.jpg';
import newImage1778002234657 from '@/src/assets/images/regenerated_image_1778002234657.jpg';
import servicesBgImage from '@/src/assets/images/section1.png';

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

export const NarrativeSection = () => (
  <section className="py-24 md:py-32 px-6 relative overflow-hidden bg-bg-primary z-20 border-t border-border-primary transition-colors duration-500">
    <PixelSnow />
    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 lg:gap-20 gap-12 items-center relative z-10">
      <div className="relative rounded-[40px] overflow-hidden shadow-2xl aspect-[4/5] group border border-border-primary">
        <FlipCard
          className="w-full h-full absolute inset-0"
          frontContent={
            <img 
              src={newImage1778003945349} 
              alt="Office work" 
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover filter grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
            />
          }
          backContent={
             <div className="w-full h-full bg-bg-secondary flex flex-col items-center justify-center p-8 text-center text-text-primary transition-colors duration-500">
                <Star size={32} className="text-accent mb-4" />
                <h3 className="text-xl font-mono font-bold mb-3">Our Core Philosophy</h3>
                <p className="text-text-secondary/80 font-mono text-xs leading-relaxed max-w-[200px] mb-16">Building systems that simply perform, without compromise.</p>
             </div>
          }
        />
        <div className="absolute bottom-10 left-10 p-10 bg-bg-card/40 backdrop-blur-md border border-border-primary rounded-3xl max-w-xs pointer-events-none transition-opacity duration-300 group-hover:opacity-0 shadow-xl">
          <h4 className="text-accent font-mono text-2xl font-bold mb-2">Founded in 2024</h4>
          <p className="text-text-secondary/70 font-mono text-xs leading-relaxed">
            From a small room of 3 engineers to a global powerhouse of 50+ experts.
          </p>
        </div>
      </div>

      <div>
        <div className="font-mono text-xs uppercase tracking-widest text-accent mb-6 font-bold">The Narrative</div>
        <TextScroll 
          text="Driven by logic, defined by results."
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-10 tracking-tight leading-tight flex flex-wrap"
        />

        <div className="space-y-12">
          {[
            { num: '01', title: 'The Genesis', text: 'Born in Nigeria to address a local gap in enterprise IT, we evolved quickly by prioritizing robust execution over theory. ReliabilityIQ was established to prove that African tech could match and exceed global standards.' },
            { num: '02', title: 'The AI Pivot', text: 'As technology shifted, we integrated advanced AI to move our clients from reactive maintenance to proactive scaling, serving both growing Nigerian firms and established international entities.' },
            { num: '03', title: 'Global Operations', text: 'Today, we manage web operations and spatial data from Lagos to London and beyond, maintaining an obsessive attention to detail for a diverse portfolio of global partners.' }
          ].map((step) => (
            <div key={step.num} className="flex gap-8 group">
              <div className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-accent/20 flex items-center justify-center font-mono text-sm font-bold text-accent group-hover:bg-accent group-hover:text-bg-primary transition-all">
                {step.num}
              </div>
              <div>
                <h4 className="text-xl font-bold mb-3 font-mono text-text-primary">{step.title}</h4>
                <p className="text-text-secondary font-mono text-sm leading-relaxed">
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

export const ContactSection = () => {
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', service: 'Web Operations', details: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.details.trim().length < 10) newErrors.details = "Please provide more details (min 10 characters)";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const encode = (data: Record<string, string>) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({ 
          "form-name": "contact", 
          ...formData,
          name: `${formData.firstName} ${formData.lastName}` 
        }),
      });
      
      setIsSuccess(true);
      setFormData({ firstName: '', lastName: '', email: '', service: 'Web Operations', details: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Netlify Submission Error:", error);
      // Fallback to mailto if Netlify fails or we're not on Netlify
      const subject = encodeURIComponent(`New Contact Form Submission from ${formData.firstName} ${formData.lastName}`);
      const body = encodeURIComponent(`You have a new inquiry from your website.

Name: ${formData.firstName} ${formData.lastName}
Email: ${formData.email}
Service Required: ${formData.service}

Message/Details:
${formData.details}
`);
      window.location.href = `mailto:reliabilityiqventures@gmail.com?subject=${subject}&body=${body}`;
      
      setIsSuccess(true); // Still show success as it opened mail client
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <section id="contact-section" className="pb-32 px-6 bg-bg-primary transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <div className="bg-bg-card rounded-[48px] overflow-hidden shadow-2xl flex flex-col lg:flex-row border border-border-primary transition-colors duration-500">
          {/* Form */}
          <div className="lg:w-1/2 p-6 md:p-12 lg:p-20 border-r border-border-primary relative overflow-hidden group transition-colors duration-500">
            <GrainyGradient />
            <div className="relative z-10">
              <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4 font-bold">Start a Conversation</div>
              <h2 className="text-3xl md:text-5xl font-bold font-mono mb-12 leading-tight text-text-primary dark:text-green-800 transition-colors duration-500">
                Ready to upgrade your infrastructure?
              </h2>

              <form 
                name="contact" 
                data-netlify="true" 
                className="space-y-8 font-mono text-sm" 
                onSubmit={handleSubmit}
              >
                <input type="hidden" name="form-name" value="contact" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] uppercase text-text-secondary dark:text-green-800 mb-2 font-bold tracking-tighter transition-colors duration-500">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John" 
                      className={`w-full bg-bg-secondary/40 backdrop-blur-md p-4 rounded-xl outline-none border ${errors.firstName ? 'border-red-500' : 'border-border-primary'} focus:border-accent/30 transition-all text-text-primary placeholder:text-text-secondary/40 shadow-sm`}
                    />
                    {errors.firstName && <p className="text-red-500 text-[10px] mt-1">{errors.firstName}</p>}
                  </div>
                  <div>
                     <label className="block text-[10px] uppercase text-text-secondary dark:text-green-800 mb-2 font-bold tracking-tighter transition-colors duration-500">Last Name</label>
                     <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe" 
                      className={`w-full bg-bg-secondary/40 backdrop-blur-md p-4 rounded-xl outline-none border ${errors.lastName ? 'border-red-500' : 'border-border-primary'} focus:border-accent/30 transition-all text-text-primary placeholder:text-text-secondary/40 shadow-sm`}
                    />
                    {errors.lastName && <p className="text-red-500 text-[10px] mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-text-secondary dark:text-green-800 mb-2 font-bold tracking-tighter transition-colors duration-500">Work Email</label>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com" 
                    className={`w-full bg-bg-secondary/40 backdrop-blur-md p-4 rounded-xl outline-none border ${errors.email ? 'border-red-500' : 'border-border-primary'} focus:border-accent/30 transition-all text-text-primary placeholder:text-text-secondary/40 shadow-sm`}
                  />
                  {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-text-secondary dark:text-green-800 mb-2 font-bold tracking-tighter transition-colors duration-500">Service Interest</label>
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full bg-bg-secondary/40 backdrop-blur-md p-4 rounded-xl outline-none font-mono text-sm cursor-pointer border border-border-primary focus:border-accent/30 transition-all text-text-primary dark:text-green-800 shadow-sm"
                  >
                    <option className="dark:bg-bg-card">Web Operations</option>
                    <option className="dark:bg-bg-card">AI Automations</option>
                    <option className="dark:bg-bg-card">GIS Mapping</option>
                    <option className="dark:bg-bg-card">Technical Reports</option>
                    <option className="dark:bg-bg-card">Content & Design</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] uppercase text-text-secondary dark:text-green-800 mb-2 font-bold tracking-tighter transition-colors duration-500">Project Details</label>
                  <textarea 
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    rows={4} 
                    placeholder="Tell us about your technical challenges..." 
                    className={`w-full bg-bg-secondary/40 backdrop-blur-md p-4 rounded-xl outline-none border ${errors.details ? 'border-red-500' : 'border-border-primary'} focus:border-accent/30 transition-all resize-none text-text-primary dark:text-green-800 placeholder:text-text-secondary/40 shadow-sm`}
                  ></textarea>
                  {errors.details && <p className="text-red-500 text-[10px] mt-1">{errors.details}</p>}
                </div>

                <MagneticGlowButton 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isSuccess ? '!bg-green-500' : ''} py-5 text-lg font-bold disabled:opacity-50 !rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300`}
                >
                  {isSubmitting ? 'Processing...' : isSuccess ? 'Request Sent!' : 'Submit Request'}
                </MagneticGlowButton>
              </form>
            </div>
          </div>

          {/* Map/Info */}
          <div className="lg:w-1/2 relative bg-bg-secondary/50 p-6 md:p-12 lg:p-20 flex flex-col justify-between overflow-hidden transition-colors duration-500">
            {/* Map Placeholder */}
            <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
               <img 
                src={fallbackLogo} 
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover grayscale opacity-40 dark:opacity-20 transition-opacity duration-500" 
                alt="map"
              />
            </div>
            
            <div className="relative z-10 flex-grow w-full rounded-2xl overflow-hidden shadow-lg mb-8 h-64 md:h-auto shrink-0 md:shrink border border-border-primary">
               <iframe 
                src="https://maps.google.com/maps?q=41%20Akeem%20Salami%20St,%20Idimu,%20Lagos%20102213,%20Lagos&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true}
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 dark:brightness-75 dark:contrast-125 dark:invert-[.9] dark:hue-rotate-180 transition-all duration-500"
              />
            </div>

            <div className="relative z-10 bg-transparent border border-border-primary p-6 lg:p-8 rounded-[24px] md:mt-0 flex flex-col sm:flex-row gap-4 sm:gap-6 justify-between flex-wrap items-start sm:items-center transition-colors duration-500">
              <div>
                <div className="text-[10px] uppercase tracking-widest text-text-secondary/50 mb-2 font-bold transition-colors duration-500">Direct Line</div>
                <div className="font-mono text-[13px] md:text-sm text-text-primary tracking-tighter leading-relaxed font-medium whitespace-nowrap transition-colors duration-500">
                  +234 9075934287 <br className="sm:hidden" /> <span className="hidden sm:inline">&bull;</span> +234 906539605
                </div>
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-text-secondary/50 mb-2 font-bold sm:text-right transition-colors duration-500">Support Email</div>
                <div className="font-mono text-[13px] md:text-[14px] text-text-primary tracking-tighter leading-normal font-medium break-all sm:break-normal truncate sm:text-right transition-colors duration-500">reliabilityiqventures@gmail.com</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const TrendingProducts = () => (
  <section className="pt-20 pb-32 px-6 bg-bg-primary transition-colors duration-500">
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-accent mb-4 font-bold">Domestic & Global Solutions</div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[0.9]">
            Market-Leading <br /> Infrastructures.
          </h2>
        </div>
        <div className="flex flex-wrap gap-3 font-mono">
          <MagneticGlowButton className="p-3 !px-4"><Search size={18} /></MagneticGlowButton>
          <MagneticGlowButton className="flex items-center gap-2 p-3 !px-4 border-border-primary text-text-primary text-xs sm:text-sm"><Filter size={18} /> Sort by popularity</MagneticGlowButton>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          { title: "IQ-Nodes Cluster", tag: "Hot", desc: "Edge computing for Lagos and beyond. Sub-10ms latency for regional AI processing and low-latency African app delivery.", price: "$2,400/mo", img: newImage1778001962382 },
          { title: "Sentinel AI Firewall", tag: "New", desc: "International standard network security layer. Protecting Nigerian digital assets from sophisticated global zero-day threats.", price: "$1,850/mo", img: newImage1778002234657 },
          { title: "Geo-Insight Dashboard", tag: "Bestseller", desc: "Master African logistics. Real-time visualization for cross-border transit, supply chain nodes, and regional traffic patterns.", price: "$900/mo", img: newImage1778002658766 },
          { title: "Auto-Scale VPS Pro", tag: "Efficiency", desc: "Flexible cloud resources that adapt automatically to local demand cycles and global traffic spikes without downtime.", price: "Custom", img: newImage1778003940043 },
          { title: "DataCleanse API", tag: "AI", desc: "Sanitize raw enterprise data at scale. Tailored for Nigerian data structures while maintaining global privacy compliance.", price: "$0.05/req", img: newImage1778003942890 },
          { title: "Vortex CDN", tag: "Speed", desc: "Global asset delivery with dedicated Nigerian edge nodes. Optimize your digital reach across every continent seamlessly.", price: "$120/mo", img: newImage1778003945349 },
        ].map((prod, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-bg-card rounded-[32px] overflow-hidden group shadow-sm hover:shadow-2xl transition-all duration-500 border border-border-primary"
          >
            <div className="aspect-video relative overflow-hidden">
               <img 
                src={prod.img} 
                alt={prod.title} 
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter grayscale brightness-75 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700" 
              />
               <div className="absolute top-4 right-4 bg-accent text-bg-primary px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">{prod.tag}</div>
            </div>
            <div className="p-6 lg:p-8">
               <div className="flex justify-between items-start mb-4 gap-2">
                 <h3 className="text-lg lg:text-xl font-bold font-mono tracking-tight group-hover:text-accent transition-colors text-text-primary">{prod.title}</h3>
                 <div className="flex text-amber-400 shrink-0"><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /></div>
               </div>
               <p className="text-text-secondary/70 font-mono text-[11px] leading-relaxed mb-6">{prod.desc}</p>
               <div className="flex justify-between items-center border-t border-border-primary pt-6">
                 <div className="font-mono font-bold text-text-primary">{prod.price}</div>
                 <MagneticGlowButton className="p-3 !px-3"><Info size={16} /></MagneticGlowButton>
               </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

// --- Main App ---

export const ScrollToTopButton = () => {
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
          className="fixed bottom-6 right-6 z-50 p-4 rounded-xl backdrop-blur-md border border-accent/20 text-bg-primary shadow-xl hover:bg-opacity-90 transition-all focus:outline-none cursor-pointer !bg-accent"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

