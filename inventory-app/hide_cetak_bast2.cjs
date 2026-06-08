const fs = require('fs');
let content = fs.readFileSync('src/components/User/Peminjaman.jsx', 'utf8');

// Hide "Cetak BAST" in BorrowDetail (line 2931)
content = content.replace(/<button\s+style=\{\{\s*\.\.\.S\.btnGhost,\s*padding:\s*"8px 12px"\s*\}\}\s+onClick=\{\(\) => generateBAST\(items\[0\], "borrow"\)\}\s*>\s*<Icon\.Printer \/> Cetak BAST\s*<\/button>/g, '');

// Hide "BAST" in ReturnDetail (line 3203)
content = content.replace(/<button\s+style=\{\{\s*\.\.\.S\.btnGhost,\s*color:\s*"#7c3aed",\s*borderColor:\s*"#c4b5fd",\s*\}\}\s+onClick=\{\(\) => generateBAST\(item, "return"\)\}\s*>\s*<Icon\.Printer \/> BAST\s*<\/button>/g, '');

// Hide "Cetak BAST" icon button in List Table (line 6263)
content = content.replace(/<button\s+style=\{\{\s*\.\.\.S\.iconBtn,\s*color:\s*"#7c3aed"\s*\}\}\s+title="Cetak BAST"[\s\S]*?<\/button>/g, '');

fs.writeFileSync('src/components/User/Peminjaman.jsx', content);
console.log("Cetak BAST removed!");
