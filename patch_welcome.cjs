const fs = require('fs');
let code = fs.readFileSync('src/components/WelcomeVideoWidget.tsx', 'utf-8');

code = code.replace(
  `          {isHovered && !isMinimized && (\n            <motion.div\n              initial={{ opacity: 0 }}\n              animate={{ opacity: 1 }}\n              exit={{ opacity: 0 }}`,
  `          {isHovered && !isMinimized && (\n            <motion.div\n              key="hover-overlay"\n              initial={{ opacity: 0 }}\n              animate={{ opacity: 1 }}\n              exit={{ opacity: 0 }}`
);

code = code.replace(
  `        {!isHovered && isPlaying && isMuted && !isMinimized && (\n          <motion.div\n            initial={{ opacity: 0, y: 10 }}\n            animate={{ opacity: 1, y: 0 }}\n            exit={{ opacity: 0, y: -10 }}`,
  `        {!isHovered && isPlaying && isMuted && !isMinimized && (\n          <motion.div\n            key="tooltip"\n            initial={{ opacity: 0, y: 10 }}\n            animate={{ opacity: 1, y: 0 }}\n            exit={{ opacity: 0, y: -10 }}`
);

fs.writeFileSync('src/components/WelcomeVideoWidget.tsx', code);
