import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2, Mail, RefreshCcw, ArrowUpRight, X, MessageSquare, User } from 'lucide-react';
import { useWidgetVisibility } from '../hooks/useWidgetVisibility';
import websiteLogo from '../assets/images/logo.png';
import chatIcon3D from '../assets/images/chat_icon_3d_1787579839696.jpg';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const { isVisible } = useWidgetVisibility(4000);
  
  const initialMessage = "Hello! I'm ReliabilityIQ AI, your AI assistant at ReliabilityIQ Ventures.\n\nHow may I assist you today?";
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: initialMessage }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [leadForm, setLeadForm] = useState({ name: '', email: '', service: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    // Auto-hide the greeting card after 8 seconds
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 8000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showLeadForm]);

  const handleSend = async (e?: React.FormEvent | string) => {
    if (typeof e !== 'string' && e) e.preventDefault();
    const text = typeof e === 'string' ? e : input;
    if (!text.trim()) return;

    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    setTimeout(() => {
      let aiResponse = "I'm processing your request. One moment please.";
      
      const lowerInput = text.toLowerCase();
      if (lowerInput.includes('operations')) {
        aiResponse = "Web Operations is one of our core competencies. We handle hosting, monitoring, and scaling. Would you like to schedule a technical consultation to discuss your infrastructure?";
        setTimeout(() => setShowLeadForm(true), 1500);
      } else if (lowerInput.includes('ai') || lowerInput.includes('automation')) {
        aiResponse = "Our AI Automations can reduce manual workloads by up to 40%. We implement RAG systems, internal agents, and automated data pipelines. Shall we look into a custom solution for your team?";
      } else if (lowerInput.includes('gis') || lowerInput.includes('mapping')) {
        aiResponse = "We build advanced GIS solutions, from spatial data analysis to interactive map dashboards using modern tech stacks. What specific geographic data are you working with?";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      setIsLoading(false);
    }, 1500);
  };

  const submitLead = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setShowLeadForm(false);
        setSubmitted(false);
        setLeadForm({ name: '', email: '', service: '', message: '' });
        setMessages(prev => [...prev, { role: 'assistant', content: "Thank you. Our team has received your information and will be in touch shortly."}]);
      }, 2500);
    }, 1500);
  };

  const resetChat = () => {
    setMessages([{ role: 'assistant', content: initialMessage }]);
    setShowLeadForm(false);
    setSubmitted(false);
  };

  return (
    <>
      <AnimatePresence>
        {/* Floating Greeting Card */}
        {!isOpen && showGreeting && (
          <motion.div
            key="greeting-card"
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 w-80 bg-bg-card/95 backdrop-blur-2xl border border-white/15 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] z-[60] overflow-hidden cursor-pointer hover:border-accent/40 transition-colors"
            onClick={() => { setIsOpen(true); setShowGreeting(false); }}
          >
            <div className="p-5 relative">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowGreeting(false); }}
                className="absolute top-4 right-4 text-text-secondary hover:text-white transition-colors p-1 rounded-md hover:bg-white/5"
                aria-label="Dismiss greeting"
              >
                <X size={16} />
              </button>
              
              <div className="flex items-center gap-3.5 mb-3.5">
                <div className="w-11 h-11 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center p-2.5 shrink-0 shadow-inner">
                  <img src={websiteLogo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-semibold text-[14px] text-white leading-snug">ReliabilityIQ AI</h4>
                  <p className="text-[11px] text-accent font-medium">Verified Assistant</p>
                </div>
              </div>
              <p className="text-[13px] text-text-primary/90 leading-relaxed">
                Hello! I'm your AI assistant at ReliabilityIQ Ventures. How may I assist you today?
              </p>
            </div>
          </motion.div>
        )}

        {/* Floating Launcher Button */}
        {!isOpen && isVisible && (
          <motion.button
            key="launcher-btn"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-16 h-16 bg-accent rounded-full flex items-center justify-center z-50 overflow-hidden shadow-[0_8px_32px_rgba(var(--color-accent),0.45)] border-2 border-white/20 hover:scale-110 active:scale-95 transition-transform cursor-pointer outline-none p-3.5"
            aria-label="Open chat assistant"
          >
            <img src={websiteLogo} alt="Chat" className="w-full h-full object-contain filter brightness-0 invert" />
            <span className="absolute top-1 right-1 w-3 h-3 bg-green-400 border-2 border-bg-primary rounded-full animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.9)]" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ opacity: 0, y: 36, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 360, damping: 28, mass: 0.8 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[420px] h-[100dvh] sm:h-[650px] sm:max-h-[85vh] bg-bg-card/95 backdrop-blur-2xl border border-white/15 sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col z-[70] font-sans"
          >
            {/* Header */}
            <div className="bg-accent/90 backdrop-blur-md border-b border-white/10 px-5 py-4 text-white flex justify-between items-center shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-full shrink-0 bg-white/10 border border-white/20 overflow-hidden flex items-center justify-center p-2 shadow-inner">
                  <img src={websiteLogo} alt="AI" className="w-full h-full object-contain filter brightness-0 invert" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-[14px] tracking-tight leading-none text-white">ReliabilityIQ AI</span>
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_8px_rgba(74,222,128,0.9)]"></span>
                  </div>
                  <span className="text-[11px] font-medium leading-none mt-1.5 text-white/80">ReliabilityIQ Ventures Assistant</span>
                </div>
              </div>
              <div className="flex items-center gap-2 ml-2">
                <button 
                  onClick={resetChat} 
                  className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors" 
                  title="Reset Chat"
                  aria-label="Reset chat"
                >
                  <RefreshCcw size={16} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close chat"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-transparent scroll-smooth">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`flex gap-3.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center shadow-sm ${msg.role === 'user' ? 'bg-bg-primary text-text-primary border border-white/10' : 'bg-accent/20 border border-accent/30 p-1.5'}`}>
                    {msg.role === 'user' ? <User size={15} /> : <img src={websiteLogo} alt="AI" className="w-full h-full object-contain" />}
                  </div>
                  <div className={`p-4 max-w-[82%] text-[13.5px] leading-relaxed relative rounded-2xl ${msg.role === 'user' ? 'bg-bg-primary text-text-primary rounded-tr-sm border border-white/10 shadow-lg backdrop-blur-sm' : 'bg-accent/10 text-text-primary rounded-tl-sm border border-accent/20 shadow-lg backdrop-blur-sm'}`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                    <div className="text-[9px] text-text-secondary mt-2.5 uppercase tracking-wider font-mono opacity-60">Just now</div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3.5 flex-row"
                >
                  <div className="w-8 h-8 rounded-full shrink-0 bg-accent/20 border border-accent/30 p-1.5 flex items-center justify-center shadow-sm">
                    <img src={websiteLogo} alt="AI" className="w-full h-full object-contain" />
                  </div>
                  <div className="px-4 py-3 bg-accent/10 text-text-secondary rounded-2xl rounded-tl-sm border border-accent/20 flex items-center gap-2 shadow-lg backdrop-blur-sm">
                    <Loader2 size={16} className="animate-spin text-accent" />
                    <span className="text-[12px] font-medium tracking-wide">Thinking...</span>
                  </div>
                </motion.div>
              )}

              {/* Lead Form Inline */}
              <AnimatePresence>
                {showLeadForm && (
                  <motion.div
                    key="lead-form"
                    initial={{ opacity: 0, y: 15, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-bg-primary/90 backdrop-blur-md border border-white/10 p-5 rounded-2xl ml-11 shadow-xl"
                  >
                    {submitted ? (
                      <div className="text-center py-6 flex flex-col items-center gap-3">
                        <div className="w-12 h-12 bg-accent/20 border border-accent/30 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(var(--color-accent),0.3)]">
                           <Mail size={24} className="text-accent" />
                        </div>
                        <span className="text-sm font-semibold text-white tracking-wide">Message sent successfully!</span>
                      </div>
                    ) : (
                      <form onSubmit={submitLead} className="space-y-3.5">
                        <h4 className="text-[13px] font-semibold text-white mb-2 tracking-wide">Contact Our Team</h4>
                        <input
                          type="text"
                          placeholder="Your Name *"
                          required
                          value={leadForm.name}
                          onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                          className="w-full bg-bg-card/60 border border-white/10 px-3.5 py-2.5 text-[13px] text-white focus:outline-none focus:border-accent transition-colors rounded-xl placeholder:text-text-secondary"
                        />
                        <input
                          type="email"
                          placeholder="Your Email *"
                          required
                          value={leadForm.email}
                          onChange={e => setLeadForm({...leadForm, email: e.target.value})}
                          className="w-full bg-bg-card/60 border border-white/10 px-3.5 py-2.5 text-[13px] text-white focus:outline-none focus:border-accent transition-colors rounded-xl placeholder:text-text-secondary"
                        />
                        <select
                          value={leadForm.service}
                          onChange={e => setLeadForm({...leadForm, service: e.target.value})}
                          className="w-full bg-bg-card/60 border border-white/10 px-3.5 py-2.5 text-[13px] text-white focus:outline-none focus:border-accent transition-colors rounded-xl"
                        >
                          <option value="">Select Service (Optional)</option>
                          <option value="Web Operations">Web Operations</option>
                          <option value="AI Automations">AI Automations</option>
                          <option value="GIS Mapping">GIS Mapping</option>
                          <option value="Technical Reports">Technical Reports</option>
                        </select>
                        <textarea
                          placeholder="How can we help you?"
                          value={leadForm.message}
                          onChange={e => setLeadForm({...leadForm, message: e.target.value})}
                          className="w-full bg-bg-card/60 border border-white/10 px-3.5 py-2 text-[13px] text-white focus:outline-none focus:border-accent transition-colors resize-none h-20 rounded-xl placeholder:text-text-secondary"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-accent/90 hover:bg-accent text-white py-3 text-[13px] font-semibold transition-colors flex items-center justify-center gap-2 rounded-xl shadow-[0_0_20px_rgba(var(--color-accent),0.3)] mt-2"
                        >
                          {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : 'Send Message'}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions & Input Area */}
            <div className="bg-bg-primary/90 backdrop-blur-md shrink-0 border-t border-white/10">
              {/* Suggestions */}
              <div className="flex gap-2 px-5 py-3 overflow-x-auto no-scrollbar border-b border-white/5">
                <button onClick={() => handleSend("Tell me about Web Operations")} className="whitespace-nowrap px-3.5 py-1.5 bg-bg-card/60 border border-white/10 rounded-full text-[11.5px] font-medium text-text-primary hover:bg-white/10 hover:text-white transition-colors">Web Operations</button>
                <button onClick={() => handleSend("How can AI Automations help?")} className="whitespace-nowrap px-3.5 py-1.5 bg-bg-card/60 border border-white/10 rounded-full text-[11.5px] font-medium text-text-primary hover:bg-white/10 hover:text-white transition-colors">AI Automations</button>
                <button onClick={() => handleSend("What is GIS Mapping?")} className="whitespace-nowrap px-3.5 py-1.5 bg-bg-card/60 border border-white/10 rounded-full text-[11.5px] font-medium text-text-primary hover:bg-white/10 hover:text-white transition-colors">GIS Mapping</button>
              </div>
              
              {/* Footer Links */}
              <div className="flex justify-between items-center px-5 py-2.5 border-b border-white/5 bg-black/20">
                <a href="#" className="text-[11px] font-medium text-accent hover:text-white flex items-center gap-1 transition-colors">
                  Chat on WhatsApp <ArrowUpRight size={12} />
                </a>
                <button onClick={() => { setShowLeadForm(true); setMessages(prev => [...prev, { role: 'assistant', content: 'Let\'s schedule a consultation. Please provide your details.'}]); }} className="text-[11px] font-medium text-text-secondary hover:text-white transition-colors">
                  Book Consultation
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-3.5 px-4 flex gap-2.5">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 bg-bg-card/80 backdrop-blur-sm border border-white/10 px-4 py-2.5 text-[14px] text-white focus:outline-none focus:border-accent transition-colors rounded-full placeholder:text-text-secondary"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-11 h-11 bg-accent/90 text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent transition-colors rounded-full shadow-[0_0_15px_rgba(var(--color-accent),0.3)]"
                  aria-label="Send message"
                >
                  <Send size={18} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
