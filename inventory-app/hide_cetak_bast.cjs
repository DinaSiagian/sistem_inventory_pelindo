const fs = require('fs');
let content = fs.readFileSync('src/components/User/Peminjaman.jsx', 'utf8');

// Hide Cetak BAST
content = content.replace(/<button\s+onClick=\{\(\) => generateBAST\(items\[0\], "borrow"\)\}\s+style=\{S\.primaryBtn\}\s*>\s*<Icon\.Printer \/> Cetak BAST\s*<\/button>/g, '');
content = content.replace(/<button\s+onClick=\{\(\) => generateBAST\(item, "return"\)\}\s+style=\{S\.primaryBtn\}\s*>\s*<Icon\.Printer \/> BAST\s*<\/button>/g, '');

fs.writeFileSync('src/components/User/Peminjaman.jsx', content);
console.log("Cetak BAST hidden");
