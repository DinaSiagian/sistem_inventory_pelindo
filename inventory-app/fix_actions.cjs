const fs = require('fs');
let content = fs.readFileSync('src/components/User/Inventaris.jsx', 'utf8');

content = content.replace(/actions=\{\s*<div style=\{\{ display: "flex", gap: "12px" \}\}>\s*<button[\s\S]*?<Icon\.Edit \/> Edit Barang<\/span>\s*<\/button>\s*<\/div>\s*\}/g, 'actions={null}');

fs.writeFileSync('src/components/User/Inventaris.jsx', content);
console.log('Action prop replaced');
