const fs = require('fs');
let code = fs.readFileSync('src/index.css', 'utf-8');

const targetCSS = `  .crystal-button {
    @apply rounded-full transition-all duration-300 bg-text-primary text-bg-primary border border-border-primary shadow-lg hover:scale-105 active:scale-95;
  }
  .dark .crystal-button {
    @apply bg-bg-card text-text-primary border border-border-primary shadow-2xl;
  }`;

const newCSS = `  .crystal-button {
    @apply rounded-full transition-all duration-300;
    background: rgba(255, 255, 255, 0.03);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15), inset 0 0 10px rgba(255,255,255,0.02);
    color: var(--color-text-primary) !important;
  }
  .crystal-button:hover {
    @apply scale-105;
    background: rgba(255, 255, 255, 0.08);
    border: 1px solid rgba(255, 255, 255, 0.3);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.25), inset 0 0 15px rgba(255,255,255,0.05);
  }
  .dark .crystal-button {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
    color: #ffffff !important;
  }
  .dark .crystal-button:hover {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  /* 3D Premium Icon Effect using CSS filters */
  svg.lucide {
    filter: drop-shadow(0px 3px 3px rgba(0,0,0,0.3)) drop-shadow(0px 1px 1px rgba(255,255,255,0.2));
  }
  .dark svg.lucide {
    filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.6)) drop-shadow(0px 1px 1px rgba(255,255,255,0.1));
  }
`;

code = code.replace(targetCSS, newCSS);
fs.writeFileSync('src/index.css', code);
