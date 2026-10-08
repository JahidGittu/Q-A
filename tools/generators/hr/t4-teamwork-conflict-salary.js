// Topic 4: Team Collaboration, Conflict & Salary Negotiation (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "teamwork-conflict-salary",
  name: "Team Collaboration, Conflict & Salary Negotiation",
  desc: "Resolving technical disagreements, Code review etiquette, Mentoring, Disagree and Commit, Value-based salary discussion",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "কোড রিভিউয়ের সময় কোনো সতীর্থের (Peer Developer) সাথে টেকনিক্যাল মতবিরোধ হলে কীভাবে সমাধান করবে?",
      m: "আমি মতবিরোধকে কখনো ব্যক্তিগত পর্যায়ে নিই না। সমাধান করার উপায়: (১) কোড রিভিউতে কখনোই 'তোমার কোড ভুল' বলব না, বরং গঠনমূলকভাবে বলব: 'এই এপ্রোচটিতে কি কোনো পারফরম্যান্স বা রেস কন্ডিশনের ঝুঁকি তৈরি হতে পারে? আমরা কি এটি বিবেচনা করতে পারি?'। (২) ব্যক্তিগত মতের বদলে বেঞ্চমার্ক, অফিশিয়াল ডকুমেন্টেশন বা প্রজেক্ট আর্কিটেকচারাল স্ট্যান্ডার্ডের ওপর ভিত্তি করে সিদ্ধান্ত নেব। (৩) যদি সমাধান না মেলে, তবে টেক লিডের সাথে ৫ মিনিটের একটি কল দিয়ে কনস্ট্রাক্টিভ আলোচনার মাধ্যমে টিমের বৃহত্তর স্বার্থে ফাইনাল সিদ্ধান্তে পৌঁছাব।",
      b: "কোড রিভিউতে ব্যক্তিগত অভিমতের বদলে ডকুমেন্টেশন ও পারফরম্যান্স মেট্রিক্সের উপর ভিত্তি করে আলোচনা করি। সম্মানজনক ভাষায় যুক্তি উপস্থাপন করে টিমের ভালোর জন্য টেক লিডের পরামর্শে দ্রুত ঐকমত্যে পৌঁছাই।",
      e: "I approach technical disagreements objectively: never make it personal; frame suggestions around system outcomes rather than personal preference. I reference official documentation, benchmark metrics, or architectural standards. If consensus is elusive, I invite a brief 5-minute alignment call with the Tech Lead to establish a consensus that serves the product best.",
      tip: "Constructive Code Review এটিকেট টিম প্লেয়ারদের অপরিহার্য যোগ্যতা।"
    },
    {
      lvl: "lvl1",
      q: "একজন জুনিয়র ডেভেলপারকে মেন্টরিং বা টিমমেটকে হেল্প করার ক্ষেত্রে তোমার কর্মপদ্ধতি কেমন?",
      m: "আমি সবসময় শেখাতে ও টিমকে গ্রো করাতে ভালোবাসি। কোনো জুনিয়র হেল্প চাইলে আমি সরাসরি তার কীবোর্ড টেনে নিয়ে কোড লিখে দিই না—বরং তাকে প্রশ্ন করে সমস্যার মূলে পৌঁছাতে সাহায্য করি ('কনসোল এররটা কী বলছে? নেটওয়ার্ক ট্যাবে পেলোড চেক করেছ?')। এর ফলে সে নিজে নিজে ডিবাগ করার আত্মবিশ্বাস পায়। এছাড়া আমি নিয়মিত কোডবেসের ডকুমেন্টেশন, আর্কিটেকচার ডায়াগ্রাম ও রিইউজেবল প্যাটার্ন লিখে রাখি যাতে যেকোনো নতুন ডেভেলপার সহজে অনবোর্ড হতে পারে।",
      b: "জুনিয়রদের সরাসরি কোড লিখে দেওয়ার বদলে তাদের সমস্যা চিহ্নিত ও ডিবাগ করার কৌশল শিখিয়ে দিই। ভালো ডকুমেন্টেশন তৈরি করে রাখি যাতে টিমের যে কেউ সহজে কাজ বুঝতে ও শিখতে পারে।",
      e: "Effective mentoring avoids simply handing over solutions. Instead, I guide developers through diagnostic reasoning—teaching them to interpret stack traces, inspect network payloads, and formulate hypotheses. I also maintain comprehensive architectural documentation to foster long-term self-sufficiency across the engineering team.",
      tip: "Socratic Debugging Method (প্রশ্ন করে ডিবাগ শেখানো) সেরা মেন্টরিং অ্যাপ্রোচ।"
    },
    {
      lvl: "lvl1",
      q: "প্রোডাক্ট ম্যানেজার যদি এমন একটি ফিচার চায় যা টেকনিক্যালি সিস্টেমের জন্য ক্ষতিকর বা সিকিউরিটি রিস্ক তৈরি করে, তখন কীভাবে ডিল করবে?",
      m: "সরাসরি 'না' বলে দরজা বন্ধ না করে আমি ব্যবসায়িক দৃষ্টিকোণ থেকে কথা বলব: (১) আগে বুঝব পিএম এই ফিচারের মাধ্যমে আসলে কী অর্জন করতে চাচ্ছে (Underlying Business Goal)। (২) এরপর শান্তভাবে ব্যাখ্যা করব যে বর্তমান প্রস্তাবিত উপায়ে গেলে কোন সিকিউরিটি রিস্ক বা ডাটা লিকের সম্ভাবনা রয়েছে। (৩) সবচেয়ে গুরুত্বপূর্ণ: আমি তাকে একটি অল্টারনেটিভ নিরাপদ টেকনিক্যাল সলিউশন প্রস্তাব করব যা তার বিজনেস গোলও পূরণ করবে এবং সিস্টেমের সিকিউরিটিও অক্ষুণ্ণ রাখবে।",
      b: "সরাসরি না না বলে প্রোডাক্ট ম্যানেজারের ব্যবসায়িক লক্ষ্য বোঝার চেষ্টা করি। ঝুঁকিপূর্ণ দিকগুলো বুঝিয়ে বলে একটি নিরাপদ বিকল্প উপায় প্রস্তাব করি যা সিস্টেমের সুরক্ষা বজায় রেখেই ব্যবসার চাহিদা পূরণ করে।",
      e: "Rather than issuing a blunt technical refusal, I seek to understand the underlying business objective. I articulate the security vulnerabilities or architectural technical debt associated with the requested approach, and then propose a secure alternative that achieves the intended business goal without compromising system integrity.",
      tip: "ব্যবসায়িক সমাধান দেওয়ার ক্ষমতা একজন ইঞ্জিনিয়ারকে ম্যানেজমেন্টের চোখে মূল্যবান করে তোলে।"
    },
    {
      lvl: "lvl1",
      q: "তুমি যে আর্কিটেকচার প্রস্তাব করেছ, টেক লিড তার চেয়ে ভিন্ন একটি এপ্রোচ নিতে চান। তুমি কীভাবে প্রতিক্রিয়া জানাবে?",
      m: "আমি প্রথমে টেক লিডের প্রস্তাবিত এপ্রোচটি মনোযোগ দিয়ে শুনব—কারণ তার হয়তো দীর্ঘমেয়াদী সিস্টেম বা কোম্পানির রোডম্যাপ নিয়ে এমন কোনো ইনসাইট আছে যা আমার জানা নেই। আমি আমার প্রস্তাবনার পক্ষে পরিষ্কার ডাটা ও যুক্তি তুলে ধরব। কিন্তু আলোচনার পর টেক লিড যদি চূড়ান্ত সিদ্ধান্ত নেন, আমি কোনো মনস্তাত্ত্বিক দ্বিধা না রেখে সেই সিদ্ধান্তকে শতভাগ সমর্থন করব ('Disagree and Commit') এবং সর্বোচ্চ মনোযোগ দিয়ে সেটি বাস্তবায়ন করব। টিমের ঐক্য ও গতি সবসময় ব্যক্তিগত মতামতের চেয়ে বড়।",
      b: "টেক লিডের সিদ্ধান্ত মনোযোগ দিয়ে বুঝে নিজের যুক্তি পেশ করি। তবে চূড়ান্ত সিদ্ধান্ত হওয়ার পর কোনো দ্বিধা না রেখে পুরো একাগ্রতা নিয়ে সেই সিদ্ধান্ত বাস্তবায়নে কাজ করি, কারণ টিমের সাফল্যই মূল লক্ষ্য।",
      e: "I listen actively to the Tech Lead's proposal, recognizing they may have broader organizational context. I present my perspective backed by trade-offs. Once the final architectural path is chosen, I practice 'Disagree and Commit'—giving 100% of my energy to execute the chosen strategy flawlessly. Team cohesion always supersedes individual pride.",
      tip: "'Disagree and Commit' হলো Amazon ও সিলিকন ভ্যালির অত্যন্ত সমাদৃত প্রিন্সিপাল।"
    },
    {
      lvl: "lvl1",
      q: "ইন্টারভিউয়ের শেষ পর্যায়ে 'তোমার স্যালারি এক্সপেকটেশন কত?' (Salary Expectation) জিজ্ঞেস করলে কীভাবে প্রফেশনাল উত্তর দেবে?",
      m: "আমি আত্মবিশ্বাসের সাথে বলব: 'আমার মূল ফোকাস হলো NT Tech Innovation-এর ইঞ্জিনিয়ারিং টিমে একজন ভ্যালুয়েবল ফুল-স্ট্যাক ও ক্লাউড ইঞ্জিনিয়ার হিসেবে যোগ দেওয়া এবং আমার এন্ড-টু-এন্ড অভিজ্ঞতা দিয়ে কোম্পানির প্রোডাক্ট স্কেল করা। বাজারে আমার দক্ষতা (Next.js, Node.js, PostgreSQL, Docker, Linux, Multi-Tenant SaaS) এবং আন্তর্জাতিক রিমোট রোলের দায়িত্ব বিবেচনা করে আমার প্রত্যাশা মাসিক **$2,250 USD** (বা সমমানের বাজার-স্ট্যান্ডার্ড প্যাকেজ)। তবে আমি কোম্পানির কাজের পরিবেশ, টিমের সুযোগ এবং দীর্ঘমেয়াদী বৃদ্ধির সুযোগকে অনেক বেশি গুরুত্ব দিই। NT Tech এই রোলের জন্য কী বাজেট বা রেঞ্জ নির্ধারণ করেছে তা জানলে আমরা উভয়ের জন্য মানানসই সিদ্ধান্তে পৌঁছাতে পারি।'",
      b: "স্যালারি আলোচনায় নিজের দক্ষতার গুরুত্ব ও মার্কেটের মানদণ্ড তুলে ধরে মাসিক $2,250 USD প্রত্যাশা প্রকাশ করি। কোম্পানির নির্ধারিত বাজেট রেঞ্জ জেনে আলোচনার মাধ্যমে উভয়ের জন্য সুবিধাজনক সিদ্ধান্তে পৌঁছাতে আগ্রহ জানাই।",
      e: "My primary objective is joining NT Tech Innovation to build scalable, mission-critical systems. Considering my end-to-end full-stack and DevOps skill set, alongside standard industry benchmarks for mid-to-senior international remote engineering roles, my compensation expectation is **$2,250 USD / month**. I value long-term team fit and impactful engineering challenges, and I would love to hear NT Tech's allocated range for this position so we can align smoothly.",
      tip: "স্পষ্ট সংখ্যা ($2,250/mo) উল্লেখ করার পর কোম্পানির বাজেট জানতে চাওয়া আত্মবিশ্বাস ও পরিপক্বতার লক্ষণ।"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "ডিজাইনার এমন একটি জটিল অ্যানিমেশন চাচ্ছে যা ক্যাশিয়ারদের POS স্ক্রিনে ফ্রেম ড্রপ ও ল্যাগ তৈরি করছে—কীভাবে সমাধান করবে?",
      m: "আমি ডিজাইনারকে সম্মান জানিয়ে ডাটা দেখাব: (১) ক্রোম ডেভটুলসের 'Performance Profiler' ওপেন করে তাকে লাইভ দেখাব যে অ্যানিমেশন চলাকালীন ব্রাউজার মেইন থ্রেড ব্লক হচ্ছে এবং FPS ৬০ থেকে নেমে ২০-এ আসছে। (২) ক্যাশিয়ারদের দ্রুত বারকোড স্ক্যান করার প্রয়োজনীয়তা ব্যাখ্যা করব—যেখানে ০.৫ সেকেন্ডের ল্যাগও বিরক্তি তৈরি করে। (৩) একটি সুন্দর বিকল্প বের করব: ভারী জাভাস্ক্রিপ্ট অ্যানিমেশনের বদলে লাইটওয়েট CSS হার্ডওয়্যার-অ্যাক্সিলারেটেড ট্রানজিশন (`transform` ও `opacity`) ব্যবহার করব যা ৬০ FPS ধরে রাখবে এবং ডিজাইনারের ভিজ্যুয়াল সৌন্দর্যও রক্ষা করবে। এটি একটি পারফেক্ট উইন-উইন সমাধান।",
      b: "ডিজাইনারের সাথে ক্রোম পারফরম্যান্স প্রোফাইলারের ডাটা শেয়ার করে ফ্রেম ড্রপ দেখাই। ভারী স্ক্রিপ্টের বদলে সিএসএস হার্ডওয়্যার অ্যাক্সিলারেশন দিয়ে একটি দ্রুতগতির বিকল্প তৈরি করে সৌন্দর্য ও কার্যকারিতা উভয়েই বজায় রাখি।",
      e: "I resolve design vs performance conflicts with empirical profiling data: I open Chrome DevTools Performance tab and demonstrate main-thread jank and FPS drops from 60 down to 20 during checkout interactions. I propose a GPU-accelerated CSS alternative utilizing `transform` and `opacity` that delivers the designer's aesthetic intent without impeding sub-second billing throughput.",
      tip: "Empirical profiling data দিয়ে কথা বলা প্রফেশনাল ইঞ্জিনিয়ারের লক্ষণ।"
    },
    {
      lvl: "lvl2",
      q: "কোড রিভিউ করার সময় অপ্রয়োজনীয় স্টাইল নিয়ে বাড়াবাড়ি (Nitpicking) এড়ানো এবং কোডের আসল কোয়ালিটিতে ফোকাস করার উপায় কী?",
      m: "আমার রিভিউ ফিলোসফি: (১) ফরম্যাটিং, স্পেসিং, কোটেশন মার্ক বা সেমিকোলনের মতো বিষয় নিয়ে রিভিউয়ারদের বিতর্ক করা সময়ের অপচয়—এসব কাজ ESLint এবং Prettier-এর মতো অটোমেটেড সিআই টুল দিয়ে স্বয়ংক্রিয়ভাবে সমাধান করতে হবে। (২) একজন হিউম্যান রিভিউয়ার হিসেবে আমার ১০০% ফোকাস থাকবে: বিজনেস লজিক ঠিক আছে কিনা, কোনো আন-ইনডেক্সড ডাটাবেজ কুয়েরি বা N+1 কুয়েরি ঢুকেছে কিনা, টেন্যান্ট আইসোলেশন ও অথেনটিকেশন ঠিক আছে কিনা এবং এজ কেস হ্যান্ডেল করা হয়েছে কিনা। (৩) যদি কোনো ব্যক্তিগত পছন্দের ছোটখাটো টিপস দিতেই হয়, তবে শুরুতে `[Nit]` বা `[Non-blocking]` লিখে দিই যাতে পিআর আটকে না থাকে।",
      b: "ফরম্যাটিংয়ের কাজ প্রিশিয়ার ও ইএসলিন্ট দিয়ে স্বয়ংক্রিয় রাখি। কোড রিভিউতে আমরা পারফরম্যান্স, ডাটাবেজ কুয়েরি এবং সিকিউরিটির মূল বিষয়ে ফোকাস করি। ছোটখাটো সাজেশনের জন্য নন-ব্লকিং ট্যাগ ব্যবহার করি যাতে কাজের গতি বজায় থাকে।",
      e: "Automate syntax styling via ESLint and Prettier in pre-commit hooks to eliminate superficial nitpicking. Human code reviews must concentrate on functional correctness: architectural modularity, N+1 query traps, tenant security, and edge-case boundaries. When sharing personal style preferences, I prefix comments with `[Nit: Non-blocking]` so sprint velocity is never gated on subjective semantics.",
      tip: "[Nit: Non-blocking] ট্যাগ ব্যবহার আধুনিক ইঞ্জিনিয়ারিং টিমগুলোর সেরা প্র্যাকটিস।"
    },
    {
      lvl: "lvl2",
      q: "টিমের একজন সদস্য সময়মতো কাজ জমা না দেওয়ায় তোমার স্প্রিন্ট টাস্ক আটকে আছে—কীভাবে হ্যান্ডেল করবে?",
      m: "আমার পদক্ষেপ: (১) পাবলিক চ্যানেলে রাগ না দেখিয়ে প্রাইভেটে তার সাথে যোগাযোগ করব: 'ভাইয়া, এই এপিআই এন্ডপয়েন্টটির ওপর আমার ফ্রন্টএন্ড ইন্টিগ্রেশন নির্ভর করছে। তুমি কি কোনো জটিলতায় আটকে গেছ? আমি কি কোনো অংশে হেল্প করতে পারি?' (২) যদি তার কাজ এখনও শেষ না হয়ে থাকে, তবে আমি তার জন্য অপেক্ষা করে বসে থাকব না; আমি মক ডাটা (Mock Data / MSW) বা টাইপস্ক্রিপ্ট ইন্টারফেস বানিয়ে আমার ফ্রন্টএন্ড কোডিং এগিয়ে রাখব। (৩) স্ট্যান্ডআপে নিরপেক্ষভাবে আপডেট দেব: 'আমি ফ্রন্টএন্ড মক দিয়ে কাজ এগিয়ে রেখেছি, ব্যাকএন্ড রেডি হলেই কেবল এপিআই কানেক্ট করব।' এতে কাজও থামে না এবং কোনো তিক্ততাও তৈরি হয় না।",
      b: "প্রাইভেটে টিমমেটের সাথে যোগাযোগ করে কোনো সাহায্য লাগবে কিনা জানতে চাই। বসে না থেকে মক ডাটা তৈরি করে নিজের অংশের কাজ এগিয়ে রাখি যাতে স্প্রিন্টের গতি ব্যাহত না হয়।",
      e: "Proactive unblocking: check in privately with empathy to determine if the teammate is wrestling with an unexpected blocker and offer collaborative assistance. To protect sprint deliverables, decouple dependencies immediately: build against TypeScript mock schemas or MSW fixtures. In standup, state progress factually without passive-aggressive finger-pointing.",
      tip: "Decouple with Mock Data প্রমাণ করে তুমি কখনোই কোনো অজুহাতে বসে থাকো না।"
    },
    {
      lvl: "lvl2",
      q: "আন্তর্জাতিক রিমোট রোলে মাসিক $2,250 USD স্যালারি দাবি করার পেছনে তোমার যুক্তি ও ভ্যালু প্রপোজিশন কীভাবে তুলে ধরবে?",
      m: "আমি ভ্যালু-বেজড আর্গুমেন্ট দেব: 'আমি কোম্পানিতে শুধু নির্দেশ পালনকারী কোডার হিসেবে আসছি না; আমি একজন এন্ড-টু-এন্ড প্রবলেম সলভার। আমার অভিজ্ঞতার মধ্যে রয়েছে এককভাবে মাল্টি-টেন্যান্ট SaaS (Dokani POS) স্ক্র্যাচ থেকে তৈরি করে লাইভ পরিচালনা করা, লিনাক্স ক্লাউড সার্ভার জিরো-ডাউনটাইমে ডিপ্লয় করা এবং জটিল ডাটাবেজ অপটিমাইজেশন করা। একজন ডেভেলপার, একজন ডাটাবেজ ইঞ্জিনিয়ার এবং একজন ডেভঅপ্স ইঞ্জিনিয়ারের সম্মিলিত দক্ষতা আমি একা হ্যান্ডেল করতে পারি। এই বহুমুখী ওনারশিপ কোম্পানির একাধিক হায়ারিং খরচ বাঁচায় এবং ডেলিভারি গতি তিন গুণ বাড়িয়ে দেয়। তাই মাসিক $2,250 USD কোম্পানির জন্য একটি উচ্চ আরওআই (ROI) নিশ্চিত করবে।'",
      b: "আমি ফুল-স্ট্যাক এবং ডেভঅপ্স দুই ক্ষেত্রেই এন্ড-টু-এন্ড পারদর্শী যা কোম্পানির বহুবিধ খরচ বাঁচায় এবং কাজের গতি বাড়ায়। Dokani-র মতো জটিল প্ল্যাটফর্ম তৈরির বাস্তব অভিজ্ঞতার কারণে এই পারিশ্রমিক কোম্পানির জন্য লাভজনক বিনিয়োগ হবে।",
      e: "I articulate a value-based ROI proposition: I deliver end-to-end multi-disciplinary ownership across frontend, backend, PostgreSQL internals, and Linux DevOps—evidenced by architecting and operating live platforms like Dokani POS. Eliminating communication silos across disparate specialists accelerates product velocity and reduces operational overhead, ensuring that a $2,250/mo investment yields outsized engineering returns.",
      tip: "ROI (Return on Investment) ভাষায় কথা বললে ম্যানেজমেন্ট তোমার স্যালারি দাবিকে বিনিয়োগ মনে করবে।"
    },
    {
      lvl: "lvl2",
      q: "আন্তর্জাতিক রিমোট চুক্তিতে মূল বেতনের পাশাপাশি অন্যান্য সুবিধা (Perks & Non-salary Benefits) কীভাবে আলোচনা করবে?",
      m: "আমি পেশাদারভাবে আলোচনা করব: (১) **Equipment / Workspace Allowance:** হোম অফিসের হাই-স্পিড ইন্টারনেট ব্যাকআপ এবং হার্ডওয়্যার রক্ষণাবেক্ষণের সুবিধা। (২) **Paid Time Off (PTO):** বছরে নির্দিষ্ট সংখ্যক পেইড সিক ও ভ্যাকেশন লিভ যা দীর্ঘমেয়াদে বার্নআউট রোধ করে। (৩) **Flexible Working Hours:** কোর মিটিং আওয়ার ঠিক রেখে বাকি সময়ে ডিপ ওয়ার্কের স্বাধীনতা। (৪) **Learning Budget:** বার্ষিক টেক কনফারেন্স বা ক্লাউড সার্টিফিকেশনের সুযোগ। এই আলোচনাগুলো প্রমাণ করে আমি দীর্ঘমেয়াদে কোম্পানির সাথে কাজ করতে আগ্রহী একজন পেশাদার ইঞ্জিনিয়ার।",
      b: "মূল বেতনের সাথে পেইড লিভ, ইন্টারনেট ব্যাকআপ সুবিধা, কাজের নমনীয় সময় এবং স্কিল ডেভেলপমেন্টের সুযোগ নিয়ে কথা বলি। এটি দীর্ঘমেয়াদে সুস্থ কাজের পরিবেশ বজায় রাখে।",
      e: "I approach total compensation holistically: discussing baseline paid time off (PTO) to safeguard long-term cognitive stamina; workspace and internet connectivity allowances to maintain infrastructure uptime; and flexible async work windows around core meeting overlaps. Aligning on these factors signals a mature commitment to sustainable collaboration.",
      tip: "Total Compensation দৃষ্টিকোণ আলোচনাকে আরও ভারসাম্যপূর্ণ ও পরিণত করে।"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "হাই-পারফর্মিং ইঞ্জিনিয়ারিং টিমে 'Radical Candor' (র‍্যাডিক্যাল ক্যান্ডর)-এর ভূমিকা কী এবং এটি কীভাবে প্রয়োগ করা উচিত?",
      m: "কিম স্কটের 'Radical Candor' মডেলের মূল কথা হলো: **'Care Personally, Challenge Directly'**। (১) কোনো সহকর্মীর কোডে যদি মারাত্মক ত্রুটি থাকে, তবে চুপ করে থাকা বা মিথ্যা প্রশংসা করা হলো 'Ruinous Empathy' যা কোম্পানির ক্ষতি করে। (২) আবার মানুষের প্রতি কোনো সহানুভূতি না রেখে আক্রমণাত্মক কথা বলা হলো 'Obnoxious Aggression'। (৩) র‍্যাডিক্যাল ক্যান্ডর হলো: ব্যক্তিগতভাবে সহকর্মীর সাফল্য ও অনুভূতির প্রতি পূর্ণ যত্ন নেওয়া, কিন্তু টেকনিক্যাল ভুলের ক্ষেত্রে সরাসরি ও স্পষ্ট ভাষায় কোনো দ্বিধা না রেখে ফিডব্যাক দেওয়া। এতে সম্পর্ক দৃঢ় হয় এবং কোডের মান সর্বোচ্চ পর্যায়ে পৌঁছায়।",
      b: "র‍্যাডিক্যাল ক্যান্ডর হলো সহকর্মীর প্রতি পূর্ণ সম্মান বজায় রেখে কোডের ত্রুটি নিয়ে কোনো দ্বিধা ছাড়া সরাসরি আলোচনা করা। মিষ্টি কথায় ভুল ঢেকে না রেখে খোলামেলা ও গঠনমূলক সমালোচনাই টিমের উন্নতি নিশ্চিত করে।",
      e: "Radical Candor balances 'Care Personally' with 'Challenge Directly'. Withholding critical feedback out of politeness is 'Ruinous Empathy', breeding fragile software; conversely, delivering criticism without respect is 'Obnoxious Aggression'. Radical Candor delivers direct, unvarnished architectural critique while maintaining deep mutual respect and psychological safety.",
      tip: "Care Personally, Challenge Directly—এই ফ্রেমওয়ার্ক লিডারশিপের বিশ্বমানের সূত্র।"
    },
    {
      lvl: "lvl3",
      q: "দুইজন সিনিয়র ইঞ্জিনিয়ারের মধ্যে যখন গভীর টেকনিক্যাল মতবিরোধ (Architectural Deadlock) তৈরি হয়, তখন কীভাবে সমাধান করা যায়?",
      m: "মতবিরোধ অহংকারের লড়াইয়ে রূপ নেওয়ার আগেই আমরা ৩টি সিস্টেমেটিক পদক্ষেপ নিই: (১) **RFC (Request for Comments) Document:** উভয় পক্ষকে একটি করে সংক্ষিপ্ত RFC লিখতে বলি যেখানে আর্কিটেকচারের সুবিধা, অসুবিধা এবং ট্রেড-অফ স্পষ্ট পয়েন্টে থাকবে। (২) **Timeboxed Proof-of-Concept (POC):** অনুমানের বদলে বাস্তব ডাটা দেখতে উভয় পক্ষকে ২ দিনের একটি ছোট স্পাইক কোড বানিয়ে বেঞ্চমার্ক করতে বলি (যেমন লেটেন্সি, মেমোরি কনসাম্পশন)। (৩) **Objective Criteria Matrix:** আমরা কোম্পানির বিজনেসের জন্য কোনটি বেশি গুরুত্বপূর্ণ (ডেলিভারি স্পিড নাকি চরম স্কেলেবিলিটি) তা দেখে সিইও বা টেক লিডের মাধ্যমে চূড়ান্ত সিদ্ধান্ত নিই। ডাটাই বিতর্কের অবসান ঘটায়।",
      b: "বিতর্ক এড়াতে আমরা আরএফসি ডকুমেন্ট তৈরি করি, ছোট প্রুফ-অব-কনসেপ্ট বানিয়ে বাস্তব পারফরম্যান্স বেঞ্চমার্ক তুলনা করি এবং টিমের লক্ষ্যের সাথে মিলিয়ে যৌথভাবে সিদ্ধান্ত গ্রহণ করি।",
      e: "To break architectural deadlocks: transition the debate from verbal arguments into structured RFC documents detailing concrete pros, cons, and trade-offs; execute a timeboxed 48-hour prototype spike to evaluate actual runtime performance under load; and evaluate outcomes against the product's primary operational constraint (e.g., time-to-market vs P99 latency). Telemetry breaks deadlocks.",
      tip: "RFC document এবং Timeboxed prototype spike এন্টারপ্রাইজ ইঞ্জিনিয়ারিংয়ের মূল সমাধান।"
    },
    {
      lvl: "lvl3",
      q: "টিমে যদি কোনো ক্ষতিকর বা ইগো-চালিত ডেভেলপার (Ego-Driven Developer) থাকে, তবে কীভাবে নাটুকে পরিবেশ এড়িয়ে শান্তভাবে কাজ করবে?",
      m: "আমার নীতি: 'Never feed the ego, focus purely on the objective facts'। (১) তাদের কোনো ব্যক্তিগত মন্তব্য বা আক্রমণ গায়ে মাখব না। (২) সমস্ত টেকনিক্যাল কথোপকথন পাবলিক গিটহাব পিআর বা টিকিট কমেন্টে রাখব যাতে সব সময় একটি স্পষ্ট লিখিত রেকর্ড থাকে। (৩) কোনো তর্কে না জড়িয়ে সরাসরি অফিশিয়াল ডকুমেন্টেশন, টেস্ট রেজাল্ট ও এরর লগ কোট করব। (৪) ভালো কাজের জন্য তার প্রাপ্য প্রশংসা মুক্তমনে দেব যাতে তার রক্ষণাত্মক মনোভাব কমে। শান্ত ও অবিচল থাকা যে কোনো বিষাক্ত পরিবেশকে নিষ্ক্রিয় করার সেরা অস্ত্র।",
      b: "ব্যক্তিগত আক্রমণ গায়ে না মেখে সবসময় লিখিত কমেন্টে অফিসিয়াল ডকুমেন্টেশন ও টেস্ট রেজাল্টের ডাটা দিয়ে কথা বলি। শান্ত থেকে পেশাদার আচরণ বজায় রাখলে অপ্রয়োজনীয় বিতর্ক দূর হয়।",
      e: "De-escalate ego-driven dynamics by remaining aggressively objective: avoid emotional retorts; maintain communication strictly on transparent, asynchronous platforms (GitHub PRs, Jira tickets); substantiate claims with official documentation and deterministic test runs; and generously acknowledge their valid contributions to disarm defensive hostility.",
      tip: "Documented transparent communication এবং Objectivity সেরা প্রফেশনাল গার্ড।"
    },
    {
      lvl: "lvl3",
      q: "পারফরম্যান্স রিভিউয়ের সময় কীভাবে কোয়ান্টিফিয়েবল বিজনেস ইমপ্যাক্ট দেখিয়ে বেতন বৃদ্ধি বা প্রমোশনের কথা বলবে?",
      m: "আমি শুধু 'আমি অনেক পরিশ্রম করেছি' বলব না, বরং বাস্তব তথ্য-উপাত্তের ডসিয়ার নিয়ে বসব: (১) 'গত ৬ মাসে আমি Dokani-র কোর চেকআউট ইঞ্জিন অপটিমাইজ করেছি যা এপিআই লেটেন্সি ৯০% কমিয়েছে'। (২) 'আমি সিআই/সিডি অটোমেশন করেছি যা টিমের রিলিজ সাইকেল প্রতি সপ্তাহে ৩ ঘণ্টা বাঁচিয়েছে'। (৩) 'আমি ৩ জন নতুন ইঞ্জিনিয়ারকে সফলভাবে অনবোর্ড ও মেন্টর করেছি'। (৪) কোম্পানির ব্যবসায়িক সাফল্যে আমার সরাসরি অবদানের সাথে বাজারের বর্তমান ক্ষতিপূরণ মানদণ্ড মিলিয়ে যৌক্তিক বৃদ্ধি চাইব। ডাটা দেখলে কোনো ম্যানেজমেন্ট না বলতে পারে না।",
      b: "শুধু পরিশ্রমের কথা না বলে বাস্তব ফলাফল তুলে ধরি—যেমন এপিআইয়ের গতি ৯০% বাড়ানো, সার্ভার খরচ কমানো এবং নতুন টিমমেটদের মেন্টর করা। বাস্তব অর্জন দেখালে বেতন বৃদ্ধি স্বাভাবিকভাবেই অর্জিত হয়।",
      e: "Frame compensation reviews strictly around quantifiable business value: compile a dossier of measurable impact—slashing P95 checkout latency by 90%, automating CI/CD pipelines to save 3 hours per weekly release, and mentoring onboarded engineers. Demonstrating how your engineering leadership amplified revenue and team efficiency makes promotion a natural organizational imperative.",
      tip: "Quantifiable Impact Dossier নিয়ে আলোচনায় বসা সর্বোচ্চ প্রফেশনাল মান।"
    },
    {
      lvl: "lvl3",
      q: "ইন্টারভিউতে যদি কোম্পানি তোমার প্রত্যাশার চেয়ে অনেক কম অফার দেয় (Lowball Offer), তবে কীভাবে পেশাদারভাবে হ্যান্ডেল করবে?",
      m: "আমি কখনোই ক্ষুব্ধ হব না বা সম্পর্ক নষ্ট করব না। আমার উত্তর: 'অফারটির জন্য অনেক ধন্যবাদ। আমি NT Tech Innovation-এর মিশন এবং ইঞ্জিনিয়ারিং টিমের সাথে কাজ করতে অত্যন্ত আগ্রহী। তবে প্রস্তাবিত প্যাকেজটি আমার প্রত্যাশিত $2,250 USD এবং এই রোলের প্রযুক্তিগত দায়িত্বের চেয়ে বেশ কম। আমার দক্ষতা (Full-Stack, PostgreSQL ACID, Linux DevOps, Multi-Tenant Architecture) দিয়ে প্রথম দিন থেকেই যে উচ্চমানের অবদান রাখব, তা বিবেচনায় নিয়ে আমরা কি এই সংখ্যাটি পুনর্বিবেচনা করতে পারি? যদি বেসিক স্যালারিতে সীমাবদ্ধতা থাকে, তবে পারফরম্যান্স বোনাস বা ৩ মাস পর রিভিউয়ের মতো কোনো বিকল্প নিয়ে কি ভাবা যায়?' এতে নিজের মর্যাদা বজায় থাকে এবং আলোচনার দরজাও খোলা থাকে।",
      b: "অফারের জন্য ধন্যবাদ জানিয়ে শান্তভাবে বলি যে প্রস্তাবিত প্যাকেজটি আমার স্কিল ও দায়িত্বের তুলনায় কম। কোম্পানির প্রতি আগ্রহ বজায় রেখে সংখ্যাটি পুনর্বিবেচনা করার অনুরোধ জানাই অথবা ৩ মাস পর পারফরম্যান্স রিভিউর বিকল্প প্রস্তাব করি।",
      e: "Decline lowball offers gracefully without burning bridges: express genuine appreciation for the offer and excitement about the technical mission, but state clearly that the figure falls below your market benchmark ($2,250 USD) given your end-to-end full-stack and DevOps ownership. Inquire if there is flexibility to align closer to expectations, or propose milestone-based compensation reviews tied to concrete 90-day deliverables.",
      tip: "Milestone-based compensation review প্রস্তাব করা অত্যন্ত বুদ্ধিদীপ্ত নেগোসিয়েশন।"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "টিমের কোনো সদস্য সিইও বা ক্লায়েন্টের সামনে তোমার করা কোনো আর্কিটেকচারাল ডিজাইন বা ফিচারের পুরো ক্রেডিট নিজের বলে দাবি করল—তুমি কীভাবে প্রতিক্রিয়া জানাবে?",
      m: "আমি তাৎক্ষণিক সভায় কোনো সিন ক্রিয়েট করব না বা তাকে মিথ্যাবাদী বলব না। আমার পদক্ষেপ: (১) মিটিং চলাকালীন খুব স্বাভাবিকভাবে কনভারসেশনে যোগ দেব: 'হ্যাঁ, আমি যখন Dokani-র এই ইনভেন্টরি ট্রানজেকশন আর্কিটেকচারটি ডিজাইন করছিলাম, তখন আমি লক্ষ্য করেছিলাম যে... এভাবে ডাটা ফ্লো আরও অপটিমাইজ হয়েছে।' এতে ক্রেডিট খোলামেলাভাবে সবার কাছে স্পষ্ট হয়ে যায়। (২) মিটিংয়ের পর সেই সহকর্মীর সাথে প্রাইভেটে একান্তে কফি বা কলে কথা বলব: 'ভাইয়া, আজকের মিটিংয়ে পুরো আর্কিটেকচারটির কথা বলার সময় আমার অবদানটির কথা বাদ পড়েছিল। টিমে একসাথে কাজ করতে গেলে পারস্পরিক কাজের স্বীকৃতি বজায় রাখা জরুরি।' এতে সে লজ্জা পাবে এবং ভবিষ্যতে এমন কাজ আর করবে না।",
      b: "মিটিং চলাকালীন শান্তভাবে টেকনিক্যাল ব্যাখ্যায় অংশ নিয়ে নিজের অবদানের কথা স্বাভাবিকভাবে প্রকাশ করি। পরে ব্যক্তিগতভাবে সহকর্মীকে কাজের পারস্পরিক স্বীকৃতি বজায় রাখার কথা বুঝিয়ে বলি যাতে সম্পর্কের ক্ষতি না হয়।",
      e: "Handle credit theft with poise: in the live meeting, interject naturally with technical depth: 'Yes, while I was architecting that transaction isolation model, I noticed that...' gracefully claiming ownership through undeniable domain authority. Follow up privately with the colleague, calmly establishing expectations of mutual professional attribution.",
      tip: "Natural domain authority দিয়ে মিটিংয়ে নিজের অবদান তুলে ধরা শ্রেষ্ঠ শিল্প।"
    },
    {
      lvl: "situation",
      q: "একজন সিনিয়র ব্যাকএন্ড ডেভেলপারের সাথে REST বনাম GraphQL নিয়ে তীব্র বিতর্ক তৈরি হয়েছে—তুমি কীভাবে ঐকমত্যে পৌঁছাবে?",
      m: "আমি ধর্মযুদ্ধের মতো টেকনোলজির পক্ষ নেব না। (১) প্রজেক্টের রিয়েল চাহিদা বিশ্লেষণ করব: আমাদের মোবাইল বা ক্যাশ টার্মিনালে কি ওভার-ফেচিং বা আন্ডার-ফেচিং বড় সমস্যা? (২) আমরা কি N+1 কোয়েরি হ্যান্ডেল করার জন্য DataLoader বসানোর বাড়তি কমপ্লেক্সিটি নিতে প্রস্তুত? (৩) যদি পিওএস সিস্টেমে রিজিড, হাই-স্পিড এবং সিম্পল ক্যাশিংয়ের প্রয়োজন বেশি হয়, তবে REST এপিআই অনেক হালকা ও নির্ভরযোগ্য। (৪) আর যদি জটিল নেস্টেড ডাটা মোবাইল অ্যাপে দরকার হয়, তবে GraphQL বা trpc বিবেচনা করা যায়। বাস্তব প্রয়োজনের ভিত্তিতে সিদ্ধান্ত নিলে কোনো একগুঁয়েমি থাকে না।",
      b: "প্রজেক্টের বাস্তব চাহিদার ওপর ভিত্তি করে সিদ্ধান্ত নিই। পিওএস টার্মিনালে দ্রুত ক্যাশিং ও সরলতার জন্য রেস্ট এপিআই ভালো, অন্যদিকে মোবাইল অ্যাপের জটিল ডাটার জন্য গ্রাফকিউএল উপযোগী। অন্ধ সমর্থন না করে কাজের ধরণের ওপর ভিত্তি করে একমত হই।",
      e: "Avoid religious technology dogma. Frame REST vs GraphQL strictly around the client payload profile: if the system serves high-throughput retail cashier terminals requiring aggressive HTTP caching, REST is structurally superior and lightweight; if complex nested relationship querying is required on bandwidth-constrained mobile apps, GraphQL with DataLoader makes sense. Trade-offs dictate the choice.",
      tip: "Religious technology dogma পরিহার করাই অভিজ্ঞ ইঞ্জিনিয়ারের লক্ষণ।"
    },
    {
      lvl: "situation",
      q: "HR ম্যানেজার যদি সরাসরি জিজ্ঞেস করে: 'তোমার আগের বা বর্তমান চাকরিতে বেতন কত ছিল?'—কীভাবে কৌশলী উত্তর দেবে?",
      m: "আমি বর্তমান বেতনের ফাঁদে পা না দিয়ে ভবিষ্যতের ভ্যালুতে ফোকাস করব: 'আমার আগের কোম্পানির কনফিডেন্সিয়ালিটি পলিসির কারণে নির্দিষ্ট সংখ্যাটি শেয়ার করতে পারছি না। তবে আমার ক্যারিয়ারের এই পর্যায়ে আমি এমন একটি নতুন চ্যালেঞ্জ ও দায়িত্বপূর্ণ রোলে যোগ দিতে চাচ্ছি যেখানে আমার ফুল-স্ট্যাক ও ক্লাউড ইঞ্জিনিয়ারিং স্কিলের পুরো সদ্ব্যবহার হবে। এই রোলের পরিধি এবং আন্তর্জাতিক রিমোট মার্কেটের মানদণ্ড অনুযায়ী আমার প্রত্যাশা মাসিক **$2,250 USD**। আমি বিশ্বাস করি NT Tech-এর মতো প্রগ্রেসিভ কোম্পানিতে কাজের মূল্যায়ন বর্তমান বেতন নয়, বরং রোলের দায়িত্ব ও ডেলিভারি সক্ষমতার ওপর ভিত্তি করে হয়।'",
      b: "আগের বেতনের তথ্যের গোপনীয়তা রক্ষা করে বর্তমান রোলের দায়িত্ব ও আন্তর্জাতিক বাজারের মানদণ্ড তুলে ধরি। মাসিক $2,250 USD প্রত্যাশা জানিয়ে আমার কাজের ভ্যালুর ওপর আলোচনাকে কেন্দ্রীভূত করি।",
      e: "Tactfully pivot away from past compensation anchored to different scopes: 'Due to confidentiality agreements with my prior engagement, I cannot disclose precise past numbers. More importantly, I evaluate compensation based on the scope, responsibilities, and market value of this specific role at NT Tech Innovation. For this role, my expectation is **$2,250 USD / month**, and I look forward to aligning on a mutually compelling package.'",
      tip: "Confidentiality এবং Scope of the new role দিয়ে আলোচনা ঘোরানো সেরা ট্যাকটিক।"
    },
    {
      lvl: "situation",
      q: "তোমার প্রত্যাশা $2,250 USD, কিন্তু কোম্পানি অফার করল $1,800 USD—কীভাবে কাউন্টার অফার পেশ করবে?",
      m: "আমি ইতিবাচক ও পেশাদার ভাষায় কাউন্টার দেব: 'অফারের জন্য আপনাদের আন্তরিক ধন্যবাদ। NT Tech-এর ইঞ্জিনিয়ারিং টিমে যোগ দিয়ে বড় প্রোডাক্ট স্কেল করার জন্য আমি সত্যিই অত্যন্ত রোমাঞ্চিত। তবে আমার প্রত্যাশা ছিল $2,250 USD, যা আমার ফুল-স্ট্যাক ও DevOps-এর এন্ড-টু-এন্ড বাস্তবায়নের সামর্থ্যের সাথে মানানসই। কোম্পানি যদি এই অফারটি বাড়িয়ে **$2,100 - $2,250 USD**-এর কাছাকাছি নিয়ে আসতে পারে, তবে আমি আনন্দের সাথে এখনই অফারটি গ্রহণ করতে এবং অনবোর্ডিংয়ের প্রস্তুতি নিতে প্রস্তুত। আমরা কি এই বিষয়ে একটি সমঝোতায় পৌঁছাতে পারি?' স্পষ্ট আগ্রহ এবং বাস্তবসম্মত ফ্লেক্সিবিলিটি দেখালে কোম্পানিগুলো প্রায়শই অফার বাড়ায়।",
      b: "ধন্যবাদ জানিয়ে কাজের প্রতি আগ্রহ প্রকাশ করি। ফুল-স্ট্যাক ও ডেভঅপ্স দক্ষতার মূল্য তুলে ধরে $2,100 - $2,250 USD-এর কাছাকাছি প্যাকেজের প্রস্তাব দিই যাতে দ্রুত চুক্তিতে পৌঁছানো যায়।",
      e: "Deliver a compelling counter-offer: 'Thank you for the offer. I am genuinely excited about the engineering challenges at NT Tech Innovation. Given my proven capability to deliver full-stack systems and server infrastructure independently, my target remains $2,250 USD. If NT Tech can bridge the gap to **$2,100–$2,250 USD**, I am prepared to sign immediately and begin onboarding preparations.'",
      tip: "'I am prepared to sign immediately if we bridge the gap' সেরা নেগোসিয়েশন ক্লোজার।"
    },
    {
      lvl: "situation",
      q: "কোম্পানি ছেড়ে যাওয়া একজন ডেভেলপারের অসম্পূর্ণ ও বাগযুক্ত টাস্ক তোমার ঘাড়ে পড়েছে—কীভাবে ম্যানেজমেন্টকে রিপোর্ট করবে?",
      m: "আমি কোনো অভিযোগ না করে বাস্তবসম্মত অডিট রিপোর্ট পেশ করব: (১) কোডবেসটি পুঙ্খানুপুঙ্খভাবে পরীক্ষা করে একটি সংক্ষিপ্ত বুলেটিন বানাব: কোন কোন ফিচার অলরেডি তৈরি আছে, কোনগুলোতে বাগ আছে এবং কোন অংশগুলো এখনো অসম্পূর্ণ। (২) ম্যানেজমেন্টকে বলব: 'আমি কোডটি অডিট করেছি। এটি সফলভাবে শেষ করতে আনুমানিক ৩ দিন সময় লাগবে—১ দিন বাগ ফিক্স করতে, ১ দিন বাকি ফিচার কমপ্লিট করতে এবং ১ দিন টেস্টিং ও প্রোডাকশন হার্ডেনিং করতে।' (৩) কোনো বাজে মন্তব্য না করে সরাসরি সমাধান ও টাইমলাইন দেওয়ায় ম্যানেজমেন্ট আমার নির্ভরযোগ্যতায় মুগ্ধ হবে।",
      b: "পূর্বসূরিকে দোষারোপ না করে কোডের বর্তমান অবস্থা বিশ্লেষণ করে একটি স্পষ্ট অডিট রিপোর্ট দিই। কাজগুলো শেষ করতে প্রয়োজনীয় সময় ও ধাপগুলো ম্যানেজমেন্টকে পরিষ্কারভাবে জানিয়ে দায়িত্ব সম্পন্ন করি।",
      e: "Report legacy status without emotional whining: perform a rapid technical audit, decomposing the codebase into three buckets: functional components, defective modules, and missing implementations. Present a concrete triage roadmap to management: 'I conducted a baseline audit. To stabilize and complete this feature will take 3 days: 1 day for bug remediation, 1 day for remaining endpoints, and 1 day for end-to-end testing.'",
      tip: "Audit roadmap বনাম Emotional complaining সিনিয়র মানসিকতা প্রকাশ করে।"
    },

    // --- REAL-WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "ফিলিপাইন ও অন্যান্য দেশের টিমমেটদের সাথে ক্রস-কালচারাল রিমোট বন্ডিং কীভাবে গড়ে তুলবে?",
      m: "আমি পারস্পরিক শ্রদ্ধা ও সৌহার্দ্যপূর্ণ সম্পর্ক তৈরিতে বিশ্বাসী। আমার কৌশল: (১) তাদের স্থানীয় সংস্কৃতি ও ছুটির দিনগুলোকে সম্মান জানানো। (২) মিটিংয়ের শুরুতে ১ মিনিট আন্তরিক কুশল বিনিময় করা ('ফিলিপাইনে আবহাওয়া কেমন? উইকএন্ড কেমন কাটল?')। (৩) স্ল্যাক চ্যানেলে কোনো ভালো কাজের জন্য মন খুলে সহকর্মীকে 'Kudos' বা থ্যাংকস দেওয়া। (৪) কালচারাল বা ভাষার অমিল থাকলে সহজ ও পরিষ্কার ইংরেজি বাক্য ব্যবহার করা এবং কোনো অনুমান না করে সব সময় লিখিত সামারি শেয়ার করা। এর ফলে দূরবর্তী টিমেও পারিবারিক আন্তরিকতা তৈরি হয়।",
      b: "সহকর্মীদের সংস্কৃতিকে শ্রদ্ধা জানাই, কাজের ফাঁকে বন্ধুত্বপূর্ণ খোঁজখবর নিই এবং ভালো কাজের প্রশংসা করি। সহজ ভাষায় স্পষ্ট যোগাযোগ বজায় রেখে সুদৃঢ় বন্ধুত্বপূর্ণ সম্পর্ক গড়ে তুলি।",
      e: "Foster cross-cultural remote bonding through intentional empathy: respect regional holidays and timezones; open synchronous catchups with genuine informal check-ins; publicly celebrate teammates' milestones with Slack kudos; and communicate in clear, concise English to prevent semantic ambiguities across international backgrounds.",
      tip: "Cross-cultural empathy রিমোট ইঞ্জিনিয়ারদের সবচেয়ে বড় সফট স্কিল।"
    },
    {
      lvl: "realworld",
      q: "টিমে ব্লেমলেস ৩৬০-ডিগ্রি ফিডব্যাক সেশন কীভাবে পরিচালনা বা অংশগ্রহণ করবে?",
      m: "৩৬০-ডিগ্রি ফিডব্যাকে আমার নিয়ম: (১) ফিডব্যাক দেওয়ার সময় 'SBI Model' (Situation-Behavior-Impact) ব্যবহার করি—সুনির্দিষ্ট ঘটনা, আচরণ এবং সিস্টেমের ওপর তার প্রভাব ব্যাখ্যা করি; কোনো অস্পষ্ট সমালোচনা করি না। (২) ফিডব্যাক নেওয়ার সময় ডিফেন্সিভ না হয়ে মনোযোগ দিয়ে শুনি এবং নোট নিই: 'ধন্যবাদ, আমি এই পয়েন্টটি নিয়ে সচেতন হব।' (৩) ফিডব্যাকের পর পরবর্তী মাসে সেই আচরণে কী পরিবর্তন এনেছি তা নিজে পর্যালোচনা করি। এটি টিমের প্রতিটি সদস্যকে প্রতিনিয়ত আরও দক্ষ ও পরিশীলিত করে তোলে।",
      b: "ফিডব্যাক সেশনে সুনির্দিষ্ট ঘটনা ও তার প্রভাব নিয়ে ইতিবাচক আলোচনা করি। অন্যের সমালোচনা মনোযোগ দিয়ে শুনে তা শুধরে নেওয়ার চেষ্টা করি যাতে টিমের পারস্পরিক বিশ্বাস ও কাজের মান বাড়ে।",
      e: "Participate in 360-degree feedback utilizing the SBI framework (Situation-Behavior-Impact): highlight concrete observations and technical outcomes rather than personality traits. When receiving feedback, listen actively without defensive rationalization, synthesize key learnings, and demonstrate measurable growth in subsequent sprints.",
      tip: "SBI Model (Situation-Behavior-Impact) কর্পোরেট ফিডব্যাকের গোল্ড স্ট্যান্ডার্ড।"
    },
    {
      lvl: "realworld",
      q: "বারবার একই টেকনিক্যাল বিতর্ক এড়াতে 'Architecture Decision Records' (ADRs) কীভাবে সংরক্ষণ করবে?",
      m: "অনেক টিমে দেখা যায় প্রতি ৩ মাস পর পর একই বিষয় নিয়ে (যেমন 'কেন আমরা Prisma বেছে নিলাম?' বা 'কেন রেডিস ক্যাশিং ব্যবহার করছি?') নতুন করে বিতর্ক শুরু হয়। এটি বন্ধ করতে আমরা গিটহাবে `docs/adr/` ফোল্ডারে সংক্ষিপ্ত মার্কডাউন ADR ফাইল রাখি। প্রতিটি ADR-এ থাকে: **Status** (Accepted/Proposed), **Context** (আমরা কোন সমস্যার মুখে পড়েছিলাম), **Decision** (আমরা কোন প্রযুক্তি বেছে নিয়েছি), এবং **Consequences** (এর ফলে কী কী সুবিধা ও অসুবিধা হবে)। ফলে যেকোনো নতুন ডেভেলপার রিপোজিটরিতে ঢুকলেই সব আর্কিটেকচারাল সিদ্ধান্তের যৌক্তিকতা এক নজরে দেখতে পায়।",
      b: "ভবিষ্যতে অপ্রয়োজনীয় বিতর্ক এড়াতে গিটহাবে আর্কিটেকচার ডিসিশন রেকর্ডস (ADR) সংরক্ষণ করি। এতে সিদ্ধান্তের প্রেক্ষাপট ও কারণ লিপিবদ্ধ থাকায় টিমের সময় বাঁচে এবং সিদ্ধান্ত স্পষ্ট থাকে।",
      e: "To prevent recurring circular debates, institutionalize Architecture Decision Records (ADRs) under `/docs/adr/`. Each markdown record documents: Status, Context, Decision, and Consequences. Preserving architectural lineage ensures that past trade-offs are transparently preserved and onboarded engineers understand historical architectural decisions.",
      code: "# ADR Template\n## Title: 0004-use-postgresql-over-mongodb.md\n- Status: Accepted\n- Context: High-concurrency retail transactions requiring row-level locks\n- Decision: Standardize on PostgreSQL with JSONB\n- Consequences: Guaranteed ACID, slight overhead on initial migrations"
    },
    {
      lvl: "realworld",
      q: "আন্তর্জাতিক রিমোট পেমেন্ট, ইনভয়েসিং এবং ব্যাংকিং (Wise, SWIFT wire, USD রেমিট্যান্স) কীভাবে ম্যানেজ করো?",
      m: "আমি আন্তর্জাতিক কন্ট্রাক্টিং ও পেমেন্ট ওয়ার্কফ্লোতে শতভাগ অভিজ্ঞ: (১) প্রতি মাসের নির্ধারিত তারিখে পেশাদার ইনভয়েস জেনারেট করে কোম্পানির ফিন্যান্স টিমে পাঠাই (ইনভয়েস নম্বর, কাজের বিবরণ, মোট $2,250 USD, ব্যাংকিং ডিটেইলস সহ)। (২) পেমেন্ট রিসিভ করার জন্য আন্তর্জাতিক গেটওয়ে যেমন **Wise (formerly TransferWise)** বা ডিরেক্ট **SWIFT Wire Transfer** ব্যবহার করি যা সরাসরি লোকাল ব্যাংক একাউন্টে জমা হয়। (৩) দেশের ফ্রিল্যান্সিং ও আইটি রেমিট্যান্স নীতিমালার সাথে পূর্ণ সঙ্গতি রেখে ট্যাক্স ও ফিনান্সিয়াল কমপ্লায়েন্স নিশ্চিত করি। পেমেন্ট নিয়ে কোনো বাড়তি প্রশাসনিক ঝামেলা হয় না।",
      b: "প্রতি মাসে পেশাদার ইনভয়েস তৈরি করে ওয়াইজ বা সুইফট ওয়্যার ট্রান্সফারের মাধ্যমে সরাসরি লোকাল ব্যাংকে ডলার রেমিট্যান্স গ্রহণ করি। পেমেন্ট সংক্রান্ত যাবতীয় নিয়মকানুন ও ট্যাক্স কমপ্লায়েন্স আমি নিয়মিত মেনে চলি।",
      e: "I manage international remote contracting independently: issuing structured monthly invoices (specifying deliverables, hourly/monthly retainer of $2,250 USD, and SWIFT/IBAN credentials); processing wire transfers smoothly via Wise or commercial bank SWIFT networks; and maintaining full compliance with local export/IT remittance regulations.",
      tip: "Wise এবং SWIFT আন্তর্জাতিক পেমেন্টের বাস্তব অভিজ্ঞতা তুলে ধরে।"
    },
    {
      lvl: "realworld",
      q: "দীর্ঘমেয়াদী হাই-পারফরম্যান্স বজায় রাখতে তুমি কীভাবে প্রফেশনাল বাউন্ডারি ও ওয়ার্ক-লাইফ ব্যালেন্স রক্ষা করো?",
      m: "বার্নআউট কোনো গর্বের বিষয় নয়; সফটওয়্যার ইঞ্জিনিয়ারিং হলো একটি ম্যারাথন, ১০০ মিটার স্প্রিন্ট নয়। আমি বাউন্ডারি রক্ষা করি: (১) কাজের সময় ১০০% গভীর ফোকাস দিয়ে কাজ করি, কোনো ফাঁকিবাজি করি না। (২) শিফট শেষ হলে ল্যাপটপ বন্ধ করে পারিবারিক সময়, শরীরচর্চা ও রিফ্রেশমেন্টে সময় দিই। (৩) পর্যাপ্ত ঘুম নিশ্চিত করি যাতে পরের দিন সকালে ভোরবেলা সম্পূর্ণ ফ্রেশ ব্রেন নিয়ে কোডিংয়ে নামতে পারি। (৪) সুস্থ শরীর ও শান্ত মনই একজন ইঞ্জিনিয়ারকে একটানা বহু বছর হাই-কোয়ালিটি প্রোডাকশন কোড ডেলিভারি দেওয়ার সক্ষমতা দেয়।",
      b: "কাজের সময় পূর্ণ মনোযোগ দিয়ে কাজ শেষ করি এবং কাজের পর নিয়মিত শরীরচর্চা ও পর্যাপ্ত বিশ্রাম নিই। সুস্থ জীবনযাপনই দীর্ঘমেয়াদে ক্লান্তিহীনভাবে মানসম্মত কোড ডেলিভারি দেওয়ার মূল চাবিকাঠি।",
      e: "Sustainable high-performance is a marathon, not a reckless sprint. I protect mental stamina through structured boundaries: ruthless focus during work windows; shutting down terminals at the shift's conclusion; engaging in daily physical fitness and quality sleep; and entering dawn shifts with peak cognitive freshness to sustain multi-year engineering excellence.",
      tip: "Sustainable High-Performance মানসিকতা একজন পরিণত সিনিয়র ইঞ্জিনিয়ারের পরিচয় দেয়।"
    }
  ]
};
