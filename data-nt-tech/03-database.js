// NT Tech Innovation — 03. Database Engineering Mastery
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.database = {
  id: "database",
  title: "Database Engineering",
  badge: "PostgreSQL · MongoDB · Prisma · Optimization",
  icon: "🗄️",
  topics: [
    {
      id: "postgres-relational",
      name: "PostgreSQL & Relational Schema Design",
      desc: "Relational Modeling, 1:1 / 1:N / N:M Relationships, Primary & Foreign Keys, Check Constraints, Normalization",
      items: [
        {
          lvl: "lvl1",
          q: "Relational Database-এ Primary Key এবং Foreign Key-এর ভূমিকা কী এবং Referential Integrity কীভাবে রক্ষা পায়?",
          m: "Primary Key (PK) হলো একটি টেবিলের প্রতিটি রো বা রেকর্ডকে ইউনিকভাবে চিহ্নিত করার প্রধান কলাম (যেমন UUID বা অটো-ইনক্রিমেন্ট আইডি), যা কখনো NULL বা ডুপ্লিকেট হতে পারে না। আর Foreign Key (FK) হলো এমন একটি কলাম যা অন্য একটি টেবিলের প্রাইমারি কি-কে পয়েন্ট করে টেবিল দুটির মাঝে সম্পর্ক স্থাপন করে। এর ফলে ডাটাবেজে Referential Integrity বজায় থাকে—অর্থাৎ প্যারেন্ট টেবিলে ইউজার না থাকলে চাইল্ড টেবিলে তার নামে অর্ডার তৈরি হতে পারে না, এবং প্যারেন্ট ডিলিট হলে `ON DELETE CASCADE` বা `RESTRICT` দিয়ে ডাটা অনাথ (Orphan) হওয়া ঠেকানো যায়।",
          b: "প্রাইমারি কি প্রতিটি রেকর্ডকে স্বতন্ত্রভাবে শনাক্ত করে এবং এতে কোনো ডুপ্লিকেট বা নাল মান গ্রহণযোগ্য নয়। ফরেন কি এক টেবিলের সাথে অন্য টেবিলের সম্পর্ক তৈরি করে। রেফারেন্সিয়াল ইন্টিগ্রিটির কারণে ফরেন কি নিশ্চিত করে যে চাইল্ড টেবিলে এমন কোনো রেফারেন্স থাকতে পারবে না যার মূল অস্তিত্ব প্যারেন্ট টেবিলে নেই।",
          e: "A Primary Key uniquely identifies each row within a table and strictly disallows null or duplicate entries. A Foreign Key references the Primary Key of another table, establishing relational integrity. This enforces referential integrity constraints (like ON DELETE RESTRICT or CASCADE), preventing orphan records and guaranteeing data consistency.",
          code: "CREATE TABLE customers (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  name VARCHAR(100) NOT NULL\n);\n\nCREATE TABLE invoices (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  customer_id UUID REFERENCES customers(id) ON DELETE RESTRICT,\n  total_amount NUMERIC(12,2) NOT NULL\n);"
        },
        {
          lvl: "lvl2",
          q: "ডাটাবেজ ডিজাইনে Normalization (1NF, 2NF, 3NF) কেন প্রয়োজন এবং হাই-থ্রুপুট সিস্টেমে কখন Denormalization করা বুদ্ধিমানের কাজ?",
          m: "Normalization ডাটাবেজ থেকে ডাটা ডুপ্লিকেশন ও অ্যানোমালি (Insert, Update, Delete Anomaly) দূর করতে টেবিলকে ছোট ছোট লজিক্যাল মডিউলে ভাগ করে। যেমন 3NF নিশ্চিত করে নন-কি কলামগুলো একে অপরের ওপর নির্ভরশীল নয়। কিন্তু বিশাল ট্রাফিক ও ঘন ঘন জটিল JOIN কোয়েরি চলার ক্ষেত্রে নরমালাইজেশন পারফরম্যান্স স্লো করে দেয়। তাই হাই-থ্রুপুট সিস্টেমে ঘন ঘন পড়া হয় এমন হিসেবি ডাটা (যেমন: ইনভয়েস টেবিলে কাস্টমারের নাম, অথবা অর্ডারে টোটাল আইটেম কাউন্ট) ডিনরমালাইজড আকারে সেভ করে রাখা হয় যাতে ভারী JOIN ছাড়াই সিঙ্গেল কুয়েরিতে ডাটা পাওয়া যায়।",
          b: "নরমালাইজেশনের মূল উদ্দেশ্য হলো ডেটা ডুপ্লিকেশন কমানো এবং ডেটার অসঙ্গতি দূর করা। তবে অতিরিক্ত জয়েন কোয়েরি এড়াতে এবং পড়ার গতি বহুগুণ বাড়াতে আমরা প্রোডাকশনে সচেতনভাবে ডিনরমালাইজেশন করি, যেখানে কিছু ডেটা ডুপ্লিকেট রেখে একক কুয়েরিতে দ্রুত রেসপন্স পাওয়া যায়।",
          e: "Database normalization (up to 3NF) eliminates redundant data and prevents insertion/update anomalies by splitting entities into relational tables. However, extensive multi-table JOINs degrade performance in high-read architectures. Denormalization deliberately stores computed or redundant attributes (such as caching customer name or item totals on invoice records) to eliminate JOIN latency.",
          tip: "ইন্টারভিউতে 'Read-Heavy System vs Write-Heavy System'-এর পরিপ্রেক্ষিতে ডিনরমালাইজেশনের যৌক্তিকতা তুলে ধরবে।"
        },
        {
          lvl: "lvl3",
          q: "PostgreSQL-এ UUID vs BigInt Auto-increment Primary Key: প্রোডাকশনে ডিস্ট্রিবিউটেড স্কেলিং ও ইনডেক্স ফ্র্যাগমেন্টেশনে কোনটি বেছে নেবে?",
          m: "BigInt Auto-increment মাত্র ৮ বাইট জায়গা নেয় এবং সিকোয়েন্সিয়াল হওয়ার কারণে B-Tree ইনডেক্সে পেজ স্প্লিট হয় না—যা কুয়েরি ও ইনসার্ট স্পিডের জন্য সুপার ফাস্ট। কিন্তু সমস্যা হলো: (১) এপিআই ইউআরএলে আইডি দেখে কাস্টমার বুঝতে পারে মোট কতটি সেল হয়েছে (`/orders/542`), (২) মাল্টি-সার্ভার ডিস্ট্রিবিউটেড ডাটাবেজে আইডি ক্ল্যাশ হয়। অন্যদিকে UUIDv4 কমপ্লিটলি ইউনিক ও সিকিউর হলেও এটি ১৬ বাইট নেয় এবং র‍্যান্ডম হওয়ার কারণে B-Tree ইনডেক্স ফ্র্যাগমেন্টেশন ঘটায়। আধুনিক প্রোডাকশনে সেরা সমাধান হলো **UUIDv7**—যা টাইমস্ট্যাম্প-অর্ডার্ড, সিকোয়েন্সিয়াল এবং একই সাথে গ্লোবালি ইউনিক!",
          b: "বিগইন্ট অটো-ইনক্রিমেন্ট হালকা ও ইনডেক্সিংয়ে দ্রুত হলেও ডিস্ট্রিবিউটেড সিস্টেমে কনফ্লিক্ট তৈরি করে এবং সিকিউরিটি রিস্ক থাকে। সাধারণ র‍্যান্ডম UUIDv4 ইনডেক্সকে স্লো করে দেয়। তাই আধুনিক ডাটাবেজে UUIDv7 ব্যবহার করা সর্বোত্তম, কারণ এটি সময় অনুসারে সিকোয়েন্সিয়াল থাকে এবং বিশ্বব্যাপী সম্পূর্ণ ইউনিক।",
          e: "BigInt auto-increment provides sequential 8-byte integers with tight B-Tree clustering and minimal page splits, but leaks business volume via sequential URLs and creates collision nightmares in distributed shards. Standard random UUIDv4 (16 bytes) prevents enumeration but causes heavy index fragmentation. The modern gold standard is UUIDv7, which merges time-ordered sorting with global uniqueness.",
          code: "-- In PostgreSQL with pgcrypto / uuid extensions\n-- Modern time-ordered UUIDv7 provides sequential B-tree locality"
        },
        {
          lvl: "situation",
          q: "একটি ই-কমার্স অ্যাপ্লিকেশনে ক্যাটাগরি এবং প্রোডাক্টের মধ্যে N:M (Many-to-Many) সম্পর্ক রয়েছে। কীভাবে জাংশন টেবিল ও ইনডেক্সিং ডিজাইন করবে যাতে লক্ষাধিক প্রোডাক্টে ফিল্টারিং ফাস্ট হয়?",
          m: "Many-to-Many সম্পর্কের জন্য আমরা একটি জাংশন টেবিল `product_categories` তৈরি করব। এখানে দুটি ফরেন কি থাকবে: `product_id` এবং `category_id`। পারফরম্যান্সের জন্য: (১) এই দুটি কলামের ওপর Composite Primary Key `PRIMARY KEY (product_id, category_id)` দেব। (২) ক্যাটাগরি ধরে প্রোডাক্ট খুঁজতে রিভার্স ইনডেক্স `CREATE INDEX idx_category_product ON product_categories(category_id, product_id)` তৈরি করব। এই দুটি ইনডেক্স থাকলে কোটি রেকর্ডেও ইনডেক্স-অনলি স্ক্যান (Index-Only Scan) দিয়ে মিলিসেকেন্ডে রেজাল্ট আসবে।",
          b: "ম্যানি-টু-ম্যানি সম্পর্কের ক্ষেত্রে জাংশন টেবিলে কম্পোজিট প্রাইমারি কি ব্যবহার করা হয়। একদিক থেকে প্রোডাক্টের সব ক্যাটাগরি এবং বিপরীত দিক থেকে ক্যাটাগরির সব প্রোডাক্ট দ্রুত ফেচ করতে উভয় ফরেন কি-এর উপর কম্পোজিট ইনডেক্স তৈরি নিশ্চিত করতে হবে।",
          e: "For Many-to-Many relationships, create a dedicated junction table product_categories. Establish a composite primary key on (product_id, category_id) and build a reverse composite index on (category_id, product_id). This provides covering index capabilities for bi-directional queries, achieving sub-millisecond execution even with millions of rows.",
          code: "CREATE TABLE product_categories (\n  product_id UUID REFERENCES products(id) ON DELETE CASCADE,\n  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,\n  PRIMARY KEY (product_id, category_id)\n);\nCREATE INDEX idx_cat_prod ON product_categories(category_id, product_id);"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এ কাস্টমার লেজার এবং ইনভয়েসের জন্য PostgreSQL স্কিমা ডিজাইনে ব্যালেন্স অখণ্ডতা (Financial Ledger Balance Integrity) কীভাবে নিশ্চিত করেছিলে?",
          m: "Dokani-তে কাস্টমারের বকেয়া (Due) বা বাকি টাকা ট্র্যাক করার জন্য আমরা কখনো কাস্টমার টেবিলে শুধু একটা স্ট্যাটিক `dueBalance` ফিল্ড রেখে ম্যানুয়াল প্লাস-মাইনাস করিনি, কারণ নেটওয়ার্ক ফেইল বা এররে ব্যালেন্স করাপ্ট হতে পারে। আমরা **Double-Entry Ledger Pattern** অনুসরণ করেছি: `customer_ledgers` টেবিলে প্রতিটি লেনদেনের জন্য আলাদা রো তৈরি হতো (ইনভয়েস ক্রিয়েটে Debit, পেমেন্টে Credit)। বর্তমান বকেয়া জানার জন্য লেজার টেবিলের ডেবিট ও ক্রেডিটের ডিফারেন্স যোগ করে কাস্টমার টেবিলে ক্যাশড ভ্যালুর সাথে মিলিয়ে নেওয়া হতো এবং ডাটাবেজ লেভেলে `CHECK (due_amount >= 0)` কনস্ট্রেইন্ট দেওয়া হয়েছিল যাতে ভুল করেও মাইনাস ডিউ না হতে পারে।",
          b: "দোকানি পিওএস সিস্টেমে কাস্টমার বকেয়ার হিসাব নির্ভুল রাখতে আমরা লেজার বুক আর্কিটেকচার মেনে চলি। প্রতিটি বিক্রি এবং পেমেন্ট আলাদা লেজার এন্ট্রি হিসেবে জমা হয়। ডাটাবেজ চেক কনস্ট্রেইন্ট ব্যবহার করে নিশ্চিত করা হয় যে কোনো অ্যাকাউন্টে অসঙ্গতিপূর্ণ ডেটা যাতে কোনোভাবেই সংরক্ষিত হতে না পারে।",
          e: "In Dokani POS, customer due accounts were architected using an immutable ledger journal rather than mutably overwriting a single balance column. Every credit purchase added a DEBIT entry and every cash repayment added a CREDIT entry. The active due balance was mathematically derived from ledger reconciliations, enforced with SQL CHECK constraints to prevent corrupt negative ledger states.",
          tip: "আর্থিক ও একাউন্টিং সফটওয়্যারে 'Immutable Ledger Pattern'-এর উল্লেখ ইন্টারভিউয়ারদের সর্বোচ্চ আস্থা এনে দেয়।"
        }
      ]
    },
    {
      id: "prisma-orm",
      name: "Prisma ORM & Migration Strategies",
      desc: "Prisma Schema Modeling, Explicit vs Implicit Relations, prisma migrate, $transaction, $queryRaw, Connection Pooling",
      items: [
        {
          lvl: "lvl1",
          q: "Prisma ORM-এ `prisma migrate dev` এবং `prisma migrate deploy`-এর মধ্যে পার্থক্য কী? প্রোডাকশনে কোনটি চালাবে?",
          m: "`prisma migrate dev` শুধুমাত্র লোকাল ডেভেলপমেন্ট এনভায়রনমেন্টের জন্য। এটি স্কিমা ফাইলের পরিবর্তনের ওপর ভিত্তি করে নতুন মাইগ্রেশন SQL ফাইল তৈরি করে, লোকাল ডাটাবেজে অ্যাপ্লাই করে এবং স্বয়ংক্রিয়ভাবে `prisma generate` চালিয়ে টাইপস্ক্রিপ্ট ক্লায়েন্ট আপডেট করে। কখনো ড্রিফট পেলে এটি ডাটাবেজ রিসেট করতে পারে। কিন্তু **প্রোডাকশনে অবশ্যই `prisma migrate deploy` চালাতে হবে**! এটি কখনোই কোনো নতুন মাইগ্রেশন তৈরি করে না বা ডাটা রিসেট করে না—বরং পূর্বের কমিট করা পেন্ডিং মাইগ্রেশন ফাইলগুলোকে প্রোডাকশন ডাটাবেজে নিরাপদে এক্সিকিউট করে।",
          b: "prisma migrate dev লোকাল কম্পিউটারে নতুন মাইগ্রেশন ফাইল বানানোর জন্য ব্যবহৃত হয় এবং প্রয়োজনে লোকাল ডাটাবেজ রিসেট করে। তবে প্রোডাকশন সার্ভারে বা সিআই/সিডি পাইপলাইনে শুধুমাত্র prisma migrate deploy চালাতে হয়, যা কোনো ডেটা না মুছে নিরাপদে পেন্ডিং মাইগ্রেশনগুলো সম্পন্ন করে।",
          e: "prisma migrate dev is strictly for local development; it detects schema diffs, generates new SQL migration files, applies them, and triggers prisma generate, occasionally prompting for DB resets. In production, prisma migrate deploy must be used exclusively; it only executes unapplied, version-controlled migration files against the database without altering existing data or generating code.",
          code: "// In Production CI/CD\nnpx prisma migrate deploy\nnpx prisma generate"
        },
        {
          lvl: "lvl2",
          q: "Prisma-তে Relations কীভাবে কাজ করে? One-to-Many এবং Many-to-Many সম্পর্কের ক্ষেত্রে `@relation` সিনট্যাক্স ব্যাখ্যা করো।",
          m: "Prisma-তে মডেলের মাঝে সম্পর্ক ডিক্লেয়ার করার জন্য ফিল্ডের পাশে টার্গেট মডেলের নাম লিখতে হয় এবং ফরেন কি নির্দেশ করতে `@relation` এট্রিবিউট বসে। One-to-Many সম্পর্কে চাইল্ড মডেলে `fields: [customerId], references: [id]` দিয়ে সম্পর্ক ম্যাপিং হয়। আর Many-to-Many সম্পর্কের ক্ষেত্রে Prisma দুটি অপশন দেয়: (১) Implicit: Prisma নিজেই ব্যাকগ্রাউন্ডে একটি হিডেন জাংশন টেবিল ম্যানেজ করে। (২) Explicit: যেখানে আমরা কাস্টম জাংশন মডেল তৈরি করি (যেমন `OrderItem` যেখানে `quantity`, `price` ইত্যাদি অতিরিক্ত কলাম যোগ করা যায়)। প্রোডাকশনে এক্সপ্লিসিট রিলেশনশিপ সবচেয়ে নিরাপদ ও ফ্লেক্সিবল।",
          b: "প্রিজমাতে সম্পর্কের জন্য @relation ব্যবহার করা হয় যেখানে fields ও references দিয়ে ফরেন কি নির্দেশ করা থাকে। ওয়ান-টু-ম্যানি মডেলে প্যারেন্ট মডেলে চাইল্ডের অ্যারে থাকে এবং চাইল্ডে প্যারেন্টের রেফারেন্স থাকে। অতিরিক্ত ডেটা সংরক্ষণের জন্য প্রোডাকশনে এক্সপ্লিসিট ম্যানি-টু-ম্যানি মডেল ব্যবহার করা উত্তম।",
          e: "Prisma establishes relational graphs using model types and the @relation directive specifying fields and references. In 1:N relations, the child model holds the scalar foreign key and relation attribute. For N:M relations, Prisma supports implicit relations or explicit pivot models. Explicit models are preferred in enterprise architectures because they permit storing contextual metadata (e.g., unit price, timestamps) on the pivot.",
          code: "model Customer {\n  id       String    @id @default(uuid())\n  invoices Invoice[]\n}\n\nmodel Invoice {\n  id         String   @id @default(uuid())\n  customerId String\n  customer   Customer @relation(fields: [customerId], references: [id], onDelete: Restrict)\n}"
        },
        {
          lvl: "lvl3",
          q: "Prisma-তে জটিল কুয়েরির ক্ষেত্রে N+1 Problem কীভাবে ঘটে এবং Prisma Client কীভাবে এটি ইন্টারনালি সমাধান করে?",
          m: "N+1 সমস্যা হলো: প্যারেন্ট টেবিল থেকে ১০০টি রো আনার জন্য ১টি কুয়েরি চলল, এরপর প্রতিটি প্যারেন্টের চাইল্ড রিলেশন আনার জন্য লুপের ভেতর আরও ১০০টি আলাদা ডাটাবেজ কুয়েরি চলল (মোট ১০১টি কুয়েরি)। সাধারণ ওআরএমে এটি ডাটাবেজ ডাউন করে দেয়। Prisma এই সমস্যা সমাধান করে এর 'Data Loader' ব্যাচিং অ্যালগরিদমের মাধ্যমে। যখন আমরা `include: { items: true }` দিই, Prisma ১০০টি আলাদা কুয়েরি না চালিয়ে মাত্র ২টি কুয়েরি চালায়: একটি প্যারেন্টের জন্য এবং দ্বিতীয়টি `WHERE parent_id IN (...)` দিয়ে সবগুলো চাইল্ডকে একক কুয়েরিতে মেমোরিতে এনে জোড়া লাগিয়ে দেয়।",
          b: "এন প্লাস ওয়ান সমস্যায় প্যারেন্ট ডাটার প্রতি রেকর্ডের জন্য আলাদা করে ডাটাবেজ কুয়েরি কল হওয়ায় সিস্টেম স্লো হয়ে যায়। প্রিজমা এর সমাধান করে ইনক্লুড ক্লজের মাধ্যমে। এটি ব্যাকগ্রাউন্ডে দুটি কুয়েরি চালিয়ে SQL IN অপারেটর দিয়ে একবারে সব চাইল্ড রেকর্ড সংগ্রহ করে এবং মেমোরিতে ম্যাপ করে দেয়।",
          e: "The N+1 problem occurs when querying a parent collection triggers N individual subsequent database queries for its related children. Prisma eliminates this through automated batching: when using 'include', Prisma executes exactly 2 optimized SQL queries—one for the parent set and one for all children via 'WHERE parent_id IN (...)', resolving relationships in-memory with zero redundant roundtrips.",
          code: "const orders = await prisma.order.findMany({\n  include: { items: true } // Runs only 2 queries under the hood\n});"
        },
        {
          lvl: "situation",
          q: "Prisma-র মাধ্যমে একটি বিশাল অ্যানালিটিক্স রিপোর্ট চালাতে গিয়ে মেমোরি আউট হচ্ছে এবং কুয়েরি খুব স্লো হচ্ছে। কীভাবে এটি অপটিমাইজ করবে?",
          m: "Prisma Client অবজেক্ট হাইড্রেশন এবং টাইপ রূপান্তরের জন্য প্রচুর র‍্যাম খরচ করে। সমাধান: (১) অপ্রয়োজনীয় সমস্ত ফিল্ড বাদ দিয়ে শুধুমাত্র প্রয়োজনীয় কলাম `select: { id: true, total: true }` দিয়ে তুলে আনা। (২) কোটি রো-এর ক্ষেত্রে Prisma Client-এর পরিবর্তে `prisma.$queryRaw` ব্যবহার করে সরাসরি অপটিমাইজড PostgreSQL উইন্ডো ফাংশন ও এগ্রিগেশন চালানো। (৩) ইউআই বা এক্সপোর্টের জন্য পুরো ডাটা একবারে না এনে Cursor-Based Pagination বা স্ট্রিম ব্যবহার করা।",
          b: "বড় রিপোর্টের জন্য প্রিজমা থেকে সব কলাম না এনে শুধু প্রয়োজনীয় ফিল্ড সিলেক্ট করতে হবে। খুব জটিল হিসাব বা বিশাল ডাটা সেটের ক্ষেত্রে prisma.$queryRaw দিয়ে সরাসরি কাঁচা এসকিউএল কুয়েরি চালালে মেমোরি খরচ ৯০% কমে যায় এবং কুয়েরি বিদ্যুৎ গতিতে রান করে।",
          e: "Prisma Client incurs memory overhead when hydrating huge recordsets into TypeScript objects. To optimize heavy analytics, use sparse fieldsets via 'select' rather than loading entire models. For high-volume aggregations, bypass ORM hydration by executing raw parameterized SQL via prisma.$queryRaw, leveraging PostgreSQL window functions directly.",
          code: "const summary = await prisma.$queryRaw`\n  SELECT DATE_TRUNC('month', created_at) as month, SUM(total_amount) as revenue\n  FROM invoices\n  WHERE tenant_id = ${tenantId}\n  GROUP BY month ORDER BY month DESC\n`;"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এ Prisma ORM দিয়ে সেলস বিলিং ও স্টক আপডেটের সময় কীভাবে কনকারেন্ট ট্রানজেকশন পরিচালনা করেছিলে?",
          m: "Dokani-তে যখন সেলস কনফার্ম হয়, আমাদের একই সাথে: ইনভয়েস তৈরি করতে হয়, একাধিক ইনভয়েস আইটেম সেভ করতে হয়, প্রোডাক্টের স্টক মাইনাস করতে হয় এবং কাস্টমারের লেজার আপডেট করতে হয়। আমি এটি **`prisma.$transaction(async (tx) => { ... })`** ইন্টারেক্টিভ ট্রানজেকশনে র‍্যাপ করেছিলাম। যদি স্টক মাইনাস করতে গিয়ে দেখা যায় স্টক শূন্য বা কম, তবে `throw new Error('স্টক শেষ')` থ্রো করলে পুরো ইনভয়েস ক্রিয়েশন স্বয়ংক্রিয়ভাবে রোলব্যাক হয়ে যেত—ডাটাবেজে কোনো অসম্পূর্ণ ডাটা জমতে পারত না।",
          b: "দোকানি সিস্টেমে বিক্রি সম্পন্ন ও স্টক পরিবর্তনের কাজটি প্রিজমা ইন্টারঅ্যাক্টিভ ট্রানজেকশনের মধ্যে সম্পন্ন করা হয়েছিল। ফলে ইনভয়েস তৈরি ও স্টক কমার যে কোনো একটি ধাপে সমস্যা দেখা দিলে পুরো প্রক্রিয়াটি রোলব্যাক হতো এবং তথ্যের শতভাগ সঠিকতা বজায় থাকত।",
          e: "In Dokani POS checkout workflows, multiple dependent operations had to succeed atomically. I encapsulated the sequence inside prisma.$transaction. The callback created the invoice, bulk-inserted line items, decremented warehouse stock, and posted ledger entries. If any constraint failed, the entire transaction rolled back cleanly with zero dirty state.",
          tip: "Prisma Interactive Transactions ব্যবহার করার অভিজ্ঞতা যে কোনো এন্টারপ্রাইজ প্রজেক্টে হাইলি ভ্যালুড।"
        }
      ]
    },
    {
      id: "indexing-query-opt",
      name: "Indexing Strategies & Query Optimization",
      desc: "B-Tree vs Hash vs GIN, EXPLAIN ANALYZE, Sequential Scan Elimination, Composite Indexes, Partial Indexes",
      items: [
        {
          lvl: "lvl1",
          q: "Database Indexing কী এবং কেন এটি ডাটাবেজ সার্চকে দ্রুত করে? ইনডেক্সের নেতিবাচক প্রভাব কী?",
          m: "Indexing হলো ডাটাবেজ টেবিলের নির্দিষ্ট কলামের ওপর তৈরি করা একটি বিশেষ সাজানো ডাটা স্ট্রাকচার (প্রধানত B-Tree), যা বইয়ের পেছনের নির্ঘন্ট বা সূচিপত্রের মতো কাজ করে। ইনডেক্স না থাকলে ডাটাবেজকে টেবিলের প্রথম থেকে শেষ পর্যন্ত প্রতিটি রো চেক করতে হয় (Sequential Scan বা $O(N)$)। ইনডেক্স থাকলে বাইনারি সার্চের মতো $O(\\log N)$ টাইমে সরাসরি কাঙ্ক্ষিত রো খুঁজে পাওয়া যায়। নেতিবাচক দিক: ইনডেক্স হার্ডডিস্ক ও র‍্যামে অতিরিক্ত মেমোরি নেয় এবং প্রতিবার INSERT, UPDATE ও DELETE করার সময় ইনডেক্স ট্রি রি-ব্যালেন্স করতে হয় বলে লেখার গতি কমে যায়।",
          b: "ইনডেক্সিং হলো ডেটাবেজের বিশেষ ডেটা স্ট্রাকচার যা পুরো টেবিল স্ক্যান না করে দ্রুত কাঙ্ক্ষিত তথ্য খুঁজে পেতে সাহায্য করে। এটি পড়ার গতি বহুগুণ বাড়ালেও অতিরিক্ত ইনডেক্স ব্যবহারে লেখার গতি কমে যায় এবং ডিস্কে অতিরিক্ত জায়গা প্রয়োজন হয়।",
          e: "A database index is an auxiliary data structure (typically a balanced B-Tree) maintaining sorted pointers to table rows. Without indexes, queries perform full Sequential Scans (O(N)). With indexes, lookups drop to logarithmic time (O(log N)). The trade-off is added storage overhead and degraded INSERT/UPDATE/DELETE throughput due to index tree re-balancing.",
          code: "CREATE INDEX idx_customers_phone ON customers(phone);"
        },
        {
          lvl: "lvl2",
          q: "PostgreSQL-এ `EXPLAIN ANALYZE` কমান্ড কীভাবে পড়তে হয় এবং Sequential Scan বনাম Index Scan কীভাবে চিহ্নিত করবে?",
          m: "`EXPLAIN` কুয়েরির এক্সিকিউশন প্ল্যান দেখায় এবং `EXPLAIN ANALYZE` আসলে কুয়েরিটি ডাটাবেজে রান করিয়ে তার বাস্তব সময় (Actual Time) ও মেমোরি খরচ প্রদর্শন করে। প্ল্যানে যদি দেখা যায় `Seq Scan on invoices (cost=... rows=... actual time=...)`, তার মানে কোনো ইনডেক্স ব্যবহার হয়নি এবং পুরো টেবিল স্ক্যান হয়েছে। আর যদি দেখা যায় `Index Scan` বা `Bitmap Index Scan using idx_invoices_date`, তার মানে অপটিমাইজড ইনডেক্স কাজ করেছে। আমাদের লক্ষ্য থাকে কুয়েরির 'cost' এবং 'actual time' সর্বনিম্ন রাখা।",
          b: "EXPLAIN ANALYZE দিয়ে কুয়েরি ডাটাবেজে চালিয়ে তার বাস্তব সময় ও এক্সিকিউশন প্ল্যান দেখা যায়। সিকুয়েনশিয়াল স্ক্যান দেখালে বুঝতে হবে ইনডেক্স নেই এবং কুয়েরি স্লো। ইনডেক্স স্ক্যান দেখলে নিশ্চিত হওয়া যায় যে ইনডেক্স সঠিকভাবে কুয়েরির সময় কমিয়ে এনেছে।",
          e: "EXPLAIN outputs the planner's cost estimations, while EXPLAIN ANALYZE actually executes the statement to report actual millisecond execution times, loop counts, and memory buffers. Spotting a 'Seq Scan' on high-volume tables indicates missing indexes, whereas 'Index Scan' or 'Bitmap Index Scan' proves index utilization. Optimization focuses on minimizing total planning and execution duration.",
          code: "EXPLAIN ANALYZE\nSELECT * FROM invoices WHERE customer_phone = '01711000000';"
        },
        {
          lvl: "lvl3",
          q: "B-Tree, GIN (Generalized Inverted Index) এবং Partial Index-এর মধ্যে পার্থক্য কী এবং কখন কোনটি ব্যবহার করবে?",
          m: "(১) **B-Tree:** ডিফল্ট ইনডেক্স, যা `=`, `<`, `>`, `<=`, `>=`, এবং `BETWEEN` তুলনা করার জন্য পারফেক্ট (যেমন আইডি, তারিখ, প্রাইস)। (২) **GIN Index:** ব্যবহৃত হয় যখন একটি কলামের ভেতর একাধিক উপাদান থাকে—যেমন PostgreSQL `JSONB` কলাম, অ্যারে (`VARCHAR[]`), অথবা ফুল-টেক্সট সার্চ (`tsvector`)। (৩) **Partial Index:** সম্পূর্ণ টেবিল ইনডেক্স না করে কেবল নির্দিষ্ট শর্তযুক্ত রো ইনডেক্স করা (যেমন `CREATE INDEX idx_active_users ON users(email) WHERE status = 'ACTIVE'`)। এটি ডিস্কে ইনডেক্স সাইজ ৭০% পর্যন্ত ছোট রাখে এবং রাইট পারফরম্যান্স বাড়ায়।",
          b: "বি-ট্রি সাধারণ সংখ্যা ও টেক্সট খোঁজার জন্য ব্যবহৃত হয়। জিন (GIN) ইনডেক্স ব্যবহৃত হয় জেসন (JSONB) ডাটা বা অ্যারে ফিল্ডের ভেতরে দ্রুত অনুসন্ধানের জন্য। পার্শিয়াল ইনডেক্স পুরো টেবিল ইনডেক্স না করে কেবল সক্রিয় বা নির্দিষ্ট শর্তের ডেটা ইনডেক্স করে ডিস্ক স্পেস বাঁচায়।",
          e: "B-Tree indexes excel at scalar comparisons (=, <, >, BETWEEN) for IDs and timestamps. GIN (Generalized Inverted Index) indexes multi-element composite attributes such as PostgreSQL JSONB documents, arrays, and full-text search vectors. Partial Indexes index only a subset of table rows satisfying a WHERE predicate (e.g., WHERE deleted_at IS NULL), cutting index size and write overhead significantly.",
          code: "-- GIN on JSONB\nCREATE INDEX idx_products_metadata ON products USING GIN (metadata);\n-- Partial Index\nCREATE INDEX idx_unpaid_invoices ON invoices (customer_id) WHERE status = 'UNPAID';"
        },
        {
          lvl: "situation",
          q: "তোমার প্রোডাকশন ডাটাবেজে একটি রিপোর্ট কুয়েরি `WHERE tenant_id = 'x' AND created_at >= '2026-01-01' ORDER BY created_at DESC` চলতে ১০ সেকেন্ড সময় নিচ্ছে। কীভাবে কম্পোজিট ইনডেক্স তৈরি করবে?",
          m: "এখানে দুটি আলাদা সিঙ্গেল কলাম ইনডেক্স বসালে ডাটাবেজকে বিটম্যাপ মার্জ করতে হয় যা স্লো। আমাদের একটি **Composite Index (মাল্টি-কলাম ইনডেক্স)** বানাতে হবে। ইনডেক্সের কলামের ক্রম (Column Order) খুবই গুরুত্বপূর্ণ: সমতা (`=`) শর্তের কলাম আগে আসবে, এবং রেঞ্জ/সর্ট (`>=`, `ORDER BY`) কলাম পরে আসবে। সুতরাং সঠিক ইনডেক্স হবে: `CREATE INDEX idx_tenant_created ON invoices (tenant_id, created_at DESC)`. এই একক ইনডেক্স দিয়ে ফিল্টারিং এবং সর্টিং একসাথে ইনডেক্স থেকেই শেষ হবে—কুয়েরি টাইম ১০ সেকেন্ড থেকে ১০ মিলিসেকেন্ডে নেমে আসবে!",
          b: "এই কুয়েরি অপটিমাইজ করতে আমরা কম্পোজিট ইনডেক্স ব্যবহার করব। ইনডেক্সে প্রথমে সমতার ফিল্ড tenant_id এবং পরে সর্টিংয়ের created_at DESC কলাম রাখতে হবে। এর ফলে ফিল্টারিং ও সাজানো ডাটাবেজ মেমোরিতে অতিরিক্ত প্রসেস ছাড়াই সরাসরি ইনডেক্স থেকে পাওয়া যাবে।",
          e: "This requires an optimal Composite Index adhering to the Equality-First rule: place equality predicates first, followed by range and sort attributes. Executing 'CREATE INDEX idx_tenant_date ON invoices(tenant_id, created_at DESC)' satisfies both the tenant filter and the chronological sort in a single index scan, eliminating filesorts and reducing runtimes from 10s down to milliseconds.",
          code: "CREATE INDEX idx_invoices_tenant_date ON invoices (tenant_id, created_at DESC);"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এ প্রোডাক্ট খোঁজার সময় বারকোড, নাম ও ক্যাটাগরি দিয়ে সার্চ কীভাবে ফুল-টেক্সট ও ট্রাইগ্রাম ইনডেক্স দিয়ে অপটিমাইজ করেছিলে?",
          m: "Dokani-তে ক্যাশিয়াররা প্রোডাক্টের নাম অর্ধেক লিখে বা বানান ভুল করে সার্চ করে (যেমন 'Miniket Rice' বা '01923485')। সাধারণ `LIKE '%rice%'` দিলে কোনো B-Tree ইনডেক্স কাজ করে না এবং পুরো টেবিলে ফুল স্ক্যান হয়। আমি: (১) বারকোডের জন্য ইউনিক B-Tree ইনডেক্স রেখেছিলাম যা $O(1)$ গতি দিত। (২) প্রোডাক্ট নামের আংশিক খোঁজার জন্য PostgreSQL-এর `pg_trgm` এক্সটেনশন ব্যবহার করে **Trigram GIN Index** (`gin (name gin_trgm_ops)`) বসিয়েছিলাম। এর ফলে `%চাল%` বা `%rice%` দিয়ে সার্চ করলেও নিমেষে ইনডেক্স স্ক্যান হয়ে ইনস্ট্যান্ট রেজাল্ট আসত।",
          b: "দোকানি পিওএস সিস্টেমে প্রোডাক্ট নামের আংশিক বা যে কোনো প্রান্ত থেকে দ্রুত সার্চ করার জন্য আমরা পোস্টগ্রেসের pg_trgm এক্সটেনশন এবং ট্রাইগ্রাম জিন ইনডেক্স ব্যবহার করেছি। ফলে সাধারণ LIKE কোয়েরি ফুল টেবিল স্ক্যান না করে কয়েক মিলিসেকেন্ডে পণ্য খুঁজে বের করতে পারত।",
          e: "In Dokani POS, cashiers perform fuzzy substring searches against product titles. Standard SQL LIKE '%term%' leads to devastating full table scans because B-Tree indexes cannot index leading wildcards. I enabled PostgreSQL's pg_trgm extension and created a Trigram GIN index over the name column, delivering sub-20ms fuzzy lookups across large catalogs.",
          code: "CREATE EXTENSION IF NOT EXISTS pg_trgm;\nCREATE INDEX idx_prod_name_trgm ON products USING GIN (name gin_trgm_ops);"
        }
      ]
    },
    {
      id: "transactions-acid-locking",
      name: "Transactions, ACID Properties & Row Locking",
      desc: "Atomicity, Consistency, Isolation, Durability, SELECT FOR UPDATE, Optimistic vs Pessimistic Locking, Deadlocks",
      items: [
        {
          lvl: "lvl1",
          q: "Database Transactions-এ ACID প্রোপার্টিজ বলতে কী বোঝায় এবং এর প্রতিটি অক্ষরের অর্থ কী?",
          m: "ACID হলো ডাটাবেজ ট্রানজেকশনের ৪টি মৌলিক স্তম্ভ: (১) **A - Atomicity (অল অর নাথিং):** ট্রানজেকশনের সমস্ত অপারেশন সফল হলে সব সেভ হবে, একটি ফেইল করলে পূর্বের সব রোলব্যাক হয়ে যাবে। (২) **C - Consistency:** ডাটাবেজের সমস্ত কনস্ট্রেইন্ট ও নিয়ম সর্বদা বজায় থাকবে (যেমন একাউন্ট ব্যালেন্স কখনো নেগেটিভ হবে না)। (৩) **I - Isolation:** একাধিক ট্রানজেকশন একই সময়ে চললেও একটির অপূর্ণ পরিবর্তন অন্যটি দেখতে পাবে না। (৪) **D - Durability:** একবার ট্রানজেকশন কমিট হলে সিস্টেম ক্র্যাশ বা কারেন্ট চলে গেলেও ডাটা নিরাপদে ডিস্কে সংরক্ষিত থাকবে।",
          b: "এসিড (ACID) ডাটাবেজের নির্ভরযোগ্যতার ভিত্তি। অ্যাটমিসিটি নিশ্চিত করে সব কাজ সফল হবে নয়তো সব বাতিল হবে। কনসিস্টেন্সি ডাটার সঠিকতা ধরে রাখে। আইসোলেশন একাধিক কনকারেন্ট কাজের মধ্যে পারস্পরিক হস্তক্ষেপ বন্ধ করে এবং ডিউরাবিলিটি নিশ্চিত করে যে ডাটা একবার সেভ হলে সিস্টেম ক্র্যাশ করলেও তা হারিয়ে যাবে না।",
          e: "ACID guarantees transactional reliability: Atomicity ensures all operations succeed or all rollback (all-or-nothing). Consistency enforces all database rules and constraints across state transitions. Isolation ensures concurrent transactions execute independently without dirty cross-talk. Durability guarantees that committed data persists safely to disk even during sudden power failure.",
          tip: "ব্যাংকিং বা ই-কমার্স পেমেন্টের উদাহরণ দিলে উত্তরটি চমৎকার হবে।"
        },
        {
          lvl: "lvl2",
          q: "Pessimistic Locking (`SELECT ... FOR UPDATE`) এবং Optimistic Locking-এর মধ্যে পার্থক্য কী? কোনটি কখন ব্যবহার করবে?",
          m: "**Pessimistic Locking:** এটি ধরে নেয় কনফ্লিক্ট ঘটবেই। তাই ডাটা পড়ার সময়ই রোটিকে ডাটাবেজ লেভেলে লক করে দেয় (`SELECT * FROM products WHERE id = 1 FOR UPDATE;`)। ট্রানজেকশন শেষ না হওয়া পর্যন্ত অন্য কেউ ওই রো মডিফাই করতে পারে না। এটি কম স্টক বা সীমিত টিকিট বিক্রির ক্ষেত্রে ব্যবহৃত হয়। **Optimistic Locking:** এটি কোনো রো লক করে না, বরং টেবিলে একটি `version` কলাম রাখে। আপডেট করার সময় চেক করে `WHERE id = 1 AND version = 3`। যদি অন্য কেউ ইতিমধ্যে ভার্সন ৪ করে ফেলে, তবে আপডেট ০ রো রিটার্ন করে এবং অ্যাপ্লিকেশন রিট্রাই করে। কম কনফ্লিক্টের সিস্টেমে এটি অনেক দ্রুত কাজ করে।",
          b: "পেসিমিস্টিক লকিংয়ে ডাটা পড়ার সাথে সাথেই রো লক করে রাখা হয় যাতে অন্য কেউ পরিবর্তন করতে না পারে। অপটিমিস্টিক লকিংয়ে ডাটা লক না করে ভার্সন নম্বর মিলিয়ে আপডেট করা হয়। উচ্চ কনফ্লিক্ট ও ফিনান্সিয়াল ট্রানজেকশনে পেসিমিস্টিক লকিং নিরাপদ, আর সাধারণ রিড-হেভি সিস্টেমে অপটিমিস্টিক লকিং দ্রুততর।",
          e: "Pessimistic Locking assumes high contention and explicitly locks rows at the database level using 'SELECT ... FOR UPDATE', forcing concurrent transactions to wait. Optimistic Locking assumes conflicts are rare, checking a record version column during UPDATE (WHERE version = expected). If version drifted, the update fails and retries. Pessimistic is best for high-contention flash sales; Optimistic is best for low-conflict CRUD.",
          code: "-- Pessimistic Lock in PostgreSQL\nBEGIN;\nSELECT stock FROM products WHERE id = 'p1' FOR UPDATE;\nUPDATE products SET stock = stock - 1 WHERE id = 'p1';\nCOMMIT;"
        },
        {
          lvl: "lvl3",
          q: "Database Deadlock কী কারণে ঘটে এবং প্রোডাকশন আর্কিটেকচারে এটি কীভাবে প্রতিরোধ ও সমাধান করবে?",
          m: "Deadlock তখন ঘটে যখন দুটি ট্রানজেকশন একে অপরের লক করা রিসোর্সের জন্য অপেক্ষা করতে গিয়ে অনন্তকালের জন্য আটকে যায় (যেমন: ট্রানজেকশন ১ লক করেছে রো A এবং চাচ্ছে রো B; একই সময়ে ট্রানজেকশন ২ লক করেছে রো B এবং চাচ্ছে রো A)। প্রতিরোধ: (১) **কনসিস্টেন্ট লক অর্ডারিং:** সমস্ত ট্রানজেকশনে রিসোর্সগুলোকে সর্বদা একটি নির্দিষ্ট ক্রমে লক করতে হবে (যেমন আইডি অনুযায়ী সর্ট করে `p1` তারপর `p2`)। (২) ট্রানজেকশনকে যত দ্রুত সম্ভব শেষ করা এবং অপ্রয়োজনীয় থার্ড-পার্টি এপিআই কল ট্রানজেকশনের বাইরে রাখা। (৩) ডাটাবেজে `deadlock_timeout` কনফিগার রাখা যাতে ডাটাবেজ স্বয়ংক্রিয়ভাবে একটি ট্রানজেকশন ভেঙে দিয়ে এরর পাঠায় এবং অ্যাপ্লিকেশনে রিট্রাই লজিক থাকা।",
          b: "ডেডলক হলো এমন একটি অবস্থা যেখানে দুটি ভিন্ন ট্রানজেকশন পরস্পরের লক করা ডাটার জন্য অপেক্ষা করে আটকে থাকে। এটি প্রতিরোধ করতে কোডে সর্বদা একই নিয়মে বা আইডি অনুযায়ী ক্রমান্বয়ে ডাটা লক করতে হয় এবং ট্রানজেকশনের ভেতরে ভারী বা দীর্ঘ কাজ না করে দ্রুত কমিট সম্পন্ন করতে হয়।",
          e: "Deadlocks occur when two concurrent transactions mutually block each other by holding locks that the other requires (Transaction A holds Row 1, waits for Row 2; Transaction B holds Row 2, waits for Row 1). Prevention strategies include: enforcing consistent resource acquisition ordering (sorting IDs alphabetically/numerically before locking), keeping transactions short and free from external network calls, and setting deadlock_timeout with automated application retries.",
          tip: "রিসোর্স সর্টিং করে একই সিকোয়েন্সে লক করার কৌশল ইন্টারভিউয়ারদের খুব পছন্দ।"
        },
        {
          lvl: "situation",
          q: "ফ্ল্যাশ সেলে ১টি প্রোডাক্টের স্টক মাত্র ৫টি বাকি আছে, কিন্তু একই মিলিসেকেন্ডে ১০০ জন ইউজার 'Buy Now' বাটনে ক্লিক করেছে। স্টক নেগেটিভ হওয়া ঠেকাতে কীভাবে ট্রানজেকশন লিখবে?",
          m: "এটি একটি ক্লাসিক Race Condition প্রবলেম। দুটি সমাধান রয়েছে: (১) **অ্যাটোমিক এসকিউএল আপডেট উইথ চেক গার্ড:** `UPDATE products SET stock = stock - 1 WHERE id = :id AND stock >= 1;`। যদি স্টক ইতিবাচক থাকে কেবল তখনই রো আপডেট হবে এবং `affectedRows` ১ হবে। যদি ০ হয়, তার মানে স্টক শেষ এবং ইউজারকে সাথে সাথে 'আউট অফ স্টক' জানানো যাবে। (২) অথবা একটি ট্রানজেকশনে `SELECT stock FROM products WHERE id = :id FOR UPDATE` দিয়ে রো লক করে চেক করে আপডেট করা। অ্যাটোমিক আপডেটটি সবচেয়ে ফাস্ট কারণ এতে কোনো এপ্লিকেশন লেভেল লকিংয়ের ওভারহেড নেই।",
          b: "এই রেস কন্ডিশন ঠেকাতে আমরা অ্যাটোমিক আপডেট ব্যবহার করি যা SQL লেভেলেই stock >= 1 চেক করে ১ কমায়। যদি কোনো রো এফেক্টেড না হয় তবে বোঝা যায় স্টক শেষ হয়ে গেছে। এটি কোনো অতিরিক্ত লক ছাড়াই ডাটাবেজ লেভেলে শতভাগ নির্ভুলভাবে স্টক ম্যানেজ করে।",
          e: "To prevent overselling under high concurrency, execute an atomic conditional SQL update: 'UPDATE products SET stock = stock - 1 WHERE id = :id AND stock >= :qty'. If the affected rows count equals 1, the sale succeeds; if 0, the stock is exhausted. Alternatively, wrap the check inside a pessimistic transaction with SELECT FOR UPDATE. Atomic conditional updates are preferred for superior throughput.",
          code: "const updated = await prisma.product.updateMany({\n  where: { id: productId, stock: { gte: quantity } },\n  data: { stock: { decrement: quantity } }\n});\nif (updated.count === 0) throw new Error('স্টক অপর্যাপ্ত!');"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এ একাধিক ক্যাশিয়ার একই সময়ে সেলস এন্ট্রি দেওয়ার সময় স্টক ব্যালেন্স ও ক্যাশ রেজিস্টারে তুমি কীভাবে অ্যাটোমিক কনকারেন্সি বজায় রেখেছিলে?",
          m: "Dokani-তে বড় সুপারশপে একই সাথে ৩-৪ জন ক্যাশিয়ার একই সময়ে চাল বা তেলের মতো কমন আইটেম বিক্রি করে। আমরা: (১) প্রিজমাতে `prisma.product.updateMany({ where: { id, stock: { gte: qty } }, data: { stock: { decrement: qty } } })` দিয়ে অ্যাটোমিক ডিক্রিমেন্ট চালাতাম। (২) ক্যাশ ড্রয়ার বা রেজিস্টারের ক্ষেত্রে প্রতিটি ক্যাশিয়ারের নিজস্ব আলাদা `shift_session` থাকত যাতে অন্য ক্যাশিয়ারের বিক্রির সাথে ক্যাশ রেজিস্টার কনফ্লিক্ট না করে। (৩) দিনশেষে ক্লোজিংয়ে সমস্ত ইনভয়েসের যোগফল স্বয়ংক্রিয়ভাবে ক্যাশ রেজিস্টার এন্ট্রির সাথে মিলিয়ে নেওয়া হতো।",
          b: "দোকানি পিওএস-এ একাধিক ক্যাশিয়ারের দ্রুত লেনদেনের সময় আমরা অ্যাটোমিক ডিক্রিমেন্ট পদ্ধতি ব্যবহার করেছি যাতে স্টক কখনো মাইনাস না হয়। প্রতিটি ক্যাশিয়ারের জন্য আলাদা শিফট সেশন থাকায় তাদের ক্যাশ রেজিস্টার স্বাধীন থাকত এবং কোনো ডেডলক হতো না।",
          e: "In Dokani POS multi-terminal setups, concurrent checkouts updating identical SKUs were managed via atomic decrement constraints. By checking stock availability inline during the SQL decrement operation, race conditions were eliminated without locking entire tables. Furthermore, cash registers were scoped per cashier terminal shift session to isolate financial ledger state.",
          tip: "এই বাস্তব উদাহরণের মাধ্যমে তুমি প্রমাণ করতে পারবে যে তোমার তৈরি সিস্টেম বাস্তব দোকানে হাজার হাজার কেনাবেচা সামলাতে পারে।"
        }
      ]
    },
    {
      id: "mongodb-nosql",
      name: "MongoDB & Aggregation Pipeline",
      desc: "Document Data Modeling, MongoDB vs PostgreSQL Trade-offs, Aggregation Pipeline ($match, $group, $lookup), Indexes",
      items: [
        {
          lvl: "lvl1",
          q: "MongoDB-র মতো NoSQL ডাটাবেজ কখন PostgreSQL-এর চেয়ে বেশি উপযোগী এবং কখন নয়?",
          m: "MongoDB উপযোগী যখন: (১) ডাটার স্কিমা প্রতিনিয়ত পরিবর্তিত হয় (Polymorphic বা Unstructured data—যেমন ক্যাটালগের বিভিন্ন ধরনের পণ্যের ভিন্ন ভিন্ন স্পেসিফিকেশন)। (২) রিড-হেভি ডকুমেন্ট যেখানে প্যারেন্ট ও চাইল্ড ডাটা একসাথে এমবেডেড আকারে রাখতে হয় (যেমন কনটেন্ট ম্যানেজমেন্ট বা ব্লগ পোস্ট ও কমেন্টস)। (৩) বিশাল ভলিউমে হরিজন্টাল স্কেলিং বা শার্ডিং প্রয়োজন। কিন্তু যখন জটিল টেবিল রিলেশনশিপ, কঠোর ব্যাংকিং ফাইন্যান্সিয়াল এসিড ট্রানজেকশন এবং মাল্টি-টেবিল জয়েন দরকার হয়, তখন PostgreSQL সবসময় সেরা চয়েস।",
          b: "মঙ্গোডিবি উপযোগী যখন ডাটায় কোনো নির্দিষ্ট স্কিমা থাকে না এবং একই ডকুমেন্টের ভেতরে সাব-ডকুমেন্ট হিসেবে তথ্য দ্রুত রিড করতে হয়। তবে ব্যাংকিং লেনদেন বা জটিল রিলেশনাল ডাটার জন্য পোস্টগ্রেস সবসময় নির্ভরযোগ্য।",
          e: "MongoDB excels when domain models require polymorphic or fluid schemas, nested document embedding (e.g., product catalogs with arbitrary specifications, activity feeds), and native horizontal sharding. PostgreSQL remains the undisputed choice for strict relational models, complex multi-table JOINs, financial ledgers, and rigid schema integrity guarantees.",
          code: "// Embedded MongoDB Document\n{\n  _id: ObjectId('...'),\n  title: 'Smart TV',\n  attributes: { resolution: '4K', hdmiPorts: 4, smartOs: 'Google TV' }\n}"
        },
        {
          lvl: "lvl2",
          q: "MongoDB Aggregation Pipeline কীভাবে কাজ করে এবং `$match`, `$group`, `$lookup`-এর ব্যবহার ব্যাখ্যা করো।",
          m: "Aggregation Pipeline হলো একটি মাল্টি-স্টেজ ডাটা প্রসেসিং ফ্রেমওয়ার্ক যেখানে একটি স্টেজের আউটপুট পরবর্তী স্টেজের ইনপুট হিসেবে প্রবেশ করে। (১) `$match`: নির্দিষ্ট শর্ত অনুযায়ী ডকুমেন্ট ফিল্টার করে (এসকিউএল `WHERE`-এর মতো)। (২) `$group`: নির্দিষ্ট ফিল্ড অনুযায়ী ডকুমেন্টগুলোকে দলবদ্ধ করে যোগফল বা গড় বের করে (`GROUP BY`, `SUM`, `AVG`)। (৩) `$lookup`: অন্য কোনো কালেকশনের সাথে লেফট আউটার জয়েন (Left Outer Join) করে সম্পর্কিত ডাটা অ্যারে হিসেবে নিয়ে আসে।",
          b: "মঙ্গোডিবি এগ্রিগেশন পাইপলাইনে বিভিন্ন স্টেজের মাধ্যমে ডাটা প্রসেস করা হয়। $match দিয়ে ডাটা ফিল্টার করা হয়, $group দিয়ে নির্দিষ্ট ক্যাটাগরি অনুসারে মোট বা গড় হিসাব করা হয় এবং $lookup দিয়ে অন্য কালেকশন থেকে সম্পর্কিত তথ্য জয়েন করে আনা হয়।",
          e: "The MongoDB Aggregation Pipeline transforms documents through discrete sequential stages. $match filters matching documents early to leverage indexes. $group clusters documents by designated keys to compute analytical metrics (SUM, AVG, COUNT). $lookup executes left outer joins against related collections, injecting matching foreign records into an array attribute.",
          code: "db.orders.aggregate([\n  { $match: { status: 'COMPLETED' } },\n  { $group: { _id: '$customerId', totalSpent: { $sum: '$totalAmount' } } },\n  { $lookup: { from: 'customers', localField: '_id', foreignField: '_id', as: 'customer' } }\n]);"
        },
        {
          lvl: "lvl3",
          q: "MongoDB-তে 'Embedded Documents' বনাম 'Document References': প্রোডাকশন পারফরম্যান্সে কোনটি কখন বেছে নেবে?",
          m: "MongoDB ডাটা মডেলিংয়ের মূল দর্শন: 'Data that is accessed together should be stored together'। **Embedding:** যখন ১:১ বা সীমিত ১:N সম্পর্ক থাকে (যেমন একটি অর্ডারের ভেতরের ডেলিভারি এড্রেস বা লাইন আইটেমস), তখন এমবেড করা সেরা—কারণ সিঙ্গেল ডিস্ক রিডে পুরো ডাটা চলে আসে কোনো জয়েন ছাড়াই। কিন্তু যখন আনবাউন্ডেড ১:N বা N:M সম্পর্ক থাকে (যেমন একটি কোর্সের ১ লাখ শিক্ষার্থী), তখন এমবেড করলে ১৬ মেগাবাইটের বিসন সাইজ লিমিট ক্রস করবে। সেই ক্ষেত্রে **References (ObjectId linking)** ব্যবহার করতে হয়।",
          b: "যে তথ্যগুলো সবসময় একসাথে পড়া হয় সেগুলো একই ডকুমেন্টের ভেতর এমবেড করা ভালো, এতে পড়ার গতি সর্বোচ্চ থাকে। কিন্তু ডাটার সংখ্যা যদি সীমাহীনভাবে বাড়তে থাকে তবে ১৬ এমবি লিমিট এড়াতে আলাদা কালেকশনে রেফারেন্স বা আইডি লিংক করা আবশ্যক।",
          e: "Embed data when relationships are 1:1 or bounded 1:Few (e.g., order line items or shipping addresses) to achieve single-read locality without joins. Use normalized References when relationships are unbounded 1:Many or Many:Many to avoid hitting MongoDB's 16MB document size limit and preventing unbounded document growth.",
          tip: "MongoDB-র ১৬ মেগাবাইট ডকুমেন্ট সাইজ লিমিট উল্লেখ করলে ইন্টারভিউয়ার বুঝবে তুমি এর ইন্টারনালস জানো।"
        },
        {
          lvl: "situation",
          q: "একটি নোটিফিকেশন কালেকশনে কোটি কোটি লগ জমা হয়ে ডাটাবেজ স্লো হয়ে যাচ্ছে এবং পুরোনো ডাটা ডিলিট করতে বিশাল কুয়েরি লোড পড়ছে। কীভাবে অটোমেটিক সলিউশন দেবে?",
          m: "ম্যানুয়ালি ক্রন জব চালিয়ে কোটি কোটি রো ডিলিট করতে গেলে ডাটাবেজ ফ্রিজ হয়ে যাবে। সমাধান: **MongoDB TTL Index (Time-To-Live Index)**। নোটিফিকেশন ডকুমেন্টে একটি `createdAt` ফিল্ড রেখে তার ওপর TTL ইনডেক্স তৈরি করব `expireAfterSeconds: 2592000` (৩০ দিন)। MongoDB-র ব্যাকগ্রাউন্ড থ্রেড প্রতি মিনিটে স্বয়ংক্রিয়ভাবে ৩০ দিন পুরোনো নোটিফিকেশনগুলোকে অ্যাপ্লিকেশনের কোনো লোড ছাড়াই সাইলেন্টলি ডিলিট করে দেবে।",
          b: "পুরোনো লগ বা নোটিফিকেশন নিজে থেকে মুছে ফেলার জন্য মঙ্গোডিবির টিটিএল (TTL) ইনডেক্স ব্যবহার করা হয়। expireAfterSeconds দিয়ে নির্দিষ্ট সময় (যেমন ৩০ দিন) নির্ধারণ করে দিলে মঙ্গোডিবি ব্যাকগ্রাউন্ডে অতিরিক্ত লোড ছাড়াই পুরোনো রেকর্ডগুলো স্বয়ংক্রিয়ভাবে মুছে ফেলে।",
          e: "Rather than running scheduled batch deletion scripts that choke disk I/O, implement MongoDB TTL Indexes. By indexing a timestamp attribute with 'expireAfterSeconds: 2592000' (30 days), MongoDB's native background cleanup process continuously and asynchronously evicts expired documents with minimal impact on application performance.",
          code: "db.notifications.createIndex({ createdAt: 1 }, { expireAfterSeconds: 2592000 });"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এর মতো জটিল সিস্টেমে MongoDB-র চেয়ে PostgreSQL কেন অনেক বেশি নিরাপদ ও সঠিক পছন্দ ছিল?",
          m: "Dokani একটি আর্থিক ও ব্যবসায়িক ERP/POS সিস্টেম যেখানে প্রতিটি টাকার হিসাব, ইনভেন্টরি স্টক ও ট্যাক্স কনসিস্টেন্ট হতে হয়। শুরুতে অনেকে NoSQL-এর কথা ভাবলেও আমি দৃঢ়ভাবে **PostgreSQL** বেছে নিয়েছিলাম কারণ: (১) ইনভেন্টরিতে রেস কন্ডিশন ঠেকাতে আমাদের Row-Level Locking (`SELECT FOR UPDATE`) প্রয়োজন ছিল যা পোস্টগ্রেসে রক-সলিড। (২) কাস্টমার ও সাপ্লায়ারের ডাবল-এন্ট্রি লেজারে কঠোর ফরেন কি ও চেক কনস্ট্রেইন্ট প্রয়োজন ছিল। (৩) PostgreSQL-এর চমৎকার `JSONB` সাপোর্ট থাকায় আমরা নো-এসকিউএল ফ্লেক্সিবিলিটিও পেয়েছি রিলেশনাল সুরক্ষার সাথে।",
          b: "দোকানি সিস্টেমে সঠিক অর্থনৈতিক হিসাব ও ইনভেন্টরি সুরক্ষার জন্য নো-এসকিউএলের চেয়ে পোস্টগ্রেস শতভাগ উপযুক্ত। এর রো-লেভেল লকিং, শক্তিশালী ট্রানজেকশন এবং ফরেন কি সুবিধা যেকোনো ডাটা অসঙ্গতি রোধ করে, যা ব্যবসায়িক সফটওয়্যারের জন্য অপরিহার্য।",
          e: "For Dokani POS, PostgreSQL was selected over MongoDB due to mission-critical financial ledger requirements. PostgreSQL provided native row-level pessimistic locking (SELECT FOR UPDATE) to avoid inventory overselling, rigid foreign key integrity across accounting ledgers, and ACID transactions. Additionally, PostgreSQL's JSONB capabilities offered NoSQL flexibility within a hardened relational core.",
          tip: "এই তুলনা তোমার ইঞ্জিনিয়ারিং সিদ্ধান্ত নেওয়ার ম্যাচিউরিটি প্রমাণ করে।"
        }
      ]
    },
    {
      id: "multi-tenant-isolation",
      name: "Multi-Tenant Data Isolation & Security",
      desc: "Tenant ID Scoping, Shared Database vs Separate Schema, Row-Level Security (RLS), Preventing Tenant Data Leaks",
      items: [
        {
          lvl: "lvl1",
          q: "SaaS অ্যাপ্লিকেশনে Multi-Tenancy কী এবং ডাটা আইসোলেশনের প্রধান ৩টি মডেল কী কী?",
          m: "Multi-Tenancy হলো এমন একটি আর্কিটেকচার যেখানে একটি একক সফটওয়্যার অ্যাপ্লিকেশন ইনস্ট্যান্স একাধিক স্বাধীন গ্রাহক বা প্রতিষ্ঠানকে (প্রতিটি এক একটি Tenant) সেবা দেয়, কিন্তু প্রতিটি টেন্যান্টের ডাটা একে অপরের থেকে সম্পূর্ণ আলাদা থাকে। ৩টি প্রধান মডেল: (১) **Database-per-Tenant:** প্রতিটি গ্রাহকের সম্পূর্ণ আলাদা ডাটাবেজ (সর্বোচ্চ নিরাপত্তা, তবে হোস্ট খরচ অনেক বেশি)। (২) **Schema-per-Tenant:** একই ডাটাবেজে প্রতিটি গ্রাহকের আলাদা PostgreSQL স্কিমা। (৩) **Shared Database, Shared Schema (Row-Level Scoping):** একই টেবিলে সব গ্রাহকের ডাটা থাকে এবং প্রতিটি রো-তে একটি `tenant_id` কলাম দিয়ে ডাটা আলাদা রাখা হয় (সবচেয়ে স্কেলেবল ও সাশ্রয়ী)।",
          b: "মাল্টি-টেন্যান্সি হলো এমন একটি ব্যবস্থা যেখানে একই সফটওয়্যার একাধিক ভিন্ন প্রতিষ্ঠান ব্যবহার করে কিন্তু কেউ কারো তথ্য দেখতে পায় না। এটি বাস্তবায়নের ৩টি উপায়: আলাদা ডাটাবেজ, একই ডাটাবেজে আলাদা স্কিমা, অথবা একই টেবিলে tenant_id দিয়ে রো-ভিত্তিক আলাদা রাখা।",
          e: "Multi-tenancy allows a single application instance to serve multiple distinct organizations (tenants) while guaranteeing strict data isolation. The three standard models are: Database-per-Tenant (maximum physical isolation, high cost), Schema-per-Tenant (separate schemas in one DB), and Shared Database with Row-Level Tenant ID scoping (maximum resource efficiency and operational scalability).",
          tip: "Dokani SaaS-এ তুমি ৩ নম্বর মডেল (Shared DB with Tenant ID) ব্যবহার করেছ।"
        },
        {
          lvl: "lvl2",
          q: "Shared Database আর্কিটেকচারে কোডে `WHERE tenant_id = ?` ভুলে যাওয়ার ফলে ডাটা লিক হওয়া কীভাবে সিস্টেমেটিক্যালি বন্ধ করবে?",
          m: "ম্যানুয়ালি প্রতিটি কুয়েরিতে `tenant_id` লিখলে কোনো না কোনো ডেভেলপার বা এপিআইতে ভুলবশত `WHERE tenant_id` মিস হতে পারে, যার ফলে এক দোকানের সেলস রিপোর্ট অন্য দোকান দেখতে পাবে—যা একটি চরম সিকিউরিটি ডিজাস্টার! সমাধান: (১) **Prisma Client Extensions / Middleware:** প্রিজমা ক্লায়েন্টে একটি গ্লোবাল এক্সটেনশন বসানো যা যেকোনো `findMany`, `update`, বা `delete` কুয়েরিতে স্বয়ংক্রিয়ভাবে কারেন্ট ইউজারের রিকোয়েস্ট কনটেক্সট থেকে `tenantId` ইনজেক্ট করে দেয়। (২) **PostgreSQL Row-Level Security (RLS):** ডাটাবেজ লেভেলেই পলিসি সেট করে রাখা যাতে কোনো অবস্থাতেই টেন্যান্টের বাইরে ডাটা রিড না হতে পারে।",
          b: "কোডে ম্যানুয়ালি tenant_id লিখতে গেলে ভুলের সম্ভাবনা থাকে। তাই প্রিজমা এক্সটেনশন বা মিডলওয়্যারের মাধ্যমে প্রতিটি কুয়েরিতে স্বয়ংক্রিয়ভাবে tenant_id জুড়ে দেওয়া হয়। এছাড়া পোস্টগ্রেসের রো-লেভেল সিকিউরিটি দিয়ে ডাটাবেজ পর্যায়েই ডাটা লিক সম্পূর্ণ বন্ধ করা যায়।",
          e: "Relying on developers to manually append 'WHERE tenant_id = :id' invites catastrophic data leakage bugs. To eliminate human error, configure Prisma Client Extensions to intercept all query operations, auto-injecting the tenantId from the active request context. At the database layer, enforce PostgreSQL Row-Level Security (RLS) policies as an absolute guardrail.",
          code: "// Prisma Client Extension for Auto Tenant Scoping\nconst prisma = new PrismaClient().$extends({\n  query: {\n    $allModels: {\n      async findMany({ args, query }) {\n        args.where = { ...args.where, tenantId: getActiveTenantId() };\n        return query(args);\n      }\n    }\n  }\n});"
        },
        {
          lvl: "lvl3",
          q: "PostgreSQL Row-Level Security (RLS) কীভাবে কাজ করে এবং নোডজেএস কানেকশন পুলে এটি কীভাবে কনফিগার করবে?",
          m: "RLS হলো ডাটাবেজ ইঞ্জিনের নিজস্ব নিরাপত্তা ফিল্টার। টেবিলে RLS অন থাকলে পোস্টগ্রেস স্বয়ংক্রিয়ভাবে প্রতিটি কুয়েরির সাথে পলিসি চেক করে। কানেকশন পুলে: (১) টেবিলে `ENABLE ROW LEVEL SECURITY` করি। (২) পলিসি লিখি `USING (tenant_id = current_setting('app.current_tenant_id'))`। (৩) যখন নোডজেএস থেকে কোনো রিকোয়েস্ট আসে, ট্রানজেকশনের শুরুতে কমান্ড চালাই `SET LOCAL app.current_tenant_id = 'tenant-uuid'`। এর ফলে ওই সেশনে ডেভেলপার `SELECT * FROM invoices` চালালেও ডাটাবেজ শুধুমাত্র সেই নির্দিষ্ট টেন্যান্টের ডাটাই রিটার্ন করবে—ভুল কোড লিখলেও অন্য টেন্যান্টের ডাটা দেখা অসম্ভব!",
          b: "পোস্টগ্রেসের রো-লেভেল সিকিউরিটি ডাটাবেজের ভেতরে প্রতিটি কুয়েরিতে স্বয়ংক্রিয়ভাবে টেন্যান্ট ফিল্টার কার্যকর করে। নোডজেএস থেকে সেশনের শুরুতে কারেন্ট টেন্যান্ট আইডি সেট করে দিলে ডাটাবেজ নিজেই অন্য দোকানের তথ্য আসা আটকে দেয়।",
          e: "PostgreSQL Row-Level Security (RLS) enforces row filtering inside the database kernel regardless of the calling query. In a connection pool, set a session variable at the start of each transaction: 'SET LOCAL app.current_tenant = :tenantId'. A policy on tables matching 'USING (tenant_id = current_setting('app.current_tenant'))' guarantees complete tenant isolation even if application-level queries omit WHERE clauses.",
          code: "ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;\nCREATE POLICY tenant_isolation_policy ON invoices\nFOR ALL USING (tenant_id = current_setting('app.current_tenant_id')::uuid);"
        },
        {
          lvl: "situation",
          q: "একটি টেন্যান্টের ডেটাবেজ সাইজ হঠাৎ দ্রুত বড় হয়ে অন্য টেন্যান্টের কুয়েরি পারফরম্যান্সকে স্লো করে দিচ্ছে (Noisy Neighbor Problem)। কীভাবে এটি ট্যাকল করবে?",
          m: "Noisy Neighbor সমস্যা সমাধানের পদক্ষেপ: (১) **ইনডেক্সিং অপটিমাইজেশন:** সমস্ত ইনডেক্সে কম্পোজিট কি হিসেবে `tenant_id`-কে প্রথমে রাখা যাতে বড় টেন্যান্টের ডাটা সার্চ অন্য টেন্যান্টের ইনডেক্স রেঞ্জকে প্রভাবিত না করে। (২) **টেবিল পার্টিশনিং (Table Partitioning):** পোস্টগ্রেসে `PARTITION BY LIST (tenant_id)` ব্যবহার করে বিশাল টেন্যান্টের ডাটাকে আলাদা পার্টিশন টেবিলে নিয়ে যাওয়া। (৩) **API Rate Limiting:** টেন্যান্ট আইডি ধরে Redis রেট লিমিটিং বসানো যাতে একটি নির্দিষ্ট শপ প্রতি মিনিটে অস্বাভাবিক রিকোয়েস্ট পাঠাতে না পারে। (৪) চরম পর্যায়ে ওই ভিআইপি টেন্যান্টকে ডেডিকেটেড ডাটাবেজে মাইগ্রেট করা।",
          b: "নয়েজি নেইবার সমস্যা সমাধানে প্রতিটি টেন্যান্টের জন্য এপিআই রেট লিমিট বসানো হয় যাতে কেউ অতিরিক্ত লোড তৈরি করতে না পারে। ডাটাবেজে কম্পোজিট ইনডেক্স ও টেবিল পার্টিশনিং ব্যবহার করে বড় দোকানের ডাটা আলাদা ফিজিক্যাল ব্লকে সংরক্ষণ করা যায়।",
          e: "To solve the Noisy Neighbor dilemma in shared databases: enforce composite indexing with tenant_id as the leading column, apply PostgreSQL list partitioning to isolate hyper-active tenant data blocks, enforce per-tenant rate limits via Redis token buckets at the API gateway, and establish migration playbooks to graduate massive tenants onto dedicated databases.",
          tip: "Noisy Neighbor টার্মটি ক্লাউড ও SaaS ইন্টারভিউতে অত্যন্ত পপুলার।"
        },
        {
          lvl: "realworld",
          q: "Dokani Multi-Tenant POS SaaS-এ তুমি প্রতিটি দোকানের ডাটা আইসোলেশন, বারকোড ইউনিকনেস ও বিলিং কীভাবে নিরাপদে হ্যান্ডেল করেছিলে?",
          m: "Dokani-তে শত শত দোকান নিজস্ব ইনভেন্টরি ও সেলস পরিচালনা করে। আমি: (১) ডাটাবেজের প্রতিটি টেবিলে (Products, Invoices, Customers) `tenantId` ফরেন কি বাধ্যতামূলক করেছিলাম। (২) বারকোডের ইউনিকনেস গ্লোবালি না রেখে টেন্যান্ট-লেভেলে কম্পোজিট ইউনিক করেছিলাম `@@unique([tenantId, barcode])`—ফলে দোকান A এবং দোকান B উভয়েই একই বারকোড '101' নিজের মতো ব্যবহার করতে পারত কোনো ক্ল্যাশ ছাড়া। (৩) JWT টোকেনে ক্রিপ্টোগ্রাফিক্যালি সাইন করা `tenantId` থাকত যা ক্লায়েন্ট থেকে পরিবর্তন করা অসম্ভব ছিল, এবং ব্যাকএন্ডের প্রতিটি ডাটাবেজ কুয়েরি সেই টোকেন থেকেই টেন্যান্ট স্কোপ করত।",
          b: "দোকানি মাল্টি-টেন্যান্ট পিওএস সিস্টেমে প্রতিটি টেবিলে tenantId ফিল্ডের মাধ্যমে নিরাপত্তা নিশ্চিত করা হয়েছিল। প্রোডাক্ট বারকোডের ক্ষেত্রে টেন্যান্ট এবং বারকোড একসাথে ইউনিক রাখা হয়েছিল যাতে ভিন্ন ভিন্ন দোকান একই বারকোড নাম্বার স্বাধীনভাবে ব্যবহার করতে পারে এবং কোনো তথ্য মিশ্রিত না হয়।",
          e: "In Dokani Multi-Tenant SaaS, all business models strictly included a tenantId attribute. Barcode uniqueness was scoped per tenant using composite constraints (@@unique([tenantId, barcode])), allowing multiple independent stores to register overlapping SKU codes safely. Tenant IDs were extracted exclusively from cryptographically signed JWT payloads, neutralizing any risk of client tampering.",
          code: "model Product {\n  id        String   @id @default(uuid())\n  tenantId  String\n  barcode   String\n  name      String\n  @@unique([tenantId, barcode])\n}"
        }
      ]
    },
    {
      id: "mongoose-odm",
      name: "Mongoose ODM & Document Modeling",
      desc: "Schema Definitions, Validators, Pre/Post Middleware Hooks, Virtuals, Population vs Lookup, Lean Queries",
      items: [
        {
          lvl: "lvl1",
          q: "Node.js অ্যাপ্লিকেশনে Mongoose ODM কেন ব্যবহার করা হয় এবং Mongoose Schema বনাম Model-এর পার্থক্য কী?",
          m: "MongoDB মূলত স্কিমা-লেস (Schemaless) ডাটাবেজ, যার ফলে যে কেউ ভুল ফিল্ড বা ইনভ্যালিড ডাটা ইনসার্ট করতে পারে। Mongoose অ্যাপ্লিকেশন লেভেলে একটি কঠোর স্কিমা, ডাটা টাইপ ভ্যালিডেশন এবং মডেলিং স্ট্রাকচার তৈরি করে। 'Schema' হলো ডকুমেন্টের একটি ব্লুপ্রিন্ট বা নকশা—যেখানে কোন কোন ফিল্ড থাকবে, তাদের ডাটা টাইপ কী, রিকোয়ার্ড কিনা ইত্যাদি ডিক্লেয়ার করা হয়। আর 'Model' হলো সেই স্কিমা থেকে তৈরি হওয়া একটি কমপ্লিট কনস্ট্রাক্টর ফাংশন বা ক্লাস, যার মাধ্যমে আমরা ডাটাবেজে আসল CRUD অপারেশন (`Model.find()`, `Model.create()`) চালাই।",
          b: "মঙ্গোডিবিতে কোনো নির্দিষ্ট স্কিমা না থাকায় অ্যাপ্লিকেশন লেভেলে ডেটা ভ্যালিডেশন নিশ্চিত করতে মঙ্গুজ ব্যবহার করা হয়। স্কিমা হলো ডকুমেন্টের স্ট্রাকচার বা নিয়মের নকশা, আর মডেল হলো সেই স্কিমা থেকে তৈরি অবজেক্ট যার মাধ্যমে ডাটাবেজে কুয়েরি বা রেকর্ড সেভ করা হয়।",
          e: "Mongoose is an Object Data Modeling (ODM) library for MongoDB that enforces strict application-level schemas, casting, and validation over inherently schemaless collections. A Mongoose Schema defines the structural blueprint, data types, validators, and hooks of a document. A Mongoose Model is a compiled constructor derived from the schema providing the runtime programmatic interface for executing CRUD queries against the collection.",
          code: "import { Schema, model } from 'mongoose';\nconst productSchema = new Schema({\n  title: { type: String, required: [true, 'নাম দেওয়া আবশ্যক'], trim: true },\n  price: { type: Number, required: true, min: [0, 'দাম নেগেটিভ হতে পারে না'] },\n  stock: { type: Number, default: 0 }\n}, { timestamps: true });\nexport const Product = model('Product', productSchema);"
        },
        {
          lvl: "lvl2",
          q: "Mongoose Middleware (Pre ও Post Hooks) কীভাবে কাজ করে এবং ইউজার পাসওয়ার্ড হ্যাশিংয়ে `pre('save')` কেন সেরা উদাহরণ?",
          m: "Mongoose Middleware হলো এমন কিছু ফাংশন যা নির্দিষ্ট কোনো ডকুমেন্ট অপারেশন (যেমন: `save`, `validate`, `remove`, `updateOne`) এক্সিকিউট হওয়ার ঠিক আগে (`pre`) অথবা পরে (`post`) স্বয়ংক্রিয়ভাবে রান হয়। পাসওয়ার্ড হ্যাশিংয়ের জন্য `pre('save')` হুক আদর্শ: ইউজার যখন রেজিস্টার করে বা পাসওয়ার্ড পরিবর্তন করে, ডাটাবেজে সেভ হওয়ার ঠিক আগের মুহূর্তে এই হুক চেক করে `this.isModified('password')`। যদি পাসওয়ার্ড পরিবর্তিত হয়ে থাকে, তবে এটি `bcrypt.hash()` দিয়ে পাসওয়ার্ড হ্যাশ করে `this.password`-এ বসিয়ে দেয়। কন্ট্রোলারের ভেতর আলাদাভাবে হ্যাশিং কোড লেখার কোনো প্রয়োজন পড়ে না।",
          b: "মঙ্গুজ মিডলওয়্যার বা প্রি/পোস্ট হুক কোনো রেকর্ড সেভ বা আপডেট হওয়ার ঠিক আগে ও পরে স্বয়ংক্রিয়ভাবে কাজ করে। ইউজার পাসওয়ার্ড সেভ করার ঠিক পূর্বে pre('save') হুক দিয়ে পাসওয়ার্ড বিসিঙ্ক্রোনাসলি হ্যাশ করে সুরক্ষিত করা যায়।",
          e: "Mongoose middleware (pre and post hooks) intercept execution flow during document lifecycle events like validation, saving, and deletion. In user authentication, a pre('save') hook intercepts user mutations: using 'this.isModified(\"password\")' to detect changes, it transparently hashes the raw password using bcrypt before persisting the document, preventing plaintext password leakage without polluting controller handlers.",
          code: "userSchema.pre('save', async function(next) {\n  if (!this.isModified('password')) return next();\n  this.password = await bcrypt.hash(this.password, 12);\n  next();\n});"
        },
        {
          lvl: "lvl3",
          q: "Mongoose-এ `populate()` কীভাবে কাজ করে? এর পারফরম্যান্স সীমাবদ্ধতা এবং `.lean()` মেথডের গুরুত্ব কী?",
          m: "`populate()` রিলেশনাল ডাটাবেজের JOIN-এর মতো কাজ করে—এটি এক ডকুমেন্টের `ObjectId` রেফারেন্স ধরে অন্য কালেকশন থেকে ডাটা ফেচ করে নিয়ে আসে। তবে ইন্টারনালি এটি কিন্তু একক এসকিউএল জয়েন নয়, বরং ব্যাকগ্রাউন্ডে অতিরিক্ত কুয়েরি চালিয়ে ডাটা মার্জ করে। অনেক বেশি নেস্টেড `populate()` চালালে মারাত্মক N+1 লেটেন্সি তৈরি হয়। আর ডিফল্টভাবে Mongoose প্রতিটি ডকুমেন্টকে পূর্ণাঙ্গ Mongoose Document ইনস্ট্যান্সে রূপান্তর করে (যাতে মেমোরি ও সিপিইউ খরচ বেশি হয়)। শুধুমাত্র ডাটা রিড বা এপিআই রেসপন্সের ক্ষেত্রে **`.lean()`** ব্যবহার করলে এটি সাধারণ জাভাস্ক্রিপ্ট প্লেইন অবজেক্ট (POJO) রিটার্ন করে—যার ফলে কুয়েরি স্পিড ৩–৫ গুণ বাড়ে এবং মেমোরি খরচ ৭০% কমে যায়!",
          b: "পপুলেট (populate) অন্য কালেকশন থেকে রেফারেন্স করা ডেটা যুক্ত করে আনে, তবে বেশি ব্যবহারে কুয়েরি স্লো হতে পারে। শুধুমাত্র ডেটা পড়ার জন্য .lean() মেথড ব্যবহার করলে মঙ্গুজ অতিরিক্ত মেমোরি খরচ বাদ দিয়ে সাধারণ অবজেক্ট ফেরত দেয়, যা এপিআই রেসপন্সকে কয়েক গুণ দ্রুত করে।",
          e: "Mongoose's populate() emulates relational joins by resolving document ObjectIds via supplementary queries. However, chaining multiple deep populates introduces severe I/O latency. By default, Mongoose hydrates every result into a heavy Mongoose Document wrapper. Appending '.lean()' skips internal hydration, returning lightweight Plain Old JavaScript Objects (POJOs), slashing memory footprint by ~70% and accelerating API serialization.",
          code: "// Fast read query with .lean()\nconst orders = await Order.find({ status: 'DELIVERED' })\n  .select('orderNumber totalAmount createdAt')\n  .populate('customer', 'name email phone')\n  .lean()\n  .exec();"
        },
        {
          lvl: "situation",
          q: "একটি ই-কমার্স ক্যাটালগে ক্যাটাগরি অনুসারে ফিল্টার এবং মূল্য অনুযায়ী সর্টিং করার সময় Mongoose কুয়েরি খুব স্লো হচ্ছে। কীভাবে অপটিমাইজ করবে?",
          m: "স্লো হওয়ার কারণ হলো ক্যাটালগ কালেকশনে কম্পাউন্ড ইনডেক্স নেই এবং কুয়েরিতে সব ফিল্ড আননেসেসারি ফেচ হচ্ছে। অপটিমাইজেশনের ধাপ: (১) ডাটাবেজে একটি কম্পোজিট ইনডেক্স তৈরি করব: `productSchema.index({ category: 1, price: 1 })`। এর ফলে ফিল্টারিং ও সর্টিং একই ইনডেক্সে মেমোরি থেকে হবে। (২) `.select('name price thumbnail slug')` দিয়ে অপ্রয়োজনীয় দীর্ঘ ডেসক্রিপশন ফিল্ড বাদ দেব। (৩) `.lean()` যোগ করব যাতে অবজেক্ট ওভারহেড না থাকে। (৪) পেজিনেশনের জন্য `skip()`-এর বদলে Range/Cursor-based কুয়েরি ব্যবহার করব।",
          b: "এই কুয়েরি অপটিমাইজ করতে ক্যাটাগরি ও প্রাইসের উপর কম্পোজিট ইনডেক্স তৈরি করতে হবে। অপ্রয়োজনীয় ফিল্ড বাদ দিয়ে শুধু দরকারি ডেটা সিলেক্ট করতে হবে এবং .lean() দিয়ে হালকা অবজেক্ট ফেচ করতে হবে। এর ফলে কুয়েরি সময় সেকেন্ড থেকে মিলিসেকেন্ডে নেমে আসবে।",
          e: "Optimization requires establishing a composite index matching query patterns: 'schema.index({ category: 1, price: 1 })' adhering to the Equality-Sort-Range (ESR) rule. Restrict network payloads using selective projections (.select()), eliminate Mongoose hydration with .lean(), and replace expensive skip-based pagination with indexed cursor lookups on high-volume catalogs.",
          code: "productSchema.index({ category: 1, price: 1 });\n// Query:\nconst products = await Product.find({ category: catId })\n  .sort({ price: 1 })\n  .select('title price thumbnail')\n  .lean();"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এর মতো মাল্টি-টেন্যান্ট রিটেইল সিস্টেমে Mongoose দিয়ে বিভিন্ন দোকানের কাস্টম প্রোডাক্ট এট্রিবিউটস কীভাবে হ্যান্ডেল করা যায়?",
          m: "রিটেইল ব্যবসায় বিভিন্ন দোকানের পণ্যের বৈশিষ্ট্য আলাদা (যেমন কাপড়ের দোকানে সাইজ/রং, মুদি দোকানে ওজন/ব্র্যান্ড, ফার্মেসিতে জেনেরিক/ব্যাচ নম্বর)। রিলেশনাল ডাটাবেজে প্রতিটির জন্য কলাম বাড়ানো কঠিন। Mongoose-এ আমরা **Polymorphic / Hybrid Document Pattern** ব্যবহার করতে পারি: মূল ফিল্ডগুলো (নাম, বারকোড, কেনা দাম, বিক্রয় মূল্য) ফিক্সড টাইপ থাকবে, আর একটি `attributes` ফিল্ড `Map of Mixed` অথবা সাব-ডকুমেন্ট অ্যারে থাকবে। সেখানে যে কোনো দোকানদার নিজের কাস্টম ফিল্ড সেভ করতে পারবে, এবং `attributes` ফিল্ডের ওপর ওয়াইল্ডকার্ড ইনডেক্স `index({ 'attributes.$**': 1 })` বসিয়ে ফাস্ট সার্চ নিশ্চিত করা যায়।",
          b: "বিভিন্ন দোকানের বৈচিত্র্যময় পণ্যের তথ্য সংরক্ষণে মঙ্গুজে হাইব্রিড ডকুমেন্ট প্যাটার্ন ব্যবহার করা হয়। সাধারণ তথ্যের পাশাপাশি একটি ওপেন অবজেক্ট বা সাব-ডকুমেন্ট রাখা হয় যেখানে কাপড়ের সাইজ বা ওষুধের ব্যাচ নাম্বার স্বাধীনভাবে সেভ করা যায়।",
          e: "For heterogeneous retail merchandise across multi-tenant stores, Mongoose allows implementing the Hybrid Document Pattern. Fixed attributes (SKU, barcode, pricing, tenantId) remain strictly validated, while variable attributes are modeled as flexible sub-document maps: 'attributes: { type: Map, of: Schema.Types.Mixed }'. Applying MongoDB wildcard indexes ensures high-speed lookups across dynamic merchant attributes without requiring continuous schema migrations.",
          tip: "এই প্যাটার্নটি প্রমাণ করে তুমি জানো কখন NoSQL ফ্লেক্সিবিলিটি রিলেশনাল মডেলের চেয়ে সুবিধাজনক।"
        }
      ]
    },
    {
      id: "supabase-rls",
      name: "Supabase & Row Level Security (RLS)",
      desc: "PostgreSQL RLS Policies, auth.uid(), Next.js 15 @supabase/ssr, Realtime Subscriptions, Supabase Storage & Edge Functions",
      items: [
        {
          lvl: "lvl1",
          q: "Supabase কী এবং ট্র্যাডিশনাল কাস্টম Node.js ব্যাকএন্ডের তুলনায় এর মূল সুবিধাসমূহ কী কী?",
          m: "Supabase হলো একটি ওপেন-সোর্স Firebase বিকল্প যা সম্পূর্ণ শক্তিশালী **PostgreSQL** ডাটাবেজের ওপর নির্মিত। এটি ডেভেলপারদের ইনস্ট্যান্ট ৫টি প্রধান সুবিধা দেয়: (১) অটো-জেনারেটেড REST ও GraphQL API (PostgREST দিয়ে), (২) বিল্ট-ইন ইউজার অথেন্টিকেশন (GoTrue), (৩) ডাটাবেজ লেভেল সিকিউরিটি পলিসি (PostgreSQL RLS), (৪) রিয়েল-টাইম ডাটাবেজ ইভেন্ট লিসেনিং (WebSockets CDC), এবং (৫) এসথ্রি-কম্প্যাটিবল ফাইল স্টোরেজ। ট্র্যাডিশনাল ব্যাকএন্ডের মতো প্রতি টেবিলের জন্য আলাদা আলাদা ক্রাড (CRUD) কন্ট্রোলার, রাউট ও অথেন্টিকেশন বয়লারপ্লেট কোড না লিখে সরাসরি ফ্রন্টএন্ড বা নেক্সটজেএস থেকে ডাটাবেজে সিকিউর কুয়েরি চালানো যায়।",
          b: "সুপাবেজ (Supabase) হলো একটি ওপেন-সোর্স ক্লাউড প্ল্যাটফর্ম যা সরাসরি পোস্টগ্রেস ডাটাবেজের উপর তৈরি। এটি ব্যবহারকারীদের আলাদা করে ব্যাকএন্ড কন্ট্রোলার ও রাউট না লিখে স্বয়ংক্রিয় এপিআই, অথেন্টিকেশন, রিয়েল-টাইম সকেট এবং ফাইল স্টোরেজ ব্যবহারের সুযোগ দেয়।",
          e: "Supabase is an open-source Backend-as-a-Service (BaaS) built on top of enterprise-grade PostgreSQL. Key architectural components include: PostgREST for auto-generating RESTful endpoints directly from SQL schemas, GoTrue for tokenized OAuth and JWT authentication, PostgreSQL Row Level Security (RLS) for data governance, Realtime for WebSocket change streams, and S3-compatible file storage, eliminating standard CRUD API boilerplate.",
          tip: "World Corp Digital-এর ইন্টারভিউতে Supabase-কে শুধুমাত্র 'একটি ডাটাবেজ' না বলে 'PostgreSQL-এর ওপর কমপ্লিট ক্লাউড প্ল্যাটফর্ম' হিসেবে তুলে ধরবে।"
        },
        {
          lvl: "lvl2",
          q: "PostgreSQL Row Level Security (RLS) কী এবং `CREATE POLICY` দিয়ে কীভাবে মাল্টি-ইউজার বা মাল্টি-টেন্যান্ট সিকিউরিটি নিশ্চিত করা হয়?",
          m: "ট্র্যাডিশনাল অ্যাপ্লিকেশনে সিকিউরিটি থাকে Node.js কোডে (`if (req.user.id !== doc.userId)`), যার ফলে ডেভেলপার কোনো এপিআইতে ফিল্টার দিতে ভুলে গেলে ডাটা লিক হয়। **Row Level Security (RLS)** ডাটাবেজ লেভেলে কার্যকর হয়: ডাটাবেজ স্বয়ংক্রিয়ভাবে চেক করে যে ইউজার কুয়েরি চালাচ্ছে সে এই নির্দিষ্ট রো দেখতে বা পরিবর্তন করতে অনুমোদিত কিনা। Supabase-এ টেবিলের ওপর `ALTER TABLE documents ENABLE ROW LEVEL SECURITY;` চালু করে পলিসি লেখা হয়: `USING (auth.uid() = user_id)`। এর ফলে ফ্রন্টএন্ড থেকে যে কোনো ইউজার `supabase.from('documents').select('*')` চালালেও ডাটাবেজ কেবল সেই ইউজারের নিজস্ব রোগুলোই ফেরত দেবে, অন্য কোনো ইউজারের ডাটা দেখতেই পাবে না!",
          b: "রো লেভেল সিকিউরিটি (RLS) হলো ডাটাবেজের নিজস্ব নিরাপত্তা ব্যবস্থা যা স্বয়ংক্রিয়ভাবে নিশ্চিত করে একজন ব্যবহারকারী শুধু নিজের তৈরি ডেটাই দেখতে বা সম্পাদনা করতে পারবে। এপ্লিকেশন কোডে কোনো ভুল হলেও ডাটাবেজ অন্য ইউজারের ডেটা কখনোই প্রকাশ করে না।",
          e: "PostgreSQL Row Level Security (RLS) enforces authorization at the database engine tier rather than relying solely on application middleware. Once enabled on a table, all SELECT/INSERT/UPDATE/DELETE queries are evaluated against cryptographic security policies. In Supabase, policies leverage the built-in helper 'auth.uid() = user_id' so that client-side queries can never read or mutate records belonging to other tenants.",
          code: "-- Enable RLS and define Tenant Isolation Policy\nALTER TABLE invoices ENABLE ROW LEVEL SECURITY;\n\nCREATE POLICY \"Users can only read their own invoices\"\nON invoices FOR SELECT\nUSING (auth.uid() = user_id);\n\nCREATE POLICY \"Users can only insert their own invoices\"\nON invoices FOR INSERT\nWITH CHECK (auth.uid() = user_id);"
        },
        {
          lvl: "lvl3",
          q: "Next.js 15 App Router-এর সাথে Supabase কীভাবে ইন্টিগ্রেট করবে? `@supabase/ssr` দিয়ে কুকি ম্যানেজমেন্ট ও মিডলওয়্যার সেশন রিফ্রেশ কেন জরুরি?",
          m: "Next.js App Router-এ সার্ভার কম্পোনেন্ট, সার্ভার অ্যাকশন ও ক্লায়েন্ট কম্পোনেন্ট একসাথে চলে। ক্লায়েন্টের LocalStorage সার্ভার কম্পোনেন্ট রিড করতে পারে না। তাই আমরা **`@supabase/ssr`** প্যাকেজ ব্যবহার করি, যা সিকিউর `HttpOnly` কুকিজের মাধ্যমে অথেন্টিকেশন সেশন ম্যানেজ করে। (১) `middleware.ts`-এ প্রতি রিকোয়েস্টে Supabase ক্লায়েন্ট ইনিশিয়ালাইজ করে সেশন রিফ্রেশ করি যাতে ইউজারের টোকেন এক্সপায়ার না হয়। (২) Server Components-এ `createClient()` ডেকে সিকিউরভাবে সরাসরি ডাটাবেজ রিড করি (কোনো পাবলিক এপিআই কল ছাড়াই)। (৩) Server Actions-এ কুকি ব্যবহার করে ডেটা মিউটেশন করি।",
          b: "নেক্সটজেএস ১৫ অ্যাপ রাউটারে সার্ভার কম্পোনেন্ট লোকাল স্টোরেজ পড়তে পারে না, তাই @supabase/ssr প্যাকেজ দিয়ে কুকিতে সেশন টোকেন রাখা হয়। মিডলওয়্যারের মাধ্যমে টোকেন স্বয়ংক্রিয়ভাবে রিফ্রেশ হয় এবং সার্ভার অ্যাকশনে নিরাপদ ডাটাবেজ কুয়েরি চালানো যায়।",
          e: "In Next.js 15 App Router, Server Components execute entirely on the server and cannot access browser LocalStorage. Integrating Supabase requires '@supabase/ssr' to store JWT session tokens in secure, encrypted HTTP cookies. Next.js middleware continuously validates and refreshes expired tokens on incoming requests, while Server Components and Server Actions leverage 'createServerClient' to query PostgreSQL with full RLS context.",
          code: "// middleware.ts in Next.js 15\nimport { createServerClient } from '@supabase/ssr';\nimport { NextResponse, type NextRequest } from 'next/server';\n\nexport async function middleware(request: NextRequest) {\n  let response = NextResponse.next({ request: { headers: request.headers } });\n  const supabase = createServerClient(\n    process.env.NEXT_PUBLIC_SUPABASE_URL!,\n    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,\n    {\n      cookies: {\n        getAll() { return request.cookies.getAll(); },\n        setAll(cookiesToSet) { cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options)); }\n      }\n    }\n  );\n  await supabase.auth.getUser();\n  return response;\n}"
        },
        {
          lvl: "situation",
          q: "একটি অনলাইন মার্কেটপ্লেসে ভেন্ডররা নতুন অর্ডার আসার সাথে সাথে পেজ রিফ্রেশ ছাড়াই লাইভ নোটিফিকেশন পেতে চায়। Supabase Realtime দিয়ে কীভাবে সমাধান করবে?",
          m: "Supabase Realtime পোস্টগ্রেসের **Change Data Capture (CDC / Wal2json)** প্রযুক্তি ব্যবহার করে সরাসরি ডাটাবেজ লেভেলের ইভেন্ট লিসেন করে। সমাধান: (১) ডাটাবেজের `orders` টেবিলের ওপর Realtime পাবলিকেশন অন করব। (২) ভেন্ডরের ফ্রন্টএন্ড ড্যাশবোর্ডে `supabase.channel('vendor-orders')` সাবস্ক্রাইব করব যেখানে ফিল্টার থাকবে `filter: 'vendor_id=eq.' + currentVendorId`। (৩) যখনই কাস্টমার নতুন অর্ডার দেবে, ডাটাবেজে রো ইনসার্ট হওয়ামাত্র পোস্টগ্রেস ইঞ্জিন ওয়েবসকেট দিয়ে ভেন্ডরের স্ক্রিনে `INSERT` পে-লোড পুশ করবে এবং ড্যাশবোর্ডে লাইভ অর্ডার ও অডিও বিপ বেজে উঠবে। কোনো আলাদা Socket.io সার্ভার মেইনটেইন করার প্রয়োজনই হবে না!",
          b: "সুপাবেজ রিয়েল-টাইম ফিচার ব্যবহার করে পোস্টগ্রেস ডাটাবেজে নতুন রো ইনসার্ট হওয়ামাত্র ওয়েবসকেটের মাধ্যমে ভেন্ডরের স্ক্রিনে তাৎক্ষণিক নোটিফিকেশন পাঠানো যায়। এর ফলে কোনো বাহ্যিক সকেট সার্ভার ছাড়াই কয়েক লাইনের কোডে লাইভ অর্ডার ট্র্যাকিং তৈরি করা সম্ভব।",
          e: "Supabase Realtime listens to PostgreSQL's Write-Ahead Log (WAL) replication stream to broadcast database mutations over WebSockets. In vendor portals, subscribe to row-level changes via 'supabase.channel()', filtering by vendor_id on the orders table. When a customer executes checkout, PostgreSQL dispatches an instant INSERT payload over the established socket, rendering order badges and triggering audio alerts with zero custom WebSocket infrastructure.",
          code: "const channel = supabase\n  .channel('live-orders')\n  .on('postgres_changes', {\n    event: 'INSERT',\n    schema: 'public',\n    table: 'orders',\n    filter: `vendor_id=eq.${vendorId}`\n  }, (payload) => {\n    playAudioBeep();\n    setOrders(prev => [payload.new, ...prev]);\n  })\n  .subscribe();"
        },
        {
          lvl: "realworld",
          q: "Supabase Storage-এ কাস্টমারদের ইনভয়েস পিডিএফ ও স্পর্শকাতর ডকুমেন্টস সংরক্ষণ করার সময় RLS পলিসি ও Signed URLs কীভাবে ব্যবহার করবে?",
          m: "কাস্টমার বা ভেন্ডরদের ইনভয়েস ও আর্থিক ডকুমেন্টস কখনো পাবলিক বালতিতে (Public Bucket) রাখা যাবে না। সমাধান: (১) Supabase Storage-এ একটি **Private Bucket** `invoices` তৈরি করব। (২) `storage.objects` টেবিলের ওপর RLS পলিসি দেব যাতে শুধুমাত্র সেই ইনভয়েসের মালিক ইউজার বা শপ ওনার ফাইলটি পড়তে পারে। (৩) কোনো কাস্টমার ইনভয়েস দেখতে চাইলে আমরা সরাসরি পার্মানেন্ট লিঙ্ক না দিয়ে **Time-limited Signed URL** তৈরি করব (`supabase.storage.from('invoices').createSignedUrl(filePath, 60)`) যা মাত্র ৬০ সেকেন্ড পর্যন্ত ভ্যালিড থাকে। ফলে লিঙ্ক কপি করে অন্য কেউ ফাইল চুরি করতে পারে না।",
          b: "গোপনীয় ইনভয়েস সুরক্ষায় প্রাইভেট স্টোরেজ বাকেট এবং পোস্টগ্রেস আরএলএস পলিসি ব্যবহার করা হয়। ব্যবহারকারীকে সরাসরি ফাইলের লিঙ্ক না দিয়ে ৬০ সেকেন্ড মেয়াদী সাইনড ইউআরএল (Signed URL) দেওয়া হয়, যা নির্দিষ্ট সময় পর অকেজো হয়ে যায় এবং তথ্যের গোপনীয়তা বজায় রাখে।",
          e: "Protecting confidential financial invoices in Supabase mandates using private storage buckets with strict Row Level Security applied to 'storage.objects'. Anonymous access is blocked entirely. For authorized views, generate short-lived Signed URLs via 'supabase.storage.from('invoices').createSignedUrl(path, 60)', expiring within 60 seconds. This prevents unauthorized link sharing while ensuring cryptographic access control.",
          tip: "Signed URL ও Private Storage RLS পলিসির কম্বিনেশন এন্টারপ্রাইজ ফিনটেক ও মার্কেটপ্লেস আর্কিটেকচারের স্ট্যান্ডার্ড।"
        }
      ]
    },
    {
      id: "db-backup-maintenance",
      name: "Database Backup, Pooling & Maintenance",
      desc: "pg_dump & Automated Backups, Point-in-Time Recovery, PgBouncer Connection Pooling, Vacuuming, Zero-Downtime Migrations",
      items: [
        {
          lvl: "lvl1",
          q: "PostgreSQL ডাটাবেজে Connection Pooling কেন প্রয়োজন এবং PgBouncer কীভাবে কাজ করে?",
          m: "PostgreSQL প্রতিটি নতুন ক্লায়েন্ট কানেকশনের জন্য ওএস লেভেলে একটি সম্পূর্ণ নতুন প্রসেস ফর্ক করে, যা প্রতিটি কানেকশনের জন্য প্রায় ১০ মেগাবাইট র‍্যাম ও অতিরিক্ত সিপিইউ খরচ করে। যদি ৫০০টি কনকারেন্ট রিকোয়েস্ট আসে, ডাটাবেজ মেমোরি ফুল হয়ে ক্র্যাশ করবে। PgBouncer হলো একটি লাইটওয়েট কানেকশন পুলার যা অ্যাপ্লিকেশন এবং পোস্টগ্রেসের মাঝে বসে। এটি ডাটাবেজে মাত্র ২০-৩০টি আসল কানেকশন ওপেন রাখে এবং অ্যাপ্লিকেশনের হাজার হাজার ইনকামিং রিকোয়েস্টকে নিমেষে রিইউজ করে ট্রানজেকশন শেষে কানেকশন রিলিজ করে দেয়।",
          b: "পোস্টগ্রেস প্রতি কানেকশনে প্রচুর মেমোরি খরচ করে। তাই পিজিবউন্সার (PgBouncer) কানেকশন পুলার ব্যবহার করা হয় যা সীমিত সংখ্যক আসল ডাটাবেজ কানেকশন ধরে রেখে অ্যাপ্লিকেশনের হাজার হাজার রিকোয়েস্টকে দ্রুত সেবা দিয়ে র‍্যাম ও সিপিইউ বাঁচায়।",
          e: "PostgreSQL spawns a dedicated OS backend process per client connection, consuming ~10MB of RAM and heavy CPU during forks. Under concurrency spikes, unpooled connections exhaust server memory. PgBouncer sits between Node.js and PostgreSQL, maintaining a lean pool of persistent database connections and multiplexing thousands of incoming client queries in transaction pooling mode.",
          code: "# PgBouncer configuration\n[databases]\ndokani_db = host=127.0.0.1 port=5432 dbname=dokani_prod\npool_mode = transaction\nmax_client_conn = 1000\ndefault_pool_size = 25"
        },
        {
          lvl: "lvl2",
          q: "PostgreSQL-এ `pg_dump` কমান্ড দিয়ে অটোমেটেড ব্যাকআপ কীভাবে নেবে এবং ক্র্যাশ হলে কীভাবে ডাটা রিস্টোর করবে?",
          m: "ব্যাকআপ নেওয়ার জন্য আমরা লিনাক্সে একটি অটোমেটেড ক্রন জব চালাই: `pg_dump -U username -F c -b -v -f /backups/db_$(date +%F).dump dbname`। এখানে `-F c` কাস্টম কম্প্রেসড বাইনারি ফরম্যাট তৈরি করে যা সাইজে ছোট এবং দ্রুত রিস্টোর হয়। রিস্টোর করার জন্য: প্রথমে খালি ডাটাবেজ বানিয়ে `pg_restore -U username -d dbname -v /backups/db_2026-10-08.dump` কমান্ড চালালেই সমস্ত স্কিমা, টেবিল, ইনডেক্স ও ডাটা নির্ভুলভাবে রিস্টোর হয়ে যায়।",
          b: "pg_dump দিয়ে পুরো ডাটাবেজের কম্প্রেসড ব্যাকআপ ফাইল তৈরি করা হয় এবং লিনাক্স ক্রন জবের মাধ্যমে তা প্রতিদিন নির্দিষ্ট সময়ে ক্লাউড স্টোরেজে জমা রাখা হয়। ডাটাবেজ নষ্ট হলে pg_restore কমান্ড দিয়ে কয়েক মিনিটে পূর্বের ব্যাকআপ থেকে সমস্ত ডাটা ফিরিয়ে আনা যায়।",
          e: "Automated backups utilize pg_dump with custom compressed formatting: 'pg_dump -U user -F c -b -f backup.dump dbname'. This produces compressed, index-aware archives that restore rapidly using 'pg_restore -d dbname -v backup.dump'. Production setups ship these dumps off-server (e.g., to AWS S3 or Cloudflare R2) via automated daily cron jobs.",
          code: "# Daily Backup Shell Script\n0 2 * * * pg_dump -U postgres -F c dokani_db > /backups/dokani_$(date +\\%Y\\%m\\%d).dump"
        },
        {
          lvl: "lvl3",
          q: "PostgreSQL-এ MVCC (Multi-Version Concurrency Control) কীভাবে কাজ করে এবং Autovacuum কেন অপরিহার্য?",
          m: "PostgreSQL-এ যখন কোনো রো `UPDATE` বা `DELETE` করা হয়, পোস্টগ্রেস কিন্তু হার্ডডিস্ক থেকে সাথে সাথে ওই রো মুছে ফেলে না। বরং পুরোনো রোটিকে 'Dead Tuple' হিসেবে মার্ক করে রাখে এবং আপডেটের জন্য একটি নতুন রো তৈরি করে (যাতে চলমান অন্যান্য রিড ট্রানজেকশন ব্যাহত না হয়)। সময়ের সাথে সাথে এই ডেড টাপল জমা হয়ে ডাটাবেজ ফুল হয়ে যায় এবং ডিস্কের সাইজ অস্বাভাবিক ফুলে যায় (Table Bloat)। **Autovacuum** হলো পোস্টগ্রেসের একটি ব্যাকগ্রাউন্ড ডিমেন প্রসেস যা স্বয়ংক্রিয়ভাবে এই ডেড টাপলগুলোকে পরিষ্কার করে তাদের ডিস্ক স্পেস নতুন ইনসার্টের জন্য রিইউজেবল করে এবং কুয়েরি প্ল্যানারের জন্য অপটিমাইজড স্ট্যাটিস্টিক্স আপডেট রাখে।",
          b: "পোস্টগ্রেসে আপডেট বা ডিলিট করলে পুরোনো তথ্য হার্ডডিস্কে ডেড টাপল হিসেবে থেকে যায়। অটোভ্যাকুয়াম ব্যাকগ্রাউন্ডে নিয়মিত এই অপ্রয়োজনীয় ডেটা পরিষ্কার করে ডিস্ক স্পেস মুক্ত করে এবং ডাটাবেজ স্লো হওয়া রোধ করে।",
          e: "PostgreSQL implements Multi-Version Concurrency Control (MVCC). UPDATE and DELETE operations do not overwrite storage on-disk; instead, obsolete rows are flagged as 'dead tuples'. Over time, uncollected dead tuples cause severe table bloat and degrade sequential scans. Autovacuum runs in the background to reclaim dead tuple storage space and update optimizer statistics (ANALYZE).",
          tip: "MVCC এবং Dead Tuple-এর ধারণা পোস্টগ্রেসের কোর ইন্টারনালস।"
        },
        {
          lvl: "situation",
          q: "প্রোডাকশন ডাটাবেজে ১ কোটি রো-এর একটি টেবিলে একটি নতুন কলাম যোগ করতে হবে যেখানে ডিফল্ট ভ্যালু থাকবে এবং নাল হতে পারবে না। ডাউনটাইম ছাড়া কীভাবে মাইগ্রেশন চালাবে?",
          m: "পুরাতন পোস্টগ্রেস ভার্সনে `ALTER TABLE ... ADD COLUMN ... DEFAULT 'x' NOT NULL` চালালে পুরো কোটি রো লক হয়ে যায় (Exclusive Table Lock) এবং প্রোডাকশন সাইট ডাউন হয়ে যায়। জিরো-ডাউনটাইম মাইগ্রেশনের ৩টি নিরাপদ ধাপ: (১) প্রথমে কলামটি নাল্যাবল আকারে ডিফল্ট ভ্যালু ছাড়া যোগ করব: `ALTER TABLE orders ADD COLUMN status VARCHAR(20);` (এতে কোনো টেবিল লক হয় না, ১ মিলিসেকেন্ড লাগে)। (২) ব্যাকগ্রাউন্ডে ব্যাচ আকারে ছোট ছোট চাঙ্কে (যেমন প্রতিবারে ৫০০০ রো) পুরোনো ডাটা আপডেট করে ভ্যালু বসাব। (৩) সব ডাটা আপডেট শেষ হলে নিরাপদভাবে `NOT NULL` কনস্ট্রেইন্ট যোগ করব।",
          b: "বড় টেবিলে সরাসরি NOT NULL কলাম যোগ করলে পুরো টেবিল লক হয়ে প্রোডাকশন বন্ধ হতে পারে। তাই প্রথমে কলামটি সাধারণ ফাঁকা ফিল্ড হিসেবে যোগ করতে হয়, তারপর ব্যাকগ্রাউন্ডে অল্প অল্প করে ডাটা আপডেট করে সবশেষে কনস্ট্রেইন্ট বসিয়ে জিরো-ডাউনটাইমে মাইগ্রেশন সম্পন্ন করা হয়।",
          e: "Adding a NOT NULL column with complex defaults to a 10-million-row table triggers aggressive table locks that lock out active writes. Zero-downtime execution involves a 3-step migration: first, add the column as nullable without locks; second, backfill existing records in asynchronous batches of 5,000 rows; third, apply the NOT NULL constraint once historical backfills complete.",
          code: "-- Safe Zero-Downtime Migration Pattern\nALTER TABLE orders ADD COLUMN status_code VARCHAR(20);\n-- Batch update in background script, then:\nALTER TABLE orders ALTER COLUMN status_code SET NOT NULL;"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এর ডাটাবেজ ব্যাকআপ ও রিকভারি স্ট্র্যাটেজি কীভাবে সেট করেছিলে যাতে সার্ভার পুড়ে গেলেও কোনো দোকানের ১টি বিক্রির ডাটাও না হারায়?",
          m: "Dokani-তে ব্যবসায়ীদের মূল সম্পদ তাদের হিসাবের খাতা। ডাটা সুরক্ষায় আমি **3-2-1 Backup Strategy** মেনে চলেছিলাম: (১) **Daily Automated Dump:** প্রতিদিন রাত ২টায় `pg_dump` দিয়ে কম্প্রেসড ব্যাকআপ তৈরি হয়ে এনক্রিপ্টেড আকারে আলাদা অফ-সাইট ক্লাউড স্টোরেজে (AWS S3) আপলোড হতো। (২) **Write-Ahead Logging (WAL) Archiving:** পোস্টগ্রেসের প্রতিটি ট্রানজেকশন লগ প্রতি ১৫ মিনিটে আর্কাইভ হতো, ফলে যে কোনো ক্র্যাশে পয়েন্ট-ইন-টাইম রিকভারি (PITR) দিয়ে ঠিক দুর্ঘটনার আগের ৫ মিনিটের স্টেটে ফিরে যাওয়া সম্ভব ছিল। (৩) মাসে একবার টেস্ট সার্ভারে ব্যাকআপ ফাইল রিস্টোর ড্রিল চালিয়ে যাচাই করতাম ব্যাকআপ ফাইলটি আসলেই কাজ করে কিনা।",
          b: "দোকানি সিস্টেমে ব্যবসায়ীদের ডাটা সুরক্ষায় প্রতিদিন স্বয়ংক্রিয় ব্যাকআপ নিয়ে ক্লাউড স্টোরেজে সংরক্ষণ করা হতো। ডব্লিউএএল (WAL) লগের মাধ্যমে যে কোনো মুহূর্তে ডাটা রিকভার করার ব্যবস্থা ছিল এবং নিয়মিত রিস্টোর টেস্টের মাধ্যমে ব্যাকআপের কার্যকারিতা নিশ্চিত করা হতো।",
          e: "In Dokani POS, disaster recovery followed the 3-2-1 backup paradigm. An automated cron generated nightly compressed pg_dump archives and transmitted them to an isolated S3 bucket with strict lifecycle retention policies. Write-Ahead Logs (WAL) were continuously archived to enable Point-In-Time Recovery (PITR), accompanied by monthly restoration fire-drills on staging instances to guarantee backup integrity.",
          tip: "এই উত্তর প্রমাণ করে যে তুমি শুধু কোড লেখো না, পুরো সিস্টেমের বিজনেস সিকিউরিটি ও ডিজাস্টার রিকভারি নিয়ে ভাবো।"
        }
      ]
    }
  ]
};
