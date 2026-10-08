// Builder script for 04-devops.js
const fs = require('fs');
const path = require('path');

const topics = [
  require('./devops/t1-linux-ubuntu'),
  require('./devops/t2-docker-containers'),
  require('./devops/t3-nginx-reverse-proxy'),
  require('./devops/t4-pm2-process'),
  require('./devops/t5-git-actions-cicd'),
  require('./devops/t6-vps-paas-deploy'),
  require('./devops/t7-cloudflare-dns-ssl'),
  require('./devops/t8-prod-monitoring-backup')
];

let totalQuestions = 0;
topics.forEach((t, i) => {
  const count = t.items.length;
  totalQuestions += count;
  const lvls = t.items.map(x => x.lvl);
  const lvlCounts = {};
  lvls.forEach(l => { lvlCounts[l] = (lvlCounts[l] || 0) + 1; });
  console.log(`DevOps Topic ${i + 1}: [${t.id}] ${t.name} -> ${count} Qs (${JSON.stringify(lvlCounts)})`);
});

console.log(`Total DevOps Questions: ${totalQuestions} across ${topics.length} topics.`);

const devopsCategory = {
  id: "devops",
  title: "DevOps & Cloud Engineering",
  badge: "Linux · Docker · Nginx · PM2 · CI/CD · VPS vs PaaS · Cloudflare · Monitoring",
  icon: "🚀",
  topics: topics
};

const fileContent = `// NT Tech Innovation — 04. DevOps & Cloud Engineering Mastery (${totalQuestions} Questions - 25 per Topic across 5 Levels)
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.devops = ${JSON.stringify(devopsCategory, null, 2)};
`;

const outputPath = path.resolve(__dirname, '../../data-nt-tech/04-devops.js');
fs.writeFileSync(outputPath, fileContent, 'utf8');
console.log(`Successfully compiled 04-devops.js to ${outputPath}!`);
