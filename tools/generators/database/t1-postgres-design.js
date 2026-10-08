// Topic 1: PostgreSQL & Relational Schema Design (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "postgres-relational-design",
  name: "PostgreSQL & Relational Schema Design",
  desc: "Schema Design, Primary & Foreign Keys, Table Relationships (1:1, 1:N, M:N), Constraints, Normalization, Data Integrity",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Relational Database-এ Primary Key এবং Foreign Key-এর ভূমিকা কী এবং কেন প্রতিটি টেবিলে প্রাইমারি কি থাকা আবশ্যক?",
      m: "Primary Key (PK) হলো একটি টেবিলের প্রতিটি রোর একক ও অনন্য আইডেন্টিফায়ার—এটি কখনোই NULL বা ডুপ্লিকেট হতে পারে না। আর Foreign Key (FK) হলো এমন একটি কলাম যা অন্য কোনো টেবিলের Primary Key-কে নির্দেশ করে এবং দুটি টেবিলের মধ্যে সম্পর্ক (Relationship) স্থাপন করে। প্রতিটি টেবিলে PK থাকা আবশ্যক কারণ: PK ছাড়া কোনো নির্দিষ্ট রোকে নিখুঁতভাবে চিহ্নিত, আপডেট বা ডিলিট করা যায় না এবং ডাটাবেজ অপটিমাইজার দ্রুত লুকআপ ইনডেক্স তৈরি করতে পারে না।",
      b: "প্রাইমারি কি প্রতিটি রোর অনন্য পরিচয় নিশ্চিত করে এবং এটি কখনো নাল বা ডুপ্লিকেট হতে পারে না। ফরেন কি দুটি টেবিলের মধ্যে যৌক্তিক সম্পর্ক স্থাপন করে। তথ্যের স্বাতন্ত্র্য এবং দ্রুত ডেটা খোঁজার জন্য প্রতিটি টেবিলে প্রাইমারি কি থাকা বাধ্যতামূলক।",
      e: "A Primary Key (PK) uniquely identifies each row in a table, strictly forbidding NULLs and duplicates. A Foreign Key (FK) refers to a Primary Key in another table, enforcing referential integrity. Primary keys are mandatory to locate, mutate, and index records deterministically.",
      code: "CREATE TABLE users (\n  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),\n  email VARCHAR(255) UNIQUE NOT NULL\n);"
    },
    {
      lvl: "lvl1",
      q: "Database Normalization কী এবং 1NF, 2NF, 3NF-এর মূল নীতিগুলো কী?",
      m: "Normalization হলো ডাটাবেজ টেবিলগুলোকে এমনভাবে সাজানো যাতে ডেটা ডুপ্লিকেশন (Redundancy) কমে এবং ডেটা অ্যানোমালি (Insert, Update, Delete Anomalies) দূর হয়। (১) `1NF (First Normal Form)`: প্রতিটি সেল বা কলামে শুধুমাত্র অ্যাটমিক (অবিভাজ্য) মান থাকতে হবে (কোনো অ্যারে বা কমা দিয়ে একাধিক মান নয়) এবং প্রাইমারি কি থাকতে হবে। (২) `2NF`: 1NF হতে হবে এবং কোনো Partial Dependency থাকা যাবে না (কম্পোজিট কি-র আংশিক ওপর নির্ভর করা যাবে না)। (৩) `3NF`: 2NF হতে হবে এবং কোনো Transitive Dependency থাকা যাবে না (নন-প্রাইমারি কলাম অন্য নন-প্রাইমারি কলামের ওপর নির্ভর করতে পারবে না)।",
      b: "ডাটাবেজ নরমালাইজেশন তথ্যের অপ্রয়োজনীয় পুনরাবৃত্তি রোধ করে। ১এনএফ প্রতিটি কলামে একক অবিভাজ্য মান নিশ্চিত করে, ২এনএফ কম্পোজিট কি-র ওপর পূর্ণ নির্ভরতা নিশ্চিত করে এবং ৩এনএফ ট্রানজিটিভ ডিপেনডেন্সি দূর করে টেবিলকে পরিপাটি রাখে।",
      e: "Database Normalization minimizes data redundancy and anomalies: 1NF requires atomic column values and unique primary keys; 2NF eliminates partial dependencies on composite keys; 3NF eliminates transitive dependencies (non-key attributes depending on other non-key attributes).",
      tip: "ইন্টারভিউতে ৩য় নরমাল ফর্ম (3NF) পর্যন্ত ব্যাখ্যা করা স্ট্যান্ডার্ড প্র্যাকটিস।"
    },
    {
      lvl: "lvl1",
      q: "PostgreSQL-এর প্রধান Constraints (NOT NULL, UNIQUE, CHECK, DEFAULT, FOREIGN KEY)-এর ব্যবহার কী?",
      m: "(১) `NOT NULL`: কলামে কোনো ফাঁকা বা নাল মান প্রবেশ করতে দেয় না। (২) `UNIQUE`: কলামের প্রতিটি মান অনন্য হওয়া নিশ্চিত করে (যেমন ইমেইল বা ফোন)। (৩) `CHECK`: কাস্টম ব্যবসায়িক শর্ত এনফোর্স করে (যেমন `CHECK (price > 0)` বা `CHECK (discount <= total)`)। (৪) `DEFAULT`: কোনো মান না দিলে স্বয়ংক্রিয় ডিফল্ট ভ্যালু বসায় (যেমন `createdAt DEFAULT NOW()`)। (৫) `FOREIGN KEY`: রেফারেন্সিয়াল ইন্টিগ্রিটি রক্ষা করে যাতে অস্তিত্বহীন প্যারেন্ট আইডির চাইল্ড রেকর্ড তৈরি না হতে পারে।",
      b: "পোস্টগ্রেস কনস্ট্রেইন্ট ডাটাবেজ স্তরে তথ্যের শুদ্ধতা রক্ষা করে: NOT NULL ফাঁকা মান ঠেকায়, UNIQUE একক মান নিশ্চিত করে, CHECK কাস্টম শর্ত যাচাই করে, DEFAULT পূর্বনির্ধারিত মান বসায় এবং FOREIGN KEY সম্পর্কযুক্ত টেবিলের অখণ্ডতা নিশ্চিত করে।",
      e: "PostgreSQL constraints enforce data integrity at the database engine level: NOT NULL prohibits nulls, UNIQUE forbids duplicate values, CHECK validates custom conditional logic (`price > 0`), DEFAULT injects fallbacks, and FOREIGN KEY ensures referential consistency.",
      code: "CREATE TABLE products (\n  id UUID PRIMARY KEY,\n  price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),\n  status VARCHAR(20) DEFAULT 'ACTIVE'\n);"
    },
    {
      lvl: "lvl1",
      q: "UUID (v4 বা v7) বনাম Auto-incrementing Integer (`SERIAL` / `BIGINT`)-এর মধ্যে প্রাইমারি কি হিসেবে কোনটি কখন বেছে নেবে?",
      m: "`SERIAL / BIGINT` ইনটিজার ছোট সাইজ (৪-৮ বাইট) হওয়ায় ইনডেক্স মেমোরি খুব কম নেয় এবং কুয়েরি সুপার ফাস্ট। কিন্তু এর সিকিউরিটি ঝুঁকি রয়েছে: ইউআরএলে `/invoices/1`, `/invoices/2` দেখে যে কেউ মোট অর্ডারের সংখ্যা ও বৃদ্ধি অনুমান করতে পারে (Enumeration Attack)। `UUID (v4/v7)` হলো ১২৮-বিট গ্লোবালি ইউনিক স্ট্রিং যা সম্পূর্ণ আনপ্রেডিক্টেবল এবং মাল্টি-সার্ভার ডিস্ট্রিবিউটেড ডাটাবেজে আইডি কনফ্লিক্ট ছাড়া ক্লায়েন্ট সাইড থেকেই জেনারেট করা যায়। আধুনিক পোস্টগ্রেসে `UUID v7` টাইম-অর্ডার্ড হওয়ায় B-Tree ইনডেক্সে ইনটিজারের মতোই সুপারফাস্ট পারফরম্যান্স দেয়।",
      b: "অটো-ইনক্রিমেন্ট ইনটিজার মেমোরিতে হালকা হলেও ইউআরএল থেকে মোট বিক্রয় সংখ্যা অনুমান করা সহজ হওয়ায় নিরাপত্তা ঝুঁকি থাকে। ইউইউআইডি (UUID) সম্পূর্ণ অপ্রত্যাশিত এবং ডিস্ট্রিবিউটেড সিস্টেমে কনফ্লিক্ট ছাড়া কাজ করে। UUID v7 সময় অনুযায়ী ক্রমানুসারে সাজানো থাকায় আধুনিক স্ট্যান্ডার্ড।",
      e: "Auto-incrementing integers consume less index RAM (8 bytes) but leak business metrics via enumeration attacks (`/orders/500`). UUIDs (128-bit) guarantee global uniqueness across distributed systems; modern time-ordered UUID v7 maintains B-Tree insertion locality without page fragmentation.",
      tip: "আধুনিক সিস্টেমে UUID v7 এর সুবিধা (টাইম-অর্ডার্ড B-Tree পারফরম্যান্স) উল্লেখ করা প্রিমিয়াম উত্তর।"
    },
    {
      lvl: "lvl1",
      q: "PostgreSQL-এ `TEXT` এবং `VARCHAR(n)`-এর মধ্যে পারফরম্যান্স পার্থক্য কী?",
      m: "অনেক ডেভেলপার মনে করে `VARCHAR(255)` দিলে বুঝি `TEXT`-এর চেয়ে বেশি ফাস্ট চলে—কিন্তু পোস্টগ্রেসকিউএলে ইন্টারনালি `TEXT` এবং `VARCHAR` হুবহু একই স্টোরেজ ইঞ্জিন ও মেকানিজম (varlena header) ব্যবহার করে! তাদের পারফরম্যান্সে ০% পার্থক্য রয়েছে। `VARCHAR(n)` শুধুমাত্র একটি অতিরিক্ত চেক চালায় যে স্ট্রিংয়ের দৈর্ঘ্য n-এর বেশি কি না। তাই যদি কোনো নির্দিষ্ট ব্যবসায়িক সীমা না থাকে, আধুনিক পোস্টগ্রেসে সরাসরি `TEXT` ব্যবহার করা সবচেয়ে ফ্লেক্সিবল ও পরিষ্কার অভ্যাস।",
      b: "পোস্টগ্রেসকিউএলে TEXT এবং VARCHAR এর গতিতে কোনো পার্থক্য নেই কারণ উভয়েই অভ্যন্তরীণভাবে একই স্টোরেজ মেকানিজম ব্যবহার করে। VARCHAR শুধুমাত্র সর্বোচ্চ দৈর্ঘ্যের একটি সীমা বজায় রাখে।",
      e: "In PostgreSQL, `TEXT` and `VARCHAR(n)` share identical underlying storage architectures (`varlena`) with zero performance divergence. `VARCHAR(n)` merely adds a length validation check. Modern PostgreSQL engineering defaults to `TEXT` unless length constraints represent strict business rules.",
      tip: "পোস্টগ্রেসে VARCHAR(255) কোনো পারফরম্যান্স সুবিধা দেয় না—এটি ইন্টারভিউয়ারদের প্রিয় ট্রিক প্রশ্ন।"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "PostgreSQL JSONB ডেটা টাইপ কী এবং সাধারণ `JSON` টাইপের চেয়ে এটি কেন বহুগুণ দ্রুত?",
      m: "সাধারণ `JSON` ডেটা টাইপ টেক্সট আকারে হুবহু স্ট্রিং সেভ করে, ফলে প্রতিবার কোয়েরি করার সময় পুরো স্ট্রিং পার্স করতে হয় যা খুব স্লো। আর `JSONB` (JSON Binary) ডেটাকে পার্স করে একটি অপটিমাইজড বাইনারি ফরম্যাটে সেভ করে। যদিও ইনসার্ট হতে সামান্য ন্যানো-সেকেন্ড বেশি নেয়, কিন্তু রিড ও কুয়েরি করার গতি প্রায় ১০০ গুণ দ্রুত! সবচেয়ে বড় সুবিধা হলো: JSONB-এর ওপর সরাসরি `GIN` (Generalized Inverted Index) ইনডেক্স তৈরি করা যায়, যার ফলে নেস্টেড JSON ফিল্ডের ওপর সাধারণ কলামের মতোই মিলি-সেকেন্ডে কুয়েরি চালানো সম্ভব।",
      b: "JSON ডেটা সাধারণ টেক্সট হিসেবে সেভ হয়, কিন্তু JSONB বাইনারি ফরম্যাটে সংরক্ষিত হয়। JSONB এর ওপর GIN ইনডেক্স ব্যবহার করা যায়, ফলে পোস্টগ্রেসের ভেতরেই মঙ্গোডিবির মতো অতি দ্রুত গতিতে নেস্টেড ডক্যুমেন্ট কুয়েরি করা যায়।",
      e: "PostgreSQL's `JSONB` stores decomposed binary JSON rather than raw text. While ingestion has minor parsing overhead, read operations are orders of magnitude faster. Furthermore, JSONB natively supports GIN indexing for sub-millisecond nested key path lookups.",
      code: "CREATE TABLE store_configs (\n  id UUID PRIMARY KEY,\n  settings JSONB NOT NULL\n);\nCREATE INDEX idx_settings_gin ON store_configs USING GIN (settings);"
    },
    {
      lvl: "lvl2",
      q: "Denormalization (ডিনরমালাইজেশন) কখন করা উচিত এবং এর ভালো ও মন্দ দিক কী?",
      m: "যখন কোনো সিস্টেমে রিড কুয়েরির চাপ অস্বাভাবিক বেশি থাকে এবং বারংবার ৫-১০টি টেবিল `JOIN` করতে গিয়ে ডাটাবেজ স্লো হয়ে যায়, তখন পারফরম্যান্স বাড়ানোর জন্য ইচ্ছাকৃতভাবে কিছু ডুপ্লিকেট ডেটা রাখা হয় যাকে Denormalization বলে (যেমন: প্রোডাক্ট টেবিলে প্রতিবার সেলস টেবিল না গুনে সরাসরি `totalSold` বা `categoryName` কলাম রাখা)। ভালো দিক: কুয়েরি সুপার ফাস্ট হয় এবং কোনো JOIN লাগে না। মন্দ দিক: ডেটা আপডেটের সময় সব ডুপ্লিকেট কলাম একসাথে আপডেট না করলে ডেটা ইনকনসিস্টেন্ট হয়ে যাওয়ার বড় ঝুঁকি থাকে।",
      b: "বারংবার জটিল জয়েন (JOIN) এড়িয়ে রিড পারফরম্যান্স বাড়াতে ইচ্ছাকৃতভাবে ডুপ্লিকেট কলাম সংরক্ষণ করাকে ডিনরমালাইজেশন বলে। এটি পড়ার গতি বাড়ালেও লেখার সময় সব জায়গায় সিঙ্ক না করলে ডেটা অমিলের ঝুঁকি থাকে।",
      e: "Denormalization deliberately introduces calculated redundancy to bypass expensive multi-table JOINs in read-intensive systems (e.g. caching `orderCount` on a User record). While accelerating reads, it demands rigorous synchronization during updates to prevent data inconsistencies.",
      tip: "ইন্টারভিউতে 'Read optimization vs Write synchronization overhead' এর ট্রেডঅফ বলবে।"
    },
    {
      lvl: "lvl2",
      q: "PostgreSQL Sequences কী এবং `BIGSERIAL` বনাম `GENERATED ALWAYS AS IDENTITY` এর আধুনিক ব্যবহার কী?",
      m: "পোস্টগ্রেস সিকোয়েন্স হলো একটি ইন-মেমোরি কাউন্টার যা প্রতি রিকোয়েস্টে পরবর্তী ইউনিক সংখ্যা জেনারেট করে (`nextval`). পুরানো দিনে `SERIAL` বা `BIGSERIAL` ব্যবহার করা হতো যা ইন্টারনালি একটি অটো সিকোয়েন্স টেবিল বানাত। কিন্তু SQL:2003 আন্তর্জাতিক স্ট্যান্ডার্ড অনুযায়ী আধুনিক পোস্টগ্রেসে `GENERATED ALWAYS AS IDENTITY` বা `GENERATED BY DEFAULT AS IDENTITY` ব্যবহার করা হয়। এটি সরাসরি এসকিউএল স্ট্যান্ডার্ড মেনে চলে এবং ব্যবহারকারী ভুল করে ম্যানুয়াল আইডি ইনসার্ট করার চেষ্টা করলে শক্তভাবে গার্ড করে।",
      b: "আধুনিক পোস্টগ্রেসে পুরনো SERIAL এর বদলে এসকিউএল স্ট্যান্ডার্ড মেনে GENERATED ALWAYS AS IDENTITY ব্যবহার করা হয়। এটি স্বয়ংক্রিয় ইউনিক ক্রম তৈরি করে এবং ভুল ম্যানুয়াল মান ইনসার্ট হওয়া থেকে সুরক্ষিত রাখে।",
      e: "SQL:2003 standardized `GENERATED ALWAYS AS IDENTITY` over legacy `SERIAL` types. Identity columns automatically manage backing sequences under the hood while preventing unintended manual ID overrides without explicit override clauses.",
      code: "CREATE TABLE orders (\n  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  total NUMERIC(10, 2)\n);"
    },
    {
      lvl: "lvl2",
      q: "PostgreSQL-এ `NUMERIC` (বা `DECIMAL`) বনাম `FLOAT` / `REAL`-এর মধ্যে পার্থক্য কী এবং আর্থিক হিসাবে কোনটি বাধ্যতামূলক?",
      m: "`FLOAT` এবং `REAL` হলো বাইনারি ফ্লোটিং পয়েন্ট যা দ্রুত হলেও রাউন্ডিং এরর তৈরি করে (যেমন `0.1 + 0.2 != 0.3`)। আর্থিক হিসাব, ব্যাংকিং বা পিওএস সিস্টেমে ১ পয়সার ভুলও ফৌজদারি অপরাধ হতে পারে। `NUMERIC(precision, scale)` হলো Exact Numeric Data Type যা কোনো ফ্লোটিং পয়েন্ট ফ্র্যাকশন নষ্ট করে না এবং নির্ভুল দশমিক সংরক্ষণ করে (যেমন `NUMERIC(14, 2)` মানে মোট ১৪ ডিজিট যার মধ্যে দশমিকের পর ২ ডিজিট)। আর্থিক ডাটায় সর্বদা `NUMERIC` বাধ্যতামূলক।",
      b: "ফ্লোট বা রিয়েল ডাটা টাইপ আনুমানিক মান দেয় যা আর্থিক হিসাবে ভুল তৈরি করে। NUMERIC বা DECIMAL নির্ভুল ভগ্নাংশ সংরক্ষণ করে, তাই টাকা-পয়সার সমস্ত হিসাবে NUMERIC ব্যবহার করা আন্তর্জাতিক নিয়ম।",
      e: "`FLOAT` and `REAL` are IEEE 754 approximate types prone to binary rounding drift. Financial ledgers strictly mandate `NUMERIC(precision, scale)` (arbitrary-precision exact arithmetic), guaranteeing exact decimal calculations down to the smallest Poisha/Cent.",
      tip: "কখনোই আর্থিক কলামে FLOAT ব্যবহার করবে না; সবসময় NUMERIC(12, 2) বা ইনটিজার সেন্ট ব্যবহার করবে।"
    },
    {
      lvl: "lvl2",
      q: "PostgreSQL Generated Columns (Stored vs Virtual) কীভাবে কাজ করে?",
      m: "Generated Column হলো এমন একটি কলাম যার মান অন্য কলামগুলোর মানের ওপর ভিত্তি করে স্বয়ংক্রিয়ভাবে হিসাব হয়। পোস্টগ্রেসে `STORED` জেনারেটেড কলাম রয়েছে: যখনই কোনো রো ইনসার্ট বা আপডেট হয়, ডাটাবেজ এক্সপ্রেশনটি মূল্যায়ন করে মানটি ডিস্কে সেভ করে রাখে। যেমন: `total_price NUMERIC GENERATED ALWAYS AS (unit_price * quantity) STORED`। এর ফলে প্রতিবার অ্যাপ্লিকেশনে হিসাব করতে হয় না, এবং এই জেনারেটেড কলামের ওপর সরাসরি ইনডেক্স তৈরি করা যায় যা কুয়েরি পারফরম্যান্সকে আকাশচুম্বী করে।",
      b: "জেনারেটেড কলাম অন্য কলামের মানের ওপর ভিত্তি করে নিজে থেকেই হিসাব হয়ে ডিস্কে সংরক্ষিত থাকে। যেমন দাম ও পরিমাণের গুণফল স্বয়ংক্রিয়ভাবে টোটাল কলামে বসে যায় এবং এর ওপর ইনডেক্স করে দ্রুত কুয়েরি চালানো যায়।",
      e: "PostgreSQL supports Stored Generated Columns (`GENERATED ALWAYS AS (expr) STORED`). The engine evaluates the deterministic expression during INSERT/UPDATE and persists the result on disk, enabling direct B-Tree indexing on derived calculations.",
      code: "CREATE TABLE sales_items (\n  qty INT NOT NULL,\n  unit_price NUMERIC(10,2) NOT NULL,\n  line_total NUMERIC(10,2) GENERATED ALWAYS AS (qty * unit_price) STORED\n);"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "PostgreSQL Declarative Table Partitioning (Range, List, Hash) কীভাবে শত কোটি রো বিশিষ্ট টেবিলে পারফরম্যান্স অক্ষুণ্ণ রাখে?",
      m: "একটি টেবিলে যখন ১০ কোটির বেশি রো থাকে, সাধারণ ইনডেক্স মেমোরিতে ধরে রাখা অসম্ভব হয়ে যায়। Declarative Partitioning পুরো টেবিলকে লজিক্যালি ছোট ছোট ফিজিক্যাল টেবিলে (Partitions) ভাগ করে ফেলে: (১) `Range Partitioning`: তারিখ অনুযায়ী ভাগ করা (যেমন প্রতি মাসের জন্য আলাদা পার্টিশন)। (২) `List Partitioning`: নির্দিষ্ট তালিকা অনুযায়ী (যেমন বিভাগ বা দেশ অনুযায়ী)। (৩) `Hash Partitioning`: হ্যাশ কি অনুযায়ী সমানভাবে ডিস্ট্রিবিউট করা। যখন কোনো কুয়েরি নির্দিষ্ট তারিখ দিয়ে খোঁজে, পোস্টগ্রেস 'Partition Pruning' মেকানিজমে বাকি ৯৯টি পার্টিশন সম্পূর্ণ স্কিপ করে শুধুমাত্র ওই ১টি পার্টিশন থেকে মাত্র কয়েক মিলিসেকেন্ডে রেজাল্ট এনে দেয়।",
      b: "টেবিল পার্টিশনিং বিশাল টেবিলকে তারিখ বা অঞ্চলের ভিত্তিতে ছোট ছোট পৃথক ফিজিক্যাল টেবিলে বিভক্ত করে। পার্টিশন প্রুনিংয়ের কারণে পোস্টগ্রেস অপ্রয়োজনীয় পার্টিশন স্ক্যান না করে শুধুমাত্র নির্দিষ্ট অংশের মধ্যে অতি দ্রুত কুয়েরি সম্পন্ন করে।",
      e: "Declarative Partitioning splits monolithic multi-billion-row tables into physical shards via Range, List, or Hash strategies. During queries, Partition Pruning eliminates irrelevant table partitions from the query execution tree, shrinking I/O to targeted partition chunks.",
      code: "CREATE TABLE transactions (\n  id UUID NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL\n) PARTITION BY RANGE (created_at);\nCREATE TABLE trans_2024_01 PARTITION OF transactions FOR VALUES FROM ('2024-01-01') TO ('2024-02-01');"
    },
    {
      lvl: "lvl3",
      q: "PostgreSQL TOAST (The Oversized-Attribute Storage Technique) কীভাবে মেগা-সাইজ ফিল্ডস হ্যান্ডেল করে?",
      m: "পোস্টগ্রেসকিউএলে ডাটাবেজের পেজ সাইজ ফিক্সড ৮KB। যদি কোনো রো-তে একটি বড় টেক্সট, JSONB বা ছবি থাকে যার সাইজ ৮KB-এর চেয়ে বেশি (যেমন ২KB-র বেশি হলেই থ্রেশহোল্ড ধরে), পোস্টগ্রেস তাকে সাধারণ পেজে না রেখে TOAST মেকানিজমে পাঠায়। এটি ডেটাকে প্রথমে স্বয়ংক্রিয়ভাবে কমপ্রেস করে; তাতেও না আটলে মূল টেবিলের বাইরে একটি আলাদা হিডেন 'TOAST Table'-এ চাঙ্ক আকারে স্টোর করে এবং মূল টেবিলে একটি ছোট পয়েন্টার রেখে দেয়। এর ফলে বড় ফিল্ড থাকলেও মূল টেবিল স্ক্যান করার সময় ডিস্ক I/O দ্রুত থাকে।",
      b: "পোস্টগ্রেসের পেজ সাইজ ৮ কেবি। বড় টেক্সট বা ফাইল আসলে টোস্ট (TOAST) মেকানিজম স্বয়ংক্রিয়ভাবে ডাটা কমপ্রেস করে আলাদা লুকানো টেবিলে সংরক্ষণ করে মূল টেবিলে পয়েন্টার রাখে, ফলে সাধারণ টেবিল স্ক্যানের গতি বজায় থাকে।",
      e: "PostgreSQL pages are 8KB in size. Attributes exceeding the TOAST threshold (typically 2KB) are compressed and, if still oversized, moved out-of-line into a backing auxiliary TOAST table, preserving a compact pointer on the main heap tuple to keep sequential scans fast.",
      tip: "TOAST মেকানিজম ব্যাখ্যা করা পোস্টগ্রেসকিউএলের গভীর ইন্টারনালস জানার প্রমাণ।"
    },
    {
      lvl: "lvl3",
      q: "Composite Primary Keys বনাম Surrogate Keys: কখন কম্পোজিট কি ডিজাইন আর্কিটেকচারালি সুপিরিয়র?",
      m: "Surrogate Key হলো একটি কৃত্রিম আইডি (যেমন অটো-ইনক্রিমেন্ট বা UUID) যার নিজস্ব কোনো ব্যবসায়িক অর্থ নেই। আর Composite Primary Key হলো একাধিক প্রাকৃতিক কলামের সমন্বয় যা একসাথে ইউনিকনেস নিশ্চিত করে (যেমন জংশন টেবিলে `(studentId, courseId)` বা মাল্টি-টেন্যান্ট টেবিলে `(tenantId, invoiceNumber)`। জংশন টেবিল ও মাল্টি-টেন্যান্ট পার্টিশনিংয়ে Composite Key সুপিরিয়র কারণ: এটি আলাদা ইনডেক্স স্পেস নষ্ট না করেই ডুপ্লিকেট সম্পর্ক প্রতিহত করে এবং ক্লাস্টার্ড লুকআপে ক্যাশ লোকালিটি অনেক বাড়ায়।",
      b: "কম্পোজিট প্রাইমারি কি একাধিক কলামের সমন্বয়ে গঠিত হয়। জংশন টেবিল বা মাল্টি-টেন্যান্ট পার্টিশনে এটি অপ্রয়োজনীয় সারোগেট কি বাদ দিয়ে সরাসরি ডেটার অনন্যতা নিশ্চিত করে এবং মেমোরি সাশ্রয় করে।",
      e: "Surrogate keys introduce synthetic artificial IDs. Composite Primary Keys (`(tenantId, orderId)`) excel in junction tables and multi-tenant domain models by naturally preventing duplicate relationships while ensuring index co-locality without allocating secondary index overhead.",
      code: "CREATE TABLE tenant_invoices (\n  tenant_id UUID NOT NULL,\n  invoice_no INT NOT NULL,\n  PRIMARY KEY (tenant_id, invoice_no)\n);"
    },
    {
      lvl: "lvl3",
      q: "PostgreSQL Custom Domain Types এবং ENUM Types কীভাবে ডাটাবেজ স্তরে টাইপ ভ্যালিডেশন নিশ্চিত করে?",
      m: "আমরা শুধু সাধারণ `VARCHAR` না দিয়ে পোস্টগ্রেসে কাস্টম টাইপ তৈরি করতে পারি: (১) `ENUM`: `CREATE TYPE order_status AS ENUM ('PENDING', 'PROCESSING', 'DELIVERED', 'CANCELLED');`—এটি বাইনারি ৪-বাইটে স্টোর হয় এবং ভুল স্ট্রিং লিখলে ডাটাবেজ এরর দেয়। (২) `DOMAIN`: একটি বেস টাইপের ওপর কাস্টম কনস্ট্রেইন্ট বসিয়ে ডোমেন তৈরি করা যায়, যেমন: `CREATE DOMAIN bd_phone AS TEXT CHECK (VALUE ~ '^01[3-9]\\d{8}$');`। এর ফলে পুরো ডাটাবেজের যেকোনো টেবিলে এই ডোমেন ব্যবহার করলে স্বয়ংক্রিয়ভাবে ভ্যালিডেশন এনফোর্স হয়ে যায়।",
      b: "কাস্টম ডোমেন ও এনাম পোস্টগ্রেসকে কাস্টম টাইপ তৈরির ক্ষমতা দেয়। এনাম ফিক্সড তালিকা নিশ্চিত করে মেমোরি বাঁচায় এবং ডোমেন টাইপ রেগুলার এক্সপ্রেশন কনস্ট্রেইন্ট যুক্ত করে ডাটাবেজ স্তরেই ফোন নম্বর বা ইমেইলের নির্ভুলতা নিশ্চিত করে।",
      e: "PostgreSQL DOMAINs wrap underlying types with reusable CHECK constraints (e.g. regex for phone validation), while ENUM types store categorized string literals as compact 4-byte internal integers, guaranteeing strict domain integrity.",
      code: "CREATE TYPE order_status AS ENUM ('DRAFT', 'PAID', 'VOID');\nCREATE DOMAIN positive_amount AS NUMERIC(12,2) CHECK (VALUE >= 0);"
    },
    {
      lvl: "lvl3",
      q: "Row-Level Security (RLS) পোস্টগ্রেসকিউএলে ইন্টারনালি কীভাবে কাজ করে এবং কীভাবে ডাটাবেজ কার্নেল লেভেলে টেন্যান্ট আইসোলেশন এনফোর্স করে?",
      m: "সাধারণ সিস্টেমে অ্যাপ্লিকেশন কোডে `WHERE tenant_id = '...'` লিখতে ভুল হলে অন্য টেন্যান্টের ডাটা ফাঁস হয়ে যায়। PostgreSQL RLS অন করলে (`ALTER TABLE orders ENABLE ROW LEVEL SECURITY`) ডাটাবেজ ইঞ্জিন স্বয়ংক্রিয়ভাবে প্রতিটি কুয়েরিতে সিকিউরিটি পলিসি ইনজেক্ট করে: `CREATE POLICY tenant_isolation_policy ON orders USING (tenant_id = current_setting('app.current_tenant_id')::uuid)`। এমনকি একজন ডেভেলপার যদি ভুল করে `SELECT * FROM orders` কুয়েরিও চালায়, পোস্টগ্রেস ডাটাবেজ কার্নেল নিজে থেকেই ফিল্টার করে শুধুমাত্র বর্তমান সেশনের টেন্যান্টের ডাটাই রিটার্ন করবে! ডেটা লিক হওয়া অসম্ভব।",
      b: "রো-লেভেল সিকিউরিটি পোস্টগ্রেস ডাটাবেজের ভেতরেই নিরাপত্তা নীতি এনফোর্স করে। অ্যাপ্লিকেশন কোডে ভুল ফিল্টার দিলেও পোস্টগ্রেস কার্নেল স্বয়ংক্রিয়ভাবে সেশনের টেন্যান্ট আইডি অনুযায়ী ডাটা ফিল্টার করে ডেটা লিক পুরোপুরি বন্ধ করে।",
      e: "PostgreSQL Row-Level Security (RLS) injects security predicates at the query planner level. Policies evaluating session variables (`current_setting('app.current_tenant')`) ensure queries are restricted to authenticated tenant rows even if application developers omit WHERE clauses.",
      code: "ALTER TABLE orders ENABLE ROW LEVEL SECURITY;\nCREATE POLICY tenant_policy ON orders USING (tenant_id = current_setting('app.tenant_id')::uuid);"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "ডাটাবেজ মাইগ্রেশন চালানোর সময় টেবিলে `ALTER TABLE orders ADD COLUMN status VARCHAR NOT NULL DEFAULT 'PENDING'` দিতে গিয়ে কোটি রো-এর টেবিল ১০ মিনিট লক হয়ে পুরো প্রোডাকশন ডাউন হয়ে গেল। কীভাবে ফিক্স করবে?",
      m: "কারণ: পোস্টগ্রেস ১১-এর আগের ভার্সনে বা কিছু কনফিগারেশনে `NOT NULL DEFAULT` দিলে পোস্টগ্রেস পুরো টেবিলের কোটি রো-কে রি-রাইট করার জন্য 'AccessExclusiveLock' নেয় যা রিড ও রাইট উভয়ই ব্লক করে দেয়। সমাধান: নিরাপদ ৩-পদক্ষেপ মাইগ্রেশন: (১) প্রথমে কলামটি ডিফল্ট মান সহ nullable হিসেবে যোগ করা: `ADD COLUMN status VARCHAR DEFAULT 'PENDING';` (পোস্টগ্রেস ১১+ এ এটি ও(১) মেটাডাটা আপডেট)। (২) ব্যাকগ্রাউন্ডে ব্যাচ আকারে ডেটা ফিল করা। (৩) শেষে `ALTER TABLE orders ALTER COLUMN status SET NOT NULL;` দিয়ে নট-নাল কনস্ট্রেইন্ট এনফোর্স করা। কোনো টেবিল লক হবে না।",
      b: "কোটি রো-এর টেবিলে নট-নাল ডিফল্ট দিলে এক্সক্লুসিভ লক লেগে ডাউনটাইম হয়। প্রথমে কলামটি নাল্যাবল হিসেবে যোগ করে ব্যাকগ্রাউন্ডে আপডেট সম্পন্ন করে পরবর্তীতে নট-নাল সেট করলে কোনো টেবিল লক ছাড়াই জিরো ডাউনটাইমে পরিবর্তন সম্ভব।",
      e: "Acquiring an `AccessExclusiveLock` stalls all concurrent reads and writes. Mitigate by adding the column with a default but without the NOT NULL constraint initially (O(1) catalog update in Postgres 11+), backfilling asynchronously, and applying NOT NULL subsequently.",
      code: "ALTER TABLE orders ADD COLUMN status VARCHAR DEFAULT 'PENDING';\n-- Then later:\nALTER TABLE orders ALTER COLUMN status SET NOT NULL;"
    },
    {
      lvl: "situation",
      q: "দুটি টেবিলের মধ্যে Many-to-Many রিলেশনশিপে একই ডুপ্লিকেট রেকর্ড বারবার ইনসার্ট হয়ে জংশন টেবিল নষ্ট হচ্ছে। কীভাবে স্কিমা লেভেলে স্থায়ী সমাধান করবে?",
      m: "সমাধান: জংশন টেবিলে কোনো সিঙ্গেল সারোগেট আইডি রাখার চেয়ে দুটি ফরেন কি কলামের ওপর একটি Composite Primary Key অথবা Composite Unique Constraint এনফোর্স করতে হবে: `PRIMARY KEY (student_id, course_id)` অথবা `CONSTRAINT uq_student_course UNIQUE (student_id, course_id)`। এর ফলে অ্যাপ্লিকেশন থেকে ভুল করে একই এনরোলমেন্ট বারবার পাঠালেও ডাটাবেজ স্তর স্বয়ংক্রিয়ভাবে ডুপ্লিকেট ইনসার্ট রিজেক্ট করে `P2002` কনফ্লিক্ট এরর দেবে।",
      b: "জংশন টেবিলে student_id এবং course_id এর ওপর কম্পোজিট প্রাইমারি কি বা ইউনিক কনস্ট্রেইন্ট ব্যবহার করতে হবে। এর ফলে ডাটাবেজ নিজেই ডুপ্লিকেট সম্পর্ক আটকিয়ে তথ্যের অখণ্ডতা নিশ্চিত করবে।",
      e: "Eliminate duplicate relations in junction tables by designating a Composite Primary Key over both foreign keys (`PRIMARY KEY (user_id, role_id)`) or applying a Composite UNIQUE constraint, pushing deduplication enforcement onto database engine primitives.",
      code: "CREATE TABLE user_roles (\n  user_id UUID REFERENCES users(id) ON DELETE CASCADE,\n  role_id UUID REFERENCES roles(id) ON DELETE CASCADE,\n  PRIMARY KEY (user_id, role_id)\n);"
    },
    {
      lvl: "situation",
      q: "একটি পোস্টগ্রেস টেবিলে কোটি কোটি ডিলিট এবং আপডেটের কারণে টেবিলের ডিস্ক সাইজ ১০০GB হয়ে গেছে অথচ আসল ডেটা মাত্র ১০GB (Table Bloat)। কীভাবে সমাধান করবে?",
      m: "কারণ: PostgreSQL-এর MVCC (Multi-Version Concurrency Control) মডেলে `UPDATE` বা `DELETE` করলে পুরানো রো ডিস্ক থেকে সরাসরি মুছে যায় না; এটি 'Dead Tuple' হিসেবে ডিস্কে থেকে যায়। সমাধান: (১) অটো-ভ্যাকুয়াম ঠিকমতো কাজ করছে কি না চেক করা। (২) প্রোডাকশনে ডাউনটাইম ছাড়া স্পেস রিক্লেইম করতে `VACUUM (ANALYZE)` চালাব। (৩) টেবিল সাইজ ডিস্কে পুরোপুরি সংকুচিত করতে জিরো-ডাউনটাইম টুল `pg_repack` ব্যবহার করব (যা টেবিল লক না করে ফ্রেশ কপি তৈরি করে সোয়াপ করে দেয়)।",
      b: "পোস্টগ্রেসে আপডেট ও ডিলিট ডেড টিউপল তৈরি করে টেবিল ব্লোট সৃষ্টি করে। pg_repack টুল ব্যবহার করে লাইভ প্রোডাকশনে কোনো টেবিল লক না করেই বাড়তি ৯০ জিবি খালি জায়গা উদ্ধার করে পারফরম্যান্স ফিরিয়ে আনা যায়।",
      e: "PostgreSQL's MVCC architecture marks modified tuples as dead, causing Table Bloat if autovacuum lags behind. Reclaim dead disk space without table locks using `pg_repack`, an online reorganization utility that rebuilds bloated tables concurrently without downtime.",
      code: "VACUUM ANALYZE orders;\n-- For online zero-lock bloat reclamation:\npg_repack -d dokani_db -t orders"
    },
    {
      lvl: "situation",
      q: "ব্যবহারকারী একটি বড় টেক্সট কলামে সার্চ করার সময় `LIKE '%search%'` দিয়ে কুয়েরি করায় প্রতি সার্চে ৫ সেকেন্ড সময় নিচ্ছে। কীভাবে অপটিমাইজ করবে?",
      m: "কারণ: শুরুতে ওয়াইল্ডকার্ড (`%search`) থাকলে সাধারণ B-Tree ইনডেক্স কাজ করতে পারে না এবং পুরো কোটি রো-এর ওপর Sequential Scan চালায়। সমাধান: PostgreSQL-এর `pg_trgm` (Trigram) এক্সটেনশন সক্রিয় করব এবং একটি `GIN` ইনডেক্স তৈরি করব: `CREATE INDEX idx_products_name_trgm ON products USING GIN (name gin_trgm_ops);`। Trigram ইনডেক্স স্ট্রিংকে ৩-অক্ষরের চাঙ্কে ইনডেক্স করে, ফলে সাবস্ট্রিং সার্চ এবং ফাজি ম্যাচিং ৫ সেকেন্ড থেকে কমে মাত্র ৫ মিলিসেকেন্ডে সম্পন্ন হয়।",
      b: "লাইক কুয়েরিতে শুরুতে % থাকলে বি-ট্রি ইনডেক্স কাজ করে না। পোস্টগ্রেসের pg_trgm এক্সটেনশন চালু করে ট্রাইগ্রাম GIN ইনডেক্স বসালে সাবস্ট্রিং ও আংশিক সার্চ চোখের পলকে সম্পন্ন হয়।",
      e: "Leading wildcard queries (`%term%`) invalidate standard B-Tree indexes, triggering exhaustive sequential scans. Enable the `pg_trgm` extension and apply a GIN Trigram index (`USING GIN (col gin_trgm_ops)`), reducing fuzzy substring queries down to single-digit milliseconds.",
      code: "CREATE EXTENSION IF NOT EXISTS pg_trgm;\nCREATE INDEX idx_prod_trgm ON products USING GIN (name gin_trgm_ops);"
    },
    {
      lvl: "situation",
      q: "ডাটাবেজে হাজার হাজার কাস্টমারের বার্থডে সেভ করা আছে `TIMESTAMP` হিসেবে। টাইমজোনের ভিন্নতার কারণে একেক দেশের ইউজারের জন্মতারিখ একদিন আগে-পরে সরে যাচ্ছে। সঠিক সমাধান কী?",
      m: "কারণ: জন্মতারিখ কোনো নির্দিষ্ট টাইমস্ট্যাম্প (মুহূর্ত) নয়; এটি একটি ক্যালেন্ডার ডেট। সমাধান: (১) জন্মতারিখ সংরক্ষণের জন্য কখনোই `TIMESTAMP` বা `TIMESTAMPTZ` ব্যবহার করা যাবে না; শুধুমাত্র খাঁটি `DATE` ডেটা টাইপ ব্যবহার করতে হবে। (২) আর যেসব ক্ষেত্রে আসল ইভেন্টের মুহূর্ত প্রয়োজন (যেমন লেনদেন সম্পন্ন হওয়ার সময়), সেখানে সর্বদা `TIMESTAMPTZ` (Timestamp with Time Zone) ব্যবহার করতে হবে যা ডাটাবেজে সর্বদা UTC আকারে সেভ থাকে এবং ক্লায়েন্টের লোকাল টাইমজোনে কনভার্ট হয়।",
      b: "জন্মতারিখের জন্য কখনোই টাইমস্ট্যাম্প ব্যবহার করা উচিত নয়, খাঁটি DATE টাইপ ব্যবহার করতে হবে যা টাইমজোনের পরিবর্তনে প্রভাবিত হয় না। অন্যদিকে লেনদেনের জন্য সর্বদা TIMESTAMPTZ ব্যবহার করতে হবে যা ইউটিসি মান ধরে রাখে।",
      e: "Calendar dates (birthdays) are timezone-independent and must strictly use the `DATE` data type. For precise point-in-time domain events (invoices, audit logs), always use `TIMESTAMPTZ` which normalizes storage to UTC internally.",
      code: "birth_date DATE NOT NULL,\ncreated_at TIMESTAMPTZ DEFAULT NOW()"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর মাল্টি-টেন্যান্ট ডেটাবেজ স্কিমায় দোকান, পণ্য, ইনভেন্টরি, সেলস ও গ্রাহকের টেবিল রিলেশনশিপ কীভাবে আর্কিটেক্ট করেছিলে?",
      m: "আমাদের আর্কিটেকচারাল রিলেশনশিপ ছিল: (১) `Tenants` (দোকান মাস্টার)। (২) `Users` (1:N with Tenant, রোল: Owner, Manager, Cashier)। (৩) `Products` (1:N with Tenant, ক্যাটালগ ও বারকোড)। (৪) `StockBatches` (1:N with Product, ক্রয়মূল্য ও মেয়াদ)। (৫) `Invoices` (1:N with Tenant, 1:N with Customer, মাস্টার সেলস)। (৬) `InvoiceItems` (1:N with Invoice, 1:N with Product)। (৭) `CustomerLedger` (1:N with Customer, বাকি ও পেমেন্ট হিস্ট্রি)। প্রতিটি টেবিলে `tenantId` কম্পোজিট ইনডেক্স থাকায় শতভাগ ডেটা আইসোলেশন ও উচ্চগতি নিশ্চিত ছিল।",
      b: "দোকানি স্কিমাতে টেন্যান্টের অধীনে ইউজার, প্রোডাক্ট, স্টক ব্যাচ, ইনভয়েস এবং কাস্টমার লেজার পরস্পরের সাথে ফরেন কি দিয়ে সুসংগঠিত ছিল। প্রতিটি টেবিলে টেন্যান্ট আইডি কম্পোজিট ইনডেক্স ডেটার দ্রুততা ও পূর্ণ নিরাপত্তা বজায় রেখেছিল।",
      e: "Architected Dokani POS relational schema: Tenants as roots, 1:N with Products, StockBatches, and Invoices. Invoices related 1:N to LineItems and Customers, backed by CustomerLedgers. All child entities carried indexed composite foreign keys to tenant roots.",
      tip: "একটি পূর্ণাঙ্গ পিওএস সিস্টেমের ডেটাবেজ ইআরডি (ERD) মুখে স্পষ্টভাবে বর্ণনা করা টেক লিডদের সিগনেচার দক্ষতা।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ শত শত স্টোরের প্রোডাক্ট ক্যাটালগে ক্যাটাগরি, ব্র্যান্ড ও সাপ্লায়ার ম্যানেজমেন্টে ডেটা নরমালাইজেশন কীভাবে রক্ষা করেছিলে?",
      m: "আমরা ক্যাটাগরি ও ব্র্যান্ডের নাম প্রোডাক্ট টেবিলে সরাসরি স্ট্রিং আকারে না রেখে `Categories`, `Brands`, এবং `Suppliers` টেবিল আলাদা করে 3NF নরমাল ফর্ম রক্ষা করেছি। প্রোডাক্ট টেবিলে শুধু তাদের ফরেন কি আইডি ছিল। এতে সুবিধা হলো: দোকানদার যদি একটি ব্র্যান্ডের নাম বা লোগো আপডেট করে, তবে ১টি মাত্র রো আপডেট হতো—লাখ লাখ প্রোডাক্টে ম্যানুয়াল পরিবর্তন লাগত না। আর ফাস্ট এপিআই রেসপন্সের জন্য Prisma-র `include: { category: true, brand: true }` দিয়ে অপটিমাইজড জয়েন করেছি।",
      b: "ক্যাটাগরি ও ব্র্যান্ডের জন্য পৃথক টেবিল তৈরি করে আমরা ৩য় নরমাল ফর্ম নিশ্চিত করেছি। এর ফলে ব্র্যান্ডের নাম বদলালে একটি মাত্র রো পরিবর্তনের মাধ্যমেই সব প্রোডাক্টে স্বয়ংক্রিয়ভাবে সঠিক নাম প্রদর্শিত হতো।",
      e: "Preserved 3NF normalization in Dokani by isolating Categories, Brands, and Suppliers into distinct entities referenced via foreign keys. Updating supplier metadata modified a single row, propagating cleanly without mutating millions of product rows.",
      code: "model Product {\n  id         String   @id @default(uuid())\n  tenantId   String\n  name       String\n  categoryId String\n  category   Category @relation(fields: [categoryId], references: [id])\n}"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে লাখ লাখ ছাত্রের কোর্স প্রোগ্রেস ও কুইজ সাবমিশন ট্র্যাকিংয়ে PostgreSQL Schema কীভাবে ডিজাইন করেছিলে?",
      m: "আমরা একটি হাইব্রিড রিলেশনাল মডেল বানিয়েছি: `Course` -> `Chapter` -> `Lesson` (1:N হায়ারার্কি)। ছাত্রের প্রোগ্রেস ট্র্যাক করতে `LessonProgress` টেবিলে `(studentId, lessonId)`-এর ওপর Composite Primary Key ছিল যাতে ডুপ্লিকেট রো তৈরি না হয়। আর কুইজের জন্য: প্রতিটি সাবমিশনে একটি `QuizSubmission` তৈরি হতো এবং ছাত্রের দেওয়া সমস্ত উত্তরের বিস্তারিত একটি অপটিমাইজড `JSONB` কলামে সেভ করা হতো। এর ফলে রিলেশনাল ইন্টিগ্রিটিও রক্ষা পেয়েছে এবং কুইজের পরিবর্তনশীল প্রশ্ন উত্তরের জটিল জয়েনিংও এড়ানো গেছে।",
      b: "পিটিটিএবিডিতে কোর্স ও লেকচারের জন্য রিলেশনাল মডেল এবং ছাত্রের বিস্তারিত উত্তরের জন্য JSONB ডেটা টাইপ সমন্বয় করা হয়েছিল। কম্পোজিট কি ব্যবহারের ফলে প্রোগ্রেস ডুপ্লিকেশন বন্ধ হয়েছিল এবং দ্রুত রিপোর্ট পাওয়া যেত।",
      e: "Engineered PTTABD learning schemas combining relational hierarchies (Courses -> Chapters -> Lessons) with Composite PKs on `LessonProgress(studentId, lessonId)`. Stored granular quiz option answers inside structured `JSONB` columns to avert relational join bloat.",
      tip: "রিলেশনাল মডেলের সাথে JSONB কলামের হাইব্রিড কম্বিনেশন আধুনিক পোস্টগ্রেস আর্কিটেকচারের সবচেয়ে পাওয়ারফুল প্যাটার্ন।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ প্রতিদিনের শত শত সেলস ইনভয়েস থেকে কাস্টমার লেজার এবং অ্যাকাউন্টিং রিপোর্ট তৈরির জন্য SQL Materialized Views কীভাবে ব্যবহার করেছিলে?",
      m: "প্রতিদিন কোটি কোটি রো-এর ওপর বারবার `SUM()`, `GROUP BY` চালিয়ে সেলস সামারি বের করলে ডাটাবেজ স্লো হয়ে যেত। আমরা PostgreSQL-এর `Materialized View` তৈরি করেছি: `CREATE MATERIALIZED VIEW mv_daily_sales AS SELECT tenant_id, date_trunc('day', created_at) as sale_date, SUM(total) as revenue FROM invoices GROUP BY 1, 2`। এবং এর ওপর ইউনিক ইনডেক্স তৈরি করে প্রতি রাতে ক্রন জবে `REFRESH MATERIALIZED VIEW CONCURRENTLY mv_daily_sales;` দিয়েছি। এর ফলে রিফ্রেশের সময় কোনো টেবিল লক না হয়েই ১ সেকেন্ডের মধ্যে প্রি-ক্যালকুলেটেড রিপোর্ট পাওয়া যেত।",
      b: "প্রতিদিনের সেলস রিপোর্টের গতি বাড়াতে মেটেরিয়ালাইজড ভিউ ব্যবহার করা হয়েছিল। প্রতি রাতে কনকারেন্টলি ভিউ রিফ্রেশ করায় কোনো টেবিল লক ছাড়াই মুহূর্তের মধ্যে প্রি-ক্যালকুলেটেড সেলস অ্যানালিটিক্স সরবরাহ করা সম্ভব হয়েছিল।",
      e: "Accelerated Dokani analytics via PostgreSQL Materialized Views pre-aggregating daily sales totals. Scheduled cron workers refreshed the views concurrently (`REFRESH MATERIALIZED VIEW CONCURRENTLY`) without locking ongoing checkout transactions.",
      code: "CREATE MATERIALIZED VIEW mv_store_sales AS\nSELECT tenant_id, SUM(grand_total) as total_revenue, COUNT(*) as invoice_count\nFROM invoices GROUP BY tenant_id;\nCREATE UNIQUE INDEX idx_mv_store ON mv_store_sales(tenant_id);"
    },
    {
      lvl: "realworld",
      q: "পোস্টগ্রেসকিউএল ডাটাবেজ আর্কিটেকচার ও স্কিমা ডিজাইনে টিম কোয়ালিটি রক্ষার জন্য তোমার মূল ফিলোসফি কী?",
      m: "আমার মূল আর্কিটেকচারাল ফিলোসফি: (১) অ্যাপ্লিকেশনে বিশ্বাস করার আগে ডাটাবেজ লেভেলে কনস্ট্রেইন্ট (Foreign Key, Check, Unique) এনফোর্স করা—কারণ খারাপ কোড ঠিক করা যায় কিন্তু করাপ্টেড ডেটা ঠিক করা অসম্ভব। (২) সমস্ত ফরেন কি এবং ফিল্টার কলামে প্রাক-ইনডেক্সিং নিশ্চিত করা। (৩) মাল্টি-টেন্যান্সি এবং অডিট ইন্টিগ্রিটি ডিফল্ট ডিজাইন হিসেবে রাখা। (৪) জিরো-ডাউনটাইম মাইগ্রেশন নীতি মেনে চলা।",
      b: "আমার ডাটাবেজ নীতি হলো: ডাটাবেজ স্তরেই কনস্ট্রেইন্টের সাহায্যে তথ্যের শতভাগ শুদ্ধতা রক্ষা করা। প্রতিটি ফরেন কি তে ইনডেক্স নিশ্চিত করা, মাল্টি-টেন্যান্ট নিরাপত্তা বজায় রাখা এবং ডাউনটাইম ছাড়া মাইগ্রেশন নিশ্চিত করা।",
      e: "My database architectural philosophy: 'Enforce invariants at the database engine boundary via strict constraints before trusting application code.' Faulty code is easily patched, but corrupted persistent data is catastrophic. Pair strict foreign keys with exhaustive index coverage and zero-downtime migrations.",
      tip: "এই স্ট্রং স্টেটমেন্ট দিয়ে উত্তর শেষ করলে ইন্টারভিউয়ার বুঝবে তোমার ডাটাবেজ ফাউন্ডেশন রক-সলিড।"
    }
  ]
};
