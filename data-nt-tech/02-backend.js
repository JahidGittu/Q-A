// NT Tech Innovation — 02. Backend Engineering Mastery
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.backend = {
  id: "backend",
  title: "Backend Engineering",
  badge: "Node.js · Express · REST API · Security",
  icon: "⚡",
  topics: [
    {
      id: "node-event-loop",
      name: "Node.js Core & Event Loop",
      desc: "V8 Engine, Event Loop Phases, Libuv Thread Pool, Worker Threads, Non-blocking I/O",
      items: [
        {
          lvl: "lvl1",
          q: "Node.js কীভাবে সিঙ্গেল-থ্রেডেড (Single-Threaded) হয়েও হাজার হাজার কনকারেন্ট রিকোয়েস্ট হ্যান্ডেল করে?",
          m: "Node.js-এর মেইন জাভাস্ক্রিপ্ট এক্সিকিউশন থ্রেড একটিই, কিন্তু এটি ব্যাকগ্রাউন্ডে C++ ভিত্তিক **Libuv** লাইব্রেরি ব্যবহার করে। যখন কোনো ফাইল রিড, নেটওয়ার্ক রিকোয়েস্ট বা ডাটাবেজ কুয়েরি আসে (Non-blocking I/O), Node.js ওএস-এর কার্নেল বা Libuv-এর নিজস্ব ৪টি ব্যাকগ্রাউন্ড থ্রেড পুলে কাজটি সঁপে দেয়। মূল থ্রেডটি অন্য রিকোয়েস্ট হ্যান্ডেল করতে থাকে। কাজ শেষ হলে ইভেন্ট লুপের মাধ্যমে কলব্যাক কিউতে এনে রেসপন্স রিটার্ন করে।",
          b: "নোডজেএস সিঙ্গেল থ্রেডে জাভাস্ক্রিপ্ট কোড চালালেও এটি নন-ব্লকিং আই/ও আর্কিটেকচার মেনে চলে। ডাটাবেজ কুয়েরি বা নেটওয়ার্ক রিকোয়েস্টের মতো দীর্ঘমেয়াদী কাজগুলোকে এটি ব্যাকগ্রাউন্ডে লিবইউভি (Libuv) থ্রেড পুলে পাঠিয়ে দেয় এবং মূল থ্রেড ফ্রি থেকে নতুন রিকোয়েস্ট গ্রহণ করে। কাজ শেষ হলে ইভেন্ট লুপ কলব্যাক এক্সিকিউট করে।",
          e: "Node.js runs JavaScript on a single thread, but leverages the C++ Libuv library for asynchronous, non-blocking I/O. Intensive system operations like database calls, file reading, and network requests are offloaded to OS kernel threads or Libuv's thread pool, allowing the main event loop to remain unblocked and process thousands of concurrent connections.",
          tip: "ইন্টারভিউতে 'Non-blocking I/O' এবং 'Libuv Thread Pool' উল্লেখ করা অপরিহার্য।"
        },
        {
          lvl: "lvl1",
          q: "Node.js-এ `process.nextTick()` এবং `setImmediate()`-এর মধ্যে পার্থক্য কী?",
          m: "`process.nextTick()` কোনো ইভেন্ট লুপের ফেজ নয়, এটি মাইক্রোটাস্ক কিউ-এর শীর্ষে থাকে। বর্তমান অপারেশন শেষ হওয়ার ঠিক সাথে সাথে এবং ইভেন্ট লুপের পরবর্তী ফেজে যাওয়ার আগেই `nextTick` কলব্যাক এক্সিকিউট হয়। অন্যদিকে `setImmediate()` ইভেন্ট লুপের 'Check Phase'-এ চলে, অর্থাৎ I/O পোলিং ফেজ শেষ হওয়ার পর চলে।",
          b: "process.nextTick() বর্তমান জাভাস্ক্রিপ্ট অপারেশন শেষ হওয়ার সাথে সাথেই এক্সিকিউট হয়, এমনকি ইভেন্ট লুপের অন্য কোনো ফেজে যাওয়ার আগেই। অপরদিকে setImmediate() ইভেন্ট লুপের চেক ফেজে কলব্যাক চালায়। তাই nextTick দ্রুততম প্রায়োরিটিতে চলে।",
          e: "process.nextTick() executes immediately after the current operation completes, before the event loop advances to its next phase (running in the microtask queue). setImmediate(), on the other hand, is queued in the Check Phase of the event loop and executes after the poll phase finishes.",
          code: "process.nextTick(() => console.log('1. nextTick (Highest Priority)'));\nsetImmediate(() => console.log('2. setImmediate (Check phase)'));"
        },
        {
          lvl: "lvl2",
          q: "Node.js-এ ইভেন্ট লুপের বিভিন্ন ফেজগুলো (Event Loop Phases) কী কী এবং এরা কোন ক্রমে চলে?",
          m: "ইভেন্ট লুপ মূলত ৬টি ফেজে চক্রাকারে ঘোরে: (১) **Timers:** `setTimeout` ও `setInterval`-এর কলব্যাক চলে। (২) **Pending Callbacks:** ওএস লেভেলের নির্দিষ্ট কিছু I/O কলব্যাক। (৩) **Idle, Prepare:** শুধু ইন্টারনাল কাজে ব্যবহৃত। (৪) **Poll:** নতুন I/O ইভেন্ট রিট্রিভ করে এবং I/O কলব্যাক এক্সিকিউট করে। (৫) **Check:** `setImmediate()` কলব্যাক চলে। (৬) **Close Callbacks:** সকেট বা হ্যান্ডেল ক্লোজ (`socket.on('close')`) চলে। প্রতিটি ফেজের ফাঁকে মাইক্রোটাস্ক (Promise, nextTick) এক্সিকিউট হয়।",
          b: "নোডজেএস ইভেন্ট লুপের প্রধান ফেজগুলো হলো: টাইমার্স (setTimeout), পেন্ডিং কলব্যাকস, পোল (নতুন আই/ও রিসিভ ও রান), চেক (setImmediate) এবং ক্লোজ কলব্যাকস। প্রতিটি ফেজের ট্রানজিশনের সময় প্রমিজ ও নেক্সট-টিক মাইক্রোটাস্কগুলো优先 ভিত্তিতে এক্সিকিউট হয়।",
          e: "The Node.js event loop executes through distinct phases in order: Timers (setTimeout/setInterval) -> Pending Callbacks -> Idle/Prepare -> Poll (I/O execution) -> Check (setImmediate) -> Close Callbacks (socket closures). Microtasks (Promise resolutions and process.nextTick) are executed between these phase transitions.",
          tip: "এই ফেজগুলোর সিকোয়েন্স বলতে পারা একজন মিড/সিনিয়র ব্যাকএন্ড ইঞ্জিনিয়ারের শক্ত সিগন্যাল।"
        },
        {
          lvl: "lvl3",
          q: "Node.js-এ CPU-Intensive টাস্ক (যেমন: হেভি ইমেজ প্রসেসিং বা বড় পিডিএফ জেনারেশন) কীভাবে হ্যান্ডেল করবে যাতে ইভেন্ট লুপ ব্লক না হয়?",
          m: "যেহেতু Node.js সিঙ্গেল থ্রেডে চলে, তাই কোনো হেভি ক্রিপ্টোগ্রাফি, ইমেজ রিসাইজিং বা ১০,০০০ রো-এর পিডিএফ জেনারেট করলে মূল থ্রেড ফ্রিজ হয়ে যায় এবং অন্যান্য ইউজারের এপিআই রিকোয়েস্ট আটকে যায়। সমাধান: (১) **Worker Threads (`worker_threads`):** আলাদা ওএস থ্রেড তৈরি করে ব্যাকগ্রাউন্ডে সিপিইউ টাস্ক চালানো। (২) **Background Task Queue:** Redis + BullMQ ব্যবহার করে আলাদা প্রসেস বা সার্ভারে জব পাঠিয়ে দেওয়া। (৩) Node.js-এর বিল্ট-ইন `cluster` মডিউল ব্যবহার করে মাল্টিপল সিপিইউ কোর কাজে লাগানো।",
          b: "সিপিইউ হেভি কাজের জন্য নোডজেএস-এর মূল থ্রেড ব্যবহার করলে পুরো সার্ভার ব্লক হয়ে যায়। এর সমাধান হিসেবে Worker Threads মডিউল ব্যবহার করে আলাদা ব্যাকগ্রাউন্ড থ্রেডে কাজ চালানো হয়, অথবা BullMQ/Redis দিয়ে ব্যাকগ্রাউন্ড ওয়ার্কারে জব পুশ করা হয়। ক্লাস্টার মোড দিয়ে সার্ভারের সব প্রসেসর কোর কাজে লাগানো যায়।",
          e: "CPU-intensive operations block the single-threaded event loop. To resolve this, I either offload the computation to a Worker Thread (using the worker_threads module), scale multi-core CPU utilization using Node's cluster mode (or PM2 cluster mode), or delegate the tasks to asynchronous Redis-backed background worker queues like BullMQ.",
          code: "import { Worker } from 'worker_threads';\nconst worker = new Worker('./pdfWorker.js', { workerData: { invoiceId } });\nworker.on('message', (pdfBuffer) => sendEmail(pdfBuffer));"
        },
        {
          lvl: "situation",
          q: "তোমার প্রোডাকশন Node.js সার্ভারের মেমোরি প্রতি ঘণ্টায় বাড়তে বাড়তে একপর্যায়ে সার্ভার Out-Of-Memory (OOM) হয়ে ক্র্যাশ করছে। তুমি এই Memory Leak কীভাবে ডিবাগ ও ফিক্স করবে?",
          m: "ডিবাগিং স্টেপস: (১) **Heap Snapshot:** ক্র্যাশ হওয়ার আগে `v8.writeHeapSnapshot()` অথবা Chrome DevTools রিমোট ইন্সপেকশন দিয়ে মেমোরি স্ন্যাপশট নেব। (২) স্ন্যাপশট তুলনা করে দেখব কোন অবজেক্ট রিটেইন হচ্ছে। সাধারণ কারণগুলো হলো: কোনো গ্লোবাল অ্যারে বা অবজেক্টে ডাটা পুশ হচ্ছে যা কখনো ডিলিট হচ্ছে না, `EventEmitter` বা সকেটে লিসেনার অ্যাড হচ্ছে কিন্তু `removeListener` করা হচ্ছে না, অথবা ক্যাশিং ডাটা আনলিমিটেড বাড়ছে। (৩) ফিক্স: গ্লোবাল ভেরিয়েবলের ওপর ডিপেনডেন্সি বন্ধ করা, Redis-এ টাইম-টু-লাইভ (TTL) দিয়ে ক্যাশ রাখা এবং PM2-তে সেফটি গার্ড হিসেবে `--max-memory-restart 500M` দিয়ে রাখা।",
          b: "মেমোরি লিক খোঁজার জন্য আমরা নোডজেএসে হিপ স্ন্যাপশট সংগ্রহ করে ক্রোম ডেভটুলসে বিশ্লেষণ করি। সবচেয়ে কমন কারণ হলো আনবাউন্ডেড গ্লোবাল ক্যাশ বা আনক্লিনড ইভেন্ট লিসেনার। এগুলো সমাধান করে লোকাল স্কোপ ব্যবহার করি এবং পিএম২-তে মেমোরি রিস্টার্ট গার্ড যুক্ত করি।",
          e: "To debug memory leaks, I capture Node.js heap snapshots via Chrome DevTools or the v8 module to identify retained detached objects. Common culprits include unbounded global arrays, un-removed event listeners/socket streams, or unexpiring in-memory caches. I resolve this by enforcing scoped closures, implementing LRU caches with strict TTLs, and setting PM2's --max-memory-restart flag as a production fail-safe.",
          code: "node --inspect app.js\n// In PM2: pm2 start app.js --max-memory-restart 500M"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এর ব্যাকএন্ডে হাজার হাজার দৈনিক ইনভয়েস ও সেলস রিকোয়েস্টে তুমি কীভাবে ইভেন্ট লুপ নন-ব্লকিং রেখেছিলে?",
          m: "Dokani-তে প্রতিদিন বিপুল পরিমাণ সেলস এবং সাথে সাথে এসএমএস অ্যালার্ট ও প্রিন্টার পে-লোড হ্যান্ডেল করতে হয়। আমি: (১) সেলস ক্যালকুলেশন ও স্টক ডিক্রিমেন্ট দ্রুততম সময়ে ডাটাবেজে শেষ করে সাথে সাথে ক্লায়েন্টকে রেসপন্স ২০1 পাঠিয়ে দিতাম। (২) কাস্টমারের ফোনে এসএমএস পাঠানো এবং টেলিগ্রাম নোটিফিকেশনকে কখনোই এপিআই রিকোয়েস্টের ভেতর `await` করতাম না—এগুলোকে `setImmediate()` বা ব্যাকগ্রাউন্ড অ্যাসিনক্রোনাস প্রমিজে হ্যান্ডেল করতাম যাতে কাস্টমার কাউন্টারে ১ মিলিসেকেন্ডও দেরি না হয়। (৩) লিনাক্স সার্ভারে PM2 Cluster Mode দিয়ে সব সিপিইউ কোর কাজে লাগিয়েছিলাম।",
          b: "দোকানি সিস্টেমে আমরা মূল সেলস এপিআই রেসপন্স দ্রুত সম্পন্ন করতে সেকেন্ডারি কাজগুলোকে মূল রিকোয়েস্ট থেকে আলাদা করেছি। যেমন ইনভয়েস এসএমএস পাঠানো বা কোম্পানি নোটিফিকেশন মূল এপিআইতে অপেক্ষা না করিয়ে ব্যাকগ্রাউন্ড প্রমিজে দিয়ে দেওয়া হতো। পিএম২ ক্লাস্টার মোডের মাধ্যমে সার্ভারের সবগুলো সিপিইউ কোরকে ব্যবহার করে ট্রাফিক ডিস্ট্রিবিউট করা হয়েছিল।",
          e: "In Dokani POS, ensuring sub-100ms checkout times required decoupling tertiary operations from the HTTP response pipeline. After completing the sale inside an atomic DB transaction, the 201 response was returned immediately. Heavy tasks like sending SMS gateways or audit logging were offloaded asynchronously without awaiting them on the main response path, running in PM2 cluster mode across available CPU cores.",
          tip: "এই আর্কিটেকচারাল ডিসিশন ব্যাখ্যা করলে ইন্টারভিউয়ার বুঝবে যে তুমি হাই-থ্রুপুট সিস্টেম তৈরি করতে পারো।"
        }
      ]
    },
    {
      id: "express-architecture",
      name: "Express.js Layered Architecture",
      desc: "Routes, Controllers, Services, Repositories, Custom Middleware, Global Error Handlers",
      items: [
        {
          lvl: "lvl1",
          q: "Express.js-এ Middleware কী এবং `next()` ফাংশনের কাজ কী?",
          m: "Middleware হলো এমন একটি ফাংশন যা ক্লায়েন্টের ইনকামিং HTTP রিকোয়েস্ট এবং ফাইনাল কন্ট্রোলার রেসপন্সের মাঝখানে কাজ করে। এটি `(req, res, next)` প্যারামিটার পায়। মিডলওয়্যার রিকোয়েস্ট ডাটা রিড বা মডিফাই করতে পারে (যেমন টোকেন ভেরিফাই করে `req.user` সেট করা), রিকোয়েস্ট ব্লক করতে পারে (যেমন আন-অথরাইজড হলে ৪০১ রিটার্ন করা), অথবা `next()` কল করে পরবর্তী মিডলওয়্যার বা কন্ট্রোলারের কাছে কন্ট্রোল পাস করতে পারে।",
          b: "মিডলওয়্যার হলো রিকোয়েস্ট ও রেসপন্সের মধ্যবর্তী একটি লজিক্যাল স্তর। এটি ইনকামিং রিকোয়েস্টের তথ্য যাচাই করে, ইউজার অথেন্টিকেশন নিশ্চিত করে এবং কোনো সমস্যা থাকলে সাথে সাথে আটকে দেয়। সব ঠিক থাকলে next() ফাংশন ডেকে পরবর্তী মিডলওয়্যার বা কন্ট্রোলারে রিকোয়েস্ট পাঠিয়ে দেয়।",
          e: "Middleware functions execute during the lifecycle of an HTTP request between the client call and the route handler, accepting (req, res, next). They inspect or mutate headers/payloads, enforce authentication, and either terminate the cycle with an HTTP error or pass control down the pipeline by invoking next().",
          code: "const authGuard = (req, res, next) => {\n  if (!req.headers.authorization) return res.status(401).json({ error: 'Unauthorized' });\n  next();\n};"
        },
        {
          lvl: "lvl2",
          q: "একটি এন্টারপ্রাইজ Express.js অ্যাপ্লিকেশনে Controller, Service এবং Repository প্যাটার্ন কেন অনুসরণ করা উচিত?",
          m: "কোড মেইনটেইনেবল ও টেস্টেবল রাখার জন্য দায়িত্ব আলাদা (Separation of Concerns) করা জরুরি: (১) **Controller:** শুধু HTTP প্রোটোকল সামলায়—ইনপুট গ্রহণ, রিকোয়েস্ট ভ্যালিডেশন এবং স্ট্যাটাস কোড সহ রেসপন্স পাঠানো। (২) **Service:** পিওর বিজনেস লজিক হ্যান্ডেল করে—যেমন ডিসকাউন্ট হিসাব করা, স্টক পর্যাপ্ত আছে কিনা যাচাই করা, পেমেন্ট অ্যালার্ট পাঠানো। (৩) **Repository:** সরাসরি ডাটাবেজ অপারেশন চালায় (Prisma বা Mongoose কুয়েরি)। ফলে ডাটাবেজ বা ফ্রেমওয়ার্ক বদলালেও বিজনেস লজিক অপরিবর্তিত থাকে এবং সহজে ইউনিট টেস্ট লেখা যায়।",
          b: "লেয়ার্ড আর্কিটেকচারে কোডের দায়িত্ব ভাগ করা থাকে। কন্ট্রোলার শুধু এইচটিটিপি রিকোয়েস্ট রিসিভ ও রেসপন্স দেয়। সার্ভিস সমস্ত ব্যবসায়িক হিসাব ও লজিক এক্সিকিউট করে। রিপোজিটরি ডাটাবেজের কুয়েরি পরিচালনা করে। এতে কোড অনেক গোছানো হয় এবং সহজে মেইনটেইন ও টেস্ট করা যায়।",
          e: "The Controller-Service-Repository pattern enforces strict Separation of Concerns. Controllers handle HTTP parsing and status dispatching; Services orchestrate pure business logic and validations; Repositories encapsulate database queries. This keeps code decoupled, making business logic testable in isolation without mocking HTTP transports.",
          tip: "PTTABD ও Dokani-তে তুমি এই প্যাটার্ন নিজে ব্যবহার করেছ—এটা ইন্টারভিউতে গর্বের সাথে উল্লেখ করো।"
        },
        {
          lvl: "lvl3",
          q: "Express.js-এ গ্লোবাল সেন্ট্রালাইজড এরর হ্যান্ডলার (Global Error Handler) কীভাবে ডিজাইন করবে এবং কেন কখনোই ট্রাই-ক্যাচ ছাড়া এরর ফেলে রাখা উচিত নয়?",
          m: "Express-এ আনহ্যান্ডেলড এরর থাকলে পুরো Node.js প্রসেস ক্র্যাশ করতে পারে। স্ট্যান্ডার্ড সমাধান: (১) একটি কাস্টম `AppError extends Error` ক্লাস তৈরি করব যেখানে `statusCode`, `isOperational` ফ্ল্যাগ থাকবে। (২) কন্ট্রোলারে ট্রাই-ক্যাচ রিপিট না করে `asyncHandler(fn)` র‍্যাপার ব্যবহার করব যা কোনো এরর ঘটলেই স্বয়ংক্রিয়ভাবে `next(error)`-এ পাস করে। (৩) অ্যাপের সবার শেষে ৪-আর্গুমেন্টের গ্লোবাল মিডলওয়্যার `(err, req, res, next)` রাখব যা এরর টাইপ অনুযায়ী সুন্দর ফরমেটে রেসপন্স পাঠাবে এবং প্রোডাকশনে কখনোই ইন্টারনাল স্ট্যাক ট্রেস ইউজারের কাছে প্রকাশ করবে না।",
          b: "সেন্ট্রালাইজড এরর হ্যান্ডলিংয়ের জন্য ৪টি আর্গুমেন্ট বিশিষ্ট মিডলওয়্যার তৈরি করা হয়। কাস্টম এরর ক্লাস দিয়ে স্ট্যাটাস কোড ও মেসেজ নির্ধারণ করা হয় এবং asyncHandler দিয়ে কন্ট্রোলারের এররগুলো স্বয়ংক্রিয়ভাবে গ্লোবাল হ্যান্ডলারে পাঠানো হয়। প্রোডাকশনে ক্লায়েন্টকে শুধু সেফ এরর মেসেজ দেওয়া হয় এবং সার্ভার লগে পূর্ণাঙ্গ এরর লগ রাখা হয়।",
          e: "I design global error handling using a custom AppError class supporting operational error metadata, wrapped with an asyncRouteHandler to forward rejected promises directly to next(err). At the root of Express, a 4-argument middleware (err, req, res, next) intercepts all exceptions, sanitizes sensitive stack traces in production, and formats standardized JSON error responses.",
          code: "class AppError extends Error {\n  constructor(public message: string, public statusCode: number) {\n    super(message);\n  }\n}\n// Global Handler\napp.use((err, req, res, next) => {\n  res.status(err.statusCode || 500).json({ status: 'error', message: err.message });\n});"
        },
        {
          lvl: "situation",
          q: "তোমার এপিআই-তে ইউজারের পাঠানো রিকোয়েস্ট বডিতে ক্ষতিকারক স্ক্রিপ্ট বা অতিরিক্ত অজানা ফিল্ড আসছে যা ডাটাবেস সিকিউরিটিকে হুমকির মুখে ফেলছে। তুমি রিকোয়েস্ট ভ্যালিডেশন কীভাবে নিশ্চিত করবে?",
          m: "আমি **Zod** ভ্যালিডেশন মিডলওয়্যার ব্যবহার করব। (১) প্রতিটি এন্ডপয়েন্টের জন্য কঠোর স্কিমা লিখব (যেমন: `createProductSchema`)। (২) একটি জেনেরিক মিডলওয়্যার তৈরি করব `validateRequest(schema)` যা কন্ট্রোলারে যাওয়ার আগেই `req.body` ভ্যালিডেট করবে। (৩) Zod-এর ডিফল্ট বিহেভিয়ার হলো অজানা কোনো ফিল্ড পাঠালে তা স্বয়ংক্রিয়ভাবে স্ট্রিপ (Strip) বা বাদ দিয়ে দেয়। যদি কোনো ফিল্ডে স্ক্রিপ্ট বা ভুল টাইপ থাকে, কন্ট্রোলারে যাওয়ার আগেই ৪০০ ব্যাড রিকোয়েস্ট এরর দিয়ে বাতিল করে দেবে।",
          b: "রিকোয়েস্ট ডাটা সুরক্ষিত করতে আমরা Zod স্কিমা মিডলওয়্যার ব্যবহার করি। কন্ট্রোলারে ডাটা পৌঁছানোর আগেই স্কিমা দিয়ে বডি টেস্ট করা হয়। কোনো অতিরিক্ত ফিল্ড থাকলে তা নিজে থেকেই বাদ পড়ে যায় এবং ভুল ডাটা টাইপ থাকলে সাথে সাথে সঠিক এরর মেসেজ সহ বাতিল করে দেওয়া হয়।",
          e: "I intercept incoming payloads using a reusable Zod validation middleware. The middleware executes schema.parse(req.body) prior to hitting the controller. Zod automatically strips unexpected extra fields, enforces exact data types, and rejects malicious payloads with structured 400 Bad Request responses.",
          code: "export const validate = (schema: z.ZodSchema) => (req, res, next) => {\n  const parsed = schema.safeParse(req.body);\n  if (!parsed.success) return res.status(400).json({ errors: parsed.error.issues });\n  req.body = parsed.data; // clean validated data\n  next();\n};"
        },
        {
          lvl: "realworld",
          q: "PTTABD LMS এবং Dokani প্রজেক্টে Express v5-এ তুমি কীভাবে লেয়ার্ড আর্কিটেকচার এবং কাস্টম রোল-বেসড মিডলওয়্যার সাজিয়েছিলে?",
          m: "PTTABD ও Dokani-তে আমরা সুশৃঙ্খল লেয়ার্ড প্যাটার্ন ব্যবহার করেছি: (১) `routes/` শুধুমাত্র রুট ডিফাইন করে এবং অথ মিডলওয়্যার ও ভ্যালিডেশন বসায়। (২) `controllers/` ইনপুট নিয়ে `services/`-কে কল করে। (৩) `services/` সমস্ত বিজনেস রুলস (যেমন কিস্তির টাকা পেইড না থাকলে কোর্স ভিডিও ব্লক করা) এক্সিকিউট করে। (৪) সিকিউরিটির জন্য `requireRole('ADMIN', 'INSTRUCTOR')` মিডলওয়্যার বানিয়েছিলাম যা JWT থেকে ইউজারের রোল মিলিয়ে দেখত। পারমিশন না থাকলে তাৎক্ষণিক ৪03 Forbidden রেসপন্স দিত।",
          b: "দোকানি এবং পিটিটিএবিডি ব্যাকএন্ডে আমরা এক্সপ্রেস রুটের সাথে লেয়ার্ড সার্ভিস আর্কিটেকচার যুক্ত করেছি। রুট লেভেলে অথেনটিকেশন ও রোল চেকিং মিডলওয়্যার থাকত। কন্ট্রোলার শুধু ডাটা ইনপুট নিয়ে সার্ভিস ফাংশনে পাঠাত এবং সার্ভিস ডাটাবেস হ্যান্ডেল করত। কোনো ইউজারের নির্দিষ্ট রোল না থাকলে ৪০৩ এরর দিয়ে রিকোয়েস্ট বাতিল করা হতো।",
          e: "In PTTABD LMS and Dokani POS, I implemented a strict 4-layer architecture: Routes -> Controllers -> Services -> Repositories. Routes applied auth middlewares and Zod validators; Controllers delegated business workflows to Services. Role guards like requireRole('ADMIN', 'CASHIER') inspected decoded JWT roles, immediately halting unauthorized requests with 403 Forbidden.",
          tip: "বাস্তব রোল চেকিং ও ৪-লেয়ার আর্কিটেকচারের এই উদাহরণ তোমার কোড অর্গানাইজেশন দক্ষতার প্রমাণ।"
        }
      ]
    },
    {
      id: "auth-security",
      name: "Authentication, JWT & API Security",
      desc: "JWT, Refresh Token Rotation, httpOnly Cookies, RBAC, Rate Limiting, Helmet, CORS, Data Sanitization",
      items: [
        {
          lvl: "lvl1",
          q: "JWT (JSON Web Token)-এর ৩টি অংশ কী কী এবং এটি কীভাবে কাজ করে?",
          m: "JWT-র ৩টি অংশ ডট দিয়ে যুক্ত থাকে: `Header.Payload.Signature`। (১) **Header:** টোকেনের টাইপ (JWT) এবং সাইনিং অ্যালগরিদম (যেমন HS256) রাখে। (২) **Payload:** ইউজারের ক্লেইম বা ডাটা (যেমন `userId`, `role`, `shopId`, `exp`) রাখে। (৩) **Signature:** সার্ভারের গোপন Secret Key দিয়ে হেডার ও পেলোড হ্যাশ করে তৈরি করা হয়। সিগনেচার থাকায় ক্লায়েন্ট পেলোডের ডাটা বদলাতে পারে না—বদলানোর চেষ্টা করলেই সার্ভার সিগনেচার মিসম্যাচে টোকেন বাতিল করে দেয়।",
          b: "জেডব্লিউটি তিনটি অংশের সমন্বয়ে গঠিত: হেডার, পেলোড এবং সিগনেচার। হেডারে অ্যালগরিদম থাকে, পেলোডে ইউজারের তথ্য থাকে এবং সিগনেচারে সার্ভারের সিক্রেট কি দিয়ে ভ্যালিডেশন কোড তৈরি করা থাকে। সিগনেচার নিশ্চিত করে যে টোকেনটি সার্ভার থেকে ইস্যু হওয়ার পর কেউ এতে কোনো পরিবর্তন করেনি।",
          e: "A JWT comprises three base64-encoded segments: Header.Payload.Signature. The Header specifies the signing algorithm; the Payload contains user claims (userId, role, expiration); the Signature is generated by hashing the header and payload with a server-side secret key to prevent client-side payload tampering.",
          code: "const token = jwt.sign({ userId, shopId, role }, process.env.JWT_SECRET, { expiresIn: '15m' });"
        },
        {
          lvl: "lvl2",
          q: "JWT টোকেন ব্রাউজারের `localStorage`-এ রাখা কেন অনিরাপদ এবং `httpOnly` কুকি কেন সেরা সমাধান?",
          m: "`localStorage`-এ টোকেন রাখলে যেকোনো Cross-Site Scripting (XSS) অ্যাটাকের মাধ্যমে হ্যাকার জাভাস্ক্রিপ্ট রান করিয়ে `localStorage.getItem('token')` দিয়ে টোকেন চুরি করে নিতে পারে। কিন্তু টোকেন যদি `httpOnly`, `Secure`, `SameSite=Strict` ফ্ল্যাগযুক্ত কুকিতে রাখা হয়, তবে ব্রাউজারের কোনো জাভাস্ক্রিপ্ট কোডই সেই কুকি রিড করতে পারে না। ফলে সাইটে কোনো এক্সএসএস ভালনারেবিলিটি থাকলেও হ্যাকার টোকেন চুরি করতে পারে না।",
          b: "লোকাল স্টোরেজে টোকেন রাখলে কোনো ক্ষতিকারক স্ক্রিপ্ট বা এক্সএসএস আক্রমণের মাধ্যমে জাভাস্ক্রিপ্ট দিয়ে তা চুরি করা সম্ভব। কিন্তু httpOnly কুকি ব্রাউজারের জাভাস্ক্রিপ্ট দিয়ে এক্সেস করা যায় না, এটি ব্রাউজার নিজে থেকেই স্বয়ংক্রিয়ভাবে প্রতি রিকোয়েস্টে পাঠায়। তাই এটি অনেক বেশি নিরাপদ।",
          e: "Storing tokens in localStorage exposes them to theft via Cross-Site Scripting (XSS) since any injected script can read localStorage. Setting tokens inside 'httpOnly', 'Secure', and 'SameSite=Strict' cookies prevents JavaScript access entirely, neutralizing token exfiltration even in the event of an XSS flaw.",
          code: "res.cookie('refreshToken', token, {\n  httpOnly: true,\n  secure: process.env.NODE_ENV === 'production',\n  sameSite: 'strict',\n  maxAge: 7 * 24 * 60 * 60 * 1000\n});"
        },
        {
          lvl: "lvl3",
          q: "Refresh Token Rotation (RTR) মেকানিজম কীভাবে কাজ করে এবং টোকেন চুরির অটো-ডিটেকশন কীভাবে নিশ্চিত করবে?",
          m: "রুল: অ্যাক্সেস টোকেনের মেয়াদ থাকবে খুব কম (১০–১৫ মিনিট), আর রিফ্রেশ টোকেন থাকবে ৭ দিন। প্রতিবার যখন রিফ্রেশ টোকেন দিয়ে নতুন অ্যাক্সেস টোকেন চাওয়া হয়, তখন পুরাতন রিফ্রেশ টোকেনটিকে ডাটাবেসে ইনভ্যালিডেট করে সাথে সাথে একটি **নতুন রিফ্রেশ টোকেন** ইস্যু করা হয় (Rotation)। অটো-ডিটেকশন: প্রতিটি রিফ্রেশ টোকেনের ফ্যামিলি আইডি ডাটাবেসে সেভ থাকে। যদি হ্যাকার কোনো পুরনো (ইতোমধ্যে ব্যবহৃত) রিফ্রেশ টোকেন ব্যবহারের চেষ্টা করে, সার্ভার বুঝতে পারে যে টোকেন চুরি হয়েছে—সাথে সাথে ওই ইউজারের সমস্ত সেশন ও সমস্ত রিফ্রেশ টোকেন বাতিল করে ফোর্সড লগআউট করিয়ে দেয়।",
          b: "রিফ্রেশ টোকেন রোটেশনে প্রতিবার নতুন এক্সেস টোকেন নেওয়ার সাথে সাথে পুরাতন রিফ্রেশ টোকেন বাতিল হয়ে একটি নতুন রিফ্রেশ টোকেন তৈরি হয়। যদি হ্যাকার কোনো চুরি করা পুরনো টোকেন ব্যবহার করার চেষ্টা করে, সার্ভার সাথে সাথে ওই ইউজারের সমস্ত অ্যাক্টিভ সেশন বন্ধ করে দেয় এবং পুনরায় পাসওয়ার্ড দিয়ে লগইন করতে বাধ্য করে।",
          e: "Refresh Token Rotation issues a brand-new refresh token every time the client requests a refreshed access token, invalidating the previous one. If a previously-used refresh token is presented (token replay), the authentication server detects a compromised session and immediately revokes all refresh tokens across that user's entire session family.",
          tip: "Dokani-তে এই হুবহু অ্যালগরিদম ইমপ্লিমেন্ট করা আছে—এটা ইন্টারভিউয়ারকে বিস্তারিত বলবে।"
        },
        {
          lvl: "situation",
          q: "তোমার এক্সপ্রেস এপিআই-তে হঠাৎ করে বট বা ম্যালিশিয়াস আইপি থেকে প্রতি সেকেন্ডে শত শত লগইন বা ওটিপি রিকোয়েস্ট পাঠিয়ে সার্ভার ব্রুট-ফোর্স করা হচ্ছে। তুমি কীভাবে এটা প্রতিহত করবে?",
          m: "আমি ৪ স্তরের ডিফেন্স মেকানিজম দেব: (১) **IP-based Rate Limiter:** `express-rate-limit` এবং `rate-limit-redis` ব্যবহার করে লগইন ও ওটিপি রুটে লিমিট বসাব (যেমন: প্রতি ১৫ মিনিটে সর্বোচ্চ ৫টি ব্যর্থ প্রচেষ্টা)। (২) **Account Lockout:** একই অ্যাকাউন্টে ৫ বার ভুল পাসওয়ার্ড দিলে অ্যাকাউন্ট সাময়িকভাবে ১৫ মিনিটের জন্য লক করে দেব। (৩) **Fail2ban / Nginx Limiting:** রিভার্স প্রক্সিতে Nginx লেভেলে `limit_req_zone` বসাব যাতে নোডজেএস সার্ভারে রিকোয়েস্ট পৌঁছানোর আগেই ড্রপ হয়ে যায়। (৪) সন্দেহজনক আচরণে ক্লাউডফ্লেয়ার ক্যাপচা (Cloudflare Turnstile) ভেরিফিকেশন চ্যালেঞ্জ দেব।",
          b: "ব্রুট ফোর্স ঠেকাতে আমরা এক্সপ্রেস-রেট-লিমিট ও রেডিস ব্যবহার করে নির্দিষ্ট আইপির জন্য রিকোয়েস্ট সংখ্যা সীমিত করি। এনজিন্স লেভেলে রিকোয়েস্ট ফিল্টারিং করা হয় এবং একই সাথে ৫ বার ভুল ক্রেডেনশিয়াল দিলে অ্যাকাউন্ট সাময়িক লক করা হয়। এছাড়া ক্লাউডফ্লেয়ার টার্নস্টাইল চ্যালেঞ্জ দেওয়া যায়।",
          e: "I mitigate brute-force attacks by implementing distributed rate-limiting via express-rate-limit backed by Redis, throttling auth endpoints to 5 requests per 15 minutes. Additionally, I configure Nginx limit_req rules to drop malicious traffic at the edge, apply temporary account lockouts after consecutive failures, and enforce Cloudflare Turnstile challenges.",
          code: "const loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 5,\n  message: 'Too many login attempts. Try again after 15 minutes.'\n});\napp.use('/api/auth/login', loginLimiter);"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এ মাল্টি-টেন্যান্ট শপ ডেটা আইসোলেশন ও আইডিঅর (IDOR) অ্যাটাক ঠেকাতে তুমি কীভাবে সিকিউর JWT ও RBAC গার্ড তৈরি করেছিলে?",
          m: "Dokani একটি মাল্টি-টেন্যান্ট সিস্টেম যেখানে একাধিক দোকানদার থাকে। সবথেকে বড় ঝুঁকি ছিল IDOR (Insecure Direct Object Reference)—যেমন দোকানদার 'A' যদি ইউআরএলে `/api/sales?shopId=SHOP_B` পাঠিয়ে অন্য দোকানের সেলস দেখতে চায়। সমাধান: আমি কখনোই ক্লায়েন্টের পাঠানো `req.body.shopId` বা কুয়েরি প্যারামিটারের ওপর বিশ্বাস করিনি। অথ মিডলওয়্যার ভ্যালিড JWT ডিকোড করে `req.user.shopId` ইনজেক্ট করত। কন্ট্রোলার ও সার্ভিস ডাটাবেসের প্রতিটি কুয়েরিতে বাধ্যতামূলকভাবে `where: { shopId: req.user.shopId }` ফিল্টার করত। ফলে এক দোকানদার কখনোই অন্য দোকানদারের ডাটা অ্যাক্সেস করতে পারত না।",
          b: "দোকানি সিস্টেমে আমরা কোনোভাবেই ক্লায়েন্টের পাঠানো শপ আইডি বিশ্বাস করিনি। জেডব্লিউটি টোকেন ভেরিফাই করে স্বয়ংক্রিয়ভাবে ইউজারের শপ আইডি বের করা হতো এবং সমস্ত ডাটাবেজ কুয়েরিতে সেই শপ আইডি ফিল্টার হিসেবে বাধ্যতামূলক রাখা হতো। ফলে কেউ রিকোয়েস্ট ম্যানিপুলেট করলেও অন্য দোকানের কোনো তথ্য এক্সেস করা অসম্ভব ছিল।",
          e: "In Dokani POS, I eliminated IDOR vulnerabilities by strictly decoupling tenant IDs from client parameters. The authentication middleware extracts and verifies the verified shopId directly from the signed JWT payload into req.user.shopId. Every subsequent Prisma query enforces where: { id, shopId: req.user.shopId }, preventing cross-tenant data leakage.",
          tip: "এই উত্তরটি শুনলে ইন্টারভিউ বোর্ড নিশ্চিত হবে যে তুমি রিয়েল মাল্টি-টেন্যান্ট ব্যাকএন্ড আর্কিটেক্ট।"
        }
      ]
    },
    {
      id: "payment-transactions",
      name: "Payment Gateways & Transactions",
      desc: "bKash, Nagad, AmarPay, Webhook Signatures, HMAC Verification, Idempotency, Reconciliation Crons",
      items: [
        {
          lvl: "lvl1",
          q: "পেমেন্ট গেটওয়ে ইন্টিগ্রেশনে Webhook কী এবং এটি কেন সাধারণ পোলিংয়ের চেয়ে ভালো?",
          m: "Webhook হলো একটি ইভেন্ট-ড্রিভেন রিভার্স এপিআই (Reverse API)। কাস্টমার যখন বিকাশ বা নগদের গেটওয়েতে টাকা পেমেন্ট করে, তখন আমাদের সার্ভারকে বারবার 'টাকা কি এসেছে?' বলে পোলিং করতে হয় না। পেমেন্ট সফল হওয়ার সাথে সাথে বিকাশ সার্ভার স্বয়ংক্রিয়ভাবে আমাদের ব্যাকএন্ডের একটি স্পেসিফিক ইউআরএলে (Webhook URL) এইচটিটিপি পোস্ট রিকোয়েস্ট পাঠিয়ে পেমেন্টের পূর্ণাঙ্গ তথ্য জানিয়ে দেয়। এটি রিয়েল-টাইম এবং সার্ভার রিসোর্স বাঁচায়।",
          b: "ওয়েবহুক হলো একটি স্বয়ংক্রিয় নোটিফিকেশন সিস্টেম যেখানে থার্ড পার্টি পেমেন্ট প্রোভাইডার কোনো ঘটনা ঘটলে সরাসরি আমাদের সার্ভারে এপিআই কল করে ডাটা পাঠায়। এর ফলে ক্লায়েন্ট বা সার্ভারকে বারবার স্ট্যাটাস চেক করার জন্য রিকোয়েস্ট পাঠাতে হয় না, সিস্টেম সম্পূর্ণ রিয়েল-টাইম থাকে।",
          e: "A Webhook is an event-driven HTTP push notification. Instead of our server repeatedly polling payment providers to check if a transaction completed, the provider immediately invokes our designated Webhook endpoint with the transaction payload the moment payment status changes, ensuring real-time settlement and minimal server overhead.",
          code: "app.post('/api/webhooks/bkash', async (req, res) => {\n  const { paymentId, trxId, amount } = req.body;\n  await handlePaymentSuccess(paymentId, trxId, amount);\n  res.sendStatus(200);\n});"
        },
        {
          lvl: "lvl2",
          q: "পেমেন্ট গেটওয়েতে 'Idempotency Key' কেন অপরিহার্য এবং ডাবল-চার্জ রোধে এটি কীভাবে কাজ করে?",
          m: "যদি কোনো কাস্টমার পেমেন্ট সাবমিট বাটনে নেটওয়ার্ক স্লো থাকার কারণে দুইবার চাপ দেয়, অথবা পেমেন্ট গেটওয়ে নেটওয়ার্ক টাইমআউটের কারণে একই ওয়েবহুক দুইবার পাঠায়, তবে আইডেমপোটেন্সি কি না থাকলে কাস্টমারের একাউন্ট থেকে দুইবার টাকা কাটা যাবে বা কার্টে দুইবার অর্ডার তৈরি হবে। সমাধান: প্রতিটি পেমেন্ট ইনিশিয়েশনে ইউনিক `idempotencyKey` তৈরি করে ডাটাবেজে সেভ রাখা হয়। দ্বিতীয়বার একই কি আসলে সিস্টেম ডাটাবেজ ট্রানজেকশন পুনরায় না চালিয়ে আগের সেভ করা রেজাল্ট রিটার্ন করে দেয়।",
          b: "আইডেমপোটেন্সি কি নিশ্চিত করে যে একই রিকোয়েস্ট একাধিকবার পাঠানো হলেও সিস্টেমে অপারেশনটি শুধুমাত্র একবারই ঘটবে। এর ফলে কাস্টমার ভুল করে একাধিকবার ক্লিক করলেও বা নেটওয়ার্ক রী-ট্রাই হলেও ডাবল পেমেন্ট কাটা বা একই চালানের মাল দুইবার বিক্রি হওয়া সম্পূর্ণ বন্ধ থাকে।",
          e: "Idempotency keys ensure that identical API requests executed multiple times yield the exact same outcome without duplicate side-effects. When processing transactions, storing a unique idempotency key allows the system to recognize replay attempts, immediately returning the original transaction state without double-charging the customer or generating duplicate orders.",
          code: "const existingTx = await prisma.payment.findUnique({ where: { idempotencyKey } });\nif (existingTx) return res.status(200).json(existingTx);"
        },
        {
          lvl: "lvl3",
          q: "পেমেন্ট গেটওয়ের ওয়েবহুক সিকিউরিটিতে HMAC Signature Verification কীভাবে কাজ করে?",
          m: "যেকোনো হ্যাকার সরাসরি আমাদের ওয়েবহুক ইউআরএলে ফেক ডাটা পোস্ট করে ভুয়া পেমেন্ট সফল দেখাতে পারে। এটি ঠেকাতে পেমেন্ট গেটওয়ে (যেমন বিকাশ বা আমারপে) পুরো রিকোয়েস্ট বডিকে একটি প্রি-শেয়ার্ড সিক্রেট কি দিয়ে **HMAC-SHA256** অ্যালগরিদমে হ্যাশ করে এবং হেডারে `x-signature` হিসেবে পাঠায়। আমাদের সার্ভার রিকোয়েস্ট পাওয়ার পর র বডি ও সিক্রেট কি দিয়ে নিজে একটি হ্যাশ তৈরি করে। যদি আমাদের হ্যাশ ও গেটওয়ের সিগনেচার ১০০% মিলে যায়, তবেই রিকোয়েস্টটিকে আসল ও বিশ্বস্ত হিসেবে গ্রহণ করা হয়।",
          b: "এইচএমএসি সিগনেচার ভেরিফিকেশনের মাধ্যমে নিশ্চিত হওয়া যায় যে ওয়েবহুক রিকোয়েস্টটি সত্যিই পেমেন্ট গেটওয়ে থেকে এসেছে, কোনো হ্যাকার পাঠায়নি। গেটওয়ে সিক্রেট কি দিয়ে রিকোয়েস্টের বডি হ্যাশ করে পাঠায় এবং আমাদের ব্যাকএন্ড একই কি দিয়ে হ্যাশ মিলিয়ে দেখে ডাটার সত্যতা নিশ্চিত করে।",
          e: "HMAC signature verification prevents spoofed webhook attacks. The payment gateway hashes the raw request body with a shared private secret using HMAC-SHA256 and includes it in the HTTP headers. Our server computes the hash using the same secret; if the signatures match identically, the webhook payload is proven authentic and untampered.",
          code: "const computedSig = crypto.createHmac('sha256', SECRET).update(rawBody).digest('hex');\nif (computedSig !== req.headers['x-signature']) return res.status(403).send('Invalid Signature');"
        },
        {
          lvl: "situation",
          q: "কাস্টমারের বিকাশ একাউন্ট থেকে টাকা কেটে নিয়েছে, কিন্তু নেটওয়ার্ক ড্রপের কারণে বিকাশ তোমার সার্ভারে সাকসেস ওয়েবহুক পাঠাতে পারেনি। ফলে কাস্টমারের অর্ডার পেন্ডিং দেখাচ্ছে। তুমি এই সমস্যা কীভাবে সমাধান করবে?",
          m: "এটি পেমেন্ট সিস্টেমে বহুল পরিচিত এজ-কেস। আমি ৩ স্তরে সমাধান করি: (১) **Manual Verify Button:** কাস্টমার ড্যাশবোর্ডে 'Verify Payment' বাটন থাকবে। ক্লিক করলে ব্যাকএন্ড সরাসরি বিকাশের Query Payment API কল করে পেমেন্টের আসল অবস্থা জেনে ইনস্ট্যান্টলি অর্ডার সাকসেস করবে। (২) **Automated Reconciliation Cron Job:** প্রতি ৫ মিনিট পর পর একটি ব্যাকগ্রাউন্ড ক্রন জব চলবে যা গত ৩০ মিনিটের সমস্ত 'PENDING' পেমেন্ট তুলে নিয়ে গেটওয়ে এপিআই কল করে স্ট্যাটাস চেক করবে এবং মিলে গেলে অটো-কনফার্ম করবে। (৩) অমিল থাকলে ২৪ ঘণ্টা পর অটো-রিফান্ড টিকিট জেনারেট করবে।",
          b: "এই পরিস্থিতি মোকাবিলায় একটি ব্যাকগ্রাউন্ড রিকনসিলিয়েশন ক্রন জব রাখা হয় যা প্রতি ৫ মিনিটে পেন্ডিং পেমেন্টগুলোর বর্তমান অবস্থা গেটওয়ের কোয়েরি এপিআই দিয়ে সরাসরি চেক করে ডাটাবেজ আপডেট করে। এছাড়া কাস্টমারকে একটি 'ভেরিফাই পেমেন্ট' বাটন দেওয়া হয় যা চাপলে সাথে সাথে লাইভ স্ট্যাটাস ফেচ হয়ে অর্ডারটি সক্রিয় হয়।",
          e: "I resolve webhook delivery drops through two mechanisms: first, an on-demand 'Verify Payment' trigger that directly queries the provider's Query API to resolve transaction status in real-time. Second, an automated reconciliation cron job running every 5 minutes that scans all pending transactions, checks their statuses against the gateway API, and auto-settles confirmed payments.",
          tip: "PTTABD ও Dokani উভয় সিস্টেমে তুমি এই রিকনসিলিয়েশন লজিক ব্যবহার করেছ।"
        },
        {
          lvl: "realworld",
          q: "PTTABD LMS-এ bKash Tokenized Payment API (`/checkout/create` & `/checkout/execute`) দিয়ে কীভাবে ফুল ট্রানজেকশনে কোর্স এনরোলমেন্ট ও ইনভয়েস জেনারেশন হ্যান্ডেল করেছিলে?",
          m: "PTTABD-তে আমরা bKash Tokenized Checkout ব্যবহার করেছিলাম: (১) শিক্ষার্থী পেমেন্ট বাটনে চাপ দিলে ব্যাকএন্ড বিকাশের `/checkout/create` কল করে পেমেন্ট আইডি ও রিডাইরেক্ট ইউআরএল পেত। (২) শিক্ষার্থী পিন/ওটিপি দিলে বিকাশ আমাদের কলব্যাক ইউআরএলে ফেরত পাঠাত। (৩) এরপর সবচেয়ে গুরুত্বপূর্ণ অংশ: আমরা বিকাশের `/checkout/execute` কল করতাম। বিকাশ সাকসেস রেসপন্স দিলে আমরা একটি একক **`prisma.$transaction`** ব্লকের ভেতর: শিক্ষার্থীর কোর্স এনরোলমেন্ট অ্যাক্টিভ করতাম, পেমেন্ট টেবিলে ট্রানজেকশন সেভ করতাম, এবং ইনভয়েস রেকর্ড তৈরি করতাম। ট্রানজেকশন সফল হলে ব্যাকগ্রাউন্ডে Nodemailer দিয়ে ইনভয়েস রিসিপ্ট ইমেইলে পাঠিয়ে দিতাম।",
          b: "পিটিটিএবিডি এলএমএসে আমরা বিকাশ টোকেনাইজড পেমেন্ট এপিআই ব্যবহার করেছি। পেমেন্ট এক্সিকিউট সফল হওয়ার পর একটি ডাটাবেজ ট্রানজেকশনের মধ্যে কোর্স এনরোলমেন্ট, পেমেন্ট হিস্ট্রি এবং ইনভয়েস তৈরি নিশ্চিত করা হতো। কোনো কারণে ডাটাবেসে ত্রুটি হলে ট্রানজেকশন স্বয়ংক্রিয়ভাবে রোলব্যাক হতো যাতে কোনো অসংগতি না থাকে।",
          e: "In PTTABD LMS, I integrated bKash Tokenized Payment API. Upon receiving the callback, the backend invoked /checkout/execute. Inside an atomic prisma.$transaction block, we validated the settlement, updated the student enrollment status, committed payment records, and generated an official invoice before asynchronously firing Nodemailer receipts and Socket.io instructor alerts.",
          tip: "এই প্রোডাকশন ব্যাখ্যা ইন্টারভিউ বোর্ডকে তোমার এন্টারপ্রাইজ পেমেন্ট হ্যান্ডলিং দক্ষতায় মুগ্ধ করবে।"
        }
      ]
    },
    {
      id: "api-validation-errors",
      name: "API Validation, Error Handling & Logging",
      desc: "Zod / Joi validation middleware, Custom Error Classes, Global Error Boundary, Winston / Morgan, Third-Party APIs",
      items: [
        {
          lvl: "lvl1",
          q: "Express.js-এ গ্লোবাল সেন্ট্রালাইজড এরর হ্যান্ডলার মিডলওয়্যার কীভাবে তৈরি করতে হয় এবং কেন এটি ৪টি আর্গুমেন্ট গ্রহণ করে?",
          m: "Express-এ এরর হ্যান্ডলার মিডলওয়্যার চেনার একমাত্র উপায় হলো তার ৪টি প্যারামিটার থাকতে হবে: `(err, req, res, next)`। কোনো রুটে বা কন্ট্রোলারে `next(err)` কল করা হলে বা অ্যাসিনক্রোনাস ফাংশন এরর থ্রো করলে এক্সপ্রেস সব সাধারণ মিডলওয়্যার স্কিপ করে সরাসরি এই ৪ আর্গুমেন্টের ফাংশনটিতে চলে আসে। এখানে আমরা এরর টাইপ চেক করে স্ট্যাটাস কোড (যেমন ৪00, ৪04, ৫০০) এবং ক্লিন জেএসন মেসেজ রেসপন্স হিসেবে ক্লায়েন্টকে পাঠাই।",
          b: "এক্সপ্রেস জেএসে গ্লোবাল এরর হ্যান্ডলারে ৪টি প্যারামিটার (err, req, res, next) দিতে হয়। কন্ট্রোলার থেকে next(err) পাঠালে এক্সপ্রেস স্বয়ংক্রিয়ভাবে এই মিডলওয়্যারে রিকোয়েস্ট নিয়ে আসে এবং এক জায়গা থেকে পুরো অ্যাপ্লিকেশনের এরর রেসপন্স ক্লায়েন্টকে পাঠানো নিশ্চিত করে।",
          e: "In Express, an error-handling middleware is defined by its 4-parameter signature: (err, req, res, next). Express inspects function arity, and whenever an error is forwarded via next(err), it skips remaining regular middleware and directs execution exclusively to error handlers, enabling centralized status mapping and sanitized error responses.",
          code: "app.use((err, req, res, next) => {\n  const status = err.statusCode || 500;\n  res.status(status).json({ success: false, message: err.message || 'Internal Server Error' });\n});"
        },
        {
          lvl: "lvl2",
          q: "API রিকোয়েস্টের বডি ভ্যালিডেশনের জন্য Zod বা Joi মিডলওয়্যার কীভাবে তৈরি করবে যাতে কন্ট্রোলারে সবসময় পিউর ও টাইপ-সেফ ডাটা পৌঁছায়?",
          m: "আমরা একটি রিইউজেবল `validate(schema)` হাইয়ার-অর্ডার মিডলওয়্যার লিখি। এটি `req.body`, `req.query`, বা `req.params`-কে Zod স্কিমা দিয়ে `schema.safeParse()` চালায়। ভ্যালিডেশন ফেইল করলে কন্ট্রোলারে যাওয়ার আগেই ৪০০ ব্যাড রিকোয়েস্ট এবং কোন ফিল্ডে ভুল হয়েছে তার নিখুঁত মেসেজ রিটার্ন করে। আর ভ্যালিডেশন পাস হলে `req.body = result.data` সেট করে দেয় যাতে অনাকাঙ্ক্ষিত অতিরিক্ত কোনো প্রপার্টি কন্ট্রোলারে ঢুকতে না পারে।",
          b: "রিকোয়েস্ট বডি ভ্যালিডেট করতে আমরা একটি কাস্টম মিডলওয়্যার ব্যবহার করি যা কন্ট্রোলারের আগে রান হয়। ডাটা ঠিক না থাকলে এটি ইউজারকে সাথে সাথে ৪০০ ব্যাড রিকোয়েস্ট দিয়ে এরর জানিয়ে দেয়, আর ঠিক থাকলে টাইপ-সেফ ও ক্লিন ডাটা কন্ট্রোলারে পাঠিয়ে দেয়।",
          e: "I craft a generic validation middleware using Zod's safeParse method. It parses incoming req.body, req.query, or req.params against predefined schemas. If validation fails, it intercepts the cycle early with a 400 Bad Request and structured error paths; if it passes, it attaches the sanitized, typed data to the request object before calling next().",
          code: "export const validate = (schema: z.ZodSchema) => (req, res, next) => {\n  const result = schema.safeParse(req.body);\n  if (!result.success) return res.status(400).json({ errors: result.error.format() });\n  req.body = result.data;\n  next();\n};"
        },
        {
          lvl: "lvl3",
          q: "Node.js-এ আনহ্যান্ডেল্ড এক্সেপশন (`uncaughtException` এবং `unhandledRejection`) কীভাবে হ্যান্ডেল করবে যাতে সার্ভার ক্র্যাশ হলেও ডাটা করাপ্ট না হয়?",
          m: "যখন কোনো আনক্যাচড এক্সেপশন ঘটে, Node.js প্রসেস একটি আনস্টেবল স্টেটে চলে যায়। সমাধান: (১) `process.on('uncaughtException')` এবং `process.on('unhandledRejection')` লিসেনারে এরর ও স্ট্যাকট্রেস Winston লগারে রেকর্ড করব। (২) চলমান ডাটাবেজ ট্রানজেকশন রোলব্যাক ও ওপেন সকেট/সার্ভার কানেকশন `server.close()` দিয়ে গ্রেসফুলি শাটডাউন করব। (৩) `process.exit(1)` কল করে প্রসেসটি বন্ধ করে দেব, যাতে PM2 বা Docker কন্টেইনার তাৎক্ষণিক একটি নতুন ফ্রেশ ওয়ার্কার প্রসেস স্পন করতে পারে।",
          b: "আনহ্যান্ডেল্ড এক্সেপশন ঘটলে নোডজেএস প্রসেস করাপ্ট হতে পারে। তাই এই ইভেন্টগুলো ধরে লগে এরর রেকর্ড করে চলমান কানেকশনগুলো গ্রেসফুলি বন্ধ করে প্রসেস এক্সিট (process.exit(1)) করতে হয়, যাতে পিএম২ বা ডকার সাথে সাথে একটি নতুন স্বাস্থ্যবান প্রসেস চালু করে সার্ভিস সচল রাখে।",
          e: "Uncaught exceptions leave the Node process in an unpredictable state. The production standard is to intercept uncaughtException and unhandledRejection, log detailed stack traces via Winston/Sentry, initiate graceful shutdown by closing HTTP servers and DB connections (server.close()), and then trigger process.exit(1) so PM2 or Docker can immediately restart a healthy worker instance.",
          tip: "গ্রেসফুল শাটডাউন ও PM2 অটো-রিস্টার্টের কথা বলা সিনিয়র ইঞ্জিনিয়ারদের মার্ক অফ এক্সিলেন্স।"
        },
        {
          lvl: "situation",
          q: "তোমার ব্যাকএন্ড একটি থার্ড-পার্টি কুরিয়ার বা এসএমএস এপিআই-এর ওপর নির্ভরশীল, কিন্তু হঠাৎ ওই থার্ড-পার্টি সার্ভার স্লো হয়ে গেছে বা ৫০৪ গেটওয়ে টাইমআউট দিচ্ছে। তোমার সিস্টেমের পুরো ইউজার রিকোয়েস্ট যেন ব্লক না হয় তা কীভাবে নিশ্চিত করবে?",
          m: "এখানে থার্ড-পার্টির কারণে আমাদের সার্ভারের থ্রেড ও মেমোরি আটকে যাবে। সমাধান: (১) **সার্কিট ব্রেকার প্যাটার্ন (Circuit Breaker):** Opossum লাইব্রেরি দিয়ে সার্কিট ব্রেকার বসাব—টানা ৩-৪ বার টাইমআউট পেলে সার্কিট 'Open' হয়ে যাবে এবং থার্ড-পার্টিতে কল না পাঠিয়ে সাথে সাথে ক্যাশড বা ফলব্যাক রেসপন্স দেবে। (২) **কড়া টাইমআউট:** Axios কলে অবশ্যই ৩–৫ সেকেন্ডের `timeout: 5000` সেট রাখব। (৩) **অ্যাসিনক্রোনাস মেসেজ কিউ:** এসএমএস বা কুরিয়ার বুকিং মূল এপিআই রিকোয়েস্টে না রেখে BullMQ/Redis কিউতে পুশ করব এবং ব্যাকগ্রাউন্ডে এক্সপোনেশিয়াল ব্যাক-অফ রিট্রাই (Exponential Backoff Retry) চালাব।",
          b: "থার্ড-পার্টি এপিআই ডাউন হলে আমাদের সিস্টেম সুরক্ষিত রাখতে আমরা সার্কিট ব্রেকার প্যাটার্ন ব্যবহার করি এবং এপিআই কলে সর্বোচ্চ ৩ সেকেন্ড টাইমআউট সেট করি। এছাড়া এসএমএস বা কুরিয়ারের কাজগুলো ব্যাকগ্রাউন্ড কিউতে পাঠিয়ে দিই যাতে মূল ইউজারের কেনাকাটায় কোনো বিলম্ব না হয়।",
          e: "To prevent cascading failures from sluggish third-party providers, I configure aggressive Axios timeouts (e.g., 3000ms), implement the Circuit Breaker pattern to fast-fail when provider error rates surge, and decouple external integrations from the main synchronous request path into BullMQ worker queues equipped with exponential backoff retries.",
          code: "const axiosInstance = axios.create({ timeout: 4000 });\n// Offload to BullMQ worker queue instead of blocking HTTP response"
        },
        {
          lvl: "realworld",
          q: "Dokani POS ও PTTABD-তে প্রোডাকশন লগিং এবং রিয়েল-টাইম এরর ট্র্যাকিং তুমি কীভাবে আর্কিটেকচার করেছিলে?",
          m: "Dokani ও PTTABD-তে আমরা প্রোডাকশনে কখনো সাধারণ `console.log()` রাখিনি। আমি: (১) **Winston + Morgan** ইন্টিগ্রেট করি। প্রতিদিনের জন্য `winston-daily-rotate-file` দিয়ে `error-%DATE%.log` এবং `combined-%DATE%.log` আলাদা ফাইলে সেভ হতো। (২) প্রতিটি HTTP রিকোয়েস্টে `crypto.randomUUID()` দিয়ে একটি ইউনিক `requestId` জেনারেট করে লগ ও ক্লায়েন্ট রেসপন্স হেডারে পাঠিয়ে দিতাম, যাতে কোনো কাস্টমার এরর ফেস করলে ওই requestId দিয়ে মাত্র ৫ সেকেন্ডে সার্ভার লগে সুনির্দিষ্ট সমস্যা ট্রেস করা যায়। (৩) ক্রিটিক্যাল পেমেন্ট ফেইলিউরে টেলিগ্রাম বট ওয়েবhooks দিয়ে ইনস্ট্যান্ট নোটিফিকেশন পেতাম।",
          b: "দোকানি এবং পিটিটিএবিডিতে আমরা উইনস্টন (Winston) দিয়ে ডেইলি রোটেট লগিং ফাইল তৈরি করেছিলাম। প্রতিটি রিকোয়েস্টে ইউনিক রিকোয়েস্ট-আইডি ট্র্যাক করা হতো যাতে কাস্টমারের যে কোনো সমস্যায় কয়েক সেকেন্ডে নির্দিষ্ট এরর বের করা যায় এবং পেমেন্ট ফেইল করলে টেলিগ্রাম বটের মাধ্যমে সতর্কবার্তা আসত।",
          e: "In Dokani and PTTABD, I built structured JSON logging using Winston and Morgan with daily log rotation. Every incoming request received a unique X-Request-Id header tracked across the request lifecycle. In the event of a client-side error, users quoted this ID, allowing us to pinpoint exact root causes in server logs within seconds, backed by instant Telegram webhook alerts for critical payment anomalies.",
          tip: "X-Request-Id ট্র্যাকিংয়ের অভিজ্ঞতা ইন্টারভিউয়ারকে আশ্বস্ত করবে যে তুমি লাইভ সিস্টেম সাপোর্ট দিতে পারদর্শী।"
        }
      ]
    },
    {
      id: "backend-devops-tools",
      name: "Backend Server, PM2, Docker & Deployment",
      desc: "TypeScript compilation, Linux Ubuntu VPS, PM2 Cluster Management, Nginx Reverse Proxy, Docker containerization",
      items: [
        {
          lvl: "lvl1",
          q: "Node.js অ্যাপ্লিকেশন প্রোডাকশনে চালানোর জন্য PM2 কেন অপরিহার্য এবং Cluster Mode কী?",
          m: "ডিফল্টভাবে `node app.js` চালালে কোনো এররে সার্ভার ক্র্যাশ হলে সাইট চিরতরে বন্ধ হয়ে যায় এবং সার্ভার কেবল একটি সিপিইউ কোর ব্যবহার করতে পারে। PM2 একটি এন্টারপ্রাইজ প্রসেস ম্যানেজার যা: (১) অ্যাপ ক্র্যাশ করলে মাইক্রোসেকেন্ডে অটো-রিস্টার্ট করায়। (২) `pm2 start app.js -i max` দিলে ক্লাস্টার মোডে সার্ভারের ৪টি বা ৮টি সবগুলো সিপিইউ কোরে আলাদা নোড প্রসেস চালু করে ইনকামিং লোড ব্যালেন্স করে। (৩) সিস্টেম রিবুট হলে `pm2 startup` দিয়ে সার্ভার অন হওয়ার সাথে সাথে অ্যাপ ব্যাকগ্রাউন্ডে চালু করে দেয়।",
          b: "পিএম২ নোডজেএস অ্যাপ্লিকেশনের সার্বক্ষণিক সক্রিয়তা নিশ্চিত করে। কোনো কারণে অ্যাপ্লিকেশন বন্ধ হয়ে গেলে এটি তাৎক্ষণিক স্বয়ংক্রিয়ভাবে রিস্টার্ট করে দেয়। ক্লাস্টার মোডের মাধ্যমে সার্ভারের সমস্ত সিপিইউ কোর ব্যবহার করে ট্রাফিক লোড ব্যালেন্স করে এবং জিরো-ডাউনটাইমে রিলোড দেয়।",
          e: "PM2 guarantees high availability for production Node.js applications. It provides automatic crash recovery, system boot persistence (pm2 startup), and Cluster Mode (-i max), which forks multiple worker processes across all available CPU cores to load-balance incoming network traffic and perform zero-downtime rolling reloads.",
          code: "pm2 start dist/server.js -i max --name dokani-api\npm2 save\npm2 startup"
        },
        {
          lvl: "lvl2",
          q: "Node.js অ্যাপের জন্য Nginx-কে Reverse Proxy হিসেবে সামনে রাখার প্রধান কারিগরি সুবিধাগুলো কী কী?",
          m: "সরাসরি নোড পোর্ট (যেমন :5000) ইন্টারনেটে ওপেন রাখা সিকিউরিটি ও পারফরম্যান্সের জন্য ঝুঁকিপূর্ণ। Nginx সামনে রাখার সুবিধা: (১) **SSL/TLS Termination:** এনগিনক্স নিজেই এসএসএল এনক্রিপশন হ্যান্ডেল করে নোডজেএস-এর সিপিইউ রিলিজ করে দেয়। (২) **Gzip / Brotli Compression:** রেসপন্স কম্প্রেস করে ব্যান্ডউইথ বাঁচায়। (৩) **Static File Caching:** ইমেজ ও স্ট্যাটিক ফাইল সরাসরি এনগিনক্স ক্যাশ থেকে ডেলিভার করে নোডে রিকোয়েস্ট যেতে দেয় না। (৪) **DDoS & Rate Limiting:** গেটওয়ে লেভেলেই অতিরিক্ত রিকোয়েস্ট ব্লক করে নোড সার্ভার সুরক্ষিত রাখে।",
          b: "এনগিনক্স সামনে রিভার্স প্রক্সি হিসেবে থাকলে তা নোডজেএসকে সরাসরি ইন্টারনেটে উন্মুক্ত না করে নিরাপত্তা দেয়। এটি এসএসএল এনক্রিপশন প্রসেস করে, রেসপন্স জিপ কম্প্রেস করে দ্রুত পাঠায়, স্ট্যাটিক ফাইল ক্যাশ করে নোড সার্ভারের লোড কমায় এবং রেট লিমিটিং দিয়ে আক্রমণ প্রতিরোধ করে।",
          e: "Placing Nginx in front of Node.js as a reverse proxy provides SSL/TLS termination, automated Gzip compression, static asset caching (relieving Node from file I/O), rate limiting, and protection against slow HTTP/DDoS attacks, while keeping backend application ports isolated behind internal loopback interfaces.",
          code: "location /api {\n    proxy_pass http://localhost:5000;\n    proxy_http_version 1.1;\n    proxy_set_header Upgrade $http_upgrade;\n    proxy_set_header Connection 'upgrade';\n    proxy_set_header Host $host;\n    proxy_cache_bypass $http_upgrade;\n}"
        },
        {
          lvl: "lvl3",
          q: "Node.js ও TypeScript অ্যাপের জন্য Production Dockerfile কীভাবে Multi-Stage Build দিয়ে মিনিমাল সাইজে তৈরি করবে?",
          m: "সাধারণ ডকার ফাইলে `devDependencies`, TypeScript কম্পাইলার ও ক্যাশ থেকে ইমেজ সাইজ ১.৫ জিবি পর্যন্ত ফুলে যায়। Multi-Stage Build-এ: (১) **Stage 1 (Builder):** নোড ইমেজে সমস্ত ডিপেনডেন্সি ইন্সটল করে `tsc` দিয়ে জাভাস্ক্রিপ্ট কোড কম্পাইল (`dist/`) করি। (২) **Stage 2 (Runner):** একটি হালকা `node:alpine` বেস ইমেজ নিয়ে শুধুমাত্র বিল্ডার স্টেজ থেকে কম্পাইল করা `dist/` ফোল্ডার এবং শুধুমাত্র `npm ci --omit=dev` প্রোডাকশন ডিপেনডেন্সি কপি করি। এতে ফাইনাল ডকার ইমেজ সাইজ মাত্র ১০০-১৫০ মেগাবাইটে নেমে আসে এবং আক্রমণ প্রতিরোধে নন-রুট ইউজার চালানো যায়।",
          b: "মাল্টি স্টেজ ডকার বিল্ড ব্যবহার করে আমরা বিল্ড স্টেজ ও প্রোডাকশন রানার স্টেজ আলাদা করি। কম্পাইলার ও ডেভ ডিপেনডেন্সি বাদ দিয়ে রানার স্টেজে শুধুমাত্র কম্পাইল করা কোড ও নোড-অ্যালপাইন রাখা হয়। ফলে ডকার ইমেজের সাইজ ১ জিবি থেকে কমে মাত্র ১২০ মেগাবাইটে নেমে আসে এবং মেমোরি অনেক সাশ্রয় হয়।",
          e: "A multi-stage Docker build decouples compilation from the runtime image. Stage 1 compiles TypeScript into JavaScript with full devDependencies. Stage 2 copies only the compiled dist folder, package.json, and production-only node_modules (via npm ci --omit=dev) into a lightweight node:alpine container running as a non-root user, slashing image size from 1.2GB down to ~120MB.",
          code: "# Multi-stage Dockerfile\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nUSER node\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY --from=builder /app/dist ./dist\nCMD [\"node\", \"dist/server.js\"]"
        },
        {
          lvl: "situation",
          q: "লিনাক্স উবুন্টু VPS সার্ভারে ডিপ্লয় করার পর নোড ব্যাকএন্ড চালু হচ্ছে না এবং `Error: listen EADDRINUSE :::5000` দেখাচ্ছে। কীভাবে তাৎক্ষণিক ডিবাগ ও সলভ করবে?",
          m: "এই এররের অর্থ হলো ৫০০০ পোর্টটি অন্য কোনো প্রসেস ইতিমধ্যে দখল করে রেখেছে। সমাধান: (১) লিনাক্স টার্মিনালে `sudo lsof -i :5000` অথবা `sudo netstat -nlp | grep :5000` চালিয়ে দেখব কোন প্রসেস (PID) পোর্টটি ধরে রেখেছে। (২) যদি কোনো পুরোনো হ্যাং হয়ে থাকা নোড প্রসেস বা আনক্লিনড পিএম২ রান হয়ে থাকে, তবে `kill -9 <PID>` চালিয়ে জোরপূর্বক প্রসেসটি বন্ধ করব। (৩) `pm2 list` দেখে পুরোনো ইনস্ট্যান্স ডিলিট করে `pm2 restart` দিয়ে ফ্রেশভাবে অ্যাপ চালু করব।",
          b: "EADDRINUSE এরর নির্দেশ করে পোর্ট ৫০০০ আগে থেকেই অন্য কোনো প্রসেসে চালু আছে। টার্মিনালে lsof -i :5000 দিয়ে পোর্ট দখলকারী প্রসেস আইডি (PID) খুঁজে বের করে kill -9 PID কমান্ড দিয়ে তা বন্ধ করা হয় এবং পিএম২ ক্লিন রিস্টার্ট দিয়ে সমাধান করা হয়।",
          e: "EADDRINUSE indicates the designated port is already occupied. I diagnose the conflict by running 'sudo lsof -i :5000' to discover the blocking Process ID (PID). I terminate the stale process using 'kill -9 <PID>', verify port availability, and safely restart the PM2 instance using 'pm2 reload all'.",
          code: "sudo lsof -i :5000\n# Find PID and terminate\nkill -9 <PID>\npm2 restart dokani-api"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এর জন্য তুমি লিনাক্স VPS সার্ভারে উবুন্টু, Nginx, PM2 এবং SSL কীভাবে সেটআপ করে লাইভ প্রোডাকশনে স্টেবল রেখেছিলে?",
          m: "Dokani-র লাইভ হোস্টিংয়ে আমি: (১) Ubuntu 22.04 VPS-এ UFW ফায়ারওয়াল অন করে শুধুমাত্র SSH (22), HTTP (80), এবং HTTPS (443) পোর্ট ওপেন রেখেছিলাম, ডাটাবেজ পোর্ট ৫৪৩২ বাইরে বন্ধ রেখেছিলাম। (২) Node.js ও Prisma বিল্ড তৈরি করে PM2 Cluster Mode-এ চালু রাখি এবং `--max-memory-restart 600M` গার্ড দিই। (৩) Nginx-এ রিভার্স প্রক্সি কনফিগার করে Certbot Let's Encrypt দিয়ে অটোমেটিক রিনিউয়েবল ফ্রি SSL সার্টিফিকেট সেটআপ করি। (৪) সার্ভার রিবুট হলেও সাইট যেন ডাউন না হয় সেজন্য `pm2 startup systemd` দিয়ে অটো-বুট রেজিস্টার করেছিলাম।",
          b: "দোকানি প্রজেক্টে উবুন্টু সার্ভারে ইউএফডব্লিউ ফায়ারওয়াল কনফিগার করে ডাটাবেজ পোর্ট ইন্টারনেটে সুরক্ষিত রাখা হয়েছিল। পিএম২ ক্লাস্টার মোড দিয়ে অ্যাপ্লিকেশন ব্যাকগ্রাউন্ডে সচল রাখা এবং এনগিনক্স ও সার্টবট দিয়ে অটোমেটিক এসএসএল সার্টিফিকেট যুক্ত করা হয়েছিল। ফলে সার্ভার সবসময় নিরবচ্ছিন্ন ও দ্রুতগতির থাকত।",
          e: "In Dokani's production VPS, I hardened Ubuntu using UFW to expose only ports 22, 80, and 443 while isolating PostgreSQL internally. The backend ran in PM2 Cluster Mode with automated memory restart guards and systemd boot registration. Nginx reverse-proxied traffic to the Node cluster with Certbot SSL certificates auto-renewing via cron, maintaining 99.9% uptime.",
          tip: "এই ফুল-স্ট্যাক লিনাক্স ডেভঅপ্স উত্তর প্রমাণ করে যে তুমি একটি প্রজেক্ট শুরু থেকে প্রোডাকশন ডেলিভারি পর্যন্ত একাই হ্যান্ডেল করতে সক্ষম।"
        }
      ]
    },
    {
      id: "marketplaces-business-apps",
      name: "Online Marketplaces, Business Apps & Integrations",
      desc: "Multi-Vendor Marketplace Architecture, Platform Commission & Payouts, Secure Webhooks, Audit Logs, Business Dashboards",
      items: [
        {
          lvl: "lvl1",
          q: "Online Marketplace-এ মাল্টি-ভেন্ডর (Multi-Vendor) সিস্টেমের ক্ষেত্রে ডেটাবেজ ও পেমেন্ট ফ্লো কীভাবে ডিজাইন করা হয়?",
          m: "একটি অনলাইন মার্কেটপ্লেসে কাস্টমার একটি অর্ডারে একাধিক ভেন্ডরের প্রোডাক্ট কিনতে পারে। আর্কিটেকচার ডিজাইন: (১) **Split Order Data Model:** মূল `Order`-এর অধীনে প্রতিটি ভেন্ডরের জন্য আলাদা আলাদা `SubOrder` বা `VendorOrderItem` থাকে যাতে ভেন্ডররা শুধুমাত্র তাদের নিজস্ব আইটেম দেখতে এবং ডেলিভারি স্ট্যাটাস আপডেট করতে পারে। (২) **Platform Commission & Split Payouts:** কাস্টমার যখন পেমেন্ট গেটওয়েতে টাকা পরিশোধ করে, পুরো টাকাটি প্ল্যাটফর্মের এসক্রো (Escrow) একাউন্টে জমা হয়। প্ল্যাটফর্ম নিজস্ব কমিশন (যেমন ১০%) কেটে রেখে অবশিষ্ট ৯০% টাকা ভেন্ডরের `VendorWallet` বা ব্যালেন্সে ক্রেডিট করে। (৩) নির্দিষ্ট সাইকেল পর পর (যেমন প্রতি সপ্তাহে) ভেন্ডর ব্যাংক বা বিকাশে পে-আউট রিকোয়েস্ট করতে পারে।",
          b: "মার্কেটপ্লেসে একজন ক্রেতার একটি অর্ডারে একাধিক বিক্রেতার পণ্য থাকতে পারে। তাই মূল অর্ডারের ভেতরে প্রতিটি বিক্রেতার জন্য আলাদা সাব-অর্ডার তৈরি করা হয়। পেমেন্ট পাওয়ার পর প্ল্যাটফর্ম নিজস্ব কমিশন কেটে রেখে বাকি টাকা বিক্রেতার ওয়ালেটে জমা করে এবং পরবর্তীতে পে-আউট করা হয়।",
          e: "In multi-vendor marketplace architectures, a single customer checkout generates partitioned Sub-Orders scoped per vendor so merchants manage only their respective line items. Financially, customer payments land in the platform's escrow balance. An automated ledger deducts platform take-rates (commissions) and credits the net balance into each vendor's earnings ledger for scheduled payouts.",
          code: "model SubOrder {\n  id          String      @id @default(uuid())\n  orderId     String\n  vendorId    String\n  subtotal    Decimal\n  platformFee Decimal\n  vendorNet   Decimal\n  status      OrderStatus // PROCESSING, SHIPPED, DELIVERED\n}"
        },
        {
          lvl: "lvl2",
          q: "Third-Party Webhooks (যেমন: Stripe, bKash, SendGrid) রিসিভ করার সময় সিকিউরিটি ও আইডেমপোটেন্সি (Idempotency) কীভাবে নিশ্চিত করবে?",
          m: "ওয়েবহুক হলো পাবলিক ইন্টারনেট থেকে আমাদের সার্ভারে আসা রিকোয়েস্ট—তাই কঠোর ৩টি নিরাপত্তা নিশ্চিত করা বাধ্যতামূলক: (১) **HMAC Signature Verification:** রিকোয়েস্ট হেডারের সিগনেচার (যেমন `x-webhook-signature`) আমাদের সিক্রেট কি দিয়ে ভেরিফাই করব যাতে নিশ্চিত হওয়া যায় রিকোয়েস্টটি আসলেই পেমেন্ট গেটওয়ে থেকেই এসেছে। (২) **Idempotency Guard:** পেমেন্ট গেটওয়ে নেটওয়ার্ক সমস্যার কারণে একই ওয়েবহুক ২–৩ বার পাঠাতে পারে। আমরা ইভেন্ট আইডি (Event ID) ডাটাবেজে ট্র্যাক করব; যদি ওই ইভেন্ট পূর্বে প্রসেস হয়ে থাকে, তবে পুনরায় অর্ডার আপডেট বা ওয়ালেট ক্রেডিট না করে সাথে সাথে `200 OK` রিটার্ন করব। (৩) **Immediate 200 OK & Async Queue:** ভারী কাজ ব্যাকগ্রাউন্ড কিউতে (BullMQ) পাঠিয়ে সাথে সাথে গেটওয়েকে HTTP 200 রেসপন্স পাঠাব যাতে টাইমআউট না হয়।",
          b: "ওয়েবহুক সুরক্ষায় প্রথমে সিক্রেট কি দিয়ে সিগনেচার ভেরিফাই করতে হয় যাতে কোনো হ্যাকার ভুয়া রিকোয়েস্ট পাঠাতে না পারে। গেটওয়ে একই ইভেন্ট একাধিকবার পাঠালে ডুপ্লিকেট পেমেন্ট এড়াতে ইভেন্ট আইডি দিয়ে আইডেমপোটেন্ট চেক করতে হয় এবং টাইমআউট এড়াতে সাথে সাথে ২০০ রেসপন্স দিয়ে ব্যাকগ্রাউন্ডে কাজ সম্পন্ন করা হয়।",
          e: "Securing third-party webhooks mandates 3 safeguards: first, cryptographic HMAC signature verification over the raw request payload using shared provider secrets; second, strict idempotency enforcement by persisting webhook event IDs to prevent duplicate processing if retries occur; third, immediate HTTP 200 acknowledgments while delegating heavy database or fulfillment tasks to background job queues.",
          code: "export async function handleWebhook(req: Request) {\n  const signature = req.headers.get('x-signature');\n  const rawBody = await req.text();\n  if (!verifyHmac(rawBody, signature)) return new Response('Invalid signature', { status: 401 });\n  const event = JSON.parse(rawBody);\n  const alreadyProcessed = await db.webhookEvents.findUnique({ where: { id: event.id } });\n  if (alreadyProcessed) return new Response('Already processed', { status: 200 });\n  await processEventAsync(event);\n  return new Response('OK', { status: 200 });\n}"
        },
        {
          lvl: "lvl3",
          q: "Internal Business Applications-এ গুরুত্বপূর্ণ ডেটা পরিবর্তন ট্র্যাক করতে 'Audit Log Architecture' কীভাবে ডিজাইন করবে?",
          m: "অভ্যন্তরীণ বিজনেস অ্যাপ্লিকেশনে (যেমন ইআরপি বা এডমিন প্যানেল) কোনো ইউজার কখন কোনো ডাটা পরিবর্তন করল, ইনভয়েস ডিলিট করল বা মূল্য পরিবর্তন করল তা জানা অত্যাবশ্যক। আমরা একটি অপরিবর্তনশীল (Immutable) `audit_logs` টেবিল বানাব: (১) কে পরিবর্তন করেছে (`userId`, `userRole`), (২) কোন মডিউলে (`entity`: 'PRODUCT', `entityId`: '123'), (৩) কোন অ্যাকশন (`action`: 'UPDATE_PRICE'), (৪) পরিবর্তনের আগের ও পরের ডেটা (`oldValue` ও `newValue` PostgreSQL `JSONB` ফিল্ডে), (৫) ক্লায়েন্টের আইপি এড্রেস ও টাইমস্ট্যাম্প। এই টেবিলে কোনো `UPDATE` বা `DELETE` পারমিশন দেওয়া থাকে না—শুধুমাত্র `INSERT` করা যায়, ফলে এটি ১০০% অডিট-প্রুফ থাকে।",
          b: "বিজনেস অ্যাপে অডিট লগ তৈরি করতে একটি আলাদা অপরিবর্তনশীল টেবিল ব্যবহার করা হয়। ব্যবহারকারী কখন কী পরিবর্তন করেছে তা আগের এবং পরের ভ্যালু সহ জেসন (JSONB) ফরম্যাটে স্বয়ংক্রিয়ভাবে রেকর্ড করা হয়। এই টেবিল থেকে কোনো রেকর্ড মোছা যায় না, ফলে প্রতিষ্ঠানের সকল কাজের স্বচ্ছ ইতিহাস সংরক্ষিত থাকে।",
          e: "Enterprise internal applications mandate immutable audit trails. An audit_logs table captures the actor (userId, role), target entity (entityName, entityId), action verb (CREATE, UPDATE, DELETE), snapshot diffs (oldValues and newValues stored as PostgreSQL JSONB), source IP, and timestamp. Database privileges on this table restrict all UPDATE and DELETE capabilities, preserving a forensically unalterable ledger.",
          code: "model AuditLog {\n  id        String   @id @default(uuid())\n  userId    String\n  userEmail String\n  action    String   // e.g. PRICE_CHANGE, REFUND_ISSUED\n  entity    String   // INVOICE, PRODUCT\n  entityId  String\n  oldData   Json?\n  newData   Json?\n  ipAddress String?\n  createdAt DateTime @default(now())\n}"
        },
        {
          lvl: "situation",
          q: "মার্কেটপ্লেসে একটি কাস্টমার অর্ডার বাতিল করেছে কিন্তু ভেন্ডর ইতিমধ্যে প্রোডাক্ট ডেলিভারি প্রসেস শুরু করে দিয়েছে। রেস কন্ডিশন ও আর্থিক ক্ষতি এড়াতে কীভাবে স্টেট মেশিন ডিজাইন করবে?",
          m: "এটি একটি ক্রিটিক্যাল স্টেট ট্রানজিশন সমস্যা! সমাধান: **Strict Finite State Machine (FSM)**। (১) অর্ডারের প্রতিটি স্ট্যাটাস শুধুমাত্র অনুমোদিত পরবর্তী স্ট্যাটাসেই যেতে পারবে: `PLACED ➔ CONFIRMED ➔ SHIPPED ➔ DELIVERED`। (২) কাস্টমার শুধুমাত্র `PLACED` বা `CONFIRMED` থাকা অবস্থায় ১ ক্লিকে অটো-ক্যানসেল করতে পারবে। (৩) ভেন্ডর যখন স্ট্যাটাস `SHIPPED` করে দেয়, তখন কাস্টমারের 'Cancel' বাটন ডিজেবল হয়ে 'Request Return/Cancellation' হয়ে যাবে—যা ভেন্ডর বা এডমিনের অনুমোদনের জন্য পেন্ডিং থাকবে। (৪) রিফান্ড প্রসেস করার আগে ডাটাবেজে চেক করা হবে প্রোডাক্ট ডেলিভারি ট্র্যাকিং আইডি জেনারেট হয়েছে কিনা, যাতে প্রোডাক্ট ও টাকা উভয়েই একসাথে না খোয়া যায়।",
          b: "অর্ডার বাতিল ও ডেলিভারির মধ্যে বিরোধ ঠেকাতে আমরা স্টেট মেশিন ব্যবহার করি। পণ্য পাঠানো (SHIPPED) হওয়ার পর কাস্টমার সরাসরি অর্ডার বাতিল করতে পারে না, বরং রিটার্ন রিকোয়েস্ট পাঠায়। ডাটাবেজ ট্রানজেকশনের মাধ্যমে ডেলিভারি ও রিফান্ড নিশ্চিত করে আর্থিক ক্ষতি রোধ করা হয়।",
          e: "This is solved via a deterministic Finite State Machine (FSM). Orders transition strictly along valid status graphs: PLACED -> PROCESSING -> SHIPPED -> DELIVERED. Customer-initiated direct cancellations are permitted strictly before the SHIPPED threshold. Once a merchant transitions the state to SHIPPED, direct cancellations lock out, redirecting the user to a formal Return Request requiring merchant acknowledgment before initiating any automated refunds.",
          tip: "Finite State Machine (FSM) আর্কিটেকচার জটিল অর্ডার ও পেমেন্ট ম্যানেজমেন্টের স্বর্ণমান।"
        },
        {
          lvl: "realworld",
          q: "Dokani POS ও PTTABD-তে কাস্টমারদের জন্য স্বয়ংক্রিয় এসএমএস, ইনভয়েস ইমেইল ও পেমেন্ট কনফার্মেশন কীভাবে ব্যাকগ্রাউন্ডে নন-ব্লকিংভাবে পরিচালনা করেছিলে?",
          m: "সেলস চেকআউট এপিআইতে যদি একই সাথে এসএমএস গেটওয়ে কল ও পিডিএফ ইমেইল পাঠানো হয়, তবে এপিআই রেসপন্স হতে ৩–৪ সেকেন্ড সময় লাগবে এবং এসএমএস প্রোভাইডারের সার্ভার ডাউন থাকলে পুরো চেকআউট আটকে যাবে। সমাধান: (১) চেকআউট কন্ট্রোলারে শুধুমাত্র ডাটাবেজ ট্রানজেকশন সফল হলে একটি ইভেন্ট পুশ করতাম `eventEmitter.emit('invoice.created', invoice)`। (২) ব্যাকগ্রাউন্ড ওয়ার্কার বা কিউ এই ইভেন্টটি পিক করে থার্ড-পার্টি বাল্ক এসএমএস এপিআই (Greenweb / Elitbuzz) এবং Nodemailer দিয়ে ইমেইল পাঠাত। (৩) কোনো কারণে এসএমএস ফেইল করলেও ক্যাশিয়ারের কাউন্টারে বিক্রির এপিআই মাত্র ৬০ মিলিসেকেন্ডে সম্পন্ন হয়ে প্রিন্ট বেরিয়ে যেত।",
          b: "দোকানি এবং পিটিটিএবিডিতে এসএমএস ও ইমেইল পাঠানোর কাজটি ব্যাকগ্রাউন্ড ইভেন্টের মাধ্যমে করা হয়েছিল। ফলে মূল বিক্রি বা চেকআউট মাত্র ৬০ মিলিসেকেন্ডে শেষ হয়ে মেমো প্রিন্ট হতো এবং ব্যাকগ্রাউন্ড প্রসেস স্বাধীনভাবে এসএমএস ও ইমেইল ডেলিভারি নিশ্চিত করত।",
          e: "In Dokani and PTTABD, customer notifications were completely decoupled from checkout HTTP cycles using Node.js event emitters and worker tasks. Once database transactions committed, the handler emitted an 'invoice.completed' event and returned immediate HTTP 200 to the cashier (sub-60ms latency). Asynchronous worker subscribers consumed the event to render PDF vouchers and invoke third-party SMS/email gateways without risking checkout delays.",
          tip: "Decoupled Event-Driven Notification আর্কিটেকচারের অভিজ্ঞতা যেকোনো সিনিয়র বা লিড ফুল-স্ট্যাক পজিশনে অপরিহার্য।"
        }
      ]
    }
  ]
};
