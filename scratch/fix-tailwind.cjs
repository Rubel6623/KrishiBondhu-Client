const fs = require('fs');

function fixTailwind(path) {
  let content = fs.readFileSync(path, 'utf8');
  
  // Revert custom variables back to tailwind colors because arbitrary variables don't work reliably with opacity modifiers
  content = content.replace(/text-\[var\(--green-deep\)\]/g, 'text-green-900');
  content = content.replace(/text-\[var\(--green-brand\)\]/g, 'text-green-600');
  content = content.replace(/bg-\[var\(--green-brand\)\]/g, 'bg-green-600');
  content = content.replace(/hover:bg-\[var\(--green-mid\)\]/g, 'hover:bg-green-700');
  content = content.replace(/hover:text-\[var\(--green-brand\)\]/g, 'hover:text-green-600');
  content = content.replace(/shadow-\[var\(--green-brand\)\]\/20/g, 'shadow-green-500/20');
  content = content.replace(/bg-\[var\(--green-pale\)\]/g, 'bg-green-50');
  content = content.replace(/dark:hover:bg-\[var\(--green-brand\)\]\/20/g, 'dark:hover:bg-green-900/20');
  content = content.replace(/bg-\[var\(--green-pale\)\]/g, 'bg-green-100'); // wait, this was already replaced
  content = content.replace(/text-\[var\(--green-deep\)\]/g, 'text-green-700'); // wait, earlier
  content = content.replace(/border-\[var\(--green-brand\)\]/g, 'border-green-600');
  
  if (path.includes('Navbar')) {
    content = content.replace(/bg-\[var\(--nav-bg\)\]/g, 'bg-background/80');
    content = content.replace(/border-\[var\(--nav-border\)\]/g, 'border-border');
  }

  if (path.includes('Footer')) {
    content = content.replace(/bg-\[var\(--green-deep\)\]/g, 'bg-green-950');
    content = content.replace(/dark:bg-\[var\(--surface-1\)\]/g, 'dark:bg-green-950');
    // Also the text-[var(--green-brand)] was added
    content = content.replace(/text-\[var\(--green-brand\)\]/g, 'text-green-500');
  }
  
  fs.writeFileSync(path, content, 'utf8');
}

fixTailwind('c:/Level_2/Assignment-06/KrishiBondhu-Client/src/components/shared/Navbar.tsx');
fixTailwind('c:/Level_2/Assignment-06/KrishiBondhu-Client/src/components/shared/Footer.tsx');
