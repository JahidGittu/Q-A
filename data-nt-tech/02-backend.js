// NT Tech Innovation — 02. Backend Engineering Mastery (200 Questions - 25 per Topic across 5 Levels)
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.backend = {
  "id": "backend",
  "title": "Backend Engineering",
  "badge": "Node.js · Express · REST · TypeScript · Security",
  "icon": "⚙️",
  "topics": [
    {
      "id": "nodejs-event-loop",
      "name": "Node.js Core, Event Loop & Streams",
      "desc": "Node.js Architecture, Single Threaded Non-blocking I/O, Libuv, Event Loop Phases, Streams, Buffers, Worker Threads",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Node.js কী এবং এটি কীভাবে সিঙ্গেল-থ্রেডেড হয়েও হাজার হাজার সমসাময়িক (Concurrent) রিকোয়েস্ট হ্যান্ডেল করে?",
          "m": "Node.js হলো একটি ওপেন-সোর্স, ক্রস-প্ল্যাটফর্ম জাভাস্ক্রিপ্ট রানটাইম যা Chrome V8 ইঞ্জিনের ওপর নির্মিত। এর জাভাস্ক্রিপ্ট এক্সিকিউশন মেইন থ্রেড সিঙ্গেল-থ্রেডেড হলেও এটি Non-blocking Asynchronous I/O এবং Libuv লাইব্রেরির ওপর ভিত্তি করে চলে। যখন কোনো ফাইল রিড, ডাটাবেজ কোয়েরি বা নেটওয়ার্ক রিকোয়েস্ট আসে, নোড তা ওএস কার্নেল বা Libuv থ্রেড পুলে অফলোড করে দেয় এবং পরবর্তী রিকোয়েস্ট প্রসেস করতে থাকে। কাজ শেষ হলে ইভেন্ট লুপের মাধ্যমে কলব্যাক ফায়ার করে। ফলে মেইন থ্রেড কখনোই ব্লক হয় না।",
          "b": "নোড জেএস ক্রোম ভি-৮ ইঞ্জিনের ওপর তৈরি একটি নন-ব্লকিং অ্যাসিনক্রোনাস রানটাইম। এটি সিঙ্গেল-থ্রেডেড হলেও ফাইল ও নেটওয়ার্ক অপারেশনের ভারী কাজগুলো ওএস কার্নেল এবং লিবইউভি (Libuv) থ্রেড পুলে পাঠিয়ে দেয়। এর ফলে মেইন থ্রেড খালি থেকে প্রতি সেকেন্ডে হাজার হাজার রিকোয়েস্ট পরিচালনা করতে পারে।",
          "e": "Node.js is an asynchronous event-driven JavaScript runtime built on Chrome's V8 engine. While its JavaScript execution runs on a single main thread, it offloads I/O operations (file, database, sockets) to the underlying operating system kernel or Libuv thread pool via non-blocking system calls.",
          "tip": "ইন্টারভিউতে 'Non-blocking I/O' এবং 'Libuv thread pool' শব্দ দুটি অবশ্যই বলবে।"
        },
        {
          "lvl": "lvl1",
          "q": "Node.js Event Loop-এর প্রধান ফেজগুলো কী কী?",
          "m": "ইভেন্ট লুপের প্রধান ৬টি ফেজ ক্রমানুসারে চলে: (১) `Timers`: `setTimeout` এবং `setInterval` কলব্যাক রান হয়। (২) `Pending Callbacks`: কিছু সিস্টেম লেভেল এরর যেমন TCP ত্রুটির কলব্যাক চলে। (৩) `Idle, Prepare`: নোডের অভ্যন্তরীণ কাজ। (৪) `Poll`: নতুন I/O ইভেন্ট রিড করে এবং ইনকামিং কানেকশনের কলব্যাক চালায়। (৫) `Check`: `setImmediate` কলব্যাক এক্সিকিউট হয়। (৬) `Close Callbacks`: সকেট বা হ্যান্ডেল ক্লোজের কলব্যাক (যেমন `socket.on('close')`) চলে।",
          "b": "নোড জেএস ইভেন্ট লুপের প্রধান ধাপগুলো হলো: টাইমার্স (setTimeout), পেন্ডিং কলব্যাক্স, পোল (I/O অপারেশন), চেক (setImmediate), এবং ক্লোজ কলব্যাক্স। প্রতিটি ধাপ তার নিজস্ব কিউ থেকে কাজ সম্পন্ন করে পরবর্তী ধাপে যায়।",
          "e": "The Libuv Event Loop runs through discrete phases in order: (1) Timers (setTimeout/setInterval), (2) Pending Callbacks (deferred system I/O), (3) Idle/Prepare, (4) Poll (retrieves new I/O events), (5) Check (setImmediate), and (6) Close Callbacks (socket close events).",
          "code": "// Event loop cycle order: Timers -> Poll -> Check -> Close"
        },
        {
          "lvl": "lvl1",
          "q": "`process.nextTick()` এবং `setImmediate()`-এর মধ্যে পার্থক্য কী এবং কে আগে এক্সিকিউট হয়?",
          "m": "`process.nextTick()` কোনো ইভেন্ট লুপ ফেজের অংশ নয়; এটি টেকনিক্যালি একটি 'Microtask' যা বর্তমান অপারেশনের ঠিক পরেই এবং ইভেন্ট লুপ পরবর্তী কোনো ফেজে যাওয়ার আগেই সবার আগে এক্সিকিউট হয়! আর `setImmediate()` ইভেন্ট লুপের 'Check Phase'-এ এক্সিকিউট হয় (Poll ফেজের পরে)। তাই `process.nextTick()` সবসময় `setImmediate()`-এর আগে চলে।",
          "b": "process.nextTick() বর্তমান অপারেশনের ঠিক পরপরই এবং ইভেন্ট লুপের যেকোনো ফেজের আগে তৎক্ষণাৎ এক্সিকিউট হয়। অন্যদিকে setImmediate() ইভেন্ট লুপের চেক ফেজে রান হয়। সুতরাং nextTick সবসময় setImmediate এর চেয়ে বেশি অগ্রাধিকার পায়।",
          "e": "process.nextTick() resolves immediately after the current operation finishes and before the Event Loop advances to any other phase. In contrast, setImmediate() is queued in the Check phase of the Event Loop. Thus, nextTick always fires before setImmediate.",
          "code": "setImmediate(() => console.log('setImmediate'));\nprocess.nextTick(() => console.log('nextTick'));\n// Output: nextTick, then setImmediate"
        },
        {
          "lvl": "lvl1",
          "q": "Node.js Buffer কী এবং বাইনারি ডেটা হ্যান্ডলিংয়ে এর প্রয়োজন কেন?",
          "m": "শুদ্ধ জাভাস্ক্রিপ্ট মূলগতভাবে স্ট্রিং ও অবজেক্ট নিয়ে কাজ করত, কিন্তু কাঁচা বাইনারি স্ট্রিম (যেমন ফাইল, ছবি, নেটওয়ার্ক প্যাকেট) রিড করতে পারত না। `Buffer` হলো V8 ইঞ্জিনের মেমোরির বাইরে কাঁচা মেমোরি অ্যালোকেশন (Raw Binary Allocation) যা ফিক্সড সাইজের বাইট সিকোয়েন্স হ্যান্ডেল করে। ফাইল আপলোড, ক্রিপ্টোগ্রাফিক হ্যাশ তৈরি বা সকেট ডেটা প্রসেসিংয়ে বাফার অপরিহার্য।",
          "b": "বাফার হলো নোড জেএস-এর কাঁচা বাইনারি ডাটা সংরক্ষণের মেমোরি স্পেস যা সরাসরি ভি-৮ মেমরির বাইরে বরাদ্দ হয়। ইমেজ, ফাইল ও নেটওয়ার্ক প্যাকেট সরাসরি বাইট আকারে হ্যান্ডেল করতে বাফার ব্যবহৃত হয়।",
          "e": "Buffers represent raw binary memory allocated outside the V8 heap as fixed-length byte chunks. Node.js uses Buffers to manipulate binary octet streams during TCP socket communication, file system operations, and cryptographic hashing.",
          "code": "const buf = Buffer.from('Dokani POS', 'utf-8');\nconsole.log(buf); // <Buffer 44 6f 6b 61 6e 69 20 50 4f 53>"
        },
        {
          "lvl": "lvl1",
          "q": "CommonJS (`require` / `module.exports`) এবং ES Modules (`import` / `export`)-এর মধ্যে মূল পার্থক্য কী?",
          "m": "CommonJS হলো সিনক্রোনাস মডিউল সিস্টেম যা নোড জেএসের ট্র্যাডিশনাল স্ট্যান্ডার্ড; এটি রানটাইমে লোড হয় এবং কন্ডিশনাল স্টেটমেন্টের ভেতরেও `require()` করা যায়। আর ES Modules (ESM) হলো আধুনিক জাভাস্ক্রিপ্ট স্ট্যান্ডার্ড; এটি স্ট্যাটিকালি অ্যানালাইজড এবং অ্যাসিনক্রোনাসলি প্রাক-পার্স হয়, যার ফলে বিল্ডের সময় Tree-shaking এবং কোড অপটিমাইজেশন সম্ভব হয়। Node.js-এ ESM চালাতে `package.json`-এ `\"type\": \"module\"` অথবা `.mjs` এক্সটেনশন দিতে হয়।",
          "b": "কমনজেএস সিনক্রোনাস পদ্ধতিতে রানটাইমে মডিউল লোড করে এবং এটি নোডের পুরনো স্ট্যান্ডার্ড। ইএস মডিউল স্ট্যাটিক ও অ্যাসিনক্রোনাস পদ্ধতিতে কাজ করে, যা আধুনিক ট্রিশেকিং এবং কোড অপটিমাইজেশনে সাহায্য করে।",
          "e": "CommonJS (require/module.exports) is synchronous and evaluates modules dynamically at runtime. ES Modules (import/export) are parsed asynchronously and analyzed statically at compile-time, unlocking modern bundler tree-shaking and top-level await.",
          "tip": "আধুনিক ব্যাকএন্ডে টাইপস্ক্রিপ্টের সাথে ESM বা স্ট্যান্ডার্ড সিজেএস ট্রান্সপাইলেশন ব্যবহার ব্যাখ্যা করবে।"
        },
        {
          "lvl": "lvl2",
          "q": "Node.js Streams কী এবং ৪ ধরনের স্ট্রিম (Readable, Writable, Duplex, Transform) কীভাবে কাজ করে?",
          "m": "স্ট্রিম হলো বড় পরিমাণের ডেটাকে মেমোরিতে একবারে সম্পূর্ণ লোড না করে ছোট ছোট চাঙ্ক (Chunk) আকারে পর্যায়ক্রমে রিড বা রাইট করার মেকানিজম। (১) `Readable`: যেখান থেকে ডেটা পড়া হয় (যেমন `fs.createReadStream`). (২) `Writable`: যেখানে ডেটা লেখা হয় (যেমন `fs.createWriteStream`). (৩) `Duplex`: যা রিড ও রাইট উভয়ই করতে পারে (যেমন TCP Socket). (৪) `Transform`: এমন ডুপ্লেক্স যা ডেটা রিড করে রূপান্তর করে আউটপুট দেয় (যেমন `zlib.createGzip`).",
          "b": "স্ট্রিম বিশাল ফাইল বা ডাটাকে মেমরিতে সম্পূর্ণ না তুলে ছোট ছোট অংশে প্রসেস করে মেমোরি বাঁচায়। ৪ প্রকার স্ট্রিম: রিডেবল (পড়া), রাইটেবল (লেখা), ডুপ্লেক্স (উভয়ই), এবং ট্রান্সফর্ম (ডাটা রূপান্তর করে লেখা)।",
          "e": "Streams process continuous data in sequential chunks, eradicating high memory consumption. The four stream types are Readable (read source), Writable (destination sink), Duplex (bidirectional, like TCP sockets), and Transform (modifies data between read and write, like gzip).",
          "code": "const readable = fs.createReadStream('huge.log');\nconst writable = fs.createWriteStream('copy.log');\nreadable.pipe(writable); // Streams data chunk by chunk"
        },
        {
          "lvl": "lvl2",
          "q": "Stream Backpressure কী এবং `stream.pipe()` বা `pipeline()` কীভাবে মেমোরি ক্র্যাশ প্রতিরোধ করে?",
          "m": "Backpressure ঘটে যখন ডেটা রিড করার গতি (Producer) ডেটা রাইট করার গতির (Consumer) চেয়ে অনেক বেশি ফাস্ট হয়। যদি রাইটার স্লো ডিস্কে থাকে, তবে আন-রিটেন চাঙ্কগুলো RAM-এ জমতে জমতে একপর্যায়ে মেমোরি ওভারফ্লো হয়ে সার্ভার ক্র্যাশ করবে। `stream.pipe()` ইন্টারনালি রাইটারের বাফার পূর্ণ হলে রিডারকে পজ করে (`drain` ইভেন্ট না আসা পর্যন্ত)। আর `stream/promises`-এর `pipeline()` এরর হ্যান্ডলিং ও ক্লিনআপ সহ স্বয়ংক্রিয় ব্যাকপ্রেশার ম্যানেজ করে।",
          "b": "ব্যাকপ্রেশার হলো ডাটা পড়ার গতি লেখার গতির চেয়ে বেশি হওয়ার কারণে মেমোরি উপচে পড়ার অবস্থা। pipeline() বাফার পূর্ণ হলে সাময়িকভাবে পড়া বন্ধ রেখে লেখার পর পুনরায় চালু করে মেমোরি ক্র্যাশ হওয়া প্রতিরোধ করে।",
          "e": "Backpressure occurs when a fast readable stream overwhelms a slower writable sink, causing unbounded buffer accumulation in RAM. Using `pipeline()` pauses reading when the writable buffer fills, resuming upon the 'drain' event with safe error cleanup.",
          "code": "import { pipeline } from 'stream/promises';\nawait pipeline(fs.createReadStream('in.csv'), gzipTransform, fs.createWriteStream('out.gz'));"
        },
        {
          "lvl": "lvl2",
          "q": "Node.js Cluster Module কী এবং এটি মাল্টি-কোর সার্ভার আর্কিটেকচারে সিপিইউ ইউটিলাইজেশন কীভাবে বাড়ায়?",
          "m": "যেহেতু নোড জেএস সিঙ্গেল থ্রেডে চলে, একটি ৮-কোর প্রসেসরের সার্ভারে সাধারণ নোড অ্যাপ রান করলে বাকি ৭টি কোর অলস বসে থাকে। Cluster Module একটি মাস্টার প্রসেস তৈরি করে যা `cluster.fork()` কল করে মেশিনের প্রতিটি সিপিইউ কোরের জন্য একটি করে চাইল্ড ওয়ার্কার প্রসেস স্পন করে। প্রতিটি ওয়ার্কার একই সার্ভার পোর্ট (যেমন :3000) শেয়ার করে এবং নোডের ইন্টারনাল রাউন্ড-রবিন (Round-Robin) লোড ব্যালেন্সার ট্রাফিক ডিস্ট্রিবিউট করে, ফলে থ্রুপুট ৮ গুণ বেড়ে যায়।",
          "b": "ক্লাস্টার মডিউল একটি মাস্টার প্রসেস থেকে একাধিক চাইল্ড ওয়ার্কার তৈরি করে যা সার্ভারের সব সিপিইউ কোর ব্যবহার করে। ফলে মাল্টি-কোর প্রসেসরের শতভাগ ক্ষমতা কাজে লাগিয়ে অ্যাপ্লিকেশনের গতি বহুগুণ বৃদ্ধি পায়।",
          "e": "Because a single Node.js instance utilizes only one CPU core, the Cluster module forks multiple worker processes sharing a common server port. Master processes distribute incoming connections across workers via OS round-robin balancing, maximizing multicore server hardware.",
          "code": "if (cluster.isPrimary) {\n  os.cpus().forEach(() => cluster.fork());\n} else {\n  app.listen(3000);\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Worker Threads (`worker_threads` module) বনাম Cluster Module-এর মধ্যে পার্থক্য কী?",
          "m": "Cluster Module সম্পূর্ণ আলাদা আলাদা আলাদা অপারেটিং সিস্টেম প্রসেস তৈরি করে (যার প্রতিটি নিজস্ব মেমোরি ও নিজস্ব ইভেন্ট লুপ থাকে)। আর `Worker Threads` একই প্রসেসের ভেতরে একাধিক থ্রেড তৈরি করে যারা একই মেমোরি স্পেস (`SharedArrayBuffer`) শেয়ার করতে পারে। ক্লাস্টার মূলত HTTP রিকোয়েস্ট লোড হ্যান্ডেল করার জন্য, আর Worker Threads হলো ভারী CPU-ইনটেনসিভ টাস্ক (যেমন ক্রিপ্টোগ্রাফি, ইমেজ রিসাইজিং, মেশিন লার্নিং বা বিশাল হিসাব) মেইন থ্রেড থেকে আলাদা ব্যাকগ্রাউন্ড থ্রেডে চালানোর জন্য।",
          "b": "ক্লাস্টার আলাদা অপারেটিং সিস্টেম প্রসেস তৈরি করে আলাদা মেমোরিতে চলে যা নেটওয়ার্ক স্কেলিংয়ের জন্য উপযুক্ত। অন্যদিকে ওয়ার্কার থ্রেডস একই প্রসেসের ভেতরে মেমোরি শেয়ার করে চলে যা ভারী হিসাব-নিকাশ ও সিপিইউ ইনটেনসিভ কাজ সামলাতে সেরা।",
          "e": "Cluster spawns isolated OS processes with independent memory spaces to scale network concurrency. Worker Threads run within the same OS process, sharing heap memory via ArrayBuffers, specifically engineered to offload heavy CPU-bound computations without blocking the event loop.",
          "tip": "HTTP স্কেলিংয়ের জন্য Cluster/PM2 এবং হেভি ম্যাথমেটিক্স বা ইমেজ প্রসেসিংয়ের জন্য Worker Threads বেছে নেওয়া উচিত।"
        },
        {
          "lvl": "lvl2",
          "q": "Libuv Thread Pool কী এবং ডিফল্ট সাইজ ৪ থেকে কীভাবে বাড়ানো যায় (`UV_THREADPOOL_SIZE`)?",
          "m": "Libuv ব্যাকগ্রাউন্ডে অ্যাসিনক্রোনাস কাজ পরিচালনার জন্য একটি অভ্যন্তরীণ থ্রেড পুল রাখে। ফাইল সিস্টেম অপারেশন (`fs`), ডিএনএস লুকআপ (`dns.lookup`), এবং কিছু ক্রিপ্টো ফাংশন (`crypto.pbkdf2`) এই থ্রেড পুলে এক্সিকিউট হয়। ডিফল্টভাবে এর সাইজ থাকে ৪টি থ্রেড। যদি একসাথে ৫টি ভারী ক্রিপ্টো কল আসে, ৫ম কলটিকে থ্রেড ফাঁকা হওয়া পর্যন্ত অপেক্ষা করতে হয়। সার্ভার বুটের শুরুতে `process.env.UV_THREADPOOL_SIZE = 128` (সর্বোচ্চ ১২৮) দিয়ে এটি বাড়ানো যায়।",
          "b": "লিবইউভি ফাইল সিস্টেম এবং ক্রিপ্টোগ্রাফির মতো কাজের জন্য ডিফল্ট ৪টি ব্যাকগ্রাউন্ড থ্রেড ব্যবহার করে। নোড অ্যাপ চালুর শুরুতে UV_THREADPOOL_SIZE পরিবেশ ভেরিয়েবলের মাধ্যমে এটি সর্বোচ্চ ১২৮ পর্যন্ত বাড়িয়ে সার্ভারের কর্মক্ষমতা বৃদ্ধি করা যায়।",
          "e": "Libuv allocates a thread pool (default size of 4) to execute blocking operations like file system I/O, DNS queries, and CPU crypto tasks. Developers scale this up to a maximum of 128 by setting `UV_THREADPOOL_SIZE=64` before the Node process boots.",
          "code": "process.env.UV_THREADPOOL_SIZE = 64;"
        },
        {
          "lvl": "lvl3",
          "q": "Node.js-এ 'Event Loop Lag' কী এবং প্রোডাকশনে এটি কীভাবে রিয়েল-টাইমে মনিটর ও অ্যালার্ট করা হয়?",
          "m": "Event Loop Lag হলো যখন কোনো সিনক্রোনাস ভারী কাজ মেইন থ্রেডকে দীর্ঘক্ষণ ব্যস্ত রাখে, ফলে পরবর্তী টাইমার বা I/O কলব্যাক এক্সিকিউট হতে অতিরিক্ত দেরি হয়। এটি মনিটর করার জন্য নোডের বিল্ট-ইন `perf_hooks` মডিউলের `monitorEventLoopDelay()` ব্যবহার করা হয়। এটি হিস্টোগ্রাম আকারে প্রতি মিলিসেকেন্ডের ল্যাগ মাপে। প্রোডাকশনে যদি গড় ল্যাগ ১০০ms অতিক্রম করে, Prometheus বা Datadog মেট্রিক্সে অ্যালার্ট ট্রিগার করে স্বয়ংক্রিয়ভাবে নতুন সার্ভার ইনস্ট্যান্স স্পন করতে হয়।",
          "b": "ইভেন্ট লুপ ল্যাগ নির্দেশ করে মেইন থ্রেড ব্লক থাকার কারণে পরবর্তী কাজের বিলম্বের পরিমাণ। perf_hooks এর monitorEventLoopDelay দিয়ে রিয়েল-টাইম ল্যাগ মেপে প্রোমিথিউসের মাধ্যমে সার্ভার মনিটরিং ও স্কেলিং নিশ্চিত করা হয়।",
          "e": "Event Loop Lag measures the delay between when an event is scheduled and when it actually executes due to main-thread blockage. Profile it via `perf_hooks.monitorEventLoopDelay()`, feeding histogram percentiles into Prometheus to trigger automated alerts upon spikes.",
          "code": "import { monitorEventLoopDelay } from 'perf_hooks';\nconst h = monitorEventLoopDelay({ resolution: 20 });\nh.enable();\n// Read h.mean / 1e6 (lag in milliseconds)"
        },
        {
          "lvl": "lvl3",
          "q": "Node.js-এ V8 Heap Memory সীমা কী এবং `--max-old-space-size` দিয়ে আউট-অব-মেমোরি (OOM) ক্র্যাশ কীভাবে আটকাবে?",
          "m": "৬৪-বিট সিস্টেমে নোড জেএসের V8 হিপ সাইজের ডিফল্ট সীমা প্রায় ১.৪ GB থেকে ২ GB। কোনো বড় রিপোর্ট বা ডেটাবেজ ডাম্প মেমোরিতে আনলে `FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory` এরর দিয়ে প্রসেস ক্র্যাশ করে। সমাধান: (১) অ্যাপ চালু করার সময় `node --max-old-space-size=4096 server.js` দিয়ে হিপ সাইজ ৪GB বা ৮GB-তে বৃদ্ধি করা। (২) আর্কিটেকচারালি পুরো ডেটা অ্যারেতে না এনে স্ট্রিম বা কার্সর দিয়ে প্রসেস করা।",
          "b": "ডিফল্ট মেমোরি সীমা প্রায় ২ জিবি। বেশি ডাটা প্রসেস করতে গিয়ে ওওএম (OOM) ক্র্যাশ এড়াতে নোড কমান্ডে --max-old-space-size ফ্ল্যাগ দিয়ে মেমোরি বাড়ানো যায় অথবা স্ট্রিম ব্যবহারের মাধ্যমে মেমোরি খরচ স্থায়ীভাবে নিয়ন্ত্রণে রাখা যায়।",
          "e": "Node's default V8 heap caps around 1.4-2GB on 64-bit platforms. Pass `--max-old-space-size=4096` to allocate 4GB of heap. Structurally, refactor monolithic in-memory array fetches into database streams to bypass heap ceilings.",
          "code": "node --max-old-space-size=4096 dist/server.js"
        },
        {
          "lvl": "lvl3",
          "q": "Graceful Shutdown কী এবং প্রোডাকশনে সার্ভার ডাউন বা রিস্টার্টের সময় চলমান কানেকশন ডেটা নষ্ট হওয়া কীভাবে রোধ করবে?",
          "m": "Graceful Shutdown নিশ্চিত করে যে যখন সার্ভার `SIGTERM` বা `SIGINT` সিগন্যাল পায় (যেমন ডেপ্লয়মেন্ট বা কনটেইনার কিল), তখন সাথে সাথে প্রসেস বন্ধ না করে: (১) নতুন ইনকামিং HTTP রিকোয়েস্ট গ্রহণ বন্ধ করে (`server.close()`), (২) ইতিমধ্যে চলমান কারেন্ট রিকোয়েস্ট ও পেমেন্ট প্রসেস শেষ করার জন্য নির্দিষ্ট গ্রেস পিরিয়ড (যেমন ১০ সেকেন্ড) দেয়, (৩) ডেটাবেজ পুল ও রেডিস কানেকশন নিরাপদে ক্লোজ করে (`prisma.$disconnect()`), এবং শেষে ক্লিনভাবে `process.exit(0)` এক্সিকিউট করে।",
          "b": "গ্রেসফুল শাটডাউন নিশ্চিত করে যে ডেপ্লয়মেন্টের সময় চলমান কোনো পেমেন্ট বা রিকোয়েস্ট মাঝপথে নষ্ট না হয়। নতুন কানেকশন বন্ধ করে চলমান কাজ শেষ হওয়া পর্যন্ত অপেক্ষা করে ডাটাবেজ সুরক্ষিতভাবে ডিসকানেক্ট করে প্রসেস বন্ধ করা হয়।",
          "e": "Graceful Shutdown intercepts OS termination signals (`SIGTERM`, `SIGINT`). It ceases accepting new HTTP connections via `server.close()`, drains in-flight requests within a timeout window, closes database pools and Redis sockets cleanly, and exits via `process.exit(0)`.",
          "code": "process.on('SIGTERM', async () => {\n  server.close(async () => {\n    await db.$disconnect();\n    process.exit(0);\n  });\n});"
        },
        {
          "lvl": "lvl3",
          "q": "Child Process মডিউলের ৪টি পদ্ধতি (`exec`, `execFile`, `spawn`, `fork`)-এর মধ্যে সূক্ষ্ম পার্থক্য কী?",
          "m": "(১) `exec`: একটি শেল ওপেন করে কমান্ড রান করে এবং পুরো আউটপুট মেমোরি বাফারে জমা করে (ম্যাক্স ২০০KB ডিফল্ট, কমান্ড ইনজেকশনের ঝুঁকি থাকে)। (২) `execFile`: কোনো শেল ছাড়াই সরাসরি এক্সিকিউটেবল ফাইল রান করে (নিরাপদ)। (৩) `spawn`: বিশাল আউটপুট স্ট্রিম আকারে চাঙ্ক বাই চাঙ্ক ফেরত দেয় (লং-রানিং প্রসেসের জন্য সেরা)। (৪) `fork`: একটি স্পেশাল স্পন যা নতুন নোড জেএস প্রসেস তৈরি করে এবং প্যারেন্ট-চাইল্ডের মধ্যে দ্বিমুখী আইপিসি (IPC - Inter-Process Communication) চ্যানেল খুলে মেসেজ আদান-প্রদান করতে দেয়।",
          "b": "exec শেল কমান্ড বাফারে চালায়, execFile সরাসরি বাইনারি চালায়, spawn স্ট্রিম আকারে বড় আউটপুট হ্যান্ডেল করে এবং fork নতুন নোড প্রসেস খুলে প্যারেন্টের সাথে আইপিসি মেসেজিং চ্যানেলের মাধ্যমে যোগাযোগ স্থাপন করে।",
          "e": "exec buffers output from a shell (injection risk, buffer limits). execFile executes binaries directly without a sub-shell. spawn streams large outputs chunk-by-chunk for long-running processes. fork spawns child Node instances with a dedicated IPC message bridge.",
          "tip": "বড় ব্যাকআপ স্ক্রিপ্টে exec ব্যবহার না করে spawn ব্যবহার করার কথা বলা মেমোরি সেফটির প্রমাণ দেয়।"
        },
        {
          "lvl": "lvl3",
          "q": "Node.js Diagnostic Profiling: `node --prof` এবং Chrome DevTools Inspector দিয়ে প্রোডাকশন CPU স্পাইক কীভাবে ডিবাগ করবে?",
          "m": "আমরা নোড প্রসেস রান করব `node --inspect=0.0.0.0:9229 server.js` দিয়ে। এরপর ক্রোম ব্রাউজারে `chrome://inspect` ওপেন করে নোড প্রসেসের সাথে কানেক্ট করব। এরপর 'Profiler' ট্যাবে গিয়ে CPU Profile রেকর্ড করব। 'Flame Graph' এবং 'Heavy (Bottom Up)' ভিউ চেক করে দেখতে পাব কোন নির্দিষ্ট ফাংশনটি ৯৯% CPU সাইকেল নষ্ট করছে (যেমন কোনো ভুল রেজাক্স বা ইনফাইনাইট লুপ)। ফিক্স করে সাথে সাথে হট রিলোড টেস্ট করা যায়।",
          "b": "ক্রোম ইন্সপেক্টরের সাহায্যে নোড প্রসেসের সাথে যুক্ত হয়ে সিপিইউ প্রোফাইল ও ফ্লেইম গ্রাফ রেকর্ড করে সুনির্দিষ্ট ফাংশনটি শনাক্ত করা যায় যা মেইন থ্রেডকে ব্লক করে রেখেছিল।",
          "e": "Launch Node with `--inspect` and connect via Chrome DevTools (`chrome://inspect`). Trigger CPU profiling under heavy load to generate Flame Graphs, immediately isolating unoptimized synchronous loops, regex backtracking, or CPU bottlenecks.",
          "code": "node --inspect --prof server.js\nnode --prof-process isolate-*.log > processed.txt"
        },
        {
          "lvl": "situation",
          "q": "একটি এপিআইতে বড় PDF বা এক্সেল রিপোর্ট জেনারেট করার সময় পুরো নোড সার্ভার ৫ সেকেন্ডের জন্য ফ্রিজ হয়ে অন্যান্য সব ইউজারের রিকোয়েস্ট ব্লক হয়ে যায়। কীভাবে আর্কিটেকচারাল সমাধান করবে?",
          "m": "যেহেতু পিডিএফ জেনারেট একটি ভারী CPU-ইনটেনসিভ টাস্ক, এটি নোডের মেইন ইভেন্ট লুপকে ব্লক করে ফেলে। সমাধান: (১) এই কাজটিকে মেইন থ্রেড থেকে সরিয়ে একটি `Worker Thread` অথবা চাইল্ড প্রসেসে হ্যান্ডেল করব। (২) আরও উন্নত এন্টারপ্রাইজ সমাধান হলো BullMQ (Redis-backed Queue) দিয়ে একটি ব্যাকগ্রাউন্ড জব ওয়ার্কার সার্ভিস তৈরি করা। এপিআই তাৎক্ষণিক `202 Accepted` ও `jobId` রিটার্ন করবে, এবং ব্যাকগ্রাউন্ড ওয়ার্কার পিডিএফ বানিয়ে ক্লাউড স্টোরেজে আপলোড করে নোটিফিকেশন পাঠাবে।",
          "b": "সিপিইউ ব্লকিং দূর করতে পিডিএফ তৈরির কাজটি মেইন থ্রেড থেকে সরিয়ে বুলএমকিউ (BullMQ) ও রেডিসের সাহায্যে ব্যাকগ্রাউন্ড জব ওয়ার্কারে পাঠিয়ে দিতে হবে। এপিআই তাৎক্ষণিক জব আইডি ফেরত দেবে এবং মেইন সার্ভার সম্পূর্ণ মুক্ত থাকবে।",
          "e": "Heavy PDF generation starves the event loop. Decouple it asynchronously by enqueuing jobs to BullMQ (Redis queue). Dedicated worker processes or Worker Threads generate the PDF out-of-band and emit webhooks/SSE upon completion.",
          "code": "await reportQueue.add('generate-pdf', { tenantId, reportType });\nres.status(202).json({ success: true, message: 'Processing in background' });"
        },
        {
          "lvl": "situation",
          "q": "নোড সার্ভারে মেমোরি প্রতিনিয়ত বৃদ্ধি পেয়ে প্রতিদিন রাতে ২GB হয়ে ক্র্যাশ করছে (Memory Leak)। কীভাবে রুট কজ ট্র্যাক করে ফিক্স করবে?",
          "m": "ট্র্যাকিং স্টেপস: (১) নোড রানটাইমে `heapdump` বা `v8.writeHeapSnapshot()` ব্যবহার করে নির্দিষ্ট ব্যবধানে ৩টি মেমোরি স্ন্যাপশট নেব। (২) ক্রোম ডেভটুলসে স্ন্যাপশট লোড করে 'Objects allocated between snapshots' তুলনা করব। (৩) সাধারণত নোডে মেমোরি লিক হয়: গ্লোবাল অবজেক্টে ক্যাশ ডাটা আনলিমিটেড পুশ করা, আনরিমুভড `eventEmitter.on()` লিসেনার্স, অথবা ক্লোজ না হওয়া ডাটাবেজ কার্সর। (৪) ইন-মেমোরি ক্যাশের জন্য `lru-cache` (ম্যাক্স আইটেম লিমিট ও টিটিএল সহ) ব্যবহার করব।",
          "b": "মেমোরি স্ন্যাপশট নিয়ে ক্রোম ডেভটুলসে বিশ্লেষণ করে আনলিমিটেড গ্লোবাল অ্যারে বা আনরিমুভড ইভেন্ট লিসেনার শনাক্ত করতে হবে। মেমোরিতে সরাসরি ডাটা জমানো বন্ধ করে নির্দিষ্ট সাইজের LRU ক্যাশ ব্যবহার করতে হবে।",
          "e": "Capture heap snapshots via `v8.writeHeapSnapshot()` before and during memory spikes. Compare them in Chrome DevTools to locate uncollected references (often unbounded global caches, leaked event listeners, or unclosed database cursors), refactoring caches to use LRU with TTL bounds.",
          "code": "import v8 from 'v8';\nfs.writeFileSync('heap.heapsnapshot', v8.getHeapSnapshot());"
        },
        {
          "lvl": "situation",
          "q": "ব্যবহারকারী একটি ২GB সাইজের ভিডিও ফাইল আপলোড করতে গিয়ে পুরো নোড সার্ভার `JavaScript heap out of memory` দিয়ে ক্র্যাশ করল। কীভাবে স্ট্রিম দিয়ে ফিক্স করবে?",
          "m": "কারণ ফাইলটিকে সাধারণ `fs.readFile()` বা ইন-মেমোরি বাফার হিসেবে রিড করা হয়েছিল। সমাধান: কখনোই পুরো ফাইলকে মেমোরিতে লোড করব না। আমরা `busboy` বা `multer` (ডিস্ক/ক্লাউড স্ট্রিমিং মোডে) ব্যবহার করব এবং ইনকামিং HTTP রিকোয়েস্টের র স্ট্রিমকে সরাসরি AWS S3 বা লোকাল ডিস্কের রাইট স্ট্রিমে পাইপ (`pipeline`) করব। এর ফলে ফাইল ২GB হোক বা ২০GB, নোড সার্ভারের মেমোরি মাত্র ২০–৩০ মেগাবাইটের বেশি খরচ হবে না।",
          "b": "বড় ফাইল কখনো মেমরিতে বাফার করা যাবে না। busboy লাইব্রেরি দিয়ে ইনকামিং এইচটিটিপি রিকোয়েস্টকে সরাসরি স্ট্রিম আকারে ডিস্ক বা অ্যামাজন এসথ্রিতে পাইপ করতে হবে, ফলে মেমোরি খরচ শূন্যের কোঠায় নেমে আসবে।",
          "e": "Avoid buffering file uploads in memory. Stream incoming multipart form payloads via `busboy` or streaming Multer directly into disk or S3 write streams using `stream.pipeline()`, keeping heap usage constant under 30MB regardless of file magnitude.",
          "code": "await pipeline(req, parseMultipartStream, s3UploadStream);"
        },
        {
          "lvl": "situation",
          "q": "কোডে কোনো একটি আনহ্যান্ডেলড প্রমিজ রিজেকশন বা এক্সেপশন আসায় নোড সার্ভার সাথে সাথে বন্ধ হয়ে যাচ্ছে (Crash)। কীভাবে সম্পূর্ণ সার্ভারকে ক্র্যাশ-প্রুফ করবে?",
          "m": "সমাধান: (১) সেন্ট্রালাইজড ট্র্যাকিংয়ের জন্য `process.on('uncaughtException')` এবং `process.on('unhandledRejection')` লিসেনার যোগ করব যা এরর লগ করে গ্রেসফুল শাটডাউন চালাবে। (২) এক্সপ্রেস রুটে Express 5 ব্যবহার করব যা অ্যাসিনক্রোনাস এরর নিজে থেকেই গ্লোবাল এরর হ্যান্ডলারে পাস করে (অথবা `express-async-errors`)। (৩) প্রসেস ম্যানেজমেন্টে PM2 বা Docker ব্যবহার করব যা কোনো অপ্রত্যাশিত ক্র্যাশে মিলি-সেকেন্ডে অ্যাপকে অটো-রিস্টার্ট করে।",
          "b": "সার্ভার ক্র্যাশ বন্ধ করতে uncaughtException এবং unhandledRejection গ্লোবাল লিসেনার রাখতে হবে। এক্সপ্রেস এপিআইতে অ্যাসিনক্রোনাস এরর হ্যান্ডলার নিশ্চিত করতে হবে এবং ব্যাকগ্রাউন্ডে PM2 বা ডকার দিয়ে অটো-রিস্টার্ট সচল রাখতে হবে।",
          "e": "Trap unexpected crashes by registering listeners for `uncaughtException` and `unhandledRejection`. Utilize Express 5 or `express-async-errors` to route async rejections to middleware, paired with PM2 process managers to ensure instant automatic restarts.",
          "code": "process.on('unhandledRejection', (reason, promise) => {\n  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);\n});"
        },
        {
          "lvl": "situation",
          "q": "একটি ডেটাবেজ রিপোর্ট তৈরিতে ১০ হাজার রেকর্ড আনতে গিয়ে এপিআই রেসপন্স ১০ সেকেন্ড আটকে থাকছে। নোড লেয়ারে কীভাবে ডেটা স্ট্রিম করে রেসপন্স ইনস্ট্যান্ট করবে?",
          "m": "সমাধান: পুরো ১০ হাজার রেকর্ড একসাথে অ্যারেতে ফেচ করে `res.json(records)` না করে আমরা ডেটাবেজ কার্সর (Database Cursor / Stream) ব্যবহার করব। PostgreSQL বা MongoDB কার্সর থেকে এক একটি রেকর্ড আসার সাথে সাথে `JSONStream.stringify()` দিয়ে সরাসরি `res` (যা একটি Writable Stream) এ রাইট করতে থাকব। এর ফলে ক্লায়েন্ট ১ সেকেন্ডের আগেই প্রথম রেকর্ড পাওয়া শুরু করে এবং নোড সার্ভারের RAM সম্পূর্ণ ফাঁকা থাকে।",
          "b": "একসাথে সব ডাটা না এনে ডাটাবেজ কার্সরের সাহায্যে স্ট্রিম আকারে রেকর্ডগুলো ক্লায়েন্টের এইচটিটিপি রেসপন্সে পাইপ করতে হবে। এতে ক্লায়েন্ট তৎক্ষণাৎ প্রথম ডেটা পাওয়া শুরু করে এবং সার্ভারের কোনো মেমোরি অপচয় হয় না।",
          "e": "Stream database records using cursors (e.g., Prisma cursor, Mongoose stream, or pg-query-stream) piped directly through a Transform stream into the HTTP `res` writable sink, drastically shrinking TTFB and memory usage.",
          "code": "const cursor = db.orders.find().cursor();\ncursor.pipe(JSONStream.stringify()).pipe(res);"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর ব্যাকএন্ডে শত শত ক্যাশ কাউন্টারের সেলস এন্ট্রি প্রসেস করার সময় Node.js ইভেন্ট লুপ ব্লকিং কীভাবে সম্পূর্ণ ০% এ নামিয়ে এনেছিলে?",
          "m": "দোকানি সিস্টেমে আমরা ৩টি আর্কিটেকচারাল রুল মেনে চলেছি: (১) কোনো সিনক্রোনাস ক্রিপ্টো বা ফাইল অপারেশন (`fs.readFileSync`, `bcrypt.hashSync`) নিষিদ্ধ করেছি—সবসময় অ্যাসিঙ্ক নন-ব্লকিং মেথড ব্যবহার করেছি। (২) ইনভয়েস ভ্যাট ও ডিসকাউন্ট ক্যালকুলেশনকে লিনিয়ার টাইম জটিলতায় অপটিমাইজ করেছি। (৩) থার্মাল প্রিন্টার বাইনারি কমান্ড ফরম্যাটিং এবং ব্যাকগ্রাউন্ড নোটিফিকেশন BullMQ ওয়ার্কার থ্রেডে পাঠিয়ে দিয়েছি। ফলে মেইন ইভেন্ট লুপের ল্যাগ সর্বদা ৫ মিলিসেকেন্ডের নিচে ছিল।",
          "b": "দোকানি সিস্টেমে আমরা কোনো সিঙ্ক্রোনাস কোড ব্যবহার করিনি। জটিল হিসাব-নিকাশ অপটিমাইজ করে ভারী প্রিন্ট ও ব্যাকআপ টাস্কগুলোকে আলাদা জব কিউতে পাঠিয়ে দেওয়ার ফলে ইভেন্ট লুপ সর্বদা মুক্ত ছিল এবং বিলিংয়ে কোনো বিলম্ব ঘটেনি।",
          "e": "Banished event loop blocking in Dokani POS by enforcing strict asynchronous non-blocking APIs (zero Sync methods), optimizing invoice calculation pipelines to O(N), and delegating PDF thermal parsing tasks to isolated background workers.",
          "tip": "কখনোই প্রোডাকশন কোডে `fs.readFileSync` বা `bcrypt.hashSync` লিখবে না—এই পয়েন্টটি ইন্টারভিউয়াররা সবসময় চেক করে।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর রিয়েল-টাইম ক্যাশ কাউন্টার ও ইনভেন্টরি আপডেটের জন্য Socket.io ক্লাস্টার আর্কিটেকচার Redis Adapter দিয়ে কীভাবে স্কেল করেছিলে?",
          "m": "যখন মাল্টিপল Node.js ইনস্ট্যান্স PM2 বা ডকারে রান করে, একজন ক্যাশিয়ার সার্ভার ১-এ কানেক্টেড এবং অন্যজন সার্ভার ২-এ। সাধারণ সকেট ইভেন্ট পাঠালে অন্য সার্ভারের ক্লায়েন্ট আপডেট পেত না। সমাধান: আমরা `@socket.io/redis-adapter` ব্যবহার করেছি। যখনই একটি সেলস আপডেট আসে, সকেট সার্ভার রেডিসের Pub/Sub চ্যানেলে মেসেজ ব্রডকাস্ট করে। রেডিস মুহূর্তের মধ্যে ক্লাস্টারের বাকি সব নোড সার্ভারে ইভেন্ট ছড়িয়ে দেয় এবং সব ক্যাশ কাউন্টারে সাথে সাথে স্টক আপডেট হয়ে যায়।",
          "b": "একাধিক সার্ভারে সকেট সিঙ্ক বজায় রাখতে আমরা রেডিস অ্যাডাপ্টার ব্যবহার করেছি। যেকোনো একটি সার্ভারে বিক্রি সম্পন্ন হলে রেডিস পাব/সাব চ্যানেলের মাধ্যমে তাৎক্ষণিক অন্য সব সার্ভারের কানেক্টেড ক্যাশ কাউন্টারে স্টক পরিবর্তনের নোটিফিকেশন পৌঁছে যেত।",
          "e": "Scaled multi-process Socket.io across clustered Node.js containers using `@socket.io/redis-adapter`. State notifications published by any worker are broadcast over Redis Pub/Sub, synchronizing real-time inventory counts across all active cash registers seamlessly.",
          "code": "const { createAdapter } = require('@socket.io/redis-adapter');\nio.adapter(createAdapter(redisPubClient, redisSubClient));"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে ভিডিও লেকচার স্ট্রিমিংয়ে HTTP 206 Partial Content এবং Node.js Stream কীভাবে আর্কিটেক্ট করেছিলে?",
          "m": "ভিডিও প্লেয়ারে ইউজার যখন টেনে সামনে নেয় (Seek), পুরো ১GB ভিডিও ডাউনলোড হওয়া অযৌক্তিক। আমরা রিকোয়েস্টের `Range: bytes=start-end` হেডার রিড করে `fs.createReadStream(videoPath, { start, end })` দিয়ে নির্দিষ্ট চাঙ্কটি স্ট্রিম করেছি এবং রেসপন্স হেডার দিয়েছি `HTTP/206 Partial Content` সহ `Content-Range` ও `Accept-Ranges: bytes`। এর ফলে ছাত্ররা চোখের পলকে যেকোনো সেকেন্ডে ভিডিও স্ক্রাব করতে পেরেছে এবং সার্ভারের ব্যান্ডউইথ ৯০% বেঁচে গেছে।",
          "b": "পিটিটিএবিডি ভিডিও স্ট্রিমিংয়ে আমরা এইচটিটিপি ২০৬ পার্সিয়াল কন্টেন্ট এবং রেঞ্জ হেডার ভিত্তিক স্ট্রিম তৈরি করেছিলাম। ফলে ব্যবহারকারী ভিডিওর মাঝখানে টেনে নিলেও কেবল সেই অংশটুকু ডাউনলোড হতো, যা ৯৫% ব্যান্ডউইথ সাশ্রয় করেছিল।",
          "e": "Architected video streaming in PTTABD via HTTP 206 Partial Content. Inspecting client `Range` headers, we dynamically spawned bounded `fs.createReadStream()` slices delivering strictly requested byte ranges for instant video scrubbing without buffering full files.",
          "code": "const stream = fs.createReadStream(videoPath, { start, end });\nres.writeHead(206, { 'Content-Range': `bytes ${start}-${end}/${fileSize}`, 'Accept-Ranges': 'bytes' });\nstream.pipe(res);"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর ডেইলি ডেটাবেজ ব্যাকআপ স্বয়ংক্রিয়ভাবে জি-জিপ (Gzip) কম্প্রেস করে ক্লাউড স্টোরেজে পুশ করতে Node.js পাইপলাইন কীভাবে লিখেছিলে?",
          "m": "আমরা `child_process.spawn('pg_dump')` কল করে সরাসরি ডাটাবেজ ডাম্পের আউটপুট স্ট্রিম ধরি। এরপর `zlib.createGzip()` ট্রান্সফর্ম স্ট্রিম দিয়ে অন-দ্য-ফ্লাই কম্প্রেস করি এবং AWS S3 Multipart Upload স্ট্রিম দিয়ে ক্লাউডে পাঠাই। পুরো পাইপলাইনে লোকাল সার্ভারের হার্ডডিস্কে কোনো বড় ফাইল সেভ করতে হয়নি; এক প্রান্ত দিয়ে ডাটা ডাম্প হয়েছে, মাঝখানে কম্প্রেস হয়ে অন্য প্রান্ত দিয়ে ক্লাউডে আপলোড হয়ে গেছে—জিরো ডিস্ক স্পেস স্পাইক!`,",
          "b": "দোকানি ব্যাকআপ সিস্টেমে আমরা pg_dump আউটপুটকে সরাসরি zlib gzip ট্রান্সফর্মে পাঠিয়ে ক্লাউড স্টোরেজে আপলোড করেছি। ডিস্কে কোনো ফাইল তৈরি না করেই সরাসরি মেমোরি স্ট্রিমের মাধ্যমে অতি দ্রুত ব্যাকআপ সম্পন্ন হতো।",
          "e": "Engineered zero-disk-footprint backups in Dokani by piping `pg_dump` standard output directly through `zlib.createGzip()` into an AWS S3 managed upload stream, bypassing ephemeral server disk capacity bottlenecks completely.",
          "tip": "ডিস্কে ফাইল রাইট না করে সরাসরি অন-দ্য-ফ্লাই পাইপলাইন ব্যাকআপ সিনিয়র ডেভঅপ্স ও ব্যাকএন্ড আর্কিটেকচারের অসাধারণ নমুনা।"
        },
        {
          "lvl": "realworld",
          "q": "Node.js অ্যাপ্লিকেশনকে প্রোডাকশনে রান করার সময় `NODE_ENV=production` ফ্ল্যাগ অন করার ইন্টারনাল টেকনিক্যাল সুবিধাসমূহ কী কী?",
          "m": "অনেক ডেভেলপার মনে করে এটি শুধু একটি পরিবেশ ভেরিয়েবল, কিন্তু টেকনিক্যালি: (১) Express.js প্রোডাকশন মোডে ভিউ টেমপ্লেট এবং CSS ফাইলগুলো মেমোরিতে প্রাক-ক্যাশ করে রাখে যা প্রতি রিকোয়েস্টে ডিস্ক রিড বন্ধ করে। (২) এরর রেসপন্সে ইন্টারনাল স্ট্যাক ট্রেস এবং সংবেদনশীল সোর্স কোড পাথ ক্লায়েন্টে পাঠানো বন্ধ করে (সিকিউরিটি)। (৩) নোডের বহু থার্ড-পার্টি ডিপেনডেন্সি প্রোডাকশন ফ্ল্যাগ দেখলে ডিবাগিং লগিং বন্ধ করে পারফরম্যান্স প্রায় ৩ গুণ বাড়িয়ে দেয়।",
          "b": "NODE_ENV=production দিলে এক্সপ্রেস ফাইল ক্যাশ করে ডিস্ক রিড বন্ধ করে, এরর স্ট্যাক ট্রেস লুকায় এবং থার্ড-পার্টি লাইব্রেরিগুলো বাড়তি ডিবাগিং বন্ধ করে সর্বোচ্চ গতি নিশ্চিত করে।",
          "e": "Setting `NODE_ENV=production` triggers crucial optimizations: Express aggressively caches compiled view templates in memory, suppresses sensitive call stack disclosures in error responses, and prompts third-party packages to disable high-overhead debug logging, tripling throughput.",
          "tip": "ইন্টারভিউতে 'Template caching' এবং 'Stack trace suppression' পয়েন্টগুলো বলবে।"
        }
      ]
    },
    {
      "id": "express-architecture",
      "name": "Express.js Layered Architecture & REST APIs",
      "desc": "Clean Layered Architecture, Controller-Service-Repository Pattern, Express Middleware Lifecycle, Routing, Error Middleware",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Express.js-এ 3-Tier Layered Architecture (Controller-Service-Repository) কেন ইন্ডাস্ট্রি স্ট্যান্ডার্ড?",
          "m": "যদি রাউটের ভেতরেই সরাসরি ডাটাবেজ কোয়েরি এবং বিজনেস লজিক লেখা হয়, তবে কোডবেজ 'স্প্যাগেটি' হয়ে যায় এবং টেস্টিং অসম্ভব হয়ে পড়ে। 3-Tier আর্কিটেকচারে দায়িত্ব ভাগ করা থাকে: (১) `Controller`: HTTP রিকোয়েস্ট গ্রহণ করে, ভ্যালিডেট করে এবং রেসপন্স পাঠায়। (২) `Service`: মূল বিজনেস লজিক, ডিসকাউন্ট বা ট্যাক্স ক্যালকুলেশন ও থার্ড-পার্টি ইন্টিগ্রেশন করে। (৩) `Repository`: ডাটাবেজ কোয়েরি (Prisma/SQL/Mongo) চালায়। এর ফলে প্রতিটি লেয়ার সম্পূর্ণ স্বাধীন ও সহজে টেস্টেবল হয়।",
          "b": "লেয়ার্ড আর্কিটেকচারে দায়িত্বগুলো সুনির্দিষ্ট থাকে: কন্ট্রোলার শুধুমাত্র এইচটিটিপি রিকোয়েস্ট ও রেসপন্স নিয়ন্ত্রণ করে, সার্ভিস স্তর মূল ব্যবসায়িক যুক্তি পরিচালনা করে এবং রিপোজিটরি ডাটাবেজ অপারেশন সম্পন্ন করে। এটি কোডকে পরিচ্ছন্ন, পরিবর্তনযোগ্য এবং পরীক্ষাযোগ্য রাখে।",
          "e": "The Controller-Service-Repository pattern enforces strict Separation of Concerns. Controllers manage HTTP transport contracts, Services encapsulate core domain business logic, and Repositories handle database persistence abstractions.",
          "tip": "কখনোই কন্ট্রোলারের ভেতরে সরাসরি Prisma বা SQL কোয়েরি লিখবে না—সার্ভিস লেয়ারে বিজনেস লজিক রাখার কথা ইন্টারভিউতে বলবে।"
        },
        {
          "lvl": "lvl1",
          "q": "Express.js Middleware কী এবং `next()` ফাংশনের কাজ কী?",
          "m": "Middleware হলো এমন একটি ফাংশন যার কাছে Request অবজেক্ট (`req`), Response অবজেক্ট (`res`), এবং পরবর্তী মিডলওয়্যারে যাওয়ার ফাংশন `next` এক্সেস থাকে। মিডলওয়্যার রিকোয়েস্ট মডিফাই করতে পারে (যেমন ইউজার আইডি ইনজেক্ট করা), অথেনটিকেশন চেক করতে পারে বা রিকোয়েস্ট লগ করতে পারে। কাজ শেষে `next()` কল করলে রিকোয়েস্ট পাইপলাইনে পরবর্তী মিডলওয়্যারে যায়। আর যদি `next()` কল না করে রেসপন্সও না পাঠানো হয়, তবে রিকোয়েস্ট আজীবন হ্যাং হয়ে থাকবে।",
          "b": "মিডলওয়্যার হলো রিকোয়েস্ট ও রেসপন্সের মধ্যবর্তী প্রক্রিয়াকরণ ফাংশন। next() কল করার মাধ্যমে পরবর্তী মিডলওয়্যার বা কন্ট্রোলারে রিকোয়েস্ট পাঠানো হয়। এটি না ডাকলে ব্রাউজারের রিকোয়েস্ট চিরতরে আটকে থাকবে।",
          "e": "Express middleware functions access the `req`, `res`, and `next` references. They execute intermediate logic like authentication, logging, or input parsing. Invoking `next()` forwards execution to the next handler in the stack; failing to do so hangs the client connection.",
          "code": "const authMiddleware = (req, res, next) => {\n  if (!req.headers.authorization) return res.status(401).send('No token');\n  next();\n};"
        },
        {
          "lvl": "lvl1",
          "q": "Express-এ ৫ প্রকার মিডলওয়্যার কী কী (Application, Router, Error-handling, Built-in, Third-party)?",
          "m": "(১) `Application-level`: পুরো অ্যাপে গ্লোবালি চলে (`app.use(...)`)। (২) `Router-level`: নির্দিষ্ট রাউট মডিউলে চলে (`router.use(...)`)। (৩) `Error-handling`: ৪টি আর্গুমেন্ট বিশিষ্ট স্পেশাল মিডলওয়্যার (`(err, req, res, next) => ...`) যা সব এরর ক্যাচ করে। (৪) `Built-in`: এক্সপ্রেসের নিজস্ব মিডলওয়্যার যেমন `express.json()`, `express.static()`। (৫) `Third-party`: এনপিএম প্যাকেজ যেমন `cors()`, `helmet()`, `morgan()`।",
          "b": "এক্সপ্রেসের ৫টি মিডলওয়্যার স্তর হলো: অ্যাপ্লিকেশন লেভেল, রাউটার লেভেল, এরর হ্যান্ডলিং লেভেল (৪টি প্যারামিটার বিশিষ্ট), এক্সপ্রেসের বিল্ট-ইন লেভেল এবং থার্ড পার্টি প্যাকেজ।",
          "e": "The five middleware tiers are Application-level (`app.use`), Router-level (`router.use`), Error-handling middleware (`(err, req, res, next)`), Built-in middleware (`express.json()`), and Third-party packages (`cors`, `helmet`).",
          "code": "app.use(express.json()); // Built-in\napp.use('/api', apiRouter); // Router-level\napp.use((err, req, res, next) => res.status(500).json({ err: err.message })); // Error"
        },
        {
          "lvl": "lvl1",
          "q": "`app.use(express.json())` এবং `express.urlencoded()` কেন প্রতি প্রজেক্টের শুরুতে দেওয়া আবশ্যক?",
          "m": "Node.js ইনকামিং HTTP রিকোয়েস্ট বডিকে কাঁচা স্ট্রিম বা বাফার আকারে রিসিভ করে। `express.json()` মিডলওয়্যার সেই ইনকামিং JSON পেলোডকে ব্যাকগ্রাউন্ডে স্ট্রিম থেকে অ্যাসেম্বল করে পার্স করে জাভাস্ক্রিপ্ট অবজেক্ট হিসেবে `req.body`-তে অ্যাটাচ করে দেয়। এটি না দিলে `req.body` সবসময় `undefined` থাকবে এবং পোস্ট করা কোনো ডেটা পড়া যাবে না। আর `express.urlencoded()` সাধারণ HTML ফর্ম সাবমিশনের URL-encoded ডেটা পার্স করে।",
          "b": "এইচটিটিপি রিকোয়েস্টের বডি কাঁচা স্ট্রিম আকারে আসে। express.json() সেই স্ট্রিম পার্স করে req.body তে অবজেক্ট তৈরি করে দেয়, যার ফলে কন্ট্রোলারে ডেটা পড়া সম্ভব হয়।",
          "e": "`express.json()` reads the raw incoming request stream, parses valid JSON bodies, and exposes the parsed payload onto `req.body`. Without it, `req.body` resolves to undefined for incoming POST/PUT JSON calls.",
          "code": "app.use(express.json({ limit: '10mb' }));\napp.use(express.urlencoded({ extended: true }));"
        },
        {
          "lvl": "lvl1",
          "q": "Express Router (`express.Router()`) ব্যবহার করে মডুলার রাউটিং কীভাবে করা হয়?",
          "m": "একটি বড় অ্যাপ্লিকেশনে সব রাউট `server.js` ফাইলে লিখলে ফাইল হাজার হাজার লাইন হয়ে আন-মেইনটেইনেবল হয়ে যায়। `express.Router()` হলো একটি মিনি এক্সপ্রেস অ্যাপ যা সম্পূর্ণ আইসোলেটেড রাউট গ্রুপ তৈরি করতে দেয় (যেমন `auth.routes.ts`, `product.routes.ts`, `invoice.routes.ts`)। প্রতিটি রাউটার আলাদা ফাইলে লিখে এক্সপোর্ট করা হয় এবং মূল অ্যাপে প্রিফিক্স সহ মাউন্ট করা হয় (`app.use('/api/v1/products', productRouter)`।",
          "b": "এক্সপ্রেস রাউটার মডিউল আকারে বিভিন্ন রিসোর্সের রাউট আলাদা ফাইলে সাজাতে সাহায্য করে। ফলে অ্যাথ, প্রোডাক্ট ও ইনভয়েসের রাউট আলাদা থেকে মূল অ্যাপে ক্লিনভাবে যুক্ত হয়।",
          "e": "express.Router() encapsulates isolated, modular sub-routing trees. Routes are partitioned across dedicated feature files (e.g. `routes/auth.ts`) and mounted onto the parent app with API version prefixes (`app.use('/api/v1', authRoutes)`).",
          "code": "const router = express.Router();\nrouter.get('/:id', productController.getById);\nexport default router;"
        },
        {
          "lvl": "lvl2",
          "q": "Express 5-এ সবচেয়ে বড় পরিবর্তন কী এবং এটি কীভাবে অ্যাসিনক্রোনাস এরর হ্যান্ডলিং সহজ করেছে?",
          "m": "Express 4-এ অ্যাসিনক্রোনাস ফাংশনের ভেতর কোনো প্রমিজ রিজেক্ট বা এরর হলে এক্সপ্রেস তা নিজে ধরতে পারত না; ডেভেলপারকে প্রতি ফাংশনে ম্যানুয়াল `try/catch` লিখে `next(err)` কল করতে হতো, অন্যথায় সার্ভার আনহ্যান্ডেলড রিজেকশনে হ্যাং হতো। Express 5-এ অ্যাসিনক্রোনাস রাউট হ্যান্ডলারের জন্য বিল্ট-ইন সাপোর্ট এসেছে—এখন যেকোনো `async` ফাংশনে এরর থ্রো হলে এক্সপ্রেস স্বয়ংক্রিয়ভাবে প্রমিজ রিজেকশন ক্যাচ করে গ্লোবাল এরর হ্যান্ডলিং মিডলওয়্যারে পাঠিয়ে দেয়, কোনো অতিরিক্ত র‍্যাপার ছাড়াই!`,",
          "b": "এক্সপ্রেস ৫-এর সবচেয়ে বড় আপডেট হলো স্বয়ংক্রিয় অ্যাসিনক্রোনাস এরর হ্যান্ডলিং। async ফাংশনে এরর থ্রো হলে এক্সপ্রেস নিজে থেকেই তা ধরে সেন্ট্রালাইজড এরর মিডলওয়্যারে পাঠিয়ে দেয়, ফলে বারবার try/catch লেখার প্রয়োজন ফুরিয়ে যায়।",
          "e": "Express 5 natively catches rejected promises thrown from async route handlers and forwards them automatically to the global error middleware stack without requiring manual try/catch blocks or `express-async-errors` monkey-patches.",
          "tip": "Express 5 এর এই অ্যাসিনক্রোনাস এরর মেকানিজম ইন্টারভিউতে উল্লেখ করলে বোঝা যায় তুমি আধুনিক নোড ইকোসিস্টেমের খবর রাখো।"
        },
        {
          "lvl": "lvl2",
          "q": "Dependency Injection (DI) প্যাটার্ন কীভাবে Express-এ সার্ভিস এবং রিপোজিটরি টেস্ট করতে সাহায্য করে?",
          "m": "হার্ডকোড করে ক্লাসের ভেতর সরাসরি ডাটাবেজ মডেল ইমপোর্ট করার বদলে আমরা কনস্ট্রাক্টরের মাধ্যমে ডিপেনডেন্সি পাস করি (যেমন: `constructor(private productRepo: IProductRepository)`। এর ফলে ইউনিট টেস্ট লেখার সময় আসল ডাটাবেজ কানেকশনের বদলে আমরা খুব সহজে একটি মক রিপোজিটরি অবজেক্ট ইনজেক্ট করতে পারি। কোড সম্পূর্ণ ডিকাপল্ড থাকে এবং যেকোনো সময় ডাটাবেজ বা ওআরএম পরিবর্তন করা সহজ হয়।",
          "b": "ডিপেনডেন্সি ইনজেকশন সরাসরি ইমপোর্টের বদলে প্যারামিটার আকারে সার্ভিস বা রিপোজিটরি গ্রহণ করে। এর ফলে ইউনিট টেস্টের সময় আসল ডাটাবেজের বদলে ফেইক বা মক অবজেক্ট পাস করে নিখুঁত টেস্টিং নিশ্চিত করা যায়।",
          "e": "Dependency Injection decouples classes by injecting external dependencies (repositories, loggers) through constructors rather than hardcoding imports. This facilitates mocking database boundaries during unit testing without spinning up live test databases.",
          "code": "export class OrderService {\n  constructor(private orderRepo: IOrderRepo, private mailer: IMailer) {}\n  async create(order: OrderDto) { ... }\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Express-এ Rate Limiting এবং Brute Force Protection কীভাবে আর্কিটেক্ট করবে (`express-rate-limit` + Redis)?",
          "m": "ডিফল্ট মেমোরি বেসড রেট লিমিটিং মাল্টিপল সার্ভার ইনস্ট্যান্সে কাজ করে না। এন্টারপ্রাইজ সিস্টেমে আমরা `express-rate-limit` এর সাথে `rate-limit-redis` স্টোর ব্যবহার করি। ইউজারের আইপি বা অথেনটিকেটেড ইউজার আইডির ওপর ভিত্তি করে রেডিসে কিউমিলেটিভ কাউন্টার রাখা হয় (যেমন: লগইন রাউটে ১৫ মিনিটে সর্বোচ্চ ৫টি রিকোয়েস্ট)। লিমিট অতিক্রম করলে এক্সপ্রেস তৎক্ষণাৎ `429 Too Many Requests` সহ `Retry-After` হেডার রিটার্ন করে ব্রুট-ফোর্স অ্যাটাক প্রতিরোধ করে।",
          "b": "রেট লিমিটিং অতিরিক্ত রিকোয়েস্ট ও ব্রুট ফোর্স আক্রমণ প্রতিরোধ করে। একাধিক সার্ভার ক্লাস্টারের জন্য রেডিস স্টোর ব্যবহার করে ১৫ মিনিটে সর্বোচ্চ ৫টি লগইন ট্রাইয়ের লিমিট বেঁধে দেওয়া হয় এবং অতিক্রম করলে ৪২৯ স্ট্যাটাস কোড প্রদান করা হয়।",
          "e": "Protect endpoints against brute force using `express-rate-limit` coupled with a distributed Redis store (`rate-limit-redis`). Enforcing sliding windows (e.g., 5 attempts per 15 minutes on `/auth/login`) yields standard `429 Too Many Requests` responses upon breach.",
          "code": "const loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 5,\n  store: new RedisStore({ sendCommand: (...args) => redisClient.sendCommand(args) })\n});"
        },
        {
          "lvl": "lvl2",
          "q": "CORS (Cross-Origin Resource Sharing) কীভাবে কাজ করে এবং প্রি-ফ্লাইট (`OPTIONS`) রিকোয়েস্ট কী?",
          "m": "ব্রাউজারের Same-Origin Policy নিরাপত্তার কারণে এক ডোমেনের ফ্রন্টএন্ড থেকে অন্য ডোমেনের ব্যাকএন্ডে রিকোয়েস্ট ব্লক করে। সার্ভার `Access-Control-Allow-Origin` হেডার দিয়ে নির্দিষ্ট ডোমেনকে অনুমতি দেয়। যখন রিকোয়েস্টে কাস্টম হেডার (যেমন `Authorization`) বা নন-সিম্পল মেথড (PUT/DELETE) থাকে, ব্রাউজার আসল রিকোয়েস্ট পাঠানোর ঠিক আগে স্বয়ংক্রিয়ভাবে একটি হালকা `OPTIONS` প্রি-ফ্লাইট রিকোয়েস্ট পাঠায় সার্ভারের অনুমতি যাচাই করতে। এক্সপ্রেসের `cors()` মিডলওয়্যার এই হ্যান্ডশেক পরিচালনা করে।",
          "b": "সিওআরএস ব্রাউজারের সুরক্ষার জন্য ভিন্ন ডোমেন থেকে আসা রিকোয়েস্ট যাচাই করে। জটিল এপিআই কলের ক্ষেত্রে ব্রাউজার প্রথমে একটি OPTIONS রিকোয়েস্ট পাঠিয়ে সার্ভারের অনুমতি নিশ্চিত করে, যাকে প্রি-ফ্লাইট বলা হয়।",
          "e": "CORS is a browser security mechanism restricting cross-origin HTTP requests. For complex requests (custom headers, PUT/DELETE), the browser pre-emptively dispatches an HTTP `OPTIONS` preflight request to verify allowed origins, headers, and credentials before firing the real call.",
          "code": "app.use(cors({\n  origin: ['https://dokani.bip.sg'],\n  credentials: true,\n  methods: ['GET', 'POST', 'PUT', 'DELETE']\n}));"
        },
        {
          "lvl": "lvl2",
          "q": "Centralized Error Handling Middleware এক্সপ্রেসের কল স্ট্যাকে সবার শেষে কেন রাখতে হয়?",
          "m": "এক্সপ্রেস মিডলওয়্যারগুলো যে অর্ডারে কোডে ডিক্লেয়ার করা হয়, হুবহু সেই অর্ডারে রিকোয়েস্ট এক্সেকিউট করে। এরর হ্যান্ডলারকে সবার শেষে (`app.use((err, req, res, next) => ...)` রাখতে হয় যাতে তার পূর্বের যেকোনো রাউট বা মিডলওয়্যারে এরর ঘটলে বা `next(err)` কল করা হলে তা নিচে প্রবাহিত হয়ে সরাসরি এই এরর মিডলওয়্যারে এসে জমা হতে পারে। যদি এটি রাউটের আগে রাখা হতো, তবে রাউটের ভেতরে ঘটা এররগুলো কখনোই এর কাছে পৌঁছাত না।",
          "b": "এরর হ্যান্ডলিং মিডলওয়্যার সবার শেষে না রাখলে পূর্ববর্তী রাউটের কোনো ত্রুটি সেখানে পৌঁছাবে না। এক্সপ্রেস সিকোয়েন্সিয়াল এক্সিকিউশন মেনে চলায় সবার শেষের এরর হ্যান্ডলারই পুরো অ্যাপের সমস্ত এরর একত্রিতভাবে গ্রহণ করতে পারে।",
          "e": "Express executes handlers sequentially in registration order. Error middleware (`(err, req, res, next)`) must sit at the absolute bottom of the stack so that errors thrown or passed via `next(err)` upstream naturally cascade down into the centralized trap.",
          "tip": "এরর মিডলওয়্যারের ৪টি প্যারামিটার (err, req, res, next) অক্ষত রাখতে হবে—একটি প্যারামিটার বাদ দিলেও এক্সপ্রেস এটিকে সাধারণ মিডলওয়্যার মনে করবে।"
        },
        {
          "lvl": "lvl3",
          "q": "Hexagonal Architecture (Ports and Adapters) বা Onion Architecture এক্সপ্রেসে কীভাবে বাস্তবায়ন করবে?",
          "m": "হেক্সাগোনাল আর্কিটেকচারের কেন্দ্রবিন্দু হলো 'Core Domain Entities & Business Rules'। এর বাইরে থাকে 'Ports' (ইনপুট ও আউটপুট ইন্টারফেস যেমন `IOrderRepository`, `IPaymentGateway`)। আর সবার বাইরের স্তরে থাকে 'Adapters' (ইনপুট অ্যাডাপ্টার হিসেবে Express HTTP রাউট এবং আউটপুট অ্যাডাপ্টার হিসেবে Prisma/PostgreSQL বা bKash SDK)। এর ফলে এক্সপ্রেস ফ্রেমওয়ার্ক বা ডাটাবেজ যেকোনো সময় রিপ্লেস করা যায় কিন্তু কোর বিজনেস লজিক ১০০% অপরিবর্তিত থাকে।",
          "b": "হেক্সাগোনাল আর্কিটেকচারে কোর বিজনেস লজিক ফ্রেমওয়ার্ক ও ডাটাবেজ থেকে সম্পূর্ণ স্বাধীন থাকে। পোর্টস ইন্টারফেসের সাহায্যে এক্সপ্রেস কন্ট্রোলার এবং ডাটাবেজ অ্যাডাপ্টার যুক্ত হয়, ফলে ভবিষ্যতে এক্সপ্রেস বা ডাটাবেজ পরিবর্তন করলেও কোর বিজনেসে কোনো হাত দিতে হয় না।",
          "e": "Hexagonal Architecture encapsulates Domain Entities and Use Cases inside the core, surrounded by Ports (interfaces). Outer Adapters plug into these ports: Driving Adapters (Express HTTP controllers) and Driven Adapters (Prisma, bKash APIs). This guarantees absolute framework-agnostic business logic.",
          "tip": "এন্টারপ্রাইজ ব্যাকএন্ড আর্কিটেকচারের জন্য হেক্সাগোনাল আর্কিটেকচার হলো প্রিমিয়ামতম আলোচনা।"
        },
        {
          "lvl": "lvl3",
          "q": "AsyncLocalStorage কী এবং Express-এ রিকোয়েস্ট ট্রেসিংয়ে (Correlation ID) এটি কীভাবে কাজ করে?",
          "m": "Node.js-এর `AsyncLocalStorage` থ্রেড-লোকাল স্টোরেজের মতো কাজ করে যা পুরো অ্যাসিনক্রোনাস কল চেইন জুড়ে ডেটা পারসিস্ট করে। আমরা প্রতিটি ইনকামিং রিকোয়েস্টে একটি ইউনিক `x-correlation-id` (UUID) তৈরি করি এবং `asyncLocalStorage.run({ traceId }, next)` দিয়ে রান করাই। এর চমৎকার সুবিধা হলো: সার্ভিস বা রিপোজিটরি লেয়ারে ম্যানুয়ালি `req` অবজেক্ট পাস না করেও যেকোনো ডিপ ফাংশন থেকে সরাসরি কারেন্ট ট্রেস আইডি রিড করা যায় এবং উইনস্টন লগে স্বয়ংক্রিয়ভাবে জুড়ে দেওয়া যায়।",
          "b": "AsyncLocalStorage প্রতিটি অ্যাসিনক্রোনাস চেইনের ভেতর কনটেক্সট ডাটা ধরে রাখে। এর মাধ্যমে রিকোয়েস্ট আইডি সব লেয়ারের লগে স্বয়ংক্রিয়ভাবে যুক্ত করে হাজার হাজার লাইভ রিকোয়েস্টের মধ্য থেকে নির্দিষ্ট ট্রানজাকশন ডিবাগ করা যায়।",
          "e": "AsyncLocalStorage creates asynchronous context continuity across nested function calls without passing `req` down the stack. It isolates request-scoped state (Correlation ID, tenantId), automatically attaching trace IDs to downstream Winston logs for end-to-end distributed tracing.",
          "code": "import { AsyncLocalStorage } from 'async_hooks';\nexport const requestContext = new AsyncLocalStorage<{ traceId: string }>();"
        },
        {
          "lvl": "lvl3",
          "q": "Event-Driven Architecture (EDA): ইনভয়েস তৈরি হওয়ার পর নোটিফিকেশন, ইনভেন্টরি হ্রাস ও অ্যাকাউন্টিং আপডেট কীভাবে ডিকাপল্ড করবে?",
          "m": "যদি ইনভয়েস তৈরির কন্ট্রোলারের ভেতরেই এসএমএস পাঠানো, স্টক কমানো এবং ব্যালেন্স শিট আপডেট কোড সিনক্রোনাসলি লেখা হয়, তবে যেকোনো একটি সার্ভিস স্লো হলে পুরো বিলিং হ্যাং হবে। সমাধান: ইনভয়েস তৈরির পর আমরা একটি ডোমেন ইভেন্ট ফায়ার করব (`eventEmitter.emit('invoice.created', invoice)` অথবা RabbitMQ/Kafka-তে মেসেজ পাঠাব)। বিভিন্ন স্বাধীন লিসেনার ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে সেই ইভেন্ট হ্যান্ডেল করবে। ফলে ইনভয়েস এপিআই মাত্র ২০ মিলিসেকেন্ডে ফিনিশ হয়ে যাবে।",
          "b": "ইভেন্ট-ড্রিভেন আর্কিটেকচারে মূল কাজ শেষ করে একটি ইভেন্ট প্রকাশ করা হয়। স্টক কাটা ও এসএমএস পাঠানোর কাজগুলো ব্যাকগ্রাউন্ড লিসেনার আলাদাভাবে সম্পন্ন করে, যার ফলে মূল এপিআই অবিলম্বে রেসপন্স দিতে পারে।",
          "e": "Decouple secondary side effects using Domain Events. The invoice service commits the sale and emits `invoice.created` over an EventEmitter or message broker (RabbitMQ/BullMQ). Subscribed decoupled workers handle SMS dispatch and ledger updates asynchronously.",
          "code": "eventBus.publish('order.created', { orderId: order.id, tenantId });"
        },
        {
          "lvl": "lvl3",
          "q": "Zero-Downtime Hot Code Reload এবং Blue-Green Deployment-এর সময় ইন-ফ্লাইট HTTP কানেকশন ড্রপ হওয়া কীভাবে রোধ করবে?",
          "m": "Blue-Green ডিপ্লয়মেন্টে আমরা দুটি আইডেন্টিকাল প্রোডাকশন এনভায়রনমেন্ট রাখি (Blue = বর্তমান লাইভ, Green = নতুন ভার্সন)। নতুন কোড গ্রীনে ডিপ্লয় করে হেলথ চেক পাস করার পর Nginx বা লোড ব্যালেন্সারে ট্রাফিক গ্রীনে সুইচ করা হয়। ব্লু পরিবেশ বন্ধ করার আগে একটি ৩০ সেকেন্ডের ড্রেন পিরিয়ড দেওয়া হয় যাতে পূর্বের চলমান ইন-ফ্লাইট রিকোয়েস্টগুলো সফলভাবে শেষ হতে পারে। কোনো ব্যবহারকারী কানেকশন ড্রপ বা এরর ফেস করে না।",
          "b": "ব্লু-গ্রিন ডিপ্লয়মেন্টে পুরানো সার্ভার বন্ধ করার আগে লোড ব্যালেন্সার নতুন সার্ভারে ট্রাফিক দেয় এবং চলমান কানেকশনগুলো শেষ করার জন্য ড্রেন পিরিয়ড দিয়ে জিরো ডাউনটাইম নিশ্চিত করে।",
          "e": "Blue-Green deployments spin up identical new production clusters (Green). Once health checks pass, the edge reverse proxy switches traffic instantaneously. The decommissioned Blue cluster drains active in-flight requests gracefully over 30 seconds before termination.",
          "tip": "ইন্টারভিউতে 'Connection Draining' এবং 'Health-check gating' শব্দগুলো উল্লেখ করবে।"
        },
        {
          "lvl": "lvl3",
          "q": "HTTP Request Smuggling এবং Prototype Pollution অ্যাটাক থেকে এক্সপ্রেস ব্যাকএন্ডকে কীভাবে সুরক্ষিত রাখবে?",
          "m": "Request Smuggling ঘটে যখন ফ্রন্টএন্ড রিভার্স প্রক্সি (Nginx) এবং ব্যাকএন্ড এক্সপ্রেস সার্ভার `Content-Length` বনাম `Transfer-Encoding` ভিন্নভাবে ব্যাখ্যা করে। সমাধান: HTTP/2 বা HTTP/3 স্ট্যান্ডার্ড এনফোর্স করা এবং Nginx-এ কনফ্লিক্টিং হেডার ব্লক করা। Prototype Pollution থেকে বাঁচতে: ইউজার ইনপুট পার্সিংয়ে অবজেক্টের `__proto__`, `constructor`, বা `prototype` কি কঠোরভাবে নিষিদ্ধ করতে হবে এবং Zod বা `Object.create(null)` ব্যবহার করতে হবে।",
          "b": "রিকোয়েস্ট স্মাগলিং ঠেকাতে রিভার্স প্রক্সিতে কঠোর এইচটিটিপি হেডার যাচাই করতে হবে। প্রোটোটাইপ পলিউশন প্রতিরোধে ইনপুটে __proto__ বা কনস্ট্রাক্টর ব্লক করে Zod স্কিমা দিয়ে ডাটা স্যানিটাইজ করা বাধ্যতামূলক।",
          "e": "Mitigate HTTP Request Smuggling by harmonizing HTTP/2 at edge proxies and rejecting ambiguous Transfer-Encoding/Content-Length headers. Eradicate Prototype Pollution by stripping `__proto__` and `constructor` keys via Zod and utilizing `Object.create(null)` dictionaries.",
          "code": "const safeDict = Object.create(null);"
        },
        {
          "lvl": "situation",
          "q": "প্রোডাকশনে একটি স্পেসিফিক Express রাউটে রিকোয়েস্ট পাঠালে ক্লায়েন্ট অনির্দিষ্টকালের জন্য লোডিং স্পিনার দেখে বসে থাকে এবং কোনো রেসপন্স পায় না। কীভাবে ট্রাবলশুট করবে?",
          "m": "কারণ: ওই রাউট হ্যান্ডলার বা কোনো ইন্টারমিডিয়েট মিডলওয়্যারে কোড এমন কোনো ব্রাঞ্চে (Branch) প্রবেশ করেছে যেখানে `res.send()` বা `res.json()` কল করা হয়নি এবং `next()` ও ডাকা হয়নি! ট্রাবলশুটিং: (১) কোডের সব `if/else` এবং `try/catch` ব্রাঞ্চ পরীক্ষা করব। (২) প্রোডাকশন প্রটেকশনের জন্য `express-timeout-handler` বা `connect-timeout` মিডলওয়্যার বসাব যা কোনো রিকোয়েস্ট ১০ সেকেন্ডের মধ্যে রেসপন্স না দিলে স্বয়ংক্রিয়ভাবে `504 Gateway Timeout` রিটার্ন করে কানেকশন ক্লোজ করবে।",
          "b": "এই সমস্যা ঘটে যখন কোনো মিডলওয়্যারে রেসপন্স পাঠানো হয় না এবং next() ও কল করা হয় না। কোডের সব শর্ত পরীক্ষা করতে হবে এবং connect-timeout মিডলওয়্যার দিয়ে সর্বোচ্চ সময়সীমা পার হলে স্বয়ংক্রিয় ৫০৪ টাইমআউট পাঠানোর ব্যবস্থা করতে হবে।",
          "e": "A hanging request signifies that execution hit a control path that neither ended the response (`res.json()`) nor invoked `next()`. Remedy by auditing unhandled conditional branches and wrapping the app with timeout middleware (`connect-timeout`) emitting 504 on timeouts.",
          "code": "app.use(timeout('10s'));\napp.use((req, res, next) => { if (!req.timedout) next(); });"
        },
        {
          "lvl": "situation",
          "q": "ব্যাকএন্ডে একটি ডাটাবেজ এক্সেপশন আসার পর ক্লায়েন্টে ফুল ডাটাবেজ টেবিল নাম ও স্ট্যাক ট্রেস এরর রেসপন্সে চলে গেছে। কীভাবে সিকিউরিটি লিক বন্ধ করবে?",
          "m": "এটি মারাত্মক ইনফরমেশন ডিসক্লোজার সিকিউরিটি দুর্বলতা। সমাধান: সেন্ট্রালাইজড এরর মিডলওয়্যারে আমরা চেক করব: `process.env.NODE_ENV === 'production'` হলে ক্লায়েন্টকে কখনোই র `err.message` বা `err.stack` পাঠানো যাবে না! ক্লায়েন্ট সবসময় একটি জেনেরিক মেসেজ পাবে: `{ success: false, message: 'অভ্যন্তরীণ সার্ভার ত্রুটি ঘটেছে', code: 'INTERNAL_SERVER_ERROR', traceId }`। আর আসল সম্পূর্ণ স্ট্যাক ট্রেস শুধুমাত্র সার্ভার-সাইড Winston লগ ফাইলে সেভ হবে।",
          "b": "প্রোডাকশনে স্ট্যাক ট্রেস ফাঁস হওয়া মারাত্মক ঝুঁকি। এরর মিডলওয়্যারে চেক করে ক্লায়েন্টকে শুধুমাত্র নিরাপদ জেনেরিক বার্তা পাঠাতে হবে এবং বিস্তারিত টেকনিক্যাল এরর সার্ভারের গোপন লগ ফাইলে সংরক্ষণ করতে হবে।",
          "e": "Leaking raw database stack traces enables reconnaissance attacks. Sanitize error responses globally inside the centralized error middleware: in production environments, log the raw stack internally to disk/Datadog and return strictly an opaque sanitized error payload alongside a Correlation ID.",
          "code": "app.use((err, req, res, next) => {\n  logger.error(err);\n  res.status(err.status || 500).json({\n    success: false,\n    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message\n  });\n});"
        },
        {
          "lvl": "situation",
          "q": "একটি থার্ড-পার্টি এপিআই কল মাঝে মাঝে ১০-১৫ সেকেন্ড সময় নিচ্ছে এবং এর ফলে নোড সার্ভারের কানেকশন পুল শেষ হয়ে অন্যান্য দ্রুতগতির এপিআইগুলো স্লো হয়ে পড়ছে। কীভাবে সমাধান করবে?",
          "m": "সমাধান: (১) থার্ড-পার্টি এপিআই কলের জন্য কঠোর টাইমআউট (যেমন ৩ সেকেন্ড) সেট করব (`axios.create({ timeout: 3000 })`)। (২) 'Circuit Breaker' প্যাটার্ন (যেমন `opossum` লাইব্রেরি) বাস্তবায়ন করব। যদি থার্ড-পার্টি সার্ভিস পরপর ৫ বার ফেইল বা স্লো হয়, সার্কিট ওপেন হয়ে যাবে এবং পরবর্তী রিকোয়েস্টগুলো থার্ড-পার্টিতে কল না করে তৎক্ষণাৎ ক্যাশড ফলব্যাক রিটার্ন করবে। থার্ড-পার্টি সুস্থ হলে সার্কিট আবার ক্লোজ হবে।",
          "b": "স্লো থার্ড-পার্টি এপিআইর জন্য ৩ সেকেন্ডের কঠোর টাইমআউট সেট করতে হবে। এছাড়া opossum লাইব্রেরি দিয়ে সার্কিট ব্রেকার প্যাটার্ন বাস্তবায়ন করে ক্রমাগত ব্যর্থ সার্ভিসে কল বন্ধ রেখে ফলব্যাক রেসপন্স দিতে হবে।",
          "e": "Enforce strict HTTP timeouts (e.g. 3000ms) on third-party calls. Implement the Circuit Breaker pattern via `opossum`: consecutive timeouts trip the breaker open, instantaneously shedding load to predefined fallbacks rather than saturating socket pools.",
          "code": "const breaker = new CircuitBreaker(callExternalApi, { timeout: 3000, errorThresholdPercentage: 50 });"
        },
        {
          "lvl": "situation",
          "q": "ব্যবহারকারী একটি এপিআইতে একই সাথে একাধিক ফাইল আপলোড করার সময় মেমোরি শেষ হয়ে সার্ভার ক্র্যাশ করছে। Multer দিয়ে কীভাবে লিমিট ও ফিল্টারিং করবে?",
          "m": "Multer কনফিগারেশনে আমরা কঠোর সীমা ও ফিল্টারিং দেব: (১) ফাইল সাইজ লিমিট: `limits: { fileSize: 5 * 1024 * 1024, files: 5 }` (সর্বোচ্চ ৫টি ফাইল, প্রতিটি সর্বোচ্চ ৫MB)। (২) `fileFilter` দিয়ে শুধুমাত্র অনুমোদিত MIME টাইপ (যেমন `image/jpeg`, `application/pdf`) গ্রহণ করব, ভুল এক্সটেনশন আসলে কাস্টম এরর থ্রো করব। (৩) মেমোরি স্টোরেজের বদলে `diskStorage` বা সরাসরি ক্লাউড স্ট্রিমিং ব্যবহার করব যাতে RAM ওভারফ্লো না হয়।",
          "b": "মাল্টার কনফিগারেশনে ফাইলের সাইজ লিমিট ৫ মেগাবাইট এবং ফাইলের সংখ্যা সর্বোচ্চ ৫টি নির্দিষ্ট করতে হবে। ফাইলফিল্টারের মাধ্যমে নির্দিষ্ট এক্সটেনশন যাচাই করতে হবে এবং মেমোরি স্টোরেজের বদলে ডিস্ক স্টোরেজ ব্যবহার করতে হবে।",
          "e": "Configure Multer bounds: enforce `fileSize` and file count boundaries in `limits`, reject unapproved MIME types via `fileFilter`, and employ `diskStorage` or direct cloud stream pipes rather than RAM-heavy `memoryStorage`.",
          "code": "const upload = multer({\n  storage: multer.diskStorage({ destination: '/tmp/uploads' }),\n  limits: { fileSize: 5 * 1024 * 1024, files: 3 },\n  fileFilter: (req, file, cb) => cb(null, ['image/png', 'image/jpeg'].includes(file.mimetype))\n});"
        },
        {
          "lvl": "situation",
          "q": "একজন ব্যবহারকারী কুয়েরি প্যারামিটারে স্পেশাল ক্যারেক্টার বা এসকিউএল ইনজেকশন স্ট্রিং পাস করায় এপিআই 500 এরর দিচ্ছে। কন্ট্রোলার লেয়ারে কীভাবে এটিকে প্রিভেন্ট করবে?",
          "m": "কন্ট্রোলারের একদম শুরুতে আমরা Zod দিয়ে কুয়েরি প্যারামিটার ভ্যালিডেট করব (`QuerySchema.parse(req.query)`। Zod ইনপুটের টাইপ, ফরম্যাট ও দৈর্ঘ্য যাচাই করে। ডাটাবেজে ডাটা পাঠানোর সময় কখনোই স্ট্রিং কনক্যাটেনেশন (`SELECT * FROM table WHERE id = '` + id) করব না; সবসময় প্যারামিটারাইজড কুয়েরি (Parameterized Query) বা Prisma ORM ব্যবহার করব যা স্বয়ংক্রিয়ভাবে SQL ইনজেকশন প্রতিহত করে।",
          "b": "কন্ট্রোলারের শুরুতে Zod দিয়ে req.query পার্স করতে হবে। ডাটাবেজ কুয়েরিতে কখনোই সরাসরি স্ট্রিং যুক্ত না করে প্যারামিটারাইজড কুয়েরি বা প্রিজমা ব্যবহার করলে এসকিউএল ইনজেকশন শতভাগ প্রতিহত হয়।",
          "e": "Validate `req.query` schemas with Zod at the controller boundary. Never interpolate user inputs into raw SQL statements; utilize parameterized prepared statements or Prisma ORM to guarantee SQL injection immunity.",
          "code": "const { search, page } = QuerySchema.parse(req.query);\nconst results = await prisma.product.findMany({ where: { name: { contains: search } } });"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর মাল্টি-টেন্যান্ট SaaS আর্কিটেকচারে প্রতি রিকোয়েস্টে Tenant ID এক্সট্র্যাক্ট করে ডাটাবেজ আইসোলেশন Express Middleware-এ কীভাবে করেছিলে?",
          "m": "আমরা একটি সেন্ট্রালাইজড `tenantResolverMiddleware` তৈরি করেছিলাম। এটি ইনকামিং রিকোয়েস্টের সাবডোমেন (`tenant.dokani.com`) অথবা কাস্টম হেডার `x-tenant-id` রিড করত। এরপর ডেটাবেজে টেন্যান্টের অস্তিত্ব যাচাই করে `req.tenantId = tenant.id` হিসেবে সেট করত। সার্ভিস এবং রিপোজিটরি লেয়ারে প্রতিটি Prisma কুয়েরির ভেতর `{ where: { tenantId: req.tenantId, ... } }` অটোমেটিক ইনজেক্ট হতো, ফলে কোনো অবস্থাতেই এক দোকানের ডাটা অন্য দোকানের স্ক্রিনে যাওয়ার সুযোগ ছিল না।",
          "b": "দোকানি সিস্টেমে আমরা টেন্যান্ট মিডলওয়্যার দিয়ে সাবডোমেন বা হেডার থেকে টেন্যান্ট আইডি বের করে req অবজেক্টে যুক্ত করেছিলাম। ডাটাবেজের প্রতিটি কুয়েরিতে স্বয়ংক্রিয়ভাবে এই টেন্যান্ট আইডি শর্ত যুক্ত করায় শতভাগ ডাটা আইসোলেশন নিশ্চিত ছিল।",
          "e": "In Dokani POS SaaS, a custom `tenantResolverMiddleware` resolved tenants via host subdomains or `x-tenant-id` headers, injecting `req.tenantId`. Downstream repositories scoped all queries strictly with `{ tenantId }` predicates.",
          "tip": "মাল্টি-টেন্যান্ট ডেটাবেজ আইসোলেশন নিশ্চিত করার এই মিডলওয়্যার ডিজাইন যেকোনো এন্টারপ্রাইজ SaaS রোলে সবচেয়ে শক্তিশালী প্রমাণ।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ দ্রুতগতির সেলস এন্ট্রিতে ইনভয়েস তৈরি করার সময় কন্ট্রোলার, সার্ভিস ও রিপোজিটরির স্পষ্ট কোড ডিস্ট্রিবিউশন কেমন ছিল?",
          "m": "আমাদের আর্কিটেকচার ছিল: (১) `InvoiceController`: Zod দিয়ে রিকোয়েস্ট বডি ভ্যালিডেট করে `invoiceService.createSale(req.tenantId, req.user.id, validData)` কল করত। (২) `InvoiceService`: ইনভেন্টরি স্টক পর্যাপ্ত কি না যাচাই করত, ভ্যাট ও ডিসকাউন্ট নিয়ম প্রয়োগ করত, এবং ডাটাবেজ ট্রানজাকশন অর্কেস্ট্রেট করত। (৩) `InvoiceRepository`: Prisma-র মাধ্যমে একটি সিঙ্গেল ACID ট্রানজাকশনে ইনভয়েস, সেলস আইটেমস, পেমেন্ট রেকর্ড এবং স্টক ডিডাক্ট অপারেশন এক্সিকিউট করত।",
          "b": "দোকানি ইনভয়েস সৃষ্টিতে কন্ট্রোলার ইনপুট ডাটা যাচাই করত, সার্ভিস ব্যবসায়িক শর্ত ও স্টক প্রাপ্যতা পরীক্ষা করত এবং রিপোজিটরি প্রিজমা ট্রানজাকশনের মাধ্যমে ডাটাবেজে নিরাপদ বিক্রয় এন্ট্রি সম্পন্ন করত।",
          "e": "In Dokani POS, the controller sanitized DTOs via Zod; the service validated inventory availability, calculated multi-tier taxes, and composed the transaction; the repository executed the atomic multi-table ACID commit via Prisma.",
          "code": "// Service layer encapsulates business logic cleanly:\nexport class SalesService {\n  async createInvoice(tenantId: string, dto: CreateInvoiceDto) {\n    await this.inventoryRepo.assertStock(tenantId, dto.items);\n    return await this.invoiceRepo.commitSale(tenantId, dto);\n  }\n}"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে লাইভ এক্সামের লাখ লাখ রিকোয়েস্টের চাপ সামলাতে Express API-তে Redis Caching কীভাবে আর্কিটেক্ট করেছিলে?",
          "m": "কোর্স সিলেবাস এবং প্রশ্নপত্রের মতো অপরিবর্তনশীল ডেটার জন্য আমরা একটি `redisCacheMiddleware('60s')` ব্যবহার করেছি। মিডলওয়্যারটি রিকোয়েস্টের URL-কে ক্যাশ কি হিসেবে ব্যবহার করে প্রথমে রেডিস চেক করত; ক্যাশ হিট হলে মাত্র ২ মিলিসেকেন্ডে রেডিস থেকে ডাটা রিটার্ন করত—ডাটাবেজে কোনো হিটই যেত না। শিক্ষক কোনো প্রশ্ন আপডেট করলে `cacheInvalidationService` দিয়ে সংশ্লিষ্ট রেডিস কি ফ্ল্যাশ করা হতো। ফলে ডাটাবেজ লোড ৯৫% কমে গিয়েছিল।",
          "b": "পিটিটিএবিডি পরীক্ষায় আমরা রেডিস ক্যাশিং মিডলওয়্যার ব্যবহার করে প্রশ্নপত্র ২ মিলিসেকেন্ডে ডেলিভারি নিশ্চিত করেছি। শিক্ষক প্রশ্ন পরিবর্তন করলে স্বয়ংক্রিয়ভাবে ক্যাশ মুছে দেওয়া হতো, ফলে ডাটাবেজের ওপর কোনো চাপ পড়েনি।",
          "e": "Constructed a reusable Redis cache middleware for read-heavy course catalogs in PTTABD. Cache hits returned in sub-2ms directly from Redis memory. Instructor mutations emitted targeted cache purges, slashing database CPU consumption by 95%.",
          "code": "const cacheMiddleware = (ttl) => async (req, res, next) => {\n  const cached = await redis.get(req.originalUrl);\n  if (cached) return res.json(JSON.parse(cached));\n  res.sendResponse = res.json;\n  res.json = (body) => { redis.setex(req.originalUrl, ttl, JSON.stringify(body)); res.sendResponse(body); };\n  next();\n};"
        },
        {
          "lvl": "realworld",
          "q": "Express অ্যাপ্লিকেশনে Winston এবং Morgan দিয়ে প্রোডাকশন গ্রেড স্ট্রাকচার্ড JSON লগিং কীভাবে বাস্তবায়ন করেছিলে?",
          "m": "আমরা প্লেইন টেক্সট `console.log()` সম্পূর্ণ নিষিদ্ধ করেছিলাম। আমরা `winston` দিয়ে একটি সেন্ট্রালাইজড লগার বানিয়েছি যা সব লগ JSON ফরম্যাটে আউটপুট দেয় (Timestamp, Level, CorrelationId, Message, StackTrace সহ)। `morgan` মিডলওয়্যার দিয়ে প্রতিটি ইনকামিং HTTP রিকোয়েস্টের মেথড, স্ট্যাটাস কোড এবং রেসপন্স টাইম উইনস্টনের স্ট্রিমে পাঠানো হতো। প্রোডাকশনে `winston-daily-rotate-file` দিয়ে প্রতিদিনের লগ আলাদা ফাইলে সেভ এবং ১৪ দিন পর অটো-কম্প্রেস করা হতো।",
          "b": "উইনস্টন এবং মরগান দিয়ে আমরা স্ট্রাকচার্ড JSON লগিং ব্যবস্থা করেছি যা রিকোয়েস্টের সময়, স্ট্যাটাস ও এরর ট্র্যাক করত। ডেইলি রোটেট ফাইলের মাধ্যমে প্রতিদিনের লগ স্বয়ংক্রিয়ভাবে সংরক্ষিত ও কম্প্রেস করা হতো।",
          "e": "Implemented structured JSON logging via Winston piped into Morgan HTTP access hooks. Logs carried automated timestamps, log levels, and request Correlation IDs, rotated daily and archived after 14 days using `winston-daily-rotate-file`.",
          "code": "const logger = winston.createLogger({\n  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),\n  transports: [new winston.transports.DailyRotateFile({ filename: 'logs/app-%DATE%.log' })]\n});"
        },
        {
          "lvl": "realworld",
          "q": "Express ব্যাকএন্ডে OpenAPI / Swagger (`swagger-ui-express`) দিয়ে লাইভ এপিআই ডকুমেন্টেশন কীভাবে অটোমেটেড করেছিলে?",
          "m": "আমরা `tsoa` অথবা `zod-to-openapi` ব্যবহার করেছি। আলাদাভাবে কোনো ম্যানুয়াল YAML বা JSON ডক না লিখে আমরা আমাদের কন্ট্রোলারের টাইপস্ক্রিপ্ট টাইপ এবং Zod স্কিমা থেকেই সরাসরি Swagger OpenAPI 3.0 স্পেসিফিকেশন স্বয়ংক্রিয়ভাবে জেনারেট করেছি। এরপর `/api/docs` এন্ডপয়েন্টে `swagger-ui-express` মাউন্ট করায় ফ্রন্টএন্ড ডেভেলপাররা যেকোনো সময় লাইভ ইন্টারঅ্যাক্টিভ এপিআই টেস্ট ও ডকুমেন্টেশন ব্রাউজ করতে পেরেছে।",
          "b": "আমরা Zod স্কিমা থেকে স্বয়ংক্রিয়ভাবে ওপেন-এপিআই স্পেসিফিকেশন তৈরি করে swagger-ui-express এর মাধ্যমে /api/docs এ লাইভ ডকুমেন্টেশন সরবরাহ করেছি, ফলে ম্যানুয়ালি ডক লেখার সময় বেঁচেছিল।",
          "e": "Automated API documentation by compiling Zod validation schemas and TypeScript DTOs directly into OpenAPI 3.0 specs using `zod-to-openapi`. Mounted on `/api/docs` via `swagger-ui-express`, this provided frontend engineers interactive live API sandboxes.",
          "tip": "কোড থেকেই ডকুমেন্টেশন স্বয়ংক্রিয় জেনারেট করার কথা বলা মডার্ন সফটওয়্যার ইঞ্জিনিয়ারিংয়ের দৃষ্টান্ত।"
        }
      ]
    },
    {
      "id": "backend-typescript",
      "name": "TypeScript in Backend & DTOs",
      "desc": "TypeScript in Node/Express, DTO Patterns, Express Request Augmentation, Type-safe Services, Strict Compiler Options",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Node.js এবং Express ব্যাকএন্ডে সাধারণ জাভাস্ক্রিপ্টের চেয়ে TypeScript ব্যবহারের প্রধান সুবিধাসমূহ কী?",
          "m": "প্লেইন জাভাস্ক্রিপ্ট ব্যাকএন্ডে টাইপো বা ডেটা শেপের ভুলে রানটাইমে সার্ভার ক্র্যাশ হওয়ার ঝুঁকি খুব বেশি থাকে (`TypeError: Cannot read properties of undefined`)। TypeScript ব্যবহারের সুবিধা: (১) কম্পাইল টাইমে শতভাগ টাইপ চেকিং যা রানটাইম ক্র্যাশ বন্ধ করে। (২) Data Transfer Objects (DTO) ডিফাইন করে এপিআই রিকোয়েস্ট ও রেসপন্সের স্পষ্ট চুক্তি তৈরি করা যায়। (৩) রিফ্যাক্টরিং অত্যন্ত নিরাপদ হয় এবং আইডিই-তে অসাধারণ অটো-কমপ্লিশন পাওয়া যায়। (৪) ওআরএম (Prisma) এর সাথে শতভাগ নিখুঁত ডাটাবেজ টাইপ সেফটি দেয়।",
          "b": "টাইপস্ক্রিপ্ট কম্পাইল টাইমে টাইপ যাচাই করে রানটাইম সার্ভার ক্র্যাশ প্রতিরোধ করে। এর মাধ্যমে এপিআই রিকোয়েস্টের জন্য সুনির্দিষ্ট ডিটিও (DTO) কাঠামো তৈরি করা যায় এবং ডাটাবেজ মডেলের সাথে ব্যাকএন্ড কোডের নির্ভুল সামঞ্জস্য বজায় থাকে।",
          "e": "TypeScript transforms Node.js backends by detecting null dereferences and type regressions at compile time rather than crashing in production. It formalizes API contracts via DTOs and provides seamless type synchronization with ORMs like Prisma.",
          "tip": "ইন্টারভিউতে বলবে: 'প্রোডাকশন এন্টারপ্রাইজ ব্যাকএন্ডে টাইপস্ক্রিপ্ট ছাড়া কাজ করা রানটাইম ক্র্যাশের ঝুঁকি বাড়িয়ে দেয়'।"
        },
        {
          "lvl": "lvl1",
          "q": "Express-এর `Request` অবজেক্টকে TypeScript-এ কীভাবে কাস্টম ফিল্ড (যেমন `req.user`, `req.tenantId`) দিয়ে এক্সটেন্ড বা অগমেন্ট (Augment) করা যায়?",
          "m": "Express-এর ডিফল্ট `Request` টাইপে কোনো `user` বা `tenantId` প্রপার্টি থাকে না। তাই `req.user = decodedToken` লিখলে টাইপস্ক্রিপ্ট কম্পাইল এরর দেয়। সমাধান: আমরা প্রজেক্টের `src/@types/express/index.d.ts` ফাইলে Declaration Merging ব্যবহার করি: `declare global { namespace Express { interface Request { user?: AuthUser; tenantId?: string; } } }`। এর ফলে পুরো প্রজেক্টে যেকোনো রাউট বা মিডলওয়্যারে `req.user` সম্পূর্ণ টাইপ-সেফ হয়ে যায়।",
          "b": "এক্সপ্রেস রিকোয়েস্টে কাস্টম ডাটা যুক্ত করতে ডিক্লারেশন মার্জিং ব্যবহার করে Express.Request ইন্টারফেসকে এক্সটেন্ড করতে হয়। এর ফলে req.user এবং req.tenantId কোনো টাইপস্ক্রিপ্ট এরর ছাড়াই নিরাপদে ব্যবহার করা যায়।",
          "e": "Augment Express's ambient Request interface via TypeScript declaration merging in a custom `.d.ts` file (`namespace Express { interface Request { user?: User; } }`). This yields compile-time type safety across all middleware.",
          "code": "declare global {\n  namespace Express {\n    interface Request {\n      user?: { id: string; role: string };\n      tenantId?: string;\n    }\n  }\n}"
        },
        {
          "lvl": "lvl1",
          "q": "DTO (Data Transfer Object) প্যাটার্ন কী এবং কেন ব্যাকএন্ড এপিআই কন্ট্রোলারে এটি ব্যবহার করা উচিত?",
          "m": "DTO হলো এমন একটি অবজেক্ট যা ক্লায়েন্ট এবং সার্ভারের মধ্যে ঠিক কোন কোন ডেটা আদান-প্রদান হবে তার সুনির্দিষ্ট স্কিমা ও টাইপ নির্ধারণ করে। ক্লায়েন্ট হয়তো রিকোয়েস্টে ৫০টি ফিল্ড পাঠাতে পারে বা কোনো ম্যালিশিয়াস ফিল্ড (যেমন `isAdmin: true`) ইনজেক্ট করতে পারে। কন্ট্রোলারে একটি `CreateUserDto` থাকলে আমরা শুধুমাত্র অনুমোদিত ফিল্ডগুলোই গ্রহণ করি। এটি ব্যাকএন্ডের অভ্যন্তরীণ ডাটাবেজ মডেলকে ক্লায়েন্ট থেকে সুরক্ষিতভাবে বিচ্ছিন্ন (Decoupled) রাখে।",
          "b": "ডিটিও হলো ক্লায়েন্ট ও সার্ভারের মধ্যে ডেটা আদান-প্রদানের সুনির্দিষ্ট কাঠামো। এটি ক্লায়েন্ট থেকে আসা অননুমোদিত ডেটা ফিল্টার করে বাদ দেয় এবং অভ্যন্তরীণ ডাটাবেজের রূপরেখা সুরক্ষিত রাখে।",
          "e": "A Data Transfer Object (DTO) defines the exact shape of data entering or leaving an API endpoint. DTOs sanitize incoming payloads against mass-assignment vulnerabilities, decoupling external contracts from underlying database schemas.",
          "code": "export interface CreateProductDto {\n  name: string;\n  price: number;\n  stock: number;\n  categoryId: string;\n}"
        },
        {
          "lvl": "lvl1",
          "q": "TypeScript ব্যাকএন্ড প্রজেক্ট কম্পাইল ও বিল্ড করতে `tsc` বনাম `ts-node` বনাম `tsx` এর ভূমিকা কী?",
          "m": "`ts-node` এবং `tsx` হলো লোকাল ডেভেলপমেন্ট টুল যা কোনো ম্যানুয়াল কম্পাইলেশন ছাড়া সরাসরি মেমোরিতে `.ts` ফাইল রান করে (হট রিলোড সহ)। তবে প্রোডাকশনে কখনোই `ts-node` চালানো যাবে না কারণ এটি প্রচুর RAM ও CPU নষ্ট করে। প্রোডাকশনের জন্য আমরা `tsc` (TypeScript Compiler) অথবা `esbuild`/`swc` দিয়ে কোডকে অপটিমাইজড প্লেইন জাভাস্ক্রিপ্টে (`dist/` ফোল্ডারে) বিল্ড করি এবং নোড দিয়ে সরাসরি `node dist/server.js` এক্সিকিউট করি।",
          "b": "ডেভেলপমেন্টে দ্রুত রান করার জন্য tsx বা ts-node ব্যবহার করা হয়। কিন্তু প্রোডাকশনে সর্বদা tsc দিয়ে কম্পাইল করে প্রাপ্ত বিশুদ্ধ জাভাস্ক্রিপ্ট ফাইল চালানো হয় যা সর্বোচ্চ গতি ও মেমোরি দক্ষতা নিশ্চিত করে।",
          "e": "`tsx` and `ts-node` execute TypeScript on the fly in memory for rapid local development. In production, run pre-compiled JavaScript emitted by `tsc` or SWC (`node dist/main.js`) to eradicate runtime JIT transpilation overhead.",
          "tip": "কখনোই প্রোডাকশন সার্ভারে `ts-node` চালাবে না; সবসময় বিল্ড করা `dist/` জাভাস্ক্রিপ্ট রান করবে।"
        },
        {
          "lvl": "lvl1",
          "q": "Backend `tsconfig.json`-এ কোন কোন কনফিগারেশন ফ্ল্যাগ অত্যন্ত গুরুত্বপূর্ণ?",
          "m": "গুরুত্বপূর্ণ ফ্ল্যাগগুলো: (১) `target: 'ES2022'`: আধুনিক নোড রানটাইমের জন্য অপটিমাইজড জাভাস্ক্রিপ্ট আউটপুট। (২) `moduleResolution: 'node'` বা `'nodenext'`: নোডের মডিউল রেজোলিউশন নিশ্চিত করা। (৩) `strict: true`: সর্বোচ্চ টাইপ সেফটি। (৪) `outDir: './dist'`: কম্পাইল করা JS ফাইল রাখার লোকেশন। (৫) `esModuleInterop: true`: CommonJS প্যাকেজগুলো স্বচ্ছন্দে ESM স্টাইলে ইমপোর্ট করার সুবিধা।",
          "b": "ব্যাকএন্ডের tsconfig কনফিগারেশনে target, moduleResolution, strict: true, outDir এবং esModuleInterop অত্যন্ত জরুরি যাতে আধুনিক নোড ও ডিপেনডেন্সিগুলোর সাথে টাইপস্ক্রিপ্ট মসৃণভাবে চলে।",
          "e": "Crucial backend tsconfig options: `target: 'ES2022'`, `module: 'commonjs'` (or NodeNext), `moduleResolution: 'node'`, `strict: true` (for null checks), `outDir: './dist'`, and `esModuleInterop: true` for clean CommonJS interop.",
          "code": "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"commonjs\",\n    \"outDir\": \"./dist\",\n    \"rootDir\": \"./src\",\n    \"strict\": true,\n    \"esModuleInterop\": true,\n    \"skipLibCheck\": true\n  }\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Class Validator এবং Class Transformer দিয়ে কীভাবে ক্লাস-বেসড DTO তৈরি করে অটোমেটিক ভ্যালিডেশন করা যায়?",
          "m": "NestJS বা আধুনিক Express অ্যাপে আমরা `class-validator` ডেকোরেটর ব্যবহার করি (যেমন `@IsString()`, `@IsEmail()`, `@Min(1)`। কন্ট্রোলারে ইনকামিং JSON পেলে `plainToInstance(CreateUserDto, req.body)` দিয়ে ক্লাসে কনভার্ট করি এবং `validate(dto)` কল করি। কোনো নিয়ম লঙ্ঘন হলে এটি বিস্তারিত এরর অ্যারে দেয়। এটি অবজেক্ট-ওরিয়েন্টেড স্টাইলে অত্যন্ত পরিচ্ছন্ন ও রি-ইউজেবল কোড দেয়।",
          "b": "ক্লাস ভ্যালিডেটর ডেকোরেটর ব্যবহারের মাধ্যমে ডিটিও ক্লাসের ভেতরেই ভ্যালিডেশনের নিয়ম সংজ্ঞায়িত করা হয়। এর ফলে রিকোয়েস্ট বডি ক্লাসে রূপান্তর করে স্বয়ংক্রিয়ভাবে ইনপুট ডাটা যাচাই করা যায়।",
          "e": "Pairing `class-validator` decorators with `class-transformer` permits declarative schema definitions directly on class properties. Invoking `validate(dtoInstance)` checks the request payload against validation constraints prior to service execution.",
          "code": "import { IsEmail, MinLength } from 'class-validator';\nexport class LoginDto {\n  @IsEmail() email!: string;\n  @MinLength(8) password!: string;\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Generic API Response Wrapper টাইপ কীভাবে তৈরি করবে যা প্রতিটি এপিআই রেসপন্সে টাইপ সেফটি নিশ্চিত করে?",
          "m": "আমরা একটি জেনেরিক ইন্টারফেস `ApiResponse<T>` তৈরি করি: `{ success: boolean; data: T; message?: string; error?: string; timestamp: string }`। কন্ট্রোলারে যখন আমরা কোনো প্রোডাক্ট রিটার্ন করি, রেসপন্স টাইপ হবে `ApiResponse<Product>`। যদি কোনো লিস্ট রিটার্ন করি, টাইপ হবে `ApiResponse<PaginatedResult<Product>>`। এর ফলে ফ্রন্টএন্ড এবং ব্যাকএন্ড উভয়ের জন্য এপিআই রেসপন্সের স্ট্রাকচার সম্পূর্ণ অভিন্ন ও টাইপ-সেফ থাকে।",
          "b": "জেনেরিক এপিআই রেসপন্স র‍্যাপার সকল এপিআইর জন্য একটি অভিন্ন কাঠামো তৈরি করে। ApiResponse<T> ব্যবহারের ফলে সফল বা ব্যর্থ উভয় ক্ষেত্রে ক্লায়েন্ট সবসময় প্রত্যাশিত সুনির্দিষ্ট ডাটা টাইপ পায়।",
          "e": "A generic response contract `ApiResponse<T>` standardizes payloads across the entire service ecosystem, pairing boolean success indicators with payload `data: T` and ISO timestamps for bulletproof frontend-backend integration.",
          "code": "export interface ApiResponse<T> {\n  success: boolean;\n  data: T;\n  message?: string;\n  meta?: { page: number; total: number };\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Express Request Handler-এর জন্য টাইপড কন্ট্রোলার ইন্টারফেস (`RequestHandler<Params, ResBody, ReqBody, ReqQuery>`) কীভাবে লিখতে হয়?",
          "m": "Express-এর `@types/express` মডিউল একটি ৪-প্যারামিটারের জেনেরিক টাইপ দেয়: `RequestHandler<P, ResBody, ReqBody, ReqQuery>`. এর মাধ্যমে আমরা কন্ট্রোলারের প্রতিটি প্যারামিটার строго টাইপ করতে পারি: যেমন `RequestHandler<{ id: string }, ApiResponse<Product>, UpdateProductDto, { includeStock?: string }>`। এর ফলে `req.params.id`, `req.body`, এবং `req.query` এর ওপর সম্পূর্ণ টাইপস্ক্রিপ্ট টাইপ সেফটি ও স্বয়ংক্রিয় অটো-কমপ্লিট সক্রিয় হয়।",
          "b": "এক্সপ্রেসের RequestHandler জেনেরিক টাইপের মাধ্যমে রাউট প্যারামস, রেসপন্স বডি, রিকোয়েস্ট বডি এবং কুয়েরি প্যারামিটার শতভাগ টাইপ-সেফ করা যায়, ফলে ভুল প্রপার্টি ব্যবহারের কোনো সুযোগ থাকে না।",
          "e": "Express provides the generic `RequestHandler<P, ResBody, ReqBody, ReqQuery>`. Specifying these type parameters enforces compile-time safety over URL path params, expected response schemas, body DTOs, and query strings.",
          "code": "export const updateProduct: RequestHandler<{ id: string }, ApiResponse<Product>, UpdateProductDto> = async (req, res) => {\n  // req.params.id and req.body are strictly typed!\n};"
        },
        {
          "lvl": "lvl2",
          "q": "Path Aliases (`@/services/...`, `@/models/...`) কীভাবে `tsconfig.json` এবং বিল্ড টুলে কনফিগার করবে যাতে রিলেটিভ পাথের বিশৃঙ্খলা (`../../../`) দূর হয়?",
          "m": "আমরা `tsconfig.json`-এ `baseUrl: '.'` এবং `paths: { '@/*': ['src/*'] }` সেট করি। কিন্তু শুধু tsconfig দিলে প্রোডাকশনে কম্পাইল করা JS ফাইল রান হতে গিয়ে এরর দেবে কারণ নোড সরাসরি এলিয়াস বোঝে না। সমাধান: বিল্ডের সময় `tsc-alias` প্যাকেজ দিয়ে এলিয়াসগুলোকে আসল রিলেটিভ পাথে রূপান্তর করি, অথবা রানটাইমে `tsconfig-paths` রেজিস্টার করি।",
          "b": "পাথ এলিয়াসের মাধ্যমে কোডের ভেতরে বিশ্রী ../../ পাথ পরিহার করে পরিষ্কার @/services পাথ ব্যবহার করা যায়। বিল্ডের সময় tsc-alias ব্যবহার করে পাথগুলো সমাধান করে প্রোডাকশন রান উপযোগী করা হয়।",
          "e": "Configure path aliases in tsconfig via `baseUrl` and `paths`. To prevent production runtime module resolution crashes, run `tsc-alias` post-build to rewrite compile aliases back into relative file paths.",
          "code": "// tsconfig.json\n\"paths\": {\n  \"@services/*\": [\"src/services/*\"],\n  \"@models/*\": [\"src/models/*\"]\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Type-safe Environment Variables: `process.env` কে কীভাবে Zod দিয়ে টাইপ-সেফ ও রানটাইম-ভ্যালিডেটেড করবে?",
          "m": "বাই-ডিফল্ট `process.env.PORT` হলো `string | undefined`, যা বাগে ফেলে। আমরা একটি `env.schema.ts` ফাইল তৈরি করি এবং Zod দিয়ে স্কিমা ডিফাইন করি (`PORT: z.coerce.number().default(5000), DATABASE_URL: z.string().url()`)। সার্ভার বুটের শুরুতে `EnvSchema.parse(process.env)` কল করি। কোনো ভ্যারিয়েবল মিসিং থাকলে সার্ভার চালু হওয়ার আগেই স্পষ্ট এরর দিয়ে বন্ধ হয়ে যাবে, ফলে রানটাইমে অপ্রত্যাশিত ক্র্যাশ এড়ানো যায়।",
          "b": "process.env কে সুরক্ষিত করতে Zod স্কিমা দিয়ে ডাটাবেজ ইউআরএল ও পোর্ট যাচাই করা হয়। কোনো গোপন কি মিসিং থাকলে সার্ভার সাথে সাথে স্পষ্ট নোটিশ দিয়ে বন্ধ হবে, যা রানটাইম বাগ প্রতিরোধ করে।",
          "e": "Default `process.env` properties are untyped optional strings. Parse environment variables at application startup through a Zod schema. If mandatory variables (e.g. DATABASE_URL) are missing, fail fast with explicit console diagnostics.",
          "code": "const EnvSchema = z.object({\n  PORT: z.coerce.number().default(4000),\n  DATABASE_URL: z.string().url(),\n  JWT_SECRET: z.string().min(32)\n});\nexport const env = EnvSchema.parse(process.env);"
        },
        {
          "lvl": "lvl3",
          "q": "tRPC (TypeScript Remote Procedure Call) কী এবং কীভাবে এটি ফ্রন্টএন্ড ও ব্যাকএন্ডের মধ্যে অ্যান্ড-টু-অ্যান্ড জিরো-এপিআই টাইপ সেফটি প্রদান করে?",
          "m": "tRPC হলো এমন একটি আর্কিটেকচার যা কোনো কোড জেনারেশন বা স্কিমা ফাইল ছাড়াই ব্যাকএন্ডের রাউটার টাইপকে সরাসরি ফ্রন্টএন্ডে ইমপোর্ট করতে দেয় (`AppRouter`)। আপনি ব্যাকএন্ড সার্ভিসের রিটার্ন টাইপ পরিবর্তন করলে ফ্রন্টএন্ডের যে যে কম্পোনেন্টে ওই ডেটা ব্যবহৃত হয়েছে সেখানে সাথে সাথে কম্পাইল এরর ফুটে ওঠে! কোনো REST API ডকুমেন্টেশন বা টাইপো হওয়ার কোনো সুযোগ নেই—এটি ফুল-স্ট্যাক টাইপ সেফটির শীর্ষ স্ট্যান্ডার্ড।",
          "b": "tRPC ব্যাকএন্ডের টাইপকে সরাসরি ফ্রন্টএন্ডে শেয়ার করে সম্পূর্ণ জিরো-এপিআই টাইপ সেফটি দেয়। ব্যাকএন্ডে কোনো ফিল্ড পরিবর্তন করলে ফ্রন্টএন্ডে সাথে সাথে টাইপ এরর প্রদর্শন করে কোডের নির্ভুলতা রক্ষা করে।",
          "e": "tRPC allows sharing server router types directly with client applications without code generation or schemas. Mutating a backend query or mutation signature instantly raises compile-time errors across dependent frontend components.",
          "tip": "NT Tech বা যেকোনো আধুনিক ফুল-স্ট্যাক রোলে tRPC-র ধারণা জানা বিরাট কম্পিটিটিভ অ্যাডভান্টেজ।"
        },
        {
          "lvl": "lvl3",
          "q": "TypeScript-এ Service Layer-এর জন্য Generic Repository Pattern ইন্টারফেস কীভাবে ডিজাইন করবে?",
          "m": "আমরা একটি জেনেরিক রিপোজিটরি ইন্টারফেস তৈরি করি: `interface IBaseRepository<T, CreateDto, UpdateDto> { findById(id: string): Promise<T | null>; findAll(filter: QueryFilter): Promise<T[]>; create(data: CreateDto): Promise<T>; update(id: string, data: UpdateDto): Promise<T>; delete(id: string): Promise<boolean>; }`। প্রতিটি স্পেসিফিক রিপোজিটরি (যেমন `IProductRepository`) এই ইন্টারফেস এক্সটেন্ড করে তার নিজস্ব ডোমেন মেথড যোগ করে। এর ফলে সম্পূর্ণ কোডবেজে ডাটাবেজ ইন্টারঅ্যাকশন অত্যন্ত ইউনিফর্ম ও টাইপ-সেফ থাকে।",
          "b": "জেনেরিক রিপোজিটরি প্যাটার্নে একটি সাধারণ ইন্টারফেস তৈরি করা হয় যা সকল ডাটাবেজ মডেলের ক্রাড (CRUD) অপারেশনে টাইপ সেফটি বজায় রাখে এবং কোড পুনরাবৃত্তি রোধ করে।",
          "e": "A generic repository interface `IBaseRepository<T, TCreateDto, TUpdateDto>` formalizes uniform CRUD persistence operations across entities, promoting DRY code and seamless integration with dependency injection containers.",
          "code": "export interface IBaseRepository<T, C, U> {\n  find(id: string): Promise<T | null>;\n  create(payload: C): Promise<T>;\n  update(id: string, payload: U): Promise<T>;\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Monorepo আর্কিটেকচারে (Turborepo / Nx) ফ্রন্টএন্ড ও ব্যাকএন্ডের মধ্যে কীভাবে একটি শেয়ার্ড টাইপস ও Zod প্যাকেজ (`@workspace/shared`) শেয়ার করা যায়?",
          "m": "মনোরিপোতে আমরা একটি স্বাধীন শেয়ার্ড প্যাকেজ রাখি: `packages/shared`। সেখানে সব ডেটাবেজ এনটিটি টাইপস, Zod স্কিমাস এবং এরর কোড ডিফাইন করে এক্সপোর্ট করা হয়। ব্যাকএন্ড এক্সপ্রেস অ্যাপ এবং ফ্রন্টএন্ড নেক্সট জেএস অ্যাপ উভয়েই তাদের `package.json`-এ `\"@workspace/shared\": \"workspace:*\"` ডিপেনডেন্সি হিসেবে ইমপোর্ট করে। এর ফলে ব্যাকএন্ডে স্কিমা বদলালে ফ্রন্টএন্ডেও তা তৎক্ষণাৎ সিঙ্ক হয়ে যায়—কোনো কোড ডুপ্লিকেশন ছাড়া।",
          "b": "মনোরিপো আর্কিটেকচারে শেয়ার্ড প্যাকেজ তৈরি করে সেখানে Zod স্কিমা ও টাইপ রাখা হয়। ফ্রন্টএন্ড ও ব্যাকএন্ড উভয় প্রজেক্ট একই শেয়ার্ড প্যাকেজ ব্যবহার করায় সর্বদা একই ডেটা প্রোটোকল নিশ্চিত থাকে।",
          "e": "In Turborepo monorepos, isolated workspace packages (`packages/shared`) export schemas and types. Both the Next.js frontend and Express backend consume the package directly, ensuring synchronization without drift.",
          "tip": "মনোরিপোতে শেয়ার্ড টাইপসের ব্যবহার বাস্তব এন্টারপ্রাইজ প্রজেক্টের স্পষ্ট পরিচায়ক।"
        },
        {
          "lvl": "lvl3",
          "q": "TypeScript Decorators এবং Metadata Reflection (`reflect-metadata`) কীভাবে ফ্রেমওয়ার্কগুলোতে (যেমন NestJS) ডিপেনডেন্সি ইনজেকশন পরিচালনা করে?",
          "m": "Decorators হলো মেটাপ্রোগ্রামিং ফাংশন যা ক্লাস, মেথড বা প্রপার্টিকে অলংকৃত করে মেটাডাটা যোগ করে। `reflect-metadata` প্যাকেজটি টাইপস্ক্রিপ্ট কম্পাইলারের নির্দেশে ক্লাসের কনস্ট্রাক্টর প্যারামিটারের টাইপগুলো রানটাইম মেটাডাটা হিসেবে সেভ করে রাখে (`design:paramtypes`)। রানটাইমে ডিপেনডেন্সি ইনজেকশন (DI) কন্টেইনার সেই মেটাডাটা রিড করে স্বয়ংক্রিয়ভাবে ক্লাসের প্রয়োজনীয় ইনস্ট্যান্স তৈরি করে কনস্ট্রাক্টরে ইনজেক্ট করে দেয়।",
          "b": "ডেকোরেটর এবং রিফ্লেক্ট মেটাডাটার মাধ্যমে ক্লাসের অভ্যন্তরীণ প্যারামিটার টাইপ রানটাইমে সংরক্ষণ করা হয়, যা ডিআই কন্টেইনারকে স্বয়ংক্রিয়ভাবে সঠিক ইনস্ট্যান্স ইনজেক্ট করতে সাহায্য করে।",
          "e": "Decorators attach declarative metadata onto classes and methods. When paired with `reflect-metadata`, the TypeScript compiler emits type metadata (`design:paramtypes`) enabling IoC containers to inspect constructor dependencies at runtime and instantiate instances automatically.",
          "code": "@Injectable()\nexport class InvoiceService {\n  constructor(private readonly repo: InvoiceRepository) {}\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Branded Primitive Types দিয়ে কীভাবে নিশ্চিত করবে যে ভুল করে `CustomerId` ফিল্ডে `StoreId` স্ট্রিং পাস করা যাবে না?",
          "m": "যেহেতু জাভাস্ক্রিপ্ট এবং সাধারণ টাইপস্ক্রিপ্টে দুটোই স্ট্রিং (`string`), তাই `deleteStore(customerId)` কল করলেও টাইপস্ক্রিপ্ট সাধারণ অবস্থায় কোনো এরর ধরে না। Branded Types একটি ইউনিক কম্পাইল-টাইম সিম্বল ট্যাগ ব্যবহার করে: `type StoreId = string & { readonly __brand: unique symbol };` এবং `type CustomerId = string & { readonly __brand: unique symbol };`। এর ফলে দুটোই স্ট্রিং হলেও টাইপস্ক্রিপ্ট তাদের সম্পূর্ণ ভিন্ন নন-ইন্টারচেঞ্জেবল টাইপ হিসেবে বিবেচনা করে এবং ভুল পাস রোধ করে।",
          "b": "ব্র্যান্ডেড টাইপ স্ট্রিং আইডির সাথে ইউনিক সিম্বল ট্যাগ জুড়ে দেয়। এর ফলে ভুল করে স্টোর আইডির জায়গায় কাস্টমার আইডি পাস করলে টাইপস্ক্রিপ্ট সাথে সাথে কম্পাইল এরর প্রদর্শন করে ডাটাবেজ করাপশন রোধ করে।",
          "e": "Branded primitives intersect base primitives with nominal symbol brands. This enforces compile-time uniqueness, ensuring a method signature requiring a `StoreId` explicitly rejects a `CustomerId` despite both executing as raw strings at runtime.",
          "code": "type StoreId = string & { readonly __brand: 'StoreId' };\ntype CustomerId = string & { readonly __brand: 'CustomerId' };"
        },
        {
          "lvl": "situation",
          "q": "প্রোডাকশন বিল্ডে `npm run build` দেওয়ার সময় টাইপস্ক্রিপ্ট ১০০+ টাইপ এরর ছুড়ে বিল্ড ব্যর্থ করছে কিন্তু অ্যাপটি জরুরি ডেপ্লয় করতে হবে। তাৎক্ষণিক এবং স্থায়ী সমাধান কী?",
          "m": "তাৎক্ষণিক ফায়ারফাইটিং: `tsconfig.json`-এ সাময়িকভাবে `\"noEmitOnError\": false` অথবা বিল্ড স্ক্রিপ্টে `tsc --noEmit || true` দিয়ে ট্রান্সপাইলেশন শেষ করে ডেপ্লয় করা যেতে পারে (যদিও এটি ঝুঁকিপূর্ণ)। স্থায়ী সমাধান: (১) CI/CD পাইপলাইনে প্রি-পুশ হুক দিয়ে টাইপ চেক বাধ্যতামূলক করা যাতে এরর কোড গিটে না ঢোকে, (২) এররগুলোর মূল কারণ (সাধারণত প্যাকেজ আপডেট বা শিথিল টাইপ) একটি স্প্রিন্ট টাস্কে রিফ্যাক্টর করে ফিক্স করা, (৩) লাইব্রেরি টাইপ মিসম্যাচ হলে `skipLibCheck: true` দেওয়া।",
          "b": "জরুরি ডেপ্লয়ে skipLibCheck অন করে দ্রুত বিল্ড করা যেতে পারে, কিন্তু স্থায়ী সমাধানে সিআই পাইপলাইনে কঠোর টাইপ চেকিং এনফোর্স করতে হবে এবং কোডবেজ রিফ্যাক্টর করে সব টাইপ এরর নির্মূল করতে হবে।",
          "e": "Immediate mitigation: verify `skipLibCheck: true` to bypass third-party library conflicts, or build via SWC/esbuild directly if JavaScript output is valid. Long-term: fix type divergences systematically and enforce strict PR gates preventing untyped merges.",
          "tip": "কখনোই টাইপস্ক্রিপ্ট এরর অগ্রাহ্য করে ডেপ্লয় করাকে ভালো অভ্যাস হিসেবে উপস্থাপন করবে না; স্থায়ী সমাধানের ওপর জোর দেবে।"
        },
        {
          "lvl": "situation",
          "q": "একটি থার্ড-পার্টি পেমেন্ট গেটওয়ে SDK-এর রেসপন্স টাইপস্ক্রিপ্ট টাইপে মিসিং রয়েছে এবং কোডে `any` দিতে হচ্ছে। কীভাবে টাইপ সেফটি ফিরিয়ে আনবে?",
          "m": "সমাধান: (১) কখনোই সরাসরি `any` ব্যবহার করব না। (২) আমরা SDK-এর ডকুমেন্টেশন ও আসল JSON পেলোড দেখে একটি Zod স্কিমা লিখব (`BkashPaymentResponseSchema = z.object({...})`)। (৩) SDK থেকে পাওয়া কাঁচা ডেটাকে `BkashPaymentResponseSchema.parse(response)` দিয়ে রানটাইমে পার্স করব এবং `z.infer` দিয়ে টাইপ বের করে সার্ভিস লেয়ারে পাস করব। এর ফলে কোনো `any` ছাড়াই শতভাগ টাইপ সেফটি অর্জিত হবে।",
          "b": "থার্ড পার্টি SDK-তে টাইপ না থাকলে Zod স্কিমা তৈরি করে z.infer এর মাধ্যমে টাইপস্ক্রিপ্ট টাইপ তৈরি করতে হবে। কাঁচা রেসপন্স Zod দিয়ে পার্স করলে কোনো any ছাড়াই নিখুঁত টাইপ সেফটি পাওয়া যায়।",
          "e": "Avoid slapping `any` on untyped SDKs. Construct a Zod schema matching the provider's API payload, parsing incoming responses at runtime and deriving the static TypeScript contract via `z.infer<typeof Schema>`.",
          "code": "const PaymentResponse = z.object({ trxId: z.string(), amount: z.number() });\ntype PaymentResponse = z.infer<typeof PaymentResponse>;"
        },
        {
          "lvl": "situation",
          "q": "ডাটাবেজ ওআরএম (Prisma) মডেলের সাথে কন্ট্রোলারের রিকোয়েস্ট বডি টাইপের ফারাক তৈরি হওয়ায় কিছু আন-অথোরাইজড ফিল্ড ডাটাবেজে ঢুকে যাচ্ছে। কীভাবে প্রিভেন্ট করবে?",
          "m": "এটি ক্লাসিক Mass Assignment Vulnerability। সমাধান: কখনোই কন্ট্রোলারের ইনকামিং রিকোয়েস্ট বডি সরাসরি ওআরএম মেথডে পাস করব না (`prisma.user.create({ data: req.body })` নিষিদ্ধ!)। আমরা সর্বদা একটি কঠোর DTO এবং Zod স্কিমা ব্যবহার করব যা শুধুমাত্র হোয়াইটলিস্টেড ফিল্ডগুলো পার্স করে। Prisma-তে ডেটা পাস করার সময় এক্সপ্লিসিটলি ফিল্ডগুলো ম্যাপ করব (`data: { email: dto.email, name: dto.name }`)।",
          "b": "ম্যাস অ্যাসাইনমেন্ট ঝুঁকি এড়াতে req.body কখনোই সরাসরি প্রিজমাতে পাস করা যাবে না। Zod বা ডিটিও দিয়ে শুধুমাত্র অনুমোদিত ফিল্ডগুলো ফিল্টার করে নির্দিষ্ট ফিল্ড ডাটাবেজে পাঠাতে হবে।",
          "e": "Never feed raw `req.body` directly to ORM mutations to avert Mass Assignment exploits. Validate payloads strictly with whitelist-only DTO schemas, explicitly extracting permitted attributes prior to persistence calls.",
          "code": "const { name, price } = ValidProductDto.parse(req.body);\nawait prisma.product.create({ data: { name, price, tenantId } });"
        },
        {
          "lvl": "situation",
          "q": "একটি বড় টাইপস্ক্রিপ্ট অবজেক্টে ফিল্ড টাইপ পরিবর্তন করার পর প্রজেক্টের ৫০টি ফাইলে কম্পাইল এরর দিচ্ছে। সহজে কীভাবে রিফ্যাক্টর করবে?",
          "m": "টাইপস্ক্রিপ্টের কম্পাইল এররই মূলত আমাদের সবচেয়ে বড় বন্ধু! স্টেপস: (১) VS Code-এর 'Rename Symbol' (`F2`) শর্টকাট ব্যবহার করে ইন্টারফেসের ফিল্ডের নাম পরিবর্তন করব যা সব ফাইলে স্বয়ংক্রিয়ভাবে আপডেট করে। (২) টার্মিনালে `tsc --noEmit --watch` অন রাখব। (৩) টাইপস্ক্রিপ্ট যে যে ফাইলে এরর ফ্ল্যাগ করছে, এক এক করে ফাইলে গিয়ে বিজনেস লজিক আপডেট করব। পুরো এরর লিস্ট শূন্যে নেমে আসলে আমরা শতভাগ নিশ্চিত হতে পারব যে কোডবেজ কোথাও ভাঙেনি।",
          "b": "টাইপস্ক্রিপ্টের সুবিধা হলো এটি সব ব্রোকেন লোকেশন নিখুঁতভাবে চিহ্নিত করে দেয়। F2 দিয়ে রিনেম সিম্বল ব্যবহার করে এবং tsc --noEmit চালিয়ে প্রতিটি এরর পর্যায়ক্রমে ফিক্স করে নিরাপদ রিফ্যাক্টরিং সম্পন্ন করা যায়।",
          "e": "Leverage TypeScript's compiler as an exhaustive refactoring map. Utilize IDE Symbol Renaming (`F2`) to propagate structural modifications globally, iterating through compiler errors emitted by `tsc --noEmit` until the error index drops to zero.",
          "tip": "ইন্টারভিউতে বলবে: 'TypeScript makes massive refactoring fearless because the compiler acts as an automated audit trail'."
        },
        {
          "lvl": "situation",
          "q": "কন্ট্রোলারে রিকোয়েস্ট কুয়েরি থেকে আসা স্ট্রিং প্যারামিটারকে সংখ্যায় রূপান্তর না করায় ডাটাবেজ ফিল্টারিংয়ে অপ্রত্যাশিত ফলাফল বা এরর আসছে। কীভাবে সমাধান করবে?",
          "m": "কারণ HTTP GET রিকোয়েস্টের সব কুয়েরি প্যারামিটার বাই-ডিফল্ট স্ট্রিং (যেমন `req.query.limit = '10'`। সমাধান: Zod স্কিমায় `z.coerce.number().min(1).default(10)` ব্যবহার করব। Zod স্বয়ংক্রিয়ভাবে স্ট্রিংকে সংখ্যায় রূপান্তর করবে এবং ভ্যালিডেট করবে। অথবা ম্যানুয়ালি `parseInt(req.query.limit as string, 10)` ব্যবহার করে `isNaN` চেক করব।",
          "b": "এইচটিটিপি কুয়েরি প্যারামিটার সবসময় স্ট্রিং থাকে। Zod এর z.coerce.number() দিয়ে স্বয়ংক্রিয়ভাবে স্ট্রিংকে সংখ্যায় রূপান্তর ও যাচাই করতে হবে যাতে ডাটাবেজে সঠিক টাইপ যায়।",
          "e": "Query parameters arrive strictly as strings. Resolve this by applying Zod's `z.coerce.number()` to the query schema, transforming and validating strings into native JavaScript numbers before passing them to ORM filter queries.",
          "code": "const QuerySchema = z.object({\n  limit: z.coerce.number().min(1).max(100).default(20),\n  page: z.coerce.number().min(1).default(1)\n});"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর সেলস ক্যালকুলেশন মডিউলে টাইপস্ক্রিপ্ট টাইপ সেফটি ব্যবহার করে কীভাবে আর্থিক নির্ভুলতা বজায় রেখেছিলে?",
          "m": "আমরা ফিন্যান্সিয়াল ক্যালকুলেশনের জন্য স্ট্রিক্ট টাইপ ও ইন্টারফেস ডিফাইন করেছি: `InvoiceCalculationResult` যাতে `subtotal`, `vatAmount`, `discountAmount`, এবং `grandTotal` শতভাগ ইনটিজার পয়সায় টাইপ করা ছিল। কোনো ফাংশনে অপশনাল ফিল্ড বা `any` অনুমোদন করা হয়নি। ক্যালকুলেশন ফাংশনটি ছিল একটি পিওর ফাংশন যার ইনপুট এবং আউটপুট টাইপস্ক্রিপ্ট কঠোরভাবে গার্ড করায় কোনো ভুল বা নাল ভ্যালু ক্যালকুলেশনে প্রবেশ করতে পারেনি।",
          "b": "দোকানি ফিন্যান্সিয়াল মডিউলে আমরা সব হিসাব পয়সায় ইনটিজার টাইপে কঠোরভাবে সীমাবদ্ধ রেখেছি। পিওর ফাংশন ও স্ট্রিক্ট ইন্টারফেস ব্যবহারের মাধ্যমে কোনো প্রকার নাল বা অনির্ধারিত মান হিসাবকে প্রভাবিত করতে পারেনি।",
          "e": "Enforced financial accuracy in Dokani POS by modeling ledger line items as strongly typed integer amounts (Poisha). The pure calculation engine strictly required non-nullable DTOs, preventing undefined arithmetic bugs.",
          "code": "export interface InvoiceTotals {\n  readonly subtotalPoisha: number;\n  readonly vatPoisha: number;\n  readonly discountPoisha: number;\n  readonly payablePoisha: number;\n}"
        },
        {
          "lvl": "realworld",
          "q": "Prisma Client থেকে জেনারেট হওয়া টাইপস্ক্রিপ্ট মডেল এবং কাস্টম বিজনেস DTO-এর মধ্যে পরিষ্কার সেপারেশন কীভাবে বজায় রেখেছিলে?",
          "m": "আমরা Prisma মডেলগুলোকে সরাসরি এপিআই রেসপন্সে পাঠাতাম না (যেমন ইউজারের পাসওয়ার্ড হ্যাশ বা অভ্যন্তরীণ ডাটাবেজ মেটাডাটা যাতে ক্লায়েন্টে না যায়)। আমরা Prisma মডেল টাইপ (`import { User } from '@prisma/client'`) সার্ভিস লেয়ারে ডেটাবেজ কাজের জন্য ব্যবহার করেছি, আর ক্লায়েন্টের জন্য `Omit<User, 'passwordHash'>` দিয়ে একটি ট্রান্সফর্মড `UserResponseDto` তৈরি করে রিটার্ন করেছি।",
          "b": "প্রিজমার আসল ডাটাবেজ মডেল সরাসরি এপিআইতে না পাঠিয়ে পাসওয়ার্ড বা গোপন ফিল্ড বাদ দিয়ে ইউজার রেসপন্স ডিটিও তৈরি করে ক্লায়েন্টে পাঠানো হয়েছিল। এর ফলে অভ্যন্তরীণ ডাটাবেজ মডেল বাইরে উন্মুক্ত হয়নি।",
          "e": "Decoupled Prisma database models from external API contracts. Repositories returned full Prisma models, while services transformed entities into explicit presentation DTOs stripping sensitive internals (like password hashes).",
          "tip": "কখনোই ডাটাবেজ এন্টিটি সরাসরি API রেসপন্সে রিটার্ন করবে না; সর্বদা প্রেজেন্টেশন ডিটিও ব্যবহার করবে।"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে ভিডিও, কুইজ ও অ্যাসাইনমেন্টের মতো ভিন্ন ভিন্ন কোর্স কনটেন্টের জন্য টাইপস্ক্রিপ্ট পলিমরফিক মডেল কীভাবে হ্যান্ডেল করেছিলে?",
          "m": "আমরা Discriminated Union প্যাটার্ন ব্যবহার করেছি: প্রতিটি কোর্স আইটেমের একটি কমন `type: 'VIDEO' | 'QUIZ' | 'ASSIGNMENT'` ছিল। টাইপস্ক্রিপ্ট সুইচের ভেতরে যখন আমরা `item.type === 'VIDEO'` চেক করতাম, কম্পাইলার সাথে সাথে `item.videoUrl` এবং `item.durationMinutes` অটো-কমপ্লিট করত। আর কুইজ হলে `item.questions` অ্যারে প্রোভাইড করত। এর ফলে কোনো রানটাইম এরর ছাড়াই জটিল কোর্স ম্যাটেরিয়াল নিরাপদে প্রসেস হয়েছে।",
          "b": "পিটিটিএবিডিতে পলিমরফিক কোর্স কন্টেন্টের জন্য আমরা ডিসক্রিমিনেটেড ইউনিয়ন ব্যবহার করেছি। কন্টেন্টের ধরনের ওপর ভিত্তি করে টাইপস্ক্রিপ্ট নিজে থেকেই ভিডিও বা কুইজের সুনির্দিষ্ট ফিল্ডগুলো নিশ্চিত করত।",
          "e": "Modeled heterogeneous educational modules in PTTABD via discriminated union types keyed on `type`. Exhaustive switch statements dynamically narrowed types to their specific attributes without type assertion hacks.",
          "code": "type CourseModule =\n  | { type: 'VIDEO'; streamUrl: string; duration: number }\n  | { type: 'QUIZ'; questions: Question[]; passScore: number };"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর মাল্টি-টেন্যান্ট ডেটাবেজ কুয়েরিতে `tenantId` ফিল্টার মিস হওয়া রোধ করতে টাইপস্ক্রিপ্ট দিয়ে কীভাবে কম্পাইল-টাইম গার্ড বসিয়েছিলে?",
          "m": "আমরা Prisma Client-এর এক্সটেনশন (`$extends`) অথবা একটি টাইপ-সেফ রিপোজিটরি র‍্যাপার ব্যবহার করেছি যেখানে প্রতিটি কুয়েরি মেথডের প্রথম প্যারামিটার ছিল বাধ্যতামূলক `tenantId: string`। কোনো ডেভেলপার যদি ভুল করেও `tenantId` ছাড়া প্রোডাক্ট বা সেলস খোঁজার চেষ্টা করত, টাইপস্ক্রিপ্ট বিল্ড টাইমে কম্পাইল এরর দিত। এর ফলে কোনো অবস্থাতেই ক্রস-টেন্যান্ট ডেটা লিকেজের সুযোগ ছিল না।",
          "b": "দোকানি রিপোজিটরির প্রতিটি মেথডে টেন্যান্ট আইডি প্যারামিটার বাধ্যতামূলক করে টাইপস্ক্রিপ্ট গার্ড বসানো হয়েছিল। টেন্যান্ট আইডি ছাড়া কোনো কুয়েরি কল করলে সাথে সাথে কম্পাইল এরর আসত, যা ডেটা লিক পুরোপুরি বন্ধ করেছিল।",
          "e": "Constructed compile-time tenant isolation guards in Dokani by requiring `tenantId: string` as the non-optional first argument across all repository methods, rejecting un-scoped tenant queries at build time.",
          "code": "findProductById(tenantId: string, productId: string): Promise<Product | null>;"
        },
        {
          "lvl": "realworld",
          "q": "টাইপস্ক্রিপ্ট কোডবেজে `any` ব্যবহারের বিরুদ্ধে টিম কালচার ও ESLint রুল কীভাবে এনফোর্স করেছিলে?",
          "m": "আমরা ESLint-এ `@typescript-eslint/no-explicit-any: 'error'` রুল এনফোর্স করেছি। ফলে কোনো ডেভেলপার কোডে `any` লিখলে গিট প্রি-কমিট হুক এবং GitHub Actions CI বিল্ড সাথে সাথে ফেইল করত। যদি সত্যি কোনো অজ্ঞাত ডেটা হ্যান্ডেল করতে হতো, আমরা `unknown` ব্যবহার বাধ্যতামূলক করেছি এবং টাইপ ন্যারোয়িং বা Zod স্কিমা দিয়ে টাইপ নিশ্চিত করতে উৎসাহিত করেছি। এর ফলে টিমে ১০০% ক্লিন টাইপ হাইজিন বজায় ছিল।",
          "b": "আমরা ইএসলিন্টে no-explicit-any এরর হিসেবে নির্ধারণ করেছিলাম। any সম্পূর্ণ নিষিদ্ধ করে unknown এবং Zod স্কিমা ব্যবহার বাধ্যতামূলক করায় প্রজেক্টে সর্বোচ্চ টাইপ সেফটি নিশ্চিত হয়েছিল।",
          "e": "Enforced strict zero-any policies by configuring `@typescript-eslint/no-explicit-any: 'error'` in ESLint, failing CI builds upon violation. Required `unknown` paired with type narrowing or Zod schemas for untrusted payloads.",
          "tip": "টিমে 'no-explicit-any' রুল প্রয়োগের কথা বলা কোড কোয়ালিটি ও লিডারশিপ স্ট্যান্ডার্ড প্রমাণ করে।"
        }
      ]
    },
    {
      "id": "jwt-auth-rbac-security",
      "name": "JWT Authentication, RBAC & API Security",
      "desc": "JSON Web Tokens, Refresh Token Rotation, RBAC Middleware, OWASP Top 10, Helmet, CORS, CSRF, Password Hashing",
      "items": [
        {
          "lvl": "lvl1",
          "q": "JWT (JSON Web Token) কী এবং এর ৩টি অংশের (Header, Payload, Signature) ইন্টারনাল স্ট্রাকচার কী?",
          "m": "JWT হলো একটি কমপ্যাক্ট, URL-নিরাপদ টোকেন স্ট্যান্ডার্ড (RFC 7519) যা দুই পক্ষের মধ্যে তথ্য নিরাপদে আদান-প্রদান করতে ব্যবহৃত হয়। এর ৩টি অংশ ডট (`.`) দিয়ে বিভক্ত থাকে: (১) `Header`: টোকেনের টাইপ (JWT) এবং সাইনিং অ্যালগরিদম (যেমন `HS256` বা `RS256`) ধারণ করে। (২) `Payload`: ইউজারের পাবলিক তথ্য যেমন ইউজার আইডি, রোল ও মেয়াদ (`exp`) থাকে (কখনোই গোপন পাসওয়ার্ড নয়!)। (৩) `Signature`: হেডার, পেলোড এবং সার্ভারের গোপন সিক্রেট কি মিলিয়ে তৈরি ক্রিপ্টোগ্রাফিক হ্যাশ—যা নিশ্চিত করে টোকেনে কেউ টেম্পারিং করতে পারেনি।",
          "b": "জেডব্লিউটি ৩টি অংশে বিভক্ত: হেডার (অ্যালগরিদম তথ্য), পেলোড (ইউজারের তথ্য ও মেয়াদ), এবং সিগনেচার (ক্রিপ্টোগ্রাফিক ডিজিটাল স্বাক্ষর)। সার্ভারের গোপন কি ছাড়া সিগনেচার পরিবর্তন করা যায় না বলে এটি অত্যন্ত নিরাপদ।",
          "e": "A JSON Web Token (JWT) comprises three Base64URL-encoded parts delimited by periods: Header (algorithm & token type), Payload (claims like userId, roles, expiration), and Signature (HMAC or RSA hash computed with server secret, guaranteeing tamper resistance).",
          "code": "// Structure: Header.Payload.Signature\neyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxMjMifQ.4f3e..."
        },
        {
          "lvl": "lvl1",
          "q": "পাসওয়ার্ড হ্যাশিংয়ে `bcrypt` কেন প্লেইন টেক্সট বা সাধারণ SHA-256 এর চেয়ে বহুগুণ নিরাপদ?",
          "m": "সাধারণ SHA-256 বা MD5 অত্যন্ত দ্রুত চলে (প্রতি সেকেন্ডে কোটি কোটি হ্যাশ বের করা যায়), যার ফলে হ্যাকাররা Rainbow Table বা GPU ব্রুট-ফোর্স দিয়ে মুহূর্তের মধ্যে পাসওয়ার্ড ক্র্যাক করতে পারে। আর `bcrypt` হলো একটি ধীরগতির হ্যাশিং অ্যালগরিদম (Key Derivation Function) যা 'Salt' এবং 'Work Factor / Cost' ব্যবহার করে। সল্ট প্রতিটি পাসওয়ার্ডের সাথে র্যান্ডম স্ট্রিং জুড়ে দিয়ে রেইনবো টেবিল অ্যাটাক অকার্যকর করে, আর কস্ট ফ্যাক্টর (যেমন ১০ বা ১২) ইচ্ছাকৃতভাবে হ্যাশিং স্পিড ধীর করে ব্রুট-ফোর্স আক্রমণ অসম্ভব করে তোলে।",
          "b": "SHA-256 অত্যন্ত দ্রুত হওয়ায় ব্রুট ফোর্স দিয়ে ভাঙা সহজ। bcrypt স্বয়ংক্রিয়ভাবে সল্ট যুক্ত করে রেইনবো টেবিল আক্রমণ ব্যর্থ করে এবং কস্ট ফ্যাক্টরের সাহায্যে হ্যাশিং ধীরগতির করে পাসওয়ার্ডের সর্বোচ্চ নিরাপত্তা নিশ্চিত করে।",
          "e": "Standard hashing (SHA-256) is designed for speed, allowing brute-force cracking via GPU clusters. bcrypt is intentionally slow and adaptive, incorporating random salts to thwart rainbow tables and tunable cost factors to exponentially delay brute-force attacks.",
          "code": "const saltRounds = 12;\nconst hash = await bcrypt.hash(plainPassword, saltRounds);\nconst isMatch = await bcrypt.compare(candidatePassword, hash);"
        },
        {
          "lvl": "lvl1",
          "q": "Express-এ Role-Based Access Control (RBAC) গার্ড মিডলওয়্যার কীভাবে তৈরি করা হয়?",
          "m": "আমরা একটি হায়ার-অর্ডার মিডলওয়্যার ফাংশন তৈরি করি যা অনুমোদিত রোলগুলোর তালিকা গ্রহণ করে (`authorizeRoles('ADMIN', 'MANAGER')`)। মিডলওয়্যারটি ইনকামিং রিকোয়েস্টের `req.user.role` চেক করে। যদি ইউজারের রোল তালিকায় থাকে, তবে `next()` দিয়ে পরবর্তী হ্যান্ডলারে যেতে দেয়। আর না থাকলে তৎক্ষণাৎ `403 Forbidden` এবং 'আপনার এই অ্যাকশনের অনুমতি নেই' মেসেজ পাঠায়।",
          "b": "আরবিএসি মিডলওয়্যার অনুমোদিত রোলের তালিকা গ্রহণ করে রিকোয়েস্টে থাকা ইউজারের রোল যাচাই করে। অনুমোদিত হলে কাজ এগিয়ে নিতে দেয় এবং রোল অমিল হলে ৪০৩ ফরবিডেন এরর প্রদান করে।",
          "e": "RBAC middleware inspects authenticated roles (`req.user.role`) against an allowed role whitelist passed via higher-order functions. If unauthorized, it terminates the request with HTTP 403 Forbidden.",
          "code": "export const authorize = (...roles: string[]) => {\n  return (req: Request, res: Response, next: NextFunction) => {\n    if (!roles.includes(req.user?.role))\n      return res.status(403).json({ error: 'Forbidden' });\n    next();\n  };\n};"
        },
        {
          "lvl": "lvl1",
          "q": "Helmet.js মিডলওয়্যার কী এবং এটি কোন কোন HTTP সিকিউরিটি হেডার সেট করে?",
          "m": "Helmet.js হলো একটি নোড সিকিউরিটি মিডলওয়্যার যা এক লাইনে (`app.use(helmet())`) ১৫টি অপরিহার্য HTTP সিকিউরিটি হেডার সেট করে অ্যাপকে সাধারণ ওয়েব অ্যাটাক থেকে রক্ষা করে। প্রধান হেডারগুলো: (১) `Content-Security-Policy (CSP)`: ক্ষতিকর স্ক্রিপ্ট ইনজেকশন ব্লক করে। (২) `X-Frame-Options: SAMEORIGIN`: ক্লিকজ্যাকিং (Clickjacking) আক্রমণ প্রতিরোধ করে। (৩) `Strict-Transport-Security (HSTS)`: ব্রাউজারকে শুধুমাত্র HTTPS প্রোটোকলে কানেক্ট করতে বাধ্য করে। (৪) `X-Content-Type-Options: nosniff`: MIME-টাইপ স্নাইফিং বন্ধ করে। (৫) `X-Powered-By`: এক্সপ্রেসের নাম লুকিয়ে রাখে যাতে হ্যাকার সার্ভার রানটাইম চিনতে না পারে।",
          "b": "হেলমেট মিডলওয়্যার এক্সপ্রেসে ১৫টি সিকিউরিটি হেডার যুক্ত করে। এটি ক্লিকজ্যাকিং, ক্ষতিকর স্ক্রিপ্ট ইনজেকশন এবং এইচটিটিপিএস জোরপূর্বক সক্রিয় করে সার্ভারকে সুরক্ষিত রাখে।",
          "e": "Helmet.js secures Express applications by automatically setting 15 HTTP headers, including Content-Security-Policy (CSP), Strict-Transport-Security (HSTS), X-Frame-Options (anti-clickjacking), and stripping the X-Powered-By disclosure header.",
          "code": "import helmet from 'helmet';\napp.use(helmet());"
        },
        {
          "lvl": "lvl1",
          "q": "OWASP Top 10-এর মধ্যে 'Broken Object Level Authorization' (BOLA / IDOR) কী এবং এটি কীভাবে প্রতিরোধ করবে?",
          "m": "BOLA (পূর্বে IDOR) হলো যখন একজন ইউজার অন্য ইউজারের রিসোর্সের আইডি ইউআরএলে দিয়ে সেই ডাটা রিড বা ডিলিট করে ফেলে (যেমন ইউজার ১ রিকোয়েস্ট পাঠাল `/api/invoices/999` যা ইউজার ২-এর ইনভয়েস)। এটি ঘটে যখন সার্ভার শুধুমাত্র আইডি দিয়ে কুয়েরি চালায় কিন্তু ওনারশিপ চেক করে না। সমাধান: প্রতিটি ডাটাবেজ কুয়েরিতে ওনার আইডি বা টেন্যান্ট আইডি বাধ্যতামূলক ফিল্টার করতে হবে: `prisma.invoice.findFirst({ where: { id: invoiceId, ownerId: req.user.id } })`। যদি না মেলে তবে `404 Not Found` বা `403 Forbidden` দিতে হবে।",
          "b": "বোলা বা আইডিওআর হলো সরাসরি আইডি পরিবর্তনের মাধ্যমে অন্যের তথ্যে অনুপ্রবেশের ত্রুটি। সমাধান হলো ডাটাবেজ থেকে ডাটা খোঁজার সময় সর্বদা রিকোয়েস্টকারী ব্যবহারকারীর ওনারশিপ বা টেন্যান্ট আইডি দিয়ে ফিল্টার করা।",
          "e": "Broken Object Level Authorization (BOLA/IDOR) occurs when an endpoint accesses resources via user-supplied IDs without verifying ownership. Prevent this by enforcing composite query predicates: `{ id: resourceId, tenantId: req.user.tenantId }`.",
          "tip": "ইন্টারভিউতে BOLA/IDOR প্রতিরোধের জন্য 'Composite Query Predicates with Owner/Tenant ID' ব্যাখ্যা করা সিকিউরিটি ম্যাচিউরিটির প্রমাণ।"
        },
        {
          "lvl": "lvl2",
          "q": "Access Token এবং Refresh Token-এর লাইফসাইকেল ও রোটেশন (Token Rotation) ব্যাকএন্ডে কীভাবে কাজ করে?",
          "m": "অ্যাক্সেস টোকেনের মেয়াদ সংক্ষিপ্ত থাকে (যেমন ১৫ মিনিট) যাতে চুরি হলেও বেশি ক্ষতি না হয়। আর রিফ্রেশ টোকেন দীর্ঘমেয়াদী হয় (যেমন ৭ দিন) যা ডাটাবেজ বা রেডিসে হ্যাশ আকারে সেভ থাকে এবং ক্লায়েন্টে `HttpOnly` কুকিতে পাঠানো হয়। যখন ক্লায়েন্ট রিফ্রেশ টোকেন পাঠিয়ে নতুন অ্যাক্সেস টোকেন চায়, ব্যাকএন্ড পুরানো রিফ্রেশ টোকেনটি সাথে সাথে ডাটাবেজ থেকে মুছে দিয়ে সম্পূর্ণ নতুন আরেকটি রিফ্রেশ টোকেন ইস্যু করে (Refresh Token Rotation)। এর ফলে একই রিফ্রেশ টোকেন কেউ দুইবার ব্যবহারের চেষ্টা করলে সার্ভার তাৎক্ষণিক সমস্ত অ্যাক্টিভ সেশন বন্ধ করে দেয় (Theft Detection)।",
          "b": "স্বল্পমেয়াদী অ্যাক্সেস টোকেন এবং দীর্ঘমেয়াদী রিফ্রেশ টোকেনের সমন্বয়ে সেশন পরিচালিত হয়। প্রতি রিফ্রেশে পুরানো রিফ্রেশ টোকেন বাতিল করে নতুন টোকেন ইস্যু করা হয় (রোটেশন)। চুরি হওয়া টোকেন পুনরায় ব্যবহারের চেষ্টা করলে সিস্টেম সব সেশন বাতিল করে দেয়।",
          "e": "Short-lived access tokens (15m) authenticate API requests. Long-lived refresh tokens (7d) are stored in HttpOnly cookies and tracked in Redis. Upon refresh, the server invalidates the used refresh token and issues a brand-new token pair (Refresh Token Rotation). Reusing an already-rotated token triggers family revocation, terminating all active user sessions.",
          "code": "const newRefreshToken = generateRefreshToken();\nawait db.refreshToken.update({ where: { id: oldToken.id }, data: { revoked: true } });\nawait db.refreshToken.create({ data: { token: hash(newRefreshToken), userId } });"
        },
        {
          "lvl": "lvl2",
          "q": "Symmetric Encryption (HMAC HS256) এবং Asymmetric Encryption (RSA/ECDSA RS256)-এর মধ্যে JWT সাইনিংয়ে কোনটি কখন বেছে নেবে?",
          "m": "HS256 একটিমাত্র গোপন 'Shared Secret Key' ব্যবহার করে সাইন ও ভেরিফাই উভয় কাজই করে। কিন্তু কোনো মাইক্রোসার্ভিস আর্কিটেকচারে অন্য সার্ভিসকে টোকেন ভেরিফাই করতে হলে তাকেও সেই একই গোপন সিক্রেট দিতে হয়, যা সিকিউরিটি ঝুঁকি তৈরি করে। RS256 একটি 'Public/Private Key Pair' ব্যবহার করে। সেন্ট্রাল Auth সার্ভিস গোপন Private Key দিয়ে টোকেন সাইন করে, আর বাকি সব মাইক্রোসার্ভিস শুধুমাত্র Public Key ব্যবহার করে টোকেন ভেরিফাই করে। ফলে কোনো সিক্রেট কি ফাঁস হওয়ার ঝুঁকি থাকে না।",
          "b": "HS256 একক গোপন কি দিয়ে সাইন ও ভেরিফাই করে, যা সিঙ্গেল অ্যাপের জন্য ভালো। কিন্তু মাইক্রোসার্ভিসে RS256 ব্যবহার করা হয় যেখানে প্রাইভেট কি দিয়ে টোকেন তৈরি হয় এবং পাবলিক কি দিয়ে অন্যান্য সার্ভিসগুলো নিরাপদভাবে টোকেন যাচাই করে।",
          "e": "HS256 uses a single shared secret for signing and verification. RS256 uses asymmetric Public/Private key pairs: the central Identity Provider signs tokens via the private key, while downstream microservices verify signatures independently via the public key without sharing secrets.",
          "tip": "সিঙ্গেল অ্যাপে HS256 যথেষ্ট, কিন্তু ডিস্ট্রিবিউটেড মাইক্রোসার্ভিসে RS256 নেওয়া স্ট্যান্ডার্ড আর্কিটেকচার।"
        },
        {
          "lvl": "lvl2",
          "q": "JWT Blacklisting বা তাৎক্ষণিক সেশন ইনভ্যালিডেশন (Logout/Password Reset) স্টেটলেস ব্যাকএন্ডে কীভাবে হ্যান্ডেল করবে?",
          "m": "যেহেতু JWT স্টেটলেস এবং মেয়াদের শেষ সেকেন্ড পর্যন্ত ভ্যালিড থাকে, তাই ইউজার লগআউট করলেও টোকেন নিজে থেকে অকার্যকর হয় না। সমাধান: আমরা Redis ব্যবহার করে একটি 'Token Blacklist / Revocation Store' রাখি। যখন ইউজার লগআউট করে, টোকেনের ইউনিক আইডি (`jti` - JWT ID) রেডিসে সেভ করি এবং তার TTL সেট করি টোকেনের অবশিষ্ট এক্সপায়ারি টাইম পর্যন্ত। প্রতিটি রিকোয়েস্টে মিডলওয়্যার রেডিস চেক করে; ব্ল্যাকলিস্টে থাকলে সাথে সাথে `401 Unauthorized` রিটার্ন করে।",
          "b": "টোকেন স্টেটলেস হওয়ায় লগআউট করার পরও মেয়াদ না শেষ হওয়া পর্যন্ত চালু থাকে। রেডিসে টোকেনের jti আইডি ব্ল্যাকলিস্ট করে অবশিষ্ট সময়ের জন্য TTL দিয়ে সংরক্ষণ করা হয়। মিডলওয়্যারে রেডিস চেক করে তাৎক্ষণিক সেশন বাতিল নিশ্চিত করা হয়।",
          "e": "Stateless JWTs cannot be natively recalled before expiration. Assign each JWT a unique `jti` (JWT ID) claim. Upon logout or password change, write the `jti` to Redis with a TTL equal to the token's remaining lifespan. The auth middleware rejects any requests bearing blacklisted JTIs.",
          "code": "await redis.set(`blacklist:${decoded.jti}`, 'revoked', 'EX', remainingSeconds);"
        },
        {
          "lvl": "lvl2",
          "q": "Cross-Site Scripting (XSS) প্রতিরোধে ইনপুট স্যানিটাইজেশন এবং Output Encoding ব্যাকএন্ডে কীভাবে নিশ্চিত করবে?",
          "m": "XSS আক্রমণ ঘটে যখন ব্যবহারকারীর দেওয়া ক্ষতিকর জাভাস্ক্রিপ্ট কোড (যেমন `<script>stealCookie()</script>`) ব্যাকএন্ড ডাটাবেজে সেভ হয়ে অন্য ইউজারের ব্রাউজারে এক্সিকিউট হয়। সমাধান: (১) Zod বা `dompurify` / `sanitize-html` লাইব্রেরি দিয়ে ইনকামিং এইচটিএমএল ইনপুট কঠোরভাবে স্যানিটাইজ করা। (২) রিকোয়েস্ট হেডারে Helmet দিয়ে `Content-Security-Policy (CSP)` এনফোর্স করা। (৩) অথেনটিকেশন টোকেন `HttpOnly` কুকিতে রাখা যাতে জাভাস্ক্রিপ্ট দিয়ে রিড করা অসম্ভব হয়।",
          "b": "এক্সএসএস আক্রমণ ঠেকাতে ইনপুট ডাটা স্যানিটাইজেশন লাইব্রেরি দিয়ে ফিল্টার করতে হবে, হেলমেট দিয়ে কনটেন্ট সিকিউরিটি পলিসি সক্রিয় করতে হবে এবং টোকেন সর্বদা HttpOnly কুকিতে রাখতে হবে।",
          "e": "Mitigate XSS by stripping executable scripts using `dompurify` or `sanitize-html` at input ingestion, enforcing strict Content-Security-Policy (CSP) headers via Helmet, and insulating authentication secrets inside HttpOnly cookies.",
          "code": "import sanitizeHtml from 'sanitize-html';\nconst cleanBio = sanitizeHtml(req.body.bio, { allowedTags: ['b', 'i', 'em'] });"
        },
        {
          "lvl": "lvl2",
          "q": "SQL Injection (SQLi) আক্রমণ কীভাবে ঘটে এবং ORM বা Parameterized Queries কীভাবে এটি ১০০% প্রতিহত করে?",
          "m": "SQL Injection ঘটে যখন ইউজার ইনপুটকে সরাসরি স্ট্রিং কনক্যাটেনেশন করে ডেটাবেজ কুয়েরিতে বসানো হয় (যেমন: `SELECT * FROM users WHERE email = '` + email + `'`—এখানে ইউজার `' OR '1'='1` দিলে পুরো ডাটাবেজ ওপেন হয়ে যায়)। Parameterized Queries ইনপুট ডেটাকে কোড হিসেবে এক্সিকিউট না করে শুধুমাত্র লিটারাল ডাটা হিসেবে ডেটাবেজ ড্রাইভারকে আলাদা চ্যানেলে পাঠায়। Prisma ORM ইন্টারনালি সমস্ত কুয়েরিকে প্রিপেয়ার্ড স্টেটমেন্টে রূপান্তর করে, ফলে কোনো ইনপুটই এসকিউএল কোড হিসেবে রান হতে পারে না।",
          "b": "ইউজার ইনপুট সরাসরি এসকিউএল স্ট্রিংয়ে যোগ করলে হ্যাকার কুয়েরির গঠন বদলে দিতে পারে। প্যারামিটারাইজড কুয়েরি ইনপুটকে কোড হিসেবে না দেখে বিশুদ্ধ ডাটা হিসেবে গ্রহণ করে, ফলে প্রিজমা বা ওআরএম ব্যবহারে এসকিউএল ইনজেকশন পুরোপুরি অসম্ভব হয়ে যায়।",
          "e": "SQL Injection exploits string concatenation into database queries. Parameterized queries and prepared statements separate SQL code from data literals at the database driver protocol level. Prisma executes all operations through parameterized statements, guaranteeing SQLi immunity.",
          "tip": "কখনোই `prisma.$queryRawUnsafe()` ব্যবহার করবে না; সবসময় টাইপ-সেফ `$queryRaw` টেমপ্লেট ব্যবহার করবে।"
        },
        {
          "lvl": "lvl3",
          "q": "Timing Attacks (সাইড-চ্যানেল অ্যাটাক) কী এবং API কি বা পাসওয়ার্ড যাচাইয়ে `crypto.timingSafeEqual()` কেন আবশ্যক?",
          "m": "জাভাস্ক্রিপ্টে সাধারণ স্ট্রিং তুলনা (`strA === strB`) প্রথম যে ক্যারেক্টার অমিল পায় সাথে সাথে তুলনা বন্ধ করে false দেয়। হ্যাকাররা মিলি-সেকেন্ডের ক্ষুদ্র ভগ্নাংশ মেপে (Timing Analysis) বুঝে ফেলে ঠিক কতগুলো ক্যারেক্টার সঠিক ছিল এবং এক এক করে পুরো সিক্রেট কি বের করে ফেলতে পারে। `crypto.timingSafeEqual()` একটি কনস্ট্যান্ট-টাইম (Constant-Time) অ্যালগরিদম চালায় যা স্ট্রিং মিলুক বা না মিলুক সবসময় হুবহু একই সময় নেয়। তাই ওয়েবহুক সিগনেচার বা ক্রিপ্টোগ্রাফিক কি ভেরিফিকেশনে এটি বাধ্যতামূলক।",
          "b": "টাইমিং অ্যাটাকে হ্যাকার স্ট্রিং তুলনা করার সময় পরিমাপ করে পাসওয়ার্ড বা কি অনুমান করে ফেলে। crypto.timingSafeEqual সমপরিমাণ সময়ে তুলনা সম্পন্ন করে এই সূক্ষ্ম সাইড-চ্যানেল আক্রমণ প্রতিহত করে।",
          "e": "Standard string equality (`a === b`) short-circuits on the first mismatched character, leaking duration differences that attackers exploit via statistical timing measurements. `crypto.timingSafeEqual()` evaluates buffers in strictly constant time, neutralizing timing attacks.",
          "code": "import crypto from 'crypto';\nconst isValid = crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature));"
        },
        {
          "lvl": "lvl3",
          "q": "Distributed Denial of Service (DDoS) প্রতিরোধে Layer 7 Rate Limiting আর্কিটেকচার (Token Bucket / Leaky Bucket) কীভাবে কাজ করে?",
          "m": "Token Bucket অ্যালগরিদমে প্রতিটি ইউজারের জন্য একটি বালতি থাকে যাতে নির্দিষ্ট হারে টোকেন জমা হয় (যেমন প্রতি সেকেন্ডে ১০টি টোকেন, ক্যাপাসিটি ১০০)। প্রতি রিকোয়েস্টে ১টি টোকেন খরচ হয়। ট্রাফিক স্পাইক আসলে জমা টোকেন দিয়ে সামাল দেওয়া যায়, কিন্তু টোকেন শেষ হলে রিকোয়েস্ট ড্রপ হয়। Leaky Bucket একটি ফিক্সড হারে রিকোয়েস্ট প্রসেস করে (মসৃণ ট্রাফিক)। আমরা Redis এবং Cloudflare WAF দিয়ে সমন্বিতভাবে এই অ্যালগরিদম কার্যকর করে আক্রমণকারী বটনেটগুলোকে নোড সার্ভারে পৌঁছানোর আগেই ব্লক করি।",
          "b": "টোকেন বাকেট অ্যালগরিদমে নির্দিষ্ট হারে টোকেন জমা হয় এবং প্রতি রিকোয়েস্টে টোকেন খরচ করে ট্রাফিক স্পাইক সামলানো হয়। রেডিস ও ক্লাউডফ্লেয়ারের সাহায্যে এই কৌশল প্রয়োগ করে ক্ষতিকর আক্রমণকারী বটগুলোকে আগেই আটকে দেওয়া হয়।",
          "e": "The Token Bucket algorithm accumulates capacity tokens at a steady rate, allowing bursty traffic up to bucket capacity while throttling excessive bursts. Redis Lua scripts evaluate Token Bucket states atomically, offloading Layer 7 DDoS mitigation prior to reaching Node workers.",
          "tip": "রেডিসে Lua স্ক্রিপ্ট দিয়ে অ্যাটমিকালি টোকেন বাকেট হ্যান্ডেল করার কথা বললে ইন্টারভিউয়াররা হাইলি ইমপ্রেসড হয়।"
        },
        {
          "lvl": "lvl3",
          "q": "Server-Side Request Forgery (SSRF) কী এবং ইউজারকে কোনো ইউআরএল থেকে ডাটা ফেচ করার অনুমতি দিলে সার্ভার কীভাবে সুরক্ষিত রাখবে?",
          "m": "SSRF ঘটে যখন একজন আক্রমণকারী সার্ভারকে দিয়ে তার লোকাল নেটওয়ার্ক বা ক্লাউড মেটাডাটা সার্ভিসে রিকোয়েস্ট করায় (যেমন AWS-এর `http://169.254.169.254/latest/meta-data/` থেকে আইএএম রোল বা ডাটাবেজ পাসওয়ার্ড চুরি)। সুরক্ষা: (১) ইউজার প্রদত্ত ইউআরএলের ডিএনএস রিজলভ করে আইপি চেক করতে হবে—প্রাইভেট আইপি রেঞ্জ (`10.0.0.0/8`, `192.168.0.0/16`, `127.0.0.1`, `169.254.0.0/16`) কঠোরভাবে ব্লক করতে হবে। (২) আউটবাউন্ড প্রক্সি ব্যবহার করা যা শুধুমাত্র পোর্ট ৮০/৪৪৩ এবং পাবলিক আইপিতে কানেক্ট করতে দেয়।",
          "b": "এসএসআরএফ হলো সার্ভারকে দিয়ে লোকাল প্রাইভেট নেটওয়ার্ক বা ক্লাউড মেটাডাটা চুরি করানোর আক্রমণ। ব্যবহারকারীর ইউআরএল যাচাই করে লোকালহোস্ট ও প্রাইভেট আইপি রেঞ্জ পুরোপুরি ব্লক করে এই আক্রমণ প্রতিরোধ করা হয়।",
          "e": "SSRF occurs when attackers induce the server to make unauthorized outbound requests to internal resources (e.g. AWS metadata endpoint 169.254.169.254). Defend by resolving destination DNS and blacklisting private RFC 1918 / link-local IP ranges before dispatching HTTP calls.",
          "code": "const isPrivateIp = (ip) => /^(127\\.|10\\.|192\\.168\\.|169\\.254\\.)/.test(ip);"
        },
        {
          "lvl": "lvl3",
          "q": "Secret Management: প্রোডাকশনে `.env` ফাইলে সিক্রেট রাখা কেন অনিরাপদ এবং Vault / AWS Secrets Manager কীভাবে কাজ করে?",
          "m": "সার্ভারের ডিস্কে প্লেইন টেক্সট `.env` ফাইল রাখলে: সার্ভারে অননুমোদিত অ্যাক্সেস পেলে বা ভুল করে গিট রিপোজিটরিতে ঢুকলে সব সিক্রেট কম্প্রোমাইজড হয়ে যায় এবং কোনো সেন্ট্রালাইজড অডিট লগ থাকে না। আধুনিক এন্টারপ্রাইজে আমরা HashiCorp Vault বা AWS Secrets Manager ব্যবহার করি। নোড অ্যাপ স্টার্টআপের সময় মেমোরিতে সরাসরি সিক্রেট ফেচ করে এবং কোনো সিক্রেট রোটেট (Rotate) হলে অ্যাপ রিস্টার্ট ছাড়াই লাইভ ডাটাবেজ পাসওয়ার্ড আপডেট করে নেয়। সমস্ত অ্যাক্সেসের অডিট ট্রেইল ক্লাউডে সংরক্ষিত থাকে।",
          "b": "ডিস্কে সাধারণ .env ফাইলে পাসওয়ার্ড রাখা অনিরাপদ। ভল্ট বা ক্লাউড সিক্রেটস ম্যানেজার ব্যবহার করে মেমরিতে এনক্রিপ্টেড কি আনা হয় যা স্বয়ংক্রিয়ভাবে পাসওয়ার্ড পরিবর্তন করতে পারে এবং কে কখন অ্যাক্সেস করেছে তার অডিট হিস্ট্রি রাখে।",
          "e": "Plaintext `.env` files on persistent disks create exposure surfaces. Vault and AWS Secrets Manager provide encrypted secret stores with automated rotation, role-based IAM leasing, dynamic short-lived credentials, and comprehensive audit logs.",
          "tip": "ইন্টারভিউতে 'Dynamic Credential Leasing & Automated Rotation' এর গুরুত্ব তুলে ধরবে।"
        },
        {
          "lvl": "lvl3",
          "q": "Content Security Policy (CSP) এবং Subresource Integrity (SRI) কীভাবে সাপ্লাই চেইন অ্যাটাক প্রতিরোধ করে?",
          "m": "Supply Chain Attack-এ হ্যাকার কোনো থার্ড-পার্টি সিডিএন প্যাকেজ হ্যাক করে ক্ষতিকর কোড ইনজেক্ট করে। Subresource Integrity (SRI) স্ক্রিপ্ট ট্যাগে একটি ক্রিপ্টোগ্রাফিক হ্যাশ যোগ করে (`integrity='sha384-...'`)। ব্রাউজার স্ক্রিপ্ট ডাউনলোড করার পর হ্যাশ মিলিয়ে দেখে—যদি সিডিএনে সামান্য পরিবর্তনও হয়ে থাকে, ব্রাউজার কোড রান করতে সম্পূর্ণ অস্বীকৃতি জানায়। আর CSP নির্ধারণ করে কোন কোন সুনির্দিষ্ট ডোমেন থেকে ব্রাউজার স্ক্রিপ্ট ও কানেকশন লোড করতে পারবে।",
          "b": "সাপ্লাই চেইন আক্রমণ ঠেকাতে এসআরআই (SRI) স্ক্রিপ্টের হ্যাশ মিলিয়ে দেখে কোনো বিকৃতি আছে কি না। সিএসপি (CSP) কঠোরভাবে নির্ধারণ করে কোন কোন অনুমোদিত ডোমেন ছাড়া অন্য কোনো স্ক্রিপ্ট ব্রাউজারে চলবে না।",
          "e": "Subresource Integrity (SRI) binds external CDN scripts to a cryptographic hash (`integrity='sha384-...'`). Browsers abort script execution if the downloaded asset differs by even one byte. CSP complements this by whitelisting authorized origin boundaries.",
          "code": "<script src='https://cdn.example.com/lib.js' integrity='sha384-oqVuAfXRKap7fdgcCY5uykM6...' crossorigin='anonymous'></script>"
        },
        {
          "lvl": "situation",
          "q": "একজন কর্মচারীর আইডি হ্যাক হয়েছে এবং সে কোম্পানি ছেড়ে দিয়েছে। কিন্তু তার কাছে বৈধ JWT অ্যাক্সেস টোকেন রয়েছে যার মেয়াদ এখনো ১২ ঘণ্টা বাকি। ব্যাকএন্ডে কীভাবে অবিলম্বে তার অ্যাক্সেস কাটবে?",
          "m": "যেহেতু JWT স্টেটলেস, শুধু ডাটাবেজে ইউজার ডিলিট করলে মেয়াদ শেষ না হওয়া পর্যন্ত অ্যাক্সেস টোকেনটি কাজ করতে থাকবে। সমাধান: (১) ইউজারের ডাটাবেজ রেকর্ডে একটি `tokenVersion: 1` ফিল্ড রাখব। JWT পেলোডের ভেতরেও এই ভার্সন থাকবে। (২) কর্মচারী টার্মিনেট হলে ডাটাবেজে `tokenVersion` বাড়িয়ে ২ করে দেব। (৩) মিডলওয়্যার ক্যাশড রেডিস থেকে ভ্যালিডেট করবে—যদি টোকেনের ভার্সন ডাটাবেজের চেয়ে পুরানো হয়, সাথে সাথে `401 Unauthorized` রিটার্ন করবে। এর ফলে ১ সেকেন্ডের মধ্যে তার সব সেশন বন্ধ হয়ে যাবে।",
          "b": "তাত্ক্ষণিক অ্যাক্সেস বাতিল করতে ইউজার মডেলে tokenVersion রাখা হয়। কর্মচারী টার্মিনেট হলে ভার্সন সংখ্যা বাড়িয়ে দেওয়া হয়, ফলে মিডলওয়্যারে পুরানো ভার্সনযুক্ত টোকেন আর কার্যকর থাকে না এবং তৎক্ষণাৎ সেশন বাতিল হয়।",
          "e": "Implement Token Versioning (or User Session Epoch). Embed a `tokenVersion` claim inside the JWT payload. Upon employee termination, increment `tokenVersion` in the user's DB record. The auth middleware rejects incoming tokens whose embedded version trails the active epoch.",
          "code": "if (decoded.tokenVersion !== cachedUser.tokenVersion) return res.status(401).send('Session revoked');"
        },
        {
          "lvl": "situation",
          "q": "লগইন এপিআইতে প্রতি মিনিটে ১০ হাজার ব্রুট-ফোর্স রিকোয়েস্ট আসছে যা ডাটাবেজ ও সিপিইউকে ডাউন করে দিচ্ছে। কীভাবে তাৎক্ষণিক ট্রাফিকের আক্রমণ প্রতিহত করবে?",
          "m": "জরুরি পদক্ষেপ: (১) সবার আগে Cloudflare বা Nginx রিভার্স প্রক্সির লেয়ারে WAF রুল ও Rate Limiting চালু করব যাতে ট্রাফিক নোড সার্ভার পর্যন্ত পৌঁছাতে না পারে। (২) এক্সপ্রেস অ্যাপে `express-rate-limit` দিয়ে আইপি প্রতি এবং একাউন্ট প্রতি ৫টি ফেইল্ড অ্যাটেম্পটের পর অ্যাকাউন্ট সাময়িক ১৫ মিনিটের জন্য লক করব। (৩) লগইন ফর্মে Cloudflare Turnstile বা Google reCAPTCHA v3 ইন্টিগ্রেট করব যা বটের আক্রমণকে ৯৯.৯% ফিল্টার করে দেবে।",
          "b": "ব্রুট ফোর্স আক্রমণে ক্লাউডফ্লেয়ার ডব্লিউএএফ (WAF) লেভেলে রেট লিমিটিং সক্রিয় করতে হবে। অ্যাপ্লিকেশনে ৫ বার ভুল পাসওয়ার্ড দিলে অ্যাকাউন্ট সাময়িক লক করতে হবে এবং টার্নস্টাইল ক্যাপচা যুক্ত করে বট ট্রাফিক পুরোপুরি আটকে দিতে হবে।",
          "e": "Defend against brute force surges: (1) Enforce edge-level WAF challenge rules on Cloudflare to drop abusive IPs before hitting Node, (2) Apply IP/Username compound rate limits backed by Redis, (3) Enforce Cloudflare Turnstile CAPTCHA on consecutive failures.",
          "tip": "নোড লেয়ারের আগে এজ (Cloudflare/Nginx) লেয়ারে ট্রাফিক ড্রপ করার কথা বলা প্রোডাকশন আর্কিটেকচারের চূড়ান্ত পরিচয়।"
        },
        {
          "lvl": "situation",
          "q": "ব্যবহারকারী লগআউট করার পর ব্রাউজারের ব্যাক বাটন চাপলে সুরক্ষিত ড্যাশবোর্ড পেজ ক্যাশ থেকে স্ক্রিনে ভেসে উঠছে। কীভাবে প্রিভেন্ট করবে?",
          "m": "এটি ঘটে ব্রাউজারের 'Back-Forward Cache (bfcache)'-এর কারণে। সমাধান: সুরক্ষিত ড্যাশবোর্ড এপিআই এবং পেজের রেসপন্স হেডারে আমরা নো-ক্যাশ হেডার পাঠাব: `Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate`, `Pragma: no-cache`, এবং `Expires: 0`। এর ফলে ব্রাউজার বুঝতে পারে এই সুরক্ষিত পেজটিকে কখনোই লোকাল ডিস্ক বা মেমোরিতে ক্যাশ করা যাবে না এবং ব্যাক বাটন চাপলে স্বয়ংক্রিয়ভাবে সার্ভার রি-ভ্যালিডেট করে লগইন পেজে পাঠিয়ে দেবে।",
          "b": "ব্যাক বাটন চাপলে পুরানো ড্যাশবোর্ড দেখা বন্ধ করতে Cache-Control: no-store হেডার পাঠাতে হবে। এর ফলে ব্রাউজার পেজটি মেমরিতে ক্যাশ করে রাখে না এবং ব্যাক বাটনে চাপ দিলে রিফ্রেশ হয়ে লগইন পেজে চলে যায়।",
          "e": "Set HTTP response caching headers on all protected endpoints: `Cache-Control: no-store, no-cache, must-revalidate`. This instructs browsers and intermediaries never to store snapshots in the bfcache, forcing immediate redirect to login upon back navigation.",
          "code": "res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');"
        },
        {
          "lvl": "situation",
          "q": "একটি এপিআইতে মাল্টিপল রোল অনুমোদিত (যেমন `ADMIN`, `MANAGER`, `STORE_OWNER`), কিন্তু একজন ইউজার অন্য স্টোরের ম্যানেজার হয়েও অন্য স্টোরের ডাটা এডিট করে ফেলছে। আরবিএসি লজিকে কী মিসিং ছিল?",
          "m": "এখানে মিসিং ছিল 'Multi-Tenant Context Scope'। আরবিএসি শুধু চেক করেছিল ইউজার ম্যানেজার কি না, কিন্তু সে 'কোন স্টোরের' ম্যানেজার তা চেক করেনি! সমাধান: রোলের পাশাপাশি টেন্যান্ট বা স্টোর ওনারশিপ গার্ড বসাতে হবে: `req.user.role === 'MANAGER' && req.user.storeId === requestedStoreId`। অর্থাৎ গ্লোবাল রোলের ওপর অন্ধ নির্ভর না করে টেন্যান্ট-লেভেল স্কোপড পারমিশন এনফোর্স করতে হবে।",
          "b": "এখানে রোল ঠিক থাকলেও স্টোর ওনারশিপ যাচাই করা হয়নি। সমাধান হলো রোলের সাথে স্টোর আইডি মিলিয়ে দেখা যে ইউজার আসলেই সেই নির্দিষ্ট স্টোরের ম্যানেজার কি না, অন্যথায় রিকোয়েস্ট বাতিল করতে হবে।",
          "e": "RBAC verified user roles globally without evaluating Tenant Scope. Rectify this by verifying role permissions strictly within the boundary of the tenant: `req.user.role === 'MANAGER' && req.user.tenantId === req.params.tenantId`.",
          "code": "if (user.role === 'MANAGER' && user.storeId !== req.params.storeId) {\n  return res.status(403).json({ error: 'Unauthorized for this store' });\n}"
        },
        {
          "lvl": "situation",
          "q": "ক্লায়েন্ট সাইড থেকে পাঠানো JWT টোকেন কোনো কারণে এক্সপায়ার হয়ে গেছে, কিন্তু ব্যাকএন্ড ভুল করে 500 Internal Server Error পাঠাচ্ছে। কীভাবে সঠিক HTTP স্ট্যাটাস হ্যান্ডেল করবে?",
          "m": "`jwt.verify()` টোকেন এক্সপায়ার হলে একটি `TokenExpiredError` থ্রো করে। ডেভেলপার যদি জেনেরিক ক্যাচ ব্লক রাখে তবে তা 500 হয়ে যায়, যা ফ্রন্টএন্ডের রিফ্রেশ টোকেন হ্যান্ডলারকে বিভ্রান্ত করে। সমাধান: অথ মিডলওয়্যারে আমরা এররের ধরন চেক করব: `if (err.name === 'TokenExpiredError') return res.status(401).json({ code: 'TOKEN_EXPIRED' })`। আর যদি সিগনেচার ভুল হয় তবে `JsonWebTokenError` ধরে 403 বা 401 দেব।",
          "b": "টোকেন এক্সপায়ার হলে jwt.verify TokenExpiredError দেয়। এটিকে আলাদাভাবে ক্যাচ করে সুনির্দিষ্ট ৪০১ (401) স্ট্যাটাস কোড এবং স্পষ্ট এরর কোড পাঠাতে হবে যাতে ফ্রন্টএন্ড বুঝতে পেরে রিফ্রেশ টোকেন চালাতে পারে।",
          "e": "Trap specific JWT error subtypes: when `err.name === 'TokenExpiredError'`, return HTTP 401 with a machine-readable code `{ code: 'TOKEN_EXPIRED' }`, enabling client Axios interceptors to initiate refresh flows instead of triggering generic 500 failures.",
          "code": "try {\n  const user = jwt.verify(token, secret);\n} catch (err: any) {\n  if (err.name === 'TokenExpiredError') return res.status(401).json({ code: 'TOKEN_EXPIRED' });\n  return res.status(403).json({ code: 'INVALID_TOKEN' });\n}"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS SaaS প্ল্যাটফর্মে মাল্টি-টেন্যান্ট রোল ও পারমিশন সিস্টেম (Owner, Manager, Cashier) কীভাবে ডাটাবেজ ও মিডলওয়্যারে আর্কিটেক্ট করেছিলে?",
          "m": "আমরা একটি হাইব্রিড RBAC + Tenant Scope আর্কিটেকচার তৈরি করেছিলাম। ডেটাবেজে প্রতিটি ইউজারের `tenantId`, `role`, এবং একটি কাস্টম `permissions` অ্যারে ছিল। যখন ক্যাশিয়ার লগইন করে, টোকেনে তার `tenantId` এবং পারমিশন তালিকা এনকোড হতো। ব্যাকএন্ডে আমরা একটি মিডলওয়্যার ব্যবহার করেছি: `requirePermission('pos:sales:create')`। এটি নিশ্চিত করত যে রিকোয়েস্টকারী ব্যক্তি ওই নির্দিষ্ট দোকানের ক্যাশিয়ার এবং তার কাছে বিক্রয় সম্পন্ন করার সুনির্দিষ্ট পারমিশন রয়েছে।",
          "b": "দোকানি সিস্টেমে প্রতিটি ইউজারের সাথে টেন্যান্ট আইডি ও পারমিশন অ্যারে যুক্ত ছিল। requirePermission মিডলওয়্যারের মাধ্যমে আমরা নিশ্চিত করেছি যে ক্যাশিয়ার শুধুমাত্র নিজের দোকানের পণ্য বিক্রি করতে পারে এবং মালিকের রিপোর্ট বা ইনভেন্টরি এডিটের অনুমতি তার নেই।",
          "e": "Architected a hybrid Tenant-Scoped RBAC in Dokani POS: JWTs contained tenant identifiers and normalized permission claims. Fine-grained guards (`requirePermission('sales:create')`) enforced strict tenant isolation and role policies.",
          "tip": "মাল্টি-টেন্যান্ট SaaS-এ টেন্যান্ট আইডি এবং রোল পারমিশন একসাথে ভ্যালিডেট করার অভিজ্ঞতা যে কোনো সিনিয়র রোলের জন্য অপরিহার্য।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ ক্যাশিয়ারের ক্যাশ ড্রয়ার ও বিক্রয় ডেটা জালিয়াতি ঠেকাতে অডিট লগিং (Audit Trail) কীভাবে সুরক্ষিত করেছিলে?",
          "m": "ক্যাশ কাউন্টারে বিল মুছে ফেলা বা ডিসকাউন্ট জালিয়াতি বন্ধ করতে আমরা একটি অপরিবর্তনশীল (Immutable) `AuditLog` টেবিল বানিয়েছি। প্রতিটি সংবেদনশীল অপারেশনে (যেমন বিল এডিট, ক্যাশ ড্রয়ার ওপেন, ডিসকাউন্ট ওভাররাইড) ব্যাকএন্ড স্বয়ংক্রিয়ভাবে অডিট লগ এন্ট্রি তৈরি করত: `{ tenantId, userId, action, ipAddress, userAgent, oldValues, newValues, timestamp }`। ডাটাবেজ লেয়ারে এই টেবিলে `UPDATE` বা `DELETE` সম্পূর্ণ নিষিদ্ধ ছিল (Append-only Table)। ফলে মালিক যেকোনো সময় দেখতে পারত ঠিক কখন কোন ক্যাশিয়ার কী করেছে।",
          "b": "জালিয়াতি রুখতে আমরা একটি অ্যাপেন্ড-অনলি অডিট লগ সিস্টেম তৈরি করেছিলাম। বিল পরিবর্তন বা ড্রয়ার খোলার সাথে সাথে পূর্বের ও বর্তমান মান, আইপি এবং সময় অপরিবর্তনীয়ভাবে সংরক্ষিত হতো যা কেউ মুছতে পারত না।",
          "e": "Protected Dokani against cashier fraud by implementing an append-only Immutable Audit Log table with database-level triggers revoking UPDATE and DELETE privileges. Captured operations recorded before-and-after states, actor IDs, and IP addresses.",
          "code": "await prisma.auditLog.create({\n  data: { tenantId, userId, action: 'INVOICE_DISCOUNT_APPLIED', details: { oldPrice, newPrice, reason } }\n});"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে অনলাইন পরীক্ষার সময় একই স্টুডেন্ট অ্যাকাউন্টে একাধিক ডিভাইস থেকে একযোগে লগইন ঠেকাতে সেশন কন্ট্রোল কীভাবে নিশ্চিত করেছিলে?",
          "m": "আমরা Redis-এ একটি 'Single Active Device Session' নীতি প্রয়োগ করেছি। স্টুডেন্ট লগইন করার সময় একটি ইউনিক `sessionId` তৈরি করে রেডিসে সেভ করা হতো: `SET student:session:{studentId} {sessionId}`। এরপর প্রতিটি এপিআই রিকোয়েস্টে মিডলওয়্যার চেক করত টোকেনের সেশন আইডি রেডিসের বর্তমান সেশন আইডির সাথে মিলছে কি না। স্টুডেন্ট অন্য কোনো ব্রাউজার বা ফোনে লগইন করা মাত্র পূর্বের সেশনটি ওভাররাইট হয়ে যেত এবং আগের ডিভাইসের পরীক্ষা তৎক্ষণাৎ পজ হয়ে 'অন্য ডিভাইসে লগইন হয়েছে' মেসেজ দেখাত।",
          "b": "একযোগে একাধিক ডিভাইস থেকে লগইন বন্ধ করতে রেডিসে সিঙ্গেল অ্যাক্টিভ সেশন আইডি রাখা হতো। অন্য কোথাও থেকে লগইন করলে পূর্ববর্তী সেশনটি স্বয়ংক্রিয়ভাবে অকার্যকর হয়ে আগের ডিভাইসের পরীক্ষা আটকে যেত।",
          "e": "Prevented concurrent exam cheating in PTTABD via Redis-backed Single Active Session tracking. Authentic logins overwrite the user's active session key in Redis; previous devices detect session mismatches on their next request and terminate instantly.",
          "tip": "এড-টেক বা সিকিউর এক্সাম সিস্টেমে সিঙ্গেল সেশন এনফোর্সমেন্ট রিয়েল-লাইফ চ্যালেঞ্জের দারুণ সমাধান।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর এপিআইতে ক্রেডিট কার্ড বা গ্রাহকের ব্যক্তিগত তথ্য (PII) ডাটাবেজে স্টোর করার সময় ফিল্ড-লেভেল এনক্রিপশন (AES-256-GCM) কীভাবে বাস্তবায়ন করেছিলে?",
          "m": "আমরা ডেটাবেজে গ্রাহকের সংবেদনশীল তথ্য (যেমন ফোন নম্বর বা জাতীয় পরিচয়পত্র) সরাসরি প্লেইন টেক্সটে রাখিনি। আমরা Node.js-এর বিল্ট-ইন `crypto` মডিউল ব্যবহার করে `AES-256-GCM` সিমেট্রিক এনক্রিপশন বাস্তবায়ন করেছি। প্রতিটি রেকর্ডের জন্য একটি ইউনিক Initialization Vector (IV) এবং Authentication Tag ব্যবহার করা হতো যা ডাটাবেজ চুরি হলেও হ্যাকারদের জন্য ডেটা ডিক্রিপ্ট করা অসম্ভব করে দিত।",
          "b": "সংবেদনশীল গ্রাহক তথ্য সুরক্ষায় আমরা AES-256-GCM ফিল্ড লেভেল এনক্রিপশন ব্যবহার করেছি। প্রতিটি তথ্যের সাথে ইউনিক আইভি (IV) ও অথ ট্যাগ থাকায় ডাটাবেজ হ্যাক হলেও মূল তথ্য উদ্ধার করা অসম্ভব।",
          "e": "Encrypted sensitive PII (customer NID and phone numbers) in Dokani POS via AES-256-GCM authenticated encryption. Each write generated a distinct 12-byte IV and 16-byte authentication tag, ensuring confidentiality and cryptographic integrity.",
          "code": "const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);\nlet encrypted = cipher.update(plainText, 'utf8', 'hex') + cipher.final('hex');\nconst authTag = cipher.getAuthTag().toString('hex');"
        },
        {
          "lvl": "realworld",
          "q": "প্রোডাকশন Express অ্যাপ্লিকেশনে নিয়মিত সিকিউরিটি অডিট ও ডিপেনডেন্সি ভালনারেবিলিটি স্ক্যান কীভাবে CI পাইপলাইনে অটোমেট করেছিলে?",
          "m": "আমরা GitHub Actions CI পাইপলাইনে ৩টি স্বয়ংক্রিয় সিকিউরিটি গেট যুক্ত করেছি: (১) `npm audit --audit-level=high`: ডিপেনডেন্সিতে কোনো গুরুতর ত্রুটি থাকলে বিল্ড সাথে সাথে ফেইল করে। (২) `Snyk` বা `Trivy`: থার্ড-পার্টি প্যাকেজ ও ডকার ইমেজের ভালনারেবিলিটি স্ক্যান করে। (৩) `SonarQube` / `CodeQL`: স্ট্যাটিক অ্যাপ্লিকেশন সিকিউরিটি টেস্টিং (SAST) চালিয়ে কোনো ইনজেকশন বা হার্ডকোডেড ক্রেডেনশিয়াল থাকলে পিআর ব্লক করে দেয়।",
          "b": "আমরা সিআই পাইপলাইনে npm audit, Snyk এবং CodeQL ইন্টিগ্রেট করে নিয়মিত সিকিউরিটি স্ক্যান স্বয়ংক্রিয় করেছি। কোনো থার্ড পার্টি প্যাকেজে ত্রুটি থাকলে মার্জ বাটন লক হয়ে গিয়ে কোডবেজ সর্বদা সুরক্ষিত থাকত।",
          "e": "Automated continuous security auditing in GitHub Actions via `npm audit --audit-level=high` gates, Snyk dependency vulnerability scans, and CodeQL SAST code analysis to intercept security regressions before merging.",
          "tip": "সিআই পাইপলাইনে SAST ও ডিপেনডেন্সি স্ক্যানিং এনফোর্স করার অভিজ্ঞতা সিকিউরিটি-ফার্স্ট ইঞ্জিনিয়ারদের বৈশিষ্ট্য।"
        }
      ]
    },
    {
      "id": "api-validation-errors",
      "name": "API Validation, Errors & Logging",
      "desc": "Zod/Joi Validation Middleware, Custom AppError Classes, HTTP Status Codes, Centralized Error Trap, Winston/Pino",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Express-এ Zod দিয়ে রিকোয়েস্ট ভ্যালিডেশন মিডলওয়্যার (`validateRequest(schema)`) কীভাবে লিখতে হয়?",
          "m": "আমরা একটি রি-ইউজেবল হায়ার-অর্ডার মিডলওয়্যার তৈরি করি: `validate(schema)`। এটি ইনকামিং রিকোয়েস্টের `body`, `query`, এবং `params` কে Zod স্কিমা দিয়ে পার্স করে (`schema.parseAsync({ body: req.body, query: req.query, params: req.params })`। যদি কোনো ফিল্ড ইনভ্যালিড হয়, Zod একটি `ZodError` থ্রো করে যা আমাদের গ্লোবাল এরর হ্যান্ডলারে চলে যায় এবং ক্লায়েন্টকে সুনির্দিষ্ট 400 Bad Request দেয়। আর পাস করলে পার্সড ও ক্লিন ডাটা দিয়ে `next()` কল করে।",
          "b": "আমরা একটি হায়ার-অর্ডার মিডলওয়্যার ফাংশন তৈরি করি যা Zod স্কিমা গ্রহণ করে। এটি রিকোয়েস্ট বডি বা কুয়েরি পার্স করে সঠিক থাকলে পরবর্তী কন্ট্রোলারে পাঠায় এবং কোনো ভুল থাকলে ৪০০ স্ট্যাটাস কোড সহ বিস্তারিত এরর প্রদান করে।",
          "e": "Author a higher-order `validate(schema)` middleware evaluating `req.body`, `req.query`, and `req.params` against a Zod schema via `schema.parseAsync()`. Validation failures throw typed `ZodError` instances caught by the centralized error boundary.",
          "code": "export const validate = (schema: AnyZodSchema) => async (req: Request, res: Response, next: NextFunction) => {\n  try {\n    await schema.parseAsync({ body: req.body, query: req.query, params: req.params });\n    next();\n  } catch (err) { next(err); }\n};"
        },
        {
          "lvl": "lvl1",
          "q": "প্রধান HTTP Status Codes (200, 201, 400, 401, 403, 404, 409, 422, 500)-এর সুনির্দিষ্ট অর্থ কী?",
          "m": "(১) `200 OK`: সফল রিকোয়েস্ট। (২) `201 Created`: নতুন রিসোর্স সফলভাবে তৈরি হয়েছে। (৩) `400 Bad Request`: ক্লায়েন্টের সিনট্যাক্স বা ইনপুট ভুল। (৪) `401 Unauthorized`: অথেনটিকেশন মিসিং বা টোকেন ইনভ্যালিড। (৫) `403 Forbidden`: লগইন করা থাকলেও সংশ্লিষ্ট রিসোর্সে পারমিশন নেই। (৬) `404 Not Found`: রিসোর্স পাওয়া যায়নি। (৭) `409 Conflict`: ডাটা কনফ্লিক্ট (যেমন ডুপ্লিকেট ইমেইল বা ফোন)। (৮) `422 Unprocessable Entity`: সিনট্যাক্স ঠিক থাকলেও সেমান্টিক ভ্যালিডেশন ফেইল। (৯) `500 Internal Server Error`: অপ্রত্যাশিত সার্ভার ত্রুটি।",
          "b": "স্ট্যাটাস কোডের অর্থ: ২০০ সফল, ২০১ নতুন রেকর্ড সৃষ্টি, ৪০০ ভুল ইনপুট, ৪০১ লগইন ছাড়া এক্সেস, ৪০৩ পারমিশন বিহীন, ৪০৪ রেকর্ড নিখোঁজ, ৪০৯ ডুপ্লিকেট তথ্য সংঘাত, ৪২২ ভ্যালিডেশন ব্যর্থতা এবং ৫০০ সার্ভারের অভ্যন্তরীণ ত্রুটি।",
          "e": "HTTP status taxonomy: 200 (Success), 201 (Created), 400 (Bad Syntax), 401 (Unauthenticated), 403 (Unauthorized/Forbidden), 404 (Resource Missing), 409 (State Conflict/Duplicates), 422 (Semantic Validation Failure), 500 (Internal Server Fault).",
          "tip": "ইন্টারভিউতে 401 (Who are you?) এবং 403 (Permission denied) এর পার্থক্য সবচেয়ে বেশি জানতে চায়।"
        },
        {
          "lvl": "lvl1",
          "q": "JavaScript-এ কাস্টম `AppError` ক্লাস কেন তৈরি করা উচিত এবং এর সাথে `isOperational` ফ্ল্যাগের ভূমিকা কী?",
          "m": "ডিফল্ট `new Error()` এ কোনো HTTP স্ট্যাটাস কোড থাকে না। আমরা `class AppError extends Error` তৈরি করি যার ভেতরে `statusCode` (যেমন 404, 400) এবং `isOperational = true` থাকে। `isOperational: true` নির্দেশ করে যে এটি একটি প্রত্যাশিত ও নিরাপদ অপারেশনাল এরর (যেমন: ইউজার ভুল পাসওয়ার্ড দিয়েছে বা স্টক খালি)—সার্ভার ক্র্যাশ করার দরকার নেই। আর আন-অপারেশনাল বা প্রোগ্রামিং বাগ (যেমন নাল পয়েন্টার বা মেমোরি লিক) আসলে সার্ভারকে গ্রেসফুলি রিস্টার্ট করতে হয়।",
          "b": "AppError কাস্টম ক্লাসে স্ট্যাটাস কোড এবং isOperational ফ্ল্যাগ থাকে। অপারেশনাল এরর নির্দেশ করে এটি একটি স্বাভাবিক ব্যবসায়িক ভুল (যেমন ভুল ইনপুট), যার কারণে পুরো সার্ভার বন্ধ করার প্রয়োজন পড়ে না।",
          "e": "A custom `AppError` class extends native `Error` to attach an HTTP `statusCode` and an `isOperational: boolean` flag. Operational errors represent anticipated domain failures (validation, missing records) that should be reported cleanly without crashing the runtime.",
          "code": "export class AppError extends Error {\n  constructor(public message: string, public statusCode: number = 400, public isOperational: boolean = true) {\n    super(message);\n    Error.captureStackTrace(this, this.constructor);\n  }\n}"
        },
        {
          "lvl": "lvl1",
          "q": "Production Logging-এ `console.log()` কেন ক্ষতিকর এবং Winston বা Pino কেন অপরিহার্য?",
          "m": "`console.log()` সিঙ্ক্রোনাসলি রান করে যা নোডের মেইন ইভেন্ট লুপকে ব্লক করতে পারে এবং এতে কোনো লগ লেভেল (info, warn, error), টাইমস্ট্যাম্প বা স্ট্রাকচার্ড JSON থাকে না। উইনস্টন (Winston) বা পিনো (Pino) হলো অ্যাসিনক্রোনাস হাই-স্পিড লগার যা: (১) স্ট্রাকচার্ড JSON ফরম্যাটে লগ লেখে (Datadog বা Elasticsearch-এ সার্চ করার উপযোগী), (২) নির্দিষ্ট লগ লেভেল অনুযায়ী ফিল্টারিং করে, (৩) স্বয়ংক্রিয় ফাইল রোটেশন করে ডিস্ক পূর্ণ হওয়া আটকায়।",
          "b": "console.log মেইন থ্রেডকে ব্লক করতে পারে এবং এতে কোনো সুনির্দিষ্ট টাইমস্ট্যাম্প বা লগ লেভেল থাকে না। উইনস্টন বা পিনো অ্যাসিনক্রোনাস পদ্ধতিতে অতি দ্রুত স্ট্রাকচার্ড JSON লগ তৈরি করে যা প্রফেশনাল সিস্টেমে ডিবাগিংয়ের জন্য অপরিহার্য।",
          "e": "console.log is synchronous in many Node environments, blocking the event loop under heavy load while lacking timestamps, log levels, and structured formats. Winston and Pino deliver high-throughput asynchronous structured JSON streams built for aggregation in Elasticsearch or Datadog.",
          "tip": "কখনোই প্রোডাকশন কোডে `console.log` রাখবে না—সবসময় স্ট্রাকচার্ড লগারের কথা বলবে।"
        },
        {
          "lvl": "lvl1",
          "q": "Zod-এর `safeParse()` এবং `parse()` মেথডের মধ্যে পার্থক্য কী?",
          "m": "`schema.parse(data)` যদি ডেটা ইনভ্যালিড পায় তবে সাথে সাথে একটি এক্সেপশন বা এরর থ্রো (Throw) করে যা ক্যাচ ব্লক ছাড়া সার্ভার ক্র্যাশ করতে পারে। আর `schema.safeParse(data)` কোনো এরর থ্রো করে না; এটি শান্তভাবে একটি অবজেক্ট রিটার্ন করে: সফল হলে `{ success: true, data: T }`, আর ব্যর্থ হলে `{ success: false, error: ZodError }`। যেখানে ট্রাই-ক্যাচ ব্লক ছাড়া ক্লিন কন্ডিশনাল চেকিং দরকার সেখানে `safeParse()` ব্যবহার করা অনেক বেশি মার্জিত।",
          "b": "parse() কোনো ভুল পেলে সরাসরি এরর থ্রো করে। অন্যদিকে safeParse() কোনো এরর না ছুড়ে একটি সেফ অবজেক্ট দেয় যাতে success: true/false থাকে, ফলে ট্রাই-ক্যাচ ছাড়াই কোড পরিষ্কার রাখা যায়।",
          "e": "`parse()` synchronously throws a `ZodError` upon schema mismatch, necessitating try/catch wrappers. `safeParse()` does not throw, returning a tagged union (`{ success: true, data }` or `{ success: false, error }`) for functional, branch-safe evaluations.",
          "code": "const result = UserSchema.safeParse(req.body);\nif (!result.success) return res.status(400).json(result.error.format());"
        },
        {
          "lvl": "lvl2",
          "q": "Global Error Handling Middleware-এ ZodError, PrismaError, এবং কাস্টম AppError কীভাবে আলাদাভাবে ফরম্যাট করবে?",
          "m": "সেন্ট্রালাইজড এরর মিডলওয়্যারে আমরা টাইপ চেক করি: (১) `err instanceof ZodError`: ফিল্ড-লেভেল এরর ম্যাপ করে `400` স্ট্যাটাসে বিস্তারিত ইনপুট মেসেজ পাঠাব। (২) `err instanceof PrismaClientKnownRequestError`: যেমন `P2002` (ইউনিক কনস্ট্রেইন্ট ফেইল) হলে `409 Conflict` দেব, `P2025` (রেকর্ড নিখোঁজ) হলে `404` দেব। (৩) `err instanceof AppError`: তার নির্দিষ্ট `statusCode` এবং মেসেজ পাঠাব। (৪) অন্য কোনো অজানা এরর হলে `500` দিয়ে ইন্টারনালি লগ করব।",
          "b": "এরর মিডলওয়্যারে ZodError আসলে ফিল্ড ভিত্তিক ৪০০ এরর, প্রিজমা এরর (যেমন ডুপ্লিকেট P2002) আসলে ৪০৯ কনফ্লিক্ট এবং কাস্টম AppError আসলে নির্দিষ্ট স্ট্যাটাস কোড দিয়ে ক্লায়েন্টকে ফ্রেন্ডলি রেসপন্স পাঠানো হয়।",
          "e": "Differentiate errors inside the global handler via `instanceof`: map `ZodError` to 400 with flattened field issues, map Prisma known codes (P2002 to 409 Conflict, P2025 to 404 Not Found), pass custom operational `AppError` directly, and conceal unknown exceptions behind 500.",
          "code": "if (err instanceof ZodError) return res.status(400).json({ success: false, errors: err.flatten().fieldErrors });\nif (err.code === 'P2002') return res.status(409).json({ success: false, message: 'Duplicate record exists' });"
        },
        {
          "lvl": "lvl2",
          "q": "RFC 7807 (Problem Details for HTTP APIs) স্ট্যান্ডার্ড কী এবং এরর রেসপন্সে এটি কেন ব্যবহার করা উচিত?",
          "m": "RFC 7807 হলো IETF স্ট্যান্ডার্ড যা HTTP API-তে এরর রেসপন্স স্ট্রাকচার করার একটি সার্বজনীন ফরম্যাট দেয়। এলোমেলো এরর মেসেজের বদলে এটি ৫টি স্ট্যান্ডার্ড ফিল্ড প্রদান করে: `type` (সমস্যার ইউআরআই ডকুমেন্টেশন লিংক), `title` (সংক্ষিপ্ত শিরোনাম), `status` (HTTP কোড যেমন 400), `detail` (নির্দিষ্ট ত্রুটির বিস্তারিত বর্ণনা), এবং `instance` (যে ইউআরএলে এরর হয়েছে)। এর ফলে যেকোনো ফ্রন্টএন্ড বা মোবাইল ক্লায়েন্ট মেশিন-রিডেবল উপায়ে নির্ভুলভাবে এরর হ্যান্ডেল করতে পারে।",
          "b": "আরএফসি ৭৮০৭ হলো আন্তর্জাতিক মান যা এপিআই এরর প্রকাশের সুনির্দিষ্ট নিয়ম দেয়। এতে টাইটেল, স্ট্যাটাস, বিস্তারিত বর্ণনা ও ইউআরআই উল্লেখ থাকে যা যেকোনো সিস্টেমের জন্য বুঝতে সহজ।",
          "e": "RFC 7807 defines 'Problem Details for HTTP APIs' as a standardized media type (`application/problem+json`). It formalizes error payloads with uniform fields: `type`, `title`, `status`, `detail`, and `instance` for predictable client-side exception parsing.",
          "code": "res.setHeader('Content-Type', 'application/problem+json');\nres.status(400).json({\n  type: 'https://api.dokani.com/errors/invalid-stock',\n  title: 'Insufficient Inventory',\n  status: 400,\n  detail: 'Requested 5 units of Product X but only 2 remain.'\n});"
        },
        {
          "lvl": "lvl2",
          "q": "Distributed Request Tracing-এ `X-Request-ID` বা Correlation ID কীভাবে কাজ করে এবং লগে এটি কেন বাধ্যতামূলক?",
          "m": "যখন প্রতি সেকেন্ডে হাজার হাজার রিকোয়েস্ট আসে, সেন্ট্রাল লগ ফাইলে সব ইউজারের লগ এলোমেলোভাবে মিশে যায়। Correlation ID হলো একটি ইউনিক UUID যা রিকোয়েস্ট আসার সাথে সাথে মিডলওয়্যারে তৈরি হয় (`req.headers['x-request-id'] || crypto.randomUUID()`)। রিকোয়েস্ট চলাকালীন ডাটাবেজ কোয়েরি, সার্ভিস কল বা এররের প্রতিটি লগে এই আইডি জুড়ে দেওয়া হয় এবং ক্লায়েন্ট রেসপন্স হেডারেও ফিরিয়ে দেওয়া হয়। কোনো ব্যবহারকারী এরর রিপোর্ট করলে তার ওই একটি Correlation ID দিয়ে লগ সার্চ করলেই মুহূর্তের মধ্যে পুরো কল হিস্ট্রি পাওয়া যায়।",
          "b": "কোরিলেশন আইডি হলো প্রতিটি রিকোয়েস্টের ইউনিক আইডেন্টিফায়ার। এটি প্রতিটি লগের সাথে যুক্ত থাকলে হাজার হাজার লগের ভিড় থেকে সুনির্দিষ্ট ইউজারের ট্রানজাকশন ইতিহাস চোখের পলকে খুঁজে বের করা যায়।",
          "e": "Correlation IDs (`X-Request-ID`) bind every asynchronous step of an incoming request (controllers, database traces, external calls) to a single UUID. Attaching this ID to every log entry enables isolating end-to-end execution journeys in centralized observability platforms.",
          "code": "const traceId = req.headers['x-request-id'] || uuidv4();\nres.setHeader('X-Request-ID', traceId);\nlogger.defaultMeta = { traceId };"
        },
        {
          "lvl": "lvl2",
          "q": "Pino লগার কেন Winston-এর চেয়ে ৫ গুণ দ্রুত এবং কীভাবে এটি জিরো-ওভারহেড লগিং নিশ্চিত করে?",
          "m": "Winston ইন্টারনালি জাভাস্ক্রিপ্ট স্ট্রিং ফরম্যাটিং ও অবজেক্ট ক্লোনিংয়ের জন্য বেশ কিছু সিপিইউ সাইকেল ব্যয় করে। Pino হলো এক্সট্রিমলি অপটিমাইজড: এটি সরাসরি V8 স্ট্রিং সিরিয়ালাইজার ব্যবহার করে এবং কোনো সিনক্রোনাস অবজেক্ট মেমোরি কপি তৈরি করে না। এছাড়া Pino লগ রাইটিং প্রসেসকে একটি আলাদা `Worker Thread` বা প্রসেসে অফলোড করতে পারে (`pino.transport`)। ফলে হাই-ট্রাফিক এপিআইতে লগিংয়ের জন্য সার্ভারের থ্রুপুট একটুও স্লো হয় না।",
          "b": "পিনো অতি দ্রুতগতির লগার যা সরাসরি ভি-৮ স্ট্রিং অপটিমাইজেশন ব্যবহার করে। এটি আলাদা ব্যাকগ্রাউন্ড থ্রেডে লগ রাইট করায় নোড সার্ভারের মেইন থ্রেডে কোনো ওভারহেড পড়ে না এবং উইনস্টনের চেয়ে ৫ গুণ দ্রুত চলে।",
          "e": "Pino achieves extreme performance by minimizing runtime allocations and avoiding object cloning during log serializations. By streaming logs asynchronously off the main thread via decoupled worker transports, Pino sustains massive I/O throughput with near-zero latency impact.",
          "tip": "হাই-থ্রুপুট মাইক্রোসার্ভিসে উইনস্টনের জায়গায় পিনো (Pino) বেছে নেওয়ার কথা বলা সিনিয়র ব্যাকএন্ড চয়েস।"
        },
        {
          "lvl": "lvl2",
          "q": "Input Data Sanitization (XSS & NoSQL Injection): `express-mongo-sanitize` এবং Zod কীভাবে ক্ষতিকর ইনপুট ফিল্টার করে?",
          "m": "NoSQL ইনজেকশনে হ্যাকার ইউজারনেম ফিল্ডে স্ট্রিং না পাঠিয়ে অবজেক্ট পাঠায়: `{ \"username\": { \"$gt\": \"\" } }`—যা ডাটাবেজ পাসওয়ার্ড ম্যাচ ছাড়াই ট্রু করে দেয়। `express-mongo-sanitize` রিকোয়েস্টের বডি ও কুয়েরি থেকে যেকোনো ডোলার সাইন (`$`) বা ডট (`.`) কি স্বয়ংক্রিয়ভাবে মুছে ফেলে। আর Zod স্কিমায় আমরা কঠোরভাবে `z.string()` এনফোর্স করি; ক্লায়েন্ট অবজেক্ট পাঠালে Zod সাথে সাথে 400 এরর দিয়ে রিকোয়েস্ট বাতিল করে দেয়।",
          "b": "নো-এসকিউএল ইনজেকশনে আক্রমণকারী $gt বা অপারেটর পাঠিয়ে ডাটাবেজ হ্যাক করার চেষ্টা করে। express-mongo-sanitize ডলার সাইনযুক্ত কি মুছে ফেলে এবং Zod স্ট্রিক্ট টাইপ চেকিং দিয়ে অবজেক্ট ইনজেকশন রুখে দেয়।",
          "e": "NoSQL injection exploits MongoDB query operators ($gt, $ne) sent in body payloads. `express-mongo-sanitize` strips leading `$` and `.` characters from `req.body`, while Zod strictly rejects objects where scalar strings are demanded.",
          "code": "import mongoSanitize from 'express-mongo-sanitize';\napp.use(mongoSanitize());"
        },
        {
          "lvl": "lvl3",
          "q": "Log Masking & PII Redaction: ব্যবহারকারীর পাসওয়ার্ড, ক্রেডিট কার্ড বা জাতীয় পরিচয়পত্র লগ ফাইলে যাওয়া কীভাবে স্বয়ংক্রিয়ভাবে আটকাবে?",
          "m": "প্রোডাকশন লগে অসাবধানতাবশত পাসওয়ার্ড বা কার্ড নম্বর সেভ হলে তা বড় ধরনের সিকিউরিটি ও কমপ্লায়েন্স (GDPR/PCI-DSS) লঙ্ঘন। সমাধান: আমরা লগারের ভেতর একটি 'PII Masking Formatter / Redaction Engine' কনফিগার করব (Pino-তে বিল্ট-ইন `redact: ['req.headers.authorization', '*.password', '*.creditCard', '*.token']`)। এটি লগ লেখার ঠিক আগে ওই নির্দিষ্ট কি-গুলোর মানকে স্বয়ংক্রিয়ভাবে `[REDACTED]` বা `***` দিয়ে রিপ্লেস করে দেয়।",
          "b": "লগ ফাইলে পাসওয়ার্ড বা ক্রেডিট কার্ড নম্বর ফাঁস হওয়া বন্ধ করতে লগার রেড্যাকশন (Redaction) ইঞ্জিন ব্যবহার করা হয়। এটি স্বয়ংক্রিয়ভাবে সংবেদনশীল ফিল্ডগুলোকে [REDACTED] দিয়ে ঢেকে দিয়ে গোপনীয়তা রক্ষা করে।",
          "e": "Prevent sensitive PII/credential exfiltration to log aggregators by configuring log redaction pipelines. Pino provides native `redact` arrays targeting nested keys (`['*.password', 'req.headers.cookie']`), replacing values with `[REDACTED]` prior to serialization.",
          "code": "const logger = pino({\n  redact: { paths: ['req.body.password', 'req.body.cardNumber', 'req.headers.authorization'], censor: '[REDACTED]' }\n});"
        },
        {
          "lvl": "lvl3",
          "q": "Sentry Error Monitoring: প্রোডাকশনে রিয়েল-টাইম ক্র্যাশ ক্যাপচার, সোর্স ম্যাপ ইন্টিগ্রেশন এবং ব্রেডক্রাম্বস ট্র্যাকিং কীভাবে কাজ করে?",
          "m": "Sentry SDK এক্সপ্রেসের এরর মিডলওয়্যারে যুক্ত থাকে (`Sentry.setupExpressErrorHandler(app)`। যখনই কোনো আনহ্যান্ডেলড এক্সেপশন ঘটে: (১) এটি তৎক্ষণাৎ ক্র্যাশের সম্পূর্ণ স্ট্যাক ট্রেস এবং এনভায়রনমেন্ট মেটাডাটা সেন্ট্রিতে পাঠায়। (২) বিল্ড টাইমে আপলোড করা সোর্স ম্যাপ (Source Maps) ব্যবহার করে কম্পাইল করা কোড থেকে আসল টাইপস্ক্রিপ্ট ফাইলের ঠিক কোন লাইনে বাগ হয়েছে তা নিখুঁতভাবে দেখায়। (৩) 'Breadcrumbs' ইউজারের ক্র্যাশের ঠিক আগের ৫টি এপিআই কল বা বাটন ক্লিকের ইতিহাস রেকর্ড করে ডিবাগিংকে পানির মতো সহজ করে দেয়।",
          "b": "সেন্ট্রি প্রোডাকশন এরর রিয়েল-টাইমে শনাক্ত করে। সোর্স ম্যাপের মাধ্যমে কম্পাইল করা কোডের বদলে আসল টাইপস্ক্রিপ্ট লাইনের ভুল দেখায় এবং ব্রেডক্রাম্বস ব্যবহার করে ক্র্যাশের পূর্ববর্তী ব্যবহারকারীর অ্যাকশন ট্র্যাক করে।",
          "e": "Sentry captures unhandled production runtime exceptions. Integrating source maps resolves obfuscated production bundles back to original TypeScript lines, while Sentry Breadcrumbs log recent network calls and user actions leading to the crash.",
          "code": "Sentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 1.0 });\napp.use(Sentry.expressErrorHandler());"
        },
        {
          "lvl": "lvl3",
          "q": "Fail-Fast Validation Architecture: ডোমেন মডেলে প্রবেশের আগেই কেন গেটওয়ে বা কন্ট্রোলার লেয়ারে ভ্যালিডেশন শেষ করতে হবে?",
          "m": "Fail-Fast আর্কিটেকচার নীতি অনুযায়ী: কোনো ইনপুট ডাটা যদি ত্রুটিপূর্ণ হয়, তবে তাকে কোনো সার্ভিস, ডাটাবেজ কানেকশন বা বিজনেস লজিকে প্রবেশ করতেই দেওয়া যাবে না; সিস্টেমের একদম প্রবেশদ্বারেই (API Boundary) তৎক্ষণাৎ রিকোয়েস্ট বাতিল করতে হবে। এর ফলে: অপ্রয়োজনীয় ডাটাবেজ কোয়েরি বাঁচে, মেমোরি ও সিপিইউ অপচয় রোধ হয় এবং সার্ভিস লেয়ারে বাড়তি ডিফেন্সিভ কোড (`if (!data.name)`) লেখার কোনো প্রয়োজন থাকে না।",
          "b": "ফেইল-ফাস্ট আর্কিটেকচার ভুল ডাটাকে সিস্টেমের একদম শুরুতেই আটকে দেয়। এতে ডাটাবেজে অপ্রয়োজনীয় চাপ পড়ে না এবং সার্ভিস লেয়ার সবসময় নিশ্চিত থাকে যে সে যা ডাটা পাচ্ছে তা শতভাগ নির্ভুল।",
          "e": "The Fail-Fast principle demands rejecting malformed requests at the earliest possible boundary (HTTP ingestion). This shields downstream business services from defensive boilerplate, isolates domain layers from schema validation bugs, and spares database IOPS.",
          "tip": "কন্ট্রোলারের একদম শুরুতে ভ্যালিডেশন শেষ করে ফেলার এই নীতি আর্কিটেকচারাল ম্যাচিউরিটির প্রমাণ।"
        },
        {
          "lvl": "lvl3",
          "q": "Structured JSON Log Aggregation: ELK Stack (Elasticsearch, Logstash, Kibana) বা Grafana Loki-তে লগ কুয়েরি কীভাবে কাজ করে?",
          "m": "আমরা প্লেইন টেক্সট ফাইল লেখার বদলে উইনস্টন/পিনো দিয়ে প্রতি লাইনে একটি ভ্যালিড JSON অবজেক্ট আউটপুট দিই। Logstash বা Promtail সেই JSON লগ রিড করে স্বয়ংক্রিয়ভাবে প্রতিটি ফিল্ডকে ইনডেক্স করে (যেমন `level: 'error'`, `tenantId: '123'`, `durationMs: 450`)। এরপর Kibana বা Grafana ড্যাশবোর্ডে আমরা সেকেন্ডের মধ্যে ফিল্টার করতে পারি: `level: 'error' AND tenantId: 'dokani_5' AND durationMs > 500`। ফলে কোটি কোটি লগের ভেতর থেকেও নির্দিষ্ট দোকানের স্লো কুয়েরি পলকে খুঁজে বের করা যায়।",
          "b": "স্ট্রাকচার্ড JSON লগগুলো ইলাস্টিকসার্চ বা লোকি দ্বারা স্বয়ংক্রিয়ভাবে ইনডেক্স হয়। এর ফলে কিবানা বা গ্রাফানায় সুনির্দিষ্ট কুয়েরি চালিয়ে কোটি কোটি লগের মধ্য থেকে যেকোনো এরর বা স্লো এপিআই তাৎক্ষণিক শনাক্ত করা যায়।",
          "e": "Streaming single-line structured JSON records allows collectors (Logstash/Promtail) to ingest and index individual JSON properties natively. Operators query metrics via Kibana or Grafana Loki using structured filters (`level='error' AND duration > 1000ms`).",
          "code": "{\"level\":\"error\",\"time\":1700000000,\"traceId\":\"abc-123\",\"tenantId\":\"t1\",\"msg\":\"Payment failed\"}"
        },
        {
          "lvl": "lvl3",
          "q": "Zod-এ Recursive Schemas কীভাবে তৈরি করতে হয় (যেমন নেস্টেড ক্যাটাগরি ট্রি বা কমেন্ট রিপ্লাই ট্রি)?",
          "m": "যখন কোনো ডেটা মডেলের ভেতর নিজেরই নেস্টেড রেফারেন্স থাকে (যেমন একটি ক্যাটাগরির ভেতর একাধিক সাব-ক্যাটাগরি থাকতে পারে এবং তাদের ভেতর আরও সাব-ক্যাটাগরি), তখন সাধারণ অবজেক্ট স্কিমা টাইপ এরর দেয়। Zod-এ `z.lazy()` ব্যবহার করে রিকার্সিভ স্কিমা ডিফাইন করা হয়: `const CategorySchema: z.ZodType<Category> = z.lazy(() => z.object({ id: z.string(), name: z.string(), subCategories: z.array(CategorySchema) }))`। এটি টাইপস্ক্রিপ্টের সাথে শতভাগ সামঞ্জস্য রেখে অসীম গভীরতার নেস্টেড ট্রি ভ্যালিডেট করতে পারে।",
          "b": "নেস্টেড ক্যাটাগরি বা কমেন্ট ট্রির মতো গভীর কাঠামোর জন্য Zod এর z.lazy() মেথড ব্যবহার করে রিকার্সিভ স্কিমা তৈরি করা হয়, যা টাইপস্ক্রিপ্ট টাইপ সেফটি বজায় রেখে অসীম নেস্টিং যাচাই করতে পারে।",
          "e": "Model self-referential nested data structures (category hierarchies, nested comment trees) via Zod's `z.lazy()`. It defers schema evaluation recursively while preserving complete TypeScript type inference.",
          "code": "type Category = { name: string; children?: Category[] };\nconst CategorySchema: z.ZodType<Category> = z.lazy(() => z.object({\n  name: z.string(),\n  children: z.array(CategorySchema).optional()\n}));"
        },
        {
          "lvl": "situation",
          "q": "প্রোডাকশন সার্ভারে ডিস্ক স্পেস হঠাৎ ১০০% পূর্ণ হয়ে নোড সার্ভার ক্র্যাশ করেছে। তদন্তে দেখা গেল লগ ফাইল ২০GB হয়ে ডিস্ক ফুল করে দিয়েছে। কীভাবে স্থায়ী সমাধান করবে?",
          "m": "সমাধান: (১) কখনোই আনলিমিটেড সাইজের একটি ফাইলে লগ লেখা যাবে না। আমরা `winston-daily-rotate-file` বা Linux Logrotate কনফিগার করব। (২) রোটেশন রুলস: `maxSize: '20m'`, `maxFiles: '14d'`, এবং `zippedArchive: true`। এর ফলে প্রতিদিনের লগ ২০MB হলে অটো স্প্লিট হবে, gzip কম্প্রেস হয়ে সাইজ ৯০% কমে যাবে এবং ১৪ দিন পুরানো হলে স্বয়ংক্রিয়ভাবে মুছে যাবে। (৩) দীর্ঘমেয়াদী সংরক্ষণের জন্য লগ লোকাল ডিস্কে না রেখে সরাসরি ক্লাউড ওয়াচ বা ডেটাডগে স্ট্রিম করব।",
          "b": "ডিস্ক ফুল হওয়া ঠেকাতে winston-daily-rotate-file ব্যবহার করে সর্বোচ্চ সাইজ ২০ মেগাবাইট এবং ১৪ দিন পর অটো-ডিলিট নিয়ম কার্যকর করতে হবে। পুরানো ফাইলগুলো স্বয়ংক্রিয়ভাবে জিপ কম্প্রেস করে রাখতে হবে।",
          "e": "Unbounded log growth exhausts disk inodes. Implement `winston-daily-rotate-file` configured with `maxSize: '20m'`, `maxFiles: '14d'`, and `zippedArchive: true`. In enterprise setups, stream logs directly to cloud log collectors rather than local disks.",
          "code": "new winston.transports.DailyRotateFile({\n  filename: 'application-%DATE%.log',\n  maxSize: '20m',\n  maxFiles: '14d',\n  zippedArchive: true\n});"
        },
        {
          "lvl": "situation",
          "q": "একটি এপিআইতে ক্লায়েন্ট ভুল ডেটা পাঠালে সার্ভার 400 এরর দিচ্ছে কিন্তু মেসেজে লেখা আসছে শুধু `Invalid input`, ফলে ফ্রন্টএন্ড ডেভেলপার বুঝতে পারছে না ঠিক কোন ফিল্ডটি ভুল হয়েছে। কীভাবে প্রফেশনাল এরর রেসপন্স ডিজাইন করবে?",
          "m": "আমরা Zod এরর হ্যান্ডলারকে এমনভাবে ফরম্যাট করব যা স্পষ্ট ফিল্ড-লেভেল এরর ম্যাপিং দেবে: `{ success: false, message: 'ইনপুট ডাটা সঠিক নয়', errors: { email: 'অবশ্যই সঠিক ইমেইল দিতে হবে', age: 'বয়স ন্যূনতম ১৮ হতে হবে' } }`। Zod-এর `error.flatten().fieldErrors` ব্যবহার করে এটি তৈরি করা যায়। এর ফলে ফ্রন্টএন্ড ডেভেলপার এক নজরে বুঝে প্রতিটি ইনপুট ফিল্ডের নিচে নিখুঁত এরর মেসেজ রেন্ডার করতে পারে।",
          "b": "অস্পষ্ট এরর মেসেজের বদলে Zod এর error.flatten().fieldErrors ব্যবহার করে প্রতিটি ফিল্ডের জন্য সুনির্দিষ্ট ভুলের তালিকা তৈরি করে রেসপন্স দিতে হবে, যাতে ফ্রন্টএন্ড ডেভেলপার বা ইউজার তৎক্ষণাৎ ভুল বুঝতে পারে।",
          "e": "Transform raw Zod error arrays into structured dictionary mappings via `err.flatten().fieldErrors`. Emit clean, actionable field-level keys so frontend UI forms can bind validation feedback directly to the erroneous inputs.",
          "code": "const fieldErrors = error.flatten().fieldErrors;\nres.status(400).json({ success: false, message: 'Validation failed', errors: fieldErrors });"
        },
        {
          "lvl": "situation",
          "q": "প্রোডাকশন ড্যাশবোর্ডে মাঝে মাঝে অজ্ঞাত কারণে 500 এরর আসছে কিন্তু সেন্ট্রাল লগে কোনো এরর স্ট্যাক ট্রেস পাওয়া যাচ্ছে না। কারণ কী এবং কীভাবে ট্র্যাক করবে?",
          "m": "কারণ: কোনো অ্যাসিনক্রোনাস ফাংশনে এরর হয়েছিল যা কোনো ক্যাচ ব্লক ছাড়া সাইলেন্টলি রিজেক্ট হয়েছে, অথবা কোনো মিডলওয়্যারে `next(err)` ডাকার বদলে সাধারণ `return` হয়ে গেছে। সমাধান: (১) `process.on('unhandledRejection')` লিসেনার নিশ্চিত করব যা সাইলেন্ট রিজেকশন লগ করবে। (২) এক্সপ্রেসের গ্লোবাল এরর মিডলওয়্যারে প্রতিটি নন-অপারেশনাল এক্সেপশনে সম্পূর্ণ `err.stack` এবং ইনকামিং `req.body`, `req.url`, `req.headers` উইনস্টনে ফোর্সফুলি লগ করব।",
          "b": "স্ট্যাক ট্রেস না পাওয়ার কারণ হতে পারে আনহ্যান্ডেলড প্রমিজ রিজেকশন। unhandledRejection লিসেনার চালু করতে হবে এবং এরর মিডলওয়্যারে স্ট্যাক ট্রেসের সাথে রিকোয়েস্টের ইউআরএল ও বডি বিস্তারিত লগ করতে হবে।",
          "e": "Missing stack traces indicate silent promise swallows or unhandled rejections. Audit code paths for bare empty catch blocks (`catch (e) {}`), wire up `process.on('unhandledRejection')`, and configure the error middleware to persist `err.stack` unconditionally.",
          "code": "process.on('unhandledRejection', (reason: Error) => {\n  logger.error('Unhandled Promise Rejection:', { message: reason.message, stack: reason.stack });\n});"
        },
        {
          "lvl": "situation",
          "q": "একটি এপিআইতে একই সাথে একাধিক ভ্যালিডেশন এরর ঘটলে Zod কি প্রথম এরর পাওয়ার সাথে সাথে থেমে যায় নাকি সব এরর একসাথে রিপোর্ট করে?",
          "m": "Zod বাই-ডিফল্ট কোনো 'Early Exit' করে না; এটি পুরো স্কিমার সব ফিল্ড একসাথে মূল্যায়ন করে এবং যতগুলো ফিল্ডে ভুল আছে সবগুলো এরর একটি একক `ZodError.issues` অ্যারেতে সংগ্রহ করে ফেরত দেয়। এর ফলে ব্যবহারকারীকে প্রতি সাবমিটে মাত্র একটি করে এরর না দেখিয়ে একবারে ফর্মের সব ভুলের পূর্ণাঙ্গ তালিকা দেখানো সম্ভব হয়। তবে কোনো স্পেসিফিক ফিল্ডে চেইন্ড মেথড থাকলে (যেমন `z.string().min(5).email()`) প্রথম চেইনে ফেইল করলে ওই ফিল্ডের পরবর্তী চেইন স্কিপ হয়।",
          "b": "Zod পুরো স্কিমা বিশ্লেষণ করে সব ফিল্ডের এরর একসাথে সংগ্রহ করে দেয়। ফলে ব্যবহারকারী একবারেই তার ফর্মের সমস্ত ভুলের তালিকা দেখতে পায় যা ইউজার ফ্রেন্ডলি ফর্ম হ্যান্ডলিং নিশ্চিত করে।",
          "e": "Zod evaluates all fields across the schema comprehensively, accumulating all violations inside `ZodError.issues` rather than halting upon the first failure. This provides complete form error telemetry in a single round-trip.",
          "tip": "ইন্টারভিউতে 'Comprehensive schema evaluation vs short-circuiting' উল্লেখ করা Zod-এর গভীর জ্ঞানের প্রমাণ।"
        },
        {
          "lvl": "situation",
          "q": "উচ্চগতির এপিআইতে রিকোয়েস্ট লগিংয়ের কারণে এপিআই রেসপন্স টাইম ২০ms বেড়ে গেছে। কীভাবে লগিং অপটিমাইজ করবে?",
          "m": "সমাধান: (১) পিনো (Pino) লগার ব্যবহার করে লগ রাইটিংকে ব্যাকগ্রাউন্ড থ্রেডে অফলোড করব (`pino/file` বা `pino-transport`)। (২) Morgan বা HTTP লগারে শুধুমাত্র ব্যর্থ রিকোয়েস্ট (4xx, 5xx) অথবা যে রিকোয়েস্টগুলো ২০০ms-এর বেশি স্লো সেগুলো লগ করব—সব রুটিন 200 OK রিকোয়েস্ট লগ করার দরকার নেই। (৩) প্রোডাকশনে লগ লেভেল `debug` থেকে বাড়িয়ে `info` বা `warn` করব।",
          "b": "লগিংয়ের ওভারহেড কমাতে পিনো লগার ব্যবহার করে আলাদা থ্রেডে লগ পাঠাতে হবে। রুটিন সফল রিকোয়েস্টের ভারী লগ বাদ দিয়ে কেবল এরর ও অতিরিক্ত স্লো রিকোয়েস্টগুলো বিস্তারিত লগ করলে পারফরম্যান্স স্বাভাবিক থাকে।",
          "e": "High-throughput logging bottlenecks are solved by: (1) Switching to Pino with detached worker thread transports, (2) Elevating log levels from debug to info/warn, (3) Filtering access logs to only record 4xx/5xx failures or queries exceeding high latency thresholds.",
          "code": "app.use(morgan('combined', { skip: (req, res) => res.statusCode < 400 }));"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর ক্যাশ কাউন্টার ব্যাকএন্ডে ইনভয়েস ভ্যালিডেশন ও কাস্টম এরর হ্যান্ডলিং কীভাবে আর্থিক অসংগতি বন্ধ করেছিল?",
          "m": "দোকানি সিস্টেমে আমরা কঠোর Zod স্কিমা দিয়ে নিশ্চিত করেছি: (১) পণ্যের পরিমাণ কখনো শূন্য বা ঋণাত্মক হতে পারবে না (`z.number().positive()`)। (২) ডিসকাউন্ট কখনো সাবটোটালের চেয়ে বেশি হতে পারবে না (`.refine(d => d.discount <= d.subtotal)`। (৩) কাস্টমার পেমেন্ট ও বাকি টাকার হিসাব যেন ১ পয়সাও অমিল না হয়। কোনো নিয়মের ব্যত্যয় ঘটলে আমাদের কাস্টম `FinancialValidationError` ফায়ার হতো এবং লেনদেন সম্পূর্ণ রোলব্যাক হতো। ফলে ক্যাশ কাউন্টারে কোনো অমিল হিসাব তৈরি হয়নি।",
          "b": "দোকানি ক্যাশ কাউন্টারে ঋণাত্মক সংখ্যা বা সাবটোটালের চেয়ে বেশি ডিসকাউন্ট দেওয়া কঠোরভাবে বন্ধ ছিল। কোনো আর্থিক অমিল থাকলে ট্রানজাকশন তৎক্ষণাৎ বাতিল করে রোলব্যাক নিশ্চিত করায় কোনো আর্থিক জালিয়াতি হতে পারেনি।",
          "e": "Prevented accounting disparities in Dokani POS via Zod cross-field refinements guaranteeing line-item quantities were positive, discounts never exceeded gross values, and payments reconciled exactly down to the Poisha.",
          "code": "const InvoiceSchema = z.object({\n  subtotal: z.number().int().positive(),\n  discount: z.number().int().nonnegative(),\n  paidAmount: z.number().int().nonnegative()\n}).refine(d => d.discount <= d.subtotal, 'ডিসকাউন্ট সাবটোটালের চেয়ে বেশি হতে পারে না');"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ শত শত স্টোরের মাল্টি-টেন্যান্ট লগ ফাইল ব্যবস্থাপনা ও সেন্ট্রালাইজড ট্র্যাকিং কীভাবে করেছিলে?",
          "m": "আমরা Winston লগে স্বয়ংক্রিয়ভাবে `tenantId` ইনজেক্ট করার জন্য `AsyncLocalStorage` ব্যবহার করেছি। প্রতিটি লগে `{ tenantId: 'store_123', traceId: 'uuid', level: 'info', message: 'Sale completed' }` মেটাডাটা থাকত। আমরা Grafana Loki ও Promtail দিয়ে লগ সেন্ট্রালাইজ করেছি। কোনো নির্দিষ্ট স্টোর ওনার সমস্যা জানালে আমরা Grafana-তে কুয়েরি করতাম `{app='dokani'} |= 'tenantId=\"store_123\"'`, ফলে নিমেষেই ওই নির্দিষ্ট দোকানের লাইভ ট্রানজাকশন হিস্ট্রি চোখের সামনে চলে আসত।",
          "b": "দোকানি মাল্টি-টেন্যান্ট লগে আমরা AsyncLocalStorage দিয়ে স্বয়ংক্রিয়ভাবে টেন্যান্ট আইডি যুক্ত করেছি। গ্রাফানা লোকির সাহায্যে নির্দিষ্ট দোকানের আইডি দিয়ে সার্চ করে মুহূর্তের মধ্যে যেকোনো ত্রুটি সমাধান করা সম্ভব হয়েছিল।",
          "e": "In Dokani POS, AsyncLocalStorage enriched every Winston log line with tenant context (`tenantId`). Promtail streamed these structured JSON logs to Grafana Loki, allowing on-demand queries filtered by tenantId for rapid customer support.",
          "tip": "মাল্টি-টেন্যান্ট সিস্টেমে লগে টেন্যান্ট আইডি ইনজেকশন করা এন্টারপ্রাইজ মনিটরিংয়ের অন্যতম সেরা উদাহরণ।"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে লাইভ এক্সাম চলাকালীন এপিআই ক্র্যাশ ও এরর অ্যালার্ট রিয়েল-টাইমে টেলিগ্রাম বা স্ল্যাকে পাওয়ার জন্য কী অটোমেশন বানিয়েছিলে?",
          "m": "আমরা Winston-এ একটি কাস্টম 'Alert Webhook Transport' ইন্টিগ্রেট করেছিলাম। যদি প্রোডাকশনে কোনো `5xx Fatal Error` বা ডাটাবেজ কানেকশন ডাউন ঘটে, উইনস্টন সাধারণ ফাইলে লগ করার সাথে সাথে একটি অ্যাসিনক্রোনাস ওয়েবহুক দিয়ে আমাদের ইঞ্জিনিয়ারিং টিমের ডেডিকেটেড Telegram Bot / Slack চ্যানেলে ইনস্ট্যান্ট মেসেজ পুশ করত (এররের সারসংক্ষেপ, ট্রেস আইডি এবং স্ট্যাক সহ)। ফলে ইউজার রিপোর্ট করার আগেই আমাদের টিম ৫ মিনিটের মধ্যে হটফিক্স ডেপ্লয় করতে পারত।",
          "b": "পিটিটিএবিডিতে মারাত্মক কোনো সার্ভার ত্রুটি ঘটলে উইনস্টন স্বয়ংক্রিয়ভাবে টেলিগ্রাম ও স্ল্যাক চ্যানেলে অ্যালার্ট পাঠাত। এর ফলে ব্যবহারকারী জানানোর আগেই আমাদের টিম যেকোনো জটিল ত্রুটির তাৎক্ষণিক সমাধান নিশ্চিত করতে পারত।",
          "e": "Configured a custom Winston transport streaming 5xx critical alarms directly into team Slack/Telegram webhooks with trace IDs and context snippets, enabling mean-time-to-detection (MTTD) under 60 seconds.",
          "code": "const slackTransport = new Transport({\n  log: (info, callback) => {\n    if (info.level === 'error') sendToSlack(info);\n    callback();\n  }\n});"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ বারকোড স্ক্যানিংয়ের সময় ইনভ্যালিড বারকোড বা আনরেজিস্টার্ড প্রোডাক্ট স্ক্যান হলে এপিআই লেয়ারে কীভাবে এরর হ্যান্ডেল করেছিলে?",
          "m": "ক্যাশিয়ার যখন ভুল বা নতুন কোনো বারকোড স্ক্যান করে, আমরা সাধারণ 500 বা জেনেরিক 404 এরর দিতাম না। আমরা একটি স্পেসিফিক `404 ProductNotFound` রেসপন্স দিতাম যার বডিতে থাকত: `{ code: 'PRODUCT_NOT_FOUND', barcode: '123456', canQuickCreate: true }`। এটি দেখে ফ্রন্টএন্ডে সাথে সাথে একটি 'Quick Product Add' পপআপ ভেসে উঠত যাতে ক্যাশিয়ার বিলিং স্ক্রিন ত্যাগ না করেই সাথে সাথে ওই বারকোডে পণ্যের নাম ও দাম বসিয়ে ১ ক্লিকে আইটেম কার্টে যোগ করে নিতে পারত।",
          "b": "ভুল বারকোড স্ক্যান হলে আমরা কাস্টম এরর কোডসহ রেসপন্স পাঠাতাম যা ফ্রন্টএন্ডে কুইক অ্যাড মডাল ওপেন করত। ক্যাশিয়ার বিক্রি বন্ধ না রেখে সাথে সাথে নতুন পণ্যের নাম ও দাম দিয়ে আইটেম কার্টে যোগ করতে পারত।",
          "e": "Unhandled barcodes returned tailored HTTP 404 payloads carrying actionable domain metadata (`{ code: 'PRODUCT_NOT_FOUND', barcode, canQuickAdd: true }`). This instructed the POS UI to launch an inline Quick-Add drawer without halting the checkout flow.",
          "tip": "টেকনিক্যাল এররকে চমৎকার ইউজার এক্সপেরিয়েন্স ও বিজনেস সলিউশনে রূপান্তর করার অসাধারণ উদাহরণ।"
        },
        {
          "lvl": "realworld",
          "q": "API Error Handling এবং Validation-এ এন্টারপ্রাইজ স্কেলে কোড কোয়ালিটি রক্ষার জন্য তোমার স্ট্যান্ডার্ড গাইডলাইন কী?",
          "m": "আমার স্ট্যান্ডার্ড গাইডলাইন: (১) কন্ট্রোলারের এন্ট্রি পয়েন্টে Zod দিয়ে ১০০% ইনপুট কঠোরভাবে ভ্যালিডেট করা। (২) প্রতিটি এররের জন্য সুনির্দিষ্ট HTTP স্ট্যাটাস কোড (RFC 7807) বজায় রাখা। (৩) প্রোডাকশনে কোনো অবস্থায় স্ট্যাক ট্রেস ক্লায়েন্টে না পাঠানো। (৪) প্রতিটি লগে Correlation ID যুক্ত রাখা। (৫) সমস্ত অপ্রত্যাশিত এরর সেন্ট্রালাইজড এরর ট্র্যাপে হ্যান্ডেল করে সার্ভার ক্র্যাশ মুক্ত রাখা।",
          "b": "আমার স্ট্যান্ডার্ড নিয়মে থাকে: শতভাগ Zod ইনপুট ভ্যালিডেশন, সঠিক এইচটিটিপি স্ট্যাটাস কোড, প্রোডাকশনে স্ট্যাক ট্রেস গোপন রাখা, প্রতিটি লগে কোরিলেশন আইডি সংরক্ষণ এবং সেন্ট্রালাইজড এরর ট্র্যাপের সাহায্যে নিরবচ্ছিন্ন সার্ভার আপটাইম নিশ্চিত করা।",
          "e": "My enterprise API standards: (1) 100% schema validation at controllers via Zod, (2) Strict RFC 7807 compliance, (3) Zero stack trace leaks in production, (4) Mandatory Correlation IDs attached to every log, and (5) Resilient centralized error boundaries.",
          "tip": "এই সংক্ষিপ্ত চেকলিস্টটি ইন্টারভিউ কনক্লুশনে বললে তোমার ইঞ্জিনিয়ারিং স্ট্যান্ডার্ড স্পষ্ট ফুটে উঠবে।"
        }
      ]
    },
    {
      "id": "payment-transactions",
      "name": "Payment Gateways & Webhooks",
      "desc": "Payment Integration (bKash, Nagad, Stripe, SSLCommerz), Webhook Architecture, Signature Verification, Idempotency Keys",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Webhook কী এবং ট্র্যাডিশনাল Polling-এর চেয়ে এটি কেন হাজার গুণ দক্ষ?",
          "m": "Polling হলো ক্লায়েন্ট বারবার সার্ভারকে জিজ্ঞাসা করে: 'কোনো নতুন পেমেন্ট এসেছে? এসেছে?'—প্রতি সেকেন্ডে শত শত রিকোয়েস্ট পাঠিয়ে ব্যান্ডউইথ ও সার্ভার রিসোর্স নষ্ট করে। Webhook হলো এর ঠিক উল্টো (Reverse API / Event-driven): ক্লায়েন্টকে বারবার জিজ্ঞাসা করতে হয় না; যখনই কোনো ইভেন্ট ঘটে (যেমন: গ্রাহক bKash বা Stripe-এ সফল পেমেন্ট করল), পেমেন্ট গেটওয়ে সার্ভার নিজে থেকেই আমাদের নির্দিষ্ট ব্যাকএন্ড URL-এ একটি HTTP POST রিকোয়েস্টে ডেটা পাঠিয়ে দেয়। এটি ব্যান্ডউইথ সাশ্রয়ী ও তাৎক্ষণিক।",
          "b": "পোলিংয়ে বারবার এপিআই কল করে খবরাখবর নিতে হয় যা সার্ভারের অপচয় ঘটায়। ওয়েবহুক হলো ইভেন্ট-ড্রিভেন ব্যবস্থা যেখানে কোনো লেনদেন সফল হওয়ামাত্র পেমেন্ট গেটওয়ে নিজে থেকেই আমাদের সার্ভারে ডেটা পুশ করে রিয়েল-টাইম আপডেট দেয়।",
          "e": "Polling periodically asks the server for updates via repeated HTTP calls, wasting bandwidth and IOPS. A Webhook is an event-driven push architecture (Reverse API) where the provider dispatches an immediate HTTP POST payload to our server endpoint the exact moment an event transpires.",
          "tip": "ইন্টারভিউতে 'Event-driven push vs Polling pull overhead' শব্দগুলো ব্যবহার করবে।"
        },
        {
          "lvl": "lvl1",
          "q": "Idempotency (আইডেমপোটেন্সি) কী এবং পেমেন্ট ট্রানজাকশনে Idempotency Key কেন জীবন-মরণ বিষয়?",
          "m": "Idempotency মানে হলো একই অপারেশন একবার রান করা বা ১০ বার রান করার ফলাফল সবসময় একই হওয়া এবং কোনো ডুপ্লিকেট সাইড-ইফেক্ট না ঘটা। পেমেন্ট প্রসেসিংয়ে ইন্টারনেট ড্রপ বা ব্রাউজারের ডাবল-ক্লিকের কারণে একই চার্জ রিকোয়েস্ট দুইবার চলে যেতে পারে। Idempotency Key (একটি ইউনিক UUID) পাঠালে পেমেন্ট গেটওয়ে বা আমাদের ব্যাকএন্ড চেক করে দেখে এই কি-র বিপরীতে লেনদেন আগেই সফল হয়েছে কি না। যদি হয়ে থাকে, তবে দ্বিতীয়বার টাকা না কেটে পূর্বের সফল রেসপন্সটি ফিরিয়ে দেয়। ফলে গ্রাহকের অ্যাকাউন্ট থেকে কখনো ডাবল টাকা কাটে না।",
          "b": "আইডেমপোটেন্সি নিশ্চিত করে যে একটি অ্যাকশন একাধিকবার চালালেও অতিরিক্ত কোনো পরিবর্তন ঘটবে না। পেমেন্ট সিস্টেমে আইডেমপোটেন্সি কি ব্যবহারের ফলে নেটওয়ার্ক সমস্যা বা ডাবল ক্লিকে গ্রাহকের অ্যাকাউন্ট থেকে দুবার টাকা কাটা শতভাগ প্রতিরোধ করা যায়।",
          "e": "An operation is idempotent if executing it multiple times yields the exact same outcome without duplicate side effects. Supplying an `Idempotency-Key` header allows payment gateways to identify retried calls and replay the original response without double-charging the customer.",
          "code": "headers: { 'Idempotency-Key': 'order_123_uuid' }"
        },
        {
          "lvl": "lvl1",
          "q": "Webhook Signature Verification কী এবং এটি কেন বাধ্যতামূলক?",
          "m": "যেহেতু আমাদের ওয়েবহুক এন্ডপয়েন্টটি ইন্টারনেটে উন্মুক্ত থাকে, যেকোনো হ্যাকার নকল পোস্ট রিকোয়েস্ট পাঠিয়ে বলতে পারে: 'অর্ডারটি সফল হয়েছে, প্রোডাক্ট ডেলিভারি দাও'। Signature Verification-এ পেমেন্ট গেটওয়ে (Stripe বা bKash) সিক্রেট কি দিয়ে ইনকামিং পেলোডের একটি ক্রিপ্টোগ্রাফিক হ্যাশ সিগনেচার হেডারে পাঠায় (যেমন `stripe-signature` বা HMAC SHA-256)। আমাদের ব্যাকএন্ড র পেলোড দিয়ে একই হ্যাশ গণনা করে মিলিয়ে দেখে। সিগনেচার না মিললে সাথে সাথে `400 Bad Request` দিয়ে ড্রপ করে দেয়।",
          "b": "যেহেতু ওয়েবহুক ইউআরএল পাবলিক থাকে, যে কেউ ভুয়া পেমেন্টের তথ্য পাঠাতে পারে। সিগনেচার ভেরিফিকেশনের মাধ্যমে ক্রিপ্টোগ্রাফিক হ্যাশ মিলিয়ে নিশ্চিত হওয়া যায় যে রিকোয়েস্টটি সত্যি সত্যিই আসল পেমেন্ট গেটওয়ে থেকেই এসেছে।",
          "e": "Webhook Signature Verification validates that incoming payloads originate authentically from the payment provider and were not forged by attackers. Gateways sign the raw body via an HMAC SHA-256 secret; our server verifies the signature before processing transactions.",
          "code": "const event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);"
        },
        {
          "lvl": "lvl1",
          "q": "bKash Tokenized Checkout এপিআইতে পেমেন্ট সম্পন্ন করতে ৪টি মূল ধাপ কী কী?",
          "m": "bKash Tokenized Checkout-এ ৪টি ধাপ থাকে: (১) `Grant Token`: bKash ক্রেডেনশিয়াল পাঠিয়ে অ্যাপ কী ও সিক্রেট দিয়ে Bearer টোকেন নেওয়া। (২) `Create Payment`: অর্ডারের মোট টাকার অঙ্ক ও ইনভয়েস নম্বর দিয়ে পেমেন্ট ইনিশিয়েট করা (bKash একটি `paymentID` এবং রিডাইরেক্ট ইউআরএল দেয়)। (৩) `User PIN & OTP`: গ্রাহক bKash গেটওয়েতে ওটিপি ও পিন দেয়। (৪) `Execute Payment`: গ্রাহক কনফার্ম করলে আমাদের ব্যাকএন্ড `executePayment` এপিআই কল করে লেনদেন চূড়ান্ত করে এবং ট্রানজাকশন আইডি (`trxID`) সংগ্রহ করে।",
          "b": "বিকাশ পেমেন্টের ৪টি ধাপ হলো: গ্রান্ট টোকেন (অথেনটিকেশন), ক্রিয়েট পেমেন্ট (পেমেন্ট শুরু ও ইউআরএল তৈরি), কাস্টমার ওটিপি/পিন ইনপুট, এবং এক্সিকিউট পেমেন্ট (লেনদেন চূড়ান্ত করে trxID সংগ্রহ)।",
          "e": "bKash Tokenized Checkout follows a 4-step sequence: (1) Grant Token (exchanging credentials for a bearer token), (2) Create Payment (generating paymentID and gateway URL), (3) Customer OTP/PIN authentication on bKash UI, and (4) Execute Payment (server calls execute endpoint to capture funds and receive trxID).",
          "tip": "ইন্টারভিউতে 'Create Payment -> Execute Payment' এই দুই-ধাপের এক্সিকিউশন স্পষ্ট করে বলবে।"
        },
        {
          "lvl": "lvl1",
          "q": "Stripe-এ Payment Intents API এবং Legacy Charge API-এর মধ্যে পার্থক্য কী?",
          "m": "পুরানো Charge API সরাসরি একবারে কার্ড চার্জ করত যা ইউরোপীয় রেগুলেশন Strong Customer Authentication (SCA) ও 3D Secure (OTP) হ্যান্ডেল করতে পারত না। Payment Intents API আধুনিক স্ট্যান্ডার্ড যা পুরো পেমেন্টের লাইফসাইকেল (রিসোর্স তৈরি -> গ্রাহকের ব্যাংকে 3D Secure অথেনটিকেশন -> ফান্ড ক্যাপচার) একটি স্টেট মেশিনের মাধ্যমে ট্র্যাক করে। কোনো কার্ডে অতিরিক্ত ব্যাংক ভেরিফিকেশন লাগলে Payment Intents স্বয়ংক্রিয়ভাবে ফ্রন্টএন্ডে ওটিপি চ্যালেঞ্জ ট্রিগার করতে পারে।",
          "b": "লেগ্যাসি চার্জ এপিআই টু-ফ্যাক্টর বা ওটিপি চ্যালেঞ্জ সামলাতে পারত না। আধুনিক পেমেন্ট ইন্টেন্টস এপিআই স্টেট মেশিনের সাহায্যে ব্যাংক অথেনটিকেশন, থ্রি-ডি সিকিউর পিন এবং সফল পেমেন্ট লাইফসাইকেল নিখুঁতভাবে পরিচালনা করে।",
          "e": "The legacy Charge API lacked native support for multi-step authentication flows required by 3D Secure (SCA). The Payment Intents API dynamically tracks payment states (`requires_action`, `succeeded`), handling 3DS bank challenges natively before charging.",
          "code": "const intent = await stripe.paymentIntents.create({ amount: 1000, currency: 'usd' });"
        },
        {
          "lvl": "lvl2",
          "q": "Webhook হ্যান্ডলারে কেন সবসময় Express-এর `raw-body` (Raw Buffer) প্রয়োজন হয়?",
          "m": "সিগনেচার ভেরিফিকেশনে ক্রিপ্টোগ্রাফিক হ্যাশ মেলানোর জন্য ইনকামিং রিকোয়েস্টের হুবহু প্রতিটি বাইট (Raw Bytes) প্রয়োজন হয়। যদি `express.json()` মিডলওয়্যার আগেই বডিটিকে পার্স করে ফেলে, তবে অতিরিক্ত হোয়াইটস্পেস বা কি-র ক্রম পরিবর্তন হয়ে যায়, যার ফলে সিগনেচার হ্যাশ মিসম্যাচ হয় এবং ভেরিফিকেশন ফেইল করে। তাই ওয়েবহুক রাউটের আগে `express.raw({ type: 'application/json' })` ব্যবহার করে মূল বাফার অক্ষত রাখতে হয়।",
          "b": "ক্রিপ্টোগ্রাফিক সিগনেচার যাচাইয়ে ইনকামিং ডেটার হুবহু কাঁচা বাইট প্রয়োজন হয়। express.json দিয়ে পার্স করলে স্পেস বা ফরম্যাট বদলে গিয়ে সিগনেচার মেলানো ব্যর্থ হয়, তাই express.raw দিয়ে র বাফার ধরে রাখতে হয়।",
          "e": "Cryptographic signature checks evaluate the raw incoming octet stream. If `express.json()` parses the payload first, whitespace normalization or key reordering alters the computed HMAC hash, breaking signature verification. Preserve pristine payloads via `express.raw()`.",
          "code": "app.post('/webhook', express.raw({ type: 'application/json' }), handleWebhook);"
        },
        {
          "lvl": "lvl2",
          "q": "পেমেন্ট গেটওয়ে ইন্টিগ্রেশনে 'Two-Phase Commit' বা 'Authorization & Capture' প্যাটার্ন কীভাবে কাজ করে?",
          "m": "সাধারণ পেমেন্টে সাথে সাথে টাকা কেটে নেওয়া হয় (Sale/Capture)। কিন্তু হোটেল বুকিং বা ই-কমার্স স্টক ভেরিফিকেশনে 'Auth-Capture' প্যাটার্ন ব্যবহার করা হয়। ফেজ ১ (`Authorize`): গেটওয়ে গ্রাহকের কার্ডে নির্দিষ্ট টাকা হোল্ড বা ব্লক করে রাখে (টাকা কাটে না) এবং নিশ্চয়তা দেয় টাকা পর্যাপ্ত আছে। ফেজ ২ (`Capture`): ব্যাকএন্ড যখন পণ্য প্যাক করে ডেলিভারি নিশ্চিত করে, তখন `capture` কল করে চূড়ান্ত টাকা চার্জ করে। কোনো সমস্যা হলে সহজেই `void` করে টাকা রিলিজ করে দেওয়া যায় রিফান্ড ফি ছাড়াই।",
          "b": "অথ-ক্যাপচার প্যাটার্নে প্রথমে টাকা না কেটে গ্রাহকের কার্ডে নির্দিষ্ট পরিমাণ ব্যালেন্স হোল্ড করা হয়। পণ্য ডেলিভারির জন্য প্রস্তুত হলে চূড়ান্ত ক্যাপচার চালিয়ে টাকা কেটে নেওয়া হয়, ফলে অর্ডার ক্যান্সেল হলে কোনো রিফান্ড ঝামেলা থাকে না।",
          "e": "The Authorize & Capture pattern splits settlement: Authorization reserves and freezes funds on the customer's card without charging, guaranteeing solvency. Capture finalizes the settlement once physical inventory or service fulfillment is verified.",
          "code": "const intent = await stripe.paymentIntents.create({ amount: 5000, capture_method: 'manual' });\n// Later upon shipment:\nawait stripe.paymentIntents.capture(intent.id);"
        },
        {
          "lvl": "lvl2",
          "q": "Webhook হ্যান্ডলারে ব্যাকএন্ড থেকে দ্রুত `200 OK` রেসপন্স পাঠানো কেন বাধ্যতামূলক?",
          "m": "পেমেন্ট গেটওয়েগুলো (Stripe, bKash) ওয়েবহুক পাঠানোর পর একটি কঠোর টাইমআউট (সাধারণত ৩ থেকে ৫ সেকেন্ড) অপেক্ষা করে। যদি আমাদের ব্যাকএন্ড ইনভয়েস বানানো, ডাটাবেজ আপডেট ও ইমেইল পাঠাতে ১০ সেকেন্ড সময় নেয়, তবে গেটওয়ে ধরে নেয় সার্ভার ডাউন এবং রিকোয়েস্ট টাইমআউট করে বারবার রিট্রাই পাঠাতে থাকে (ফ্লাডিং)। সমাধান: সিগনেচার ভেরিফাই করেই তৎক্ষণাৎ গেটওয়েকে `res.status(200).send()` পাঠিয়ে কানেকশন রিলিজ করে দেব এবং মূল প্রসেসিং BullMQ ব্যাকগ্রাউন্ড কিউতে পাঠিয়ে দেব।",
          "b": "পেমেন্ট গেটওয়ে ৩ সেকেন্ডের বেশি অপেক্ষা করে না। দেরি হলে গেটওয়ে বারবার ডুপ্লিকেট ওয়েবহুক পাঠায়। তাই সিগনেচার যাচাই করে সাথে সাথে ২০০ ওকে পাঠাতে হয় এবং ভারী ডাটাবেজ কাজগুলো ব্যাকগ্রাউন্ড জব কিউতে সম্পন্ন করতে হয়।",
          "e": "Payment providers enforce strict 3-to-5 second timeout windows. Delays cause the gateway to mark the webhook as failed, repeatedly firing redundant retries. Acknowledge with an immediate HTTP 200 after signature validation, offloading heavy processing to an asynchronous queue.",
          "code": "res.status(200).json({ received: true });\nawait paymentQueue.add('process-payment', event);"
        },
        {
          "lvl": "lvl2",
          "q": "SSLCommerz পেমেন্ট গেটওয়েতে আইপিএন (IPN - Instant Payment Notification) কীভাবে কাজ করে?",
          "m": "গ্রাহক যখন SSLCommerz পেমেন্ট পেজে পেমেন্ট শেষ করে, ব্রাউজার হয়তো রিডাইরেক্ট হয়ে আমাদের সাইটে ফেরে। কিন্তু যদি গ্রাহক ব্রাউজার কেটে দেয় তবে সাকসেস পেজ লোড হবে না। এজন্য SSLCommerz ব্যাকগ্রাউন্ডে আমাদের সার্ভারে একটি IPN (Webhook) পাঠায়। ব্যাকএন্ডে IPN পেলে আমরা SSLCommerz-এর `Order Validation API` কল করে ট্রানজাকশনের ভ্যালিডিটি, কারেন্সি ও টাকার অঙ্ক পুনরায় ভেরিফাই করি। ডেটা ম্যাচ করলেই কেবল ডাটাবেজে অর্ডার পেইড স্ট্যাটাস সেট করি।",
          "b": "আইপিএন হলো ব্যাকগ্রাউন্ড পেমেন্ট নোটিফিকেশন। ব্যবহারকারী ব্রাউজার কেটে দিলেও এসএসএলকমার্স সরাসরি আমাদের সার্ভারে আইপিএন পাঠায়। আমরা অর্ডার ভ্যালিডেশন এপিআই দিয়ে টাকা যাচাই করে তবেই অর্ডার সফল নিশ্চিত করি।",
          "e": "SSLCommerz Instant Payment Notification (IPN) acts as a background webhook. Because user browser redirects can be closed prematurely, the IPN ensures receipt. Upon IPN receipt, the backend calls the SSLCommerz Validation API to verify currency, amount, and transaction status before committing orders.",
          "tip": "কখনোই ব্রাউজারের রিডাইরেক্টের ওপর ভরসা করে অর্ডার পেইড করবে না; সবসময় IPN / Webhook নিশ্চিত করবে।"
        },
        {
          "lvl": "lvl2",
          "q": "Nagad API-এর পাবলিক ও প্রাইভেট কি সিগনেচার ক্রিপ্টোগ্রাফি কীভাবে কাজ করে?",
          "m": "নগদ পেমেন্ট গেটওয়েতে প্রতিটি রিকোয়েস্টে RSA পাবলিক/প্রাইভেট কি ক্রিপ্টোগ্রাফি দিয়ে ডেটা সাইন ও এনক্রিপ্ট করতে হয়। আমাদের সার্ভারের প্রাইভেট কি দিয়ে রিকোয়েস্ট পেলোড সাইন করা হয় এবং নগদের পাবলিক কি দিয়ে এনক্রিপ্ট করে পাঠানো হয়। নগদ যখন রেসপন্স দেয়, তারা তাদের প্রাইভেট কি দিয়ে সাইন করে। আমরা নগদের পাবলিক কি দিয়ে সিগনেচার ভেরিফাই করি। এটি নিশ্চিত করে যে মাঝখানে কেউ ডেটা অল্টার করতে পারেনি (Non-repudiation)।",
          "b": "নগদ এপিআই আরএসএ ক্রিপ্টোগ্রাফি দিয়ে চলে। আমাদের প্রাইভেট কি দিয়ে ডাটা সাইন করে এবং নগদের পাবলিক কি দিয়ে এনক্রিপ্ট করে পাঠানো হয়, যা সর্বোচ্চ স্তরের আর্থিক নিরাপত্তা নিশ্চিত করে।",
          "e": "Nagad uses asymmetric RSA cryptography. Outgoing payloads are signed with our private key and encrypted with Nagad's public key. Incoming callbacks are verified against Nagad's public key, guaranteeing confidentiality and tamper-proof non-repudiation.",
          "code": "const sign = crypto.createSign('SHA256');\nsign.update(JSON.stringify(payload));\nconst signature = sign.sign(privateKey, 'base64');"
        },
        {
          "lvl": "lvl3",
          "q": "Idempotent Webhook Consumer: একই পেমেন্ট ওয়েবহুক ৩ বার এলে ডাটাবেজে ডুপ্লিকেট ব্যালেন্স বা অর্ডার স্টেট তৈরি হওয়া কীভাবে বন্ধ করবে?",
          "m": "সমাধান: (১) ডাটাবেজে একটি `ProcessedWebhook` টেবিল রাখব যেখানে ইউনিক কনস্ট্রেইন্ট থাকবে `eventId` বা `trxId`। (২) যখন ওয়েবহুক আসবে, একটি ডাটাবেজ ট্রানজাকশনের শুরুতে চেক করব: `if (await isProcessed(eventId)) return res.sendStatus(200)`। (৩) অর্ডার টেবিলে স্টেট মেশিন প্যাটার্ন ব্যবহার করব: অর্ডার শুধুমাত্র `PENDING -> PAID` হতে পারবে; যদি অলরেডি `PAID` থাকে তবে কোনো ব্যালেন্স আপডেট হবে না। (৪) ট্রানজাকশনে `ProcessedWebhook` এন্ট্রি সেভ করব। এর ফলে শতবার একই ওয়েবহুক আসলেও কোনো ডুপ্লিকেট সাইড ইফেক্ট ঘটবে না।",
          "b": "একই ওয়েবহুক বারবার আসলে ডুপ্লিকেট রোধ করতে ProcessedWebhook টেবিলে ইভেন্ট আইডি সেভ রাখতে হয়। ইতিমধ্যে প্রসেস করা থাকলে সরাসরি ২০০ ওকে দিয়ে ইগনোর করা হয় এবং অর্ডার অলরেডি পেইড থাকলে কোনো ডুপ্লিকেট টাকা যোগ করা হয় না।",
          "e": "Guard webhook ingestion idempotently via unique constraints on `eventId` inside a `ProcessedWebhooks` table. Evaluate inside an atomic database transaction: if already recorded, exit with 200. Enforce state machines (`PENDING` -> `PAID`), rejecting illegal secondary transitions.",
          "code": "await prisma.$transaction(async (tx) => {\n  const exists = await tx.webhookEvent.findUnique({ where: { eventId } });\n  if (exists) return;\n  await tx.webhookEvent.create({ data: { eventId } });\n  await tx.order.update({ where: { id: orderId }, data: { status: 'PAID' } });\n});"
        },
        {
          "lvl": "lvl3",
          "q": "Payment Reconciliation Engine: গেটওয়ের হিসাবের সাথে আমাদের ডাটাবেজের দৈনিক টাকার অমিল মেলাতে অটোমেটেড রিকনসিলিয়েশন পাইপলাইন কীভাবে বানাবে?",
          "m": "প্রতিদিন মধ্যরাতে একটি ক্রন জব (Cron Job) চলে যা bKash/Stripe থেকে দিনের সমস্ত ট্রানজাকশনের সেটেলমেন্ট রিপোর্ট (CSV/API) ডাউনলোড করে। আমাদের পাইপলাইন প্রতিটি `trxID`, টাকার অঙ্ক এবং ফি মিলিয়ে আমাদের ডাটাবেজের অর্ডারের সাথে তুলনা করে: (১) আমাদের ডাটাবেজে পেইড কিন্তু গেটওয়েতে নেই (Ghost Orders), (২) গেটওয়েতে টাকা কেটেছে কিন্তু আমাদের ডাটাবেজে পেইড হয়নি (Unsettled Customers)। কোনো অমিল থাকলে স্বয়ংক্রিয়ভাবে অডিট ফ্ল্যাগ তৈরি করে ফাইন্যান্স টিমকে রিপোর্ট পাঠানো হয়।",
          "b": "অটোমেটেড রিকনসিলিয়েশন পাইপলাইন প্রতিদিন মধ্যরাতে গেটওয়ের সেটেলমেন্ট স্টেটমেন্টের সাথে ডাটাবেজের প্রতিটি লেনদেন মিলিয়ে দেখে। কোনো টাকার অমিল থাকলে তাৎক্ষণিক অডিট রিপোর্ট তৈরি করে অর্থ সংক্রান্ত ঝুঁকি দূর করে।",
          "e": "An automated reconciliation engine downloads daily settlement settlement ledgers via payment gateway APIs. It executes automated diffing against internal transaction tables, highlighting discrepancies (unsettled gateway captures vs local pending states) in automated finance reports.",
          "tip": "পেমেন্ট গেটওয়েতে রিকনসিলিয়েশন পাইপলাইন থাকার কথা বলা এন্টারপ্রাইজ ফিনটেক দক্ষতার প্রমাণ দেয়।"
        },
        {
          "lvl": "lvl3",
          "q": "Outbox Pattern: পেমেন্ট সফল হওয়ার পর ডাটাবেজ আপডেট এবং ওয়েবহুক ডিসপ্যাচ কীভাবে পারফেক্ট অ্যাটোমিকালি করবে?",
          "m": "যদি ডাটাবেজে পেমেন্ট সেভ হওয়ার ঠিক পর সার্ভার ক্র্যাশ করে এবং মেসেজ ব্রোকার (RabbitMQ) বা ওয়েবহুকে মেসেজ পাঠানো ব্যর্থ হয়, তবে ডেটা ইনকনসিস্টেন্ট হয়ে যায়। Transactional Outbox Pattern-এ মূল ডাটাবেজ ট্রানজাকশনের ভেতরেই অর্ডারের পাশাপাশি একটি `Outbox` টেবিলে ইভেন্ট রেকর্ড সেভ করা হয়। একটি আলাদা ব্যাকগ্রাউন্ড ওয়ার্কার `Outbox` টেবিল থেকে নিশ্চিতভাবে এক একটি ইভেন্ট তুলে মেসেজ ব্রোকারে পুশ করে এবং সফল হলে ডিলিট করে। ফলে ডাটাবেজ ও ইভেন্টের মধ্যে শতভাগ一致তা (Guaranteed Event Delivery) নিশ্চিত হয়।",
          "b": "আউটবক্স প্যাটার্নে মূল ডাটাবেজ ট্রানজাকশনের ভেতরেই ইভেন্ট রেকর্ড সেভ করা হয়। ব্যাকগ্রাউন্ড প্রসেস সেই আউটবক্স টেবিল থেকে মেসেজ ব্রোকারে ইভেন্ট পাঠায়, ফলে সার্ভার ক্র্যাশ করলেও কোনো ইভেন্ট কখনো হারিয়ে যায় না।",
          "e": "The Transactional Outbox pattern writes domain events to an `Outbox` table within the exact same atomic ACID database transaction as the business entity. A polling publisher or Debezium CDC worker consumes the outbox rows, guaranteeing At-Least-Once event delivery.",
          "code": "await prisma.$transaction([\n  prisma.order.update({ where: { id }, data: { status: 'PAID' } }),\n  prisma.outbox.create({ data: { type: 'PAYMENT_CAPTURED', payload } })\n]);"
        },
        {
          "lvl": "lvl3",
          "q": "Payment Webhook Failure-এ Dead Letter Queue (DLQ) এবং Exponential Backoff রিট্রাই মেকানিজম কীভাবে কাজ করে?",
          "m": "যদি কোনো ওয়েবহুক প্রসেসিংয়ের সময় আমাদের অভ্যন্তরীণ ডাটাবেজ সাময়িকভাবে ডাউন থাকে, প্রসেসটি ফেইল করবে। BullMQ কিউতে আমরা Exponential Backoff (১ম বার ৫ সেকেন্ড পর, ২য় বার ৩০ সেকেন্ড, ৩য় বার ৫ মিনিট) দিয়ে রিট্রাই করব। সর্বোচ্চ রিট্রাই সীমা (যেমন ৫ বার) অতিক্রম করার পরেও ফেইল করলে জবটি স্বয়ংক্রিয়ভাবে একটি 'Dead Letter Queue (DLQ)'-তে চলে যাবে। সেখানে সংরক্ষিত ত্রুটিপূর্ণ জবগুলো এলার্ট ট্রিগার করবে এবং ডাটাবেজ সুস্থ হলে ইঞ্জিনিয়াররা ম্যানুয়ালি বা স্ক্রিপ্ট দিয়ে DLQ রি-প্লে করতে পারবে—কোনো পেমেন্ট হারিয়ে যাবে না।",
          "b": "ব্যর্থ ওয়েবহুক বারবার এক্সপোনেনশিয়াল ব্যাকঅফ দিয়ে রিট্রাই করা হয়। তবুও ব্যর্থ হলে জবটি ডেড লেটার কিউতে (DLQ) জমা হয়, যাতে সমস্যা সমাধানের পর পুনরায় কোনো তথ্য না হারিয়ে প্রসেস সম্পন্ন করা যায়।",
          "e": "Failed webhook jobs retry via Exponential Backoff with jitter. Exhausting retry limits directs payloads to a Dead Letter Queue (DLQ). The DLQ isolates poison pills, preserving payloads for manual inspection and bulk replays without clogging primary queues.",
          "code": "const paymentQueue = new Queue('payments', {\n  defaultJobOptions: { attempts: 5, backoff: { type: 'exponential', delay: 5000 } }\n});"
        },
        {
          "lvl": "lvl3",
          "q": "Multi-Currency Dynamic Conversion & Rounding: আন্তর্জাতিক পেমেন্টে (USD to BDT) মুদ্রার হার ওঠানামা ও রাউন্ডিং এরর কীভাবে ম্যানেজ করবে?",
          "m": "সমস্যা: ডলার থেকে টাকায় রূপান্তর করার সময় দশমিকের ফ্র্যাকশনে ক্ষুদ্র ক্ষুদ্র ভগ্নাংশ হারিয়ে লাখ টাকার ট্রানজাকশনে বড় অমিল দেখা দেয়। সমাধান: (১) চেকআউট ইনিশিয়েট হওয়ার সময় একটি 'Locked Exchange Rate' টাইমস্ট্যাম্প সহ সেভ করব (১৫ মিনিটের জন্য লকড)। (২) সমস্ত ক্যালকুলেশনে বড় পূর্ণসংখ্যা (ইনটিজার সেন্ট ও পয়সা) ব্যবহার করব। (৩) রাউন্ডিংয়ের জন্য ব্যাংকার্স অ্যালগরিদম (Half to Even) অথবা `decimal.js` ব্যবহার করব। ফলে সেন্ট ও পয়সার নিখুঁত সমতা বজায় থাকে।",
          "b": "মুদ্রা রূপান্তরের সময় ১৫ মিনিটের জন্য লকড এক্সচেঞ্জ রেট ব্যবহার করতে হবে। সব হিসাব পয়সায় পূর্ণসংখ্যায় সম্পন্ন করতে হবে এবং ব্যাংকার্স অ্যালগরিদম ব্যবহারের মাধ্যমে কোনো ভগ্নাংশ অপচয় ছাড়াই আন্তর্জাতিক পেমেন্ট সমন্বয় নিশ্চিত করতে হবে।",
          "e": "Manage multi-currency volatility by locking real-time exchange rates for a guaranteed 15-minute checkout window. Perform rounding using Banker's Rounding (Round-Half-to-Even) via arbitrary-precision libraries (decimal.js) over smallest integer units to prevent fractional drifts.",
          "tip": "ফিনটেকে 'Banker's Rounding' এবং 'Locked Exchange Rate Window' উল্লেখ করা উচ্চমানের ব্যাংকিং ডোমেন নলেজ প্রকাশ করে।"
        },
        {
          "lvl": "situation",
          "q": "গ্রাহকের অ্যাকাউন্ট থেকে bKash-এ টাকা কেটে নিয়েছে কিন্তু আমাদের সার্ভারে কোনো ওয়েবহুক আসেনি বা নেটওয়ার্ক ফেইল করেছিল। গ্রাহক স্ক্রিনে 'পেমেন্ট পেন্ডিং' দেখে অভিযোগ করছে। কীভাবে স্বয়ংক্রিয়ভাবে এটি রিকভার করবে?",
          "m": "সমাধান: (১) আমরা কখনোই শুধু ওয়েবহুকের ওপর ১০০% অন্ধ নির্ভর করব না। (২) ব্যাকএন্ডে একটি 'Payment Auto-Query Cron Job' প্রতি ২ মিনিট পর পর চলবে যা গত ৩০ মিনিটের সব `PENDING` অর্ডার খুঁজে বের করবে। (৩) bKash-এর `queryPayment(paymentID)` এপিআই কল করে গেটওয়েতে স্ট্যাটাস চেক করবে। যদি bKash বলে পেমেন্ট সফল, ব্যাকএন্ড স্বয়ংক্রিয়ভাবে ডাটাবেজে অর্ডারকে `PAID` করবে, স্টক কমাবে এবং গ্রাহককে কনফার্মেশন এসএমএস পাঠাবে। গ্রাহকের অভিযোগের আগেই সিস্টেম নিজে থেকে সমাধান করে ফেলবে।",
          "b": "ওয়েবহুক মিস হলে আমাদের ব্যাকগ্রাউন্ড অটো-কুয়েরি ক্রন জব প্রতি ২ মিনিটে পেন্ডিং অর্ডারের জন্য bKash queryPayment এপিআই কল করে। পেমেন্ট সফল পেলে স্বয়ংক্রিয়ভাবে অর্ডার কনফার্ম করে সমাধান নিশ্চিত করে।",
          "e": "Mitigate dropped webhooks via an automated polling fallback cron running every 2 minutes. The cron queries pending orders against the provider's `queryPayment` status endpoint, automatically capturing missed transactions and transitioning orders to `PAID`.",
          "code": "const res = await bkashApi.queryPayment(order.bkashPaymentId);\nif (res.transactionStatus === 'Completed') await markOrderPaid(order.id, res.trxID);"
        },
        {
          "lvl": "situation",
          "q": "একজন ব্যবহারকারী পেমেন্ট গেটওয়েতে গিয়ে ১৫ মিনিট পর পিন দিল, কিন্তু ইতিমধ্যে আমাদের ইনভেন্টরির স্টক অন্য একজন কাস্টমার কিনে শেষ করে ফেলেছে (Stock Out)। কীভাবে ফিক্স করবে?",
          "m": "সমাধান: (১) চেকআউট শুরু হওয়ার সময় আমরা ১৫ মিনিটের জন্য একটি 'Inventory Soft Lock' (Redis Reservation) তৈরি করব যা স্টক রিজার্ভ করে রাখবে। (২) ১৫ মিনিট পার হলে লক স্বয়ংক্রিয়ভাবে মুক্ত হয়ে যাবে। (৩) যদি স্টক শেষ হয়ে যায় এবং গ্রাহক তার পরে পেমেন্ট সফল করে, আমাদের ব্যাকএন্ড সাথে সাথে একটি 'Auto Refund' ট্রিগার করবে (`refundPayment(trxID)`) এবং গ্রাহককে নোটিফাই করবে যে স্টক শেষ হওয়ায় টাকা স্বয়ংক্রিয়ভাবে তার অ্যাকাউন্টে ফেরত পাঠানো হয়েছে।",
          "b": "চেকআউটের সময় ১৫ মিনিটের জন্য রেডিসে স্টক রিজার্ভ রাখতে হবে। স্টক ফুরিয়ে যাওয়ার পর পেমেন্ট আসলে ব্যাকএন্ড সাথে সাথে অটো-রিফান্ড এপিআই কল করে গ্রাহকের টাকা ফেরত দিয়ে দেবে।",
          "e": "Implement ephemeral Inventory Reservations in Redis expiring after 15 minutes. If a race condition circumvents the reservation, the backend catches the stock deficit upon capture and immediately dispatches an automated programmatic refund via gateway refund APIs.",
          "code": "await bkashApi.refundTransaction({ paymentID, trxID, amount, reason: 'Stock Out' });"
        },
        {
          "lvl": "situation",
          "q": "প্রোডাকশন পেমেন্ট ওয়েবহুক এন্ডপয়েন্টে হঠাৎ একযোগে প্রতি মিনিটে ২০ হাজার ফেক রিকোয়েস্ট আসছে। কীভাবে সার্ভারকে সুরক্ষিত রাখবে?",
          "m": "সমাধান: (১) ওয়েবহুক রিকোয়েস্টের সোর্স আইপি চেক করব: Stripe বা bKash-এর অফিসিয়াল আইপি রেঞ্জের বাইরে থেকে আসা সব রিকোয়েস্ট Cloudflare WAF লেভেলে সাথে সাথে ড্রপ করে দেব। (২) আমাদের নোড সার্ভার পর্যন্ত যে রিকোয়েস্টগুলো আসবে, সবার প্রথমে সিগনেচার হ্যাশ ভ্যালিডেট করব। সিগনেচার ইনভ্যালিড হওয়া মাত্র `401/400` দিয়ে সাথে সাথে কানেকশন ক্লোজ করব—কোনো ডাটাবেজ কোয়েরি চালাব না। (৩) ইনকামিং রিকোয়েস্ট প্রসেসিংকে BullMQ কিউতে দেব যাতে ডাটাবেজ ওভারলোড না হয়।",
          "b": "ক্লাউডফ্লেয়ার ডব্লিউএএফ (WAF) লেভেলে পেমেন্ট গেটওয়ের নির্দিষ্ট আইপি ছাড়া বাকি সব আইপি ব্লক করতে হবে। সার্ভারে সিগনেচার না মিললে ডাটাবেজে হাত না দিয়ে সাথে সাথে রিকোয়েস্ট ড্রপ করতে হবে।",
          "e": "Whitelist payment provider IP CIDR blocks at the Cloudflare edge WAF, terminating spoofed traffic immediately. At the application layer, reject unverified signatures before touching database pools, isolating valid webhooks into BullMQ.",
          "tip": "ক্লাউডফ্লেয়ারে গেটওয়ের অফিশিয়াল আইপি হোয়াইটলিস্ট করার কথা বলা ইন্ডাস্ট্রিয়াল সিকিউরিটি প্র্যাকটিস।"
        },
        {
          "lvl": "situation",
          "q": "একজন গ্রাহক পেমেন্ট কমপ্লিট হওয়ার পর ব্যাক বাটন চেপে আবার চেকআউট পেজে গিয়ে পুনরায় সাবমিট বাটনে ক্লিক করল। পেমেন্ট গেটওয়েতে ডুপ্লিকেট চার্জ কীভাবে আটকাবে?",
          "m": "সমাধান: (১) ফ্রন্টএন্ডে পেমেন্ট সফল হওয়ার পর সাথে সাথে কার্ট ক্লিয়ার এবং সফল ইনভয়েস পেজে রিডাইরেক্ট করে চেকআউট সেশন ধ্বংস করব। (২) ব্যাকএন্ডে চেকআউটের একটি ইউনিক `orderId` ভিত্তিক Idempotency Key পেমেন্ট গেটওয়েতে পাঠাব। (৩) যদি গেটওয়ে দেখে এই অর্ডারের জন্য ইতিমধ্যেই ট্রানজাকশন সম্পন্ন হয়েছে, তবে এটি নতুন চার্জ তৈরি না করে সরাসরি পূর্বের সফল চার্জ অবজেক্ট ফেরত দেবে।",
          "b": "অর্ডার আইডি ভিত্তিক Idempotency Key পাঠানোর কারণে গেটওয়ে দ্বিতীয়বার চার্জ না করে আগের সফল রেজাল্ট ফিরিয়ে দেয়। ফ্রন্টএন্ডে সেশন রিসেট করে সফল পেজে রিডাইরেক্ট করা নিশ্চিত করতে হবে।",
          "e": "Pass deterministic Idempotency Keys composed of the immutable `orderId` to the gateway. If retried, gateways return cached payment receipts without initiating redundant debits. Clear client cart sessions upon receipt of positive signals.",
          "code": "const payment = await stripe.paymentIntents.create(params, { idempotencyKey: `order_${order.id}` });"
        },
        {
          "lvl": "situation",
          "q": "পেমেন্ট গেটওয়ের লাইভ প্রোডাকশন ডাউনটাইমের কারণে সমস্ত কাস্টমার পেমেন্ট ফেইল করছে। কীভাবে ব্যবসায়িক ক্ষতি কমাবে এবং অল্টারনেট গেটওয়েতে ট্রাফিক রাউট করবে?",
          "m": "সমাধান: আমরা 'Smart Payment Routing & Failover' আর্কিটেকচার রাখব। আমাদের সিস্টেমে একাধিক গেটওয়ে (যেমন bKash, Nagad, SSLCommerz) ইন্টিগ্রেট থাকবে। যদি প্রাইমারি গেটওয়ে পরপর ৫ বার টাইমআউট বা 5xx দেয়, আমাদের সার্কিট ব্রেকার স্বয়ংক্রিয়ভাবে প্রাইমারি অপশনকে ব্যাকগ্রাউন্ডে সরিয়ে অল্টারনেট গেটওয়েকে (যেমন Nagad বা SSLCommerz) ডিফল্ট হিসেবে সাজেস্ট করবে এবং ব্যবহারকারীকে পরিষ্কার ব্যানার দেখাবে: 'বিকাশ গেটওয়েতে সাময়িক মেইনটেন্যান্স চলছে, অনুগ্রহ করে নগদ বা কার্ড দিয়ে পেমেন্ট সম্পন্ন করুন'।",
          "b": "স্মার্ট পেমেন্ট রাউটিংয়ের মাধ্যমে একটি গেটওয়ে ডাউন হলে সার্কিট ব্রেকার স্বয়ংক্রিয়ভাবে বিকল্প গেটওয়ে (যেমন নগদ বা কার্ড) সামনে নিয়ে আসবে যাতে বিক্রি বন্ধ না হয়ে ব্যবসা সচল থাকে।",
          "e": "Implement Smart Payment Fallback via Circuit Breakers. If the primary gateway breaches error rate thresholds, the system automatically surfaces alternative rails (e.g. falling back from bKash to Nagad/SSLCommerz), alerting users to ongoing provider outages.",
          "tip": "স্মার্ট পেমেন্ট রাউটিং ও ফেইলওভার হলো বড় বড় ই-কমার্স ও ফিনটেকের মূল আর্কিটেকচার।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ খুচরা দোকানের ক্যাশ কাউন্টারে bKash Dynamic QR Code পেমেন্ট কীভাবে ইন্টিগ্রেট করেছিলে?",
          "m": "দোকানি ক্যাশ কাউন্টারে আমরা bKash Dynamic QR কোড তৈরি করেছিলাম: ইনভয়েসের মোট টাকার অঙ্ক (`amount`) এবং ইনভয়েস আইডি দিয়ে ব্যাকএন্ড bKash Merchant API কল করে একটি ডায়নামিক কিউআর ডাটা পেত। ফ্রন্টএন্ড কাউন্টার স্ক্রিনে সেই কিউআর কোডটি রেন্ডার হতো। গ্রাহক তার bKash অ্যাপ দিয়ে কিউআর স্ক্যান করে পিন দেওয়া মাত্র ব্যাকগ্রাউন্ডে bKash Webhook আমাদের সার্ভারে হিট করত। সাথে সাথে ক্যাশ কাউন্টার স্ক্রিন গ্রিন টিক দেখাত এবং থার্মাল প্রিন্টার থেকে অটোমেটিক ক্যাশ মেমো বের হয়ে আসত।",
          "b": "দোকানি পিওএসে আমরা ডায়নামিক বিকাশ কিউআর কোড তৈরি করেছিলাম। গ্রাহক নিজের বিকাশ অ্যাপ দিয়ে স্ক্যান করে টাকা দিলে ওয়েবহুকের মাধ্যমে সাথে সাথে ক্যাশ কাউন্টারে পেমেন্ট নিশ্চিত হয়ে স্বয়ংক্রিয় রসিদ প্রিন্ট হতো।",
          "e": "Engineered bKash Dynamic QR payments for Dokani POS registers: the backend requested dynamic QR payloads embedding specific invoice amounts. When customers scanned and paid via mobile app, bKash webhooks triggered real-time socket confirmation and thermal receipt printing.",
          "tip": "ডায়নামিক কিউআর কোড ভিত্তিক রিয়েল-টাইম রিটেইল পেমেন্ট অত্যন্ত আকর্ষণীয় ও বাস্তব প্রজেক্ট উদাহরণ।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ শত শত সাবস্ক্রিপশন প্ল্যান বিলিংয়ের জন্য Recurring Billing ও Auto-Debit কীভাবে আর্কিটেক্ট করেছিলে?",
          "m": "দোকানি SaaS-এর মাসিক ফি কাটার জন্য আমরা bKash Agreement API এবং Stripe Subscriptions ব্যবহার করেছি। দোকান মালিক প্রথমবার সাইন-আপের সময় একবারের জন্য একটি 'Payment Agreement / Token' অথোরাইজ করত। প্রতি মাসের ১ তারিখে আমাদের ব্যাকগ্রাউন্ড ক্রন জব Stripe Billing বা bKash Tokenized recurring charge এপিআই কল করে স্বয়ংক্রিয়ভাবে সাবস্ক্রিপশন ফি কেটে নিত এবং ইনভয়েস পিডিএফ দোকানদারের ইমেইলে পাঠিয়ে দিত। কোনো পেমেন্ট ফেইল হলে ৩ দিনের গ্রেস পিরিয়ড সহ অটো-রিট্রাই হতো।",
          "b": "দোকানি মাসিক ফির জন্য bKash Agreement এবং Stripe সাবস্ক্রিপশন ব্যবহার করা হয়েছিল। প্রতি মাসের শুরুতে ক্রন জবের মাধ্যমে স্বয়ংক্রিয়ভাবে ফি কেটে নেওয়া হতো এবং ফেইল করলে ৩ দিনের গ্রেস পিরিয়ড দেওয়া হতো।",
          "e": "Implemented recurring SaaS billing in Dokani via bKash Agreement Tokenization and Stripe Subscriptions. Monthly cron workers invoked recurring charge tokens automatically, emailing invoices upon capture and managing dunning flows during payment failures.",
          "code": "await bkashApi.createAgreementPayment({ agreementID, amount: 999, invoiceNo });"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে কোর্স কেনার সাথে সাথে পেমেন্ট গেটওয়ে ফি (Payment Gateway Commission) ও ভ্যাট কেটে নেট প্রফিট লেজার হিসাব কীভাবে করেছিলে?",
          "m": "যখন একজন ছাত্র ৩০০০ টাকার কোর্স কিনত, গেটওয়ে (SSLCommerz বা bKash) ২.৫% ফি কেটে নিত। আমাদের ব্যাকগ্রাউন্ড ফিন্যান্সিয়াল সার্ভিসে আমরা ৩টি লেজার এন্ট্রি তৈরি করতাম একটি সিঙ্গেল ACID ট্রানজাকশনে: (১) মোট সেলস রেভিনিউ: +৩০০০ টাকা, (২) গেটওয়ে প্রসেসিং ফি এক্সপেন্স: -৭৫ টাকা, (৩) গভমেন্ট ভ্যাট লায়াবিলিটি: -১৫০ টাকা, (৪) নেট লার্নিং প্ল্যাটফর্ম আর্নিং: +২৭৭৫ টাকা। এর ফলে কোনো লুকায়িত অমিল ছাড়াই অ্যাকাউন্টস অডিট শতভাগ স্বচ্ছ ছিল।",
          "b": "পিটিটিএবিডিতে পেমেন্ট সফল হওয়ার সাথে সাথে অ্যাসিড ট্রানজাকশনের মাধ্যমে মোট আয়, গেটওয়ে ফি এবং ভ্যাট কেটে পৃথক লেজার এন্ট্রি তৈরি করা হতো, যা কোম্পানির আর্থিক অডিটকে শতভাগ স্বচ্ছ রেখেছিল।",
          "e": "Automated multi-entry bookkeeping for PTTABD course purchases inside an atomic ACID transaction: crediting Gross Revenue, debiting Gateway Surcharges (2.5%), debiting VAT, and crediting Net Platform Retained Earnings with zero float discrepancies.",
          "tip": "পেমেন্ট গেটওয়ের ২.৫% ফি ও ট্যাক্স হিসাব করে নেট প্রফিট লেজার এন্ট্রি দেখানো সিনিয়র ইঞ্জিনিয়ারিং অ্যাকাউন্টিংয়ের চূড়ান্ত নমুনা।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ পেমেন্ট রিফান্ড (Full Refund & Partial Refund) প্রসেসিং কীভাবে ডাটাবেজ এবং পেমেন্ট গেটওয়েতে সমন্বয় করেছিলে?",
          "m": "গ্রাহক কোনো পণ্য ফেরত দিলে আমরা গেটওয়ে এপিআইতে রিফান্ড কল করতাম (`refundPayment({ paymentID, trxID, amount, sku })`। গেটওয়ে সফল হলে আমরা আমাদের ডাটাবেজে: (১) ইনভয়েস টেবিলে `REFUNDED` বা `PARTIALLY_REFUNDED` স্ট্যাটাস দিতাম, (২) ইনভেন্টরিতে পণ্যের স্টক স্বয়ংক্রিয়ভাবে ১ বাড়িয়ে রিস্টোর করতাম, (৩) কাস্টমার লেজারে রিফান্ড ক্রেডিট এন্ট্রি দিতাম। পুরো অপারেশনটি একটি ট্রানজাকশনে হতো যাতে গেটওয়ে রিফান্ড ফেইল করলে ডাটাবেজে স্টক বৃদ্ধি না পায়।",
          "b": "পণ্য ফেরত দেওয়ার সময় আমরা গেটওয়েতে রিফান্ড রিকোয়েস্ট পাঠিয়ে সফল হলে ডাটাবেজে স্টক ফিরিয়ে নিতাম এবং কাস্টমার লেজার আপডেট করতাম। ট্রানজাকশন ব্যবহারের ফলে গেটওয়ে রিফান্ড সফল না হলে লোকাল ডাটাবেজে কোনো পরিবর্তন হতো না।",
          "e": "Synchronized refunds in Dokani POS by invoking gateway refund APIs before updating persistence states. Upon success, an atomic transaction updated invoice statuses, replenished inventory balances, and debited sales ledgers.",
          "code": "const refundRes = await stripe.refunds.create({ payment_intent: intentId, amount: 500 });\nawait db.inventory.incrementStock(sku, 1);"
        },
        {
          "lvl": "realworld",
          "q": "পেমেন্ট ট্রানজাকশন সম্পর্কিত নিরাপত্তা ও কমপ্লায়েন্স বজায় রাখার জন্য তোমার শীর্ষ আর্কিটেকচারাল প্রিন্সিপালগুলো কী?",
          "m": "আমার শীর্ষ ৫টি প্রিন্সিপাল: (১) PCI-DSS কমপ্লায়েন্স: কখনোই কাঁচা ক্রেডিট কার্ড নম্বর আমাদের সার্ভারে টাচ বা সেভ করব না; সবসময় টোকেনাইজেশন ব্যবহার করব। (২) প্রতিটি ট্রানজাকশনে Idempotency Key বাধ্যতামূলক। (৩) প্রতিটি ওয়েবহুকে ক্রিপ্টোগ্রাফিক সিগনেচার ভেরিফিকেশন ও র বাফার নিশ্চিত করা। (৪) ড্রপড ওয়েবহুক সামলাতে ব্যাকগ্রাউন্ড অটো-কুয়েরি ফলব্যাক রাখা। (৫) সমস্ত পেমেন্ট ডেটা ডাটাবেজে ACID ট্রানজাকশন ও অডিট লগ সহ সেভ করা।",
          "b": "আমার শীর্ষ ৫টি নিয়ম: কার্ড নম্বর কখনো সার্ভারে স্পর্শ না করে টোকেন ব্যবহার, বাধ্যতামূলক আইডেমপোটেন্সি কি, ওয়েবহুক সিগনেচার ভেরিফিকেশন, ব্যাকগ্রাউন্ড অটো-কুয়েরি ফলব্যাক এবং প্রতিটি পেমেন্টের জন্য অপরিবর্তনীয় অডিট লগ সংরক্ষণ।",
          "e": "My core payment architectural tenets: (1) Absolute PCI-DSS compliance via client-side tokenization (zero raw PANs on server), (2) Mandatory Idempotency Keys on all mutating endpoints, (3) Cryptographic raw-body HMAC webhook signature checks, (4) Scheduled reconciliation polling to heal dropped webhooks, and (5) Strict ACID transaction boundaries with immutable audit logs.",
          "tip": "এই ৫টি প্রিন্সিপাল দিয়ে উত্তর শেষ করলে ইন্টারভিউয়ার নিশ্চিত হবে যে তোমার ফিনটেক ও পেমেন্ট সিকিউরিটি নলেজ প্রফেশনাল গ্রেডের।"
        }
      ]
    },
    {
      "id": "backend-db-transactions",
      "name": "Backend DB Design, Relations & Transactions",
      "desc": "Relational Schema, Table Relationships (1:1, 1:N, M:N), Prisma Client, ACID Transactions, Row Locking, MongoDB Integration",
      "items": [
        {
          "lvl": "lvl1",
          "q": "ACID Properties (Atomicity, Consistency, Isolation, Durability) ব্যাকএন্ড ট্রানজাকশনে কেন অত্যাবশ্যক?",
          "m": "ACID হলো ডাটাবেজ লেনদেনের ৪টি নির্ভরযোগ্যতার স্তম্ভ: (১) `Atomicity`: 'All or Nothing'—সবগুলো অপারেশন সফল হবে অথবা একটি ফেইল করলে পুরো ট্রানজাকশন রোলব্যাক হবে (অর্ধেক টাকা কেটে অর্ডার ফেইল হওয়া বন্ধ করে)। (২) `Consistency`: ডাটাবেজের সমস্ত কনস্ট্রেইন্ট ও নিয়ম সর্বদা বজায় থাকে। (৩) `Isolation`: একাধিক ব্যবহারকারীর লেনদেন একে অপরকে বিঘ্নিত না করে নিরাপদে একযোগে চলে। (৪) `Durability`: লেনদেন সফল হয়ে একবার কমিট হলে সার্ভার ক্র্যাশ বা বিদ্যুৎ চলে গেলেও ডেটা কখনোই হারাবে না।",
          "b": "অ্যাসিড প্রপার্টিজ ডাটাবেজের বিশ্বস্ততা রক্ষা করে: অ্যাটোমিসিটি (হয় সব হবে নয়তো কিছুই হবে না), কনসিস্টেন্সি (নিয়ম ও শর্তের অবিচলতা), আইসোলেশন (এক লেনদেন অন্যটিকে প্রভাবিত করবে না), এবং ডিউরেবিলিটি (কমিট হওয়া ডাটা স্থায়ীভাবে টিকে থাকবে)।",
          "e": "ACID guarantees transactional integrity: Atomicity enforces all-or-nothing completion, Consistency maintains database invariants, Isolation shields concurrent transactions from interfering, and Durability guarantees committed transactions survive server crashes.",
          "tip": "ইন্টারভিউতে ব্যাংকিং বা ইনভয়েসের উদাহরণের মাধ্যমে ACID ব্যাখ্যা করবে।"
        },
        {
          "lvl": "lvl1",
          "q": "Relational Database-এ ৩ ধরনের রিলেশনশিপ (One-to-One, One-to-Many, Many-to-Many) ব্যাকএন্ডে কীভাবে মডেল করা হয়?",
          "m": "(১) `One-to-One (1:1)`: একজন ইউজারের একটি প্রফাইল—প্রফাইল টেবিলে `userId` থাকে Unique Foreign Key হিসেবে। (২) `One-to-Many (1:N)`: একজন স্টোর ওনারের শত শত প্রোডাক্ট—প্রোডাক্ট টেবিলে `storeId` Foreign Key হিসেবে থাকে। (৩) `Many-to-Many (M:N)`: একজন স্টুডেন্ট একাধিক কোর্সে এনরোল করে এবং একটি কোর্সে শত শত স্টুডেন্ট থাকে—এখানে মাঝখানে একটি 'Junction / Pivot Table' (`Enrollment`) থাকে যাতে `studentId` এবং `courseId` দুটি কম্পোজিট ফরেন কি হিসেবে থাকে। Prisma ORM-এ এটি স্বয়ংক্রিয়ভাবে হ্যান্ডেল হয়।",
          "b": "১:১ রিলেশনে ইউনিক ফরেন কি থাকে (ইউজার-প্রোফাইল), ১:এন রিলেশনে চাইল্ড টেবিলে প্যারেন্টের ফরেন কি থাকে (স্টোর-প্রোডাক্ট), এবং এম:এন রিলেশনে মাঝখানে একটি জংশন টেবিল ব্যবহার করে উভয় মডেলের ফরেন কি যুক্ত করা হয় (স্টুডেন্ট-কোর্স)।",
          "e": "1:1 relations place a unique foreign key on the dependent entity. 1:N relations place a non-unique foreign key on the child pointing to the parent. M:N relations introduce a junction (pivot) table containing dual foreign keys.",
          "code": "// Prisma M:N Junction:\nmodel StudentOnCourse {\n  studentId String\n  courseId  String\n  student   Student @relation(fields: [studentId], references: [id])\n  course    Course  @relation(fields: [courseId], references: [id])\n  @@id([studentId, courseId])\n}"
        },
        {
          "lvl": "lvl1",
          "q": "Prisma ORM-এ `$transaction()` এপিআই কীভাবে কাজ করে এবং Sequential vs Interactive Transactions-এর পার্থক্য কী?",
          "m": "Prisma-তে দুটি পদ্ধতি রয়েছে: (১) `Sequential Transaction`: একাধিক স্বাধীন Prisma অপারেশনকে একটি অ্যারে হিসেবে পাস করা (`prisma.$transaction([op1, op2])`। এটি খুব দ্রুত চলে কারণ ডাটাবেজে রাউন্ড-ট্রিপ কম হয়। (২) `Interactive Transaction`: একটি অ্যাসিনক্রোনাস কলব্যাক ফাংশন গ্রহণ করে (`prisma.$transaction(async (tx) => ...)`। এটি ব্যবহৃত হয় যখন ২য় অপারেশনের ডেটা ১ম অপারেশনের ফলাফলের ওপর নির্ভর করে (যেমন: ব্যালেন্স চেক করে তারপর টাকা কাটা)। কলব্যাকের ভেতর কোনো এরর থ্রো হলে পুরো ট্রানজাকশন স্বয়ংক্রিয়ভাবে রোলব্যাক হয়।",
          "b": "প্রিজমা ট্রানজাকশনে অ্যারে পাস করলে সব অপারেশন একসাথে কার্যকর হয় (সিকোয়েন্সিয়াল)। ইন্টারেক্টিভ ট্রানজাকশনে অ্যাসিনক্রোনাস কলব্যাকের ভেতরে আগের ডেটার ওপর ভিত্তি করে পরবর্তী সিদ্ধান্ত নেওয়া যায় এবং ত্রুটি হলে সব পরিবর্তন রোলব্যাক হয়ে যায়।",
          "e": "Sequential transactions pass an array of operations (`prisma.$transaction([opA, opB])`), batching them over a single round-trip. Interactive transactions (`prisma.$transaction(async (tx) => ...)`) supply an isolated transaction client (`tx`) to perform interdependent mutations with rollback guarantees.",
          "code": "await prisma.$transaction(async (tx) => {\n  const user = await tx.user.update({ where: { id }, data: { balance: { decrement: 100 } } });\n  if (user.balance < 0) throw new Error('Insufficient funds');\n  await tx.ledger.create({ data: { userId: id, amount: 100 } });\n});"
        },
        {
          "lvl": "lvl1",
          "q": "SQL Database (PostgreSQL) বনাম NoSQL Database (MongoDB)-এর মধ্যে ব্যাকএন্ড আর্কিটেকচারে নির্বাচনের মাপকাঠি কী?",
          "m": "নির্বাচনের মূল মাপকাঠি: (১) `PostgreSQL (SQL)`: যখন ডেটা অত্যন্ত স্ট্রাকচার্ড, টেবিলগুলোর মধ্যে জটিল রিলেশনশিপ রয়েছে, এবং আর্থিক বা ট্রানজাকশনাল নির্ভুলতা (ACID) জীবন-মরণ বিষয় (যেমন Dokani POS বা ব্যাংকিং)। (২) `MongoDB (NoSQL)`: যখন ডেটা স্কিমা ঘন ঘন পরিবর্তিত হয় (Unstructured / Semi-structured), ডেটা ডায়নামিকালি নেস্টেড ডকুমেন্ট আকারে থাকে (যেমন ক্যাটালগ প্রপার্টিজ বা ইভেন্ট লগ) এবং হরিজোন্টাল পার্টিশনিং বা শার্ডিং খুব সহজে স্কেল করা প্রয়োজন।",
          "b": "আর্থিক লেনদেন, কঠোর স্কিমা ও রিলেশনাল ডেটার জন্য পোস্টগ্রেসকিউএল সেরা পছন্দ। ঘন ঘন পরিবর্তনশীল কাঠামো, বিশাল ক্যাটালগ ও নেস্টেড ডকুমেন্টের জন্য মঙ্গোডিবি উপযুক্ত।",
          "e": "Choose PostgreSQL for structured schemas, relational integrity, complex JOIN queries, and rigorous ACID transaction compliance (financial ledgers). Choose MongoDB for semi-structured polymorphic documents, evolving hierarchical schemas, and effortless horizontal sharding.",
          "tip": "কখনোই অন্ধভাবে 'মঙ্গোডিবি ফাস্ট' বলবে না; ডেটা মডেলের ধরন ও ACID প্রয়োজনীয়তার ওপর ভিত্তি করে যুক্তি দেবে।"
        },
        {
          "lvl": "lvl1",
          "q": "Prisma Client-এ 'N+1 Query Problem' কী এবং কীভাবে সমাধান করবে?",
          "m": "N+1 সমস্যা ঘটে যখন আপনি ১টি কুয়েরিতে ১০০ জন ইউজার আনেন, এবং এরপর লুপ চালিয়ে প্রতি ইউজারের পোস্ট আনার জন্য আরও ১০০টি আলাদা ডাটাবেজ কুয়েরি পাঠান (মোট ১ + ১০০ = ১০১টি কুয়েরি!)। এটি ডাটাবেজকে পঙ্গু করে দেয়। সমাধান: Prisma-র `include` বা `select` ব্যবহার করা (`prisma.user.findMany({ include: { posts: true } })`। Prisma ইন্টারনালি একটি সিঙ্গেল অপটিমাইজড `JOIN` অথবা দুটি ইন-মেমোরি ব্যাচড কুয়েরি (`WHERE userId IN (...)`) চালিয়ে মাত্র ১-২টি কোয়েরিতে সমস্ত ডেটা এনে দেয়।",
          "b": "এন প্লাস ওয়ান সমস্যা হলো লুপ চালিয়ে বারবার ডাটাবেজ কল করে সিস্টেম স্লো করা। প্রিজমার include ব্যবহার করলে একটিমাত্র অপটিমাইজড কুয়েরিতে রিলেশনাল ডেটা চলে আসে এবং ডাটাবেজ লোড ১০০ গুণ কমে যায়।",
          "e": "The N+1 problem occurs when fetching N records induces N additional sequential queries to resolve related entities. Resolve it in Prisma via eager loading using `include` or `select`, transforming N+1 queries into one optimized JOIN or batch `IN` query.",
          "code": "const users = await prisma.user.findMany({\n  include: { profile: true, posts: { take: 5 } }\n});"
        },
        {
          "lvl": "lvl2",
          "q": "Pessimistic Locking (`SELECT FOR UPDATE`) এবং Optimistic Locking-এর মধ্যে পার্থক্য কী?",
          "m": "সমস্যা: একই সাথে দুজন ক্রেতা স্টকের শেষ পণ্যটি কেনার চেষ্টা করছে। (১) `Pessimistic Locking`: ডাটাবেজ রো-কে তালা মেরে দেয় (`SELECT ... FOR UPDATE`); ১ম ট্রানজাকশন শেষ না হওয়া পর্যন্ত ২য় ট্রানজাকশন অপেক্ষা করতে বাধ্য হয়। এটি হাই-কনকারেন্সি বা ফ্ল্যাশ সেলের জন্য শতভাগ নিরাপদ। (২) `Optimistic Locking`: কোনো রো লক করে না; টেবিলে একটি `version: 1` ফিল্ড রাখে। আপডেটের সময় চেক করে `WHERE id = 1 AND version = 1`। যদি ইতিমধ্যে অন্য কেউ আপডেট করে ভার্সন ২ করে ফেলে, তবে ২য় জনের আপডেট ০ রো এফেক্ট করে ফেইল হয় এবং রিট্রাই করতে বলে।",
          "b": "প্যাসিমিস্টিক লকিং ডাটাবেজ রো লক করে রাখে যাতে অন্য কেউ হাত না দিতে পারে (ফ্ল্যাশ সেলে কার্যকর)। অপটিমিস্টিক লকিং ভার্সন নাম্বার দিয়ে আপডেট যাচাই করে; অন্য কেউ ইতিমধ্যে পরিবর্তন করে ফেললে অপারেশন বাতিল করে রিট্রাই করায়।",
          "e": "Pessimistic Locking (`SELECT FOR UPDATE`) physically locks the row at the database engine level, forcing concurrent transactions to block until release. Optimistic Locking relies on a `version` column, updating where version matches; mismatches abort and trigger app-level retries.",
          "code": "// PostgreSQL Raw Lock in Prisma:\nawait tx.$queryRaw`SELECT * FROM \"Product\" WHERE id = ${id} FOR UPDATE`;"
        },
        {
          "lvl": "lvl2",
          "q": "Transaction Isolation Levels (Read Uncommitted, Read Committed, Repeatable Read, Serializable)-এর কাজ কী?",
          "m": "আইসোলেশন লেভেল নির্ধারণ করে কনকারেন্ট লেনদেনগুলো কতটা বিচ্ছিন্ন থাকবে: (১) `Read Uncommitted`: আন-কমিটেড ডেটা রিড হতে পারে (Dirty Read ঝুঁকি)। (২) `Read Committed`: শুধুমাত্র কমিট হওয়া ডেটা রিড হয় (PostgreSQL-এর ডিফল্ট)। (৩) `Repeatable Read`: পুরো ট্রানজাকশন জুড়ে একই কুয়েরি বারবার চালালেও হুবহু একই ফলাফল দেখাবে (Non-repeatable read বন্ধ করে)। (৪) `Serializable`: সর্বোচ্চ কঠোর স্তর—সব লেনদেন মনে হবে একে একে পর্যায়ক্রমে এক্সিকিউট হচ্ছে (Phantom Read পুরোপুরি বন্ধ কিন্তু স্লোয়েস্ট এবং রোলব্যাকের ঝুঁকি বেশি)।",
          "b": "আইসোলেশন লেভেল কনকারেন্ট লেনদেনের সুরক্ষা নির্ধারণ করে। রিড কমিটেড পোস্টগ্রেসের ডিফল্ট। রিপিটেবল রিড একই ট্রানজাকশনে ডেটা অপরিবর্তিত রাখে এবং সিরিয়ালাইজেবল সর্বোচ্চ কঠোর আইসোলেশন নিশ্চিত করে।",
          "e": "Transaction Isolation Levels trade concurrency for phenomena prevention: Read Committed (PostgreSQL default, prevents Dirty Reads), Repeatable Read (guarantees snapshot isolation, prevents non-repeatable reads), and Serializable (strict sequential emulation, eradicating Phantom Reads).",
          "tip": "পোস্টগ্রেসের ডিফল্ট আইসোলেশন লেভেল 'Read Committed'—এটি ইন্টারভিউতে খুব সাধারণ ও গুরুত্বপূর্ণ প্রশ্ন।"
        },
        {
          "lvl": "lvl2",
          "q": "Database Cascading Actions (`CASCADE`, `SET NULL`, `RESTRICT`) ব্যাকএন্ড ডাটাবেজ রিলেশনে কীভাবে কাজ করে?",
          "m": "যখন কোনো প্যারেন্ট রেকর্ড ডিলিট করা হয়: (১) `CASCADE`: প্যারেন্ট ডিলিট হলে সংশ্লিষ্ট সব চাইল্ড রেকর্ড স্বয়ংক্রিয়ভাবে মুছে যায় (যেমন ইউজার মুছলে তার সমস্ত পোস্ট ডিলিট)। (২) `SET NULL`: চাইল্ড রেকর্ডের ফরেন কি নাল হয়ে যায় কিন্তু রেকর্ড অক্ষত থাকে (যেমন ক্যাটাগরি ডিলিট হলে প্রোডাক্টের ক্যাটাগরি নাল হওয়া)। (৩) `RESTRICT` বা `NO ACTION`: যদি কোনো চাইল্ড রেকর্ড অবশিষ্ট থাকে, তবে প্যারেন্ট ডিলিট করার রিকোয়েস্টটি ডাটাবেজ সরাসরি রিজেক্ট করে এরর দেবে (যেমন কাস্টমারের বাকি টাকা বা ইনভয়েস থাকলে কাস্টমার ডিলিট নিষিদ্ধ)।",
          "b": "ক্যাসকেড অ্যাকশনে প্যারেন্ট মুছলে চাইল্ড স্বয়ংক্রিয়ভাবে মুছে যায়। SET NULL ফরেন কি নাল করে রেকর্ড অক্ষত রাখে। আর RESTRICT চাইল্ড ডাটা থাকা অবস্থায় প্যারেন্ট ডিলিট করা কঠোরভাবে আটকে দেয়।",
          "e": "Foreign key cascading defines integrity reactions upon parent deletion: `CASCADE` automatically purges orphaned children, `SET NULL` disassociates children by clearing foreign keys, and `RESTRICT` aborts deletion if referencing children exist.",
          "code": "user User @relation(fields: [userId], references: [id], onDelete: Cascade)"
        },
        {
          "lvl": "lvl2",
          "q": "MongoDB Mongoose-এ Transactions ও Two-Phase Commits কীভাবে কাজ করে?",
          "m": "MongoDB v4.0+ থেকে Replica Set আর্কিটেকচারে মাল্টি-ডকুমেন্ট ACID ট্রানজাকশন সাপোর্ট করে। Mongoose-এ আমরা একটি সেশন শুরু করি (`session = await mongoose.startSession()`), এরপর `session.startTransaction()` দিয়ে কাজ করি। প্রতিটি মঙ্গুজ কুয়েরিতে `{ session }` পাস করতে হয়। সব কাজ শেষে `await session.commitTransaction()` কল করি। কোনো এক্সেপশন ঘটলে `await session.abortTransaction()` কল করে সম্পূর্ণ পরিবর্তন রোলব্যাক করা হয়।",
          "b": "মঙ্গোডিবি রেপ্লিকা সেটে মাল্টি-ডকুমেন্ট ACID ট্রানজাকশন সমর্থন করে। startSession এবং startTransaction দিয়ে সেশন শুরু করে সব মডেলে সেশন পাস করতে হয় এবং ত্রুটি হলে abortTransaction দিয়ে রোলব্যাক করা হয়।",
          "e": "MongoDB supports multi-document ACID transactions across replica sets via client sessions. Instantiate sessions via `mongoose.startSession()`, start the transaction, execute operations bound to `{ session }`, and commit or abort atomically.",
          "code": "const session = await mongoose.startSession();\nsession.startTransaction();\ntry {\n  await Order.create([orderData], { session });\n  await Inventory.updateOne({ _id: prodId }, { $inc: { stock: -1 } }, { session });\n  await session.commitTransaction();\n} catch (e) {\n  await session.abortTransaction();\n} finally { session.endSession(); }"
        },
        {
          "lvl": "lvl2",
          "q": "Prisma Migrations (`prisma migrate dev` vs `prisma db push` vs `prisma migrate deploy`) কখন কোনটি ব্যবহার করবে?",
          "m": "(১) `prisma migrate dev`: লোকাল ডেভেলপমেন্টে ব্যবহার করা হয়; এটি স্কিমা চেঞ্জের ওপর ভিত্তি করে নতুন SQL মাইগ্রেশন ফাইল জেনারেট করে এবং ডাটাবেজে অ্যাপ্লাই করে। (২) `prisma db push`: কোনো মাইগ্রেশন হিস্ট্রি ফাইল তৈরি না করে সরাসরি স্কিমাকে ডাটাবেজে পুশ করে (দ্রুত প্রোটোটাইপিংয়ের জন্য ভালো কিন্তু প্রোডাকশনে ক্ষতিকর)। (৩) `prisma migrate deploy`: প্রোডাকশন CI/CD পাইপলাইনে ব্যবহৃত হয়; এটি কোনো নতুন ফাইল তৈরি করে না, শুধুমাত্র পেন্ডিং থাকা প্রাক-অনুমোদিত SQL ফাইলগুলো প্রোডাকশন ডাটাবেজে নিরাপদে এক্সিকিউট করে।",
          "b": "migrate dev লোকাল ডেভেলপমেন্টে এসকিউএল ফাইল তৈরি ও প্রয়োগ করে। db push প্রোটোটাইপিংয়ের জন্য সরাসরি স্কিমা পুশ করে। আর migrate deploy প্রোডাকশনে পেন্ডিং মাইগ্রেশনগুলো নিরাপদে এক্সিকিউট করে।",
          "e": "`prisma migrate dev` generates versioned SQL migration scripts for local development. `prisma db push` synchronizes schemas directly without tracking migration histories (prototyping only). `prisma migrate deploy` safely executes pending migrations in production CI/CD pipelines.",
          "tip": "কখনোই প্রোডাকশনে `prisma db push` বা `migrate dev` চালাবে না; সবসময় `prisma migrate deploy` চালাবে।"
        },
        {
          "lvl": "lvl3",
          "q": "Deadlock (ডেডলক) কী এবং ডাটাবেজ ট্রানজাকশনে ডেডলক কীভাবে ডিটেক্ট ও প্রিভেন্ট করবে?",
          "m": "ডেডলক ঘটে যখন ট্রানজাকশন ১ রো A লক করে রো B-র জন্য অপেক্ষা করছে, আর একই সাথে ট্রানজাকশন ২ রো B লক করে রো A-র জন্য অপেক্ষা করছে—দুজনেই পরস্পরের জন্য অনির্দিষ্টকাল আটকে যায়। সমাধান: (১) সমস্ত কোডবেজে রিসোর্স লক করার ক্রম (Order of Execution) সবসময় অভিন্ন রাখা (যেমন অ্যাকাউন্ট ট্রানজাকশনে সবসময় ছোট আইডি আগে লক করা: `ORDER BY id ASC`)। (২) ট্রানজাকশনগুলোকে যত দ্রুত সম্ভব ছোট রাখা। (৩) ডাটাবেজ ডেডলক ডিটেক্ট করে একটি ট্রানজাকশন কিল করলে অ্যাপ্লিকেশন লেয়ারে এক্সপোনেনশিয়াল ব্যাকঅফ সহ ৩ বার অটো-রিট্রাই লজিক রাখা।",
          "b": "ডেডলক হলো দুটি ট্রানজাকশন একে অপরের লক করা রিসোর্সের জন্য অনন্তকাল অপেক্ষা করার অবস্থা। রিসোর্স লক করার ক্রম সর্বদা অভিন্ন রেখে (ছোট আইডি থেকে বড় আইডি) এবং অ্যাপ্লিকেশনে অটো-রিট্রাই লজিক রেখে ডেডলক প্রতিরোধ করা হয়।",
          "e": "Deadlocks happen when two concurrent transactions mutually block each other by holding locks the other needs. Prevent deadlocks by enforcing deterministic, monotonic lock acquisition ordering (e.g. locking accounts sorted by primary key ID ascending) and adding exponential retry wrappers.",
          "code": "const [firstId, secondId] = [idA, idB].sort(); // Deterministic lock acquisition order!"
        },
        {
          "lvl": "lvl3",
          "q": "Connection Pool Exhaustion কী এবং হাই-কনকারেন্সি ব্যাকএন্ডে PgBouncer বা Prisma Connection Pooling কীভাবে কনফিগার করবে?",
          "m": "পোস্টগ্রেসকিউএলে প্রতিটি কানেকশন ওএস মেমোরিতে প্রায় ১০MB RAM নেয়। ট্রাফিকের চাপে যদি নোড সার্ভার শত শত কানেকশন খুলে ফেলে, ডাটাবেজ ক্র্যাশ করে বা নতুন রিকোয়েস্ট রিজেক্ট করে (`too many connections`)। সমাধান: আমরা ডাটাবেজের সামনে `PgBouncer` (Connection Pooler) বসাই যা Transaction Pooling মোডে চলে। অ্যাপ্লিকেশন হাজার হাজার কানেকশন পাঠালেও PgBouncer মাত্র ২০-৫০টি রি-ইউজেবল ফিজিক্যাল কানেকশন দিয়ে সমস্ত ট্রানজাকশন সম্পন্ন করে। Prisma-তে কানেকশন ইউআরএলে `?connection_limit=20&pool_timeout=10` দিয়ে অ্যাপ লেভেল পুলিং নিয়ন্ত্রণ করি।",
          "b": "কানেকশন পুল শেষ হয়ে গেলে ডাটাবেজ ক্র্যাশ করে। PgBouncer কানেকশন পুলার ব্যবহার করে হাজার হাজার রিকোয়েস্টকে মাত্র ২০-৫০টি ফিজিক্যাল কানেকশন দিয়ে সুপারফাস্ট হ্যান্ডেল করে মেমোরি রক্ষা করা হয়।",
          "e": "Connection Pool Exhaustion crashes database engines under load. Deploy PgBouncer in Transaction Pooling mode in front of PostgreSQL, multiplexing thousands of virtual client connections across a lean physical pool of 30-50 connections, tuned in Prisma via `connection_limit` parameters.",
          "tip": "PgBouncer এবং Transaction Pooling কনফিগারেশন এন্টারপ্রাইজ পোস্টগ্রেস আর্কিটেকচারের চূড়ান্ত প্রমাণ।"
        },
        {
          "lvl": "lvl3",
          "q": "Database Sharding এবং Read Replicas (CQRS): হাই-ট্রাফিক ব্যাকএন্ডে রিড ও রাইট কুয়েরি কীভাবে আলাদা করবে?",
          "m": "ডাটাবেজের ৯৫% লোড হয় রিড অপারেশনে (SELECT) এবং মাত্র ৫% রাইটে (INSERT/UPDATE)। আমরা ১টি Primary/Master ডাটাবেজ এবং ৩টি Read-Only Replicas রাখি। CQRS (Command Query Responsibility Segregation) নীতিতে: সমস্ত ডাটাবেজ মিউটেশন ও ট্রানজাকশন সরাসরি Master ডাটাবেজে যায়। আর সমস্ত ড্যাশবোর্ড ও ক্যাটালগ রিড কুয়েরি লোড ব্যালেন্স হয়ে Read Replicas-এ যায়। Prisma-তে `$extends` দিয়ে অথবা মাল্টিপল ডাটাবেজ ক্লায়েন্ট তৈরি করে এই রিড-রাইট স্প্লিট কার্যকর করা হয়।",
          "b": "রিড রেপ্লিকা আর্কিটেকচারে সব রাইট ও ট্রানজাকশন যায় মাস্টার ডাটাবেজে এবং সব রিড কুয়েরি ভাগ হয়ে যায় একাধিক রিড রেপ্লিকায়। এর ফলে মূল ডাটাবেজের ওপর চাপ মুক্ত থাকে এবং কোটি কোটি রিড রিকোয়েস্ট অনায়াসে হ্যান্ডেল হয়।",
          "e": "Segregate database workloads via Read Replicas: route mutating transactional writes to the primary write master, while distributing read traffic across asynchronous read replicas via Prisma client extensions or multi-datasource routing.",
          "code": "const readClient = new PrismaClient({ datasources: { db: { url: env.DATABASE_REPLICA_URL } } });\nconst writeClient = new PrismaClient({ datasources: { db: { url: env.DATABASE_PRIMARY_URL } } });"
        },
        {
          "lvl": "lvl3",
          "q": "Prisma Client Extensions (`$extends`) দিয়ে কীভাবে গ্লোবাল সফট ডিলিট (Soft Delete) এবং অডিট ফিল্ড অটোমেশন তৈরি করবে?",
          "m": "Prisma v4.7+ এ `$extends` এপিআই এসেছে। আমরা একটি ক্লায়েন্ট এক্সটেনশন লিখি যা প্রতিটি `findMany` ও `findUnique` কুয়েরিতে স্বয়ংক্রিয়ভাবে `{ where: { deletedAt: null } }` ইনজেক্ট করে। আর যখন কোনো ইউজার `delete()` কল করে, এক্সটেনশনটি ইন্টারসেপ্ট করে আসল হার্ড ডিলিট না করে `update({ data: { deletedAt: new Date() } })` এক্সিকিউট করে। ডেভেলপারকে কোনো ফাইলে ম্যানুয়ালি সফট ডিলিটের ফিল্টার লিখতে হয় না—পুরো অ্যাপ্লিকেশনে সফট ডিলিট স্বয়ংক্রিয় হয়ে যায়।",
          "b": "প্রিজমা এক্সটেনশনের মাধ্যমে সফট ডিলিট স্বয়ংক্রিয় করা যায়। delete() কল করলে স্বয়ংক্রিয়ভাবে deletedAt টাইমস্ট্যাম্প আপডেট হয় এবং যেকোনো কুয়েরিতে ডিলিট না হওয়া ডাটা ফিল্টার হয়ে আসে।",
          "e": "Prisma Client Extensions (`$extends`) intercept query methods globally. Transform `delete` operations into soft-delete updates (`deletedAt: new Date()`), while injecting `{ where: { deletedAt: null } }` into all queries transparently.",
          "code": "export const db = prisma.$extends({\n  query: {\n    product: {\n      async delete({ args }) { return prisma.product.update({ ...args, data: { deletedAt: new Date() } }); }\n    }\n  }\n});"
        },
        {
          "lvl": "lvl3",
          "q": "Zero-Downtime Database Migrations: বড় প্রোডাকশন টেবিলে কলাম রিনেম বা ড্রপ করার সময় 'Expand and Contract' প্যাটার্ন কীভাবে কাজ করে?",
          "m": "সরাসরি কোনো কলাম রিনেম (`ALTER TABLE RENAME`) করলে রানিং পুরানো কোডের সার্ভার ক্র্যাশ করবে। Expand and Contract প্যাটার্নে ৩টি ধাপে মাইগ্রেশন হয়: (১) `Expand`: ডাটাবেজে নতুন কলামটি যোগ করা হয় এবং কোডে ব্যাকওয়ার্ড কমপ্যাটিবিলিটি সহ উভয় কলামে ডুয়াল-রাইট করা হয়। (২) `Migrate`: ব্যাকগ্রাউন্ড স্ক্রিপ্ট দিয়ে পুরানো কলামের সব ব্যাকলগ ডাটা নতুন কলামে কপি করা হয়। (৩) `Contract`: কোডকে শুধুমাত্র নতুন কলামে পয়েন্ট করানো হয় এবং পুরানো সার্ভার সম্পূর্ণ বন্ধ হওয়ার পর নিরাপদ পরবর্তী রিলিজের সময় পুরানো কলামটি ড্রপ করা হয়। কোনো ডাউনটাইম হয় না।",
          "b": "এক্সপ্যান্ড অ্যান্ড কন্ট্রাক্ট প্যাটার্নে প্রথমে নতুন কলাম যোগ করে উভয় কলামে ডাটা লেখা হয়। এরপর পুরানো ডাটা মাইগ্রেট করে কোড আপডেট করা হয় এবং সবার শেষে পুরানো কলাম মুছে দিয়ে জিরো ডাউনটাইম নিশ্চিত করা হয়।",
          "e": "The Expand-and-Contract (Parallel Change) pattern executes schema migrations safely: (1) Expand: add new column, dual-writing to old and new in application code, (2) Backfill existing data via background scripts, (3) Contract: switch reads exclusively to the new column, deprecating and dropping the legacy column in a subsequent release.",
          "tip": "প্রোডাকশন ডেটাবেজ মাইগ্রেশনে Expand & Contract প্যাটার্ন উল্লেখ করা সিনিয়র আর্কিটেক্টদের সিগনেচার দক্ষতা।"
        },
        {
          "lvl": "situation",
          "q": "একটি ফ্ল্যাশ সেলে শেষ ৫টি আইটেমের জন্য একই সেকেন্ডে ৫০০ জন ইউজার 'Buy' বাটনে ক্লিক করায় ডাটাবেজে স্টক ঋণাত্মক (-১২) হয়ে গেছে (Race Condition)। কীভাবে ফিক্স করবে?",
          "m": "কারণ: ৫০০টি রিকোয়েস্ট একই সময়ে `SELECT stock` চালিয়ে দেখেছে ৫টি আছে, এবং সবাই আপডেট চালিয়ে দিয়েছে। সমাধান: (১) ডাটাবেজ লেভেলে চেকিং: `UPDATE products SET stock = stock - 1 WHERE id = $1 AND stock > 0 RETURNING stock;`। যদি রিটার্নে কোনো রো না আসে, এর মানে স্টক অলরেডি ০ এবং রিকোয়েস্ট ফেইল। (২) অথবা ট্রানজাকশনের ভেতর Pessimistic Locking: `SELECT * FROM products WHERE id = $1 FOR UPDATE`। (৩) ডাটাবেজ টেবিলে Check Constraint বসাব: `CHECK (stock >= 0)` যাতে কোনো অবস্থাতেই ঋণাত্মক স্টক সেভ না হতে পারে।",
          "b": "রেস কন্ডিশনে স্টক মাইনাস হওয়া ঠেকাতে UPDATE কুয়েরিতে stock > 0 শর্ত দিতে হবে। টেবিলে CHECK (stock >= 0) কনস্ট্রেইন্ট দিয়ে ডাটাবেজ লেভেলে ঋণাত্মক সংখ্যা পুরোপুরি নিষিদ্ধ করতে হবে।",
          "e": "Atomic decrement queries prevent stock race conditions: `UPDATE products SET stock = stock - 1 WHERE id = $1 AND stock > 0`. Alternatively, combine Pessimistic Locking (`FOR UPDATE`) with a database CHECK constraint (`CONSTRAINT positive_stock CHECK (stock >= 0)`).",
          "code": "const updated = await prisma.product.updateMany({\n  where: { id, stock: { gte: quantity } },\n  data: { stock: { decrement: quantity } }\n});\nif (updated.count === 0) throw new Error('Stock depleted');"
        },
        {
          "lvl": "situation",
          "q": "একটি জটিল ড্যাশবোর্ড রিপোর্ট রান করার সময় ডাটাবেজ CPU ১০০% হয়ে গেছে এবং সাধারণ ইউজারদের সেলস এন্ট্রি কুয়েরিগুলো টাইমআউট হচ্ছে। তাৎক্ষণিকভাবে কীভাবে সামাল দেবে?",
          "m": "তাৎক্ষণিক সমাধান: (১) ডাটাবেজে `SELECT pid, query, state, age(clock_timestamp(), query_start) FROM pg_stat_activity WHERE state != 'idle'` চালিয়ে স্লো কুয়েরির PID শনাক্ত করে `SELECT pg_cancel_backend(pid)` বা `pg_terminate_backend(pid)` দিয়ে কুয়েরি কিল করব। (২) ভারী অ্যানালিটিক্স রিপোর্টগুলোকে অবিলম্বে প্রাইমারি ডাটাবেজ থেকে সরিয়ে Read Replica ডাটাবেজে রাউট করব। (৩) কুয়েরিতে মিসিং ইন্ডেক্স যোগ করব এবং রিপোর্টটিকে Redis-এ ৫ মিনিটের জন্য ক্যাশ করব।",
          "b": "প্রথমে pg_stat_activity দিয়ে ভারী কুয়েরি শনাক্ত করে pg_terminate_backend দিয়ে তা কিল করতে হবে। এরপর ভারী রিপোর্টগুলোকে মাস্টার ডাটাবেজ থেকে সরিয়ে রিড রেপ্লিকায় পাঠাতে হবে এবং রেডিসে ফলাফল ক্যাশ করতে হবে।",
          "e": "Immediately identify and terminate the runaway reporting process using `pg_stat_activity` and `pg_terminate_backend(pid)`. Long-term: redirect analytical queries exclusively to a Read Replica or pre-computed materialized views, insulating primary write OLTP pools.",
          "code": "SELECT pg_terminate_backend(pid) FROM pg_stat_activity WHERE state = 'active' AND query_start < now() - interval '2 minutes';"
        },
        {
          "lvl": "situation",
          "q": "প্রোডাকশন ডেটাবেজ মাইগ্রেশন চালাতে গিয়ে একটি কনস্ট্রেইন্ট ভায়োলেশনে মাইগ্রেশন মাঝপথে ক্র্যাশ করে ডাটাবেজ লক হয়ে গেল। কীভাবে রিকভার করবে?",
          "m": "স্টেপস: (১) PostgreSQL-এর DDL অপারেশনগুলো বাই-ডিফল্ট ট্রানজাকশনাল, তাই ক্র্যাশ হলে স্বয়ংক্রিয়ভাবে রোলব্যাক হয়। (২) Prisma-র `_prisma_migrations` টেবিলে ওই মাইগ্রেশনটি 'failed' স্ট্যাটাসে মার্ক থাকে, যার ফলে পরবর্তী মাইগ্রেশন ব্লক হয়। (৩) আমরা `prisma migrate resolve --rolled-back <migration_name>` চালাব। (৪) এরর রুট কজ (যেমন ডাটাবেজে আগে থেকেই ডুপ্লিকেট ডেটা থাকায় ইউনিক ইনডেক্স ফেইল করা) ম্যানুয়াল SQL দিয়ে ক্লিন করব। (৫) পুনরায় সফলভাবে মাইগ্রেশন রান করব।",
          "b": "মাইগ্রেশন ফেইল করলে prisma migrate resolve --rolled-back কমান্ড দিয়ে ফেইলিং স্ট্যাটাস রিসেট করতে হবে। যে ডেটার কারণে ভায়োলেশন হয়েছে তা এসকিউএল দিয়ে ঠিক করে পুনরায় নিরাপদে মাইগ্রেশন চালাতে হবে।",
          "e": "PostgreSQL wraps DDL statements in transactions, rolling back upon failure. Reset Prisma's migration lock via `prisma migrate resolve --rolled-back <migration_name>`, sanitize the conflicting database rows via SQL, and re-execute `prisma migrate deploy`.",
          "code": "npx prisma migrate resolve --rolled-back 20240101_add_unique_phone"
        },
        {
          "lvl": "situation",
          "q": "একটি টেবিলে কোটি কোটি রো রয়েছে এবং সাধারণ `SELECT * FROM transactions WHERE tenantId = $1` কুয়েরি রান হতে ৫ সেকেন্ড সময় নিচ্ছে। কীভাবে অপটিমাইজ করবে?",
          "m": "সমাধান: (১) আমরা `EXPLAIN ANALYZE` রান করে দেখব এটি 'Seq Scan' (Sequential Scan) করছে কি না। (২) টেবিলে একটি কম্পোজিট ইনডেক্স তৈরি করব: `CREATE INDEX idx_transactions_tenant_created ON \"Transaction\"(tenantId, createdAt DESC)`। এর ফলে সিকোয়েন্সিয়াল স্ক্যানের বদলে 'Index Scan' হবে এবং কুয়েরি টাইম ৫ সেকেন্ড থেকে কমে মাত্র ২ মিলিসেকেন্ডে নেমে আসবে। (৩) অতিরিক্ত স্কেলের জন্য টেবিলকে `tenantId` বা তারিখ অনুযায়ী Table Partitioning করব।",
          "b": "EXPLAIN ANALYZE চালিয়ে কুয়েরি বিশ্লেষণ করতে হবে। tenantId এবং createdAt এর ওপর কম্পোজিট ইনডেক্স তৈরি করলে কুয়েরি সময় ৫ সেকেন্ড থেকে ২ মিলিসেকেন্ডে নেমে আসবে। অতিরিক্ত লোডে টেবিল পার্টিশনিং কার্যকর সমাধান।",
          "e": "Profile with `EXPLAIN ANALYZE` to identify full table scans. Add a composite B-Tree index on `(tenantId, createdAt DESC)` allowing the database engine to perform rapid Index Range Scans in sub-5ms. For billions of records, introduce Declarative Table Partitioning.",
          "code": "CREATE INDEX idx_trans_tenant_created ON \"Transaction\"(\"tenantId\", \"createdAt\" DESC);"
        },
        {
          "lvl": "situation",
          "q": "ব্যবহারকারী একটি কাস্টমার ডিলিট করার চেষ্টা করলে ডাটাবেজ ফরেন কি এরর দিচ্ছে: `update or delete on table violates foreign key constraint`। ডাটাবেজ আর্কিটেকচারে এটি কীভাবে হ্যান্ডেল করবে?",
          "m": "কারণ ওই কাস্টমারের সাথে সংযুক্ত সেলস ইনভয়েস বা বাকি টাকার রেকর্ড অন্য টেবিলে রয়েছে। আর্থিক সিস্টেমে কখনোই আসল কাস্টমার ডিলিট করা উচিত নয় কারণ তাহলে পূর্বের সমস্ত অডিট ও ইনভয়েস ডাটাবেজে করাপ্ট হবে। সমাধান: (১) হার্ড ডিলিটের বদলে সফট ডিলিট (`isDeleted: true` বা `deletedAt = now()`) ব্যবহার করব। (২) এপিআইতে সুন্দর 400 এরর রেসপন্স দেব: 'এই কাস্টমারের পূর্ববর্তী বিক্রয় রেকর্ড থাকায় ডিলিট করা সম্ভব নয়; অ্যাকাউন্টটি ডিঅ্যাক্টিভেট করা হয়েছে'।",
          "b": "আর্থিক সিস্টেমে কখনো কাস্টমার স্থায়ীভাবে ডিলিট করা যাবে না কারণ এতে অডিট রেকর্ড নষ্ট হয়। সফট ডিলিট ব্যবহার করে অ্যাকাউন্ট নিষ্ক্রিয় করতে হবে এবং ব্যবহারকারীকে স্পষ্ট কারণ বুঝিয়ে দিতে হবে।",
          "e": "Foreign key constraints safeguard referential integrity by forbidding deletion of entities with active children. Enforce Soft Deletion (`deletedAt: Date`) on financial entities, returning human-friendly 400 explanations without breaking ledger histories.",
          "code": "await prisma.customer.update({ where: { id }, data: { isArchived: true } });"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর দ্রুতগতির বিলিংয়ে ইনভয়েস ক্রিয়েশন, সেলস আইটেম ইনসার্ট, কাস্টমার বাকি লেজার এবং স্টক হ্রাস—এই ৪টি অপারেশন Prisma-তে কীভাবে একটি সিঙ্গেল ট্রানজাকশনে পরিচালনা করেছিলে?",
          "m": "দোকানি ক্যাশ কাউন্টারে আমরা `prisma.$transaction(async (tx) => ...)` ব্যবহার করেছি। ট্রানজাকশনের ভেতরে: (১) ইনভয়েস মাস্টার তৈরি, (২) আইটেমগুলোর স্টক অ্যাটোমিকালি ডিক্রিমেন্ট করা (`stock: { decrement: qty }`), (৩) যদি বাকি থাকে তবে কাস্টমার ব্যালেন্স বৃদ্ধি করা (`dueBalance: { increment: due }`), (৪) আর্থিক লেজারে ডেবিট-ক্রেডিট এন্ট্রি লেখা। কোনো একটি পণ্যের স্টক খালি থাকলে ট্রানজাকশন সাথে সাথে এক্সেপশন ছুড়ে পুরো বিল রোলব্যাক করত—ফলে ১ পয়সারও হিসাব নষ্ট হয়নি।",
          "b": "দোকানি বিক্রয় এন্ট্রিতে আমরা প্রিজমার ইন্টারেক্টিভ ট্রানজাকশন ব্যবহার করেছি। ইনভয়েস তৈরি, স্টক কমানো এবং বাকি হিসাব বৃদ্ধি একটিমাত্র অবিভাজ্য পদক্ষেপে সম্পন্ন হতো। কোনো সমস্যা হলে সম্পূর্ণ পরিবর্তন রোলব্যাক হয়ে যেত।",
          "e": "Executed atomic POS checkouts in Dokani via Prisma interactive transactions: (1) creating the invoice master, (2) decrementing stock units atomically, (3) incrementing customer ledger receivables for dues, and (4) creating journal entries with guaranteed rollback on zero stock.",
          "code": "await prisma.$transaction(async (tx) => {\n  const inv = await tx.invoice.create({ data: invoiceData });\n  for (const item of items) {\n    await tx.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.qty } } });\n  }\n  if (dueAmount > 0) await tx.customer.update({ where: { id: custId }, data: { due: { increment: dueAmount } } });\n});"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর মাল্টি-টেন্যান্ট ডেটাবেজ ডিজাইনে Single Database with Tenant ID Discriminator কেন বেছে নিয়েছিলে এবং কীভাবে পারফরম্যান্স নিশ্চিত করেছিলে?",
          "m": "মাল্টি-টেন্যান্সিতে ৩টি অপশন থাকে: Database per tenant, Schema per tenant, এবং Shared DB with Tenant Discriminator। শত শত ছোট-মাঝারি দোকানের জন্য আলাদা ডাটাবেজ রাখা অবকাঠামোগতভাবে খুব ব্যয়বহুল ও মেইনটেইন্যান্স জটিল ছিল। আমরা Shared Database বেছে নিয়েছি: প্রতিটি টেবিলে `tenantId` ইনডেক্সড কলাম ছিল। সমস্ত কুয়েরি এবং কম্পোজিট ইনডেক্স `(tenantId, id)` ভিত্তিক হওয়ায় কুয়েরি পারফরম্যান্স ছিল সুপার ফাস্ট এবং অবকাঠামো খরচ ৯০% কম ছিল।",
          "b": "শত শত দোকানের জন্য আলাদা ডাটাবেজ ব্যয়বহুল হওয়ায় আমরা শেয়ার্ড ডাটাবেজ উইথ টেন্যান্ট আইডি বেছে নিয়েছি। প্রতিটি টেবিলে টেন্যান্ট আইডি ও কম্পোজিট ইনডেক্স থাকায় নিরাপত্তা অক্ষুণ্ণ রেখে অবকাঠামোগত খরচ ৯০% কমানো সম্ভব হয়েছিল।",
          "e": "Selected Shared Database with Tenant ID Discriminators for Dokani POS to eliminate the infrastructure overhead of managing thousands of distinct DB instances. Enforcing composite indices on `(tenantId, ...)` delivered enterprise sub-millisecond query performance.",
          "tip": "মাল্টি-টেন্যান্ট SaaS আর্কিটেকচারে কস্ট এফিসিয়েন্সি ও ইনডেক্সিং স্ট্র্যাটেজি ব্যাখ্যা করা সিনিয়র টেক লিডের বৈশিষ্ট্য।"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে লাখ লাখ ছাত্রের কোর্স এনরোলমেন্ট ও পরীক্ষার ফলাফল কুয়েরি অপটিমাইজেশনে PostgreSQL Indexing কীভাবে ডিজাইন করেছিলে?",
          "m": "আমরা ৩টি স্পেশাল ইনডেক্স ডিজাইন করেছি: (১) `B-Tree Composite Index`: `(courseId, studentId)` যাতে ডুপ্লিকেট এনরোলমেন্ট প্রতিরোধ হয় এবং নিমেষে স্টুডেন্ট স্ট্যাটাস খোঁজা যায়। (২) `Partial Index`: `CREATE INDEX idx_active_students ON \"Enrollment\"(studentId) WHERE status = 'ACTIVE'`—এটি শুধু সক্রিয় ছাত্রদের ইনডেক্স করে ইনডেক্স সাইজ ৭০% ছোট রাখে। (৩) `Covering Index (INCLUDE)`: ঘন ঘন এক্সাম রেজাল্ট দেখতে `INDEX (examId) INCLUDE (score, grade)` ব্যবহার করেছি যাতে আসল টেবিল না ছুঁয়ে ইনডেক্স থেকেই ফলাফল চলে আসে (Index-Only Scan)।",
          "b": "পিটিটিএবিডিতে আমরা কম্পোজিট ইনডেক্স, পার্সিয়াল ইনডেক্স (শুধুমাত্র অ্যাক্টিভ ছাত্রদের জন্য) এবং কভারিং ইনডেক্স (INCLUDE) ব্যবহার করেছি। এর ফলে ডাটাবেজ টেবিল স্ক্যান না করে সরাসরি ইনডেক্স থেকেই সেকেন্ডের ভগ্নাংশে রেজাল্ট পাওয়া যেত।",
          "e": "Architected high-throughput indexing for PTTABD: Composite B-Trees on `(courseId, studentId)`, Partial Indexes filtering strictly `status = 'ACTIVE'` to shrink index RAM footprint, and Covering Indexes (`INCLUDE score`) unlocking ultra-fast Index-Only Scans.",
          "code": "CREATE INDEX idx_exam_covering ON \"ExamSubmission\"(\"examId\") INCLUDE (\"score\", \"passed\");"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ শত শত স্টোরের ব্যালেন্স শিট ও আর্থিক অডিট সামঞ্জস্য রক্ষায় Double-Entry Bookkeeping লেজার মডেল কীভাবে ডিজাইন করেছিলে?",
          "m": "আর্থিক নির্ভুলতার জন্য আমরা সাধারণ প্লাস-মাইনাস ব্যালেন্স আপডেট পরিহার করে আন্তর্জাতিক 'Double-Entry Bookkeeping' নীতি মেনে চলেছি। প্রতিটি আর্থিক ইভেন্টে একটি `JournalEntry` তৈরি হতো যাতে ন্যূনতম ২টি `LedgerEntry` থাকত: ১টি ডেবিট এবং ১টি ক্রেডিট। যেমন ক্যাশ বিক্রি হলে: `Debit: Cash Account (+১০০০)` এবং `Credit: Sales Revenue (+১০০০)`। পুরো সিস্টেমে সবসময় `Total Debits === Total Credits` হতে হতো। ফলে ১ পয়সাও অমিল হওয়ার কোনো সুযোগ ছিল না।",
          "b": "দোকানি অ্যাকাউন্টিংয়ে আমরা ডাবল-এন্ট্রি বুককিপিং মডেল তৈরি করেছি। প্রতিটি বিক্রয়ে সমপরিমাণ ডেবিট এবং ক্রেডিট এন্ট্রি সংরক্ষিত হতো। এর ফলে মোট ডেবিট এবং ক্রেডিট সর্বদা সমান থাকায় আর্থিক অডিটে কোনো অমিল হতে পারেনি।",
          "e": "Modeled Dokani's financial core via Double-Entry Bookkeeping. Every transaction recorded atomic balanced Ledger entries (`Sum(Debits) === Sum(Credits)`). Debiting Cash and Crediting Sales Revenue mathematically eliminated ledger float errors.",
          "tip": "ডাবল এন্ট্রি বুককিপিংয়ের ডেবিট-ক্রেডিট আর্কিটেকচার উল্লেখ করা যে কোনো ফিনটেক বা পিওএস ইন্টারভিউতে তোমাকে অন্যদের চেয়ে আলাদা করে দেবে।"
        },
        {
          "lvl": "realworld",
          "q": "ডাটাবেজ মাইগ্রেশন ও স্কিমা ডিজাইনে টিম স্ট্যান্ডার্ড ও কোয়ালিটি নিশ্চিত করতে তোমার মূল প্রিন্সিপালগুলো কী?",
          "m": "আমার মূল নীতিগুলো: (১) প্রতিটি টেবিলে বাধ্যতামূলক `id (UUID)`, `createdAt`, `updatedAt`, এবং `tenantId` থাকা। (২) সমস্ত ফরেন কি এবং প্রায়শই ফিল্টার হওয়া ফিল্ডে বাধ্যতামূলক ইনডেক্স থাকা। (৩) প্রতিটি মাইগ্রেশন কোড রিভিউ এবং স্টেজিংয়ে টেস্ট করা ছাড়া প্রোডাকশনে না চালানো। (৪) জিরো-ডাউনটাইম নিশ্চিত করতে Expand & Contract নীতি মেনে চলা। (৫) সমস্ত গুরুত্বপূর্ণ ব্যবসায়িক নিয়মের জন্য ডাটাবেজ লেভেলে কনস্ট্রেইন্ট (Check, Unique) রাখা।",
          "b": "আমার প্রধান নীতিসমূহ: বাধ্যতামূলক টাইমস্ট্যাম্প ও টেন্যান্ট আইডি, ফরেন কি তে ইনডেক্সিং, স্টেজিংয়ে মাইগ্রেশন যাচাই, ডাউনটাইম ছাড়া পরিবর্তন এবং ডাটাবেজ লেভেলে কনস্ট্রেইন্ট নিশ্চিত করা।",
          "e": "My database design standards: (1) Mandatory UUID PKs, timestamps, and tenant discriminators, (2) Explicit indexes on all FKs and query filters, (3) Dry-run migration testing in staging pipelines, (4) Zero-downtime Expand-and-Contract rollouts, and (5) Strict database-level integrity constraints.",
          "tip": "এই সংক্ষিপ্ত নীতিগুলো তোমার ডেটাবেজ ইঞ্জিনিয়ারিংয়ের শক্ত ভিত প্রকাশ করে।"
        }
      ]
    },
    {
      "id": "backend-devops-tools",
      "name": "Backend Server, PM2, Docker & Nginx",
      "desc": "Linux Server Administration, PM2 Clustering, Nginx Reverse Proxy, Docker Containerization, Production CI/CD for Backend",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Node.js অ্যাপ্লিকেশনকে সরাসরি ইন্টারনেটে এক্সপোজ না করে সামনে Nginx Reverse Proxy রাখা কেন বাধ্যতামূলক?",
          "m": "Node.js সরাসরি পোর্ট ৮০ বা ৪৪৩-এ পাবলিকলি চালানো ঝুঁকিপূর্ণ। Nginx সামনে রাখার সুবিধা: (১) SSL/TLS Termination: SSL সার্টিফিকেট Nginx হ্যান্ডেল করে নোড সার্ভারের সিপিইউ বাঁচায়। (২) Security & DDoS Shield: ক্ষতিকর স্লো-লরিস বা মেলিসিয়াস প্যাকেট নোডে পৌঁছানোর আগেই Nginx ব্লক করে। (৩) Static Asset Caching: ছবি ও সিএসএস ফাইল Nginx সরাসরি ডিস্ক থেকে ১ms-এ সার্ভ করে। (৪) Load Balancing: একাধিক ব্যাকএন্ড নোড ইনস্ট্যান্সে ট্রাফিক সুন্দরভাবে ভাগ করে দেয়।",
          "b": "নোড জেএস সরাসরি ইন্টারনেটে উন্মুক্ত না করে সামনে এনজিনিক্স (Nginx) রাখা হয়। এটি এসএসএল হ্যান্ডশেক সম্পন্ন করে, স্ট্যাটিক ফাইল দ্রুত ক্যাশ করে, ক্ষতিকর নেটওয়ার্ক আক্রমণ প্রতিহত করে এবং একাধিক ব্যাকএন্ড প্রসেসের মাঝে লোড ব্যালেন্স করে।",
          "e": "Exposing raw Node.js ports publicly creates security and performance vulnerabilities. Nginx handles SSL/TLS termination, buffers slow client connections, serves static files from disk at native C speeds, and load-balances across clustered Node.js processes.",
          "tip": "ইন্টারভিউতে 'SSL Termination, Static Caching, and DDoS protection' তিনটি প্রধান কারণ বলবে।"
        },
        {
          "lvl": "lvl1",
          "q": "PM2 Process Manager কী এবং সাধারণ `node server.js` চালানোর চেয়ে এটি কেন উৎপাদন পরিবেশে আবশ্যক?",
          "m": "টার্মিনালে সাধারণ `node server.js` চালালে কোনো এররে কোড ক্র্যাশ করলে বা টার্মিনাল ক্লোজ করলে সার্ভার সাথে সাথে বন্ধ হয়ে যায়। PM2 হলো একটি প্রোডাকশন প্রসেস ম্যানেজার যা: (১) কোনো অপ্রত্যাশিত ক্র্যাশে মিলি-সেকেন্ডে প্রসেস অটো-রিস্টার্ট করে। (২) Cluster Mode-এ সব সিপিইউ কোর ব্যবহার করে রান করতে পারে। (৩) সার্ভার রিবুট হলে সিস্টেম বুটের সাথে সাথে অ্যাপ অটো-স্টার্ট করায় (`pm2 startup`)। (৪) জিরো-ডাউনটাইম রিলোড (`pm2 reload`) সাপোর্ট করে।",
          "b": "পিএম২ একটি শক্তিশালী প্রসেস ম্যানেজার। এটি কোনো ক্র্যাশে সাথে সাথে অ্যাপ রিস্টার্ট করে, সার্ভার রিবুট হলে অটো-স্টার্ট করায়, সব সিপিইউ কোর ব্যবহার করে ক্লাস্টার তৈরি করে এবং কোনো ডাউনটাইম ছাড়াই কোড রিলোড করার সুবিধা দেয়।",
          "e": "Running bare `node server.js` dies permanently upon unhandled exceptions or terminal disconnects. PM2 provides automatic self-healing restarts, multi-core clustering, server reboot persistence (`pm2 startup`), and zero-downtime hot reloads.",
          "code": "pm2 start dist/server.js -i max --name dokani-api\npm2 save && pm2 startup"
        },
        {
          "lvl": "lvl1",
          "q": "Docker Containerization কী এবং 'It works on my machine' সমস্যা কীভাবে দূর করে?",
          "m": "ডেভেলপারের লোকাল মেশিনে হয়তো Node v20 আছে কিন্তু প্রোডাকশন সার্ভারে Node v18 বা ভিন্ন লাইব্রেরি থাকায় কোড ফেইল করে। Docker পুরো অ্যাপ্লিকেশনকে তার নিজস্ব অপারেটিং সিস্টেম ফাইল, রানটাইম, ডিপেনডেন্সি এবং কনফিগারেশন সহ একটি হালকা, আইসোলেটেড 'Container'-এ প্যাক করে। এর ফলে একই ডকার ইমেজ লোকাল ল্যাপটপে যেভাবে রান করে, হুবহু অবিকল একই আচরণে প্রোডাকশন উবুন্টু বা এডব্লিউএস সার্ভারে রান করে।",
          "b": "ডকার সম্পূর্ণ অ্যাপকে তার প্রয়োজনীয় সব ডিপেনডেন্সি ও ওএস লাইব্রেরি সহ একটি পোর্টেবল কন্টেইনারে আবদ্ধ করে। ফলে ডেভেলপার মেশিনের পরিবেশ ও লাইভ সার্ভারের পরিবেশ হুবহু এক থাকায় কোনো ভার্সন জটিলতা তৈরি হয় না।",
          "e": "Docker packages the application alongside its runtime, dependencies, system libraries, and configs into an immutable container image. This eliminates environment drift, ensuring identical behavior across local Mac/Windows environments and production Linux VMs.",
          "tip": "ডকারের 'Environment Immutability' শব্দবন্ধটি ব্যবহার করা খুব প্রফেশনাল।"
        },
        {
          "lvl": "lvl1",
          "q": "Linux সার্ভারে ফাইল পারমিশন (`chmod` ও `chown`) কীভাবে কাজ করে এবং `755` বনাম `644`-এর অর্থ কী?",
          "m": "লিনাক্সে ৩টি স্তর থাকে: Owner (u), Group (g), Others (o)। এবং ৩টি পারমিশন মান: Read (4), Write (2), Execute (1)। (১) `chmod 755`: ওনার পায় Read+Write+Execute (4+2+1=7), গ্রুপ পায় Read+Execute (4+1=5), এবং অন্যরা পায় Read+Execute (5)—এটি ফোল্ডার ও এক্সিকিউটেবল স্ক্রিপ্টের স্ট্যান্ডার্ড। (২) `chmod 644`: ওনার পায় Read+Write (4+2=6), বাকিরা শুধু Read (4)—এটি সাধারণ কোড ও কনফিগ ফাইলের স্ট্যান্ডার্ড। `chown` মালিকানা পরিবর্তনের জন্য ব্যবহৃত হয় (যেমন `chown -R www-data:www-data /var/www`)।",
          "b": "লিনাক্সে পারমিশন ৪ (পড়া), ২ (লেখা), ১ (এক্সিকিউট) যোগ করে নির্ধারিত হয়। ৭৫৫ ফোল্ডার ও স্ক্রিপ্টের জন্য উপযুক্ত এবং ৬৪৪ সাধারণ ফাইলের জন্য নিরাপদ মান যাতে অন্যরা কোড পরিবর্তন করতে না পারে।",
          "e": "Linux permissions combine octal values: Read (4), Write (2), Execute (1) across Owner, Group, and Others. `755` grants rwx to owner and r-x to group/others (directories). `644` grants rw- to owner and r-- to group/others (source files).",
          "code": "chmod 755 /var/www/dokani\nchmod 644 /var/www/dokani/.env\nchown -R deploy:deploy /var/www/dokani"
        },
        {
          "lvl": "lvl1",
          "q": "Docker-এ `Dockerfile` এবং `docker-compose.yml`-এর মধ্যে মৌলিক পার্থক্য কী?",
          "m": "`Dockerfile` হলো একটি রেসিপি যা একটি একক ডকার ইমেজ তৈরির ব্লুপ্রিন্ট দেয় (যেমন শুধু আমাদের Node.js অ্যাপের ইমেজ)। আর `docker-compose.yml` হলো একটি মাল্টি-কনটেইনার অর্কেস্ট্রেশন টুল যা একাধিক সম্পর্কিত সার্ভিসকে (যেমন: Node API + PostgreSQL DB + Redis Cache) একই সাথে একই প্রাইভেট নেটওয়ার্কে রান করানো, ভলিউম মাউন্ট ও পোর্ট বাইন্ড করার জন্য ব্যবহার করা হয়।",
          "b": "ডকারফাইল একটি নির্দিষ্ট ইমেজ তৈরির স্ক্রিপ্ট। ডকার কম্পোজ একাধিক কন্টেইনার (যেমন নোড এপিআই, পোস্টগ্রেস ও রেডিস) একসাথে নেটওয়ার্কে যুক্ত করে এক ক্লিকে সম্পূর্ণ সিস্টেম রান করার ফাইল।",
          "e": "A Dockerfile contains instructions to build a single standalone container image. docker-compose coordinates and orchestrates multi-container ecosystems (e.g. Node API, PostgreSQL, Redis) defining shared networks, environment variables, and persistent storage volumes.",
          "code": "# docker-compose up -d (Launches full stack together)"
        },
        {
          "lvl": "lvl2",
          "q": "Node.js-এর জন্য Multi-Stage Dockerfile কেন তৈরি করতে হয় এবং এটি কীভাবে ইমেজ সাইজ ১GB থেকে ৫০MB-তে নামিয়ে আনে?",
          "m": "সাধারণ ডকার বিল্ডে টাইপস্ক্রিপ্ট কম্পাইলার, ডেভ-ডিপেনডেন্সি এবং সোর্স কোড সব ইমেজ ফাইনালে থেকে যায়, যার ফলে ইমেজ সাইজ ১GB ছাড়িয়ে যায়। Multi-Stage বিল্ডে দুটি স্তর থাকে: (১) `Builder Stage`: এখানে সব ডেভ-ডিপেনডেন্সি ইন্সটল করে `npm run build` দিয়ে টাইপস্ক্রিপ্ট কম্পাইল করা হয়। (২) `Runner Stage`: একটি ফ্রেশ হালকা আলপাইন ইমেজ (`node:alpine`) নেওয়া হয় এবং শুধুমাত্র কম্পাইল করা `dist/` ফোল্ডার ও প্রোডাকশন ডিপেনডেন্সি (`npm ci --omit=dev`) কপি করা হয়। ফলে অপ্রয়োজনীয় বিল্ড টুল ছাড়াই ফাইনাল ইমেজ মাত্র ৫০-৮০ মেগাবাইটে নেমে আসে।",
          "b": "মাল্টি-স্টেজ ডকারফাইলে বিল্ডার স্টেজে কোড কম্পাইল করা হয় এবং রানার স্টেজে শুধুমাত্র প্রয়োজনীয় dist ফাইল ও প্রোডাকশন ডিপেনডেন্সি রাখা হয়। ফলে অপ্রয়োজনীয় ডেভ টুলস বাদ দিয়ে ইমেজ সাইজ ১ জিবি থেকে মাত্র ৫০ মেগাবাইটে নেমে আসে।",
          "e": "Multi-stage Docker builds isolate the compilation tooling. Stage 1 (Builder) installs devDependencies to compile TypeScript. Stage 2 (Runner) copies strictly the emitted `dist/` artifacts and `node_modules` into a lean `node:alpine` base, shrinking image size from 1GB to under 70MB.",
          "code": "FROM node:20-alpine AS builder\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\n\nFROM node:20-alpine AS runner\nWORKDIR /app\nCOPY --from=builder /app/dist ./dist\nCOPY --from=builder /app/node_modules ./node_modules\nCMD [\"node\", \"dist/server.js\"]"
        },
        {
          "lvl": "lvl2",
          "q": "PM2 Cluster Mode বনাম Fork Mode-এর মধ্যে পার্থক্য কী এবং Zero-Downtime Reload (`pm2 reload`) কীভাবে কাজ করে?",
          "m": "Fork Mode অ্যাপের মাত্র ১টি সিঙ্গেল ইনস্ট্যান্স রান করে। আর Cluster Mode মেশিনের সমস্ত কোর ব্যবহার করে মাল্টিপল ইনস্ট্যান্স তৈরি করে (`instances: 'max'`)। `pm2 restart` দিলে সব প্রসেস একসাথে বন্ধ করে রিস্টার্ট করায় কিছুক্ষণের জন্য সাইট ডাউন হয়। কিন্তু `pm2 reload` হলো জিরো-ডাউনটাইম রিলোড: এটি এক এক করে ক্রমানুসারে একটি প্রসেস রিস্টার্ট করে, সেটি রেডি হওয়া পর্যন্ত বাকি প্রসেসগুলো ট্রাফিক হ্যান্ডেল করে, এরপর পরের প্রসেসটি রিস্টার্ট করে। ফলে কোনো ব্যবহারকারী কখনো ড্রপড কানেকশন দেখতে পায় না।",
          "b": "ফর্ক মোড একটি একক প্রসেস চালায়, ক্লাস্টার মোড সব কোরে প্রসেস স্প্রেড করে। pm2 reload একটার পর একটা প্রসেস ক্রমানুসারে আপডেট করায় কোনো ডাউনটাইম ছাড়াই শূন্য সেকেন্ডে নতুন কোড কার্যকর হয়।",
          "e": "Fork mode runs a single isolated process. Cluster mode utilizes Node's cluster module across all CPU cores. Unlike `pm2 restart` which kills processes simultaneously, `pm2 reload` achieves zero-downtime rolling updates by restarting worker instances sequentially.",
          "code": "module.exports = {\n  apps: [{\n    name: 'dokani-api',\n    script: 'dist/server.js',\n    instances: 'max',\n    exec_mode: 'cluster'\n  }]\n};"
        },
        {
          "lvl": "lvl2",
          "q": "Nginx-এ Reverse Proxy ও WebSocket Proxying কনফিগারেশনে `proxy_set_header Upgrade` কেন দিতে হয়?",
          "m": "HTTP/1.1 প্রোটোকল বাই-ডিফল্ট হপ-বাই-হপ (Hop-by-hop) কানেকশন হিসেবে 'Upgrade' হেডার স্ট্রিপ করে ফেলে। সকেট কানেকশন যখন ব্রাউজার থেকে আসে, ব্রাউজার HTTP থেকে WebSockets-এ আপগ্রেড হতে চায়। Nginx কনফিগারেশনে যদি `proxy_set_header Upgrade $http_upgrade;` এবং `proxy_set_header Connection 'upgrade';` না দেওয়া হয়, Nginx আপগ্রেড হেডারটি ব্যাকএন্ড নোড সার্ভারে পাঠায় না এবং সকেট হ্যান্ডশেক ফেইল করে সাধারণ HTTP লং-পোলিংয়ে ডাউনগ্রেড হয়ে যায়।",
          "b": "ওয়েবসকেট প্রোটোকল আপগ্রেড করার জন্য Upgrade এবং Connection হেডার বাধ্যতামূলক। এনজিনিক্সে এটি সেট না করলে সকেট হ্যান্ডশেক ভেঙে যায় এবং রিয়েল-টাইম কানেকশন ব্যর্থ হয়।",
          "e": "WebSockets initiate via an HTTP handshake containing `Upgrade: websocket`. Because reverse proxies drop hop-by-hop headers by default, Nginx must explicitly forward `proxy_set_header Upgrade $http_upgrade;` and `proxy_set_header Connection 'upgrade';` to preserve the persistent duplex socket.",
          "code": "location /socket.io/ {\n  proxy_pass http://localhost:4000;\n  proxy_http_version 1.1;\n  proxy_set_header Upgrade $http_upgrade;\n  proxy_set_header Connection 'upgrade';\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Docker Volumes কী এবং ডাটাবেজ কনটেইনার রিস্টার্ট হলেও ডেটা হারানো রোধে Named Volumes কীভাবে কাজ করে?",
          "m": "ডকার কনটেইনারের অভ্যন্তরীণ ফাইল সিস্টেম স্বভাবগতভাবে ক্ষণস্থায়ী (Ephemeral)—কনটেইনার মুছে ফেললে বা রিস্টার্ট করলে তার ভেতরের সব ডেটা চিরতরে মুছে যায়। Docker Named Volume হলো হোস্ট ওএস মেশিনের একটি সুরক্ষিত ডিরেক্টরি যা ডকার ইঞ্জিন সরাসরি কনটেইনারের ভেতরের পাথের (`/var/lib/postgresql/data`) সাথে মাউন্ট করে রাখে। কনটেইনার ধ্বংস হলেও সমস্ত ডাটাবেজ রেকর্ড হোস্ট মেশিনের ভলিউমে ১০০% অক্ষত থাকে এবং নতুন কনটেইনার তৎক্ষণাৎ সেই ডেটা দিয়ে রিস্টার্ট হয়।",
          "b": "কন্টেইনার ডিলিট হলে সাধারণ ডেটা মুছে যায়। ডকার ভলিউম হোস্ট মেশিনে স্থায়ী মেমোরি সংরক্ষণ করে, ফলে ডাটাবেজ কন্টেইনার যতবারই রিস্টার্ট বা আপডেট করা হোক না কেন, কোনো তথ্য নষ্ট হয় না।",
          "e": "Docker containers have ephemeral filesystems; deleting a container destroys written data. Docker Named Volumes map designated paths (e.g. `/var/lib/postgresql/data`) directly to persistent host storage, surviving container lifecycles and rebuilds.",
          "code": "services:\n  db:\n    image: postgres:16-alpine\n    volumes:\n      - pgdata:/var/lib/postgresql/data\nvolumes:\n  pgdata:"
        },
        {
          "lvl": "lvl2",
          "q": "Linux UFW (Uncomplicated Firewall) কীভাবে কনফিগার করে শুধুমাত্র প্রয়োজনীয় পোর্ট (22, 80, 443) ছাড়া বাকি সব পোর্ট সুরক্ষিতভাবে ব্লক করবে?",
          "m": "সার্ভারে অননুমোদিত অ্যাক্সেস ও আক্রমণ বন্ধ করতে UFW অত্যন্ত কার্যকর। কনফিগারেশন স্টেপস: (১) ডিফল্ট ইনকামিং ব্লক ও আউটগোয়িং অ্যালাউ: `ufw default deny incoming`, `ufw default allow outgoing`। (২) SSH পোর্ট ওপেন রাখা যাতে নিজেকে লকআউট না করতে হয়: `ufw allow 22/tcp`। (৩) ওয়েব ট্রাফিকের জন্য HTTP ও HTTPS অ্যালাউ করা: `ufw allow 80/tcp`, `ufw allow 443/tcp`। (৪) ইন্টারনাল ডাটাবেজ বা নোড পোর্ট (যেমন 5432 বা 3000) কখনোই পাবলিকে খুলব না। (৫) `ufw enable` দিয়ে ফায়ারওয়াল সক্রিয় করা।",
          "b": "ইউএফডব্লিউ ফায়ারওয়্যালের মাধ্যমে ২২ (SSH), ৮০ (HTTP) এবং ৪৪৩ (HTTPS) ছাড়া অন্য সব পোর্ট ব্লক রাখা হয়। ডাটাবেজ বা নোড পোর্ট বাইরে উন্মুক্ত না রেখে ইন্টারনাল নেটওয়ার্কে আবদ্ধ রাখাই নিরাপদ।",
          "e": "Lock down public exposure with UFW: set default policy to deny incoming, permit outgoing, explicitly whitelist SSH (`ufw allow 22`), HTTP (`80`), and HTTPS (`443`), and enable (`ufw enable`). Keep internal database ports (5432, 27017, 6379) unexposed.",
          "code": "sudo ufw default deny incoming\nsudo ufw allow 22/tcp\nsudo ufw allow 80/tcp\nsudo ufw allow 443/tcp\nsudo ufw enable"
        },
        {
          "lvl": "lvl3",
          "q": "GitHub Actions CI/CD পাইপলাইনে SSH Deploy Keys এবং Docker Compose দিয়ে VPS সার্ভারে অটোমেটেড জিরো-ডাউনটাইম ডেপ্লয়মেন্ট কীভাবে তৈরি করবে?",
          "m": "স্টেপস: (১) ডেভেলপার যখন `main` ব্রাঞ্চে কোড মার্জ করে, GitHub Actions ট্রিগার হয়। (২) CI সার্ভারে টেস্ট, লিন্ট এবং ডকার ইমেজ বিল্ড হয়ে Docker Hub বা GitHub Container Registry-তে পুশ হয়। (৩) `appleboy/ssh-action` ব্যবহার করে গিটহাব সিক্রেটসে থাকা SSH প্রাইভেট কি দিয়ে আমাদের প্রোডাকশন VPS-এ লগইন করে। (৪) সার্ভারে `docker compose pull` দিয়ে নতুন ইমেজ নামায় এবং `docker compose up -d --no-deps --build app` এক্সিকিউট করে। (৫) হেলথ চেক পাস করার পর কনটেইনার স্বয়ংক্রিয়ভাবে ট্রাফিক নেওয়া শুরু করে। পুরো ডেপ্লয়মেন্ট সম্পূর্ণ অটোমেটেড ও মসৃণ।",
          "b": "গিটহাব অ্যাকশনস সিআই পাইপলাইনে টেস্ট পাস হলে ডকার ইমেজ পুশ করা হয়। এরপর এসএসএইচ কি দিয়ে সার্ভারে কানেক্ট করে docker compose pull এবং up চালিয়ে স্বয়ংক্রিয়ভাবে জিরো ডাউনটাইমে নতুন কোড প্রোডাকশনে ডেপ্লয় করা হয়।",
          "e": "The GitHub Actions workflow tests and compiles the build, pushes versioned container images to a registry, and connects to the production VPS via SSH Deploy Keys. Running `docker compose pull && docker compose up -d` executes rolling zero-downtime updates.",
          "code": "- name: Deploy to VPS\n  uses: appleboy/ssh-action@master\n  with:\n    host: ${{ secrets.HOST }}\n    username: deploy\n    key: ${{ secrets.SSH_KEY }}\n    script: cd /var/www/dokani && git pull && docker compose up -d"
        },
        {
          "lvl": "lvl3",
          "q": "Docker Swarm বা Kubernetes ছাড়া সাধারণ Docker Compose সেটআপে কীভাবে Horizontal Scaling (`docker compose up --scale app=4`) এবং Nginx Load Balancing কনফিগার করবে?",
          "m": "আমরা `docker-compose.yml`-এ অ্যাপ সার্ভিসের ফিক্সড হোস্ট পোর্ট বাইন্ডিং (`3000:3000`) বাদ দিয়ে শুধু অভ্যন্তরীণ পোর্ট এক্সপোজ করব (`expose: ['3000']`)। এরপর রান করব: `docker compose up -d --scale app=4`—ডকার ৪টি স্বাধীন অ্যাপ কনটেইনার স্পন করবে। সামনে থাকা Nginx কনটেইনারের কনফিগারেশনে `upstream backend { server app:3000; }` দেওয়া থাকবে। ডকারের বিল্ট-ইন ডিএনএস রাউন্ড-রবিন পদ্ধতিতে সমস্ত ট্রাফিক এই ৪টি অ্যাপ কনটেইনারের মধ্যে স্বয়ংক্রিয়ভাবে লোড ব্যালেন্স করে দেবে।",
          "b": "ডকার কম্পোজে ফিক্সড পোর্ট বাদ দিয়ে expose ব্যবহার করে --scale app=4 দিলে ৪টি অ্যাপ কন্টেইনার চালু হয়। এনজিনিক্স আপস্ট্রিম ব্লকের মাধ্যমে এই ৪টি কন্টেইনারের মধ্যে ট্রাফিক রাউন্ড-রবিন পদ্ধতিতে লোড ব্যালেন্স করে।",
          "e": "Scale container replicas without Kubernetes by removing static host port mappings and executing `docker compose up -d --scale app=4`. Configure Nginx with an `upstream backend { server app:3000; }` block, utilizing Docker's internal DNS round-robin engine to balance requests across workers.",
          "code": "upstream backend {\n  server app:3000;\n}\nserver {\n  location / { proxy_pass http://backend; }\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Linux cgroups এবং Docker Resource Limits (`cpus`, `memory`): কীভাবে একটি মেমোরি-হাংরি নোড প্রসেস পুরো সার্ভার ক্র্যাশ করা থেকে আটকাবে?",
          "m": "যদি কোনো মেমোরি লিমিট না দেওয়া থাকে এবং নোড অ্যাপে মেমোরি লিক হয়, তবে এটি হোস্ট সার্ভারের সমস্ত ১৬GB RAM দখল করে ফেলবে এবং লিনাক্স OOM Killer স্বয়ংক্রিয়ভাবে ডাটাবেজ বা SSH ডেমন প্রসেসকে মেরে সার্ভার সম্পূর্ণ আনরিচেবল করে দেবে। সমাধান: `docker-compose.yml`-এ আমরা কঠোর রিসোর্স লিমিট দেব: `deploy.resources.limits: { cpus: '1.5', memory: '1024M' }`। যদি নোড অ্যাপ ১GB RAM ক্রস করে, তবে শুধুমাত্র ওই একটি নির্দিষ্ট কনটেইনার রিস্টার্ট হবে, কিন্তু পুরো ওএস ও ডেটাবেজ সার্ভার সম্পূর্ণ নিরাপদ থাকবে।",
          "b": "ডকারে রিসোর্স লিমিট না দিলে নোড অ্যাপ পুরো সার্ভারের সব র্যাম দখল করে সার্ভার ক্র্যাশ করিয়ে দিতে পারে। deploy.resources.limits দিয়ে ১ জিবি মেমোরি ও ১.৫ সিপিইউ নির্ধারণ করে দিলে কোনো সমস্যা হলেও মূল হোস্ট সার্ভার অক্ষত থাকে।",
          "e": "Unbounded containers consume entire host RAM under leaks, provoking the Linux OOM Killer to terminate mission-critical processes like Postgres or SSH. Enforce strict cgroups resource caps in docker-compose (`deploy.resources.limits.memory: 1G`) to isolate failures to container boundaries.",
          "code": "deploy:\n  resources:\n    limits:\n      cpus: '2.0'\n      memory: 2048M"
        },
        {
          "lvl": "lvl3",
          "q": "Nginx Gzip এবং Brotli Compression কীভাবে কনফিগার করবে যাতে এপিআই JSON রেসপন্স সাইজ ৮০% কমে যায়?",
          "m": "JSON রেসপন্সে প্রচুর রিপিটিটিভ ফিল্ডের নাম থাকে যা কম্প্রেশনের জন্য পারফেক্ট। Nginx-এ আমরা `gzip on;` এবং আরও আধুনিক `brotli on;` এনাবল করি। গুরুত্বপূর্ণ কনফিগ: (১) `gzip_types application/json text/plain text/css application/javascript;`। (২) `gzip_min_length 1024;` (১KB-এর ছোট ডেটাতে কম্প্রেশন ওভারহেড এড়ানো)। (৩) `gzip_comp_level 6;` (সিপিইউ ও কম্প্রেশন রেশিওর পারফেক্ট ব্যালেন্স)। এর ফলে ১MB-র বড় সেলস রিপোর্ট JSON ক্লায়েন্টে মাত্র ১৫০KB হয়ে নিমেষে ডাউনলোড হয়।",
          "b": "এনজিনিক্সে জিজিপ (Gzip) এবং ব্রটলি (Brotli) সক্রিয় করে JSON ও টেক্সট রেসপন্স কমপ্রেস করা হয়। comp_level ৬ নির্ধারণ করলে সিপিইউর ওপর অতিরিক্ত চাপ না ফেলে ডাটার আকার ৮০% কমিয়ে চোখের পলকে নেটওয়ার্ক রেসপন্স দেওয়া সম্ভব হয়।",
          "e": "Configure Nginx Gzip/Brotli compression: specify `gzip_types application/json application/javascript text/css;`, set threshold `gzip_min_length 1024;`, and balance compression efficiency via `gzip_comp_level 6;`. This slashes JSON payload transfer sizes by up to 80%.",
          "code": "gzip on;\ngzip_comp_level 6;\ngzip_min_length 1024;\ngzip_types application/json text/plain text/css;"
        },
        {
          "lvl": "lvl3",
          "q": "Docker Security Best Practices: কেন কনটেইনারে কখনোই `root` ইউজার হিসেবে কোড রান করা যাবে না এবং `USER node` কীভাবে কার্যকর করবে?",
          "m": "যদি কোনো কনটেইনার বাই-ডিফল্ট `root` ইউজার হিসেবে চলে এবং আক্রমণকারী কোডে রিমোট কোড এক্সিকিউশন (RCE) বা কন্টেইনার এসকেপ ভালনারেবিলিটি পায়, তবে সে সরাসরি হোস্ট মেশিনের রুট প্রিভিলেজ পেয়ে পুরো সার্ভারের নিয়ন্ত্রণ নিয়ে নেবে। সেরা প্র্যাকটিস: Dockerfile-এর শেষে `USER node` (বা নন-রুট ইউজার) ঘোষণা করা। সাথে ফাইল পারমিশনে `chown -R node:node /app` নিশ্চিত করা। এর ফলে হ্যাকার কনটেইনারে ঢুকলেও কোনো সিস্টেম ফাইল মডিফাই বা হোস্ট মেশিনে এস্কেপ করতে পারবে না।",
          "b": "কন্টেইনারে রুট ইউজার হিসেবে চললে নিরাপত্তা ঝুঁকি থাকে কারণ কোনো আক্রমণকারী হোস্ট সার্ভারের রুট নিয়ন্ত্রণ পেয়ে যেতে পারে। ডকারফাইলে USER node নির্দেশ করে নন-রুট ব্যবহারকারী হিসেবে অ্যাপ চালানো বাধ্যতামূলক সিকিউরিটি স্ট্যান্ডার্ড।",
          "e": "Running containers as root enables attackers exploiting RCE vulnerabilities to achieve root privileges on the underlying host kernel via container breakouts. Mitigate by dropping root privileges: declare a non-root user via `USER node` in the Dockerfile after adjusting file ownerships.",
          "code": "RUN chown -R node:node /app\nUSER node\nCMD [\"node\", \"dist/server.js\"]"
        },
        {
          "lvl": "situation",
          "q": "প্রোডাকশন ডেপ্লয়মেন্টের ঠিক পর Nginx `502 Bad Gateway` এরর দেখাচ্ছে এবং কোনো পেজ ওপেন হচ্ছে না। কীভাবে ধাপে ধাপে ট্রাবলশুট করবে?",
          "m": "ট্রাবলশুটিং স্টেপস: `502 Bad Gateway` মানে হলো Nginx জীবিত আছে কিন্তু তার পেছনের ব্যাকএন্ড নোড সার্ভার বন্ধ বা সাড়া দিচ্ছে না। (১) প্রথমে চেক করব নোড প্রসেস চলছে কি না: `pm2 status` অথবা `docker ps`। (২) যদি নোড ক্র্যাশ করে থাকে, লগ চেক করব: `pm2 logs` বা `docker logs <container_id>` (সাধারণত এনভায়রনমেন্ট ভ্যারিয়েবল মিসিং বা ডাটাবেজ কানেকশন ফেইল্ড কারণে ক্র্যাশ করে)। (৩) Nginx কনফিগারেশনের `proxy_pass http://localhost:PORT` এবং নোড অ্যাপ যে পোর্টে শুনছে তা হুবহু এক কি না পরীক্ষা করব। (৪) Nginx এরর লগ দেখব: `tail -n 50 /var/log/nginx/error.log`।",
          "b": "৫০২ ব্যাড গেটওয়ে মানে এনজিনিক্সের পেছনের নোড সার্ভার বন্ধ। pm2 status বা ডকার লগ পরীক্ষা করে ক্র্যাশের কারণ দেখতে হবে এবং proxy_pass এ উল্লেখিত পোর্টের সাথে নোড অ্যাপের পোর্ট মিলিয়ে সমাধান করতে হবে।",
          "e": "HTTP 502 indicates Nginx cannot establish a socket connection with the upstream Node application. Verify the Node runtime via `pm2 status` or `docker ps`, inspect runtime exceptions via `pm2 logs`, confirm matching localhost ports in Nginx's `proxy_pass`, and check `/var/log/nginx/error.log`.",
          "code": "sudo tail -f /var/log/nginx/error.log\npm2 logs --lines 100"
        },
        {
          "lvl": "situation",
          "q": "একটি ডকার কনটেইনার ব্যাকগ্রাউন্ডে অনবরত রিস্টার্ট লুপে আটকে গেছে (CrashLoopBackOff)। কীভাবে এর কারণ উদঘাটন করবে?",
          "m": "যেহেতু কনটেইনার ক্র্যাশ হওয়া মাত্র বন্ধ হয়ে যাচ্ছে, তাই সরাসরি ভেতরে ঢোকা যায় না। সমাধান: (১) কনটেইনারের এক্সিট লগ দেখব: `docker logs --tail 100 <container_id>`। (২) যদি কোনো এরর লগ না থাকে, তবে কনটেইনারটিকে ওভাররাইড কমান্ড সহ ইন্টারেক্টিভ মোডে চালাব: `docker run -it --entrypoint sh <image_name>`। (৩) সাধারণত এর কারণ হয়: মিসিং `.env` ভ্যারিয়েবল, ডাটাবেজ হোস্ট অমিল, অথবা ফাইল পাথ ভুল থাকা। ত্রুটি সংশোধন করে নতুন ইমেজ বিল্ড করব।",
          "b": "ক্র্যাশ লুপের কারণ জানতে docker logs দিয়ে সর্বশেষ লগ দেখতে হবে। কন্টেইনারের শেলের ভেতর ঢুকতে docker run -it --entrypoint sh চালিয়ে পরিবেশ ভেরিয়েবল ও ফাইলের পাথ পরীক্ষা করে সমাধান নিশ্চিত করতে হবে।",
          "e": "Diagnose CrashLoopBackOff loops by checking logs via `docker logs --tail 100 <id>`. If it exits silently, override the entrypoint to launch an interactive debugging shell (`docker run -it --entrypoint sh <image>`), inspecting runtime env vars and file permissions.",
          "code": "docker logs --tail 50 --timestamps dokani-api-container"
        },
        {
          "lvl": "situation",
          "q": "সার্ভারে মেমোরি লিকের কারণে PM2 প্রসেস মেমোরি ১.৫GB ছাড়িয়ে যাচ্ছে এবং সার্ভার স্লো হয়ে পড়ছে। PM2 দিয়ে অটো-হিলিং কীভাবে কনফিগার করবে?",
          "m": "সমাধান: আমরা PM2 এর ইকোসিস্টেম ফাইলে `max_memory_restart` অপশন কনফিগার করব: `max_memory_restart: '1000M'`। এর ফলে যখনই কোনো নির্দিষ্ট নোড প্রসেসের মেমোরি ১GB অতিক্রম করবে, PM2 সম্পূর্ণ নিরবে ব্যাকগ্রাউন্ডে ওই প্রসেসটিকে রিস্টার্ট করে মেমোরি শূন্য করে ফ্রেশ করে দেবে—অন্যান্য প্রসেসগুলো চলমান থাকায় ক্লায়েন্ট কোনো ডাউনটাইম অনুভব করবে না। একই সাথে মেমোরি লিকের স্থায়ী কারণ খুঁজে বের করার জন্য হিপ স্ন্যাপশট ইনভেস্টিগেশন চালাব।",
          "b": "পিএম২ ইকোসিস্টেমে max_memory_restart: '1000M' নির্ধারণ করে দিলে প্রসেসের মেমোরি ১ জিবি ছাড়িয়ে গেলেই পিএম২ নিজে থেকেই প্রসেসটি রিস্টার্ট করে মেমোরি ক্লিন করে দেয়, কোনো ডাউনটাইম ছাড়াই।",
          "e": "Configure automatic self-healing in PM2 via `max_memory_restart: '1024M'`. Whenever a worker leaks beyond 1GB RAM, PM2 reloads that specific worker transparently while peer cluster workers absorb incoming connections seamlessly.",
          "code": "module.exports = { apps: [{ name: 'api', script: 'dist/server.js', max_memory_restart: '1G' }] };"
        },
        {
          "lvl": "situation",
          "q": "উবুন্টু সার্ভারে এনজিনিক্স কনফিগারেশনে সিনট্যাক্স ভুল থাকায় `nginx -s reload` দিলে সার্ভার ডাউন হওয়ার ঝুঁকি রয়েছে। নিরাপদ রিলোড স্ট্র্যাটেজি কী?",
          "m": "কখনোই টেস্ট না করে সরাসরি Nginx রিলোড বা রিস্টার্ট দেওয়া যাবে না! নিরাপদ পদ্ধতি: সবসময় আগে `sudo nginx -t` চালাব। এটি কনফিগারেশন ফাইলের প্রতিটি লাইন টেস্ট করে এবং সিনট্যাক্স সঠিক থাকলে `syntax is ok / test is successful` জানায়। শুধুমাত্র এবং শুধুমাত্র তখনই `sudo systemctl reload nginx` চালাব। এতে কোনো ভুল কনফিগারেশনের কারণে লাইভ সার্ভার বন্ধ হওয়ার কোনো সুযোগ থাকে না।",
          "b": "এনজিনিক্স রিলোড করার আগে অবশ্যই sudo nginx -t চালিয়ে সিনট্যাক্স যাচাই করতে হবে। টেস্ট সফল হলেই কেবল systemctl reload nginx চালানো নিরাপদ।",
          "e": "Never reload Nginx blindly. Always execute `sudo nginx -t` first to validate configuration syntax. Only reload the live service via `sudo systemctl reload nginx` after receiving positive syntax test affirmations, preventing production outages.",
          "code": "sudo nginx -t && sudo systemctl reload nginx"
        },
        {
          "lvl": "situation",
          "q": "VPS সার্ভারে SSH পোর্ট ২২-এ প্রতি মিনিটে হাজার হাজার অবৈধ লগইন চেষ্টা (Brute-Force) হচ্ছে। কীভাবে সার্ভারকে সুরক্ষিত করবে?",
          "m": "সুরক্ষা স্টেপস: (১) ডিফল্ট পোর্ট ২২ পরিবর্তন করে একটি কাস্টম হাই-পোর্ট (যেমন ৪২২২) দেব (`/etc/ssh/sshd_config`-এ `Port 4222`)। (২) পাসওয়ার্ড বেসড লগইন সম্পূর্ণ নিষিদ্ধ করব: `PasswordAuthentication no` (শুধুমাত্র SSH Key ভিত্তিক লগইন অ্যালাউ করব)। (৩) `Fail2ban` ইন্সটল ও কনফিগার করব—এটি ৩ বার ভুল লগইন চেষ্টা করা যে কোনো আইপিকে স্বয়ংক্রিয়ভাবে ২৪ ঘণ্টার জন্য ফায়ারওয়ালে ড্রপ করে ব্যান করে দেবে।",
          "b": "এসএসএইচ ব্রুট ফোর্স ঠেকাতে পাসওয়ার্ড লগইন বন্ধ করে শুধুমাত্র এসএসএইচ কি অনুমোদন করতে হবে। ডিফল্ট পোর্ট ২২ পরিবর্তন করতে হবে এবং Fail2ban দিয়ে ভুল পাসওয়ার্ড দেওয়া আক্রমণকারী আইপি স্বয়ংক্রিয় ব্যান করতে হবে।",
          "e": "Harden SSH by disabling password authentication (`PasswordAuthentication no`), enforcing cryptographic SSH keypairs exclusively, changing default port 22 to an arbitrary high port, and deploying `fail2ban` to automatically ban abusive IPs.",
          "code": "# /etc/ssh/sshd_config\nPasswordAuthentication no\nPubkeyAuthentication yes\nPort 4222"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর ব্যাকএন্ড এপিআই ক্লাস্টার উবুন্টু VPS-এ PM2, Nginx ও Let's Encrypt SSL সহ প্রোডাকশনে কীভাবে ডিপ্লয় করেছিলে?",
          "m": "আমাদের আর্কিটেকচার ছিল: (১) DigitalOcean উবুন্টু VPS সার্ভারে Node.js, PM2 এবং Nginx সেটআপ। (২) PM2 Cluster Mode-এ নোড এপিআই রান করত (`pm2 start ecosystem.config.js -i max`), যা সার্ভারের সমস্ত সিপিইউ কোর ব্যবহার করত। (৩) Nginx রিভার্স প্রক্সি হিসেবে পোর্ট ৮০ ও ৪৪৩ হ্যান্ডেল করত এবং পোর্ট ৪০০০-এ নোড ক্লাস্টারে ট্রাফিক ফরওয়ার্ড করত। (৪) `certbot --nginx -d api.dokani.com` দিয়ে স্বয়ংক্রিয় Let's Encrypt SSL সার্টিফিকেট ইন্সটল এবং অটো-রিনিউ ক্রন কনফিগার করেছিলাম।",
          "b": "দোকানি সার্ভারে আমরা উবুন্টু ভিপিএসে পিএম২ ক্লাস্টার মোডে নোড অ্যাপ চালিয়েছিলাম। সামনে এনজিনিক্স রিভার্স প্রক্সি হিসেবে ট্রাফিক রুট করত এবং সার্টবট (Certbot) দিয়ে লেটস এনক্রিপ্ট এসএসএল সার্টিফিকেট স্বয়ংক্রিয়ভাবে সক্রিয় ছিল।",
          "e": "Deployed Dokani POS backend on Ubuntu VPS: PM2 managed clustered Node processes utilizing all CPU cores, fronted by Nginx as the edge reverse proxy, with SSL managed via automated Certbot Let's Encrypt certificate auto-renewals.",
          "tip": "PM2 Cluster Mode + Nginx Reverse Proxy + Certbot SSL হলো নোড জেএস উৎপাদনের সবচেয়ে স্ট্যাবল ও প্রশংসিত স্ট্যাক।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর ডাটাবেজ ব্যাকআপ ও ডিজাস্টার রিকভারি: প্রতিদিন ভোর ৪টায় অটোমেটেড PostgreSQL ব্যাকআপ কীভাবে কনফিগার করেছিলে?",
          "m": "আমরা একটি অটোমেটেড লিনাক্স ব্যাশ স্ক্রিপ্ট (`backup.sh`) লিখে ক্রন জবে (`crontab -e: 0 4 * * *`) শিডিউল করেছিলাম। স্ক্রিপ্টটি: (১) `pg_dump` দিয়ে ডাটাবেজ ডাম্প করত, (২) `gzip` দিয়ে কম্প্রেস করত, (৩) AWS CLI দিয়ে সরাসরি এনক্রিপ্টেড S3 বাকেটে আপলোড করত, (৪) টেলিগ্রাম বটে সাকসেস নোটিফিকেশন পাঠাত, (৫) লোকাল ডিস্ক থেকে ৭ দিনের পুরানো ব্যাকআপ ডিলিট করত। ফলে কোনো হার্ডওয়্যার ফেইলিওর হলেও ৩০ মিনিটের মধ্যে সম্পূর্ণ ডাটাবেজ রিস্টোর করা সম্ভব ছিল।",
          "b": "দোকানি সিস্টেমে প্রতিদিন ভোর ৪টায় ক্রন জবের মাধ্যমে pg_dump দিয়ে ব্যাকআপ তৈরি করে জিপ কম্প্রেস করে অ্যামাজন এসথ্রিতে আপলোড করা হতো। সফল হলে টেলিগ্রামে মেসেজ আসত, যা সম্পূর্ণ স্বয়ংক্রিয় ব্যাকআপ সুরক্ষা নিশ্চিত করেছিল।",
          "e": "Automated daily Dokani database backups via a cron script running at 4 AM: invoking `pg_dump`, compressing via `gzip`, shipping archives to encrypted AWS S3 buckets, and dispatching completion telemetry to team Slack channels.",
          "code": "0 4 * * * /var/scripts/backup.sh >> /var/log/backup.log 2>&1"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে ভিডিও স্ট্রিমিং ও এপিআই ট্রাফিকের জন্য Nginx Caching এবং Rate Limiting কীভাবে অপটিমাইজ করেছিলে?",
          "m": "আমরা Nginx-এ একটি মেমোরি জোন ভিত্তিক ক্যাশ কনফিগার করেছিলাম: `proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=api_cache:10m max_size=1g inactive=60m`। কোর্স সিলেবাস ও পাবলিক এপিআইতে `proxy_cache api_cache; proxy_cache_valid 200 10m;` দিয়ে ১০ মিনিটের জন্য ক্যাশ রাখতাম। সাথে বট অ্যাটাক ও ভিডিও স্ক্র্যাপিং ঠেকাতে `limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s` এনফোর্স করেছিলাম। এর ফলে ৯৫% ট্রাফিক Nginx মেমোরি থেকেই সার্ভ হতো এবং নোড ব্যাকএন্ড সম্পূর্ণ রিল্যাক্সড ছিল।",
          "b": "পিটিটিএবিডিতে আমরা এনজিনিক্স প্রক্সি ক্যাশ ব্যবহার করে পাবলিক এপিআই রেসপন্স ১০ মিনিটের জন্য মেমরিতে ক্যাশ করেছিলাম এবং রেট লিমিটিং দিয়ে স্ক্র্যাপিং আটকেছিলাম। ফলে ৯৫% রিকোয়েস্ট সরাসরি এনজিনিক্স থেকেই ডেলিভারি হয়েছিল।",
          "e": "Configured Nginx memory-backed proxy caching for read-heavy PTTABD endpoints (`proxy_cache_valid 200 10m`), complemented by IP-rate-limiting zones (`limit_req_zone rate=10r/s`) to deflect scraping bots while serving 95% of requests from Nginx cache.",
          "code": "limit_req_zone $binary_remote_addr zone=api_limit:10m rate=20r/s;\nlocation /api/courses/ {\n  limit_req zone=api_limit burst=10 nodelay;\n  proxy_cache api_cache;\n}"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর মাল্টি-টেন্যান্ট SaaS অ্যাপ্লিকেশনে Docker Compose দিয়ে ডেভেলপমেন্ট ও স্টেজিং পরিবেশ কীভাবে ১ ক্লিকে রেডি করেছিলে?",
          "m": "নতুন ডেভেলপাররা যাতে ২ ঘণ্টায় সব সেটআপ করতে পারে, সেজন্য আমরা একটি সিঙ্গেল `docker-compose.yml` বানিয়েছি। এতে ৪টি সার্ভিস ছিল: (১) `api`: নোড এক্সপ্রেস ব্যাকএন্ড (হট-রিলোড ভলিউম মাউন্ট সহ), (২) `db`: PostgreSQL ১৬, (৩) `cache`: Redis ৭, (৪) `mailhog`: লোকাল ইমেইল টেস্টিং এসএমটিপি। একজন নতুন ডেভেলপার ক্লোন করে শুধু `docker compose up -d` দিলে সম্পূর্ণ মাল্টি-টেন্যান্ট SaaS সিস্টেম তার মেশিনে লাইভ হয়ে যেত—কোনো ম্যানুয়াল কনফিগারেশন ছাড়াই।",
          "b": "টিম অনবোর্ডিং সহজ করতে আমরা ডকার কম্পোজ দিয়ে এক ক্লিকে সম্পূর্ণ ডেভেলপমেন্ট এনভায়রনমেন্ট তৈরি করেছিলাম। নোড এপিআই, পোস্টগ্রেস ও রেডিস স্বয়ংক্রিয়ভাবে প্রস্তুত হয়ে নতুন ডেভেলপারের সময় সাশ্রয় করেছিল।",
          "e": "Engineered single-click developer onboarding via docker-compose encapsulating the Express API with hot-reload volume mounts, PostgreSQL, Redis, and MailHog. New hires run `docker compose up -d` to spin up the entire multi-tenant stack in 60 seconds.",
          "tip": "এক ক্লিকে ডকার কম্পোজ দিয়ে পুরো সিস্টেম চালুর অভিজ্ঞতা সিনিয়র ডেভঅপ্স ম্যাচিউরিটির পরিচায়ক।"
        },
        {
          "lvl": "realworld",
          "q": "উচ্চগতির উৎপাদন পরিবেশে সার্ভার স্কেলিং ও হেলথ মনিটরিংয়ে তোমার আর্কিটেকচারাল চেকলিস্ট কী?",
          "m": "আমার প্রোডাকশন চেকলিস্ট: (১) কোনো সিঙ্গেল পয়েন্ট অব ফেইলিওর না রাখা (Redundant nodes)। (২) Nginx রিভার্স প্রক্সি এবং UFW ফায়ারওয়াল এনফোর্স করা। (৩) PM2 বা ডকার দিয়ে অটো-হিলিং এবং রিসোর্স লিমিট নিশ্চিত করা। (৪) Prometheus এবং Grafana দিয়ে সিপিইউ, মেমোরি ও ইভেন্ট লুপ ল্যাগ মনিটর করা। (৫) প্রতিদিনের অফ-সাইট ডেটাবেজ ব্যাকআপ ও টেস্টেড রিস্টোরেশন স্ক্রিপ্ট নিশ্চিত করা।",
          "b": "আমার উৎপাদন চেকলিস্টে রয়েছে: রিভার্স প্রক্সি ও ফায়ারওয়াল নিরাপত্তা, অটো-হিলিং প্রসেস ম্যানেজমেন্ট, প্রমিথিউস ও গ্রাফানা মনিটরিং এবং প্রতিদিনের স্বয়ংক্রিয় অফ-সাইট ডাটাবেজ ব্যাকআপ।",
          "e": "My production scaling and resilience checklist: (1) Nginx reverse proxy with SSL termination & UFW firewalling, (2) Self-healing container processes bounded by cgroup limits, (3) Real-time Prometheus metrics & event loop latency alerting, (4) Zero-downtime rolling reload deployments, and (5) Automated off-site database backups with verified disaster recovery pipelines.",
          "tip": "এই সংক্ষিপ্ত ও আত্মবিশ্বাসী চেকলিস্টটি ইন্টারভিউয়ারকে তোমার পূর্ণাঙ্গ ব্যাকএন্ড ও ডেভঅপ্স দক্ষতার ওপর শতভাগ আস্থা এনে দেবে।"
        }
      ]
    }
  ]
};
