// Topic 5: AI Coding Tools, Code Review & Blocker Escalation (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "ai-workflow-code-review",
  name: "AI Coding Tools, Code Review & Blocker Escalation",
  desc: "Cursor / Claude Code Workflows, Verifying AI Output, PR Code Review Standards, Investigating Bugs Independently, Communicating Blockers",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "তুমি তোমার দৈনন্দিন সফটওয়্যার ডেভেলপমেন্টে AI টুলস (Cursor, Claude Code, Copilot) কীভাবে ব্যবহার করো?",
      m: "আমি AI টুলসকে একজন সুপারফাস্ট 'Junior Pair Programmer' হিসেবে ব্যবহার করি—যা আমার ডেভেলপমেন্ট গতি ৩–৪ গুণ বাড়িয়ে দেয়। মূলত যেসব কাজে ব্যবহার করি: (১) রিপিটেটিভ বয়লারপ্লেট কোড জেনারেশন (যেমন: Prisma মডেল, Zod ভ্যালিডেশন স্কিমা, TypeScript ইন্টারফেস ও টাইপস), (২) রেগুলার এক্সপ্রেশন (Regex) ও জটিল SQL কুয়েরি ড্রাফট করা, (৩) ইউনিট টেস্ট কেসের প্রাথমিক বয়লারপ্লেট লেখা, (৪) কোনো নতুন লাইব্রেরির এপিআই সিনট্যাক্স দ্রুত এক্সপ্লোর করা। তবে আমি কখনো AI-কে মূল বিজনেস ডিসিশন, ডাটাবেজ ট্রানজেকশন বা সিকিউরিটি আর্কিটেকচার ছেড়ে দিই না; আমি ড্রাইভিং সিটে থাকি, AI কেবল গতি বাড়ায়।",
      b: "আমি এআই টুলসকে একজন সহযোগী কোডার হিসেবে ব্যবহার করি যা টাইপস্ক্রিপ্ট ইন্টারফেস, ডেটাবেজ স্কিমা এবং ইউনিট টেস্টের মতো রিপিটেটিভ কাজগুলো দ্রুত তৈরি করতে সাহায্য করে। তবে মূল বিজনেস লজিক এবং আর্কিটেকচারাল সিদ্ধান্ত আমি নিজে গ্রহণ করি।",
      e: "I leverage AI coding assistants (such as Cursor, Claude Code, and GitHub Copilot) as rapid pair-programming accelerators. Key applications include scaffolding boilerplate Prisma schemas, generating strict TypeScript interfaces, drafting unit test suites, and exploring alternative SQL queries. Crucially, high-level system design, security boundaries, and domain architecture remain entirely under my manual control.",
      tip: "ইন্টারভিউতে স্পষ্ট বলবে: 'I am the pilot; AI is the engine.' এটি প্রমাণ করে তুমি টুলটির মাস্টার।"
    },
    {
      lvl: "lvl1",
      q: "AI জেনারেটেড কোডকে অন্ধভাবে বিশ্বাস না করে তুমি কীভাবে তা পুঙ্খানুপুঙ্খভাবে ভেরিফাই ও টেস্ট করো?",
      m: "AI কোড প্রায়শই পুরোনো লাইব্রেরির মেথড উদ্ভাবন করে (Hallucination) অথবা সূক্ষ্ম সিকিউরিটি বাগ ফেলে রাখে। আমার ভেরিফিকেশন প্রসেস: (১) **Strict TypeScript Verification:** কোড নেওয়ার পর সাথে সাথে `tsc --noEmit` চালাই; AI অনেক সময় অলসভাবে `any` টাইপ ব্যবহার করে বা অস্তিত্বহীন প্রপার্টি দেয়। (২) **Security & Multi-Tenant Audit:** ডাটাবেজ কোয়েরিতে `tenantId` ফিল্টার বাদ পড়েছে কিনা, N+1 লুপ তৈরি হয়েছে কিনা এবং SQL ইনজেকশনের ঝুঁকি আছে কিনা নিজে লাইন-বাই-লাইন রিভিউ করি। (৩) **Edge Cases & Null Checks:** শূন্য স্টক, নাল ডাটা, এবং নেটওয়ার্ক টাইমআউটের মতো কঠিন এজ কেসগুলো ম্যানুয়ালি টেস্ট করি। (৪) লোকাল ব্রাউজারে চালিয়ে এবং টেস্ট স্যুট পাস করিয়ে তবেই গিট কমিট করি।",
      b: "এআই কোড অন্ধভাবে ব্যবহার না করে প্রথমে টাইপস্ক্রিপ্ট কম্পাইলার দিয়ে টাইপ সুরক্ষা নিশ্চিত করি। এরপর সিকিউরিটি ও মাল্টি-টেন্যান্ট ফিল্টারগুলো লাইন-বাই-লাইন অডিট করি। নাল ভ্যালু ও এরর হ্যান্ডলিং নিজে পরীক্ষা করে ব্রাউজারে টেস্ট চালানোর পরই কোড কমিট করি।",
      e: "I never trust AI-generated code blindly. My verification protocol spans: running strict TypeScript compiler checks (`tsc --noEmit`) to catch hallucinated APIs or lazy `any` typings; conducting manual line-by-line security audits to guarantee tenant-isolation filters (`tenantId`) and index usage are preserved; verifying edge cases (null boundaries, async race conditions); and executing automated unit tests before any commit.",
      tip: "Strict TypeScript checks এবং Security/Multi-tenant audit উল্লেখ করা অত্যাবশ্যক।"
    },
    {
      lvl: "lvl1",
      q: "একজন Lead Full-Stack Developer-এর সাথে কাজ করার সময় Pull Request (PR) রিভিউ ও কোড রিভিউতে কী কী বিষয়ে সবচেয়ে বেশি নজর দাও?",
      m: "কোড রিভিউ হলো কোডবেসের মান ও স্থায়িত্ব বজায় রাখার প্রধান দুর্গ। আমি পিআর রিভিউতে ৫টি স্তম্ভ দেখি: (১) **Business Logic & Correctness:** পিআরটি কি টিকিট বা স্পেসিফিকেশনের সমস্যাটি আসলেই সমাধান করছে? কোনো আনহ্যান্ডেল্ড রেস কন্ডিশন বা এজ কেস আছে কি? (২) **Type Safety & Maintainability:** কোনো `any` টাইপ আছে কিনা, কোড পরিষ্কার ও সেলফ-ডকুমেন্টিং কিনা। (৩) **Database & Performance Impact:** কোনো আন-ইনডেক্সড কুয়েরি বা N+1 কোয়েরি আছে কিনা যা প্রোডাকশন ডাউন করতে পারে। (৪) **Security & Secrets:** কোনো API Key বা পাসওয়ার্ড ভুলবশত কোডে রয়ে গেছে কিনা। (৫) **Automated Test Coverage:** নতুন ফিচারের সাথে যথাযথ ইউনিট বা ইন্টিগ্রেশন টেস্ট যুক্ত করা হয়েছে কিনা।",
      b: "কোড রিভিউতে আমরা কোডের কার্যকারিতা, টাইপ সেফটি, ডাটাবেজ পারফরম্যান্স এবং সিকিউরিটি পুঙ্খানুপুঙ্খভাবে যাচাই করি। কোনো সিক্রেট কি বা স্লো কুয়েরি আছে কিনা এবং প্রয়োজনীয় অটোমেটেড টেস্ট যুক্ত করা হয়েছে কিনা তা নিশ্চিত করে গঠনমূলক ফিডব্যাক দিই।",
      e: "When reviewing Pull Requests alongside a Lead Engineer, I focus on five pillars: functional correctness and edge-case handling against the feature spec; strict type safety and modular maintainability; database query efficiency (checking for N+1 traps and unindexed scans); security hygiene (ensuring zero hardcoded credentials and valid sanitization); and verifying that automated test suites adequately cover modified execution paths.",
      tip: "পিআর রিভিউতে 'Constructive & Respectful Feedback'-এর কথা উল্লেখ করা সিনিয়র মানসিকতার পরিচয়।"
    },
    {
      lvl: "lvl1",
      q: "কোনো জটিল বাগ বা ইন্টিগ্রেশন ইস্যুতে তুমি সম্পূর্ণ আটকে গেলে (Completely Stuck), টিম লিডকে ডাকার আগে নিজে নিজে কোন কোন সুনির্দিষ্ট পদক্ষেপ নাও?",
      m: "সরাসরি টিম লিডকে ডেকে সময় নষ্ট না করে আমি একটি সিস্টেমেটিক ৫-ধাপের ইনভেস্টিগেশন চালাই: (১) **Minimal Reproduction:** লোকাল এনভায়রনমেন্টে সমস্যাটি বিচ্ছিন্ন করি এবং একটি ছোট স্ক্রিপ্ট বা টেস্ট কেস বানিয়ে ১০০% সময় বাগটি রিপ্রোডিউস করি। (২) **Telemetry & Logs:** ব্রাউজারের Network Tab, Server JSON Logs, এবং ডাটাবেজের `pg_stat_activity` চেক করে ঠিক কোন লেয়ারে ফেইল হচ্ছে (HTTP, Payload, DB Connection) তা নিশ্চিত হই। (৩) **Git Bisect:** `git bisect` চালিয়ে দেখি কোন নির্দিষ্ট কমিটে সমস্যাটি প্রথম শুরু হয়েছিল। (৪) **Official Docs & GitHub Issues:** লাইব্রেরির অফিশিয়াল চেঞ্জলগ এবং গিটহাবের ওপেন/ক্লোজড ইস্যু চেক করি লাইব্রেরির কোনো অভ্যন্তরীণ বাগ আছে কিনা। (৫) যদি একান্তই সমাধান না হয়, তখন লিডকে জানানোর সময় পরিষ্কার ৩টি তথ্য দিই: সমস্যাটি কী, আমি নিজে কী কী ট্রাই করেছি ও রেজাল্ট কী এসেছে, এবং আমার হাইপোথিসিস কী।",
      b: "বাগ বা সমস্যায় আটকে গেলে আগে নিজে নিজে সমস্যাটি লোকালি রিপ্রোডিউস করি, সার্ভার ও ডাটাবেজ লগ খতিয়ে দেখি এবং গিট হিস্ট্রি চেক করি। সমাধান না হলে টিম লিডকে জানানোর সময় আমি যা যা চেষ্টা করেছি তার সম্পূর্ণ সারসংক্ষেপ সহ পেশাদারভাবে মেসেজ দিই যাতে লিডের সময় বাঁচে।",
      e: "Before escalating blockers, I execute a structured investigative routine: establish a deterministic minimal reproduction in an isolated test; inspect runtime telemetry across network payloads, application logs, and database queries; execute git bisect to identify the exact regression commit; and consult official release notes and GitHub issue threads. When escalation is necessary, I present a concise brief: the exact symptom, steps already attempted with observed outcomes, and current diagnostic hypotheses.",
      tip: "এই উত্তরটি প্রমাণ করে যে তুমি একজন স্বাবলম্বী (Self-reliant) ইঞ্জিনিয়ার যে অন্যের সময় নষ্ট করে না।"
    },
    {
      lvl: "lvl1",
      q: "রিমোট টিমে (যেমন ফিলিপাইন ও বাংলাদেশ টাইমজোনে) কাজ করার সময় Blocker বা ঝুঁকি কীভাবে আর্লি ও ক্লিয়ারলি কমিউনিকেট করতে হয়?",
      m: "রিমোট কালচারে 'Silent Struggle' হলো সবচেয়ে বড় অপরাধ। আমার কমিউনিকেশন নিয়ম: (১) কোনো টাস্কে ১-২ ঘণ্টার বেশি আনপ্রোডাক্টিভ আটকে থাকলে সাথে সাথে স্ল্যাক বা টিম চ্যানেলে আপডেট দিই। (২) মেসেজটি সব সময় স্ট্রাকচার্ড আকারে লিখি: **[Context]**, **[What I Discovered / Attempted]**, **[The Exact Blocker]**, এবং **[What I Need / Suggested Next Step]**। (৩) প্রজেক্টের ডেলিভারি ডেডলাইনের কোনো ঝুঁকি তৈরি হলে ডেলিভারির দিনে নয়, বরং ২–৩ দিন আগেই টিম লিডকে সতর্ক করি যাতে প্রয়োজনে প্রায়োরিটি অ্যাডজাস্ট বা অন্য কাউকে হেল্পে লাগানো যায়। এর ফলে রিমোট টিমে সর্বোচ্চ বিশ্বাস ও ট্রান্সপারেন্সি বজায় থাকে।",
      b: "রিমোট টিমে দীর্ঘ সময় কাউকে না জানিয়ে আটকে থাকা উচিত নয়। কোনো কাজে বাধা পেলে স্ল্যাকে পয়েন্ট আকারে সমস্যা, কী চেষ্টা করেছি এবং কী সাহায্য দরকার তা স্পষ্ট জানিয়ে দিই। ডেডলাইনের ঝুঁকি থাকলে আগেভাগেই লিডকে অবহিত করে কাজের স্বচ্ছতা বজায় রাখি।",
      e: "In remote distributed engineering, transparency and early communication prevent delivery surprises. If an unexpected blocker halts momentum for more than 1–2 hours, I post an asynchronous brief in Slack structured with: Context, Root-Cause Telemetry, Attempted Solutions, and Proposed Next Steps. If sprint delivery milestones are endangered, I flag risks days ahead rather than on deadline morning, fostering high trust across timezones.",
      tip: "Communicates blockers early and clearly হলো শীর্ষ রিমোট টিমের মূল মানদণ্ড।"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Cursor বা Claude Code-এ একিউরেট কোড পাওয়ার জন্য Context Window অপটিমাইজেশন ও `.cursorrules` ফাইল কীভাবে কনফিগার করো?",
      m: "AI তখনই ভালো কোড দেয় যখন তাকে সঠিক প্রসঙ্গ (Context) দেওয়া হয়। আমি রিপোজিটরির রুটে একটি `.cursorrules` ফাইল রাখি যেখানে নির্দিষ্ট নিয়ম ডিফাইন করা থাকে: (১) 'Always use TypeScript with strict mode, never use any'. (২) 'Use Prisma Client extensions; always scope queries by tenantId'. (৩) 'Use Next.js Server Actions with Zod validation'. (৪) ফাইল ওপেন করার সময় অপ্রয়োজনীয় ২০টি ট্যাব বন্ধ করে শুধু প্রাসঙ্গিক স্কিমা ও ইন্টারফেস ফাইলগুলো কন্টেক্সটে রাখি (`@schema.prisma`, `@auth.ts`)। এর ফলে AI কোনো অপ্রাসঙ্গিক কোড বানায় না এবং প্রথমবারেই নির্ভুল ও প্রোডাকশন-রেডি সিনট্যাক্স দেয়।",
      b: "প্রজেক্টের রুটে .cursorrules ফাইলে টাইপস্ক্রিপ্ট স্ট্রাকচার, প্রিজমা টেন্যান্ট স্কোপিং এবং প্রজেক্টের কোডিং নিয়ম লিখে রাখি। কেবল প্রাসঙ্গিক ফাইলগুলো কন্টেক্সটে রাখায় এআই শতভাগ সঠিক কোড তৈরি করে।",
      e: "To maximize LLM precision in Cursor and Claude Code, I engineer deterministic context boundaries via a root `.cursorrules` file. Rules mandate strict TypeScript conventions, tenant-scoped Prisma access, and Zod input schemas. I explicitly scope the LLM context using targeted symbol tagging (`@schema.prisma`, `@types/index.ts`) while purging irrelevant buffers to eliminate hallucination.",
      code: "# .cursorrules configuration:\n- Tech stack: Next.js 15, Prisma ORM, PostgreSQL, TailwindCSS\n- Never output 'any' types; enforce Zod schemas for all mutations\n- Every DB query MUST include { where: { tenantId } }\n- Prefer pure functions and async/await error handling"
    },
    {
      lvl: "lvl2",
      q: "AI কোড জেনারেট করার সময় যেসব পারফরম্যান্স অ্যান্টি-প্যাটার্ন (যেমন N+1 কুয়েরি বা আনবাউন্ডেড মেমোরি) ঢুকিয়ে দেয়, তা কীভাবে ডিটেক্ট ও নির্মূল করো?",
      m: "AI প্রায়শই লুপের ভেতর `await prisma.user.findUnique()` লিখে মারাত্মক N+1 কুয়েরি তৈরি করে বা এরেতে সব রো পুশ করে মেমোরি স্পাইক ঘটায়। আমি এগুলো যেভাবে ক্যাচ করি: (১) **Code Inspection:** পিআরে কোনো লুপের ভেতর অ্যাসিনক্রোনাস ডাটাবেজ কল থাকলে তা সাথে সাথে ফ্ল্যাগ করি এবং `include:` বা `findMany({ where: { id: { in: ids } } })` দিয়ে সিঙ্গেল ব্যাচ কুয়েরিতে রূপান্তর করি। (২) **Prisma Query Logging:** লোকাল ডেভেলপমেন্টে `prisma.$on('query')` কনফিগার করে রাখি যাতে কোনো এপিআই কলে কয়টি কুয়েরি চলছে এবং কত মিলি সেকেন্ড লাগছে তা কনসোলে দেখা যায়। (৩) আনবাউন্ডেড কুয়েরি দেখলে বাধ্যতামূলকভাবে `take: 50` পেজিনেশন বসাই।",
      b: "এআই প্রায়ই লুপের ভেতর ডাটাবেজ কুয়েরি লিখে পারফরম্যান্স নষ্ট করে। আমরা লগে কুয়েরি সংখ্যা দেখে এগুলো শনাক্ত করি এবং লুপের ভেতরের কুয়েরিগুলোকে ইনক্লুড বা ব্যাচ কুয়েরি দিয়ে অপটিমাইজ করি।",
      e: "AI frequently introduces subtle N+1 queries by embedding database calls within array iterators (`for...of`, `Promise.all(arr.map(async ...))`). I audit code paths to ensure relational entities are joined via Prisma `include` or batched using `in: ids`. Additionally, logging query telemetry via Prisma's `$on('query')` exposes runaway query volumes in local development, triggering immediate pagination refactors.",
      code: "// Bad AI pattern:\nfor (const item of items) { await prisma.product.findUnique({ where: { id: item.id } }); }\n\n// Optimized refactor:\nconst products = await prisma.product.findMany({\n  where: { id: { in: items.map(i => i.id) }, tenantId }\n});"
    },
    {
      lvl: "lvl2",
      q: "একটি হাই-কোয়ালিটি Pull Request (PR) ডেসক্রিপশনে কী কী উপাদান থাকা উচিত যাতে কোড রিভিউ দ্রুত ও মসৃণ হয়?",
      m: "একটি ভালো পিআর ডেসক্রিপশন রিভিউয়ারের ৮০% সময় বাঁচিয়ে দেয়। আমার পিআর টেমপ্লেটে ৪টি প্রধান সেকশন থাকে: (১) **Context / Problem:** এই পিআরটি কোন টিকিট বা সমস্যার সমাধান করছে (যেমন: Fixes #104 - Barcode Scanner Debouncing)। (২) **What Changed:** সংক্ষেপে বুলেটে আর্কিটেকচারাল পরিবর্তনগুলো লেখা। (৩) **Visual Proof / Telemetry:** ফ্রন্টএন্ড হলে স্ক্রিনশট বা ২ সেকেন্ডের জিফ/ভিডিও; ব্যাকএন্ড হলে পোস্টম্যান টেস্টের রেসপন্স বা বেঞ্চমার্ক লেটেন্সি। (৪) **Testing Plan:** রিভিউয়ার লোকালি কীভাবে টেস্ট করবে তার ৩ লাইনের স্পষ্ট নির্দেশিকা।",
      b: "পিআরে সমস্যার বিবরণ, কী কী পরিবর্তন আনা হয়েছে, স্ক্রিনশট বা ভিডিও প্রমাণ এবং লোকালি টেস্ট করার স্পষ্ট নির্দেশিকা যুক্ত করি। এটি রিভিউয়ারের সময় বাঁচায় এবং দ্রুত কোড মার্জ করতে সাহায্য করে।",
      e: "An exceptional PR description minimizes cognitive load for reviewers. My template contains: Context & Ticket Reference (linking the Jira/GitHub issue); Summary of Changes (bulleted architectural modifications); Empirical Verification (annotated screenshots, GIF screencasts, or terminal latency logs); and a deterministic Test Plan outlining exact steps to verify the execution path locally.",
      tip: "Visual Proof এবং Deterministic Test Plan পিআরকে আন্তর্জাতিক মানের করে তোলে।"
    },
    {
      lvl: "lvl2",
      q: "কোনো দুর্বোধ্য বাগ (Elusive Bug) খোঁজার জন্য `git bisect` এবং মিনিমাল রিপ্রোডাকশন স্ক্রিপ্ট কীভাবে ব্যবহার করো?",
      m: "`git bisect` হলো বাইনারি সার্চের মতো একটি জাদুকরী গিট টুল। যখন টিমে কোনো রিগ্রেশন বাগ আসে যা আগে ছিল না কিন্তু এখন হচ্ছে: (১) `git bisect start` চালাই। (২) বর্তমান ভাঙা কমিটকে বলি `git bisect bad`। (৩) এক সপ্তাহ আগের স্টেবল কমিট আইডি দিয়ে বলি `git bisect good <commit-hash>`। (৪) গিট স্বয়ংক্রিয়ভাবে মাঝের কমিটে চেকআউট করে। আমি টেস্ট চালিয়ে গুড বা ব্যাড চিহ্নিত করি। (৫) মাত্র ৫-৬টি স্টেপে গিট সুনির্দিষ্টভাবে সেই ঐতিহাসিক কমিট আইডিটি বের করে দেয় যেখানে বাগটি প্রথম প্রবেশ করেছিল! এরপর সেই কমিটের গিট ডিফ দেখে ৫ মিনিটে রুট কজ ফিক্স করে ফেলি।",
      b: "গিট বাইসেক্ট ব্যবহার করে বাইনারি সার্চের মাধ্যমে হাজার হাজার কমিটের ভেতর থেকে কোন কমিটে বাগটি ঢুকেছিল তা কয়েক মিনিটে নির্ভুলভাবে চিহ্নিত করি এবং ডিফ দেখে দ্রুত সমাধান করি।",
      e: "When tracking an elusive regression across hundreds of commits, I leverage `git bisect` for binary search triage: mark the current HEAD as `bad` and a known historical release as `good`. Git checks out the midpoint commit iteratively. By validating the automated reproduction script at each checkpoint, Git deterministically identifies the exact commit hash that introduced the defect in log(N) time.",
      code: "# Git Bisect Workflow:\ngit bisect start\ngit bisect bad HEAD\ngit bisect good v2.1.0\n# Run tests, mark 'git bisect good' or 'git bisect bad'\n# Git outputs: abc1234 is the first bad commit"
    },
    {
      lvl: "lvl2",
      q: "যখন কোনো এক্সটার্নাল ডিপেন্ডেন্সি (যেমন পেমেন্ট এপিআই বা ক্লাউড ভেন্ডর ডাউন) তোমার পুরো স্প্রিন্ট আটকে দেয়, তখন কীভাবে ম্যানেজ করো?",
      m: "আমার ৩টি পদক্ষেপ: (১) **Immediate Decoupling:** বাস্তব এপিআই ডাউন থাকলে কাজ থামিয়ে রাখি না; একটি নির্ভরযোগ্য লোকাল মক সার্ভার (যেমন Prism বা Mock Service Worker) তৈরি করি যা থার্ড-পার্টির হুবহু রিকোয়েস্ট ও এরর রেসপন্স প্রদান করে। (২) টিমের স্ল্যাকে স্পষ্ট নোটিফিকেশন দিই: 'ভেন্ডর এপিআই ডাউন থাকায় আমি লোকাল মক দিয়ে ফ্রন্টএন্ড ও ডাটাবেজ লজিক ১০০% কমপ্লিট করে রাখছি; ভেন্ডর লাইভ হলে কেবল এন্ডপয়েন্ট টেস্ট করব।' (৩) ভেন্ডরের স্ট্যাটাস পেজ সাবস্ক্রাইব করে ট্র্যাকিং রাখি। এর ফলে স্প্রিন্টের কোনো ডেলিভারি সময় নষ্ট হয় না।",
      b: "থার্ড-পার্টি সার্ভিস ডাউন থাকলে বসে না থেকে মক সার্ভার তৈরি করে নিজের কোডিং সম্পন্ন করি। স্ল্যাকে বিষয়টি স্পষ্ট জানিয়ে রাখি যাতে স্প্রিন্টের সময় নষ্ট না হয় এবং সার্ভিস ঠিক হওয়ামাত্র ইন্টিগ্রেশন টেস্ট সম্পন্ন করি।",
      e: "External vendor outages must not paralyze engineering momentum. I decouple execution immediately by standing up Mock Service Worker (MSW) or stub servers matching the provider's contractual schema. I broadcast an async Slack status: 'Vendor API degraded; continuing feature execution against mock fixtures.' When the vendor restores uptime, we swap configuration flags to execute real-world contract tests.",
      tip: "Decouple with MSW / Stubs প্রমাণ করে এক্সটার্নাল ডিপেন্ডেন্সি তোমাকে থামাতে পারে না।"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "AI টুল ব্যবহার করে কীভাবে ব্রিলিয়ান্ট টেস্ট স্যুট (Unit, Integration, Edge Cases) দ্রুত জেনারেট করবে কিন্তু ভঙ্গুর (Brittle) মক এড়াবে?",
      m: "AI-কে টেস্ট লেখার জন্য সেরা প্রম্পট হলো: 'Don't mock internal implementation details; write black-box tests based on inputs and expected outputs'। (১) আমি AI-কে ফাংশনের সোর্স কোড এবং টাইপস দিই এবং বলি: 'Generate Jest test cases covering: happy path, null inputs, boundary numbers (0, negative, max int), and concurrent race conditions'। (২) ডাটাবেজ টেস্টের ক্ষেত্রে ভঙ্গুর মক করার চেয়ে একটি আসল টেম্পোরারি টেস্ট ডাটাবেজে (Dockerized PostgreSQL) টেস্ট চালাই। (৩) AI টেস্টের প্রাথমিক খসড়া দেওয়ার পর নিজে যাচাই করি যে টেস্টটি আসলেই ফেল করে কিনা যখন কোডে ইচ্ছাকৃতভাবে বাগ ঢুকানো হয় (Mutation Testing)।",
      b: "এআই দিয়ে ব্ল্যাক-বক্স টেস্ট লিখিয়ে নিই যেখানে এজ কেস ও বাউন্ডারি ইনপুট গুরুত্ব পায়। কৃত্রিম মক ব্যবহারের চেয়ে টেস্ট ডাটাবেজে আসল ডাটা দিয়ে ইন্টিগ্রেশন টেস্ট যাচাই করি যাতে কোডের স্থায়িত্ব বজায় থাকে।",
      e: "I direct LLMs to generate behavior-driven black-box test suites rather than brittle implementation mocks. Prompts mandate testing edge cases: zero boundaries, integer overflows, expired JWTs, and database uniqueness collisions. For data persistence layers, we run tests against ephemeral Dockerized PostgreSQL instances, avoiding brittle database client mocking and verifying true relational behavior.",
      tip: "Behavior-driven black-box tests বনাম Brittle mocks টেস্ট আর্কিটেকচারের শ্রেষ্ঠ নীতি।"
    },
    {
      lvl: "lvl3",
      q: "AI অ্যাক্সিলারেশন এবং হিউম্যান ইঞ্জিনিয়ারিং জাজমেন্টের মধ্যে সীমারেখা কোথায়? কোন কাজগুলো কখনো AI-এর ওপর অন্ধভাবে ছাড়া উচিত নয়?",
      m: "সীমারেখাটি খুব স্পষ্ট: **'AI generates syntax, Humans decide architecture and security'**। যেসব কাজ কখনো AI-এর ওপর ছাড়া যায় না: (১) ডাটাবেজ স্কিমা ডিজাইন ও মাল্টি-টেন্যান্ট আইসোলেশন পলিসি—এখানে ভুল হলে পুরো কোম্পানির ব্যবসা ধ্বংস হতে পারে। (২) ক্রিপ্টোগ্রাফি, সিক্রেট এনক্রিপশন ও পেমেন্ট অথেনটিকেশন লজিক। (৩) ব্যবসায়িক অগ্রাধিকার ও প্রোডাক্ট ট্রেড-অফ (যেমন স্পিড বনাম কনসিসটেন্সি)। এবং (৪) প্রোডাকশন সার্ভারে লাইভ কনফিগারেশন পুশ করা। কোডের চূড়ান্ত ওনারশিপ এবং দায় সবসময় রক্ত-মাংসের ডেভেলপারের, কোনো টুলের নয়।",
      b: "সিনট্যাক্স ও বয়লারপ্লেট এআই দিয়ে লেখা হলেও আর্কিটেকচারাল সিদ্ধান্ত, সিকিউরিটি পলিসি, ডাটাবেজ ট্রানজেকশন এবং ব্যবসায়িক সিদ্ধান্ত সবসময় ইঞ্জিনিয়ারকেই নিতে হয়। কোডের চূড়ান্ত দায়িত্ব সবসময় মানুষের।",
      e: "The boundary is unequivocal: AI accelerates syntax generation; engineers govern architectural trade-offs and security invariants. Critical domains that must never be delegated blindly to LLMs include multi-tenant schema boundaries, financial transaction isolation levels, cryptographic secrets management, and live infrastructure provisioning. Accountability resides strictly with the engineer.",
      tip: "AI accelerates syntax; Engineers govern invariants—এই দর্শনটি লিডারশিপের স্বাক্ষর।"
    },
    {
      lvl: "lvl3",
      q: "একটি হাই-থ্রুপুট মাল্টি-টেন্যান্ট SaaS অ্যাপ্লিকেশনে আর্কিটেকচারাল কোড রিভিউ চেকলিস্ট কেমন হওয়া উচিত?",
      m: "আমাদের আর্কিটেকচারাল রিভিউ চেকলিস্টে ৫টি নন-নেগোশিয়েবল পয়েন্ট থাকে: (১) **Tenant Scoping:** প্রতিটি ডাটাবেজ কুয়েরিতে বাধ্যতামূলক `tenantId` আছে কি? কোনো গ্লোবাল কুয়েরি লিক হচ্ছে কি? (২) **Concurrency Locks:** স্টক কমানো বা টাকা স্থানান্তরের জায়গায় কি `SELECT ... FOR UPDATE` বা অ্যাটোমিক ইনক্রিমেন্ট ব্যবহার করা হয়েছে? (৩) **Query Optimization:** নতুন কুয়েরিটিতে ব্যবহৃত কলামগুলোর ওপর প্রয়োজনীয় ইনডেক্স আছে কি? কোনো Sequential Scan আছে কি? (৪) **Input Validation:** Zod দিয়ে এপিআই ইনপুট স্যানিটাইজ করা হয়েছে কি? (৫) **Idempotency & Retries:** নেটওয়ার্ক ফেইলিয়ারে ডাবল এন্ট্রি রোধের ব্যবস্থা আছে কি?",
      b: "মাল্টি-টেন্যান্ট কোড রিভিউতে টেন্যান্ট আইডি স্কোপিং, ডাটাবেজ রো-লকিং, ইনডেক্সিং, ইনপুট ভ্যালিডেশন এবং আইডেমপোটেন্সি কঠোরভাবে যাচাই করি যাতে সিস্টেমে কোনো ডাটা লিক বা কনকারেন্সি সমস্যা না থাকে।",
      e: "Architectural PR checklist for multi-tenant SaaS: strict verification of `tenantId` predicates on all database access paths; atomic row-level locks on mutable inventory/financial states; database index coverage on foreign keys and filter predicates; comprehensive Zod schema parsing at API ingress; and idempotency protections on stateful mutations.",
      code: "// PR Architectural Checklist:\n[ ] Tenant Scoping verified (Prisma context)\n[ ] Atomic transaction locks enforced on inventory mutations\n[ ] Covered database indexes on filter predicates\n[ ] Zod validation schemas enforced on request payload\n[ ] Idempotency-Key support on financial endpoints"
    },
    {
      lvl: "lvl3",
      q: "প্রোডাকশনে যখন এমন একটি অদ্ভুত বাগ আসে যার কোনো এরর লগ নেই (Silent Failure), তখন কীভাবে ডায়াগনোসিস করবে?",
      m: "যখন সাধারণ লগ কোনো ক্লু দেয় না: (১) **Dynamic Request Tracing:** রিকোয়েস্টের হেডারে একটি ইউনিক `x-request-id` ইনজেক্ট করি যা ক্লায়েন্ট থেকে সার্ভার এবং ডাটাবেজ পর্যন্ত প্রতিটি স্তরে পাস হয়। (২) **Inspect State Dumps:** মেমোরিতে স্টেট কী রূপ ধারণ করছে তা দেখতে নোডজেএস-এর `process._getActiveHandles()` বা নির্দিষ্ট ব্রেকপয়েন্টে স্ট্রাকচার্ড পে-লোড লগ করি। (৩) **Database Telemetry:** ডাটাবেজ স্তরে `log_min_duration_statement = 0` কনফিগার করে সাময়িকভাবে ওই টেন্যান্টের প্রতিটি কুয়েরি ও রিটার্ন রো পরীক্ষা করি। (৪) ক্লায়েন্ট ব্রাউজারে হেডলেস স্ক্রিপ্ট (Playwright) দিয়ে হুবহু নেটওয়ার্ক পেলোড সিমুলেট করে নীরব ফেইলিউরটি রিপ্রোডিউস করি।",
      b: "নীরব ফেইলিউরে রিকোয়েস্ট আইডি দিয়ে পুরো ডাটা ফ্লো ট্র্যাক করি। ডাটাবেজ লেভেলে কুয়েরি লগ অন করে স্টেট পরীক্ষা করি এবং ব্রাউজার নেটওয়ার্ক পেলোড সিমুলেট করে সমস্যার আসল কারণ বের করি।",
      e: "Diagnosing silent production anomalies requires deep telemetry: propagate an immutable `x-request-id` header end-to-end through reverse proxies, application services, and database queries; temporarily enable granular query logging on PostgreSQL for the affected tenant; inspect system state transitions via structured logging; and run synthetic headless browser simulations via Playwright to reproduce client-side silent drops.",
      tip: "End-to-end x-request-id tracing এবং Granular telemetry সাইলেন্ট বাগ ধরার চূড়ান্ত অস্ত্র।"
    },
    {
      lvl: "lvl3",
      q: "টিমে AI টুল ব্যবহারের সময় প্রজেক্টের সিকিউরিটি ও গোপনীয়তা (Proprietary Codebase & Secrets) কীভাবে সুরক্ষিত রাখবে?",
      m: "কোম্পানির কোডবেসের নিরাপত্তা সর্বোচ্চ অগ্রাধিকার। আমাদের ৩টি কঠোর নিয়ম: (১) **Zero Secrets in AI Buffers:** কোনো প্রোডাকশন API Key, ডাটাবেজ পাসওয়ার্ড বা কাস্টমার পার্সোনাল ডাটা (PII) কখনোই কোনো চ্যাটবক্স বা এআই প্রম্পটে পেস্ট করা নিষিদ্ধ; এর জন্য `git-secrets` বা `trufflehog` দিয়ে অটোমেটেড স্ক্যানিং সক্রিয় থাকে। (২) **Enterprise Privacy Toggles:** Cursor বা Copilot-এ 'Do not train on our code' পলিসি এবং এন্টারপ্রাইজ প্রাইভেসি মোড অন রাখি। (৩) **Synthetic Mock Data:** কোনো সমস্যা সমাধানের জন্য এআইকে ডাটা দেখাতে হলে ডামি ডাটা (যেমন `user_123`, `test@example.com`) বানিয়ে কন্টেক্সটে দিই।",
      b: "এআই প্রম্পটে কোনো সিক্রেট পাসওয়ার্ড বা বাস্তব কাস্টমার ডাটা দেওয়া সম্পূর্ণ নিষিদ্ধ। এন্টারপ্রাইজ প্রাইভেসি সেটিংস অন রাখি যাতে কোম্পানির কোড কোনো মডেলে ট্রেনিংয়ের জন্য ব্যবহৃত না হয়।",
      e: "Protecting proprietary IP and confidential data during AI-assisted workflows: enforce strict pre-commit hooks (`git-secrets`, `trufflehog`) to prevent API keys and DB credentials from ever entering buffers; enable zero-data-retention enterprise privacy modes ensuring model providers do not train on codebases; and anonymize payloads using synthetic schemas when probing external models.",
      tip: "Zero data retention enterprise policy এবং Trufflehog সিকিউরিটি সচেতনতা প্রকাশ করে।"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "Cursor বা Claude তোমাকে একটি অ্যালগরিদম দিল যা অত্যন্ত দ্রুত কিন্তু এক লাইনের দুর্বোধ্য কোড (Unreadable One-Liner)—তুমি কী করবে?",
      m: "আমি কখনোই দুর্বোধ্য কোড প্রোডাকশনে পুশ করব না, যতই তা চতুর হোক না কেন। আমার নিয়ম: 'Code is read 10x more than it is written'। আমি সাথে সাথে AI-কে প্রম্পট দেব: 'Refactor this one-liner into clean, self-explanatory, multi-step functions with descriptive variable names and strict TypeScript types'। যদি পারফরম্যান্সের জন্য বিশেষ কোনো বিটওয়াইজ বা জটিল ট্রিক প্রয়োজনই হয়, তবে তার উপরে ৩ লাইনের স্পষ্ট কমেন্ট লিখব যা ব্যাখ্যা করবে কোডটি কেন এমন এবং রেফারেন্স ডকুমেন্টেশনের লিঙ্ক থাকবে। রিডাবিলিটি ছাড়া পারফরম্যান্স টেকনিক্যাল ঋণে পরিণত হয়।",
      b: "অতি জটিল এক লাইনের কোড প্রোডাকশনে ব্যবহার না করে সহজবোধ্য একাধিক ফাংশনে রূপান্তর করি। কোড পড়ার সুবিধা ও পরিষ্কার টাইপ নিশ্চিত করে প্রয়োজনে কমেন্ট লিখে ব্যাখ্যা যুক্ত করি।",
      e: "I reject unreadable one-liners. Software is read ten times more often than it is written; obfuscated cleverness introduces catastrophic maintenance debt. I refactor the logic into modular, readable steps with descriptive semantic variable names. If non-standard optimizations (e.g. bitwise operations) are mandatory for latency thresholds, I document the rationale and benchmark links extensively.",
      tip: "Code is read 10x more than written—মার্টিন ফাউলারের এই নীতি কোড কোয়ালিটির মূল ভিত্তি।"
    },
    {
      lvl: "situation",
      q: "তুমি সতীর্থের এমন একটি PR রিভিউ করছ যা স্পষ্টতই AI থেকে হুবহু কপি করা—কোনো টেস্ট নেই এবং অস্তিত্বহীন টাইপ রয়েছে। কীভাবে সম্মানজনকভাবে ফিডব্যাক দেবে?",
      m: "আমি কখনোই তাকে আক্রমণ করব না বা বলব না 'তুমি এটা AI দিয়ে বানিয়েছ'। আমি সম্পূর্ণ টেকনিক্যাল ও পেশাদার মন্তব্য করব: (১) 'এই পিআরের আইডিয়াটি দারুণ! তবে লক্ষ্য করলাম `tsc --noEmit` চালালে ৩টি টাইপ এরর আসছে—যেমন `User` টাইপে `tenantTier` প্রপার্টিটি সংজ্ঞায়িত নেই।' (২) 'এই ফাংশনটিতে যদি ডাটাবেজ থেকে নাল রিটার্ন আসে, তবে আনহ্যান্ডেল্ড এক্সেপশনে ক্র্যাশ করার ঝুঁকি রয়েছে।' (৩) 'আমাদের টিম স্ট্যান্ডার্ড অনুযায়ী মূল ফাংশনটির জন্য ৩টি ইউনিট টেস্ট কেস যুক্ত করতে হবে। চলো এগুলো ফিক্স করে একসাথে মার্জ করি।' এতে কোডের মান সুরক্ষিত থাকে এবং সতীর্থও কোনো অপমান বোধ করে না।",
      b: "ব্যক্তিগত আক্রমণ না করে কোডের টেকনিক্যাল ত্রুটি—যেমন অস্তিত্বহীন টাইপ, নাল ভ্যালু হ্যান্ডলিং এবং টেস্ট কেসের অনুপস্থিতি ভদ্রভাবে কমেন্টে তুলে ধরি। একসাথে সমস্যা সমাধান করে পিআর মার্জ করার প্রস্তাব দিই।",
      e: "Deliver objective, empathetic review comments focused entirely on code invariants rather than provenance: 'Strong feature concept! However, compiling with `tsc --noEmit` yields errors on undefined properties on the User interface. Also, handling null database returns here will prevent unhandled runtime crashes. Let's add two deterministic unit tests covering the edge cases before merging.' Respectful critique elevates the team.",
      tip: "Provenance (কোথা থেকে এসেছে) নয়, Invariants (কোডের মান)-এ ফোকাস করা সেরা রিভিউ নীতি।"
    },
    {
      lvl: "situation",
      q: "একটি জটিল ডকার নেটওয়ার্ক বা Nginx রিভার্স প্রক্সি ইস্যুতে তুমি ২ ঘণ্টা ধরে সম্পূর্ণ আটকে আছো—টিম লিডকে কীভাবে একটি আদর্শ ব্লকার মেসেজ পাঠাবে?",
      m: "আমি স্ল্যাকে একটি পারফেক্ট ৪-ধাপের মেসেজ পাঠাব:\n'Hi [Lead Name], I am currently blocked on configuring the Nginx reverse proxy for WebSocket upgrades on Dokani POS.\n- **Issue:** Socket connections are returning 400 Bad Request.\n- **What I Attempted:** Checked `/var/log/nginx/error.log`, verified upstream PM2 port 3000 is listening, and added `proxy_set_header Upgrade $http_upgrade;`.\n- **Hypothesis:** It seems Nginx `proxy_http_version 1.1;` directive might be getting overridden in the nested location block.\n- **Ask:** Could you spare 5 minutes to review my nginx.conf snippet, or should I temporarily fall back to HTTP long-polling?'\nএই মেসেজটি পাওয়ার পর লিড ২ মিনিটেই আমাকে আনব্লক করতে পারবে।",
      b: "স্ল্যাকে সমস্যা, কী কী চেষ্টা করেছি, ত্রুটির কারণ নিয়ে আমার অনুমান এবং ৫ মিনিটের সাহায্যের অনুরোধ জানিয়ে একটি পরিপাটি মেসেজ দিই যাতে লিডের সময় বাঁচে এবং দ্রুত সমাধান মেলে।",
      e: "Draft a high-density, low-friction escalation brief in Slack:\n'Hi [Lead], I have hit a 2-hour blocker on Nginx WebSocket upgrades:\n- Symptom: WSS handshakes fail with HTTP 400.\n- Diagnostic Actions Taken: Verified PM2 port binding, inspected error logs, added upgrade headers.\n- Working Hypothesis: The nested location block might be overriding the HTTP/1.1 protocol directive.\n- Request: Could you glance at my 15-line nginx.conf block, or do you recommend falling back to HTTP polling for this sprint?'",
      tip: "এই মেসেজ টেমপ্লেটটি সিনিয়র ইঞ্জিনিয়ারদের আর্ট—ইন্টারভিউয়ার এটি শুনে মুগ্ধ হতে বাধ্য।"
    },
    {
      lvl: "situation",
      q: "AI দিয়ে জেনারেট করা একটি মাইগ্রেশন স্ক্রিপ্ট স্টেজিংয়ে চালানোর পর দেখলে একটি JSONB কলামের কিছু ডাটা কেটে গেছে (Data Truncation)—কীভাবে ট্যাকল করবে?",
      m: "আমার তাৎক্ষণিক স্টেপস: (১) এই মাইগ্রেশন যাতে কোনো অবস্থাতেই প্রোডাকশনে না যায়, তার জন্য অবিলম্বে পিআর মার্জ ব্লক করে দেব। (২) স্টেজিং ডাটাবেজে কী পরিমাণ ডাটা কাটা গেছে তা আগের ব্যাকআপ স্ন্যাপশট ও বর্তমান স্কিমার মধ্যে `diff` চালিয়ে বের করব। (৩) মাইগ্রেশন ফাইলটি অডিট করে দেখব AI ভুলবশত টাইপ কাস্টিংয়ে `::json` বা স্কিমা টাইপ পরিবর্তন করেছিল যা নেস্টেড অবজেক্ট বাদ দিয়েছে। (৪) মাইগ্রেশনটি সংশোধন করে একটি নন-ডিস্ট্রাকটিভ ব্যাকফিল স্ক্রিপ্ট লিখব যা ডাটা অক্ষত রেখে মাইগ্রেট করে। (৫) একটি সিআই অটোমেটেড ডাটা-ইনটিগ্রিটি টেস্ট যোগ করব যা প্রতিটি মাইগ্রেশনের আগে-পরে রো কাউন্ট ও ফিল্ড সাইজ যাচাই করে।",
      b: "প্রোডাকশন মার্জ সাথে সাথে আটকে দিই। স্টেজিংয়ের ডাটা লস ব্যাকআপের সাথে তুলনা করে চিহ্নিত করি এবং নন-ডিস্ট্রাকটিভ উপায়ে মাইগ্রেশন স্ক্রিপ্ট নতুন করে লিখে ডাটা অক্ষত রাখি।",
      e: "Contain the divergence immediately: block the PR pipeline to isolate production. Diff staging database tables against pre-migration snapshots to isolate exact truncated fields. Audit the migration script to locate the invalid schema casting. Author a non-destructive migration script accompanied by a data backfill routine, and introduce automated schema regression tests verifying row integrity pre- and post-migration.",
      tip: "Block the PR immediately এবং Non-destructive backfill স্ক্রিপ্ট নিখুঁত পদক্ষেপ।"
    },
    {
      lvl: "situation",
      q: "কোম্পানির সিইও যদি জিজ্ঞেস করে: 'AI যখন এত দ্রুত কোড লিখে দিচ্ছে, তখন আমাদের দলে অভিজ্ঞ ইঞ্জিনিয়ারদের পেছনে এত বিনিয়োগ করার কী দরকার?'",
      m: "আমি মুচকি হেসে শান্তভাবে উত্তর দেব: 'AI কোড লিখতে পারে, কিন্তু কী কোড লিখতে হবে এবং কেন লিখতে হবে—তা সিদ্ধান্ত নিতে পারে না। একটি সফল সফটওয়্যার হলো ১০০টি সঠিক ব্যবসায়িক ট্রেড-অফের সমষ্টি—যেমন ডাটাবেজের ACID গ্যারান্টি, কাস্টমারের পেমেন্ট সিকিউরিটি, সার্ভারের স্কেলিং আর্কিটেকচার এবং ব্যবহারকারীর সাইকোলজি বোঝা। AI যদি ভুল পথে চালিত হয়, তবে সে সাধারণ ডেভেলপারের চেয়ে ১০ গুণ দ্রুত ভুল কোড ও সিকিউরিটি হোল তৈরি করে পুরো কোম্পানিকে ধ্বংস করে দিতে পারে। অভিজ্ঞ ইঞ্জিনিয়ার হলেন সেই দূরদর্শী ক্যাপ্টেন যিনি সঠিক আর্কিটেকচারাল দিকনির্দেশনা দেন এবং AI-কে দিয়ে নিখুঁত ফলাফল বের করে আনেন।' সিইও এটি শুনে কখনোই ভুলবে না।",
      b: "এআই দ্রুত কোড লিখতে পারে ঠিকই, কিন্তু সঠিক ব্যবসায়িক সিদ্ধান্ত, ডাটাবেজ নিরাপত্তা ও আর্কিটেকচার তৈরির জন্য অভিজ্ঞ ইঞ্জিনিয়ার অপরিহার্য। ভুল নির্দেশনায় এআই দ্রুত ভুল কোড বানিয়ে বড় বিপর্যয় ঘটাতে পারে, যা দক্ষ ইঞ্জিনিয়ার ছাড়া নিয়ন্ত্রণ সম্ভব নয়।",
      e: "AI accelerates keystrokes; experienced engineers govern system correctness, security, and business outcomes. Building durable enterprise software is about making continuous high-stakes trade-offs: database ACID boundaries, tenant data isolation, financial security, and operational resilience. Without seasoned engineers providing architectural guardrails, AI simply generates technical debt and security vulnerabilities at ten times the speed. Engineers are the architects; AI is the power tool.",
      tip: "AI accelerates keystrokes; Engineers govern correctness—যেকোনো এক্সিকিউটিভকে স্তব্ধ করে দেওয়ার মতো উত্তর।"
    },

    // --- REAL-WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা থেকে দেখাও কীভাবে তুমি Cursor ও Claude ব্যবহার করে Dokani POS-এর একটি জটিল ফিচার ৩ গুণ দ্রুত ডেলিভার করেছিলে?",
      m: "Dokani-তে যখন মাল্টি-ব্রাঞ্চ স্টক ট্রান্সফার ও ইনভেন্টরি ট্র্যাকিং ফিচারটি বানিয়েছিলাম: (১) আমি নিজে পেন-পেপার নিয়ে ডাটাবেজ স্কিমা ও ট্রানজেকশন স্টেট মেশিন আঁকলাম (Source Branch Decrement, In-Transit State, Destination Branch Increment)। (২) এরপর Cursor-এ প্রম্পট দিয়ে দ্রুত Prisma স্কিমা ও Zod ভ্যালিডেশন কোড বানিয়ে নিলাম (যা লিখতে ২ ঘণ্টা লাগত, তা হলো ৫ মিনিটে)। (৩) আমি নিজে PostgreSQL-এর রো-লেভেল ট্রানজেকশন কোড লিখলাম যাতে স্টক চুরি বা রেস কন্ডিশন না হয়। (৪) AI-কে দিয়ে বিভিন্ন ব্রাঞ্চের কনকারেন্ট রিকোয়েস্ট সিমুলেট করার ১০টি ইউনিট টেস্ট কেস ড্রাফট করালাম। ফলাফল: সাধারণ সময়ে ১ সপ্তাহ লাগার মতো জটিল ফিচার মাত্র ২ দিনে শতভাগ টেস্ট কভারেজ সহ লাইভে ডিপ্লয় করতে পেরেছিলাম।",
      b: "মাল্টি-ব্রাঞ্চ স্টক ট্রান্সফারের আর্কিটেকচার ও ডাটাবেজ ট্রানজেকশন নিজে ডিজাইন করে এআই দিয়ে দ্রুত প্রিজমা স্কিমা ও টেস্ট স্যুট তৈরি করে নিয়েছিলাম। ফলে এক সপ্তাহের জটিল কাজ মাত্র দুই দিনে শতভাগ সফলভাবে সম্পন্ন হয়েছিল।",
      e: "When architecting multi-branch inventory transfers in Dokani: I designed the state machine on paper (Source Decrement -> In-Transit -> Destination Increment); used Cursor to rapidly scaffold Prisma schemas and Zod mutation contracts in minutes; manually implemented the core PostgreSQL row-locking transaction logic to guarantee zero stock leakage; and used Claude to scaffold 10 edge-case unit tests. What historically required a week was delivered production-hardened in two days.",
      tip: "বাস্তব Dokani ফিচার এবং স্ক্যাফোল্ডিং বনাম ম্যানুয়াল লকিংয়ের বিভাজন বিশ্বমানের উদাহরণ।"
    },
    {
      lvl: "realworld",
      q: "সতর্কতাহীন ও ভুলে ভরা AI কোড যাতে গিটহাবে পুশ না হয়, তার জন্য তোমার লোকাল প্রি-কমিট ও সিআই গার্ড কনফিগারেশন কেমন?",
      m: "আমাদের লোকাল ও সিআই পাইপলাইনে ৪ স্তরের অটোমেটেড ফিল্টার রয়েছে: (১) **Husky & lint-staged:** গিট কমিট করামাত্র লোকাল মেশিনে স্বয়ংক্রিয়ভাবে Prettier ফরম্যাটিং এবং ESLint চলে যাতে কোনো কোটেশন বা সিনট্যাক্স এরর না থাকে। (২) **Strict TypeScript Check:** `tsc --noEmit` স্ক্রিপ্ট রান করে যা নিশ্চিত করে কোনো অস্তিত্বহীন টাইপ বা অলস `any` কোডে নেই। (৩) **Git Secrets Scan:** `trufflehog` দিয়ে স্ক্যান করে নিশ্চিত হয় কোনো এপিআই কি বা টোকেন কোডে নেই। (৪) **GitHub Actions CI:** পুল রিকোয়েস্ট ওপেন হওয়ামাত্র অটোমেটেড টেস্ট রান হয় এবং সবগুলো সবুজ না হওয়া পর্যন্ত মার্জ বাটন লক থাকে।",
      b: "হ্যাস্কি দিয়ে প্রি-কমিটে ফরম্যাটিং, টাইপস্ক্রিপ্ট কম্পাইলার চেক এবং সিক্রেট স্ক্যান বাধ্যতামূলক করেছি। গিটহাব অ্যাকশন্সে সব টেস্ট পাস না করা পর্যন্ত কোড মার্জ সম্পূর্ণ নিষিদ্ধ।",
      e: "Automated quality guardrails: Husky and lint-staged executing Prettier and ESLint on staged files pre-commit; automated `tsc --noEmit` validating zero type errors or rogue `any` escapes; Trufflehog scanning commits for embedded credentials; and GitHub Actions executing unit/integration suites, blocking merges on failing assertions.",
      code: "// package.json pre-commit scripts:\n\"scripts\": {\n  \"typecheck\": \"tsc --noEmit\",\n  \"lint\": \"eslint . --max-warnings=0\",\n  \"test\": \"jest --passWithNoTests\"\n}"
    },
    {
      lvl: "realworld",
      q: "কোনো জটিল সমস্যা বা ব্লকার সমাধানের পর ভবিষ্যতে একই সমস্যা যেন না ঘটে তার জন্য টিম নলেজ বেস কীভাবে ডকুমেন্ট করো?",
      m: "আমি বিশ্বাস করি: 'An undocumented bug is an invitation for it to recur'। সমস্যা ফিক্স হওয়ামাত্র আমি কোম্পানির Notion বা গিটহাব উইকিতে ৩ মিনিটের একটি পোস্ট লিখি: (১) **Symptom:** বাগটি ঠিক কী লক্ষণ দেখাচ্ছিল। (২) **Root Cause:** আসল কারণ কী ছিল (যেমন: Nginx ওয়েবসকেট আপগ্রেড মিসিং)। (৩) **The Fix:** সমাধানের কমান্ড বা কোড স্ন্যাপশট। (৪) **Searchable Keywords:** এমন কিছু কি-ওয়ার্ড দিয়ে রাখি যাতে ভবিষ্যতে অন্য কোনো ইঞ্জিনিয়ার স্ল্যাকে বা নশনে সার্চ দিলেই প্রথম ক্লিকে সমাধান পেয়ে যায়। এটি পুরো ইঞ্জিনিয়ারিং টিমের যৌথ বুদ্ধিমত্তা বহুগুণ বৃদ্ধি করে।",
      b: "সমস্যা সমাধানের পর নশন বা গিটহাব উইকিতে বাগটির লক্ষণ, মূল কারণ এবং সমাধানের কোড লিখে রাখি যাতে ভবিষ্যতে যে কেউ সার্চ করে তাৎক্ষণিক সমাধান খুঁজে পায়।",
      e: "I document post-blocker resolutions in Notion or GitHub Wikis: documenting the observed symptom, the technical root cause, the exact configuration/code snippet fix, and searchable error string tags. Institutionalizing institutional knowledge eliminates duplicate investigative labor across the team.",
      tip: "Institutional knowledge তৈরি করার অভ্যাস প্রমাণ করে তুমি টিম-প্লেয়ার ও লিডার।"
    },
    {
      lvl: "realworld",
      q: "AI-এর সাথে পেয়ার প্রোগ্রামিং বনাম মানুষের সাথে পেয়ার প্রোগ্রামিং—কখন কোনটি ব্যবহার করা সবচেয়ে কার্যকর?",
      m: "দুটোর উদ্দেশ্য সম্পূর্ণ আলাদা: (১) **AI Pair Programming:** যখন আমি একাকী দ্রুত কোডিং করছি, সিনট্যাক্স খুঁজছি, বয়লারপ্লেট লিখছি বা টেস্ট কেস বানাচ্ছি—তখন AI অতুলনীয় গতি দেয়। (২) **Human Pair Programming:** যখন নতুন কোনো জটিল সিস্টেম আর্কিটেকচার ডিজাইন করছি, কঠিন প্রোডাকশন আউটেজ ডিবাগ করছি, কিংবা জুনিয়র সতীর্থকে অনবোর্ডিং করাচ্ছি—তখন মানুষের সাথে মুখোমুখি বসা জরুরি। মানুষ সহানুভূতি, ব্যবসায়িক প্রজ্ঞা এবং গভীর অভিজ্ঞতা নিয়ে আসে যা কোনো অ্যালগরিদম দিতে পারে না। উভয় মাধ্যমের ভারসাম্যপূর্ণ ব্যবহারই সেরা ফলাফল আনে।",
      b: "দ্রুত কোডিং, সিনট্যাক্স তৈরি ও টেস্ট লেখার জন্য এআই সেরা। কিন্তু জটিল আর্কিটেকচার ডিজাইন, বড় আউটেজ সমাধান ও মেন্টরিংয়ের জন্য মানুষের সাথে আলোচনা সবচেয়ে কার্যকর।",
      e: "AI pair programming excels at tactical throughput: syntax exploration, boilerplate generation, and edge-case unit test drafting. Human pair programming excels at strategic complexity: high-stakes architectural design, mission-critical incident triage, and empathetic mentorship. High-leverage engineers orchestrate both seamlessly.",
      tip: "Tactical throughput (AI) vs Strategic complexity (Human) নিখুঁত তুলনা।"
    },
    {
      lvl: "realworld",
      q: "সারাদিনের সফটওয়্যার ইঞ্জিনিয়ারিং ডেলিভারি ও কাজের স্বচ্ছতা সর্বোচ্চ রাখতে তোমার পার্সোনাল প্রোডাক্টিভিটি সিস্টেম কেমন?",
      m: "আমার পার্সোনাল সিস্টেম অত্যন্ত নিয়মতান্ত্রিক: (১) প্রতিদিন সকালে ১৫ মিনিট দিনের ৩টি প্রধান লক্ষ্য (P0 Deliverables) ঠিক করি। (২) গিটহাবে প্রতিটি টাস্কের জন্য ছোট ছোট ফিচার ব্রাঞ্চ তৈরি করি এবং কাজের অগ্রগতি অনুযায়ী ঘন ঘন অর্থপূর্ণ কমিট দিই (`feat:`, `fix:`, `refactor:`)। (৩) কাজের ফাঁকে ফাঁকে স্ল্যাক চ্যানেলে সংক্ষিপ্ত প্রগ্রেস আপডেট দিই যাতে টিম লিড সবসময় জানতে পারে কাজ কোন পর্যায়ে আছে। (৪) দিন শেষে যা কিছু ডেলিভার হলো তা ড্যাশবোর্ডে মার্ক করি এবং পরের দিনের জন্য ফ্রেশ তালিকা প্রস্তুত করে ল্যাপটপ বন্ধ করি। এই ডিসিপ্লিনের কারণে কোনো কাজ কখনো ঝুলে থাকে না।",
      b: "প্রতিদিন সকালে প্রধান কাজগুলো চিহ্নিত করি, ছোট ছোট ফিচার ব্রাঞ্চে পরিচ্ছন্ন গিট কমিট দিই এবং নিয়মিত স্ল্যাকে আপডেট দিয়ে কাজের পূর্ণ স্বচ্ছতা নিশ্চিত করি। সুশৃঙ্খল রুটিনই কাজের সেরা ফলাফল এনে দেয়।",
      e: "My productivity protocol: identify top 3 P0 engineering objectives at dawn; execute development on decoupled Git feature branches with disciplined conventional commits (`feat:`, `fix:`, `refactor:`); broadcast brief async progress updates on Slack to maintain operational alignment; and conduct an end-of-day checkpoint to close completed issues and set up the next sprint horizon.",
      tip: "Conventional commits এবং Decoupled feature branches শৃঙ্খলা ও অভিজ্ঞতার চূড়ান্ত প্রতিফলন।"
    }
  ]
};
