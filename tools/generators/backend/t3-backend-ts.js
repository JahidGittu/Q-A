// Topic 3: TypeScript & JavaScript in Backend Development (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "backend-typescript",
  name: "TypeScript in Backend & DTOs",
  desc: "TypeScript in Node/Express, DTO Patterns, Express Request Augmentation, Type-safe Services, Strict Compiler Options",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Node.js এবং Express ব্যাকএন্ডে সাধারণ জাভাস্ক্রিপ্টের চেয়ে TypeScript ব্যবহারের প্রধান সুবিধাসমূহ কী?",
      m: "প্লেইন জাভাস্ক্রিপ্ট ব্যাকএন্ডে টাইপো বা ডেটা শেপের ভুলে রানটাইমে সার্ভার ক্র্যাশ হওয়ার ঝুঁকি খুব বেশি থাকে (`TypeError: Cannot read properties of undefined`)। TypeScript ব্যবহারের সুবিধা: (১) কম্পাইল টাইমে শতভাগ টাইপ চেকিং যা রানটাইম ক্র্যাশ বন্ধ করে। (২) Data Transfer Objects (DTO) ডিফাইন করে এপিআই রিকোয়েস্ট ও রেসপন্সের স্পষ্ট চুক্তি তৈরি করা যায়। (৩) রিফ্যাক্টরিং অত্যন্ত নিরাপদ হয় এবং আইডিই-তে অসাধারণ অটো-কমপ্লিশন পাওয়া যায়। (৪) ওআরএম (Prisma) এর সাথে শতভাগ নিখুঁত ডাটাবেজ টাইপ সেফটি দেয়।",
      b: "টাইপস্ক্রিপ্ট কম্পাইল টাইমে টাইপ যাচাই করে রানটাইম সার্ভার ক্র্যাশ প্রতিরোধ করে। এর মাধ্যমে এপিআই রিকোয়েস্টের জন্য সুনির্দিষ্ট ডিটিও (DTO) কাঠামো তৈরি করা যায় এবং ডাটাবেজ মডেলের সাথে ব্যাকএন্ড কোডের নির্ভুল সামঞ্জস্য বজায় থাকে।",
      e: "TypeScript transforms Node.js backends by detecting null dereferences and type regressions at compile time rather than crashing in production. It formalizes API contracts via DTOs and provides seamless type synchronization with ORMs like Prisma.",
      tip: "ইন্টারভিউতে বলবে: 'প্রোডাকশন এন্টারপ্রাইজ ব্যাকএন্ডে টাইপস্ক্রিপ্ট ছাড়া কাজ করা রানটাইম ক্র্যাশের ঝুঁকি বাড়িয়ে দেয়'।"
    },
    {
      lvl: "lvl1",
      q: "Express-এর `Request` অবজেক্টকে TypeScript-এ কীভাবে কাস্টম ফিল্ড (যেমন `req.user`, `req.tenantId`) দিয়ে এক্সটেন্ড বা অগমেন্ট (Augment) করা যায়?",
      m: "Express-এর ডিফল্ট `Request` টাইপে কোনো `user` বা `tenantId` প্রপার্টি থাকে না। তাই `req.user = decodedToken` লিখলে টাইপস্ক্রিপ্ট কম্পাইল এরর দেয়। সমাধান: আমরা প্রজেক্টের `src/@types/express/index.d.ts` ফাইলে Declaration Merging ব্যবহার করি: `declare global { namespace Express { interface Request { user?: AuthUser; tenantId?: string; } } }`। এর ফলে পুরো প্রজেক্টে যেকোনো রাউট বা মিডলওয়্যারে `req.user` সম্পূর্ণ টাইপ-সেফ হয়ে যায়।",
      b: "এক্সপ্রেস রিকোয়েস্টে কাস্টম ডাটা যুক্ত করতে ডিক্লারেশন মার্জিং ব্যবহার করে Express.Request ইন্টারফেসকে এক্সটেন্ড করতে হয়। এর ফলে req.user এবং req.tenantId কোনো টাইপস্ক্রিপ্ট এরর ছাড়াই নিরাপদে ব্যবহার করা যায়।",
      e: "Augment Express's ambient Request interface via TypeScript declaration merging in a custom `.d.ts` file (`namespace Express { interface Request { user?: User; } }`). This yields compile-time type safety across all middleware.",
      code: "declare global {\n  namespace Express {\n    interface Request {\n      user?: { id: string; role: string };\n      tenantId?: string;\n    }\n  }\n}"
    },
    {
      lvl: "lvl1",
      q: "DTO (Data Transfer Object) প্যাটার্ন কী এবং কেন ব্যাকএন্ড এপিআই কন্ট্রোলারে এটি ব্যবহার করা উচিত?",
      m: "DTO হলো এমন একটি অবজেক্ট যা ক্লায়েন্ট এবং সার্ভারের মধ্যে ঠিক কোন কোন ডেটা আদান-প্রদান হবে তার সুনির্দিষ্ট স্কিমা ও টাইপ নির্ধারণ করে। ক্লায়েন্ট হয়তো রিকোয়েস্টে ৫০টি ফিল্ড পাঠাতে পারে বা কোনো ম্যালিশিয়াস ফিল্ড (যেমন `isAdmin: true`) ইনজেক্ট করতে পারে। কন্ট্রোলারে একটি `CreateUserDto` থাকলে আমরা শুধুমাত্র অনুমোদিত ফিল্ডগুলোই গ্রহণ করি। এটি ব্যাকএন্ডের অভ্যন্তরীণ ডাটাবেজ মডেলকে ক্লায়েন্ট থেকে সুরক্ষিতভাবে বিচ্ছিন্ন (Decoupled) রাখে।",
      b: "ডিটিও হলো ক্লায়েন্ট ও সার্ভারের মধ্যে ডেটা আদান-প্রদানের সুনির্দিষ্ট কাঠামো। এটি ক্লায়েন্ট থেকে আসা অননুমোদিত ডেটা ফিল্টার করে বাদ দেয় এবং অভ্যন্তরীণ ডাটাবেজের রূপরেখা সুরক্ষিত রাখে।",
      e: "A Data Transfer Object (DTO) defines the exact shape of data entering or leaving an API endpoint. DTOs sanitize incoming payloads against mass-assignment vulnerabilities, decoupling external contracts from underlying database schemas.",
      code: "export interface CreateProductDto {\n  name: string;\n  price: number;\n  stock: number;\n  categoryId: string;\n}"
    },
    {
      lvl: "lvl1",
      q: "TypeScript ব্যাকএন্ড প্রজেক্ট কম্পাইল ও বিল্ড করতে `tsc` বনাম `ts-node` বনাম `tsx` এর ভূমিকা কী?",
      m: "`ts-node` এবং `tsx` হলো লোকাল ডেভেলপমেন্ট টুল যা কোনো ম্যানুয়াল কম্পাইলেশন ছাড়া সরাসরি মেমোরিতে `.ts` ফাইল রান করে (হট রিলোড সহ)। তবে প্রোডাকশনে কখনোই `ts-node` চালানো যাবে না কারণ এটি প্রচুর RAM ও CPU নষ্ট করে। প্রোডাকশনের জন্য আমরা `tsc` (TypeScript Compiler) অথবা `esbuild`/`swc` দিয়ে কোডকে অপটিমাইজড প্লেইন জাভাস্ক্রিপ্টে (`dist/` ফোল্ডারে) বিল্ড করি এবং নোড দিয়ে সরাসরি `node dist/server.js` এক্সিকিউট করি।",
      b: "ডেভেলপমেন্টে দ্রুত রান করার জন্য tsx বা ts-node ব্যবহার করা হয়। কিন্তু প্রোডাকশনে সর্বদা tsc দিয়ে কম্পাইল করে প্রাপ্ত বিশুদ্ধ জাভাস্ক্রিপ্ট ফাইল চালানো হয় যা সর্বোচ্চ গতি ও মেমোরি দক্ষতা নিশ্চিত করে।",
      e: "`tsx` and `ts-node` execute TypeScript on the fly in memory for rapid local development. In production, run pre-compiled JavaScript emitted by `tsc` or SWC (`node dist/main.js`) to eradicate runtime JIT transpilation overhead.",
      tip: "কখনোই প্রোডাকশন সার্ভারে `ts-node` চালাবে না; সবসময় বিল্ড করা `dist/` জাভাস্ক্রিপ্ট রান করবে।"
    },
    {
      lvl: "lvl1",
      q: "Backend `tsconfig.json`-এ কোন কোন কনফিগারেশন ফ্ল্যাগ অত্যন্ত গুরুত্বপূর্ণ?",
      m: "গুরুত্বপূর্ণ ফ্ল্যাগগুলো: (১) `target: 'ES2022'`: আধুনিক নোড রানটাইমের জন্য অপটিমাইজড জাভাস্ক্রিপ্ট আউটপুট। (২) `moduleResolution: 'node'` বা `'nodenext'`: নোডের মডিউল রেজোলিউশন নিশ্চিত করা। (৩) `strict: true`: সর্বোচ্চ টাইপ সেফটি। (৪) `outDir: './dist'`: কম্পাইল করা JS ফাইল রাখার লোকেশন। (৫) `esModuleInterop: true`: CommonJS প্যাকেজগুলো স্বচ্ছন্দে ESM স্টাইলে ইমপোর্ট করার সুবিধা।",
      b: "ব্যাকএন্ডের tsconfig কনফিগারেশনে target, moduleResolution, strict: true, outDir এবং esModuleInterop অত্যন্ত জরুরি যাতে আধুনিক নোড ও ডিপেনডেন্সিগুলোর সাথে টাইপস্ক্রিপ্ট মসৃণভাবে চলে।",
      e: "Crucial backend tsconfig options: `target: 'ES2022'`, `module: 'commonjs'` (or NodeNext), `moduleResolution: 'node'`, `strict: true` (for null checks), `outDir: './dist'`, and `esModuleInterop: true` for clean CommonJS interop.",
      code: "{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"commonjs\",\n    \"outDir\": \"./dist\",\n    \"rootDir\": \"./src\",\n    \"strict\": true,\n    \"esModuleInterop\": true,\n    \"skipLibCheck\": true\n  }\n}"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Class Validator এবং Class Transformer দিয়ে কীভাবে ক্লাস-বেসড DTO তৈরি করে অটোমেটিক ভ্যালিডেশন করা যায়?",
      m: "NestJS বা আধুনিক Express অ্যাপে আমরা `class-validator` ডেকোরেটর ব্যবহার করি (যেমন `@IsString()`, `@IsEmail()`, `@Min(1)`। কন্ট্রোলারে ইনকামিং JSON পেলে `plainToInstance(CreateUserDto, req.body)` দিয়ে ক্লাসে কনভার্ট করি এবং `validate(dto)` কল করি। কোনো নিয়ম লঙ্ঘন হলে এটি বিস্তারিত এরর অ্যারে দেয়। এটি অবজেক্ট-ওরিয়েন্টেড স্টাইলে অত্যন্ত পরিচ্ছন্ন ও রি-ইউজেবল কোড দেয়।",
      b: "ক্লাস ভ্যালিডেটর ডেকোরেটর ব্যবহারের মাধ্যমে ডিটিও ক্লাসের ভেতরেই ভ্যালিডেশনের নিয়ম সংজ্ঞায়িত করা হয়। এর ফলে রিকোয়েস্ট বডি ক্লাসে রূপান্তর করে স্বয়ংক্রিয়ভাবে ইনপুট ডাটা যাচাই করা যায়।",
      e: "Pairing `class-validator` decorators with `class-transformer` permits declarative schema definitions directly on class properties. Invoking `validate(dtoInstance)` checks the request payload against validation constraints prior to service execution.",
      code: "import { IsEmail, MinLength } from 'class-validator';\nexport class LoginDto {\n  @IsEmail() email!: string;\n  @MinLength(8) password!: string;\n}"
    },
    {
      lvl: "lvl2",
      q: "Generic API Response Wrapper টাইপ কীভাবে তৈরি করবে যা প্রতিটি এপিআই রেসপন্সে টাইপ সেফটি নিশ্চিত করে?",
      m: "আমরা একটি জেনেরিক ইন্টারফেস `ApiResponse<T>` তৈরি করি: `{ success: boolean; data: T; message?: string; error?: string; timestamp: string }`। কন্ট্রোলারে যখন আমরা কোনো প্রোডাক্ট রিটার্ন করি, রেসপন্স টাইপ হবে `ApiResponse<Product>`। যদি কোনো লিস্ট রিটার্ন করি, টাইপ হবে `ApiResponse<PaginatedResult<Product>>`। এর ফলে ফ্রন্টএন্ড এবং ব্যাকএন্ড উভয়ের জন্য এপিআই রেসপন্সের স্ট্রাকচার সম্পূর্ণ অভিন্ন ও টাইপ-সেফ থাকে।",
      b: "জেনেরিক এপিআই রেসপন্স র‍্যাপার সকল এপিআইর জন্য একটি অভিন্ন কাঠামো তৈরি করে। ApiResponse<T> ব্যবহারের ফলে সফল বা ব্যর্থ উভয় ক্ষেত্রে ক্লায়েন্ট সবসময় প্রত্যাশিত সুনির্দিষ্ট ডাটা টাইপ পায়।",
      e: "A generic response contract `ApiResponse<T>` standardizes payloads across the entire service ecosystem, pairing boolean success indicators with payload `data: T` and ISO timestamps for bulletproof frontend-backend integration.",
      code: "export interface ApiResponse<T> {\n  success: boolean;\n  data: T;\n  message?: string;\n  meta?: { page: number; total: number };\n}"
    },
    {
      lvl: "lvl2",
      q: "Express Request Handler-এর জন্য টাইপড কন্ট্রোলার ইন্টারফেস (`RequestHandler<Params, ResBody, ReqBody, ReqQuery>`) কীভাবে লিখতে হয়?",
      m: "Express-এর `@types/express` মডিউল একটি ৪-প্যারামিটারের জেনেরিক টাইপ দেয়: `RequestHandler<P, ResBody, ReqBody, ReqQuery>`. এর মাধ্যমে আমরা কন্ট্রোলারের প্রতিটি প্যারামিটার строго টাইপ করতে পারি: যেমন `RequestHandler<{ id: string }, ApiResponse<Product>, UpdateProductDto, { includeStock?: string }>`। এর ফলে `req.params.id`, `req.body`, এবং `req.query` এর ওপর সম্পূর্ণ টাইপস্ক্রিপ্ট টাইপ সেফটি ও স্বয়ংক্রিয় অটো-কমপ্লিট সক্রিয় হয়।",
      b: "এক্সপ্রেসের RequestHandler জেনেরিক টাইপের মাধ্যমে রাউট প্যারামস, রেসপন্স বডি, রিকোয়েস্ট বডি এবং কুয়েরি প্যারামিটার শতভাগ টাইপ-সেফ করা যায়, ফলে ভুল প্রপার্টি ব্যবহারের কোনো সুযোগ থাকে না।",
      e: "Express provides the generic `RequestHandler<P, ResBody, ReqBody, ReqQuery>`. Specifying these type parameters enforces compile-time safety over URL path params, expected response schemas, body DTOs, and query strings.",
      code: "export const updateProduct: RequestHandler<{ id: string }, ApiResponse<Product>, UpdateProductDto> = async (req, res) => {\n  // req.params.id and req.body are strictly typed!\n};"
    },
    {
      lvl: "lvl2",
      q: "Path Aliases (`@/services/...`, `@/models/...`) কীভাবে `tsconfig.json` এবং বিল্ড টুলে কনফিগার করবে যাতে রিলেটিভ পাথের বিশৃঙ্খলা (`../../../`) দূর হয়?",
      m: "আমরা `tsconfig.json`-এ `baseUrl: '.'` এবং `paths: { '@/*': ['src/*'] }` সেট করি। কিন্তু শুধু tsconfig দিলে প্রোডাকশনে কম্পাইল করা JS ফাইল রান হতে গিয়ে এরর দেবে কারণ নোড সরাসরি এলিয়াস বোঝে না। সমাধান: বিল্ডের সময় `tsc-alias` প্যাকেজ দিয়ে এলিয়াসগুলোকে আসল রিলেটিভ পাথে রূপান্তর করি, অথবা রানটাইমে `tsconfig-paths` রেজিস্টার করি।",
      b: "পাথ এলিয়াসের মাধ্যমে কোডের ভেতরে বিশ্রী ../../ পাথ পরিহার করে পরিষ্কার @/services পাথ ব্যবহার করা যায়। বিল্ডের সময় tsc-alias ব্যবহার করে পাথগুলো সমাধান করে প্রোডাকশন রান উপযোগী করা হয়।",
      e: "Configure path aliases in tsconfig via `baseUrl` and `paths`. To prevent production runtime module resolution crashes, run `tsc-alias` post-build to rewrite compile aliases back into relative file paths.",
      code: "// tsconfig.json\n\"paths\": {\n  \"@services/*\": [\"src/services/*\"],\n  \"@models/*\": [\"src/models/*\"]\n}"
    },
    {
      lvl: "lvl2",
      q: "Type-safe Environment Variables: `process.env` কে কীভাবে Zod দিয়ে টাইপ-সেফ ও রানটাইম-ভ্যালিডেটেড করবে?",
      m: "বাই-ডিফল্ট `process.env.PORT` হলো `string | undefined`, যা বাগে ফেলে। আমরা একটি `env.schema.ts` ফাইল তৈরি করি এবং Zod দিয়ে স্কিমা ডিফাইন করি (`PORT: z.coerce.number().default(5000), DATABASE_URL: z.string().url()`)। সার্ভার বুটের শুরুতে `EnvSchema.parse(process.env)` কল করি। কোনো ভ্যারিয়েবল মিসিং থাকলে সার্ভার চালু হওয়ার আগেই স্পষ্ট এরর দিয়ে বন্ধ হয়ে যাবে, ফলে রানটাইমে অপ্রত্যাশিত ক্র্যাশ এড়ানো যায়।",
      b: "process.env কে সুরক্ষিত করতে Zod স্কিমা দিয়ে ডাটাবেজ ইউআরএল ও পোর্ট যাচাই করা হয়। কোনো গোপন কি মিসিং থাকলে সার্ভার সাথে সাথে স্পষ্ট নোটিশ দিয়ে বন্ধ হবে, যা রানটাইম বাগ প্রতিরোধ করে।",
      e: "Default `process.env` properties are untyped optional strings. Parse environment variables at application startup through a Zod schema. If mandatory variables (e.g. DATABASE_URL) are missing, fail fast with explicit console diagnostics.",
      code: "const EnvSchema = z.object({\n  PORT: z.coerce.number().default(4000),\n  DATABASE_URL: z.string().url(),\n  JWT_SECRET: z.string().min(32)\n});\nexport const env = EnvSchema.parse(process.env);"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "tRPC (TypeScript Remote Procedure Call) কী এবং কীভাবে এটি ফ্রন্টএন্ড ও ব্যাকএন্ডের মধ্যে অ্যান্ড-টু-অ্যান্ড জিরো-এপিআই টাইপ সেফটি প্রদান করে?",
      m: "tRPC হলো এমন একটি আর্কিটেকচার যা কোনো কোড জেনারেশন বা স্কিমা ফাইল ছাড়াই ব্যাকএন্ডের রাউটার টাইপকে সরাসরি ফ্রন্টএন্ডে ইমপোর্ট করতে দেয় (`AppRouter`)। আপনি ব্যাকএন্ড সার্ভিসের রিটার্ন টাইপ পরিবর্তন করলে ফ্রন্টএন্ডের যে যে কম্পোনেন্টে ওই ডেটা ব্যবহৃত হয়েছে সেখানে সাথে সাথে কম্পাইল এরর ফুটে ওঠে! কোনো REST API ডকুমেন্টেশন বা টাইপো হওয়ার কোনো সুযোগ নেই—এটি ফুল-স্ট্যাক টাইপ সেফটির শীর্ষ স্ট্যান্ডার্ড।",
      b: "tRPC ব্যাকএন্ডের টাইপকে সরাসরি ফ্রন্টএন্ডে শেয়ার করে সম্পূর্ণ জিরো-এপিআই টাইপ সেফটি দেয়। ব্যাকএন্ডে কোনো ফিল্ড পরিবর্তন করলে ফ্রন্টএন্ডে সাথে সাথে টাইপ এরর প্রদর্শন করে কোডের নির্ভুলতা রক্ষা করে।",
      e: "tRPC allows sharing server router types directly with client applications without code generation or schemas. Mutating a backend query or mutation signature instantly raises compile-time errors across dependent frontend components.",
      tip: "NT Tech বা যেকোনো আধুনিক ফুল-স্ট্যাক রোলে tRPC-র ধারণা জানা বিরাট কম্পিটিটিভ অ্যাডভান্টেজ।"
    },
    {
      lvl: "lvl3",
      q: "TypeScript-এ Service Layer-এর জন্য Generic Repository Pattern ইন্টারফেস কীভাবে ডিজাইন করবে?",
      m: "আমরা একটি জেনেরিক রিপোজিটরি ইন্টারফেস তৈরি করি: `interface IBaseRepository<T, CreateDto, UpdateDto> { findById(id: string): Promise<T | null>; findAll(filter: QueryFilter): Promise<T[]>; create(data: CreateDto): Promise<T>; update(id: string, data: UpdateDto): Promise<T>; delete(id: string): Promise<boolean>; }`। প্রতিটি স্পেসিফিক রিপোজিটরি (যেমন `IProductRepository`) এই ইন্টারফেস এক্সটেন্ড করে তার নিজস্ব ডোমেন মেথড যোগ করে। এর ফলে সম্পূর্ণ কোডবেজে ডাটাবেজ ইন্টারঅ্যাকশন অত্যন্ত ইউনিফর্ম ও টাইপ-সেফ থাকে।",
      b: "জেনেরিক রিপোজিটরি প্যাটার্নে একটি সাধারণ ইন্টারফেস তৈরি করা হয় যা সকল ডাটাবেজ মডেলের ক্রাড (CRUD) অপারেশনে টাইপ সেফটি বজায় রাখে এবং কোড পুনরাবৃত্তি রোধ করে।",
      e: "A generic repository interface `IBaseRepository<T, TCreateDto, TUpdateDto>` formalizes uniform CRUD persistence operations across entities, promoting DRY code and seamless integration with dependency injection containers.",
      code: "export interface IBaseRepository<T, C, U> {\n  find(id: string): Promise<T | null>;\n  create(payload: C): Promise<T>;\n  update(id: string, payload: U): Promise<T>;\n}"
    },
    {
      lvl: "lvl3",
      q: "Monorepo আর্কিটেকচারে (Turborepo / Nx) ফ্রন্টএন্ড ও ব্যাকএন্ডের মধ্যে কীভাবে একটি শেয়ার্ড টাইপস ও Zod প্যাকেজ (`@workspace/shared`) শেয়ার করা যায়?",
      m: "মনোরিপোতে আমরা একটি স্বাধীন শেয়ার্ড প্যাকেজ রাখি: `packages/shared`। সেখানে সব ডেটাবেজ এনটিটি টাইপস, Zod স্কিমাস এবং এরর কোড ডিফাইন করে এক্সপোর্ট করা হয়। ব্যাকএন্ড এক্সপ্রেস অ্যাপ এবং ফ্রন্টএন্ড নেক্সট জেএস অ্যাপ উভয়েই তাদের `package.json`-এ `\"@workspace/shared\": \"workspace:*\"` ডিপেনডেন্সি হিসেবে ইমপোর্ট করে। এর ফলে ব্যাকএন্ডে স্কিমা বদলালে ফ্রন্টএন্ডেও তা তৎক্ষণাৎ সিঙ্ক হয়ে যায়—কোনো কোড ডুপ্লিকেশন ছাড়া।",
      b: "মনোরিপো আর্কিটেকচারে শেয়ার্ড প্যাকেজ তৈরি করে সেখানে Zod স্কিমা ও টাইপ রাখা হয়। ফ্রন্টএন্ড ও ব্যাকএন্ড উভয় প্রজেক্ট একই শেয়ার্ড প্যাকেজ ব্যবহার করায় সর্বদা একই ডেটা প্রোটোকল নিশ্চিত থাকে।",
      e: "In Turborepo monorepos, isolated workspace packages (`packages/shared`) export schemas and types. Both the Next.js frontend and Express backend consume the package directly, ensuring synchronization without drift.",
      tip: "মনোরিপোতে শেয়ার্ড টাইপসের ব্যবহার বাস্তব এন্টারপ্রাইজ প্রজেক্টের স্পষ্ট পরিচায়ক।"
    },
    {
      lvl: "lvl3",
      q: "TypeScript Decorators এবং Metadata Reflection (`reflect-metadata`) কীভাবে ফ্রেমওয়ার্কগুলোতে (যেমন NestJS) ডিপেনডেন্সি ইনজেকশন পরিচালনা করে?",
      m: "Decorators হলো মেটাপ্রোগ্রামিং ফাংশন যা ক্লাস, মেথড বা প্রপার্টিকে অলংকৃত করে মেটাডাটা যোগ করে। `reflect-metadata` প্যাকেজটি টাইপস্ক্রিপ্ট কম্পাইলারের নির্দেশে ক্লাসের কনস্ট্রাক্টর প্যারামিটারের টাইপগুলো রানটাইম মেটাডাটা হিসেবে সেভ করে রাখে (`design:paramtypes`)। রানটাইমে ডিপেনডেন্সি ইনজেকশন (DI) কন্টেইনার সেই মেটাডাটা রিড করে স্বয়ংক্রিয়ভাবে ক্লাসের প্রয়োজনীয় ইনস্ট্যান্স তৈরি করে কনস্ট্রাক্টরে ইনজেক্ট করে দেয়।",
      b: "ডেকোরেটর এবং রিফ্লেক্ট মেটাডাটার মাধ্যমে ক্লাসের অভ্যন্তরীণ প্যারামিটার টাইপ রানটাইমে সংরক্ষণ করা হয়, যা ডিআই কন্টেইনারকে স্বয়ংক্রিয়ভাবে সঠিক ইনস্ট্যান্স ইনজেক্ট করতে সাহায্য করে।",
      e: "Decorators attach declarative metadata onto classes and methods. When paired with `reflect-metadata`, the TypeScript compiler emits type metadata (`design:paramtypes`) enabling IoC containers to inspect constructor dependencies at runtime and instantiate instances automatically.",
      code: "@Injectable()\nexport class InvoiceService {\n  constructor(private readonly repo: InvoiceRepository) {}\n}"
    },
    {
      lvl: "lvl3",
      q: "Branded Primitive Types দিয়ে কীভাবে নিশ্চিত করবে যে ভুল করে `CustomerId` ফিল্ডে `StoreId` স্ট্রিং পাস করা যাবে না?",
      m: "যেহেতু জাভাস্ক্রিপ্ট এবং সাধারণ টাইপস্ক্রিপ্টে দুটোই স্ট্রিং (`string`), তাই `deleteStore(customerId)` কল করলেও টাইপস্ক্রিপ্ট সাধারণ অবস্থায় কোনো এরর ধরে না। Branded Types একটি ইউনিক কম্পাইল-টাইম সিম্বল ট্যাগ ব্যবহার করে: `type StoreId = string & { readonly __brand: unique symbol };` এবং `type CustomerId = string & { readonly __brand: unique symbol };`। এর ফলে দুটোই স্ট্রিং হলেও টাইপস্ক্রিপ্ট তাদের সম্পূর্ণ ভিন্ন নন-ইন্টারচেঞ্জেবল টাইপ হিসেবে বিবেচনা করে এবং ভুল পাস রোধ করে।",
      b: "ব্র্যান্ডেড টাইপ স্ট্রিং আইডির সাথে ইউনিক সিম্বল ট্যাগ জুড়ে দেয়। এর ফলে ভুল করে স্টোর আইডির জায়গায় কাস্টমার আইডি পাস করলে টাইপস্ক্রিপ্ট সাথে সাথে কম্পাইল এরর প্রদর্শন করে ডাটাবেজ করাপশন রোধ করে।",
      e: "Branded primitives intersect base primitives with nominal symbol brands. This enforces compile-time uniqueness, ensuring a method signature requiring a `StoreId` explicitly rejects a `CustomerId` despite both executing as raw strings at runtime.",
      code: "type StoreId = string & { readonly __brand: 'StoreId' };\ntype CustomerId = string & { readonly __brand: 'CustomerId' };"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "প্রোডাকশন বিল্ডে `npm run build` দেওয়ার সময় টাইপস্ক্রিপ্ট ১০০+ টাইপ এরর ছুড়ে বিল্ড ব্যর্থ করছে কিন্তু অ্যাপটি জরুরি ডেপ্লয় করতে হবে। তাৎক্ষণিক এবং স্থায়ী সমাধান কী?",
      m: "তাৎক্ষণিক ফায়ারফাইটিং: `tsconfig.json`-এ সাময়িকভাবে `\"noEmitOnError\": false` অথবা বিল্ড স্ক্রিপ্টে `tsc --noEmit || true` দিয়ে ট্রান্সপাইলেশন শেষ করে ডেপ্লয় করা যেতে পারে (যদিও এটি ঝুঁকিপূর্ণ)। স্থায়ী সমাধান: (১) CI/CD পাইপলাইনে প্রি-পুশ হুক দিয়ে টাইপ চেক বাধ্যতামূলক করা যাতে এরর কোড গিটে না ঢোকে, (২) এররগুলোর মূল কারণ (সাধারণত প্যাকেজ আপডেট বা শিথিল টাইপ) একটি স্প্রিন্ট টাস্কে রিফ্যাক্টর করে ফিক্স করা, (৩) লাইব্রেরি টাইপ মিসম্যাচ হলে `skipLibCheck: true` দেওয়া।",
      b: "জরুরি ডেপ্লয়ে skipLibCheck অন করে দ্রুত বিল্ড করা যেতে পারে, কিন্তু স্থায়ী সমাধানে সিআই পাইপলাইনে কঠোর টাইপ চেকিং এনফোর্স করতে হবে এবং কোডবেজ রিফ্যাক্টর করে সব টাইপ এরর নির্মূল করতে হবে।",
      e: "Immediate mitigation: verify `skipLibCheck: true` to bypass third-party library conflicts, or build via SWC/esbuild directly if JavaScript output is valid. Long-term: fix type divergences systematically and enforce strict PR gates preventing untyped merges.",
      tip: "কখনোই টাইপস্ক্রিপ্ট এরর অগ্রাহ্য করে ডেপ্লয় করাকে ভালো অভ্যাস হিসেবে উপস্থাপন করবে না; স্থায়ী সমাধানের ওপর জোর দেবে।"
    },
    {
      lvl: "situation",
      q: "একটি থার্ড-পার্টি পেমেন্ট গেটওয়ে SDK-এর রেসপন্স টাইপস্ক্রিপ্ট টাইপে মিসিং রয়েছে এবং কোডে `any` দিতে হচ্ছে। কীভাবে টাইপ সেফটি ফিরিয়ে আনবে?",
      m: "সমাধান: (১) কখনোই সরাসরি `any` ব্যবহার করব না। (২) আমরা SDK-এর ডকুমেন্টেশন ও আসল JSON পেলোড দেখে একটি Zod স্কিমা লিখব (`BkashPaymentResponseSchema = z.object({...})`)। (৩) SDK থেকে পাওয়া কাঁচা ডেটাকে `BkashPaymentResponseSchema.parse(response)` দিয়ে রানটাইমে পার্স করব এবং `z.infer` দিয়ে টাইপ বের করে সার্ভিস লেয়ারে পাস করব। এর ফলে কোনো `any` ছাড়াই শতভাগ টাইপ সেফটি অর্জিত হবে।",
      b: "থার্ড পার্টি SDK-তে টাইপ না থাকলে Zod স্কিমা তৈরি করে z.infer এর মাধ্যমে টাইপস্ক্রিপ্ট টাইপ তৈরি করতে হবে। কাঁচা রেসপন্স Zod দিয়ে পার্স করলে কোনো any ছাড়াই নিখুঁত টাইপ সেফটি পাওয়া যায়।",
      e: "Avoid slapping `any` on untyped SDKs. Construct a Zod schema matching the provider's API payload, parsing incoming responses at runtime and deriving the static TypeScript contract via `z.infer<typeof Schema>`.",
      code: "const PaymentResponse = z.object({ trxId: z.string(), amount: z.number() });\ntype PaymentResponse = z.infer<typeof PaymentResponse>;"
    },
    {
      lvl: "situation",
      q: "ডাটাবেজ ওআরএম (Prisma) মডেলের সাথে কন্ট্রোলারের রিকোয়েস্ট বডি টাইপের ফারাক তৈরি হওয়ায় কিছু আন-অথোরাইজড ফিল্ড ডাটাবেজে ঢুকে যাচ্ছে। কীভাবে প্রিভেন্ট করবে?",
      m: "এটি ক্লাসিক Mass Assignment Vulnerability। সমাধান: কখনোই কন্ট্রোলারের ইনকামিং রিকোয়েস্ট বডি সরাসরি ওআরএম মেথডে পাস করব না (`prisma.user.create({ data: req.body })` নিষিদ্ধ!)। আমরা সর্বদা একটি কঠোর DTO এবং Zod স্কিমা ব্যবহার করব যা শুধুমাত্র হোয়াইটলিস্টেড ফিল্ডগুলো পার্স করে। Prisma-তে ডেটা পাস করার সময় এক্সপ্লিসিটলি ফিল্ডগুলো ম্যাপ করব (`data: { email: dto.email, name: dto.name }`)।",
      b: "ম্যাস অ্যাসাইনমেন্ট ঝুঁকি এড়াতে req.body কখনোই সরাসরি প্রিজমাতে পাস করা যাবে না। Zod বা ডিটিও দিয়ে শুধুমাত্র অনুমোদিত ফিল্ডগুলো ফিল্টার করে নির্দিষ্ট ফিল্ড ডাটাবেজে পাঠাতে হবে।",
      e: "Never feed raw `req.body` directly to ORM mutations to avert Mass Assignment exploits. Validate payloads strictly with whitelist-only DTO schemas, explicitly extracting permitted attributes prior to persistence calls.",
      code: "const { name, price } = ValidProductDto.parse(req.body);\nawait prisma.product.create({ data: { name, price, tenantId } });"
    },
    {
      lvl: "situation",
      q: "একটি বড় টাইপস্ক্রিপ্ট অবজেক্টে ফিল্ড টাইপ পরিবর্তন করার পর প্রজেক্টের ৫০টি ফাইলে কম্পাইল এরর দিচ্ছে। সহজে কীভাবে রিফ্যাক্টর করবে?",
      m: "টাইপস্ক্রিপ্টের কম্পাইল এররই মূলত আমাদের সবচেয়ে বড় বন্ধু! স্টেপস: (১) VS Code-এর 'Rename Symbol' (`F2`) শর্টকাট ব্যবহার করে ইন্টারফেসের ফিল্ডের নাম পরিবর্তন করব যা সব ফাইলে স্বয়ংক্রিয়ভাবে আপডেট করে। (২) টার্মিনালে `tsc --noEmit --watch` অন রাখব। (৩) টাইপস্ক্রিপ্ট যে যে ফাইলে এরর ফ্ল্যাগ করছে, এক এক করে ফাইলে গিয়ে বিজনেস লজিক আপডেট করব। পুরো এরর লিস্ট শূন্যে নেমে আসলে আমরা শতভাগ নিশ্চিত হতে পারব যে কোডবেজ কোথাও ভাঙেনি।",
      b: "টাইপস্ক্রিপ্টের সুবিধা হলো এটি সব ব্রোকেন লোকেশন নিখুঁতভাবে চিহ্নিত করে দেয়। F2 দিয়ে রিনেম সিম্বল ব্যবহার করে এবং tsc --noEmit চালিয়ে প্রতিটি এরর পর্যায়ক্রমে ফিক্স করে নিরাপদ রিফ্যাক্টরিং সম্পন্ন করা যায়।",
      e: "Leverage TypeScript's compiler as an exhaustive refactoring map. Utilize IDE Symbol Renaming (`F2`) to propagate structural modifications globally, iterating through compiler errors emitted by `tsc --noEmit` until the error index drops to zero.",
      tip: "ইন্টারভিউতে বলবে: 'TypeScript makes massive refactoring fearless because the compiler acts as an automated audit trail'."
    },
    {
      lvl: "situation",
      q: "কন্ট্রোলারে রিকোয়েস্ট কুয়েরি থেকে আসা স্ট্রিং প্যারামিটারকে সংখ্যায় রূপান্তর না করায় ডাটাবেজ ফিল্টারিংয়ে অপ্রত্যাশিত ফলাফল বা এরর আসছে। কীভাবে সমাধান করবে?",
      m: "কারণ HTTP GET রিকোয়েস্টের সব কুয়েরি প্যারামিটার বাই-ডিফল্ট স্ট্রিং (যেমন `req.query.limit = '10'`। সমাধান: Zod স্কিমায় `z.coerce.number().min(1).default(10)` ব্যবহার করব। Zod স্বয়ংক্রিয়ভাবে স্ট্রিংকে সংখ্যায় রূপান্তর করবে এবং ভ্যালিডেট করবে। অথবা ম্যানুয়ালি `parseInt(req.query.limit as string, 10)` ব্যবহার করে `isNaN` চেক করব।",
      b: "এইচটিটিপি কুয়েরি প্যারামিটার সবসময় স্ট্রিং থাকে। Zod এর z.coerce.number() দিয়ে স্বয়ংক্রিয়ভাবে স্ট্রিংকে সংখ্যায় রূপান্তর ও যাচাই করতে হবে যাতে ডাটাবেজে সঠিক টাইপ যায়।",
      e: "Query parameters arrive strictly as strings. Resolve this by applying Zod's `z.coerce.number()` to the query schema, transforming and validating strings into native JavaScript numbers before passing them to ORM filter queries.",
      code: "const QuerySchema = z.object({\n  limit: z.coerce.number().min(1).max(100).default(20),\n  page: z.coerce.number().min(1).default(1)\n});"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর সেলস ক্যালকুলেশন মডিউলে টাইপস্ক্রিপ্ট টাইপ সেফটি ব্যবহার করে কীভাবে আর্থিক নির্ভুলতা বজায় রেখেছিলে?",
      m: "আমরা ফিন্যান্সিয়াল ক্যালকুলেশনের জন্য স্ট্রিক্ট টাইপ ও ইন্টারফেস ডিফাইন করেছি: `InvoiceCalculationResult` যাতে `subtotal`, `vatAmount`, `discountAmount`, এবং `grandTotal` শতভাগ ইনটিজার পয়সায় টাইপ করা ছিল। কোনো ফাংশনে অপশনাল ফিল্ড বা `any` অনুমোদন করা হয়নি। ক্যালকুলেশন ফাংশনটি ছিল একটি পিওর ফাংশন যার ইনপুট এবং আউটপুট টাইপস্ক্রিপ্ট কঠোরভাবে গার্ড করায় কোনো ভুল বা নাল ভ্যালু ক্যালকুলেশনে প্রবেশ করতে পারেনি।",
      b: "দোকানি ফিন্যান্সিয়াল মডিউলে আমরা সব হিসাব পয়সায় ইনটিজার টাইপে কঠোরভাবে সীমাবদ্ধ রেখেছি। পিওর ফাংশন ও স্ট্রিক্ট ইন্টারফেস ব্যবহারের মাধ্যমে কোনো প্রকার নাল বা অনির্ধারিত মান হিসাবকে প্রভাবিত করতে পারেনি।",
      e: "Enforced financial accuracy in Dokani POS by modeling ledger line items as strongly typed integer amounts (Poisha). The pure calculation engine strictly required non-nullable DTOs, preventing undefined arithmetic bugs.",
      code: "export interface InvoiceTotals {\n  readonly subtotalPoisha: number;\n  readonly vatPoisha: number;\n  readonly discountPoisha: number;\n  readonly payablePoisha: number;\n}"
    },
    {
      lvl: "realworld",
      q: "Prisma Client থেকে জেনারেট হওয়া টাইপস্ক্রিপ্ট মডেল এবং কাস্টম বিজনেস DTO-এর মধ্যে পরিষ্কার সেপারেশন কীভাবে বজায় রেখেছিলে?",
      m: "আমরা Prisma মডেলগুলোকে সরাসরি এপিআই রেসপন্সে পাঠাতাম না (যেমন ইউজারের পাসওয়ার্ড হ্যাশ বা অভ্যন্তরীণ ডাটাবেজ মেটাডাটা যাতে ক্লায়েন্টে না যায়)। আমরা Prisma মডেল টাইপ (`import { User } from '@prisma/client'`) সার্ভিস লেয়ারে ডেটাবেজ কাজের জন্য ব্যবহার করেছি, আর ক্লায়েন্টের জন্য `Omit<User, 'passwordHash'>` দিয়ে একটি ট্রান্সফর্মড `UserResponseDto` তৈরি করে রিটার্ন করেছি।",
      b: "প্রিজমার আসল ডাটাবেজ মডেল সরাসরি এপিআইতে না পাঠিয়ে পাসওয়ার্ড বা গোপন ফিল্ড বাদ দিয়ে ইউজার রেসপন্স ডিটিও তৈরি করে ক্লায়েন্টে পাঠানো হয়েছিল। এর ফলে অভ্যন্তরীণ ডাটাবেজ মডেল বাইরে উন্মুক্ত হয়নি।",
      e: "Decoupled Prisma database models from external API contracts. Repositories returned full Prisma models, while services transformed entities into explicit presentation DTOs stripping sensitive internals (like password hashes).",
      tip: "কখনোই ডাটাবেজ এন্টিটি সরাসরি API রেসপন্সে রিটার্ন করবে না; সর্বদা প্রেজেন্টেশন ডিটিও ব্যবহার করবে।"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে ভিডিও, কুইজ ও অ্যাসাইনমেন্টের মতো ভিন্ন ভিন্ন কোর্স কনটেন্টের জন্য টাইপস্ক্রিপ্ট পলিমরফিক মডেল কীভাবে হ্যান্ডেল করেছিলে?",
      m: "আমরা Discriminated Union প্যাটার্ন ব্যবহার করেছি: প্রতিটি কোর্স আইটেমের একটি কমন `type: 'VIDEO' | 'QUIZ' | 'ASSIGNMENT'` ছিল। টাইপস্ক্রিপ্ট সুইচের ভেতরে যখন আমরা `item.type === 'VIDEO'` চেক করতাম, কম্পাইলার সাথে সাথে `item.videoUrl` এবং `item.durationMinutes` অটো-কমপ্লিট করত। আর কুইজ হলে `item.questions` অ্যারে প্রোভাইড করত। এর ফলে কোনো রানটাইম এরর ছাড়াই জটিল কোর্স ম্যাটেরিয়াল নিরাপদে প্রসেস হয়েছে।",
      b: "পিটিটিএবিডিতে পলিমরফিক কোর্স কন্টেন্টের জন্য আমরা ডিসক্রিমিনেটেড ইউনিয়ন ব্যবহার করেছি। কন্টেন্টের ধরনের ওপর ভিত্তি করে টাইপস্ক্রিপ্ট নিজে থেকেই ভিডিও বা কুইজের সুনির্দিষ্ট ফিল্ডগুলো নিশ্চিত করত।",
      e: "Modeled heterogeneous educational modules in PTTABD via discriminated union types keyed on `type`. Exhaustive switch statements dynamically narrowed types to their specific attributes without type assertion hacks.",
      code: "type CourseModule =\n  | { type: 'VIDEO'; streamUrl: string; duration: number }\n  | { type: 'QUIZ'; questions: Question[]; passScore: number };"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর মাল্টি-টেন্যান্ট ডেটাবেজ কুয়েরিতে `tenantId` ফিল্টার মিস হওয়া রোধ করতে টাইপস্ক্রিপ্ট দিয়ে কীভাবে কম্পাইল-টাইম গার্ড বসিয়েছিলে?",
      m: "আমরা Prisma Client-এর এক্সটেনশন (`$extends`) অথবা একটি টাইপ-সেফ রিপোজিটরি র‍্যাপার ব্যবহার করেছি যেখানে প্রতিটি কুয়েরি মেথডের প্রথম প্যারামিটার ছিল বাধ্যতামূলক `tenantId: string`। কোনো ডেভেলপার যদি ভুল করেও `tenantId` ছাড়া প্রোডাক্ট বা সেলস খোঁজার চেষ্টা করত, টাইপস্ক্রিপ্ট বিল্ড টাইমে কম্পাইল এরর দিত। এর ফলে কোনো অবস্থাতেই ক্রস-টেন্যান্ট ডেটা লিকেজের সুযোগ ছিল না।",
      b: "দোকানি রিপোজিটরির প্রতিটি মেথডে টেন্যান্ট আইডি প্যারামিটার বাধ্যতামূলক করে টাইপস্ক্রিপ্ট গার্ড বসানো হয়েছিল। টেন্যান্ট আইডি ছাড়া কোনো কুয়েরি কল করলে সাথে সাথে কম্পাইল এরর আসত, যা ডেটা লিক পুরোপুরি বন্ধ করেছিল।",
      e: "Constructed compile-time tenant isolation guards in Dokani by requiring `tenantId: string` as the non-optional first argument across all repository methods, rejecting un-scoped tenant queries at build time.",
      code: "findProductById(tenantId: string, productId: string): Promise<Product | null>;"
    },
    {
      lvl: "realworld",
      q: "টাইপস্ক্রিপ্ট কোডবেজে `any` ব্যবহারের বিরুদ্ধে টিম কালচার ও ESLint রুল কীভাবে এনফোর্স করেছিলে?",
      m: "আমরা ESLint-এ `@typescript-eslint/no-explicit-any: 'error'` রুল এনফোর্স করেছি। ফলে কোনো ডেভেলপার কোডে `any` লিখলে গিট প্রি-কমিট হুক এবং GitHub Actions CI বিল্ড সাথে সাথে ফেইল করত। যদি সত্যি কোনো অজ্ঞাত ডেটা হ্যান্ডেল করতে হতো, আমরা `unknown` ব্যবহার বাধ্যতামূলক করেছি এবং টাইপ ন্যারোয়িং বা Zod স্কিমা দিয়ে টাইপ নিশ্চিত করতে উৎসাহিত করেছি। এর ফলে টিমে ১০০% ক্লিন টাইপ হাইজিন বজায় ছিল।",
      b: "আমরা ইএসলিন্টে no-explicit-any এরর হিসেবে নির্ধারণ করেছিলাম। any সম্পূর্ণ নিষিদ্ধ করে unknown এবং Zod স্কিমা ব্যবহার বাধ্যতামূলক করায় প্রজেক্টে সর্বোচ্চ টাইপ সেফটি নিশ্চিত হয়েছিল।",
      e: "Enforced strict zero-any policies by configuring `@typescript-eslint/no-explicit-any: 'error'` in ESLint, failing CI builds upon violation. Required `unknown` paired with type narrowing or Zod schemas for untrusted payloads.",
      tip: "টিমে 'no-explicit-any' রুল প্রয়োগের কথা বলা কোড কোয়ালিটি ও লিডারশিপ স্ট্যান্ডার্ড প্রমাণ করে।"
    }
  ]
};
