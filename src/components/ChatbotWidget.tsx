import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { Send, RotateCcw, ChevronRight, MessageSquare, ExternalLink, ArrowUpRight, CheckCircle2, Loader2, X, User } from 'lucide-react';
import { useWidgetVisibility } from '../hooks/useWidgetVisibility';
import websiteLogo from '../assets/images/logo.png';

import { getGmailAccessToken } from '../lib/gmail';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { isVisible } = useWidgetVisibility(4000);

  const initialAssistantMessage: Message = {
    id: 'msg-init',
    role: 'assistant',
    content: "Hello! I'm ReliabilityIQ AI, your AI Operations & Infrastructure Advisor at ReliabilityIQ Ventures.\n\nHow may I assist you with your high-availability cloud architecture, AI workflows, GIS spatial mapping, or technical infrastructure today?",
    timestamp: 'Just now'
  };

  const [messages, setMessages] = useState<Message[]>([initialAssistantMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [leadForm, setLeadForm] = useState({ name: '', email: '', service: '', message: '' });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  // Auto-collapse initial greeting card after ~7 seconds if user does not interact
  useEffect(() => {
    if (hasInteracted || isOpen) return;

    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, [hasInteracted, isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen, showLeadModal]);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowGreeting(false);
    setHasInteracted(true);
  };

  const handleHideChat = () => {
    setIsOpen(false);
    setHasInteracted(true);
  };

  const handleResetChat = () => {
    setMessages([initialAssistantMessage]);
    setShowLeadModal(false);
    setLeadSubmitted(false);
  };

  const handleSend = async (textToSend?: string) => {
    const text = (typeof textToSend === 'string' ? textToSend : input).trim();
    if (!text || isLoading) return;

    setHasInteracted(true);
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updated = [...messages, userMsg];
    setMessages(updated);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updated }),
      });

      if (!res.ok) throw new Error(`HTTP error ${res.status}`);

      const data = await res.json();
      const reply = data.text || "Thank you for reaching out. A specialist from ReliabilityIQ Ventures will review your requirements.";
      
      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: reply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.warn('Chat API offline fallback:', err);
      let replyText = "ReliabilityIQ Ventures delivers enterprise-grade Web Operations, AI Automations, and GIS Intelligence.";
      const lower = text.toLowerCase();
      if (lower.includes('uptime') || lower.includes('operation') || lower.includes('cloud')) {
        replyText = "We architect 99.99% high-availability digital infrastructure, automated failover pipelines, and zero-downtime edge deployments.";
      } else if (lower.includes('ai') || lower.includes('agent') || lower.includes('automation')) {
        replyText = "Our custom AI agents automate routine enterprise tasks, parsing unstructured records and reducing operational overhead by up to 40%.";
      } else if (lower.includes('gis') || lower.includes('map') || lower.includes('spatial')) {
        replyText = "Our GIS suite combines satellite data, custom vector overlays, and real-time geospatial analytics for urban and industrial intelligence.";
      } else if (lower.includes('contact') || lower.includes('quote') || lower.includes('price') || lower.includes('hire')) {
        replyText = "You can request a direct consultation using the link below, or message us on WhatsApp for an immediate response.";
        setTimeout(() => setShowLeadModal(true), 1000);
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: replyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmittingLead(true);

    try {
      const token = getGmailAccessToken();
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          ...leadForm,
          gmailToken: token || undefined
        }),
      });

      setIsSubmittingLead(false);
      setLeadSubmitted(true);
      setTimeout(() => {
        setShowLeadModal(false);
        setLeadSubmitted(false);
        setLeadForm({ name: '', email: '', service: '', message: '' });
        setMessages(prev => [
          ...prev,
          {
            id: `lead-confirm-${Date.now()}`,
            role: 'assistant',
            content: `Thank you, ${leadForm.name || 'there'}! Your inquiry has been received. Our technical team will reach out to ${leadForm.email} within 24 hours.`,
            timestamp: 'Just now'
          }
        ]);
      }, 1800);
    } catch (err) {
      console.warn('Lead submit err:', err);
      setIsSubmittingLead(false);
      setLeadSubmitted(true);
      setTimeout(() => {
        setShowLeadModal(false);
        setLeadSubmitted(false);
      }, 1800);
    }
  };

  return (
    <>
      <AnimatePresence>
        {/* ============================================================
            1. INITIAL AUTO-GREETING INTRO CARD (Collapses after 5-8s)
            ============================================================ */}
        {!isOpen && showGreeting && (
          <motion.div
            key="initial-greeting-card"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-4 sm:right-6 w-[340px] max-w-[calc(100vw-2rem)] bg-[#f8fbff]/95 dark:bg-[#0c1d3d]/95 backdrop-blur-2xl text-text-primary border border-blue-200/80 dark:border-blue-300/25 rounded-2xl shadow-[0_18px_48px_-10px_rgba(15,37,71,0.18)] z-[60] overflow-hidden cursor-pointer group"
            onClick={handleOpenChat}
          >
            {/* Top Header Bar */}
            <div className="bg-accent px-3.5 py-2.5 flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-white p-0.5 flex items-center justify-center shrink-0 shadow-xs">
                  <img src={websiteLogo} alt="ReliabilityIQ" className="w-full h-full object-contain" />
                </div>
                <span className="font-mono text-xs font-semibold tracking-tight uppercase">
                  ReliabilityIQ AI Advisor
                </span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowGreeting(false);
                  setHasInteracted(true);
                }}
                className="text-white/80 hover:text-white p-1 rounded transition-colors cursor-pointer"
                title="Dismiss"
                aria-label="Dismiss greeting"
              >
                <X size={14} />
              </button>
            </div>

            {/* Greeting Body */}
            <div className="p-4 flex gap-3">
              <div className="w-9 h-9 rounded-full bg-white border border-blue-100 p-1 shrink-0 flex items-center justify-center self-start shadow-xs">
                <img src={websiteLogo} alt="ReliabilityIQ" className="w-full h-full object-contain" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-text-primary leading-relaxed font-sans">
                  Hello! I'm <strong className="text-accent font-semibold">ReliabilityIQ AI</strong>, your AI Operations &amp; Tech Advisor.
                </p>
                <p className="text-xs text-text-secondary mt-1.5 leading-snug">
                  How may I assist you with your digital infrastructure, AI workflows, or GIS mapping today?
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[11px] text-text-secondary/80 font-mono">Tap to chat</span>
                  <span className="text-xs font-semibold text-accent flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    Open Advisor <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ============================================================
            2. FLOATING COLLAPSED LAUNCHER (With Website Logo)
            ============================================================ */}
        {!isOpen && isVisible && (
          <motion.button
            key="collapsed-launcher-btn"
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={handleOpenChat}
            className="fixed bottom-6 right-6 w-14 h-14 bg-white/95 dark:bg-[#11264f]/95 backdrop-blur-xl border-2 border-accent/70 rounded-full flex items-center justify-center z-50 shadow-[0_12px_32px_-6px_rgba(29,108,224,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer p-2.5 group"
            aria-label="Open ReliabilityIQ AI Advisor"
          >
            <div className="w-full h-full flex items-center justify-center p-0.5">
              <img 
                src={websiteLogo} 
                alt="ReliabilityIQ" 
                className="w-full h-full object-contain group-hover:scale-105 transition-transform" 
              />
            </div>
            <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#11264f] rounded-full" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ============================================================
          3. FULL CHATBOT WINDOW (High-Opacity Serene Frosted Glass)
          ============================================================ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="full-chatbot-modal"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[420px] h-[100dvh] sm:h-[640px] sm:max-h-[88vh] bg-[#f8fbff]/96 dark:bg-[#0b1c3d]/96 border border-blue-200/80 dark:border-blue-300/25 sm:rounded-3xl shadow-[0_24px_64px_-12px_rgba(15,37,71,0.28)] backdrop-blur-3xl overflow-hidden flex flex-col z-[75] font-sans text-text-primary"
          >
            {/* ----------------- CHATBOT HEADER ----------------- */}
            <div className="bg-accent px-4 py-3 text-white flex items-center justify-between shrink-0 border-b border-white/15 select-none shadow-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white p-1 flex items-center justify-center shrink-0 shadow-xs">
                  <img src={websiteLogo} alt="ReliabilityIQ" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs font-bold tracking-tight uppercase leading-none text-white">
                      RELIABILITYIQ AI
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-300 shrink-0" />
                  </div>
                  <span className="text-[11px] font-normal text-white/90 leading-tight mt-0.5">
                    Operations &amp; Architecture Advisor
                  </span>
                </div>
              </div>

              {/* Header Right Actions */}
              <div className="flex items-center gap-1 text-white">
                <button
                  onClick={handleResetChat}
                  className="p-1.5 hover:bg-white/15 rounded-lg transition-colors cursor-pointer"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={handleHideChat}
                  className="flex items-center gap-0.5 px-2.5 py-1 hover:bg-white/15 rounded-lg text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                  aria-label="Hide chatbot"
                >
                  <span>HIDE</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>

            {/* ----------------- MESSAGES CONTAINER ----------------- */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#eef5ff]/95 dark:bg-[#08152e]/95 scroll-smooth custom-scrollbar">
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {/* Avatar Icon */}
                  {msg.role === 'assistant' ? (
                    <div className="w-7 h-7 rounded-full bg-white border border-blue-200/70 p-0.5 shrink-0 flex items-center justify-center self-start shadow-xs">
                      <img src={websiteLogo} alt="ReliabilityIQ" className="w-full h-full object-contain" />
                    </div>
                  ) : (
                    <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center shrink-0 self-start text-xs font-bold">
                      <User size={14} />
                    </div>
                  )}

                  {/* Message Bubble Box */}
                  <div className={`max-w-[85%] p-3.5 rounded-2xl border text-xs sm:text-[13px] leading-relaxed shadow-xs ${
                    msg.role === 'user'
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white/95 dark:bg-[#132954]/95 text-[#0f2547] dark:text-[#f1f6ff] border-blue-200/70 dark:border-blue-300/20'
                  }`}>
                    {msg.role === 'user' ? (
                      <div className="whitespace-pre-wrap font-sans">{msg.content}</div>
                    ) : (
                      <div className="chat-markdown font-sans text-xs sm:text-[13px] leading-relaxed text-[#0f2547] dark:text-[#f1f6ff]">
                        <Markdown
                          components={{
                            p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed text-[#0f2547] dark:text-[#f1f6ff]">{children}</p>,
                            strong: ({ children }) => <strong className="font-bold text-[#0f2547] dark:text-white">{children}</strong>,
                            em: ({ children }) => <em className="italic">{children}</em>,
                            ul: ({ children }) => <ul className="list-disc list-outside pl-4 space-y-1 my-2">{children}</ul>,
                            ol: ({ children }) => <ol className="list-decimal list-outside pl-4 space-y-1 my-2">{children}</ol>,
                            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                            a: ({ href, children }) => (
                              <a href={href} target="_blank" rel="noopener noreferrer" className="text-accent underline font-semibold hover:underline">
                                {children}
                              </a>
                            ),
                            h1: ({ children }) => <h1 className="text-sm font-bold my-1.5 text-[#0f2547] dark:text-white">{children}</h1>,
                            h2: ({ children }) => <h2 className="text-xs sm:text-sm font-bold my-1.5 text-[#0f2547] dark:text-white">{children}</h2>,
                            h3: ({ children }) => <h3 className="text-xs font-bold my-1 text-[#0f2547] dark:text-white">{children}</h3>,
                            blockquote: ({ children }) => <blockquote className="border-l-2 border-accent pl-2 italic my-2 text-text-secondary">{children}</blockquote>,
                            code: ({ children }) => <code className="bg-blue-50 dark:bg-black/30 px-1.5 py-0.5 rounded font-mono text-[11px] text-accent">{children}</code>
                          }}
                        >
                          {msg.content}
                        </Markdown>
                      </div>
                    )}
                    {msg.timestamp && (
                      <div className={`text-[10px] mt-2 font-mono ${
                        msg.role === 'user' ? 'text-white/80 text-right' : 'text-text-secondary/75'
                      }`}>
                        {msg.timestamp}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Loading Indicator */}
              {isLoading && (
                <div className="flex gap-2.5 flex-row">
                  <div className="w-7 h-7 rounded-full bg-white border border-blue-200/70 p-0.5 shrink-0 flex items-center justify-center self-start shadow-xs">
                    <img src={websiteLogo} alt="ReliabilityIQ" className="w-full h-full object-contain" />
                  </div>
                  <div className="px-3.5 py-2.5 bg-white/95 dark:bg-[#132954]/95 border border-blue-200/70 dark:border-blue-300/20 text-text-primary rounded-2xl flex items-center gap-2 text-xs shadow-xs">
                    <Loader2 size={13} className="animate-spin text-accent" />
                    <span>Analyzing infrastructure requirements...</span>
                  </div>
                </div>
              )}

              {/* Consultation Lead Form Modal Overlay */}
              <AnimatePresence>
                {showLeadModal && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="p-4 bg-white/98 dark:bg-[#11254d]/98 border border-accent/40 rounded-2xl shadow-xl"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold text-text-primary uppercase tracking-wide">
                        Book Technical Consultation
                      </h4>
                      <button
                        onClick={() => setShowLeadModal(false)}
                        className="text-text-secondary hover:text-text-primary p-1 cursor-pointer"
                      >
                        <X size={14} />
                      </button>
                    </div>

                    {leadSubmitted ? (
                      <div className="py-4 text-center flex flex-col items-center gap-2">
                        <CheckCircle2 size={24} className="text-emerald-500" />
                        <p className="text-xs font-semibold text-text-primary">Inquiry Submitted Successfully</p>
                      </div>
                    ) : (
                      <form onSubmit={handleLeadSubmit} className="space-y-2.5 text-xs">
                        <input
                          type="text"
                          required
                          placeholder="Your Name *"
                          value={leadForm.name}
                          onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                          className="w-full bg-[#eef5ff] dark:bg-[#08152e] border border-blue-200/80 dark:border-blue-300/20 px-3 py-2 rounded-lg focus:outline-none focus:border-accent text-text-primary placeholder:text-text-secondary/60"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Business Email *"
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          className="w-full bg-[#eef5ff] dark:bg-[#08152e] border border-blue-200/80 dark:border-blue-300/20 px-3 py-2 rounded-lg focus:outline-none focus:border-accent text-text-primary placeholder:text-text-secondary/60"
                        />
                        <select
                          value={leadForm.service}
                          onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                          className="w-full bg-[#eef5ff] dark:bg-[#08152e] border border-blue-200/80 dark:border-blue-300/20 px-3 py-2 rounded-lg focus:outline-none focus:border-accent text-text-primary"
                        >
                          <option className="bg-white dark:bg-[#0c1f40]" value="">Select Domain Area</option>
                          <option className="bg-white dark:bg-[#0c1f40]" value="Web Operations">Web Operations &amp; 99.99% Uptime</option>
                          <option className="bg-white dark:bg-[#0c1f40]" value="AI Automations">AI Automations &amp; LLM Agents</option>
                          <option className="bg-white dark:bg-[#0c1f40]" value="GIS Intelligence">GIS &amp; Geospatial Analysis</option>
                          <option className="bg-white dark:bg-[#0c1f40]" value="Custom Infrastructure">Custom Enterprise IT Infrastructure</option>
                        </select>
                        <textarea
                          placeholder="Briefly describe your systems or goals..."
                          value={leadForm.message}
                          onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                          className="w-full bg-[#eef5ff] dark:bg-[#08152e] border border-blue-200/80 dark:border-blue-300/20 px-3 py-2 rounded-lg focus:outline-none focus:border-accent resize-none h-16 text-text-primary placeholder:text-text-secondary/60"
                        />
                        <button
                          type="submit"
                          disabled={isSubmittingLead}
                          className="w-full bg-accent hover:brightness-110 text-white font-semibold py-2.5 rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {isSubmittingLead ? <Loader2 size={14} className="animate-spin" /> : 'Send Consultation Request'}
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* ----------------- QUICK SUGGESTION PILLS ----------------- */}
            <div className="bg-[#f8fbff]/95 dark:bg-[#0c1d3d]/95 px-3 py-2.5 border-t border-blue-200/60 dark:border-blue-300/15 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
              <button
                onClick={() => handleSend("Tell me about your Web Operations and 99.99% uptime services.")}
                className="whitespace-nowrap px-3 py-1.5 bg-white dark:bg-[#142a56] hover:bg-accent/10 border border-blue-200/80 dark:border-blue-300/20 hover:border-accent text-text-primary text-[11px] font-semibold uppercase tracking-wide rounded-lg transition-colors shrink-0 cursor-pointer"
              >
                WEB OPERATIONS
              </button>
              <button
                onClick={() => handleSend("How can AI Automations and custom agents help our workflow?")}
                className="whitespace-nowrap px-3 py-1.5 bg-white dark:bg-[#142a56] hover:bg-accent/10 border border-blue-200/80 dark:border-blue-300/20 hover:border-accent text-text-primary text-[11px] font-semibold uppercase tracking-wide rounded-lg transition-colors shrink-0 cursor-pointer"
              >
                AI AUTOMATIONS
              </button>
              <button
                onClick={() => handleSend("What GIS geospatial mapping capabilities do you provide?")}
                className="whitespace-nowrap px-3 py-1.5 bg-white dark:bg-[#142a56] hover:bg-accent/10 border border-blue-200/80 dark:border-blue-300/20 hover:border-accent text-text-primary text-[11px] font-semibold uppercase tracking-wide rounded-lg transition-colors shrink-0 cursor-pointer"
              >
                GIS MAPPING
              </button>
            </div>

            {/* ----------------- ACTION BAR ----------------- */}
            <div className="bg-[#eff6ff]/95 dark:bg-[#091834]/95 px-4 py-2 border-t border-blue-200/60 dark:border-blue-300/15 flex items-center justify-between text-xs font-semibold shrink-0">
              <a
                href="https://wa.me/2349075934287?text=Hello%20ReliabilityIQ%20Ventures%2C%20I%20would%20like%20to%20discuss%20a%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline flex items-center gap-1"
              >
                <span>Chat on WhatsApp</span>
                <ArrowUpRight size={13} />
              </a>
              <button
                onClick={() => setShowLeadModal(true)}
                className="text-text-primary hover:text-accent font-semibold transition-colors cursor-pointer"
              >
                Book Consultation
              </button>
            </div>

            {/* ----------------- INPUT ROW ----------------- */}
            <div className="bg-[#f8fbff]/98 dark:bg-[#0c1d3d]/98 p-3 border-t border-blue-200/60 dark:border-blue-300/15 shrink-0">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }} 
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about operations, AI agents, cloud setup..."
                  className="flex-1 bg-white dark:bg-[#08152e] border border-blue-200/80 dark:border-blue-300/20 px-3.5 py-2.5 text-xs sm:text-sm text-text-primary rounded-xl focus:outline-none focus:border-accent placeholder:text-text-secondary/60"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 bg-accent text-white rounded-xl flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:brightness-110 transition-all shadow-xs cursor-pointer"
                  aria-label="Send message"
                >
                  <Send size={15} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
