// Topic 8: Production Monitoring, Environment Variables & Backup Recovery (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "prod-monitoring-backup",
  name: "Production Monitoring, Secrets & Disaster Recovery",
  desc: "Sentry Error Tracking, Prometheus & Grafana, Winston/Pino Logging, .env Security & Secret Vaults, Automated S3 Backups, Incident Runbooks",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Production Monitoring কী এবং শুধু 'সাইট চলছে কি না' দেখার চেয়ে ডিপ অ্যাপ্লিকেশন অবজারভেবিলিটি (Observability) কেন জরুরি?",
      m: "শুধু পিং করে সাইট আপ দেখা যথেষ্ট নয়—কারণ সাইট লাইভ থাকতে পারে কিন্তু ভেতরে ডাটাবেজ স্লো হয়ে পেমেন্ট প্রসেসিং আটকে থাকতে পারে বা ইউজাররা ভেতরের পাতায় 500 এরর পেতে পারে! Observability ৩টি প্রধান স্তম্ভের সমন্বয়ে কাজ করে (M.E.L): (১) `Metrics`: রিকোয়েস্ট রেট, সিপিইউ, র‍্যাম এবং p99 ল্যাটেন্সি ট্র্যাক করা। (২) `Events/Errors`: কোন এপিআইতে ঠিক কোন লাইনে এক্সেপশন থ্রো করেছে তা ট্রেস করা (Sentry)। (৩) `Logs`: প্রতিটি রিকোয়েস্টের টাইমস্ট্যাম্পযুক্ত বিস্তারিত হিস্ট্রি (Structured JSON Logs)। এটি কোনো গ্রাহক অভিযোগ করার আগেই যেকোনো সূক্ষ্ম সমস্যা তাৎক্ষণিকভাবে শনাক্ত করতে সাহায্য করে।",
      b: "পর্যবেক্ষণযোগ্যতা (Observability) ৩টি বিষয়ের ওপর দাঁড়িয়ে: মেট্রিক্স (সিপিইউ, র‍্যাম, গতি), এররস (কোথায় কী ত্রুটি হলো), এবং লগস (বিস্তারিত রেকর্ড)। গ্রাহক জানানোর আগেই ভেতরের ত্রুটি শনাক্ত করতে এটি অপরিহার্য।",
      e: "Observability transcends basic uptime pings, encompassing the Three Pillars: Metrics (CPU, memory, throughput, p99 latency), Errors (real-time stack traces via Sentry), and Logs (structured contextual JSON telemetry). This enables proactive triage of silent degradation before end users are impacted.",
      tip: "বলো: 'The 3 pillars of observability are Metrics, Events/Errors, and Logs (M.E.L).'"
    },
    {
      lvl: "lvl1",
      q: "Sentry কী এবং প্রোডাকশন নোড ও রিয়্যাক্ট অ্যাপ্লিকেশনে এরর ট্র্যাকিংয়ে এটি কীভাবে সাহায্য করে?",
      m: "Sentry হলো আধুনিক প্রোডাকশন অ্যাপ্লিকেশনের শীর্ষস্থানীয় রিয়েল-টাইম এরর ট্র্যাকিং ও পারফরম্যান্স মনিটরিং প্ল্যাটফর্ম। সুবিধা: (১) অ্যাপ্লিকেশনে কোনো আনহ্যান্ডেল্ড এক্সেপশন ঘটা মাত্রই Sentry স্বয়ংক্রিয়ভাবে পুরো কল স্ট্যাক (Stack Trace), ইউজারের ব্রাউজার/ডিভাইস তথ্য এবং এরর ঘটার আগের ৫টি পদক্ষেপ (Breadcrumbs) ক্যাপচার করে। (২) সোর্স ম্যাপ (Source Maps) আপলোড করলে মিনারেলাইজড কোডের বদলে মূল TypeScript কোডের সঠিক লাইন নম্বর প্রদর্শন করে। (৩) স্ল্যাক বা ইমেইলে অ্যালার্ট পাঠায় এবং একই ধরনের এররকে গ্রুপ করে ডুপ্লিকেশন কমায়।",
      b: "সেন্ট্রি হলো এরর ট্র্যাকিং প্ল্যাটফর্ম যা প্রোডাকশনে কোনো বাগ ঘটার সাথে সাথে ঠিক কোন লাইনে কী ভুল হয়েছে এবং আগের কী কী পদক্ষেপ ছিল তা বিস্তারিত রেকর্ড করে স্ল্যাকে নোটিফিকেশন পাঠায়।",
      e: "Sentry provides real-time error tracking and performance profiling across Node.js and React. Upon an unhandled exception, Sentry captures the complete execution stack trace, system context, user breadcrumbs, and de-obfuscates minified bundles using source maps for instant bug resolution.",
      code: "import * as Sentry from '@sentry/node';\nSentry.init({\n  dsn: process.env.SENTRY_DSN,\n  tracesSampleRate: 1.0,\n  environment: process.env.NODE_ENV\n});"
    },
    {
      lvl: "lvl1",
      q: "Node.js অ্যাপ্লিকেশনে প্লেইন `console.log`-এর বদলে Winston বা Pino দিয়ে Structured JSON Logging কেন ব্যবহার করা উচিত?",
      m: "প্লেইন `console.log` সাধারণ স্ট্রিং প্রিন্ট করে যা সিঙ্ক্রোনাস এবং উচ্চ ট্রাফিকে ইভেন্ট লুপকে মারাত্মক স্লো করে দেয়। এছাড়া স্ট্রিং লগ দিয়ে কোনো ড্যাশবোর্ডে সার্চ বা ফিল্টার করা যায় না। `Pino` বা `Winston` হলো অত্যন্ত দ্রুতগতির অ্যাসিনক্রোনাস লগার যা স্ট্রাকচার্ড JSON ফরম্যাটে লগ লেখে: `{\"level\":\"error\",\"time\":\"2026-10-08T10:00:00Z\",\"userId\":\"u1\",\"message\":\"Payment failed\",\"duration\":120}`। JSON লগ হওয়ায় Datadog, Grafana Loki বা CloudWatch অনায়াসে এই লগ পার্স করে মুহূর্তের মধ্যে ফিল্টার, গ্রাফ এবং অটোমেটেড অ্যালার্ট তৈরি করতে পারে।",
      b: "console.log সিঙ্ক্রোনাস হওয়ায় অ্যাপ স্লো করে। Pino বা Winston অ্যাসিনক্রোনাসভাবে স্ট্রাকচার্ড JSON ফরম্যাটে লগ লিখে, যা গ্রাফানা বা সেন্ট্রালাইজড মনিটরিং সিস্টেমে সহজে সার্চ ও ফিল্টার করা যায়।",
      e: "console.log is synchronous, blocks the Node.js event loop under high load, and outputs unstructured text strings that cannot be parsed by log aggregators. Pino outputs asynchronous, high-performance structured JSON payloads that ingestion engines (Grafana Loki, Datadog) can query, index, and alert on.",
      code: "import pino from 'pino';\nexport const logger = pino({\n  level: process.env.LOG_LEVEL || 'info',\n  timestamp: pino.stdTimeFunctions.isoTime\n});"
    },
    {
      lvl: "lvl1",
      q: "প্রোডাকশন এনভায়রনমেন্ট ভ্যারিয়েবল (.env) সংরক্ষণে কী কী নিরাপত্তা সতর্কতা অবলম্বন করতে হয়?",
      m: "সিকিউরিটি রুলস: (১) `.env` ফাইল কখনোই, কোনো অবস্থাতেই Git রিপোজিটরিতে কমিট বা পুশ করা যাবে না (`.gitignore`-এ `.env` থাকা বাধ্যতামূলক)। (২) প্রোডাকশন সার্ভারে `.env` ফাইলের লিনাক্স পারমিশন কঠোরভাবে `chmod 600 .env` রাখতে হবে (যাতে শুধুমাত্র ফাইলের মালিক ইউজার ছাড়া অন্য কেউ পড়তে না পারে)। (৩) ডেভেলপারদের পার্সোনাল কম্পিউটারে কোনো প্রোডাকশন সিক্রেট দেওয়া যাবে না। (৪) এনভায়রনমেন্ট ভ্যারিয়েবল লোড করার সময় Zod বা Envalid দিয়ে টাইপ-ভ্যালিডেশন করা যাতে কোনো সিক্রেট মিসিং থাকলে অ্যাপ সাথে সাথে সতর্ক করে বন্ধ হয়।",
      b: ".env ফাইল গিটহাবে পুশ করা সম্পূর্ণ নিষিদ্ধ। সার্ভারে chmod 600 দিয়ে পারমিশন লক রাখতে হয় এবং কোনো ভ্যারিয়েবল মিসিং যেন না থাকে সেজন্য Zod দিয়ে অ্যাপ শুরুর সময় ভ্যালিডেট করতে হয়।",
      e: "Production .env files must remain untracked in Git (.gitignore), locked on Linux filesystems with strict chmod 600 permissions restricted to the execution user, and validated at application bootstrap using Zod or Envalid to halt execution if required secrets are unpopulated.",
      code: "import { z } from 'zod';\nconst envSchema = z.object({\n  DATABASE_URL: z.string().url(),\n  JWT_SECRET: z.string().min(32),\n  PORT: z.coerce.number().default(5000)\n});\nexport const ENV = envSchema.parse(process.env);"
    },
    {
      lvl: "lvl1",
      q: "Uptime Monitoring (যেমন UptimeRobot, BetterStack) কীভাবে কাজ করে এবং Heartbeat Check কী?",
      m: "Uptime Monitor হলো একটি বাইরের ক্লাউড সার্ভিস যা প্রতি ১ বা ৫ মিনিট পর পর আপনার সার্ভারের পাবলিক হেলথ এন্ডপয়েন্টে (`GET /api/health`) HTTP রিকোয়েস্ট পাঠায়। যদি সার্ভিসটি পরপর ২ বার 200 OK না পেয়ে টাইমআউট বা 500 এরর পায়, তবে মনিটর তৎক্ষণাৎ অন-কল ইঞ্জিনিয়ারদের ফোনে SMS, ফোন কল বা স্ল্যাক অ্যালার্ট পাঠায়। `Heartbeat Check (Dead Man's Snitch)` হলো এর বিপরীত: কোনো ব্যাকগ্রাউন্ড ক্রন জব সফলভাবে শেষ হলে সে নিজে ওই মনিটরিং এপিআইতে একটি পিং পাঠায়। যদি নির্দিষ্ট সময় (যেমন ২৪ ঘণ্টা) পার হওয়ার পরও কোনো পিং না আসে, মনিটর বুঝে নেয় ক্রন জবটি ফেইল করেছে এবং সাথে সাথে অ্যালার্ট ফায়ার করে।",
      b: "আপটাইম মনিটর প্রতি মিনিটে সার্ভারের হেলথ চেক করে এবং সাইট ডাউন হলে তাৎক্ষণিক এসএমএস বা স্ল্যাকে অ্যালার্ট পাঠায়। আর হার্টবিট চেক ব্যাকগ্রাউন্ড ক্রন জব সফলভাবে সম্পন্ন হয়েছে কি না তা নিশ্চিত করে।",
      e: "An external Uptime Monitor periodically pings an endpoint (GET /health) from distributed locations, firing SMS or Slack alerts upon consecutive non-200 responses. A Heartbeat Check monitors scheduled background jobs: the cron script curls an endpoint upon completion; missing a expected heartbeat triggers a failure alert.",
      tip: "বলো: 'Uptime checks monitor inbound service availability; heartbeats monitor outbound cron job completion.'"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Prometheus এবং Grafana কীভাবে কাজ করে এবং নোড অ্যাপ্লিকেশনের মেট্রিক্স কীভাবে স্ক্র্যাপ করে?",
      m: "(১) `Prometheus`: একটি টাইম-সিরিজ ডেটাবেজ যা পুল-মডেল (Pull/Scraping) অনুসরণ করে। নোড অ্যাপ্লিকেশনে `prom-client` লাইব্রেরি দিয়ে একটি লোকাল এন্ডপয়েন্ট তৈরি করি (`/metrics`) যা রিয়েলটাইমে মেমোরি, ইভেন্ট লুপ ল্যাগ ও রিকোয়েস্ট রেট এক্সপোজ করে। Prometheus প্রতি ১৫ সেকেন্ড পর পর এই এন্ডপয়েন্ট স্ক্র্যাপ করে ডেটা নিজের টাইম-সিরিজ ডিবিতে জমা করে। (২) `Grafana`: প্রমিথিউসের সাথে কানেক্ট হয়ে আকর্ষণীয় ভিজ্যুয়াল ড্যাশবোর্ড তৈরি করে—যেখানে p95 ল্যাটেন্সি, রিকোয়েস্ট পার সেকেন্ড (RPS), এবং এরর পার্সেন্টেজ লাইভ গ্রাফে প্রদর্শিত হয় এবং থ্রেশহোল্ড অতিক্রম করলে অটো-অ্যালার্ট পাঠায়।",
      b: "প্রমিথিউস প্রতি ১৫ সেকেন্ড পর পর অ্যাপ্লিকেশনের /metrics এন্ডপয়েন্ট থেকে ডেটা স্ক্র্যাপ করে সংরক্ষণ করে। আর গ্রাফানা সেই ডেটা দিয়ে লাইভ ড্যাশবোর্ড ও গ্রাফ তৈরি করে সিস্টেমের স্বাস্থ্য প্রদর্শন করে।",
      e: "Prometheus implements a pull-based architecture, periodically scraping metrics exposed by prom-client over a protected /metrics route. Grafana visualizes these time-series queries via PromQL, displaying real-time gauges for CPU, memory, RPS throughput, and p99 latency distributions.",
      code: "import client from 'prom-client';\nconst collectDefaultMetrics = client.collectDefaultMetrics;\ncollectDefaultMetrics({ register: client.register });\napp.get('/metrics', async (req, res) => {\n  res.set('Content-Type', client.register.contentType);\n  res.end(await client.register.metrics());\n});"
    },
    {
      lvl: "lvl2",
      q: "লগিংয়ে সংবেদনশীল ডেটা মাস্কিং (PII Masking / Sanitization): কেন পাসওয়ার্ড, ক্রেডিট কার্ড বা টোকেন লগে প্রিন্ট হওয়া নিষিদ্ধ এবং কীভাবে মাস্ক করবে?",
      m: "লগ ফাইল সাধারণত একাধিক ইঞ্জিনিয়ার পড়তে পারে বা ক্লাউড লগ ম্যানেজমেন্ট সিস্টেমে সংরক্ষিত থাকে। যদি লগে ইউজারের পাসওয়ার্ড, ক্রেডিট কার্ড নম্বর বা JWT টোকেন প্লেইন-টেক্সটে প্রিন্ট হয়, তবে এটি PCI-DSS এবং GDPR আইনের মারাত্মক লঙ্ঘন এবং সিস্টেম হ্যাক হলে সব তথ্য ফাঁস হয়ে যাবে! সমাধান: Pino বা Winston-এ 'Redaction' বা ফিল্টারিং প্লাগইন কনফিগার করা। আমরা নির্দিষ্ট ফিল্ড পাথ বেঁধে দিই: `redact: ['req.headers.authorization', 'password', 'creditCard', 'refreshToken']`। লগার স্বয়ংক্রিয়ভাবে এই ফিল্ডগুলোর আসল মান প্রতিস্থাপন করে `[REDACTED]` লিখে দেয়।",
      b: "পাসওয়ার্ড বা ক্রেডিট কার্ডের তথ্য লগে লেখা আইনত দণ্ডনীয় ও মারাত্মক ঝুঁকিপূর্ণ। Pino বা Winston-এর redact কনফিগারেশন দিয়ে সংবেদনশীল ফিল্ডগুলো স্বয়ংক্রিয়ভাবে [REDACTED] দিয়ে মাস্ক করে নিরাপদে লগ করতে হয়।",
      e: "Logging Personally Identifiable Information (PII), raw passwords, or authorization tokens violates PCI-DSS and GDPR regulations. Configure automated log redaction in Pino/Winston (redact: ['password', 'req.headers.authorization']), sanitizing sensitive attributes into '[REDACTED]' before persistence.",
      code: "const logger = pino({\n  redact: {\n    paths: ['password', 'pin', 'token', 'req.headers.authorization'],\n    censor: '[REDACTED]'\n  }\n});"
    },
    {
      lvl: "lvl2",
      q: "Secret Management Services: Doppler, HashiCorp Vault বা AWS Secrets Manager কীভাবে লোকাল `.env` ফাইলের বিশৃঙ্খলা দূর করে?",
      m: "ম্যানুয়ালি প্রতিটি সার্ভারে ঢুকে `.env` ফাইল কপি-পেস্ট করা অত্যন্ত অনিরাপদ ও বিশৃঙ্খল (কোন সার্ভারে কোন ভার্সনের সিক্রেট আছে তা ট্র্যাক করা যায় না)। Secret Manager প্ল্যাটফর্মগুলো (যেমন Doppler বা Vault) একটি সেন্ট্রালাইজড এনক্রিপ্টেড ভল্ট সরবরাহ করে: (১) সমস্ত প্রোডাকশন ও স্টেজিং সিক্রেট একটি সুরক্ষিত ড্যাশবোর্ডে সংরক্ষিত থাকে এবং কে কখন কি পরিবর্তন করেছে তার সম্পূর্ণ অডিট ট্রেইল থাকে। (২) সার্ভারে কোনো ফিজিক্যাল `.env` ফাইল রাখার দরকার হয় না; অ্যাপ বুট হওয়ার সময় CLI দিয়ে মেমোরিতে সিক্রেট ফেচ করে রান করে: `doppler run -- pm2 start ...`। (৩) এক ক্লিকে সিক্রেট রোটেট করা যায় এবং সমস্ত সার্ভারে নিমেষে সিনক্রোনাইজ হয়ে যায়।",
      b: "Doppler বা Vault দিয়ে এক জায়গা থেকে সমস্ত সার্ভারের সিক্রেট নিরাপদে পরিচালিত হয়। সার্ভারে কোনো .env ফাইল না রেখেই মেমোরিতে সিক্রেট লোড করা যায় এবং অডিট লগ সহ সহজেই পাসওয়ার্ড রোটেট করা সম্ভব হয়।",
      e: "Copy-pasting local .env files manually introduces configuration drift and security leaks. Secrets Managers (Doppler, HashiCorp Vault, AWS Secrets Manager) centralize encrypted configurations with granular RBAC and audit logging, injecting secrets directly into process memory via CLI wrappers (doppler run) without writing files to disk.",
      tip: "বলো: 'Doppler or Vault injects secrets directly into process memory without writing persistent plaintext .env files to disk.'"
    },
    {
      lvl: "lvl2",
      q: "Sentry Performance Monitoring এবং Tracing: কীভাবে একটি নির্দিষ্ট স্লো এপিআই রিকোয়েস্টের ডেটাবেজ কোয়েরি বোতলনেক শনাক্ত করবে?",
      m: "Sentry Performance Tracing প্রতিটি ইনকামিং HTTP রিকোয়েস্টের জন্য একটি 'Transaction' তৈরি করে এবং তার ভেতরের প্রতিটি সাব-অপারেশনকে (যেমন Express Middleware, Prisma Query, Redis Call, External HTTP Call) ছোট ছোট 'Spans'-এ ভাগ করে। ড্যাশবোর্ডে আমরা একটি ওয়াটারফল চার্ট দেখতে পাই: রিকোয়েস্টটি মোট ৮০০ মিলিসেকেন্ড সময় নিয়েছে, যার মধ্যে মিডলওয়্যার নিয়েছে ১০ms, নোড কোড নিয়েছে ২০ms, কিন্তু একটি নির্দিষ্ট আন-ইনডেক্সড Prisma ডেটাবেজ কুয়েরি একা নিয়েছে ৭৭০ মিলিসেকেন্ড! সেকেন্ডের মধ্যে নিশ্চিত হওয়া যায় পারফরম্যান্স সমস্যার মূল কারণ কোথায়।",
      b: "সেন্ট্রি পারফরম্যান্স ট্রেসিং ওয়াটারফল গ্রাফ দিয়ে প্রতিটি এপিআই রিকোয়েস্টের কোন অংশ (মিডলওয়্যার, নোড কোড নাকি ডাটাবেজ কুয়েরি) কত সময় নিয়েছে তা নিখুঁতভাবে প্রদর্শন করে বোতলনেক ধরিয়ে দেয়।",
      e: "Sentry Performance Tracing segments transactions into granular hierarchical Spans (Express middleware, database queries, Redis calls). Viewing the transaction waterfall trace immediately exposes whether latency stems from application compute or unindexed SQL execution.",
      code: "import * as Sentry from '@sentry/node';\n// Automatically instruments Express and Prisma queries to capture distributed traces"
    },
    {
      lvl: "lvl2",
      q: "Production Crash Alerting: স্ল্যাক এবং পেজারডিউটিতে ফলস-পজিটিভ অ্যালার্ট (Alert Fatigue) কীভাবে রোধ করবে?",
      m: "যদি প্রতিবার একটি সাধারণ 404 Not Found বা ছোটখাটো ইউজার ভ্যালিডেশন এররের জন্য স্ল্যাকে নোটিফিকেশন বাজে, তবে ডেভেলপাররা নোটিফিকেশন মিউট করে দেবে (Alert Fatigue)—যার ফলে বড় কোনো ডাউনটাইমের আসল অ্যালার্টও চোখ এড়িয়ে যাবে! প্রিভেনশন রুলস: (১) শুধুমাত্র `5xx Server Errors` এবং `Unhandled Exceptions`-এ অ্যালার্ট পাঠানো। (২) থ্রেশহোল্ড ডিফাইন করা: বিচ্ছিন্ন ১টি এররে অ্যালার্ট না পাঠিয়ে 'যদি ৫ মিনিটে ১০টির বেশি 500 এরর আসে' তবেই স্ল্যাকে পিং করা। (৩) প্রায়োরিটি লেভেল নির্ধারণ: সাধারণ এরর সাধারণ চ্যানেলে যাবে, আর ক্রিটিক্যাল ডেটাবেজ ক্র্যাশে পেজারডিউটি দিয়ে অন-কল ইঞ্জিনিয়ারের ফোনে সরাসরি কল বা সাইরেন বাজবে।",
      b: "প্রতিটি ছোটখাটো এররে নোটিফিকেশন দিলে অ্যালার্ট ফ্যাটিগ তৈরি হয়। শুধুমাত্র ৫xx সার্ভার এরর এবং নির্দিষ্ট থ্রেশহোল্ড (৫ মিনিটে ১০টি এরর) অতিক্রম করলেই জরুরি অ্যালার্ট পাঠানোর নিয়ম করতে হবে।",
      e: "Alert Fatigue occurs when chat channels are flooded with low-priority telemetry, causing teams to ignore genuine outages. Prevent this by filtering out expected 4xx client errors, setting rate-spike trigger thresholds (e.g. >10 errors in 5 minutes), and reserving high-urgency PagerDuty pages exclusively for P1 service outages.",
      tip: "বলো: 'Filter 4xx errors and configure rate-spike thresholds to prevent Alert Fatigue.'"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Automated Off-site Database Backup Pipeline: এনক্রিপশন, কম্প্রেশন ও মাল্টি-ক্লাউড রেপ্লিকেশন সহ প্রোডাকশন ব্যাশ আর্কিটেকচার কীভাবে ডিজাইন করবে?",
      m: "একটি প্রোডাকশন ব্যাকআপ স্ক্রিপ্টের এন্টারপ্রাইজ ধাপসমূহ: (১) `Dump & Stream`: `pg_dump -Fc` দিয়ে কাস্টম ফরম্যাটে বাইনারি ডাম্প নেওয়া। (২) `Compression`: `pigz` (প্যারালাল জিপ) দিয়ে দ্রুত কম্প্রেস করা। (৩) `At-Rest Encryption`: `gpg --symmetric --cipher-algo AES256` দিয়ে শক্তিশালী পাসফ্রেজ দিয়ে ফাইলটি এনক্রিপ্ট করা যাতে ক্লাউড স্টোরেজে ফাইল চুরি হলেও কেউ ডেটা পড়তে না পারে। (৪) `Multi-Cloud Upload`: ফাইলটি প্রাইমারি স্টোরেজ (AWS S3) এবং সেকেন্ডারি প্রোভাইডার (Cloudflare R2 বা Backblaze B2)-এ আপলোড করা। (৫) `Integrity Verification`: ডাম্প ফাইলের সাইজ ও SHA256 চেকসাম যাচাই করা। (৬) স্ল্যাক ওয়েবহুকে সাকসেস রিপোর্ট এবং ড্যাশবোর্ডে হার্টবিট পিং পাঠানো।",
      b: "এন্টারপ্রাইজ ব্যাকআপ পাইপলাইনে pg_dump নিয়ে AES256 দিয়ে এনক্রিপ্ট করা হয় এবং AWS S3 ও Cloudflare R2 উভয়ে ব্যাকআপ পাঠানো হয়। ফাইল সাইজ ও চেকসাম ভ্যালিডেট করে স্ল্যাকে রিপোর্ট পাঠানো হয়।",
      e: "An enterprise off-site backup pipeline captures pg_dump streams, parallel-compresses via pigz, symmetrically encrypts via AES-256 (GPG), replicates to dual independent cloud targets (AWS S3 + Cloudflare R2), asserts SHA256 checksums, and pings a dead-man's heartbeat monitor.",
      code: "#!/usr/bin/env bash\nset -euo pipefail\nFILE=\"/tmp/db_$(date +%Y%m%d_%H%M%S).dump.enc\"\npg_dump -Fc -U postgres dokani_db | gpg --batch --symmetric --passphrase \"$BACKUP_KEY\" -o \"$FILE\"\naws s3 cp \"$FILE\" s3://dokani-vault-primary/\nrclone copy \"$FILE\" b2:dokani-vault-replica/\nrm -f \"$FILE\"\ncurl -fsS --retry 3 https://hc-ping.com/YOUR-UUID"
    },
    {
      lvl: "lvl3",
      q: "Production Incident Management & Post-Mortem: প্রোডাকশন ডাউনটাইম রিকভারির পর ব্লেইমলেস পোস্ট-মর্টেম (Blameless Post-Mortem) কীভাবে পরিচালনা করবে?",
      m: "ব্লেইমলেস পোস্ট-মর্টেমের মূল দর্শন হলো: কোনো নির্দিষ্ট ব্যক্তির ওপর দোষ চাপানো যাবে না, কারণ সিস্টেম ডিজাইন এমন হওয়া উচিত ছিল যাতে একজন মানুষের সাধারণ ভুলের কারণে পুরো প্রোডাকশন ডাউন না হয়! পোস্ট-মর্টেম ডকুমেন্টের মূল সেকশনসমূহ: (১) `Summary`: কী ঘটেছিল, কখন শুরু হয়েছিল এবং মোট ডাউনটাইম কত মিনিট ছিল। (২) `Impact`: কতজন কাস্টমার বা ট্রানজ্যাকশন ক্ষতিগ্রস্ত হয়েছিল। (৩) `Timeline`: ঘটনার শুরু থেকে রিকভারি পর্যন্ত প্রতি মিনিটের ক্রমানুসারে ঘটনা প্রবাহ। (৪) `Root Cause Analysis (5 Whys)`: কেন ঘটল তার গভীর কারণ খুঁজে বের করা। (৫) `Action Items`: ভবিষ্যতে যেন একই ঘটনা আর কখনো না ঘটে তার জন্য সুনির্দিষ্ট দায়িত্ব সহ প্রিভেনশন টাস্ক লিস্ট তৈরি করা।",
      b: "ব্লেইমলেস পোস্ট-মর্টেমে কাউকে দোষারোপ না করে সিস্টেমের দুর্বলতা খোঁজা হয়। ঘটনার টাইমলাইন, ইমপ্যাক্ট, 5 Whys রুট কজ অ্যানালাইসিস এবং ভবিষ্যতে পুনরাবৃত্তি ঠেকাতে অ্যাকশন আইটেম নির্ধারণ করা হয়।",
      e: "A Blameless Post-Mortem investigates outages without finger-pointing, focusing on systemic engineering resilience. The report documents: Outage Summary, Business Impact, chronological Incident Timeline, Root Cause Analysis using the 5 Whys, and actionable preventative JIRA tickets with assigned owners.",
      tip: "ইন্টারভিউতে 'Blameless culture and 5-Whys Root Cause Analysis' উল্লেখ করা হাই-লেভেল ইঞ্জিনিয়ারিং পরিপক্বতা প্রকাশ করে।"
    },
    {
      lvl: "lvl3",
      q: "Golden Signals of Monitoring (Google SRE): গুগল এসআরই বইয়ের ৪টি গোল্ডেন সিগন্যাল কী কী এবং কীভাবে ট্র্যাক করবে?",
      m: "গুগল এসআরই (Site Reliability Engineering)-এর ৪টি গোল্ডেন সিগন্যাল: (১) `Latency`: রিকোয়েস্ট প্রসেস করতে কত সময় লাগছে (বিশেষ করে সফল বনাম ব্যর্থ রিকোয়েস্টের ল্যাটেন্সি পার্থক্য)। (২) `Traffic`: সিস্টেমে কতটা ডিমান্ড বা লোড আসছে (যেমন ওয়েব এপিআইতে HTTP Requests Per Second)। (৩) `Errors`: ইনকামিং রিকোয়েস্টের মধ্যে কত শতাংশ রিকোয়েস্ট ফেইল করছে (যেমন HTTP 500 রেট বা ডেটাবেজ এক্সেপশন রেট)। (৪) `Saturation`: সিস্টেমের হার্ডওয়্যার রিসোর্সগুলোর ধারণক্ষমতা কতটা পূর্ণ হয়েছে (যেমন সিপিইউ কোর স্যাচুরেশন, মেমোরি এবং ডেটাবেজ কানেকশন পুল ফুল হয়ে কিউতে জট পাকা)। যেকোনো ড্যাশবোর্ডে সবার প্রথমে এই ৪টি মেট্রিক্স থাকা বাধ্যতামূলক।",
      b: "গুগল এসআরই-র ৪টি গোল্ডেন সিগন্যাল: ল্যাটেন্সি (সময়কাল), ট্রাফিক (কাজের চাপ), এররস (ব্যর্থতার হার), এবং স্যাচুরেশন (রিসোর্স কতটা পূর্ণ)। এই ৪টি মেট্রিক্স সার্ভারের সামগ্রিক অবস্থা নিখুঁতভাবে প্রকাশ করে।",
      e: "Google SRE's Four Golden Signals: Latency (time taken to service requests), Traffic (demand placed on the system, e.g. RPS), Errors (rate of failed requests, e.g. HTTP 5xx), and Saturation (fraction of constrained resources utilized, e.g. memory/connection pool queue depth).",
      tip: "বলো: 'Google SRE's 4 Golden Signals are Latency, Traffic, Errors, and Saturation (L.T.E.S).'"
    },
    {
      lvl: "lvl3",
      q: "Production Secret Rotation: জিরো-ডাউনটাইমে ডাটাবেজ পাসওয়ার্ড বা JWT সিক্রেট কীভাবে পরিবর্তন (Rotate) করবে?",
      m: "পাসওয়ার্ড সরাসরি একবারে বদলে দিলে মুহূর্তের মধ্যে সমস্ত রানিং সার্ভার ডেটাবেজ এরর খাওয়া শুরু করবে। জিরো-ডাউনটাইম সিক্রেট রোটেশন স্টেপস: (১) `Database Password Rotation`: ডেটাবেজে প্রথমে একটি সেকেন্ডারি ইউজার বা ডুয়াল পাসওয়ার্ড সাপোর্ট তৈরি করা। অ্যাপ্লিকেশনে নতুন পাসওয়ার্ড এনভায়রনমেন্ট ভ্যারিয়েবলে আপডেট করে রোলিং রিলোড দেওয়া। যখন নিশ্চিত হওয়া যায় সব সার্ভার নতুন পাসওয়ার্ডে শিফট করেছে, তখন ডেটাবেজ থেকে পুরনো পাসওয়ার্ড ড্রপ করা। (২) `JWT Secret Rotation`: JWT ভেরিফিকেশন কোডে একটি অ্যারে সাপোর্ট দেওয়া (`[NEW_SECRET, OLD_SECRET]`)। নতুন টোকেন সাইন হবে নতুন সিক্রেট দিয়ে, কিন্তু পুরনো ভ্যালিড টোকেনগুলো পুরনো সিক্রেট দিয়ে ভেরিফাই হতে পারবে। ৭ দিন পর যখন সব পুরনো টোকেন এক্সপায়ার হবে, তখন পুরনো সিক্রেট কোড থেকে মুছে দেওয়া। কোনো ইউজার লগআউট হয় না।",
      b: "জিরো-ডাউনটাইমে পাসওয়ার্ড বদলাতে ডেটাবেজে দুটি ক্রেডেনশিয়াল একসাথে সচল রাখা হয় এবং সার্ভার আপডেটের পর পুরনোটি বাতিল করা হয়। JWT রোটেশনে দুটি কি দিয়ে ভেরিফাই করে পুরনো টোকেন এক্সপায়ারের পর পুরনো কি মুছে দেওয়া হয়।",
      e: "Zero-Downtime Secret Rotation mandates phased dual-credential phasing: For databases, configure dual concurrent user passwords, deploy applications with the secondary secret, and decommission the primary password. For JWT, support key arrays ([newKey, oldKey]) where signing uses the new key while verification accepts both until legacy tokens expire.",
      code: "// Dual-key JWT Verification:\nfunction verifyToken(token: string) {\n  try { return jwt.verify(token, process.env.JWT_SECRET_NEW!); }\n  catch { return jwt.verify(token, process.env.JWT_SECRET_OLD!); }\n}"
    },
    {
      lvl: "lvl3",
      q: "Log Aggregation Architecture: প্রোডাকশন ক্লাস্টার থেকে Loki এবং Grafana-তে সেন্ট্রালাইজড লগ স্ট্রিমিং কীভাবে সাজাবে?",
      m: "আমরা ক্লাউড-নেটিভ লগিং স্ট্যাক ব্যবহার করি: (১) অ্যাপ্লিকেশনগুলো কনসোলে স্ট্রাকচার্ড JSON লগ নির্গমন করে। (২) সার্ভারের ব্যাকগ্রাউন্ডে `Promtail` বা `Vector` ডেমন চলে যা লোকাল ফাইল বা ডকার সকেট থেকে লগ ফাইলগুলো সংগ্রহ করে। (৩) সংগৃহীত লগগুলো নেটওয়ার্ক দিয়ে সেন্ট্রাল `Grafana Loki` ক্লাস্টারে পুশ করা হয়। লোকির সুবিধা: এটি Elasticsearch-এর মতো ভারী ফুল-টেক্সট ইনডেক্সিং করে না, বরং শুধুমাত্র লেবেল ইনডেক্স করে—ফলে RAM ও স্টোরেজ খরচ ৯৫% কম হয়। (৪) ইঞ্জিনিয়াররা Grafana Explore ড্যাশবোর্ডে গিয়ে `LogQL` কুয়েরি চালিয়ে সেকেন্ডের মধ্যে যেকোনো নির্দিষ্ট টেন্যান্ট বা এররের লগ ফিল্টার করে ডিবাগ করতে পারে।",
      b: "অ্যাপ্লিকেশন JSON লগ তৈরি করে, Promtail এজেন্ট তা সংগ্রহ করে Grafana Loki ক্লাস্টারে পুশ করে। এটি ইলাস্টিকসার্চের চেয়ে অনেক হালকা ও সাশ্রয়ী এবং গ্রাফানা থেকে মুহূর্তেই লগ অনুসন্ধান করা যায়।",
      e: "Architect centralized log aggregation using Grafana Loki fed by lightweight Vector or Promtail log collectors. Loki indexes strictly metadata labels rather than full-text payloads, lowering memory and disk footprints by 95% compared to Elasticsearch while enabling fast LogQL log queries in Grafana.",
      code: "// LogQL Query in Grafana:\n{app=\"dokani-api\", env=\"production\"} |= \"PaymentFailed\" | json"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: প্রোডাকশনে কিছু কাস্টমার অভিযোগ করছে তারা চেকআউট করতে পারছে না, কিন্তু সার্ভার সিপিইউ ও মেমোরি সম্পূর্ণ নরমাল এবং কোনো ক্র্যাশ লগ নেই! Sentry খুলে তুমি কীভাবে আসল সমস্যাটি উদঘাটন করবে?",
      m: "তদন্তের ধাপ: (১) Sentry ড্যাশবোর্ডে গিয়ে 'Issues'-এ লাস্ট ১ ঘণ্টার এরর ফিল্টার করব এবং 'Affected Users' কাউন্ট দেখব। (২) সমস্যাটি ক্র্যাশ না হয়ে একটি সাইলেন্ট ট্রানজ্যাকশন এরর হতে পারে (যেমন পেমেন্ট গেটওয়ের 400 Bad Request যা কোডে `catch` ব্লকে সাইলেন্টলি খেয়ে ফেলা হয়েছে!)। (৩) Sentry-র 'Breadcrumbs' দেখব: কাস্টমার কোন বাটনে ক্লিক করেছিল, কোন এপিআই কল হয়েছিল এবং ঠিক কোন স্টেপে এসে রেসপন্স ফেইল করেছে। (৪) এরর ডিটেইলে পেমেন্ট গেটওয়ের নির্দিষ্ট এরর কোড (যেমন `INVALID_MERCHANT_PIN` বা `INSUFFICIENT_BALANCE`) শনাক্ত করে অবিলম্বে কোড বা কনফিগারেশন ফিক্স রিলিজ করব।",
      b: "সেন্ট্রির ইস্যু ট্র্যাকার ও ব্রেডক্রাম্বস দেখে বুঝব কাস্টমার চেকআউটের কোন ধাপে আটকেছে। সাইলেন্ট এরর ও পেমেন্ট এপিআই রেসপন্স ট্রেস দেখে সমস্যার মূল কারণ তাৎক্ষণিকভাবে বের করব।",
      e: "Triage silent failures in Sentry by auditing Issues grouped by 'Affected Users' and inspecting the exact User Breadcrumbs leading up to checkout abandonment. Unhandled promise rejections or caught API exceptions will reveal the root external gateway rejection payload.",
      tip: "বলো: 'Audit Sentry User Breadcrumbs to reconstruct the exact user interaction trail leading up to the silent failure.'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি হাই-ট্রাফিক এপিআই সার্ভারে লগ ফাইল একদিনেই ৪০GB হয়ে ডিস্ক স্পেস ৯৯% পূর্ণ করে দিয়েছে! তুমি সার্ভারে লগইন করে দেখলে কোডে `logger.info(JSON.stringify(req))` লেখা ছিল যা প্রতিটি রিকোয়েস্টের পুরো পে-লোড লগ করছিল। কীভাবে এটি ইমার্জেন্সি ফিক্স এবং রিফ্যাক্টর করবে?",
      m: "ইমার্জেন্সি ফিক্স: (১) অবিলম্বে বড় লগ ফাইলটি ট্রাঙ্কেট করে ডিস্ক স্পেস ফাঁকা করব: `sudo truncate -s 0 /var/log/app.log`। (২) PM2 বা systemd দিয়ে নোড অ্যাপে এনভায়রনমেন্ট ভ্যারিয়েবল `LOG_LEVEL=warn` সেট করে রিলোড দেব—যাতে সমস্ত `info` লগ সাথে সাথে বন্ধ হয়ে যায় এবং শুধু ওয়ার্নিং ও এরর লগ হয়। (৩) স্থায়ী রিফ্যাক্টরিং: কোড থেকে ফুল রিকোয়েস্ট বডি লগিং সম্পূর্ণ মুছে দেব; এর বদলে শুধুমাত্র এপিআই রুট, মেথড, স্ট্যাটাস কোড ও সময়কাল লগ করব (`{ method, url, status, duration }`)।",
      b: "truncate -s 0 দিয়ে বড় ফাইল খালি করে তাৎক্ষণিক ডিস্ক ফাঁকা করব। LOG_LEVEL=warn দিয়ে অপ্রয়োজনীয় info লগ বন্ধ করব এবং কোড রিফ্যাক্টর করে শুধু রিকোয়েস্টের মেটাডেটা লগ করার নিয়ম করব।",
      e: "Execute truncate -s 0 /var/log/app.log to immediately free host disk storage. Dynamically throttle log verbosity to LOG_LEVEL=warn to suppress info dumps. Refactor logging middleware to strip raw request payloads, logging solely metadata (method, route, statusCode, duration).",
      code: "sudo truncate -s 0 /var/log/dokani/app.log\n# In ecosystem.config.js:\nenv: { LOG_LEVEL: 'warn' }"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: মধ্যরাতে একটি ডেটাবেজ ক্র্যাশ হয়েছে এবং সকালের রিকভারির পর দেখা গেল স্বয়ংক্রিয় ব্যাকআপ স্ক্রিপ্টটি গত ৩ সপ্তাহ ধরে চুপিচুপি ফেইল করছিল কারণ AWS S3-এর স্টোরেজ কি এক্সপায়ার হয়ে গিয়েছিল! কীভাবে ভবিষ্যতে এমন নীরব ব্যর্থতা ১০০% প্রতিরোধ করবে?",
      m: "মারাত্মক ভুল: ব্যাকআপ স্ক্রিপ্টে কোনো 'Dead Man's Snitch' বা ব্যর্থতা পর্যবেক্ষক ছিল না! স্থায়ী প্রতিরোধ ব্যবস্থা: (১) `Heartbeat Monitoring`: হেলথচেক সার্ভিস (যেমন Healthchecks.io বা BetterStack)-এ একটি মনিটর বানাব। ব্যাকআপ স্ক্রিপ্টের সফল এক্সিকিউশনের শেষে `curl https://hc-ping.com/xxx` পাঠানো হবে। যদি ২৪ ঘণ্টায় ১ বারও পিং না আসে, তবে মনিটর স্বয়ংক্রিয়ভাবে অন-কল ইঞ্জিনিয়ারদের ফোনে অ্যালার্ট পাঠাবে। (২) ব্যাকআপ স্ক্রিপ্টের শুরুতে `set -euo pipefail` রাখা যাতে যেকোনো কমান্ড ফেইল করলেই স্ক্রিপ্ট ক্যাচ ব্লকে স্ল্যাকে ফেইলিয়র নোটিফিকেশন পাঠায়।",
      b: "নীরব ব্যর্থতা রোধে Healthchecks.io হার্টবিট মনিটরিং যুক্ত করব। ২৪ ঘণ্টার মধ্যে ব্যাকআপ সফলতার পিং না পেলে সিস্টেম স্বয়ংক্রিয়ভাবে অ্যালার্ট পাঠাবে। এছাড়া স্ক্রিপ্ট ফেইল করলে স্ল্যাকে সরাসরি এরর মেসেজ পাঠানোর ব্যবস্থা করব।",
      e: "Prevent silent cron failures via Dead Man's Snitch / Healthchecks.io. The backup script curls an inbound ping endpoint strictly upon successful completion; if 24 hours elapse without a ping, the monitoring service triggers urgent phone/Slack escalations.",
      code: "# At the end of backup.sh:\ncurl -fsS --retry 3 https://hc-ping.com/YOUR-UUID"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: প্রোডাকশন ডেটাবেজের ব্যাকআপ রিস্টোর ড্রিল করার সময় তুমি দেখলে রিস্টোর স্ক্রিপ্ট এরর দিচ্ছে: `ERROR: role 'dokani_user' does not exist` এবং সম্পূর্ণ রিস্টোর আটকে গেছে। কারণ কী এবং কীভাবে সমাধান করবে?",
      m: "সমস্যার কারণ: `pg_dump` কমান্ডটি শুধুমাত্র নির্দিষ্ট ডেটাবেজের স্কিমা ও টেবিল ব্যাকআপ নেয়, কিন্তু গ্লোবাল ক্লাস্টার অবজেক্ট—যেমন ডেটাবেজ ইউজার, রোল ও পারমিশন—ব্যাকআপ নেয় না! ফলে নতুন ফ্রেশ সার্ভারে ওই ইউজার না থাকায় রিস্টোর ফেইল করেছে। সমাধান: (১) গ্লোবাল ক্লাস্টার রোল ব্যাকআপ নেওয়ার জন্য ক্রন জবে `pg_dumpall --globals-only > globals.sql` কমান্ড যুক্ত করা। (২) অথবা রিস্টোর স্ক্রিপ্টের শুরুতে স্বয়ংক্রিয়ভাবে প্রয়োজনীয় ইউজার ও রোল তৈরি করার প্রি-চেক স্ক্রিপ্ট যোগ করা (`CREATE ROLE dokani_user WITH LOGIN PASSWORD '...';`)। এর ফলে যেকোনো নতুন সার্ভারে নিখুঁতভাবে রিস্টোর সম্পন্ন হবে।",
      b: "pg_dump ইউজার ও রোল ব্যাকআপ নেয় না। pg_dumpall --globals-only দিয়ে গ্লোবাল রোল ব্যাকআপ রাখতে হবে অথবা রিস্টোর করার আগে প্রয়োজনীয় ইউজার ও পারমিশন তৈরি করে নিতে হবে।",
      e: "pg_dump backs up individual databases but omits global cluster metadata (database users, roles, tablespaces). Capture cluster roles via pg_dumpall --globals-only into a companion globals.sql artifact, or ensure provisioning scripts create required application roles prior to pg_restore.",
      code: "pg_dumpall --globals-only -U postgres > /tmp/globals.sql"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি সিকিউরিটি অডিটে দেখা গেল ডেভেলপাররা স্টেজিং এবং প্রোডাকশন উভয় পরিবেশে একই ডেটাবেজ পাসওয়ার্ড এবং একই JWT Secret ব্যবহার করছে! কেন এটি মারাত্মক অপরাধ এবং কীভাবে আলাদা করবে?",
      m: "মারাত্মক অপরাধ: স্টেজিং পরিবেশ সাধারণত ডেভেলপারদের জন্য অনেক বেশি উন্মুক্ত থাকে এবং টেস্ট ডেটা থাকে। স্টেজিংয়ের কোনো কনফিগ বা লগ লিক হলে আক্রমণকারী সরাসরি সেই একই সিক্রেট ব্যবহার করে আসল প্রোডাকশন ডেটাবেজ হ্যাক করে কোটি টাকার রিয়েল ডেটা চুরি করে ফেলবে! সমাধান: (১) স্টেজিং ও প্রোডাকশনের সিক্রেট সম্পূর্ণ আলাদা ও স্বাধীন কি দিয়ে এনক্রিপ্ট করতে হবে। (২) Doppler বা GitHub Environments ব্যবহার করে স্টেজিং ও প্রোডাকশনের জন্য পৃথক সিক্রেট ভল্ট এনফোর্স করতে হবে। (৩) প্রোডাকশন ডাটাবেজের আইপি শুধুমাত্র প্রোডাকশন VPS-এর সাথে প্রাইভেট নেটওয়ার্কে লক রাখতে হবে যাতে স্টেজিং থেকে প্রোডাকশনে কোনো নেটওয়ার্ক রুটই না থাকে।",
      b: "স্টেজিংয়ের সিক্রেট লিক হলে প্রোডাকশন হ্যাক হওয়ার মারাত্মক ঝুঁকি থাকে। Doppler বা গিটহাব এনভায়রনমেন্ট দিয়ে স্টেজিং ও প্রোডাকশনের জন্য সম্পূর্ণ আলাদা পাসওয়ার্ড ও সিক্রেট এনফোর্স করতে হবে।",
      e: "Sharing credentials between staging and production invalidates environment isolation; compromising lower-security staging immediately exposes critical production systems. Segment environments strictly via isolated secrets vaults in Doppler, enforcing completely distinct cryptographic keys and private network boundaries.",
      tip: "কখনোই স্টেজিং ও প্রোডাকশনে একই সিক্রেট বা পাসওয়ার্ড ব্যবহার করবে না।"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani POS-এর প্রোডাকশন হেলথ, এরর ট্র্যাকিং ও সার্বিক মনিটরিং আর্কিটেকচার কীভাবে আর্কিটেক্ট করা হয়েছে?",
      m: "দোকানি পিওএসে একটি সম্পূর্ণ ত্রিমাত্রিক প্রোডাকশন মনিটরিং আর্কিটেকচার কার্যকর: (১) `Sentry`: সমস্ত ফ্রন্টএন্ড Next.js ও ব্যাকএন্ড Node.js এরর এবং স্লো ট্রেস রিয়েলটাইমে ট্র্যাক করে; কোনো ক্যাশিয়ারের চেকআউট ফেইল হলে ৩ সেকেন্ডের মধ্যে স্ল্যাকে বিস্তারিত ট্রেস সহ অ্যালার্ট আসে। (২) `Pino Structured JSON Logging`: প্রতিদিনের সমস্ত সেলস অডিট ও সিস্টেম লগ Pino দিয়ে ফরম্যাটেড আকারে সার্ভার ড্রাইভে জমা হয় এবং `pm2-logrotate` দিয়ে স্বয়ংক্রিয়ভাবে কম্প্রেস ও রোটেট হয়। (৩) `UptimeRobot + Dead Man's Snitch`: প্রতি ৬০ সেকেন্ডে এপিআই হেলথ এন্ডপয়েন্ট চেক করে সাইট ডাউন অ্যালার্ট দেয় এবং প্রতিদিনের ভোর ৪টার এনক্রিপ্টেড S3 ডেটাবেজ ব্যাকআপ সম্পন্ন হলে হার্টবিট পিং গ্রহণ করে। এর ফলে সিস্টেমটি ২৪/৭ সম্পূর্ণ অভিভাবকত্বে পরিচালিত হয়।",
      b: "দোকানিতে সেন্ট্রি দিয়ে লাইভ এরর ট্র্যাকিং, পিনো দিয়ে স্ট্রাকচার্ড JSON লগিং এবং আপটাইমরোবট ও হার্টবিট পিং দিয়ে ২৪/৭ সিস্টেম হেলথ ও ডেটাবেজ ব্যাকআপ পর্যবেক্ষণ করা হয়।",
      e: "Dokani POS operates a 360-degree observability stack: Sentry catches distributed client/server exceptions within 3 seconds, Pino produces structured JSON logs rotated via pm2-logrotate, and UptimeRobot pairs with Dead Man's Snitch heartbeats to audit API health and offsite S3 database backup completion 24/7.",
      tip: "দোকানির এই ৩-টিয়ার অবজারভেবিলিটি ফ্রেমওয়ার্ক (Sentry + Pino + Uptime Heartbeats) বাস্তব প্রোডাকশন দক্ষতার অতুলনীয় প্রমাণ।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: প্রোডাকশন ডেটাবেজ ব্যাকআপ অটোমেশন: উবুন্টু VPS থেকে AWS S3-তে ক্রন ব্যাকআপ স্ক্রিপ্ট কীভাবে লিখে টেস্ট করবে?",
      m: "আমরা একটি সম্পূর্ণ স্বয়ংসম্পূর্ণ প্রোডাকশন ব্যাকআপ ব্যাশ স্ক্রিপ্ট ব্যবহার করি: (১) ইউনিক্স টাইমস্ট্যাম্প দিয়ে ব্যাকআপ ফাইলের নাম বানাই (`dokani_backup_$(date +%Y%m%d_%H%M%S).dump`)। (২) `pg_dump -Fc` দিয়ে কম্প্রেসড ডাম্প তৈরি করি। (৩) AWS CLI দিয়ে ফাইলটি সরাসরি এস৩ প্রাইভেট বাকেটে পুশ করি (`aws s3 cp ...`)। (৪) লোকাল ফাইল মুছে ডিস্ক ফাঁকা করি। (৫) এস৩ লাইফসাইকেল রুলসে ৩০ দিনের পুরনো ব্যাকআপ স্বয়ংক্রিয়ভাবে মুছে যাওয়ার পলিসি রাখি। টেস্ট করার নিয়ম: স্ক্রিপ্টটি ম্যানুয়ালি রান করে এস৩ বাকেটে ফাইল সাইজ পরীক্ষা করি এবং একটি টেস্ট স্যান্ডবক্সে `pg_restore` চালিয়ে যাচাই করি সম্পূর্ণ ডেটাবেজ নিখুঁতভাবে রিকভার হয়েছে কি না।",
      b: "pg_dump দিয়ে টাইমস্ট্যাম্পযুক্ত ফাইল বানিয়ে AWS CLI দিয়ে S3 তে পাঠানো হয় এবং লোকাল ফাইল ডিলিট করা হয়। টেস্ট স্যান্ডবক্সে pg_restore চালিয়ে ব্যাকআপের কার্যকারিতা শতভাগ নিশ্চিত করা হয়।",
      e: "Deploy an automated nightly cron backup script streaming compressed pg_dump archives to AWS S3 buckets. Assert disaster readiness by executing regular sandbox restore verifications (pg_restore) against temporary staging instances to prove archive integrity.",
      code: "# Crontab entry (Runs daily at 03:00 AM):\n0 3 * * * /var/scripts/backup-to-s3.sh >> /var/log/backup.log 2>&1"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: প্রোডাকশন ডেটাবেজ ডিজাস্টার রিকভারি এক্সারসাইজ (Game Day Drill) কীভাবে পরিচালনা করবে?",
      m: "গেম ডে ড্রিল হলো একটি পরিকল্পিত মহড়া যেখানে টিমের ইঞ্জিনিয়াররা ইচ্ছাকৃতভাবে একটি ডামি ডিজাস্টার তৈরি করে রিকভারি গতি পরীক্ষা করে। ধাপসমূহ: (১) একটি টেস্ট ক্লাউড পরিবেশে লাইভ প্রোডাকশনের একটি ক্লোন তৈরি করি। (২) লিড ইঞ্জিনিয়ার না জানিয়ে ডেটাবেজ ড্রপ করে দেয় বা সার্ভার টার্মিনেট করে। (৩) অন-কল ইঞ্জিনিয়ারদের রিকভারি রানবুক খুলে এস৩ থেকে সর্বশেষ ব্যাকআপ ডাউনলোড করে নতুন সার্ভারে রিস্টোর করতে বলা হয়। (৪) ঘড়ি ধরে মাপা হয় আমাদের RTO (কত মিনিটে সাইট ফিরল) এবং RPO (কত মিনিটের ডেটা লস হলো)। এই নিয়মিত ড্রিলের কারণে বাস্তব বিপর্যয়ে টিম কোনো আতঙ্ক ছাড়াই শান্ত মাথায় ১০ মিনিটে সিস্টেম রিকভার করতে পারে।",
      b: "গেম ডে ড্রিলে টেস্ট পরিবেশে কৃত্রিমভাবে ডাটাবেজ ক্র্যাশ ঘটিয়ে ব্যাকআপ থেকে রিস্টোর করার মহড়া দেওয়া হয়। এটি অন-কল ইঞ্জিনিয়ারদের বাস্তব বিপর্যয়ের দিনে নির্ভুলভাবে ১০ মিনিটে সিস্টেম ফিরিয়ে আনার আত্মবিশ্বাস দেয়।",
      e: "Execute scheduled Game Day Disaster Drills in sandbox environments: deliberately drop target database clusters and time the engineering team's execution of offsite S3 restore runbooks. This audits true RTO/RPO metrics and hardens team muscle memory for real-world incidents.",
      tip: "বলো: 'Game Day disaster recovery drills validate team runbooks and prove real-world RTO targets under pressure.'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: স্ল্যাক নোটিফিকেশনে প্রোডাকশন অ্যালার্ট ইন্টিগ্রেশন: ইমার্জেন্সি P1 ইনসিডেন্টের সময় অটোমেটেড এস্কেলেশন কীভাবে কাজ করে?",
      m: "আমরা স্ল্যাক ওয়েবহুক এবং PagerDuty সমন্বয় করি: (১) `P3 (Minor Warning)`: সাধারণ ওয়ার্নিং বা বিচ্ছিন্ন হ্যান্ডেল্ড এরর শুধুমাত্র `#dev-logs` চ্যানেলে যায় কোনো সাউন্ড ছাড়া। (২) `P2 (Degraded Performance)`: এপিআই ল্যাটেন্সি ৫০০ms পার হলে `#alerts-backend` চ্যানেলে ইয়েলো অ্যালার্ট যায়। (৩) `P1 (Critical Outage)`: ডেটাবেজ কানেকশন লস, সাইট ডাউন বা 5xx এরর ৫% অতিক্রম করলে মুহূর্তের মধ্যে `#incidents-critical` চ্যানেলে রেড অ্যালার্ট যায় এবং পেজারডিউটি অন-কল লিড ইঞ্জিনিয়ারের ফোনে অটোমেটিক কল ও সাইরেন বাজায়। যদি ৫ মিনিটে কেউ একনলেজ (Acknowledge) না করে, তবে অ্যালার্টটি অটোমেটিক সিটিও (CTO)-র ফোনে এস্কেলেট করে।",
      b: "অ্যালার্ট তিন ভাগে বিভক্ত: সাধারণ ওয়ার্নিং নিঃশব্দে স্ল্যাকে যায়, পারফরম্যান্স ড্রপে ব্যাকএন্ড টিমে সতর্কবার্তা যায় এবং সাইট ডাউন হলে সরাসরি ইঞ্জিনিয়ারের ফোনে পেজারডিউটি সাইরেন ও কল দিয়ে জরুরি এস্কেলেশন করা হয়।",
      e: "Implement multi-tiered incident routing: P3 warnings route silently to #dev-logs, P2 performance degradations notify team channels, and P1 critical outages (database dropouts, 5xx spikes) trigger PagerDuty phone escalations to on-call leads with automatic failover escalation to engineering management.",
      tip: "বলো: 'We implement multi-tiered incident escalation from passive Slack telemetry up to automated PagerDuty on-call sirens.'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: ক্লাউড সিকিউরিটি অডিট ও কমপ্লায়েন্স চেকলিস্ট: প্রোডাকশন রিলিজের পূর্বে তোমার ফাইনাল ডেভঅপস চেকলিস্ট কী?",
      m: "ফাইনাল প্রোডাকশন সাইন-অফ চেকলিস্ট: (১) `Network Perimeter`: UFW ফায়ারওয়ালে ২২, ৮০, ৪৪৩ ছাড়া সমস্ত অভ্যন্তরীণ পোর্ট (5432, 27017, 6379) সম্পূর্ণ ব্লক। (২) `SSH Security`: PasswordAuthentication no এবং PermitRootLogin no এনফোর্সড। (৩) `Application`: PM2 ক্লাস্টার মোড সচল, ৪GB Swap সক্রিয় এবং Nginx রিভার্স প্রক্সিতে SSL A+ রেটিং কনফিগারড। (৪) `Secrets`: `.env` পারমিশন ৬০০ এবং কোনো সিক্রেট গিটে কমিট নেই। (৫) `Disaster Recovery`: অটোমেটেড নাইটলি S3 ব্যাকআপ ক্রন স্ক্রিপ্ট ও হার্টবিট সক্রিয় এবং টেস্ট রিস্টোর সফল। (৬) `Monitoring`: Sentry এবং আপটাইম অ্যালার্ট সক্রিয়। এই ৬টি টিক মার্ক ছাড়া কোনো সফটওয়্যার প্রোডাকশনে সাইন-অফ পায় না।",
      b: "প্রোডাকশন চেকলিস্ট: ফায়ারওয়াল পোর্ট ব্লকিং, রুট লগইন নিষিদ্ধ, PM2 ক্লাস্টার ও সোয়াপ মেমোরি, .env পারমিশন ৬০০, এনক্রিপ্টেড S3 ব্যাকআপ পাইপলাইন এবং সেন্ট্রি এরর ট্র্যাকিং সক্রিয় থাকা বাধ্যতামূলক।",
      e: "Pre-production DevOps sign-off checklist: (1) Perimeter firewalls locked down, (2) SSH root/password logins disabled, (3) PM2 cluster with swap active behind Nginx SSL, (4) Strict .env file permissions (600), (5) Verified automated S3 offsite backups with heartbeat monitoring, and (6) Sentry/Uptime observability live.",
      tip: "ইন্টারভিউ শেষ করার জন্য এই ৬-দফা ডেভঅপস প্রোডাকশন চেকলিস্ট একটি মাস্টারস্ট্রোক।"
    }
  ]
};
