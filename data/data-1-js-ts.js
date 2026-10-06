window.QA = window.QA || [];

window.PITCH = {
  mix: "আমি একজন Full Stack Web Developer, প্রায় ১০ মাসের professional experience আছে। আমার main stack হলো **React, Next.js, Node.js, Express, PostgreSQL/Prisma আর MongoDB**।\nআমার সবচেয়ে বড় কাজ **Dokani** — এটা একটা multi-tenant POS আর invoice SaaS। এখানে আমি নিজে JWT auth with refresh token, role-based access, shop-wise data isolation, transaction দিয়ে sale আর stock update, আর bKash/Nagad/aamarPay payment integration করেছি। Deploy করেছি Docker, Nginx আর VPS-এ, GitHub Actions দিয়ে CI/CD।\nএছাড়া **Lakdhanavi** corporate website-এর Next.js frontend আর Express + MongoDB CMS বানিয়েছি, আর **PTTABD LMS**-এ কাজ করেছি। আমি শুধু feature বানাই না — production-এ bug, security আর performance নিয়েও কাজ করি। RangdhanuIT-এ আমি এই real experience কাজে লাগাতে চাই আর team থেকে আরও শিখতে চাই।",
  bn: "আমি একজন ফুল স্ট্যাক ওয়েব ডেভেলপার, প্রায় দশ মাসের পেশাদার অভিজ্ঞতা আছে। আমি রিয়্যাক্ট, নেক্সট জেএস, নোড জেএস, এক্সপ্রেস, পোস্টগ্রেস এবং মঙ্গোডিবি দিয়ে কাজ করি।\nআমার সবচেয়ে বড় প্রজেক্ট দোকানি — একটি মাল্টি-টেন্যান্ট পিওএস সফটওয়্যার, যেখানে লগইন, রোল অনুযায়ী অনুমতি, দোকানভিত্তিক ডেটা আলাদা রাখা, বিক্রি ও স্টক একসাথে আপডেট এবং অনলাইন পেমেন্ট আমি নিজে তৈরি করেছি, আর নিজেই সার্ভারে ডিপ্লয় করেছি।\nএছাড়া লাকধানাভি কর্পোরেট ওয়েবসাইট ও তার অ্যাডমিন প্যানেল এবং পিটিটিএবিডি এলএমএস-এ কাজ করেছি। আমি আপনাদের টিমে বাস্তব অভিজ্ঞতা কাজে লাগাতে এবং আরও শিখতে চাই।",
  en: "I am a Full Stack Web Developer with about ten months of professional experience. My main stack is React, Next.js, Node.js, Express, PostgreSQL with Prisma, and MongoDB.\nMy biggest project is Dokani, a multi-tenant POS and invoice SaaS. I built the JWT login with refresh tokens, role-based access, shop-wise data isolation, sales and stock updates inside database transactions, and payment integration with bKash, Nagad and aamarPay. I also deployed it with Docker, Nginx and a VPS, using GitHub Actions.\nI also built the Lakdhanavi corporate website with a Next.js frontend and an Express and MongoDB admin panel, and I worked on the PTTABD LMS. I want to bring this real production experience to RangdhanuIT and keep learning from the team."
};

window.QA.push({
  id: "javascript", title: "JavaScript", icon: "⚡", tier: "t1", short: "JS",
  note: "আগে এগুলো শক্ত করো: **scope, hoisting, closure, Promise, async/await, event loop, array/object manipulation, destructuring, spread/rest, modules, error handling**।",
  items: [
    {
      q: "একজন user login করার পর API response থেকে token, user, permissions কীভাবে আলাদা করে handle করবে?",
      m: "আমি response-কে **destructure** করে তিনটা আলাদা জায়গায় রাখি। Access token memory-তে (বা httpOnly cookie-তে server নিজেই set করে), user info state store-এ, আর permissions একটা আলাদা array/Set হিসেবে রাখি যাতে UI-তে `can('sale.create')` এর মতো check করা সহজ হয়।\nDokani-তে refresh token httpOnly cookie-তে থাকে, তাই JavaScript সেটা পড়তেই পারে না — XSS হলেও token চুরি কঠিন।",
      b: "রেসপন্স থেকে ডিস্ট্রাকচারিং করে টোকেন, ইউজার আর পারমিশন আলাদা করি। টোকেন নিরাপদ জায়গায় (মেমরি বা httpOnly কুকি), ইউজার তথ্য স্টেটে, আর পারমিশন আলাদা লিস্টে রাখি যাতে বাটন বা পেজ দেখানোর আগে সহজে চেক করা যায়।",
      e: "I destructure the response and store each part in its own place. The access token stays in memory or in an httpOnly cookie, the user goes into the state store, and permissions go into a separate list. Then the UI can easily check things like can sale create.",
      code: `const { accessToken, user, permissions = [] } = res.data.data;
authStore.set({ user, token: accessToken });
const perms = new Set(permissions);
const can = (p) => perms.has(p);`
    },
    {
      q: "একটি product array থেকে একই productId-এর duplicate বাদ দিয়ে unique list কীভাবে বানাবে?",
      m: "সবচেয়ে clean উপায় হলো **Map** ব্যবহার করা — key হবে productId। Map-এ একই key দুইবার থাকতে পারে না, তাই loop শেষে unique list পাই। এটা O(n), কিন্তু `filter + findIndex` দিলে O(n²) হয়ে যায়, বড় list-এ slow।",
      b: "ম্যাপ ব্যবহার করি যেখানে প্রোডাক্ট আইডি হবে কী। একই কী দুইবার থাকে না, তাই শেষে শুধু ইউনিক প্রোডাক্ট থাকে। এটা দ্রুত কাজ করে।",
      e: "I use a Map with productId as the key. A Map cannot keep the same key twice, so at the end I get a unique list. This runs in linear time, which is much faster than filter with findIndex.",
      code: `const unique = [...new Map(products.map(p => [p.productId, p])).values()];`
    },
    {
      q: "Cart-এ একই product আবার যোগ করলে নতুন item না বানিয়ে quantity কীভাবে increase করবে?",
      m: "Add করার আগে check করি product টা cart-এ আছে কিনা। থাকলে **immutable way-তে** শুধু ওই item-এর quantity বাড়াই, না থাকলে নতুন item push করি। Dokani POS-এ barcode scan করলে এই logic টাই চলে — একই product বারবার scan করলে qty বাড়ে।",
      b: "যোগ করার আগে দেখি প্রোডাক্টটি কার্টে আছে কিনা। থাকলে শুধু তার পরিমাণ বাড়াই, না থাকলে নতুন আইটেম যোগ করি। পুরনো অ্যারে বদলাই না, নতুন অ্যারে তৈরি করি।",
      e: "Before adding, I check if the product is already in the cart. If it is, I only increase its quantity. If not, I add a new item. I always return a new array instead of changing the old one.",
      code: `function addToCart(cart, product) {
  const found = cart.find(i => i.id === product.id);
  if (found) return cart.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
  return [...cart, { ...product, qty: 1 }];
}`
    },
    {
      q: "API থেকে 10,000টি product এলে frontend-এ unnecessary processing কীভাবে কমাবে?",
      m: "প্রথম কথা — 10,000 product একবারে আনাই উচিত না। আমি **server-side pagination + search** করি। যদি আনতেই হয়, তাহলে: lookup-এর জন্য একবার Map বানাই, heavy calculation `useMemo`-তে রাখি, আর UI-তে **virtualization** দিয়ে শুধু visible row render করি।",
      b: "প্রথমে চেষ্টা করি সার্ভার থেকে পেজ করে অল্প অল্প ডেটা আনতে। যদি সব আনতেই হয়, তাহলে বারবার লুপ না চালিয়ে একবার ম্যাপ তৈরি করি, ভারী হিসাব মেমো করে রাখি, আর স্ক্রিনে শুধু দেখা যাওয়া সারিগুলো দেখাই।",
      e: "First, I avoid loading ten thousand items at once. I use server-side pagination and search. If I must load them, I build a lookup Map once, memoize heavy calculations, and use list virtualization so only visible rows are rendered."
    },
    {
      q: "Search box-এ user দ্রুত a, ab, abc, abcd লিখলে প্রতিবার API call না করে কী করবে?",
      m: "**Debounce** ব্যবহার করি — user typing থামানোর ৩০০-৪০০ms পরে একবার API call হয়। সাথে পুরনো request **AbortController** দিয়ে cancel করি, যাতে পুরনো response পরে এসে নতুন result overwrite না করে।",
      b: "ডিবাউন্স ব্যবহার করি, মানে ইউজার লেখা থামানোর কিছুক্ষণ পর একবারই এপিআই কল হয়। পুরনো রিকোয়েস্ট বাতিল করে দিই যাতে ভুল ফলাফল না দেখায়।",
      e: "I use debounce, so the API is called only once after the user stops typing for about three hundred milliseconds. I also cancel the old request with AbortController, so an old response cannot replace the new result.",
      code: `function debounce(fn, ms = 350) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}`
    },
    {
      q: "একটি function-এর ভিতরের data function শেষ হওয়ার পরেও কীভাবে available থাকতে পারে?",
      m: "এটা **closure**। Inner function তার বাইরের function-এর variable মনে রাখে, outer function শেষ হলেও। আমার debounce function-এ `t` timer variable টা closure-এর কারণেই প্রতিবার call-এ বেঁচে থাকে। Private counter বা cache বানাতেও closure কাজে লাগে।",
      b: "এটাকে ক্লোজার বলে। ভেতরের ফাংশন বাইরের ফাংশনের ভেরিয়েবল মনে রাখে, বাইরের ফাংশন শেষ হয়ে গেলেও। ডিবাউন্স বা প্রাইভেট কাউন্টার এভাবেই কাজ করে।",
      e: "This is called a closure. An inner function remembers the variables of its outer function, even after the outer function has finished. My debounce function works because of this.",
      code: `function counter() { let n = 0; return () => ++n; }
const next = counter(); next(); // 1
next(); // 2`
    },
    {
      q: "var, let, const ব্যবহার করতে গিয়ে production bug হওয়ার উদাহরণ কী?",
      m: "Classic bug: loop-এ `var i` দিয়ে setTimeout বা event handler বানালে সবগুলো শেষ value পায়, কারণ `var` function-scoped। `let` block-scoped, তাই প্রতিটা iteration-এ নতুন copy পায়। আরেকটা — `var` hoisted হয়ে `undefined` দেয়, error দেয় না, তাই bug লুকিয়ে থাকে। আমি default-এ `const` দিই, দরকার হলে `let`, `var` কখনো না।",
      b: "লুপে var ব্যবহার করলে সব কলব্যাক শেষ মানটা পায়, কারণ var ফাংশন স্কোপড। let প্রতিবার নতুন কপি তৈরি করে। আমি সাধারণত const ব্যবহার করি, দরকার হলে let, var একদম না।",
      e: "A common bug is using var inside a loop with setTimeout. All callbacks get the last value because var is function scoped. let is block scoped, so each loop gets its own copy. I use const by default, let when needed, and never var.",
      code: `for (var i = 0; i < 3; i++) setTimeout(() => console.log(i)); // 3 3 3
for (let j = 0; j < 3; j++) setTimeout(() => console.log(j)); // 0 1 2`
    },
    {
      q: "একটি asynchronous function-এ API failure হলে error কীভাবে catch করবে?",
      m: "`async/await`-এর সাথে **try/catch/finally** ব্যবহার করি। catch-এ error-কে user-friendly message-এ convert করি আর log করি, finally-তে loading বন্ধ করি। Dokani-তে axios **interceptor** আছে — 401 এলে auto refresh token try করে, অন্য error হলে toast দেখায়।",
      b: "ট্রাই-ক্যাচ দিয়ে এরর ধরি। ক্যাচে ইউজারকে সহজ মেসেজ দেখাই এবং লগ রাখি, ফাইনালিতে লোডিং বন্ধ করি। এক্সিওস ইন্টারসেপ্টর দিয়ে সব জায়গার এরর এক জায়গায় হ্যান্ডল করি।",
      e: "I use try, catch and finally with async await. In catch, I show a friendly message and log the error. In finally, I stop the loading state. I also use an axios interceptor to handle common errors in one place.",
      code: `async function loadProducts() {
  setLoading(true);
  try {
    const { data } = await api.get('/products');
    setProducts(data.data);
  } catch (err) {
    toast.error(err.response?.data?.message ?? 'Something went wrong');
  } finally {
    setLoading(false);
  }
}`
    },
    {
      q: "Promise chain-এর মাঝখানে একটি API fail করলে বাকি flow কীভাবে control করবে?",
      m: "Chain-এ কোনো step reject করলে পরের সব `.then` skip হয়ে সরাসরি `.catch`-এ যায়। যদি চাই কিছু step fail হলেও flow চলুক, তাহলে ওই step-এর পরে local `.catch` দিয়ে default value return করি। async/await-এ একই কাজ আলাদা try/catch block দিয়ে করি।",
      b: "চেইনের কোনো ধাপ ফেল করলে পরের ধাপগুলো বাদ দিয়ে সরাসরি ক্যাচে চলে যায়। কোনো ধাপ ঐচ্ছিক হলে সেখানেই আলাদা ক্যাচ দিয়ে ডিফল্ট মান দিই, যাতে বাকি কাজ চলতে থাকে।",
      e: "When one step rejects, all next then blocks are skipped and control goes to catch. If a step is optional, I add a local catch after it and return a default value, so the rest of the flow continues."
    },
    {
      q: "Promise.all() ব্যবহার করা অবস্থায় ৫টি request-এর একটি fail করলে কী হবে?",
      m: "`Promise.all` **fail-fast** — একটা reject হলেই পুরোটা reject হয়, বাকি ৪টার result পাই না (যদিও request গুলো চলতে থাকে)। Dashboard-এর মতো জায়গায় যেখানে প্রতিটা widget independent, সেখানে আমি `Promise.allSettled` ব্যবহার করি — সফলগুলো দেখাই, failed widget-এ error দেখাই।",
      b: "প্রমিস ডট অল একটা ফেল করলেই পুরোটা ফেল করে। ড্যাশবোর্ডের মতো জায়গায় যেখানে প্রতিটা অংশ আলাদা, সেখানে অলসেটলড ব্যবহার করি যাতে সফলগুলো দেখানো যায়।",
      e: "Promise all is fail fast. If one request fails, the whole thing rejects and I lose the other results. For dashboards where each widget is independent, I use Promise allSettled, so I can show the successful parts."
    },
    {
      q: "একটি button double-click করলে একই order দুইবার তৈরি হচ্ছে—JavaScript level-এ কীভাবে prevent করবে?",
      m: "Frontend-এ তিনটা জিনিস করি: request চলার সময় **button disable** করি, একটা `isSubmitting` flag/ref দিয়ে দ্বিতীয় call block করি, আর প্রতিটা checkout-এ একটা **idempotency key** (UUID) পাঠাই। কিন্তু আসল protection backend-এ — একই key দুইবার এলে server আগের result ফেরত দেয়। Frontend guard একা যথেষ্ট না।",
      b: "রিকোয়েস্ট চলার সময় বাটন বন্ধ রাখি, একটা ফ্ল্যাগ দিয়ে দ্বিতীয় ক্লিক আটকাই, আর প্রতিটা অর্ডারের সাথে একটা ইউনিক কী পাঠাই। আসল সুরক্ষা ব্যাকএন্ডে, যেখানে একই কী দুইবার এলে নতুন অর্ডার তৈরি হয় না।",
      e: "On the frontend, I disable the button while the request is running, block a second call with a flag, and send an idempotency key with each order. The real protection is on the backend, where the same key never creates a second order.",
      code: `const busy = useRef(false);
async function submit() {
  if (busy.current) return;
  busy.current = true;
  try { await api.post('/sales', payload, { headers: { 'Idempotency-Key': key } }); }
  finally { busy.current = false; }
}`
    },
    {
      q: "API থেকে null, undefined, empty string এলে safeভাবে UI logic কীভাবে লিখবে?",
      m: "**Optional chaining** `?.` আর **nullish coalescing** `??` ব্যবহার করি। `??` শুধু null/undefined-এ default দেয়, কিন্তু `||` দিলে `0` বা `''`-ও replace হয়ে যায় — দামের ক্ষেত্রে `0` বৈধ value, তাই `||` দিলে bug। Empty string-এর জন্য আলাদা `.trim()` check করি। আর API boundary-তে **Zod** দিয়ে data validate করি।",
      b: "অপশনাল চেইনিং আর নালিশ কোয়ালেসিং ব্যবহার করি। দামের মতো জায়গায় শূন্য একটা বৈধ মান, তাই অর ব্যবহার করলে ভুল হয়। খালি স্ট্রিং আলাদাভাবে চেক করি।",
      e: "I use optional chaining and nullish coalescing. Nullish coalescing only replaces null or undefined, but OR also replaces zero and empty string. A price of zero is valid, so using OR can create a bug.",
      code: `const name = user?.profile?.name?.trim() || 'Guest';
const price = product?.price ?? 0;   // 0 stays 0`
    },
    {
      q: "বড় একটি array বারবার .map()/.filter() করলে performance issue হলে কীভাবে চিন্তা করবে?",
      m: "প্রথমে measure করি — আসলেই এটা bottleneck কিনা। তারপর: একাধিক `.filter().map().reduce()` chain-কে একটা `reduce` বা `for` loop-এ merge করি, loop-এর ভিতরে `.find()` থাকলে আগে Map বানাই (O(n²) → O(n)), আর React-এ result `useMemo` দিয়ে cache করি।",
      b: "আগে মেপে দেখি আসলেই এটা সমস্যা কিনা। তারপর একাধিক লুপকে একটাতে মেলাই, লুপের ভেতরে খোঁজার বদলে আগে ম্যাপ তৈরি করি, আর ফলাফল মেমো করে রাখি।",
      e: "First I measure to confirm it is the real problem. Then I merge several chained loops into one, build a Map instead of searching inside a loop, and memoize the result in React."
    },
    {
      q: "একটি object accidentally mutate হয়ে অন্য component-এর data বদলে যাচ্ছে—কীভাবে debug করবে?",
      m: "JavaScript-এ object **reference** দিয়ে pass হয়, তাই দুই জায়গা একই object share করে। Debug করতে `Object.freeze()` দিয়ে দেখি কোথায় error throw করে, বা DevTools-এ breakpoint দিই। Fix — সবসময় copy করে update করি: spread `{...obj}` বা nested হলে `structuredClone()`। মনে রাখি spread শুধু **shallow** copy।",
      b: "জাভাস্ক্রিপ্টে অবজেক্ট রেফারেন্স হিসেবে যায়, তাই দুই জায়গা একই অবজেক্ট ব্যবহার করে। ফ্রিজ করে বা ব্রেকপয়েন্ট দিয়ে খুঁজি কোথায় বদলাচ্ছে। সমাধান হলো সবসময় কপি করে আপডেট করা।",
      e: "Objects are passed by reference, so two places can share the same object. To debug, I freeze the object or use breakpoints to find who changes it. To fix it, I always copy before updating, using spread or structuredClone for nested data."
    },
    {
      q: "Browser-এর event bubbling-এর কারণে ভুল button handler execute হলে কীভাবে ঠিক করবে?",
      m: "Event child থেকে parent-এ **bubble** হয়। যেমন table row-তে click handler আছে, আর row-এর ভিতরে Delete button — button click করলে row-এর handler-ও চলে। Fix: button handler-এ `e.stopPropagation()`। ভালো উপায় হলো **event delegation** — parent-এ একটা listener রেখে `e.target.closest('button')` দিয়ে check করা।",
      b: "ইভেন্ট ভেতরের এলিমেন্ট থেকে বাইরের দিকে উঠে যায়। তাই রো-এর ভেতরের বাটনে ক্লিক করলে রো-এর হ্যান্ডলারও চলে। বাটনের হ্যান্ডলারে স্টপ প্রোপাগেশন দিই, অথবা টার্গেট চেক করি।",
      e: "Events bubble up from child to parent. If a row has a click handler and a delete button inside it, clicking the button also runs the row handler. I fix this with stopPropagation, or by checking the event target."
    },
    {
      q: "একটি long-running async operation page থেকে চলে গেলেও state update করছে—কী সমস্যা হতে পারে?",
      m: "সমস্যা: memory leak, অপ্রয়োজনীয় network, আর পুরনো page-এর data নতুন page-এ ভুলভাবে দেখানো (race condition)। Fix: `useEffect`-এর cleanup-এ **AbortController.abort()** call করি, বা `ignore` flag রাখি। TanStack Query এটা নিজেই handle করে, তাই Dokani-তে আমি বেশিরভাগ জায়গায় ওটা ব্যবহার করেছি।",
      b: "এতে মেমরি লিক হয়, অপ্রয়োজনীয় নেটওয়ার্ক কল হয়, আর ভুল ডেটা দেখাতে পারে। পেজ ছাড়ার সময় ক্লিনআপে রিকোয়েস্ট বাতিল করে দিই।",
      e: "It can cause memory leaks, wasted network calls, and wrong data on screen. I cancel the request in the useEffect cleanup with AbortController, or use a library like TanStack Query that handles it."
    },
    {
      q: "localStorage-এ object save করে পরে data ভুল পাচ্ছ—কেন এবং কীভাবে ঠিক করবে?",
      m: "localStorage শুধু **string** রাখে। Object সরাসরি দিলে `\"[object Object]\"` save হয়। তাই `JSON.stringify` দিয়ে save, `JSON.parse` দিয়ে read করি — try/catch-এর ভিতরে, কারণ corrupt data থাকলে parse crash করবে। আরও মনে রাখি — Date object string হয়ে যায়, আর token-এর মতো sensitive data localStorage-এ রাখি না।",
      b: "লোকাল স্টোরেজ শুধু স্ট্রিং রাখে। তাই সেভ করার আগে জেসন স্ট্রিংগিফাই আর পড়ার সময় জেসন পার্স করি, ট্রাই-ক্যাচের ভেতরে। গোপন তথ্য এখানে রাখি না।",
      e: "localStorage only stores strings. If you save an object directly, it becomes object Object. I use JSON stringify to save and JSON parse inside try catch to read. I never keep sensitive tokens there."
    },
    {
      q: "একটি page-এ multiple event listener accidentally register হচ্ছে—এটি কীভাবে identify করবে?",
      m: "Chrome DevTools → Elements → **Event Listeners** tab-এ দেখি কয়টা listener আছে, বা console-এ `getEventListeners(window)`। সাধারণ কারণ — React `useEffect`-এ `addEventListener` দিয়ে cleanup-এ `removeEventListener` না দেওয়া, বা dependency ভুল থাকায় বারবার register। React StrictMode dev-এ effect দুইবার চালায়, তাই এই bug তাড়াতাড়ি ধরা পড়ে।",
      b: "ক্রোম ডেভটুলসের ইভেন্ট লিসেনার ট্যাবে দেখি কয়টা লিসেনার আছে। সাধারণত ইউজইফেক্টে লিসেনার যোগ করে ক্লিনআপে সরানো না হলে এটা হয়।",
      e: "I check the Event Listeners tab in Chrome DevTools. The usual reason is adding a listener in useEffect without removing it in the cleanup function.",
      code: `useEffect(() => {
  const onKey = (e) => { if (e.key === 'F2') openPayment(); };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
}, []);`
    },
    {
      q: "Production-এ কোনো function মাঝে মাঝে `Cannot read properties of undefined` দিচ্ছে—কীভাবে investigate করবে?",
      m: "“মাঝে মাঝে” মানে data-dependent বা timing-dependent। আমি: (১) error log/stack trace দেখি — কোন line, কোন user, কোন data, (২) source map দিয়ে আসল line বের করি, (৩) ওই API-র কোন case-এ field আসে না সেটা খুঁজি (যেমন customer ছাড়া walk-in sale), (৪) race condition আছে কিনা দেখি — data load হওয়ার আগে render। Fix-এর সাথে একটা test case যোগ করি।",
      b: "মাঝে মাঝে হলে বুঝি নির্দিষ্ট ডেটা বা টাইমিংয়ের কারণে হচ্ছে। লগ আর স্ট্যাক ট্রেস দেখি, কোন ডেটায় ফিল্ড অনুপস্থিত সেটা খুঁজি, আর ডেটা আসার আগে রেন্ডার হচ্ছে কিনা দেখি।",
      e: "If it happens only sometimes, it depends on specific data or timing. I check the logs and stack trace, find which data is missing the field, and check if the UI renders before data arrives. Then I fix it and add a test."
    },
    {
      q: "Dokani-তে cart calculation-এর logic server এবং client-এ duplicate না রেখে কীভাবে design করবে?",
      tag: "Dokani",
      m: "Rule হলো — **server is the source of truth**। Client শুধু preview দেখায়, কিন্তু final total, discount, VAT server আবার DB-র price দিয়ে calculate করে। Duplicate কমাতে calculation-টা একটা pure function (`calculateTotals`) হিসেবে **shared package**-এ রাখা যায়, যেটা frontend আর backend দুই জায়গায় import হয়। Client কখনো price পাঠায় না — শুধু productId আর qty।",
      b: "সার্ভারই আসল হিসাব করে। ক্লায়েন্ট শুধু আগাম দেখায়। ক্লায়েন্ট দাম পাঠায় না, শুধু প্রোডাক্ট আইডি আর পরিমাণ পাঠায়। হিসাবের ফাংশনটা একটা শেয়ার্ড প্যাকেজে রাখা যায় যেটা দুই দিকেই ব্যবহার হয়।",
      e: "The server is the source of truth. The client only shows a preview. The client never sends prices, only product IDs and quantities. The server recalculates totals from database prices. The calculation can live in a shared pure function used by both sides."
    }
  ]
});

window.QA.push({
  id: "typescript", title: "TypeScript", icon: "🔷", tier: "t2", short: "TS",
  note: "Dokani-র frontend আর backend দুটোই **TypeScript** — তাই এখানে বাস্তব উদাহরণ দিতে পারবে। Zod দিয়ে schema থেকে type বের করা (`z.infer`) অবশ্যই বলবে।",
  items: [
    { q: "interface আর type এর মধ্যে practical difference কী?",
      m: "দুটোই object shape define করে। `interface` extend আর **declaration merging** করা যায় — library বা object model-এর জন্য ভালো। `type` দিয়ে **union, intersection, tuple**, mapped type বানানো যায়। আমি object/props-এর জন্য interface, আর union বা complex type-এর জন্য type ব্যবহার করি।",
      b: "দুটোই অবজেক্টের গঠন বলে দেয়। ইন্টারফেস এক্সটেন্ড আর মার্জ করা যায়। টাইপ দিয়ে ইউনিয়ন, টুপলের মতো জটিল টাইপ বানানো যায়।",
      e: "Both describe object shapes. Interfaces can be extended and merged. Types can also describe unions, tuples and mapped types. I use interfaces for objects and props, and types for unions." },
    { q: "API response-এর জন্য TypeScript type কীভাবে বানাবে?",
      m: "আমি একটা generic wrapper বানাই কারণ Dokani-র সব API একই shape-এ response দেয়: `success`, `data`, `message`। তারপর `ApiResponse<Product[]>` এভাবে ব্যবহার করি।",
      b: "সব এপিআই একই গঠনে রেসপন্স দেয়, তাই একটা জেনেরিক টাইপ বানাই এবং ভেতরের ডেটার টাইপ আলাদা করে দিই।",
      e: "All my APIs return the same shape, so I create one generic wrapper type and pass the data type into it.",
      code: `interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  meta?: { page: number; limit: number; total: number };
}
const res = await api.get<ApiResponse<Product[]>>('/products');` },
    { q: "একটি field কখনও string, কখনও null এলে কীভাবে type করবে?",
      m: "Union দিয়ে: `phone: string | null`। তারপর ব্যবহার করার আগে **narrowing** করি — `if (phone)` বা `phone ?? 'N/A'`। `strictNullChecks` on থাকলে TypeScript আমাকে check করতে বাধ্য করে।",
      b: "ইউনিয়ন টাইপ দিয়ে লিখি, স্ট্রিং অথবা নাল। ব্যবহারের আগে চেক করি নাল কিনা।",
      e: "I use a union type, string or null. Before using it, I narrow the type with an if check or a default value." },
    { q: "Backend থেকে আসা user object-এর type কীভাবে define করবে?",
      m: "Backend-এর DTO অনুযায়ী interface বানাই — password বা sensitive field কখনো রাখি না। Role-এর জন্য string না দিয়ে **literal union** দিই: `role: 'OWNER' | 'MANAGER' | 'CASHIER'`। Prisma থাকলে `@prisma/client` থেকে generated type-ও ব্যবহার করা যায়, তবে frontend-এ সাধারণত আলাদা public type রাখি।",
      b: "ব্যাকএন্ড যেসব ফিল্ড পাঠায় সেগুলো দিয়ে ইন্টারফেস বানাই, পাসওয়ার্ড রাখি না। রোলের জন্য নির্দিষ্ট মানগুলোর ইউনিয়ন দিই।",
      e: "I create an interface that matches the backend response, without sensitive fields. For roles, I use a union of fixed values instead of a plain string." },
    { q: "any ব্যবহার না করে unknown external data কীভাবে handle করবে?",
      m: "`unknown` দিই — এটা safe, কারণ check না করে ব্যবহার করা যায় না। তারপর **Zod** দিয়ে parse করি: `schema.safeParse(data)`। Success হলে TypeScript নিজেই সঠিক type দেয়। Dokani backend-এ প্রতিটা request body Zod দিয়ে validate হয়।",
      b: "এনি না দিয়ে আননোন দিই, যাতে চেক না করে ব্যবহার করা না যায়। তারপর জড দিয়ে যাচাই করি, সফল হলে সঠিক টাইপ পাই।",
      e: "I use unknown instead of any, because unknown forces me to check the data first. Then I validate it with Zod. If parsing succeeds, I get a correct type." },
    { q: "Union type কোথায় practical কাজে লাগবে?",
      m: "Status-এর মতো fixed value-তে: `type SaleStatus = 'COMPLETED' | 'RETURNED' | 'VOID'`। আর **discriminated union**-এ — যেমন API state: `{status:'loading'} | {status:'error', error:string} | {status:'success', data:T}`। এতে switch-এ ভুল case miss হলে TypeScript ধরে ফেলে।",
      b: "নির্দিষ্ট কিছু মানের জন্য, যেমন বিক্রির স্ট্যাটাস বা পেমেন্ট মেথড। আর লোডিং, এরর, সফল এই তিন অবস্থা আলাদা করে বোঝাতে।",
      e: "Unions are great for fixed values like sale status or payment method. Discriminated unions are great for UI states like loading, error and success." },
    { q: "Optional property আর nullable property-এর পার্থক্য কী?",
      m: "`email?: string` মানে field টা **নাও থাকতে পারে** (undefined)। `email: string | null` মানে field **থাকবেই**, কিন্তু value null হতে পারে। PATCH request-এ পার্থক্যটা জরুরি — field না পাঠানো মানে “বদলাবো না”, আর null পাঠানো মানে “মুছে ফেলো”।",
      b: "অপশনাল মানে ফিল্ডটা না-ও থাকতে পারে। নালেবল মানে ফিল্ড থাকবে কিন্তু মান খালি হতে পারে। প্যাচ রিকোয়েস্টে এই পার্থক্য গুরুত্বপূর্ণ।",
      e: "Optional means the field may be missing. Nullable means the field exists but its value can be null. In a PATCH request, missing means do not change, and null means clear the value." },
    { q: "একটি reusable API response type কীভাবে তৈরি করবে?",
      m: "Generic দিয়ে — `ApiResponse<T>` আর paginated-এর জন্য `Paginated<T>`। Error-এর জন্য আলাদা `ApiError { code: string; message: string; details?: unknown }`। এগুলো একটা `types/api.ts`-এ রাখি, পুরো app সেখান থেকে import করে।",
      b: "জেনেরিক টাইপ দিয়ে একবার বানাই, তারপর যেকোনো ডেটার সাথে ব্যবহার করি। এরর আর পেজিনেশনের জন্যও আলাদা টাইপ রাখি।",
      e: "I build it once with generics, like ApiResponse of T and Paginated of T, and keep them in one shared file." },
    { q: "Generic function কেন ব্যবহার করবে?",
      m: "যখন function-এর logic একই কিন্তু data type আলাদা। যেমন `fetchList<T>(url): Promise<T[]>` — product, customer, supplier সবার জন্য এক function, কিন্তু type safety হারাই না। `any` দিলে autocomplete আর type check দুটোই হারাতাম।",
      b: "যখন কাজ একই কিন্তু ডেটার ধরন আলাদা। একটা ফাংশন দিয়ে সব ধরনের ডেটা হ্যান্ডেল করা যায়, কিন্তু টাইপ নিরাপত্তা থাকে।",
      e: "I use generics when the logic is the same but the data type changes. One function works for products, customers and suppliers, and I still keep type safety." },
    { q: "Record<string, something> কখন ব্যবহার করবে?",
      m: "যখন key-value map লাগে — যেমন `Record<string, number>` দিয়ে productId → stock lookup, বা `Record<PaymentMethod, number>` দিয়ে Cash/bKash/Nagad অনুযায়ী total। Key union হলে TypeScript নিশ্চিত করে সব key আছে।",
      b: "যখন কী-ভ্যালু ধরনের ডেটা লাগে, যেমন পেমেন্ট মেথড অনুযায়ী মোট টাকা। কী নির্দিষ্ট হলে সব কী আছে কিনা টাইপস্ক্রিপ্ট চেক করে।",
      e: "I use Record for key value maps, like totals by payment method. If the keys are a union, TypeScript makes sure every key exists." },
    { q: "একটি permission object-এর জন্য ভালো type কীভাবে বানাবে?",
      m: "Permission string গুলো `as const` array থেকে union বানাই, যাতে typo হলে compile error হয়। তারপর role → permission mapping `Record<Role, Permission[]>`।",
      b: "পারমিশনের নামগুলো একটা কনস্ট্যান্ট লিস্টে রাখি এবং তা থেকে টাইপ বানাই, যাতে ভুল বানান হলে এরর দেখায়।",
      e: "I keep permission names in a constant array and create a union type from it. A typo then becomes a compile error.",
      code: `const PERMS = ['sale.create', 'sale.void', 'product.edit', 'report.view'] as const;
type Permission = typeof PERMS[number];
const rolePerms: Record<Role, Permission[]> = {
  OWNER: [...PERMS],
  CASHIER: ['sale.create'],
};` },
    { q: "React component-এর props TypeScript দিয়ে কীভাবে define করবে?",
      m: "Interface দিয়ে props লিখি, optional prop-এ `?` আর default value destructure-এ দিই। Event handler-এর type `(id: string) => void`, children-এর জন্য `React.ReactNode`।",
      b: "ইন্টারফেস দিয়ে প্রপসের টাইপ লিখি। ঐচ্ছিক প্রপে প্রশ্নবোধক চিহ্ন দিই আর ডিফল্ট মান দিই।",
      e: "I define props with an interface, mark optional props with a question mark, and set default values while destructuring.",
      code: `interface ProductCardProps {
  product: Product;
  onAdd: (id: string) => void;
  compact?: boolean;
}
function ProductCard({ product, onAdd, compact = false }: ProductCardProps) { /* ... */ }` },
    { q: "একটি function একাধিক ধরনের result return করলে কীভাবে type করবে?",
      m: "**Result pattern** দিয়ে — `{ ok: true, data: T } | { ok: false, error: string }`। Caller `if (res.ok)` check করলে TypeScript ভিতরে সঠিক type দেয়। Exception throw করার চেয়ে এটা অনেক সময় বেশি readable।",
      b: "সফল আর ব্যর্থ দুই অবস্থার জন্য আলাদা গঠন রেখে ইউনিয়ন বানাই। কলার চেক করলে সঠিক টাইপ পায়।",
      e: "I use a result union: ok true with data, or ok false with an error. When the caller checks ok, TypeScript knows the correct type." },
    { q: "Backend validation আর TypeScript type-এর মধ্যে পার্থক্য কী?",
      m: "TypeScript শুধু **compile time**-এ কাজ করে — build-এর পর সব type মুছে যায়। Runtime-এ user বা Postman যা খুশি পাঠাতে পারে। তাই backend-এ **Zod** দিয়ে runtime validation লাগবেই। Dokani-তে Zod schema থেকেই `z.infer` দিয়ে type বানাই — এক জায়গায় দুটো কাজ।",
      b: "টাইপস্ক্রিপ্ট শুধু কোড লেখার সময় কাজ করে, চালানোর সময় না। তাই সার্ভারে আসল ডেটা যাচাইয়ের জন্য আলাদা ভ্যালিডেশন লাগে।",
      e: "TypeScript only works at compile time. Types disappear after build. At runtime anyone can send any data, so the backend still needs real validation like Zod." },
    { q: "Runtime-এ invalid data এলে TypeScript কেন একা তোমাকে বাঁচাতে পারবে না?",
      m: "কারণ TypeScript JavaScript-এ compile হয়, type তখন আর থাকে না। `api.get<User>()` লিখলে আমি শুধু TypeScript-কে **promise** করছি — আসলে data সেরকম কিনা কেউ check করছে না। তাই API boundary-তে runtime validation বা type guard লাগে।",
      b: "কারণ চালানোর সময় টাইপ থাকে না। এপিআই থেকে কী আসবে সেটা টাইপস্ক্রিপ্ট শুধু বিশ্বাস করে, যাচাই করে না।",
      e: "Because types are removed after compiling. When I write a type on an API call, I only promise it to TypeScript. Nobody really checks the data, so I need runtime validation." },
    { q: "একটি payment API response unexpected structure দিলে কীভাবে safe type guard করবে?",
      m: "Payment-এ ঝুঁকি নিই না। Gateway response Zod schema দিয়ে parse করি; fail হলে payment **pending** রাখি, log করি, আর reconciliation cron পরে gateway-এর verify API call করে confirm করে। কখনো ধরে নিই না যে payment success।",
      b: "পেমেন্টের রেসপন্স স্কিমা দিয়ে যাচাই করি। গঠন না মিললে পেমেন্ট পেন্ডিং রাখি, লগ করি, আর পরে আবার গেটওয়ে থেকে যাচাই করি। কখনো সফল ধরে নিই না।",
      e: "I validate the gateway response with a schema. If it does not match, I keep the payment pending, log it, and verify it later with the gateway. I never assume success.",
      code: `const BkashExecute = z.object({ transactionStatus: z.string(), trxID: z.string(), amount: z.string() });
const parsed = BkashExecute.safeParse(raw);
if (!parsed.success || parsed.data.transactionStatus !== 'Completed') return markPending(orderId);` },
    { q: "as ব্যবহার করে type assertion দিলে কী ঝুঁকি?",
      m: "`as` দিয়ে আমি TypeScript-কে চুপ করিয়ে দিই — “আমি জানি এটা User”। ভুল হলে compile-এ error আসে না, runtime-এ crash হয়। তাই `as` শুধু তখন দিই যখন সত্যিই নিশ্চিত, যেমন DOM element। বাকি জায়গায় type guard বা validation।",
      b: "এজ দিয়ে টাইপস্ক্রিপ্টকে চুপ করিয়ে দেওয়া হয়। ভুল হলে চালানোর সময় ক্র্যাশ করে। তাই খুব নিশ্চিত না হলে ব্যবহার করি না।",
      e: "Using as tells TypeScript to trust me. If I am wrong, there is no compile error, but the app can crash at runtime. I only use it when I am really sure." },
    { q: "বড় project-এ type duplication কীভাবে কমাবে?",
      m: "Utility type ব্যবহার করি: `Pick`, `Omit`, `Partial`। যেমন `type CreateProductDto = Omit<Product, 'id' | 'createdAt'>` আর `type UpdateProductDto = Partial<CreateProductDto>`। Zod schema থেকে `z.infer` করে type বানাই, আর shared types একটা ফোল্ডারে রাখি।",
      b: "পিক, ওমিট, পার্শিয়ালের মতো ইউটিলিটি টাইপ দিয়ে একটা টাইপ থেকে আরেকটা বানাই। স্কিমা থেকে টাইপ তৈরি করি।",
      e: "I use utility types like Pick, Omit and Partial to build new types from existing ones, and I infer types from Zod schemas." },
    { q: "MongoDB document এবং frontend model-এর type mismatch হলে কী করবে?",
      m: "সাধারণ mismatch: `_id` (ObjectId) vs `id` (string), আর Date vs ISO string। আমি backend-এ একটা **mapper/serializer** রাখি যেটা document-কে clean DTO-তে convert করে (`toJSON` transform)। Frontend সবসময় DTO type ব্যবহার করে, DB-র shape না।",
      b: "সাধারণত আইডি আর তারিখের ধরন মেলে না। ব্যাকএন্ডে একটা ম্যাপার রাখি যেটা ডকুমেন্টকে পরিষ্কার ডেটায় রূপান্তর করে।",
      e: "The usual mismatch is underscore id versus id, and Date versus string. I add a mapper on the backend that turns the document into a clean DTO." },
    { q: "Dokani-এর Shop, User, Product, Sale entity-গুলোর shared types কীভাবে organize করবে?", tag: "Dokani",
      m: "Backend-এ Prisma generated type + প্রতিটা module-এ `*.schema.ts` (Zod) থেকে input type। Frontend-এ `src/types/` ফোল্ডারে domain অনুযায়ী ফাইল: `product.ts`, `sale.ts`। Ideal হলো monorepo-তে `packages/shared` রাখা যেখানে Zod schema আর type দুই app share করে।",
      b: "ব্যাকএন্ডে প্রিজমার টাইপ আর প্রতিটা মডিউলের স্কিমা থেকে টাইপ। ফ্রন্টএন্ডে টাইপস ফোল্ডারে বিষয় অনুযায়ী ফাইল। ভালো হয় একটা শেয়ার্ড প্যাকেজ রাখলে।",
      e: "On the backend I use Prisma types and Zod schema types per module. On the frontend I keep a types folder grouped by domain. The ideal setup is a shared package used by both apps." }
  ]
});
