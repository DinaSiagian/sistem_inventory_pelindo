const fs = require('fs');
let content = fs.readFileSync('src/components/User/Inventaris.jsx', 'utf8');

// Hide the AKSI column header in the list view
content = content.replace(/<th>AKSI<\/th>/g, '');

// Hide the Action cell in the list view table
content = content.replace(/<td[^>]*>\s*<div[^>]*>\s*<button[^>]*title="Edit"[\s\S]*?<\/button>\s*<button[^>]*title="Hapus"[\s\S]*?<\/button>\s*<\/div>\s*<\/td>/g, '');

// Hide Action cell in Grid view (the 3 dots)
content = content.replace(/<button[^>]*>\s*<Icon.Dots \/>\s*<\/button>\s*\{activeDropdown === asset.id && \([\s\S]*?\}\)/g, '');

// Save it back
fs.writeFileSync('src/components/User/Inventaris.jsx', content);
console.log('Done');
