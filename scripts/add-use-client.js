#!/usr/bin/env node
// Script to add 'use client' directive to all components that need it
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const componentsDir = path.join(__dirname, '../components');

function addUseClientToFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  
  // Skip if already has 'use client'
  if (content.includes("'use client'") || content.includes('"use client"')) {
    return false;
  }
  
  // Check if file uses hooks or browser APIs
  const needsClient = 
    content.includes('useState') ||
    content.includes('useEffect') ||
    content.includes('useRef') ||
    content.includes('useCallback') ||
    content.includes('useMemo') ||
    content.includes('useContext') ||
    content.includes('window.') ||
    content.includes('document.') ||
    content.includes('localStorage') ||
    content.includes('sessionStorage') ||
    content.includes('react-router-dom') ||
    content.includes('react-helmet');
  
  if (needsClient) {
    const newContent = "'use client';\n\n" + content;
    fs.writeFileSync(filePath, newContent, 'utf8');
    return true;
  }
  
  return false;
}

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  let count = 0;
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      count += processDirectory(filePath);
    } else if (file.endsWith('.jsx') || file.endsWith('.tsx')) {
      if (addUseClientToFile(filePath)) {
        console.log(`Added 'use client' to: ${filePath}`);
        count++;
      }
    }
  }
  
  return count;
}

const count = processDirectory(componentsDir);
console.log(`\n✅ Added 'use client' to ${count} files`);

