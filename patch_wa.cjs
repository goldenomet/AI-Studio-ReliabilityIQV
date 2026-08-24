const fs = require('fs');
let code = fs.readFileSync('src/components/WhatsAppWidget.tsx', 'utf-8');

code = code.replace(
  `      {(isOpen || isVisible) && (\n        <motion.div \n          initial={{ opacity: 0, scale: 0.8, y: 20 }}`,
  `      {(isOpen || isVisible) && (\n        <motion.div \n          key="wa-widget-container"\n          initial={{ opacity: 0, scale: 0.8, y: 20 }}`
);

code = code.replace(
  `            {isOpen && (\n              <motion.div\n                initial={{ opacity: 0, x: -20, scale: 0.9 }}`,
  `            {isOpen && (\n              <motion.div\n                key="wa-menu"\n                initial={{ opacity: 0, x: -20, scale: 0.9 }}`
);

fs.writeFileSync('src/components/WhatsAppWidget.tsx', code);
