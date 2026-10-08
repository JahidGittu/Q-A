// NT Tech Innovation — 03. Database Engineering Mastery (250 Questions - 25 per Topic across 5 Levels)
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.database = {
  "id": "database",
  "title": "Database Engineering & Architecture",
  "badge": "PostgreSQL · MongoDB · Prisma · Mongoose · RLS · ACID · Scaling",
  "icon": "🗄️",
  "topics": [
    {
      "id": "postgres-relational-design",
      "name": "PostgreSQL & Relational Schema Design",
      "desc": "Schema Design, Primary & Foreign Keys, Table Relationships (1:1, 1:N, M:N), Constraints, Normalization, Data Integrity",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Relational Database-এ Primary Key এবং Foreign Key-এর ভূমিকা কী এবং কেন প্রতিটি টেবিলে প্রাইমারি কি থাকা আবশ্যক?",
          "m": "Primary Key (PK) হলো একটি টেবিলের প্রতিটি রোর একক ও অনন্য আইডেন্টিফায়ার—এটি কখনোই NULL বা ডুপ্লিকেট হতে পারে না। আর Foreign Key (FK) হলো এমন একটি কলাম যা অন্য কোনো টেবিলের Primary Key-কে নির্দেশ করে এবং দুটি টেবিলের মধ্যে সম্পর্ক (Relationship) স্থাপন করে। প্রতিটি টেবিলে PK থাকা আবশ্যক কারণ: PK ছাড়া কোনো নির্দিষ্ট রোকে নিখুঁতভাবে চিহ্নিত, আপডেট বা ডিলিট করা যায় না এবং ডাটাবেজ অপটিমাইজার দ্রুত লুকআপ ইনডেক্স তৈরি করতে পারে না।",
          "b": "প্রাইমারি কি প্রতিটি রোর অনন্য পরিচয় নিশ্চিত করে এবং এটি কখনো নাল বা ডুপ্লিকেট হতে পারে না। ফরেন কি দুটি টেবিলের মধ্যে যৌক্তিক সম্পর্ক স্থাপন করে। তথ্যের স্বাতন্ত্র্য এবং দ্রুত ডেটা খোঁজার জন্য প্রতিটি টেবিলে প্রাইমারি কি থাকা বাধ্যতামূলক।",
          "e": "A Primary Key (PK) uniquely identifies each row in a table, strictly forbidding NULLs and duplicates. A Foreign Key (FK) refers to a Primary Key in another table, enforcing referential integrity. Primary keys are mandatory to locate, mutate, and index records deterministically.",
          "code": "CREATE TABLE users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) UNIQUE NOT NULL\n);"
        },
        {
          "lvl": "lvl1",
          "q": "Database Normalization কী এবং 1NF, 2NF, 3NF-এর মূল নীতিগুলো কী?",
          "m": "Normalization হলো ডাটাবেজ টেবিলগুলোকে এমনভাবে সাজানো যাতে ডেটা ডুপ্লিকেশন (Redundancy) কমে এবং ডেটা অ্যানোমালি (Insert, Update, Delete Anomalies) দূর হয়। (১) `1NF (First Normal Form)`: প্রতিটি সেল বা কলামে শুধুমাত্র অ্যাটমিক (অবিভাজ্য) মান থাকতে হবে (কোনো অ্যারে বা কমা দিয়ে একাধিক মান নয়) এবং প্রাইমারি কি থাকতে হবে। (২) `2NF`: 1NF হতে হবে এবং কোনো Partial Dependency থাকা যাবে না (কম্পোজিট কি-র আংশিক ওপর নির্ভর করা যাবে না)। (৩) `3NF`: 2NF হতে হবে এবং কোনো Transitive Dependency থাকা যাবে না (নন-প্রাইমারি কলাম অন্য নন-প্রাইমারি কলামের ওপর নির্ভর করতে পারবে না)।",
          "b": "ডাটাবেজ নরমালাইজেশন তথ্যের অপ্রয়োজনীয় পুনরাবৃত্তি রোধ করে। ১এনএফ প্রতিটি কলামে একক অবিভাজ্য মান নিশ্চিত করে, ২এনএফ কম্পোজিট কি-র ওপর পূর্ণ নির্ভরতা নিশ্চিত করে এবং ৩এনএফ ট্রানজিটিভ ডিপেনডেন্সি দূর করে টেবিলকে পরিপাটি রাখে।",
          "e": "Database Normalization minimizes data redundancy and anomalies: 1NF requires atomic column values and unique primary keys; 2NF eliminates partial dependencies on composite keys; 3NF eliminates transitive dependencies (non-key attributes depending on other non-key attributes).",
          "tip": "ইন্টারভিউতে ৩য় নরমাল ফর্ম (3NF) পর্যন্ত ব্যাখ্যা করা স্ট্যান্ডার্ড প্র্যাকটিস।"
        },
        {
          "lvl": "lvl1",
          "q": "PostgreSQL-এর প্রধান Constraints (NOT NULL, UNIQUE, CHECK, DEFAULT, FOREIGN KEY)-এর ব্যবহার কী?",
          "m": "(১) `NOT NULL`: কলামে কোনো ফাঁকা বা নাল মান প্রবেশ করতে দেয় না। (২) `UNIQUE`: কলামের প্রতিটি মান অনন্য হওয়া নিশ্চিত করে (যেমন ইমেইল বা ফোন)। (৩) `CHECK`: কাস্টম ব্যবসায়িক শর্ত এনফোর্স করে (যেমন `CHECK (price > 0)` বা `CHECK (discount <= total)`)। (৪) `DEFAULT`: কোনো মান না দিলে স্বয়ংক্রিয় ডিফল্ট ভ্যালু বসায় (যেমন `createdAt DEFAULT NOW()`)। (৫) `FOREIGN KEY`: রেফারেন্সিয়াল ইন্টিগ্রিটি রক্ষা করে যাতে অস্তিত্বহীন প্যারেন্ট আইডির চাইল্ড রেকর্ড তৈরি না হতে পারে।",
          "b": "পোস্টগ্রেস কনস্ট্রেইন্ট ডাটাবেজ স্তরে তথ্যের শুদ্ধতা রক্ষা করে: NOT NULL ফাঁকা মান ঠেকায়, UNIQUE একক মান নিশ্চিত করে, CHECK কাস্টম শর্ত যাচাই করে, DEFAULT পূর্বনির্ধারিত মান বসায় এবং FOREIGN KEY সম্পর্কযুক্ত টেবিলের অখণ্ডতা নিশ্চিত করে।",
          "e": "PostgreSQL constraints enforce data integrity at the database engine level: NOT NULL prohibits nulls, UNIQUE forbids duplicate values, CHECK validates custom conditional logic (`price > 0`), DEFAULT injects fallbacks, and FOREIGN KEY ensures referential consistency.",
          "code": "CREATE TABLE products (\n  id UUID PRIMARY KEY,\n  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),\n  status VARCHAR(20) DEFAULT 'ACTIVE'\n);"
        },
        {
          "lvl": "lvl1",
          "q": "UUID (v4 বা v7) বনাম Auto-incrementing Integer (`SERIAL` / `BIGINT`)-এর মধ্যে প্রাইমারি কি হিসেবে কোনটি কখন বেছে নেবে?",
          "m": "`SERIAL / BIGINT` ইনটিজার ছোট সাইজ (৪-৮ বাইট) হওয়ায় ইনডেক্স মেমোরি খুব কম নেয় এবং কুয়েরি সুপার ফাস্ট। কিন্তু এর সিকিউরিটি ঝুঁকি রয়েছে: ইউআরএলে `/invoices/1`, `/invoices/2` দেখে যে কেউ মোট অর্ডারের সংখ্যা ও বৃদ্ধি অনুমান করতে পারে (Enumeration Attack)। `UUID (v4/v7)` হলো ১২৮-বিট গ্লোবালি ইউনিক স্ট্রিং যা সম্পূর্ণ আনপ্রেডিক্টেবল এবং মাল্টি-সার্ভার ডিস্ট্রিবিউটেড ডাটাবেজে আইডি কনফ্লিক্ট ছাড়া ক্লায়েন্ট সাইড থেকেই জেনারেট করা যায়। আধুনিক পোস্টগ্রেসে `UUID v7` টাইম-অর্ডার্ড হওয়ায় B-Tree ইনডেক্সে ইনটিজারের মতোই সুপারফাস্ট পারফরম্যান্স দেয়।",
          "b": "অটো-ইনক্রিমেন্ট ইনটিজার মেমোরিতে হালকা হলেও ইউআরএল থেকে মোট বিক্রয় সংখ্যা অনুমান করা সহজ হওয়ায় নিরাপত্তা ঝুঁকি থাকে। ইউইউআইডি (UUID) সম্পূর্ণ অপ্রত্যাশিত এবং ডিস্ট্রিবিউটেড সিস্টেমে কনফ্লিক্ট ছাড়া কাজ করে। UUID v7 সময় অনুযায়ী ক্রমানুসারে সাজানো থাকায় আধুনিক স্ট্যান্ডার্ড।",
          "e": "Auto-incrementing integers consume less index RAM (8 bytes) but leak business metrics via enumeration attacks (`/orders/500`). UUIDs (128-bit) guarantee global uniqueness across distributed systems; modern time-ordered UUID v7 maintains B-Tree insertion locality without page fragmentation.",
          "tip": "আধুনিক সিস্টেমে UUID v7 এর সুবিধা (টাইম-অর্ডার্ড B-Tree পারফরম্যান্স) উল্লেখ করা প্রিমিয়াম উত্তর।"
        },
        {
          "lvl": "lvl1",
          "q": "PostgreSQL-এ `TEXT` এবং `VARCHAR(n)`-এর মধ্যে পারফরম্যান্স পার্থক্য কী?",
          "m": "অনেক ডেভেলপার মনে করে `VARCHAR(255)` দিলে বুঝি `TEXT`-এর চেয়ে বেশি ফাস্ট চলে—কিন্তু পোস্টগ্রেসকিউএলে ইন্টারনালি `TEXT` এবং `VARCHAR` হুবহু একই স্টোরেজ ইঞ্জিন ও মেকানিজম (varlena header) ব্যবহার করে! তাদের পারফরম্যান্সে ০% পার্থক্য রয়েছে। `VARCHAR(n)` শুধুমাত্র একটি অতিরিক্ত চেক চালায় যে স্ট্রিংয়ের দৈর্ঘ্য n-এর বেশি কি না। তাই যদি কোনো নির্দিষ্ট ব্যবসায়িক সীমা না থাকে, আধুনিক পোস্টগ্রেসে সরাসরি `TEXT` ব্যবহার করা সবচেয়ে ফ্লেক্সিবল ও পরিষ্কার অভ্যাস।",
          "b": "পোস্টগ্রেসকিউএলে TEXT এবং VARCHAR এর গতিতে কোনো পার্থক্য নেই কারণ উভয়েই অভ্যন্তরীণভাবে একই স্টোরেজ মেকানিজম ব্যবহার করে। VARCHAR শুধুমাত্র সর্বোচ্চ দৈর্ঘ্যের একটি সীমা বজায় রাখে।",
          "e": "In PostgreSQL, `TEXT` and `VARCHAR(n)` share identical underlying storage architectures (`varlena`) with zero performance divergence. `VARCHAR(n)` merely adds a length validation check. Modern PostgreSQL engineering defaults to `TEXT` unless length constraints represent strict business rules.",
          "tip": "পোস্টগ্রেসে VARCHAR(255) কোনো পারফরম্যান্স সুবিধা দেয় না—এটি ইন্টারভিউয়ারদের প্রিয় ট্রিক প্রশ্ন।"
        },
        {
          "lvl": "lvl2",
          "q": "PostgreSQL JSONB ডেটা টাইপ কী এবং সাধারণ `JSON` টাইপের চেয়ে এটি কেন বহুগুণ দ্রুত?",
          "m": "সাধারণ `JSON` ডেটা টাইপ টেক্সট আকারে হুবহু স্ট্রিং সেভ করে, ফলে প্রতিবার কোয়েরি করার সময় পুরো স্ট্রিং পার্স করতে হয় যা খুব স্লো। আর `JSONB` (JSON Binary) ডেটাকে পার্স করে একটি অপটিমাইজড বাইনারি ফরম্যাটে সেভ করে। যদিও ইনসার্ট হতে সামান্য ন্যানো-সেকেন্ড বেশি নেয়, কিন্তু রিড ও কুয়েরি করার গতি প্রায় ১০০ গুণ দ্রুত! সবচেয়ে বড় সুবিধা হলো: JSONB-এর ওপর সরাসরি `GIN` (Generalized Inverted Index) ইনডেক্স তৈরি করা যায়, যার ফলে নেস্টেড JSON ফিল্ডের ওপর সাধারণ কলামের মতোই মিলি-সেকেন্ডে কুয়েরি চালানো সম্ভব।",
          "b": "JSON ডেটা সাধারণ টেক্সট হিসেবে সেভ হয়, কিন্তু JSONB বাইনারি ফরম্যাটে সংরক্ষিত হয়। JSONB এর ওপর GIN ইনডেক্স ব্যবহার করা যায়, ফলে পোস্টগ্রেসের ভেতরেই মঙ্গোডিবির মতো অতি দ্রুত গতিতে নেস্টেড ডক্যুমেন্ট কুয়েরি করা যায়।",
          "e": "PostgreSQL's `JSONB` stores decomposed binary JSON rather than raw text. While ingestion has minor parsing overhead, read operations are orders of magnitude faster. Furthermore, JSONB natively supports GIN indexing for sub-millisecond nested key path lookups.",
          "code": "CREATE TABLE store_configs (\n  id UUID PRIMARY KEY,\n  settings JSONB NOT NULL\n);\nCREATE INDEX idx_settings_gin ON store_configs USING GIN (settings);"
        },
        {
          "lvl": "lvl2",
          "q": "Denormalization (ডিনরমালাইজেশন) কখন করা উচিত এবং এর ভালো ও মন্দ দিক কী?",
          "m": "যখন কোনো সিস্টেমে রিড কুয়েরির চাপ অস্বাভাবিক বেশি থাকে এবং বারংবার ৫-১০টি টেবিল `JOIN` করতে গিয়ে ডাটাবেজ স্লো হয়ে যায়, তখন পারফরম্যান্স বাড়ানোর জন্য ইচ্ছাকৃতভাবে কিছু ডুপ্লিকেট ডেটা রাখা হয় যাকে Denormalization বলে (যেমন: প্রোডাক্ট টেবিলে প্রতিবার সেলস টেবিল না গুনে সরাসরি `totalSold` বা `categoryName` কলাম রাখা)। ভালো দিক: কুয়েরি সুপার ফাস্ট হয় এবং কোনো JOIN লাগে না। মন্দ দিক: ডেটা আপডেটের সময় সব ডুপ্লিকেট কলাম একসাথে আপডেট না করলে ডেটা ইনকনসিস্টেন্ট হয়ে যাওয়ার বড় ঝুঁকি থাকে।",
          "b": "বারংবার জটিল জয়েন (JOIN) এড়িয়ে রিড পারফরম্যান্স বাড়াতে ইচ্ছাকৃতভাবে ডুপ্লিকেট কলাম সংরক্ষণ করাকে ডিনরমালাইজেশন বলে। এটি পড়ার গতি বাড়ালেও লেখার সময় সব জায়গায় সিঙ্ক না করলে ডেটা অমিলের ঝুঁকি থাকে।",
          "e": "Denormalization deliberately introduces calculated redundancy to bypass expensive multi-table JOINs in read-intensive systems (e.g. caching `orderCount` on a User record). While accelerating reads, it demands rigorous synchronization during updates to prevent data inconsistencies.",
          "tip": "ইন্টারভিউতে 'Read optimization vs Write synchronization overhead' এর ট্রেডঅফ বলবে।"
        },
        {
          "lvl": "lvl2",
          "q": "PostgreSQL Sequences কী এবং `BIGSERIAL` বনাম `GENERATED ALWAYS AS IDENTITY` এর আধুনিক ব্যবহার কী?",
          "m": "পোস্টগ্রেস সিকোয়েন্স হলো একটি ইন-মেমোরি কাউন্টার যা প্রতি রিকোয়েস্টে পরবর্তী ইউনিক সংখ্যা জেনারেট করে (`nextval`). পুরানো দিনে `SERIAL` বা `BIGSERIAL` ব্যবহার করা হতো যা ইন্টারনালি একটি অটো সিকোয়েন্স টেবিল বানাত। কিন্তু SQL:2003 আন্তর্জাতিক স্ট্যান্ডার্ড অনুযায়ী আধুনিক পোস্টগ্রেসে `GENERATED ALWAYS AS IDENTITY` বা `GENERATED BY DEFAULT AS IDENTITY` ব্যবহার করা হয়। এটি সরাসরি এসকিউএল স্ট্যান্ডার্ড মেনে চলে এবং ব্যবহারকারী ভুল করে ম্যানুয়াল আইডি ইনসার্ট করার চেষ্টা করলে শক্তভাবে গার্ড করে।",
          "b": "আধুনিক পোস্টগ্রেসে পুরনো SERIAL এর বদলে এসকিউএল স্ট্যান্ডার্ড মেনে GENERATED ALWAYS AS IDENTITY ব্যবহার করা হয়। এটি স্বয়ংক্রিয় ইউনিক ক্রম তৈরি করে এবং ভুল ম্যানুয়াল মান ইনসার্ট হওয়া থেকে সুরক্ষিত রাখে।",
          "e": "SQL:2003 standardized `GENERATED ALWAYS AS IDENTITY` over legacy `SERIAL` types. Identity columns automatically manage backing sequences under the hood while preventing unintended manual ID overrides without explicit override clauses.",
          "code": "CREATE TABLE orders (\n  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  total NUMERIC(10, 2)\n);"
        },
        {
          "lvl": "lvl2",
          "q": "PostgreSQL-এ `NUMERIC` (বা `DECIMAL`) বনাম `FLOAT` / `REAL`-এর মধ্যে পার্থক্য কী এবং আর্থিক হিসাবে কোনটি বাধ্যতামূলক?",
          "m": "`FLOAT` এবং `REAL` হলো বাইনারি ফ্লোটিং পয়েন্ট যা দ্রুত হলেও রাউন্ডিং এরর তৈরি করে (যেমন `0.1 + 0.2 != 0.3`)। আর্থিক হিসাব, ব্যাংকিং বা পিওএস সিস্টেমে ১ পয়সার ভুলও ফৌজদারি অপরাধ হতে পারে। `NUMERIC(precision, scale)` হলো Exact Numeric Data Type যা কোনো ফ্লোটিং পয়েন্ট ফ্র্যাকশন নষ্ট করে না এবং নির্ভুল দশমিক সংরক্ষণ করে (যেমন `NUMERIC(14, 2)` মানে মোট ১৪ ডিজিট যার মধ্যে দশমিকের পর ২ ডিজিট)। আর্থিক ডাটায় সর্বদা `NUMERIC` বাধ্যতামূলক।",
          "b": "ফ্লোট বা রিয়েল ডাটা টাইপ আনুমানিক মান দেয় যা আর্থিক হিসাবে ভুল তৈরি করে। NUMERIC বা DECIMAL নির্ভুল ভগ্নাংশ সংরক্ষণ করে, তাই টাকা-পয়সার সমস্ত হিসাবে NUMERIC ব্যবহার করা আন্তর্জাতিক নিয়ম।",
          "e": "`FLOAT` and `REAL` are IEEE 754 approximate types prone to binary rounding drift. Financial ledgers strictly mandate `NUMERIC(precision, scale)` (arbitrary-precision exact arithmetic), guaranteeing exact decimal calculations down to the smallest Poisha/Cent.",
          "tip": "কখনোই আর্থিক কলামে FLOAT ব্যবহার করবে না; সবসময় NUMERIC(12, 2) বা ইনটিজার সেন্ট ব্যবহার করবে।"
        },
        {
          "lvl": "lvl2",
          "q": "PostgreSQL Generated Columns (Stored vs Virtual) কীভাবে কাজ করে?",
          "m": "Generated Column হলো এমন একটি কলাম যার মান অন্য কলামগুলোর মানের ওপর ভিত্তি করে স্বয়ংক্রিয়ভাবে হিসাব হয়। পোস্টগ্রেসে `STORED` জেনারেটেড কলাম রয়েছে: যখনই কোনো রো ইনসার্ট বা আপডেট হয়, ডাটাবেজ এক্সপ্রেশনটি মূল্যায়ন করে মানটি ডিস্কে সেভ করে রাখে। যেমন: `total_price NUMERIC GENERATED ALWAYS AS (unit_price * quantity) STORED`। এর ফলে প্রতিবার অ্যাপ্লিকেশনে হিসাব করতে হয় না, এবং এই জেনারেটেড কলামের ওপর সরাসরি ইনডেক্স তৈরি করা যায় যা কুয়েরি পারফরম্যান্সকে আকাশচুম্বী করে।",
          "b": "জেনারেটেড কলাম অন্য কলামের মানের ওপর ভিত্তি করে নিজে থেকেই হিসাব হয়ে ডিস্কে সংরক্ষিত থাকে। যেমন দাম ও পরিমাণের গুণফল স্বয়ংক্রিয়ভাবে টোটাল কলামে বসে যায় এবং এর ওপর ইনডেক্স করে দ্রুত কুয়েরি চালানো যায়।",
          "e": "PostgreSQL supports Stored Generated Columns (`GENERATED ALWAYS AS (expr) STORED`). The engine evaluates the deterministic expression during INSERT/UPDATE and persists the result on disk, enabling direct B-Tree indexing on derived calculations.",
          "code": "CREATE TABLE sales_items (\n  qty INT NOT NULL,\n  unit_price NUMERIC(10,2) NOT NULL,\n  line_total NUMERIC(10,2) GENERATED ALWAYS AS (qty * unit_price) STORED\n);"
        },
        {
          "lvl": "lvl3",
          "q": "PostgreSQL Declarative Table Partitioning (Range, List, Hash) কীভাবে শত কোটি রো বিশিষ্ট টেবিলে পারফরম্যান্স অক্ষুণ্ণ রাখে?",
          "m": "একটি টেবিলে যখন ১০ কোটির বেশি রো থাকে, সাধারণ ইনডেক্স মেমোরিতে ধরে রাখা অসম্ভব হয়ে যায়। Declarative Partitioning পুরো টেবিলকে লজিক্যালি ছোট ছোট ফিজিক্যাল টেবিলে (Partitions) ভাগ করে ফেলে: (১) `Range Partitioning`: তারিখ অনুযায়ী ভাগ করা (যেমন প্রতি মাসের জন্য আলাদা পার্টিশন)। (২) `List Partitioning`: নির্দিষ্ট তালিকা অনুযায়ী (যেমন বিভাগ বা দেশ অনুযায়ী)। (৩) `Hash Partitioning`: হ্যাশ কি অনুযায়ী সমানভাবে ডিস্ট্রিবিউট করা। যখন কোনো কুয়েরি নির্দিষ্ট তারিখ দিয়ে খোঁজে, পোস্টগ্রেস 'Partition Pruning' মেকানিজমে বাকি ৯৯টি পার্টিশন সম্পূর্ণ স্কিপ করে শুধুমাত্র ওই ১টি পার্টিশন থেকে মাত্র কয়েক মিলিসেকেন্ডে রেজাল্ট এনে দেয়।",
          "b": "টেবিল পার্টিশনিং বিশাল টেবিলকে তারিখ বা অঞ্চলের ভিত্তিতে ছোট ছোট পৃথক ফিজিক্যাল টেবিলে বিভক্ত করে। পার্টিশন প্রুনিংয়ের কারণে পোস্টগ্রেস অপ্রয়োজনীয় পার্টিশন স্ক্যান না করে শুধুমাত্র নির্দিষ্ট অংশের মধ্যে অতি দ্রুত কুয়েরি সম্পন্ন করে।",
          "e": "Declarative Partitioning splits monolithic multi-billion-row tables into physical shards via Range, List, or Hash strategies. During queries, Partition Pruning eliminates irrelevant table partitions from the query execution tree, shrinking I/O to targeted partition chunks.",
          "code": "CREATE TABLE transactions (\n  id UUID NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL\n) PARTITION BY RANGE (created_at);\nCREATE TABLE trans_2024_01 PARTITION OF transactions FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');"
        },
        {
          "lvl": "lvl3",
          "q": "PostgreSQL TOAST (The Oversized-Attribute Storage Technique) কীভাবে মেগা-সাইজ ফিল্ডস হ্যান্ডেল করে?",
          "m": "পোস্টগ্রেসকিউএলে ডাটাবেজের পেজ সাইজ ফিক্সড ৮KB। যদি কোনো রো-তে একটি বড় টেক্সট, JSONB বা ছবি থাকে যার সাইজ ৮KB-এর চেয়ে বেশি (যেমন ২KB-র বেশি হলেই থ্রেশহোল্ড ধরে), পোস্টগ্রেস তাকে সাধারণ পেজে না রেখে TOAST মেকানিজমে পাঠায়। এটি ডেটাকে প্রথমে স্বয়ংক্রিয়ভাবে কমপ্রেস করে; তাতেও না আটলে মূল টেবিলের বাইরে একটি আলাদা হিডেন 'TOAST Table'-এ চাঙ্ক আকারে স্টোর করে এবং মূল টেবিলে একটি ছোট পয়েন্টার রেখে দেয়। এর ফলে বড় ফিল্ড থাকলেও মূল টেবিল স্ক্যান করার সময় ডিস্ক I/O দ্রুত থাকে।",
          "b": "পোস্টগ্রেসের পেজ সাইজ ৮ কেবি। বড় টেক্সট বা ফাইল আসলে টোস্ট (TOAST) মেকানিজম স্বয়ংক্রিয়ভাবে ডাটা কমপ্রেস করে আলাদা লুকানো টেবিলে সংরক্ষণ করে মূল টেবিলে পয়েন্টার রাখে, ফলে সাধারণ টেবিল স্ক্যানের গতি বজায় থাকে।",
          "e": "PostgreSQL pages are 8KB in size. Attributes exceeding the TOAST threshold (typically 2KB) are compressed and, if still oversized, moved out-of-line into a backing auxiliary TOAST table, preserving a compact pointer on the main heap tuple to keep sequential scans fast.",
          "tip": "TOAST মেকানিজম ব্যাখ্যা করা পোস্টগ্রেসকিউএলের গভীর ইন্টারনালস জানার প্রমাণ।"
        },
        {
          "lvl": "lvl3",
          "q": "Composite Primary Keys বনাম Surrogate Keys: কখন কম্পোজিট কি ডিজাইন আর্কিটেকচারালি সুপিরিয়র?",
          "m": "Surrogate Key হলো একটি কৃত্রিম আইডি (যেমন অটো-ইনক্রিমেন্ট বা UUID) যার নিজস্ব কোনো ব্যবসায়িক অর্থ নেই। আর Composite Primary Key হলো একাধিক প্রাকৃতিক কলামের সমন্বয় যা একসাথে ইউনিকনেস নিশ্চিত করে (যেমন জংশন টেবিলে `(studentId, courseId)` বা মাল্টি-টেন্যান্ট টেবিলে `(tenantId, invoiceNumber)`। জংশন টেবিল ও মাল্টি-টেন্যান্ট পার্টিশনিংয়ে Composite Key সুপিরিয়র কারণ: এটি আলাদা ইনডেক্স স্পেস নষ্ট না করেই ডুপ্লিকেট সম্পর্ক প্রতিহত করে এবং ক্লাস্টার্ড লুকআপে ক্যাশ লোকালিটি অনেক বাড়ায়।",
          "b": "কম্পোজিট প্রাইমারি কি একাধিক কলামের সমন্বয়ে গঠিত হয়। জংশন টেবিল বা মাল্টি-টেন্যান্ট পার্টিশনে এটি অপ্রয়োজনীয় সারোগেট কি বাদ দিয়ে সরাসরি ডেটার অনন্যতা নিশ্চিত করে এবং মেমোরি সাশ্রয় করে।",
          "e": "Surrogate keys introduce synthetic artificial IDs. Composite Primary Keys (`(tenantId, orderId)`) excel in junction tables and multi-tenant domain models by naturally preventing duplicate relationships while ensuring index co-locality without allocating secondary index overhead.",
          "code": "CREATE TABLE tenant_invoices (\n  tenant_id UUID NOT NULL,\n  invoice_no INT NOT NULL,\n  PRIMARY KEY (tenant_id, invoice_no)\n);"
        },
        {
          "lvl": "lvl3",
          "q": "PostgreSQL Custom Domain Types এবং ENUM Types কীভাবে ডাটাবেজ স্তরে টাইপ ভ্যালিডেশন নিশ্চিত করে?",
          "m": "আমরা শুধু সাধারণ `VARCHAR` না দিয়ে পোস্টগ্রেসে কাস্টম টাইপ তৈরি করতে পারি: (১) `ENUM`: `CREATE TYPE order_status AS ENUM ('PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED');`—এটি বাইনারি ৪-বাইটে স্টোর হয় এবং ভুল স্ট্রিং লিখলে ডাটাবেজ এরর দেয়। (২) `DOMAIN`: একটি বেস টাইপের ওপর কাস্টম কনস্ট্রেইন্ট বসিয়ে ডোমেন তৈরি করা যায়, যেমন: `CREATE DOMAIN bd_phone AS TEXT CHECK (VALUE ~ '^01[3-9]\\d{8}$');`। এর ফলে পুরো ডাটাবেজের যেকোনো টেবিলে এই ডোমেন ব্যবহার করলে স্বয়ংক্রিয়ভাবে ভ্যালিডেশন এনফোর্স হয়ে যায়।",
          "b": "কাস্টম ডোমেন ও এনাম পোস্টগ্রেসকে কাস্টম টাইপ তৈরির ক্ষমতা দেয়। এনাম ফিক্সড তালিকা নিশ্চিত করে মেমোরি বাঁচায় এবং ডোমেন টাইপ রেগুলার এক্সপ্রেশন কনস্ট্রেইন্ট যুক্ত করে ডাটাবেজ স্তরেই ফোন নম্বর বা ইমেইলের নির্ভুলতা নিশ্চিত করে।",
          "e": "PostgreSQL DOMAINs wrap underlying types with reusable CHECK constraints (e.g. regex for phone validation), while ENUM types store categorized string literals as compact 4-byte internal integers, guaranteeing strict domain integrity.",
          "code": "CREATE TYPE order_status AS ENUM ('DRAFT', 'PAID', 'VOID');\nCREATE DOMAIN positive_amount AS NUMERIC(12,2) CHECK (VALUE >= 0);"
        },
        {
          "lvl": "lvl3",
          "q": "Row-Level Security (RLS) পোস্টগ্রেসকিউএলে ইন্টারনালি কীভাবে কাজ করে এবং কীভাবে ডাটাবেজ কার্নেল লেভেলে টেন্যান্ট আইসোলেশন এনফোর্স করে?",
          "m": "সাধারণ সিস্টেমে অ্যাপ্লিকেশন কোডে `WHERE tenant_id = '...'` লিখতে ভুল হলে অন্য টেন্যান্টের ডাটা ফাঁস হয়ে যায়। PostgreSQL RLS অন করলে (`ALTER TABLE orders ENABLE ROW LEVEL SECURITY`) ডাটাবেজ ইঞ্জিন স্বয়ংক্রিয়ভাবে প্রতিটি কুয়েরিতে সিকিউরিটি পলিসি ইনজেক্ট করে: `CREATE POLICY tenant_isolation_policy ON orders USING (tenant_id = current_setting('app.current_tenant_id')::uuid)`। এমনকি একজন ডেভেলপার যদি ভুল করে `SELECT * FROM orders` কুয়েরিও চালায়, পোস্টগ্রেস ডাটাবেজ কার্নেল নিজে থেকেই ফিল্টার করে শুধুমাত্র বর্তমান সেশনের টেন্যান্টের ডাটাই রিটার্ন করবে! ডেটা লিক হওয়া অসম্ভব।",
          "b": "রো-লেভেল সিকিউরিটি পোস্টগ্রেস ডাটাবেজের ভেতরেই নিরাপত্তা নীতি এনফোর্স করে। অ্যাপ্লিকেশন কোডে ভুল ফিল্টার দিলেও পোস্টগ্রেস কার্নেল স্বয়ংক্রিয়ভাবে সেশনের টেন্যান্ট আইডি অনুযায়ী ডাটা ফিল্টার করে ডেটা লিক পুরোপুরি বন্ধ করে।",
          "e": "PostgreSQL Row-Level Security (RLS) injects security predicates at the query planner level. Policies evaluating session variables (`current_setting('app.current_tenant')`) ensure queries are restricted to authenticated tenant rows even if application developers omit WHERE clauses.",
          "code": "ALTER TABLE orders ENABLE ROW LEVEL SECURITY;\nCREATE POLICY tenant_policy ON orders USING (tenant_id = current_setting('app.tenant_id')::uuid);"
        },
        {
          "lvl": "situation",
          "q": "ডাটাবেজ মাইগ্রেশন চালানোর সময় টেবিলে `ALTER TABLE orders ADD COLUMN status VARCHAR NOT NULL DEFAULT 'PENDING'` দিতে গিয়ে কোটি রো-এর টেবিল ১০ মিনিট লক হয়ে পুরো প্রোডাকশন ডাউন হয়ে গেল। কীভাবে ফিক্স করবে?",
          "m": "কারণ: পোস্টগ্রেস ১১-এর আগের ভার্সনে বা কিছু কনফিগারেশনে `NOT NULL DEFAULT` দিলে পোস্টগ্রেস পুরো টেবিলের কোটি রো-কে রি-রাইট করার জন্য 'AccessExclusiveLock' নেয় যা রিড ও রাইট উভয়ই ব্লক করে দেয়। সমাধান: নিরাপদ ৩-পদক্ষেপ মাইগ্রেশন: (১) প্রথমে কলামটি ডিফল্ট মান সহ nullable হিসেবে যোগ করা: `ADD COLUMN status VARCHAR DEFAULT 'PENDING';` (পোস্টগ্রেস ১১+ এ এটি ও(১) মেটাডাটা আপডেট)। (২) ব্যাকগ্রাউন্ডে ব্যাচ আকারে ডেটা ফিল করা। (৩) শেষে `ALTER TABLE orders ALTER COLUMN status SET NOT NULL;` দিয়ে নট-নাল কনস্ট্রেইন্ট এনফোর্স করা। কোনো টেবিল লক হবে না।",
          "b": "কোটি রো-এর টেবিলে নট-নাল ডিফল্ট দিলে এক্সক্লুসিভ লক লেগে ডাউনটাইম হয়। প্রথমে কলামটি নাল্যাবল হিসেবে যোগ করে ব্যাকগ্রাউন্ডে আপডেট সম্পন্ন করে পরবর্তীতে নট-নাল সেট করলে কোনো টেবিল লক ছাড়াই জিরো ডাউনটাইমে পরিবর্তন সম্ভব।",
          "e": "Acquiring an `AccessExclusiveLock` stalls all concurrent reads and writes. Mitigate by adding the column with a default but without the NOT NULL constraint initially (O(1) catalog update in Postgres 11+), backfilling asynchronously, and applying NOT NULL subsequently.",
          "code": "ALTER TABLE orders ADD COLUMN status VARCHAR DEFAULT 'PENDING';\n-- Then later:\nALTER TABLE orders ALTER COLUMN status SET NOT NULL;"
        },
        {
          "lvl": "situation",
          "q": "দুটি টেবিলের মধ্যে Many-to-Many রিলেশনশিপে একই ডুপ্লিকেট রেকর্ড বারবার ইনসার্ট হয়ে জংশন টেবিল নষ্ট হচ্ছে। কীভাবে স্কিমা লেভেলে স্থায়ী সমাধান করবে?",
          "m": "সমাধান: জংশন টেবিলে কোনো সিঙ্গেল সারোগেট আইডি রাখার চেয়ে দুটি ফরেন কি কলামের ওপর একটি Composite Primary Key অথবা Composite Unique Constraint এনফোর্স করতে হবে: `PRIMARY KEY (student_id, course_id)` অথবা `CONSTRAINT uq_student_course UNIQUE (student_id, course_id)`। এর ফলে অ্যাপ্লিকেশন থেকে ভুল করে একই এনরোলমেন্ট বারবার পাঠালেও ডাটাবেজ স্তর স্বয়ংক্রিয়ভাবে ডুপ্লিকেট ইনসার্ট রিজেক্ট করে `P2002` কনফ্লিক্ট এরর দেবে।",
          "b": "জংশন টেবিলে student_id এবং course_id এর ওপর কম্পোজিট প্রাইমারি কি বা ইউনিক কনস্ট্রেইন্ট ব্যবহার করতে হবে। এর ফলে ডাটাবেজ নিজেই ডুপ্লিকেট সম্পর্ক আটকিয়ে তথ্যের অখণ্ডতা নিশ্চিত করবে।",
          "e": "Eliminate duplicate relations in junction tables by designating a Composite Primary Key over both foreign keys (`PRIMARY KEY (user_id, role_id)`) or applying a Composite UNIQUE constraint, pushing deduplication enforcement onto database engine primitives.",
          "code": "CREATE TABLE user_roles (\n  user_id UUID REFERENCES users(id) ON DELETE CASCADE,\n  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,\n  PRIMARY KEY (user_id, role_id)\n);"
        },
        {
          "lvl": "situation",
          "q": "একটি পোস্টগ্রেস টেবিলে কোটি কোটি ডিলিট এবং আপডেটের কারণে টেবিলের ডিস্ক সাইজ ১০০GB হয়ে গেছে অথচ আসল ডেটা মাত্র ১০GB (Table Bloat)। কীভাবে সমাধান করবে?",
          "m": "কারণ: PostgreSQL-এর MVCC (Multi-Version Concurrency Control) মডেলে `UPDATE` বা `DELETE` করলে পুরানো রো ডিস্ক থেকে সরাসরি মুছে যায় না; এটি 'Dead Tuple' হিসেবে ডিস্কে থেকে যায়। সমাধান: (১) অটো-ভ্যাকুয়াম ঠিকমতো কাজ করছে কি না চেক করা। (২) প্রোডাকশনে ডাউনটাইম ছাড়া স্পেস রিক্লেইম করতে `VACUUM (ANALYZE)` চালাব। (৩) টেবিল সাইজ ডিস্কে পুরোপুরি সংকুচিত করতে জিরো-ডাউনটাইম টুল `pg_repack` ব্যবহার করব (যা টেবিল লক না করে ফ্রেশ কপি তৈরি করে সোয়াপ করে দেয়)।",
          "b": "পোস্টগ্রেসে আপডেট ও ডিলিট ডেড টিউপল তৈরি করে টেবিল ব্লোট সৃষ্টি করে। pg_repack টুল ব্যবহার করে লাইভ প্রোডাকশনে কোনো টেবিল লক না করেই বাড়তি ৯০ জিবি খালি জায়গা উদ্ধার করে পারফরম্যান্স ফিরিয়ে আনা যায়।",
          "e": "PostgreSQL's MVCC architecture marks modified tuples as dead, causing Table Bloat if autovacuum lags behind. Reclaim dead disk space without table locks using `pg_repack`, an online reorganization utility that rebuilds bloated tables concurrently without downtime.",
          "code": "VACUUM ANALYZE orders;\n-- For online zero-lock bloat reclamation:\npg_repack -d dokani_db -t orders"
        },
        {
          "lvl": "situation",
          "q": "ব্যবহারকারী একটি বড় টেক্সট কলামে সার্চ করার সময় `LIKE '%search%'` দিয়ে কুয়েরি করায় প্রতি সার্চে ৫ সেকেন্ড সময় নিচ্ছে। কীভাবে অপটিমাইজ করবে?",
          "m": "কারণ: শুরুতে ওয়াইল্ডকার্ড (`%search`) থাকলে সাধারণ B-Tree ইনডেক্স কাজ করতে পারে না এবং পুরো কোটি রো-এর ওপর Sequential Scan চালায়। সমাধান: PostgreSQL-এর `pg_trgm` (Trigram) এক্সটেনশন সক্রিয় করব এবং একটি `GIN` ইনডেক্স তৈরি করব: `CREATE INDEX idx_products_name_trgm ON products USING GIN (name gin_trgm_ops);`। Trigram ইনডেক্স স্ট্রিংকে ৩-অক্ষরের চাঙ্কে ইনডেক্স করে, ফলে সাবস্ট্রিং সার্চ এবং ফাজি ম্যাচিং ৫ সেকেন্ড থেকে কমে মাত্র ৫ মিলিসেকেন্ডে সম্পন্ন হয়।",
          "b": "লাইক কুয়েরিতে শুরুতে % থাকলে বি-ট্রি ইনডেক্স কাজ করে না। পোস্টগ্রেসের pg_trgm এক্সটেনশন চালু করে ট্রাইগ্রাম GIN ইনডেক্স বসালে সাবস্ট্রিং ও আংশিক সার্চ চোখের পলকে সম্পন্ন হয়।",
          "e": "Leading wildcard queries (`%term%`) invalidate standard B-Tree indexes, triggering exhaustive sequential scans. Enable the `pg_trgm` extension and apply a GIN Trigram index (`USING GIN (col gin_trgm_ops)`), reducing fuzzy substring queries down to single-digit milliseconds.",
          "code": "CREATE EXTENSION IF NOT EXISTS pg_trgm;\nCREATE INDEX idx_prod_trgm ON products USING GIN (name gin_trgm_ops);"
        },
        {
          "lvl": "situation",
          "q": "ডাটাবেজে হাজার হাজার কাস্টমারের বার্থডে সেভ করা আছে `TIMESTAMP` হিসেবে। টাইমজোনের ভিন্নতার কারণে একেক দেশের ইউজারের জন্মতারিখ একদিন আগে-পরে সরে যাচ্ছে। সঠিক সমাধান কী?",
          "m": "কারণ: জন্মতারিখ কোনো নির্দিষ্ট টাইমস্ট্যাম্প (মুহূর্ত) নয়; এটি একটি ক্যালেন্ডার ডেট। সমাধান: (১) জন্মতারিখ সংরক্ষণের জন্য কখনোই `TIMESTAMP` বা `TIMESTAMPTZ` ব্যবহার করা যাবে না; শুধুমাত্র খাঁটি `DATE` ডেটা টাইপ ব্যবহার করতে হবে। (২) আর যেসব ক্ষেত্রে আসল ইভেন্টের মুহূর্ত প্রয়োজন (যেমন লেনদেন সম্পন্ন হওয়ার সময়), সেখানে সর্বদা `TIMESTAMPTZ` (Timestamp with Time Zone) ব্যবহার করতে হবে যা ডাটাবেজে সর্বদা UTC আকারে সেভ থাকে এবং ক্লায়েন্টের লোকাল টাইমজোনে কনভার্ট হয়।",
          "b": "জন্মতারিখের জন্য কখনোই টাইমস্ট্যাম্প ব্যবহার করা উচিত নয়, খাঁটি DATE টাইপ ব্যবহার করতে হবে যা টাইমজোনের পরিবর্তনে প্রভাবিত হয় না। অন্যদিকে লেনদেনের জন্য সর্বদা TIMESTAMPTZ ব্যবহার করতে হবে যা ইউটিসি মান ধরে রাখে।",
          "e": "Calendar dates (birthdays) are timezone-independent and must strictly use the `DATE` data type. For precise point-in-time domain events (invoices, audit logs), always use `TIMESTAMPTZ` which normalizes storage to UTC internally.",
          "code": "birth_date DATE NOT NULL,\ncreated_at TIMESTAMPTZ DEFAULT NOW()"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর মাল্টি-টেন্যান্ট ডেটাবেজ স্কিমায় দোকান, পণ্য, ইনভেন্টরি, সেলস ও গ্রাহকের টেবিল রিলেশনশিপ কীভাবে আর্কিটেক্ট করেছিলে?",
          "m": "আমাদের আর্কিটেকচারাল রিলেশনশিপ ছিল: (১) `Tenants` (দোকান মাস্টার)। (২) `Users` (1:N with Tenant, রোল: Owner, Manager, Cashier)। (৩) `Products` (1:N with Tenant, ক্যাটালগ ও বারকোড)। (৪) `StockBatches` (1:N with Product, ক্রয়মূল্য ও মেয়াদ)। (৫) `Invoices` (1:N with Tenant, 1:N with Customer, মাস্টার সেলস)। (৬) `InvoiceItems` (1:N with Invoice, 1:N with Product)। (৭) `CustomerLedger` (1:N with Customer, বাকি ও পেমেন্ট হিস্ট্রি)। প্রতিটি টেবিলে `tenantId` কম্পোজিট ইনডেক্স থাকায় শতভাগ ডেটা আইসোলেশন ও উচ্চগতি নিশ্চিত ছিল।",
          "b": "দোকানি স্কিমাতে টেন্যান্টের অধীনে ইউজার, প্রোডাক্ট, স্টক ব্যাচ, ইনভয়েস এবং কাস্টমার লেজার পরস্পরের সাথে ফরেন কি দিয়ে সুসংগঠিত ছিল। প্রতিটি টেবিলে টেন্যান্ট আইডি কম্পোজিট ইনডেক্স ডেটার দ্রুততা ও পূর্ণ নিরাপত্তা বজায় রেখেছিল।",
          "e": "Architected Dokani POS relational schema: Tenants as roots, 1:N with Products, StockBatches, and Invoices. Invoices related 1:N to LineItems and Customers, backed by CustomerLedgers. All child entities carried indexed composite foreign keys to tenant roots.",
          "tip": "একটি পূর্ণাঙ্গ পিওএস সিস্টেমের ডেটাবেজ ইআরডি (ERD) মুখে স্পষ্টভাবে বর্ণনা করা টেক লিডদের সিগনেচার দক্ষতা।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ শত শত স্টোরের প্রোডাক্ট ক্যাটালগে ক্যাটাগরি, ব্র্যান্ড ও সাপ্লায়ার ম্যানেজমেন্টে ডেটা নরমালাইজেশন কীভাবে রক্ষা করেছিলে?",
          "m": "আমরা ক্যাটাগরি ও ব্র্যান্ডের নাম প্রোডাক্ট টেবিলে সরাসরি স্ট্রিং আকারে না রেখে `Categories`, `Brands`, এবং `Suppliers` টেবিল আলাদা করে 3NF নরমাল ফর্ম রক্ষা করেছি। প্রোডাক্ট টেবিলে শুধু তাদের ফরেন কি আইডি ছিল। এতে সুবিধা হলো: দোকানদার যদি একটি ব্র্যান্ডের নাম বা লোগো আপডেট করে, তবে ১টি মাত্র রো আপডেট হতো—লাখ লাখ প্রোডাক্টে ম্যানুয়াল পরিবর্তন লাগত না। আর ফাস্ট এপিআই রেসপন্সের জন্য Prisma-র `include: { category: true, brand: true }` দিয়ে অপটিমাইজড জয়েন করেছি।",
          "b": "ক্যাটাগরি ও ব্র্যান্ডের জন্য পৃথক টেবিল তৈরি করে আমরা ৩য় নরমাল ফর্ম নিশ্চিত করেছি। এর ফলে ব্র্যান্ডের নাম বদলালে একটি মাত্র রো পরিবর্তনের মাধ্যমেই সব প্রোডাক্টে স্বয়ংক্রিয়ভাবে সঠিক নাম প্রদর্শিত হতো।",
          "e": "Preserved 3NF normalization in Dokani by isolating Categories, Brands, and Suppliers into distinct entities referenced via foreign keys. Updating supplier metadata modified a single row, propagating cleanly without mutating millions of product rows.",
          "code": "model Product {\n  id         String   @id @default(uuid())\n  tenantId   String\n  name       String\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n}"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে লাখ লাখ ছাত্রের কোর্স প্রোগ্রেস ও কুইজ সাবমিশন ট্র্যাকিংয়ে PostgreSQL Schema কীভাবে ডিজাইন করেছিলে?",
          "m": "আমরা একটি হাইব্রিড রিলেশনাল মডেল বানিয়েছি: `Course` -> `Chapter` -> `Lesson` (1:N হায়ারার্কি)। ছাত্রের প্রোগ্রেস ট্র্যাক করতে `LessonProgress` টেবিলে `(studentId, lessonId)`-এর ওপর Composite Primary Key ছিল যাতে ডুপ্লিকেট রো তৈরি না হয়। আর কুইজের জন্য: প্রতিটি সাবমিশনে একটি `QuizSubmission` তৈরি হতো এবং ছাত্রের দেওয়া সমস্ত উত্তরের বিস্তারিত একটি অপটিমাইজড `JSONB` কলামে সেভ করা হতো। এর ফলে রিলেশনাল ইন্টিগ্রিটিও রক্ষা পেয়েছে এবং কুইজের পরিবর্তনশীল প্রশ্ন উত্তরের জটিল জয়েনিংও এড়ানো গেছে।",
          "b": "পিটিটিএবিডিতে কোর্স ও লেকচারের জন্য রিলেশনাল মডেল এবং ছাত্রের বিস্তারিত উত্তরের জন্য JSONB ডেটা টাইপ সমন্বয় করা হয়েছিল। কম্পোজিট কি ব্যবহারের ফলে প্রোগ্রেস ডুপ্লিকেশন বন্ধ হয়েছিল এবং দ্রুত রিপোর্ট পাওয়া যেত।",
          "e": "Engineered PTTABD learning schemas combining relational hierarchies (Courses -> Chapters -> Lessons) with Composite PKs on `LessonProgress(studentId, lessonId)`. Stored granular quiz option answers inside structured `JSONB` columns to avert relational join bloat.",
          "tip": "রিলেশনাল মডেলের সাথে JSONB কলামের হাইব্রিড কম্বিনেশন আধুনিক পোস্টগ্রেস আর্কিটেকচারের সবচেয়ে পাওয়ারফুল প্যাটার্ন।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ প্রতিদিনের শত শত সেলস ইনভয়েস থেকে কাস্টমার লেজার এবং অ্যাকাউন্টিং রিপোর্ট তৈরির জন্য SQL Materialized Views কীভাবে ব্যবহার করেছিলে?",
          "m": "প্রতিদিন কোটি কোটি রো-এর ওপর বারবার `SUM()`, `GROUP BY` চালিয়ে সেলস সামারি বের করলে ডাটাবেজ স্লো হয়ে যেত। আমরা PostgreSQL-এর `Materialized View` তৈরি করেছি: `CREATE MATERIALIZED VIEW mv_daily_sales AS SELECT tenant_id, date_trunc('day', created_at) as sale_date, SUM(total) as revenue FROM invoices GROUP BY 1, 2`। এবং এর ওপর ইউনিক ইনডেক্স তৈরি করে প্রতি রাতে ক্রন জবে `REFRESH MATERIALIZED VIEW CONCURRENTLY mv_daily_sales;` দিয়েছি। এর ফলে রিফ্রেশের সময় কোনো টেবিল লক না হয়েই ১ সেকেন্ডের মধ্যে প্রি-ক্যালকুলেটেড রিপোর্ট পাওয়া যেত।",
          "b": "প্রতিদিনের সেলস রিপোর্টের গতি বাড়াতে মেটেরিয়ালাইজড ভিউ ব্যবহার করা হয়েছিল। প্রতি রাতে কনকারেন্টলি ভিউ রিফ্রেশ করায় কোনো টেবিল লক ছাড়াই মুহূর্তের মধ্যে প্রি-ক্যালকুলেটেড সেলস অ্যানালিটিক্স সরবরাহ করা সম্ভব হয়েছিল।",
          "e": "Accelerated Dokani analytics via PostgreSQL Materialized Views pre-aggregating daily sales totals. Scheduled cron workers refreshed the views concurrently (`REFRESH MATERIALIZED VIEW CONCURRENTLY`) without locking ongoing checkout transactions.",
          "code": "CREATE MATERIALIZED VIEW mv_store_sales AS\nSELECT tenant_id, SUM(grand_total) as total_revenue, COUNT(*) as invoice_count\nFROM invoices GROUP BY tenant_id;\nCREATE UNIQUE INDEX idx_mv_store ON mv_store_sales(tenant_id);"
        },
        {
          "lvl": "realworld",
          "q": "পোস্টগ্রেসকিউএল ডাটাবেজ আর্কিটেকচার ও স্কিমা ডিজাইনে টিম কোয়ালিটি রক্ষার জন্য তোমার মূল ফিলোসফি কী?",
          "m": "আমার মূল আর্কিটেকচারাল ফিলোসফি: (১) অ্যাপ্লিকেশনে বিশ্বাস করার আগে ডাটাবেজ লেভেলে কনস্ট্রেইন্ট (Foreign Key, Check, Unique) এনফোর্স করা—কারণ খারাপ কোড ঠিক করা যায় কিন্তু করাপ্টেড ডেটা ঠিক করা অসম্ভব। (২) সমস্ত ফরেন কি এবং ফিল্টার কলামে প্রাক-ইনডেক্সিং নিশ্চিত করা। (৩) মাল্টি-টেন্যান্সি এবং অডিট ইন্টিগ্রিটি ডিফল্ট ডিজাইন হিসেবে রাখা। (৪) জিরো-ডাউনটাইম মাইগ্রেশন নীতি মেনে চলা।",
          "b": "আমার ডাটাবেজ নীতি হলো: ডাটাবেজ স্তরেই কনস্ট্রেইন্টের সাহায্যে তথ্যের শতভাগ শুদ্ধতা রক্ষা করা। প্রতিটি ফরেন কি তে ইনডেক্স নিশ্চিত করা, মাল্টি-টেন্যান্ট নিরাপত্তা বজায় রাখা এবং ডাউনটাইম ছাড়া মাইগ্রেশন নিশ্চিত করা।",
          "e": "My database architectural philosophy: 'Enforce invariants at the database engine boundary via strict constraints before trusting application code.' Faulty code is easily patched, but corrupted persistent data is catastrophic. Pair strict foreign keys with exhaustive index coverage and zero-downtime migrations.",
          "tip": "এই স্ট্রং স্টেটমেন্ট দিয়ে উত্তর শেষ করলে ইন্টারভিউয়ার বুঝবে তোমার ডাটাবেজ ফাউন্ডেশন রক-সলিড।"
        }
      ]
    },
    {
      "id": "prisma-orm-migrations",
      "name": "Prisma ORM & Migration Strategies",
      "desc": "Prisma Schema Modeling, Relations, prisma migrate, Seeding, Raw Queries, Middleware & Extensions, Connection Management",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Prisma ORM কী এবং ট্র্যাডিশনাল ORM (যেমন TypeORM বা Sequelize)-এর চেয়ে এটি কেন আধুনিক ডেভেলপারদের প্রিয়?",
          "m": "Prisma হলো একটি আধুনিক Next-generation Node.js/TypeScript ORM। সাধারণ ওআরএম-এ ক্লাসের ওপর ডেকোরেটর দিয়ে মডেল ডিফাইন করতে হয় এবং জটিল টাইপ অমিল দেখা দেয়। Prisma একটি ডিক্লারেটিভ `schema.prisma` ফাইল ব্যবহার করে। আপনি স্কিমা লিখে `prisma generate` রান করলে Prisma স্বয়ংক্রিয়ভাবে ১০০% টাইপ-সেফ Prisma Client তৈরি করে। কোডে কোনো কুয়েরি লেখার সময় ফিল্ডের নাম ও রিলেশন স্বয়ংক্রিয়ভাবে অটো-কমপ্লিট হয় এবং ভুল ফিল্ড লিখলে কম্পাইল টাইমে লাল এরর দেখায়।",
          "b": "প্রিজমা একটি আধুনিক টাইপ-সেফ ওআরএম যা ডিক্লারেটিভ স্কিমা ফাইলের মাধ্যমে পরিচালিত হয়। স্কিমা থেকে স্বয়ংক্রিয়ভাবে টাইপস্ক্রিপ্ট টাইপ তৈরি করে এটি নির্ভুল টাইপ সেফটি দেয় এবং কোডিংয়ের সময় অসাধারণ অটো-কমপ্লিশন প্রদান করে।",
          "e": "Prisma ORM models data via a declarative `schema.prisma` file rather than decorated JavaScript classes. Running `prisma generate` constructs an auto-generated, strictly typed TypeScript query client with exhaustive autocomplete and compile-time guarantees.",
          "tip": "ইন্টারভিউতে 'Declarative Schema Modeling and Auto-generated Type Safety' শব্দ দুটি বলবে।"
        },
        {
          "lvl": "lvl1",
          "q": "Prisma-তে ১:১, ১:N এবং M:N রিলেশন কীভাবে `schema.prisma`-তে ডিফাইন করা হয়?",
          "m": "(১) `1:1`: চাইল্ড মডেলে `@relation` এবং ইউনিক ফরেন কি ফিল্ড থাকে: `userId String @unique; user User @relation(fields: [userId], references: [id])`। (২) `1:N`: চাইল্ডে ফরেন কি থাকে এবং প্যারেন্টে অ্যারে থাকে: প্যারেন্টে `posts Post[]` এবং চাইল্ডে `authorId String; author User @relation(fields: [authorId], references: [id])`। (৩) `M:N`: Prisma Implicit Many-to-Many সাপোর্ট করে—উভয় মডেলে শুধুমাত্র অ্যারে দিলেই (যেমন `users User[]` এবং `posts Post[]`), Prisma ব্যাকগ্রাউন্ডে নিজেই একটি আন্ডারলাইং জংশন টেবিল ম্যানেজ করে।",
          "b": "প্রিজমা স্কিমাতে ১:১ রিলেশনে @unique ফরেন কি থাকে, ১:এন রিলেশনে চাইল্ডে ফরেন কি ও প্যারেন্টে অ্যারে থাকে। এম:এন রিলেশনে উভয় মডেলে অ্যারে ডিক্লেয়ার করলে প্রিজমা নিজে থেকেই ব্যাকগ্রাউন্ডে জংশন টেবিল পরিচালনা করে।",
          "e": "Prisma models 1:1 via `@unique` foreign key fields, 1:N via non-unique foreign keys referencing parent IDs, and M:N natively through Implicit Many-to-Many syntax where declaring array types on both models auto-provisions a hidden backing pivot table.",
          "code": "model Store {\n  id       String    @id @default(uuid())\n  products Product[]\n}\nmodel Product {\n  id      String @id @default(uuid())\n  storeId String\n  store   Store  @relation(fields: [storeId], references: [id])\n}"
        },
        {
          "lvl": "lvl1",
          "q": "Prisma Migration Commands: `prisma migrate dev`, `prisma migrate deploy`, এবং `prisma db push`-এর সঠিক ব্যবহার কী?",
          "m": "(১) `npx prisma migrate dev`: শুধুমাত্র লোকাল মেশিনে স্কিমা পরিবর্তনের পর নতুন SQL ফাইল জেনারেট এবং লোকাল ডাটাবেজে রান করার জন্য। (২) `npx prisma migrate deploy`: প্রোডাকশন CI/CD ডেপ্লয়মেন্টে শুধুমাত্র পেন্ডিং মাইগ্রেশন ফাইলগুলো সার্ভারে নিরাপদে অ্যাপ্লাই করার জন্য (এটি কোনো নতুন ফাইল জেনারেট করে না)। (৩) `npx prisma db push`: দ্রুত প্রোটোটাইপিংয়ের জন্য মাইগ্রেশন ফাইল না বানিয়ে সরাসরি স্কিমা ডাটাবেজে সিঙ্ক করতে (প্রোডাকশনে ব্যবহার নিষিদ্ধ)।",
          "b": "migrate dev লোকাল ডেভে নতুন মাইগ্রেশন স্ক্রিপ্ট তৈরি ও প্রয়োগ করে। migrate deploy প্রোডাকশনে পেন্ডিং মাইগ্রেশনগুলো এক্সিকিউট করে। আর db push সাময়িক প্রোটোটাইপের জন্য সরাসরি স্কিমা পুশ করে।",
          "e": "`prisma migrate dev` generates versioned SQL migration artifacts for local development. `prisma migrate deploy` executes unapplied pending migrations in production environments without generating files. `prisma db push` syncs schemas directly without tracking migrations.",
          "tip": "কখনোই প্রোডাকশনে `migrate dev` বা `db push` চালাবে না; সবসময় `migrate deploy` চালাবে।"
        },
        {
          "lvl": "lvl1",
          "q": "Prisma Seeding (`prisma/seed.ts`) কী এবং ডেভেলপমেন্ট ও টেস্ট ডাটা লোড করতে কীভাবে কনফিগার করা হয়?",
          "m": "Seeding হলো ডাটাবেজ খালি থাকা অবস্থায় প্রাথমিক টেস্ট ডাটা, ডিফল্ট রোল (যেমন `ADMIN`), বা সুপার অ্যাডমিন অ্যাকাউন্ট স্বয়ংক্রিয়ভাবে ডাটাবেজে ইনসার্ট করার স্ক্রিপ্ট। আমরা `prisma/seed.ts` ফাইল তৈরি করে সেখানে Prisma Client দিয়ে রেকর্ড ক্রিয়েট করি এবং `package.json`-এ `\"prisma\": { \"seed\": \"tsx prisma/seed.ts\" }` কনফিগার করি। এরপর `npx prisma db seed` চালালে ডাটাবেজ তাত্ক্ষণিক টেস্ট ডেটায় ভরে যায়।",
          "b": "সিডার স্ক্রিপ্ট ডাটাবেজে প্রাথমিক এডমিন অ্যাকাউন্ট, রোল এবং টেস্ট ডাটা স্বয়ংক্রিয়ভাবে ইনসার্ট করতে ব্যবহৃত হয়। prisma db seed কমান্ডের মাধ্যমে সহজেই ডাটাবেজে ডেটা পপুলেট করা যায়।",
          "e": "Database seeding populates initial baseline state (super-admin users, roles, test catalogs). Define a `prisma/seed.ts` script wired into package.json under `prisma.seed`, executed on demand via `npx prisma db seed`.",
          "code": "// package.json\n\"prisma\": {\n  \"seed\": \"tsx prisma/seed.ts\"\n}"
        },
        {
          "lvl": "lvl1",
          "q": "Prisma Client ইনস্ট্যান্স পুরো অ্যাপে কীভাবে সিঙ্গেলটন (Singleton) হিসেবে মেইনটেইন করবে?",
          "m": "যদি প্রতিটি সার্ভিস বা রাউট ফাইলে বারবার `new PrismaClient()` কল করা হয়, তবে নোড অ্যাপ ডাটাবেজের সাথে শত শত কানেকশন পুল খুলে ফেলবে এবং ডাটাবেজ ক্র্যাশ করবে। সমাধান: আমরা একটি সেন্ট্রালাইজড `db.ts` ফাইলে সিঙ্গেলটন প্যাটার্ন ব্যবহার করি। ডেভেলপমেন্টে হট-রিলোডের সময় যাতে বারবার নতুন ক্লায়েন্ট তৈরি না হয়, সেজন্য `globalForPrisma.prisma` গ্লোবাল ভ্যারিয়েবলে ইনস্ট্যান্সটি ক্যাশ করে রাখি এবং পুরো অ্যাপে সেই একই ক্লায়েন্ট এক্সপোর্ট করি।",
          "b": "বারবার new PrismaClient কল করলে কানেকশন পুল শেষ হয়ে ডাটাবেজ ক্র্যাশ করে। একটি সেন্ট্রালাইজড ফাইলে গ্লোবাল সিঙ্গেলটন ক্লায়েন্ট তৈরি করে পুরো অ্যাপ্লিকেশনে শেয়ার করতে হয়।",
          "e": "Creating multiple `new PrismaClient()` instances exhausts database connection pools. Enforce a module singleton in `db.ts`, anchoring the client to Node's `globalThis` object in development to prevent duplicate pool creation during hot-reloads.",
          "code": "const globalForPrisma = global as unknown as { prisma: PrismaClient };\nexport const prisma = globalForPrisma.prisma || new PrismaClient();\nif (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;"
        },
        {
          "lvl": "lvl2",
          "q": "Prisma-তে Raw SQL Queries (`$queryRaw` vs `$executeRaw` vs `$queryRawUnsafe`) কখন এবং কীভাবে নিরাপদে চালাবে?",
          "m": "(১) `$queryRaw`: জটিল বা অ্যানালিটিক্যাল কুয়েরি চালানোর জন্য যা সাধারণ Prisma API দিয়ে সম্ভব নয়—এটি টাইপ-সেফ টেমপ্লেট লিটারাল ব্যবহার করে স্বয়ংক্রিয়ভাবে প্যারামিটারাইজড কুয়েরি তৈরি করে SQL ইনজেকশন ঠেকায়। (২) `$executeRaw`: কোনো ডাটা রিটার্ন না করে শুধুমাত্র প্রভাবিত রোর সংখ্যা (Affected Rows) দেয় (যেমন বাল্ক আপডেট বা DDL)। (৩) `$queryRawUnsafe`: র স্ট্রিং নেয়—এটি কখনোই ইউজার ইনপুট সহ ব্যবহার করা উচিত নয় কারণ এটি এসকিউএল ইনজেকশনের জন্য মারাত্মক ঝুঁকিপূর্ণ।",
          "b": "$queryRaw জটিল কুয়েরি নিরাপদে এসকিউএল ইনজেকশন প্রতিরোধ করে চালায় এবং ডাটা রিটার্ন করে। $executeRaw প্রভাবিত রোর সংখ্যা দেয়। আর $queryRawUnsafe ব্যবহার করা মারাত্মক ঝুঁকিপূর্ণ কারণ এতে ইনজেকশন প্রতিরোধ থাকে না।",
          "e": "`$queryRaw` executes parameterized SQL templates returning row arrays safely immunized against SQL injection. `$executeRaw` returns affected row counts for DDL/UPDATE mutations. `$queryRawUnsafe` accepts raw strings and must be strictly avoided with dynamic user inputs.",
          "code": "const result = await prisma.$queryRaw<Product[]>`\n  SELECT * FROM \"Product\" WHERE price > ${minPrice} AND \"tenantId\" = ${tenantId}\n`;"
        },
        {
          "lvl": "lvl2",
          "q": "Prisma-তে Pagination: Offset-based (`skip` & `take`) বনাম Cursor-based (`cursor` & `take`) এর পারফরম্যান্স পার্থক্য কী?",
          "m": "Offset-based পেজিনেশনে (`skip: 10000, take: 20`) ডাটাবেজকে প্রথম ১০০০০টি রো স্ক্যান করে মেমোরিতে ফেলে দিয়ে তারপর ২০টি রো নিতে হয়—ফলে পেজ নম্বর যত বাড়ে কুয়েরি তত স্লো হয়ে যায় এবং ডেটা স্কিপিং বাগ হয়। Cursor-based পেজিনেশনে (`cursor: { id: lastSeenId }, take: 20`) ডাটাবেজ সরাসরি B-Tree ইনডেক্স ব্যবহার করে আগের শেষ আইডির পর থেকে সরাসরি ২০টি রো রিড করে। ডাটাবেজে কোটি কোটি রেকর্ড থাকলেও কার্সর পেজিনেশন সবসময় ১ মিলিসেকেন্ডেই এক্সিকিউট হয়।",
          "b": "অফসেট পেজিনেশনে skip বেশি হলে ডাটাবেজ স্লো হয়ে যায়। কার্সর পেজিনেশন শেষ আইডির ইনডেক্স ধরে সরাসরি পরবর্তী ডাটা পড়ে, ফলে কোটি কোটি রোর টেবিলেও কার্সর পেজিনেশন সবসময় ১ মিলিসেকেন্ডে সুপারফাস্ট চলে।",
          "e": "Offset pagination (`skip`/`take`) requires scanning and discarding prior records, degrading drastically at high offsets. Cursor pagination (`cursor`/`take`) jumps directly to the B-Tree index location of the cursor ID, maintaining O(1) performance regardless of table depth.",
          "code": "const nextBatch = await prisma.order.findMany({\n  take: 20,\n  skip: 1,\n  cursor: { id: lastOrderId },\n  orderBy: { id: 'asc' }\n});"
        },
        {
          "lvl": "lvl2",
          "q": "Prisma-তে Nested Writes ও Cascading Operations (`create`, `connect`, `connectOrCreate`) কীভাবে কাজ করে?",
          "m": "Nested Writes আমাদের একটিমাত্র এপিআই কলে প্যারেন্ট ও চাইল্ড উভয় রেকর্ড অ্যাটোমিকালি তৈরি করার ক্ষমতা দেয়। (১) `create`: নতুন প্যারেন্টের সাথে নতুন চাইল্ড তৈরি করা। (২) `connect`: নতুন প্যারেন্টের সাথে ডাটাবেজে ইতিমধ্যে বিদ্যমান কোনো চাইল্ড রেকর্ডকে যুক্ত করা। (৩) `connectOrCreate`: যদি চাইল্ড রেকর্ড (যেমন ট্যাগ বা ক্যাটাগরি) আগে থেকেই থাকে তবে কানেক্ট করবে, আর না থাকলে নতুন বানিয়ে কানেক্ট করবে। পুরো অপারেশনটি ব্যাকগ্রাউন্ডে একটি সিঙ্গেল অ্যাটমিক ট্রানজাকশনে চলে।",
          "b": "নেস্টেড রাইটসের মাধ্যমে একটিমাত্র অপারেশনে প্যারেন্ট ও চাইল্ড ডেটা তৈরি বা যুক্ত করা যায়। connectOrCreate পদ্ধতি ক্যাটাগরি বা ট্যাগ বিদ্যমান থাকলে কানেক্ট করে এবং না থাকলে নতুন তৈরি করে যুক্ত করে।",
          "e": "Nested Writes execute atomic multi-table operations in a single query: `create` nests new children, `connect` links existing records via unique keys, and `connectOrCreate` idempotently connects matching entities or spawns new ones if absent.",
          "code": "await prisma.product.create({\n  data: {\n    name: 'Shampoo',\n    category: { connectOrCreate: { where: { name: 'Cosmetics' }, create: { name: 'Cosmetics' } } }\n  }\n});"
        },
        {
          "lvl": "lvl2",
          "q": "Prisma-তে Aggregation ও Grouping (`aggregate`, `groupBy`) কীভাবে রিপোর্ট জেনারেট করে?",
          "m": "Prisma বিল্ট-ইন এগ্রিগেশন ফাংশন দেয়: `prisma.order.aggregate({ _sum: { total: true }, _avg: { total: true }, _count: true, _max: { total: true } })`। আর গ্রুপিংয়ের জন্য: `prisma.sales.groupBy({ by: ['storeId'], _sum: { amount: true }, having: { amount: { _sum: { gt: 10000 } } } })`। এটি আন্ডারলাইং ডাটাবেজের `GROUP BY` এবং `HAVING` ক্লজ ব্যবহার করে সরাসরি ডাটাবেজ স্তরে কোটি রো প্রসেস করে মাত্র এক লাইনের ফলাফলে রিপোর্ট রিটার্ন করে।",
          "b": "প্রিজমা এগ্রিগেট ফাংশন দিয়ে যোগফল (_sum), গড় (_avg) এবং সংখ্যা (_count) বের করা যায়। groupBy এর মাধ্যমে স্টোর বা ক্যাটাগরি ভিত্তিক সেলস রিপোর্ট ডাটাবেজ স্তরেই হিসাব করে দ্রুত আউটপুট পাওয়া যায়।",
          "e": "Prisma provides high-level aggregation primitives: `aggregate` compiles SQL `SUM`, `AVG`, and `COUNT`. `groupBy` groups rows across attributes (e.g. `storeId`), supporting `having` filters to evaluate aggregate thresholds directly inside the database.",
          "code": "const metrics = await prisma.sale.groupBy({\n  by: ['paymentMethod'],\n  _sum: { totalAmount: true },\n  _count: true\n});"
        },
        {
          "lvl": "lvl2",
          "q": "Prisma Schema-তে Custom Attribute Directives (`@map`, `@@map`, `@default(now())`, `@updatedAt`) কী করে?",
          "m": "`@map('user_id')` মডেলের টাইপস্ক্রিপ্ট প্রপার্টির নাম ক্যামেলকেস (`userId`) রাখলেও আসল ডাটাবেজ কলামের নাম স্নেক-কেস (`user_id`) ম্যাপিং করে। `@@map('tbl_users')` পুরো মডেলকে ডাটাবেজের কাস্টম টেবিল নামের সাথে ম্যাপ করে। `@default(now())` রেকর্ড তৈরির সময় ডিফল্ট টাইমস্ট্যাম্প বসায়। আর `@updatedAt` হলো প্রিজমার একটি স্পেশাল ডিরেক্টিভ যা প্রতিবার ওই রো আপডেট হওয়ার সাথে সাথে স্বয়ংক্রিয়ভাবে কারেন্ট টাইমস্ট্যাম্প আপডেট করে দেয়।",
          "b": "@map কলামের নাম এবং @@map টেবিলের নাম ডাটাবেজের স্নেক-কেসের সাথে ম্যাপ করে। @updatedAt কোনো কোড লেখা ছাড়াই রেকর্ড পরিবর্তন হলে স্বয়ংক্রিয়ভাবে টাইমস্ট্যাম্প আপডেট করে দেয়।",
          "e": "`@map` maps camelCase TypeScript field names to snake_case database columns. `@@map` overrides table names in the underlying schema. `@updatedAt` instructs Prisma to automatically stamp the current timestamp upon every record update.",
          "code": "model UserProfile {\n  id        String   @id @default(uuid())\n  firstName String   @map(\"first_name\")\n  updatedAt DateTime @updatedAt\n  @@map(\"user_profiles\")\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Prisma Client Extensions (`$extends`) বনাম Legacy Middleware (`$use`): আধুনিক এক্সটেনশন আর্কিটেকচার কীভাবে কাজ করে?",
          "m": "Prisma v4.7+ এ লিগ্যাসি `$use` মিডলওয়্যার ডেপ্রিকেটেড করা হয়েছে কারণ এতে টাইপ সেফটি ছিল না এবং রিটার্ন টাইপ পরিবর্তন করা যেত না। আধুনিক `$extends` এপিআই ৪টি ক্লায়েন্ট লেভেল এক্সটেনশন সমর্থন করে: (১) `model`: মডেলে কাস্টম মেথড যোগ করা (যেমন `prisma.user.signUp(...)`), (২) `client`: গ্লোবাল ক্লায়েন্টে মেথড যোগ করা, (৩) `query`: যেকোনো কুয়েরি ইন্টারসেপ্ট ও মডিফাই করা (যেমন সফট ডিলিট ও টেন্যান্ট গার্ড), (৪) `result`: মডেলের রিটার্ন অবজেক্টে ভার্চুয়াল ফিল্ড যোগ করা (যেমন `fullName`). সম্পূর্ণ এক্সটেনশনটি ১০০% টাইপস্ক্রিপ্ট টাইপ-সেফ থাকে।",
          "b": "প্রিজমা এক্সটেনশন লিগ্যাসি মিডলওয়্যারের আধুনিক টাইপ-সেফ বিকল্প। এর মাধ্যমে মডেলে কাস্টম মেথড, কুয়েরি ইন্টারসেপ্টর এবং রিটার্ন ডাটায় ভার্চুয়াল ফিল্ড যুক্ত করা যায় এবং টাইপস্ক্রিপ্ট স্বয়ংক্রিয়ভাবে নতুন মেথডগুলো চিনতে পারে।",
          "e": "Prisma Client Extensions (`$extends`) supersede legacy untyped `$use` middleware. Developers can extend Prisma models with custom domain methods, add computed result fields (`fullName`), or hook query execution for automated soft deletion and tenant enforcement with full TypeScript type propagation.",
          "code": "const extendedPrisma = prisma.$extends({\n  result: {\n    user: {\n      fullName: { needs: { firstName: true, lastName: true }, compute(u) { return `${u.firstName} ${u.lastName}`; } }\n    }\n  }\n});"
        },
        {
          "lvl": "lvl3",
          "q": "Prisma Accelerate এবং Prisma Pulse কী এবং সার্ভারলেস ও এজ এনভায়রনমেন্টে এরা কীভাবে পারফরম্যান্স বাড়ায়?",
          "m": "সার্ভারলেস ফাংশনে (যেমন Vercel বা AWS Lambda) প্রতি রিকোয়েস্টে নতুন ইনস্ট্যান্স চালু হওয়ায় ডাটাবেজ কানেকশন পুল মুহূর্তেই শেষ হয়ে যায়। `Prisma Accelerate` হলো একটি গ্লোবাল এজ কানেকশন পুলার ও ক্যাশিং লেয়ার যা ডাটাবেজ কানেকশন রক্ষা করে এবং এপিআই রেসপন্স এজ লোকেশনে মিলি-সেকেন্ডে ক্যাশ করে। আর `Prisma Pulse` হলো একটি রিয়েল-টাইম চেঞ্জ ডেটা ক্যাপচার (CDC) সার্ভিস যা ডাটাবেজে কোনো পরিবর্তন (INSERT/UPDATE) হওয়া মাত্রই সার্ভারলেস ক্লায়েন্টে লাইভ ইভেন্ট স্ট্রিম করে দেয় কোনো জটিল WebSockets বা Kafka ছাড়া।",
          "b": "প্রিজমা এক্সিলারেট সার্ভারলেস পরিবেশে ডাটাবেজ কানেকশন পুলিং ও এজ ক্যাশিং নিশ্চিত করে। প্রিজমা পালস ডাটাবেজের যেকোনো পরিবর্তন মুহূর্তের মধ্যে রিয়েল-টাইম ইভেন্ট আকারে স্ট্রিম করে পাঠাতে সাহায্য করে।",
          "e": "Prisma Accelerate solves serverless connection pool exhaustion via global edge connection pooling and automated query result caching. Prisma Pulse delivers Change Data Capture (CDC), streaming database change events directly to Node.js applications in real time.",
          "tip": "সার্ভারলেস নেক্সট জেএস অ্যাপ্লিকেশনে কানেকশন পুলিংয়ের জন্য Prisma Accelerate-এর কথা বলা খুব আধুনিক।"
        },
        {
          "lvl": "lvl3",
          "q": "Data Migration Scripts vs Schema Migrations: কোটি কোটি ডেটা রি-স্ট্রাকচার করার সময় ডেটা মাইগ্রেশন কীভাবে হ্যান্ডেল করবে?",
          "m": "Prisma স্কিমা মাইগ্রেশন শুধুমাত্র টেবিল বা কলামের স্ট্রাকচার পরিবর্তন করে (DDL)। কিন্তু যদি বিদ্যমান কোটি রোর ভেতরের ডেটা রূপান্তর করতে হয় (যেমন পুরো নাম ভেঙে প্রথম নাম ও শেষ নাম করা), তবে স্কিমা মাইগ্রেশনে তা চালানো যাবে না কারণ সার্ভার টাইমআউট হবে। সমাধান: আমরা একটি ডেডিকেটেড Data Migration Script লিখব যা ব্যাকগ্রাউন্ডে কার্সর ও ব্যাচ আকারে (যেমন প্রতি ব্যাচে ৫০০ রেকর্ড) ডেটা রিড ও আপডেট করবে। মাইগ্রেশন স্ক্রিপ্টটি আইডেমপোটেন্ট হবে যাতে মাঝে থেমে গেলেও পুনরায় চালু করা যায়।",
          "b": "কোটি কোটি রো রূপান্তর করতে স্কিমা মাইগ্রেশনের বদলে আলাদা ডেটা মাইগ্রেশন স্ক্রিপ্ট লিখতে হয়। স্ক্রিপ্টটি কার্সর ব্যবহার করে ৫০০টি করে রেকর্ড ব্যাচ আকারে আপডেট করে যাতে কোনো সার্ভার ডাউনটাইম বা মেমোরি ক্র্যাশ না ঘটে।",
          "e": "Separate DDL schema changes from heavy data transformations. Execute data migrations via standalone idempotent TypeScript runner scripts that stream records using cursor pagination in 500-row chunks, committing batches independently to avoid table locks.",
          "code": "let cursor = undefined;\nwhile (true) {\n  const batch = await prisma.user.findMany({ take: 500, skip: cursor ? 1 : 0, cursor: cursor ? { id: cursor } : undefined });\n  if (!batch.length) break;\n  await processBatch(batch);\n  cursor = batch[batch.length - 1].id;\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Prisma-তে Multi-Schema Support (PostgreSQL Schemas): একই ডাটাবেজের ভেতর একাধিক স্কিমা (`auth`, `pos`, `audit`) কীভাবে মডেল করবে?",
          "m": "PostgreSQL একটি সিঙ্গেল ডাটাবেজের ভেতর একাধিক লজিক্যাল স্কিমা সমর্থন করে। Prisma-তে আমরা `previewFeatures = [\"multiSchema\"]` সক্রিয় করি এবং `schema.prisma`-তে `schemas = [\"public\", \"auth\", \"pos\"]` ডিক্লেয়ার করি। এরপর প্রতিটি মডেলের ওপরে `@@schema(\"pos\")` ডিরেক্টিভ বসাই। এর ফলে টেবিলগুলো সুসংগঠিতভাবে তাদের নিজস্ব স্কিমায় তৈরি হয় এবং পারমিশন ও আইসোলেশন মেইনটেইন করা অত্যন্ত সহজ হয়।",
          "b": "পোস্টগ্রেস মাল্টি-স্কিমা ফিচারের মাধ্যমে একই ডাটাবেজে auth, pos ও audit টেবিল আলাদা মডিউলে সাজানো যায়। প্রিজমা স্কিমাতে @@schema নির্দেশ করে টেবিলগুলো পৃথক স্কিমায় ভাগ করা যায়।",
          "e": "PostgreSQL multi-schema support in Prisma partitions tables across distinct schemas (e.g. `auth`, `pos`, `billing`). Enabled via `multiSchema` preview feature, models use the `@@schema(\"schema_name\")` attribute to organize enterprise database spaces.",
          "code": "datasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n  schemas  = [\"auth\", \"pos\"]\n}\nmodel Invoice {\n  id String @id\n  @@schema(\"pos\")\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Prisma Query Engine Architecture (Rust Engine) কীভাবে ইন্টারনালি নোড জেএস ও ডাটাবেজের মধ্যে কাজ করে?",
          "m": "Prisma শুধুমাত্র একটি জাভাস্ক্রিপ্ট লাইব্রেরি নয়; এর পেছনে একটি হাই-পারফরম্যান্স Rust Query Engine বাইনারি থাকে। আপনি যখন কোনো Prisma মেথড কল করেন, নোড ক্লায়েন্ট একটি অপটিমাইজড DMMF (Data Model Meta Format) কুয়েরি রিকোয়েস্ট তৈরি করে লোকাল IPC বা N-API (Node-API Library) দিয়ে Rust ইঞ্জিনে পাঠায়। Rust ইঞ্জিন কুয়েরি প্ল্যান অপটিমাইজ করে, ডাটাবেজের জন্য একক সুপার-অপটিমাইজড SQL তৈরি করে এক্সিকিউট করে এবং প্রাপ্ত রেজাল্ট মেমোরি-ম্যাপ করে নোড ক্লায়েন্টে ফিরিয়ে দেয়। এর ফলে জাভাস্ক্রিপ্ট মেমোরি ফাঁকা থাকে এবং কোয়েরি এক্সিকিউশন অবিশ্বাস্য দ্রুত হয়।",
          "b": "প্রিজমার পেছনে একটি শক্তিশালী রাস্ট (Rust) ইঞ্জিন কাজ করে। নোড থেকে রিকোয়েস্ট নিয়ে রাস্ট ইঞ্জিন অপটিমাইজড এসকিউএল তৈরি করে ডাটাবেজ চালায় এবং ফলাফল নোডে ফেরত দেয়, ফলে জাভাস্ক্রিপ্ট মেমোরির ওপর কোনো চাপ পড়ে না।",
          "e": "Prisma query execution is driven by a compiled Rust Query Engine connected to Node.js via N-API. The Rust core optimizes AST query plans, manages physical connection pooling, synthesizes SQL statements, and serializes query results efficiently with minimal V8 garbage collection impact.",
          "tip": "Prisma-র পেছনে যে Rust কোয়েরি ইঞ্জিন N-API দিয়ে চলে—এটি ব্যাখ্যা করতে পারা অত্যন্ত উঁচুমানের টেকনিক্যাল দক্ষতা।"
        },
        {
          "lvl": "situation",
          "q": "ডেভেলপমেন্টে স্কিমা পরিবর্তন করার পর কোডে নতুন ফিল্ড অটো-কমপ্লিট হচ্ছে না এবং টাইপস্ক্রিপ্ট পুরানো টাইপ দেখিয়ে এরর দিচ্ছে। কীভাবে ফিক্স করবে?",
          "m": "কারণ: `schema.prisma` পরিবর্তন করার পর `prisma generate` কমান্ড চালানো হয়নি, যার ফলে `node_modules/@prisma/client` ফোল্ডারে পুরানো টাইপস্ক্রিপ্ট ডেফিনেশন ফাইল রয়ে গেছে। সমাধান: টার্মিনালে `npx prisma generate` রান করব। এটি নতুন স্কিমা স্ক্যান করে মুহূর্তের মধ্যে ফ্রেশ টাইপ জেনারেট করে দেবে। ভিএস কোড ক্যাশ আটকে থাকলে `Ctrl+Shift+P` চেপে 'TypeScript: Restart TS Server' দিলেই সাথে সাথে সব নতুন ফিল্ড অটো-কমপ্লিট হওয়া শুরু করবে।",
          "b": "স্কিমা বদলানোর পর npx prisma generate না চালালে নতুন টাইপ তৈরি হয় না। কমান্ডটি চালিয়ে ভিএস কোডের টাইপস্ক্রিপ্ট সার্ভার রিস্টার্ট করলেই নতুন ফিল্ডের টাইপ ও অটো-কমপ্লিশন পাওয়া যায়।",
          "e": "Modifying `schema.prisma` requires regenerating the client artifact. Execute `npx prisma generate` to rebuild `@prisma/client` typings in node_modules. If the IDE fails to pick it up, trigger 'TypeScript: Restart TS Server' in VS Code.",
          "code": "npx prisma generate"
        },
        {
          "lvl": "situation",
          "q": "প্রোডাকশন ডেপ্লয়মেন্টে `prisma migrate deploy` কমান্ড চালাতে গিয়ে এরর আসছে: `Migration ... is applied but its hash has changed` (Drift Detected)। কীভাবে সমাধান করবে?",
          "m": "কারণ: কোনো ডেভেলপার ইতিমধ্যেই ডাটাবেজে রান হয়ে যাওয়া কোনো পুরানো মাইগ্রেশন SQL ফাইলকে লোকাল মেশিনে ম্যানুয়ালি এডিট করেছে, ফলে ফাইলের চেকসাম হ্যাশ ডাটাবেজের `_prisma_migrations` টেবিলের হ্যাশের সাথে মিলছে না। সমাধান: (১) গিট হিস্ট্রি দেখে অরিজিনাল মাইগ্রেশন ফাইলটি হুবহু পূর্বাবস্থায় রিস্টোর করব। (২) যে পরিবর্তন দরকার তার জন্য সম্পূর্ণ নতুন আরেকটি মাইগ্রেশন তৈরি করব। (৩) যদি লোকাল ডেভ এনভায়রনমেন্টে ঠিক করতে হয়, তবে `prisma migrate resolve` ব্যবহার করব।",
          "b": "ইতিমধ্যে ডেপ্লয় হওয়া মাইগ্রেশন ফাইলে ম্যানুয়াল পরিবর্তন করলে হ্যাশ অমিল হয়। গিট থেকে আগের মূল ফাইলটি রিস্টোর করতে হবে এবং নতুন পরিবর্তনের জন্য পৃথক মাইগ্রেশন তৈরি করে সমাধান করতে হবে।",
          "e": "This drift error indicates an already-applied migration SQL file was altered post-hoc, causing checksum verification failures against `_prisma_migrations`. Revert the local migration file back to its committed state and issue an incremental new migration for the desired schema changes.",
          "code": "npx prisma migrate resolve --applied <migration_name>"
        },
        {
          "lvl": "situation",
          "q": "Prisma-তে কোনো ট্রানজাকশন চালাতে গিয়ে `Transaction API error: Transaction already closed` অথবা `Transaction timed out` এরর আসছে। কীভাবে ফিক্স করবে?",
          "m": "কারণ: Prisma Interactive Transaction-এর ডিফল্ট টাইমআউট থাকে ৫ সেকেন্ড (৫০০০ms)। যদি ট্রানজাকশনের ভেতর কোনো স্লো এপিআই কল বা ভারী কোয়েরি থাকে যা ৫ সেকেন্ড অতিক্রম করে, Prisma স্বয়ংক্রিয়ভাবে ট্রানজাকশন রোলব্যাক ও ক্লোজ করে দেয়। সমাধান: (১) ট্রানজাকশনের ভেতরে কখনোই স্লো থার্ড-পার্টি এপিআই (যেমন পেমেন্ট বা ইমেইল) রাখবেন না—সেগুলো ট্রানজাকশনের বাইরে রাখুন। (২) যদি ডাটাবেজ অপারেশন সত্যিই ভারী হয়, তবে টাইমআউট বাড়িয়ে দেব: `prisma.$transaction(async (tx) => ..., { maxWait: 5000, timeout: 20000 })`।",
          "b": "প্রিজমা ট্রানজাকশনের ডিফল্ট টাইমআউট ৫ সেকেন্ড। ট্রানজাকশনের ভেতর স্লো থার্ড-পার্টি কল রাখা যাবে না। বড় কাজের জন্য maxWait এবং timeout অপশন বাড়িয়ে ২০ সেকেন্ড করে দিলে টাইমআউট এরর দূর হয়।",
          "e": "Interactive transactions default to a strict 5000ms timeout window. Purge slow external API calls from the transaction block. For legitimate long-running batch persistence, extend the timeout thresholds explicitly via transaction options.",
          "code": "await prisma.$transaction(async (tx) => { ... }, {\n  maxWait: 5000, // Max wait to acquire connection\n  timeout: 15000 // Max duration for transaction to complete\n});"
        },
        {
          "lvl": "situation",
          "q": "ব্যবহারকারী একটি টেবিলে রেকর্ড খোঁজার সময় Prisma `findUnique` এর বদলে `findFirst` ব্যবহার করায় কুয়েরি স্লো হচ্ছে। কখন কোনটি ব্যবহার করতে হবে?",
          "m": "`findUnique` শুধুমাত্র এবং শুধুমাত্র সেই কলামগুলোতে কাজ করে যেগুলোর ওপর `@id` (Primary Key) অথবা `@unique` কনস্ট্রেইন্ট রয়েছে। কারণ ডাটাবেজ জানে এটি সর্বোচ্চ ১টি রো হবে এবং সরাসরি ইউনিক B-Tree ইনডেক্স ব্যবহার করে ১ms-এ খুঁজে বের করে। আর `findFirst` যেকোনো নন-ইউনিক কলামে চালানো যায়, যার ফলে ডাটাবেজকে টেবিল স্ক্যান বা সাধারণ ইনডেক্স স্ক্যান করে প্রথম ম্যাচটি নিতে হয়। তাই ইউনিক আইডেন্টিফায়ারে সবসময় `findUnique` ব্যবহার করা বাধ্যতামূলক।",
          "b": "findUnique শুধুমাত্র প্রাইমারি কি বা ইউনিক কলামে চলে এবং সরাসরি বি-ট্রি ইনডেক্স দিয়ে তাৎক্ষণিক রেজাল্ট দেয়। findFirst সাধারণ কলামে চলে এবং তুলনামূলক ধীরগতির। তাই ইউনিক ডেটা খুঁজতে সর্বদা findUnique ব্যবহার করতে হবে।",
          "e": "`findUnique` targets strictly unique-constrained fields (`@id` or `@unique`), utilizing direct index lookups with engine guarantees of single-record returns. `findFirst` executes arbitrary non-unique filter scans with sorting overheads; use `findUnique` whenever unique criteria exist.",
          "code": "const user = await prisma.user.findUnique({ where: { email } }); // Fast B-Tree Lookup"
        },
        {
          "lvl": "situation",
          "q": "Prisma-তে কোনো বড় টেবিল থেকে ডেটা আনার সময় মেমোরি ওভারফ্লো এড়াতে এবং নির্দিষ্ট ফিল্ড ফিল্টার করতে কীভাবে `select` অপটিমাইজেশন করবে?",
          "m": "যদি প্রোডাক্ট টেবিলে ৫০টি কলাম থাকে (বড় ডেসক্রিপশন, ইমেজ বেস৬৪, মেটাডাটা) এবং আমরা শুধু নাম ও দাম দেখাতে চাই, কখনোই পুরো অবজেক্ট ফেচ করব না (`findMany()`)। আমরা `select` ক্লজ ব্যবহার করব: `prisma.product.findMany({ select: { id: true, name: true, price: true } })`। এর ফলে ডাটাবেজ শুধুমাত্র এই ৩টি কলাম রিটার্ন করবে, নেটওয়ার্ক ট্রাফিক ৯০% কমে যাবে এবং নোড সার্ভারের RAM সম্পূর্ণ ফাঁকা থাকবে। সাথে টাইপস্ক্রিপ্ট টাইপও নিখুঁতভাবে শুধুমাত্র এই ৩টি ফিল্ডের জন্য টাইপড হবে।",
          "b": "মেমোরি বাঁচাতে পুরো অবজেক্ট না এনে select ক্লজ দিয়ে শুধুমাত্র প্রয়োজনীয় কলামগুলো নিয়ে আসতে হবে। এতে ডাটাবেজ ও নেটওয়ার্কের ওপর চাপ ৯০% হ্রাস পায় এবং মেমোরি সুরক্ষিত থাকে।",
          "e": "Omit unneeded heavy attributes by leveraging Prisma's `select` projection clause (`select: { id: true, name: true, price: true }`). This generates lean SQL projections, slashing serialization costs, network payload byte sizes, and V8 heap consumption.",
          "code": "const items = await prisma.product.findMany({\n  where: { tenantId },\n  select: { id: true, name: true, price: true, stock: true }\n});"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর দ্রুতগতির বিলিং মডিউলে ইনভয়েস তৈরি ও ইনভেন্টরি স্টক কমাতে Prisma Transactions কীভাবে সফলভাবে প্রয়োগ করেছিলে?",
          "m": "দোকানি সিস্টেমে আমরা `prisma.$transaction(async (tx) => ...)` ব্যবহার করেছি। ক্যাশিয়ার যখন ২০টি আইটেমের বিল সাবমিট করে, ট্রানজাকশনের ভেতর: (১) প্রতিটি আইটেমের বর্তমান স্টক চেক ও ডিক্রিমেন্ট (`stock: { decrement: qty }`), (২) ইনভয়েস মাস্টার ও ২০টি আইটেম লাইন ক্রিয়েট, (৩) কাস্টমার বাকি লেজার আপডেট। পুরো অপারেশনটি মাত্র ৩০-৪০ মিলিসেকেন্ডে সম্পন্ন হতো। কোনো একটি পণ্যের স্টক শর্ট থাকলে সম্পূর্ণ ট্রানজাকশন তাৎক্ষণিক রোলব্যাক হতো—কোনো ভুল ডেটা ডাটাবেজে প্রবেশ করতে পারেনি।",
          "b": "দোকানি বিক্রয় এন্ট্রিতে আমরা প্রিজমার ইন্টারেক্টিভ ট্রানজাকশন ব্যবহার করে স্টক কাটা, ইনভয়েস তৈরি এবং কাস্টমার বাকি সমন্বয় নিশ্চিত করেছি। মাত্র ৩০-৪০ মিলিসেকেন্ডে সফল লেনদেন সম্পন্ন হতো এবং কোনো ত্রুটি হলে স্বয়ংক্রিয় রোলব্যাক নিশ্চিত ছিল।",
          "e": "Executed atomic POS invoice checkouts in Dokani via Prisma interactive transactions: iterating cart rows to apply atomic `decrement` mutations on product stock, batch-inserting invoice line items, and updating customer ledger balances with automated rollback guarantees.",
          "tip": "ক্যাশ কাউন্টারের দ্রুতগতির ২০টি আইটেমের অ্যাটমিক ট্রানজাকশন বর্ণনা করা হাই-কনকারেন্সি দক্ষতার প্রমাণ।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর মাল্টি-টেন্যান্ট ডেটাবেজে Prisma Client Extensions দিয়ে প্রতি কুয়েরিতে অটোমেটিক `tenantId` ফিল্টারিং কীভাবে বাস্তবায়ন করেছিলে?",
          "m": "আমরা Prisma `$extends` দিয়ে একটি কাস্টম ক্লায়েন্ট এক্সটেনশন তৈরি করেছিলাম: `prisma.$extends({ query: { $allModels: { async findMany({ args, query }) { args.where = { ...args.where, tenantId: currentTenant() }; return query(args); } } } })`। এর ফলে কোনো ডেভেলপার ভুল করে `tenantId` ফিল্টার লিখতে ভুলে গেলেও Prisma এক্সটেনশন স্বয়ংক্রিয়ভাবে ডাটাবেজ লেভেলে টেন্যান্ট আইডি ইনজেক্ট করে দিত। ফলে কোনো অবস্থাতেই এক দোকানের ডেটা অন্য দোকানে লিক হওয়ার ০% সুযোগ ছিল।",
          "b": "প্রিজমা ক্লায়েন্ট এক্সটেনশনের সাহায্যে আমরা স্বয়ংক্রিয়ভাবে প্রতিটি কুয়েরিতে টেন্যান্ট আইডি ইনজেক্ট করার ব্যবস্থা করেছিলাম। কোনো ডেভেলপার ভুল করলেও ডাটাবেজে টেন্যান্ট ফিল্টার বাদ পড়ার কোনো সুযোগ ছিল না, ফলে শতভাগ ডেটা আইসোলেশন নিশ্চিত ছিল।",
          "e": "Constructed an automated multi-tenant guard in Dokani using Prisma Client Extensions (`$extends`). Intercepting all model query methods, the extension dynamically merged `{ tenantId: getTenantContext() }` into incoming `where` criteria, permanently barring cross-tenant data bleed.",
          "code": "const tenantDb = prisma.$extends({\n  query: {\n    $allModels: {\n      async findMany({ args, query }) {\n        args.where = { ...args.where, tenantId: getActiveTenantId() };\n        return query(args);\n      }\n    }\n  }\n});"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে লাখ লাখ ছাত্রের কোর্স প্রোগ্রেস ও অ্যানালিটিক্স তৈরিতে Prisma-তে জটিল কুয়েরি কীভাবে অপটিমাইজ করেছিলে?",
          "m": "ছাত্রদের ড্যাশবোর্ডে কোর্স সমাপ্তির শতকরা হার দেখানোর জন্য আমরা সাধারণ নেস্টেড কুয়েরি না করে Prisma-র `_count` এবং কাস্টম `$queryRaw` ব্যবহার করেছি: `prisma.course.findMany({ include: { _count: { select: { lessons: true } } } })`। ছাত্রের সম্পন্ন হওয়া লেকচারের সংখ্যার সাথে মোট লেকচারের সংখ্যা ভাগ করে এক নিমেষেই প্রোগ্রেস বার হিসাব করা হয়েছে। ফলে ছাত্রকে ড্যাশবোর্ডে কোনো লোডিং ছাড়াই নিমেষে লাইভ কোর্স পার্সেন্টেজ দেখানো সম্ভব হয়েছে।",
          "b": "পিটিটিএবিডিতে কোর্স প্রোগ্রেস গণনায় প্রিজমার _count ফিচার ব্যবহার করে মোট লেকচার ও সম্পন্ন হওয়া লেকচারের অনুপাত বের করা হয়েছিল। ডাটাবেজে অতিরিক্ত লোড না ফেলে এক নিমেষেই ছাত্রদের লাইভ অগ্রগতি প্রদর্শন সম্ভব হয়েছিল।",
          "e": "Optimized student learning analytics in PTTABD by leveraging Prisma's relation `_count` aggregates (`_count: { select: { lessons: true } }`). Calculating progress ratios client-side from lightweight aggregate integers eliminated expensive joins over lesson detail bodies.",
          "code": "const courseProgress = await prisma.enrollment.findMany({\n  where: { studentId },\n  include: { course: { include: { _count: { select: { lessons: true } } } } }\n});"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর ডাটাবেজ স্কিমায় নতুন ভার্সন আপগ্রেডের সময় প্রোডাকশন CI/CD পাইপলাইনে Prisma Migration অটোমেশন কীভাবে কনফিগার করেছিলে?",
          "m": "আমাদের GitHub Actions CI পাইপলাইনে আমরা ডেপ্লয়মেন্ট স্টেপে অটোমেটেড মাইগ্রেশন রান করেছি: `npx prisma migrate deploy`। কিন্তু তার আগে একটি টেস্ট স্টেপে লোকাল টেস্ট পোস্টগ্রেস কন্টেইনার তুলে পুরো মাইগ্রেশনটি পরীক্ষামূলকভাবে রান করে ভ্যালিডেট করা হতো। কোনো মাইগ্রেশন ফেইল করলে প্রোডাকশন ডেপ্লয়মেন্ট সাথে সাথে বন্ধ হয়ে যেত। আর সফল হলে স্বয়ংক্রিয়ভাবে নোড সার্ভার নতুন ভার্সনে রিলোড হতো।",
          "b": "গিটহাব অ্যাকশনস সিআই পাইপলাইনে আমরা prisma migrate deploy স্বয়ংক্রিয় করেছি। প্রোডাকশনে যাওয়ার আগে টেস্ট কনটেইনারে মাইগ্রেশন সফল হয়েছে কিনা তা যাচাই করে তবেই লাইভ সার্ভারে প্রয়োগ করা হতো।",
          "e": "Automated database schema deployments via GitHub Actions pipelines: ephemeral Docker PostgreSQL test runners dry-ran pending migrations during pull requests. Staging gates promoted to production executed `npx prisma migrate deploy` prior to zero-downtime application reloads.",
          "tip": "সিআই পাইপলাইনে টেস্ট কন্টেইনারে মাইগ্রেশন ড্রাই-রান করার কথা বলা প্রিমিয়াম ডেভঅপ্স ম্যাচিউরিটির প্রমাণ।"
        },
        {
          "lvl": "realworld",
          "q": "Prisma ORM ব্যবহারে প্রোডাকশন অ্যাপ্লিকেশনের পারফরম্যান্স ও স্থায়িত্ব বজায় রাখার জন্য তোমার শীর্ষ ৫টি নীতি কী?",
          "m": "আমার শীর্ষ ৫টি নীতি: (১) গ্লোবাল সিঙ্গেলটন ক্লায়েন্ট ব্যবহার করা যাতে কানেকশন পুল নষ্ট না হয়। (২) N+1 সমস্যা রোধে সর্বদা `include` বা `select` ব্যবহার করা। (৩) বড় লিস্টে অফসেট পেজিনেশনের বদলে কার্সর পেজিনেশন ব্যবহার করা। (৪) প্রোডাকশনে কঠোরভাবে `prisma migrate deploy` ব্যবহার করা (কখনোই `db push` নয়)। (৫) মাল্টি-টেন্যান্ট আইসোলেশন ও সফট ডিলিটের জন্য Prisma Client Extensions (`$extends`) ব্যবহার করা।",
          "b": "আমার প্রধান ৫টি নীতি: সিঙ্গেলটন ক্লায়েন্ট নিশ্চিত করা, N+1 রোধে include ব্যবহার, কার্সর পেজিনেশন প্রয়োগ, প্রোডাকশনে শুধুমাত্র migrate deploy চালানো এবং এক্সটেনশনের সাহায্যে টেন্যান্ট ডেটা নিরাপত্তা বজায় রাখা।",
          "e": "My core Prisma architectural rules: (1) Enforce a strict module singleton client to protect connection pools, (2) Eliminate N+1 queries via `include`/`select` projections, (3) Standardize on Cursor-based pagination for large datasets, (4) Restrict production pipelines strictly to `prisma migrate deploy`, and (5) Automate tenant isolation via Prisma Client Extensions.",
          "tip": "এই সংক্ষিপ্ত চেকলিস্টটি ইন্টারভিউয়ারকে তোমার পূর্ণাঙ্গ ওআরএম অভিজ্ঞতার ওপর ১০০% নিশ্চয়তা দেবে।"
        }
      ]
    },
    {
      "id": "mongodb-schema-crud",
      "name": "MongoDB Architecture & CRUD Operations",
      "desc": "Document Database, BSON, Embedded vs Reference Models, Atomic CRUD, Indexing in Mongo, Replica Sets & Sharding",
      "items": [
        {
          "lvl": "lvl1",
          "q": "MongoDB কী এবং BSON (Binary JSON) ফরম্যাট সাধারণ JSON-এর চেয়ে কীভাবে শক্তিশালী?",
          "m": "MongoDB হলো একটি ওপেন-সোর্স, ডকুমেন্ট-ভিত্তিক NoSQL ডেটাবেজ। এটি ডেটা টেবিল ও রো-এর বদলে ফ্লেক্সিবল 'Collections' এবং 'Documents'-এ সংরক্ষণ করে। সাধারণ JSON শুধুমাত্র স্ট্রিং, সংখ্যা ও বুলিয়ান চেনে—এতে Date, Binary Data বা ObjectId টাইপ নেই। MongoDB ইন্টারনালি `BSON` (Binary JSON) ফরম্যাট ব্যবহার করে। BSON অতিরিক্ত ডেটা টাইপ (Date, ObjectId, Decimal128, Binary/Buffer) সাপোর্ট করে এবং বাইনারি এনকোডিংয়ের কারণে ডেটা স্ক্যান ও ট্রাভার্সাল অতি দ্রুত গতিতে সম্পন্ন হয়।",
          "b": "মঙ্গোডিবি একটি জনপ্রিয় ডকুমেন্ট-ভিত্তিক নো-এসকিউএল ডাটাবেজ। এটি সাধারণ JSON এর বদলে BSON (বাইনারি JSON) ব্যবহার করে যা তারিখ, অবজেক্ট আইডি ও ডেসিমাল সংখ্যা সংরক্ষণের সুবিধা দেয় এবং বাইনারি ফরম্যাটে অতি দ্রুত কুয়েরি এক্সিকিউট করে।",
          "e": "MongoDB is a leading distributed document NoSQL database storing data as JSON-like documents within Collections. It stores data internally as BSON (Binary JSON), extending JSON with rich data types like Date, ObjectId, Decimal128, and raw binary, optimized for blazing-fast traversal.",
          "tip": "ইন্টারভিউতে 'BSON provides rich data types like Date, ObjectId, and faster binary traversal' উল্লেখ করবে।"
        },
        {
          "lvl": "lvl1",
          "q": "MongoDB-তে Embedded Document (Denormalization) বনাম Referenced Document (Normalization)-এর মধ্যে কখন কোনটি বেছে নেবে?",
          "m": "(১) `Embedded Document`: যখন ডেটা 'একসাথে পড়া হয়' (Contains-a relationship) এবং চাইল্ড ডেটার আকার নির্দিষ্ট বা ক্ষুদ্র (যেমন একটি ইউজারের ২-৩টি ঠিকানা বা ইনভয়েসের আইটেম লিস্ট)। এতে কোনো `$lookup` বা জয়েন ছাড়া সিঙ্গেল রিডে দ্রুত ডেটা আসে। (২) `Referenced Document`: যখন চাইল্ড ডেটা আনবাউন্ডেড বা বিশাল (যেমন একজন ব্লগারের ১০ লক্ষ কমেন্ট—কারণ মঙ্গোডিবির সিঙ্গেল ডকুমেন্টের সাইজ লিমিট ১৬MB!), অথবা ডেটা একাধিক কালেকশন থেকে শেয়ার্ড আকারে ব্যবহৃত হয় (যেমন প্রোডাক্ট ক্যাটালগ)।",
          "b": "এমবেডেড ডকুমেন্ট ব্যবহার করা হয় যখন ডেটা সীমিত থাকে এবং একসাথে পড়ার প্রয়োজন হয় (যেমন ইনভয়েসের আইটেম)। রেফারেন্সড ডকুমেন্ট ব্যবহার করা হয় যখন ডেটার সংখ্যা অসীম হতে পারে বা একাধিক জায়গায় শেয়ার করা প্রয়োজন (যেমন কমেন্ট বা ইউজার রেফারেন্স)।",
          "e": "Embed data (1:Few) when entities are tightly coupled, queried together, and have bounded growth to avoid joins. Reference data (1:Many or 1:Squillions) when related sub-documents grow unbounded (protecting against MongoDB's 16MB document ceiling) or require independent querying.",
          "code": "// Embedded:\n{ _id: '1', name: 'Jahid', addresses: [{ city: 'Dhaka' }] }\n// Referenced:\n{ _id: '1', name: 'Jahid', companyId: ObjectId('abc') }"
        },
        {
          "lvl": "lvl1",
          "q": "MongoDB-তে `ObjectId` কী এবং এর ১২-বাইটের অভ্যন্তরীণ কাঠামো কীভাবে তৈরি হয়?",
          "m": "মঙ্গোডিবির প্রতিটি ডকুমেন্টের ডিফল্ট প্রাইমারি কি হলো `_id` যা একটি ১২-বাইটের বাইনারি `ObjectId`। এর অভ্যন্তরীণ বিন্যাস: (১) প্রথম ৪ বাইট: ইউনিক্স টাইমস্ট্যাম্প (Timestamp - ফলে এটি নিজে থেকেই সময় অনুযায়ী সর্টেড থাকে)। (২) পরবর্তী ৫ বাইট: র্যান্ডম প্রসেস আইডেন্টিফায়ার (মেশিন ও প্রসেস ইউনিকনেস)। (৩) শেষ ৩ বাইট: ইনক্রিমেন্টিং কাউন্টার। এর বড় সুবিধা হলো: আমরা `_id.getTimestamp()` কল করে কোনো অতিরিক্ত কলাম ছাড়াই ডকুমেন্ট তৈরির সঠিক সময় বের করতে পারি।",
          "b": "অবজেক্ট আইডি হলো মঙ্গোডিবির ১২ বাইটের অনন্য প্রাইমারি কি। প্রথম ৪ বাইটে টাইমস্ট্যাম্প, পরের ৫ বাইটে প্রসেস ইউনিকনেস এবং শেষ ৩ বাইটে ইনক্রিমেন্টাল কাউন্টার থাকে। কোনো createdAt কলাম ছাড়াই অবজেক্ট আইডি থেকে সঠিক সময় বের করা যায়।",
          "e": "An ObjectId is a 12-byte BSON primary key composed of: a 4-byte Unix timestamp (ensuring natural temporal ordering), a 5-byte random machine/process value, and a 3-byte incrementing counter initialized randomly. This enables timestamp extraction directly from the ID.",
          "code": "const id = new ObjectId();\nconsole.log(id.getTimestamp()); // Returns exact creation Date"
        },
        {
          "lvl": "lvl1",
          "q": "MongoDB-তে মৌলিক CRUD অপারেশনের প্রধান কমান্ডগুলো কী কী?",
          "m": "(১) `Create`: `insertOne()`, `insertMany()`। (২) `Read`: `find()`, `findOne()`, সাথে প্রজেকশন ও সর্টিং (`.sort()`, `.limit()`, `.skip()`)। (৩) `Update`: `updateOne()`, `updateMany()`, `replaceOne()`—এগুলোতে অবশ্যই `$set`, `$inc`, `$push` অপারেটর ব্যবহার করতে হয়। (৪) `Delete`: `deleteOne()`, `deleteMany()`।",
          "b": "মঙ্গোডিবির ক্রাড কমান্ডসমূহ: তৈরি করতে insertOne ও insertMany; পড়তে find ও findOne; আপডেট করতে updateOne ও updateMany ($set সহ); এবং মুছতে deleteOne ও deleteMany ব্যবহৃত হয়।",
          "e": "MongoDB CRUD APIs: Create (`insertOne`, `insertMany`), Read (`find`, `findOne` with projections), Update (`updateOne`, `updateMany` using operators like `$set`, `$inc`, `$push`), and Delete (`deleteOne`, `deleteMany`).",
          "code": "await db.collection('orders').updateOne(\n  { _id: orderId },\n  { $set: { status: 'PAID' }, $inc: { version: 1 } }\n);"
        },
        {
          "lvl": "lvl1",
          "q": "MongoDB-তে Update করার সময় `$set` অপারেটর না দিলে কী মারাত্মক বিপর্যয় ঘটে?",
          "m": "যদি কোনো ডকুমেন্টে `{ name: 'Laptop', price: 1000, stock: 50 }` থাকে এবং আপনি আপডেট করার সময় `$set` না দিয়ে ভুল করে `updateOne({ _id: id }, { price: 1200 })` লিখে ফেলেন, তবে মঙ্গোডিবি পুরো পুরানো ডকুমেন্টটিকে প্রতিস্থাপন (Replace) করে ফেলবে! এর ফলে `name` এবং `stock` ফিল্ড সম্পূর্ণ গায়েব হয়ে গিয়ে শুধু `price` বেঁচে থাকবে! তাই ফিল্ড আপডেট করতে সর্বদা `$set: { price: 1200 }` ব্যবহার করতে হবে।",
          "b": "$set অপারেটর না দিলে মঙ্গোডিবি সম্পূর্ণ ডকুমেন্টকে প্রতিস্থাপন করে ফেলে, যার ফলে অন্যান্য প্রয়োজনীয় সব কলাম মুছে যায়। তাই শুধুমাত্র নির্দিষ্ট কলাম আপডেটের জন্য সর্বদা $set ব্যবহার বাধ্যতামূলক।",
          "e": "Omitting update operators (like `$set`) in legacy drivers or calling `replaceOne` overwrites the entire document, purging all unmentioned fields. Always wrap modifications inside atomic operators like `$set: { field: val }` or `$inc: { count: 1 }`.",
          "tip": "ইন্টারভিউতে '$set অপারেটর ছাড়া সম্পূর্ণ ডকুমেন্ট রিপ্লেস হওয়ার ঝুঁকি' উল্লেখ করা খুব গুরুত্বপূর্ণ।"
        },
        {
          "lvl": "lvl2",
          "q": "MongoDB Array Update Operators: `$push`, `$addToSet`, `$pull`, এবং Positional Operator (`$`) কীভাবে কাজ করে?",
          "m": "(১) `$push`: অ্যারেতে নতুন আইটেম যোগ করে (ডুপ্লিকেট হলেও)। (২) `$addToSet`: শুধুমাত্র তখনই আইটেম যোগ করে যদি আইটেমটি অ্যারেতে আগে থেকে না থাকে (Set-এর মতো ডুপ্লিকেট রোধ করে)। (৩) `$pull`: শর্ত পূরণকারী আইটেমকে অ্যারে থেকে ডিলিট করে দেয়। (৪) Positional Operator (`$`): নেস্টেড অ্যারের ঠিক যে আইটেমটি কোয়েরি ফিল্টারে ম্যাচ করেছে, হুবহু সেই নির্দিষ্ট আইটেমটির ফিল্ড আপডেট করে (`'items.$.price': 500`)।",
          "b": "$push অ্যারেতে নতুন মান যোগ করে, $addToSet ডুপ্লিকেট ছাড়া অনন্য মান যোগ করে, $pull অ্যারে থেকে উপাদান মুছে ফেলে এবং পজিশনাল অপারেটর ($) নেস্টেড অ্যারের নির্দিষ্ট ম্যাচ করা উপাদানকে আপডেট করে।",
          "e": "Array operators: `$push` appends elements to an array; `$addToSet` appends strictly if unique; `$pull` removes elements matching a filter; and the positional operator (`$`) targets the specific matched array element from the query criteria.",
          "code": "await db.collection('orders').updateOne(\n  { _id: orderId, 'items.productId': pId },\n  { $set: { 'items.$.price': newPrice } }\n);"
        },
        {
          "lvl": "lvl2",
          "q": "MongoDB Index Types: Single Field, Compound Index, Multikey Index, এবং TTL Index-এর ব্যবহার কী?",
          "m": "(১) `Single Field Index`: একটি মাত্র কলামে ইনডেক্স (`{ email: 1 }`)। (২) `Compound Index`: একাধিক কলামের ওপর ইনডেক্স (`{ tenantId: 1, createdAt: -1 }`)। (৩) `Multikey Index`: যখন কোনো অ্যারে ফিল্ডের ওপর ইনডেক্স তৈরি করা হয় (যেমন ট্যাগ্স অ্যারে), মঙ্গোডিবি স্বয়ংক্রিয়ভাবে প্রতিটি অ্যারে উপাদানের জন্য ইনডেক্স এন্ট্রি তৈরি করে। (৪) `TTL (Time-To-Live) Index`: তারিখ ফিল্ডের ওপর তৈরি ইনডেক্স যা নির্দিষ্ট সময় (যেমন ৩০ দিন বা ১ ঘণ্টা) পার হওয়ার পর ব্যাকগ্রাউন্ডে ডকুমেন্টটিকে স্বয়ংক্রিয়ভাবে ডাটাবেজ থেকে মুছে দেয় (ওটিপি বা সেশন ক্লিনআপের জন্য পারফেক্ট)।",
          "b": "মঙ্গোডিবি ইনডেক্স: সিঙ্গেল ফিল্ড একক কলামে চলে, কম্পাউন্ড ইনডেক্স একাধিক ফিল্ডে চলে, মাল্টিকি ইনডেক্স অ্যারের উপাদান ইনডেক্স করে এবং টিটিএল (TTL) ইনডেক্স নির্দিষ্ট সময় পর স্বয়ংক্রিয়ভাবে পুরানো ডাটা মুছে দেয়।",
          "e": "Index varieties: Single Field indexes one key; Compound indexes evaluate multi-attribute prefixes; Multikey indexes index array elements individually; TTL (Time-To-Live) indexes automatically purge documents after a predefined duration (ideal for OTP tokens or session logs).",
          "code": "db.collection('sessions').createIndex({ createdAt: 1 }, { expireAfterSeconds: 3600 }); // TTL Index"
        },
        {
          "lvl": "lvl2",
          "q": "MongoDB Replica Sets কী এবং Primary, Secondary, ও Arbiter নোড কীভাবে High Availability নিশ্চিত করে?",
          "m": "Replica Set হলো একাধিক মঙ্গোডিবি সার্ভারের একটি ক্লাস্টার যা একই ডেটা শেয়ার করে হাই-অ্যাভেইলেবিলিটি দেয়। ক্লাস্টারে ১টি `Primary` নোড থাকে যা সমস্ত রাইট অপারেশন গ্রহণ করে এবং অপলগ (Oplog) দিয়ে বাকি `Secondary` নোডগুলোতে ডেটা রেপ্লিকেট করে। কোনো কারণে প্রাইমারি নোড ক্র্যাশ করলে সেকেন্ডারি নোডগুলো একটি ইন্টারনাল ভোটিং বা ইলেকশন (Raft-like consensus) করে সেকেন্ডের মধ্যে নতুন প্রাইমারি নির্বাচিত করে। `Arbiter` নোডে কোনো ডেটা থাকে না, এটি শুধুমাত্র টাই-ব্রেকিং ভোটের জন্য ব্যবহৃত হয়।",
          "b": "রেপ্লিকা সেট ক্লাস্টারে ১টি প্রাইমারি ও একাধিক সেকেন্ডারি নোড থাকে। প্রাইমারি ডাউন হলে সেকেন্ডারি নোডগুলো স্বয়ংক্রিয় ভোটের মাধ্যমে নতুন প্রাইমারি বেছে নিয়ে নিরবচ্ছিন্ন সেবা নিশ্চিত করে। আরবিটার শুধুমাত্র ভোটিংয়ে অংশ নেয়।",
          "e": "A Replica Set provides automated redundancy: one Primary node handles writes and emits the replication Oplog, while Secondary nodes asynchronously replicate changes. If the Primary fails, secondaries hold an automated election electing a new Primary within seconds. Arbiters vote in elections without storing data.",
          "tip": "প্রোডাকশন মঙ্গোডিবির জন্য ন্যূনতম ৩টি নোড সমৃদ্ধ রেপ্লিকা সেট আবশ্যক।"
        },
        {
          "lvl": "lvl2",
          "q": "MongoDB Write Concern (`w: 1` vs `w: 'majority'`) এবং Read Concern-এর গুরুত্ব কী?",
          "m": "`Write Concern` নির্ধারণ করে ডাটাবেজ রাইট অপারেশনকে সফল ঘোষণা করার আগে কতগুলো নোডে ডেটা সেভ হওয়া পর্যন্ত অপেক্ষা করবে। `w: 1` মানে শুধু প্রাইমারি নোডের মেমরিতে ডেটা সেভ হলেই একনলেজমেন্ট দেয় (খুব দ্রুত কিন্তু প্রাইমারি ক্র্যাশ করলে ডেটা হারানোর ঝুঁকি থাকে)। আর `w: 'majority'` মানে রেপ্লিকা সেটের অর্ধেকের বেশি নোডে ডেটা নিশ্চিতভাবে কমিট হওয়ার পরই কেবল ক্লায়েন্টকে সফল রেসপন্স দেয়। আর্থিক ও গুরুত্বপূর্ণ ডাটায় সর্বদা `w: 'majority'` এবং `journal: true` ব্যবহার করা বাধ্যতামূলক।",
          "b": "রাইট কনসার্ন নির্ধারণ করে কতগুলো সার্ভারে ডেটা নিশ্চিত হওয়ার পর রেসপন্স দেওয়া হবে। w: 1 শুধুমাত্র প্রাইমারি নোডে সেভ হলেই রেসপন্স দেয়, আর w: 'majority' ক্লাস্টারের অধিকাংশ নোডে নিশ্চিত হওয়ার পর রেসপন্স দিয়ে ডেটা সুরক্ষার সর্বোচ্চ নিশ্চয়তা দেয়।",
          "e": "Write Concern controls the acknowledgment guarantee level: `w: 1` acknowledges once written to the Primary (fast, potential data loss upon failover). `w: 'majority'` guarantees persistence across a majority of replica set nodes with write-ahead journaling before responding.",
          "code": "db.collection('orders').insertOne(doc, { writeConcern: { w: 'majority', j: true } });"
        },
        {
          "lvl": "lvl2",
          "q": "MongoDB Capped Collections কী এবং সাধারণ কালেকশনের চেয়ে এরা কেন ভিন্ন?",
          "m": "Capped Collection হলো একটি ফিক্সড-সাইজ বৃত্তাকার (Circular Buffer) কালেকশন। আপনি যদি এর সাইজ ১০GB ফিক্সড করে দেন, কালেকশনটি ডিস্কে ঠিক ১০GB জায়গায় সীমাবদ্ধ থাকবে। যখন কালেকশন পূর্ণ হয়ে যায়, নতুন ডকুমেন্ট ইনসার্ট হলে এটি নিজে থেকেই সবচেয়ে পুরানো ডকুমেন্টটিকে ওভাররাইট করে ডিলিট করে দেয়। এর বড় সুবিধা হলো: এতে ইনসার্ট ও রিড স্পিড অবিশ্বাস্য দ্রুত এবং কোনো ম্যানুয়াল লগ ক্লিনআপ বা ডিলিট স্ক্রিপ্ট লিখতে হয় না (লগিং বা আইওটি ডেটার জন্য আদর্শ)।",
          "b": "ক্যাপড কালেকশন ফিক্সড সাইজের বৃত্তাকার বাফার হিসেবে কাজ করে। সর্বোচ্চ ধারণক্ষমতা পূর্ণ হলে এটি স্বয়ংক্রিয়ভাবে সবচেয়ে পুরানো ডেটা মুছে নতুন ডেটার জায়গা করে দেয়, ফলে কোনো ম্যানুয়াল ডিলিট ছাড়াই মেমোরি নিয়ন্ত্রণে থাকে।",
          "e": "Capped Collections are fixed-size circular collections preserving document insertion order. Once allocated size limits are reached, insertion of new documents automatically overwrites the oldest entries, providing high-throughput logging buffers with zero manual purging overhead.",
          "code": "db.createCollection('app_logs', { capped: true, size: 52428800, max: 50000 });"
        },
        {
          "lvl": "lvl3",
          "q": "MongoDB Sharding আর্কিটেকচার (Mongos Router, Config Servers, Shards) এবং Shard Key সিলেকশন স্ট্র্যাটেজি কীভাবে কাজ করে?",
          "m": "যখন ডেটার সাইজ বা কুয়েরি ভলিউম সিঙ্গেল সার্ভারের ধারণক্ষমতা ছাড়িয়ে যায়, Sharding পুরো ডেটাকে একাধিক সার্ভারে (Shards) হরিজোন্টালি ভাগ করে। আর্কিটেকচার: (১) `Mongos Router`: ক্লায়েন্টের সমস্ত কুয়েরি গ্রহণ করে উপযুক্ত শার্ডে পাঠায়। (২) `Config Server`: ক্লাস্টারের মেটাডাটা ও ডেটা ডিস্ট্রিবিউশন ম্যাপ ধরে রাখে। (৩) `Shards`: আসল ডেটা ধারণ করে। Shard Key নির্বাচন সবচেয়ে সংবেদনশীল: কখনোই মনোটোনিক অটো-ইনক্রিমেন্ট আইডি শার্ড কি হিসেবে নেওয়া যাবে না (Hotspotting তৈরি করে); সবসময় উচ্চ কার্ডিনালিটি বিশিষ্ট হ্যাশড কি বা কম্পোজিট কি (`{ tenantId: 1, _id: 'hashed' }`) নিতে হবে যাতে ডেটা সমস্ত শার্ডে সমানভাবে বিন্যস্ত থাকে।",
          "b": "শার্ডিং বিশাল ডাটাবেজকে একাধিক সার্ভারে বিভক্ত করে হরিজোন্টাল স্কেলিং নিশ্চিত করে। মঙ্গোস রাউটার কুয়েরি পরিচালনা করে এবং শার্ড কি অনুসারে ডেটা শার্ডগুলোতে ভাগ হয়। হটস্পটিং এড়াতে উচ্চ বৈচিত্র্যের হ্যাশড শার্ড কি নির্বাচন করা অপরিহার্য।",
          "e": "MongoDB Sharding distributes data horizontally across shards via Mongos Query Routers and Config Servers. Selecting a resilient Shard Key is paramount: avoid monotonic ascending keys that cause write hotspots; enforce high-cardinality compound or hashed shard keys (`{ tenantId: 1, _id: 'hashed' }`) for uniform chunk distribution.",
          "tip": "শার্ড কি নির্বাচনে 'Hotspotting vs Uniform Distribution' আলোচনা করা সিনিয়র আর্কিটেক্টের পরিচয়।"
        },
        {
          "lvl": "lvl3",
          "q": "MongoDB WiredTiger Storage Engine: চেকপয়েন্টস (Checkpoints) এবং রাইট-অ্যাহেড জার্নালিং (Journaling) কীভাবে ক্র্যাশ রিকভারি নিশ্চিত করে?",
          "m": "WiredTiger মেমোরি ক্যাশে ডেটা রাইট করে অতি দ্রুত রেসপন্স দেয়। ডিফল্টভাবে প্রতি ৬০ সেকেন্ড পর পর WiredTiger একটি ফিজিক্যাল 'Checkpoint' ডিস্কে লিখে স্ন্যাপশট পারসিস্ট করে। চেকপয়েন্টের মধ্যবর্তী সময়ে সার্ভার ক্র্যাশ করলে ডেটা যাতে না হারায়, সেজন্য প্রতি ১০০ মিলিসেকেন্ড বা প্রতি রাইটে একটি 'Journal' লগে ডিস্কে অপারেশন লেখা হয়। সার্ভার রিস্টার্টের সময় WiredTiger শেষ চেকপয়েন্ট লোড করে এবং জার্নাল লগটি রি-প্লে করে মাত্র কয়েক সেকেন্ডে সম্পূর্ণ ডেটাবেজ ১০০% নিখুঁত অবস্থায় রিকভার করে নেয়।",
          "b": "ওয়্যার্ডটাইগার ইঞ্জিন মেমরিতে কাজ করে প্রতি ৬০ সেকেন্ডে ডিস্কে চেকপয়েন্ট তৈরি করে। মধ্যবর্তী সময়ে ক্র্যাশ হলেও জার্নাল লগ রি-প্লে করে সমস্ত আন-কমিটেড ডেটা মুহূর্তের মধ্যে শতভাগ অক্ষত অবস্থায় ফিরিয়ে আনা হয়।",
          "e": "The WiredTiger storage engine combines dirty cache flushing with periodic 60-second Checkpoints. To guard the window between checkpoints, write-ahead Journaling persists binary operations to disk sequentially. Upon unexpected termination, WiredTiger replays journals from the last checkpoint to guarantee ACID durability.",
          "code": "// WiredTiger writes to memory cache -> journals sequentially -> checkpoints to disk every 60s"
        },
        {
          "lvl": "lvl3",
          "q": "MongoDB-তে 'Schema Design Patterns' (Bucket Pattern, Polymorphic Pattern, Subset Pattern) কীভাবে বাস্তব সমস্যার সমাধান করে?",
          "m": "(১) `Bucket Pattern`: টাইম-সিরিজ ডেটা বা আইওটি রিডিংয়ে প্রতি সেকেন্ডে কোটি রো ইনসার্ট না করে ১ ঘণ্টার সব রিডিংকে ১টি ডকুমেন্টে বাকেট করে রাখা। (২) `Subset Pattern`: একটি প্রোডাক্টের ১০০টি রিভিউয়ের মধ্যে শুধুমাত্র টপ ৫টি রিভিউ প্রোডাক্ট ডকুমেন্টে রাখা, বাকিগুলো আলাদা কালেকশনে রাখা (যাতে পেজ লোড ফাস্ট হয় ও মেমোরি বাঁচে)। (৩) `Polymorphic Pattern`: একই কালেকশনে ভিন্ন ভিন্ন ক্যাটাগরির পণ্য রাখা যাদের নিজস্ব স্পেসিফিক ফিল্ড ভিন্ন কিন্তু কমন ফিল্ড এক।",
          "b": "মঙ্গোডিবি স্কিমা প্যাটার্ন: বাকেট প্যাটার্ন টাইম-সিরিজ ডেটাকে গ্রুপ করে রাখে, সাবসেট প্যাটার্ন শুধুমাত্র টপ রিভিউগুলোকে ডকুমেন্টে রেখে দ্রুত লোডিং দেয় এবং পলিমরফিক প্যাটার্ন ভিন্ন বৈশিষ্ট্যের ডেটাকে একটি কালেকশনে ধারণ করে।",
          "e": "MongoDB design patterns: Bucket Pattern groups high-frequency time-series data into bounded hourly documents. Subset Pattern co-locates the top 5 most-accessed related entities (e.g. top reviews) within the root document to eliminate joins. Polymorphic Pattern stores variants of a family under a common collection.",
          "tip": "ইন্টারভিউতে Subset Pattern এবং Bucket Pattern-এর নাম বলা দারুণ টেকনিক্যাল প্লাস পয়েন্ট।"
        },
        {
          "lvl": "lvl3",
          "q": "Change Streams (`watch()`) কী এবং কীভাবে এটি রিয়েল-টাইম ইভেন্ট-ড্রিভেন নোটিফিকেশন সিস্টেমে ব্যবহৃত হয়?",
          "m": "Change Streams হলো MongoDB-র একটি বিল্ট-ইন ফিচার যা রেপ্লিকা সেটের অভ্যন্তরীণ Oplog রিড করে কালেকশনে যেকোনো ইনসার্ট, আপডেট বা ডিলিট হওয়া মাত্রই লাইভ ইভেন্ট স্ট্রিম করে (`collection.watch()`)। এটি ব্যবহার করে কোনো থার্ড-পার্টি মেসেজ ব্রোকার বা পোলিং ছাড়াই সরাসরি নোড জেএস ব্যাকএন্ডে সকেট দিয়ে লাইভ নোটিফিকেশন পুশ করা যায় বা Elasticsearch-এ রিয়েল-টাইমে সার্চ ইনডেক্স সিঙ্ক রাখা যায়।",
          "b": "চেঞ্জ স্ট্রিমস মঙ্গোডিবির লাইভ ডেটা পরিবর্তনের ওপর ভিত্তি করে রিয়েল-টাইম ইভেন্ট সরবরাহ করে। এর মাধ্যমে ডাটাবেজে কোনো পরিবর্তন হওয়া মাত্রই স্বয়ংক্রিয়ভাবে ক্লায়েন্টে সকেট নোটিফিকেশন বা সার্চ সিঙ্ক পরিচালনা করা যায়।",
          "e": "Change Streams allow applications to stream real-time data mutations without polling by tailing the replication Oplog. Developers subscribe via `collection.watch()`, feeding event payloads directly into WebSockets or search index pipelines.",
          "code": "const changeStream = db.collection('orders').watch();\nchangeStream.on('change', (next) => {\n  io.emit('order_updated', next.fullDocument);\n});"
        },
        {
          "lvl": "lvl3",
          "q": "MongoDB-তে Memory Overhead ও Working Set কীভাবে ক্যালকুলেট করবে এবং RAM-এর বাইরে ডেটা গেলে কী ঘটে?",
          "m": "`Working Set` হলো ডাটাবেজের মোট ডেটা এবং ইনডেক্সের সেই অংশ যা সবচেয়ে বেশি সক্রিয়ভাবে ব্যবহার হচ্ছে। আদর্শ অবস্থায় Working Set সর্বদা সার্ভারের ফিজিক্যাল RAM-এর ভেতরে থাকতে হবে। যদি Working Set র্যাম ছাড়িয়ে যায়, তবে মঙ্গোডিবিকে ডিস্ক পেজ সোয়াপিং (Disk Paging) করতে হয়, যার ফলে কুয়েরি স্পিড ১০০ গুণ স্লো হয়ে যায় এবং সার্ভার থ্রুপুট ভেঙে পড়ে। `db.stats()` এবং `wiredTiger.cache` মেট্রিক্স দিয়ে আমরা রিয়েল-টাইমে RAM ব্যবহার মনিটর করি।",
          "b": "ওয়ার্কিং সেট হলো সক্রিয়ভাবে ব্যবহৃত ডেটা ও ইনডেক্সের মেমোরি সাইজ। এটি সার্ভারের র্যামের মধ্যে না থাকলে ডাটাবেজ ডিস্ক পেজিং শুরু করে মারাত্মক স্লো হয়ে যায়। তাই র্যামের সাইজ সবসময় ওয়ার্কিং সেটের চেয়ে বড় রাখা বাধ্যতামূলক।",
          "e": "The Working Set comprises frequently accessed documents and indexes. When the Working Set exceeds available WiredTiger RAM caches, disk thrashing occurs via OS page faults, crashing query throughput. Ensure RAM exceeds total active index and frequently accessed data footprints.",
          "tip": "ইন্টারভিউতে 'Ensure RAM exceeds Working Set to prevent disk paging' নীতি তুলে ধরবে।"
        },
        {
          "lvl": "situation",
          "q": "MongoDB-তে একটি ডকুমেন্টের সাইজ ১৬MB লিমিট ক্রস করায় `BSONObjectTooLarge` এরর দিয়ে প্রোডাকশন এপিআই ক্র্যাশ করল। কীভাবে রি-আর্কিটেক্ট করবে?",
          "m": "কারণ: কোনো ডকুমেন্টের ভেতর আনবাউন্ডেড অ্যারে (যেমন কোটি কোটি লগ বা অ্যাক্টিভিটি হিস্ট্রি) এমবেড করে রাখা হয়েছিল। সমাধান: (১) আনবাউন্ডেড অ্যারেকে এমবেড না করে 'Referenced Model' এ রূপান্তর করব: অ্যাক্টিভিটিগুলোকে একটি আলাদা `ActivityLogs` কালেকশনে রেখে সেখানে প্যারেন্ট `userId` দিয়ে রেফারেন্স করব। (২) বড় বাইনারি ফাইল বা ছবির জন্য মঙ্গোডিবির `GridFS` ব্যবহার করব যা ফাইলকে ২৫৫KB-এর ছোট ছোট চাঙ্কে ভাগ করে স্টোর করে। (৩) পুরানো ডেটার জন্য TTL ইন্ডেক্স ব্যবহার করে আর্কাইভ করব।",
          "b": "মঙ্গোডিবির ১৬ মেগাবাইট সীমা অতিক্রম প্রতিরোধে আনবাউন্ডেড অ্যারেকে পৃথক কালেকশনে সরিয়ে রেফারেন্স মডেল তৈরি করতে হবে। বড় ফাইলের ক্ষেত্রে GridFS ব্যবহার করে ফাইলগুলোকে ২৫৫ কেবি চাঙ্কে ভাগ করে সংরক্ষণ করতে হবে।",
          "e": "Resolve `BSONObjectTooLarge` by decomposing unbounded embedded arrays into normalized child collections referencing the parent ID. For massive binary assets, adopt MongoDB's `GridFS` chunking standard, storing media across 255KB bucket chunks.",
          "code": "// Split unbounded activities into separate collection with parent reference:\n{ _id: ObjectId(), parentId: ObjectId('...'), log: 'Action' }"
        },
        {
          "lvl": "situation",
          "q": "একটি কুয়েরি রান করতে গিয়ে কোটি ডকুমেন্টের কালেকশনে পুরো সার্ভারের CPU ১০০% হয়ে গেছে। কীভাবে কুয়েরি এক্সিকিউশন প্ল্যান বিশ্লেষণ করবে?",
          "m": "আমরা কুয়েরির শেষে `.explain('executionStats')` রান করব। এক্সিকিউশন স্ট্যাটে ৩টি জিনিস দেখব: (১) `stage`: এটি যদি `COLLSCAN` (Collection Scan) দেখায়, তার মানে কোনো ইনডেক্স ব্যবহার হচ্ছে না এবং পুরো কালেকশন স্ক্যান হচ্ছে! (২) `totalDocsExamined` বনাম `nReturned`: যদি ১০টি রেজাল্ট পেতে ১০ লক্ষ ডকুমেন্ট স্ক্যান করতে হয়, তবে নিশ্চিতভাবে ইনডেক্স মিসিং। (৩) সমাধান: কুয়েরির ফিল্টার ফিল্ডের ওপর একটি সুনির্দিষ্ট B-Tree বা কম্পোজিট ইনডেক্স তৈরি করব যাতে স্টেজটি `IXSCAN` (Index Scan) এ রূপান্তরিত হয়।",
          "b": "কুয়েরি বিশ্লেষণ করতে .explain('executionStats') চালাতে হবে। COLLSCAN দেখালে বুঝতে হবে ইনডেক্স নেই। উপযুক্ত ইনডেক্স তৈরি করে স্টেজকে IXSCAN এ রূপান্তর করলে কুয়েরি মুহূর্তেই সম্পন্ন হবে।",
          "e": "Profile slow queries via `.explain('executionStats')`. Look for `stage: 'COLLSCAN'` (full table scan) and a catastrophic disparity between `totalDocsExamined` and `nReturned`. Apply a compound index covering the query predicate to force rapid `IXSCAN` executions.",
          "code": "db.orders.find({ tenantId: '123', status: 'PAID' }).explain('executionStats');"
        },
        {
          "lvl": "situation",
          "q": "একাধিক নোড থেকে একই সাথে ডেটা ইনসার্ট করার সময় ডুপ্লিকেট ইমেইল বা ফোন নম্বর সেভ হয়ে যাচ্ছে। মঙ্গোডিবিতে কীভাবে ডেটাবেজ স্তরে গ্যারান্টি দেবে?",
          "m": "সমাধান: শুধু অ্যাপ্লিকেশন কোডে `findOne()` চেক করার ওপর নির্ভর করা যাবে না (কারণ কনকারেন্ট রিকোয়েস্টে রেস কন্ডিশন হয়)। আমরা কালেকশনে ডেটাবেজ স্তরে একটি Unique Index তৈরি করব: `db.users.createIndex({ email: 1 }, { unique: true })`। এর ফলে একাধিক রিকোয়েস্ট একই সময়ে আসলেও ডাটাবেজ ইঞ্জিন প্রথমটিকে ইনসার্ট করে বাকিগুলোকে সাথে সাথে `E11000 duplicate key error` দিয়ে রিজেক্ট করবে।",
          "b": "রেস কন্ডিশন ঠেকাতে শুধুমাত্র কোডের ওপর নির্ভর না করে ডাটাবেজে ইউনিক ইনডেক্স তৈরি করতে হবে। মঙ্গোডিবি ইঞ্জিন নিজে থেকেই ডুপ্লিকেট ইনসার্ট আটকে E11000 এরর দিয়ে তথ্যের অভিন্নতা নিশ্চিত করবে।",
          "e": "Application-level checks suffer from race conditions. Enforce database-level uniqueness via Unique Indexes: `createIndex({ email: 1 }, { unique: true })`. Concurrent duplicates are rejected immediately with atomic `E11000` duplicate key errors.",
          "code": "db.collection('users').createIndex({ email: 1 }, { unique: true });"
        },
        {
          "lvl": "situation",
          "q": "প্রোডাকশন ডেটাবেজে একটি কালেকশনে ১০ কোটি রো রয়েছে। নতুন একটি ইনডেক্স তৈরি করতে গিয়ে পুরো প্রোডাকশন ডাটাবেজ রিড/রাইট লক হয়ে গেছে। নিরাপদ ইনডেক্সিং কীভাবে করবে?",
          "m": "MongoDB v4.2-এর আগের ভার্সনে ইনডেক্স তৈরির সময় ডাটাবেজ এক্সক্লুসিভ লক নিত। MongoDB 4.2+ এ ব্যাকগ্রাউন্ড ইনডেক্সিং ডিফল্টভাবে নন-ব্লকিং অপ্টিমাইজেশনে চলে। তবে সেফ প্র্যাকটিস হলো: রেপ্লিকা সেটের ক্ষেত্রে 'Rolling Index Build' স্ট্র্যাটেজি নেওয়া: প্রথমে সেকেন্ডারি নোডগুলোকে একে একে ক্লাস্টার থেকে ড্রপ করে মেইনটেন্যান্স মোডে ইনডেক্স বিল্ড করা, এরপর প্রাইমারিকে স্টেপ-ডাউন করিয়ে নতুন ইনডেক্সড নোডকে প্রাইমারি বানানো। ফলে লাইভ ট্রাফিকের ০ সেকেন্ড ডাউনটাইম হয়।",
          "b": "বিশাল টেবিলে ইনডেক্সিংয়ের সময় ডাউনটাইম এড়াতে আধুনিক মঙ্গোডিবির নন-ব্লকিং বিল্ড ব্যবহার করতে হয় অথবা রোলিং ইনডেক্স স্ট্র্যাটেজি অনুযায়ী সেকেন্ডারি নোডগুলোতে একে একে ইনডেক্স বানিয়ে লাইভ ট্রাফিক সুরক্ষিত রাখতে হয়।",
          "e": "In high-traffic clusters, build indexes using Rolling Index Builds: isolate Secondary replica nodes sequentially, build the index locally in standalone maintenance mode, rejoin, and trigger a graceful primary stepdown once secondaries are caught up, achieving zero downtime.",
          "tip": "রেপ্লিকা সেটে Rolling Index Build-এর কথা বলা সিনিয়র ডিবিএ ও ব্যাকএন্ড আর্কিটেকচারের গভীরতা প্রমাণ করে।"
        },
        {
          "lvl": "situation",
          "q": "মঙ্গোডিবিতে একটি ডেটাবেজ আপডেট করার সময় আংশিক ডেটা আপডেট হয়ে ক্র্যাশ করায় ডেটা ইনকনসিস্টেন্ট হয়ে গেছে। কীভাবে অ্যাটমিকালি রোলব্যাক নিশ্চিত করবে?",
          "m": "সমাধান: আমরা MongoDB Multi-Document ACID Transactions ব্যবহার করব। সেশন ওপেন করে `session.startTransaction()` দিয়ে কাজ শুরু করব। যদি কোনো একটি আপডেট বা ইনসার্ট ফেইল করে, আমরা `await session.abortTransaction()` কল করব। এর ফলে পূর্বের সমস্ত পরিবর্তন স্বয়ংক্রিয়ভাবে রোলব্যাক হয়ে ডাটাবেজ পূর্বের নিখুঁত অবস্থায় ফিরে যাবে। কাজ সফল হলেই কেবল `commitTransaction()` কল করব।",
          "b": "আংশিক আপডেটে ডেটা করাপ্ট হওয়া ঠেকাতে মঙ্গোডিবি ট্রানজাকশন ব্যবহার করতে হবে। কোনো ত্রুটি হলে abortTransaction দিয়ে সাথে সাথে সব পরিবর্তন রোলব্যাক করে ডাটাবেজ সুরক্ষিত রাখা যায়।",
          "e": "Protect multi-document mutations by wrapping operations inside client sessions with `startTransaction()`. Trap errors inside a catch block to execute `session.abortTransaction()`, ensuring atomic rollback across all affected documents.",
          "code": "const session = client.startSession();\nsession.startTransaction();\ntry {\n  // mutations...\n  await session.commitTransaction();\n} catch (e) {\n  await session.abortTransaction();\n} finally { session.endSession(); }"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর মাল্টি-স্টোর প্রোডাক্ট ক্যাটালগে আন-স্ট্রাকচার্ড ও ডায়নামিক ভ্যারিয়েন্ট (সাইজ, রঙ, মডেল) হ্যান্ডেল করতে MongoDB কীভাবে ব্যবহার করা যায়?",
          "m": "কাপড়ের দোকানে থাকে সাইজ ও রঙ, মোবাইলের দোকানে থাকে র‍্যাম, রম ও আইএমইআই নম্বর, আর ওষুধের দোকানে থাকে পাওয়ার ও জেনেরিক নাম। রিলেশনাল ডাটাবেজে এই ভিন্ন ভিন্ন ফিল্ডের জন্য শত শত ফাঁকা কলাম বা জটিল EAV (Entity-Attribute-Value) মডেল লাগত। MongoDB-র পলিমরফিক ডকুমেন্ট মডেলে আমরা একটি কমন `Product` ডকুমেন্টের ভেতর `attributes: { ram: '8GB', color: 'Black', imei: [...] }` অবজেক্ট রাখতে পারি। প্রতিটি দোকানদার তার নিজস্ব ইচ্ছামতো কাস্টম ফিল্ড যোগ করতে পেরেছে কোনো স্কিমা মাইগ্রেশন ছাড়াই।",
          "b": "দোকানি ক্যাটালগে বিভিন্ন ধরনের পণ্যের কাস্টম ফিল্ড পরিচালনার জন্য মঙ্গোডিবির ফ্লেক্সিবল স্কিমা ব্যবহার করা হয়েছিল। কোনো স্কিমা মাইগ্রেশন ছাড়াই মোবাইলের র‍্যাম বা কাপড়ের সাইজ অনায়াসে ডায়নামিক অ্যাট্রিবিউট অবজেক্টে সেভ করা সম্ভব ছিল।",
          "e": "In retail catalogs with heterogeneous attributes (apparel sizes vs smartphone IMEI/RAM), MongoDB eliminates brittle SQL EAV tables. Storing dynamic attributes inside polymorphic document dictionaries enables store owners to define custom properties without running DDL schema migrations.",
          "tip": "ডায়নামিক ই-কমার্স ক্যাটালগে রিলেশনাল EAV বনাম NoSQL পলিমরফিক মডেলের তুলনা চমৎকার আর্কিটেকচারাল ডিসিশন।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ শত শত স্টোরের দৈনিক ইনভেন্টরি অডিট লগ এবং ক্যাশ ড্রয়ার ট্র্যাকিংয়ে Capped Collections কীভাবে অপটিমাইজ করেছিল?",
          "m": "দোকানগুলোতে প্রতি সেকেন্ডে শত শত বারকোড স্ক্যান ও ক্যাশ ড্রয়ার ইভেন্ট ঘটত। সাধারণ কালেকশনে রাখলে প্রতি মাসে কোটি রো জমে ডিস্ক ফুল হয়ে যেত। আমরা প্রতিটি দোকানের জন্য একটি করে `Capped Collection` কনফিগার করেছিলাম যার ম্যাক্স সাইজ ছিল ৫০০MB। নতুন লগ আসলে স্বয়ংক্রিয়ভাবে সবচেয়ে পুরানো লগ ওভাররাইট হয়ে মুছে যেত। এর ফলে ডিস্ক কখনো ফুল হয়নি এবং কোনো ক্রন জব বা ব্যাকগ্রাউন্ড ডিলিট স্ক্রিপ্ট ছাড়াই লাইভ অডিট ট্রেইল সুপারফাস্ট পারফর্ম করেছিল।",
          "b": "দোকানি অডিট লগে আমরা ক্যাপড কালেকশন ব্যবহার করেছি। ৫০০ মেগাবাইট সাইজ ফিক্সড থাকায় নতুন লগ আসলে স্বয়ংক্রিয়ভাবে পুরানো লগ মুছে যেত, ফলে কোনো ম্যানুয়াল ক্লিনআপ ছাড়াই ডিস্ক সবসময় সুরক্ষিত ছিল।",
          "e": "Utilized MongoDB Capped Collections for Dokani's high-velocity register audit logs, bounding collections to 500MB per tenant. The FIFO circular buffer automatically recycled obsolete events at wire speed without triggering expensive database DELETE locks.",
          "code": "db.createCollection('tenant_audit_logs', { capped: true, size: 524288000 });"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে ভিডিও লেকচার দেখার ওয়াচ-টাইম ও ইউজার সেশন ট্র্যাকিংয়ে TTL Indexes কীভাবে মেমোরি বাঁচিয়েছিল?",
          "m": "লাইভ ভিডিও দেখার সময় প্রতি ১০ সেকেন্ডে একটি পোলিং পিং আসত যা লাখ লাখ সাময়িক সেশন তৈরি করত। এই ডেটা চিরতরে ডাটাবেজে রাখার কোনো প্রয়োজন ছিল না (শুধু কারেন্ট অ্যাক্টিভ ছাত্রদের তালিকা দেখার জন্য)। আমরা সেশনের ওপর একটি TTL Index তৈরি করেছিলাম: `expireAfterSeconds: 300` (৫ মিনিট)। ছাত্র ব্রাউজার বন্ধ করে দিলে মঙ্গোডিবি ব্যাকগ্রাউন্ড থ্রেড ৫ মিনিট পর নিজে থেকেই ডেটাবেজ থেকে সেই সেশন মুছে দিত। আমাদের ডাটাবেজ মেমোরি সর্বদা ঝকঝকে ও দ্রুত ছিল।",
          "b": "পিটিটিএবিডিতে ছাত্রদের লাইভ ভিডিও দেখার সাময়িক সেশন স্বয়ংক্রিয়ভাবে মুছে ফেলতে টিটিএল ইনডেক্স ব্যবহার করা হয়েছিল। ৫ মিনিট পর অব্যবহৃত সেশন স্বয়ংক্রিয় ডিলিট হওয়ায় কোনো অতিরিক্ত স্ক্রিপ্ট ছাড়াই ডাটাবেজ মেমোরি মুক্ত থাকত।",
          "e": "Engineered ephemeral session heartbeats in PTTABD using TTL Indexes expiring after 300 seconds. When students exited, idle sessions vanished automatically via MongoDB's background TTL thread without running manual sweeping crons.",
          "code": "db.video_sessions.createIndex({ lastPing: 1 }, { expireAfterSeconds: 300 });"
        },
        {
          "lvl": "realworld",
          "q": "MongoDB ও PostgreSQL-এর হাইব্রিড আর্কিটেকচার (Polyglot Persistence): কখন দুটি ডাটাবেজ একই সিস্টেমে একসাথে ব্যবহার করবে?",
          "m": "Dokani POS-এর মতো বড় প্ল্যাটফর্মে আমরা Polyglot Persistence ব্যবহার করেছি: (১) `PostgreSQL`: সমস্ত কোর ট্রানজাকশন, ইনভয়েস বিলিং, কাস্টমার বাকি লেজার এবং ডাবল-এন্ট্রি অ্যাকাউন্টিংয়ের জন্য (যেখানে ১০০% ACID এবং রিলেশনাল ইন্টিগ্রিটি আবশ্যক)। (২) `MongoDB`: ডায়নামিক প্রোডাক্ট ক্যাটালগ প্রপার্টিজ, আন-স্ট্রাকচার্ড অডিট লগ এবং রিয়েল-টাইম চেঞ্জ স্ট্রিমস নোটিফিকেশনের জন্য। প্রতিটি ডাটাবেজ তার নিজস্ব শক্তিমত্তার জায়গায় ব্যবহৃত হওয়ায় পুরো আর্কিটেকচার ছিল অপরাজেয়।",
          "b": "পলিগ্লট পারসিস্টেন্সে আমরা পোস্টগ্রেসকিউএল ব্যবহার করেছি আর্থিক লেনদেন, বিলিং ও অ্যাকাউন্টিংয়ের জন্য; আর মঙ্গোডিবি ব্যবহার করেছি ডায়নামিক প্রোডাক্ট ক্যাটালগ ও অডিট লগের জন্য। এতে উভয় ডাটাবেজের সেরা সুবিধা পাওয়া গেছে।",
          "e": "Polyglot Persistence leverages specialized database engines for appropriate domains: PostgreSQL handles ACID financial ledgers, double-entry bookkeeping, and relational schemas, while MongoDB serves dynamic polymorphic product catalogs and unstructured telemetry logs.",
          "tip": "পোস্টগ্রেস ও মঙ্গোডিবি একসাথে ব্যবহারের এই পলিগ্লট পারসিস্টেন্স ব্যাখ্যা করা সিনিয়র সফটওয়্যার আর্কিটেক্টদের চূড়ান্ত নমুনা।"
        },
        {
          "lvl": "realworld",
          "q": "MongoDB ডেটাবেজ আর্কিটেকচার ও ডেপ্লয়মেন্টে টিম স্ট্যান্ডার্ড নিশ্চিত করতে তোমার মূল প্রিন্সিপালগুলো কী?",
          "m": "আমার মূল নীতিসমূহ: (১) প্রোডাকশনে কখনোই স্ট্যান্ডঅ্যালন নোড নয়—সর্বদা ন্যূনতম ৩-নোড Replica Set ব্যবহার করা। (২) প্রতিটি ঘন ঘন কুয়েরি করা ফিল্ডের ওপর সুনির্দিষ্ট B-Tree বা কম্পোজিট ইনডেক্স নিশ্চিত করা (`COLLSCAN` নিষিদ্ধ)। (৩) আনবাউন্ডেড অ্যারে পরিহার করে সাবসেট বা রেফারেন্স প্যাটার্ন মেনে ১৬MB লিমিট রক্ষা করা। (৪) আর্থিক ডাটায় সর্বদা `w: 'majority'` রাইট কনসার্ন এনফোর্স করা। (৫) নিয়মিত ব্যাকআপ (`mongodump`) ও ডিজাস্টার রিকভারি নিশ্চিত করা।",
          "b": "আমার প্রধান নীতিসমূহ: প্রোডাকশনে রেপ্লিকা সেট নিশ্চিত করা, কোনো COLLSCAN না রেখে উপযুক্ত ইনডেক্স দেওয়া, ১৬ মেগাবাইট সীমা রক্ষা, মেজোরিটি রাইট কনসার্ন বজায় রাখা এবং নিয়মিত স্বয়ংক্রিয় ব্যাকআপ পরিচালনা করা।",
          "e": "My core MongoDB architecture rules: (1) Mandatory 3-node Replica Sets in production, (2) Zero tolerance for COLLSCANs via verified compound indexing, (3) Bounded document growth enforcing Subset patterns against 16MB ceilings, (4) `w: 'majority'` write concerns on critical mutations, and (5) Automated snapshot backups.",
          "tip": "এই সংক্ষিপ্ত নীতিগুলো তোমার NoSQL দক্ষতার পূর্ণাঙ্গ বিশ্বাসযোগ্যতা প্রতিষ্ঠা করবে।"
        }
      ]
    },
    {
      "id": "mongoose-odm-lifecycle",
      "name": "Mongoose ODM & Schema Lifecycle",
      "desc": "Schemas, Models, Document Middleware (pre/post save), Virtuals, Population, Custom Validators, Discriminators",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Mongoose ODM কী এবং এটি প্লেইন MongoDB ড্রাইভারের চেয়ে কেন বেশি ব্যবহৃত হয়?",
          "m": "Mongoose হলো Node.js এবং MongoDB-এর জন্য একটি Object Data Modeling (ODM) লাইব্রেরি। প্লেইন মঙ্গো ড্রাইভার স্কিমাহীন (Schema-less) হওয়ায় যেকোনো ডেটা অগোছালোভাবে ইনসার্ট করা যায়। Mongoose অ্যাপ্লিকেশান লেভেলে স্ট্রিক্ট Schema, ডেটা ভ্যালিডেশন, ডিফল্ট ভ্যালু, টাইপ কাস্টিং এবং বিজনেস লজিক এনফোর্স করে। এর ফলে প্রোডাকশন অ্যাপ্লিকেশনে ডেটা করাপশন রোধ হয় এবং কোড অনেক ক্লিন ও প্রেডিক্টেবল থাকে।",
          "b": "মঙ্গুজ হলো নোড.জেএস এর জন্য একটি ওডিএম লাইব্রেরি যা মঙ্গোডিবির সাথে কাজ করার সময় ডেটা মডেলিং ও স্কিমা ভ্যালিডেশনের নিশ্চয়তা দেয়। সাধারণ ড্রাইভারের বিপরীতে মঙ্গুজ কঠোর ডেটা টাইপ, মিডলওয়্যার হুক এবং রিলেশনশিপ ব্যবস্থাপনার সুবিধা প্রদান করে।",
          "e": "Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. Unlike the raw, schema-less MongoDB driver, Mongoose provides application-level strict schema validation, type casting, query building, business logic middleware, and lifecycle hooks.",
          "tip": "বলো: 'Mongoose provides application-level schemas and validation over schema-less MongoDB documents.'"
        },
        {
          "lvl": "lvl1",
          "q": "Mongoose-এ Schema এবং Model-এর মধ্যে মূল পার্থক্য কী?",
          "m": "Schema হলো ডকুমেন্টের একটি ব্লুপ্রিন্ট বা নকশা—যা সংজ্ঞায়িত করে ডকুমেন্টে কী কী ফিল্ড থাকবে, তাদের ডেটা টাইপ কী হবে (String, Number, Date), কোন ফিল্ড রিকোয়ার্ড এবং কী কী ভ্যালিডেশন রুলস থাকবে। আর Model হলো সেই স্কিমার ওপর ভিত্তি করে তৈরি হওয়া একটি জাভাস্ক্রিপ্ট ক্লাস কনস্ট্রাক্টর, যা সরাসরি মঙ্গোডিবি কালেকশনের সাথে যুক্ত হয়ে ডেটাবেজে কুয়েরি (CRUD যেমন `find`, `create`, `updateOne`) চালানোর মেথড সরবরাহ করে।",
          "b": "স্কিমা হলো ডকুমেন্টের গঠন ও ডেটা টাইপের নকশা, আর মডেল হলো সেই স্কিমা থেকে তৈরি ক্লাস যা ডাটাবেজ কালেকশনের সাথে সরাসরি যোগাযোগ করে কুয়েরি পরিচালনা করে।",
          "e": "A Schema defines the structure, shape, field types, and validation rules of documents within a collection. A Model is a compiled constructor derived from the schema that provides the direct interface for database queries and CRUD operations.",
          "code": "const userSchema = new mongoose.Schema({ name: String });\nconst User = mongoose.model('User', userSchema);"
        },
        {
          "lvl": "lvl1",
          "q": "Mongoose-এ Custom Validator কীভাবে তৈরি করা যায়?",
          "m": "Mongoose স্কিমার যেকোনো ফিল্ডে `validate` প্রোপার্টি দিয়ে কাস্টম ভ্যালিডেশন ডিফাইন করা যায়। এতে একটি `validator` ফাংশন থাকে যা ট্রু অথবা ফলস রিটার্ন করে, এবং একটি কাস্টম এরর `message` থাকে। সিনক্রোনাস বা অ্যাসিনক্রোনাস (যেমন ইউনিকনেস চেক করা) উভয় ধরনের ভ্যালিডেশনই হ্যান্ডেল করা সম্ভব।",
          "b": "মঙ্গুজ স্কিমা ফিল্ডে validate অবজেক্ট যুক্ত করে কাস্টম ভ্যালিডেশন তৈরি করা হয়। ভ্যালিডেটর ফাংশন শর্ত পূরণ করলে ট্রু এবং ব্যর্থ হলে ফলস রিটার্ন করে এরর মেসেজ পাঠায়।",
          "e": "Custom validators are defined on schema fields using the validate property containing a validator function (sync or async returning a boolean) and an informative error message string.",
          "code": "const productSchema = new mongoose.Schema({\n  sku: {\n    type: String,\n    validate: {\n      validator: (v: string) => /^[A-Z]{3}-\\d{4}$/.test(v),\n      message: props => `${props.value} is not a valid SKU format!`\n    }\n  }\n});"
        },
        {
          "lvl": "lvl1",
          "q": "Mongoose-এ `populate()` মেথড কীভাবে কাজ করে এবং এর বিহাইন্ড দ্য সিন মেকানিজম কী?",
          "m": "`populate()` হলো রেফারেন্স করা অন্যান্য কালেকশনের ডকুমেন্টের ডেটা স্বয়ংক্রিয়ভাবে এনে মূল ডকুমেন্টে ইনজেক্ট করার উপায়। স্কিমাতে `ref: 'ModelName'` দিয়ে অবজেক্ট আইডি রেফারেন্স করা থাকলে `populate('userId')` কল করলে মঙ্গুজ ইন্টারনালি মঙ্গোডিবির সেকেন্ডারি কুয়েরি চালায় (বা ইন্টারনাল `$lookup` চালায়) এবং সংশ্লিষ্ট আইডিগুলোর ডকুমেন্ট ফেচ করে রিয়েল অবজেক্ট দিয়ে আইডিগুলোকে রিপ্লেস করে দেয়।",
          "b": "পপুলেট মেথড রেফারেন্সকৃত অন্য কালেকশন থেকে অবজেক্ট আইডি ধরে সংশ্লিষ্ট পুরো ডকুমেন্ট এনে মূল ডকুমেন্টের ভেতর সাজিয়ে দেয়। এটি ইন্টারনালি দ্বিতীয় কুয়েরি চালিয়ে ডেটা যুক্ত করে।",
          "e": "Mongoose populate() automatically replaces specified document path ObjectIds with corresponding documents from foreign collections. Under the hood, it performs secondary batch queries (or $lookup operations) to resolve referenced documents.",
          "code": "const order = await Order.findById(id).populate('customer', 'name email');"
        },
        {
          "lvl": "lvl1",
          "q": "Mongoose-এ `Virtuals` কী এবং এটি ডাটাবেজ পারফরম্যান্সে কীভাবে ভূমিকা রাখে?",
          "m": "Virtuals হলো এমন কিছু ভার্চুয়াল প্রোপার্টি যা আপনি স্কিমাতে ডিফাইন করতে পারেন কিন্তু তা মঙ্গোডিবি ডেটাবেজে সেভ হয় না! অর্থাৎ এটি মেমোরিতে অন-দ্য-ফ্লাই ক্যালকুলেট হয়। উদাহরণস্বরূপ, যদি ডকুমেন্টে `firstName` এবং `lastName` সেভ থাকে, তবে `fullName` ভার্চুয়াল প্রোপার্টি দিয়ে অন-দ্য-ফ্লাই ফুলনেম রিটার্ন করা যায়। ডাটাবেজে স্টোরেজ নষ্ট হয় না এবং ডেটা রিডান্ড্যান্সি দূর হয়।",
          "b": "ভার্চুয়াল হলো এমন ফিল্ড যা মেমোরিতে রানটাইমে হিসেব করা হয় কিন্তু ডাটাবেজ স্টোরেজে স্থায়ীভাবে সেভ হয় না। এটি অপ্রয়োজনীয় স্টোরেজ খরচ ও রিডান্ড্যান্সি কমায়।",
          "e": "Virtuals are document properties that can get and set values but do not get persisted to MongoDB storage. They compute derived values in-memory (e.g., fullName from firstName and lastName), saving disk space and eliminating sync drift.",
          "code": "userSchema.virtual('fullName').get(function() {\n  return `${this.firstName} ${this.lastName}`;\n});"
        },
        {
          "lvl": "lvl2",
          "q": "Mongoose Document Middleware (pre/post save hooks) কীভাবে কাজ করে এবং পাসওয়ার্ড হ্যাশিংয়ে কীভাবে ব্যবহৃত হয়?",
          "m": "Mongoose-এ `pre` হুক কোনো অ্যাকশন (যেমন `save`, `validate`, `remove`) ঘটার ঠিক আগে এক্সিকিউট হয় এবং `post` হুক অ্যাকশন শেষ হওয়ার পর এক্সিকিউট হয়। পাসওয়ার্ড হ্যাশিংয়ে `pre('save')` হুকে চেক করা হয় `this.isModified('password')` ট্রু কি না। যদি ট্রু হয় তবে bcrypt দিয়ে পাসওয়ার্ড হ্যাশ করে `this.password`-এ বসানো হয়। পাসওয়ার্ড পরিবর্তিত না হলে অপ্রয়োজনীয় রি-হ্যাশিং এড়ানো হয়।",
          "b": "প্রি এবং পোস্ট হুক হলো লাইফসাইকেল মিডলওয়্যার। ইউজার সেভ হওয়ার আগে pre('save') হুকে পাসওয়ার্ড পরিবর্তিত হয়েছে কিনা তা চেক করে bcrypt দিয়ে হ্যাশ করে নিরাপদে ডাটাবেজে পাঠানো হয়।",
          "e": "Document middleware hooks (pre/post) execute before or after target lifecycle operations like save. In password hashing, pre('save') inspects this.isModified('password') and runs bcrypt.hash() prior to document persistence.",
          "code": "userSchema.pre('save', async function(next) {\n  if (!this.isModified('password')) return next();\n  this.password = await bcrypt.hash(this.password, 12);\n  next();\n});"
        },
        {
          "lvl": "lvl2",
          "q": "Mongoose-এ `lean()` মেথড কী এবং রিড-অনলি কুয়েরিতে এটি পারফরম্যান্স কতটা বৃদ্ধি করে?",
          "m": "স্বাভাবিকভাবে Mongoose কুয়েরি এক্সিকিউট করলে এটি প্রতিটি ডকুমেন্টের জন্য একটি ফুল-ব্লাডেড Mongoose Document Instance তৈরি করে (যার মধ্যে ইন্টারনাল স্টেট, সেভ মেথড, গেটার্স/সেটার্স, ট্র্যাকিং মেকানিজম থাকে)। এতে প্রচুর RAM ও CPU খরচ হয়। `.lean()` যুক্ত করলে Mongoose কোনো মেথড ছাড়া প্লেইন জাভাস্ক্রিপ্ট অবজেক্ট (POJO) রিটার্ন করে। এতে মেমোরি খরচ ৯০% পর্যন্ত কমে যায় এবং কুয়েরি ৫-১০ গুণ দ্রুত এক্সিকিউট হয়। রিড-অনলি এপিআই বা ড্যাশবোর্ড রিপোর্টিংয়ে `lean()` বাধ্যতামূলক।",
          "b": "লিন মেথড মঙ্গুজ ডকুমেন্টের ভারী ইন্টারনাল ইনস্ট্যান্স বাদ দিয়ে সাধারণ প্লেইন জাভাস্ক্রিপ্ট অবজেক্ট রিটার্ন করে। ফলে মেমোরি কনজাম্পশন বিশাল পরিমাণে কমে এবং কুয়েরি অত্যন্ত দ্রুত সম্পন্ন হয়।",
          "e": "By default, Mongoose wraps query results in heavy Mongoose Document instances with getters, setters, and internal tracking. Invoking .lean() bypasses hydration and returns plain JavaScript objects (POJOs), reducing memory footprints up to 90% and speeding queries 5x-10x for read-only flows.",
          "code": "const products = await Product.find({ isActive: true }).lean();"
        },
        {
          "lvl": "lvl2",
          "q": "Mongoose-এ `findOneAndUpdate` বনাম `save()`-এর মধ্যে ভ্যালিডেশন এবং মিডলওয়্যার আচরণের পার্থক্য কী?",
          "m": "(১) `doc.save()` একটি সম্পূর্ণ Mongoose ডকুমেন্ট ইনস্ট্যান্সের ওপর চলে, ফলে স্কিমার সব ডিফল্ট ভ্যালিডেশন এবং `pre('save')` হুক স্বয়ংক্রিয়ভাবে ফায়ার করে। (২) `Model.findOneAndUpdate()` সরাসরি ডেটাবেজে আপডেট কমান্ড পাঠায় এবং বাই-ডিফল্ট স্কিমা ভ্যালিডেশন চালায় না ও `pre('save')` হুক ফায়ার করে না! যদি ভ্যালিডেশন চালাতে চান তবে অপশনে `{ runValidators: true }` সেট করতে হবে। পাসওয়ার্ড হ্যাশিংয়ের মতো ক্রিটিকাল লজিকে তাই `save()` ব্যবহার করা নিরাপদ।",
          "b": "save() মেথড সম্পূর্ণ স্কিমা ভ্যালিডেশন এবং pre-save হুক চালায়। কিন্তু findOneAndUpdate বাই-ডিফল্ট ভ্যালিডেশন স্কিপ করে এবং ডিরেক্ট ডাটাবেজে কমান্ড পাঠায় যদি না runValidators: true উল্লেখ করা হয়।",
          "e": "doc.save() executes full schema validation and triggers pre('save') hooks. In contrast, findOneAndUpdate() bypasses save hooks and bypasses validation by default unless explicit { runValidators: true } options are passed.",
          "tip": "ইন্টারভিউতে বলো: 'findOneAndUpdate skips pre-save hooks; use runValidators: true or doc.save() when mutating sensitive fields.'"
        },
        {
          "lvl": "lvl2",
          "q": "Mongoose-এ Discriminators কী এবং সিঙ্গেল টেবিল ইনহেরিটেন্স (STI) কীভাবে ইমপ্লিমেন্ট করে?",
          "m": "Discriminators হলো একই মঙ্গোডিবি কালেকশনে বিভিন্ন ধরনের পলিমরফিক ডকুমেন্ট সংরক্ষণের একটি স্কিমা ইনহেরিটেন্স মেকানিজম। উদাহরণস্বরূপ, একটি `Event` কালেকশনে `ClickEvent`, `PurchaseEvent` এবং `PageviewEvent` থাকবে। এদের বেস ফিল্ডগুলো কমন থাকবে (যেমন timestamp, userId), কিন্তু প্রতিটি স্পেসিফিক ইভেন্টে অতিরিক্ত ফিল্ড থাকবে। Mongoose একটি ইন্টারনাল `__t` (discriminator key) ফিল্ড তৈরি করে ডকুমেন্ট টাইপ ট্র্যাক করে।",
          "b": "ডিসক্রিমিনেটর হলো মঙ্গুজের পলিমরফিক স্কিমা ইনহেরিটেন্স ফিচার, যার মাধ্যমে একই কালেকশনে বেস স্কিমার ওপর ভিত্তি করে ভিন্ন ভিন্ন চাইল্ড মডেল ও কাস্টম ফিল্ড সংরক্ষণ করা যায়।",
          "e": "Mongoose Discriminators enable schema inheritance within a single underlying MongoDB collection. They share common base schema fields while specializing child models, tracking the type discriminator automatically via an internal __t field.",
          "code": "const options = { discriminatorKey: 'kind' };\nconst eventSchema = new mongoose.Schema({ time: Date }, options);\nconst Event = mongoose.model('Event', eventSchema);\nconst Click = Event.discriminator('Click', new mongoose.Schema({ elementId: String }));"
        },
        {
          "lvl": "lvl2",
          "q": "Mongoose-এ Static Methods এবং Instance Methods-এর মধ্যে পার্থক্য কী?",
          "m": "(১) `Instance Methods`: এগুলো স্কিমার `methods` অবজেক্টে ডিফাইন করা হয় এবং কোনো নির্দিষ্ট ডকুমেন্ট ইনস্ট্যান্সের ওপর কাজ করে (যেখানে `this` রেফার করে ওই নির্দিষ্ট ডকুমেন্টকে)। যেমন: `user.comparePassword('1234')` বা `order.calculateTax()`। (২) `Static Methods`: এগুলো স্কিমার `statics` অবজেক্টে ডিফাইন করা হয় এবং পুরো Model ক্লাসের ওপর কাজ করে (যেখানে `this` রেফার করে পুরো মডেল ক্লাসকে)। যেমন: `User.findByEmail('test@dokani.com')` বা `Order.getMonthlyRevenue()`।",
          "b": "ইনস্ট্যান্স মেথড নির্দিষ্ট একটি ডকুমেন্টের ওপর কাজ করে (this = ডকুমেন্ট), যেমন পাসওয়ার্ড তুলনা করা। স্ট্যাটিক মেথড পুরো মডেল ক্লাসের ওপর কাজ করে (this = মডেল), যেমন কাস্টম ফাইন্ডার কুয়েরি।",
          "e": "Instance methods operate on individual document instances via schema.methods (where this is the document). Static methods operate on the Model class directly via schema.statics (where this is the Model constructor) for custom query aggregations.",
          "code": "userSchema.methods.comparePassword = function(pwd) { return bcrypt.compare(pwd, this.password); };\nuserSchema.statics.findByEmail = function(email) { return this.findOne({ email }); };"
        },
        {
          "lvl": "lvl3",
          "q": "Mongoose-এ Deep Population (Nested Populate) কীভাবে ডেটাবেজ পারফরম্যান্স নষ্ট করে এবং এর বিকল্প সমাধান কী?",
          "m": "যখন আপনি নেস্টেড পপুলেট করেন (যেমন `Order -> populate('customer') -> populate('addresses') -> populate('city')`), Mongoose ইন্টারনালি একের পর এক ৩-৪টি পৃথক ডেটাবেজ কুয়েরি চালায় (N+1 query waterfall problem)। উচ্চ ট্রাফিকে এটি নেটওয়ার্ক ওভারহেড ও ডেটাবেজ ল্যাটেন্সি বহুগুণ বাড়িয়ে সার্ভার ক্র্যাশ করায়। বিকল্প সমাধান: (১) মঙ্গোডিবির নেটিভ `$lookup` পাইপলাইন ব্যবহার করা যাতে সিঙ্গেল ডেটাবেজ রাউন্ড-ট্রিপে ডেটা আসে, অথবা (২) স্কিমা রি-ডিজাইন করে ফ্রিকোয়েন্টলি ব্যবহৃত রিলেটেড ডেটা এমবেড (Denormalize) করে রাখা।",
          "b": "ডিপ পপুলেশন একাধিক ধারাবাহিক কুয়েরি চালিয়ে ডেটাবেজে অতিরিক্ত লেটেন্সি তৈরি করে এবং N+1 কুয়েরি সমস্যার জন্ম দেয়। এটি সমাধানের জন্য মঙ্গোডিবি অ্যাগ্রিগেশন পাইপলাইনের $lookup অথবা ডিনরমালাইজেশন ব্যবহার করা উচিত।",
          "e": "Deep nested population causes sequential multi-hop query waterfalls (N+1 problem) on the database server, drastically increasing latency. The scalable alternatives are utilizing MongoDB native $lookup aggregation stages or denormalizing frequently accessed nested fields directly.",
          "code": "// Bad waterfall:\nOrder.find().populate({ path: 'customer', populate: { path: 'tier' } });\n// High performance alternative: Native Aggregate $lookup"
        },
        {
          "lvl": "lvl3",
          "q": "Mongoose-এ `strictQuery` এবং `strict` মোড কী এবং ডাটাবেজ সিকিউরিটিতে এটি কীভাবে গুরুত্বপূর্ণ?",
          "m": "`strict: true` (ডিফল্ট) নিশ্চিত করে যে স্কিমায় ডিফাইন করা নেই এমন কোনো ফিল্ড যদি কেউ ইনসার্ট করার চেষ্টা করে, Mongoose তা ফিল্টার আউট করে বাদ দিয়ে দেবে—ফলে ম্যালিশিয়াস ডেটাবেজ ফিল্ড ইনজেকশন ঠেকানো যায়। আর Mongoose v7+ এ `strictQuery: true` নিশ্চিত করে যে কুয়েরি ফিল্টারেও যদি কোনো আননোন ফিল্ড পাস করা হয়, তা কুয়েরিতে পাঠানো হবে না। এটি NoSQL ইনজেকশন প্রতিরোধে এবং ডেটাবেজ কনসিস্টেন্সি রক্ষায় গুরুত্বপূর্ণ।",
          "b": "স্ট্রিক্ট মোড নিশ্চিত করে স্কিমায় অননুমোদিত কোনো বহিরাগত ফিল্ড যেন ডেটাবেজে প্রবেশ করতে না পারে। আর strictQuery কুয়েরি ফিল্টারের ক্ষেত্রেও একই নিরাপত্তা নিশ্চিত করে NoSQL ইনজেকশন প্রতিরোধ করে।",
          "e": "strict: true strips any document fields that are not explicitly declared in the schema prior to saving. strictQuery: true ensures query filters strip undeclared fields, defending against accidental schema pollution and certain NoSQL injection variations.",
          "code": "mongoose.set('strictQuery', true);\nconst schema = new mongoose.Schema({ name: String }, { strict: true });"
        },
        {
          "lvl": "lvl3",
          "q": "Mongoose-এ Optimistic Concurrency Control (OCC) এবং `__v` (versionKey) কীভাবে কনকারেন্ট ডেটা ওভাররাইট রোধ করে?",
          "m": "Mongoose-এর প্রতিটি ডকুমেন্টে ডিফল্টভাবে `__v` নামে একটি ইন্টিজার ফিল্ড থাকে যা ভার্সন কি। যখন আপনি অপটিমিস্টিক কনকারেন্সি প্লাগইন বা `{ optimisticConcurrency: true }` চালু করেন, তখন কোনো ডকুমেন্ট সেভ করার সময় Mongoose একটি শর্ত দেয়: `UPDATE WHERE _id = doc._id AND __v = doc.__v`। যদি দুইজন ইউজার একই সাথে ডকুমেন্ট রিড করে এবং একজন আগে আপডেট করে ফেলে (যাতে `__v` ১ বেড়ে যায়), তবে দ্বিতীয় ইউজারের সেভ কল `VersionError` দিয়ে ফেইল করবে—ফলে কেউ অজান্তে অন্যের আপডেট করা ডেটা ওভাররাইট করে দিতে পারবে না।",
          "b": "ভার্সন কি (__v) এর মাধ্যমে অপটিমিস্টিক কনকারেন্সি কন্ট্রোল কার্যকর করা হয়। দুইজন ইউজার একই সাথে ডাটা এডিট করলে যার রিকোয়েস্ট পরে আসে সে VersionError এরর পায়, যার ফলে ডেটা ওভাররাইট হওয়া রোধ হয়।",
          "e": "Mongoose uses the __v versionKey for Optimistic Concurrency Control (OCC). With optimisticConcurrency: true, update queries include WHERE __v = currentVersion. If another process modified the document concurrently, the version mismatches and throws a VersionError, preventing dirty overwrites.",
          "code": "const schema = new mongoose.Schema({ stock: Number }, { optimisticConcurrency: true });"
        },
        {
          "lvl": "lvl3",
          "q": "Mongoose Connection Events (`connected`, `error`, `disconnected`) এবং Reconnect স্ট্র্যাটেজি কীভাবে প্রডাকশনে হ্যান্ডেল করবে?",
          "m": "প্রোডাকশন ডেটাবেজ কানেকশন যেন সাময়িক নেটওয়ার্ক গ্লিচ বা ক্লাউড ড্রপআউটে পুরো সার্ভার ক্র্যাশ না করায়, সেজন্য `mongoose.connection` ইভেন্ট লিসেনার সেট করতে হয়। Mongoose ডিফল্টভাবে অটো-রিকানেক্ট করে, কিন্তু `serverSelectionTimeoutMS` (যেমন 5000ms), `maxPoolSize` (যেমন 50), এবং `socketTimeoutMS` কনফিগার করতে হবে। যদি `disconnected` ইভেন্ট ফায়ার হয়, তবে ব্যাকঅফ অ্যালগরিদমে রিকানেকশন লগ করতে হবে এবং এরর ট্র্যাকিং প্ল্যাটফর্মে (Sentry) অ্যালার্ট পাঠাতে হবে।",
          "b": "প্রোডাকশনে মঙ্গুজের কানেকশন ইভেন্টগুলো মনিটর করা জরুরি। connected, error এবং disconnected ইভেন্টে সেন্ট্রি অ্যালার্ট সেট করা উচিত এবং অটো-রিকানেকশনের জন্য টাইমআউট ও কানেকশন পুল প্রপার্টি ঠিক রাখা প্রয়োজন।",
          "e": "Production applications must listen to mongoose.connection events: connected, error, and disconnected. Configure socketTimeoutMS, serverSelectionTimeoutMS, and maxPoolSize while integrating telemetry to monitor database dropouts and trigger healthcheck alerts.",
          "code": "mongoose.connection.on('disconnected', () => console.warn('MongoDB disconnected! Retrying...'));\nmongoose.connection.on('error', (err) => logger.error('MongoDB error:', err));"
        },
        {
          "lvl": "lvl3",
          "q": "Mongoose Schema-তে Sharding Support ও Shard Key স্পেসিফিকেশন কীভাবে কনফিগার করা হয়?",
          "m": "MongoDB ক্লাস্টার যখন শার্ডেড হয়, তখন Mongoose স্কিমায় `shardKey` অপশন উল্লেখ করতে হয় (যেমন `{ shardKey: { tenantId: 1, _id: 1 } }`)। এর উদ্দেশ্য হলো: Mongoose যখন কোনো ডকুমেন্টে `save()` বা `update()` চালাবে, তখন সে নিশ্চিত করবে যে শার্ড কি ফিল্ডটি কুয়েরি টার্গেটে উপস্থিত আছে। অন্যথায় মঙ্গোডিবি ক্লাস্টারকে সব শার্ডে ব্রডকাস্ট কুয়েরি পাঠাতে হবে যা ক্লাস্টারের পারফরম্যান্স ধ্বংস করে দেয়।",
          "b": "শার্ডেড ক্লাস্টারে মঙ্গুজ স্কিমার অপশনে shardKey ডিফাইন করতে হয় যাতে আপডেট এবং সেভ অপারেশনে সঠিক শার্ড টার্গেট করা যায় এবং একাধিক সার্ভারে অপ্রয়োজনীয় ব্রডকাস্ট কুয়েরি এড়ানো যায়।",
          "e": "In horizontally sharded MongoDB clusters, Mongoose schemas must define shardKey options (e.g. shardKey: { orgId: 1 }). This guarantees that update and delete queries route directly to the specific shard rather than broadcasting across the entire cluster.",
          "code": "const tenantSchema = new mongoose.Schema({\n  orgId: String,\n  name: String\n}, { shardKey: { orgId: 1 } });"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ইউজারের কার্ট আপডেট করার সময় `Cart.findOneAndUpdate()` কল করায় স্কিমার `min: [1, 'Quantity must be at least 1']` কাজ করছে না এবং নেগেটিভ ভ্যালু সেভ হয়ে যাচ্ছে! কীভাবে সমাধান করবে?",
          "m": "সমস্যাটি হয়েছে কারণ `findOneAndUpdate` বাই-ডিফল্ট স্কিমা ভ্যালিডেশন স্কিপ করে। সমাধান: আপডেটের ৩য় প্যারামিটারে `{ runValidators: true }` পাস করতে হবে। একই সাথে লজিক্যাল লেভেলে `$inc` দিয়ে অ্যাটমিক আপডেট করার সময় শর্ত দেওয়া উচিত যাতে কোয়ান্টিটি কখনোই জিরোর নিচে নামতে না পারে: `Cart.findOneAndUpdate({ _id, 'items.qty': { $gt: 0 } }, { ... }, { runValidators: true })`।",
          "b": "findOneAndUpdate ডিফল্টভাবে ভ্যালিডেশন এড়িয়ে যায়। আপডেটের অপশনে runValidators: true পাস করতে হবে এবং কুয়েরি ফিল্টারে কোয়ান্টিটি পজিটিভ থাকার শর্ত এনফোর্স করতে হবে।",
          "e": "findOneAndUpdate bypasses schema validators by default. The fix requires passing { runValidators: true, new: true } in the options argument, alongside checking positive bounds atomically in the query filter.",
          "code": "await Cart.findOneAndUpdate(\n  { _id: cartId, 'items.productId': pId },\n  { $inc: { 'items.$.qty': delta } },\n  { runValidators: true, new: true }\n);"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি হাই-ট্রাফিক এপিআইতে `Order.find().populate('items.product')` কল করায় রেসপন্স টাইম ২ সেকেন্ড ছাড়িয়ে যাচ্ছে। তুমি কীভাবে এটি অপটিমাইজ করবে?",
          "m": "সমাধানের ধাপ: (১) সবার আগে কুয়েরির শেষে `.lean()` মেথড যোগ করতে হবে—এতে মেমোরি হাইড্রেটিং ওভারহেড দূর হবে। (২) পপুলেশনে ফিল্ড প্রোজেকশন ব্যবহার করে শুধুমাত্র প্রয়োজনীয় ফিল্ডগুলো আনব (যেমন `populate('items.product', 'name price image')`), পুরো প্রোডাক্ট অবজেক্ট আনব না। (৩) যদি অর্ডার লিস্ট খুব বড় হয়, তবে পপুলেটের বদলে মঙ্গোডিবি `$lookup` পাইপলাইন ব্যবহার করে সিঙ্গেল ব্যাচে ডেটা তুলে এনে পেজিনেশন এনফোর্স করব।",
          "b": "প্রথমে .lean() যুক্ত করে লাইটওয়েট অবজেক্ট বানাব, পপুলেটে শুধুমাত্র প্রয়োজনীয় ফিল্ড সিলেক্ট করব এবং বিশাল ডেটাসেটের ক্ষেত্রে অ্যাগ্রিগেশনের $lookup ব্যবহার করব।",
          "e": "Append .lean() to prevent document hydration overhead, limit populated fields via explicit projection ('name price'), and rewrite large batch fetches into optimized single-round-trip $lookup aggregation stages with pagination.",
          "code": "const orders = await Order.find({ tenantId })\n  .populate('items.product', 'name price sku')\n  .lean()\n  .limit(20);"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: প্রোডাকশনে ইউজার প্রোফাইল আপডেটের সময় `user.password` ফিল্ড আবার রি-হ্যাশ হয়ে পাসওয়ার্ড নষ্ট হয়ে যাচ্ছে! কোডে কোথায় বাগ এবং কীভাবে সমাধান করবে?",
          "m": "বাগটি ঘটেছে কারণ `pre('save')` হুকে চেক করা হয়নি যে পাসওয়ার্ড আসলেই মডিফাই হয়েছে কি না! ফলে অন্য কোনো ফিল্ড (যেমন নাম বা ফোন) আপডেট করার পরও সেভ কল হলে আগের হ্যাশ করা পাসওয়ার্ডটি আবার নতুন করে হ্যাশ হয়ে অকেজো হয়ে যাচ্ছে। সমাধান: হুকের শুরুতে চেক করতে হবে `if (!this.isModified('password')) return next();`। যদি পাসওয়ার্ড না বদলায়, তবে হ্যাশিং বাইপাস করতে হবে।",
          "b": "প্রি-সেভ হুকে if (!this.isModified('password')) চেক না করায় নাম বা ফোন আপডেটের সময়ও ইতিমধ্যে হ্যাশ করা পাসওয়ার্ড পুনরায় হ্যাশ হয়ে নষ্ট হচ্ছে। এই চেকটি যুক্ত করলেই সমস্যা সমাধান হবে।",
          "e": "The bug stems from omitting this.isModified('password') in the pre-save hook. When unrelated profile fields mutate, the already hashed string gets hashed a second time, locking the user out. Guarding with isModified fixes the flaw.",
          "code": "userSchema.pre('save', async function(next) {\n  if (!this.isModified('password')) return next(); // Crucial guard\n  this.password = await bcrypt.hash(this.password, 12);\n  next();\n});"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: তোমার টিমের একজন ডেভেলপার `userSchema.index({ email: 1 }, { unique: true })` যোগ করেছে, কিন্তু প্রোডাকশনে এখনো ডুপ্লিকেট ইমেইল সেভ হয়ে যাচ্ছে! কারণ কী এবং কীভাবে ফিক্স করবে?",
          "m": "কারণ: Mongoose অ্যাপ্লিকেশান বুট হওয়ার সময় ব্যাকগ্রাউন্ডে `createIndex` চালানোর চেষ্টা করে। যদি প্রোডাকশন সার্ভারে `autoIndex: false` কনফিগার করা থাকে (যা হাই-ট্রাফিক সার্ভারে পারফরম্যান্সের জন্য রিকমেন্ডেড), তবে নতুন ইনডেক্স স্বয়ংক্রিয়ভাবে তৈরি হবে না! অথবা ডেটাবেজে ইতিমধ্যে আগের কিছু ডুপ্লিকেট ইমেইল রেকর্ড রয়ে গেছে যার কারণে ইউনিক ইনডেক্স ফেইল করছে। সমাধান: প্রোডাকশন ডেটাবেজে স্ক্রিপ্ট চালিয়ে আগে বিদ্যমান ডুপ্লিকেটগুলো মুছে ফেলতে হবে, তারপর MongoDB Shell বা মাইগ্রেশন স্ক্রিপ্ট দিয়ে ম্যানুয়ালি `db.users.createIndex({ email: 1 }, { unique: true })` চালাতে হবে।",
          "b": "প্রোডাকশন ডেটাবেজে ইতিমধ্যে ডুপ্লিকেট ডেটা থাকলে অথবা autoIndex বন্ধ থাকলে ইউনিক ইনডেক্স তৈরি হতে পারে না। প্রথমে ডুপ্লিকেট ক্লিন করে ম্যানুয়ালি createIndex কমান্ড রান করতে হবে।",
          "e": "If autoIndex is disabled (standard in production for performance) or if existing duplicate records already violate the constraint, MongoDB silently fails index creation. Cleanse duplicate records first, then execute db.users.createIndex() directly via migration.",
          "tip": "কখনোই প্রোডাকশনে `autoIndex: true`-এর ওপর নির্ভর করবে না; মাইগ্রেশন স্ক্রিপ্ট দিয়ে ইনডেক্স তৈরি করবে।"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি ড্যাশবোর্ডে প্রতিদিনের সেলস রিপোর্ট জেনারেট করার সময় মেমোরি আউট অফ লিমিট হয়ে নোড প্রসেস ক্র্যাশ করছে। Mongoose দিয়ে কীভাবে মেমোরি সেফ উপায়ে লাখ লাখ রেকর্ড প্রসেস করবে?",
          "m": "সমাধান: লাখ লাখ রেকর্ড একসাথে `find()` দিয়ে অ্যারে আকারে মেমোরিতে আনা যাবে না! এর বদলে Mongoose-এর `Cursor` অথবা `Stream` ব্যবহার করতে হবে। `Order.find().cursor()` কল করলে এটি একটি একটি করে ডকুমেন্ট মেমোরিতে স্ট্রিম করে, ফলে কোটি রেকর্ড প্রসেস করলেও RAM কনজাম্পশন মাত্র ৩০-৫০ মেগাবাইটের মধ্যে সীমাবদ্ধ থাকে।",
          "b": "একসাথে সব ডেটা find() না করে Mongoose Cursor বা Stream ব্যবহার করতে হবে। cursor() একটি একটি করে রেকর্ড স্ট্রিম করে প্রসেস করে, ফলে র‍্যামের ওপর কোনো অতিরিক্ত চাপ পড়ে না।",
          "e": "Do not load millions of documents into memory with find(). Use Mongoose Query Cursors via .cursor(). Cursors stream documents batch-by-batch from MongoDB, keeping the Node.js process heap flat and memory footprint minuscule.",
          "code": "const cursor = Order.find({ status: 'COMPLETED' }).cursor();\nfor (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {\n  await processInvoice(doc);\n}"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে প্রোডাক্ট স্কিমায় dynamic variants (যেমন সাইজ, কালার, বারকোড, প্রাইস) কীভাবে Mongoose Subdocument দিয়ে ডিজাইন করা হয়েছে যাতে ইনভেন্টরি ফাস্ট রিড হয়?",
          "m": "দোকানিতে প্রতিটি প্রোডাক্টের আন্ডারে ভ্যারিয়েন্টগুলোর জন্য একটি সাব-ডকুমেন্ট স্কিমা ব্যবহার করা হয়েছে (`variants: [variantSchema]`)। প্রতিটি ভ্যারিয়েন্টে নিজস্ব `sku`, `barcode`, `stock`, `costPrice`, `sellingPrice` থাকে। সুবিধা হলো: ক্যাশিয়ার যখন বারকোড স্ক্যানার দিয়ে বারকোড স্ক্যান করে, তখন `Product.findOne({ tenantId, 'variants.barcode': scannedBarcode }, { 'variants.$': 1, name: 1 })` দিয়ে একক কুয়েরিতে মাত্র ২ মিলিসেকেন্ডে প্রোডাক্টের নির্দিষ্ট ভ্যারিয়েন্টের সঠিক স্টক ও প্রাইস বের করে আনা সম্ভব হয়।",
          "b": "দোকানি পিওএসে ভ্যারিয়েন্টের জন্য সাব-ডকুমেন্ট অ্যারে ব্যবহার করা হয়েছে। বারকোড স্ক্যান করার সময় পজিশনাল প্রজেকশন অপারেটর (variants.$) দিয়ে এক কুয়েরিতে সরাসরি নির্দিষ্ট ভ্যারিয়েন্টের স্টক ও দাম পাওয়া যায়।",
          "e": "In Dokani POS, product variants are modeled as Mongoose subdocuments inside an array. When a cashier scans a barcode, a single indexed query using the positional projection operator ('variants.$': 1) retrieves the exact matched variant in sub-3ms latency.",
          "code": "const variantSchema = new mongoose.Schema({\n  barcode: { type: String, required: true },\n  stock: { type: Number, default: 0 },\n  price: { type: Number, required: true }\n});\nconst productSchema = new mongoose.Schema({\n  tenantId: { type: String, required: true, index: true },\n  name: String,\n  variants: [variantSchema]\n});"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Mongoose-এ সফট ডিলিট (Soft Delete) প্যাটার্ন কীভাবে গ্লোবাল কুয়েরি প্লাগইন দিয়ে ইমপ্লিমেন্ট করবে যাতে কোনো এপিআই ভুলবশত ডিলিট হওয়া ডেটা না দেখায়?",
          "m": "একটি গ্লোবাল স্কিমা প্লাগইন তৈরি করে তাতে `isDeleted: { type: Boolean, default: false }` এবং `deletedAt: Date` ফিল্ড যোগ করি। এরপর `pre(/^find/)` হুক (অর্থাৎ `find`, `findOne`, `findOneAndUpdate`) রেজিস্টার করে কুয়েরিতে স্বয়ংক্রিয়ভাবে `{ isDeleted: { $ne: true } }` ফিল্টার ইনজেক্ট করি। এছাড়া একটি কাস্টম মেথড `doc.softDelete()` ডিফাইন করি যা `isDeleted: true` সেট করে। এর ফলে কোনো জুনিয়র ডেভেলপার সাধারণ `find()` কল করলেও ডিলিট হওয়া রেকর্ড কখনোই রেজাল্টে আসবে না।",
          "b": "সফট ডিলিট প্লাগইনে pre-find হুক ব্যবহার করে স্বয়ংক্রিয়ভাবে isDeleted: false ফিল্টার যুক্ত করা হয়। ফলে সাধারণ ফাইন্ড কুয়েরিতে কখনো ডিলিট হওয়া রেকর্ড আসে না কিন্তু ডেটাবেজে ব্যাকআপ সংরক্ষিত থাকে।",
          "e": "Implement a soft-delete plugin adding isDeleted and deletedAt flags. Use a regex pre(/^find/) query hook to automatically inject { isDeleted: { $ne: true } } into every find and findOne operation across the system.",
          "code": "function softDeletePlugin(schema) {\n  schema.add({ isDeleted: { type: Boolean, default: false } });\n  schema.pre(/^find/, function() {\n    this.where({ isDeleted: { $ne: true } });\n  });\n}"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Dokani-তে অডিট লগ বা অ্যাক্টিভিটি হিস্ট্রি ট্র্যাকিংয়ের জন্য Mongoose Post-Save Hook কীভাবে ব্যবহার করা হয়েছে?",
          "m": "দোকানিতে যখন কোনো সংবেদনশীল ডেটা (যেমন ইনভয়েস ডিসকাউন্ট এডিট বা প্রোডাক্ট স্টক অ্যাডজাস্টমেন্ট) সেভ হয়, তখন স্কিমার `post('save')` হুক স্বয়ংক্রিয়ভাবে ট্রিগার হয়। এই হুকটি ব্যাকগ্রাউন্ডে একটি নন-ব্লকিং `AuditLog` কালেকশনে একটি নতুন রেকর্ড ইনসার্ট করে: কে পরিবর্তন করেছে (`userId`), কী পরিবর্তন করেছে (`delta/diff`), এবং আগের মান কী ছিল। এটি নিশ্চিত করে যে ক্যাশিয়ার বা ম্যানেজারের প্রতিটি আর্থিক অ্যাকশন ট্র্যাকড থাকে এবং অডিট সিস্টেমে কোনো গরমিল করা সম্ভব হয় না।",
          "b": "পোস্ট-সেভ হুকের মাধ্যমে ইনভয়েস এডিট বা স্টক পরিবর্তনের তথ্য স্বয়ংক্রিয়ভাবে অডিট লগ কালেকশনে লিখে রাখা হয়। এতে কোনো ব্লকিং ছাড়া ব্যাকগ্রাউন্ডে সমস্ত হিস্ট্রি ট্র্যাক করা যায়।",
          "e": "Post-save hooks asynchronously dispatch audit events to an AuditLog collection upon inventory adjustments or invoice mutations. Capturing previous/updated states and operator IDs enforces tamper-evident compliance.",
          "code": "invoiceSchema.post('save', async function(doc) {\n  await AuditLog.create({\n    action: 'INVOICE_MODIFIED',\n    invoiceId: doc._id,\n    amount: doc.grandTotal,\n    timestamp: new Date()\n  });\n});"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Mongoose এবং TypeScript দিয়ে টাইপ-সেফ স্কিমা ও DTO কীভাবে ডিফাইন করবে যাতে রানটাইম ও কম্পাইল-টাইম টাইপিং ১০০% সিঙ্ক থাকে?",
          "m": "আমরা প্রথমে একটি খাঁটি TypeScript ইন্টারফেস বা টাইপ ডিফাইন করি (`interface IProduct`), যা অ্যাপ্লিকেশনের সব DTO ও কন্ট্রোলারে ব্যবহৃত হয়। এরপর Mongoose স্কিমা ডিফাইন করার সময় `new Schema<IProduct>({...})` জেনেরিক টাইপ পাস করি এবং মডেল তৈরির সময় `model<IProduct>('Product', productSchema)` ব্যবহার করি। এর ফলে যদি স্কিমায় কোনো ফিল্ড মিসিং থাকে বা টাইপ অমিল হয়, তবে TypeScript কম্পাইলার বিল্ড টাইমে এরর দেয় এবং রানটাইমে Mongoose স্কিমা ভ্যালিডেশন রক্ষা করে।",
          "b": "টাইপস্ক্রিপ্ট ইন্টারফেস তৈরি করে তা Mongoose স্কিমা ও মডেলের জেনেরিক্সে পাস করলে রানটাইম ভ্যালিডেশন এবং কম্পাইল-টাইম টাইপ চেকিং সম্পূর্ণ সিঙ্কে থাকে।",
          "e": "Define pure TypeScript interfaces (IProduct) and supply them as generic arguments to both Schema<IProduct>() and model<IProduct>(). This guarantees compile-time TypeScript type checking is strictly synchronized with Mongoose runtime schema validation.",
          "code": "export interface IProduct {\n  name: string;\n  price: number;\n  isActive: boolean;\n}\nconst productSchema = new Schema<IProduct>({\n  name: { type: String, required: true },\n  price: { type: Number, required: true },\n  isActive: { type: Boolean, default: true }\n});\nexport const Product = model<IProduct>('Product', productSchema);"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: হাই-লোড নোড সার্ভারে Mongoose Connection Pool Saturation কীভাবে ডিটেক্ট ও প্রিভেন্ট করবে?",
          "m": "যদি এপিআই রিকোয়েস্ট রেট কানেকশন পুল ক্যাপাসিটির চেয়ে বেশি হয়ে যায় এবং কুয়েরিগুলো স্লো হয়, তবে নতুন রিকোয়েস্টগুলো কানেকশন পুল থেকে কানেকশন পাওয়ার অপেক্ষায় কিউতে আটকে থাকে (Pool Exhaustion)। লক্ষণ: রেসপন্স টাইম হঠাৎ ৩০ সেকেন্ডে পৌঁছে যাওয়া এবং `MongoTimeoutError: Timed out waiting for connection` ঘটা। সমাধান: (১) কানেকশন অপশনে `maxPoolSize: 50` বা ট্রাফিকের অনুপাতে বাড়ানো, (২) রিড কুয়েরিতে `.lean()` ব্যবহার করা, (৩) প্রতিটি আন-ইনডেক্সড স্লো কুয়েরি ফিক্স করা, এবং (৪) ব্যাকগ্রাউন্ড প্রসেসিংয়ের জন্য BullMQ কিউ ব্যবহার করে ডেটাবেজ কনকারেন্সি ফ্ল্যাট রাখা।",
          "b": "কানেকশন পুল খালি না থাকার কারণে নোড সার্ভারে টাইমআউট এরর ঘটে। maxPoolSize বৃদ্ধি করা, স্লো কুয়েরিগুলোতে ইনডেক্স দেওয়া, .lean() ব্যবহার এবং ব্যাকগ্রাউন্ড কিউ ব্যবহারের মাধ্যমে এই সংকট সমাধান করা হয়।",
          "e": "Detect connection pool starvation via MongoTimeoutError when queries queue indefinitely. Mitigate by elevating maxPoolSize (e.g. 50-100), indexing slow bottleneck queries, applying .lean() aggressively, and smoothing burst traffic with BullMQ worker queues.",
          "code": "mongoose.connect(process.env.MONGO_URI!, {\n  maxPoolSize: 50,\n  serverSelectionTimeoutMS: 5000\n});"
        }
      ]
    },
    {
      "id": "indexing-query-optimization",
      "name": "Database Indexing & Query Optimization",
      "desc": "B-Tree, Compound Indexes (ESR Rule), GIN & GiST for JSONB/Fulltext, Partial Indexes, EXPLAIN ANALYZE, Slow Query Optimization",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Database Index কী এবং এটি কুয়েরি সার্চের গতি কীভাবে নাটকীয়ভাবে বাড়িয়ে দেয়?",
          "m": "Database Index হলো মূল টেবিলের কলামের ডেটা দিয়ে তৈরি একটি আলাদা ডেটা স্ট্রাকচার (প্রধানত B-Tree) যা পয়েন্টার সহ সর্টেড আকারে সংরক্ষিত থাকে। ইনডেক্স না থাকলে ডেটাবেজকে টেবিলের প্রথম থেকে শেষ পর্যন্ত কোটি কোটি রো স্ক্যান করতে হয় (Full Table Scan / Sequential Scan), যাতে ডিস্ক আই/ও এবং সময় অপচয় হয়। ইনডেক্স থাকলে বাইনারি সার্চের মতো `O(log N)` সময়ে মাত্র ৩-৪টি ডিস্ক ব্লকে জাম্প করে কাক্সিক্ষত রো খুঁজে পাওয়া যায়।",
          "b": "ডাটাবেজ ইনডেক্স হলো বইয়ের সূচিপত্রের মতো একটি ডেটা স্ট্রাকচার যা ডেটা পয়েন্টারগুলোকে সাজিয়ে রাখে। ফলে কোটি রেকর্ডের মধ্যে পুরো টেবিল স্ক্যান না করে O(log N) সময়ে সরাসরি নির্দিষ্ট ডেটা বের করা যায়।",
          "e": "A database index is an auxiliary data structure (predominantly B-Trees) holding sorted column keys with row pointers. Instead of an exhaustive O(N) sequential scan, the query planner performs an O(log N) tree traversal to pinpoint target rows in milliseconds.",
          "tip": "বলো: 'Indexes turn an O(N) sequential scan into an O(log N) tree lookup.'"
        },
        {
          "lvl": "lvl1",
          "q": "B-Tree Index কীভাবে কাজ করে এবং কেন এটি রিলেশনাল ও ডকুমেন্ট ডেটাবেজের ডিফল্ট ইনডেক্স টাইপ?",
          "m": "B-Tree (Balanced Tree) হলো একটি স্বয়ংক্রিয়ভাবে ব্যালেন্সড ট্রি ডেটা স্ট্রাকচার যেখানে সব লিফ নোড একই গভীরতায় থাকে। এটি শুধুমাত্র ইকুয়ালিটি চেক (`WHERE id = 5`) নয়, বরং রেঞ্জ কুয়েরি (`WHERE age BETWEEN 20 AND 30`), সর্টিং (`ORDER BY createdAt DESC`), এবং গ্রেটার/লেস দ্যান (`>`, `<`) অপারেশনে অবিশ্বাস্য গতি দেয়। B-Tree-র প্রতিটি নোড ডিস্ক ব্লকের সাইজের সাথে সামঞ্জস্যপূর্ণ হওয়ায় ডিস্ক আই/ও খুব কম লাগে। তাই PostgreSQL এবং MongoDB উভয় জায়গাতেই এটি ডিফল্ট ইনডেক্স।",
          "b": "বি-ট্রি হলো একটি ব্যালেন্সড ট্রি যা সমতা এবং রেঞ্জ কুয়েরি উভয়ের জন্যই অপটিমাইজড। ডিস্ক আই/ও সর্বনিম্ন রেখে এটি দ্রুত ডেটা খোঁজা এবং সর্টিং সাপোর্ট করে, তাই এটি ডিফল্ট ইনডেক্স হিসেবে ব্যবহৃত হয়।",
          "e": "B-Trees maintain self-balanced sorted key hierarchies where leaf nodes are linked sequentially. They excel at both point lookups (=) and range scans (<, >, BETWEEN) while matching disk block architectures, making them the standard default in PostgreSQL and MongoDB.",
          "code": "CREATE INDEX idx_users_created_at ON users (created_at DESC);"
        },
        {
          "lvl": "lvl1",
          "q": "Compound Index (বা কলাম্ব ইনডেক্স) কী এবং এতে কলামের ক্রম (Column Ordering) কেন গুরুত্বপূর্ণ?",
          "m": "Compound Index হলো একাধিক কলামের সমন্বয়ে তৈরি একটি একক ইনডেক্স (যেমন `(tenantId, status, createdAt)`)। কলামের ক্রম এখানে জীবন-মরণ সমান গুরুত্বপূর্ণ! ডেটা প্রথমে ১ম কলাম দিয়ে সর্ট হয়, তারপর ২য় কলাম দিয়ে, তারপর ৩য় কলাম দিয়ে। ইনডেক্সটি শুধুমাত্র তখনই কাজে লাগবে যদি কুয়েরির ফিল্টারে বাম দিকের প্রিফিক্স কলামগুলো (Leftmost Prefix) ব্যবহার করা হয়। যেমন: ফিল্টারে শুধু `tenantId` থাকলে ইনডেক্স কাজ করবে, কিন্তু শুধু `createdAt` থাকলে এই কম্পাউন্ড ইনডেক্স একেবারেই কাজে লাগবে না!",
          "b": "কম্পাউন্ড ইনডেক্স হলো একাধিক কলামের ইনডেক্স। কলামের ক্রম অত্যন্ত গুরুত্বপূর্ণ কারণ ডাটা বাম থেকে ডানে সাজানো থাকে। কুয়েরিতে প্রথম কলাম ব্যবহার না করলে কম্পাউন্ড ইনডেক্স কোনো কাজে আসে না।",
          "e": "A Compound Index indexes multiple columns together. Column sequence is paramount due to the leftmost prefix rule: B-Tree keys are sorted by column 1, then column 2, then column 3. A query filtering only on column 3 cannot use this composite index without hitting the leading columns.",
          "code": "CREATE INDEX idx_orders_tenant_status ON orders (tenant_id, status);"
        },
        {
          "lvl": "lvl1",
          "q": "টেবিলে অতিরিক্ত ইনডেক্স বানানোর ক্ষতিকর দিক কী এবং কখন ইনডেক্স বানানো উচিত নয়?",
          "m": "ইনডেক্স রিড (SELECT) দ্রুত করে, কিন্তু রাইট (INSERT, UPDATE, DELETE) অপারেশনের গতি কমিয়ে দেয়! কারণ টেবিলে নতুন রো ইনসার্ট হলে ডেটাবেজকে প্রতিটা ইনডেক্স ট্রিতে নতুন কি ঢুকিয়ে রি-ব্যালেন্স করতে হয়। এছাড়া প্রতিটি ইনডেক্স ডিস্ক এবং RAM-এ প্রচুর জায়গা দখল করে। ছোট টেবিল (যেমন ১০০-২০০ রোর স্ট্যাটাস টেবিল) বা যে কলামগুলোতে ঘন ঘন রাইট হয় কিন্তু রিড হয় না, সেগুলোতে অতিরিক্ত ইনডেক্স বানানো উচিত নয়।",
          "b": "প্রতিটি ইনডেক্স ইনসার্ট এবং আপডেট অপারেশনের গতি কমায় এবং মেমোরিতে অতিরিক্ত জায়গা নেয়। তাই ছোট টেবিলে বা অপ্রয়োজনীয় কলামে ইনডেক্স তৈরি করা থেকে বিরত থাকা উচিত।",
          "e": "Every index imposes a write penalty on INSERT, UPDATE, and DELETE because the engine must update and rebalance the index tree. Indexes also consume RAM cache. Avoid indexing high-write, rarely-read tables or low-cardinality flags on tiny tables.",
          "tip": "ইন্টারভিউতে 'Write penalty and cache memory overhead' উল্লেখ করবে।"
        },
        {
          "lvl": "lvl1",
          "q": "PostgreSQL-এ `EXPLAIN` এবং `EXPLAIN ANALYZE`-এর মধ্যে মূল পার্থক্য কী?",
          "m": "(১) `EXPLAIN`: কোনো কুয়েরি বাস্তবে না চালিয়েই ডেটাবেজ প্ল্যানারের স্ট্যাটিস্টিকসের ওপর ভিত্তি করে একটি আনুমানিক কুয়েরি এক্সিকিউশন প্ল্যান ও আনুমানিক খরচ (Estimated Cost) প্রদর্শন করে। (২) `EXPLAIN ANALYZE`: কুয়েরিটিকে বাস্তবে ডেটাবেজে এক্সিকিউট করে এবং প্রতিটি স্টেপে কতটা সময় (Actual Time in milliseconds), কয়টি রো প্রসেস হলো, এবং মেমোরি/বাফার ব্যবহার বিস্তারিতভাবে তুলে ধরে। স্লো কুয়েরি অপটিমাইজ করতে `EXPLAIN ANALYZE` আবশ্যক।",
          "b": "EXPLAIN কুয়েরি না চালিয়ে আনুমানিক প্ল্যান দেখায়, আর EXPLAIN ANALYZE কুয়েরি বাস্তবে রান করে সঠিক মিলি-সেকেন্ড সময় এবং ব্যবহৃত মেমোরি রিপোর্ট করে।",
          "e": "EXPLAIN generates an estimated execution plan based on table statistics without running the query. EXPLAIN ANALYZE executes the query against the database, outputting real elapsed execution times, loop counts, memory usage, and actual row counts.",
          "code": "EXPLAIN ANALYZE SELECT * FROM orders WHERE tenant_id = 't1' AND total > 500;"
        },
        {
          "lvl": "lvl2",
          "q": "MongoDB-তে 'ESR Rule' (Equality, Sort, Range) কী এবং কম্পাউন্ড ইনডেক্স সাজাতে এটি কীভাবে মেনে চলতে হয়?",
          "m": "ESR Rule হলো কম্পাউন্ড ইনডেক্সে কলাম বা ফিল্ডগুলো সাজানোর গোল্ডেন স্ট্যান্ডার্ড: (১) `E - Equality`: যেসব ফিল্ডে নির্দিষ্ট সমতা দিয়ে কুয়েরি করা হয় (`status: 'PAID'`) সেগুলোকে সবার প্রথমে দিতে হবে। (২) `S - Sort`: যে ফিল্ড দিয়ে সর্টিং করা হয় (`sort({ createdAt: -1 })`) সেটিকে মাঝখানে দিতে হবে। (৩) `R - Range`: যেসব ফিল্ডে রেঞ্জ ফিল্টার থাকে (`{ amount: { $gte: 100 } }`) সেগুলোকে সবার শেষে দিতে হবে। এই নিয়ম মানলে ডেটাবেজকে মেমোরিতে সর্ট (In-memory Sort) করতে হয় না এবং অপ্রয়োজনীয় ডকুমেন্ট স্ক্যানিং জিরোতে নেমে আসে।",
          "b": "ESR রুল হলো কম্পাউন্ড ইনডেক্স সাজানোর নিয়ম: প্রথমে Equality ফিল্ড, মাঝে Sort ফিল্ড, এবং শেষে Range ফিল্ড রাখতে হয়। এটি ইন-মেমোরি সর্ট ওভারহেড পুরোপুরি দূর করে।",
          "e": "The ESR Rule dictates compound index field ordering: Equality fields first, followed by Sort fields, and lastly Range fields. Obeying ESR prevents expensive in-memory sort spills and eliminates excessive document examination during range filtering.",
          "code": "// Query: find({ storeId: 'A', price: { $gt: 50 } }).sort({ date: -1 })\n// Optimal Index (E -> S -> R):\ndb.items.createIndex({ storeId: 1, date: -1, price: 1 });"
        },
        {
          "lvl": "lvl2",
          "q": "PostgreSQL-এ Partial Index (আংশিক ইনডেক্স) কী এবং এটি কীভাবে মেমোরি বাঁচায় ও কুয়েরি ফাস্ট করে?",
          "m": "Partial Index হলো এমন একটি ইনডেক্স যা টেবিলের সব রোর ওপর না বসে শুধুমাত্র একটি নির্দিষ্ট `WHERE` শর্ত পূরণকারী রো-গুলোর ওপর বসে। যেমন: ১ কোটি অর্ডারের মধ্যে ৯৯% অর্ডার সম্পন্ন হয়ে গেছে, কিন্তু ব্যাকগ্রাউন্ড প্রসেস কেবল `status = 'PENDING'` অর্ডারগুলো খুঁজে প্রসেস করে। পুরো টেবিল ইনডেক্স করলে ইনডেক্স সাইজ ৫০০MB হতো, কিন্তু `WHERE status = 'PENDING'` আংশিক ইনডেক্স তৈরি করলে ইনডেক্স সাইজ হবে মাত্র ৫MB! ফলে এটি ক্যাশে সুন্দরভাবে ধরে এবং রাইট পেনাল্টি থাকে না বললেই চলে।",
          "b": "পার্শিয়াল ইনডেক্স শুধুমাত্র নির্দিষ্ট শর্তযুক্ত রো-গুলোর ওপর তৈরি হয়। এতে ইনডেক্সের আকার ৯০% পর্যন্ত ছোট থাকে এবং নির্দিষ্ট কুয়েরিগুলোর পারফরম্যান্স অবিশ্বাস্য দ্রুত হয়।",
          "e": "A Partial Index indexes only a subset of table rows satisfying a WHERE predicate. For instance, indexing WHERE status = 'PENDING' keeps the index minute (e.g. 5MB instead of 500MB), fitting into RAM cache while dramatically speeding targeting queries.",
          "code": "CREATE INDEX idx_orders_pending ON orders (created_at)\nWHERE status = 'PENDING';"
        },
        {
          "lvl": "lvl2",
          "q": "Covering Index এবং PostgreSQL-এর `INCLUDE` ক্লজ কীভাবে টেবিল ডেটা অ্যাক্সেস ছাড়াই কুয়েরি সম্পন্ন করে (Index-Only Scan)?",
          "m": "সাধারণত ইনডেক্স থেকে প্রাইমারি কি বা টুপল পয়েন্টার পাওয়ার পর ডেটাবেজকে অন্য কলামগুলোর ডেটা আনতে মূল টেবিলে যেতে হয় (Heap Fetch)। কিন্তু যদি একটি কুয়েরির প্রয়োজনীয় সব কলাম ইনডেক্স থেকেই পাওয়া যায়, তবে ডেটাবেজ মূল টেবিলে না গিয়ে সরাসরি ইনডেক্স থেকেই রেজাল্ট ফিরিয়ে দেয়—যাকে `Index-Only Scan` বলে। PostgreSQL-এ `INCLUDE (column1, column2)` ব্যবহার করে ইনডেক্স ট্রি-র লিফ নোডে নন-কি কলাম যুক্ত করা যায়, যাতে ইনডেক্স সাইজ না বাড়িয়েও ইনডেক্স-অনলি স্ক্যান নিশ্চিত হয়।",
          "b": "কভারিং ইনডেক্স কুয়েরির প্রয়োজনীয় সব কলাম ইনডেক্সেই সরবরাহ করে। ফলে মূল টেবিল স্ক্যান না করে সরাসরি ইনডেক্স থেকেই ডেটা রিটার্ন হয়, যা Index-Only Scan নামে পরিচিত।",
          "e": "A Covering Index contains all columns requested by a query. PostgreSQL's INCLUDE clause appends payload columns to the leaf nodes without indexing them in the B-Tree search keys, enabling zero-heap-fetch Index-Only Scans with minimal overhead.",
          "code": "CREATE INDEX idx_users_email_covering ON users (email) INCLUDE (name, role);"
        },
        {
          "lvl": "lvl2",
          "q": "GIN (Generalized Inverted Index) ইনডেক্স কী এবং JSONB কলাম ও Full-Text Search-এ কেন GIN অপরিহার্য?",
          "m": "B-Tree ইনডেক্স শুধুমাত্র পুরো ভ্যালু সার্চ করতে পারে, কিন্তু JSONB-এর ভিতরের কোনো নির্দিষ্ট কি/ভ্যালু বা টেক্সটের ভিতরের শব্দ সার্চ করতে পারে না। `GIN` ইনডেক্স হলো একটি ইনভার্টেড ইনডেক্স (বইয়ের ব্যাক-ইন্ডেক্সের মতো) যেখানে ডেটার অভ্যন্তরীণ প্রতিটি এলিমেন্ট বা ওয়ার্ডকে পৃথক করে ইনডেক্স করা হয়। PostgreSQL-এ JSONB ডকুমেন্টে `@>` (contains) অপারেটরে কুয়েরি করতে বা লাখ লাখ ডকুমেন্টে ফুল-টেক্সট সার্চ (`tsvector @@ tsquery`) করতে GIN ইনডেক্স সুপারফাস্ট সার্চ পারফরম্যান্স নিশ্চিত করে।",
          "b": "জিআইএন হলো ইনভার্টেড ইনডেক্স যা JSONB ডেটার ভেতরের কি-ভ্যালু এবং ফুল-টেক্সট সার্চের প্রতিটি শব্দ ইনডেক্স করে। এটি জটিল কন্টেইনিং কুয়েরিকে অত্যন্ত দ্রুত সম্পন্ন করে।",
          "e": "A GIN (Generalized Inverted Index) maps internal elements/tokens to row pointers. It is essential for PostgreSQL JSONB containment queries (@>) and full-text document searches (tsvector), where individual documents contain multiple indexed attributes.",
          "code": "CREATE INDEX idx_products_metadata_gin ON products USING GIN (metadata jsonb_path_ops);"
        },
        {
          "lvl": "lvl2",
          "q": "PostgreSQL-এ Expression Index (বা ফাংশন-বেসড ইনডেক্স) কখন এবং কীভাবে ব্যবহার করা হয়?",
          "m": "যদি কোনো কুয়েরির ফিল্টারে কলামের ওপর ফাংশন চালানো হয় (যেমন `WHERE LOWER(email) = 'user@test.com'`), তবে সাধারণ কলাম ইনডেক্স কাজ করে না কারণ ইনডেক্সে অরিজিনাল ভ্যালু সংরক্ষিত থাকে। সমাধান হিসেবে ফাংশনের এক্সপ্রেশনের ওপর সরাসরি ইনডেক্স তৈরি করা হয়: `CREATE INDEX idx_users_lower_email ON users (LOWER(email))`। এতে ডেটাবেজ লোয়ারকেস করা মানগুলো ইনডেক্স ট্রিতে রাখে এবং কুয়েরি ইনস্ট্যান্ট ইনডেক্স স্ক্যান ব্যবহার করে।",
          "b": "এক্সপ্রেশন ইনডেক্স কলামের কোনো ফাংশনাল এক্সপ্রেশনের ওপর তৈরি হয় (যেমন LOWER(email))। এর ফলে ফিল্টারে ফাংশন থাকলেও সাধারণ স্ক্যান এড়িয়ে ইনডেক্স ব্যবহার করা সম্ভব হয়।",
          "e": "An Expression Index evaluates and stores the result of an expression/function (such as LOWER(email) or DATE(created_at)). Without it, queries applying functions in WHERE predicates fail to use standard column B-Trees and fall back to sequential scans.",
          "code": "CREATE INDEX idx_users_lower_email ON users (LOWER(email));"
        },
        {
          "lvl": "lvl3",
          "q": "EXPLAIN ANALYZE-এর আউটপুটে 'Seq Scan', 'Index Scan', 'Bitmap Index Scan' এবং 'Index Only Scan'-এর মধ্যে পার্থক্য কীভাবে শনাক্ত করবে?",
          "m": "(১) `Seq Scan (Sequential Scan)`: পুরো টেবিল শুরু থেকে শেষ পর্যন্ত পড়া হয়েছে (সবচেয়ে স্লো, ইনডেক্স মিসিং)। (২) `Index Scan`: B-Tree ইনডেক্স দিয়ে নির্দিষ্ট রো খুঁজে সরাসরি মূল হিপ টেবিল থেকে ডেটা আনা হয়েছে (পয়েন্ট লুকআপের জন্য সেরা)। (৩) `Bitmap Index Scan`: ইনডেক্স থেকে ম্যাচিং ব্লকগুলোর একটি বিটম্যাপ তৈরি করে মেমোরিতে সাজিয়ে ডিস্ক থেকে ব্যাচে ডেটা এনেছে (যখন প্রচুর রো রিটার্ন হয় বা একাধিক ইনডেক্স অ্যান্ড/অর করা হয়)। (৪) `Index Only Scan`: মূল টেবিলে স্পর্শই করা লাগেনি, সব ডেটা সরাসরি ইনডেক্স থেকেই রিটার্ন করা হয়েছে (সর্বোচ্চ দ্রুততম)।",
          "b": "Seq Scan পুরো টেবিল পড়ে যা সবচেয়ে স্লো। Index Scan ইনডেক্স ধরে টেবিলে যায়। Bitmap Index Scan একাধিক রো মেমোরি বিটম্যাপে সাজিয়ে ডিস্ক থেকে আনে। Index Only Scan টেবিল ছাড়াই ইনডেক্স থেকে সরাসরি উত্তর দেয় যা দ্রুততম।",
          "e": "Seq Scan reads every page in the table. Index Scan traverses the B-Tree and fetches matching heap pages. Bitmap Index Scan constructs an in-memory bitmask of page locations to batch I/O for multiple rows. Index Only Scan retrieves requested attributes directly from the index without reading heap pages.",
          "tip": "ইন্টারভিউতে 'Index Only Scan bypasses the heap table completely' লাইনটি স্পষ্টভাবে উচ্চারণ করবে।"
        },
        {
          "lvl": "lvl3",
          "q": "High Index Bloat কী, এটি কেন ঘটে এবং প্রোডাকশন টেবিল লক না করে `REINDEX CONCURRENTLY` কীভাবে চালানো হয়?",
          "m": "PostgreSQL-এ MVCC মেকানিজমের কারণে যখন প্রচুর UPDATE এবং DELETE হয়, তখন ডেড টুপলগুলো ইনডেক্স পেজে ফাঁকা জায়গা তৈরি করে। অটো-ভ্যাকুয়াম সবসময় ইনডেক্স পেজ শ্রাঙ্ক করতে পারে না, ফলে ইনডেক্স ফাইলটি অপ্রয়োজনীয়ভাবে বিশাল (Bloated) হয়ে যায় এবং RAM ক্যাশ নষ্ট করে। সাধারণ `REINDEX` পুরো টেবিলে এক্সক্লুসিভ লক ফেলে প্রোডাকশন ডাউন করে দেয়। সমাধান: `REINDEX TABLE CONCURRENTLY table_name` চালাতে হবে। এটি ব্যাকগ্রাউন্ডে নতুন ইনডেক্স তৈরি করে এবং পুরনোটির সাথে অদলবদল করে কোনো লক বা রিড/রাইট ডাউনটাইম ছাড়াই।",
          "b": "প্রচুর আপডেট ও ডিলিটের ফলে ইনডেক্স পেজে ফাঁকা জায়গা তৈরি হয়ে ইনডেক্স ব্লোট হয়। প্রোডাকশনে রিড/রাইট চালু রেখেই REINDEX CONCURRENTLY চালিয়ে টেবিল লক ছাড়া ইনডেক্স পরিষ্কার করা যায়।",
          "e": "Frequent updates and deletes produce dead tuples, causing index fragmentation and bloat that degrades RAM cache efficiency. A standard REINDEX blocks concurrent writes. REINDEX CONCURRENTLY builds the replacement index in the background without exclusive locking.",
          "code": "REINDEX TABLE CONCURRENTLY orders;"
        },
        {
          "lvl": "lvl3",
          "q": "PostgreSQL-এ `pg_stat_statements` এক্সটেনশন ব্যবহার করে প্রোডাকশনের টপ ১০ স্লো কুয়েরি কীভাবে আইডেন্টিফাই করবে?",
          "m": "`pg_stat_statements` হলো প্রোডাকশন ডাটাবেজ পারফরম্যান্স অডিটের সবচেয়ে শক্তিশালী বিল্ট-ইন টুল। এটি সার্ভারে চলা সব কুয়েরির মোট এক্সিকিউশন টাইম, কল কাউন্ট, মিন/ম্যাক্স টাইম এবং ব্লক আই/ও রেকর্ড করে। `SELECT query, calls, total_exec_time, mean_exec_time FROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;` কুয়েরি চালিয়ে আমরা মুহূর্তে দেখতে পারি কোন কুয়েরিটি সার্ভারের সিংহভাগ সিপিইউ ও ডিস্ক সময় গ্রাস করছে।",
          "b": "pg_stat_statements এক্সটেনশন সার্ভারে চলা প্রতিটি কুয়েরির গড় সময় ও কল কাউন্ট ট্র্যাক করে। total_exec_time অনুযায়ী সর্ট করে মুহূর্তেই সিস্টেমের সবচেয়ে স্লো কুয়েরিগুলো বের করা যায়।",
          "e": "The pg_stat_statements module provides performance statistics for all SQL statements executed. Querying pg_stat_statements ordered by total_exec_time or mean_exec_time pinpoint the exact bottleneck queries consuming database hardware resources.",
          "code": "SELECT query, calls, round(total_exec_time::numeric, 2) AS total_ms,\n       round(mean_exec_time::numeric, 2) AS avg_ms\nFROM pg_stat_statements ORDER BY total_exec_time DESC LIMIT 10;"
        },
        {
          "lvl": "lvl3",
          "q": "GiST (Generalized Search Tree) ইনডেক্স এবং BRIN (Block Range Index) কখন ব্যবহার করা হয়?",
          "m": "(১) `GiST`: জিও-স্পেশিয়াল কুয়েরি (PostGIS ল্যাটিচ্যুড/লঙ্গিচ্যুড রেঞ্জ ও পলিগন), ওভারল্যাপিং রেঞ্জ ডেটা টাইপ (`tsrange`, `daterange`), এবং ফুল-টেক্সট সার্চে ব্যবহৃত হয়। (২) `BRIN`: শত শত গিগাবাইট বা টেরাবাইটের মতো বিশাল টাইম-সিরিজ বা লগ টেবিলে যেখানে ডেটা স্বাভাবিকভাবেই ক্রমানুসারে ইনসার্ট হয় (`created_at`)। BRIN প্রতিটি পেজ রেঞ্জের শুধু Min এবং Max ভ্যালু সংরক্ষণ করে, যার ফলে শত গিগাবাইটের একটি টেবিলের BRIN ইনডেক্স সাইজ মাত্র কয়েক মেগাবাইট হয়!",
          "b": "GiST ব্যবহৃত হয় ভৌগোলিক ডেটা ও ওভারল্যাপিং ডেটার ক্ষেত্রে। BRIN ব্যবহৃত হয় টেরাবাইট আকারের টাইম-সিরিজ ডেটায় যেখানে ডেটা ধারাবাহিকভাবে জমা হয়—এটি মাত্র কয়েক মেগাবাইট মেমোরি ব্যবহার করে কাজ সম্পন্ন করে।",
          "e": "GiST indexes non-scalar geometries, bounding boxes (PostGIS), and overlapping range intervals. BRIN (Block Range Index) stores only the minimum and maximum values for blocks of pages, ideal for multi-terabyte naturally ordered time-series data with microscopic index footprint.",
          "code": "CREATE INDEX idx_logs_created_brin ON app_logs USING BRIN (created_at);"
        },
        {
          "lvl": "lvl3",
          "q": "PostgreSQL Query Planner যখন ভুলভাবে Index Scan-এর বদলে Seq Scan বেছে নেয়, তখন কীভাবে ট্রাবলশুট করবে?",
          "m": "কারণসমূহ: (১) টেবিলের স্ট্যাটিস্টিকস পুরনো হয়ে গেছে, ফলে প্ল্যানার মনে করছে টেবিলে রো সংখ্যা খুব কম। ফিক্স: `ANALYZE table_name;` রান করে স্ট্যাট আপডেট করা। (২) কলামের ডেটা টাইপ মিসম্যাচ (যেমন কলামটি `VARCHAR` কিন্তু কুয়েরিতে ইনটিজার পাস করায় টাইপ কাস্টিংয়ের কারণে ইনডেক্স বাতিল হয়েছে)। (৩) কুয়েরিটি টেবিলের ৭০-৮০% ডেটা সিলেক্ট করছে, যেখানে সিকুয়েনশিয়াল স্ক্যান আসলেই ডিস্ক আই/ও-এর দিক থেকে দ্রুত। (৪) `random_page_cost` প্যারামিটার ডিফল্ট 4.0 রয়ে গেছে, যা SSD ড্রাইভের জন্য 1.1 করা উচিত যাতে প্ল্যানার ইনডেক্স স্ক্যানকে অগ্রাধিকার দেয়।",
          "b": "প্ল্যানার ভুল করলে প্রথমে ANALYZE চালিয়ে স্ট্যাটিস্টিকস রিফ্রেশ করতে হয়, টাইপ কাস্টিং মিসম্যাচ চেক করতে হয়, এবং SSD ডিস্কের ক্ষেত্রে random_page_cost কমিয়ে 1.1 কনফিগার করতে হয়।",
          "e": "Troubleshoot index bypasses by running ANALYZE table_name to refresh planner statistics, checking for implicit type-casting in WHERE filters, and tuning random_page_cost down from 4.0 to 1.1 on NVMe/SSD storage to favor random index seeks.",
          "tip": "প্রোডাকশন সার্ভারে SSD থাকলে `random_page_cost = 1.1` সেট করা বেস্ট প্র্যাকটিস।"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ৫০ লক্ষ রোর `orders` টেবিলে `SELECT * FROM orders WHERE tenant_id = 't1' ORDER BY created_at DESC LIMIT 20;` কুয়েরিটি এক্সিকিউট হতে ৪ সেকেন্ড নিচ্ছে। টেবিলে দুটি আলাদা ইনডেক্স আছে: `idx_tenant` এবং `idx_created`। সমস্যা কোথায় এবং কীভাবে ১০০ মিলিসেকেন্ডের নিচে নামাবে?",
          "m": "সমস্যা: ডেটাবেজ দুটি আলাদা ইনডেক্সকে একসাথে ব্যবহার করতে গিয়ে কনফিউজড হচ্ছে—হয় সে `idx_tenant` দিয়ে ৫০ হাজার রো ফিল্টার করে মেমোরিতে বিশাল সর্ট চালাচ্ছে, অথবা `idx_created` দিয়ে ব্যাকওয়ার্ড স্ক্যান করে একটা একটা করে চেক করছে। সমাধান: দুটি আলাদা ইনডেক্স ড্রপ করে একটি যৌথ Composite Index তৈরি করতে হবে: `CREATE INDEX idx_orders_tenant_created ON orders (tenant_id, created_at DESC);`। এতে ডেটাবেজ সরাসরি `t1`-এর প্রথম ২০টি রো ইনডেক্স থেকে নিয়ে মুহূর্তেই (৫-১০ মিলিসেকেন্ডে) কুয়েরি শেষ করবে কোনো মেমোরি সর্ট ছাড়াই!",
          "b": "দুটি পৃথক ইনডেক্স ফিল্টার ও সর্টের কাজ একসাথে দ্রুত করতে পারে না। (tenant_id, created_at DESC) দিয়ে একটি কম্পাউন্ড ইনডেক্স তৈরি করলেই কোনো সর্ট ওভারহেড ছাড়া কুয়েরি ৫ মিলিসেকেন্ডে চলবে।",
          "e": "Two separate single-column indexes force the planner to pick one and perform an expensive in-memory sort or bitmap merge. Resolving this requires a compound index on (tenant_id, created_at DESC), delivering instant index-ordered retrieval.",
          "code": "CREATE INDEX idx_orders_tenant_created ON orders (tenant_id, created_at DESC);"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: তোমার টিমের একটি কুয়েরি `WHERE phone LIKE '%01711%'` দিয়ে সার্চ করায় কোনো ইনডেক্স কাজ করছে না এবং ফুল টেবিল স্ক্যান হচ্ছে। কীভাবে এটিকে অপটিমাইজ করবে?",
          "m": "সাধারণ B-Tree ইনডেক্স শুধুমাত্র প্রিফিক্স সার্চ (`LIKE '01711%'`) করতে পারে, কিন্তু লিডিং ওয়াইল্ডকার্ড (`'%01711%'`) থাকলে B-Tree সম্পূর্ণ অকেজো হয়ে যায়। সমাধান: PostgreSQL-এর `pg_trgm` (Trigram) এক্সটেনশন ইনস্টল করে একটি `GIN` ইনডেক্স তৈরি করতে হবে: `CREATE INDEX idx_phone_trgm ON users USING GIN (phone gin_trgm_ops);`। ট্রাইগ্রাম ইনডেক্স স্ট্রিংকে ৩ অক্ষরের সাবস্ট্রিংয়ে ভেঙে ফেলে, ফলে যেকোনো সাবস্ট্রিং বা ওয়াইল্ডকার্ড সার্চে এটি ফুল টেবিল স্ক্যান ছাড়াই মিলি-সেকেন্ডে ডেটা এনে দেয়।",
          "b": "লিডিং ওয়াইল্ডকার্ডযুক্ত LIKE কুয়েরিতে B-Tree কাজ করে না। pg_trgm এক্সটেনশন চালু করে GIN ট্রাইগ্রাম ইনডেক্স তৈরি করলে সাবস্ট্রিং সার্চেও সুপারফাস্ট ইনডেক্স স্ক্যান পাওয়া যায়।",
          "e": "Standard B-Tree indexes cannot service queries with leading wildcards (%query%). Install the pg_trgm extension and build a GIN trigram index on the column (gin_trgm_ops), accelerating wildcard substring and regex searches.",
          "code": "CREATE EXTENSION IF NOT EXISTS pg_trgm;\nCREATE INDEX idx_users_phone_trgm ON users USING GIN (phone gin_trgm_ops);"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি MongoDB কালেকশনে `db.products.find({ category: 'shoes' }).sort({ price: -1 })` কুয়েরি চালানোর পর প্রোডাকশন লগে এরর এলো: `Sort exceeded memory limit of 33554432 bytes`। কারণ কী এবং স্থায়ী সমাধান কী?",
          "m": "কারণ: মঙ্গোডিবির ইন-মেমোরি সর্টের সর্বোচ্চ হার্ড লিমিট হলো ৩২ মেগাবাইট (32MB)। যদি কুয়েরি ফিল্টারের রেজাল্ট ৩২MB-এর বেশি ডেটা রিটার্ন করে এবং সর্টিং ফিল্ডে কোনো ইনডেক্স না থাকে, তবে মঙ্গোডিবি মেমোরি এক্সিড এরর দিয়ে কুয়েরি ফেইল করায়। স্থায়ী সমাধান: ফিল্টার ও সর্ট ফিল্ডের ওপর একটি কম্পাউন্ড ইনডেক্স তৈরি করা: `db.products.createIndex({ category: 1, price: -1 })`। এতে ডেটা ইতিমধ্যে ইনডেক্সেই সাজানো থাকবে, ফলে মেমোরিতে কোনো সর্টিং অপারেশন ঘটবে না।",
          "b": "মঙ্গোডিবির ইন-মেমোরি সর্ট লিমিট ৩২MB ছাড়িয়ে যাওয়ায় এই এরর এসেছে। (category: 1, price: -1) কম্পাউন্ড ইনডেক্স তৈরি করলে মেমোরি ছাড়াই সরাসরি ইনডেক্স থেকে সর্টেড ডেটা পাওয়া যাবে।",
          "e": "MongoDB caps in-memory sorting at 32MB. If unindexed sort results exceed this buffer, the query aborts. Create a compound index on { category: 1, price: -1 } so documents are read pre-sorted directly off disk, bypassing in-memory sorting completely.",
          "code": "db.products.createIndex({ category: 1, price: -1 });"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ইনভয়েস টেবিলে কোটি কোটি রো আছে, কিন্তু প্রতিদিন শুধু অডিট করার জন্য এমন ইনভয়েস খোঁজা হয় যেগুলোর `is_audited = FALSE` (যা মোট ডেটার মাত্র ১%)। তুমি কীভাবে ইনডেক্স ডিজাইন করবে যাতে ডিস্ক খরচ সর্বনিম্ন থাকে?",
          "m": "সমাধান: একটি Partial Index তৈরি করতে হবে: `CREATE INDEX idx_invoices_unaudited ON invoices (id, created_at) WHERE is_audited = FALSE;`। এর ফলে ৯৯% রো যেগুলো ইতিমধ্যে অডিট হয়ে গেছে, সেগুলো ইনডেক্স ট্রি থেকে বাদ থাকবে। ইনডেক্স সাইজ হবে মাত্র কয়েক মেগাবাইট, মেমোরি ক্যাশে স্থায়ীভাবে ফিট করবে এবং প্রতিদিনের নতুন অডিটেড রো ইনসার্ট/আপডেটে কোনো রাইট পারফরম্যান্স পেনাল্টি হবে না।",
          "b": "WHERE is_audited = FALSE শর্তযুক্ত পার্শিয়াল ইনডেক্স তৈরি করব। এতে মোট ডেটার মাত্র ১% ইনডেক্সে থাকবে, ইনডেক্স সাইজ হবে অতিক্ষুদ্র এবং কুয়েরি হবে তাৎক্ষণিক।",
          "e": "Build a Partial Index with a WHERE is_audited = FALSE predicate. By excluding the 99% audited rows, the index footprint stays micro-sized, saving gigabytes of disk and RAM while accelerating audit searches.",
          "code": "CREATE INDEX idx_invoices_unaudited ON invoices (created_at)\nWHERE is_audited = FALSE;"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি হাই-ট্রাফিক সিস্টেমে ইনসার্ট ও আপডেটের স্পিড আশঙ্কাজনকভাবে কমে গেছে। ইনভেস্টিগেট করে দেখলে একই টেবিলে ১২টি ভিন্ন ভিন্ন ইনডেক্স তৈরি করা হয়েছে। তুমি কীভাবে এটি রিফ্যাক্টর করবে?",
          "m": "পদক্ষেপসমূহ: (১) `pg_stat_user_indexes` ভিউ থেকে প্রতিটি ইনডেক্সের `idx_scan` কাউন্ট চেক করব—যেসব ইনডেক্সের স্ক্যান কাউন্ট ০ বা খুব কম, সেগুলো অপ্রয়োজনীয় হওয়ায় অবিলম্বে ড্রপ করব। (২) রিডানড্যান্ট ইনডেক্স খুঁজে বের করব (যেমন `(a)` ইনডেক্স এবং `(a, b)` ইনডেক্স উভয়ই থাকলে `(a)` ইনডেক্সটি ডুপ্লিকেট, কারণ `(a, b)` একাই `a`-এর কুয়েরি হ্যান্ডেল করতে পারে)। (৩) যেসব ইনডেক্স রাখা দরকার সেগুলোকে কনসোলিডেট করে ৩-৪টি স্মার্ট কম্পাউন্ড ইনডেক্সে রূপান্তর করব। ফলে রাইট থ্রুপুট моментаল ৩ গুণ বেড়ে যাবে।",
          "b": "pg_stat_user_indexes দেখে অব্যবহৃত ইনডেক্স মুছে ফেলব, ডুপ্লিকেট প্রিফিক্স ইনডেক্সগুলো ড্রপ করব এবং প্রয়োজনীয়গুলোকে কম্পাউন্ড ইনডেক্সে রূপান্তর করে ইনডেক্স সংখ্যা ৪টিতে নামিয়ে আনব।",
          "e": "Audit index utilization via pg_stat_user_indexes and eliminate indexes with zero or negligible scan counts. Drop redundant single-column indexes covered by existing compound leftmost prefixes. Consolidate into 3-4 optimized compound indexes to restore write throughput.",
          "code": "SELECT indexrelname, idx_scan FROM pg_stat_user_indexes WHERE schemaname = 'public' ORDER BY idx_scan ASC;"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani POS): Dokani-তে হাজার হাজার দোকানের লাখ লাখ ইনভয়েসের মধ্যে ক্যাশিয়ার যখন বারকোড দিয়ে সার্চ করে, তখন কীভাবে সাব-৩ মিলিসেকেন্ড ল্যাটেন্সি নিশ্চিত করা হয়েছে?",
          "m": "দোকানি পিওএসে কোটি কোটি প্রোডাক্ট থাকলেও প্রতিটি দোকানের ক্যাশিয়ার শুধু তার নিজস্ব দোকানের প্রোডাক্ট সার্চ করে। আমরা মাল্টি-টেন্যান্ট B-Tree ইনডেক্স ডিজাইন করেছি: `CREATE INDEX idx_products_tenant_barcode ON products (tenant_id, barcode);`। ক্যাশিয়ার যখন স্ক্যান করে, কুয়েরি যায় `WHERE tenant_id = $1 AND barcode = $2`। এর ফলে ডেটাবেজ মাত্র ৩টি B-Tree নোড জাম্প করে সরাসরি কাঙ্ক্ষিত প্রোডাক্টটির রো তুলে আনে। ডিস্ক আই/ও শূন্যের কোঠায় থাকায় হাজার হাজার কনকারেন্ট ক্যাশিয়ারের সার্চেও গড় ল্যাটেন্সি থাকে মাত্র ১.৮ মিলিসেকেন্ড!",
          "b": "দোকানিতে (tenant_id, barcode) কম্পাউন্ড ইনডেক্স ব্যবহার করা হয়েছে। ফলে কোটি ডেটার মধ্যেও ডেটাবেজ সরাসরি নির্দিষ্ট দোকানের নির্দিষ্ট বারকোডে জাম্প করে ২ মিলিসেকেন্ডের নিচে প্রোডাক্ট খুঁজে দেয়।",
          "e": "In Dokani POS, ultra-fast barcode lookup across multi-tenant inventories is powered by a compound index on (tenant_id, barcode). The database performs a direct point seek on tenant partition keys, maintaining sub-2ms response times under high concurrency.",
          "code": "CREATE INDEX idx_products_tenant_barcode ON products (tenant_id, barcode);"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: PostgreSQL-এ `JSONB` কলামের ভিতরের নেস্টেড কী দ্রুত সার্চ করতে Dokani বা বড় SaaS সিস্টেমে কীভাবে ইনডেক্স অপটিমাইজ করা হয়?",
          "m": "যদি JSONB কলামের সাইজ বড় হয় তবে সাধারণ `USING GIN (data)` ইনডেক্স অনেক মেমোরি নেয়। কিন্তু অ্যাপ্লিকেশনে যদি নির্দিষ্ট কোনো নেস্টেড ফিল্ড দিয়ে ফ্রিকোয়েন্টলি সার্চ করা হয় (যেমন `metadata->>'paymentGateway'`), তবে আমরা এক্সপ্রেশন B-Tree ইনডেক্স তৈরি করি: `CREATE INDEX idx_payments_gateway ON payments ((metadata->>'paymentGateway'));`। এটি GIN-এর চেয়ে ১০ গুণ ছোট সাইজের হয় এবং সাধারণ টেক্সট ইনডেক্সের মতোই দ্রুত `WHERE metadata->>'paymentGateway' = 'BKASH'` কুয়েরি এক্সিকিউট করে।",
          "b": "JSONB-এর নির্দিষ্ট নেস্টেড ফিল্ড দ্রুত খুঁজতে এক্সপ্রেশন ইনডেক্স (metadata->>'key') তৈরি করা হয়। এটি পুরো JSONB-তে GIN ইনডেক্স দেওয়ার চেয়ে অনেক কম মেমোরি নেয় এবং দ্রুততম রেজাল্ট দেয়।",
          "e": "Instead of indexing entire bloated JSONB documents with GIN, create a targeted B-Tree Expression Index on the exact extracted key path ((metadata->>'gateway')). This consumes a fraction of the RAM and accelerates point lookups.",
          "code": "CREATE INDEX idx_orders_gateway ON orders ((metadata->>'gateway'));"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: ই-কমার্স বা মার্কেটপ্লেস সিস্টেমে একাধিক ফিল্টার (ক্যাটাগরি, ব্র্যান্ড, প্রাইস রেঞ্জ, রেটিং, ইন-স্টক) একসাথে কাজ করার জন্য কীভাবে ইনডেক্স স্ট্র্যাটেজি সাজাবে?",
          "m": "সব কম্বিনেশনের জন্য আলাদা ইনডেক্স বানানো অসম্ভব কারণ কম্বিনেশন হতে পারে শত শত। আর্কিটেকচারাল সমাধান: (১) ক্যাটাগরি ও স্টকের মতো হাই-কার্ডিনালিটি ফিল্টার দিয়ে বেস কম্পাউন্ড ইনডেক্স তৈরি করা `(category_id, is_in_stock, price)`। (২) ডাইনামিক ফিল্টারিংয়ের জন্য PostgreSQL-এর একাধিক সিঙ্গেল-কলাম ইনডেক্স ওপেন রাখা, যাতে প্ল্যানার রানটাইমে `BitmapAnd` দিয়ে দুটি ইনডেক্সের বিটম্যাপ একত্র করে ফিল্টার করতে পারে। (৩) যদি সার্চ ফিল্টার আরও জটিল ও টেক্সট-বেসড হয়, তবে রিলেশনাল ডিবিতে প্রেশার না দিয়ে Elasticsearch বা Meilisearch দিয়ে সার্চ লেয়ার আলাদা করা।",
          "b": "বেস ফিল্টারের জন্য কম্পাউন্ড ইনডেক্স রাখা হয় এবং অন্যান্য ফিল্টারে বিটম্যাপ স্ক্যান ব্যবহার করা হয়। আর অত্যন্ত জটিল বহু-মাত্রিক সার্চ ফিল্টারিংয়ের জন্য ডেটাবেজের বদলে মেইলিসার্চ বা ইলাস্টিকসার্চ ব্যবহার করা আদর্শ।",
          "e": "For multi-faceted filtering, craft a primary compound index for high-selectivity predicates (category_id, is_in_stock, price), allowing the engine to leverage Bitmap Index Scans for secondary filters. For massive faceted catalogs, offload search workloads to Elasticsearch or Meilisearch.",
          "tip": "মার্কেটপ্লেস সার্চে 'Bitmap Index Scan' এবং 'Dedicated search engines like Meilisearch' উল্লেখ করবে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: প্রোডাকশন ডেটাবেজে জিরো-ডাউনটাইমে নতুন ইনডেক্স কীভাবে ক্রিয়েট করবে?",
          "m": "সাধারণ `CREATE INDEX` কমান্ড টেবিলে `ShareLock` ফেলে, যার ফলে ইনডেক্স তৈরি চলাকালীন টেবিলে কোনো INSERT, UPDATE বা DELETE হতে পারে না—যা প্রোডাকশন সাইট ডাউন করার সমতুল্য। প্রোডাকশন স্ট্যান্ডার্ড: সবসময় `CREATE INDEX CONCURRENTLY` ব্যবহার করতে হবে। এটি ব্যাকগ্রাউন্ডে দুটি পাস (Two-pass scan) চালিয়ে কোনো রাইট ট্রানজ্যাকশন ব্লক না করে নিরাপদে ইনডেক্স তৈরি করে। কোনো কারণে ফেইল হলে এটি `INVALID` অবস্থায় থাকে, যা ক্লিন করে পুনরায় চালানো যায়।",
          "b": "প্রোডাকশনে সবসময় CREATE INDEX CONCURRENTLY ব্যবহার করতে হয়। এটি কোনো টেবিল লক না করে ব্যাকগ্রাউন্ডে ইনডেক্স বিল্ড করে, ফলে সাইটে ইউজারদের কাজ বিন্দুমাত্র ব্যাহত হয় না।",
          "e": "Standard CREATE INDEX applies a ShareLock, blocking all concurrent INSERT, UPDATE, and DELETE operations. Always execute CREATE INDEX CONCURRENTLY in production, which scans the table without taking exclusive locks.",
          "code": "CREATE INDEX CONCURRENTLY idx_users_active_email ON users (email) WHERE is_active = TRUE;"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: স্লো কুয়েরি মনিটরিং ও অটোমেটেড অ্যালার্টিং পাইপলাইন কীভাবে সেটআপ করবে?",
          "m": "প্রোডাকশন ডেটাবেজে `log_min_duration_statement = 200` সেট করি, যাতে ২০০ মিলিসেকেন্ডের বেশি সময় নেওয়া যেকোনো কুয়েরি স্বয়ংক্রিয়ভাবে সার্ভার লগে রেকর্ড হয়। এরপর Datadog, Grafana বা pganalyze এজেন্ট দিয়ে এই লগ ও `pg_stat_statements` স্ক্র্যাপ করি। যদি কোনো কুয়েরির গড় সময় ৫০০ms অতিক্রম করে বা ডিস্ক আই/ও স্পাইক করে, তবে অটোমেটেড পেজারডিউটি বা স্ল্যাক অ্যালার্ট ফায়ার করে। টিম সাথে সাথে কুয়েরি প্ল্যান অডিট করে প্রয়োজনীয় ইনডেক্স বা কুয়েরি রিরাইট সম্পন্ন করে।",
          "b": "log_min_duration_statement প্যারামিটার দিয়ে ২০০ মিলি-সেকেন্ডের বেশি সময় নেওয়া কুয়েরি লগ করা হয়। গ্রাফানা বা পিজি-অ্যানালাইজ দিয়ে এগুলো ট্র্যাক করে স্লো কুয়েরি ধরা পড়লেই স্ল্যাকে স্বয়ংক্রিয় অ্যালার্ট পাঠানো হয়।",
          "e": "Configure log_min_duration_statement = 200 to capture any query exceeding 200ms in PostgreSQL server logs. Ingest telemetry into Datadog or pganalyze to track p99 latencies, auto-triggering Slack alerts whenever slow queries spike hardware I/O.",
          "code": "-- postgresql.conf:\nlog_min_duration_statement = 200\nshared_preload_libraries = 'pg_stat_statements'"
        }
      ]
    },
    {
      "id": "database-transactions-acid",
      "name": "Database Transactions & ACID Concurrency",
      "desc": "ACID Properties, Isolation Levels, Dirty/Phantom Reads, SELECT FOR UPDATE, Pessimistic vs Optimistic Locking, Deadlock Prevention",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Database Transaction কী এবং ACID নীতিগুলোর প্রতিটি শব্দের অর্থ কী?",
          "m": "Database Transaction হলো এক বা একাধিক SQL অপারেশনের একটি অবিভাজ্য লজিক্যাল ইউনিট। ACID হলো ৪টি মৌলিক গ্যারান্টি: (১) `Atomicity (অল-অর-নাথিং)`: ট্রানজ্যাকশনের সব কাজ সফল হবে, না হলে কিছুই হবে না (ব্যর্থ হলে পুরোটা রোলব্যাক হবে)। (২) `Consistency`: ট্রানজ্যাকশনের আগে ও পরে সব ডাটাবেজ রুলস, কনস্ট্রেইন্ট ও ব্যালেন্স শুদ্ধ থাকবে। (৩) `Isolation`: একাধিক কনকারেন্ট ট্রানজ্যাকশন একে অপরের অপারেশনের অন্তর্বর্তীকালীন ডেটা দেখতে পারবে না। (৪) `Durability`: ট্রানজ্যাকশন একবার কমিট হলে পাওয়ার কাট বা সার্ভার ক্র্যাশেও ডেটা হারিয়ে যাবে না (WAL লগ ডিস্কে সেভ থাকে)।",
          "b": "ট্রানজ্যাকশন হলো একাধিক ডাটাবেজ কুয়েরির একটি অবিভাজ্য ইউনিট। ACID নিশ্চিত করে: অ্যাটোমিসিটি (সব হবে নয়তো কিছুই হবে না), কনসিস্টেন্সি (শর্ত বজায় থাকবে), আইসোলেশন (আলাদা থাকবে), এবং ডিউরেবিলিটি (সার্ভার ক্র্যাশেও ডেটা সুরক্ষিত থাকবে)।",
          "e": "A transaction is an indivisible unit of database operations. ACID guarantees: Atomicity (all-or-nothing execution), Consistency (maintains schema constraints and invariants), Isolation (concurrent operations execute without interference), and Durability (committed transactions persist through power loss or system crashes).",
          "tip": "ইন্টারভিউতে 'All-or-nothing atomicity and WAL-based durability' বলবে।"
        },
        {
          "lvl": "lvl1",
          "q": "SQL-এ `COMMIT` এবং `ROLLBACK`-এর ভূমিকা কী?",
          "m": "যখন কোনো ট্রানজ্যাকশন `BEGIN` বা `START TRANSACTION` দিয়ে শুরু হয়, তখন ভেতরের সব পরিবর্তন ডেটাবেজের মেমোরি বাফার ও ট্রানজ্যাকশন লগে অস্থায়ীভাবে থাকে। যদি সব অপারেশন সফল হয়, তবে `COMMIT` কল করা হয়—যার ফলে পরিবর্তনগুলো স্থায়ীভাবে ডিস্কে রাইট হয় এবং অন্য সব ইউজারের কাছে দৃশ্যমান হয়। আর যদি মাঝে কোনো একটি এরর বা এক্সেপশন ঘটে, তবে `ROLLBACK` কল করা হয়—যার ফলে ট্রানজ্যাকশনের শুরু থেকে হওয়া সমস্ত সাময়িক পরিবর্তন পুরোপুরি মুছে যায় এবং ডাটাবেজ আগের নিখুঁত অবস্থায় ফিরে যায়।",
          "b": "COMMIT ট্রানজ্যাকশনের সমস্ত পরিবর্তন স্থায়ীভাবে সংরক্ষণ করে। আর কোনো ত্রুটি ঘটলে ROLLBACK কল করে সমস্ত সাময়িক পরিবর্তন বাতিল করে ডেটাবেজকে পূর্ববর্তী নিরাপদ অবস্থায় ফিরিয়ে নেওয়া হয়।",
          "e": "COMMIT permanently finalizes all database mutations within the transaction and makes them visible to the rest of the system. ROLLBACK aborts the transaction, reverting all staged mutations back to the pre-transaction state upon encountering any error.",
          "code": "BEGIN;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;"
        },
        {
          "lvl": "lvl1",
          "q": "Pessimistic Locking বনাম Optimistic Locking-এর মধ্যে মূল পার্থক্য কী এবং কখন কোনটি ব্যবহার করবে?",
          "m": "(১) `Pessimistic Locking`: ধরে নেওয়া হয় কনফ্লিক্ট ঘটবেই! তাই ডেটা রিড করার সময়ই রো-তে ডাটাবেজ লেভেলে এক্সক্লুসিভ লক ফেলে দেওয়া হয় (`SELECT FOR UPDATE`), যাতে ট্রানজ্যাকশন শেষ না হওয়া পর্যন্ত অন্য কেউ ওই রো এডিট করতে না পারে। ব্যবহার: ব্যাংকিং ব্যালেন্স ডেবিট, টিকিট বুকিং বা স্টক রিডাকশন। (২) `Optimistic Locking`: কোনো লক ফেলা হয় না; ধরে নেওয়া হয় কনফ্লিক্ট খুব কম হবে। রেকর্ডে একটি `version` নম্বর রাখা হয়। আপডেট করার সময় চেক করা হয় ভার্সন অপরিবর্তিত আছে কি না (`WHERE version = 5`)। ব্যবহার: সিএমএস আর্টিকেল এডিট, ইউজার প্রোফাইল বা হাই-রিড লো-কনকারেন্সি সিস্টেম।",
          "b": "পেসিমিস্টিক লকিং ডেটা পড়ার সময়ই ডাটাবেজে লক ফেলে দেয় যাতে অন্য কেউ হাত না দিতে পারে (যেমন ব্যাংকিং ট্রানজ্যাকশন)। অপটিমিস্টিক লকিং লক না করে ভার্সন কলাম দিয়ে কনফ্লিক্ট যাচাই করে (যেমন প্রোফাইল এডিট)।",
          "e": "Pessimistic Locking locks rows at read time (SELECT FOR UPDATE) preventing concurrent access until commit (ideal for high-contention financial ledger mutations). Optimistic Locking avoids locks, checking a version column during update and failing on mismatch (ideal for low-conflict scenarios like profile updates).",
          "tip": "বলো: 'Pessimistic prevents conflicts with DB locks; Optimistic detects conflicts at commit via versioning.'"
        },
        {
          "lvl": "lvl1",
          "q": "Database Deadlock কী এবং এটি কীভাবে ঘটে?",
          "m": "Deadlock হলো এমন একটি অচল অবস্থা যেখানে দুটি বা ততোধিক ট্রানজ্যাকশন একে অপরের লক করে রাখা রিসোর্সের জন্য অপেক্ষা করতে থাকে, ফলে কেউই এগোতে পারে না! উদাহরণ: ট্রানজ্যাকশন A রো ১ লক করেছে এবং রো ২-এর জন্য অপেক্ষা করছে; একই সময়ে ট্রানজ্যাকশন B রো ২ লক করেছে এবং রো ১-এর জন্য অপেক্ষা করছে! ডেটাবেজ ইঞ্জিন স্বয়ংক্রিয়ভাবে একটি ডেডলক ডিটেকশন গ্রাফ চালায় এবং যেকোনো একটি ট্রানজ্যাকশনকে `Deadlock detected` এরর দিয়ে কিল করে অন্যটিকে সম্পন্ন হওয়ার সুযোগ দেয়।",
          "b": "ডেডলক হলো রিসোর্স লকিংয়ের অচলাবস্থা যেখানে ট্রানজ্যাকশন A অপেক্ষা করে B-এর রিলিজের জন্য এবং B অপেক্ষা করে A-এর রিলিজের জন্য। ডেটাবেজ স্বয়ংক্রিয়ভাবে যেকোনো একটিকে রোলব্যাক করে অচলাবস্থা দূর করে।",
          "e": "A Deadlock occurs when two or more transactions hold locks on resources the other needs, creating a circular wait cycle (Transaction A holds Lock 1 and waits for Lock 2; Transaction B holds Lock 2 and waits for Lock 1). The database engine aborts one transaction to break the cycle.",
          "code": "-- Tx 1: Locks row A, waits for B\n-- Tx 2: Locks row B, waits for A -> Deadlock!"
        },
        {
          "lvl": "lvl1",
          "q": "Write-Ahead Logging (WAL) কী এবং এটি Durability কীভাবে নিশ্চিত করে?",
          "m": "WAL হলো ডাটাবেজ ক্র্যাশ রিকভারির মূল মেকানিজম। যেকোনো ডেটা মূল টেবিল ফাইলে (Heap Table) লেখার আগে ডেটাবেজ নিশ্চিত করে যে অপারেশনের লগটি ডিস্কের সিকুয়েনশিয়াল WAL ফাইলে রাইট ও ফ্লাশ (`fsync`) হয়েছে। যদি কোনো ট্রানজ্যাকশন কমিট হওয়ার পর পরই বিদ্যুৎ চলে যায় বা সার্ভার রিবুট হয়, রিস্টার্টের সময় ডাটাবেজ WAL লগ রি-প্লে করে ডেটাবেজের নিখুঁত অবস্থা ফিরিয়ে আনে। সিকুয়েনশিয়াল রাইট হওয়ায় এটি ডিস্ক র্যান্ডম আই/ও বাঁচিয়ে পারফরম্যান্সও বাড়ায়।",
          "b": "WAL হলো এমন একটি লগ যেখানে মূল ফাইলে লেখার আগেই প্রতিটি পরিবর্তনের তথ্য ডিস্কে লিখে রাখা হয়। ফলে সার্ভার ক্র্যাশ করলেও রিস্টার্টের সময় WAL লগ পড়ে ডেটাবেজ পুনরুদ্ধার করা সম্ভব হয়।",
          "e": "Write-Ahead Logging (WAL) guarantees Durability by writing and flushing change logs to sequential disk files before applying them to database heap pages. In case of unexpected server crashes, PostgreSQL replays the WAL logs during recovery to restore the committed state.",
          "tip": "WAL নিশ্চিত করে যে COMMIT সফল হওয়া মানেই ডেটা নিরাপদে ডিস্কে স্থায়ী হয়েছে।"
        },
        {
          "lvl": "lvl2",
          "q": "SQL Standard-এর ৪টি Isolation Levels কী কী এবং তাদের প্রিভেনশন ম্যাট্রিক্স কী?",
          "m": "৪টি স্তর: (১) `Read Uncommitted`: অন্য ট্রানজ্যাকশনের আনকমিটেড ডেটাও পড়া যায় (Dirty Read হতে পারে)। (২) `Read Committed` (Postgres-এর ডিফল্ট): শুধু কমিট হওয়া ডেটা পড়া যায়; Dirty Read ঠেকায়, কিন্তু Non-repeatable Read হতে পারে। (৩) `Repeatable Read`: পুরো ট্রানজ্যাকশনে একই কুয়েরি চালালে একই রেজাল্ট পাওয়া যাবে; Non-repeatable Read ঠেকায়, কিন্তু Phantom Read হতে পারে। (৪) `Serializable`: সর্বোচ্চ স্তর; কনকারেন্ট ট্রানজ্যাকশনগুলোকে এমনভাবে চালায় যেন তারা একটার পর একটা ক্রমানুসারে চলেছে; সব ধরনের অ্যানোমালি প্রতিরোধ করে কিন্তু পারফরম্যান্স ধীর হয়।",
          "b": "আইসোলেশন লেভেল ৪টি: Read Uncommitted, Read Committed, Repeatable Read, এবং Serializable। পোস্টগ্রেস ডিফল্টভাবে Read Committed ব্যবহার করে যা ডার্টি রিড ঠেকায়। সর্বোচ্চ স্তর সিরিয়ালাইজেবল সব অ্যানোমালি প্রতিরোধ করে।",
          "e": "The standard isolation levels from lowest to highest: Read Uncommitted (allows dirty reads), Read Committed (default in PG, prevents dirty reads), Repeatable Read (guarantees snapshot consistency across reads), and Serializable (enforces serial execution semantics, eliminating all anomalies at the cost of concurrency).",
          "code": "SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;"
        },
        {
          "lvl": "lvl2",
          "q": "Dirty Read, Non-repeatable Read এবং Phantom Read অ্যানোমালিগুলোর বাস্তব উদাহরণ দাও?",
          "m": "(১) `Dirty Read`: ট্রানজ্যাকশন A ব্যালেন্স ১০০ থেকে ৫০ করল কিন্তু এখনো কমিট করেনি। ট্রানজ্যাকশন B তা পড়ে ফেলল এবং ৫০ দেখল। এরপর A রোলব্যাক করল! B ভুল ডেটা দেখে বসে থাকল। (২) `Non-repeatable Read`: ট্রানজ্যাকশন A একটি ইউজারের ব্যালেন্স পড়ল ১০০ টাকা। এরপর ট্রানজ্যাকশন B ব্যালেন্স আপডেট করে ১২০ টাকা করে কমিট করল। ট্রানজ্যাকশন A একই ট্রানজ্যাকশনে আবার ওই রো পড়ে দেখল ১২০ টাকা! (একই রো-র মান বদলে গেছে)। (৩) `Phantom Read`: ট্রানজ্যাকশন A পড়ল `WHERE status = 'ACTIVE'` এবং ৩টি রো পেল। ট্রানজ্যাকশন B নতুন একটি চতুর্থ রো ইনসার্ট করে কমিট করল। ট্রানজ্যাকশন A আবার একই কুয়েরি চালিয়ে এবার ৪টি রো পেল (নতুন রো তৈরি হয়েছে)।",
          "b": "ডার্টি রিড হলো অন্য কারো আনকমিটেড পরিবর্তন পড়ে ফেলা। নন-রিপিটেবল রিড হলো একই রো দুবার পড়ে ভিন্ন মান পাওয়া। ফ্যান্টম রিড হলো রেঞ্জ কুয়েরিতে নতুন রো ইনসার্ট হওয়ায় রোর সংখ্যা পরিবর্তন হওয়া।",
          "e": "Dirty Read: Reading uncommitted changes that subsequently roll back. Non-repeatable Read: Re-reading the same row within a transaction and observing mutated values committed by another transaction. Phantom Read: Re-executing a range query and discovering newly inserted rows committed by another transaction.",
          "tip": "পোস্টগ্রেসে ডিফল্ট লেভেলেই Dirty Read সম্পূর্ণ অসম্ভব কারণ এটি MVCC ব্যবহার করে।"
        },
        {
          "lvl": "lvl2",
          "q": "PostgreSQL-এ `SELECT FOR UPDATE` কীভাবে কাজ করে এবং `NOWAIT` ও `SKIP LOCKED` অপশনের ব্যবহার কী?",
          "m": "`SELECT ... FOR UPDATE` কুয়েরি টার্গেট রো-গুলোতে এক্সক্লুসিভ রাইট লক বসিয়ে দেয়, যাতে বর্তমান ট্রানজ্যাকশন শেষ না হওয়া পর্যন্ত অন্য কোনো ট্রানজ্যাকশন ওই রো আপডেট বা লক করতে না পারে। (১) `NOWAIT`: যদি রোটি ইতিমধ্যে অন্য কেউ লক করে রাখে, তবে অপেক্ষা না করে তৎক্ষণাৎ একটি লক-কনফ্লিক্ট এরর ফিরিয়ে দেয়। (২) `SKIP LOCKED`: যদি কোনো রো ইতিমধ্যে লক থাকে, তবে তাকে স্কিপ করে আনলকড রোগুলো তুলে আনে। এটি হাই-পারফরম্যান্স ডেটাবেজ ব্যাকড জব কিউ (যেমন BullMQ বা কাস্টম মেসেজ কিউ) তৈরিতে যুগান্তকারী সমাধান! একাধিক ওয়ার্কার একই কাজ না নিয়ে প্যারালালে কিউ প্রসেস করতে পারে।",
          "b": "SELECT FOR UPDATE নির্দিষ্ট রোর ওপর লক স্থাপন করে। NOWAIT অপেক্ষা না করে সাথে সাথে এরর দেয়। SKIP LOCKED ইতিমধ্যে লক হওয়া রোগুলো এড়িয়ে বাকি আনলকড রোগুলো এনে দেয় যা মেসেজ কিউ সিস্টেমের জন্য সেরা।",
          "e": "SELECT FOR UPDATE acquires an exclusive row-level lock on selected records. NOWAIT fails immediately if the target row is already locked. SKIP LOCKED skips currently locked rows and returns available unlocked ones, which is the foundational pattern for high-throughput transactional job queues.",
          "code": "SELECT * FROM job_queue\nWHERE status = 'PENDING'\nORDER BY priority DESC\nLIMIT 1\nFOR UPDATE SKIP LOCKED;"
        },
        {
          "lvl": "lvl2",
          "q": "PostgreSQL-এ MVCC (Multi-Version Concurrency Control) কীভাবে কাজ করে এবং কেন রিডার্স কখনো রাইটার্সকে ব্লক করে না?",
          "m": "MVCC-এর কারণে PostgreSQL-এ কোনো রো আপডেট বা ডিলিট হলে আসল রোটি সরাসরি ওভাররাইট হয় না। এর বদলে একটি নতুন টুপল (ভার্সন) তৈরি হয় যাতে `xmin` (ক্রিয়েটর ট্রানজ্যাকশন আইডি) এবং `xmax` (ডিলিটার ট্রানজ্যাকশন আইডি) সেট থাকে। যখন কোনো রিডার কুয়েরি চালায়, সে তার ট্রানজ্যাকশনের শুরুর সময় অনুযায়ী একটি স্ন্যাপশট দেখে। এর ফলে: রিডাররা কখনো রাইটারদের আটকে রাখে না, এবং রাইটাররাও কখনো রিডারদের ব্লক করে না! অর্থাৎ রিড এবং রাইট একে অপরকে কোনো ধরনের লক না ফেলে পূর্ণ গতিতে চলতে পারে।",
          "b": "MVCC প্রতি আপডেটে নতুন রো ভার্সন তৈরি করে এবং প্রতিটি ট্রানজ্যাকশনকে নিজস্ব স্ন্যাপশট প্রদান করে। এর মূল সুবিধা হলো রিড অপারেশন কখনো রাইটকে এবং রাইট কখনো রিড অপারেশনকে ব্লক করে না।",
          "e": "Under MVCC (Multi-Version Concurrency Control), PostgreSQL creates a new tuple version on updates rather than mutating in place, tracking visibility via xmin and xmax transaction metadata. This enables 'Readers never block Writers, and Writers never block Readers'.",
          "tip": "বলো: 'In PostgreSQL MVCC, readers never block writers and writers never block readers.'"
        },
        {
          "lvl": "lvl2",
          "q": "Prisma ORM-এ Interactive Transactions (`prisma.$transaction(async (tx) => { ... })`) কীভাবে ব্যাকগ্রাউন্ডে আইসোলেশন ও টাইমআউট হ্যান্ডেল করে?",
          "m": "Prisma ইন্টারঅ্যাক্টিভ ট্রানজ্যাকশন শুরু করলে ডেটাবেজ কানেকশন পুল থেকে একটি ডেডিকেটেড কানেকশন রিজার্ভ করে এবং `BEGIN` পাঠায়। ব্লকের ভেতরে সব কুয়েরি ওই একই কানেকশনে চলে। Prisma বাই-ডিফল্ট ট্রানজ্যাকশনের জন্য দুটি অপশন প্রোভাইড করে: `maxWait` (কানেকশন পাওয়ার জন্য সর্বোচ্চ অপেক্ষা, ডিফল্ট 2000ms) এবং `timeout` (পুরো ট্রানজ্যাকশন শেষ হওয়ার সময়সীমা, ডিফল্ট 5000ms)। যদি ব্লকের ভেতর কোনো প্রমিজ রিজেক্ট হয় বা নির্ধারিত সময়ে কাজ শেষ না হয়, তবে Prisma স্বয়ংক্রিয়ভাবে ডেটাবেজে `ROLLBACK` কমান্ড পাঠায় এবং কানেকশন পুলে কানেকশনটি ফেরত দেয়।",
          "b": "প্রিজমা ইন্টারঅ্যাক্টিভ ট্রানজ্যাকশন একটি নিবেদিত কানেকশনে চলে এবং টাইমআউট ও ম্যাক্সওয়েট পর্যবেক্ষণ করে। ব্লকের ভেতর কোনো এরর ঘটলে বা টাইমআউট হলে প্রিজমা স্বয়ংক্রিয়ভাবে ডাটাবেজে রোলব্যাক কার্যকর করে।",
          "e": "Prisma Interactive Transactions reserve a single dedicated database client from the pool to execute a BEGIN block. It enforces maxWait and timeout thresholds; if any operation throws or times out, Prisma automatically issues a ROLLBACK and safely recycles the connection.",
          "code": "await prisma.$transaction(async (tx) => {\n  const user = await tx.user.update({ ... });\n  await tx.audit.create({ ... });\n}, { maxWait: 2000, timeout: 5000 });"
        },
        {
          "lvl": "lvl3",
          "q": "Deadlock Detection গ্রাফ এবং কনকারেন্ট ট্রানজ্যাকশনে ডেডলক সম্পূর্ণ প্রতিরোধ করার নিয়মাবলি কী কী?",
          "m": "ডেডলক প্রতিরোধের গোল্ডেন রুলস: (১) `Strict Lock Ordering`: সিস্টেমের সব জায়গায় সবসময় একই ক্রমানুসারে রো বা টেবিল লক করতে হবে। যেমন দুটি অ্যাকাউন্ট A এবং B-এর মধ্যে টাকা ট্রান্সফার করার সময় সবসময় ছোট আইডি আগে এবং বড় আইডি পরে লক করতে হবে (`ORDER BY id ASC`)। তাহলে ট্রানজ্যাকশন A এবং B কখনোই বিপরীতমুখী লকে আটকাতে পারবে না। (২) ট্রানজ্যাকশন যত সম্ভব ছোট ও সংক্ষিপ্ত রাখতে হবে। (৩) ট্রানজ্যাকশনের ভেতরে দীর্ঘ সময়ের জন্য কোনো থার্ড পার্টি এপিআই কল বা ফাইল আই/ও করা সম্পূর্ণ নিষিদ্ধ। (৪) অ্যাপ্লিকেশনে ৩ বার অটোমেটেড এক্সপোনেনশিয়াল ব্যাকঅফ রিট্রাই মেকানিজম রাখা।",
          "b": "ডেডলক রোধের মূল উপায় হলো সবসময় একই ক্রমানুসারে আইডি সর্ট করে লক করা, ট্রানজ্যাকশন অতি সংক্ষিপ্ত রাখা, ট্রানজ্যাকশনের ভেতরে এপিআই কল নিষিদ্ধ করা এবং কোডে রিট্রাই মেকানিজম যুক্ত করা।",
          "e": "To prevent deadlocks: (1) Enforce strict universal locking order (e.g. always sort resource IDs in ascending sequence before locking), (2) Keep transactions hyper-short, (3) Never perform third-party HTTP/network I/O inside transactional locks, and (4) Wrap transactional mutations in exponential backoff retries.",
          "code": "// Always lock in ascending order:\nconst [firstId, secondId] = [fromId, toId].sort();\nawait tx.$queryRaw`SELECT * FROM accounts WHERE id IN (${firstId}, ${secondId}) FOR UPDATE;`;"
        },
        {
          "lvl": "lvl3",
          "q": "MongoDB Multi-Document ACID Transactions কীভাবে কাজ করে এবং রিলেশনাল ডেটাবেজের ট্রানজ্যাকশনের সাথে এর তুলনা কী?",
          "m": "MongoDB v4.0+ থেকে রেপ্লিকা সেট এবং শার্ডেড ক্লাস্টারে মাল্টি-ডকুমেন্ট ট্রানজ্যাকশন সাপোর্ট করে। এটি `session.startTransaction()` দিয়ে শুরু হয় এবং `session.commitTransaction()` দিয়ে শেষ হয়। তবে মনে রাখতে হবে: মঙ্গোডিবির সিঙ্গেল ডকুমেন্টে যেকোনো আপডেট এমনিতেই শতভাগ অ্যাটমিক! মাল্টি-ডকুমেন্ট ট্রানজ্যাকশন মঙ্গোডিবির রাইট পারফরম্যান্সে উল্লেখযোগ্য ওভারহেড তৈরি করে এবং ডিফল্ট টাইমআউট মাত্র ৬০ সেকেন্ড। তাই NoSQL-এ স্কিমা এমনভাবে ডিজাইন করা উচিত যেন ৯৫% ক্ষেত্রে ট্রানজ্যাকশন ছাড়াই এমবেডেড ডকুমেন্টে অ্যাটমিকালি কাজ করা যায়।",
          "b": "মঙ্গোডিবি রেপ্লিকা সেটে সেশন ব্যবহার করে মাল্টি-ডকুমেন্ট ট্রানজ্যাকশন পরিচালনা করে। তবে এর কার্যকারিতা ভারী হওয়ায় স্কিমা এমনভাবে ডিজাইন করা উচিত যেন বেশিরভাগ কাজ সিঙ্গেল ডকুমেন্টের অ্যাটমিক আপডেটে শেষ হয়।",
          "e": "MongoDB supports multi-document ACID transactions across replica sets via ClientSession API. While providing strict serializability semantics, they incur heavier coordinator overhead than relational engines; idiomatic NoSQL schema design aims to leverage single-document atomic updates where possible.",
          "code": "const session = await mongoose.startSession();\nsession.startTransaction();\ntry {\n  await Order.create([{ ... }], { session });\n  await Stock.updateOne({ ... }, { session });\n  await session.commitTransaction();\n} catch (err) {\n  await session.abortTransaction();\n} finally {\n  session.endSession();\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Two-Phase Commit (2PC) বনাম Saga Distributed Transaction Pattern-এর মধ্যে পার্থক্য কী?",
          "m": "মাইক্রোসার্ভিসে যখন একাধিক ভিন্ন ভিন্ন ডেটাবেজ থাকে, তখন সিঙ্গেল লোকাল ট্রানজ্যাকশন কাজ করে না। (১) `Two-Phase Commit (2PC)`: একটি সেন্ট্রাল কোঅর্ডিনেটর থাকে যা প্রথমে সব নোডকে 'Prepare' পাঠায় এবং সবাই রাজি হলে 'Commit' পাঠায়। কিন্তু কোনো একটি নোড স্লো হলে পুরো সিস্টেমের সব ডেটাবেজ লক হয়ে ব্লকিং ঘটে (Single Point of Failure)। (২) `Saga Pattern` (আধুনিক মাইক্রোসার্ভিস স্ট্যান্ডার্ড): প্রতিটি সার্ভিস তার লোকাল ডেটাবেজে ট্রানজ্যাকশন শেষ করে ইভেন্ট পাবলিশ করে। যদি পরের কোনো ধাপে ব্যর্থতা আসে, তবে পূর্ববর্তী ধাপগুলোর জন্য 'Compensating Transactions' (যেমন ব্যালেন্স রিফান্ড) চালিয়ে পুরো সিস্টেমকে ইভেনচুয়াল কনসিস্টেন্সিতে নিয়ে আসে।",
          "b": "টু-ফেজ কমিট সব ডেটাবেজে লক ফেলে কাজ করে যা পুরো সিস্টেম স্লো করে। আধুনিক সাগা প্যাটার্ন প্রতিটি সার্ভিসে লোকাল ট্রানজ্যাকশন চালায় এবং ব্যর্থ হলে ক্ষতিপূরণমূলক (Compensating) ট্রানজ্যাকশন দিয়ে ডেটা রিভার্স করে।",
          "e": "Two-Phase Commit (2PC) coordinates distributed transactions via prepare/commit phases with blocking locks, risking system-wide stalls. The Saga Pattern executes a series of asynchronous local transactions across services; upon failure, it triggers compensating transactions to gracefully roll back state.",
          "tip": "মাইক্রোসার্ভিস ডিজাইনে 'Saga pattern with compensating transactions' বলা আর্কিটেকচারাল ম্যাচুরিটির প্রমাণ।"
        },
        {
          "lvl": "lvl3",
          "q": "Write Skew Anomaly কী এবং Serializable Isolation Level ছাড়া এটি কীভাবে ডাটাবেজ ইনভ্যারিয়েন্ট নষ্ট করে?",
          "m": "Write Skew ঘটে যখন দুটি সমান্তরাল ট্রানজ্যাকশন দুটি ভিন্ন রোর ওপর কাজ করে কিন্তু তাদের সিদ্ধান্ত একটি যৌথ বিজনেস রুলের ওপর নির্ভর করে। উদাহরণ: হাসপাতালে রুল আছে 'কমপক্ষে ১ জন ডাক্তার অন-কল থাকতে হবে'। ডাটাবেজে ডাক্তার রফিক ও করিম অন-কল আছেন। রফিক ছুটিতে যাওয়ার রিকোয়েস্ট পাঠাল; ট্রানজ্যাকশন চেক করল মোট ডাক্তার ২ জন, তাই সে রফিকের স্ট্যাটাস OFF করল। একই সেকেন্ডে করিম ছুটিতে যাওয়ার রিকোয়েস্ট পাঠাল; সেও দেখল মোট ডাক্তার ২ জন এবং নিজের স্ট্যাটাস OFF করল! ফলাফল: হাসপাতালে ০ জন ডাক্তার অবশিষ্ট রইল! এটি Repeatable Read স্তরেও ঘটে; এটি ঠেকাতে `SERIALIZABLE` স্তর অথবা явный টেবিল-লেভেল লক প্রয়োজন।",
          "b": "রাইট স্কিউ ঘটে যখন দুটি ট্রানজ্যাকশন ভিন্ন রো এডিট করে কিন্তু একটি যৌথ শর্ত ভঙ্গ করে ফেলে। এটি সাধারণ আইসোলেশনে ধরা পড়ে না; এটি প্রতিরোধে সিরিয়ালাইজেবল আইসোলেশন লেভেল বাধ্যতামূলক।",
          "e": "Write Skew occurs under Repeatable Read when concurrent transactions read overlapping data states and concurrently modify disjoint sets of rows that mutually invalidate a joint business invariant. Resolving Write Skew demands Serializable isolation or explicit locking predicates.",
          "tip": "অন-কল ডাক্তারের উদাহরণ দিয়ে রাইট স্কিউ ব্যাখ্যা করলে ইন্টারভিউয়ার মুগ্ধ হবেন।"
        },
        {
          "lvl": "lvl3",
          "q": "Prisma বা PostgreSQL-এ Transaction Retry Wrapper কীভাবে ইমপ্লিমেন্ট করবে যা Serialization Failure (40001) ও Deadlock (40P01) স্বয়ংক্রিয়ভাবে হ্যান্ডেল করে?",
          "m": "PostgreSQL যখন কোনো ট্রানজ্যাকশন ডেডলক (`40P01`) বা সিরিয়ালাইজেশন কনফ্লিক্ট (`40001`)-এর কারণে রোলব্যাক করে, তখন এটি অ্যাপ্লিকেশনকে বলে কুয়েরিটি পুনরায় চেষ্টা করতে। আমরা একটি রিকল/রিট্রাই ফাংশন লিখি যা এক্সপোনেনশিয়াল ব্যাকঅফ এবং র‍্যান্ডম জিটার (Jitter) সহ সর্বোচ্চ ৩ বার ট্রানজ্যাকশনটি রি-রান করে। যদি ৩ বারেও ব্যর্থ হয় তবেই ফাইনাল এরর ছুড়ে দেয়। এতে সাময়িক ট্রানজ্যাকশন কনফ্লিক্টে কোনো এপিআই রিকোয়েস্ট ফেইল করে না এবং ৯৯.৯% ট্রানজ্যাকশন সাইলেন্টলি সফল হয়।",
          "b": "পোস্টগ্রেস ৪০০০১ বা ৪০P০১ এরর দিলে ট্রানজ্যাকশনটি রিট্রাই করতে হয়। এক্সপোনেনশিয়াল ব্যাকঅফ সহ ৩ বার স্বয়ংক্রিয় রিট্রাই মেকানিজম বানালে কোনো ব্যবহারকারী ফেইলিয়র এরর দেখে না।",
          "e": "PostgreSQL serialization failures (40001) and deadlocks (40P01) expect client retry. Implement an exponential backoff wrapper with randomized jitter that catches these specific PostgreSQL error codes and retries the transaction up to 3 times before surfacing an error.",
          "code": "async function withTxRetry(fn, maxRetries = 3) {\n  for (let attempt = 1; attempt <= maxRetries; attempt++) {\n    try { return await fn(); }\n    catch (err: any) {\n      if (['40001', '40P01'].includes(err.code) && attempt < maxRetries) {\n        await new Promise(r => setTimeout(r, Math.random() * 100 * attempt));\n        continue;\n      }\n      throw err;\n    }\n  }\n}"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ইনভেন্টরি স্টক মাত্র ১টি বাকি আছে। একই মিলিসেকেন্ডে দুজন গ্রাহক ওই প্রোডাক্ট কিনতে 'Order' বাটনে চাপ দিল। ট্রানজ্যাকশন লক ছাড়া কোড লিখলে কী হবে এবং কীভাবে সমাধান করবে?",
          "m": "লক ছাড়া কোড লিখলে (Race Condition): উভয় রিকোয়েস্ট প্যারালালে স্টক চেক করে দেখবে `stock = 1`। ফলে উভয় রিকোয়েস্টই ভাববে স্টক আছে এবং স্টক ১ কমিয়ে দেবে। ফলে স্টক হয়ে যাবে `-1` (ওভারসোল্ড)! গ্রাহক দুজনকেই সফল অর্ডার ইমেইল পাঠানো হবে কিন্তু প্রোডাক্ট আছে মাত্র একটি। সমাধান: ট্রানজ্যাকশনের মধ্যে `SELECT stock FROM products WHERE id = $1 FOR UPDATE` দিতে হবে। এতে প্রথম কাস্টমারের ট্রানজ্যাকশন রোটি লক করে স্টক ১ থেকে ০ করে কমিট না করা পর্যন্ত ২য় কাস্টমার ওই রো রিড করতে পারবে না। ২য় কাস্টমার যখন রিড করবে, সে দেখবে স্টক ০ এবং তাকে 'Out of Stock' এরর দেখাবে।",
          "b": "লক না থাকলে দুইজনই স্টক ১ দেখে অর্ডার করে ফেলবে এবং স্টক মাইনাস ১ হয়ে যাবে। SELECT FOR UPDATE দিয়ে প্রথম গ্রাহকের অর্ডার শেষ না হওয়া পর্যন্ত রোটি লক রাখলে এই রেস কন্ডিশন পুরোপুরি দূর হবে।",
          "e": "Without locks, a race condition causes both requests to read stock = 1 simultaneously, decrementing stock to -1 and overbooking the item. Guarding with SELECT FOR UPDATE serializes access: the second purchaser waits until the first commits, reading stock = 0 and receiving an out-of-stock notification.",
          "code": "await prisma.$transaction(async (tx) => {\n  const [product] = await tx.$queryRaw`\n    SELECT stock FROM products WHERE id = ${pId} FOR UPDATE\n  `;\n  if (product.stock < qty) throw new Error('Out of stock');\n  await tx.$executeRaw`\n    UPDATE products SET stock = stock - ${qty} WHERE id = ${pId}\n  `;\n});"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: বিকাশ বা স্ট্রাইপ পেমেন্ট গেটওয়ের চার্জিং এপিআই কল করার কোড ট্রানজ্যাকশন ব্লকের ভেতরে রাখা হয়েছে। কেন এটি মারাত্মক আর্কিটেকচারাল ভুল এবং কীভাবে রিফ্যাক্টর করবে?",
          "m": "মারাত্মক ভুল কারণ: থার্ড পার্টি পেমেন্ট গেটওয়ে রেসপন্স করতে ২ থেকে ১০ সেকেন্ড পর্যন্ত সময় নিতে পারে (এমনকি নেটওয়ার্ক টাইমআউট হতে পারে)। ট্রানজ্যাকশন ব্লকের ভেতর এই এক্সটারনাল কল রাখলে ডেটাবেজের রো-গুলো এবং কানেকশন পুলের কানেকশনটি পুরো ১০ সেকেন্ড ধরে লক হয়ে থাকবে! হাই ট্রাফিকে মুহূর্তের মধ্যে পুরো ডেটাবেজের কানেকশন পুল শেষ হয়ে সার্ভার ক্র্যাশ করবে। রিফ্যাক্টরিং: পেমেন্ট এপিআই কল ট্রানজ্যাকশনের সম্পূর্ণ বাইরে করতে হবে। পেমেন্ট সফল হওয়ার পর মাত্র ২ মিলিসেকেন্ডের একটি সুপার-ফাস্ট ডেটাবেজ ট্রানজ্যাকশনে অর্ডার ও লেজার আপডেট করতে হবে।",
          "b": "ট্রানজ্যাকশনের ভেতর পেমেন্ট এপিআই কল রাখলে ডাটাবেজ কানেকশন ও রো লক হয়ে আটকে থাকে এবং পুরো সার্ভার ক্র্যাশ করে। পেমেন্ট কল ট্রানজ্যাকশনের বাইরে করে কেবল সফল রেসপন্স পাওয়ার পর ডাটাবেজ ট্রানজ্যাকশন চালাতে হয়।",
          "e": "Placing third-party network calls inside database transactions holds database locks and connection slots captive for seconds during latency spikes, starving connection pools and cascading server crashes. Call payment APIs completely outside the transaction; execute atomic database mutations strictly after receiving a verified gateway response.",
          "tip": "কখনোই `axios.post` বা কোনো এক্সটারনাল নেটওয়ার্ক কল ডেটাবেজ ট্রানজ্যাকশনের ভেতরে রাখবে না।"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: প্রোডাকশনে ইউজার ব্যালেন্স ট্রান্সফারের সময় প্রায়ই ডেডলক এরর (`deadlock detected`) আসছে। তুমি লগ বিশ্লেষণ করে দেখলে ট্রানজ্যাকশন ১ ইউজার A থেকে B-তে টাকা পাঠাচ্ছে এবং ট্রানজ্যাকশন ২ একই সময়ে B থেকে A-তে টাকা পাঠাচ্ছে। কীভাবে ফিক্স করবে?",
          "m": "সমস্যার কারণ: ট্রানজ্যাকশন ১ আগে A লক করে তারপর B-র জন্য অপেক্ষা করছে। আর ট্রানজ্যাকশন ২ আগে B লক করে তারপর A-র জন্য অপেক্ষা করছে—যার ফলে ক্লাসিক সার্কুলার ডেডলক তৈরি হয়েছে। সমাধান: অর্ডারিং লক প্রয়োগ করা! টাকা যেদিক থেকেই যাক না কেন, আমরা সবসময় ছোট ইউজার আইডি আগে লক করব এবং বড় ইউজার আইডি পরে লক করব (`const [firstId, secondId] = [userA, userB].sort()`)। এতে উভয় ট্রানজ্যাকশনই প্রথমে একই আইডিকে লক করার চেষ্টা করবে; একজন লক পেয়ে কাজ শেষ করবে, অন্যজন কিউতে থাকবে। কোনো সার্কুলার অপেক্ষা থাকবে না এবং ডেডলক চিরতরে নির্মূল হবে!",
          "b": "উভয় ট্রানজ্যাকশন বিপরীত ক্রমে রো লক করায় ডেডলক হচ্ছে। আইডি সর্ট করে সর্বদা ছোট আইডি আগে এবং বড় আইডি পরে লক করলে ডেডলক ১০০% নির্মূল হয়ে যায়।",
          "e": "The deadlock stems from asymmetric lock acquisition orders (Tx 1 locks A then B; Tx 2 locks B then A). Resolve by enforcing symmetric resource ordering: sort the two account IDs lexicographically and lock the lowest ID first, breaking the circular wait condition permanently.",
          "code": "const [firstId, secondId] = [fromId, toId].sort();\nawait tx.$queryRaw`SELECT * FROM accounts WHERE id = ${firstId} FOR UPDATE;`;\nawait tx.$queryRaw`SELECT * FROM accounts WHERE id = ${secondId} FOR UPDATE;`;"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি বাল্ক ইনভয়েস জেনারেশন প্রসেস চালানোর সময় ট্রানজ্যাকশনটি ১৫ সেকেন্ড চলার পর `Statement timeout` দিয়ে ফেইল করল। কীভাবে এটি সমাধান করবে?",
          "m": "সমাধান: (১) হাজার হাজার ইনভয়েস একটি একক দানবীয় ট্রানজ্যাকশনে চালানো আর্কিটেকচারাল ভুল—কারণ এতে হিউজ পরিমাণ রো লক থাকে এবং মেমোরি জমে যায়। (২) ব্যাচিং (Chunking) করতে হবে: ৫০ বা ১০০টি করে ইনভয়েসের ছোট ছোট ব্যাচ তৈরি করে পৃথক পৃথক সাব-ট্রানজ্যাকশনে প্রসেস করতে হবে। (৩) প্রসেসটিকে নোডের মূল থ্রেড বা এপিআই রিকোয়েস্ট থেকে সরিয়ে BullMQ ব্যাকগ্রাউন্ড ওয়ার্কারে পাঠাতে হবে যাতে এপিআই টাইমআউট না ঘটে।",
          "b": "একক দানবীয় ট্রানজ্যাকশনে বাল্ক ডেটা প্রসেস করা উচিত নয়। ১০০টি করে ছোট ছোট ব্যাচে ভাগ করে পৃথক ট্রানজ্যাকশনে এবং ব্যাকগ্রাউন্ড কিউতে প্রসেস করলে টাইমআউট এড়ানো যায়।",
          "e": "Running massive bulk mutations within a monolithic transaction exhausts locks and hits statement timeouts. Chunk the batch into smaller atomic sub-transactions (e.g. 100 rows per batch) and offload the process to an asynchronous BullMQ background worker.",
          "code": "for (const chunk of lodash.chunk(invoices, 100)) {\n  await prisma.$transaction(async (tx) => {\n    await tx.invoice.createMany({ data: chunk });\n  });\n}"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি ট্রানজ্যাকশনের মধ্যে একাধিক রো ইনসার্ট করার পর অডিট লগ ইনসার্ট করার সময় এরর খেল। কিন্তু তুমি দেখলে মূল রোগুলো রোলব্যাক হয়েছে ঠিকই, কিন্তু অডিট লগও হারিয়ে গেছে! অথচ তুমি ফেইল্ড ট্রানজ্যাকশনের লগটি রাখতে চাও। কীভাবে করবে?",
          "m": "কারণ: অডিট লগটি একই ট্রানজ্যাকশনের ভেতরে থাকায় পুরো ট্রানজ্যাকশন রোলব্যাক হয়ে অডিট লগও মুছে গেছে। সমাধান: অডিট লগ কখনোই মূল ট্রানজ্যাকশন ব্লকের ভেতরে রাখা যাবে না! অডিট লগকে ট্রানজ্যাকশনের `catch` ব্লকের বাইরে একটি সম্পূর্ণ স্বাধীন ডেটাবেজ কলে অথবা একটি অ্যাসিনক্রোনাস মেসেজ কিউতে (RabbitMQ / Redis) পাঠাতে হবে। এমনকি ট্রানজ্যাকশন ফেইল করলেও ক্যাচ ব্লকের স্বাধীন কানেকশনটি নির্বিঘ্নে ডেটাবেজে এরর অডিট রেকর্ড করে রাখবে।",
          "b": "অডিট লগ মূল ট্রানজ্যাকশনের ভেতরে থাকায় রোলব্যাকে মুছে যাচ্ছে। ট্রানজ্যাকশনের বাইরে ক্যাচ ব্লকে স্বাধীন কানেকশন দিয়ে অডিট লগ লিখলে ট্রানজ্যাকশন ব্যর্থ হলেও লগ সংরক্ষিত থাকে।",
          "e": "Because the audit write shared the aborting transaction context, the ROLLBACK wiped the audit row. Decouple audit recording by executing it in the catch block via an independent database connection or pushing it asynchronously to a persistent message queue.",
          "code": "try {\n  await executeTransaction();\n} catch (err) {\n  // Independent connection write outside rollback context\n  await independentAuditClient.logFailure({ error: err.message });\n  throw err;\n}"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): ক্যাশিয়ার যখন একটি ৫০,০০০ টাকার সেলস ইনভয়েস সাবমিট করে, তখন Dokani-তে কীভাবে মাল্টি-টেবিল ACID ট্রানজ্যাকশন সম্পন্ন হয়?",
          "m": "দোকানি পিওএসে একটি ইনভয়েস সাবমিট হলে একটি কঠোর ACID ট্রানজ্যাকশন কার্যকর হয়: (১) `Invoices` টেবিলে মূল ইনভয়েস রো তৈরি হয়, (২) `InvoiceItems` টেবিলে আইটেমগুলো ইনসার্ট হয়, (৩) প্রতিটি প্রোডাক্টের স্টক অ্যাটমিকালি বিয়োগ করা হয় এবং স্টক হিস্ট্রি লগ হয়, (৪) যদি কাস্টমার বাকি (Credit) রাখে, তবে `Customers` টেবিলে তার ডিউ ব্যালেন্স আপডেট হয়, (৫) ডাবল-এন্ট্রি বুককিপিংয়ের জন্য `FinancialLedgers` টেবিলে ডেবিট ও ক্রেডিট এন্ট্রি পড়ে। যদি এই ৫টি স্টেপের যেকোনো একটিতে ডেটাবেজ এরর দেয় বা সার্ভার ডিসকানেক্ট হয়, তবে পুরো ট্রানজ্যাকশন ইনস্ট্যান্টলি রোলব্যাক হয়—এক পয়সারও কোনো অসঙ্গতি তৈরি হয় না!",
          "b": "দোকানিতে ইনভয়েস তৈরির সময় ইনভয়েস, আইটেম, স্টক বিয়োগ, কাস্টমার বাকি এবং ফিনান্সিয়াল লেজার—এই পাঁচটি টেবিল একটি একক ACID ট্রানজ্যাকশনে আপডেট হয়। কোনো একটি ব্যর্থ হলে পুরো প্রক্রিয়া স্বয়ংক্রিয়ভাবে বাতিল হয়।",
          "e": "In Dokani POS, finalizing a checkout runs a strict 5-table ACID transaction: persisting the invoice, inserting invoice line items, atomically decrementing inventory stocks, updating customer receivable ledgers, and recording double-entry journal entries. A failure at any step triggers an instantaneous rollback.",
          "tip": "দোকানির এই ৫-টেবিল ট্রানজ্যাকশনের উদাহরণ ইন্টারভিউয়ারকে তোমার গভীর আর্কিটেকচারাল দক্ষতা প্রমাণ করবে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: ব্যাংকিং বা ফিনটেক সিস্টেমে ডাবল-এন্ট্রি লেজার সিস্টেমে ডেবিট এবং ক্রেডিট ব্যালেন্সিং কীভাবে ট্রানজ্যাকশন কনস্ট্রেইন্ট দিয়ে সুরক্ষিত রাখবে?",
          "m": "ডাবল-এন্ট্রি বুককিপিংয়ের গোল্ডেন রুল হলো: প্রতিটি ট্রানজ্যাকশনের মোট ডেবিট এবং মোট ক্রেডিট অবশ্যই সমান হতে হবে (`SUM(debit) = SUM(credit)`)। আমরা ডেটাবেজ ট্রানজ্যাকশনের ভেতরে সব জার্নাল এন্ট্রি ইনসার্ট করার পর একটি ভ্যালিডেশন চালাই। পোস্টগ্রেসে এটি ডেফার্ড কনস্ট্রেইন্ট ট্রিগার (`CONSTRAINT ... DEFERRABLE INITIALLY DEFERRED`) দিয়ে এনফোর্স করা যায়—যা ট্রানজ্যাকশন চলাকালীন চেক না করে ঠিক `COMMIT` করার মুহূর্তে যোগফল চেক করে। যদি মোট ডেবিট ও ক্রেডিট সমান না হয়, তবে ডেটাবেজ স্বয়ংক্রিয়ভাবে ট্রানজ্যাকশন রিজেক্ট করে রোলব্যাক করে দেয়।",
          "b": "ডাবল-এন্ট্রি লেজারে মোট ডেবিট ও ক্রেডিট সমান থাকা বাধ্যতামূলক। পোস্টগ্রেসের ডেফার্ড কনস্ট্রেইন্ট ব্যবহার করে নিশ্চিত করা হয় যে কমিটের মুহূর্তে মোট ডেবিট ও ক্রেডিট মিলে গেছে, অন্যথায় ডেটাবেজ ট্রানজ্যাকশন বাতিল করে।",
          "e": "In financial ledgers, double-entry accounting enforces SUM(debits) === SUM(credits). Enforce this via database DEFERRABLE INITIALLY DEFERRED constraints evaluated at COMMIT time, guaranteeing that imbalanced transactions cannot be committed under any circumstance.",
          "code": "CREATE CONSTRAINT TRIGGER check_ledger_balance\nAFTER INSERT OR UPDATE ON journal_entries\nDEFERRABLE INITIALLY DEFERRED\nFOR EACH ROW EXECUTE FUNCTION verify_ledger_zero_sum();"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: হাই-কনকারেন্সি টিকিট বুকিং বা ফ্ল্যাশ সেল সিস্টেমে 'Phantom Inventory' রোধ করতে কীভাবে ডাটাবেজ লক ডিজাইন করবে?",
          "m": "ফ্ল্যাশ সেলে হাজার হাজার ইউজার একই সেকেন্ডে সীমিত সংখ্যক আইটেম কেনার চেষ্টা করে। আর্কিটেকচার: (১) মূল প্রোডাক্ট টেবিলে দীর্ঘ লক না দিয়ে Redis Atomic Decrement (`DECRBY`) দিয়ে মেমোরি লেভেলে টিকিট বা স্টক ব্লক করি। (২) যার জন্য রেডিস স্টক বরাদ্দ হয়, তাকে ১০ মিনিটের একটি এক্সপায়ারি টিকিট দেওয়া হয়। (৩) পেমেন্ট সম্পন্ন হলে ব্যাকগ্রাউন্ড ওয়ার্কার ডেটাবেজে `SELECT ... FOR UPDATE` দিয়ে প্রকৃত স্টক ফাইনাল ডিডাক্ট করে ট্রানজ্যাকশন কমিট করে। (৪) যদি পেমেন্ট ১০ মিনিটে না আসে, রেডিস কি এক্সপায়ার হয়ে স্টক স্বয়ংক্রিয়ভাবে মূল পুলে ফেরত যায়।",
          "b": "ফ্ল্যাশ সেলে ডেটাবেজে অতিরিক্ত চাপ না দিয়ে রেডিসের অ্যাটমিক ডিক্রিমেন্ট দিয়ে স্টক রিজার্ভ করা হয় এবং পেমেন্ট শেষে ডেটাবেজে ট্রানজ্যাকশন লক দিয়ে চূড়ান্ত আপডেট সম্পন্ন করা হয়।",
          "e": "Mitigate flash-sale inventory contention by buffering demand via Redis atomic decrements (DECRBY) with expiring reservations. Once payment succeeds, execute short-lived SELECT FOR UPDATE transactions in the database to finalize the physical inventory deduction.",
          "tip": "ইন্টারভিউতে 'Redis atomic decrement buffering combined with transactional DB finalization' উল্লেখ করবে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: দীর্ঘমেয়াদি ডিস্ট্রিবিউটেড ট্রানজ্যাকশনে (যেমন পেমেন্ট + ইনভেন্টরি + কুরিয়ার বুকিং) সাগা প্যাটার্ন কীভাবে ফেইলিয়র রিকভারি করে?",
          "m": "ধরি একটি অর্ডারে ৩টি ধাপ: (১) কাস্টমারের কার্ড থেকে টাকা কাটা হলো (সফল), (২) ইনভেন্টরি থেকে স্টক ডিডাক্ট করা হলো (সফল), (৩) কুরিয়ার এপিআইতে পার্সেল বুকিং করতে গিয়ে কুরিয়ার ডাউন থাকায় এরর এলো! যেহেতু লোকাল রোলব্যাক এখানে কাস্টমারের কার্ডে টাকা ফেরত দিতে পারবে না, সাগা অর্কেস্ট্রেটর তখন রিভার্স 'Compensating Actions' শুরু করে: সে অটোমেটিক ইনভেন্টরিতে স্টক রি-স্টোর করে এবং পেমেন্ট গেটওয়েতে রিফান্ড এপিআই কল করে কাস্টমারের কার্ডে টাকা ফেরত পাঠায়। এরপর অর্ডার স্ট্যাটাস `FAILED_REFUNDED` সেট করে লগ সংরক্ষণ করে।",
          "b": "সাগা প্যাটার্নে শেষ ধাপে কুরিয়ার বুকিং ফেইল করলে অর্কেস্ট্রেটর রিভার্স ক্ষতিপূরণমূলক কাজ চালায়—স্টক আবার পুলে ফেরত দেয় এবং পেমেন্ট রিফান্ড করে সিস্টেমকে সুরক্ষিত রাখে।",
          "e": "In distributed Saga workflows, if the final logistics dispatch fails after successful payment and stock allocation, the Saga orchestrator triggers compensating actions: releasing the reserved inventory and issuing an automated gateway refund to restore system harmony.",
          "tip": "সাগা প্যাটার্নে 'Compensating transactions replace rollback across microservices' স্পষ্ট করে বলবে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: প্রোডাকশন ডেটাবেজে লং-রানিং আনকমিটেড ট্রানজ্যাকশন (`idle in transaction`) কীভাবে সার্ভারের জীবন বিপন্ন করে এবং কীভাবে তা কিল করবে?",
          "m": "`idle in transaction` ঘটে যখন কোনো অ্যাপ্লিকেশন `BEGIN` করার পর কুয়েরি চালিয়েছে, কিন্তু কোনো কারণে `COMMIT` বা `ROLLBACK` না করে কানেকশনটি ঝুলিয়ে রেখেছে। বিপদ: এটি পোস্টগ্রেসের ভ্যাকুয়ামিং প্রসেসকে সম্পূর্ণ ব্লক করে দেয়, ডেড টুপল ক্লিন হতে দেয় না, ইনডেক্স ও টেবিল ব্লোট তৈরি করে এবং ট্রানজ্যাকশন আইডি র‍্যাপঅ্যারাউন্ডের (XID wraparound) ঝুঁকি তৈরি করে পুরো ডাটাবেজ ক্র্যাশ করাতে পারে! সমাধান: `postgresql.conf`-এ `idle_in_transaction_session_timeout = '10s'` কনফিগার করতে হবে যাতে ১০ সেকেন্ড অলস থাকলে ডেটাবেজ স্বয়ংক্রিয়ভাবে কানেকশনটি টার্মিনেট করে রোলব্যাক করে দেয়।",
          "b": "idle in transaction কানেকশন অলস ফেলে রেখে ভ্যাকুয়াম ব্লক করে এবং ডেটাবেজে ব্লোট তৈরি করে ক্র্যাশ ঘটায়। postgresql.conf-এ idle_in_transaction_session_timeout সেট করে অলস ট্রানজ্যাকশনগুলো স্বয়ংক্রিয়ভাবে কিল করা হয়।",
          "e": "An 'idle in transaction' connection holds open lock snapshots and prevents vacuuming dead tuples, causing severe table bloat and catastrophic XID wraparound failure. Protect the database by setting idle_in_transaction_session_timeout = '10s' to auto-terminate orphaned sessions.",
          "code": "-- Kill orphaned idle transactions:\nSELECT pg_terminate_backend(pid) \nFROM pg_stat_activity \nWHERE state = 'idle in transaction' \n  AND state_change < current_timestamp - INTERVAL '5 minutes';"
        }
      ]
    },
    {
      "id": "aggregation-analytics",
      "name": "Aggregation Queries & Data Analytics",
      "desc": "MongoDB Aggregation Pipeline ($match, $group, $lookup, $unwind, $facet), SQL Window Functions, CTEs, Reporting Optimization",
      "items": [
        {
          "lvl": "lvl1",
          "q": "MongoDB Aggregation Pipeline কী এবং এটি সাধারণ `find()` কুয়েরির চেয়ে কীভাবে শক্তিশালী?",
          "m": "Aggregation Pipeline হলো ডেটা প্রসেসিংয়ের একটি বহু-ধাপ বিশিষ্ট আর্কিটেকচার (Unix পাইপের মতো `cmd1 | cmd2 | cmd3`)। সাধারণ `find()` শুধু ডকুমেন্ট ফিল্টার ও প্রোজেকশন করতে পারে, কিন্তু অ্যাগ্রিগেশন পাইপলাইনে ডেটা এক স্টেজ থেকে অন্য স্টেজে ফিল্টার (`$match`), গ্রুপ ও যোগফল (`$group`), অন্য কালেকশনের সাথে জয়েন (`$lookup`), অ্যারে ফ্ল্যাট করা (`$unwind`), এবং জটিল অ্যানালিটিক্যাল হিসেব সম্পাদন করতে পারে। এটি ডেটাবেজ লেভেলেই শতভাগ অ্যানালিটিক্যাল হিসাব শেষ করে রেডিমেড রিপোর্ট রিটার্ন করে।",
          "b": "অ্যাগ্রিগেশন পাইপলাইন হলো ডেটা রূপান্তর ও বিশ্লেষণের ধারাবাহিক ধাপের সমষ্টি। এটি শুধু ফিল্টার নয়, বরং গ্রুপিং, যোগফল, অন্য টেবিলের সাথে জয়েন এবং অ্যারে ভেঙে জটিল রিপোর্ট তৈরি করার ক্ষমতা রাখে।",
          "e": "The MongoDB Aggregation Pipeline is a multi-stage data processing framework modeling sequential transformations. While find() simply queries and projects documents, the pipeline transforms, groups ($group), joins ($lookup), reshapes, and analyzes multi-dimensional datasets within the database engine.",
          "tip": "বলো: 'Aggregation Pipeline processes documents through sequential stages, computing analytics natively in the engine.'"
        },
        {
          "lvl": "lvl1",
          "q": "MongoDB-তে `$match`, `$group`, এবং `$project` স্টেজগুলোর ভূমিকা কী?",
          "m": "(১) `$match`: নির্দিষ্ট শর্তের ভিত্তিতে ডকুমেন্ট ফিল্টার করে (SQL-এর `WHERE` ক্লজের সমতুল্য)। পাইপলাইনের পারফরম্যান্স বাড়াতে সবার শুরুতে `$match` দেওয়া আবশ্যক যাতে ইনডেক্স ব্যবহার করা যায়। (২) `$group`: নির্দিষ্ট ফিল্ডের ভিত্তিতে ডকুমেন্টগুলোকে গ্রুপ করে এবং অ্যাগ্রিগেট মান (যেমন `$sum`, `$avg`, `$min`, `$max`) ক্যালকুলেট করে (SQL-এর `GROUP BY`-এর সমতুল্য)। (৩) `$project`: রেজাল্টের শেপ বা স্ট্রাকচার পরিবর্তন করে—কোন ফিল্ডগুলো আউটপুটে থাকবে, কোনটি বাদ যাবে বা নতুন গণনাকৃত ফিল্ড তৈরি করবে (SQL-এর `SELECT` ক্লজের সমতুল্য)।",
          "b": "$match ডকুমেন্ট ফিল্টার করে, $group নির্দিষ্ট ক্যাটাগরিতে ডেটা গ্রুপ করে যোগফল বা গড় নির্ণয় করে, এবং $project ফলাফলে কোন ফিল্ডগুলো প্রদর্শিত হবে তা নির্ধারণ করে।",
          "e": "$match filters documents (analogous to SQL WHERE). $group aggregates documents by a specified identifier, applying accumulators like $sum or $avg (SQL GROUP BY). $project reshapes document fields and injects calculated expressions (SQL SELECT).",
          "code": "db.orders.aggregate([\n  { $match: { status: 'COMPLETED' } },\n  { $group: { _id: '$storeId', totalSales: { $sum: '$grandTotal' } } },\n  { $project: { storeId: '$_id', totalSales: 1, _id: 0 } }\n]);"
        },
        {
          "lvl": "lvl1",
          "q": "MongoDB-তে `$lookup` কী এবং এটি SQL `LEFT OUTER JOIN`-এর সাথে কীভাবে তুলনীয়?",
          "m": "`$lookup` স্টেজটি মঙ্গোডিবির একই ডেটাবেজের অন্য একটি কালেকশন থেকে সংশ্লিষ্ট ডেটা এনে বর্তমান ডকুমেন্টে একটি নতুন অ্যারে হিসেবে যোগ করে। এটি ঠিক রিলেশনাল ডেটাবেজের `LEFT OUTER JOIN`-এর মতো কাজ করে। এতে চারটি প্যারামিটার থাকে: `from` (টার্গেট কালেকশন), `localField` (বর্তমান ডকুমেন্টের কি), `foreignField` (টার্গেট ডকুমেন্টের কি), এবং `as` (যে নামে আউটপুট অ্যারেটি তৈরি হবে)। ম্যাচিং কোনো ডকুমেন্ট না পাওয়া গেলে আউটপুট অ্যারেটি খালি `[]` থাকে।",
          "b": "$lookup হলো নো-এসকিউএল ডেটাবেজের লেফট জয়েন। এটি অন্য কালেকশন থেকে অবজেক্ট আইডি বা কি ম্যাচ করে রিলেটেড সব রেকর্ড এনে বর্তমান ডকুমেন্টের ভেতর একটি নতুন অ্যারে হিসেবে বসিয়ে দেয়।",
          "e": "$lookup performs an equality match join against another collection, returning matched foreign documents as an array field (identical to SQL LEFT OUTER JOIN). If no matches are found, the target array field is initialized empty [].",
          "code": "{\n  $lookup: {\n    from: 'users',\n    localField: 'userId',\n    foreignField: '_id',\n    as: 'customerDetails'\n  }\n}"
        },
        {
          "lvl": "lvl1",
          "q": "MongoDB-তে `$unwind` অপারেটর কী এবং কেন এটি ব্যবহার করা হয়?",
          "m": "`$unwind` কোনো ডকুমেন্টের ভেতরের একটি অ্যারেকে ভেঙে প্রতিটি আইটেমের জন্য আলাদা আলাদা পৃথক ডকুমেন্ট তৈরি করে (Array Deconstruction)। যেমন: একটি অর্ডারে যদি ৩টি প্রোডাক্টের একটি অ্যারে থাকে, তবে `$unwind: '$items'` চালালে ওই একটি অর্ডার ৩টি পৃথক ডকুমেন্টে পরিণত হবে—যেখানে বাকি সব ফিল্ড একই থাকবে কিন্তু `items` ফিল্ডে একেকটি অবজেক্ট থাকবে। এর মূল ব্যবহার: অর্ডারের ভেতরের নির্দিষ্ট প্রোডাক্টের মোট বিক্রি বা আইটেম-লেভেল অ্যানালিটিক্স গ্রুপিং করার জন্য।",
          "b": "$unwind একটি অ্যারের প্রতিটি উপাদানকে আলাদা করে প্রতিটি উপাদানের জন্য পৃথক পূর্ণাঙ্গ ডকুমেন্ট তৈরি করে। অ্যারের ভেতরের আইটেমগুলোর ওপর গ্রুপিং ও যোগফল হিসেব করতে এটি ব্যবহৃত হয়।",
          "e": "$unwind deconstructs an array field from the input documents to output a document for each element in the array. It is predominantly used prior to $group to calculate granular item-level metrics from nested arrays.",
          "code": "db.orders.aggregate([\n  { $unwind: '$items' },\n  { $group: { _id: '$items.productId', totalQty: { $sum: '$items.qty' } } }\n]);"
        },
        {
          "lvl": "lvl1",
          "q": "SQL-এ Common Table Expression (CTE / `WITH` ক্লজ) কী এবং সাব-কুয়েরির চেয়ে এটি কেন ভালো?",
          "m": "CTE হলো একটি সাময়িক ও নামযুক্ত রেজাল্ট সেট যা একটি একক SQL স্টেটমেন্টের এক্সিকিউশনের সময় ডিফাইন করা হয় (`WITH cte_name AS (...)`)। সাব-কুয়েরির চেয়ে CTE বহুগুণ সেরা কারণ: (১) কোডের রিডেবিলিটি ও মেইনটেইনেবিলিটি নাটকীয়ভাবে বাড়ে (নেস্টেড সাব-কুয়েরির জটিল স্প্যাগেটি কোড দূর হয়), (২) একই CTE-কে মূল কুয়েরিতে একাধিকবার রি-ইউজ করা যায়, এবং (৩) এটি রিকার্সিভ কুয়েরি (Recursive CTEs) সাপোর্ট করে যা দিয়ে হায়ারার্কিকাল বা ট্রি ডেটা (যেমন ক্যাটাগরি প্যারেন্ট-চাইল্ড) এক কুয়েরিতে ট্রাভার্স করা যায়।",
          "b": "সিটিই (WITH ক্লজ) হলো সাময়িক নামযুক্ত ভার্চুয়াল টেবিল যা জটিল সাব-কুয়েরিকে সহজবোধ্য ও পাঠযোগ্য করে তোলে। একই কোড বারবার ব্যবহার করতে এবং হায়ারার্কিকাল ডেটা ফেচ করতে এটি আদর্শ।",
          "e": "A Common Table Expression (CTE) creates a temporary, named result set within an execution scope using the WITH clause. CTEs vastly improve readability over deep nested subqueries, permit modular reuse across joins, and unlock recursive tree traversals.",
          "code": "WITH MonthlySales AS (\n  SELECT tenant_id, SUM(total) AS revenue\n  FROM invoices\n  WHERE created_at >= NOW() - INTERVAL '30 days'\n  GROUP BY tenant_id\n)\nSELECT * FROM MonthlySales WHERE revenue > 100000;"
        },
        {
          "lvl": "lvl2",
          "q": "SQL Window Functions (`OVER (PARTITION BY ... ORDER BY ...)`) কী এবং সাধারণ `GROUP BY`-এর সাথে এর পার্থক্য কী?",
          "m": "সাধারণ `GROUP BY` একাধিক রোকে সংকুচিত (Collapse) করে একটি একক সামারি রোতে পরিণত করে, ফলে স্বতন্ত্র রোর অস্তিত্ব হারিয়ে যায়। কিন্তু `Window Function` টেবিলের প্রতিটি রোর স্বতন্ত্র পরিচয় অক্ষুণ্ণ রেখেই একটি নির্দিষ্ট উইন্ডো বা সেগমেন্টের ওপর ক্যালকুলেশন চালায়! অর্থাৎ টেবিলে যদি ১০০০টি রো থাকে, উইন্ডো ফাংশন চালালেও আউটপুটে ১০০০টি রো-ই থাকবে, তবে প্রতি রো-তে তার বিভাগের র‍্যাংক বা রানিং টোটাল যোগ হবে। সিনট্যাক্স: `FUNCTION() OVER (PARTITION BY category ORDER BY sales DESC)`।",
          "b": "GROUP BY একাধিক রোকে মুছে একটি রোতে নামিয়ে আনে, কিন্তু উইন্ডো ফাংশন প্রতিটি রোর অস্তিত্ব বজায় রেখেই নির্দিষ্ট গ্রুপের ওপর রানিং টোটাল, এভারেজ বা র‍্যাঙ্কিং বের করে দেয়।",
          "e": "Unlike GROUP BY which collapses multiple rows into a single summary record, SQL Window Functions perform calculations across a partition of rows while preserving individual row identities. Every original row remains present with the newly computed analytical attribute.",
          "code": "SELECT employee_id, department, salary,\n       AVG(salary) OVER (PARTITION BY department) AS dept_avg_salary\nFROM employees;"
        },
        {
          "lvl": "lvl2",
          "q": "SQL-এ `ROW_NUMBER()`, `RANK()`, এবং `DENSE_RANK()`-এর মধ্যে সূক্ষ্ম পার্থক্য কী?",
          "m": "ধরি তিনজনের স্কোর সমান (১০০, ১০০, ৯০): (১) `ROW_NUMBER()`: টাই বা সমতাকে পরোয়া করে না; প্রতিটি রো-কে একটি কঠোর ইউনিক সিকুয়েনশিয়াল নম্বর দেয় (১, ২, ৩)। (২) `RANK()`: টাই হলে সমান র‍্যাংক দেয়, কিন্তু পরবর্তী র‍্যাংক স্কিপ করে গ্যাপ তৈরি করে (১, ১, ৩—এখানে ২ স্কিপ হয়েছে)। (৩) `DENSE_RANK()`: টাই হলে সমান র‍্যাংক দেয়, কিন্তু কোনো নম্বর স্কিপ না করে ঘনভাবে এগিয়ে যায় (১, ১, ২—এখানে কোনো গ্যাপ নেই)।",
          "b": "ROW_NUMBER প্রতি রো-কে ভিন্ন নম্বর দেয়। RANK টাই হলে একই নম্বর দেয় তবে পরের নম্বর স্কিপ করে। DENSE_RANK টাই হলে একই নম্বর দেয় এবং কোনো নম্বর স্কিপ না করে ক্রমানুসারে র‍্যাংক নির্ধারণ করে।",
          "e": "ROW_NUMBER() assigns strictly unique sequential integers regardless of ties (1, 2, 3). RANK() assigns identical values to ties and skips subsequent positions creating gaps (1, 1, 3). DENSE_RANK() assigns identical values to ties without skipping subsequent ranks (1, 1, 2).",
          "tip": "ইন্টারভিউতে '1, 1, 3 (Rank) vs 1, 1, 2 (Dense Rank)' সংখ্যাগুলো উল্লেখ করলে স্পষ্ট ধারণা প্রমাণ হয়।"
        },
        {
          "lvl": "lvl2",
          "q": "MongoDB-তে `$facet` স্টেজ কী এবং একক ডেটাবেজ কলে ড্যাশবোর্ড ও পেজিনেশন মেটাডেটা কীভাবে আনা যায়?",
          "m": "`$facet` স্টেজ একই ইনপুট ডকুমেন্টের ওপর সমান্তরালে (In parallel) একাধিক স্বাধীন সাব-পাইপলাইন চালানোর সুযোগ দেয়! ক্লাসিক ব্যবহার: পেজিনেটেড প্রোডাক্ট লিস্ট এবং একই সাথে মোট কাউন্ট ও ফিল্টারের হিসেব আনা। পূর্বে দুটি আলাদা কুয়েরি লাগত (`count()` এবং `find().skip().limit()`)। `$facet`-এর মাধ্যমে একটি সাব-পাইপলাইনে `{ $skip: 0 }, { $limit: 10 }` এবং অন্য সাব-পাইপলাইনে `{ $count: 'total' }` দিয়ে একক ডেটাবেজ রাউন্ড-ট্রিপে ডেটা ও পেজিনেশন মেটাডেটা আনা সম্ভব হয়।",
          "b": "$facet একই সাথে সমান্তরালে একাধিক পাইপলাইন চালায়। এর মাধ্যমে এক কুয়েরিতেই পেজিনেশন রেজাল্ট, মোট কাউন্ট এবং ফিল্টার পরিসংখ্যান একবারে আনা যায়।",
          "e": "The $facet stage processes multiple aggregation pipelines concurrently within a single stage on the same input documents. It is standard for e-commerce dashboards to fetch paginated items and total dataset count simultaneously in one round trip.",
          "code": "db.products.aggregate([\n  { $match: { isAvailable: true } },\n  {\n    $facet: {\n      data: [{ $skip: 20 }, { $limit: 10 }],\n      totalCount: [{ $count: 'total' }]\n    }\n  }\n]);"
        },
        {
          "lvl": "lvl2",
          "q": "SQL-এ Recursive CTE কীভাবে কাজ করে এবং ক্যাটাগরি ট্রি বা অর্গানোগ্রাম ফেচ করতে কীভাবে ব্যবহৃত হয়?",
          "m": "Recursive CTE হলো এমন একটি কুয়েরি যা নিজের ফলাফলকে বারবার রেফারেন্স করে যতক্ষণ না কোনো শর্ত মিথ্যা হয়। এর দুটি অংশ থাকে: (১) `Anchor Member`: মূল রুট নোডটি খুঁজে বের করে (যেমন `WHERE parent_id IS NULL`), (২) `Recursive Member`: `UNION ALL` দিয়ে পূর্ববর্তী রেজাল্ট সেটের সাথে চাইল্ড রেকর্ডগুলোকে বারবার জয়েন করে যতক্ষণ না লিফ নোডে পৌঁছায়। এটি যেকোনো গভীরতার আনবাউন্ডেড ক্যাটাগরি ট্রি বা ম্যানেজমেন্ট হায়ারার্কি এক কুয়েরিতে বের করে এনে দেয়।",
          "b": "রিকার্সিভ সিটিই নিজেকেই বারবার কল করে যতক্ষণ না লিফ নোডে পৌঁছায়। এটি দিয়ে প্যারেন্ট-চাইল্ড ক্যাটাগরি ট্রি বা কোম্পানির পদক্রম খুব সহজে এক কুয়েরিতে তুলে আনা যায়।",
          "e": "A Recursive CTE references itself iteratively. It consists of an Anchor member (base case, e.g. parent_id IS NULL) joined via UNION ALL with a Recursive member that traverses subsequent child levels until reaching terminal leaves.",
          "code": "WITH RECURSIVE CategoryTree AS (\n  SELECT id, name, parent_id, 1 AS depth FROM categories WHERE parent_id IS NULL\n  UNION ALL\n  SELECT c.id, c.name, c.parent_id, ct.depth + 1\n  FROM categories c JOIN CategoryTree ct ON c.parent_id = ct.id\n)\nSELECT * FROM CategoryTree;"
        },
        {
          "lvl": "lvl2",
          "q": "MongoDB Aggregation-এ Memory Limit (100MB RAM cap) কী এবং `$allowDiskUse` অপশন কখন ব্যবহার করবে?",
          "m": "MongoDB প্রতিটি অ্যাগ্রিগেশন পাইপলাইন স্টেজের জন্য সর্বোচ্চ ১০০ মেগাবাইট (100MB) RAM বরাদ্দ করে। যদি কোনো `$group` বা `$sort` স্টেজ ইন-মেমোরিতে ১০০MB সীমা অতিক্রম করে, তবে কুয়েরি `exceeded memory limit of 100MB` এরর দিয়ে ক্র্যাশ করে। সমাধান: (১) কুয়েরি অপশনে `{ allowDiskUse: true }` পাস করতে হবে—যাতে ডেটাবেজ মেমোরি শেষ হলে অস্থায়ী ডিস্ক স্পেস ব্যবহার করে সর্ট বা গ্রুপিং সম্পন্ন করতে পারে। (২) তবে ডিস্ক আই/ও স্লো হওয়ায় প্রোডাকশনে ফিল্টারে ইনডেক্স দেওয়া এবং আর্লি `$match` করে ডেটা সাইজ কমানো অগ্রাধিকার পাওয়া উচিত।",
          "b": "মঙ্গোডিবি অ্যাগ্রিগেশনের প্রতি স্টেজে ১০০MB র‍্যামের সীমা রয়েছে। allowDiskUse: true দিলে এটি মেমোরি ছাড়িয়ে গেলে হার্ডডিস্কের টেম্পোরারি ফাইলে ডেটা প্রসেস করে এরর এড়ায়।",
          "e": "MongoDB caps memory for any pipeline stage at 100MB. If an unindexed $sort or large $group exceeds this threshold, pass { allowDiskUse: true } to spill temporary data to disk, preventing query termination at the cost of disk I/O latency.",
          "code": "db.logs.aggregate([...], { allowDiskUse: true });"
        },
        {
          "lvl": "lvl3",
          "q": "SQL Window Functions দিয়ে 'Running Total' (চলতি মোট হিসেব) এবং Moving Average কীভাবে ক্যালকুলেট করবে?",
          "m": "রানিং টোটাল হলো পূর্ববর্তী সব রো-র যোগফলের সাথে বর্তমান রোর যোগফল। সিনট্যাক্স: `SUM(amount) OVER (ORDER BY created_at ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)`। এটি প্রতিদিনের ব্যালেন্স বা ক্রমবর্ধমান আয় দেখায়। আর ৭ দিনের মুভিং এভারেজ বের করতে ফ্রেম ক্লজ ব্যবহার করা হয়: `AVG(sales) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW)`। এটি প্রতিদিনের সেলসের ওঠানামা স্মুথ করে ট্রেন্ড লাইন বুঝতে ড্যাশবোর্ডে ব্যবহৃত হয়।",
          "b": "রানিং টোটাল বের করতে SUM(amount) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) ব্যবহৃত হয়। আর ৭ দিনের মুভিং এভারেজের জন্য 6 PRECEDING AND CURRENT ROW ফ্রেম ক্লজ ব্যবহার করা হয়।",
          "e": "Running totals are computed via SUM(amount) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW). Moving averages specify a window frame like ROWS BETWEEN 6 PRECEDING AND CURRENT ROW to calculate rolling 7-day averages natively.",
          "code": "SELECT date, amount,\n       SUM(amount) OVER (ORDER BY date ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW) AS running_total,\n       AVG(amount) OVER (ORDER BY date ROWS BETWEEN 6 PRECEDING AND CURRENT ROW) AS seven_day_moving_avg\nFROM daily_sales;"
        },
        {
          "lvl": "lvl3",
          "q": "MongoDB Aggregation Pipeline অপটিমাইজেশন ইন্টারনালস: কেন পাইপলাইনে স্টেজ অর্ডার জীবন-মরণ সমান গুরুত্বপূর্ণ?",
          "m": "মঙ্গোডিবি কুয়েরি অপটিমাইজার কিছু স্টেজ পুশ-ডাউন অপটিমাইজ করতে পারে, কিন্তু ডেভেলপারের সাজানো স্টেজ সিকুয়েন্স পারফরম্যান্স নিয়ন্ত্রণ করে: (১) `$match` এবং `$sort` অবশ্যই পাইপলাইনের সবার শুরুতে রাখতে হবে যাতে কালেকশনের B-Tree ইনডেক্স ব্যবহার করা যায়। একবার `$project` বা `$group` হয়ে গেলে ইনডেক্স সম্পূর্ণ অকেজো হয়ে যায়! (২) `$unwind`-এর আগে অবশ্যই ফিল্টারিং শেষ করতে হবে—কারণ ১০ লক্ষ ডকুমেন্টে আনওয়াইন্ড চালালে মুহূর্তের মধ্যে কোটি ডকুমেন্ট মেমোরিতে স্পিল করে সার্ভার ক্র্যাশ করবে। (৩) `$project` দিয়ে অপ্রয়োজনীয় বড় ফিল্ড বাদ দিয়ে পাইপলাইনের ডকুমেন্ট পে-লোড ছোট রাখতে হবে।",
          "b": "ইনডেক্স ব্যবহারের জন্য $match এবং $sort অবশ্যই পাইপলাইনের শুরুতে রাখতে হবে। $unwind চালানোর আগে ডেটা ফিল্টার করা বাধ্যতামূলক যাতে কোটি কোটি রো মেমোরি ব্লোট না ঘটায়।",
          "e": "$match and $sort must precede all other stages to leverage collection indexes; once a pipeline executes $project or $group, index accessibility is permanently lost. Unwinding before filtering creates massive in-memory document expansions that stall the cluster.",
          "tip": "বলো: 'Placing $match and $sort at the top ensures index usage before pipeline memory materialization.'"
        },
        {
          "lvl": "lvl3",
          "q": "OLTP ডেটাবেজে সরাসরি জটিল অ্যানালিটিক্যাল কুয়েরি চালানোর ঝুঁকি কী এবং Read Replica ও Materialized View দিয়ে কীভাবে ব্যালেন্স করবে?",
          "m": "OLTP ডেটাবেজ ডিজাইন করা হয়েছে দ্রুত এবং ক্ষুদ্র লেনদেনের জন্য (যেমন সেলস ইনভয়েস তৈরি বা স্টক কাটা)। এতে যদি কোনো ম্যানেজার ৫ বছরের সেলস অ্যানালিটিক্স বা লাখ লাখ রোর অ্যাগ্রিগেশন কুয়েরি চালায়, তবে তা ডেটাবেজের সব CPU কোর এবং বাফার ক্যাশ গ্রাস করে ফেলে—ফলে ক্যাশিয়ারদের পিওএস চেকআউট ল্যাগ করা শুরু করে! সমাধান: (১) `Read Replica`: ডেটাবেজের একটি রিড-রেপ্লিকা তৈরি করে সমস্ত ভারী ড্যাশবোর্ড ও রিপোর্টিং কুয়েরি সেখানে রুট করা। (২) `Materialized View`: দৈনিক বা ঘণ্টায় একবার ডেটা প্রাক-গণনা (Pre-compute) করে মেটেরিয়ালাইজড ভিউতে রাখা (`REFRESH MATERIALIZED VIEW CONCURRENTLY`) যাতে ড্যাশবোর্ড মুহূর্তেই তৈরি ডেটা দেখতে পারে।",
          "b": "ভারী অ্যানালিটিক্যাল কুয়েরি মূল ডেটাবেজের সিপিইউ গ্রাস করে লাইভ ট্রানজ্যাকশন স্লো করে দেয়। রিড-রেপ্লিকা ব্যবহার করে রিপোর্টিং ট্রাফিক আলাদা করা এবং মেটেরিয়ালাইজড ভিউ দিয়ে ডেটা প্রি-কম্পিউট করে রাখা আর্কিটেকচারাল সমাধান।",
          "e": "Running heavy multi-stage analytical queries on an OLTP instance starves CPU and evicts cache pages, spiking latency on customer-facing write transactions. Route analytical reads to an asynchronous Read Replica and use Materialized Views with periodic background refreshes.",
          "code": "CREATE MATERIALIZED VIEW mv_daily_store_revenue AS\nSELECT store_id, DATE(created_at) AS day, SUM(total) AS revenue\nFROM invoices GROUP BY store_id, DATE(created_at);\n-- Refresh non-blocking:\nREFRESH MATERIALIZED VIEW CONCURRENTLY mv_daily_store_revenue;"
        },
        {
          "lvl": "lvl3",
          "q": "PostgreSQL-এ JSONB Aggregation Functions (`jsonb_agg`, `jsonb_object_agg`) দিয়ে হাই-পারফরম্যান্স নেস্টেড JSON কীভাবে সিঙ্গেল কুয়েরিতে তৈরি করবে?",
          "m": "Node.js অ্যাপ্লিকেশনে N+1 কুয়েরি চালিয়ে ডেটা নেস্ট করার বদলে PostgreSQL-এর `jsonb_agg()` এবং `json_build_object()` ব্যবহার করে ডেটাবেজ লেভেলেই শতভাগ নেস্টেড JSON অবজেক্ট জেনারেট করে রিটার্ন করা যায়। যেমন: একটি ইউজারের সব অর্ডার ও অর্ডারের সব আইটেম ডেটাবেজ নিজেই একটি সম্পূর্ণ হায়ারার্কিকাল JSON রেসপন্স হিসেবে বানিয়ে দেয়। নোড সার্ভারে কোনো জাভাস্ক্রিপ্ট লুপ চালানো লাগে না এবং নেটওয়ার্ক ওভারহেড এক-দশমাংশে নেমে আসে।",
          "b": "jsonb_agg এবং json_build_object দিয়ে ডাটাবেজ নিজেই চাইল্ড ডেটাগুলোকে নেস্টেড JSON অ্যারে বানিয়ে দেয়। এতে নোড সার্ভারে একাধিক কুয়েরি চালানো বা লুপ ঘোরানোর প্রয়োজন হয় না।",
          "e": "jsonb_agg() aggregates row sets into JSON arrays, and jsonb_build_object() constructs JSON key-value structures directly inside PostgreSQL. This eliminates ORM hydration and N+1 queries, outputting fully hydrated hierarchical JSON payloads from a single SQL statement.",
          "code": "SELECT u.id, u.name,\n       jsonb_agg(jsonb_build_object('id', o.id, 'total', o.total)) AS orders\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nGROUP BY u.id, u.name;"
        },
        {
          "lvl": "lvl3",
          "q": "Time-Series Data Aggregation: লাখ লাখ IoT বা সেলস টাইম-সিরিজ ডেটা ঘণ্টাওয়ারি ও দৈনিক গ্রুপিংয়ে কীভাবে অপটিমাইজ করবে?",
          "m": "টাইম-সিরিজ ডেটায় PostgreSQL-এর `date_trunc('hour', created_at)` বা `date_trunc('day', created_at)` ব্যবহার করা হয়। তবে কোটি কোটি রোর ক্ষেত্রে প্রতিবার কুয়েরিতে `date_trunc` চালানো খুব স্লো। হাই-স্কেল সমাধান: (১) কলামের ওপর একটি এক্সপ্রেশন ইনডেক্স তৈরি করা: `CREATE INDEX idx_logs_hourly ON logs (date_trunc('hour', created_at));`। (২) অথবা টাইমসিরিজ এক্সটেনশন যেমন `TimescaleDB` ব্যবহার করা—যা হাইপারটেবিল (Hypertables) এবং স্বয়ংক্রিয় ব্যাকগ্রাউন্ড 'Continuous Aggregates' তৈরি করে রাখে, ফলে রিয়েলটাইমে শত কোটি পয়েন্টের ডেটা মাত্র ৩ মিলিসেকেন্ডে গ্রাফে রেন্ডার হয়।",
          "b": "টাইম-সিরিজ ডেটার দ্রুত হিসেবের জন্য date_trunc এক্সপ্রেশন ইনডেক্স তৈরি করা হয়। বিশাল ডেটাসেটের ক্ষেত্রে TimescaleDB-এর কন্টিনিউয়াস অ্যাগ্রিগেশন ব্যবহার করে স্বয়ংক্রিয়ভাবে ঘণ্টাওয়ারি ও দৈনিক প্রি-কম্পিউটেড ডেটা প্রস্তুত রাখা হয়।",
          "e": "For time-series rollups, index date_trunc('hour', created_at) directly via an Expression Index. At enterprise scale, implement TimescaleDB hypertables with Continuous Aggregates to maintain automated pre-computed downsampled rollups.",
          "code": "SELECT date_trunc('hour', created_at) AS hour_bucket,\n       COUNT(*) AS request_count, AVG(response_time) AS avg_lat\nFROM api_logs\nGROUP BY hour_bucket ORDER BY hour_bucket DESC;"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ড্যাশবোর্ডে গত ৩০ দিনের মোট রেভিনিউ এবং টপ ৫ বেস্ট-সেলিং প্রোডাক্ট আনতে গিয়ে মঙ্গোডিবি অ্যাগ্রিগেশন কুয়েরি ১২ সেকেন্ড সময় নিচ্ছে। তুমি কীভাবে এটি দ্রুত করবে?",
          "m": "সমাধানের ধাপ: (১) সবার আগে পাইপলাইনের শীর্ষে ইনডেক্সড `$match` স্টেজ বসাতে হবে: `{ created_at: { $gte: thirtyDaysAgo } }`—যাতে পুরো কালেকশন স্ক্যান না হয়ে শুধু ৩০ দিনের ডেটা ফিল্টার হয়। (২) ইনভয়েস আইটেমে `$unwind: '$items'` করার আগে আইটেম ছাড়া অপ্রয়োজনীয় বড় ফিল্ড বাদ দিয়ে দেব। (৩) একই সাথে দুটি রেজাল্ট আনতে দুটি আলাদা দানবীয় কুয়েরি না চালিয়ে `$facet` স্টেজ ব্যবহার করব যাতে একবার ডেটা রিড করেই রেভিনিউ সামারি এবং টপ ৫ প্রোডাক্ট আলাদা ব্রাঞ্চে হিসেব হয়ে যায়। (৪) কালেকশনে `{ created_at: 1 }` ইনডেক্স নিশ্চিত করব। রেজাল্ট ১২ সেকেন্ড থেকে নেমে ১৫০ মিলিসেকেন্ডে চলে আসবে।",
          "b": "শুরুতে ৩০ দিনের ডেটার ওপর ইনডেক্সড $match বসাব, অপ্রয়োজনীয় ফিল্ড বাদ দিয়ে $unwind করব এবং $facet ব্যবহার করে এক পাসেই রেভিনিউ ও টপ ৫ প্রোডাক্ট বের করে আনব।",
          "e": "Prepend an indexed $match on created_at to prune scans to the last 30 days. Strip heavy metadata prior to $unwind, and leverage $facet to fork the stream into revenue metrics and top-product rankings concurrently in a single scan.",
          "code": "db.invoices.aggregate([\n  { $match: { createdAt: { $gte: last30Days } } },\n  {\n    $facet: {\n      revenueSummary: [{ $group: { _id: null, totalRev: { $sum: '$grandTotal' } } }],\n      topProducts: [\n        { $unwind: '$items' },\n        { $group: { _id: '$items.productId', soldQty: { $sum: '$items.qty' } } },\n        { $sort: { soldQty: -1 } },\n        { $limit: 5 }\n      ]\n    }\n  }\n]);"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: প্রতিটি ডিপার্টমেন্টের সর্বোচ্চ বেতনপ্রাপ্ত ৩ জন কর্মচারীর তালিকা বের করতে বলা হয়েছে। তুমি সাব-কুয়েরিতে বারবার ম্যাক্স স্যালারি কুয়েরি না করে কীভাবে পরিষ্কারভাবে এটি সমাধান করবে?",
          "m": "সমাধান: SQL Window Function `DENSE_RANK()` এবং একটি CTE ব্যবহার করতে হবে। CTE-র ভেতরে প্রতিটি ডিপার্টমেন্টের কর্মচারীদের বেতনের ভিত্তিতে র‍্যাংক অ্যাসাইন করব: `DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rank`। এরপর মূল কুয়েরিতে শুধু ফিল্টার করব `WHERE rank <= 3`। এটি সিঙ্গেল পাসে সম্পূর্ণ টেবিল প্রসেস করে এবং কোনো স্লো ও জটিল সাব-কুয়েরি ছাড়া পরিষ্কারভাবে সঠিক রেজাল্ট প্রদান করে।",
          "b": "সিটিই ব্লকে DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) দিয়ে র‍্যাংক তৈরি করে বাইরে WHERE rank <= 3 ফিল্টার করলেই এক কুয়েরিতে টপ ৩ জন পাওয়া যায়।",
          "e": "Solve this cleanly via a CTE using DENSE_RANK() partitioned by department_id and ordered by salary DESC, then filtering WHERE rank <= 3 in the outer query without repetitive correlated subqueries.",
          "code": "WITH RankedEmployees AS (\n  SELECT id, name, department_id, salary,\n         DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as rank\n  FROM employees\n)\nSELECT * FROM RankedEmployees WHERE rank <= 3;"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: MongoDB `$lookup` ব্যবহার করে ১ লক্ষ অর্ডারের সাথে কাস্টমার ডেটা জয়েন করায় সার্ভারের RAM ক্র্যাশ করেছে। কীভাবে এটি ফিক্স করবে?",
          "m": "সমস্যা: ১ লক্ষ অর্ডারের প্রতিটির জন্য અન-ইনডেক্সড কালেকশনে লুকআপ চালানোয় লাখ লাখ মেমোরি অবজেক্ট হাইড্রেট হয়েছে। ফিক্স: (১) `foreignField`-এর ওপর (টার্গেট কালেকশনের `_id` বা `userId`) অবশ্যই B-Tree ইনডেক্স থাকতে হবে, যাতে লুকআপ প্রতিবার ফুল কালেকশন স্ক্যান না করে। (২) ১ লক্ষ অর্ডার একবারে লুকআপ না করে অবশ্যই শুরুতে পেজিনেশন (`$skip` ও `$limit`) করতে হবে—যাতে মাত্র ২০ বা ৫০টি অর্ডারের জন্য লুকআপ চলে। (৩) যদি শুধু কাস্টমারের নাম দরকার হয়, তবে `$lookup`-এর ভেতরে `pipeline` ব্যবহার করে শুধু `name` প্রোজেক্ট করতে হবে, পুরো কাস্টমার অবজেক্ট নয়।",
          "b": "লুকআপ ফিল্ডে ইনডেক্স নিশ্চিত করতে হবে, একবারে লক্ষ ডেটা না এনে শুরুতে পেজিনেশন ($limit 20) দিতে হবে এবং কাস্টমার কালেকশন থেকে শুধু নাম প্রোজেক্ট করে মেমোরি রক্ষা করতে হবে।",
          "e": "Guarantee an index exists on the foreignField. Never join 100,000 documents at once—apply $limit and $skip before $lookup to restrict joins to the current page (e.g. 20 rows), and use pipeline sub-stages inside $lookup to project only essential fields.",
          "code": "db.orders.aggregate([\n  { $match: { tenantId } },\n  { $sort: { createdAt: -1 } },\n  { $limit: 20 }, // Pagination FIRST!\n  {\n    $lookup: {\n      from: 'users',\n      localField: 'userId',\n      foreignField: '_id',\n      pipeline: [{ $project: { name: 1, phone: 1 } }],\n      as: 'customer'\n    }\n  }\n]);"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি ইকমার্স সাইটে ইউজার কোন কোন দিনে কেনাকাটা করেছে তার 'Streak' বা একটানা দিনের সংখ্যা বের করতে বলা হয়েছে। তুমি কীভাবে SQL দিয়ে এটি হিসেব করবে?",
          "m": "এটি ক্লাসিক 'Gaps and Islands' সমস্যা। সমাধান: (১) প্রথমে প্রতিটি অর্ডারের তারিখকে ডিস্টিংকট করি। (২) উইন্ডো ফাংশন `ROW_NUMBER() OVER (ORDER BY date)` দিয়ে প্রতিটি দিনকে একটি নম্বর দিই। (৩) তারিখ থেকে এই রো নম্বর বিয়োগ করি (`date - ROW_NUMBER() * INTERVAL '1 day'`)। মজার ব্যাপার হলো: যদি দিনগুলো একটানা থাকে, তবে বিয়োগফল সবসময় একটি ধ্রুবক তারিখ (Island Group) দেবে! (৪) এবার এই বিয়োগফল দিয়ে `GROUP BY` করে `COUNT(*)` বের করলেই টানা দিনের সংখ্যা (Streak) পাওয়া যায়।",
          "b": "গ্যাপস অ্যান্ড আইল্যান্ড পদ্ধতিতে তারিখ থেকে ROW_NUMBER() বিয়োগ করলে একটানা দিনগুলোর জন্য একই গ্রুপ মান পাওয়া যায়। এরপর ওই গ্রুপ অনুযায়ী COUNT(*) করলেই ইউজারের স্ট্রিক সংখ্যা বের হয়ে আসে।",
          "e": "Solve this Gaps and Islands pattern by subtracting ROW_NUMBER() days from the event date. Consecutive contiguous dates produce an identical anchor date group key, which can then be grouped and counted to determine the streak length.",
          "code": "WITH RankedDates AS (\n  SELECT DISTINCT date,\n         date - (ROW_NUMBER() OVER (ORDER BY date))::int AS grp\n  FROM user_logins\n)\nSELECT COUNT(*) as streak_days, MIN(date) as start_date, MAX(date) as end_date\nFROM RankedDates GROUP BY grp ORDER BY streak_days DESC;"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ড্যাশবোর্ডে মান্থ-অন-মান্থ (MoM) রেভিনিউ গ্রোথ পার্সেন্টেজ বের করার কুয়েরি লিখতে হবে। কীভাবে উইন্ডো ফাংশন `LAG()` দিয়ে এটি বের করবে?",
          "m": "সমাধান: `LAG()` ফাংশন পূর্ববর্তী রো-র মান রিড করতে পারে। প্রথমে প্রতি মাসের মোট রেভিনিউ হিসেব করি। এরপর উইন্ডো ফাংশন ব্যবহার করি: `LAG(monthly_revenue, 1) OVER (ORDER BY month) AS prev_month_revenue`। এবার গ্রোথ ফর্মুলা প্রয়োগ করি: `((monthly_revenue - prev_month_revenue) / prev_month_revenue) * 100`। কোনো অতিরিক্ত সেলফ-জয়েন ছাড়াই এটি সিঙ্গেল কুয়েরিতে প্রতি মাসের তুলনামূলক প্রবৃদ্ধি বা পতন বের করে দেয়।",
          "b": "LAG() উইন্ডো ফাংশন দিয়ে আগের মাসের রেভিনিউ আনা যায়। এরপর (বর্তমান মাস - আগের মাস) / আগের মাস * ১০০ ফর্মুলা দিয়ে মুহূর্তে মান্থ-অন-মান্থ গ্রোথ বের করা সম্ভব।",
          "e": "Compute Month-over-Month (MoM) growth using the LAG() window function to fetch the preceding month's revenue without self-joins, then applying standard percentage change arithmetic.",
          "code": "WITH MonthlyRevenue AS (\n  SELECT date_trunc('month', created_at) AS month, SUM(total) AS rev\n  FROM invoices GROUP BY 1\n)\nSELECT month, rev,\n       LAG(rev) OVER (ORDER BY month) as prev_rev,\n       ROUND(((rev - LAG(rev) OVER (ORDER BY month)) / LAG(rev) OVER (ORDER BY month) * 100), 2) AS mom_growth_pct\nFROM MonthlyRevenue;"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani POS-এর অ্যানালিটিক্স ড্যাশবোর্ডে প্রতিদিনের মোট সেলস, মোট লাভ (Profit Margin), বাকি এবং ক্যাশ কালেকশন কীভাবে রিয়েলটাইমে জেনারেট করা হয়?",
          "m": "দোকানিতে সেলস অ্যানালিটিক্স জেনারেশনের জন্য অপটিমাইজড SQL অ্যাগ্রিগেশন কুয়েরি ব্যবহার করা হয়েছে। ইনভয়েস টেবিলে `tenant_id` এবং `created_at`-এর ওপর কম্পাউন্ড ইনডেক্স থাকে। কুয়েরিতে ফিল্টারিংয়ের পর `SUM(grand_total)` দিয়ে মোট সেলস, `SUM(paid_amount)` দিয়ে ক্যাশ ও ডিজিটাল কালেকশন, `SUM(due_amount)` দিয়ে বকেয়া এবং আইটেম টেবিলের সাথে জয়েন করে `SUM((selling_price - cost_price) * quantity)` দিয়ে নিট মুনাফা (Profit Margin) বের করা হয়। পুরো হিসাবটি মাত্র ৫ মিলিসেকেন্ডে সম্পন্ন হয়ে ড্যাশবোর্ডে লাইভ চার্ট প্রদর্শন করে।",
          "b": "দোকানি ড্যাশবোর্ডে কম্পাউন্ড ইনডেক্সযুক্ত ইনভয়েস ও আইটেম টেবিল থেকে SUM(grand_total), SUM(paid_amount), SUM(due_amount) এবং কস্ট প্রাইস বিয়োগ করে নিট প্রফিট এক কুয়েরিতে মাত্র ৫ মিলি-সেকেন্ডে ক্যালকুলেট করা হয়।",
          "e": "In Dokani POS, the merchant analytics dashboard executes a single composite-indexed aggregation query computing gross sales, paid cash, outstanding customer receivables, and net profit margins ((selling_price - cost_price) * qty) in sub-5ms latency.",
          "code": "SELECT \n  COUNT(*) AS total_invoices,\n  SUM(grand_total) AS gross_sales,\n  SUM(paid_amount) AS cash_collected,\n  SUM(due_amount) AS outstanding_dues\nFROM invoices \nWHERE tenant_id = $1 AND created_at >= CURRENT_DATE;"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: ই-কমার্স সিস্টেমে কাস্টমারদের 'RFM Analysis' (Recency, Frequency, Monetary) বের করতে কীভাবে SQL Aggregation ব্যবহার করবে?",
          "m": "RFM অ্যানালিসিস কাস্টমারদের লয়্যালটি সেগমেন্টেশন করতে ব্যবহৃত হয়: (১) `Recency`: কাস্টমারের শেষ অর্ডারের পর কয় দিন অতিবাহিত হয়েছে (`CURRENT_DATE - MAX(created_at)`), (২) `Frequency`: কাস্টমার মোট কতগুলো সফল অর্ডার করেছে (`COUNT(id)`), (৩) `Monetary`: কাস্টমার মোট কত টাকার পণ্য কিনেছে (`SUM(grand_total)`। এই ৩টি মান দিয়ে `NTILE(5) OVER (...)` ব্যবহার করে কাস্টমারদের ১ থেকে ৫ স্কোরে ভাগ করা হয় এবং 'Champions', 'At Risk', ও 'Lost Customers' ক্যাটাগরিতে স্বয়ংক্রিয়ভাবে আলাদা করে মার্কেটিং অটোমেশন চালানো হয়।",
          "b": "RFM অ্যানালিসিসে MAX(তারিখ), COUNT(অর্ডার) এবং SUM(টাকা) বের করে NTILE(5) দিয়ে কাস্টমারদের ১ থেকে ৫ স্কোরে ভাগ করা হয়। এটি হাই-ভ্যালু ও ইনঅ্যাক্টিভ কাস্টমার শনাক্ত করতে ব্যবহৃত হয়।",
          "e": "Execute RFM (Recency, Frequency, Monetary) segmentation using SQL aggregations: Recency (days since MAX(created_at)), Frequency (COUNT(id)), and Monetary (SUM(total)). Apply NTILE(5) window functions to assign quintile scores (1-5) for algorithmic customer targeting.",
          "code": "SELECT user_id,\n       DATE_PART('day', NOW() - MAX(created_at)) AS recency_days,\n       COUNT(id) AS frequency,\n       SUM(grand_total) AS monetary,\n       NTILE(5) OVER (ORDER BY SUM(grand_total) DESC) as monetary_score\nFROM orders GROUP BY user_id;"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Dokani-তে হাজার হাজার দোকানের ইনভেন্টরি স্টক হিস্ট্রি থেকে 'Fast-Moving vs Dead Stock' প্রোডাক্ট কীভাবে আইডেন্টিফাই করা হয়?",
          "m": "দোকানিতে ইনভেন্টরি অপটিমাইজেশনের জন্য একটি অ্যানালিটিক্স পাইপলাইন চলে: গত ৯০ দিনের সব সেলস আইটেম অ্যাগ্রিগেট করে প্রতি প্রোডাক্টের টার্নওভার রেট বের করা হয়। যেসব প্রোডাক্টের স্টক ৫০-এর বেশি কিন্তু গত ৬০ দিনে ১টিও বিক্রি হয়নি, সেগুলোকে `DEAD_STOCK` হিসেবে চিহ্নিত করে মার্চেন্টকে নোটিফিকেশন দেওয়া হয় ডিসকাউন্টে ক্লিয়ার করার জন্য। আর যেসব প্রোডাক্টের স্টক শেষ হতে মাত্র ৩ দিনের সেলস রেট বাকি, সেগুলোকে `FAST_MOVING_REORDER` ফ্ল্যাগ দেওয়া হয়।",
          "b": "গত ৯০ দিনের বিক্রি হিসেব করে যে পণ্যের স্টক থাকা সত্ত্বেও কোনো বিক্রি নেই তাকে ডেড স্টক এবং যেগুলোর বিক্রি দ্রুত হচ্ছে তাকে ফাস্ট মুভিং হিসেবে শনাক্ত করে মার্চেন্টকে রিস্টক করার অ্যালার্ট দেওয়া হয়।",
          "e": "In Dokani, inventory turnover analysis computes daily burn rates across a 90-day rolling window. Products retaining high stock with zero sales in 60 days are flagged as Dead Stock, while high-velocity items with less than 3 days of stock trigger automated supplier reorder alerts.",
          "tip": "বলো: 'Fast-moving vs Dead-stock analysis optimizes working capital by comparing sales velocity with holding inventory.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: বিলিয়ন স্কেল ডেটায় রিয়েল-টাইম ড্যাশবোর্ডের জন্য 'Pre-aggregation Rollups' আর্কিটেকচার কীভাবে ডিজাইন করবে?",
          "m": "যখন মূল কালেকশনে প্রতিদিন কোটি কোটি ইভেন্ট আসে, তখন রিয়েলটাইমে `SUM` বা `GROUP BY` চালানো অসম্ভব। আর্কিটেকচারাল সলিউশন: আমরা একটি `DailyAggregates` বা `HourlyRollups` টেবিল তৈরি করি। Redis বা Kafka দিয়ে প্রতি ঘণ্টার ইভেন্টগুলো মাইক্রো-ব্যাচে অ্যাগ্রিগেট করে ওই রোলআপ টেবিলে ইনসার্ট/আপসর্ট (`ON CONFLICT DO UPDATE SET total = total + EXCLUDED.total`) করা হয়। ড্যাশবোর্ড যখন ৩ মাসের সেলস হিসেব করে, সে ১০০ কোটি মূল রেকর্ড স্ক্যান না করে মাত্র ৯০টি প্রাক-গণনাকৃত রোলআপ রো রিড করে—ফলে রেসপন্স টাইম হয় মাত্র ২ মিলিসেকেন্ড!",
          "b": "কোটি কোটি রো-র ক্ষেত্রে রিয়েলটাইমে গ্রুপিং না করে প্রতি ঘণ্টার ডেটা প্রি-অ্যাগ্রিগেট করে রোলআপ টেবিলে আপসর্ট করে রাখা হয়। ড্যাশবোর্ড তখন মূল টেবিল না ঘেঁটে সরাসরি রোলআপ টেবিল থেকে মিলি-সেকেন্ডে রিপোর্ট দেখায়।",
          "e": "Under massive event ingestion, replace on-the-fly aggregations with pre-aggregated rollups maintained via background stream processors (Kafka/BullMQ). Storing hourly rollups with idempotent upserts allows 90-day dashboard reporting to query 90 rows instead of billions.",
          "code": "INSERT INTO hourly_metrics (store_id, hour_bucket, total_sales, order_count)\nVALUES ($1, $2, $3, $4)\nON CONFLICT (store_id, hour_bucket)\nDO UPDATE SET \n  total_sales = hourly_metrics.total_sales + EXCLUDED.total_sales,\n  order_count = hourly_metrics.order_count + EXCLUDED.order_count;"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: PostgreSQL-এ `CUBE` এবং `ROLLUP` ক্লজ ব্যবহার করে মাল্টি-লেভেল সাব-টোটাল ও গ্র্যান্ড টোটাল রিপোর্ট কীভাবে তৈরি করবে?",
          "m": "মার্চেন্টদের রিপোর্টিংয়ে প্রায়ই প্রয়োজন হয়: ডিপার্টমেন্টভিত্তিক মোট খরচ, সাব-ডিপার্টমেন্টের সাব-টোটাল এবং সবার শেষে পুরো কোম্পানির গ্র্যান্ড টোটাল। সাধারণ গ্রুপ বাই দিয়ে এটি করতে ৩টি আলাদা কুয়েরি এবং ইউনিয়ন লাগত। PostgreSQL-এর `GROUP BY ROLLUP (region, branch, department)` ক্লজ ব্যবহার করলে ডেটাবেজ এক কুয়েরিতেই ক্রমানুসারে প্রতিটি লেভেলের সাব-টোটাল এবং সবার শেষে সম্পূর্ণ ডেটাসেটের গ্র্যান্ড টোটাল ক্যালকুলেট করে চমৎকার হায়ারার্কিকাল রিপোর্ট প্রদান করে।",
          "b": "GROUP BY ROLLUP এক কুয়েরিতেই বিভাগওয়ারি সাব-টোটাল এবং পুরো কোম্পানির গ্র্যান্ড টোটাল তৈরি করে দেয়। এটি ফিনান্সিয়াল অডিট ও এক্সিকিউটিভ রিপোর্টের জন্য অত্যন্ত উপযোগী।",
          "e": "The ROLLUP operator generates hierarchical grouping sets with multi-level sub-totals and an overarching grand total in a single SQL query pass, eliminating cumbersome UNION ALL queries for financial auditing dashboards.",
          "code": "SELECT region, branch, SUM(sales) AS total_sales\nFROM retail_sales\nGROUP BY ROLLUP (region, branch);"
        }
      ]
    },
    {
      "id": "multitenant-isolation",
      "name": "Multi-Tenant Data Isolation & SaaS Architecture",
      "desc": "Shared DB Shared Schema, Schema-per-Tenant, DB-per-Tenant, Postgres RLS, Prisma Tenant Extensions, Data Leak Prevention",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Multi-Tenant Architecture কী এবং SaaS সফটওয়্যারে এটি কেন অপরিহার্য?",
          "m": "Multi-Tenant Architecture হলো এমন একটি সফটওয়্যার আর্কিটেকচার যেখানে একটি একক অ্যাপ্লিকেশন ইনস্ট্যান্স এবং অবকাঠামো বহুসংখ্যক স্বাধীন গ্রাহক বা সংস্থাকে (যাদের 'Tenant' বলা হয়) সার্ভ করে। প্রতিটি টেন্যান্টের ডেটা অন্য টেন্যান্টদের কাছ থেকে সম্পূর্ণ অদৃশ্য ও সুরক্ষিত থাকে। SaaS প্ল্যাটফর্মে এটি অপরিহার্য কারণ: প্রতিটি ক্লায়েন্টের জন্য আলাদা সার্ভার ও ডাটাবেজ বসালে ক্লাউড বিল ও মেইনটেন্যান্স খরচ কোটি টাকায় পৌঁছে যাবে; মাল্টি-টেন্যান্সিতে একক কোডবেজ ও সেন্ট্রালাইজড ডেটাবেজে হাজার হাজার মার্চেন্টকে অত্যন্ত কম খরচে স্কেল করা যায়।",
          "b": "মাল্টি-টেন্যান্ট আর্কিটেকচারে একটি সফটওয়্যার ইনস্ট্যান্স একাধিক ক্লায়েন্ট বা সংস্থাকে আলাদা আলাদাভাবে সেবা দেয় এবং প্রত্যেকের ডেটা সুরক্ষিত রাখে। ক্লাউড খরচ নিয়ন্ত্রণ ও এক জায়গা থেকে হাজার হাজার ক্লায়েন্ট পরিচালনা করতে এটি অপরিহার্য।",
          "e": "Multi-tenancy is an architectural model where a single software instance serves multiple distinct customer organizations (tenants), maintaining strict logical or physical data boundaries. It is foundational to SaaS economics, enabling centralized deployments, automated patching, and cost efficiencies.",
          "tip": "বলো: 'Multi-tenancy serves multiple independent customers from a unified infrastructure while strictly isolating their data.'"
        },
        {
          "lvl": "lvl1",
          "q": "Multi-Tenant Database ডিজাইনের মূল ৩টি মডেল কী কী?",
          "m": "৩টি মডেল: (১) `Shared Database, Shared Schema (Discriminator Column)`: সবাই একই ডেটাবেজ ও একই টেবিলে থাকে, প্রতিটি রো-তে একটি `tenant_id` কলাম থাকে (সর্বোচ্চ কম খরচ, সর্বাধিক স্কেলযোগ্য, Dokani-তে ব্যবহৃত)। (২) `Shared Database, Separate Schema`: সবাই একই ডেটাবেজে থাকে কিন্তু প্রতিটি টেন্যান্টের জন্য আলাদা PostgreSQL Schema তৈরি করা হয় (যেমন `tenant_1.invoices`, `tenant_2.invoices`)। (৩) `Database-per-Tenant`: প্রতিটি গ্রাহকের জন্য সম্পূর্ণ আলাদা স্বাধীন ডেটাবেজ ইনস্ট্যান্স (সর্বোচ্চ আইসোলেশন ও সর্বোচ্চ খরচ, বড় এন্টারপ্রাইজ ব্যাংকিং ক্লায়েন্টদের জন্য প্রযোজ্য)।",
          "b": "তিনটি মডেল: (১) শেয়ার্ড ডিবি ও শেয়ার্ড স্কিমা (কলামে tenant_id দিয়ে ভাগ), (২) শেয়ার্ড ডিবি ও পৃথক স্কিমা (প্রতি টেন্যান্টের আলাদা স্কিমা), এবং (৩) ডেটাবেজ-পার-টেন্যান্ট (প্রতি ক্লায়েন্টের জন্য আলাদা ডাটাবেজ)।",
          "e": "The three primary multi-tenant database patterns: (1) Shared DB, Shared Schema (pooled tables separated via tenant_id column), (2) Shared DB, Separate Schema (isolated namespaces per tenant), and (3) Database-per-Tenant (isolated database instances per tenant).",
          "tip": "ইন্টারভিউতে ৩টি মডেলের নাম ও তাদের খরচ-নিরাপত্তা ব্যালেন্স সুন্দর করে তুলে ধরবে।"
        },
        {
          "lvl": "lvl1",
          "q": "'Shared Database, Shared Schema' মডেলের সুবিধা ও প্রধান ঝুঁকি কী?",
          "m": "সুবিধা: (১) অবকাঠামোগত খরচ সর্বনিম্ন (একটি মাত্র ডেটাবেজ সার্ভারেই হাজার হাজার টেন্যান্ট রাখা যায়), (২) নতুন গ্রাহক অনবোর্ডিং ইনস্ট্যান্ট (কোনো নতুন ডাটাবেজ তৈরি করতে হয় না), (৩) ডেটাবেজ মাইগ্রেশন ও স্কিমা আপডেট এক কমান্ডেই সবার জন্য হয়ে যায়। প্রধান ঝুঁকি: কোনো ডেভেলপার যদি কোনো SQL কুয়েরিতে ভুলবশত `WHERE tenant_id = $1` দিতে ভুলে যায়, তবে এক দোকানের কাস্টমার অন্য দোকানের গোপনীয় ডেটা বা সেলস রিপোর্ট দেখতে পাবে (Catastrophic Cross-Tenant Data Leak)! এই ঝুঁকি দূর করতেই Postgres Row-Level Security (RLS) ব্যবহার করা হয়।",
          "b": "সুবিধা হলো সর্বনিম্ন খরচ এবং সহজ অনবোর্ডিং। প্রধান ঝুঁকি হলো কোডে কোথাও tenant_id ফিল্টার মিস হলে এক ক্লায়েন্টের ডেটা অন্য ক্লায়েন্টের কাছে ফাঁস হয়ে যেতে পারে।",
          "e": "Advantages: Minimal hosting costs, rapid tenant onboarding, and unified schema migrations. Primary Risk: The catastrophic danger of cross-tenant data leakage if an application engineer accidentally omits the WHERE tenant_id predicate in raw queries.",
          "code": "-- Dangerous if tenant_id omitted:\nSELECT * FROM invoices WHERE id = $1; \n-- Must ALWAYS be:\nSELECT * FROM invoices WHERE id = $1 AND tenant_id = $2;"
        },
        {
          "lvl": "lvl1",
          "q": "PostgreSQL Row-Level Security (RLS) কী এবং এটি মাল্টি-টেন্যান্সি কীভাবে সুরক্ষিত করে?",
          "m": "PostgreSQL Row-Level Security (RLS) হলো ডেটাবেজ ইঞ্জিনের বিল্ট-ইন সিকিউরিটি পলিসি মেকানিজম। এটি সক্রিয় থাকলে ডেটাবেজ নিজেই প্রতিটি কুয়েরিতে স্বয়ংক্রিয়ভাবে শর্ত পরীক্ষা করে—এমনকি যদি ডেভেলপার কোডে `WHERE tenant_id = $1` নাও লেখে, তবুও ডেটাবেজ ইঞ্জিন অন্য কোনো টেন্যান্টের রো রিটার্ন করবে না! অ্যাপ্লিকেশন কানেকশনে বর্তমান ইউজারের টেন্যান্ট আইডি সেশন ভ্যারিয়েবলে সেট করা হয় (`SET LOCAL app.current_tenant_id = 't1'`), এবং RLS পলিসি কেবল সেই টেন্যান্টের ডেটা ফিল্টার করে দেয়।",
          "b": "পোস্টগ্রেস RLS হলো ডাটাবেজ স্তরের সুরক্ষা নীতি যা স্বয়ংক্রিয়ভাবে কুয়েরিতে নিরাপত্তা শর্ত প্রয়োগ করে। ফলে ডেভেলপার কোডে শর্ত লিখতে ভুলে গেলেও এক টেন্যান্টের ডেটা অন্য টেন্যান্ট কখনোই দেখতে পারে না।",
          "e": "PostgreSQL Row-Level Security (RLS) enforces granular row-filtering policies at the database kernel level. Once enabled, PostgreSQL automatically restricts queries to matching tenant rows using session variables (SET LOCAL app.current_tenant_id), guaranteeing complete data isolation even against developer coding errors.",
          "code": "ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;\nCREATE POLICY tenant_isolation_policy ON invoices\nFOR ALL USING (tenant_id = current_setting('app.current_tenant_id', true));"
        },
        {
          "lvl": "lvl1",
          "q": "টেন্যান্ট শনাক্তকরণ (Tenant Identification): ইনকামিং এপিআই রিকোয়েস্টে টেন্যান্ট কীভাবে শনাক্ত করা হয়?",
          "m": "৩টি প্রধান উপায়: (১) `Subdomain Routing`: প্রতিটি টেন্যান্টের জন্য সাবডোমেন বরাদ্দ থাকে (যেমন `aroma.dokani.com` বা `bata.dokani.com`)। এপিআই মিডলওয়্যার রিকোয়েস্টের Host হেডার থেকে সাবডোমেন রিড করে টেন্যান্ট আইডি বের করে। (২) `JWT Token Claim`: ইউজারের লগইনের পর প্রাপ্ত JWT-তে `{ tenantId: 'uuid', role: 'ADMIN' }` ক্ল্যাম সংরক্ষিত থাকে। (৩) `Custom Request Header`: মোবাইল অ্যাপ বা থার্ড পার্টি ইন্টিগ্রেশনে `x-tenant-id` হেডার পাঠানো হয়। প্রডাকশনে সাবডোমেন এবং ভেরিফাইড JWT ক্ল্যামের সমন্বয় সবচেয়ে নিরাপদ।",
          "b": "রিকোয়েস্টের সাবডোমেন (subdomain.domain.com), JWT টোকেনের ভেতরের tenantId ক্লেইম, অথবা x-tenant-id রিকোয়েস্ট হেডার থেকে মিডলওয়্যার দিয়ে টেন্যান্ট শনাক্ত করা হয়।",
          "e": "Tenants are resolved via: Subdomain parsing (tenant.saas.com from HTTP Host headers), verified JWT payload claims ({ tenantId }), or custom HTTP request headers (x-tenant-id). Combining subdomains with cryptographically verified JWT claims provides enterprise-grade security.",
          "code": "// Express Middleware:\nconst tenantId = req.user?.tenantId || extractSubdomain(req.headers.host);"
        },
        {
          "lvl": "lvl2",
          "q": "Prisma ORM-এ Client Extensions ব্যবহার করে স্বয়ংক্রিয়ভাবে `tenantId` ইনজেকশন কীভাবে করবে?",
          "m": "Prisma v4.7+ এ `$extends` মেকানিজম দিয়ে আমরা ক্লায়েন্ট-লেভেলে কুয়েরি ইন্টারসেপ্ট করতে পারি। একটি এক্সটেনশন ডিফাইন করি যা প্রতিটি মডেলের `findMany`, `findFirst`, `create`, `update`, `delete` অপারেশনে অটোমেটিক বর্তমান কন্টেক্সটের `tenantId` ইনজেক্ট করে। ফলে কন্ট্রোলারে ডেভেলপারকে বারবার ম্যানুয়ালি `{ where: { tenantId } }` লিখতে হয় না এবং মানবীয় ভুলের কারণে ডেটা লিক হওয়ার সম্ভাবনা ১০০% শূন্যে নেমে আসে।",
          "b": "প্রিজমা ক্লায়েন্ট এক্সটেনশন দিয়ে প্রতিটি কুয়েরিতে স্বয়ংক্রিয়ভাবে tenantId ইনজেক্ট করা যায়। ফলে কোডে বারবার ফিল্টার লিখতে হয় না এবং কোনো ডেটা লিক ঘটে না।",
          "e": "Leverage Prisma Client Extensions ($extends) to intercept query execution. The extension injects { where: { tenantId } } on reads/mutations and automatically attaches data: { tenantId } on creates, eliminating human error.",
          "code": "const prismaWithTenant = (tenantId: string) => {\n  return prisma.$extends({\n    query: {\n      $allModels: {\n        async findMany({ args, query }) {\n          args.where = { ...args.where, tenantId };\n          return query(args);\n        }\n      }\n    }\n  });\n};"
        },
        {
          "lvl": "lvl2",
          "q": "PostgreSQL-এ 'Schema-per-Tenant' আর্কিটেকচারে `search_path` কীভাবে ব্যবহার করা হয় এবং এর অসুবিধা কী?",
          "m": "এই মডেলে প্রতিটি টেন্যান্টের জন্য আলাদা স্কিমা থাকে (`CREATE SCHEMA tenant_a; CREATE SCHEMA tenant_b;`)। রিকোয়েস্ট আসার পর ডাটাবেজ সেশনে কমান্ড পাঠানো হয় `SET search_path TO tenant_a, public;`। এরপর স্বাভাবিক `SELECT * FROM invoices;` চালালে পোস্টগ্রেস স্বয়ংক্রিয়ভাবে `tenant_a`-এর টেবিল থেকে ডেটা পড়ে। সুবিধা: টেবিল কলামে কোনো `tenant_id` লাগে না। অসুবিধা: (১) টেন্যান্ট সংখ্যা ১০০০ ছাড়িয়ে গেলে ডেটাবেজে লক্ষ লক্ষ টেবিল তৈরি হয়ে পোস্টগ্রেসের ইন্টারনাল ক্যাটালগ ও মেমোরি ব্লোট হয়, (২) প্রতিবার স্কিমা মাইগ্রেশন চালাতে শত শত স্কিমায় পৃথক মাইগ্রেশন স্ক্রিপ্ট ঘুরতে গিয়ে ঘণ্টার পর ঘণ্টা সময় লাগে।",
          "b": "search_path পরিবর্তন করে প্রতিটি টেন্যান্টের আলাদা স্কিমা সিলেক্ট করা হয়। তবে হাজার হাজার ক্লায়েন্ট থাকলে লক্ষাধিক টেবিল তৈরি হয়ে ডেটাবেজ স্লো হয় এবং মাইগ্রেশন করা অত্যন্ত কঠিন হয়ে পড়ে।",
          "e": "Schema-per-tenant leverages PostgreSQL search_path (SET search_path TO tenant_x). However, this scales poorly beyond hundreds of tenants because maintaining tens of thousands of tables bloats PostgreSQL system catalogs and makes schema migrations excruciatingly slow.",
          "code": "SET search_path TO tenant_123, public;\nSELECT * FROM invoices; -- Queries tenant_123.invoices automatically"
        },
        {
          "lvl": "lvl2",
          "q": "PostgreSQL RLS-এ `current_setting('app.current_tenant_id')` কীভাবে ট্রানজ্যাকশন কানেকশনে পুলে লিক হওয়া ছাড়া সেট করবে?",
          "m": "কানেকশন পুলিং (যেমন PgBouncer) ব্যবহার করার সময় যদি আপনি `SET app.current_tenant_id = 't1'` রান করেন, তবে কানেকশন পুলে ফেরত যাওয়ার পর অন্য কোনো ইউজার ওই কানেকশনটি পেলে আগের টেন্যান্টের আইডি রয়ে যেতে পারে! সমাধান: সবসময় `SET LOCAL` ব্যবহার করতে হবে একটি ট্রানজ্যাকশনের ভেতরে (`SET LOCAL app.current_tenant_id = 't1'`)। `SET LOCAL` নিশ্চিত করে যে ট্রানজ্যাকশন শেষ (COMMIT বা ROLLBACK) হওয়ার সাথে সাথেই সেশন ভ্যারিয়েবলটি মেমোরি থেকে মুছে যায় এবং কানেকশনটি শতভাগ ক্লিন অবস্থায় পুলে ফেরত যায়।",
          "b": "কানেকশন পুলে ডেটা লিক এড়াতে ট্রানজ্যাকশনের মধ্যে সর্বদা SET LOCAL app.current_tenant_id ব্যবহার করতে হয়। ট্রানজ্যাকশন শেষ হলেই এই মানটি স্বয়ংক্রিয়ভাবে মুছে যায়।",
          "e": "In connection-pooled environments, standard SET bleeds state across subsequent sessions. Always invoke SET LOCAL app.current_tenant_id inside an explicit transaction block; SET LOCAL automatically reverts to default upon COMMIT or ROLLBACK.",
          "code": "BEGIN;\nSELECT set_config('app.current_tenant_id', 'tenant-uuid-123', true);\nSELECT * FROM sensitive_invoices; -- Strictly scoped to tenant-uuid-123\nCOMMIT;"
        },
        {
          "lvl": "lvl2",
          "q": "MongoDB-তে Multi-Tenant Data Isolation কীভাবে অর্জিত হয়?",
          "m": "MongoDB-তে দুটি মূল অ্যাপ্রোচ: (১) `Single Database, Tenant-ID Field (সবচেয়ে জনপ্রিয়)`: প্রতিটি কালেকশনের প্রতি ডকুমেন্টে `tenantId: ObjectId` ফিল্ড রাখা হয় এবং সব কুয়েরিতে ফিল্টার দেওয়া হয়। এটি সুরক্ষিত রাখতে Mongoose-এ একটি গ্লোবাল প্লাগইন ব্যবহার করে `pre(/^find/)` হুকে স্বয়ংক্রিয়ভাবে `{ tenantId }` যুক্ত করা হয়। কম্পাউন্ড ইনডেক্স `{ tenantId: 1, ... }` দিয়ে কুয়েরি ফাস্ট রাখা হয়। (২) `Database-per-Tenant`: ক্লাউড নোসিবল কালেকশন ম্যানেজ করার জন্য রানটাইমে `mongoose.connection.useDb('tenant_' + id)` ব্যবহার করে ডাইনামিকালি ডাটাবেজ সুইচ করা হয়।",
          "b": "মঙ্গোডিবির ক্ষেত্রে ডকুমেন্টে tenantId ফিল্ড রেখে Mongoose প্লাগইন দিয়ে স্বয়ংক্রিয়ভাবে ফিল্টার করা হয়। অথবা useDb() মেথড দিয়ে প্রতিটি টেন্যান্টের জন্য আলাদা নো-এসকিউএল ডেটাবেজে সুইচ করা হয়।",
          "e": "MongoDB isolation predominantly relies on an indexed tenantId discriminator field, reinforced via Mongoose query middleware plugins that enforce tenant scopes globally. High-isolation architectures employ dynamic database switching via connection.useDb().",
          "code": "const tenantDb = mongoose.connection.useDb(`tenant_${tenantId}`, { useCache: true });\nconst TenantOrder = tenantDb.model('Order', orderSchema);"
        },
        {
          "lvl": "lvl2",
          "q": "Multi-Tenant সিস্টেমে 'Noisy Neighbor Problem' কী এবং ডেটাবেজ লেভেলে এটি কীভাবে নিয়ন্ত্রণ করবে?",
          "m": "Noisy Neighbor Problem ঘটে যখন শেয়ার্ড ডেটাবেজে কোনো একজন দানবীয় টেন্যান্ট (যেমন লাখ লাখ পণ্য ও সারাদিন বাল্ক কুয়েরি চালানো বড় মার্চেন্ট) ডেটাবেজের ৯০% সিপিইউ, র‍্যাম ও আইওপিএস দখল করে ফেলে—যার ফলে অন্য সাধারণ ছোট টেন্যান্টদের অ্যাপ্লিকেশন ধীরগতির বা ডাউন হয়ে যায়। সমাধান: (১) এপিআই লেভেলে টেন্যান্টভিত্তিক Rate Limiting (Redis Token Bucket) বসানো। (২) ডেটাবেজ লেভেলে কুয়েরি স্টেটমেন্ট টাইমআউট সেট করা (`statement_timeout = '3s'`)। (৩) যদি কোনো টেন্যান্ট অত্যধিক বড় হয়ে যায়, তবে তাকে শেয়ার্ড ক্লাস্টার থেকে মাইগ্রেট করে একটি ডেডিকেটেড ডাটাবেজ ইনস্ট্যান্সে স্থানান্তর করা।",
          "b": "নয়েজি নেইবার সমস্যা হলো একটি বড় ক্লায়েন্ট সব সিপিইউ ও মেমোরি খরচ করে বাকি ক্লায়েন্টদের সিস্টেম স্লো করে দেওয়া। রেট লিমিটিং, কুয়েরি টাইমআউট এবং বড় ক্লায়েন্টকে আলাদা সার্ভারে স্থানান্তরের মাধ্যমে এটি প্রতিরোধ করা হয়।",
          "e": "The Noisy Neighbor problem occurs when one high-volume tenant starves shared database CPU and I/O resources, degrading latency for all other tenants. Mitigate via tenant-tier rate limiters, strict database statement_timeouts, and migrating hyper-scale tenants to dedicated single-tenant tiers.",
          "tip": "বলো: 'We prevent noisy neighbors using tenant rate limits, statement timeouts, and isolated enterprise tiers.'"
        },
        {
          "lvl": "lvl3",
          "q": "PostgreSQL RLS-এ পারফরম্যান্স ড্রপ এড়াতে ইনডেক্সিং এবং পলিসি অপটিমাইজেশন কীভাবে সাজাতে হয়?",
          "m": "ভুলভাবে লেখা RLS পলিসি কুয়েরি পারফরম্যান্স ১০০ গুণ স্লো করে দিতে পারে। অপটিমাইজেশনের গোল্ডেন রুলস: (১) প্রতিটি RLS প্রোটেক্টেড টেবিলে `tenant_id` অবশ্যই ইনডেক্সের সবার শুরুতে থাকতে হবে: `CREATE INDEX idx_tbl_tenant_id ON tbl (tenant_id, ...)`, (২) RLS পলিসির ভেতরে কখনোই কোনো সাব-কুয়েরি (`SELECT id FROM tenants WHERE ...`) চালানো যাবে না! এর বদলে মেমোরিতে থাকা সেশন ভ্যারিয়েবল বা JWT ক্লেইম ব্যবহার করতে হবে (`current_setting()`), (৩) ফাংশন ব্যবহারের সময় নিশ্চিত করতে হবে ফাংশনটি যেন `LEAKPROOF` ও `STABLE` মার্ক করা থাকে যাতে পোস্টগ্রেস অপটিমাইজার ইনডেক্স স্ক্যান পুশ-ডাউন করতে পারে।",
          "b": "RLS যাতে কুয়েরি স্লো না করে সেজন্য tenant_id দিয়ে প্রিফিক্স ইনডেক্স তৈরি করতে হয়, পলিসির ভেতর কোনো ভারী সাব-কুয়েরি না রেখে মেমোরি সেশন ভ্যারিয়েবল ব্যবহার করতে হয় এবং ফাংশন STABLE মার্ক করতে হয়।",
          "e": "Poorly tuned RLS degrades throughput. Optimize by creating leading B-Trees on (tenant_id, ...), avoiding correlated subqueries within USING clauses, and relying exclusively on lightweight session settings (current_setting) evaluated without table lookups.",
          "code": "CREATE POLICY tenant_fast_rls ON orders\nFOR ALL USING (tenant_id = (current_setting('app.tenant_id'))::uuid);"
        },
        {
          "lvl": "lvl3",
          "q": "Multi-Tenant সিস্টেমে ব্যাকগ্রাউন্ড প্রসেসিং ও অ্যাসিনক্রোনাস জব কিউ (BullMQ/RabbitMQ)-তে Tenant Context কীভাবে সংরক্ষণ ও প্রপাগেট করবে?",
          "m": "এপিআই রিকোয়েস্টের সময় টেন্যান্ট আইডি HTTP হেডারে থাকে, কিন্তু ব্যাকগ্রাউন্ড জবে কোনো HTTP রিকোয়েস্ট থাকে না! সমাধান: যখনই এপিআই কোনো ব্যাকগ্রাউন্ড জব এনকিউ (Enqueue) করে, জবের পে-লোডের মেটাডেটাতে অবশ্যই `{ tenantId: req.tenantId, userId: req.userId }` বাধ্যতামূলকভাবে পুশ করতে হবে। BullMQ ওয়ার্কার যখন প্রসেসিং শুরু করবে, সে জবের ডেটা থেকে `tenantId` রিড করবে এবং ডেটাবেজ ট্রানজ্যাকশন শুরু করে `SET LOCAL app.current_tenant_id` কনফিগার করে কাজ শুরু করবে। কোনো জব যদি `tenantId` ছাড়া আসে, ওয়ার্কার তাৎক্ষণিক জব রিজেক্ট করবে।",
          "b": "ব্যাকগ্রাউন্ড জবে কোনো HTTP হেডার না থাকায় জবের ডেটা পে-লোডে বাধ্যতামূলকভাবে tenantId পাস করা হয়। ওয়ার্কার কাজ শুরু করার আগে ডাটাবেজ সেশনে সেই tenantId সেট করে কাজ করে।",
          "e": "Since asynchronous workers lack HTTP request headers, the publishing API must explicitly embed { tenantId } into the job payload metadata. Worker consumers extract tenantId and inject it into the database session context before executing the background task.",
          "code": "// Producer:\nawait invoiceQueue.add('SEND_PDF', { invoiceId, tenantId: req.tenantId });\n// Worker:\ninvoiceQueue.process(async (job) => {\n  const { tenantId } = job.data;\n  await runInTenantContext(tenantId, async () => { ... });\n});"
        },
        {
          "lvl": "lvl3",
          "q": "Node.js-এ `AsyncLocalStorage` ব্যবহার করে থ্রেড-সেফ এবং মিডলওয়্যার-লেভেল Tenant Context ট্র্যাকিং কীভাবে তৈরি করবে?",
          "m": "`AsyncLocalStorage` (Node.js `async_hooks` মডিউল) অ্যাসিনক্রোনাস এক্সিকিউশন চেইনে কনটেক্সট ট্র্যাকিংয়ের জন্য তৈরি। প্রতিটি এপিআই রিকোয়েস্ট আসার পর মিডলওয়্যার টেন্যান্ট আইডি এক্সট্র্যাক্ট করে `tenantStorage.run({ tenantId }, () => next())` এক্সিকিউট করে। এর ফলে সম্পূর্ণ অ্যাসিনক্রোনাস কল স্ট্যাকের যেকোনো সার্ভিস, রিপোজিটরি বা ইউটিলিটি ফাংশনে প্যারামিটার পাস না করেই সরাসরি `tenantStorage.getStore()?.tenantId` দিয়ে সঠিক টেন্যান্ট পাওয়া যায়। এটি নোডের সিঙ্গেল-থ্রেডেড ইভেন্ট লুপেও সম্পূর্ণ আইসোলেটেড ও ১০০% কনকারেন্সি-সেফ।",
          "b": "AsyncLocalStorage প্যারামিটার পাস করা ছাড়াই পুরো অ্যাসিনক্রোনাস কোডবেজে টেন্যান্ট আইডি অ্যাক্সেস করার সুবিধা দেয়। এটি কোনো ডেটা ওভারল্যাপ ছাড়া শতভাগ কনকারেন্সি-সেফ।",
          "e": "AsyncLocalStorage creates execution context stores that persist across asynchronous call chains without manual parameter passing. Express middleware runs the request lifecycle inside asyncLocalStorage.run({ tenantId }), providing zero-risk thread-safe tenant context access across deep service layers.",
          "code": "import { AsyncLocalStorage } from 'async_hooks';\nexport const tenantContext = new AsyncLocalStorage<{ tenantId: string }>();\n// Middleware:\napp.use((req, res, next) => {\n  tenantContext.run({ tenantId: req.tenantId }, () => next());\n});\n// Service:\nconst currentTenant = tenantContext.getStore()?.tenantId;"
        },
        {
          "lvl": "lvl3",
          "q": "Multi-Tenant ডেটা মাইগ্রেশন: ১,০০০ টেন্যান্টের শেয়ার্ড ডেটাবেজে স্কিমা মাইগ্রেশন করার সময় জিরো ডাউনটাইম কীভাবে নিশ্চিত করবে?",
          "m": "শেয়ার্ড স্কিমা মডেলে সুবিধা হলো একটি মাত্র মাইগ্রেশন চালালেই সব টেন্যান্ট আপডেট হয়ে যায়। কিন্তু যাতে কোনো ডাউনটাইম বা টেবিল লক না হয়, সেজন্য 'Expand and Contract' প্যাটার্ন মানতে হবে: (১) নতুন কলাম যুক্ত করার সময় `DEFAULT` ভ্যালু সহ নাল-অ্যালাউড (`NULLABLE`) হিসেবে যোগ করা, (২) ব্যাকওয়ার্ড কমপ্যাটিবল কোড ডিপ্লয় করা যা পুরনো ও নতুন কলাম উভয়ই পড়তে পারে, (৩) ব্যাকগ্রাউন্ড মাইগ্রেশন দিয়ে পুরনো ডেটা ব্যাকফিল করা, (৪) সবশেষে `NOT NULL` কনস্ট্রেইন্ট যোগ করা এবং অপ্রয়োজনীয় পুরনো কলাম ড্রপ করা। কখনোই প্রোডাকশনে সরাসরি কলাম রিনেম বা ড্রপ করা যাবে না।",
          "b": "জিরো ডাউনটাইম মাইগ্রেশনের জন্য Expand and Contract প্যাটার্ন অনুসরণ করা হয়। প্রথমে নতুন কলাম ব্যাকওয়ার্ড কমপ্যাটিবল হিসেবে যোগ করে ব্যাকগ্রাউন্ডে ডেটা মাইগ্রেট করা হয় এবং পরে পুরনো কলাম রিমুভ করা হয়।",
          "e": "Execute zero-downtime migrations in multi-tenant shared schemas using the Expand and Contract pattern: add non-blocking nullable columns, deploy code supporting both schemas, backfill tenant data asynchronously, enforce NOT NULL constraints, and finally decommission deprecated columns.",
          "tip": "ইন্টারভিউতে 'Expand and Contract database migration pattern' উল্লেখ করবে।"
        },
        {
          "lvl": "lvl3",
          "q": "SaaS প্ল্যাটফর্মে GDPR বা ডেটা কমপ্লায়েন্স: কোনো ক্লায়েন্ট সাবস্ক্রিপশন ক্যানসেল করলে শেয়ার্ড ডেটাবেজ থেকে তার সম্পূর্ণ ডেটা কীভাবে ক্রিপ্টোগ্রাফিকালি বা ফিজিক্যালি মুছবে?",
          "m": "শেয়ার্ড টেবিলে লাখ লাখ রোর মাঝে শুধু একজন টেন্যান্টের ডেটা `DELETE` চালানো পারফরম্যান্সের ওপর প্রেশার ফেলতে পারে এবং ব্যাকআপ ফাইলে তার ডেটা রয়ে যেতে পারে। সমাধান: (১) `Crypto-Shredding`: প্রতিটি টেন্যান্টের ডেটা তার নিজস্ব অনন্য সিমেট্রিক এনক্রিপশন কি (KMS-এ সংরক্ষিত Tenant Key) দিয়ে এনক্রিপ্ট করে সেভ করা হয়। ক্লায়েন্ট সাবস্ক্রিপশন বাতিল করলে আমরা শুধু KMS থেকে ওই টেন্যান্টের এনক্রিপশন কি ডিলিট বা পার্জ করে দিই! ফলে মূল ডেটাবেজ এবং পূর্বের ব্যাকআপের সমস্ত ডেটা তাৎক্ষণিকভাবে অপ্রবেশ্য ও পাঠ-অযোগ্য হয়ে যায় (Cryptographic Erasure)। (২) এরপর ব্যাকগ্রাউন্ড ব্যাচ স্ক্রিপ্ট দিয়ে নিরাপদে তার রো-গুলো ডিলিট ও ভ্যাকুয়াম করা হয়।",
          "b": "ক্রিপ্টো-শ্রেডিং পদ্ধতিতে প্রতিটি টেন্যান্টের ডেটা আলাদা এনক্রিপশন কি দিয়ে সেভ থাকে। ক্লায়েন্ট ক্যান্সেল করলে কেবল ওই কি ডিলিট করলেই ডেটাবেজ ও ব্যাকআপ ফাইল উভয়ের ডেটা চিরতরে অপ্রবেশ্য হয়ে যায়।",
          "e": "Implement Crypto-Shredding for multi-tenant GDPR compliance: each tenant's sensitive columns are encrypted using a unique Tenant Encryption Key managed in AWS/GCP KMS. Erasing the tenant's KMS key instantly renders their data cryptographically unrecoverable across all active databases and historical backups.",
          "tip": "ইন্টারভিউতে 'Crypto-shredding guarantees multi-tenant GDPR compliance across backups' চমৎকার পয়েন্ট।"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: সিকিউরিটি অডিটে দেখা গেল একজন অথেনটিকেটেড ইউজার ব্রাউজারের DevTools থেকে রিকোয়েস্ট বডিতে `{ tenantId: 'victim-company-id' }` বসিয়ে অন্যের ডাটাবেজে প্রোডাক্ট তৈরি করতে সক্ষম হয়েছে! কোডে কোথায় ফাঁক ছিল এবং কীভাবে বন্ধ করবে?",
          "m": "মারাত্মক দুর্বলতা: কন্ট্রোলার বা সার্ভিস লেভেলে রিকোয়েস্ট বডির ওপর অন্ধবিশ্বাস করা হয়েছিল (`const { tenantId } = req.body`)! কোনো হ্যাকার রিকোয়েস্ট বডিতে যেকোনো টেন্যান্ট আইডি বসাতে পারে। সমাধান: (১) ক্লায়েন্ট বা রিকোয়েস্ট বডি থেকে আসা কোনো `tenantId` গ্রহণ করা সম্পূর্ণ নিষিদ্ধ করতে হবে। (২) Zod স্কিমায় রিকোয়েস্ট বডি থেকে `tenantId` ফিল্ডকে স্ট্রিপ বা ডিস-অ্যালাউ করতে হবে। (৩) এপিআইতে `tenantId` শুধুমাত্র ক্রিপ্টোগ্রাফিক্যালি ভ্যালিডেটেড JWT টোকেন থেকে রিড করে সার্ভার-সাইডে ইনজেক্ট করতে হবে: `const tenantId = req.user.tenantId`।",
          "b": "ক্লায়েন্ট সাইড থেকে পাঠানো রিকোয়েস্ট বডির tenantId বিশ্বাস করার কারণে এই নিরাপত্তা ত্রুটি ঘটেছে। বডি থেকে tenantId নেওয়া নিষিদ্ধ করে শুধুমাত্র ভেরিফায়েড JWT টোকেন থেকে সার্ভার সাইডে টেন্যান্ট আইডি ইনজেক্ট করতে হবে।",
          "e": "The vulnerability stems from trusting user-controlled request payload bodies for tenant scoping. Strip tenantId from incoming schemas via Zod, and inject tenantId exclusively on the server from cryptographically verified JWT authentication tokens (req.user.tenantId).",
          "code": "// Vulnerable: const { tenantId } = req.body;\n// Secure: Enforce server-side identity injection\nconst newProduct = await prisma.product.create({\n  data: { ...validatedBody, tenantId: req.user.tenantId }\n});"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: Dokani POS-এ একজন মার্চেন্টের দোকান থেকে অন্য দোকানের রিপোর্ট দেখার অভিযোগ এসেছে। ইনভেস্টিগেট করে দেখলে কোনো এক ডেভেলপার `prisma.$queryRaw` ব্যবহার করে র কুয়েরি লিখেছিল কিন্তু `tenant_id` ফিল্টার দিতে ভুলে গেছে! কীভাবে ভবিষ্যতে এমন ভুল কোড রিভিউ ছাড়া স্বয়ংক্রিয়ভাবে ব্লক করবে?",
          "m": "সমাধানের ধাপ: (১) ডাটাবেজ লেভেলে অবিলম্বে PostgreSQL Row-Level Security (RLS) সক্রিয় করতে হবে—যাতে কোনো ডেভেলপার র কুয়েরিতে `tenant_id` মিস করলেও ডাটাবেজ ইঞ্জিন অন্য কোনো টেন্যান্টের ডেটা কখনোই রিটার্ন না করে। (২) ESLint কাস্টম রুল বা SonarQube গেট বসানো যাতে কোডে আন-গার্ডেড `$queryRaw` সরাসরি ব্যবহার নিষিদ্ধ থাকে এবং শুধুমাত্র টেস্টেড ও ভ্যালিডেটেড টাইপ-সেফ রিপোজিটরি মেথড ব্যবহারে বাধ্য করে।",
          "b": "পোস্টগ্রেস RLS সক্রিয় করলে র কুয়েরিতে শর্ত মিস হলেও ডেটাবেজ লেভেলে ডেটা লিক ঠেকানো যায়। পাশাপাশি ESLint ও সোনারকিউব রুল দিয়ে আন-গার্ডেড কুয়েরি লেখা স্বয়ংক্রিয়ভাবে ব্লক করতে হবে।",
          "e": "Mitigate by activating PostgreSQL Row-Level Security (RLS) across all multi-tenant tables; RLS ensures that even flawed raw SQL queries strictly return rows matching the active tenant. In addition, establish static AST linting rules forbidding naked $queryRaw usage in PRs.",
          "code": "ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;\nCREATE POLICY tenant_strict ON invoices\nFOR ALL USING (tenant_id = current_setting('app.tenant_id')::uuid);"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একজন এন্টারপ্রাইজ ক্লায়েন্ট দাবি করেছে তাদের সংবেদনশীল ডেটা কোনোভাবেই অন্য কোনো কোম্পানির সাথে একই টেবিলে রাখা যাবে না, কিন্তু তোমার সম্পূর্ণ সিস্টেম 'Shared Database Shared Schema' মডেলে তৈরি। পুরো কোডবেজ রিরাইট না করে কীভাবে তাদের অনবোর্ড করবে?",
          "m": "হাইব্রিড সমাধান: পুরো কোড রিরাইট করার দরকার নেই! (১) ডেটাবেজ কানেকশন ফ্যাক্টরি তৈরি করি যা টেন্যান্ট টাইপ চেক করে (`tenant.tier === 'ENTERPRISE'`)। (২) সাধারণ ক্লায়েন্টদের জন্য ডিফল্ট শেয়ার্ড ডেটাবেজ পুল ব্যবহার করা হবে। (৩) এন্টারপ্রাইজ ক্লায়েন্টের জন্য একটি পৃথক প্রাইভেট ডেটাবেজ ইনস্ট্যান্স প্রভিশন করে কানেকশন পুল ক্যাশে তার জন্য ডেডিকেটেড Prisma Client ইনস্ট্যান্স অ্যাসাইন করব। (৪) একই অ্যাপ্লিকেশন কোডবেজ ও বিজনেস লজিক কোনো পরিবর্তন ছাড়াই স্বচ্ছভাবে উভয় ডেটাবেজে এক্সিকিউট হবে।",
          "b": "কানেকশন ফ্যাক্টরি ব্যবহার করে সাধারণ ক্লায়েন্টদের শেয়ার্ড ডিবিতে এবং এন্টারপ্রাইজ ক্লায়েন্টকে ডেডিকেটেড প্রাইভেট ডিবিতে রুট করব। একই বিজনেস লজিক কোনো রিরাইট ছাড়াই উভয় ডিবি হ্যান্ডেল করতে পারবে।",
          "e": "Implement a Dynamic Connection Router without touching business logic: standard tenants route to the shared connection pool, while enterprise tenants resolve to an isolated database connection URL based on tenant metadata. The domain services execute identically on both clients.",
          "code": "function getPrismaClient(tenant: Tenant) {\n  if (tenant.databaseUrl) {\n    return getDedicatedClient(tenant.databaseUrl);\n  }\n  return sharedPrismaClient;\n}"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ১০,০০০ টেন্যান্টের শেয়ার্ড টেবিলে `SELECT * FROM products WHERE tenant_id = 't1'` কুয়েরিটি স্লো হয়ে যাচ্ছে কারণ টেবিলে কোটি কোটি রো জমে গেছে। তুমি ইনডেক্সিং কীভাবে অপটিমাইজ করবে?",
          "m": "সমস্যার কারণ: হয়তো টেবিলে শুধু `id` বা অন্য কলামে ইনডেক্স ছিল, কিন্তু `tenant_id` দিয়ে লিডিং ইনডেক্স নেই। সমাধান: (১) প্রতিটি ইনডেক্সে `tenant_id`-কে সবার প্রথম কলাম (Leftmost prefix) করতে হবে: `CREATE INDEX idx_products_tenant_composite ON products (tenant_id, is_active, created_at DESC);`। (২) যদি কোটি কোটি রোর কারণে ইনডেক্স সাইজ RAM ছাড়িয়ে যায়, তবে PostgreSQL-এর `Declarative Table Partitioning` ব্যবহার করে `LIST (tenant_id)` অথবা `HASH (tenant_id)` দিয়ে টেবিলটিকে ফিজিক্যালি পার্টিশন করব। ফলে কুয়েরি শুধু নির্দিষ্ট পার্টিশনে হিট করবে এবং ইনডেক্স সাইজ ক্ষুদ্র থাকবে।",
          "b": "tenant_id কে প্রতিটি কম্পাউন্ড ইনডেক্সের শুরুতে রাখব। এছাড়া কোটি রোর টেবিলে PostgreSQL Declarative Partitioning দিয়ে টেন্যান্ট পার্টিশনিং করলে কুয়েরি শুধু নির্দিষ্ট ফাইলে হিট করে অতি দ্রুত চলবে।",
          "e": "Ensure tenant_id is the leftmost prefix across all compound indexes (tenant_id, is_active, created_at DESC). If the table scales into tens of millions of rows, implement PostgreSQL Declarative Table Partitioning by LIST or HASH on tenant_id for physical partition pruning.",
          "code": "CREATE TABLE products (\n  tenant_id UUID NOT NULL,\n  id UUID NOT NULL,\n  name TEXT\n) PARTITION BY LIST (tenant_id);"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: মাল্টি-টেন্যান্ট সিস্টেমে প্রতি টেন্যান্টের নিজস্ব ইনভয়েস নাম্বারিং সিকুয়েন্স থাকতে হবে (যেমন Dokani-তে দোকান A-র ইনভয়েস #1, #2 এবং একই সাথে দোকান B-রও ইনভয়েস #1, #2)। গ্লোবাল Auto-increment ছাড়া এটি কনকারেন্সি-সেফভাবে কীভাবে করবে?",
          "m": "সমাধান: গ্লোবাল সিরিয়াল ব্যবহার করলে এক দোকানের ইনভয়েস নম্বর অন্য দোকানের সাথে শেয়ার হবে এবং গ্যাপ তৈরি হবে। কনকারেন্সি-সেফ সমাধান: একটি `TenantSequences` টেবিল তৈরি করি যেখানে `(tenant_id, sequence_type)` ইউনিক কি থাকবে। নতুন ইনভয়েস তৈরির সময় ট্রানজ্যাকশনের মধ্যে অ্যাটমিকালি কল করব: `UPDATE tenant_sequences SET current_value = current_value + 1 WHERE tenant_id = $1 AND type = 'INVOICE' RETURNING current_value;`। এটি সম্পূর্ণ রো-লেভেল লকিংয়ে এক মিলিসেকেন্ডে পরবর্তী ইউনিক ইনভয়েস নম্বর তৈরি করে দেয় কোনো ডুপ্লিকেশন বা গ্যাপ ছাড়া।",
          "b": "TenantSequences টেবিলে প্রতিটি টেন্যান্টের জন্য আলাদা সিকুয়েন্স কাউন্টার রাখা হয়। ট্রানজ্যাকশনে UPDATE ... RETURNING current_value কল করে কনকারেন্সি-সেফ উপায়ে প্রতিটি দোকানের জন্য ১ থেকে ইনভয়েস নম্বর শুরু করা যায়।",
          "e": "Manage tenant-scoped invoice sequences via a dedicated TenantSequences table. Within the invoice transaction, atomically increment and return the counter using UPDATE tenant_sequences SET next_val = next_val + 1 WHERE tenant_id = $1 RETURNING next_val, eliminating collision risks.",
          "code": "const seq = await tx.$queryRaw`\n  UPDATE tenant_sequences \n  SET current_val = current_val + 1 \n  WHERE tenant_id = ${tId} AND seq_key = 'INVOICE'\n  RETURNING current_val;\n`;"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে হাজার হাজার খুচরা ও পাইকারি দোকানের জন্য মাল্টি-টেন্যান্সি ডেটা আইসোলেশন আর্কিটেকচার কীভাবে ডিজাইন করা হয়েছে?",
          "m": "দোকানি পিওএসে 'Shared Database, Shared Schema with Strict Multi-Tenancy' মডেল বাস্তবায়ন করা হয়েছে। প্রতিটি টেবিলে (Products, Invoices, Customers, Ledgers) একটি ইনডেক্সড `tenant_id (UUID)` কলাম রয়েছে। আর্কিটেকচার লেয়ারে ৩ স্তরের ডিফেন্স-ইন-ডেপথ সিকিউরিটি কার্যকর: (১) সাবডোমেন ও JWT টোকেন থেকে টেন্যান্ট আইডেন্টিফিকেশন, (২) নোড সার্ভিস লেয়ারে AsyncLocalStorage এবং টাইপ-সেফ Prisma Client এক্সটেনশন যা স্বয়ংক্রিয়ভাবে কুয়েরি স্কোপ করে, এবং (৩) ডেটাবেজ স্তরে PostgreSQL Row-Level Security (RLS) পলিসি। এর ফলে হাজার হাজার মার্চেন্টের ডেটা একই ক্লাস্টারে থেকেও ১০০% изолирован এবং খরচ থাকে সর্বনিম্ন।",
          "b": "দোকানি পিওএসে শেয়ার্ড স্কিমা ও ট্রিপল-লেয়ার সিকিউরিটি ব্যবহার করা হয়েছে: সাবডোমেন ভেরিফিকেশন, প্রিজমা এক্সটেনশনে অটো-স্কোপিং এবং ডেটাবেজে পোস্টগ্রেস RLS। ফলে সর্বনিম্ন ক্লাউড খরচে হাজার হাজার দোকানের ডেটা সম্পূর্ণ সুরক্ষিত থাকে।",
          "e": "In Dokani POS, multi-tenancy employs a Shared Database, Shared Schema architecture reinforced with defense-in-depth: Subdomain/JWT auth resolution, AsyncLocalStorage context scoping via Prisma extensions, and PostgreSQL Row-Level Security kernel policies.",
          "tip": "দোকানির এই ৩ স্তরের ডিফেন্স-ইন-ডেপথ (JWT, Prisma Ext, Postgres RLS) ইন্টারভিউতে উল্লেখ করলে তোমার আর্কিটেকচারাল ম্যাচুরিটি প্রকাশ পাবে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: মাল্টি-টেন্যান্ট SaaS অ্যাপ্লিকেশনে অটোমেটেড টেন্যান্ট অনবোর্ডিং ওয়ার্কফ্লো কীভাবে ডিজাইন করবে?",
          "m": "যখন একজন নতুন দোকানদার সাইন আপ করে: (১) মূল ট্রানজ্যাকশনে `Tenants` টেবিলে নতুন টেন্যান্ট রেকর্ড তৈরি হয় ও ডিফল্ট এডমিন ইউজার ক্রিয়েট হয়, (২) সিডিং সার্ভিস কল হয়ে স্বয়ংক্রিয়ভাবে ডিফল্ট সেটিংস, পেমেন্ট মেথড (ক্যাশ, বিকাশ), ডিফল্ট অ্যাকাউন্টস চার্ট এবং ইনভয়েস সিকুয়েন্স জেনারেট করে, (৩) কাস্টম সাবডোমেন (`storename.dokani.com`) ক্লাউডফ্লেয়ার বা রাউটিং প্রক্সিতে রেজিস্টার হয়, (৪) স্বাগতম ইমেইল এবং টিউটোরিয়াল গাইড পাঠিয়ে অনবোর্ডিং মাত্র ৩ সেকেন্ডের মধ্যে সফলভাবে সম্পন্ন হয়।",
          "b": "অনবোর্ডিং ওয়ার্কফ্লোতে ৩ সেকেন্ডে টেন্যান্ট তৈরি, অ্যাডমিন একাউন্ট ক্রিয়েশন, ডিফল্ট পেমেন্ট ও চার্ট অব অ্যাকাউন্টস সিডিং এবং সাবডোমেন রাউটিং স্বয়ংক্রিয়ভাবে সম্পন্ন করা হয়।",
          "e": "Automated tenant onboarding runs an idempotent transaction: provisioning the Tenant record, creating default admin credentials, seeding essential business templates (chart of accounts, invoice templates, payment modes), and provisioning DNS subdomain bindings in sub-3 seconds.",
          "code": "async function onboardTenant(data) {\n  return await prisma.$transaction(async (tx) => {\n    const tenant = await tx.tenant.create({ data: { name: data.name, slug: data.slug } });\n    await seedDefaultLedgers(tx, tenant.id);\n    await tx.user.create({ data: { ...data.admin, tenantId: tenant.id } });\n    return tenant;\n  });\n}"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: পেন-টেস্টিং ও সিকিউরিটি অডিটে মাল্টি-টেন্যান্ট সিস্টেমের 'BOLA / IDOR' ভালনারেবিলিটি কীভাবে স্ক্যান ও প্রিভেন্ট করবে?",
          "m": "BOLA (Broken Object Level Authorization / IDOR) হলো এপিআই সিকিউরিটির ১ নম্বর বিপদ। আক্রমণকারী নিজের টোকেন দিয়ে অন্য টেন্যান্টের ইনভয়েস আইডি পাঠিয়ে ডেটা দেখতে চায় (`GET /api/invoices/other-tenant-invoice-id`)। প্রিভেনশন: (১) রিপোজিটরির কোনো কুয়েরি কখনোই শুধু অবজেক্ট আইডি দিয়ে খুঁজবে না (`findById`)! সবসময় যৌথভাবে খুঁজতে হবে: `findFirst({ where: { id, tenantId } })`। যদি অবজেক্টটি অন্য টেন্যান্টের হয়, তবে কুয়েরি নাল পাবে এবং সিস্টেম তাৎক্ষণিকভাবে 404 Not Found ফিরিয়ে দেবে। (২) অটোমেটেড CI/CD সিকিউরিটি পাইপলাইনে ZAP বা কাস্টম ইন্টিগ্রেশন টেস্ট চালিয়ে ক্রস-টেন্যান্ট অ্যাক্সেস ভেরিফাই করা হয়।",
          "b": "IDOR প্রিভেন্ট করতে কখনোই শুধু id দিয়ে খোঁজা যাবে না; সর্বদা id এবং tenantId উভয় শর্ত দিয়ে কুয়েরি করতে হবে যাতে অন্য টেন্যান্টের আইডি দিলে ডাটাবেজ নাল পায় এবং 404 দেয়।",
          "e": "Prevent BOLA/IDOR by ensuring every repository lookup strictly couples the entity ID with the active tenant ID: findFirst({ where: { id, tenantId } }). If a malicious user requests a foreign entity, the query evaluates to null and returns 404, denying the entity's existence.",
          "tip": "কখনোই `findById(id)` ব্যবহার করবে না; সর্বদা `findOne({ where: { id, tenantId } })` ব্যবহার করবে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: মাল্টি-টেন্যান্ট সিস্টেমে পার-টেন্যান্ট ফাইল ও ইমেজ স্টোরেজ (S3/Cloudinary/MinIO) কীভাবে আইসোলেট করবে?",
          "m": "ক্লাউড স্টোরেজে সব টেন্যান্টের ফাইল এক বালতিতে রাখলে ফাইলে ফাইল ওভাররাইট বা ভুলবশত অ্যাক্সেস পাওয়ার ঝুঁকি থাকে। আর্কিটেকচারাল ডিজাইন: প্রতিটি টেন্যান্টের ফাইলের জন্য ডেডিকেটেড অবজেক্ট পাথ প্রিফিক্স ব্যবহার করা হয়: `s3://dokani-uploads/{tenantId}/{entityType}/{year}/{uuid}.pdf`। ফাইল আপলোড বা ডাউনলোডের জন্য কখনোই পাবলিক ইউআরএল বা ডিরেক্ট অ্যাক্সেস দেওয়া হয় না; সার্ভার থেকে টেন্যান্ট আইডেন্টিটি ভেরিফাই করে ৫ মিনিটের জন্য সময়সীমিত AWS S3 Presigned URL তৈরি করে দেওয়া হয়।",
          "b": "ক্লাউড স্টোরেজে টেন্যান্ট আইডি দিয়ে আলাদা পাথ প্রিফিক্স (s3://bucket/{tenantId}/...) ব্যবহার করা হয় এবং সরাসরি অ্যাক্সেস না দিয়ে ৫ মিনিটের Presigned URL দিয়ে ফাইল ডাউনলোড করানো হয়।",
          "e": "Isolate tenant assets in object storage via scoped bucket key prefixes: s3://bucket/{tenantId}/{module}/{uuid}.png. Prevent direct public access by generating time-expiring S3 Presigned URLs strictly after authenticating the tenant context.",
          "code": "const s3Key = `tenants/${tenantId}/invoices/${invoiceId}.pdf`;\nconst presignedUrl = await getSignedUrl(s3Client, new GetObjectCommand({ Bucket, Key: s3Key }), { expiresIn: 300 });"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: মাল্টি-টেন্যান্ট ডেটাবেজ পার্টিশনিং (PostgreSQL Declarative Table Partitioning) কখন এবং কীভাবে প্রয়োগ করবে?",
          "m": "যখন কোনো SaaS প্ল্যাটফর্ম ৫০,০০০+ টেন্যান্ট এবং কোটি কোটি লেনদেনে পৌঁছায়, তখন একটি একক টেবিল ইনডেক্স মেমোরিতে ধরে রাখা কঠিন হয়ে পড়ে। আমরা PostgreSQL-এর `PARTITION BY HASH (tenant_id)` ব্যবহার করে টেবিলটিকে ৩২ বা ৬৪টি ফিজিক্যাল সাব-টেবিলে ভাগ করি। পোস্টগ্রেসের কুয়েরি অপটিমাইজার `tenant_id` দেখে মুহূর্তে বাকি ৬৩টি সাব-টেবিল প্রুন (Partition Pruning) করে বাদ দিয়ে দেয় এবং শুধুমাত্র কাঙ্ক্ষিত পার্টিশনে কুয়েরি চালায়। এর ফলে টেবিল সাইজ কোটি রো হলেও কুয়েরি এক্সিকিউশন ও ভ্যাকুয়ামিং স্পিড সুপারফাস্ট থাকে।",
          "b": "বিশাল স্কেলের মাল্টি-টেন্যান্ট ডেটাবেজে PARTITION BY HASH (tenant_id) দিয়ে মূল টেবিলকে ৩২ বা ৬৪টি সাব-টেবিলে ভাগ করা হয়। কুয়েরি তখন শুধুমাত্র সংশ্লিষ্ট পার্টিশনে সার্চ করে অবিশ্বাস্য দ্রুত চলে।",
          "e": "When SaaS tables exceed hundreds of millions of rows, implement PostgreSQL Declarative Table Partitioning by HASH(tenant_id) across 32 or 64 sub-tables. The query planner performs partition pruning, seeking exclusively inside the matching tenant partition.",
          "code": "CREATE TABLE invoices (\n  tenant_id UUID NOT NULL,\n  id UUID NOT NULL,\n  total NUMERIC\n) PARTITION BY HASH (tenant_id);\nCREATE TABLE invoices_part_0 PARTITION OF invoices FOR VALUES WITH (MODULUS 32, REMAINDER 0);"
        }
      ]
    },
    {
      "id": "supabase-rls-mastery",
      "name": "Supabase & Postgres Row-Level Security (RLS)",
      "desc": "Supabase Backend, GoTrue Auth, auth.uid(), RLS Policies, Anon vs Service Role, Realtime CDC, Database Triggers",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Supabase কী এবং এটি ট্র্যাডিশনাল Firebase বা কাস্টম ব্যাকএন্ডের চেয়ে কেন ডেভেলপারদের কাছে জনপ্রিয়?",
          "m": "Supabase হলো একটি ওপেন-সোর্স Firebase বিকল্প যা সম্পূর্ণভাবে প্রোডাকশন-গ্রেড PostgreSQL ডেটাবেজের ওপর নির্মিত। Firebase-এর মতো প্রোপাইটরি NoSQL লকিংয়ের পরিবর্তে Supabase একটি ফুল PostgreSQL দেয়—সাথে বিল্ট-ইন Auth (GoTrue), অটো-জেনারেটেড RESTful API (PostgREST), Realtime WebSockets, এবং S3-কমপ্যাটিবল Storage। সবচেয়ে বড় সুবিধা: ডেটাবেজটি ১০০% ওপেন স্ট্যান্ডার্ড এসকিউএল হওয়ায় যেকোনো সময় ভেন্ডর-লকইন ছাড়া নিজস্ব সার্ভারে সেলফ-হোস্ট করা যায় এবং জটিল রিলেশনাল কুয়েরি ও ACID ট্রানজ্যাকশন সাপোর্ট করে।",
          "b": "সুপাবেস হলো একটি ওপেন-সোর্স ব্যাকএন্ড প্ল্যাটফর্ম যা পোস্টগ্রেস ডেটাবেজের ওপর ভিত্তি করে অথেনটিকেশন, রিয়েলটাইম লিসেনার, অটো-জেনারেটেড এপিআই এবং ফাইল স্টোরেজের সুবিধা দেয়। এটি ফায়ারবেসের মতো কোনো ভেন্ডর-লকইন ছাড়াই পূর্ণাঙ্গ SQL শক্তি প্রদান করে।",
          "e": "Supabase is an open-source Firebase alternative built natively on top of production PostgreSQL. It bundles GoTrue authentication, instant PostgREST APIs, Realtime WebSocket change streams, and storage, avoiding vendor lock-in while leveraging SQL relational power.",
          "tip": "বলো: 'Supabase provides Firebase-like developer velocity backed by the industrial power of PostgreSQL.'"
        },
        {
          "lvl": "lvl1",
          "q": "Supabase-এ Row-Level Security (RLS) কেন ডিফল্টভাবে চালু রাখা বাধ্যতামূলক?",
          "m": "Supabase তার PostgREST ইঞ্জিনের মাধ্যমে সরাসরি ব্রাউজার বা ফ্রন্টএন্ড থেকে ডেটাবেজে কুয়েরি করার সুবিধা দেয় (`supabase.from('products').select('*')`)। যদি টেবিলে RLS অন না থাকে, তবে যে কেউ ব্রাউজার কনসোল বা পোস্টম্যান থেকে আপনার এনন কি (Anon Key) ব্যবহার করে পুরো টেবিলের সংবেদনশীল ডেটা পড়া, পরিবর্তন বা ডিলিট করে দিতে পারবে! RLS চালু থাকলে ডেটাবেজ প্রতিটি কুয়েরিকে কঠোর সিকিউরিটি পলিসি দিয়ে আটকে দেয়, ফলে শুধুমাত্র অথেনটিকেটেড ও অনুমতিপ্রাপ্ত ইউজারই তার নির্দিষ্ট ডেটা দেখতে পারে।",
          "b": "সুপাবেসে ফ্রন্টএন্ড থেকে সরাসরি ডাটাবেজে কুয়েরি পাঠানো যায়। তাই RLS বন্ধ থাকলে যে কেউ সম্পূর্ণ টেবিলের তথ্য চুরি বা মুছে ফেলতে পারে। তথ্যের নিরাপত্তা নিশ্চিত করতে RLS চালু রাখা বাধ্যতামূলক।",
          "e": "Because Supabase exposes PostgreSQL directly to the client via PostgREST, leaving RLS disabled enables any anonymous client holding the public key to perform unrestricted reads, writes, and deletes. RLS enforces kernel-level authorization policies on every query.",
          "code": "ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;"
        },
        {
          "lvl": "lvl1",
          "q": "Supabase RLS পলিসিতে `auth.uid()` এবং `auth.jwt()` হেল্পার ফাংশনগুলোর কাজ কী?",
          "m": "(১) `auth.uid()`: এটি বর্তমান লগইন করা ইউজারের ইউনিক UUID রিটার্ন করে যা Supabase Auth টোকেন থেকে সংগৃহীত। যেমন ইউজারের প্রোফাইল দেখতে পলিসি লিখি: `USING (id = auth.uid())`। (২) `auth.jwt()`: এটি ডিকোড করা সম্পূর্ণ JWT অবজেক্ট রিটার্ন করে। এর মাধ্যমে টোকেনের ভেতরের কাস্টম ক্লেইমস (যেমন `role`, `tenant_id`, `is_admin`) রিড করে অ্যাডভান্সড রোল-বেসড পলিসি তৈরি করা যায়: `USING ((auth.jwt() ->> 'role') = 'ADMIN')`।",
          "b": "auth.uid() বর্তমান লগইন করা ইউজারের আইডি প্রদান করে এবং auth.jwt() সম্পূর্ণ টোকেন মেটাডেটা দেয়। এর মাধ্যমে ইউজারের রোল ও টেন্যান্ট চেক করে নিখুঁত নিরাপত্তা পলিসি তৈরি করা হয়।",
          "e": "auth.uid() extracts the authenticated user's unique UUID from the active session context. auth.jwt() exposes the full decoded JSON Web Token payload, enabling policies to validate custom claims like user roles or tenant IDs.",
          "code": "CREATE POLICY \"Users can view own profile\" ON profiles\nFOR SELECT USING (id = auth.uid());"
        },
        {
          "lvl": "lvl1",
          "q": "Supabase-এ 'anon' Key এবং 'service_role' Key-এর মধ্যে পার্থক্য কী এবং কোন কি-টি কখনোই ক্লায়েন্টে পাঠানো যাবে না?",
          "m": "(১) `anon key`: এটি একটি পাবলিক কি যা ব্রাউজার, মোবাইল অ্যাপ ও ফ্রন্টএন্ডে নিরাপদে ব্যবহার করা যায়। এই কি দিয়ে করা সব রিকোয়েস্ট কঠোরভাবে ডেটাবেজের RLS পলিসি মেনে চলে। (২) `service_role key`: এটি একটি সুপার-অ্যাডমিন মাস্টার কি যা ডেটাবেজের সমস্ত RLS পলিসি সম্পূর্ণ বাইপাস করে ফুল অ্যাক্সেস পায়! এই কি-টি কখনোই ক্লায়েন্ট বা ব্রাউজারে পাঠানো যাবে না—এটি সবসময় সিকিউর ব্যাকএন্ড সার্ভার বা ক্লাউড ফাংশনের প্রাইভেট এনভায়রনমেন্ট ভ্যারিয়েবলে রাখতে হবে। ব্রাউজারে লিক হলে সম্পূর্ণ সিস্টেম কম্প্রোমাইজ হবে।",
          "b": "anon key ফ্রন্টএন্ডে ব্যবহার করা যায় এবং এটি RLS মেনে চলে। service_role key সম্পূর্ণ RLS বাইপাস করে সব ডেটা অ্যাক্সেস করতে পারে, তাই এটি কখনোই ফ্রন্টএন্ডে প্রকাশ করা যাবে না—শুধুমাত্র সিকিউর ব্যাকএন্ডে রাখতে হবে।",
          "e": "The anon key is public for client-side usage and strictly abides by RLS policies. The service_role key is a master secret that completely bypasses all RLS policies; it must NEVER be exposed to clients and kept solely within secure backend environments.",
          "tip": "ইন্টারভিউতে 'service_role key bypasses RLS and must strictly stay server-side' সতর্কবাণীটি দেবে।"
        },
        {
          "lvl": "lvl1",
          "q": "PostgreSQL RLS-এ `USING` এবং `WITH CHECK` ক্লজের মধ্যে পার্থক্য কী?",
          "m": "(১) `USING`: এটি ডেটা ফিল্টার বা পড়ার জন্য ব্যবহৃত হয় (`SELECT`, `DELETE`, এবং `UPDATE`-এর পুরনো রো ফিল্টার করার সময়)। এটি নির্ধারণ করে কোন কোন রো ইউজার দেখতে বা অ্যাক্সেস করতে পারবে। (২) `WITH CHECK`: এটি নতুন ডেটা তৈরি বা পরিবর্তনের পর ভ্যালিডেট করতে ব্যবহৃত হয় (`INSERT` এবং `UPDATE`-এর নতুন রো)। এটি নিশ্চিত করে যে ইউজার এমন কোনো ডেটা ইনসার্ট বা পরিবর্তন করতে পারবে না যা পলিসির শর্ত ভঙ্গ করে (যেমন অন্যের `user_id` বসিয়ে ইনসার্ট করা)।",
          "b": "USING ক্লজ ডেটা পড়া বা সিলেক্ট করার শর্ত নির্ধারণ করে। আর WITH CHECK ক্লজ নতুন ডেটা ইনসার্ট বা আপডেটের পর নতুন মান বৈধ কি না তা যাচাই করে।",
          "e": "The USING clause defines which existing rows are visible for SELECT, UPDATE, and DELETE operations. The WITH CHECK clause enforces validation criteria on new or mutated rows during INSERT and UPDATE operations to prevent saving illegal records.",
          "code": "CREATE POLICY \"Users can update own rows\" ON posts\nFOR UPDATE \nUSING (author_id = auth.uid()) \nWITH CHECK (author_id = auth.uid());"
        },
        {
          "lvl": "lvl2",
          "q": "Supabase-এ Role-Based Access Control (RBAC) পলিসি কীভাবে ডিজাইন করবে?",
          "m": "আমরা ইউজারের রোল (যেমন `ADMIN`, `MANAGER`, `CASHIER`) সংরক্ষণ করতে পারি `auth.users` মেটাডেটাতে অথবা একটি ডেডিকেটেড `user_roles` টেবিলে। এরপর RLS পলিসিতে চেক করি: `CREATE POLICY admin_all ON orders FOR ALL TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN');`। এর ফলে অ্যাডমিনরা সব রো দেখতে ও এডিট করতে পারবে, আর সাধারণ ইউজারদের জন্য আলাদা পলিসিতে শুধু তাদের নিজস্ব অর্ডারের অ্যাক্সেস সীমাবদ্ধ থাকবে।",
          "b": "JWT টোকেনের app_metadata থেকে role রিড করে RLS পলিসিতে শর্ত দেওয়া হয়। ফলে অ্যাডমিন সব ডেটা ম্যানেজ করতে পারে আর সাধারণ ইউজার শুধু নিজের ডেটা দেখার অনুমতি পায়।",
          "e": "Implement RBAC by embedding roles inside the user's app_metadata claim on auth.users. Write targeted RLS policies inspecting auth.jwt() -> 'app_metadata' ->> 'role' to grant elevated permissions to roles like ADMIN or MANAGER.",
          "code": "CREATE POLICY \"Admins full access\" ON products\nFOR ALL TO authenticated\nUSING ((auth.jwt()->'app_metadata'->>'role') = 'admin');"
        },
        {
          "lvl": "lvl2",
          "q": "Supabase Realtime Subscriptions কীভাবে কাজ করে এবং ডেটাবেজে চেঞ্জ হলে ব্রাউজারে কীভাবে লাইভ আপডেট আসে?",
          "m": "Supabase Realtime কাজ করে PostgreSQL-এর বিল্ট-ইন 'Logical Replication' এবং চেঞ্জ ডেটা ক্যাপচার (CDC) মেকানিজমের ওপর। যখন ডেটাবেজে কোনো রো ইনসার্ট বা আপডেট হয়, পোস্টগ্রেসের `supabase_realtime` পাবলিকেশন একটি বাইনারি স্ট্রিম ফায়ার করে। Supabase Realtime ক্লাস্টার (Elixir/Phoenix ভিত্তিক) এই স্ট্রিমটি গ্রহণ করে এবং সংযুক্ত ব্রাউজারগুলোর WebSocket চ্যানেলে লাইভ JSON ইভেন্ট ব্রডকাস্ট করে। ফ্রন্টএন্ডে `supabase.channel().on('postgres_changes', ...).subscribe()` দিয়ে রিয়েলটাইম লিসেন করা যায়।",
          "b": "সুপাবেস রিয়েলটাইম পোস্টগ্রেস লজিক্যাল রেপ্লিকেশন ও চেঞ্জ ডেটা ক্যাপচার ব্যবহার করে। ডেটাবেজে পরিবর্তন হওয়া মাত্রই ফিনিক্স ওয়েব-সকেটের মাধ্যমে ব্রাউজারে তাৎক্ষণিক ইভেন্ট পুশ করে।",
          "e": "Supabase Realtime leverages PostgreSQL Logical Replication publications (supabase_realtime). An Elixir Phoenix backend consumes the replication WAL stream and broadcasts mutated payloads across connected WebSockets to active client listeners in real time.",
          "code": "const sub = supabase.channel('orders')\n  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => {\n    console.log('New Order:', payload.new);\n  }).subscribe();"
        },
        {
          "lvl": "lvl2",
          "q": "Supabase Database Triggers ও Functions (PL/pgSQL) কীভাবে নতুন ইউজার রেজিস্ট্রেশনের সময় স্বয়ংক্রিয়ভাবে পাবলিক প্রোফাইল তৈরি করে?",
          "m": "যখন কোনো ইউজার Supabase Auth দিয়ে সাইন আপ করে, তখন ডেটা জমা হয় প্রাইভেট `auth.users` টেবিলে। পাবলিক ফ্রন্টএন্ড সরাসরি `auth.users` রিড করতে পারে না। সমাধান: আমরা একটি PL/pgSQL ফাংশন তৈরি করি `handle_new_user()` যা `public.profiles` টেবিলে স্বয়ংক্রিয়ভাবে নতুন রো ইনসার্ট করে। এরপর একটি ট্রিগার বসাই: `CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();`। এর ফলে সাইন আপ হওয়ার ১ মিলিসেকেন্ডের মধ্যে পাবলিক প্রোফাইল প্রস্তুত হয়ে যায় কোনো ব্যাকএন্ড কোড ছাড়াই।",
          "b": "auth.users টেবিলে নতুন ইউজার ইনসার্ট হওয়ার সাথে সাথে ডাটাবেজ ট্রিগার ফায়ার করে public.profiles টেবিলে প্রোফাইল রো তৈরি করে দেয়। এর ফলে কোনো ব্যাকএন্ড ছাড়াই প্রোফাইল অটো-ক্রিয়েট হয়।",
          "e": "Create a PostgreSQL PL/pgSQL function triggered AFTER INSERT on auth.users. The trigger extracts NEW.id and NEW.email to insert a matching row into public.profiles, abstracting profile provisioning entirely to the database tier.",
          "code": "CREATE OR REPLACE FUNCTION public.handle_new_user()\nRETURNS TRIGGER AS $$\nBEGIN\n  INSERT INTO public.profiles (id, email, full_name)\n  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');\n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql SECURITY DEFINER;\nCREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users\nFOR EACH ROW EXECUTE FUNCTION public.handle_new_user();"
        },
        {
          "lvl": "lvl2",
          "q": "PostgreSQL Functions-এ `SECURITY DEFINER` বনাম `SECURITY INVOKER`-এর মধ্যে পার্থক্য কী এবং সিকিউরিটি ঝুঁকি কী?",
          "m": "(১) `SECURITY INVOKER` (ডিফল্ট): ফাংশনটি যিনি কল করছেন (Invoker) তার পারমিশন ও RLS রুলস অনুযায়ী এক্সিকিউট হয়। (২) `SECURITY DEFINER`: ফাংশনটি যিনি তৈরি করেছেন (Creator/Superuser) তার সর্বোচ্চ পারমিশন নিয়ে এক্সিকিউট হয়—অর্থাৎ এটি কলারের সমস্ত RLS পলিসি সম্পূর্ণ বাইপাস করে! ঝুঁকি: যদি কোনো হ্যাকার `SECURITY DEFINER` ফাংশনে ম্যালিশিয়াস প্যারামিটার পাস করতে পারে, তবে সে ডেটাবেজের যেকোনো টেবিল এক্সেস করে ফেলতে পারে। প্রিভেনশন: ফাংশনের ভেতরে কঠোর ইনপুট ভ্যালিডেশন এবং `SET search_path = public` স্পষ্টভাবে কনফিগার করতে হবে।",
          "b": "SECURITY INVOKER কলকারীর পারমিশন অনুযায়ী চলে। SECURITY DEFINER নির্মাতার সুপার-অ্যাডমিন পারমিশন নিয়ে RLS বাইপাস করে চলে। তাই ডিফেইনার ফাংশনে কঠোর প্যারামিটার চেক এবং search_path সেট করা আবশ্যক।",
          "e": "SECURITY INVOKER executes with the calling user's restricted privileges, adhering to their RLS policies. SECURITY DEFINER executes with the function creator's elevated privileges (bypassing the invoker's RLS constraints). Always guard DEFINER functions with explicit search_paths to prevent privilege escalation attacks.",
          "code": "CREATE FUNCTION promote_user(target_id UUID)\nRETURNS VOID SECURITY DEFINER SET search_path = public AS $$ ... $$ LANGUAGE plpgsql;"
        },
        {
          "lvl": "lvl2",
          "q": "Supabase Edge Functions (Deno/TypeScript) কখন ব্যবহার করবে এবং ডেটাবেজের সাথে এর ইন্টারঅ্যাকশন কেমন?",
          "m": "Edge Functions হলো বিশ্বব্যাপী ডিস্ট্রিবিউটেড সার্ভারলেস ফাংশন (Deno রানটাইম)। যখন কোনো কাজ সরাসরি ব্রাউজার বা RLS পলিসির মাধ্যমে করা যায় না—যেমন: Stripe পেমেন্ট গেটওয়ের সিক্রেট কি হ্যান্ডেল করা, পাসওয়ার্ডবিহীন ম্যাজিক লিঙ্ক পাঠানো, থার্ড পার্টি সেন্ডগ্রিড ইমেইল পাঠানো, বা ভারী বিজনেস লজিক সম্পাদন করা—তখন Edge Functions ব্যবহৃত হয়। এটি `supabase-js` ক্লায়েন্ট দিয়ে `service_role` কি ব্যবহার করে নিরাপদে ডেটাবেজ অ্যাক্সেস করতে পারে।",
          "b": "স্ট্রাইপ পেমেন্ট হ্যান্ডেল করা, ইমেইল পাঠানো বা সিক্রেট কি লুকানোর মতো ব্যাকএন্ড কাজের জন্য Supabase Edge Functions ব্যবহার করা হয়। এটি কোনো সার্ভার ছাড়াই গ্লোবালি ডিনো রানটাইমে চলে।",
          "e": "Supabase Edge Functions are globally distributed serverless TypeScript functions running on Deno. They execute secure backend logic that cannot reside in clients: verifying third-party webhooks (Stripe/bKash), sending transactional emails, or running batch operations with the service_role key.",
          "code": "import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';\nserve(async (req) => {\n  return new Response(JSON.stringify({ message: 'Hello from Edge' }), { headers: { 'Content-Type': 'application/json' } });\n});"
        },
        {
          "lvl": "lvl3",
          "q": "Supabase RLS-এ Subquery পারফরম্যান্স অপটিমাইজেশন: কেন পলিসিতে `EXISTS (SELECT 1 ...)` স্লো হতে পারে এবং কীভাবে ফিক্স করবে?",
          "m": "যদি কোনো টেবিলে ১ লক্ষ রো থাকে এবং RLS পলিসিতে লেখা হয় `USING (EXISTS (SELECT 1 FROM team_members WHERE team_id = orders.team_id AND user_id = auth.uid()))`, তবে পোস্টগ্রেস প্রতিটি রোর জন্য বারবার ওই সাব-কুয়েরি চালাতে পারে (Correlated Subquery Overhead), যা কুয়েরিকে চরম স্লো করে দেয়। সমাধান: (১) `auth.jwt()`-তে সরাসরি ইউজারের `team_id` কাস্টম ক্লেইম হিসেবে ইনজেক্ট করা—যাতে কোনো ডেটাবেজ সাব-কুয়েরি ছাড়াই মেমোরি থেকে পলিসি চেক হয়ে যায়। (২) অথবা একটি `SECURITY DEFINER` STABLE ক্যাশড ফাংশন তৈরি করা যা মেমোরিতে মেম্বারশিপ যাচাই করে।",
          "b": "RLS পলিসিতে প্রতি রোর জন্য সাব-কুয়েরি চললে পারফরম্যান্স ধ্বংস হয়। JWT টোকেনে সরাসরি team_id রেখে মেমোরি থেকে চেক করলে অথবা STABLE ফাংশন ব্যবহার করলে পারফরম্যান্স ১০০ গুণ বাড়ে।",
          "e": "Correlated subqueries in RLS USING clauses execute once per evaluated row, bottlenecking bulk scans. Mitigate by embedding team/organization IDs directly inside the user's JWT claims upon login, or caching lookups using a STABLE helper function that evaluates once per query.",
          "code": "-- Fast JWT-based policy:\nCREATE POLICY team_policy ON orders\nFOR ALL USING (team_id = (auth.jwt()->'app_metadata'->>'team_id')::uuid);"
        },
        {
          "lvl": "lvl3",
          "q": "Supabase Storage-এ Bucket Security ও Row-Level Security Policies কীভাবে ডিজাইন করবে?",
          "m": "Supabase Storage ফাইল সংরক্ষণের পাশাপাশি প্রতিটি ফাইলের মেটাডেটা `storage.objects` নামক একটি অভ্যন্তরীণ PostgreSQL টেবিলে সংরক্ষণ করে। এর মানে হলো: আপনি সাধারণ টেবিলের মতোই ফাইল বালতির ওপরেও RLS পলিসি লিখতে পারেন! যেমন: একজন ইউজার কেবল তার নিজস্ব ফোল্ডারের ফাইল আপলোড বা ডিলিট করতে পারবে। পলিসিতে আমরা চেক করি: `bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text`। এর ফলে কোনো ইউজার অন্য কোনো ইউজারের আপলোড করা ফাইলে হস্তক্ষেপ করতে পারে না।",
          "b": "সুপাবেস স্টোরেজ ফাইলগুলোর তথ্য storage.objects টেবিলে রাখে। ফলে ফোল্ডার পাথ চেক করে (storage.foldername) নিজস্ব ফোল্ডারে ফাইল সেভ ও ডিলিট করার RLS পলিসি লিখে নিখুঁত ফাইল সিকিউরিটি নিশ্চিত করা যায়।",
          "e": "Supabase Storage backs file metadata via the storage.objects PostgreSQL table, permitting full RLS policies over binary assets. Restrict folder uploads via storage.foldername(name)[1] === auth.uid()::text, guaranteeing users can only read and mutate their isolated user folders.",
          "code": "CREATE POLICY \"Allow individual folder access\" ON storage.objects\nFOR ALL USING (\n  bucket_id = 'user-files' AND\n  (storage.foldername(name))[1] = auth.uid()::text\n);"
        },
        {
          "lvl": "lvl3",
          "q": "Database Webhooks (pg_net) কীভাবে কাজ করে এবং ডেটাবেজ ইভেন্টে এক্সটারনাল এপিআই কীভাবে কল করে?",
          "m": "Supabase Database Webhooks পোস্টগ্রেসের `pg_net` এক্সটেনশন ব্যবহার করে। যখন কোনো টেবিলে নির্দিষ্ট ইভেন্ট (INSERT, UPDATE, DELETE) ঘটে, তখন পোস্টগ্রেস কোনো ব্লকিং ছাড়াই অ্যাসিনক্রোনাস HTTP POST রিকোয়েস্ট পাঠায় কোনো এক্সটারনাল এপিআই এন্ডপয়েন্টে (যেমন নোড সার্ভার, স্ল্যাক চ্যানেল, বা ক্লাউড ফাংশন)। পে-লোডে পুরনো এবং নতুন রোর ডেটা (`OLD` এবং `NEW`) স্বয়ংক্রিয়ভাবে থাকে। এটি ডাটাবেজ ট্রানজ্যাকশন শেষ হওয়ার পর নন-ব্লকিংভাবে চলে, ফলে মূল কুয়েরির ল্যাটেন্সিতে কোনো প্রভাব পড়ে না।",
          "b": "pg_net এক্সটেনশন ব্যবহার করে ডেটাবেজে পরিবর্তন হওয়ার সাথে সাথে স্বয়ংক্রিয়ভাবে বাইরের যেকোনো সার্ভারে HTTP রিকোয়েস্ট পাঠানো যায়। এটি কোনো ব্লকিং ছাড়াই ব্যাকগ্রাউন্ডে চলে।",
          "e": "Supabase Database Webhooks use the asynchronous pg_net extension to dispatch HTTP POST requests directly from PostgreSQL triggers upon table mutations. Operating asynchronously out-of-band, webhook dispatch introduces zero transaction latency to client mutations.",
          "tip": "বলো: 'Database webhooks dispatch asynchronous HTTP requests via pg_net without stalling the write transaction.'"
        },
        {
          "lvl": "lvl3",
          "q": "Multi-Tenant SaaS অ্যাপ্লিকেশনে Supabase দিয়ে কীভাবে Tenant Isolation পলিসি লিখবে?",
          "m": "সুপাবেসে টেন্যান্ট আইসোলেশনের জন্য ইউজারের লগইন টোকেনে `tenant_id` সংরক্ষিত থাকে। টেবিলে RLS পলিসি লেখা হয়: `CREATE POLICY tenant_isolation ON invoices FOR ALL USING (tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::uuid) WITH CHECK (tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::uuid);`। এটি নিশ্চিত করে যে ফ্রন্টএন্ড বা ব্যাকএন্ড থেকে যেই কুয়েরি করুক না কেন, ইউজার শুধুমাত্র তার নিজের টেন্যান্টের ডেটাই দেখতে পাবে এবং নতুন রেকর্ড ইনসার্ট করার সময়ও টেন্যান্ট আইডি বাধ্যতামূলকভাবে ম্যাচ করতে হবে।",
          "b": "JWT টোকেনের app_metadata থেকে tenant_id ম্যাচ করে USING এবং WITH CHECK পলিসি লিখলে মাল্টি-টেন্যান্ট ডেটাবেজে কোনো টেন্যান্টের ডেটা অন্য কারও কাছে যাওয়ার সুযোগ থাকে না।",
          "e": "Enforce multi-tenant isolation in Supabase by extracting tenant_id from the user's auth.jwt() claims in both USING and WITH CHECK clauses, ensuring zero data crosstalk across merchant organizations.",
          "code": "CREATE POLICY tenant_guard ON orders\nFOR ALL USING (tenant_id = (auth.jwt()->'app_metadata'->>'tenant_id')::uuid)\nWITH CHECK (tenant_id = (auth.jwt()->'app_metadata'->>'tenant_id')::uuid);"
        },
        {
          "lvl": "lvl3",
          "q": "Supabase Realtime-এ Row-Level Security (RLS) কীভাবে প্রয়োগ হয় যাতে অন্য ইউজারের ডেটা ব্রাউজার সকেটে না যায়?",
          "m": "Supabase Realtime v2+ পোস্টগ্রেস RLS-এর সাথে পূর্ণাঙ্গভাবে ইন্টিগ্রেটেড। যখন ক্লায়েন্ট কোনো টেবিলে পরিবর্তন শোনার জন্য কানেক্ট করে, সে তার JWT অথেনটিকেশন টোকেন পাঠায়। রিয়েলটাইম সার্ভার প্রতিটি চেঞ্জ ইভেন্ট ব্রডকাস্ট করার আগে ইউজারের টোকেন দিয়ে পোস্টগ্রেস RLS পলিসি ইভ্যালুয়েট করে। যদি ওই রোর জন্য ইউজারের SELECT পারমিশন না থাকে, তবে রিয়েলটাইম সার্ভার ফিল্টার আউট করে দেয় এবং ওই ইভেন্টটি কখনোই ব্রাউজারে যায় না। ফলে ব্রাউজার কেবল নিজের অনুমোদিত ডেটারই লাইভ আপডেট পায়।",
          "b": "সুপাবেস রিয়েলটাইম স্বয়ংক্রিয়ভাবে RLS পলিসি মেনে চলে। কোনো ইউজারের যদি ডাটা দেখার SELECT পারমিশন না থাকে, তবে সেই ডেটা পরিবর্তন হলেও ব্রাউজার সকেটে কোনো ইভেন্ট যায় না।",
          "e": "Supabase Realtime v2 evaluates PostgreSQL RLS policies against the client's JWT credentials before dispatching change events over the WebSocket connection. If an authenticated user lacks SELECT permissions for a mutated row, the payload is suppressed, eliminating data leaks.",
          "tip": "ইন্টারভিউতে 'Realtime v2 respects RLS policies before streaming payloads over WebSockets' উল্লেখ করবে।"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একজন জুনিয়র ডেভেলপার ফ্রন্টএন্ড কোডে `const { data } = await supabase.from('users').select('*')` কল করল, কিন্তু রেসপন্সে খালি অ্যারে `[]` ফিরল অথচ টেবিলে হাজার হাজার ইউজার আছে! কোনো এরর নেই। কারণ কী এবং কীভাবে ফিক্স করবে?",
          "m": "সমস্যার কারণ: টেবিলে RLS অন করা হয়েছে ঠিকই, কিন্তু কোনো `SELECT` পলিসি লেখা হয়নি! পোস্টগ্রেসে RLS সক্রিয় থাকলে এবং কোনো পলিসি না থাকলে ডেটাবেজ কোনো এরর দেয় না—বরং সিকিউরিটির স্বার্থে সাইলেন্টলি ০টি রো রিটার্ন করে (ডিফল্ট ডিনাই)। সমাধান: টেবিলে উপযুক্ত SELECT পলিসি তৈরি করতে হবে (যেমন পাবলিক ডেটার জন্য `FOR SELECT USING (true)` অথবা ওনারশিপ ডেটার জন্য `FOR SELECT USING (id = auth.uid())`)।",
          "b": "RLS সক্রিয় থাকা অবস্থায় কোনো SELECT পলিসি ডিফাইন না করলে ডাটাবেজ সাইলেন্টলি খালি অ্যারে রিটার্ন করে। টেবিলে উপযুক্ত SELECT পলিসি যোগ করলেই ডেটা দেখতে পাওয়া যাবে।",
          "e": "When RLS is enabled without an active matching SELECT policy, PostgreSQL's default-deny security model silently returns an empty array ([]) with zero errors. Fix by declaring an explicit SELECT policy matching the intended authorization criteria.",
          "code": "CREATE POLICY \"Allow authenticated read\" ON users\nFOR SELECT TO authenticated USING (true);"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ফ্রন্টএন্ড কোডে ভুলবশত `SUPABASE_SERVICE_ROLE_KEY` গিটহাব পাবলিক রিপোজিটরিতে পুশ হয়ে গেছে। কী কী তাৎক্ষণিক পদক্ষেপ নেবে?",
          "m": "জরুরি পদক্ষেপসমূহ: (১) মুহূর্তের মধ্যে Supabase ড্যাশবোর্ডে গিয়ে `Settings > API`-তে ঢুকে `Service Role Key` রোটেট (Roll Key) করে নতুন কি জেনারেট করব—যাতে পুরনো লিক হওয়া কি-টি অবিলম্বে বাতিল হয়ে যায়। (২) প্রোডাকশন এনভায়রনমেন্ট ভ্যারিয়েবলে নতুন কি আপডেট করে অ্যাপ রিস্টার্ট করব। (৩) GitGuardian বা BFG Repo-Cleaner দিয়ে গিট হিস্ট্রি থেকে সিক্রেট পার্জ করব। (৪) ডেটাবেজ অডিট লগে চেক করব এই সময়ের মধ্যে কোনো অননুমোদিত বাল্ক এক্সপোর্ট বা ডাটা ড্রপ কুয়েরি চালানো হয়েছে কি না।",
          "b": "তাৎক্ষণিকভাবে সুপাবেস ড্যাশবোর্ড থেকে সার্ভিস রোল কি রোল/রোটেট করে পুরনো কি বাতিল করতে হবে। ব্যাকএন্ডে নতুন কি আপডেট করে গিট হিস্ট্রি পরিষ্কার করতে হবে এবং ডেটাবেজ অডিট লগ পর্যবেক্ষণ করতে হবে।",
          "e": "Immediately regenerate the Service Role Key within the Supabase dashboard to invalidate the exposed credential globally. Deploy the new key to production environment variables, scrub Git history using BFG Repo-Cleaner, and audit database query logs for unauthorized intrusion.",
          "tip": "বলো: 'Immediate key rotation in Supabase console, followed by Git secret purge and audit log inspection.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: তোমার টিমের একজন ডেভেলপার ফ্রন্টএন্ড থেকে ইনভয়েস স্ট্যাটাস 'PENDING' থেকে 'PAID'-এ আপডেট করার কোড লিখেছে। কিন্তু একজন সাধারণ কাস্টমার ব্রাউজার থেকে রিকোয়েস্ট পাঠিয়ে পেমেন্ট ছাড়াই ইনভয়েস 'PAID' করে দিচ্ছে! কীভাবে RLS দিয়ে এটি প্রতিরোধ করবে?",
          "m": "মারাত্মক আর্কিটেকচারাল ভুল: ক্লায়েন্টকে সরাসরি সংবেদনশীল `status` ফিল্ড আপডেট করার অনুমতি দেওয়া হয়েছে! সমাধান: (১) সাধারণ ইউজারের জন্য UPDATE পলিসিতে শুধুমাত্র নন-সংবেদনশীল ফিল্ড এলাও করব অথবা `status` ফিল্ডের পরিবর্তন ব্লক করব: `WITH CHECK (status = (SELECT status FROM invoices WHERE id = invoices.id))`। (২) ইনভয়েস স্ট্যাটাস 'PAID' করার ক্ষমতা সম্পূর্ণভাবে ফ্রন্টএন্ড থেকে কেড়ে নিয়ে একটি সুরক্ষিত ব্যাকএন্ড Edge Function বা নোড সার্ভারে স্থানান্তর করতে হবে—যেখানে বিকাশ/স্ট্রাইপ পেমেন্ট সফল হওয়ার পরই কেবল `service_role` দিয়ে স্ট্যাটাস আপডেট হবে।",
          "b": "কাস্টমার যেন নিজে স্ট্যাটাস আপডেট করতে না পারে সেজন্য RLS পলিসিতে শর্ত দিতে হবে এবং স্ট্যাটাস পেইড করার কাজটি ক্লায়েন্ট থেকে সরিয়ে সার্ভার-সাইড পেমেন্ট ভেরিফিকেশন ফাংশনে স্থানান্তর করতে হবে।",
          "e": "Revoke client permissions to update the sensitive status column via RLS policies. Confine payment confirmation logic to an Edge Function or secure server that updates status exclusively after verifying genuine payment gateway callbacks.",
          "code": "CREATE POLICY \"Customers can only update notes\" ON invoices\nFOR UPDATE USING (customer_id = auth.uid())\nWITH CHECK (status = 'PENDING'); -- Disallow self-marking as PAID"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ড্যাশবোর্ডে পেজ রিফ্রেশ না করেই নতুন অর্ডার লাইভ দেখানোর জন্য Supabase Realtime সাবস্ক্রিপশন ব্যবহার করা হয়েছে, কিন্তু প্রোডাকশনে একই অর্ডারের ইভেন্ট একাধিকবার আসছে এবং ডুপ্লিকেট নোটিফিকেশন দেখাচ্ছে। কীভাবে ফিক্স করবে?",
          "m": "কারণসমূহ: (১) React কম্পোনেন্টে `useEffect`-এর ভেতর সাবস্ক্রিপশন তৈরির পর ক্লিনআপ ফাংশন দেওয়া হয়নি, ফলে প্রতিটি রি-রেন্ডারে নতুন WebSocket চ্যানেল তৈরি হয়ে ডুপ্লিকেট লিসেনার বসছে। (২) ব্যাকএন্ডে একই ট্রানজ্যাকশনে একাধিক UPDATE কল হওয়ায় একাধিক CDC ইভেন্ট ফায়ার হচ্ছে। ফিক্স: (১) React-এ অবশ্যই `return () => { supabase.removeChannel(channel); }` ক্লিনআপ রিটার্ন করতে হবে। (২) ফ্রন্টএন্ড স্টেটে অর্ডার পুশ করার আগে একটি ইউনিক সেট বা `id` দিয়ে ডি-ডুপ্লিকেশন চেক করতে হবে: `if (!existingIds.has(newOrder.id)) { ... }`।",
          "b": "useEffect-এ চ্যানেল ক্লিনআপ না করায় এবং স্টেট আপডেটে আইডি চেক না করায় ডুপ্লিকেট ইভেন্ট আসছে। removeChannel দিয়ে আনমাউন্টে ক্লিনআপ এবং আইডির ভিত্তিতে ডি-ডুপ্লিকেশন করলেই সমস্যা সমাধান হবে।",
          "e": "The duplicate notifications stem from missing React useEffect subscription cleanups upon re-renders. Always return a cleanup function invoking supabase.removeChannel(channel), and enforce an in-memory Set or Map deduplication filter on incoming event IDs before state injection.",
          "code": "useEffect(() => {\n  const channel = supabase.channel('orders')\n    .on('postgres_changes', { event: 'INSERT', table: 'orders' }, handleNewOrder)\n    .subscribe();\n  return () => { supabase.removeChannel(channel); }; // Crucial cleanup!\n}, []);"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: Supabase RLS ব্যবহারের পর একটি পেজে ৫০টি প্রোডাক্ট রেন্ডার করতে গিয়ে এপিআই রেসপন্স টাইম ৫০০ms থেকে বেড়ে ৩.৫ সেকেন্ড হয়ে গেছে। কুয়েরি প্ল্যানে কী খুঁজবে এবং কীভাবে ফিক্স করবে?",
          "m": "তদন্ত: `EXPLAIN ANALYZE SELECT * FROM products;` চালালে দেখা যাবে RLS পলিসির ভেতরে থাকা ইউজার রোল চেক করার ফাংশনটি প্রতিটি রোর জন্য ৫০ বার রান হচ্ছে এবং প্রতিবার ফুল টেবিল স্ক্যান করছে। ফিক্স: (১) RLS পলিসিতে ব্যবহৃত কলামগুলোতে (যেমন `created_by`, `org_id`) B-Tree ইনডেক্স নিশ্চিত করা। (২) পলিসির ভেতরের সাব-কুয়েরিকে একটি `SECURITY DEFINER STABLE` ফাংশন দিয়ে র‍্যাপ করা—যাতে পোস্টগ্রেস পুরো কুয়েরির জন্য ফাংশনটি মাত্র একবার রান করে রেজাল্ট ক্যাশ করে রাখে এবং ৫০ বার না চালায়। রেসপন্স টাইম সাথে সাথে ২০ মিলিসেকেন্ডে নেমে আসবে।",
          "b": "RLS পলিসির ভেতরে থাকা ফাংশন প্রতিটি রোর জন্য বারবার চলায় কুয়েরি স্লো হয়েছিল। ফাংশনটিকে STABLE মার্ক করলে পোস্টগ্রেস এটি একবার এক্সিকিউট করে ক্যাশ করে রাখে এবং কুয়েরি তাৎক্ষণিক দ্রুত হয়।",
          "e": "The latency surge occurs because an unindexed RLS policy subquery evaluates on every single row scan. Wrap the authorization lookup inside a STABLE SQL function; the planner executes STABLE functions once per transaction statement rather than once per row.",
          "code": "CREATE OR REPLACE FUNCTION get_current_user_role()\nRETURNS TEXT STABLE LANGUAGE sql AS $$\n  SELECT role FROM user_roles WHERE user_id = auth.uid();\n$$;"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে ক্যাশিয়ার, ইনভেন্টরি ম্যানেজার এবং শপ ওনারের জন্য Supabase RLS দিয়ে গ্র্যানুলার এক্সেস পলিসি কীভাবে সাজানো হয়েছে?",
          "m": "দোকানি পিওএসে পোস্টগ্রেস RLS দিয়ে ৩ স্তরের রোল-বেসড পলিসি কার্যকর: (১) `CASHIER`: শুধুমাত্র সেলস ইনভয়েস তৈরি করতে পারে (`INSERT`) এবং সেলসের হিস্ট্রি দেখতে পারে (`SELECT`), কিন্তু প্রোডাক্টের কস্ট প্রাইস বা প্রফিট মার্জিন দেখতে পারে না এবং কোনো পুরনো ইনভয়েস এডিট বা ডিলিট করতে পারে না (`UPDATE/DELETE denied`)। (২) `MANAGER`: প্রোডাক্ট স্টক আপডেট ও ক্যাটালগ এডিট করতে পারে কিন্তু ফিনান্সিয়াল লেজার বা দোকান ডিলিট করতে পারে না। (৩) `OWNER`: সমস্ত টেবিল, প্রফিট-লস অ্যানালিটিক্স এবং সেটিংসে পূর্ণ অধিকার রাখে। এই পলিসি ডেটাবেজ লেভেলে সুরক্ষিত থাকায় ফ্রন্টএন্ড কোডে কোনো বাগ থাকলেও নিরাপত্তা কখনো লঙ্ঘন হয় না।",
          "b": "দোকানিতে RLS দিয়ে ক্যাশিয়ারকে শুধু সেলস করা ও দেখার অনুমতি দেওয়া হয়েছে (দাম পরিবর্তন বা ডিলিট নিষিদ্ধ), ম্যানেজারকে স্টক ম্যানেজ করার এবং ওনারকে সমস্ত রিপোর্টিং দেখার পূর্ণ অধিকার দিয়ে ডেটাবেজ লেভেলে নিরাপত্তা সুরক্ষিত রাখা হয়েছে।",
          "e": "In Dokani POS, granular RLS policies govern organizational roles: CASHIERs hold INSERT/SELECT privileges strictly over invoices with cost prices masked; MANAGERs possess inventory mutation rights; OWNERs retain overarching financial ledger and analytical access.",
          "tip": "দোকানির এই ৩-লেভেল রোল সেপারেশন (Cashier vs Manager vs Owner) বাস্তব এন্টারপ্রাইজ সিস্টেমের ক্লাসিক উদাহরণ।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Supabase-এ OAuth (Google, GitHub) লগইনের পর অটোমেটিক ইউজার অনবোর্ডিং ও রোল অ্যাসাইনমেন্ট কীভাবে হ্যান্ডেল করবে?",
          "m": "ইউজার যখন Google দিয়ে সাইন আপ করে: (১) Supabase Auth স্বয়ংক্রিয়ভাবে `auth.users` টেবিলে গুগলের তথ্য (ইমেইল, নাম, এভাটার) ইনসার্ট করে। (২) আমাদের ডেটাবেজ ট্রিগার `on_auth_user_created` ফায়ার হয়। (৩) ট্রিগারটি চেক করে ইউজারের কোনো ইনভাইটেশন টোকেন আছে কি না; না থাকলে সে একটি নতুন টেন্যান্ট তৈরি করে এবং ইউজারকে `OWNER` রোল দেয়। (৪) যদি ইনভাইটেশন থাকে, সে সংশ্লিষ্ট কোম্পানিতে ইউজারকে `CASHIER` রোলে জয়েন করায়। পুরো প্রক্রিয়াটি ক্লায়েন্টের কোনো ইন্টারভেনশন ছাড়াই এক ট্রানজ্যাকশনে সম্পন্ন হয়।",
          "b": "গুগল সাইনআপের পর ডেটাবেজ ট্রিগার স্বয়ংক্রিয়ভাবে ইউজারের প্রোফাইল তৈরি করে, ইনভাইটেশন যাচাই করে কোম্পানি ও রোল অ্যাসাইন করে দেয়। ক্লায়েন্ট কোড ছাড়াই ব্যাকগ্রাউন্ডে পুরো প্রক্রিয়া সম্পন্ন হয়।",
          "e": "Upon OAuth completion, an asynchronous PostgreSQL trigger on auth.users inspects invitation metadata, provisions the public profile, creates or associates tenant organizations, and assigns initial RBAC roles in a single database step.",
          "code": "CREATE TRIGGER on_oauth_signup AFTER INSERT ON auth.users\nFOR EACH ROW EXECUTE FUNCTION handle_oauth_onboarding();"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Supabase Auth-এ কাস্টম JWT Claims ইনজেকশন (Custom Access Tokens) কীভাবে কনফিগার করবে?",
          "m": "Supabase v2-এ কাস্টম JWT ক্লেইমস ইনজেক্ট করার জন্য 'Custom Access Token (Auth Hook)' ব্যবহার করা হয়। আমরা একটি PostgreSQL ফাংশন লিখি যা Supabase Auth-এর `auth.jwt_attribute` হুকে রেজিস্টার করা থাকে। যখনই ইউজার লগইন করে বা টোকেন রিফ্রেশ হয়, এই হুকটি স্বয়ংক্রিয়ভাবে ইউজারের ডাটাবেজ টেবিল থেকে `tenant_id`, `role`, এবং `permissions` অ্যারে তুলে এনে JWT-র ভেতর ইনজেক্ট করে এনকোড করে দেয়। ফলে ফ্রন্টএন্ড এবং RLS পলিসি প্রতি রিকোয়েস্টে কোনো অতিরিক্ত ডেটাবেজ কুয়েরি ছাড়াই মুহূর্তেই ইউজারের পারমিশন ভ্যালিডেট করতে পারে।",
          "b": "সুপাবেস অ্যাথ হুক ব্যবহার করে লগইনের সময় টোকেনের ভেতর tenant_id ও role ইনজেক্ট করা হয়। ফলে এপিআই এবং RLS কোনো অতিরিক্ত কুয়েরি ছাড়াই টোকেন দেখে ইউজারের রোল যাচাই করতে পারে।",
          "e": "Configure Supabase Custom Access Token Hooks via PL/pgSQL. The auth hook intercepts token signing during login, querying user roles and tenant IDs and embedding them directly into the signed JWT payload, eliminating runtime database lookups during RLS evaluation.",
          "code": "CREATE OR REPLACE FUNCTION custom_access_token_hook(event jsonb)\nRETURNS jsonb LANGUAGE plpgsql STABLE AS $$\n  -- Injects tenant_id and role into event->'claims'\n$$;"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Supabase-এ Soft Delete আর্কিটেকচার এবং RLS পলিসির সমন্বয় কীভাবে করবে?",
          "m": "সফট ডিলিটের জন্য প্রতিটি টেবিলে `deleted_at TIMESTAMPTZ` ফিল্ড রাখা হয়। এরপর RLS পলিসিতে স্বাভাবিক শর্তের সাথে `AND deleted_at IS NULL` যুক্ত করা হয়। যখন কোনো ইউজার কোনো রো 'ডিলিট' করে, ক্লায়েন্ট আসলে `UPDATE products SET deleted_at = NOW()` চালায়। RLS পলিসির কারণে এর পর থেকে সাধারণ কোনো কুয়েরিতে ডিলিট হওয়া রেকর্ডগুলো আর আসবে না। কিন্তু অ্যাডমিন বা অডিট ট্রেইলের জন্য আলাদা সার্ভিস রোল কুয়েরি দিয়ে যেকোনো সময় মুছে যাওয়া ডেটা ফিরিয়ে আনা (Restore) সম্ভব হয়।",
          "b": "সফট ডিলিটের ক্ষেত্রে RLS পলিসিতে deleted_at IS NULL শর্ত জুড়ে দেওয়া হয়। ফলে ডিলিট হওয়া রেকর্ড স্বাভাবিক কুয়েরিতে অদৃশ্য থাকে কিন্তু ব্যাকআপ ও অডিটের জন্য ডাটাবেজে স্থায়ীভাবে সংরক্ষিত থাকে।",
          "e": "Coupling Soft Deletion with RLS requires appending AND deleted_at IS NULL to the SELECT/UPDATE USING policies. Deleting an entity mutates deleted_at = NOW(), instantly rendering the record invisible to normal tenants while preserving historical auditability.",
          "code": "CREATE POLICY \"Active products only\" ON products\nFOR SELECT USING (\n  tenant_id = (auth.jwt()->'app_metadata'->>'tenant_id')::uuid AND\n  deleted_at IS NULL\n);"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Supabase প্রোডাকশন ডেটাবেজ মাইগ্রেশন ও লোকাল ডেভেলপমেন্ট ওয়ার্কফ্লো (Supabase CLI) কীভাবে পরিচালিত হয়?",
          "m": "প্রোডাকশন ডেটাবেজে সরাসরি ড্যাশবোর্ড থেকে চেঞ্জ করা সম্পূর্ণ নিষিদ্ধ! আমরা `supabase init` এবং Docker দিয়ে লোকাল ডেটাবেজ চালাই। সব স্কিমা ও RLS পলিসির পরিবর্তন `supabase db diff -f add_orders_rls` কমান্ড দিয়ে ভার্সন-কন্ট্রোল্ড SQL মাইগ্রেশন ফাইল হিসেবে গিটহাবে কমিট করা হয়। এরপর GitHub Actions CI/CD পাইপলাইনে টেস্ট চালানো হয় এবং `supabase db push` কমান্ড দিয়ে স্বয়ংক্রিয়ভাবে প্রোডাকশন ডাটাবেজে মাইগ্রেশন অ্যাপ্লাই করা হয়। এটি কোনো অপ্রত্যাশিত ম্যানুয়াল ত্রুটি ছাড়া ১০০% নিরাপদ ও ট্র্যাকড ডিপ্লয়মেন্ট নিশ্চিত করে।",
          "b": "প্রোডাকশনে ম্যানুয়াল চেঞ্জ নিষিদ্ধ। লোকাল ডকার ও Supabase CLI দিয়ে কাজ করে supabase db diff দিয়ে মাইগ্রেশন ফাইল তৈরি করা হয় এবং গিটহাব অ্যাকশন দিয়ে প্রোডাকশনে অটো-মাইগ্রেট করা হয়।",
          "e": "Enforce strict CI/CD with the Supabase CLI: develop locally against Docker containers, capture declarative schema/RLS changes using supabase db diff, commit migrations to Git, and apply them automatically to production environments via GitHub Actions with supabase db push.",
          "tip": "বলো: 'We strictly prohibit dashboard mutations; all schema and RLS policies are version-controlled via Supabase CLI migrations in CI/CD.'"
        }
      ]
    },
    {
      "id": "database-backup-maintenance",
      "name": "Database Backup, Connection Pooling & Maintenance",
      "desc": "pg_dump, mongodump, PITR & WAL Archiving, PgBouncer, VACUUM & Autovacuum, XID Wraparound, Disaster Recovery (RTO/RPO)",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Database Backup-এর ক্ষেত্রে Logical Backup বনাম Physical Backup-এর মধ্যে মূল পার্থক্য কী?",
          "m": "(১) `Logical Backup` (যেমন `pg_dump`, `mongodump`): ডেটাবেজের স্কিমা ও ডেটাকে মানুষের পাঠযোগ্য SQL স্টেটমেন্ট বা JSON/BSON ফাইলে এক্সপোর্ট করে। সুবিধা: ভার্সন পরিবর্তন বা ভিন্ন সার্ভারে সহজে রিস্টোর করা যায়, নির্দিষ্ট টেবিল ব্যাকআপ নেওয়া যায়। অসুবিধা: শত শত গিগাবাইট ডেটায় ব্যাকআপ ও রিস্টোর হতে ঘণ্টার পর ঘণ্টা সময় নেয়। (২) `Physical Backup` (যেমন `pg_basebackup`, ফাইলসিস্টেম স্ন্যাপশট): ডিস্কের আসল বাইনারি ডেটা ব্লক ও ফাইলগুলোর হুবহু কপি সংরক্ষণ করে। সুবিধা: টেরাবাইট ডেটাও অত্যন্ত দ্রুত ব্যাকআপ ও রিস্টোর করা যায় এবং Point-In-Time Recovery (PITR) সম্ভব হয়।",
          "b": "লজিক্যাল ব্যাকআপ (pg_dump) ডেটাকে এসকিউএল স্ক্রিপ্ট আকারে এক্সপোর্ট করে যা ছোট বা মাঝারি ডেটায় উপযোগী। ফিজিক্যাল ব্যাকআপ (pg_basebackup) ডিস্কের বাইনারি ফাইল কপি করে যা বিশাল ডেটাবেজে দ্রুত ব্যাকআপ ও তাৎক্ষণিক রিস্টোরের সুবিধা দেয়।",
          "e": "Logical Backups (pg_dump, mongodump) export database entities as declarative SQL statements or BSON payloads, ideal for schema portability across versions. Physical Backups (pg_basebackup, volume snapshots) copy raw binary database cluster files, executing orders of magnitude faster for multi-terabyte disaster recovery.",
          "tip": "বলো: 'Logical exports SQL statements; Physical clones raw disk binary pages for rapid disaster recovery.'"
        },
        {
          "lvl": "lvl1",
          "q": "Point-in-Time Recovery (PITR) কী এবং এটি কীভাবে কাজ করে?",
          "m": "PITR হলো এমন একটি উন্নত রিকভারি মেকানিজম যার মাধ্যমে ডেটাবেজকে অতীতের যেকোনো সুনির্দিষ্ট সেকেন্ডের অবস্থায় ফিরিয়ে নেওয়া যায় (যেমন আজ দুপুর ২:১৪ মিনিট ৩৭ সেকেন্ডে কোনো ডেভেলপার ভুলবশত টেবিল ড্রপ করলে, ঠিক ২:১৪ মিনিট ৩৬ সেকেন্ডের অবস্থায় রিস্টোর করা)! এটি কাজ করে দুটি জিনিসের সমন্বয়ে: (১) একটি বেস ফিজিক্যাল ব্যাকআপ (Base Backup), এবং (২) অবিচ্ছিন্নভাবে সংগৃহীত সমস্ত ট্রানজ্যাকশন লগ বা WAL (Write-Ahead Log) ফাইল। রিস্টোরের সময় বেস ব্যাকআপ লোড করে ঠিক ওই নির্দিষ্ট সেকেন্ড পর্যন্ত WAL লগগুলো রি-প্লে করা হয়।",
          "b": "পিআইটিআর হলো অতীতের যেকোনো নির্দিষ্ট সেকেন্ডের অবস্থায় ডেটাবেজ ফিরিয়ে নেওয়ার ব্যবস্থা। এটি বেস ব্যাকআপ লোড করে নির্দিষ্ট সেকেন্ড পর্যন্ত WAL লগগুলো রি-প্লে করে ডেটাবেজকে ভুল অপারেশনের ঠিক আগের অবস্থায় নিখুঁতভাবে উদ্ধার করে।",
          "e": "Point-in-Time Recovery (PITR) allows restoring a database cluster to any precise historical timestamp (e.g., one second before a catastrophic DROP TABLE command). It operates by restoring a baseline physical backup and replaying sequential WAL archives up to the target recovery target timestamp.",
          "code": "# postgresql.conf recovery settings:\nrestore_command = 'cp /mnt/archive/%f %p'\nrecovery_target_time = '2026-10-08 14:14:36 UTC'"
        },
        {
          "lvl": "lvl1",
          "q": "Connection Pooling কী এবং নোড অ্যাপ্লিকেশনে কেন সরাসরি আনলিমিটেড কানেকশন খোলা বিপজ্জনক?",
          "m": "ডেটাবেজে প্রতিটি নতুন কানেকশন খোলার জন্য মেমোরি অ্যালোকিশন, TCP হ্যান্ডশেক ও প্রসেস ফোর্কিং লাগে (PostgreSQL-এ প্রতিটি কানেকশন ৫-১০MB RAM দখল করে)। যদি ১০০০ জন ইউজার একসাথে রিকোয়েস্ট করে এবং নোড অ্যাপ ১০০০টি সমান্তরাল কানেকশন খোলার চেষ্টা করে, তবে ডেটাবেজ সার্ভারের সমস্ত র‍্যাম ও সিপিইউ ক্র্যাশ করবে (Connection Starvation)! Connection Pool আগে থেকেই একটি নির্দিষ্ট সংখ্যক (যেমন ২০ বা ৫০টি) প্রস্তুত কানেকশন মেমোরিতে জীবিত রাখে। এপিআই রিকোয়েস্ট পুল থেকে একটি কানেকশন ধার নেয়, কাজ শেষ করে সাথে সাথে পুলে ফেরত দেয়।",
          "b": "কানেকশন পুল সীমিত সংখ্যক ডাটাবেজ কানেকশন প্রস্তুত রাখে এবং রিকোয়েস্টগুলোর মধ্যে শেয়ার করে। সরাসরি শত শত কানেকশন খুললে সার্ভারের র‍্যাম শেষ হয়ে ডাটাবেজ ক্র্যাশ করে, যা কানেকশন পুল পুরোপুরি প্রতিরোধ করে।",
          "e": "A Connection Pool maintains a reusable cache of active database connections. Opening raw database connections per request is catastrophic because each connection incurs TCP handshakes and allocates dedicated PostgreSQL process RAM (5-10MB). A pool caps concurrency to optimal hardware limits.",
          "tip": "মনে রাখবে: 'Connections are expensive processes; pooling recycles a bounded set of connections.'"
        },
        {
          "lvl": "lvl1",
          "q": "PostgreSQL-এ `VACUUM` কী এবং ডেড টুপল (Dead Tuples) পরিষ্কার করা কেন আবশ্যক?",
          "m": "PostgreSQL-এর MVCC আর্কিটেকচারের কারণে যখন কোনো রো আপডেট বা ডিলিট হয়, তখন ডেটাবেজ ডিস্ক থেকে তাৎক্ষণিকভাবে তা মুছে ফেলে না; বরং রোটিকে একটি 'ডেড টুপল' হিসেবে রেখে দেয়। সময়ের সাথে সাথে এই ডেড টুপলগুলো জমে ডিস্কের জায়গা নষ্ট করে এবং কুয়েরিকে স্লো করে দেয় (Table Bloat)। `VACUUM` কমান্ড এই ডেড টুপলগুলোর জায়গা মুক্ত করে যাতে ভবিষ্যতে নতুন ইনসার্ট বা আপডেটে সেই ডিস্ক স্পেস পুনরায় ব্যবহার করা যায়। নিয়মিত ভ্যাকুয়াম না করলে ডেটাবেজ সাইজ অস্বাভাবিক ফুলে যায়।",
          "b": "আপডেট ও ডিলিটের ফলে সৃষ্ট ডেড টুপলগুলো পরিষ্কার করতে ভ্যাকুয়াম কমান্ড ব্যবহৃত হয়। এটি অপ্রয়োজনীয় স্থান মুক্ত করে যাতে নতুন ডেটা সেখানে সংরক্ষণ করা যায় এবং ডেটাবেজ ব্লোট হওয়া রোধ হয়।",
          "e": "Under PostgreSQL MVCC, mutations generate obsolete row versions termed 'dead tuples'. Over time, dead tuples cause table bloat and degrade performance. VACUUM scans pages to reclaim dead tuple disk space, making it available for subsequent inserts without resizing disk partitions.",
          "code": "VACUUM VERBOSE orders;"
        },
        {
          "lvl": "lvl1",
          "q": "Disaster Recovery-তে RTO (Recovery Time Objective) এবং RPO (Recovery Point Objective)-এর অর্থ কী?",
          "m": "(১) `RTO (Recovery Time Objective)`: একটি বড় দুর্যোগ বা সার্ভার ডাউন হওয়ার পর সিস্টেমকে পুনরায় চালু ও সচল করতে সর্বোচ্চ কত সময় নেওয়া যাবে (Time to recover—যেমন 'আমাদের RTO হলো ৩০ মিনিট')। (২) `RPO (Recovery Point Objective)`: কোনো দুর্যোগে সর্বোচ্চ কত সময়ের ডেটা হারানো কোম্পানি বরদাশত করতে পারবে (Data loss tolerance—যেমন যদি প্রতি ১ ঘণ্টায় ব্যাকআপ নেওয়া হয়, তবে দুর্যোগে ১ ঘণ্টার ডেটা মুছে যেতে পারে, অর্থাৎ RPO = ১ ঘণ্টা)। ফিনান্সিয়াল ও মিশন-ক্রিটিক্যাল অ্যাপে RPO হতে হয় ০ (Zero Data Loss) এবং RTO হতে হয় কয়েক মিনিট।",
          "b": "RTO হলো বিপর্যয়ের পর সিস্টেম চালু করতে অনুমোদিত সর্বোচ্চ সময়। আর RPO হলো কত সময়ের ডেটা হারানো মেনে নেওয়া যায়। মিশন ক্রিটিক্যাল সিস্টেমে RTO ও RPO যত কম হয় সিস্টেম তত নির্ভরযোগ্য।",
          "e": "RTO (Recovery Time Objective) defines the acceptable duration of time an application can remain offline before restoration. RPO (Recovery Point Objective) defines the maximum acceptable window of data loss measured in time (e.g. 15 minutes of transactional drift) during a disaster.",
          "tip": "ইন্টারভিউতে 'RTO = Downtime tolerance, RPO = Data loss tolerance' সংক্ষেপে বলবে।"
        },
        {
          "lvl": "lvl2",
          "q": "PgBouncer কী এবং এর ৩টি পুলিং মোড (Session, Transaction, Statement)-এর মধ্যে পার্থক্য কী?",
          "m": "PgBouncer হলো PostgreSQL-এর জন্য একটি অত্যন্ত লাইটওয়েট ও উচ্চ-কার্যক্ষমতাসম্পন্ন কানেকশন পুলার যা হাজার হাজার ক্লায়েন্ট কানেকশনকে হ্যান্ডেল করে ডেটাবেজে মাত্র ৩০-৪০টি কানেকশনে ম্যাপ করে দেয়। ৩টি মোড: (১) `Session Mode` (ডিফল্ট): ক্লায়েন্ট ডিসকানেক্ট না হওয়া পর্যন্ত পুরো সেশনের জন্য সার্ভার কানেকশন ধরে রাখে (সবচেয়ে কম পুলিং ইফিসিয়েন্সি)। (২) `Transaction Mode` (প্রোডাকশন স্ট্যান্ডার্ড): প্রতিটি ট্রানজ্যাকশন শেষ (COMMIT বা ROLLBACK) হওয়ার সাথে সাথেই কানেকশনটি পুলে ফেরত আসে এবং অন্য কোনো ক্লায়েন্টকে দেওয়া হয় (সর্বোচ্চ থ্রুপুট)। সতর্কতা: এতে সেশন-লেভেল ভ্যারিয়েবল বা লিসেন/নোটিফাই কাজ করে না। (৩) `Statement Mode`: প্রতিটি একক SQL স্টেটমেন্টের পর কানেকশন রিলিজ হয় (মাল্টিপল স্টেটমেন্ট ট্রানজ্যাকশন সমর্থন করে না)।",
          "b": "PgBouncer হাজার হাজার কানেকশনকে অল্প কয়েকটি ডাটাবেজ কানেকশনে পরিচালনা করে। সেশন মোড পুরো সেশনের জন্য কানেকশন রাখে, ট্রানজ্যাকশন মোড প্রতি ট্রানজ্যাকশন শেষে কানেকশন শেয়ার করে যা সেরা, আর স্টেটমেন্ট মোড প্রতি কুয়েরি পর কানেকশন রিলিজ করে।",
          "e": "PgBouncer multiplexes thousands of incoming client connections down to a small set of PostgreSQL backend connections. Modes: Session assigns a connection for the client's lifetime; Transaction pools connections per transaction (the industry standard for high throughput); Statement pools per SQL query (forbidding multi-query transactions).",
          "code": "# pgbouncer.ini:\npool_mode = transaction\nmax_client_conn = 5000\ndefault_pool_size = 30"
        },
        {
          "lvl": "lvl2",
          "q": "PostgreSQL `Autovacuum` কীভাবে কাজ করে এবং হাই-ট্রাফিক সিস্টেমে এর ডিফল্ট কনফিগারেশন কেন টিউন করতে হয়?",
          "m": "Autovacuum হলো একটি ব্যাকগ্রাউন্ড ডেমন যা ডেড টুপলের সংখ্যা একটি নির্দিষ্ট থ্রেশহোল্ড ছাড়িয়ে গেলে স্বয়ংক্রিয়ভাবে টেবিলে ভ্যাকুয়াম এবং অ্যানালাইজ চালায় (`threshold = base + factor * total_rows`)। ডিফল্ট কনফিগারেশন বড় টেবিলের জন্য অত্যন্ত ধীরগতির! কোটি রোর টেবিলে ডিফল্ট ২০% স্কেল ফ্যাক্টরের কারণে ২০ লাখ রো ডেড না হওয়া পর্যন্ত ভ্যাকুয়াম শুরুই হয় না—ফলে বিশাল টেবিল ব্লোট ঘটে। প্রোডাকশনে `autovacuum_vacuum_scale_factor = 0.05` (৫%) এবং `autovacuum_cost_limit = 1000` বাড়িয়ে দিতে হয় যাতে ব্যাকগ্রাউন্ড ভ্যাকুয়াম ঘন ঘন ও দ্রুত সম্পন্ন হয়।",
          "b": "অটোভ্যাকুয়াম স্বয়ংক্রিয়ভাবে ডেড টুপল পরিষ্কার করে। বড় টেবিলে ডিফল্ট সেটিংস ধীরগতির হওয়ায় স্কেল ফ্যাক্টর কমিয়ে (০.০৫) এবং কস্ট লিমিট বাড়িয়ে ঘন ঘন ভ্যাকুয়াম নিশ্চিত করতে হয়।",
          "e": "Autovacuum automatically runs background VACUUM and ANALYZE when dead tuples exceed autovacuum_vacuum_threshold + autovacuum_vacuum_scale_factor * rows. Default settings (0.2 scale factor) neglect large tables until millions of tuples rot; tune scale factors down to 0.05 on high-write systems.",
          "code": "ALTER TABLE high_volume_orders SET (\n  autovacuum_vacuum_scale_factor = 0.05,\n  autovacuum_vacuum_cost_limit = 1000\n);"
        },
        {
          "lvl": "lvl2",
          "q": "`VACUUM FULL` কমান্ডের মারাত্মক ঝুঁকি কী এবং প্রোডাকশনে এর বদলে `pg_repack` কেন ব্যবহার করা হয়?",
          "m": "সাধারণ `VACUUM` ডিস্ক স্পেস মুক্ত করে ভবিষ্যৎ ব্যবহারের জন্য ইন্টারনালি রেখে দেয় কিন্তু অপারেটিং সিস্টেমে হার্ডডিস্ক স্পেস ফেরত দেয় না। `VACUUM FULL` টেবিলটিকে সম্পূর্ণ নতুনভাবে তৈরি করে অপারেটিং সিস্টেমের ডিস্ক স্পেস ফিরিয়ে দেয়। মারাত্মক ঝুঁকি: এটি পুরো টেবিলের ওপর একটি `AccessExclusiveLock` ফেলে—যার ফলে টেবিলটিতে সমস্ত রিড ও রাইট সম্পূর্ণ ব্লক হয়ে যায়! কোটি রোর টেবিলে এটি কয়েক ঘণ্টা সময় নিতে পারে এবং পুরো সাইট ডাউন থাকবে। সমাধান: প্রোডাকশনে `pg_repack` টুল ব্যবহার করা হয়—যা কোনো এক্সক্লুসিভ টেবিল লক ছাড়াই লাইভ সাইটে ডিস্ক স্পেস রিক্লেইম করে সম্পূর্ণ নতুন ফ্রেশ টেবিল বানিয়ে দেয়।",
          "b": "VACUUM FULL সম্পূর্ণ টেবিলে এক্সক্লুসিভ লক ফেলে রিড-রাইট বন্ধ করে দেয় যা সাইট ডাউন ঘটায়। এর বিকল্প হিসেবে pg_repack ব্যবহার করা হয় যা সাইট লাইভ রেখেই লক ছাড়া ডিস্ক স্পেস মুক্ত করে।",
          "e": "VACUUM FULL rewrites the table to reclaim disk space to the OS, but acquires an AccessExclusiveLock, blocking all concurrent SELECT and mutation traffic for hours. Production systems use pg_repack instead, which reorganizes tables and reclaims disk online with zero table locking.",
          "tip": "কখনোই প্রোডাকশনে `VACUUM FULL` চালাবে না; সবসময় `pg_repack` ব্যবহার করবে।"
        },
        {
          "lvl": "lvl2",
          "q": "PostgreSQL Transaction ID (XID) Wraparound কী এবং এটি ডেটাবেজকে কীভাবে হঠাৎ বন্ধ করে দিতে পারে?",
          "m": "PostgreSQL প্রতিটি ট্রানজ্যাকশনকে একটি ৩২-বিট পূর্ণসংখ্যা আইডি দেয় (যার সর্বোচ্চ মান প্রায় ৪ বিলিয়ন, কার্যকর সীমা ২ বিলিয়ন)। যদি ২ বিলিয়ন ট্রানজ্যাকশন সম্পন্ন হওয়ার আগে পুরনো ট্রানজ্যাকশনগুলোকে 'ফ্রিজ' (Freeze) না করা হয়, তবে আইডি কাউন্টার আবার ০-তে ফিরে আসবে (Wraparound)। তখন পোস্টগ্রেস ভাববে অতীতের সব ডেটা ভবিষ্যতের ডেটা এবং মুহূর্তে সম্পূর্ণ ডেটাবেজ অদৃশ্য বা করাপ্ট হয়ে যাবে! এই মহা-দুর্যোগ থেকে রক্ষা করতে PostgreSQL একটি সেলফ-ডিফেন্স মেকানিজম হিসেবে পুরো ডেটাবেজকে রিড-অনলি বা অফলাইনে বন্ধ করে দেয়। অটোভ্যাকুয়ামের কাজ হলো সময়মতো এই এক্সআইডি ফ্রিজ করা।",
          "b": "ট্রানজ্যাকশন আইডি ২ বিলিয়ন ছাড়িয়ে গেলে আইডি আবার ০-তে ফিরে গিয়ে ডেটা অদৃশ্য হওয়ার ঝুঁকি তৈরি করে। ডেটাবেজ নিজেকে বাঁচাতে হঠাৎ বন্ধ হয়ে যায়। অটোভ্যাকুয়াম পুরনো আইডি ফ্রিজ করে এই সংকট প্রতিরোধ করে।",
          "e": "PostgreSQL transaction IDs (XIDs) are 32-bit integers capping at ~2 billion before wrapping around. If Autovacuum fails to freeze historical tuples before hitting this horizon, PostgreSQL halts the database and refuses writes to protect against catastrophic data corruption.",
          "code": "SELECT datname, age(datfrozenxid) FROM pg_database ORDER BY age DESC;"
        },
        {
          "lvl": "lvl2",
          "q": "MongoDB-তে `mongodump` এবং `mongorestore` ব্যবহার করে প্রোডাকশন ব্যাকআপ ও অপটিমাইজেশন কীভাবে করবে?",
          "m": "`mongodump` মঙ্গোডিবি থেকে BSON আকারে ডেটা এক্সপোর্ট করে। হাই-পারফরম্যান্স অপটিমাইজেশন: (১) `--gzip` ফ্ল্যাগ ব্যবহার করে অন-দ্য-ফ্লাই কম্প্রেস করা যাতে ফাইল সাইজ ৭০% ছোট হয়। (২) `--numParallelCollections=4` দিয়ে একাধিক কালেকশন সমান্তরালে দ্রুত ডাম্প করা। (৩) `--archive` দিয়ে একটি একক আর্চিভ স্ট্রিম সরাসরি পাইপ করে AWS S3 বা রিমোট স্টোরেজে আপলোড করা (`mongodump --archive | aws s3 cp - s3://backup/db.gz`)—যাতে লোকাল সার্ভারের ডিস্ক স্পেস কোনোভাবেই পূর্ণ না হয়। রিস্টোরের সময় `mongorestore --nsInclude='dbname.*' --gzip` দিয়ে দ্রুত রিস্টোর করা যায়।",
          "b": "mongodump এর সাথে --gzip দিয়ে ফাইল ছোট করা হয় এবং পাইপ করে সরাসরি ক্লাউড স্টোরেজে আপলোড করা হয় যাতে সার্ভারের লোকাল ডিস্ক ভরে না যায়। রিস্টোর করতে mongorestore ব্যবহার করা হয়।",
          "e": "Run mongodump with --gzip for instant compression and --numParallelCollections to exploit multi-core CPUs. Stream backups directly to cloud buckets using --archive (piping to AWS S3 / GCS) to avoid exhausting local VPS storage space.",
          "code": "mongodump --uri=\"$MONGO_URI\" --gzip --archive=\"backup-$(date +%F).gz\""
        },
        {
          "lvl": "lvl3",
          "q": "WAL Archiving এবং AWS S3-তে কন্টিনিউয়াস শিপিং (যেমন `pgBackRest` বা `WAL-G`) দিয়ে এন্টারপ্রাইজ PITR কীভাবে সেটআপ করবে?",
          "m": "আমরা `pgBackRest` বা `WAL-G` টুল ব্যবহার করি। সেটআপ: (১) `postgresql.conf`-এ `wal_level = replica`, `archive_mode = on`, এবং `archive_command = 'pgbackrest --stanza=main wal-push %p'` কনফিগার করি। প্রতিবার ১৬MB-র একটি WAL সেগমেন্ট পূর্ণ হলেই পোস্টগ্রেস স্বয়ংক্রিয়ভাবে সেটি এস৩ বা ক্লাউড বাকেটে কম্প্রেসড ও এনক্রিপ্টেড অবস্থায় পুশ করে। (২) প্রতিদিন রাতে একটি ফুল বা ডিফারেনশিয়াল ব্যাকআপ নেওয়া হয় (`pgbackrest backup`)। কোনো বিপর্যয় ঘটলে একটি কমান্ডেই (`pgbackrest restore --target=\"2026-10-08 15:00:00\"`) ব্যাকআপ নামিয়ে নির্দিষ্ট সেকেন্ডের ডেটা পুনরুদ্ধার করা যায়।",
          "b": "archive_command দিয়ে প্রতিটি WAL ফাইল স্বয়ংক্রিয়ভাবে AWS S3-তে পুশ করা হয়। pgBackRest ব্যবহার করে প্রতিদিন ফুল ব্যাকআপ এবং নিরবচ্ছিন্ন WAL দিয়ে অতীতের যেকোনো সেকেন্ডের ডেটা ফিরিয়ে আনা নিশ্চিত করা হয়।",
          "e": "Set archive_mode = on and utilize pgBackRest or WAL-G in archive_command to ship WAL segments to S3 immediately upon closure. Coupled with scheduled differential physical snapshots, this achieves enterprise-grade PITR with near-zero RPO.",
          "code": "# postgresql.conf:\narchive_mode = on\narchive_command = 'pgbackrest --stanza=db wal-push %p'\nwal_level = replica"
        },
        {
          "lvl": "lvl3",
          "q": "High Availability (HA): PostgreSQL Streaming Replication এবং Patroni + Raft/Etcd ক্লাস্টার আর্কিটেকচার কীভাবে অটোমেটিক ফেইলওভার নিশ্চিত করে?",
          "m": "সিঙ্গেল ডেটাবেজ নোড কখনো এন্টারপ্রাইজ রেডি নয়। আমরা একটি HA ক্লাস্টার সাজাই: (১) একজন Primary নোড (Read/Write) এবং দুটি Standby নোড (Read-only) যারা ফিজিক্যাল স্ট্রিমিং রেপ্লিকেশনের মাধ্যমে প্রাইমারির প্রতিটি WAL বাইট সিঙ্ক করে। (২) নোডগুলোর ওপরে `Patroni` নামক একটি অর্কেস্ট্রেটর রান করে যা একটি কনসেনসাস স্টোর (যেমন `etcd` বা Consul)-এর সাথে যুক্ত। যদি প্রাইমারি সার্ভার বিদ্যুৎ বিচ্ছিন্ন বা ক্র্যাশ করে, Patroni এবং Etcd ৩ সেকেন্ডের মধ্যে প্রাইমারির হার্টবিট লস ডিটেক্ট করে, ভোট করে সবচেয়ে আপ-টু-ডেট স্ট্যান্ডবাইকে নতুন প্রাইমারি হিসেবে প্রমোট করে (Automatic Failover) এবং ট্রাফিক রি-রুট করে জিরো-ডাউনটাইম নিশ্চিত করে।",
          "b": "পাট্রোনি এবং ইটসিডি ক্লাস্টার ব্যবহার করে স্বয়ংক্রিয় ফেইলওভার নিশ্চিত করা হয়। প্রাইমারি নোড ডাউন হওয়ার সাথে সাথে স্ট্যান্ডবাই নোড প্রমোট হয়ে নতুন প্রাইমারি হয়ে যায় এবং ট্রাফিক রি-রুট করে সাইট সচল রাখে।",
          "e": "Deploy an enterprise PostgreSQL HA cluster using Patroni coordinated via an etcd distributed consensus store. Patroni monitors primary heartbeat health; upon node crash, it initiates automated leader election, promotes the most synchronous replica to primary, and re-routes client VIPs in under 5 seconds.",
          "tip": "বলো: 'Patroni with etcd provides automated consensus-driven leader failover for PostgreSQL HA clusters.'"
        },
        {
          "lvl": "lvl3",
          "q": "Prisma ORM-এর Connection Pool কীভাবে টিউন করবে যখন এটি PgBouncer-এর সাথে কানেক্টেড থাকে?",
          "m": "Prisma বাই-ডিফল্ট প্রতিটি কুয়েরিতে Prepared Statements ব্যবহার করে। কিন্তু PgBouncer-এর `Transaction Mode`-এ কানেকশন শেয়ার হওয়ার কারণে প্রিপেয়ার্ড স্টেটমেন্ট কাজ করে না এবং `prepared statement does not exist` এরর দেয়। ফিক্স: (১) Prisma ডেটাবেজ কানেকশন স্ট্রিংয়ের শেষে `?pgbouncer=true` যোগ করতে হবে—যা Prisma-কে নির্দেশ করে প্রিপেয়ার্ড স্টেটমেন্ট ডিসেবল করতে। (২) মাইগ্রেশন চালানোর জন্য PgBouncer পোর্ট (6432)-এর বদলে সরাসরি পোস্টগ্রেস পোর্ট (5432)-এ কানেক্ট করার জন্য `directUrl` কনফিগার করতে হবে। (৩) `connection_limit` টিউন করে অ্যাপ্লিকেশন পডের সাথে সামঞ্জস্য রাখতে হবে।",
          "b": "PgBouncer ট্রানজ্যাকশন মোডে প্রিজমা চালাতে কানেকশন ইউআরএলে ?pgbouncer=true যোগ করতে হয় এবং স্কিমা মাইগ্রেশনের জন্য directUrl কনফিগার করতে হয় যাতে প্রিপেয়ার্ড স্টেটমেন্ট এরর না হয়।",
          "e": "When connecting Prisma to PgBouncer in transaction pooling mode, append ?pgbouncer=true to the DATABASE_URL to disable prepared statements. Additionally, define a directUrl in schema.prisma pointing directly to PostgreSQL port 5432 for shadow database migrations.",
          "code": "// schema.prisma:\ndatasource db {\n  provider  = \"postgresql\"\n  url       = env(\"DATABASE_URL\") // pgbouncer port 6432 with ?pgbouncer=true\n  directUrl = env(\"DIRECT_URL\")   // direct postgres port 5432\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Database Health Check: `pg_stat_activity` কুয়েরি করে কীভাবে কানেকশন লিক, হ্যাং কুয়েরি ও রিসোর্স থ্রটলিং শনাক্ত করবে?",
          "m": "ডেটাবেজ পারফরম্যান্স পর্যালোচনায় `pg_stat_activity` টেবিলটি অপরিহার্য। এটি দিয়ে দেখা যায় বর্তমানে কয়টি কানেকশন সচল, কোন কুয়েরি কতক্ষণ ধরে চলছে এবং তাদের স্ট্যাটাস কী। যেমন: `SELECT pid, now() - query_start AS duration, query, state FROM pg_stat_activity WHERE state != 'idle' ORDER BY duration DESC;` চালালে যেসব কুয়েরি ১০ সেকেন্ডের বেশি সময় ধরে আটকে আছে সেগুলো সরাসরি ধরা পড়ে। প্রয়োজন হলে `SELECT pg_terminate_backend(pid);` দিয়ে স্পেসিফিক হ্যাং কুয়েরি কিল করে ডেটাবেজ সেভ করা যায়।",
          "b": "pg_stat_activity টেবিল দিয়ে সার্ভারে চলমান প্রতিটি সেশন, কুয়েরির সময়কাল এবং লকিং পর্যবেক্ষণ করা যায়। দীর্ঘ সময় ধরে চলা হ্যাং কুয়েরি শনাক্ত করে pg_terminate_backend(pid) দিয়ে তা থামানো যায়।",
          "e": "Query pg_stat_activity to inspect real-time connection states, query durations, and lock contentions. Long-running or stuck statements (duration > 5s) are triaged and safely terminated via pg_terminate_backend(pid) to protect backend memory.",
          "code": "SELECT pid, usename, client_addr, state,\n       round(extract(epoch from now() - query_start)::numeric, 2) AS duration_seconds,\n       query\nFROM pg_stat_activity WHERE state != 'idle' ORDER BY duration_seconds DESC LIMIT 10;"
        },
        {
          "lvl": "lvl3",
          "q": "Database Disaster Recovery টেস্ট (Chaos Engineering): তুমি কীভাবে নিশ্চিত হবে যে তোমার ব্যাকআপ ফাইলগুলো সত্যিই কার্যকর?",
          "m": "যে ব্যাকআপ কখনো রিস্টোর করে পরীক্ষা করা হয়নি, সেই ব্যাকআপ আসলে কোনো ব্যাকআপই নয়! অনেক কোম্পানি বিপদের দিনে আবিষ্কার করে তাদের ডাম্প ফাইল করাপ্ট ছিল। প্র্যাকটিস: আমরা সম্পূর্ণ অটোমেটেড 'Disaster Recovery Drill' পাইপলাইন চালাই। প্রতি সপ্তাহে একটি পৃথক স্টেজিং ক্লাউড ইনস্ট্যান্সে স্ক্রিপ্ট স্বয়ংক্রিয়ভাবে লেটেস্ট ব্যাকআপ ফাইলটি ডাউনলোড করে সম্পূর্ণ নতুন ডেটাবেজে রিস্টোর করে, অটোমেটেড ডাটাবেজ ইন্টিগ্রিটি ও রো-কাউন্ট টেস্ট চালায় এবং সফল হলে একটি স্ল্যাক অ্যালার্ট পাঠায় যে 'Weekly Backup Verified Successfully'।",
          "b": "ব্যাকআপ সত্যিই কাজ করে কি না তা নিশ্চিত করতে প্রতি সপ্তাহে অটোমেটেড স্ক্রিপ্ট দিয়ে ব্যাকআপ ফাইলটি একটি টেস্ট সার্ভারে রিস্টোর করে ডেটা ভ্যালিডেশন পরীক্ষা করা হয়।",
          "e": "A backup is merely a hypothesis until proven by a successful restore. Implement automated weekly disaster recovery verification pipelines: a detached staging runner pulls the latest snapshot, executes a full restore, asserts table integrity tests, and alerts the engineering team on success or failure.",
          "tip": "বলো: 'An unverified backup is not a backup. We automate regular sandbox restore drills in CI/CD to validate recovery integrity.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: প্রোডাকশন ডেটাবেজ সাডেনলি `FATAL: remaining connection slots are reserved for non-replication superuser connections` এরর দিচ্ছে এবং সব ইউজার ক্র্যাশ পেজ দেখছে! তাৎক্ষণিক কীভাবে সার্ভার বাঁচাবে এবং দীর্ঘমেয়াদে সমাধান কী?",
          "m": "তাৎক্ষণিক সমাধান: (১) একজন সিনিয়র ইঞ্জিনিয়ার সুপার-ইউজার (postgres) হিসেবে সার্ভারে SSH করে সরাসরি লোকাল সকেটে কানেক্ট করবে (`psql -U postgres`) কারণ সুপার-ইউজারের জন্য ৩টি ইমার্জেন্সি স্লট সংরক্ষিত থাকে। (২) `pg_stat_activity` থেকে `idle` কানেকশনগুলো বাল্ক কিল করবে: `SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'idle';`—এতে সাইট সাথে সাথে সচল হবে। দীর্ঘমেয়াদী সমাধান: (১) অ্যাপ সার্ভার ও ডেটাবেজের মাঝে PgBouncer বা AWS RDS Proxy কানেকশন পুলার বসাতে হবে। (২) নোড অ্যাপ্লিকেশনে `connection_limit` কমিয়ে নিয়ন্ত্রণ করতে হবে।",
          "b": "তাৎক্ষণিকভাবে সুপার-ইউজার দিয়ে লোকাল সকেটে ঢুকে idle কানেকশনগুলো কিল করতে হবে। দীর্ঘমেয়াদে PgBouncer কানেকশন পুলার বসিয়ে এবং নোড অ্যাপে কানেকশন লিমিট সেট করে এই সংকট চিরতরে সমাধান করতে হবে।",
          "e": "Immediate triage: SSH into the server and access psql via local UNIX socket as postgres superuser (which retains dedicated emergency slots). Execute pg_terminate_backend() across orphaned idle connections. Permanent fix: introduce PgBouncer or Supabase connection pooling to multiplex client connections.",
          "code": "SELECT pg_terminate_backend(pid)\nFROM pg_stat_activity\nWHERE usename = 'app_user' AND state = 'idle'\n  AND state_change < current_timestamp - INTERVAL '2 minutes';"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একজন জুনিয়র ডেভেলপার ভুলবশত প্রোডাকশন ডেটাবেজে `DROP TABLE customers;` চালিয়ে দিয়েছে! কোনো রিসেন্ট ম্যানুয়াল ব্যাকআপ নেই কিন্তু WAL Archiving অন আছে। কীভাবে গ্রাহক ডেটা উদ্ধার করবে?",
          "m": "উদ্ধারের ধাপ (PITR): (১) কোনো আতঙ্কিত সিদ্ধান্ত না নিয়ে অবিলম্বে অ্যাপ্লিকেশন সার্ভার ডাউন/মেইনটেন্যান্স মোডে নিতে হবে যাতে নতুন কোনো রাইট না আসে। (২) সার্ভার লগে দেখে ঠিক কোন সময়ে ড্রপ কমান্ডটি চালানো হয়েছিল তা বের করব (যেমন দুপুর ৩:১০:১৫)। (৩) সর্বশেষ তৈরি হওয়া বেস ফিজিক্যাল ব্যাকআপটি একটি নতুন আইসোলেটেড সার্ভারে রিস্টোর করব। (৪) `postgresql.conf`-এ কনফিগার করব `recovery_target_time = '2026-10-08 15:10:14'` (অর্থাৎ ড্রপ হওয়ার ঠিক ১ সেকেন্ড আগের সময়) এবং `restore_command` দিয়ে WAL লগ রি-প্লে করব। (৫) সম্পূর্ণ ডেটাবেজ ড্রপের আগের নিখুঁত অবস্থায় রিকভার হয়ে যাবে।",
          "b": "ভুল ড্রপের ক্ষেত্রে WAL লগ ব্যবহার করে PITR চালানো হয়। লগ দেখে ড্রপ হওয়ার ঠিক ১ সেকেন্ড আগের সময়কে recovery_target_time নির্ধারণ করে বেস ব্যাকআপ ও WAL রি-প্লে করলেই সম্পূর্ণ ডেটা অক্ষতভাবে ফিরে পাওয়া যায়।",
          "e": "Execute Point-in-Time Recovery (PITR): identify the exact DROP TABLE execution timestamp from logs, spin up an isolated node, restore the latest base backup, and configure recovery_target_time to 1 second prior to the drop command with WAL replay.",
          "tip": "ইন্টারভিউতে 'Point-in-Time Recovery restores the database up to 1 second before the fatal DROP command' বলবে।"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: মধ্যরাতে অটোমেটেড `pg_dump` ব্যাকআপ চলাকালীন ডেটাবেজের ডিস্ক স্পেস ৯৮% হয়ে ক্র্যাশ করার উপক্রম হয়েছে কারণ ব্যাকআপ ফাইলটি সার্ভারের লোকাল ডিস্কেই সেভ হচ্ছিল। কীভাবে এই আর্কিটেকচার ঠিক করবে?",
          "m": "মারাত্মক ভুল: ডেটাবেজ সার্ভারের লোকাল ডিস্কে ব্যাকআপ রাখা কখনোই উচিত নয়! সমাধান: ব্যাকআপ ফাইলটি লোকাল ডিস্কে না লিখে সরাসরি পাইপিং ও স্ট্রিমিং মেকানিজমে ক্লাউড অবজেক্ট স্টোরেজে পাঠাতে হবে: `pg_dump -Fc mydb | aws s3 cp - s3://my-backups/mydb-$(date +%F).dump`। এতে ব্যাকআপ ডেটা লোকাল ডিস্কে ১ বাইটও জায়গা না নিয়ে মেমোরি বাফার হয়ে সরাসরি ক্লাউডে স্ট্রিম হয়ে যায়। অতিরিক্ত হিসেবে পুরনো লোকাল ডাম্প ফাইল ডিলিট করার জন্য একটি স্বয়ংক্রিয় ক্রন জব বা লাইফসাইকেল রুল সেট করতে হবে।",
          "b": "লোকাল ডিস্কে ব্যাকআপ ফাইল সেভ না করে সরাসরি পাইপলাইনের মাধ্যমে AWS S3 বা ক্লাউড স্টোরেজে স্ট্রিম করতে হবে। ফলে লোকাল হার্ডডিস্ক পূর্ণ হওয়ার কোনো সম্ভাবনাই থাকে না।",
          "e": "Piping stdout directly to object storage prevents disk saturation: pg_dump -Fc dbname | aws s3 cp - s3://bucket/backup.dump. This streams binary pages across network buffers directly to AWS S3 without consuming a single byte of local server disk space.",
          "code": "pg_dump -Fc -U postgres dokani_prod | gzip | aws s3 cp - s3://dokani-backups/daily/$(date +%Y%m%d).dump.gz"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ডেটাবেজের একটি বিশাল টেবিলে প্রচুর ডিলিট ও আপডেটের কারণে টেবিল সাইজ ১০GB থেকে বেড়ে ৫০GB হয়ে গেছে (৪০GB ব্লোট)। কিন্তু সাইট ২৪/৭ চালু রাখতে হবে, কোনো ডাউনটাইম নেওয়া যাবে না। কীভাবে ডিস্ক স্পেস রিক্লেইম করবে?",
          "m": "সমাধান: যেহেতু সাইট ২৪/৭ লাইভ রাখতে হবে, তাই `VACUUM FULL` চালানো সম্পূর্ণ নিষিদ্ধ (কারণ এটি টেবিল লক করে দেয়)। আমরা `pg_repack` এক্সটেনশন ব্যবহার করব: `pg_repack -k -t big_table -d my_database`। `pg_repack` ব্যাকগ্রাউন্ডে একটি নতুন লগ টেবিল তৈরি করে, ডেটা কপি করে, ইনডেক্স নতুন করে তৈরি করে এবং এক মিলিসেকেন্ডের মেটাডেটা সোয়াপ (Swap) করে কোনো টেবিল লক ছাড়াই ৪০GB ব্লোট ডিস্কে মুক্ত করে দেয়। গ্রাহকরা কাজ চলাকালীন বিন্দুমাত্র টেরই পাবে না।",
          "b": "জিরো-ডাউনটাইমে ব্লোট দূর করতে pg_repack টুল ব্যবহার করব। এটি কোনো টেবিল লক ছাড়া ব্যাকগ্রাউন্ডে নতুন টেবিল তৈরি করে ডেটা সোয়াপ করে এবং সম্পূর্ণ ডিস্ক স্পেস মুক্ত করে দেয়।",
          "e": "Because VACUUM FULL locks the table exclusively, utilize pg_repack. pg_repack builds a fresh copy of the bloated table in the background, syncs live mutations via trigger logs, and performs a millisecond catalog swap without locking live read/write traffic.",
          "code": "pg_repack -h localhost -U postgres -d dokani_db --table=invoices"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: নোড.জেএস এপিআই সার্ভার রিস্টার্ট দিলে সাথে সাথে ডেটাবেজে ২০০টি কানেকশন ওপেন হয়, কিন্তু ৫ মিনিট পর ট্রাফিক কমে গেলেও কানেকশনগুলো ক্লোজ না হয়ে ঝুলে থাকে। কীভাবে ট্রাবলশুট ও পুল কনফিগার করবে?",
          "m": "কারণ: নোড অ্যাপ্লিকেশনে কানেকশন পুলের `minPoolSize` হয়তো খুব বড় দেওয়া হয়েছে, অথবা পুলে কোনো `idleTimeoutMillis` কনফিগার করা নেই—ফলে ট্রাফিক শেষ হলেও আইডল কানেকশনগুলো ডেটাবেজে জীবন্ত থেকে যায়। ফিক্স: (১) পুল কনফিগারেশনে `idleTimeoutMillis: 10000` (১০ সেকেন্ড পর অলস কানেকশন ডিসকানেক্ট করা), (২) `minPoolSize: 2` (বেস কানেকশন ছোট রাখা) এবং `maxPoolSize: 20` সেট করা। (৩) এক্সপ্রেস মিডলওয়্যারে রিকোয়েস্ট এরর ক্যাচ করে নিশ্চিত করা যে কানেকশন কোনো এরর হ্যান্ডলারে আটকে না থেকে পুলে রিলিজ হচ্ছে।",
          "b": "পুলে idleTimeout না থাকায় অব্যবহৃত কানেকশন ঝুলে থাকে। idleTimeoutMillis সেট করে অলস কানেকশন বন্ধ করা, minPoolSize ছোট রাখা এবং maxPoolSize নিয়ন্ত্রণ করে এই সমস্যা সমাধান করা হয়।",
          "e": "The lingering connections are caused by unbounded minPoolSize or missing idleTimeout settings in the database pool client. Configure idleTimeoutMillis: 10000 to prune unused connections dynamically, while bounding maxPoolSize strictly to prevent saturation.",
          "code": "const pool = new Pool({\n  max: 20,\n  min: 2,\n  idleTimeoutMillis: 10000,\n  connectionTimeoutMillis: 2000\n});"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে হাজার হাজার মার্চেন্টের অমূল্য সেলস ও হিসাব ডেটা সুরক্ষায় কী ধরনের ব্যাকআপ ও ডিজাস্টার রিকভারি আর্কিটেকচার কার্যকর?",
          "m": "দোকানি পিওএসে ৩ স্তরের এন্টারপ্রাইজ ব্যাকআপ আর্কিটেকচার কার্যকর: (১) `Hourly Encrypted WAL Archiving`: প্রতি ঘণ্টায় তৈরি হওয়া সমস্ত ট্রানজ্যাকশন লগ AES-256 এনক্রিপ্ট হয়ে অফ-সাইট ক্লাউড স্টোরেজে (AWS S3 Glacier) পুশ হয় (RPO < ১৫ মিনিট)। (২) `Daily Automated Physical Snapshots`: প্রতিদিন রাত ৩টায় জিরো-ব্লকিং স্ন্যাপশট ব্যাকআপ নেওয়া হয় এবং পৃথক ভৌগোলিক অঞ্চলে (Multi-Region Replication) মিরর করা হয়। (৩) `Automated Restore Drill`: প্রতি রবিবার একটি স্যান্ডবক্স ভিএম-এ ব্যাকআপ ফাইল স্বয়ংক্রিয়ভাবে রিস্টোর করে ডেটা ভ্যালিডেশন টেস্ট হয়। এই আর্কিটেকচার নিশ্চিত করে যে পুরো সার্ভার পুড়ে গেলেও ১৫ মিনিটের বেশি কোনো ডেটা কখনোই হারাবে না!",
          "b": "দোকানিতে প্রতি ঘণ্টায় এনক্রিপ্টেড WAL শিপিং (RPO < ১৫ মিনিট), প্রতিদিন রাতে মাল্টি-রিজিয়ন স্ন্যাপশট ব্যাকআপ এবং প্রতি সপ্তাহে অটোমেটেড রিস্টোর টেস্ট চালানো হয়। ফলে যেকোনো বিপর্যয়ে ১৫ মিনিটের মধ্যে সম্পূর্ণ ডেটা পুনরুদ্ধার করা নিশ্চিত থাকে।",
          "e": "In Dokani POS, disaster recovery enforces continuous hourly encrypted WAL shipping to geo-redundant S3 storage (RPO < 15 mins), scheduled nightly physical snapshots with multi-region replication, and automated weekly sandbox restore verification drills.",
          "tip": "দোকানির এই ৩-টিয়ার ডিজাস্টার রিকভারি আর্কিটেকচার (Hourly WAL, Multi-Region Snapshots, Weekly Drills) ইন্টারভিউতে ১০০% আস্থা এনে দেবে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: ক্লাউড মাইগ্রেশন বা সার্ভার স্থানান্তরের সময় জিরো-ডাউনটাইম ডেটাবেজ রেপ্লিকেশন কীভাবে সম্পন্ন করবে?",
          "m": "পুরনো সার্ভার বন্ধ করে ডাম্প নিয়ে নতুন সার্ভারে রিস্টোর করলে কয়েক ঘণ্টার ডাউনটাইম লাগে যা বিজনেসের জন্য ক্ষতিকর। জিরো-ডাউনটাইম সমাধান: (১) নতুন সার্ভারে PostgreSQL ইনস্টল করে পুরনো সার্ভারের সাথে 'Logical Replication' সেটআপ করি (`CREATE PUBLICATION` এবং `CREATE SUBSCRIPTION`)। (২) সমস্ত পুরনো ডেটা এবং লাইভ ট্রানজ্যাকশন ব্যাকগ্রাউন্ডে রিয়েলটাইমে নতুন সার্ভারে সিঙ্ক হতে থাকে। (৩) সিঙ্ক ল্যাগ যখন ০ মিলিসেকেন্ডে পৌঁছায়, তখন মাত্র ৩০ সেকেন্ডের জন্য ডিএনএস রাউটিং পরিবর্তন করে ট্রাফিক নতুন সার্ভারে ঘুরিয়ে দিই। সম্পূর্ণ মাইগ্রেশনে কোনো ডেটা লস বা সাইট ডাউন হয় না।",
          "b": "জিরো-ডাউনটাইমে ডাটাবেজ স্থানান্তরের জন্য Logical Replication ব্যবহার করা হয়। ডেটা লাইভ সিঙ্ক হয়ে ল্যাগ ০ মিলিসেকেন্ড হলে ডিএনএস পরিবর্তন করে নতুন সার্ভারে ট্রাফিক রুট করা হয় কোনো ডাউনটাইম ছাড়াই।",
          "e": "Execute zero-downtime database migrations via PostgreSQL Logical Replication (Publications and Subscriptions). Live transactions continuously stream from the source to the target instance; once replication lag hits zero milliseconds, client DNS is pivoted to the new host in seconds.",
          "code": "-- Source DB:\nCREATE PUBLICATION app_migration FOR ALL TABLES;\n-- Target DB:\nCREATE SUBSCRIPTION app_migration_sub \nCONNECTION 'dbname=prod host=old-server user=replicator' \nPUBLICATION app_migration;"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Kubernetes বা সার্ভারলেস নোড অ্যাপ্লিকেশনে (Next.js / Lambda) হাজার হাজার পড থেকে ডেটাবেজ কানেকশন রক্ষা করতে কীভাবে PgBouncer আর্কিটেকচার সাজাবে?",
          "m": "সার্ভারলেস বা কুবারনেটিস আর্কিটেকচারে প্রতিটি পড বা ল্যাম্বডা ফাংশন নতুন কানেকশন খোলে। ১,০০০ ল্যাম্বডা মানে ১,০০০ ডেটাবেজ কানেকশন যা ডেটাবেজকে নিমেষেই ধ্বংস করে দেয়। আর্কিটেকচার সমাধান: আমরা ডেটাবেজের ঠিক সামনে একটি সেন্ট্রালাইজড PgBouncer ক্লাস্টার বা AWS RDS Proxy বসাই। সমস্ত ল্যাম্বডা ও কুবারনেটিস সার্ভিস সরাসরি ডেটাবেজে কানেক্ট না করে PgBouncer-এ কানেক্ট করে। PgBouncer হাজার হাজার ক্লায়েন্ট কানেকশনকে ট্রানজ্যাকশন মোডে শেয়ার করে ডেটাবেজে মাত্র ৩০টি স্থায়ী অপটিমাইজড কানেকশনে সীমাবদ্ধ রাখে। ফলে ক্লাউডে অসীম অটো-স্কেলিং হলেও ডেটাবেজ চিরকাল শান্ত ও সুস্থ থাকে।",
          "b": "সার্ভারলেস বা কুবারনেটিসের হাজার হাজার পড যাতে ডাটাবেজ ক্র্যাশ না করে সেজন্য সামনে PgBouncer বা RDS প্রক্সি বসানো হয়। এটি হাজার হাজার রিকোয়েস্টকে মাত্র ৩০টি ডাটাবেজ কানেকশনে হ্যান্ডেল করে।",
          "e": "Serverless functions and Kubernetes pods spawn thousands of concurrent connection spikes. Deploy a centralized PgBouncer layer or AWS RDS Proxy upstream: it absorbs the thousands of transient client connections and multiplexes them across a fixed, bounded pool of 30 PostgreSQL backend connections.",
          "tip": "বলো: 'PgBouncer or RDS Proxy absorbs thousands of ephemeral serverless connections down to a bounded pool.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: ডেটাবেজ স্লো-ডাউন ও সিপিইউ স্পাইকের সময় রিয়েল-টাইমে ট্রাবলশুটিং করতে তোমার রানবুক (Incident Runbook) কী?",
          "m": "ইমার্জেন্সি রানবুকের ধাপসমূহ: (১) `pg_stat_activity` কুয়েরি করে চেক করি বর্তমানে কত কানেকশন আছে এবং কোন কুয়েরিগুলো ৫ সেকেন্ডের বেশি সময় ধরে ব্লকিং বা রানিং অবস্থায় আছে। (২) লকিং চেক করি: কোনো ট্রানজ্যাকশন এক্সক্লুসিভ লক ধরে রেখে অন্য সবাইকে ব্লক করছে কি না (`pg_locks`)। (৩) `pg_stat_database` থেকে ক্যাশ হিট রেশিও চেক করি—যদি ক্যাশ হিট ৯৯%-এর নিচে নামে তবে বুঝতে হবে ডিস্ক আই/ও স্পাইক করেছে। (৪) যদি কোনো নির্দিষ্ট ব্যাচ কুয়েরি পুরো সিস্টেম হ্যাং করায়, তবে `pg_terminate_backend(pid)` দিয়ে তাৎক্ষণিকভাবে সেটি বন্ধ করি এবং ট্রাফিক স্টেবল হলে অপটিমাইজেশন শুরু করি।",
          "b": "ইনসিডেন্ট রানবুক: pg_stat_activity দিয়ে স্লো কুয়েরি ও কানেকশন চেক, pg_locks দিয়ে লক অনুসন্ধান, ক্যাশ হিট রেশিও পরীক্ষা এবং সিস্টেম বাঁচানোর জন্য ক্ষতিকর কুয়েরিগুলো টার্মিনেট করা।",
          "e": "Production Database Incident Runbook: (1) Query pg_stat_activity for high-duration running statements, (2) Inspect pg_locks to pinpoint root blocking transaction PIDs, (3) Verify buffer cache hit ratio exceeds 99%, and (4) Surgically terminate culprit queries via pg_terminate_backend() before analyzing query execution plans.",
          "code": "SELECT blocked_locks.pid AS blocked_pid, blocking_locks.pid AS blocking_pid,\n       blocked_activity.query AS blocked_statement\nFROM  pg_catalog.pg_locks blocked_locks\nJOIN pg_catalog.pg_stat_activity blocked_activity ON blocked_activity.pid = blocked_locks.pid\nJOIN pg_catalog.pg_locks blocking_locks \n    ON blocking_locks.locktype = blocked_locks.locktype\n    AND blocking_locks.granted\nWHERE NOT blocked_locks.granted;"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: ডেটাবেজ সিকিউরিটি কমপ্লায়েন্স: ডেটা অ্যাট-রেস্ট এনক্রিপশন (Encryption at Rest) এবং ডেটা ইন-ট্রানজিট এনক্রিপশন (SSL/TLS) কীভাবে কার্যকর করবে?",
          "m": "কমপ্লায়েন্স নিশ্চিতের ধাপ: (১) `Data in Transit`: ডেটাবেজে কোনো আন-এনক্রিপ্টেড প্লেইন কানেকশন নিষিদ্ধ করা। `postgresql.conf`-এ `ssl = on` এবং অ্যাপ্লিকেশনে `sslmode=require` বা `verify-full` বাধ্য করা—যাতে নেটওয়ার্কের ভেতর কোনো ম্যান-ইন-দ্য-মিডল (MITM) আক্রমণ না হতে পারে। (২) `Data at Rest`: ক্লাউড ভলিউমে LUKS বা AWS KMS পরিচালিত AES-256 এনক্রিপশন নিশ্চিত করা যাতে ফিজিক্যাল ডিস্ক চুরি হলেও ডেটা পড়া না যায়। (৩) কলাম-লেভেল এনক্রিপশন: অতি সংবেদনশীল ডেটা (যেমন জাতীয় পরিচয়পত্র নম্বর বা ব্যাংক অ্যাকাউন্ট) `pgcrypto` এক্সটেনশন ব্যবহার করে অ্যাপ বা ডেটাবেজ লেভেলে সিমেট্রিক এনক্রিপ্ট করে সেভ করা।",
          "b": "ডাটাবেজে ssl = on এবং sslmode=verify-full দিয়ে নেটওয়ার্ক ট্রানজিট এনক্রিপ্ট করা হয়। ডিস্কে AES-256 এবং সংবেদনশীল ফিল্ডে pgcrypto দিয়ে এনক্রিপশন কার্যকর করে সর্বোচ্চ ডেটা সিকিউরিটি নিশ্চিত করা হয়।",
          "e": "Enforce multi-layered compliance: Data in Transit requires TLS with sslmode=verify-full; Data at Rest utilizes hardware-level AES-256 volume encryption managed via KMS; Application-level sensitive columns (PII) are encrypted via the pgcrypto extension prior to insertion.",
          "code": "CREATE EXTENSION IF NOT EXISTS pgcrypto;\nINSERT INTO sensitive_vault (user_id, secret_nid)\nVALUES ($1, pgp_sym_encrypt('19901234567890', 'master-vault-key'));"
        }
      ]
    }
  ]
};
