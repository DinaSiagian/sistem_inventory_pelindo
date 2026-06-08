const fs = require('fs');

const extraCss = `
/* USER VIEW ONLY OVERRIDES FOR BAST */
.action-cell,
table td:last-child {
  display: none !important;
}

table th:last-child {
  display: none !important;
}

/* Ensure no CRUD buttons show */
button[title="Edit"],
button[title="Hapus"],
button[title="Kembalikan Aset"] {
  display: none !important;
}
`;

fs.appendFileSync('src/components/User/Peminjaman.css', extraCss);
console.log("Appended CSS overrides.");
