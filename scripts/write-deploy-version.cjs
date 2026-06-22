const fs = require('fs');
const version = process.env.DEPLOY_ID || process.env.NETLIFY_DEPLOY_ID || new Date().toISOString();
fs.writeFileSync('deploy-version.json', JSON.stringify({ version }, null, 2) + '\n', 'utf8');
console.log('Wrote deploy version:', version);
