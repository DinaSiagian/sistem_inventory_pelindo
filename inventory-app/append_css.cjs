const fs = require('fs');
const extraCss = `

/* OVERRIDE UNTUK USER VIEW ONLY (NON CRUD) */
.add-asset-btn,
button[title="Edit"],
button[title="Hapus"],
.action-delete,
.action-dropdown,
.action-dropdown-menu,
.btn-save {
  display: none !important;
}

/* Hide action cell in table if it still renders */
.action-cell {
  display: none !important;
}

/* Hide the 3 dots button for grid view actions, it has Icon.Dots inside */
.action-dropdown {
  display: none !important;
}
`;
fs.appendFileSync('src/components/User/Inventaris.css', extraCss);
console.log('CSS appended');
