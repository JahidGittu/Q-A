// NT Tech Innovation — 01. Frontend Engineering Mastery
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.frontend = {
  id: "frontend",
  title: "Frontend Engineering",
  badge: "React · Next.js · TypeScript",
  icon: "⚛️",
  topics: [
    {
      id: "react-core",
      name: "React.js & Core Hooks",
      desc: "Virtual DOM, Component Lifecycle, useState, useEffect, useMemo, useCallback, useRef, Custom Hooks",
      items: [
        {
          lvl: "lvl1",
          q: "React-এর Virtual DOM কী এবং এটি ব্রাউজারের Real DOM-এর চেয়ে কীভাবে দ্রুত কাজ করে?",
          m: "Virtual DOM হলো আসল Real DOM-এর একটি lightweight JavaScript object representation। Real DOM সরাসরি ম্যানিপুলেট করা খুব expensive কারণ পুরো DOM tree রি-পেইন্ট ও রি-ফ্লো হয়। React প্রতিবার স্টেট পরিবর্তনের পর নতুন Virtual DOM তৈরি করে এবং 'Diffing Algorithm' চালিয়ে আগের Virtual DOM-এর সাথে তুলনা করে। শুধু যে নোডগুলো পরিবর্তন হয়েছে, কেবল সেগুলোকেই ব্যাচ আকারে আসল DOM-এ আপডেট করে (Reconciliation)।",
          b: "ভার্চুয়াল ডম হলো মেমোরিতে থাকা একটি জাভাস্ক্রিপ্ট অবজেক্ট যা আসল ব্রাউজার ডমের প্রতিচ্ছবি। যখন কম্পোনেন্টের স্টেট বা প্রপস পরিবর্তন হয়, রিঅ্যাক্ট দুটি ভার্চুয়াল ডমের মধ্যে পার্থক্য নির্ণয় করে (Diffing) এবং শুধুমাত্র পরিবর্তিত অংশটুকু ব্রাউজারের মূল ডমে আপডেট করে। ফলে ব্রাউজারকে পুরো পেজ বারবার রি-রেন্ডার করতে হয় না এবং অ্যাপ অনেক দ্রুত চলে।",
          e: "The Virtual DOM is an in-memory lightweight JavaScript representation of the real DOM. When state changes occur, React creates a new Virtual DOM tree and runs a diffing algorithm (Reconciliation) to find the minimal differences. It then applies only these specific updates in batches to the real DOM, avoiding expensive browser reflows and repaints.",
          tip: "ইন্টারভিউতে 'Reconciliation' এবং 'Batching' শব্দ দুটি উল্লেখ করলে তোমার উত্তর অনেক বেশি প্রফেশনাল শোনাবে।"
        },
        {
          lvl: "lvl1",
          q: "useState এবং useRef-এর মধ্যে মূল পার্থক্য কী? কখন কোনটি ব্যবহার করবে?",
          m: "useState স্টেট পরিবর্তন হলে কম্পোনেন্টকে রি-রেন্ডার করায়, কিন্তু useRef-এর মান পরিবর্তন হলে কম্পোনেন্ট রি-রেন্ডার হয় না। যেমন: কাউন্টারে লাইভ ডাটা বা ফর্ম ফিল্ডে চেঞ্জ দেখাতে useState ব্যবহার করি। আর কোনো DOM উপাদান সরাসরি ধরা (যেমন: ইনপুট বক্সে ফোকাস করা), টাইমার আইডি সংরক্ষণ করা, বা পূর্বের স্টেট ট্র্যাক করার জন্য useRef ব্যবহার করি।",
          b: "useState কম্পোনেন্টের স্টেট সংরক্ষণ করে এবং মান পরিবর্তন হলে পুরো কম্পোনেন্ট রি-রেন্ডার হয়। অন্যদিকে useRef একটি মিউটেবল অবজেক্ট প্রদান করে যার '.current' প্রপার্টি পরিবর্তন হলেও কম্পোনেন্ট রি-রেন্ডার হয় না। সরাসরি এইচটিএমএল ডম উপাদান ধরা বা রেন্ডারিং প্রভাবিত না করে মান ধরে রাখতে useRef ব্যবহৃত হয়।",
          e: "useState stores component state and triggers a re-render whenever the state value updates. In contrast, useRef persists a mutable value in its .current property across renders without triggering a re-render. We use useState for UI-driven data and useRef for direct DOM access or storing values like interval IDs.",
          code: "const inputRef = useRef<HTMLInputElement>(null);\nconst focusInput = () => inputRef.current?.focus();"
        },
        {
          lvl: "lvl2",
          q: "useEffect-এর ডিপেনডেন্সি অ্যারে (Dependency Array) কীভাবে কাজ করে এবং মেমোরি লিক রোধে ক্লিনআপ ফাংশন কীভাবে সাহায্য করে?",
          m: "useEffect-এ ৩ রকম ডিপেনডেন্সি দেওয়া যায়: (১) অ্যারে না দিলে প্রতি রেন্ডারে চলে, (২) ফাঁকা অ্যারে `[]` দিলে শুধু কম্পোনেন্ট মাউন্ট হওয়ার সময় একবার চলে, (৩) ভেরিয়েবল `[id, user]` দিলে ওই মানগুলো পরিবর্তন হলেই শুধু ইফেক্ট রান করে। যখন আমরা কোনো ইভেন্ট লিসেনার, সকেট কানেকশন বা টাইমার চালাই, কম্পোনেন্ট আনমাউন্ট হওয়ার সময় রিটার্ন ফাংশনের মাধ্যমে সেগুলো ক্লিনআপ না করলে ব্যাকগ্রাউন্ডে মেমোরি লিক হয়।",
          b: "ডিপেনডেন্সি অ্যারে রিঅ্যাক্টকে বলে দেয় কখন ইফেক্ট ফাংশনটি এক্সিকিউট করতে হবে। ফাঁকা থাকলে মাউন্টে একবার চলে, আর ভ্যারিয়েবল থাকলে তার মান পরিবর্তনের উপর নির্ভর করে চলে। ইফেক্ট ফাংশন থেকে একটি ক্লিনআপ ফাংশন রিটার্ন করা যায়, যা কম্পোনেন্ট আনমাউন্ট হওয়ার সময় বা পরবর্তী ইফেক্ট চলার আগে রান হয়ে টাইমার বা সকেট ডিসকানেক্ট করে মেমোরি লিক রোধ করে।",
          e: "The dependency array determines when the effect executes: without an array it runs on every render, with an empty array it runs once on mount, and with variables it re-runs when those values change. Returning a cleanup function allows us to unsubscribe from sockets, remove event listeners, or clear timers when the component unmounts, preventing memory leaks.",
          code: "useEffect(() => {\n  const timer = setInterval(() => tick(), 1000);\n  return () => clearInterval(timer); // Cleanup\n}, []);"
        },
        {
          lvl: "lvl2",
          q: "useMemo এবং useCallback-এর মধ্যে সুনির্দিষ্ট পার্থক্য কী? অপ্রয়োজনে এগুলো ব্যবহার করার ক্ষতিকর দিক কী?",
          m: "useMemo কোনো জটিল ক্যালকুলেশনের 'রেজাল্ট বা ভ্যালু' মেমোইজ করে রাখে, আর useCallback পুরো 'ফাংশন রেফারেন্স' মেমোইজ করে রাখে যাতে প্যারেন্ট রি-রেন্ডার হলেও চাইল্ড কম্পোনেন্টে নতুন ফাংশন পাস হয়ে অপ্রয়োজনীয় চাইল্ড রেন্ডার না হয়। ক্ষতিকর দিক হলো: ছোটখাটো ফাংশন বা সহজ হিসেবে মেমোইজেশন ব্যবহার করলে উল্টো অতিরিক্ত মেমোরি খরচ হয় এবং রিঅ্যাক্টের ইন্টারনাল ডিপেনডেন্সি চেকিংয়ের জন্য অ্যাপ স্লো হতে পারে।",
          b: "useMemo ফাংশন এক্সিকিউট করে প্রাপ্ত ফলাফল বা রিটার্ন ভ্যালু ক্যাশ করে, অন্যদিকে useCallback ফাংশনের রেফারেন্সকে ক্যাশ করে যাতে চাইল্ডে প্রপ হিসেবে ফাংশন যাওয়ার সময় রি-রেন্ডার এড়ানো যায়। প্রতিটি মেমোইজেশন মেমোরিতে স্পেস নেয় এবং ডিপেনডেন্সি তুলনা করতে সিপিইউ ব্যবহার করে, তাই ভারী কম্পুটেশন বা অপটিমাইজড চাইল্ড ছাড়া সাধারণ কাজে এটি ব্যবহারে উল্টো পারফরম্যান্স কমে।",
          e: "useMemo memoizes the returned result of an expensive calculation, whereas useCallback memoizes the function definition itself across renders. Premature or unnecessary usage can degrade performance because comparing dependencies and maintaining internal memo caches consumes memory and CPU cycles.",
          code: "const memoizedValue = useMemo(() => computeHeavyData(list), [list]);\nconst memoizedFn = useCallback((id: string) => handleItem(id), []);"
        },
        {
          lvl: "lvl3",
          q: "React 19-এর Actions এবং `useActionState`, `useOptimistic` কীভাবে ট্র্যাডিশনাল ফর্ম ও এপিআই সাবমিশনকে পরিবর্তন করেছে?",
          m: "আগে ফর্ম সাবমিট করার সময় আমাদের ম্যানুয়ালি `const [loading, setLoading] = useState(false)` এবং ট্রাই-ক্যাচ দিয়ে এরর স্টেট ম্যানেজ করতে হতো। React 19-এ আসিনক্রোনাস ফাংশনকে ট্রানজিশন বা অ্যাকশন হিসেবে পাস করা যায়। `useActionState` স্বয়ংক্রিয়ভাবে অ্যাকশনের পেন্ডিং স্টেট, রেসপন্স ডাটা ও এরর রিটার্ন করে। আর `useOptimistic` দিয়ে সার্ভার রেসপন্স আসার আগেই UI-তে ডেটা আপডেট দেখিয়ে দেওয়া যায় (যেমন লাইক বাটন বা কার্ট আইটেম), আর ফেইল করলে নিজে থেকেই রোলব্যাক করে।",
          b: "রিঅ্যাক্ট ১৯-এ ফর্ম ও সার্ভার মিউটেশনকে সহজ করতে অ্যাকশন ধারণা এসেছে। useActionState অ্যাসিনক্রোনাস অ্যাকশনের লোডিং স্টেট, ফর্ম স্টেট এবং এরর নিজে থেকেই পরিচালনা করে। useOptimistic হুকের মাধ্যমে নেটওয়ার্ক রিকোয়েস্ট চলাকালীন ব্যবহারকারীকে তৎক্ষণাৎ সফলতার প্রিভিউ দেখানো যায়, যা ইউজার এক্সপেরিয়েন্সকে অনেক বেশি রেসপনসিভ করে।",
          e: "React 19 Actions streamline asynchronous form mutations. useActionState automatically manages the pending state, errors, and returned payload of an async action without boilerplate useState calls. useOptimistic allows instant UI updates before the server responds, automatically rolling back if the network request fails.",
          tip: "NT Tech-এর টেক লিডরা নতুন React 19 ও Next.js 15+ এর আধুনিক ফিচারগুলো ইন্টারভিউতে খুব বেশি পছন্দ করে।"
        },
        {
          lvl: "situation",
          q: "একটি বড় টেবিল স্ক্রিনে ১০০০+ রো রেন্ডার হচ্ছে এবং টাইপ করার সময় সার্চ ইনপুট অত্যন্ত ল্যাগ করছে। তুমি কীভাবে এই সমস্যার সমাধান করবে?",
          m: "এখানে মূল সমস্যা দুটি: এক, সার্চ ইনপুটের প্রতি কিস্ট্রোকে ১০০০টি রো রি-রেন্ডার হচ্ছে; দুই, DOM-এ একসাথে এত নোড ব্রাউজার হ্যান্ডেল করতে পারছে না। সমাধান: (১) সার্চ ইনপুটে `useDeferredValue` অথবা `useTransition` ব্যবহার করব যাতে টাইপিং স্টেটকে সর্বোচ্চ প্রায়োরিটি দেওয়া হয় এবং লিস্ট ফিল্টারিং লো প্রায়োরিটিতে চলে। (২) পুরো ১০০০ রো DOM-এ না দিয়ে `@tanstack/react-virtual` দিয়ে Virtualization করব, যাতে শুধু স্ক্রিনে দৃশ্যমান ২০–২৫টি রো রেন্ডার হয়। (৩) টেবিল রো কম্পোনেন্টগুলোকে `React.memo` করব।",
          b: "এই পরিস্থিতি সমাধানের জন্য প্রথমে আমরা ভার্চুয়ালাইজেশন (react-virtualized বা tanstack virtual) ব্যবহার করব, যাতে স্ক্রিনে যে কয়েকটি রো দেখা যায় শুধু সেগুলোর ডম নোড তৈরি হয়। দ্বিতীয়ত, সার্চ ফিল্টারিংয়ের জন্য useTransition অথবা useDeferredValue ব্যবহার করব যাতে কিবোর্ড টাইপিং আটকে না গিয়ে মসৃণ থাকে। এছাড়া কিবোর্ড ইনপুটে ৩০০ মিলিসেকেন্ড ডিবউন্সিং দিতে পারি।",
          e: "I would tackle this with two key techniques: first, DOM virtualization using libraries like TanStack Virtual to only mount the visible rows in the viewport instead of 1000 DOM nodes. Second, use React 18/19's useTransition or useDeferredValue to prioritize user typing over the expensive list re-calculation, accompanied by debouncing on the search input.",
          code: "const [query, setQuery] = useState('');\nconst deferredQuery = useDeferredValue(query);\n// Filter list using deferredQuery"
        },
        {
          lvl: "realworld",
          q: "বাস্তবে Dokani POS সিস্টেমে তুমি বারকোড স্ক্যানিং এবং দ্রুত কার্ট আইটেম যোগ করার সময় React স্টেট কীভাবে অপটিমাইজ করেছিলে?",
          m: "Dokani-তে ক্যাশিয়ার প্রতি সেকেন্ডে ৩-৪টি বারকোড স্ক্যান করে। শুরুতে প্রতি স্ক্যানে পুরো কার্ট আইটেম অ্যারে ও টোটাল ক্যালকুলেশন রি-রেন্ডার হওয়ায় স্ক্রিন স্লো হতো। আমি: (১) কার্ট স্টেটকে ফ্ল্যাট অবজেক্টে রাখি `itemsById: { [id]: { qty, price } }` যাতে $O(1)$ টাইমে আপডেট হয়। (২) বারকোড লিসেনারকে একটি গ্লোবাল `useRef` বাফারে রাখি যাতে দ্রুত কিস্ট্রোক স্টেটকে ট্রিগার না করে পুরো এন্টার পড়লে একবার অ্যাকশন পাঠায়। (৩) কার্টের প্রতিটি আইটেম রোকে `React.memo` দিয়ে আলাদা করি যাতে শুধু স্ক্যান করা নির্দিষ্ট আইটেমের রো আপডেট হয়, পুরো ১০০ আইটেমের টেবিল নয়।",
          b: "দোকানি পিওএস সিস্টেমে দ্রুত বারকোড স্ক্যানার হ্যান্ডেল করার জন্য আমি কার্ট ম্যানেজমেন্টকে অপটিমাইজ করেছি। বারকোড ইনপুটের দ্রুত ক্যারেক্টারগুলো রিঅ্যাক্ট স্টেটে না রেখে রিফে জমা রাখা হয় এবং স্ক্যান শেষ হলে একবারে প্রসেস হয়। কার্টের ডাটা স্ট্রাকচার হিসেবে অ্যারের বদলে আইডি-ভিত্তিক হ্যাশম্যাপ ব্যবহার করা হয়েছে যাতে প্রতি আইটেম খোঁজা ও কোয়ান্টিটি যোগ করা O(1) সময় নেয় এবং মেমোইজড রো কম্পোনেন্ট দিয়ে অপ্রয়োজনীয় রি-রেন্ডার শূন্যে নামানো হয়েছে।",
          e: "In Dokani POS, barcode scanners emit rapid keyboard events. Storing individual keystrokes in state caused heavy input lag. I intercepted the barcode stream into a ref buffer, processing it only upon the 'Enter' key terminator. Furthermore, cart items were structured as key-value lookups for O(1) quantity increments, and each cart row was isolated using React.memo to ensure zero re-renders of existing items.",
          tip: "এই উত্তরে তুমি ডেটা স্ট্রাকচার (O(1) lookup) এবং React Performance উভয়ের গভীর জ্ঞান প্রমাণ করতে পারবে।"
        }
      ]
    },
    {
      id: "nextjs-app-router",
      name: "Next.js 15+ App Router & Architecture",
      desc: "Server vs Client Components, SSR, SSG, ISR, Hydration, Parallel Routes, Server Actions",
      items: [
        {
          lvl: "lvl1",
          q: "Next.js App Router-এ Server Components এবং Client Components-এর মূল পার্থক্য কী?",
          m: "Server Components (RSC) ডিফল্টভাবে কেবল সার্ভারেই এক্সিকিউট হয় এবং ব্রাউজারে শূন্য জাভাস্ক্রিপ্ট বান্ডেল পাঠায়। এরা সরাসরি ডাটাবেজ কুয়েরি করতে পারে এবং সিক্রেট কি এক্সেস করতে পারে, কিন্তু ব্রাউজারের `onClick`, `useState` বা উইন্ডো এপিআই ব্যবহার করতে পারে না। অন্যদিকে ক্লায়েন্ট সাইড ইন্টারঅ্যাক্টিভিটি, ইভেন্ট লিসেনার ও হুকের জন্য ফাইলের শুরুতে `'use client'` লিখে Client Component ঘোষণা করতে হয়।",
          b: "সার্ভার কম্পোনেন্ট শুধুমাত্র সার্ভারে চলে এবং ক্লায়েন্টকে এইচটিএমএল ও আরএসসি পেলোড পাঠায়, ফলে ক্লায়েন্টের জাভাস্ক্রিপ্ট বান্ডেল সাইজ অনেক কমে যায়। ক্লায়েন্ট কম্পোনেন্টে ইন্টারঅ্যাক্টিভ ফিচার যেমন বাটন ক্লিক, ফর্ম ইনপুট, ব্রাউজার হুক (useState, useEffect) থাকে এবং তা ফাইলের শীর্ষে 'use client' ডিক্লেয়ার করে তৈরি করতে হয়।",
          e: "Server Components execute solely on the server, producing zero JavaScript bundle on the client and allowing secure direct database access. Client Components, marked with the 'use client' directive, hydrate in the browser to provide interactivity, stateful hooks, and event listeners.",
          code: "// Server Component by default\nexport default async function Page() {\n  const data = await prisma.product.findMany();\n  return <ProductList data={data} />;\n}"
        },
        {
          lvl: "lvl2",
          q: "Next.js-এ SSR, SSG এবং ISR-এর মধ্যে পার্থক্য কী? প্রোডাকশনে কোনটি কখন বেছে নেবে?",
          m: "SSG (Static Site Generation) বিল্ড টাইমে একবার এইচটিএমএল বানিয়ে রাখে, যা ব্লগের মতো অপরিবর্তিত পেজে সর্বোচ্চ গতি দেয়। SSR (Server-Side Rendering) প্রতিটা ইউজারের রিকোয়েস্টে ডায়নামিক ডাটা ফেচ করে পেজ রেন্ডার করে (যেমন ইউজারের প্রাইভেট ড্যাশবোর্ড)। আর ISR (Incremental Static Regeneration) সবচেয়ে শক্তিশালী—এটি পেজকে স্ট্যাটিক ক্যাশ রাখে এবং `revalidate: 60` দিয়ে নির্দিষ্ট সময় পর পর ব্যাকগ্রাউন্ডে সাইট ডাউন না করে পেজকে অটো রি-জেনারেট করে (যেমন ই-কমার্সের প্রোডাক্ট পেজ)।",
          b: "এসএসজি বিল্ডের সময় স্ট্যাটিক এইচটিএমএল পেজ তৈরি করে সিডিএনে ক্যাশ করে। এসএসআর প্রতি রিকোয়েস্টে লাইভ ডাটা দিয়ে নতুন করে সার্ভার পেজ রেন্ডার করে। আইএসআর এই দুইটির সুবিধা একসাথে দেয়—পেজ স্ট্যাটিক থাকে কিন্তু নির্দিষ্ট সময় পর ব্যাকগ্রাউন্ডে স্বয়ংক্রিয়ভাবে ফ্রেশ ডাটা দিয়ে স্ট্যাটিক পেজটি আপডেট হয়ে যায় কোনো রি-বিল্ড ছাড়াই।",
          e: "SSG generates static HTML at build time for immutable pages. SSR renders HTML on-demand per request for personalized or private user data. ISR combines the best of both by serving cached static pages and regenerating them in the background at specified intervals (e.g., revalidate: 60) without full application rebuilds.",
          code: "// ISR in App Router\nexport const revalidate = 60;\n// or fetch with next revalidate\nconst res = await fetch(url, { next: { revalidate: 3600 } });"
        },
        {
          lvl: "lvl3",
          q: "Next.js-এ 'Hydration Error' কেন ঘটে এবং এটি কীভাবে সফলভাবে ডিবাগ ও প্রিভেন্ট করবে?",
          m: "Hydration Error তখন ঘটে যখন সার্ভার থেকে রেন্ডার হয়ে আসা প্রি-রেন্ডারড এইচটিএমএল এবং ক্লায়েন্ট ব্রাউজারে জাভাস্ক্রিপ্ট রান হওয়ার পর তৈরি হওয়া ভার্চুয়াল ডমের মধ্যে অমিল (Mismatch) থাকে। যেমন: সার্ভারে টাইমস্ট্যাম্প বা `localStorage` পাওয়া যায় না কিন্তু ক্লায়েন্টে পাওয়া যায়, অথবা ভুল এইচটিএমএল নেস্টিং (যেমন `<p>` এর ভেতর `<div>` বা `<table>` এর ভেতর সরাসরি `<tr>` দেওয়া)। প্রতিরোধ: ব্রাউজার-স্পেসিফিক কোডকে `useEffect`-এর ভেতরে বা মাউন্টেড ফ্ল্যাগে রাখা, অথবা `dynamic(() => import(...), { ssr: false })` ব্যবহার করা।",
          b: "হাইড্রেশন এরর ঘটে যখন সার্ভারে তৈরি হওয়া প্রাথমিক এইচটিএমএল এবং ক্লায়েন্ট ব্রাউজারের প্রথম রেন্ডার করা কাঠামোর মধ্যে পার্থক্য দেখা দেয়। ব্রাউজার স্পেসিফিক উইন্ডো অবজেক্ট, র্যান্ডম সংখ্যা বা সময় সরাসরি রেন্ডারে ব্যবহার করলে এই অমিল হয়। useEffect দিয়ে ব্রাউজারে মাউন্ট হওয়া নিশ্চিত করে বা dynamic import দিয়ে ssr বন্ধ করে এটি সমাধান করা যায়।",
          e: "Hydration mismatch errors occur when the server-rendered HTML markup differs from the initial client-rendered DOM tree. Common causes include client-only APIs (e.g., localStorage, navigator, window), inconsistent dates/random values, or invalid HTML nesting (like putting a block element inside a <p> tag). Solutions include using mounted state flags or dynamic imports with { ssr: false }.",
          code: "const [mounted, setMounted] = useState(false);\nuseEffect(() => setMounted(true), []);\nif (!mounted) return null;"
        },
        {
          lvl: "situation",
          q: "তোমার Next.js প্রজেক্টে একটি পেজের ফার্স্ট লোড অনেক স্লো কারণ সেখানে বড় আকারের রিচার্টস (Recharts) এবং পিডিএফ জেনারেটর রয়েছে। তুমি এটি কীভাবে অপটিমাইজ করবে?",
          m: "যেহেতু চার্ট লাইব্রেরি এবং পিডিএফ লাইব্রেরিগুলো সাইজে অনেক বড় (কয়েক মেগাবাইট) এবং ইনিশিয়াল ফার্স্ট পেইন্টে এগুলোর দরকার নেই, তাই আমি: (১) পুরো পেজকে সার্ভার কম্পোনেন্ট রাখব। (২) হেভি ক্লায়েন্ট কম্পোনেন্টগুলোকে `next/dynamic` দিয়ে কোড-স্প্লিট করব `const Chart = dynamic(() => import('@/components/HeavyChart'), { loading: () => <Skeleton />, ssr: false })`। (৩) পিডিএফ জেনারেশনকে ইউজারের ডাউনলোড বাটন ক্লিকে ডায়নামিক ইমপোর্টে নিয়ে যাব `const { jsPDF } = await import('jspdf')`। ফলে ইনিশিয়াল বান্ডেল সাইজ ৬০-৭০% কমে যাবে।",
          b: "হেভি লাইব্রেরি ইনিশিয়াল লোডিংকে ধীর করে দেয়। সমাধান হিসেবে আমরা নেক্সটজেএস ডায়নামিক ইমপোর্ট ব্যবহার করে কম্পোনেন্টগুলোকে আলাদা বান্ডেলে ভাগ করব এবং ফলব্যাক হিসেবে একটি স্কেলেটন দেখাব। পিডিএফ জেনারেশনের কোডটি পেজ লোডের সময় না এনে শুধুমাত্র ব্যবহারকারী যখন 'ডাউনলোড' বাটনে চাপ দেবেন তখন অন-ডিমান্ড ইমপোর্ট করে রান করাব।",
          e: "I optimize this by leveraging Next.js code splitting and dynamic imports. Heavy chart libraries are loaded on-demand using next/dynamic with { ssr: false } and a skeleton loader. Heavy utilities like jsPDF or XLSX are lazily imported directly inside their respective click event handlers, dramatically reducing the initial JavaScript payload.",
          code: "const AnalyticsChart = dynamic(() => import('./AnalyticsChart'), {\n  ssr: false,\n  loading: () => <ChartSkeleton />\n});"
        },
        {
          lvl: "realworld",
          q: "Lakdhanavi Power কর্পোরেট ওয়েবসাইটে Next.js 16 App Router দিয়ে কীভাবে গ্লোবাল এসইও এবং লাইভ প্রজেক্ট পেজ অপটিমাইজ করেছিলে?",
          m: "Lakdhanavi আন্তর্জাতিক পাওয়ার জেনারেশন কোম্পানি হওয়ায় তাদের প্রজেক্ট ও নিউজ পেজগুলোর আন্তর্জাতিক সার্চ র‍্যাঙ্কিং খুব গুরুত্বপূর্ণ ছিল। আমি: (১) প্রতিটি ডায়নামিক রুটে `generateMetadata` ফাংশন ব্যবহার করে ডাটাবেজ থেকে প্রজেক্টের সঠিক টাইটেল, ডেসক্রিপশন এবং ওপেন-গ্রাফ (OG) মেটা ইমেজ ইনজেক্ট করেছি। (২) গুগল রিচ স্নিপেটের জন্য `Schema.org` Organization ও Project structured data (JSON-LD) বসিয়েছি। (৩) প্রজেক্টের হেভি পাওয়ার প্ল্যান্ট ছবিগুলোর জন্য `next/image` দিয়ে WebP কনভার্সন এবং লেজি লোডিং করেছি। (৪) ডাইনামিক `sitemap.ts` এবং `robots.ts` জেনারেট করে দিয়েছিলাম।",
          b: "লাকধানাবি ওয়েবসাইটে আমরা নেক্সটজেএস অ্যাপ রাউটারের মাধ্যমে হাই-পারফরম্যান্স এসইও আর্কিটেকচার তৈরি করি। generateMetadata হুকের মাধ্যমে সার্ভার থেকে ডাটা এনে ডাইনামিক সোশ্যাল প্রিভিউ ও মেটা ট্যাগ বসানো হয়েছে। সার্চ ইঞ্জিনের জন্য JSON-LD স্ট্রাকচার্ড স্কিমা এবং ডাইনামিক সাইটম্যাপ তৈরি করা হয়েছে যা গুগল বটকে স্বয়ংক্রিয়ভাবে নতুন প্রজেক্ট ইন্ডেক্স করতে সাহায্য করে।",
          e: "For the Lakdhanavi Power project, I implemented dynamic SEO using Next.js generateMetadata to dynamically fetch project details and generate OpenGraph previews. I embedded JSON-LD structured data for Google rich snippets, utilized next/image for automated WebP conversion and responsive source sets, and implemented dynamic sitemap.ts routes for live indexing.",
          tip: "প্রোডাকশন এসইও-এর এই বাস্তব উদাহরণ ইন্টারভিউয়ারকে দেখাবে যে তুমি আর্কিটেকচার থেকে ব্যবসা—সব বোঝো।"
        }
      ]
    },
    {
      id: "typescript-core",
      name: "TypeScript & Type Safety",
      desc: "Strict Types, Interfaces vs Types, Generics, Discriminated Unions, Utility Types",
      items: [
        {
          lvl: "lvl1",
          q: "TypeScript-এ `interface` এবং `type` অ্যালিয়াসের মধ্যে মূল পার্থক্য কী এবং কখন কোনটি ব্যবহার করা উচিত?",
          m: "উভয়ই টাইপ ডিফাইন করতে পারে, তবে কিছু পার্থক্য আছে: (১) `interface` মূলত অবজেক্টের শেপ ডিফাইন করার জন্য সেরা এবং এতে Declaration Merging সাপোর্ট করে (অর্থাৎ একই নামের দুটি ইন্টারফেস নিজে থেকেই মার্জ হয়ে যায়)। (২) `type` অনেক বেশি ফ্লেক্সিবল—এতে Union (`type Status = 'PENDING' | 'DONE'`), Primitives, Tuples ডিফাইন করা যায় যা ইন্টারফেসে যায় না। অবজেক্ট ও কম্পোনেন্ট প্রপসের জন্য ইন্টারফেস এবং ইউনিয়ন বা জটিল টাইপ অপারেশনের জন্য টাইপ অ্যালিয়াস ব্যবহার করা স্ট্যান্ডার্ড।",
          b: "ইন্টারফেস এবং টাইপ উভয়ই অবজেক্টের গঠন নির্ধারণ করতে পারে। তবে ইন্টারফেসে একাধিকবার একই নাম দিয়ে ডিক্লেয়ার করলে তা নিজে থেকেই যুক্ত (merge) হয়ে যায় এবং ক্লাস ইমপ্লিমেন্টেশনে ভালো কাজ করে। অন্যদিকে টাইপ অ্যালিয়াস ইউনিয়ন টাইপ, প্রিমিটিভ বা টাপল ডিফাইন করতে পারে যা ইন্টারফেসে সম্ভব নয়। সাধারণ অবজেক্টের ক্ষেত্রে ইন্টারফেস এবং ইউনিয়ন লজিকের ক্ষেত্রে টাইপ ব্যবহার করা হয়।",
          e: "Interfaces are primarily used for defining object shapes and support declaration merging, making them ideal for public APIs and libraries. Type aliases are more versatile and can represent primitives, unions, intersections, and tuples. Conventionally, we use interfaces for component props/domain models and types for complex unions and functional primitives.",
          code: "interface User { id: string; name: string; }\ntype OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED';\ntype UserWithStatus = User & { status: OrderStatus };"
        },
        {
          lvl: "lvl2",
          q: "TypeScript-এ `any`, `unknown`, এবং `never` টাইপের মধ্যে পার্থক্য কী?",
          m: "`any` পুরো টাইপ চেকিং সিস্টেমকে অফ করে দেয়, ফলে এতে যেকোনো মেথড কল করলেও টিএস কোনো এরর ধরে না যা বাগ তৈরি করে। `unknown` হলো টাইপ-সেফ অল্টারনেটিভ; এতে যেকোনো ভ্যালু রাখা যায়, কিন্তু টাইপ ন্যারোয়িং (যেমন `typeof x === 'string'`) বা কাস্টিং ছাড়া কোনো প্রপার্টি কল করা যায় না। আর `never` নির্দেশ করে এমন কোনো স্টেট বা ভ্যালু যা কখনোই ঘটবে না—যেমন কোনো ফাংশন যা সবসময় এরর থ্রো করে বা ইনফিনিট লুপ চালায়, অথবা সুইচ কেসের এক্সহস্টিভ চেক।",
          b: "any টাইপ চেকিং বন্ধ করে দেয় এবং রানটাইম এররের ঝুঁকি বাড়ায়। unknown যেকোনো ভ্যালু গ্রহণ করে তবে টাইপ চেক বা ন্যারোয়িং ছাড়া এর উপর কোনো কাজ করতে দেয় না, তাই এটি অনেক নিরাপদ। never এমন একটি টাইপ যা কোনো ভ্যালু প্রকাশ করে না, যেমন যে ফাংশন কখনোই রিটার্ন করে না বা অসম্ভব কোনো লজিক্যাল ব্রাঞ্চ।",
          e: "'any' opts out of type checking completely, leading to potential runtime crashes. 'unknown' is the type-safe counterpart where any value can be assigned, but no properties can be accessed without explicit type narrowing. 'never' represents values that never occur, such as functions that throw errors or exhaustive switch-case guards.",
          code: "function processData(val: unknown) {\n  if (typeof val === 'string') console.log(val.toUpperCase());\n}"
        },
        {
          lvl: "lvl3",
          q: "TypeScript-এ 'Discriminated Unions' কী এবং জটিল বিজনেস লজিকে এটি কীভাবে সাহায্য করে?",
          m: "Discriminated Union হলো একাধিক টাইপের একটি ইউনিয়ন যেখানে প্রতিটি টাইপে একটি কমন 'লিটারেল প্রপার্টি' (ডিসক্রিমিনেটর ট্যাগ, যেমন `status` বা `type`) থাকে। এর মাধ্যমে আমরা যখন `switch(action.type)` বা `if(res.status === 'SUCCESS')` চেক করি, তখন টাইপস্ক্রিপ্ট স্বয়ংক্রিয়ভাবে বুঝতে পারে যে ওই ব্লকের ভেতর অন্য ফিল্ডগুলো কী কী থাকবে। ফলে কোনো রানটাইম এরর ছাড়াই সঠিক ডাটা এক্সেস করা যায়।",
          b: "ডিসক্রিমিনেটেড ইউনিয়ন হলো টাইপস্ক্রিপ্টের একটি শক্তিশালী ফিচার যেখানে প্রতিটি অবজেক্ট টাইপের মধ্যে একটি নির্দিষ্ট কমন প্রপার্টি থাকে। কোডে ওই কমন প্রপার্টি চেক করার সাথে সাথে টাইপস্ক্রিপ্ট কম্পাইলার নিজে থেকেই টাইপকে ন্যারো করে সঠিক অবজেক্ট কাঠামোর নিরাপত্তা নিশ্চিত করে।",
          e: "A Discriminated Union is a union of object types that share a common single-value property (the discriminator). TypeScript uses this discriminator inside conditionals or switch statements to narrow down the specific type, guaranteeing that access to variant-specific fields is 100% type-safe.",
          code: "type PaymentState =\n  | { status: 'SUCCESS'; transactionId: string }\n  | { status: 'FAILED'; errorCode: number };\n\nfunction handle(p: PaymentState) {\n  if (p.status === 'SUCCESS') console.log(p.transactionId);\n}"
        },
        {
          lvl: "situation",
          q: "তুমি ব্যাকএন্ড থেকে আসা একটি ডায়নামিক এপিআই রেসপন্স হ্যান্ডেল করছ যার শেপ সবসময় এক থাকে না। তুমি কি `any` ব্যবহার করবে নাকি অন্য কোনো প্যাটার্ন অনুসরণ করবে?",
          m: "আমি কখনোই প্রোডাকশন কোডে `any` ব্যবহার করব না। এর বদলে আমি দুটি সেরা প্যাটার্ন ব্যবহার করি: (১) টাইপস্ক্রিপ্ট লেভেলে `unknown` গ্রহণ করে `zod` স্কিমা দিয়ে রানটাইমে ডাটা ভ্যালিডেট করব `const validated = userSchema.parse(response)`। যদি ডাটা ভ্যালিড হয়, Zod নিজে থেকেই ইনফার করে টাইপ-সেফ অবজেক্ট দেবে। (২) অথবা কাস্টম টাইপ গার্ড ফাংশন লিখব `function isApiResponse(data: unknown): data is ApiResponse`। এতে এপিআইতে কোনো মিসিং ফিল্ড থাকলে ব্রাউজার ক্র্যাশ করবে না।",
          b: "ডায়নামিক রেসপন্সে any পরিহার করে unknown টাইপ ব্যবহার করা উচিত। এরপর Zod বা টাইপ গার্ড ফাংশন দিয়ে রানটাইমে নিশ্চিত করা হয় যে ডাটাটি নির্দিষ্ট কাঠামোর সাথে মিলে কিনা। ডাটা সঠিক হলে টাইপস্ক্রিপ্ট স্বয়ংক্রিয়ভাবে তাকে টাইপ-সেফ অবজেক্ট হিসেবে বিবেচনা করে।",
          e: "I avoid 'any' in production. Instead, I type the API payload as 'unknown' and parse it with a runtime validation library like Zod. This validates the actual payload at the boundary and automatically infers a safe TypeScript type, preventing runtime runtime crashes if the backend contract changes unexpectedly.",
          code: "import { z } from 'zod';\nconst UserSchema = z.object({ id: z.string(), email: z.string().email() });\ntype User = z.infer<typeof UserSchema>;\nconst user = UserSchema.parse(apiResponse);"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এর মাল্টি-মেথড পেমেন্ট স্প্লিট এবং ইনভয়েস জেনারেশনে কীভাবে TypeScript Generics এবং Strict Types ডাটা ভুল হওয়া রোধ করেছিল?",
          m: "Dokani-তে একজন কাস্টমার একটি বিল ক্যাশ, বিকাশ এবং বাকি (Due)—এই তিনভাবে ভাগ করে দিতে পারে। আমি `PaymentRecord<TMethod extends PaymentMethod>` জেনেরিক তৈরি করেছিলাম। যখন মেথড `'BKASH'` হতো, টাইপস্ক্রিপ্ট কড়াভাবে বাধ্য করত যে `{ senderNumber, trxId }` দিতেই হবে; আর মেথড যখন `'CASH'` হতো, তখন শুধু `{ tenderAmount, changeAmount }` লাগত। ফলে কোনো ডেভেলপার ক্যাশ পেমেন্টে ভুল করে TrxID ছাড়া বা বিকাশে TrxID ছাড়া বিল সেভ করতে পারত না—কম্পাইলারেই ভুল ধরা পড়ে যেত।",
          b: "দোকানি সিস্টেমে আমরা জেনেরিক ও ডিসক্রিমিনেটেড ইউনিয়ন টাইপ ব্যবহার করে পেমেন্ট মেথড তৈরি করেছিলাম। বিকাশ বা কার্ড সিলেক্ট করলে ট্রানজেকশন আইডি ফিল্ড বাধ্যতামূলক হতো এবং ক্যাশ সিলেক্ট করলে টেন্ডার অ্যামাউন্ট লাগত। এতে কোনো ক্যাশিয়ার বা এপিআই কলের মাধ্যমে ভুল বা অসম্পূর্ণ পেমেন্ট ডাটা ডাটাবেসে যাওয়ার সুযোগ থাকত না।",
          e: "In Dokani POS, I modeled split payments using Generic discriminated types. If the method was 'BKASH' or 'CARD', TypeScript enforced specific fields like transactionId and terminalId, while for 'CASH' it enforced receivedAmount and changeReturned. This strict compile-time typing eliminated invalid payment entries from reaching the database.",
          tip: "এই উদাহরণটি প্রমাণ করে যে টাইপস্ক্রিপ্ট শুধু টাইপ লেখার জন্য নয়, এটি বিজনেস লজিকের ভুল ও জালিয়াতি রোধের একটি প্রাচীর।"
        }
      ]
    },
    {
      id: "state-context",
      name: "State Management & Context API",
      desc: "Zustand, Redux Toolkit, Context API, Immutability, Prop Drilling Prevention",
      items: [
        {
          lvl: "lvl1",
          q: "Context API কখন ব্যবহার করা উচিত এবং এর সাথে Redux বা Zustand-এর মূল পার্থক্য কী?",
          m: "Context API মূলত লো-ফ্রিকোয়েন্সি ডাটার জন্য সেরা—যেমন অ্যাপের থিম (Dark/Light), লগইন করা ইউজারের ভাষা বা গ্লোবাল অথ স্টেট। কিন্তু হাই-ফ্রিকোয়েন্সি ডাটা (যেমন: শপিং কার্ট, লাইভ স্টক কাউন্টার, টাইমার)-তে Context API ব্যবহার করলে কনটেক্সটের যেকোনো একটি ভ্যালু পরিবর্তনেই তার ভেতরের সব সাবস্ক্রাইব করা কম্পোনেন্ট রি-রেন্ডার হয়। অন্যদিকে Zustand বা Redux Toolkit স্টোরের নির্দিষ্ট ভ্যালুকে 'Selector' দিয়ে সাবস্ক্রাইব করায়, ফলে শুধু সেই কম্পোনেন্টটি রি-রেন্ডার হয় এবং অ্যাপ অনেক দ্রুত কাজ করে।",
          b: "কনটেক্সট এপিআই তৈরি করা হয়েছে প্রপ ড্রিলিং সমাধান এবং তুলনামূলক কম পরিবর্তনশীল গ্লোবাল ডাটা (যেমন থিম বা ইউজার প্রোফাইল) শেয়ার করার জন্য। এটি স্টেটের প্রতিটি আপডেটে কনজিউমারদের রি-রেন্ডার করায়। তবে দ্রুত পরিবর্তনশীল জটিল ডাটার জন্য জুস্ট্যান্ড বা রিডাক্স উপযুক্ত, কারণ তারা সিলেক্টরের মাধ্যমে শুধু প্রয়োজনীয় অংশটুকু আপডেট করে।",
          e: "Context API is designed to solve prop drilling for low-frequency updates like themes, localization, or current user sessions. Any context value update re-renders all consumers. For high-frequency state updates like shopping carts or trading feeds, specialized state managers like Zustand or Redux Toolkit are superior because they use fine-grained selectors to re-render only the affected components.",
          code: "const cartCount = useCartStore((state) => state.items.length); // Zustand selector"
        },
        {
          lvl: "lvl2",
          q: "React-এ Immutability (অপরিবর্তনীয়তা) কেন এত জরুরি? অবজেক্ট বা অ্যারে স্টেট সরাসরি মিউটেট করলে কী সমস্যা হয়?",
          m: "React স্টেট পরিবর্তন হয়েছে কিনা তা বোঝার জন্য 'Shallow Equality' (মেমোরি রেফারেন্স তুলনা) করে। যদি আমরা সরাসরি `state.user.name = 'Karim'` বা `array.push(item)` করি, অবজেক্টের ইন্টারনাল ভ্যালু বদলালেও মেমোরিতে রেফারেন্স একই থাকে। ফলে React ধরে নেয় কোনো পরিবর্তন হয়নি এবং কম্পোনেন্ট রি-রেন্ডার করে না। তাই সবসময় স্প্রেড অপারেটর `[...array, newItem]` বা `{ ...state, name: 'Karim' }` দিয়ে নতুন রেফারেন্স তৈরি করতে হয়।",
          b: "রিঅ্যাক্ট মেমোরি রেফারেন্স চেক করে বুঝতে পারে স্টেট বদলেছে কিনা। সরাসরি অবজেক্টের মান পরিবর্তন করলে রেফারেন্স একই থেকে যায়, ফলে রিঅ্যাক্ট রি-রেন্ডার ট্রিগার করে না এবং ইউআইতে নতুন ডাটা দেখা যায় না। ইমিউটেবিলিটি বজায় রাখলে টাইম-ট্রাভেল ডিবাগিং সহজ হয় এবং অপ্রত্যাশিত সাইড-ইফেক্ট এড়ানো যায়।",
          e: "React relies on shallow reference equality checks to determine if state has changed. Mutating state objects directly (e.g., array.push or object.property = value) preserves the same memory address, causing React to skip re-rendering. Producing immutable copies with spread syntax or libraries like Immer ensures new references that correctly trigger UI updates.",
          code: "// Wrong: state.push(newItem)\n// Correct:\nsetItems((prev) => [...prev, newItem]);"
        },
        {
          lvl: "lvl3",
          q: "Redux Toolkit-এ RTK Query ব্যবহারের মূল সুবিধা কী এবং এটি সাধারণ Redux Async Thunk থেকে কীভাবে আলাদা?",
          m: "আগে Redux Thunk দিয়ে এপিআই কল করার সময় আমাদের ম্যানুয়ালি `loading`, `data`, `error` ম্যানেজ করতে হতো, প্রতিটি রিকোয়েস্টের জন্য অ্যাকশন ক্রিয়েট করতে হতো এবং কোনো অটো-ক্যাশিং থাকত না। RTK Query একটি পাওয়ারফুল ডাটা ফেচিং ও ক্যাশিং ইঞ্জিন। এর মাধ্যমে: (১) অটোমেটিক রিকোয়েস্ট ডিডুপ্লিকেটিং এবং ক্যাশিং হয়, (২) `providesTags` এবং `invalidatesTags` দিয়ে মিউটেশনের সাথে সাথে স্বয়ংক্রিয়ভাবে ক্যাশ রিফেচ হয়ে যায়, (৩) পোbackend ডাটা হ্যান্ডেল করার জন্য ৮০% কম বয়লারপ্লেট কোড লাগে।",
          b: "আরটিকে কুয়েরি রিডাক্সের আধুনিক ডাটা ফেচিং সমাধান। এটি নিজে থেকেই এপিআই রেসপন্স ক্যাশ করে, একই সাথে একাধিক একই রিকোয়েস্ট যাওয়া রোধ করে এবং মিউটেশন সম্পন্ন হলে ট্যাগ ইনভ্যালিডেশনের মাধ্যমে সংশ্লিষ্ট ডেটা স্বয়ংক্রিয়ভাবে রি-ফেচ করে। ফলে থাঙ্কের মতো দীর্ঘ কোড লিখতে হয় না।",
          e: "RTK Query eliminates boilerplates associated with async thunks by automating data fetching, deduplication, and caching. It manages loading/error states out-of-the-box and features automated cache invalidation using tags (providesTags / invalidatesTags) so mutated resources refresh seamlessly.",
          code: "const { data, isLoading } = useGetProductsQuery({ shopId });\nconst [createSale] = useCreateSaleMutation();"
        },
        {
          lvl: "situation",
          q: "তোমার অ্যাপে একটি মাল্টি-স্টেপ জটিল ফর্ম আছে (Customer Info ➔ Cart ➔ Shipping ➔ Payment)। ব্যবহারকারী রিফ্রেশ দিলে ডাটা মুছে যাওয়ার ঝুঁকি থাকে। তুমি এই স্টেট আর্কিটেকচার কীভাবে ডিজাইন করবে?",
          m: "আমি এই স্টেট আর্কিটেকচারটি এভাবে সাজাব: (১) পুরো ফর্ম স্টেট পরিচালনার জন্য **Zustand** ব্যবহার করব যাতে কোনো প্রপ ড্রিলিং না থাকে। (২) Zustand-এর `persist` মিডলওয়্যার ব্যবহার করে স্টেটকে ব্রাউজারের `sessionStorage` (বা `localStorage`)-এ অটো-সিঙ্ক করে রাখব, যাতে পেজ রিলোড দিলেও ইউজার যে স্টেপে ছিল ঠিক সেখান থেকেই শুরু করতে পারে। (৩) পেমেন্ট সফলভাবে সাবমিট হয়ে গেলে স্টোরের `reset()` মেথড কল করে ক্যাশ পরিষ্কার করে দেব। (৪) প্রতিটি স্টেপের ইনপুটে `Zod` ভ্যালিডেশন রাখব যাতে কোনো অবৈধ ডাটা পরবর্তী স্টেপে পাস না হয়।",
          b: "মাল্টি-স্টেপ ফর্মের জন্য আমরা জুস্ট্যান্ড ব্যবহার করব এবং তার পারসিস্ট মিডলওয়্যার দিয়ে সেশনস্টোরেজে ব্যাকআপ রাখব। এর ফলে ব্যবহারকারী পেজ রিফ্রেশ দিলেও তার টাইপ করা কোনো তথ্য হারাবে না। শেষ ধাপে সাবমিশন সম্পন্ন হলে স্টোর ক্লিয়ার হবে এবং প্রতিটি ধাপে পৃথক ভ্যালিডেশন থাকবে।",
          e: "I design this using a Zustand store enhanced with the 'persist' middleware hooked into sessionStorage. This keeps form state decoupled from component lifecycles, persists progress across accidental page refreshes, and resets cleanly upon successful final checkout, all while validating each step with Zod schemas.",
          code: "export const useCheckoutStore = create(\n  persist((set) => ({\n    step: 1,\n    formData: {},\n    setStep: (s) => set({ step: s }),\n    reset: () => set({ step: 1, formData: {} })\n  }), { name: 'checkout-storage', storage: createJSONStorage(() => sessionStorage) })\n);"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এ লগআউট করার সময় এবং একজন দোকানদার থেকে অন্য দোকানদারে সুইচ করার সময় তুমি ক্যাশ ও স্টেট সুরক্ষার জন্য কী করেছিলে?",
          m: "এটি একটি মারাত্মক সিকিউরিটি ও ডাটা কনসিসটেন্সি সমস্যা—যদি আগের দোকানদারের কার্ট ডাটা বা কাস্টমার ক্যাশ মেমোরিতে থেকে যায়, তবে অন্য দোকানদার তা দেখতে পাবে (Data Leakage)। আমি: (১) ব্যবহারকারী লগআউট করার সাথে সাথে TanStack Query-র `queryClient.clear()` কল করে সমস্ত ইন-মেমোরি সার্ভার ক্যাশ এক ক্লিকে মুছে ফেলতাম। (২) Zustand স্টোরের সমস্ত গ্লোবাল স্টেটকে ইনিশিয়াল স্টেটে রি-সেট করতাম। (৩) `localStorage`-এর টোকেন মুছে দিয়ে `httpOnly` রিফ্রেশ কুকি ইনভ্যালিডেট করতাম এবং জোরপূর্বক সম্পূর্ণ পেজ রিলোড দিয়ে নতুন লগইন স্ক্রিনে পাঠাতাম।",
          b: "দোকানি মাল্টি-টেন্যান্ট পিওএস সিস্টেমে লগআউট করার সাথে সাথে আমরা কুয়েরি ক্লায়েন্টের সমস্ত ক্যাশ ডেটা মুছে ফেলি (queryClient.clear)। জুস্ট্যান্ডের সমস্ত স্টোর ক্লিয়ার করা হয় এবং রিফ্রেশ টোকেন ইনভ্যালিডেট করে উইন্ডো লোকেশন দিয়ে নতুন লগইন পেজে রিডাইরেক্ট করা হয় যাতে মেমোরিতে আগের দোকানের কোনো তথ্য বা কাস্টমার লিস্ট অবশিষ্ট না থাকে।",
          e: "In multi-tenant Dokani POS, switching accounts or logging out required strict client-side data purging to prevent cross-tenant data leaks. Upon logout, I immediately executed queryClient.clear() to purge all TanStack cached endpoints, invoked Zustand store reset handlers, purged local authentication keys, and forced a clean window redirect to reload fresh client memory.",
          tip: "এই প্রোডাকশন কেস স্টাডি ইন্টারভিউয়ারদের বোঝাবে যে তুমি মাল্টি-টেন্যান্ট সিকিউরিটির গভীরতম দিকগুলো জানো।"
        }
      ]
    },
    {
      id: "tailwind-responsive",
      name: "Tailwind CSS & Responsive UI",
      desc: "Tailwind CSS, HTML5 Semantics, CSS3 Flexbox/Grid, Responsive Design, Dark Mode",
      items: [
        {
          lvl: "lvl1",
          q: "Flexbox এবং CSS Grid-এর মধ্যে মূল পার্থক্য কী? কখন কোনটি ব্যবহার করা উচিত?",
          m: "Flexbox হলো এক-মাত্রিক (1-Dimensional)—এটি হয় রো (Row) অথবা কলাম (Column) বরাবর উপাদান সাজানোর জন্য সেরা (যেমন: ন্যাভবার, বাটন গ্রুপ, কার্ডের ভেতরের টেক্সট ও আইকন অ্যালাইনমেন্ট)। অন্যদিকে CSS Grid হলো দ্বি-মাত্রিক (2-Dimensional)—এটি একই সাথে রো এবং কলাম উভয় ডিরেকশনে লেআউট তৈরি করার জন্য তৈরি (যেমন: ড্যাশবোর্ডের গ্রিড লেআউট, প্রোডাক্ট গ্যালারি, ফটো গ্রিড)।",
          b: "ফ্লেক্সবক্স মূলত একটি নির্দিষ্ট লাইনে (হয় অনুভূমিক অথবা উলম্ব) উপাদান সাজাতে কাজ করে। এটি কম্পোনেন্ট লেভেলের ছোটখাটো অ্যালাইনমেন্টের জন্য সেরা। অন্যদিকে সিএসএস গ্রিড একই সাথে রো এবং কলাম দুটিই নিয়ন্ত্রণ করে, তাই পুরো পেজের ড্যাশবোর্ড বা বড় জটিল লেআউটের জন্য গ্রিড ব্যবহার করা হয়।",
          e: "Flexbox is 1-dimensional, aligning items along a single axis (either row or column), making it ideal for micro-layouts like navigation bars, button clusters, and card headers. CSS Grid is 2-dimensional, controlling rows and columns simultaneously, making it ideal for holistic page structures, dashboard cards, and product matrices.",
          code: "/* Flex: 1D */ .nav { display: flex; justify-content: space-between; }\n/* Grid: 2D */ .dashboard { display: grid; grid-template-columns: repeat(12, 1fr); }"
        },
        {
          lvl: "lvl2",
          q: "Tailwind CSS-এ 'Arbitrary Values' এবং `@apply` ডিরেক্টিভ ব্যবহারের ক্ষেত্রে কী কী সতর্কতা বজায় রাখা উচিত?",
          m: "Arbitrary Values যেমন `w-[347px]` বা `bg-[#123456]` ফ্লেক্সিবিলিটি দেয়, কিন্তু অতিরিক্ত ব্যবহার করলে সাইটের ডিজাইন সিস্টেমের ধারাবাহিকতা নষ্ট হয় এবং কোড নোংরা দেখায়। আর `@apply` দিয়ে ট্র্যাডিশনাল CSS ক্লাসের মতো কোড লিখলে টেইলউইন্ডের মূল সুবিধা (লো বান্ডেল সাইজ ও ইউটিলিটি-ফার্স্ট স্পিড) ব্যাহত হয়। সতর্কতা: ডিজাইন টোকেনগুলো `tailwind.config.js`-এ রেজিস্টার করে ইউটিলিটি ক্লাস ব্যবহার করা এবং `@apply` পরিহার করে রিঅ্যাক্ট কম্পোনেন্টে স্টাইল আইসোলেট করা বেস্ট প্র্যাকটিস।",
          b: "টেইলউইন্ডে ইচ্ছেমতো ব্র্যাকেট দিয়ে মান বসালে ডিজাইন সিস্টেমের সামঞ্জস্য নষ্ট হয়, তাই কনফিগ ফাইলে কালার ও স্পেসিং ডিফাইন করা উচিত। @apply অতিরিক্ত ব্যবহার করলে সিএসএস ফাইল বড় হয়ে যায় এবং ক্লাসের উপযোগিতা কমে যায়, এর বদলে রিইউজেবল রিঅ্যাক্ট কম্পোনেন্ট তৈরি করাই সঠিক পথ।",
          e: "Arbitrary values (e.g., h-[123px]) violate design token consistency when overused; custom values should instead reside in the Tailwind theme configuration. Overusing @apply negates the utility-first philosophy and bloats CSS stylesheets; encapsulating utility classes within reusable React components is the recommended pattern.",
          tip: "টেইলউইন্ড কনফিগারেশনে থিম ভেরিয়েবল সেট করে কথা বললে ইন্টারভিউয়াররা খুব খুশি হয়।"
        },
        {
          lvl: "lvl3",
          q: "মোবাইলে iOS Safari এবং Android ব্রাউজারে `100vh` এবং বটম হোম ইন্ডিকেটর (Safe Area Insets) সমস্যা কীভাবে সমাধান করবে?",
          m: "মোবাইলে `100vh` দিলে সাফারি বা ক্রোম ব্রাউজারের অ্যাড্রেস বার ও বটম নেভিগেশন বার নিচে কন্টেন্ট ঢেকে ফেলে বা অপ্রয়োজনীয় স্ক্রোলবার আনে। সমাধান: (১) আধুনিক সিএসএস ইউনিট `100dvh` (Dynamic Viewport Height) বা `100svh` ব্যবহার করব। (২) আইফোনের নচ এবং বটম সুইপ বারের জন্য `viewport-fit=cover` মেটা ট্যাগ দেব এবং সিএসএসে `padding-bottom: calc(16px + env(safe-area-inset-bottom))` ব্যবহার করব।",
          b: "মোবাইল ব্রাউজারের ইউআরএল বার ও টুলবারের কারণে সাধারণ 100vh পেজের কিছুটা অংশ স্ক্রিনের নিচে লুকিয়ে ফেলে। আধুনিক সিএসএসে এর স্থায়ী সমাধান হলো 100dvh ব্যবহার করা যা ব্রাউজার বারের পরিবর্তনের সাথে ডায়নামিকভাবে সাইজ এডজাস্ট করে। এছাড়া নচ ও হোম বারের জন্য env(safe-area-inset-bottom) প্যাডিং দেওয়া হয়।",
          e: "Traditional 100vh does not account for mobile browser URL bars and toolbars expanding/collapsing. The modern fix is using '100dvh' (dynamic viewport height) or '100svh'. For notch and gesture bar handling, enable 'viewport-fit=cover' in the meta tag and apply 'env(safe-area-inset-bottom)' in your CSS padding.",
          code: "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1, viewport-fit=cover\">\n/* CSS */\n.bottom-bar { padding-bottom: env(safe-area-inset-bottom); height: 100dvh; }"
        },
        {
          lvl: "situation",
          q: "তোমার ড্যাশবোর্ডে ডেটা টেবিল ডেস্কটপে অনেক কলাম নিয়ে সুন্দর দেখাচ্ছে, কিন্তু মোবাইল ডিভাইসে টেবিলটি ভেঙে হরিজন্টাল স্ক্রোল ছাড়া দেখা যাচ্ছে না। তুমি এটি কীভাবে রেসপন্সিভ করবে?",
          m: "মোবাইলে বড় টেবিল দেখানোর সেরা তিনটি স্ট্র্যাটেজি: (১) **কার্ড ভিউ কনভার্সন (Card Transformation):** মোবাইল ভিউতে `@media (max-width: 640px)` এ টেবিল রো-গুলোকে `display: flex; flex-direction: column` করে সুন্দর কার্ডের মতো রূপান্তর করব, যেখানে প্রতিটি ডাটা সেল লেবেল সহ আলাদা রো-তে থাকবে। (২) **কলাম প্রায়োরিটাইজেশন:** কম প্রয়োজনীয় কলামগুলো (যেমন: ক্রিয়েট ডেট, নোটস) মোবাইলে `hidden md:table-cell` দিয়ে হাইড করে দেব। (৩) গুরুত্বপূর্ণ অ্যাকশন বাটন এবং স্ট্যাটাস ব্যাজ উপরে রাখব যাতে ইউজারকে ডানে স্ক্রোল করতে না হয়।",
          b: "মোবাইলে টেবিল ভেঙে যাওয়া রোধে আমরা স্ক্রিন সাইজ ছোট হলে টেবিল ভিউ বাদ দিয়ে কার্ড ভিউ তৈরি করি। এছাড়া কম গুরুত্বপূর্ণ কলামগুলো সিএসএস ক্লাস দিয়ে মোবাইলে লুকিয়ে রাখা যায় এবং রোতে ক্লিক করলে বিস্তারিত দেখার একর্ডিয়ন ড্রয়ার ওপেন করার ব্যবস্থা করা যায়।",
          e: "To handle data tables on mobile without clunky horizontal scrollbars, I transform tabular rows into stacked card layouts using Tailwind's responsive utilities. I conditionally hide non-essential columns on mobile with 'hidden md:table-cell' and display critical data (like status, total amount, and action buttons) inside touch-friendly cards.",
          code: "<td className=\"hidden md:table-cell\">{createdAt}</td>\n<td className=\"font-bold text-accent\">৳{amount}</td>"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এ থার্মাল প্রিন্টার (POS 58mm / 80mm Receipt) থেকে প্রিন্ট বের করার জন্য তুমি কীভাবে CSS প্রিন্ট মিডিয়া কোয়েরি হ্যান্ডেল করেছিলে?",
          m: "Dokani-তে দোকানে ক্যাশ মেমো প্রিন্ট করার সময় সাধারণ সাইটের হেডার, ফুটার, সাইডবার ও কালার ব্যাকগ্রাউন্ড প্রিন্টারে আসা চলবে না এবং পেজ সাইজ ফিক্সড হতে হবে। আমি: (১) `@media print` ডিক্লেয়ার করে `.sidebar, .topbar, .btn { display: none !important; }` করেছি। (২) `@page { size: 80mm auto; margin: 0; }` দিয়ে ৫৬মিমি বা ৮০মিমি থার্মাল কাগজের প্রস্থ ফিক্সড করেছি। (৩) সমস্ত ফন্ট সাইজ পিক্সেল থেকে `pt`-তে নিয়ে গেছি এবং কালার পিওর ব্ল্যাক `#000` করেছি যাতে থার্মাল হেডে টেক্সট সম্পূর্ণ ক্রিস্প ও স্পষ্ট প্রিন্ট হয়।",
          b: "দোকানি সিস্টেমে ক্যাশ মেমো নিখুঁতভাবে প্রিন্ট করার জন্য আমরা @media print সিএসএস রুলস ব্যবহার করেছি। পেজের অপ্রয়োজনীয় নেভিগেশন বার লুকিয়ে শুধু মেমোর অংশটি ৮০মিমি সাইজের থার্মাল পেজে ফিট করা হয় এবং কালার মোড ব্ল্যাক অ্যান্ড হোয়াইট করে দেওয়া হয় যাতে থার্মাল রিবনে বারকোড ও লেখা স্পষ্ট আসে।",
          e: "For Dokani thermal printing (58mm/80mm receipts), I implemented targeted @media print rules. I suppressed all application shells (sidebar, headers, buttons) with display: none, defined @page { size: 80mm auto; margin: 0; }, forced text colors to high-contrast pure black, and scaled typography in points (pt) to ensure barcodes and receipts print razor-sharp.",
          code: "@media print {\n  body { background: #fff; color: #000; }\n  .no-print, .sidebar, .topbar { display: none !important; }\n  .receipt-wrapper { width: 80mm; padding: 4mm; font-size: 9pt; }\n}"
        }
      ]
    },
    {
      id: "js-es6-web",
      name: "JavaScript (ES6+) & Web Core",
      desc: "Event Loop, Closures, Promises & Async/Await, Prototypes, Semantic HTML5, Web APIs",
      items: [
        {
          lvl: "lvl1",
          q: "JavaScript-এ Closure কী এবং প্র্যাকটিক্যাল কোডে এটি কেন ব্যবহার করা হয়?",
          m: "Closure হলো এমন একটি ফিচার যেখানে একটি ইনার ফাংশন তার আউটার বা প্যারেন্ট ফাংশনের স্কোপের ভেরিয়েবলগুলোকে এক্সেস করতে পারে, এমনকি প্যারেন্ট ফাংশন রিটার্ন হয়ে এক্সিকিউশন শেষ হয়ে যাওয়ার পরেও। প্র্যাকটিক্যাল কোডে এটি ডাটা প্রাইভেসি (Data Encapsulation), ফাংশন ফ্যাক্টরি, কিউরেটেড মেমোইজেশন বা ডিবউন্স-থ্রটল ফাংশন তৈরিতে ব্যবহৃত হয়।",
          b: "ক্লোজার হলো জাভাস্ক্রিপ্টের এমন একটি মেকানিজম যার মাধ্যমে একটি চাইল্ড ফাংশন তার প্যারেন্ট ফাংশনের ভ্যারিয়েবলগুলোকে মেমোরিতে ধরে রাখতে পারে, প্যারেন্ট ফাংশনটি রান হওয়া শেষ হয়ে গেলেও। ডেটা প্রাইভেট রাখতে এবং ফাংশনাল প্রোগ্রামিংয়ে স্টেট ধরে রাখতে এটি অত্যাবশ্যক।",
          e: "A closure is the combination of a function bundled together with references to its surrounding lexical environment. It allows an inner function to access an outer function's scope even after the outer function has closed and executed. We use closures for data privacy, state preservation, function currying, and utility functions like debounce.",
          code: "function createCounter() {\n  let count = 0; // Private variable\n  return { increment: () => ++count, get: () => count };\n}\nconst counter = createCounter();"
        },
        {
          lvl: "lvl2",
          q: "Event Loop-এ Microtask Queue এবং Macrotask (Callback) Queue-এর অগ্রাধিকার কীভাবে কাজ করে?",
          m: "JavaScript সিঙ্গেল থ্রেডেড। ইভেন্ট লুপে কল স্ট্যাক খালি হলে প্রথমে Microtask Queue এক্সিকিউট হয়। মাইক্রোটাস্কের মধ্যে পড়ে Promise.then/catch/finally, queueMicrotask(), এবং MutationObserver। মাইক্রোটাস্ক কিউ সম্পূর্ণ খালি না হওয়া পর্যন্ত কোনো Macrotask (setTimeout, setInterval, I/O ইভেন্টস) রান হতে পারে না। তাই একই সময়ে কল হওয়া Promise সবসময় setTimeout(..., 0)-এর আগে রান করে।",
          b: "ইভেন্ট লুপে কল স্ট্যাক খালি হওয়ার সাথে সাথে ব্রাউজার প্রথমে মাইক্রোটাস্ক কিউ এর সমস্ত প্রমিজ কলব্যাক এক্সিকিউট করে। সব মাইক্রোটাস্ক শেষ হলে তারপর ম্যাক্রোটাস্ক কিউ থেকে সেট-টাইমআউট বা সেট-ইন্টারভাল এক্সিকিউট হয়। ফলে setTimeout(..., 0) এর চেয়ে Promise.resolve() আগে রান করে।",
          e: "The Microtask queue takes strict precedence over the Macrotask (callback) queue. Once the call stack empties, the event loop drains all microtasks (Promises, MutationObserver, queueMicrotask) before picking up a single macrotask (setTimeout, setInterval, requestAnimationFrame). Thus, Promise callbacks always fire before zero-millisecond setTimeouts.",
          code: "console.log('1');\nsetTimeout(() => console.log('2 (Macro)'), 0);\nPromise.resolve().then(() => console.log('3 (Micro)'));\nconsole.log('4');\n// Output: 1, 4, 3, 2"
        },
        {
          lvl: "lvl3",
          q: "JavaScript-এ Prototype ও Prototypal Inheritance মেমোরি ব্যবহারে কীভাবে ক্লাস বা কনস্ট্রাক্টরের চেয়ে ইফেক্টিভ হয়?",
          m: "JavaScript-এর ES6 class আসলে প্রোটোটাইপাল ইনহেরিটেন্সেরই Syntactic Sugar। ক্লাসের মেথডগুলো প্রতিটি অবজেক্ট ইন্সট্যান্সে কপি হয় না, বরং তারা প্রোটোটাইপ অবজেক্টে (__proto__ চেইনে) একবারই মেমোরিতে স্টোর থাকে। আমরা যখন ১ লাখ অবজেক্ট ইন্সট্যান্স তৈরি করি, সব অবজেক্ট মেমোরিতে মেথডের আলাদা কপি রাখে না—তারা রেফারেন্স দিয়ে শেয়ার্ড প্রোটোটাইপ থেকে মেথড কল করে। ফলে মেমোরি ফুটপ্রিন্ট অত্যন্ত কম থাকে।",
          b: "জাভাস্ক্রিপ্ট ক্লাস মূলত প্রোটোটাইপ ব্যবস্থার উপর ভিত্তি করে কাজ করে। প্রতিটি অবজেক্ট তৈরির সময় যদি মেথডগুলো ক্লাসের ভেতরে কপি হতো তবে মেমোরি খরচ বিপুল হতো। প্রোটোটাইপাল চেইনের মাধ্যমে সব ইন্সট্যান্স একটি একক শেয়ার্ড মেমোরি পয়েন্টার থেকে মেথড ব্যবহার করে, যা উচ্চমাত্রার অ্যাপ্লিকেশনগুলোতে র‍্যাম সাশ্রয় করে।",
          e: "JavaScript uses prototypal inheritance under the hood. ES6 classes are syntactical sugar over prototypes. By attaching methods to the prototype object rather than creating new function instances inside constructors, all instantiated objects share a single memory reference to those methods, keeping heap allocation minimal under high instance counts.",
          tip: "প্রোটোটাইপ চেইন মেমোরি শেয়ারিং ব্যাখ্যা করলে তুমি জাভাস্ক্রিপ্টের ইন্টারনালস ভালো বোঝো তা প্রমাণিত হয়।"
        },
        {
          lvl: "situation",
          q: "একটি ইনপুট বক্সে ইউজার টাইপ করার সাথে সাথে এপিআই রিকোয়েস্ট ফায়ার হচ্ছে। কীভাবে কাস্টম Debounce ফাংশন লিখে অপ্রয়োজনীয় রিকোয়েস্ট ব্লক করবে?",
          m: "এখানে প্রতি কিস্ট্রোকে এপিআই কল হলে সার্ভারে ডস (DoS) এটাকের মতো অবস্থা হবে। সমাধান হলো Debounce প্যাটার্ন: ইউজার টাইপিং থামালে একটি নির্দিষ্ট সময় (যেমন ৪০০ মিলিসেকেন্ড) পর কেবল শেষ ইনপুটের জন্য একবার এপিআই কল হবে। এর জন্য জাভাস্ক্রিপ্ট ক্লোজার ও clearTimeout ব্যবহার করে একটি ডিবউন্স ফাংশন তৈরি করা যায়।",
          b: "সার্চ বক্সে প্রতি ক্যারেক্টার টাইপে নেটওয়ার্ক রিকোয়েস্ট পাঠানো সার্ভার ও ক্লায়েন্ট উভয়ের জন্যই ক্ষতিকর। তাই আমরা ডিবউন্স ব্যবহার করি যা ইউজারের টাইপিং থামা পর্যন্ত অপেক্ষা করে এবং নির্দিষ্ট সময় (৩০০-৫০০ মি.সে.) পার হলে সর্বশেষ সার্চ কিউরি নিয়ে সার্ভারে কল পাঠায়।",
          e: "Without throttling or debouncing, rapid keystrokes flood backend APIs. A debounce utility wraps the callback inside a closure that clears the previous timer whenever triggered, firing the API request only after the user stops typing for a designated period (e.g., 300ms).",
          code: "function debounce(fn, delay = 300) {\n  let timer;\n  return (...args) => {\n    clearTimeout(timer);\n    timer = setTimeout(() => fn(...args), delay);\n  };\n}"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এ কাস্টমার যখন দ্রুত সার্চবারে কোনো আইটেম নাম বা কোড টাইপ করে, তখন কীভাবে এপিআই ও লোকাল ক্যাশ ব্যবহার করেছিলে?",
          m: "Dokani POS কাউন্টারে ক্যাশিয়ারকে ১ সেকেন্ডের ভেতর প্রোডাক্ট খুঁজে পেতে হয়। আমি: (১) ইনপুটটিতে ৩০০ms ডিবউন্স বসিয়েছিলাম। (২) ব্রাউজারের ইন-মেমোরি Map বা IndexedDB-তে ক্যাশ চেক করতাম—যদি প্রোডাক্টটি আগেই ক্যাশে থাকে তবে নেটওয়ার্ক ছাড়াই O(1) টাইমে রেজাল্ট শো করতাম। (৩) যদি এপিআই কল করতেই হতো, তবে AbortController ব্যবহার করতাম যাতে আগের পেন্ডিং সার্চ বাতিল হয়ে যায় এবং রেস কন্ডিশনে পুরোনো রেসপন্স নতুন রেজাল্টকে ওভাররাইট করতে না পারে।",
          b: "দোকানি সিস্টেমে দ্রুত পণ্য খোঁজার জন্য ডিবউন্সিংয়ের পাশাপাশি AbortController ব্যবহার করা হয়েছিল। ইউজার টাইপ করতে থাকলে পূর্বের অসম্পূর্ণ নেটওয়ার্ক কল স্বয়ংক্রিয়ভাবে বাতিল হয়ে যেত যাতে কোনো রেস কন্ডিশন না ঘটে এবং মেমোরিতে থাকা লোকাল ক্যাশ থেকে তৎক্ষণাৎ পণ্য দেখানো হতো।",
          e: "In Dokani POS item lookups, I combined 300ms debouncing with an AbortController signal. If a previous search request was still in-flight when the cashier entered another character, the old request was immediately cancelled via controller.abort(). In addition, frequently sold items were cached in-memory to deliver instantaneous instant search results without round-trips.",
          code: "let controller = new AbortController();\nconst searchProduct = async (query) => {\n  controller.abort();\n  controller = new AbortController();\n  const res = await fetch(`/api/products?q=${query}`, { signal: controller.signal });\n  return res.json();\n};"
        }
      ]
    },
    {
      id: "forms-validation",
      name: "Form Handling & Zod Validation",
      desc: "React Hook Form, Controlled vs Uncontrolled, Zod Schema Validation, Complex Multi-step Forms",
      items: [
        {
          lvl: "lvl1",
          q: "React-এ Controlled এবং Uncontrolled Components-এর মধ্যে পার্থক্য কী? কোনটি কখন ব্যবহার করবে?",
          m: "Controlled Component-এ ইনপুটের মান সরাসরি React স্টেট (value={state}, onChange) দিয়ে নিয়ন্ত্রিত হয়—এতে প্রতি কিস্ট্রোকে রি-রেন্ডার হয় কিন্তু লাইভ ভ্যালিডেশন সহজে করা যায়। Uncontrolled Component-এ ইনপুটের মান ব্রাউজারের DOM নিজেই সংরক্ষণ করে এবং আমরা useRef দিয়ে ডাটা রিড করি—এতে কোনো রি-রেন্ডার হয় না এবং পারফরম্যান্স অনেক ফাস্ট থাকে। বড় বা জটিল ফর্মের জন্য React Hook Form আনকন্ট্রোলড প্যাটার্ন ব্যবহার করে।",
          b: "কন্ট্রোলড কম্পোনেন্টে ফর্মের ফিল্ডের ডাটা সরাসরি রিঅ্যাক্ট স্টেটের মাধ্যমে পরিচালিত হয়। আনকন্ট্রোলড কম্পোনেন্টে ব্রাউজার নিজে ডমের মাধ্যমে ইনপুটের মান ধরে রাখে এবং রিঅ্যাক্ট রিফ দিয়ে প্রয়োজনমতো তা তুলে নেয়। দ্রুত এবং বড় ফর্মের জন্য আনকন্ট্রোলড এপ্রোচ অনেক হালকা ও দ্রুতগতির।",
          e: "Controlled components bind their input values to React state via onChange handlers, causing re-renders on every keystroke but granting instant programmatic control. Uncontrolled components let the native DOM retain form state and access values on-demand via refs. Libraries like React Hook Form leverage uncontrolled components under the hood for superior performance.",
          code: "// Controlled\n<input value={text} onChange={(e) => setText(e.target.value)} />\n// Uncontrolled\n<input ref={inputRef} />"
        },
        {
          lvl: "lvl2",
          q: "React Hook Form কেন সাধারণ useState ফর্মের চেয়ে বহু গুণ দ্রুত কাজ করে?",
          m: "সাধারণ ফর্মে ২০টি ফিল্ড থাকলে একটি ফিল্ডে টাইপ করলেই ২০টি ফিল্ড সহ পুরো ফর্ম কম্পোনেন্ট বারবার রি-রেন্ডার হয়। React Hook Form আনকন্ট্রোলড ইনপুট এবং নেটিভ DOM রেফ ব্যবহার করে। ফলে টাইপ করার সময় পুরো ফর্মে কোনো রি-রেন্ডারই হয় না! শুধুমাত্র যখন ভ্যালিডেশন ফেইল করে বা এরর মেসেজ দেখাতে হয়, তখন নির্দিষ্ট এরর নোডটি অপটিমাইজডভাবে আপডেট হয়।",
          b: "রিঅ্যাক্ট হুক ফর্ম আনকন্ট্রোলড আর্কিটেকচার ব্যবহার করায় প্রতিটি ইনপুটে টাইপ করার সময় পুরো ফর্ম রি-রেন্ডার হয় না। এটি মেমোরিতে অতিরিক্ত রি-রেন্ডার বাঁচায় এবং Zod বা Yup দিয়ে ব্যাকগ্রাউন্ডে অত্যন্ত দ্রুত ডাটা ভ্যালিডেট করে সাবমিশন হ্যান্ডেল করে।",
          e: "React Hook Form minimizes re-renders by embracing uncontrolled inputs and ref subscriptions. Typing in one input does not cause sibling inputs or the parent form wrapper to re-render. It only triggers updates to specific error nodes when validation rules fail, yielding dramatic performance gains in complex enterprise forms.",
          code: "const { register, handleSubmit, formState: { errors } } = useForm();"
        },
        {
          lvl: "lvl3",
          q: "Zod Schema ভ্যালিডেশন ফ্রন্টএন্ড এবং ব্যাকএন্ডে শেয়ার করার সুবিধা কী এবং কীভাবে টাইপ ইনফ্যারেন্স কাজ করে?",
          m: "Zod একটি TypeScript-first স্কিমা ডিক্লারেশন লাইব্রেরি। এর সবচেয়ে বড় সুবিধা হলো 'Single Source of Truth'। একই ভ্যালিডেশন রুল (যেমন ইমেইল ফরম্যাট, পাসওয়ার্ড মিনিমাম ৮ ক্যারেক্টার) আমরা ফ্রন্টএন্ডের ফর্ম এবং ব্যাকএন্ডের API মিডলওয়্যারে শেয়ার করতে পারি। এবং আমাদের আলাদা টাইপ লিখতে হয় না—z.infer<typeof Schema> দিয়ে স্বয়ংক্রিয়ভাবে পারফেক্ট টাইপস্ক্রিপ্ট ইন্টারফেস তৈরি হয়।",
          b: "জড (Zod) দিয়ে একটি একক ভ্যালিডেশন স্কিমা লিখে তা একই সাথে ক্লায়েন্ট সাইড এবং নোডজেএস সার্ভার সাইডে ব্যবহার করা যায়। এতে দুই জায়গায় আলাদা ভ্যালিডেশন কোড লিখতে হয় না এবং z.infer কমান্ডের মাধ্যমে স্বয়ংক্রিয়ভাবে টাইপস্ক্রিপ্ট টাইপ তৈরি হয়ে যায়।",
          e: "Zod acts as a single source of truth for both runtime validation and static TypeScript compilation. By sharing Zod schemas between client forms and backend API routes in a monorepo or shared package, frontend and backend contracts stay 100% in sync. We eliminate manual TypeScript interface drift through z.infer<typeof Schema>.",
          code: "export const InvoiceSchema = z.object({\n  customerPhone: z.string().min(11, '১১ ডিজিটের মোবাইল নম্বর দিন'),\n  paidAmount: z.number().positive(),\n  items: z.array(z.object({ id: z.string(), qty: z.number().min(1) })).min(1)\n});\nexport type InvoiceInput = z.infer<typeof InvoiceSchema>;"
        },
        {
          lvl: "situation",
          q: "একটি মাল্টি-স্টেপ চেকআউট বা অনবোর্ডিং ফর্মে ইউজার স্টেপ ১ ও ২ পূরণ করে স্টেপ ৩-এ গিয়ে ব্যাক বাটনে গেলে পূরণ করা ডেটা মুছে যাচ্ছে। কীভাবে এটি সমাধান করবে?",
          m: "এখানে প্রতিটি স্টেপে লোকাল স্টেট ব্যবহার করার কারণে কম্পোনেন্ট আনমাউন্ট হলে ডাটা হারিয়ে যায়। সমাধান: (১) গ্লোবাল ফর্ম স্টেট বা প্যারেন্ট কম্পোনেন্টে Zustand / React Hook Form FormProvider দিয়ে একটি সেন্ট্রাল অবজেক্ট রাখা। (২) অথবা ইউজার ড্রপ-অফ ঠেকাতে প্রতিটি স্টেপের ডাটা ব্রাউজারের sessionStorage বা localStorage-এ অটো-সেভ করে রাখা। (৩) ব্রাউজার ব্যাক বাটন প্রেস করলে প্যারেন্ট রাউট থেকে কারেন্ট স্টেপ ইন্ডেক্স ম্যানেজ করা (যেমন URL Query params ?step=2) যাতে ব্রাউজার হিস্ট্রি ঠিক থাকে।",
          b: "মাল্টি স্টেপ ফর্মে ডাটা টিকিয়ে রাখার জন্য আমরা লোকাল কম্পোনেন্ট স্টেটের বদলে প্যারেন্টে Zustand বা FormProvider ব্যবহার করি। অতিরিক্ত সুরক্ষায় sessionStorage-এ ফর্মের ডাটা অটো সেভ করা হয় যাতে পেজ রিফ্রেশ বা ব্যাকে গেলেও আগের স্টেপের তথ্য হারিয়ে না যায় এবং ইউআরএল কোয়েরি প্যারাম দিয়ে স্টেপ ট্র্যাক করা হয়।",
          e: "To persist multi-step form state across steps and browser back actions, I lift the form state into a parent FormProvider or a centralized Zustand store. I mirror the current active step in URL search parameters (?step=2) for natural browser history support, while auto-syncing form drafts to sessionStorage to survive unexpected page reloads.",
          tip: "URL Search Params দিয়ে স্টেপ কন্ট্রোল করার কথা বললে সিনিয়র ইঞ্জিনিয়ার হিসেবে ভালো ইমপ্রেশন তৈরি হবে।"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এ ইনভয়েস ক্রিয়েট করার সময় ডায়নামিক আইটেম রো (এড, রিমুভ, ডিসকাউন্ট, ট্যাক্স ক্যালকুলেশন) ফর্ম কীভাবে নির্ভুলভাবে হ্যান্ডেল করেছিলে?",
          m: "Dokani-তে প্রতিটি বিক্রিতে একাধিক প্রোডাক্ট আইটেম থাকতে পারে যার প্রতিটি আইটেমে কোয়ান্টিটি, ইউনিট প্রাইস ও আলাদা ডিসকাউন্ট থাকে। আমি React Hook Form-এর useFieldArray ব্যবহার করেছিলাম। এতে কোনো রেন্ডারিং ল্যাগ ছাড়াই নিমেষে রো যোগ বা বিয়োগ করা যায়। আর সম্পূর্ণ টোটাল, ভ্যাট এবং বাকি (Due) অ্যামাউন্ট গণনার জন্য watch(['items', 'discount', 'paidAmount']) দিয়ে মেমোইজড ক্যালকুলেশন চালিয়েছিলাম যা রিয়েল-টাইমে নির্ভুল হিসাব দিত।",
          b: "দোকানি পিওএস-এ ইনভয়েস জেনারেট করার সময় একাধিক পণ্যের তালিকা পরিচালনার জন্য useFieldArray ব্যবহার করা হয়েছিল। এটি ডায়নামিকভাবে নতুন পণ্য যোগ বা বাদ দিতে অত্যন্ত দ্রুত কাজ করে। এছাড়া লাইভ ডিসকাউন্ট ও ভ্যাট হিসাব করে মোট বকেয়া তাৎক্ষণিক প্রদর্শন করা হতো।",
          e: "In Dokani POS invoice creation, dynamic cart items were managed using React Hook Form's useFieldArray hook. This permitted rapid insertion, removal, and reordering of dynamic line items with minimal render cost. Live calculations for VAT, item discounts, grand totals, and customer dues were computed via useWatch and memoized derivation.",
          code: "const { fields, append, remove } = useFieldArray({ control, name: 'items' });\n// append({ productId: 'p1', qty: 1, unitPrice: 120 });"
        }
      ]
    },
    {
      id: "api-auth-rbac",
      name: "REST API Integration, RBAC & Client Architecture",
      desc: "Axios/Fetch Interceptors, JWT Token Refresh, Role-Based Access Control, Component Architecture, Git",
      items: [
        {
          lvl: "lvl1",
          q: "REST API ইন্টিগ্রেশনে Axios Interceptor কী এবং এটি কেন Fetch API-এর চেয়ে সুবিধাজনক?",
          m: "Axios Interceptor হলো একটি গেটওয়ে যা যেকোনো রিকোয়েস্ট সার্ভারে যাওয়ার আগে বা সার্ভার থেকে রেসপন্স ক্লায়েন্টে আসার পরে ইন্টারসেপ্ট করতে পারে। এর সুবিধা: (১) প্রতিটা রিকোয়েস্টে ম্যানুয়ালি হেডার না দিয়ে ইন্টারসেপ্টরে স্বয়ংক্রিয়ভাবে Authorization: Bearer <token> বসিয়ে দেওয়া যায়। (২) রেসপন্স ইন্টারসেপ্টরে সেন্ট্রালাইজডভাবে এরর হ্যান্ডেল করা যায় (যেমন ৪০১ আসলে রিফ্রেশ টোকেন কল করা বা লগইন পেজে রিডাইরেক্ট করা)।",
          b: "অ্যাক্সিওস ইন্টারসেপ্টর রিকোয়েস্ট পাঠানোর আগে বা রেসপন্স আসার ঠিক পরে মাঝপথে কোড রান করার সুযোগ দেয়। ফলে প্রতিটি এপিআই কলে টোকেন যোগ করা, গ্লোবাল এরর ক্যাচ করা এবং টোকেন এক্সপায়ার হলে অটোমেটিক রিনিউ করার লজিক এক জায়গায় লেখা যায়।",
          e: "Axios interceptors inspect or transform HTTP requests and responses globally. Request interceptors automatically inject JWT Bearer tokens into headers, while response interceptors centralize error tracking and automatically trigger token refresh flows upon encountering 401 Unauthorized errors.",
          code: "api.interceptors.request.use((config) => {\n  const token = getToken();\n  if (token) config.headers.Authorization = `Bearer ${token}`;\n  return config;\n});"
        },
        {
          lvl: "lvl2",
          q: "ফ্রন্টএন্ডে Role-Based Access Control (RBAC) কীভাবে ইমপ্লিমেন্ট করবে যাতে ইউজার শুধুমাত্র তার অনুমোদিত পেজ ও বাটন দেখতে পায়?",
          m: "RBAC ইমপ্লিমেন্ট করার জন্য আমরা দুটি লেয়ার ব্যবহার করি: (১) রাউট লেভেল গার্ড: Next.js Middleware বা React Protected Route কম্পোনেন্ট দিয়ে চেক করি ইউজারের রোলে ওই পেজের পারমিশন আছে কিনা (যেমন /admin/settings পেজে ক্যাশিয়ার ঢুকলে ৪03 দেখাবে বা ড্যাশবোর্ডে পাঠাবে)। (২) কম্পোনেন্ট লেভেল গার্ড: একটি <Can role={['ADMIN', 'MANAGER']}> বা <PermissionGate action=\"DELETE_INVOICE\"> র‍্যাপার কম্পোনেন্ট দিয়ে নির্দিষ্ট অ্যাকশন বাটনগুলোকে শর্তসাপেক্ষে হাইড বা ডিজেবল রাখব।",
          b: "ক্লায়েন্ট সাইডে আরবিক্স (RBAC) বাস্তবায়নের জন্য রাউট পর্যায়ে গার্ড কম্পোনেন্ট ব্যবহার করা হয় যাতে অনুমতিহীন ইউজাররা ইউআরএল দিয়ে সরাসরি এডমিন পেজে ঢুকতে না পারে। বাটনের ক্ষেত্রে পারমিশন গেট কম্পোনেন্ট দিয়ে শুধুমাত্র অনুমোদিত রোলের ইউজারকে বাটন রেন্ডার করা হয়।",
          e: "Frontend RBAC is enforced across two layers: Route Guards (Next.js middleware or Higher-Order Route wrappers) that inspect user roles before rendering secured pages, and Component-Level Permission Gates (<Can perform=\"REFUND_SALE\">) that conditionally render sensitive action buttons in the UI.",
          code: "export function PermissionGate({ allow, userRole, children }: Props) {\n  return allow.includes(userRole) ? <>{children}</> : null;\n}"
        },
        {
          lvl: "lvl3",
          q: "Access Token এক্সপায়ার হয়ে ৪০১ এরর আসলে কীভাবে 'Silent Token Refresh' করবে যাতে ইউজারের ব্রাউজার সেশন বিঘ্নিত না হয় এবং একাধিক প্যারালাল রিকোয়েস্ট ফেইল না করে?",
          m: "এটি একটি ক্লাসিক ইন্টারভিউ প্রবলেম! সমাধান: Axios রেসপন্স ইন্টারসেপ্টরে যখন ৪০১ আসবে: (১) প্রথম রিকোয়েস্টটি ডিটেক্ট করে একটি ফ্ল্যাগ isRefreshing = true করব এবং /api/auth/refresh কল দেব। (২) ওই সময়ে আসা অন্যান্য প্যারালাল রিকোয়েস্টগুলোকে একটি প্রমিজ কিউতে পুশ করে হোল্ড করে রাখব। (৩) রিফ্রেশ টোকেন সাকসেসফুল হলে নতুন টোকেন দিয়ে কিউতে থাকা সবগুলো রিকোয়েস্ট পুনরায় রান করিয়ে সমাধান করব। রিফ্রেশ ফেইল করলে তবেই ইউজারকে লগআউট করব।",
          b: "এক্সেস টোকেন মেয়াদোত্তীর্ণ হলে রেসপন্স ইন্টারসেপ্টর সাইলেন্টলি রিফ্রেশ টোকেন এপিআইতে রিকোয়েস্ট পাঠায়। এই সময় অন্য যে রিকোয়েস্টগুলো আসে সেগুলোকে একটি কিউতে সাময়িক আটকে রাখা হয়। নতুন টোকেন পাওয়া মাত্র আটকে থাকা সব রিকোয়েস্টকে সফলভাবে এক্সিকিউট করা হয়, ফলে ইউজারের কাজ বিঘ্নিত হয় না।",
          e: "When a 401 error occurs, the Axios response interceptor intercepts the failure. It locks downstream calls with an 'isRefreshing' flag and queues pending requests into an array of callbacks. Once the silent refresh API call succeeds with a new token, queued requests are retried with the updated token, providing seamless continuity.",
          tip: "এই 'Parallel 401 Queue' সল্যুশন বলতে পারলে ইন্টারভিউয়ার নিশ্চিত বুঝবে তুমি প্রোডাকশন গ্রেড সিস্টেম হ্যান্ডেল করেছ।"
        },
        {
          lvl: "situation",
          q: "একটি এন্টারপ্রাইজ ড্যাশবোর্ডে ১৫টি ভিন্ন ভিন্ন মডিউল আছে। কম্পোনেন্ট আর্কিটেকচার কীভাবে ডিজাইন করবে যাতে কোনো কোড ডুপ্লিকেশন না হয় এবং বিভিন্ন ডেভেলপার কোনো কনফ্লিক্ট ছাড়া কাজ করতে পারে?",
          m: "আমি Feature-Based Architecture অনুসরণ করব: (১) src/components/ui/ ফোল্ডারে থাকবে কোর জেনেরিক উপাদান (Button, Modal, Input, Badge)। (২) src/features/ ফোল্ডারে প্রতিটি আলাদা মডিউলের নিজস্ব কম্পোনেন্ট, হুক, এপিআই কল এবং টাইপ থাকবে (যেমন features/invoices, features/customers)। (৩) প্রতিটি ফিচারের একটি নিজস্ব index.ts এক্সপোর্ট ব্যারেল ফাইল থাকবে যাতে ইন্টারনাল ফাইলের ডিপেনডেন্সি বাইরে ছড়িয়ে না পড়ে।",
          b: "বড় প্রজেক্টে ডুপ্লিকেশন এড়াতে আমরা ফিচার-বেজড ফোল্ডার স্ট্রাকচার ব্যবহার করি। সাধারণ বাটন ও ইনপুট কম্পোনেন্টগুলো শেয়ার্ড ইউআই ফোল্ডারে থাকে এবং প্রতিটি মডিউলের নিজস্ব স্টেট, এপিআই ও কম্পোনেন্ট আলাদা ফিচার ডিরেক্টরিতে থাকে যাতে কোনো কনফ্লিক্ট ছাড়া একাধিক টিম কাজ করতে পারে।",
          e: "I implement Feature-Driven Architecture. Core primitive elements reside in 'components/ui' (Button, Dialog, Table), while business domains reside in encapsulated feature slices ('features/inventory', 'features/billing'). Each feature module encapsulates its own components, hooks, schemas, and API calls, preventing merge conflicts across developers.",
          code: "src/\n├── components/ui/   # Reusable primitives\n├── features/\n│   ├── pos/         # POS Cart, Barcode scanner, hooks\n│   └── billing/     # Invoices, ledgers, print templates"
        },
        {
          lvl: "realworld",
          q: "Git এবং GitHub-এ টিম কোলাবোরেশনের সময় Dokani ও PTTABD-তে তুমি কীভাবে ব্রাঞ্চিং স্ট্র্যাটেজি ও কোড রিভিউ পরিচালনা করেছিলে?",
          m: "আমরা GitHub Flow স্ট্র্যাটেজি মেনে চলতাম: (১) main প্রোডাকশন ব্রাঞ্চ সরাসরি পুশের জন্য প্রোটেক্টেড থাকত। (২) প্রতিটি ফিচারের জন্য ডেসক্রিপটিভ ব্রাঞ্চ নাম দিতাম feat/pos-thermal-print বা fix/cart-race-condition। (৩) পিআর (Pull Request) ওপেন করার পর GitHub Actions দিয়ে স্বয়ংক্রিয় লিন্টিং, টাইপস্ক্রিপ্ট কম্পাইলেশন ও টেস্ট রান হতো। (৪) অন্তত একটি অ্যাপ্রুভাল রিভিউ ছাড়া মার্জ করা যেত না এবং কনভেনশনাল কমিট মেসেজ (feat:, fix:, refactor:) ব্যবহার করতাম।",
          b: "টিম প্রজেক্টে আমরা গিটহাব ফ্লো মেনে কাজ করি। মেইন ব্রাঞ্চ সম্পূর্ণ লকড থাকে এবং যেকোনো কাজের জন্য আলাদা ফিচার ব্রাঞ্চ তৈরি করা হয়। পিআর ওপেন করার পর স্বয়ংক্রিয় সিআই পাইপলাইনে টাইপ চেকিং শেষ হলে কোড রিভিউর মাধ্যমে মেইন ব্রাঞ্চে স্কোয়াশ মার্জ করা হয়।",
          e: "We adhered to GitHub Flow with strict branch protection rules on main. Developers opened dedicated feature branches (e.g., 'feat/pos-multi-tender'). Pull Requests required passing GitHub Actions checks (linting, TypeScript compilation) and at least one peer code review before squashing and merging, maintaining a clean commit history.",
          tip: "Git ব্রাঞ্চ প্রটেকশন ও কনভেনশনাল কমিটের কথা বলা প্রফেশনাল টিমওয়ার্কের প্রমাণ।"
        }
      ]
    },
    {
      id: "automated-testing-quality",
      name: "Automated Testing & Code Quality (Jest, RTL & Playwright)",
      desc: "Component Unit Testing, React Testing Library, Mocking APIs (MSW), E2E with Playwright, Flaky Test Prevention",
      items: [
        {
          lvl: "lvl1",
          q: "Frontend অ্যাপ্লিকেশনে Automated Testing কেন প্রয়োজন এবং Unit, Integration ও End-to-End (E2E) টেস্টের মধ্যে পার্থক্য কী?",
          m: "Automated Testing ছাড়া কোডবেস বড় হলে নতুন ফিচার যোগ করতে গেলে পুরোনো ফিচার ভেঙে পড়ে (Regression Bugs)। টেস্ট পিরামিড অনুযায়ী ৩টি প্রধান স্তর: (১) **Unit Testing:** একক কোনো স্বতন্ত্র ফাংশন বা ইউটিলিটি টেস্ট করা (যেমন: ডিসকাউন্ট বা ট্যাক্স ক্যালকুলেটর ফাংশন Jest দিয়ে টেস্ট করা)। (২) **Integration Testing:** একাধিক কম্পোনেন্ট এবং স্টেট হুক একসাথে মিলে সঠিকভাবে কাজ করছে কিনা যাচাই করা (যেমন: React Testing Library দিয়ে ফর্ম ফিলাপ ও সাবমিট টেস্ট করা)। (৩) **E2E Testing:** সম্পূর্ণ আসল ব্রাউজার খুলে আসল ইউজারের মতো পুরো ফ্লো টেস্ট করা (যেমন: Playwright দিয়ে লগইন থেকে পেমেন্ট চেকআউট পর্যন্ত সম্পূর্ণ ফ্লো টেস্ট করা)।",
          b: "অটোমেটেড টেস্টিং নিশ্চিত করে নতুন কোড যোগ করার পর পুরোনো কোনো ফিচার নষ্ট হয়নি। ইউনিট টেস্ট দিয়ে ছোট ছোট ফাংশন যাচাই করা হয়, ইন্টিগ্রেশন টেস্ট দিয়ে কম্পোনেন্টগুলোর পারস্পরিক যোগাযোগ টেস্ট করা হয় এবং এন্ড-টু-এন্ড টেস্ট দিয়ে প্লেরাইট ব্রাউজারে আসল ব্যবহারকারীর মতো সম্পূর্ণ জার্নি পরীক্ষা করা হয়।",
          e: "Automated testing prevents regression bugs and maintains refactoring confidence. The testing pyramid comprises: Unit Testing (isolated functions like pricing or formatting utilities tested via Jest/Vitest), Integration Testing (verifying component interactions, hooks, and forms via React Testing Library), and End-to-End (E2E) Testing (driving headless Chromium browsers via Playwright to validate critical customer journeys like signup, cart checkout, and payment gateways).",
          code: "// Unit Test Example (Jest/Vitest)\ndescribe('calculateGrandTotal', () => {\n  it('applies percentage discount and tax correctly', () => {\n    const total = calculateGrandTotal({ subtotal: 1000, discountPct: 10, taxPct: 5 });\n    expect(total).toBe(945);\n  });\n});"
        },
        {
          lvl: "lvl2",
          q: "React Testing Library (RTL)-এ কম্পোনেন্ট টেস্ট করার মূল দর্শন কী এবং Implementation Details টেস্ট করা কেন নিষেধ?",
          m: "RTL-এর মূল নীতি: 'The more your tests resemble the way your software is used, the more confidence they can give you.' অর্থাৎ কম্পোনেন্টের ভেতরের ইন্টারনাল স্টেট ভেরিয়েবল বা মেথড টেস্ট করা উচিত নয় (যেমন: `wrapper.state('count')` টেস্ট করা নিষিদ্ধ)। বরং ব্যবহারকারী স্ক্রিনে যা দেখে এবং যেভাবে ইন্টারঅ্যাক্ট করে ঠিক সেভাবে টেস্ট করতে হবে: (১) এক্সেসিবল রোল ধরে খোঁজা (`getByRole('button', { name: /submit/i })`), (২) ইউজারের ইনপুট সিমুলেট করা (`await userEvent.type(input, '1234')`), (৩) স্ক্রিনে আউটপুট প্রদর্শিত হওয়া অ্যাসার্ট করা (`expect(screen.getByText('সফল হয়েছে')).toBeInTheDocument()`)। এর ফলে কম্পোনেন্ট ইন্টারনালি রিফ্যাক্টর করলেও টেস্ট ভাঙে না।",
          b: "রিঅ্যাক্ট টেস্টিং লাইব্রেরির মূল উদ্দেশ্য হলো আসল ইউজারের দৃষ্টিকোণ থেকে অ্যাপ্লিকেশন টেস্ট করা। কম্পোনেন্টের ভেতরের স্টেট ভেরিয়েবল টেস্ট না করে বাটন ক্লিক, ফর্ম টাইপ এবং স্ক্রিনের দৃশ্যমান টেক্সট যাচাই করা হয় যাতে কোড রিফ্যাক্টর করলেও টেস্ট সহজে নষ্ট না হয়।",
          e: "React Testing Library enforces user-centric testing: tests must interact with components purely through accessible DOM nodes rather than spying on internal state or implementation details. Queries prioritize accessibility (screen.getByRole, getByLabelText), and interactions are simulated using '@testing-library/user-event'. This ensures tests survive code refactors as long as user behavior remains identical.",
          code: "import { render, screen } from '@testing-library/react';\nimport userEvent from '@testing-library/user-event';\nimport { LoginForm } from './LoginForm';\n\ntest('submits credentials and renders success message', async () => {\n  render(<LoginForm />);\n  await userEvent.type(screen.getByLabelText(/ইমেইল/i), 'admin@dokani.com');\n  await userEvent.type(screen.getByLabelText(/পাসওয়ার্ড/i), 'secret123');\n  await userEvent.click(screen.getByRole('button', { name: /লগইন/i }));\n  expect(await screen.findByText(/স্বাগতম/i)).toBeInTheDocument();\n});"
        },
        {
          lvl: "lvl3",
          q: "Playwright দিয়ে Modern Web App-এ End-to-End (E2E) টেস্ট কীভাবে সেট করবে এবং এটি কেন Cypress-এর চেয়ে অনেক বেশি ফাস্ট ও রিলায়েবল?",
          m: "Playwright মাইক্রোসফটের তৈরি আধুনিক E2E ফ্রেমওয়ার্ক। কেন এটি সেরা: (১) এটি সরাসরি ব্রাউজারের Chrome DevTools Protocol (CDP) দিয়ে কাজ করে, কোনো স্লো ইন-ব্রাউজার স্ক্রিপ্ট ইনজেকশন নয়। (২) **Auto-Waiting:** বাটন ক্লিকযোগ্য হওয়া, রেন্ডার হওয়া বা নেটওয়ার্ক রিকোয়েস্ট শেষ হওয়া পর্যন্ত প্লেরাইট নিজে থেকেই মাইক্রো-ওয়েট করে, তাই ম্যানুয়াল `sleep(3000)` লেখার কোনো প্রয়োজন হয় না। (৩) **Parallel Execution:** মাল্টিপল ওয়ার্কারে একই সাথে শত শত টেস্ট চালাতে পারে। (৪) স্টোরেজ স্টেট রিইউজ করে প্রতি টেস্টে বারবার লগইন পেজে না গিয়ে সরাসরি অথেন্টিকেটেড স্টেটে পেজ ওপেন করা যায়।",
          b: "প্লেরাইট (Playwright) আধুনিক ব্রাউজার টেস্টিংয়ের শীর্ষ ফ্রেমওয়ার্ক। এটি অটো-ওয়েটিং ফিচারের কারণে নেটওয়ার্কের জন্য টেস্ট আটকে না গিয়ে নির্ভুলভাবে চলে। একই সাথে একাধিক ব্রাউজারে প্যারালাল টেস্ট চালানো যায় এবং লগইন সেশন সংরক্ষণ করে অতি দ্রুত পুরো চেকআউট ফ্লো টেস্ট করা সম্ভব।",
          e: "Playwright communicates directly with browser engines (Chromium, Firefox, WebKit) out-of-process via devtools protocols, making it dramatically faster and more resilient than Cypress. Its native Auto-Waiting waits for elements to be actionable before interacting, eliminating flaky timeouts. Storage State snapshots allow sharing authenticated sessions across test workers without repetitive UI login sequences.",
          code: "import { test, expect } from '@playwright/test';\n\ntest('POS cashier can complete a cash checkout', async ({ page }) => {\n  await page.goto('/pos');\n  await page.locator('#barcode-input').fill('8941100234');\n  await page.keyboard.press('Enter');\n  await expect(page.locator('.cart-item')).toHaveCount(1);\n  await page.getByRole('button', { name: /ক্যাশ বিল/i }).click();\n  await expect(page.locator('.receipt-preview')).toBeVisible();\n});"
        },
        {
          lvl: "situation",
          q: "CI/CD পাইপলাইনে গিটহাব অ্যাকশনে মাঝেমধ্যেই টেস্ট ফেইল করছে (Flaky Tests) কিন্তু লোকাল মেশিনে রান করলে সবসময় পাস করে। কীভাবে এর আসল কারণ খুঁজে বের করে সমাধান করবে?",
          m: "Flaky Tests মূলত ঘটে টাইমিং, নেটওয়ার্ক ল্যাগ বা শেয়ার্ড স্টেট কনফ্লিক্টের কারণে। সমাধানের ৪টি সুনির্দিষ্ট ধাপ: (১) **Hardcoded Timeout মুছে ফেলা:** কোনো অবস্থাতেই `setTimeout` বা `sleep(2000)` রাখা যাবে না; তার বদলে Playwright-এর ওয়েব-ফার্স্ট অ্যাসার্শন `await expect(el).toBeVisible()` অথবা RTL-এর `waitFor(() => ...)` ব্যবহার করব। (২) **Isolate Database State:** প্রতিটি টেস্টের শুরুতে ডাটাবেজ ট্রানজেকশনে ক্লিন টেস্ট ডাটা সিড করব যাতে আগের টেস্টের ডাটার সাথে ক্ল্যাশ না হয়। (৩) **Trace Viewer & Video:** Playwright-এ `trace: 'on-first-retry'` এনেবল করব, যা ফেইল হওয়া টেস্টের প্রতিটি মিলি-সেকেন্ডের স্ক্রিনশট, কনসোল লগ ও নেটওয়ার্ক ট্রাফিক রেকর্ড করে—যাতে লোকাল মেশিনে বসে ঠিক কোন ফ্রেমে এরর হয়েছে তা দেখা যায়।",
          b: "সিআই পাইপলাইনে ফ্লেকি টেস্ট দূর করতে হার্ডকোডেড স্লিপ বা টাইমার বাদ দিয়ে অটো-ওয়েটিং ব্যবহার করতে হয়। টেস্টের জন্য স্বাধীন টেস্ট ডাটাবেজ ব্যবহার করতে হবে এবং প্লেরাইট ট্রেস ভিউয়ার (Trace Viewer) চালু করে ফেইল হওয়ামাত্র নেটওয়ার্ক ও স্ক্রিনশট লগ দেখে মূল সমস্যা দ্রুত ফিক্স করা যায়।",
          e: "Flaky CI failures typically stem from asynchronous timing deltas or shared database pollution. Remediation steps: eliminate arbitrary sleeps in favor of web-first assertions (expect(locator).toBeVisible()), decouple test records by generating randomized tenant UUIDs per test execution, and configure Playwright Trace Viewer on retry ('trace: on-first-retry') to capture exact DOM snapshots, network payloads, and console logs during pipeline failures.",
          tip: "প্লেরাইটের 'Trace Viewer' এবং ওয়েব-ফার্স্ট অ্যাসার্শনের কথা শুনলে সিনিয়র বা লিড ডেভেলপাররা সাথে সাথে নিশ্চিত হয় তুমি প্রোডাকশন কোয়ালিটি টেস্ট জানো।"
        },
        {
          lvl: "realworld",
          q: "Dokani POS-এর মতো জটিল ফিনান্সিয়াল সিস্টেমে কোনো নতুন কোড পুশ করার আগে তুমি কী কী টেস্ট দিয়ে কোয়ালিটি নিশ্চিত করতে?",
          m: "Dokani-তে রিটেইল ক্যাশিয়ারদের নির্ভুলতার ওপর ব্যবসায়ীর পুরো লাভ-ক্ষতি নির্ভর করে। তাই আমরা ৩ স্তরের অটোমেটেড কোয়ালিটি গেট রেখেছিলাম: (১) **TypeScript Strict Compilation:** `tsc --noEmit` চালিয়ে কোনো টাইপ অমিল বা আনহ্যান্ডেল্ড নাল ফিল্ড আছে কিনা যাচাই করতাম। (২) **Jest Unit Tests:** ডিসকাউন্ট রুলস, ভ্যাট হিসাব, এবং ডাবল-এন্ট্রি লেজারের গাণিতিক লজিকের জন্য ১০০% ইউনিট টেস্ট কভারেজ থাকত। (৩) **Playwright Smoke Test:** পিআর ওপেন হলেই গিটহাব অ্যাকশন হেডলেস ব্রাউজারে একটি ফুল কার্ট তৈরি করে, বারকোড স্ক্যান করে এবং প্রিন্ট প্রিভিউ জেনারেট করে দেখত কোনো পেজ ব্রেক করেছে কিনা। কোনো টেস্ট ফেইল করলে পিআর মার্জ স্বয়ংক্রিয়ভাবে ব্লক হয়ে যেত।",
          b: "দোকানি সিস্টেমে কোড পুশের আগে আমরা টাইপস্ক্রিপ্ট স্ট্রিক্ট চেক, লেজার ও ডিসকাউন্ট হিসাবের জন্য জেস্ট (Jest) ইউনিট টেস্ট এবং সম্পূর্ণ বিলিং ফ্লোর প্লেরাইট স্মোক টেস্ট রান করতাম। সবগুলো স্বয়ংক্রিয় টেস্ট সফল হলে তবেই কোড প্রোডাকশনে যেত।",
          e: "For mission-critical operations in Dokani POS, code quality was safeguarded via automated CI gates: first, strict TypeScript compiler verification (tsc --noEmit) ensuring zero unsafe type coercions; second, 100% Jest unit coverage across financial arithmetic (tax tiers, split payments, multi-tender balance reconciliations); third, an automated Playwright smoke test simulating full barcode scanning and receipt generation. Pull requests were blocked from merging unless all test suites passed.",
          tip: "এই টেস্ট পাইপলাইনের বর্ণনা বিশ্বমানের এন্টারপ্রাইজ স্ট্যান্ডার্ড নির্দেশ করে।"
        }
      ]
    }
  ]
};
