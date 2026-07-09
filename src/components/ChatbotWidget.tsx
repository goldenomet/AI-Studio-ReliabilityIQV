import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, X, Send, BrainCircuit, Sparkles, Bot, User, ArrowRight, RefreshCw } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I am **ReliabilityBot**, your guide to ReliabilityIQ Ventures. How can I help you optimize and automate your enterprise IT systems today?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorOccurred, setErrorOccurred] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Suggested questions/prompts to help users interact
  const quickPrompts = [
    "What services do you offer?",
    "Tell me about the founders",
    "What is your system uptime?",
    "Where is ReliabilityIQ located?",
  ];

  // Auto-trigger greetings pop-up after a brief delay on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      // Show greeting only if user hasn't already opened the chatbot
      if (!isOpen) {
        setShowGreeting(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [isOpen]);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle clicking outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatWindowRef.current && !chatWindowRef.current.contains(event.target as Node)) {
        // Optional: close chatbot or do nothing. Let's keep it open to not annoy users, but close if they wish.
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setShowGreeting(false);
    }
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setErrorOccurred(false);
    const userMessage: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const updatedMessages = [...messages, userMessage];
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: updatedMessages }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from AI assistant.");
      }

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err) {
      console.error("Chat error:", err);
      setErrorOccurred(true);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Oops! I encountered an error communicating with the main systems. Please make sure the backend is active, or try again shortly.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleSuggestionClick = (prompt: string) => {
    handleSendMessage(prompt);
  };

  const handleDismissGreeting = (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid triggering chat open
    setShowGreeting(false);
  };

  // Helper to format simple markdown bold tags in response
  const formatMessageContent = (content: string) => {
    const boldRegex = /\*\*(.*?)\*\*/g;
    const parts = [];
    let lastIndex = 0;
    let match;

    while ((match = boldRegex.exec(content)) !== null) {
      if (match.index > lastIndex) {
        parts.push(content.substring(lastIndex, match.index));
      }
      parts.push(<strong key={match.index} className="font-bold text-accent">{match[1]}</strong>);
      lastIndex = boldRegex.lastIndex;
    }

    if (lastIndex < content.length) {
      parts.push(content.substring(lastIndex));
    }

    return parts.length > 0 ? parts : content;
  };

  return (
    <div className="fixed right-6 bottom-6 md:right-10 md:bottom-10 z-[100] flex flex-col items-end gap-4 font-sans">
      {/* Greetings Pop-up */}
      <AnimatePresence>
        {showGreeting && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            onClick={handleToggleChat}
            className="absolute bottom-16 md:bottom-20 right-2 w-72 p-4 bg-bg-card border border-border-primary rounded-2xl shadow-2xl backdrop-blur-md cursor-pointer group hover:border-accent hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)] transition-all duration-300 ring-1 ring-white/10 z-[101]"
          >
            {/* Pop-up close button */}
            <button
              onClick={handleDismissGreeting}
              className="absolute top-2.5 right-2.5 text-text-secondary/60 hover:text-text-primary p-1 rounded-lg transition-colors"
              aria-label="Dismiss greeting"
            >
              <X size={14} />
            </button>

            <div className="flex gap-3 pr-4">
              <div className="w-9 h-9 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0 animate-bounce">
                <Bot size={18} />
              </div>
              <div className="flex-grow">
                <div className="text-xs font-bold text-text-primary font-mono tracking-tight flex items-center gap-1.5">
                  ReliabilityBot <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
                <p className="text-xs text-text-secondary mt-1 leading-relaxed">
                  Hi there! Ask me anything about ReliabilityIQ and our systems optimization.
                </p>
                <div className="text-[10px] text-accent font-semibold font-mono mt-2 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Chat Now <ArrowRight size={10} />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={chatWindowRef}
            initial={{ opacity: 0, y: 30, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 25, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="w-[calc(100vw-2rem)] sm:w-[400px] h-[550px] max-h-[75vh] bg-bg-card border border-border-primary rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-md ring-1 ring-white/10 z-[101] mb-2"
          >
            {/* Chat Titlebar */}
            <div className="px-5 py-4 bg-linear-to-r from-bg-card to-bg-secondary border-b border-border-primary flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent text-white flex items-center justify-center shadow-lg shadow-accent/20">
                  <BrainCircuit size={20} className="animate-pulse" />
                </div>
                <div>
                  <div className="text-sm font-black text-text-primary font-mono flex items-center gap-1.5">
                    ReliabilityBot
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  </div>
                  <div className="text-[10px] font-mono text-text-secondary/70">
                    Online • Lagos to London
                  </div>
                </div>
              </div>
              <button
                onClick={handleToggleChat}
                className="text-text-secondary/80 hover:text-text-primary hover:bg-bg-secondary/60 p-2 rounded-xl transition-all border border-transparent hover:border-border-primary"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages Panel */}
            <div className="flex-grow overflow-y-auto p-4 space-y-4 scrollbar-thin">
              {messages.map((msg, index) => {
                const isBot = msg.role === "assistant";
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 max-w-[85%] ${isBot ? "mr-auto" : "ml-auto flex-row-reverse"}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                      isBot 
                        ? "bg-accent/10 border-accent/20 text-accent" 
                        : "bg-bg-secondary border-border-primary text-text-secondary"
                    }`}>
                      {isBot ? <Bot size={14} /> : <User size={14} />}
                    </div>

                    {/* Chat Bubble */}
                    <div className={`px-4 py-3 rounded-2xl text-xs leading-relaxed border ${
                      isBot
                        ? "bg-bg-secondary border-border-primary/50 text-text-primary rounded-tl-none"
                        : "bg-accent text-white border-accent/10 rounded-tr-none shadow-md shadow-accent/5"
                    }`}>
                      <div className="whitespace-pre-line">
                        {formatMessageContent(msg.content)}
                      </div>
                    </div>
                  </motion.div>
                );
              })}

              {/* Typing Loader */}
              {isLoading && (
                <div className="flex gap-3 max-w-[85%] mr-auto">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent flex-shrink-0">
                    <Bot size={14} />
                  </div>
                  <div className="bg-bg-secondary border border-border-primary/50 text-text-primary px-4 py-3.5 rounded-2xl rounded-tl-none text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                    <span className="w-1.5 h-1.5 bg-accent rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Panels */}
            {messages.length === 1 && !isLoading && (
              <div className="px-4 py-2 border-t border-border-primary bg-bg-secondary/30">
                <div className="text-[10px] font-mono text-text-secondary/60 mb-2 uppercase tracking-wider font-bold flex items-center gap-1.5">
                  <Sparkles size={10} className="text-accent" /> Try asking:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {quickPrompts.map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => handleSuggestionClick(prompt)}
                      className="text-[10px] bg-bg-card hover:bg-accent/10 border border-border-primary hover:border-accent/40 text-text-secondary hover:text-accent px-2.5 py-1.5 rounded-full transition-all text-left font-mono"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Chat Input Bar */}
            <form
              onSubmit={handleFormSubmit}
              className="p-4 bg-linear-to-t from-bg-card to-bg-secondary/40 border-t border-border-primary flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type a message..."
                disabled={isLoading}
                className="flex-grow bg-bg-secondary border border-border-primary rounded-xl px-4 py-2.5 text-xs text-text-primary placeholder:text-text-secondary/50 focus:outline-hidden focus:ring-1 focus:ring-accent disabled:opacity-50 font-mono"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="w-9 h-9 bg-accent hover:bg-accent/80 text-white rounded-xl flex items-center justify-center transition-colors shadow-lg shadow-accent/20 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <button
        onClick={handleToggleChat}
        aria-label="Toggle chat menu"
        className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 relative group overflow-hidden outline-hidden ring-offset-2 focus:ring-2 focus:ring-accent ${
          isOpen ? "bg-bg-card border border-border-primary text-text-primary" : "bg-accent text-white"
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
              <BrainCircuit size={32} strokeWidth={1.5} className="text-white" />
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
