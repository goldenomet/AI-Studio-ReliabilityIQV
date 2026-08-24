import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2, Mail, RefreshCcw, ArrowUpRight, X, User, Sparkles, MessageCircle, Bot } from 'lucide-react';
import { useWidgetVisibility } from '../hooks/useWidgetVisibility';
import websiteLogo from '../assets/images/logo.png';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const { isVisible } = useWidgetVisibility(4000);
  
  const initialMessage = "Hello! I'm ReliabilityIQ AI, your intelligent assistant. How can I help you with our Web Operations, AI Automations, GIS mapping, or custom IT solutions today?";
  
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
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, showLeadForm, isOpen]);

  const handleSend = async (e?: React.FormEvent | string) => {
    if (typeof e !== 'string' && e) e.preventDefault();
    const text = typeof e === 'string' ? e : input;
    if (!text.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const reply = data.text || "Thank you for reaching out. A specialist from ReliabilityIQ Ventures will assist you shortly.";
      
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);

      // If user asks about quote, contact, or consultation, prompt lead form
      const lower = text.toLowerCase();
      if (lower.includes('quote') || lower.includes('hire') || lower.includes('consult') || lower.includes('price') || lower.includes('contact')) {
        setTimeout(() => setShowLeadForm(true), 1200);
      }
    } catch (err) {
      console.warn('Chat API error, falling back to local assistant:', err);
      // Graceful offline fallback
      let fallbackText = "Thank you for your message. ReliabilityIQ Ventures provides high-availability Web Operations, AI Automations, and GIS Intelligence.";
      const lower = text.toLowerCase();
      if (lower.includes('operations') || lower.includes('web')) {
        fallbackText = "Web Operations is one of our flagship competencies. We engineer 99.99% uptime, distributed edge networks, automated failovers, and cloud security.";
      } else if (lower.includes('ai') || lower.includes('automation')) {
        fallbackText = "Our AI Automations streamline manual enterprise workflows by up to 40% using custom LLM agents and data extraction pipelines.";
      } else if (lower.includes('gis') || lower.includes('map')) {
        fallbackText = "We build custom GIS systems, satellite spatial overlays, and interactive geospatial mapping tools for urban planning and enterprise logistics.";
      }
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackText }]);
    } finally {
      setIsLoading(false);
    }
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadForm),
      });

      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setShowLeadForm(false);
        setSubmitted(false);
        setLeadForm({ name: '', email: '', service: '', message: '' });
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Thank you, ${leadForm.name || 'there'}! Your request has been logged with our team. We will review your details and reach out within 24 hours.`
        }]);
      }, 2000);
    } catch (err) {
      console.warn('Lead submission error:', err);
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        setShowLeadForm(false);
        setSubmitted(false);
      }, 2000);
    }
  };

  const resetChat = () => {
    setMessages([{ role: 'assistant', content: initialMessage }]);
    setShowLeadForm(false);
    setSubmitted(false);
  };

  return (
    <>
      <AnimatePresence>
        {/* Floating Greeting Preview Card */}
        {!isOpen && showGreeting && (
          <motion.div
            key="greeting-card"
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 w-80 bg-bg-card/95 backdrop-blur-2xl border border-border-primary rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.4)] z-[60] overflow-hidden cursor-pointer hover:border-accent/40 transition-colors"
            onClick={() => { setIsOpen(true); setShowGreeting(false); }}
          >
            <div className="p-4 relative">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowGreeting(false); }}
                className="absolute top-3 right-3 text-text-secondary hover:text-text-primary transition-colors p-1 rounded-md hover:bg-white/10"
                aria-label="Dismiss greeting"
              >
                <X size={15} />
              </button>
              
              <div className="flex items-center gap-3 mb-2.5">
                <div className="w-10 h-10 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center p-2 shrink-0">
                  <img src={websiteLogo} alt="Logo" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-text-primary leading-snug flex items-center gap-1.5">
                    ReliabilityIQ AI
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  </h4>
                  <p className="text-[11px] text-accent font-medium">Enterprise Assistant</p>
                </div>
              </div>
              <p className="text-xs text-text-secondary leading-relaxed">
                Need help scaling your infrastructure or exploring our services? Ask me anything.
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
            className="fixed bottom-6 right-6 w-14 h-14 bg-accent hover:bg-accent/90 rounded-full flex items-center justify-center z-50 overflow-hidden shadow-[0_8px_30px_rgba(var(--color-accent),0.4)] border-2 border-white/20 hover:scale-110 active:scale-95 transition-transform cursor-pointer outline-none p-3"
            aria-label="Open chat assistant"
          >
            <Bot size={26} className="text-white" />
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
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[420px] h-[100dvh] sm:h-[620px] sm:max-h-[85vh] bg-bg-card/95 backdrop-blur-2xl border border-border-primary sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col z-[70] font-sans"
          >
            {/* Header */}
            <div className="bg-accent/95 backdrop-blur-md px-5 py-3.5 text-white flex justify-between items-center shrink-0 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full shrink-0 bg-white/15 border border-white/25 flex items-center justify-center p-1.5">
                  <img src={websiteLogo} alt="AI" className="w-full h-full object-contain filter brightness-0 invert" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm tracking-tight leading-none text-white">ReliabilityIQ AI</span>
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  </div>
                  <span className="text-[11px] font-medium leading-none mt-1 text-white/80">Always Active</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={resetChat} 
                  className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors" 
                  title="Reset Chat"
                  aria-label="Reset chat"
                >
                  <RefreshCcw size={15} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-white/80 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  aria-label="Close chat"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-transparent scroll-smooth">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div className={`w-7 h-7 rounded-full shrink-0 flex items-center justify-center text-xs ${
                    msg.role === 'user' 
                      ? 'bg-accent text-white' 
                      : 'bg-bg-card border border-border-primary text-accent p-1'
                  }`}>
                    {msg.role === 'user' ? <User size={14} /> : <img src={websiteLogo} alt="AI" className="w-full h-full object-contain" />}
                  </div>
                  <div className={`p-3.5 max-w-[82%] text-xs md:text-[13px] leading-relaxed rounded-2xl shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-accent text-white rounded-tr-none' 
                      : 'bg-bg-primary text-text-primary rounded-tl-none border border-border-primary'
                  }`}>
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 flex-row"
                >
                  <div className="w-7 h-7 rounded-full shrink-0 bg-bg-card border border-border-primary p-1 flex items-center justify-center">
                    <img src={websiteLogo} alt="AI" className="w-full h-full object-contain" />
                  </div>
                  <div className="px-3.5 py-2.5 bg-bg-primary text-text-secondary rounded-2xl rounded-tl-none border border-border-primary flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-accent" />
                    <span className="text-xs font-medium">Formulating response...</span>
                  </div>
                </motion.div>
              )}

              {/* Consultation Lead Form */}
              <AnimatePresence>
                {showLeadForm && (
                  <motion.div
                    key="lead-form"
                    initial={{ opacity: 0, y: 10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: 'auto' }}
                    exit={{ opacity: 0, y: 10, height: 0 }}
                    className="bg-bg-primary border border-border-primary p-4 rounded-2xl shadow-lg"
                  >
                    {submitted ? (
                      <div className="text-center py-4 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 bg-accent/20 border border-accent/30 rounded-full flex items-center justify-center">
                           <Mail size={20} className="text-accent" />
                        </div>
                        <span className="text-xs font-semibold text-text-primary">Request sent successfully!</span>
                      </div>
                    ) : (
                      <form onSubmit={submitLead} className="space-y-2.5">
                        <h4 className="text-xs font-semibold text-text-primary tracking-wide">Request a Consultation</h4>
                        <input
                          type="text"
                          placeholder="Your Name *"
                          required
                          value={leadForm.name}
                          onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                          className="w-full bg-bg-card border border-border-primary px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-accent rounded-lg"
                        />
                        <input
                          type="email"
                          placeholder="Your Email *"
                          required
                          value={leadForm.email}
                          onChange={e => setLeadForm({...leadForm, email: e.target.value})}
                          className="w-full bg-bg-card border border-border-primary px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-accent rounded-lg"
                        />
                        <select
                          value={leadForm.service}
                          onChange={e => setLeadForm({...leadForm, service: e.target.value})}
                          className="w-full bg-bg-card border border-border-primary px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-accent rounded-lg"
                        >
                          <option value="">Select Service Area</option>
                          <option value="Web Operations">Web Operations & Infrastructure</option>
                          <option value="AI Automations">AI Automations & Agents</option>
                          <option value="GIS Mapping">GIS & Geospatial Analysis</option>
                          <option value="Technical Documentation">Technical Reports & Architecture</option>
                        </select>
                        <textarea
                          placeholder="Project summary or requirements..."
                          value={leadForm.message}
                          onChange={e => setLeadForm({...leadForm, message: e.target.value})}
                          className="w-full bg-bg-card border border-border-primary px-3 py-2 text-xs text-text-primary focus:outline-none focus:border-accent resize-none h-16 rounded-lg"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-accent hover:bg-accent/90 text-white py-2 text-xs font-semibold rounded-lg shadow transition-colors flex items-center justify-center gap-2"
                        >
                          {isSubmitting ? <Loader2 size={14} className="animate-spin" /> : 'Submit Inquiry'}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions & Input Form */}
            <div className="bg-bg-primary/95 backdrop-blur-md shrink-0 border-t border-border-primary">
              {/* Preset suggestion chips */}
              <div className="flex gap-2 px-4 py-2 overflow-x-auto no-scrollbar border-b border-border-primary/50">
                <button 
                  onClick={() => handleSend("What Web Operations do you handle?")} 
                  className="whitespace-nowrap px-3 py-1 bg-bg-card border border-border-primary rounded-full text-[11px] font-medium text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors"
                >
                  Web Operations
                </button>
                <button 
                  onClick={() => handleSend("Tell me about your AI Automations.")} 
                  className="whitespace-nowrap px-3 py-1 bg-bg-card border border-border-primary rounded-full text-[11px] font-medium text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors"
                >
                  AI Automations
                </button>
                <button 
                  onClick={() => handleSend("How does your GIS mapping work?")} 
                  className="whitespace-nowrap px-3 py-1 bg-bg-card border border-border-primary rounded-full text-[11px] font-medium text-text-secondary hover:text-text-primary hover:border-accent/40 transition-colors"
                >
                  GIS Intelligence
                </button>
              </div>

              {/* Input Form */}
              <form onSubmit={handleSend} className="p-3 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask anything..."
                  className="flex-1 bg-bg-card border border-border-primary px-3.5 py-2 text-xs sm:text-sm text-text-primary focus:outline-none focus:border-accent rounded-full placeholder:text-text-secondary"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-9 h-9 bg-accent text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors rounded-full shadow-md"
                  aria-label="Send message"
                >
                  <Send size={15} className="ml-0.5" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
