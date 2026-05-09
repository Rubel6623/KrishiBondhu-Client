const fs = require('fs');
const path = require('path');

const globalsPath = path.join('src', 'app', 'globals.css');
let content = fs.readFileSync(globalsPath, 'utf8');

const themeBlock = `
@theme {
  --color-green-deep: var(--green-deep);
  --color-green-mid: var(--green-mid);
  --color-green-brand: var(--green-brand);
  --color-green-bright: var(--green-bright);
  --color-green-light: var(--green-light);
  --color-green-pale: var(--green-pale);
  --color-gold: var(--gold);
  --color-gold-light: var(--gold-light);
  --color-cream: var(--cream);
  --color-cream-dark: var(--cream-dark);
  --color-earth: var(--earth);
  --color-text-dark: var(--text-dark);
  --color-text-mid: var(--text-mid);
  --color-text-muted: var(--text-muted);
  --color-surface-1: var(--surface-1);
  --color-surface-2: var(--surface-2);

  --font-serif: "Fraunces", serif;
  --font-sans: "DM Sans", sans-serif;
  --font-bengali: "Hind Siliguri", sans-serif;
}
`;

// Insert the theme block before the imports
if (!content.includes('@theme')) {
  content = content.replace('@import "tailwindcss";', themeBlock + '\n@import "tailwindcss";');
}

fs.writeFileSync(globalsPath, content, 'utf8');
console.log('Added @theme block to globals.css for Tailwind v4 utility support.');
