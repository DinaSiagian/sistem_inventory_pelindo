const https = require('http');
https.get('http://localhost:8000/api/assets', (res) => {
    let data = '';
    res.on('data', chunk => data += chunk);
    res.on('end', () => {
        const json = JSON.parse(data);
        console.log(JSON.stringify(json.data.slice(0, 2), null, 2));
    });
});
