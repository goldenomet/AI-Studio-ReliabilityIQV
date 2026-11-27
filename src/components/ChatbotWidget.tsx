import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { Send, RotateCcw, ChevronRight, ArrowUpRight, CheckCircle2, Loader2, X, User, AlertCircle, Calendar } from 'lucide-react';
import { useWidgetVisibility } from '../hooks/useWidgetVisibility';
import { useMovableDock } from '../hooks/useMovableDock';
import { SideDockGuide, MinimizeEdgeHandle, DockedSideTab } from './SideDockControls';

const websiteLogo = '/assets/aistudio/Glossy_Teal_Growth_Arrow_Emblem_587c276c.png';

import { getGmailAccessToken } from '../lib/gmail';

interface CapturedLeadBadge {
  name: string;
  email?: string;
  phone?: string;
  service: string;
  summary: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
  capturedLead?: CapturedLeadBadge | null;
  suggestBooking?: boolean;
  isError?: boolean;
  retryPrompt?: string;
}

const DEFAULT_SUGGESTIONS = [
  '99.99% Web Operations',
  'AI Agent Automation',
  'GIS Spatial Mapping',
  'Request a Quote',
];

export const ChatbotWidget = ({ isMenuOpen = false }: { isMenuOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);
  const { isVisible } = useWidgetVisibility(4000);
  const dock = useMovableDock({
    storageKey: 'riq-dock-chatbot-widget',
    defaultSide: 'right',
    estimatedWidth: 56,
    estimatedHeight: 56,
    disabled: isOpen,
  });

  const initialAssistantMessage: Message = {
    id: 'msg-init',
    role: 'assistant',
    content: "Hello! I'm **ReliabilityIQ AI**, your Technical Operations & Solution Advisor.\n\nAsk me about our **Digital Platforms**, **AI Automations**, **GIS Mapping**, **Cloud Operations**, or **Managed IT Support**—or share your project goals and contact info right here to book a consultation.",
    timestamp: 'Just now'
  };

  const [messages, setMessages] = useState<Message[]>([initialAssistantMessage]);
  const [quickSuggestions, setQuickSuggestions] = useState<string[]>(DEFAULT_SUGGESTIONS);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);

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
    setQuickSuggestions(DEFAULT_SUGGESTIONS);
    setShowLeadModal(false);
    setLeadSubmitted(false);
    setLeadError(null);
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

    const updated = [...messages.filter((m) => !m.isError), userMsg];
    setMessages(updated);
    setInput('');
    setIsLoading(true);

    try {
      const token = getGmailAccessToken();
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          messages: updated.map((m) => ({ role: m.role, content: m.content })),
          gmailToken: token || undefined,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data?.error || `Request failed (${res.status})`);
      }

      const reply = data.text || "Thank you for reaching out. A specialist from ReliabilityIQ Ventures will review your requirements.";

      if (Array.isArray(data.followUpSuggestions) && data.followUpSuggestions.length > 0) {
        setQuickSuggestions(data.followUpSuggestions);
      }

      setMessages(prev => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: reply,
          capturedLead: data.leadCaptured ? data.capturedLead : null,
          suggestBooking: Boolean(data.suggestBookingModal && !data.leadCaptured),
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err: any) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          role: 'assistant',
          content: err?.message || "Unable to connect to ReliabilityIQ AI right now. You can retry or submit a consultation request directly below.",
          isError: true,
          retryPrompt: text,
          suggestBooking: true,
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
    setLeadError(null);

    try {
      const token = getGmailAccessToken();
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          ...leadForm,
          source: 'chat',
          gmailToken: token || undefined
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error || 'Failed to save inquiry');
      }

      const savedSnapshot: CapturedLeadBadge = {
        name: leadForm.name || 'Client',
        email: leadForm.email || undefined,
        phone: leadForm.phone || undefined,
        service: leadForm.service || 'General Consultation',
        summary: leadForm.message || 'Consultation requested via AI Advisor.',
      };

      setIsSubmittingLead(false);
      setLeadSubmitted(true);
      setTimeout(() => {
        setShowLeadModal(false);
        setLeadSubmitted(false);
        setLeadForm({ name: '', email: '', phone: '', service: '', message: '' });
        setMessages(prev => [
          ...prev,
          {
            id: `lead-confirm-${Date.now()}`,
            role: 'assistant',
            content: `Thank you, **${savedSnapshot.name}**! Your inquiry has been recorded. Our engineering team will reach out to **${savedSnapshot.email || savedSnapshot.phone}** within 24 hours.`,
            capturedLead: savedSnapshot,
            timestamp: 'Just now'
          }
        ]);
      }, 1200);
    } catch (err: any) {
      setIsSubmittingLead(false);
      setLeadError(err?.message || 'Unable to submit request. Please try again or reach us on WhatsApp.');
    }
  };

  return (
    <>
      <SideDockGuide side={dock.dockPreview} />
      <AnimatePresence>
        {/* ============================================================
            1. INITIAL AUTO-GREETING INTRO CARD (Collapses after 5-8s)
            ============================================================ */}
        {!isOpen && showGreeting && !dock.docked && (
          <motion.div
            key="initial-greeting-card"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed bottom-24 right-4 sm:right-6 w-[340px] max-w-[calc(100vw-2rem)] frosted-panel-elevated text-text-primary rounded-2xl shadow-[0_24px_56px_-12px_rgba(15,37,71,0.22)] z-40 overflow-hidden cursor-pointer group ${
              isMenuOpen ? 'hidden lg:block' : ''
            }`}
            onClick={handleOpenChat}
          >
            {/* Top Header Bar */}
            <div className="bg-gradient-to-r from-[#1d6ce0]/92 via-[#2563eb]/90 to-[#0ea5e9]/90 backdrop-blur-xl px-3.5 py-2.5 flex items-center justify-between text-white border-b border-white/25 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
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
            2. FLOATING COLLAPSED LAUNCHER (Movable & Dockable)
            ============================================================ */}
        {!isOpen && isVisible && (
          <div
            ref={dock.containerRef}
            key="collapsed-launcher-wrapper"
            style={dock.positionStyle}
            onPointerDown={dock.handlePointerDown}
            onClickCapture={dock.handleClickCapture}
            className={`fixed z-40 transition-opacity duration-300 ${
              !dock.isMoved && !dock.docked ? 'bottom-6 right-6' : ''
            } ${
              isMenuOpen
                ? 'hidden lg:block'
                : dock.isDragging
                  ? 'opacity-100'
                  : dock.docked
                    ? 'opacity-70 hover:opacity-100 lg:opacity-90'
                    : 'opacity-50 hover:opacity-100 focus-within:opacity-100 lg:opacity-100'
            }`}
          >
            {dock.docked ? (
              <DockedSideTab
                side={dock.docked}
                label="AI Advisor"
                accentDotClass="bg-accent"
                icon={
                  <span className="w-6 h-6 rounded-full bg-white border border-blue-200/80 p-0.5 flex items-center justify-center shadow-xs">
                    <img src={websiteLogo} alt="ReliabilityIQ" className="w-full h-full object-contain" />
                  </span>
                }
                onRestore={dock.restoreFromSide}
              />
            ) : (
              <div className="relative group/dock">
                <motion.button
                  key="collapsed-launcher-btn"
                  initial={{ opacity: 0, scale: 0.8, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 15 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  onClick={handleOpenChat}
                  title="Drag to move or snap to side"
                  className={`relative w-14 h-14 frosted-panel-elevated border-2 border-accent/65 rounded-full flex items-center justify-center shadow-[0_14px_34px_-6px_rgba(29,108,224,0.38)] hover:scale-105 active:scale-95 transition-all p-2.5 group touch-none select-none ${
                    dock.isDragging ? 'cursor-grabbing scale-105' : 'cursor-grab'
                  }`}
                  aria-label="Open ReliabilityIQ AI Advisor"
                >
                  <div className="w-full h-full flex items-center justify-center p-0.5">
                    <img 
                      src={websiteLogo} 
                      alt="ReliabilityIQ" 
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform pointer-events-none" 
                    />
                  </div>
                  <span className="absolute top-0.5 right-0.5 w-3 h-3 bg-emerald-500 border-2 border-white dark:border-[#11264f] rounded-full" />
                </motion.button>

                <MinimizeEdgeHandle
                  side={dock.horizontalSide}
                  onMinimize={dock.minimizeToSide}
                  title="Minimize AI Advisor to side of screen"
                  className={`absolute -top-1.5 ${
                    dock.horizontalSide === 'left' ? '-left-1.5' : '-right-1.5'
                  } opacity-90 lg:opacity-0 lg:group-hover/dock:opacity-100 focus:opacity-100 z-10`}
                />
              </div>
            )}
          </div>
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
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 w-full sm:w-[420px] h-[100dvh] sm:h-[640px] sm:max-h-[88vh] frosted-panel-elevated !bg-white/75 dark:!bg-[#0b1c3d]/78 backdrop-blur-3xl backdrop-saturate-180 border border-white/60 dark:border-blue-300/25 sm:rounded-3xl shadow-[0_32px_72px_-16px_rgba(15,37,71,0.32)] overflow-hidden flex flex-col z-[75] font-sans text-text-primary"
          >
            {/* ----------------- CHATBOT HEADER ----------------- */}
            <div className="bg-gradient-to-r from-[#1d6ce0]/92 via-[#2563eb]/90 to-[#0ea5e9]/90 backdrop-blur-xl px-4 py-3 text-white flex items-center justify-between shrink-0 border-b border-white/25 select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]">
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
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-sky-50/45 dark:bg-[#08152e]/55 backdrop-blur-xl scroll-smooth custom-scrollbar">
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
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-[#2563eb]/95 via-[#1d6ce0]/92 to-[#0ea5e9]/90 text-white border border-white/30 shadow-[0_8px_20px_-6px_rgba(29,108,224,0.4),inset_0_1px_0_rgba(255,255,255,0.4)]'
                      : 'frosted-panel text-[#0f2547] dark:text-[#f1f6ff]'
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
                    {msg.capturedLead && (
                      <div className="mt-3 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-[11px] space-y-1">
                        <div className="flex items-center gap-1.5 font-semibold text-emerald-700 dark:text-emerald-300">
                          <CheckCircle2 size={13} className="shrink-0" />
                          <span>Lead Captured &amp; Saved</span>
                        </div>
                        <p className="text-text-secondary leading-snug">
                          <strong className="text-text-primary">{msg.capturedLead.name}</strong>
                          {' · '}
                          {msg.capturedLead.email || msg.capturedLead.phone}
                        </p>
                        <p className="text-text-secondary leading-snug">
                          Stream: <span className="text-accent font-medium">{msg.capturedLead.service}</span>
                        </p>
                      </div>
                    )}

                    {(msg.suggestBooking || msg.isError) && (
                      <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        {msg.isError && msg.retryPrompt && (
                          <button
                            type="button"
                            onClick={() => handleSend(msg.retryPrompt)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-400/30 text-red-600 dark:text-red-300 text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            <AlertCircle size={12} />
                            <span>Retry</span>
                          </button>
                        )}
                        {msg.suggestBooking && (
                          <button
                            type="button"
                            onClick={() => setShowLeadModal(true)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent text-[11px] font-semibold transition-colors cursor-pointer"
                          >
                            <Calendar size={12} />
                            <span>Complete Booking Form</span>
                          </button>
                        )}
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
                  <div className="px-3.5 py-2.5 frosted-panel text-text-primary rounded-2xl flex items-center gap-2 text-xs">
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
                    className="p-4 frosted-panel-elevated rounded-2xl shadow-2xl"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-xs font-bold text-text-primary uppercase tracking-wide">
                        Book Technical Consultation
                      </h4>
                      <button
                        onClick={() => setShowLeadModal(false)}
                        className="text-text-secondary hover:text-text-primary p-1 cursor-pointer"
                        aria-label="Close form"
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
                          className="w-full liquid-input px-3 py-2 rounded-lg text-text-primary placeholder:text-text-secondary/60"
                        />
                        <input
                          type="email"
                          required
                          placeholder="Business Email *"
                          value={leadForm.email}
                          onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                          className="w-full liquid-input px-3 py-2 rounded-lg text-text-primary placeholder:text-text-secondary/60"
                        />
                        <input
                          type="tel"
                          placeholder="Phone / WhatsApp (optional)"
                          value={leadForm.phone}
                          onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                          className="w-full liquid-input px-3 py-2 rounded-lg text-text-primary placeholder:text-text-secondary/60"
                        />
                        <select
                          value={leadForm.service}
                          onChange={(e) => setLeadForm({ ...leadForm, service: e.target.value })}
                          className="w-full liquid-input px-3 py-2 rounded-lg text-text-primary"
                        >
                          <option className="bg-white dark:bg-[#0c1f40]" value="">Select Service Stream</option>
                          <option className="bg-white dark:bg-[#0c1f40]" value="Digital Platforms & Web Systems">Digital Platforms &amp; Web Systems</option>
                          <option className="bg-white dark:bg-[#0c1f40]" value="Web Operations & 99.99% Uptime">Web Operations &amp; 99.99% Uptime</option>
                          <option className="bg-white dark:bg-[#0c1f40]" value="AI Automations & LLM Agents">AI Automations &amp; LLM Agents</option>
                          <option className="bg-white dark:bg-[#0c1f40]" value="Geospatial GIS Mapping">Geospatial GIS Mapping</option>
                          <option className="bg-white dark:bg-[#0c1f40]" value="Technical Documentation">Technical Documentation</option>
                          <option className="bg-white dark:bg-[#0c1f40]" value="AI Animation & Motion Studio">AI Animation &amp; Motion Studio</option>
                          <option className="bg-white dark:bg-[#0c1f40]" value="Social Media Advertising">Social Media Advertising</option>
                          <option className="bg-white dark:bg-[#0c1f40]" value="Small Business IT Support">Small Business IT Support</option>
                          <option className="bg-white dark:bg-[#0c1f40]" value="Custom Enterprise Advisory">Custom Enterprise Advisory</option>
                        </select>
                        <textarea
                          placeholder="Briefly describe your systems, timeline, or goals..."
                          value={leadForm.message}
                          onChange={(e) => setLeadForm({ ...leadForm, message: e.target.value })}
                          className="w-full liquid-input px-3 py-2 rounded-lg resize-none h-16 text-text-primary placeholder:text-text-secondary/60"
                        />
                        {leadError && (
                          <p className="text-[11px] text-red-500 font-medium">{leadError}</p>
                        )}
                        <button
                          type="submit"
                          disabled={isSubmittingLead}
                          className="w-full crystal-button liquid-hover-sheen !rounded-lg !py-2.5 flex items-center justify-center gap-2 cursor-pointer"
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

            {/* ----------------- DYNAMIC QUICK SUGGESTIONS ----------------- */}
            <div className="bg-white/45 dark:bg-[#0c1d3d]/55 backdrop-blur-xl px-3 py-2.5 border-t border-white/45 dark:border-blue-300/15 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
              {quickSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => handleSend(suggestion)}
                  disabled={isLoading}
                  className="whitespace-nowrap px-3 py-1.5 frosted-panel liquid-hover-sheen hover:border-accent text-text-primary text-[11px] font-semibold tracking-wide rounded-lg transition-all shrink-0 cursor-pointer disabled:opacity-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* ----------------- ACTION BAR ----------------- */}
            <div className="bg-sky-50/55 dark:bg-[#091834]/60 backdrop-blur-xl px-4 py-2 border-t border-white/45 dark:border-blue-300/15 flex items-center justify-between text-xs font-semibold shrink-0">
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
            <div className="bg-white/60 dark:bg-[#0c1d3d]/70 backdrop-blur-2xl p-3 border-t border-white/50 dark:border-blue-300/15 shrink-0">
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
                  className="flex-1 liquid-input px-3.5 py-2.5 text-xs sm:text-sm text-text-primary rounded-xl placeholder:text-text-secondary/60"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 crystal-button !rounded-xl !p-0 flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
