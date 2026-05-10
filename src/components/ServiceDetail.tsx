import React from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Monitor, Smartphone, Palette, Shield, Share2, Zap, BrainCircuit, PlaySquare, FileText, Database, Activity, CheckCircle, Clock, ShoppingCart, User, TrendingUp, Wand2, Clapperboard, SlidersHorizontal, Film, Box, Sparkles, Volume2, Maximize, Settings, ClosedCaption, ArrowRight, Layers, Crosshair, Satellite, MapPin, ShieldCheck, Globe, LineChart, Cloud, BarChart2, Pencil, Bell, Plus, Minus, CircleDot, Triangle, Waypoints, Target, BarChart, Megaphone, Eye, MousePointerClick, DollarSign, PieChart, Youtube, Instagram, Twitter, Edit, Code, Terminal, BookOpen, FileCode, Search, Menu, List, Check } from 'lucide-react';

interface ServiceDetailProps {
  id: string;
  onBack: () => void;
  onContact: () => void;
}

export const ServiceDetail = ({ id, onBack, onContact }: ServiceDetailProps) => {
  if (id === 'service-documentation') {
    return (
      <div className="bg-[#EBEBE6] min-h-screen text-[#0a3a40] font-mono pb-20 relative pt-24">
        <div className="w-full px-6 md:px-12 lg:px-20 py-12 md:py-16">
          
          {/* Header/Nav */}
          <motion.button 
            onClick={onBack}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#93ACA7] hover:text-[#0a3a40] transition-colors group cursor-pointer mb-16 font-bold"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="relative">
              Back to Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#338f82] transition-all duration-300 group-hover:w-full opacity-50" />
            </span>
          </motion.button>

          {/* Top Section */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16 items-start">
            
            {/* Left Text */}
            <div className="lg:w-[35%] flex flex-col pt-4">
              <div className="text-[10px] font-bold text-[#93ACA7] mb-2">06</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#338f82] font-bold mb-8">Service Detail</div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a3a40] leading-[1] mb-8 font-mono">
                TECHNICAL <br /> DOCUMENTATION
              </h1>
              
              <p className="text-sm md:text-base text-[#0a3a40]/70 leading-relaxed mb-10 max-w-[400px]">
                We write clear, comprehensive, and developer-friendly documentation. From API references and SDK guides to system architecture diagrams and user manuals - we bridge the gap between code and comprehension.
              </p>

              {/* Sub features list */}
              <div className="flex flex-col gap-6 mb-12">
                {[
                  {
                    icon: <FileCode size={20} className="text-[#0a3a40]" />,
                    title: "API References",
                    desc: "Interactive OpenAPI/Swagger docs with clear examples and endpoints."
                  },
                  {
                    icon: <BookOpen size={20} className="text-[#0a3a40]" />,
                    title: "Developer Guides",
                    desc: "Step-by-step tutorials, quickstarts, and integration walkthroughs."
                  },
                  {
                    icon: <Layers size={20} className="text-[#0a3a40]" />,
                    title: "System Architecture",
                    desc: "Clear visual diagrams and technical specifications of complex systems."
                  },
                  {
                    icon: <CheckCircle size={20} className="text-[#0a3a40]" />,
                    title: "Continuous Updates",
                    desc: "Docs-as-code approach ensures documentation stays in sync with releases."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg border border-[#0a3a40]/10 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0a3a40] mb-1">{item.title}</h4>
                      <p className="text-[11px] text-[#0a3a40]/60 leading-relaxed max-w-[300px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <motion.button 
                  onClick={onContact}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0a3a40] text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#15464a] transition-all shadow-lg hover:shadow-xl active:shadow-md"
                >
                  Start a Project <ArrowUpRight size={14} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, bg: "rgba(255,255,255,0.7)" }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-[#0a3a40]/20 bg-transparent text-[#0a3a40] px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors"
                >
                  View Examples <ArrowUpRight size={14} />
                </motion.button>
              </div>
            </div>

            {/* Right Graphic area */}
            <div className="lg:w-[65%] flex flex-col gap-6">
              
              {/* Documentation Hub Layout */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full bg-[#fafafa] rounded-[24px] overflow-hidden shadow-2xl border border-[#0a3a40]/10 relative flex flex-col min-h-[550px] font-sans"
              >
                 {/* Top Nav Bar */}
                 <div className="h-14 border-b border-[#0a3a40]/10 flex items-center px-6 justify-between bg-white shrink-0">
                   <div className="flex items-center gap-6">
                     <div className="flex items-center gap-2 text-[#0a3a40] font-bold">
                       <BookOpen size={16} className="text-[#338f82]" />
                       Core Docs Platform
                     </div>
                     <nav className="hidden md:flex items-center gap-4 text-[12px] font-bold text-[#0a3a40]/60">
                       <span className="text-[#0a3a40]">Guides</span>
                       <span className="hover:text-[#0a3a40] cursor-pointer">API Reference</span>
                       <span className="hover:text-[#0a3a40] cursor-pointer">SDKs</span>
                       <span className="hover:text-[#0a3a40] cursor-pointer">Support</span>
                     </nav>
                   </div>
                   <div className="flex items-center gap-4">
                     <div className="relative hidden md:block">
                       <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0a3a40]/40" />
                       <input 
                         type="text" 
                         placeholder="Search documentation..." 
                         className="bg-[#f0f0f0] rounded-full pl-9 pr-4 py-1.5 text-[11px] outline-none border border-transparent focus:border-[#338f82] transition-colors w-48"
                       />
                     </div>
                     <button className="bg-[#0a3a40] text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-wide">
                       Sign In
                     </button>
                   </div>
                 </div>

                 {/* Main Content Area */}
                 <div className="flex flex-1 overflow-hidden">
                   
                   {/* Sidebar Navigation */}
                   <div className="w-[240px] border-r border-[#0a3a40]/10 bg-white/50 p-6 overflow-y-auto shrink-0 hidden lg:block">
                     <div className="flex flex-col gap-6">
                       
                       <div>
                         <h5 className="text-[10px] uppercase font-bold tracking-widest text-[#0a3a40]/50 mb-3">Getting Started</h5>
                         <ul className="flex flex-col gap-2 text-[12px] text-[#0a3a40]/70 font-medium">
                           <li className="cursor-pointer hover:text-[#338f82]">Introduction</li>
                           <li className="cursor-pointer hover:text-[#338f82]">Quickstart</li>
                           <li className="cursor-pointer hover:text-[#338f82]">Authentication</li>
                           <li className="cursor-pointer hover:text-[#338f82]">Environments</li>
                         </ul>
                       </div>

                       <div>
                         <h5 className="text-[10px] uppercase font-bold tracking-widest text-[#0a3a40]/50 mb-3">Core Concepts</h5>
                         <ul className="flex flex-col gap-2 text-[12px] text-[#0a3a40]/70 font-medium">
                           <li className="cursor-pointer hover:text-[#338f82]">Data Models</li>
                           <li className="cursor-pointer hover:text-[#338f82]">Webhooks</li>
                           <li className="cursor-pointer hover:text-[#338f82]">Rate Limits</li>
                           <li className="cursor-pointer hover:text-[#338f82]">Error Handling</li>
                         </ul>
                       </div>

                       <div>
                         <h5 className="text-[10px] uppercase font-bold tracking-widest text-[#0a3a40]/50 mb-3">Endpoints</h5>
                         <ul className="flex flex-col gap-2 text-[12px] text-[#0a3a40]/70 font-medium">
                           <li className="text-[#338f82] font-bold flex items-center justify-between">
                             Users 
                             <span className="bg-[#e6f4f1] text-[#338f82] text-[9px] px-1.5 py-0.5 rounded font-bold">GET</span>
                           </li>
                           <li className="cursor-pointer hover:text-[#338f82] pl-3">Create User</li>
                           <li className="cursor-pointer hover:text-[#338f82] pl-3">Update User</li>
                           <li className="cursor-pointer hover:text-[#338f82] pl-3">Delete User</li>
                           <li className="cursor-pointer hover:text-[#338f82] mt-2 font-bold text-[#0a3a40]/80">Payments</li>
                           <li className="cursor-pointer hover:text-[#338f82] mt-2 font-bold text-[#0a3a40]/80">Subscriptions</li>
                         </ul>
                       </div>

                     </div>
                   </div>

                   {/* Content */}
                   <div className="flex-1 bg-white p-5 sm:p-8 lg:p-10 overflow-y-auto relative">
                      
                      <div className="flex items-center gap-2 text-[11px] text-[#0a3a40]/50 font-bold mb-6">
                        <span>Endpoints</span> <span className="text-[#0a3a40]/30">/</span> <span>Users</span> <span className="text-[#0a3a40]/30">/</span> <span className="text-[#338f82]">Get User</span>
                      </div>

                      <div className="flex items-start justify-between gap-8 mb-6">
                        <div>
                          <h2 className="text-2xl font-bold text-[#0a3a40] mb-2 flex items-center gap-3">
                            Retrieve a User
                            <span className="bg-[#4ade80]/20 text-[#166534] text-[10px] uppercase tracking-widest px-2 py-1 rounded-md font-bold">GET</span>
                          </h2>
                          <p className="text-sm text-[#0a3a40]/70 leading-relaxed max-w-xl">
                            Retrieves the details of an existing user. You need only supply the unique user identifier that was returned upon user creation.
                          </p>
                        </div>
                      </div>

                      {/* Endpoint URL */}
                      <div className="bg-[#fafafa] border border-[#d2d4cf] rounded-xl p-3 flex items-center gap-3 mb-8 font-mono text-sm max-w-2xl">
                        <span className="text-[#0a3a40]/40">https://api.coreplatform.com/v1</span>
                        <span className="text-[#0a3a40]">/users/</span>
                        <span className="text-[#338f82]">{'{id}'}</span>
                      </div>

                      <div className="flex flex-col xl:flex-row gap-8">
                        {/* Parameters */}
                        <div className="flex-1">
                          <h3 className="text-sm font-bold text-[#0a3a40] mb-4">Path Parameters</h3>
                          <div className="border border-[#d2d4cf] rounded-xl overflow-hidden mb-8">
                            <div className="bg-[#fafafa] border-b border-[#d2d4cf] p-3 flex text-[11px] font-bold text-[#0a3a40]/60 uppercase tracking-widest">
                              <div className="w-1/3">Name</div>
                              <div className="flex-1">Description</div>
                            </div>
                            <div className="p-4 flex flex-col gap-4 text-sm bg-white">
                              <div className="flex items-start">
                                <div className="w-1/3 flex flex-col gap-1">
                                  <span className="font-bold text-[#0a3a40] font-mono">id</span>
                                  <span className="text-[10px] text-red-500 font-bold">required</span>
                                </div>
                                <div className="flex-1 text-[#0a3a40]/70 leading-relaxed">
                                  The unique identifier of the user. <span className="font-mono text-[11px] bg-[#f0f0f0] px-1 py-0.5 rounded text-[#0a3a40]">string</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <h3 className="text-sm font-bold text-[#0a3a40] mb-4">Query Parameters</h3>
                          <div className="border border-[#d2d4cf] rounded-xl overflow-hidden">
                            <div className="bg-[#fafafa] border-b border-[#d2d4cf] p-3 flex text-[11px] font-bold text-[#0a3a40]/60 uppercase tracking-widest">
                              <div className="w-1/3">Name</div>
                              <div className="flex-1">Description</div>
                            </div>
                            <div className="p-4 flex flex-col gap-4 text-sm bg-white">
                              <div className="flex items-start border-b border-[#d2d4cf] pb-4">
                                <div className="w-1/3 flex flex-col gap-1">
                                  <span className="font-bold text-[#0a3a40] font-mono">expand</span>
                                  <span className="text-[10px] text-[#0a3a40]/40 font-bold">optional</span>
                                </div>
                                <div className="flex-1 text-[#0a3a40]/70 leading-relaxed">
                                  Specifies which fields in the response should be expanded. <span className="font-mono text-[11px] bg-[#f0f0f0] px-1 py-0.5 rounded text-[#0a3a40]">array</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Code Snippets Side */}
                        <div className="xl:w-[350px] shrink-0">
                          
                          {/* Request */}
                          <div className="bg-[#1e2327] rounded-xl overflow-hidden mb-4 shadow-lg">
                            <div className="bg-[#161a1d] px-4 py-3 flex items-center justify-between border-b border-[#2a3036]">
                              <div className="flex gap-4 text-[11px] font-bold text-white/50 tracking-wider">
                                <span className="text-white cursor-pointer">cURL</span>
                                <span className="cursor-pointer hover:text-white transition-colors">Node.js</span>
                                <span className="cursor-pointer hover:text-white transition-colors">Python</span>
                              </div>
                            </div>
                            <div className="p-4 bg-[#1e2327] font-mono text-[11px] leading-relaxed overflow-x-auto text-[#e2e8f0]">
                              <div><span className="text-[#cba6f7]">curl</span> <span className="text-[#a6e3a1]">https://api.coreplatform.com/v1/users/usr_12345</span> \</div>
                              <div className="pl-4">-H <span className="text-[#a6e3a1]">"Authorization: Bearer sk_test_..."</span> \</div>
                              <div className="pl-4">-d <span className="text-[#a6e3a1]">expand[]=organization</span></div>
                            </div>
                          </div>

                          {/* Response */}
                          <div className="bg-[#1e2327] rounded-xl overflow-hidden shadow-lg">
                            <div className="bg-[#161a1d] px-4 py-3 flex items-center justify-between border-b border-[#2a3036]">
                              <div className="text-[11px] font-bold text-white tracking-wider flex items-center gap-2">
                                Response <span className="w-2 h-2 rounded-full bg-[#a6e3a1]" />
                              </div>
                              <div className="text-[11px] text-[#a6e3a1] font-mono font-bold">200 OK</div>
                            </div>
                            <div className="p-4 bg-[#1e2327] font-mono text-[11px] leading-relaxed overflow-x-auto text-[#e2e8f0]">
                              <div>{'{'}</div>
                              <div className="pl-4"><span className="text-[#89b4fa]">"id"</span>: <span className="text-[#a6e3a1]">"usr_123456789"</span>,</div>
                              <div className="pl-4"><span className="text-[#89b4fa]">"object"</span>: <span className="text-[#a6e3a1]">"user"</span>,</div>
                              <div className="pl-4"><span className="text-[#89b4fa]">"email"</span>: <span className="text-[#a6e3a1]">"jane.doe@example.com"</span>,</div>
                              <div className="pl-4"><span className="text-[#89b4fa]">"name"</span>: <span className="text-[#a6e3a1]">"Jane Doe"</span>,</div>
                              <div className="pl-4"><span className="text-[#89b4fa]">"status"</span>: <span className="text-[#a6e3a1]">"active"</span>,</div>
                              <div className="pl-4"><span className="text-[#89b4fa]">"created_at"</span>: <span className="text-[#fab387]">1678234560</span>,</div>
                              <div className="pl-4"><span className="text-[#89b4fa]">"organization"</span>: {'{'}</div>
                              <div className="pl-8"><span className="text-[#89b4fa]">"id"</span>: <span className="text-[#a6e3a1]">"org_98765"</span>,</div>
                              <div className="pl-8"><span className="text-[#89b4fa]">"name"</span>: <span className="text-[#a6e3a1]">"Acme Corp"</span></div>
                              <div className="pl-4">{'}'}</div>
                              <div>{'}'}</div>
                            </div>
                          </div>

                        </div>
                      </div>

                      {/* Overlay gradient for scrolling effect */}
                      <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
                   </div>

                   {/* Right Table of Contents (Desktop only) */}
                   <div className="w-[200px] border-l border-[#0a3a40]/10 p-6 hidden 2xl:block bg-[#fafafa]/50">
                     <h5 className="text-[10px] uppercase font-bold tracking-widest text-[#0a3a40] mb-4">On this page</h5>
                     <ul className="flex flex-col gap-3 text-[11px] text-[#0a3a40]/60 font-medium">
                       <li className="cursor-pointer text-[#338f82] border-l-2 border-[#338f82] -ml-6 pl-6">Retrieve a User</li>
                       <li className="cursor-pointer hover:text-[#0a3a40]">Path Parameters</li>
                       <li className="cursor-pointer hover:text-[#0a3a40]">Query Parameters</li>
                       <li className="cursor-pointer hover:text-[#0a3a40]">Returns</li>
                       <li className="cursor-pointer hover:text-[#0a3a40] mt-4">Errors</li>
                     </ul>
                   </div>
                 </div>

              </motion.div>

              {/* Approach/Benefit bottom section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                 {[
                   { icon: <Terminal size={20} className="text-[#0a3a40]" strokeWidth={1.5} />, label: "Developer Ready", desc: "Copy-paste code snippets" },
                   { icon: <CheckCircle size={20} className="text-[#0a3a40]" strokeWidth={1.5} />, label: "Always Accurate", desc: "Tested against real APIs" },
                   { icon: <Share2 size={20} className="text-[#0a3a40]" strokeWidth={1.5} />, label: "Easy to Share", desc: "Shareable deeply linked URLs" },
                   { icon: <Palette size={20} className="text-[#0a3a40]" strokeWidth={1.5} />, label: "Branded Portals", desc: "Docs that match your look" }
                 ].map((s, i) => (
                   <div key={i} className="bg-white/80 border border-[#0a3a40]/5 rounded-[16px] p-6 text-center md:text-left flex flex-col items-center md:items-start group hover:bg-white transition-colors">
                     <div className="w-10 h-10 rounded-full bg-white border border-[#0a3a40]/10 flex justify-center items-center mb-4 text-[#338f82]">
                       {s.icon}
                     </div>
                     <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#0a3a40] mb-2">{s.label}</h4>
                     <p className="text-[10px] text-[#0a3a40]/50 leading-tight">{s.desc}</p>
                   </div>
                 ))}
              </div>

            </div>
          </div>
          
          <div className="w-full h-[1px] bg-[#0a3a40]/10 mb-12" />

          {/* Docs Offerings Section */}
          <div className="flex justify-between items-end mb-8">
             <h3 className="text-xl font-bold font-sans">Our Documentation Capabilities</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { icon: <FileCode size={18} strokeWidth={1.5} />, title: "OpenAPI / Swagger Specs", desc: "Automated API documentation generation and hosting using OpenAPI specifications." },
               { icon: <BookOpen size={18} strokeWidth={1.5} />, title: "Developer Portals", desc: "Stunning developer hubs with dark mode, search, and interactive tutorials." },
               { icon: <Terminal size={18} strokeWidth={1.5} />, title: "SDK Integration Guides", desc: "Comprehensive guides for integrating SDKs across JavaScript, Python, iOS, and Android." },
               { icon: <Database size={18} strokeWidth={1.5} />, title: "Architecture Diagrams", desc: "Visual breakdowns of complex data flows, cloud infrastructure and systems." },
             ].map((caseItem, i) => (
                <div key={i} className="flex flex-col gap-3 font-sans">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#0a3a40]/10 rounded-xl bg-white/40">
                     {caseItem.icon}
                  </div>
                  <h4 className="text-sm font-bold">{caseItem.title}</h4>
                  <p className="text-[12px] opacity-60 leading-relaxed font-mono">{caseItem.desc}</p>
                </div>
             ))}
          </div>

        </div>
      </div>
    );
  }


  if (id === 'service-social') {
    return (
      <div className="bg-[#EBEBE6] min-h-screen text-[#0a3a40] font-mono pb-20 relative pt-24">
        <div className="w-full px-6 md:px-12 lg:px-20 py-12 md:py-16">
          
          {/* Header/Nav */}
          <motion.button 
            onClick={onBack}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#93ACA7] hover:text-[#0a3a40] transition-colors group cursor-pointer mb-16 font-bold"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="relative">
              Back to Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#338f82] transition-all duration-300 group-hover:w-full opacity-50" />
            </span>
          </motion.button>

          {/* Top Section bg-[#EBEBE6]  we can remove white backgrounds, make everything a shade. actually left text is just on the background. Right side is the layout. */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16 items-start">
            
            {/* Left Text */}
            <div className="lg:w-[35%] flex flex-col pt-4">
              <div className="text-[10px] font-bold text-[#93ACA7] mb-2">03</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#338f82] font-bold mb-8">Service Detail</div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a3a40] leading-[1] mb-8 font-mono">
                SOCIAL MEDIA <br /> ADVERTISING
              </h1>
              
              <p className="text-sm md:text-base text-[#0a3a40]/70 leading-relaxed mb-10 max-w-[400px]">
                We create data-driven social media ad campaigns that capture attention, drive engagement and deliver measurable results across TikTok, X (Twitter), Instagram and beyond.
              </p>

              {/* Sub features list */}
              <div className="flex flex-col gap-6 mb-12">
                {[
                  {
                    icon: <Target size={20} className="text-[#0a3a40]" />,
                    title: "Platform Expertise",
                    desc: "Campaigns optimized for TikTok, X (Twitter), Instagram, YouTube and more."
                  },
                  {
                    icon: <BarChart size={20} className="text-[#0a3a40]" />,
                    title: "Data-Driven Strategy",
                    desc: "Advanced audience targeting, creative testing and performance optimization."
                  },
                  {
                    icon: <Megaphone size={20} className="text-[#0a3a40]" />,
                    title: "High-Impact Creatives",
                    desc: "Scroll-stopping ad creatives and AI-powered content that converts."
                  },
                  {
                    icon: <TrendingUp size={20} className="text-[#0a3a40]" />,
                    title: "Performance Tracking",
                    desc: "Real-time analytics and reporting to maximize ROI and scale what works."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg border border-[#0a3a40]/10 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0a3a40] mb-1">{item.title}</h4>
                      <p className="text-[11px] text-[#0a3a40]/60 leading-relaxed max-w-[300px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <motion.button 
                  onClick={onContact}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0a3a40] text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#15464a] transition-all shadow-lg hover:shadow-xl active:shadow-md"
                >
                  Start a Project <ArrowUpRight size={14} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, bg: "rgba(255,255,255,0.7)" }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-[#0a3a40]/20 bg-transparent text-[#0a3a40] px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors"
                >
                  View Case Studies <ArrowUpRight size={14} />
                </motion.button>
              </div>
            </div>

            {/* Right Graphic area */}
            <div className="lg:w-[65%] flex flex-col gap-6">
              
              {/* Dashboard Layout */}
              <div className="w-full flex flex-col gap-6">
                 
                 {/* Top Row: Meta Cards & Audience */}
                 <div className="flex flex-col xl:flex-row gap-6">
                   <div className="flex-1 flex flex-col gap-6">
                      {/* Metric Cards - 4 in a row or 2x2. Actually the uploaded image shows: 
                          Impressions, Clicks, CTR, Conversions, ROAS all in one top row.
                      */}
                      <div className="bg-[#E2E4DE] border border-[#d2d4cf] rounded-2xl p-6">
                        <div className="text-[10px] uppercase font-bold tracking-widest text-[#0a3a40]/60 mb-6">Campaign Overview</div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                           <div className="flex flex-col gap-2">
                             <Eye size={18} className="text-[#338f82]" />
                             <div>
                               <div className="text-[10px] text-[#0a3a40]/60 uppercase font-bold tracking-widest mb-1">Impressions</div>
                               <div className="text-2xl font-bold">28.4M</div>
                               <div className="text-[10px] text-[#4ade80]">+34.6%</div>
                             </div>
                           </div>
                           <div className="flex flex-col gap-2">
                             <MousePointerClick size={18} className="text-[#338f82]" />
                             <div>
                               <div className="text-[10px] text-[#0a3a40]/60 uppercase font-bold tracking-widest mb-1">Clicks</div>
                               <div className="text-2xl font-bold">1.62M</div>
                               <div className="text-[10px] text-[#4ade80]">+28.1%</div>
                             </div>
                           </div>
                           <div className="flex flex-col gap-2">
                             <BarChart2 size={18} className="text-[#338f82]" />
                             <div>
                               <div className="text-[10px] text-[#0a3a40]/60 uppercase font-bold tracking-widest mb-1">CTR</div>
                               <div className="text-2xl font-bold">5.69%</div>
                               <div className="text-[10px] text-[#4ade80]">+15.3%</div>
                             </div>
                           </div>
                           <div className="flex flex-col gap-2">
                             <DollarSign size={18} className="text-[#338f82]" />
                             <div>
                               <div className="text-[10px] text-[#0a3a40]/60 uppercase font-bold tracking-widest mb-1">Conversions</div>
                               <div className="text-2xl font-bold">38.7K</div>
                               <div className="text-[10px] text-[#4ade80]">+42.8%</div>
                             </div>
                           </div>
                           <div className="flex flex-col gap-2">
                             <PieChart size={18} className="text-[#338f82]" />
                             <div>
                               <div className="text-[10px] text-[#0a3a40]/60 uppercase font-bold tracking-widest mb-1">ROAS</div>
                               <div className="text-2xl font-bold">4.32x</div>
                               <div className="text-[10px] text-[#4ade80]">+29.7%</div>
                             </div>
                           </div>
                        </div>
                      </div>

                      {/* Line Chart & Platform Breakdown */}
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-2/3 bg-[#E2E4DE] border border-[#d2d4cf] rounded-2xl p-6 relative h-[250px]">
                           <div className="text-[10px] uppercase font-bold tracking-widest text-[#0a3a40]/60 mb-6">Performance Over Time</div>
                           {/* Legend */}
                           <div className="flex items-center gap-4 text-[9px] font-bold text-[#0a3a40]/60 mb-6">
                             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#15464a]" /> Impressions</div>
                             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[#338f82]" /> Clicks</div>
                             <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-400" /> Conversions</div>
                           </div>
                           {/* Chart Lines (SVGs) */}
                           <div className="absolute inset-x-6 bottom-8 top-28">
                             {/* Grid Lines */}
                             <div className="w-full h-full flex flex-col justify-between">
                               {[8,6,4,2,0].map(y => (
                                 <div key={y} className="flex items-center w-full gap-2">
                                   <span className="text-[9px] text-[#0a3a40]/40 w-3">{y}M</span>
                                   <div className="h-[1px] bg-[#0a3a40]/5 flex-1" />
                                 </div>
                               ))}
                             </div>
                             {/* Data Lines */}
                             <svg className="absolute top-0 right-0 bottom-[14px] left-6 w-[calc(100%-24px)] h-[calc(100%-14px)]" preserveAspectRatio="none">
                               <path d="M 0 80 Q 20 60 40 70 T 80 50 T 120 60 T 160 30 T 200 40 T 240 20 T 280 10 T 320 0" fill="none" stroke="#15464a" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                               <path d="M 0 110 Q 20 90 40 100 T 80 90 T 120 95 T 160 80 T 200 85 T 240 60 T 280 50 T 320 40" fill="none" stroke="#338f82" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                               <path d="M 0 130 Q 20 120 40 125 T 80 120 T 120 120 T 160 110 T 200 115 T 240 100 T 280 90 T 320 80" fill="none" stroke="#f87171" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                             </svg>
                             {/* X Axis Labels */}
                             <div className="absolute -bottom-6 left-6 right-0 flex justify-between text-[9px] text-[#0a3a40]/40 font-mono">
                               <span>May 01</span><span>May 07</span><span>May 13</span><span>May 19</span><span>May 25</span><span>May 31</span>
                             </div>
                           </div>
                        </div>

                        <div className="md:w-1/3 bg-[#E2E4DE] border border-[#d2d4cf] rounded-2xl p-6">
                           <div className="text-[10px] uppercase font-bold tracking-widest text-[#0a3a40]/60 mb-6">Platform Breakdown</div>
                           <div className="flex flex-col gap-4 text-xs font-bold font-sans">
                             <div className="flex items-center gap-3">
                               <div className="w-4 flex justify-center"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></div>
                               <span className="flex-1 text-[#0a3a40]/80">TikTok</span>
                               <div className="w-16 h-1.5 bg-[#d2d4cf] rounded-full overflow-hidden shrink-0"><div className="h-full bg-[#15464a] w-[38%]" /></div>
                               <span>38%</span>
                             </div>
                             <div className="flex items-center gap-3">
                               <div className="w-4 flex justify-center"><Instagram size={14} /></div>
                               <span className="flex-1 text-[#0a3a40]/80">Instagram</span>
                               <div className="w-16 h-1.5 bg-[#d2d4cf] rounded-full overflow-hidden shrink-0"><div className="h-full bg-[#15464a] w-[29%]" /></div>
                               <span>29%</span>
                             </div>
                             <div className="flex items-center gap-3">
                               <div className="w-4 flex justify-center">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.46-2.46L20 4"/></svg>
                               </div>
                               <span className="flex-1 text-[#0a3a40]/80">X (Twitter)</span>
                               <div className="w-16 h-1.5 bg-[#d2d4cf] rounded-full overflow-hidden shrink-0"><div className="h-full bg-[#15464a] w-[18%]" /></div>
                               <span>18%</span>
                             </div>
                             <div className="flex items-center gap-3">
                               <div className="w-4 flex justify-center"><Youtube size={14} /></div>
                               <span className="flex-1 text-[#0a3a40]/80">YouTube</span>
                               <div className="w-16 h-1.5 bg-[#d2d4cf] rounded-full overflow-hidden shrink-0"><div className="h-full bg-[#15464a] w-[10%]" /></div>
                               <span>10%</span>
                             </div>
                             <div className="flex items-center gap-3">
                               <div className="w-4 flex justify-center"><Settings size={14} /></div>
                               <span className="flex-1 text-[#0a3a40]/80">Others</span>
                               <div className="w-16 h-1.5 bg-[#d2d4cf] rounded-full overflow-hidden shrink-0"><div className="h-full bg-[#15464a] w-[5%]" /></div>
                               <span>5%</span>
                             </div>
                           </div>
                        </div>
                      </div>
                   </div>

                   {/* Right Side: Audience Insights */}
                   <div className="xl:w-[240px] shrink-0 bg-[#E2E4DE] border border-[#d2d4cf] rounded-2xl p-6 flex flex-col items-center">
                      <div className="text-[10px] uppercase font-bold tracking-widest text-[#0a3a40]/60 w-full mb-6">Audience Insights</div>
                      
                      {/* CSS Donut Chart */}
                      <div className="relative w-32 h-32 rounded-full mb-6 flex items-center justify-center shrink-0" 
                           style={{ background: 'conic-gradient(#15464a 0% 34%, #338f82 34% 72%, #4ade80 72% 89%, #f87171 89% 100%)' }}>
                        <div className="w-20 h-20 bg-[#E2E4DE] rounded-full"></div>
                      </div>

                      <div className="w-full flex-1 flex flex-col justify-end gap-2 text-[11px] font-bold font-sans">
                         <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#15464a]" /> 18-24</div>
                           <span>34%</span>
                         </div>
                         <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#338f82]" /> 25-34</div>
                           <span>38%</span>
                         </div>
                         <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#4ade80]" /> 35-44</div>
                           <span>17%</span>
                         </div>
                         <div className="flex items-center justify-between">
                           <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-[#f87171]" /> 45+</div>
                           <span>11%</span>
                         </div>
                      </div>
                      
                      <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-2 mt-6 pt-4 border-t border-[#d2d4cf]">
                         <div className="flex flex-col gap-1">
                           <span className="text-[9px] text-[#0a3a40]/50 font-bold uppercase tracking-widest">Top Loc</span>
                           <span className="text-[10px] font-bold">US</span>
                         </div>
                         <div className="flex flex-col gap-1">
                           <span className="text-[9px] text-[#0a3a40]/50 font-bold uppercase tracking-widest">Interest</span>
                           <span className="text-[10px] font-bold">Tech</span>
                         </div>
                         <div className="flex flex-col gap-1">
                           <span className="text-[9px] text-[#0a3a40]/50 font-bold uppercase tracking-widest">Gender</span>
                           <span className="text-[10px] font-bold">56% M</span>
                         </div>
                      </div>
                   </div>
                 </div>

                 {/* Bottom Row: Previews */}
                 <div className="bg-[#E2E4DE] border border-[#d2d4cf] rounded-2xl p-6">
                   <div className="text-[10px] uppercase font-bold tracking-widest text-[#0a3a40]/60 mb-6">Creative Previews</div>
                   
                   <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                      {[
                        { 
                          img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop", 
                          platform: "TikTok", 
                          icon: <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>,
                           views: "2.4M", likes: "142K", comments: "8.7K"
                        },
                        { 
                          img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=2672&auto=format&fit=crop", 
                          platform: "Instagram", 
                          icon: <Instagram size={12} />,
                          views: "1.8M", likes: "97K", comments: "5.3K"
                        },
                        { 
                          img: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2715&auto=format&fit=crop", 
                          platform: "X (Twitter)", 
                          icon: <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733-16z"/><path d="M4 20l6.768-6.768m2.46-2.46L20 4"/></svg>,
                          views: "1.2M", likes: "85K", comments: "3.9K"
                        },
                        { 
                          img: "https://images.unsplash.com/photo-1505156868547-9b49f4df4e04?q=80&w=2516&auto=format&fit=crop", 
                          platform: "YouTube", 
                          icon: <Youtube size={12} />,
                          views: "950K", likes: "62K", comments: "2.1K"
                        }
                      ].map((vid, idx) => (
                        <div key={idx} className="flex flex-col gap-2">
                           <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-md group cursor-pointer">
                             <img src={vid.img} alt={vid.platform} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                             <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                             <div className="absolute top-2 left-2 bg-black/40 backdrop-blur-md px-2 py-1 rounded-[6px] text-white flex items-center gap-1.5 text-[9px] font-bold font-sans">
                               {vid.icon} {vid.platform}
                             </div>
                             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/40">
                               <PlaySquare size={12} fill="white" className="text-white ml-0.5" />
                             </div>
                           </div>
                           <div className="flex items-center gap-3 text-[10px] font-bold text-[#0a3a40]/70 px-1">
                             <span className="flex items-center gap-1"><Eye size={12} className="text-[#0a3a40]/40" /> {vid.views}</span>
                             <span className="flex items-center gap-1"><div className="w-3 flex justify-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg></div> {vid.likes}</span>
                             <span className="flex items-center gap-1"><div className="w-3 flex justify-center"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></div> {vid.comments}</span>
                           </div>
                        </div>
                      ))}
                   </div>
                 </div>

              </div>

            </div>
          </div>

          <div className="w-full h-[1px] bg-[#0a3a40]/10 mb-12" />

          {/* Use Cases Section -> Our Approach */}
          <div className="flex justify-between items-end mb-8">
             <h3 className="text-xl font-bold">Our Approach</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-6 relative">
             <div className="absolute top-12 lg:top-14 inset-x-12 h-[1px] bg-[#0a3a40]/10 border-t border-dashed border-[#0a3a40]/30 hidden xl:block z-0" />
             {[
               { icon: <Target size={18} strokeWidth={1.5} />, title: "Research & Strategy", desc: "We analyze your audience, market and competitors to craft a winning strategy." },
               { icon: <User size={18} strokeWidth={1.5} />, title: "Audience Targeting", desc: "Advanced targeting ensures your ads reach the right people at the right time." },
               { icon: <Edit size={18} strokeWidth={1.5} />, title: "Creative Production", desc: "We create high-converting visuals and videos that stop the scroll." },
               { icon: <Megaphone size={18} strokeWidth={1.5} />, title: "Campaign Launch", desc: "Precision launching across multiple platforms with A/B testing." },
               { icon: <BarChart2 size={18} strokeWidth={1.5} />, title: "Optimize & Scale", desc: "We optimize in real-time and scale the campaigns that deliver ROI." },
               { icon: <PieChart size={18} strokeWidth={1.5} />, title: "Report & Refine", desc: "Transparent reporting and insights to keep improving performance." },
             ].map((step, i) => (
                <div key={i} className="flex flex-col gap-3 relative z-10 bg-[#EBEBE6]">
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] font-bold text-[#0a3a40]/40 font-mono tracking-widest bg-[#EBEBE6] pr-2">{(i+1).toString().padStart(2, '0')}</span>
                    <div className="w-10 h-10 flex items-center justify-center border border-[#0a3a40]/10 rounded-xl bg-white/40 xl:mr-auto">
                       {step.icon}
                    </div>
                  </div>
                  <h4 className="text-[11px] font-bold mt-2">{step.title}</h4>
                  <p className="text-[10px] opacity-60 leading-relaxed max-w-[200px]">{step.desc}</p>
                </div>
             ))}
          </div>

        </div>
      </div>
    );
  }

  if (id === 'service-gis') {
    return (
      <div className="bg-[#EBEBE6] min-h-screen text-[#0a3a40] font-mono pb-20 relative pt-24">
        <div className="w-full px-6 md:px-12 lg:px-20 py-12 md:py-16">
          
          {/* Header/Nav */}
          <motion.button 
            onClick={onBack}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#93ACA7] hover:text-[#0a3a40] transition-colors group cursor-pointer mb-16 font-bold"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="relative">
              Back to Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#338f82] transition-all duration-300 group-hover:w-full opacity-50" />
            </span>
          </motion.button>

          {/* Top Section */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16 items-start">
            
            {/* Left Text */}
            <div className="lg:w-[35%] flex flex-col pt-4">
              <div className="text-[10px] font-bold text-[#93ACA7] mb-2">03</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#338f82] font-bold mb-8">Service Detail</div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a3a40] leading-[1] mb-8 font-mono">
                GIS MAPPING
              </h1>
              
              <p className="text-sm md:text-base text-[#0a3a40]/70 leading-relaxed mb-10 max-w-[400px]">
                We build intelligent geospatial solutions that turn location data into actionable insights. From interactive mapping and spatial analysis to real-time monitoring and asset management - powered by accurate data and advanced GIS technology.
              </p>

              {/* Sub features list */}
              <div className="flex flex-col gap-6 mb-12">
                {[
                  {
                    icon: <Layers size={20} className="text-[#0a3a40]" />,
                    title: "Interactive Mapping",
                    desc: "Beautiful, responsive maps with multiple layers, filters and real-time data visualization."
                  },
                  {
                    icon: <Crosshair size={20} className="text-[#0a3a40]" />,
                    title: "Spatial Analysis",
                    desc: "Advanced geospatial analysis tools for pattern detection, proximity, routing and optimization."
                  },
                  {
                    icon: <Satellite size={20} className="text-[#0a3a40]" />,
                    title: "Real-time Monitoring",
                    desc: "Live tracking, sensor integrations and alerts for critical spatial events."
                  },
                  {
                    icon: <Database size={20} className="text-[#0a3a40]" />,
                    title: "Data Management",
                    desc: "Organize, process and visualize large spatial datasets with accuracy and reliability."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg border border-[#0a3a40]/10 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0a3a40] mb-1">{item.title}</h4>
                      <p className="text-[11px] text-[#0a3a40]/60 leading-relaxed max-w-[300px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <motion.button 
                  onClick={onContact}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0a3a40] text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#15464a] transition-all shadow-lg hover:shadow-xl active:shadow-md"
                >
                  Start a Project <ArrowUpRight size={14} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, bg: "rgba(255,255,255,0.7)" }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-[#0a3a40]/20 bg-transparent text-[#0a3a40] px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors"
                >
                  View Case Studies <ArrowUpRight size={14} />
                </motion.button>
              </div>
            </div>

            {/* Right Graphic area */}
            <div className="w-full lg:w-[65%] flex flex-col gap-6">
              
              {/* Graphic container */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full bg-[#161a1d] rounded-[24px] overflow-hidden shadow-2xl border border-[#23282c] text-white relative flex flex-col xl:flex-row min-h-[400px] md:min-h-[550px]"
              >
                 {/* Left Sidebar */}
                 <div className="w-full h-12 xl:w-14 xl:h-auto bg-[#1e2327] border-b xl:border-b-0 xl:border-r border-[#2a3036] flex flex-row xl:flex-col items-center py-2 xl:py-6 px-4 xl:px-0 gap-6 shrink-0 z-20 relative">
                   <Layers size={18} className="text-[#338f82]" />
                   <BarChart2 size={18} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
                   <Database size={18} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
                   <Pencil size={18} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
                   <MapPin size={18} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
                   <Bell size={18} className="text-white/40 hover:text-white transition-colors cursor-pointer mt-auto" />
                   <Settings size={18} className="text-white/40 hover:text-white transition-colors cursor-pointer" />
                 </div>

                 {/* Map Area */}
                 <div className="flex-1 relative bg-[#0a0f12]">
                   <img 
                     src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2674&auto=format&fit=crop"
                     alt="Map"
                     className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 grayscale"
                     style={{ filter: "invert(1) hue-rotate(180deg) opacity(0.4)" }}
                   />
                   
                   {/* Map Overlays (Nodes & Lines) */}
                   <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      {/* Grid lines */}
                      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                      
                      {/* Glowing Lines & Shapes */}
                      <svg className="absolute inset-0 w-full h-full" overflow="visible">
                        <path d="M 100 200 L 250 150 L 350 280 L 200 400 Z" fill="rgba(74, 222, 128, 0.05)" stroke="rgba(74, 222, 128, 0.4)" strokeWidth="1" strokeDasharray="4 4" />
                        <circle cx="450" cy="250" r="60" fill="rgba(59, 130, 246, 0.05)" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="1" />
                        
                        {/* Connecting Lines */}
                        <path d="M 250 150 L 450 120 L 550 200" fill="none" stroke="rgba(255, 99, 132, 0.5)" strokeWidth="1.5" />
                        <path d="M 350 280 L 400 240 L 450 250" fill="none" stroke="rgba(59, 130, 246, 0.5)" strokeWidth="1.5" />
                        <path d="M 200 400 L 300 450 L 500 400" fill="none" stroke="rgba(245, 158, 11, 0.5)" strokeWidth="1.5" />
                      </svg>

                      {/* Nodes */}
                      <div className="absolute top-[145px] left-[245px] w-2.5 h-2.5 rounded-full bg-[#4ade80] shadow-[0_0_10px_#4ade80]" />
                      <div className="absolute top-[115px] left-[445px] w-2.5 h-2.5 rounded-full bg-[#ff6384] shadow-[0_0_10px_#ff6384]" />
                      <div className="absolute top-[245px] left-[445px] w-2.5 h-2.5 rounded-full bg-[#3b82f6] shadow-[0_0_10px_#3b82f6]" />
                      <div className="absolute top-[235px] left-[395px] w-2 h-2 rounded-full bg-[#3b82f6]" />
                      <div className="absolute top-[275px] left-[345px] w-2 h-2 rounded-full bg-[#4ade80]" />
                      <div className="absolute top-[395px] left-[195px] w-2.5 h-2.5 rounded-full bg-[#f59e0b] shadow-[0_0_10px_#f59e0b]" />
                      <div className="absolute top-[445px] left-[295px] w-2 h-2 rounded-full bg-[#f59e0b]" />

                      {/* Labels */}
                      <div className="absolute top-[130px] left-[150px] text-[9px] font-bold tracking-widest text-white/70">RIVERSIDE<br/>DISTRICT</div>
                      <div className="absolute top-[90px] left-[460px] text-[9px] font-bold tracking-widest text-white/70">HARBORVIEW</div>
                      <div className="absolute top-[200px] left-[560px] text-[9px] font-bold tracking-widest text-white/70">EASTPOINT</div>
                      <div className="absolute top-[330px] left-[400px] text-[9px] font-bold tracking-widest text-white/70">SOUTHPORT</div>
                   </div>

                   {/* Top Title Overlay */}
                   <div className="absolute top-6 left-6 z-10">
                     <h3 className="text-white font-bold mb-1">GeoVista Pro</h3>
                     <div className="text-[10px] text-white/50">Geospatial Intelligence Platform</div>
                   </div>

                   {/* Map Controls */}
                   <div className="absolute bottom-10 right-6 flex flex-col gap-2 z-10">
                     <div className="bg-[#1e2327]/80 backdrop-blur border border-[#2a3036] rounded-lg overflow-hidden flex flex-col">
                       <button className="p-2 hover:bg-white/10 transition-colors"><Plus size={14} /></button>
                       <div className="h-[1px] bg-[#2a3036]" />
                       <button className="p-2 hover:bg-white/10 transition-colors"><Minus size={14} /></button>
                     </div>
                     <button className="bg-[#1e2327]/80 backdrop-blur border border-[#2a3036] rounded-lg p-2 hover:bg-white/10 transition-colors">
                       <Crosshair size={14} />
                     </button>
                   </div>

                   {/* Bottom Coord Bar */}
                   <div className="absolute bottom-0 inset-x-0 h-8 bg-[#161a1d]/90 backdrop-blur border-t border-[#2a3036] flex items-center px-4 text-[9px] text-white/40 font-mono gap-4 z-10">
                     <span>34.0522° N, 118.2437° W</span>
                     <span className="w-[1px] h-3 bg-[#2a3036]" />
                     <span>Zoom: 12</span>
                     <span className="w-[1px] h-3 bg-[#2a3036]" />
                     <span>EPSG:4326</span>
                   </div>
                 </div>

                 {/* Right Sidebar */}
                 <div className="w-full xl:w-[280px] bg-[#161a1d] border-t xl:border-t-0 xl:border-l border-[#2a3036] flex flex-col shrink-0 z-20 overflow-hidden">
                    <div className="p-5 flex-1 overflow-y-auto custom-scrollbar">
                      
                      {/* Layers Section */}
                      <div className="mb-6">
                        <h4 className="text-[11px] font-bold text-white mb-4">Layers</h4>
                        <div className="flex flex-col gap-3">
                          {[
                            { name: "Road Network", color: "#ff6384" },
                            { name: "Buildings", color: "#3b82f6" },
                            { name: "Water Bodies", color: "#60a5fa" },
                            { name: "Green Areas", color: "#4ade80" },
                            { name: "Infrastructure", color: "#f59e0b" },
                            { name: "Sensors", color: "#a78bfa" }
                          ].map((layer, i) => (
                            <div key={i} className="flex items-center justify-between text-[11px] text-white/70">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input type="checkbox" defaultChecked className="accent-[#338f82] bg-transparent border-white/20 rounded-sm" />
                                {layer.name}
                              </label>
                              <div className="w-4 h-[2px]" style={{ backgroundColor: layer.color }} />
                            </div>
                          ))}
                          <div className="flex items-center justify-between text-[11px] text-white/70">
                            <label className="flex items-center gap-2 cursor-pointer">
                              <input type="checkbox" className="accent-[#338f82] bg-transparent border-white/20 rounded-sm" />
                              Alerts
                            </label>
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                          </div>
                        </div>
                      </div>

                      <div className="w-full h-[1px] bg-[#2a3036] mb-6" />

                      {/* Analysis Tools */}
                      <div className="mb-6">
                         <h4 className="text-[11px] font-bold text-white mb-4">Analysis Tools</h4>
                         <div className="grid grid-cols-2 gap-2">
                           <button className="bg-[#1e2327] hover:bg-[#2a3036] border border-[#2a3036] rounded-md py-2 px-2 flex items-center gap-2 text-[10px] text-white/70 transition-colors">
                             <CircleDot size={12} className="text-white/40" /> Buffer
                           </button>
                           <button className="bg-[#1e2327] hover:bg-[#2a3036] border border-[#2a3036] rounded-md py-2 px-2 flex items-center gap-2 text-[10px] text-white/70 transition-colors">
                             <Plus size={12} className="text-white/40" /> Intersect
                           </button>
                           <button className="bg-[#1e2327] hover:bg-[#2a3036] border border-[#2a3036] rounded-md py-2 px-2 flex items-center gap-2 text-[10px] text-white/70 transition-colors">
                             <Triangle size={12} className="text-white/40" /> Heatmap
                           </button>
                           <button className="bg-[#1e2327] hover:bg-[#2a3036] border border-[#2a3036] rounded-md py-2 px-2 flex items-center gap-2 text-[10px] text-white/70 transition-colors">
                             <Crosshair size={12} className="text-white/40" /> Proximity
                           </button>
                           <button className="bg-[#1e2327] hover:bg-[#2a3036] border border-[#2a3036] rounded-md py-2 px-2 flex items-center gap-2 text-[10px] text-white/70 transition-colors">
                             <Waypoints size={12} className="text-white/40" /> Route
                           </button>
                           <button className="bg-[#1e2327] hover:bg-[#2a3036] border border-[#2a3036] rounded-md py-2 px-2 flex items-center gap-2 text-[10px] text-white/70 transition-colors">
                             <Layers size={12} className="text-white/40" /> Density
                           </button>
                         </div>
                      </div>

                      <div className="w-full h-[1px] bg-[#2a3036] mb-6" />

                      {/* Live Feed */}
                      <div>
                         <h4 className="text-[11px] font-bold text-white mb-4">Live Feed</h4>
                         <div className="flex flex-col gap-3">
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-white/70">Traffic Sensor 21</span>
                              <span className="text-[#4ade80] flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" /> Online</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-white/70">Air Quality Monitor 7</span>
                              <span className="text-[#4ade80] flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" /> Online</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-white/70">Water Level Gauge 3</span>
                              <span className="text-yellow-400 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" /> Warning</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px]">
                              <span className="text-white/70">Weather Station 12</span>
                              <span className="text-[#4ade80] flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" /> Online</span>
                            </div>
                         </div>
                      </div>

                    </div>
                 </div>
              </motion.div>

              {/* Stats below graphic */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[
                   { icon: <MapPin size={20} className="text-[#0a3a40]" strokeWidth={1.5} />, stat: "2.5M+", label: "Spatial Data Points", desc: "Processed Daily" },
                   { icon: <Layers size={20} className="text-[#0a3a40]" strokeWidth={1.5} />, stat: "98.7%", label: "Mapping Accuracy", desc: "Across All Layers" },
                   { icon: <Clock size={20} className="text-[#0a3a40]" strokeWidth={1.5} />, stat: "3.2x", label: "Faster Insights", desc: "With Spatial Analysis" },
                   { icon: <ShieldCheck size={20} className="text-[#0a3a40]" strokeWidth={1.5} />, stat: "99.9%", label: "System Uptime", desc: "Reliable & Secure" }
                 ].map((s, i) => (
                   <div key={i} className="bg-white/80 border border-[#0a3a40]/5 rounded-[16px] p-6 text-center md:text-left flex flex-col items-center md:items-start group hover:bg-white transition-colors">
                     <div className="w-10 h-10 rounded-full border border-[#0a3a40]/10 flex justify-center items-center mb-4">
                       {s.icon}
                     </div>
                     <h3 className="text-2xl font-bold mb-1 text-[#0a3a40]">{s.stat}</h3>
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0a3a40] mb-2">{s.label}</h4>
                     <p className="text-[10px] text-[#0a3a40]/50 leading-tight">{s.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#0a3a40]/10 mb-12" />

          {/* Use Cases Section */}
          <div className="flex justify-between items-end mb-8">
             <h3 className="text-xl font-bold">What We Deliver</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
             {[
               { icon: <Globe size={18} strokeWidth={1.5} />, title: "Custom GIS Solutions", desc: "Tailored mapping platforms for your industry, workflows and objectives." },
               { icon: <Layers size={18} strokeWidth={1.5} />, title: "Spatial Data Visualization", desc: "Transform complex location data into clear, interactive visual maps." },
               { icon: <LineChart size={18} strokeWidth={1.5} />, title: "Location Intelligence", desc: "Unlock patterns and trends to drive smarter business decisions." },
               { icon: <Smartphone size={18} strokeWidth={1.5} />, title: "Field & Asset Tracking", desc: "Track assets, teams and operations in real-time with precision." },
               { icon: <Cloud size={18} strokeWidth={1.5} />, title: "Scalable & Secure", desc: "Enterprise-grade infrastructure built for performance and security." },
             ].map((caseItem, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#0a3a40]/10 rounded-xl bg-white/40">
                     {caseItem.icon}
                  </div>
                  <h4 className="text-[11px] font-bold">{caseItem.title}</h4>
                  <p className="text-[10px] opacity-60 leading-relaxed">{caseItem.desc}</p>
                </div>
             ))}
          </div>

        </div>
      </div>
    );
  }


  if (id === 'service-animation') {
    return (
      <div className="bg-[#EBEBE6] min-h-screen text-[#0a3a40] font-mono pb-20 relative pt-24">
        <div className="w-full px-6 md:px-12 lg:px-20 py-12 md:py-16">
          
          {/* Header/Nav */}
          <motion.button 
            onClick={onBack}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#93ACA7] hover:text-[#0a3a40] transition-colors group cursor-pointer mb-16 font-bold"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="relative">
              Back to Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#338f82] transition-all duration-300 group-hover:w-full opacity-50" />
            </span>
          </motion.button>

          {/* Top Section */}
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16 items-start">
            
            {/* Left Text */}
            <div className="lg:w-[35%] flex flex-col pt-4">
              <div className="text-[10px] font-bold text-[#93ACA7] mb-2">03</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#338f82] font-bold mb-8">Service Detail</div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a3a40] leading-[1] mb-8 font-mono">
                AI ANIMATION
              </h1>
              
              <p className="text-sm md:text-base text-[#0a3a40]/70 leading-relaxed mb-10 max-w-[400px]">
                We craft cinematic AI animations and visual experiences that bring ideas to life. From product stories and commercials to social content and concept videos - powered by next-gen generative AI.
              </p>

              {/* Sub features list */}
              <div className="flex flex-col gap-6 mb-12">
                {[
                  {
                    icon: <Wand2 size={20} className="text-[#0a3a40]" />,
                    title: "AI-Powered Creativity",
                    desc: "Leverage advanced AI models to generate stunning visuals, environments, characters and motion."
                  },
                  {
                    icon: <Clapperboard size={20} className="text-[#0a3a40]" />,
                    title: "Cinematic Quality",
                    desc: "Hollywood-grade lighting, composition and storytelling for every frame."
                  },
                  {
                    icon: <Zap size={20} className="text-[#0a3a40]" />,
                    title: "Fast & Scalable",
                    desc: "Produce high-quality animations in a fraction of the traditional time."
                  },
                  {
                    icon: <SlidersHorizontal size={20} className="text-[#0a3a40]" />,
                    title: "Custom for Your Brand",
                    desc: "Tailored styles, characters and scenes that match your brand identity."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg border border-[#0a3a40]/10 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0a3a40] mb-1">{item.title}</h4>
                      <p className="text-[11px] text-[#0a3a40]/60 leading-relaxed max-w-[300px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <motion.button 
                  onClick={onContact}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0a3a40] text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#15464a] transition-all shadow-lg hover:shadow-xl active:shadow-md"
                >
                  Start a Project <ArrowUpRight size={14} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, bg: "rgba(255,255,255,0.7)" }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-[#0a3a40]/20 bg-transparent text-[#0a3a40] px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors"
                >
                  View Showreel <PlaySquare size={14} />
                </motion.button>
              </div>
            </div>

            {/* Right Graphic area */}
            <div className="w-full lg:w-[65%] flex flex-col gap-6">
              
              {/* Main Video Player container */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full aspect-video bg-[#0a0a0a] rounded-2xl overflow-hidden shadow-2xl relative min-h-[240px]"
              >
                <img 
                  src="https://images.unsplash.com/photo-1541892079-24ecfcab0cda?q=80&w=2670&auto=format&fit=crop"
                  alt="Futuristic Car Animation"
                  className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                />
                
                {/* Overlay gradients for text readability */}
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/80 to-transparent pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent pointer-events-none" />

                {/* Top Info */}
                <div className="absolute top-6 left-8 text-white">
                  <div className="text-[10px] text-white/60 font-mono mb-1">Featured Animation</div>
                  <div className="text-2xl font-bold font-sans mb-1">Future of Mobility</div>
                  <div className="text-[11px] font-mono text-white/80">AI-Powered Commercial</div>
                </div>

                <div className="absolute top-6 right-8">
                  <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md px-4 py-2 rounded-lg text-xs text-white transition-colors">
                    <Share2 size={12} /> Share
                  </button>
                </div>

                {/* Play Controls Bottom bar */}
                <div className="absolute bottom-6 inset-x-8 flex items-center gap-4 text-white">
                  <button className="hover:text-white/80 transition-colors">
                    <PlaySquare size={20} className="fill-white" />
                  </button>
                  
                  {/* Progress Bar */}
                  <div className="flex-1 flex items-center gap-4">
                    <div className="flex-1 h-1 bg-white/20 rounded-full relative overflow-hidden">
                      <div className="absolute inset-y-0 left-0 w-[26%] bg-red-600 rounded-full"></div>
                    </div>
                    <div className="text-[10px] font-mono w-20 text-center">
                      0:24 / 1:32
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <button className="hover:text-white/80 transition-colors"><Volume2 size={16} /></button>
                    <button className="hover:text-white/80 transition-colors"><ClosedCaption size={16} /></button>
                    <button className="hover:text-white/80 transition-colors"><Settings size={16} /></button>
                    <button className="hover:text-white/80 transition-colors"><Maximize size={16} /></button>
                  </div>
                </div>
              </motion.div>

              {/* More Animations Thumbnails */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">More Animations</h3>
                  <motion.button 
                    whileHover={{ opacity: 0.7, x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-1 transition-all"
                  >
                    View All <ArrowRight size={12} />
                  </motion.button>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { title: "Beyond Horizons", subtitle: "Cinematic Short", time: "1:08", img: "https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=2669&auto=format&fit=crop" },
                    { title: "Product Launch", subtitle: "Commercial", time: "0:45", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2670&auto=format&fit=crop" },
                    { title: "Echoes of Nature", subtitle: "Concept Film", time: "1:15", img: "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?q=80&w=2574&auto=format&fit=crop" },
                    { title: "Neon Dreams", subtitle: "AI Visual Story", time: "0:52", img: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?q=80&w=2670&auto=format&fit=crop" }
                  ].map((video, idx) => (
                    <div key={idx} className="group cursor-pointer">
                      <div className="relative aspect-video rounded-xl overflow-hidden mb-3">
                        <img src={video.img} alt={video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 mix-blend-luminosity opacity-80" />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        <div className="absolute bottom-2 left-2 w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                           <PlaySquare size={10} className="text-white fill-white ml-0.5" />
                        </div>
                        <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded text-[8px] font-mono text-white bg-black/60 backdrop-blur-sm">
                          {video.time}
                        </div>
                      </div>
                      <h4 className="text-xs font-bold font-mono">{video.title}</h4>
                      <div className="text-[10px] text-[#0a3a40]/60 mt-0.5">{video.subtitle}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          <div className="w-full h-[1px] bg-[#0a3a40]/10 mb-12" />

          {/* Use Cases Section */}
          <div className="flex justify-between items-end mb-8">
             <h3 className="text-xl font-bold">What We Create</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
             {[
               { icon: <PlaySquare size={18} strokeWidth={1.5} />, title: "AI Commercials", desc: "High-impact ads and brand films that captivate and convert." },
               { icon: <Film size={18} strokeWidth={1.5} />, title: "AI Animation", desc: "Character animation, motion graphics and cinematic sequences." },
               { icon: <Box size={18} strokeWidth={1.5} />, title: "Product Visualization", desc: "Bring products to life with photorealistic AI-generated animations." },
               { icon: <Smartphone size={18} strokeWidth={1.5} />, title: "Social Content", desc: "Short-form videos and reels optimized for every platform." },
               { icon: <Sparkles size={18} strokeWidth={1.5} />, title: "Concept & Storytelling", desc: "Transform ideas into visual stories that inspire action." },
             ].map((caseItem, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#0a3a40]/10 rounded-xl bg-white/40">
                     {caseItem.icon}
                  </div>
                  <h4 className="text-[11px] font-bold">{caseItem.title}</h4>
                  <p className="text-[10px] opacity-60 leading-relaxed">{caseItem.desc}</p>
                </div>
             ))}
          </div>

        </div>
      </div>
    );
  }

  if (id === 'service-automation') {
    return (
      <div className="bg-[#EBEBE6] min-h-screen text-[#0a3a40] font-mono pb-20 relative pt-24">
        <div className="w-full px-6 md:px-12 lg:px-20 py-12 md:py-16">
          
          {/* Header/Nav */}
          <motion.button 
            onClick={onBack}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#93ACA7] hover:text-[#0a3a40] transition-colors group cursor-pointer mb-16 font-bold"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="relative">
              Back to Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#338f82] transition-all duration-300 group-hover:w-full opacity-50" />
            </span>
          </motion.button>

          {/* Top Section */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-16 items-start">
            
            {/* Left Text */}
            <div className="lg:w-[40%] flex flex-col pt-4">
              <div className="text-[10px] font-bold text-[#93ACA7] mb-2">03</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#338f82] font-bold mb-8">Service Detail</div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0a3a40] leading-[1] mb-8 font-mono">
                INTELLIGENT<br />AUTOMATION
              </h1>
              
              <p className="text-sm md:text-base text-[#0a3a40]/70 leading-relaxed mb-10 max-w-[400px]">
                We design AI-powered agents and workflow automation systems that eliminate manual work, orchestrate complex processes, and deliver intelligent outcomes at scale.
              </p>

              {/* Sub features list */}
              <div className="flex flex-col gap-6 mb-12">
                {[
                  {
                    icon: <BrainCircuit size={20} className="text-[#0a3a40]" />,
                    title: "AI Agents",
                    desc: "Autonomous agents that understand context, make decisions, and take action."
                  },
                  {
                    icon: <Share2 size={20} className="text-[#0a3a40]" />,
                    title: "Workflow Orchestration",
                    desc: "End-to-end process automation with conditional logic, approvals and integrations."
                  },
                  {
                    icon: <Database size={20} className="text-[#0a3a40]" />,
                    title: "Data Intelligence",
                    desc: "Extract, transform and analyze data to drive smarter decisions in real time."
                  },
                  {
                    icon: <Zap size={20} className="text-[#0a3a40]" />,
                    title: "System Integrations",
                    desc: "Connect with your tools, APIs, databases and third-party services seamlessly."
                  },
                  {
                    icon: <Shield size={20} className="text-[#0a3a40]" />,
                    title: "Secure & Reliable",
                    desc: "Built with enterprise-grade security, monitoring and error handling."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg border border-[#0a3a40]/10 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0a3a40] mb-1">{item.title}</h4>
                      <p className="text-[11px] text-[#0a3a40]/60 leading-relaxed max-w-[300px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <motion.button 
                  onClick={onContact}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0a3a40] text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#15464a] transition-all shadow-lg hover:shadow-xl active:shadow-md"
                >
                  Start a Project <ArrowUpRight size={14} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, bg: "rgba(255,255,255,0.7)" }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-[#0a3a40]/20 bg-transparent text-[#0a3a40] px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors"
                >
                  View Case Studies <ArrowUpRight size={14} />
                </motion.button>
              </div>
            </div>

            {/* Right Graphic area */}
            <div className="w-full lg:w-[60%] flex flex-col gap-6">
              
              {/* Graphic container */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full bg-[#0d161a] rounded-[24px] overflow-hidden shadow-2xl border border-[#1a2d33] p-6 sm:p-8 text-white relative flex flex-col min-h-[400px] md:min-h-[500px]"
              >
                 <div className="flex justify-between items-start mb-16">
                    <div>
                      <div className="flex items-center gap-2 font-mono text-sm font-bold mb-2">
                        Automation Workflow
                        <span className="flex items-center gap-1 text-[#4ade80] text-xs"><span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" /> Live</span>
                      </div>
                      <div className="text-[11px] text-white/50">AI agent orchestrating customer onboarding</div>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                      whileTap={{ scale: 0.95 }}
                      className="border border-white/20 px-4 py-2 rounded-lg text-xs transition-colors flex items-center gap-2"
                    >
                      <span className="text-white/50">{'>_'}</span> View Logs
                    </motion.button>
                 </div>

                 {/* Flowchart (simplified representation) */}
                 <div className="flex-1 relative mb-12">
                   <div className="absolute inset-x-0 top-1/2 -mt-[0.5px] border-t border-dashed border-[#4ade80]/30 hidden md:block" />
                   
                   <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 relative z-10 w-full px-4 overflow-x-auto pb-4 custom-scrollbar">
                      
                      {/* Box 1 */}
                      <div className="bg-[#132025] border border-[#1a2d33] rounded-xl p-4 min-w-[160px] flex gap-3 items-start shrink-0 z-10">
                         <Zap size={16} className="text-white/40 mt-1 shrink-0" />
                         <div>
                           <div className="text-xs font-bold mb-1">Trigger</div>
                           <div className="text-[9px] text-white/50">New user sign up</div>
                         </div>
                      </div>

                      {/* Box 2 */}
                      <div className="bg-[#132025] border border-[#1a2d33] rounded-xl p-4 min-w-[160px] flex gap-3 items-start shrink-0 z-10">
                         <BrainCircuit size={16} className="text-white/40 mt-1 shrink-0" />
                         <div>
                           <div className="text-xs font-bold mb-1">AI Agent</div>
                           <div className="text-[9px] text-white/50 mb-2">Analyze user data</div>
                           <div className="text-[9px] text-[#4ade80] flex items-center gap-1"><CheckCircle size={8} /> Completed</div>
                         </div>
                      </div>

                      {/* Connectors & Branching representation (Vertical group for md+ screens) */}
                      <div className="flex flex-col gap-3 relative shrink-0 z-10">
                        {/* Box 3 */}
                        <div className="bg-[#132025] border border-[#1a2d33] rounded-xl p-4 min-w-[160px] flex gap-3 items-start relative shrink-0">
                          <Database size={16} className="text-white/40 mt-1 shrink-0" />
                           <div>
                             <div className="text-xs font-bold mb-1">Data Enrichment</div>
                             <div className="text-[9px] text-white/50 mb-2">Enrich user profile</div>
                             <div className="text-[9px] text-[#4ade80] flex items-center gap-1"><CheckCircle size={8} /> Completed</div>
                           </div>
                        </div>
                        {/* Box 4 */}
                        <div className="bg-[#132025] border border-[#1a2d33] rounded-xl p-4 min-w-[160px] flex gap-3 items-start relative shrink-0">
                           <Activity size={16} className="text-white/40 mt-1 shrink-0" />
                           <div>
                             <div className="text-xs font-bold mb-1">Decision Engine</div>
                             <div className="text-[9px] text-white/50 mb-2">Evaluate risk & rules</div>
                             <div className="text-[9px] text-[#4ade80] flex items-center gap-1"><CheckCircle size={8} /> Completed</div>
                           </div>
                        </div>
                         {/* Box 5 */}
                        <div className="bg-[#132025] border border-[#1a2d33] rounded-xl p-4 min-w-[160px] flex gap-3 items-start relative shrink-0">
                           <FileText size={16} className="text-white/40 mt-1 shrink-0" />
                           <div>
                             <div className="text-xs font-bold mb-1">Notification</div>
                             <div className="text-[9px] text-white/50 mb-2">Send welcome email</div>
                             <div className="text-[9px] text-[#4ade80] flex items-center gap-1"><CheckCircle size={8} /> Completed</div>
                           </div>
                        </div>
                      </div>

                      {/* Box 6 */}
                      <div className="bg-[#132025] border border-[#1a2d33] rounded-xl p-4 min-w-[160px] flex gap-3 items-start shrink-0 z-10">
                         <PlaySquare size={16} className="text-white/40 mt-1 shrink-0" />
                         <div>
                           <div className="text-xs font-bold mb-1">Action</div>
                           <div className="text-[9px] text-white/50 mb-2">Create user workspace</div>
                           <div className="text-[9px] text-[#4ade80] flex items-center gap-1"><CheckCircle size={8} /> Completed</div>
                         </div>
                      </div>

                      {/* Box 7 */}
                       <div className="bg-[#132025] border border-[#1a2d33] rounded-xl p-4 min-w-[160px] flex gap-3 items-start shrink-0 z-10">
                         <Database size={16} className="text-white/40 mt-1 shrink-0" />
                         <div>
                           <div className="text-xs font-bold mb-1">Update CRM</div>
                           <div className="text-[9px] text-white/50 mb-2">Sync user record</div>
                           <div className="text-[9px] text-[#4ade80] flex items-center gap-1"><CheckCircle size={8} /> Completed</div>
                         </div>
                      </div>

                   </div>
                 </div>

                 {/* Bottom area of graphic */}
                 <div className="mt-auto flex justify-end">
                   <div className="bg-[#132025] border border-[#1a2d33] rounded-xl px-4 py-3 flex flex-col gap-2 min-w-[150px]">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]"></span> Success</span>
                        <span>98.7%</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span> In Progress</span>
                        <span>1.1%</span>
                      </div>
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-400"></span> Failed</span>
                        <span>0.2%</span>
                      </div>
                   </div>
                 </div>
              </motion.div>

              {/* Stats below graphic */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[
                   { icon: <Activity size={20} className="text-[#0a3a40]" strokeWidth={1.5} />, stat: "4.5x", label: "Process Velocity", desc: "Average improvement" },
                   { icon: <Monitor size={20} className="text-[#0a3a40]" strokeWidth={1.5} />, stat: "99.2%", label: "Automation Accuracy", desc: "Reduced manual errors" },
                   { icon: <Clock size={20} className="text-[#0a3a40]" strokeWidth={1.5} />, stat: "2.8x", label: "Time Saved", desc: "Per automated workflow" },
                   { icon: <TrendingUp size={20} className="text-[#0a3a40]" strokeWidth={1.5} />, stat: "60%", label: "Cost Reduction", desc: "Operational efficiency" }
                 ].map((s, i) => (
                   <div key={i} className="bg-white/80 border border-[#0a3a40]/5 rounded-[16px] p-6 text-center md:text-left flex flex-col items-center md:items-start group hover:bg-white transition-colors">
                     <div className="w-10 h-10 rounded-full border border-[#0a3a40]/10 flex justify-center items-center mb-4">
                       {s.icon}
                     </div>
                     <h3 className="text-2xl font-bold mb-1 text-[#0a3a40]">{s.stat}</h3>
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0a3a40] mb-2">{s.label}</h4>
                     <p className="text-[10px] text-[#0a3a40]/50 leading-tight">{s.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#0a3a40]/10 mb-12" />

          {/* Use Cases Section */}
          <div className="flex justify-between items-end mb-8">
             <h3 className="text-xl font-bold">Automation Use Cases</h3>
             <motion.button 
               whileHover={{ opacity: 0.7, x: 4 }}
               whileTap={{ scale: 0.95 }}
               className="text-[10px] uppercase font-bold tracking-widest flex items-center gap-1 transition-all"
             >
               View All Use Cases <ArrowUpRight size={12} />
             </motion.button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
             {[
               { icon: <FileText size={18} strokeWidth={1.5} />, title: "Document Processing", desc: "Extract, classify and route documents with AI for faster processing." },
               { icon: <Share2 size={18} strokeWidth={1.5} />, title: "Email Automation", desc: "Automatically sort, respond and escalate important emails." },
               { icon: <User size={18} strokeWidth={1.5} />, title: "Customer Onboarding", desc: "Automate onboarding from sign up to account activation." },
               { icon: <ShoppingCart size={18} strokeWidth={1.5} />, title: "Order Processing", desc: "Validate, process and track orders across systems." },
               { icon: <Activity size={18} strokeWidth={1.5} />, title: "Data Reporting", desc: "Generate real-time reports and insights automatically." },
               { icon: <Monitor size={18} strokeWidth={1.5} />, title: "API Orchestration", desc: "Orchestrate APIs and services to build powerful automations." },
             ].map((caseItem, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#0a3a40]/10 rounded-xl bg-white/40">
                     {caseItem.icon}
                  </div>
                  <h4 className="text-[11px] font-bold">{caseItem.title}</h4>
                  <p className="text-[10px] opacity-60 leading-relaxed">{caseItem.desc}</p>
                </div>
             ))}
          </div>

        </div>
      </div>
    );
  }

  // Engineering Systems & Digital Platforms
  if (id === 'service-branding' || id === 'service-development') {
    return (
      <div className="bg-[#EBEBE6] min-h-screen text-[#0a3a40] font-mono pb-20 relative pt-24">
        <div className="w-full px-6 md:px-12 lg:px-20 py-12 md:py-16">
          
          {/* Header/Nav */}
          <motion.button 
            onClick={onBack}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.96 }}
            className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#93ACA7] hover:text-[#0a3a40] transition-colors group cursor-pointer mb-16 font-bold"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            <span className="relative">
              Back to Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#338f82] transition-all duration-300 group-hover:w-full opacity-50" />
            </span>
          </motion.button>

          {/* Top Section */}
          <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-16 items-start">
            
            {/* Left Text */}
            <div className="lg:w-[40%] flex flex-col pt-4">
              <div className="text-[10px] font-bold text-[#93ACA7] mb-2">01</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#338f82] font-bold mb-8">Service Detail</div>
              
              <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold tracking-tight text-[#0a3a40] leading-[1.1] mb-8 font-mono text-balance">
                ENGINEERING<br />SYSTEMS &<br />PLATFORMS
              </h1>
              
              <p className="text-sm md:text-base text-[#0a3a40]/70 leading-relaxed mb-10 max-w-[400px]">
                We architect and build modular, high-performance digital ecosystems. From complex web applications to native Android platforms, we focus on scalability, maintainability, and exceptional user experiences.
              </p>

              {/* Sub features list */}
              <div className="flex flex-col gap-6 mb-12">
                {[
                  {
                    icon: <Monitor size={20} className="text-[#0a3a40]" />,
                    title: "Web Applications",
                    desc: "Modern, reactive web platforms built with React, Next.js, and high-performance backends."
                  },
                  {
                    icon: <Smartphone size={20} className="text-[#0a3a40]" />,
                    title: "Mobile Platforms",
                    desc: "Scalable Android applications engineered for reliability and smooth performance."
                  },
                  {
                    icon: <Database size={20} className="text-[#0a3a40]" />,
                    title: "Scalable Infrastructure",
                    desc: "Cloud-native architectures designed to grow with your user base without friction."
                  },
                  {
                    icon: <Palette size={20} className="text-[#0a3a40]" />,
                    title: "System Thinking",
                    desc: "Designing cohesive design systems and modular components that ensure long-term agility."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-lg border border-[#0a3a40]/10 flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#0a3a40] mb-1">{item.title}</h4>
                      <p className="text-[11px] text-[#0a3a40]/60 leading-relaxed max-w-[300px]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <motion.button 
                  onClick={onContact}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#0a3a40] text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#15464a] transition-all shadow-lg hover:shadow-xl active:shadow-md"
                >
                  Start a Project <ArrowUpRight size={14} />
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, bg: "rgba(255,255,255,0.7)" }}
                  whileTap={{ scale: 0.95 }}
                  className="border border-[#0a3a40]/20 bg-transparent text-[#0a3a40] px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 transition-colors"
                >
                  Technical Specs <ArrowRight size={14} />
                </motion.button>
              </div>
            </div>

            {/* Right Graphic area */}
            <div className="w-full lg:w-[60%] flex flex-col gap-6">
              
              {/* Graphic container */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full bg-[#1a1c1e] rounded-[24px] overflow-hidden shadow-2xl border border-white/5 relative flex flex-col min-h-[400px] md:min-h-[500px]"
              >
                  {/* Laptop Mockup Header */}
                  <div className="h-10 bg-[#121416] border-b border-white/5 flex items-center px-4 gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    <div className="flex-1 flex justify-center">
                      <div className="bg-white/5 px-4 py-1 rounded text-[9px] text-white/30 font-mono">app.reliabilityiq.systems</div>
                    </div>
                  </div>

                  {/* App Interface Layout */}
                  <div className="flex-1 flex overflow-hidden">
                    {/* Sidebar */}
                    <div className="w-16 border-r border-white/5 flex flex-col items-center py-6 gap-6 bg-[#0a0a0a]">
                      <div className="w-8 h-8 rounded-lg bg-[#338f82]/20 flex items-center justify-center text-[#338f82]">
                        <Code size={18} />
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 hover:text-white/40 transition-colors cursor-pointer">
                        <Database size={18} />
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 hover:text-white/40 transition-colors cursor-pointer">
                        <Activity size={18} />
                      </div>
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 hover:text-white/40 transition-colors cursor-pointer mt-auto">
                        <Settings size={18} />
                      </div>
                    </div>

                    {/* Main Content Pane */}
                    <div className="flex-1 p-8 overflow-y-auto bg-[#0a0a0a]">
                      <div className="flex justify-between items-center mb-10 text-white">
                        <div>
                          <h3 className="text-xl font-bold mb-1 text-white">Architecture Overview</h3>
                          <div className="text-[10px] font-mono opacity-40">Status: Operational • Version: 2.4.0</div>
                        </div>
                        <div className="flex gap-2">
                           <div className="bg-[#338f82]/20 text-[#338f82] px-3 py-1 rounded-md text-[10px] font-bold border border-[#338f82]/30">Healthy</div>
                           <div className="bg-white/5 text-white/60 px-3 py-1 rounded-md text-[10px] font-bold border border-white/10">v2.4.0</div>
                        </div>
                      </div>

                      {/* Schematic Grid */}
                      <div className="grid grid-cols-3 gap-4 mb-8">
                         {[
                           { label: "Requests/sec", val: "14.2k", trend: "+12%" },
                           { label: "Avg Latency", val: "42ms", trend: "-5%" },
                           { label: "Uptime", val: "99.99%", trend: "Stable" }
                         ].map((m, idx) => (
                           <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5">
                             <div className="text-[9px] uppercase tracking-widest text-white/30 font-bold mb-2">{m.label}</div>
                             <div className="text-xl font-bold text-white mb-1">{m.val}</div>
                             <div className={`text-[9px] font-bold ${m.trend.startsWith('+') ? 'text-[#338f82]' : m.trend === 'Stable' ? 'text-white/40' : 'text-blue-400'}`}>{m.trend}</div>
                           </div>
                         ))}
                      </div>

                      {/* Visual Architecture Representation */}
                      <div className="relative border border-white/5 rounded-xl bg-white/[0.02] p-6 min-h-[150px] flex items-center justify-center overflow-hidden">
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #338f82 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
                        <div className="relative flex items-center justify-center gap-12">
                           <div className="w-12 h-12 rounded-xl border border-[#338f82]/50 bg-[#338f82]/10 flex items-center justify-center"><Monitor size={20} className="text-[#338f82]" /></div>
                           <div className="flex flex-col gap-4">
                              <div className="w-32 h-[1px] bg-gradient-to-r from-[#338f82]/50 to-transparent relative">
                                <motion.div 
                                  animate={{ x: [0, 128] }}
                                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#338f82] blur-[2px]"
                                />
                              </div>
                              <div className="w-32 h-[1px] bg-gradient-to-r from-transparent to-[#338f82]/50 relative">
                                <motion.div 
                                  animate={{ x: [128, 0] }}
                                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                  className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#338f82] blur-[2px]"
                                />
                              </div>
                           </div>
                           <div className="w-12 h-12 rounded-xl border border-[#338f82]/50 bg-[#338f82]/10 flex items-center justify-center"><Database size={20} className="text-[#338f82]" /></div>
                        </div>
                      </div>
                    </div>
                  </div>
              </motion.div>

              {/* Stats below graphic */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[
                   { icon: <Monitor size={18} className="text-[#0a3a40]" />, stat: "Fast", label: "Page Speed", desc: "Built for speed" },
                   { icon: <Code size={18} className="text-[#0a3a40]" />, stat: "Clean", label: "Code Quality", desc: "Maintainable systems" },
                   { icon: <ShieldCheck size={18} className="text-[#0a3a40]" />, stat: "Secure", label: "Architecture", desc: "Safety first" },
                   { icon: <Layers size={18} className="text-[#0a3a40]" />, stat: "Modular", label: "Design", desc: "Ready to scale" }
                 ].map((s, i) => (
                   <div key={i} className="bg-white/80 border border-[#0a3a40]/5 rounded-[16px] p-6 text-center md:text-left flex flex-col items-center md:items-start group hover:bg-white transition-colors">
                     <div className="w-8 h-8 rounded-full border border-[#0a3a40]/10 flex justify-center items-center mb-4">
                       {s.icon}
                     </div>
                     <h3 className="text-xl font-bold mb-1 text-[#0a3a40]">{s.stat}</h3>
                     <h4 className="text-[10px] font-bold uppercase tracking-widest text-[#0a3a40] mb-2">{s.label}</h4>
                     <p className="text-[9px] text-[#0a3a40]/50 leading-tight">{s.desc}</p>
                   </div>
                 ))}
              </div>
            </div>
          </div>

          <div className="w-full h-[1px] bg-[#0a3a40]/10 mb-12" />

          {/* Core Offerings */}
          <div className="flex justify-between items-end mb-8">
             <h3 className="text-xl font-bold">Engineering Capabilities</h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
             {[
               { icon: <Monitor size={18} strokeWidth={1.5} />, title: "Headless CMS Platforms", desc: "Content-first architecture giving you total control over your digital assets." },
               { icon: <Smartphone size={18} strokeWidth={1.5} />, title: "Native Android Experiences", desc: "Deeply integrated mobile systems built specifically for Android power." },
               { icon: <Code size={18} strokeWidth={1.5} />, title: "Custom API Infrastructure", desc: "Robust, well-documented backends that power multi-device ecosystems." },
               { icon: <Activity size={18} strokeWidth={1.5} />, title: "Performance Engineering", desc: "Rigorous optimization workflows to ensure maximum speed and efficiency." },
             ].map((caseItem, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#0a3a40]/10 rounded-xl bg-white/40">
                     {caseItem.icon}
                  </div>
                  <h4 className="text-[11px] font-bold">{caseItem.title}</h4>
                  <p className="text-[10px] opacity-60 leading-relaxed">{caseItem.desc}</p>
                </div>
             ))}
          </div>

        </div>
      </div>
    );
  }

  // Fallback to DIGITAL CAPABILITIES for other IDs
  return (
    <div className="bg-[#EBEBE6] min-h-screen text-[#0a3a40] font-mono pb-20 relative pt-24">
      <div className="w-full px-6 md:px-12 lg:px-20 py-12 md:py-16">
        
        {/* Header/Nav */}
        <motion.button 
          onClick={onBack}
          whileHover={{ x: -4 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-[#93ACA7] hover:text-[#0a3a40] transition-colors group cursor-pointer mb-16 font-bold"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          <span className="relative">
            Back to Services
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#338f82] transition-all duration-300 group-hover:w-full opacity-50" />
          </span>
        </motion.button>

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 mb-32 items-center">
          
          {/* Left Text */}
          <div className="lg:w-[45%] flex flex-col">
            <div className="text-[10px] font-bold text-[#93ACA7] mb-2">00</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-[#338f82] font-bold mb-8">Service Detail</div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#0a3a40] leading-[1] mb-8 font-mono">
              DIGITAL<br />CAPABILITIES
            </h1>
            
            <p className="text-sm md:text-base text-[#0a3a40]/70 leading-relaxed mb-12 max-w-md">
              We design and build high-performance digital solutions tailored to your unique business goals and technical requirements.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <motion.button 
                onClick={onContact}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#0a3a40] text-white px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold flex items-center gap-2 hover:bg-[#15464a] transition-all shadow-lg hover:shadow-xl active:shadow-md"
              >
                Start a Project <ArrowUpRight size={14} />
              </motion.button>
            </div>
          </div>

          {/* Right Image/Mockups */}
          <div className="lg:w-[55%] relative">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full aspect-[4/3] max-w-[800px]"
            >
               {/* Laptop Mockup placeholder */}
               <div className="absolute inset-0 top-0 left-0 right-12 bottom-12 rounded-xl overflow-hidden shadow-2xl border-4 border-[#1a1c1e] bg-[#0a0a0a]">
                 <img 
                   src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                   alt="Dashboard Interface" 
                   className="w-full h-full object-cover opacity-80 mix-blend-luminosity"
                 />
                 <div className="absolute inset-x-0 bottom-0 h-4 bg-[#1a1c1e]" />
               </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};


