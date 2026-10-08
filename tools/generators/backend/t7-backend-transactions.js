// Topic 7: Backend Database Design, Relationships & Transactions (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "backend-db-transactions",
  name: "Backend DB Design, Relations & Transactions",
  desc: "Relational Schema, Table Relationships (1:1, 1:N, M:N), Prisma Client, ACID Transactions, Row Locking, MongoDB Integration",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "ACID Properties (Atomicity, Consistency, Isolation, Durability) ব্যাকএন্ড ট্রানজাকশনে কেন অত্যাবশ্যক?",
      m: "ACID হলো ডাটাবেজ লেনদেনের ৪টি নির্ভরযোগ্যতার স্তম্ভ: (১) `Atomicity`: 'All or Nothing'—সবগুলো অপারেশন সফল হবে অথবা একটি ফেইল করলে পুরো ট্রানজাকশন রোলব্যাক হবে (অর্ধেক টাকা কেটে অর্ডার ফেইল হওয়া বন্ধ করে)। (২) `Consistency`: ডাটাবেজের সমস্ত কনস্ট্রেইন্ট ও নিয়ম সর্বদা বজায় থাকে। (৩) `Isolation`: একাধিক ব্যবহারকারীর লেনদেন একে অপরকে বিঘ্নিত না করে নিরাপদে একযোগে চলে। (৪) `Durability`: লেনদেন সফল হয়ে একবার কমিট হলে সার্ভার ক্র্যাশ বা বিদ্যুৎ চলে গেলেও ডেটা কখনোই হারাবে না।",
      b: "অ্যাসিড প্রপার্টিজ ডাটাবেজের বিশ্বস্ততা রক্ষা করে: অ্যাটোমিসিটি (হয় সব হবে নয়তো কিছুই হবে না), কনসিস্টেন্সি (নিয়ম ও শর্তের অবিচলতা), আইসোলেশন (এক লেনদেন অন্যটিকে প্রভাবিত করবে না), এবং ডিউরেবিলিটি (কমিট হওয়া ডাটা স্থায়ীভাবে টিকে থাকবে)।",
      e: "ACID guarantees transactional integrity: Atomicity enforces all-or-nothing completion, Consistency maintains database invariants, Isolation shields concurrent transactions from interfering, and Durability guarantees committed transactions survive server crashes.",
      tip: "ইন্টারভিউতে ব্যাংকিং বা ইনভয়েসের উদাহরণের মাধ্যমে ACID ব্যাখ্যা করবে।"
    },
    {
      lvl: "lvl1",
      q: "Relational Database-এ ৩ ধরনের রিলেশনশিপ (One-to-One, One-to-Many, Many-to-Many) ব্যাকএন্ডে কীভাবে মডেল করা হয়?",
      m: "(১) `One-to-One (1:1)`: একজন ইউজারের একটি প্রফাইল—প্রফাইল টেবিলে `userId` থাকে Unique Foreign Key হিসেবে। (২) `One-to-Many (1:N)`: একজন স্টোর ওনারের শত শত প্রোডাক্ট—প্রোডাক্ট টেবিলে `storeId` Foreign Key হিসেবে থাকে। (৩) `Many-to-Many (M:N)`: একজন স্টুডেন্ট একাধিক কোর্সে এনরোল করে এবং একটি কোর্সে শত শত স্টুডেন্ট থাকে—এখানে মাঝখানে একটি 'Junction / Pivot Table' (`Enrollment`) থাকে যাতে `studentId` এবং `courseId` দুটি কম্পোজিট ফরেন কি হিসেবে থাকে। Prisma ORM-এ এটি স্বয়ংক্রিয়ভাবে হ্যান্ডেল হয়।",
      b: "১:১ রিলেশনে ইউনিক ফরেন কি থাকে (ইউজার-প্রোফাইল), ১:এন রিলেশনে চাইল্ড টেবিলে প্যারেন্টের ফরেন কি থাকে (স্টোর-প্রোডাক্ট), এবং এম:এন রিলেশনে মাঝখানে একটি জংশন টেবিল ব্যবহার করে উভয় মডেলের ফরেন কি যুক্ত করা হয় (স্টুডেন্ট-কোর্স)।",
      e: "1:1 relations place a unique foreign key on the dependent entity. 1:N relations place a non-unique foreign key on the child pointing to the parent. M:N relations introduce a junction (pivot) table containing dual foreign keys.",
      code: "// Prisma M:N Junction:\nmodel StudentOnCourse {\n  studentId String\n  courseId  String\n  student   Student @relation(fields: [studentId], references: [id])\n  course    Course  @relation(fields: [courseId], references: [id])\n  @@id([studentId, courseId])\n}"
    },
    {
      lvl: "lvl1",
      q: "Prisma ORM-এ `$transaction()` এপিআই কীভাবে কাজ করে এবং Sequential vs Interactive Transactions-এর পার্থক্য কী?",
      m: "Prisma-তে দুটি পদ্ধতি রয়েছে: (১) `Sequential Transaction`: একাধিক স্বাধীন Prisma অপারেশনকে একটি অ্যারে হিসেবে পাস করা (`prisma.$transaction([op1, op2])`। এটি খুব দ্রুত চলে কারণ ডাটাবেজে রাউন্ড-ট্রিপ কম হয়। (২) `Interactive Transaction`: একটি অ্যাসিনক্রোনাস কলব্যাক ফাংশন গ্রহণ করে (`prisma.$transaction(async (tx) => ...)`। এটি ব্যবহৃত হয় যখন ২য় অপারেশনের ডেটা ১ম অপারেশনের ফলাফলের ওপর নির্ভর করে (যেমন: ব্যালেন্স চেক করে তারপর টাকা কাটা)। কলব্যাকের ভেতর কোনো এরর থ্রো হলে পুরো ট্রানজাকশন স্বয়ংক্রিয়ভাবে রোলব্যাক হয়।",
      b: "প্রিজমা ট্রানজাকশনে অ্যারে পাস করলে সব অপারেশন একসাথে কার্যকর হয় (সিকোয়েন্সিয়াল)। ইন্টারেক্টিভ ট্রানজাকশনে অ্যাসিনক্রোনাস কলব্যাকের ভেতরে আগের ডেটার ওপর ভিত্তি করে পরবর্তী সিদ্ধান্ত নেওয়া যায় এবং ত্রুটি হলে সব পরিবর্তন রোলব্যাক হয়ে যায়।",
      e: "Sequential transactions pass an array of operations (`prisma.$transaction([opA, opB])`), batching them over a single round-trip. Interactive transactions (`prisma.$transaction(async (tx) => ...)`) supply an isolated transaction client (`tx`) to perform interdependent mutations with rollback guarantees.",
      code: "await prisma.$transaction(async (tx) => {\n  const user = await tx.user.update({ where: { id }, data: { balance: { decrement: 100 } } });\n  if (user.balance < 0) throw new Error('Insufficient funds');\n  await tx.ledger.create({ data: { userId: id, amount: 100 } });\n});"
    },
    {
      lvl: "lvl1",
      q: "SQL Database (PostgreSQL) বনাম NoSQL Database (MongoDB)-এর মধ্যে ব্যাকএন্ড আর্কিটেকচারে নির্বাচনের মাপকাঠি কী?",
      m: "নির্বাচনের মূল মাপকাঠি: (১) `PostgreSQL (SQL)`: যখন ডেটা অত্যন্ত স্ট্রাকচার্ড, টেবিলগুলোর মধ্যে জটিল রিলেশনশিপ রয়েছে, এবং আর্থিক বা ট্রানজাকশনাল নির্ভুলতা (ACID) জীবন-মরণ বিষয় (যেমন Dokani POS বা ব্যাংকিং)। (২) `MongoDB (NoSQL)`: যখন ডেটা স্কিমা ঘন ঘন পরিবর্তিত হয় (Unstructured / Semi-structured), ডেটা ডায়নামিকালি নেস্টেড ডকুমেন্ট আকারে থাকে (যেমন ক্যাটালগ প্রপার্টিজ বা ইভেন্ট লগ) এবং হরিজোন্টাল পার্টিশনিং বা শার্ডিং খুব সহজে স্কেল করা প্রয়োজন।",
      b: "আর্থিক লেনদেন, কঠোর স্কিমা ও রিলেশনাল ডেটার জন্য পোস্টগ্রেসকিউএল সেরা পছন্দ। ঘন ঘন পরিবর্তনশীল কাঠামো, বিশাল ক্যাটালগ ও নেস্টেড ডকুমেন্টের জন্য মঙ্গোডিবি উপযুক্ত।",
      e: "Choose PostgreSQL for structured schemas, relational integrity, complex JOIN queries, and rigorous ACID transaction compliance (financial ledgers). Choose MongoDB for semi-structured polymorphic documents, evolving hierarchical schemas, and effortless horizontal sharding.",
      tip: "কখনোই অন্ধভাবে 'মঙ্গোডিবি ফাস্ট' বলবে না; ডেটা মডেলের ধরন ও ACID প্রয়োজনীয়তার ওপর ভিত্তি করে যুক্তি দেবে।"
    },
    {
      lvl: "lvl1",
      q: "Prisma Client-এ 'N+1 Query Problem' কী এবং কীভাবে সমাধান করবে?",
      m: "N+1 সমস্যা ঘটে যখন আপনি ১টি কুয়েরিতে ১০০ জন ইউজার আনেন, এবং এরপর লুপ চালিয়ে প্রতি ইউজারের পোস্ট আনার জন্য আরও ১০০টি আলাদা ডাটাবেজ কুয়েরি পাঠান (মোট ১ + ১০০ = ১০১টি কুয়েরি!)। এটি ডাটাবেজকে পঙ্গু করে দেয়। সমাধান: Prisma-র `include` বা `select` ব্যবহার করা (`prisma.user.findMany({ include: { posts: true } })`। Prisma ইন্টারনালি একটি সিঙ্গেল অপটিমাইজড `JOIN` অথবা দুটি ইন-মেমোরি ব্যাচড কুয়েরি (`WHERE userId IN (...)`) চালিয়ে মাত্র ১-২টি কোয়েরিতে সমস্ত ডেটা এনে দেয়।",
      b: "এন প্লাস ওয়ান সমস্যা হলো লুপ চালিয়ে বারবার ডাটাবেজ কল করে সিস্টেম স্লো করা। প্রিজমার include ব্যবহার করলে একটিমাত্র অপটিমাইজড কুয়েরিতে রিলেশনাল ডেটা চলে আসে এবং ডাটাবেজ লোড ১০০ গুণ কমে যায়।",
      e: "The N+1 problem occurs when fetching N records induces N additional sequential queries to resolve related entities. Resolve it in Prisma via eager loading using `include` or `select`, transforming N+1 queries into one optimized JOIN or batch `IN` query.",
      code: "const users = await prisma.user.findMany({\n  include: { profile: true, posts: { take: 5 } }\n});"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Pessimistic Locking (`SELECT FOR UPDATE`) এবং Optimistic Locking-এর মধ্যে পার্থক্য কী?",
      m: "সমস্যা: একই সাথে দুজন ক্রেতা স্টকের শেষ পণ্যটি কেনার চেষ্টা করছে। (১) `Pessimistic Locking`: ডাটাবেজ রো-কে তালা মেরে দেয় (`SELECT ... FOR UPDATE`); ১ম ট্রানজাকশন শেষ না হওয়া পর্যন্ত ২য় ট্রানজাকশন অপেক্ষা করতে বাধ্য হয়। এটি হাই-কনকারেন্সি বা ফ্ল্যাশ সেলের জন্য শতভাগ নিরাপদ। (২) `Optimistic Locking`: কোনো রো লক করে না; টেবিলে একটি `version: 1` ফিল্ড রাখে। আপডেটের সময় চেক করে `WHERE id = 1 AND version = 1`। যদি ইতিমধ্যে অন্য কেউ আপডেট করে ভার্সন ২ করে ফেলে, তবে ২য় জনের আপডেট ০ রো এফেক্ট করে ফেইল হয় এবং রিট্রাই করতে বলে।",
      b: "প্যাসিমিস্টিক লকিং ডাটাবেজ রো লক করে রাখে যাতে অন্য কেউ হাত না দিতে পারে (ফ্ল্যাশ সেলে কার্যকর)। অপটিমিস্টিক লকিং ভার্সন নাম্বার দিয়ে আপডেট যাচাই করে; অন্য কেউ ইতিমধ্যে পরিবর্তন করে ফেললে অপারেশন বাতিল করে রিট্রাই করায়।",
      e: "Pessimistic Locking (`SELECT FOR UPDATE`) physically locks the row at the database engine level, forcing concurrent transactions to block until release. Optimistic Locking relies on a `version` column, updating where version matches; mismatches abort and trigger app-level retries.",
      code: "// PostgreSQL Raw Lock in Prisma:\nawait tx.$queryRaw`SELECT * FROM \"Product\" WHERE id = ${id} FOR UPDATE`;"
    },
    {
      lvl: "lvl2",
      q: "Transaction Isolation Levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable)-এর কাজ কী?",
      m: "আইসোলেশন লেভেল নির্ধারণ করে কনকারেন্ট লেনদেনগুলো কতটা বিচ্ছিন্ন থাকবে: (১) `Read Uncommitted`: আন-কমিটেড ডেটা রিড হতে পারে (Dirty Read ঝুঁকি)। (২) `Read Committed`: শুধুমাত্র কমিট হওয়া ডেটা রিড হয় (PostgreSQL-এর ডিফল্ট)। (৩) `Repeatable Read`: পুরো ট্রানজাকশন জুড়ে একই কুয়েরি বারবার চালালেও হুবহু একই ফলাফল দেখাবে (Non-repeatable read বন্ধ করে)। (৪) `Serializable`: সর্বোচ্চ কঠোর স্তর—সব লেনদেন মনে হবে একে একে পর্যায়ক্রমে এক্সিকিউট হচ্ছে (Phantom Read পুরোপুরি বন্ধ কিন্তু স্লোয়েস্ট এবং রোলব্যাকের ঝুঁকি বেশি)।",
      b: "আইসোলেশন লেভেল কনকারেন্ট লেনদেনের সুরক্ষা নির্ধারণ করে। রিড কমিটেড পোস্টগ্রেসের ডিফল্ট। রিপিটেবল রিড একই ট্রানজাকশনে ডেটা অপরিবর্তিত রাখে এবং সিরিয়ালাইজেবল সর্বোচ্চ কঠোর আইসোলেশন নিশ্চিত করে।",
      e: "Transaction Isolation Levels trade concurrency for phenomena prevention: Read Committed (PostgreSQL default, prevents Dirty Reads), Repeatable Read (guarantees snapshot isolation, prevents non-repeatable reads), and Serializable (strict sequential emulation, eradicating Phantom Reads).",
      tip: "পোস্টগ্রেসের ডিফল্ট আইসোলেশন লেভেল 'Read Committed'—এটি ইন্টারভিউতে খুব সাধারণ ও গুরুত্বপূর্ণ প্রশ্ন।"
    },
    {
      lvl: "lvl2",
      q: "Database Cascading Actions (`CASCADE`, `SET NULL`, `RESTRICT`) ব্যাকএন্ড ডাটাবেজ রিলেশনে কীভাবে কাজ করে?",
      m: "যখন কোনো প্যারেন্ট রেকর্ড ডিলিট করা হয়: (১) `CASCADE`: প্যারেন্ট ডিলিট হলে সংশ্লিষ্ট সব চাইল্ড রেকর্ড স্বয়ংক্রিয়ভাবে মুছে যায় (যেমন ইউজার মুছলে তার সমস্ত পোস্ট ডিলিট)। (২) `SET NULL`: চাইল্ড রেকর্ডের ফরেন কি নাল হয়ে যায় কিন্তু রেকর্ড অক্ষত থাকে (যেমন ক্যাটাগরি ডিলিট হলে প্রোডাক্টের ক্যাটাগরি নাল হওয়া)। (৩) `RESTRICT` বা `NO ACTION`: যদি কোনো চাইল্ড রেকর্ড অবশিষ্ট থাকে, তবে প্যারেন্ট ডিলিট করার রিকোয়েস্টটি ডাটাবেজ সরাসরি রিজেক্ট করে এরর দেবে (যেমন কাস্টমারের বাকি টাকা বা ইনভয়েস থাকলে কাস্টমার ডিলিট নিষিদ্ধ)।",
      b: "ক্যাসকেড অ্যাকশনে প্যারেন্ট মুছলে চাইল্ড স্বয়ংক্রিয়ভাবে মুছে যায়। SET NULL ফরেন কি নাল করে রেকর্ড অক্ষত রাখে। আর RESTRICT চাইল্ড ডাটা থাকা অবস্থায় প্যারেন্ট ডিলিট করা কঠোরভাবে আটকে দেয়।",
      e: "Foreign key cascading defines integrity reactions upon parent deletion: `CASCADE` automatically purges orphaned children, `SET NULL` disassociates children by clearing foreign keys, and `RESTRICT` aborts deletion if referencing children exist.",
      code: "user User @relation(fields: [userId], references: [id], onDelete: Cascade)"
    },
    {
      lvl: "lvl2",
      q: "MongoDB Mongoose-এ Transactions ও Two-Phase Commits কীভাবে কাজ করে?",
      m: "MongoDB v4.0+ থেকে Replica Set আর্কিটেকচারে মাল্টি-ডকুমেন্ট ACID ট্রানজাকশন সাপোর্ট করে। Mongoose-এ আমরা একটি সেশন শুরু করি (`session = await mongoose.startSession()`), এরপর `session.startTransaction()` দিয়ে কাজ করি। প্রতিটি মঙ্গুজ কুয়েরিতে `{ session }` পাস করতে হয়। সব কাজ শেষে `await session.commitTransaction()` কল করি। কোনো এক্সেপশন ঘটলে `await session.abortTransaction()` কল করে সম্পূর্ণ পরিবর্তন রোলব্যাক করা হয়।",
      b: "মঙ্গোডিবি রেপ্লিকা সেটে মাল্টি-ডকুমেন্ট ACID ট্রানজাকশন সমর্থন করে। startSession এবং startTransaction দিয়ে সেশন শুরু করে সব মডেলে সেশন পাস করতে হয় এবং ত্রুটি হলে abortTransaction দিয়ে রোলব্যাক করা হয়।",
      e: "MongoDB supports multi-document ACID transactions across replica sets via client sessions. Instantiate sessions via `mongoose.startSession()`, start the transaction, execute operations bound to `{ session }`, and commit or abort atomically.",
      code: "const session = await mongoose.startSession();\nsession.startTransaction();\ntry {\n  await Order.create([orderData], { session });\n  await Inventory.updateOne({ _id: prodId }, { $inc: { stock: -1 } }, { session });\n  await session.commitTransaction();\n} catch (e) {\n  await session.abortTransaction();\n} finally { session.endSession(); }"
    },
    {
      lvl: "lvl2",
      q: "Prisma Migrations (`prisma migrate dev` vs `prisma db push` vs `prisma migrate deploy`) কখন কোনটি ব্যবহার করবে?",
      m: "(১) `prisma migrate dev`: লোকাল ডেভেলপমেন্টে ব্যবহার করা হয়; এটি স্কিমা চেঞ্জের ওপর ভিত্তি করে নতুন SQL মাইগ্রেশন ফাইল জেনারেট করে এবং ডাটাবেজে অ্যাপ্লাই করে। (২) `prisma db push`: কোনো মাইগ্রেশন হিস্ট্রি ফাইল তৈরি না করে সরাসরি স্কিমাকে ডাটাবেজে পুশ করে (দ্রুত প্রোটোটাইপিংয়ের জন্য ভালো কিন্তু প্রোডাকশনে ক্ষতিকর)। (৩) `prisma migrate deploy`: প্রোডাকশন CI/CD পাইপলাইনে ব্যবহৃত হয়; এটি কোনো নতুন ফাইল তৈরি করে না, শুধুমাত্র পেন্ডিং থাকা প্রাক-অনুমোদিত SQL ফাইলগুলো প্রোডাকশন ডাটাবেজে নিরাপদে এক্সিকিউট করে।",
      b: "migrate dev লোকাল ডেভেলপমেন্টে এসকিউএল ফাইল তৈরি ও প্রয়োগ করে। db push প্রোটোটাইপিংয়ের জন্য সরাসরি স্কিমা পুশ করে। আর migrate deploy প্রোডাকশনে পেন্ডিং মাইগ্রেশনগুলো নিরাপদে এক্সিকিউট করে।",
      e: "`prisma migrate dev` generates versioned SQL migration scripts for local development. `prisma db push` synchronizes schemas directly without tracking migration histories (prototyping only). `prisma migrate deploy` safely executes pending migrations in production CI/CD pipelines.",
      tip: "কখনোই প্রোডাকশনে `prisma db push` বা `migrate dev` চালাবে না; সবসময় `prisma migrate deploy` চালাবে।"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Deadlock (ডেডলক) কী এবং ডাটাবেজ ট্রানজাকশনে ডেডলক কীভাবে ডিটেক্ট ও প্রিভেন্ট করবে?",
      m: "ডেডলক ঘটে যখন ট্রানজাকশন ১ রো A লক করে রো B-র জন্য অপেক্ষা করছে, আর একই সাথে ট্রানজাকশন ২ রো B লক করে রো A-র জন্য অপেক্ষা করছে—দুজনেই পরস্পরের জন্য অনির্দিষ্টকাল আটকে যায়। সমাধান: (১) সমস্ত কোডবেজে রিসোর্স লক করার ক্রম (Order of Execution) সবসময় অভিন্ন রাখা (যেমন অ্যাকাউন্ট ট্রানজাকশনে সবসময় ছোট আইডি আগে লক করা: `ORDER BY id ASC`)। (২) ট্রানজাকশনগুলোকে যত দ্রুত সম্ভব ছোট রাখা। (৩) ডাটাবেজ ডেডলক ডিটেক্ট করে একটি ট্রানজাকশন কিল করলে অ্যাপ্লিকেশন লেয়ারে এক্সপোনেনশিয়াল ব্যাকঅফ সহ ৩ বার অটো-রিট্রাই লজিক রাখা।",
      b: "ডেডলক হলো দুটি ট্রানজাকশন একে অপরের লক করা রিসোর্সের জন্য অনন্তকাল অপেক্ষা করার অবস্থা। রিসোর্স লক করার ক্রম সর্বদা অভিন্ন রেখে (ছোট আইডি থেকে বড় আইডি) এবং অ্যাপ্লিকেশনে অটো-রিট্রাই লজিক রেখে ডেডলক প্রতিরোধ করা হয়।",
      e: "Deadlocks happen when two concurrent transactions mutually block each other by holding locks the other needs. Prevent deadlocks by enforcing deterministic, monotonic lock acquisition ordering (e.g. locking accounts sorted by primary key ID ascending) and adding exponential retry wrappers.",
      code: "const [firstId, secondId] = [idA, idB].sort(); // Deterministic lock acquisition order!"
    },
    {
      lvl: "lvl3",
      q: "Connection Pool Exhaustion কী এবং হাই-কনকারেন্সি ব্যাকএন্ডে PgBouncer বা Prisma Connection Pooling কীভাবে কনফিগার করবে?",
      m: "পোস্টগ্রেসকিউএলে প্রতিটি কানেকশন ওএস মেমোরিতে প্রায় ১০MB RAM নেয়। ট্রাফিকের চাপে যদি নোড সার্ভার শত শত কানেকশন খুলে ফেলে, ডাটাবেজ ক্র্যাশ করে বা নতুন রিকোয়েস্ট রিজেক্ট করে (`too many connections`)। সমাধান: আমরা ডাটাবেজের সামনে `PgBouncer` (Connection Pooler) বসাই যা Transaction Pooling মোডে চলে। অ্যাপ্লিকেশন হাজার হাজার কানেকশন পাঠালেও PgBouncer মাত্র ২০-৫০টি রি-ইউজেবল ফিজিক্যাল কানেকশন দিয়ে সমস্ত ট্রানজাকশন সম্পন্ন করে। Prisma-তে কানেকশন ইউআরএলে `?connection_limit=20&pool_timeout=10` দিয়ে অ্যাপ লেভেল পুলিং নিয়ন্ত্রণ করি।",
      b: "কানেকশন পুল শেষ হয়ে গেলে ডাটাবেজ ক্র্যাশ করে। PgBouncer কানেকশন পুলার ব্যবহার করে হাজার হাজার রিকোয়েস্টকে মাত্র ২০-৫০টি ফিজিক্যাল কানেকশন দিয়ে সুপারফাস্ট হ্যান্ডেল করে মেমোরি রক্ষা করা হয়।",
      e: "Connection Pool Exhaustion crashes database engines under load. Deploy PgBouncer in Transaction Pooling mode in front of PostgreSQL, multiplexing thousands of virtual client connections across a lean physical pool of 30-50 connections, tuned in Prisma via `connection_limit` parameters.",
      tip: "PgBouncer এবং Transaction Pooling কনফিগারেশন এন্টারপ্রাইজ পোস্টগ্রেস আর্কিটেকচারের চূড়ান্ত প্রমাণ।"
    },
    {
      lvl: "lvl3",
      q: "Database Sharding এবং Read Replicas (CQRS): হাই-ট্রাফিক ব্যাকএন্ডে রিড ও রাইট কুয়েরি কীভাবে আলাদা করবে?",
      m: "ডাটাবেজের ৯৫% লোড হয় রিড অপারেশনে (SELECT) এবং মাত্র ৫% রাইটে (INSERT/UPDATE)। আমরা ১টি Primary/Master ডাটাবেজ এবং ৩টি Read-Only Replicas রাখি। CQRS (Command Query Responsibility Segregation) নীতিতে: সমস্ত ডাটাবেজ মিউটেশন ও ট্রানজাকশন সরাসরি Master ডাটাবেজে যায়। আর সমস্ত ড্যাশবোর্ড ও ক্যাটালগ রিড কুয়েরি লোড ব্যালেন্স হয়ে Read Replicas-এ যায়। Prisma-তে `$extends` দিয়ে অথবা মাল্টিপল ডাটাবেজ ক্লায়েন্ট তৈরি করে এই রিড-রাইট স্প্লিট কার্যকর করা হয়।",
      b: "রিড রেপ্লিকা আর্কিটেকচারে সব রাইট ও ট্রানজাকশন যায় মাস্টার ডাটাবেজে এবং সব রিড কুয়েরি ভাগ হয়ে যায় একাধিক রিড রেপ্লিকায়। এর ফলে মূল ডাটাবেজের ওপর চাপ মুক্ত থাকে এবং কোটি কোটি রিড রিকোয়েস্ট অনায়াসে হ্যান্ডেল হয়।",
      e: "Segregate database workloads via Read Replicas: route mutating transactional writes to the primary write master, while distributing read traffic across asynchronous read replicas via Prisma client extensions or multi-datasource routing.",
      code: "const readClient = new PrismaClient({ datasources: { db: { url: env.DATABASE_REPLICA_URL } } });\nconst writeClient = new PrismaClient({ datasources: { db: { url: env.DATABASE_PRIMARY_URL } } });"
    },
    {
      lvl: "lvl3",
      q: "Prisma Client Extensions (`$extends`) দিয়ে কীভাবে গ্লোবাল সফট ডিলিট (Soft Delete) এবং অডিট ফিল্ড অটোমেশন তৈরি করবে?",
      m: "Prisma v4.7+ এ `$extends` এপিআই এসেছে। আমরা একটি ক্লায়েন্ট এক্সটেনশন লিখি যা প্রতিটি `findMany` ও `findUnique` কুয়েরিতে স্বয়ংক্রিয়ভাবে `{ where: { deletedAt: null } }` ইনজেক্ট করে। আর যখন কোনো ইউজার `delete()` কল করে, এক্সটেনশনটি ইন্টারসেপ্ট করে আসল হার্ড ডিলিট না করে `update({ data: { deletedAt: new Date() } })` এক্সিকিউট করে। ডেভেলপারকে কোনো ফাইলে ম্যানুয়ালি সফট ডিলিটের ফিল্টার লিখতে হয় না—পুরো অ্যাপ্লিকেশনে সফট ডিলিট স্বয়ংক্রিয় হয়ে যায়।",
      b: "প্রিজমা এক্সটেনশনের মাধ্যমে সফট ডিলিট স্বয়ংক্রিয় করা যায়। delete() কল করলে স্বয়ংক্রিয়ভাবে deletedAt টাইমস্ট্যাম্প আপডেট হয় এবং যেকোনো কুয়েরিতে ডিলিট না হওয়া ডাটা ফিল্টার হয়ে আসে।",
      e: "Prisma Client Extensions (`$extends`) intercept query methods globally. Transform `delete` operations into soft-delete updates (`deletedAt: new Date()`), while injecting `{ where: { deletedAt: null } }` into all queries transparently.",
      code: "export const db = prisma.$extends({\n  query: {\n    product: {\n      async delete({ args }) { return prisma.product.update({ ...args, data: { deletedAt: new Date() } }); }\n    }\n  }\n});"
    },
    {
      lvl: "lvl3",
      q: "Zero-Downtime Database Migrations: বড় প্রোডাকশন টেবিলে কলাম রিনেম বা ড্রপ করার সময় 'Expand and Contract' প্যাটার্ন কীভাবে কাজ করে?",
      m: "সরাসরি কোনো কলাম রিনেম (`ALTER TABLE RENAME`) করলে রানিং পুরানো কোডের সার্ভার ক্র্যাশ করবে। Expand and Contract প্যাটার্নে ৩টি ধাপে মাইগ্রেশন হয়: (১) `Expand`: ডাটাবেজে নতুন কলামটি যোগ করা হয় এবং কোডে ব্যাকওয়ার্ড কমপ্যাটিবিলিটি সহ উভয় কলামে ডুয়াল-রাইট করা হয়। (২) `Migrate`: ব্যাকগ্রাউন্ড স্ক্রিপ্ট দিয়ে পুরানো কলামের সব ব্যাকলগ ডাটা নতুন কলামে কপি করা হয়। (৩) `Contract`: কোডকে শুধুমাত্র নতুন কলামে পয়েন্ট করানো হয় এবং পুরানো সার্ভার সম্পূর্ণ বন্ধ হওয়ার পর নিরাপদ পরবর্তী রিলিজের সময় পুরানো কলামটি ড্রপ করা হয়। কোনো ডাউনটাইম হয় না।",
      b: "এক্সপ্যান্ড অ্যান্ড কন্ট্রাক্ট প্যাটার্নে প্রথমে নতুন কলাম যোগ করে উভয় কলামে ডাটা লেখা হয়। এরপর পুরানো ডাটা মাইগ্রেট করে কোড আপডেট করা হয় এবং সবার শেষে পুরানো কলাম মুছে দিয়ে জিরো ডাউনটাইম নিশ্চিত করা হয়।",
      e: "The Expand-and-Contract (Parallel Change) pattern executes schema migrations safely: (1) Expand: add new column, dual-writing to old and new in application code, (2) Backfill existing data via background scripts, (3) Contract: switch reads exclusively to the new column, deprecating and dropping the legacy column in a subsequent release.",
      tip: "প্রোডাকশন ডেটাবেজ মাইগ্রেশনে Expand & Contract প্যাটার্ন উল্লেখ করা সিনিয়র আর্কিটেক্টদের সিগনেচার দক্ষতা।"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "একটি ফ্ল্যাশ সেলে শেষ ৫টি আইটেমের জন্য একই সেকেন্ডে ৫০০ জন ইউজার 'Buy' বাটনে ক্লিক করায় ডাটাবেজে স্টক ঋণাত্মক (-১২) হয়ে গেছে (Race Condition)। কীভাবে ফিক্স করবে?",
      m: "কারণ: ৫০০টি রিকোয়েস্ট একই সময়ে `SELECT stock` চালিয়ে দেখেছে ৫টি আছে, এবং সবাই আপডেট চালিয়ে দিয়েছে। সমাধান: (১) ডাটাবেজ লেভেলে চেকিং: `UPDATE products SET stock = stock - 1 WHERE id = $1 AND stock > 0 RETURNING stock;`। যদি রিটার্নে কোনো রো না আসে, এর মানে স্টক অলরেডি ০ এবং রিকোয়েস্ট ফেইল। (২) অথবা ট্রানজাকশনের ভেতর Pessimistic Locking: `SELECT * FROM products WHERE id = $1 FOR UPDATE`। (৩) ডাটাবেজ টেবিলে Check Constraint বসাব: `CHECK (stock >= 0)` যাতে কোনো অবস্থাতেই ঋণাত্মক স্টক সেভ না হতে পারে।",
      b: "রেস কন্ডিশনে স্টক মাইনাস হওয়া ঠেকাতে UPDATE কুয়েরিতে stock > 0 শর্ত দিতে হবে। টেবিলে CHECK (stock >= 0) কনস্ট্রেইন্ট দিয়ে ডাটাবেজ লেভেলে ঋণাত্মক সংখ্যা পুরোপুরি নিষিদ্ধ করতে হবে।",
      e: "Atomic decrement queries prevent stock race conditions: `UPDATE products SET stock = stock - 1 WHERE id = $1 AND stock > 0`. Alternatively, combine Pessimistic Locking (`FOR UPDATE`) with a database CHECK constraint (`CONSTRAINT positive_stock CHECK (stock >= 0)`).",
      code: "const updated = await prisma.product.updateMany({\n  where: { id, stock: { gte: quantity } },\n  data: { stock: { decrement: quantity } }\n});\nif (updated.count === 0) throw new Error('Stock depleted');"
    },
    {
      lvl: "situation",
      q: "একটি জটিল ড্যাশবোর্ড রিপোর্ট রান করার সময় ডাটাবেজ CPU ১০০% হয়ে গেছে এবং সাধারণ ইউজারদের সেলস এন্ট্রি কুয়েরিগুলো টাইমআউট হচ্ছে। তাৎক্ষণিকভাবে কীভাবে সামাল দেবে?",
      m: "তাৎক্ষণিক সমাধান: (১) ডাটাবেজে `SELECT pid, query, state, age(clock_timestamp(), query_start) FROM pg_stat_activity WHERE state != 'idle'` চালিয়ে স্লো কুয়েরির PID শনাক্ত করে `SELECT pg_cancel_backend(pid)` বা `pg_terminate_backend(pid)` দিয়ে কুয়েরি কিল করব। (২) ভারী অ্যানালিটিক্স রিপোর্টগুলোকে অবিলম্বে প্রাইমারি ডাটাবেজ থেকে সরিয়ে Read Replica ডাটাবেজে রাউট করব। (৩) কুয়েরিতে মিসিং ইন্ডেক্স যোগ করব এবং রিপোর্টটিকে Redis-এ ৫ মিনিটের জন্য ক্যাশ করব।",
      b: "প্রথমে pg_stat_activity দিয়ে ভারী কুয়েরি শনাক্ত করে pg_terminate_backend দিয়ে তা কিল করতে হবে। এরপর ভারী রিপোর্টগুলোকে মাস্টার ডাটাবেজ থেকে সরিয়ে রিড রেপ্লিকায় পাঠাতে হবে এবং রেডিসে ফলাফল ক্যাশ করতে হবে।",
      e: "Immediately identify and terminate the runaway reporting process using `pg_stat_activity` and `pg_terminate_backend(pid)`. Long-term: redirect analytical queries exclusively to a Read Replica or pre-computed materialized views, insulating primary write OLTP pools.",
      code: "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'active' AND query_start < now() - interval '2 minutes';"
    },
    {
      lvl: "situation",
      q: "প্রোডাকশন ডেটাবেজ মাইগ্রেশন চালাতে গিয়ে একটি কনস্ট্রেইন্ট ভায়োলেশনে মাইগ্রেশন মাঝপথে ক্র্যাশ করে ডাটাবেজ লক হয়ে গেল। কীভাবে রিকভার করবে?",
      m: "স্টেপস: (১) PostgreSQL-এর DDL অপারেশনগুলো বাই-ডিফল্ট ট্রানজাকশনাল, তাই ক্র্যাশ হলে স্বয়ংক্রিয়ভাবে রোলব্যাক হয়। (২) Prisma-র `_prisma_migrations` টেবিলে ওই মাইগ্রেশনটি 'failed' স্ট্যাটাসে মার্ক থাকে, যার ফলে পরবর্তী মাইগ্রেশন ব্লক হয়। (৩) আমরা `prisma migrate resolve --rolled-back <migration_name>` চালাব। (৪) এরর রুট কজ (যেমন ডাটাবেজে আগে থেকেই ডুপ্লিকেট ডেটা থাকায় ইউনিক ইনডেক্স ফেইল করা) ম্যানুয়াল SQL দিয়ে ক্লিন করব। (৫) পুনরায় সফলভাবে মাইগ্রেশন রান করব।",
      b: "মাইগ্রেশন ফেইল করলে prisma migrate resolve --rolled-back কমান্ড দিয়ে ফেইলিং স্ট্যাটাস রিসেট করতে হবে। যে ডেটার কারণে ভায়োলেশন হয়েছে তা এসকিউএল দিয়ে ঠিক করে পুনরায় নিরাপদে মাইগ্রেশন চালাতে হবে।",
      e: "PostgreSQL wraps DDL statements in transactions, rolling back upon failure. Reset Prisma's migration lock via `prisma migrate resolve --rolled-back <migration_name>`, sanitize the conflicting database rows via SQL, and re-execute `prisma migrate deploy`.",
      code: "npx prisma migrate resolve --rolled-back 20240101_add_unique_phone"
    },
    {
      lvl: "situation",
      q: "একটি টেবিলে কোটি কোটি রো রয়েছে এবং সাধারণ `SELECT * FROM transactions WHERE tenantId = $1` কুয়েরি রান হতে ৫ সেকেন্ড সময় নিচ্ছে। কীভাবে অপটিমাইজ করবে?",
      m: "সমাধান: (১) আমরা `EXPLAIN ANALYZE` রান করে দেখব এটি 'Seq Scan' (Sequential Scan) করছে কি না। (২) টেবিলে একটি কম্পোজিট ইনডেক্স তৈরি করব: `CREATE INDEX idx_transactions_tenant_created ON \"Transaction\"(tenantId, createdAt DESC)`। এর ফলে সিকোয়েন্সিয়াল স্ক্যানের বদলে 'Index Scan' হবে এবং কুয়েরি টাইম ৫ সেকেন্ড থেকে কমে মাত্র ২ মিলিসেকেন্ডে নেমে আসবে। (৩) অতিরিক্ত স্কেলের জন্য টেবিলকে `tenantId` বা তারিখ অনুযায়ী Table Partitioning করব।",
      b: "EXPLAIN ANALYZE চালিয়ে কুয়েরি বিশ্লেষণ করতে হবে। tenantId এবং createdAt এর ওপর কম্পোজিট ইনডেক্স তৈরি করলে কুয়েরি সময় ৫ সেকেন্ড থেকে ২ মিলিসেকেন্ডে নেমে আসবে। অতিরিক্ত লোডে টেবিল পার্টিশনিং কার্যকর সমাধান।",
      e: "Profile with `EXPLAIN ANALYZE` to identify full table scans. Add a composite B-Tree index on `(tenantId, createdAt DESC)` allowing the database engine to perform rapid Index Range Scans in sub-5ms. For billions of records, introduce Declarative Table Partitioning.",
      code: "CREATE INDEX idx_trans_tenant_created ON \"Transaction\"(\"tenantId\", \"createdAt\" DESC);"
    },
    {
      lvl: "situation",
      q: "ব্যবহারকারী একটি কাস্টমার ডিলিট করার চেষ্টা করলে ডাটাবেজ ফরেন কি এরর দিচ্ছে: `update or delete on table violates foreign key constraint`। ডাটাবেজ আর্কিটেকচারে এটি কীভাবে হ্যান্ডেল করবে?",
      m: "কারণ ওই কাস্টমারের সাথে সংযুক্ত সেলস ইনভয়েস বা বাকি টাকার রেকর্ড অন্য টেবিলে রয়েছে। আর্থিক সিস্টেমে কখনোই আসল কাস্টমার ডিলিট করা উচিত নয় কারণ তাহলে পূর্বের সমস্ত অডিট ও ইনভয়েস ডাটাবেজে করাপ্ট হবে। সমাধান: (১) হার্ড ডিলিটের বদলে সফট ডিলিট (`isDeleted: true` বা `deletedAt = now()`) ব্যবহার করব। (২) এপিআইতে সুন্দর 400 এরর রেসপন্স দেব: 'এই কাস্টমারের পূর্ববর্তী বিক্রয় রেকর্ড থাকায় ডিলিট করা সম্ভব নয়; অ্যাকাউন্টটি ডিঅ্যাক্টিভেট করা হয়েছে'।",
      b: "আর্থিক সিস্টেমে কখনো কাস্টমার স্থায়ীভাবে ডিলিট করা যাবে না কারণ এতে অডিট রেকর্ড নষ্ট হয়। সফট ডিলিট ব্যবহার করে অ্যাকাউন্ট নিষ্ক্রিয় করতে হবে এবং ব্যবহারকারীকে স্পষ্ট কারণ বুঝিয়ে দিতে হবে।",
      e: "Foreign key constraints safeguard referential integrity by forbidding deletion of entities with active children. Enforce Soft Deletion (`deletedAt: Date`) on financial entities, returning human-friendly 400 explanations without breaking ledger histories.",
      code: "await prisma.customer.update({ where: { id }, data: { isArchived: true } });"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর দ্রুতগতির বিলিংয়ে ইনভয়েস ক্রিয়েশন, সেলস আইটেম ইনসার্ট, কাস্টমার বাকি লেজার এবং স্টক হ্রাস—এই ৪টি অপারেশন Prisma-তে কীভাবে একটি সিঙ্গেল ট্রানজাকশনে পরিচালনা করেছিলে?",
      m: "দোকানি ক্যাশ কাউন্টারে আমরা `prisma.$transaction(async (tx) => ...)` ব্যবহার করেছি। ট্রানজাকশনের ভেতরে: (১) ইনভয়েস মাস্টার তৈরি, (২) আইটেমগুলোর স্টক অ্যাটোমিকালি ডিক্রিমেন্ট করা (`stock: { decrement: qty }`), (৩) যদি বাকি থাকে তবে কাস্টমার ব্যালেন্স বৃদ্ধি করা (`dueBalance: { increment: due }`), (৪) আর্থিক লেজারে ডেবিট-ক্রেডিট এন্ট্রি লেখা। কোনো একটি পণ্যের স্টক খালি থাকলে ট্রানজাকশন সাথে সাথে এক্সেপশন ছুড়ে পুরো বিল রোলব্যাক করত—ফলে ১ পয়সারও হিসাব নষ্ট হয়নি।",
      b: "দোকানি বিক্রয় এন্ট্রিতে আমরা প্রিজমার ইন্টারেক্টিভ ট্রানজাকশন ব্যবহার করেছি। ইনভয়েস তৈরি, স্টক কমানো এবং বাকি হিসাব বৃদ্ধি একটিমাত্র অবিভাজ্য পদক্ষেপে সম্পন্ন হতো। কোনো সমস্যা হলে সম্পূর্ণ পরিবর্তন রোলব্যাক হয়ে যেত।",
      e: "Executed atomic POS checkouts in Dokani via Prisma interactive transactions: (1) creating the invoice master, (2) decrementing stock units atomically, (3) incrementing customer ledger receivables for dues, and (4) creating journal entries with guaranteed rollback on zero stock.",
      code: "await prisma.$transaction(async (tx) => {\n  const inv = await tx.invoice.create({ data: invoiceData });\n  for (const item of items) {\n    await tx.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.qty } } });\n  }\n  if (dueAmount > 0) await tx.customer.update({ where: { id: custId }, data: { due: { increment: dueAmount } } });\n});"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর মাল্টি-টেন্যান্ট ডেটাবেজ ডিজাইনে Single Database with Tenant ID Discriminator কেন বেছে নিয়েছিলে এবং কীভাবে পারফরম্যান্স নিশ্চিত করেছিলে?",
      m: "মাল্টি-টেন্যান্সিতে ৩টি অপশন থাকে: Database per tenant, Schema per tenant, এবং Shared DB with Tenant Discriminator। শত শত ছোট-মাঝারি দোকানের জন্য আলাদা ডাটাবেজ রাখা অবকাঠামোগতভাবে খুব ব্যয়বহুল ও মেইনটেইন্যান্স জটিল ছিল। আমরা Shared Database বেছে নিয়েছি: প্রতিটি টেবিলে `tenantId` ইনডেক্সড কলাম ছিল। সমস্ত কুয়েরি এবং কম্পোজিট ইনডেক্স `(tenantId, id)` ভিত্তিক হওয়ায় কুয়েরি পারফরম্যান্স ছিল সুপার ফাস্ট এবং অবকাঠামো খরচ ৯০% কম ছিল।",
      b: "শত শত দোকানের জন্য আলাদা ডাটাবেজ ব্যয়বহুল হওয়ায় আমরা শেয়ার্ড ডাটাবেজ উইথ টেন্যান্ট আইডি বেছে নিয়েছি। প্রতিটি টেবিলে টেন্যান্ট আইডি ও কম্পোজিট ইনডেক্স থাকায় নিরাপত্তা অক্ষুণ্ণ রেখে অবকাঠামোগত খরচ ৯০% কমানো সম্ভব হয়েছিল।",
      e: "Selected Shared Database with Tenant ID Discriminators for Dokani POS to eliminate the infrastructure overhead of managing thousands of distinct DB instances. Enforcing composite indices on `(tenantId, ...)` delivered enterprise sub-millisecond query performance.",
      tip: "মাল্টি-টেন্যান্ট SaaS আর্কিটেকচারে কস্ট এফিসিয়েন্সি ও ইনডেক্সিং স্ট্র্যাটেজি ব্যাখ্যা করা সিনিয়র টেক লিডের বৈশিষ্ট্য।"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে লাখ লাখ ছাত্রের কোর্স এনরোলমেন্ট ও পরীক্ষার ফলাফল কুয়েরি অপটিমাইজেশনে PostgreSQL Indexing কীভাবে ডিজাইন করেছিলে?",
      m: "আমরা ৩টি স্পেশাল ইনডেক্স ডিজাইন করেছি: (১) `B-Tree Composite Index`: `(courseId, studentId)` যাতে ডুপ্লিকেট এনরোলমেন্ট প্রতিরোধ হয় এবং নিমেষে স্টুডেন্ট স্ট্যাটাস খোঁজা যায়। (২) `Partial Index`: `CREATE INDEX idx_active_students ON \"Enrollment\"(studentId) WHERE status = 'ACTIVE'`—এটি শুধু সক্রিয় ছাত্রদের ইনডেক্স করে ইনডেক্স সাইজ ৭০% ছোট রাখে। (৩) `Covering Index (INCLUDE)`: ঘন ঘন এক্সাম রেজাল্ট দেখতে `INDEX (examId) INCLUDE (score, grade)` ব্যবহার করেছি যাতে আসল টেবিল না ছুঁয়ে ইনডেক্স থেকেই ফলাফল চলে আসে (Index-Only Scan)।",
      b: "পিটিটিএবিডিতে আমরা কম্পোজিট ইনডেক্স, পার্সিয়াল ইনডেক্স (শুধুমাত্র অ্যাক্টিভ ছাত্রদের জন্য) এবং কভারিং ইনডেক্স (INCLUDE) ব্যবহার করেছি। এর ফলে ডাটাবেজ টেবিল স্ক্যান না করে সরাসরি ইনডেক্স থেকেই সেকেন্ডের ভগ্নাংশে রেজাল্ট পাওয়া যেত।",
      e: "Architected high-throughput indexing for PTTABD: Composite B-Trees on `(courseId, studentId)`, Partial Indexes filtering strictly `status = 'ACTIVE'` to shrink index RAM footprint, and Covering Indexes (`INCLUDE score`) unlocking ultra-fast Index-Only Scans.",
      code: "CREATE INDEX idx_exam_covering ON \"ExamSubmission\"(\"examId\") INCLUDE (\"score\", \"passed\");"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ শত শত স্টোরের ব্যালেন্স শিট ও আর্থিক অডিট সামঞ্জস্য রক্ষায় Double-Entry Bookkeeping লেজার মডেল কীভাবে ডিজাইন করেছিলে?",
      m: "আর্থিক নির্ভুলতার জন্য আমরা সাধারণ প্লাস-মাইনাস ব্যালেন্স আপডেট পরিহার করে আন্তর্জাতিক 'Double-Entry Bookkeeping' নীতি মেনে চলেছি। প্রতিটি আর্থিক ইভেন্টে একটি `JournalEntry` তৈরি হতো যাতে ন্যূনতম ২টি `LedgerEntry` থাকত: ১টি ডেবিট এবং ১টি ক্রেডিট। যেমন ক্যাশ বিক্রি হলে: `Debit: Cash Account (+১০০০)` এবং `Credit: Sales Revenue (+১০০০)`। পুরো সিস্টেমে সবসময় `Total Debits === Total Credits` হতে হতো। ফলে ১ পয়সাও অমিল হওয়ার কোনো সুযোগ ছিল না।",
      b: "দোকানি অ্যাকাউন্টিংয়ে আমরা ডাবল-এন্ট্রি বুককিপিং মডেল তৈরি করেছি। প্রতিটি বিক্রয়ে সমপরিমাণ ডেবিট এবং ক্রেডিট এন্ট্রি সংরক্ষিত হতো। এর ফলে মোট ডেবিট এবং ক্রেডিট সর্বদা সমান থাকায় আর্থিক অডিটে কোনো অমিল হতে পারেনি।",
      e: "Modeled Dokani's financial core via Double-Entry Bookkeeping. Every transaction recorded atomic balanced Ledger entries (`Sum(Debits) === Sum(Credits)`). Debiting Cash and Crediting Sales Revenue mathematically eliminated ledger float errors.",
      tip: "ডাবল এন্ট্রি বুককিপিংয়ের ডেবিট-ক্রেডিট আর্কিটেকচার উল্লেখ করা যে কোনো ফিনটেক বা পিওএস ইন্টারভিউতে তোমাকে অন্যদের চেয়ে আলাদা করে দেবে।"
    },
    {
      lvl: "realworld",
      q: "ডাটাবেজ মাইগ্রেশন ও স্কিমা ডিজাইনে টিম স্ট্যান্ডার্ড ও কোয়ালিটি নিশ্চিত করতে তোমার মূল প্রিন্সিপালগুলো কী?",
      m: "আমার মূল নীতিগুলো: (১) প্রতিটি টেবিলে বাধ্যতামূলক `id (UUID)`, `createdAt`, `updatedAt`, এবং `tenantId` থাকা। (২) সমস্ত ফরেন কি এবং প্রায়শই ফিল্টার হওয়া ফিল্ডে বাধ্যতামূলক ইনডেক্স থাকা। (৩) প্রতিটি মাইগ্রেশন কোড রিভিউ এবং স্টেজিংয়ে টেস্ট করা ছাড়া প্রোডাকশনে না চালানো। (৪) জিরো-ডাউনটাইম নিশ্চিত করতে Expand & Contract নীতি মেনে চলা। (৫) সমস্ত গুরুত্বপূর্ণ ব্যবসায়িক নিয়মের জন্য ডাটাবেজ লেভেলে কনস্ট্রেইন্ট (Check, Unique) রাখা।",
      b: "আমার প্রধান নীতিসমূহ: বাধ্যতামূলক টাইমস্ট্যাম্প ও টেন্যান্ট আইডি, ফরেন কি তে ইনডেক্সিং, স্টেজিংয়ে মাইগ্রেশন যাচাই, ডাউনটাইম ছাড়া পরিবর্তন এবং ডাটাবেজ লেভেলে কনস্ট্রেইন্ট নিশ্চিত করা।",
      e: "My database design standards: (1) Mandatory UUID PKs, timestamps, and tenant discriminators, (2) Explicit indexes on all FKs and query filters, (3) Dry-run migration testing in staging pipelines, (4) Zero-downtime Expand-and-Contract rollouts, and (5) Strict database-level integrity constraints.",
      tip: "এই সংক্ষিপ্ত নীতিগুলো তোমার ডেটাবেজ ইঞ্জিনিয়ারিংয়ের শক্ত ভিত প্রকাশ করে।"
    }
  ]
};
