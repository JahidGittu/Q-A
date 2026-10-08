// Topic 5: Tailwind CSS & Responsive UI (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "tailwind-responsive-ui",
  name: "Tailwind CSS & Responsive UI",
  desc: "Tailwind CSS, HTML5 Semantic Elements, CSS3 Flexbox & Grid, Mobile-First Design, Container Queries, Dark Mode",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "HTML5-এ Semantic Elements (header, nav, main, section, article, aside, footer) ব্যবহারের গুরুত্ব কী?",
      m: "Semantic Elements কোডের অর্থ ও কাঠামো স্পষ্ট করে। সাধারণ `<div>` বা `<span>`-এর কোনো অর্থ থাকে না, কিন্তু সেমান্টিক ট্যাগ ব্যবহার করলে: (১) সার্চ ইঞ্জিন ক্রলার (Google SEO) পেজের কনটেন্ট হায়ারার্কি সহজে ইনডেক্স করতে পারে, (২) স্ক্রিন রিডার (Screen Readers) দৃষ্টিপ্রতিবন্ধী ইউজারদের জন্য অ্যাক্সেসিবিলিটি (A11y) নিশ্চিত করে, (৩) কোড রিডেবিলিটি ও মেইনটেনিবিলিটি অনেক সহজ হয়।",
      b: "এইচটিএমএল৫ সেমান্টিক উপাদানগুলো ব্রাউজার এবং সার্চ ইঞ্জিনকে পেজের বিভিন্ন অংশের অর্থ ও ভূমিকা স্পষ্টভাবে বুঝিয়ে দেয়। এটি এসইও র্যাংকিং বাড়াতে এবং স্ক্রিন রিডারের সাহায্যে প্রতিবন্ধী ব্যক্তিদের জন্য ওয়েবসাইটের অ্যাক্সেসিবিলিটি নিশ্চিত করতে অত্যন্ত জরুরি।",
      e: "Semantic HTML elements convey structural meaning to both browsers and developers. They drastically boost SEO indexing by search engine crawlers, enable accessibility (A11y) via screen readers, and establish clean document hierarchy without excessive div bloat.",
      tip: "কখনোই পুরো পেজ div দিয়ে ভরিয়ে ফেলবে না; প্রধান কনটেন্টে <main>, ন্যাভবারে <nav>, সাইডবারে <aside> ব্যবহার করবে।"
    },
    {
      lvl: "lvl1",
      q: "CSS3 Flexbox এবং CSS Grid-এর মধ্যে মূল পার্থক্য কী এবং কখন কোনটি ব্যবহার করবে?",
      m: "Flexbox হলো One-Dimensional (১ডি) লেআউট সিস্টেম—এটি হয় রো (Row) অথবা কলাম (Column) বরাবর একটি ডিরেকশনে কাজ করে (যেমন ন্যাভবার, বাটন গ্রুপ, আইকন এলাইনমেন্ট)। আর CSS Grid হলো Two-Dimensional (২ডি) লেআউট সিস্টেম—এটি একই সাথে রো এবং কলাম উভয় বরাবর কাজ করে (যেমন পুরো ড্যাশবোর্ড লেআউট, প্রোডাক্ট গ্যালারি, জটিল ডাটা গ্রিড)।",
      b: "ফ্লেক্সবক্স একমাত্রিক বিন্যাসে কাজ করে, অর্থাৎ রো অথবা কলামের যেকোনো একদিকে উপাদান সাজাতে উপযোগী। গ্রিড দ্বিমাত্রিক বিন্যাস যেখানে একই সাথে রো এবং কলামের সমন্বয়ে পূর্ণাঙ্গ জটিল ওয়েব লেআউট তৈরি করা যায়।",
      e: "Flexbox is a one-dimensional layout system designed for distributing space along either a row or a column (ideal for navbars, toolbars, alignment). CSS Grid is a two-dimensional layout system handling both rows and columns concurrently (ideal for page dashboards and card grids).",
      code: "/* Flex: 1D */\n.nav { display: flex; justify-content: space-between; align-items: center; }\n/* Grid: 2D */\n.dashboard { display: grid; grid-template-columns: 260px 1fr; }"
    },
    {
      lvl: "lvl1",
      q: "Mobile-First Responsive Design নীতি কী এবং Tailwind CSS কীভাবে এটি হ্যান্ডেল করে?",
      m: "Mobile-First নীতি অনুযায়ী প্রথমে ছোট মোবাইল স্ক্রিনের জন্য বেস CSS বা ডিফল্ট স্টাইল লেখা হয়। এরপর স্ক্রিন সাইজ যত বড় হতে থাকে, `min-width` মিডিয়া কোয়েরি দিয়ে অতিরিক্ত স্টাইল যোগ করা হয়। Tailwind CSS পুরোপুরি Mobile-First: কোনো প্রিফিক্স ছাড়া ক্লাস লিখলে (যেমন `text-sm p-4`) তা মোবাইলের জন্য অ্যাপ্লাই হয়, আর ব্রেকপয়েন্ট যোগ করলে (যেমন `md:text-base md:p-8`) তা শুধুমাত্র মাঝারি বা বড় স্ক্রিনে সক্রিয় হয়।",
      b: "মোবাইল-ফার্স্ট ডিজাইনে প্রথমে মোবাইলের জন্য ডিফল্ট সিএসএস লেখা হয় এবং বড় স্ক্রিনের জন্য পর্যায়ক্রমে min-width মিডিয়া কোয়েরি যোগ করা হয়। টেলউইন্ড সিএসএস ডিফল্টভাবে মোবাইল-ফার্স্ট মেনে চলে, যেখানে প্রিফিক্স ছাড়া ক্লাসগুলো মোবাইলের জন্য এবং sm:, md:, lg: বড় স্ক্রিনের জন্য প্রযোজ্য হয়।",
      e: "Mobile-first design prioritizes designing for mobile viewports initially using min-width media queries for larger screens. In Tailwind CSS, un-prefixed utilities apply to mobile viewports, while responsive prefixes (sm:, md:, lg:, xl:) take effect strictly at their min-width breakpoints.",
      code: "<div className='w-full md:w-1/2 lg:w-1/3'>Responsive Card</div>"
    },
    {
      lvl: "lvl1",
      q: "Tailwind CSS-এ `clsx` এবং `tailwind-merge` (`cn` helper function) কেন সবসময় ব্যবহার করা উচিত?",
      m: "Tailwind-এ ডায়নামিক ক্লাস যোগ করার সময় স্ট্রিং কনক্যাটেনেশন করলে ক্লাস কনফ্লিক্ট হয় (যেমন প্যারেন্ট পাঠালো `p-4` আর চাইল্ডে ডিফল্ট আছে `p-2`)। CSS স্পেসিফিসিটি নিয়মে কোনটি জিতবে তা আনপ্রেডিক্টেবল হয়ে যায়। `clsx` কন্ডিশনাল ক্লাস হ্যান্ডেল করে, আর `tailwind-merge` একই ধরণের কনফ্লিক্টিং ক্লাসের ভেতর শেষের ক্লাসটিকে জয়ী করে অন্যগুলোকে স্বয়ংক্রিয়ভাবে রিমুভ করে। আমরা দুটিকে মিলিয়ে `cn()` হেল্পার ফাংশন ব্যবহার করি।",
      b: "টেলউইন্ডে শর্তসাপেক্ষে ক্লাস যোগ এবং পরস্পরবিরোধী ক্লাসের সংঘাত এড়াতে clsx এবং tailwind-merge ব্যবহৃত হয়। cn() হেল্পার ফাংশনের মাধ্যমে অপ্রয়োজনীয় ডুপ্লিকেট ক্লাস মুছে ফেলে নিশ্চিতভাবে সঠিক ক্লাস প্রয়োগ করা যায়।",
      e: "Using string concatenation for dynamic classes leads to CSS conflicts. `clsx` allows conditional class toggling, while `tailwind-merge` resolves conflicting utilities (e.g. p-4 vs p-2) by keeping the latter. The standard `cn()` helper combines both for bulletproof component styling.",
      code: "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}"
    },
    {
      lvl: "lvl1",
      q: "CSS Box Model-এর উপাদানগুলো কী কী এবং `box-sizing: border-box` এর গুরুত্ব কী?",
      m: "CSS Box Model-এ ৪টি অংশ থাকে: Content, Padding, Border, এবং Margin। ডিফল্ট `content-box`-এ প্যাডিং বা বর্ডার দিলে উপাদানের মোট সাইজ বেড়ে যায় (Width + Padding + Border), ফলে লেআউট ভেঙে যায়। আর `box-sizing: border-box` দিলে প্যাডিং এবং বর্ডার এলিমেন্টের নির্দিষ্ট Width ও Height-এর ভেতরেই হিসাব হয়, বাইরে বাড়ে না। আধুনিক ব্রাউজার এবং Tailwind CSS ডিফল্টভাবে সব এলিমেন্টে `border-box` রিসেট ব্যবহার করে।",
      b: "বক্স মডেলের ৪টি স্তর হলো কন্টেন্ট, প্যাডিং, বর্ডার এবং মার্জিন। box-sizing: border-box নিশ্চিত করে যে প্যাডিং এবং বর্ডার বাড়ালেও উপাদানের মোট প্রস্থ বা উচ্চতা বৃদ্ধি না পেয়ে সীমানার ভেতরেই সমন্বিত থাকে।",
      e: "The CSS Box Model consists of Content, Padding, Border, and Margin. Default `content-box` expands element dimensions when padding or borders are applied. `border-box` confines padding and border inside the declared width/height, preventing layout breakages.",
      tip: "টেলউইন্ড সিএসএস ডিফল্টভাবে প্রি-ফ্লাইট রিসেটে `box-sizing: border-box` প্রয়োগ করে রাখে।"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Tailwind CSS v4-এর নতুন CSS-first কনফিগারেশন এবং `@theme` ডিরেক্টিভ কীভাবে কাজ করে?",
      m: "Tailwind v4-এ পুরানো জাভাস্ক্রিপ্ট ফাইল `tailwind.config.js` সম্পূর্ণ বিদায় নিয়েছে! এর বদলে এটি পুরোপুরি CSS-first আর্কিটেকচার গ্রহণ করেছে। সরাসরি আপনার মূল `globals.css` ফাইলের ভেতরে `@import 'tailwindcss';` দিয়ে এবং `@theme { --color-primary: #10b981; }` ডিরেক্টিভ দিয়ে ডিজাইন টোকেন, কালার, ফন্ট ও স্পেসিং ডিফাইন করা যায়। এটি Lightning CSS ইঞ্জিন ব্যবহার করায় কম্পাইলেশন আগের চেয়ে ১০ গুণ দ্রুত হয়।",
      b: "টেলউইন্ড ৪ ভার্সনে tailwind.config.js ফাইলের প্রয়োজন নেই। সরাসরি সিএসএস ফাইলের ভেতর @theme ডিরেক্টিভের মাধ্যমে সমস্ত ভ্যারিয়েবল, রঙ এবং ফন্ট সংজ্ঞায়িত করা যায়, যা লাইটনিং সিএসএস ইঞ্জিনের কারণে অতি দ্রুত কম্পাইল হয়।",
      e: "Tailwind CSS v4 replaces JavaScript configuration files (tailwind.config.js) with a CSS-first model using the @theme directive inside CSS files, powered by the high-performance Lightning CSS engine for sub-millisecond builds.",
      code: "@import 'tailwindcss';\n@theme {\n  --color-brand: #0f172a;\n  --font-display: 'Inter', sans-serif;\n}"
    },
    {
      lvl: "lvl2",
      q: "Tailwind CSS-এ Dark Mode কীভাবে আর্কিটেক্ট করবে (Class Strategy vs Media Query Strategy)?",
      m: "Media Query Strategy ব্রাউজার বা অপারেটিং সিস্টেমের সিস্টেম ডার্ক থিমের ওপর নির্ভর করে (`prefers-color-scheme`)। কিন্তু প্রফেশনাল ওয়েব অ্যাপে আমরা Class Strategy (`darkMode: 'selector'` বা `'class'`) ব্যবহার করি। এতে `<html>` ট্যাগে একটি `.dark` ক্লাস টগল করে আমরা ইউজারকে ম্যানুয়ালি ডার্ক ও লাইট মোড সুইচের পূর্ণ স্বাধীনতা দিই এবং ইউজারের পছন্দ `localStorage`-এ সেভ করে রাখি।",
      b: "ডার্ক মোডে ক্লাস স্ট্র্যাটেজি ব্যবহার করে html ট্যাগে dark ক্লাস বসিয়ে পুরো পেজের রঙ পরিবর্তন করা হয়। এটি ব্যবহারকারীকে ম্যানুয়ালি থিম পরিবর্তনের সুবিধা দেয় যা সিস্টেম প্রেফারেন্সের চেয়ে অনেক বেশি নমনীয়।",
      e: "The class strategy toggles a `.dark` class on the root <html> element, giving users manual control over UI themes persisted in localStorage, rather than being locked strictly to the OS-level prefers-color-scheme media query.",
      code: "<html className={isDark ? 'dark' : ''}>\n  <div className='bg-white text-black dark:bg-slate-900 dark:text-white'>Content</div>\n</html>"
    },
    {
      lvl: "lvl2",
      q: "CSS Container Queries কী এবং সাধারণ Media Queries-এর চেয়ে এটি কম্পোনেন্ট-বেসড আর্কিটেকচারে কেন সেরা?",
      m: "Media Queries শুধুমাত্র পুরো ব্রাউজার স্ক্রিন বা ভিউপোর্টের প্রস্থের ওপর ভিত্তি করে স্টাইল পরিবর্তন করতে পারে। কিন্তু একটি কার্ড কম্পোনেন্ট সাইডবারে বসলে ছোট দেখাবে আবার মেইন বডিতে বসলে বড় দেখাবে—অথচ ব্রাউজার স্ক্রিন সাইজ এক! Container Queries (`@container` / Tailwind `@container`) এলিমেন্টের নিজস্ব প্যারেন্ট কন্টেইনারের সাইজের ওপর ভিত্তি করে রেসপনসিভ স্টাইল অ্যাপ্লাই করে, যা স্বয়ংসম্পূর্ণ রি-ইউজেবল কম্পোনেন্ট তৈরিতে যুগান্তকারী।",
      b: "কন্টেইনার কোয়েরি পুরো ব্রাউজার স্ক্রিনের বদলে কম্পোনেন্টের মূল কন্টেইনারের প্রস্থ মেপে রেসপনসিভ স্টাইল প্রয়োগ করে। ফলে একটি কার্ড সাইডবার বা মূল কন্টেন্টে যেখানেই বসুক না কেন, নিজস্ব জায়গার ওপর ভিত্তি করে সুন্দরভাবে বিন্যস্ত হয়।",
      e: "Container Queries evaluate the dimensions of the parent container rather than the entire browser viewport. In component-driven architectures, this enables cards or widgets to adapt their layout based on where they are placed (e.g. sidebar vs full main column).",
      code: "<div className='@container'>\n  <div className='flex flex-col @md:flex-row'>Responsive to Container</div>\n</div>"
    },
    {
      lvl: "lvl2",
      q: "CSS Specificity (স্পেসিফিসিটি) কীভাবে গণনা করা হয় এবং `!important` ব্যবহার করা কেন ক্ষতিকর?",
      m: "Specificity গণনা হয় ৪টি ক্যাটাগরিতে (Inline Styles > IDs > Classes/Attributes/Pseudo-classes > Elements)। `!important` দিলে তা সব স্বাভাবিক স্পেসিফিসিটি রুলকে জোরপূর্বক ওভাররাইড করে। অতিরিক্ত `!important` ব্যবহার করলে সিএসএস ক্যাস্কেডিং নষ্ট হয়, ভবিষ্যতে স্টাইল পরিবর্তন অসম্ভব জটিল হয়ে পড়ে এবং কোড আন-মেইনটেইনেবল হয়ে যায়। Tailwind-এ স্পেসিফিসিটি ফিক্স করতে কাস্টম ক্লাস বা `@layer utilities` ব্যবহার করা উচিত।",
      b: "সিএসএস স্পেসিফিসিটি উপাদান, ক্লাস, আইডি এবং ইনলাইন স্টাইলের অগ্রাধিকারের ভিত্তিতে নির্ধারিত হয়। !important স্বাভাবিক নিয়ম ভেঙে ফেলে এবং কোডবেজকে জটিল ও ভবিষ্যৎ আপডেটের অনুপযোগী করে তোলে।",
      e: "Specificity follows a hierarchy: Inline (1000) > ID (100) > Class/Attribute (10) > Element (1). Relying on !important breaks the natural CSS cascade, creating specificity wars that make long-term UI maintenance brittle.",
      tip: "কখনোই কুইক ফিক্স হিসেবে !important ক্লাস্টার তৈরি করবে না; স্পেসিফিসিটি বা সিএসএস আর্কিটেকচার ঠিক করবে।"
    },
    {
      lvl: "lvl2",
      q: "CSS Grid-এ `minmax()`, `auto-fit`, এবং `auto-fill` ব্যবহার করে মিডিয়া কোয়েরি ছাড়া স্বয়ংক্রিয় রেসপনসিভ কার্ড গ্রিড কীভাবে তৈরি করা যায়?",
      m: "আমরা কোনো `@media` ব্রেকপয়েন্ট না লিখেও সম্পূর্ণ রেসপনসিভ গ্রিড বানাতে পারি: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));`। এখানে `minmax(280px, 1fr)` নিশ্চিত করে প্রতিটি কার্ডের মিনিমাম সাইজ ২৮০ পিক্সেল থাকবে কিন্তু স্ক্রিনে জায়গা থাকলে সমানভাবে বড় হবে। আর `auto-fit` কলামের খালি জায়গা স্ট্রেচ করে পুরো প্রস্থ পূরণ করে। Tailwind-এ এটি `grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]` দিয়ে লেখা যায়।",
      b: "রিপিট, অটো-ফিট এবং মিনম্যাক্স সমন্বয়ে কোনো মিডিয়া কোয়েরি ছাড়াই স্বয়ংক্রিয় কার্ড গ্রিড তৈরি করা যায়। প্রতিটি কার্ডের সর্বনিম্ন মাপ নিশ্চিত রেখে অতিরিক্ত ফাঁকা জায়গা স্বয়ংক্রিয়ভাবে পূর্ণ হয়।",
      e: "Using `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` creates an intrinsically responsive grid without writing a single media query. Columns automatically wrap when the viewport narrows and expand proportionally to fill available space.",
      code: "<div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4'>\n  {items.map(item => <Card key={item.id} />)}\n</div>"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Tailwind CSS এবং Modern CSS-এ `@layer` (Cascade Layers: base, components, utilities) কীভাবে কাজ করে?",
      m: "CSS Cascade Layers (`@layer`) স্টাইলের অগ্রাধিকার বা ক্যাস্কেডিং অর্ডারকে কঠোরভাবে নিয়ন্ত্রণ করে। Tailwind-এ ৩টি স্তর থাকে: `@layer base` (HTML এলিমেন্টের ডিফল্ট রিসেট), `@layer components` (কম্পোনেন্ট ক্লাস যেমন বাটন, কার্ড), এবং `@layer utilities` (ইউটিলিটি ক্লাস যেমন মার্জিন, প্যাডিং)। এর ফলে একটি সাধারণ ইউটিলিটি ক্লাস (যেমন `mt-4`) সবসময় কম্পোনেন্ট ক্লাসের চেয়ে বেশি প্রায়োরিটি পায়, কোনো স্পেসিফিসিটি হ্যাক ছাড়াই।",
      b: "ক্যাস্কেড লেয়ার সিএসএসের অগ্রাধিকারের স্তর সাজায়। টেলউইন্ডে বেইস, কম্পোনেন্টস এবং ইউটিলিটিজ লেয়ারের মাধ্যমে নিশ্চিত করা হয় যে যেকোনো ইউটিলিটি ক্লাস অনায়াসে কম্পোনেন্ট ক্লাসের স্টাইল ওভাররাইড করতে পারে।",
      e: "CSS Cascade Layers (@layer) structure style precedence regardless of selector specificity. In Tailwind, utilities layer styles always triumph over components layer styles, which in turn override base resets, establishing predictable cascades.",
      code: "@layer components {\n  .btn-primary {\n    @apply px-4 py-2 bg-blue-600 text-white rounded;\n  }\n}"
    },
    {
      lvl: "lvl3",
      q: "GPU Acceleration এবং Hardware-Accelerated CSS Animations কীভাবে স্মুথ ৬০ FPS ফ্রেমরেট নিশ্চিত করে?",
      m: "CSS-এ `top`, `left`, `width`, `height` পরিবর্তন করলে ব্রাউজারকে পুরো DOM লেআউট (Layout/Reflow) এবং পেইন্ট (Paint) রি-ক্যালকুলেট করতে হয় যা CPU-র ওপর চাপ ফেলে এবং ফ্রেম ড্রপ করায়। কিন্তু `transform` (যেমন `translate3d`, `scale`) এবং `opacity` ব্যবহার করলে ব্রাউজার এলিমেন্টটিকে আলাদা 'Compositor Layer'-এ তুলে সরাসরি গ্রাফিক্স কার্ড (GPU)-এ রেন্ডার করে। এতে কোনো রিফ্লো বা রি-পেইন্ট ছাড়াই মাখনের মতো ৬০–১২০ FPS স্মুথ অ্যানিমেশন পাওয়া যায়।",
      b: "জিপিইউ এক্সিলারেশন অ্যানিমেশনের জন্য সিপিইউর বদলে গ্রাফিক্স কার্ড ব্যবহার করে। transform এবং opacity প্রপার্টি ব্যবহার করলে ব্রাউজারকে ডম রিফ্লো করতে হয় না, সরাসরি কম্পোজিটর লেয়ারের মাধ্যমে ৬০ এফপিএস স্মুথ অ্যানিমেশন কার্যকর হয়।",
      e: "Mutating layout properties (top, left, width) triggers expensive browser Reflow and Paint cycles. Hardware-accelerated properties (transform, opacity) offload work to the GPU via the Compositor thread, sustaining 60fps animations without stalling the main UI thread.",
      code: "/* Smooth 60FPS: */\n.slide-in { transform: translate3d(0, 0, 0); will-change: transform; }"
    },
    {
      lvl: "lvl3",
      q: "CSS Subgrid কী এবং নেস্টেড কার্ডের হেডার বা ফুটারকে প্যারেন্ট গ্রিডের লাইনের সাথে কীভাবে পুরোপুরি অ্যালাইন করা যায়?",
      m: "আগে যখন কোনো গ্রিড আইটেমের ভেতরে নেস্টেড চাইল্ড থাকত, চাইল্ডের নিজস্ব গ্রিড থাকত এবং প্যারেন্ট গ্রিডের ট্র্যাকের সাথে মেলা অসম্ভব ছিল (যেমন ভিন্ন দৈর্ঘ্যের টাইটেলের কারণে কার্ডের বাটনগুলো অসমান লাইনে থাকত)। CSS `subgrid` (`grid-template-rows: subgrid;`) চাইল্ড এলিমেন্টকে অনুমতি দেয় প্যারেন্টের গ্রিড ট্র্যাক সরাসরি ধার নিতে। এর ফলে প্রতিটি কার্ডের কনটেন্ট সাইজ ভিন্ন হলেও সব কার্ডের ফুটার ও বাটন হুবহু একই সমান্তরাল লাইনে স্ন্যাপ করে।",
      b: "সাবগ্রিড চাইল্ড কম্পোনেন্টকে তার প্যারেন্ট গ্রিডের সারি এবং কলামের লাইনগুলো সরাসরি ব্যবহার করার সুযোগ দেয়। ফলে ভিন্ন ভিন্ন টেক্সটের দৈর্ঘ্য থাকা সত্ত্বেও কার্ডের বাটনগুলো পুরোপুরি এক সমান লাইনে বিন্যস্ত থাকে।",
      e: "CSS Subgrid allows nested child grid items to inherit and participate directly in the parent grid's row and column tracks, ensuring that headers, descriptions, and action buttons align horizontally across varying card contents.",
      code: ".card { display: grid; grid-row: span 3; grid-template-rows: subgrid; }"
    },
    {
      lvl: "lvl3",
      q: "Tailwind CSS-এ Custom Plugins এবং Dynamic Design Tokens কীভাবে এন্টারপ্রাইজ স্কেলে মেইনটেইন করা যায়?",
      m: "এন্টারপ্রাইজ অ্যাপ্লিকেশনে একাধিক ব্র্যান্ড বা থিমের জন্য আমরা Tailwind Plugin আর্কিটেকচার ব্যবহার করি। `plugin(({ addUtilities, matchUtilities, theme }) => ...)` দিয়ে ডায়নামিক ইউটিলিটি জেনারেট করা যায়। সাথে CSS ভ্যারিয়েবল (`var(--primary)`) ভিত্তিক ডিজাইন টোকেন ব্যবহার করলে রানটাইমে ক্লায়েন্টের কাস্টম ব্র্যান্ড কালার বদলালেও টেলউইন্ডের সম্পূর্ণ বিল্ড সাইজ বৃদ্ধি না পেয়ে মাত্র একটি CSS ক্লাসে থিম সুইচ করা যায়।",
      b: "এন্টারপ্রাইজ স্কেলে আমরা টেলউইন্ড প্লাগিন ও সিএসএস ভ্যারিয়েবল ব্যবহার করে ডায়নামিক ডিজাইন টোকেন তৈরি করি। এর ফলে রানটাইমে সম্পূর্ণ থিম পরিবর্তন করা যায় এবং কোডবেজ অত্যন্ত সুসংগঠিত থাকে।",
      e: "Enterprise design systems implement custom Tailwind plugins via `addUtilities` and dynamic CSS custom properties (`var(--primary)`). This maintains consistent tokens across themes while keeping stylesheet sizes minimal.",
      code: "const plugin = require('tailwindcss/plugin');\nmodule.exports = plugin(({ addUtilities }) => {\n  addUtilities({ '.scrollbar-none': { 'scrollbar-width': 'none' } });\n});"
    },
    {
      lvl: "lvl3",
      q: "CSS Text Truncation এবং Multi-line Clamp কীভাবে হ্যান্ডেল করবে যাতে বিভিন্ন ব্রাউজারে টেক্সট ভেঙে না যায়?",
      m: "সিঙ্গেল লাইন টেক্সটের জন্য Tailwind-এ `truncate` ক্লাস ব্যবহার করা হয় (`overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`)। আর মাল্টি-লাইন ট্রাংকেশনের জন্য (যেমন কার্ডের ডেসক্রিপশন সর্বোচ্চ ৩ লাইনে কেটে `...` দেখানো) `line-clamp-3` ব্যবহার করা হয় যা ইন্টারনালি WebKit Line Clamp প্রপার্টি (`display: -webkit-box; -webkit-box-orient: vertical;`) ব্যবহার করে সব আধুনিক ব্রাউজারে পারফেক্টলি সাপোর্ট করে।",
      b: "এক লাইনের টেক্সট কাটতে truncate এবং একাধিক লাইনের জন্য line-clamp ইউটিলিটি ব্যবহার করা হয়। এটি নির্দিষ্ট লাইনের পর টেক্সট কেটে উপবৃত্তাকার চিহ্ন (...) প্রদর্শন করে লেআউট পরিপাটি রাখে।",
      e: "For single-line clipping, use `truncate` (ellipsis with no-wrap). For multi-line boundaries, leverage `line-clamp-{n}` which utilizes WebKit box orientation standards to cleanly truncate paragraphs after n lines.",
      code: "<p className='line-clamp-2 text-slate-600'>Long product description...</p>"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "মোবাইল ভিউতে সাফারি ব্রাউজারে নিচের অ্যাড্রেস বারের কারণে `100vh` দিলে স্ক্রিনের নিচের বাটন কেটে যায় বা লুকায়িত থাকে। কীভাবে ফিক্স করবে?",
      m: "এটি মোবাইল সাফারির ক্লাসিক ভিউপোর্ট সমস্যা, কারণ সাফারির ডায়নামিক অ্যাড্রেস বার এক্সপ্যান্ড বা কলাপ্স হলে আসল দৃশ্যমান উচ্চতা কমে যায়। সমাধান: (১) CSS-এর নতুন ভিউপোর্ট ইউনিট `100dvh` (Dynamic Viewport Height) অথবা `100svh` (Small Viewport Height) ব্যবহার করব। (২) Tailwind-এ সরাসরি `h-dvh` বা `min-h-dvh` লিখলে যেকোনো মোবাইল ব্রাউজারে অ্যাড্রেস বারের সাথে নিজে থেকেই উচ্চতা অ্যাডজাস্ট হয়ে যায় এবং বাটন সবসময় দৃশ্যমান থাকে।",
      b: "মোবাইল সাফারিতে অ্যাড্রেস বারের ঝামেলা এড়াতে 100vh এর বদলে আধুনিক 100dvh (Dynamic Viewport Height) ব্যবহার করতে হবে। টেলউইন্ডের h-dvh ক্লাস এটি নিখুঁতভাবে সমাধান করে।",
      e: "Mobile Safari's dynamic navigation bar causes 100vh to overflow the visible viewport. Resolve this by switching to Dynamic Viewport units (`100dvh` or Tailwind's `h-dvh`) which dynamically recalculate height as address bars collapse.",
      code: "<div className='min-h-dvh flex flex-col justify-between'>Full Mobile Screen</div>"
    },
    {
      lvl: "situation",
      q: "একটি ডেটা টেবিল মোবাইল স্ক্রিনে উপচে পড়ছে (Overflow) এবং পুরো পেজের বডি ডানে-বামে হরিজোন্টাল স্ক্রল হয়ে লেআউট ভেঙে দিচ্ছে। সমাধান কী?",
      m: "টেবিলের প্যারেন্ট কন্টেইনারে `overflow-x-auto` এবং `max-w-full` দিতে হবে, এবং মূল বডি বা পেজ লেআউটে `overflow-x-hidden` এনফোর্স করতে হবে। টেবিলে `whitespace-nowrap` রাখব যাতে সেলগুলো ভেঙে না যায় এবং ব্যবহারকারী টেবিলটির ভেতরেই মসৃণভাবে শুধু টেবিল স্ক্রল করতে পারে, পুরো পেজ নয়।",
      b: "পুরো পেজ হরিজোন্টালি স্ক্রল হওয়া রোধে টেবিলটিকে একটি ডিভে মুড়ে overflow-x-auto দিতে হবে এবং মূল পেজে overflow-x-hidden নিশ্চিত করতে হবে যাতে শুধুমাত্র টেবিলটি স্ক্রল হয়।",
      e: "Wrap the table in a responsive container styled with `overflow-x-auto` and `w-full` while applying `whitespace-nowrap` to table cells. Guard the outer layout container with `overflow-x-hidden`.",
      code: "<div className='w-full overflow-x-auto rounded-lg border'>\n  <table className='w-full text-left whitespace-nowrap'>...</table>\n</div>"
    },
    {
      lvl: "situation",
      q: "টেলউইন্ড সিএসএস দিয়ে ডায়নামিক ক্লাস লিখতে গিয়ে যেমন `bg-${color}-500` দিলে প্রোডাকশন বিল্ডে কোনো ব্যাকগ্রাউন্ড রঙ আসছে না। কারণ কী এবং সমাধান কী?",
      m: "কারণ হলো Tailwind CSS বিল্ড টাইমে রেগুলার এক্সপ্রেশন দিয়ে সোর্স কোডের র ফাইলগুলো স্ক্যান করে সরাসরি পুরো ক্লাসের নাম খোঁজে (Purge / Tree Shaking)। স্ট্রিং ইন্টারপোলেশন (`bg-${color}-500`) করলে বিল্ড টুল বুঝতে পারে না কোন ক্লাসটি প্রয়োজন, তাই CSS ফাইলে সেই ক্লাস জেনারেট করে না। সমাধান: ডায়নামিক ক্লাসের সম্পূর্ণ নাম একটি অবজেক্ট ম্যাপে রাখতে হবে (`const colorMap = { red: 'bg-red-500', blue: 'bg-blue-500' }`) অথবা ইনলাইন স্টাইল দিতে হবে।",
      b: "টেলউইন্ড কম্পাইলার কোড স্ক্যান করে সম্পূর্ণ ক্লাসের নাম খোঁজে। স্ট্রিং কনক্যাটেনেশন করলে টেলউইন্ড ক্লাসটি সনাক্ত করতে পারে না এবং সিএসএস থেকে বাদ দেয়। সমাধান হলো ক্লাসের সম্পূর্ণ নাম ম্যাপিং অবজেক্টে লিখে রাখা।",
      e: "Tailwind's build engine scans source files using static string matching. String interpolations like `bg-${color}-500` cannot be extracted at build time and get purged. Map complete, unbroken class names in a dictionary object.",
      code: "const COLOR_CLASSES = {\n  primary: 'bg-emerald-500',\n  danger: 'bg-rose-500'\n};\n<div className={COLOR_CLASSES[status]} />"
    },
    {
      lvl: "situation",
      q: "একটি মডাল পপআপ ওপেন করার পর পেজের পেছনের বডি এখনো স্ক্রল হচ্ছে (Background Scroll Leaking)। কীভাবে সমাধান করবে?",
      m: "সমাধান: মডাল মাউন্ট হওয়ার সাথে সাথে আমরা জাভাস্ক্রিপ্ট ইফেক্ট দিয়ে `document.body.style.overflow = 'hidden'` করব এবং মডাল ক্লোজ বা আনমাউন্ট হলে ক্লিনআপ ফাংশনে `document.body.style.overflow = 'unset'` করে দেব। অথবা আধুনিক Radix UI / Headless UI ডায়ালগ ব্যবহার করব যা এটি স্বয়ংক্রিয়ভাবে স্ক্রল-লক এবং স্ক্রলবার উইডথ অফসেট সহ হ্যান্ডেল করে।",
      b: "মডাল ওপেন থাকা অবস্থায় পেছনের বডি স্ক্রল বন্ধ করতে body উপাদানে overflow: hidden প্রয়োগ করতে হবে এবং মডাল বন্ধ হওয়ার সাথে সাথে তা ক্লিনআপ করে পূর্বাবস্থায় ফিরিয়ে নিতে হবে।",
      e: "Lock the background by setting document.body.style.overflow = 'hidden' when the modal mounts, and restoring it to 'unset' in the effect cleanup. Radix UI handles this automatically along with scrollbar width compensation.",
      code: "useEffect(() => {\n  document.body.style.overflow = 'hidden';\n  return () => { document.body.style.overflow = 'unset'; };\n}, []);"
    },
    {
      lvl: "situation",
      q: "ট্যাবলেট স্ক্রিনে (৭৬৮px থেকে ১০২৪px) সাইডবার মেনু ওপেন থাকলে মেইন কনটেন্টের টেক্সট সংকুচিত হয়ে ভেঙে যাচ্ছে। কীভাবে হ্যান্ডেল করবে?",
      m: "সমাধান: ট্যাবলেটে সাইডবার সবসময় স্ক্রিনে ফিক্সড না রেখে 'Collapsible Sidebar Drawer' প্যাটার্ন করব। ট্যাবলেট স্ক্রিনে সাইডবার ডিফল্টভাবে হিডেন থাকবে এবং হ্যামবার্গার বাটনে ক্লিকে ওভারলে হিসেবে ভেসে উঠবে। আর ডেস্কটপে (`lg:`) স্ক্রিনে আসলে স্বয়ংক্রিয়ভাবে পার্মানেন্ট লেফট কলামে ফিক্সড হয়ে যাবে।",
      b: "ট্যাবলেটে সাইডবার স্থায়ীভাবে জায়গা দখল না করে ড্রয়ার মেনু হিসেবে কাজ করবে। বড় ডেস্কটপ স্ক্রিনে এটি স্থায়ী থাকবে কিন্তু ট্যাবলেটে হ্যামবার্গার বাটনের মাধ্যমে স্লাইড-ইন হয়ে ভেসে উঠবে।",
      e: "Implement a responsive drawer pattern: render the sidebar as an off-canvas slide-out sheet on tablets and mobile with backdrop blur, transitioning to a persistent static flex column only on larger desktop screens (`lg:block`).",
      code: "<aside className='fixed inset-y-0 z-50 lg:static lg:block'>{...}</aside>"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর দ্রুতগতির ক্যাশ কাউন্টার ইন্টারফেসে টাচ-স্ক্রিন ডিভাইস এবং ডেস্কটপ মনিটর উভয়ের জন্য পারফেক্ট UI কীভাবে ডিজাইন করেছিলে?",
      m: "টাচ স্ক্রিনের জন্য আমরা Tailwind-এর `touch-manipulation` এবং মিনিমাম ৪৪px x ৪৪px সাইজের 'Hit Targets' নিশ্চিত করেছি যাতে আঙুল দিয়ে দ্রুত ট্যাপ করলে ভুল ক্লিক না হয়। একই সাথে ডেস্কটপে কীবোর্ড শর্টকাট (`F2` ফর বিল, `F4` ফর পেমেন্ট) এবং মাউস হোভার স্টেটস নিশ্চিত করেছি। টাচ ডিভাইসে ডাবল-ট্যাপ জুম বন্ধ করতে `touch-action: manipulation` ব্যবহার করা হয়েছিল।",
      b: "দোকানি টাচ পিওএসের জন্য আমরা বড় বড় বাটন ও টাচ টার্গেট নিশ্চিত করেছি যাতে ক্যাশিয়ার আঙুল দিয়ে দ্রুত পণ্য যোগ করতে পারে। একই সাথে কীবোর্ড নেভিগেশন ও শর্টকাট সমর্থন দিয়ে ডেস্কটপ ও টাচ উভয়ের সেরা অভিজ্ঞতা দেওয়া হয়েছে।",
      e: "In Dokani POS, touch monitors required minimum 48px hit targets, generous button padding, and touch-action: manipulation to eliminate mobile 300ms double-tap zoom delays, while concurrently exposing hotkey tooltips on desktop hover.",
      tip: "ক্যাশ কাউন্টারের টাচস্ক্রিনে ছোট বাটন বানালে ক্যাশিয়ারের বিলিং স্লো হয়ে যায়—এই বাস্তব ইউজার এক্সপেরিয়েন্স তুলে ধরা চমৎকার দিক।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর ৫০+ কাস্টমাইজড রিপোর্ট টেবিলে প্রিন্টিংয়ের জন্য `@media print` CSS আর্কিটেকচার কীভাবে তৈরি করেছিলে?",
      m: "প্রিন্ট ডায়ালগ ওপেন হলে ব্রাউজার সাইডবার, ন্যাভবার এবং অ্যাকশন বাটনগুলোও প্রিন্ট করার চেষ্টা করে। আমরা Tailwind-এর `print:hidden` ক্লাস দিয়ে সব UI কন্ট্রোল লুকিয়ে ফেলি এবং `print:block` দিয়ে হিডেন ইনভয়েস লেআউট সক্রিয় করি। সাথে পেজ ব্রেক কন্ট্রোল করতে `break-inside-avoid` এবং `break-after-page` ব্যবহার করেছি যাতে টেবিলের কোনো রো মাঝখান থেকে ছিঁড়ে অন্য পৃষ্ঠায় না যায়।",
      b: "প্রিন্ট অপটিমাইজেশনে আমরা print:hidden দিয়ে সাইডবার ও বাটন লুকিয়ে শুধুমাত্র বিলের অংশ প্রিন্ট করার ব্যবস্থা করেছি। break-inside-avoid সিএসএস দিয়ে টেবিলের রো দুই পৃষ্ঠার মাঝে কেটে যাওয়া রোধ করা হয়েছিল।",
      e: "Engineered print layouts using Tailwind's print modifiers (`print:hidden` for UI shells, `print:block` for receipts), coupled with `break-inside-avoid` and `page-break-inside: avoid` to keep transaction rows intact across paper boundaries.",
      code: "<div className='print:hidden'>Sidebar</div>\n<div className='hidden print:block font-mono'>Thermal Receipt Layout</div>"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে বাংলা ফন্ট (SolaimanLipi / Hind Siliguri) এবং ইংরেজি ফন্টের জন্য অপটিমাইজড টাইপোগ্রাফি সিস্টেম কীভাবে আর্কিটেক্ট করেছিলে?",
      m: "বাংলা ফন্টে অনেক সময় লাইন হাইট ও লেটার স্পেসিং অসমান দেখায়। আমরা `next/font/google` দিয়ে Hind Siliguri এবং Inter ফন্টকে CSS ভ্যারিয়েবল আকারে লোড করেছি (`--font-bangla`, `--font-english`)। এরপর Tailwind-এ কাস্টম ফন্ট ফ্যামিলি ডিক্লেয়ার করে বাংলা টেক্সটে `font-bangla leading-relaxed tracking-normal` এনফোর্স করেছি যাতে যুক্তাক্ষরগুলো চমৎকারভাবে ফুটে ওঠে এবং কোনো লেআউট শিফট না হয়।",
      b: "পিটিটিএবিডিতে বাংলা যুক্তাক্ষরের সঠিক প্রদর্শনে আমরা হিন্দ শিলিগুড়ি ফন্টকে অপটিমাইজড লাইন-হাইটের সাথে যুক্ত করেছি। সিএসএস ভ্যারিয়েবলের মাধ্যমে ইংরেজি ও বাংলা উভয়ের জন্য সামঞ্জস্যপূর্ণ ফন্ট সিস্টেম নিশ্চিত করা হয়েছিল।",
      e: "Configured dual typography tokens in Tailwind with `next/font`: Hind Siliguri for Bengali typography with relaxed leading to prevent ligature collisions, alongside Inter for English numeral parity, zeroing layout shift via font-display: swap.",
      code: "// globals.css\nbody { font-family: var(--font-english), var(--font-bangla), sans-serif; }"
    },
    {
      lvl: "realworld",
      q: "একটি ড্যাশবোর্ডে লাইভ ডাটা আপডেটের সময় মাইক্রো-অ্যানিমেশন (Pulse, Shimmer Skeleton, Smooth Fade) কীভাবে ব্যাটারি ও পারফরম্যান্স বাঁচিয়ে ইমপ্লিমেন্ট করবে?",
      m: "সমাধান: (১) লোডিংয়ের সময় স্ট্যাটিক স্পিনারের বদলে Tailwind-এর `animate-pulse` সমৃদ্ধ স্কেলেটন কার্ড ব্যবহার করব। (২) ব্যবহারকারী যদি ওএস-এ 'Reduce Motion' সক্রিয় করে রাখে, তবে অ্যাক্সেসিবিলিটি নিশ্চিত করতে `motion-reduce:animate-none` ব্যবহার করব যাতে অতিরিক্ত অ্যানিমেশন না চলে। (৩) সব ট্রানজিশনে শুধু `transform` এবং `opacity` ব্যবহার করব যাতে কোনো সিপিইউ ওভারহেড ছাড়া ব্যাটারি সাশ্রয়ী হয়।",
      b: "লাইভ আপডেটে আমরা টেলউইন্ডের পালস অ্যানিমেশন সমৃদ্ধ স্কেলেটন লোডার ব্যবহার করি। ব্যবহারকারীর সুবিধা অনুযায়ী motion-reduce সমর্থন নিশ্চিত করা হয় এবং জিপিইউ নির্ভর প্রপার্টি ব্যবহারের মাধ্যমে ব্যাটারি খরচ ন্যূনতম রাখা হয়।",
      e: "Implemented animated shimmer skeletons using Tailwind's `animate-pulse` paired with strict `motion-reduce:animate-none` checks for accessibility. Constrained micro-transitions to transform and opacity to respect battery life and GPU budgets.",
      code: "<div className='h-4 bg-slate-200 rounded animate-pulse motion-reduce:animate-none' />"
    },
    {
      lvl: "realworld",
      q: "Tailwind CSS প্রোডাকশন আউটপুট সিএসএস ফাইল সাইজ ১০MB থেকে কমিয়ে ৫০KB-এর নিচে কীভাবে নিশ্চিত করেছিলে?",
      m: "Tailwind CSS v3/v4-এ জাস্ট-ইন-টাইম (JIT) ইঞ্জিন ব্যবহৃত হয়। এটি সোর্স কোডে ব্যবহৃত ক্লাসগুলোর বাইরে কোনো অপ্রয়োজনীয় CSS বান্ডেলে অন্তর্ভুক্ত করে না। আমরা `content` কনফিগারেশনে নিখুঁত পাথ সেট করেছি (`./src/**/*.{js,ts,jsx,tsx}`) এবং প্রোডাকশন বিল্ডে PostCSS ও cssnano দিয়ে কম্প্রেশন করেছি। ব্রাউজারে Gzip/Brotli কম্প্রেশন সহ ফাইনাল সিএসএস সাইজ মাত্র ১২–১৫ কিলোবাইটে নেমে এসেছিল।",
      b: "টেলউইন্ডের জেআইটি ইঞ্জিন এবং সুনির্দিষ্ট কনটেন্ট পাথের মাধ্যমে শুধুমাত্র ব্যবহৃত ক্লাসগুলো সিএসএসে রাখা হয়। প্রোডাকশনে সিএসএসন্যানো এবং ব্রটলি কম্প্রেশন চালিয়ে ফাইনাল ফাইলের আকার মাত্র ১৫ কিলোবাইটে নামিয়ে আনা হয়েছিল।",
      e: "Leveraged Tailwind's JIT compiler by configuring precise content globs to only compile used utility classes. Minification via cssnano combined with Brotli compression on the edge CDN yielded a sub-15KB production stylesheet.",
      tip: "টেলউইন্ড প্রোডাকশনে ভারী হয় না বরং ব্রটলি কম্প্রেশনে পুরো সাইটের CSS মাত্র ১০-১৫ KB হয়—এই ডাটা ইন্টারভিউয়ারকে আশ্বস্ত করে।"
    }
  ]
};
