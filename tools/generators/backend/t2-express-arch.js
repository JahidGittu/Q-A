// Topic 2: Express.js Layered Architecture & REST API (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "express-architecture",
  name: "Express.js Layered Architecture & REST APIs",
  desc: "Clean Layered Architecture, Controller-Service-Repository Pattern, Express Middleware Lifecycle, Routing, Error Middleware",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Express.js-এ 3-Tier Layered Architecture (Controller-Service-Repository) কেন ইন্ডাস্ট্রি স্ট্যান্ডার্ড?",
      m: "যদি রাউটের ভেতরেই সরাসরি ডাটাবেজ কোয়েরি এবং বিজনেস লজিক লেখা হয়, তবে কোডবেজ 'স্প্যাগেটি' হয়ে যায় এবং টেস্টিং অসম্ভব হয়ে পড়ে। 3-Tier আর্কিটেকচারে দায়িত্ব ভাগ করা থাকে: (১) `Controller`: HTTP রিকোয়েস্ট গ্রহণ করে, ভ্যালিডেট করে এবং রেসপন্স পাঠায়। (২) `Service`: মূল বিজনেস লজিক, ডিসকাউন্ট বা ট্যাক্স ক্যালকুলেশন ও থার্ড-পার্টি ইন্টিগ্রেশন করে। (৩) `Repository`: ডাটাবেজ কোয়েরি (Prisma/SQL/Mongo) চালায়। এর ফলে প্রতিটি লেয়ার সম্পূর্ণ স্বাধীন ও সহজে টেস্টেবল হয়।",
      b: "লেয়ার্ড আর্কিটেকচারে দায়িত্বগুলো সুনির্দিষ্ট থাকে: কন্ট্রোলার শুধুমাত্র এইচটিটিপি রিকোয়েস্ট ও রেসপন্স নিয়ন্ত্রণ করে, সার্ভিস স্তর মূল ব্যবসায়িক যুক্তি পরিচালনা করে এবং রিপোজিটরি ডাটাবেজ অপারেশন সম্পন্ন করে। এটি কোডকে পরিচ্ছন্ন, পরিবর্তনযোগ্য এবং পরীক্ষাযোগ্য রাখে।",
      e: "The Controller-Service-Repository pattern enforces strict Separation of Concerns. Controllers manage HTTP transport contracts, Services encapsulate core domain business logic, and Repositories handle database persistence abstractions.",
      tip: "কখনোই কন্ট্রোলারের ভেতরে সরাসরি Prisma বা SQL কোয়েরি লিখবে না—সার্ভিস লেয়ারে বিজনেস লজিক রাখার কথা ইন্টারভিউতে বলবে।"
    },
    {
      lvl: "lvl1",
      q: "Express.js Middleware কী এবং `next()` ফাংশনের কাজ কী?",
      m: "Middleware হলো এমন একটি ফাংশন যার কাছে Request অবজেক্ট (`req`), Response অবজেক্ট (`res`), এবং পরবর্তী মিডলওয়্যারে যাওয়ার ফাংশন `next` এক্সেস থাকে। মিডলওয়্যার রিকোয়েস্ট মডিফাই করতে পারে (যেমন ইউজার আইডি ইনজেক্ট করা), অথেনটিকেশন চেক করতে পারে বা রিকোয়েস্ট লগ করতে পারে। কাজ শেষে `next()` কল করলে রিকোয়েস্ট পাইপলাইনে পরবর্তী মিডলওয়্যারে যায়। আর যদি `next()` কল না করে রেসপন্সও না পাঠানো হয়, তবে রিকোয়েস্ট আজীবন হ্যাং হয়ে থাকবে।",
      b: "মিডলওয়্যার হলো রিকোয়েস্ট ও রেসপন্সের মধ্যবর্তী প্রক্রিয়াকরণ ফাংশন। next() কল করার মাধ্যমে পরবর্তী মিডলওয়্যার বা কন্ট্রোলারে রিকোয়েস্ট পাঠানো হয়। এটি না ডাকলে ব্রাউজারের রিকোয়েস্ট চিরতরে আটকে থাকবে।",
      e: "Express middleware functions access the `req`, `res`, and `next` references. They execute intermediate logic like authentication, logging, or input parsing. Invoking `next()` forwards execution to the next handler in the stack; failing to do so hangs the client connection.",
      code: "const authMiddleware = (req, res, next) => {\n  if (!req.headers.authorization) return res.status(401).send('No token');\n  next();\n};"
    },
    {
      lvl: "lvl1",
      q: "Express-এ ৫ প্রকার মিডলওয়্যার কী কী (Application, Router, Error-handling, Built-in, Third-party)?",
      m: "(১) `Application-level`: পুরো অ্যাপে গ্লোবালি চলে (`app.use(...)`)। (২) `Router-level`: নির্দিষ্ট রাউট মডিউলে চলে (`router.use(...)`)। (৩) `Error-handling`: ৪টি আর্গুমেন্ট বিশিষ্ট স্পেশাল মিডলওয়্যার (`(err, req, res, next) => ...`) যা সব এরর ক্যাচ করে। (৪) `Built-in`: এক্সপ্রেসের নিজস্ব মিডলওয়্যার যেমন `express.json()`, `express.static()`। (৫) `Third-party`: এনপিএম প্যাকেজ যেমন `cors()`, `helmet()`, `morgan()`।",
      b: "এক্সপ্রেসের ৫টি মিডলওয়্যার স্তর হলো: অ্যাপ্লিকেশন লেভেল, রাউটার লেভেল, এরর হ্যান্ডলিং লেভেল (৪টি প্যারামিটার বিশিষ্ট), এক্সপ্রেসের বিল্ট-ইন লেভেল এবং থার্ড পার্টি প্যাকেজ।",
      e: "The five middleware tiers are Application-level (`app.use`), Router-level (`router.use`), Error-handling middleware (`(err, req, res, next)`), Built-in middleware (`express.json()`), and Third-party packages (`cors`, `helmet`).",
      code: "app.use(express.json()); // Built-in\napp.use('/api', apiRouter); // Router-level\napp.use((err, req, res, next) => res.status(500).json({ err: err.message })); // Error"
    },
    {
      lvl: "lvl1",
      q: "`app.use(express.json())` এবং `express.urlencoded()` কেন প্রতি প্রজেক্টের শুরুতে দেওয়া আবশ্যক?",
      m: "Node.js ইনকামিং HTTP রিকোয়েস্ট বডিকে কাঁচা স্ট্রিম বা বাফার আকারে রিসিভ করে। `express.json()` মিডলওয়্যার সেই ইনকামিং JSON পেলোডকে ব্যাকগ্রাউন্ডে স্ট্রিম থেকে অ্যাসেম্বল করে পার্স করে জাভাস্ক্রিপ্ট অবজেক্ট হিসেবে `req.body`-তে অ্যাটাচ করে দেয়। এটি না দিলে `req.body` সবসময় `undefined` থাকবে এবং পোস্ট করা কোনো ডেটা পড়া যাবে না। আর `express.urlencoded()` সাধারণ HTML ফর্ম সাবমিশনের URL-encoded ডেটা পার্স করে।",
      b: "এইচটিটিপি রিকোয়েস্টের বডি কাঁচা স্ট্রিম আকারে আসে। express.json() সেই স্ট্রিম পার্স করে req.body তে অবজেক্ট তৈরি করে দেয়, যার ফলে কন্ট্রোলারে ডেটা পড়া সম্ভব হয়।",
      e: "`express.json()` reads the raw incoming request stream, parses valid JSON bodies, and exposes the parsed payload onto `req.body`. Without it, `req.body` resolves to undefined for incoming POST/PUT JSON calls.",
      code: "app.use(express.json({ limit: '10mb' }));\napp.use(express.urlencoded({ extended: true }));"
    },
    {
      lvl: "lvl1",
      q: "Express Router (`express.Router()`) ব্যবহার করে মডুলার রাউটিং কীভাবে করা হয়?",
      m: "একটি বড় অ্যাপ্লিকেশনে সব রাউট `server.js` ফাইলে লিখলে ফাইল হাজার হাজার লাইন হয়ে আন-মেইনটেইনেবল হয়ে যায়। `express.Router()` হলো একটি মিনি এক্সপ্রেস অ্যাপ যা সম্পূর্ণ আইসোলেটেড রাউট গ্রুপ তৈরি করতে দেয় (যেমন `auth.routes.ts`, `product.routes.ts`, `invoice.routes.ts`)। প্রতিটি রাউটার আলাদা ফাইলে লিখে এক্সপোর্ট করা হয় এবং মূল অ্যাপে প্রিফিক্স সহ মাউন্ট করা হয় (`app.use('/api/v1/products', productRouter)`।",
      b: "এক্সপ্রেস রাউটার মডিউল আকারে বিভিন্ন রিসোর্সের রাউট আলাদা ফাইলে সাজাতে সাহায্য করে। ফলে অ্যাথ, প্রোডাক্ট ও ইনভয়েসের রাউট আলাদা থেকে মূল অ্যাপে ক্লিনভাবে যুক্ত হয়।",
      e: "express.Router() encapsulates isolated, modular sub-routing trees. Routes are partitioned across dedicated feature files (e.g. `routes/auth.ts`) and mounted onto the parent app with API version prefixes (`app.use('/api/v1', authRoutes)`).",
      code: "const router = express.Router();\nrouter.get('/:id', productController.getById);\nexport default router;"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Express 5-এ সবচেয়ে বড় পরিবর্তন কী এবং এটি কীভাবে অ্যাসিনক্রোনাস এরর হ্যান্ডলিং সহজ করেছে?",
      m: "Express 4-এ অ্যাসিনক্রোনাস ফাংশনের ভেতর কোনো প্রমিজ রিজেক্ট বা এরর হলে এক্সপ্রেস তা নিজে ধরতে পারত না; ডেভেলপারকে প্রতি ফাংশনে ম্যানুয়াল `try/catch` লিখে `next(err)` কল করতে হতো, অন্যথায় সার্ভার আনহ্যান্ডেলড রিজেকশনে হ্যাং হতো। Express 5-এ অ্যাসিনক্রোনাস রাউট হ্যান্ডলারের জন্য বিল্ট-ইন সাপোর্ট এসেছে—এখন যেকোনো `async` ফাংশনে এরর থ্রো হলে এক্সপ্রেস স্বয়ংক্রিয়ভাবে প্রমিজ রিজেকশন ক্যাচ করে গ্লোবাল এরর হ্যান্ডলিং মিডলওয়্যারে পাঠিয়ে দেয়, কোনো অতিরিক্ত র‍্যাপার ছাড়াই!`,",
      b: "এক্সপ্রেস ৫-এর সবচেয়ে বড় আপডেট হলো স্বয়ংক্রিয় অ্যাসিনক্রোনাস এরর হ্যান্ডলিং। async ফাংশনে এরর থ্রো হলে এক্সপ্রেস নিজে থেকেই তা ধরে সেন্ট্রালাইজড এরর মিডলওয়্যারে পাঠিয়ে দেয়, ফলে বারবার try/catch লেখার প্রয়োজন ফুরিয়ে যায়।",
      e: "Express 5 natively catches rejected promises thrown from async route handlers and forwards them automatically to the global error middleware stack without requiring manual try/catch blocks or `express-async-errors` monkey-patches.",
      tip: "Express 5 এর এই অ্যাসিনক্রোনাস এরর মেকানিজম ইন্টারভিউতে উল্লেখ করলে বোঝা যায় তুমি আধুনিক নোড ইকোসিস্টেমের খবর রাখো।"
    },
    {
      lvl: "lvl2",
      q: "Dependency Injection (DI) প্যাটার্ন কীভাবে Express-এ সার্ভিস এবং রিপোজিটরি টেস্ট করতে সাহায্য করে?",
      m: "হার্ডকোড করে ক্লাসের ভেতর সরাসরি ডাটাবেজ মডেল ইমপোর্ট করার বদলে আমরা কনস্ট্রাক্টরের মাধ্যমে ডিপেনডেন্সি পাস করি (যেমন: `constructor(private productRepo: IProductRepository)`। এর ফলে ইউনিট টেস্ট লেখার সময় আসল ডাটাবেজ কানেকশনের বদলে আমরা খুব সহজে একটি মক রিপোজিটরি অবজেক্ট ইনজেক্ট করতে পারি। কোড সম্পূর্ণ ডিকাপল্ড থাকে এবং যেকোনো সময় ডাটাবেজ বা ওআরএম পরিবর্তন করা সহজ হয়।",
      b: "ডিপেনডেন্সি ইনজেকশন সরাসরি ইমপোর্টের বদলে প্যারামিটার আকারে সার্ভিস বা রিপোজিটরি গ্রহণ করে। এর ফলে ইউনিট টেস্টের সময় আসল ডাটাবেজের বদলে ফেইক বা মক অবজেক্ট পাস করে নিখুঁত টেস্টিং নিশ্চিত করা যায়।",
      e: "Dependency Injection decouples classes by injecting external dependencies (repositories, loggers) through constructors rather than hardcoding imports. This facilitates mocking database boundaries during unit testing without spinning up live test databases.",
      code: "export class OrderService {\n  constructor(private orderRepo: IOrderRepo, private mailer: IMailer) {}\n  async create(order: OrderDto) { ... }\n}"
    },
    {
      lvl: "lvl2",
      q: "Express-এ Rate Limiting এবং Brute Force Protection কীভাবে আর্কিটেক্ট করবে (`express-rate-limit` + Redis)?",
      m: "ডিফল্ট মেমোরি বেসড রেট লিমিটিং মাল্টিপল সার্ভার ইনস্ট্যান্সে কাজ করে না। এন্টারপ্রাইজ সিস্টেমে আমরা `express-rate-limit` এর সাথে `rate-limit-redis` স্টোর ব্যবহার করি। ইউজারের আইপি বা অথেনটিকেটেড ইউজার আইডির ওপর ভিত্তি করে রেডিসে কিউমিলেটিভ কাউন্টার রাখা হয় (যেমন: লগইন রাউটে ১৫ মিনিটে সর্বোচ্চ ৫টি রিকোয়েস্ট)। লিমিট অতিক্রম করলে এক্সপ্রেস তৎক্ষণাৎ `429 Too Many Requests` সহ `Retry-After` হেডার রিটার্ন করে ব্রুট-ফোর্স অ্যাটাক প্রতিরোধ করে।",
      b: "রেট লিমিটিং অতিরিক্ত রিকোয়েস্ট ও ব্রুট ফোর্স আক্রমণ প্রতিরোধ করে। একাধিক সার্ভার ক্লাস্টারের জন্য রেডিস স্টোর ব্যবহার করে ১৫ মিনিটে সর্বোচ্চ ৫টি লগইন ট্রাইয়ের লিমিট বেঁধে দেওয়া হয় এবং অতিক্রম করলে ৪২৯ স্ট্যাটাস কোড প্রদান করা হয়।",
      e: "Protect endpoints against brute force using `express-rate-limit` coupled with a distributed Redis store (`rate-limit-redis`). Enforcing sliding windows (e.g., 5 attempts per 15 minutes on `/auth/login`) yields standard `429 Too Many Requests` responses upon breach.",
      code: "const loginLimiter = rateLimit({\n  windowMs: 15 * 60 * 1000,\n  max: 5,\n  store: new RedisStore({ sendCommand: (...args) => redisClient.sendCommand(args) })\n});"
    },
    {
      lvl: "lvl2",
      q: "CORS (Cross-Origin Resource Sharing) কীভাবে কাজ করে এবং প্রি-ফ্লাইট (`OPTIONS`) রিকোয়েস্ট কী?",
      m: "ব্রাউজারের Same-Origin Policy নিরাপত্তার কারণে এক ডোমেনের ফ্রন্টএন্ড থেকে অন্য ডোমেনের ব্যাকএন্ডে রিকোয়েস্ট ব্লক করে। সার্ভার `Access-Control-Allow-Origin` হেডার দিয়ে নির্দিষ্ট ডোমেনকে অনুমতি দেয়। যখন রিকোয়েস্টে কাস্টম হেডার (যেমন `Authorization`) বা নন-সিম্পল মেথড (PUT/DELETE) থাকে, ব্রাউজার আসল রিকোয়েস্ট পাঠানোর ঠিক আগে স্বয়ংক্রিয়ভাবে একটি হালকা `OPTIONS` প্রি-ফ্লাইট রিকোয়েস্ট পাঠায় সার্ভারের অনুমতি যাচাই করতে। এক্সপ্রেসের `cors()` মিডলওয়্যার এই হ্যান্ডশেক পরিচালনা করে।",
      b: "সিওআরএস ব্রাউজারের সুরক্ষার জন্য ভিন্ন ডোমেন থেকে আসা রিকোয়েস্ট যাচাই করে। জটিল এপিআই কলের ক্ষেত্রে ব্রাউজার প্রথমে একটি OPTIONS রিকোয়েস্ট পাঠিয়ে সার্ভারের অনুমতি নিশ্চিত করে, যাকে প্রি-ফ্লাইট বলা হয়।",
      e: "CORS is a browser security mechanism restricting cross-origin HTTP requests. For complex requests (custom headers, PUT/DELETE), the browser pre-emptively dispatches an HTTP `OPTIONS` preflight request to verify allowed origins, headers, and credentials before firing the real call.",
      code: "app.use(cors({\n  origin: ['https://dokani.bip.sg'],\n  credentials: true,\n  methods: ['GET', 'POST', 'PUT', 'DELETE']\n}));"
    },
    {
      lvl: "lvl2",
      q: "Centralized Error Handling Middleware এক্সপ্রেসের কল স্ট্যাকে সবার শেষে কেন রাখতে হয়?",
      m: "এক্সপ্রেস মিডলওয়্যারগুলো যে অর্ডারে কোডে ডিক্লেয়ার করা হয়, হুবহু সেই অর্ডারে রিকোয়েস্ট এক্সেকিউট করে। এরর হ্যান্ডলারকে সবার শেষে (`app.use((err, req, res, next) => ...)` রাখতে হয় যাতে তার পূর্বের যেকোনো রাউট বা মিডলওয়্যারে এরর ঘটলে বা `next(err)` কল করা হলে তা নিচে প্রবাহিত হয়ে সরাসরি এই এরর মিডলওয়্যারে এসে জমা হতে পারে। যদি এটি রাউটের আগে রাখা হতো, তবে রাউটের ভেতরে ঘটা এররগুলো কখনোই এর কাছে পৌঁছাত না।",
      b: "এরর হ্যান্ডলিং মিডলওয়্যার সবার শেষে না রাখলে পূর্ববর্তী রাউটের কোনো ত্রুটি সেখানে পৌঁছাবে না। এক্সপ্রেস সিকোয়েন্সিয়াল এক্সিকিউশন মেনে চলায় সবার শেষের এরর হ্যান্ডলারই পুরো অ্যাপের সমস্ত এরর একত্রিতভাবে গ্রহণ করতে পারে।",
      e: "Express executes handlers sequentially in registration order. Error middleware (`(err, req, res, next)`) must sit at the absolute bottom of the stack so that errors thrown or passed via `next(err)` upstream naturally cascade down into the centralized trap.",
      tip: "এরর মিডলওয়্যারের ৪টি প্যারামিটার (err, req, res, next) অক্ষত রাখতে হবে—একটি প্যারামিটার বাদ দিলেও এক্সপ্রেস এটিকে সাধারণ মিডলওয়্যার মনে করবে।"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Hexagonal Architecture (Ports and Adapters) বা Onion Architecture এক্সপ্রেসে কীভাবে বাস্তবায়ন করবে?",
      m: "হেক্সাগোনাল আর্কিটেকচারের কেন্দ্রবিন্দু হলো 'Core Domain Entities & Business Rules'। এর বাইরে থাকে 'Ports' (ইনপুট ও আউটপুট ইন্টারফেস যেমন `IOrderRepository`, `IPaymentGateway`)। আর সবার বাইরের স্তরে থাকে 'Adapters' (ইনপুট অ্যাডাপ্টার হিসেবে Express HTTP রাউট এবং আউটপুট অ্যাডাপ্টার হিসেবে Prisma/PostgreSQL বা bKash SDK)। এর ফলে এক্সপ্রেস ফ্রেমওয়ার্ক বা ডাটাবেজ যেকোনো সময় রিপ্লেস করা যায় কিন্তু কোর বিজনেস লজিক ১০০% অপরিবর্তিত থাকে।",
      b: "হেক্সাগোনাল আর্কিটেকচারে কোর বিজনেস লজিক ফ্রেমওয়ার্ক ও ডাটাবেজ থেকে সম্পূর্ণ স্বাধীন থাকে। পোর্টস ইন্টারফেসের সাহায্যে এক্সপ্রেস কন্ট্রোলার এবং ডাটাবেজ অ্যাডাপ্টার যুক্ত হয়, ফলে ভবিষ্যতে এক্সপ্রেস বা ডাটাবেজ পরিবর্তন করলেও কোর বিজনেসে কোনো হাত দিতে হয় না।",
      e: "Hexagonal Architecture encapsulates Domain Entities and Use Cases inside the core, surrounded by Ports (interfaces). Outer Adapters plug into these ports: Driving Adapters (Express HTTP controllers) and Driven Adapters (Prisma, bKash APIs). This guarantees absolute framework-agnostic business logic.",
      tip: "এন্টারপ্রাইজ ব্যাকএন্ড আর্কিটেকচারের জন্য হেক্সাগোনাল আর্কিটেকচার হলো প্রিমিয়ামতম আলোচনা।"
    },
    {
      lvl: "lvl3",
      q: "AsyncLocalStorage কী এবং Express-এ রিকোয়েস্ট ট্রেসিংয়ে (Correlation ID) এটি কীভাবে কাজ করে?",
      m: "Node.js-এর `AsyncLocalStorage` থ্রেড-লোকাল স্টোরেজের মতো কাজ করে যা পুরো অ্যাসিনক্রোনাস কল চেইন জুড়ে ডেটা পারসিস্ট করে। আমরা প্রতিটি ইনকামিং রিকোয়েস্টে একটি ইউনিক `x-correlation-id` (UUID) তৈরি করি এবং `asyncLocalStorage.run({ traceId }, next)` দিয়ে রান করাই। এর চমৎকার সুবিধা হলো: সার্ভিস বা রিপোজিটরি লেয়ারে ম্যানুয়ালি `req` অবজেক্ট পাস না করেও যেকোনো ডিপ ফাংশন থেকে সরাসরি কারেন্ট ট্রেস আইডি রিড করা যায় এবং উইনস্টন লগে স্বয়ংক্রিয়ভাবে জুড়ে দেওয়া যায়।",
      b: "AsyncLocalStorage প্রতিটি অ্যাসিনক্রোনাস চেইনের ভেতর কনটেক্সট ডাটা ধরে রাখে। এর মাধ্যমে রিকোয়েস্ট আইডি সব লেয়ারের লগে স্বয়ংক্রিয়ভাবে যুক্ত করে হাজার হাজার লাইভ রিকোয়েস্টের মধ্য থেকে নির্দিষ্ট ট্রানজাকশন ডিবাগ করা যায়।",
      e: "AsyncLocalStorage creates asynchronous context continuity across nested function calls without passing `req` down the stack. It isolates request-scoped state (Correlation ID, tenantId), automatically attaching trace IDs to downstream Winston logs for end-to-end distributed tracing.",
      code: "import { AsyncLocalStorage } from 'async_hooks';\nexport const requestContext = new AsyncLocalStorage<{ traceId: string }>();"
    },
    {
      lvl: "lvl3",
      q: "Event-Driven Architecture (EDA): ইনভয়েস তৈরি হওয়ার পর নোটিফিকেশন, ইনভেন্টরি হ্রাস ও অ্যাকাউন্টিং আপডেট কীভাবে ডিকাপল্ড করবে?",
      m: "যদি ইনভয়েস তৈরির কন্ট্রোলারের ভেতরেই এসএমএস পাঠানো, স্টক কমানো এবং ব্যালেন্স শিট আপডেট কোড সিনক্রোনাসলি লেখা হয়, তবে যেকোনো একটি সার্ভিস স্লো হলে পুরো বিলিং হ্যাং হবে। সমাধান: ইনভয়েস তৈরির পর আমরা একটি ডোমেন ইভেন্ট ফায়ার করব (`eventEmitter.emit('invoice.created', invoice)` অথবা RabbitMQ/Kafka-তে মেসেজ পাঠাব)। বিভিন্ন স্বাধীন লিসেনার ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে সেই ইভেন্ট হ্যান্ডেল করবে। ফলে ইনভয়েস এপিআই মাত্র ২০ মিলিসেকেন্ডে ফিনিশ হয়ে যাবে।",
      b: "ইভেন্ট-ড্রিভেন আর্কিটেকচারে মূল কাজ শেষ করে একটি ইভেন্ট প্রকাশ করা হয়। স্টক কাটা ও এসএমএস পাঠানোর কাজগুলো ব্যাকগ্রাউন্ড লিসেনার আলাদাভাবে সম্পন্ন করে, যার ফলে মূল এপিআই অবিলম্বে রেসপন্স দিতে পারে।",
      e: "Decouple secondary side effects using Domain Events. The invoice service commits the sale and emits `invoice.created` over an EventEmitter or message broker (RabbitMQ/BullMQ). Subscribed decoupled workers handle SMS dispatch and ledger updates asynchronously.",
      code: "eventBus.publish('order.created', { orderId: order.id, tenantId });"
    },
    {
      lvl: "lvl3",
      q: "Zero-Downtime Hot Code Reload এবং Blue-Green Deployment-এর সময় ইন-ফ্লাইট HTTP কানেকশন ড্রপ হওয়া কীভাবে রোধ করবে?",
      m: "Blue-Green ডিপ্লয়মেন্টে আমরা দুটি আইডেন্টিকাল প্রোডাকশন এনভায়রনমেন্ট রাখি (Blue = বর্তমান লাইভ, Green = নতুন ভার্সন)। নতুন কোড গ্রীনে ডিপ্লয় করে হেলথ চেক পাস করার পর Nginx বা লোড ব্যালেন্সারে ট্রাফিক গ্রীনে সুইচ করা হয়। ব্লু পরিবেশ বন্ধ করার আগে একটি ৩০ সেকেন্ডের ড্রেন পিরিয়ড দেওয়া হয় যাতে পূর্বের চলমান ইন-ফ্লাইট রিকোয়েস্টগুলো সফলভাবে শেষ হতে পারে। কোনো ব্যবহারকারী কানেকশন ড্রপ বা এরর ফেস করে না।",
      b: "ব্লু-গ্রিন ডিপ্লয়মেন্টে পুরানো সার্ভার বন্ধ করার আগে লোড ব্যালেন্সার নতুন সার্ভারে ট্রাফিক দেয় এবং চলমান কানেকশনগুলো শেষ করার জন্য ড্রেন পিরিয়ড দিয়ে জিরো ডাউনটাইম নিশ্চিত করে।",
      e: "Blue-Green deployments spin up identical new production clusters (Green). Once health checks pass, the edge reverse proxy switches traffic instantaneously. The decommissioned Blue cluster drains active in-flight requests gracefully over 30 seconds before termination.",
      tip: "ইন্টারভিউতে 'Connection Draining' এবং 'Health-check gating' শব্দগুলো উল্লেখ করবে।"
    },
    {
      lvl: "lvl3",
      q: "HTTP Request Smuggling এবং Prototype Pollution অ্যাটাক থেকে এক্সপ্রেস ব্যাকএন্ডকে কীভাবে সুরক্ষিত রাখবে?",
      m: "Request Smuggling ঘটে যখন ফ্রন্টএন্ড রিভার্স প্রক্সি (Nginx) এবং ব্যাকএন্ড এক্সপ্রেস সার্ভার `Content-Length` বনাম `Transfer-Encoding` ভিন্নভাবে ব্যাখ্যা করে। সমাধান: HTTP/2 বা HTTP/3 স্ট্যান্ডার্ড এনফোর্স করা এবং Nginx-এ কনফ্লিক্টিং হেডার ব্লক করা। Prototype Pollution থেকে বাঁচতে: ইউজার ইনপুট পার্সিংয়ে অবজেক্টের `__proto__`, `constructor`, বা `prototype` কি কঠোরভাবে নিষিদ্ধ করতে হবে এবং Zod বা `Object.create(null)` ব্যবহার করতে হবে।",
      b: "রিকোয়েস্ট স্মাগলিং ঠেকাতে রিভার্স প্রক্সিতে কঠোর এইচটিটিপি হেডার যাচাই করতে হবে। প্রোটোটাইপ পলিউশন প্রতিরোধে ইনপুটে __proto__ বা কনস্ট্রাক্টর ব্লক করে Zod স্কিমা দিয়ে ডাটা স্যানিটাইজ করা বাধ্যতামূলক।",
      e: "Mitigate HTTP Request Smuggling by harmonizing HTTP/2 at edge proxies and rejecting ambiguous Transfer-Encoding/Content-Length headers. Eradicate Prototype Pollution by stripping `__proto__` and `constructor` keys via Zod and utilizing `Object.create(null)` dictionaries.",
      code: "const safeDict = Object.create(null);"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "প্রোডাকশনে একটি স্পেসিফিক Express রাউটে রিকোয়েস্ট পাঠালে ক্লায়েন্ট অনির্দিষ্টকালের জন্য লোডিং স্পিনার দেখে বসে থাকে এবং কোনো রেসপন্স পায় না। কীভাবে ট্রাবলশুট করবে?",
      m: "কারণ: ওই রাউট হ্যান্ডলার বা কোনো ইন্টারমিডিয়েট মিডলওয়্যারে কোড এমন কোনো ব্রাঞ্চে (Branch) প্রবেশ করেছে যেখানে `res.send()` বা `res.json()` কল করা হয়নি এবং `next()` ও ডাকা হয়নি! ট্রাবলশুটিং: (১) কোডের সব `if/else` এবং `try/catch` ব্রাঞ্চ পরীক্ষা করব। (২) প্রোডাকশন প্রটেকশনের জন্য `express-timeout-handler` বা `connect-timeout` মিডলওয়্যার বসাব যা কোনো রিকোয়েস্ট ১০ সেকেন্ডের মধ্যে রেসপন্স না দিলে স্বয়ংক্রিয়ভাবে `504 Gateway Timeout` রিটার্ন করে কানেকশন ক্লোজ করবে।",
      b: "এই সমস্যা ঘটে যখন কোনো মিডলওয়্যারে রেসপন্স পাঠানো হয় না এবং next() ও কল করা হয় না। কোডের সব শর্ত পরীক্ষা করতে হবে এবং connect-timeout মিডলওয়্যার দিয়ে সর্বোচ্চ সময়সীমা পার হলে স্বয়ংক্রিয় ৫০৪ টাইমআউট পাঠানোর ব্যবস্থা করতে হবে।",
      e: "A hanging request signifies that execution hit a control path that neither ended the response (`res.json()`) nor invoked `next()`. Remedy by auditing unhandled conditional branches and wrapping the app with timeout middleware (`connect-timeout`) emitting 504 on timeouts.",
      code: "app.use(timeout('10s'));\napp.use((req, res, next) => { if (!req.timedout) next(); });"
    },
    {
      lvl: "situation",
      q: "ব্যাকএন্ডে একটি ডাটাবেজ এক্সেপশন আসার পর ক্লায়েন্টে ফুল ডাটাবেজ টেবিল নাম ও স্ট্যাক ট্রেস এরর রেসপন্সে চলে গেছে। কীভাবে সিকিউরিটি লিক বন্ধ করবে?",
      m: "এটি মারাত্মক ইনফরমেশন ডিসক্লোজার সিকিউরিটি দুর্বলতা। সমাধান: সেন্ট্রালাইজড এরর মিডলওয়্যারে আমরা চেক করব: `process.env.NODE_ENV === 'production'` হলে ক্লায়েন্টকে কখনোই র `err.message` বা `err.stack` পাঠানো যাবে না! ক্লায়েন্ট সবসময় একটি জেনেরিক মেসেজ পাবে: `{ success: false, message: 'অভ্যন্তরীণ সার্ভার ত্রুটি ঘটেছে', code: 'INTERNAL_SERVER_ERROR', traceId }`। আর আসল সম্পূর্ণ স্ট্যাক ট্রেস শুধুমাত্র সার্ভার-সাইড Winston লগ ফাইলে সেভ হবে।",
      b: "প্রোডাকশনে স্ট্যাক ট্রেস ফাঁস হওয়া মারাত্মক ঝুঁকি। এরর মিডলওয়্যারে চেক করে ক্লায়েন্টকে শুধুমাত্র নিরাপদ জেনেরিক বার্তা পাঠাতে হবে এবং বিস্তারিত টেকনিক্যাল এরর সার্ভারের গোপন লগ ফাইলে সংরক্ষণ করতে হবে।",
      e: "Leaking raw database stack traces enables reconnaissance attacks. Sanitize error responses globally inside the centralized error middleware: in production environments, log the raw stack internally to disk/Datadog and return strictly an opaque sanitized error payload alongside a Correlation ID.",
      code: "app.use((err, req, res, next) => {\n  logger.error(err);\n  res.status(err.status || 500).json({\n    success: false,\n    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message\n  });\n});"
    },
    {
      lvl: "situation",
      q: "একটি থার্ড-পার্টি এপিআই কল মাঝে মাঝে ১০-১৫ সেকেন্ড সময় নিচ্ছে এবং এর ফলে নোড সার্ভারের কানেকশন পুল শেষ হয়ে অন্যান্য দ্রুতগতির এপিআইগুলো স্লো হয়ে পড়ছে। কীভাবে সমাধান করবে?",
      m: "সমাধান: (১) থার্ড-পার্টি এপিআই কলের জন্য কঠোর টাইমআউট (যেমন ৩ সেকেন্ড) সেট করব (`axios.create({ timeout: 3000 })`)। (২) 'Circuit Breaker' প্যাটার্ন (যেমন `opossum` লাইব্রেরি) বাস্তবায়ন করব। যদি থার্ড-পার্টি সার্ভিস পরপর ৫ বার ফেইল বা স্লো হয়, সার্কিট ওপেন হয়ে যাবে এবং পরবর্তী রিকোয়েস্টগুলো থার্ড-পার্টিতে কল না করে তৎক্ষণাৎ ক্যাশড ফলব্যাক রিটার্ন করবে। থার্ড-পার্টি সুস্থ হলে সার্কিট আবার ক্লোজ হবে।",
      b: "স্লো থার্ড-পার্টি এপিআইর জন্য ৩ সেকেন্ডের কঠোর টাইমআউট সেট করতে হবে। এছাড়া opossum লাইব্রেরি দিয়ে সার্কিট ব্রেকার প্যাটার্ন বাস্তবায়ন করে ক্রমাগত ব্যর্থ সার্ভিসে কল বন্ধ রেখে ফলব্যাক রেসপন্স দিতে হবে।",
      e: "Enforce strict HTTP timeouts (e.g. 3000ms) on third-party calls. Implement the Circuit Breaker pattern via `opossum`: consecutive timeouts trip the breaker open, instantaneously shedding load to predefined fallbacks rather than saturating socket pools.",
      code: "const breaker = new CircuitBreaker(callExternalApi, { timeout: 3000, errorThresholdPercentage: 50 });"
    },
    {
      lvl: "situation",
      q: "ব্যবহারকারী একটি এপিআইতে একই সাথে একাধিক ফাইল আপলোড করার সময় মেমোরি শেষ হয়ে সার্ভার ক্র্যাশ করছে। Multer দিয়ে কীভাবে লিমিট ও ফিল্টারিং করবে?",
      m: "Multer কনফিগারেশনে আমরা কঠোর সীমা ও ফিল্টারিং দেব: (১) ফাইল সাইজ লিমিট: `limits: { fileSize: 5 * 1024 * 1024, files: 5 }` (সর্বোচ্চ ৫টি ফাইল, প্রতিটি সর্বোচ্চ ৫MB)। (২) `fileFilter` দিয়ে শুধুমাত্র অনুমোদিত MIME টাইপ (যেমন `image/jpeg`, `application/pdf`) গ্রহণ করব, ভুল এক্সটেনশন আসলে কাস্টম এরর থ্রো করব। (৩) মেমোরি স্টোরেজের বদলে `diskStorage` বা সরাসরি ক্লাউড স্ট্রিমিং ব্যবহার করব যাতে RAM ওভারফ্লো না হয়।",
      b: "মাল্টার কনফিগারেশনে ফাইলের সাইজ লিমিট ৫ মেগাবাইট এবং ফাইলের সংখ্যা সর্বোচ্চ ৫টি নির্দিষ্ট করতে হবে। ফাইলফিল্টারের মাধ্যমে নির্দিষ্ট এক্সটেনশন যাচাই করতে হবে এবং মেমোরি স্টোরেজের বদলে ডিস্ক স্টোরেজ ব্যবহার করতে হবে।",
      e: "Configure Multer bounds: enforce `fileSize` and file count boundaries in `limits`, reject unapproved MIME types via `fileFilter`, and employ `diskStorage` or direct cloud stream pipes rather than RAM-heavy `memoryStorage`.",
      code: "const upload = multer({\n  storage: multer.diskStorage({ destination: '/tmp/uploads' }),\n  limits: { fileSize: 5 * 1024 * 1024, files: 3 },\n  fileFilter: (req, file, cb) => cb(null, ['image/png', 'image/jpeg'].includes(file.mimetype))\n});"
    },
    {
      lvl: "situation",
      q: "একজন ব্যবহারকারী কুয়েরি প্যারামিটারে স্পেশাল ক্যারেক্টার বা এসকিউএল ইনজেকশন স্ট্রিং পাস করায় এপিআই 500 এরর দিচ্ছে। কন্ট্রোলার লেয়ারে কীভাবে এটিকে প্রিভেন্ট করবে?",
      m: "কন্ট্রোলারের একদম শুরুতে আমরা Zod দিয়ে কুয়েরি প্যারামিটার ভ্যালিডেট করব (`QuerySchema.parse(req.query)`। Zod ইনপুটের টাইপ, ফরম্যাট ও দৈর্ঘ্য যাচাই করে। ডাটাবেজে ডাটা পাঠানোর সময় কখনোই স্ট্রিং কনক্যাটেনেশন (`SELECT * FROM table WHERE id = '` + id) করব না; সবসময় প্যারামিটারাইজড কুয়েরি (Parameterized Query) বা Prisma ORM ব্যবহার করব যা স্বয়ংক্রিয়ভাবে SQL ইনজেকশন প্রতিহত করে।",
      b: "কন্ট্রোলারের শুরুতে Zod দিয়ে req.query পার্স করতে হবে। ডাটাবেজ কুয়েরিতে কখনোই সরাসরি স্ট্রিং যুক্ত না করে প্যারামিটারাইজড কুয়েরি বা প্রিজমা ব্যবহার করলে এসকিউএল ইনজেকশন শতভাগ প্রতিহত হয়।",
      e: "Validate `req.query` schemas with Zod at the controller boundary. Never interpolate user inputs into raw SQL statements; utilize parameterized prepared statements or Prisma ORM to guarantee SQL injection immunity.",
      code: "const { search, page } = QuerySchema.parse(req.query);\nconst results = await prisma.product.findMany({ where: { name: { contains: search } } });"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর মাল্টি-টেন্যান্ট SaaS আর্কিটেকচারে প্রতি রিকোয়েস্টে Tenant ID এক্সট্র্যাক্ট করে ডাটাবেজ আইসোলেশন Express Middleware-এ কীভাবে করেছিলে?",
      m: "আমরা একটি সেন্ট্রালাইজড `tenantResolverMiddleware` তৈরি করেছিলাম। এটি ইনকামিং রিকোয়েস্টের সাবডোমেন (`tenant.dokani.com`) অথবা কাস্টম হেডার `x-tenant-id` রিড করত। এরপর ডেটাবেজে টেন্যান্টের অস্তিত্ব যাচাই করে `req.tenantId = tenant.id` হিসেবে সেট করত। সার্ভিস এবং রিপোজিটরি লেয়ারে প্রতিটি Prisma কুয়েরির ভেতর `{ where: { tenantId: req.tenantId, ... } }` অটোমেটিক ইনজেক্ট হতো, ফলে কোনো অবস্থাতেই এক দোকানের ডাটা অন্য দোকানের স্ক্রিনে যাওয়ার সুযোগ ছিল না।",
      b: "দোকানি সিস্টেমে আমরা টেন্যান্ট মিডলওয়্যার দিয়ে সাবডোমেন বা হেডার থেকে টেন্যান্ট আইডি বের করে req অবজেক্টে যুক্ত করেছিলাম। ডাটাবেজের প্রতিটি কুয়েরিতে স্বয়ংক্রিয়ভাবে এই টেন্যান্ট আইডি শর্ত যুক্ত করায় শতভাগ ডাটা আইসোলেশন নিশ্চিত ছিল।",
      e: "In Dokani POS SaaS, a custom `tenantResolverMiddleware` resolved tenants via host subdomains or `x-tenant-id` headers, injecting `req.tenantId`. Downstream repositories scoped all queries strictly with `{ tenantId }` predicates.",
      tip: "মাল্টি-টেন্যান্ট ডেটাবেজ আইসোলেশন নিশ্চিত করার এই মিডলওয়্যার ডিজাইন যেকোনো এন্টারপ্রাইজ SaaS রোলে সবচেয়ে শক্তিশালী প্রমাণ।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ দ্রুতগতির সেলস এন্ট্রিতে ইনভয়েস তৈরি করার সময় কন্ট্রোলার, সার্ভিস ও রিপোজিটরির স্পষ্ট কোড ডিস্ট্রিবিউশন কেমন ছিল?",
      m: "আমাদের আর্কিটেকচার ছিল: (১) `InvoiceController`: Zod দিয়ে রিকোয়েস্ট বডি ভ্যালিডেট করে `invoiceService.createSale(req.tenantId, req.user.id, validData)` কল করত। (২) `InvoiceService`: ইনভেন্টরি স্টক পর্যাপ্ত কি না যাচাই করত, ভ্যাট ও ডিসকাউন্ট নিয়ম প্রয়োগ করত, এবং ডাটাবেজ ট্রানজাকশন অর্কেস্ট্রেট করত। (৩) `InvoiceRepository`: Prisma-র মাধ্যমে একটি সিঙ্গেল ACID ট্রানজাকশনে ইনভয়েস, সেলস আইটেমস, পেমেন্ট রেকর্ড এবং স্টক ডিডাক্ট অপারেশন এক্সিকিউট করত।",
      b: "দোকানি ইনভয়েস সৃষ্টিতে কন্ট্রোলার ইনপুট ডাটা যাচাই করত, সার্ভিস ব্যবসায়িক শর্ত ও স্টক প্রাপ্যতা পরীক্ষা করত এবং রিপোজিটরি প্রিজমা ট্রানজাকশনের মাধ্যমে ডাটাবেজে নিরাপদ বিক্রয় এন্ট্রি সম্পন্ন করত।",
      e: "In Dokani POS, the controller sanitized DTOs via Zod; the service validated inventory availability, calculated multi-tier taxes, and composed the transaction; the repository executed the atomic multi-table ACID commit via Prisma.",
      code: "// Service layer encapsulates business logic cleanly:\nexport class SalesService {\n  async createInvoice(tenantId: string, dto: CreateInvoiceDto) {\n    await this.inventoryRepo.assertStock(tenantId, dto.items);\n    return await this.invoiceRepo.commitSale(tenantId, dto);\n  }\n}"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে লাইভ এক্সামের লাখ লাখ রিকোয়েস্টের চাপ সামলাতে Express API-তে Redis Caching কীভাবে আর্কিটেক্ট করেছিলে?",
      m: "কোর্স সিলেবাস এবং প্রশ্নপত্রের মতো অপরিবর্তনশীল ডেটার জন্য আমরা একটি `redisCacheMiddleware('60s')` ব্যবহার করেছি। মিডলওয়্যারটি রিকোয়েস্টের URL-কে ক্যাশ কি হিসেবে ব্যবহার করে প্রথমে রেডিস চেক করত; ক্যাশ হিট হলে মাত্র ২ মিলিসেকেন্ডে রেডিস থেকে ডাটা রিটার্ন করত—ডাটাবেজে কোনো হিটই যেত না। শিক্ষক কোনো প্রশ্ন আপডেট করলে `cacheInvalidationService` দিয়ে সংশ্লিষ্ট রেডিস কি ফ্ল্যাশ করা হতো। ফলে ডাটাবেজ লোড ৯৫% কমে গিয়েছিল।",
      b: "পিটিটিএবিডি পরীক্ষায় আমরা রেডিস ক্যাশিং মিডলওয়্যার ব্যবহার করে প্রশ্নপত্র ২ মিলিসেকেন্ডে ডেলিভারি নিশ্চিত করেছি। শিক্ষক প্রশ্ন পরিবর্তন করলে স্বয়ংক্রিয়ভাবে ক্যাশ মুছে দেওয়া হতো, ফলে ডাটাবেজের ওপর কোনো চাপ পড়েনি।",
      e: "Constructed a reusable Redis cache middleware for read-heavy course catalogs in PTTABD. Cache hits returned in sub-2ms directly from Redis memory. Instructor mutations emitted targeted cache purges, slashing database CPU consumption by 95%.",
      code: "const cacheMiddleware = (ttl) => async (req, res, next) => {\n  const cached = await redis.get(req.originalUrl);\n  if (cached) return res.json(JSON.parse(cached));\n  res.sendResponse = res.json;\n  res.json = (body) => { redis.setex(req.originalUrl, ttl, JSON.stringify(body)); res.sendResponse(body); };\n  next();\n};"
    },
    {
      lvl: "realworld",
      q: "Express অ্যাপ্লিকেশনে Winston এবং Morgan দিয়ে প্রোডাকশন গ্রেড স্ট্রাকচার্ড JSON লগিং কীভাবে বাস্তবায়ন করেছিলে?",
      m: "আমরা প্লেইন টেক্সট `console.log()` সম্পূর্ণ নিষিদ্ধ করেছিলাম। আমরা `winston` দিয়ে একটি সেন্ট্রালাইজড লগার বানিয়েছি যা সব লগ JSON ফরম্যাটে আউটপুট দেয় (Timestamp, Level, CorrelationId, Message, StackTrace সহ)। `morgan` মিডলওয়্যার দিয়ে প্রতিটি ইনকামিং HTTP রিকোয়েস্টের মেথড, স্ট্যাটাস কোড এবং রেসপন্স টাইম উইনস্টনের স্ট্রিমে পাঠানো হতো। প্রোডাকশনে `winston-daily-rotate-file` দিয়ে প্রতিদিনের লগ আলাদা ফাইলে সেভ এবং ১৪ দিন পর অটো-কম্প্রেস করা হতো।",
      b: "উইনস্টন এবং মরগান দিয়ে আমরা স্ট্রাকচার্ড JSON লগিং ব্যবস্থা করেছি যা রিকোয়েস্টের সময়, স্ট্যাটাস ও এরর ট্র্যাক করত। ডেইলি রোটেট ফাইলের মাধ্যমে প্রতিদিনের লগ স্বয়ংক্রিয়ভাবে সংরক্ষিত ও কম্প্রেস করা হতো।",
      e: "Implemented structured JSON logging via Winston piped into Morgan HTTP access hooks. Logs carried automated timestamps, log levels, and request Correlation IDs, rotated daily and archived after 14 days using `winston-daily-rotate-file`.",
      code: "const logger = winston.createLogger({\n  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),\n  transports: [new winston.transports.DailyRotateFile({ filename: 'logs/app-%DATE%.log' })]\n});"
    },
    {
      lvl: "realworld",
      q: "Express ব্যাকএন্ডে OpenAPI / Swagger (`swagger-ui-express`) দিয়ে লাইভ এপিআই ডকুমেন্টেশন কীভাবে অটোমেটেড করেছিলে?",
      m: "আমরা `tsoa` অথবা `zod-to-openapi` ব্যবহার করেছি। আলাদাভাবে কোনো ম্যানুয়াল YAML বা JSON ডক না লিখে আমরা আমাদের কন্ট্রোলারের টাইপস্ক্রিপ্ট টাইপ এবং Zod স্কিমা থেকেই সরাসরি Swagger OpenAPI 3.0 স্পেসিফিকেশন স্বয়ংক্রিয়ভাবে জেনারেট করেছি। এরপর `/api/docs` এন্ডপয়েন্টে `swagger-ui-express` মাউন্ট করায় ফ্রন্টএন্ড ডেভেলপাররা যেকোনো সময় লাইভ ইন্টারঅ্যাক্টিভ এপিআই টেস্ট ও ডকুমেন্টেশন ব্রাউজ করতে পেরেছে।",
      b: "আমরা Zod স্কিমা থেকে স্বয়ংক্রিয়ভাবে ওপেন-এপিআই স্পেসিফিকেশন তৈরি করে swagger-ui-express এর মাধ্যমে /api/docs এ লাইভ ডকুমেন্টেশন সরবরাহ করেছি, ফলে ম্যানুয়ালি ডক লেখার সময় বেঁচেছিল।",
      e: "Automated API documentation by compiling Zod validation schemas and TypeScript DTOs directly into OpenAPI 3.0 specs using `zod-to-openapi`. Mounted on `/api/docs` via `swagger-ui-express`, this provided frontend engineers interactive live API sandboxes.",
      tip: "কোড থেকেই ডকুমেন্টেশন স্বয়ংক্রিয় জেনারেট করার কথা বলা মডার্ন সফটওয়্যার ইঞ্জিনিয়ারিংয়ের দৃষ্টান্ত।"
    }
  ]
};
