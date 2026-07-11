const fs = require('fs');
const path = 'c:/sistem_inventory_pelindo/inventory-app/src/components/User/Peminjaman.jsx';
const text = fs.readFileSync(path, 'utf-8'); // try utf-8
const lines = text.split('\n');
lines.forEach((line, i) => {
    if (line.includes('generateBAST') || line.includes('function generateBAST') || line.includes('const generateBAST') || line.includes('userAPI') || line.includes('transactionAPI') || line.toLowerCase().includes('handlesave') || line.includes('handle')) {
        console.log(`${i+1}: ${line.trim()}`);
    }
});
