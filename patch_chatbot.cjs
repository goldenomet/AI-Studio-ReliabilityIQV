const fs = require('fs');
let code = fs.readFileSync('src/components/ChatbotWidget.tsx', 'utf-8');

code = code.replace(
  `        {!isOpen && showGreeting && (\n          <motion.div\n            initial={{ opacity: 0, x: 20, y: 20 }}`,
  `        {!isOpen && showGreeting && (\n          <motion.div\n            key="greeting-card"\n            initial={{ opacity: 0, x: 20, y: 20 }}`
);

code = code.replace(
  `        {!isOpen && isVisible && (\n          <motion.button\n            initial={{ opacity: 0, scale: 0.8, y: 20 }}`,
  `        {!isOpen && isVisible && (\n          <motion.button\n            key="launcher-btn"\n            initial={{ opacity: 0, scale: 0.8, y: 20 }}`
);

code = code.replace(
  `        {isOpen && (\n          <motion.div\n            initial={{ opacity: 0, y: 20, scale: 0.95 }}`,
  `        {isOpen && (\n          <motion.div\n            key="chat-window"\n            initial={{ opacity: 0, y: 20, scale: 0.95 }}`
);

code = code.replace(
  `                {showLeadForm && (\n                  <motion.div\n                    initial={{ opacity: 0, height: 0 }}`,
  `                {showLeadForm && (\n                  <motion.div\n                    key="lead-form"\n                    initial={{ opacity: 0, height: 0 }}`
);

fs.writeFileSync('src/components/ChatbotWidget.tsx', code);
