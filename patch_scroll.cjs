const fs = require('fs');
let code = fs.readFileSync('src/components/SectionsPart2.tsx', 'utf-8');

// Ensure import for up arrow
if (!code.includes('up_arrow_3d')) {
  code = code.replace("import { motion", "import upArrow3D from '../assets/images/up_arrow_3d_1787579872621.jpg';\nimport { motion");
}
if (!code.includes('useWidgetVisibility')) {
  code = code.replace("import { motion", "import { useWidgetVisibility } from '../hooks/useWidgetVisibility';\nimport { motion");
}

const targetScrollButton = `export const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 p-4 rounded-xl backdrop-blur-md border border-accent/20 text-bg-primary shadow-xl hover:bg-opacity-90 transition-all focus:outline-none cursor-pointer !bg-accent"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};`;

const newScrollButton = `export const ScrollToTopButton = () => {
  const [show, setShow] = useState(false);
  const { isVisible } = useWidgetVisibility(5000);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {(show && isVisible) && (
        <motion.button
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-28 right-6 w-14 h-14 z-40 rounded-full overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.5)] border border-white/20 hover:scale-110 transition-transform cursor-pointer"
        >
          <img src={upArrow3D} alt="Scroll to Top" className="w-full h-full object-cover" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};`;

code = code.replace(targetScrollButton, newScrollButton);
fs.writeFileSync('src/components/SectionsPart2.tsx', code);
