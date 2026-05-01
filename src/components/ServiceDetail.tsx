import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, CheckCircle2, Globe, Cpu, Zap, Shield, BarChart, Server } from 'lucide-react';

interface ServiceDetailProps {
  id: string;
  onBack: () => void;
  onContact: () => void;
}

const serviceData: Record<string, any> = {
  'branding': {
    title: 'Strategic Design & UX',
    tag: 'Experience Engineering',
    desc: 'We go beyond visuals. We engineer intuitive user journeys and high-performance interfaces that bridge the gap between human intent and system efficiency.',
    icon: <Globe className="w-12 h-12 text-brand-accent" />,
    stats: [
      { label: 'User Retention', value: '+38%' },
      { label: 'Conversion Lift', value: 'High' },
      { label: 'System Adoption', value: '100%' }
    ],
    features: [
      'Cognitive User Experience Mapping',
      'High-Fidelity Interface Engineering',
      'Adaptive Multi-platform Design Systems',
      'Performance-Optimized Asset Orchestration'
    ],
    detailedContent: 'Our design methodology is analytical and data-driven. We treat user interfaces as high-stakes control centers where every pixel must serve a functional purpose. By combining cognitive psychology with engineering precision, we build experiences that feel natural, reduce mental friction, and ensure that your global users stay engaged and productive.'
  },
  'development': {
    title: 'Advanced Development',
    tag: 'Web Operations',
    desc: 'Bespoke software solutions built for extreme performance and uncompromised scalability.',
    icon: <Cpu className="w-12 h-12 text-brand-accent" />,
    stats: [
      { label: 'Uptime', value: '99.99%' },
      { label: 'Render Speed', value: '<200ms' },
      { label: 'Code Quality', value: 'A+' }
    ],
    features: [
      'Next-Gen Frontend Architectures',
      'Robust API & Middleware Integration',
      'Infinite-Scaling Database Design',
      'Automated Quality Assurance'
    ],
    detailedContent: 'Development at Reliability IQ is about more than just writing code. It is about building digital infrastructures that last. We use a modular, type-safe approach to ensure that every system we build is maintainable, secure, and ready to scale with your business goals.'
  },
  'automation': {
    title: 'AI Automation & Orchestration',
    tag: 'Operational Intelligence',
    desc: 'We engineer autonomous system architectures that transform complex, manual bottlenecks into high-velocity digital assets.',
    icon: <Zap className="w-12 h-12 text-brand-accent" />,
    stats: [
      { label: 'Process Velocity', value: '4.5x' },
      { label: 'Manual Error Red.', value: '99%' },
      { label: 'Operational ROI', value: 'Quarterly' }
    ],
    features: [
      'Custom LLM-Powered Agent Integration',
      'Autonomous Decision-Tree Orchestration',
      'Cognitive Workflow Optimization',
      'Real-time Predictive Resource Scaling'
    ],
    detailedContent: 'Our approach to AI Automation is rooted in systems engineering. We don\'t just deploy "chatbots"—we architect end-to-end autonomous workflows that interface directly with your core infrastructure. By integrating state-of-the-art LLMs with reliable event-driven architectures, we enable your organization to scale operations linearly without exponential increases in overhead or risk.'
  },
  'documentation': {
    title: 'System Documentation',
    tag: 'Knowledge Engineering',
    desc: 'Eliminate technical debt and tribal knowledge with architectural blueprints that scale with your code.',
    icon: <Shield className="w-12 h-12 text-brand-accent" />,
    stats: [
      { label: 'Onboarding Time', value: '-65%' },
      { label: 'Knowledge Base', value: 'Unified' },
      { label: 'Maintenance ROI', value: 'High' }
    ],
    features: [
      'Automated Architectural Blueprints',
      'Living API & Schema Specifications',
      'Interactive Infrastructure Graphing',
      'Multi-Stakeholder Technical Wikis'
    ],
    detailedContent: 'Documentation is the most undervalued asset in engineering. We treat your documentation as a first-class citizen of your software lifecycle. Our approach involves building automated systems that extract truth directly from your infrastructure and codebases, ensuring that your technical records are never out of sync with reality. This creates a resilient organization where knowledge is permanent and scalable.'
  }
};

export const ServiceDetail = ({ id, onBack, onContact }: ServiceDetailProps) => {
  const serviceId = id.replace('service-', '');
  const data = serviceData[serviceId];

  if (!data) return <div>Service not found</div>;

  return (
    <div className="bg-brand-bg min-h-screen">
      {/* Navigation */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-brand-dark/50 hover:text-brand-accent transition-colors group cursor-pointer"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Services
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Header & Description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-8">{data.icon}</div>
            <div className="font-mono text-xs uppercase tracking-widest text-brand-accent mb-4">{data.tag}</div>
            <h1 className="text-5xl md:text-7xl font-bold font-mono tracking-tighter leading-tight mb-8 text-brand-dark">
              {data.title}
            </h1>
            <p className="text-xl font-mono text-brand-dark/70 leading-relaxed mb-12">
              {data.desc}
            </p>

            <div className="grid grid-cols-3 gap-8 mb-12 py-8 border-y border-brand-dark/10">
              {data.stats.map((stat: any, i: number) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-brand-dark">{stat.value}</div>
                  <div className="text-[10px] uppercase font-mono tracking-widest text-brand-dark/40">{stat.label}</div>
                </div>
              ))}
            </div>

            <button 
              onClick={onContact}
              className="bg-brand-dark text-white px-10 py-5 rounded-2xl font-mono font-bold hover:bg-brand-accent transition-all flex items-center gap-3 cursor-pointer"
            >
              Learn More
              <Zap size={18} fill="currentColor" />
            </button>
          </motion.div>

          {/* Details & Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 md:p-16 rounded-[48px] shadow-xl border border-brand-dark/5"
          >
            <h2 className="text-2xl font-bold font-mono mb-8 text-brand-dark">Capabilities</h2>
            <div className="space-y-6 mb-12">
              {data.features.map((feature: string, i: number) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-5 h-5 text-brand-accent shrink-0 mt-1" />
                  <span className="font-mono text-sm leading-relaxed text-brand-dark opacity-80">{feature}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold font-mono mb-6 text-brand-dark">Methodology</h2>
            <p className="font-mono text-sm leading-relaxed text-brand-dark/70">
              {data.detailedContent}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
