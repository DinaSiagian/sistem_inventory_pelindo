const fs = require('fs');
let content = fs.readFileSync('src/components/User/Peminjaman.jsx', 'utf8');

// Fix imports
content = content.replace(/from "\.\.\/services\/api"/, 'from "../../services/api"');

// Replace filter logic
const searchTarget = `      if (txRes.data && txRes.data.success) {
        fetchedBorrows = txRes.data.borrows || [];
        setBorrows(fetchedBorrows);
        setReturns(txRes.data.returns || []);

        [...(txRes.data.borrows || []), ...(txRes.data.returns || [])].forEach((tx) => {`;

const replacement = `      if (txRes.data && txRes.data.success) {
        let activeUser = {};
        try {
           activeUser = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("currentUser")) || {};
        } catch(e){}
        const actId = activeUser.id ? Number(activeUser.id) : null;

        let allB = txRes.data.borrows || [];
        let allR = txRes.data.returns || [];

        // Filter only if actId is present
        if (actId) {
            allB = allB.filter(t => Number(t.giver_id) === actId || Number(t.receiver_id) === actId);
            allR = allR.filter(t => Number(t.giver_id) === actId || Number(t.receiver_id) === actId);
        }

        fetchedBorrows = allB;
        setBorrows(allB);
        setReturns(allR);

        [...(allB), ...(allR)].forEach((tx) => {`;

content = content.replace(searchTarget, replacement);

fs.writeFileSync('src/components/User/Peminjaman.jsx', content);
console.log("Replaced logic.");
