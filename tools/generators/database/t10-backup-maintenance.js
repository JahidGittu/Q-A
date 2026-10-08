// Topic 10: Database Backup, Connection Pooling & Management (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "database-backup-maintenance",
  name: "Database Backup, Connection Pooling & Maintenance",
  desc: "pg_dump, mongodump, PITR & WAL Archiving, PgBouncer, VACUUM & Autovacuum, XID Wraparound, Disaster Recovery (RTO/RPO)",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Database Backup-এর ক্ষেত্রে Logical Backup বনাম Physical Backup-এর মধ্যে মূল পার্থক্য কী?",
      m: "(১) `Logical Backup` (যেমন `pg_dump`, `mongodump`): ডেটাবেজের স্কিমা ও ডেটাকে মানুষের পাঠযোগ্য SQL স্টেটমেন্ট বা JSON/BSON ফাইলে এক্সপোর্ট করে। সুবিধা: ভার্সন পরিবর্তন বা ভিন্ন সার্ভারে সহজে রিস্টোর করা যায়, নির্দিষ্ট টেবিল ব্যাকআপ নেওয়া যায়। অসুবিধা: শত শত গিগাবাইট ডেটায় ব্যাকআপ ও রিস্টোর হতে ঘণ্টার পর ঘণ্টা সময় নেয়। (২) `Physical Backup` (যেমন `pg_basebackup`, ফাইলসিস্টেম স্ন্যাপশট): ডিস্কের আসল বাইনারি ডেটা ব্লক ও ফাইলগুলোর হুবহু কপি সংরক্ষণ করে। সুবিধা: টেরাবাইট ডেটাও অত্যন্ত দ্রুত ব্যাকআপ ও রিস্টোর করা যায় এবং Point-In-Time Recovery (PITR) সম্ভব হয়।",
      b: "লজিক্যাল ব্যাকআপ (pg_dump) ডেটাকে এসকিউএল স্ক্রিপ্ট আকারে এক্সপোর্ট করে যা ছোট বা মাঝারি ডেটায় উপযোগী। ফিজিক্যাল ব্যাকআপ (pg_basebackup) ডিস্কের বাইনারি ফাইল কপি করে যা বিশাল ডেটাবেজে দ্রুত ব্যাকআপ ও তাৎক্ষণিক রিস্টোরের সুবিধা দেয়।",
      e: "Logical Backups (pg_dump, mongodump) export database entities as declarative SQL statements or BSON payloads, ideal for schema portability across versions. Physical Backups (pg_basebackup, volume snapshots) copy raw binary database cluster files, executing orders of magnitude faster for multi-terabyte disaster recovery.",
      tip: "বলো: 'Logical exports SQL statements; Physical clones raw disk binary pages for rapid disaster recovery.'"
    },
    {
      lvl: "lvl1",
      q: "Point-in-Time Recovery (PITR) কী এবং এটি কীভাবে কাজ করে?",
      m: "PITR হলো এমন একটি উন্নত রিকভারি মেকানিজম যার মাধ্যমে ডেটাবেজকে অতীতের যেকোনো সুনির্দিষ্ট সেকেন্ডের অবস্থায় ফিরিয়ে নেওয়া যায় (যেমন আজ দুপুর ২:১৪ মিনিট ৩৭ সেকেন্ডে কোনো ডেভেলপার ভুলবশত টেবিল ড্রপ করলে, ঠিক ২:১৪ মিনিট ৩৬ সেকেন্ডের অবস্থায় রিস্টোর করা)! এটি কাজ করে দুটি জিনিসের সমন্বয়ে: (১) একটি বেস ফিজিক্যাল ব্যাকআপ (Base Backup), এবং (২) অবিচ্ছিন্নভাবে সংগৃহীত সমস্ত ট্রানজ্যাকশন লগ বা WAL (Write-Ahead Log) ফাইল। রিস্টোরের সময় বেস ব্যাকআপ লোড করে ঠিক ওই নির্দিষ্ট সেকেন্ড পর্যন্ত WAL লগগুলো রি-প্লে করা হয়।",
      b: "পিআইটিআর হলো অতীতের যেকোনো নির্দিষ্ট সেকেন্ডের অবস্থায় ডেটাবেজ ফিরিয়ে নেওয়ার ব্যবস্থা। এটি বেস ব্যাকআপ লোড করে নির্দিষ্ট সেকেন্ড পর্যন্ত WAL লগগুলো রি-প্লে করে ডেটাবেজকে ভুল অপারেশনের ঠিক আগের অবস্থায় নিখুঁতভাবে উদ্ধার করে।",
      e: "Point-in-Time Recovery (PITR) allows restoring a database cluster to any precise historical timestamp (e.g., one second before a catastrophic DROP TABLE command). It operates by restoring a baseline physical backup and replaying sequential WAL archives up to the target recovery target timestamp.",
      code: "# postgresql.conf recovery settings:\nrestore_command = 'cp /mnt/archive/%f %p'\nrecovery_target_time = '2026-10-08 14:14:36 UTC'"
    },
    {
      lvl: "lvl1",
      q: "Connection Pooling কী এবং নোড অ্যাপ্লিকেশনে কেন সরাসরি আনলিমিটেড কানেকশন খোলা বিপজ্জনক?",
      m: "ডেটাবেজে প্রতিটি নতুন কানেকশন খোলার জন্য মেমোরি অ্যালোকিশন, TCP হ্যান্ডশেক ও প্রসেস ফোর্কিং লাগে (PostgreSQL-এ প্রতিটি কানেকশন ৫-১০MB RAM দখল করে)। যদি ১০০০ জন ইউজার একসাথে রিকোয়েস্ট করে এবং নোড অ্যাপ ১০০০টি সমান্তরাল কানেকশন খোলার চেষ্টা করে, তবে ডেটাবেজ সার্ভারের সমস্ত র‍্যাম ও সিপিইউ ক্র্যাশ করবে (Connection Starvation)! Connection Pool আগে থেকেই একটি নির্দিষ্ট সংখ্যক (যেমন ২০ বা ৫০টি) প্রস্তুত কানেকশন মেমোরিতে জীবিত রাখে। এপিআই রিকোয়েস্ট পুল থেকে একটি কানেকশন ধার নেয়, কাজ শেষ করে সাথে সাথে পুলে ফেরত দেয়।",
      b: "কানেকশন পুল সীমিত সংখ্যক ডাটাবেজ কানেকশন প্রস্তুত রাখে এবং রিকোয়েস্টগুলোর মধ্যে শেয়ার করে। সরাসরি শত শত কানেকশন খুললে সার্ভারের র‍্যাম শেষ হয়ে ডাটাবেজ ক্র্যাশ করে, যা কানেকশন পুল পুরোপুরি প্রতিরোধ করে।",
      e: "A Connection Pool maintains a reusable cache of active database connections. Opening raw database connections per request is catastrophic because each connection incurs TCP handshakes and allocates dedicated PostgreSQL process RAM (5-10MB). A pool caps concurrency to optimal hardware limits.",
      tip: "মনে রাখবে: 'Connections are expensive processes; pooling recycles a bounded set of connections.'"
    },
    {
      lvl: "lvl1",
      q: "PostgreSQL-এ `VACUUM` কী এবং ডেড টুপল (Dead Tuples) পরিষ্কার করা কেন আবশ্যক?",
      m: "PostgreSQL-এর MVCC আর্কিটেকচারের কারণে যখন কোনো রো আপডেট বা ডিলিট হয়, তখন ডেটাবেজ ডিস্ক থেকে তাৎক্ষণিকভাবে তা মুছে ফেলে না; বরং রোটিকে একটি 'ডেড টুপল' হিসেবে রেখে দেয়। সময়ের সাথে সাথে এই ডেড টুপলগুলো জমে ডিস্কের জায়গা নষ্ট করে এবং কুয়েরিকে স্লো করে দেয় (Table Bloat)। `VACUUM` কমান্ড এই ডেড টুপলগুলোর জায়গা মুক্ত করে যাতে ভবিষ্যতে নতুন ইনসার্ট বা আপডেটে সেই ডিস্ক স্পেস পুনরায় ব্যবহার করা যায়। নিয়মিত ভ্যাকুয়াম না করলে ডেটাবেজ সাইজ অস্বাভাবিক ফুলে যায়।",
      b: "আপডেট ও ডিলিটের ফলে সৃষ্ট ডেড টুপলগুলো পরিষ্কার করতে ভ্যাকুয়াম কমান্ড ব্যবহৃত হয়। এটি অপ্রয়োজনীয় স্থান মুক্ত করে যাতে নতুন ডেটা সেখানে সংরক্ষণ করা যায় এবং ডেটাবেজ ব্লোট হওয়া রোধ হয়।",
      e: "Under PostgreSQL MVCC, mutations generate obsolete row versions termed 'dead tuples'. Over time, dead tuples cause table bloat and degrade performance. VACUUM scans pages to reclaim dead tuple disk space, making it available for subsequent inserts without resizing disk partitions.",
      code: "VACUUM VERBOSE orders;"
    },
    {
      lvl: "lvl1",
      q: "Disaster Recovery-তে RTO (Recovery Time Objective) এবং RPO (Recovery Point Objective)-এর অর্থ কী?",
      m: "(১) `RTO (Recovery Time Objective)`: একটি বড় দুর্যোগ বা সার্ভার ডাউন হওয়ার পর সিস্টেমকে পুনরায় চালু ও সচল করতে সর্বোচ্চ কত সময় নেওয়া যাবে (Time to recover—যেমন 'আমাদের RTO হলো ৩০ মিনিট')। (২) `RPO (Recovery Point Objective)`: কোনো দুর্যোগে সর্বোচ্চ কত সময়ের ডেটা হারানো কোম্পানি বরদাশত করতে পারবে (Data loss tolerance—যেমন যদি প্রতি ১ ঘণ্টায় ব্যাকআপ নেওয়া হয়, তবে দুর্যোগে ১ ঘণ্টার ডেটা মুছে যেতে পারে, অর্থাৎ RPO = ১ ঘণ্টা)। ফিনান্সিয়াল ও মিশন-ক্রিটিক্যাল অ্যাপে RPO হতে হয় ০ (Zero Data Loss) এবং RTO হতে হয় কয়েক মিনিট।",
      b: "RTO হলো বিপর্যয়ের পর সিস্টেম চালু করতে অনুমোদিত সর্বোচ্চ সময়। আর RPO হলো কত সময়ের ডেটা হারানো মেনে নেওয়া যায়। মিশন ক্রিটিক্যাল সিস্টেমে RTO ও RPO যত কম হয় সিস্টেম তত নির্ভরযোগ্য।",
      e: "RTO (Recovery Time Objective) defines the acceptable duration of time an application can remain offline before restoration. RPO (Recovery Point Objective) defines the maximum acceptable window of data loss measured in time (e.g. 15 minutes of transactional drift) during a disaster.",
      tip: "ইন্টারভিউতে 'RTO = Downtime tolerance, RPO = Data loss tolerance' সংক্ষেপে বলবে।"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "PgBouncer কী এবং এর ৩টি পুলিং মোড (Session, Transaction, Statement)-এর মধ্যে পার্থক্য কী?",
      m: "PgBouncer হলো PostgreSQL-এর জন্য একটি অত্যন্ত লাইটওয়েট ও উচ্চ-কার্যক্ষমতাসম্পন্ন কানেকশন পুলার যা হাজার হাজার ক্লায়েন্ট কানেকশনকে হ্যান্ডেল করে ডেটাবেজে মাত্র ৩০-৪০টি কানেকশনে ম্যাপ করে দেয়। ৩টি মোড: (১) `Session Mode` (ডিফল্ট): ক্লায়েন্ট ডিসকানেক্ট না হওয়া পর্যন্ত পুরো সেশনের জন্য সার্ভার কানেকশন ধরে রাখে (সবচেয়ে কম পুলিং ইফিসিয়েন্সি)। (২) `Transaction Mode` (প্রোডাকশন স্ট্যান্ডার্ড): প্রতিটি ট্রানজ্যাকশন শেষ (COMMIT বা ROLLBACK) হওয়ার সাথে সাথেই কানেকশনটি পুলে ফেরত আসে এবং অন্য কোনো ক্লায়েন্টকে দেওয়া হয় (সর্বোচ্চ থ্রুপুট)। সতর্কতা: এতে সেশন-লেভেল ভ্যারিয়েবল বা লিসেন/নোটিফাই কাজ করে না। (৩) `Statement Mode`: প্রতিটি একক SQL স্টেটমেন্টের পর কানেকশন রিলিজ হয় (মাল্টিপল স্টেটমেন্ট ট্রানজ্যাকশন সমর্থন করে না)।",
      b: "PgBouncer হাজার হাজার কানেকশনকে অল্প কয়েকটি ডাটাবেজ কানেকশনে পরিচালনা করে। সেশন মোড পুরো সেশনের জন্য কানেকশন রাখে, ট্রানজ্যাকশন মোড প্রতি ট্রানজ্যাকশন শেষে কানেকশন শেয়ার করে যা সেরা, আর স্টেটমেন্ট মোড প্রতি কুয়েরি পর কানেকশন রিলিজ করে।",
      e: "PgBouncer multiplexes thousands of incoming client connections down to a small set of PostgreSQL backend connections. Modes: Session assigns a connection for the client's lifetime; Transaction pools connections per transaction (the industry standard for high throughput); Statement pools per SQL query (forbidding multi-query transactions).",
      code: "# pgbouncer.ini:\npool_mode = transaction\nmax_client_conn = 5000\ndefault_pool_size = 30"
    },
    {
      lvl: "lvl2",
      q: "PostgreSQL `Autovacuum` কীভাবে কাজ করে এবং হাই-ট্রাফিক সিস্টেমে এর ডিফল্ট কনফিগারেশন কেন টিউন করতে হয়?",
      m: "Autovacuum হলো একটি ব্যাকগ্রাউন্ড ডেমন যা ডেড টুপলের সংখ্যা একটি নির্দিষ্ট থ্রেশহোল্ড ছাড়িয়ে গেলে স্বয়ংক্রিয়ভাবে টেবিলে ভ্যাকুয়াম এবং অ্যানালাইজ চালায় (`threshold = base + factor * total_rows`)। ডিফল্ট কনফিগারেশন বড় টেবিলের জন্য অত্যন্ত ধীরগতির! কোটি রোর টেবিলে ডিফল্ট ২০% স্কেল ফ্যাক্টরের কারণে ২০ লাখ রো ডেড না হওয়া পর্যন্ত ভ্যাকুয়াম শুরুই হয় না—ফলে বিশাল টেবিল ব্লোট ঘটে। প্রোডাকশনে `autovacuum_vacuum_scale_factor = 0.05` (৫%) এবং `autovacuum_cost_limit = 1000` বাড়িয়ে দিতে হয় যাতে ব্যাকগ্রাউন্ড ভ্যাকুয়াম ঘন ঘন ও দ্রুত সম্পন্ন হয়।",
      b: "অটোভ্যাকুয়াম স্বয়ংক্রিয়ভাবে ডেড টুপল পরিষ্কার করে। বড় টেবিলে ডিফল্ট সেটিংস ধীরগতির হওয়ায় স্কেল ফ্যাক্টর কমিয়ে (০.০৫) এবং কস্ট লিমিট বাড়িয়ে ঘন ঘন ভ্যাকুয়াম নিশ্চিত করতে হয়।",
      e: "Autovacuum automatically runs background VACUUM and ANALYZE when dead tuples exceed autovacuum_vacuum_threshold + autovacuum_vacuum_scale_factor * rows. Default settings (0.2 scale factor) neglect large tables until millions of tuples rot; tune scale factors down to 0.05 on high-write systems.",
      code: "ALTER TABLE high_volume_orders SET (\n  autovacuum_vacuum_scale_factor = 0.05,\n  autovacuum_vacuum_cost_limit = 1000\n);"
    },
    {
      lvl: "lvl2",
      q: "`VACUUM FULL` কমান্ডের মারাত্মক ঝুঁকি কী এবং প্রোডাকশনে এর বদলে `pg_repack` কেন ব্যবহার করা হয়?",
      m: "সাধারণ `VACUUM` ডিস্ক স্পেস মুক্ত করে ভবিষ্যৎ ব্যবহারের জন্য ইন্টারনালি রেখে দেয় কিন্তু অপারেটিং সিস্টেমে হার্ডডিস্ক স্পেস ফেরত দেয় না। `VACUUM FULL` টেবিলটিকে সম্পূর্ণ নতুনভাবে তৈরি করে অপারেটিং সিস্টেমের ডিস্ক স্পেস ফিরিয়ে দেয়। মারাত্মক ঝুঁকি: এটি পুরো টেবিলের ওপর একটি `AccessExclusiveLock` ফেলে—যার ফলে টেবিলটিতে সমস্ত রিড ও রাইট সম্পূর্ণ ব্লক হয়ে যায়! কোটি রোর টেবিলে এটি কয়েক ঘণ্টা সময় নিতে পারে এবং পুরো সাইট ডাউন থাকবে। সমাধান: প্রোডাকশনে `pg_repack` টুল ব্যবহার করা হয়—যা কোনো এক্সক্লুসিভ টেবিল লক ছাড়াই লাইভ সাইটে ডিস্ক স্পেস রিক্লেইম করে সম্পূর্ণ নতুন ফ্রেশ টেবিল বানিয়ে দেয়।",
      b: "VACUUM FULL সম্পূর্ণ টেবিলে এক্সক্লুসিভ লক ফেলে রিড-রাইট বন্ধ করে দেয় যা সাইট ডাউন ঘটায়। এর বিকল্প হিসেবে pg_repack ব্যবহার করা হয় যা সাইট লাইভ রেখেই লক ছাড়া ডিস্ক স্পেস মুক্ত করে।",
      e: "VACUUM FULL rewrites the table to reclaim disk space to the OS, but acquires an AccessExclusiveLock, blocking all concurrent SELECT and mutation traffic for hours. Production systems use pg_repack instead, which reorganizes tables and reclaims disk online with zero table locking.",
      tip: "কখনোই প্রোডাকশনে `VACUUM FULL` চালাবে না; সবসময় `pg_repack` ব্যবহার করবে।"
    },
    {
      lvl: "lvl2",
      q: "PostgreSQL Transaction ID (XID) Wraparound কী এবং এটি ডেটাবেজকে কীভাবে হঠাৎ বন্ধ করে দিতে পারে?",
      m: "PostgreSQL প্রতিটি ট্রানজ্যাকশনকে একটি ৩২-বিট পূর্ণসংখ্যা আইডি দেয় (যার সর্বোচ্চ মান প্রায় ৪ বিলিয়ন, কার্যকর সীমা ২ বিলিয়ন)। যদি ২ বিলিয়ন ট্রানজ্যাকশন সম্পন্ন হওয়ার আগে পুরনো ট্রানজ্যাকশনগুলোকে 'ফ্রিজ' (Freeze) না করা হয়, তবে আইডি কাউন্টার আবার ০-তে ফিরে আসবে (Wraparound)। তখন পোস্টগ্রেস ভাববে অতীতের সব ডেটা ভবিষ্যতের ডেটা এবং মুহূর্তে সম্পূর্ণ ডেটাবেজ অদৃশ্য বা করাপ্ট হয়ে যাবে! এই মহা-দুর্যোগ থেকে রক্ষা করতে PostgreSQL একটি সেলফ-ডিফেন্স মেকানিজম হিসেবে পুরো ডেটাবেজকে রিড-অনলি বা অফলাইনে বন্ধ করে দেয়। অটোভ্যাকুয়ামের কাজ হলো সময়মতো এই এক্সআইডি ফ্রিজ করা।",
      b: "ট্রানজ্যাকশন আইডি ২ বিলিয়ন ছাড়িয়ে গেলে আইডি আবার ০-তে ফিরে গিয়ে ডেটা অদৃশ্য হওয়ার ঝুঁকি তৈরি করে। ডেটাবেজ নিজেকে বাঁচাতে হঠাৎ বন্ধ হয়ে যায়। অটোভ্যাকুয়াম পুরনো আইডি ফ্রিজ করে এই সংকট প্রতিরোধ করে।",
      e: "PostgreSQL transaction IDs (XIDs) are 32-bit integers capping at ~2 billion before wrapping around. If Autovacuum fails to freeze historical tuples before hitting this horizon, PostgreSQL halts the database and refuses writes to protect against catastrophic data corruption.",
      code: "SELECT datname, age(datfrozenxid) FROM pg_database ORDER BY age DESC;"
    },
    {
      lvl: "lvl2",
      q: "MongoDB-তে `mongodump` এবং `mongorestore` ব্যবহার করে প্রোডাকশন ব্যাকআপ ও অপটিমাইজেশন কীভাবে করবে?",
      m: "`mongodump` মঙ্গোডিবি থেকে BSON আকারে ডেটা এক্সপোর্ট করে। হাই-পারফরম্যান্স অপটিমাইজেশন: (১) `--gzip` ফ্ল্যাগ ব্যবহার করে অন-দ্য-ফ্লাই কম্প্রেস করা যাতে ফাইল সাইজ ৭০% ছোট হয়। (২) `--numParallelCollections=4` দিয়ে একাধিক কালেকশন সমান্তরালে দ্রুত ডাম্প করা। (৩) `--archive` দিয়ে একটি একক আর্চিভ স্ট্রিম সরাসরি পাইপ করে AWS S3 বা রিমোট স্টোরেজে আপলোড করা (`mongodump --archive | aws s3 cp - s3://backup/db.gz`)—যাতে লোকাল সার্ভারের ডিস্ক স্পেস কোনোভাবেই পূর্ণ না হয়। রিস্টোরের সময় `mongorestore --nsInclude='dbname.*' --gzip` দিয়ে দ্রুত রিস্টোর করা যায়।",
      b: "mongodump এর সাথে --gzip দিয়ে ফাইল ছোট করা হয় এবং পাইপ করে সরাসরি ক্লাউড স্টোরেজে আপলোড করা হয় যাতে সার্ভারের লোকাল ডিস্ক ভরে না যায়। রিস্টোর করতে mongorestore ব্যবহার করা হয়।",
      e: "Run mongodump with --gzip for instant compression and --numParallelCollections to exploit multi-core CPUs. Stream backups directly to cloud buckets using --archive (piping to AWS S3 / GCS) to avoid exhausting local VPS storage space.",
      code: "mongodump --uri=\"$MONGO_URI\" --gzip --archive=\"backup-$(date +%F).gz\""
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "WAL Archiving এবং AWS S3-তে কন্টিনিউয়াস শিপিং (যেমন `pgBackRest` বা `WAL-G`) দিয়ে এন্টারপ্রাইজ PITR কীভাবে সেটআপ করবে?",
      m: "আমরা `pgBackRest` বা `WAL-G` টুল ব্যবহার করি। সেটআপ: (১) `postgresql.conf`-এ `wal_level = replica`, `archive_mode = on`, এবং `archive_command = 'pgbackrest --stanza=main wal-push %p'` কনফিগার করি। প্রতিবার ১৬MB-র একটি WAL সেগমেন্ট পূর্ণ হলেই পোস্টগ্রেস স্বয়ংক্রিয়ভাবে সেটি এস৩ বা ক্লাউড বাকেটে কম্প্রেসড ও এনক্রিপ্টেড অবস্থায় পুশ করে। (২) প্রতিদিন রাতে একটি ফুল বা ডিফারেনশিয়াল ব্যাকআপ নেওয়া হয় (`pgbackrest backup`)। কোনো বিপর্যয় ঘটলে একটি কমান্ডেই (`pgbackrest restore --target=\"2026-10-08 15:00:00\"`) ব্যাকআপ নামিয়ে নির্দিষ্ট সেকেন্ডের ডেটা পুনরুদ্ধার করা যায়।",
      b: "archive_command দিয়ে প্রতিটি WAL ফাইল স্বয়ংক্রিয়ভাবে AWS S3-তে পুশ করা হয়। pgBackRest ব্যবহার করে প্রতিদিন ফুল ব্যাকআপ এবং নিরবচ্ছিন্ন WAL দিয়ে অতীতের যেকোনো সেকেন্ডের ডেটা ফিরিয়ে আনা নিশ্চিত করা হয়।",
      e: "Set archive_mode = on and utilize pgBackRest or WAL-G in archive_command to ship WAL segments to S3 immediately upon closure. Coupled with scheduled differential physical snapshots, this achieves enterprise-grade PITR with near-zero RPO.",
      code: "# postgresql.conf:\narchive_mode = on\narchive_command = 'pgbackrest --stanza=db wal-push %p'\nwal_level = replica"
    },
    {
      lvl: "lvl3",
      q: "High Availability (HA): PostgreSQL Streaming Replication এবং Patroni + Raft/Etcd ক্লাস্টার আর্কিটেকচার কীভাবে অটোমেটিক ফেইলওভার নিশ্চিত করে?",
      m: "সিঙ্গেল ডেটাবেজ নোড কখনো এন্টারপ্রাইজ রেডি নয়। আমরা একটি HA ক্লাস্টার সাজাই: (১) একজন Primary নোড (Read/Write) এবং দুটি Standby নোড (Read-only) যারা ফিজিক্যাল স্ট্রিমিং রেপ্লিকেশনের মাধ্যমে প্রাইমারির প্রতিটি WAL বাইট সিঙ্ক করে। (২) নোডগুলোর ওপরে `Patroni` নামক একটি অর্কেস্ট্রেটর রান করে যা একটি কনসেনসাস স্টোর (যেমন `etcd` বা Consul)-এর সাথে যুক্ত। যদি প্রাইমারি সার্ভার বিদ্যুৎ বিচ্ছিন্ন বা ক্র্যাশ করে, Patroni এবং Etcd ৩ সেকেন্ডের মধ্যে প্রাইমারির হার্টবিট লস ডিটেক্ট করে, ভোট করে সবচেয়ে আপ-টু-ডেট স্ট্যান্ডবাইকে নতুন প্রাইমারি হিসেবে প্রমোট করে (Automatic Failover) এবং ট্রাফিক রি-রুট করে জিরো-ডাউনটাইম নিশ্চিত করে।",
      b: "পাট্রোনি এবং ইটসিডি ক্লাস্টার ব্যবহার করে স্বয়ংক্রিয় ফেইলওভার নিশ্চিত করা হয়। প্রাইমারি নোড ডাউন হওয়ার সাথে সাথে স্ট্যান্ডবাই নোড প্রমোট হয়ে নতুন প্রাইমারি হয়ে যায় এবং ট্রাফিক রি-রুট করে সাইট সচল রাখে।",
      e: "Deploy an enterprise PostgreSQL HA cluster using Patroni coordinated via an etcd distributed consensus store. Patroni monitors primary heartbeat health; upon node crash, it initiates automated leader election, promotes the most synchronous replica to primary, and re-routes client VIPs in under 5 seconds.",
      tip: "বলো: 'Patroni with etcd provides automated consensus-driven leader failover for PostgreSQL HA clusters.'"
    },
    {
      lvl: "lvl3",
      q: "Prisma ORM-এর Connection Pool কীভাবে টিউন করবে যখন এটি PgBouncer-এর সাথে কানেক্টেড থাকে?",
      m: "Prisma বাই-ডিফল্ট প্রতিটি কুয়েরিতে Prepared Statements ব্যবহার করে। কিন্তু PgBouncer-এর `Transaction Mode`-এ কানেকশন শেয়ার হওয়ার কারণে প্রিপেয়ার্ড স্টেটমেন্ট কাজ করে না এবং `prepared statement does not exist` এরর দেয়। ফিক্স: (১) Prisma ডেটাবেজ কানেকশন স্ট্রিংয়ের শেষে `?pgbouncer=true` যোগ করতে হবে—যা Prisma-কে নির্দেশ করে প্রিপেয়ার্ড স্টেটমেন্ট ডিসেবল করতে। (২) মাইগ্রেশন চালানোর জন্য PgBouncer পোর্ট (6432)-এর বদলে সরাসরি পোস্টগ্রেস পোর্ট (5432)-এ কানেক্ট করার জন্য `directUrl` কনফিগার করতে হবে। (৩) `connection_limit` টিউন করে অ্যাপ্লিকেশন পডের সাথে সামঞ্জস্য রাখতে হবে।",
      b: "PgBouncer ট্রানজ্যাকশন মোডে প্রিজমা চালাতে কানেকশন ইউআরএলে ?pgbouncer=true যোগ করতে হয় এবং স্কিমা মাইগ্রেশনের জন্য directUrl কনফিগার করতে হয় যাতে প্রিপেয়ার্ড স্টেটমেন্ট এরর না হয়।",
      e: "When connecting Prisma to PgBouncer in transaction pooling mode, append ?pgbouncer=true to the DATABASE_URL to disable prepared statements. Additionally, define a directUrl in schema.prisma pointing directly to PostgreSQL port 5432 for shadow database migrations.",
      code: "// schema.prisma:\ndatasource db {\n  provider  = \"postgresql\"\n  url       = env(\"DATABASE_URL\") // pgbouncer port 6432 with ?pgbouncer=true\n  directUrl = env(\"DIRECT_URL\")   // direct postgres port 5432\n}"
    },
    {
      lvl: "lvl3",
      q: "Database Health Check: `pg_stat_activity` কুয়েরি করে কীভাবে কানেকশন লিক, হ্যাং কুয়েরি ও রিসোর্স থ্রটলিং শনাক্ত করবে?",
      m: "ডেটাবেজ পারফরম্যান্স পর্যালোচনায় `pg_stat_activity` টেবিলটি অপরিহার্য। এটি দিয়ে দেখা যায় বর্তমানে কয়টি কানেকশন সচল, কোন কুয়েরি কতক্ষণ ধরে চলছে এবং তাদের স্ট্যাটাস কী। যেমন: `SELECT pid, now() - query_start AS duration, query, state FROM pg_stat_activity WHERE state != 'idle' ORDER BY duration DESC;` চালালে যেসব কুয়েরি ১০ সেকেন্ডের বেশি সময় ধরে আটকে আছে সেগুলো সরাসরি ধরা পড়ে। প্রয়োজন হলে `SELECT pg_terminate_backend(pid);` দিয়ে স্পেসিফিক হ্যাং কুয়েরি কিল করে ডেটাবেজ সেভ করা যায়।",
      b: "pg_stat_activity টেবিল দিয়ে সার্ভারে চলমান প্রতিটি সেশন, কুয়েরির সময়কাল এবং লকিং পর্যবেক্ষণ করা যায়। দীর্ঘ সময় ধরে চলা হ্যাং কুয়েরি শনাক্ত করে pg_terminate_backend(pid) দিয়ে তা থামানো যায়।",
      e: "Query pg_stat_activity to inspect real-time connection states, query durations, and lock contentions. Long-running or stuck statements (duration > 5s) are triaged and safely terminated via pg_terminate_backend(pid) to protect backend memory.",
      code: "SELECT pid, usename, client_addr, state,\n       round(extract(epoch from now() - query_start)::numeric, 2) AS duration_seconds,\n       query\nFROM pg_stat_activity WHERE state != 'idle' ORDER BY duration_seconds DESC LIMIT 10;"
    },
    {
      lvl: "lvl3",
      q: "Database Disaster Recovery টেস্ট (Chaos Engineering): তুমি কীভাবে নিশ্চিত হবে যে তোমার ব্যাকআপ ফাইলগুলো সত্যিই কার্যকর?",
      m: "যে ব্যাকআপ কখনো রিস্টোর করে পরীক্ষা করা হয়নি, সেই ব্যাকআপ আসলে কোনো ব্যাকআপই নয়! অনেক কোম্পানি বিপদের দিনে আবিষ্কার করে তাদের ডাম্প ফাইল করাপ্ট ছিল। প্র্যাকটিস: আমরা সম্পূর্ণ অটোমেটেড 'Disaster Recovery Drill' পাইপলাইন চালাই। প্রতি সপ্তাহে একটি পৃথক স্টেজিং ক্লাউড ইনস্ট্যান্সে স্ক্রিপ্ট স্বয়ংক্রিয়ভাবে লেটেস্ট ব্যাকআপ ফাইলটি ডাউনলোড করে সম্পূর্ণ নতুন ডেটাবেজে রিস্টোর করে, অটোমেটেড ডাটাবেজ ইন্টিগ্রিটি ও রো-কাউন্ট টেস্ট চালায় এবং সফল হলে একটি স্ল্যাক অ্যালার্ট পাঠায় যে 'Weekly Backup Verified Successfully'।",
      b: "ব্যাকআপ সত্যিই কাজ করে কি না তা নিশ্চিত করতে প্রতি সপ্তাহে অটোমেটেড স্ক্রিপ্ট দিয়ে ব্যাকআপ ফাইলটি একটি টেস্ট সার্ভারে রিস্টোর করে ডেটা ভ্যালিডেশন পরীক্ষা করা হয়।",
      e: "A backup is merely a hypothesis until proven by a successful restore. Implement automated weekly disaster recovery verification pipelines: a detached staging runner pulls the latest snapshot, executes a full restore, asserts table integrity tests, and alerts the engineering team on success or failure.",
      tip: "বলো: 'An unverified backup is not a backup. We automate regular sandbox restore drills in CI/CD to validate recovery integrity.'"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: প্রোডাকশন ডেটাবেজ সাডেনলি `FATAL: remaining connection slots are reserved for non-replication superuser connections` এরর দিচ্ছে এবং সব ইউজার ক্র্যাশ পেজ দেখছে! তাৎক্ষণিক কীভাবে সার্ভার বাঁচাবে এবং দীর্ঘমেয়াদে সমাধান কী?",
      m: "তাৎক্ষণিক সমাধান: (১) একজন সিনিয়র ইঞ্জিনিয়ার সুপার-ইউজার (postgres) হিসেবে সার্ভারে SSH করে সরাসরি লোকাল সকেটে কানেক্ট করবে (`psql -U postgres`) কারণ সুপার-ইউজারের জন্য ৩টি ইমার্জেন্সি স্লট সংরক্ষিত থাকে। (২) `pg_stat_activity` থেকে `idle` কানেকশনগুলো বাল্ক কিল করবে: `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'idle';`—এতে সাইট সাথে সাথে সচল হবে। দীর্ঘমেয়াদী সমাধান: (১) অ্যাপ সার্ভার ও ডেটাবেজের মাঝে PgBouncer বা AWS RDS Proxy কানেকশন পুলার বসাতে হবে। (২) নোড অ্যাপ্লিকেশনে `connection_limit` কমিয়ে নিয়ন্ত্রণ করতে হবে।",
      b: "তাৎক্ষণিকভাবে সুপার-ইউজার দিয়ে লোকাল সকেটে ঢুকে idle কানেকশনগুলো কিল করতে হবে। দীর্ঘমেয়াদে PgBouncer কানেকশন পুলার বসিয়ে এবং নোড অ্যাপে কানেকশন লিমিট সেট করে এই সংকট চিরতরে সমাধান করতে হবে।",
      e: "Immediate triage: SSH into the server and access psql via local UNIX socket as postgres superuser (which retains dedicated emergency slots). Execute pg_terminate_backend() across orphaned idle connections. Permanent fix: introduce PgBouncer or Supabase connection pooling to multiplex client connections.",
      code: "SELECT pg_terminate_backend(pid)\nFROM pg_stat_activity\nWHERE usename = 'app_user' AND state = 'idle'\n  AND state_change < current_timestamp - INTERVAL '2 minutes';"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একজন জুনিয়র ডেভেলপার ভুলবশত প্রোডাকশন ডেটাবেজে `DROP TABLE customers;` চালিয়ে দিয়েছে! কোনো রিসেন্ট ম্যানুয়াল ব্যাকআপ নেই কিন্তু WAL Archiving অন আছে। কীভাবে গ্রাহক ডেটা উদ্ধার করবে?",
      m: "উদ্ধারের ধাপ (PITR): (১) কোনো আতঙ্কিত সিদ্ধান্ত না নিয়ে অবিলম্বে অ্যাপ্লিকেশন সার্ভার ডাউন/মেইনটেন্যান্স মোডে নিতে হবে যাতে নতুন কোনো রাইট না আসে। (২) সার্ভার লগে দেখে ঠিক কোন সময়ে ড্রপ কমান্ডটি চালানো হয়েছিল তা বের করব (যেমন দুপুর ৩:১০:১৫)। (৩) সর্বশেষ তৈরি হওয়া বেস ফিজিক্যাল ব্যাকআপটি একটি নতুন আইসোলেটেড সার্ভারে রিস্টোর করব। (৪) `postgresql.conf`-এ কনফিগার করব `recovery_target_time = '2026-10-08 15:10:14'` (অর্থাৎ ড্রপ হওয়ার ঠিক ১ সেকেন্ড আগের সময়) এবং `restore_command` দিয়ে WAL লগ রি-প্লে করব। (৫) সম্পূর্ণ ডেটাবেজ ড্রপের আগের নিখুঁত অবস্থায় রিকভার হয়ে যাবে।",
      b: "ভুল ড্রপের ক্ষেত্রে WAL লগ ব্যবহার করে PITR চালানো হয়। লগ দেখে ড্রপ হওয়ার ঠিক ১ সেকেন্ড আগের সময়কে recovery_target_time নির্ধারণ করে বেস ব্যাকআপ ও WAL রি-প্লে করলেই সম্পূর্ণ ডেটা অক্ষতভাবে ফিরে পাওয়া যায়।",
      e: "Execute Point-in-Time Recovery (PITR): identify the exact DROP TABLE execution timestamp from logs, spin up an isolated node, restore the latest base backup, and configure recovery_target_time to 1 second prior to the drop command with WAL replay.",
      tip: "ইন্টারভিউতে 'Point-in-Time Recovery restores the database up to 1 second before the fatal DROP command' বলবে।"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: মধ্যরাতে অটোমেটেড `pg_dump` ব্যাকআপ চলাকালীন ডেটাবেজের ডিস্ক স্পেস ৯৮% হয়ে ক্র্যাশ করার উপক্রম হয়েছে কারণ ব্যাকআপ ফাইলটি সার্ভারের লোকাল ডিস্কেই সেভ হচ্ছিল। কীভাবে এই আর্কিটেকচার ঠিক করবে?",
      m: "মারাত্মক ভুল: ডেটাবেজ সার্ভারের লোকাল ডিস্কে ব্যাকআপ রাখা কখনোই উচিত নয়! সমাধান: ব্যাকআপ ফাইলটি লোকাল ডিস্কে না লিখে সরাসরি পাইপিং ও স্ট্রিমিং মেকানিজমে ক্লাউড অবজেক্ট স্টোরেজে পাঠাতে হবে: `pg_dump -Fc mydb | aws s3 cp - s3://my-backups/mydb-$(date +%F).dump`। এতে ব্যাকআপ ডেটা লোকাল ডিস্কে ১ বাইটও জায়গা না নিয়ে মেমোরি বাফার হয়ে সরাসরি ক্লাউডে স্ট্রিম হয়ে যায়। অতিরিক্ত হিসেবে পুরনো লোকাল ডাম্প ফাইল ডিলিট করার জন্য একটি স্বয়ংক্রিয় ক্রন জব বা লাইফসাইকেল রুল সেট করতে হবে।",
      b: "লোকাল ডিস্কে ব্যাকআপ ফাইল সেভ না করে সরাসরি পাইপলাইনের মাধ্যমে AWS S3 বা ক্লাউড স্টোরেজে স্ট্রিম করতে হবে। ফলে লোকাল হার্ডডিস্ক পূর্ণ হওয়ার কোনো সম্ভাবনাই থাকে না।",
      e: "Piping stdout directly to object storage prevents disk saturation: pg_dump -Fc dbname | aws s3 cp - s3://bucket/backup.dump. This streams binary pages across network buffers directly to AWS S3 without consuming a single byte of local server disk space.",
      code: "pg_dump -Fc -U postgres dokani_prod | gzip | aws s3 cp - s3://dokani-backups/daily/$(date +%Y%m%d).dump.gz"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: ডেটাবেজের একটি বিশাল টেবিলে প্রচুর ডিলিট ও আপডেটের কারণে টেবিল সাইজ ১০GB থেকে বেড়ে ৫০GB হয়ে গেছে (৪০GB ব্লোট)। কিন্তু সাইট ২৪/৭ চালু রাখতে হবে, কোনো ডাউনটাইম নেওয়া যাবে না। কীভাবে ডিস্ক স্পেস রিক্লেইম করবে?",
      m: "সমাধান: যেহেতু সাইট ২৪/৭ লাইভ রাখতে হবে, তাই `VACUUM FULL` চালানো সম্পূর্ণ নিষিদ্ধ (কারণ এটি টেবিল লক করে দেয়)। আমরা `pg_repack` এক্সটেনশন ব্যবহার করব: `pg_repack -k -t big_table -d my_database`। `pg_repack` ব্যাকগ্রাউন্ডে একটি নতুন লগ টেবিল তৈরি করে, ডেটা কপি করে, ইনডেক্স নতুন করে তৈরি করে এবং এক মিলিসেকেন্ডের মেটাডেটা সোয়াপ (Swap) করে কোনো টেবিল লক ছাড়াই ৪০GB ব্লোট ডিস্কে মুক্ত করে দেয়। গ্রাহকরা কাজ চলাকালীন বিন্দুমাত্র টেরই পাবে না।",
      b: "জিরো-ডাউনটাইমে ব্লোট দূর করতে pg_repack টুল ব্যবহার করব। এটি কোনো টেবিল লক ছাড়া ব্যাকগ্রাউন্ডে নতুন টেবিল তৈরি করে ডেটা সোয়াপ করে এবং সম্পূর্ণ ডিস্ক স্পেস মুক্ত করে দেয়।",
      e: "Because VACUUM FULL locks the table exclusively, utilize pg_repack. pg_repack builds a fresh copy of the bloated table in the background, syncs live mutations via trigger logs, and performs a millisecond catalog swap without locking live read/write traffic.",
      code: "pg_repack -h localhost -U postgres -d dokani_db --table=invoices"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: নোড.জেএস এপিআই সার্ভার রিস্টার্ট দিলে সাথে সাথে ডেটাবেজে ২০০টি কানেকশন ওপেন হয়, কিন্তু ৫ মিনিট পর ট্রাফিক কমে গেলেও কানেকশনগুলো ক্লোজ না হয়ে ঝুলে থাকে। কীভাবে ট্রাবলশুট ও পুল কনফিগার করবে?",
      m: "কারণ: নোড অ্যাপ্লিকেশনে কানেকশন পুলের `minPoolSize` হয়তো খুব বড় দেওয়া হয়েছে, অথবা পুলে কোনো `idleTimeoutMillis` কনফিগার করা নেই—ফলে ট্রাফিক শেষ হলেও আইডল কানেকশনগুলো ডেটাবেজে জীবন্ত থেকে যায়। ফিক্স: (১) পুল কনফিগারেশনে `idleTimeoutMillis: 10000` (১০ সেকেন্ড পর অলস কানেকশন ডিসকানেক্ট করা), (২) `minPoolSize: 2` (বেস কানেকশন ছোট রাখা) এবং `maxPoolSize: 20` সেট করা। (৩) এক্সপ্রেস মিডলওয়্যারে রিকোয়েস্ট এরর ক্যাচ করে নিশ্চিত করা যে কানেকশন কোনো এরর হ্যান্ডলারে আটকে না থেকে পুলে রিলিজ হচ্ছে।",
      b: "পুলে idleTimeout না থাকায় অব্যবহৃত কানেকশন ঝুলে থাকে। idleTimeoutMillis সেট করে অলস কানেকশন বন্ধ করা, minPoolSize ছোট রাখা এবং maxPoolSize নিয়ন্ত্রণ করে এই সমস্যা সমাধান করা হয়।",
      e: "The lingering connections are caused by unbounded minPoolSize or missing idleTimeout settings in the database pool client. Configure idleTimeoutMillis: 10000 to prune unused connections dynamically, while bounding maxPoolSize strictly to prevent saturation.",
      code: "const pool = new Pool({\n  max: 20,\n  min: 2,\n  idleTimeoutMillis: 10000,\n  connectionTimeoutMillis: 2000\n});"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে হাজার হাজার মার্চেন্টের অমূল্য সেলস ও হিসাব ডেটা সুরক্ষায় কী ধরনের ব্যাকআপ ও ডিজাস্টার রিকভারি আর্কিটেকচার কার্যকর?",
      m: "দোকানি পিওএসে ৩ স্তরের এন্টারপ্রাইজ ব্যাকআপ আর্কিটেকচার কার্যকর: (১) `Hourly Encrypted WAL Archiving`: প্রতি ঘণ্টায় তৈরি হওয়া সমস্ত ট্রানজ্যাকশন লগ AES-256 এনক্রিপ্ট হয়ে অফ-সাইট ক্লাউড স্টোরেজে (AWS S3 Glacier) পুশ হয় (RPO < ১৫ মিনিট)। (২) `Daily Automated Physical Snapshots`: প্রতিদিন রাত ৩টায় জিরো-ব্লকিং স্ন্যাপশট ব্যাকআপ নেওয়া হয় এবং পৃথক ভৌগোলিক অঞ্চলে (Multi-Region Replication) মিরর করা হয়। (৩) `Automated Restore Drill`: প্রতি রবিবার একটি স্যান্ডবক্স ভিএম-এ ব্যাকআপ ফাইল স্বয়ংক্রিয়ভাবে রিস্টোর করে ডেটা ভ্যালিডেশন টেস্ট হয়। এই আর্কিটেকচার নিশ্চিত করে যে পুরো সার্ভার পুড়ে গেলেও ১৫ মিনিটের বেশি কোনো ডেটা কখনোই হারাবে না!",
      b: "দোকানিতে প্রতি ঘণ্টায় এনক্রিপ্টেড WAL শিপিং (RPO < ১৫ মিনিট), প্রতিদিন রাতে মাল্টি-রিজিয়ন স্ন্যাপশট ব্যাকআপ এবং প্রতি সপ্তাহে অটোমেটেড রিস্টোর টেস্ট চালানো হয়। ফলে যেকোনো বিপর্যয়ে ১৫ মিনিটের মধ্যে সম্পূর্ণ ডেটা পুনরুদ্ধার করা নিশ্চিত থাকে।",
      e: "In Dokani POS, disaster recovery enforces continuous hourly encrypted WAL shipping to geo-redundant S3 storage (RPO < 15 mins), scheduled nightly physical snapshots with multi-region replication, and automated weekly sandbox restore verification drills.",
      tip: "দোকানির এই ৩-টিয়ার ডিজাস্টার রিকভারি আর্কিটেকচার (Hourly WAL, Multi-Region Snapshots, Weekly Drills) ইন্টারভিউতে ১০০% আস্থা এনে দেবে।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: ক্লাউড মাইগ্রেশন বা সার্ভার স্থানান্তরের সময় জিরো-ডাউনটাইম ডেটাবেজ রেপ্লিকেশন কীভাবে সম্পন্ন করবে?",
      m: "পুরনো সার্ভার বন্ধ করে ডাম্প নিয়ে নতুন সার্ভারে রিস্টোর করলে কয়েক ঘণ্টার ডাউনটাইম লাগে যা বিজনেসের জন্য ক্ষতিকর। জিরো-ডাউনটাইম সমাধান: (১) নতুন সার্ভারে PostgreSQL ইনস্টল করে পুরনো সার্ভারের সাথে 'Logical Replication' সেটআপ করি (`CREATE PUBLICATION` এবং `CREATE SUBSCRIPTION`)। (২) সমস্ত পুরনো ডেটা এবং লাইভ ট্রানজ্যাকশন ব্যাকগ্রাউন্ডে রিয়েলটাইমে নতুন সার্ভারে সিঙ্ক হতে থাকে। (৩) সিঙ্ক ল্যাগ যখন ০ মিলিসেকেন্ডে পৌঁছায়, তখন মাত্র ৩০ সেকেন্ডের জন্য ডিএনএস রাউটিং পরিবর্তন করে ট্রাফিক নতুন সার্ভারে ঘুরিয়ে দিই। সম্পূর্ণ মাইগ্রেশনে কোনো ডেটা লস বা সাইট ডাউন হয় না।",
      b: "জিরো-ডাউনটাইমে ডাটাবেজ স্থানান্তরের জন্য Logical Replication ব্যবহার করা হয়। ডেটা লাইভ সিঙ্ক হয়ে ল্যাগ ০ মিলিসেকেন্ড হলে ডিএনএস পরিবর্তন করে নতুন সার্ভারে ট্রাফিক রুট করা হয় কোনো ডাউনটাইম ছাড়াই।",
      e: "Execute zero-downtime database migrations via PostgreSQL Logical Replication (Publications and Subscriptions). Live transactions continuously stream from the source to the target instance; once replication lag hits zero milliseconds, client DNS is pivoted to the new host in seconds.",
      code: "-- Source DB:\nCREATE PUBLICATION app_migration FOR ALL TABLES;\n-- Target DB:\nCREATE SUBSCRIPTION app_migration_sub \nCONNECTION 'dbname=prod host=old-server user=replicator' \nPUBLICATION app_migration;"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Kubernetes বা সার্ভারলেস নোড অ্যাপ্লিকেশনে (Next.js / Lambda) হাজার হাজার পড থেকে ডেটাবেজ কানেকশন রক্ষা করতে কীভাবে PgBouncer আর্কিটেকচার সাজাবে?",
      m: "সার্ভারলেস বা কুবারনেটিস আর্কিটেকচারে প্রতিটি পড বা ল্যাম্বডা ফাংশন নতুন কানেকশন খোলে। ১,০০০ ল্যাম্বডা মানে ১,০০০ ডেটাবেজ কানেকশন যা ডেটাবেজকে নিমেষেই ধ্বংস করে দেয়। আর্কিটেকচার সমাধান: আমরা ডেটাবেজের ঠিক সামনে একটি সেন্ট্রালাইজড PgBouncer ক্লাস্টার বা AWS RDS Proxy বসাই। সমস্ত ল্যাম্বডা ও কুবারনেটিস সার্ভিস সরাসরি ডেটাবেজে কানেক্ট না করে PgBouncer-এ কানেক্ট করে। PgBouncer হাজার হাজার ক্লায়েন্ট কানেকশনকে ট্রানজ্যাকশন মোডে শেয়ার করে ডেটাবেজে মাত্র ৩০টি স্থায়ী অপটিমাইজড কানেকশনে সীমাবদ্ধ রাখে। ফলে ক্লাউডে অসীম অটো-স্কেলিং হলেও ডেটাবেজ চিরকাল শান্ত ও সুস্থ থাকে।",
      b: "সার্ভারলেস বা কুবারনেটিসের হাজার হাজার পড যাতে ডাটাবেজ ক্র্যাশ না করে সেজন্য সামনে PgBouncer বা RDS প্রক্সি বসানো হয়। এটি হাজার হাজার রিকোয়েস্টকে মাত্র ৩০টি ডাটাবেজ কানেকশনে হ্যান্ডেল করে।",
      e: "Serverless functions and Kubernetes pods spawn thousands of concurrent connection spikes. Deploy a centralized PgBouncer layer or AWS RDS Proxy upstream: it absorbs the thousands of transient client connections and multiplexes them across a fixed, bounded pool of 30 PostgreSQL backend connections.",
      tip: "বলো: 'PgBouncer or RDS Proxy absorbs thousands of ephemeral serverless connections down to a bounded pool.'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: ডেটাবেজ স্লো-ডাউন ও সিপিইউ স্পাইকের সময় রিয়েল-টাইমে ট্রাবলশুটিং করতে তোমার রানবুক (Incident Runbook) কী?",
      m: "ইমার্জেন্সি রানবুকের ধাপসমূহ: (১) `pg_stat_activity` কুয়েরি করে চেক করি বর্তমানে কত কানেকশন আছে এবং কোন কুয়েরিগুলো ৫ সেকেন্ডের বেশি সময় ধরে ব্লকিং বা রানিং অবস্থায় আছে। (২) লকিং চেক করি: কোনো ট্রানজ্যাকশন এক্সক্লুসিভ লক ধরে রেখে অন্য সবাইকে ব্লক করছে কি না (`pg_locks`)। (৩) `pg_stat_database` থেকে ক্যাশ হিট রেশিও চেক করি—যদি ক্যাশ হিট ৯৯%-এর নিচে নামে তবে বুঝতে হবে ডিস্ক আই/ও স্পাইক করেছে। (৪) যদি কোনো নির্দিষ্ট ব্যাচ কুয়েরি পুরো সিস্টেম হ্যাং করায়, তবে `pg_terminate_backend(pid)` দিয়ে তাৎক্ষণিকভাবে সেটি বন্ধ করি এবং ট্রাফিক স্টেবল হলে অপটিমাইজেশন শুরু করি।",
      b: "ইনসিডেন্ট রানবুক: pg_stat_activity দিয়ে স্লো কুয়েরি ও কানেকশন চেক, pg_locks দিয়ে লক অনুসন্ধান, ক্যাশ হিট রেশিও পরীক্ষা এবং সিস্টেম বাঁচানোর জন্য ক্ষতিকর কুয়েরিগুলো টার্মিনেট করা।",
      e: "Production Database Incident Runbook: (1) Query pg_stat_activity for high-duration running statements, (2) Inspect pg_locks to pinpoint root blocking transaction PIDs, (3) Verify buffer cache hit ratio exceeds 99%, and (4) Surgically terminate culprit queries via pg_terminate_backend() before analyzing query execution plans.",
      code: "SELECT blocked_locks.pid AS blocked_pid, blocking_locks.pid AS blocking_pid,\n       blocked_activity.query AS blocked_statement\nFROM  pg_catalog.pg_locks blocked_locks\nJOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid\nJOIN pg_catalog.pg_locks blocking_locks \n    ON blocking_locks.locktype = blocked_locks.locktype\n    AND blocking_locks.granted\nWHERE NOT blocked_locks.granted;"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: ডেটাবেজ সিকিউরিটি কমপ্লায়েন্স: ডেটা অ্যাট-রেস্ট এনক্রিপশন (Encryption at Rest) এবং ডেটা ইন-ট্রানজিট এনক্রিপশন (SSL/TLS) কীভাবে কার্যকর করবে?",
      m: "কমপ্লায়েন্স নিশ্চিতের ধাপ: (১) `Data in Transit`: ডেটাবেজে কোনো আন-এনক্রিপ্টেড প্লেইন কানেকশন নিষিদ্ধ করা। `postgresql.conf`-এ `ssl = on` এবং অ্যাপ্লিকেশনে `sslmode=require` বা `verify-full` বাধ্য করা—যাতে নেটওয়ার্কের ভেতর কোনো ম্যান-ইন-দ্য-মিডল (MITM) আক্রমণ না হতে পারে। (২) `Data at Rest`: ক্লাউড ভলিউমে LUKS বা AWS KMS পরিচালিত AES-256 এনক্রিপশন নিশ্চিত করা যাতে ফিজিক্যাল ডিস্ক চুরি হলেও ডেটা পড়া না যায়। (৩) কলাম-লেভেল এনক্রিপশন: অতি সংবেদনশীল ডেটা (যেমন জাতীয় পরিচয়পত্র নম্বর বা ব্যাংক অ্যাকাউন্ট) `pgcrypto` এক্সটেনশন ব্যবহার করে অ্যাপ বা ডেটাবেজ লেভেলে সিমেট্রিক এনক্রিপ্ট করে সেভ করা।",
      b: "ডাটাবেজে ssl = on এবং sslmode=verify-full দিয়ে নেটওয়ার্ক ট্রানজিট এনক্রিপ্ট করা হয়। ডিস্কে AES-256 এবং সংবেদনশীল ফিল্ডে pgcrypto দিয়ে এনক্রিপশন কার্যকর করে সর্বোচ্চ ডেটা সিকিউরিটি নিশ্চিত করা হয়।",
      e: "Enforce multi-layered compliance: Data in Transit requires TLS with sslmode=verify-full; Data at Rest utilizes hardware-level AES-256 volume encryption managed via KMS; Application-level sensitive columns (PII) are encrypted via the pgcrypto extension prior to insertion.",
      code: "CREATE EXTENSION IF NOT EXISTS pgcrypto;\nINSERT INTO sensitive_vault (user_id, secret_nid)\nVALUES ($1, pgp_sym_encrypt('19901234567890', 'master-vault-key'));"
    }
  ]
};
