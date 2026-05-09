const fs = require('fs');
let content = fs.readFileSync('c:/Level_2/Assignment-06/KrishiBondhu-Client/src/app/globals.css', 'utf8');

const brandVars = `
:root {
  --green-deep: #0d3320;
  --green-mid: #1a5c36;
  --green-brand: #2d8a52;
  --green-bright: #4ab870;
  --green-pale: #e8f7ed;
  --gold: #c8942a;
  --gold-light: #f0c96a;
  --cream: #faf8f2;
  --cream-dark: #f0ede3;
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
  --green-pale: #0d2918;
  --gold: #f0c96a;
  --gold-light: #c8942a;
  --cream: #0f1f14;
  --cream-dark: #0a1a0f;
  --nav-bg: rgba(10, 26, 15, 0.92);
  --nav-border: rgba(74, 184, 112, 0.15);
  --surface-1: #0f1f14;
  --surface-2: #0a1a0f;
}

`;

content = brandVars + content;
fs.writeFileSync('c:/Level_2/Assignment-06/KrishiBondhu-Client/src/app/globals.css', content, 'utf8');
console.log('Restored brand variables to globals.css');
