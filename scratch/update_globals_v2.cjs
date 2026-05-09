const fs = require('fs');
const path = require('path');

const globalsPath = path.join('src', 'app', 'globals.css');
let content = fs.readFileSync(globalsPath, 'utf8');

const brandVars = `
:root {
  --green-deep: #0d3320;
  --green-mid: #1a5c36;
  --green-brand: #2d8a52;
  --green-bright: #4ab870;
  --green-light: #a8dcba;
  --green-pale: #e8f7ed;
  --gold: #c8942a;
  --gold-light: #f0c96a;
  --cream: #faf8f2;
  --cream-dark: #f0ede3;
  --earth: #8b5e3c;
  --text-dark: #0f1f14;
  --text-mid: #2c4a35;
  --text-muted: #5a7a62;
  --white: #ffffff;
  --nav-h: 80px;
  --nav-bg: rgba(250, 248, 242, 0.92);
  --nav-border: rgba(45, 138, 82, 0.12);
  --surface-1: var(--cream);
  --surface-2: var(--cream-dark);
}

.dark {
  --green-deep: #a8dcba;
  --green-mid: #4ab870;
  --green-brand: #5ecf85;
  --green-bright: #7fe3a4;
  --green-light: #1a5c36;
  --green-pale: #0d2918;
  --gold: #f0c96a;
  --gold-light: #c8942a;
  --cream: #0f1f14;
  --cream-dark: #0a1a0f;
  --earth: #e6b89c;
  --text-dark: #ffffff;
  --text-mid: #a8dcba;
  --text-muted: #8eb39b;
  --white: #06120b;
  --nav-bg: rgba(10, 26, 15, 0.92);
  --nav-border: rgba(74, 184, 112, 0.15);
  --surface-1: #0f1f14;
  --surface-2: #0a1a0f;
}

@keyframes floatOrb {
  0%, 100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-30px) scale(1.05); }
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(28px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(0.8); }
}

@keyframes marqueeSlide {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@keyframes typingBounce {
  0%, 60%, 100% { transform: translateY(0); }
  30% { transform: translateY(-6px); background: var(--green-bright); }
}
`;

// Remove old injections if they exist (searching for a marker or the root block)
content = content.replace(/:root\s*\{[\s\S]*?--surface-2:[^\}]*\}/g, '');
content = content.replace(/\.dark\s*\{[\s\S]*?--surface-2:[^\}]*\}/g, '');

// Prepend new vars and keyframes
const newContent = brandVars + content;
fs.writeFileSync(globalsPath, newContent, 'utf8');
console.log('Updated globals.css with full template variables and animations.');
