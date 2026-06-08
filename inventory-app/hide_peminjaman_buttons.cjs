const fs = require('fs');
let content = fs.readFileSync('src/components/User/Peminjaman.jsx', 'utf8');

// Hide "Catat Serah Terima" (Plus) main button
content = content.replace(/<button\s+style=\{S\.btnPrimary\}\s+onClick=\{\(\) => setNav\(\{ page: "borrow-form", data: null \}\)\}\s*>\s*<Icon\.Plus \/> Catat Serah Terima\s*<\/button>/g, '<span style={{display: "none"}}></span>');

// Hide "Edit Transaksi" in Detail View
content = content.replace(/<button\s+onClick=\{\(\) =>\s*setNav\(\{ page: "borrow-form", data: item \}\)\s*\}\s+style=\{S\.secBtn\}\s*>\s*<Icon\.Edit \/> Edit Transaksi\s*<\/button>/g, '');

// Hide "Hapus" in Detail View
content = content.replace(/<button\s+onClick=\{\(\) => setNav\(\{ page: "delete", data: item \}\)\}\s+style=\{\{ \.\.\.S\.secBtn, color: "#dc2626" \}\}\s*>\s*<Icon\.Trash \/> Hapus\s*<\/button>/g, '');

// Hide "Catat Pengembalian" in Detail View
content = content.replace(/<button\s+onClick=\{\(\) => setNav\(\{ page: "return-form", data: item \}\)\}\s+style=\{S\.primaryBtn\}\s*>\s*<Icon\.Undo \/> Catat Pengembalian\s*<\/button>/g, '');

// Hide action buttons in List View (table)
// The action buttons in the list view are inside a div with style={S.flexRow} or similar
// Let's just find `title="Edit"`, `title="Hapus"`, `title="Kembalikan Aset"` and hide them.
content = content.replace(/<button[^>]*title="Edit"[^>]*>[\s\S]*?<\/button>/g, '');
content = content.replace(/<button[^>]*title="Hapus"[^>]*>[\s\S]*?<\/button>/g, '');
content = content.replace(/<button[^>]*title="Kembalikan Aset"[^>]*>[\s\S]*?<\/button>/g, '');

fs.writeFileSync('src/components/User/Peminjaman.jsx', content);
console.log("Buttons hidden");
