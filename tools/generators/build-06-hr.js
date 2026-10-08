// Builder script for 06-hr.js
const fs = require('fs');
const path = require('path');

const topics = [
  require('./hr/t1-best-project-pitch'),
  require('./hr/t2-why-nt-tech-fit'),
  require('./hr/t3-production-outage-stress'),
  require('./hr/t4-teamwork-conflict-salary'),
  require('./hr/t5-ai-workflow-code-review')
];

let totalQuestions = 0;
topics.forEach((t, i) => {
  const count = t.items.length;
  totalQuestions += count;
  const lvls = t.items.map(x => x.lvl);
  const lvlCounts = {};
  lvls.forEach(l => { lvlCounts[l] = (lvlCounts[l] || 0) + 1; });
  console.log(`HR Topic ${i + 1}: [${t.id}] ${t.name} -> ${count} Qs (${JSON.stringify(lvlCounts)})`);
});

console.log(`Total HR Questions: ${totalQuestions} across ${topics.length} topics.`);

const hrCategory = {
  id: "hr",
  title: "NT Tech HR & Behavioral Leadership",
  badge: "STAR Method · Project Pitch · Outage Response · Culture Fit · Salary",
  icon: "🎯",
  topics: topics
};

const fileContent = `// NT Tech Innovation — 06. HR, Behavioral & Technical Leadership Mastery (${totalQuestions} Questions - 25 per Topic across 5 Levels)
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.hr = ${JSON.stringify(hrCategory, null, 2)};
`;

const outputPath = path.resolve(__dirname, '../../data-nt-tech/06-hr.js');
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Successfully compiled 06-hr.js to ${outputPath}!`);
