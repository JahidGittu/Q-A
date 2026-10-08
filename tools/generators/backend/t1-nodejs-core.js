// Topic 1: Node.js Core, Event Loop & Streams (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "nodejs-event-loop",
  name: "Node.js Core, Event Loop & Streams",
  desc: "Node.js Architecture, Single Threaded Non-blocking I/O, Libuv, Event Loop Phases, Streams, Buffers, Worker Threads",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Node.js কী এবং এটি কীভাবে সিঙ্গেল-থ্রেডেড হয়েও হাজার হাজার সমসাময়িক (Concurrent) রিকোয়েস্ট হ্যান্ডেল করে?",
      m: "Node.js হলো একটি ওপেন-সোর্স, ক্রস-প্ল্যাটফর্ম জাভাস্ক্রিপ্ট রানটাইম যা Chrome V8 ইঞ্জিনের ওপর নির্মিত। এর জাভাস্ক্রিপ্ট এক্সিকিউশন মেইন থ্রেড সিঙ্গেল-থ্রেডেড হলেও এটি Non-blocking Asynchronous I/O এবং Libuv লাইব্রেরির ওপর ভিত্তি করে চলে। যখন কোনো ফাইল রিড, ডাটাবেজ কোয়েরি বা নেটওয়ার্ক রিকোয়েস্ট আসে, নোড তা ওএস কার্নেল বা Libuv থ্রেড পুলে অফলোড করে দেয় এবং পরবর্তী রিকোয়েস্ট প্রসেস করতে থাকে। কাজ শেষ হলে ইভেন্ট লুপের মাধ্যমে কলব্যাক ফায়ার করে। ফলে মেইন থ্রেড কখনোই ব্লক হয় না।",
      b: "নোড জেএস ক্রোম ভি-৮ ইঞ্জিনের ওপর তৈরি একটি নন-ব্লকিং অ্যাসিনক্রোনাস রানটাইম। এটি সিঙ্গেল-থ্রেডেড হলেও ফাইল ও নেটওয়ার্ক অপারেশনের ভারী কাজগুলো ওএস কার্নেল এবং লিবইউভি (Libuv) থ্রেড পুলে পাঠিয়ে দেয়। এর ফলে মেইন থ্রেড খালি থেকে প্রতি সেকেন্ডে হাজার হাজার রিকোয়েস্ট পরিচালনা করতে পারে।",
      e: "Node.js is an asynchronous event-driven JavaScript runtime built on Chrome's V8 engine. While its JavaScript execution runs on a single main thread, it offloads I/O operations (file, database, sockets) to the underlying operating system kernel or Libuv thread pool via non-blocking system calls.",
      tip: "ইন্টারভিউতে 'Non-blocking I/O' এবং 'Libuv thread pool' শব্দ দুটি অবশ্যই বলবে।"
    },
    {
      lvl: "lvl1",
      q: "Node.js Event Loop-এর প্রধান ফেজগুলো কী কী?",
      m: "ইভেন্ট লুপের প্রধান ৬টি ফেজ ক্রমানুসারে চলে: (১) `Timers`: `setTimeout` এবং `setInterval` কলব্যাক রান হয়। (২) `Pending Callbacks`: কিছু সিস্টেম লেভেল এরর যেমন TCP ত্রুটির কলব্যাক চলে। (৩) `Idle, Prepare`: নোডের অভ্যন্তরীণ কাজ। (৪) `Poll`: নতুন I/O ইভেন্ট রিড করে এবং ইনকামিং কানেকশনের কলব্যাক চালায়। (৫) `Check`: `setImmediate` কলব্যাক এক্সিকিউট হয়। (৬) `Close Callbacks`: সকেট বা হ্যান্ডেল ক্লোজের কলব্যাক (যেমন `socket.on('close')`) চলে।",
      b: "নোড জেএস ইভেন্ট লুপের প্রধান ধাপগুলো হলো: টাইমার্স (setTimeout), পেন্ডিং কলব্যাক্স, পোল (I/O অপারেশন), চেক (setImmediate), এবং ক্লোজ কলব্যাক্স। প্রতিটি ধাপ তার নিজস্ব কিউ থেকে কাজ সম্পন্ন করে পরবর্তী ধাপে যায়।",
      e: "The Libuv Event Loop runs through discrete phases in order: (1) Timers (setTimeout/setInterval), (2) Pending Callbacks (deferred system I/O), (3) Idle/Prepare, (4) Poll (retrieves new I/O events), (5) Check (setImmediate), and (6) Close Callbacks (socket close events).",
      code: "// Event loop cycle order: Timers -> Poll -> Check -> Close"
    },
    {
      lvl: "lvl1",
      q: "`process.nextTick()` এবং `setImmediate()`-এর মধ্যে পার্থক্য কী এবং কে আগে এক্সিকিউট হয়?",
      m: "`process.nextTick()` কোনো ইভেন্ট লুপ ফেজের অংশ নয়; এটি টেকনিক্যালি একটি 'Microtask' যা বর্তমান অপারেশনের ঠিক পরেই এবং ইভেন্ট লুপ পরবর্তী কোনো ফেজে যাওয়ার আগেই সবার আগে এক্সিকিউট হয়! আর `setImmediate()` ইভেন্ট লুপের 'Check Phase'-এ এক্সিকিউট হয় (Poll ফেজের পরে)। তাই `process.nextTick()` সবসময় `setImmediate()`-এর আগে চলে।",
      b: "process.nextTick() বর্তমান অপারেশনের ঠিক পরপরই এবং ইভেন্ট লুপের যেকোনো ফেজের আগে তৎক্ষণাৎ এক্সিকিউট হয়। অন্যদিকে setImmediate() ইভেন্ট লুপের চেক ফেজে রান হয়। সুতরাং nextTick সবসময় setImmediate এর চেয়ে বেশি অগ্রাধিকার পায়।",
      e: "process.nextTick() resolves immediately after the current operation finishes and before the Event Loop advances to any other phase. In contrast, setImmediate() is queued in the Check phase of the Event Loop. Thus, nextTick always fires before setImmediate.",
      code: "setImmediate(() => console.log('setImmediate'));\nprocess.nextTick(() => console.log('nextTick'));\n// Output: nextTick, then setImmediate"
    },
    {
      lvl: "lvl1",
      q: "Node.js Buffer কী এবং বাইনারি ডেটা হ্যান্ডলিংয়ে এর প্রয়োজন কেন?",
      m: "শুদ্ধ জাভাস্ক্রিপ্ট মূলগতভাবে স্ট্রিং ও অবজেক্ট নিয়ে কাজ করত, কিন্তু কাঁচা বাইনারি স্ট্রিম (যেমন ফাইল, ছবি, নেটওয়ার্ক প্যাকেট) রিড করতে পারত না। `Buffer` হলো V8 ইঞ্জিনের মেমোরির বাইরে কাঁচা মেমোরি অ্যালোকেশন (Raw Binary Allocation) যা ফিক্সড সাইজের বাইট সিকোয়েন্স হ্যান্ডেল করে। ফাইল আপলোড, ক্রিপ্টোগ্রাফিক হ্যাশ তৈরি বা সকেট ডেটা প্রসেসিংয়ে বাফার অপরিহার্য।",
      b: "বাফার হলো নোড জেএস-এর কাঁচা বাইনারি ডাটা সংরক্ষণের মেমোরি স্পেস যা সরাসরি ভি-৮ মেমরির বাইরে বরাদ্দ হয়। ইমেজ, ফাইল ও নেটওয়ার্ক প্যাকেট সরাসরি বাইট আকারে হ্যান্ডেল করতে বাফার ব্যবহৃত হয়।",
      e: "Buffers represent raw binary memory allocated outside the V8 heap as fixed-length byte chunks. Node.js uses Buffers to manipulate binary octet streams during TCP socket communication, file system operations, and cryptographic hashing.",
      code: "const buf = Buffer.from('Dokani POS', 'utf-8');\nconsole.log(buf); // <Buffer 44 6f 6b 61 6e 69 20 50 4f 53>"
    },
    {
      lvl: "lvl1",
      q: "CommonJS (`require` / `module.exports`) এবং ES Modules (`import` / `export`)-এর মধ্যে মূল পার্থক্য কী?",
      m: "CommonJS হলো সিনক্রোনাস মডিউল সিস্টেম যা নোড জেএসের ট্র্যাডিশনাল স্ট্যান্ডার্ড; এটি রানটাইমে লোড হয় এবং কন্ডিশনাল স্টেটমেন্টের ভেতরেও `require()` করা যায়। আর ES Modules (ESM) হলো আধুনিক জাভাস্ক্রিপ্ট স্ট্যান্ডার্ড; এটি স্ট্যাটিকালি অ্যানালাইজড এবং অ্যাসিনক্রোনাসলি প্রাক-পার্স হয়, যার ফলে বিল্ডের সময় Tree-shaking এবং কোড অপটিমাইজেশন সম্ভব হয়। Node.js-এ ESM চালাতে `package.json`-এ `\"type\": \"module\"` অথবা `.mjs` এক্সটেনশন দিতে হয়।",
      b: "কমনজেএস সিনক্রোনাস পদ্ধতিতে রানটাইমে মডিউল লোড করে এবং এটি নোডের পুরনো স্ট্যান্ডার্ড। ইএস মডিউল স্ট্যাটিক ও অ্যাসিনক্রোনাস পদ্ধতিতে কাজ করে, যা আধুনিক ট্রিশেকিং এবং কোড অপটিমাইজেশনে সাহায্য করে।",
      e: "CommonJS (require/module.exports) is synchronous and evaluates modules dynamically at runtime. ES Modules (import/export) are parsed asynchronously and analyzed statically at compile-time, unlocking modern bundler tree-shaking and top-level await.",
      tip: "আধুনিক ব্যাকএন্ডে টাইপস্ক্রিপ্টের সাথে ESM বা স্ট্যান্ডার্ড সিজেএস ট্রান্সপাইলেশন ব্যবহার ব্যাখ্যা করবে।"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Node.js Streams কী এবং ৪ ধরনের স্ট্রিম (Readable, Writable, Duplex, Transform) কীভাবে কাজ করে?",
      m: "স্ট্রিম হলো বড় পরিমাণের ডেটাকে মেমোরিতে একবারে সম্পূর্ণ লোড না করে ছোট ছোট চাঙ্ক (Chunk) আকারে পর্যায়ক্রমে রিড বা রাইট করার মেকানিজম। (১) `Readable`: যেখান থেকে ডেটা পড়া হয় (যেমন `fs.createReadStream`). (২) `Writable`: যেখানে ডেটা লেখা হয় (যেমন `fs.createWriteStream`). (৩) `Duplex`: যা রিড ও রাইট উভয়ই করতে পারে (যেমন TCP Socket). (৪) `Transform`: এমন ডুপ্লেক্স যা ডেটা রিড করে রূপান্তর করে আউটপুট দেয় (যেমন `zlib.createGzip`).",
      b: "স্ট্রিম বিশাল ফাইল বা ডাটাকে মেমরিতে সম্পূর্ণ না তুলে ছোট ছোট অংশে প্রসেস করে মেমোরি বাঁচায়। ৪ প্রকার স্ট্রিম: রিডেবল (পড়া), রাইটেবল (লেখা), ডুপ্লেক্স (উভয়ই), এবং ট্রান্সফর্ম (ডাটা রূপান্তর করে লেখা)।",
      e: "Streams process continuous data in sequential chunks, eradicating high memory consumption. The four stream types are Readable (read source), Writable (destination sink), Duplex (bidirectional, like TCP sockets), and Transform (modifies data between read and write, like gzip).",
      code: "const readable = fs.createReadStream('huge.log');\nconst writable = fs.createWriteStream('copy.log');\nreadable.pipe(writable); // Streams data chunk by chunk"
    },
    {
      lvl: "lvl2",
      q: "Stream Backpressure কী এবং `stream.pipe()` বা `pipeline()` কীভাবে মেমোরি ক্র্যাশ প্রতিরোধ করে?",
      m: "Backpressure ঘটে যখন ডেটা রিড করার গতি (Producer) ডেটা রাইট করার গতির (Consumer) চেয়ে অনেক বেশি ফাস্ট হয়। যদি রাইটার স্লো ডিস্কে থাকে, তবে আন-রিটেন চাঙ্কগুলো RAM-এ জমতে জমতে একপর্যায়ে মেমোরি ওভারফ্লো হয়ে সার্ভার ক্র্যাশ করবে। `stream.pipe()` ইন্টারনালি রাইটারের বাফার পূর্ণ হলে রিডারকে পজ করে (`drain` ইভেন্ট না আসা পর্যন্ত)। আর `stream/promises`-এর `pipeline()` এরর হ্যান্ডলিং ও ক্লিনআপ সহ স্বয়ংক্রিয় ব্যাকপ্রেশার ম্যানেজ করে।",
      b: "ব্যাকপ্রেশার হলো ডাটা পড়ার গতি লেখার গতির চেয়ে বেশি হওয়ার কারণে মেমোরি উপচে পড়ার অবস্থা। pipeline() বাফার পূর্ণ হলে সাময়িকভাবে পড়া বন্ধ রেখে লেখার পর পুনরায় চালু করে মেমোরি ক্র্যাশ হওয়া প্রতিরোধ করে।",
      e: "Backpressure occurs when a fast readable stream overwhelms a slower writable sink, causing unbounded buffer accumulation in RAM. Using `pipeline()` pauses reading when the writable buffer fills, resuming upon the 'drain' event with safe error cleanup.",
      code: "import { pipeline } from 'stream/promises';\nawait pipeline(fs.createReadStream('in.csv'), gzipTransform, fs.createWriteStream('out.gz'));"
    },
    {
      lvl: "lvl2",
      q: "Node.js Cluster Module কী এবং এটি মাল্টি-কোর সার্ভার আর্কিটেকচারে সিপিইউ ইউটিলাইজেশন কীভাবে বাড়ায়?",
      m: "যেহেতু নোড জেএস সিঙ্গেল থ্রেডে চলে, একটি ৮-কোর প্রসেসরের সার্ভারে সাধারণ নোড অ্যাপ রান করলে বাকি ৭টি কোর অলস বসে থাকে। Cluster Module একটি মাস্টার প্রসেস তৈরি করে যা `cluster.fork()` কল করে মেশিনের প্রতিটি সিপিইউ কোরের জন্য একটি করে চাইল্ড ওয়ার্কার প্রসেস স্পন করে। প্রতিটি ওয়ার্কার একই সার্ভার পোর্ট (যেমন :3000) শেয়ার করে এবং নোডের ইন্টারনাল রাউন্ড-রবিন (Round-Robin) লোড ব্যালেন্সার ট্রাফিক ডিস্ট্রিবিউট করে, ফলে থ্রুপুট ৮ গুণ বেড়ে যায়।",
      b: "ক্লাস্টার মডিউল একটি মাস্টার প্রসেস থেকে একাধিক চাইল্ড ওয়ার্কার তৈরি করে যা সার্ভারের সব সিপিইউ কোর ব্যবহার করে। ফলে মাল্টি-কোর প্রসেসরের শতভাগ ক্ষমতা কাজে লাগিয়ে অ্যাপ্লিকেশনের গতি বহুগুণ বৃদ্ধি পায়।",
      e: "Because a single Node.js instance utilizes only one CPU core, the Cluster module forks multiple worker processes sharing a common server port. Master processes distribute incoming connections across workers via OS round-robin balancing, maximizing multicore server hardware.",
      code: "if (cluster.isPrimary) {\n  os.cpus().forEach(() => cluster.fork());\n} else {\n  app.listen(3000);\n}"
    },
    {
      lvl: "lvl2",
      q: "Worker Threads (`worker_threads` module) বনাম Cluster Module-এর মধ্যে পার্থক্য কী?",
      m: "Cluster Module সম্পূর্ণ আলাদা আলাদা আলাদা অপারেটিং সিস্টেম প্রসেস তৈরি করে (যার প্রতিটি নিজস্ব মেমোরি ও নিজস্ব ইভেন্ট লুপ থাকে)। আর `Worker Threads` একই প্রসেসের ভেতরে একাধিক থ্রেড তৈরি করে যারা একই মেমোরি স্পেস (`SharedArrayBuffer`) শেয়ার করতে পারে। ক্লাস্টার মূলত HTTP রিকোয়েস্ট লোড হ্যান্ডেল করার জন্য, আর Worker Threads হলো ভারী CPU-ইনটেনসিভ টাস্ক (যেমন ক্রিপ্টোগ্রাফি, ইমেজ রিসাইজিং, মেশিন লার্নিং বা বিশাল হিসাব) মেইন থ্রেড থেকে আলাদা ব্যাকগ্রাউন্ড থ্রেডে চালানোর জন্য।",
      b: "ক্লাস্টার আলাদা অপারেটিং সিস্টেম প্রসেস তৈরি করে আলাদা মেমোরিতে চলে যা নেটওয়ার্ক স্কেলিংয়ের জন্য উপযুক্ত। অন্যদিকে ওয়ার্কার থ্রেডস একই প্রসেসের ভেতরে মেমোরি শেয়ার করে চলে যা ভারী হিসাব-নিকাশ ও সিপিইউ ইনটেনসিভ কাজ সামলাতে সেরা।",
      e: "Cluster spawns isolated OS processes with independent memory spaces to scale network concurrency. Worker Threads run within the same OS process, sharing heap memory via ArrayBuffers, specifically engineered to offload heavy CPU-bound computations without blocking the event loop.",
      tip: "HTTP স্কেলিংয়ের জন্য Cluster/PM2 এবং হেভি ম্যাথমেটিক্স বা ইমেজ প্রসেসিংয়ের জন্য Worker Threads বেছে নেওয়া উচিত।"
    },
    {
      lvl: "lvl2",
      q: "Libuv Thread Pool কী এবং ডিফল্ট সাইজ ৪ থেকে কীভাবে বাড়ানো যায় (`UV_THREADPOOL_SIZE`)?",
      m: "Libuv ব্যাকগ্রাউন্ডে অ্যাসিনক্রোনাস কাজ পরিচালনার জন্য একটি অভ্যন্তরীণ থ্রেড পুল রাখে। ফাইল সিস্টেম অপারেশন (`fs`), ডিএনএস লুকআপ (`dns.lookup`), এবং কিছু ক্রিপ্টো ফাংশন (`crypto.pbkdf2`) এই থ্রেড পুলে এক্সিকিউট হয়। ডিফল্টভাবে এর সাইজ থাকে ৪টি থ্রেড। যদি একসাথে ৫টি ভারী ক্রিপ্টো কল আসে, ৫ম কলটিকে থ্রেড ফাঁকা হওয়া পর্যন্ত অপেক্ষা করতে হয়। সার্ভার বুটের শুরুতে `process.env.UV_THREADPOOL_SIZE = 128` (সর্বোচ্চ ১২৮) দিয়ে এটি বাড়ানো যায়।",
      b: "লিবইউভি ফাইল সিস্টেম এবং ক্রিপ্টোগ্রাফির মতো কাজের জন্য ডিফল্ট ৪টি ব্যাকগ্রাউন্ড থ্রেড ব্যবহার করে। নোড অ্যাপ চালুর শুরুতে UV_THREADPOOL_SIZE পরিবেশ ভেরিয়েবলের মাধ্যমে এটি সর্বোচ্চ ১২৮ পর্যন্ত বাড়িয়ে সার্ভারের কর্মক্ষমতা বৃদ্ধি করা যায়।",
      e: "Libuv allocates a thread pool (default size of 4) to execute blocking operations like file system I/O, DNS queries, and CPU crypto tasks. Developers scale this up to a maximum of 128 by setting `UV_THREADPOOL_SIZE=64` before the Node process boots.",
      code: "process.env.UV_THREADPOOL_SIZE = 64;"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Node.js-এ 'Event Loop Lag' কী এবং প্রোডাকশনে এটি কীভাবে রিয়েল-টাইমে মনিটর ও অ্যালার্ট করা হয়?",
      m: "Event Loop Lag হলো যখন কোনো সিনক্রোনাস ভারী কাজ মেইন থ্রেডকে দীর্ঘক্ষণ ব্যস্ত রাখে, ফলে পরবর্তী টাইমার বা I/O কলব্যাক এক্সিকিউট হতে অতিরিক্ত দেরি হয়। এটি মনিটর করার জন্য নোডের বিল্ট-ইন `perf_hooks` মডিউলের `monitorEventLoopDelay()` ব্যবহার করা হয়। এটি হিস্টোগ্রাম আকারে প্রতি মিলিসেকেন্ডের ল্যাগ মাপে। প্রোডাকশনে যদি গড় ল্যাগ ১০০ms অতিক্রম করে, Prometheus বা Datadog মেট্রিক্সে অ্যালার্ট ট্রিগার করে স্বয়ংক্রিয়ভাবে নতুন সার্ভার ইনস্ট্যান্স স্পন করতে হয়।",
      b: "ইভেন্ট লুপ ল্যাগ নির্দেশ করে মেইন থ্রেড ব্লক থাকার কারণে পরবর্তী কাজের বিলম্বের পরিমাণ। perf_hooks এর monitorEventLoopDelay দিয়ে রিয়েল-টাইম ল্যাগ মেপে প্রোমিথিউসের মাধ্যমে সার্ভার মনিটরিং ও স্কেলিং নিশ্চিত করা হয়।",
      e: "Event Loop Lag measures the delay between when an event is scheduled and when it actually executes due to main-thread blockage. Profile it via `perf_hooks.monitorEventLoopDelay()`, feeding histogram percentiles into Prometheus to trigger automated alerts upon spikes.",
      code: "import { monitorEventLoopDelay } from 'perf_hooks';\nconst h = monitorEventLoopDelay({ resolution: 20 });\nh.enable();\n// Read h.mean / 1e6 (lag in milliseconds)"
    },
    {
      lvl: "lvl3",
      q: "Node.js-এ V8 Heap Memory সীমা কী এবং `--max-old-space-size` দিয়ে আউট-অব-মেমোরি (OOM) ক্র্যাশ কীভাবে আটকাবে?",
      m: "৬৪-বিট সিস্টেমে নোড জেএসের V8 হিপ সাইজের ডিফল্ট সীমা প্রায় ১.৪ GB থেকে ২ GB। কোনো বড় রিপোর্ট বা ডেটাবেজ ডাম্প মেমোরিতে আনলে `FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory` এরর দিয়ে প্রসেস ক্র্যাশ করে। সমাধান: (১) অ্যাপ চালু করার সময় `node --max-old-space-size=4096 server.js` দিয়ে হিপ সাইজ ৪GB বা ৮GB-তে বৃদ্ধি করা। (২) আর্কিটেকচারালি পুরো ডেটা অ্যারেতে না এনে স্ট্রিম বা কার্সর দিয়ে প্রসেস করা।",
      b: "ডিফল্ট মেমোরি সীমা প্রায় ২ জিবি। বেশি ডাটা প্রসেস করতে গিয়ে ওওএম (OOM) ক্র্যাশ এড়াতে নোড কমান্ডে --max-old-space-size ফ্ল্যাগ দিয়ে মেমোরি বাড়ানো যায় অথবা স্ট্রিম ব্যবহারের মাধ্যমে মেমোরি খরচ স্থায়ীভাবে নিয়ন্ত্রণে রাখা যায়।",
      e: "Node's default V8 heap caps around 1.4-2GB on 64-bit platforms. Pass `--max-old-space-size=4096` to allocate 4GB of heap. Structurally, refactor monolithic in-memory array fetches into database streams to bypass heap ceilings.",
      code: "node --max-old-space-size=4096 dist/server.js"
    },
    {
      lvl: "lvl3",
      q: "Graceful Shutdown কী এবং প্রোডাকশনে সার্ভার ডাউন বা রিস্টার্টের সময় চলমান কানেকশন ডেটা নষ্ট হওয়া কীভাবে রোধ করবে?",
      m: "Graceful Shutdown নিশ্চিত করে যে যখন সার্ভার `SIGTERM` বা `SIGINT` সিগন্যাল পায় (যেমন ডেপ্লয়মেন্ট বা কনটেইনার কিল), তখন সাথে সাথে প্রসেস বন্ধ না করে: (১) নতুন ইনকামিং HTTP রিকোয়েস্ট গ্রহণ বন্ধ করে (`server.close()`), (২) ইতিমধ্যে চলমান কারেন্ট রিকোয়েস্ট ও পেমেন্ট প্রসেস শেষ করার জন্য নির্দিষ্ট গ্রেস পিরিয়ড (যেমন ১০ সেকেন্ড) দেয়, (৩) ডেটাবেজ পুল ও রেডিস কানেকশন নিরাপদে ক্লোজ করে (`prisma.$disconnect()`), এবং শেষে ক্লিনভাবে `process.exit(0)` এক্সিকিউট করে।",
      b: "গ্রেসফুল শাটডাউন নিশ্চিত করে যে ডেপ্লয়মেন্টের সময় চলমান কোনো পেমেন্ট বা রিকোয়েস্ট মাঝপথে নষ্ট না হয়। নতুন কানেকশন বন্ধ করে চলমান কাজ শেষ হওয়া পর্যন্ত অপেক্ষা করে ডাটাবেজ সুরক্ষিতভাবে ডিসকানেক্ট করে প্রসেস বন্ধ করা হয়।",
      e: "Graceful Shutdown intercepts OS termination signals (`SIGTERM`, `SIGINT`). It ceases accepting new HTTP connections via `server.close()`, drains in-flight requests within a timeout window, closes database pools and Redis sockets cleanly, and exits via `process.exit(0)`.",
      code: "process.on('SIGTERM', async () => {\n  server.close(async () => {\n    await db.$disconnect();\n    process.exit(0);\n  });\n});"
    },
    {
      lvl: "lvl3",
      q: "Child Process মডিউলের ৪টি পদ্ধতি (`exec`, `execFile`, `spawn`, `fork`)-এর মধ্যে সূক্ষ্ম পার্থক্য কী?",
      m: "(১) `exec`: একটি শেল ওপেন করে কমান্ড রান করে এবং পুরো আউটপুট মেমোরি বাফারে জমা করে (ম্যাক্স ২০০KB ডিফল্ট, কমান্ড ইনজেকশনের ঝুঁকি থাকে)। (২) `execFile`: কোনো শেল ছাড়াই সরাসরি এক্সিকিউটেবল ফাইল রান করে (নিরাপদ)। (৩) `spawn`: বিশাল আউটপুট স্ট্রিম আকারে চাঙ্ক বাই চাঙ্ক ফেরত দেয় (লং-রানিং প্রসেসের জন্য সেরা)। (৪) `fork`: একটি স্পেশাল স্পন যা নতুন নোড জেএস প্রসেস তৈরি করে এবং প্যারেন্ট-চাইল্ডের মধ্যে দ্বিমুখী আইপিসি (IPC - Inter-Process Communication) চ্যানেল খুলে মেসেজ আদান-প্রদান করতে দেয়।",
      b: "exec শেল কমান্ড বাফারে চালায়, execFile সরাসরি বাইনারি চালায়, spawn স্ট্রিম আকারে বড় আউটপুট হ্যান্ডেল করে এবং fork নতুন নোড প্রসেস খুলে প্যারেন্টের সাথে আইপিসি মেসেজিং চ্যানেলের মাধ্যমে যোগাযোগ স্থাপন করে।",
      e: "exec buffers output from a shell (injection risk, buffer limits). execFile executes binaries directly without a sub-shell. spawn streams large outputs chunk-by-chunk for long-running processes. fork spawns child Node instances with a dedicated IPC message bridge.",
      tip: "বড় ব্যাকআপ স্ক্রিপ্টে exec ব্যবহার না করে spawn ব্যবহার করার কথা বলা মেমোরি সেফটির প্রমাণ দেয়।"
    },
    {
      lvl: "lvl3",
      q: "Node.js Diagnostic Profiling: `node --prof` এবং Chrome DevTools Inspector দিয়ে প্রোডাকশন CPU স্পাইক কীভাবে ডিবাগ করবে?",
      m: "আমরা নোড প্রসেস রান করব `node --inspect=0.0.0.0:9229 server.js` দিয়ে। এরপর ক্রোম ব্রাউজারে `chrome://inspect` ওপেন করে নোড প্রসেসের সাথে কানেক্ট করব। এরপর 'Profiler' ট্যাবে গিয়ে CPU Profile রেকর্ড করব। 'Flame Graph' এবং 'Heavy (Bottom Up)' ভিউ চেক করে দেখতে পাব কোন নির্দিষ্ট ফাংশনটি ৯৯% CPU সাইকেল নষ্ট করছে (যেমন কোনো ভুল রেজাক্স বা ইনফাইনাইট লুপ)। ফিক্স করে সাথে সাথে হট রিলোড টেস্ট করা যায়।",
      b: "ক্রোম ইন্সপেক্টরের সাহায্যে নোড প্রসেসের সাথে যুক্ত হয়ে সিপিইউ প্রোফাইল ও ফ্লেইম গ্রাফ রেকর্ড করে সুনির্দিষ্ট ফাংশনটি শনাক্ত করা যায় যা মেইন থ্রেডকে ব্লক করে রেখেছিল।",
      e: "Launch Node with `--inspect` and connect via Chrome DevTools (`chrome://inspect`). Trigger CPU profiling under heavy load to generate Flame Graphs, immediately isolating unoptimized synchronous loops, regex backtracking, or CPU bottlenecks.",
      code: "node --inspect --prof server.js\nnode --prof-process isolate-*.log > processed.txt"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "একটি এপিআইতে বড় PDF বা এক্সেল রিপোর্ট জেনারেট করার সময় পুরো নোড সার্ভার ৫ সেকেন্ডের জন্য ফ্রিজ হয়ে অন্যান্য সব ইউজারের রিকোয়েস্ট ব্লক হয়ে যায়। কীভাবে আর্কিটেকচারাল সমাধান করবে?",
      m: "যেহেতু পিডিএফ জেনারেট একটি ভারী CPU-ইনটেনসিভ টাস্ক, এটি নোডের মেইন ইভেন্ট লুপকে ব্লক করে ফেলে। সমাধান: (১) এই কাজটিকে মেইন থ্রেড থেকে সরিয়ে একটি `Worker Thread` অথবা চাইল্ড প্রসেসে হ্যান্ডেল করব। (২) আরও উন্নত এন্টারপ্রাইজ সমাধান হলো BullMQ (Redis-backed Queue) দিয়ে একটি ব্যাকগ্রাউন্ড জব ওয়ার্কার সার্ভিস তৈরি করা। এপিআই তাৎক্ষণিক `202 Accepted` ও `jobId` রিটার্ন করবে, এবং ব্যাকগ্রাউন্ড ওয়ার্কার পিডিএফ বানিয়ে ক্লাউড স্টোরেজে আপলোড করে নোটিফিকেশন পাঠাবে।",
      b: "সিপিইউ ব্লকিং দূর করতে পিডিএফ তৈরির কাজটি মেইন থ্রেড থেকে সরিয়ে বুলএমকিউ (BullMQ) ও রেডিসের সাহায্যে ব্যাকগ্রাউন্ড জব ওয়ার্কারে পাঠিয়ে দিতে হবে। এপিআই তাৎক্ষণিক জব আইডি ফেরত দেবে এবং মেইন সার্ভার সম্পূর্ণ মুক্ত থাকবে।",
      e: "Heavy PDF generation starves the event loop. Decouple it asynchronously by enqueuing jobs to BullMQ (Redis queue). Dedicated worker processes or Worker Threads generate the PDF out-of-band and emit webhooks/SSE upon completion.",
      code: "await reportQueue.add('generate-pdf', { tenantId, reportType });\nres.status(202).json({ success: true, message: 'Processing in background' });"
    },
    {
      lvl: "situation",
      q: "নোড সার্ভারে মেমোরি প্রতিনিয়ত বৃদ্ধি পেয়ে প্রতিদিন রাতে ২GB হয়ে ক্র্যাশ করছে (Memory Leak)। কীভাবে রুট কজ ট্র্যাক করে ফিক্স করবে?",
      m: "ট্র্যাকিং স্টেপস: (১) নোড রানটাইমে `heapdump` বা `v8.writeHeapSnapshot()` ব্যবহার করে নির্দিষ্ট ব্যবধানে ৩টি মেমোরি স্ন্যাপশট নেব। (২) ক্রোম ডেভটুলসে স্ন্যাপশট লোড করে 'Objects allocated between snapshots' তুলনা করব। (৩) সাধারণত নোডে মেমোরি লিক হয়: গ্লোবাল অবজেক্টে ক্যাশ ডাটা আনলিমিটেড পুশ করা, আনরিমুভড `eventEmitter.on()` লিসেনার্স, অথবা ক্লোজ না হওয়া ডাটাবেজ কার্সর। (৪) ইন-মেমোরি ক্যাশের জন্য `lru-cache` (ম্যাক্স আইটেম লিমিট ও টিটিএল সহ) ব্যবহার করব।",
      b: "মেমোরি স্ন্যাপশট নিয়ে ক্রোম ডেভটুলসে বিশ্লেষণ করে আনলিমিটেড গ্লোবাল অ্যারে বা আনরিমুভড ইভেন্ট লিসেনার শনাক্ত করতে হবে। মেমোরিতে সরাসরি ডাটা জমানো বন্ধ করে নির্দিষ্ট সাইজের LRU ক্যাশ ব্যবহার করতে হবে।",
      e: "Capture heap snapshots via `v8.writeHeapSnapshot()` before and during memory spikes. Compare them in Chrome DevTools to locate uncollected references (often unbounded global caches, leaked event listeners, or unclosed database cursors), refactoring caches to use LRU with TTL bounds.",
      code: "import v8 from 'v8';\nfs.writeFileSync('heap.heapsnapshot', v8.getHeapSnapshot());"
    },
    {
      lvl: "situation",
      q: "ব্যবহারকারী একটি ২GB সাইজের ভিডিও ফাইল আপলোড করতে গিয়ে পুরো নোড সার্ভার `JavaScript heap out of memory` দিয়ে ক্র্যাশ করল। কীভাবে স্ট্রিম দিয়ে ফিক্স করবে?",
      m: "কারণ ফাইলটিকে সাধারণ `fs.readFile()` বা ইন-মেমোরি বাফার হিসেবে রিড করা হয়েছিল। সমাধান: কখনোই পুরো ফাইলকে মেমোরিতে লোড করব না। আমরা `busboy` বা `multer` (ডিস্ক/ক্লাউড স্ট্রিমিং মোডে) ব্যবহার করব এবং ইনকামিং HTTP রিকোয়েস্টের র স্ট্রিমকে সরাসরি AWS S3 বা লোকাল ডিস্কের রাইট স্ট্রিমে পাইপ (`pipeline`) করব। এর ফলে ফাইল ২GB হোক বা ২০GB, নোড সার্ভারের মেমোরি মাত্র ২০–৩০ মেগাবাইটের বেশি খরচ হবে না।",
      b: "বড় ফাইল কখনো মেমরিতে বাফার করা যাবে না। busboy লাইব্রেরি দিয়ে ইনকামিং এইচটিটিপি রিকোয়েস্টকে সরাসরি স্ট্রিম আকারে ডিস্ক বা অ্যামাজন এসথ্রিতে পাইপ করতে হবে, ফলে মেমোরি খরচ শূন্যের কোঠায় নেমে আসবে।",
      e: "Avoid buffering file uploads in memory. Stream incoming multipart form payloads via `busboy` or streaming Multer directly into disk or S3 write streams using `stream.pipeline()`, keeping heap usage constant under 30MB regardless of file magnitude.",
      code: "await pipeline(req, parseMultipartStream, s3UploadStream);"
    },
    {
      lvl: "situation",
      q: "কোডে কোনো একটি আনহ্যান্ডেলড প্রমিজ রিজেকশন বা এক্সেপশন আসায় নোড সার্ভার সাথে সাথে বন্ধ হয়ে যাচ্ছে (Crash)। কীভাবে সম্পূর্ণ সার্ভারকে ক্র্যাশ-প্রুফ করবে?",
      m: "সমাধান: (১) সেন্ট্রালাইজড ট্র্যাকিংয়ের জন্য `process.on('uncaughtException')` এবং `process.on('unhandledRejection')` লিসেনার যোগ করব যা এরর লগ করে গ্রেসফুল শাটডাউন চালাবে। (২) এক্সপ্রেস রুটে Express 5 ব্যবহার করব যা অ্যাসিনক্রোনাস এরর নিজে থেকেই গ্লোবাল এরর হ্যান্ডলারে পাস করে (অথবা `express-async-errors`)। (৩) প্রসেস ম্যানেজমেন্টে PM2 বা Docker ব্যবহার করব যা কোনো অপ্রত্যাশিত ক্র্যাশে মিলি-সেকেন্ডে অ্যাপকে অটো-রিস্টার্ট করে।",
      b: "সার্ভার ক্র্যাশ বন্ধ করতে uncaughtException এবং unhandledRejection গ্লোবাল লিসেনার রাখতে হবে। এক্সপ্রেস এপিআইতে অ্যাসিনক্রোনাস এরর হ্যান্ডলার নিশ্চিত করতে হবে এবং ব্যাকগ্রাউন্ডে PM2 বা ডকার দিয়ে অটো-রিস্টার্ট সচল রাখতে হবে।",
      e: "Trap unexpected crashes by registering listeners for `uncaughtException` and `unhandledRejection`. Utilize Express 5 or `express-async-errors` to route async rejections to middleware, paired with PM2 process managers to ensure instant automatic restarts.",
      code: "process.on('unhandledRejection', (reason, promise) => {\n  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);\n});"
    },
    {
      lvl: "situation",
      q: "একটি ডেটাবেজ রিপোর্ট তৈরিতে ১০ হাজার রেকর্ড আনতে গিয়ে এপিআই রেসপন্স ১০ সেকেন্ড আটকে থাকছে। নোড লেয়ারে কীভাবে ডেটা স্ট্রিম করে রেসপন্স ইনস্ট্যান্ট করবে?",
      m: "সমাধান: পুরো ১০ হাজার রেকর্ড একসাথে অ্যারেতে ফেচ করে `res.json(records)` না করে আমরা ডেটাবেজ কার্সর (Database Cursor / Stream) ব্যবহার করব। PostgreSQL বা MongoDB কার্সর থেকে এক একটি রেকর্ড আসার সাথে সাথে `JSONStream.stringify()` দিয়ে সরাসরি `res` (যা একটি Writable Stream) এ রাইট করতে থাকব। এর ফলে ক্লায়েন্ট ১ সেকেন্ডের আগেই প্রথম রেকর্ড পাওয়া শুরু করে এবং নোড সার্ভারের RAM সম্পূর্ণ ফাঁকা থাকে।",
      b: "একসাথে সব ডাটা না এনে ডাটাবেজ কার্সরের সাহায্যে স্ট্রিম আকারে রেকর্ডগুলো ক্লায়েন্টের এইচটিটিপি রেসপন্সে পাইপ করতে হবে। এতে ক্লায়েন্ট তৎক্ষণাৎ প্রথম ডেটা পাওয়া শুরু করে এবং সার্ভারের কোনো মেমোরি অপচয় হয় না।",
      e: "Stream database records using cursors (e.g., Prisma cursor, Mongoose stream, or pg-query-stream) piped directly through a Transform stream into the HTTP `res` writable sink, drastically shrinking TTFB and memory usage.",
      code: "const cursor = db.orders.find().cursor();\ncursor.pipe(JSONStream.stringify()).pipe(res);"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর ব্যাকএন্ডে শত শত ক্যাশ কাউন্টারের সেলস এন্ট্রি প্রসেস করার সময় Node.js ইভেন্ট লুপ ব্লকিং কীভাবে সম্পূর্ণ ০% এ নামিয়ে এনেছিলে?",
      m: "দোকানি সিস্টেমে আমরা ৩টি আর্কিটেকচারাল রুল মেনে চলেছি: (১) কোনো সিনক্রোনাস ক্রিপ্টো বা ফাইল অপারেশন (`fs.readFileSync`, `bcrypt.hashSync`) নিষিদ্ধ করেছি—সবসময় অ্যাসিঙ্ক নন-ব্লকিং মেথড ব্যবহার করেছি। (২) ইনভয়েস ভ্যাট ও ডিসকাউন্ট ক্যালকুলেশনকে লিনিয়ার টাইম জটিলতায় অপটিমাইজ করেছি। (৩) থার্মাল প্রিন্টার বাইনারি কমান্ড ফরম্যাটিং এবং ব্যাকগ্রাউন্ড নোটিফিকেশন BullMQ ওয়ার্কার থ্রেডে পাঠিয়ে দিয়েছি। ফলে মেইন ইভেন্ট লুপের ল্যাগ সর্বদা ৫ মিলিসেকেন্ডের নিচে ছিল।",
      b: "দোকানি সিস্টেমে আমরা কোনো সিঙ্ক্রোনাস কোড ব্যবহার করিনি। জটিল হিসাব-নিকাশ অপটিমাইজ করে ভারী প্রিন্ট ও ব্যাকআপ টাস্কগুলোকে আলাদা জব কিউতে পাঠিয়ে দেওয়ার ফলে ইভেন্ট লুপ সর্বদা মুক্ত ছিল এবং বিলিংয়ে কোনো বিলম্ব ঘটেনি।",
      e: "Banished event loop blocking in Dokani POS by enforcing strict asynchronous non-blocking APIs (zero Sync methods), optimizing invoice calculation pipelines to O(N), and delegating PDF thermal parsing tasks to isolated background workers.",
      tip: "কখনোই প্রোডাকশন কোডে `fs.readFileSync` বা `bcrypt.hashSync` লিখবে না—এই পয়েন্টটি ইন্টারভিউয়াররা সবসময় চেক করে।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর রিয়েল-টাইম ক্যাশ কাউন্টার ও ইনভেন্টরি আপডেটের জন্য Socket.io ক্লাস্টার আর্কিটেকচার Redis Adapter দিয়ে কীভাবে স্কেল করেছিলে?",
      m: "যখন মাল্টিপল Node.js ইনস্ট্যান্স PM2 বা ডকারে রান করে, একজন ক্যাশিয়ার সার্ভার ১-এ কানেক্টেড এবং অন্যজন সার্ভার ২-এ। সাধারণ সকেট ইভেন্ট পাঠালে অন্য সার্ভারের ক্লায়েন্ট আপডেট পেত না। সমাধান: আমরা `@socket.io/redis-adapter` ব্যবহার করেছি। যখনই একটি সেলস আপডেট আসে, সকেট সার্ভার রেডিসের Pub/Sub চ্যানেলে মেসেজ ব্রডকাস্ট করে। রেডিস মুহূর্তের মধ্যে ক্লাস্টারের বাকি সব নোড সার্ভারে ইভেন্ট ছড়িয়ে দেয় এবং সব ক্যাশ কাউন্টারে সাথে সাথে স্টক আপডেট হয়ে যায়।",
      b: "একাধিক সার্ভারে সকেট সিঙ্ক বজায় রাখতে আমরা রেডিস অ্যাডাপ্টার ব্যবহার করেছি। যেকোনো একটি সার্ভারে বিক্রি সম্পন্ন হলে রেডিস পাব/সাব চ্যানেলের মাধ্যমে তাৎক্ষণিক অন্য সব সার্ভারের কানেক্টেড ক্যাশ কাউন্টারে স্টক পরিবর্তনের নোটিফিকেশন পৌঁছে যেত।",
      e: "Scaled multi-process Socket.io across clustered Node.js containers using `@socket.io/redis-adapter`. State notifications published by any worker are broadcast over Redis Pub/Sub, synchronizing real-time inventory counts across all active cash registers seamlessly.",
      code: "const { createAdapter } = require('@socket.io/redis-adapter');\nio.adapter(createAdapter(redisPubClient, redisSubClient));"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে ভিডিও লেকচার স্ট্রিমিংয়ে HTTP 206 Partial Content এবং Node.js Stream কীভাবে আর্কিটেক্ট করেছিলে?",
      m: "ভিডিও প্লেয়ারে ইউজার যখন টেনে সামনে নেয় (Seek), পুরো ১GB ভিডিও ডাউনলোড হওয়া অযৌক্তিক। আমরা রিকোয়েস্টের `Range: bytes=start-end` হেডার রিড করে `fs.createReadStream(videoPath, { start, end })` দিয়ে নির্দিষ্ট চাঙ্কটি স্ট্রিম করেছি এবং রেসপন্স হেডার দিয়েছি `HTTP/206 Partial Content` সহ `Content-Range` ও `Accept-Ranges: bytes`। এর ফলে ছাত্ররা চোখের পলকে যেকোনো সেকেন্ডে ভিডিও স্ক্রাব করতে পেরেছে এবং সার্ভারের ব্যান্ডউইথ ৯০% বেঁচে গেছে।",
      b: "পিটিটিএবিডি ভিডিও স্ট্রিমিংয়ে আমরা এইচটিটিপি ২০৬ পার্সিয়াল কন্টেন্ট এবং রেঞ্জ হেডার ভিত্তিক স্ট্রিম তৈরি করেছিলাম। ফলে ব্যবহারকারী ভিডিওর মাঝখানে টেনে নিলেও কেবল সেই অংশটুকু ডাউনলোড হতো, যা ৯৫% ব্যান্ডউইথ সাশ্রয় করেছিল।",
      e: "Architected video streaming in PTTABD via HTTP 206 Partial Content. Inspecting client `Range` headers, we dynamically spawned bounded `fs.createReadStream()` slices delivering strictly requested byte ranges for instant video scrubbing without buffering full files.",
      code: "const stream = fs.createReadStream(videoPath, { start, end });\nres.writeHead(206, { 'Content-Range': `bytes ${start}-${end}/${fileSize}`, 'Accept-Ranges': 'bytes' });\nstream.pipe(res);"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর ডেইলি ডেটাবেজ ব্যাকআপ স্বয়ংক্রিয়ভাবে জি-জিপ (Gzip) কম্প্রেস করে ক্লাউড স্টোরেজে পুশ করতে Node.js পাইপলাইন কীভাবে লিখেছিলে?",
      m: "আমরা `child_process.spawn('pg_dump')` কল করে সরাসরি ডাটাবেজ ডাম্পের আউটপুট স্ট্রিম ধরি। এরপর `zlib.createGzip()` ট্রান্সফর্ম স্ট্রিম দিয়ে অন-দ্য-ফ্লাই কম্প্রেস করি এবং AWS S3 Multipart Upload স্ট্রিম দিয়ে ক্লাউডে পাঠাই। পুরো পাইপলাইনে লোকাল সার্ভারের হার্ডডিস্কে কোনো বড় ফাইল সেভ করতে হয়নি; এক প্রান্ত দিয়ে ডাটা ডাম্প হয়েছে, মাঝখানে কম্প্রেস হয়ে অন্য প্রান্ত দিয়ে ক্লাউডে আপলোড হয়ে গেছে—জিরো ডিস্ক স্পেস স্পাইক!`,",
      b: "দোকানি ব্যাকআপ সিস্টেমে আমরা pg_dump আউটপুটকে সরাসরি zlib gzip ট্রান্সফর্মে পাঠিয়ে ক্লাউড স্টোরেজে আপলোড করেছি। ডিস্কে কোনো ফাইল তৈরি না করেই সরাসরি মেমোরি স্ট্রিমের মাধ্যমে অতি দ্রুত ব্যাকআপ সম্পন্ন হতো।",
      e: "Engineered zero-disk-footprint backups in Dokani by piping `pg_dump` standard output directly through `zlib.createGzip()` into an AWS S3 managed upload stream, bypassing ephemeral server disk capacity bottlenecks completely.",
      tip: "ডিস্কে ফাইল রাইট না করে সরাসরি অন-দ্য-ফ্লাই পাইপলাইন ব্যাকআপ সিনিয়র ডেভঅপ্স ও ব্যাকএন্ড আর্কিটেকচারের অসাধারণ নমুনা।"
    },
    {
      lvl: "realworld",
      q: "Node.js অ্যাপ্লিকেশনকে প্রোডাকশনে রান করার সময় `NODE_ENV=production` ফ্ল্যাগ অন করার ইন্টারনাল টেকনিক্যাল সুবিধাসমূহ কী কী?",
      m: "অনেক ডেভেলপার মনে করে এটি শুধু একটি পরিবেশ ভেরিয়েবল, কিন্তু টেকনিক্যালি: (১) Express.js প্রোডাকশন মোডে ভিউ টেমপ্লেট এবং CSS ফাইলগুলো মেমোরিতে প্রাক-ক্যাশ করে রাখে যা প্রতি রিকোয়েস্টে ডিস্ক রিড বন্ধ করে। (২) এরর রেসপন্সে ইন্টারনাল স্ট্যাক ট্রেস এবং সংবেদনশীল সোর্স কোড পাথ ক্লায়েন্টে পাঠানো বন্ধ করে (সিকিউরিটি)। (৩) নোডের বহু থার্ড-পার্টি ডিপেনডেন্সি প্রোডাকশন ফ্ল্যাগ দেখলে ডিবাগিং লগিং বন্ধ করে পারফরম্যান্স প্রায় ৩ গুণ বাড়িয়ে দেয়।",
      b: "NODE_ENV=production দিলে এক্সপ্রেস ফাইল ক্যাশ করে ডিস্ক রিড বন্ধ করে, এরর স্ট্যাক ট্রেস লুকায় এবং থার্ড-পার্টি লাইব্রেরিগুলো বাড়তি ডিবাগিং বন্ধ করে সর্বোচ্চ গতি নিশ্চিত করে।",
      e: "Setting `NODE_ENV=production` triggers crucial optimizations: Express aggressively caches compiled view templates in memory, suppresses sensitive call stack disclosures in error responses, and prompts third-party packages to disable high-overhead debug logging, tripling throughput.",
      tip: "ইন্টারভিউতে 'Template caching' এবং 'Stack trace suppression' পয়েন্টগুলো বলবে।"
    }
  ]
};
