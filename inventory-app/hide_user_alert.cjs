const fs = require('fs');
let content = fs.readFileSync('src/components/User/Userlayout.jsx', 'utf8');

// We will just disable the pop alert logic and the bell icon.
content = content.replace(/\{showAlert && urgentLoans\.length > 0 && \([\s\S]*?<\/>\n\s*\)/g, ''); // just in case it's wrapped, but it's not.

// Let's do string replaces for the specific elements
content = content.replace(/\{\/\* Pop Alert[\s\S]*?<\/>\n\s*\)\}/g, '');
content = content.replace(/\{\/\* Pop Alert - pakai LoanAlertPopup yang sudah ada \*\/\}\s*\{showAlert && urgentLoans\.length > 0 && \([\s\S]*?\/>\s*\)\}/, '');

content = content.replace(/\{\/\* Bell di topbar \*\/\}\s*\{showBadge && \([\s\S]*?<\/button>\s*\)\}/, '');

// Also remove the auto show effect
content = content.replace(/useEffect\(\(\) => \{\s*if \(urgentLoans\.length > 0\) \{\s*const t = setTimeout\(\(\) => setShowAlert\(true\), 500\);\s*return \(\) => clearTimeout\(t\);\s*\}\s*\}, \[urgentLoans\]\);/, '');

fs.writeFileSync('src/components/User/Userlayout.jsx', content);
console.log("Alert removed");
