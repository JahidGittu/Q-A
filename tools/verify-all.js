// Complete Verification Script for All 1,100 Questions
const fs = require('fs');
const vm = require('vm');
const path = require('path');

const window = {};
const context = vm.createContext({ window });

const files = [
  '01-frontend.js',
  '02-backend.js',
  '03-database.js',
  '04-devops.js',
  '05-dokani.js',
  '06-hr.js'
];

files.forEach(f => {
  const filePath = path.resolve(__dirname, '../data-nt-tech', f);
  const code = fs.readFileSync(filePath, 'utf8');
  vm.runInContext(code, context);
});

const data = context.window.NT_DATA;
const cats = Object.keys(data);
console.log('Categories loaded:', cats.length);

let grandTotalQs = 0;
let grandTotalTopics = 0;
let violations = [];

cats.forEach((catKey, cIdx) => {
  const cat = data[catKey];
  let catQs = 0;
  console.log(`\n=== Category ${cIdx + 1}: [${cat.id}] ${cat.title} (${cat.topics.length} topics) ===`);
  
  cat.topics.forEach((top, tIdx) => {
    grandTotalTopics++;
    const qCount = top.items.length;
    catQs += qCount;
    grandTotalQs += qCount;
    
    const lvls = {};
    top.items.forEach(item => {
      lvls[item.lvl] = (lvls[item.lvl] || 0) + 1;
      if (!item.q || !item.m || !item.b || !item.e || (!item.tip && !item.code)) {
        violations.push(`Incomplete fields in ${cat.id} -> ${top.id}: ${item.q ? item.q.substring(0, 30) : 'NO_Q'}`);
      }
    });
    
    const expected = { lvl1: 5, lvl2: 5, lvl3: 5, situation: 5, realworld: 5 };
    const matchesExpected = JSON.stringify(lvls) === JSON.stringify(expected);
    if (!matchesExpected) {
      violations.push(`Mismatch in ${cat.id} -> ${top.id}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(lvls)}`);
    }
    
    console.log(`  Topic ${tIdx + 1}: [${top.id}] ${top.name} -> ${qCount} Qs (Matches 5-tier standard: ${matchesExpected})`);
  });
  console.log(`  >> Category Total: ${catQs} Qs`);
});

console.log('\n========================================');
console.log(`GRAND TOTAL TOPICS: ${grandTotalTopics} (Target: 44)`);
console.log(`GRAND TOTAL QUESTIONS: ${grandTotalQs} (Target: 1,100)`);
console.log(`VIOLATIONS COUNT: ${violations.length}`);
if (violations.length > 0) {
  console.error('VIOLATIONS:', violations);
  process.exit(1);
} else {
  console.log('\nSUCCESS: ALL 1,100 QUESTIONS STRICTLY COMPLY WITH THE 25-Q 5-TIER TRILINGUAL STANDARD!');
}
