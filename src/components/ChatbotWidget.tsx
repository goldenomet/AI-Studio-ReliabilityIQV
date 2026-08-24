import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, User, Bot, Loader2, Mail } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hello! I'm the ReliabilityIQ AI assistant. How can I help you today? If you'd like to leave a message or request a quote, just let me know!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  
  // Lead form state
  const [leadForm, setLeadForm] = useState({ name: '', email: '', service: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, showLeadForm]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    // Check if user is asking to contact/quote, trigger lead form directly
    const lowerInput = userMessage.toLowerCase();
    if (lowerInput.includes('quote') || lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('human')) {
      setShowLeadForm(true);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'd be happy to connect you with our team! Please fill out this quick form so we can reach out to you." }]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) throw new Error('Failed to fetch');
      
      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      
      // Auto-suggest lead form if AI suggests it
      if (data.text.toLowerCase().includes('name') && data.text.toLowerCase().includes('email')) {
         setShowLeadForm(true);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to my server right now. If you need immediate assistance, please use our contact form." }]);
      setShowLeadForm(true);
    } finally {
      setIsLoading(false);
    }
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.email) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(leadForm),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => {
          setShowLeadForm(false);
          setMessages(prev => [...prev, { role: 'assistant', content: "Thanks! I've sent your details to the ReliabilityIQ team. They will contact you shortly." }]);
        }, 2000);
      }
    } catch (error) {
      console.error('Lead submit error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-14 h-14 bg-accent text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[600px] max-h-[80vh] bg-bg-card rounded-2xl shadow-2xl border border-border-primary overflow-hidden flex flex-col z-50 font-sans"
          >
            {/* Header */}
            <div className="bg-accent p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Bot size={20} />
                <span className="font-semibold">ReliabilityIQ Assistant</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1 rounded transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-bg-primary text-text-primary border border-border-primary' : 'bg-accent/10 text-accent'}`}>
                    {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`p-3 rounded-2xl max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-accent text-white rounded-tr-none' : 'bg-bg-primary text-text-primary border border-border-primary rounded-tl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-2 flex-row">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-accent/10 text-accent">
                    <Bot size={16} />
                  </div>
                  <div className="p-3 rounded-2xl bg-bg-primary text-text-primary border border-border-primary rounded-tl-none flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin text-accent" />
                    <span className="text-xs text-text-secondary">Thinking...</span>
                  </div>
                </div>
              )}

              {/* Lead Form Inline */}
              <AnimatePresence>
                {showLeadForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-bg-primary border border-border-primary rounded-xl p-4 overflow-hidden"
                  >
                    {submitted ? (
                      <div className="text-center text-accent py-4 flex flex-col items-center gap-2">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                           <Mail size={20} />
                        </div>
                        <span className="text-sm font-medium">Message sent successfully!</span>
                      </div>
                    ) : (
                      <form onSubmit={submitLead} className="space-y-3">
                        <h4 className="text-sm font-semibold text-text-primary mb-2">Contact Our Team</h4>
                        <input
                          type="text"
                          placeholder="Your Name *"
                          required
                          value={leadForm.name}
                          onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                          className="w-full bg-bg-card border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                        />
                        <input
                          type="email"
                          placeholder="Your Email *"
                          required
                          value={leadForm.email}
                          onChange={e => setLeadForm({...leadForm, email: e.target.value})}
                          className="w-full bg-bg-card border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
                        />
                        <select
                          value={leadForm.service}
                          onChange={e => setLeadForm({...leadForm, service: e.target.value})}
                          className="w-full bg-bg-card border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
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
                          className="w-full bg-bg-card border border-border-primary rounded-lg px-3 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors resize-none h-20"
                        />
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-accent hover:bg-accent/90 text-white rounded-lg py-2 text-sm font-medium transition-colors flex items-center justify-center gap-2"
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

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-4 bg-bg-primary border-t border-border-primary flex gap-2">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-bg-card border border-border-primary rounded-full px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center shrink-0 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-accent/90 transition-colors"
              >
                <Send size={16} className="ml-1" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
