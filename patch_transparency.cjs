const fs = require('fs');

// 1. ChatbotWidget
let chatCode = fs.readFileSync('src/components/ChatbotWidget.tsx', 'utf-8');
chatCode = chatCode.replace(
  'className="fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center z-50 overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/20 hover:scale-110 transition-transform"',
  'className="fixed bottom-6 right-6 w-16 h-16 flex items-center justify-center z-50 hover:scale-110 transition-transform cursor-pointer outline-none bg-transparent"'
);
chatCode = chatCode.replace(
  '<img src={chatIcon3D} alt="Chat" className="w-full h-full object-cover" />',
  '<img src={chatIcon3D} alt="Chat" className="w-full h-full object-cover mix-blend-screen drop-shadow-xl" />'
);
fs.writeFileSync('src/components/ChatbotWidget.tsx', chatCode);


// 2. WhatsAppWidget
let waCode = fs.readFileSync('src/components/WhatsAppWidget.tsx', 'utf-8');
waCode = waCode.replace(
  "className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all duration-500 relative group overflow-hidden outline-hidden ring-offset-2 focus:ring-2 focus:ring-accent ${\n              isOpen ? 'bg-bg-card/95 backdrop-blur-xl border border-white/10 text-text-primary' : 'bg-transparent border border-white/20 hover:scale-110'\n            }`}",
  "className={`w-14 h-14 md:w-16 md:h-16 flex items-center justify-center transition-all duration-500 relative group outline-hidden ring-offset-2 focus:ring-2 focus:ring-accent ${\n              isOpen ? 'bg-bg-card/95 backdrop-blur-xl border border-white/10 text-text-primary rounded-full shadow-lg' : 'bg-transparent hover:scale-110'\n            }`}"
);
waCode = waCode.replace(
  '<img src={whatsappIcon3D} alt="WhatsApp" className="w-full h-full object-cover" />',
  '<img src={whatsappIcon3D} alt="WhatsApp" className="w-full h-full object-cover mix-blend-screen drop-shadow-xl" />'
);
fs.writeFileSync('src/components/WhatsAppWidget.tsx', waCode);


// 3. SectionsPart2 (ScrollToTop)
let scrollCode = fs.readFileSync('src/components/SectionsPart2.tsx', 'utf-8');
scrollCode = scrollCode.replace(
  'className="fixed bottom-28 right-6 w-14 h-14 z-40 rounded-full overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/20 hover:scale-110 transition-transform cursor-pointer"',
  'className="fixed bottom-28 right-6 w-14 h-14 z-40 hover:scale-110 transition-transform cursor-pointer outline-none bg-transparent"'
);
scrollCode = scrollCode.replace(
  '<img src={upArrow3D} alt="Scroll to Top" className="w-full h-full object-cover" />',
  '<img src={upArrow3D} alt="Scroll to Top" className="w-full h-full object-cover mix-blend-screen drop-shadow-xl" />'
);
fs.writeFileSync('src/components/SectionsPart2.tsx', scrollCode);

