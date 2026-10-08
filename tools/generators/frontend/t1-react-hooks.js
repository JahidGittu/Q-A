// Topic 1: React.js & Core Hooks (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "react-hooks-core",
  name: "React.js & React Hooks",
  desc: "Virtual DOM, Reconciliation, useState, useEffect, useRef, useMemo, useCallback, useTransition, Custom Hooks",
  items: [
    // --- LEVEL 1 (5 Questions) ---
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
      lvl: "lvl1",
      q: "React Component Lifecycle-এর মূল ৩টি ফেজ কী এবং ফাংশনাল কম্পোনেন্টে হুক দিয়ে এগুলো কীভাবে হ্যান্ডেল করা হয়?",
      m: "৩টি মূল ফেজ হলো: Mounting (DOM-এ কম্পোনেন্ট আসা), Updating (স্টেট/প্রপস পরিবর্তনে রি-রেন্ডার হওয়া), এবং Unmounting (DOM থেকে মুছে ফেলা)। ফাংশনাল কম্পোনেন্টে useEffect দিয়ে এগুলো কন্ট্রোল করা হয়: খালি ডিপেনডেন্সি `[]` দিলে মাউন্টিং, ভ্যারিয়েবল ডিপেনডেন্সি `[count]` দিলে আপডেটিং, এবং useEffect থেকে রিটার্ন করা ক্লিনআপ ফাংশন দিয়ে আনমাউন্টিং হ্যান্ডেল করা হয়।",
      b: "রিঅ্যাক্ট কম্পোনেন্টের জীবনচক্র তিনটি ধাপে বিভক্ত: মাউন্টিং (কম্পোনেন্ট প্রথমবার ডমে যুক্ত হওয়া), আপডেটিং (স্টেট বা প্রপস পরিবর্তনে পুনরায় রেন্ডার হওয়া), এবং আনমাউন্টিং (ডম থেকে অপসারিত হওয়া)। ফাংশনাল কম্পোনেন্টে useEffect হুকের ডিপেনডেন্সি অ্যারে এবং ক্লিনআপ ফাংশনের সমন্বয়ে এই ধাপগুলো পরিচালিত হয়।",
      e: "The three primary phases are Mounting, Updating, and Unmounting. In functional components, useEffect manages all three: an empty dependency array [] simulates componentDidMount, passing dependencies simulates componentDidUpdate, and returning a cleanup function acts as componentWillUnmount.",
      code: "useEffect(() => {\n  console.log('Mounted');\n  return () => console.log('Unmounted');\n}, []);"
    },
    {
      lvl: "lvl1",
      q: "React-এ JSX কী এবং ব্রাউজার কীভাবে JSX কোড রিড করে?",
      m: "JSX মানে JavaScript XML। এটি জাভাস্ক্রিপ্টের মধ্যে HTML-এর মতো সিনট্যাক্স লেখার সুবিধা দেয়। ব্রাউজার সরাসরি JSX বুঝতে পারে না। Babel বা SWC কম্পাইলার JSX-কে সাধারণ `React.createElement()` ফাংশন কলে রূপান্তর করে, যা প্লেইন জাভাস্ক্রিপ্ট অবজেক্ট রিটার্ন করে এবং ব্রাউজার তা এক্সিকিউট করতে পারে।",
      b: "জেএসএক্স হলো জাভাস্ক্রিপ্টের একটি সিনট্যাক্স এক্সটেনশন যা জাভাস্ক্রিপ্ট ফাইলের ভিতরে এইচটিএমএল কোডের মতো স্ট্রাকচার লিখতে সাহায্য করে। ব্রাউজার সরাসরি জেএসএক্স পড়তে পারে না; বাবেল (Babel) বা এসডব্লিউসি (SWC) এর মতো ট্রান্সপিলার এটিকে সাধারণ React.createElement ফাংশন কলে কনভার্ট করে।",
      e: "JSX stands for JavaScript XML, allowing developers to write HTML-like syntax inside JavaScript. Browsers cannot execute JSX directly. Compilers like Babel or SWC transpile JSX into standard React.createElement() calls that evaluate into plain JavaScript objects.",
      code: "// JSX:\nconst element = <h1 className='title'>Hello</h1>;\n// Transpiled:\nconst element = React.createElement('h1', { className: 'title' }, 'Hello');"
    },
    {
      lvl: "lvl1",
      q: "React-এ List রেন্ডার করার সময় 'key' প্রপ কেন আবশ্যক এবং ইনডেক্সকে কী হিসেবে ব্যবহার করা কেন খারাপ প্র্যাকটিস?",
      m: "React ভার্চুয়াল ডম ডিফারেন্সে প্রতিটি লিস্ট আইটেমকে ট্র্যাক করার জন্য ইউনিক 'key' ব্যবহার করে। কী না দিলে কোনো আইটেম ডিলিট বা রিঅর্ডার হলে পুরো লিস্ট রি-রেন্ডার হয়। অ্যারে ইনডেক্স (`index`) কী হিসেবে ব্যবহার করলে আইটেম ফিল্টার বা সর্ট করার সময় ভুল স্টেট ম্যাপ হয়ে যায় এবং ইনপুট ফিল্ডের ভ্যালু এলোমেলো হয়ে বাগ তৈরি করে। তাই সবসময় ডাটাবেজের ইউনিক `id` দেওয়া উচিত।",
      b: "লিস্টের প্রতিটি এলিমেন্টকে ট্র্যাক করতে রিঅ্যাক্টের একটি অনন্য আইডেন্টিফায়ার প্রয়োজন হয়, যা হলো key। ইনডেক্সকে key হিসেবে ব্যবহার করলে উপাদানগুলো সাজানো, যোগ বা মুছে ফেলার সময় ইনপুট স্টেট অমিল হয়ে গুরুতর রেন্ডারিং বাগ তৈরি হয়। তাই ডাটার অনন্য আইডি (যেমন: item.id) key হিসেবে ব্যবহার করা আবশ্যক।",
      e: "Keys help React identify which items have changed, been added, or removed during Reconciliation. Using array indices as keys leads to UI bugs and broken component state when lists are reordered, sorted, or filtered because React cannot preserve individual item state correctly.",
      tip: "কখনোই `key={index}` ব্যবহার করবে না, সবসময় `key={item.id}` ব্যবহার করবে।"
    },

    // --- LEVEL 2 (5 Questions) ---
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
      lvl: "lvl2",
      q: "Custom Hook কী এবং কখন আমাদের একটি কাস্টম হুক তৈরি করা উচিত?",
      m: "Custom Hook হলো একটি জাভাস্ক্রিপ্ট ফাংশন যার নাম 'use' দিয়ে শুরু হয় এবং এর ভেতর রিঅ্যাক্টের বিল্ট-ইন হুকগুলো (useState, useEffect ইত্যাদি) কল করা যায়। যখন একাধিক কম্পোনেন্টে একই স্টেটফুল লজিক বারবার প্রয়োজন হয় (যেমন: উইন্ডো সাইজ ট্র্যাক করা, লোকাল স্টোরেজ সিঙ্ক, বা ডেটা ফেচিং), তখন কোড ডুপ্লিকেশন এড়াতে আমরা কাস্টম হুক তৈরি করি।",
      b: "কাস্টম হুক হলো এমন একটি পুনঃব্যবহারযোগ্য জাভাস্ক্রিপ্ট ফাংশন যা রিঅ্যাক্টের অন্যান্য হুক ব্যবহার করে স্টেটফুল লজিক শেয়ার করে। একই লজিক একাধিক কম্পোনেন্টে কপি-পেস্ট না করে আলাদা ফাইলে কাস্টম হুক বানিয়ে পরিষ্কার আর্কিটেকচার তৈরি করা যায়।",
      e: "A Custom Hook is a reusable JavaScript function whose name starts with 'use' and can invoke other React hooks. We create custom hooks to extract and share stateful logic across multiple components (e.g., useWindowSize, useLocalStorage, useDebounce) without duplicating code.",
      code: "function useDebounce<T>(value: T, delay: number): T {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const handler = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(handler);\n  }, [value, delay]);\n  return debounced;\n}"
    },
    {
      lvl: "lvl2",
      q: "React.memo কীভাবে কাজ করে এবং এটি কখন ব্যবহার করা ফলপ্রসূ?",
      m: "React.memo হলো একটি Higher Order Component (HOC) যা চাইল্ড কম্পোনেন্টকে র্যাপ করে। যদি কম্পোনেন্টের প্রপস পরিবর্তন না হয়, তাহলে প্যারেন্ট রি-রেন্ডার হলেও চাইল্ড কম্পোনেন্ট রি-রেন্ডার হবে না (Shallow comparison)। এটি ব্যবহার করা ফলপ্রসূ যখন চাইল্ড কম্পোনেন্টটি অনেক বড় বা ভারী UI রেন্ডার করে এবং প্যারেন্ট ঘন ঘন রি-রেন্ডার হয়। তবে প্রপস হিসেবে আন-মেমোইজড অবজেক্ট বা ফাংশন পাস করলে React.memo কোনো কাজ করে না।",
      b: "React.memo একটি উচ্চতর কম্পোনেন্ট যা প্রপস পরিবর্তন না হলে কম্পোনেন্টকে পুনরায় রেন্ডার হওয়া থেকে বিরত রাখে। এটি প্রপসের শ্যালো তুলনা করে। যেসব কম্পোনেন্টের রেন্ডারিং ভারী এবং একই প্রপস নিয়ে বারবার রেন্ডার হয়, সেগুলোতে React.memo ব্যবহারে রেন্ডারিং পারফরম্যান্স অনেক বৃদ্ধি পায়।",
      e: "React.memo is a higher-order component that memoizes the rendered output of a component. If its props have not changed (via shallow comparison), React skips rendering that component. It is effective for heavy UI components whose parent re-renders frequently with unchanged props.",
      code: "const ProductCard = React.memo(({ item }: { item: Product }) => {\n  return <div className='card'>{item.title}</div>;\n});"
    },
    {
      lvl: "lvl2",
      q: "React-এ Batching কী এবং React 18-এর Automatic Batching কীভাবে কাজ করে?",
      m: "Batching হলো একাধিক স্টেট আপডেটকে একসাথে গ্রুপ করে মাত্র একবার কম্পোনেন্ট রি-রেন্ডার করার মেকানিজম। React 17 বা আগের ভার্সনে শুধুমাত্র রিঅ্যাক্ট ইভেন্ট হ্যান্ডলারের ভেতরে ব্যাচিং হতো; কিন্তু setTimeout, Promise বা ফেচ রিকোয়েস্টের ভেতর স্টেট চেঞ্জ করলে প্রতিটির জন্য আলাদা রেন্ডার হতো। React 18-এ 'Automatic Batching' আনা হয়েছে, যার ফলে প্রমিজ, টাইমআউট বা নেটিভ ইভেন্টেও সব স্টেট আপডেট স্বয়ংক্রিয়ভাবে একটি মাত্র রেন্ডারে ব্যাচ হয়।",
      b: "ব্যাচিং হলো পারফরম্যান্স অপটিমাইজেশনের কৌশল যেখানে একাধিক স্টেট আপডেটকে একটিমাত্র রেন্ডার সাইকেলে সম্পন্ন করা হয়। রিঅ্যাক্ট ১৮-এর অটোমেটিক ব্যাচিংয়ের কারণে প্রমিজ, টাইমআউট বা অ্যাসিনক্রোনাস কলের ভেতরেও একাধিক স্টেট পরিবর্তন করলে ব্রাউজারে মাত্র একবার রি-রেন্ডার হয়।",
      e: "Batching is when React groups multiple state updates into a single re-render for better performance. In React 18, Automatic Batching applies across all contexts—including promises, setTimeout, and native event listeners—ensuring consistent single re-renders.",
      code: "// React 18: Only 1 re-render occurs\nsetTimeout(() => {\n  setCount(c => c + 1);\n  setFlag(f => !f);\n}, 1000);"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "React 19-এর Actions এবং `useActionState`, `useOptimistic` কীভাবে ট্র্যাডিশনাল ফর্ম ও এপিআই সাবমিশনকে পরিবর্তন করেছে?",
      m: "আগে ফর্ম সাবমিট করার সময় আমাদের ম্যানুয়ালি `const [loading, setLoading] = useState(false)` এবং ট্রাই-ক্যাচ দিয়ে এরর স্টেট ম্যানেজ করতে হতো। React 19-এ আসিনক্রোনাস ফাংশনকে ট্রানজিশন বা অ্যাকশন হিসেবে পাস করা যায়। `useActionState` স্বয়ংক্রিয়ভাবে অ্যাকশনের পেন্ডিং স্টেট, রেসপন্স ডাটা ও এরর রিটার্ন করে। আর `useOptimistic` দিয়ে সার্ভার রেসপন্স আসার আগেই UI-তে ডেটা আপডেট দেখিয়ে দেওয়া যায় (যেমন লাইক বাটন বা কার্ট আইটেম), আর ফেইল করলে নিজে থেকেই রোলব্যাক করে।",
      b: "রিঅ্যাক্ট ১৯-এ ফর্ম ও সার্ভার মিউটেশনকে সহজ করতে অ্যাকশন ধারণা এসেছে। useActionState অ্যাসিনক্রোনাস অ্যাকশনের লোডিং স্টেট, ফর্ম স্টেট এবং এরর নিজে থেকেই পরিচালনা করে। useOptimistic হুকের মাধ্যমে নেটওয়ার্ক রিকোয়েস্ট চলাকালীন ব্যবহারকারীকে তৎক্ষণাৎ সফলতার প্রিভিউ দেখানো যায়, যা ইউজার এক্সপেরিয়েন্সকে অনেক বেশি রেসপনসিভ করে।",
      e: "React 19 Actions streamline asynchronous form mutations. useActionState automatically manages the pending state, errors, and returned payload of an async action without boilerplate useState calls. useOptimistic allows instant UI updates before the server responds, automatically rolling back if the network request fails.",
      tip: "NT Tech-এর টেক লিডরা নতুন React 19 ও Next.js 15+ এর আধুনিক ফিচারগুলো ইন্টারভিউতে খুব বেশি পছন্দ করে।"
    },
    {
      lvl: "lvl3",
      q: "Concurrent React এবং Fiber Architecture-এর অভ্যন্তরীণ মেকানিজম কী? কীভাবে এটি UI থ্রেডকে ব্লক না করে কাজ করে?",
      m: "React 16-এর আগে Stack Reconciler ছিল সিনক্রোনাস ও রিকার্সিভ, যার কারণে বড় কম্পোনেন্ট ট্রিতে রেন্ডারিং শুরু হলে জাভাস্ক্রিপ্ট মেইন থ্রেড ব্লক হয়ে ফ্রেম ড্রপ হতো। React Fiber প্রতিটি কম্পোনেন্টকে একটি 'Fiber Node' ইউনিটে ভাগ করে, যা একটি ভার্চুয়াল কল স্ট্যাকের মতো কাজ করে। এটি টাইম স্লাইসিং (Time Slicing) সমর্থন করে, অর্থাৎ ব্রাউজার ফ্রেম শেষ হওয়ার আগে কাজ পজ করে মেইন থ্রেডকে ইউজার ইনপুট বা অ্যানিমেশন হ্যান্ডেল করতে ছেড়ে দেয় এবং পরে বাকি কাজ শেষ করে।",
      b: "কনকারেন্ট রিঅ্যাক্টের মূল ভিত্তি হলো ফাইবার আর্কিটেকচার। এটি রেন্ডারিং কাজকে ছোট ছোট এককে বিভক্ত করে যা বিরতি দেওয়া, অগ্রাধিকার ভিত্তিতে পরিবর্তন করা এবং বাতিল করা যায়। ফলে ভারী রেন্ডারিংয়ের সময়ও ব্রাউজারের মেইন থ্রেড ইউজার ক্লিক বা স্ক্রলিংয়ে সাড়া দিতে পারে এবং ফ্রেম ড্রপ হয় না।",
      e: "Fiber is a complete rewrite of React's reconciler enabling incremental rendering. Each Fiber is a unit of work that can be paused, prioritized, or aborted. Through Cooperative Scheduling and Time Slicing, Concurrent React yields execution back to the browser main thread to handle high-priority interactions like clicks and typing.",
      tip: "ইন্টারভিউতে 'Time Slicing', 'Interruptible Rendering', এবং 'Priority Lanes' টার্মগুলো ব্যাখ্যা করবে।"
    },
    {
      lvl: "lvl3",
      q: "React-এ `useTransition` এবং `useDeferredValue`-এর মধ্যে পার্থক্য কী এবং কখন কোনটি ব্যবহার করবে?",
      m: "`useTransition` ব্যবহার করা হয় যখন কোনো 'স্টেট আপডেটিং ফাংশন' নিজেই কম প্রায়োরিটির হয় (যেমন: ট্যাব সুইচ বা বড় লিস্ট ফিল্টার)। এটি আমাদের `isPending` স্টেট দেয়। আর `useDeferredValue` ব্যবহার করা হয় যখন কোনো 'ভ্যালু' অন্য প্যারেন্ট বা প্রপস থেকে আসে এবং আমরা ওই ভ্যালুটার রেন্ডারিং একটু ডিফার বা পিছিয়ে দিতে চাই। দুটিই ইনপুট টাইপিং বা কীবোর্ড রেসপন্সকে মেইন থ্রেডে স্মুথ রাখতে ব্যবহার করা হয়।",
      b: "useTransition হুকটি সরাসরি স্টেট পরিবর্তনের কোডকে কম অগ্রাধিকারপ্রাপ্ত হিসেবে চিহ্নিত করে এবং লোডিং স্টেট ট্র্যাক করতে isPending ফ্ল্যাগ দেয়। অন্যদিকে useDeferredValue কোনো পরিবর্তনশীল মানের আপডেটকে ব্রাউজার খালি থাকা পর্যন্ত স্থগিত রাখে। উভয় হুকই ব্যবহারকারীর ইনপুট আটকে যাওয়া রোধ করতে ব্যবহৃত হয়।",
      e: "useTransition wraps state-updating dispatch calls to mark them as non-urgent transitions and provides an isPending boolean. useDeferredValue wraps a value directly (e.g. from props) to defer updating dependent UI until high-priority renders finish.",
      code: "const [isPending, startTransition] = useTransition();\nstartTransition(() => setFilteredList(heavyFilter(data)));"
    },
    {
      lvl: "lvl3",
      q: "React 19-এ নতুন `use()` হুকের কাজ কী এবং এটি কনভেনশনাল হুকগুলোর রুলস কীভাবে ব্রেক করে?",
      m: "React 19-এর `use()` হুক দিয়ে কন্ডিশনাল স্টেটমেন্ট (যেমন if-block) বা লুপের ভেতরেও সরাসরি প্রমিজ (Promise) অথবা কনটেক্সট (Context) রিড করা যায়! সাধারণ হুকগুলো কম্পোনেন্টের টপ লেভেলে কল করতে হতো, কিন্তু `use()` হুককে কন্ডিশনের ভেতরে কল করা যায়। যখন `use(promise)` কল করা হয়, প্রমিজ রিজলভ না হওয়া পর্যন্ত React নিকটস্থ Suspense বাউন্ডারিতে ফলব্যাক দেখায়।",
      b: "রিঅ্যাক্ট ১৯-এ প্রবর্তিত `use()` একটি বিশেষ হুক যা শর্তযুক্ত স্টেটমেন্টের ভিতরেও প্রমিজ এবং কনটেক্সট রিড করতে পারে। এটি হুকের সাধারণ নিয়মের ব্যতিক্রম। প্রমিজের সাথে ব্যবহারের সময় এটি সাসপেন্সের সাথে সমন্বয় করে ডাটা লোড না হওয়া পর্যন্ত লোডার প্রদর্শন করে।",
      e: "The `use()` API reads resources like Promises and Context conditionally inside if-statements or loops. Unlike traditional hooks, it can be called conditionally. When reading a promise, it integrates with React Suspense to pause rendering until the promise resolves.",
      code: "function Profile({ userPromise }: { userPromise: Promise<User> }) {\n  const user = use(userPromise); // Pauses render until resolved\n  return <h1>{user.name}</h1>;\n}"
    },
    {
      lvl: "lvl3",
      q: "Server Components (RSC) এবং Client Components-এর ইন্টারনাল বান্ডলিং ও ডেটা এক্সচেঞ্জ আর্কিটেকচার কীভাবে কাজ করে?",
      m: "Server Components শুধুমাত্র সার্ভারে রান হয় এবং এদের কোনো জাভাস্ক্রিপ্ট কোড ক্লায়েন্ট বান্ডেলে যায় না (Zero Bundle Size)। সার্ভার কম্পোনেন্ট রেন্ডার হয়ে একটি স্পেশাল JSON ফরম্যাট (RSC Payload) তৈরি করে ক্লায়েন্টে পাঠায়। ক্লায়েন্ট কম্পোনেন্টে `\"use client\"` ডিরেক্টিভ দেওয়া থাকে, যার কোড ব্রাউজারে হাইড্রেট হয়। সার্ভার কম্পোনেন্ট থেকে ক্লায়েন্টে প্রপস পাস করার সময় ডাটা অবশ্যই সিরিয়ালাইজেবল (Serializable) হতে হয়—কোনো ফাংশন সরাসরি পাস করা যায় না।",
      b: "সার্ভার কম্পোনেন্ট ক্লায়েন্টের জাভাস্ক্রিপ্ট বান্ডেল সাইজ শূন্য রাখে কারণ এটি শুধুমাত্র সার্ভার এনভায়রনমেন্টে এক্সিকিউট হয়। এর আউটপুট আরএসসি পেলোড হিসেবে ব্রাউজারে পাঠানো হয়। ব্রাউজার ক্লায়েন্ট কম্পোনেন্টগুলোকে হাইড্রেট করে এবং এই পেলোডের সাথে যুক্ত করে। প্রপস হিসেবে কেবলমাত্র সিরিয়ালাইজ যোগ্য ডাটা পাঠানো যায়।",
      e: "Server Components execute strictly on the server and emit an RSC Payload (a specialized JSON tree) without shipping component JS to the client. Client components declared with 'use client' hydrate on the client. Props passed from RSC to Client Components must be serializable.",
      tip: "সার্ভার এবং ক্লায়েন্টের বাউন্ডারি পরিষ্কার রাখা Next.js আর্কিটেকচারের সবচেয়ে বড় ইন্টারভিউ প্রশ্ন।"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "একটি বড় টেবিল স্ক্রিনে ১০০০+ রো রেন্ডার হচ্ছে এবং টাইপ করার সময় সার্চ ইনপুট অত্যন্ত ল্যাগ করছে। তুমি কীভাবে এই সমস্যার সমাধান করবে?",
      m: "এখানে মূল সমস্যা দুটি: এক, সার্চ ইনপুটের প্রতি কিস্ট্রোকে ১০০০টি রো রি-রেন্ডার হচ্ছে; দুই, DOM-এ একসাথে এত নোড ব্রাউজার হ্যান্ডেল করতে পারছে না। সমাধান: (১) সার্চ ইনপুটে `useDeferredValue` অথবা `useTransition` ব্যবহার করব যাতে টাইপিং স্টেটকে সর্বোচ্চ প্রায়োরিটি দেওয়া হয় এবং লিস্ট ফিল্টারিং লো প্রায়োরিটিতে চলে। (২) পুরো ১০০০ রো DOM-এ না দিয়ে `@tanstack/react-virtual` দিয়ে Virtualization করব, যাতে শুধু স্ক্রিনে দৃশ্যমান ২০–২৫টি রো রেন্ডার হয়। (৩) টেবিল রো কম্পোনেন্টগুলোকে `React.memo` করব।",
      b: "এই পরিস্থিতি সমাধানের জন্য প্রথমে আমরা ভার্চুয়ালাইজেশন (react-virtualized বা tanstack virtual) ব্যবহার করব, যাতে স্ক্রিনে যে কয়েকটি রো দেখা যায় শুধু সেগুলোর ডম নোড তৈরি হয়। দ্বিতীয়ত, সার্চ ফিল্টারিংয়ের জন্য useTransition অথবা useDeferredValue ব্যবহার করব যাতে কিবোর্ড টাইপিং আটকে না গিয়ে মসৃণ থাকে। এছাড়া কিবোর্ড ইনপুটে ৩০০ মিলিসেকেন্ড ডিবউন্সিং দিতে পারি।",
      e: "I would tackle this with two key techniques: first, DOM virtualization using libraries like TanStack Virtual to only mount the visible rows in the viewport instead of 1000 DOM nodes. Second, use React 18/19's useTransition or useDeferredValue to prioritize user typing over the expensive list re-calculation, accompanied by debouncing on the search input.",
      code: "const [query, setQuery] = useState('');\nconst deferredQuery = useDeferredValue(query);\n// Filter list using deferredQuery"
    },
    {
      lvl: "situation",
      q: "ব্যবহারকারী দ্রুত একাধিক ফিল্টার বাটনে ক্লিক করলে পূর্বের এপিআই রিকোয়েস্টগুলো লেট রেসপন্স দিয়ে বর্তমান স্ক্রিনের ডেটাকে ওভাররাইট করে ফেলে (Race Condition)। কীভাবে এটি সমাধান করবে?",
      m: "এটি একটি ক্লাসিক Race Condition বাগ। সমাধান হলো এপিআই কলের জন্য `AbortController` ব্যবহার করা। প্রতিবার নতুন রিকোয়েস্ট পাঠানোর আগে পূর্বের রিকোয়েস্টকে `controller.abort()` দিয়ে ক্যানসেল করে দিতে হবে। অথবা TanStack Query (React Query) ব্যবহার করলে এটি স্বয়ংক্রিয়ভাবে আউট-অফ-অর্ডার রেসপন্স বাতিল করে কেবল লেটেস্ট রিকোয়েস্টের ক্যাশ ডাটা UI-তে দেখায়।",
      b: "রেস কন্ডিশন প্রতিরোধ করতে ব্রাউজারের AbortController এপিআই ব্যবহার করে প্রতিটি নতুন রিকোয়েস্ট শুরুর আগে পূর্ববর্তী রিকোয়েস্ট বাতিল করতে হবে। অথবা রিকোয়েস্ট আইডির সাথে একটি রিঅ্যাক্ট রিফারেন্স (useRef) রেখে রেসপন্স আসার সময় চেক করা যায় যে এটি সর্বশেষ প্রেরিত রিকোয়েস্ট কি না।",
      e: "This race condition is solved by instantiating an AbortController inside useEffect and aborting previous pending requests in the effect cleanup. Alternatively, TanStack Query handles request cancellation and latest query deduplication out of the box.",
      code: "useEffect(() => {\n  const controller = new AbortController();\n  fetch(`/api/items?filter=${filter}`, { signal: controller.signal })\n    .then(res => res.json())\n    .then(setData)\n    .catch(err => { if (err.name !== 'AbortError') handleError(err); });\n  return () => controller.abort();\n}, [filter]);"
    },
    {
      lvl: "situation",
      q: "একটি কম্পোনেন্ট আনমাউন্ট হয়ে যাওয়ার পরেও এপিআই রেসপন্স এসে `setState` কল করায় কনসোলে মেমোরি লিক ওয়ার্নিং আসছে। কীভাবে সমাধান করবে?",
      m: "React 18-এ এই ওয়ার্নিংটি মূলত সাইলেন্ট করা হলেও আর্কিটেকচারালি এটি খারাপ কারণ অপ্রয়োজনীয় মেমোরি আটকে থাকে। সমাধান: (১) AbortController দিয়ে আনমাউন্টে রিকোয়েস্ট ক্যানসেল করা, (২) একটি মাউন্টেড রেফারেন্স `isMounted = useRef(true)` রাখা এবং ক্লিনআপে `isMounted.current = false` করে `if (isMounted.current) setState(...)` চেক করা।",
      b: "কম্পোনেন্ট আনমাউন্ট হওয়ার পর স্টেট আপডেট প্রতিরোধ করতে ক্লিনআপ ফাংশনে একটি বুলিয়ান ফ্ল্যাগ বা AbortController সিগন্যাল ব্যবহার করতে হবে যাতে রেসপন্স ডাটা হ্যান্ডলারটি শুধুমাত্র কম্পোনেন্ট জীবিত থাকলেই এক্সিকিউট হয়।",
      e: "Solve this by cancelling in-flight promises via AbortController in useEffect's cleanup function, or guarding state updates with a mounted ref flag to verify the component is still mounted before setting state.",
      code: "useEffect(() => {\n  let isMounted = true;\n  apiCall().then(data => { if (isMounted) setState(data); });\n  return () => { isMounted = false; };\n}, []);"
    },
    {
      lvl: "situation",
      q: "তোমার অ্যাপে একটি ড্যাশবোর্ড উইজেট প্রতি ৩ সেকেন্ড পর পর পল করে ডাটা আনে, কিন্তু ইউজার অন্য ট্যাবে গেলে অপ্রয়োজনীয় ব্যাকগ্রাউন্ড রিকোয়েস্ট ব্যান্ডউইথ নষ্ট করে। কীভাবে সমাধান করবে?",
      m: "আমরা ব্রাউজারের `Page Visibility API` ব্যবহার করব (`document.hidden` বা `visibilitychange` ইভেন্ট লিসেনার)। ইউজার যখন ট্যাবে থাকবে না তখন টাইমার পজ রাখব এবং ট্যাবে ফিরে আসলে সাথে সাথে একবার রিফ্রেশ করে আবার পোboundaries চালু করব। TanStack Query-তে এটি `refetchOnWindowFocus: true` দিয়ে বিল্ট-ইন হ্যান্ডেল করা থাকে।",
      b: "ব্রাউজারের পেজ ভিজিবিলিটি এপিআই ব্যবহার করে ট্যাব নিষ্ক্রিয় থাকা অবস্থায় পোলিং স্থগিত রাখতে হবে। যখন ব্যবহারকারী পুনরায় ট্যাবে ফিরে আসবে, তখনই কেবল সর্বশেষ ডেটা আনার জন্য নতুন রিকোয়েস্ট পাঠানো হবে।",
      e: "Use the browser's Page Visibility API listening to the 'visibilitychange' event to pause polling when document.hidden is true, resuming when visible. TanStack Query automatically provides this behavior via refetchOnWindowFocus.",
      code: "useEffect(() => {\n  const handleVisibility = () => {\n    if (document.hidden) stopPolling();\n    else startPolling();\n  };\n  document.addEventListener('visibilitychange', handleVisibility);\n  return () => document.removeEventListener('visibilitychange', handleVisibility);\n}, []);"
    },
    {
      lvl: "situation",
      q: "একটি নেস্টেড ড্রপডাউন মেনু যখন স্ক্রিনের একদম ডানে বা নিচে ওপেন হয়, তখন স্ক্রিন কেটে যায় বা স্ক্রলবার তৈরি হয়। হুক দিয়ে কীভাবে পজিশনিং হ্যান্ডেল করবে?",
      m: "আমরা একটি কাস্টম হুক `useClickOutsideAndPosition` তৈরি করব যা `getBoundingClientRect()` দিয়ে ট্রিগার বাটন এবং ভিউপোর্টের উচ্চতা ও প্রস্থ চেক করবে। ড্রপডাউন ওপেন হওয়ার সময় যদি নিচে জায়গা না থাকে তবে `top` না দিয়ে `bottom` এ ফ্লিপ করবে এবং ডানে জায়গা না থাকলে বামে অ্যালাইন করবে। অথবা সরাসরি React Portal এবং Floating UI / Radix Popper ব্যবহার করব।",
      b: "কাস্টম হুকের মাধ্যমে এলিমেন্টের getBoundingClientRect হিসাব করে ভিউপোর্টের সীমানা চেক করতে হবে। পর্যাপ্ত জায়গা না থাকলে ড্রপডাউনের পজিশন স্বয়ংক্রিয়ভাবে রিভার্স বা ফ্লিপ করতে হবে অথবা রিঅ্যাক্ট পোর্টাল দিয়ে বডির নিচে রেন্ডার করে ফিক্সড পজিশনিং দিতে হবে।",
      e: "Compute bounds using getBoundingClientRect() inside a custom positioning hook to dynamically flip placement (e.g. from bottom to top or right to left) based on remaining viewport space, or render through a React Portal using Floating UI.",
      code: "const rect = buttonRef.current.getBoundingClientRect();\nconst spaceBelow = window.innerHeight - rect.bottom;\nconst shouldFlipTop = spaceBelow < dropdownHeight;"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এ বারকোড স্ক্যানার দিয়ে প্রতি সেকেন্ডে ৫-১০টি আইটেম দ্রুত স্ক্যান করার সময় কার্ট স্টেট মিস হওয়া বা ল্যাগ কীভাবে রোধ করেছিলে?",
      m: "বারকোড স্ক্যানার সরাসরি কীবোর্ড এমুলেটর হিসেবে দ্রুত ক্যারেক্টার পাঠায়। সাধারণ onChange বা useState দিলে প্রতি ক্যারেক্টারে রি-রেন্ডার হয়ে কার্ট আটকে যায়। সমাধান: (১) গ্লোবাল কীবোর্ড ইভেন্টে বাফার রেখে যখন 'Enter' (স্ক্যান কমপ্লিট) আসে, তখন পুরো বারকোড একসাথে ধরি। (২) কার্ট মিউটেশনে `useReducer` দিয়ে অ্যাকশন প্রসেস করি এবং দ্রুত স্ক্যানগুলোর জন্য একটি মাইক্রোটাস্ক কিউ (Queue) রাখি যাতে আগের আইটেম যোগ হওয়ার আগেই পরেরটা মিস না হয়। (৩) কার্ট আইটেম লিস্টে মেমোইজড রো কম্পোনেন্ট ব্যবহার করায় POS ইন্টারফেসে ৬০ FPS স্মুথ থাকে।",
      b: "দোকানি পিওএসে উচ্চগতির বারকোড স্ক্যানিং সামলাতে আমরা কীবোর্ড বাফারিং লজিক তৈরি করেছিলাম যা এন্টার চাপার পর সম্পূর্ণ বারকোড একসাথে শনাক্ত করে। দ্রুত একাধিক স্ক্যানের ক্ষেত্রে স্টেট লস ঠেকাতে useReducer এর ডিসপ্যাচ কিউ এবং মেমোইজড কম্পোনেন্ট ব্যবহার করে তাৎক্ষণিক বিলিং নিশ্চিত করা হয়েছিল।",
      e: "In Dokani POS, barcode scanners rapidly emulate keystrokes. We implemented a keyboard buffer capturing the full barcode until the carriage return character. State mutations were driven by useReducer with a synchronous action queue, combined with memoized table rows to sustain 60fps under intensive checkout.",
      tip: "বারকোড স্ক্যানার যে কোনো সাধারণ কীবোর্ডের মতো KeyDown ইভেন্ট ফায়ার করে—এই বাস্তব অভিজ্ঞতা ইন্টারভিউয়ারের কাছে তোমার প্রজেক্টের গভীরতা প্রমাণ করবে।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর অফলাইন ক্যাশিং ও নেটওয়ার্ক ড্রপ হলে রিঅ্যাক্ট অ্যাপ কীভাবে ডাটা হারানো ছাড়া ব্যাকগ্রাউন্ডে সিঙ্ক করে?",
      m: "দোকানদার যখন সেলস বিল করছে তখন ইন্টারনেট চলে গেলেও যাতে ক্যাশ কাউন্টার বন্ধ না হয়, সেজন্য আমরা IndexedDB (via Dexie.js) এ সেলস অর্ডার তৎক্ষণাৎ লোকালি সেভ করি। রিঅ্যাক্ট লেয়ারে `navigator.onLine` এবং Service Worker ব্যাকগ্রাউন্ড সিঙ্ক দিয়ে কানেকশন ব্যাক আসার সাথে সাথে অফলাইন কিউতে জমে থাকা ট্রানজিশনগুলো সার্ভারে ব্যাচ আকারে পোস্ট করি এবং লোকাল রেকর্ডকে 'Synced' স্ট্যাটাস দিই।",
      b: "ইন্টারনেট বিচ্ছিন্ন হলেও বিক্রি চালু রাখতে আমরা ব্রাউজারের ইনডেক্সড-ডিবি (IndexedDB) ব্যবহার করে অফলাইন অর্ডার সংরক্ষণ করি। সংযোগ পুনরুদ্ধার হলে ব্যাকগ্রাউন্ড সিঙ্ক প্রসেস স্বয়ংক্রিয়ভাবে পেন্ডিং বিলগুলো সার্ভারে পাঠিয়ে ডাটাবেজ আপডেট নিশ্চিত করে।",
      e: "To support offline retail operations in Dokani, sales transactions are instantly committed to browser IndexedDB. Upon network restoration, an optimistic queue synchronizes local orders in batches to the backend API without freezing the UI thread.",
      code: "window.addEventListener('online', () => syncPendingOfflineOrders());"
    },
    {
      lvl: "realworld",
      q: "PTTABD ই-লার্নিং পোর্টালে ভিডিও লেকচার চলাকালীন প্লেব্যাক পজিশন প্রতি ৫ সেকেন্ডে অটো-সেভ করতে গিয়ে সার্ভারে অপ্রয়োজনীয় ওভারহেড কীভাবে অপটিমাইজ করেছিলে?",
      m: "ভিডিও প্লেয়ারের `onTimeUpdate` প্রতি ২৫০ মিলিসেকেন্ডে ফায়ার হয়। যদি প্রতিবার এপিআই কল করতাম তবে হাজার হাজার ছাত্রের জন্য সার্ভার ক্র্যাশ করত। সমাধান: (১) আমরা একটি কাস্টম `useThrottledCallback` তৈরি করি যা লোকাল মেমোরি ও লোকালস্টোরেজে প্রতি ৫ সেকেন্ডে টাইমস্ট্যাম্প রাখে। (২) কেবল ভিডিও পজ হলে বা পেজ ক্লোজ (`beforeunload`) করার সময় `navigator.sendBeacon` দিয়ে সার্ভারে চূড়ান্ত ওয়াচ-টাইম সেভ করি, ফলে ৯৫% সার্ভার রিকোয়েস্ট কমে যায়।",
      b: "ভিডিওর অন-টাইম-আপডেট ইভেন্টে প্রতিমুহূর্তে সার্ভার কল না করে আমরা ক্লায়েন্ট সাইডে থ্রটলিং ব্যবহার করেছিলাম। লোকালস্টোরেজে সময় জমিয়ে রেখে শুধুমাত্র ভিডিও পজ বা ট্যাব বন্ধের মুহূর্তে sendBeacon এর মাধ্যমে সার্ভারে ডাটা পাঠিয়ে সার্ভারের লোড বহুলাংশে কমানো হয়েছিল।",
      e: "Instead of firing API requests on continuous onTimeUpdate events, we throttled client-side tracking to localStorage and dispatched the final playback timestamp to the server only on video pause or page unload via navigator.sendBeacon.",
      tip: "ইন্টারভিউতে `navigator.sendBeacon` এর কথা বললে বোঝা যায় তুমি প্রোডাকশন ট্রাফিক ও পারফরম্যান্স অপটিমাইজেশনে দক্ষ।"
    },
    {
      lvl: "realworld",
      q: "বড় কোনো ই-কমার্স বা মার্কেটপ্লেস অ্যাপে হাজার হাজার পণ্যের ইমেজ লোড করার সময় ব্রাউজার মেমোরি ও ব্যান্ডউইথ কীভাবে অপটিমাইজ করবে?",
      m: "সমাধান: (১) ইমেজগুলোকে `loading='lazy'` এবং Next.js-এর `<Image>` কম্পোনেন্ট দিয়ে WebP/AVIF ফরম্যাটে অটোমেটিক রেসপনসিভ সাইজিংয়ে সার্ভ করব। (২) Blur-up প্লেসহোল্ডার (LQIP - Low Quality Image Placeholder) ব্যবহার করব যাতে লেআউট শিফট (CLS - Cumulative Layout Shift) ০ থাকে। (৩) স্ক্রিনের বাইরে থাকা ইমেজের জন্য `IntersectionObserver` দিয়ে কেবল ভিউপোর্টে আসার ১০০ পিক্সেল আগে ফেচ ট্রিগার করব।",
      b: "উচ্চ ব্যান্ডউইথ সাশ্রয়ের জন্য আধুনিক WebP বা AVIF ফরম্যাট, লেজি লোডিং এবং ইন্টারসেকশন অবজারভার ব্যবহার করা হয়। নেক্সট জেএস ইমেজ কম্পোনেন্ট স্বয়ংক্রিয়ভাবে ডিভাইসের রেজোলিউশন অনুযায়ী অপটিমাইজড ছবি সরবরাহ করে এবং লেআউট শিফট প্রতিরোধ করে।",
      e: "Leverage Next.js Image with modern formats (AVIF/WebP), responsive srcSet generation, priority attributes for above-the-fold hero images, and blur-up placeholders to eliminate Cumulative Layout Shift (CLS) while minimizing bandwidth.",
      code: "<Image src={product.img} alt={product.title} width={400} height={300} placeholder='blur' blurDataURL={product.blur} />"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর থার্মাল প্রিন্টার ইন্টারফেসে প্রিন্ট ডায়ালগ ওপেন করার সময় রিঅ্যাক্ট অ্যাপ ফ্রিজ হওয়া কীভাবে টেকনিক্যালি এড়ানো হয়েছিল?",
      m: "ব্রাউজারের `window.print()` একটি সিনক্রোনাস ব্লকিং কল যা চললে জাভাস্ক্রিপ্ট ইভেন্ট লুপ সম্পূর্ণ পজ হয়ে যায়। সমাধান: (১) আমরা প্রিন্ট রিকোয়েস্টকে একটি হিডেন `<iframe>` এর ভেতর প্রিন্ট স্টাইলশিট সহ ইনজেক্ট করি। (২) আধুনিক থার্মাল ক্যাশ ড্রয়ার ও প্রিন্টারের জন্য Web Bluetooth API অথবা লোকাল নোড ভিত্তিক প্রিন্টিং এজেন্টের মাধ্যমে র কাঁচা ESC/POS বাইট কোড সকেট দিয়ে পাঠিয়েছি, ফলে ব্রাউজারের কোনো ডিফল্ট প্রিন্ট ডায়ালগ ছাড়াই ১ মিলি-সেকেন্ডে ইনভয়েস বের হয়ে আসে।",
      b: "window.print() ব্রাউজারের মেইন থ্রেডকে ব্লক করে রাখে। দোকানি সিস্টেমে আমরা আইফ্রেম কৌশল অথবা লোকাল সার্ভারে সরাসরি ইএসসি/পিওএস (ESC/POS) কমান্ড পাঠিয়ে ব্যাকগ্রাউন্ডে সাইড-ইফেক্ট ছাড়া তাৎক্ষণিক থার্মাল রসিদ প্রিন্ট করার ব্যবস্থা করেছিলাম।",
      e: "Since window.print() is a synchronous blocking API, we isolated print layouts inside a detached hidden iframe or bypassed the browser dialog entirely by streaming raw ESC/POS commands directly over WebUSB / local microservices for instantaneous thermal receipts.",
      tip: "থার্মাল প্রিন্টারে ESC/POS কমান্ড দিয়ে র প্রিন্টিং করার এই বাস্তব উদাহরণ যেকোনো সিনিয়র ইন্টারভিউতে অবিশ্বাস্য প্লাস পয়েন্ট।"
    }
  ]
};
