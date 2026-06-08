const fs = require('fs');
let content = fs.readFileSync('src/components/User/Userlayout.jsx', 'utf8');

// Remove import
content = content.replace(/import \{ useLoanNotifications \} from "\.\/useLoanNotifications";\n/, '');

// Remove useLoanNotifications hook
content = content.replace(/\/\/ \? Pakai hook yang sama dengan LoanAlertPopup\n\s*const \{ urgentLoans, badgeCount, badgeLevel \} = useLoanNotifications\([\s\S]*?\);\n/, '');

// Remove badge variables
content = content.replace(/\s*const badgeColor = badgeLevel === "overdue" \? "#ef4444" : "#f59e0b";\n\s*const badgeBg =[\s\S]*?;\n/, '');
content = content.replace(/\s*const showBadge = badgeLevel === "overdue" \|\| badgeLevel === "warning";\n/, '');

// Remove badge from menu items array
content = content.replace(/,\s*badge: true/g, '');

// Remove rendering of badge in sidebar menu
content = content.replace(/\{item\.badge && showBadge && \([\s\S]*?<\/span>\n\s*\)\}/, '');

fs.writeFileSync('src/components/User/Userlayout.jsx', content);
console.log("Badge stripped");
