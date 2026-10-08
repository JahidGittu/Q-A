// Topic 6: Database Transactions & ACID (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "database-transactions-acid",
  name: "Database Transactions & ACID Concurrency",
  desc: "ACID Properties, Isolation Levels, Dirty/Phantom Reads, SELECT FOR UPDATE, Pessimistic vs Optimistic Locking, Deadlock Prevention",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Database Transaction কী এবং ACID নীতিগুলোর প্রতিটি শব্দের অর্থ কী?",
      m: "Database Transaction হলো এক বা একাধিক SQL অপারেশনের একটি অবিভাজ্য লজিক্যাল ইউনিট। ACID হলো ৪টি মৌলিক গ্যারান্টি: (১) `Atomicity (অল-অর-নাথিং)`: ট্রানজ্যাকশনের সব কাজ সফল হবে, না হলে কিছুই হবে না (ব্যর্থ হলে পুরোটা রোলব্যাক হবে)। (২) `Consistency`: ট্রানজ্যাকশনের আগে ও পরে সব ডাটাবেজ রুলস, কনস্ট্রেইন্ট ও ব্যালেন্স শুদ্ধ থাকবে। (৩) `Isolation`: একাধিক কনকারেন্ট ট্রানজ্যাকশন একে অপরের অপারেশনের অন্তর্বর্তীকালীন ডেটা দেখতে পারবে না। (৪) `Durability`: ট্রানজ্যাকশন একবার কমিট হলে পাওয়ার কাট বা সার্ভার ক্র্যাশেও ডেটা হারিয়ে যাবে না (WAL লগ ডিস্কে সেভ থাকে)।",
      b: "ট্রানজ্যাকশন হলো একাধিক ডাটাবেজ কুয়েরির একটি অবিভাজ্য ইউনিট। ACID নিশ্চিত করে: অ্যাটোমিসিটি (সব হবে নয়তো কিছুই হবে না), কনসিস্টেন্সি (শর্ত বজায় থাকবে), আইসোলেশন (আলাদা থাকবে), এবং ডিউরেবিলিটি (সার্ভার ক্র্যাশেও ডেটা সুরক্ষিত থাকবে)।",
      e: "A transaction is an indivisible unit of database operations. ACID guarantees: Atomicity (all-or-nothing execution), Consistency (maintains schema constraints and invariants), Isolation (concurrent operations execute without interference), and Durability (committed transactions persist through power loss or system crashes).",
      tip: "ইন্টারভিউতে 'All-or-nothing atomicity and WAL-based durability' বলবে।"
    },
    {
      lvl: "lvl1",
      q: "SQL-এ `COMMIT` এবং `ROLLBACK`-এর ভূমিকা কী?",
      m: "যখন কোনো ট্রানজ্যাকশন `BEGIN` বা `START TRANSACTION` দিয়ে শুরু হয়, তখন ভেতরের সব পরিবর্তন ডেটাবেজের মেমোরি বাফার ও ট্রানজ্যাকশন লগে অস্থায়ীভাবে থাকে। যদি সব অপারেশন সফল হয়, তবে `COMMIT` কল করা হয়—যার ফলে পরিবর্তনগুলো স্থায়ীভাবে ডিস্কে রাইট হয় এবং অন্য সব ইউজারের কাছে দৃশ্যমান হয়। আর যদি মাঝে কোনো একটি এরর বা এক্সেপশন ঘটে, তবে `ROLLBACK` কল করা হয়—যার ফলে ট্রানজ্যাকশনের শুরু থেকে হওয়া সমস্ত সাময়িক পরিবর্তন পুরোপুরি মুছে যায় এবং ডাটাবেজ আগের নিখুঁত অবস্থায় ফিরে যায়।",
      b: "COMMIT ট্রানজ্যাকশনের সমস্ত পরিবর্তন স্থায়ীভাবে সংরক্ষণ করে। আর কোনো ত্রুটি ঘটলে ROLLBACK কল করে সমস্ত সাময়িক পরিবর্তন বাতিল করে ডেটাবেজকে পূর্ববর্তী নিরাপদ অবস্থায় ফিরিয়ে নেওয়া হয়।",
      e: "COMMIT permanently finalizes all database mutations within the transaction and makes them visible to the rest of the system. ROLLBACK aborts the transaction, reverting all staged mutations back to the pre-transaction state upon encountering any error.",
      code: "BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;"
    },
    {
      lvl: "lvl1",
      q: "Pessimistic Locking বনাম Optimistic Locking-এর মধ্যে মূল পার্থক্য কী এবং কখন কোনটি ব্যবহার করবে?",
      m: "(১) `Pessimistic Locking`: ধরে নেওয়া হয় কনফ্লিক্ট ঘটবেই! তাই ডেটা রিড করার সময়ই রো-তে ডাটাবেজ লেভেলে এক্সক্লুসিভ লক ফেলে দেওয়া হয় (`SELECT FOR UPDATE`), যাতে ট্রানজ্যাকশন শেষ না হওয়া পর্যন্ত অন্য কেউ ওই রো এডিট করতে না পারে। ব্যবহার: ব্যাংকিং ব্যালেন্স ডেবিট, টিকিট বুকিং বা স্টক রিডাকশন। (২) `Optimistic Locking`: কোনো লক ফেলা হয় না; ধরে নেওয়া হয় কনফ্লিক্ট খুব কম হবে। রেকর্ডে একটি `version` নম্বর রাখা হয়। আপডেট করার সময় চেক করা হয় ভার্সন অপরিবর্তিত আছে কি না (`WHERE version = 5`)। ব্যবহার: সিএমএস আর্টিকেল এডিট, ইউজার প্রোফাইল বা হাই-রিড লো-কনকারেন্সি সিস্টেম।",
      b: "পেসিমিস্টিক লকিং ডেটা পড়ার সময়ই ডাটাবেজে লক ফেলে দেয় যাতে অন্য কেউ হাত না দিতে পারে (যেমন ব্যাংকিং ট্রানজ্যাকশন)। অপটিমিস্টিক লকিং লক না করে ভার্সন কলাম দিয়ে কনফ্লিক্ট যাচাই করে (যেমন প্রোফাইল এডিট)।",
      e: "Pessimistic Locking locks rows at read time (SELECT FOR UPDATE) preventing concurrent access until commit (ideal for high-contention financial ledger mutations). Optimistic Locking avoids locks, checking a version column during update and failing on mismatch (ideal for low-conflict scenarios like profile updates).",
      tip: "বলো: 'Pessimistic prevents conflicts with DB locks; Optimistic detects conflicts at commit via versioning.'"
    },
    {
      lvl: "lvl1",
      q: "Database Deadlock কী এবং এটি কীভাবে ঘটে?",
      m: "Deadlock হলো এমন একটি অচল অবস্থা যেখানে দুটি বা ততোধিক ট্রানজ্যাকশন একে অপরের লক করে রাখা রিসোর্সের জন্য অপেক্ষা করতে থাকে, ফলে কেউই এগোতে পারে না! উদাহরণ: ট্রানজ্যাকশন A রো ১ লক করেছে এবং রো ২-এর জন্য অপেক্ষা করছে; একই সময়ে ট্রানজ্যাকশন B রো ২ লক করেছে এবং রো ১-এর জন্য অপেক্ষা করছে! ডেটাবেজ ইঞ্জিন স্বয়ংক্রিয়ভাবে একটি ডেডলক ডিটেকশন গ্রাফ চালায় এবং যেকোনো একটি ট্রানজ্যাকশনকে `Deadlock detected` এরর দিয়ে কিল করে অন্যটিকে সম্পন্ন হওয়ার সুযোগ দেয়।",
      b: "ডেডলক হলো রিসোর্স লকিংয়ের অচলাবস্থা যেখানে ট্রানজ্যাকশন A অপেক্ষা করে B-এর রিলিজের জন্য এবং B অপেক্ষা করে A-এর রিলিজের জন্য। ডেটাবেজ স্বয়ংক্রিয়ভাবে যেকোনো একটিকে রোলব্যাক করে অচলাবস্থা দূর করে।",
      e: "A Deadlock occurs when two or more transactions hold locks on resources the other needs, creating a circular wait cycle (Transaction A holds Lock 1 and waits for Lock 2; Transaction B holds Lock 2 and waits for Lock 1). The database engine aborts one transaction to break the cycle.",
      code: "-- Tx 1: Locks row A, waits for B\n-- Tx 2: Locks row B, waits for A -> Deadlock!"
    },
    {
      lvl: "lvl1",
      q: "Write-Ahead Logging (WAL) কী এবং এটি Durability কীভাবে নিশ্চিত করে?",
      m: "WAL হলো ডাটাবেজ ক্র্যাশ রিকভারির মূল মেকানিজম। যেকোনো ডেটা মূল টেবিল ফাইলে (Heap Table) লেখার আগে ডেটাবেজ নিশ্চিত করে যে অপারেশনের লগটি ডিস্কের সিকুয়েনশিয়াল WAL ফাইলে রাইট ও ফ্লাশ (`fsync`) হয়েছে। যদি কোনো ট্রানজ্যাকশন কমিট হওয়ার পর পরই বিদ্যুৎ চলে যায় বা সার্ভার রিবুট হয়, রিস্টার্টের সময় ডাটাবেজ WAL লগ রি-প্লে করে ডেটাবেজের নিখুঁত অবস্থা ফিরিয়ে আনে। সিকুয়েনশিয়াল রাইট হওয়ায় এটি ডিস্ক র্যান্ডম আই/ও বাঁচিয়ে পারফরম্যান্সও বাড়ায়।",
      b: "WAL হলো এমন একটি লগ যেখানে মূল ফাইলে লেখার আগেই প্রতিটি পরিবর্তনের তথ্য ডিস্কে লিখে রাখা হয়। ফলে সার্ভার ক্র্যাশ করলেও রিস্টার্টের সময় WAL লগ পড়ে ডেটাবেজ পুনরুদ্ধার করা সম্ভব হয়।",
      e: "Write-Ahead Logging (WAL) guarantees Durability by writing and flushing change logs to sequential disk files before applying them to database heap pages. In case of unexpected server crashes, PostgreSQL replays the WAL logs during recovery to restore the committed state.",
      tip: "WAL নিশ্চিত করে যে COMMIT সফল হওয়া মানেই ডেটা নিরাপদে ডিস্কে স্থায়ী হয়েছে।"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "SQL Standard-এর ৪টি Isolation Levels কী কী এবং তাদের প্রিভেনশন ম্যাট্রিক্স কী?",
      m: "৪টি স্তর: (১) `Read Uncommitted`: অন্য ট্রানজ্যাকশনের আনকমিটেড ডেটাও পড়া যায় (Dirty Read হতে পারে)। (২) `Read Committed` (Postgres-এর ডিফল্ট): শুধু কমিট হওয়া ডেটা পড়া যায়; Dirty Read ঠেকায়, কিন্তু Non-repeatable Read হতে পারে। (৩) `Repeatable Read`: পুরো ট্রানজ্যাকশনে একই কুয়েরি চালালে একই রেজাল্ট পাওয়া যাবে; Non-repeatable Read ঠেকায়, কিন্তু Phantom Read হতে পারে। (৪) `Serializable`: সর্বোচ্চ স্তর; কনকারেন্ট ট্রানজ্যাকশনগুলোকে এমনভাবে চালায় যেন তারা একটার পর একটা ক্রমানুসারে চলেছে; সব ধরনের অ্যানোমালি প্রতিরোধ করে কিন্তু পারফরম্যান্স ধীর হয়।",
      b: "আইসোলেশন লেভেল ৪টি: Read Uncommitted, Read Committed, Repeatable Read, এবং Serializable। পোস্টগ্রেস ডিফল্টভাবে Read Committed ব্যবহার করে যা ডার্টি রিড ঠেকায়। সর্বোচ্চ স্তর সিরিয়ালাইজেবল সব অ্যানোমালি প্রতিরোধ করে।",
      e: "The standard isolation levels from lowest to highest: Read Uncommitted (allows dirty reads), Read Committed (default in PG, prevents dirty reads), Repeatable Read (guarantees snapshot consistency across reads), and Serializable (enforces serial execution semantics, eliminating all anomalies at the cost of concurrency).",
      code: "SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;"
    },
    {
      lvl: "lvl2",
      q: "Dirty Read, Non-repeatable Read এবং Phantom Read অ্যানোমালিগুলোর বাস্তব উদাহরণ দাও?",
      m: "(১) `Dirty Read`: ট্রানজ্যাকশন A ব্যালেন্স ১০০ থেকে ৫০ করল কিন্তু এখনো কমিট করেনি। ট্রানজ্যাকশন B তা পড়ে ফেলল এবং ৫০ দেখল। এরপর A রোলব্যাক করল! B ভুল ডেটা দেখে বসে থাকল। (২) `Non-repeatable Read`: ট্রানজ্যাকশন A একটি ইউজারের ব্যালেন্স পড়ল ১০০ টাকা। এরপর ট্রানজ্যাকশন B ব্যালেন্স আপডেট করে ১২০ টাকা করে কমিট করল। ট্রানজ্যাকশন A একই ট্রানজ্যাকশনে আবার ওই রো পড়ে দেখল ১২০ টাকা! (একই রো-র মান বদলে গেছে)। (৩) `Phantom Read`: ট্রানজ্যাকশন A পড়ল `WHERE status = 'ACTIVE'` এবং ৩টি রো পেল। ট্রানজ্যাকশন B নতুন একটি চতুর্থ রো ইনসার্ট করে কমিট করল। ট্রানজ্যাকশন A আবার একই কুয়েরি চালিয়ে এবার ৪টি রো পেল (নতুন রো তৈরি হয়েছে)।",
      b: "ডার্টি রিড হলো অন্য কারো আনকমিটেড পরিবর্তন পড়ে ফেলা। নন-রিপিটেবল রিড হলো একই রো দুবার পড়ে ভিন্ন মান পাওয়া। ফ্যান্টম রিড হলো রেঞ্জ কুয়েরিতে নতুন রো ইনসার্ট হওয়ায় রোর সংখ্যা পরিবর্তন হওয়া।",
      e: "Dirty Read: Reading uncommitted changes that subsequently roll back. Non-repeatable Read: Re-reading the same row within a transaction and observing mutated values committed by another transaction. Phantom Read: Re-executing a range query and discovering newly inserted rows committed by another transaction.",
      tip: "পোস্টগ্রেসে ডিফল্ট লেভেলেই Dirty Read সম্পূর্ণ অসম্ভব কারণ এটি MVCC ব্যবহার করে।"
    },
    {
      lvl: "lvl2",
      q: "PostgreSQL-এ `SELECT FOR UPDATE` কীভাবে কাজ করে এবং `NOWAIT` ও `SKIP LOCKED` অপশনের ব্যবহার কী?",
      m: "`SELECT ... FOR UPDATE` কুয়েরি টার্গেট রো-গুলোতে এক্সক্লুসিভ রাইট লক বসিয়ে দেয়, যাতে বর্তমান ট্রানজ্যাকশন শেষ না হওয়া পর্যন্ত অন্য কোনো ট্রানজ্যাকশন ওই রো আপডেট বা লক করতে না পারে। (১) `NOWAIT`: যদি রোটি ইতিমধ্যে অন্য কেউ লক করে রাখে, তবে অপেক্ষা না করে তৎক্ষণাৎ একটি লক-কনফ্লিক্ট এরর ফিরিয়ে দেয়। (২) `SKIP LOCKED`: যদি কোনো রো ইতিমধ্যে লক থাকে, তবে তাকে স্কিপ করে আনলকড রোগুলো তুলে আনে। এটি হাই-পারফরম্যান্স ডেটাবেজ ব্যাকড জব কিউ (যেমন BullMQ বা কাস্টম মেসেজ কিউ) তৈরিতে যুগান্তকারী সমাধান! একাধিক ওয়ার্কার একই কাজ না নিয়ে প্যারালালে কিউ প্রসেস করতে পারে।",
      b: "SELECT FOR UPDATE নির্দিষ্ট রোর ওপর লক স্থাপন করে। NOWAIT অপেক্ষা না করে সাথে সাথে এরর দেয়। SKIP LOCKED ইতিমধ্যে লক হওয়া রোগুলো এড়িয়ে বাকি আনলকড রোগুলো এনে দেয় যা মেসেজ কিউ সিস্টেমের জন্য সেরা।",
      e: "SELECT FOR UPDATE acquires an exclusive row-level lock on selected records. NOWAIT fails immediately if the target row is already locked. SKIP LOCKED skips currently locked rows and returns available unlocked ones, which is the foundational pattern for high-throughput transactional job queues.",
      code: "SELECT * FROM job_queue\nWHERE status = 'PENDING'\nORDER BY priority DESC\nLIMIT 1\nFOR UPDATE SKIP LOCKED;"
    },
    {
      lvl: "lvl2",
      q: "PostgreSQL-এ MVCC (Multi-Version Concurrency Control) কীভাবে কাজ করে এবং কেন রিডার্স কখনো রাইটার্সকে ব্লক করে না?",
      m: "MVCC-এর কারণে PostgreSQL-এ কোনো রো আপডেট বা ডিলিট হলে আসল রোটি সরাসরি ওভাররাইট হয় না। এর বদলে একটি নতুন টুপল (ভার্সন) তৈরি হয় যাতে `xmin` (ক্রিয়েটর ট্রানজ্যাকশন আইডি) এবং `xmax` (ডিলিটার ট্রানজ্যাকশন আইডি) সেট থাকে। যখন কোনো রিডার কুয়েরি চালায়, সে তার ট্রানজ্যাকশনের শুরুর সময় অনুযায়ী একটি স্ন্যাপশট দেখে। এর ফলে: রিডাররা কখনো রাইটারদের আটকে রাখে না, এবং রাইটাররাও কখনো রিডারদের ব্লক করে না! অর্থাৎ রিড এবং রাইট একে অপরকে কোনো ধরনের লক না ফেলে পূর্ণ গতিতে চলতে পারে।",
      b: "MVCC প্রতি আপডেটে নতুন রো ভার্সন তৈরি করে এবং প্রতিটি ট্রানজ্যাকশনকে নিজস্ব স্ন্যাপশট প্রদান করে। এর মূল সুবিধা হলো রিড অপারেশন কখনো রাইটকে এবং রাইট কখনো রিড অপারেশনকে ব্লক করে না।",
      e: "Under MVCC (Multi-Version Concurrency Control), PostgreSQL creates a new tuple version on updates rather than mutating in place, tracking visibility via xmin and xmax transaction metadata. This enables 'Readers never block Writers, and Writers never block Readers'.",
      tip: "বলো: 'In PostgreSQL MVCC, readers never block writers and writers never block readers.'"
    },
    {
      lvl: "lvl2",
      q: "Prisma ORM-এ Interactive Transactions (`prisma.$transaction(async (tx) => { ... })`) কীভাবে ব্যাকগ্রাউন্ডে আইসোলেশন ও টাইমআউট হ্যান্ডেল করে?",
      m: "Prisma ইন্টারঅ্যাক্টিভ ট্রানজ্যাকশন শুরু করলে ডেটাবেজ কানেকশন পুল থেকে একটি ডেডিকেটেড কানেকশন রিজার্ভ করে এবং `BEGIN` পাঠায়। ব্লকের ভেতরে সব কুয়েরি ওই একই কানেকশনে চলে। Prisma বাই-ডিফল্ট ট্রানজ্যাকশনের জন্য দুটি অপশন প্রোভাইড করে: `maxWait` (কানেকশন পাওয়ার জন্য সর্বোচ্চ অপেক্ষা, ডিফল্ট 2000ms) এবং `timeout` (পুরো ট্রানজ্যাকশন শেষ হওয়ার সময়সীমা, ডিফল্ট 5000ms)। যদি ব্লকের ভেতর কোনো প্রমিজ রিজেক্ট হয় বা নির্ধারিত সময়ে কাজ শেষ না হয়, তবে Prisma স্বয়ংক্রিয়ভাবে ডেটাবেজে `ROLLBACK` কমান্ড পাঠায় এবং কানেকশন পুলে কানেকশনটি ফেরত দেয়।",
      b: "প্রিজমা ইন্টারঅ্যাক্টিভ ট্রানজ্যাকশন একটি নিবেদিত কানেকশনে চলে এবং টাইমআউট ও ম্যাক্সওয়েট পর্যবেক্ষণ করে। ব্লকের ভেতর কোনো এরর ঘটলে বা টাইমআউট হলে প্রিজমা স্বয়ংক্রিয়ভাবে ডাটাবেজে রোলব্যাক কার্যকর করে।",
      e: "Prisma Interactive Transactions reserve a single dedicated database client from the pool to execute a BEGIN block. It enforces maxWait and timeout thresholds; if any operation throws or times out, Prisma automatically issues a ROLLBACK and safely recycles the connection.",
      code: "await prisma.$transaction(async (tx) => {\n  const user = await tx.user.update({ ... });\n  await tx.audit.create({ ... });\n}, { maxWait: 2000, timeout: 5000 });"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Deadlock Detection গ্রাফ এবং কনকারেন্ট ট্রানজ্যাকশনে ডেডলক সম্পূর্ণ প্রতিরোধ করার নিয়মাবলি কী কী?",
      m: "ডেডলক প্রতিরোধের গোল্ডেন রুলস: (১) `Strict Lock Ordering`: সিস্টেমের সব জায়গায় সবসময় একই ক্রমানুসারে রো বা টেবিল লক করতে হবে। যেমন দুটি অ্যাকাউন্ট A এবং B-এর মধ্যে টাকা ট্রান্সফার করার সময় সবসময় ছোট আইডি আগে এবং বড় আইডি পরে লক করতে হবে (`ORDER BY id ASC`)। তাহলে ট্রানজ্যাকশন A এবং B কখনোই বিপরীতমুখী লকে আটকাতে পারবে না। (২) ট্রানজ্যাকশন যত সম্ভব ছোট ও সংক্ষিপ্ত রাখতে হবে। (৩) ট্রানজ্যাকশনের ভেতরে দীর্ঘ সময়ের জন্য কোনো থার্ড পার্টি এপিআই কল বা ফাইল আই/ও করা সম্পূর্ণ নিষিদ্ধ। (৪) অ্যাপ্লিকেশনে ৩ বার অটোমেটেড এক্সপোনেনশিয়াল ব্যাকঅফ রিট্রাই মেকানিজম রাখা।",
      b: "ডেডলক রোধের মূল উপায় হলো সবসময় একই ক্রমানুসারে আইডি সর্ট করে লক করা, ট্রানজ্যাকশন অতি সংক্ষিপ্ত রাখা, ট্রানজ্যাকশনের ভেতরে এপিআই কল নিষিদ্ধ করা এবং কোডে রিট্রাই মেকানিজম যুক্ত করা।",
      e: "To prevent deadlocks: (1) Enforce strict universal locking order (e.g. always sort resource IDs in ascending sequence before locking), (2) Keep transactions hyper-short, (3) Never perform third-party HTTP/network I/O inside transactional locks, and (4) Wrap transactional mutations in exponential backoff retries.",
      code: "// Always lock in ascending order:\nconst [firstId, secondId] = [fromId, toId].sort();\nawait tx.$queryRaw`SELECT * FROM accounts WHERE id IN (${firstId}, ${secondId}) FOR UPDATE;`;"
    },
    {
      lvl: "lvl3",
      q: "MongoDB Multi-Document ACID Transactions কীভাবে কাজ করে এবং রিলেশনাল ডেটাবেজের ট্রানজ্যাকশনের সাথে এর তুলনা কী?",
      m: "MongoDB v4.0+ থেকে রেপ্লিকা সেট এবং শার্ডেড ক্লাস্টারে মাল্টি-ডকুমেন্ট ট্রানজ্যাকশন সাপোর্ট করে। এটি `session.startTransaction()` দিয়ে শুরু হয় এবং `session.commitTransaction()` দিয়ে শেষ হয়। তবে মনে রাখতে হবে: মঙ্গোডিবির সিঙ্গেল ডকুমেন্টে যেকোনো আপডেট এমনিতেই শতভাগ অ্যাটমিক! মাল্টি-ডকুমেন্ট ট্রানজ্যাকশন মঙ্গোডিবির রাইট পারফরম্যান্সে উল্লেখযোগ্য ওভারহেড তৈরি করে এবং ডিফল্ট টাইমআউট মাত্র ৬০ সেকেন্ড। তাই NoSQL-এ স্কিমা এমনভাবে ডিজাইন করা উচিত যেন ৯৫% ক্ষেত্রে ট্রানজ্যাকশন ছাড়াই এমবেডেড ডকুমেন্টে অ্যাটমিকালি কাজ করা যায়।",
      b: "মঙ্গোডিবি রেপ্লিকা সেটে সেশন ব্যবহার করে মাল্টি-ডকুমেন্ট ট্রানজ্যাকশন পরিচালনা করে। তবে এর কার্যকারিতা ভারী হওয়ায় স্কিমা এমনভাবে ডিজাইন করা উচিত যেন বেশিরভাগ কাজ সিঙ্গেল ডকুমেন্টের অ্যাটমিক আপডেটে শেষ হয়।",
      e: "MongoDB supports multi-document ACID transactions across replica sets via ClientSession API. While providing strict serializability semantics, they incur heavier coordinator overhead than relational engines; idiomatic NoSQL schema design aims to leverage single-document atomic updates where possible.",
      code: "const session = await mongoose.startSession();\nsession.startTransaction();\ntry {\n  await Order.create([{ ... }], { session });\n  await Stock.updateOne({ ... }, { session });\n  await session.commitTransaction();\n} catch (err) {\n  await session.abortTransaction();\n} finally {\n  session.endSession();\n}"
    },
    {
      lvl: "lvl3",
      q: "Two-Phase Commit (2PC) বনাম Saga Distributed Transaction Pattern-এর মধ্যে পার্থক্য কী?",
      m: "মাইক্রোসার্ভিসে যখন একাধিক ভিন্ন ভিন্ন ডেটাবেজ থাকে, তখন সিঙ্গেল লোকাল ট্রানজ্যাকশন কাজ করে না। (১) `Two-Phase Commit (2PC)`: একটি সেন্ট্রাল কোঅর্ডিনেটর থাকে যা প্রথমে সব নোডকে 'Prepare' পাঠায় এবং সবাই রাজি হলে 'Commit' পাঠায়। কিন্তু কোনো একটি নোড স্লো হলে পুরো সিস্টেমের সব ডেটাবেজ লক হয়ে ব্লকিং ঘটে (Single Point of Failure)। (২) `Saga Pattern` (আধুনিক মাইক্রোসার্ভিস স্ট্যান্ডার্ড): প্রতিটি সার্ভিস তার লোকাল ডেটাবেজে ট্রানজ্যাকশন শেষ করে ইভেন্ট পাবলিশ করে। যদি পরের কোনো ধাপে ব্যর্থতা আসে, তবে পূর্ববর্তী ধাপগুলোর জন্য 'Compensating Transactions' (যেমন ব্যালেন্স রিফান্ড) চালিয়ে পুরো সিস্টেমকে ইভেনচুয়াল কনসিস্টেন্সিতে নিয়ে আসে।",
      b: "টু-ফেজ কমিট সব ডেটাবেজে লক ফেলে কাজ করে যা পুরো সিস্টেম স্লো করে। আধুনিক সাগা প্যাটার্ন প্রতিটি সার্ভিসে লোকাল ট্রানজ্যাকশন চালায় এবং ব্যর্থ হলে ক্ষতিপূরণমূলক (Compensating) ট্রানজ্যাকশন দিয়ে ডেটা রিভার্স করে।",
      e: "Two-Phase Commit (2PC) coordinates distributed transactions via prepare/commit phases with blocking locks, risking system-wide stalls. The Saga Pattern executes a series of asynchronous local transactions across services; upon failure, it triggers compensating transactions to gracefully roll back state.",
      tip: "মাইক্রোসার্ভিস ডিজাইনে 'Saga pattern with compensating transactions' বলা আর্কিটেকচারাল ম্যাচুরিটির প্রমাণ।"
    },
    {
      lvl: "lvl3",
      q: "Write Skew Anomaly কী এবং Serializable Isolation Level ছাড়া এটি কীভাবে ডাটাবেজ ইনভ্যারিয়েন্ট নষ্ট করে?",
      m: "Write Skew ঘটে যখন দুটি সমান্তরাল ট্রানজ্যাকশন দুটি ভিন্ন রোর ওপর কাজ করে কিন্তু তাদের সিদ্ধান্ত একটি যৌথ বিজনেস রুলের ওপর নির্ভর করে। উদাহরণ: হাসপাতালে রুল আছে 'কমপক্ষে ১ জন ডাক্তার অন-কল থাকতে হবে'। ডাটাবেজে ডাক্তার রফিক ও করিম অন-কল আছেন। রফিক ছুটিতে যাওয়ার রিকোয়েস্ট পাঠাল; ট্রানজ্যাকশন চেক করল মোট ডাক্তার ২ জন, তাই সে রফিকের স্ট্যাটাস OFF করল। একই সেকেন্ডে করিম ছুটিতে যাওয়ার রিকোয়েস্ট পাঠাল; সেও দেখল মোট ডাক্তার ২ জন এবং নিজের স্ট্যাটাস OFF করল! ফলাফল: হাসপাতালে ০ জন ডাক্তার অবশিষ্ট রইল! এটি Repeatable Read স্তরেও ঘটে; এটি ঠেকাতে `SERIALIZABLE` স্তর অথবা явный টেবিল-লেভেল লক প্রয়োজন।",
      b: "রাইট স্কিউ ঘটে যখন দুটি ট্রানজ্যাকশন ভিন্ন রো এডিট করে কিন্তু একটি যৌথ শর্ত ভঙ্গ করে ফেলে। এটি সাধারণ আইসোলেশনে ধরা পড়ে না; এটি প্রতিরোধে সিরিয়ালাইজেবল আইসোলেশন লেভেল বাধ্যতামূলক।",
      e: "Write Skew occurs under Repeatable Read when concurrent transactions read overlapping data states and concurrently modify disjoint sets of rows that mutually invalidate a joint business invariant. Resolving Write Skew demands Serializable isolation or explicit locking predicates.",
      tip: "অন-কল ডাক্তারের উদাহরণ দিয়ে রাইট স্কিউ ব্যাখ্যা করলে ইন্টারভিউয়ার মুগ্ধ হবেন।"
    },
    {
      lvl: "lvl3",
      q: "Prisma বা PostgreSQL-এ Transaction Retry Wrapper কীভাবে ইমপ্লিমেন্ট করবে যা Serialization Failure (40001) ও Deadlock (40P01) স্বয়ংক্রিয়ভাবে হ্যান্ডেল করে?",
      m: "PostgreSQL যখন কোনো ট্রানজ্যাকশন ডেডলক (`40P01`) বা সিরিয়ালাইজেশন কনফ্লিক্ট (`40001`)-এর কারণে রোলব্যাক করে, তখন এটি অ্যাপ্লিকেশনকে বলে কুয়েরিটি পুনরায় চেষ্টা করতে। আমরা একটি রিকল/রিট্রাই ফাংশন লিখি যা এক্সপোনেনশিয়াল ব্যাকঅফ এবং র‍্যান্ডম জিটার (Jitter) সহ সর্বোচ্চ ৩ বার ট্রানজ্যাকশনটি রি-রান করে। যদি ৩ বারেও ব্যর্থ হয় তবেই ফাইনাল এরর ছুড়ে দেয়। এতে সাময়িক ট্রানজ্যাকশন কনফ্লিক্টে কোনো এপিআই রিকোয়েস্ট ফেইল করে না এবং ৯৯.৯% ট্রানজ্যাকশন সাইলেন্টলি সফল হয়।",
      b: "পোস্টগ্রেস ৪০০০১ বা ৪০P০১ এরর দিলে ট্রানজ্যাকশনটি রিট্রাই করতে হয়। এক্সপোনেনশিয়াল ব্যাকঅফ সহ ৩ বার স্বয়ংক্রিয় রিট্রাই মেকানিজম বানালে কোনো ব্যবহারকারী ফেইলিয়র এরর দেখে না।",
      e: "PostgreSQL serialization failures (40001) and deadlocks (40P01) expect client retry. Implement an exponential backoff wrapper with randomized jitter that catches these specific PostgreSQL error codes and retries the transaction up to 3 times before surfacing an error.",
      code: "async function withTxRetry(fn, maxRetries = 3) {\n  for (let attempt = 1; attempt <= maxRetries; attempt++) {\n    try { return await fn(); }\n    catch (err: any) {\n      if (['40001', '40P01'].includes(err.code) && attempt < maxRetries) {\n        await new Promise(r => setTimeout(r, Math.random() * 100 * attempt));\n        continue;\n      }\n      throw err;\n    }\n  }\n}"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: ইনভেন্টরি স্টক মাত্র ১টি বাকি আছে। একই মিলিসেকেন্ডে দুজন গ্রাহক ওই প্রোডাক্ট কিনতে 'Order' বাটনে চাপ দিল। ট্রানজ্যাকশন লক ছাড়া কোড লিখলে কী হবে এবং কীভাবে সমাধান করবে?",
      m: "লক ছাড়া কোড লিখলে (Race Condition): উভয় রিকোয়েস্ট প্যারালালে স্টক চেক করে দেখবে `stock = 1`। ফলে উভয় রিকোয়েস্টই ভাববে স্টক আছে এবং স্টক ১ কমিয়ে দেবে। ফলে স্টক হয়ে যাবে `-1` (ওভারসোল্ড)! গ্রাহক দুজনকেই সফল অর্ডার ইমেইল পাঠানো হবে কিন্তু প্রোডাক্ট আছে মাত্র একটি। সমাধান: ট্রানজ্যাকশনের মধ্যে `SELECT stock FROM products WHERE id = $1 FOR UPDATE` দিতে হবে। এতে প্রথম কাস্টমারের ট্রানজ্যাকশন রোটি লক করে স্টক ১ থেকে ০ করে কমিট না করা পর্যন্ত ২য় কাস্টমার ওই রো রিড করতে পারবে না। ২য় কাস্টমার যখন রিড করবে, সে দেখবে স্টক ০ এবং তাকে 'Out of Stock' এরর দেখাবে।",
      b: "লক না থাকলে দুইজনই স্টক ১ দেখে অর্ডার করে ফেলবে এবং স্টক মাইনাস ১ হয়ে যাবে। SELECT FOR UPDATE দিয়ে প্রথম গ্রাহকের অর্ডার শেষ না হওয়া পর্যন্ত রোটি লক রাখলে এই রেস কন্ডিশন পুরোপুরি দূর হবে।",
      e: "Without locks, a race condition causes both requests to read stock = 1 simultaneously, decrementing stock to -1 and overbooking the item. Guarding with SELECT FOR UPDATE serializes access: the second purchaser waits until the first commits, reading stock = 0 and receiving an out-of-stock notification.",
      code: "await prisma.$transaction(async (tx) => {\n  const [product] = await tx.$queryRaw`\n    SELECT stock FROM products WHERE id = ${pId} FOR UPDATE\n  `;\n  if (product.stock < qty) throw new Error('Out of stock');\n  await tx.$executeRaw`\n    UPDATE products SET stock = stock - ${qty} WHERE id = ${pId}\n  `;\n});"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: বিকাশ বা স্ট্রাইপ পেমেন্ট গেটওয়ের চার্জিং এপিআই কল করার কোড ট্রানজ্যাকশন ব্লকের ভেতরে রাখা হয়েছে। কেন এটি মারাত্মক আর্কিটেকচারাল ভুল এবং কীভাবে রিফ্যাক্টর করবে?",
      m: "মারাত্মক ভুল কারণ: থার্ড পার্টি পেমেন্ট গেটওয়ে রেসপন্স করতে ২ থেকে ১০ সেকেন্ড পর্যন্ত সময় নিতে পারে (এমনকি নেটওয়ার্ক টাইমআউট হতে পারে)। ট্রানজ্যাকশন ব্লকের ভেতর এই এক্সটারনাল কল রাখলে ডেটাবেজের রো-গুলো এবং কানেকশন পুলের কানেকশনটি পুরো ১০ সেকেন্ড ধরে লক হয়ে থাকবে! হাই ট্রাফিকে মুহূর্তের মধ্যে পুরো ডেটাবেজের কানেকশন পুল শেষ হয়ে সার্ভার ক্র্যাশ করবে। রিফ্যাক্টরিং: পেমেন্ট এপিআই কল ট্রানজ্যাকশনের সম্পূর্ণ বাইরে করতে হবে। পেমেন্ট সফল হওয়ার পর মাত্র ২ মিলিসেকেন্ডের একটি সুপার-ফাস্ট ডেটাবেজ ট্রানজ্যাকশনে অর্ডার ও লেজার আপডেট করতে হবে।",
      b: "ট্রানজ্যাকশনের ভেতর পেমেন্ট এপিআই কল রাখলে ডাটাবেজ কানেকশন ও রো লক হয়ে আটকে থাকে এবং পুরো সার্ভার ক্র্যাশ করে। পেমেন্ট কল ট্রানজ্যাকশনের বাইরে করে কেবল সফল রেসপন্স পাওয়ার পর ডাটাবেজ ট্রানজ্যাকশন চালাতে হয়।",
      e: "Placing third-party network calls inside database transactions holds database locks and connection slots captive for seconds during latency spikes, starving connection pools and cascading server crashes. Call payment APIs completely outside the transaction; execute atomic database mutations strictly after receiving a verified gateway response.",
      tip: "কখনোই `axios.post` বা কোনো এক্সটারনাল নেটওয়ার্ক কল ডেটাবেজ ট্রানজ্যাকশনের ভেতরে রাখবে না।"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: প্রোডাকশনে ইউজার ব্যালেন্স ট্রান্সফারের সময় প্রায়ই ডেডলক এরর (`deadlock detected`) আসছে। তুমি লগ বিশ্লেষণ করে দেখলে ট্রানজ্যাকশন ১ ইউজার A থেকে B-তে টাকা পাঠাচ্ছে এবং ট্রানজ্যাকশন ২ একই সময়ে B থেকে A-তে টাকা পাঠাচ্ছে। কীভাবে ফিক্স করবে?",
      m: "সমস্যার কারণ: ট্রানজ্যাকশন ১ আগে A লক করে তারপর B-র জন্য অপেক্ষা করছে। আর ট্রানজ্যাকশন ২ আগে B লক করে তারপর A-র জন্য অপেক্ষা করছে—যার ফলে ক্লাসিক সার্কুলার ডেডলক তৈরি হয়েছে। সমাধান: অর্ডারিং লক প্রয়োগ করা! টাকা যেদিক থেকেই যাক না কেন, আমরা সবসময় ছোট ইউজার আইডি আগে লক করব এবং বড় ইউজার আইডি পরে লক করব (`const [firstId, secondId] = [userA, userB].sort()`)। এতে উভয় ট্রানজ্যাকশনই প্রথমে একই আইডিকে লক করার চেষ্টা করবে; একজন লক পেয়ে কাজ শেষ করবে, অন্যজন কিউতে থাকবে। কোনো সার্কুলার অপেক্ষা থাকবে না এবং ডেডলক চিরতরে নির্মূল হবে!",
      b: "উভয় ট্রানজ্যাকশন বিপরীত ক্রমে রো লক করায় ডেডলক হচ্ছে। আইডি সর্ট করে সর্বদা ছোট আইডি আগে এবং বড় আইডি পরে লক করলে ডেডলক ১০০% নির্মূল হয়ে যায়।",
      e: "The deadlock stems from asymmetric lock acquisition orders (Tx 1 locks A then B; Tx 2 locks B then A). Resolve by enforcing symmetric resource ordering: sort the two account IDs lexicographically and lock the lowest ID first, breaking the circular wait condition permanently.",
      code: "const [firstId, secondId] = [fromId, toId].sort();\nawait tx.$queryRaw`SELECT * FROM accounts WHERE id = ${firstId} FOR UPDATE;`;\nawait tx.$queryRaw`SELECT * FROM accounts WHERE id = ${secondId} FOR UPDATE;`;"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি বাল্ক ইনভয়েস জেনারেশন প্রসেস চালানোর সময় ট্রানজ্যাকশনটি ১৫ সেকেন্ড চলার পর `Statement timeout` দিয়ে ফেইল করল। কীভাবে এটি সমাধান করবে?",
      m: "সমাধান: (১) হাজার হাজার ইনভয়েস একটি একক দানবীয় ট্রানজ্যাকশনে চালানো আর্কিটেকচারাল ভুল—কারণ এতে হিউজ পরিমাণ রো লক থাকে এবং মেমোরি জমে যায়। (২) ব্যাচিং (Chunking) করতে হবে: ৫০ বা ১০০টি করে ইনভয়েসের ছোট ছোট ব্যাচ তৈরি করে পৃথক পৃথক সাব-ট্রানজ্যাকশনে প্রসেস করতে হবে। (৩) প্রসেসটিকে নোডের মূল থ্রেড বা এপিআই রিকোয়েস্ট থেকে সরিয়ে BullMQ ব্যাকগ্রাউন্ড ওয়ার্কারে পাঠাতে হবে যাতে এপিআই টাইমআউট না ঘটে।",
      b: "একক দানবীয় ট্রানজ্যাকশনে বাল্ক ডেটা প্রসেস করা উচিত নয়। ১০০টি করে ছোট ছোট ব্যাচে ভাগ করে পৃথক ট্রানজ্যাকশনে এবং ব্যাকগ্রাউন্ড কিউতে প্রসেস করলে টাইমআউট এড়ানো যায়।",
      e: "Running massive bulk mutations within a monolithic transaction exhausts locks and hits statement timeouts. Chunk the batch into smaller atomic sub-transactions (e.g. 100 rows per batch) and offload the process to an asynchronous BullMQ background worker.",
      code: "for (const chunk of lodash.chunk(invoices, 100)) {\n  await prisma.$transaction(async (tx) => {\n    await tx.invoice.createMany({ data: chunk });\n  });\n}"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি ট্রানজ্যাকশনের মধ্যে একাধিক রো ইনসার্ট করার পর অডিট লগ ইনসার্ট করার সময় এরর খেল। কিন্তু তুমি দেখলে মূল রোগুলো রোলব্যাক হয়েছে ঠিকই, কিন্তু অডিট লগও হারিয়ে গেছে! অথচ তুমি ফেইল্ড ট্রানজ্যাকশনের লগটি রাখতে চাও। কীভাবে করবে?",
      m: "কারণ: অডিট লগটি একই ট্রানজ্যাকশনের ভেতরে থাকায় পুরো ট্রানজ্যাকশন রোলব্যাক হয়ে অডিট লগও মুছে গেছে। সমাধান: অডিট লগ কখনোই মূল ট্রানজ্যাকশন ব্লকের ভেতরে রাখা যাবে না! অডিট লগকে ট্রানজ্যাকশনের `catch` ব্লকের বাইরে একটি সম্পূর্ণ স্বাধীন ডেটাবেজ কলে অথবা একটি অ্যাসিনক্রোনাস মেসেজ কিউতে (RabbitMQ / Redis) পাঠাতে হবে। এমনকি ট্রানজ্যাকশন ফেইল করলেও ক্যাচ ব্লকের স্বাধীন কানেকশনটি নির্বিঘ্নে ডেটাবেজে এরর অডিট রেকর্ড করে রাখবে।",
      b: "অডিট লগ মূল ট্রানজ্যাকশনের ভেতরে থাকায় রোলব্যাকে মুছে যাচ্ছে। ট্রানজ্যাকশনের বাইরে ক্যাচ ব্লকে স্বাধীন কানেকশন দিয়ে অডিট লগ লিখলে ট্রানজ্যাকশন ব্যর্থ হলেও লগ সংরক্ষিত থাকে।",
      e: "Because the audit write shared the aborting transaction context, the ROLLBACK wiped the audit row. Decouple audit recording by executing it in the catch block via an independent database connection or pushing it asynchronously to a persistent message queue.",
      code: "try {\n  await executeTransaction();\n} catch (err) {\n  // Independent connection write outside rollback context\n  await independentAuditClient.logFailure({ error: err.message });\n  throw err;\n}"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): ক্যাশিয়ার যখন একটি ৫০,০০০ টাকার সেলস ইনভয়েস সাবমিট করে, তখন Dokani-তে কীভাবে মাল্টি-টেবিল ACID ট্রানজ্যাকশন সম্পন্ন হয়?",
      m: "দোকানি পিওএসে একটি ইনভয়েস সাবমিট হলে একটি কঠোর ACID ট্রানজ্যাকশন কার্যকর হয়: (১) `Invoices` টেবিলে মূল ইনভয়েস রো তৈরি হয়, (২) `InvoiceItems` টেবিলে আইটেমগুলো ইনসার্ট হয়, (৩) প্রতিটি প্রোডাক্টের স্টক অ্যাটমিকালি বিয়োগ করা হয় এবং স্টক হিস্ট্রি লগ হয়, (৪) যদি কাস্টমার বাকি (Credit) রাখে, তবে `Customers` টেবিলে তার ডিউ ব্যালেন্স আপডেট হয়, (৫) ডাবল-এন্ট্রি বুককিপিংয়ের জন্য `FinancialLedgers` টেবিলে ডেবিট ও ক্রেডিট এন্ট্রি পড়ে। যদি এই ৫টি স্টেপের যেকোনো একটিতে ডেটাবেজ এরর দেয় বা সার্ভার ডিসকানেক্ট হয়, তবে পুরো ট্রানজ্যাকশন ইনস্ট্যান্টলি রোলব্যাক হয়—এক পয়সারও কোনো অসঙ্গতি তৈরি হয় না!",
      b: "দোকানিতে ইনভয়েস তৈরির সময় ইনভয়েস, আইটেম, স্টক বিয়োগ, কাস্টমার বাকি এবং ফিনান্সিয়াল লেজার—এই পাঁচটি টেবিল একটি একক ACID ট্রানজ্যাকশনে আপডেট হয়। কোনো একটি ব্যর্থ হলে পুরো প্রক্রিয়া স্বয়ংক্রিয়ভাবে বাতিল হয়।",
      e: "In Dokani POS, finalizing a checkout runs a strict 5-table ACID transaction: persisting the invoice, inserting invoice line items, atomically decrementing inventory stocks, updating customer receivable ledgers, and recording double-entry journal entries. A failure at any step triggers an instantaneous rollback.",
      tip: "দোকানির এই ৫-টেবিল ট্রানজ্যাকশনের উদাহরণ ইন্টারভিউয়ারকে তোমার গভীর আর্কিটেকচারাল দক্ষতা প্রমাণ করবে।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: ব্যাংকিং বা ফিনটেক সিস্টেমে ডাবল-এন্ট্রি লেজার সিস্টেমে ডেবিট এবং ক্রেডিট ব্যালেন্সিং কীভাবে ট্রানজ্যাকশন কনস্ট্রেইন্ট দিয়ে সুরক্ষিত রাখবে?",
      m: "ডাবল-এন্ট্রি বুককিপিংয়ের গোল্ডেন রুল হলো: প্রতিটি ট্রানজ্যাকশনের মোট ডেবিট এবং মোট ক্রেডিট অবশ্যই সমান হতে হবে (`SUM(debit) = SUM(credit)`)। আমরা ডেটাবেজ ট্রানজ্যাকশনের ভেতরে সব জার্নাল এন্ট্রি ইনসার্ট করার পর একটি ভ্যালিডেশন চালাই। পোস্টগ্রেসে এটি ডেফার্ড কনস্ট্রেইন্ট ট্রিগার (`CONSTRAINT ... DEFERRABLE INITIALLY DEFERRED`) দিয়ে এনফোর্স করা যায়—যা ট্রানজ্যাকশন চলাকালীন চেক না করে ঠিক `COMMIT` করার মুহূর্তে যোগফল চেক করে। যদি মোট ডেবিট ও ক্রেডিট সমান না হয়, তবে ডেটাবেজ স্বয়ংক্রিয়ভাবে ট্রানজ্যাকশন রিজেক্ট করে রোলব্যাক করে দেয়।",
      b: "ডাবল-এন্ট্রি লেজারে মোট ডেবিট ও ক্রেডিট সমান থাকা বাধ্যতামূলক। পোস্টগ্রেসের ডেফার্ড কনস্ট্রেইন্ট ব্যবহার করে নিশ্চিত করা হয় যে কমিটের মুহূর্তে মোট ডেবিট ও ক্রেডিট মিলে গেছে, অন্যথায় ডেটাবেজ ট্রানজ্যাকশন বাতিল করে।",
      e: "In financial ledgers, double-entry accounting enforces SUM(debits) === SUM(credits). Enforce this via database DEFERRABLE INITIALLY DEFERRED constraints evaluated at COMMIT time, guaranteeing that imbalanced transactions cannot be committed under any circumstance.",
      code: "CREATE CONSTRAINT TRIGGER check_ledger_balance\nAFTER INSERT OR UPDATE ON journal_entries\nDEFERRABLE INITIALLY DEFERRED\nFOR EACH ROW EXECUTE FUNCTION verify_ledger_zero_sum();"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: হাই-কনকারেন্সি টিকিট বুকিং বা ফ্ল্যাশ সেল সিস্টেমে 'Phantom Inventory' রোধ করতে কীভাবে ডাটাবেজ লক ডিজাইন করবে?",
      m: "ফ্ল্যাশ সেলে হাজার হাজার ইউজার একই সেকেন্ডে সীমিত সংখ্যক আইটেম কেনার চেষ্টা করে। আর্কিটেকচার: (১) মূল প্রোডাক্ট টেবিলে দীর্ঘ লক না দিয়ে Redis Atomic Decrement (`DECRBY`) দিয়ে মেমোরি লেভেলে টিকিট বা স্টক ব্লক করি। (২) যার জন্য রেডিস স্টক বরাদ্দ হয়, তাকে ১০ মিনিটের একটি এক্সপায়ারি টিকিট দেওয়া হয়। (৩) পেমেন্ট সম্পন্ন হলে ব্যাকগ্রাউন্ড ওয়ার্কার ডেটাবেজে `SELECT ... FOR UPDATE` দিয়ে প্রকৃত স্টক ফাইনাল ডিডাক্ট করে ট্রানজ্যাকশন কমিট করে। (৪) যদি পেমেন্ট ১০ মিনিটে না আসে, রেডিস কি এক্সপায়ার হয়ে স্টক স্বয়ংক্রিয়ভাবে মূল পুলে ফেরত যায়।",
      b: "ফ্ল্যাশ সেলে ডেটাবেজে অতিরিক্ত চাপ না দিয়ে রেডিসের অ্যাটমিক ডিক্রিমেন্ট দিয়ে স্টক রিজার্ভ করা হয় এবং পেমেন্ট শেষে ডেটাবেজে ট্রানজ্যাকশন লক দিয়ে চূড়ান্ত আপডেট সম্পন্ন করা হয়।",
      e: "Mitigate flash-sale inventory contention by buffering demand via Redis atomic decrements (DECRBY) with expiring reservations. Once payment succeeds, execute short-lived SELECT FOR UPDATE transactions in the database to finalize the physical inventory deduction.",
      tip: "ইন্টারভিউতে 'Redis atomic decrement buffering combined with transactional DB finalization' উল্লেখ করবে।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: দীর্ঘমেয়াদি ডিস্ট্রিবিউটেড ট্রানজ্যাকশনে (যেমন পেমেন্ট + ইনভেন্টরি + কুরিয়ার বুকিং) সাগা প্যাটার্ন কীভাবে ফেইলিয়র রিকভারি করে?",
      m: "ধরি একটি অর্ডারে ৩টি ধাপ: (১) কাস্টমারের কার্ড থেকে টাকা কাটা হলো (সফল), (২) ইনভেন্টরি থেকে স্টক ডিডাক্ট করা হলো (সফল), (৩) কুরিয়ার এপিআইতে পার্সেল বুকিং করতে গিয়ে কুরিয়ার ডাউন থাকায় এরর এলো! যেহেতু লোকাল রোলব্যাক এখানে কাস্টমারের কার্ডে টাকা ফেরত দিতে পারবে না, সাগা অর্কেস্ট্রেটর তখন রিভার্স 'Compensating Actions' শুরু করে: সে অটোমেটিক ইনভেন্টরিতে স্টক রি-স্টোর করে এবং পেমেন্ট গেটওয়েতে রিফান্ড এপিআই কল করে কাস্টমারের কার্ডে টাকা ফেরত পাঠায়। এরপর অর্ডার স্ট্যাটাস `FAILED_REFUNDED` সেট করে লগ সংরক্ষণ করে।",
      b: "সাগা প্যাটার্নে শেষ ধাপে কুরিয়ার বুকিং ফেইল করলে অর্কেস্ট্রেটর রিভার্স ক্ষতিপূরণমূলক কাজ চালায়—স্টক আবার পুলে ফেরত দেয় এবং পেমেন্ট রিফান্ড করে সিস্টেমকে সুরক্ষিত রাখে।",
      e: "In distributed Saga workflows, if the final logistics dispatch fails after successful payment and stock allocation, the Saga orchestrator triggers compensating actions: releasing the reserved inventory and issuing an automated gateway refund to restore system harmony.",
      tip: "সাগা প্যাটার্নে 'Compensating transactions replace rollback across microservices' স্পষ্ট করে বলবে।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: প্রোডাকশন ডেটাবেজে লং-রানিং আনকমিটেড ট্রানজ্যাকশন (`idle in transaction`) কীভাবে সার্ভারের জীবন বিপন্ন করে এবং কীভাবে তা কিল করবে?",
      m: "`idle in transaction` ঘটে যখন কোনো অ্যাপ্লিকেশন `BEGIN` করার পর কুয়েরি চালিয়েছে, কিন্তু কোনো কারণে `COMMIT` বা `ROLLBACK` না করে কানেকশনটি ঝুলিয়ে রেখেছে। বিপদ: এটি পোস্টগ্রেসের ভ্যাকুয়ামিং প্রসেসকে সম্পূর্ণ ব্লক করে দেয়, ডেড টুপল ক্লিন হতে দেয় না, ইনডেক্স ও টেবিল ব্লোট তৈরি করে এবং ট্রানজ্যাকশন আইডি র‍্যাপঅ্যারাউন্ডের (XID wraparound) ঝুঁকি তৈরি করে পুরো ডাটাবেজ ক্র্যাশ করাতে পারে! সমাধান: `postgresql.conf`-এ `idle_in_transaction_session_timeout = '10s'` কনফিগার করতে হবে যাতে ১০ সেকেন্ড অলস থাকলে ডেটাবেজ স্বয়ংক্রিয়ভাবে কানেকশনটি টার্মিনেট করে রোলব্যাক করে দেয়।",
      b: "idle in transaction কানেকশন অলস ফেলে রেখে ভ্যাকুয়াম ব্লক করে এবং ডেটাবেজে ব্লোট তৈরি করে ক্র্যাশ ঘটায়। postgresql.conf-এ idle_in_transaction_session_timeout সেট করে অলস ট্রানজ্যাকশনগুলো স্বয়ংক্রিয়ভাবে কিল করা হয়।",
      e: "An 'idle in transaction' connection holds open lock snapshots and prevents vacuuming dead tuples, causing severe table bloat and catastrophic XID wraparound failure. Protect the database by setting idle_in_transaction_session_timeout = '10s' to auto-terminate orphaned sessions.",
      code: "-- Kill orphaned idle transactions:\nSELECT pg_terminate_backend(pid) \nFROM pg_stat_activity \nWHERE state = 'idle in transaction' \n  AND state_change < current_timestamp - INTERVAL '5 minutes';"
    }
  ]
};
