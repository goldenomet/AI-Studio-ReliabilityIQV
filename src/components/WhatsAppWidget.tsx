import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Instagram, Twitter, Youtube, Phone } from 'lucide-react';
import whatsappIcon3D from '../assets/images/whatsapp_icon_3d_1787579859009.jpg';
import { useWidgetVisibility } from '../hooks/useWidgetVisibility';

export const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isVisible } = useWidgetVisibility(5000);

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
      name: 'YouTube', 
      icon: <Youtube size={22} />, 
      href: 'https://youtube.com/shorts/6W0wKw3zz6w?si=Qfu9R35C7ozK7vQh',
      color: 'bg-[#FF0000] text-white',
      label: 'YouTube Channel'
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
    <AnimatePresence>
      {(isOpen || isVisible) && (
        <motion.div 
          key="wa-widget-container"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed left-6 bottom-6 md:left-10 md:bottom-10 z-[100] flex flex-col items-start gap-4"
        >
          <AnimatePresence>
            {isOpen && (
              <motion.div
                key="wa-menu"
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
            className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-500 relative group outline-hidden ring-offset-2 focus:ring-2 focus:ring-accent rounded-full ${
              isOpen ? 'bg-bg-card/95 backdrop-blur-xl border border-white/10 text-text-primary shadow-lg' : 'bg-green-500 hover:bg-green-600 shadow-[0_8px_32px_rgba(34,197,94,0.45)] border-2 border-white/20 hover:scale-110'
            }`}
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
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
                  key="whatsapp"
                  initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <MessageCircle size={28} className="text-white fill-white/20 drop-shadow-md" />
                </motion.div>
              )}
            </AnimatePresence>
            
            {!isOpen && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 border-2 border-bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            )}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
