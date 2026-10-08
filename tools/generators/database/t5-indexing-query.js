// Topic 5: Indexing & Query Optimization (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "indexing-query-optimization",
  name: "Database Indexing & Query Optimization",
  desc: "B-Tree, Compound Indexes (ESR Rule), GIN & GiST for JSONB/Fulltext, Partial Indexes, EXPLAIN ANALYZE, Slow Query Optimization",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Database Index কী এবং এটি কুয়েরি সার্চের গতি কীভাবে নাটকীয়ভাবে বাড়িয়ে দেয়?",
      m: "Database Index হলো মূল টেবিলের কলামের ডেটা দিয়ে তৈরি একটি আলাদা ডেটা স্ট্রাকচার (প্রধানত B-Tree) যা পয়েন্টার সহ সর্টেড আকারে সংরক্ষিত থাকে। ইনডেক্স না থাকলে ডেটাবেজকে টেবিলের প্রথম থেকে শেষ পর্যন্ত কোটি কোটি রো স্ক্যান করতে হয় (Full Table Scan / Sequential Scan), যাতে ডিস্ক আই/ও এবং সময় অপচয় হয়। ইনডেক্স থাকলে বাইনারি সার্চের মতো `O(log N)` সময়ে মাত্র ৩-৪টি ডিস্ক ব্লকে জাম্প করে কাক্সিক্ষত রো খুঁজে পাওয়া যায়।",
      b: "ডাটাবেজ ইনডেক্স হলো বইয়ের সূচিপত্রের মতো একটি ডেটা স্ট্রাকচার যা ডেটা পয়েন্টারগুলোকে সাজিয়ে রাখে। ফলে কোটি রেকর্ডের মধ্যে পুরো টেবিল স্ক্যান না করে O(log N) সময়ে সরাসরি নির্দিষ্ট ডেটা বের করা যায়।",
      e: "A database index is an auxiliary data structure (predominantly B-Trees) holding sorted column keys with row pointers. Instead of an exhaustive O(N) sequential scan, the query planner performs an O(log N) tree traversal to pinpoint target rows in milliseconds.",
      tip: "বলো: 'Indexes turn an O(N) sequential scan into an O(log N) tree lookup.'"
    },
    {
      lvl: "lvl1",
      q: "B-Tree Index কীভাবে কাজ করে এবং কেন এটি রিলেশনাল ও ডকুমেন্ট ডেটাবেজের ডিফল্ট ইনডেক্স টাইপ?",
      m: "B-Tree (Balanced Tree) হলো একটি স্বয়ংক্রিয়ভাবে ব্যালেন্সড ট্রি ডেটা স্ট্রাকচার যেখানে সব লিফ নোড একই গভীরতায় থাকে। এটি শুধুমাত্র ইকুয়ালিটি চেক (`WHERE id = 5`) নয়, বরং রেঞ্জ কুয়েরি (`WHERE age BETWEEN 20 AND 30`), সর্টিং (`ORDER BY createdAt DESC`), এবং গ্রেটার/লেস দ্যান (`>`, `<`) অপারেশনে অবিশ্বাস্য গতি দেয়। B-Tree-র প্রতিটি নোড ডিস্ক ব্লকের সাইজের সাথে সামঞ্জস্যপূর্ণ হওয়ায় ডিস্ক আই/ও খুব কম লাগে। তাই PostgreSQL এবং MongoDB উভয় জায়গাতেই এটি ডিফল্ট ইনডেক্স।",
      b: "বি-ট্রি হলো একটি ব্যালেন্সড ট্রি যা সমতা এবং রেঞ্জ কুয়েরি উভয়ের জন্যই অপটিমাইজড। ডিস্ক আই/ও সর্বনিম্ন রেখে এটি দ্রুত ডেটা খোঁজা এবং সর্টিং সাপোর্ট করে, তাই এটি ডিফল্ট ইনডেক্স হিসেবে ব্যবহৃত হয়।",
      e: "B-Trees maintain self-balanced sorted key hierarchies where leaf nodes are linked sequentially. They excel at both point lookups (=) and range scans (<, >, BETWEEN) while matching disk block architectures, making them the standard default in PostgreSQL and MongoDB.",
      code: "CREATE INDEX idx_users_created_at ON users (created_at DESC);"
    },
    {
      lvl: "lvl1",
      q: "Compound Index (বা কলাম্ব ইনডেক্স) কী এবং এতে কলামের ক্রম (Column Ordering) কেন গুরুত্বপূর্ণ?",
      m: "Compound Index হলো একাধিক কলামের সমন্বয়ে তৈরি একটি একক ইনডেক্স (যেমন `(tenantId, status, createdAt)`)। কলামের ক্রম এখানে জীবন-মরণ সমান গুরুত্বপূর্ণ! ডেটা প্রথমে ১ম কলাম দিয়ে সর্ট হয়, তারপর ২য় কলাম দিয়ে, তারপর ৩য় কলাম দিয়ে। ইনডেক্সটি শুধুমাত্র তখনই কাজে লাগবে যদি কুয়েরির ফিল্টারে বাম দিকের প্রিফিক্স কলামগুলো (Leftmost Prefix) ব্যবহার করা হয়। যেমন: ফিল্টারে শুধু `tenantId` থাকলে ইনডেক্স কাজ করবে, কিন্তু শুধু `createdAt` থাকলে এই কম্পাউন্ড ইনডেক্স একেবারেই কাজে লাগবে না!",
      b: "কম্পাউন্ড ইনডেক্স হলো একাধিক কলামের ইনডেক্স। কলামের ক্রম অত্যন্ত গুরুত্বপূর্ণ কারণ ডাটা বাম থেকে ডানে সাজানো থাকে। কুয়েরিতে প্রথম কলাম ব্যবহার না করলে কম্পাউন্ড ইনডেক্স কোনো কাজে আসে না।",
      e: "A Compound Index indexes multiple columns together. Column sequence is paramount due to the leftmost prefix rule: B-Tree keys are sorted by column 1, then column 2, then column 3. A query filtering only on column 3 cannot use this composite index without hitting the leading columns.",
      code: "CREATE INDEX idx_orders_tenant_status ON orders (tenant_id, status);"
    },
    {
      lvl: "lvl1",
      q: "টেবিলে অতিরিক্ত ইনডেক্স বানানোর ক্ষতিকর দিক কী এবং কখন ইনডেক্স বানানো উচিত নয়?",
      m: "ইনডেক্স রিড (SELECT) দ্রুত করে, কিন্তু রাইট (INSERT, UPDATE, DELETE) অপারেশনের গতি কমিয়ে দেয়! কারণ টেবিলে নতুন রো ইনসার্ট হলে ডেটাবেজকে প্রতিটা ইনডেক্স ট্রিতে নতুন কি ঢুকিয়ে রি-ব্যালেন্স করতে হয়। এছাড়া প্রতিটি ইনডেক্স ডিস্ক এবং RAM-এ প্রচুর জায়গা দখল করে। ছোট টেবিল (যেমন ১০০-২০০ রোর স্ট্যাটাস টেবিল) বা যে কলামগুলোতে ঘন ঘন রাইট হয় কিন্তু রিড হয় না, সেগুলোতে অতিরিক্ত ইনডেক্স বানানো উচিত নয়।",
      b: "প্রতিটি ইনডেক্স ইনসার্ট এবং আপডেট অপারেশনের গতি কমায় এবং মেমোরিতে অতিরিক্ত জায়গা নেয়। তাই ছোট টেবিলে বা অপ্রয়োজনীয় কলামে ইনডেক্স তৈরি করা থেকে বিরত থাকা উচিত।",
      e: "Every index imposes a write penalty on INSERT, UPDATE, and DELETE because the engine must update and rebalance the index tree. Indexes also consume RAM cache. Avoid indexing high-write, rarely-read tables or low-cardinality flags on tiny tables.",
      tip: "ইন্টারভিউতে 'Write penalty and cache memory overhead' উল্লেখ করবে।"
    },
    {
      lvl: "lvl1",
      q: "PostgreSQL-এ `EXPLAIN` এবং `EXPLAIN ANALYZE`-এর মধ্যে মূল পার্থক্য কী?",
      m: "(১) `EXPLAIN`: কোনো কুয়েরি বাস্তবে না চালিয়েই ডেটাবেজ প্ল্যানারের স্ট্যাটিস্টিকসের ওপর ভিত্তি করে একটি আনুমানিক কুয়েরি এক্সিকিউশন প্ল্যান ও আনুমানিক খরচ (Estimated Cost) প্রদর্শন করে। (২) `EXPLAIN ANALYZE`: কুয়েরিটিকে বাস্তবে ডেটাবেজে এক্সিকিউট করে এবং প্রতিটি স্টেপে কতটা সময় (Actual Time in milliseconds), কয়টি রো প্রসেস হলো, এবং মেমোরি/বাফার ব্যবহার বিস্তারিতভাবে তুলে ধরে। স্লো কুয়েরি অপটিমাইজ করতে `EXPLAIN ANALYZE` আবশ্যক।",
      b: "EXPLAIN কুয়েরি না চালিয়ে আনুমানিক প্ল্যান দেখায়, আর EXPLAIN ANALYZE কুয়েরি বাস্তবে রান করে সঠিক মিলি-সেকেন্ড সময় এবং ব্যবহৃত মেমোরি রিপোর্ট করে।",
      e: "EXPLAIN generates an estimated execution plan based on table statistics without running the query. EXPLAIN ANALYZE executes the query against the database, outputting real elapsed execution times, loop counts, memory usage, and actual row counts.",
      code: "EXPLAIN ANALYZE SELECT * FROM orders WHERE tenant_id = 't1' AND total > 500;"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "MongoDB-তে 'ESR Rule' (Equality, Sort, Range) কী এবং কম্পাউন্ড ইনডেক্স সাজাতে এটি কীভাবে মেনে চলতে হয়?",
      m: "ESR Rule হলো কম্পাউন্ড ইনডেক্সে কলাম বা ফিল্ডগুলো সাজানোর গোল্ডেন স্ট্যান্ডার্ড: (১) `E - Equality`: যেসব ফিল্ডে নির্দিষ্ট সমতা দিয়ে কুয়েরি করা হয় (`status: 'PAID'`) সেগুলোকে সবার প্রথমে দিতে হবে। (২) `S - Sort`: যে ফিল্ড দিয়ে সর্টিং করা হয় (`sort({ createdAt: -1 })`) সেটিকে মাঝখানে দিতে হবে। (৩) `R - Range`: যেসব ফিল্ডে রেঞ্জ ফিল্টার থাকে (`{ amount: { $gte: 100 } }`) সেগুলোকে সবার শেষে দিতে হবে। এই নিয়ম মানলে ডেটাবেজকে মেমোরিতে সর্ট (In-memory Sort) করতে হয় না এবং অপ্রয়োজনীয় ডকুমেন্ট স্ক্যানিং জিরোতে নেমে আসে।",
      b: "ESR রুল হলো কম্পাউন্ড ইনডেক্স সাজানোর নিয়ম: প্রথমে Equality ফিল্ড, মাঝে Sort ফিল্ড, এবং শেষে Range ফিল্ড রাখতে হয়। এটি ইন-মেমোরি সর্ট ওভারহেড পুরোপুরি দূর করে।",
      e: "The ESR Rule dictates compound index field ordering: Equality fields first, followed by Sort fields, and lastly Range fields. Obeying ESR prevents expensive in-memory sort spills and eliminates excessive document examination during range filtering.",
      code: "// Query: find({ storeId: 'A', price: { $gt: 50 } }).sort({ date: -1 })\n// Optimal Index (E -> S -> R):\ndb.items.createIndex({ storeId: 1, date: -1, price: 1 });"
    },
    {
      lvl: "lvl2",
      q: "PostgreSQL-এ Partial Index (আংশিক ইনডেক্স) কী এবং এটি কীভাবে মেমোরি বাঁচায় ও কুয়েরি ফাস্ট করে?",
      m: "Partial Index হলো এমন একটি ইনডেক্স যা টেবিলের সব রোর ওপর না বসে শুধুমাত্র একটি নির্দিষ্ট `WHERE` শর্ত পূরণকারী রো-গুলোর ওপর বসে। যেমন: ১ কোটি অর্ডারের মধ্যে ৯৯% অর্ডার সম্পন্ন হয়ে গেছে, কিন্তু ব্যাকগ্রাউন্ড প্রসেস কেবল `status = 'PENDING'` অর্ডারগুলো খুঁজে প্রসেস করে। পুরো টেবিল ইনডেক্স করলে ইনডেক্স সাইজ ৫০০MB হতো, কিন্তু `WHERE status = 'PENDING'` আংশিক ইনডেক্স তৈরি করলে ইনডেক্স সাইজ হবে মাত্র ৫MB! ফলে এটি ক্যাশে সুন্দরভাবে ধরে এবং রাইট পেনাল্টি থাকে না বললেই চলে।",
      b: "পার্শিয়াল ইনডেক্স শুধুমাত্র নির্দিষ্ট শর্তযুক্ত রো-গুলোর ওপর তৈরি হয়। এতে ইনডেক্সের আকার ৯০% পর্যন্ত ছোট থাকে এবং নির্দিষ্ট কুয়েরিগুলোর পারফরম্যান্স অবিশ্বাস্য দ্রুত হয়।",
      e: "A Partial Index indexes only a subset of table rows satisfying a WHERE predicate. For instance, indexing WHERE status = 'PENDING' keeps the index minute (e.g. 5MB instead of 500MB), fitting into RAM cache while dramatically speeding targeting queries.",
      code: "CREATE INDEX idx_orders_pending ON orders (created_at)\nWHERE status = 'PENDING';"
    },
    {
      lvl: "lvl2",
      q: "Covering Index এবং PostgreSQL-এর `INCLUDE` ক্লজ কীভাবে টেবিল ডেটা অ্যাক্সেস ছাড়াই কুয়েরি সম্পন্ন করে (Index-Only Scan)?",
      m: "সাধারণত ইনডেক্স থেকে প্রাইমারি কি বা টুপল পয়েন্টার পাওয়ার পর ডেটাবেজকে অন্য কলামগুলোর ডেটা আনতে মূল টেবিলে যেতে হয় (Heap Fetch)। কিন্তু যদি একটি কুয়েরির প্রয়োজনীয় সব কলাম ইনডেক্স থেকেই পাওয়া যায়, তবে ডেটাবেজ মূল টেবিলে না গিয়ে সরাসরি ইনডেক্স থেকেই রেজাল্ট ফিরিয়ে দেয়—যাকে `Index-Only Scan` বলে। PostgreSQL-এ `INCLUDE (column1, column2)` ব্যবহার করে ইনডেক্স ট্রি-র লিফ নোডে নন-কি কলাম যুক্ত করা যায়, যাতে ইনডেক্স সাইজ না বাড়িয়েও ইনডেক্স-অনলি স্ক্যান নিশ্চিত হয়।",
      b: "কভারিং ইনডেক্স কুয়েরির প্রয়োজনীয় সব কলাম ইনডেক্সেই সরবরাহ করে। ফলে মূল টেবিল স্ক্যান না করে সরাসরি ইনডেক্স থেকেই ডেটা রিটার্ন হয়, যা Index-Only Scan নামে পরিচিত।",
      e: "A Covering Index contains all columns requested by a query. PostgreSQL's INCLUDE clause appends payload columns to the leaf nodes without indexing them in the B-Tree search keys, enabling zero-heap-fetch Index-Only Scans with minimal overhead.",
      code: "CREATE INDEX idx_users_email_covering ON users (email) INCLUDE (name, role);"
    },
    {
      lvl: "lvl2",
      q: "GIN (Generalized Inverted Index) ইনডেক্স কী এবং JSONB কলাম ও Full-Text Search-এ কেন GIN অপরিহার্য?",
      m: "B-Tree ইনডেক্স শুধুমাত্র পুরো ভ্যালু সার্চ করতে পারে, কিন্তু JSONB-এর ভিতরের কোনো নির্দিষ্ট কি/ভ্যালু বা টেক্সটের ভিতরের শব্দ সার্চ করতে পারে না। `GIN` ইনডেক্স হলো একটি ইনভার্টেড ইনডেক্স (বইয়ের ব্যাক-ইন্ডেক্সের মতো) যেখানে ডেটার অভ্যন্তরীণ প্রতিটি এলিমেন্ট বা ওয়ার্ডকে পৃথক করে ইনডেক্স করা হয়। PostgreSQL-এ JSONB ডকুমেন্টে `@>` (contains) অপারেটরে কুয়েরি করতে বা লাখ লাখ ডকুমেন্টে ফুল-টেক্সট সার্চ (`tsvector @@ tsquery`) করতে GIN ইনডেক্স সুপারফাস্ট সার্চ পারফরম্যান্স নিশ্চিত করে।",
      b: "জিআইএন হলো ইনভার্টেড ইনডেক্স যা JSONB ডেটার ভেতরের কি-ভ্যালু এবং ফুল-টেক্সট সার্চের প্রতিটি শব্দ ইনডেক্স করে। এটি জটিল কন্টেইনিং কুয়েরিকে অত্যন্ত দ্রুত সম্পন্ন করে।",
      e: "A GIN (Generalized Inverted Index) maps internal elements/tokens to row pointers. It is essential for PostgreSQL JSONB containment queries (@>) and full-text document searches (tsvector), where individual documents contain multiple indexed attributes.",
      code: "CREATE INDEX idx_products_metadata_gin ON products USING GIN (metadata jsonb_path_ops);"
    },
    {
      lvl: "lvl2",
      q: "PostgreSQL-এ Expression Index (বা ফাংশন-বেসড ইনডেক্স) কখন এবং কীভাবে ব্যবহার করা হয়?",
      m: "যদি কোনো কুয়েরির ফিল্টারে কলামের ওপর ফাংশন চালানো হয় (যেমন `WHERE LOWER(email) = 'user@test.com'`), তবে সাধারণ কলাম ইনডেক্স কাজ করে না কারণ ইনডেক্সে অরিজিনাল ভ্যালু সংরক্ষিত থাকে। সমাধান হিসেবে ফাংশনের এক্সপ্রেশনের ওপর সরাসরি ইনডেক্স তৈরি করা হয়: `CREATE INDEX idx_users_lower_email ON users (LOWER(email))`। এতে ডেটাবেজ লোয়ারকেস করা মানগুলো ইনডেক্স ট্রিতে রাখে এবং কুয়েরি ইনস্ট্যান্ট ইনডেক্স স্ক্যান ব্যবহার করে।",
      b: "এক্সপ্রেশন ইনডেক্স কলামের কোনো ফাংশনাল এক্সপ্রেশনের ওপর তৈরি হয় (যেমন LOWER(email))। এর ফলে ফিল্টারে ফাংশন থাকলেও সাধারণ স্ক্যান এড়িয়ে ইনডেক্স ব্যবহার করা সম্ভব হয়।",
      e: "An Expression Index evaluates and stores the result of an expression/function (such as LOWER(email) or DATE(created_at)). Without it, queries applying functions in WHERE predicates fail to use standard column B-Trees and fall back to sequential scans.",
      code: "CREATE INDEX idx_users_lower_email ON users (LOWER(email));"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "EXPLAIN ANALYZE-এর আউটপুটে 'Seq Scan', 'Index Scan', 'Bitmap Index Scan' এবং 'Index Only Scan'-এর মধ্যে পার্থক্য কীভাবে শনাক্ত করবে?",
      m: "(১) `Seq Scan (Sequential Scan)`: পুরো টেবিল শুরু থেকে শেষ পর্যন্ত পড়া হয়েছে (সবচেয়ে স্লো, ইনডেক্স মিসিং)। (২) `Index Scan`: B-Tree ইনডেক্স দিয়ে নির্দিষ্ট রো খুঁজে সরাসরি মূল হিপ টেবিল থেকে ডেটা আনা হয়েছে (পয়েন্ট লুকআপের জন্য সেরা)। (৩) `Bitmap Index Scan`: ইনডেক্স থেকে ম্যাচিং ব্লকগুলোর একটি বিটম্যাপ তৈরি করে মেমোরিতে সাজিয়ে ডিস্ক থেকে ব্যাচে ডেটা এনেছে (যখন প্রচুর রো রিটার্ন হয় বা একাধিক ইনডেক্স অ্যান্ড/অর করা হয়)। (৪) `Index Only Scan`: মূল টেবিলে স্পর্শই করা লাগেনি, সব ডেটা সরাসরি ইনডেক্স থেকেই রিটার্ন করা হয়েছে (সর্বোচ্চ দ্রুততম)।",
      b: "Seq Scan পুরো টেবিল পড়ে যা সবচেয়ে স্লো। Index Scan ইনডেক্স ধরে টেবিলে যায়। Bitmap Index Scan একাধিক রো মেমোরি বিটম্যাপে সাজিয়ে ডিস্ক থেকে আনে। Index Only Scan টেবিল ছাড়াই ইনডেক্স থেকে সরাসরি উত্তর দেয় যা দ্রুততম।",
      e: "Seq Scan reads every page in the table. Index Scan traverses the B-Tree and fetches matching heap pages. Bitmap Index Scan constructs an in-memory bitmask of page locations to batch I/O for multiple rows. Index Only Scan retrieves requested attributes directly from the index without reading heap pages.",
      tip: "ইন্টারভিউতে 'Index Only Scan bypasses the heap table completely' লাইনটি স্পষ্টভাবে উচ্চারণ করবে।"
    },
    {
      lvl: "lvl3",
      q: "High Index Bloat কী, এটি কেন ঘটে এবং প্রোডাকশন টেবিল লক না করে `REINDEX CONCURRENTLY` কীভাবে চালানো হয়?",
      m: "PostgreSQL-এ MVCC মেকানিজমের কারণে যখন প্রচুর UPDATE এবং DELETE হয়, তখন ডেড টুপলগুলো ইনডেক্স পেজে ফাঁকা জায়গা তৈরি করে। অটো-ভ্যাকুয়াম সবসময় ইনডেক্স পেজ শ্রাঙ্ক করতে পারে না, ফলে ইনডেক্স ফাইলটি অপ্রয়োজনীয়ভাবে বিশাল (Bloated) হয়ে যায় এবং RAM ক্যাশ নষ্ট করে। সাধারণ `REINDEX` পুরো টেবিলে এক্সক্লুসিভ লক ফেলে প্রোডাকশন ডাউন করে দেয়। সমাধান: `REINDEX TABLE CONCURRENTLY table_name` চালাতে হবে। এটি ব্যাকগ্রাউন্ডে নতুন ইনডেক্স তৈরি করে এবং পুরনোটির সাথে অদলবদল করে কোনো লক বা রিড/রাইট ডাউনটাইম ছাড়াই।",
      b: "প্রচুর আপডেট ও ডিলিটের ফলে ইনডেক্স পেজে ফাঁকা জায়গা তৈরি হয়ে ইনডেক্স ব্লোট হয়। প্রোডাকশনে রিড/রাইট চালু রেখেই REINDEX CONCURRENTLY চালিয়ে টেবিল লক ছাড়া ইনডেক্স পরিষ্কার করা যায়।",
      e: "Frequent updates and deletes produce dead tuples, causing index fragmentation and bloat that degrades RAM cache efficiency. A standard REINDEX blocks concurrent writes. REINDEX CONCURRENTLY builds the replacement index in the background without exclusive locking.",
      code: "REINDEX TABLE CONCURRENTLY orders;"
    },
    {
      lvl: "lvl3",
      q: "PostgreSQL-এ `pg_stat_statements` এক্সটেনশন ব্যবহার করে প্রোডাকশনের টপ ১০ স্লো কুয়েরি কীভাবে আইডেন্টিফাই করবে?",
      m: "`pg_stat_statements` হলো প্রোডাকশন ডাটাবেজ পারফরম্যান্স অডিটের সবচেয়ে শক্তিশালী বিল্ট-ইন টুল। এটি সার্ভারে চলা সব কুয়েরির মোট এক্সিকিউশন টাইম, কল কাউন্ট, মিন/ম্যাক্স টাইম এবং ব্লক আই/ও রেকর্ড করে। `SELECT query, calls, total_exec_time, mean_exec_time FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;` কুয়েরি চালিয়ে আমরা মুহূর্তে দেখতে পারি কোন কুয়েরিটি সার্ভারের সিংহভাগ সিপিইউ ও ডিস্ক সময় গ্রাস করছে।",
      b: "pg_stat_statements এক্সটেনশন সার্ভারে চলা প্রতিটি কুয়েরির গড় সময় ও কল কাউন্ট ট্র্যাক করে। total_exec_time অনুযায়ী সর্ট করে মুহূর্তেই সিস্টেমের সবচেয়ে স্লো কুয়েরিগুলো বের করা যায়।",
      e: "The pg_stat_statements module provides performance statistics for all SQL statements executed. Querying pg_stat_statements ordered by total_exec_time or mean_exec_time pinpoint the exact bottleneck queries consuming database hardware resources.",
      code: "SELECT query, calls, round(total_exec_time::numeric, 2) AS total_ms,\n       round(mean_exec_time::numeric, 2) AS avg_ms\nFROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;"
    },
    {
      lvl: "lvl3",
      q: "GiST (Generalized Search Tree) ইনডেক্স এবং BRIN (Block Range Index) কখন ব্যবহার করা হয়?",
      m: "(১) `GiST`: জিও-স্পেশিয়াল কুয়েরি (PostGIS ল্যাটিচ্যুড/লঙ্গিচ্যুড রেঞ্জ ও পলিগন), ওভারল্যাপিং রেঞ্জ ডেটা টাইপ (`tsrange`, `daterange`), এবং ফুল-টেক্সট সার্চে ব্যবহৃত হয়। (২) `BRIN`: শত শত গিগাবাইট বা টেরাবাইটের মতো বিশাল টাইম-সিরিজ বা লগ টেবিলে যেখানে ডেটা স্বাভাবিকভাবেই ক্রমানুসারে ইনসার্ট হয় (`created_at`)। BRIN প্রতিটি পেজ রেঞ্জের শুধু Min এবং Max ভ্যালু সংরক্ষণ করে, যার ফলে শত গিগাবাইটের একটি টেবিলের BRIN ইনডেক্স সাইজ মাত্র কয়েক মেগাবাইট হয়!",
      b: "GiST ব্যবহৃত হয় ভৌগোলিক ডেটা ও ওভারল্যাপিং ডেটার ক্ষেত্রে। BRIN ব্যবহৃত হয় টেরাবাইট আকারের টাইম-সিরিজ ডেটায় যেখানে ডেটা ধারাবাহিকভাবে জমা হয়—এটি মাত্র কয়েক মেগাবাইট মেমোরি ব্যবহার করে কাজ সম্পন্ন করে।",
      e: "GiST indexes non-scalar geometries, bounding boxes (PostGIS), and overlapping range intervals. BRIN (Block Range Index) stores only the minimum and maximum values for blocks of pages, ideal for multi-terabyte naturally ordered time-series data with microscopic index footprint.",
      code: "CREATE INDEX idx_logs_created_brin ON app_logs USING BRIN (created_at);"
    },
    {
      lvl: "lvl3",
      q: "PostgreSQL Query Planner যখন ভুলভাবে Index Scan-এর বদলে Seq Scan বেছে নেয়, তখন কীভাবে ট্রাবলশুট করবে?",
      m: "কারণসমূহ: (১) টেবিলের স্ট্যাটিস্টিকস পুরনো হয়ে গেছে, ফলে প্ল্যানার মনে করছে টেবিলে রো সংখ্যা খুব কম। ফিক্স: `ANALYZE table_name;` রান করে স্ট্যাট আপডেট করা। (২) কলামের ডেটা টাইপ মিসম্যাচ (যেমন কলামটি `VARCHAR` কিন্তু কুয়েরিতে ইনটিজার পাস করায় টাইপ কাস্টিংয়ের কারণে ইনডেক্স বাতিল হয়েছে)। (৩) কুয়েরিটি টেবিলের ৭০-৮০% ডেটা সিলেক্ট করছে, যেখানে সিকুয়েনশিয়াল স্ক্যান আসলেই ডিস্ক আই/ও-এর দিক থেকে দ্রুত। (৪) `random_page_cost` প্যারামিটার ডিফল্ট 4.0 রয়ে গেছে, যা SSD ড্রাইভের জন্য 1.1 করা উচিত যাতে প্ল্যানার ইনডেক্স স্ক্যানকে অগ্রাধিকার দেয়।",
      b: "প্ল্যানার ভুল করলে প্রথমে ANALYZE চালিয়ে স্ট্যাটিস্টিকস রিফ্রেশ করতে হয়, টাইপ কাস্টিং মিসম্যাচ চেক করতে হয়, এবং SSD ডিস্কের ক্ষেত্রে random_page_cost কমিয়ে 1.1 কনফিগার করতে হয়।",
      e: "Troubleshoot index bypasses by running ANALYZE table_name to refresh planner statistics, checking for implicit type-casting in WHERE filters, and tuning random_page_cost down from 4.0 to 1.1 on NVMe/SSD storage to favor random index seeks.",
      tip: "প্রোডাকশন সার্ভারে SSD থাকলে `random_page_cost = 1.1` সেট করা বেস্ট প্র্যাকটিস।"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: ৫০ লক্ষ রোর `orders` টেবিলে `SELECT * FROM orders WHERE tenant_id = 't1' ORDER BY created_at DESC LIMIT 20;` কুয়েরিটি এক্সিকিউট হতে ৪ সেকেন্ড নিচ্ছে। টেবিলে দুটি আলাদা ইনডেক্স আছে: `idx_tenant` এবং `idx_created`। সমস্যা কোথায় এবং কীভাবে ১০০ মিলিসেকেন্ডের নিচে নামাবে?",
      m: "সমস্যা: ডেটাবেজ দুটি আলাদা ইনডেক্সকে একসাথে ব্যবহার করতে গিয়ে কনফিউজড হচ্ছে—হয় সে `idx_tenant` দিয়ে ৫০ হাজার রো ফিল্টার করে মেমোরিতে বিশাল সর্ট চালাচ্ছে, অথবা `idx_created` দিয়ে ব্যাকওয়ার্ড স্ক্যান করে একটা একটা করে চেক করছে। সমাধান: দুটি আলাদা ইনডেক্স ড্রপ করে একটি যৌথ Composite Index তৈরি করতে হবে: `CREATE INDEX idx_orders_tenant_created ON orders (tenant_id, created_at DESC);`। এতে ডেটাবেজ সরাসরি `t1`-এর প্রথম ২০টি রো ইনডেক্স থেকে নিয়ে মুহূর্তেই (৫-১০ মিলিসেকেন্ডে) কুয়েরি শেষ করবে কোনো মেমোরি সর্ট ছাড়াই!",
      b: "দুটি পৃথক ইনডেক্স ফিল্টার ও সর্টের কাজ একসাথে দ্রুত করতে পারে না। (tenant_id, created_at DESC) দিয়ে একটি কম্পাউন্ড ইনডেক্স তৈরি করলেই কোনো সর্ট ওভারহেড ছাড়া কুয়েরি ৫ মিলিসেকেন্ডে চলবে।",
      e: "Two separate single-column indexes force the planner to pick one and perform an expensive in-memory sort or bitmap merge. Resolving this requires a compound index on (tenant_id, created_at DESC), delivering instant index-ordered retrieval.",
      code: "CREATE INDEX idx_orders_tenant_created ON orders (tenant_id, created_at DESC);"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: তোমার টিমের একটি কুয়েরি `WHERE phone LIKE '%01711%'` দিয়ে সার্চ করায় কোনো ইনডেক্স কাজ করছে না এবং ফুল টেবিল স্ক্যান হচ্ছে। কীভাবে এটিকে অপটিমাইজ করবে?",
      m: "সাধারণ B-Tree ইনডেক্স শুধুমাত্র প্রিফিক্স সার্চ (`LIKE '01711%'`) করতে পারে, কিন্তু লিডিং ওয়াইল্ডকার্ড (`'%01711%'`) থাকলে B-Tree সম্পূর্ণ অকেজো হয়ে যায়। সমাধান: PostgreSQL-এর `pg_trgm` (Trigram) এক্সটেনশন ইনস্টল করে একটি `GIN` ইনডেক্স তৈরি করতে হবে: `CREATE INDEX idx_phone_trgm ON users USING GIN (phone gin_trgm_ops);`। ট্রাইগ্রাম ইনডেক্স স্ট্রিংকে ৩ অক্ষরের সাবস্ট্রিংয়ে ভেঙে ফেলে, ফলে যেকোনো সাবস্ট্রিং বা ওয়াইল্ডকার্ড সার্চে এটি ফুল টেবিল স্ক্যান ছাড়াই মিলি-সেকেন্ডে ডেটা এনে দেয়।",
      b: "লিডিং ওয়াইল্ডকার্ডযুক্ত LIKE কুয়েরিতে B-Tree কাজ করে না। pg_trgm এক্সটেনশন চালু করে GIN ট্রাইগ্রাম ইনডেক্স তৈরি করলে সাবস্ট্রিং সার্চেও সুপারফাস্ট ইনডেক্স স্ক্যান পাওয়া যায়।",
      e: "Standard B-Tree indexes cannot service queries with leading wildcards (%query%). Install the pg_trgm extension and build a GIN trigram index on the column (gin_trgm_ops), accelerating wildcard substring and regex searches.",
      code: "CREATE EXTENSION IF NOT EXISTS pg_trgm;\nCREATE INDEX idx_users_phone_trgm ON users USING GIN (phone gin_trgm_ops);"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি MongoDB কালেকশনে `db.products.find({ category: 'shoes' }).sort({ price: -1 })` কুয়েরি চালানোর পর প্রোডাকশন লগে এরর এলো: `Sort exceeded memory limit of 33554432 bytes`। কারণ কী এবং স্থায়ী সমাধান কী?",
      m: "কারণ: মঙ্গোডিবির ইন-মেমোরি সর্টের সর্বোচ্চ হার্ড লিমিট হলো ৩২ মেগাবাইট (32MB)। যদি কুয়েরি ফিল্টারের রেজাল্ট ৩২MB-এর বেশি ডেটা রিটার্ন করে এবং সর্টিং ফিল্ডে কোনো ইনডেক্স না থাকে, তবে মঙ্গোডিবি মেমোরি এক্সিড এরর দিয়ে কুয়েরি ফেইল করায়। স্থায়ী সমাধান: ফিল্টার ও সর্ট ফিল্ডের ওপর একটি কম্পাউন্ড ইনডেক্স তৈরি করা: `db.products.createIndex({ category: 1, price: -1 })`। এতে ডেটা ইতিমধ্যে ইনডেক্সেই সাজানো থাকবে, ফলে মেমোরিতে কোনো সর্টিং অপারেশন ঘটবে না।",
      b: "মঙ্গোডিবির ইন-মেমোরি সর্ট লিমিট ৩২MB ছাড়িয়ে যাওয়ায় এই এরর এসেছে। (category: 1, price: -1) কম্পাউন্ড ইনডেক্স তৈরি করলে মেমোরি ছাড়াই সরাসরি ইনডেক্স থেকে সর্টেড ডেটা পাওয়া যাবে।",
      e: "MongoDB caps in-memory sorting at 32MB. If unindexed sort results exceed this buffer, the query aborts. Create a compound index on { category: 1, price: -1 } so documents are read pre-sorted directly off disk, bypassing in-memory sorting completely.",
      code: "db.products.createIndex({ category: 1, price: -1 });"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: ইনভয়েস টেবিলে কোটি কোটি রো আছে, কিন্তু প্রতিদিন শুধু অডিট করার জন্য এমন ইনভয়েস খোঁজা হয় যেগুলোর `is_audited = FALSE` (যা মোট ডেটার মাত্র ১%)। তুমি কীভাবে ইনডেক্স ডিজাইন করবে যাতে ডিস্ক খরচ সর্বনিম্ন থাকে?",
      m: "সমাধান: একটি Partial Index তৈরি করতে হবে: `CREATE INDEX idx_invoices_unaudited ON invoices (id, created_at) WHERE is_audited = FALSE;`। এর ফলে ৯৯% রো যেগুলো ইতিমধ্যে অডিট হয়ে গেছে, সেগুলো ইনডেক্স ট্রি থেকে বাদ থাকবে। ইনডেক্স সাইজ হবে মাত্র কয়েক মেগাবাইট, মেমোরি ক্যাশে স্থায়ীভাবে ফিট করবে এবং প্রতিদিনের নতুন অডিটেড রো ইনসার্ট/আপডেটে কোনো রাইট পারফরম্যান্স পেনাল্টি হবে না।",
      b: "WHERE is_audited = FALSE শর্তযুক্ত পার্শিয়াল ইনডেক্স তৈরি করব। এতে মোট ডেটার মাত্র ১% ইনডেক্সে থাকবে, ইনডেক্স সাইজ হবে অতিক্ষুদ্র এবং কুয়েরি হবে তাৎক্ষণিক।",
      e: "Build a Partial Index with a WHERE is_audited = FALSE predicate. By excluding the 99% audited rows, the index footprint stays micro-sized, saving gigabytes of disk and RAM while accelerating audit searches.",
      code: "CREATE INDEX idx_invoices_unaudited ON invoices (created_at)\nWHERE is_audited = FALSE;"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি হাই-ট্রাফিক সিস্টেমে ইনসার্ট ও আপডেটের স্পিড আশঙ্কাজনকভাবে কমে গেছে। ইনভেস্টিগেট করে দেখলে একই টেবিলে ১২টি ভিন্ন ভিন্ন ইনডেক্স তৈরি করা হয়েছে। তুমি কীভাবে এটি রিফ্যাক্টর করবে?",
      m: "পদক্ষেপসমূহ: (১) `pg_stat_user_indexes` ভিউ থেকে প্রতিটি ইনডেক্সের `idx_scan` কাউন্ট চেক করব—যেসব ইনডেক্সের স্ক্যান কাউন্ট ০ বা খুব কম, সেগুলো অপ্রয়োজনীয় হওয়ায় অবিলম্বে ড্রপ করব। (২) রিডানড্যান্ট ইনডেক্স খুঁজে বের করব (যেমন `(a)` ইনডেক্স এবং `(a, b)` ইনডেক্স উভয়ই থাকলে `(a)` ইনডেক্সটি ডুপ্লিকেট, কারণ `(a, b)` একাই `a`-এর কুয়েরি হ্যান্ডেল করতে পারে)। (৩) যেসব ইনডেক্স রাখা দরকার সেগুলোকে কনসোলিডেট করে ৩-৪টি স্মার্ট কম্পাউন্ড ইনডেক্সে রূপান্তর করব। ফলে রাইট থ্রুপুট моментаল ৩ গুণ বেড়ে যাবে।",
      b: "pg_stat_user_indexes দেখে অব্যবহৃত ইনডেক্স মুছে ফেলব, ডুপ্লিকেট প্রিফিক্স ইনডেক্সগুলো ড্রপ করব এবং প্রয়োজনীয়গুলোকে কম্পাউন্ড ইনডেক্সে রূপান্তর করে ইনডেক্স সংখ্যা ৪টিতে নামিয়ে আনব।",
      e: "Audit index utilization via pg_stat_user_indexes and eliminate indexes with zero or negligible scan counts. Drop redundant single-column indexes covered by existing compound leftmost prefixes. Consolidate into 3-4 optimized compound indexes to restore write throughput.",
      code: "SELECT indexrelname, idx_scan FROM pg_stat_user_indexes WHERE schemaname = 'public' ORDER BY idx_scan ASC;"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani POS): Dokani-তে হাজার হাজার দোকানের লাখ লাখ ইনভয়েসের মধ্যে ক্যাশিয়ার যখন বারকোড দিয়ে সার্চ করে, তখন কীভাবে সাব-৩ মিলিসেকেন্ড ল্যাটেন্সি নিশ্চিত করা হয়েছে?",
      m: "দোকানি পিওএসে কোটি কোটি প্রোডাক্ট থাকলেও প্রতিটি দোকানের ক্যাশিয়ার শুধু তার নিজস্ব দোকানের প্রোডাক্ট সার্চ করে। আমরা মাল্টি-টেন্যান্ট B-Tree ইনডেক্স ডিজাইন করেছি: `CREATE INDEX idx_products_tenant_barcode ON products (tenant_id, barcode);`। ক্যাশিয়ার যখন স্ক্যান করে, কুয়েরি যায় `WHERE tenant_id = $1 AND barcode = $2`। এর ফলে ডেটাবেজ মাত্র ৩টি B-Tree নোড জাম্প করে সরাসরি কাঙ্ক্ষিত প্রোডাক্টটির রো তুলে আনে। ডিস্ক আই/ও শূন্যের কোঠায় থাকায় হাজার হাজার কনকারেন্ট ক্যাশিয়ারের সার্চেও গড় ল্যাটেন্সি থাকে মাত্র ১.৮ মিলিসেকেন্ড!",
      b: "দোকানিতে (tenant_id, barcode) কম্পাউন্ড ইনডেক্স ব্যবহার করা হয়েছে। ফলে কোটি ডেটার মধ্যেও ডেটাবেজ সরাসরি নির্দিষ্ট দোকানের নির্দিষ্ট বারকোডে জাম্প করে ২ মিলিসেকেন্ডের নিচে প্রোডাক্ট খুঁজে দেয়।",
      e: "In Dokani POS, ultra-fast barcode lookup across multi-tenant inventories is powered by a compound index on (tenant_id, barcode). The database performs a direct point seek on tenant partition keys, maintaining sub-2ms response times under high concurrency.",
      code: "CREATE INDEX idx_products_tenant_barcode ON products (tenant_id, barcode);"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: PostgreSQL-এ `JSONB` কলামের ভিতরের নেস্টেড কী দ্রুত সার্চ করতে Dokani বা বড় SaaS সিস্টেমে কীভাবে ইনডেক্স অপটিমাইজ করা হয়?",
      m: "যদি JSONB কলামের সাইজ বড় হয় তবে সাধারণ `USING GIN (data)` ইনডেক্স অনেক মেমোরি নেয়। কিন্তু অ্যাপ্লিকেশনে যদি নির্দিষ্ট কোনো নেস্টেড ফিল্ড দিয়ে ফ্রিকোয়েন্টলি সার্চ করা হয় (যেমন `metadata->>'paymentGateway'`), তবে আমরা এক্সপ্রেশন B-Tree ইনডেক্স তৈরি করি: `CREATE INDEX idx_payments_gateway ON payments ((metadata->>'paymentGateway'));`। এটি GIN-এর চেয়ে ১০ গুণ ছোট সাইজের হয় এবং সাধারণ টেক্সট ইনডেক্সের মতোই দ্রুত `WHERE metadata->>'paymentGateway' = 'BKASH'` কুয়েরি এক্সিকিউট করে।",
      b: "JSONB-এর নির্দিষ্ট নেস্টেড ফিল্ড দ্রুত খুঁজতে এক্সপ্রেশন ইনডেক্স (metadata->>'key') তৈরি করা হয়। এটি পুরো JSONB-তে GIN ইনডেক্স দেওয়ার চেয়ে অনেক কম মেমোরি নেয় এবং দ্রুততম রেজাল্ট দেয়।",
      e: "Instead of indexing entire bloated JSONB documents with GIN, create a targeted B-Tree Expression Index on the exact extracted key path ((metadata->>'gateway')). This consumes a fraction of the RAM and accelerates point lookups.",
      code: "CREATE INDEX idx_orders_gateway ON orders ((metadata->>'gateway'));"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: ই-কমার্স বা মার্কেটপ্লেস সিস্টেমে একাধিক ফিল্টার (ক্যাটাগরি, ব্র্যান্ড, প্রাইস রেঞ্জ, রেটিং, ইন-স্টক) একসাথে কাজ করার জন্য কীভাবে ইনডেক্স স্ট্র্যাটেজি সাজাবে?",
      m: "সব কম্বিনেশনের জন্য আলাদা ইনডেক্স বানানো অসম্ভব কারণ কম্বিনেশন হতে পারে শত শত। আর্কিটেকচারাল সমাধান: (১) ক্যাটাগরি ও স্টকের মতো হাই-কার্ডিনালিটি ফিল্টার দিয়ে বেস কম্পাউন্ড ইনডেক্স তৈরি করা `(category_id, is_in_stock, price)`। (২) ডাইনামিক ফিল্টারিংয়ের জন্য PostgreSQL-এর একাধিক সিঙ্গেল-কলাম ইনডেক্স ওপেন রাখা, যাতে প্ল্যানার রানটাইমে `BitmapAnd` দিয়ে দুটি ইনডেক্সের বিটম্যাপ একত্র করে ফিল্টার করতে পারে। (৩) যদি সার্চ ফিল্টার আরও জটিল ও টেক্সট-বেসড হয়, তবে রিলেশনাল ডিবিতে প্রেশার না দিয়ে Elasticsearch বা Meilisearch দিয়ে সার্চ লেয়ার আলাদা করা।",
      b: "বেস ফিল্টারের জন্য কম্পাউন্ড ইনডেক্স রাখা হয় এবং অন্যান্য ফিল্টারে বিটম্যাপ স্ক্যান ব্যবহার করা হয়। আর অত্যন্ত জটিল বহু-মাত্রিক সার্চ ফিল্টারিংয়ের জন্য ডেটাবেজের বদলে মেইলিসার্চ বা ইলাস্টিকসার্চ ব্যবহার করা আদর্শ।",
      e: "For multi-faceted filtering, craft a primary compound index for high-selectivity predicates (category_id, is_in_stock, price), allowing the engine to leverage Bitmap Index Scans for secondary filters. For massive faceted catalogs, offload search workloads to Elasticsearch or Meilisearch.",
      tip: "মার্কেটপ্লেস সার্চে 'Bitmap Index Scan' এবং 'Dedicated search engines like Meilisearch' উল্লেখ করবে।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: প্রোডাকশন ডেটাবেজে জিরো-ডাউনটাইমে নতুন ইনডেক্স কীভাবে ক্রিয়েট করবে?",
      m: "সাধারণ `CREATE INDEX` কমান্ড টেবিলে `ShareLock` ফেলে, যার ফলে ইনডেক্স তৈরি চলাকালীন টেবিলে কোনো INSERT, UPDATE বা DELETE হতে পারে না—যা প্রোডাকশন সাইট ডাউন করার সমতুল্য। প্রোডাকশন স্ট্যান্ডার্ড: সবসময় `CREATE INDEX CONCURRENTLY` ব্যবহার করতে হবে। এটি ব্যাকগ্রাউন্ডে দুটি পাস (Two-pass scan) চালিয়ে কোনো রাইট ট্রানজ্যাকশন ব্লক না করে নিরাপদে ইনডেক্স তৈরি করে। কোনো কারণে ফেইল হলে এটি `INVALID` অবস্থায় থাকে, যা ক্লিন করে পুনরায় চালানো যায়।",
      b: "প্রোডাকশনে সবসময় CREATE INDEX CONCURRENTLY ব্যবহার করতে হয়। এটি কোনো টেবিল লক না করে ব্যাকগ্রাউন্ডে ইনডেক্স বিল্ড করে, ফলে সাইটে ইউজারদের কাজ বিন্দুমাত্র ব্যাহত হয় না।",
      e: "Standard CREATE INDEX applies a ShareLock, blocking all concurrent INSERT, UPDATE, and DELETE operations. Always execute CREATE INDEX CONCURRENTLY in production, which scans the table without taking exclusive locks.",
      code: "CREATE INDEX CONCURRENTLY idx_users_active_email ON users (email) WHERE is_active = TRUE;"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: স্লো কুয়েরি মনিটরিং ও অটোমেটেড অ্যালার্টিং পাইপলাইন কীভাবে সেটআপ করবে?",
      m: "প্রোডাকশন ডেটাবেজে `log_min_duration_statement = 200` সেট করি, যাতে ২০০ মিলিসেকেন্ডের বেশি সময় নেওয়া যেকোনো কুয়েরি স্বয়ংক্রিয়ভাবে সার্ভার লগে রেকর্ড হয়। এরপর Datadog, Grafana বা pganalyze এজেন্ট দিয়ে এই লগ ও `pg_stat_statements` স্ক্র্যাপ করি। যদি কোনো কুয়েরির গড় সময় ৫০০ms অতিক্রম করে বা ডিস্ক আই/ও স্পাইক করে, তবে অটোমেটেড পেজারডিউটি বা স্ল্যাক অ্যালার্ট ফায়ার করে। টিম সাথে সাথে কুয়েরি প্ল্যান অডিট করে প্রয়োজনীয় ইনডেক্স বা কুয়েরি রিরাইট সম্পন্ন করে।",
      b: "log_min_duration_statement প্যারামিটার দিয়ে ২০০ মিলি-সেকেন্ডের বেশি সময় নেওয়া কুয়েরি লগ করা হয়। গ্রাফানা বা পিজি-অ্যানালাইজ দিয়ে এগুলো ট্র্যাক করে স্লো কুয়েরি ধরা পড়লেই স্ল্যাকে স্বয়ংক্রিয় অ্যালার্ট পাঠানো হয়।",
      e: "Configure log_min_duration_statement = 200 to capture any query exceeding 200ms in PostgreSQL server logs. Ingest telemetry into Datadog or pganalyze to track p99 latencies, auto-triggering Slack alerts whenever slow queries spike hardware I/O.",
      code: "-- postgresql.conf:\nlog_min_duration_statement = 200\nshared_preload_libraries = 'pg_stat_statements'"
    }
  ]
};
