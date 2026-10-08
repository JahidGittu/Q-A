// Builder script for 05-dokani.js
const fs = require('fs');
const path = require('path');

const topics = [
  require('./dokani/t1-dokani-arch'),
  require('./dokani/t2-dokani-pos-billing'),
  require('./dokani/t3-dokani-inventory'),
  require('./dokani/t4-dokani-financials')
];

let totalQuestions = 0;
topics.forEach((t, i) => {
  const count = t.items.length;
  totalQuestions += count;
  const lvls = t.items.map(x => x.lvl);
  const lvlCounts = {};
  lvls.forEach(l => { lvlCounts[l] = (lvlCounts[l] || 0) + 1; });
  console.log(`Dokani Topic ${i + 1}: [${t.id}] ${t.name} -> ${count} Qs (${JSON.stringify(lvlCounts)})`);
});

console.log(`Total Dokani Questions: ${totalQuestions} across ${topics.length} topics.`);

const dokaniCategory = {
  id: "dokani",
  title: "Dokani SaaS Project Architecture",
  badge: "Multi-Tenant POS/ERP SaaS · https://dokani.bip.sg",
  icon: "🛒",
  topics: topics
};

const fileContent = `// NT Tech Innovation — 05. Dokani Multi-Tenant SaaS Architecture & Deep Dive (${totalQuestions} Questions - 25 per Topic across 5 Levels)
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.dokani = ${JSON.stringify(dokaniCategory, null, 2)};
`;

const outputPath = path.resolve(__dirname, '../../data-nt-tech/05-dokani.js');
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Successfully compiled 05-dokani.js to ${outputPath}!`);
