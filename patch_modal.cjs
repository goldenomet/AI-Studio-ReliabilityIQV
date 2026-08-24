const fs = require('fs');
let code = fs.readFileSync('src/components/ServiceDetailModal.tsx', 'utf-8');

code = code.replace(
  `          <motion.div\n            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            onClick={onClose}`,
  `          <motion.div\n            key="modal-overlay"\n            initial={{ opacity: 0 }}\n            animate={{ opacity: 1 }}\n            exit={{ opacity: 0 }}\n            onClick={onClose}`
);

fs.writeFileSync('src/components/ServiceDetailModal.tsx', code);
