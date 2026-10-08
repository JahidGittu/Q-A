// Topic 8: Multi-Tenant Data Isolation (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "multitenant-isolation",
  name: "Multi-Tenant Data Isolation & SaaS Architecture",
  desc: "Shared DB Shared Schema, Schema-per-Tenant, DB-per-Tenant, Postgres RLS, Prisma Tenant Extensions, Data Leak Prevention",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Multi-Tenant Architecture কী এবং SaaS সফটওয়্যারে এটি কেন অপরিহার্য?",
      m: "Multi-Tenant Architecture হলো এমন একটি সফটওয়্যার আর্কিটেকচার যেখানে একটি একক অ্যাপ্লিকেশন ইনস্ট্যান্স এবং অবকাঠামো বহুসংখ্যক স্বাধীন গ্রাহক বা সংস্থাকে (যাদের 'Tenant' বলা হয়) সার্ভ করে। প্রতিটি টেন্যান্টের ডেটা অন্য টেন্যান্টদের কাছ থেকে সম্পূর্ণ অদৃশ্য ও সুরক্ষিত থাকে। SaaS প্ল্যাটফর্মে এটি অপরিহার্য কারণ: প্রতিটি ক্লায়েন্টের জন্য আলাদা সার্ভার ও ডাটাবেজ বসালে ক্লাউড বিল ও মেইনটেন্যান্স খরচ কোটি টাকায় পৌঁছে যাবে; মাল্টি-টেন্যান্সিতে একক কোডবেজ ও সেন্ট্রালাইজড ডেটাবেজে হাজার হাজার মার্চেন্টকে অত্যন্ত কম খরচে স্কেল করা যায়।",
      b: "মাল্টি-টেন্যান্ট আর্কিটেকচারে একটি সফটওয়্যার ইনস্ট্যান্স একাধিক ক্লায়েন্ট বা সংস্থাকে আলাদা আলাদাভাবে সেবা দেয় এবং প্রত্যেকের ডেটা সুরক্ষিত রাখে। ক্লাউড খরচ নিয়ন্ত্রণ ও এক জায়গা থেকে হাজার হাজার ক্লায়েন্ট পরিচালনা করতে এটি অপরিহার্য।",
      e: "Multi-tenancy is an architectural model where a single software instance serves multiple distinct customer organizations (tenants), maintaining strict logical or physical data boundaries. It is foundational to SaaS economics, enabling centralized deployments, automated patching, and cost efficiencies.",
      tip: "বলো: 'Multi-tenancy serves multiple independent customers from a unified infrastructure while strictly isolating their data.'"
    },
    {
      lvl: "lvl1",
      q: "Multi-Tenant Database ডিজাইনের মূল ৩টি মডেল কী কী?",
      m: "৩টি মডেল: (১) `Shared Database, Shared Schema (Discriminator Column)`: সবাই একই ডেটাবেজ ও একই টেবিলে থাকে, প্রতিটি রো-তে একটি `tenant_id` কলাম থাকে (সর্বোচ্চ কম খরচ, সর্বাধিক স্কেলযোগ্য, Dokani-তে ব্যবহৃত)। (২) `Shared Database, Separate Schema`: সবাই একই ডেটাবেজে থাকে কিন্তু প্রতিটি টেন্যান্টের জন্য আলাদা PostgreSQL Schema তৈরি করা হয় (যেমন `tenant_1.invoices`, `tenant_2.invoices`)। (৩) `Database-per-Tenant`: প্রতিটি গ্রাহকের জন্য সম্পূর্ণ আলাদা স্বাধীন ডেটাবেজ ইনস্ট্যান্স (সর্বোচ্চ আইসোলেশন ও সর্বোচ্চ খরচ, বড় এন্টারপ্রাইজ ব্যাংকিং ক্লায়েন্টদের জন্য প্রযোজ্য)।",
      b: "তিনটি মডেল: (১) শেয়ার্ড ডিবি ও শেয়ার্ড স্কিমা (কলামে tenant_id দিয়ে ভাগ), (২) শেয়ার্ড ডিবি ও পৃথক স্কিমা (প্রতি টেন্যান্টের আলাদা স্কিমা), এবং (৩) ডেটাবেজ-পার-টেন্যান্ট (প্রতি ক্লায়েন্টের জন্য আলাদা ডাটাবেজ)।",
      e: "The three primary multi-tenant database patterns: (1) Shared DB, Shared Schema (pooled tables separated via tenant_id column), (2) Shared DB, Separate Schema (isolated namespaces per tenant), and (3) Database-per-Tenant (isolated database instances per tenant).",
      tip: "ইন্টারভিউতে ৩টি মডেলের নাম ও তাদের খরচ-নিরাপত্তা ব্যালেন্স সুন্দর করে তুলে ধরবে।"
    },
    {
      lvl: "lvl1",
      q: "'Shared Database, Shared Schema' মডেলের সুবিধা ও প্রধান ঝুঁকি কী?",
      m: "সুবিধা: (১) অবকাঠামোগত খরচ সর্বনিম্ন (একটি মাত্র ডেটাবেজ সার্ভারেই হাজার হাজার টেন্যান্ট রাখা যায়), (২) নতুন গ্রাহক অনবোর্ডিং ইনস্ট্যান্ট (কোনো নতুন ডাটাবেজ তৈরি করতে হয় না), (৩) ডেটাবেজ মাইগ্রেশন ও স্কিমা আপডেট এক কমান্ডেই সবার জন্য হয়ে যায়। প্রধান ঝুঁকি: কোনো ডেভেলপার যদি কোনো SQL কুয়েরিতে ভুলবশত `WHERE tenant_id = $1` দিতে ভুলে যায়, তবে এক দোকানের কাস্টমার অন্য দোকানের গোপনীয় ডেটা বা সেলস রিপোর্ট দেখতে পাবে (Catastrophic Cross-Tenant Data Leak)! এই ঝুঁকি দূর করতেই Postgres Row-Level Security (RLS) ব্যবহার করা হয়।",
      b: "সুবিধা হলো সর্বনিম্ন খরচ এবং সহজ অনবোর্ডিং। প্রধান ঝুঁকি হলো কোডে কোথাও tenant_id ফিল্টার মিস হলে এক ক্লায়েন্টের ডেটা অন্য ক্লায়েন্টের কাছে ফাঁস হয়ে যেতে পারে।",
      e: "Advantages: Minimal hosting costs, rapid tenant onboarding, and unified schema migrations. Primary Risk: The catastrophic danger of cross-tenant data leakage if an application engineer accidentally omits the WHERE tenant_id predicate in raw queries.",
      code: "-- Dangerous if tenant_id omitted:\nSELECT * FROM invoices WHERE id = $1; \n-- Must ALWAYS be:\nSELECT * FROM invoices WHERE id = $1 AND tenant_id = $2;"
    },
    {
      lvl: "lvl1",
      q: "PostgreSQL Row-Level Security (RLS) কী এবং এটি মাল্টি-টেন্যান্সি কীভাবে সুরক্ষিত করে?",
      m: "PostgreSQL Row-Level Security (RLS) হলো ডেটাবেজ ইঞ্জিনের বিল্ট-ইন সিকিউরিটি পলিসি মেকানিজম। এটি সক্রিয় থাকলে ডেটাবেজ নিজেই প্রতিটি কুয়েরিতে স্বয়ংক্রিয়ভাবে শর্ত পরীক্ষা করে—এমনকি যদি ডেভেলপার কোডে `WHERE tenant_id = $1` নাও লেখে, তবুও ডেটাবেজ ইঞ্জিন অন্য কোনো টেন্যান্টের রো রিটার্ন করবে না! অ্যাপ্লিকেশন কানেকশনে বর্তমান ইউজারের টেন্যান্ট আইডি সেশন ভ্যারিয়েবলে সেট করা হয় (`SET LOCAL app.current_tenant_id = 't1'`), এবং RLS পলিসি কেবল সেই টেন্যান্টের ডেটা ফিল্টার করে দেয়।",
      b: "পোস্টগ্রেস RLS হলো ডাটাবেজ স্তরের সুরক্ষা নীতি যা স্বয়ংক্রিয়ভাবে কুয়েরিতে নিরাপত্তা শর্ত প্রয়োগ করে। ফলে ডেভেলপার কোডে শর্ত লিখতে ভুলে গেলেও এক টেন্যান্টের ডেটা অন্য টেন্যান্ট কখনোই দেখতে পারে না।",
      e: "PostgreSQL Row-Level Security (RLS) enforces granular row-filtering policies at the database kernel level. Once enabled, PostgreSQL automatically restricts queries to matching tenant rows using session variables (SET LOCAL app.current_tenant_id), guaranteeing complete data isolation even against developer coding errors.",
      code: "ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;\nCREATE POLICY tenant_isolation_policy ON invoices\nFOR ALL USING (tenant_id = current_setting('app.current_tenant_id', true));"
    },
    {
      lvl: "lvl1",
      q: "টেন্যান্ট শনাক্তকরণ (Tenant Identification): ইনকামিং এপিআই রিকোয়েস্টে টেন্যান্ট কীভাবে শনাক্ত করা হয়?",
      m: "৩টি প্রধান উপায়: (১) `Subdomain Routing`: প্রতিটি টেন্যান্টের জন্য সাবডোমেন বরাদ্দ থাকে (যেমন `aroma.dokani.com` বা `bata.dokani.com`)। এপিআই মিডলওয়্যার রিকোয়েস্টের Host হেডার থেকে সাবডোমেন রিড করে টেন্যান্ট আইডি বের করে। (২) `JWT Token Claim`: ইউজারের লগইনের পর প্রাপ্ত JWT-তে `{ tenantId: 'uuid', role: 'ADMIN' }` ক্ল্যাম সংরক্ষিত থাকে। (৩) `Custom Request Header`: মোবাইল অ্যাপ বা থার্ড পার্টি ইন্টিগ্রেশনে `x-tenant-id` হেডার পাঠানো হয়। প্রডাকশনে সাবডোমেন এবং ভেরিফাইড JWT ক্ল্যামের সমন্বয় সবচেয়ে নিরাপদ।",
      b: "রিকোয়েস্টের সাবডোমেন (subdomain.domain.com), JWT টোকেনের ভেতরের tenantId ক্লেইম, অথবা x-tenant-id রিকোয়েস্ট হেডার থেকে মিডলওয়্যার দিয়ে টেন্যান্ট শনাক্ত করা হয়।",
      e: "Tenants are resolved via: Subdomain parsing (tenant.saas.com from HTTP Host headers), verified JWT payload claims ({ tenantId }), or custom HTTP request headers (x-tenant-id). Combining subdomains with cryptographically verified JWT claims provides enterprise-grade security.",
      code: "// Express Middleware:\nconst tenantId = req.user?.tenantId || extractSubdomain(req.headers.host);"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Prisma ORM-এ Client Extensions ব্যবহার করে স্বয়ংক্রিয়ভাবে `tenantId` ইনজেকশন কীভাবে করবে?",
      m: "Prisma v4.7+ এ `$extends` মেকানিজম দিয়ে আমরা ক্লায়েন্ট-লেভেলে কুয়েরি ইন্টারসেপ্ট করতে পারি। একটি এক্সটেনশন ডিফাইন করি যা প্রতিটি মডেলের `findMany`, `findFirst`, `create`, `update`, `delete` অপারেশনে অটোমেটিক বর্তমান কন্টেক্সটের `tenantId` ইনজেক্ট করে। ফলে কন্ট্রোলারে ডেভেলপারকে বারবার ম্যানুয়ালি `{ where: { tenantId } }` লিখতে হয় না এবং মানবীয় ভুলের কারণে ডেটা লিক হওয়ার সম্ভাবনা ১০০% শূন্যে নেমে আসে।",
      b: "প্রিজমা ক্লায়েন্ট এক্সটেনশন দিয়ে প্রতিটি কুয়েরিতে স্বয়ংক্রিয়ভাবে tenantId ইনজেক্ট করা যায়। ফলে কোডে বারবার ফিল্টার লিখতে হয় না এবং কোনো ডেটা লিক ঘটে না।",
      e: "Leverage Prisma Client Extensions ($extends) to intercept query execution. The extension injects { where: { tenantId } } on reads/mutations and automatically attaches data: { tenantId } on creates, eliminating human error.",
      code: "const prismaWithTenant = (tenantId: string) => {\n  return prisma.$extends({\n    query: {\n      $allModels: {\n        async findMany({ args, query }) {\n          args.where = { ...args.where, tenantId };\n          return query(args);\n        }\n      }\n    }\n  });\n};"
    },
    {
      lvl: "lvl2",
      q: "PostgreSQL-এ 'Schema-per-Tenant' আর্কিটেকচারে `search_path` কীভাবে ব্যবহার করা হয় এবং এর অসুবিধা কী?",
      m: "এই মডেলে প্রতিটি টেন্যান্টের জন্য আলাদা স্কিমা থাকে (`CREATE SCHEMA tenant_a; CREATE SCHEMA tenant_b;`)। রিকোয়েস্ট আসার পর ডাটাবেজ সেশনে কমান্ড পাঠানো হয় `SET search_path TO tenant_a, public;`। এরপর স্বাভাবিক `SELECT * FROM invoices;` চালালে পোস্টগ্রেস স্বয়ংক্রিয়ভাবে `tenant_a`-এর টেবিল থেকে ডেটা পড়ে। সুবিধা: টেবিল কলামে কোনো `tenant_id` লাগে না। অসুবিধা: (১) টেন্যান্ট সংখ্যা ১০০০ ছাড়িয়ে গেলে ডেটাবেজে লক্ষ লক্ষ টেবিল তৈরি হয়ে পোস্টগ্রেসের ইন্টারনাল ক্যাটালগ ও মেমোরি ব্লোট হয়, (২) প্রতিবার স্কিমা মাইগ্রেশন চালাতে শত শত স্কিমায় পৃথক মাইগ্রেশন স্ক্রিপ্ট ঘুরতে গিয়ে ঘণ্টার পর ঘণ্টা সময় লাগে।",
      b: "search_path পরিবর্তন করে প্রতিটি টেন্যান্টের আলাদা স্কিমা সিলেক্ট করা হয়। তবে হাজার হাজার ক্লায়েন্ট থাকলে লক্ষাধিক টেবিল তৈরি হয়ে ডেটাবেজ স্লো হয় এবং মাইগ্রেশন করা অত্যন্ত কঠিন হয়ে পড়ে।",
      e: "Schema-per-tenant leverages PostgreSQL search_path (SET search_path TO tenant_x). However, this scales poorly beyond hundreds of tenants because maintaining tens of thousands of tables bloats PostgreSQL system catalogs and makes schema migrations excruciatingly slow.",
      code: "SET search_path TO tenant_123, public;\nSELECT * FROM invoices; -- Queries tenant_123.invoices automatically"
    },
    {
      lvl: "lvl2",
      q: "PostgreSQL RLS-এ `current_setting('app.current_tenant_id')` কীভাবে ট্রানজ্যাকশন কানেকশনে পুলে লিক হওয়া ছাড়া সেট করবে?",
      m: "কানেকশন পুলিং (যেমন PgBouncer) ব্যবহার করার সময় যদি আপনি `SET app.current_tenant_id = 't1'` রান করেন, তবে কানেকশন পুলে ফেরত যাওয়ার পর অন্য কোনো ইউজার ওই কানেকশনটি পেলে আগের টেন্যান্টের আইডি রয়ে যেতে পারে! সমাধান: সবসময় `SET LOCAL` ব্যবহার করতে হবে একটি ট্রানজ্যাকশনের ভেতরে (`SET LOCAL app.current_tenant_id = 't1'`)। `SET LOCAL` নিশ্চিত করে যে ট্রানজ্যাকশন শেষ (COMMIT বা ROLLBACK) হওয়ার সাথে সাথেই সেশন ভ্যারিয়েবলটি মেমোরি থেকে মুছে যায় এবং কানেকশনটি শতভাগ ক্লিন অবস্থায় পুলে ফেরত যায়।",
      b: "কানেকশন পুলে ডেটা লিক এড়াতে ট্রানজ্যাকশনের মধ্যে সর্বদা SET LOCAL app.current_tenant_id ব্যবহার করতে হয়। ট্রানজ্যাকশন শেষ হলেই এই মানটি স্বয়ংক্রিয়ভাবে মুছে যায়।",
      e: "In connection-pooled environments, standard SET bleeds state across subsequent sessions. Always invoke SET LOCAL app.current_tenant_id inside an explicit transaction block; SET LOCAL automatically reverts to default upon COMMIT or ROLLBACK.",
      code: "BEGIN;\nSELECT set_config('app.current_tenant_id', 'tenant-uuid-123', true);\nSELECT * FROM sensitive_invoices; -- Strictly scoped to tenant-uuid-123\nCOMMIT;"
    },
    {
      lvl: "lvl2",
      q: "MongoDB-তে Multi-Tenant Data Isolation কীভাবে অর্জিত হয়?",
      m: "MongoDB-তে দুটি মূল অ্যাপ্রোচ: (১) `Single Database, Tenant-ID Field (সবচেয়ে জনপ্রিয়)`: প্রতিটি কালেকশনের প্রতি ডকুমেন্টে `tenantId: ObjectId` ফিল্ড রাখা হয় এবং সব কুয়েরিতে ফিল্টার দেওয়া হয়। এটি সুরক্ষিত রাখতে Mongoose-এ একটি গ্লোবাল প্লাগইন ব্যবহার করে `pre(/^find/)` হুকে স্বয়ংক্রিয়ভাবে `{ tenantId }` যুক্ত করা হয়। কম্পাউন্ড ইনডেক্স `{ tenantId: 1, ... }` দিয়ে কুয়েরি ফাস্ট রাখা হয়। (২) `Database-per-Tenant`: ক্লাউড নোসিবল কালেকশন ম্যানেজ করার জন্য রানটাইমে `mongoose.connection.useDb('tenant_' + id)` ব্যবহার করে ডাইনামিকালি ডাটাবেজ সুইচ করা হয়।",
      b: "মঙ্গোডিবির ক্ষেত্রে ডকুমেন্টে tenantId ফিল্ড রেখে Mongoose প্লাগইন দিয়ে স্বয়ংক্রিয়ভাবে ফিল্টার করা হয়। অথবা useDb() মেথড দিয়ে প্রতিটি টেন্যান্টের জন্য আলাদা নো-এসকিউএল ডেটাবেজে সুইচ করা হয়।",
      e: "MongoDB isolation predominantly relies on an indexed tenantId discriminator field, reinforced via Mongoose query middleware plugins that enforce tenant scopes globally. High-isolation architectures employ dynamic database switching via connection.useDb().",
      code: "const tenantDb = mongoose.connection.useDb(`tenant_${tenantId}`, { useCache: true });\nconst TenantOrder = tenantDb.model('Order', orderSchema);"
    },
    {
      lvl: "lvl2",
      q: "Multi-Tenant সিস্টেমে 'Noisy Neighbor Problem' কী এবং ডেটাবেজ লেভেলে এটি কীভাবে নিয়ন্ত্রণ করবে?",
      m: "Noisy Neighbor Problem ঘটে যখন শেয়ার্ড ডেটাবেজে কোনো একজন দানবীয় টেন্যান্ট (যেমন লাখ লাখ পণ্য ও সারাদিন বাল্ক কুয়েরি চালানো বড় মার্চেন্ট) ডেটাবেজের ৯০% সিপিইউ, র‍্যাম ও আইওপিএস দখল করে ফেলে—যার ফলে অন্য সাধারণ ছোট টেন্যান্টদের অ্যাপ্লিকেশন ধীরগতির বা ডাউন হয়ে যায়। সমাধান: (১) এপিআই লেভেলে টেন্যান্টভিত্তিক Rate Limiting (Redis Token Bucket) বসানো। (২) ডেটাবেজ লেভেলে কুয়েরি স্টেটমেন্ট টাইমআউট সেট করা (`statement_timeout = '3s'`)। (৩) যদি কোনো টেন্যান্ট অত্যধিক বড় হয়ে যায়, তবে তাকে শেয়ার্ড ক্লাস্টার থেকে মাইগ্রেট করে একটি ডেডিকেটেড ডাটাবেজ ইনস্ট্যান্সে স্থানান্তর করা।",
      b: "নয়েজি নেইবার সমস্যা হলো একটি বড় ক্লায়েন্ট সব সিপিইউ ও মেমোরি খরচ করে বাকি ক্লায়েন্টদের সিস্টেম স্লো করে দেওয়া। রেট লিমিটিং, কুয়েরি টাইমআউট এবং বড় ক্লায়েন্টকে আলাদা সার্ভারে স্থানান্তরের মাধ্যমে এটি প্রতিরোধ করা হয়।",
      e: "The Noisy Neighbor problem occurs when one high-volume tenant starves shared database CPU and I/O resources, degrading latency for all other tenants. Mitigate via tenant-tier rate limiters, strict database statement_timeouts, and migrating hyper-scale tenants to dedicated single-tenant tiers.",
      tip: "বলো: 'We prevent noisy neighbors using tenant rate limits, statement timeouts, and isolated enterprise tiers.'"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "PostgreSQL RLS-এ পারফরম্যান্স ড্রপ এড়াতে ইনডেক্সিং এবং পলিসি অপটিমাইজেশন কীভাবে সাজাতে হয়?",
      m: "ভুলভাবে লেখা RLS পলিসি কুয়েরি পারফরম্যান্স ১০০ গুণ স্লো করে দিতে পারে। অপটিমাইজেশনের গোল্ডেন রুলস: (১) প্রতিটি RLS প্রোটেক্টেড টেবিলে `tenant_id` অবশ্যই ইনডেক্সের সবার শুরুতে থাকতে হবে: `CREATE INDEX idx_tbl_tenant_id ON tbl (tenant_id, ...)`, (২) RLS পলিসির ভেতরে কখনোই কোনো সাব-কুয়েরি (`SELECT id FROM tenants WHERE ...`) চালানো যাবে না! এর বদলে মেমোরিতে থাকা সেশন ভ্যারিয়েবল বা JWT ক্লেইম ব্যবহার করতে হবে (`current_setting()`), (৩) ফাংশন ব্যবহারের সময় নিশ্চিত করতে হবে ফাংশনটি যেন `LEAKPROOF` ও `STABLE` মার্ক করা থাকে যাতে পোস্টগ্রেস অপটিমাইজার ইনডেক্স স্ক্যান পুশ-ডাউন করতে পারে।",
      b: "RLS যাতে কুয়েরি স্লো না করে সেজন্য tenant_id দিয়ে প্রিফিক্স ইনডেক্স তৈরি করতে হয়, পলিসির ভেতর কোনো ভারী সাব-কুয়েরি না রেখে মেমোরি সেশন ভ্যারিয়েবল ব্যবহার করতে হয় এবং ফাংশন STABLE মার্ক করতে হয়।",
      e: "Poorly tuned RLS degrades throughput. Optimize by creating leading B-Trees on (tenant_id, ...), avoiding correlated subqueries within USING clauses, and relying exclusively on lightweight session settings (current_setting) evaluated without table lookups.",
      code: "CREATE POLICY tenant_fast_rls ON orders\nFOR ALL USING (tenant_id = (current_setting('app.tenant_id'))::uuid);"
    },
    {
      lvl: "lvl3",
      q: "Multi-Tenant সিস্টেমে ব্যাকগ্রাউন্ড প্রসেসিং ও অ্যাসিনক্রোনাস জব কিউ (BullMQ/RabbitMQ)-তে Tenant Context কীভাবে সংরক্ষণ ও প্রপাগেট করবে?",
      m: "এপিআই রিকোয়েস্টের সময় টেন্যান্ট আইডি HTTP হেডারে থাকে, কিন্তু ব্যাকগ্রাউন্ড জবে কোনো HTTP রিকোয়েস্ট থাকে না! সমাধান: যখনই এপিআই কোনো ব্যাকগ্রাউন্ড জব এনকিউ (Enqueue) করে, জবের পে-লোডের মেটাডেটাতে অবশ্যই `{ tenantId: req.tenantId, userId: req.userId }` বাধ্যতামূলকভাবে পুশ করতে হবে। BullMQ ওয়ার্কার যখন প্রসেসিং শুরু করবে, সে জবের ডেটা থেকে `tenantId` রিড করবে এবং ডেটাবেজ ট্রানজ্যাকশন শুরু করে `SET LOCAL app.current_tenant_id` কনফিগার করে কাজ শুরু করবে। কোনো জব যদি `tenantId` ছাড়া আসে, ওয়ার্কার তাৎক্ষণিক জব রিজেক্ট করবে।",
      b: "ব্যাকগ্রাউন্ড জবে কোনো HTTP হেডার না থাকায় জবের ডেটা পে-লোডে বাধ্যতামূলকভাবে tenantId পাস করা হয়। ওয়ার্কার কাজ শুরু করার আগে ডাটাবেজ সেশনে সেই tenantId সেট করে কাজ করে।",
      e: "Since asynchronous workers lack HTTP request headers, the publishing API must explicitly embed { tenantId } into the job payload metadata. Worker consumers extract tenantId and inject it into the database session context before executing the background task.",
      code: "// Producer:\nawait invoiceQueue.add('SEND_PDF', { invoiceId, tenantId: req.tenantId });\n// Worker:\ninvoiceQueue.process(async (job) => {\n  const { tenantId } = job.data;\n  await runInTenantContext(tenantId, async () => { ... });\n});"
    },
    {
      lvl: "lvl3",
      q: "Node.js-এ `AsyncLocalStorage` ব্যবহার করে থ্রেড-সেফ এবং মিডলওয়্যার-লেভেল Tenant Context ট্র্যাকিং কীভাবে তৈরি করবে?",
      m: "`AsyncLocalStorage` (Node.js `async_hooks` মডিউল) অ্যাসিনক্রোনাস এক্সিকিউশন চেইনে কনটেক্সট ট্র্যাকিংয়ের জন্য তৈরি। প্রতিটি এপিআই রিকোয়েস্ট আসার পর মিডলওয়্যার টেন্যান্ট আইডি এক্সট্র্যাক্ট করে `tenantStorage.run({ tenantId }, () => next())` এক্সিকিউট করে। এর ফলে সম্পূর্ণ অ্যাসিনক্রোনাস কল স্ট্যাকের যেকোনো সার্ভিস, রিপোজিটরি বা ইউটিলিটি ফাংশনে প্যারামিটার পাস না করেই সরাসরি `tenantStorage.getStore()?.tenantId` দিয়ে সঠিক টেন্যান্ট পাওয়া যায়। এটি নোডের সিঙ্গেল-থ্রেডেড ইভেন্ট লুপেও সম্পূর্ণ আইসোলেটেড ও ১০০% কনকারেন্সি-সেফ।",
      b: "AsyncLocalStorage প্যারামিটার পাস করা ছাড়াই পুরো অ্যাসিনক্রোনাস কোডবেজে টেন্যান্ট আইডি অ্যাক্সেস করার সুবিধা দেয়। এটি কোনো ডেটা ওভারল্যাপ ছাড়া শতভাগ কনকারেন্সি-সেফ।",
      e: "AsyncLocalStorage creates execution context stores that persist across asynchronous call chains without manual parameter passing. Express middleware runs the request lifecycle inside asyncLocalStorage.run({ tenantId }), providing zero-risk thread-safe tenant context access across deep service layers.",
      code: "import { AsyncLocalStorage } from 'async_hooks';\nexport const tenantContext = new AsyncLocalStorage<{ tenantId: string }>();\n// Middleware:\napp.use((req, res, next) => {\n  tenantContext.run({ tenantId: req.tenantId }, () => next());\n});\n// Service:\nconst currentTenant = tenantContext.getStore()?.tenantId;"
    },
    {
      lvl: "lvl3",
      q: "Multi-Tenant ডেটা মাইগ্রেশন: ১,০০০ টেন্যান্টের শেয়ার্ড ডেটাবেজে স্কিমা মাইগ্রেশন করার সময় জিরো ডাউনটাইম কীভাবে নিশ্চিত করবে?",
      m: "শেয়ার্ড স্কিমা মডেলে সুবিধা হলো একটি মাত্র মাইগ্রেশন চালালেই সব টেন্যান্ট আপডেট হয়ে যায়। কিন্তু যাতে কোনো ডাউনটাইম বা টেবিল লক না হয়, সেজন্য 'Expand and Contract' প্যাটার্ন মানতে হবে: (১) নতুন কলাম যুক্ত করার সময় `DEFAULT` ভ্যালু সহ নাল-অ্যালাউড (`NULLABLE`) হিসেবে যোগ করা, (২) ব্যাকওয়ার্ড কমপ্যাটিবল কোড ডিপ্লয় করা যা পুরনো ও নতুন কলাম উভয়ই পড়তে পারে, (৩) ব্যাকগ্রাউন্ড মাইগ্রেশন দিয়ে পুরনো ডেটা ব্যাকফিল করা, (৪) সবশেষে `NOT NULL` কনস্ট্রেইন্ট যোগ করা এবং অপ্রয়োজনীয় পুরনো কলাম ড্রপ করা। কখনোই প্রোডাকশনে সরাসরি কলাম রিনেম বা ড্রপ করা যাবে না।",
      b: "জিরো ডাউনটাইম মাইগ্রেশনের জন্য Expand and Contract প্যাটার্ন অনুসরণ করা হয়। প্রথমে নতুন কলাম ব্যাকওয়ার্ড কমপ্যাটিবল হিসেবে যোগ করে ব্যাকগ্রাউন্ডে ডেটা মাইগ্রেট করা হয় এবং পরে পুরনো কলাম রিমুভ করা হয়।",
      e: "Execute zero-downtime migrations in multi-tenant shared schemas using the Expand and Contract pattern: add non-blocking nullable columns, deploy code supporting both schemas, backfill tenant data asynchronously, enforce NOT NULL constraints, and finally decommission deprecated columns.",
      tip: "ইন্টারভিউতে 'Expand and Contract database migration pattern' উল্লেখ করবে।"
    },
    {
      lvl: "lvl3",
      q: "SaaS প্ল্যাটফর্মে GDPR বা ডেটা কমপ্লায়েন্স: কোনো ক্লায়েন্ট সাবস্ক্রিপশন ক্যানসেল করলে শেয়ার্ড ডেটাবেজ থেকে তার সম্পূর্ণ ডেটা কীভাবে ক্রিপ্টোগ্রাফিকালি বা ফিজিক্যালি মুছবে?",
      m: "শেয়ার্ড টেবিলে লাখ লাখ রোর মাঝে শুধু একজন টেন্যান্টের ডেটা `DELETE` চালানো পারফরম্যান্সের ওপর প্রেশার ফেলতে পারে এবং ব্যাকআপ ফাইলে তার ডেটা রয়ে যেতে পারে। সমাধান: (১) `Crypto-Shredding`: প্রতিটি টেন্যান্টের ডেটা তার নিজস্ব অনন্য সিমেট্রিক এনক্রিপশন কি (KMS-এ সংরক্ষিত Tenant Key) দিয়ে এনক্রিপ্ট করে সেভ করা হয়। ক্লায়েন্ট সাবস্ক্রিপশন বাতিল করলে আমরা শুধু KMS থেকে ওই টেন্যান্টের এনক্রিপশন কি ডিলিট বা পার্জ করে দিই! ফলে মূল ডেটাবেজ এবং পূর্বের ব্যাকআপের সমস্ত ডেটা তাৎক্ষণিকভাবে অপ্রবেশ্য ও পাঠ-অযোগ্য হয়ে যায় (Cryptographic Erasure)। (২) এরপর ব্যাকগ্রাউন্ড ব্যাচ স্ক্রিপ্ট দিয়ে নিরাপদে তার রো-গুলো ডিলিট ও ভ্যাকুয়াম করা হয়।",
      b: "ক্রিপ্টো-শ্রেডিং পদ্ধতিতে প্রতিটি টেন্যান্টের ডেটা আলাদা এনক্রিপশন কি দিয়ে সেভ থাকে। ক্লায়েন্ট ক্যান্সেল করলে কেবল ওই কি ডিলিট করলেই ডেটাবেজ ও ব্যাকআপ ফাইল উভয়ের ডেটা চিরতরে অপ্রবেশ্য হয়ে যায়।",
      e: "Implement Crypto-Shredding for multi-tenant GDPR compliance: each tenant's sensitive columns are encrypted using a unique Tenant Encryption Key managed in AWS/GCP KMS. Erasing the tenant's KMS key instantly renders their data cryptographically unrecoverable across all active databases and historical backups.",
      tip: "ইন্টারভিউতে 'Crypto-shredding guarantees multi-tenant GDPR compliance across backups' চমৎকার পয়েন্ট।"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: সিকিউরিটি অডিটে দেখা গেল একজন অথেনটিকেটেড ইউজার ব্রাউজারের DevTools থেকে রিকোয়েস্ট বডিতে `{ tenantId: 'victim-company-id' }` বসিয়ে অন্যের ডাটাবেজে প্রোডাক্ট তৈরি করতে সক্ষম হয়েছে! কোডে কোথায় ফাঁক ছিল এবং কীভাবে বন্ধ করবে?",
      m: "মারাত্মক দুর্বলতা: কন্ট্রোলার বা সার্ভিস লেভেলে রিকোয়েস্ট বডির ওপর অন্ধবিশ্বাস করা হয়েছিল (`const { tenantId } = req.body`)! কোনো হ্যাকার রিকোয়েস্ট বডিতে যেকোনো টেন্যান্ট আইডি বসাতে পারে। সমাধান: (১) ক্লায়েন্ট বা রিকোয়েস্ট বডি থেকে আসা কোনো `tenantId` গ্রহণ করা সম্পূর্ণ নিষিদ্ধ করতে হবে। (২) Zod স্কিমায় রিকোয়েস্ট বডি থেকে `tenantId` ফিল্ডকে স্ট্রিপ বা ডিস-অ্যালাউ করতে হবে। (৩) এপিআইতে `tenantId` শুধুমাত্র ক্রিপ্টোগ্রাফিক্যালি ভ্যালিডেটেড JWT টোকেন থেকে রিড করে সার্ভার-সাইডে ইনজেক্ট করতে হবে: `const tenantId = req.user.tenantId`।",
      b: "ক্লায়েন্ট সাইড থেকে পাঠানো রিকোয়েস্ট বডির tenantId বিশ্বাস করার কারণে এই নিরাপত্তা ত্রুটি ঘটেছে। বডি থেকে tenantId নেওয়া নিষিদ্ধ করে শুধুমাত্র ভেরিফায়েড JWT টোকেন থেকে সার্ভার সাইডে টেন্যান্ট আইডি ইনজেক্ট করতে হবে।",
      e: "The vulnerability stems from trusting user-controlled request payload bodies for tenant scoping. Strip tenantId from incoming schemas via Zod, and inject tenantId exclusively on the server from cryptographically verified JWT authentication tokens (req.user.tenantId).",
      code: "// Vulnerable: const { tenantId } = req.body;\n// Secure: Enforce server-side identity injection\nconst newProduct = await prisma.product.create({\n  data: { ...validatedBody, tenantId: req.user.tenantId }\n});"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: Dokani POS-এ একজন মার্চেন্টের দোকান থেকে অন্য দোকানের রিপোর্ট দেখার অভিযোগ এসেছে। ইনভেস্টিগেট করে দেখলে কোনো এক ডেভেলপার `prisma.$queryRaw` ব্যবহার করে র কুয়েরি লিখেছিল কিন্তু `tenant_id` ফিল্টার দিতে ভুলে গেছে! কীভাবে ভবিষ্যতে এমন ভুল কোড রিভিউ ছাড়া স্বয়ংক্রিয়ভাবে ব্লক করবে?",
      m: "সমাধানের ধাপ: (১) ডাটাবেজ লেভেলে অবিলম্বে PostgreSQL Row-Level Security (RLS) সক্রিয় করতে হবে—যাতে কোনো ডেভেলপার র কুয়েরিতে `tenant_id` মিস করলেও ডাটাবেজ ইঞ্জিন অন্য কোনো টেন্যান্টের ডেটা কখনোই রিটার্ন না করে। (২) ESLint কাস্টম রুল বা SonarQube গেট বসানো যাতে কোডে আন-গার্ডেড `$queryRaw` সরাসরি ব্যবহার নিষিদ্ধ থাকে এবং শুধুমাত্র টেস্টেড ও ভ্যালিডেটেড টাইপ-সেফ রিপোজিটরি মেথড ব্যবহারে বাধ্য করে।",
      b: "পোস্টগ্রেস RLS সক্রিয় করলে র কুয়েরিতে শর্ত মিস হলেও ডেটাবেজ লেভেলে ডেটা লিক ঠেকানো যায়। পাশাপাশি ESLint ও সোনারকিউব রুল দিয়ে আন-গার্ডেড কুয়েরি লেখা স্বয়ংক্রিয়ভাবে ব্লক করতে হবে।",
      e: "Mitigate by activating PostgreSQL Row-Level Security (RLS) across all multi-tenant tables; RLS ensures that even flawed raw SQL queries strictly return rows matching the active tenant. In addition, establish static AST linting rules forbidding naked $queryRaw usage in PRs.",
      code: "ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;\nCREATE POLICY tenant_strict ON invoices\nFOR ALL USING (tenant_id = current_setting('app.tenant_id')::uuid);"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একজন এন্টারপ্রাইজ ক্লায়েন্ট দাবি করেছে তাদের সংবেদনশীল ডেটা কোনোভাবেই অন্য কোনো কোম্পানির সাথে একই টেবিলে রাখা যাবে না, কিন্তু তোমার সম্পূর্ণ সিস্টেম 'Shared Database Shared Schema' মডেলে তৈরি। পুরো কোডবেজ রিরাইট না করে কীভাবে তাদের অনবোর্ড করবে?",
      m: "হাইব্রিড সমাধান: পুরো কোড রিরাইট করার দরকার নেই! (১) ডেটাবেজ কানেকশন ফ্যাক্টরি তৈরি করি যা টেন্যান্ট টাইপ চেক করে (`tenant.tier === 'ENTERPRISE'`)। (২) সাধারণ ক্লায়েন্টদের জন্য ডিফল্ট শেয়ার্ড ডেটাবেজ পুল ব্যবহার করা হবে। (৩) এন্টারপ্রাইজ ক্লায়েন্টের জন্য একটি পৃথক প্রাইভেট ডেটাবেজ ইনস্ট্যান্স প্রভিশন করে কানেকশন পুল ক্যাশে তার জন্য ডেডিকেটেড Prisma Client ইনস্ট্যান্স অ্যাসাইন করব। (৪) একই অ্যাপ্লিকেশন কোডবেজ ও বিজনেস লজিক কোনো পরিবর্তন ছাড়াই স্বচ্ছভাবে উভয় ডেটাবেজে এক্সিকিউট হবে।",
      b: "কানেকশন ফ্যাক্টরি ব্যবহার করে সাধারণ ক্লায়েন্টদের শেয়ার্ড ডিবিতে এবং এন্টারপ্রাইজ ক্লায়েন্টকে ডেডিকেটেড প্রাইভেট ডিবিতে রুট করব। একই বিজনেস লজিক কোনো রিরাইট ছাড়াই উভয় ডিবি হ্যান্ডেল করতে পারবে।",
      e: "Implement a Dynamic Connection Router without touching business logic: standard tenants route to the shared connection pool, while enterprise tenants resolve to an isolated database connection URL based on tenant metadata. The domain services execute identically on both clients.",
      code: "function getPrismaClient(tenant: Tenant) {\n  if (tenant.databaseUrl) {\n    return getDedicatedClient(tenant.databaseUrl);\n  }\n  return sharedPrismaClient;\n}"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: ১০,০০০ টেন্যান্টের শেয়ার্ড টেবিলে `SELECT * FROM products WHERE tenant_id = 't1'` কুয়েরিটি স্লো হয়ে যাচ্ছে কারণ টেবিলে কোটি কোটি রো জমে গেছে। তুমি ইনডেক্সিং কীভাবে অপটিমাইজ করবে?",
      m: "সমস্যার কারণ: হয়তো টেবিলে শুধু `id` বা অন্য কলামে ইনডেক্স ছিল, কিন্তু `tenant_id` দিয়ে লিডিং ইনডেক্স নেই। সমাধান: (১) প্রতিটি ইনডেক্সে `tenant_id`-কে সবার প্রথম কলাম (Leftmost prefix) করতে হবে: `CREATE INDEX idx_products_tenant_composite ON products (tenant_id, is_active, created_at DESC);`। (২) যদি কোটি কোটি রোর কারণে ইনডেক্স সাইজ RAM ছাড়িয়ে যায়, তবে PostgreSQL-এর `Declarative Table Partitioning` ব্যবহার করে `LIST (tenant_id)` অথবা `HASH (tenant_id)` দিয়ে টেবিলটিকে ফিজিক্যালি পার্টিশন করব। ফলে কুয়েরি শুধু নির্দিষ্ট পার্টিশনে হিট করবে এবং ইনডেক্স সাইজ ক্ষুদ্র থাকবে।",
      b: "tenant_id কে প্রতিটি কম্পাউন্ড ইনডেক্সের শুরুতে রাখব। এছাড়া কোটি রোর টেবিলে PostgreSQL Declarative Partitioning দিয়ে টেন্যান্ট পার্টিশনিং করলে কুয়েরি শুধু নির্দিষ্ট ফাইলে হিট করে অতি দ্রুত চলবে।",
      e: "Ensure tenant_id is the leftmost prefix across all compound indexes (tenant_id, is_active, created_at DESC). If the table scales into tens of millions of rows, implement PostgreSQL Declarative Table Partitioning by LIST or HASH on tenant_id for physical partition pruning.",
      code: "CREATE TABLE products (\n  tenant_id UUID NOT NULL,\n  id UUID NOT NULL,\n  name TEXT\n) PARTITION BY LIST (tenant_id);"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: মাল্টি-টেন্যান্ট সিস্টেমে প্রতি টেন্যান্টের নিজস্ব ইনভয়েস নাম্বারিং সিকুয়েন্স থাকতে হবে (যেমন Dokani-তে দোকান A-র ইনভয়েস #1, #2 এবং একই সাথে দোকান B-রও ইনভয়েস #1, #2)। গ্লোবাল Auto-increment ছাড়া এটি কনকারেন্সি-সেফভাবে কীভাবে করবে?",
      m: "সমাধান: গ্লোবাল সিরিয়াল ব্যবহার করলে এক দোকানের ইনভয়েস নম্বর অন্য দোকানের সাথে শেয়ার হবে এবং গ্যাপ তৈরি হবে। কনকারেন্সি-সেফ সমাধান: একটি `TenantSequences` টেবিল তৈরি করি যেখানে `(tenant_id, sequence_type)` ইউনিক কি থাকবে। নতুন ইনভয়েস তৈরির সময় ট্রানজ্যাকশনের মধ্যে অ্যাটমিকালি কল করব: `UPDATE tenant_sequences SET current_value = current_value + 1 WHERE tenant_id = $1 AND type = 'INVOICE' RETURNING current_value;`। এটি সম্পূর্ণ রো-লেভেল লকিংয়ে এক মিলিসেকেন্ডে পরবর্তী ইউনিক ইনভয়েস নম্বর তৈরি করে দেয় কোনো ডুপ্লিকেশন বা গ্যাপ ছাড়া।",
      b: "TenantSequences টেবিলে প্রতিটি টেন্যান্টের জন্য আলাদা সিকুয়েন্স কাউন্টার রাখা হয়। ট্রানজ্যাকশনে UPDATE ... RETURNING current_value কল করে কনকারেন্সি-সেফ উপায়ে প্রতিটি দোকানের জন্য ১ থেকে ইনভয়েস নম্বর শুরু করা যায়।",
      e: "Manage tenant-scoped invoice sequences via a dedicated TenantSequences table. Within the invoice transaction, atomically increment and return the counter using UPDATE tenant_sequences SET next_val = next_val + 1 WHERE tenant_id = $1 RETURNING next_val, eliminating collision risks.",
      code: "const seq = await tx.$queryRaw`\n  UPDATE tenant_sequences \n  SET current_val = current_val + 1 \n  WHERE tenant_id = ${tId} AND seq_key = 'INVOICE'\n  RETURNING current_val;\n`;"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে হাজার হাজার খুচরা ও পাইকারি দোকানের জন্য মাল্টি-টেন্যান্সি ডেটা আইসোলেশন আর্কিটেকচার কীভাবে ডিজাইন করা হয়েছে?",
      m: "দোকানি পিওএসে 'Shared Database, Shared Schema with Strict Multi-Tenancy' মডেল বাস্তবায়ন করা হয়েছে। প্রতিটি টেবিলে (Products, Invoices, Customers, Ledgers) একটি ইনডেক্সড `tenant_id (UUID)` কলাম রয়েছে। আর্কিটেকচার লেয়ারে ৩ স্তরের ডিফেন্স-ইন-ডেপথ সিকিউরিটি কার্যকর: (১) সাবডোমেন ও JWT টোকেন থেকে টেন্যান্ট আইডেন্টিফিকেশন, (২) নোড সার্ভিস লেয়ারে AsyncLocalStorage এবং টাইপ-সেফ Prisma Client এক্সটেনশন যা স্বয়ংক্রিয়ভাবে কুয়েরি স্কোপ করে, এবং (৩) ডেটাবেজ স্তরে PostgreSQL Row-Level Security (RLS) পলিসি। এর ফলে হাজার হাজার মার্চেন্টের ডেটা একই ক্লাস্টারে থেকেও ১০০% изолирован এবং খরচ থাকে সর্বনিম্ন।",
      b: "দোকানি পিওএসে শেয়ার্ড স্কিমা ও ট্রিপল-লেয়ার সিকিউরিটি ব্যবহার করা হয়েছে: সাবডোমেন ভেরিফিকেশন, প্রিজমা এক্সটেনশনে অটো-স্কোপিং এবং ডেটাবেজে পোস্টগ্রেস RLS। ফলে সর্বনিম্ন ক্লাউড খরচে হাজার হাজার দোকানের ডেটা সম্পূর্ণ সুরক্ষিত থাকে।",
      e: "In Dokani POS, multi-tenancy employs a Shared Database, Shared Schema architecture reinforced with defense-in-depth: Subdomain/JWT auth resolution, AsyncLocalStorage context scoping via Prisma extensions, and PostgreSQL Row-Level Security kernel policies.",
      tip: "দোকানির এই ৩ স্তরের ডিফেন্স-ইন-ডেপথ (JWT, Prisma Ext, Postgres RLS) ইন্টারভিউতে উল্লেখ করলে তোমার আর্কিটেকচারাল ম্যাচুরিটি প্রকাশ পাবে।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: মাল্টি-টেন্যান্ট SaaS অ্যাপ্লিকেশনে অটোমেটেড টেন্যান্ট অনবোর্ডিং ওয়ার্কফ্লো কীভাবে ডিজাইন করবে?",
      m: "যখন একজন নতুন দোকানদার সাইন আপ করে: (১) মূল ট্রানজ্যাকশনে `Tenants` টেবিলে নতুন টেন্যান্ট রেকর্ড তৈরি হয় ও ডিফল্ট এডমিন ইউজার ক্রিয়েট হয়, (২) সিডিং সার্ভিস কল হয়ে স্বয়ংক্রিয়ভাবে ডিফল্ট সেটিংস, পেমেন্ট মেথড (ক্যাশ, বিকাশ), ডিফল্ট অ্যাকাউন্টস চার্ট এবং ইনভয়েস সিকুয়েন্স জেনারেট করে, (৩) কাস্টম সাবডোমেন (`storename.dokani.com`) ক্লাউডফ্লেয়ার বা রাউটিং প্রক্সিতে রেজিস্টার হয়, (৪) স্বাগতম ইমেইল এবং টিউটোরিয়াল গাইড পাঠিয়ে অনবোর্ডিং মাত্র ৩ সেকেন্ডের মধ্যে সফলভাবে সম্পন্ন হয়।",
      b: "অনবোর্ডিং ওয়ার্কফ্লোতে ৩ সেকেন্ডে টেন্যান্ট তৈরি, অ্যাডমিন একাউন্ট ক্রিয়েশন, ডিফল্ট পেমেন্ট ও চার্ট অব অ্যাকাউন্টস সিডিং এবং সাবডোমেন রাউটিং স্বয়ংক্রিয়ভাবে সম্পন্ন করা হয়।",
      e: "Automated tenant onboarding runs an idempotent transaction: provisioning the Tenant record, creating default admin credentials, seeding essential business templates (chart of accounts, invoice templates, payment modes), and provisioning DNS subdomain bindings in sub-3 seconds.",
      code: "async function onboardTenant(data) {\n  return await prisma.$transaction(async (tx) => {\n    const tenant = await tx.tenant.create({ data: { name: data.name, slug: data.slug } });\n    await seedDefaultLedgers(tx, tenant.id);\n    await tx.user.create({ data: { ...data.admin, tenantId: tenant.id } });\n    return tenant;\n  });\n}"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: পেন-টেস্টিং ও সিকিউরিটি অডিটে মাল্টি-টেন্যান্ট সিস্টেমের 'BOLA / IDOR' ভালনারেবিলিটি কীভাবে স্ক্যান ও প্রিভেন্ট করবে?",
      m: "BOLA (Broken Object Level Authorization / IDOR) হলো এপিআই সিকিউরিটির ১ নম্বর বিপদ। আক্রমণকারী নিজের টোকেন দিয়ে অন্য টেন্যান্টের ইনভয়েস আইডি পাঠিয়ে ডেটা দেখতে চায় (`GET /api/invoices/other-tenant-invoice-id`)। প্রিভেনশন: (১) রিপোজিটরির কোনো কুয়েরি কখনোই শুধু অবজেক্ট আইডি দিয়ে খুঁজবে না (`findById`)! সবসময় যৌথভাবে খুঁজতে হবে: `findFirst({ where: { id, tenantId } })`। যদি অবজেক্টটি অন্য টেন্যান্টের হয়, তবে কুয়েরি নাল পাবে এবং সিস্টেম তাৎক্ষণিকভাবে 404 Not Found ফিরিয়ে দেবে। (২) অটোমেটেড CI/CD সিকিউরিটি পাইপলাইনে ZAP বা কাস্টম ইন্টিগ্রেশন টেস্ট চালিয়ে ক্রস-টেন্যান্ট অ্যাক্সেস ভেরিফাই করা হয়।",
      b: "IDOR প্রিভেন্ট করতে কখনোই শুধু id দিয়ে খোঁজা যাবে না; সর্বদা id এবং tenantId উভয় শর্ত দিয়ে কুয়েরি করতে হবে যাতে অন্য টেন্যান্টের আইডি দিলে ডাটাবেজ নাল পায় এবং 404 দেয়।",
      e: "Prevent BOLA/IDOR by ensuring every repository lookup strictly couples the entity ID with the active tenant ID: findFirst({ where: { id, tenantId } }). If a malicious user requests a foreign entity, the query evaluates to null and returns 404, denying the entity's existence.",
      tip: "কখনোই `findById(id)` ব্যবহার করবে না; সর্বদা `findOne({ where: { id, tenantId } })` ব্যবহার করবে।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: মাল্টি-টেন্যান্ট সিস্টেমে পার-টেন্যান্ট ফাইল ও ইমেজ স্টোরেজ (S3/Cloudinary/MinIO) কীভাবে আইসোলেট করবে?",
      m: "ক্লাউড স্টোরেজে সব টেন্যান্টের ফাইল এক বালতিতে রাখলে ফাইলে ফাইল ওভাররাইট বা ভুলবশত অ্যাক্সেস পাওয়ার ঝুঁকি থাকে। আর্কিটেকচারাল ডিজাইন: প্রতিটি টেন্যান্টের ফাইলের জন্য ডেডিকেটেড অবজেক্ট পাথ প্রিফিক্স ব্যবহার করা হয়: `s3://dokani-uploads/{tenantId}/{entityType}/{year}/{uuid}.pdf`। ফাইল আপলোড বা ডাউনলোডের জন্য কখনোই পাবলিক ইউআরএল বা ডিরেক্ট অ্যাক্সেস দেওয়া হয় না; সার্ভার থেকে টেন্যান্ট আইডেন্টিটি ভেরিফাই করে ৫ মিনিটের জন্য সময়সীমিত AWS S3 Presigned URL তৈরি করে দেওয়া হয়।",
      b: "ক্লাউড স্টোরেজে টেন্যান্ট আইডি দিয়ে আলাদা পাথ প্রিফিক্স (s3://bucket/{tenantId}/...) ব্যবহার করা হয় এবং সরাসরি অ্যাক্সেস না দিয়ে ৫ মিনিটের Presigned URL দিয়ে ফাইল ডাউনলোড করানো হয়।",
      e: "Isolate tenant assets in object storage via scoped bucket key prefixes: s3://bucket/{tenantId}/{module}/{uuid}.png. Prevent direct public access by generating time-expiring S3 Presigned URLs strictly after authenticating the tenant context.",
      code: "const s3Key = `tenants/${tenantId}/invoices/${invoiceId}.pdf`;\nconst presignedUrl = await getSignedUrl(s3Client, new GetObjectCommand({ Bucket, Key: s3Key }), { expiresIn: 300 });"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: মাল্টি-টেন্যান্ট ডেটাবেজ পার্টিশনিং (PostgreSQL Declarative Table Partitioning) কখন এবং কীভাবে প্রয়োগ করবে?",
      m: "যখন কোনো SaaS প্ল্যাটফর্ম ৫০,০০০+ টেন্যান্ট এবং কোটি কোটি লেনদেনে পৌঁছায়, তখন একটি একক টেবিল ইনডেক্স মেমোরিতে ধরে রাখা কঠিন হয়ে পড়ে। আমরা PostgreSQL-এর `PARTITION BY HASH (tenant_id)` ব্যবহার করে টেবিলটিকে ৩২ বা ৬৪টি ফিজিক্যাল সাব-টেবিলে ভাগ করি। পোস্টগ্রেসের কুয়েরি অপটিমাইজার `tenant_id` দেখে মুহূর্তে বাকি ৬৩টি সাব-টেবিল প্রুন (Partition Pruning) করে বাদ দিয়ে দেয় এবং শুধুমাত্র কাঙ্ক্ষিত পার্টিশনে কুয়েরি চালায়। এর ফলে টেবিল সাইজ কোটি রো হলেও কুয়েরি এক্সিকিউশন ও ভ্যাকুয়ামিং স্পিড সুপারফাস্ট থাকে।",
      b: "বিশাল স্কেলের মাল্টি-টেন্যান্ট ডেটাবেজে PARTITION BY HASH (tenant_id) দিয়ে মূল টেবিলকে ৩২ বা ৬৪টি সাব-টেবিলে ভাগ করা হয়। কুয়েরি তখন শুধুমাত্র সংশ্লিষ্ট পার্টিশনে সার্চ করে অবিশ্বাস্য দ্রুত চলে।",
      e: "When SaaS tables exceed hundreds of millions of rows, implement PostgreSQL Declarative Table Partitioning by HASH(tenant_id) across 32 or 64 sub-tables. The query planner performs partition pruning, seeking exclusively inside the matching tenant partition.",
      code: "CREATE TABLE invoices (\n  tenant_id UUID NOT NULL,\n  id UUID NOT NULL,\n  total NUMERIC\n) PARTITION BY HASH (tenant_id);\nCREATE TABLE invoices_part_0 PARTITION OF invoices FOR VALUES WITH (MODULUS 32, REMAINDER 0);"
    }
  ]
};
