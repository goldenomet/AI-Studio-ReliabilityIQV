import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Cpu, Globe, Zap, Shield } from 'lucide-react';

interface FeatureItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  image: string;
  color: string;
}

const features: FeatureItem[] = [
  {
    id: 'branding',
    title: 'DESIGN',
    subtitle: 'Engineer the Experience',
    description: 'We architect intuitive, high-fidelity digital experiences. Our design methodology focuses on human-centric engineering to drive conversion and global usability.',
    icon: <Globe className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
    color: '#0D838E'
  },
  {
    id: 'development',
    title: 'DEVELOPMENT',
    subtitle: 'Engineered for Performance',
    description: 'High-performance web applications built with cutting-edge technology. We prioritize extreme scalability, speed, and clean code architecture.',
    icon: <Cpu className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
    color: '#084C55'
  },
  {
    id: 'automation',
    title: 'AI AUTOMATION',
    subtitle: 'Scale with Intelligence',
    description: 'Bespoke AI-driven workflows and autonomous agents designed to eliminate operational friction and engineer extreme efficiency at every level of your stack.',
    icon: <Zap className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
    color: '#0D838E'
  },
  {
    id: 'documentation',
    title: 'DOCUMENTATION',
    subtitle: 'Knowledge as Infrastructure',
    description: 'We engineer living documentation systems that serve as the single source of truth for your entire stack, ensuring long-term maintainability and rapid onboarding.',
    icon: <Shield className="w-6 h-6" />,
    image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=2000&auto=format&fit=crop',
    color: '#084C55'
  }
];

export const FeatureFlipper = ({ onNavigate }: { onNavigate: (page: string) => void }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-brand-bg px-6 min-h-[600px] flex items-center">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left: Interactive List */}
        <div className="space-y-4">
          <div className="font-mono text-xs uppercase tracking-widest text-brand-accent mb-8 opacity-60">Engineered Services</div>
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="relative group cursor-pointer py-6 border-b border-brand-dark/10"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onNavigate(`service-${feature.id}`)}
              initial={false}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="font-mono text-sm opacity-40 group-hover:opacity-100 transition-opacity">0{index + 1}</span>
                  <h3 className="text-4xl md:text-6xl font-bold tracking-tighter group-hover:text-brand-accent transition-colors duration-500">
                    {feature.title}
                  </h3>
                </div>
                <motion.div
                  animate={{ x: hoveredIndex === index ? 0 : -20, opacity: hoveredIndex === index ? 1 : 0 }}
                  className="bg-brand-accent p-3 rounded-full text-white"
                >
                  <ArrowRight size={20} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Visual Flip/Display */}
        <div className="relative h-[500px] hidden lg:block rounded-[48px] overflow-hidden shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={hoveredIndex ?? 'default'}
              initial={{ opacity: 0, scale: 1.1, rotateY: 10 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotateY: -10 }}
              transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="absolute inset-0"
            >
              <div className="absolute inset-0 bg-brand-dark/20 z-10" />
              <img
                src={hoveredIndex !== null ? features[hoveredIndex].image : "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop"}
                alt="Feature"
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              
              <div className="absolute inset-x-0 bottom-0 p-12 z-20 bg-gradient-to-t from-brand-dark/80 to-transparent text-white">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <h4 className="font-mono text-sm uppercase tracking-widest text-brand-accent mb-2">
                    {hoveredIndex !== null ? features[hoveredIndex].subtitle : "Select a service"}
                  </h4>
                  <p className="text-lg font-mono opacity-80 leading-relaxed max-w-md">
                    {hoveredIndex !== null ? features[hoveredIndex].description : "Hover over a service to explore our engineering methodologies."}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
