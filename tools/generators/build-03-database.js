// Builder script for 03-database.js
const fs = require('fs');
const path = require('path');

const topics = [
  require('./database/t1-postgres-design'),
  require('./database/t2-prisma-migrations'),
  require('./database/t3-mongodb-crud'),
  require('./database/t4-mongoose-odm'),
  require('./database/t5-indexing-query'),
  require('./database/t6-transactions-acid'),
  require('./database/t7-aggregation-pipeline'),
  require('./database/t8-multitenant-isolation'),
  require('./database/t9-supabase-rls'),
  require('./database/t10-backup-maintenance')
];

let totalQuestions = 0;
topics.forEach((t, i) => {
  const count = t.items.length;
  totalQuestions += count;
  const lvls = t.items.map(x => x.lvl);
  const lvlCounts = {};
  lvls.forEach(l => { lvlCounts[l] = (lvlCounts[l] || 0) + 1; });
  console.log(`Topic ${i + 1}: [${t.id}] ${t.name} -> ${count} Qs (${JSON.stringify(lvlCounts)})`);
});

console.log(`Total Database Questions: ${totalQuestions} across ${topics.length} topics.`);

const databaseCategory = {
  id: "database",
  title: "Database Engineering & Architecture",
  badge: "PostgreSQL · MongoDB · Prisma · Mongoose · RLS · ACID · Scaling",
  icon: "🗄️",
  topics: topics
};

const fileContent = `// NT Tech Innovation — 03. Database Engineering Mastery (${totalQuestions} Questions - 25 per Topic across 5 Levels)
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.database = ${JSON.stringify(databaseCategory, null, 2)};
`;

const outputPath = path.resolve(__dirname, '../../data-nt-tech/03-database.js');
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Successfully compiled 03-database.js to ${outputPath}!`);
