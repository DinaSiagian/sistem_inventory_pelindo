const fs = require('fs');
let content = fs.readFileSync('src/components/User/Peminjaman.jsx', 'utf8');

content = content.replace(/<th\s+style=\{\{\s*\.\.\.S\.th,\s*textAlign:\s*"center"\s*\}\}>\s*Aksi\s*<\/th>/g, '');

// The action cell is the last td in the list. It looks like:
// <td style={{ ...S.td, textAlign: "center" }}>
//   <div style={{ display: "flex", justifyContent: "center", gap: "8px" }}>
//      ... buttons ...
//   </div>
// </td>
// We can just use CSS to hide the last column of the list table since it doesn't break React rendering if it's hidden. 

fs.writeFileSync('src/components/User/Peminjaman.jsx', content);
console.log("Aksi headers removed");
