import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Instagram, Twitter, Phone } from 'lucide-react';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const socialLinks = [
    { 
      name: 'WhatsApp', 
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.394 0 12.029c0 2.119.554 4.188 1.604 6.046L0 24l6.132-1.608a11.774 11.774 0 005.918 1.604h.005c6.635 0 12.031-5.395 12.034-12.03a11.77 11.77 0 00-3.489-8.482z"/>
        </svg>
      ), 
      href: 'https://wa.me/2349075934287',
      color: 'bg-[#25D366]',
      label: 'Message on WhatsApp'
    },
    { 
      name: 'Instagram', 
      icon: <Instagram size={22} />, 
      href: '#',
      color: 'bg-linear-to-tr from-[#f09433] via-[#e6683c] to-[#bc1888]',
      label: 'Follow Us'
    },
    { 
      name: 'Twitter', 
      icon: <Twitter size={22} />, 
      href: '#',
      color: 'bg-black dark:bg-white dark:text-black',
      label: 'Updates'
    }
  ];

  return (
    <div className="fixed left-6 bottom-6 md:left-10 md:bottom-10 z-[100] flex flex-col items-start gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="flex flex-col gap-4 mb-2"
          >
            {socialLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -25 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 500,
                  damping: 25
                }}
                className="group flex items-center gap-3 no-underline outline-hidden"
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 ${link.color} text-white rounded-2xl flex items-center justify-center shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300`}>
                  {link.icon}
                </div>
                <div className="bg-bg-card/90 backdrop-blur-md border border-border-primary px-4 py-2 rounded-xl text-sm font-semibold text-text-primary opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 shadow-xl pointer-events-none whitespace-nowrap ring-1 ring-white/10">
                  {link.label}
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle social menu"
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 relative group overflow-hidden outline-hidden ring-offset-2 focus:ring-2 focus:ring-accent ${
          isOpen ? 'bg-bg-card border border-border-primary text-text-primary' : 'bg-accent text-white'
        }`}
      >
        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
               <MessageCircle size={32} strokeWidth={1.5} className="text-white" />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && (
          <span className="absolute top-3 right-3 w-3 h-3 bg-white rounded-full animate-ping pointer-events-none" />
        )}
      </button>
    </div>
  );
};
