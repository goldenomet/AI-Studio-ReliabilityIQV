import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const services = [
  {
    index: '/01',
    title: 'DESIGN',
    tag: 'EXPERIENCE',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop',
  },
  {
    index: '/02',
    title: 'DEVELOPMENT',
    tag: 'BUILD',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
  },
  {
    index: '/03',
    title: 'UX DESIGN',
    tag: 'EXPERIENCE',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000&auto=format&fit=crop',
  },
  {
    index: '/04',
    title: 'MARKETING',
    tag: 'GROW',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop',
  }
];

export const ServicesList = () => {
  return (
    <section className="py-24 bg-brand-bg text-brand-dark px-6">
      <div className="max-w-7xl mx-auto flex flex-col">
        {services.map((service, i) => (
          <ServiceItem key={i} {...service} />
        ))}
      </div>
    </section>
  );
};

const ServiceItem = ({ index, title, tag, image }: { index: string, title: string, tag: string, image: string, key?: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="group flex flex-col sm:flex-row sm:items-center justify-between border-b border-brand-dark/10 py-8 md:py-12 cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial="initial"
      whileHover="hover"
      animate={isHovered ? "hover" : "initial"}
    >
      <div className="flex items-center">
        {/* The Image reveals on hover using AnimatePresence or variants */}
        <motion.div
           variants={{
             initial: { width: 0, opacity: 0, paddingRight: 0 },
             hover: { width: 160, opacity: 1, paddingRight: 32 }
           }}
           transition={{ type: "spring", stiffness: 300, damping: 30, mass: 1 }}
           className="hidden md:block overflow-hidden"
        >
           <div className="w-32 h-20 rounded-md overflow-hidden relative">
              <img src={image} alt={title} className="w-full h-full object-cover" />
           </div>
        </motion.div>
        
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-[100px] font-bold tracking-tighter leading-none"
          variants={{
             initial: { x: 0 },
             hover: { x: 10 }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {title}
        </motion.h2>
      </div>

      <div className="flex items-center space-x-12 mt-6 sm:mt-0 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <p className="font-mono text-sm tracking-widest">{index}</p>
        <p className="font-mono text-sm tracking-widest uppercase">{tag}</p>
      </div>
    </motion.div>
  );
};
