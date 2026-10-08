// NT Tech Innovation — 05. Dokani Multi-Tenant SaaS Architecture & Deep Dive
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.dokani = {
  id: "dokani",
  title: "Dokani SaaS Project Architecture",
  badge: "Multi-Tenant POS/ERP SaaS · https://dokani.bip.sg",
  icon: "🛒",
  topics: [
    {
      id: "dokani-architecture-overview",
      name: "Dokani SaaS Core Architecture & Tenant Isolation",
      desc: "Full-Stack Tech Stack (Next.js, Node.js, PostgreSQL, Prisma), Tenant ID Isolation, JWT Scoping, Monorepo",
      items: [
        {
          lvl: "lvl1",
          q: "Dokani Multi-Tenant POS/ERP SaaS কী এবং এর টেকনোলজি স্ট্যাক কীভাবে নির্বাচন করেছিলে?",
          m: "Dokani হলো একটি আধুনিক ক্লাউড-বেজড মাল্টি-টেন্যান্ট POS ও ইনভেন্টরি ERP প্ল্যাটফর্ম (`https://dokani.bip.sg`) যা সুপারশপ, ডিপার্টমেন্টাল স্টোর ও রিটেইল শপগুলোর জন্য তৈরি। এর টেক স্ট্যাক: ফ্রন্টএন্ডে **Next.js ও Tailwind CSS** (হাই-স্পিড পিওএস ইন্টারফেস ও ড্যাশবোর্ডের জন্য), ব্যাকএন্ডে **Node.js ও Express.js** (নন-ব্লকিং আই/ও ও লাইটওয়েট এপিআইয়ের জন্য), ডাটাবেজে **PostgreSQL ও Prisma ORM** (আর্থিক লেনদেনের কঠোর এসিড ও রো-লেভেল লকিংয়ের জন্য), এবং সার্ভারে **Ubuntu Linux, Nginx, PM2 ও Cloudflare**।",
          b: "দোকানি হলো একাধিক রিটেইল দোকানের জন্য তৈরি একটি ক্লাউড পিওএস ও ইআরপি সিস্টেম। দ্রুতগতির ইউজার ইন্টারফেসের জন্য নেক্সটজেএস ও টেইলউইন্ড, স্কেলেবল এপিআই সার্ভিসের জন্য নোডজেএস এবং নির্ভুল অর্থনৈতিক হিসাবের জন্য পোস্টগ্রেস ও প্রিজমা ওআরএম ব্যবহার করা হয়েছে।",
          e: "Dokani (https://dokani.bip.sg) is a production-grade multi-tenant POS and Inventory ERP SaaS designed for supermarkets and retail chains. The architecture features Next.js and Tailwind CSS on the frontend, Node.js and Express on the backend, PostgreSQL and Prisma ORM for database persistence, hosted on Ubuntu VPS with Nginx, PM2, and Cloudflare edge proxying.",
          tip: "প্রজেক্টের লাইভ ইউআরএল (https://dokani.bip.sg) ইন্টারভিউ বোর্ডে উল্লেখ করলে তোমার কাজের বিশ্বাসযোগ্যতা তাৎক্ষণিক সর্বোচ্চ পর্যায়ে পৌঁছাবে।"
        },
        {
          lvl: "lvl2",
          q: "Dokani-তে বিভিন্ন দোকানের ডেটা পরস্পরের থেকে আলাদা রাখতে (Multi-Tenant Isolation) কীভাবে স্কিমা ডিজাইন করেছিলে?",
          m: "Dokani-তে শত শত স্বাধীন দোকান একই ডাটাবেজ ব্যবহার করে। আমরা **Row-Level Shared Database Architecture** বেছে নিয়েছিলাম। প্রতিটি টেবিলে (Products, Customers, Invoices, Suppliers) বাধ্যতামূলকভাবে `tenantId` কলাম রয়েছে। ইউজার যখন লগইন করে, তার সাইন করা JWT টোকেনের ভেতর `tenantId` এনকোড থাকে। ব্যাকএন্ডের প্রতিটি এপিআই রিকোয়েস্টে মিডলওয়্যার টোকেন থেকে `req.tenantId` উদ্ধার করে এবং Prisma এক্সটেনশনের মাধ্যমে যেকোনো কুয়েরিতে স্বয়ংক্রিয়ভাবে `WHERE tenantId = req.tenantId` যুক্ত করে দেয়। ফলে কোনো দোকানদার অন্য দোকানের ডাটা কোনো অবস্থাতেই দেখতে পায় না।",
          b: "দোকানিতে মাল্টি-টেন্যান্ট নিরাপত্তা বজায় রাখতে প্রতিটি টেবিলে tenantId ফিল্ড রাখা হয়েছে। লগইন টোকেন থেকে পাওয়া টেন্যান্ট আইডি দিয়ে স্বয়ংক্রিয়ভাবে প্রতিটি ডাটাবেজ কুয়েরি ফিল্টার করা হয়, ফলে শত শত দোকান একই ডাটাবেজে থাকলেও কারও তথ্য অন্য কারও কাছে যাওয়ার সুযোগ থাকে না।",
          e: "Dokani adopts a shared-database multi-tenant schema with logical row-level partitioning via tenantId. Each data model enforces tenantId foreign keys. Upon authentication, the verified JWT extracts the active tenant context, which is automatically bound to all Prisma queries via middleware extensions, guaranteeing 100% cryptographic tenant isolation.",
          code: "model Product {\n  id        String   @id @default(uuid())\n  tenantId  String\n  name      String\n  barcode   String\n  stock     Int\n  @@unique([tenantId, barcode]) // Tenant-scoped barcode uniqueness\n}"
        },
        {
          lvl: "lvl3",
          q: "Dokani-তে একই বারকোড দুটি ভিন্ন দোকান কীভাবে ব্যবহার করতে পারে? স্কিমা লেভেলে এটি কীভাবে সমাধান করেছিলে?",
          m: "সাধারণ সিস্টেমে বারকোড কলামে গ্লোবাল `UNIQUE` কনস্ট্রেইন্ট বসালে এক দোকান যে বারকোড ব্যবহার করে (যেমন '1001' বা কাস্টম স্টিকার), অন্য কোনো দোকান আর সেই বারকোড ব্যবহার করতে পারত না—যা মাল্টি-টেন্যান্ট অ্যাপের জন্য বিশাল বাগ। Dokani-তে আমি **Composite Unique Constraint** ব্যবহার করেছি: `@@unique([tenantId, barcode])`। এর ফলে ডাটাবেজে দোকান A-এর জন্য `(TenantA, '1001')` ইউনিক, এবং একই সময়ে দোকান B-এর জন্যও `(TenantB, '1001')` সম্পূর্ণ ইউনিক ও ভ্যালিড! কোনো দোকানদার অন্য দোকানের বারকোডের কারণে বাধার সম্মুখীন হয় না।",
          b: "ভিন্ন ভিন্ন দোকান যাতে একই বারকোড স্বাধীনভাবে ব্যবহার করতে পারে সেজন্য আমরা কম্পোজিট ইউনিক কনস্ট্রেইন্ট (tenantId + barcode) ব্যবহার করেছি। ফলে একই বারকোড আলাদা আলাদা দোকানে কোনো সমস্যা ছাড়াই একাধিকবার ব্যবহার করা সম্ভব হয়।",
          e: "Enforcing a global UNIQUE constraint on product barcodes would artificially block independent stores from registering identical manufacturer or custom SKU codes. In Dokani, I implemented composite uniqueness: @@unique([tenantId, barcode]). This allows multiple distinct tenants to register overlapping barcodes without conflict.",
          code: "@@unique([tenantId, barcode])"
        },
        {
          lvl: "situation",
          q: "Dokani-তে একটি সুপারশপ ১টি বড় বিক্রিতে ৫০টি প্রোডাক্টের বিল তৈরি করার সময় ইন্টারনেটের সামান্য ড্রপে সাবমিট বাটন ২ বার ক্লিক করেছে। কীভাবে ডুপ্লিকেট ইনভয়েস তৈরি হওয়া রোধ করেছিলে?",
          m: "এখানে ডাবল সাবমিশনে ডুপ্লিকেট সেলস তৈরি হয়ে টাকা ও স্টক দুবার কাটা পড়ার ঝুঁকি থাকে। সমাধান: (১) **Client Idempotency Key:** ফ্রন্টএন্ডে কার্ট ইনিশিয়ালাইজ হওয়ার সময় `crypto.randomUUID()` দিয়ে একটি ইউনিক `idempotencyKey` তৈরি করে রিকোয়েস্ট হেডারে পাঠানো হতো। (২) **Backend Idempotency Cache:** ব্যাকএন্ডে Redis বা ডাটাবেজে চেক করা হতো—গত ৫ মিনিটের মধ্যে এই কি দিয়ে কোনো ইনভয়েস প্রসেস হয়েছে কিনা। যদি হ্যাঁ, তবে নতুন করে বিক্রি না বানিয়ে পূর্বের তৈরি হওয়া ইনভয়েস রেসপন্স রিটার্ন করা হতো। (৩) ফ্রন্টএন্ডে সাবমিট বাটনে ক্লিক করার সাথে সাথে বাটনটি ডিজেবল (`isSubmitting`) হয়ে যেত।",
          b: "ডাবল ক্লিক বা নেটওয়ার্ক সমস্যায় ডুপ্লিকেট বিল তৈরি বন্ধ করতে আমরা আইডেমপোটেন্সি কি (Idempotency Key) ব্যবহার করেছি। প্রতিটি অর্ডারের সাথে একটি ইউনিক আইডি পাঠানো হয় যা ব্যাকএন্ডে প্রথমবার সফল হওয়ার পর দ্বিতীয়বার একই রিকোয়েস্ট আসলে পুনরায় ডাটাবেজ আপডেট না করে আগের সফল মেমোটি ফেরত দেয়।",
          e: "To prevent duplicate billing from double-clicks or transient network retries, Dokani employs Idempotency Keys. The client generates a unique UUID per checkout attempt sent via the X-Idempotency-Key header. The backend checks an atomic lock in Redis/DB; if the transaction was already processed, it returns the cached invoice response without re-executing stock deductions or ledger writes.",
          tip: "Stripe-এর মতো এন্টারপ্রাইজ সিস্টেমের Idempotency Key প্যাটার্নের উল্লেখ টেকনিক্যাল বোর্ডে দারুণ প্রশংসিত হয়।"
        },
        {
          lvl: "realworld",
          q: "Dokani-র লাইভ ট্রাফিকের সময় তুমি মেমোরি লিক বা স্লোনেস পর্যবেক্ষণ করতে কোন মেট্রিক্সগুলো মনিটর করতে?",
          m: "Dokani লাইভ প্রোডাকশনে আমি ৩টি প্রধান মেট্রিক মনিটর করতাম: (১) **PM2 Memory Footprint:** কোনো ওয়ার্কার যাতে ৬০০ মেগাবাইটের বেশি মেমোরি কনজিউম না করে। (২) **PostgreSQL Active Connections & Slow Queries:** `pg_stat_activity` দিয়ে দেখতাম কোনো কুয়েরি ২০০ মিলিসেকেন্ডের বেশি সময় নিচ্ছে কিনা এবং PgBouncer ঠিকমতো কানেকশন রিলিজ করছে কিনা। (৩) **API Response Latency:** Nginx এক্সেস লগে `$request_time` ট্র্যাক করে নিশ্চিত করতাম পিওএস বিলিং এপিআইয়ের রেসপন্স সবসময় ৫০–৮০ মিলিসেকেন্ডের মধ্যে শেষ হচ্ছে।",
          b: "দোকানি লাইভ সিস্টেমে আমরা পিএম২ মেমোরি ব্যবহার, পোস্টগ্রেসের দীর্ঘমেয়াদী কুয়েরি এবং এনগিনক্সের এপিআই রেসপন্স টাইম নিয়মিত পর্যবেক্ষণ করতাম যাতে ক্যাশিয়ারের কাউন্টারে বিক্রির সময় কোনো ল্যাগ অনুভূত না হয়।",
          e: "In Dokani POS live operations, key health indicators included PM2 worker heap allocations (enforcing 600MB auto-restart thresholds), PostgreSQL connection saturation via pg_stat_activity and PgBouncer pool metrics, and upstream request durations recorded in Nginx logs, keeping checkout endpoint latencies strictly below 80ms.",
          tip: "এই প্রোডাকশন মেট্রিক্স জানা একজন অভিজ্ঞ সফটওয়্যার ইঞ্জিনিয়ারের লক্ষণ।"
        }
      ]
    },
    {
      id: "dokani-pos-fast-billing",
      name: "High-Speed POS Billing, Barcode & Thermal Printing",
      desc: "Barcode Scanner Keystroke Buffering, Cart O(1) State, Thermal Receipt Printing (58mm/80mm ESC/POS), Offline Resiliency",
      items: [
        {
          lvl: "lvl1",
          q: "Dokani POS-এ বারকোড স্ক্যানার দিয়ে স্ক্যান করার সময় ইনপুট কীভাবে ক্যাপচার করা হতো?",
          m: "হার্ডওয়্যার বারকোড স্ক্যানারগুলো আসলে ইউএসবি কীবোর্ড হিসেবে কাজ করে—এরা অতি দ্রুত (প্রতি মিলি-সেকেন্ডে) ক্যারেক্টার ইনপুট দেয় এবং শেষে একটি `Enter` কিস্ট্রোক পাঠায়। আমরা যদি প্রতি ক্যারেক্টারে React স্টেট আপডেট করতাম, তবে ব্রাউজার ফ্রিজ হয়ে যেত। আমি একটি গ্লোবাল কীবোর্ড ইভেন্ট লিসেনারে `useRef` বাফার রেখেছিলাম। যখন পর পর দ্রুত ক্যারেক্টার আসত, সেগুলো বাফারে জমা হতো এবং `Enter` কী ডিটেক্ট হওয়ামাত্র বাফার থেকে বারকোডটি নিয়ে একবারে কার্টে প্রোডাক্ট অ্যাড করে বাফার খালি করে দিত।",
          b: "বারকোড স্ক্যানার কীবোর্ডের মতো কাজ করে অত্যন্ত দ্রুত টেক্সট টাইপ করে। রিঅ্যাক্ট স্টেট ল্যাগ এড়াতে ক্যারেক্টারগুলো মেমোরি বাফারে জমা রাখা হতো এবং এন্টার বাটন পেলেই একবারে বারকোড প্রসেস করে কার্টে আইটেম যুক্ত করা হতো।",
          e: "Hardware barcode scanners behave as high-speed keyboard emulators terminated by an Enter keystroke. Updating React state on every raw scanner keystroke causes massive UI stutter. In Dokani, I intercepted the raw keydown stream inside a mutable ref buffer, dispatching the product lookup action only upon the Enter delimiter.",
          code: "const barcodeBuffer = useRef('');\nuseEffect(() => {\n  const handleKeyDown = (e: KeyboardEvent) => {\n    if (e.key === 'Enter') {\n      processBarcode(barcodeBuffer.current);\n      barcodeBuffer.current = '';\n    } else {\n      barcodeBuffer.current += e.key;\n    }\n  };\n  window.addEventListener('keydown', handleKeyDown);\n  return () => window.removeEventListener('keydown', handleKeyDown);\n}, []);"
        },
        {
          lvl: "lvl2",
          q: "Dokani-তে ১০০+ প্রোডাক্টের বড় কার্টে প্রতি আইটেম যোগ বা পরিবর্তনের সময় $O(1)$ অপটিমাইজেশন কীভাবে করেছিলে?",
          m: "সাধারণত কার্টকে যদি একটি সাধারণ অ্যারে `items: [{ id, qty }]` হিসেবে রাখা হয়, তবে প্রতিবার নতুন প্রোডাক্ট স্ক্যান করার পর বা কোয়ান্টিটি বাড়ানোর সময় অ্যারেতে `items.findIndex()` করতে $O(N)$ সময় লাগে। আমি কার্ট স্টেটকে একটি নরমালাইজড হ্যাশম্যাপ বা ডিকশনারি আকারে সাজিয়েছিলাম: `itemsById: { [productId]: { ...item, qty } }`। এর ফলে প্রোডাক্ট অলরেডি কার্টে আছে কিনা তা চেক করা এবং কোয়ান্টিটি বাড়ানো সরাসরি $O(1)$ টাইমে হতো। বিলিং স্ক্রিনে ১০০টি আইটেম থাকলেও কার্ট কখনো ল্যাগ করত না।",
          b: "কার্টে পণ্য বাড়ানোর সময় প্রতিবার অ্যারে খোঁজার বদলে আমরা আইডি ভিত্তিক হ্যাশম্যাপ ব্যবহার করেছি। ফলে কার্টে পণ্য যোগ বা কোয়ান্টিটি ১ বাড়ানোর হিসাব O(1) সময় নিত এবং সুপারশপের শত শত পণ্যের কার্টেও কোনো ধীরগতি হতো না।",
          e: "Structuring a shopping cart as a flat array forces O(N) linear scans on every scan or quantity increment. In Dokani POS, I normalized the cart state into an indexed dictionary: itemsById: { [id]: cartItem }. Finding existing SKUs and incrementing quantities executed in instantaneous O(1) time, preserving 60 FPS UI fluidity even with massive line item counts.",
          code: "// O(1) Cart update\nsetCart((prev) => ({\n  ...prev,\n  [id]: { ...prev[id], qty: (prev[id]?.qty || 0) + 1 }\n}));"
        },
        {
          lvl: "lvl3",
          q: "Dokani POS-এ থার্মাল পেপার (POS 58mm ও 80mm) থেকে প্রিন্ট বের করার সময় নিখুঁত প্রিন্ট ও কাটিং কীভাবে নিশ্চিত করেছিলে?",
          m: "থার্মাল প্রিন্টারে সাধারণ ব্রাউজারের প্রিন্ট পাঠালে মার্জিন নষ্ট হয় এবং অপ্রয়োজনীয় বড় কাগজ বের হয়। সমাধান: (১) `@page { size: 80mm auto; margin: 0; }` দিয়ে কাগজের প্রস্থ ফিক্সড ও হাইট অটো করে দিয়েছিলাম। (২) সমস্ত সিএসএস ইউনিট পিক্সেলের বদলে পয়েন্ট (`pt`) বা মিলিমিটারে (`mm`) দিয়েছিলাম। (৩) প্রিন্টের সময় সাইটের হেডার, ফুটার ও সাইডবার `@media print { .no-print { display: none !important; } }` দিয়ে হাইড করেছিলাম। (৪) ইনভয়েস মেমোর শেষে একটি ছোট মার্জিন দিয়েছিলাম যাতে প্রিন্টারের অটো-কাটার মেমোর টেক্সট না কেটে নিচে কাট করে।",
          b: "থার্মাল প্রিন্টারে নিখুঁত মেমো প্রিন্ট করতে আমরা @media print সিএসএস ব্যবহার করেছি যেখানে কাগজের সাইজ ৮০ মিমি ফিক্সড রাখা হয়েছিল। সাইটের অপ্রয়োজনীয় বোতাম লুকিয়ে শুধু মেমোর অংশটি নিখুঁত কালো রঙে প্রিন্ট হতো এবং কাগজের নিচে কাটারের জন্য মার্জিন রাখা হয়েছিল।",
          e: "For Dokani POS thermal printers, standard browser print styling creates erratic scaling. I configured targeted CSS: defined @page { size: 80mm auto; margin: 0mm }, eliminated all application wrappers via @media print with display: none, enforced crisp monochrome typography using physical point units (font-size: 8pt), and added a 15mm bottom margin to clear the hardware auto-cutter line.",
          code: "@media print {\n  @page { size: 80mm auto; margin: 0; }\n  body { margin: 0; padding: 2mm; width: 80mm; }\n  .no-print { display: none !important; }\n  .thermal-receipt { font-family: 'Courier New', monospace; font-size: 8.5pt; color: #000; }\n}"
        },
        {
          lvl: "situation",
          q: "দোকানের ক্যাশিয়ার কাউন্টারে দাঁড়িয়ে একটানা সেলস করছেন, হঠাৎ ব্রাউজারের ইন্টারনেট কানেকশন ড্রপ করল। কীভাবে অফলাইন সেলস বা ড্রাফট সেভ হ্যান্ডেল করেছিলে?",
          m: "কাউন্টারে দীর্ঘ কাস্টমার লাইন থাকায় ইন্টারনেট চলে গেলেও বিক্রি বন্ধ রাখা যাবে না। সমাধান: (১) **IndexedDB / LocalStorage Cart Persistence:** চলমান কার্ট ও কাস্টমার ইনফরমেশন প্রতি চেঞ্জে ব্রাউজারের IndexedDB-তে সিনক্রোনাইজ হতো—ফলে পেজ রিফ্রেশ বা নেট ড্রপ করলেও কার্ট ড্রাফট হারিয়ে যেত না। (২) **Offline Detection:** `window.addEventListener('offline')` দিয়ে ক্যাশিয়ারের স্ক্রিনে একটি সুন্দর ইয়োলো নোটিশ বার ভেসে উঠত 'অফলাইন মোড: ড্রাফট সংরক্ষিত হচ্ছে'। (৩) নেট ফিরে আসার সাথে সাথে ব্যাকগ্রাউন্ডে ইনভয়েস সিনক্রোনাইজ হয়ে সার্ভারে পুশ হতো।",
          b: "ইন্টারনেট বিচ্ছিন্ন হলেও বিক্রি যাতে আটকে না থাকে সেজন্য কার্টের তথ্য ব্রাউজারের IndexedDB তে স্বয়ংক্রিয়ভাবে সংরক্ষিত হতো। স্ক্রিনে অফলাইন সতর্কবার্তা আসত এবং নেট সংযোগ ফিরে আসার সাথে সাথে পেন্ডিং সেলস সার্ভারে সিঙ্ক হয়ে যেত।",
          e: "To withstand intermittent retail connectivity, Dokani synchronizes active cart drafts into browser IndexedDB. An offline detector (window.addEventListener('offline')) alerts the cashier while buffering transactions locally. Once internet connectivity is restored, an automated queue reconciles and dispatches the buffered sales to the backend.",
          tip: "IndexedDB ও Service Worker ভিত্তিক অফলাইন স্ট্র্যাটেজির উল্লেখ আধুনিক ফুল-স্ট্যাক ইঞ্জিনিয়ারদের বড় পরিচয়।"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এ স্প্লিট পেমেন্ট (Split Payment: কিছু টাকা ক্যাশ + কিছু টাকা বিকাশ/কার্ড) এবং ডিসকাউন্ট ক্যালকুলেশন কীভাবে নির্ভুল করেছিলে?",
          m: "বাস্তব সুপারশপে প্রায়ই কাস্টমার ১০০০ টাকার বিলে ৫০০ টাকা ক্যাশ দেয় এবং বাকি ৫০০ টাকা বিকাশে দেয়। Dokani-তে আমরা **Multi-Tender Payment Architecture** বানিয়েছিলাম: ইনভয়েস মডেলে `payments` অ্যারে থাকত যেখানে প্রতিটি পেমেন্টের মেথড (`CASH`, `BKASH`, `CARD`) এবং আলাদা আলাদা অ্যামাউন্ট রেকর্ড হতো। আমরা ভ্যালিডেশন রাখতাম: `SUM(payments.amount) + dueAmount === grandTotal`। ডিসকাউন্ট দুইভাবে ক্যালকুলেট হতো: আইটেম লেভেল ফ্ল্যাট/পার্সেন্টেজ ডিসকাউন্ট এবং বিল লেভেল স্পেশাল ডিসকাউন্ট—সবগুলো গাণিতিকভাবে সার্ভার লেভেলে ডাবল ভেরিফাই হতো।",
          b: "দোকানি সিস্টেমে আমরা মাল্টি-টেন্ডার পেমেন্ট সাপোর্ট তৈরি করেছি যাতে একজন গ্রাহক এক বিলে অর্ধেক ক্যাশ ও বাকিটা বিকাশে দিতে পারে। প্রতিটি লেনদেন আলাদা মাধ্যমে রেকর্ড হতো এবং মোট পরিশোধ ও বকেয়ার যোগফল মূল বিলের সাথে মেলানো নিশ্চিত করা হতো।",
          e: "In Dokani POS, checkouts accommodate split payments via a normalized Multi-Tender Payment schema. An invoice records an array of payment tenders (e.g., $500 Cash, $500 bKash). An atomic validation rule guarantees that the sum of tendered amounts plus recorded customer dues precisely matches the grand total, preventing cashier accounting discrepancies.",
          code: "model InvoicePayment {\n  id        String      @id @default(uuid())\n  invoiceId String\n  method    PaymentType // CASH, BKASH, NAGAD, CARD\n  amount    Decimal\n}"
        }
      ]
    },
    {
      id: "dokani-inventory-concurrency",
      name: "Inventory Tracking & Concurrency Control",
      desc: "Stock Race Conditions, Atomic Decrements, Warehouse Transfers, Low-Stock Notifications, Auditing",
      items: [
        {
          lvl: "lvl1",
          q: "Dokani-তে ইনভেন্টরি স্টক ডিক্রিমেন্ট করার সময় Race Condition কীভাবে তৈরি হতে পারে?",
          m: "রেস কন্ডিশন তখন ঘটে যখন দুটি কাউন্টার বা ইউজার একই প্রোডাক্ট একই সময়ে বিক্রি করতে চায়। ধরি একটি তেলের বোতলের স্টক আছে ১টি। কাউন্টার ১ প্রোডাক্টটি রিড করল (স্টক=১) এবং কাউন্টার ২-ও একই মিলিসেকেন্ডে প্রোডাক্টটি রিড করল (স্টক=১)। কাউন্টার ১ বিক্রি করে স্টক করল $1-1=0$, এবং কাউন্টার ২-ও বিক্রি করে স্টক করল $1-1=0$। ফলে ১টি তেল বাস্তবে ২টি বিক্রি হয়ে গেল এবং দোকানে স্টক ঘাটতি তৈরি হলো! এটিই হলো классический Race Condition।",
          b: "রেস কন্ডিশন ঘটে যখন দুজন ক্যাশিয়ার একই সময়ে শেষ একটি পণ্য বিক্রি করে ফেলে। সাধারণ রিড ও রাইটে উভয়েই পণ্যটি অবশিষ্ট দেখতে পেয়ে বিক্রি করে দেয়, ফলে দোকানে পণ্যের চেয়ে বেশি বিক্রি হয়ে হিসাব এলোমেলো হয়ে যায়।",
          e: "A race condition occurs when concurrent checkouts read the same stock balance simultaneously. If two cashiers read a stock level of 1 and both subtract 1 concurrently, two sales are recorded for an item with only 1 unit in physical stock, resulting in negative warehouse balances and inventory discrepancies.",
          tip: "সহজ সংখ্যার উদাহরণ দিয়ে রেস কন্ডিশন বোঝালে যেকোনো ইন্টারভিউয়ার খুশি হয়।"
        },
        {
          lvl: "lvl2",
          q: "Dokani-তে এই স্টক ওভারসেলিং (Overselling) চিরতরে বন্ধ করতে তুমি কোন ডাটাবেজ টেকনিক ব্যবহার করেছিলে?",
          m: "আমি অ্যাপ্লিকেশন লেভেলে শুধু কোড দিয়ে স্টক চেক না করে **PostgreSQL Database-Level Atomic Conditional Decrement** ব্যবহার করেছিলাম: `UPDATE products SET stock = stock - :qty WHERE id = :id AND stock >= :qty RETURNING stock;`। ডাটাবেজ ইঞ্জিন নিজে এই রোটিকে আপডেটের সময় মাইক্রোসেকেন্ডের জন্য লক করে। যদি স্টক পর্যাপ্ত থাকে কেবল তখনই আপডেট ১টি রো এফেক্ট করে এবং নতুন স্টক রিটার্ন করে। আর যদি ইতিমধ্যে অন্য কেউ স্টক ০ করে ফেলে, কুয়েরিটি ০ রো রিটার্ন করে—যার ফলে আমরা সাথে সাথে ক্যাশিয়ারকে '❌ পণ্যটির স্টক শেষ' লাল নোটিশ দিয়ে সেলস রোলব্যাক করতে পারতাম।",
          b: "ওভারসেলিং বন্ধে আমরা এসকিউএল লেভেলে অ্যাটোমিক ডিক্রিমেন্ট ব্যবহার করেছি যা একই সাথে stock >= qty চেক করে স্টক কমায়। যদি স্টক শূন্য হয়ে যায় তবে ডাটাবেজে কোনো আপডেট হয় না এবং ক্যাশিয়ারকে তৎক্ষণাৎ স্টক শেষের বার্তা জানানো হয়।",
          e: "In Dokani, I eradicated inventory overselling via atomic conditional decrements at the SQL layer: 'UPDATE products SET stock = stock - :qty WHERE id = :id AND stock >= :qty RETURNING stock'. Because PostgreSQL serializes row writes, whichever transaction arrives first successfully updates the row; the losing transaction receives 0 affected rows, immediately triggering an 'Insufficient Stock' exception.",
          code: "const result = await prisma.$executeRaw`\n  UPDATE products \n  SET stock = stock - ${qty} \n  WHERE id = ${productId}::uuid AND stock >= ${qty}\n`;\nif (result === 0) throw new Error('স্টক শেষ হয়ে গেছে!');"
        },
        {
          lvl: "lvl3",
          q: "Dokani-তে মাল্টি-ব্রাঞ্চ (Multi-Branch / Multi-Warehouse) ট্রান্সফারের ক্ষেত্রে ট্রানজেকশন কীভাবে পরিচালনা করেছিলে?",
          m: "বড় রিটেইলে মূল ওয়্যারহাউস থেকে নির্দিষ্ট শাখায় (Branch) মালামাল ট্রান্সফার করতে হয়। আমরা `StockTransfer` মডেল ব্যবহার করেছিলাম যার স্টেট থাকত `PENDING`, `IN_TRANSIT`, এবং `COMPLETED`। ট্রান্সফার ইনিশিয়েট হলে একটি একক `prisma.$transaction`-এ মূল ওয়্যারহাউস থেকে স্টক মাইনাস হয়ে ট্রানজিট স্টেটে যেত। ব্রাঞ্চ ম্যানেজার মালামাল বুঝে নিয়ে সিস্টেমে 'Confirm Received' বাটনে চাপ দিলে দ্বিতীয় ট্রানজেকশনে ব্রাঞ্চের স্টক প্লাস হতো। কোনো গড়মিল হলে 'Rejected' করে স্টক মূল ওয়্যারহাউসে রিভার্স হয়ে যেত।",
          b: "ওয়্যারহাউস থেকে শাখায় পণ্য স্থানান্তরের জন্য আমরা দুই ধাপের ট্রানজেকশন ব্যবহার করেছি। প্রথমে মূল ওয়্যারহাউস থেকে স্টক কমে ট্রানজিটে যেত এবং শাখা ম্যানেজার পণ্য বুঝে নিয়ে কনফার্ম করলে শাখার স্টকে যোগ হতো। ফলে কোনো পণ্য মাঝপথে হারিয়ে যাওয়ার সুযোগ ছিল না।",
          e: "Multi-branch stock transfers in Dokani operated via a two-phase state machine (PENDING -> IN_TRANSIT -> COMPLETED). Inside an atomic Prisma transaction, outgoing stock was deducted from the source warehouse and placed in transit. The destination branch verified physical counts upon arrival before triggering the second transaction to credit branch inventory, preserving rigorous chain-of-custody audits.",
          code: "model StockTransfer {\n  id          String         @id @default(uuid())\n  fromBranch  String\n  toBranch    String\n  status      TransferStatus // PENDING, IN_TRANSIT, COMPLETED\n  items       TransferItem[]\n}"
        },
        {
          lvl: "situation",
          q: "দোকানের ১০০টি প্রোডাক্টের স্টক ১০টির নিচে নেমে গেছে। ক্যাশিয়ার বা ম্যানেজারের কাছে কীভাবে লাইভ লো-স্টক অ্যালার্ট পাঠানো হতো?",
          m: "প্রতিবার সেলস শেষ হওয়ার পর ব্যাকগ্রাউন্ডে চেক হতো: `WHERE stock <= minAlertStock`। লো-স্টক ডিটেক্ট হলে: (১) ড্যাশবোর্ডে **Socket.io** দিয়ে রিয়েল-টাইমে একটি পুশ ইভেন্ট যেত যা ম্যানেজারের স্ক্রিনের বেল আইকনে লাল ব্যাজ এবং অডিও বিপ দিত। (২) ম্যানেজারের নোটিফিকেশন সেন্টারে তালিকা থাকত যা থেকে ১ ক্লিকে 'Re-Order Purchase Order' ড্রাফট তৈরি করা যেত। (৩) অতি জরুরি পণ্যের ক্ষেত্রে দিনে একবার টেলিগ্রাম বট দিয়ে ম্যানেজারের ফোনে লো-স্টক লিস্ট পাঠানো হতো।",
          b: "পণ্যের স্টক নির্দিষ্ট সীমার নিচে নামলে সকেট.আইও (Socket.io) দিয়ে ম্যানেজারের ড্যাশবোর্ডে তাৎক্ষণিক লাল অ্যালার্ট বাজত। সেখান থেকে এক ক্লিকে সরাসরি সাপ্লায়ারের কাছে নতুন অর্ডারের রিকুইজিশন তৈরি করা যেত।",
          e: "Whenever sales decremented inventory below a product's defined minAlertStock threshold, Dokani's event bus emitted a low-stock alert via Socket.io. The manager's dashboard displayed real-time audio-visual badges and prepopulated an automated Supplier Purchase Order draft with recommended reorder quantities.",
          tip: "Socket.io পুশ অ্যালার্ট ও টেলিগ্রাম বটের কম্বিনেশন ইন্টারভিউতে চমৎকার শোনায়।"
        },
        {
          lvl: "realworld",
          q: "Dokani-তে ইনভেন্টরি অডিট ও ফিজিক্যাল স্টক মেলানোর জন্য (Physical Stock Reconciliation) তুমি কোন ফিচার ডিজাইন করেছিলে?",
          m: "দোকানে মাস শেষে বা বছর শেষে ফিজিক্যাল পণ্যের গণনার সাথে সফটওয়্যারের স্টকের কিছু পার্থক্য (ড্যামেজ বা চুরি) দেখা যায়। Dokani-তে আমি **Stock Adjustment / Audit Module** বানিয়েছিলাম: ম্যানেজার বারকোড স্ক্যানার নিয়ে দোকানে হেঁটে হেঁটে আসল পণ্যের সংখ্যা ইনপুট দিত। সিস্টেম স্বয়ংক্রিয়ভাবে একটি 'Variance Report' তৈরি করত: কোন পণ্যে কত ঘাটতি বা বাড়তি রয়েছে। ম্যানেজার অ্যাডজাস্টমেন্ট অ্যাপ্রুভ করলে ডাটাবেজে স্টক আপডেট হতো এবং `stock_audits` টেবিলে অ্যাডজাস্টমেন্টের কারণ (Damage, Expired, Theft) সহ অডিট ট্রেল পার্মানেন্টলি সেভ থাকত।",
          b: "দোকানি সিস্টেমে আমরা স্টক অডিট মডিউল তৈরি করেছি যেখানে দোকানদার দোকানে থাকা আসল পণ্যের সাথে সফটওয়্যারের স্টকের অমিল চিহ্নিত করতে পারত। ক্ষতি বা মেয়াদের কারণ উল্লেখ করে স্টক অ্যাডজাস্ট করা হতো এবং সম্পূর্ণ অডিট লগ সংরক্ষিত থাকত।",
          e: "For inventory discrepancy resolution, I built Dokani's Physical Stock Audit & Adjustment module. Managers perform barcode audits to register physical shelf counts. The system computes real-time variance reports (System Stock vs Physical Stock). Upon managerial authorization, stock adjustments execute with explicit audit categories (Damage, Breakage, Expiry), creating immutable accounting audit trails.",
          tip: "অডিট ট্রেইল ও ভ্যারিয়েন্স রিপোর্টের ব্যাখ্যা যেকোনো ইআরপি প্রজেক্টের সর্বোচ্চ মান নির্দেশ করে।"
        }
      ]
    },
    {
      id: "dokani-customer-ledgers-due",
      name: "Financial Ledgers, Customer Dues & Payment Gateways",
      desc: "Double-Entry Customer & Supplier Ledgers, Due Collection, bKash/Nagad/AmarPay, Accounting Reports",
      items: [
        {
          lvl: "lvl1",
          q: "Dokani-তে কাস্টমার বাকি (Customer Due) এবং সাপ্লায়ার পাওনা (Supplier Payable) কীভাবে পরিচালিত হতো?",
          m: "Dokani-তে কাস্টমার যখন বাকি দিয়ে পণ্য কেনে, তখন ইনভয়েসে পেইড অ্যামাউন্ট কম দিয়ে ডিউ অ্যামাউন্ট যোগ হয়। কাস্টমারের একাউন্টে এই টাকা তার 'Current Due' হিসেবে যুক্ত হয়। পরবর্তীতে কাস্টমার যখন টাকা পরিশোধ করতে আসে, ক্যাশিয়ার 'Due Collection' মডিউলে গিয়ে টাকা রিসিভ করে মানি রিসিপ্ট প্রিন্ট করে দেয় এবং সাথে সাথে কাস্টমারের ডিউ কমে যায়। একইভাবে সাপ্লায়ার থেকে বাকিতে মালামাল কিনলে সাপ্লায়ারের পাওনা (Payable) খাতায় যোগ হতো এবং ব্যাংকিং বা ক্যাশ পেমেণ্টের পর তা ডেবিট হতো।",
          b: "কাস্টমার বাকিতে কিনলে ইনভয়েসের মাধ্যমে বকেয়া যুক্ত হতো এবং পরবর্তীতে বকেয়া আদায়ের মাধ্যমে তা সমন্বয় করা হতো। সাপ্লায়ারের ক্ষেত্রেও বাকিতে পণ্য কেনার হিসাব আলাদা লেজারে সংরক্ষিত হতো এবং পরিশোধ করার সাথে সাথে ব্যালেন্স আপডেট হতো।",
          e: "In Dokani, customer credit sales record the outstanding delta as customer due receivables. When the patron returns to settle debts, cashiers process a 'Due Collection' payment, printing an official payment voucher and adjusting ledger balances. Supplier payables follow identical double-entry ledgers upon credit inventory purchases.",
          code: "model CustomerLedger {\n  id          String     @id @default(uuid())\n  customerId  String\n  type        LedgerType // DEBIT (Purchase), CREDIT (Payment)\n  amount      Decimal\n  balance     Decimal\n  note        String?\n  createdAt   DateTime   @default(now())\n}"
        },
        {
          lvl: "lvl2",
          q: "Dokani-তে লেজার অ্যাকাউন্টিংয়ে 'Double-Entry Ledger' কেন সাধারণ ব্যালেন্স কলামের চেয়ে শতগুণ বিশ্বস্ত?",
          m: "যদি আমরা শুধু `customer.dueBalance = customer.dueBalance - 500` করতাম, তবে সার্ভার ক্র্যাশ বা বাগ হলে ব্যালেন্স এলোমেলো হয়ে যেত এবং কাস্টমার চ্যালেঞ্জ করলে দোকানদার প্রমাণ দেখাতে পারত না কোন দিনে কত টাকা লেনদেন হয়েছে। ডাবল-এন্ট্রি লেজারে প্রতিটি কেনাকাটা এবং প্রতিটি পেমেন্ট একটি **অপরিবর্তনশীল (Immutable) রো** হিসেবে জমা হয়। কাস্টমার চাইলে যেকোনো মুহূর্তে গত ১ বছরের সম্পূর্ণ স্টেটমেন্ট ডেট-বাই-ডেট প্রিন্ট করে দেওয়া যায়। লেজারের সমস্ত ডেবিট থেকে ক্রেডিট বিয়োগ করলেই স্বয়ংক্রিয়ভাবে বর্তমান ব্যালেন্স মিলে যায়।",
          b: "ডাবল এন্ট্রি লেজারে কোনো ব্যালেন্স সরাসরি ওভাররাইট করা হয় না, বরং প্রতিটি লেনদেন আলাদা ইতিহাস হিসেবে জমা থাকে। ফলে কাস্টমারের সাথে কোনো মতবিরোধ হলে তারিখ অনুসারে পূর্ণাঙ্গ লেজার হিস্ট্রি দেখানো যায় এবং অর্থনৈতিক হিসাব শতভাগ নিরাপদ থাকে।",
          e: "Mutably overwriting a single balance integer invites accounting corruption and leaves zero forensic evidence during dispute resolutions. Dokani's immutable double-entry ledger logs discrete debit and credit entries per transaction. The active balance is a verifiable derivative of the ledger journal, enabling 1-click printable statements spanning historical timelines.",
          tip: "Immutable Ledger Journal হলো বিশ্বমানের ফিনটেক ও ইআরপি সিস্টেমের মাপকাঠি।"
        },
        {
          lvl: "lvl3",
          q: "Dokani ও PTTABD-তে bKash Tokenized Checkout API কীভাবে ইন্টিগ্রেট করেছিলে এবং পেমেন্ট ভেরিফিকেশন কীভাবে নিশ্চিত হতো?",
          m: "আমরা বিকাশের অফিশিয়াল টোকেনাইজড পেমেন্ট এপিআই ব্যবহার করেছিলাম: (১) প্রথমে বিকাশ ক্রেডেনশিয়াল দিয়ে `grantToken` এনে সেশন টোকেন পাই। (২) কাস্টমার পেমেন্ট শুরু করলে বিকাশের `/checkout/create` কল করে `paymentID` এবং বিকাশ পেমেন্ট গেটওয়ে ইউআরএল নিই। (৩) কাস্টমার ওটিপি ও পিন দিয়ে কনফার্ম করলে বিকাশ আমাদের কলব্যাক ইউআরএলে রিডাইরেক্ট করে। (৪) আমরা সার্ভার-টু-সার্ভার বিকাশের `/checkout/execute` কল করি। বিকাশ `transactionStatus: 'Completed'` এবং ইউনিক `trxID` দিলে তবেই ডাটাবেজ ট্রানজেকশনে ইনভয়েস কনফার্ম করি। (৫) কাস্টমারকে এসএমএস ও ইমেইলে পেমেন্ট নিশ্চিতকরণ পাঠিয়ে দিই।",
          b: "বিকাশ টোকেনাইজড এপিআইতে প্রথমে পেমেন্ট আইডি তৈরি করে বিকাশ পেজে রিডাইরেক্ট করা হয়। পিন দেওয়ার পর বিকাশ আমাদের সার্ভারে কলব্যাক পাঠায় এবং আমরা ব্যাকএন্ড থেকে execute API ডেকে লেনদেন সম্পন্ন করি ও ট্রানজেকশন আইডি (TrxID) ডাটাবেজে সংরক্ষণ করি।",
          e: "Dokani integrated bKash's official Tokenized Checkout. The workflow: request grantToken, invoke /checkout/create to acquire an authorized paymentID and redirect URL. Upon user OTP validation, bKash posts to our webhook callback, prompting a server-to-server /checkout/execute call. Only upon receiving status: Completed with an authentic trxID do we commit the invoice inside an atomic DB transaction.",
          code: "// bKash Execute Flow\nconst res = await axios.post(`${BKASH_BASE}/checkout/execute`, \n  { paymentID }, \n  { headers: { Authorization: token, 'X-APP-Key': appKey } }\n);\nif (res.data.statusCode === '0000') {\n  await finalizeSale(res.data.trxID);\n}"
        },
        {
          lvl: "situation",
          q: "একটি কাস্টমার বিকাশে টাকা পরিশোধ করেছে, বিকাশ থেকে টাকা কেটেছে, কিন্তু বিকাশ কলব্যাক ফেরত দেওয়ার সময় আমাদের সার্ভারের ইন্টারনেট ১ সেকেন্ড ড্রপ করায় ইনভয়েস পেইড মার্ক হয়নি। কীভাবে সমাধান করেছিলে?",
          m: "এটি পেমেন্ট গেটওয়ের সবচেয়ে স্পর্শকাতর সমস্যা। সমাধান: (১) **Query Payment API:** আমাদের সিস্টেমে একটি 'Verify Payment' বাটন ছিল। ক্যাশিয়ার বা কাস্টমার পেমেন্ট আইডি দিলে ব্যাকএন্ড সরাসরি বিকাশের `/checkout/query` এপিআই কল করত। বিকাশ থেকে স্ট্যাটাস 'Completed' আসলে সাথে সাথে ইনভয়েসটি পেইড হয়ে যেত। (২) **Automated Reconciliation Cron:** প্রতি ৫ মিনিট পর পর ব্যাকগ্রাউন্ডে একটি ক্রন জব চলত যা পেন্ডিং থাকা পেমেন্টগুলোর বিকাশ স্ট্যাটাস চেক করে অটো-কনফার্ম করে নিত। ফলে কাস্টমারের টাকা কখনো আটকে থাকত না।",
          b: "কলব্যাক মিস হয়ে কাস্টমারের টাকা কেটে গেলে আমরা বিকাশের কুয়েরি পেমেন্ট এপিআই দিয়ে সরাসরি স্ট্যাটাস চেক করে ইনভয়েসটি সক্রিয় করে দিতাম। এছাড়া প্রতি ৫ মিনিটের ব্যাকগ্রাউন্ড ক্রন জব স্বয়ংক্রিয়ভাবে পেন্ডিং পেমেন্টগুলো গেটওয়ের সাথে মিলিয়ে সমাধান করত।",
          e: "Dropped webhook callbacks were resolved through idempotent reconciliation: Cashiers could trigger a 'Query Payment' action, prompting the backend to call bKash's /checkout/query API using the paymentID to reconcile state in real-time. Concurrently, a scheduled reconciliation worker polled unresolved transactions every five minutes, settling confirmed payments autonomously.",
          tip: "Reconciliation Cron Job-এর ধারণা ফিনটেক ও পেমেন্ট ইন্টিগ্রেশনের সবচেয়ে সিনিয়র কনসেপ্ট।"
        },
        {
          lvl: "realworld",
          q: "Dokani-তে দিনশেষে দোকানদারের লাভ-ক্ষতি (Daily Profit & Loss / Margin) এবং সেলস সামারি রিপোর্ট কীভাবে রিয়েল-টাইমে জেনারেট হতো?",
          m: "Dokani-তে প্রতিটি বিক্রিতে শুধু বিক্রয়মূল্য নয়, কেনার সময় যে কেনা দাম (Purchase Unit Cost) ছিল তা-ও রেকর্ড থাকত। ফলে লাভ নির্ণয় হতো: `Profit = (Selling Price - Purchase Cost - Discount)`. দিনশেষে 'Daily Z-Report' বা ক্লোজিং রিপোর্টে ১ ক্লিকে সামারি আসত: মোট ক্যাশ সেলস, মোট বিকাশ সেলস, মোট বাকি বিক্রি, মোট সংগৃহীত বকেয়া এবং নিট গ্রস প্রফিট। এটি এক ক্লিকে থার্মাল প্রিন্টারে ডে-এন্ড রিপোর্ট আকারে প্রিন্ট হতো এবং দোকান মালিকের ফোনে দিনের সারসংক্ষেপ এসএমএস হয়ে পৌঁছে যেত।",
          b: "দোকানি সিস্টেমে বিক্রির সময় পণ্যের কেনা দাম ও বিক্রয় মূল্যের পার্থক্য থেকে স্বয়ংক্রিয়ভাবে আসল লাভ হিসাব হতো। দিনশেষে জেড-রিপোর্টের (Z-Report) মাধ্যমে মোট ক্যাশ, বিকাশ, বকেয়া এবং নিট লাভের হিসাব বের করে এক ক্লিকে মেমো প্রিন্ট হতো ও মালিকের ফোনে এসএমএস যেত।",
          e: "Dokani calculates real-time profit margins by locking historical purchase costs at the moment of sale: Profit = (Sale Price - Purchase Cost - Discounts). At shift closing, cashiers print a Daily Z-Report detailing gross sales, multi-tender breakdowns (Cash vs bKash vs Due), expense deductions, and net margins, while transmitting an automated end-of-day SMS summary to the business owner.",
          tip: "Z-Report হলো আন্তর্জাতিক রিটেইল ও পিওএস স্ট্যান্ডার্ড—এটি ইন্টারভিউতে ব্যবহার করলে তোমার বিজনেস ডোমেইন নলেজ প্রমাণিত হবে।"
        }
      ]
    }
  ]
};
