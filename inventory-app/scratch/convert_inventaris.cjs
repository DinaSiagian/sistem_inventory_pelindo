const fs = require('fs');

try {
  let data = fs.readFileSync('c:/sistem_inventory_pelindo/inventory-app/src/components/ViewAsset.jsx', 'utf8');

  // Rename component
  data = data.replace(/export default function ViewAsset\(\) \{/, 'export default function Inventaris() {\n  const isReadOnly = true;\n');

  // Fix imports
  data = data.replace(/import \{ barangAPI, budgetAPI, masterDataAPI \} from "\.\.\/services\/api";/g, 'import { barangAPI, budgetAPI, masterDataAPI } from "../../services/api";');
  data = data.replace(/import "\.\/ViewAsset\.css";/g, 'import "../ViewAsset.css";\nimport "./Shared.css";');

  // Disable "Tambah Barang Baru" button by adding display: none
  data = data.replace(/<Icon\.Plus \/> Tambah Barang Baru/g, '<span style={{ display: "none" }}><Icon.Plus /> Tambah Barang Baru</span>');
  
  // Hide the "Tambah Aset" button
  data = data.replace(/<Icon\.Plus \/> Tambah Aset/g, '<span style={{ display: "none" }}><Icon.Plus /> Tambah Aset</span>');
  
  // Hide "Detail & Edit" button
  data = data.replace(/Detail & Edit/g, 'Detail & Edit (Hanya View)');
  
  // Hide Edit and Trash buttons dynamically using isReadOnly
  // For buttons that might be hard to replace exactly, we can use CSS to hide them.
  // We'll append a CSS block at the end of the imports.
  data = data.replace(/import "\.\/Shared\.css";/g, 'import "./Shared.css";\nimport "./UserInventarisOverride.css";');

  fs.writeFileSync('c:/sistem_inventory_pelindo/inventory-app/src/components/User/Inventaris.jsx', data, 'utf8');
  console.log("Successfully copied and modified Inventaris.jsx!");
} catch(e) {
  console.error(e);
}
