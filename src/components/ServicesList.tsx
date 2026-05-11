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
    <section className="py-24 bg-bg-primary text-text-primary px-6 transition-colors duration-500">
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
      className="group flex flex-col sm:flex-row sm:items-center justify-between border-b border-border-primary py-8 md:py-12 cursor-pointer relative"
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
           <div className="w-32 h-20 rounded-xl overflow-hidden relative shadow-lg">
              <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
           </div>
        </motion.div>
        
        <motion.h2 
          className="text-4xl md:text-6xl lg:text-[100px] font-bold tracking-tighter leading-none text-text-primary group-hover:text-accent transition-colors duration-300"
          variants={{
             initial: { x: 0 },
             hover: { x: 10 }
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {title}
        </motion.h2>
      </div>

      <div className="flex items-center space-x-12 mt-6 sm:mt-0 opacity-40 group-hover:opacity-100 transition-opacity duration-300 text-text-secondary">
        <p className="font-mono text-sm tracking-widest">{index}</p>
        <p className="font-mono text-sm tracking-widest uppercase">{tag}</p>
      </div>
    </motion.div>
  );
};
