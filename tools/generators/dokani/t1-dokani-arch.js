// Topic 1: Dokani SaaS Core Architecture & Tenant Isolation (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "dokani-architecture-overview",
  name: "Dokani SaaS Core Architecture & Tenant Isolation",
  desc: "Multi-tenant SaaS Architecture, Subdomain Routing, Data Isolation, License & Subscription Lifecycle, Role-Based Access Control",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Dokani SaaS কী এবং এটি সাধারণ সিঙ্গেল-শপ পয়েন্ট-অব-সেল (POS) সফটওয়্যারের চেয়ে কীভাবে আলাদা?",
      m: "Dokani হলো একটি আধুনিক মাল্টি-টেন্যান্ট ক্লাউড-বেসড POS ও ইনভেন্টরি ম্যানেজমেন্ট SaaS প্ল্যাটফর্ম (লাইভ: `https://dokani.bip.sg`)। সাধারণ POS সফটওয়্যার একটি নির্দিষ্ট পিসিতে অফলাইনে ইনস্টল থাকে যা অন্য জায়গা থেকে দেখা যায় না এবং ডেটা ব্যাকআপ থাকে না। Dokani একটি সেন্ট্রালাইজড ক্লাউড আর্কিটেকচারে চলে যেখানে হাজার হাজার খুচরা ও পাইকারি দোকানদার নিজস্ব সাবডোমেন (`store.dokani.bip.sg`) দিয়ে যেকোনো ডিভাইস (ল্যাপটপ, মোবাইল, পিওএস টার্মিনাল) থেকে রিয়েলটাইমে দোকান পরিচালনা করতে পারে, লাইভ সেলস দেখতে পারে এবং স্বয়ংক্রিয় ক্লাউড ব্যাকআপ পায়।",
      b: "দোকানি হলো একটি মাল্টি-টেন্যান্ট ক্লাউড পিওএস প্ল্যাটফর্ম। সাধারণ সিঙ্গেল পিসি সফটওয়্যারের বিপরীতে দোকানি যেকোনো ডিভাইস থেকে রিয়েলটাইম সেলস মনিটরিং, ক্লাউড ব্যাকআপ এবং একাধিক ব্রাঞ্চ এক জায়গা থেকে পরিচালনার পূর্ণ সুবিধা দেয়।",
      e: "Dokani is a multi-tenant cloud POS and inventory management SaaS (live at dokani.bip.sg). Unlike legacy single-desktop POS programs trapped on local hardware, Dokani allows thousands of retail and wholesale merchants to manage real-time sales, multi-branch inventories, and customer credit ledgers from any device via dedicated tenant subdomains.",
      tip: "বলো: 'Dokani is a production multi-tenant POS SaaS powering thousands of merchants with zero-install cloud infrastructure.'"
    },
    {
      lvl: "lvl1",
      q: "Dokani-তে Multi-Tenant Data Isolation কীভাবে বজায় রাখা হয় যাতে এক দোকানের ডেটা অন্য দোকান দেখতে না পায়?",
      m: "দোকানিতে 'Shared Database, Shared Schema with Logical Multi-Tenancy' কার্যকর। প্রতিটি টেবিলে (Products, Invoices, Customers, Ledgers) একটি ইনডেক্সড `tenant_id (UUID)` কলাম রয়েছে। আর্কিটেকচারে ৩ স্তরের কঠোর সিকিউরিটি ফিল্টার কাজ করে: (১) সাবডোমেন ও JWT টোকেন থেকে টেন্যান্ট আইডেন্টিফিকেশন, (২) নোড সার্ভিস লেয়ারে AsyncLocalStorage এবং টাইপ-সেফ Prisma Client এক্সটেনশন যা স্বয়ংক্রিয়ভাবে কুয়েরিতে `{ where: { tenantId } }` ইনজেক্ট করে, এবং (৩) ডেটাবেজ স্তরে PostgreSQL Row-Level Security (RLS) পলিসি। কোনো ডেভেলপার ভুল করলেও এক দোকানের ডেটা অন্য দোকানে যাওয়া গাণিতিকভাবে অসম্ভব।",
      b: "দোকানিতে প্রতিটি টেবিলে tenant_id কলাম থাকে। JWT টোকেন ভেরিফিকেশন, প্রিজমা ক্লায়েন্ট এক্সটেনশন এবং পোস্টগ্রেস RLS পলিসির মাধ্যমে ডেটাবেজ স্তরে ১০০% টেন্যান্ট আইসোলেশন নিশ্চিত করা হয়েছে।",
      e: "Dokani enforces logical tenant isolation within a shared PostgreSQL database using indexed tenant_id columns. Queries are constrained via defense-in-depth: JWT claim extraction, AsyncLocalStorage context propagation with Prisma client extensions, and PostgreSQL Row-Level Security (RLS).",
      code: "// Auto-injected in Dokani repository layer:\nconst products = await prisma.product.findMany({\n  where: { tenantId: ctx.tenantId, isActive: true }\n});"
    },
    {
      lvl: "lvl1",
      q: "Dokani-তে ব্যবহারকারীদের রোল-বেসড এক্সেস কন্ট্রোল (RBAC) কীভাবে ভাগ করা হয়েছে?",
      m: "দোকানিতে ৩টি মূল রোল রয়েছে: (১) `Owner (মালিক)`: সম্পূর্ণ দোকানের পূর্ণ নিয়ন্ত্রণ, সব ব্রাঞ্চের সেলস অ্যানালিটিক্স, লাভ-ক্ষতির খতিয়ান, প্রফিট মার্জিন দেখা, স্টাফদের পারমিশন দেওয়া এবং সাবস্ক্রিপশন প্ল্যান ম্যানেজ করা। (২) `Manager (ম্যানেজার)`: প্রোডাক্ট ক্যাটালগ এডিট করা, স্টক রিসিভ ও পারচেজ অর্ডার দেওয়া, দাম পরিবর্তন করা এবং ক্যাশিয়ারদের সেলস অডিট করা। (৩) `Cashier (ক্যাশিয়ার)`: শুধুমাত্র দ্রুত বিলিং করা, বারকোড স্ক্যান করে বিক্রি করা এবং ইনভয়েস প্রিন্ট করা; ক্যাশিয়াররা প্রোডাক্টের কেনা দাম (Cost Price) বা দোকানের প্রফিট দেখতে পারে না এবং পুরনো সেলস ডিলিট বা এডিট করতে পারে না।",
      b: "দোকানিতে তিনটি রোল কার্যকর: ওনার (পূর্ণ নিয়ন্ত্রণ ও লাভ-ক্ষতি দেখা), ম্যানেজার (স্টক ও প্রোডাক্ট ক্যাটালগ ম্যানেজমেন্ট), এবং ক্যাশিয়ার (শুধুমাত্র সেলস ও বিলিং; কস্ট প্রাইস দেখা বা সেলস এডিট নিষিদ্ধ)।",
      e: "Dokani enforces strict three-tier RBAC: Owner (unrestricted visibility into financial profits, ledgers, and branch operations), Manager (inventory stock replenishment and catalog mutations), and Cashier (high-speed checkout billing strictly masked from cost margins and prohibited from mutating sales records).",
      tip: "ইন্টারভিউতে 'Cashiers can sell but cannot see cost margins or delete historical invoices' পয়েন্টটি বাস্তব অভিজ্ঞতার প্রমাণ।"
    },
    {
      lvl: "lvl1",
      q: "Dokani-তে সাবডোমেন রাউটিং (`storename.dokani.bip.sg`) কীভাবে এপিআই ও ফ্রন্টএন্ডে রিজলভ করা হয়?",
      m: "যখন ব্রাউজার থেকে `aroma.dokani.bip.sg`-এ হিট করা হয়: (১) ক্লাউডফ্লেয়ার ও Nginx ওয়াইল্ডকার্ড ডিএনএস দিয়ে ট্রাফিক প্রক্সি করে। (২) ফ্রন্টএন্ড Next.js মিডলওয়্যার রিকোয়েস্টের `Host` হেডার থেকে সাবডোমেন স্লাগ (`aroma`) বের করে। (৩) ব্যাকএন্ড এপিআই রিকোয়েস্টের হেডারে `x-tenant-slug` পাস করে। (৪) ব্যাকএন্ড ক্যাশ থেকে (Redis) চেক করে `aroma` স্লাগের সক্রিয় টেন্যান্ট আইডিটি বের করে এবং রেসপন্সে দোকানের ব্র্যান্ডিং, লোগো ও থিম কনফিগ পাঠিয়ে দেয়।",
      b: "হোস্ট হেডার থেকে সাবডোমেন (aroma) এক্সট্র্যাক্ট করে রেডিস ক্যাশ থেকে টেন্যান্ট ভেরিফাই করা হয়। ফলে প্রতিটি দোকান তার নিজস্ব ব্র্যান্ডেড পোর্টালে অটোমেটিক রুট হয়ে যায়।",
      e: "Dokani parses the HTTP Host header at the reverse proxy and Next.js middleware layers to capture the tenant slug. An in-memory Redis cache maps the slug to the verified tenantId in sub-millisecond time, loading custom shop branding and catalog assets.",
      code: "// Middleware subdomain resolver:\nconst host = req.headers.get('host') || '';\nconst subdomain = host.split('.')[0]; // Extracts 'aroma'"
    },
    {
      lvl: "lvl1",
      q: "Dokani-র টেকনোলজি স্ট্যাক (Tech Stack) কী এবং এই টুলগুলো কেন বেছে নেওয়া হয়েছিল?",
      m: "দোকানির সম্পূর্ণ আধুনিক প্রোডাকশন স্ট্যাক: (১) `Frontend`: Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide Icons (হাই-স্পিড পিওএস ইন্টারফেস ও কী-বোর্ড শর্টকাট)। (২) `Backend`: Node.js, Express.js, TypeScript, Clean Layered Architecture (হাই-থ্রুপুট এপিআই)। (৩) `Database & ORM`: PostgreSQL (কঠোর ACID ও ফিনান্সিয়াল ট্রানজ্যাকশন) এবং Prisma ORM (টাইপ-সেফ কুয়েরি)। (৪) `Caching & Queue`: Redis (রিয়েলটাইম সেশন ও সাবডোমেন লুকআপ) এবং BullMQ (অ্যাসিনক্রোনাস পিডিএফ ও এসএমএস)। (৫) `DevOps`: Ubuntu VPS, Nginx, PM2 Cluster, Cloudflare, Let's Encrypt SSL।",
      b: "দোকানির স্ট্যাক: ফ্রন্টএন্ডে Next.js ও TypeScript, ব্যাকএন্ডে Node.js ও Express, ডেটাবেজে PostgreSQL ও Prisma ORM, ক্যাশিংয়ে Redis, এবং ডেভঅপসে উবুন্টু VPS, Nginx ও PM2 ক্লাস্টার।",
      e: "Dokani tech stack: Next.js and TypeScript on frontend for ultra-fast keyboard-first POS workflows; Node.js/Express with Clean Architecture on backend; PostgreSQL with Prisma ORM for rigorous double-entry ledger transactions; Redis for caching; and Ubuntu VPS with Nginx and PM2 for zero-downtime operations.",
      tip: "বলো: 'We selected PostgreSQL for ACID transaction integrity in financial ledgers, and Next.js for keyboard-driven checkout velocity.'"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Dokani-তে মার্চেন্ট সাবস্ক্রিপশন ও লাইসেন্স লাইফসাইকেল (Trial, Active, Expired, Suspended) কীভাবে ম্যানেজ করা হয়?",
      m: "দোকানিতে প্রতিটি টেন্যান্টের একটি `Subscription` স্ট্যাটাস থাকে। (১) নতুন সাইন আপ করলে ১৪ দিনের `TRIAL` পিরিয়ড চালু হয়। (২) পেমেন্ট করলে `ACTIVE` হয় এবং পরবর্তী বিলিং ডেট (`expiresAt`) সেট হয়। (৩) মেয়াদ শেষ হলে ৫ দিনের `GRACE_PERIOD` দেওয়া হয় যেখানে সেলস চালু থাকে কিন্তু ওয়ার্নিং ব্যানার দেখায়। (৪) গ্রেস পিরিয়ড শেষ হলে অ্যাকাউন্ট `LOCKED` বা `SUSPENDED` হয়ে যায়—যেখানে শুধুমাত্র সেলস হিস্ট্রি দেখার অনুমতি থাকে কিন্তু নতুন সেলস বা ইনভেন্টরি এন্ট্রি ব্লক করে দেওয়া হয় এবং পেমেন্ট গেটওয়েতে রিনিউ করতে বলা হয়। সমস্ত চেক মিডলওয়্যারে ক্যাশড মেমোরিতে ভ্যালিডেট হয়।",
      b: "সাবস্ক্রিপশন লাইফসাইকেলে ১৪ দিনের ট্রায়াল, নিয়মিত অ্যাক্টিভ, ৫ দিনের গ্রেস পিরিয়ড এবং মেয়াদোত্তীর্ণ হলে অ্যাকাউন্ট সাসপেন্ড করা হয়। সাসপেন্ড অবস্থায় শুধু পুরনো রিপোর্ট দেখা যায় কিন্তু নতুন বিক্রি বন্ধ থাকে।",
      e: "Dokani subscription lifecycle enforces state transitions: TRIAL (14 days) -> ACTIVE -> GRACE_PERIOD (5 days with billing warnings) -> SUSPENDED (write operations blocked, read-only audit preserved until renewal). A cached subscription middleware validates status on every mutating request.",
      code: "if (tenant.subscriptionStatus === 'SUSPENDED') {\n  throw new ForbiddenException('Subscription expired. Please renew to continue billing.');\n}"
    },
    {
      lvl: "lvl2",
      q: "Dokani-তে একাধিক ব্রাঞ্চ বা আউটলেট (Multi-Branch / Multi-Warehouse) কীভাবে ডেটাবেজে সাপোর্ট করে?",
      m: "একটি টেন্যান্টের (যেমন 'Aarong') একাধিক শোরুম বা গুদাম থাকতে পারে। স্কিমা ডিজাইন: প্রতিটি টেন্যান্টের আন্ডারে একটি `branches` টেবিল থাকে। প্রোডাক্টের মূল ক্যাটালগ (নাম, বারকোড, ক্যাটাগরি) টেন্যান্ট লেভেলে গ্লোবাল থাকে, কিন্তু প্রোডাক্টের স্টক সংরক্ষিত হয় `branch_stocks` টেবিলে যৌথ প্রাইমারি কি দিয়ে: `(branch_id, product_id)`। ক্যাশিয়ার যখন সেলস করে, সে নির্দিষ্ট ব্রাঞ্চ আইডি সহ বিক্রি করে, ফলে শুধু ওই ব্রাঞ্চের স্টক কমে। ওনার ড্যাশবোর্ডে চাইলে প্রতিটি আউটলেটের আলাদা আলাদা সেলস বা সব আউটলেটের সমন্বিত সেলস রিপোর্ট দেখতে পারেন।",
      b: "প্রোডাক্ট ক্যাটালগ পুরো দোকানের জন্য কমন থাকে কিন্তু branch_stocks টেবিলে প্রতিটি ব্রাঞ্চের আলাদা স্টক সংরক্ষিত থাকে। ফলে বিক্রির সময় শুধু সংশ্লিষ্ট ব্রাঞ্চের স্টক কমে কিন্তু ক্যাটালগ এক জায়গায় ম্যানেজ হয়।",
      e: "Dokani decouples master product catalogs from physical inventory stock. Products exist at the tenant tier, while inventories reside in a branch_stocks relation keyed by (branch_id, product_id). Cashiers execute sales scoped to their active branch, adjusting inventory locally while aggregating company-wide on owner dashboards.",
      code: "CREATE TABLE branch_stocks (\n  branch_id UUID REFERENCES branches(id),\n  product_id UUID REFERENCES products(id),\n  stock_quantity NUMERIC(10, 2) NOT NULL DEFAULT 0,\n  PRIMARY KEY (branch_id, product_id)\n);"
    },
    {
      lvl: "lvl2",
      q: "Dokani-তে ইন্টারনেট সাময়িক চলে গেলেও ক্যাশিয়ার যাতে বিলিং চালিয়ে যেতে পারে তার জন্য অফলাইন ফলব্যাক আর্কিটেকচার কীভাবে ডিজাইন করা হয়েছে?",
      m: "দোকানের বাস্তবতায় ইন্টারনেট ড্রপ একটি নিয়মিত ঘটনা। অফলাইন ফলব্যাক ডিজাইন: (১) ফ্রন্টএন্ডে ব্রাউজারের `IndexedDB` ব্যবহার করে প্রোডাক্ট ক্যাটালগ, বারকোড এবং প্রাইস মেমোরিতে ক্যাশ করে রাখা হয়। (২) ইন্টারনেট চলে গেলে পিওএস ইন্টারফেস 'Offline Mode' ব্যানারে শিফট করে। ক্যাশিয়ার বারকোড স্ক্যান করে স্বাভাবিকভাবে বিক্রি করতে পারে এবং প্রিন্টার দিয়ে স্লিপ প্রিন্ট হয়। (৩) অফলাইন ইনভয়েসগুলো লোকাল IndexedDB-তে `PENDING_SYNC` ফ্ল্যাগ সহ জমা থাকে। (৪) ইন্টারনেট ফিরে আসা মাত্রই একটি ব্যাকগ্রাউন্ড সার্ভিস স্বয়ংক্রিয়ভাবে জমে থাকা ইনভয়েসগুলো ব্যাচ আকারে সার্ভারে পুশ করে ডেটাবেজ সিঙ্ক সম্পন্ন করে।",
      b: "ইন্টারনেট না থাকলেও ব্রাউজারের IndexedDB ক্যাশ ব্যবহার করে ক্যাশিয়ার বিক্রি করতে পারে। ইন্টারনেট আসার সাথে সাথে অফলাইনে হওয়া সমস্ত ইনভয়েস ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে সার্ভারে সিঙ্ক হয়ে যায়।",
      e: "Dokani handles transient connectivity loss via an IndexedDB offline caching layer. Cashiers scan cached barcodes, print receipts, and persist local sales with a PENDING_SYNC state. When the network reconnects, an automated sync worker replays queued invoices idempotently to the backend.",
      tip: "বলো: 'IndexedDB caches product catalogs for offline POS billing, auto-syncing queued invoices upon network reconnection.'"
    },
    {
      lvl: "lvl2",
      q: "Dokani-তে প্রোডাক্ট ভ্যারিয়েন্ট (Variants: সাইজ, কালার, ব্যাচ) এবং ইউনিট কনভার্সন (যেমন পিস, ডজন, কেজি, কার্টন) কীভাবে হ্যান্ডেল করা হয়?",
      m: "বাস্তব দোকানে একই সাবান সিঙ্গেল 'পিস' হিসেবেও বিক্রি হয় আবার 'কার্টন' হিসেবেও বিক্রি হয়। স্কিমা আর্কিটেকচার: প্রতিটি প্রোডাক্টের জন্য একটি `Base Unit` থাকে (যেমন 'Piece')। এর পাশাপাশি একটি `unit_conversions` টেবিল থাকে যেখানে কনভার্সন ফ্যাক্টর ডিফাইন থাকে (যেমন `1 Carton = 24 Pieces`)। ক্যাশিয়ার যদি কার্টনে সেল করে, সিস্টেম অটোমেটিক `quantity * 24` গুণ করে মূল ইনভেন্টরি থেকে সঠিক পিস সংখ্যা বিয়োগ করে। আর ভ্যারিয়েন্টের জন্য প্রতিটি ভ্যারিয়েন্টের নিজস্ব বারকোড ও স্টক থাকে, কিন্তু তারা মূল প্যারেন্ট প্রোডাক্টের সাথে যুক্ত থাকে।",
      b: "প্রোডাক্টের একটি বেস ইউনিট (পিস) থাকে এবং ইউনিট কনভার্সন দিয়ে কার্টন বা ডজনের অনুপাত ঠিক করা হয়। কার্টনে বিক্রি হলেও সিস্টেম স্বয়ংক্রিয়ভাবে পিসে রূপান্তর করে ইনভেন্টরি থেকে স্টক বিয়োগ করে।",
      e: "Dokani standardizes inventory around Base Units (e.g. Piece, Gram). A unit_conversions relation maps packaging multipliers (1 Box = 50 Pieces). When cashiers sell in bulk units, the POS engine calculates the base multiplier and deducts base stock accurately from physical inventories.",
      code: "// 1 Box = 12 Pieces:\nconst baseQuantity = soldQuantity * conversionFactor;\nawait decrementStock(productId, baseQuantity);"
    },
    {
      lvl: "lvl2",
      q: "Dokani-তে অডিট ট্রেইল (Audit Trail) কীভাবে কাজ করে এবং ক্যাশিয়ারের কোনো জালিয়াতি কীভাবে ধরা পড়ে?",
      m: "দোকানি পিওএসে কোনো সংবেদনশীল ডেটা ডিলিট করা সম্পূর্ণ নিষিদ্ধ (Soft Delete ও ইমিউটেবল অডিট ট্রেইল মানা হয়)। প্রতিটি বিক্রির ইনভয়েসে ক্যাশিয়ারের আইডি (`created_by`), সঠিক টাইমস্ট্যাম্প, এবং পেমেন্ট মেথড স্থায়ীভাবে রেকর্ড থাকে। যদি কোনো ক্যাশিয়ার কোনো ইনভয়েস ক্যান্সেল বা ডিসকাউন্ট দেয়, তবে একটি `audit_logs` টেবিলে স্বয়ংক্রিয়ভাবে এন্ট্রি পড়ে: কে ডিসকাউন্ট দিল, কত টাকা এবং কোন আইপি/টার্মিনাল থেকে। এছাড়া দিন শেষে 'Cash Drawer Reconciliation'-এ ক্যাশিয়ারের ড্রয়ারের আসল ক্যাশ টাকার সাথে সফটওয়্যারের মোট ক্যাশ সেলস মিলিয়ে কোনো ঘাটতি বা বাড়তি থাকলে তাৎক্ষণিক রিপোর্ট তৈরি হয়।",
      b: "দোকানিতে সেলস রেকর্ড কখনোই ডিলিট করা যায় না। ডিসকাউন্ট বা ক্যানসেলেশনের তথ্য অডিট লগে স্থায়ীভাবে থাকে এবং দিন শেষে ক্যাশ ড্রয়ার রিকনসিলিয়েশনের মাধ্যমে ক্যাশিয়ারের যেকোনো গরমিল মুহূর্তে ধরা পড়ে।",
      e: "Dokani enforces immutable append-only audit logging: every invoice records operator IDs, terminals, and timestamps. Discount alterations and transaction voids automatically dispatch immutable audit records. End-of-shift Cash Drawer Reconciliation compares physical cash against digital sales ledgers to flag discrepancies instantly.",
      tip: "ইন্টারভিউতে 'End-of-shift Cash Drawer Reconciliation' উল্লেখ করা বাস্তব পিওএস ডোমেন জ্ঞানের বড় প্রমাণ।"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Dokani-তে হাই-কনকারেন্সি ফ্ল্যাশ সেলে 'Inventory Over-selling' কীভাবে রো-লেভেল ট্রানজ্যাকশন লক দিয়ে শূন্যে নামানো হয়েছে?",
      m: "একই দোকানে যখন একাধিক ক্যাশিয়ার একই সাথে সীমিত স্টকের শেষ ৩টি প্রোডাক্ট বিক্রি করার চেষ্টা করে, তখন রেস কন্ডিশনের ঝুঁকি তৈরি হয়। সমাধান: আমরা সেলস চেকআউট ট্রানজ্যাকশনের মধ্যে PostgreSQL রো-লেভেল পেসিমিস্টিক লক ব্যবহার করি: `SELECT stock_quantity FROM branch_stocks WHERE branch_id = $1 AND product_id = $2 FOR UPDATE;`। এই লকটি ট্রানজ্যাকশন শেষ না হওয়া পর্যন্ত অন্য কোনো ক্যাশিয়ারকে ওই রোর স্টক এডিট করতে দেয় না। যদি রিকোয়েস্টেড কোয়ান্টিটি বর্তমান স্টকের চেয়ে বেশি হয়, তবে ট্রানজ্যাকশন তাৎক্ষণিক 'Insufficient Stock' এরর দিয়ে রোলব্যাক করে। ফলে দোকানে কখনোই কোনো নেগেটিভ স্টক বা ওভার-সেলিং ঘটে না।",
      b: "একাধিক ক্যাশিয়ার একই সময়ে বিক্রি করলে স্টক মাইনাস হওয়া ঠেকাতে SELECT ... FOR UPDATE পেসিমিস্টিক লক ব্যবহার করা হয়েছে। ফলে স্টক শেষ থাকলে সিস্টেম তৎক্ষণাৎ বিক্রি বাতিল করে স্টক ইন্টিগ্রিটি রক্ষা করে।",
      e: "Under multi-cashier terminal concurrency, Dokani prevents inventory overselling using PostgreSQL pessimistic row-level locks via SELECT FOR UPDATE inside Prisma interactive transactions. The lock serializes inventory evaluations, aborting transactions with 'Insufficient Stock' if stock drops below checkout quantities.",
      code: "await prisma.$transaction(async (tx) => {\n  const [stock] = await tx.$queryRaw`\n    SELECT stock_quantity FROM branch_stocks \n    WHERE branch_id = ${bId} AND product_id = ${pId} \n    FOR UPDATE;\n  `;\n  if (stock.stock_quantity < qty) throw new Error('Stock exhausted');\n  await tx.$executeRaw`\n    UPDATE branch_stocks SET stock_quantity = stock_quantity - ${qty} \n    WHERE branch_id = ${bId} AND product_id = ${pId};\n  `;\n});"
    },
    {
      lvl: "lvl3",
      q: "Dokani-তে কাস্টমার বাকি (Credit Sales) ও সাপ্লায়ার দেনা ম্যানেজমেন্টে 'Double-Entry Accounting Ledger' কীভাবে কাজ করে?",
      m: "সাধারণ সফটওয়্যার শুধু কাস্টমার টেবিলে একটি `due` কলাম আপডেট করে—যা হিসাববিজ্ঞানের দৃষ্টিতে ত্রুটিপূর্ণ কারণ কোনো অডিট ট্রেইল থাকে না। Dokani একটি খাঁটি ডাবল-এন্ট্রি বুককিপিং লেজার মেনে চলে: প্রতিটি লেনদেনে একটি `journal_entries` রো তৈরি হয় যার মোট ডেবিট ও ক্রেডিট সমান থাকে। কাস্টমার বাকি রাখলে: `Accounts Receivable (Assets)` ডেবিট হয় এবং `Sales Revenue` ক্রেডিট হয়। কাস্টমার পরবর্তীতে বিকাশ বা নগদে বাকি পরিশোধ করলে: `Cash / Bank (Assets)` ডেবিট হয় এবং `Accounts Receivable` ক্রেডিট হয়ে বাকি ব্যালেন্স শূন্যে নেমে আসে। এর ফলে ১ পয়সারও কোনো অডিট অমিল হওয়া অসম্ভব।",
      b: "দোকানি সাধারণ ডিউ কলামের বদলে ডাবল-এন্ট্রি লেজার মেনে চলে। কাস্টমার বাকি রাখলে অ্যাকাউন্টস রিসিভেবল ডেবিট ও সেলস ক্রেডিট হয়। টাকা পরিশোধ করলে ক্যাশ ডেবিট ও রিসিভেবল ক্রেডিট হয়ে নিখুঁত হিসাব সুরক্ষিত থাকে।",
      e: "Dokani enforces double-entry general ledger accounting for credit transactions rather than mutable balance columns. Selling on credit debits Accounts Receivable and credits Sales Revenue. Repayments debit Cash/Bank and credit Accounts Receivable, maintaining an immutable audit trail adhering to GAAP accounting standards.",
      tip: "বলো: 'Dokani enforces double-entry bookkeeping with immutable journal entries for zero ledger discrepancies.'"
    },
    {
      lvl: "lvl3",
      q: "Dokani-তে দৈনিক লক্ষ লক্ষ সেলসের মাঝে ড্যাশবোর্ডের সেলস ও প্রফিট রিপোর্ট কীভাবে সাব-১০ মিলিসেকেন্ডে রেন্ডার হয়?",
      m: "কোটি কোটি রোর ইনভয়েস টেবিলে প্রতিবার ড্যাশবোর্ড খোলার সময় `SUM(total)` চালানো ডেটাবেজকে ক্র্যাশ করাবে। আর্কিটেকচারাল সমাধান: (১) ইনভয়েস টেবিলে কম্পাউন্ড ইনডেক্স: `(tenant_id, branch_id, created_at DESC)`। (২) রিয়েল-টাইম ড্যাশবোর্ডের জন্য 'Daily Summary Rollup' টেবিল রাখা। প্রতিবার কোনো সেলস সম্পন্ন হলে একটি ব্যাকগ্রাউন্ড মাইক্রো-টাস্ক ওই দিনের রোলআপ টেবিলে সেলস ও প্রফিট সংখ্যা আপসর্ট করে দেয়। ড্যাশবোর্ড খোলার সময় সে কোটি ইনভয়েস স্ক্যান না করে মাত্র একটি প্রাক-গণনাকৃত রোলআপ রো পড়ে—ফলে অ্যানালিটিক্স লোড হয় মাত্র ৩ মিলিসেকেন্ডে!",
      b: "রিয়েলটাইম ড্যাশবোর্ডের জন্য কম্পাউন্ড ইনডেক্স এবং প্রি-অ্যাগ্রিগেটেড রোলআপ টেবিল ব্যবহার করা হয়েছে। সেলস হওয়ার সাথে সাথে রোলআপ আপডেট হয়, ফলে ড্যাশবোর্ড খোলার সময় কোটি ডেটা না ঘেঁটে ৩ মিলি-সেকেন্ডে রিপোর্ট লোড হয়।",
      e: "Rendering analytics in sub-10ms across millions of historical transactions avoids runtime table scans via pre-aggregated daily rollup tables. When an invoice commits, a lightweight trigger increments daily sales and profit rollups idempotently, allowing dashboards to query summary rows instantaneously.",
      code: "SELECT gross_sales, total_profit, cash_collected, due_amount\nFROM daily_store_rollups\nWHERE tenant_id = $1 AND branch_id = $2 AND summary_date = CURRENT_DATE;"
    },
    {
      lvl: "lvl3",
      q: "Dokani-তে ব্যাকগ্রাউন্ড জব অর্কেস্ট্রেশন (BullMQ + Redis): ইনভয়েস পিডিএফ জেনারেশন ও SMS অ্যালার্ট কীভাবে এপিআই ল্যাটেন্সি না বাড়িয়ে প্রসেস হয়?",
      m: "ক্যাশিয়ার যখন 'Print & Complete' বাটনে চাপ দেয়, তখন যদি এপিআই একই থ্রেডে পিডিএফ জেনারেট করে এবং এসএমএস গেটওয়ে কল করে, তবে ক্যাশিয়ারকে ৫ সেকেন্ড অপেক্ষা করতে হবে—যা পিওএসে সম্পূর্ণ অগ্রহণযোগ্য! সলিউশন: এপিআই মাত্র ৩ মিলিসেকেন্ডে ডেটাবেজ ট্রানজ্যাকশন শেষ করে ক্লায়েন্টকে রেসপন্স ফিরিয়ে দেয়। একই সাথে সে Redis-backed `BullMQ` কিউতে একটি ইভেন্ট পুশ করে: `{ event: 'INVOICE_FINALIZED', invoiceId }`। ব্যাকগ্রাউন্ডে একটি পৃথক ডেডিকেটেড নোড ওয়ার্কার প্রসেস কিউ থেকে কাজ তুলে নেয়, Puppeteer দিয়ে ব্রাউজারলেস পিডিএফ তৈরি করে এবং এসএমএস এপিআই কল করে। ক্যাশিয়ার বিন্দুমাত্র ল্যাগ অনুভব করে না।",
      b: "পিডিএফ তৈরি ও এসএমএস পাঠানো ব্যাকগ্রাউন্ডে BullMQ কিউ দিয়ে আলাদা ওয়ার্কারে প্রসেস হয়। ফলে ক্যাশিয়ার কোনো বিলম্ব ছাড়া ৩ মিলি-সেকেন্ডে বিলিং শেষ করে পরবর্তী কাস্টমারকে সার্ভিস দিতে পারে।",
      e: "Finalizing a sale offloads slow I/O tasks (Puppeteer thermal receipt rendering and SMS gateway dispatches) to background BullMQ worker queues backed by Redis. The core API completes the database transaction and responds to the cashier in sub-10ms, decoupling compute-heavy tasks.",
      code: "await invoiceQueue.add('GENERATE_AND_DISPATCH', {\n  invoiceId: newInvoice.id,\n  tenantId: ctx.tenantId\n}, { attempts: 3, backoff: { type: 'exponential', delay: 2000 } });"
    },
    {
      lvl: "lvl3",
      q: "Dokani-র ডেটাবেজ মাইগ্রেশন ও স্কিমা এভোলিউশন: হাজার হাজার লাইভ মার্চেন্টের রানিং পিওএস ডাউন না করে জিরো-ডাউনটাইমে প্রিজমা মাইগ্রেশন কীভাবে সম্পন্ন করবে?",
      m: "আমরা 'Expand and Contract' ডেটাবেজ মাইগ্রেশন প্যাটার্ন অনুসরণ করি: (১) কখনোই কোনো কলাম সরাসরি রিনেম বা ড্রপ করা যাবে না। (২) নতুন কলাম যুক্ত করার সময় `DEFAULT` ভ্যালু সহ নাল-অ্যালাউড হিসেবে মাইগ্রেশন তৈরি করি (`prisma migrate deploy`)। (৩) ব্যাকওয়ার্ড-কমপ্যাটিবল কোড ডিপ্লয় করি যা পুরনো ও নতুন উভয় কলাম হ্যান্ডেল করতে পারে। (৪) ব্যাকগ্রাউন্ড ব্যাচ স্ক্রিপ্ট দিয়ে পুরনো ডেটা নতুন কলামে ব্যাকফিল করি। (৫) সবশেষে পরবর্তী রিলিজে পুরনো কলামটি নিরাপদে ড্রপ করি। দিনে শত শত দোকান খোলা থাকা অবস্থায়ও কোনো টেবিল লক বা পিওএস বিঘ্ন ঘটে না।",
      b: "লাইভ শপ ডাউন না করতে Expand and Contract প্যাটার্ন মানা হয়। নতুন কলাম ডিফল্ট ভ্যালু সহ যোগ করে ব্যাকওয়ার্ড কমপ্যাটিবল কোড ডিপ্লয় করা হয় এবং পরে পুরনো কলাম সরানো হয় কোনো টেবিল লক ছাড়া।",
      e: "Zero-downtime database evolution in Dokani follows the Expand and Contract pattern: add backward-compatible nullable columns via Prisma migrate deploy, deploy application code supporting both schema states, backfill historic rows asynchronously, and safely deprecate legacy fields in subsequent releases.",
      tip: "বলো: 'We execute non-blocking zero-downtime Prisma migrations using the Expand and Contract pattern.'"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: ঈদের আগের দিন দোকানে উপচে পড়া ভিড়। ক্যাশিয়ার বারকোড স্ক্যান করছে কিন্তু প্রতিটি স্ক্যানের পর প্রোডাক্ট কার্টে যোগ হতে ৩ সেকেন্ড সময় নিচ্ছে! ক্যাশিয়ার চিৎকার করছে। তুমি কীভাবে তাৎক্ষণিকভাবে ডিবাগ এবং ১ সেকেন্ডের মধ্যে ফিক্স করবে?",
      m: "তদন্ত ও সমাধান: (১) ল্যাপটপের নেটওয়ার্ক প্যানেল দেখে বুঝব সমস্যা কোথায়: দেখা গেল প্রতিটি বারকোড স্ক্যানে ফ্রন্টএন্ড ব্যাকএন্ডে একটি ফুল-টেবিল আন-ইনডেক্সড সার্চ এপিআই কল করছে! (২) তাৎক্ষণিক ফিক্স: ক্যাশিয়ারের ব্রাউজারের মেমোরিতে (React State / Zustand / IndexedDB) দোকানের পুরো প্রোডাক্ট ক্যাটালগ আগেই লোড করা আছে। কোড পরিবর্তন করে প্রতিটি স্ক্যানে নেটওয়ার্ক কল বন্ধ করে সরাসরি লোকাল মেমোরি হ্যাশ ম্যাপে ও(১) লুকআপ (`productsMap[barcode]`) বসিয়ে দেব! সাথে সাথে রেসপন্স টাইম ৩ সেকেন্ড থেকে কমে ০ মিলিসেকেন্ডে (তাত্ক্ষণিক) নেমে আসবে এবং ক্যাশিয়ার সুপারফাস্ট বিলিং চালিয়ে যেতে পারবে।",
      b: "প্রতি স্ক্যানে নেটওয়ার্কে কুয়েরি না পাঠিয়ে ব্রাউজার মেমোরিতে থাকা প্রোডাক্ট হ্যাশ ম্যাপ থেকে O(1) লুকআপ করব। এতে ৩ সেকেন্ডের ল্যাগ শূন্য হয়ে সাথে সাথে কার্টে প্রোডাক্ট যুক্ত হবে।",
      e: "The latency bottleneck stems from triggering remote HTTP queries on every single barcode scan under heavy traffic. Resolve by caching the tenant product catalog locally in a client-side Hash Map (Map<Barcode, Product>) inside Zustand; barcode lookups execute in O(1) in-memory time with 0ms network latency.",
      code: "// Client-side instant barcode resolution:\nconst product = useInventoryStore.getState().barcodeLookupMap.get(scannedBarcode);\nif (product) addToCart(product);"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: দিন শেষে ক্যাশিয়ার হিসাব মেলাতে গিয়ে দেখল তার ক্যাশ বাক্সে ক্যাশ টাকা আছে ১০,০০০ টাকা, কিন্তু Dokani সফটওয়্যার দেখাচ্ছে আজ মোট ক্যাশ সেলস হয়েছে ১২,৫০০ টাকা (২,৫০০ টাকার ঘাটতি)! তুমি কীভাবে অডিট ট্রেইল দিয়ে এই গরমিল উদঘাটন করবে?",
      m: "তদন্তের ধাপ: (১) ওই নির্দিষ্ট ক্যাশিয়ারের আজকের দিনের সমস্ত সেলস ফিল্টার করে `Cash Drawer Audit Log` ওপেন করব। (২) প্রতিটি ইনভয়েসের পেমেন্ট মোড চেক করব: দেখা যেতে পারে ক্যাশিয়ার ২টি ইনভয়েসে (যার মোট বিল ২,৫০০ টাকা) কাস্টমার বিকাশ দিয়ে পে করেছিল, কিন্তু ক্যাশিয়ার ভুলবশত তাড়াহুড়ো করে 'Cash' বাটনে চাপ দিয়ে ইনভয়েস প্রিন্ট করে ফেলেছে! (৩) বিকাশ স্টেটমেন্টের সাথে ট্রানজ্যাকশন আইডি ও টাইমস্ট্যাম্প মিলিয়ে নিশ্চিত হব যে টাকাটি আসলে বিকাশে ঢুকেছে। (৪) ম্যানেজারের অনুমোদন সাপেক্ষে ওই দুটি ইনভয়েসের পেমেন্ট মেথড 'Cash' থেকে 'bKash'-এ সংশোধন করে ক্যাশ ব্যালেন্স পারফেক্টলি রিকনসাইল করব।",
      b: "অডিট লগে প্রতিটি ইনভয়েসের পেমেন্ট মেথড পরীক্ষা করব। প্রায়ই দেখা যায় কাস্টমার বিকাশে পে করলেও ক্যাশিয়ার ভুলে ক্যাশ সিলেক্ট করেছিল। বিকাশ হিস্ট্রির সাথে মিলিয়ে পেমেন্ট মেথড ঠিক করলেই হিসাব মিলে যায়।",
      e: "Triage cash drawer variances by auditing chronological transaction logs: cross-reference invoice payment modalities against digital transaction feeds. Cashiers frequently misclassify digital mobile wallet (bKash/Nagad) receipts as physical Cash under rush hours; reclassifying the payment ledger restores drawer equilibrium.",
      tip: "বলো: 'Cross-auditing invoice payment modes against digital gateway logs rapidly identifies cashier misclassification errors.'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একজন চতুর ক্যাশিয়ার প্রোডাক্ট বিক্রি করে কাস্টমারকে স্লিপ প্রিন্ট করে দিচ্ছে, কিন্তু কাস্টমার চলে যাওয়ার পর সে ইনভয়েসটি ডিলিট করে দিয়ে ক্যাশ টাকা নিজের পকেটে ঢুকিয়ে নিচ্ছে! Dokani আর্কিটেকচারে তুমি কীভাবে এই চুরি সম্পূর্ণ অসম্ভব করেছ?",
      m: "দোকানি পিওএসে ৩ স্তরের ফ্রড প্রিভেনশন মেকানিজম কার্যকর: (১) `Role Restrictions`: ক্যাশিয়ার রোলের জন্য কোনো প্রকার 'Delete' বা 'Edit Invoice' পারমিশন ডেটাবেজ ও এপিআই লেভেলে বন্ধ (`403 Forbidden`)। (২) `Immutable Sequential Invoices`: প্রতিটি ইনভয়েসের একটি কঠোর ক্রমানুসারে ইনভয়েস নম্বর থাকে (`#1001, #1002, #1003`)। কোনো ইনভয়েস ডিলিট করা সম্ভব নয়; যদি নম্বর গ্যাপ থাকে তবে অডিটে সাথে সাথে ধরা পড়ে। (৩) `Void Workflow`: যদি কোনো কাস্টমার সত্যিই পণ্য ফেরত দেয়, তবে ক্যাশিয়ার তা ডিলিট করতে পারে না—তাকে 'Void Request' পাঠাতে হয় যা ওনার বা ম্যানেজারের ওটিপি বা পিন ছাড়া অ্যাপ্রুভ হয় না এবং আলাদা নেগেটিভ ক্রেডিট নোটে অডিট লগ হয়ে থাকে। ফলে কোনো ক্যাশিয়ারের পক্ষে ১ পয়সাও চুরি করা অসম্ভব।",
      b: "ক্যাশিয়ারের ইনভয়েস ডিলিট পারমিশন সম্পূর্ণ বন্ধ রাখা হয়েছে। ইনভয়েস নম্বর ক্রমানুসারে হওয়ায় কোনো গ্যাপ তৈরি করা যায় না এবং পণ্য ফেরত দিতে হলে ম্যানেজারের পিন ভেরিফিকেশন বাধ্যতামূলক।",
      e: "Prevent internal cashier theft via structural controls: Cashiers are strictly barred from DELETE/UPDATE invoice mutations at the database kernel level; invoices follow strictly sequential non-gapped serial numbers; and transaction cancellations mandate manager PIN authorization recorded as distinct credit-note audit logs.",
      tip: "দোকানির এই ফ্রড প্রিভেনশন সিকিউরিটি ইন্টারভিউয়ারের কাছে অত্যন্ত প্রশংসনীয়।"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একজন পাইকারি মার্চেন্টের দোকানে ১ জন কাস্টমার একবারে ৫০০টি বিভিন্ন আইটেমের একটি দানবীয় ইনভয়েস কিনেছে। ইনভয়েস সেভ করার সময় রিকোয়েস্ট টাইমআউট হয়ে গেল এবং অর্ধেক আইটেমের স্টক কমল কিন্তু বাকিগুলোর কমল না! কীভাবে এই বিপর্যয় ফিক্স ও প্রতিরোধ করবে?",
      m: "ভয়াবহ কারণ: কোডে ৫০০টি আইটেম আলাদা আলাদা কুয়েরিতে লুপ চালিয়ে আপডেট করা হয়েছিল কোনো ACID ট্রানজ্যাকশন ছাড়া! ফলে মাঝপথে টাইমআউট হয়ে ডেটাবেজ ইনকনসিস্টেন্ট হয়ে গেছে। ফিক্স: (১) ডাটাবেজ অডিট করে ক্ষতিগ্রস্ত ইনভয়েসের স্টক ম্যানুয়ালি অ্যাডজাস্ট করব। (২) স্থায়ী প্রিভেনশন: সম্পূর্ণ অপারেশনটিকে একটি একক `Prisma Interactive Transaction` ব্লকে নিতে হবে। (৩) ৫০০টি আইটেম একটি একটি করে আপডেট না করে PostgreSQL-এর ব্যাচ আপডেট (`UPDATE ... FROM (VALUES ...)`) ব্যবহার করব—যা ৫০০টি আইটেমকে মাত্র ২০ মিলিসেকেন্ডে একটি একক এসকিউএল কুয়েরিতে অ্যাটমিকালি আপডেট করে। যদি কোনো কারণে ফেইল হয়, পুরো ট্রানজ্যাকশন রোলব্যাক হয়ে ডেটা শতভাগ সুরক্ষিত থাকবে।",
      b: "লুপে আলাদা কুয়েরি না চালিয়ে একটি একক ACID ট্রানজ্যাকশনে ব্যাচ আপডেট চালাতে হবে। কোনো এরর হলে সম্পূর্ণ প্রক্রিয়া রোলব্যাক হবে এবং আংশিক স্টক কাটার কোনো সুযোগ থাকবে না।",
      e: "Mutating 500 line items outside a transaction leads to partial updates upon timeout. Wrap the entire checkout inside an atomic database transaction using batch SQL mutations (UPDATE ... FROM VALUES) to execute the 500 item deductions in a single 20ms round-trip, guaranteeing all-or-nothing atomicity.",
      code: "await prisma.$transaction(async (tx) => {\n  const invoice = await tx.invoice.create({ data: invoiceData });\n  await tx.branchStock.updateMany({ ... }); // Atomic batch mutation\n});"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: নতুন দোকানে Dokani সেটআপ করার সময় মার্চেন্ট এক্সেল ফাইলে তার পূর্বের ২০,০০০ প্রোডাক্টের ক্যাটালগ আপলোড করল। কিন্তু আপলোড স্ক্রিপ্ট মেমোরি আউট হয়ে নোড সার্ভার ক্র্যাশ করাল! কীভাবে মেমোরি-সেফ বাল্ক ক্যাটালগ ইমপোর্টার বানাবে?",
      m: "সমাধানের ধাপ: (১) পুরো ২০,০০০ রোর এক্সেল ফাইল একবারে মেমোরিতে লোড করে `JSON.parse` বা অ্যারে বানানো সম্পূর্ণ নিষিদ্ধ। (২) আমরা Node.js `Streams` এবং `csv-parser` বা এক্সেল স্ট্রিমিং লাইব্রেরি ব্যবহার করব। (৩) ফাইলটি একটি একটি রো করে স্ট্রিম হবে এবং প্রতি ৫০০টি রোর ছোট ছোট চাঙ্ক (Chunk / Batch) তৈরি করবে। (৪) প্রতিটি ব্যাচ `prisma.product.createMany({ data: chunk, skipDuplicates: true })` দিয়ে ডাটাবেজে ইনসার্ট হবে। মেমোরি কনজাম্পশন মাত্র ৩০MB-র মধ্যে সীমাবদ্ধ থাকবে এবং ২০,০০০ প্রোডাক্ট মাত্র ৩ সেকেন্ডের মধ্যে কোনো সার্ভার প্রেশার ছাড়াই নিরাপদে ইমপোর্ট হয়ে যাবে।",
      b: "একবারে পুরো এক্সেল ফাইল মেমোরিতে না এনে Node.js Stream দিয়ে ৫০০টি করে ছোট ছোট ব্যাচে ভাগ করে createMany দিয়ে ইনসার্ট করব। এতে র‍্যাম ক্র্যাশ ছাড়াই ২০,০০০ প্রোডাক্ট দ্রুত ইমপোর্ট হবে।",
      e: "Loading a 20,000-row spreadsheet entirely into memory saturates the Node heap. Stream the spreadsheet file line-by-line via Node.js Streams, batching rows into 500-item chunks for bulk insertion via prisma.product.createMany({ skipDuplicates: true }), keeping process memory flat under 30MB.",
      code: "const stream = fs.createReadStream(filePath).pipe(csv());\nlet batch = [];\nfor await (const row of stream) {\n  batch.push(transformRow(row));\n  if (batch.length === 500) {\n    await prisma.product.createMany({ data: batch, skipDuplicates: true });\n    batch = [];\n  }\n}"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani POS-এর লাইভ প্রোডাকশন আর্কিটেকচার (`https://dokani.bip.sg`) কীভাবে ডিজাইন করা হয়েছে এবং প্রতিদিনের পিক ট্রাফিকে এটি কতটা স্থিতিশীল?",
      m: "দোকানি পিওএস বর্তমানে সফলভাবে প্রোডাকশনে লাইভ (`https://dokani.bip.sg`)। আর্কিটেকচারাল হাইলাইটস: (১) মাল্টি-টেন্যান্ট উবুন্টু VPS ক্লাস্টারে Nginx রিভার্স প্রক্সি ও PM2 ক্লাস্টার মোডে পরিচালিত। (২) ফ্রন্টএন্ডে কি-বোর্ড ফার্স্ট নেক্সট.জেএস পিওএস ইন্টারফেস যা ক্যাশিয়ারকে মাউস ছাড়াই শুধুমাত্র `F2 (Search)`, `F4 (Discount)`, `Enter (Print)` দিয়ে ৩ সেকেন্ডে একটি সম্পূর্ণ চেকআউট সম্পন্ন করতে দেয়। (৩) ব্যাকএন্ডে অপটিমাইজড PostgreSQL ডেটাবেজ যা সাব-৩ms ল্যাটেন্সিতে বারকোড ও স্টক ভ্যালিডেশন করে। (৪) রিয়েলটাইম ড্যাশবোর্ড ও ডাবল-এন্ট্রি লেজার কোটি টাকার লেনদেন নির্ভুলভাবে পরিচালনা করছে। পিক আওয়ারে হাজার হাজার রিকোয়েস্টেও সার্ভার সিপিইউ লোড থাকে মাত্র ১০-১৫% এর মধ্যে।",
      b: "দোকানি লাইভ ক্লাউড প্ল্যাটফর্ম যা কি-বোর্ড ফার্স্ট নেক্সট.জেএস ফ্রন্টএন্ড, নোড ব্যাকএন্ড এবং পোস্টগ্রেস ডেটাবেজে পরিচালিত। মাউস ছাড়া ৩ সেকেন্ডে চেকআউট এবং পিক ট্রাফিকেও ১০% সিপিইউ ব্যবহারে এটি চরম স্থিতিশীল।",
      e: "Dokani POS is a live production SaaS operating at dokani.bip.sg. Built with a keyboard-driven Next.js interface, cashiers finalize checkouts in under 3 seconds using shortcuts (F2/F4/Enter) without touching a mouse. Backed by PostgreSQL and PM2 clustering, the platform maintains sub-3ms lookup latencies with CPU utilization hovering under 15% during peak trading hours.",
      tip: "দোকানির লাইভ ইউআরএল `https://dokani.bip.sg` এবং কী-বোর্ড ফার্স্ট শর্টকাট ডিজাইন ইন্টারভিউতে তোমার প্রজেক্টের শ্রেষ্ঠত্ব ফুটিয়ে তুলবে।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: থার্মাল প্রিন্টার ইন্টিগ্রেশন (ESC/POS 58mm / 80mm): Dokani-তে ব্রাউজার প্রিন্ট ডায়ালগ বাইপাস করে র-সকেটে সাইনলেস রিসিট কীভাবে প্রিন্ট হয়?",
      m: "সাধারণ ব্রাউজারের `window.print()` একটি ভারী প্রিন্ট ডায়ালগ পপআপ করে এবং ইউজারকে 'Print' চাপতে হয় যা পিওএসের গতি মারাত্মক কমিয়ে দেয়। Dokani-তে দুটি মোড রয়েছে: (১) `Web Thermal Print`: কাস্টম CSS দিয়ে অপটিমাইজড 58mm এবং 80mm রিসিট রেন্ডার করা। (২) `Direct ESC/POS Raw Printing`: একটি লাইটওয়েট লোকাল প্রিন্টিং ডেমন (Node/WebSocket বা WebUSB) ব্যবহার করে ব্রাউজার সরাসরি থার্মাল প্রিন্টারের USB/LAN সকেটে বাইনারি ESC/POS হেক্স কমান্ড পাঠায় (`\x1B\x40` ইনিশিয়ালাইজ, `\x1D\x56\x00` পেপার কাট, এবং `\x1B\x70` ক্যাশ ড্রয়ার ওপেন)। ফলে ক্যাশিয়ার এন্টার চাপার সাথে সাথে ১ মিলিসেকেন্ডে সাইনলেস পেপার প্রিন্ট হয়ে ড্রয়ার স্বয়ংক্রিয়ভাবে খুলে যায়!",
      b: "ESC/POS বাইনারি কমান্ডের মাধ্যমে ব্রাউজারের প্রিন্ট ডায়ালগ ছাড়াই সরাসরি থার্মাল প্রিন্টারে পেপার কাট এবং ক্যাশ ড্রয়ার খোলার সিগন্যাল পাঠানো হয়। ফলে ক্যাশিয়ার এন্টার চাপামাত্র মুহূর্তেই রিসিট বের হয়ে আসে।",
      e: "Dokani optimizes thermal receipt printing via direct ESC/POS binary protocols over WebUSB or local WebSockets. Bypassing browser print dialogs entirely, the client dispatches raw escape codes (\x1B\x70 for cash drawer triggers, \x1D\x56 for automatic paper cutting), executing millisecond silent printing.",
      code: "// ESC/POS Binary Commands:\nconst ESC_INIT = '\\x1B\\x40';\nconst DRAWER_KICK = '\\x1B\\x70\\x00\\x19\\xFA'; // Pops open cash drawer\nconst PAPER_CUT = '\\x1D\\x56\\x41\\x00';     // Automatic paper guillotine cut"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: ক্যাশ ড্রয়ার (Cash Drawer) ওপেনিং সিগন্যাল: বিল সম্পন্ন হওয়ার সাথে সাথে ক্যাশ ড্রয়ার কীভাবে স্বয়ংক্রিয়ভাবে খুলে যায়?",
      m: "দোকানের ক্যাশ ড্রয়ারগুলো মূলত থার্মাল রিসিট প্রিন্টারের পেছনের `RJ11/RJ12` পোর্টের মাধ্যমে সংযুক্ত থাকে। যখনই ক্যাশিয়ার একটি ক্যাশ সেলস সফলভাবে সাবমিট করে, আমাদের প্রিন্ট ড্রাইভার রিসিট ডেটার সবার শুরুতে একটি বিশেষ ESC/POS ইলেকট্রিক পালস সিগন্যাল পাঠায় (`ESC p m t1 t2` বা হেক্স `1B 70 00 19 FA`)। এই সিগন্যালটি প্রিন্টারের ভেতর দিয়ে ক্যাশ ড্রয়ারের সোলেনয়েড কয়েলে একটি ১২V/২৪V ইলেকট্রিক পালস ট্রিগার করে—যার ফলে ড্রয়ারটি ঝনঝন করে স্বয়ংক্রিয়ভাবে খুলে যায়। ক্যাশ ছাড়া অন্য কোনো পেমেন্টে (যেমন সম্পূর্ণ বাকি) এই সিগন্যাল ড্রপ করা হয় যাতে ড্রয়ার অনর্থক না খোলে।",
      b: "রিসিট প্রিন্টারের RJ11 পোর্টের মাধ্যমে ESC/POS ইলেকট্রিক পালস কমান্ড পাঠিয়ে ক্যাশ বিক্রির সাথে সাথে ক্যাশ ড্রয়ার স্বয়ংক্রিয়ভাবে পপ-আপ করে খুলে দেওয়া হয়।",
      e: "Cash drawers connect to thermal printers via RJ11/RJ12 kick-out ports. Upon finalizing a cash transaction, Dokani dispatches a solenoid electric pulse command (hex 1B 70 00 19 FA) through the printer, energizing the latch coil to pop open the drawer automatically.",
      tip: "ক্যাশ ড্রয়ারের RJ11 পালস সিগন্যাল ব্যাখ্যা করলে হার্ডওয়্যার-টু-সফটওয়্যার পূর্ণাঙ্গ পিওএস ইঞ্জিনিয়ারিং অভিজ্ঞতা প্রমাণিত হয়।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: বারকোড স্ক্যানার ইনপুট আর্কিটেকচার: ব্রাউজারে বারকোড স্ক্যানারের দ্রুতগতির কী-স্ট্রোক কীভাবে সাধারণ কীবোর্ড ইনপুট থেকে আলাদা করে হ্যান্ডেল করবে?",
      m: "একটি ফিজিক্যাল বারকোড স্ক্যানার আসলে একটি 'Virtual Keyboard (HID Device)'-এর মতো কাজ করে। পার্থক্য হলো: মানুষ টাইপ করলে দুটি অক্ষরের মাঝে ৫০-১৫০ms বিরতি থাকে, কিন্তু বারকোড স্ক্যানার ১২টি ডিজিট মাত্র ২০-৩০ মিলিসেকেন্ডের মধ্যে অবিশ্বাস্য দ্রুতগতিতে টাইপ করে এবং শেষে একটি `Enter` কী পাঠায়! Dokani-তে আমরা একটি গ্লোবাল কী-লিসেনার লিখি যা দুটি অক্ষরের মধ্যকার টাইমিং থ্রেশহোল্ড (<30ms) মেপে স্ক্যানার ইনপুট আলাদা করে। স্ক্রিনের ফোকাস যেকোনো ইনপুট বক্সে থাকুক বা না থাকুক, স্ক্যান হওয়া মাত্রই সিস্টেম সরাসরি প্রোডাক্ট শনাক্ত করে কার্টে যোগ করে দেয় কোনো ইনপুট বক্সে মাউস ক্লিক ছাড়াই!",
      b: "স্ক্যানার ৩০ মিলিসেকেন্ডের চেয়ে দ্রুত টাইপ করে এবং শেষে Enter পাঠায়। টাইমিং থ্রেশহোল্ড মেপে গ্লোবাল লিসেনার দিয়ে স্ক্যানার ইনপুট শনাক্ত করা হয়, ফলে স্ক্রিনের যেকোনো জায়গা থেকে স্ক্যান করলেই প্রোডাক্ট কার্টে যোগ হয়।",
      e: "Barcode scanners emulate HID keyboards emitting keystroke bursts under 30ms inter-character intervals followed by a Carriage Return (Enter). Dokani intercepts global window keydowns, evaluating timing thresholds to distinguish scanner bursts from human typing, routing scans directly to the cart regardless of DOM focus.",
      code: "let buffer = '', lastKeyTime = Date.now();\nwindow.addEventListener('keydown', (e) => {\n  const now = Date.now();\n  if (now - lastKeyTime > 50) buffer = ''; // Human typing -> reset buffer\n  lastKeyTime = now;\n  if (e.key === 'Enter' && buffer.length > 5) {\n    handleBarcodeScan(buffer);\n    buffer = '';\n  } else if (e.key.length === 1) buffer += e.key;\n});"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Dokani POS-এর ব্যবসায়িক ও প্রযুক্তিগত সাফল্য: এই প্রজেক্টটি তোমার ইঞ্জিনিয়ারিং ক্যারিয়ারে কী প্রভাব ফেলেছে?",
      m: "Dokani POS আমার ইঞ্জিনিয়ারিং ক্যারিয়ারের সবচেয়ে পরিণত ও গর্বের সৃষ্টি। এটি শুধুমাত্র একটি ক্রুড প্রজেক্ট নয়—বরং এটি একটি পূর্ণাঙ্গ মাল্টি-টেন্যান্ট ফিনান্সিয়াল SaaS প্ল্যাটফর্ম যেখানে জটিল হিসাববিজ্ঞানের ডাবল-এন্ট্রি লেজার, রো-লেভেল কনকারেন্সি লকিং, অফলাইন IndexedDB আর্কিটেকচার এবং হার্ডওয়্যার থার্মাল প্রিন্টিং সমন্বিত হয়েছে। এটি প্রমাণ করে যে আমি শূন্য থেকে একটি এন্টারপ্রাইজ প্রোডাক্ট ডিজাইন করতে পারি, ডাটাবেজ অপটিমাইজ করে মিলি-সেকেন্ড ল্যাটেন্সি নিশ্চিত করতে পারি এবং প্রোডাকশন ক্লাউডে জিরো-ডাউনটাইমে হাজার হাজার মার্চেন্টের অমূল্য ব্যবসা সফলভাবে পরিচালনা করতে পারি।",
      b: "দোকানি আমার ক্যারিয়ারের সবচেয়ে বড় অর্জন যা প্রমাণ করে যে আমি মাল্টি-টেন্যান্ট SaaS আর্কিটেকচার, জটিল ফিনান্সিয়াল লেজার, কনকারেন্সি লকিং এবং প্রোডাকশন ডেভঅপস ব্যবস্থাপনায় একজন সম্পূর্ণ ও নির্ভরযোগ্য ফুল-স্ট্যাক সফটওয়্যার ইঞ্জিনিয়ার।",
      e: "Dokani POS represents my deepest engineering achievement: designing a production-grade multi-tenant financial SaaS from scratch, mastering high-concurrency database locking, architecting offline-first resilient POS billing, and operating zero-downtime Linux infrastructure powering real merchant livelihoods daily.",
      tip: "এই চূড়ান্ত আত্মবিশ্বাসী বক্তব্য ইন্টারভিউয়ারের মনে তোমার প্রতি গভীর আস্থা তৈরি করবে।"
    }
  ]
};
