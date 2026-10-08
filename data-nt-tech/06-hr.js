// NT Tech Innovation — 06. HR, Behavioral & Technical Leadership Mastery
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.hr = {
  id: "hr",
  title: "NT Tech HR & Behavioral Leadership",
  badge: "STAR Method · Project Pitch · Outage Response · Culture Fit",
  icon: "🎯",
  topics: [
    {
      id: "best-project-pitch",
      name: "Pitching Your Best Project (STAR Method)",
      desc: "Presenting Dokani POS / PTTABD / Lakdhanavi using Situation, Task, Action, Result framework",
      items: [
        {
          lvl: "lvl1",
          q: "ইন্টারভিউতে 'Tell me about yourself' বা 'তোমার পরিচয় দাও' কীভাবে আকর্ষণীয়ভাবে উপস্থাপন করবে?",
          m: "শুরুতেই ব্যক্তিগত জীবন নয়, সরাসরি প্রফেশনাল ভ্যালু তুলে ধরব: 'আমি একজন Full-Stack Software Engineer, যার মূল দক্ষতা React/Next.js, Node.js/Express, PostgreSQL, Docker এবং Linux DevOps-এ। গত কয়েক বছর ধরে আমি হাই-পারফরম্যান্স মাল্টি-টেন্যান্ট SaaS এবং এন্টারপ্রাইজ সিস্টেম তৈরি করছি। আমার তৈরি ফ্ল্যাগশিপ প্রজেক্ট হলো **Dokani POS & ERP SaaS (`https://dokani.bip.sg`)**, যেখানে আমি এককভাবে ফ্রন্টএন্ড, ব্যাকএন্ড, রো-লেভেল সিকিউরিটি ও লিনাক্স হোস্টিং আর্কিটেকচার করেছি। আমি স্কেলযোগ্য সিস্টেম এবং ক্লিন কোড তৈরিতে গভীর প্যাশনেট এবং NT Tech Innovation-এর ইঞ্জিনিয়ারিং টিমে অবদান রাখতে অত্যন্ত আগ্রহী।'",
          b: "নিজের পরিচয়ে প্রফেশনাল পরিচয়, মূল টেকনোলজি স্ট্যাক (Next.js, Node.js, PostgreSQL, Docker) এবং বাস্তব প্রজেক্টের (Dokani POS) অর্জন সংক্ষেপে তুলে ধরে কোম্পানির প্রতি আগ্রহ প্রকাশ করা সবচেয়ে কার্যকর উপায়।",
          e: "I am a Full-Stack Software Engineer specializing in scalable web ecosystems built on React/Next.js, Node.js, TypeScript, PostgreSQL, and Linux DevOps. I focus on building high-throughput, multi-tenant SaaS platforms—most notably Dokani POS & ERP (https://dokani.bip.sg), where I engineered the architecture across sub-second barcode checkout, atomic inventory decrements, and automated VPS hosting. I am eager to bring this craftsmanship to NT Tech Innovation.",
          tip: "৯০ সেকেন্ডের মধ্যে উত্তর শেষ করবে এবং সরাসরি প্রজেক্টের লিঙ্কের কথা উল্লেখ করবে।"
        },
        {
          lvl: "lvl2",
          q: "STAR মেথড (Situation, Task, Action, Result) ব্যবহার করে Dokani POS প্রজেক্টকে কীভাবে প্রেজেন্ট করবে?",
          m: "**Situation:** বাংলাদেশের সাধারণ রিটেইল শপ ও সুপারশপগুলো অ্যানালগ খাতা বা ধীরগতির ক্র্যাশ-প্রবণ সফটওয়্যারে কাজ করত, যেখানে কাউন্টারে দীর্ঘ লাইন ও বকেয়া টাকার হিসাব গরমিল হতো। **Task:** আমার দায়িত্ব ছিল এমন একটি আধুনিক মাল্টি-টেন্যান্ট ক্লাউড POS সিস্টেম বানানো যা অতি দ্রুত বারকোড রিড করবে, অফলাইনেও ডাটা ধরে রাখবে এবং জিরো-ডাউনটাইমে চলবে। **Action:** আমি Next.js দিয়ে অপটিমাইজড ফ্রন্টএন্ড, Node.js ও PostgreSQL দিয়ে রো-লেভেল অ্যাটোমিক স্টক ট্রানজেকশন এবং Ubuntu VPS-এ Nginx ও PM2 দিয়ে জিরো-ডাউনটাইম ডিপ্লয়মেন্ট সেট করি। **Result:** সিস্টেমটি সফলভাবে লাইভ হয় (`dokani.bip.sg`), চেকআউট টাইম ১ সেকেন্ডের নিচে নেমে আসে এবং কোনো ওভারসেলিং ছাড়া শত শত দোকানের হাজার হাজার লেনদেন নির্বিঘ্নে প্রসেস হচ্ছে।",
          b: "স্টার মেথডে আমরা সমস্যার প্রেক্ষাপট (কাউন্টারে ধীরগতি ও হিসাবের গরমিল), আমার দায়িত্ব (দ্রুতগতির ক্লাউড পিওএস তৈরি), আমার পদক্ষেপ (নেক্সটজেএস, পোস্টগ্রেস অ্যাটোমিক ট্রানজেকশন ও ভিপিএস ডিপ্লয়মেন্ট) এবং বাস্তব ফলাফল (১ সেকেন্ডে চেকআউট ও শূন্য ওভারসেলিং) তুলে ধরি।",
          e: "Using the STAR method: Situation: Retailers suffered from slow checkout terminals and inventory leakage. Task: Architect a responsive, multi-tenant SaaS POS handling rapid barcode streaming with zero overselling. Action: I built an O(1) React cart engine, enforced database-level atomic decrements in PostgreSQL via Prisma, and set up an automated CI/CD pipeline to Ubuntu VPS behind Cloudflare. Result: Dokani went live with sub-second billing latencies and zero inventory anomalies.",
          tip: "মেট্রিক্স (যেমন sub-second billing, zero overselling) উল্লেখ করলে উত্তরের বিশ্বাসযোগ্যতা বহুগুণ বেড়ে যায়।"
        },
        {
          lvl: "lvl3",
          q: "Dokani-তে তোমার নেওয়া সবচেয়ে কঠিন টেকনিক্যাল ডিসিশন (Hardest Architectural Trade-off) কী ছিল এবং কেন?",
          m: "সবচেয়ে কঠিন সিদ্ধান্ত ছিল: **MongoDB নাকি PostgreSQL বেছে নেওয়া?** প্রজেক্টের শুরুতে বিভিন্ন ধরনের রিটেইল প্রোডাক্টের জন্য স্কিমাহীন MongoDB বিবেচনা করা হয়েছিল। কিন্তু আমি গভীরভাবে বিশ্লেষণ করে দেখলাম যে একটি POS সিস্টেমে ইনভেন্টরি স্টক ডিক্রিমেন্টে রেস কন্ডিশন আটকানো এবং কাস্টমার-সাপ্লায়ার লেজারে কঠোর রেফারেন্সিয়াল ইন্টিগ্রিটি রক্ষা করা সবচেয়ে বড় অগ্রাধিকার। তাই আমি NoSQL-এর মোহ ত্যাগ করে **PostgreSQL** বেছে নিয়েছিলাম এবং পোস্টগ্রেসের `JSONB` ফিচার ব্যবহার করে আনস্ট্রাকচার্ড প্রোডাক্ট স্পেসিফিকেশন হ্যান্ডেল করেছিলাম। এটি দীর্ঘমেয়াদে ডাটা করাপশন শূন্যে নামিয়ে এনেছিল।",
          b: "সবচেয়ে কঠিন সিদ্ধান্ত ছিল মঙ্গোডিবির বদলে পোস্টগ্রেস বেছে নেওয়া। রিটেইল ব্যবসার অর্থনৈতিক হিসাবের নির্ভুলতা এবং স্টকের রেস কন্ডিশন ঠেকাতে রিলেশনাল ডাটাবেজের কঠোর এসিড ট্রানজেকশন অপরিহার্য ছিল, যা পরবর্তীতে সিস্টেমকে শতভাগ নিরাপদ প্রমাণ করেছে।",
          e: "The most demanding architectural decision was choosing PostgreSQL over MongoDB. While document stores offered fluid schemas for product catalogs, financial ledgers and concurrent stock decrements strictly required row-level locking (SELECT FOR UPDATE) and rigid ACID constraints. I chose PostgreSQL, using JSONB columns for dynamic SKU attributes, preserving both relational rigor and schema agility.",
          tip: "কেন অন্য টেকনোলজি বাদ দিয়েছ তা যুক্তি দিয়ে ব্যাখ্যা করা টেক লিডদের সবচেয়ে প্রিয় প্রশ্ন।"
        },
        {
          lvl: "situation",
          q: "ইন্টারভিউয়ার যদি জিজ্ঞেস করে: 'Dokani কি তোমার একা তৈরি করা নাকি টিম ছিল? একা তৈরি করলে কীভাবে এত বড় সিস্টেম ম্যানেজ করলে?'",
          m: "আমার উত্তর হবে: 'Dokani প্রজেক্টের সম্পূর্ণ আর্কিটেকচার, ফুল-স্ট্যাক কোডিং, ডাটাবেজ মডেলিং এবং লিনাক্স সার্ভার ডিপ্লয়মেন্ট আমি একা এন্ড-টু-এন্ড হ্যান্ডেল করেছি। তবে একজন পূর্ণাঙ্গ ইঞ্জিনিয়ার হিসেবে আমি কাজটিকে বড় মনোলিথ না রেখে মডুলার ফিচার-বেজড ভাগে ভাগ করে নিয়েছিলাম (যেমন: Auth Module, POS Module, Inventory, Billing)। আমি গিটহাবে নিজেই ইস্যু ও মাইলস্টোন ট্র্যাক করেছি, স্বয়ংক্রিয় সিআই/সিডি দিয়ে ডিপ্লয় করেছি এবং বাস্তব দোকানদারদের সাথে বসে ইউজার টেস্টিং নিয়েছি। এই অভিজ্ঞতা আমাকে শুধু একজন ডেভেলপার নয়, পুরো প্রোডাক্টের ওনারশিপ নিতে শিখিয়েছে।'",
          b: "আমি শুরু থেকে শেষ পর্যন্ত পুরো সিস্টেমটির আর্কিটেকচার, কোডিং এবং ডেভঅপ্স পরিচালনা করেছি। কাজটিকে ছোট ছোট ফিচারে ভাগ করে গিটহাব মাইলস্টোন ও স্বয়ংক্রিয় সিআই/সিডি ব্যবহার করায় পুরো প্রজেক্টটি সুশৃঙ্খলভাবে একা সম্পন্ন করা সম্ভব হয়েছে।",
          e: "I took end-to-end engineering ownership of Dokani—spanning full-stack development, database schema modeling, and Linux DevOps. To manage cognitive load, I decomposed the application into modular feature slices (Auth, Barcode Engine, Billing, Ledgers) managed via GitHub milestones and automated CI/CD pipelines. This demonstrates my capability to take ambiguous requirements and deliver robust production platforms independently.",
          tip: "Product Ownership শব্দটি সিনিয়র ডেভেলপারদের অন্যতম বড় গুণ।"
        },
        {
          lvl: "realworld",
          q: "Dokani-র বাইরে তোমার অন্যান্য প্রজেক্ট (যেমন PTTABD LMS বা Lakdhanavi ERP) নিয়ে কীভাবে কথা বলবে?",
          m: "আমি বলব: 'Dokani-র পাশাপাশি আমি **PTTABD LMS প্ল্যাটফর্ম** তৈরি করেছি, যেখানে হাজার হাজার শিক্ষার্থীর জন্য bKash Tokenized Payment গেটওয়ে, ভিডিও এনরোলমেন্ট এবং কোর্স এক্সেস কন্ট্রোল আর্কিটেকচার করেছি। এছাড়া **Lakdhanavi পাওয়ার প্ল্যান্টের ইন্টারনাল সিস্টেমে** মেটেরিয়াল ট্র্যাকিং ও সাপ্লাই চেইন রিপোর্ট অটোমেশনে কাজ করেছি। প্রতিটি প্রজেক্ট আমাকে আলাদা আলাদা চ্যালেঞ্জ শিখিয়েছে—Dokani শিখিয়েছে হাই-স্পিড কনকারেন্সি ও মাল্টি-টেন্যান্সি, PTTABD শিখিয়েছে পেমেন্ট ওয়েবhooks ও রোলব্যাক, আর Lakdhanavi শিখিয়েছে এন্টারপ্রাইজ প্রসেস অটোমেশন।'",
          b: "দোকানির পাশাপাশি পিটিটিএবিডি এলএমএসে বিকাশ পেমেন্ট ইন্টিগ্রেশন ও কোর্স ব্যবস্থাপনা এবং লাকধানাবিতে সাপ্লাই চেইন অটোমেশনে কাজের অভিজ্ঞতা রয়েছে। প্রতিটি প্রজেক্ট বিভিন্ন জটিল চ্যালেঞ্জ সমাধান করতে আমার দক্ষতা বাড়িয়েছে।",
          e: "Beyond Dokani, I engineered the PTTABD LMS platform, managing high-volume student enrollments, Nodemailer dispatchers, and bKash Tokenized Checkout APIs. I also contributed to Lakdhanavi's internal operations for material requisition and asset monitoring. These diverse domains reinforced my expertise across fintech integrations, concurrency, and enterprise workflows.",
          tip: "তিনটি প্রজেক্টের আলাদা আলাদা লার্নিং সামারি তুলে ধরলে তোমার অভিজ্ঞতার গভীরতা প্রকাশ পায়।"
        }
      ]
    },
    {
      id: "why-nt-tech-fit",
      name: "Why NT Tech Innovation & Cultural Fit",
      desc: "Company research, alignment with product vision, passion for software engineering, long-term goals",
      items: [
        {
          lvl: "lvl1",
          q: "কেন তুমি NT Tech Innovation-এ যোগ দিতে চাও? (Why NT Tech Innovation?)",
          m: "আমি NT Tech Innovation-এর কাজের ধরণ ও ইঞ্জিনিয়ারিং কালচার দীর্ঘদিন ধরে পর্যবেক্ষণ করছি। NT Tech যে ধরনের আধুনিক ওয়েব প্রোডাক্ট, এন্টারপ্রাইজ স্কেলেবিলিটি এবং হাই-পারফরম্যান্স সলিউশন তৈরি করে—তা সরাসরি আমার স্কিলসেটের (React/Next.js, Node.js, PostgreSQL, Docker, Linux) সাথে শতভাগ সামঞ্জস্যপূর্ণ। আমি এমন একটি প্রগ্রেসিভ টিমে কাজ করতে চাই যেখানে কঠিন ইঞ্জিনিয়ারিং চ্যালেঞ্জ সলভ করা হয় এবং যেখানে আমি আমার প্রজেক্টের অভিজ্ঞতা দিয়ে সরাসরি কোম্পানির গ্রোথে অবদান রাখতে পারি ও নিজে একজন সিনিয়র ইঞ্জিনিয়ার হিসেবে পরিণত হতে পারি।",
          b: "এনটি টেক ইনোভেশনের আধুনিক প্রযুক্তিগত দৃষ্টিভঙ্গি ও স্কেলেবল পণ্য তৈরির সংস্কৃতি আমাকে গভীরভাবে অনুপ্রাণিত করে। আমার ফুল-স্ট্যাক ও ডেভঅপ্স দক্ষতা দিয়ে কোম্পানির চলমান প্রকল্পগুলোতে তাৎক্ষণিক ভূমিকা রাখতে এবং একটি দক্ষ টিমের সাথে দীর্ঘমেয়াদে কাজ করতে আমি অত্যন্ত আগ্রহী।",
          e: "I want to join NT Tech Innovation because of your focus on building modern, high-impact software products with high architectural rigor. My core competencies in Next.js, Node.js, PostgreSQL, and Linux DevOps align perfectly with your technical expectations. I thrive in engineering teams that prioritize performance and clean code, and I am excited to deliver reliable business solutions at NT Tech.",
          tip: "কোম্পানির নাম এবং তাদের আধুনিক ইঞ্জিনিয়ারিং কালচারের প্রশংসা স্বাভাবিকভাবে করবে।"
        },
        {
          lvl: "lvl2",
          q: "তোমার ক্যারিয়ারের পরবর্তী ২-৩ বছরের লক্ষ্য কী? (Where do you see yourself in 3 years?)",
          m: "পরবর্তী ২-৩ বছরে আমি নিজেকে একজন **Lead / Senior Full-Stack Architect** হিসেবে প্রতিষ্ঠিত করতে চাই। আমি শুধু ফিচার ডেভেলপমেন্টে সীমাবদ্ধ থাকতে চাই না; বরং জটিল সিস্টেম ডিজাইন, ডাটাবেজ অপটিমাইজেশন, ক্লাউড ইনফ্রাস্ট্রাকচার স্কেলিং এবং জুনিয়র ডেভেলপারদের মেন্টরশিপ দিয়ে একটি হাই-পারফর্মিং টিম গড়ে তুলতে চাই। আমি চাই NT Tech-এর এমন কিছু ফ্ল্যাগশিপ প্রোডাক্টের পেছনে আমার ভূমিকা থাকুক যা লাখ লাখ ব্যবহারকারী নির্ভরযোগ্যতার সাথে ব্যবহার করছে।",
          b: "আগামী ২-৩ বছরে আমি একজন সিনিয়র সফটওয়্যার আর্কিটেক্ট হিসেবে নিজেকে প্রতিষ্ঠিত করতে চাই, যেখানে জটিল আর্কিটেকচার ডিজাইন, সার্ভার স্কেলিং এবং টিমকে টেকনিক্যাল নেতৃত্ব দিয়ে কোম্পানির মূল প্রোডাক্টগুলোকে এগিয়ে নিতে পারব।",
          e: "Over the next 2-3 years, my goal is to evolve into a Senior Software Architect and Technical Lead. I aspire to drive core system designs, optimize mission-critical databases, champion DevOps best practices, and mentor junior engineers, driving product milestones that power high-concurrency enterprise scale.",
          tip: "কোম্পানির সাথে নিজের গ্রোথকে কানেক্ট করা সেরা উত্তর।"
        },
        {
          lvl: "lvl3",
          q: "তোমার সবচেয়ে বড় শক্তি (Strength) এবং এমন একটি দুর্বলতা (Weakness) যা তুমি উন্নতির চেষ্টা করছ?",
          m: "**Strength:** আমার সবচেয়ে বড় শক্তি হলো 'Ownership & Rapid Problem Solving'। যেকোনো জটিল সমস্যা—তা ফ্রন্টএন্ডে হোক, ব্যাকএন্ডে হোক বা প্রোডাকশন সার্ভার ক্র্যাশ হোক—আমি রুট কজ পর্যন্ত গিয়ে স্বয়ংক্রিয় সমাধান বের করতে পারি। **Weakness:** অতীতে আমি সবকিছু নিখুঁত বা 'Over-engineered' করার চেষ্টা করতাম, যা অনেক সময় অতিরিক্ত সময় নিত। এখন আমি 'Agile MVP Mindset' অনুসরণ করি—প্রথমে সলিড ও কার্যকরী সমাধান ডেলিভার করি, তারপর মেট্রিক্স ও ফিডব্যাকের ভিত্তিতে ইটারেটিভভাবে রিফ্যাক্টর করি।",
          b: "আমার প্রধান শক্তি হলো পূর্ণাঙ্গ প্রজেক্টের দায়িত্ব নিয়ে দ্রুত জটিল কারিগরি সমস্যা সমাধান করার ক্ষমতা। অতীতে অতি নিখুঁত করার প্রবণতা থাকলেও এখন আমি বাস্তবমুখী এজাইল পদ্ধতিতে দ্রুত কার্যকরী কোড ডেলিভারি দিয়ে পরবর্তীতে অপটিমাইজ করায় বিশ্বাসী।",
          e: "Strength: Uncompromising ownership and full-stack problem solving. Whether diagnosing a frontend memory leak or tuning an Nginx reverse proxy, I persist until the root cause is resolved. Weakness: A historical tendency toward premature optimization. I have actively corrected this by adopting a pragmatic MVP-first mindset—shipping robust, tested features rapidly, then iteratively optimizing based on telemetry.",
          tip: "দুর্বলতা বলার পর কীভাবে তা ইতিবাচকভাবে শুধরেছ তা তুলে ধরা জরুরি।"
        },
        {
          lvl: "situation",
          q: "একটি গুরুত্বপূর্ণ ফিচারের ডেডলাইন আগামী পরশু, কিন্তু এখনও অনেক কাজ বাকি। তুমি কীভাবে এই পরিস্থিতি হ্যান্ডেল করবে?",
          m: "আমার পদক্ষেপ: (১) **Scope Prioritization:** টেক লিড ও প্রোডাক্ট ওনারের সাথে অবিলম্বে বসে ফিচারগুলোকে 'Must-Have' (কোর ফাংশনালিটি) এবং 'Nice-to-Have' (সেকেন্ডারি অ্যানিমেশন বা বাড়তি ফিল্টার)-এ ভাগ করব। (২) আগামী ৪৮ ঘণ্টার মধ্যে শুধুমাত্র কোর বিজনেস ফ্লো যেন ১০০% বাগ-ফ্রি ও টেস্টেড থাকে তা নিশ্চিত করব। (৩) সেকেন্ডারি ফিচারগুলোর জন্য পরবর্তী স্প্রিন্টে টিকিট তৈরি করব। (৪) কোনো অবস্থাতেই শেষ মুহূর্তে কোডের কোয়ালিটি বা সিকিউরিটি কম্প্রোমাইজ করব না যাতে প্রোডাকশনে ক্র্যাশ না করে।",
          b: "ডেডলাইনের চাপে আমরা প্রোডাক্ট টিমের সাথে বসে কাজের অগ্রাধিকার নির্ধারণ করি। মূল ফিচারগুলো শতভাগ বাগ-মুক্ত রেখে ডেডলাইনের মধ্যে রিলিজ করি এবং কম গুরুত্বপূর্ণ কাজগুলো পরবর্তী আপডেটের জন্য আলাদা করে সময়মতো ডেলিভারি নিশ্চিত করি।",
          e: "When facing a tight deadline, I initiate immediate stakeholder triage. I decouple the core MVP requirements from non-essential edge cases, focusing 100% on delivering the critical happy path without sacrificing unit test coverage or security. Non-critical enhancements are slated for the subsequent patch release.",
          tip: "কোয়ালিটি কম্প্রোমাইজ না করে প্রায়োরিটাইজ করার মানসিকতা লিডারশিপ প্রকাশ করে।"
        },
        {
          lvl: "realworld",
          q: "তুমি কীভাবে নতুন প্রযুক্তি বা ফ্রেমওয়ার্ক শেখো? সম্প্রতি কোনো নতুন টেকনোলজি শিখেছ?",
          m: "আমি থিওরি মুখস্থ করার চেয়ে **'Build-to-Learn'** নীতিতে বিশ্বাস করি। যখনই নতুন কিছু শিখি (যেমন সম্প্রতি Next.js 15-এর Server Actions বা PostgreSQL pg_trgm), আমি সরাসরি একটি ছোট প্রোডাকশন-রেডি প্রজেক্ট তৈরি করি। অফিশিয়াল ডকুমেন্টেশন এবং গিটহাব ওপেন সোর্স কোড ঘাঁটা আমার মূল উপায়। ডকুমেন্টেশন পড়ে কোড বানিয়ে বাস্তব লাইভে ডিপ্লয় করলেই তবেই টেকনোলজিটি আমার আয়ত্তে আসে।",
          b: "আমি সরাসরি প্রজেক্ট তৈরির মাধ্যমে নতুন প্রযুক্তি শিখি। কোনো নতুন ফ্রেমওয়ার্ক আসলে অফিসিয়াল ডকুমেন্টেশন পড়ে একটি বাস্তব অ্যাপ্লিকেশন বানিয়ে তা ডিপ্লয় করার মাধ্যমে আমি দ্রুত যে কোনো নতুন প্রযুক্তিতে দক্ষ হয়ে উঠি।",
          e: "I learn by building in production contexts. When adopting new capabilities like Next.js 15 Server Actions or Prisma Extensions, I build functional prototypes rather than passively watching tutorials. I study official documentation, inspect reference GitHub codebases, and measure runtime performance under actual load.",
          tip: "Build-to-learn মানসিকতা যে কোনো ইঞ্জিনিয়ারিং টিমের সবচেয়ে পছন্দের বৈশিষ্ট্য।"
        }
      ]
    },
    {
      id: "production-outage-stress",
      name: "Live Outage Response & Incident Leadership",
      desc: "Calm triaging, Stop-the-bleeding mindset, Rollback triggers, Post-mortem documentation, Blameless culture",
      items: [
        {
          lvl: "lvl1",
          q: "লাইভ প্রোডাকশনে ক্র্যাশ বা আউটেজ ঘটলে তোমার প্রথম মানসিক প্রস্তুতি ও প্রাথমিক দায়িত্ব কী?",
          m: "প্রথম দায়িত্ব হলো: **'ডালপালা না খুঁজে আগে রক্তপাত বন্ধ করা' (Stop the bleeding first)**। ক্র্যাশের সময় কোড কে লিখেছিল বা কার ভুল ছিল তা খোঁজার কোনো সুযোগ নেই। মাথা ঠান্ডা রেখে টিমের সবাইকে আশ্বস্ত করা এবং অবিলম্বে সার্ভিস সচল করা (রিস্টার্ট বা রোলব্যাক দিয়ে) হলো একমাত্র অগ্রাধিকার। ক্লায়েন্ট বা স্টেকহোল্ডারদের সৎ ও পেশাদার ভাষায় আপডেট দেওয়া যে 'আমরা সমস্যাটি চিহ্নিত করেছি এবং পুনরুদ্ধারের কাজ চলছে'।",
          b: "প্রোডাকশন ক্র্যাশে প্রথম কাজ হলো প্যানিক না করে দ্রুত সার্ভিস চালু করা। দোষারোপ না করে রোলব্যাক বা ব্যাকআপ দিয়ে সিস্টেম সচল করাই প্রধান লক্ষ্য এবং কাস্টমারকে পরিস্থিতি সম্পর্কে স্পষ্ট ধারণা দেওয়া।",
          e: "During a live outage, priority number one is restoring uptime—'stop the bleeding'—before investigating blame or fine-grained code bugs. Keep composure, trigger an immediate rollback or service restart to restore system availability, and communicate transparent status updates to stakeholders.",
          tip: "Stop the bleeding ফার্স্ট—এই নীতিটি সিনিয়র ইঞ্জিনিয়ারদের ট্রেডমার্ক।"
        },
        {
          lvl: "lvl2",
          q: "একটি আউটেজ ফিক্স করার পর 'Blameless Post-Mortem' কেন প্রয়োজন এবং এতে কী কী সেকশন থাকে?",
          m: "ব্লেমলেস পোস্ট-মর্টেম কোনো ব্যক্তিকে দোষারোপ করার জন্য নয়, বরং সিস্টেমের কোন দুর্বলতার কারণে ঘটনাটি ঘটেছে তা চিহ্নিত করে ভবিষ্যতে একই ঘটনার পুনরাবৃত্তি চিরতরে বন্ধ করার জন্য করা হয়। পোস্ট-মর্টেমে ৫টি সেকশন থাকে: (১) **Incident Summary & Timeline:** ঠিক কয়টায় ঘটনা শুরু হয়েছিল এবং কয়টায় ফিক্স হয়েছে। (২) **Impact:** কতজন ইউজার বা কত টাকার লেনদেন ক্ষতিগ্রস্ত হয়েছে। (৩) **Root Cause:** প্রযুক্তিগত মূল কারণ কী ছিল। (৪) **Resolution:** কীভাবে সাময়িক সমাধান করা হয়েছে। (৫) **Action Items / Preventive Measures:** ভবিষ্যতে এটি ঠেকাতে কী কী নতুন টেস্ট, অ্যালার্ট বা গার্ড কোড বসানো হবে।",
          b: "ব্লেমলেস পোস্ট-মর্টেম কাউকে দায়ী না করে সিস্টেমের ভুলগুলো সংশোধন করার জন্য তৈরি হয়। এতে ঘটনার সময়রেখা, প্রভাব, মূল কারণ এবং ভবিষ্যতে একই সমস্যা যাতে আর কখনো না ঘটে তার স্থায়ী সমাধানের পরিকল্পনা থাকে।",
          e: "A Blameless Post-Mortem examines systemic vulnerabilities rather than individual fault. It documents the incident timeline, business impact metrics, technical root causes, tactical resolutions, and preventative action items (new integration tests, monitoring alerts, circuit breakers) to prevent identical failures.",
          code: "# Incident Post-Mortem Template\n1. Incident Overview & Impact (Duration, affected requests)\n2. Timeline (Detection, Triaged, Restored)\n3. Technical Root Cause (RCA)\n4. Corrective Action Items (Assigned JIRA tasks)"
        },
        {
          lvl: "lvl3",
          q: "প্রোডাকশনে মেমোরি লিক বা সিপিইউ স্পাইকের সময় রিস্টার্ট বনাম রোলব্যাকের সিদ্ধান্ত কীভাবে নেবে?",
          m: "যদি সমস্যাটি সাম্প্রতিক কোনো কোড ডিপ্লয়মেন্টের ঠিক পরে শুরু হয় (যেমন নতুন ফিচার পুশ করার ১০ মিনিটের মধ্যে), তবে কোনো চিন্তা ছাড়াই **তাৎক্ষণিক পূর্বের স্টেবল ভার্সনে Rollback** করব। আর যদি অনেক দিন ধরে চলা স্টেবল ভার্সনে হঠাৎ ট্রাফিক স্পাইক বা এক্সটার্নাল কারণে মেমোরি ফুল হয়, তবে **PM2 Rolling Reload বা রিস্টার্ট** দেব এবং সাথে সাথে Nginx লেভেলে রেট লিমিটিং ও ক্যাশিং সক্রিয় করব। রিস্টার্ট হলো সাময়িক প্রশমন, আর রোলব্যাক হলো ত্রুটিপূর্ণ কোড প্রত্যাহার।",
          b: "নতুন কোড ডিপ্লয়ের পরপরই ক্র্যাশ করলে তাৎক্ষণিক পূর্বের স্টেবল ভার্সনে রোলব্যাক করা সবচেয়ে নিরাপদ। আর পুরোনো সিস্টেমে হঠাৎ ট্রাফিক বাড়লে রিস্টার্ট দিয়ে রেট লিমিট বাড়িয়ে পরিস্থিতি নিয়ন্ত্রণ করা হয়।",
          e: "If an anomaly manifests immediately following a new deployment, execute an instant code rollback—the delta is likely defective. If memory pressure emerges gradually on an established, long-running release during a traffic surge, perform a rolling PM2 reload to flush heap memory, coupled with aggressive edge caching and API rate limiting.",
          tip: "রোলব্যাক বনাম রিস্টার্টের যৌক্তিকতা টেকনিক্যাল লিডারশিপ প্রকাশ করে।"
        },
        {
          lvl: "situation",
          q: "Dokani POS-এ শুক্রবার বিকেলে সর্বোচ্চ পিক সেলস আওয়ারে হঠাৎ ডাটাবেজ কানেকশন পুল ফুল হয়ে সব ক্যাশিয়ার এরর পাচ্ছিল। কীভাবে তাৎক্ষণিক সমাধান করেছিলে?",
          m: "শুক্রবার বিকেলে দোকানে ভিড় সবচেয়ে বেশি। আমি দ্রুত: (১) লিনাক্স টার্মিনালে ঢুকে `SELECT * FROM pg_stat_activity WHERE state = 'active';` চালিয়ে দেখলাম বেশ কিছু লং-রানিং অ্যানালিটিক্স কুয়েরি কানেকশন ধরে রেখেছে। (২) `pg_terminate_backend(pid)` দিয়ে লং কুয়েরিগুলো বন্ধ করে তৎক্ষণাৎ কানেকশন ফ্রি করলাম। (৩) PgBouncer-এর পুল মোড 'Session' থেকে 'Transaction Pooling' নিশ্চিত করলাম যাতে কুয়েরি শেষ হওয়ামাত্র কানেকশন পুলে ফেরত যায়। (৪) স্থায়ী সমাধানে ভারী রিপোর্টের জন্য রিড-অনলি রেপ্লিকা বা অফ-পিক শিডিউলিং কনফিগার করলাম। ২ মিনিটের মধ্যে সব কাউন্টারে সেলস স্বাভাবিক হয়ে এসেছিল।",
          b: "পিক আওয়ারে ডাটাবেজ লক হলে আমরা লং-রানিং ভারী কুয়েরিগুলো চিহ্নিত করে তাৎক্ষণিক বন্ধ করি এবং কানেকশন পুল মুক্ত করি। পিজিবউন্সার দিয়ে ট্রানজেকশন পুলিং নিশ্চিত করে দ্রুত সব কাউন্টারের বিক্রি সচল করা হয়।",
          e: "During a peak checkout rush, saturated DB connections were resolved by querying pg_stat_activity to isolate hanging queries and terminating them via pg_terminate_backend. I enforced PgBouncer transaction pooling mode to aggressively recycle idle connections, later scheduling heavy analytics queries to asynchronous off-peak batch windows.",
          tip: "pg_stat_activity এবং pg_terminate_backend-এর মতো বাস্তব কমান্ড ইন্টারভিউতে উল্লেখ করা অত্যন্ত প্রভাবশালী।"
        },
        {
          lvl: "realworld",
          q: "চরম চাপের মুখে (High Pressure & Urgent Bugs) কাজ করার সময় তোমার ব্যক্তিগত কর্মপদ্ধতি কী?",
          m: "চাপের মুখে আমি তিনটি নীতি মেনে চলি: (১) **কম্পার্টমেন্টালাইজেশন:** আবেগ বা আতঙ্ক দূরে সরিয়ে সমস্যাটিকে একটি লজিক্যাল পাজল হিসেবে দেখি। (২) **ডাটা-ড্রিভেন ডিবাগিং:** অনুমানের ওপর ভিত্তি করে কোড না বদলে লগ ফাইল, টাইমস্ট্যাম্প ও মেট্রিক্স দেখে সুনির্দিষ্ট ফ্যাক্ট খুঁজি। (৩) **ক্লিয়ার কমিউনিকেশন:** টিমের অন্য সদস্যদের স্পষ্টভাবে জানাই আমি কোন অংশে কাজ করছি যাতে কোনো ডুপ্লিকেট প্রচেষ্টা না হয়। শান্ত থাকা একজন ইঞ্জিনিয়ারের সবচেয়ে বড় সুপারপাওয়ার।",
          b: "চাপের মুখে আমি মাথা ঠান্ডা রেখে অনুমানের বদলে লগ ফাইলের বাস্তব তথ্য দেখে সমস্যা সমাধান করি এবং টিমের সাথে স্পষ্ট যোগাযোগ বজায় রেখে সুশৃঙ্খলভাবে পরিস্থিতি সামাল দিই।",
          e: "Under intense production pressure, I rely on disciplined data-driven triage: I isolate assumptions and interrogate system logs and metrics directly. I maintain constant, calm communication with teammates to coordinate efforts and avoid duplicate debugging. Emotional resilience and analytical rigor are an engineer's best assets.",
          tip: "Data-driven triage মানসিকতা প্রফেশনালদের আলাদা করে।"
        }
      ]
    },
    {
      id: "teamwork-conflict-salary",
      name: "Team Collaboration, Conflict & Salary Negotiation",
      desc: "Resolving technical disagreements, Code review etiquette, Mentoring, Value-based salary discussion",
      items: [
        {
          lvl: "lvl1",
          q: "কোড রিভিউয়ের সময় কোনো সতীর্থের (Peer Developer) সাথে টেকনিক্যাল মতবিরোধ হলে কীভাবে সমাধান করবে?",
          m: "আমি মতবিরোধকে কখনো ব্যক্তিগত পর্যায়ে নিই না। সমাধান করার উপায়: (১) কোড রিভিউতে কখনোই 'তোমার কোড ভুল' বলব না, বরং গঠনমূলকভাবে বলব: 'এই এপ্রোচটিতে কি কোনো পারফরম্যান্স বা রেস কন্ডিশনের ঝুঁকি তৈরি হতে পারে? আমরা কি এটি বিবেচনা করতে পারি?'। (২) ব্যক্তিগত মতের বদলে বেঞ্চমার্ক, অফিশিয়াল ডকুমেন্টেশন বা প্রজেক্ট আর্কিটেকচারাল স্ট্যান্ডার্ডের ওপর ভিত্তি করে সিদ্ধান্ত নেব। (৩) যদি সমাধান না মেলে, তবে টেক লিডের সাথে ৫ মিনিটের একটি কল দিয়ে কনস্ট্রাক্টিভ আলোচনার মাধ্যমে টিমের বৃহত্তর স্বার্থে ফাইনাল সিদ্ধান্তে পৌঁছাব।",
          b: "কোড রিভিউতে ব্যক্তিগত অভিমতের বদলে ডকুমেন্টেশন ও পারফরম্যান্স মেট্রিক্সের উপর ভিত্তি করে আলোচনা করি। সম্মানজনক ভাষায় যুক্তি উপস্থাপন করে টিমের ভালোর জন্য টেক লিডের পরামর্শে দ্রুত ঐকমত্যে পৌঁছাই।",
          e: "I approach technical disagreements objectively: never make it personal; frame suggestions around system outcomes rather than personal preference. I reference official documentation, benchmark metrics, or architectural standards. If consensus is elusive, I invite a brief 5-minute alignment call with the Tech Lead to establish a consensus that serves the product best.",
          tip: "Constructive Code Review এটিকেট টিম প্লেয়ারদের অপরিহার্য যোগ্যতা।"
        },
        {
          lvl: "lvl2",
          q: "একজন জুনিয়র ডেভেলপারকে মেন্টরিং বা টিমমেটকে হেল্প করার ক্ষেত্রে তোমার অভিজ্ঞতা কেমন?",
          m: "আমি সবসময় শেখাতে ও টিমকে গ্রো করাতে ভালোবাসি। কোনো জুনিয়র হেল্প চাইলে আমি সরাসরি তার কীবোর্ড টেনে নিয়ে কোড লিখে দিই না—বরং তাকে প্রশ্ন করে সমস্যার মূলে পৌঁছাতে সাহায্য করি ('কনসোল এররটা কী বলছে? নেটওয়ার্ক ট্যাবে পেলোড চেক করেছ?')। এর ফলে সে নিজে নিজে ডিবাগ করার আত্মবিশ্বাস পায়। এছাড়া আমি নিয়মিত কোডবেসের ডকুমেন্টেশন, আর্কিটেকচার ডায়াগ্রাম ও রিইউজেবল প্যাটার্ন লিখে রাখি যাতে যেকোনো নতুন ডেভেলপার সহজে অনবোর্ড হতে পারে।",
          b: "জুনিয়রদের সরাসরি কোড লিখে দেওয়ার বদলে তাদের সমস্যা চিহ্নিত ও ডিবাগ করার কৌশল শিখিয়ে দিই। ভালো ডকুমেন্টেশন তৈরি করে রাখি যাতে টিমের যে কেউ সহজে কাজ বুঝতে ও শিখতে পারে।",
          e: "Effective mentoring avoids simply handing over solutions. Instead, I guide developers through diagnostic reasoning—teaching them to interpret stack traces, inspect network payloads, and formulate hypotheses. I also maintain comprehensive architectural documentation to foster long-term self-sufficiency across the engineering team.",
          tip: "Socratic Debugging Method (প্রশ্ন করে ডিবাগ শেখানো) সেরা মেন্টরিং অ্যাপ্রোচ।"
        },
        {
          lvl: "lvl3",
          q: "প্রোডাক্ট ম্যানেজার যদি এমন একটি ফিচার চায় যা টেকনিক্যালি সিস্টেমের জন্য ক্ষতিকর বা সিকিউরিটি রিস্ক তৈরি করে, তখন কীভাবে ডিল করবে?",
          m: "সরাসরি 'না' বলে দরজা বন্ধ না করে আমি ব্যবসায়িক দৃষ্টিকোণ থেকে কথা বলব: (১) আগে বুঝব পিএম এই ফিচারের মাধ্যমে আসলে কী অর্জন করতে চাচ্ছে (Underlying Business Goal)। (২) এরপর শান্তভাবে ব্যাখ্যা করব যে বর্তমান প্রস্তাবিত উপায়ে গেলে কোন সিকিউরিটি রিস্ক বা ডাটা লিকের সম্ভাবনা রয়েছে। (৩) সবচেয়ে গুরুত্বপূর্ণ: আমি তাকে একটি অল্টারনেটিভ নিরাপদ টেকনিক্যাল সলিউশন প্রস্তাব করব যা তার বিজনেস গোলও পূরণ করবে এবং সিস্টেমের সিকিউরিটিও অক্ষুণ্ণ রাখবে।",
          b: "সরাসরি না না বলে প্রোডাক্ট ম্যানেজারের ব্যবসায়িক লক্ষ্য বোঝার চেষ্টা করি। ঝুঁকিপূর্ণ দিকগুলো বুঝিয়ে বলে একটি নিরাপদ বিকল্প উপায় প্রস্তাব করি যা সিস্টেমের সুরক্ষা বজায় রেখেই ব্যবসার চাহিদা পূরণ করে।",
          e: "Rather than issuing a blunt technical refusal, I seek to understand the underlying business objective. I articulate the security vulnerabilities or architectural technical debt associated with the requested approach, and then propose a secure alternative that achieves the intended business goal without compromising system integrity.",
          tip: "ব্যবসায়িক সমাধান দেওয়ার ক্ষমতা একজন ইঞ্জিনিয়ারকে ম্যানেজমেন্টের চোখে মূল্যবান করে তোলে।"
        },
        {
          lvl: "situation",
          q: "তুমি যে আর্কিটেকচার প্রস্তাব করেছ, টেক লিড তার চেয়ে ভিন্ন একটি এপ্রোচ নিতে চান। তুমি কীভাবে প্রতিক্রিয়া জানাবে?",
          m: "আমি প্রথমে টেক লিডের প্রস্তাবিত এপ্রোচটি মনোযোগ দিয়ে শুনব—কারণ তার হয়তো দীর্ঘমেয়াদী সিস্টেম বা কোম্পানির রোডম্যাপ নিয়ে এমন কোনো ইনসাইট আছে যা আমার জানা নেই। আমি আমার প্রস্তাবনার পক্ষে পরিষ্কার ডাটা ও যুক্তি তুলে ধরব। কিন্তু আলোচনার পর টেক লিড যদি চূড়ান্ত সিদ্ধান্ত নেন, আমি কোনো মনস্তাত্ত্বিক দ্বিধা না রেখে সেই সিদ্ধান্তকে শতভাগ সমর্থন করব ('Disagree and Commit') এবং সর্বোচ্চ মনোযোগ দিয়ে সেটি বাস্তবায়ন করব। টিমের ঐক্য ও গতি সবসময় ব্যক্তিগত মতামতের চেয়ে বড়।",
          b: "টেক লিডের সিদ্ধান্ত মনোযোগ দিয়ে বুঝে নিজের যুক্তি পেশ করি। তবে চূড়ান্ত সিদ্ধান্ত হওয়ার পর কোনো দ্বিধা না রেখে পুরো একাগ্রতা নিয়ে সেই সিদ্ধান্ত বাস্তবায়নে কাজ করি, কারণ টিমের সাফল্যই মূল লক্ষ্য।",
          e: "I listen actively to the Tech Lead's proposal, recognizing they may have broader organizational context. I present my perspective backed by trade-offs. Once the final architectural path is chosen, I practice 'Disagree and Commit'—giving 100% of my energy to execute the chosen strategy flawlessly. Team cohesion always supersedes individual pride.",
          tip: "'Disagree and Commit' হলো Amazon ও সিলিকন ভ্যালির অত্যন্ত সমাদৃত প্রিন্সিপাল।"
        },
        {
          lvl: "realworld",
          q: "ইন্টারভিউয়ের শেষ পর্যায়ে 'তোমার স্যালারি এক্সপেকটেশন কত?' (Salary Expectation) জিজ্ঞেস করলে কীভাবে প্রফেশনাল উত্তর দেবে?",
          m: "আমি আত্মবিশ্বাসের সাথে বলব: 'আমার মূল ফোকাস হলো NT Tech Innovation-এর ইঞ্জিনিয়ারিং টিমে একজন ভ্যালুয়েবল কনট্রিবিউটর হিসেবে যোগ দেওয়া এবং আমার ফুল-স্ট্যাক ও ডেভঅপ্স অভিজ্ঞতা দিয়ে কোম্পানির প্রোডাক্ট স্কেল করা। বাজারে আমার দক্ষতা (Next.js, Node.js, PostgreSQL, Docker, Linux, Multi-Tenant SaaS) এবং এই রোলের দায়িত্ব বিবেচনা করে আমি একটি ফেয়ার ও কম্পিটিটিভ প্যাকেজ প্রত্যাশা করি যা কোম্পানির বাজেট ও স্ট্যান্ডার্ড স্কেলের সাথে সামঞ্জস্যপূর্ণ। NT Tech এই পদের জন্য কী ধরনের বাজেট বা রেঞ্জ নির্ধারণ করেছে তা জানলে আমরা উভয়ের জন্য মানানসই একটি সিদ্ধান্তে পৌঁছাতে পারি।'",
          b: "স্যালারি আলোচনায় নিজের দক্ষতার গুরুত্ব ও কোম্পানির স্ট্যান্ডার্ডের উপর আস্থা প্রকাশ করি। কোম্পানির নির্ধারিত বাজেট জেনে আলোচনার মাধ্যমে একটি যৌক্তিক ও সম্মানজনক পারিশ্রমিকে একমত হওয়ার প্রস্তাব দিই।",
          e: "My primary objective is joining NT Tech Innovation to build scalable, mission-critical systems. Considering my end-to-end full-stack and DevOps skill set, alongside standard industry benchmarks for this role, I expect a fair and competitive compensation package. I would welcome hearing the planned budget range NT Tech has allocated for this position so we can align smoothly.",
          tip: "কোম্পানির বাজেট রেঞ্জ জানতে চেয়ে ওপেন-এন্ডেড রাখা সবচেয়ে শক্তিশালী নেগোসিয়েশন কৌশল।"
        }
      ]
    },
    {
      id: "ai-workflow-code-review",
      name: "AI Coding Tools, Code Review & Blocker Escalation",
      desc: "Cursor / Claude Code Workflows, Verifying AI Output, PR Code Review Standards, Investigating Bugs Independently",
      items: [
        {
          lvl: "lvl1",
          q: "তুমি তোমার দৈনন্দিন সফটওয়্যার ডেভেলপমেন্টে AI টুলস (Cursor, Claude, Copilot, Codex) কীভাবে ব্যবহার করো?",
          m: "আমি AI টুলসকে একজন সুপারফাস্ট 'Pair Programmer' হিসেবে ব্যবহার করি—যা আমার ডেভেলপমেন্ট গতি ৩–৪ গুণ বাড়িয়ে দেয়। মূলত যেসব কাজে ব্যবহার করি: (১) বয়লারপ্লেট কোড জেনারেশন (যেমন: Prisma মডেল, Zod স্কিমা, TypeScript ইন্টারফেস ও টাইপস), (২) রেগুলার এক্সপ্রেশন (Regex) ও জটিল SQL কোয়েরি ড্রাফট করা, (৩) ইউনিট টেস্ট কেসের প্রাথমিক ড্রাফট লেখা, (৪) জটিল অ্যালগরিদম বা আর্কিটেকচারাল প্যাটার্নের বিভিন্ন অল্টারনেটিভ অপশন দ্রুত এক্সপ্লোর করা। তবে আমি কখনো AI-কে মূল বিজনেস ডিসিশন বা সিকিউরিটি আর্কিটেকচার ছেড়ে দিই না।",
          b: "আমি এআই টুলসকে একজন সহযোগী কোডার হিসেবে ব্যবহার করি যা টাইপস্ক্রিপ্ট ইন্টারফেস, ডেটাবেজ স্কিমা এবং ইউনিট টেস্টের মতো রিপিটেটিভ কাজগুলো দ্রুত তৈরি করতে সাহায্য করে। তবে মূল বিজনেস লজিক এবং আর্কিটেকচারাল সিদ্ধান্ত আমি নিজে গ্রহণ করি।",
          e: "I leverage AI coding assistants (such as Cursor, Claude Code, and GitHub Copilot) as rapid pair-programming accelerators. Key applications include scaffolding boilerplate Prisma schemas, generating strict TypeScript interfaces, drafting unit test suites, and exploring alternative SQL optimization strategies. Crucially, high-level system design and business domain decisions remain entirely under my manual control.",
          tip: "ওয়ার্ল্ড কর্প ডিজিটাল বা আধুনিক রিমোট কোম্পানিগুলো AI ব্যবহারকে সাধুবাদ জানায়, তবে দেখতে চায় তুমি টুলটির মাস্টার—গোলাম নও।"
        },
        {
          lvl: "lvl2",
          q: "AI জেনারেটেড কোডকে অন্ধভাবে বিশ্বাস না করে তুমি কীভাবে তা পুঙ্খানুপুঙ্খভাবে ভেরিফাই ও টেস্ট করো?",
          m: "AI কোড প্রায়শই পুরোনো লাইব্রেরির মেথড উদ্ভাবন করে (Hallucination) অথবা সূক্ষ্ম সিকিউরিটি বাগ ফেলে রাখে। আমার ভেরিফিকেশন প্রসেস: (১) **Strict TypeScript Verification:** কোড নেওয়ার পর সাথে সাথে `tsc --noEmit` চালাই; AI অনেক সময় অলসভাবে `any` টাইপ ব্যবহার করে বা অস্তিত্বহীন প্রপার্টি দেয়। (২) **Security & Multi-Tenant Audit:** ডাটাবেজ কোয়েরিতে `tenantId` ফিল্টার বাদ পড়েছে কিনা, N+1 লুপ তৈরি হয়েছে কিনা এবং SQL ইনজেকশনের ঝুঁকি আছে কিনা নিজে লাইন-বাই-লাইন রিভিউ করি। (৩) **Edge Cases & Null Checks:** শূন্য স্টক, নাল ডাটা, এবং নেটওয়ার্ক টাইমআউটের মতো কঠিন এজ কেসগুলো ম্যানুয়ালি টেস্ট করি। (৪) লোকাল ব্রাউজারে চালিয়ে এবং টেস্ট স্যুট পাস করিয়ে তবেই গিট কমিট করি।",
          b: "এআই কোড অন্ধভাবে ব্যবহার না করে প্রথমে টাইপস্ক্রিপ্ট কম্পাইলার দিয়ে টাইপ সুরক্ষা নিশ্চিত করি। এরপর সিকিউরিটি ও মাল্টি-টেন্যান্ট ফিল্টারগুলো লাইন-বাই-লাইন অডিট করি। নাল ভ্যালু ও এরর হ্যান্ডলিং নিজে পরীক্ষা করে ব্রাউজারে টেস্ট চালানোর পরই কোড কমিট করি।",
          e: "I never trust AI-generated code blindly. My verification protocol spans: running strict TypeScript compiler checks (tsc --noEmit) to catch hallucinated APIs or lazy 'any' typings; conducting manual line-by-line security audits to guarantee tenant-isolation filters (tenantId) and index usage are preserved; verifying edge cases (null boundaries, async race conditions); and executing automated Jest/Playwright tests in a local environment prior to committing.",
          tip: "এই উত্তরটি সরাসরি World Corp Digital-এর নিয়োগ বিজ্ঞপ্তির সবচেয়ে গুরুত্বপূর্ণ ফিল্টার ক্রাইটেরিয়াকে সন্তুষ্ট করে।"
        },
        {
          lvl: "lvl3",
          q: "একজন Lead Full-Stack Developer-এর সাথে কাজ করার সময় Pull Request (PR) রিভিউ ও কোড রিভিউতে কী কী বিষয়ে সবচেয়ে বেশি নজর দাও?",
          m: "কোড রিভিউ হলো কোডবেসের মান ও স্থায়িত্ব বজায় রাখার প্রধান দুর্গ। আমি এবং আমার টিম পিআর রিভিউতে ৫টি স্তম্ভ দেখি: (১) **Business Logic & Correctness:** পিআরটি কি টিকিট বা স্পেসিফিকেশনের সমস্যাটি আসলেই সমাধান করছে? কোনো আনহ্যান্ডেল্ড রেস কন্ডিশন বা এজ কেস আছে কি? (২) **Type Safety & Maintainability:** কোনো `any` টাইপ আছে কিনা, কোড পরিষ্কার ও সেলফ-ডকুমেন্টিং কিনা। (৩) **Database & Performance Impact:** কোনো আন-ইনডেক্সড কুয়েরি বা N+1 কোয়েরি আছে কিনা যা প্রোডাকশন ডাউন করতে পারে। (৪) **Security & Secrets:** কোনো API Key বা পাসওয়ার্ড ভুলবশত কোডে রয়ে গেছে কিনা। (৫) **Automated Test Coverage:** নতুন ফিচারের সাথে যথাযথ ইউনিট বা ইন্টিগ্রেশন টেস্ট যুক্ত করা হয়েছে কিনা।",
          b: "কোড রিভিউতে আমরা কোডের কার্যকারিতা, টাইপ সেফটি, ডাটাবেজ পারফরম্যান্স এবং সিকিউরিটি পুঙ্খানুপুঙ্খভাবে যাচাই করি। কোনো সিক্রেট কি বা স্লো কুয়েরি আছে কিনা এবং প্রয়োজনীয় অটোমেটেড টেস্ট যুক্ত করা হয়েছে কিনা তা নিশ্চিত করে সম্মানজনকভাবে গঠনমূলক ফিডব্যাক দেওয়া হয়।",
          e: "When reviewing Pull Requests alongside a Lead Engineer, I focus on five pillars: functional correctness and edge-case handling against the feature spec; strict type safety and modular maintainability; database query efficiency (checking for N+1 traps and unindexed scans); security hygiene (ensuring zero hardcoded credentials and valid sanitization); and verifying that automated test suites adequately cover modified execution paths.",
          tip: "পিআর রিভিউতে 'Constructive & Respectful Feedback'-এর কথা উল্লেখ করা সিনিয়র মানসিকতার পরিচয়।"
        },
        {
          lvl: "situation",
          q: "কোনো জটিল বাগ বা ইন্টিগ্রেশন ইস্যুতে তুমি সম্পূর্ণ আটকে গেছো (Completely Stuck)। টিম লিডকে ডাকার আগে তুমি নিজে নিজে কোন কোন সুনির্দিষ্ট পদক্ষেপ নাও?",
          m: "সরাসরি টিম লিডকে না ডেকে আমি একটি সিস্টেমেটিক ৫-ধাপের ইনভেস্টিগেশন চালাই: (১) **Minimal Reproduction:** লোকাল এনভায়রনমেন্টে সমস্যাটি বিচ্ছিন্ন করি এবং একটি ছোট স্ক্রিপ্ট বা টেস্ট কেস বানিয়ে ১০০% সময় বাগটি রিপ্রোডিউস করি। (২) **Telemetry & Logs:** ব্রাউজারের Network Tab, Server JSON Logs, এবং ডাটাবেজের `pg_stat_activity` চেক করে ঠিক কোন লেয়ারে ফেইল হচ্ছে (HTTP, Payload, DB Connection) তা নিশ্চিত হই। (৩) **Git Bisect:** `git bisect` চালিয়ে দেখি কোন নির্দিষ্ট কমিটে সমস্যাটি প্রথম শুরু হয়েছিল। (৪) **Official Docs & GitHub Issues:** লাইব্রেরির অফিশিয়াল চেঞ্জলগ এবং গিটহাবের ওপেন/ক্লোজড ইস্যু চেক করি লাইব্রেরির কোনো অভ্যন্তরীণ বাগ আছে কিনা। (৫) যদি একান্তই সমাধান না হয়, তখন লিডকে জানানোর সময় পরিষ্কার ৩টি তথ্য দিই: সমস্যাটি কী, আমি নিজে কী কী ট্রাই করেছি ও রেজাল্ট কী এসেছে, এবং আমার হাইপোথিসিস কী।",
          b: "বাগ বা সমস্যায় আটকে গেলে আগে নিজে নিজে সমস্যাটি লোকালি রিপ্রোডিউস করি, সার্ভার ও ডাটাবেজ লগ খতিয়ে দেখি এবং গিট হিস্ট্রি চেক করি। সমাধান না হলে টিম লিডকে জানানোর সময় আমি যা যা ট্রাই করেছি তার সম্পূর্ণ সারসংক্ষেপ সহ পেশাদারভাবে মেসেজ দিই যাতে লিডের সময় নষ্ট না হয়।",
          e: "Before escalating blockers, I execute a structured investigative routine: establish a deterministic minimal reproduction in an isolated test; inspect runtime telemetry across network payloads, application logs, and database queries; execute git bisect to identify the exact regression commit; and consult official release notes and GitHub issue threads. When escalation is necessary, I present a concise brief: the exact symptom, steps already attempted with observed outcomes, and current diagnostic hypotheses.",
          tip: "এই উত্তরটি প্রমাণ করে যে তুমি একজন স্বাবলম্বী (Self-reliant) ইঞ্জিনিয়ার যে অন্যের সময় নষ্ট করে না।"
        },
        {
          lvl: "realworld",
          q: "রিমোট টিমে (যেমন: ফিলিপাইন ও বাংলাদেশ টাইমজোনে) কাজ করার সময় Blocker বা ঝুঁকি কীভাবে আর্লি ও ক্লিয়ারলি কমিউনিকেট করতে হয়?",
          m: "রিমোট কালচারে 'Silent Struggle' হলো সবচেয়ে বড় অপরাধ। আমার কমিউনিকেশন নিয়ম: (১) কোনো টাস্কে ২ ঘণ্টার বেশি আনপ্রোডাক্টিভ আটকে থাকলে সাথে সাথে স্ল্যাক বা টিম চ্যানেলে আপডেট দিই। (২) মেসেজটি সব সময় স্ট্রাকচার্ড আকারে লিখি: **[Context]**, **[What I Discovered / Attempted]**, **[The Exact Blocker]**, এবং **[What I Need / Suggested Next Step]**। (৩) প্রজেক্টের ডেলিভারি ডেটলাইনের কোনো ঝুঁকি তৈরি হলে ডেলিভারির দিনে নয়, বরং ২–৩ দিন আগেই টিম লিডকে সতর্ক করি যাতে প্রয়োজনে প্রায়োরিটি অ্যাডজাস্ট বা অন্য কাউকে হেল্পে লাগানো যায়। এর ফলে রিমোট টিমে সর্বোচ্চ বিশ্বাস ও ট্রান্সপারেন্সি বজায় থাকে।",
          b: "রিমোট টিমে দীর্ঘ সময় কাউকে না জানিয়ে আটকে থাকা উচিত নয়। কোনো কাজে বাধা পেলে স্ল্যাকে পয়েন্ট আকারে সমস্যা, কী চেষ্টা করেছি এবং কী সাহায্য দরকার তা স্পষ্ট জানিয়ে দিই। ডেটলাইনের ঝুঁকি থাকলে আগেভাগেই লিডকে অবহিত করে কাজের স্বচ্ছতা বজায় রাখি।",
          e: "In remote distributed engineering, transparency and early communication prevent delivery surprises. If an unexpected blocker halts momentum for more than 1–2 hours, I post an asynchronous brief in Slack structured with: Context, Root-Cause Telemetry, Attempted Solutions, and Proposed Next Steps. If sprint delivery milestones are endangered, I flag risks days ahead rather than on deadline morning, fostering high trust across timezones.",
          tip: "World Corp Digital-এর নিয়োগ বিজ্ঞপ্তিতে 'Communicates blockers early and clearly' একটি মূল মানদণ্ড—এই উত্তরটি তাদের হৃদয় ছুঁয়ে যাবে।"
        }
      ]
    }
  ]
};
