const fs = require('fs');
let content = fs.readFileSync('src/components/User/Inventaris.jsx', 'utf8');

// Hide Cetak Barcode
content = content.replace(/<Icon\.Barcode \/> Cetak Barcode/g, '<span style={{ display: "none" }}><Icon.Barcode /> Cetak Barcode</span>');

// Hide Cetak Barcode Unit
content = content.replace(/<Icon\.Barcode \/> Cetak Barcode Unit/g, '<span style={{ display: "none" }}><Icon.Barcode /> Cetak Barcode Unit</span>');

// Also hide the "Edit Barang" buttons which might not be fully hidden if there were multiples
content = content.replace(/<Icon\.Edit \/> Edit Barang/g, '<span style={{ display: "none" }}><Icon.Edit /> Edit Barang</span>');

// Also remove the <Icon.Dots /> entirely so the button is empty and won't be clickable, or hide it
content = content.replace(/<Icon\.Dots \/>/g, '<span style={{ display: "none" }}><Icon.Dots /></span>');

fs.writeFileSync('src/components/User/Inventaris.jsx', content);
console.log('JSX buttons hidden');
