const fs = require('fs');
let code = fs.readFileSync('src/components/SectionsPart2.tsx', 'utf-8');

code = code.replace(
  `      {(show && isVisible) && (\n        <motion.button\n          initial={{ opacity: 0, scale: 0, y: 20 }}`,
  `      {(show && isVisible) && (\n        <motion.button\n          key="scroll-to-top"\n          initial={{ opacity: 0, scale: 0, y: 20 }}`
);

fs.writeFileSync('src/components/SectionsPart2.tsx', code);
