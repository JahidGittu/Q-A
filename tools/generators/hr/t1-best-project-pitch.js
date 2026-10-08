// Topic 1: Pitching Your Best Project (STAR Method) (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "best-project-pitch",
  name: "Pitching Your Best Project (STAR Method)",
  desc: "Presenting Dokani POS / PTTABD / Lakdhanavi using Situation, Task, Action, Result framework with architectural metrics",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "ইন্টারভিউতে 'Tell me about yourself' বা 'তোমার প্রফেশনাল পরিচয় দাও' কীভাবে আকর্ষণীয়ভাবে উপস্থাপন করবে?",
      m: "শুরুতেই ব্যক্তিগত জীবন নয়, সরাসরি প্রফেশনাল ভ্যালু তুলে ধরব: 'আমি একজন Full-Stack Software Engineer, যার মূল দক্ষতা React/Next.js, Node.js/Express, PostgreSQL, Docker এবং Linux DevOps-এ। গত কয়েক বছর ধরে আমি হাই-পারফরম্যান্স মাল্টি-টেন্যান্ট SaaS এবং এন্টারপ্রাইজ সিস্টেম তৈরি করছি। আমার তৈরি ফ্ল্যাগশিপ প্রজেক্ট হলো Dokani POS & ERP SaaS (লাইভ: `https://dokani.bip.sg`), যেখানে আমি এককভাবে ফ্রন্টএন্ড, ব্যাকএন্ড, রো-লেভেল সিকিউরিটি ও লিনাক্স হোস্টিং আর্কিটেকচার করেছি। আমি স্কেলযোগ্য সিস্টেম এবং ক্লিন কোড তৈরিতে গভীর প্যাশনেট এবং NT Tech Innovation-এর ইঞ্জিনিয়ারিং টিমে অবদান রাখতে অত্যন্ত আগ্রহী।'",
      b: "নিজের পরিচয়ে প্রফেশনাল পরিচয়, মূল টেকনোলজি স্ট্যাক (Next.js, Node.js, PostgreSQL, Docker) এবং বাস্তব প্রজেক্টের (Dokani POS) অর্জন সংক্ষেপে তুলে ধরে কোম্পানির প্রতি আগ্রহ প্রকাশ করা সবচেয়ে কার্যকর উপায়।",
      e: "I am a Full-Stack Software Engineer specializing in scalable web ecosystems built on React/Next.js, Node.js, TypeScript, PostgreSQL, and Linux DevOps. I focus on building high-throughput, multi-tenant SaaS platforms—most notably Dokani POS & ERP (https://dokani.bip.sg), where I engineered the architecture across sub-second barcode checkout, atomic inventory decrements, and automated VPS hosting. I am eager to bring this craftsmanship to NT Tech Innovation.",
      tip: "৯০ সেকেন্ডের মধ্যে উত্তর শেষ করবে এবং সরাসরি প্রজেক্টের লাইভ ডোমেইনের (dokani.bip.sg) কথা উল্লেখ করবে।"
    },
    {
      lvl: "lvl1",
      q: "Dokani POS SaaS প্রজেক্টের হাই-লেভেল ওভারভিউ কীভাবে সংক্ষেপে ইন্টারভিউ বোর্ডে ব্যাখ্যা করবে?",
      m: "Dokani হলো একটি আধুনিক ক্লাউড-বেজড মাল্টি-টেন্যান্ট POS ও ইনভেন্টরি ERP প্ল্যাটফর্ম যা সুপারশপ, ডিপার্টমেন্টাল স্টোর ও রিটেইল শপগুলোর জন্য তৈরি। সাধারণ লোকাল পিসি সফটওয়্যারের বিপরীতে Dokani ক্লাউডে চলে, যার ফলে প্রতিটি দোকানদার তার নিজস্ব সাবডোমেন দিয়ে যেকোনো ডিভাইস থেকে রিয়েলটাইমে সেলস মনিটর করতে পারে, বারকোড স্ক্যানার দিয়ে সাব-সেকেন্ডে বিলিং করতে পারে, বাকির খতিয়ান দেখতে পারে এবং মাল্টি-ব্রাঞ্চ স্টক ট্রান্সফার করতে পারে।",
      b: "দোকানি হলো একাধিক রিটেইল দোকানের জন্য তৈরি একটি ক্লাউড পিওএস ও ইআরপি সিস্টেম। এটি যেকোনো ডিভাইস থেকে রিয়েলটাইম সেলস মনিটরিং, সাব-সেকেন্ড বারকোড বিলিং, নির্ভুল স্টক ট্র্যাকিং এবং স্বয়ংক্রিয় ক্লাউড ব্যাকআপ নিশ্চিত করে।",
      e: "Dokani (https://dokani.bip.sg) is a production-grade multi-tenant POS and Inventory ERP SaaS designed for retail chains and supermarkets. Unlike legacy desktop POS software, Dokani operates on the cloud, enabling merchants to manage sub-second barcode billing, multi-branch stock synchronizations, automated customer credit ledgers, and real-time revenue analytics from any device.",
      tip: "ইন্টারভিউতে 'Cloud multi-tenant POS vs legacy desktop POS' পার্থক্যটি স্পষ্টভাবে তুলে ধরবে।"
    },
    {
      lvl: "lvl1",
      q: "Dokani প্রজেক্টে ব্যবহৃত টেকনোলজি স্ট্যাক সিলেকশনের পেছনের কারণ কী ছিল?",
      m: "আমরা টেক স্ট্যাক নির্বাচন করেছি পারফরম্যান্স ও ডাটা ইন্টিগ্রিটির ভিত্তিতে: ফ্রন্টএন্ডে Next.js ও Tailwind CSS (তাত্ক্ষণিক পেজ লোড ও কীবোর্ড-ফার্স্ট পিওএস ইন্টারফেসের জন্য), ব্যাকএন্ডে Node.js ও Express.js (লাইটওয়েট ও হাই-কনকারেন্সি রিকোয়েস্ট দ্রুত হ্যান্ডেল করার জন্য), ডাটাবেজে PostgreSQL ও Prisma ORM (টাকা-পয়সার হিসাব ও ইনভেন্টরি স্টকে কঠোর ACID ও রো-লেভেল লকিংয়ের জন্য), এবং ইনফ্রাস্ট্রাকচারে Ubuntu VPS, Nginx রিভার্স প্রক্সি, PM2 ও Cloudflare (জিরো-ডাউনটাইম ডিপ্লয়মেন্ট ও সিকিউরিটির জন্য)।",
      b: "দ্রুতগতির ইউজার ইন্টারফেসের জন্য নেক্সটজেএস ও টেইলউইন্ড, স্কেলেবল এপিআই সার্ভিসের জন্য নোডজেএস, নির্ভুল অর্থনৈতিক হিসাব ও রো-লেভেল লকিংয়ের জন্য পোস্টগ্রেস এবং নির্ভরযোগ্য সার্ভার ব্যবস্থাপনায় উবুন্টু ও এনজিনিক্স বেছে নেওয়া হয়েছে।",
      e: "The tech stack was selected strictly on operational requirements: Next.js and Tailwind CSS for rapid keyboard-first cashier UI; Node.js and Express for non-blocking I/O event loops; PostgreSQL with Prisma ORM for uncompromising ACID transactions and row-level locks on inventory; and Ubuntu VPS with Nginx, PM2, and Cloudflare edge proxies for production resilience.",
      tip: "শুধু টেকনোলজির নাম না বলে 'কেন বেছে নিয়েছি' তার ব্যবসায়িক ও প্রযুক্তিগত যুক্তি দেবে।"
    },
    {
      lvl: "lvl1",
      q: "Dokani প্রজেক্টে তোমার ব্যক্তিগত রোল ও ইঞ্জিনিয়ারিং কনট্রিবিউশন কেমন ছিল?",
      m: "আমি Dokani-র Solo Founding Full-Stack Engineer হিসেবে পুরো সিস্টেমটি স্ক্র্যাচ থেকে আর্কিটেক্ট ও ডেভেলপ করেছি। এর মধ্যে রয়েছে: (১) ডাটাবেজ স্কিমা ডিজাইন ও মাল্টি-টেন্যান্ট RLS আইসোলেশন, (২) কীবোর্ড-ফার্স্ট অপটিমাইজড POS বিলিং ইন্টারফেস ও থার্মাল প্রিন্টিং ইঞ্জিন, (৩) পোস্টগ্রেসে অ্যাটোমিক স্টক ডিক্রিমেন্ট ট্রানজেকশন যাতে কোনো ওভারসেলিং না হয়, (৪) বাকি খতিয়ান ও কাস্টমার লেজার ক্যালকুলেশন, এবং (৫) উবুন্টু সার্ভারে Nginx, SSL, PM2 এবং গিটহাব অ্যাকশন্স সিআই/সিডি অটোমেশন।",
      b: "আমি এককভাবে দোকানির ফুল-স্ট্যাক আর্কিটেকচার, ডাটাবেজ স্কিমা, বারকোড চেকআউট ইঞ্জিন, ফাইন্যান্সিয়াল ট্রানজেকশন এবং লিনাক্স সার্ভার ডিপ্লয়মেন্ট সফলভাবে সম্পন্ন করেছি।",
      e: "As the lead full-stack engineer, I took end-to-end ownership: architecting the multi-tenant PostgreSQL schema, building the sub-second keyboard-driven POS cashier UI, enforcing atomic stock decrements via database transactions, engineering the double-entry customer credit ledger, and provisioning the automated Ubuntu CI/CD pipeline behind Nginx and PM2.",
      tip: "এন্ড-টু-এন্ড ওনারশিপের কথা বললে একজন সিনিয়র ইঞ্জিনিয়ারের দায়িত্বশীলতা ফুটে ওঠে।"
    },
    {
      lvl: "lvl1",
      q: "Dokani-র বাইরে তোমার রেজুমেতে থাকা অন্যান্য প্রজেক্ট (PTTABD LMS ও Lakdhanavi ERP) সংক্ষেপে কীভাবে উপস্থাপন করবে?",
      m: "Dokani-র পাশাপাশি আমি PTTABD এডুকেশনাল প্ল্যাটফর্মে কাজ করেছি যেখানে bKash Tokenized Payment গেটওয়ে ও ভিডিও স্ট্রিমিং অ্যাক্সেস অটোমেশন করেছি। এছাড়া Lakdhanavi পাওয়ার প্ল্যান্টের ইন্টারনাল সিস্টেমে মেটেরিয়াল রিকুইজিশন, ইনভেন্টরি ট্র্যাকিং ও সাপ্লাই চেইন এপ্রুভাল অটোমেশনে ভূমিকা রেখেছি। Dokani আমাকে শিখিয়েছে মাল্টি-টেন্যান্সি ও হাই-স্পিড কনকারেন্সি, PTTABD শিখিয়েছে পেমেন্ট ওয়েবহুক ও রোলব্যাক, আর Lakdhanavi শিখিয়েছে জটিল এন্টারপ্রাইজ ওয়ার্কফ্লো।",
      b: "দোকানির পাশাপাশি পিটিটিএবিডি এলএমএসে বিকাশ পেমেন্ট ও কোর্স এনরোলমেন্ট এবং লাকধানাবিতে সাপ্লাই চেইন ওয়ার্কফ্লো অটোমেশনে কাজ করেছি। প্রতিটি প্রজেক্ট আমাকে ভিন্ন ভিন্ন ইঞ্জিনিয়ারিং চ্যালেঞ্জ সমাধান করতে শিখিয়েছে।",
      e: "Beyond Dokani, I engineered the PTTABD LMS platform featuring bKash Tokenized Payment integration and instant course enrollment webhooks. I also built internal inventory requisition workflows for Lakdhanavi Power Plant. These distinct projects honed my capabilities across fintech integrations, concurrency safeguards, and enterprise approval hierarchies.",
      tip: "প্রতিটি প্রজেক্ট থেকে তুমি কী কী আলাদা স্কিল শিখেছ তা হাইলাইট করবে।"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "STAR মেথড (Situation, Task, Action, Result) ব্যবহার করে Dokani-র হাই-স্পিড বারকোড বিলিং প্রেজেন্ট করো?",
      m: "**Situation:** রিটেইল সুপারশপে পিক আওয়ারে ক্যাশিয়ারদের কাউন্টারে দীর্ঘ লাইন জমত কারণ আগের সফটওয়্যার প্রতিটি বারকোড স্ক্যানে ব্যাকএন্ডে নেটওয়ার্ক রিকোয়েস্ট পাঠিয়ে ইউআই ফ্রিজ করে রাখত। **Task:** আমার দায়িত্ব ছিল এমন একটি চেকআউট ইঞ্জিন তৈরি করা যেখানে প্রতি সেকেন্ডে ৩-৪টি বারকোড স্ক্যান হলেও কোনো ল্যাগ ছাড়াই ১ সেকেন্ডে সম্পূর্ণ ইনভয়েস তৈরি হবে। **Action:** আমি লোকাল ক্লায়েন্ট মেমোরিতে O(1) হ্যাশম্যাপ ক্যাটালগ ক্যাশ করলাম, কীবোর্ড শর্টকাট ইঞ্জিন লিখলাম এবং ব্যাকএন্ডে অপটিমাইজড বাল্ক ইনসার্ট এপিআই তৈরি করলাম। **Result:** ক্যাশিয়াররা মাউস ছাড়াই দ্রুত বিলিং করতে পারছে এবং গড় চেকআউট সময় ৩.৫ সেকেন্ড থেকে ০.৮ সেকেন্ডে নেমে এসেছে।",
      b: "স্টার মেথডে সমস্যার প্রেক্ষাপট (কাউন্টারে দীর্ঘ লাইন), আমার দায়িত্ব (সাব-সেকেন্ড বারকোড বিলিং), নেওয়া পদক্ষেপ (ক্লায়েন্ট ক্যাশিং ও কীবোর্ড শর্টকাট ইঞ্জিন) এবং বাস্তব অর্জন (চেকআউট টাইম ০.৮ সেকেন্ডে নামিয়ে আনা) পরিষ্কারভাবে ব্যাখ্যা করব।",
      e: "Situation: Retail checkout counters suffered bottleneck queues due to blocking network round-trips per barcode scan. Task: Build a sub-second POS checkout engine capable of handling high-frequency barcode streaming without UI freezing. Action: I built an O(1) in-memory catalog cache on Next.js, engineered a keyboard-driven state engine, and batched invoice mutations to the backend. Result: Average invoice checkout dropped from 3.5s to 0.8s, eliminating terminal bottlenecks.",
      tip: "মেট্রিক্স (যেমন ৩.৫ সেকেন্ড থেকে ০.৮ সেকেন্ডে নামা) ইন্টারভিউয়ারদের নজর কাড়ে।"
    },
    {
      lvl: "lvl2",
      q: "STAR মেথড ব্যবহার করে Dokani-র মাল্টি-টেন্যান্ট ডাটা সিকিউরিটি আইসোলেশন কীভাবে ব্যাখ্যা করবে?",
      m: "**Situation:** Dokani একটি শেয়ার্ড ডাটাবেজ মাল্টি-টেন্যান্ট SaaS হওয়ায় সবচেয়ে বড় ঝুঁকি ছিল কোনো বাগের কারণে এক দোকানের স্টক বা বিক্রির তথ্য অন্য দোকান দেখতে পাওয়া। **Task:** আমার লক্ষ্য ছিল ডাটাবেজ এবং অ্যাপ্লিকেশন উভয় স্তরে এমন এক নিশ্ছিদ্র নিরাপত্তা তৈরি করা যাতে কোনো কুয়েরি ভুল করলেও ডাটা ফাঁস হওয়া অসম্ভব হয়। **Action:** প্রতিটি টেবিলে `tenant_id` বাধ্যতামূলক করেছি, Prisma ক্লায়েন্ট এক্সটেনশন দিয়ে স্বয়ংক্রিয়ভাবে সব কুয়েরিতে টেন্যান্ট ফিল্টারিং ইনজেক্ট করেছি এবং PostgreSQL Row-Level Security (RLS) সক্রিয় করেছি। **Result:** প্ল্যাটফর্মে শত শত দোকান নিরাপদে লাইভ চলছে এবং আজ পর্যন্ত কোনো টেন্যান্ট ক্রস-লিক বা সিকিউরিটি অডিট ব্যর্থ হয়নি।",
      b: "স্টার মেথডে টেন্যান্ট ডাটা লিকের ঝুঁকি, আমার দায়িত্ব (নিশ্ছিদ্র মাল্টি-টেন্যান্ট আইসোলেশন), পদক্ষেপ (প্রিজমা মিডলওয়্যার ও পোস্টগ্রেস RLS) এবং ফলাফল (শতভাগ নিরাপদ টেন্যান্ট আইসোলেশন ও জিরো ডাটা লিকেজ) তুলে ধরব।",
      e: "Situation: Hosting hundreds of retail stores on a shared PostgreSQL database created severe risks of tenant data leakage. Task: Architect a multi-layered defense-in-depth isolation boundary impossible to bypass even on developer error. Action: I enforced tenant_id indexing, auto-injected scoping via Prisma Client extensions, and implemented PostgreSQL Row-Level Security policies. Result: 100% data boundary integrity with zero cross-tenant contamination in production.",
      tip: "Defense-in-depth এবং Row-Level Security শব্দগুলো সিনিয়র আর্কিটেক্টের মানসিকতা প্রকাশ করে।"
    },
    {
      lvl: "lvl2",
      q: "STAR মেথডে PTTABD LMS-এর bKash টোকেনাইজড পেমেন্ট গেটওয়ে আর্কিটেকচার কীভাবে পিচ করবে?",
      m: "**Situation:** PTTABD-তে শিক্ষার্থীরা কোর্স কেনার সময় মোবাইল নেটওয়ার্ক ড্রপ বা ইউজার উইন্ডো ক্লোজ করার কারণে বিকাশ পেমেন্ট সম্পন্ন হলেও স্টুডেন্ট কোর্স এক্সেস পেত না, যা থেকে প্রচুর কাস্টমার সাপোর্ট টিকিট আসত। **Task:** আমার দায়িত্ব ছিল একটি ফেইল-সেফ পেমেন্ট ও এনরোলমেন্ট আর্কিটেকচার তৈরি করা যা শতভাগ স্বয়ংক্রিয় ও নিখুঁত হবে। **Action:** আমি বিকাশ টোকেনাইজড এপিআইয়ের পাশাপাশি সার্ভার-টু-সার্ভার Webhook লিসেনার বসালাম, পেমেন্ট ভেরিফিকেশনে Idempotency Key ও ডাটাবেজ ট্রানজেকশন ব্যবহার করলাম এবং ফেইল্ড পেমেন্টের জন্য স্বয়ংক্রিয় রিকনসিলিয়েশন জব লিখলাম। **Result:** পেমেন্ট ডিসপিউট টিকিট ৯৫% কমে যায় এবং কোর্স অ্যাক্টিভেশন সম্পূর্ণ ইনস্ট্যান্ট ও নির্ভুল হয়।",
      b: "স্টার মেথডে পেমেন্ট ফেইলিউর ও সাপোর্ট টিকিটের সমস্যা, আমার দায়িত্ব (স্বয়ংক্রিয় পেমেন্ট ভেরিফিকেশন), গৃহীত পদক্ষেপ (বিকাশ টোকেনাইজড এপিআই, আইডেমপোটেন্ট ওয়েবহুক ও ট্রানজেকশন) এবং অর্জন (৯৫% সাপোর্ট টিকিট হ্রাস) বর্ণনা করব।",
      e: "Situation: Course enrollments failed when students closed browser tabs mid-checkout, causing payment dropouts and heavy support friction. Task: Engineer a zero-loss automated payment verification pipeline. Action: I implemented bKash Tokenized Checkout with server-to-server webhooks, enforced idempotency keys inside database transactions, and scheduled an automated reconciliation cron. Result: Payment dispute support tickets plummeted by 95%.",
      tip: "Idempotency এবং Webhook reconciliation বাস্তব ফিনটেক প্রজেক্টের শ্রেষ্ঠ প্রমাণ।"
    },
    {
      lvl: "lvl2",
      q: "STAR মেথডে Lakdhanavi পাওয়ার প্ল্যান্টের ইনভেন্টরি এপ্রুভাল অটোমেশন কীভাবে উপস্থাপন করবে?",
      m: "**Situation:** পাওয়ার প্ল্যান্টে ভারী স্পেয়ার পার্টস ও মেটেরিয়াল রিকুইজিশন হতো সনাতন কাগুজে ফাইলে, যার কারণে ম্যানেজারদের স্বাক্ষরের অপেক্ষায় জরুরি পার্টস পেতে ৩-৪ দিন লেগে যেত। **Task:** প্ল্যান্টের অপারেশনাল ডাউনটাইম ঠেকাতে একটি পেপারলেস রিকুইজিশন ও মাল্টি-টিয়ার এপ্রুভাল সিস্টেম বানানো। **Action:** আমি রোল-বেসড এপ্রুভাল ইঞ্জিন তৈরি করি যেখানে রিকুইজিশনের পরিমাণের ওপর ভিত্তি করে সংশ্লিষ্ট ইঞ্জিনিয়ার ও জেনারেল ম্যানেজারের কাছে রিয়েলটাইম ইমেইল নোটিফিকেশন যায় এবং ওয়ান-ক্লিক ডিজিটাল এপ্রুভাল সম্পন্ন হয়। **Result:** মেটেরিয়াল অনুমোদন প্রক্রিয়া ৩ দিন থেকে মাত্র ৩০ মিনিটে নেমে আসে এবং প্ল্যান্ট অপারেশনের গতি বহুগুণ বৃদ্ধি পায়।",
      b: "স্টার মেথডে কাগুজে ফাইলে পার্টস রিকুইজিশনের ধীরগতি, আমার দায়িত্ব (ডিজিটাল এপ্রুভাল সিস্টেম তৈরি), পদক্ষেপ (মাল্টি-টিয়ার রোল-বেসড এপ্রুভাল ইঞ্জিন ও নোটিফিকেশন) এবং ফলাফল (অনুমোদন সময় ৩ দিন থেকে ৩০ মিনিটে নামিয়ে আনা) তুলে ধরব।",
      e: "Situation: Material requisition at Lakdhanavi Power Plant relied on physical paper slips, causing 3-day approval delays for critical spare parts. Task: Create an enterprise paperless requisition system. Action: I built a multi-tier RBAC approval engine that routed requisition thresholds to plant managers via automated notifications with one-click cryptographic approvals. Result: Procurement turnaround reduced from 3 days to under 30 minutes.",
      tip: "Enterprise workflow ও Approval hierarchy-র বাস্তব প্রভাব ইন্টারভিউয়ারকে মুগ্ধ করে।"
    },
    {
      lvl: "lvl2",
      q: "প্রজেক্ট পিচ করার সময় কোয়ান্টিফিয়েবল পারফরম্যান্স ও বিজনেস মেট্রিক্স কীভাবে তুলে ধরবে?",
      m: "আমি কখনোই কেবল কোডের কথা বলব না, বরং বাস্তব মেট্রিক্স দিয়ে প্রভাব দেখাব: যেমন 'Dokani-তে আমরা পিক আওয়ারে প্রতি মিনিটে ৬০+ ইনভয়েস সফলভাবে প্রসেস করেছি', 'পোস্টগ্রেস ইনডেক্সিং ও কুয়েরি টিউনিং করে এভারেজ এপিআই রেসপন্স টাইম ৪৫০ms থেকে ৪৫ms-এ নামিয়ে এনেছি (১০ গুণ গতি)', 'স্টক ডিক্রিমেন্টে অ্যাটোমিক লকিং ব্যবহার করায় শতভাগ জিরো ওভারসেলিং বজায় রয়েছে', এবং 'Ubuntu VPS-এ Nginx ক্যাশিং ও PM2 ক্লাস্টার ব্যবহার করায় সার্ভার ডাউনটাইম ছিল ০.১% এর নিচে'।",
      b: "প্রজেক্ট উপস্থাপনায় বাস্তব সংখ্যা ও মেট্রিক্স ব্যবহার করি—যেমন এপিআই রেসপন্স টাইম ১০ গুণ দ্রুত করা, প্রতি মিনিটে ৬০+ লেনদেন হ্যান্ডেল করা এবং শূন্য ওভারসেলিং নিশ্চিত করা।",
      e: "I always articulate business value with concrete telemetry: sustained throughput of 60+ concurrent invoices per minute, slashing P95 API latencies from 450ms down to 45ms via targeted indexing, achieving absolute zero inventory overselling via atomic locks, and maintaining 99.9% uptime on Ubuntu VPS via PM2 and Cloudflare.",
      tip: "P95 latency, throughput, এবং uptime সংখ্যার মাধ্যমে প্রকাশ করলে তোমার বিশ্বাসযোগ্যতা কয়েক গুণ বাড়ে।"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Dokani-তে তোমার নেওয়া সবচেয়ে কঠিন টেকনিক্যাল ডিসিশন (Hardest Architectural Trade-off) কী ছিল এবং কেন?",
      m: "সবচেয়ে কঠিন সিদ্ধান্ত ছিল: MongoDB নাকি PostgreSQL বেছে নেওয়া? প্রজেক্টের শুরুতে রিটেইল প্রোডাক্টের নানা বৈচিত্র্যময় ফিচারের জন্য ফ্লেক্সিবল NoSQL বিবেচনা করা হয়েছিল। কিন্তু আমি গভীরভাবে হিসাব করে দেখলাম যে পিওএস সিস্টেমে স্টক ডিক্রিমেন্টে রেস কন্ডিশন আটকানো এবং কাস্টমার-সাপ্লায়ার বাকি খতিয়ানে কঠোর রেফারেন্সিয়াল ইন্টিগ্রিটি রক্ষা করা সবচেয়ে বড় অগ্রাধিকার। NoSQL-এ ইভেনচুয়াল কনসিসটেন্সির কারণে ওভারসেলিংয়ের ঝুঁকি থাকে। তাই আমি NoSQL-এর মোহ ত্যাগ করে PostgreSQL বেছে নিয়েছিলাম এবং পোস্টগ্রেসের `JSONB` ফিচার ব্যবহার করে আনস্ট্রাকচার্ড ক্যাটালগ হ্যান্ডেল করেছি।",
      b: "সবচেয়ে কঠিন সিদ্ধান্ত ছিল মঙ্গোডিবির বদলে পোস্টগ্রেস বেছে নেওয়া। রিটেইল ব্যবসার অর্থনৈতিক হিসাবের নির্ভুলতা এবং স্টকের রেস কন্ডিশন ঠেকাতে রিলেশনাল ডাটাবেজের কঠোর এসিড ট্রানজেকশন অপরিহার্য ছিল, যা পরবর্তীতে সিস্টেমকে শতভাগ নিরাপদ প্রমাণ করেছে।",
      e: "The most demanding architectural decision was choosing PostgreSQL over MongoDB. While document stores offered fluid schemas for diverse retail SKUs, financial ledgers and concurrent stock decrements strictly required row-level locking (SELECT FOR UPDATE) and ACID guarantees. I chose PostgreSQL, using JSONB columns for dynamic SKU attributes, preserving both relational rigor and schema agility.",
      tip: "কেন অন্য অল্টারনেটিভ বাতিল করেছ তার যুক্তিপূর্ণ তুলনা দেওয়া টেক লিডদের সবচেয়ে প্রিয় প্রশ্ন।"
    },
    {
      lvl: "lvl3",
      q: "Dokani-তে ক্লায়েন্ট-সাইড স্টেট ক্যালকুলেশন থেকে ব্যাকএন্ড অ্যাটোমিক ট্রানজেকশনে আর্কিটেকচারাল পিভটের অভিজ্ঞতা কী?",
      m: "শুরুর প্রোটোটাইপে ফ্রন্টএন্ডে মোট দাম ও স্টক ক্যালকুলেট করে ব্যাকএন্ডে সেভ করতে পাঠানো হতো। কিন্তু যখন দুজন ক্যাশিয়ার একই সাথে শেষ ১টি আইটেম বিক্রি করার চেষ্টা করল, তখনই রেস কন্ডিশনে ওভারসেলিং হয়ে গেল! আমি তাৎক্ষণিকভাবে পুরো আর্কিটেকচার পিভট করি: ফ্রন্টএন্ড কেবল কার্টের আইটেম আইডি ও কোয়ান্টিটি পাঠাবে, আর ব্যাকএন্ডে PostgreSQL `SELECT ... FOR UPDATE` রো-লক দিয়ে স্টক ভ্যালিডেট করে অ্যাটোমিক ট্রানজেকশনে স্টক কমাবে ও ইনভয়েস লিখবে। এই সিদ্ধান্তে সামান্য লেটেন্সি বাড়লেও ডাটার নির্ভুলতা শতভাগ নিশ্চিত হয়।",
      b: "প্রথমে ফ্রন্টএন্ডে স্টক হিসাব করায় রেস কন্ডিশনে ওভারসেলিংয়ের ঝুঁকি তৈরি হয়েছিল। দ্রুত আর্কিটেকচার পরিবর্তন করে ব্যাকএন্ডে পোস্টগ্রেসের রো-লক ও অ্যাটোমিক ট্রানজেকশন চালু করি, যা ডাটার শতভাগ নির্ভুলতা নিশ্চিত করে।",
      e: "In early prototyping, cart calculations occurred client-side. Under concurrent cashier testing, this triggered race conditions where the last inventory unit was oversold. I pivoted the architecture: the client sends only SKU IDs and quantities, while the backend executes a PostgreSQL row-lock transaction (SELECT FOR UPDATE) to atomically validate and decrement stock before committing the invoice.",
      tip: "ভুল শনাক্ত করে কীভাবে আর্কিটেকচারাল সমাধান করেছ তা বলা উচ্চমানের ম্যাচিউরিটি প্রকাশ করে।"
    },
    {
      lvl: "lvl3",
      q: "Dokani POS-এ অফলাইন রেজিলিয়েন্স এবং ব্যাচ ইনভয়েস সিঙ্ক সংক্রান্ত ট্রেড-অফ কীভাবে হ্যান্ডেল করেছিলে?",
      m: "ইন্টারনেট বিচ্ছিন্ন হলে রিটেইল কাউন্টার বন্ধ রাখা যায় না। তাই আমরা ব্রাউজারের IndexedDB ব্যবহার করে অফলাইন মোড তৈরি করি। ক্যাশিয়ার অফলাইনে বিল করতে পারে এবং অফলাইন ইনভয়েসগুলো লোকালি কিউ হয়ে থাকে। তবে ট্রেড-অফ হলো: অফলাইনে থাকা অবস্থায় মাল্টি-টার্মিনালে সঠিক লাইভ স্টক জানা যায় না। তাই আমরা নিয়ম করি: অফলাইনে ক্যাশিয়ার ফিজিক্যাল স্টক দেখে বিক্রি করবে, আর ইন্টারনেট ফিরলেই সিস্টেম ক্রমানুসারে ইনভয়েস ব্যাকএন্ডে সিঙ্ক করবে এবং কোনো স্টক নেগেটিভ হলে অ্যাডমিন ড্যাশবোর্ডে স্পষ্ট অডিট ওয়ার্নিং দেবে।",
      b: "ইন্টারনেট না থাকলেও যাতে বিক্রি সচল থাকে সেজন্য ব্রাউজারের ইনডেক্সডডিবি ব্যবহার করে অফলাইন কিউ তৈরি করেছি। ইন্টারনেট ফিরলেই স্বয়ংক্রিয়ভাবে ইনভয়েসগুলো ব্যাকএন্ডে সিঙ্ক হয়ে যায়।",
      e: "To prevent terminal halt during internet outages, I engineered an IndexedDB offline queue. Cashiers continue billing locally, with sales cached locally. Upon network reconnection, a reconciliation worker flushes queued invoices sequentially to the backend. If inventory drops below zero due to offline concurrency, an audit anomaly is flagged for store management.",
      tip: "অফলাইন রেজিলিয়েন্সে কনফ্লিক্ট রেজোলিউশন ব্যাখ্যা করা অত্যন্ত গুরুত্বপূর্ণ।"
    },
    {
      lvl: "lvl3",
      q: "PTTABD পেমেন্ট ইন্টিগ্রেশনে সিকিউরিটি ও আইডেমপোটেন্সি ট্রেড-অফ কীভাবে নিশ্চিত করেছিলে?",
      m: "পেমেন্ট গেটওয়েতে বড় ঝুঁকি থাকে নেটওয়ার্ক ড্রপের কারণে ডাবল চার্জিং বা ফেক কলব্যাক। আমি বিকাশ গেটওয়ের জন্য ৩ স্তরের নিরাপত্তা দেই: (১) প্রতিটি পেমেন্ট ইনিশিয়েশনে একটি ক্রিপ্টোগ্রাফিক ইউনিক `orderToken` জেনারেট করি, (২) ব্যাকএন্ডে বিকাশ সার্ভারের আইপি ও সাইনড পে-লোড যাচাই করি, কোনো ফ্রন্টএন্ড প্যারামিটারকে বিশ্বাস করি না, এবং (৩) ডাটাবেজে পেমেন্ট স্টেটকে ট্রানজেকশন আইসোলেশনে 'PENDING' থেকে 'COMPLETED'-এ নিই। একই ওয়েবহুক দুইবার এলেও পূর্বের স্টেট চেক করে ডুপ্লিকেট কোর্স অ্যাক্টিভেশন রুখে দিই।",
      b: "পেমেন্টে ডাবল চার্জিং ও জালিয়াতি ঠেকাতে ইউনিক অর্ডার টোকেন, সার্ভার-টু-সার্ভার সিগনেচার ভেরিফিকেশন এবং ডাটাবেজ লেভেলে আইডেমপোটেন্ট ট্রানজেকশন নিশ্চিত করেছি।",
      e: "In PTTABD payment flows, I mitigated double-charging and spoofing via cryptographic orderTokens, server-to-server payload verification against bKash signature certificates, and state-machine transitions (INIT -> PENDING -> COMPLETED) inside atomic transactions, guaranteeing that duplicate webhook deliveries produce idempotent outcomes.",
      tip: "Idempotent State Machine আর্কিটেকচারাল প্রশ্নের স্ট্যান্ডার্ড উত্তর।"
    },
    {
      lvl: "lvl3",
      q: "আজ যদি Dokani প্রজেক্টটি আনলিমিটেড রিসোর্স দিয়ে নতুন করে বানাতে বলা হয়, তবে কী কী পরিবর্তন করবে?",
      m: "আমি ৩টি মূল আপগ্রেড করতাম: (১) ব্যাকএন্ড মনোলিথ থেকে ইভেন্ট-ড্রিভেন আর্কিটেকচারে যেতাম, যেখানে Apache Kafka বা RabbitMQ দিয়ে সেলস ইভেন্ট পাবলিশ হতো এবং অ্যানালিটিক্স ও ইনভেন্টরি আলাদা মাইক্রোসার্ভিস হিসেবে অ্যাসিনক্রোনাসলি প্রসেস হতো। (২) রিড ও রাইট আলাদা করতে CQRS প্যাটার্ন এবং রিড-অনলি রেপ্লিকা ব্যবহার করতাম যাতে পিক আওয়ারে ড্যাশবোর্ডের ভারী রিপোর্ট মূল পিওএস লেনদেনের গতি কমাতে না পারে। (৩) অফলাইন সিঙ্কের জন্য CRDT (Conflict-free Replicated Data Types) ব্যবহার করতাম যাতে মাল্টি-কাউন্টার মার্জিং স্বয়ংক্রিয়ভাবে ম্যাথমেটিক্যালি নিখুঁত হতো।",
      b: "আনলিমিটেড বাজেটে আমি কাফকা দিয়ে ইভেন্ট-ড্রিভেন মাইক্রোসার্ভিস তৈরি করতাম, পিক আওয়ারের জন্য CQRS ও রিড-রেপ্লিকা বসাতাম এবং অফলাইন সিঙ্ক নিখুঁত করতে CRDT অ্যালগরিদম ব্যবহার করতাম।",
      e: "With unrestricted resources, I would adopt: an event-driven architecture utilizing Apache Kafka for asynchronous sales stream ingestion; a CQRS pattern decoupling checkout writes from reporting reads via dedicated PostgreSQL read-replicas; and Conflict-free Replicated Data Types (CRDTs) for offline multi-terminal inventory reconciliation.",
      tip: "ইভেন্ট-ড্রিভেন আর্কিটেকচার, CQRS এবং CRDT সিনিয়র আর্কিটেক্ট পদের জন্য শ্রেষ্ঠ টার্ম।"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "ইন্টারভিউয়ার যদি সন্দেহ প্রকাশ করে: 'Dokani কি তোমার একা তৈরি নাকি কোনো টেমপ্লেট কপি করেছ? কীভাবে প্রমাণ করবে?'",
      m: "আমি আত্মবিশ্বাসের সাথে বলব: 'আমি আনন্দের সাথে আমার গিটহাব রিপোজিটরি, কমিট হিস্ট্রি এবং লাইভ সার্ভার আর্কিটেকচার স্ক্রিন শেয়ার করে দেখাতে পারি। আপনি লক্ষ্য করবেন যে কীভাবে প্রতিটি টেবিল ডিজাইন করা হয়েছে, কীভাবে বারকোড স্ক্যানার ইভেন্ট লিসেনার হ্যান্ডেল করা হয়েছে, কীভাবে Prisma-তে টেন্যান্ট ফিল্টার ইনজেক্ট করা হয়েছে এবং উবুন্টু ভিপিএসে Nginx কনফিগ লেখা হয়েছে। একটি তৈরি টেমপ্লেট কখনোই রিয়েল রিটেইলারদের কাস্টম বাকির খতিয়ান বা সাব-সেকেন্ড থার্মাল প্রিন্টিংয়ের প্রয়োজন মেটাতে পারে না। প্রতিটি লাইনের যৌক্তিকতা আমি কোড দেখিয়ে ব্যাখ্যা করতে প্রস্তুত।'",
      b: "আমি সরাসরি আমার গিটহাব কমিট হিস্ট্রি এবং লাইভ কোডবেস দেখিয়ে প্রমাণ করব। পুরো আর্কিটেকচার, কাস্টম লজিক ও সার্ভার কনফিগারেশন আমার নিজের তৈরি এবং যেকোনো লাইনের ব্যাখ্যা দিতে আমি প্রস্তুত।",
      e: "I welcome opening my GitHub commit history, terminal shell, and live codebase directly. You will see granular commits reflecting the iterative evolution: the custom barcode debounce event engine, the Prisma multi-tenant scoping layer, the thermal printer ESC/POS driver integration, and the Nginx configuration. Off-the-shelf templates cannot address the idiosyncratic realities of real-world retail.",
      tip: "কখনোই উত্তেজিত না হয়ে হাসিমুখে গিটহাব কমিট ও লাইভ কোড দেখানোর প্রস্তাব দেবে।"
    },
    {
      lvl: "situation",
      q: "ইন্টারভিউয়ার যদি বলে: 'তোমার Dokani প্রজেক্টের পুরো আর্কিটেকচার ডায়াগ্রাম হোয়াইটবোর্ডে বা স্ক্রিনে ড্র করে দেখাও'?",
      m: "আমি ৪টি স্পষ্ট লেয়ারে সিস্টেম ড্র করব: (১) **Client Layer:** Next.js PWA, কীবোর্ড শর্টকাট লিসেনার, থার্মাল প্রিন্টার ড্রাইভার। (২) **Gateway & Edge:** Cloudflare SSL, Nginx রিভার্স প্রক্সি, রেট লিমিটার ও সাবডোমেন রাউটার (`store.dokani.bip.sg`)। (৩) **Application Layer:** Node.js/Express ক্লাস্টার (PM2 পরিচালিত), JWT টেন্যান্ট মিডলওয়্যার, কার্ট ইঞ্জিন ও ইনভয়েস কন্ট্রোলার। (৪) **Data Persistence:** PostgreSQL রিলেশনাল ডাটাবেজ উইথ Prisma ORM, RLS পলিসি, এবং ক্যাশিং ও সেশন ম্যানেজমেন্টের জন্য Redis। প্রতিটি লেয়ারের ডাটা ফ্লো তীরচিহ্ন দিয়ে ব্যাখ্যা করব।",
      b: "হোয়াইটবোর্ডে ৪টি লেয়ার আঁকব: ক্লায়েন্ট (Next.js PWA), গেটওয়ে (Cloudflare ও Nginx), অ্যাপ্লিকেশন (Node.js ক্লাস্টার ও JWT মিডলওয়্যার) এবং ডাটা লেয়ার (PostgreSQL ও Redis)।",
      e: "I diagram four clean architectural tiers: Edge/Proxy (Cloudflare DNS, Nginx reverse proxy routing subdomains); Client (Next.js PWA with barcode listeners and thermal drivers); Application (Node.js/Express PM2 cluster enforcing tenant scoping); and Data (PostgreSQL multi-tenant schema with Prisma and Redis caching). I trace data packets from barcode scan to atomic commit.",
      tip: "ক্লিন টিয়ারড আর্কিটেকচার দ্রুত ড্র করার ক্ষমতা একজন সিস্টেম আর্কিটেক্টের প্রধান লক্ষণ।"
    },
    {
      lvl: "situation",
      q: "দোকানের মালিক অভিযোগ করল: 'আজকের ক্যাশ ড্রয়ারের টাকার সাথে ড্যাশবোর্ডের সেলস ম্যাচ করছে না!' কীভাবে ইনভেস্টিগেট করবে?",
      m: "আমি ৪টি ধাপে তদন্ত করব: (১) **Payment Method Breakdown:** ড্যাশবোর্ডে আজকের মোট বিক্রির মধ্যে ক্যাশ কত, বিকাশ কত, কার্ড কত এবং বাকিতে কত বিক্রি হয়েছে তা আলাদা করব; প্রায়ই ক্যাশিয়াররা বিকাশের টাকা ক্যাশে মিলিয়ে ফেলে। (২) **Void / Return Audit Log:** দেখব কোনো সেলস ইনভয়েস রিফান্ড বা ক্যানসেল করা হয়েছে কিনা। (৩) **Petty Cash Expenses:** দোকান থেকে দিনের বেলা কোনো চা-নাস্তা বা ঝাড়ু কেনার খরচ ক্যাশ ড্রয়ার থেকে দেওয়া হয়েছিল কিনা যা সিস্টেমে এক্সপেন্স হিসেবে এন্ট্রি দেওয়া হয়নি। (৪) **Audit Trail:** ডাটাবেজের `InvoicePayment` টেবিলে টাইমস্ট্যাম্প ও ক্যাশিয়ার আইডি মিলিয়ে রিকনসিলিয়েশন করে অসঙ্গতি বের করে দেব।",
      b: "প্রথমে পেমেন্ট মেথড (ক্যাশ, বিকাশ, বাকি) আলাদা করব, রিফান্ড হিস্ট্রি ও ড্রয়ার থেকে হওয়া অন্যান্য খরচ যাচাই করব এবং ডাটাবেজ অডিট লগ মিলিয়ে সঠিক হিসাব বের করব।",
      e: "I execute a 4-step financial reconciliation: decompose total sales into payment methods (cash, bKash, card, store credit); inspect the Void/Refund audit log; cross-check petty cash daily expense slips taken directly from the drawer; and inspect database InvoicePayment timestamps to isolate exact discrepancies per cashier shift.",
      tip: "টেকনিক্যাল নলেজের পাশাপাশি ক্যাশ ড্রয়ার ও ব্যবসার প্র্যাকটিক্যাল জ্ঞান তুলে ধরা।"
    },
    {
      lvl: "situation",
      q: "প্রোডাকশন রিলিজের পরই Dokani-তে একটি ক্রিটিক্যাল বাগ পাওয়া গেল যা লাইভ স্টোরে প্রভাব ফেলছে—কীভাবে ট্যাকল করবে?",
      m: "আমার তাৎক্ষণিক পদক্ষেপ: (১) প্যানিক না করে আগে সিস্টেমকে স্টেবল করা—যদি নতুন কোডের কারণে হয় তবে ৩০ সেকেন্ডের মধ্যে পূর্বের স্টেবল ভার্সনে `git rollback` করা। (২) ক্ষতিগ্রস্ত দোকানদারকে দ্রুত ও পেশাদারভাবে আশ্বস্ত করা যে আমরা সমস্যাটি চিহ্নিত করেছি। (৩) লোকাল এনভায়রনমেন্টে বাগটি আইসোলেট করে ফিক্স করা এবং একটি রিগ্রেশন টেস্ট লেখা যাতে ভবিষ্যতে এটি আর না ঘটে। (৪) টেস্ট পাস করার পর স্টেজিংয়ে ভেরিফাই করে হটফিক্স ডিপ্লয় করা এবং ডাটাবেজে কোনো অসঙ্গতি থাকলে ম্যানুয়াল স্ক্রিপ্ট দিয়ে সংশোধন করা।",
      b: "প্রথমে দ্রুত স্টেবল ভার্সনে রোলব্যাক করে সার্ভিস স্বাভাবিক করব। এরপর বাগটি লোকালি ফিক্স করে টেস্ট লিখে হটফিক্স ডিপ্লয় করব এবং ক্ষতিগ্রস্ত ডাটা থাকলে তা সংশোধন করব।",
      e: "Immediate triage protocol: restore uptime within 30 seconds via Git rollback if caused by a faulty deployment; communicate transparently with affected merchants; isolate the root cause in local staging; write an automated regression test; and apply the validated hotfix alongside corrective database data reconciliation scripts.",
      tip: "Rollback first, communicate clearly, write regression test—এই তিন ধাপ গোল্ডেন রুল।"
    },
    {
      lvl: "situation",
      q: "ইন্টারভিউয়ার যদি চ্যালেঞ্জ করে: 'হাই-কনকারেন্সির জন্য Go বা Java ব্যবহার না করে Node.js কেন বেছে নিলে?'",
      m: "আমি যুক্তি দিয়ে ডিফেন্ড করব: 'Go বা Java অত্যন্ত শক্তিশালী, কিন্তু আমাদের সিস্টেমের আসল পরিচয় হলো I/O-bound Web Application, CPU-bound গণনামূলক ইঞ্জিন নয়। একটি POS প্ল্যাটফর্মে বেশিরভাগ কাজ হলো ডাটাবেজ থেকে পড়া ও লেখা, নেটওয়ার্ক রিকোয়েস্ট পাঠানো এবং JSON পাস করা—যেখানে Node.js-এর নন-ব্লকিং ইভেন্ট লুপ অসাধারণ গতি দেয়। এছাড়া একক ভাষায় (TypeScript) ফুল-স্ট্যাক কোডবেস বজায় রাখায় ডেভেলপমেন্ট স্পিড বহুগুণ বেশি ছিল। যেখানে গভীর পারফরম্যান্স লেগেছে (যেমন ইনভেন্টরি ট্রানজেকশন), সেখানে আমরা ডাটাবেজ স্তরে PostgreSQL-এর সি-লেভেল ইঞ্জিনকে দায়িত্ব দিয়েছি। ফলে আর্কিটেকচারালি কোনো ঘাটতি হয়নি।'",
      b: "আমাদের অ্যাপ্লিকেশনটি I/O বাউন্ড হওয়ায় নোডজেএস এর ইভেন্ট লুপ অত্যন্ত কার্যকর। তাছাড়া ফুল-স্ট্যাকে একই ভাষা ব্যবহার করায় উন্নয়ন দ্রুত হয়েছে এবং ভারী কাজের জন্য আমরা পোস্টগ্রেসের নিজস্ব ইঞ্জিন ব্যবহার করেছি।",
      e: "Our workload is fundamentally I/O-bound (database CRUD, network I/O, JSON serialization) rather than CPU-bound heavy number crunching. Node.js's non-blocking event loop excels here with minimal memory footprint. Unifying on TypeScript accelerated velocity, while heavy concurrency bottlenecks (atomic inventory locking) were delegated down to PostgreSQL's native C engine.",
      tip: "I/O bound vs CPU bound পার্থক্য ব্যাখ্যা করে গো বনাম নোডজেএস যুক্তি দেওয়া সর্বোচ্চ মানের উত্তর।"
    },

    // --- REAL-WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani প্রজেক্টের ক্রমান্বয়ে বড় হওয়া (Continuous Product Evolution) কীভাবে ইন্টারভিউতে তুলে ধরবে?",
      m: "আমি বলব: 'Dokani কোনো ওভারনাইট প্রজেক্ট নয়, এটি বাস্তব ক্লায়েন্ট ফিডব্যাকের ভিত্তিতে বিবর্তিত হয়েছে। সংস্করণ ১.০-এ এটি ছিল শুধুমাত্র একটি সিঙ্গেল-দোকানের সাধারণ বিলিং টুল। সংস্করণ ২.০-এ আমরা মাল্টি-টেন্যান্সি ও সাবডোমেন রাউটিং যুক্ত করি যাতে শত শত দোকান একই প্ল্যাটফর্মে আসতে পারে। সংস্করণ ৩.০-এ আমরা কাস্টমার বাকির খতিয়ান ও SMS নোটিফিকেশন যুক্ত করি। এবং বর্তমান সংস্করণে আমরা মাল্টি-ব্রাঞ্চ ইনভেন্টরি ট্রান্সফার এবং কীবোর্ড-ফার্স্ট বিলিং ইঞ্জিন যোগ করেছি। এই ধারাবাহিক বিবর্তন প্রমাণ করে আমি বাস্তব ব্যবহারকারীর প্রয়োজনের সাথে সিস্টেম স্কেল করতে জানি।'",
      b: "দোকানি সময়ের সাথে ধাপে ধাপে বড় হয়েছে—সিঙ্গেল বিলিং থেকে মাল্টি-টেন্যান্ট ক্লাউড SaaS, বাকির খতিয়ান এবং সবশেষে মাল্টি-ব্রাঞ্চ স্টক ম্যানেজমেন্ট। বাস্তব ব্যবহারকারীর প্রয়োজন অনুযায়ী সিস্টেমের এই বিবর্তন তুলে ধরব।",
      e: "Dokani evolved iteratively based on production merchant telemetry: v1.0 was a single-store checkout prototype; v2.0 introduced multi-tenant PostgreSQL schema isolation and wildcard subdomain routing; v3.0 added automated customer credit ledgers with SMS integration; and the current iteration features multi-branch inventory transfers and keyboard-first cashier shortcuts.",
      tip: "ইটারেটিভ প্রোডাক্ট গ্রোথ ব্যাখ্যা করলে বোঝা যায় তুমি রিয়েল-ওয়ার্ল্ড সফটওয়্যার বানাতে পারো।"
    },
    {
      lvl: "realworld",
      q: "সুপারশপের ক্যাশিয়ারদের সাথে বসে ইউজার টেস্টিংয়ের অভিজ্ঞতা থেকে Dokani-তে কী পরিবর্তন এনেছিলে?",
      m: "আমি সরাসরি সুপারশপের কাউন্টারে ক্যাশিয়ারদের পাশে বসে তাদের কাজ পর্যবেক্ষণ করেছি। দেখলাম যে ক্যাশিয়াররা মাউস স্পর্শ করতে বিরক্ত বোধ করে কারণ এক হাতে থাকে বারকোড গান আর অন্য হাতে প্রোডাক্ট। মাউস দিয়ে 'Add to Cart' বা 'Pay' বাটনে ক্লিক করতে গিয়ে প্রতি কাস্টমারে ৫-১০ সেকেন্ড নষ্ট হচ্ছিল। এই বাস্তব অভিজ্ঞতা থেকে আমি পুরো POS ইন্টারফেসে ১০০% কীবোর্ড শর্টকাট চালু করি: F1 চাপলে বারকোড ফোকাস, F2 চাপলে ডিসকাউন্ট, Enter চাপলে পেমেন্ট উইন্ডো এবং স্পেসবার চাপলে ইনভয়েস প্রিন্ট। এর ফলে ক্যাশিয়ারদের কাজের গতি তিন গুণ বৃদ্ধি পেয়েছিল।",
      b: "কাউন্টার ক্যাশিয়ারদের কাজের ধরণ দেখে মাউসের ওপর নির্ভরতা সম্পূর্ণ দূর করি। F1, F2 এবং এন্টার কি দিয়ে সম্পূর্ণ কীবোর্ড-চালিত বিলিং সিস্টেম তৈরি করায় চেকআউট গতি তিন গুণ বাড়ে।",
      e: "Observing supermarket cashiers in live environments revealed that mouse interactions caused 5–10 second latency per transaction, as cashiers held barcode scanners in one hand. In response, I engineered a keyboard-first POS flow: F1 to focus scanner, F2 for line-item discounts, Enter for tender window, and Space to print thermal slips. Cashier throughput tripled.",
      tip: "বাস্তব ফিল্ড ভিজিট ও কীবোর্ড-ফার্স্ট ইউজার ইন্টারফেসের গল্প যে কোনো ইন্টারভিউয়ারকে মুগ্ধ করবে।"
    },
    {
      lvl: "realworld",
      q: "গিট পুশ থেকে লাইভ সার্ভারে Dokani ডিপ্লয়মেন্টের স্টেপ-বাই-স্টেপ প্রোডাকশন সিআই/সিডি পাইপলাইন কীভাবে ব্যাখ্যা করবে?",
      m: "আমাদের পাইপলাইন সম্পূর্ণ অটোমেটিক: (১) ডেভেলপার যখন `main` ব্রাঞ্চে গিট পুশ করে, তখন GitHub Actions ট্রিগার হয়। (২) গিটহাব রানারে ESLint, Prettier এবং Jest টেস্ট রান করে। (৩) টেস্ট পাস হলে SSH-এর মাধ্যমে উবুন্টু VPS-এ কানেক্ট হয়। (৪) সার্ভারে লেটেস্ট কোড পুল করে `npm ci --production` এবং `npx prisma migrate deploy` চালায় যাতে কোনো ডাটাবেজ মাইগ্রেশন থাকলে অ্যাপ্লাই হয়। (৫) এরপর `pm2 reload ecosystem.config.js` চালিয়ে জিরো-ডাউনটাইম রোলিং রিলোড সম্পন্ন করে। কোনো স্টেপে এরর আসলে তাৎক্ষণিক টেলিগ্রাম বট এলার্ট পাঠায়।",
      b: "গিটহাবে পুশ করলে স্বয়ংক্রিয়ভাবে টেস্ট রান হয়, সার্ভারে কোড পুল হয়ে প্রিজমা মাইগ্রেশন চলে এবং পিএম২ এর মাধ্যমে জিরো-ডাউনটাইমে রিলোড হয়। পুরো প্রক্রিয়াটি সম্পূর্ণ স্বয়ংক্রিয়।",
      e: "Our CI/CD pipeline runs autonomously: pushing to main triggers GitHub Actions; linters and unit tests execute; on green builds, an SSH action connects to Ubuntu VPS; executes git pull, npm ci, and npx prisma migrate deploy; finishes with PM2 zero-downtime rolling reload; and dispatches deployment status notifications via Telegram webhooks.",
      tip: "Prisma migrate deploy এবং PM2 zero-downtime rolling reload উল্লেখ করা বাধ্যতামূলক।"
    },
    {
      lvl: "realworld",
      q: "Dokani প্রোডাকশন ডাটাবেজে কোনো ডাউনটাইম ছাড়া কীভাবে সেইফ স্কিমা মাইগ্রেশন সম্পন্ন করো?",
      m: "লাইভ রিটেইল দোকানে দিনে ডাটাবেজ ডাউন করা সম্পূর্ণ নিষিদ্ধ। আমরা ৩টি নিয়ম মেনে চলি: (১) **Backward Compatible Migrations:** কখনোই সরাসরি কলাম রিনেম বা ডিলিট করি না; প্রথমে নতুন কলাম যোগ করি, কোড ডিপ্লয় করি, পুরনো ডাটা ব্যাকফিল করি এবং কিছুদিন পর পুরনো কলাম ড্রপ করি (Expand and Contract Pattern)। (২) **Off-Peak Execution:** মাইগ্রেশন সবসময় রাত ২টা-৩টার দিকে অফ-পিক আওয়ারে চালাই। (৩) **Pre-Migration Backup:** মাইগ্রেশন চালানোর আগে `pg_dump` দিয়ে অটোমেটেড ফুল ডাটাবেজ স্ন্যাপশট নিয়ে রাখি যাতে কোনো আনএক্সপেক্টেড এরর আসলে তাৎক্ষণিক ১ মিনিটে রোলব্যাক করা যায়।",
      b: "প্রোডাকশনে ডাটা লস ছাড়া মাইগ্রেশন করতে এক্সপ্যান্ড অ্যান্ড কন্ট্রাক্ট প্যাটার্ন মেনে চলি। অফ-পিক আওয়ারে কাজ করি এবং মাইগ্রেশনের পূর্বে ফুল ডাটাবেজ ব্যাকআপ নিশ্চিত করি।",
      e: "We enforce zero-downtime database migrations via the Expand and Contract pattern: add columns non-destructively, deploy application code writing to both, backfill legacy data, and deprecate old columns in subsequent releases. Migrations run during off-peak hours preceded by automated pg_dump point-in-time snapshots.",
      tip: "Expand and Contract Pattern ডেটাবেজ মাইগ্রেশনের বিশ্বমানের প্র্যাকটিস।"
    },
    {
      lvl: "realworld",
      q: "টেকনিক্যাল ফিচারকে কীভাবে নন-টেকনিক্যাল বিজনেস ওনার বা ক্লায়েন্টের ভাষায় ভ্যালু হিসেবে উপস্থাপন করবে?",
      m: "একজন ব্যবসায়ী কোড বা আর্কিটেকচার বোঝে না, সে বোঝে সময়, টাকা এবং মানসিক শান্তি। আমি টেকনিক্যাল ফিচারকে সরাসরি ব্যবসায়িক ভাষায় অনুবাদ করি: যেমন 'PostgreSQL Row-Level Locking'-এর বদলে বলি 'দোকানের ক্যাশিয়াররা একই প্রোডাক্ট দুইবার বিক্রি করে কোনো গণ্ডগোল বা লোকসান তৈরি করতে পারবে না'। 'IndexedDB Offline Caching'-এর বদলে বলি 'ইন্টারনেট চলে গেলেও আপনার দোকানের বিক্রি এক সেকেন্ডের জন্যও থামবে না'। এবং 'Cloudflare CDN & PM2 Clustering'-এর বদলে বলি 'ঈদের কেনাকাটায় যতই ভিড় হোক, সফটওয়্যার কখনোই হ্যাং করবে না'।",
      b: "টেকনিক্যাল কথা না বলে ব্যবসায়ীদের ভাষায় বলি—যেমন ইন্টারনেট না থাকলেও বিক্রি চলবে, ঈদের ভিড়েও সিস্টেম স্লো হবে না এবং কোনো ভুল হিসাবে দোকানের টাকা লোকসান হবে না।",
      e: "Non-technical stakeholders care about revenue velocity, risk reduction, and peace of mind. I translate technical primitives into commercial outcomes: PostgreSQL Row Locks become 'guaranteed protection against selling items you don't physically have'; IndexedDB offline queuing translates to 'uninterrupted counter sales even during total internet blackout'; and PM2 clustering becomes 'zero terminal crashes during festival shopping rushes.'",
      tip: "টেকনিক্যাল জটিলতাকে সরল ব্যবসায়িক সুবিধায় রূপান্তর করা ইঞ্জিনিয়ারিং লিডারদের সেরা গুণ।"
    }
  ]
};
