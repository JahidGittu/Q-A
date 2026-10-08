// Topic 5: API Validation, Error Handling & Logging (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "api-validation-errors",
  name: "API Validation, Errors & Logging",
  desc: "Zod/Joi Validation Middleware, Custom AppError Classes, HTTP Status Codes, Centralized Error Trap, Winston/Pino",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Express-এ Zod দিয়ে রিকোয়েস্ট ভ্যালিডেশন মিডলওয়্যার (`validateRequest(schema)`) কীভাবে লিখতে হয়?",
      m: "আমরা একটি রি-ইউজেবল হায়ার-অর্ডার মিডলওয়্যার তৈরি করি: `validate(schema)`। এটি ইনকামিং রিকোয়েস্টের `body`, `query`, এবং `params` কে Zod স্কিমা দিয়ে পার্স করে (`schema.parseAsync({ body: req.body, query: req.query, params: req.params })`। যদি কোনো ফিল্ড ইনভ্যালিড হয়, Zod একটি `ZodError` থ্রো করে যা আমাদের গ্লোবাল এরর হ্যান্ডলারে চলে যায় এবং ক্লায়েন্টকে সুনির্দিষ্ট 400 Bad Request দেয়। আর পাস করলে পার্সড ও ক্লিন ডাটা দিয়ে `next()` কল করে।",
      b: "আমরা একটি হায়ার-অর্ডার মিডলওয়্যার ফাংশন তৈরি করি যা Zod স্কিমা গ্রহণ করে। এটি রিকোয়েস্ট বডি বা কুয়েরি পার্স করে সঠিক থাকলে পরবর্তী কন্ট্রোলারে পাঠায় এবং কোনো ভুল থাকলে ৪০০ স্ট্যাটাস কোড সহ বিস্তারিত এরর প্রদান করে।",
      e: "Author a higher-order `validate(schema)` middleware evaluating `req.body`, `req.query`, and `req.params` against a Zod schema via `schema.parseAsync()`. Validation failures throw typed `ZodError` instances caught by the centralized error boundary.",
      code: "export const validate = (schema: AnyZodSchema) => async (req: Request, res: Response, next: NextFunction) => {\n  try {\n    await schema.parseAsync({ body: req.body, query: req.query, params: req.params });\n    next();\n  } catch (err) { next(err); }\n};"
    },
    {
      lvl: "lvl1",
      q: "প্রধান HTTP Status Codes (200, 201, 400, 401, 403, 404, 409, 422, 500)-এর সুনির্দিষ্ট অর্থ কী?",
      m: "(১) `200 OK`: সফল রিকোয়েস্ট। (২) `201 Created`: নতুন রিসোর্স সফলভাবে তৈরি হয়েছে। (৩) `400 Bad Request`: ক্লায়েন্টের সিনট্যাক্স বা ইনপুট ভুল। (৪) `401 Unauthorized`: অথেনটিকেশন মিসিং বা টোকেন ইনভ্যালিড। (৫) `403 Forbidden`: লগইন করা থাকলেও সংশ্লিষ্ট রিসোর্সে পারমিশন নেই। (৬) `404 Not Found`: রিসোর্স পাওয়া যায়নি। (৭) `409 Conflict`: ডাটা কনফ্লিক্ট (যেমন ডুপ্লিকেট ইমেইল বা ফোন)। (৮) `422 Unprocessable Entity`: সিনট্যাক্স ঠিক থাকলেও সেমান্টিক ভ্যালিডেশন ফেইল। (৯) `500 Internal Server Error`: অপ্রত্যাশিত সার্ভার ত্রুটি।",
      b: "স্ট্যাটাস কোডের অর্থ: ২০০ সফল, ২০১ নতুন রেকর্ড সৃষ্টি, ৪০০ ভুল ইনপুট, ৪০১ লগইন ছাড়া এক্সেস, ৪০৩ পারমিশন বিহীন, ৪০৪ রেকর্ড নিখোঁজ, ৪০৯ ডুপ্লিকেট তথ্য সংঘাত, ৪২২ ভ্যালিডেশন ব্যর্থতা এবং ৫০০ সার্ভারের অভ্যন্তরীণ ত্রুটি।",
      e: "HTTP status taxonomy: 200 (Success), 201 (Created), 400 (Bad Syntax), 401 (Unauthenticated), 403 (Unauthorized/Forbidden), 404 (Resource Missing), 409 (State Conflict/Duplicates), 422 (Semantic Validation Failure), 500 (Internal Server Fault).",
      tip: "ইন্টারভিউতে 401 (Who are you?) এবং 403 (Permission denied) এর পার্থক্য সবচেয়ে বেশি জানতে চায়।"
    },
    {
      lvl: "lvl1",
      q: "JavaScript-এ কাস্টম `AppError` ক্লাস কেন তৈরি করা উচিত এবং এর সাথে `isOperational` ফ্ল্যাগের ভূমিকা কী?",
      m: "ডিফল্ট `new Error()` এ কোনো HTTP স্ট্যাটাস কোড থাকে না। আমরা `class AppError extends Error` তৈরি করি যার ভেতরে `statusCode` (যেমন 404, 400) এবং `isOperational = true` থাকে। `isOperational: true` নির্দেশ করে যে এটি একটি প্রত্যাশিত ও নিরাপদ অপারেশনাল এরর (যেমন: ইউজার ভুল পাসওয়ার্ড দিয়েছে বা স্টক খালি)—সার্ভার ক্র্যাশ করার দরকার নেই। আর আন-অপারেশনাল বা প্রোগ্রামিং বাগ (যেমন নাল পয়েন্টার বা মেমোরি লিক) আসলে সার্ভারকে গ্রেসফুলি রিস্টার্ট করতে হয়।",
      b: "AppError কাস্টম ক্লাসে স্ট্যাটাস কোড এবং isOperational ফ্ল্যাগ থাকে। অপারেশনাল এরর নির্দেশ করে এটি একটি স্বাভাবিক ব্যবসায়িক ভুল (যেমন ভুল ইনপুট), যার কারণে পুরো সার্ভার বন্ধ করার প্রয়োজন পড়ে না।",
      e: "A custom `AppError` class extends native `Error` to attach an HTTP `statusCode` and an `isOperational: boolean` flag. Operational errors represent anticipated domain failures (validation, missing records) that should be reported cleanly without crashing the runtime.",
      code: "export class AppError extends Error {\n  constructor(public message: string, public statusCode: number = 400, public isOperational: boolean = true) {\n    super(message);\n    Error.captureStackTrace(this, this.constructor);\n  }\n}"
    },
    {
      lvl: "lvl1",
      q: "Production Logging-এ `console.log()` কেন ক্ষতিকর এবং Winston বা Pino কেন অপরিহার্য?",
      m: "`console.log()` সিঙ্ক্রোনাসলি রান করে যা নোডের মেইন ইভেন্ট লুপকে ব্লক করতে পারে এবং এতে কোনো লগ লেভেল (info, warn, error), টাইমস্ট্যাম্প বা স্ট্রাকচার্ড JSON থাকে না। উইনস্টন (Winston) বা পিনো (Pino) হলো অ্যাসিনক্রোনাস হাই-স্পিড লগার যা: (১) স্ট্রাকচার্ড JSON ফরম্যাটে লগ লেখে (Datadog বা Elasticsearch-এ সার্চ করার উপযোগী), (২) নির্দিষ্ট লগ লেভেল অনুযায়ী ফিল্টারিং করে, (৩) স্বয়ংক্রিয় ফাইল রোটেশন করে ডিস্ক পূর্ণ হওয়া আটকায়।",
      b: "console.log মেইন থ্রেডকে ব্লক করতে পারে এবং এতে কোনো সুনির্দিষ্ট টাইমস্ট্যাম্প বা লগ লেভেল থাকে না। উইনস্টন বা পিনো অ্যাসিনক্রোনাস পদ্ধতিতে অতি দ্রুত স্ট্রাকচার্ড JSON লগ তৈরি করে যা প্রফেশনাল সিস্টেমে ডিবাগিংয়ের জন্য অপরিহার্য।",
      e: "console.log is synchronous in many Node environments, blocking the event loop under heavy load while lacking timestamps, log levels, and structured formats. Winston and Pino deliver high-throughput asynchronous structured JSON streams built for aggregation in Elasticsearch or Datadog.",
      tip: "কখনোই প্রোডাকশন কোডে `console.log` রাখবে না—সবসময় স্ট্রাকচার্ড লগারের কথা বলবে।"
    },
    {
      lvl: "lvl1",
      q: "Zod-এর `safeParse()` এবং `parse()` মেথডের মধ্যে পার্থক্য কী?",
      m: "`schema.parse(data)` যদি ডেটা ইনভ্যালিড পায় তবে সাথে সাথে একটি এক্সেপশন বা এরর থ্রো (Throw) করে যা ক্যাচ ব্লক ছাড়া সার্ভার ক্র্যাশ করতে পারে। আর `schema.safeParse(data)` কোনো এরর থ্রো করে না; এটি শান্তভাবে একটি অবজেক্ট রিটার্ন করে: সফল হলে `{ success: true, data: T }`, আর ব্যর্থ হলে `{ success: false, error: ZodError }`। যেখানে ট্রাই-ক্যাচ ব্লক ছাড়া ক্লিন কন্ডিশনাল চেকিং দরকার সেখানে `safeParse()` ব্যবহার করা অনেক বেশি মার্জিত।",
      b: "parse() কোনো ভুল পেলে সরাসরি এরর থ্রো করে। অন্যদিকে safeParse() কোনো এরর না ছুড়ে একটি সেফ অবজেক্ট দেয় যাতে success: true/false থাকে, ফলে ট্রাই-ক্যাচ ছাড়াই কোড পরিষ্কার রাখা যায়।",
      e: "`parse()` synchronously throws a `ZodError` upon schema mismatch, necessitating try/catch wrappers. `safeParse()` does not throw, returning a tagged union (`{ success: true, data }` or `{ success: false, error }`) for functional, branch-safe evaluations.",
      code: "const result = UserSchema.safeParse(req.body);\nif (!result.success) return res.status(400).json(result.error.format());"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Global Error Handling Middleware-এ ZodError, PrismaError, এবং কাস্টম AppError কীভাবে আলাদাভাবে ফরম্যাট করবে?",
      m: "সেন্ট্রালাইজড এরর মিডলওয়্যারে আমরা টাইপ চেক করি: (১) `err instanceof ZodError`: ফিল্ড-লেভেল এরর ম্যাপ করে `400` স্ট্যাটাসে বিস্তারিত ইনপুট মেসেজ পাঠাব। (২) `err instanceof PrismaClientKnownRequestError`: যেমন `P2002` (ইউনিক কনস্ট্রেইন্ট ফেইল) হলে `409 Conflict` দেব, `P2025` (রেকর্ড নিখোঁজ) হলে `404` দেব। (৩) `err instanceof AppError`: তার নির্দিষ্ট `statusCode` এবং মেসেজ পাঠাব। (৪) অন্য কোনো অজানা এরর হলে `500` দিয়ে ইন্টারনালি লগ করব।",
      b: "এরর মিডলওয়্যারে ZodError আসলে ফিল্ড ভিত্তিক ৪০০ এরর, প্রিজমা এরর (যেমন ডুপ্লিকেট P2002) আসলে ৪০৯ কনফ্লিক্ট এবং কাস্টম AppError আসলে নির্দিষ্ট স্ট্যাটাস কোড দিয়ে ক্লায়েন্টকে ফ্রেন্ডলি রেসপন্স পাঠানো হয়।",
      e: "Differentiate errors inside the global handler via `instanceof`: map `ZodError` to 400 with flattened field issues, map Prisma known codes (P2002 to 409 Conflict, P2025 to 404 Not Found), pass custom operational `AppError` directly, and conceal unknown exceptions behind 500.",
      code: "if (err instanceof ZodError) return res.status(400).json({ success: false, errors: err.flatten().fieldErrors });\nif (err.code === 'P2002') return res.status(409).json({ success: false, message: 'Duplicate record exists' });"
    },
    {
      lvl: "lvl2",
      q: "RFC 7807 (Problem Details for HTTP APIs) স্ট্যান্ডার্ড কী এবং এরর রেসপন্সে এটি কেন ব্যবহার করা উচিত?",
      m: "RFC 7807 হলো IETF স্ট্যান্ডার্ড যা HTTP API-তে এরর রেসপন্স স্ট্রাকচার করার একটি সার্বজনীন ফরম্যাট দেয়। এলোমেলো এরর মেসেজের বদলে এটি ৫টি স্ট্যান্ডার্ড ফিল্ড প্রদান করে: `type` (সমস্যার ইউআরআই ডকুমেন্টেশন লিংক), `title` (সংক্ষিপ্ত শিরোনাম), `status` (HTTP কোড যেমন 400), `detail` (নির্দিষ্ট ত্রুটির বিস্তারিত বর্ণনা), এবং `instance` (যে ইউআরএলে এরর হয়েছে)। এর ফলে যেকোনো ফ্রন্টএন্ড বা মোবাইল ক্লায়েন্ট মেশিন-রিডেবল উপায়ে নির্ভুলভাবে এরর হ্যান্ডেল করতে পারে।",
      b: "আরএফসি ৭৮০৭ হলো আন্তর্জাতিক মান যা এপিআই এরর প্রকাশের সুনির্দিষ্ট নিয়ম দেয়। এতে টাইটেল, স্ট্যাটাস, বিস্তারিত বর্ণনা ও ইউআরআই উল্লেখ থাকে যা যেকোনো সিস্টেমের জন্য বুঝতে সহজ।",
      e: "RFC 7807 defines 'Problem Details for HTTP APIs' as a standardized media type (`application/problem+json`). It formalizes error payloads with uniform fields: `type`, `title`, `status`, `detail`, and `instance` for predictable client-side exception parsing.",
      code: "res.setHeader('Content-Type', 'application/problem+json');\nres.status(400).json({\n  type: 'https://api.dokani.com/errors/invalid-stock',\n  title: 'Insufficient Inventory',\n  status: 400,\n  detail: 'Requested 5 units of Product X but only 2 remain.'\n});"
    },
    {
      lvl: "lvl2",
      q: "Distributed Request Tracing-এ `X-Request-ID` বা Correlation ID কীভাবে কাজ করে এবং লগে এটি কেন বাধ্যতামূলক?",
      m: "যখন প্রতি সেকেন্ডে হাজার হাজার রিকোয়েস্ট আসে, সেন্ট্রাল লগ ফাইলে সব ইউজারের লগ এলোমেলোভাবে মিশে যায়। Correlation ID হলো একটি ইউনিক UUID যা রিকোয়েস্ট আসার সাথে সাথে মিডলওয়্যারে তৈরি হয় (`req.headers['x-request-id'] || crypto.randomUUID()`)। রিকোয়েস্ট চলাকালীন ডাটাবেজ কোয়েরি, সার্ভিস কল বা এররের প্রতিটি লগে এই আইডি জুড়ে দেওয়া হয় এবং ক্লায়েন্ট রেসপন্স হেডারেও ফিরিয়ে দেওয়া হয়। কোনো ব্যবহারকারী এরর রিপোর্ট করলে তার ওই একটি Correlation ID দিয়ে লগ সার্চ করলেই মুহূর্তের মধ্যে পুরো কল হিস্ট্রি পাওয়া যায়।",
      b: "কোরিলেশন আইডি হলো প্রতিটি রিকোয়েস্টের ইউনিক আইডেন্টিফায়ার। এটি প্রতিটি লগের সাথে যুক্ত থাকলে হাজার হাজার লগের ভিড় থেকে সুনির্দিষ্ট ইউজারের ট্রানজাকশন ইতিহাস চোখের পলকে খুঁজে বের করা যায়।",
      e: "Correlation IDs (`X-Request-ID`) bind every asynchronous step of an incoming request (controllers, database traces, external calls) to a single UUID. Attaching this ID to every log entry enables isolating end-to-end execution journeys in centralized observability platforms.",
      code: "const traceId = req.headers['x-request-id'] || uuidv4();\nres.setHeader('X-Request-ID', traceId);\nlogger.defaultMeta = { traceId };"
    },
    {
      lvl: "lvl2",
      q: "Pino লগার কেন Winston-এর চেয়ে ৫ গুণ দ্রুত এবং কীভাবে এটি জিরো-ওভারহেড লগিং নিশ্চিত করে?",
      m: "Winston ইন্টারনালি জাভাস্ক্রিপ্ট স্ট্রিং ফরম্যাটিং ও অবজেক্ট ক্লোনিংয়ের জন্য বেশ কিছু সিপিইউ সাইকেল ব্যয় করে। Pino হলো এক্সট্রিমলি অপটিমাইজড: এটি সরাসরি V8 স্ট্রিং সিরিয়ালাইজার ব্যবহার করে এবং কোনো সিনক্রোনাস অবজেক্ট মেমোরি কপি তৈরি করে না। এছাড়া Pino লগ রাইটিং প্রসেসকে একটি আলাদা `Worker Thread` বা প্রসেসে অফলোড করতে পারে (`pino.transport`)। ফলে হাই-ট্রাফিক এপিআইতে লগিংয়ের জন্য সার্ভারের থ্রুপুট একটুও স্লো হয় না।",
      b: "পিনো অতি দ্রুতগতির লগার যা সরাসরি ভি-৮ স্ট্রিং অপটিমাইজেশন ব্যবহার করে। এটি আলাদা ব্যাকগ্রাউন্ড থ্রেডে লগ রাইট করায় নোড সার্ভারের মেইন থ্রেডে কোনো ওভারহেড পড়ে না এবং উইনস্টনের চেয়ে ৫ গুণ দ্রুত চলে।",
      e: "Pino achieves extreme performance by minimizing runtime allocations and avoiding object cloning during log serializations. By streaming logs asynchronously off the main thread via decoupled worker transports, Pino sustains massive I/O throughput with near-zero latency impact.",
      tip: "হাই-থ্রুপুট মাইক্রোসার্ভিসে উইনস্টনের জায়গায় পিনো (Pino) বেছে নেওয়ার কথা বলা সিনিয়র ব্যাকএন্ড চয়েস।"
    },
    {
      lvl: "lvl2",
      q: "Input Data Sanitization (XSS & NoSQL Injection): `express-mongo-sanitize` এবং Zod কীভাবে ক্ষতিকর ইনপুট ফিল্টার করে?",
      m: "NoSQL ইনজেকশনে হ্যাকার ইউজারনেম ফিল্ডে স্ট্রিং না পাঠিয়ে অবজেক্ট পাঠায়: `{ \"username\": { \"$gt\": \"\" } }`—যা ডাটাবেজ পাসওয়ার্ড ম্যাচ ছাড়াই ট্রু করে দেয়। `express-mongo-sanitize` রিকোয়েস্টের বডি ও কুয়েরি থেকে যেকোনো ডোলার সাইন (`$`) বা ডট (`.`) কি স্বয়ংক্রিয়ভাবে মুছে ফেলে। আর Zod স্কিমায় আমরা কঠোরভাবে `z.string()` এনফোর্স করি; ক্লায়েন্ট অবজেক্ট পাঠালে Zod সাথে সাথে 400 এরর দিয়ে রিকোয়েস্ট বাতিল করে দেয়।",
      b: "নো-এসকিউএল ইনজেকশনে আক্রমণকারী $gt বা অপারেটর পাঠিয়ে ডাটাবেজ হ্যাক করার চেষ্টা করে। express-mongo-sanitize ডলার সাইনযুক্ত কি মুছে ফেলে এবং Zod স্ট্রিক্ট টাইপ চেকিং দিয়ে অবজেক্ট ইনজেকশন রুখে দেয়।",
      e: "NoSQL injection exploits MongoDB query operators ($gt, $ne) sent in body payloads. `express-mongo-sanitize` strips leading `$` and `.` characters from `req.body`, while Zod strictly rejects objects where scalar strings are demanded.",
      code: "import mongoSanitize from 'express-mongo-sanitize';\napp.use(mongoSanitize());"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Log Masking & PII Redaction: ব্যবহারকারীর পাসওয়ার্ড, ক্রেডিট কার্ড বা জাতীয় পরিচয়পত্র লগ ফাইলে যাওয়া কীভাবে স্বয়ংক্রিয়ভাবে আটকাবে?",
      m: "প্রোডাকশন লগে অসাবধানতাবশত পাসওয়ার্ড বা কার্ড নম্বর সেভ হলে তা বড় ধরনের সিকিউরিটি ও কমপ্লায়েন্স (GDPR/PCI-DSS) লঙ্ঘন। সমাধান: আমরা লগারের ভেতর একটি 'PII Masking Formatter / Redaction Engine' কনফিগার করব (Pino-তে বিল্ট-ইন `redact: ['req.headers.authorization', '*.password', '*.creditCard', '*.token']`)। এটি লগ লেখার ঠিক আগে ওই নির্দিষ্ট কি-গুলোর মানকে স্বয়ংক্রিয়ভাবে `[REDACTED]` বা `***` দিয়ে রিপ্লেস করে দেয়।",
      b: "লগ ফাইলে পাসওয়ার্ড বা ক্রেডিট কার্ড নম্বর ফাঁস হওয়া বন্ধ করতে লগার রেড্যাকশন (Redaction) ইঞ্জিন ব্যবহার করা হয়। এটি স্বয়ংক্রিয়ভাবে সংবেদনশীল ফিল্ডগুলোকে [REDACTED] দিয়ে ঢেকে দিয়ে গোপনীয়তা রক্ষা করে।",
      e: "Prevent sensitive PII/credential exfiltration to log aggregators by configuring log redaction pipelines. Pino provides native `redact` arrays targeting nested keys (`['*.password', 'req.headers.cookie']`), replacing values with `[REDACTED]` prior to serialization.",
      code: "const logger = pino({\n  redact: { paths: ['req.body.password', 'req.body.cardNumber', 'req.headers.authorization'], censor: '[REDACTED]' }\n});"
    },
    {
      lvl: "lvl3",
      q: "Sentry Error Monitoring: প্রোডাকশনে রিয়েল-টাইম ক্র্যাশ ক্যাপচার, সোর্স ম্যাপ ইন্টিগ্রেশন এবং ব্রেডক্রাম্বস ট্র্যাকিং কীভাবে কাজ করে?",
      m: "Sentry SDK এক্সপ্রেসের এরর মিডলওয়্যারে যুক্ত থাকে (`Sentry.setupExpressErrorHandler(app)`। যখনই কোনো আনহ্যান্ডেলড এক্সেপশন ঘটে: (১) এটি তৎক্ষণাৎ ক্র্যাশের সম্পূর্ণ স্ট্যাক ট্রেস এবং এনভায়রনমেন্ট মেটাডাটা সেন্ট্রিতে পাঠায়। (২) বিল্ড টাইমে আপলোড করা সোর্স ম্যাপ (Source Maps) ব্যবহার করে কম্পাইল করা কোড থেকে আসল টাইপস্ক্রিপ্ট ফাইলের ঠিক কোন লাইনে বাগ হয়েছে তা নিখুঁতভাবে দেখায়। (৩) 'Breadcrumbs' ইউজারের ক্র্যাশের ঠিক আগের ৫টি এপিআই কল বা বাটন ক্লিকের ইতিহাস রেকর্ড করে ডিবাগিংকে পানির মতো সহজ করে দেয়।",
      b: "সেন্ট্রি প্রোডাকশন এরর রিয়েল-টাইমে শনাক্ত করে। সোর্স ম্যাপের মাধ্যমে কম্পাইল করা কোডের বদলে আসল টাইপস্ক্রিপ্ট লাইনের ভুল দেখায় এবং ব্রেডক্রাম্বস ব্যবহার করে ক্র্যাশের পূর্ববর্তী ব্যবহারকারীর অ্যাকশন ট্র্যাক করে।",
      e: "Sentry captures unhandled production runtime exceptions. Integrating source maps resolves obfuscated production bundles back to original TypeScript lines, while Sentry Breadcrumbs log recent network calls and user actions leading to the crash.",
      code: "Sentry.init({ dsn: process.env.SENTRY_DSN, tracesSampleRate: 1.0 });\napp.use(Sentry.expressErrorHandler());"
    },
    {
      lvl: "lvl3",
      q: "Fail-Fast Validation Architecture: ডোমেন মডেলে প্রবেশের আগেই কেন গেটওয়ে বা কন্ট্রোলার লেয়ারে ভ্যালিডেশন শেষ করতে হবে?",
      m: "Fail-Fast আর্কিটেকচার নীতি অনুযায়ী: কোনো ইনপুট ডাটা যদি ত্রুটিপূর্ণ হয়, তবে তাকে কোনো সার্ভিস, ডাটাবেজ কানেকশন বা বিজনেস লজিকে প্রবেশ করতেই দেওয়া যাবে না; সিস্টেমের একদম প্রবেশদ্বারেই (API Boundary) তৎক্ষণাৎ রিকোয়েস্ট বাতিল করতে হবে। এর ফলে: অপ্রয়োজনীয় ডাটাবেজ কোয়েরি বাঁচে, মেমোরি ও সিপিইউ অপচয় রোধ হয় এবং সার্ভিস লেয়ারে বাড়তি ডিফেন্সিভ কোড (`if (!data.name)`) লেখার কোনো প্রয়োজন থাকে না।",
      b: "ফেইল-ফাস্ট আর্কিটেকচার ভুল ডাটাকে সিস্টেমের একদম শুরুতেই আটকে দেয়। এতে ডাটাবেজে অপ্রয়োজনীয় চাপ পড়ে না এবং সার্ভিস লেয়ার সবসময় নিশ্চিত থাকে যে সে যা ডাটা পাচ্ছে তা শতভাগ নির্ভুল।",
      e: "The Fail-Fast principle demands rejecting malformed requests at the earliest possible boundary (HTTP ingestion). This shields downstream business services from defensive boilerplate, isolates domain layers from schema validation bugs, and spares database IOPS.",
      tip: "কন্ট্রোলারের একদম শুরুতে ভ্যালিডেশন শেষ করে ফেলার এই নীতি আর্কিটেকচারাল ম্যাচিউরিটির প্রমাণ।"
    },
    {
      lvl: "lvl3",
      q: "Structured JSON Log Aggregation: ELK Stack (Elasticsearch, Logstash, Kibana) বা Grafana Loki-তে লগ কুয়েরি কীভাবে কাজ করে?",
      m: "আমরা প্লেইন টেক্সট ফাইল লেখার বদলে উইনস্টন/পিনো দিয়ে প্রতি লাইনে একটি ভ্যালিড JSON অবজেক্ট আউটপুট দিই। Logstash বা Promtail সেই JSON লগ রিড করে স্বয়ংক্রিয়ভাবে প্রতিটি ফিল্ডকে ইনডেক্স করে (যেমন `level: 'error'`, `tenantId: '123'`, `durationMs: 450`)। এরপর Kibana বা Grafana ড্যাশবোর্ডে আমরা সেকেন্ডের মধ্যে ফিল্টার করতে পারি: `level: 'error' AND tenantId: 'dokani_5' AND durationMs > 500`। ফলে কোটি কোটি লগের ভেতর থেকেও নির্দিষ্ট দোকানের স্লো কুয়েরি পলকে খুঁজে বের করা যায়।",
      b: "স্ট্রাকচার্ড JSON লগগুলো ইলাস্টিকসার্চ বা লোকি দ্বারা স্বয়ংক্রিয়ভাবে ইনডেক্স হয়। এর ফলে কিবানা বা গ্রাফানায় সুনির্দিষ্ট কুয়েরি চালিয়ে কোটি কোটি লগের মধ্য থেকে যেকোনো এরর বা স্লো এপিআই তাৎক্ষণিক শনাক্ত করা যায়।",
      e: "Streaming single-line structured JSON records allows collectors (Logstash/Promtail) to ingest and index individual JSON properties natively. Operators query metrics via Kibana or Grafana Loki using structured filters (`level='error' AND duration > 1000ms`).",
      code: "{\"level\":\"error\",\"time\":1700000000,\"traceId\":\"abc-123\",\"tenantId\":\"t1\",\"msg\":\"Payment failed\"}"
    },
    {
      lvl: "lvl3",
      q: "Zod-এ Recursive Schemas কীভাবে তৈরি করতে হয় (যেমন নেস্টেড ক্যাটাগরি ট্রি বা কমেন্ট রিপ্লাই ট্রি)?",
      m: "যখন কোনো ডেটা মডেলের ভেতর নিজেরই নেস্টেড রেফারেন্স থাকে (যেমন একটি ক্যাটাগরির ভেতর একাধিক সাব-ক্যাটাগরি থাকতে পারে এবং তাদের ভেতর আরও সাব-ক্যাটাগরি), তখন সাধারণ অবজেক্ট স্কিমা টাইপ এরর দেয়। Zod-এ `z.lazy()` ব্যবহার করে রিকার্সিভ স্কিমা ডিফাইন করা হয়: `const CategorySchema: z.ZodType<Category> = z.lazy(() => z.object({ id: z.string(), name: z.string(), subCategories: z.array(CategorySchema) }))`। এটি টাইপস্ক্রিপ্টের সাথে শতভাগ সামঞ্জস্য রেখে অসীম গভীরতার নেস্টেড ট্রি ভ্যালিডেট করতে পারে।",
      b: "নেস্টেড ক্যাটাগরি বা কমেন্ট ট্রির মতো গভীর কাঠামোর জন্য Zod এর z.lazy() মেথড ব্যবহার করে রিকার্সিভ স্কিমা তৈরি করা হয়, যা টাইপস্ক্রিপ্ট টাইপ সেফটি বজায় রেখে অসীম নেস্টিং যাচাই করতে পারে।",
      e: "Model self-referential nested data structures (category hierarchies, nested comment trees) via Zod's `z.lazy()`. It defers schema evaluation recursively while preserving complete TypeScript type inference.",
      code: "type Category = { name: string; children?: Category[] };\nconst CategorySchema: z.ZodType<Category> = z.lazy(() => z.object({\n  name: z.string(),\n  children: z.array(CategorySchema).optional()\n}));"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "প্রোডাকশন সার্ভারে ডিস্ক স্পেস হঠাৎ ১০০% পূর্ণ হয়ে নোড সার্ভার ক্র্যাশ করেছে। তদন্তে দেখা গেল লগ ফাইল ২০GB হয়ে ডিস্ক ফুল করে দিয়েছে। কীভাবে স্থায়ী সমাধান করবে?",
      m: "সমাধান: (১) কখনোই আনলিমিটেড সাইজের একটি ফাইলে লগ লেখা যাবে না। আমরা `winston-daily-rotate-file` বা Linux Logrotate কনফিগার করব। (২) রোটেশন রুলস: `maxSize: '20m'`, `maxFiles: '14d'`, এবং `zippedArchive: true`। এর ফলে প্রতিদিনের লগ ২০MB হলে অটো স্প্লিট হবে, gzip কম্প্রেস হয়ে সাইজ ৯০% কমে যাবে এবং ১৪ দিন পুরানো হলে স্বয়ংক্রিয়ভাবে মুছে যাবে। (৩) দীর্ঘমেয়াদী সংরক্ষণের জন্য লগ লোকাল ডিস্কে না রেখে সরাসরি ক্লাউড ওয়াচ বা ডেটাডগে স্ট্রিম করব।",
      b: "ডিস্ক ফুল হওয়া ঠেকাতে winston-daily-rotate-file ব্যবহার করে সর্বোচ্চ সাইজ ২০ মেগাবাইট এবং ১৪ দিন পর অটো-ডিলিট নিয়ম কার্যকর করতে হবে। পুরানো ফাইলগুলো স্বয়ংক্রিয়ভাবে জিপ কম্প্রেস করে রাখতে হবে।",
      e: "Unbounded log growth exhausts disk inodes. Implement `winston-daily-rotate-file` configured with `maxSize: '20m'`, `maxFiles: '14d'`, and `zippedArchive: true`. In enterprise setups, stream logs directly to cloud log collectors rather than local disks.",
      code: "new winston.transports.DailyRotateFile({\n  filename: 'application-%DATE%.log',\n  maxSize: '20m',\n  maxFiles: '14d',\n  zippedArchive: true\n});"
    },
    {
      lvl: "situation",
      q: "একটি এপিআইতে ক্লায়েন্ট ভুল ডেটা পাঠালে সার্ভার 400 এরর দিচ্ছে কিন্তু মেসেজে লেখা আসছে শুধু `Invalid input`, ফলে ফ্রন্টএন্ড ডেভেলপার বুঝতে পারছে না ঠিক কোন ফিল্ডটি ভুল হয়েছে। কীভাবে প্রফেশনাল এরর রেসপন্স ডিজাইন করবে?",
      m: "আমরা Zod এরর হ্যান্ডলারকে এমনভাবে ফরম্যাট করব যা স্পষ্ট ফিল্ড-লেভেল এরর ম্যাপিং দেবে: `{ success: false, message: 'ইনপুট ডাটা সঠিক নয়', errors: { email: 'অবশ্যই সঠিক ইমেইল দিতে হবে', age: 'বয়স ন্যূনতম ১৮ হতে হবে' } }`। Zod-এর `error.flatten().fieldErrors` ব্যবহার করে এটি তৈরি করা যায়। এর ফলে ফ্রন্টএন্ড ডেভেলপার এক নজরে বুঝে প্রতিটি ইনপুট ফিল্ডের নিচে নিখুঁত এরর মেসেজ রেন্ডার করতে পারে।",
      b: "অস্পষ্ট এরর মেসেজের বদলে Zod এর error.flatten().fieldErrors ব্যবহার করে প্রতিটি ফিল্ডের জন্য সুনির্দিষ্ট ভুলের তালিকা তৈরি করে রেসপন্স দিতে হবে, যাতে ফ্রন্টএন্ড ডেভেলপার বা ইউজার তৎক্ষণাৎ ভুল বুঝতে পারে।",
      e: "Transform raw Zod error arrays into structured dictionary mappings via `err.flatten().fieldErrors`. Emit clean, actionable field-level keys so frontend UI forms can bind validation feedback directly to the erroneous inputs.",
      code: "const fieldErrors = error.flatten().fieldErrors;\nres.status(400).json({ success: false, message: 'Validation failed', errors: fieldErrors });"
    },
    {
      lvl: "situation",
      q: "প্রোডাকশন ড্যাশবোর্ডে মাঝে মাঝে অজ্ঞাত কারণে 500 এরর আসছে কিন্তু সেন্ট্রাল লগে কোনো এরর স্ট্যাক ট্রেস পাওয়া যাচ্ছে না। কারণ কী এবং কীভাবে ট্র্যাক করবে?",
      m: "কারণ: কোনো অ্যাসিনক্রোনাস ফাংশনে এরর হয়েছিল যা কোনো ক্যাচ ব্লক ছাড়া সাইলেন্টলি রিজেক্ট হয়েছে, অথবা কোনো মিডলওয়্যারে `next(err)` ডাকার বদলে সাধারণ `return` হয়ে গেছে। সমাধান: (১) `process.on('unhandledRejection')` লিসেনার নিশ্চিত করব যা সাইলেন্ট রিজেকশন লগ করবে। (২) এক্সপ্রেসের গ্লোবাল এরর মিডলওয়্যারে প্রতিটি নন-অপারেশনাল এক্সেপশনে সম্পূর্ণ `err.stack` এবং ইনকামিং `req.body`, `req.url`, `req.headers` উইনস্টনে ফোর্সফুলি লগ করব।",
      b: "স্ট্যাক ট্রেস না পাওয়ার কারণ হতে পারে আনহ্যান্ডেলড প্রমিজ রিজেকশন। unhandledRejection লিসেনার চালু করতে হবে এবং এরর মিডলওয়্যারে স্ট্যাক ট্রেসের সাথে রিকোয়েস্টের ইউআরএল ও বডি বিস্তারিত লগ করতে হবে।",
      e: "Missing stack traces indicate silent promise swallows or unhandled rejections. Audit code paths for bare empty catch blocks (`catch (e) {}`), wire up `process.on('unhandledRejection')`, and configure the error middleware to persist `err.stack` unconditionally.",
      code: "process.on('unhandledRejection', (reason: Error) => {\n  logger.error('Unhandled Promise Rejection:', { message: reason.message, stack: reason.stack });\n});"
    },
    {
      lvl: "situation",
      q: "একটি এপিআইতে একই সাথে একাধিক ভ্যালিডেশন এরর ঘটলে Zod কি প্রথম এরর পাওয়ার সাথে সাথে থেমে যায় নাকি সব এরর একসাথে রিপোর্ট করে?",
      m: "Zod বাই-ডিফল্ট কোনো 'Early Exit' করে না; এটি পুরো স্কিমার সব ফিল্ড একসাথে মূল্যায়ন করে এবং যতগুলো ফিল্ডে ভুল আছে সবগুলো এরর একটি একক `ZodError.issues` অ্যারেতে সংগ্রহ করে ফেরত দেয়। এর ফলে ব্যবহারকারীকে প্রতি সাবমিটে মাত্র একটি করে এরর না দেখিয়ে একবারে ফর্মের সব ভুলের পূর্ণাঙ্গ তালিকা দেখানো সম্ভব হয়। তবে কোনো স্পেসিফিক ফিল্ডে চেইন্ড মেথড থাকলে (যেমন `z.string().min(5).email()`) প্রথম চেইনে ফেইল করলে ওই ফিল্ডের পরবর্তী চেইন স্কিপ হয়।",
      b: "Zod পুরো স্কিমা বিশ্লেষণ করে সব ফিল্ডের এরর একসাথে সংগ্রহ করে দেয়। ফলে ব্যবহারকারী একবারেই তার ফর্মের সমস্ত ভুলের তালিকা দেখতে পায় যা ইউজার ফ্রেন্ডলি ফর্ম হ্যান্ডলিং নিশ্চিত করে।",
      e: "Zod evaluates all fields across the schema comprehensively, accumulating all violations inside `ZodError.issues` rather than halting upon the first failure. This provides complete form error telemetry in a single round-trip.",
      tip: "ইন্টারভিউতে 'Comprehensive schema evaluation vs short-circuiting' উল্লেখ করা Zod-এর গভীর জ্ঞানের প্রমাণ।"
    },
    {
      lvl: "situation",
      q: "উচ্চগতির এপিআইতে রিকোয়েস্ট লগিংয়ের কারণে এপিআই রেসপন্স টাইম ২০ms বেড়ে গেছে। কীভাবে লগিং অপটিমাইজ করবে?",
      m: "সমাধান: (১) পিনো (Pino) লগার ব্যবহার করে লগ রাইটিংকে ব্যাকগ্রাউন্ড থ্রেডে অফলোড করব (`pino/file` বা `pino-transport`)। (২) Morgan বা HTTP লগারে শুধুমাত্র ব্যর্থ রিকোয়েস্ট (4xx, 5xx) অথবা যে রিকোয়েস্টগুলো ২০০ms-এর বেশি স্লো সেগুলো লগ করব—সব রুটিন 200 OK রিকোয়েস্ট লগ করার দরকার নেই। (৩) প্রোডাকশনে লগ লেভেল `debug` থেকে বাড়িয়ে `info` বা `warn` করব।",
      b: "লগিংয়ের ওভারহেড কমাতে পিনো লগার ব্যবহার করে আলাদা থ্রেডে লগ পাঠাতে হবে। রুটিন সফল রিকোয়েস্টের ভারী লগ বাদ দিয়ে কেবল এরর ও অতিরিক্ত স্লো রিকোয়েস্টগুলো বিস্তারিত লগ করলে পারফরম্যান্স স্বাভাবিক থাকে।",
      e: "High-throughput logging bottlenecks are solved by: (1) Switching to Pino with detached worker thread transports, (2) Elevating log levels from debug to info/warn, (3) Filtering access logs to only record 4xx/5xx failures or queries exceeding high latency thresholds.",
      code: "app.use(morgan('combined', { skip: (req, res) => res.statusCode < 400 }));"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর ক্যাশ কাউন্টার ব্যাকএন্ডে ইনভয়েস ভ্যালিডেশন ও কাস্টম এরর হ্যান্ডলিং কীভাবে আর্থিক অসংগতি বন্ধ করেছিল?",
      m: "দোকানি সিস্টেমে আমরা কঠোর Zod স্কিমা দিয়ে নিশ্চিত করেছি: (১) পণ্যের পরিমাণ কখনো শূন্য বা ঋণাত্মক হতে পারবে না (`z.number().positive()`)। (২) ডিসকাউন্ট কখনো সাবটোটালের চেয়ে বেশি হতে পারবে না (`.refine(d => d.discount <= d.subtotal)`। (৩) কাস্টমার পেমেন্ট ও বাকি টাকার হিসাব যেন ১ পয়সাও অমিল না হয়। কোনো নিয়মের ব্যত্যয় ঘটলে আমাদের কাস্টম `FinancialValidationError` ফায়ার হতো এবং লেনদেন সম্পূর্ণ রোলব্যাক হতো। ফলে ক্যাশ কাউন্টারে কোনো অমিল হিসাব তৈরি হয়নি।",
      b: "দোকানি ক্যাশ কাউন্টারে ঋণাত্মক সংখ্যা বা সাবটোটালের চেয়ে বেশি ডিসকাউন্ট দেওয়া কঠোরভাবে বন্ধ ছিল। কোনো আর্থিক অমিল থাকলে ট্রানজাকশন তৎক্ষণাৎ বাতিল করে রোলব্যাক নিশ্চিত করায় কোনো আর্থিক জালিয়াতি হতে পারেনি।",
      e: "Prevented accounting disparities in Dokani POS via Zod cross-field refinements guaranteeing line-item quantities were positive, discounts never exceeded gross values, and payments reconciled exactly down to the Poisha.",
      code: "const InvoiceSchema = z.object({\n  subtotal: z.number().int().positive(),\n  discount: z.number().int().nonnegative(),\n  paidAmount: z.number().int().nonnegative()\n}).refine(d => d.discount <= d.subtotal, 'ডিসকাউন্ট সাবটোটালের চেয়ে বেশি হতে পারে না');"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ শত শত স্টোরের মাল্টি-টেন্যান্ট লগ ফাইল ব্যবস্থাপনা ও সেন্ট্রালাইজড ট্র্যাকিং কীভাবে করেছিলে?",
      m: "আমরা Winston লগে স্বয়ংক্রিয়ভাবে `tenantId` ইনজেক্ট করার জন্য `AsyncLocalStorage` ব্যবহার করেছি। প্রতিটি লগে `{ tenantId: 'store_123', traceId: 'uuid', level: 'info', message: 'Sale completed' }` মেটাডাটা থাকত। আমরা Grafana Loki ও Promtail দিয়ে লগ সেন্ট্রালাইজ করেছি। কোনো নির্দিষ্ট স্টোর ওনার সমস্যা জানালে আমরা Grafana-তে কুয়েরি করতাম `{app='dokani'} |= 'tenantId=\"store_123\"'`, ফলে নিমেষেই ওই নির্দিষ্ট দোকানের লাইভ ট্রানজাকশন হিস্ট্রি চোখের সামনে চলে আসত।",
      b: "দোকানি মাল্টি-টেন্যান্ট লগে আমরা AsyncLocalStorage দিয়ে স্বয়ংক্রিয়ভাবে টেন্যান্ট আইডি যুক্ত করেছি। গ্রাফানা লোকির সাহায্যে নির্দিষ্ট দোকানের আইডি দিয়ে সার্চ করে মুহূর্তের মধ্যে যেকোনো ত্রুটি সমাধান করা সম্ভব হয়েছিল।",
      e: "In Dokani POS, AsyncLocalStorage enriched every Winston log line with tenant context (`tenantId`). Promtail streamed these structured JSON logs to Grafana Loki, allowing on-demand queries filtered by tenantId for rapid customer support.",
      tip: "মাল্টি-টেন্যান্ট সিস্টেমে লগে টেন্যান্ট আইডি ইনজেকশন করা এন্টারপ্রাইজ মনিটরিংয়ের অন্যতম সেরা উদাহরণ।"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে লাইভ এক্সাম চলাকালীন এপিআই ক্র্যাশ ও এরর অ্যালার্ট রিয়েল-টাইমে টেলিগ্রাম বা স্ল্যাকে পাওয়ার জন্য কী অটোমেশন বানিয়েছিলে?",
      m: "আমরা Winston-এ একটি কাস্টম 'Alert Webhook Transport' ইন্টিগ্রেট করেছিলাম। যদি প্রোডাকশনে কোনো `5xx Fatal Error` বা ডাটাবেজ কানেকশন ডাউন ঘটে, উইনস্টন সাধারণ ফাইলে লগ করার সাথে সাথে একটি অ্যাসিনক্রোনাস ওয়েবহুক দিয়ে আমাদের ইঞ্জিনিয়ারিং টিমের ডেডিকেটেড Telegram Bot / Slack চ্যানেলে ইনস্ট্যান্ট মেসেজ পুশ করত (এররের সারসংক্ষেপ, ট্রেস আইডি এবং স্ট্যাক সহ)। ফলে ইউজার রিপোর্ট করার আগেই আমাদের টিম ৫ মিনিটের মধ্যে হটফিক্স ডেপ্লয় করতে পারত।",
      b: "পিটিটিএবিডিতে মারাত্মক কোনো সার্ভার ত্রুটি ঘটলে উইনস্টন স্বয়ংক্রিয়ভাবে টেলিগ্রাম ও স্ল্যাক চ্যানেলে অ্যালার্ট পাঠাত। এর ফলে ব্যবহারকারী জানানোর আগেই আমাদের টিম যেকোনো জটিল ত্রুটির তাৎক্ষণিক সমাধান নিশ্চিত করতে পারত।",
      e: "Configured a custom Winston transport streaming 5xx critical alarms directly into team Slack/Telegram webhooks with trace IDs and context snippets, enabling mean-time-to-detection (MTTD) under 60 seconds.",
      code: "const slackTransport = new Transport({\n  log: (info, callback) => {\n    if (info.level === 'error') sendToSlack(info);\n    callback();\n  }\n});"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ বারকোড স্ক্যানিংয়ের সময় ইনভ্যালিড বারকোড বা আনরেজিস্টার্ড প্রোডাক্ট স্ক্যান হলে এপিআই লেয়ারে কীভাবে এরর হ্যান্ডেল করেছিলে?",
      m: "ক্যাশিয়ার যখন ভুল বা নতুন কোনো বারকোড স্ক্যান করে, আমরা সাধারণ 500 বা জেনেরিক 404 এরর দিতাম না। আমরা একটি স্পেসিফিক `404 ProductNotFound` রেসপন্স দিতাম যার বডিতে থাকত: `{ code: 'PRODUCT_NOT_FOUND', barcode: '123456', canQuickCreate: true }`। এটি দেখে ফ্রন্টএন্ডে সাথে সাথে একটি 'Quick Product Add' পপআপ ভেসে উঠত যাতে ক্যাশিয়ার বিলিং স্ক্রিন ত্যাগ না করেই সাথে সাথে ওই বারকোডে পণ্যের নাম ও দাম বসিয়ে ১ ক্লিকে আইটেম কার্টে যোগ করে নিতে পারত।",
      b: "ভুল বারকোড স্ক্যান হলে আমরা কাস্টম এরর কোডসহ রেসপন্স পাঠাতাম যা ফ্রন্টএন্ডে কুইক অ্যাড মডাল ওপেন করত। ক্যাশিয়ার বিক্রি বন্ধ না রেখে সাথে সাথে নতুন পণ্যের নাম ও দাম দিয়ে আইটেম কার্টে যোগ করতে পারত।",
      e: "Unhandled barcodes returned tailored HTTP 404 payloads carrying actionable domain metadata (`{ code: 'PRODUCT_NOT_FOUND', barcode, canQuickAdd: true }`). This instructed the POS UI to launch an inline Quick-Add drawer without halting the checkout flow.",
      tip: "টেকনিক্যাল এররকে চমৎকার ইউজার এক্সপেরিয়েন্স ও বিজনেস সলিউশনে রূপান্তর করার অসাধারণ উদাহরণ।"
    },
    {
      lvl: "realworld",
      q: "API Error Handling এবং Validation-এ এন্টারপ্রাইজ স্কেলে কোড কোয়ালিটি রক্ষার জন্য তোমার স্ট্যান্ডার্ড গাইডলাইন কী?",
      m: "আমার স্ট্যান্ডার্ড গাইডলাইন: (১) কন্ট্রোলারের এন্ট্রি পয়েন্টে Zod দিয়ে ১০০% ইনপুট কঠোরভাবে ভ্যালিডেট করা। (২) প্রতিটি এররের জন্য সুনির্দিষ্ট HTTP স্ট্যাটাস কোড (RFC 7807) বজায় রাখা। (৩) প্রোডাকশনে কোনো অবস্থায় স্ট্যাক ট্রেস ক্লায়েন্টে না পাঠানো। (৪) প্রতিটি লগে Correlation ID যুক্ত রাখা। (৫) সমস্ত অপ্রত্যাশিত এরর সেন্ট্রালাইজড এরর ট্র্যাপে হ্যান্ডেল করে সার্ভার ক্র্যাশ মুক্ত রাখা।",
      b: "আমার স্ট্যান্ডার্ড নিয়মে থাকে: শতভাগ Zod ইনপুট ভ্যালিডেশন, সঠিক এইচটিটিপি স্ট্যাটাস কোড, প্রোডাকশনে স্ট্যাক ট্রেস গোপন রাখা, প্রতিটি লগে কোরিলেশন আইডি সংরক্ষণ এবং সেন্ট্রালাইজড এরর ট্র্যাপের সাহায্যে নিরবচ্ছিন্ন সার্ভার আপটাইম নিশ্চিত করা।",
      e: "My enterprise API standards: (1) 100% schema validation at controllers via Zod, (2) Strict RFC 7807 compliance, (3) Zero stack trace leaks in production, (4) Mandatory Correlation IDs attached to every log, and (5) Resilient centralized error boundaries.",
      tip: "এই সংক্ষিপ্ত চেকলিস্টটি ইন্টারভিউ কনক্লুশনে বললে তোমার ইঞ্জিনিয়ারিং স্ট্যান্ডার্ড স্পষ্ট ফুটে উঠবে।"
    }
  ]
};
