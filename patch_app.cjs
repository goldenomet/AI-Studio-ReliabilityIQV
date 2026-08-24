const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf-8');

app = app.replace(
  `      case 'home':\n        return (\n          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>`,
  `      case 'home':\n        return (\n          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>`
);

app = app.replace(
  `      case 'about':\n        return (\n          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-0">`,
  `      case 'about':\n        return (\n          <motion.div key="about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-0">`
);

app = app.replace(
  `      case 'services':\n        return (\n          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-0">`,
  `      case 'services':\n        return (\n          <motion.div key="services" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-0">`
);

app = app.replace(
  `      case 'service-documentation':\n        return (\n          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-0 w-full">`,
  `      case 'service-documentation':\n        return (\n          <motion.div key={currentPage} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-0 w-full">`
);

app = app.replace(
  `      case 'trending':\n        return (\n          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>`,
  `      case 'trending':\n        return (\n          <motion.div key="trending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>`
);

app = app.replace(
  `      case 'contact':\n        return (\n          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">`,
  `      case 'contact':\n        return (\n          <motion.div key="contact" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="pt-24">`
);

app = app.replace(
  `      case 'admin':\n        return (\n          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">`,
  `      case 'admin':\n        return (\n          <motion.div key="admin" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full">`
);

fs.writeFileSync('src/App.tsx', app);
