
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight } from 'lucide-react';
import { MagneticGlowButton } from './MagneticGlowButton';

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: any;
  image: any;
  longDescription: string;
  useCases: string[];
  caseStudy: {
    title: string;
    result: string;
  };
}

export const ServiceDetailModal = ({ 
  service, 
  isOpen, 
  onClose,
  onContact
}: { 
  service: ServiceDetail | null, 
  isOpen: boolean, 
  onClose: () => void,
  onContact: () => void
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      const timer = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen, service]);

  if (!service) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
          <motion.div
            key="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#0f2547]/45 dark:bg-[#040b1a]/75 backdrop-blur-md"
          />
          <motion.div
            layoutId={`service-card-${service.id}`}
            className="frosted-panel-elevated w-full max-w-4xl h-full max-h-[800px] rounded-[36px] overflow-hidden relative z-10 flex flex-col"
            initial={{ scale: 0.94, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.94, opacity: 0, y: 20 }}
          >
            <button 
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 md:top-6 md:right-6 z-20 p-3 frosted-panel rounded-full text-text-primary hover:bg-accent hover:text-white transition-colors shadow-sm cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex-grow overflow-y-auto custom-scrollbar">
              <div className="p-6 md:p-16">
                <div className="flex flex-col md:flex-row gap-12 items-start">
                  <div className="md:w-1/3 flex flex-col gap-8">
                    <div className="p-6 bg-accent/10 rounded-3xl text-accent w-fit inline-block">
                      <service.icon size={48} />
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold font-mono tracking-tighter leading-tight text-text-primary">
                      {service.title}
                    </h2>
                    <div className="h-1 w-20 bg-accent"></div>
                    <p className="text-text-secondary font-mono text-sm leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  <div className="md:w-2/3 space-y-12">
                    {loading ? (
                      <>
                        <div className="space-y-4 animate-pulse">
                          <div className="h-3 w-24 bg-border-primary rounded-full"></div>
                          <div className="h-4 w-full bg-border-subtle rounded-lg"></div>
                          <div className="h-4 w-full bg-border-subtle rounded-lg"></div>
                          <div className="h-4 w-3/4 bg-border-subtle rounded-lg"></div>
                        </div>

                        <div className="space-y-4 animate-pulse pt-4">
                          <div className="h-3 w-32 bg-border-primary rounded-full"></div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="h-10 bg-border-subtle rounded-xl"></div>
                            <div className="h-10 bg-border-subtle rounded-xl"></div>
                            <div className="h-10 bg-border-subtle rounded-xl"></div>
                            <div className="h-10 bg-border-subtle rounded-xl"></div>
                          </div>
                        </div>

                        <div className="space-y-4 animate-pulse pt-4 border-l-4 border-accent/20 pl-8">
                          <div className="h-3 w-40 bg-border-primary rounded-full"></div>
                          <div className="h-6 w-full bg-border-subtle rounded-lg"></div>
                        </div>
                      </>
                    ) : (
                      <>
                        <motion.section
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-accent mb-6 font-bold">Deep Dive</h4>
                          <p className="text-lg text-text-primary/80 leading-relaxed font-sans">
                            {service.longDescription}
                          </p>
                        </motion.section>

                        <motion.section 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="frosted-panel p-8 rounded-3xl"
                        >
                          <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-accent mb-6 font-bold">Primary Use-Cases</h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {service.useCases.map((useCase, idx) => (
                              <li key={idx} className="flex items-start gap-3 text-sm font-mono text-text-secondary">
                                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-accent shrink-0"></span>
                                {useCase}
                              </li>
                            ))}
                          </ul>
                        </motion.section>

                        <motion.section 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2 }}
                          className="frosted-panel rounded-3xl p-7"
                        >
                          <h4 className="text-xs uppercase tracking-[0.2em] font-mono text-accent mb-4 font-bold">Case Study: {service.caseStudy.title}</h4>
                          <p className="text-xl font-medium text-text-primary italic mb-1">
                            "{service.caseStudy.result}"
                          </p>
                        </motion.section>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 md:p-8 bg-white/40 dark:bg-white/[0.04] backdrop-blur-xl border-t border-white/75 dark:border-blue-200/20 flex flex-col sm:flex-row justify-between items-center gap-4">
              <span className="text-[10px] font-mono text-text-secondary/60 uppercase tracking-widest text-center sm:text-left">ReliabilityIQ Ventures – Specialized Services</span>
              <MagneticGlowButton 
                onClick={() => {
                  onClose();
                  onContact();
                }}
                className="!py-4 w-full sm:w-auto"
              >
                Learn More
              </MagneticGlowButton>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

