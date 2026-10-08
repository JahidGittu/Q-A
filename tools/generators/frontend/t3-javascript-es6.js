// Topic 3: JavaScript (ES6+) & Web Core (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "javascript-es6-web",
  name: "JavaScript (ES6+) & Web Core",
  desc: "ES6+ Features, Closures, Scopes, Prototypes, Event Loop, Promises, Async/Await, Web APIs, Memory Management",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "JavaScript-এ `var`, `let`, এবং `const`-এর মধ্যে মূল পার্থক্য কী?",
      m: "`var` হলো Function-scoped এবং এটি উইন্ডো অবজেক্টে অ্যাটাচ হয় ও Hoisting-এর সময় `undefined` দিয়ে ইনিশিয়ালাইজ হয়, যা বাগে ফেলে। আর `let` এবং `const` হলো Block-scoped (`{}`) এবং এগুলো Hoisting হলেও ইনিশিয়ালাইজেশনের আগ পর্যন্ত Temporal Dead Zone (TDZ)-এ থাকে। `let`-এর মান পরবর্তীতে রি-অ্যাসাইন করা যায়, কিন্তু `const`-এর ভ্যারিয়েবল রেফারেন্স রি-অ্যাসাইন করা যায় না।",
      b: "var ফাংশন-স্কোপড এবং এটি হোইস্টিংয়ের শিকার হয়ে আনডিফাইন্ড ভ্যালু পায়। অন্যদিকে let এবং const ব্লক-স্কোপড এবং এরা টেম্পোরাল ডেড জোন (TDZ) মেনে চলে। let এর মান পরিবর্তন করা গেলেও const দিয়ে ঘোষিত ভ্যারিয়েবলের মান পুনঃনির্ধারণ করা যায় না।",
      e: "var is function-scoped and hoisted with undefined initialization. let and const are block-scoped and live in the Temporal Dead Zone (TDZ) prior to declaration. let variables can be reassigned, whereas const bindings are immutable.",
      tip: "কখনোই var ব্যবহার করবে না; সবসময় const ডিফল্ট এবং পরিবর্তনশীল মানে let ব্যবহার করবে।"
    },
    {
      lvl: "lvl1",
      q: "JavaScript Closure কী এবং বাস্তব প্রজেক্টে এর একটি সহজ উদাহরণ দাও?",
      m: "Closure হলো এমন একটি মেকানিজম যেখানে একটি ইনার ফাংশন তার আউটার ফাংশন এক্সিকিউট হয়ে শেষ হয়ে যাওয়ার পরেও আউটার ফাংশনের ভ্যারিয়েবল স্কোপ মনে রাখে এবং অ্যাক্সেস করতে পারে। যেমন: প্রাইভেট কাউন্টার ভ্যারিয়েবল তৈরি করতে বা ডেটা হাইড করতে ক্লোজার ব্যবহার করা হয়।",
      b: "ক্লোজার হলো জাভাস্ক্রিপ্টের এমন একটি বৈশিষ্ট্য যেখানে একটি অভ্যন্তরীণ ফাংশন তার বাইরের ফাংশনের স্কোপ শেষ হয়ে যাওয়ার পরেও সেই স্কোপের চলকগুলোকে মেমরিতে ধরে রাখতে ও ব্যবহার করতে পারে। ডাটা প্রাইভেসি এবং কাস্টম ফাংশন তৈরিতে ক্লোজার অপরিহার্য।",
      e: "A closure is the combination of a function bundled together with references to its surrounding lexical environment. It gives an inner function access to an outer function's scope even after the outer function has returned.",
      code: "function createCounter() {\n  let count = 0; // Private variable via closure\n  return () => ++count;\n}\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2"
    },
    {
      lvl: "lvl1",
      q: "Arrow Function এবং Regular Function-এর মধ্যে `this` কিওয়ার্ড কীভাবে ভিন্নভাবে আচরণ করে?",
      m: "Regular Function-এ `this` নির্ধারিত হয় ফাংশনটি 'কীভাবে কল করা হয়েছে' তার ওপর (Dynamic Scoping)। কিন্তু Arrow Function-এর নিজস্ব কোনো `this` বা `arguments` অবজেক্ট থাকে না; এটি তার আশপাশের লেক্সিক্যাল স্কোপ (Lexical Scope) থেকে প্যারেন্টের `this` ধার করে। একারণে ইভেন্ট লিসেনার বা কলব্যাকে অ্যারো ফাংশন ব্যবহার করলে `this` লস্ট হওয়ার ভয় থাকে না।",
      b: "রেগুলার ফাংশনে this এর মান রানটাইমে ফাংশন কলিং কনটেক্সটের ওপর নির্ভর করে পরিবর্তিত হয়। অন্যদিকে অ্যারো ফাংশনের নিজস্ব this থাকে না; এটি তার চারপাশের লেক্সিক্যাল পরিবেশ থেকে this এর মান গ্রহণ করে।",
      e: "Regular functions define this based on how and where they are invoked (dynamic binding). Arrow functions do not bind their own this; instead, they capture the this value of the enclosing lexical execution context.",
      code: "const obj = {\n  name: 'Dokani',\n  greet: function() { setTimeout(() => console.log(this.name), 100); }\n};\nobj.greet(); // Logs 'Dokani'"
    },
    {
      lvl: "lvl1",
      q: "JavaScript-এ `==` (Loose Equality) এবং `===` (Strict Equality)-এর মধ্যে পার্থক্য কী?",
      m: "`==` তুলনা করার আগে দুটি অপারেন্ডকে টাইপ কনভার্সন (Type Coercion বা কাস্টিং) করে সমান করার চেষ্টা করে, যেমন `5 == '5'` সত্য (true) রিটার্ন করে। আর `===` কোনো টাইপ কনভার্সন করে না; মান এবং ডেটা টাইপ দুটোই হুবহু এক হতে হয়, তাই `5 === '5'` মিথ্যা (false) রিটার্ন করে।",
      b: "ডাবল সমান (==) অপারেন্ড দুটির টাইপ রূপান্তর বা টাইপ কোরশন করে মান পরীক্ষা করে। ট্রিপল সমান (===) কঠোর সমতা রক্ষা করে, অর্থাৎ মান এবং ডেটা টাইপ উভয়ই অভিন্ন না হলে সত্য ফলাফল দেয় না।",
      e: "The loose equality operator (==) performs implicit type coercion prior to comparison (e.g. 0 == false is true). The strict equality operator (===) compares both value and data type without coercion, making it safer and deterministic.",
      tip: "প্রোডাকশন কোডে সবসময় ট্রিপল সমান (===) ব্যবহার করা স্ট্যান্ডার্ড ইন্ডাস্ট্রি প্র্যাকটিস।"
    },
    {
      lvl: "lvl1",
      q: "Array Methods: `map`, `filter`, এবং `reduce`-এর মধ্যে মৌলিক পার্থক্য কী?",
      m: "`map` অ্যারের প্রতিটি উপাদানকে ট্রান্সফর্ম করে একই লেন্থের নতুন অ্যারে দেয়। `filter` শর্ত পূরণকারী উপাদানগুলোকে নিয়ে ছোট বা সমান দৈর্ঘ্যের নতুন অ্যারে দেয়। আর `reduce` পুরো অ্যারের উপাদানগুলোকে একটি মাত্র ফলাফলে (যেমন মোট যোগফল, অবজেক্ট বা গ্রুপিং) রূপান্তর করে। কোনোটিই মূল অ্যারেকে মিউটেট করে না।",
      b: "map প্রতিটি উপাদানের ওপর ফাংশন চালিয়ে নতুন সমদৈর্ঘ্যের অ্যারে তৈরি করে। filter শর্তযুক্ত সত্য উপাদান নিয়ে ফিল্টার করা অ্যারে প্রদান করে। reduce পুরো অ্যারের মানগুলো একত্রিত করে একটি চূড়ান্ত ফলাফল রিটার্ন করে।",
      e: "map transforms every element into a new array of identical length. filter returns a subset array matching a predicate. reduce folds the array elements into a single accumulated result (e.g., number, object, or grouped dictionary).",
      code: "const total = [10, 20, 30].reduce((acc, curr) => acc + curr, 0); // 60"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "JavaScript Event Loop কীভাবে Call Stack, Web APIs, Task Queue, এবং Microtask Queue পরিচালনা করে?",
      m: "কল স্ট্যাকে সিনক্রোনাস কোড একটার পর একটা এক্সিকিউট হয়। কোনো অ্যাসিনক্রোনাস কাজ আসলে (যেমন fetch, setTimeout) তা Web APIs ব্যাকগ্রাউন্ডে হ্যান্ডেল করে। কাজ শেষ হলে setTimeout যায় Task/Macrotask Queue-তে, আর Promises (`.then`), MutationObserver এবং `queueMicrotask` যায় Microtask Queue-তে। কল স্ট্যাক খালি হলে ইভেন্ট লুপ আগে মাইক্রোটাস্ক কিউ-এর সব কাজ শেষ করে, তারপর ম্যাক্রোটাস্ক কিউ থেকে একটি কাজ তোলে।",
      b: "ইভেন্ট লুপ হলো জাভাস্ক্রিপ্টের নন-ব্লকিং অ্যাসিনক্রোনাস হৃদপিণ্ড। কল স্ট্যাক ফাঁকা হলে এটি প্রথমে মাইক্রোটাস্ক কিউ (প্রমিজ) এর কাজগুলো সম্পন্ন করে এবং এরপর ম্যাক্রোটাস্ক কিউ (সেটটাইমআউট) এর কাজগুলো স্ট্যাকে তুলে দেয়।",
      e: "The Event Loop monitors the Call Stack and task queues. When the stack clears, it drains all jobs from the Microtask Queue (Promise callbacks, queueMicrotask) before processing the next pending task from the Macrotask Queue (setTimeout, I/O events).",
      tip: "Promise সবসময় setTimeout-এর আগে এক্সিকিউট হয় কারণ Microtask Queue-এর প্রায়োরিটি বেশি।"
    },
    {
      lvl: "lvl2",
      q: "`Promise.all`, `Promise.allSettled`, `Promise.race`, এবং `Promise.any`-এর ব্যবহারের ক্ষেত্র কী?",
      m: "(১) `Promise.all`: সবগুলো সফল হতে হবে, একটা ফেইল করলেই পুরোটা ফেইল (সব প্যারালাল ফেচের জন্য)। (২) `Promise.allSettled`: সবগুলো রেজাল্ট শেষ হওয়া পর্যন্ত অপেক্ষা করে, ফেইল বা পাস যাই হোক প্রতিটার স্ট্যাটাস অবজেক্ট দেয় (ব্যাচ রিপোর্ট তৈরিতে)। (৩) `Promise.race`: যে প্রমিজটি সবার আগে সেটল হবে (পাস বা ফেইল) তার রেজাল্ট দেয় (টাইমআউট ট্র্যাকিংয়ে)। (৪) `Promise.any`: সবার প্রথম যে কোনো একটি সফল (resolve) হলেই রিটার্ন করে, সবগুলো ফেইল করলে AggregateError দেয়।",
      b: "Promise.all সবগুলো সফলতার ওপর নির্ভরশীল। Promise.allSettled সাফল্য বা ব্যর্থতা নির্বিশেষে সবগুলোর চূড়ান্ত রিপোর্ট দেয়। Promise.race দ্রুততম ফিনিশ হওয়া ফলাফল নেয়। Promise.any প্রথম সফল হওয়া প্রমিজকে গ্রহণ করে।",
      e: "Promise.all fails fast if any reject. Promise.allSettled waits for all promises to settle regardless of outcome. Promise.race settles with the very first promise that fulfills or rejects. Promise.any returns the first successfully fulfilled promise.",
      code: "const results = await Promise.allSettled([fetchUsers(), fetchOrders()]);"
    },
    {
      lvl: "lvl2",
      q: "JavaScript-এ Prototype এবং Prototypal Inheritance কীভাবে কাজ করে?",
      m: "জাভাস্ক্রিপ্টে ক্লাসিকাল অবজেক্ট-ওরিয়েন্টেড ক্লাসের মতো ইনহেরিট্যান্স হয় না; এখানে প্রতিটি অবজেক্টের একটি ইন্টারনাল হিডেন প্রপার্টি থাকে যাকে `[[Prototype]]` বলে (অ্যাক্সেসযোগ্য via `__proto__`)। যখন কোনো অবজেক্টে একটি প্রপার্টি খোঁজা হয়, জাভাস্ক্রিপ্ট প্রথমে অবজেক্টের ভেতর খোঁজে, না পেলে তার প্রোটোটাইপে যায়, এভাবে `null` না পাওয়া পর্যন্ত প্রোটোটাইপ চেইনে উপরে ওঠে। ES6 `class` সিনট্যাক্স মূলত এই প্রোটোটাইপাল মেকানিজমের ওপর সুগার কোট (Syntactic Sugar)।",
      b: "জাভাস্ক্রিপ্টের ইনহেরিট্যান্স প্রোটোটাইপ চেইনের ওপর ভিত্তি করে কাজ করে। প্রতিটি অবজেক্ট তার প্রোটোটাইপ থেকে মেথড ও প্রপার্টি ধার করে। ক্লাস সিনট্যাক্স মূলত প্রোটোটাইপাল ইনহেরিট্যান্সেরই একটি সহজ উপস্থাপন মাত্র।",
      e: "JavaScript uses prototypal inheritance where objects inherit directly from other objects via a hidden [[Prototype]] link. Property lookups traverse up the prototype chain until the property is found or the chain ends at Object.prototype (null).",
      code: "const animal = { walk: () => 'walking' };\nconst dog = Object.create(animal);\nconsole.log(dog.walk()); // 'walking' via prototype chain"
    },
    {
      lvl: "lvl2",
      q: "JavaScript-এ Debounce এবং Throttle-এর মধ্যে পার্থক্য কী এবং কখন কোনটি ব্যবহার করবে?",
      m: "Debounce ইভেন্ট ফায়ারিং বন্ধ হওয়ার পর নির্দিষ্ট সময় অপেক্ষা করে মাত্র একবার ফাংশন রান করায় (যেমন: সার্চ ইনপুটে টাইপিং শেষ হওয়া পর্যন্ত অপেক্ষা করা)। আর Throttle একটি নির্দিষ্ট সময় পরপর (যেমন প্রতি ৩০০ মিলিসেকেন্ডে) নিয়মিত ফাংশনটিকে সর্বোচ্চ একবার রান করতে দেয়, ব্যবহারকারী বিরতি না দিলেও (যেমন: উইন্ডো স্ক্রল বা উইন্ডো রিসাইজ হ্যান্ডলিংয়ে)।",
      b: "ডিবউন্স ব্যবহারকারীর ইনপুট দেওয়া শেষ হওয়ার পর নির্দিষ্ট সময় পর্যন্ত অপেক্ষা করে একবার এক্সিকিউট হয়। অন্যদিকে থ্রটল নির্দিষ্ট বিরতিতে নিয়মিত একবার করে কাজ করতে দেয়, স্ক্রলিং বা রিসাইজিং ইভেন্টে ব্রাউজার ক্র্যাশ প্রতিরোধে এটি ব্যবহৃত হয়।",
      e: "Debouncing delays invoking a function until after a specific duration has passed since the last trigger (ideal for search autocomplete). Throttling limits function execution to at most once per defined time interval (ideal for infinite scroll or resize handlers).",
      code: "function debounce(fn, ms) {\n  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };\n}"
    },
    {
      lvl: "lvl2",
      q: "Deep Copy এবং Shallow Copy-এর মধ্যে পার্থক্য কী এবং JavaScript-এ নির্ভুল Deep Clone কীভাবে করা যায়?",
      m: "Shallow Copy শুধু টপ লেভেলের প্রপার্টি কপি করে, কিন্তু ভেতরের নেস্টেড অবজেক্টগুলোর রেফারেন্স এক রেখে দেয় (`{ ...obj }` বা `Object.assign()`), ফলে নেস্টেড ডাটা পরিবর্তন করলে মূলে পরিবর্তন হয়ে যায়। Deep Copy নেস্টেড প্রতিটি লেভেলের একদম স্বাধীন নতুন কপি তৈরি করে। আধুনিক জাভাস্ক্রিপ্টে নেটিভ `structuredClone(obj)` মেথড দিয়ে পারফেক্ট ডিপ কপি করা যায়, যা Date, Map, Set ও Circular References ও হ্যান্ডেল করতে পারে (যা `JSON.parse(JSON.stringify())` পারে না)।",
      b: "শ্যালো কপি শুধুমাত্র প্রথম স্তরের মান নকল করে কিন্তু গভীর নেস্টেড অবজেক্টের মেমোরি রেফারেন্স শেয়ার করে। ডিপ কপি প্রতিটি নেস্টেড অংশের সম্পূর্ণ আলাদা মেমোরি কপি তৈরি করে। আধুনিক ব্রাউজারে structuredClone() দিয়ে নিখুঁত ডিপ কপি করা যায়।",
      e: "Shallow copy copies top-level properties but retains nested object references. Deep copy recursively duplicates all nested references. The modern standard is structuredClone(), which natively handles nested structures, Maps, Sets, and circular references unlike JSON.parse/stringify.",
      code: "const clonedUser = structuredClone(originalUser);"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "JavaScript Memory Leaks কেন হয় এবং V8 ইঞ্জিনের Garbage Collection মেকানিজম (Mark-and-Sweep) কীভাবে কাজ করে?",
      m: "V8 ইঞ্জিন মেমোরি ক্লিয়ারের জন্য 'Mark-and-Sweep' অ্যালগরিদম ব্যবহার করে। এটি রুট অবজেক্ট (উইন্ডো বা গ্লোবাল) থেকে শুরু করে রেফারেন্সড অবজেক্টগুলোকে মার্ক করে এবং আন-রিচেবল অবজেক্টগুলোকে মেমোরি থেকে সুইপ বা ডিলিট করে দেয়। মেমোরি লিক ঘটে যখন: (১) গ্লোবাল ভ্যারিয়েবলে অপ্রয়োজনীয় ডাটা পুশ করা হয়, (২) আনক্লিনড `setInterval` চলতে থাকে, (৩) রিমুভ করা DOM নোডের ওপর ক্লোজার বা ইভেন্ট লিসেনার রেফারেন্স ধরে রাখে, বা (৪) `WeakMap`/`WeakSet` ব্যবহার না করে সাধারণ ম্যাপে অবজেক্ট কি রাখা হয়।",
      b: "জাভাস্ক্রিপ্ট ভি-৮ ইঞ্জিন মার্ক-অ্যান্ড-সুইপ কৌশলে যেসব অবজেক্টের রুট রেফারেন্স নেই সেগুলোকে মেমোরি থেকে মুছে ফেলে। মেমোরি লিক হয় যখন অপ্রয়োজনীয় ইভেন্ট লিসেনার, টাইমার বা সাইকেল রেফারেন্স ডিলিট না হয়ে মেমোরিতে জীবিত থাকে।",
      e: "V8 utilizes a generational Mark-and-Sweep garbage collector. Starting from roots, reachable nodes are marked while unreferenced memory is swept. Leaks occur due to accidental global variables, uncleared timers, lingering event listeners on detached DOM trees, or improper closure retainers.",
      tip: "অবজেক্ট কি-ভিত্তিক ক্যাশিং করার সময় WeakMap ব্যবহার করলে অবজেক্ট গারবেজ কালেক্টেড হতে পারে।"
    },
    {
      lvl: "lvl3",
      q: "JavaScript Generators (`function*`) এবং Iterators আর্কিটেকচার কীভাবে কাজ করে এবং এদের বাস্তব ব্যবহার কী?",
      m: "Generator হলো এমন একটি ফাংশন যা এক্সিকিউশনের মাঝখানে পজ (Pause) হতে পারে এবং পরবর্তীতে আবার যেখান থেকে থেমেছিল সেখান থেকে রেজুমে (Resume) করা যায় `yield` কিওয়ার্ডের মাধ্যমে। এটি একটি Iterator অবজেক্ট প্রদান করে যাতে `{ value, done }` থাকে। ইনফাইনাইট সিকোয়েন্স তৈরি করতে, বিশাল ডাটাবেজ রেকর্ড স্ট্রিম করে মেমোরি বাঁচিয়ে প্রসেস করতে বা Redux-Saga এর মতো জটিল অ্যাসিঙ্ক ফ্লো নিয়ন্ত্রণে জেনারেটর ব্যবহার করা হয়।",
      b: "জেনারেটর ফাংশন yield কিওয়ার্ডের মাধ্যমে কাজের মাঝে থেমে যেতে পারে এবং প্রয়োজনমতো পুনরায় চালু হতে পারে। এটি মেমোরিতে একসাথে পুরো ডাটা না নিয়ে চাঙ্ক আকারে একটার পর একটা রেকর্ড অলসভাবে প্রসেস করার জন্য মেমোরি ফ্রেন্ডলি সমাধান দেয়।",
      e: "Generators (function*) yield execution control back to the caller and maintain internal state until next() is called. They implement the Iterable protocol ({ value, done }) to process infinite data streams, evaluate lazy collections, or orchestrate complex async flows like Redux Saga.",
      code: "function* idGenerator() {\n  let id = 1;\n  while (true) yield id++;\n}\nconst gen = idGenerator();\ngen.next().value; // 1\ngen.next().value; // 2"
    },
    {
      lvl: "lvl3",
      q: "JavaScript Proxy এবং Reflect API কীভাবে অবজেক্টের ইন্টারনাল অপারেশন ইন্টারসেপ্ট ও মেটাপ্রোগ্রামিং করতে সাহায্য করে?",
      m: "Proxy অবজেক্টের ওপর যেকোনো অ্যাকশন (যেমন প্রপার্টি গেট, সেট, ডিলিট, ফাংশন কল ইত্যাদি) ইন্টারসেপ্ট করার জন্য 'Traps' বসাতে দেয়। আর `Reflect` এই ইন্টারসেপ্টেড ট্র্যাপগুলোর ডিফল্ট বিহেভিয়ার নিখুঁতভাবে এক্সিকিউট করতে সাহায্য করে। Vue 3-এর সম্পূর্ণ রিয়্যাক্টিভিটি সিস্টেম এবং MobX এই Proxy মেকানিজমের ওপর ভিত্তি করে তৈরি, যেখানে স্টেট পরিবর্তন হওয়া মাত্র স্বয়ংক্রিয়ভাবে নোটিফিকেশন ফায়ার হয়।",
      b: "প্রক্সি এপিআই দিয়ে কোনো অবজেক্টের ভেতর ডাটা রিড, রাইট বা ডিলিট করার মুহূর্তে কাস্টম কোড বা ভ্যালিডেশন চালানো যায়। রিফ্লেক্ট এপিআই এর সাথে মিলিত হয়ে এটি মেটাপ্রোগ্রামিং এবং লাইভ ডাটা পর্যবেক্ষণ সিস্টেমে ব্যবহৃত হয়।",
      e: "A Proxy wraps an object to intercept and redefine fundamental operations (get, set, deleteProperty) using traps. The Reflect API provides static methods matching these traps to forward operations cleanly. Libraries like Vue 3 reactivity rely heavily on Proxies.",
      code: "const validator = new Proxy({}, {\n  set(target, prop, val) {\n    if (prop === 'age' && val < 0) throw new TypeError('Invalid age');\n    return Reflect.set(target, prop, val);\n  }\n});"
    },
    {
      lvl: "lvl3",
      q: "Web Workers কী এবং ভারী ক্যালকুলেশন ব্রাউজারের মেইন থ্রেড ব্লক না করে কীভাবে মাল্টি-থ্রেডিংয়ে রান করানো যায়?",
      m: "যেহেতু জাভাস্ক্রিপ্ট সিঙ্গেল-থ্রেডেড, তাই কোটি কোটি ডাটা ক্যালকুলেট বা ইমেজ প্রসেসিং করতে গেলে ব্রাউজার ফ্রিজ হয়ে যায়। Web Workers সম্পূর্ণ আলাদা ব্যাকগ্রাউন্ড ওএস থ্রেডে চলে। মেইন থ্রেড থেকে `postMessage()` দিয়ে ডেটা পাঠানো হয় এবং ওয়ার্কার `onmessage` ইভেন্টে ডাটা রিসিভ করে প্রসেস শেষ হলে আবার মেইন থ্রেডে মেসেজ পাঠায়। তবে Web Workers সরাসরি DOM অ্যাক্সেস করতে পারে না।",
      b: "ওয়েব ওয়ার্কার ব্রাউজারের মূল থ্রেডের বাইরে আলাদা ব্যাকগ্রাউন্ড থ্রেডে কোড এক্সিকিউট করে। ভারী হিসাব-নিকাশ ওয়ার্কারে পাঠিয়ে দিলে ব্যবহারকারীর ইন্টারফেস মসৃণ থাকে। মেসেজ আদান-প্রদানের জন্য postMessage এবং onmessage ব্যবহৃত হয়।",
      e: "Web Workers provide true multithreading in browsers by executing scripts in isolated background threads separate from the main execution thread. Communication uses serialized message passing via postMessage, keeping the UI at 60fps without DOM access privileges.",
      code: "// worker.js:\nonmessage = (e) => { postMessage(heavyMath(e.data)); };"
    },
    {
      lvl: "lvl3",
      q: "JavaScript-এ Tail Call Optimization (TCO) এবং Call Stack Overflow কীভাবে কাজ করে?",
      m: "যখন কোনো রিকার্সিভ ফাংশন গভীর থেকে গভীরে কল হতে থাকে, প্রতি কলের জন্য নতুন স্ট্যাক ফ্রেম তৈরি হয়। স্ট্যাক সাইজের লিমিট অতিক্রম করলে 'Maximum call stack size exceeded' এরর আসে। Tail Call Optimization হলো এমন একটি কম্পাইলার অপটিমাইজেশন যেখানে ফাংশনের রিটার্ন স্টেটমেন্টে অন্য কোনো কাজের সাথে যোগ না হয়ে একদম শেষ অপারেশন হিসেবে নিজেই কল হয় (যেমন `return recurse(n-1, acc)`), ফলে নতুন ফ্রেম না খুলে পূর্বের ফ্রেমেই কাজ সম্পন্ন হয়। তবে ব্রাউজারগুলোতে এটি সীমিত, তাই বাস্তব কোডে রিকার্শনের বদলে Trampoline বা সাধারণ লুপ ব্যবহার করা শ্রেয়।",
      b: "গভীর রিকার্শনের কারণে কল স্ট্যাকের সীমা পার হয়ে গেলে স্ট্যাক ওভারফ্লো হয়। টেইল কল অপটিমাইজেশনে রিকার্সিভ কলটি রিটার্নের শেষ অপারেশনে রাখলে পূর্বের স্ট্যাক ফ্রেম পুনর্ব্যবহার করা যায়। বাস্তব অ্যাপে রিকার্শনের ঝুঁকি এড়াতে লুপ বা ট্রাম্পোলিন কৌশল ব্যবহার করা হয়।",
      e: "Deep recursion without termination bounds causes Call Stack Overflow. Tail Call Optimization (TCO) reuses the current stack frame if the recursive call is in the strict tail position (return fn()), preventing stack growth, though iterative loops remain the preferred defensive pattern in JavaScript.",
      tip: "বড় ডাটাবেজ ট্রাভার্সালে রিকার্শন দিয়ে স্ট্যাক ব্লো না করে লুপ বা স্ট্যাক অ্যারে ব্যবহার করার যুক্তি দেওয়া প্রফেশনালিজম প্রকাশ করে।"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "ব্যবহারকারী একটি ডেটা এক্সপোর্ট বাটনে ক্লিক করায় ১০ লক্ষ রেকর্ড ফিল্টার হতে গিয়ে পুরো ব্রাউজার ১০ সেকেন্ড ফ্রিজ হয়ে 'Page Unresponsive' দেখাচ্ছে। কীভাবে তাৎক্ষণিক ফিক্স করবে?",
      m: "সমাধান: (১) মেইন থ্রেডে এই ভারী লুপ চালানো যাবে না। আমরা পুরো ফিল্টারিং টাস্কটিকে একটি Web Worker-এ পাঠিয়ে দেব। (২) যদি Web Worker সেটআপ ছাড়া দ্রুত ফিক্স করতে হয়, তবে অ্যারে প্রসেসিংকে ছোট ছোট চাঙ্কে (যেমন প্রতি ১০০টি রেকর্ড) ভাগ করে `requestIdleCallback` অথবা `setTimeout(..., 0)` দিয়ে টাইম-স্লাইসিং করব, যাতে প্রতি চাঙ্কের পর মেইন থ্রেড ইউজার ইন্টারঅ্যাকশন হ্যান্ডেল করার সুযোগ পায়।",
      b: "ব্রাউজার ফ্রিজ হওয়া ঠেকাতে প্রসেসিংটিকে ওয়েব ওয়ার্কারে পাঠাতে হবে। বিকল্পভাবে, টাইম-স্লাইসিং পদ্ধতির মাধ্যমে অ্যারে প্রসেসকে ছোট ভাগে ভাগ করে requestIdleCallback দিয়ে ব্রাউজারের অলস সময়ে সম্পন্ন করতে হবে যাতে UI মসৃণ থাকে।",
      e: "Offload the 1M-record filter operation to a dedicated Web Worker. Alternatively, chunk array processing via Time-Slicing using requestIdleCallback or recursive setTimeout(0) yielding execution control periodically to the UI event loop.",
      code: "function processChunk(items, index = 0) {\n  const chunk = items.slice(index, index + 500);\n  doWork(chunk);\n  if (index + 500 < items.length) {\n    setTimeout(() => processChunk(items, index + 500), 0);\n  }\n}"
    },
    {
      lvl: "situation",
      q: "একটি থার্ড-পার্টি লাইব্রেরি উইন্ডো অবজেক্টে গ্লোবাল ভ্যারিয়েবল পলুট করে আমাদের প্রোডাকশন কোডের মেথডকে ওভাররাইট করে ফেলছে। কীভাবে এটি আইসোলেট করবে?",
      m: "সমাধান: (১) লাইব্রেরির কোডকে একটি IIFE (Immediately Invoked Function Expression) এর ভেতর র্যাপ করব বা ES Modules (`type='module'`) ব্যবহার করব যাতে নিজস্ব স্কোপ তৈরি হয়। (২) আরও স্ট্রং সিকিউরিটি আইসোলেশনের জন্য একটি স্যান্ডবক্সড `<iframe>` অথবা Shadow Realm ব্যবহার করে লাইব্রেরিটিকে আলাদা গ্লোবাল কনটেক্সটে এক্সিকিউট করব এবং শুধু প্রয়োজনীয় রেজাল্ট মেসেজের মাধ্যমে আদান-প্রদান করব।",
      b: "থার্ড পার্টি লাইব্রেরির হস্তক্ষেপ রোধ করতে IIFE মডিউল প্যাটার্ন অথবা একটি স্যান্ডবক্সড আইফ্রেম ব্যবহার করে লাইব্রেরিটির রানটাইম স্কোপ আলাদা রাখতে হবে যাতে মূল উইন্ডো অবজেক্টের ক্ষতি না হয়।",
      e: "Isolate intrusive scripts using Immediately Invoked Function Expressions (IIFE), enforce ES Module boundaries, or execute the code inside a sandboxed iframe to shield the host window's global namespace from prototype poisoning.",
      code: "(function(window, document) {\n  // Isolated scope\n  const privateLib = {};\n})(Object.create(window), document);"
    },
    {
      lvl: "situation",
      q: "ডাটাবেজ থেকে পাওয়া অবজেক্টে Circular Reference (ঘূর্ণায়মান রেফারেন্স: A রেফার করে B-কে, B রেফার করে A-কে) থাকায় `JSON.stringify(data)` ক্র্যাশ করছে। সমাধান কী?",
      m: "সমাধান: (১) নেটিভ `JSON.stringify`-এর দ্বিতীয় প্যারামিটারে একটি কাস্টম 'Replacer' ফাংশন পাস করব যা একটি `WeakSet`-এ ভিজিট করা অবজেক্ট রেফারেন্সগুলো ট্র্যাক করবে; যদি কোনো অবজেক্ট আগেই সেটে থাকে তবে `undefined` রিটার্ন করবে। (২) অথবা `flatted` লাইব্রেরি ব্যবহার করব যা সার্কুলার অবজেক্টকে নিখুঁতভাবে সিরিয়ালাইজ ও ডিসিরিয়ালাইজ করতে পারে।",
      b: "সার্কুলার রেফারেন্স সমাধানের জন্য JSON.stringify এর রিপ্লেসার ফাংশনে একটি WeakSet ব্যবহার করে ডুপ্লিকেট রেফারেন্স বাদ দিতে হবে, অথবা flatted লাইব্রেরি ব্যবহার করতে হবে।",
      e: "Resolve circular serialization errors by passing a custom replacer to JSON.stringify utilizing a WeakSet to detect and omit previously visited references, or use the 'flatted' library.",
      code: "function safeStringify(obj) {\n  const seen = new WeakSet();\n  return JSON.stringify(obj, (k, v) => {\n    if (typeof v === 'object' && v !== null) {\n      if (seen.has(v)) return;\n      seen.add(v);\n    }\n    return v;\n  });\n}"
    },
    {
      lvl: "situation",
      q: "ব্যবহারকারী অফলাইনে চলে গেলে কিছু Ajax কল ফেইল করে এরর দিচ্ছে। জাভাস্ক্রিপ্ট লেয়ারে অটোমেটিক নেটওয়ার্ক রিকানেকশন ও রিট্রাই মেকানিজম কীভাবে লিখবে?",
      m: "আমরা একটি 'Exponential Backoff Retry' ইউটিলিটি ফাংশন লিখব। রিকোয়েস্ট ফেইল করলে এটি ১ সেকেন্ড, ২ সেকেন্ড, ৪ সেকেন্ড এভাবে ওয়েট করে সর্বোচ্চ ৩ বার রিট্রাই করবে। সাথে `window.addEventListener('online')` লিসেনার রাখব যাতে ডিভাইস নেটওয়ার্কে ফেরা মাত্রই পেন্ডিং রিকোয়েস্ট তৎক্ষণাৎ ফায়ার হয়।",
      b: "এক্সপোনেনশিয়াল ব্যাকঅফ কৌশল ব্যবহার করে পর্যায়ক্রমিক বিরতিতে ৩ বার রিট্রাই করার লজিক লিখতে হবে এবং অনলাইন ইভেন্ট লিসেনারের মাধ্যমে সংযোগ পাওয়ার সাথে সাথে রিকোয়েস্ট এক্সিকিউট করতে হবে।",
      e: "Implement an asynchronous wrapper featuring Exponential Backoff with jitter, retrying failed promises with increasing delays while listening to the 'online' window event to flush retries upon reconnect.",
      code: "async function fetchWithRetry(url, retries = 3, delay = 1000) {\n  try { return await fetch(url); }\n  catch (err) {\n    if (retries === 0) throw err;\n    await new Promise(r => setTimeout(r, delay));\n    return fetchWithRetry(url, retries - 1, delay * 2);\n  }\n}"
    },
    {
      lvl: "situation",
      q: "স্ক্রিনে কোটি টাকার ট্রানজাকশনে `0.1 + 0.2 === 0.30000000000000004` আসায় ফিন্যান্সিয়াল ক্যালকুলেশনে ভুল ব্যালেন্স দেখাচ্ছে। জাভাস্ক্রিপ্টে এই ফ্লোটিং পয়েন্ট বাগ কীভাবে হ্যান্ডেল করবে?",
      m: "জাভাস্ক্রিপ্ট IEEE 754 Floating Point স্ট্যান্ডার্ড ব্যবহার করে, যার কারণে বাইনারি ফ্র্যাকশনে কিছু দশমিক পুরোপুরি রিপ্রেজেন্ট হতে পারে না। সমাধান: (১) ফিন্যান্সিয়াল ক্যালকুলেশনে কখনোই সরাসরি দশমিক রাখবেন না; সব টাকাকে পয়সায় (Cents / Poisha) কনভার্ট করে পূর্ণসংখ্যায় (Integer) গুণ/ভাগ করে শেষে ১০০ দিয়ে ভাগ করে ফরম্যাট করব। (২) বড় টাকার অঙ্কের জন্য `BigInt` অথবা `decimal.js` / `currency.js` লাইব্রেরি ব্যবহার করব।",
      b: "জাভাস্ক্রিপ্টের আইইইই ৭৫৪ ফ্লোটিং পয়েন্ট বাগকে হ্যান্ডেল করতে সব আর্থিক হিসাব পয়সায় রূপান্তর করে পূর্ণসংখ্যা হিসেবে গণনা করতে হবে অথবা decimal.js এর মতো নির্ভরযোগ্য লাইব্রেরি ব্যবহার করতে হবে।",
      e: "JavaScript adheres to IEEE 754 floating-point standards causing precision loss. In financial apps, store and calculate amounts strictly as smallest integer units (e.g., Poisha/Cents) before formatting, or use arbitrary-precision libraries like decimal.js.",
      code: "const addMoney = (a, b) => Math.round(a * 100 + b * 100) / 100;\nconsole.log(addMoney(0.1, 0.2)); // 0.3"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এ শত শত প্রোডাক্ট দিয়ে ইনভয়েস তৈরি করার সময় মোট ভ্যাট, ডিসকাউন্ট ও কাস্টমার বাকি টাকার নিখুঁত হিসাব কীভাবে জাভাস্ক্রিপ্টে অপটিমাইজ করেছিলে?",
      m: "ইনভয়েসে আইটেম লেভেল ডিসকাউন্ট, ক্যাটাগরি লেভেল ভ্যাট এবং স্পেশাল কুপন থাকে। আমরা একটি পিওর ফাংশনাল পাইপলাইন তৈরি করেছিলাম যা `Array.reduce` দিয়ে একটি মাত্র পাসে সাবটোটাল, মোট ডিসকাউন্ট ও ভ্যাট হিসাব করে। এছাড়া প্রতিটি মানকে ইনটিজার পয়সায় রেখে ফাইনাল রিটার্নে `Intl.NumberFormat('bn-BD', { style: 'currency', currency: 'BDT' })` দিয়ে লোকাল বাংলাদেশি মুদ্রায় নিখুঁতভাবে ফরম্যাট করেছি।",
      b: "দোকানি পিওএসে ভ্যাট ও ডিসকাউন্ট ক্যালকুলেশনকে পিওর পাইপলাইন ফাংশন দিয়ে একটিমাত্র লুপে সম্পন্ন করা হয়েছিল। ভগ্নাংশের ঝামেলা দূর করতে পয়সায় হিসাব সম্পন্ন করে ব্রাউজারের নেটিভ Intl.NumberFormat এপিআই দিয়ে বাংলাদেশি মুদ্রায় ফরম্যাট করা হয়েছিল।",
      e: "In Dokani POS, an invoice calculation pipeline evaluated item-level taxes and store discounts in a single functional reduce pass, storing values as integer units and outputting localized Bengali currency via Intl.NumberFormat.",
      tip: "ইন্টারভিউতে `Intl.NumberFormat` এবং `Intl.DateTimeFormat` এর মতো নেটিভ ব্রাউজার এপিআই ব্যবহারের কথা বললে প্রমাণিত হয় তুমি কোনো থার্ড-পার্টি অতিরিক্ত বান্ডেল সাইজ না বাড়িয়ে আধুনিক জাভাস্ক্রিপ্ট ব্যবহার করতে জানো।"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে হাজার হাজার ছাত্রের পিডিএফ সার্টিফিকেট ব্রাউজার থেকেই ক্লায়েন্ট-সাইডে রেন্ডার করে ডাউনলোড করাতে গিয়ে মেমোরি ও পারফরম্যান্স কীভাবে ম্যানেজ করেছিলে?",
      m: "সার্ভারে পিডিএফ জেনারেট করলে সিপিইউ ও মেমোরি লোড বেড়ে ক্র্যাশ হওয়ার ঝুঁকি থাকে। আমরা ক্লায়েন্ট-সাইডে `pdf-lib` এবং HTML Canvas ব্যবহার করেছি। ব্যাকগ্রাউন্ডে ক্যানভাসে ছাত্রের নাম ও কিউআর কোড বসিয়ে বাইনারি অ্যারে বাফার (Uint8Array) তৈরি করা হয় এবং `URL.createObjectURL(blob)` দিয়ে সরাসরি ব্রাউজার মেমোরি থেকে ডাউনলোড লিংক দেওয়া হয়। ডাউনলোড শেষ হওয়া মাত্র `URL.revokeObjectURL(url)` কল করে ব্রাউজার মেমোরি তৎক্ষণাৎ ফ্রি করা হয়েছিল।",
      b: "সার্ভারের লোড বাঁচাতে আমরা ক্লায়েন্টে ক্যানভাস ও pdf-lib দিয়ে সার্টিফিকেট তৈরি করেছিলাম। ব্লব অবজেক্ট থেকে ডাউনলোড লিংক বানিয়ে কাজ শেষ হওয়ামাত্র revokeObjectURL দিয়ে মেমোরি ক্লিনআপ করে উচ্চ কর্মক্ষমতা বজায় রাখা হয়েছিল।",
      e: "To alleviate backend load in PTTABD, student certificates were rendered client-side on canvas using binary Uint8Array buffers. Instant downloads were triggered via URL.createObjectURL(blob) followed immediately by URL.revokeObjectURL to reclaim memory.",
      code: "const url = URL.createObjectURL(blob);\ndownloadAnchor.href = url;\ndownloadAnchor.click();\nURL.revokeObjectURL(url); // Prevent memory leak"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর লাইভ সেলস কাউন্টারে বারবার কাস্টমার এন্ট্রি ও কার্ট ক্লিয়ার করার সময় ব্রাউজার মেমোরি প্রোফাইলিং করে অবজেক্ট লিক কীভাবে ডিবাগ করেছিলে?",
      m: "আমরা ক্রোম ডেভটুলসের 'Memory Tab' ওপেন করে ৩টি 'Heap Snapshot' ক্যাপচার করি: (১) কার্ট খালি থাকা অবস্থায়, (২) ৫০টি পণ্য কার্টে যোগ করার পর, (৩) কার্ট সম্পূর্ণ ক্লিয়ার করার পর। স্ন্যাপশটগুলোর ভেতর 'Comparison' ভিউ দিয়ে চেক করে দেখতে পাই কিছু Unbound Event Listener এবং লোকাল স্টোরেজ ওয়াচার ডিটাচড DOM নোড মেমোরিতে ধরে রেখেছিল। সেগুলো ক্লিনআপ ফাংশন দিয়ে রিমুভ করার পর হিপ সাইজ সম্পূর্ণ ফ্ল্যাট হয়ে যায়।",
      b: "ক্রোম ডেভটুলসের হিপ স্ন্যাপশট ও কমপ্যারিসন ভিউ ব্যবহার করে আমরা ডিটাচড ডম উপাদান এবং বন্ধ না করা ইভেন্ট লিসেনার শনাক্ত করেছিলাম। সেগুলো ক্লিনআপ করে মেমোরি লিক নির্মূল করা হয়।",
      e: "Diagnosed memory leaks in Dokani's cart session by taking Heap Snapshots in Chrome DevTools before and after cart resets. Comparison views isolated detached DOM trees retained by lingering event listeners, which we systematically sanitized via cleanup unbinds.",
      tip: "ইন্টারভিউতে Chrome DevTools Memory Profiling এবং Heap Snapshot নেওয়ার অভিজ্ঞতা সিনিয়র রোলে বিরাট ইমপ্যাক্ট তৈরি করে।"
    },
    {
      lvl: "realworld",
      q: "ব্রাউজারে বড় সাইজের ফাইল (যেমন ৫০০MB ব্যাকআপ বা ভিডিও) আপলোড করার সময় মেমোরি ওভারফ্লো এড়াতে জাভাস্ক্রিপ্ট File API এবং Chunking কীভাবে ব্যবহার করেছিলে?",
      m: "পুরো ফাইলকে একসাথে মেমোরিতে রিড করলে ব্রাউজার ট্যাব ক্র্যাশ করে। আমরা `file.slice(start, end)` মেথড ব্যবহার করে ফাইলটিকে ৫MB সাইজের ছোট ছোট ব্লব (Blob Chunks) এ ভাগ করেছি। এরপর প্রতিটি চাঙ্ক ক্রমান্বয়ে সার্ভারে পাঠাই। সার্ভার সবগুলো চাঙ্ক পেয়ে মার্চ করে মূল ফাইল তৈরি করে। এর ফলে আপলোডের মাঝে ইন্টারনেট ড্রপ হলেও ইউজার যেখান থেকে থেমেছিল সেখান থেকেই রেজুমে করতে পেরেছে।",
      b: "বড় ফাইল আপলোডে ব্রাউজার ক্র্যাশ ঠেকাতে আমরা file.slice দিয়ে ফাইলটিকে ৫ মেগাবাইটের চাঙ্কে বিভক্ত করে ধাপে ধাপে আপলোড করেছি। এতে মেমোরি সাশ্রয় হয় এবং বিরতির পর পুনরায় আপলোড চালিয়ে যাওয়ার সুবিধা তৈরি হয়।",
      e: "Prevented browser crashes by slicing large media files into 5MB Blob chunks via the File API. Chunks were uploaded sequentially with retry handling, allowing chunk resumption upon network interruptions.",
      code: "const chunk = file.slice(offset, offset + CHUNK_SIZE);"
    },
    {
      lvl: "realworld",
      q: "JavaScript-এ আধুনিক ব্রাউজার স্টোরেজ অপশনগুলোর (Cookie, localStorage, sessionStorage, IndexedDB) বাস্তব ব্যবহারের আর্কিটেকচার কীভাবে নির্ধারণ করবে?",
      m: "আর্কিটেকচারাল ম্যাপিং: (১) `HttpOnly Secure Cookie`: সংবেদনশীল JWT Auth টোকেন সংরক্ষণের জন্য (XSS এট্যাক থেকে ১০০% সুরক্ষিত)। (২) `localStorage`: ইউজার থিম প্রেফারেন্স (Dark/Light) বা সাইডবার স্টেট (৫MB পর্যন্ত নন-সেনসিটিভ ডাটা)। (৩) `sessionStorage`: সিঙ্গেল সেশন ফর্ম উইজার্ড বা ওটিপি ভেরিফিকেশন স্টেপ। (৪) `IndexedDB`: অফলাইন স্টোরেজ, হাজার হাজার ক্যাটালগ প্রোডাক্ট বা অফলাইন বিলিং রেকর্ড (৫০MB+ স্ট্রাকচার্ড NoSQL ডাটা ও ইন্ডেক্সিং সাপোর্ট)।",
      b: "সুরক্ষিত অথেনটিকেশনে HttpOnly কুকি, ইউজার সেটিংসের জন্য লোকালস্টোরেজ, ক্ষণস্থায়ী সেশনে সেশনস্টোরেজ এবং অফলাইন বিশাল ডাটাবেজ সংরক্ষণের জন্য ইনডেক্সড-ডিবি ব্যবহার করাই স্ট্যান্ডার্ড আর্কিটেকচার।",
      e: "Architectural storage tiering: HttpOnly cookies for secure JWT session tokens (immune to client XSS), localStorage for UI themes/prefs, sessionStorage for ephemeral single-tab form wizards, and IndexedDB for offline product catalogs and heavy offline transaction stores.",
      tip: "কখনোই JWT টোকেন localStorage-এ রাখবে না—এই পয়েন্টটি ইন্টারভিউতে জোর দিয়ে বলবে।"
    }
  ]
};
