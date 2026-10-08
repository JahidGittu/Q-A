// Topic 3: Live Outage Response & Incident Leadership (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "production-outage-stress",
  name: "Live Outage Response & Incident Leadership",
  desc: "Calm triaging, Stop-the-bleeding mindset, Rollback triggers, Post-mortem documentation, Blameless culture",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "লাইভ প্রোডাকশনে ক্র্যাশ বা আউটেজ ঘটলে তোমার প্রথম মানসিক প্রস্তুতি ও প্রাথমিক দায়িত্ব কী?",
      m: "প্রথম দায়িত্ব হলো: **'ডালপালা না খুঁজে আগে রক্তপাত বন্ধ করা' (Stop the bleeding first)**। ক্র্যাশের সময় কোড কে লিখেছিল বা কার ভুল ছিল তা খোঁজার কোনো সুযোগ নেই। মাথা ঠান্ডা রেখে টিমের সবাইকে আশ্বস্ত করা এবং অবিলম্বে সার্ভিস সচল করা (রিস্টার্ট বা রোলব্যাক দিয়ে) হলো একমাত্র অগ্রাধিকার। ক্লায়েন্ট বা স্টেকহোল্ডারদের সৎ ও পেশাদার ভাষায় আপডেট দেওয়া যে 'আমরা সমস্যাটি চিহ্নিত করেছি এবং পুনরুদ্ধারের কাজ দ্রুত চলছে'।",
      b: "প্রোডাকশন ক্র্যাশে প্রথম কাজ হলো প্যানিক না করে দ্রুত সার্ভিস চালু করা। দোষারোপ না করে রোলব্যাক বা ব্যাকআপ দিয়ে সিস্টেম সচল করাই প্রধান লক্ষ্য এবং ক্লায়েন্টকে স্পষ্ট তথ্য জানানো।",
      e: "During a live outage, priority number one is restoring uptime—'stop the bleeding'—before investigating blame or fine-grained code bugs. Keep composure, trigger an immediate rollback or service restart to restore system availability, and communicate transparent status updates to stakeholders.",
      tip: "Stop the bleeding first—এই নীতিটি সিনিয়র ইঞ্জিনিয়ারদের ট্রেডমার্ক।"
    },
    {
      lvl: "lvl1",
      q: "একটি আউটেজ ফিক্স করার পর 'Blameless Post-Mortem' কেন প্রয়োজন এবং এতে কী কী সেকশন থাকে?",
      m: "ব্লেমলেস পোস্ট-মর্টেম কোনো ব্যক্তিকে দোষারোপ করার জন্য নয়, বরং সিস্টেমের কোন দুর্বলতার কারণে ঘটনাটি ঘটেছে তা চিহ্নিত করে ভবিষ্যতে একই ঘটনার পুনরাবৃত্তি চিরতরে বন্ধ করার জন্য করা হয়। পোস্ট-মর্টেমে ৫টি মূল সেকশন থাকে: (১) **Incident Summary & Timeline:** ঠিক কয়টায় ঘটনা শুরু হয়েছিল, কয়টায় নোটিস হলো এবং কয়টায় রিকভার হলো। (২) **Business Impact:** কতজন ইউজার বা কত টাকার লেনদেন ক্ষতিগ্রস্ত হয়েছে। (৩) **Root Cause Analysis (RCA):** প্রযুক্তিগত মূল কারণ কী ছিল (যেমন আন-ইনডেক্সড কুয়েরি বা মেমোরি লিক)। (৪) **Tactical Resolution:** কীভাবে সাময়িক সমাধান করা হয়েছে। (৫) **Action Items / Preventive Measures:** ভবিষ্যতে এটি ঠেকাতে কী কী নতুন টেস্ট, সিআই গার্ড বা অ্যালার্ট বসানো হবে।",
      b: "ব্লেমলেস পোস্ট-মর্টেম কাউকে দায়ী না করে সিস্টেমের ভুলগুলো সংশোধন করার জন্য তৈরি হয়। এতে ঘটনার সময়রেখা, প্রভাব, মূল কারণ এবং ভবিষ্যতে একই সমস্যা যাতে আর কখনো না ঘটে তার স্থায়ী সমাধানের পরিকল্পনা থাকে।",
      e: "A Blameless Post-Mortem examines systemic vulnerabilities rather than individual fault. It documents the incident timeline, business impact metrics, technical root causes, tactical resolutions, and preventative action items (new integration tests, monitoring alerts, circuit breakers) to prevent identical failures.",
      tip: "পোস্ট-মর্টেমের ৫টি ধাপ পরিষ্কারভাবে বললে টিম লিডারশিপের অভিজ্ঞতা ফুটে ওঠে।"
    },
    {
      lvl: "lvl1",
      q: "প্রোডাকশনে মেমোরি লিক বা সিপিইউ স্পাইকের সময় রিস্টার্ট বনাম রোলব্যাকের সিদ্ধান্ত কীভাবে নেবে?",
      m: "সিদ্ধান্ত নির্ভর করে ঘটনার প্রেক্ষাপটের ওপর: (১) যদি সমস্যাটি সাম্প্রতিক কোনো কোড ডিপ্লয়মেন্টের ঠিক পরে শুরু হয় (যেমন নতুন ফিচার পুশ করার ১০ মিনিটের মধ্যে), তবে কোনো চিন্তা ছাড়াই **তাৎক্ষণিক পূর্বের স্টেবল ভার্সনে Rollback** করব—কারণ নতুন কোডে কোনো ক্ষতিকর বাগ আছে। (২) আর যদি অনেক দিন ধরে চলা স্টেবল ভার্সনে হঠাৎ অস্বাভাবিক ট্রাফিক স্পাইক বা দীর্ঘমেয়াদী মেমোরি জমে ক্র্যাশ করে, তবে **PM2 Rolling Reload বা ডকার রিস্টার্ট** দেব এবং সাথে সাথে Nginx লেভেলে রেট লিমিটিং ও ক্যাশিং সক্রিয় করব। রিস্টার্ট হলো সাময়িক ফ্রেশ স্টার্ট, আর রোলব্যাক হলো ত্রুটিপূর্ণ কোড প্রত্যাহার।",
      b: "নতুন কোড ডিপ্লয়ের পরপরই ক্র্যাশ করলে তাৎক্ষণিক পূর্বের স্টেবল ভার্সনে রোলব্যাক করা সবচেয়ে নিরাপদ। আর পুরোনো স্টেবল সিস্টেমে হঠাৎ ট্রাফিক বাড়লে রিস্টার্ট দিয়ে রেট লিমিট বাড়িয়ে পরিস্থিতি নিয়ন্ত্রণ করা হয়।",
      e: "If an anomaly manifests immediately following a new deployment, execute an instant code rollback—the code delta is likely defective. If memory pressure emerges gradually on an established, long-running release during a traffic surge, perform a rolling PM2 reload to flush heap memory, coupled with aggressive edge caching and API rate limiting.",
      tip: "রোলব্যাক বনাম রিস্টার্টের যৌক্তিকতা টেকনিক্যাল লিডারশিপ প্রকাশ করে।"
    },
    {
      lvl: "lvl1",
      q: "ডাউনটাইমের সময় কাস্টমার ও নন-টেকনিক্যাল স্টেকহোল্ডারদের সাথে কীভাবে পেশাদার যোগাযোগ রক্ষা করবে?",
      m: "ডাউনটাইমে রেডিও সাইলেন্স বজায় রাখা সবচেয়ে মারাত্মক ভুল। যোগাযোগের নিয়ম: (১) ঘটনার ৫-১০ মিনিটের মধ্যে স্ট্যাটাস পেজ বা সাপোর্ট চ্যানেলে সংক্ষিপ্ত বার্তা দেওয়া: 'We are currently investigating elevated error rates on checkout. Our engineering team is actively working on a resolution. Next update in 15 minutes.' (২) কোনো কাল্পনিক বা অবাস্তব সময়সীমা না দিয়ে নিয়মিত ব্যবধানে বাস্তব অগ্রগতি জানানো। (৩) ইন্টারনাল টেকনিক্যাল জটিলতা (যেমন 'V8 garbage collector failed') না বলে সহজ ব্যবসায়িক ভাষায় জানানো। (৪) সিস্টেম ঠিক হওয়ার পর ক্ষমা চাওয়া এবং রেজোলিউশন নিশ্চিত করা।",
      b: "নীরব না থেকে দ্রুত ক্লায়েন্ট ও ম্যানেজমেন্টকে পরিস্থিতি জানানো। নিয়মিত বিরতিতে অগ্রগতির আপডেট দেওয়া এবং বিভ্রান্তিকর টেকনিক্যাল ভাষা পরিহার করে সহজ ভাষায় সমাধান প্রক্রিয়া তুলে ধরা।",
      e: "Radio silence during an outage breeds panic. Best practice dictates acknowledging the incident within 5–10 minutes via status channels: articulating the affected scope, confirming active engineering triage, and committing to regular 15-minute update cadences. Avoid defensive jargon, focus on resolution progress, and conclude with a transparent restoration confirmation.",
      tip: "Regular update cadence এবং No defensive jargon বিশ্বমানের গ্রাহক আস্থা তৈরি করে।"
    },
    {
      lvl: "lvl1",
      q: "হাই-প্রেসার আউটেজের সময় Incident Commander বা 'একক সিদ্ধান্তকারী'-র ভূমিকা কেন অপরিহার্য?",
      m: "যখন প্রোডাকশন ডাউন থাকে, তখন ৪-৫ জন ইঞ্জিনিয়ার একসাথে এলোমেলোভাবে সার্ভারে কনফিগ বদলালে বা কোড পুশ করলে পরিস্থিতি ১০০ গুণ খারাপ হয়ে যায়। তাই একজন Incident Commander (IC) থাকা অপরিহার্য। IC-এর দায়িত্ব হলো: (১) পুরো ঘটনার সিঙ্গেল পয়েন্ট অব কোঅর্ডিনেশন হিসেবে কাজ করা। (২) একজনকে ডাটাবেজ লগ চেক করতে দেওয়া, অন্যজনকে সার্ভার মেট্রিক্স চেক করতে বলা—যাতে কোনো ডুপ্লিকেট কাজ না হয়। (৩) কোনো বড় পদক্ষেপ (যেমন ডাটাবেজ রিস্টার্ট বা রোলব্যাক) নেওয়ার আগে সবার সম্মতিতে ফাইনাল সিদ্ধান্ত দেওয়া। এবং (৪) ম্যানেজমেন্টের সাথে কথা বলে ইঞ্জিনিয়ারদের অপ্রয়োজনীয় চাপ থেকে মুক্ত রাখা যাতে তারা মন দিয়ে ফিক্স করতে পারে।",
      b: "আউটেজের সময় এলোমেলো পদক্ষেপ না নিয়ে একজন নির্দিষ্ট কমান্ডারের নেতৃত্বে কাজ করা জরুরি। তিনি দায়িত্ব ভাগ করে দেন এবং ম্যানেজমেন্টের সাথে যোগাযোগ রেখে ইঞ্জিনিয়ারদের শান্তভাবে কাজ করার পরিবেশ নিশ্চিত করেন।",
      e: "An Incident Commander (IC) establishes operational command during high-chaos outages. The IC coordinates diagnostic assignments (preventing duplicate investigations), authorizes drastic actions (service restarts, rollbacks), and shields triage engineers from executive interruptions, maintaining calm focus on systemic recovery.",
      tip: "Incident Commander প্যাটার্ন সিলিকন ভ্যালি ও বিশ্বসেরা DevOps টিমের মানদণ্ড।"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Nginx ও PM2 আর্কিটেকচারে হঠাৎ '502 Bad Gateway' এরর আসলে তুমি ধাপে ধাপে কীভাবে ডিবাগ করবে?",
      m: "৫টি দ্রুত স্টেপে রুট কজ বের করব: (১) **PM2 Process Status:** `pm2 status` বা `pm2 list` দিয়ে দেখব নোডজেএস ব্যাকএন্ড অ্যাপ চালু আছে নাকি এরর খেয়ে ক্র্যাশ করেছে (Errored / Stopped)। (২) **PM2 Error Logs:** `pm2 logs --err --lines 50` দিয়ে দেখব কোনো আনহ্যান্ডেল্ড এক্সেপশন বা সিনট্যাক্স এররে প্রসেস ডাই করছে কিনা। (৩) **Port Listening Check:** `netstat -tulnp | grep 3000` বা `lsof -i :3000` দিয়ে দেখব ব্যাকএন্ড পোর্ট শুনছে কিনা। (৪) **Nginx Error Log:** `/var/log/nginx/error.log` চেক করব—যদি 'connect() failed (111: Connection refused)' দেখায় তবে স্পষ্ট ব্যাকএন্ড অফলাইন। (৫) ব্যাকএন্ড ক্র্যাশ থাকলে ফিক্স করে `pm2 reload` করব; আর Nginx কনফিগে ভুল পোর্ট থাকলে কারেক্ট করে `sudo nginx -s reload` করব।",
      b: "প্রথমে pm2 status দিয়ে ব্যাকএন্ড চালু আছে কিনা দেখি। এরপর pm2 logs এবং এনজিনিক্সের error.log চেক করে পোর্ট কানেকশন যাচাই করি। ব্যাকএন্ড ডাউন থাকলে রিস্টার্ট দিয়ে এপিআই সচল করি।",
      e: "To diagnose a 502 Bad Gateway: check PM2 runtime state via `pm2 status` to identify crashed worker threads; inspect `pm2 logs --err --lines 50` for uncaught runtime exceptions; verify port binding via `netstat -tulnp | grep :3000`; inspect `/var/log/nginx/error.log` for connection-refused signatures; and execute a rolling reload once the offending upstream process is stabilized.",
      code: "# 1-Minute 502 Triage in Terminal:\npm2 status\npm2 logs --err --lines 30\nsudo tail -n 30 /var/log/nginx/error.log\nsudo systemctl status nginx"
    },
    {
      lvl: "lvl2",
      q: "পোস্টগ্রেস ডাটাবেজে Connection Pool Exhaustion (কানেকশন ফুল) হয়ে এপিআই হ্যাং করলে তাৎক্ষণিক কী করবে?",
      m: "আমার তাৎক্ষণিক পদক্ষেপ: (১) সার্ভারে টার্মিনালে ঢুকে দ্রুত `psql` দিয়ে কানেক্ট হব এবং কুয়েরি চালাব: `SELECT pid, state, query_start, now() - query_start AS duration, query FROM pg_stat_activity WHERE state != 'idle' ORDER BY duration DESC;`। (২) দেখব কোন কুয়েরিগুলো মিনিট ধরে টেবিল লক করে বসে আছে। (৩) `SELECT pg_terminate_backend(pid);` দিয়ে সেই হ্যাঙ্গিং প্রসেসগুলোকে অবিলম্বে কিল করব। (৪) সাথে সাথে সব এপিআই রিকোয়েস্ট কানেকশন ছেড়ে দেবে এবং সিস্টেম স্বাভাবিক হবে। (৫) স্থায়ী সমাধানে PgBouncer-এ 'Transaction Pooling' নিশ্চিত করব এবং নোডজেএস Prisma Client-এ `connection_limit` যুক্ত করব।",
      b: "ডাটাবেজ কানেকশন ফুল হলে pg_stat_activity চালিয়ে লং-রানিং কুয়েরিগুলো চিহ্নিত করি এবং pg_terminate_backend দিয়ে তা বন্ধ করে কানেকশন ফ্রি করি। পরবর্তীতে প্রিজমা কানেকশন লিমিট টিউন করি।",
      e: "Connection exhaustion triage: access PostgreSQL via CLI; query `pg_stat_activity` filtered by long-running non-idle queries; execute `pg_terminate_backend(pid)` to kill runaway blocking processes and immediately restore connection capacity; and permanently configure PgBouncer transaction pooling with tuned client-side connection limits.",
      code: "-- Isolate hanging queries:\nSELECT pid, now() - query_start AS duration, query \nFROM pg_stat_activity \nWHERE state = 'active' AND now() - query_start > interval '10 seconds';\n\n-- Terminate blocking query:\nSELECT pg_terminate_backend(pid);"
    },
    {
      lvl: "lvl2",
      q: "Node.js অ্যাপে V8 Out-of-Memory (Heap Limit Allocation Failed) ক্র্যাশ লুপ হলে কীভাবে ট্যাকল করবে?",
      m: "যখন নোডজেএস মেমোরি ফুল হয়ে ক্র্যাশ করে, তখন সাময়িক পদক্ষেপ: (১) `ecosystem.config.js`-এ `--max-old-space-size=4096` দিয়ে মেমোরি লিমিট ২জিবি থেকে ৪জিবি বাড়িয়ে দেব এবং `max_memory_restart: '3G'` দেব যাতে ক্র্যাশ না করে স্বয়ংক্রিয় রিলোড হয়। (২) রুট কজ ইনভেস্টিগেশন: ক্র্যাশের আগের লগ দেখে বের করব কোন এন্ডপয়েন্টে হিট হয়েছিল—সাধারণত কোনো ডেভেলপার `SELECT *` দিয়ে হাজার হাজার ডাটা অবজেক্ট একসাথে মেমোরিতে লোড করলে বা গ্লোবাল অ্যারেতে পুশ করলে মেমোরি লিক হয়। (৩) কুয়েরিতে `take: 50` পেজিনেশন বসাব বা Node.js Stream ব্যবহার করে চাঙ্ক আকারে প্রসেস করব।",
      b: "মেমোরি ক্র্যাশে সাময়িকভাবে মেমোরি লিমিট বাড়িয়ে প্রসেস চালু রাখি। এরপর লগে দেখে কোন এপিআই থেকে অতিরিক্ত ডাটা লোড হচ্ছিল তা খুঁজে বের করে ডাটাবেজ পেজিনেশন বা স্ট্রিম চালু করে মেমোরি লিক বন্ধ করি।",
      e: "For Node.js heap exhaustion: apply tactical breathing room in PM2 by raising `--max-old-space-size=4096` and enforcing `max_memory_restart: '3G'`; isolate the root-cause endpoint via access logs (frequently an unpaginated query hydrating 50,000+ objects into memory); and refactor the code to utilize cursor-based pagination or Node.js streaming pipelines.",
      tip: "--max-old-space-size এবং Pagination/Streaming উল্লেখ করা মেমোরি অপটিমাইজেশনের মূল কথা।"
    },
    {
      lvl: "lvl2",
      q: "কোনো আন-ইনডেক্সড স্লো কুয়েরি যদি পুরো ডাটাবেজ টেবিল লক করে ফেলে, তবে কীভাবে লাইভে সনাক্ত ও সমাধান করবে?",
      m: "লাইভ ডিবাগিং: (১) `pg_stat_statements` বা `pg_stat_activity` থেকে দেখতে পাব কোন নির্দিষ্ট কুয়েরিটি শত শত সেকেন্ড ধরে এক্সিকিউট হচ্ছে। (২) কুয়েরিটির ওপর `EXPLAIN ANALYZE` চালালে দেখব এটি 'Sequential Scan' (Seq Scan) করছে এবং লাখ লাখ রো স্ক্যান করছে। (৩) টেবিল যাতে এক্সক্লুসিভ লক না খায়, সেজন্য অবিলম্বে কনকারেন্টলি ইনডেক্স তৈরি করব: `CREATE INDEX CONCURRENTLY idx_orders_tenant_created ON orders (tenant_id, created_at);`। `CONCURRENTLY` কি-ওয়ার্ড ব্যবহার করায় কোনো রিড বা রাইট ব্লক না হয়ে ব্যাকগ্রাউন্ডে ইনডেক্স তৈরি হয়ে যায় এবং কুয়েরি টাইম সেকেন্ডের ভগ্নাংশে নেমে আসে।",
      b: "স্লো কুয়েরি চিহ্নিত করে EXPLAIN ANALYZE দিয়ে সিকোয়েন্সিয়াল স্ক্যান শনাক্ত করি। ডাটাবেজে লক না ফেলে দ্রুত ব্যাকগ্রাউন্ডে CREATE INDEX CONCURRENTLY কমান্ড দিয়ে ইনডেক্স তৈরি করে কুয়েরির গতি বাড়াই।",
      e: "Identify table-locking queries via pg_stat_activity and analyze execution plans with EXPLAIN ANALYZE to detect unindexed sequential scans. Crucially, patch the performance bottleneck in production without locking writes by executing `CREATE INDEX CONCURRENTLY`, enabling background index construction while maintaining full table availability.",
      code: "-- Create index without locking the production table:\nCREATE INDEX CONCURRENTLY idx_invoices_tenant_barcode \nON invoices (tenant_id, barcode);"
    },
    {
      lvl: "lvl2",
      q: "Cloudflare DNS এরর বা SSL সার্টিফিকেট এক্সপায়ারের কারণে সাইট ডাউন হলে কীভাবে দ্রুত রিকভার করবে?",
      m: "রিকভারি স্টেপস: (১) ব্রাউজারের এরর কোড লক্ষ্য করব: 'Error 525: SSL Handshake Failed' বা 'Error 521: Web Server is Down'। (২) যদি SSL হ্যান্ডশেক ফেইল করে, Cloudflare ড্যাশবোর্ডে গিয়ে SSL/TLS মোড 'Full (Strict)' থেকে সাময়িকভাবে 'Full' বা 'Flexible'-এ নামিয়ে দেব যাতে ক্লাউডফ্লেয়ারের সাথে কানেকশন তৎক্ষণাৎ সচল হয়। (৩) এরপর অরিজিন সার্ভারে ঢুকে Certbot দিয়ে লেটস এনক্রিপ্ট সার্টিফিকেট রিনিউ করব: `sudo certbot renew --force-renewal`। (৪) Nginx রিলোড করে আবার ক্লাউডফ্লেয়ারে 'Full (Strict)' ফিরিয়ে দেব। (৫) ভবিষ্যতে ক্রন জবে রিনিউয়াল টেস্ট শিডিউল করে রাখব।",
      b: "ক্লাউডফ্লেয়ারে SSL মোড সাময়িক অ্যাডজাস্ট করে সাইট লাইভ করি। এরপর সার্ভারে সার্টবট দিয়ে সার্টিফিকেট রিনিউ করে এনজিনিক্স রিলোড দিই এবং অটো-রিনিউ ক্রন জব কনফিগার করে রাখি।",
      e: "For SSL/Cloudflare outages: decode the edge HTTP status (525 SSL Handshake Failed vs 521 Server Down); temporarily toggle Cloudflare SSL to 'Full' to mitigate immediate client disconnects; access the origin server to trigger `certbot renew --nginx`; reload Nginx; and restore Cloudflare to 'Full (Strict)' while validating crontab auto-renewal timers.",
      tip: "Error 525/521 এবং Certbot renew রিয়েল-ওয়ার্ল্ড ক্লাউডফ্লেয়ার অভিজ্ঞতার প্রমাণ।"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "মাইক্রোসার্ভিস বা থার্ড-পার্টি এপিআইয়ের জন্য 'Circuit Breaker Pattern' কীভাবে কাজ করে এবং কেন গুরুত্বপূর্ণ?",
      m: "সার্কিট ব্রেকার ঠিক ঘরের বৈদ্যুতিক কাট-আউটের মতো কাজ করে। যখন কোনো থার্ড-পার্টি সার্ভিস (যেমন SMS গেটওয়ে বা পেমেন্ট গেটওয়ে) ধীরগতির হয়ে যায় বা ৫০৩ এরর দেওয়া শুরু করে, তখন সাধারণ কোড বারবার রিকোয়েস্ট পাঠাতে থাকে এবং থ্রেড ব্লক করে মূল সিস্টেমও ক্র্যাশ করিয়ে ফেলে। সার্কিট ব্রেকার ৩টি স্টেটে চলে: (১) **Closed (স্বাভাবিক):** সব রিকোয়েস্ট স্বাভাবিকভাবে যায়। (২) **Open (বিচ্ছিন্ন):** পর পর ৫টি রিকোয়েস্ট ফেইল করলে সার্কিট ওপেন হয়ে যায়; পরবর্তী রিকোয়েস্টগুলো থার্ড-পার্টিকে আর কল না করে লোকাল ফলব্যাক রিটার্ন করে। (৩) **Half-Open (পরীক্ষা):** ৬০ সেকেন্ড পর ১টি টেস্ট রিকোয়েস্ট পাঠিয়ে দেখে সার্ভিস সুস্থ হয়েছে কিনা। এটি পুরো সিস্টেমকে ক্যাসকেডিং ফেইলিউর থেকে বাঁচায়।",
      b: "সার্কিট ব্রেকার ধীরগতির থার্ড-পার্টি সার্ভিসের কারণে মূল সিস্টেম হ্যাং হওয়া থেকে রক্ষা করে। কোনো সার্ভিস ডাউন হলে এটি সাময়িকভাবে কল করা বন্ধ রেখে ফলব্যাক রেসপন্স দেয় এবং সার্ভিস ঠিক হলে পুনরায় সংযোগ স্থাপন করে।",
      e: "The Circuit Breaker pattern prevents cascading system failure when downstream third-party services degrade. Operating across three states—Closed (healthy throughput), Open (tripped after consecutive failures, immediately failing fast or returning fallback responses without consuming network sockets), and Half-Open (canary probing to test downstream recovery)—it insulates core platform availability.",
      tip: "Closed, Open, Half-Open তিন স্টেট ব্যাখ্যা করা আর্কিটেকচারাল ইন্টারভিউয়ের সেরা উত্তর।"
    },
    {
      lvl: "lvl3",
      q: "Dokani POS-এ 'Graceful Degradation' কীভাবে কার্যকর করেছিলে যাতে সেকেন্ডারি সার্ভিস ফেইল করলেও বিলিং চালু থাকে?",
      m: "আমাদের আর্কিটেকচারাল নীতি: 'যাই ঘটুক না কেন, কাউন্টারের ক্যাশিয়ার যেন বিল ও প্রিন্ট করতে পারে'। তাই আমরা মূল বিলিং ফ্লো থেকে সেকেন্ডারি ফিচারগুলোকে সম্পূর্ণ ডিকাপল করেছি: (১) ইনভয়েস প্রিন্ট হওয়ার পর কাস্টমারকে SMS পাঠানোর সার্ভিস যদি ফেইল করে বা সময় নেয়, তবে এটি মূল এপিআইকে ব্লক করে না; SMS টাস্কটি ব্যাকগ্রাউন্ড কিউতে (Redis/BullMQ) চলে যায়। (২) অ্যানালিটিক্স ড্যাশবোর্ড যদি লোডের কারণে ডাউন থাকে, তবে পিওএস বিলিং এপিআই সম্পূর্ণ অক্ষত থাকে কারণ এগুলো আলাদা রুটে চলে। এটিই হলো গ্রেসফুল ডিগ্রেডেশন—প্রধান কাজ সচল রেখে অপ্রধান কাজে ছাড় দেওয়া।",
      b: "বিলিংয়ের মূল কাজের সাথে এসএমএস বা রিপোর্টিংয়ের মতো সেকেন্ডারি সার্ভিস ডিকাপল করে রাখা হয়েছে। ফলে এসএমএস গেটওয়ে ডাউন থাকলেও ক্যাশিয়ারের বিলিং ও প্রিন্টিং এক সেকেন্ডের জন্যও বিঘ্নিত হয় না।",
      e: "Graceful degradation isolates core revenue paths from peripheral services. In Dokani, primary invoice generation and thermal receipt printing are decoupled from non-essential services: SMS customer notifications are offloaded asynchronously to background queues. If SMS or analytics APIs crash, checkout continues uninterrupted.",
      tip: "Graceful degradation এবং Decoupled background queues আর্কিটেকচারের শক্তিমত্তা প্রকাশ করে।"
    },
    {
      lvl: "lvl3",
      q: "পার্শিয়াল ডাটা রাইট বা আনএক্সপেক্টেড পাওয়ার লসের পর ডাটা করাপশন রোধ ও রিকভারির কৌশল কী?",
      m: "ডাটা করাপশন ঠেকাতে ৩ স্তরের সুরক্ষা: (১) **ACID Database Transactions:** যেকোনো বহুমুখী অপারেশন (যেমন স্টক কমানো + ইনভয়েস তৈরি + ক্যাশ লেজার এন্ট্রি) একটিমাত্র ডাটাবেজ ট্রানজেকশনে আবদ্ধ থাকে—মাঝপথে বিদ্যুৎ চলে গেলে বা সার্ভার ক্র্যাশ করলে ডাটাবেজ ইঞ্জিন স্বয়ংক্রিয়ভাবে পুরো পরিবর্তন রোলব্যাক করে দেয়। কোনো অর্ধেক ডাটা সেভ হয় না। (২) **Audit Ledgers:** প্রতিটি পরিবর্তনের জন্য অপরিবর্তনীয় অডিট লগ রাখা হয়। (৩) **Point-in-Time Recovery (PITR):** কোনো বড় বিপর্যয় ঘটলে PostgreSQL Write-Ahead Logs (WAL) এবং অটোমেটেড স্ন্যাপশট থেকে ঠিক দুর্ঘটনার ১ মিনিট আগের নির্ভুল অবস্থায় ডাটাবেজ রিস্টোর করা যায়।",
      b: "অ্যাটোমিক ট্রানজেকশনের কারণে ক্র্যাশ হলেও অর্ধেক ডাটা সেভ না হয়ে পুরো রোলব্যাক হয়ে যায়। এছাড়া পোস্টগ্রেস রাইট-এহেড লগ ও ব্যাকআপ থেকে যেকোনো নির্দিষ্ট সময়ের আগের ডাটা অক্ষতভাবে পুনরুদ্ধার করা সম্ভব।",
      e: "Data integrity is safeguarded through atomic ACID transactions—if an unexpected server termination interrupts an invoice write, PostgreSQL's WAL automatically rolls back uncommitted stages, guaranteeing zero orphan rows. Point-in-Time Recovery (PITR) paired with immutable double-entry ledger audits ensures deterministic reconstruction if disaster recovery is necessitated.",
      tip: "PostgreSQL Write-Ahead Logging (WAL) এবং PITR উল্লেখ করা অত্যন্ত উচ্চমানের।"
    },
    {
      lvl: "lvl3",
      q: "অনাকাঙ্ক্ষিত ট্রাফিক স্পাইক বা অ্যাটাকের সময় Nginx ও Cloudflare-এ রেট-লিমিটিং কীভাবে কনফিগার করবে?",
      m: "আমরা মাল্টি-লেয়ার রেট লিমিটিং ব্যবহার করি: (১) **Cloudflare WAF:** বট ট্রাফিক বা ডিরেক্ট DDoS রুখতে ক্লাউডফ্লেয়ারে প্রতি আইপিতে প্রতি মিনিটে সর্বোচ্চ ৬০টি রিকোয়েস্টের রুল এবং আন্ডার অ্যাটাক মোড রাখি। (২) **Nginx Leaky Bucket Rate Limiting:** Nginx কনফিগে `limit_req_zone $binary_remote_addr zone=api_limit:10m rate=15r/s;` ডিক্লেয়ার করি এবং এপিআই ব্লকে `limit_req zone=api_limit burst=20 nodelay;` বসাই। এর ফলে সাধারণ ইউজার স্মুথলি কাজ করতে পারে, কিন্তু কোনো অটোমেটেড স্ক্রিপ্ট বা স্প্যামার অতিরিক্ত কল দিলে সাথে সাথে '429 Too Many Requests' এরর পেয়ে ব্লক হয়ে যায় এবং ব্যাকএন্ড নোড সার্ভার নিরাপদ থাকে।",
      b: "ক্লাউডফ্লেয়ার ডব্লিউএএফ এবং এনজিনিক্সের limit_req_zone ব্যবহার করে প্রতি সেকেন্ডে নির্দিষ্ট রিকোয়েস্টের সীমা নির্ধারণ করি। অতিরিক্ত ক্ষতিকর রিকোয়েস্ট ৪২৯ এরর দিয়ে আটকে ব্যাকএন্ড সার্ভারকে সুরক্ষিত রাখা হয়।",
      e: "Rate limiting is deployed in depth: Cloudflare edge rules filter malicious bot floods and challenge anomalous geo-sources; origin Nginx applies a leaky-bucket algorithm via `limit_req_zone $binary_remote_addr zone=api_limit:10m rate=15r/s` with a burst buffer of 20. Excessive bursts immediately yield HTTP 429 Too Many Requests, protecting upstream Node.js event loops.",
      code: "# Nginx Leaky-Bucket Rate Limiting:\nlimit_req_zone $binary_remote_addr zone=api_limit:10m rate=15r/s;\n\nlocation /api/ {\n    limit_req zone=api_limit burst=20 nodelay;\n    proxy_pass http://localhost:3000;\n}"
    },
    {
      lvl: "lvl3",
      q: "একটি এন্টারপ্রাইজ ইঞ্জিনিয়ারিং টিমের জন্য একটি কার্যকর 'Incident Response Runbook'-এর গঠন কেমন হওয়া উচিত?",
      m: "রানবুক হলো ইমার্জেন্সির জন্য একটি ক্লিয়ার স্টেপ-বাই-স্টেপ গাইড যাতে প্যানিক না হয়: (১) **Alert Severity Definitions:** P0 (পুরো সাইট ডাউন), P1 (কোর ফিচার ডাউন), P2 (মাইনর ইস্যু)। (২) **First 5 Minutes Checklist:** লগ ফাইল কোথায় আছে, সার্ভার স্ট্যাটাস কমান্ড, ব্যাকআপ ডিরেক্টরি। (৩) **Decision Trees & Diagrams:** যদি 502 এরর আসে তবে পৃষ্ঠা ২-এ যাও, যদি ডাটাবেজ লক হয় তবে পৃষ্ঠা ৪-এ যাও। (৪) **Emergency Contacts & Escalation Matrix:** কার কার ফোন নম্বর এবং কাকে কখন কল করতে হবে। (৫) **Rollback Snippets:** ঠিক কোন কমান্ডটি চালালে পূর্বের স্টেবল ভার্সনে ফেরা যাবে। এটি থাকলে নতুন ইঞ্জিনিয়ারও নির্ভুলভাবে ক্রাইসিস ম্যানেজ করতে পারে।",
      b: "রানবুকে সমস্যার গুরুত্বের লেভেল, প্রথম ৫ মিনিটের করণীয় তালিকা, কমান্ড এবং যোগাযোগের নম্বর স্পষ্টভাবে লেখা থাকে। ফলে জরুরি মুহূর্তে যে কেউ বিভ্রান্ত না হয়ে নির্দেশিকা দেখে দ্রুত সিস্টেম রিকভার করতে পারে।",
      e: "An Incident Response Runbook provides an unambiguous operational playbook: severity classification matrices (P0 through P3); first-5-minutes diagnostic checklists (terminal paths, telemetry dashboards); deterministic decision trees (if 502 follow flow A, if deadlock follow flow B); escalation hierarchies with telephone contacts; and verified single-line rollback scripts.",
      tip: "Deterministic Decision Trees এবং P0-P3 Severity Matrices লিডারশিপের লক্ষণ।"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "Dokani POS-এ শুক্রবার বিকেলে সর্বোচ্চ পিক সেলস আওয়ারে হঠাৎ ডাটাবেজ কানেকশন পুল ফুল হয়ে সব ক্যাশিয়ার এরর পাচ্ছিল। কীভাবে লাইভ ৫ মিনিটে ফিক্স করেছিলে?",
      m: "শুক্রবার বিকেলে দোকানে ভিড় সবচেয়ে বেশি। আমি দ্রুত: (১) লিনাক্স টার্মিনালে ঢুকে `SELECT * FROM pg_stat_activity WHERE state = 'active';` চালিয়ে দেখলাম বেশ কিছু লং-রানিং অ্যানালিটিক্স কুয়েরি কানেকশন ধরে রেখেছে। (২) `pg_terminate_backend(pid)` দিয়ে লং কুয়েরিগুলো বন্ধ করে তৎক্ষণাৎ কানেকশন ফ্রি করলাম। (৩) PgBouncer-এর পুল মোড 'Session' থেকে 'Transaction Pooling' নিশ্চিত করলাম যাতে কুয়েরি শেষ হওয়ামাত্র কানেকশন পুলে ফেরত যায়। (৪) স্থায়ী সমাধানে ভারী রিপোর্টের জন্য অফ-পিক শিডিউলিং কনফিগার করলাম। ২ মিনিটের মধ্যে সব কাউন্টারে সেলস স্বাভাবিক হয়ে এসেছিল।",
      b: "পিক আওয়ারে ডাটাবেজ লক হলে আমরা লং-রানিং ভারী কুয়েরিগুলো চিহ্নিত করে তাৎক্ষণিক বন্ধ করি এবং কানেকশন পুল মুক্ত করি। পিজিবউন্সার দিয়ে ট্রানজেকশন পুলিং নিশ্চিত করে দ্রুত সব কাউন্টারের বিক্রি সচল করা হয়।",
      e: "During a peak checkout rush, saturated DB connections were resolved by querying pg_stat_activity to isolate hanging queries and terminating them via pg_terminate_backend. I enforced PgBouncer transaction pooling mode to aggressively recycle idle connections, later scheduling heavy analytics queries to asynchronous off-peak batch windows.",
      tip: "বাস্তব কমান্ড pg_stat_activity ও pg_terminate_backend ইন্টারভিউতে উল্লেখ করা অত্যন্ত প্রভাবশালী।"
    },
    {
      lvl: "situation",
      q: "একজন জুনিয়র ডেভেলপার ভুলবশত সরাসরি প্রোডাকশন ডাটাবেজে ভুল মাইগ্রেশন পুশ করে একটি প্রয়োজনীয় কলাম ড্রপ করে ফেলেছে—কীভাবে তাৎক্ষণিক ডাটা পুনরুদ্ধার করবে?",
      m: "আমার তাৎক্ষণিক ইমার্জেন্সি রিকভারি: (১) কোনো বকাঝকা না করে সার্ভারে ট্রাফিক সাময়িকভাবে মেইনটেন্যান্স পেজে নিই যাতে নতুন ভুল ডাটা না ঢোকে। (২) আমাদের সেন্ট্রালাইজড দৈনিক ব্যাকআপ স্ন্যাপশট ডিরেক্টরিতে যাই। (৩) একটি আলাদা টেম্পোরারি ডাটাবেজ স্পিন আপ করে সর্বশেষ স্ন্যাপশট রিস্টোর করি: `pg_restore -d temp_restore_db backup_latest.dump`। (৪) টেম্পোরারি ডাটাবেজ থেকে ড্রপ হওয়া কলামটির ডাটা এক্সপোর্ট করে প্রোডাকশন টেবিলে মার্জ করি: `INSERT INTO production.table SELECT ... FROM temp_restore_db`। (৫) ড্রপ হওয়া সময়ের মধ্যবর্তী ডাটা WAL লগ থেকে সিঙ্ক করি। এবং (৬) ভবিষ্যতে প্রোডাকশনে কোনো আন-রিভিউড মাইগ্রেশন আটকানোর জন্য সিআই/সিডি পারমিশন লক করে দিই।",
      b: "আগে মেইনটেন্যান্স মোড অন করে নতুন ডাটা এন্ট্রি আটকাই। এরপর ব্যাকআপ স্ন্যাপশট থেকে টেম্পোরারি ডাটাবেজে ডাটা রিস্টোর করে ড্রপ হওয়া কলাম প্রোডাকশনে মার্জ করি এবং ভবিষ্যতে ডিরেক্ট মাইগ্রেশন নিষিদ্ধ করি।",
      e: "Emergency data recovery: switch edge routing to a maintenance splash to halt data pollution; restore the most recent point-in-time automated pg_dump snapshot into an isolated temporary database; extract and merge the dropped column records into the production table using targeted SQL upserts; and permanently revoke direct schema mutation permissions via CI/CD branch protection rules.",
      tip: "Temporary database restore এবং Branch protection rules বাস্তব সমাধান।"
    },
    {
      lvl: "situation",
      q: "সার্ভার সম্পূর্ণ আন-রেসপনসিভ, SSH কানেকশন টাইম-আউট হচ্ছে এবং সিপিইউ ১০০% পিনড—কীভাবে রিকভার করবে?",
      m: "যখন সাধারণ SSH পোর্ট আটকে যায়: (১) ক্লাউড প্রোভাইডার কনসোলে (যেমন DigitalOcean বা Hetzner বা AWS) যাই এবং ওয়েব-বেসড Emergency Web Console / VNC টার্মিনাল ওপেন করি—এটি নেটওয়ার্ক ড্রপ হলেও সরাসরি সার্ভার কার্নেলে এক্সেস দেয়। (২) লগইন করে `top` বা `htop` চালিয়ে দেখি কোন প্রসেস সিপিইউ ১০০% খাচ্ছে। (৩) যদি কোনো রানঅ্যাওয়ে প্রসেস বা ইনফিনিট লুপ স্ক্রিপ্ট থাকে, `kill -9 <PID>` দিয়ে কিল করি। (৪) যদি পুরো কার্নেল হ্যাং থাকে, কনসোল থেকে হার্ড রিবুট (ACPI Reboot) দিই। (৫) রিবুটের পর সিস্টেম লগ `/var/log/syslog` পরীক্ষা করে রুট কজ বের করি।",
      b: "ক্লাউড প্রোভাইডারের ওয়েব কনসোল দিয়ে সার্ভারে লগইন করি। টপ কমান্ড দিয়ে সিপিইউ দখলকারী প্রসেস বন্ধ করি অথবা হার্ড রিবুট দিই এবং পরে সিসলগ দেখে মূল কারণ চিহ্নিত করি।",
      e: "When SSH is unresponsive due to 100% CPU lockup: access the server out-of-band via cloud provider VNC / Emergency Web Console; execute `htop` to identify rogue processes eating CPU cycles; terminate them via `kill -9`; perform an ACPI hard reboot if the kernel scheduler is completely deadlocked; and inspect `/var/log/syslog` post-boot to diagnose the underlying CPU spike.",
      tip: "Out-of-band Web Console / VNC টার্মিনাল জানা যেকোনো ডেভঅপ্স ইঞ্জিনিয়ারের ট্রাম্প কার্ড।"
    },
    {
      lvl: "situation",
      q: "পিক আওয়ারে থার্ড-পার্টি পেমেন্ট গেটওয়ে (bKash/Stripe) হঠাৎ 504 গেটওয়ে টাইম-আউট দেওয়া শুরু করল—পিওএস টার্মিনালকে কীভাবে সচল রাখবে?",
      m: "আমার তাৎক্ষণিক পদক্ষেপ: (১) কাস্টমার যেন কাউন্টারে আটকে না থাকে, ফ্রন্টএন্ডে পেমেন্ট অপশনে বিকাশ বা কার্ড গেটওয়ে সাময়িকভাবে 'Offline / Maintenance' হিসেবে ফ্ল্যাগ করে ক্যাশ পেমেন্ট বা ম্যানুয়াল বিকল্প হাইলাইট করব। (২) ব্যাকএন্ডে গেটওয়ের এপিআই টাইম-আউট কমিয়ে ৩ সেকেন্ড করে দেব যাতে ক্যাশিয়ারদের স্ক্রিন ৩০ সেকেন্ড ধরে লোডিং না দেখায়। (৩) যেসব ট্রানজেকশন অলরেডি মাঝপথে আটকে গেছে, সেগুলোকে 'PAYMENT_PENDING' টেবিলে রেখে ব্যাকগ্রাউন্ডে অ্যাসিনক্রোনাস ভেরিফিকেশন ক্রন চালিয়ে দেব। ফলে কাউন্টারের ফ্লো বন্ধ হবে না।",
      b: "ফ্রন্টএন্ডে ডাউন থাকা পেমেন্ট মেথডটি সাময়িকভাবে বন্ধ রেখে ক্যাশ পেমেন্টকে অগ্রাধিকার দিই। ব্যাকএন্ডের টাইম-আউট কমিয়ে দিই যাতে ইউজার স্ক্রিন ফ্রিজ না হয় এবং পেন্ডিং ট্রানজেকশন ব্যাকগ্রাউন্ডে চেক করি।",
      e: "Mitigation protocol: dynamically disable the degraded payment provider on the checkout UI, routing traffic toward Cash or manual payment alternatives; reduce upstream HTTP client timeouts from 30s down to 3s to prevent UI thread freezing; and isolate pending checkout intents in a background reconciliation queue for asynchronous verification.",
      tip: "Dynamic payment method disablement এবং Reduced timeouts প্র্যাকটিক্যাল ফিনটেক প্র্যাকটিস।"
    },
    {
      lvl: "situation",
      q: "আউটেজের সময় কোম্পানির সিইও বা ফাউন্ডার স্ল্যাকে প্যানিক করে জিজ্ঞেস করছে: 'কখন ঠিক হবে?!'—কীভাবে উত্তর দেবে?",
      m: "আমি প্যানিক না করে শান্ত ও আত্মবিশ্বাসী ভাষায় উত্তর দেব: 'হ্যাল্লো [নাম], আমরা সমস্যাটি শনাক্ত করেছি—ডাটাবেজ কানেকশন পুলে একটি লক লেগেছিল যার কারণে চেকআউটে এরর আসছিল। আমরা অলরেডি লং কুয়েরিগুলো কিল করেছি এবং সার্ভিস রিস্টোরেশনের শেষ ধাপে আছি। আগামী ৮ থেকে ১০ মিনিটের মধ্যে সিস্টেম সম্পূর্ণ স্বাভাবিক হয়ে যাবে। ঠিক ১০ মিনিট পর আমি আপনাকে কনফার্মেশন ও সংক্ষিপ্ত সামারি আপডেট দিচ্ছি।' কোনো মিথ্যা আশ্বাস দেব না, কিন্তু স্পষ্ট অগ্রগতি ও সময়সীমা জানালে লিডারশিপ আশ্বস্ত থাকে।",
      b: "প্যানিক না করে শান্তভাবে সমস্যা ও নেওয়া পদক্ষেপ জানাই। ৮-১০ মিনিটের বাস্তবসম্মত সময়সীমা দিয়ে আশ্বস্ত করি এবং নির্ধারিত সময়ে কাজের অগ্রগতির আপডেট দিই।",
      e: "Respond with calm, reassuring precision: 'Hi [Name], we identified the root cause—a database deadlock saturated the connection pool. We have terminated the blocking query and are cycling the services. We anticipate full restoration within 8 to 10 minutes. I will send an operational confirmation update in exactly 10 minutes.' Candor and clear timelines dissolve executive anxiety.",
      tip: "শান্ত কন্ঠস্বর এবং স্পষ্ট ১০ মিনিটের আপডেট প্রতিশ্রুতি লিডারশিপের আস্থা জয় করে।"
    },

    // --- REAL-WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "প্রোডাকশন ক্র্যাশের চরম চাপের মুখে তুমি কীভাবে মানসিক ভারসাম্য ও টিমের মনোবল অক্ষুণ্ণ রাখো?",
      m: "চাপের মুখে আমি তিনটি নীতি মেনে চলি: (১) **Emotional Decoupling:** সিস্টেম ক্র্যাশ কোনো ব্যক্তিগত অপরাধ নয়, এটি কোড ও ইনফ্রাস্ট্রাকচারের একটি লজিক্যাল সমস্যা। মাথা গরম বা আতঙ্কিত হলে চিন্তার ক্ষমতা ৫০% কমে যায়। (২) **Fact-Based Focus:** কোনো অনুমানের ওপর ভরসা না করে সরাসরি টাইমস্ট্যাম্প ও ত্রুটির লগ ফাইলের তথ্য দেখে কথা বলি। (৩) **Encouraging the Team:** টিমের অন্য কেউ ভুল করলেও তার পাশে দাঁড়াই এবং বলি: 'আগে সিস্টেম ঠিক করি, বাকি সব পরে দেখা যাবে।' শান্ত থাকা একজন ইঞ্জিনিয়ারের সবচেয়ে বড় সুপারপাওয়ার।",
      b: "চাপের মুখে আমি মাথা ঠান্ডা রেখে অনুমানের বদলে লগ ফাইলের বাস্তব তথ্য দেখে সমস্যা সমাধান করি। টিমের কাউকেই দোষারোপ না করে সম্মিলিতভাবে পরিস্থিতি স্বাভাবিক করার কাজে ফোকাস করি।",
      e: "Under severe incident stress, I rely on disciplined emotional decoupling: treating system failure not as personal catastrophe, but as an objective logical puzzle to solve. I focus the team purely on telemetry facts rather than panicked guesswork, fostering psychological safety so everyone can operate at peak cognitive clarity.",
      tip: "Psychological safety এবং Emotional decoupling সিনিয়র লিডারদের প্রধান গুণ।"
    },
    {
      lvl: "realworld",
      q: "কোনো আউটেজ ঘটার আগেই তা ধরার জন্য তোমার সিস্টেমে মনিটরিং ও অ্যালার্টিং আর্কিটেকচার কেমন ছিল?",
      m: "আমরা প্রোঅ্যাক্টিভ মনিটরিং সেট করে রেখেছিলাম: (১) **Uptime Monitoring:** Uptime Kuma দিয়ে প্রতি ৩০ সেকেন্ড অন্তর পাবলিক ডোমেইন ও কোর হেলথচেক এন্ডপয়েন্টে (`/api/health`) পিং পাঠানো। (২) **Server Metrics:** Netdata ও PM2 দিয়ে সার্ভার সিপিইউ ও মেমোরি ব্যবহার মনিটর করা; মেমোরি ৮০% ছাড়ালে তাৎক্ষণিক টেলিগ্রাম বটে অ্যালার্ট আসা। (৩) **Error Tracking:** Sentry ইন্টিগ্রেশন যার মাধ্যমে কোনো আনহ্যান্ডেল্ড এক্সেপশন বা ৫xx এরর ঘটলেই স্ট্যাক ট্রেস সহ রিয়েলটাইম নোটিফিকেশন পাওয়া। এর ফলে ইউজার কমপ্লেইন করার আগেই আমরা সমস্যা ধরে ফেলি।",
      b: "আপটাইম কুমা দিয়ে প্রতি ৩০ সেকেন্ডে হেলথচেক, পিএম২ দিয়ে সার্ভার মেমোরি ও সিপিইউ ট্র্যাকিং এবং সেন্ট্রি দিয়ে এরর ট্র্যাকিং নিশ্চিত করেছি। টেলিগ্রাম বটে এলার্ট আসায় সমস্যা হওয়ার সাথে সাথে নোটিফিকেশন পেয়ে সমাধান করি।",
      e: "Proactive monitoring infrastructure: Uptime Kuma executing automated health checks (`/api/health`) every 30 seconds; PM2 and Netdata monitoring CPU/RAM thresholds with automated Telegram bot webhook alerts when memory exceeds 80%; and Sentry SDK capturing uncaught runtime exceptions with stack traces. We intercept regressions before users report them.",
      tip: "Healthcheck endpoint, Telegram webhook alerts, এবং Sentry উল্লেখ করা প্রফেশনাল মান।"
    },
    {
      lvl: "realworld",
      q: "পোস্ট-মর্টেমে ঠিক করা প্রিভেন্টিভ মেজারস বা Jira টিকিটগুলো যেন কাজের চাপে হারিয়ে না যায় তা কীভাবে নিশ্চিত করো?",
      m: "পোস্ট-মর্টেম তখনই সফল হয় যখন তার সুপারিশগুলো প্রোডাকশনে বাস্তবায়িত হয়। আমার নিয়ম: (১) পোস্ট-মর্টেম মিটিং শেষ হওয়ামাত্র সুপারিশগুলোকে নির্দিষ্ট Jira/GitHub টিকিটে রূপান্তর করি। (২) টিকিটগুলোকে 'Technical Debt' না রেখে সরাসরি পরবর্তী স্প্রিন্টের **'Sprint P0 / P1 Commitments'**-এ যুক্ত করি। (৩) প্রতিটির সাথে নির্দিষ্ট ডেডলাইন ও দায়িত্বপ্রাপ্ত ইঞ্জিনিয়ারের নাম থাকে। (৪) টিকিটটি রিলিজ ও সিআই পাইপলাইনে টেস্ট যুক্ত না হওয়া পর্যন্ত ইনসিডেন্টটিকে সম্পূর্ণ 'Resolved' ঘোষণা করা হয় না।",
      b: "পোস্ট-মর্টেমের সুপারিশগুলো সাথে সাথে স্প্রিন্ট টিকিটে রূপান্তর করে পরবর্তী স্প্রিন্টের অগ্রাধিকার তালিকায় রাখি। সিআই টেস্ট ও স্থায়ী সমাধান কোডে না আসা পর্যন্ত ইনসিডেন্টটিকে ক্লোজ করা হয় না।",
      e: "Action items from post-mortems must never rot in forgotten documentation. I immediately convert recommendations into P0/P1 engineering tickets scheduled directly into the subsequent sprint's committed capacity, assigned to specific owners. An incident is only marked closed once preventative unit tests or infrastructure assertions are merged.",
      tip: "Convert post-mortem into committed sprint tickets—রিয়েল ইঞ্জিনিয়ারিং ডিসিপ্লিন।"
    },
    {
      lvl: "realworld",
      q: "Chaos Engineering বা কৃত্রিম আউটেজ সিমুলেশন ড্রিল (Disaster Recovery Drill) কেন প্রয়োজন?",
      m: "ফায়ার ড্রিল না করলে যেমন আগুন লাগলে মানুষ দিশেহারা হয়ে পড়ে, তেমনি ইনফ্রাস্ট্রাকচারে কৃত্রিম দুর্যোগ সিমুলেট না করলে রিয়েল ডাউনটাইমে রিকভারি সম্ভব হয় না। আমরা স্টেজিং সার্ভারে ইচ্ছাকৃতভাবে টেস্ট করি: (১) ডাটাবেজ সার্ভিস স্টপ করে দেখি ক্লায়েন্ট কেমন এরর হ্যান্ডেল করে। (২) Redis ক্যাশ ডাউন করে দেখি এপিআই ক্র্যাশ করে নাকি সরাসরি ডাটাবেজে ফলব্যাক করে। (৩) ব্যাকআপ ফাইল রিস্টোর করে দেখি আসলেই ডাটা রিকভার হতে কত মিনিট সময় লাগে (RTO - Recovery Time Objective)। এই প্র্যাকটিস টিমকে প্রোডাকশন ফেইলিয়ারের দিনে শতভাগ আত্মবিশ্বাসী রাখে।",
      b: "স্টেজিং এনভায়রনমেন্টে আমরা কৃত্রিমভাবে ডাটাবেজ বা ক্যাশ বন্ধ করে সিস্টেমের সহনশীলতা পরীক্ষা করি এবং ব্যাকআপ রিস্টোর করে রিকভারি টাইম যাচাই করি। এই নিয়মিত ড্রিল বাস্তব দুর্যোগে দ্রুত সমাধান নিশ্চিত করে।",
      e: "Disaster recovery drills validate resiliency hypotheses before catastrophic production failures occur. In staging environments, we execute synthetic failure injection: abruptly terminating Redis to test database fallback degradation; cutting DB network routes to verify connection pool backoffs; and conducting full backup restore runs to measure Recovery Time Objective (RTO).",
      tip: "Recovery Time Objective (RTO) এবং Synthetic failure injection এন্টারপ্রাইজ মানদণ্ড।"
    },
    {
      lvl: "realworld",
      q: "তোমার ক্যারিয়ারে দেখা সবচেয়ে কঠিন প্রোডাকশন আউটেজের অভিজ্ঞতা এবং সেখান থেকে তোমার সেরা শিক্ষা কী ছিল?",
      m: "Dokani-র আর্লি স্টেজে একদিন একটি অটোমেটেড স্ক্রিপ্ট সব প্রোডাক্টের দাম আপডেট করার সময় কোনো `WHERE tenant_id` ছাড়াই ভুল কুয়েরি চালিয়ে সব দোকানের কিছু প্রোডাক্টের দাম এক করে ফেলেছিল! সৌভাগ্যবশত আমাদের প্রতি ঘণ্টার অটোমেটেড PostgreSQL স্ন্যাপশট ব্যাকআপ ছিল। আমি অবিলম্বে সার্ভিস মেইনটেন্যান্সে নিই, ৩০ মিনিট আগের স্ন্যাপশট থেকে ডাটাবেজ রিস্টোর করি এবং ক্ষতিগ্রস্ত টেবিল ঠিক করি। সেই দিনের সবচেয়ে বড় শিক্ষা ছিল: **'কখনোই মানুষের সতর্কতার ওপর নির্ভর করবে না; সিস্টেমেই গার্ড বসাও'**। এর পর থেকে আমরা Prisma Client Extension এবং PostgreSQL RLS পলিসি কার্যকর করি যাতে `WHERE tenant_id` ছাড়া কোনো আপডেট কুয়েরি ডাটাবেজে চালানো প্রযুক্তিগতভাবেই অসম্ভব হয়।",
      b: "একবার ভুল কুয়েরিতে কলামের তথ্য গুলিয়ে যাওয়ার পর ব্যাকআপ স্ন্যাপশট থেকে সফলভাবে ডাটা রিকভার করেছিলাম। এই ঘটনা থেকে শিক্ষা নিয়ে আমরা পোস্টগ্রেস RLS এবং প্রিজমা গার্ড সক্রিয় করি যাতে কোনো কোডেই ভুল হওয়ার সুযোগ না থাকে।",
      e: "Early in Dokani, an errant bulk-mutation script omitted a tenantId filter, contaminating product pricing across shops. We rapidly restored from hourly snapshots, rolling back the divergence. The profound lesson was: never rely on developer discipline alone—enforce architectural guardrails. We immediately implemented Prisma client middleware and PostgreSQL RLS, making un-scoped tenant updates syntactically impossible.",
      tip: "বাস্তব ভুলের অভিজ্ঞতা এবং তা থেকে স্থায়ী সিস্টেম গার্ডরেল বানানোর গল্প ইন্টারভিউয়ারকে মুগ্ধ করবে।"
    }
  ]
};
