// NT Tech Innovation — 05. Dokani Multi-Tenant SaaS Architecture & Deep Dive (100 Questions - 25 per Topic across 5 Levels)
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.dokani = {
  "id": "dokani",
  "title": "Dokani SaaS Project Architecture",
  "badge": "Multi-Tenant POS/ERP SaaS · https://dokani.bip.sg",
  "icon": "🛒",
  "topics": [
    {
      "id": "dokani-architecture-overview",
      "name": "Dokani SaaS Core Architecture & Tenant Isolation",
      "desc": "Multi-tenant SaaS Architecture, Subdomain Routing, Data Isolation, License & Subscription Lifecycle, Role-Based Access Control",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Dokani SaaS কী এবং এটি সাধারণ সিঙ্গেল-শপ পয়েন্ট-অব-সেল (POS) সফটওয়্যারের চেয়ে কীভাবে আলাদা?",
          "m": "Dokani হলো একটি আধুনিক মাল্টি-টেন্যান্ট ক্লাউড-বেসড POS ও ইনভেন্টরি ম্যানেজমেন্ট SaaS প্ল্যাটফর্ম (লাইভ: `https://dokani.bip.sg`)। সাধারণ POS সফটওয়্যার একটি নির্দিষ্ট পিসিতে অফলাইনে ইনস্টল থাকে যা অন্য জায়গা থেকে দেখা যায় না এবং ডেটা ব্যাকআপ থাকে না। Dokani একটি সেন্ট্রালাইজড ক্লাউড আর্কিটেকচারে চলে যেখানে হাজার হাজার খুচরা ও পাইকারি দোকানদার নিজস্ব সাবডোমেন (`store.dokani.bip.sg`) দিয়ে যেকোনো ডিভাইস (ল্যাপটপ, মোবাইল, পিওএস টার্মিনাল) থেকে রিয়েলটাইমে দোকান পরিচালনা করতে পারে, লাইভ সেলস দেখতে পারে এবং স্বয়ংক্রিয় ক্লাউড ব্যাকআপ পায়।",
          "b": "দোকানি হলো একটি মাল্টি-টেন্যান্ট ক্লাউড পিওএস প্ল্যাটফর্ম। সাধারণ সিঙ্গেল পিসি সফটওয়্যারের বিপরীতে দোকানি যেকোনো ডিভাইস থেকে রিয়েলটাইম সেলস মনিটরিং, ক্লাউড ব্যাকআপ এবং একাধিক ব্রাঞ্চ এক জায়গা থেকে পরিচালনার পূর্ণ সুবিধা দেয়।",
          "e": "Dokani is a multi-tenant cloud POS and inventory management SaaS (live at dokani.bip.sg). Unlike legacy single-desktop POS programs trapped on local hardware, Dokani allows thousands of retail and wholesale merchants to manage real-time sales, multi-branch inventories, and customer credit ledgers from any device via dedicated tenant subdomains.",
          "tip": "বলো: 'Dokani is a production multi-tenant POS SaaS powering thousands of merchants with zero-install cloud infrastructure.'"
        },
        {
          "lvl": "lvl1",
          "q": "Dokani-তে Multi-Tenant Data Isolation কীভাবে বজায় রাখা হয় যাতে এক দোকানের ডেটা অন্য দোকান দেখতে না পায়?",
          "m": "দোকানিতে 'Shared Database, Shared Schema with Logical Multi-Tenancy' কার্যকর। প্রতিটি টেবিলে (Products, Invoices, Customers, Ledgers) একটি ইনডেক্সড `tenant_id (UUID)` কলাম রয়েছে। আর্কিটেকচারে ৩ স্তরের কঠোর সিকিউরিটি ফিল্টার কাজ করে: (১) সাবডোমেন ও JWT টোকেন থেকে টেন্যান্ট আইডেন্টিফিকেশন, (২) নোড সার্ভিস লেয়ারে AsyncLocalStorage এবং টাইপ-সেফ Prisma Client এক্সটেনশন যা স্বয়ংক্রিয়ভাবে কুয়েরিতে `{ where: { tenantId } }` ইনজেক্ট করে, এবং (৩) ডেটাবেজ স্তরে PostgreSQL Row-Level Security (RLS) পলিসি। কোনো ডেভেলপার ভুল করলেও এক দোকানের ডেটা অন্য দোকানে যাওয়া গাণিতিকভাবে অসম্ভব।",
          "b": "দোকানিতে প্রতিটি টেবিলে tenant_id কলাম থাকে। JWT টোকেন ভেরিফিকেশন, প্রিজমা ক্লায়েন্ট এক্সটেনশন এবং পোস্টগ্রেস RLS পলিসির মাধ্যমে ডেটাবেজ স্তরে ১০০% টেন্যান্ট আইসোলেশন নিশ্চিত করা হয়েছে।",
          "e": "Dokani enforces logical tenant isolation within a shared PostgreSQL database using indexed tenant_id columns. Queries are constrained via defense-in-depth: JWT claim extraction, AsyncLocalStorage context propagation with Prisma client extensions, and PostgreSQL Row-Level Security (RLS).",
          "code": "// Auto-injected in Dokani repository layer:\nconst products = await prisma.product.findMany({\n  where: { tenantId: ctx.tenantId, isActive: true }\n});"
        },
        {
          "lvl": "lvl1",
          "q": "Dokani-তে ব্যবহারকারীদের রোল-বেসড এক্সেস কন্ট্রোল (RBAC) কীভাবে ভাগ করা হয়েছে?",
          "m": "দোকানিতে ৩টি মূল রোল রয়েছে: (১) `Owner (মালিক)`: সম্পূর্ণ দোকানের পূর্ণ নিয়ন্ত্রণ, সব ব্রাঞ্চের সেলস অ্যানালিটিক্স, লাভ-ক্ষতির খতিয়ান, প্রফিট মার্জিন দেখা, স্টাফদের পারমিশন দেওয়া এবং সাবস্ক্রিপশন প্ল্যান ম্যানেজ করা। (২) `Manager (ম্যানেজার)`: প্রোডাক্ট ক্যাটালগ এডিট করা, স্টক রিসিভ ও পারচেজ অর্ডার দেওয়া, দাম পরিবর্তন করা এবং ক্যাশিয়ারদের সেলস অডিট করা। (৩) `Cashier (ক্যাশিয়ার)`: শুধুমাত্র দ্রুত বিলিং করা, বারকোড স্ক্যান করে বিক্রি করা এবং ইনভয়েস প্রিন্ট করা; ক্যাশিয়াররা প্রোডাক্টের কেনা দাম (Cost Price) বা দোকানের প্রফিট দেখতে পারে না এবং পুরনো সেলস ডিলিট বা এডিট করতে পারে না।",
          "b": "দোকানিতে তিনটি রোল কার্যকর: ওনার (পূর্ণ নিয়ন্ত্রণ ও লাভ-ক্ষতি দেখা), ম্যানেজার (স্টক ও প্রোডাক্ট ক্যাটালগ ম্যানেজমেন্ট), এবং ক্যাশিয়ার (শুধুমাত্র সেলস ও বিলিং; কস্ট প্রাইস দেখা বা সেলস এডিট নিষিদ্ধ)।",
          "e": "Dokani enforces strict three-tier RBAC: Owner (unrestricted visibility into financial profits, ledgers, and branch operations), Manager (inventory stock replenishment and catalog mutations), and Cashier (high-speed checkout billing strictly masked from cost margins and prohibited from mutating sales records).",
          "tip": "ইন্টারভিউতে 'Cashiers can sell but cannot see cost margins or delete historical invoices' পয়েন্টটি বাস্তব অভিজ্ঞতার প্রমাণ।"
        },
        {
          "lvl": "lvl1",
          "q": "Dokani-তে সাবডোমেন রাউটিং (`storename.dokani.bip.sg`) কীভাবে এপিআই ও ফ্রন্টএন্ডে রিজলভ করা হয়?",
          "m": "যখন ব্রাউজার থেকে `aroma.dokani.bip.sg`-এ হিট করা হয়: (১) ক্লাউডফ্লেয়ার ও Nginx ওয়াইল্ডকার্ড ডিএনএস দিয়ে ট্রাফিক প্রক্সি করে। (২) ফ্রন্টএন্ড Next.js মিডলওয়্যার রিকোয়েস্টের `Host` হেডার থেকে সাবডোমেন স্লাগ (`aroma`) বের করে। (৩) ব্যাকএন্ড এপিআই রিকোয়েস্টের হেডারে `x-tenant-slug` পাস করে। (৪) ব্যাকএন্ড ক্যাশ থেকে (Redis) চেক করে `aroma` স্লাগের সক্রিয় টেন্যান্ট আইডিটি বের করে এবং রেসপন্সে দোকানের ব্র্যান্ডিং, লোগো ও থিম কনফিগ পাঠিয়ে দেয়।",
          "b": "হোস্ট হেডার থেকে সাবডোমেন (aroma) এক্সট্র্যাক্ট করে রেডিস ক্যাশ থেকে টেন্যান্ট ভেরিফাই করা হয়। ফলে প্রতিটি দোকান তার নিজস্ব ব্র্যান্ডেড পোর্টালে অটোমেটিক রুট হয়ে যায়।",
          "e": "Dokani parses the HTTP Host header at the reverse proxy and Next.js middleware layers to capture the tenant slug. An in-memory Redis cache maps the slug to the verified tenantId in sub-millisecond time, loading custom shop branding and catalog assets.",
          "code": "// Middleware subdomain resolver:\nconst host = req.headers.get('host') || '';\nconst subdomain = host.split('.')[0]; // Extracts 'aroma'"
        },
        {
          "lvl": "lvl1",
          "q": "Dokani-র টেকনোলজি স্ট্যাক (Tech Stack) কী এবং এই টুলগুলো কেন বেছে নেওয়া হয়েছিল?",
          "m": "দোকানির সম্পূর্ণ আধুনিক প্রোডাকশন স্ট্যাক: (১) `Frontend`: Next.js (App Router), React, TypeScript, Tailwind CSS, Lucide Icons (হাই-স্পিড পিওএস ইন্টারফেস ও কী-বোর্ড শর্টকাট)। (২) `Backend`: Node.js, Express.js, TypeScript, Clean Layered Architecture (হাই-থ্রুপুট এপিআই)। (৩) `Database & ORM`: PostgreSQL (কঠোর ACID ও ফিনান্সিয়াল ট্রানজ্যাকশন) এবং Prisma ORM (টাইপ-সেফ কুয়েরি)। (৪) `Caching & Queue`: Redis (রিয়েলটাইম সেশন ও সাবডোমেন লুকআপ) এবং BullMQ (অ্যাসিনক্রোনাস পিডিএফ ও এসএমএস)। (৫) `DevOps`: Ubuntu VPS, Nginx, PM2 Cluster, Cloudflare, Let's Encrypt SSL।",
          "b": "দোকানির স্ট্যাক: ফ্রন্টএন্ডে Next.js ও TypeScript, ব্যাকএন্ডে Node.js ও Express, ডেটাবেজে PostgreSQL ও Prisma ORM, ক্যাশিংয়ে Redis, এবং ডেভঅপসে উবুন্টু VPS, Nginx ও PM2 ক্লাস্টার।",
          "e": "Dokani tech stack: Next.js and TypeScript on frontend for ultra-fast keyboard-first POS workflows; Node.js/Express with Clean Architecture on backend; PostgreSQL with Prisma ORM for rigorous double-entry ledger transactions; Redis for caching; and Ubuntu VPS with Nginx and PM2 for zero-downtime operations.",
          "tip": "বলো: 'We selected PostgreSQL for ACID transaction integrity in financial ledgers, and Next.js for keyboard-driven checkout velocity.'"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে মার্চেন্ট সাবস্ক্রিপশন ও লাইসেন্স লাইফসাইকেল (Trial, Active, Expired, Suspended) কীভাবে ম্যানেজ করা হয়?",
          "m": "দোকানিতে প্রতিটি টেন্যান্টের একটি `Subscription` স্ট্যাটাস থাকে। (১) নতুন সাইন আপ করলে ১৪ দিনের `TRIAL` পিরিয়ড চালু হয়। (২) পেমেন্ট করলে `ACTIVE` হয় এবং পরবর্তী বিলিং ডেট (`expiresAt`) সেট হয়। (৩) মেয়াদ শেষ হলে ৫ দিনের `GRACE_PERIOD` দেওয়া হয় যেখানে সেলস চালু থাকে কিন্তু ওয়ার্নিং ব্যানার দেখায়। (৪) গ্রেস পিরিয়ড শেষ হলে অ্যাকাউন্ট `LOCKED` বা `SUSPENDED` হয়ে যায়—যেখানে শুধুমাত্র সেলস হিস্ট্রি দেখার অনুমতি থাকে কিন্তু নতুন সেলস বা ইনভেন্টরি এন্ট্রি ব্লক করে দেওয়া হয় এবং পেমেন্ট গেটওয়েতে রিনিউ করতে বলা হয়। সমস্ত চেক মিডলওয়্যারে ক্যাশড মেমোরিতে ভ্যালিডেট হয়।",
          "b": "সাবস্ক্রিপশন লাইফসাইকেলে ১৪ দিনের ট্রায়াল, নিয়মিত অ্যাক্টিভ, ৫ দিনের গ্রেস পিরিয়ড এবং মেয়াদোত্তীর্ণ হলে অ্যাকাউন্ট সাসপেন্ড করা হয়। সাসপেন্ড অবস্থায় শুধু পুরনো রিপোর্ট দেখা যায় কিন্তু নতুন বিক্রি বন্ধ থাকে।",
          "e": "Dokani subscription lifecycle enforces state transitions: TRIAL (14 days) -> ACTIVE -> GRACE_PERIOD (5 days with billing warnings) -> SUSPENDED (write operations blocked, read-only audit preserved until renewal). A cached subscription middleware validates status on every mutating request.",
          "code": "if (tenant.subscriptionStatus === 'SUSPENDED') {\n  throw new ForbiddenException('Subscription expired. Please renew to continue billing.');\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে একাধিক ব্রাঞ্চ বা আউটলেট (Multi-Branch / Multi-Warehouse) কীভাবে ডেটাবেজে সাপোর্ট করে?",
          "m": "একটি টেন্যান্টের (যেমন 'Aarong') একাধিক শোরুম বা গুদাম থাকতে পারে। স্কিমা ডিজাইন: প্রতিটি টেন্যান্টের আন্ডারে একটি `branches` টেবিল থাকে। প্রোডাক্টের মূল ক্যাটালগ (নাম, বারকোড, ক্যাটাগরি) টেন্যান্ট লেভেলে গ্লোবাল থাকে, কিন্তু প্রোডাক্টের স্টক সংরক্ষিত হয় `branch_stocks` টেবিলে যৌথ প্রাইমারি কি দিয়ে: `(branch_id, product_id)`। ক্যাশিয়ার যখন সেলস করে, সে নির্দিষ্ট ব্রাঞ্চ আইডি সহ বিক্রি করে, ফলে শুধু ওই ব্রাঞ্চের স্টক কমে। ওনার ড্যাশবোর্ডে চাইলে প্রতিটি আউটলেটের আলাদা আলাদা সেলস বা সব আউটলেটের সমন্বিত সেলস রিপোর্ট দেখতে পারেন।",
          "b": "প্রোডাক্ট ক্যাটালগ পুরো দোকানের জন্য কমন থাকে কিন্তু branch_stocks টেবিলে প্রতিটি ব্রাঞ্চের আলাদা স্টক সংরক্ষিত থাকে। ফলে বিক্রির সময় শুধু সংশ্লিষ্ট ব্রাঞ্চের স্টক কমে কিন্তু ক্যাটালগ এক জায়গায় ম্যানেজ হয়।",
          "e": "Dokani decouples master product catalogs from physical inventory stock. Products exist at the tenant tier, while inventories reside in a branch_stocks relation keyed by (branch_id, product_id). Cashiers execute sales scoped to their active branch, adjusting inventory locally while aggregating company-wide on owner dashboards.",
          "code": "CREATE TABLE branch_stocks (\n  branch_id UUID REFERENCES branches(id),\n  product_id UUID REFERENCES products(id),\n  stock_quantity NUMERIC(10, 2) NOT NULL DEFAULT 0,\n  PRIMARY KEY (branch_id, product_id)\n);"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে ইন্টারনেট সাময়িক চলে গেলেও ক্যাশিয়ার যাতে বিলিং চালিয়ে যেতে পারে তার জন্য অফলাইন ফলব্যাক আর্কিটেকচার কীভাবে ডিজাইন করা হয়েছে?",
          "m": "দোকানের বাস্তবতায় ইন্টারনেট ড্রপ একটি নিয়মিত ঘটনা। অফলাইন ফলব্যাক ডিজাইন: (১) ফ্রন্টএন্ডে ব্রাউজারের `IndexedDB` ব্যবহার করে প্রোডাক্ট ক্যাটালগ, বারকোড এবং প্রাইস মেমোরিতে ক্যাশ করে রাখা হয়। (২) ইন্টারনেট চলে গেলে পিওএস ইন্টারফেস 'Offline Mode' ব্যানারে শিফট করে। ক্যাশিয়ার বারকোড স্ক্যান করে স্বাভাবিকভাবে বিক্রি করতে পারে এবং প্রিন্টার দিয়ে স্লিপ প্রিন্ট হয়। (৩) অফলাইন ইনভয়েসগুলো লোকাল IndexedDB-তে `PENDING_SYNC` ফ্ল্যাগ সহ জমা থাকে। (৪) ইন্টারনেট ফিরে আসা মাত্রই একটি ব্যাকগ্রাউন্ড সার্ভিস স্বয়ংক্রিয়ভাবে জমে থাকা ইনভয়েসগুলো ব্যাচ আকারে সার্ভারে পুশ করে ডেটাবেজ সিঙ্ক সম্পন্ন করে।",
          "b": "ইন্টারনেট না থাকলেও ব্রাউজারের IndexedDB ক্যাশ ব্যবহার করে ক্যাশিয়ার বিক্রি করতে পারে। ইন্টারনেট আসার সাথে সাথে অফলাইনে হওয়া সমস্ত ইনভয়েস ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে সার্ভারে সিঙ্ক হয়ে যায়।",
          "e": "Dokani handles transient connectivity loss via an IndexedDB offline caching layer. Cashiers scan cached barcodes, print receipts, and persist local sales with a PENDING_SYNC state. When the network reconnects, an automated sync worker replays queued invoices idempotently to the backend.",
          "tip": "বলো: 'IndexedDB caches product catalogs for offline POS billing, auto-syncing queued invoices upon network reconnection.'"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে প্রোডাক্ট ভ্যারিয়েন্ট (Variants: সাইজ, কালার, ব্যাচ) এবং ইউনিট কনভার্সন (যেমন পিস, ডজন, কেজি, কার্টন) কীভাবে হ্যান্ডেল করা হয়?",
          "m": "বাস্তব দোকানে একই সাবান সিঙ্গেল 'পিস' হিসেবেও বিক্রি হয় আবার 'কার্টন' হিসেবেও বিক্রি হয়। স্কিমা আর্কিটেকচার: প্রতিটি প্রোডাক্টের জন্য একটি `Base Unit` থাকে (যেমন 'Piece')। এর পাশাপাশি একটি `unit_conversions` টেবিল থাকে যেখানে কনভার্সন ফ্যাক্টর ডিফাইন থাকে (যেমন `1 Carton = 24 Pieces`)। ক্যাশিয়ার যদি কার্টনে সেল করে, সিস্টেম অটোমেটিক `quantity * 24` গুণ করে মূল ইনভেন্টরি থেকে সঠিক পিস সংখ্যা বিয়োগ করে। আর ভ্যারিয়েন্টের জন্য প্রতিটি ভ্যারিয়েন্টের নিজস্ব বারকোড ও স্টক থাকে, কিন্তু তারা মূল প্যারেন্ট প্রোডাক্টের সাথে যুক্ত থাকে।",
          "b": "প্রোডাক্টের একটি বেস ইউনিট (পিস) থাকে এবং ইউনিট কনভার্সন দিয়ে কার্টন বা ডজনের অনুপাত ঠিক করা হয়। কার্টনে বিক্রি হলেও সিস্টেম স্বয়ংক্রিয়ভাবে পিসে রূপান্তর করে ইনভেন্টরি থেকে স্টক বিয়োগ করে।",
          "e": "Dokani standardizes inventory around Base Units (e.g. Piece, Gram). A unit_conversions relation maps packaging multipliers (1 Box = 50 Pieces). When cashiers sell in bulk units, the POS engine calculates the base multiplier and deducts base stock accurately from physical inventories.",
          "code": "// 1 Box = 12 Pieces:\nconst baseQuantity = soldQuantity * conversionFactor;\nawait decrementStock(productId, baseQuantity);"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে অডিট ট্রেইল (Audit Trail) কীভাবে কাজ করে এবং ক্যাশিয়ারের কোনো জালিয়াতি কীভাবে ধরা পড়ে?",
          "m": "দোকানি পিওএসে কোনো সংবেদনশীল ডেটা ডিলিট করা সম্পূর্ণ নিষিদ্ধ (Soft Delete ও ইমিউটেবল অডিট ট্রেইল মানা হয়)। প্রতিটি বিক্রির ইনভয়েসে ক্যাশিয়ারের আইডি (`created_by`), সঠিক টাইমস্ট্যাম্প, এবং পেমেন্ট মেথড স্থায়ীভাবে রেকর্ড থাকে। যদি কোনো ক্যাশিয়ার কোনো ইনভয়েস ক্যান্সেল বা ডিসকাউন্ট দেয়, তবে একটি `audit_logs` টেবিলে স্বয়ংক্রিয়ভাবে এন্ট্রি পড়ে: কে ডিসকাউন্ট দিল, কত টাকা এবং কোন আইপি/টার্মিনাল থেকে। এছাড়া দিন শেষে 'Cash Drawer Reconciliation'-এ ক্যাশিয়ারের ড্রয়ারের আসল ক্যাশ টাকার সাথে সফটওয়্যারের মোট ক্যাশ সেলস মিলিয়ে কোনো ঘাটতি বা বাড়তি থাকলে তাৎক্ষণিক রিপোর্ট তৈরি হয়।",
          "b": "দোকানিতে সেলস রেকর্ড কখনোই ডিলিট করা যায় না। ডিসকাউন্ট বা ক্যানসেলেশনের তথ্য অডিট লগে স্থায়ীভাবে থাকে এবং দিন শেষে ক্যাশ ড্রয়ার রিকনসিলিয়েশনের মাধ্যমে ক্যাশিয়ারের যেকোনো গরমিল মুহূর্তে ধরা পড়ে।",
          "e": "Dokani enforces immutable append-only audit logging: every invoice records operator IDs, terminals, and timestamps. Discount alterations and transaction voids automatically dispatch immutable audit records. End-of-shift Cash Drawer Reconciliation compares physical cash against digital sales ledgers to flag discrepancies instantly.",
          "tip": "ইন্টারভিউতে 'End-of-shift Cash Drawer Reconciliation' উল্লেখ করা বাস্তব পিওএস ডোমেন জ্ঞানের বড় প্রমাণ।"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani-তে হাই-কনকারেন্সি ফ্ল্যাশ সেলে 'Inventory Over-selling' কীভাবে রো-লেভেল ট্রানজ্যাকশন লক দিয়ে শূন্যে নামানো হয়েছে?",
          "m": "একই দোকানে যখন একাধিক ক্যাশিয়ার একই সাথে সীমিত স্টকের শেষ ৩টি প্রোডাক্ট বিক্রি করার চেষ্টা করে, তখন রেস কন্ডিশনের ঝুঁকি তৈরি হয়। সমাধান: আমরা সেলস চেকআউট ট্রানজ্যাকশনের মধ্যে PostgreSQL রো-লেভেল পেসিমিস্টিক লক ব্যবহার করি: `SELECT stock_quantity FROM branch_stocks WHERE branch_id = $1 AND product_id = $2 FOR UPDATE;`। এই লকটি ট্রানজ্যাকশন শেষ না হওয়া পর্যন্ত অন্য কোনো ক্যাশিয়ারকে ওই রোর স্টক এডিট করতে দেয় না। যদি রিকোয়েস্টেড কোয়ান্টিটি বর্তমান স্টকের চেয়ে বেশি হয়, তবে ট্রানজ্যাকশন তাৎক্ষণিক 'Insufficient Stock' এরর দিয়ে রোলব্যাক করে। ফলে দোকানে কখনোই কোনো নেগেটিভ স্টক বা ওভার-সেলিং ঘটে না।",
          "b": "একাধিক ক্যাশিয়ার একই সময়ে বিক্রি করলে স্টক মাইনাস হওয়া ঠেকাতে SELECT ... FOR UPDATE পেসিমিস্টিক লক ব্যবহার করা হয়েছে। ফলে স্টক শেষ থাকলে সিস্টেম তৎক্ষণাৎ বিক্রি বাতিল করে স্টক ইন্টিগ্রিটি রক্ষা করে।",
          "e": "Under multi-cashier terminal concurrency, Dokani prevents inventory overselling using PostgreSQL pessimistic row-level locks via SELECT FOR UPDATE inside Prisma interactive transactions. The lock serializes inventory evaluations, aborting transactions with 'Insufficient Stock' if stock drops below checkout quantities.",
          "code": "await prisma.$transaction(async (tx) => {\n  const [stock] = await tx.$queryRaw`\n    SELECT stock_quantity FROM branch_stocks \n    WHERE branch_id = ${bId} AND product_id = ${pId} \n    FOR UPDATE;\n  `;\n  if (stock.stock_quantity < qty) throw new Error('Stock exhausted');\n  await tx.$executeRaw`\n    UPDATE branch_stocks SET stock_quantity = stock_quantity - ${qty} \n    WHERE branch_id = ${bId} AND product_id = ${pId};\n  `;\n});"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani-তে কাস্টমার বাকি (Credit Sales) ও সাপ্লায়ার দেনা ম্যানেজমেন্টে 'Double-Entry Accounting Ledger' কীভাবে কাজ করে?",
          "m": "সাধারণ সফটওয়্যার শুধু কাস্টমার টেবিলে একটি `due` কলাম আপডেট করে—যা হিসাববিজ্ঞানের দৃষ্টিতে ত্রুটিপূর্ণ কারণ কোনো অডিট ট্রেইল থাকে না। Dokani একটি খাঁটি ডাবল-এন্ট্রি বুককিপিং লেজার মেনে চলে: প্রতিটি লেনদেনে একটি `journal_entries` রো তৈরি হয় যার মোট ডেবিট ও ক্রেডিট সমান থাকে। কাস্টমার বাকি রাখলে: `Accounts Receivable (Assets)` ডেবিট হয় এবং `Sales Revenue` ক্রেডিট হয়। কাস্টমার পরবর্তীতে বিকাশ বা নগদে বাকি পরিশোধ করলে: `Cash / Bank (Assets)` ডেবিট হয় এবং `Accounts Receivable` ক্রেডিট হয়ে বাকি ব্যালেন্স শূন্যে নেমে আসে। এর ফলে ১ পয়সারও কোনো অডিট অমিল হওয়া অসম্ভব।",
          "b": "দোকানি সাধারণ ডিউ কলামের বদলে ডাবল-এন্ট্রি লেজার মেনে চলে। কাস্টমার বাকি রাখলে অ্যাকাউন্টস রিসিভেবল ডেবিট ও সেলস ক্রেডিট হয়। টাকা পরিশোধ করলে ক্যাশ ডেবিট ও রিসিভেবল ক্রেডিট হয়ে নিখুঁত হিসাব সুরক্ষিত থাকে।",
          "e": "Dokani enforces double-entry general ledger accounting for credit transactions rather than mutable balance columns. Selling on credit debits Accounts Receivable and credits Sales Revenue. Repayments debit Cash/Bank and credit Accounts Receivable, maintaining an immutable audit trail adhering to GAAP accounting standards.",
          "tip": "বলো: 'Dokani enforces double-entry bookkeeping with immutable journal entries for zero ledger discrepancies.'"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani-তে দৈনিক লক্ষ লক্ষ সেলসের মাঝে ড্যাশবোর্ডের সেলস ও প্রফিট রিপোর্ট কীভাবে সাব-১০ মিলিসেকেন্ডে রেন্ডার হয়?",
          "m": "কোটি কোটি রোর ইনভয়েস টেবিলে প্রতিবার ড্যাশবোর্ড খোলার সময় `SUM(total)` চালানো ডেটাবেজকে ক্র্যাশ করাবে। আর্কিটেকচারাল সমাধান: (১) ইনভয়েস টেবিলে কম্পাউন্ড ইনডেক্স: `(tenant_id, branch_id, created_at DESC)`। (২) রিয়েল-টাইম ড্যাশবোর্ডের জন্য 'Daily Summary Rollup' টেবিল রাখা। প্রতিবার কোনো সেলস সম্পন্ন হলে একটি ব্যাকগ্রাউন্ড মাইক্রো-টাস্ক ওই দিনের রোলআপ টেবিলে সেলস ও প্রফিট সংখ্যা আপসর্ট করে দেয়। ড্যাশবোর্ড খোলার সময় সে কোটি ইনভয়েস স্ক্যান না করে মাত্র একটি প্রাক-গণনাকৃত রোলআপ রো পড়ে—ফলে অ্যানালিটিক্স লোড হয় মাত্র ৩ মিলিসেকেন্ডে!",
          "b": "রিয়েলটাইম ড্যাশবোর্ডের জন্য কম্পাউন্ড ইনডেক্স এবং প্রি-অ্যাগ্রিগেটেড রোলআপ টেবিল ব্যবহার করা হয়েছে। সেলস হওয়ার সাথে সাথে রোলআপ আপডেট হয়, ফলে ড্যাশবোর্ড খোলার সময় কোটি ডেটা না ঘেঁটে ৩ মিলি-সেকেন্ডে রিপোর্ট লোড হয়।",
          "e": "Rendering analytics in sub-10ms across millions of historical transactions avoids runtime table scans via pre-aggregated daily rollup tables. When an invoice commits, a lightweight trigger increments daily sales and profit rollups idempotently, allowing dashboards to query summary rows instantaneously.",
          "code": "SELECT gross_sales, total_profit, cash_collected, due_amount\nFROM daily_store_rollups\nWHERE tenant_id = $1 AND branch_id = $2 AND summary_date = CURRENT_DATE;"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani-তে ব্যাকগ্রাউন্ড জব অর্কেস্ট্রেশন (BullMQ + Redis): ইনভয়েস পিডিএফ জেনারেশন ও SMS অ্যালার্ট কীভাবে এপিআই ল্যাটেন্সি না বাড়িয়ে প্রসেস হয়?",
          "m": "ক্যাশিয়ার যখন 'Print & Complete' বাটনে চাপ দেয়, তখন যদি এপিআই একই থ্রেডে পিডিএফ জেনারেট করে এবং এসএমএস গেটওয়ে কল করে, তবে ক্যাশিয়ারকে ৫ সেকেন্ড অপেক্ষা করতে হবে—যা পিওএসে সম্পূর্ণ অগ্রহণযোগ্য! সলিউশন: এপিআই মাত্র ৩ মিলিসেকেন্ডে ডেটাবেজ ট্রানজ্যাকশন শেষ করে ক্লায়েন্টকে রেসপন্স ফিরিয়ে দেয়। একই সাথে সে Redis-backed `BullMQ` কিউতে একটি ইভেন্ট পুশ করে: `{ event: 'INVOICE_FINALIZED', invoiceId }`। ব্যাকগ্রাউন্ডে একটি পৃথক ডেডিকেটেড নোড ওয়ার্কার প্রসেস কিউ থেকে কাজ তুলে নেয়, Puppeteer দিয়ে ব্রাউজারলেস পিডিএফ তৈরি করে এবং এসএমএস এপিআই কল করে। ক্যাশিয়ার বিন্দুমাত্র ল্যাগ অনুভব করে না।",
          "b": "পিডিএফ তৈরি ও এসএমএস পাঠানো ব্যাকগ্রাউন্ডে BullMQ কিউ দিয়ে আলাদা ওয়ার্কারে প্রসেস হয়। ফলে ক্যাশিয়ার কোনো বিলম্ব ছাড়া ৩ মিলি-সেকেন্ডে বিলিং শেষ করে পরবর্তী কাস্টমারকে সার্ভিস দিতে পারে।",
          "e": "Finalizing a sale offloads slow I/O tasks (Puppeteer thermal receipt rendering and SMS gateway dispatches) to background BullMQ worker queues backed by Redis. The core API completes the database transaction and responds to the cashier in sub-10ms, decoupling compute-heavy tasks.",
          "code": "await invoiceQueue.add('GENERATE_AND_DISPATCH', {\n  invoiceId: newInvoice.id,\n  tenantId: ctx.tenantId\n}, { attempts: 3, backoff: { type: 'exponential', delay: 2000 } });"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani-র ডেটাবেজ মাইগ্রেশন ও স্কিমা এভোলিউশন: হাজার হাজার লাইভ মার্চেন্টের রানিং পিওএস ডাউন না করে জিরো-ডাউনটাইমে প্রিজমা মাইগ্রেশন কীভাবে সম্পন্ন করবে?",
          "m": "আমরা 'Expand and Contract' ডেটাবেজ মাইগ্রেশন প্যাটার্ন অনুসরণ করি: (১) কখনোই কোনো কলাম সরাসরি রিনেম বা ড্রপ করা যাবে না। (২) নতুন কলাম যুক্ত করার সময় `DEFAULT` ভ্যালু সহ নাল-অ্যালাউড হিসেবে মাইগ্রেশন তৈরি করি (`prisma migrate deploy`)। (৩) ব্যাকওয়ার্ড-কমপ্যাটিবল কোড ডিপ্লয় করি যা পুরনো ও নতুন উভয় কলাম হ্যান্ডেল করতে পারে। (৪) ব্যাকগ্রাউন্ড ব্যাচ স্ক্রিপ্ট দিয়ে পুরনো ডেটা নতুন কলামে ব্যাকফিল করি। (৫) সবশেষে পরবর্তী রিলিজে পুরনো কলামটি নিরাপদে ড্রপ করি। দিনে শত শত দোকান খোলা থাকা অবস্থায়ও কোনো টেবিল লক বা পিওএস বিঘ্ন ঘটে না।",
          "b": "লাইভ শপ ডাউন না করতে Expand and Contract প্যাটার্ন মানা হয়। নতুন কলাম ডিফল্ট ভ্যালু সহ যোগ করে ব্যাকওয়ার্ড কমপ্যাটিবল কোড ডিপ্লয় করা হয় এবং পরে পুরনো কলাম সরানো হয় কোনো টেবিল লক ছাড়া।",
          "e": "Zero-downtime database evolution in Dokani follows the Expand and Contract pattern: add backward-compatible nullable columns via Prisma migrate deploy, deploy application code supporting both schema states, backfill historic rows asynchronously, and safely deprecate legacy fields in subsequent releases.",
          "tip": "বলো: 'We execute non-blocking zero-downtime Prisma migrations using the Expand and Contract pattern.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ঈদের আগের দিন দোকানে উপচে পড়া ভিড়। ক্যাশিয়ার বারকোড স্ক্যান করছে কিন্তু প্রতিটি স্ক্যানের পর প্রোডাক্ট কার্টে যোগ হতে ৩ সেকেন্ড সময় নিচ্ছে! ক্যাশিয়ার চিৎকার করছে। তুমি কীভাবে তাৎক্ষণিকভাবে ডিবাগ এবং ১ সেকেন্ডের মধ্যে ফিক্স করবে?",
          "m": "তদন্ত ও সমাধান: (১) ল্যাপটপের নেটওয়ার্ক প্যানেল দেখে বুঝব সমস্যা কোথায়: দেখা গেল প্রতিটি বারকোড স্ক্যানে ফ্রন্টএন্ড ব্যাকএন্ডে একটি ফুল-টেবিল আন-ইনডেক্সড সার্চ এপিআই কল করছে! (২) তাৎক্ষণিক ফিক্স: ক্যাশিয়ারের ব্রাউজারের মেমোরিতে (React State / Zustand / IndexedDB) দোকানের পুরো প্রোডাক্ট ক্যাটালগ আগেই লোড করা আছে। কোড পরিবর্তন করে প্রতিটি স্ক্যানে নেটওয়ার্ক কল বন্ধ করে সরাসরি লোকাল মেমোরি হ্যাশ ম্যাপে ও(১) লুকআপ (`productsMap[barcode]`) বসিয়ে দেব! সাথে সাথে রেসপন্স টাইম ৩ সেকেন্ড থেকে কমে ০ মিলিসেকেন্ডে (তাত্ক্ষণিক) নেমে আসবে এবং ক্যাশিয়ার সুপারফাস্ট বিলিং চালিয়ে যেতে পারবে।",
          "b": "প্রতি স্ক্যানে নেটওয়ার্কে কুয়েরি না পাঠিয়ে ব্রাউজার মেমোরিতে থাকা প্রোডাক্ট হ্যাশ ম্যাপ থেকে O(1) লুকআপ করব। এতে ৩ সেকেন্ডের ল্যাগ শূন্য হয়ে সাথে সাথে কার্টে প্রোডাক্ট যুক্ত হবে।",
          "e": "The latency bottleneck stems from triggering remote HTTP queries on every single barcode scan under heavy traffic. Resolve by caching the tenant product catalog locally in a client-side Hash Map (Map<Barcode, Product>) inside Zustand; barcode lookups execute in O(1) in-memory time with 0ms network latency.",
          "code": "// Client-side instant barcode resolution:\nconst product = useInventoryStore.getState().barcodeLookupMap.get(scannedBarcode);\nif (product) addToCart(product);"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: দিন শেষে ক্যাশিয়ার হিসাব মেলাতে গিয়ে দেখল তার ক্যাশ বাক্সে ক্যাশ টাকা আছে ১০,০০০ টাকা, কিন্তু Dokani সফটওয়্যার দেখাচ্ছে আজ মোট ক্যাশ সেলস হয়েছে ১২,৫০০ টাকা (২,৫০০ টাকার ঘাটতি)! তুমি কীভাবে অডিট ট্রেইল দিয়ে এই গরমিল উদঘাটন করবে?",
          "m": "তদন্তের ধাপ: (১) ওই নির্দিষ্ট ক্যাশিয়ারের আজকের দিনের সমস্ত সেলস ফিল্টার করে `Cash Drawer Audit Log` ওপেন করব। (২) প্রতিটি ইনভয়েসের পেমেন্ট মোড চেক করব: দেখা যেতে পারে ক্যাশিয়ার ২টি ইনভয়েসে (যার মোট বিল ২,৫০০ টাকা) কাস্টমার বিকাশ দিয়ে পে করেছিল, কিন্তু ক্যাশিয়ার ভুলবশত তাড়াহুড়ো করে 'Cash' বাটনে চাপ দিয়ে ইনভয়েস প্রিন্ট করে ফেলেছে! (৩) বিকাশ স্টেটমেন্টের সাথে ট্রানজ্যাকশন আইডি ও টাইমস্ট্যাম্প মিলিয়ে নিশ্চিত হব যে টাকাটি আসলে বিকাশে ঢুকেছে। (৪) ম্যানেজারের অনুমোদন সাপেক্ষে ওই দুটি ইনভয়েসের পেমেন্ট মেথড 'Cash' থেকে 'bKash'-এ সংশোধন করে ক্যাশ ব্যালেন্স পারফেক্টলি রিকনসাইল করব।",
          "b": "অডিট লগে প্রতিটি ইনভয়েসের পেমেন্ট মেথড পরীক্ষা করব। প্রায়ই দেখা যায় কাস্টমার বিকাশে পে করলেও ক্যাশিয়ার ভুলে ক্যাশ সিলেক্ট করেছিল। বিকাশ হিস্ট্রির সাথে মিলিয়ে পেমেন্ট মেথড ঠিক করলেই হিসাব মিলে যায়।",
          "e": "Triage cash drawer variances by auditing chronological transaction logs: cross-reference invoice payment modalities against digital transaction feeds. Cashiers frequently misclassify digital mobile wallet (bKash/Nagad) receipts as physical Cash under rush hours; reclassifying the payment ledger restores drawer equilibrium.",
          "tip": "বলো: 'Cross-auditing invoice payment modes against digital gateway logs rapidly identifies cashier misclassification errors.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একজন চতুর ক্যাশিয়ার প্রোডাক্ট বিক্রি করে কাস্টমারকে স্লিপ প্রিন্ট করে দিচ্ছে, কিন্তু কাস্টমার চলে যাওয়ার পর সে ইনভয়েসটি ডিলিট করে দিয়ে ক্যাশ টাকা নিজের পকেটে ঢুকিয়ে নিচ্ছে! Dokani আর্কিটেকচারে তুমি কীভাবে এই চুরি সম্পূর্ণ অসম্ভব করেছ?",
          "m": "দোকানি পিওএসে ৩ স্তরের ফ্রড প্রিভেনশন মেকানিজম কার্যকর: (১) `Role Restrictions`: ক্যাশিয়ার রোলের জন্য কোনো প্রকার 'Delete' বা 'Edit Invoice' পারমিশন ডেটাবেজ ও এপিআই লেভেলে বন্ধ (`403 Forbidden`)। (২) `Immutable Sequential Invoices`: প্রতিটি ইনভয়েসের একটি কঠোর ক্রমানুসারে ইনভয়েস নম্বর থাকে (`#1001, #1002, #1003`)। কোনো ইনভয়েস ডিলিট করা সম্ভব নয়; যদি নম্বর গ্যাপ থাকে তবে অডিটে সাথে সাথে ধরা পড়ে। (৩) `Void Workflow`: যদি কোনো কাস্টমার সত্যিই পণ্য ফেরত দেয়, তবে ক্যাশিয়ার তা ডিলিট করতে পারে না—তাকে 'Void Request' পাঠাতে হয় যা ওনার বা ম্যানেজারের ওটিপি বা পিন ছাড়া অ্যাপ্রুভ হয় না এবং আলাদা নেগেটিভ ক্রেডিট নোটে অডিট লগ হয়ে থাকে। ফলে কোনো ক্যাশিয়ারের পক্ষে ১ পয়সাও চুরি করা অসম্ভব।",
          "b": "ক্যাশিয়ারের ইনভয়েস ডিলিট পারমিশন সম্পূর্ণ বন্ধ রাখা হয়েছে। ইনভয়েস নম্বর ক্রমানুসারে হওয়ায় কোনো গ্যাপ তৈরি করা যায় না এবং পণ্য ফেরত দিতে হলে ম্যানেজারের পিন ভেরিফিকেশন বাধ্যতামূলক।",
          "e": "Prevent internal cashier theft via structural controls: Cashiers are strictly barred from DELETE/UPDATE invoice mutations at the database kernel level; invoices follow strictly sequential non-gapped serial numbers; and transaction cancellations mandate manager PIN authorization recorded as distinct credit-note audit logs.",
          "tip": "দোকানির এই ফ্রড প্রিভেনশন সিকিউরিটি ইন্টারভিউয়ারের কাছে অত্যন্ত প্রশংসনীয়।"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একজন পাইকারি মার্চেন্টের দোকানে ১ জন কাস্টমার একবারে ৫০০টি বিভিন্ন আইটেমের একটি দানবীয় ইনভয়েস কিনেছে। ইনভয়েস সেভ করার সময় রিকোয়েস্ট টাইমআউট হয়ে গেল এবং অর্ধেক আইটেমের স্টক কমল কিন্তু বাকিগুলোর কমল না! কীভাবে এই বিপর্যয় ফিক্স ও প্রতিরোধ করবে?",
          "m": "ভয়াবহ কারণ: কোডে ৫০০টি আইটেম আলাদা আলাদা কুয়েরিতে লুপ চালিয়ে আপডেট করা হয়েছিল কোনো ACID ট্রানজ্যাকশন ছাড়া! ফলে মাঝপথে টাইমআউট হয়ে ডেটাবেজ ইনকনসিস্টেন্ট হয়ে গেছে। ফিক্স: (১) ডাটাবেজ অডিট করে ক্ষতিগ্রস্ত ইনভয়েসের স্টক ম্যানুয়ালি অ্যাডজাস্ট করব। (২) স্থায়ী প্রিভেনশন: সম্পূর্ণ অপারেশনটিকে একটি একক `Prisma Interactive Transaction` ব্লকে নিতে হবে। (৩) ৫০০টি আইটেম একটি একটি করে আপডেট না করে PostgreSQL-এর ব্যাচ আপডেট (`UPDATE ... FROM (VALUES ...)`) ব্যবহার করব—যা ৫০০টি আইটেমকে মাত্র ২০ মিলিসেকেন্ডে একটি একক এসকিউএল কুয়েরিতে অ্যাটমিকালি আপডেট করে। যদি কোনো কারণে ফেইল হয়, পুরো ট্রানজ্যাকশন রোলব্যাক হয়ে ডেটা শতভাগ সুরক্ষিত থাকবে।",
          "b": "লুপে আলাদা কুয়েরি না চালিয়ে একটি একক ACID ট্রানজ্যাকশনে ব্যাচ আপডেট চালাতে হবে। কোনো এরর হলে সম্পূর্ণ প্রক্রিয়া রোলব্যাক হবে এবং আংশিক স্টক কাটার কোনো সুযোগ থাকবে না।",
          "e": "Mutating 500 line items outside a transaction leads to partial updates upon timeout. Wrap the entire checkout inside an atomic database transaction using batch SQL mutations (UPDATE ... FROM VALUES) to execute the 500 item deductions in a single 20ms round-trip, guaranteeing all-or-nothing atomicity.",
          "code": "await prisma.$transaction(async (tx) => {\n  const invoice = await tx.invoice.create({ data: invoiceData });\n  await tx.branchStock.updateMany({ ... }); // Atomic batch mutation\n});"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: নতুন দোকানে Dokani সেটআপ করার সময় মার্চেন্ট এক্সেল ফাইলে তার পূর্বের ২০,০০০ প্রোডাক্টের ক্যাটালগ আপলোড করল। কিন্তু আপলোড স্ক্রিপ্ট মেমোরি আউট হয়ে নোড সার্ভার ক্র্যাশ করাল! কীভাবে মেমোরি-সেফ বাল্ক ক্যাটালগ ইমপোর্টার বানাবে?",
          "m": "সমাধানের ধাপ: (১) পুরো ২০,০০০ রোর এক্সেল ফাইল একবারে মেমোরিতে লোড করে `JSON.parse` বা অ্যারে বানানো সম্পূর্ণ নিষিদ্ধ। (২) আমরা Node.js `Streams` এবং `csv-parser` বা এক্সেল স্ট্রিমিং লাইব্রেরি ব্যবহার করব। (৩) ফাইলটি একটি একটি রো করে স্ট্রিম হবে এবং প্রতি ৫০০টি রোর ছোট ছোট চাঙ্ক (Chunk / Batch) তৈরি করবে। (৪) প্রতিটি ব্যাচ `prisma.product.createMany({ data: chunk, skipDuplicates: true })` দিয়ে ডাটাবেজে ইনসার্ট হবে। মেমোরি কনজাম্পশন মাত্র ৩০MB-র মধ্যে সীমাবদ্ধ থাকবে এবং ২০,০০০ প্রোডাক্ট মাত্র ৩ সেকেন্ডের মধ্যে কোনো সার্ভার প্রেশার ছাড়াই নিরাপদে ইমপোর্ট হয়ে যাবে।",
          "b": "একবারে পুরো এক্সেল ফাইল মেমোরিতে না এনে Node.js Stream দিয়ে ৫০০টি করে ছোট ছোট ব্যাচে ভাগ করে createMany দিয়ে ইনসার্ট করব। এতে র‍্যাম ক্র্যাশ ছাড়াই ২০,০০০ প্রোডাক্ট দ্রুত ইমপোর্ট হবে।",
          "e": "Loading a 20,000-row spreadsheet entirely into memory saturates the Node heap. Stream the spreadsheet file line-by-line via Node.js Streams, batching rows into 500-item chunks for bulk insertion via prisma.product.createMany({ skipDuplicates: true }), keeping process memory flat under 30MB.",
          "code": "const stream = fs.createReadStream(filePath).pipe(csv());\nlet batch = [];\nfor await (const row of stream) {\n  batch.push(transformRow(row));\n  if (batch.length === 500) {\n    await prisma.product.createMany({ data: batch, skipDuplicates: true });\n    batch = [];\n  }\n}"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani POS-এর লাইভ প্রোডাকশন আর্কিটেকচার (`https://dokani.bip.sg`) কীভাবে ডিজাইন করা হয়েছে এবং প্রতিদিনের পিক ট্রাফিকে এটি কতটা স্থিতিশীল?",
          "m": "দোকানি পিওএস বর্তমানে সফলভাবে প্রোডাকশনে লাইভ (`https://dokani.bip.sg`)। আর্কিটেকচারাল হাইলাইটস: (১) মাল্টি-টেন্যান্ট উবুন্টু VPS ক্লাস্টারে Nginx রিভার্স প্রক্সি ও PM2 ক্লাস্টার মোডে পরিচালিত। (২) ফ্রন্টএন্ডে কি-বোর্ড ফার্স্ট নেক্সট.জেএস পিওএস ইন্টারফেস যা ক্যাশিয়ারকে মাউস ছাড়াই শুধুমাত্র `F2 (Search)`, `F4 (Discount)`, `Enter (Print)` দিয়ে ৩ সেকেন্ডে একটি সম্পূর্ণ চেকআউট সম্পন্ন করতে দেয়। (৩) ব্যাকএন্ডে অপটিমাইজড PostgreSQL ডেটাবেজ যা সাব-৩ms ল্যাটেন্সিতে বারকোড ও স্টক ভ্যালিডেশন করে। (৪) রিয়েলটাইম ড্যাশবোর্ড ও ডাবল-এন্ট্রি লেজার কোটি টাকার লেনদেন নির্ভুলভাবে পরিচালনা করছে। পিক আওয়ারে হাজার হাজার রিকোয়েস্টেও সার্ভার সিপিইউ লোড থাকে মাত্র ১০-১৫% এর মধ্যে।",
          "b": "দোকানি লাইভ ক্লাউড প্ল্যাটফর্ম যা কি-বোর্ড ফার্স্ট নেক্সট.জেএস ফ্রন্টএন্ড, নোড ব্যাকএন্ড এবং পোস্টগ্রেস ডেটাবেজে পরিচালিত। মাউস ছাড়া ৩ সেকেন্ডে চেকআউট এবং পিক ট্রাফিকেও ১০% সিপিইউ ব্যবহারে এটি চরম স্থিতিশীল।",
          "e": "Dokani POS is a live production SaaS operating at dokani.bip.sg. Built with a keyboard-driven Next.js interface, cashiers finalize checkouts in under 3 seconds using shortcuts (F2/F4/Enter) without touching a mouse. Backed by PostgreSQL and PM2 clustering, the platform maintains sub-3ms lookup latencies with CPU utilization hovering under 15% during peak trading hours.",
          "tip": "দোকানির লাইভ ইউআরএল `https://dokani.bip.sg` এবং কী-বোর্ড ফার্স্ট শর্টকাট ডিজাইন ইন্টারভিউতে তোমার প্রজেক্টের শ্রেষ্ঠত্ব ফুটিয়ে তুলবে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: থার্মাল প্রিন্টার ইন্টিগ্রেশন (ESC/POS 58mm / 80mm): Dokani-তে ব্রাউজার প্রিন্ট ডায়ালগ বাইপাস করে র-সকেটে সাইনলেস রিসিট কীভাবে প্রিন্ট হয়?",
          "m": "সাধারণ ব্রাউজারের `window.print()` একটি ভারী প্রিন্ট ডায়ালগ পপআপ করে এবং ইউজারকে 'Print' চাপতে হয় যা পিওএসের গতি মারাত্মক কমিয়ে দেয়। Dokani-তে দুটি মোড রয়েছে: (১) `Web Thermal Print`: কাস্টম CSS দিয়ে অপটিমাইজড 58mm এবং 80mm রিসিট রেন্ডার করা। (২) `Direct ESC/POS Raw Printing`: একটি লাইটওয়েট লোকাল প্রিন্টিং ডেমন (Node/WebSocket বা WebUSB) ব্যবহার করে ব্রাউজার সরাসরি থার্মাল প্রিন্টারের USB/LAN সকেটে বাইনারি ESC/POS হেক্স কমান্ড পাঠায় (`\u001b@` ইনিশিয়ালাইজ, `\u001dV\u0000` পেপার কাট, এবং `\u001bp` ক্যাশ ড্রয়ার ওপেন)। ফলে ক্যাশিয়ার এন্টার চাপার সাথে সাথে ১ মিলিসেকেন্ডে সাইনলেস পেপার প্রিন্ট হয়ে ড্রয়ার স্বয়ংক্রিয়ভাবে খুলে যায়!",
          "b": "ESC/POS বাইনারি কমান্ডের মাধ্যমে ব্রাউজারের প্রিন্ট ডায়ালগ ছাড়াই সরাসরি থার্মাল প্রিন্টারে পেপার কাট এবং ক্যাশ ড্রয়ার খোলার সিগন্যাল পাঠানো হয়। ফলে ক্যাশিয়ার এন্টার চাপামাত্র মুহূর্তেই রিসিট বের হয়ে আসে।",
          "e": "Dokani optimizes thermal receipt printing via direct ESC/POS binary protocols over WebUSB or local WebSockets. Bypassing browser print dialogs entirely, the client dispatches raw escape codes (\u001bp for cash drawer triggers, \u001dV for automatic paper cutting), executing millisecond silent printing.",
          "code": "// ESC/POS Binary Commands:\nconst ESC_INIT = '\\x1B\\x40';\nconst DRAWER_KICK = '\\x1B\\x70\\x00\\x19\\xFA'; // Pops open cash drawer\nconst PAPER_CUT = '\\x1D\\x56\\x41\\x00';     // Automatic paper guillotine cut"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: ক্যাশ ড্রয়ার (Cash Drawer) ওপেনিং সিগন্যাল: বিল সম্পন্ন হওয়ার সাথে সাথে ক্যাশ ড্রয়ার কীভাবে স্বয়ংক্রিয়ভাবে খুলে যায়?",
          "m": "দোকানের ক্যাশ ড্রয়ারগুলো মূলত থার্মাল রিসিট প্রিন্টারের পেছনের `RJ11/RJ12` পোর্টের মাধ্যমে সংযুক্ত থাকে। যখনই ক্যাশিয়ার একটি ক্যাশ সেলস সফলভাবে সাবমিট করে, আমাদের প্রিন্ট ড্রাইভার রিসিট ডেটার সবার শুরুতে একটি বিশেষ ESC/POS ইলেকট্রিক পালস সিগন্যাল পাঠায় (`ESC p m t1 t2` বা হেক্স `1B 70 00 19 FA`)। এই সিগন্যালটি প্রিন্টারের ভেতর দিয়ে ক্যাশ ড্রয়ারের সোলেনয়েড কয়েলে একটি ১২V/২৪V ইলেকট্রিক পালস ট্রিগার করে—যার ফলে ড্রয়ারটি ঝনঝন করে স্বয়ংক্রিয়ভাবে খুলে যায়। ক্যাশ ছাড়া অন্য কোনো পেমেন্টে (যেমন সম্পূর্ণ বাকি) এই সিগন্যাল ড্রপ করা হয় যাতে ড্রয়ার অনর্থক না খোলে।",
          "b": "রিসিট প্রিন্টারের RJ11 পোর্টের মাধ্যমে ESC/POS ইলেকট্রিক পালস কমান্ড পাঠিয়ে ক্যাশ বিক্রির সাথে সাথে ক্যাশ ড্রয়ার স্বয়ংক্রিয়ভাবে পপ-আপ করে খুলে দেওয়া হয়।",
          "e": "Cash drawers connect to thermal printers via RJ11/RJ12 kick-out ports. Upon finalizing a cash transaction, Dokani dispatches a solenoid electric pulse command (hex 1B 70 00 19 FA) through the printer, energizing the latch coil to pop open the drawer automatically.",
          "tip": "ক্যাশ ড্রয়ারের RJ11 পালস সিগন্যাল ব্যাখ্যা করলে হার্ডওয়্যার-টু-সফটওয়্যার পূর্ণাঙ্গ পিওএস ইঞ্জিনিয়ারিং অভিজ্ঞতা প্রমাণিত হয়।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: বারকোড স্ক্যানার ইনপুট আর্কিটেকচার: ব্রাউজারে বারকোড স্ক্যানারের দ্রুতগতির কী-স্ট্রোক কীভাবে সাধারণ কীবোর্ড ইনপুট থেকে আলাদা করে হ্যান্ডেল করবে?",
          "m": "একটি ফিজিক্যাল বারকোড স্ক্যানার আসলে একটি 'Virtual Keyboard (HID Device)'-এর মতো কাজ করে। পার্থক্য হলো: মানুষ টাইপ করলে দুটি অক্ষরের মাঝে ৫০-১৫০ms বিরতি থাকে, কিন্তু বারকোড স্ক্যানার ১২টি ডিজিট মাত্র ২০-৩০ মিলিসেকেন্ডের মধ্যে অবিশ্বাস্য দ্রুতগতিতে টাইপ করে এবং শেষে একটি `Enter` কী পাঠায়! Dokani-তে আমরা একটি গ্লোবাল কী-লিসেনার লিখি যা দুটি অক্ষরের মধ্যকার টাইমিং থ্রেশহোল্ড (<30ms) মেপে স্ক্যানার ইনপুট আলাদা করে। স্ক্রিনের ফোকাস যেকোনো ইনপুট বক্সে থাকুক বা না থাকুক, স্ক্যান হওয়া মাত্রই সিস্টেম সরাসরি প্রোডাক্ট শনাক্ত করে কার্টে যোগ করে দেয় কোনো ইনপুট বক্সে মাউস ক্লিক ছাড়াই!",
          "b": "স্ক্যানার ৩০ মিলিসেকেন্ডের চেয়ে দ্রুত টাইপ করে এবং শেষে Enter পাঠায়। টাইমিং থ্রেশহোল্ড মেপে গ্লোবাল লিসেনার দিয়ে স্ক্যানার ইনপুট শনাক্ত করা হয়, ফলে স্ক্রিনের যেকোনো জায়গা থেকে স্ক্যান করলেই প্রোডাক্ট কার্টে যোগ হয়।",
          "e": "Barcode scanners emulate HID keyboards emitting keystroke bursts under 30ms inter-character intervals followed by a Carriage Return (Enter). Dokani intercepts global window keydowns, evaluating timing thresholds to distinguish scanner bursts from human typing, routing scans directly to the cart regardless of DOM focus.",
          "code": "let buffer = '', lastKeyTime = Date.now();\nwindow.addEventListener('keydown', (e) => {\n  const now = Date.now();\n  if (now - lastKeyTime > 50) buffer = ''; // Human typing -> reset buffer\n  lastKeyTime = now;\n  if (e.key === 'Enter' && buffer.length > 5) {\n    handleBarcodeScan(buffer);\n    buffer = '';\n  } else if (e.key.length === 1) buffer += e.key;\n});"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Dokani POS-এর ব্যবসায়িক ও প্রযুক্তিগত সাফল্য: এই প্রজেক্টটি তোমার ইঞ্জিনিয়ারিং ক্যারিয়ারে কী প্রভাব ফেলেছে?",
          "m": "Dokani POS আমার ইঞ্জিনিয়ারিং ক্যারিয়ারের সবচেয়ে পরিণত ও গর্বের সৃষ্টি। এটি শুধুমাত্র একটি ক্রুড প্রজেক্ট নয়—বরং এটি একটি পূর্ণাঙ্গ মাল্টি-টেন্যান্ট ফিনান্সিয়াল SaaS প্ল্যাটফর্ম যেখানে জটিল হিসাববিজ্ঞানের ডাবল-এন্ট্রি লেজার, রো-লেভেল কনকারেন্সি লকিং, অফলাইন IndexedDB আর্কিটেকচার এবং হার্ডওয়্যার থার্মাল প্রিন্টিং সমন্বিত হয়েছে। এটি প্রমাণ করে যে আমি শূন্য থেকে একটি এন্টারপ্রাইজ প্রোডাক্ট ডিজাইন করতে পারি, ডাটাবেজ অপটিমাইজ করে মিলি-সেকেন্ড ল্যাটেন্সি নিশ্চিত করতে পারি এবং প্রোডাকশন ক্লাউডে জিরো-ডাউনটাইমে হাজার হাজার মার্চেন্টের অমূল্য ব্যবসা সফলভাবে পরিচালনা করতে পারি।",
          "b": "দোকানি আমার ক্যারিয়ারের সবচেয়ে বড় অর্জন যা প্রমাণ করে যে আমি মাল্টি-টেন্যান্ট SaaS আর্কিটেকচার, জটিল ফিনান্সিয়াল লেজার, কনকারেন্সি লকিং এবং প্রোডাকশন ডেভঅপস ব্যবস্থাপনায় একজন সম্পূর্ণ ও নির্ভরযোগ্য ফুল-স্ট্যাক সফটওয়্যার ইঞ্জিনিয়ার।",
          "e": "Dokani POS represents my deepest engineering achievement: designing a production-grade multi-tenant financial SaaS from scratch, mastering high-concurrency database locking, architecting offline-first resilient POS billing, and operating zero-downtime Linux infrastructure powering real merchant livelihoods daily.",
          "tip": "এই চূড়ান্ত আত্মবিশ্বাসী বক্তব্য ইন্টারভিউয়ারের মনে তোমার প্রতি গভীর আস্থা তৈরি করবে।"
        }
      ]
    },
    {
      "id": "dokani-pos-fast-billing",
      "name": "High-Speed POS Billing, Barcode & Thermal Printing",
      "desc": "Keyboard-First UI, Sub-3ms Barcode Scanners, Multi-Tender Split Payments, Hold Cart / Park Sale, ESC/POS Silent Printing, Cash Drawer Kicks",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Dokani POS-এ 'Keyboard-First Navigation' কেন ক্যাশিয়ারদের বিলিং গতি ৩ গুণ বাড়িয়ে দেয়?",
          "m": "খুচরা দোকানে পিক আওয়ারে ক্যাশিয়ারের এক সেকেন্ড সময় অপচয় মানেই পেছনে কাস্টমারদের বিশাল লাইন! মাউস ধরে বাটনে ক্লিক করা অত্যন্ত ধীরগতির। Dokani POS সম্পূর্ণ কীবোর্ড-ফার্স্ট আর্কিটেকচারে তৈরি: (১) `F2`: সরাসরি প্রোডাক্ট সার্চ বা বারকোড স্ক্যানার মোড, (২) `F4`: কাস্টমার সিলেক্ট বা মোবাইল নম্বর সার্চ, (৩) `F7`: ডিসকাউন্ট ডায়ালগ, (৪) `F9`: পেমেন্ট মোডাল ওপেন, (৫) `Enter`: বিল কনফার্ম ও ইনস্ট্যান্ট প্রিন্ট। ক্যাশিয়ারকে একবারও মাউস স্পর্শ করতে হয় না; উভয় হাত কীবোর্ড ও বারকোড স্ক্যানারে রেখে মাত্র ৩ সেকেন্ডে একটি সম্পূর্ণ কাস্টমার চেকআউট শেষ করা যায়।",
          "b": "মাউস ব্যবহারের বদলে সম্পূর্ণ কীবোর্ড শর্টকাট (F2, F4, F9, Enter) দিয়ে কাজ করায় ক্যাশিয়ারের বিলিং গতি ৩ গুণ বাড়ে। ক্যাশিয়ার মাউস ছাড়াই ৩ সেকেন্ডে সম্পূর্ণ বিক্রি ও রিসিট প্রিন্ট সম্পন্ন করতে পারে।",
          "e": "In high-volume retail rush hours, mouse manipulation creates physical bottlenecks. Dokani POS enforces a keyboard-first navigation paradigm: dedicated hotkeys (F2 Search, F4 Customer, F9 Tender, Enter Finalize) allow cashiers to complete checkouts in under 3 seconds without lifting hands from physical input hardware.",
          "tip": "বলো: 'Dokani enforces keyboard-first POS shortcuts so cashiers never need a mouse during peak trading.'"
        },
        {
          "lvl": "lvl1",
          "q": "বারকোড স্ক্যানার হার্ডওয়্যার কীভাবে ব্রাউজারের সাথে যোগাযোগ করে এবং Dokani কীভাবে এটি রিড করে?",
          "m": "ফিজিক্যাল ইউএসবি বা ব্লুটুথ বারকোড স্ক্যানারগুলো অপারেটিং সিস্টেমে 'Human Interface Device (HID) Keyboard' হিসেবে রেজিস্টার হয়। স্ক্যানার দিয়ে বারকোড স্ক্যান করলে সে কম্পিউটারে অতি দ্রুত কি-স্ট্রোক আকারে ডিজিটগুলো টাইপ করে এবং শেষে একটি `Enter (ASCII 13)` কী পাঠায়। Dokani-তে একটি গ্লোবাল কী-লিসেনার থাকে যা অক্ষরের ইনপুট রেট পর্যবেক্ষণ করে (দুটি অক্ষরের মাঝে <30ms সময়) স্ক্যানার শনাক্ত করে। স্ক্যান হওয়ার সাথে সাথে এটি স্বয়ংক্রিয়ভাবে কার্টে প্রোডাক্ট যোগ করে কোয়ান্টিটি ১ বাড়িয়ে দেয়—ইনপুট বক্সে কার্সার থাকুক বা না থাকুক।",
          "b": "বারকোড স্ক্যানার ভার্চুয়াল কীবোর্ড হিসেবে কাজ করে দ্রুত ডিজিট পাঠিয়ে শেষে Enter পাঠায়। Dokani গ্লোবাল লিসেনার দিয়ে টাইপিং স্পিড মেপে স্ক্যানার শনাক্ত করে এবং সরাসরি কার্টে প্রোডাক্ট যুক্ত করে।",
          "e": "Barcode scanners emulate HID virtual keyboards, firing numeric characters with rapid inter-keystroke timing (<30ms) terminated by a Carriage Return (Enter). Dokani captures window-level events, identifies scanner bursts, and increments cart items without requiring focused input fields.",
          "code": "const isScanner = (timeDelta < 30); // Differentiates human typing from laser scanner"
        },
        {
          "lvl": "lvl1",
          "q": "Dokani POS কার্ট ক্যালকুলেশনে Subtotal, Item Discount, Invoice Discount, VAT/Tax এবং Round-off কীভাবে ক্রমানুসারে হিসেব হয়?",
          "m": "হিসাববিজ্ঞানের ধারাবাহিক নিয়ম: (১) প্রতিটি আইটেমের মোট মূল্য = `quantity * sellingPrice`। (২) আইটেম ডিসকাউন্ট বিয়োগ = `itemTotal - itemDiscount`। (৩) সব আইটেম যোগ করে পাওয়া যায় `Subtotal`। (৪) ইনভয়েস ডিসকাউন্ট বিয়োগ: শতাংশ বা ফ্ল্যাট ছাড় বাদ দেওয়া হয়। (৫) ট্যাক্স/ভ্যাট যোগ: নেট অ্যামাউন্টের ওপর প্রযোজ্য ভ্যাট যোগ করা হয় (`netAmount * (taxRate / 100)`)। (৬) `Round-off`: খুচরা পয়সার ঝামেলা এড়াতে দশমিক মানকে নিকটবর্তী পূর্ণসংখ্যায় রাউন্ড করা হয় (যেমন `৫২৭.৪০` টাকা হয়ে যায় `৫২৭.০০` টাকা)। ফাইনাল অ্যামাউন্ট হয় `Grand Total`।",
          "b": "প্রথমে আইটেম টোটাল থেকে আইটেম ডিসকাউন্ট বাদ দিয়ে সাব-টোটাল হয়, এরপর ইনভয়েস ডিসকাউন্ট বাদ দিয়ে ভ্যাট যোগ করা হয়। সবশেষে পয়সা বাদ দিতে রাউন্ড-অফ করে গ্র্যান্ড টোটাল নির্ধারণ করা হয়।",
          "e": "POS cart math follows strict financial sequencing: Line totals deduct item discounts yielding Subtotal. Invoice-level discounts are subtracted to produce the Net Taxable Amount. Standard VAT/Tax is compounded onto the taxable base. Finally, algorithmic Round-Off eliminates fractional currency fractions to produce the Grand Total.",
          "code": "const taxable = subtotal - invoiceDiscount;\nconst vat = taxable * (vatRate / 100);\nconst rawTotal = taxable + vat;\nconst grandTotal = Math.round(rawTotal);\nconst roundOff = grandTotal - rawTotal;"
        },
        {
          "lvl": "lvl1",
          "q": "Dokani-তে 'Split Payment (মাল্টি-টেন্ডার পেমেন্ট)' কীভাবে কাজ করে?",
          "m": "বাস্তব দোকানে কাস্টমার প্রায়ই বলে: 'ভাই আমার কাছে ১,০০০ টাকা ক্যাশ আছে, বাকি ৫০০ টাকা আমি বিকাশে দেব আর ২০০ টাকা আমার খাতায় বাকি লিখে রাখেন!' Dokani POS মাল্টি-টেন্ডার পেমেন্ট সাপোর্ট করে: একটি ইনভয়েসের বিপরীতে একাধিক পেমেন্ট মেথড রেকর্ড করা যায়: `{ cash: 1000, bkash: 500, due: 200 }`। ব্যাকএন্ড ট্রানজ্যাকশনে ক্যাশ অ্যাকাউন্টে ১,০০০ টাকা ক্রেডিট হয়, বিকাশ ব্যাংক অ্যাকাউন্টে ৫০০ টাকা ক্রেডিট হয় এবং কাস্টমারের ডিউ লেজারে ২০০ টাকা ডেবিট হয়। কাস্টমারের সম্পূর্ণ বিল এক ক্লিকেই সুষমভাবে পরিশোধিত হয়ে যায়।",
          "b": "স্প্লিট পেমেন্টের মাধ্যমে একজন কাস্টমার একই সাথে ক্যাশ, বিকাশ এবং বকেয়া—একাধিক মাধ্যমে একটি বিল পরিশোধ করতে পারে। সিস্টেম স্বয়ংক্রিয়ভাবে প্রতিটি অ্যাকাউন্টে সঠিক টাকা জমা ও বাকি হিসেবে ভাগ করে দেয়।",
          "e": "Split Payment allows customers to settle a single invoice using multiple tender types (e.g. 1000 BDT Cash + 500 BDT bKash + 200 BDT Customer Credit Due). Dokani persists atomic payment allocations across respective financial accounts in a single database transaction.",
          "tip": "বলো: 'Split tender payments allocate a single bill across Cash, Mobile Wallets, and Customer Credit ledgers simultaneously.'"
        },
        {
          "lvl": "lvl1",
          "q": "থার্মাল প্রিন্টারে 58mm বনাম 80mm পেপার সাইজের জন্য CSS Print Styling কীভাবে অপটিমাইজ করা হয়?",
          "m": "থার্মাল রিসিটের জন্য স্ট্যান্ডার্ড A4 পেপারের CSS কাজ করে না। আমরা বিশেষ প্রিন্ট মিডিয়া কোয়েরি লিখি: `@media print { @page { size: 58mm auto; margin: 0; } }` (বা 80mm)। ফন্ট হিসেবে মোনোস্পেস ফন্ট (`Courier New` বা `monospace`) ব্যবহার করা হয় যাতে প্রতিটি অক্ষরের প্রস্থ সমান থাকে এবং বাম ও ডানের কলামগুলো নিখুঁতভাবে সোজাসুজি এলাইন থাকে। ব্যাকগ্রাউন্ড কালার বাদ দেওয়া হয়, কালো-সাদা হাই-কন্ট্রাস্ট টেক্সট রাখা হয় এবং বারকোড ইমেজকে ক্রিস্প রেন্ডার করার জন্য `image-rendering: pixelated` ব্যবহার করা হয়।",
          "b": "থার্মাল প্রিন্টিংয়ে @media print এবং @page { size: 58mm auto; margin: 0; } ব্যবহার করা হয়। মোনোস্পেস ফন্ট দিয়ে কলামগুলোর অ্যালাইনমেন্ট সোজা রাখা হয় এবং মার্জিন শূন্য করে ক্রিস্প স্লিপ প্রিন্ট নিশ্চিত করা হয়।",
          "e": "Thermal receipt printing targets continuous paper rolls via dedicated print CSS: @page { size: 80mm auto; margin: 0; }. Monospace typography guarantees tabular column alignment across item, qty, and price cells, pairing with pixelated image-rendering for sharp 1D barcode scanning.",
          "code": "@media print {\n  @page { size: 80mm auto; margin: 0mm; }\n  body { width: 80mm; font-family: monospace; font-size: 12px; margin: 0; }\n  .no-print { display: none !important; }\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে 'Hold Cart / Park Sale' ফিচার কীভাবে কাজ করে এবং পিক আওয়ারে কাস্টমার ট্রাফিক জ্যাম কীভাবে দূর করে?",
          "m": "পরিস্থিতি: একজন কাস্টমারের ১০টি আইটেম স্ক্যান করার পর সে বলল 'ভাই আমি আরও ২টা বিস্কুট নিয়ে আসছি একটু দাঁড়ান'। পেছনে অন্য কাস্টমারদের লাইন আটকে যায়! Dokani-তে ক্যাশিয়ার একটি শর্টকাট (`F6 - Hold Cart`) প্রেস করে ওই কাস্টমারের অসম্পূর্ণ কার্টটিকে মেমোরিতে হোল্ড বা পার্ক করে রাখে। সাথে সাথে স্ক্রিন ফাঁকা হয়ে যায় এবং ক্যাশিয়ার পেছনের কাস্টমারের বিল করা শুরু করে। আগের কাস্টমার ফিরে এলে `F6` প্রেস করে এক ক্লিকে পার্ক করা কার্টটি আগের সব আইটেম সহ রিস্টোর করে বিল সম্পন্ন করে। এটি দোকানে কোনো বিলম্ব ছাড়া নিরবচ্ছিন্ন লাইন মুভমেন্ট নিশ্চিত করে।",
          "b": "হোল্ড কার্ট ফিচার কোনো কাস্টমারের বিল সাময়িক স্থগিত করে মেমোরিতে রেখে পরবর্তী কাস্টমারের বিল করার সুযোগ দেয়। আগের কাস্টমার ফিরে এলে এক ক্লিকে তার কার্ট রিস্টোর করে বিল শেষ করা যায়।",
          "e": "Hold Cart / Park Sale resolves checkout counter stalls when shoppers step away. Pressing F6 serializes the in-progress cart into memory/IndexedDB, clearing the register for trailing shoppers. Once the customer returns, pressing F6 restores the exact state for immediate checkout.",
          "code": "// Zustand Park Sale action:\nholdCurrentCart: () => set((state) => ({\n  parkedCarts: [...state.parkedCarts, { id: uuid(), items: state.cartItems, time: new Date() }],\n  cartItems: []\n}))"
        },
        {
          "lvl": "lvl2",
          "q": "বারকোড স্ক্যানিংয়ে 'Duplicate Scan Prevention' (Debouncing) কেন জরুরি এবং ডাবল-স্ক্যান কীভাবে রোধ করবে?",
          "m": "ক্যাশিয়ার যখন লেজার স্ক্যানার দিয়ে পণ্যের গায়ে দ্রুত মুভ করে, স্ক্যানারের লেজার একই বারকোড এক সেকেন্ডে ২-৩ বার স্ক্যান করে ফেলতে পারে! যদি সফটওয়্যারে কোনো গার্ড না থাকে, তবে ১টি সাবান স্ক্যান করতে গিয়ে কার্টে ভুলবশত ৩টি সাবান যোগ হয়ে কাস্টমারের অতিরিক্ত বিল হয়ে যাবে! সমাধান: Dokani-তে একটি ২৫০ms থ্রেশহোল্ড ডেবাউন্স লক থাকে: যদি হুবহু একই বারকোড আগের স্ক্যানের ২৫০ মিলিসেকেন্ডের মধ্যে পুনরায় রিসিভ হয়, তবে সিস্টেম পরবর্তী স্ক্যানটি সাইলেন্টলি ইগনোর করে। শুধুমাত্র ভিন্ন বারকোড এলে অথবা ২৫০ms পার হলে তবেই নতুন ইনপুট গ্রহণ করে।",
          "b": "স্ক্যানারের লেজার একই পণ্যের গায়ে দুইবার আলো ফেললে ডাবল স্ক্যান হতে পারে। ২৫০ মিলি-সেকেন্ডের ডেবাউন্স লক ব্যবহার করে একই বারকোডের তাৎক্ষণিক দ্বিতীয় স্ক্যান বাতিল করে সঠিক কোয়ান্টিটি নিশ্চিত করা হয়।",
          "e": "Laser scanners reading reflective packaging frequently fire the same barcode multiple times within milliseconds. Dokani enforces a 250ms per-barcode debounce guard: identical barcode events occurring within 250ms of each other are suppressed, preventing unintended item duplications.",
          "code": "if (lastScannedBarcode === barcode && (Date.now() - lastScanTimestamp < 250)) {\n  return; // Suppress duplicate laser bounce\n}"
        },
        {
          "lvl": "lvl2",
          "q": "WebUSB এবং WebSerial API ব্যবহার করে ব্রাউজার থেকে সরাসরি থার্মাল প্রিন্টারে কীভাবে র-বাইনারি ESC/POS প্রিন্ট কমান্ড পাঠানো হয়?",
          "m": "আধুনিক ব্রাউজারে `navigator.usb` বা `navigator.serial` এপিআই দিয়ে কোনো অপারেটিং সিস্টেম প্রিন্ট ড্রাইভার ছাড়াই সরাসরি ইউএসবি থার্মাল প্রিন্টারের সাথে এন্ডপয়েন্ট কানেকশন খোলা যায়। সেটআপ: (১) প্রিন্টারের সাথে পেয়ার করা (`navigator.usb.requestDevice({ filters: [{ vendorId }] })`)। (২) ক্লেইম ইন্টারফেস করে আউটপুট এন্ডপয়েন্ট ওপেন করা। (৩) টেক্সট এনকোডার দিয়ে রিসিট টেক্সট এবং ESC/POS হেক্স কমান্ডের একটি `Uint8Array` বাইনারি বাফার তৈরি করা। (৪) `device.transferOut(endpointNumber, buffer)` কল করা। মাত্র ২ মিলিসেকেন্ডে কোনো ডায়ালগ ছাড়া সরাসরি পেপারে প্রিন্ট হয়ে যায়! ব্রাউজারের প্রিন্ট ডায়ালগ চিরতরে বাইপাস হয়।",
          "b": "WebUSB বা WebSerial এপিআই দিয়ে ব্রাউজার সরাসরি থার্মাল প্রিন্টারে বাইনারি ESC/POS কমান্ড পাঠাতে পারে। ফলে কোনো উইন্ডোজ প্রিন্ট ডায়ালগ ছাড়াই বিদ্যুৎ গতিতে রিসিট প্রিন্ট বের হয়ে আসে।",
          "e": "WebUSB and WebSerial APIs permit client-side web applications to communicate directly with thermal printer USB endpoints via navigator.usb. Sending Uint8Array buffers containing raw ESC/POS byte sequences executes silent, sub-5ms receipt printing bypassing the operating system print spooler.",
          "code": "const data = new Uint8Array([...ESC_INIT, ...textBytes, ...PAPER_CUT]);\nawait usbDevice.transferOut(endpointNumber, data);"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani POS-এ 'Customer Search & Loyalty Points' ইন্টিগ্রেশন কীভাবে চেকআউটের গতি না কমিয়ে নির্বিঘ্নে সম্পন্ন হয়?",
          "m": "ক্যাশিয়ার যখন `F4` চেপে কাস্টমারের মোবাইল নম্বরের প্রথম ৩-৪টি ডিজিট টাইপ করে (যেমন `0171`), ফ্রন্টএন্ড লোকাল ক্যাশ ও ডেবউন্সড এপিআই দিয়ে কাস্টমার শনাক্ত করে। কাস্টমার সিলেক্ট হওয়া মাত্রই তার বর্তমান বাকি ব্যালেন্স এবং লয়্যালটি পয়েন্ট স্ক্রিনে ভেসে ওঠে। পয়েন্ট ভাঙিয়ে ডিসকাউন্ট দিতে চাইলে এক ক্লিকে পয়েন্ট ডিডাক্ট হয়। পুরো প্রক্রিয়াটি অপটিমাইজড মেমোরি সার্চের মাধ্যমে করা হয় যাতে ক্যাশিয়ারের বিলিং গতিতে বিন্দুমাত্র ল্যাগ না পড়ে।",
          "b": "মোবাইল নম্বরের ৩ ডিজিট টাইপ করলেই কাস্টমারের নাম, বাকি টাকা এবং লয়্যালটি পয়েন্ট চলে আসে। এক ক্লিকে পয়েন্ট ভাঙিয়ে ডিসকাউন্ট দেওয়া যায় কোনো বিলিং বিলম্ব ছাড়াই।",
          "e": "Customer resolution integrates debounced search on mobile digits (F4 shortcut). Selecting a customer surfaces real-time ledger dues and accumulated loyalty point balances, permitting instant point-to-discount redemptions without interrupting checkout velocity.",
          "tip": "বলো: 'F4 customer search surfaces credit dues and loyalty balances instantly via debounced phone lookups.'"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে প্রোডাক্টের ওজনের ওপর ভিত্তি করে বারকোড রিডিং (Weighing Scale Barcode / Price-Embedded Barcodes) কীভাবে কাজ করে?",
          "m": "সুপারশপ ও গ্রোসারি দোকানে ফলমূল বা মাংস ডিজিটাল স্কেলে মেপে স্টিকার বারকোড মারা হয়। এই বারকোডগুলো প্রমিত EAN-13 ফরম্যাট অনুসরণ করে (যেমন `21 PPPP WWWWW C`): (১) প্রথম ২ ডিজিট `21` নির্দেশ করে এটি একটি ওয়েট-স্কেল বারকোড। (২) পরবর্তী ৪ ডিজিট `PPPP` হলো প্রোডাক্টের নির্দিষ্ট আইডি বা পিএলইউ (PLU) কোড। (৩) পরবর্তী ৫ ডিজিট `WWWWW` হলো পণ্যের সুনির্দিষ্ট ওজন গ্রামে (যেমন `01500` মানে ১.৫ কেজি) অথবা মোট দাম। Dokani-র বারকোড পার্সার এই স্ট্রিং ভেঙে সরাসরি নির্দিষ্ট আপেল প্রোডাক্টটি শনাক্ত করে এবং কোয়ান্টিটি স্বয়ংক্রিয়ভাবে `১.৫ কেজি` বসিয়ে নিখুঁত প্রাইস ক্যালকুলেট করে।",
          "b": "ডিজিটাল স্কেলের বারকোডে প্রোডাক্ট কোডের সাথে ওজন (যেমন ১.৫ কেজি) যুক্ত থাকে। Dokani বারকোড পার্সার স্ট্রিং ডিকোড করে স্বয়ংক্রিয়ভাবে সঠিক ওজন ও দাম কার্টে বসিয়ে দেয়।",
          "e": "Price/Weight-embedded barcodes follow EAN-13 standards (prefix 20-29). Dokani's barcode engine parses the 13 digits, extracting the product PLU identifier and decoding the weight in grams (e.g. 01500 = 1.500 kg), automatically scaling the cart item quantity and line price.",
          "code": "// EAN-13 Weight Parser:\nconst plu = barcode.substring(2, 6);\nconst weightGrams = parseInt(barcode.substring(6, 11), 10);\nconst quantityKg = weightGrams / 1000;"
        },
        {
          "lvl": "lvl3",
          "q": "POS Checkout State Management: Zustand দিয়ে Dokani-র কার্ট আর্কিটেকচার কীভাবে ডিজাইন করা হয়েছে যাতে হাই-স্পিড টাইপিংয়েও কোনো রি-রেন্ডার ড্রপ না হয়?",
          "m": "React-এর সাধারণ `useState` দিয়ে বড় কার্ট বানালে প্রতিটি স্ক্যানে প্যারেন্ট ও সমস্ত কার্ট আইটেম অপ্রয়োজনীয়ভাবে রি-রেন্ডার হয়ে ফ্রেম রেট ৬০ FPS থেকে কমে ল্যাগ করে। Dokani-তে `Zustand` দিয়ে একটি পারফরম্যান্ট গ্লোবাল স্টোর তৈরি করা হয়েছে: (১) প্রতিটি কার্ট আইটেম একটি মেমোইজড কম্পোনেন্ট (`React.memo`) যা শুধুমাত্র নিজের কোয়ান্টিটি বদলালে রি-রেন্ডার হয়। (২) সাব-টোটাল ও ট্যাক্স ক্যালকুলেশন মেমোইজড সিলেক্টর (`useCartStore(selectCartTotals)`) দিয়ে বের করা হয়, ফলে শুধু টোটাল সেকশন রি-রেন্ডার হয়। (৩) স্ক্যানারের ইনপুট সরাসরি গ্লোবাল স্টোরের মিউটেশন ফাংশনে হিট করে। ফলে ১০০টি আইটেমের কার্টেও ইন্টারফেস মাখনের মতো মসৃণ ও তাত্ক্ষণিক থাকে।",
          "b": "Zustand এবং React.memo ব্যবহার করে কার্ট কম্পোনেন্টগুলো অপটিমাইজ করা হয়েছে। প্রতিটি স্ক্যানে পুরো পেজ রি-রেন্ডার না হয়ে শুধু নির্দিষ্ট আইটেম আপডেট হয়, ফলে ১০০ আইটেমের কার্টেও কোনো ল্যাগ থাকে না।",
          "e": "Standard useState triggers catastrophic component tree re-renders during high-speed barcode scanning. Dokani implements Zustand with atomic selectors and React.memo line items. Only mutated quantities and grand total displays re-render, preserving a solid 60 FPS under intensive checkout bursts.",
          "code": "export const useCartStore = create<CartState>((set, get) => ({\n  items: [],\n  addItem: (product) => set((state) => { /* Atomic mutation */ }),\n  totals: () => computeTotals(get().items)\n}));"
        },
        {
          "lvl": "lvl3",
          "q": "ESC/POS Thermal Printing আর্কিটেকচার: বাংলা টেক্সট (Unicode Bangla) থার্মাল প্রিন্টারে প্রিন্ট করার জটিলতা এবং ক্যানভাস বিটম্যাপ দিয়ে Dokani কীভাবে এটি সমাধান করেছে?",
          "m": "থার্মাল প্রিন্টারগুলোর অভ্যন্তরীণ ফার্মওয়্যার কেবল ASCII এবং চীনা/ইংরেজি ক্যারেক্টার সেট চেনে—তাদের ফার্মওয়্যারে কোনো ইউনিকোড বাংলা ফন্ট থাকে না! আপনি যদি সরাসরি বাংলা টেক্সট প্রিন্টারে পাঠান, তবে প্রিন্টার অর্থহীন হিজিবিজি অক্ষর (`??????`) প্রিন্ট করবে। Dokani-র বৈপ্লবিক সমাধান: (১) আমরা রিসিটের বাংলা অংশটি (দোকানের নাম, আইটেম ও ঠিকানা) ব্রাউজারের মেমোরিতে একটি অদৃশ্য HTML5 `<canvas>`-এ রেন্ডার করি। (২) ক্যানভাস থেকে পিক্সেলেটেড ব্ল্যাক-অ্যান্ড-হোয়াইট মোনোক্রোম বিটম্যাপ (Monochrome 1-bit Bitmap) জেনারেট করি। (৩) বিটম্যাপটিকে ESC/POS রাস্টার ইমেজ কমান্ডে (`GS v 0` বা `ESC *`) রূপান্তর করে প্রিন্টারে পাঠাই। এর ফলে প্রিন্টার কোনো ফন্ট ছাড়াই যেকোনো বাংলা টেক্সট নিখুঁত ক্রিস্প গ্রাফিক্স আকারে প্রিন্ট করে দেয়!",
          "b": "থার্মাল প্রিন্টারে বাংলা ফন্ট না থাকায় ইউনিকোড বাংলা সাপোর্ট করে না। Dokani ক্যানভাসে বাংলা টেক্সট রেন্ডার করে সেটিকে ব্ল্যাক-অ্যান্ড-হোয়াইট বিটম্যাপ ইমেজে রূপান্তর করে প্রিন্টারে পাঠায়, ফলে স্পষ্ট ও নিখুঁত বাংলা প্রিন্ট পাওয়া যায়।",
          "e": "Thermal printers lack native Unicode Bengali font tables in hardware firmware, corrupting direct Bengali strings. Dokani renders the receipt layout onto an off-screen HTML5 Canvas, rasterizes the pixels into a 1-bit monochrome bitmap, and dispatches it via the ESC/POS GS v 0 raster bit-image command, delivering crisp Bengali typography.",
          "tip": "বাংলা থার্মাল প্রিন্টিংয়ের এই Canvas-to-ESC/POS বিটম্যাপ টেকনিক ইন্টারভিউয়ারের কাছে অত্যন্ত ইউনিক ও আকর্ষণীয় লাগবে।"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani POS-এ ইনভেন্টরি স্টক হিস্ট্রি ও মুভমেন্ট লেজার: প্রতিটি বিক্রির সাথে সাথে কীভাবে রিয়েল-টাইম স্টক লেজার মেইনটেইন হয়?",
          "m": "দোকানিতে কোনো প্রোডাক্টের স্টক পরিবর্তনকে কেবল একটি সংখ্যা হিসেবে আপডেট করা হয় না, বরং একটি সম্পূর্ণ ইমিউটেবল `inventory_movements` লেজার টেবিলে প্রতিটি মুভমেন্ট রেকর্ড করা হয়। যখন একটি বিক্রি সম্পন্ন হয়: `INVOICE_SALE` টাইপে একটি রেকর্ড তৈরি হয় যাতে থাকে: `product_id`, `branch_id`, `quantity_delta: -2`, `reference_id: invoiceId`, এবং `current_balance`। এর ফলে ওনার যেকোনো সময় দেখতে পারেন ঠিক কোন সেকেন্ডে কোন ইনভয়েস, রিটার্ন বা ড্যামেজের কারণে প্রোডাক্টের স্টক কমেছে—কোনো অদৃশ্য স্টক হারানোর সুযোগ থাকে না।",
          "b": "স্টক শুধু কমানো হয় না, বরং inventory_movements লেজার টেবিলে প্রতিটি পরিবর্তনের ইতিহাস সংরক্ষণ করা হয়। ফলে কোন বিক্রিতে বা ড্যামেজে কত স্টক কমেছিল তা চিরতরে অডিট ট্রেইলে সংরক্ষিত থাকে।",
          "e": "Dokani maintains an immutable inventory_movements ledger recording every stock mutation with direction, timestamp, operator ID, and reference entity (SALE, PURCHASE, DAMAGE, RETURN). Storing previous and resulting balances provides a 100% auditable inventory ledger.",
          "code": "await tx.inventoryMovement.create({\n  data: {\n    productId: item.productId,\n    type: 'SALE',\n    quantity: -item.quantity,\n    referenceId: invoice.id,\n    balanceAfter: newStock\n  }\n});"
        },
        {
          "lvl": "lvl3",
          "q": "POS টার্মিনাল ক্লায়েন্ট ও সার্ভারের মধ্যে নেটওয়ার্ক ডিসকানেকশন রিকভারি: ডুপ্লিকেট ইনভয়েস সাবমিশন রোধে Idempotency Key কীভাবে কাজ করে?",
          "m": "ক্যাশিয়ার 'Complete Sale' বাটনে চাপ দিল। ব্যাকএন্ডে ইনভয়েস সেভ হলো কিন্তু ফিরতি রেসপন্স আসার ঠিক আগের মুহূর্তে দোকানের ওয়াইফাই ড্রপ করল! ক্যাশিয়ার ভাবল বিল হয়নি, তাই সে ইন্টারনেট আসার পর আবার সাবমিট করল। কোনো গার্ড না থাকলে একই বিল ২ বার সেভ হবে এবং কাস্টমারের ব্যালেন্স ও ইনভেন্টরি ২ বার কাটা যাবে! সমাধান: ফ্রন্টএন্ড প্রতিটি চেকআউট শুরু করার সাথে সাথে একটি ক্রিপ্টোগ্রাফিক UUID `idempotency_key` তৈরি করে। ব্যাকএন্ড এপিআই এই কি-টি ডেটাবেজে ইউনিক কনস্ট্রেইন্টে সেভ করে। যদি একই কি নিয়ে দ্বিতীয়বার রিকোয়েস্ট আসে, ডেটাবেজ ডুপ্লিকেট বিক্রি তৈরি না করে সাইলেন্টলি পূর্বের তৈরি হওয়া ইনভয়েসটিই ফেরত দেয়।",
          "b": "ওয়াইফাই ড্রপের কারণে ক্যাশিয়ার দুইবার সাবমিট চাপলে যাতে দুইবার বিল না হয়, সেজন্য ফ্রন্টএন্ড থেকে Idempotency Key পাঠানো হয়। ব্যাকএন্ড ডুপ্লিকেট কি দেখে দ্বিতীয়বার বিল না করে পূর্বের তৈরি হওয়া বিলটিই সেফলি রিটার্ন করে।",
          "e": "If network packets drop after server persistence, cashiers re-submit checkouts. Dokani prevents duplicate billing by attaching client-generated UUID Idempotency Keys to checkout payloads. The backend asserts uniqueness; duplicate keys safely return the cached committed invoice without deducting duplicate stock.",
          "code": "// Client generates idempotency key:\nconst idempotencyKey = crypto.randomUUID();\nawait api.post('/invoices', { ...payload, idempotencyKey });"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani-তে প্রোডাক্ট রিটার্ন ও রিফান্ড (Return / Refund Workflow) কীভাবে মূল ইনভয়েস ও অ্যাকাউন্টের সাথে সিঙ্ক হয়?",
          "m": "পণ্য ফেরতের নিয়ম: (১) কাস্টমার মূল ইনভয়েস নিয়ে আসলে ক্যাশিয়ার বারকোড স্ক্যান করে মূল ইনভয়েস খুঁজে বের করে। (২) যে নির্দিষ্ট আইটেমটি ফেরত এসেছে তার কোয়ান্টিটি সিলেক্ট করা হয়। (৩) সিস্টেমে একটি নেগেটিভ ক্রেডিট এন্ট্রি তৈরি হয়: ইনভেন্টরিতে ফেরত আসা প্রোডাক্টের স্টক অ্যাটমিকালি পুনরায় যোগ হয় (`+1`)। (৪) কাস্টমার যদি ক্যাশ রিফান্ড চায়, ক্যাশ ড্রয়ার থেকে টাকা কমে; আর যদি কাস্টমার অন্য পণ্য নিতে চায় তবে রিফান্ড অ্যামাউন্ট নতুন ইনভয়েসের সাথে ক্রেডিট অ্যাডজাস্টমেন্ট হিসেবে সেট হয়ে যায়। মূল ইনভয়েসের স্ট্যাটাস আপডেট হয়ে `PARTIALLY_REFUNDED` বা `REFUNDED` মার্ক হয়।",
          "b": "পণ্য ফেরতের ক্ষেত্রে মূল ইনভয়েস থেকে আইটেম রিটার্ন করা হয়, স্বয়ংক্রিয়ভাবে ইনভেন্টরিতে স্টক পুনরায় যোগ হয় এবং ক্যাশ ফেরত বা নতুন পণ্যের সাথে ব্যালেন্স অ্যাডজাস্ট করে নিখুঁত হিসাব রক্ষা করা হয়।",
          "e": "Returns link directly to historical invoices. Returning items atomically restores physical inventory stock in branch_stocks, dispatches a negative inventory movement record, decrements the active shift's cash drawer, and flags the parent invoice as PARTIALLY_REFUNDED with audit logs.",
          "tip": "বলো: 'Returns atomically restock inventory while updating the parent invoice state and ledger adjustments.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি গ্রোসারি দোকানে ক্যাশিয়ার ভুলবশত একটি ১০ টাকার চকলেটের কোয়ান্টিটি ১-এর জায়গায় ১০০ লিখে ইনভয়েস কনফার্ম করে ফেলেছে! প্রিন্টার থেকে স্লিপ বের হওয়ার পর কাস্টমার ভুল দেখে চিৎকার করছে। তুমি কীভাবে এই ভুল সংশোধন করবে?",
          "m": "সংশোধন প্রক্রিয়া: (১) ক্যাশিয়ার নিজে কোনো ইনভয়েস সরাসরি এডিট বা ডিলিট করতে পারবে না (সিকিউরিটি পলিসি)। (২) ক্যাশিয়ার 'Sales Return / Adjustment' অপশনে গিয়ে ম্যানেজার বা ওনারের পিন কোড ইনপুট করবে। (৩) সিস্টেমে ৯৯টি অতিরিক্ত চকলেটের একটি `RETURN_ADJUSTMENT` ট্রানজ্যাকশন এন্ট্রি হবে। (৪) ৯৯টি চকলেটের স্টক ডেটাবেজে স্বয়ংক্রিয়ভাবে ফেরত যুক্ত হবে (`+99`)। (৫) ৯৯০ টাকা ক্যাশ ড্রয়ার থেকে কাস্টমারকে রিফান্ড করা হবে। (৬) সিস্টেম একটি সংশোধিত কারেকশন স্লিপ প্রিন্ট করবে। পুরো অডিট ট্রেইলে স্পষ্ট থাকবে ভুলটি কে করেছিল এবং কে অ্যাপ্রুভ করেছে—কোনো অডিট গরমিল ছাড়াই হিসাব শতভাগ মিলে যাবে।",
          "b": "ম্যানেজার পিন ভেরিফিকেশন দিয়ে ৯৯টি অতিরিক্ত আইটেমের রিটার্ন অ্যাডজাস্টমেন্ট সম্পন্ন করব। ৯৯টি চকলেটের স্টক স্বয়ংক্রিয়ভাবে পুলে ফেরত যাবে এবং কাস্টমারকে টাকা রিফান্ড করে সংশোধিত স্লিপ দেওয়া হবে।",
          "e": "Because direct invoice deletion is prohibited, resolve via an authorized Return Adjustment. The manager authenticates via PIN, the POS issues a 99-unit return, restoring 99 chocolates to inventory stock, refunding 990 BDT from the cash drawer, and printing an auditable credit slip.",
          "tip": "বলো: 'Resolve cashier input errors through authorized Manager PIN Return Adjustments, never raw database deletion.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: থার্মাল প্রিন্টারে হঠাৎ পেপার জ্যাম হয়ে প্রিন্ট আটকে গেল এবং পেপার ছিঁড়ে গেল। কিন্তু সফটওয়্যারে বিল অলরেডি কনফার্ম হয়ে গেছে। ক্যাশিয়ার কীভাবে কাস্টমারকে ডুপ্লিকেট স্টক না কেটে পুনরায় রিসিট প্রিন্ট করে দেবে?",
          "m": "সমাধান: Dokani-তে প্রতিটি সম্পন্ন হওয়া ইনভয়েসের জন্য একটি 'Reprint Receipt' বাটন থাকে। ক্যাশিয়ার পিওএস স্ক্রিনের 'Recent Invoices' ট্যাব থেকে অথবা শর্টকাট চেপে সর্বশেষ ইনভয়েসটি ওপেন করবে এবং 'Reprint' চাপবে। প্রিন্টার ড্রাইভার ডেটাবেজে কোনো নতুন ট্রানজ্যাকশন বা স্টক ডিডাকশন না করে শুধুমাত্র পূর্বের রিসিটের মেমোরি ডেটা পুনরায় থার্মাল প্রিন্টারে পাঠাবে এবং রিসিটের ওপরে স্পষ্ট করে `[DUPLICATE REPRINT]` সিল প্রিন্ট করে দেবে যাতে কোনো কাস্টমার একই রিসিট দুইবার দেখিয়ে প্রতারণা করতে না পারে।",
          "b": "রিসেন্ট ইনভয়েস থেকে কোনো নতুন স্টক না কেটে শুধুমাত্র পূর্ববর্তী ইনভয়েসের রিসিট পুনরায় প্রিন্ট করা হয় এবং রিসিটের মাথায় [DUPLICATE REPRINT] লিখে দেওয়া হয়।",
          "e": "Execute a idempotent Reprint from the Recent Sales tab. The reprint action dispatches cached invoice layout data to the printer spool without triggering database mutations or stock deductions, watermarking the printed receipt with [DUPLICATE REPRINT] to prevent fraud.",
          "code": "// Reprint dispatches cached invoice payload with duplicate flag:\nawait printReceipt(lastInvoice, { isDuplicate: true });"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি পোশাকের দোকানে একজন কাস্টমার বারকোড স্টিকারটি হাত দিয়ে নষ্ট করে ফেলেছে, ফলে স্ক্যানার দিয়ে স্ক্যান করা যাচ্ছে না। ক্যাশিয়ার কীভাবে দ্রুত বিল সম্পন্ন করবে?",
          "m": "সমাধান: স্ক্যানার কাজ না করলেও ক্যাশিয়ারের বিলিং আটকে থাকবে না! Dokani-তে অল্টারনেটিভ সার্চ অপশন রয়েছে: (১) ক্যাশিয়ার `F2` প্রেস করে ইনস্ট্যান্ট সার্চ বারে প্রোডাক্টের নাম (যেমন 'Polo Shirt Black L') বা SKU কোডের ২-৩টি অক্ষর টাইপ করবে। (২) ফ্রন্টএন্ডের ইন-মেমোরি ফাজি সার্চ (Fuzzy Search) মুহূর্তের মধ্যে ম্যাচিং প্রোডাক্টের তালিকা নিয়ে আসবে। (৩) ক্যাশিয়ার কীবোর্ডের `Down Arrow` দিয়ে সিলেক্ট করে `Enter` চাপলেই প্রোডাক্ট কার্টে যোগ হয়ে যাবে। কোনো বারকোড ছাড়াই মাত্র ২ সেকেন্ডে বিলিং সম্পন্ন হবে।",
          "b": "F2 চেপে প্রোডাক্টের নাম বা SKU লিখে সার্চ করলেই ফাজি সার্চ দিয়ে পণ্যটি চলে আসে। কীবোর্ডের অ্যারো কি দিয়ে সিলেক্ট করে এন্টার চাপলেই প্রোডাক্টটি কার্টে যোগ হয়ে যায়।",
          "e": "When physical barcodes are defaced, the cashier hits F2 to toggle Keyboard Fuzzy Search. Typing partial product names or SKU codes queries the local in-memory catalog, allowing instant selection via Arrow Keys and Enter in seconds.",
          "tip": "বলো: 'F2 in-memory fuzzy search provides instant fallback when physical barcodes are damaged.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি ব্যস্ত রেস্তোরাঁ বা ক্যাফেতে ক্যাশিয়ার যখন বিক্রি করছে, তখন একই সাথে কিচেনে রাঁধুনিদের কাছে 'Kitchen Order Ticket (KOT)' প্রিন্ট হতে হবে এবং ক্যাশিয়ারের ডেস্কে মূল কাস্টমার স্লিপ প্রিন্ট হতে হবে। Dokani-তে কীভাবে মাল্টি-প্রিন্টার রাউটিং করবে?",
          "m": "মাল্টি-প্রিন্টার রাউটিং সলিউশন: Dokani-তে ক্যাটাগরি-বেসড প্রিন্টার রাউটিং কনফিগারেশন থাকে। (১) ক্যাশিয়ারের লোকাল প্রিন্টার (USB) ডিফল্ট 'Cashier Receipt Printer' হিসেবে রেজিস্টার থাকে। (২) কিচেনের থার্মাল প্রিন্টারটি লোকাল ওয়াইফাই/ল্যান আইপিতে (`192.168.1.200:9100`) যুক্ত থাকে। (৩) ক্যাশিয়ার যখন বিল কনফার্ম করে, Dokani কার্টটিকে দুটি ভাগে ভাগ করে: পানীয় ও খাবারের আইটেমগুলো নিয়ে একটি KOT টিকেট তৈরি করে সরাসরি ল্যান সকেটে কিচেন প্রিন্টারে পাঠায় এবং ক্যাশিয়ারের প্রিন্টারে সম্পূর্ণ ইনভয়েস প্রিন্ট করে ক্যাশ ড্রয়ার খুলে দেয়।",
          "b": "Dokani-তে মাল্টি-প্রিন্টার রাউটিং কনফিগার করা যায়। বিল কনফার্মের সাথে সাথে ক্যাশিয়ারের ইউএসবি প্রিন্টারে মূল রিসিট এবং কিচেনের ল্যান প্রিন্টারে কিচেন অর্ডার টিকিট (KOT) সমান্তরালে প্রিন্ট হয়।",
          "e": "Configure multi-printer routing based on product categories. Upon checkout, Dokani forks the print payload: sending raw ESC/POS KOT tickets to the kitchen printer over network TCP sockets (port 9100) while driving the customer receipt and cash drawer kick through the local counter USB printer.",
          "code": "// Dual-print dispatch:\nawait Promise.all([\n  printCustomerReceipt(invoice, usbPrinter),\n  printKitchenKOT(kitchenItems, '192.168.1.200:9100')\n]);"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: ফ্রন্টএন্ডে পিওএস ইন্টারফেসে কার্টে ৫০টি আইটেম যোগ করার পর ব্রাউজারের ট্যাবটি ভুলবশত ক্রস লেগে বন্ধ হয়ে গেল! ক্যাশিয়ার হাহাকার করছে। কীভাবে ট্যাব পুনরায় ওপেন করলে কার্টের সমস্ত আইটেম অক্ষত ফিরিয়ে আনবে?",
          "m": "সমাধান: Dokani-র কার্ট স্টেট স্বয়ংক্রিয়ভাবে ব্রাউজারের `localStorage` বা `IndexedDB`-তে রিয়েলটাইমে পারসিস্ট করা থাকে (Zustand `persist` মিডলওয়্যার)। ক্যাশিয়ার যখনই ব্রাউজার বা ট্যাব পুনরায় ওপেন করবে, Zustand স্টোর স্বয়ংক্রিয়ভাবে লোকাল স্টোরেজ থেকে পূর্বে সিলেক্ট করা ৫০টি আইটেম, তাদের কোয়ান্টিটি, কাস্টমার সিলেকশন এবং ডিসকাউন্ট মেমোরিতে রিহাইড্রেট করে ঠিক আগের অবস্থায় স্ক্রিন ফিরিয়ে আনবে। ক্যাশিয়ারের কোনো ডেটা হারাবে না এবং সে সাথে সাথে 'Print' দিয়ে বিল সম্পন্ন করতে পারবে।",
          "b": "Zustand persist মিডলওয়্যারের মাধ্যমে কার্ট স্বয়ংক্রিয়ভাবে লোকাল স্টোরেজে সেভ থাকে। ব্রাউজার বন্ধ হয়ে গেলেও পুনরায় ওপেন করলে ৫০টি আইটেম ঠিক আগের অবস্থায় কার্টে ফেরত চলে আসে।",
          "e": "Dokani integrates Zustand persist middleware backed by localStorage/IndexedDB. Unintended browser tab crashes or closures preserve cart state; reopening the browser rehydrates the full 50 items, customer selections, and discounts instantaneously.",
          "code": "export const useCartStore = create(\n  persist((set) => ({ ...cartState }), { name: 'dokani-active-cart' })\n);"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে পিওএস চেকআউট ল্যাটেন্সি সাব-৩ মিলিসেকেন্ডে নামিয়ে আনতে কী কী ফ্রন্টএন্ড ও ডেটাবেজ অপটিমাইজেশন করা হয়েছে?",
          "m": "দোকানি পিওএসে সাব-৩ms ল্যাটেন্সি অর্জনের পূর্ণাঙ্গ কৌশল: (১) `Frontend In-Memory Cache`: লগইনের সাথে সাথে দোকানের সম্পূর্ণ প্রোডাক্ট ক্যাটালগ ক্লায়েন্ট ব্রাউজারের মেমোরিতে `Map<Barcode, Product>` হ্যাশ ম্যাপে লোড থাকে, ফলে বারকোড স্ক্যান সম্পূর্ণ শূন্য মিলিসেকেন্ডে কার্টে যোগ হয়। (২) `Database Compound Indexes`: ইনভয়েস ও প্রোডাক্ট টেবিলে `(tenant_id, barcode)` এবং `(tenant_id, branch_id)` B-Tree ইনডেক্স নিশ্চিত করা। (৩) `Atomic Interactive Transaction`: ডেটাবেজ ট্রানজ্যাকশন ব্যাচ আকারে এক রাউন্ড-ট্রিপে সম্পন্ন হয়। (৪) `Decoupled BullMQ`: প্রিন্ট রেন্ডারিং ও এসএমএস ব্যাকগ্রাউন্ডে অফলোড করা। ফলে ক্যাশিয়ারের সামনে কোনো দৃশ্যমান ল্যাগই থাকে না।",
          "b": "দোকানিতে ব্রাউজার মেমোরিতে ক্যাটালগ ক্যাশিং, কম্পাউন্ড ইনডেক্সযুক্ত পোস্টগ্রেস কুয়েরি এবং ব্যাকগ্রাউন্ডে এসএমএস অফলোড করে সাব-৩ মিলি-সেকেন্ড চেকআউট গতি নিশ্চিত করা হয়েছে।",
          "e": "Achieving sub-3ms POS latencies in Dokani involves: in-memory JavaScript Map lookups for client-side barcode matching, compound database B-Tree indexes on (tenant_id, barcode), single-roundtrip batch SQL updates, and offloading receipt rendering to background BullMQ workers.",
          "tip": "দোকানির এই সাব-৩ms আর্কিটেকচার ইন্টারভিউয়ারকে নিশ্চিত করবে যে তুমি পারফরম্যান্স টিউনিংয়ের একজন বিশেষজ্ঞ।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: পাইকারি দোকানে 'বাকির খাতা' (Customer Khata): Dokani-তে এসএমএস নোটিফিকেশন সহ বাকি ট্র্যাকিং কীভাবে অটোমেট করা হয়েছে?",
          "m": "বাংলাদেশের খুচরা ও পাইকারি দোকানের প্রাণ হলো বাকির খাতা। Dokani-তে কাস্টমার বাকি রাখলে: (১) কাস্টমার সিলেক্ট করে পেমেন্টে 'Due' অ্যামাউন্ট এন্ট্রি করা হয়। (২) ডেটাবেজে কাস্টমারের লেজারে বাকি যুক্ত হয় এবং আগের বকেয়ার সাথে যোগ হয়ে মোট বাকি হিসেব হয়। (৩) ট্রানজ্যাকশন শেষ হওয়া মাত্রই ব্যাকগ্রাউন্ড সার্ভিস কাস্টমারের মোবাইলে বাংলা এসএমএস পাঠায়: 'জনাব রহিম, আপনার আজকের বাকি ৫০০ টাকা। মোট বকেয়া ৩,২০০ টাকা। ধন্যবাদ, অ্যারোমা স্টোর।' (৪) ড্যাশবোর্ডে ওনার এক ক্লিকে 'Send Due Reminder' চাপলে সব বাকিদারদের কাছে বকেয়া পরিশোধের তাগাদা এসএমএস চলে যায়। এটি মার্চেন্টদের বকেয়া আদায় ৪০% বাড়িয়ে দিয়েছে!",
          "b": "দোকানিতে কাস্টমার বাকি রাখলে স্বয়ংক্রিয়ভাবে তার লেজার আপডেট হয় এবং কাস্টমারের মোবাইলে মোট বকেয়া উল্লেখ করে স্বয়ংক্রিয় বাংলা এসএমএস চলে যায়। এক ক্লিকে বকেয়া পরিশোধের রিমাইন্ডার পাঠানো যায়।",
          "e": "Dokani digitizes traditional customer credit ledgers ('Khata'). When sales conclude on credit, customer receivable ledgers update atomically, triggering an automated branded Bengali SMS via BullMQ notifying the customer of today's credit and total outstanding dues. Merchants can dispatch bulk SMS due reminders in one click.",
          "tip": "বলো: 'Automated Bengali SMS reminders upon credit checkout increased merchant due recovery rates by over 40%.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Dokani-তে ক্যাশ ড্রয়ার শিফট ম্যানেজমেন্ট (Shift Management / X-Report & Z-Report) কীভাবে হিসাববিজ্ঞান রক্ষা করে?",
          "m": "দোকানি পিওএসে ক্যাশিয়ারদের শিফট সিস্টেমে কাজ করে: (১) `Shift Start`: ক্যাশিয়ার সকালে বসার সময় বাক্সে কত প্রারম্ভিক খুচরা টাকা (`Opening Cash`, যেমন ২,০০০ টাকা) ছিল তা ইনপুট দিয়ে শিফট শুরু করে। (২) `Shift Running (X-Report)`: শিফট চলাকালীন ক্যাশিয়ার যেকোনো সময় একটি 'X-Report' প্রিন্ট করতে পারে যা চলমান সেলস, ক্যাশ ও ডিজিটাল পেমেন্টের সামারি দেখায় কিন্তু শিফট ক্লোজ করে না। (৩) `Shift Close (Z-Report)`: শিফট শেষে ক্যাশিয়ার বাক্সের আসল ক্যাশ গুনে ইনপুট দেয়। সিস্টেম চূড়ান্ত 'Z-Report' প্রিন্ট করে—যেখানে মোট বিক্রি, এক্সপেক্টেড ক্যাশ, অ্যাকচুয়াল ক্যাশ এবং কোনো শর্টেজ/সারপ্লাস থাকলে তা রেকর্ড করে শিফট লক করে দেয়। এটি ক্যাশিয়ারদের চুরি বা গরমিল পুরোপুরি বন্ধ করে।",
          "b": "শিফট সিস্টেমে সকালে ওপেনিং ক্যাশ দিয়ে শিফট শুরু হয় এবং দিন শেষে Z-Report প্রিন্ট করে বাক্সের আসল ক্যাশের সাথে সফটওয়্যারের হিসাব মিলিয়ে কোনো শর্টেজ থাকলে তা রিপোর্ট করে শিফট লক করা হয়।",
          "e": "Dokani enforces shift accounting controls: Shift Opening records floating change; the interim X-Report audits active sales mid-shift without closing drawers; the terminal Z-Report finalizes the shift, reconciling expected cash against counted physical bills, recording variance shortages, and locking the ledger session.",
          "tip": "হিসাববিজ্ঞানের 'X-Report (Interim) vs Z-Report (Final Shift Close)' টার্ম দুটি উল্লেখ করা আন্তর্জাতিক পিওএস মানের পরিচয়।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: বারকোড লেবেল জেনারেশন ও প্রিন্টিং (Code-128 / EAN-13): Dokani-তে নিজস্ব পণ্যের বারকোড স্টিকার কীভাবে তৈরি হয়?",
          "m": "যেসব পণ্যের গায়ে ফ্যাক্টরি বারকোড থাকে না (যেমন নিজস্ব জামাকাপড় বা খোলা চাল-ডাল), সেগুলোর জন্য Dokani একটি বিল্ট-ইন বারকোড স্টিকার জেনারেটর সরবরাহ করে: (১) সিস্টেম প্রোডাক্ট তৈরির সময় একটি অনন্য ১২-ডিজিটের কোড তৈরি করে। (২) ব্রাউজারে `jsbarcode` বা SVG ইঞ্জিন দিয়ে ক্রিস্প `Code-128` বারকোড তৈরি হয় যাতে দোকানের নাম, প্রোডাক্টের নাম এবং বিক্রয়মূল্য সুন্দরভাবে বিন্যস্ত থাকে। (৩) স্টিকার রোল প্রিন্টারে (যেমন Xprinter বা Zebra) পাঠাতে কাস্টম স্টিকার সাইজ (যেমন `38mm x 25mm` বা `50mm x 30mm`) অনুযায়ী গ্রিড পেপার ফরম্যাটে মাল্টি-কপি প্রিন্ট কমান্ড দেওয়া হয়। মার্চেন্টরা স্টিকার ছিঁড়ে পণ্যের গায়ে লাগিয়ে সাথে সাথে স্ক্যান করে বিক্রি করতে পারে।",
          "b": "ফ্যাক্টরি বারকোড না থাকা পণ্যের জন্য Dokani স্বয়ংক্রিয়ভাবে Code-128 বারকোড স্টিকার জেনারেট করে। স্টিকার প্রিন্টারে দোকানের নাম ও দাম সহ স্টিকার প্রিন্ট করে পণ্যের গায়ে লাগানো যায়।",
          "e": "Dokani incorporates a native barcode label generator for private-label goods. Using JsBarcode, it renders vector Code-128 / EAN-13 barcodes formatted for specialized label printers (Zebra/Xprinter) across standard label dimensions (38x25mm), outputting shop branding, SKU, and retail prices.",
          "code": "JsBarcode(barcodeSvgRef.current, product.barcode, {\n  format: 'CODE128',\n  displayValue: true,\n  fontSize: 14,\n  height: 40\n});"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: পিওএস হার্ডওয়্যার কম্প্যাটিবিলিটি টেস্টিং: বিভিন্ন ব্র্যান্ডের থার্মাল প্রিন্টার ও স্ক্যানারে Dokani কীভাবে নির্বিঘ্নে কাজ করে?",
          "m": "বাজারে Xprinter, Epson, Posiflex, Rongta, Sunmi সহ শত শত ব্র্যান্ডের প্রিন্টার রয়েছে। কম্প্যাটিবিলিটি নিশ্চিতের কৌশল: (১) আমরা প্রিন্টারের কোনো প্রোপাইটরি সফটওয়্যারের ওপর নির্ভর করি না; স্ট্যান্ডার্ড ইন্ডাস্ট্রি `ESC/POS` কমান্ড সেট মেনে চলি যা বিশ্বের ৯৯% থার্মাল প্রিন্টার সাপোর্ট করে। (২) Android POS ডিভাইসগুলোর জন্য (যেমন Sunmi POS) সানমির বিল্ট-ইন জাভা প্রিন্টিং সার্ভিস হ্যান্ডেল করতে একটি লাইটওয়েট হাইব্রিড সার্ভিস ব্যবহার করি। (৩) যে প্রিন্টার বাইনারি কমান্ড পায় না, সেটির জন্য ইউনিভার্সাল CSS প্রিন্ট ফলব্যাক সক্রিয় থাকে। এর ফলে যেকোনো সস্তা বা দামি প্রিন্টার প্লাগ করলেই Dokani সাথে সাথে প্লাগ-অ্যান্ড-প্লে কাজ করে।",
          "b": "বিশ্বমানের স্ট্যান্ডার্ড ESC/POS কমান্ড ব্যবহার করায় Xprinter, Epson বা Sunmi—বাজারের যেকোনো থার্মাল প্রিন্টারে কোনো স্পেশাল ড্রাইভার ছাড়াই Dokani প্লাগ-অ্যান্ড-প্লে সাপোর্ট দেয়।",
          "e": "Hardware interoperability across Epson, Xprinter, and Sunmi POS terminals relies on standard ESC/POS protocol specifications combined with responsive CSS print media queries. Avoiding proprietary vendor drivers ensures true plug-and-play compatibility across 99% of retail thermal hardware.",
          "tip": "বলো: 'Adhering to strict industry ESC/POS specifications ensures plug-and-play interoperability across Epson, Xprinter, and Android POS terminals.'"
        }
      ]
    },
    {
      "id": "dokani-inventory-concurrency",
      "name": "Inventory Tracking & Concurrency Control",
      "desc": "Real-time Stock Management, FIFO Expiry Tracking, Multi-branch Transfers, Low-Stock Reorder Points, Concurrency Locking, Damage Write-offs",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Dokani-তে রিয়েল-টাইম ইনভেন্টরি ট্র্যাকিং কীভাবে কাজ করে এবং কেন প্রতিটি সেলস ও পারচেজে স্টক সিঙ্ক থাকা আবশ্যক?",
          "m": "ইনভেন্টরি হলো যেকোনো ব্যবসা প্রতিষ্ঠানের প্রধান আর্থিক সম্পদ। Dokani-তে ইনভেন্টরি সম্পূর্ণ অটোমেটেড ও রিয়েলটাইমে সিঙ্ক থাকে: (১) যখন কোনো মার্চেন্ট সাপ্লায়ারের কাছ থেকে পণ্য কিনে গুদামে তোলে (`Purchase Order / GRN`), তখন ডেটাবেজে সংশ্লিষ্ট ব্রাঞ্চের স্টক সংখ্যা স্বয়ংক্রিয়ভাবে বৃদ্ধি পায় (`stock + 50`)। (২) যখনই কোনো ক্যাশিয়ার পিওএস টার্মিনালে পণ্য বিক্রি করে, ট্রানজ্যাকশনের মধ্যে সেই স্টক সাথে সাথে বিয়োগ হয় (`stock - 1`)। (৩) যদি পণ্য ফেরত আসে বা ড্যামেজ হয়, তাও নিখুঁতভাবে অ্যাডজাস্ট হয়। ফলে ওনার মোবাইলে ড্যাশবোর্ড দেখলেই মুহূর্তের মধ্যে জানতে পারেন কোন দোকানে ঠিক কোন প্রোডাক্টটি কত পিস অবশিষ্ট আছে।",
          "b": "দোকানিতে পারচেজ করার সাথে সাথে স্টক বাড়ে এবং বিক্রির সাথে সাথে তাৎক্ষণিকভাবে স্টক কমে যায়। ফলে দোকান মালিক যেকোনো সময় মোবাইলে প্রতিটি আউটলেটের সঠিক স্টক রিয়েলটাইমে দেখতে পান।",
          "e": "Dokani enforces real-time bidirectional inventory synchronization: Goods Receipt Notes (GRN) increment stock counts, checkout sales decrement stock atomically, and returns/damages trigger adjustments. Store owners monitor physical warehouse stock levels across all branches on mobile dashboards in real time.",
          "tip": "বলো: 'Dokani synchronizes physical inventory atomically across sales, purchases, transfers, and returns.'"
        },
        {
          "lvl": "lvl1",
          "q": "Dokani-তে 'Low Stock Alert (স্বল্প স্টক সতর্কতা)' এবং 'Reorder Point' কীভাবে কাজ করে?",
          "m": "যাতে দোকানে কোনো হট-সেলিং প্রোডাক্ট হঠাৎ শেষ হয়ে বিক্রি বন্ধ না হয়ে যায়, সেজন্য প্রতিটি প্রোডাক্টের একটি `min_stock_alert_level` (যেমন ১০ পিস) কনফিগার করা থাকে। যখন কোনো বিক্রির পর প্রোডাক্টের অবশিষ্ট স্টক এই লেভেলের নিচে নেমে যায়, সিস্টেম স্বয়ংক্রিয়ভাবে দুটি কাজ করে: (১) ওনার ও ম্যানেজারের ড্যাশবোর্ডে লাল ওয়ার্নিং ব্যাজ দেখায় এবং নোটিফিকেশন পাঠায় যে 'এই প্রোডাক্টের স্টক সংকটজনক অবস্থায় আছে'। (২) সাপ্লায়ারদের জন্য একটি খসড়া পারচেজ রিকুইজিশন (Reorder List) তৈরি করে রাখে যাতে ওনার এক ক্লিকেই সাপ্লায়ারকে নতুন অর্ডারের এসএমএস বা ইমেইল পাঠাতে পারেন।",
          "b": "প্রোডাক্টের স্টক নির্দিষ্ট সীমার (min_stock_level) নিচে নামলে সিস্টেম ওনারের ড্যাশবোর্ডে লাল ওয়ার্নিং দেয় এবং সাপ্লায়ারকে পুনরায় অর্ডার দেওয়ার জন্য স্বয়ংক্রিয় পারচেজ লিস্ট তৈরি করে দেয়।",
          "e": "To prevent stockouts, Dokani tracks a min_stock_alert threshold per product. When sales drop available inventory below this threshold, Dokani raises an amber dashboard badge and generates a pre-populated Supplier Purchase Reorder sheet for instant replenishment.",
          "code": "if (currentStock <= product.minStockAlert) {\n  await triggerLowStockNotification(tenantId, product.id);\n}"
        },
        {
          "lvl": "lvl1",
          "q": "ফার্মেসি ও গ্রোসারি দোকানে 'Batch & Expiry Date Tracking (মেয়াদোত্তীর্ণ ডেট ট্র্যাকিং)' কেন গুরুত্বপূর্ণ এবং FIFO মেথড কীভাবে কাজ করে?",
          "m": "ফার্মেসির ওষুধ বা গ্রোসারির দুধে সুনির্দিষ্ট ব্যাচ নম্বর ও মেয়াদোত্তীর্ণ তারিখ (Expiry Date) থাকে। মেয়াদোত্তীর্ণ পণ্য বিক্রি করা বেআইনি ও বিপজ্জনক! Dokani `FIFO (First In, First Out)` নীতি মেনে চলে: (১) প্রতিটি পারচেজে প্রোডাক্টের জন্য আলাদা ব্যাচ তৈরি হয় (`batch_no: 'B101', expire_date: '2026-12-31'`)। (২) ক্যাশিয়ার যখন বিল করে, সিস্টেম স্বয়ংক্রিয়ভাবে সেই ব্যাচের পণ্যটি আগে কার্টে দেয় যার মেয়াদ সবার আগে শেষ হবে (FEFO / FIFO)। (৩) যেসব পণ্যের মেয়াদ আগামী ৩০ দিনের মধ্যে শেষ হতে চলেছে, সেগুলোর তালিকা ম্যানেজারের কাছে আলাদাভাবে আসে যাতে সে ডিসকাউন্টে ক্লিয়ার করতে পারে বা সাপ্লায়ারকে ফেরত দিতে পারে।",
          "b": "ফার্মেসির ওষুধ বা গ্রোসারিতে মেয়াদোত্তীর্ণ হওয়া রোধে FIFO (First In First Out) নীতিতে যে ব্যাচের মেয়াদ আগে শেষ হবে তা আগে বিক্রি করা হয়। মেয়াদ শেষ হওয়ার ৩০ দিন আগে সিস্টেম স্বয়ংক্রিয় অ্যালার্ট দেয়।",
          "e": "Pharmaceutical and grocery inventories enforce FIFO (First In First Out) and FEFO (First Expired First Out) batch tracking. Each purchase allocates items to discrete batches with expiry dates. The POS engine prioritizes expirable batches first during billing, flagging batches nearing 30-day expiration thresholds.",
          "tip": "ইন্টারভিউতে 'FIFO / FEFO batch tracking for perishables and pharma' স্পষ্টভাবে তুলে ধরবে।"
        },
        {
          "lvl": "lvl1",
          "q": "Dokani-তে 'Branch-to-Branch Stock Transfer (এক দোকান থেকে অন্য দোকানে পণ্য পাঠানো)' ওয়ার্কফ্লো কীভাবে পরিচালিত হয়?",
          "m": "যখন মেইন ওয়্যারহাউস থেকে গুলশান ব্রাঞ্চে ৫০টি শার্ট পাঠানো হয়, তখন সরাসরি এক সেকেন্ডে স্টক গুলশানে চলে যায় না (কারণ পথে পণ্য হারিয়ে যেতে পারে বা ট্রাফিকে থাকতে পারে)। Dokani-র ৩-স্টেপ ট্রান্সফার ওয়ার্কফ্লো: (১) `Initiate Transfer`: প্রেরক ব্রাঞ্চ ট্রান্সফার শুরু করে; ওয়্যারহাউসের স্টক ৫০টি কমে যায় এবং স্ট্যাটাস হয় `IN_TRANSIT`। (২) `In-Transit Tracking`: ৫০টি শার্ট সাময়িক একটি ভার্চুয়াল ট্রানজিট পুলে থাকে। (৩) `Receive Transfer`: গুলশান ব্রাঞ্চের ম্যানেজার পণ্য ফিজিক্যালি গুনে দেখে 'Accept Transfer' চাপলে তবেই গুলশান ব্রাঞ্চের স্টকে ৫০টি যোগ হয়। যদি পথে ২টি শার্ট নষ্ট হয়, তবে ম্যানেজার ৪৮টি রিসিভ করে ২টি ড্যামেজ হিসেবে মার্ক করতে পারে।",
          "b": "ব্রাঞ্চ ট্রান্সফারে সরাসরি স্টক না বাড়িয়ে ৩টি ধাপে কাজ হয়: ট্রান্সফার শুরু, ট্রানজিট পুল এবং প্রাপক ব্রাঞ্চ পণ্য গুনে রিসিভ করার পর স্টকে যোগ হওয়া। ফলে পথে পণ্য চুরির কোনো সুযোগ থাকে না।",
          "e": "Dokani manages multi-branch stock movements via a three-phase transfer lifecycle: Dispatched stock decrements the origin warehouse and enters an IN_TRANSIT escrow state. The destination branch physically audits units before approving the transfer, incrementing local stock upon receipt while capturing in-transit discrepancies as Damages.",
          "code": "// Transfer state transition:\nPENDING -> IN_TRANSIT -> RECEIVED (or REJECTED)"
        },
        {
          "lvl": "lvl1",
          "q": "Dokani-তে 'Damage & Waste Management (নষ্ট বা ক্ষতিগ্রস্থ পণ্যের হিসাব)' কীভাবে মূলধনের ক্ষতি হিসেবে রেকর্ড হয়?",
          "m": "দোকানে পণ্য ভাঙতে পারে, ইঁদুরে কাটতে পারে বা তারিখ চলে যেতে পারে। Dokani-তে ড্যামেজ এন্ট্রি দিলে: (১) ইনভেন্টরি থেকে নষ্ট হওয়া পণ্যের স্টক তাৎক্ষণিকভাবে বিয়োগ হয় যাতে তা আর বিক্রির জন্য না দেখায়। (২) ফিনান্সিয়াল লেজারে ওই পণ্যের কেনা দাম (Cost Price) অনুযায়ী `Inventory Loss / Damage Expense (ক্ষতি)` হিসেবে অ্যাকাউন্ট ডেবিট হয় এবং মূল ইনভেন্টরি অ্যাসেট ক্রেডিট হয়। (৩) মাস শেষে ওনার দেখতে পারেন কোন কর্মীর অসাবধানতায় বা কোন পণ্যে কত টাকার ড্যামেজ হয়েছে এবং সাপ্লায়ার থেকে কোনো ক্ষতিপূরণ ক্লেইম করা যাবে কি না।",
          "b": "ড্যামেজ পণ্য ইনভেন্টরি থেকে বাদ দেওয়ার সাথে সাথে ফিনান্সিয়াল লেজারে কস্ট প্রাইস অনুযায়ী ড্যামেজ খরচ ডেবিট হয়। ফলে লাভ-ক্ষতির চূড়ান্ত হিসাবে নষ্ট হওয়া মালের ক্ষতি সঠিকভাবে প্রদর্শিত হয়।",
          "e": "Reporting damaged goods decrements physical stock while booking an Expense entry into the General Ledger (Debiting Inventory Shrinkage/Loss, Crediting Inventory Assets) evaluated at Cost Price. This prevents phantom inventory while reflecting genuine operating profit margins.",
          "tip": "বলো: 'Damage write-offs evaluate at Cost Price, debiting Inventory Loss expense in the General Ledger.'"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে 'Physical Stock Audit / Stock Reconciliation' কীভাবে পরিচালিত হয় এবং সিস্টেম বনাম বাস্তব স্টকের অমিল কীভাবে সমাধান করা হয়?",
          "m": "মাসে বা বছরে একবার দোকানদাররা বন্ধ রেখে ফিজিক্যাল স্টক গুনে (Physical Stock Count)। Dokani-র রিকনসিলিয়েশন মডিউলে: (১) স্টাফরা বারকোড স্ক্যানার দিয়ে তাকের প্রতিটি পণ্য গুনে সিস্টেমে বাস্তব সংখ্যা ইনপুট দেয়। (২) Dokani রিয়েল-টাইমে একটি তুলনামূলক অডিট শিট তৈরি করে: `System Stock = 50`, `Physical Count = 46` -> `Discrepancy = -4 (ঘাটতি)`। (৩) ওনার বা ম্যানেজারের অনুমোদন ছাড়া এই স্টক পরিবর্তন করা যায় না। (৪) ওনার পাসওয়ার্ড দিলে সিস্টেম স্বয়ংক্রিয়ভাবে স্টক ৪৬-এ অ্যাডজাস্ট করে এবং ঘাটতি হওয়া ৪টি পণ্যের মূল্যের জন্য একটি `Stock Variance Adjustment` লেজার এন্ট্রি রেকর্ড করে রাখে।",
          "b": "ফিজিক্যাল অডিটে আসল মালের সংখ্যার সাথে সিস্টেমের সংখ্যার তুলনা করে ঘাটতি বা উদ্বৃত্তের রিপোর্ট বের করা হয়। ওনারের পিন অ্যাপ্রুভাল সাপেক্ষে সিস্টেম স্টক আপডেট করে এবং ভ্যারিয়েন্স লেজার তৈরি করে হিসাব মেলায়।",
          "e": "Dokani's Stock Reconciliation module audits physical shelf counts against ledger records. The engine computes variance deltas (e.g. -4 units). Manager approval commits an atomic Stock Variance Adjustment transaction, resetting active stock counts and booking shrinkage into profit/loss journals.",
          "code": "const variance = physicalCount - systemStock;\nawait tx.stockAdjustment.create({\n  data: { productId, branchId, variance, reason: 'ANNUAL_AUDIT' }\n});"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে 'Product Bundling / Combo Packs (কম্বো অফার)' ইনভেন্টরি থেকে কীভাবে স্টক ডিডাক্ট করে?",
          "m": "দোকানে ঈদ বা উৎসবে কম্বো অফার থাকে (যেমন '১টি শার্ট + ১টি প্যান্ট + ১টি বেল্ট = ৩,৫০০ টাকা')। স্কিমা আর্কিটেকচার: কম্বো প্যাক একটি ভার্চুয়াল প্রোডাক্ট হিসেবে তৈরি হয় যার নিজস্ব কোনো ফিজিক্যাল স্টক সংখ্যা থাকে না! এর বদলে এটি একটি `bundle_items` টেবিলের সাথে যুক্ত থাকে যা চাইল্ড প্রোডাক্টগুলোর আইডি ও অনুপাত নির্দিষ্ট করে। ক্যাশিয়ার যখন কম্বো প্যাকটি বারকোড স্ক্যান করে বিক্রি করে, Dokani ব্যাকএন্ড অ্যাটমিকালি ৩টি পৃথক আসল প্রোডাক্টের স্টক থেকে ১টি করে বিয়োগ করে দেয়। ফলে কম্বো বিক্রির পরও কোনো ইনভেন্টরি অসঙ্গতি ঘটে না।",
          "b": "কম্বো প্যাকের নিজস্ব কোনো আলাদা স্টক থাকে না। কম্বো বিক্রি হলে সিস্টেম স্বয়ংক্রিয়ভাবে কম্বোর ভেতরের প্রতিটি মূল প্রোডাক্টের স্টক থেকে উপাদান অনুযায়ী আলাদা আলাদা স্টক কেটে নেয়।",
          "e": "Dokani models Combo Bundles as virtual composite entities linked to parent components via a bundle_items relation. Finalizing a combo sale cascades atomic stock deductions across all constituent child items (e.g. 1 shirt, 1 pant, 1 belt), maintaining real-time physical inventory accuracy.",
          "code": "for (const component of bundle.components) {\n  await decrementStock(component.childProductId, component.quantity * soldComboQty);\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে প্রোডাক্টের কস্ট প্রাইস ক্যালকুলেশনে 'Weighted Average Cost (WAC)' বনাম 'FIFO Costing' কীভাবে কাজ করে?",
          "m": "দোকানদার যখন একই চাল গত সপ্তাহে কিনেছিল ৫০ টাকা কেজিতে এবং এই সপ্তাহে কিনেছে ৬০ টাকা কেজিতে, তখন তার আসল লাভ কীভাবে হিসেব হবে? Dokani `Weighted Average Cost (WAC)` মেথড সমর্থন করে: নতুন পারচেজের সাথে সাথে গড় কস্ট প্রাইস স্বয়ংক্রিয়ভাবে রি-ক্যালকুলেট হয়: `New Avg Cost = (Old Stock * Old Cost + New Stock * New Cost) / Total Stock`। ক্যাশিয়ার যখন বিক্রি করে, সিস্টেম এই ওয়েটেড কস্ট প্রাইস বিয়োগ করে নিট গ্রস প্রফিট হিসেব করে। এর ফলে চালের দাম ওঠানামা করলেও ব্যবসায়িক লাভ-ক্ষতির হিসাব সবসময় শতভাগ বাস্তবসম্মত ও নির্ভুল থাকে।",
          "b": "বিভিন্ন সময়ে ভিন্ন দামে পণ্য কেনা হলে ওয়েটেড এভারেজ কস্ট (WAC) ফর্মুলা দিয়ে গড় কেনা দাম নির্ধারণ করা হয়। বিক্রির সময় এই গড় কেনা দাম বিয়োগ করে সঠিক নিট মুনাফা ক্যালকুলেট করা হয়।",
          "e": "When purchase costs fluctuate over time, Dokani applies Weighted Average Costing (WAC): New WAC = ((Current Units * Existing Cost) + (New Units * New Cost)) / Total Combined Units. Checkout profit calculations derive margins from this updated WAC, ensuring realistic GAAP-compliant accounting.",
          "code": "const newAvgCost = ((currentQty * currentCost) + (incomingQty * incomingCost)) / (currentQty + incomingQty);"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে 'Serial Number / IMEI Tracking (মোবাইল ও ইলেকট্রনিক্স)' ইনভেন্টরি কীভাবে পরিচালিত হয়?",
          "m": "মোবাইল ফোন বা ল্যাপটপ সাধারণ সাবানের মতো বিক্রি করা যায় না—প্রতিটি নির্দিষ্ট ফোনের একটি অনন্য ১৫ ডিজিটের IMEI বা সিরিয়াল নম্বর থাকে যা ওয়ারেন্টির জন্য আবশ্যক। Dokani-তে প্রোডাক্টের `has_serial_tracking: true` ফ্ল্যাগ থাকে। পারচেজের সময় প্রতিটি আইটেমের ইউনিক IMEI স্ক্যান করে ডেটাবেজে `product_serials` টেবিলে `AVAILABLE` স্ট্যাটাসে রাখা হয়। বিক্রির সময় ক্যাশিয়ার যখন ওই নির্দিষ্ট ফোনের IMEI স্ক্যান করে, সিস্টেম ওই সিরিয়াল নম্বরটিকে `SOLD` মার্ক করে এবং ইনভয়েসে প্রিন্ট করে দেয়। কোনো কাস্টমার ওয়ারেন্টি নিয়ে আসলে সিরিয়াল নম্বর সার্চ করলেই ইনভয়েস ও ওয়ারেন্টির মেয়াদ মুহূর্তেই স্ক্রিনে চলে আসে।",
          "b": "মোবাইল ও ইলেকট্রনিক্সের ক্ষেত্রে প্রতিটি অনন্য IMEI বা সিরিয়াল নম্বর ট্র্যাক করা হয়। বিক্রির সময় সিরিয়াল নম্বর ইনভয়েসে প্রিন্ট হয় যা পরবর্তীতে ওয়ারেন্টি যাচাই ও আফটার-সেলস সার্ভিসে ব্যবহৃত হয়।",
          "e": "Electronics retail enforces item-level serialization via product_serials tables. Receiving inventory requires scanning individual IMEI/Serial barcodes stored as AVAILABLE. POS billing binds the scanned serial directly to the customer invoice line, transitioning status to SOLD for seamless warranty lookup.",
          "tip": "বলো: 'Serial and IMEI tracking binds individual hardware units to customer invoices for automated warranty validation.'"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে সাপ্লায়ার পারচেজ অর্ডার (Purchase Order / Supplier GRN) এবং পেমেন্ট ডিউ কীভাবে ইনভেন্টরির সাথে সংযুক্ত?",
          "m": "সাপ্লায়ার থেকে মালামাল কেনার সম্পূর্ণ সাইকেল: (১) ম্যানেজার একটি `Purchase Order (PO)` তৈরি করে সাপ্লায়ারকে পাঠায়। (২) পণ্য দোকানে পৌঁছালে গুদামে মালামাল গুনে `Goods Received Note (GRN)` কনফার্ম করা হয়; সাথে সাথে ইনভেন্টরি স্টকে নতুন মালামাল যোগ হয়। (৩) সাপ্লায়ারের বিল পরিশোধ: যদি ক্যাশ দেওয়া হয় তবে ক্যাশ ড্রয়ার কমে; আর যদি বাকি থাকে তবে সাপ্লায়ারের `Accounts Payable (দেনা)` লেজারে ক্রেডিট ব্যালেন্স তৈরি হয়। (৪) পরবর্তীতে সাপ্লায়ারকে ব্যাংক বা চেকে পেমেন্ট দিলে সাপ্লায়ারের লেজার স্বয়ংক্রিয়ভাবে আপডেট হয়ে দেনা কমে যায়। সম্পূর্ণ ক্রয় প্রক্রিয়া ইনভেন্টরি ও লেজারের সাথে ওতপ্রোতভাবে যুক্ত থাকে।",
          "b": "সাপ্লায়ার থেকে মাল গ্রহণ করলে স্টকে যোগ হয় এবং সাপ্লায়ারের দেনা লেজার স্বয়ংক্রিয়ভাবে আপডেট হয়। পরবর্তীতে টাকা পরিশোধ করলে দেনা ব্যালেন্স কমে গিয়ে সঠিক হিসাব সংরক্ষিত থাকে।",
          "e": "Supplier procurement moves from Purchase Order to Goods Received Note (GRN). Confirming a GRN increments physical branch stock atomically and generates an Accounts Payable ledger liability for unpaid balances, reconciling automatically upon cash or bank supplier settlements.",
          "code": "await prisma.$transaction(async (tx) => {\n  await tx.branchStock.update({ ... });\n  await tx.supplierLedger.create({ data: { type: 'PURCHASE_PAYABLE', amount: totalBill } });\n});"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani-তে রো-লেভেল লকিং বনাম অপটিমিস্টিক কনকারেন্সি: কোন পরিস্থিতিতে কোনটি ব্যবহার করা হয়েছে?",
          "m": "দোকানি আর্কিটেকচারে পারফরম্যান্স ও কনসিস্টেন্সির নিখুঁত ব্যালেন্স রয়েছে: (১) `Pessimistic Locking (SELECT ... FOR UPDATE)`: ব্যবহার করা হয়েছে লাইভ পিওএস বিলিং ও স্টক ডিডাকশনের সময়—যেখানে কনকারেন্সি খুব বেশি এবং স্টক কোনোভাবেই নেগেটিভ হতে দেওয়া যাবে না। (২) `Optimistic Concurrency Control (Version Key)`: ব্যবহার করা হয়েছে প্রোডাক্ট ক্যাটালগ এডিট ও প্রাইজ পরিবর্তনের ক্ষেত্রে (`WHERE version = 5`)—যেখানে একাধিক ম্যানেজার একই সাথে প্রোডাক্টের নাম বা বিবরণ এডিট করতে পারে কিন্তু কনফ্লিক্টের সম্ভাবনা খুব কম। ফলে সাধারণ এডিটিংয়ে কোনো ডাটাবেজ লক ওভারহেড থাকে না, কিন্তু স্টক কাটার সময় শতভাগ রো-লেভেল সিকিউরিটি বজায় থাকে।",
          "b": "লাইভ সেলস ও স্টক কাটার ক্ষেত্রে পেসিমিস্টিক লক (FOR UPDATE) ব্যবহার করা হয়েছে যাতে স্টক মাইনাস না হয়। আর প্রোডাক্টের নাম বা দাম এডিটের ক্ষেত্রে অপটিমিস্টিক লক ব্যবহার করে পারফরম্যান্স সর্বোচ্চ রাখা হয়েছে।",
          "e": "Dokani balances concurrency models: High-contention checkout stock deductions enforce Pessimistic row-level locking (SELECT FOR UPDATE) to eliminate race-condition overselling. Low-contention administrative catalog modifications leverage Optimistic Concurrency via version integers to avoid unnecessary database lock holds.",
          "tip": "বলো: 'Pessimistic locking protects live checkout stock decrements; Optimistic locking governs admin catalog updates.'"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani-তে আনবাউন্ডেড ইনভেন্টরি গ্রোথ: ৫ বছর পর কোটি কোটি সেলস ও স্টক মুভমেন্ট রেকর্ডের মাঝে ডেটাবেজ পার্টিশনিং কীভাবে সাজাবে?",
          "m": "৫ বছর পর `inventory_movements` এবং `invoices` টেবিলে কোটি কোটি রো জমে ডেটাবেজ স্লো হতে পারে। সমাধান: আমরা PostgreSQL-এর `Declarative Range Partitioning` প্রয়োগ করি: `PARTITION BY RANGE (created_at)`। প্রতি বছরের জন্য আলাদা পার্টিশন টেবিল তৈরি থাকে (যেমন `invoices_2026`, `invoices_2027`)। ক্যাশিয়ার যখন আজকের সেলস চালায়, কুয়েরি ইঞ্জিন মুহূর্তেই অতীতের ৪ বছরের কোটি রো বাদ দিয়ে শুধুমাত্র বর্তমান ২০২৬ সালের পার্টিশন টেবিলে হিট করে। পুরনো পার্টিশনগুলোকে আলাদা কমদামি স্টোরেজে আর্কাইভ করা যায় এবং ভ্যাকুয়ামিং স্পিড সুপারফাস্ট থাকে।",
          "b": "কোটি কোটি রো জমলে PostgreSQL Range Partitioning দিয়ে প্রতি বছরের সেলস ও স্টক আলাদা সাব-টেবিলে ভাগ করা হয়। ফলে কুয়েরি শুধু বর্তমান বছরের টেবিলে হিট করে এবং ডেটাবেজ চিরকাল সুপারফাস্ট থাকে।",
          "e": "Scale massive multi-year inventory ledgers via PostgreSQL Declarative Range Partitioning by created_at. Active POS queries prune historical partitions, isolating disk scans to the current year's table, maintaining sub-3ms lookups while isolating aged partitions for archive storage.",
          "code": "CREATE TABLE inventory_movements (\n  id UUID NOT NULL,\n  tenant_id UUID NOT NULL,\n  created_at TIMESTAMPTZ NOT NULL,\n  quantity INT\n) PARTITION BY RANGE (created_at);\nCREATE TABLE inv_mov_2026 PARTITION OF inventory_movements \n  FOR VALUES FROM ('2026-01-01') TO ('2027-01-01');"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani-তে সাপ্লায়ার ব্যাক-অর্ডার ও স্টক রিজার্ভেশন (Stock Reservation Architecture): অনলাইন অর্ডার ও অফলাইন দোকানের স্টক কীভাবে সিঙ্ক রাখবে?",
          "m": "যেসব দোকানের একই সাথে অফলাইন শোরুম এবং অনলাইন ই-কমার্স স্টোর আছে, সেখানে অনলাইন কাস্টমার কোনো পণ্য কার্টে নিলে যদি অফলাইনের ক্যাশিয়ার তা বিক্রি করে দেয় তবে মারাত্মক কনফ্লিক্ট হবে! Dokani-র স্টক রিজার্ভেশন আর্কিটেকচার: (১) প্রতিটি প্রোডাক্টের ৩টি স্টক ফিল্ড থাকে: `Total Physical Stock`, `Reserved Stock` (অনলাইন কার্ট ও পেন্ডিং অর্ডার), এবং `Available for Sale = Total - Reserved`। (২) অনলাইন কাস্টমার অর্ডার প্লেস করলে ১০ মিনিটের জন্য স্টক রিজার্ভ হয়। (৩) অফলাইন ক্যাশিয়ার শুধু `Available for Sale` স্টক বিক্রি করতে পারে। (৪) পেমেন্ট সম্পন্ন হলে রিজার্ভ স্টক পার্মানেন্ট ডিডাক্ট হয়; পেমেন্ট ফেইল করলে ১০ মিনিট পর রেডিস এক্সপায়ারি দিয়ে রিজার্ভ স্টক স্বয়ংক্রিয়ভাবে মূল পুলে ফেরত চলে আসে।",
          "b": "অনলাইন ও অফলাইনের যৌথ স্টকে 'Reserved Stock' মেকানিজম ব্যবহার করা হয়েছে। অনলাইনে অর্ডার হলে স্টক সাময়িক রিজার্ভ থাকে, ফলে অফলাইন ক্যাশিয়ার সেই পণ্য বিক্রি করতে পারে না এবং কোনো অর্ডার ক্যানসেল হয় না।",
          "e": "Omnichannel inventory integrates a three-tier stock model: Physical Stock, Reserved Stock, and Available Stock (Available = Physical - Reserved). Online orders reserve stock in Redis with a 10-minute TTL. Brick-and-mortar cashiers are constrained strictly to Available Stock, preventing cross-channel stock collisions.",
          "tip": "বলো: 'Omnichannel inventory prevents conflicts via Available = Physical - Reserved stock calculations with Redis TTL reservations.'"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani-তে Dead Stock ও Slow-Moving Inventory অ্যালগরিদম কীভাবে মার্চেন্টের ক্যাশ ফ্লো বাঁচাতে সাহায্য করে?",
          "m": "দোকানের সবচেয়ে বড় নীরব ঘাতক হলো অবিক্রীত স্টক যা তাকের ওপর মাসের পর মাস পড়ে থেকে লাখ লাখ টাকার ক্যাশ ফ্লো আটকে রাখে। Dokani-র অটোমেটেড ইনভেন্টরি অ্যানালিটিক্স পাইপলাইন: (১) সিস্টেম গত ৯০ দিনের সেলস হিস্ট্রি বিশ্লেষণ করে প্রতিটি পণ্যের 'Daily Burn Rate' বের করে। (২) যেসব পণ্যের স্টক ৩০টির বেশি কিন্তু গত ৪৫ দিনে ১টিও বিক্রি হয়নি, সেগুলোকে `DEAD_STOCK` ক্যাটাগরিতে ফেলে ওনারের ড্যাশবোর্ডে পুশ করে। (৩) সিস্টেম মার্চেন্টকে রিকমেন্ড করে: 'এই প্রোডাক্টগুলোতে ২০% ছাড় দিয়ে দ্রুত বিক্রি করে ক্যাশ টাকা বের করে আনুন অথবা সাপ্লায়ারকে রিটার্ন দিন।' এটি দোকানের ক্যাশ ফ্লো ও মুনাফা উল্লেখযোগ্য হারে বাড়িয়ে দেয়।",
          "b": "গত ৪৫ দিনে যেসব পণ্য একটিও বিক্রি হয়নি কিন্তু স্টকে পড়ে আছে সেগুলোকে ডেড স্টক হিসেবে শনাক্ত করে ছাড় দিয়ে বা ফেরত দিয়ে মূলধন বের করার জন্য ওনারকে অটোমেটেড পরামর্শ দেওয়া হয়।",
          "e": "Dokani's inventory analytics identifies capital trapped in stagnant goods. Computing 90-day velocity, items retaining stock with zero sales in 45 days are flagged as Dead Stock on owner portals, recommending automated clearance discounts to unlock working capital.",
          "code": "SELECT product_id, stock_quantity, \n       MAX(created_at) as last_sale_date\nFROM sales_items \nGROUP BY product_id \nHAVING MAX(created_at) < NOW() - INTERVAL '45 days';"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani-তে স্টক অ্যাডজাস্টমেন্ট ও ইনভেন্টরি ট্র্যাকিংয়ে ফ্রড ডিটেকশন রুলস কীভাবে তৈরি করা হয়েছে?",
          "m": "অনেক অসাধু স্টাফ ইচ্ছাকৃতভাবে ভালো প্রোডাক্টকে 'ড্যামেজ' বা 'ঘাটতি' দেখিয়ে গোপনে চুরি করে বাইরে বিক্রি করে দেয়। Dokani-র ফ্রড ডিটেকশন সিস্টেম: (১) কোনো স্টাফ যদি স্বাভাবিক গড়ের চেয়ে বেশি ড্যামেজ এন্ট্রি দেয় (যেমন সাধারণ ড্যামেজ ০.৫% কিন্তু সে ৫% ড্যামেজ দেখাল), সিস্টেম সাথে সাথে একটি `High Damage Anomaly Alert` জেনারেট করে সরাসরি ওনারের ফোনে পাঠায়। (২) যে স্টাফ ড্যামেজ এন্ট্রি দিচ্ছে তাকে ড্যামেজ পণ্যের ছবি মোবাইল ক্যামেরা দিয়ে সরাসরি আপলোড করতে বাধ্য করা যায়। (৩) ম্যানেজার ও ওনারের ডুয়াল সাইন-অফ ছাড়া কোনো বড় ইনভেন্টরি রাইট-অফ লেজারে চূড়ান্ত হতে পারে না।",
          "b": "স্টাফদের পণ্য চুরি রোধে অস্বাভাবিক ড্যামেজ এন্ট্রিতে ওনারের ফোনে এলার্ট পাঠানো হয়, ড্যামেজ মালের ছবি আপলোড বাধ্য করা হয় এবং ওনারের অনুমোদন ছাড়া কোনো বড় অ্যাডজাস্টমেন্ট অনুমোদন পায় না।",
          "e": "Dokani enforces fraud mitigation on stock write-offs: Statistical anomaly algorithms flag inventory write-offs exceeding standard thresholds (>1.5% of shift volume). Write-offs mandate attaching photographic evidence captured via device cameras, requiring dual-factor manager PIN authorization.",
          "tip": "বলো: 'Automated shrinkage anomaly alerts and mandatory photographic evidence mitigate internal inventory theft.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি কাপড়ের দোকানে একটি জনপ্রিয় শার্টের স্টক সফটওয়্যারে দেখাচ্ছে ০ পিস, কিন্তু দোকানের সেলফে ফিজিক্যালি ১টি শার্ট ঝুলছে! ক্যাশিয়ার বিক্রি করতে গেলে সিস্টেম 'Out of Stock' এরর দিয়ে বিল আটকে দিচ্ছে। ক্যাশিয়ার কীভাবে তাৎক্ষণিকভাবে কাস্টমারকে বিল করে বিদায় করবে এবং স্টক মেলাবে?",
          "m": "সমাধান: (১) কাস্টমারকে ফিরিয়ে দেওয়া যাবে না! Dokani-তে ওনার কনফিগে একটি অপশন থাকে: `Allow Negative Billing (নেগেটিভ স্টক বিক্রি অনুমতি)`। যদি এটি অন থাকে, ক্যাশিয়ার একটি সতর্কবার্তা দেখে বিল সম্পন্ন করতে পারে এবং স্টক সাময়িক `-1` হবে। (২) যদি নেগেটিভ বিলিং কঠোরভাবে বন্ধ থাকে, ক্যাশিয়ার 'Emergency Stock Override' দিয়ে ম্যানেজারের ৪ ডিজিটের পিন নিয়ে ১ পিস স্টক তৎক্ষণাৎ অ্যাডজাস্ট করে ইনভয়েস কনফার্ম করবে। (৩) পরবর্তীতে দিনের শেষে ইনভেস্টিগেট করে দেখা যাবে হয়তো সাপ্লায়ারের পারচেজ চালান এন্ট্রি করতে কোনো স্টাফ ভুলে গিয়েছিল—চালানটি এন্ট্রি করা মাত্রই স্টক স্বয়ংক্রিয়ভাবে স্বাভাবিক ব্যালেন্সে সিঙ্ক হয়ে যাবে।",
          "b": "কাস্টমার ফিরিয়ে না দিয়ে ম্যানেজারের পিন দিয়ে তাৎক্ষণিক ১টি স্টক অ্যাডজাস্ট করে বিক্রি সম্পন্ন করা হবে। পরবর্তীতে সাপ্লায়ারের পারচেজ চালান এন্ট্রি দিয়ে মূল ইনভেন্টরি ঠিক করা হবে।",
          "e": "When physical inventory exists despite zero system balance, execute an authorized Manager PIN Stock Adjustment or invoke tenant-configurable Negative Billing to finalize the checkout without turning the customer away. Later, reconcile the missing supplier GRN purchase record to restore ledger balance.",
          "tip": "বলো: 'Never lose a sale: authorize an instant Manager PIN Stock Override, then backfill the missing purchase GRN.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: দুজন ক্যাশিয়ার একই সেকেন্ডে শেষ ১টি ল্যাপটপ বিক্রি করার জন্য 'Enter' চাপল। সিস্টেম কী আচরণ করবে এবং দ্বিতীয় ক্যাশিয়ার কী মেসেজ দেখবে?",
          "m": "সিস্টেমের আচরণ: (১) দুটি রিকোয়েস্ট ব্যাকএন্ডে পৌঁছানোর পর ডেটাবেজ লেভেলে `SELECT stock FROM branch_stocks WHERE id = $1 FOR UPDATE` পেসিমিস্টিক লক কার্যকর হবে। (২) প্রথম যে ক্যাশিয়ারের রিকোয়েস্টটি ১ মিলিসেকেন্ড আগে পৌঁছাবে, ডেটাবেজ তাকে রো লক দেবে। সিস্টেম স্টক ১ থেকে ০ করে তার ইনভয়েস সফলভাবে সেভ করবে এবং রিসিট প্রিন্ট হবে। (৩) প্রথম ক্যাশিয়ার কমিট করার পর দ্বিতীয় ক্যাশিয়ার লক পাবে। সে দেখবে বর্তমান স্টক `০` (রিকোয়েস্টেড ১ পিসের চেয়ে কম)। সিস্টেম তাৎক্ষণিকভাবে ট্রানজ্যাকশন বাতিল করবে এবং দ্বিতীয় ক্যাশিয়ারের স্ক্রিনে লাল ওয়ার্নিং দেখাবে: `Stock Exhausted: This item was just sold out by Terminal 1!`। কোনো ডাবল সেল ঘটবে না।",
          "b": "পেসিমিস্টিক লকের কারণে প্রথম ক্যাশিয়ারের বিক্রি সফল হবে এবং স্টক ০ হবে। দ্বিতীয় ক্যাশিয়ারের স্ক্রিনে সাথে সাথে মেসেজ আসবে: 'স্টক শেষ! এইমাত্র অন্য টার্মিনাল থেকে পণ্যটি বিক্রি হয়ে গেছে।'",
          "e": "PostgreSQL's SELECT FOR UPDATE serializes access: Terminal 1 acquires the lock, decrements stock from 1 to 0, and commits successfully. Terminal 2 then evaluates stock as 0, aborting with a clean error: 'Item sold out concurrently on Terminal 1', preventing physical overselling.",
          "code": "// Returned to Terminal 2:\n{ status: 409, error: 'INSUFFICIENT_STOCK', message: 'Item was just sold out by Terminal 1' }"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি ডিপার্টমেন্টাল স্টোরে সাপ্লায়ার ৫০ কার্টন কোমল পানীয় সরবরাহ করেছে। কিন্তু চালানে ভুলবশত দাম লেখা হয়েছে বেশি এবং স্টাফ তা ভেরিফাই না করেই ইনভেন্টরিতে রিসিভ করে ফেলেছে। এখন কীভাবে ইনভেন্টরি স্টক ও সাপ্লায়ার দেনা সংশোধন করবে?",
          "m": "সংশোধন প্রক্রিয়া: (১) সরাসরি ডেটাবেজে গিয়ে ডিলিট করা নিষিদ্ধ কারণ এতে অডিট ট্রেইল ভেঙে যাবে। (২) Dokani-তে `Purchase Return / Debit Note` তৈরি করতে হবে। (৩) ভুল মূল্যের ৫০ কার্টনের বিপরীতে একটি ডেবিট নোট ইস্যু করে সাপ্লায়ারের দেনা লেজার থেকে অতিরিক্ত টাকা কমিয়ে সঠিক ব্যালেন্সে আনা হবে। (৪) প্রোডাক্টের কস্ট প্রাইস সংশোধিত মূল্যে স্বয়ংক্রিয়ভাবে রি-ক্যালকুলেট হয়ে যাবে। ফলে ইনভেন্টরি ও সাপ্লায়ারের হিসাব ১০০% স্বচ্ছভাবে ঠিক হয়ে যাবে।",
          "b": "ভুল চালানের জন্য ডেবিট নোট (Debit Note) তৈরি করে সাপ্লায়ারের দেনা কমিয়ে সঠিক মূল্যে নিয়ে আসা হবে এবং কস্ট প্রাইস পুনরায় হিসাব করা হবে। কোনো ম্যানুয়াল ডিলিট ছাড়া হিসাববিজ্ঞান রক্ষা করা হবে।",
          "e": "Issue a Purchase Return / Debit Note against the erroneous Purchase Order. The debit note adjusts Accounts Payable to the genuine figure, recalibrates the product's Weighted Average Cost, and preserves full GAAP compliance without deleting historical records.",
          "tip": "বলো: 'Correct vendor pricing errors via formal Debit Notes rather than modifying historic purchase records.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি চালের আড়তে বৃষ্টির পানিতে ভিজে ১০ বস্তা চাল নষ্ট হয়ে গেছে। ওনার সফটওয়্যারে কীভাবে এন্ট্রি দেবে যাতে স্টকও কমে এবং লাভ-ক্ষতির চূড়ান্ত হিসাবেও ক্ষতি হিসেবে প্রদর্শিত হয়?",
          "m": "এন্ট্রি ধাপসমূহ: (১) Dokani-র 'Inventory > Stock Adjustment & Damage' ট্যাবে যাবে। (২) প্রোডাক্ট সিলেক্ট করবে 'মিনিকেট চাল', কোয়ান্টিটি দিবে '১০ বস্তা', এবং কারণ হিসেবে ড্রপডাউন থেকে সিলেক্ট করবে `WATER_DAMAGE (প্রাকৃতিক ক্ষতি)`। (৩) ওনারের কনফার্মেশনের সাথে সাথে ইনভেন্টরি থেকে ১০ বস্তা চাল বাদ যাবে। (৪) চালের কেনা দাম অনুযায়ী (যেমন প্রতি বস্তা ২,৫০০ টাকা হলে মোট ২৫,০০০ টাকা) স্বয়ংক্রিয়ভাবে ফিনান্সিয়াল লেজারে `Inventory Loss Expense` ডেবিট হবে এবং ইনভেন্টরি অ্যাসেট ক্রেডিট হবে। মাস শেষে প্রফিট-অ্যান্ড-লস রিপোর্টে এই ২৫,০০০ টাকা ক্ষতি হিসেবে প্রদর্শিত হয়ে ট্যাক্স ও নিট লাভ নিখুঁতভাবে সমন্বয় করবে।",
          "b": "Stock Damage অপশনে গিয়ে WATER_DAMAGE সিলেক্ট করে ১০ বস্তা চাল বাদ দেওয়া হবে। কস্ট প্রাইস অনুযায়ী ২৫,০০০ টাকা ক্ষতি হিসেবে লেজারে ডেবিট হবে এবং প্রফিট-লস রিপোর্টে সঠিক ক্ষতি প্রদর্শিত হবে।",
          "e": "Execute a Stock Damage write-off flagged as WATER_DAMAGE for 10 bags. Dokani decrements physical stock and posts an automated General Ledger journal entry debiting Inventory Shrinkage Expense (10 * Cost Price = 25,000 BDT) and crediting Inventory Assets, reflecting the net loss on the income statement.",
          "code": "// Auto Journal Entry:\nDebit: Inventory Loss Expense (25,000 BDT)\nCredit: Inventory Asset (25,000 BDT)"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একটি ওষুধের দোকানে একজন স্টাফ ওষুধ বিক্রি করার সময় মেয়াদোত্তীর্ণ হওয়ার কাছাকাছি থাকা ব্যাচের বদলে ভুলবশত নতুন ব্যাচের ওষুধ বিক্রি করে দিয়েছে, ফলে পুরনো ব্যাচটি নষ্ট হওয়ার ঝুঁকিতে পড়েছে। Dokani-তে কীভাবে এটি স্বয়ংক্রিয়ভাবে ব্লক করবে?",
          "m": "প্রতিরোধ ব্যবস্থা: Dokani-তে 'Strict FEFO Enforcement (বাধ্যতামূলক মেয়াদ ট্র্যাকিং)' পলিসি চালু করা যায়। যখন এটি চালু থাকে, ক্যাশিয়ার স্ক্যান করলেও সিস্টেম স্বয়ংক্রিয়ভাবে তাকে সতর্ক করে: `Warning: Batch B101 expires in 15 days! You cannot dispense Batch B104 (expires in 2 years) before B101 is cleared!`। ক্যাশিয়ার যতক্ষণ না পুরনো ব্যাচের পণ্যটি সেলফ থেকে এনে স্ক্যান করবে, ততক্ষণ সিস্টেম পরবর্তী নতুন ব্যাচ বিক্রি করতেই দেবে না। এটি ফার্মেসির মেয়াদোত্তীর্ণ ওষুধের অপচয় সম্পূর্ণ শূন্যে নামিয়ে আনে।",
          "b": "Strict FEFO পলিসি অন থাকলে সিস্টেম নতুন ব্যাচ স্ক্যান করতে দেয় না এবং সতর্কবার্তা দেয় যে আগের ব্যাচের মেয়াদ দ্রুত শেষ হবে। ফলে স্টাফ পুরনো ওষুধ আগে বিক্রি করতে বাধ্য থাকে এবং ক্ষতি এড়ানো যায়।",
          "e": "Enforce Strict FEFO (First Expired, First Out) validation in POS settings. When cashiers scan newer batches, the system rejects the line item, prompting: 'Batch B101 expires earlier; clear B101 before dispensing newer inventory'. This eliminates shelf expiry waste in pharmacies.",
          "tip": "বলো: 'Strict FEFO policy blocks dispensing newer batches until near-expiry shelf batches are exhausted.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে একাধিক আউটলেটের সমন্বিত ইনভেন্টরি ড্যাশবোর্ড ও ইন্টার-ব্রাঞ্চ স্টক ট্রান্সফার কীভাবে মার্চেন্টদের কোটি টাকার ইনভেন্টরি ম্যানেজ করতে সাহায্য করছে?",
          "m": "দোকানি পিওএসে সেন্ট্রালাইজড মাল্টি-ব্রাঞ্চ ইনভেন্টরি আর্কিটেকচার কার্যকর: একজন বড় ফ্যাশন মার্চেন্টের ধানমন্ডি, উত্তরা ও মিরপুরে ৩টি আউটলেট রয়েছে। ওনার তার ড্যাশবোর্ডে এক নজরে দেখতে পারেন কোন শোরুমে কোন সাইজের শার্ট বেশি বিক্রি হচ্ছে এবং কোথায় স্টক কম। যদি উত্তরার দোকানে কোনো সাইজ শেষ হয়ে যায় কিন্তু ধানমন্ডিতে প্রচুর উদ্বৃত্ত থাকে, ম্যানেজার এক ক্লিকে 'Inter-Branch Stock Transfer' রিকোয়েস্ট পাঠায়। ধানমন্ডি থেকে মালামাল ট্রানজিটে গিয়ে উত্তরা রিসিভ করে। কোনো নতুন পারচেজ ছাড়াই মার্চেন্ট তার বিদ্যমান স্টক অপটিমাইজ করে বিক্রি দ্বিগুণ করে ফেলে।",
          "b": "দোকানিতে একাধিক ব্রাঞ্চের স্টক এক স্ক্রিনে দেখা যায়। এক ব্রাঞ্চে মাল শেষ হলে অন্য ব্রাঞ্চ থেকে এক ক্লিকে স্টক ট্রান্সফার করে নেওয়া যায়, ফলে নতুন মাল কেনা ছাড়াই সেলস বাড়ানো সম্ভব হয়।",
          "e": "Dokani's centralized multi-branch inventory empowers retail chains with unified stock visibility across disparate retail outlets. Instant inter-branch transfers rebalance stock from slow-moving stores to high-demand locations, maximizing inventory turns without tying up capital in redundant procurement.",
          "tip": "দোকানির এই মাল্টি-ব্রাঞ্চ ইনভেন্টরি ব্যালেন্সিং বাস্তব ব্যবসায়িক সাফল্যের চমৎকার উদাহরণ।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: পাইকারি চাল ও ডালের আড়তে 'Bags to KG' এবং ওজনের ভগ্নাংশ (Decimal Quantities) হ্যান্ডলিংয়ে Dokani কীভাবে নির্ভুল হিসাব রাখে?",
          "m": "পাইকারি ব্যবসায় পণ্য পূর্ণসংখ্যায় বিক্রি হয় না—যেমন `৫০.৭৫ কেজি` বা `১ বস্তা ২৫০ গ্রাম`। জাভাস্ক্রিপ্টের সাধারণ ফ্লোটিং পয়েন্ট নম্বর সিস্টেমে দশমিক যোগ-বিয়োগে ফ্লোটিং পয়েন্ট বাগ ঘটে (`0.1 + 0.2 = 0.30000000000000004`)! Dokani-তে আর্থিক ও ওজনের কোনো হিসেবেই ফ্লোটিং পয়েন্ট ব্যবহার করা হয় না। আমরা ডেটাবেজে `NUMERIC(12, 3)` (৩ দশমিক স্থান পর্যন্ত গ্রাম প্রিসিশন) এবং কোডে `Big.js` বা `decimal.js` লাইব্রেরি ব্যবহার করি। ৫০ বস্তা চাল থেকে ৫০.২৫ কেজি বিক্রি হলেও ইনভেন্টরি থেকে ১ গ্রামও হেরফের ছাড়া নিখুঁত দশমিক স্টক বিয়োগ হয়।",
          "b": "জাভাস্ক্রিপ্টের দশমিক ভুলের কারণে ভগ্নাংশ ওজনে গরমিল হতে পারে। Dokani ডেটাবেজে NUMERIC(12, 3) এবং কোডে decimal.js ব্যবহার করে গ্রাম লেভেলেও নিখুঁত দশমিক স্টক হিসাব রক্ষা করে।",
          "e": "Wholesale grain trading operates in decimal quantities (50.750 kg). To avoid JavaScript floating-point arithmetic drift (0.1 + 0.2 !== 0.3), Dokani enforces PostgreSQL NUMERIC(12, 3) column types and computes transactions using Decimal.js, guaranteeing sub-gram exactitude.",
          "code": "import Decimal from 'decimal.js';\nconst remainingStock = new Decimal(currentStock).minus(new Decimal(soldKg)).toNumber();"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: বারকোড স্ক্যানার দিয়ে ড্রাগ স্টোরে 'ড্রাগ ইন্টারঅ্যাকশন ও জেনেরিক অল্টারনেটিভ' সাজেশন: Dokani ফার্মা মডিউলে এটি কীভাবে ডিজাইন করা হয়েছে?",
          "m": "দোকানির ফার্মেসি মডিউলে প্রতিটি ওষুধের একটি `generic_name` (যেমন 'Paracetamol') এবং গ্রুপ থাকে। যখন কোনো কাস্টমার এসে বলে 'ভাই নাপা এক্সটেন্ড দেন' কিন্তু নাপা স্টকে শেষ, ক্যাশিয়ার বারকোড স্ক্যান বা সার্চ করলেই সিস্টেম তাৎক্ষণিকভাবে একই জেনেরিকের অন্য সব ইন-স্টক অল্টারনেটিভ ওষুধ (যেমন 'Ace Plus', 'Fast') স্ক্রিনে সাজেশন হিসেবে পপআপ করে এবং তাদের বর্তমান স্টক দেখায়। ক্যাশিয়ার কাস্টমারকে না ফিরিয়ে সাথে সাথে বিকল্প ওষুধটি বিক্রি করতে পারে। এটি ফার্মেসির বিক্রি ২৫% বৃদ্ধি করেছে।",
          "b": "কোনো ওষুধ স্টকে না থাকলে Dokani স্বয়ংক্রিয়ভাবে একই জেনেরিকের অন্যান্য বিকল্প ওষুধ ও তাদের স্টক প্রদর্শন করে। ফলে কাস্টমারকে না ফিরিয়ে ক্যাশিয়ার সাথে সাথে বিকল্প ওষুধ বিক্রি করতে পারে।",
          "e": "Dokani Pharma indexes pharmaceutical drugs by generic compound molecules (e.g. Paracetamol). If a prescribed branded medicine is out of stock, the POS automatically surfaces available same-molecule alternatives (e.g. Ace Plus, Fast) with real-time stock counts, boosting pharmacy fulfillment rates by 25%.",
          "tip": "বলো: 'The pharma generic lookup engine surfaces in-stock substitute molecules when requested brands are stocked out.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: সাপ্লায়ার পেমেন্ট শিডিউলিং ও অটোমেটেড অ্যালার্ট: Dokani-তে সাপ্লায়ারদের দেনা পরিশোধের তারিখ কীভাবে ট্র্যাক হয়?",
          "m": "মার্চেন্টরা সাপ্লায়ারদের কাছ থেকে বাকিতে মালামাল নিয়ে ৩০ বা ৪৫ দিনের চেকে বা ক্যাশে পেমেন্টের শর্ত করে। Dokani-তে প্রতিটি সাপ্লায়ার চালানের সাথে একটি `payment_due_date` যুক্ত থাকে। ড্যাশবোর্ডে ওনার একটি 'Upcoming Supplier Payables' ক্যালেন্ডার দেখতে পান: আগামী ৭ দিনে কোন কোন সাপ্লায়ারকে কত টাকা পরিশোধ করতে হবে। নির্দিষ্ট তারিখের ২ দিন আগে ওনারের মোবাইলে পুশ নোটিফিকেশন যায়। এর ফলে মার্চেন্টের ব্যবসায়িক সুনাম ও ক্রেডিট স্কোর বজায় থাকে এবং সাপ্লায়ারদের সাথে বিশ্বাসযোগ্য সম্পর্ক অটুট থাকে।",
          "b": "সাপ্লায়ারের চালানের সাথে পেমেন্টের শেষ তারিখ সংরক্ষিত থাকে। ড্যাশবোর্ড ক্যালেন্ডারে আগামী সপ্তাহের মোট দেনা প্রদর্শন করা হয় এবং ২ দিন আগে ওনারকে নোটিফিকেশন পাঠিয়ে পেমেন্ট শিডিউল রক্ষা করা হয়।",
          "e": "Dokani tracks trade credit via structured supplier payment due dates. An interactive Payables Aging calendar visualizes upcoming liabilities across 7, 30, and 60-day tranches, dispatching automated reminder pushes to merchant owners before check presentation deadlines.",
          "tip": "বলো: 'Trade credit payables aging schedules prevent merchant default and preserve supplier trust.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Dokani-তে ইনভেন্টরি ট্র্যাকিং সিস্টেম তৈরিতে তোমার সবচেয়ে বড় ইঞ্জিনিয়ারিং চ্যালেঞ্জ কী ছিল এবং কীভাবে তা সমাধান করেছিলে?",
          "m": "সবচেয়ে বড় ইঞ্জিনিয়ারিং চ্যালেঞ্জ ছিল: 'হাজার হাজার দোকানের মাল্টি-টেন্যান্ট ডেটাবেজে পিক আওয়ারে কনকারেন্ট সেলস চলার সময়ও ডেটাবেজ লক স্লো না করে সাব-৩ মিলিসেকেন্ডে স্টক কাটার নিশ্চয়তা দেওয়া।' সমাধান: আমি প্রথমে ক্লায়েন্ট-সাইডে একটি ইন-মেমোরি ক্যাটালগ ক্যাশ তৈরি করি যা বারকোড রিডকে নেটওয়ার্ক-মুক্ত করে। এরপর ব্যাকএন্ডে PostgreSQL-এর `SELECT FOR UPDATE` রো-লেভেল পেসিমিস্টিক লককে অপটিমাইজ করি কম্পাউন্ড ইনডেক্স `(tenant_id, product_id)` দিয়ে—যাতে ডেটাবেজ পুরো টেবিল স্ক্যান না করে সরাসরি ইনডেক্স ট্রি থেকে নির্দিষ্ট রো লক করে ১ মিলিসেকেন্ডে ট্রানজ্যাকশন শেষ করে। এই সমন্বিত ডিজাইনের ফলে সিস্টেমটি এখন কোটি টাকার লেনদেন কোনো কনকারেন্সি ডেডলক বা ওভার-সেলিং ছাড়া মসৃণভাবে পরিচালনা করছে।",
          "b": "সবচেয়ে বড় চ্যালেঞ্জ ছিল পিক আওয়ারে হাজার হাজার বিক্রির মাঝে ডেটাবেজ স্লো না করে স্টক মাইনাস হওয়া শতভাগ রোধ করা। ক্লায়েন্ট-সাইড মেমোরি ক্যাশ এবং কম্পাউন্ড ইনডেক্সযুক্ত পেসিমিস্টিক লকের মাধ্যমে এটি সফলভাবে সমাধান করেছি।",
          "e": "My greatest engineering challenge was maintaining sub-3ms inventory checkout velocity across multi-tenant databases during rush hours without deadlocking or overselling. I solved it by coupling client-side in-memory catalog lookups with surgical compound-indexed PostgreSQL SELECT FOR UPDATE locks, ensuring atomic 1ms ledger finalization under massive concurrency.",
          "tip": "এই চ্যালেঞ্জ ও সমাধানের গল্প ইন্টারভিউয়ারকে তোমার টেকনিক্যাল গভীরতা ও সমস্যার গভীরে যাওয়ার ক্ষমতা প্রমাণ করে দেবে।"
        }
      ]
    },
    {
      "id": "dokani-customer-ledgers-due",
      "name": "Financial Ledgers, Customer Dues & Payment Gateways",
      "desc": "Double-Entry Accounting, Customer Khata & Aging Schedules, bKash/Nagad Webhook Reconciliation, Profit & Loss Statements, Expense Tracking",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Dokani-তে 'Double-Entry Accounting (দ্বৈত দাখিলা হিসাববিজ্ঞান)' কেন অপরিহার্য এবং সাধারণ সিঙ্গেল-এন্ট্রি হিসাবের চেয়ে কেন শক্তিশালী?",
          "m": "সাধারণ সিঙ্গেল-এন্ট্রি সফটওয়্যার শুধুমাত্র একটি প্লাস-মাইনাস ক্যাশ ব্যালেন্স রাখে—যেখানে টাকা কেন কমে গেল বা কার কাছে কত বাকি তা মিলিয়ে দেখা যায় না (অডিট ফ্রড হওয়ার বড় সুযোগ থাকে)। Dokani একটি খাঁটি ডাবল-এন্ট্রি অ্যাকাউন্টিং আর্কিটেকচার মেনে চলে: প্রতিটি আর্থিক ঘটনার জন্য কমপক্ষে দুটি অ্যাকাউন্টে সমান ও বিপরীত এন্ট্রি পড়ে (`Total Debits = Total Credits`)। যেমন: নগদে বিক্রি হলে `Cash (Asset)` ডেবিট হয় এবং `Sales (Revenue)` ক্রেডিট হয়। এর ফলে ব্যালেন্স শিট সবসময় ব্যালেন্স থাকে এবং ব্যবসার একটি পয়সাও হিসাবের বাইরে হারিয়ে যাওয়া অসম্ভব।",
          "b": "দ্বৈত দাখিলা পদ্ধতিতে প্রতিটি লেনদেনে ডেবিট এবং ক্রেডিট সমান থাকে (Debit = Credit)। এটি যেকোনো হিসাবের গরমিল মুহূর্তেই ধরে ফেলে এবং ব্যবসার প্রকৃত সম্পদ, দেনা ও লাভ-ক্ষতির নিখুঁত চিত্র নিশ্চিত করে।",
          "e": "Double-entry bookkeeping is foundational to financial integrity: every transaction affects at least two accounts such that Total Debits strictly equals Total Credits (Assets = Liabilities + Equity). Unlike single-entry math, double-entry ledgers eliminate invisible balance leaks and provide verifiable auditability.",
          "tip": "বলো: 'Dokani enforces double-entry bookkeeping where every transaction maintains Debit = Credit equilibrium.'"
        },
        {
          "lvl": "lvl1",
          "q": "Dokani-তে 'Chart of Accounts (হিসাবের চার্ট)' কীভাবে ৫টি মূল অ্যাকাউন্টিং ক্যাটাগরিতে বিভক্ত?",
          "m": "দোকানির ফিনান্সিয়াল ইঞ্জিন ৫টি মৌলিক ক্যাটাগরি নিয়ে গঠিত: (১) `Assets (সম্পদ)`: ক্যাশ বাক্স, ব্যাংক ব্যালেন্স, কাস্টমারদের কাছে বাকি (Accounts Receivable), ইনভেন্টরি স্টক। (২) `Liabilities (দায়)`: সাপ্লায়ারদের দেনা (Accounts Payable), ব্যাংক লোন। (৩) `Equity (মূলধন)`: দোকান মালিকের নিজস্ব বিনিয়োগ ও রিটেইনড আর্নিংস। (৪) `Revenue (আয়)`: পণ্য বিক্রি থেকে মোট আয় (Sales Revenue), ডেলিভারি চার্জ। (৫) `Expenses (ব্যয়)`: দোকানের ভাড়া, কর্মচারীর বেতন, বিদ্যুৎ বিল, পণ্যের কেনা দাম (COGS), ড্যামেজ ক্ষতি। প্রতিটি ট্রানজ্যাকশন এই ৫টি ক্যাটাগরির নির্দিষ্ট কোডে সংরক্ষিত হয়।",
          "b": "দোকানির হিসাবের চার্ট ৫টি ভাগে বিভক্ত: সম্পদ (ক্যাশ, স্টক, বাকি), দায় (দেনা), মূলধন (মালিকের ইনভেস্টমেন্ট), আয় (বিক্রি), এবং ব্যয় (দোকান ভাড়া, বেতন, বিদ্যুৎ বিল)।",
          "e": "Dokani structures its Chart of Accounts around the standard five GAAP categories: Assets (Cash, Receivables, Inventory), Liabilities (Payables, Loans), Equity (Retained Earnings), Revenue (Sales), and Expenses (COGS, Rent, Utilities, Shrinkage). Every transaction maps deterministically to these categories.",
          "code": "enum AccountType {\n  ASSET,\n  LIABILITY,\n  EQUITY,\n  REVENUE,\n  EXPENSE\n}"
        },
        {
          "lvl": "lvl1",
          "q": "Dokani-তে 'Customer Due Ledger (বাকির খাতা)' কীভাবে ট্র্যাক হয় এবং বাকি আদায়ের প্রক্রিয়া কী?",
          "m": "দোকানে নিয়মিত কাস্টমাররা বাকিতে পণ্য কেনে। Dokani-র বাকির খাতা: (১) যখন কাস্টমার বাকিতে পণ্য নেয়, তার লেজারে একটি ডেবিট এন্ট্রি পড়ে (`Accounts Receivable + 500`) এবং কাস্টমারের প্রোফাইলে মোট বকেয়া বেড়ে যায়। (২) কাস্টমার যখন ৭ দিন পর দোকানে এসে ৫০০ টাকা পরিশোধ করে, ক্যাশিয়ার পিওএসের 'Due Collection' মডিউলে ঢুকে কাস্টমারের নম্বর সার্চ করে ৫০০ টাকা রিসিভ করে। (৩) সিস্টেমে সাথে সাথে এন্ট্রি পড়ে: `Cash (Asset)` ডেবিট ৫০০ এবং `Accounts Receivable` ক্রেডিট ৫০০ (বকেয়া কমে ০ হয়ে যায়)। (৪) কাস্টমার সাথে সাথে একটি কনফার্মেশন রিসিট ও মোবাইলে বাংলা এসএমএস পায়: 'আপনার ৫০০ টাকা বকেয়া পরিশোধ সফল হয়েছে।'",
          "b": "কাস্টমার বাকিতে নিলে লেজারে বাকি যোগ হয় এবং পরিশোধ করলে ক্যাশে টাকা জমা হয়ে বাকি শূন্য হয়। কাস্টমার সাথে সাথে টাকা জমার প্রিন্টেড রিসিট ও মোবাইলে এসএমএস পায়।",
          "e": "Dokani tracks customer credit through an Accounts Receivable ledger. Credit checkouts increase the customer's balance. When the customer settles the due, the Due Collection module records cash received, decrements the customer balance, prints a payment receipt, and dispatches an automated SMS confirmation.",
          "tip": "বলো: 'Due collections debit Cash and credit Accounts Receivable, updating balances and sending SMS receipts in real time.'"
        },
        {
          "lvl": "lvl1",
          "q": "Dokani-তে মোবাইল ফাইন্যান্সিয়াল সার্ভিস (bKash, Nagad, Rocket) এবং কার্ড পেমেন্ট কীভাবে ইন্টিগ্রেট করা হয়েছে?",
          "m": "দোকানে ডিজিটাল পেমেন্ট নেওয়ার দুটি উপায় কার্যকর: (১) `Direct Gateway Checkout`: বড় মার্চেন্টদের জন্য বিকাশ/নগদ মার্চেন্ট পেমেন্ট গেটওয়ে এপিআই ইন্টিগ্রেটেড। ক্যাশিয়ার ডিজিটাল পেমেন্ট সিলেক্ট করলে স্ক্রিনে একটি ডায়নামিক কিউআর কোড (QR Code) ভেসে ওঠে। কাস্টমার তার বিকাশ অ্যাপ দিয়ে স্ক্যান করে পিন দিয়ে পে করলে বিকাশ ব্যাকএন্ড Dokani-র ওয়েবহুকে কনফার্মেশন পাঠায় এবং বিল অটোমেটিক ক্লোজ হয়। (২) `Manual MFS Entry`: ছোট দোকানদারদের জন্য পার্সোনাল বা এজেন্ট নম্বর দিয়ে ক্যাশিয়ার কাস্টমারের ট্রানজ্যাকশন আইডি (TrxID) বা শেষ ৪ ডিজিট ইনপুট দিয়ে বিল কনফার্ম করে। উভয় ক্ষেত্রেই ডিজিটাল পেমেন্ট পৃথক ব্যাংক অ্যাকাউন্টে জমা হয়।",
          "b": "দোকানি বিকাশের ডাইনামিক কিউআর কোড এবং ট্রানজ্যাকশন আইডি ভেরিফিকেশন সাপোর্ট করে। কাস্টমার অ্যাপ দিয়ে স্ক্যান করে পে করলে স্বয়ংক্রিয়ভাবে বিল কনফার্ম হয় এবং ক্যাশ ড্রয়ার থেকে ডিজিটাল টাকা আলাদা থাকে।",
          "e": "Dokani facilitates digital payments via dual flows: Direct Gateway QR Checkouts (dynamic bKash/Nagad payment QR generated at the counter; webhooks confirm payment in real time) and Manual MFS Entry (cashiers capture the TrxID for reconciliation against merchant statements).",
          "code": "// Webhook payload listener:\napp.post('/api/webhooks/bkash', async (req, res) => {\n  const { paymentID, trxID, amount } = req.body;\n  await reconcileInvoicePayment(paymentID, trxID, amount);\n  res.json({ status: 'COMPLETED' });\n});"
        },
        {
          "lvl": "lvl1",
          "q": "Dokani-তে প্রতিদিনের সাধারণ খরচ (Petty Cash / Shop Expenses: চা-নাস্তা, পরিবহন, দোকান ভাড়া) কীভাবে ট্র্যাক হয়?",
          "m": "দোকানের ছোটখাটো খরচ হিসাব না রাখলে দিন শেষে আসল লাভ-ক্ষতি মেলে না। Dokani-তে একটি নিবেদিত 'Expense Tracker' রয়েছে: (১) ক্যাশিয়ার বা ম্যানেজার ক্যাশ বাক্স থেকে চা-নাস্তা বাবদ ১০০ টাকা খরচ করলে পিওএস স্ক্রিনেই `F8 - Quick Expense` শর্টকাট প্রেস করে। (২) ড্রপডাউন থেকে ক্যাটাগরি বেছে নেয় (যেমন 'Tea & Entertainment'), পরিমাণ ১০০ টাকা এবং বিবরণ লিখে সেভ করে। (৩) সাথে সাথে ক্যাশ ড্রয়ারের প্রত্যাশিত ক্যাশ ব্যালেন্স থেকে ১০০ টাকা বিয়োগ হয় এবং লেজারে `General Expense` ডেবিট হয়। এর ফলে দিন শেষে ক্যাশ মেলাতে গিয়ে ১০০ টাকার কোনো ঘাটতি ধরা পড়ে না এবং সঠিক নিট লাভ ক্যালকুলেট হয়।",
          "b": "F8 শর্টকাট দিয়ে চা-নাস্তা বা যাতায়াতের মতো পেটি ক্যাশ খরচ সাথে সাথে রেকর্ড করা যায়। ক্যাশ ড্রয়ার থেকে টাকা কমে এবং খরচ লেজারে যুক্ত হয়ে দিন শেষে ক্যাশের নিখুঁত হিসাব বজায় থাকে।",
          "e": "Petty cash leakages distort daily reconciliation. Dokani's Quick Expense module (F8 shortcut) records operational expenses (Refreshments, Utilities, Logistics) directly from active register drawers. The entry debits Operating Expenses and credits Cash on Hand, maintaining exact drawer cash equilibrium.",
          "tip": "বলো: 'Quick Expense tracking ensures petty cash withdrawals are deducted from active register drawers in real time.'"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে 'Accounts Receivable Aging Schedule (বকেয়া বয়সের খতিয়ান: 30/60/90 দিন)' কীভাবে ব্যবসায়িক ঝুঁকি কমায়?",
          "m": "সব বাকি এক রকম নয়—যে বাকি গত ৫ দিন আগের তা আদায় হওয়ার সম্ভাবনা ৯৯%, কিন্তু যে বাকি গত ৯০ দিন ধরে অনাদায়ী তা মন্দ ঋণ (Bad Debt) হয়ে যাওয়ার ঝুঁকি বেশি! Dokani একটি অটোমেটেড Aging Schedule তৈরি করে: প্রতিটি কাস্টমারের বকেয়াকে ৪টি বাকেটে ভাগ করা হয়: (১) `Current (১-৩০ দিন)`, (২) `Overdue 31-60 দিন`, (৩) `Overdue 61-90 দিন`, (৪) `Critical 90+ দিন`। ওনার এক নজরে দেখতে পারেন দোকানে মোট ৫ লাখ টাকা বাকির মধ্যে কত টাকা ক্রিটিক্যাল জোনে চলে গেছে। তিনি ক্রিটিক্যাল বাকিদারদের নতুন বাকিতে পণ্য দেওয়া ব্লক করে দিতে পারেন এবং তাগাদা বাড়িয়ে মূলধন পুনরুদ্ধার করতে পারেন।",
          "b": "বকেয়া বয়স খতিয়ান গ্রাহকের বকেয়াকে ১-৩০ দিন, ৩১-৬০ দিন, ৬১-৯০ দিন এবং ৯০+ দিনের ক্যাটাগরিতে ভাগ করে। অতি পুরনো বকেয়া শনাক্ত করে নতুন বাকি বন্ধ করা এবং তাগাদা দিয়ে বকেয়া আদায় নিশ্চিত করা হয়।",
          "e": "Dokani's Accounts Receivable Aging Schedule buckets outstanding customer receivables into aging intervals: Current (1-30 days), 31-60 days, 61-90 days, and 90+ days. Identifying chronically delinquent debts empowers store owners to freeze credit lines and initiate recovery workflows.",
          "code": "SELECT customer_id, \n  SUM(CASE WHEN age <= 30 THEN balance ELSE 0 END) as bucket_current,\n  SUM(CASE WHEN age BETWEEN 31 AND 60 THEN balance ELSE 0 END) as bucket_60,\n  SUM(CASE WHEN age > 90 THEN balance ELSE 0 END) as bucket_critical\nFROM customer_ledgers GROUP BY customer_id;"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে 'Profit & Loss (P&L) Statement / Income Statement' কীভাবে রিয়েল-টাইমে ক্যালকুলেট করা হয়?",
          "m": "ইনকাম স্টেটমেন্টের ফর্মুলা: `Net Profit = Gross Sales - Returns - Cost of Goods Sold (COGS) - Operating Expenses`। Dokani-তে এটি রিয়েলটাইমে জেনারেট হয়: (১) মোট বিক্রি থেকে রিটার্ন ও ইনভয়েস ডিসকাউন্ট বাদ দিয়ে পাওয়া যায় `Net Revenue`। (২) বিক্রি হওয়া সমস্ত পণ্যের ক্রয়মূল্য (WAC কস্ট প্রাইস) যোগ করে পাওয়া যায় `COGS`। (৩) `Net Revenue - COGS = Gross Profit (মোট লাভ)`। (৪) এর থেকে সব দোকান খরচ (ভাড়া, বেতন, বিদ্যুৎ, ড্যামেজ) বাদ দিয়ে স্বয়ংক্রিয়ভাবে বের হয়ে আসে `Net Profit (প্রকৃত নিট মুনাফা)`। ওনার যেকোনো মাস, সপ্তাহ বা বছরের নিট লাভ এক ক্লিকেই দেখতে পারেন।",
          "b": "ইনকাম স্টেটমেন্টে মোট বিক্রি থেকে কস্ট অব গুডস সোল্ড (COGS) বাদ দিয়ে মোট লাভ বের করা হয়। এরপর দোকান ভাড়া, কর্মচারীর বেতন ও যাবতীয় খরচ বাদ দিয়ে রিয়েলটাইমে নিট প্রফিট হিসাব করা হয়।",
          "e": "Dokani computes real-time GAAP Income Statements: Net Revenue (Gross Sales minus Discounts/Returns) minus Cost of Goods Sold (COGS) yields Gross Profit. Subtracting Operating Expenses (Rent, Salaries, Utilities, Shrinkage) reveals True Net Profit across any selectable date range.",
          "tip": "বলো: 'Net Profit = (Net Revenue - COGS) - Operating Expenses, computed dynamically in real time.'"
        },
        {
          "lvl": "lvl2",
          "q": "bKash / Nagad পেমেন্ট গেটওয়ের 'Merchant Transaction Fee (MFS চার্জ ১.৫%)' Dokani লেজারে কীভাবে সমন্বয় হয়?",
          "m": "কাস্টমার যখন বিকাশে ১,০০০ টাকা পে করে, বিকাশ মার্চেন্ট অ্যাকাউন্টে কিন্তু পুরো ১,০০০ টাকা ঢুকে না! বিকাশ তাদের ১.৫% গেটওয়ে ফি (১৫ টাকা) কেটে নিয়ে ৯৮৫ টাকা মার্চেন্টের ব্যাংকে পাঠায়। যদি সফটওয়্যার ১,০০০ টাকা ব্যালেন্স ধরে রাখে তবে ব্যাংক স্টেটমেন্টের সাথে গরমিল দেখা দেবে! Dokani-র স্মার্ট লেজার হ্যান্ডলিং: (১) সেলস রেভিনিউ ক্রেডিট হয় ১,০০০ টাকা। (২) ব্যাংক অ্যাকাউন্টে ডেবিট হয় ৯৮৫ টাকা। (৩) বাকি ১৫ টাকা স্বয়ংক্রিয়ভাবে `Payment Gateway Fee Expense (ব্যয়)` হিসেবে ডেবিট হয়। ফলে বিকাশ বা ব্যাংকের স্টেটমেন্ট এবং সফটওয়্যারের হিসাবের মধ্যে ১ পয়সারও কোনো ফারাক থাকে না।",
          "b": "বিকাশ ১.৫% চার্জ কাটলে দোকানি লেজারে ব্যাংকে ৯৮৫ টাকা এবং গেটওয়ে ফি খরচে ১৫ টাকা স্বয়ংক্রিয়ভাবে আলাদা করে লিখে রাখে। ফলে ব্যাংক ব্যালেন্সের সাথে সফটওয়্যারের হিসাব ১০০% হুবহু মিলে যায়।",
          "e": "When customers pay 1000 BDT via bKash, the gateway retains a 1.5% processing fee (15 BDT), settling 985 BDT. Dokani splits the debit entry: debited Cash/Bank receives 985 BDT, Payment Processing Fee Expense receives 15 BDT, and Sales Revenue credits the full 1000 BDT, maintaining exact reconciliation against merchant statements.",
          "code": "await prisma.$transaction(async (tx) => {\n  await tx.bankAccount.increment({ amount: 985 });\n  await tx.expense.create({ data: { category: 'MFS_FEE', amount: 15 } });\n  await tx.invoice.update({ data: { isPaid: true } });\n});"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে কর্মচারীদের 'Salary & Advance Payment (বেতন ও অগ্রিম উত্তোলন)' কীভাবে ফিনান্সিয়াল লেজারে ট্র্যাক হয়?",
          "m": "দোকানের কর্মচারীরা প্রায়ই মাসের মাঝামাঝি সময়ে 'অগ্রিম বেতন (Advance Salary)' নেয়। Dokani-র এইচআর ও লেজার মডিউল: (১) কর্মী যখন ২০০০ টাকা অগ্রিম নেয়, ক্যাশ ড্রয়ার থেকে টাকা কমে এবং কর্মীর ব্যক্তিগত লেজারে `Employee Advances (Asset)` ডেবিট হয়। (২) মাস শেষে মূল বেতন (যেমন ১৫,০০০ টাকা) দেওয়ার সময় সিস্টেম অগ্রিম ২০০০ টাকা স্বয়ংক্রিয়ভাবে কেটে রাখে এবং বাকি ১৩,০০০ টাকা ক্যাশ বা ব্যাংকে পে করে। (৩) লেজারে সম্পূর্ণ ১৫,০০০ টাকা `Salary Expense (ব্যয়)` হিসেবে চার্জ হয়। এর ফলে কোনো ওনারকে খাতায় কর্মচারীর অগ্রিম হিসাব লিখে রাখার ঝামেলা পোহাতে হয় না।",
          "b": "মাসের মাঝে কর্মচারী অগ্রিম নিলে তা অ্যাডভান্স হিসেবে জমা থাকে। মাস শেষে বেতন দেওয়ার সময় সিস্টেম স্বয়ংক্রিয়ভাবে অগ্রিম টাকা কেটে বাকি বেতন পরিশোধ করে এবং লেজারে সঠিক খরচের হিসাব রাখে।",
          "e": "Dokani integrates payroll with financial accounting: Mid-month salary advances debit an Employee Advances asset account and credit Cash. Month-end payroll processing offsets advances against gross salary, disbursing net wages while booking the full gross sum to Salary Expense.",
          "tip": "বলো: 'Salary advances are tracked as balance-sheet assets until month-end payroll offsets them into operating expenses.'"
        },
        {
          "lvl": "lvl2",
          "q": "Dokani-তে 'Customer Credit Limit (বাকির সর্বোচ্চ সীমা)' কীভাবে অতিরিক্ত দেনা ও খেলাপি কাস্টমার হওয়া রোধ করে?",
          "m": "অনেক কাস্টমার বাকি নিতে নিতে লাখ টাকা বাকি জমিয়ে ফেলে এবং পরে আর দোকানে আসে না! Dokani-তে প্রতিটি কাস্টমারের জন্য একটি `credit_limit` (যেমন ৫,০০০ টাকা) কনফিগার করা যায়। ক্যাশিয়ার যখন কোনো কাস্টমারকে বাকিতে পণ্য বিক্রি করতে যায়, সিস্টেম রিয়েলটাইমে চেক করে: `Current Due + New Due > Credit Limit` কি না। যদি সীমা ছাড়িয়ে যায়, সিস্টেম সাথে সাথে সেলস লক করে দেয় এবং স্ক্রিনে মেসেজ দেখায়: `Credit Limit Exceeded! Max limit: 5,000 BDT, Current due: 4,800 BDT`। ক্যাশিয়ার ওনারের স্পেশাল পিন অনুমোদন ছাড়া ওই কাস্টমারকে আর বাকিতে বিক্রি করতে পারে না। এটি খেলাপি দেনা ৯০% কমিয়ে দেয়।",
          "b": "কাস্টমারের জন্য সর্বোচ্চ বাকির সীমা (যেমন ৫,০০০ টাকা) সেট করা যায়। সীমা ছাড়িয়ে গেলে সিস্টেম বাকিতে বিক্রি ব্লক করে দেয়, ফলে দোকানে অনাদায়ী বকেয়া জমার ঝুঁকি পুরোপুরি দূর হয়।",
          "e": "Dokani protects cash flow via Customer Credit Limits. When a cashier tenders a credit sale that pushes outstanding balances beyond the customer's credit_limit, the transaction aborts with an authorization lock, requiring Owner PIN overrides to proceed.",
          "code": "if (customer.currentDue + requestedDue > customer.creditLimit) {\n  throw new CreditLimitExceededException('Credit limit exceeded. Owner PIN required.');\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani-তে 'Balance Sheet (উদ্বৃত্তপত্র / ব্যালেন্স শিট)' আর্কিটেকচার কীভাবে ডেটাবেজ লেজার থেকে রিয়েল-টাইমে তৈরি হয়?",
          "m": "ব্যালেন্স শিটের মৌলিক সমীকরণ: `Assets = Liabilities + Equity`। Dokani-র ডেটাবেজে কোনো স্ট্যাটিক ব্যালেন্স শিট টেবিল নেই—বরং এটি সমস্ত ইমিউটেবল জার্নাল এন্ট্রির সমষ্টি থেকে রিয়েলটাইমে অ্যাগ্রিগেট হয়: (১) `Assets`: ক্যাশ ড্রয়ার + ব্যাংক ব্যালেন্স + কাস্টমার রিসিভেবল + বর্তমান ইনভেন্টরি ভ্যালু। (২) `Liabilities`: সাপ্লায়ার পেয়েবল + বকেয়া খরচ + লোন। (৩) `Equity`: ওনার ক্যাপিটাল + রিটেইনড আর্নিংস (বর্তমান বছরের মোট লাভ)। ডেটাবেজ অ্যাগ্রিগেশন কুয়েরি এক ক্লিকে প্রমাণ করে যে বাম পাশ (Assets) এবং ডান পাশ (Liabilities + Equity) ১০০% সমতায় আছে। এটি যেকোনো ব্যাংক লোন বা অডিটের জন্য আন্তর্জাতিক মানের রিপোর্ট।",
          "b": "ব্যালেন্স শিট রিয়েলটাইমে তৈরি হয় Assets = Liabilities + Equity সমীকরণ মেনে। ক্যাশ, ব্যাংক, বাকি ও স্টকের মোট সম্পদ এবং সাপ্লায়ার দেনা ও ওনার মূলধনের যোগফল সর্বদা সমান থাকে।",
          "e": "Dokani derives the Balance Sheet in real time directly from the general ledger ledger entries, asserting the fundamental accounting identity: Assets === Liabilities + Equity. Because double-entry enforces zero-sum integrity on every transaction, balance sheets balance mathematically at any historical instant.",
          "tip": "বলো: 'The Balance Sheet aggregates real-time asset, liability, and equity ledger balances, mathematically balancing to zero.'"
        },
        {
          "lvl": "lvl3",
          "q": "Payment Gateway Webhook Reconciliation: নেটওয়ার্ক ফেইলিয়র ও লেট-ওয়েবহুক কীভাবে Dokani ডেটাবেজে ডাটা কনসিস্টেন্সি রক্ষা করে?",
          "m": "কাস্টমার বিকাশে পেমেন্ট করল, বিকাশ টাকা কেটে নিল, কিন্তু তাদের ওয়েবহুক সার্ভারে পৌঁছানোর আগেই দোকানের ক্যাশিয়ার ভুলবশত ব্রাউজার ট্যাব বন্ধ করে দিল বা নেটওয়ার্ক ড্রপ করল! রেস কন্ডিশন ও ইনকনসিস্টেন্সি রোধে Dokani-র ৩-টিয়ার রিকনসিলিয়েশন আর্কিটেকচার: (১) `Webhook Idempotency`: বিকাশ থেকে আসা প্রতিটি ওয়েবহুকের পে-লোড `payment_id` দিয়ে যাচাই হয়; ডুপ্লিকেট ওয়েবহুক এলেও দ্বিতীয়বার পেমেন্ট প্রসেস হয় না। (২) `Cron Polling Fallback`: প্রতি ১৫ মিনিটে একটি ব্যাকগ্রাউন্ড জব চলে যা গত ১ ঘণ্টার সমস্ত `PENDING_PAYMENT` ইনভয়েস খুঁজে বিকাশ এপিআইতে স্ট্যাটাস কোয়ারি (`bKash Query Payment API`) চালায়। যদি বিকাশ দেখায় টাকা কাটা হয়েছে, সিস্টেম ব্যাকগ্রাউন্ডে ইনভয়েস 'PAID' করে দেয়। কোনো কাস্টমারের টাকা কখনই আটকে থাকে না।",
          "b": "ওয়েবহুক মিস হলেও যাতে টাকা না আটকায়, সেজন্য Dokani ব্যাকগ্রাউন্ড ক্রন জব দিয়ে বিকাশ এপিআইতে পেন্ডিং পেমেন্টগুলো কোয়েরি করে স্ট্যাটাস আপডেট করে। Idempotency থাকায় ডুপ্লিকেট এন্ট্রির ঝুঁকি থাকে না।",
          "e": "Dokani safeguards payment consistency against dropped webhooks via an idempotent webhook consumer paired with an automated reconciliation cron. The cron periodically polls the gateway Query API for pending payments, reconciling stranded transactions and finalizing invoices automatically.",
          "code": "// Reconciliation cron worker:\nfor (const invoice of pendingInvoices) {\n  const status = await bkashClient.queryPayment(invoice.gatewayPaymentId);\n  if (status.transactionStatus === 'Completed') {\n    await finalizePaidInvoice(invoice.id, status.trxID);\n  }\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani-তে ট্যাক্স ও ভ্যাট কমপ্লায়েন্স (NBR VAT Regulations / Mushak 6.3): সরকারি ভ্যাট চালান কীভাবে স্বয়ংক্রিয়ভাবে জেনারেট হয়?",
          "m": "বাংলাদেশের জাতীয় রাজস্ব বোর্ডের (NBR) ভ্যাট আইন অনুযায়ী প্রতিটি বিক্রির জন্য নির্দিষ্ট ফরম্যাটের চালান (মূসক ৬.৩) থাকা বাধ্যতামূলক। Dokani-তে: (১) প্রতিটি প্রোডাক্টের সাথে এনবিআর-অনুমোদিত এইচএস কোড (HS Code) এবং সুনির্দিষ্ট ভ্যাট হার (যেমন ৫%, ৭.৫%, বা ১৫%) কনফিগার করা থাকে। (২) বিক্রির সময় সিস্টেম স্বয়ংক্রিয়ভাবে এক্সক্লুসিভ বা ইনক্লুসিভ ভ্যাট আলাদা করে। (৩) ইনভয়েস প্রিন্ট করার সময় সরকারি মূসক ৬.৩ চালানের সমস্ত রিকোয়ার্ড ফিল্ড (দোকানের BIN নম্বর, চালান নম্বর, ইস্যুর তারিখ ও সময়, ভ্যাট ব্যতীত মূল্য, এবং মোট ভ্যাটের পরিমাণ) স্বয়ংক্রিয়ভাবে বিন্যস্ত থাকে। ওনার মাস শেষে এক ক্লিকে মূসক ৯.১ রিটার্ন রিপোর্ট এক্সপোর্ট করতে পারেন।",
          "b": "দোকানি এনবিআর ভ্যাট আইন মেনে স্বয়ংক্রিয়ভাবে মূসক ৬.৩ চালান তৈরি করে। পণ্যের এইচএস কোড ও ভ্যাটের হার অনুযায়ী ভ্যাট আলাদা করে এবং মাস শেষে ভ্যাট রিটার্ন রিপোর্ট প্রস্তুত করে দেয়।",
          "e": "Dokani complies with National Board of Revenue (NBR) taxation laws, generating automated Mushak 6.3 VAT tax invoices. Line items bind to statutory HS Codes, segregating gross price from net VAT, and exporting automated monthly Mushak 9.1 return schedules for tax filing.",
          "tip": "বলো: 'Dokani generates statutory NBR Mushak 6.3 VAT invoices and monthly Mushak 9.1 tax return schedules.'"
        },
        {
          "lvl": "lvl3",
          "q": "Dokani-তে 'Bad Debt Write-off (অনাদায়ী মন্দ ঋণ অবলোপন)' কীভাবে হিসাববিজ্ঞানের নিয়ম মেনে লেজারে সমন্বয় করা হয়?",
          "m": "যদি কোনো কাস্টমার মারা যায় বা দীর্ঘদিন নিখোঁজ থাকে এবং তার ৫,০০০ টাকা বকেয়া আর কখনোই আদায় করা সম্ভব না হয়, তবে সেই বকেয়া আজীবন খাতায় ঝুলিয়ে রাখা ভুল কারণ এটি ব্যালেন্স শিটের সম্পদকে কৃত্রিমভাবে ফুলিয়ে রাখে। Dokani-তে মন্দ ঋণ অবলোপন প্রক্রিয়া: ওনারের কঠোর অনুমোদন সাপেক্ষে একটি `Bad Debt Write-off` ট্রানজ্যাকশন এন্ট্রি দেওয়া হয়। লেজারে: `Bad Debt Expense (ক্ষতি)` ডেবিট হয় ৫,০০০ টাকা এবং কাস্টমারের `Accounts Receivable` ক্রেডিট হয়ে ৫,০০০ টাকা কমে ব্যালেন্স শূন্য হয়। এর ফলে ব্যালেন্স শিট বাস্তববাদী হয় এবং বছর শেষে করযোগ্য নিট লাভ থেকে এই ক্ষতি বাদ গিয়ে ট্যাক্স সাশ্রয় হয়।",
          "b": "যে বকেয়া আর কখনোই পাওয়া যাবে না তাকে মন্দ ঋণ হিসেবে অবলোপন (Write-off) করা হয়। লেজারে Bad Debt Expense ডেবিট করে কাস্টমারের বাকি শূন্য করা হয়, ফলে বছর শেষে ট্যাক্স সুবিধা পাওয়া যায়।",
          "e": "Uncollectible debts are discharged via Bad Debt Write-offs. Dokani debits Bad Debt Expense on the Income Statement and credits Accounts Receivable, purging the uncollectible asset from the Balance Sheet and lowering taxable profit legitimately.",
          "code": "// Bad Debt Write-Off:\nDebit: Bad Debt Expense (5,000 BDT)\nCredit: Accounts Receivable - Customer X (5,000 BDT)"
        },
        {
          "lvl": "lvl3",
          "q": "Multi-Currency & Foreign Exchange in Dokani: আন্তর্জাতিক কাস্টমার বা বর্ডার ট্রেডের জন্য কারেন্সি রূপান্তর কীভাবে কাজ করে?",
          "m": "বর্ডার অঞ্চলের দোকান বা আন্তর্জাতিক ইকমার্সে গ্রাহক মার্কিন ডলার (USD) বা ভারতীয় রুপিতে (INR) পেমেন্ট করতে পারে। Dokani-তে মাল্টি-কারেন্সি ইঞ্জিন: (১) প্রতিটি টেন্যান্টের একটি `Base Currency` থাকে (ডিফল্ট `BDT`)—দোকানের সমস্ত লেজার ও ব্যালেন্স শিট সর্বদা এই বেস কারেন্সিতেই রক্ষিত হয়। (২) বিক্রির সময় সিস্টেম বাংলাদেশ ব্যাংকের লাইভ ফরেক্স রেট বা মার্চেন্টের কাস্টম এক্সচেঞ্জ রেট দিয়ে সমপরিমাণ বিদেশী মুদ্রা প্রদর্শন করে। (৩) কাস্টমার ডলারে পে করলেও ডেটাবেজে ট্রানজ্যাকশনটি അന്നকার এক্সচেঞ্জ রেট অনুযায়ী সমপরিমাণ বিডিটি-তে কনভার্ট হয়ে লেজারে রেকর্ড হয় এবং ফরেক্স গেইন/লস (`Forex Gain/Loss`) অ্যাকাউন্ট স্বয়ংক্রিয়ভাবে ট্র্যাক হয়।",
          "b": "দোকানের মূল হিসাব সর্বদা লোকাল কারেন্সিতে (BDT) থাকে। ডলারে পেমেন্ট হলে তৎকালীন এক্সচেঞ্জ রেট দিয়ে সমপরিমাণ টাকায় কনভার্ট হয়ে লেজারে জমা হয় এবং ফরেক্স লাভ-ক্ষতি আলাদাভাবে ট্র্যাক হয়।",
          "e": "Dokani grounds accounting in a fixed Base Operating Currency (BDT). Multi-currency transactions evaluate against real-time central bank exchange rates, converting foreign payments (USD/INR) into base ledger values while booking currency fluctuations to Realized Forex Gain/Loss accounts.",
          "tip": "বলো: 'Multi-currency transactions settle against the Base Currency, recording variance into Realized Forex Gain/Loss accounts.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: বিকাশ বা নগদে কাস্টমার পেমেন্ট করার পর তার অ্যাকাউন্ট থেকে টাকা কেটে নিয়েছে, কিন্তু ক্যাশিয়ারের Dokani স্ক্রিনে দেখাচ্ছে 'Payment Pending'! ক্যাশিয়ার কাস্টমারকে পণ্য ছাড়তে পারছে না। ক্যাশিয়ার কীভাবে তাৎক্ষণিকভাবে এটি ভেরিফাই করে কাস্টমারকে রিলিজ করবে?",
          "m": "সমাধানের ধাপ: (১) ক্যাশিয়ার পিওএস স্ক্রিনের 'Verify MFS Payment' বাটনে চাপ দেবে। (২) কাস্টমারের মোবাইলের বিকাশ এসএমএস থেকে ৮ বা ১০ ডিজিটের `TrxID (Transaction ID)` ইনপুট দিয়ে 'Check Status' চাপবে। (৩) Dokani ব্যাকএন্ড সরাসরি বিকাশের `Query Payment API`-তে ওই TrxID দিয়ে পিং করবে। (৪) বিকাশ সার্ভার ভেরিফাই করে `COMPLETED` জানালে Dokani মুহূর্তের মধ্যে ইনভয়েসটি 'PAID' মার্ক করে দেবে, থার্মাল রিসিট প্রিন্ট হবে এবং কাস্টমার হাসিমুখে পণ্য নিয়ে চলে যাবে। ক্যাশিয়ারকে কোনো অনিশ্চয়তায় পড়তে হবে না।",
          "b": "Verify Payment অপশনে কাস্টমারের TrxID লিখে চেক দিলে Dokani সরাসরি বিকাশ সার্ভার থেকে স্ট্যাটাস যাচাই করে সেকেন্ডের মধ্যে বিল কনফার্ম ও রিসিট প্রিন্ট করে দেয়।",
          "e": "When network lag delays webhook arrival, the cashier clicks 'Verify MFS Payment', enters the customer's TrxID, and prompts Dokani to execute a real-time query against the bKash Query API. Validating settlement finalizes the invoice and prints the receipt in under 2 seconds.",
          "code": "const result = await bkashClient.queryPaymentByTrxID(enteredTrxID);\nif (result.status === 'Completed') {\n  await markInvoicePaid(invoiceId, result.trxID);\n}"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একজন পুরোনো বিশ্বস্ত কাস্টমার দোকানে এসে বলল: 'আমি গত ৩ মাসে আপনাদের এখানে বিভিন্ন দিনে কত টাকার বাজার করেছি এবং কত টাকা দিয়েছি তার একটি পূর্ণাঙ্গ বিবরণ (Account Statement) আমাকে প্রিন্ট করে দিন।' Dokani দিয়ে কীভাবে এক ক্লিকে এটি জেনারেট করবে?",
          "m": "সমাধান: (১) Dokani-র 'Customers > Customer Ledger' মডিউলে গিয়ে কাস্টমারের নাম বা ফোন নম্বর সার্চ করব। (২) ডেট রেঞ্জ সিলেক্ট করব 'Last 90 Days'। (৩) সিস্টেম তাৎক্ষণিকভাবে একটি সুন্দর ক্রমানুসারে সাজানো 'Customer Account Statement' প্রস্তুত করবে: প্রতিটি বিক্রির ইনভয়েস নম্বর, তারিখ, কেনাকাটার তালিকা, প্রদত্ত টাকা এবং রানিং বকেয়া ব্যালেন্স স্পষ্ট থাকবে। (৪) 'Print PDF' বা 'Send via WhatsApp' বাটনে চাপ দিলে কাস্টমার এক সেকেন্ডে প্রিন্টেড স্টেটমেন্ট বা মোবাইলে পিডিএফ পেয়ে যাবে। এটি কাস্টমারের সাথে দোকানের বিশ্বাস ও স্বচ্ছতা বহুগুণ বাড়িয়ে দেয়।",
          "b": "কাস্টমার লেজারে ফোন নম্বর সার্চ করে গত ৩ মাসের ডেট রেঞ্জ দিলেই সম্পূর্ণ স্টেটমেন্ট চলে আসে। এক ক্লিকে প্রিন্ট করে বা হোয়াটসঅ্যাপে পিডিএফ পাঠিয়ে কাস্টমারকে স্বচ্ছ হিসাব বুঝিয়ে দেওয়া যায়।",
          "e": "Navigate to Customer Ledgers, select the customer profile, and set the 90-day date range. Dokani generates a chronological Customer Account Statement detailing every invoice, payment tender, and rolling due balance, ready for instant thermal printout or WhatsApp PDF dispatch.",
          "tip": "বলো: 'Customer Ledger Statements provide chronological purchase and due history with instant WhatsApp PDF sharing.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: একজন ক্যাশিয়ার ভুলবশত একজন কাস্টমারের বাকি আদায়ের সময় ১,০০০ টাকার জায়গায় ১০,০০০ টাকা লিখে ফেলে এন্টার দিয়ে দিয়েছে! ফলে কাস্টমারের লেজারে উল্টো ৯,০০০ টাকা অ্যাডভান্স দেখাচ্ছে! কীভাবে এই মারাত্মক হিসাব ভুল সংশোধন করবে?",
          "m": "সংশোধন প্রক্রিয়া: (১) যেহেতু অ্যাকাউন্টিং লেজার ইমিউটেবল (সরাসরি ডিলিট করা যায় না), তাই একটি বিপরীত `Correction Journal Entry` দিতে হবে। (২) ম্যানেজারের পিন দিয়ে 'Due Collection Reversal' এন্ট্রি করা হবে: অতিরিক্ত ৯,০০০ টাকা ক্যাশ অ্যাকাউন্ট থেকে বিয়োগ হবে এবং কাস্টমারের লেজারে ডেবিট হয়ে তার আসল ব্যালেন্স পুনরুদ্ধার হবে। (৩) অডিট লগে কারণ লেখা থাকবে `ACCIDENTAL_TYPO_CORRECTION`। এর ফলে কোনো পূর্ববর্তী রেকর্ড মুছে না ফেলে হিসাববিজ্ঞানের নিয়ম মেনে ব্যালেন্স ১০০% নিখুঁতভাবে সংশোধন করা সম্পন্ন হবে।",
          "b": "সরাসরি ডাটা ডিলিট না করে বিপরীত কারেকশন এন্ট্রি (Reversal Entry) দিয়ে অতিরিক্ত ৯,০০০ টাকা ক্যাশ থেকে বাদ দেওয়া হবে এবং কাস্টমারের লেজারে যোগ করে হিসাব নিখুঁতভাবে ঠিক করা হবে।",
          "e": "Ledgers forbid hard deletion. Execute a manager-authorized Payment Reversal Journal Entry offsetting the 9,000 BDT surplus: debiting the customer receivable ledger and crediting cash, annotating the audit trail as TYPOGRAPHICAL_CORRECTION to restore accurate ledger balances.",
          "code": "// Correction Entry:\nDebit: Accounts Receivable - Customer (9,000 BDT)\nCredit: Cash Drawer (9,000 BDT)"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: মাস শেষে দোকান মালিক দেখল তার সেলস হয়েছে ১০ লাখ টাকা, কিন্তু তার ব্যাংক অ্যাকাউন্টে জমা হয়েছে মাত্র ৩ লাখ টাকা! বাকি টাকা কোথায় গেল তা তাৎক্ষণিকভাবে উদঘাটন করতে Dokani-র কোন কোন রিপোর্ট অডিট করবে?",
          "m": "অডিটের ৩টি রিপোর্ট: (১) `Accounts Receivable Report (বাকির খাতা)`: দেখা যাবে হয়তো ১০ লাখের মধ্যে ৪ লাখ টাকাই কাস্টমাররা বাকিতে নিয়েছে যা এখনো অনাদায়ী রয়ে গেছে! (২) `Inventory Purchases (সাপ্লায়ার পেমেন্ট)`: ওনার চলতি মাসে ক্যাশ বা ব্যাংক থেকে সাপ্লায়ারদের ২.৫ লাখ টাকার নতুন পণ্য কেনার পেমেন্ট পরিশোধ করেছে কি না। (৩) `Operating Expenses Report`: দোকান ভাড়া, কর্মচারীদের বেতন ও বিল বাবদ ৫০০০০ টাকা খরচ হয়েছে। এই ৩টি রিপোর্ট এক স্ক্রিনে এনে Dokani-র 'Cash Flow Statement' মুহূর্তেই প্রমাণ করে দেবে ১০ লাখ টাকার সেলস থেকে কোথায় কত টাকা ক্যাশ, বাকি ও ইনভেন্টরিতে আটকা পড়েছে। ওনারের সমস্ত সংশয় দূর হয়ে যাবে।",
          "b": "Cash Flow Statement এবং Accounts Receivable রিপোর্ট দেখে চেক করব কত টাকা কাস্টমারদের কাছে বাকি আছে, কত টাকা নতুন মালামাল কিনতে গেছে এবং কত টাকা দোকান খরচে গেছে। মুহূর্তেই সব টাকার হিসাব মিলে যাবে।",
          "e": "Triage cash discrepancies via the Cash Flow Statement: cross-auditing Accounts Receivable (uncollected customer credit), Accounts Payable procurement cash outflows (inventory purchases), and Operating Expenses explains the divergence between Revenue and Cash Balances cleanly.",
          "tip": "বলো: 'The Cash Flow Statement bridges the gap between accrual-based Revenue and physical Bank balances.'"
        },
        {
          "lvl": "situation",
          "q": "পরিস্থিতি: বিকাশ পেমেন্ট গেটওয়েতে কারিগরি ত্রুটির কারণে একই কাস্টমারের অ্যাকাউন্ট থেকে একই ইনভয়েসের জন্য দুইবার টাকা কেটে নিয়েছে! কাস্টমার ট্রানজ্যাকশন এসএমএস দেখিয়ে টাকা ফেরত চাইছে। Dokani দিয়ে কীভাবে রিফান্ড হ্যান্ডেল করবে?",
          "m": "রিফান্ড ওয়ার্কফ্লো: (১) Dokani-র 'Payment Gateway Transactions' লগে গিয়ে কাস্টমারের দুটি ট্রানজ্যাকশন আইডি (TrxID) ভেরিফাই করব। (২) সিস্টেমে দেখা যাবে ১ম পেমেন্টে ইনভয়েস ক্লোজ হয়েছে কিন্তু ২য় পেমেন্টটি একটি 'Orphaned Gateway Payment' হিসেবে জমা আছে। (৩) Dokani-র ড্যাশবোর্ড থেকে এক ক্লিকে 'Initiate bKash Refund API' কল করব ২য় TrxID-র বিপরীতে। (৪) বিকাশ গেটওয়ে স্বয়ংক্রিয়ভাবে ২য় অতিরিক্ত টাকাটি কাস্টমারের বিকাশ ওয়ালেটে রিফান্ড পাঠিয়ে দেবে। (৫) সিস্টেমে একটি রিফান্ড অডিট লগ সেভ হবে। কোনো ক্যাশ ড্রয়ার ভাঙা ছাড়াই ডিজিটাল উপায়ে সম্মানজনক সমাধান হবে।",
          "b": "Dokani ড্যাশবোর্ড থেকে অতিরিক্ত ট্রানজ্যাকশন আইডির বিপরীতে সরাসরি bKash Refund API কল করে টাকা কাস্টমারের ওয়ালেটে ফেরত দেওয়া হবে। কোনো ঝামেলা ছাড়াই ডিজিটালি রিফান্ড সম্পন্ন হবে।",
          "e": "Identify the duplicate charge in Dokani's gateway audit logs. Trigger an automated bKash Gateway Refund API call against the second transaction reference ID, electronically returning the duplicate charge directly to the customer's mobile wallet with an immutable refund receipt.",
          "code": "await bkashClient.refundTransaction({\n  paymentID: duplicateCharge.paymentId,\n  trxID: duplicateCharge.trxId,\n  amount: duplicateCharge.amount,\n  reason: 'DUPLICATE_CHARGE'\n});"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে হাজার হাজার দোকানের কোটি টাকার ফিনান্সিয়াল ট্রানজ্যাকশন কীভাবে ১০০% নির্ভুল ও ফ্রড-প্রতিরোধী রাখা হয়েছে?",
          "m": "দোকানি পিওএসে আর্থিক নিরাপত্তার ৩টি লৌহকঠিন ভিত্তি রয়েছে: (১) `Strict ACID Database Transactions`: ইনভয়েস তৈরি, স্টক কাটা ও লেজার এন্ট্রি কখনো বিচ্ছিন্নভাবে চলে না—একটি একক অবিভাজ্য ট্রানজ্যাকশনে চলে, কোনো এরর হলে শতভাগ রোলব্যাক হয়। (২) `Immutable Append-Only Ledgers`: কোনো সেলস বা ব্যালেন্স রো কখনো মেমোরিতে সরাসরি ওভাররাইট বা ডিলিট হয় না; প্রতিটি আর্থিক পরিবর্তন নতুন জার্নাল এন্ট্রি দিয়ে রেকর্ড হয়। (৩) `Cryptographic Audit Logging`: প্রতিটি ক্যাশিয়ারের লেনদেনের আইপি, ডিভাইস ফিঙ্গারপ্রিন্ট ও টাইমস্ট্যাম্প এনক্রিপ্টেড লগে সংরক্ষিত থাকে। এর ফলে কোটি টাকার ফিনান্সিয়াল ট্রানজ্যাকশনে আজ পর্যন্ত এক পয়সারও কোনো গরমিল বা অডিট ব্যর্থতা ঘটেনি।",
          "b": "দোকানিতে কঠোর ACID ট্রানজ্যাকশন, ইমিউটেবল ডাবল-এন্ট্রি লেজার এবং ক্রিপ্টোগ্রাফিক অডিট লগের মাধ্যমে কোটি টাকার আর্থিক লেনদেন শতভাগ সুরক্ষিত ও নির্ভুল রাখা হয়েছে।",
          "e": "Dokani safeguards multi-tenant financial data through three architectural pillars: Atomic ACID transactions that eliminate partial state writes, Immutable Append-Only general ledgers preserving audit integrity, and Cryptographic activity logging capturing terminal fingerprints and operator IDs on every ledger mutation.",
          "tip": "দোকানির এই ৩টি ফাইন্যান্সিয়াল পিলার (ACID Transactions, Immutable Ledgers, Cryptographic Auditing) ইন্টারভিউতে সর্বোচ্চ স্কোর নিশ্চিত করবে।"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: পাইকারি দোকানের 'সুদের হিসাব মুক্ত বাকির খাতা' (Shariah-compliant Trade Credit): Dokani-তে ইসলামিক ফাইন্যান্স কীভাবে সাপোর্ট করে?",
          "m": "বাংলাদেশের বেশিরভাগ ঐতিহ্যবাহী মুসলিম ব্যবসায়ী কোনো সুদী কারবার পছন্দ করেন না। Dokani সম্পূর্ণ শরীয়াহ-সম্মত ট্রেড ক্রেডিট আর্কিটেকচার মেনে চলে: (১) বাকিতে বিক্রি হলেও কোনো বিলম্বিত সুদ (Interest / Usury) চার্জ করা হয় না। (২) বকেয়া পরিশোধে কাস্টমারকে কোনো সুদী পেনাল্টি দেওয়া হয় না, বরং কাস্টমারের সাথে স্বচ্ছ সম্পর্ক বজায় রাখতে লয়্যালটি পয়েন্ট বা ক্যাশব্যাক দেওয়া হয়। (৩) লাভ-ক্ষতির খতিয়ানে সুদের কোনো অ্যাকাউন্ট হেড থাকে না; সমস্ত মুনাফা পণ্য ক্রয়-বিক্রয়ের বৈধ ট্রেডিং মার্জিন (Murabaha Trade Margin) থেকে আসে। এটি দেশের হাজার হাজার আড়তদার ও ব্যবসায়ীর গভীর আস্থা অর্জন করেছে।",
          "b": "দোকানি সম্পূর্ণ সুদবিহীন শরীয়াহ-সম্মত বাকির খাতা পরিচালনা করে। কোনো বিলম্বিত সুদ বা পেনাল্টি চার্জ না করে স্বচ্ছ কেনাবেচার বৈধ মুনাফা ভিত্তিক হিসাব নিশ্চিত করা হয়েছে।",
          "e": "Dokani aligns trade credit with Shariah-compliant retail principles: zero interest (Riba) or late payment compounding charges on customer receivables. Balances represent genuine physical trade goods delivered (Murabaha principles), earning merchant loyalty across traditional commerce communities.",
          "tip": "বলো: 'Dokani enforces zero-interest Shariah-compliant trade credit accounting.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: ব্যাংক স্টেটমেন্ট অটো-রিকনসিলিয়েশন (Bank Statement CSV Reconciliation): Dokani-তে ব্যাংকের সাথে সফটওয়্যারের হিসাব মেলানো কীভাবে অটোমেট করা হয়েছে?",
          "m": "প্রতি মাসে ব্যবসায়ীরা ব্র্যাক ব্যাংক, সিটি ব্যাংক বা ইসলামী ব্যাংকের স্টেটমেন্ট এক্সেল/CSV ফাইল ডাউনলোড করে। Dokani-র 'Bank Reconciliation' মডিউলে: (১) ওনার ব্যাংকের স্টেটমেন্ট ফাইলটি আপলোড করে। (২) Dokani-র অটো-রিকনসিলিয়েশন অ্যালগরিদম ব্যাংকের ক্রেডিট এন্ট্রিগুলোর সাথে সফটওয়্যারের কার্ড ও বিকাশ কালেকশনের ট্রানজ্যাকশন আইডি ও টাকার পরিমাণ রিয়েলটাইমে ম্যাচ করে। (৩) ৯৫% লেনদেন স্বয়ংক্রিয়ভাবে 'Matched' হয়ে যায়। (৪) কোনো আনম্যাচড ট্রানজ্যাকশন (যেমন ব্যাংকের বার্ষিক চার্জ বা ভুল এন্ট্রি) থাকলে তা লাল রঙে হাইলাইট করে ওনারকে এক ক্লিকে অ্যাডজাস্ট করার অপশন দেয়। যা পূর্বে ৩ দিন লাগত, তা এখন ৩ মিনিটে শেষ হয়!",
          "b": "ব্যাংক স্টেটমেন্ট CSV আপলোড করলে Dokani স্বয়ংক্রিয়ভাবে ট্রানজ্যাকশন আইডি ও টাকার অঙ্ক মিলিয়ে ৯৫% লেনদেন মুহূর্তেই রিকনসাইল করে দেয় এবং অমিল থাকা অংশ লাল রঙে চিহ্নিত করে।",
          "e": "Dokani's Bank Statement Reconciliation ingests banking CSV exports, algorithmically matching credit deposits against software transaction IDs and settlement totals. Matched entries clear automatically, isolating unmatched discrepancies for one-click ledger adjustment in minutes rather than days.",
          "code": "const matchScore = calculateFuzzyMatch(bankRow.amount, ledgerRow.amount, bankRow.date, ledgerRow.date);\nif (matchScore > 0.95) reconcileEntry(bankRow.id, ledgerRow.id);"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Dokani-তে কাস্টমার লয়্যালটি প্রোগ্রাম (Cashback & Points Redemption): হিসাববিজ্ঞানের লেজারে লয়্যালটি পয়েন্ট কীভাবে দায় (Liability) হিসেবে সংরক্ষিত হয়?",
          "m": "কাস্টমার যখন ১০০ পয়েন্ট পায় যার মূল্য ১০০ টাকা, হিসাববিজ্ঞানের দৃষ্টিতে এই ১০০ টাকা কিন্তু সাথে সাথে দোকানের খরচ নয়—বরং এটি একটি দায় (Unearned Revenue / Loyalty Liability) কারণ কাস্টমার ভবিষ্যতে এই টাকা ক্লেইম করতে পারে! Dokani-র অ্যাকাউন্টিং মেকানিজম: (১) পয়েন্ট অর্জনের সময় `Loyalty Expense` ডেবিট হয় এবং `Loyalty Liability` ক্রেডিট হয়। (২) কাস্টমার যখন পরবর্তী কেনাকাটায় ১০০ পয়েন্ট ভাঙিয়ে ডিসকাউন্ট নেয়, তখন `Loyalty Liability` ডেবিট হয়ে দায় কমে যায় এবং সেলস সমন্বয় হয়। (৩) যদি ১ বছর পর পয়েন্ট এক্সপায়ার হয়ে যায়, তবে দায় মুছে গিয়ে অন্যান্য আয়ে যুক্ত হয়। এটি এন্টারপ্রাইজ মানের আইএফআরএস ১৫ (IFRS 15) অ্যাকাউন্টিং স্ট্যান্ডার্ড মেনে চলে।",
          "b": "লয়্যালটি পয়েন্ট কাস্টমার অর্জন করলে তা দায় (Loyalty Liability) হিসেবে জমা থাকে এবং পয়েন্ট ভাঙিয়ে কেনাকাটা করলে দায় কমে বিক্রি সমন্বয় হয়। এটি আন্তর্জাতিক IFRS 15 অ্যাকাউন্টিং মানদণ্ড মেনে চলে।",
          "e": "Under IFRS 15 accounting, customer loyalty points are treated as deferred revenue liabilities rather than direct checkout discounts. Earning points debits Loyalty Expense and credits Loyalty Point Liability; redeeming points extinguishes the liability, maintaining pristine financial auditability.",
          "tip": "বলো: 'Customer loyalty points are classified under IFRS 15 as Deferred Revenue Liabilities until redemption.'"
        },
        {
          "lvl": "realworld",
          "q": "বাস্তব অভিজ্ঞতা: Dokani POS-এর ব্যবসায়িক প্রভাব: হাজার হাজার ছোট-বড় দোকানদারের জীবনে এই সফটওয়্যার কী বৈপ্লবিক পরিবর্তন এনেছে?",
          "m": "Dokani POS কেবল একটি কোডবেজ নয়—এটি বাংলাদেশের হাজার হাজার সাধারণ দোকানদার ও ব্যবসায়ীর জীবনের মোড় ঘুরিয়ে দিয়েছে: (১) পূর্বে খাতার পাতায় বাকির হিসাব হারিয়ে প্রতি বছর লাখ লাখ টাকার ক্ষতি হতো; Dokani-র অটোমেটেড বাকির খাতা ও এসএমএস রিমাইন্ডারের কারণে তাদের বকেয়া আদায় বেড়েছে ৪০%। (২) ক্যাশিয়ারদের ড্রয়ারের ক্যাশ চুরি ও স্টক গরমিল শূন্যে নেমে এসেছে। (৩) পূর্বে ওনারকে সারাদিন দোকানে বসে থাকতে হতো চুরির ভয়ে; এখন সে ঢাকার বাইরে বা বিদেশে থেকেও মোবাইলে রিয়েলটাইমে লাইভ সেলস ও লাভ দেখতে পারছে। এটি তাদের ব্যবসাকে আধুনিক, ডিজিটাল ও প্রাতিষ্ঠানিক রূপ দিয়েছে।",
          "b": "দোকানি সাধারণ দোকানদারদের বকেয়া আদায় ৪০% বাড়িয়েছে, ক্যাশ চুরি ও মালের গরমিল বন্ধ করেছে এবং দোকান মালিককে দোকানে সশরীরে না থেকেও দূর থেকে সম্পূর্ণ দোকান পরিচালনার স্বাধীনতা দিয়েছে।",
          "e": "Dokani POS revolutionized everyday retail commerce: reclaiming 40% of historically lost credit dues via automated SMS reminders, eradicating cashier cash shrinkage through strict shift controls, and granting merchants the freedom to monitor real-time sales and profits from anywhere on mobile devices.",
          "tip": "এই সমাপনী বক্তব্যটি ইন্টারভিউতে প্রযুক্তি এবং তার মানবিক ও ব্যবসায়িক প্রভাবের সেতুবন্ধন রচনা করে তোমাকে বিজয়ী করবে।"
        }
      ]
    }
  ]
};
