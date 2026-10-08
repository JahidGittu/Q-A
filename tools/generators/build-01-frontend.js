// Build script to generate data-nt-tech/01-frontend.js
const fs = require('fs');
const path = require('path');

const t1 = require('./frontend/t1-react-hooks.js');
const t2 = require('./frontend/t2-nextjs-app.js');
const t3 = require('./frontend/t3-javascript-es6.js');
const t4 = require('./frontend/t4-typescript.js');
const t5 = require('./frontend/t5-tailwind-css.js');
const t6 = require('./frontend/t6-state-mgmt.js');
const t7 = require('./frontend/t7-forms-zod.js');
const t8 = require('./frontend/t8-api-auth-rbac.js');
const t9 = require('./frontend/t9-git-testing.js');

const frontendData = {
  id: "frontend",
  title: "Frontend Engineering",
  badge: "React · Next.js · TypeScript · Tailwind · Testing",
  icon: "⚛️",
  topics: [t1, t2, t3, t4, t5, t6, t7, t8, t9]
};

const output = `// NT Tech Innovation — 01. Frontend Engineering Mastery (225 Questions - 25 per Topic across 5 Levels)
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.frontend = ${JSON.stringify(frontendData, null, 2)};
`;

const targetPath = path.resolve(__dirname, '../../data-nt-tech/01-frontend.js');
fs.writeFileSync(targetPath, output, 'utf8');

console.log('Successfully generated 01-frontend.js with:');
let total = 0;
frontendData.topics.forEach(t => {
  total += t.items.length;
  console.log(` - ${t.name}: ${t.items.length} questions`);
});
console.log(`Grand Total Frontend Questions: ${total}`);
