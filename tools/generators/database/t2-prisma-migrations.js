// Topic 2: Prisma ORM & Database Migrations (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "prisma-orm-migrations",
  name: "Prisma ORM & Migration Strategies",
  desc: "Prisma Schema Modeling, Relations, prisma migrate, Seeding, Raw Queries, Middleware & Extensions, Connection Management",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Prisma ORM কী এবং ট্র্যাডিশনাল ORM (যেমন TypeORM বা Sequelize)-এর চেয়ে এটি কেন আধুনিক ডেভেলপারদের প্রিয়?",
      m: "Prisma হলো একটি আধুনিক Next-generation Node.js/TypeScript ORM। সাধারণ ওআরএম-এ ক্লাসের ওপর ডেকোরেটর দিয়ে মডেল ডিফাইন করতে হয় এবং জটিল টাইপ অমিল দেখা দেয়। Prisma একটি ডিক্লারেটিভ `schema.prisma` ফাইল ব্যবহার করে। আপনি স্কিমা লিখে `prisma generate` রান করলে Prisma স্বয়ংক্রিয়ভাবে ১০০% টাইপ-সেফ Prisma Client তৈরি করে। কোডে কোনো কুয়েরি লেখার সময় ফিল্ডের নাম ও রিলেশন স্বয়ংক্রিয়ভাবে অটো-কমপ্লিট হয় এবং ভুল ফিল্ড লিখলে কম্পাইল টাইমে লাল এরর দেখায়।",
      b: "প্রিজমা একটি আধুনিক টাইপ-সেফ ওআরএম যা ডিক্লারেটিভ স্কিমা ফাইলের মাধ্যমে পরিচালিত হয়। স্কিমা থেকে স্বয়ংক্রিয়ভাবে টাইপস্ক্রিপ্ট টাইপ তৈরি করে এটি নির্ভুল টাইপ সেফটি দেয় এবং কোডিংয়ের সময় অসাধারণ অটো-কমপ্লিশন প্রদান করে।",
      e: "Prisma ORM models data via a declarative `schema.prisma` file rather than decorated JavaScript classes. Running `prisma generate` constructs an auto-generated, strictly typed TypeScript query client with exhaustive autocomplete and compile-time guarantees.",
      tip: "ইন্টারভিউতে 'Declarative Schema Modeling and Auto-generated Type Safety' শব্দ দুটি বলবে।"
    },
    {
      lvl: "lvl1",
      q: "Prisma-তে ১:১, ১:N এবং M:N রিলেশন কীভাবে `schema.prisma`-তে ডিফাইন করা হয়?",
      m: "(১) `1:1`: চাইল্ড মডেলে `@relation` এবং ইউনিক ফরেন কি ফিল্ড থাকে: `userId String @unique; user User @relation(fields: [userId], references: [id])`। (২) `1:N`: চাইল্ডে ফরেন কি থাকে এবং প্যারেন্টে অ্যারে থাকে: প্যারেন্টে `posts Post[]` এবং চাইল্ডে `authorId String; author User @relation(fields: [authorId], references: [id])`। (৩) `M:N`: Prisma Implicit Many-to-Many সাপোর্ট করে—উভয় মডেলে শুধুমাত্র অ্যারে দিলেই (যেমন `users User[]` এবং `posts Post[]`), Prisma ব্যাকগ্রাউন্ডে নিজেই একটি আন্ডারলাইং জংশন টেবিল ম্যানেজ করে।",
      b: "প্রিজমা স্কিমাতে ১:১ রিলেশনে @unique ফরেন কি থাকে, ১:এন রিলেশনে চাইল্ডে ফরেন কি ও প্যারেন্টে অ্যারে থাকে। এম:এন রিলেশনে উভয় মডেলে অ্যারে ডিক্লেয়ার করলে প্রিজমা নিজে থেকেই ব্যাকগ্রাউন্ডে জংশন টেবিল পরিচালনা করে।",
      e: "Prisma models 1:1 via `@unique` foreign key fields, 1:N via non-unique foreign keys referencing parent IDs, and M:N natively through Implicit Many-to-Many syntax where declaring array types on both models auto-provisions a hidden backing pivot table.",
      code: "model Store {\n  id       String    @id @default(uuid())\n  products Product[]\n}\nmodel Product {\n  id      String @id @default(uuid())\n  storeId String\n  store   Store  @relation(fields: [storeId], references: [id])\n}"
    },
    {
      lvl: "lvl1",
      q: "Prisma Migration Commands: `prisma migrate dev`, `prisma migrate deploy`, এবং `prisma db push`-এর সঠিক ব্যবহার কী?",
      m: "(১) `npx prisma migrate dev`: শুধুমাত্র লোকাল মেশিনে স্কিমা পরিবর্তনের পর নতুন SQL ফাইল জেনারেট এবং লোকাল ডাটাবেজে রান করার জন্য। (২) `npx prisma migrate deploy`: প্রোডাকশন CI/CD ডেপ্লয়মেন্টে শুধুমাত্র পেন্ডিং মাইগ্রেশন ফাইলগুলো সার্ভারে নিরাপদে অ্যাপ্লাই করার জন্য (এটি কোনো নতুন ফাইল জেনারেট করে না)। (৩) `npx prisma db push`: দ্রুত প্রোটোটাইপিংয়ের জন্য মাইগ্রেশন ফাইল না বানিয়ে সরাসরি স্কিমা ডাটাবেজে সিঙ্ক করতে (প্রোডাকশনে ব্যবহার নিষিদ্ধ)।",
      b: "migrate dev লোকাল ডেভে নতুন মাইগ্রেশন স্ক্রিপ্ট তৈরি ও প্রয়োগ করে। migrate deploy প্রোডাকশনে পেন্ডিং মাইগ্রেশনগুলো এক্সিকিউট করে। আর db push সাময়িক প্রোটোটাইপের জন্য সরাসরি স্কিমা পুশ করে।",
      e: "`prisma migrate dev` generates versioned SQL migration artifacts for local development. `prisma migrate deploy` executes unapplied pending migrations in production environments without generating files. `prisma db push` syncs schemas directly without tracking migrations.",
      tip: "কখনোই প্রোডাকশনে `migrate dev` বা `db push` চালাবে না; সবসময় `migrate deploy` চালাবে।"
    },
    {
      lvl: "lvl1",
      q: "Prisma Seeding (`prisma/seed.ts`) কী এবং ডেভেলপমেন্ট ও টেস্ট ডাটা লোড করতে কীভাবে কনফিগার করা হয়?",
      m: "Seeding হলো ডাটাবেজ খালি থাকা অবস্থায় প্রাথমিক টেস্ট ডাটা, ডিফল্ট রোল (যেমন `ADMIN`), বা সুপার অ্যাডমিন অ্যাকাউন্ট স্বয়ংক্রিয়ভাবে ডাটাবেজে ইনসার্ট করার স্ক্রিপ্ট। আমরা `prisma/seed.ts` ফাইল তৈরি করে সেখানে Prisma Client দিয়ে রেকর্ড ক্রিয়েট করি এবং `package.json`-এ `\"prisma\": { \"seed\": \"tsx prisma/seed.ts\" }` কনফিগার করি। এরপর `npx prisma db seed` চালালে ডাটাবেজ তাত্ক্ষণিক টেস্ট ডেটায় ভরে যায়।",
      b: "সিডার স্ক্রিপ্ট ডাটাবেজে প্রাথমিক এডমিন অ্যাকাউন্ট, রোল এবং টেস্ট ডাটা স্বয়ংক্রিয়ভাবে ইনসার্ট করতে ব্যবহৃত হয়। prisma db seed কমান্ডের মাধ্যমে সহজেই ডাটাবেজে ডেটা পপুলেট করা যায়।",
      e: "Database seeding populates initial baseline state (super-admin users, roles, test catalogs). Define a `prisma/seed.ts` script wired into package.json under `prisma.seed`, executed on demand via `npx prisma db seed`.",
      code: "// package.json\n\"prisma\": {\n  \"seed\": \"tsx prisma/seed.ts\"\n}"
    },
    {
      lvl: "lvl1",
      q: "Prisma Client ইনস্ট্যান্স পুরো অ্যাপে কীভাবে সিঙ্গেলটন (Singleton) হিসেবে মেইনটেইন করবে?",
      m: "যদি প্রতিটি সার্ভিস বা রাউট ফাইলে বারবার `new PrismaClient()` কল করা হয়, তবে নোড অ্যাপ ডাটাবেজের সাথে শত শত কানেকশন পুল খুলে ফেলবে এবং ডাটাবেজ ক্র্যাশ করবে। সমাধান: আমরা একটি সেন্ট্রালাইজড `db.ts` ফাইলে সিঙ্গেলটন প্যাটার্ন ব্যবহার করি। ডেভেলপমেন্টে হট-রিলোডের সময় যাতে বারবার নতুন ক্লায়েন্ট তৈরি না হয়, সেজন্য `globalForPrisma.prisma` গ্লোবাল ভ্যারিয়েবলে ইনস্ট্যান্সটি ক্যাশ করে রাখি এবং পুরো অ্যাপে সেই একই ক্লায়েন্ট এক্সপোর্ট করি।",
      b: "বারবার new PrismaClient কল করলে কানেকশন পুল শেষ হয়ে ডাটাবেজ ক্র্যাশ করে। একটি সেন্ট্রালাইজড ফাইলে গ্লোবাল সিঙ্গেলটন ক্লায়েন্ট তৈরি করে পুরো অ্যাপ্লিকেশনে শেয়ার করতে হয়।",
      e: "Creating multiple `new PrismaClient()` instances exhausts database connection pools. Enforce a module singleton in `db.ts`, anchoring the client to Node's `globalThis` object in development to prevent duplicate pool creation during hot-reloads.",
      code: "const globalForPrisma = global as unknown as { prisma: PrismaClient };\nexport const prisma = globalForPrisma.prisma || new PrismaClient();\nif (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Prisma-তে Raw SQL Queries (`$queryRaw` vs `$executeRaw` vs `$queryRawUnsafe`) কখন এবং কীভাবে নিরাপদে চালাবে?",
      m: "(১) `$queryRaw`: জটিল বা অ্যানালিটিক্যাল কুয়েরি চালানোর জন্য যা সাধারণ Prisma API দিয়ে সম্ভব নয়—এটি টাইপ-সেফ টেমপ্লেট লিটারাল ব্যবহার করে স্বয়ংক্রিয়ভাবে প্যারামিটারাইজড কুয়েরি তৈরি করে SQL ইনজেকশন ঠেকায়। (২) `$executeRaw`: কোনো ডাটা রিটার্ন না করে শুধুমাত্র প্রভাবিত রোর সংখ্যা (Affected Rows) দেয় (যেমন বাল্ক আপডেট বা DDL)। (৩) `$queryRawUnsafe`: র স্ট্রিং নেয়—এটি কখনোই ইউজার ইনপুট সহ ব্যবহার করা উচিত নয় কারণ এটি এসকিউএল ইনজেকশনের জন্য মারাত্মক ঝুঁকিপূর্ণ।",
      b: "$queryRaw জটিল কুয়েরি নিরাপদে এসকিউএল ইনজেকশন প্রতিরোধ করে চালায় এবং ডাটা রিটার্ন করে। $executeRaw প্রভাবিত রোর সংখ্যা দেয়। আর $queryRawUnsafe ব্যবহার করা মারাত্মক ঝুঁকিপূর্ণ কারণ এতে ইনজেকশন প্রতিরোধ থাকে না।",
      e: "`$queryRaw` executes parameterized SQL templates returning row arrays safely immunized against SQL injection. `$executeRaw` returns affected row counts for DDL/UPDATE mutations. `$queryRawUnsafe` accepts raw strings and must be strictly avoided with dynamic user inputs.",
      code: "const result = await prisma.$queryRaw<Product[]>`\n  SELECT * FROM \"Product\" WHERE price > ${minPrice} AND \"tenantId\" = ${tenantId}\n`;"
    },
    {
      lvl: "lvl2",
      q: "Prisma-তে Pagination: Offset-based (`skip` & `take`) বনাম Cursor-based (`cursor` & `take`) এর পারফরম্যান্স পার্থক্য কী?",
      m: "Offset-based পেজিনেশনে (`skip: 10000, take: 20`) ডাটাবেজকে প্রথম ১০০০০টি রো স্ক্যান করে মেমোরিতে ফেলে দিয়ে তারপর ২০টি রো নিতে হয়—ফলে পেজ নম্বর যত বাড়ে কুয়েরি তত স্লো হয়ে যায় এবং ডেটা স্কিপিং বাগ হয়। Cursor-based পেজিনেশনে (`cursor: { id: lastSeenId }, take: 20`) ডাটাবেজ সরাসরি B-Tree ইনডেক্স ব্যবহার করে আগের শেষ আইডির পর থেকে সরাসরি ২০টি রো রিড করে। ডাটাবেজে কোটি কোটি রেকর্ড থাকলেও কার্সর পেজিনেশন সবসময় ১ মিলিসেকেন্ডেই এক্সিকিউট হয়।",
      b: "অফসেট পেজিনেশনে skip বেশি হলে ডাটাবেজ স্লো হয়ে যায়। কার্সর পেজিনেশন শেষ আইডির ইনডেক্স ধরে সরাসরি পরবর্তী ডাটা পড়ে, ফলে কোটি কোটি রোর টেবিলেও কার্সর পেজিনেশন সবসময় ১ মিলিসেকেন্ডে সুপারফাস্ট চলে।",
      e: "Offset pagination (`skip`/`take`) requires scanning and discarding prior records, degrading drastically at high offsets. Cursor pagination (`cursor`/`take`) jumps directly to the B-Tree index location of the cursor ID, maintaining O(1) performance regardless of table depth.",
      code: "const nextBatch = await prisma.order.findMany({\n  take: 20,\n  skip: 1,\n  cursor: { id: lastOrderId },\n  orderBy: { id: 'asc' }\n});"
    },
    {
      lvl: "lvl2",
      q: "Prisma-তে Nested Writes ও Cascading Operations (`create`, `connect`, `connectOrCreate`) কীভাবে কাজ করে?",
      m: "Nested Writes আমাদের একটিমাত্র এপিআই কলে প্যারেন্ট ও চাইল্ড উভয় রেকর্ড অ্যাটোমিকালি তৈরি করার ক্ষমতা দেয়। (১) `create`: নতুন প্যারেন্টের সাথে নতুন চাইল্ড তৈরি করা। (২) `connect`: নতুন প্যারেন্টের সাথে ডাটাবেজে ইতিমধ্যে বিদ্যমান কোনো চাইল্ড রেকর্ডকে যুক্ত করা। (৩) `connectOrCreate`: যদি চাইল্ড রেকর্ড (যেমন ট্যাগ বা ক্যাটাগরি) আগে থেকেই থাকে তবে কানেক্ট করবে, আর না থাকলে নতুন বানিয়ে কানেক্ট করবে। পুরো অপারেশনটি ব্যাকগ্রাউন্ডে একটি সিঙ্গেল অ্যাটমিক ট্রানজাকশনে চলে।",
      b: "নেস্টেড রাইটসের মাধ্যমে একটিমাত্র অপারেশনে প্যারেন্ট ও চাইল্ড ডেটা তৈরি বা যুক্ত করা যায়। connectOrCreate পদ্ধতি ক্যাটাগরি বা ট্যাগ বিদ্যমান থাকলে কানেক্ট করে এবং না থাকলে নতুন তৈরি করে যুক্ত করে।",
      e: "Nested Writes execute atomic multi-table operations in a single query: `create` nests new children, `connect` links existing records via unique keys, and `connectOrCreate` idempotently connects matching entities or spawns new ones if absent.",
      code: "await prisma.product.create({\n  data: {\n    name: 'Shampoo',\n    category: { connectOrCreate: { where: { name: 'Cosmetics' }, create: { name: 'Cosmetics' } } }\n  }\n});"
    },
    {
      lvl: "lvl2",
      q: "Prisma-তে Aggregation ও Grouping (`aggregate`, `groupBy`) কীভাবে রিপোর্ট জেনারেট করে?",
      m: "Prisma বিল্ট-ইন এগ্রিগেশন ফাংশন দেয়: `prisma.order.aggregate({ _sum: { total: true }, _avg: { total: true }, _count: true, _max: { total: true } })`। আর গ্রুপিংয়ের জন্য: `prisma.sales.groupBy({ by: ['storeId'], _sum: { amount: true }, having: { amount: { _sum: { gt: 10000 } } } })`। এটি আন্ডারলাইং ডাটাবেজের `GROUP BY` এবং `HAVING` ক্লজ ব্যবহার করে সরাসরি ডাটাবেজ স্তরে কোটি রো প্রসেস করে মাত্র এক লাইনের ফলাফলে রিপোর্ট রিটার্ন করে।",
      b: "প্রিজমা এগ্রিগেট ফাংশন দিয়ে যোগফল (_sum), গড় (_avg) এবং সংখ্যা (_count) বের করা যায়। groupBy এর মাধ্যমে স্টোর বা ক্যাটাগরি ভিত্তিক সেলস রিপোর্ট ডাটাবেজ স্তরেই হিসাব করে দ্রুত আউটপুট পাওয়া যায়।",
      e: "Prisma provides high-level aggregation primitives: `aggregate` compiles SQL `SUM`, `AVG`, and `COUNT`. `groupBy` groups rows across attributes (e.g. `storeId`), supporting `having` filters to evaluate aggregate thresholds directly inside the database.",
      code: "const metrics = await prisma.sale.groupBy({\n  by: ['paymentMethod'],\n  _sum: { totalAmount: true },\n  _count: true\n});"
    },
    {
      lvl: "lvl2",
      q: "Prisma Schema-তে Custom Attribute Directives (`@map`, `@@map`, `@default(now())`, `@updatedAt`) কী করে?",
      m: "`@map('user_id')` মডেলের টাইপস্ক্রিপ্ট প্রপার্টির নাম ক্যামেলকেস (`userId`) রাখলেও আসল ডাটাবেজ কলামের নাম স্নেক-কেস (`user_id`) ম্যাপিং করে। `@@map('tbl_users')` পুরো মডেলকে ডাটাবেজের কাস্টম টেবিল নামের সাথে ম্যাপ করে। `@default(now())` রেকর্ড তৈরির সময় ডিফল্ট টাইমস্ট্যাম্প বসায়। আর `@updatedAt` হলো প্রিজমার একটি স্পেশাল ডিরেক্টিভ যা প্রতিবার ওই রো আপডেট হওয়ার সাথে সাথে স্বয়ংক্রিয়ভাবে কারেন্ট টাইমস্ট্যাম্প আপডেট করে দেয়।",
      b: "@map কলামের নাম এবং @@map টেবিলের নাম ডাটাবেজের স্নেক-কেসের সাথে ম্যাপ করে। @updatedAt কোনো কোড লেখা ছাড়াই রেকর্ড পরিবর্তন হলে স্বয়ংক্রিয়ভাবে টাইমস্ট্যাম্প আপডেট করে দেয়।",
      e: "`@map` maps camelCase TypeScript field names to snake_case database columns. `@@map` overrides table names in the underlying schema. `@updatedAt` instructs Prisma to automatically stamp the current timestamp upon every record update.",
      code: "model UserProfile {\n  id        String   @id @default(uuid())\n  firstName String   @map(\"first_name\")\n  updatedAt DateTime @updatedAt\n  @@map(\"user_profiles\")\n}"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Prisma Client Extensions (`$extends`) বনাম Legacy Middleware (`$use`): আধুনিক এক্সটেনশন আর্কিটেকচার কীভাবে কাজ করে?",
      m: "Prisma v4.7+ এ লিগ্যাসি `$use` মিডলওয়্যার ডেপ্রিকেটেড করা হয়েছে কারণ এতে টাইপ সেফটি ছিল না এবং রিটার্ন টাইপ পরিবর্তন করা যেত না। আধুনিক `$extends` এপিআই ৪টি ক্লায়েন্ট লেভেল এক্সটেনশন সমর্থন করে: (১) `model`: মডেলে কাস্টম মেথড যোগ করা (যেমন `prisma.user.signUp(...)`), (২) `client`: গ্লোবাল ক্লায়েন্টে মেথড যোগ করা, (৩) `query`: যেকোনো কুয়েরি ইন্টারসেপ্ট ও মডিফাই করা (যেমন সফট ডিলিট ও টেন্যান্ট গার্ড), (৪) `result`: মডেলের রিটার্ন অবজেক্টে ভার্চুয়াল ফিল্ড যোগ করা (যেমন `fullName`). সম্পূর্ণ এক্সটেনশনটি ১০০% টাইপস্ক্রিপ্ট টাইপ-সেফ থাকে।",
      b: "প্রিজমা এক্সটেনশন লিগ্যাসি মিডলওয়্যারের আধুনিক টাইপ-সেফ বিকল্প। এর মাধ্যমে মডেলে কাস্টম মেথড, কুয়েরি ইন্টারসেপ্টর এবং রিটার্ন ডাটায় ভার্চুয়াল ফিল্ড যুক্ত করা যায় এবং টাইপস্ক্রিপ্ট স্বয়ংক্রিয়ভাবে নতুন মেথডগুলো চিনতে পারে।",
      e: "Prisma Client Extensions (`$extends`) supersede legacy untyped `$use` middleware. Developers can extend Prisma models with custom domain methods, add computed result fields (`fullName`), or hook query execution for automated soft deletion and tenant enforcement with full TypeScript type propagation.",
      code: "const extendedPrisma = prisma.$extends({\n  result: {\n    user: {\n      fullName: { needs: { firstName: true, lastName: true }, compute(u) { return `${u.firstName} ${u.lastName}`; } }\n    }\n  }\n});"
    },
    {
      lvl: "lvl3",
      q: "Prisma Accelerate এবং Prisma Pulse কী এবং সার্ভারলেস ও এজ এনভায়রনমেন্টে এরা কীভাবে পারফরম্যান্স বাড়ায়?",
      m: "সার্ভারলেস ফাংশনে (যেমন Vercel বা AWS Lambda) প্রতি রিকোয়েস্টে নতুন ইনস্ট্যান্স চালু হওয়ায় ডাটাবেজ কানেকশন পুল মুহূর্তেই শেষ হয়ে যায়। `Prisma Accelerate` হলো একটি গ্লোবাল এজ কানেকশন পুলার ও ক্যাশিং লেয়ার যা ডাটাবেজ কানেকশন রক্ষা করে এবং এপিআই রেসপন্স এজ লোকেশনে মিলি-সেকেন্ডে ক্যাশ করে। আর `Prisma Pulse` হলো একটি রিয়েল-টাইম চেঞ্জ ডেটা ক্যাপচার (CDC) সার্ভিস যা ডাটাবেজে কোনো পরিবর্তন (INSERT/UPDATE) হওয়া মাত্রই সার্ভারলেস ক্লায়েন্টে লাইভ ইভেন্ট স্ট্রিম করে দেয় কোনো জটিল WebSockets বা Kafka ছাড়া।",
      b: "প্রিজমা এক্সিলারেট সার্ভারলেস পরিবেশে ডাটাবেজ কানেকশন পুলিং ও এজ ক্যাশিং নিশ্চিত করে। প্রিজমা পালস ডাটাবেজের যেকোনো পরিবর্তন মুহূর্তের মধ্যে রিয়েল-টাইম ইভেন্ট আকারে স্ট্রিম করে পাঠাতে সাহায্য করে।",
      e: "Prisma Accelerate solves serverless connection pool exhaustion via global edge connection pooling and automated query result caching. Prisma Pulse delivers Change Data Capture (CDC), streaming database change events directly to Node.js applications in real time.",
      tip: "সার্ভারলেস নেক্সট জেএস অ্যাপ্লিকেশনে কানেকশন পুলিংয়ের জন্য Prisma Accelerate-এর কথা বলা খুব আধুনিক।"
    },
    {
      lvl: "lvl3",
      q: "Data Migration Scripts vs Schema Migrations: কোটি কোটি ডেটা রি-স্ট্রাকচার করার সময় ডেটা মাইগ্রেশন কীভাবে হ্যান্ডেল করবে?",
      m: "Prisma স্কিমা মাইগ্রেশন শুধুমাত্র টেবিল বা কলামের স্ট্রাকচার পরিবর্তন করে (DDL)। কিন্তু যদি বিদ্যমান কোটি রোর ভেতরের ডেটা রূপান্তর করতে হয় (যেমন পুরো নাম ভেঙে প্রথম নাম ও শেষ নাম করা), তবে স্কিমা মাইগ্রেশনে তা চালানো যাবে না কারণ সার্ভার টাইমআউট হবে। সমাধান: আমরা একটি ডেডিকেটেড Data Migration Script লিখব যা ব্যাকগ্রাউন্ডে কার্সর ও ব্যাচ আকারে (যেমন প্রতি ব্যাচে ৫০০ রেকর্ড) ডেটা রিড ও আপডেট করবে। মাইগ্রেশন স্ক্রিপ্টটি আইডেমপোটেন্ট হবে যাতে মাঝে থেমে গেলেও পুনরায় চালু করা যায়।",
      b: "কোটি কোটি রো রূপান্তর করতে স্কিমা মাইগ্রেশনের বদলে আলাদা ডেটা মাইগ্রেশন স্ক্রিপ্ট লিখতে হয়। স্ক্রিপ্টটি কার্সর ব্যবহার করে ৫০০টি করে রেকর্ড ব্যাচ আকারে আপডেট করে যাতে কোনো সার্ভার ডাউনটাইম বা মেমোরি ক্র্যাশ না ঘটে।",
      e: "Separate DDL schema changes from heavy data transformations. Execute data migrations via standalone idempotent TypeScript runner scripts that stream records using cursor pagination in 500-row chunks, committing batches independently to avoid table locks.",
      code: "let cursor = undefined;\nwhile (true) {\n  const batch = await prisma.user.findMany({ take: 500, skip: cursor ? 1 : 0, cursor: cursor ? { id: cursor } : undefined });\n  if (!batch.length) break;\n  await processBatch(batch);\n  cursor = batch[batch.length - 1].id;\n}"
    },
    {
      lvl: "lvl3",
      q: "Prisma-তে Multi-Schema Support (PostgreSQL Schemas): একই ডাটাবেজের ভেতর একাধিক স্কিমা (`auth`, `pos`, `audit`) কীভাবে মডেল করবে?",
      m: "PostgreSQL একটি সিঙ্গেল ডাটাবেজের ভেতর একাধিক লজিক্যাল স্কিমা সমর্থন করে। Prisma-তে আমরা `previewFeatures = [\"multiSchema\"]` সক্রিয় করি এবং `schema.prisma`-তে `schemas = [\"public\", \"auth\", \"pos\"]` ডিক্লেয়ার করি। এরপর প্রতিটি মডেলের ওপরে `@@schema(\"pos\")` ডিরেক্টিভ বসাই। এর ফলে টেবিলগুলো সুসংগঠিতভাবে তাদের নিজস্ব স্কিমায় তৈরি হয় এবং পারমিশন ও আইসোলেশন মেইনটেইন করা অত্যন্ত সহজ হয়।",
      b: "পোস্টগ্রেস মাল্টি-স্কিমা ফিচারের মাধ্যমে একই ডাটাবেজে auth, pos ও audit টেবিল আলাদা মডিউলে সাজানো যায়। প্রিজমা স্কিমাতে @@schema নির্দেশ করে টেবিলগুলো পৃথক স্কিমায় ভাগ করা যায়।",
      e: "PostgreSQL multi-schema support in Prisma partitions tables across distinct schemas (e.g. `auth`, `pos`, `billing`). Enabled via `multiSchema` preview feature, models use the `@@schema(\"schema_name\")` attribute to organize enterprise database spaces.",
      code: "datasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n  schemas  = [\"auth\", \"pos\"]\n}\nmodel Invoice {\n  id String @id\n  @@schema(\"pos\")\n}"
    },
    {
      lvl: "lvl3",
      q: "Prisma Query Engine Architecture (Rust Engine) কীভাবে ইন্টারনালি নোড জেএস ও ডাটাবেজের মধ্যে কাজ করে?",
      m: "Prisma শুধুমাত্র একটি জাভাস্ক্রিপ্ট লাইব্রেরি নয়; এর পেছনে একটি হাই-পারফরম্যান্স Rust Query Engine বাইনারি থাকে। আপনি যখন কোনো Prisma মেথড কল করেন, নোড ক্লায়েন্ট একটি অপটিমাইজড DMMF (Data Model Meta Format) কুয়েরি রিকোয়েস্ট তৈরি করে লোকাল IPC বা N-API (Node-API Library) দিয়ে Rust ইঞ্জিনে পাঠায়। Rust ইঞ্জিন কুয়েরি প্ল্যান অপটিমাইজ করে, ডাটাবেজের জন্য একক সুপার-অপটিমাইজড SQL তৈরি করে এক্সিকিউট করে এবং প্রাপ্ত রেজাল্ট মেমোরি-ম্যাপ করে নোড ক্লায়েন্টে ফিরিয়ে দেয়। এর ফলে জাভাস্ক্রিপ্ট মেমোরি ফাঁকা থাকে এবং কোয়েরি এক্সিকিউশন অবিশ্বাস্য দ্রুত হয়।",
      b: "প্রিজমার পেছনে একটি শক্তিশালী রাস্ট (Rust) ইঞ্জিন কাজ করে। নোড থেকে রিকোয়েস্ট নিয়ে রাস্ট ইঞ্জিন অপটিমাইজড এসকিউএল তৈরি করে ডাটাবেজ চালায় এবং ফলাফল নোডে ফেরত দেয়, ফলে জাভাস্ক্রিপ্ট মেমোরির ওপর কোনো চাপ পড়ে না।",
      e: "Prisma query execution is driven by a compiled Rust Query Engine connected to Node.js via N-API. The Rust core optimizes AST query plans, manages physical connection pooling, synthesizes SQL statements, and serializes query results efficiently with minimal V8 garbage collection impact.",
      tip: "Prisma-র পেছনে যে Rust কোয়েরি ইঞ্জিন N-API দিয়ে চলে—এটি ব্যাখ্যা করতে পারা অত্যন্ত উঁচুমানের টেকনিক্যাল দক্ষতা।"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "ডেভেলপমেন্টে স্কিমা পরিবর্তন করার পর কোডে নতুন ফিল্ড অটো-কমপ্লিট হচ্ছে না এবং টাইপস্ক্রিপ্ট পুরানো টাইপ দেখিয়ে এরর দিচ্ছে। কীভাবে ফিক্স করবে?",
      m: "কারণ: `schema.prisma` পরিবর্তন করার পর `prisma generate` কমান্ড চালানো হয়নি, যার ফলে `node_modules/@prisma/client` ফোল্ডারে পুরানো টাইপস্ক্রিপ্ট ডেফিনেশন ফাইল রয়ে গেছে। সমাধান: টার্মিনালে `npx prisma generate` রান করব। এটি নতুন স্কিমা স্ক্যান করে মুহূর্তের মধ্যে ফ্রেশ টাইপ জেনারেট করে দেবে। ভিএস কোড ক্যাশ আটকে থাকলে `Ctrl+Shift+P` চেপে 'TypeScript: Restart TS Server' দিলেই সাথে সাথে সব নতুন ফিল্ড অটো-কমপ্লিট হওয়া শুরু করবে।",
      b: "স্কিমা বদলানোর পর npx prisma generate না চালালে নতুন টাইপ তৈরি হয় না। কমান্ডটি চালিয়ে ভিএস কোডের টাইপস্ক্রিপ্ট সার্ভার রিস্টার্ট করলেই নতুন ফিল্ডের টাইপ ও অটো-কমপ্লিশন পাওয়া যায়।",
      e: "Modifying `schema.prisma` requires regenerating the client artifact. Execute `npx prisma generate` to rebuild `@prisma/client` typings in node_modules. If the IDE fails to pick it up, trigger 'TypeScript: Restart TS Server' in VS Code.",
      code: "npx prisma generate"
    },
    {
      lvl: "situation",
      q: "প্রোডাকশন ডেপ্লয়মেন্টে `prisma migrate deploy` কমান্ড চালাতে গিয়ে এরর আসছে: `Migration ... is applied but its hash has changed` (Drift Detected)। কীভাবে সমাধান করবে?",
      m: "কারণ: কোনো ডেভেলপার ইতিমধ্যেই ডাটাবেজে রান হয়ে যাওয়া কোনো পুরানো মাইগ্রেশন SQL ফাইলকে লোকাল মেশিনে ম্যানুয়ালি এডিট করেছে, ফলে ফাইলের চেকসাম হ্যাশ ডাটাবেজের `_prisma_migrations` টেবিলের হ্যাশের সাথে মিলছে না। সমাধান: (১) গিট হিস্ট্রি দেখে অরিজিনাল মাইগ্রেশন ফাইলটি হুবহু পূর্বাবস্থায় রিস্টোর করব। (২) যে পরিবর্তন দরকার তার জন্য সম্পূর্ণ নতুন আরেকটি মাইগ্রেশন তৈরি করব। (৩) যদি লোকাল ডেভ এনভায়রনমেন্টে ঠিক করতে হয়, তবে `prisma migrate resolve` ব্যবহার করব।",
      b: "ইতিমধ্যে ডেপ্লয় হওয়া মাইগ্রেশন ফাইলে ম্যানুয়াল পরিবর্তন করলে হ্যাশ অমিল হয়। গিট থেকে আগের মূল ফাইলটি রিস্টোর করতে হবে এবং নতুন পরিবর্তনের জন্য পৃথক মাইগ্রেশন তৈরি করে সমাধান করতে হবে।",
      e: "This drift error indicates an already-applied migration SQL file was altered post-hoc, causing checksum verification failures against `_prisma_migrations`. Revert the local migration file back to its committed state and issue an incremental new migration for the desired schema changes.",
      code: "npx prisma migrate resolve --applied <migration_name>"
    },
    {
      lvl: "situation",
      q: "Prisma-তে কোনো ট্রানজাকশন চালাতে গিয়ে `Transaction API error: Transaction already closed` অথবা `Transaction timed out` এরর আসছে। কীভাবে ফিক্স করবে?",
      m: "কারণ: Prisma Interactive Transaction-এর ডিফল্ট টাইমআউট থাকে ৫ সেকেন্ড (৫০০০ms)। যদি ট্রানজাকশনের ভেতর কোনো স্লো এপিআই কল বা ভারী কোয়েরি থাকে যা ৫ সেকেন্ড অতিক্রম করে, Prisma স্বয়ংক্রিয়ভাবে ট্রানজাকশন রোলব্যাক ও ক্লোজ করে দেয়। সমাধান: (১) ট্রানজাকশনের ভেতরে কখনোই স্লো থার্ড-পার্টি এপিআই (যেমন পেমেন্ট বা ইমেইল) রাখবেন না—সেগুলো ট্রানজাকশনের বাইরে রাখুন। (২) যদি ডাটাবেজ অপারেশন সত্যিই ভারী হয়, তবে টাইমআউট বাড়িয়ে দেব: `prisma.$transaction(async (tx) => ..., { maxWait: 5000, timeout: 20000 })`।",
      b: "প্রিজমা ট্রানজাকশনের ডিফল্ট টাইমআউট ৫ সেকেন্ড। ট্রানজাকশনের ভেতর স্লো থার্ড-পার্টি কল রাখা যাবে না। বড় কাজের জন্য maxWait এবং timeout অপশন বাড়িয়ে ২০ সেকেন্ড করে দিলে টাইমআউট এরর দূর হয়।",
      e: "Interactive transactions default to a strict 5000ms timeout window. Purge slow external API calls from the transaction block. For legitimate long-running batch persistence, extend the timeout thresholds explicitly via transaction options.",
      code: "await prisma.$transaction(async (tx) => { ... }, {\n  maxWait: 5000, // Max wait to acquire connection\n  timeout: 15000 // Max duration for transaction to complete\n});"
    },
    {
      lvl: "situation",
      q: "ব্যবহারকারী একটি টেবিলে রেকর্ড খোঁজার সময় Prisma `findUnique` এর বদলে `findFirst` ব্যবহার করায় কুয়েরি স্লো হচ্ছে। কখন কোনটি ব্যবহার করতে হবে?",
      m: "`findUnique` শুধুমাত্র এবং শুধুমাত্র সেই কলামগুলোতে কাজ করে যেগুলোর ওপর `@id` (Primary Key) অথবা `@unique` কনস্ট্রেইন্ট রয়েছে। কারণ ডাটাবেজ জানে এটি সর্বোচ্চ ১টি রো হবে এবং সরাসরি ইউনিক B-Tree ইনডেক্স ব্যবহার করে ১ms-এ খুঁজে বের করে। আর `findFirst` যেকোনো নন-ইউনিক কলামে চালানো যায়, যার ফলে ডাটাবেজকে টেবিল স্ক্যান বা সাধারণ ইনডেক্স স্ক্যান করে প্রথম ম্যাচটি নিতে হয়। তাই ইউনিক আইডেন্টিফায়ারে সবসময় `findUnique` ব্যবহার করা বাধ্যতামূলক।",
      b: "findUnique শুধুমাত্র প্রাইমারি কি বা ইউনিক কলামে চলে এবং সরাসরি বি-ট্রি ইনডেক্স দিয়ে তাৎক্ষণিক রেজাল্ট দেয়। findFirst সাধারণ কলামে চলে এবং তুলনামূলক ধীরগতির। তাই ইউনিক ডেটা খুঁজতে সর্বদা findUnique ব্যবহার করতে হবে।",
      e: "`findUnique` targets strictly unique-constrained fields (`@id` or `@unique`), utilizing direct index lookups with engine guarantees of single-record returns. `findFirst` executes arbitrary non-unique filter scans with sorting overheads; use `findUnique` whenever unique criteria exist.",
      code: "const user = await prisma.user.findUnique({ where: { email } }); // Fast B-Tree Lookup"
    },
    {
      lvl: "situation",
      q: "Prisma-তে কোনো বড় টেবিল থেকে ডেটা আনার সময় মেমোরি ওভারফ্লো এড়াতে এবং নির্দিষ্ট ফিল্ড ফিল্টার করতে কীভাবে `select` অপটিমাইজেশন করবে?",
      m: "যদি প্রোডাক্ট টেবিলে ৫০টি কলাম থাকে (বড় ডেসক্রিপশন, ইমেজ বেস৬৪, মেটাডাটা) এবং আমরা শুধু নাম ও দাম দেখাতে চাই, কখনোই পুরো অবজেক্ট ফেচ করব না (`findMany()`)। আমরা `select` ক্লজ ব্যবহার করব: `prisma.product.findMany({ select: { id: true, name: true, price: true } })`। এর ফলে ডাটাবেজ শুধুমাত্র এই ৩টি কলাম রিটার্ন করবে, নেটওয়ার্ক ট্রাফিক ৯০% কমে যাবে এবং নোড সার্ভারের RAM সম্পূর্ণ ফাঁকা থাকবে। সাথে টাইপস্ক্রিপ্ট টাইপও নিখুঁতভাবে শুধুমাত্র এই ৩টি ফিল্ডের জন্য টাইপড হবে।",
      b: "মেমোরি বাঁচাতে পুরো অবজেক্ট না এনে select ক্লজ দিয়ে শুধুমাত্র প্রয়োজনীয় কলামগুলো নিয়ে আসতে হবে। এতে ডাটাবেজ ও নেটওয়ার্কের ওপর চাপ ৯০% হ্রাস পায় এবং মেমোরি সুরক্ষিত থাকে।",
      e: "Omit unneeded heavy attributes by leveraging Prisma's `select` projection clause (`select: { id: true, name: true, price: true }`). This generates lean SQL projections, slashing serialization costs, network payload byte sizes, and V8 heap consumption.",
      code: "const items = await prisma.product.findMany({\n  where: { tenantId },\n  select: { id: true, name: true, price: true, stock: true }\n});"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর দ্রুতগতির বিলিং মডিউলে ইনভয়েস তৈরি ও ইনভেন্টরি স্টক কমাতে Prisma Transactions কীভাবে সফলভাবে প্রয়োগ করেছিলে?",
      m: "দোকানি সিস্টেমে আমরা `prisma.$transaction(async (tx) => ...)` ব্যবহার করেছি। ক্যাশিয়ার যখন ২০টি আইটেমের বিল সাবমিট করে, ট্রানজাকশনের ভেতর: (১) প্রতিটি আইটেমের বর্তমান স্টক চেক ও ডিক্রিমেন্ট (`stock: { decrement: qty }`), (২) ইনভয়েস মাস্টার ও ২০টি আইটেম লাইন ক্রিয়েট, (৩) কাস্টমার বাকি লেজার আপডেট। পুরো অপারেশনটি মাত্র ৩০-৪০ মিলিসেকেন্ডে সম্পন্ন হতো। কোনো একটি পণ্যের স্টক শর্ট থাকলে সম্পূর্ণ ট্রানজাকশন তাৎক্ষণিক রোলব্যাক হতো—কোনো ভুল ডেটা ডাটাবেজে প্রবেশ করতে পারেনি।",
      b: "দোকানি বিক্রয় এন্ট্রিতে আমরা প্রিজমার ইন্টারেক্টিভ ট্রানজাকশন ব্যবহার করে স্টক কাটা, ইনভয়েস তৈরি এবং কাস্টমার বাকি সমন্বয় নিশ্চিত করেছি। মাত্র ৩০-৪০ মিলিসেকেন্ডে সফল লেনদেন সম্পন্ন হতো এবং কোনো ত্রুটি হলে স্বয়ংক্রিয় রোলব্যাক নিশ্চিত ছিল।",
      e: "Executed atomic POS invoice checkouts in Dokani via Prisma interactive transactions: iterating cart rows to apply atomic `decrement` mutations on product stock, batch-inserting invoice line items, and updating customer ledger balances with automated rollback guarantees.",
      tip: "ক্যাশ কাউন্টারের দ্রুতগতির ২০টি আইটেমের অ্যাটমিক ট্রানজাকশন বর্ণনা করা হাই-কনকারেন্সি দক্ষতার প্রমাণ।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর মাল্টি-টেন্যান্ট ডেটাবেজে Prisma Client Extensions দিয়ে প্রতি কুয়েরিতে অটোমেটিক `tenantId` ফিল্টারিং কীভাবে বাস্তবায়ন করেছিলে?",
      m: "আমরা Prisma `$extends` দিয়ে একটি কাস্টম ক্লায়েন্ট এক্সটেনশন তৈরি করেছিলাম: `prisma.$extends({ query: { $allModels: { async findMany({ args, query }) { args.where = { ...args.where, tenantId: currentTenant() }; return query(args); } } } })`। এর ফলে কোনো ডেভেলপার ভুল করে `tenantId` ফিল্টার লিখতে ভুলে গেলেও Prisma এক্সটেনশন স্বয়ংক্রিয়ভাবে ডাটাবেজ লেভেলে টেন্যান্ট আইডি ইনজেক্ট করে দিত। ফলে কোনো অবস্থাতেই এক দোকানের ডেটা অন্য দোকানে লিক হওয়ার ০% সুযোগ ছিল।",
      b: "প্রিজমা ক্লায়েন্ট এক্সটেনশনের সাহায্যে আমরা স্বয়ংক্রিয়ভাবে প্রতিটি কুয়েরিতে টেন্যান্ট আইডি ইনজেক্ট করার ব্যবস্থা করেছিলাম। কোনো ডেভেলপার ভুল করলেও ডাটাবেজে টেন্যান্ট ফিল্টার বাদ পড়ার কোনো সুযোগ ছিল না, ফলে শতভাগ ডেটা আইসোলেশন নিশ্চিত ছিল।",
      e: "Constructed an automated multi-tenant guard in Dokani using Prisma Client Extensions (`$extends`). Intercepting all model query methods, the extension dynamically merged `{ tenantId: getTenantContext() }` into incoming `where` criteria, permanently barring cross-tenant data bleed.",
      code: "const tenantDb = prisma.$extends({\n  query: {\n    $allModels: {\n      async findMany({ args, query }) {\n        args.where = { ...args.where, tenantId: getActiveTenantId() };\n        return query(args);\n      }\n    }\n  }\n});"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে লাখ লাখ ছাত্রের কোর্স প্রোগ্রেস ও অ্যানালিটিক্স তৈরিতে Prisma-তে জটিল কুয়েরি কীভাবে অপটিমাইজ করেছিলে?",
      m: "ছাত্রদের ড্যাশবোর্ডে কোর্স সমাপ্তির শতকরা হার দেখানোর জন্য আমরা সাধারণ নেস্টেড কুয়েরি না করে Prisma-র `_count` এবং কাস্টম `$queryRaw` ব্যবহার করেছি: `prisma.course.findMany({ include: { _count: { select: { lessons: true } } } })`। ছাত্রের সম্পন্ন হওয়া লেকচারের সংখ্যার সাথে মোট লেকচারের সংখ্যা ভাগ করে এক নিমেষেই প্রোগ্রেস বার হিসাব করা হয়েছে। ফলে ছাত্রকে ড্যাশবোর্ডে কোনো লোডিং ছাড়াই নিমেষে লাইভ কোর্স পার্সেন্টেজ দেখানো সম্ভব হয়েছে।",
      b: "পিটিটিএবিডিতে কোর্স প্রোগ্রেস গণনায় প্রিজমার _count ফিচার ব্যবহার করে মোট লেকচার ও সম্পন্ন হওয়া লেকচারের অনুপাত বের করা হয়েছিল। ডাটাবেজে অতিরিক্ত লোড না ফেলে এক নিমেষেই ছাত্রদের লাইভ অগ্রগতি প্রদর্শন সম্ভব হয়েছিল।",
      e: "Optimized student learning analytics in PTTABD by leveraging Prisma's relation `_count` aggregates (`_count: { select: { lessons: true } }`). Calculating progress ratios client-side from lightweight aggregate integers eliminated expensive joins over lesson detail bodies.",
      code: "const courseProgress = await prisma.enrollment.findMany({\n  where: { studentId },\n  include: { course: { include: { _count: { select: { lessons: true } } } } }\n});"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর ডাটাবেজ স্কিমায় নতুন ভার্সন আপগ্রেডের সময় প্রোডাকশন CI/CD পাইপলাইনে Prisma Migration অটোমেশন কীভাবে কনফিগার করেছিলে?",
      m: "আমাদের GitHub Actions CI পাইপলাইনে আমরা ডেপ্লয়মেন্ট স্টেপে অটোমেটেড মাইগ্রেশন রান করেছি: `npx prisma migrate deploy`। কিন্তু তার আগে একটি টেস্ট স্টেপে লোকাল টেস্ট পোস্টগ্রেস কন্টেইনার তুলে পুরো মাইগ্রেশনটি পরীক্ষামূলকভাবে রান করে ভ্যালিডেট করা হতো। কোনো মাইগ্রেশন ফেইল করলে প্রোডাকশন ডেপ্লয়মেন্ট সাথে সাথে বন্ধ হয়ে যেত। আর সফল হলে স্বয়ংক্রিয়ভাবে নোড সার্ভার নতুন ভার্সনে রিলোড হতো।",
      b: "গিটহাব অ্যাকশনস সিআই পাইপলাইনে আমরা prisma migrate deploy স্বয়ংক্রিয় করেছি। প্রোডাকশনে যাওয়ার আগে টেস্ট কনটেইনারে মাইগ্রেশন সফল হয়েছে কিনা তা যাচাই করে তবেই লাইভ সার্ভারে প্রয়োগ করা হতো।",
      e: "Automated database schema deployments via GitHub Actions pipelines: ephemeral Docker PostgreSQL test runners dry-ran pending migrations during pull requests. Staging gates promoted to production executed `npx prisma migrate deploy` prior to zero-downtime application reloads.",
      tip: "সিআই পাইপলাইনে টেস্ট কন্টেইনারে মাইগ্রেশন ড্রাই-রান করার কথা বলা প্রিমিয়াম ডেভঅপ্স ম্যাচিউরিটির প্রমাণ।"
    },
    {
      lvl: "realworld",
      q: "Prisma ORM ব্যবহারে প্রোডাকশন অ্যাপ্লিকেশনের পারফরম্যান্স ও স্থায়িত্ব বজায় রাখার জন্য তোমার শীর্ষ ৫টি নীতি কী?",
      m: "আমার শীর্ষ ৫টি নীতি: (১) গ্লোবাল সিঙ্গেলটন ক্লায়েন্ট ব্যবহার করা যাতে কানেকশন পুল নষ্ট না হয়। (২) N+1 সমস্যা রোধে সর্বদা `include` বা `select` ব্যবহার করা। (৩) বড় লিস্টে অফসেট পেজিনেশনের বদলে কার্সর পেজিনেশন ব্যবহার করা। (৪) প্রোডাকশনে কঠোরভাবে `prisma migrate deploy` ব্যবহার করা (কখনোই `db push` নয়)। (৫) মাল্টি-টেন্যান্ট আইসোলেশন ও সফট ডিলিটের জন্য Prisma Client Extensions (`$extends`) ব্যবহার করা।",
      b: "আমার প্রধান ৫টি নীতি: সিঙ্গেলটন ক্লায়েন্ট নিশ্চিত করা, N+1 রোধে include ব্যবহার, কার্সর পেজিনেশন প্রয়োগ, প্রোডাকশনে শুধুমাত্র migrate deploy চালানো এবং এক্সটেনশনের সাহায্যে টেন্যান্ট ডেটা নিরাপত্তা বজায় রাখা।",
      e: "My core Prisma architectural rules: (1) Enforce a strict module singleton client to protect connection pools, (2) Eliminate N+1 queries via `include`/`select` projections, (3) Standardize on Cursor-based pagination for large datasets, (4) Restrict production pipelines strictly to `prisma migrate deploy`, and (5) Automate tenant isolation via Prisma Client Extensions.",
      tip: "এই সংক্ষিপ্ত চেকলিস্টটি ইন্টারভিউয়ারকে তোমার পূর্ণাঙ্গ ওআরএম অভিজ্ঞতার ওপর ১০০% নিশ্চয়তা দেবে।"
    }
  ]
};
