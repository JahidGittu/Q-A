// Build script to generate data-nt-tech/02-backend.js
const fs = require('fs');
const path = require('path');

const t1 = require('./backend/t1-nodejs-core.js');
const t2 = require('./backend/t2-express-arch.js');
const t3 = require('./backend/t3-backend-ts.js');
const t4 = require('./backend/t4-jwt-security.js');
const t5 = require('./backend/t5-validation-errors.js');
const t6 = require('./backend/t6-payments-webhooks.js');
const t7 = require('./backend/t7-backend-transactions.js');
const t8 = require('./backend/t8-server-devops.js');

const backendData = {
  id: "backend",
  title: "Backend Engineering",
  badge: "Node.js · Express · REST · TypeScript · Security",
  icon: "⚙️",
  topics: [t1, t2, t3, t4, t5, t6, t7, t8]
};

const output = `// NT Tech Innovation — 02. Backend Engineering Mastery (200 Questions - 25 per Topic across 5 Levels)
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.backend = ${JSON.stringify(backendData, null, 2)};
`;

const targetPath = path.resolve(__dirname, '../../data-nt-tech/02-backend.js');
fs.writeFileSync(targetPath, output, 'utf8');

console.log('Successfully generated 02-backend.js with:');
let total = 0;
backendData.topics.forEach(t => {
  total += t.items.length;
  console.log(` - ${t.name}: ${t.items.length} questions`);
});
console.log(`Grand Total Backend Questions: ${total}`);
