const fs = require('fs');

// Remove the global table td:last-child from CSS
let cssContent = fs.readFileSync('src/components/User/Peminjaman.css', 'utf8');
cssContent = cssContent.replace(/table td:last-child \{\s*display: none !important;\s*\}/g, '');
cssContent = cssContent.replace(/table th:last-child \{\s*display: none !important;\s*\}/g, '');
fs.writeFileSync('src/components/User/Peminjaman.css', cssContent);

// Remove the specific action cell <td> from Peminjaman.jsx
let jsxContent = fs.readFileSync('src/components/User/Peminjaman.jsx', 'utf8');

// The action cell in the main list view
// In Peminjaman.jsx line ~6271:
// <td style={{ ...S.td, textAlign: "center" }}>
//   <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
//     ... buttons ...
//   </div>
// </td>

jsxContent = jsxContent.replace(/<td style=\{\{\s*\.\.\.S\.td,\s*textAlign:\s*"center"\s*\}\}>\s*<div style=\{\{\s*display:\s*"flex",\s*justifyContent:\s*"center",\s*gap:\s*"8px"\s*\}\}>[\s\S]*?<\/div>\s*<\/td>/g, '');

fs.writeFileSync('src/components/User/Peminjaman.jsx', jsxContent);
console.log("Fixed Action column hiding");
