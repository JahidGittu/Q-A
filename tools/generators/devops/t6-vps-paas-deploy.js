// Topic 6: VPS Deployment vs Cloud PaaS (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "vps-paas-deployment",
  name: "VPS Deployment vs Cloud Platforms (Vercel, Render, Railway)",
  desc: "VPS vs Managed PaaS, Cost Economics, Serverless Cold Starts, Dockerized Hosting, Hybrid Architecture (Vercel + VPS)",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Virtual Private Server (VPS) বনাম Platform as a Service (PaaS / Vercel / Render)-এর মধ্যে মৌলিক পার্থক্য কী?",
      m: "(১) `VPS (যেমন DigitalOcean, Hetzner, AWS EC2)`: আপনি একটি সম্পূর্ণ ভার্চুয়াল লিনাক্স ওএস পান। আপনাকে নিজে SSH করে Nginx, Node, PM2, ফায়ারওয়াল ও ডাটাবেজ ইনস্টল ও কনফিগার করতে হয় (পূর্ণ নিয়ন্ত্রণ, অবিশ্বাস্য কম খরচ)। (২) `PaaS (যেমন Vercel, Render, Railway)`: কোনো সার্ভার ম্যানেজমেন্টের ঝামেলা নেই। গিটহাব রিপোজিটরি কানেক্ট করলেই তারা অটোমেটিক বিল্ড, ডিপ্লয়, SSL এবং গ্লোবাল CDN পরিচালনা করে (উচ্চ ডেভেলপার ভেলোসিটি, কিন্তু বেশি খরচ এবং ভেন্ডর-লকইন)।",
      b: "ভিপিএস এ সম্পূর্ণ সার্ভারের ওপর পূর্ণ নিয়ন্ত্রণ থাকে এবং খরচ অনেক কম। আর PaaS (ভার্সেল/রেন্ডার) কোনো সার্ভার কনফিগারেশন ছাড়া গিট কানেক্ট করলেই স্বয়ংক্রিয়ভাবে অ্যাপ চালিয়ে দেয় কিন্তু খরচ বেশি।",
      e: "A VPS (DigitalOcean, Hetzner) provides raw virtualized Linux OS access where developers manage OS, firewalls, reverse proxies, and system daemons directly with full control at minimal cost. A PaaS (Vercel, Render, Railway) abstracts infrastructure away, deploying code straight from Git with automated SSL and builds at a premium cost.",
      tip: "বলো: 'VPS grants root hardware control and predictable micro-pricing; PaaS trades cost for developer velocity.'"
    },
    {
      lvl: "lvl1",
      q: "Serverless Cold Start কী এবং PaaS প্ল্যাটফর্মে ব্যাকএন্ড এপিআই হোস্ট করার সময় এটি কেন সমস্যা তৈরি করে?",
      m: "Serverless ফাংশনগুলো সার্বক্ষণিক মেমোরিতে রান করে না। যখন কোনো ট্রাফিক থাকে না, প্ল্যাটফর্ম কন্টেইনারটি টার্মিনেট বা স্লিপ করে রাখে। অনেকক্ষণ পর প্রথম রিকোয়েস্টটি এলে প্ল্যাটফর্মকে নতুন কন্টেইনার স্পন করতে হয়, নোড রানটাইম লোড করতে হয় এবং ডেটাবেজ কানেকশন তৈরি করতে হয়—যার ফলে প্রথম রিকোয়েস্টে ৩ থেকে ৮ সেকেন্ড পর্যন্ত ল্যাটেন্সি বা বিলম্ব ঘটে (Cold Start)! ক্যাশিয়ারের পিওএস চেকআউট বা পেমেন্ট এপিআইতে এই ৫ সেকেন্ডের ল্যাগ ইউজারদের চরম বিরক্ত করে। সার্বক্ষণিক রানিং VPS সার্ভারে কোনো কোল্ড স্টার্ট থাকে না—প্রতিটি রিকোয়েস্ট ইনস্ট্যান্ট সাব-১০ মিলিসেকেন্ডে রেসপন্স দেয়।",
      b: "সার্ভারলেস সিস্টেমে অলস অবস্থায় কন্টেইনার স্লিপে চলে যায়। নতুন রিকোয়েস্ট এলে চালু হতে ৩-৮ সেকেন্ড সময় নেয় যাকে কোল্ড স্টার্ট বলে। পিওএস বা পেমেন্টের মতো সিস্টেমে কোল্ড স্টার্ট মারাত্মক ক্ষতিকর। সার্বক্ষণিক চালু VPS-এ কোনো কোল্ড স্টার্ট থাকে না।",
      e: "Cold Starts occur on serverless platforms when spinning up dormant containers, initializing the Node runtime, and handshaking database pools, causing initial request latencies of 3-8 seconds. A persistent VPS eliminates cold starts entirely, providing deterministic sub-10ms response times.",
      tip: "ইন্টারভিউতে 'Persistent VPS eliminates serverless cold starts for checkout transactions' পয়েন্টটি বলবে।"
    },
    {
      lvl: "lvl1",
      q: "Vercel এবং Netlify মূলত কোন ধরনের অ্যাপ্লিকেশনের জন্য ডিজাইন করা হয়েছে এবং ব্যাকএন্ড ডাটাবেজের জন্য কেন অনুপযুক্ত?",
      m: "Vercel এবং Netlify ডিজাইন করা হয়েছে আধুনিক Jamstack এবং ফ্রন্টএন্ড ফ্রেমওয়ার্কের জন্য (Next.js, React, Astro, Vue)—যেখানে গ্লোবাল Edge CDN, অটোমেটিক প্রিভিউ ডিপ্লয়মেন্ট এবং স্ট্যাটিক অ্যাসেট ডিস্ট্রিবিউশন দরকার। এরা স্টেটলেস (Stateless)। এগুলোতে কোনো দীর্ঘস্থায়ী ফাইল সিস্টেম বা স্টেটফুল প্রসেস চালানো যায় না; ফলে PostgreSQL, MongoDB বা Redis-এর মতো ডেটাবেজ সরাসরি Vercel/Netlify-তে হোস্ট করা অসম্ভব। তাদের ব্যাকএন্ড ফাংশনগুলোর এক্সিকিউশন টাইম লিমিট (১০-১৫ সেকেন্ড) থাকে, ফলে দীর্ঘমেয়াদি কাজ চালানো যায় না।",
      b: "ভার্সেল ও নেটলিফাই ফ্রন্টএন্ড এবং নেক্সট.জেএস-এর জন্য সেরা। এরা স্টেটলেস হওয়ায় কোনো ডেটাবেজ (Postgres/Mongo) এদের ভেতরে হোস্ট করা যায় না এবং এদের ব্যাকএন্ড ফাংশনে ১০ সেকেন্ডের টাইমআউট থাকে।",
      e: "Vercel and Netlify are optimized for frontend UI frameworks (Next.js, Astro) and Edge asset distribution. Because serverless runtime environments are completely ephemeral and stateless, persistent stateful workloads (PostgreSQL, Redis, RabbitMQ) cannot be hosted natively on them.",
      code: "// Vercel Serverless Function Limit:\nexport const maxDuration = 10; // Max 10-15 seconds on hobby/pro"
    },
    {
      lvl: "lvl1",
      q: "Railway এবং Render-এর মতো আধুনিক PaaS প্ল্যাটফর্মের সুবিধা কী?",
      m: "Railway এবং Render হলো Heroku-এর আধুনিক বিকল্প। সুবিধা: (১) এরা ফুল-স্ট্যাক অ্যাপ্লিকেশন সাপোর্ট করে—অর্থাৎ আপনি শুধু ফ্রন্টএন্ড নয়, বরং দীর্ঘমেয়াদি ব্যাকএন্ড নোড সার্ভার, ব্যাকগ্রাউন্ড ওয়ার্কার এবং ডেটাবেজ (PostgreSQL, Redis) এক ক্লিকে প্রভিশন করতে পারেন। (২) ডকার ফাইল সাপোর্ট করে—যেকোনো কাস্টম `Dockerfile` পুশ করলেই তা অটোমেটিক বিল্ড ও ডিপ্লয় হয়ে যায়। (৩) অটোমেটিক SSL সার্টিফিকেট, প্রাইভেট নেটওয়ার্কিং এবং এনভায়রনমেন্ট ভ্যারিয়েবল সিনক্রোনাইজেশন থাকে। ছোট টিমের জন্য সার্ভার কনফিগারেশন ছাড়া ফুল স্ট্যাক লাইভ করার এটি দ্রুততম মাধ্যম।",
      b: "রেন্ডার এবং রেলওয়ে হলো আধুনিক Heroku। এক ক্লিকে নোড ব্যাকএন্ড, ডকার কন্টেইনার এবং ডেটাবেজ ক্লাস্টার তৈরি করে কোনো সার্ভার কনফিগারেশন ছাড়াই পূর্ণাঙ্গ ফুলস্ট্যাক প্রজেক্ট চালানো যায়।",
      e: "Render and Railway provide managed PaaS runtimes capable of persistent web services, Docker container deployments, background queue workers, and managed PostgreSQL/Redis instances. They offer Heroku-like developer ergonomics with automated SSL, health checking, and private networking.",
      tip: "বলো: 'Railway and Render bridge the gap by supporting persistent stateful web services and Docker containers without manual Linux sysadmin overhead.'"
    },
    {
      lvl: "lvl1",
      q: "একটি $৬/মাস উবুন্টু VPS সার্ভারে কী কী সার্ভিস একসাথে চালানো সম্ভব?",
      m: "একটি $৬/মাসের আধুনিক ক্লাউড VPS-এ (১ vCPU, ২GB RAM, ৫০GB NVMe SSD—যেমন Hetzner বা DigitalOcean) উপযুক্ত অপটিমাইজেশন (Docker/PM2 + Nginx + ৪GB Swap) ব্যবহার করে একসাথে চালানো সম্ভব: (১) Next.js ফ্রন্টএন্ড (standalone মোডে ~৮০MB RAM), (২) Node.js/Express ব্যাকএন্ড এপিআই (~১২০MB RAM), (৩) PostgreSQL প্রোডাকশন ডেটাবেজ (~২৫০MB RAM), (৪) Redis ক্যাশ ও মেসেজ কিউ (~৫০MB RAM), (৫) Nginx রিভার্স প্রক্সি SSL টার্মিনেশন সহ (~৩০MB RAM)। মোট RAM খরচ হবে মাত্র ৬০০-৭০০MB! বাকি ১.৩GB র‍্যাম ফ্রি থাকবে। অথচ PaaS-এ এই সেটআপ চালাতে প্রতি মাসে $৫০ থেকে $১০০ ডলার খরচ হয়ে যাবে!",
      b: "একটি মাত্র $৬ ডলারের ভিপিএস এ Nginx, Next.js ফ্রন্টএন্ড, নোড ব্যাকএন্ড, Postgres ডাটাবেজ এবং Redis—সবকিছু একসাথে অনায়াসে চালানো যায়। অথচ PaaS এ এটি চালাতে মাসে ৫০-১০০ ডলার চলে যায়।",
      e: "On a $6/mo Linux VPS (1 vCPU, 2GB RAM, NVMe), proper architecture (Nginx, PM2/Docker, 4GB swap) comfortably co-hosts: Next.js frontend, Node.js API, PostgreSQL database, Redis cache, and Let's Encrypt SSL. Total idle RAM footprint is ~700MB, delivering massive cost savings over multi-tier PaaS plans.",
      tip: "দোকানি এবং রিয়েল-ওয়ার্ল্ড স্টার্টআপের এই আর্থিক সাশ্রয় ইন্টারভিউতে তুলে ধরলে বিজনেস ও আর্কিটেকচার উভয় সেন্স প্রমাণিত হয়।"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "PaaS Pricing Explosion: ট্রাফিক বাড়ার সাথে সাথে কেন PaaS-এর ক্লাউড বিল ২০ গুণ লাফ দেয় এবং VPS কেন প্রেডিক্টেবল?",
      m: "PaaS প্ল্যাটফর্মগুলো মিটারড প্রাইসিং (Metered Billing) মডেলে চলে: তারা ব্যান্ডউইথ (egress bandwidth), সার্ভারলেস ফাংশন এক্সিকিউশন টাইম (GB-seconds), ডাটাবেজ স্টোরেজ এবং বিল্ড মিনিটের ওপর প্রতি ইউনিটে চড়া দাম ধরে। অ্যাপ্লিকেশনে ট্রাফিক বাড়লে বা কোনো বট ক্রল করলে মাসের শেষে বিল হঠাৎ $২০ থেকে $৮০০ ডলারে পৌঁছে যায় (Cloud Shock Bill)! কিন্তু VPS-এর ক্ষেত্রে প্রাইসিং সম্পূর্ণ প্রেডিক্টেবল (Fixed Monthly Cost): আপনি প্রতি মাসে ফ্ল্যাট $১০ বা $২০ ডলার পে করবেন—সেখানে টেরাবাইট ব্যান্ডউইথ ও আনলিমিটেড সিপিইউ এক্সিকিউশন অন্তর্ভুক্ত থাকে। ফলে বাজেটের বাইরে কোনো অপ্রত্যাশিত বিলের ভয় থাকে না।",
      b: "PaaS প্ল্যাটফর্মে রিকোয়েস্ট ও ব্যান্ডউইথের ওপর প্রতি ইউনিটে বিল করায় ট্রাফিক বাড়লে অপ্রত্যাশিতভাবে বিল কয়েক গুণ বেড়ে যায়। VPS এ নির্দিষ্ট মাসিক ফি থাকায় ক্লাউড বিল সবসময় সম্পূর্ণ প্রেডিক্টেবল ও নিয়ন্ত্রণে থাকে।",
      e: "PaaS platforms monetize through metered compute, charging per GB-second, invocation count, and egress bandwidth. Traffic spikes or DDoS scrapes cause astronomical unexpected bills. A VPS provides fixed, predictable monthly billing with generous bundled multi-terabyte egress allowances.",
      tip: "বলো: 'VPS offers predictable flat-rate unit economics, immune to PaaS egress and invocation billing shocks.'"
    },
    {
      lvl: "lvl2",
      q: "Next.js অ্যাপ্লিকেশনের 'Vercel Lock-in' বলতে কী বোঝায় এবং কীভাবে Next.js-কে নিজস্ব VPS-এ সেলফ-হোস্ট করবে?",
      m: "Next.js-এর কিছু অ্যাডভান্সড ফিচার (যেমন Incremental Static Regeneration - ISR, Image Optimization, Edge Middleware) বাই-ডিফল্ট Vercel-এর নিজস্ব সার্ভারলেস ক্লাউড আর্কিটেকচারের সাথে অপটিমাইজ করা। অনেকেই মনে করে Vercel ছাড়া Next.js চালানো অসম্ভব! কিন্তু আমরা নিজস্ব VPS-এ ১০০% সেলফ-হোস্ট করতে পারি: (১) `next.config.js`-এ `output: 'standalone'` কনফিগার করি। (২) Docker কন্টেইনার বা PM2 দিয়ে `server.js` রান করি। (৩) ইমেজ অপটিমাইজেশনের জন্য লাইব্রেরি (Sharp) যুক্ত করি। (৪) Nginx রিভার্স প্রক্সি দিয়ে SSL ও ক্যাশিং হ্যান্ডেল করি। এর ফলে সম্পূর্ণ Next.js কোনো ভেন্ডর-লকইন ছাড়াই নিজস্ব সার্ভারে নিখুঁতভাবে চলে।",
      b: "ভার্সেল ছাড়া নেক্সট.জেএস চালানো যাবে না—এই ধারণাকে ভেন্ডর লক-ইন বলে। next.config.js এ output: 'standalone' দিয়ে ডকার বা PM2 এবং Nginx ব্যবহার করে যেকোনো উবুন্টু VPS এ নেক্সট.জেএস সম্পূর্ণ ফ্রিতে সেলফ-হোস্ট করা যায়।",
      e: "Next.js features (ISR, Image Optimization) are tailor-made for Vercel's serverless primitives. To liberate Next.js onto a self-hosted VPS, set output: 'standalone' in next.config.js, build with Sharp for native image compression, and supervise via PM2 or Docker behind Nginx.",
      code: "// next.config.js:\nmodule.exports = {\n  output: 'standalone',\n  images: {\n    unoptimized: false,\n  }\n};"
    },
    {
      lvl: "lvl2",
      q: "Hybrid Architecture: Vercel-এ Next.js ফ্রন্টএন্ড এবং Ubuntu VPS-এ Node.js Backend ও Database রাখার সুবিধা কী?",
      m: "এটি আধুনিক হাইব্রিড প্রোডাকশন স্ট্যান্ডার্ড: (১) `Frontend on Vercel`: ফ্রন্টএন্ড UI থাকে ভার্সেলের গ্লোবাল Edge CDN-এ। ফলে পৃথিবীর যেকোনো প্রান্ত থেকে ভিজিটররা মিলিসেকেন্ডে পেজ লোড পায়, স্বয়ংক্রিয় প্রিভিউ ডিপ্লয়মেন্ট এবং জিরো-কনফিগ এসএসএল পাওয়া যায়। (২) `Backend & Database on VPS`: সমস্ত ভারী ডাটাবেজ (PostgreSQL, Redis), ট্রানজ্যাকশন ও ব্যাকগ্রাউন্ড ওয়ার্কার থাকে একটি শক্তিশালী কম খরচের উবুন্টু VPS-এ। ফলে কোনো সার্ভারলেস কোল্ড স্টার্ট থাকে না, আনলিমিটেড ডেটাবেজ কানেকশন পাওয়া যায় এবং ক্লাউড খরচ সর্বনিম্ন থাকে। দুই প্রান্তের যোগাযোগ সুরক্ষিত করতে HTTPS এবং CORS পলিসি কার্যকর করা হয়।",
      b: "হাইব্রিড মডেলে ফ্রন্টএন্ড থাকে ভার্সেলে যাতে গ্লোবাল সিডিএন দিয়ে পেজ দ্রুত খোলে, আর ব্যাকএন্ড ও ডাটাবেজ থাকে VPS এ যাতে কোনো কোল্ড স্টার্ট না থাকে এবং সার্ভার খরচ সর্বনিম্ন থাকে।",
      e: "A Hybrid Architecture hosts Next.js on Vercel for global Edge CDN delivery, instant preview URLs, and frontend speed, while pairing it with an Ubuntu VPS for persistent backend APIs, PostgreSQL, and Redis. This combines peak developer velocity with zero cold starts and low hosting overhead.",
      tip: "বলো: 'Hybrid Architecture couples Vercel's global edge frontend with a dedicated VPS for persistent, low-latency database execution.'"
    },
    {
      lvl: "lvl2",
      q: "PaaS থেকে VPS-এ মাইগ্রেশন করার সময় কী কী অপারেশনাল দায়িত্ব (DevOps Overhead) টিমের ওপর আসে?",
      m: "PaaS স্বয়ংক্রিয়ভাবে যেসব কাজ পর্দার আড়ালে করত, VPS-এ সেগুলো ডেভেলপারদের নিজেদের হাতে নিতে হয়: (১) `OS Security Patching`: উবুন্টু সিকিউরিটি আপডেট ও কার্নেল প্যাচিং নিয়মিত করা। (২) `SSL Certificate Renewal`: Let's Encrypt Certbot কনফিগার ও অটো-রিনিউ নিশ্চিত করা। (৩) `Database Backup & Disaster Recovery`: ক্রন স্ক্রিপ্ট দিয়ে স্বয়ংক্রিয়ভাবে ডাটাবেজ ডাম্প নিয়ে ক্লাউড স্টোরেজে পাঠানো। (৪) `Process Supervision`: সার্ভার রিবুট বা ক্র্যাশে অ্যাপ অটো-রিস্টার্টের জন্য PM2 বা systemd ঠিক রাখা। (৫) `Firewall & DDoS Protection`: UFW, Fail2ban এবং Cloudflare দিয়ে সার্ভার সুরক্ষিত রাখা।",
      b: "ভিপিএসে গেলে ওএস সিকিউরিটি আপডেট, এসএসএল রিনিউয়াল, ডাটাবেজ ব্যাকআপ, অটো-রিস্টার্ট এবং ফায়ারওয়াল পরিচালনার দায়িত্ব টিমের নিজের ওপর আসে। সঠিক স্ক্রিপ্ট ও অটোমেশন দিয়ে এটি সহজে নিয়ন্ত্রণ করা যায়।",
      e: "Migrating from PaaS to a self-managed VPS assumes responsibility for: OS security patching, Certbot SSL automation, cron-based offsite database backups, PM2/systemd process supervision, and perimeter firewall security via UFW and Fail2ban.",
      tip: "ইন্টারভিউতে এই ৫টি অপারেশনাল দায়িত্ব স্পষ্টভাবে তুলে ধরলে তোমার পরিপক্বতা প্রকাশ পাবে।"
    },
    {
      lvl: "lvl2",
      q: "Dokku এবং Coolify কী এবং কীভাবে তারা নিজস্ব VPS-কে একটি প্রাইভেট Heroku / Vercel-এ রূপান্তর করে?",
      m: "`Dokku` এবং `Coolify` হলো সেলফ-হোস্টেড ওপেন-সোর্স PaaS ইঞ্জিন। আপনি একটি সাধারণ উবুন্টু VPS-এ Coolify বা Dokku ইনস্টল করলেই আপনার সার্ভারে একটি আকর্ষণীয় ওয়েব ড্যাশবোর্ড চলে আসে! এরপর Heroku বা Vercel-এর মতোই: গিটহাব রিপোজিটরি কানেক্ট করলেই কোড পুশ হলে অটো-বিল্ড ও অটো-ডিপ্লয় হয়, এক ক্লিকে PostgreSQL/Redis ডেটাবেজ প্রভিশন করা যায়, স্বয়ংক্রিয় SSL সার্টিফিকেট জেনারেট হয় এবং রিভার্স প্রক্সি কনফিগার হয়ে যায়। এর ফলে PaaS-এর সমস্ত চমৎকার সুবিধা পাওয়া যায় একটি মাত্র $৫-$১০ ডলারের সস্তা VPS-এর ওপর—কোনো অতিরিক্ত সাবস্ক্রিপশন ফি ছাড়াই!",
      b: "Dokku ও Coolify হলো ওপেন-সোর্স PaaS যা নিজস্ব সস্তা VPS-কে একটি প্রাইভেট Heroku বা Vercel বানিয়ে দেয়। গিট পুশ অটো-ডিপ্লয়, অটো-এসএসএল এবং এক ক্লিকে ডাটাবেজ তৈরির সুবিধা পাওয়া যায় সম্পূর্ণ ফ্রিতে।",
      e: "Dokku and Coolify are open-source, self-hosted PaaS solutions. Installed on a raw VPS, they provide a private Heroku/Vercel dashboard: automated Git-push deployments, one-click managed PostgreSQL/Redis databases, and automated Traefik/Nginx SSL routing with zero ongoing PaaS subscription overhead.",
      tip: "বলো: 'Coolify turns a raw $5 VPS into a private self-hosted PaaS with Git-push deployments and one-click databases.'"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Serverless Database Connection Exhaustion: Vercel Serverless Function থেকে সরাসরি PostgreSQL-এ কানেক্ট করলে কেন ডেটাবেজ ক্র্যাশ করে এবং Neon/Supabase Pooler কীভাবে সমাধান করে?",
      m: "সার্ভারলেস ফাংশনগুলো ট্রাফিক স্পাইক হলে নিমেষেই শত শত কনকারেন্ট ইনস্ট্যান্স স্পন করে। প্রতিটি ইনস্ট্যান্স নিজস্ব ডাটাবেজ কানেকশন পুল খোলার চেষ্টা করে (`new PrismaClient()`)। ফলে মাত্র ৫০০ জন ভিজিটর আসলে ৫০০টি সরাসরি কানেকশন ডেটাবেজে আঘাত হানে—যা পোস্টগ্রেসের `max_connections` (ডিফল্ট ১০০) মুহূর্তে শেষ করে ডেটাবেজ ক্র্যাশ করায়! সমাধান: সার্ভারলেস এপিআইতে সরাসরি ডেটাবেজ পোর্টে কানেক্ট করা সম্পূর্ণ নিষিদ্ধ। মাঝখানে একটি কানেকশন পুলার ব্যবহার করতে হবে (যেমন PgBouncer, Supabase Connection Pooler পোর্ট ৬৫৪৩, অথবা Neon Serverless Driver HTTP/WebSockets)। এটি শত শত সার্ভারলেস সংযোগকে ট্রানজ্যাকশন মোডে শেয়ার করে ডেটাবেজে মাত্র ২০-৩০টি কানেকশনে সীমাবদ্ধ রাখে।",
      b: "সার্ভারলেস ফাংশন প্রতি রিকোয়েস্টে নতুন কানেকশন খুলে ডাটাবেজের লিমিট শেষ করে ফেলে। PgBouncer বা Supabase Pooler ব্যবহার করে শত শত কানেকশনকে অল্প কয়েকটি স্থায়ী কানেকশনে শেয়ার করে ডেটাবেজ সুরক্ষিত রাখা হয়।",
      e: "Serverless functions burst to hundreds of concurrent container instances, each attempting to establish direct database connection pools, instantly overwhelming PostgreSQL's max_connections limit. Mitigate by routing traffic through PgBouncer, AWS RDS Proxy, or serverless HTTP database drivers (Neon/Supabase pooler).",
      code: "// Database connection using pooled port 6543 with pgbouncer flag:\nDATABASE_URL=\"postgres://user:pass@db.dokani.com:6543/prod?pgbouncer=true\""
    },
    {
      lvl: "lvl3",
      q: "Global Edge Network Architecture: Cloudflare Workers / Vercel Edge Middleware কীভাবে ল্যাটেন্সি ০ মিলিসেকেন্ডে নামিয়ে আনে?",
      m: "প্রথাগত ক্লাউড সার্ভার একটি নির্দিষ্ট ডেটাসেন্টারে থাকে (যেমন ফ্রাঙ্কফুর্ট বা ওহাইও); বাংলাদেশ থেকে সেখানে রিকোয়েস্ট যেতে ২০০ মিলিসেকেন্ড ল্যাটেন্সি লাগে। Edge Network হলো বিশ্বব্যাপী ৩০০+ শহরে ছড়িয়ে থাকা CDN নোডের নেটওয়ার্ক (যেমন ঢাকা ও চট্টগ্রামে ক্লাউডফ্লেয়ার এজ পয়েন্ট)। Edge Middleware একটি অতি-দ্রুত V8 আইসোলেট (Isolate) আর্কিটেকচারে সরাসরি ইউজারের সবচেয়ে কাছের শহরে চলে। ইউজার রিকোয়েস্ট পাঠানো মাত্রই ঢাকার এজ নোড অথেনটিকেশন যাচাই, জিও-রাউটিং, রিডাইরেক্ট বা বট ব্লকিং সম্পন্ন করে দেয় মাত্র ২ মিলিসেকেন্ডে—মূল সার্ভারে রিকোয়েস্ট পৌঁছানোরও প্রয়োজন হয় না।",
      b: "এজ নেটওয়ার্ক ইউজারের সবচেয়ে কাছের শহরে (যেমন ঢাকা এজ নোড) V8 আইসোলেটে কোড এক্সিকিউট করে। ফলে মূল সার্ভারে না গিয়েও ২ মিলিসেকেন্ডে অথেনটিকেশন, রাউটিং ও বট চেকিং শেষ হয়ে যায়।",
      e: "Edge Networks execute code within lightweight V8 isolates running directly inside global Point of Presence (PoP) edge data centers closest to the user. Edge Middleware handles authentication verification, geolocation redirects, and A/B test routing in sub-5ms latency without backhauling to origin servers.",
      tip: "বলো: 'Edge middleware runs on V8 isolates in local edge PoPs, evaluating requests before hitting origin servers.'"
    },
    {
      lvl: "lvl3",
      q: "VPS স্কেলিং কৌশল: Vertical Scaling (রিসোর্স বৃদ্ধি) বনাম Horizontal Scaling (সার্ভার বৃদ্ধি) কখন কোনটি বেছে নেবে?",
      m: "(১) `Vertical Scaling (Scale Up)`: একই সার্ভারের সিপিইউ ও র‍্যাম বাড়ানো (যেমন ৪GB র‍্যাম থেকে ১৬GB বা ৩২GB করা)। সুবিধা: কোনো আর্কিটেকচার পরিবর্তন লাগে না, কোড একই থাকে, ডেটাবেজ ট্রানজ্যাকশন ও কনসিস্টেন্সি জটিলতা থাকে না। একটি অপটিমাইজড নোড + পোস্টগ্রেস সার্ভার ভার্টিক্যালি স্কেল করে দৈনিক লাখ লাখ রিকোয়েস্ট অনায়াসে হ্যান্ডেল করতে পারে (৯০% অ্যাপের জন্য এটিই সেরা ও সাশ্রয়ী)। (২) `Horizontal Scaling (Scale Out)`: একাধিক সমান্তরাল সার্ভার বসিয়ে লোড ব্যালেন্সার দিয়ে ট্রাফিক ভাগ করা। কখন দরকার: যখন একটি সার্ভারের হার্ডওয়্যার লিমিট শেষ হয়ে যায়, বা হাই-অ্যাভেইলেবিলিটি (High Availability / Failover) বাধ্যতামূলক হয়। এর জন্য অ্যাপ্লিকেশনকে শতভাগ স্টেটলেস হতে হয় এবং সেন্ট্রালাইজড ডেটাবেজ ও রেডিস ক্লাস্টার প্রয়োজন হয়।",
      b: "ভার্টিক্যাল স্কেলিং হলো সার্ভারের র‍্যাম-সিপিইউ বাড়ানো যা সহজ ও জটিলতাহীন। হরাইজন্টাল স্কেলিং হলো একাধিক সার্ভার বাড়ানো যা হাই-অ্যাভেইলেবিলিটি নিশ্চিত করে কিন্তু স্টেটলেস আর্কিটেকচার ও লোড ব্যালেন্সার দাবি করে।",
      e: "Vertical Scaling (Scale Up) upgrades single-node CPU/RAM, requiring zero architectural refactoring while comfortably powering millions of requests on optimized stacks. Horizontal Scaling (Scale Out) introduces multiple stateless nodes behind load balancers for fault tolerance and high availability once single-box physical limits are reached.",
      tip: "বলো: 'Always scale vertically first to maximize single-box efficiency before introducing distributed horizontal complexity.'"
    },
    {
      lvl: "lvl3",
      q: "Production Disaster Recovery on VPS: সম্পূর্ণ VPS ধ্বংস হয়ে গেলে অন্য একটি ফ্রেশ VPS-এ ১০ মিনিটে পুরো সিস্টেম কীভাবে রিস্টোর করবে?",
      m: "আমরা 'Infrastructure as Code' এবং সম্পূর্ণ অটোমেটেড রিকভারি পাইপলাইন রাখি: (১) গিটহাবে একটি `provision.sh` স্ক্রিপ্ট থাকে যা ফ্রেশ উবুন্টু ওএস-এ Node, Docker, Nginx, UFW এক ক্লিকে ইনস্টল করে। (২) সমস্ত কনফিগারেশন (`docker-compose.yml`, `nginx.conf`, `ecosystem.config.js`) গিট রিপোজিটরিতে ভার্সন কন্ট্রোল্ড থাকে। (৩) AWS S3 Glacier থেকে ক্রন-ব্যাকআপ করা সর্বশেষ ডেটাবেজ ডাম্প ফাইল ডাউনলোড করে `pg_restore` চালাই। (৪) Cloudflare DNS-এ সার্ভারের এ-রেকর্ড (A Record) পরিবর্তন করে নতুন VPS-এর আইপি বসিয়ে দিই। মাত্র ১০ মিনিটের মধ্যে সম্পূর্ণ বিজনেস পুনরায় সচল হয়ে যায় (RTO < ১৫ মিনিট)।",
      b: "provision.sh স্ক্রিপ্ট দিয়ে নতুন সার্ভারে সফটওয়্যার সেটআপ, গিট থেকে কনফিগ ক্লোন, S3 থেকে লেটেস্ট ব্যাকআপ রিস্টোর এবং Cloudflare এ নতুন আইপি আপডেট করে ১০ মিনিটে সম্পূর্ণ সিস্টেম রিকভার করা যায়।",
      e: "Achieve a sub-15-minute RTO by maintaining Infrastructure-as-Code: run an automated provisioning script to stands up base runtimes, clone declarative Docker Compose repositories, restore the latest encrypted PostgreSQL dump from S3, and point Cloudflare DNS A-records to the replacement VPS IP.",
      tip: "বলো: 'Infrastructure-as-Code scripts combined with automated offsite S3 restores reduce our RTO to under 15 minutes.'"
    },
    {
      lvl: "lvl3",
      q: "PaaS-এ ওয়েবসকেট (Socket.io) সংযোগের সীমাবদ্ধতা কী এবং VPS-এ কেন রিয়েল-টাইম সকেট সংযোগ শত গুণ বেশি স্টেবল?",
      m: "PaaS বা সার্ভারলেস প্ল্যাটফর্মে (Vercel) সরাসরি দ্বিমুখী স্থায়ী TCP ওয়েবসকেট সাপোর্ট করে না (কারণ সার্ভারলেস ফাংশন কিছু সেকেন্ড পরেই বন্ধ হয়ে যায়)। ফলে তাদের জন্য থার্ড পার্টি পেইড সার্ভিস (যেমন Pusher বা Ably) নিতে হয় যা প্রচুর ব্যয়বহুল। Render বা Railway-তে সকেট চললেও ডিপ্লয়মেন্ট বা স্লিপিংয়ের সময় সব কানেকশন ড্রপ করে। অপরদিকে উবুন্টু VPS-এ Nginx এবং Node.js-এর স্থায়ী লং-লিভড TCP সকেট সংযোগ থাকে—যা কোনো ড্রপ বা এক্সট্রা বিল ছাড়াই হাজার হাজার ক্যাশিয়ারের লাইভ পিওএস বারকোড স্ক্যানার ও রিয়েল-টাইম নোটিফিকেশন নিরবচ্ছিন্নভাবে মাসের পর মাস সচল রাখে।",
      b: "ভার্সেল সার্ভারলেস হওয়ায় স্থায়ী ওয়েব-সকেট চলে না এবং পুশার জাতীয় থার্ড পার্টি সার্ভিস কিনতে হয়। VPS এ Nginx দিয়ে স্থায়ী সকেট চলায় কোনো অতিরিক্ত খরচ ও ডিসকানেকশন ছাড়াই লাইভ সকেট নিরবচ্ছিন্নভাবে কাজ করে।",
      e: "Serverless PaaS platforms cannot maintain persistent stateful WebSockets due to execution timeouts, forcing expensive third-party brokers (Pusher/Ably). A self-managed VPS supports native, persistent TCP WebSocket connections via Nginx and Node, sustaining thousands of persistent cashier sockets at zero marginal cost.",
      tip: "মনে রাখবে: 'Native WebSockets thrive on persistent VPS architectures; serverless PaaS requires paid external pub/sub brokers.'"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি স্টার্টআপ Vercel Pro এবং Supabase Pro দিয়ে যাত্রা শুরু করেছিল। ৬ মাস পর ইউজার ট্রাফিক বাড়ায় তাদের ক্লাউড বিল হঠাৎ প্রতি মাসে $১,২০০ ডলার আসছে যা তাদের বাজেটের বাইরে! কীভাবে পুরো স্ট্যাককে একটি $৪০/মাস VPS-এ মাইগ্রেট করে ক্লাউড বিল ৯৫% কমাবে?",
      m: "মাইগ্রেশন আর্কিটেকচার প্ল্যান: (১) একটি শক্তিশালী $৪০/মাসের VPS (৪ Core, ৮GB RAM, Hetzner বা DigitalOcean) প্রভিশন করব। (২) Supabase থেকে `pg_dump` দিয়ে ডেটাবেজ এক্সপোর্ট করে VPS-এর সেলফ-হোস্টেড PostgreSQL-এ রিস্টোর করব। (৩) Next.js ফ্রন্টএন্ডে `output: 'standalone'` দিয়ে ডকার বা PM2 দিয়ে লোকালি রান করব। (৪) Nginx রিভার্স প্রক্সি কনফিগার করে SSL টার্মিনেশন ও স্ট্যাটিক ক্যাশিং সক্রিয় করব। (৫) সামনে ফ্রি Cloudflare CDN বসাব। ফলাফল: $১,২০০ ডলারের বিল নেমে আসবে মাত্র $৪০ ডলারে, এবং অ্যাপ্লিকেশন পারফরম্যান্স উল্টো দ্বিগুণ দ্রুত হবে কারণ ফ্রন্টএন্ড, ব্যাকএন্ড ও ডেটাবেজ একই লোকাল নেটওয়ার্কে অবস্থান করবে! স্টার্টআপের বার্ষিক প্রায় $১৪,০০০ ডলার সেভ হবে।",
      b: "Hetzner ভিপিএসে সেলফ-হোস্টেড Postgres ও Next.js standalone মোডে Nginx দিয়ে সেটআপ করব। ডাটাবেজ ও ব্যাকএন্ড একই মেশিনে থাকায় লেটেন্সি কমবে এবং মাসিক ১২০০ ডলারের খরচ নেমে আসবে মাত্র ৪০ ডলারে।",
      e: "Execute a PaaS-to-VPS repatriation: Provision an 8GB RAM VPS ($40/mo), restore the Supabase dump to self-hosted PostgreSQL, containerize Next.js in standalone mode behind Nginx, and proxy through Cloudflare. Co-locating frontend and database eliminates network round-trips while saving $14,000 annually.",
      tip: "এই 'Cloud Repatriation' এবং ৯৫% কস্ট কাটিং কেস স্টাডি ইন্টারভিউতে তোমাকে একজন আর্কিটেক্ট হিসেবে প্রতিষ্ঠিত করবে।"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: Render ফ্রি টিয়ারে হোস্ট করা একটি ব্যাকএন্ড এপিআইতে ফ্রন্টএন্ড থেকে রিকোয়েস্ট পাঠালে প্রথমবার লোড হতে প্রায় ১ মিনিট সময় নিচ্ছে! ক্লায়েন্টরা ভাবছে অ্যাপ নষ্ট হয়ে গেছে। কারণ কী এবং তাৎক্ষণিক সমাধান কী?",
      m: "কারণ: Render-এর ফ্রি টিয়ারে কোনো সার্ভিস ১৫ মিনিট অলস থাকলে স্বয়ংক্রিয়ভাবে স্লিপ বা স্পিন-ডাউন হয়ে যায়। নতুন রিকোয়েস্ট এলে কন্টেইনার বুট হতে এবং নোড রানটাইম চালু হতে ৫০-৬০ সেকেন্ড কোল্ড স্টার্ট ল্যাগ নেয়! তাৎক্ষণিক ওয়ার্কঅ্যারাউন্ড: (১) একটি ফ্রি আপটাইম মনিটর (যেমন UptimeRobot বা Cron-job.org) দিয়ে প্রতি ১০ মিনিট পর পর এপিআই-এর `/health` এন্ডপয়েন্টে পিং পাঠানো—যাতে কন্টেইনার কখনোই স্লিপে না যায় (Keep-alive ping)। (২) স্থায়ী প্রোডাকশন সমাধান: সার্ভিসটিকে $৭/মাসের রেন্ডার পেইড টিয়ারে আপগ্রেড করা অথবা নিজস্ব $৬ VPS-এ সরিয়ে নেওয়া যেখানে প্রসেস সার্বক্ষণিক ১০০% জীবন্ত থাকে।",
      b: "রেন্ডার ফ্রি টিয়ার ১৫ মিনিট পর স্লিপে চলে যায়। UptimeRobot দিয়ে প্রতি ১০ মিনিটে /health এপিআই পিং করে সার্ভিসটিকে সার্বক্ষণিক জাগিয়ে রাখা যায়। আর স্থায়ী সমাধান হলো নিজস্ব VPS-এ স্থানান্তর করা।",
      e: "Render's free tier spins down services after 15 minutes of inactivity, causing 50-second cold boot stalls. Immediate workaround: configure UptimeRobot to ping a /health endpoint every 10 minutes to prevent container dormancy. Long-term fix: migrate to a persistent VPS.",
      code: "// Ping keep-alive health check:\napp.get('/health', (req, res) => res.status(200).send('OK'));"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: তোমার টিমের একজন ডেভেলপার Vercel-এ ডিপ্লয় করা Next.js অ্যাপের ভেতরে `fs.writeFileSync('/tmp/invoice.pdf')` দিয়ে ইনভয়েস সেভ করার কোড লিখেছে। কিন্তু ইউজার যখন কিছুক্ষণ পর ডাউনলোড করতে যাচ্ছে তখন ফাইল আর খুঁজে পাওয়া যাচ্ছে না (`ENOENT`)! কেন এটি ঘটছে এবং সঠিক আর্কিটেকচার কী?",
      m: "সমস্যার কারণ: Vercel-এর সার্ভারলেস ফাংশনগুলো সম্পূর্ণ স্টেটলেস এবং ক্ষণস্থায়ী (Ephemeral)। যে ল্যাম্বডা ফাংশনটি ফাইল তৈরি করেছে, রিকোয়েস্ট শেষ হওয়ার সাথে সাথে তা ধ্বংস হয়ে গেছে; পরবর্তী ডাউনলোড রিকোয়েস্টটি পড়েছে সম্পূর্ণ অন্য একটি নতুন সার্ভারলেস ইনস্ট্যান্সে—যার ফলে লোকাল ডিস্কে ফাইল পাওয়া অসম্ভব। সঠিক আর্কিটেকচার: সার্ভারলেস পরিবেশে কখনোই কোনো ফাইল লোকাল ফাইলসিস্টেমে সেভ করা যাবে না! ফাইল তৈরি করে সরাসরি ক্লাউড অবজেক্ট স্টোরেজে (AWS S3 / Supabase Storage / Cloudflare R2) স্ট্রিম করতে হবে এবং কাস্টমারকে একটি সময়সীমিত S3 Presigned URL প্রদান করতে হবে।",
      b: "ভার্সেল সার্ভারলেস ফাংশন ক্ষণস্থায়ী হওয়ায় কাজ শেষে ফাইল মুছে যায়। ফাইল লোকাল ডিস্কে না রেখে সরাসরি AWS S3 বা ক্লাউড স্টোরেজে আপলোড করতে হবে এবং ডাউনলোড করতে Presigned URL ব্যবহার করতে হবে।",
      e: "Serverless containers are ephemeral; files written to /tmp vanish when the container is recycled, making them unreachable by subsequent requests. The correct architecture streams generated PDF buffers directly to object storage (AWS S3 / Cloudflare R2) and serves expiring Presigned URLs to clients.",
      code: "const upload = await s3.send(new PutObjectCommand({ Bucket, Key, Body: pdfBuffer }));\nreturn presignedDownloadUrl;"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: একটি উবুন্টু VPS সার্ভারে নোড অ্যাপ চলছে। ট্রাফিক বাড়ার সাথে সাথে সার্ভার হঠাৎ রেসপন্স করা বন্ধ করে দিয়েছে এবং SSH দিয়েও লগইন করা যাচ্ছে না। ক্লাউড কনসোলে দেখাচ্ছে CPU 100% এবং RAM 99%। তুমি কীভাবে এটি রিকভার এবং ক্যাপাসিটি অপটিমাইজ করবে?",
      m: "রিকভারি ও অপটিমাইজেশন: (১) ক্লাউড প্রোভাইডারের ড্যাশবোর্ড থেকে হার্ড রিবুট (Power Cycle) দেব যাতে সিস্টেম পুনরায় এক্সেসযোগ্য হয়। (২) টার্মিনালে ঢুকে অবিলম্বে ৪GB Swap মেমোরি কনফিগার করব—যাতে ভবিষ্যতে র‍্যাম পূর্ণ হলেও কার্নেল ক্র্যাশ না করে। (৩) PM2 কনফিগে `max_memory_restart: '800M'` এনফোর্স করব। (৪) Nginx-এ Rate Limiting এবং Cloudflare প্রক্সি চালু করব যাতে কোনো বট অপ্রয়োজনীয় ট্রাফিক দিয়ে সার্ভার স্যাচুরেট না করতে পারে। (৫) যদি ট্রাফিক সত্যিই লেজিটিমেট বিজনেস গ্রোথ হয়, তবে ক্লাউড ড্যাশবোর্ড থেকে মাত্র ২ ক্লিকে VPS-কে ২GB থেকে ৪GB বা ৮GB র‍্যামে ভার্টিক্যালি স্কেল (Resize Instance) করব।",
      b: "হার্ড রিস্টার্ট দিয়ে সার্ভারে ঢুকে ৪GB সোয়াপ তৈরি করব এবং PM2 মেমোরি লিমিট বসাব। সামনে Cloudflare রেট লিমিটিং দেব এবং প্রয়োজনীয় ক্ষেত্রে ক্লাউড ড্যাশবোর্ড থেকে সার্ভারের র‍্যাম-সিপিইউ রিসাইজ করে স্কেল করব।",
      e: "Issue a cloud dashboard power-cycle to recover terminal access. Immediately provision a 4GB swapfile to absorb RAM spikes, enforce PM2 max_memory_restart caps, and enable Cloudflare DDoS rate limiting. Resize the VPS droplet to higher compute tiers if traffic represents legitimate business scaling.",
      tip: "বলো: 'Immediate power-cycle recovery, provision 4GB swap space, enforce PM2 memory ceilings, and resize instance.'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: Vercel-এ ডিপ্লয় করা ফ্রন্টএন্ড এবং VPS-এ চলা ব্যাকএন্ড এপিআইয়ের মধ্যে যোগাযোগ করার সময় ব্রাউজারে এরর আসছে: `Access to fetch at 'https://api.dokani.com' has been blocked by CORS policy`। কীভাবে এটি ক্লিনভাবে সমাধান করবে?",
      m: "সমাধানের দুটি বিকল্প: (১) `CORS Headers in Backend`: ব্যাকএন্ড নোড অ্যাপ্লিকেশনে (Express) `cors` মিডলওয়্যারে শুধুমাত্র অনুমোদিত ফ্রন্টএন্ড ডোমেনগুলো নির্দিষ্ট করে দেব: `origin: ['https://dokani.vercel.app', 'https://dokani.bip.sg']` এবং `credentials: true` এলাউ করব। (২) `Best Architecture (Custom Domain Rewrite)`: Next.js ফ্রন্টএন্ডে `next.config.js`-এ একটি রিরাইট রুল বসাব: `async rewrites() { return [{ source: '/api/:path*', destination: 'https://api.dokani.com/api/:path*' }] }`। এর ফলে ব্রাউজার মনে করবে রিকোয়েস্টটি একই অরিজিনে যাচ্ছে, ফলে কোনো CORS পলিসিই ট্রিগার হবে না এবং সম্পূর্ণ মসৃণ যোগাযোগ নিশ্চিত হবে।",
      b: "ব্যাকএন্ডে cors মিডলওয়্যারে ফ্রন্টএন্ড ডোমেন এলাউ করতে হবে। অথবা নেক্সট.জেএস-এর next.config.js ফাইলে rewrites() ব্যবহার করে এপিআই কল রিরাইট করলে ব্রাউজারে কোনো CORS ঝামেলাই থাকে না।",
      e: "Resolve CORS either by configuring Express cors middleware with whitelisted origins, or preferably by declaring Next.js rewrites in next.config.js to proxy /api/* requests to the VPS backend origin under the same hostname, eliminating CORS handshakes entirely.",
      code: "// next.config.js rewrites:\nasync rewrites() {\n  return [\n    { source: '/api/:path*', destination: 'https://api.dokani.com/api/:path*' }\n  ];\n}"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani POS-এর প্রোডাকশন হোস্টিং আর্কিটেকচার কেন PaaS বাদ দিয়ে সম্পূর্ণ উবুন্টু VPS-এ পরিচালিত হয়?",
      m: "দোকানি পিওএসে শত শত দোকানের ক্যাশিয়াররা প্রতি সেকেন্ডে লাইভ বারকোড স্ক্যান ও দ্রুত চেকআউট সম্পন্ন করে। PaaS বাদ দিয়ে VPS বেছে নেওয়ার ৩টি মূল আর্কিটেকচারাল কারণ: (১) `Zero Cold Starts`: ক্যাশিয়ারের সামনে কোনো ৩ সেকেন্ডের সার্ভারলেস ল্যাগ থাকতে পারে না; সার্বক্ষণিক রানিং VPS-এ রেসপন্স টাইম থাকে মাত্র ২-৩ মিলিসেকেন্ড। (২) `Persistent WebSockets`: লাইভ ইনভেন্টরি ও সিঙ্ক নোটিফিকেশনের জন্য দীর্ঘস্থায়ী দ্বিমুখী TCP সকেট কানেকশন প্রয়োজন যা PaaS-এ অত্যন্ত ব্যয়বহুল ও ভঙ্গুর। (৩) `Cost Efficiency`: হাজার হাজার দোকানের সেলস ও লেজার ডেটাবেজ PaaS-এ চালালে মাসিক বিল কয়েক হাজার ডলার হতো; অপটিমাইজড উবুন্টু VPS ক্লাস্টারে মাত্র $২০-$৪০ ডলারে সম্পূর্ণ স্ট্যাক অত্যন্ত শক্তিশালীভাবে রান করছে।",
      b: "দোকানিতে কোল্ড স্টার্টহীন ২ মিলিসেকেন্ড চেকআউট স্পিড, দীর্ঘস্থায়ী রিয়েলটাইম ওয়েব-সকেট সংযোগ এবং হাজার হাজার দোকানের ডেটাবেজ পরিচালনায় ক্লাউড খরচ সর্বনিম্ন রাখতে সম্পূর্ণ সিস্টেম উবুন্টু VPS এ পরিচালনা করা হয়েছে।",
      e: "Dokani POS standardizes on Ubuntu VPS over serverless PaaS for three core imperatives: sub-3ms deterministic checkout responses without serverless cold starts, native persistent TCP WebSockets for real-time cashier sync, and massive operational cost efficiencies across multi-tenant database clusters.",
      tip: "দোকানির এই ৩টি কারণ (Zero Cold Starts, Persistent Sockets, Cost Efficiency) ইন্টারভিউতে তোমার বাস্তব অভিজ্ঞতার সবচেয়ে বড় প্রমাণ।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Hetzner Cloud বনাম AWS EC2: সাধারণ SaaS ও স্টার্টআপের জন্য হেটৎসনার কেন বর্তমানে বিশ্বব্যাপী জনপ্রিয়?",
      m: "Hetzner Cloud ইউরোপের একটি শীর্ষস্থানীয় ক্লাউড প্রোভাইডার। তুলনা: AWS EC2-তে একটি ৪ Core, ১৬GB RAM সার্ভার ও ডেটা ট্রান্সফার চালাতে মাসে প্রায় $১০০-$১২০ ডলার খরচ হয়, সাথে জটিল ভিপিসি ও ব্যান্ডউইথ বিলিং থাকে। একই কনফিগারেশনের একটি AMD EPYC ক্লাউড ভিএম Hetzner-এ মাত্র €১০-€১৫ ইউরো ($১২-$১৬ ডলার)—অর্থাৎ AWS-এর চেয়ে ৭-৮ গুণ বেশি সাশ্রয়ী! সাথে ২০TB ফ্রি ব্যান্ডউইথ এবং সুপারফাস্ট NVMe SSD স্টোরেজ থাকে। স্টার্টআপ ও গ্রোয়িং SaaS-এর জন্য অপ্রয়োজনীয় জটিল ক্লাউড বিলিং ছাড়াই বিশাল কম্পিউট পাওয়ার পাওয়ার জন্য হেটৎসনার বর্তমানে ডেভেলপারদের প্রথম পছন্দ।",
      b: "AWS EC2 এর সমপরিমাণ ক্ষমতা Hetzner মাত্র এক-সপ্তমাংশ খরচে (১২-১৫ ডলারে) প্রদান করে সাথে ২০TB ফ্রি ব্যান্ডউইথ দেয়। ফলে স্টার্টআপগুলোর জন্য হেটৎসনার অত্যন্ত জনপ্রিয় ও সাশ্রয়ী।",
      e: "Hetzner Cloud delivers AMD EPYC compute and dedicated NVMe storage at roughly 15% of AWS EC2 pricing, bundling 20TB of free egress traffic per instance. For cost-conscious SaaS startups, Hetzner eliminates AWS egress billing complexity while delivering raw high-performance hardware.",
      tip: "ইন্টারভিউতে 'Hetzner offers high-frequency NVMe compute at a fraction of AWS pricing' উল্লেখ করবে।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: জিরো-ডাউনটাইম ডেপ্লয়মেন্টে VPS-এ Blue-Green Deployment বনাম Rolling Restart: কোনটি কখন ব্যবহার করবে?",
      m: "(১) `Rolling Restart (PM2 Cluster)`: সিঙ্গেল সার্ভারে সবচেয়ে সহজ ও সেরা সমাধান। PM2 একটি একটি করে প্রসেস রিলোড করে, ফলে কোনো অতিরিক্ত সার্ভার বা হার্ডওয়্যার খরচ ছাড়াই লাইভ কানেকশন বজায় থাকে (দোকানিতে ব্যবহৃত)। (২) `Blue-Green Deployment`: যখন বড় ডেটাবেজ বা আর্কিটেকচারাল পরিবর্তন থাকে যেখানে পুরনো এবং নতুন কোড একই সাথে চলতে পারে না। দুটি সম্পূর্ণ অভিন্ন প্রোডাকশন পরিবেশ থাকে (Blue = লাইভ, Green = স্টেজিং)। নতুন কোড গ্রিনে ডিপ্লয় ও টেস্ট করার পর লোড ব্যালেন্সার বা Nginx এক সেকেন্ডে ট্রাফিক গ্রিনে ঘুরিয়ে দেয়। কোনো সমস্যা হলে সাথে সাথে ব্লু-তে ট্রাফিক ফিরিয়ে এনে ইনস্ট্যান্ট রোলব্যাক করা যায়।",
      b: "সিঙ্গেল সার্ভারে PM2 রোলিং রিস্টার্ট দিয়ে অতিরিক্ত খরচ ছাড়া জিরো-ডাউনটাইম পাওয়া যায়। আর বড় আর্কিটেকচারাল পরিবর্তনে ব্লু-গ্রিন ডেপ্লয়মেন্ট দিয়ে ট্রাফিক মুহূর্তেই নতুন বা পুরনো পরিবেশে সুইচ করা যায়।",
      e: "Rolling Restart via PM2 cluster mode achieves zero-downtime on single-instance servers with zero infrastructure overhead. Blue-Green Deployment deploys to an identical standby environment and switches load balancer traffic instantaneously, offering immediate one-second rollbacks during high-risk major releases.",
      tip: "বলো: 'We leverage PM2 rolling reloads for continuous releases and Blue-Green pivots for high-risk breaking migrations.'"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: ক্লাউড স্টোরেজে ব্যাকআপ অর্কেস্ট্রেশন: AWS S3 Lifecycle Rules দিয়ে ব্যাকআপ খরচ কীভাবে অপটিমাইজ করবে?",
      m: "প্রতিদিন ডেটাবেজ ব্যাকআপ এস৩ বাকেটে পাঠালে কয়েক মাস পর স্টোরেজ বিল বাড়তে থাকে। আমরা AWS S3-তে 'Lifecycle Management Rules' কনফিগার করি: (১) প্রথম ৭ দিন ব্যাকআপ ফাইল থাকে `S3 Standard`-এ (তাত্ক্ষণিক রিস্টোরের জন্য)। (২) ৩০ দিন পর ফাইলগুলো স্বয়ংক্রিয়ভাবে স্থানান্তরিত হয় `S3 Glacier Flexible Retrieval`-এ (যার খরচ স্ট্যান্ডার্ডের চেয়ে ৮০% কম)। (৩) ৯০ দিন পর ফাইলগুলো চলে যায় `S3 Glacier Deep Archive`-এ (যার খরচ প্রতি গিগাবাইট মাত্র $০.০০০৯৯)। (৪) ৩৬৫ দিন (১ বছর) পর অতি পুরনো ব্যাকআপ স্বয়ংক্রিয়ভাবে পার্জ বা ডিলিট হয়ে যায়। ফলে টেরাবাইট ব্যাকআপের মাসিক বিল মাত্র কয়েক ডলারে সীমাবদ্ধ থাকে।",
      b: "S3 Lifecycle রুল ব্যবহার করে ৭ দিন পর Glacier এবং ৯০ দিন পর Deep Archive এ ব্যাকআপ ফাইল স্থানান্তর করা হয়। ফলে ক্লাউড স্টোরেজ খরচ ৮০-৯০% কমে যায় এবং পুরনো ফাইল অটো-ডিলিট হয়।",
      e: "Optimize disaster recovery storage costs via AWS S3 Lifecycle Rules: retain daily snapshots in S3 Standard for 7 days, transition to S3 Glacier Flexible Retrieval after 30 days (80% cost reduction), archive into Glacier Deep Archive after 90 days, and auto-expire after 365 days.",
      code: "# S3 Lifecycle transitions:\nStandard (Days 1-7) -> Glacier (Day 30) -> Deep Archive (Day 90) -> Expire (Day 365)"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: নতুন ক্লাউড প্রজেক্ট শুরু করার সময় VPS বনাম PaaS নির্বাচনের জন্য তোমার ডিসিশন ফ্রেমওয়ার্ক কী?",
      m: "ডিসিশন ফ্রেমওয়ার্ক: (১) `PaaS (Vercel/Render)` বেছে নেব যদি: প্রজেক্টটি একদম প্রাথমিক আইডিয়া ভ্যালিডেশন বা হ্যাকাথন প্রজেক্ট হয়, টিমে কোনো ডেভঅপস ইঞ্জিনিয়ার না থাকে, ট্রাফিক খুবই কম হয় এবং দ্রুততম সময়ে ২-৩ দিনে লাইভ ডেমো দেখাতে হয়। (২) `VPS (Ubuntu/Docker)` বেছে নেব যদি: এটি একটি রিয়েল প্রোডাকশন বিজনেস (যেমন Dokani POS বা ই-কমার্স), যেখানে স্টেটফুল ডেটাবেজ ও রিয়েলটাইম সকেট দরকার, কোল্ড স্টার্ট গ্রহণযোগ্য নয়, দীর্ঘমেয়াদে ক্লাউড বিল প্রেডিক্টেবল ও সাশ্রয়ী রাখতে হবে এবং সম্পূর্ণ অবকাঠামোর ওপর নিজস্ব নিয়ন্ত্রণ প্রয়োজন।",
      b: "আইডিয়া ভ্যালিডেশন ও দ্রুত ডেমোর জন্য PaaS নির্বাচন করব। কিন্তু রিয়েল প্রোডাকশন বিজনেস, পিওএস, ডেটাবেজ পারফরম্যান্স এবং দীর্ঘমেয়াদি খরচ সাশ্রয়ের জন্য নির্ভরযোগ্য VPS নির্বাচন করব।",
      e: "Engineering Decision Framework: Choose PaaS for rapid MVPs and hackathons where team DevOps bandwidth is zero and traffic is nascent. Pivot to self-managed VPS when launching stateful commercial applications (Dokani POS), requiring zero cold starts, persistent WebSockets, full security sovereignty, and predictable unit economics.",
      tip: "ইন্টারভিউতে এই ফ্রেমওয়ার্কটি তুলে ধরা একজন প্রাজ্ঞ টেক লিডের পরিচায়ক।"
    }
  ]
};
