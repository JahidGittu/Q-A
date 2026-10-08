// NT Tech Innovation — 01. Frontend Engineering Mastery (225 Questions - 25 per Topic across 5 Levels)
window.NT_DATA = window.NT_DATA || {};
window.NT_DATA.frontend = {
  "id": "frontend",
  "title": "Frontend Engineering",
  "badge": "React · Next.js · TypeScript · Tailwind · Testing",
  "icon": "⚛️",
  "topics": [
    {
      "id": "react-hooks-core",
      "name": "React.js & React Hooks",
      "desc": "Virtual DOM, Reconciliation, useState, useEffect, useRef, useMemo, useCallback, useTransition, Custom Hooks",
      "items": [
        {
          "lvl": "lvl1",
          "q": "React-এর Virtual DOM কী এবং এটি ব্রাউজারের Real DOM-এর চেয়ে কীভাবে দ্রুত কাজ করে?",
          "m": "Virtual DOM হলো আসল Real DOM-এর একটি lightweight JavaScript object representation। Real DOM সরাসরি ম্যানিপুলেট করা খুব expensive কারণ পুরো DOM tree রি-পেইন্ট ও রি-ফ্লো হয়। React প্রতিবার স্টেট পরিবর্তনের পর নতুন Virtual DOM তৈরি করে এবং 'Diffing Algorithm' চালিয়ে আগের Virtual DOM-এর সাথে তুলনা করে। শুধু যে নোডগুলো পরিবর্তন হয়েছে, কেবল সেগুলোকেই ব্যাচ আকারে আসল DOM-এ আপডেট করে (Reconciliation)।",
          "b": "ভার্চুয়াল ডম হলো মেমোরিতে থাকা একটি জাভাস্ক্রিপ্ট অবজেক্ট যা আসল ব্রাউজার ডমের প্রতিচ্ছবি। যখন কম্পোনেন্টের স্টেট বা প্রপস পরিবর্তন হয়, রিঅ্যাক্ট দুটি ভার্চুয়াল ডমের মধ্যে পার্থক্য নির্ণয় করে (Diffing) এবং শুধুমাত্র পরিবর্তিত অংশটুকু ব্রাউজারের মূল ডমে আপডেট করে। ফলে ব্রাউজারকে পুরো পেজ বারবার রি-রেন্ডার করতে হয় না এবং অ্যাপ অনেক দ্রুত চলে।",
          "e": "The Virtual DOM is an in-memory lightweight JavaScript representation of the real DOM. When state changes occur, React creates a new Virtual DOM tree and runs a diffing algorithm (Reconciliation) to find the minimal differences. It then applies only these specific updates in batches to the real DOM, avoiding expensive browser reflows and repaints.",
          "tip": "ইন্টারভিউতে 'Reconciliation' এবং 'Batching' শব্দ দুটি উল্লেখ করলে তোমার উত্তর অনেক বেশি প্রফেশনাল শোনাবে।"
        },
        {
          "lvl": "lvl1",
          "q": "useState এবং useRef-এর মধ্যে মূল পার্থক্য কী? কখন কোনটি ব্যবহার করবে?",
          "m": "useState স্টেট পরিবর্তন হলে কম্পোনেন্টকে রি-রেন্ডার করায়, কিন্তু useRef-এর মান পরিবর্তন হলে কম্পোনেন্ট রি-রেন্ডার হয় না। যেমন: কাউন্টারে লাইভ ডাটা বা ফর্ম ফিল্ডে চেঞ্জ দেখাতে useState ব্যবহার করি। আর কোনো DOM উপাদান সরাসরি ধরা (যেমন: ইনপুট বক্সে ফোকাস করা), টাইমার আইডি সংরক্ষণ করা, বা পূর্বের স্টেট ট্র্যাক করার জন্য useRef ব্যবহার করি।",
          "b": "useState কম্পোনেন্টের স্টেট সংরক্ষণ করে এবং মান পরিবর্তন হলে পুরো কম্পোনেন্ট রি-রেন্ডার হয়। অন্যদিকে useRef একটি মিউটেবল অবজেক্ট প্রদান করে যার '.current' প্রপার্টি পরিবর্তন হলেও কম্পোনেন্ট রি-রেন্ডার হয় না। সরাসরি এইচটিএমএল ডম উপাদান ধরা বা রেন্ডারিং প্রভাবিত না করে মান ধরে রাখতে useRef ব্যবহৃত হয়।",
          "e": "useState stores component state and triggers a re-render whenever the state value updates. In contrast, useRef persists a mutable value in its .current property across renders without triggering a re-render. We use useState for UI-driven data and useRef for direct DOM access or storing values like interval IDs.",
          "code": "const inputRef = useRef<HTMLInputElement>(null);\nconst focusInput = () => inputRef.current?.focus();"
        },
        {
          "lvl": "lvl1",
          "q": "React Component Lifecycle-এর মূল ৩টি ফেজ কী এবং ফাংশনাল কম্পোনেন্টে হুক দিয়ে এগুলো কীভাবে হ্যান্ডেল করা হয়?",
          "m": "৩টি মূল ফেজ হলো: Mounting (DOM-এ কম্পোনেন্ট আসা), Updating (স্টেট/প্রপস পরিবর্তনে রি-রেন্ডার হওয়া), এবং Unmounting (DOM থেকে মুছে ফেলা)। ফাংশনাল কম্পোনেন্টে useEffect দিয়ে এগুলো কন্ট্রোল করা হয়: খালি ডিপেনডেন্সি `[]` দিলে মাউন্টিং, ভ্যারিয়েবল ডিপেনডেন্সি `[count]` দিলে আপডেটিং, এবং useEffect থেকে রিটার্ন করা ক্লিনআপ ফাংশন দিয়ে আনমাউন্টিং হ্যান্ডেল করা হয়।",
          "b": "রিঅ্যাক্ট কম্পোনেন্টের জীবনচক্র তিনটি ধাপে বিভক্ত: মাউন্টিং (কম্পোনেন্ট প্রথমবার ডমে যুক্ত হওয়া), আপডেটিং (স্টেট বা প্রপস পরিবর্তনে পুনরায় রেন্ডার হওয়া), এবং আনমাউন্টিং (ডম থেকে অপসারিত হওয়া)। ফাংশনাল কম্পোনেন্টে useEffect হুকের ডিপেনডেন্সি অ্যারে এবং ক্লিনআপ ফাংশনের সমন্বয়ে এই ধাপগুলো পরিচালিত হয়।",
          "e": "The three primary phases are Mounting, Updating, and Unmounting. In functional components, useEffect manages all three: an empty dependency array [] simulates componentDidMount, passing dependencies simulates componentDidUpdate, and returning a cleanup function acts as componentWillUnmount.",
          "code": "useEffect(() => {\n  console.log('Mounted');\n  return () => console.log('Unmounted');\n}, []);"
        },
        {
          "lvl": "lvl1",
          "q": "React-এ JSX কী এবং ব্রাউজার কীভাবে JSX কোড রিড করে?",
          "m": "JSX মানে JavaScript XML। এটি জাভাস্ক্রিপ্টের মধ্যে HTML-এর মতো সিনট্যাক্স লেখার সুবিধা দেয়। ব্রাউজার সরাসরি JSX বুঝতে পারে না। Babel বা SWC কম্পাইলার JSX-কে সাধারণ `React.createElement()` ফাংশন কলে রূপান্তর করে, যা প্লেইন জাভাস্ক্রিপ্ট অবজেক্ট রিটার্ন করে এবং ব্রাউজার তা এক্সিকিউট করতে পারে।",
          "b": "জেএসএক্স হলো জাভাস্ক্রিপ্টের একটি সিনট্যাক্স এক্সটেনশন যা জাভাস্ক্রিপ্ট ফাইলের ভিতরে এইচটিএমএল কোডের মতো স্ট্রাকচার লিখতে সাহায্য করে। ব্রাউজার সরাসরি জেএসএক্স পড়তে পারে না; বাবেল (Babel) বা এসডব্লিউসি (SWC) এর মতো ট্রান্সপিলার এটিকে সাধারণ React.createElement ফাংশন কলে কনভার্ট করে।",
          "e": "JSX stands for JavaScript XML, allowing developers to write HTML-like syntax inside JavaScript. Browsers cannot execute JSX directly. Compilers like Babel or SWC transpile JSX into standard React.createElement() calls that evaluate into plain JavaScript objects.",
          "code": "// JSX:\nconst element = <h1 className='title'>Hello</h1>;\n// Transpiled:\nconst element = React.createElement('h1', { className: 'title' }, 'Hello');"
        },
        {
          "lvl": "lvl1",
          "q": "React-এ List রেন্ডার করার সময় 'key' প্রপ কেন আবশ্যক এবং ইনডেক্সকে কী হিসেবে ব্যবহার করা কেন খারাপ প্র্যাকটিস?",
          "m": "React ভার্চুয়াল ডম ডিফারেন্সে প্রতিটি লিস্ট আইটেমকে ট্র্যাক করার জন্য ইউনিক 'key' ব্যবহার করে। কী না দিলে কোনো আইটেম ডিলিট বা রিঅর্ডার হলে পুরো লিস্ট রি-রেন্ডার হয়। অ্যারে ইনডেক্স (`index`) কী হিসেবে ব্যবহার করলে আইটেম ফিল্টার বা সর্ট করার সময় ভুল স্টেট ম্যাপ হয়ে যায় এবং ইনপুট ফিল্ডের ভ্যালু এলোমেলো হয়ে বাগ তৈরি করে। তাই সবসময় ডাটাবেজের ইউনিক `id` দেওয়া উচিত।",
          "b": "লিস্টের প্রতিটি এলিমেন্টকে ট্র্যাক করতে রিঅ্যাক্টের একটি অনন্য আইডেন্টিফায়ার প্রয়োজন হয়, যা হলো key। ইনডেক্সকে key হিসেবে ব্যবহার করলে উপাদানগুলো সাজানো, যোগ বা মুছে ফেলার সময় ইনপুট স্টেট অমিল হয়ে গুরুতর রেন্ডারিং বাগ তৈরি হয়। তাই ডাটার অনন্য আইডি (যেমন: item.id) key হিসেবে ব্যবহার করা আবশ্যক।",
          "e": "Keys help React identify which items have changed, been added, or removed during Reconciliation. Using array indices as keys leads to UI bugs and broken component state when lists are reordered, sorted, or filtered because React cannot preserve individual item state correctly.",
          "tip": "কখনোই `key={index}` ব্যবহার করবে না, সবসময় `key={item.id}` ব্যবহার করবে।"
        },
        {
          "lvl": "lvl2",
          "q": "useEffect-এর ডিপেনডেন্সি অ্যারে (Dependency Array) কীভাবে কাজ করে এবং মেমোরি লিক রোধে ক্লিনআপ ফাংশন কীভাবে সাহায্য করে?",
          "m": "useEffect-এ ৩ রকম ডিপেনডেন্সি দেওয়া যায়: (১) অ্যারে না দিলে প্রতি রেন্ডারে চলে, (২) ফাঁকা অ্যারে `[]` দিলে শুধু কম্পোনেন্ট মাউন্ট হওয়ার সময় একবার চলে, (৩) ভেরিয়েবল `[id, user]` দিলে ওই মানগুলো পরিবর্তন হলেই শুধু ইফেক্ট রান করে। যখন আমরা কোনো ইভেন্ট লিসেনার, সকেট কানেকশন বা টাইমার চালাই, কম্পোনেন্ট আনমাউন্ট হওয়ার সময় রিটার্ন ফাংশনের মাধ্যমে সেগুলো ক্লিনআপ না করলে ব্যাকগ্রাউন্ডে মেমোরি লিক হয়।",
          "b": "ডিপেনডেন্সি অ্যারে রিঅ্যাক্টকে বলে দেয় কখন ইফেক্ট ফাংশনটি এক্সিকিউট করতে হবে। ফাঁকা থাকলে মাউন্টে একবার চলে, আর ভ্যারিয়েবল থাকলে তার মান পরিবর্তনের উপর নির্ভর করে চলে। ইফেক্ট ফাংশন থেকে একটি ক্লিনআপ ফাংশন রিটার্ন করা যায়, যা কম্পোনেন্ট আনমাউন্ট হওয়ার সময় বা পরবর্তী ইফেক্ট চলার আগে রান হয়ে টাইমার বা সকেট ডিসকানেক্ট করে মেমোরি লিক রোধ করে।",
          "e": "The dependency array determines when the effect executes: without an array it runs on every render, with an empty array it runs once on mount, and with variables it re-runs when those values change. Returning a cleanup function allows us to unsubscribe from sockets, remove event listeners, or clear timers when the component unmounts, preventing memory leaks.",
          "code": "useEffect(() => {\n  const timer = setInterval(() => tick(), 1000);\n  return () => clearInterval(timer); // Cleanup\n}, []);"
        },
        {
          "lvl": "lvl2",
          "q": "useMemo এবং useCallback-এর মধ্যে সুনির্দিষ্ট পার্থক্য কী? অপ্রয়োজনে এগুলো ব্যবহার করার ক্ষতিকর দিক কী?",
          "m": "useMemo কোনো জটিল ক্যালকুলেশনের 'রেজাল্ট বা ভ্যালু' মেমোইজ করে রাখে, আর useCallback পুরো 'ফাংশন রেফারেন্স' মেমোইজ করে রাখে যাতে প্যারেন্ট রি-রেন্ডার হলেও চাইল্ড কম্পোনেন্টে নতুন ফাংশন পাস হয়ে অপ্রয়োজনীয় চাইল্ড রেন্ডার না হয়। ক্ষতিকর দিক হলো: ছোটখাটো ফাংশন বা সহজ হিসেবে মেমোইজেশন ব্যবহার করলে উল্টো অতিরিক্ত মেমোরি খরচ হয় এবং রিঅ্যাক্টের ইন্টারনাল ডিপেনডেন্সি চেকিংয়ের জন্য অ্যাপ স্লো হতে পারে।",
          "b": "useMemo ফাংশন এক্সিকিউট করে প্রাপ্ত ফলাফল বা রিটার্ন ভ্যালু ক্যাশ করে, অন্যদিকে useCallback ফাংশনের রেফারেন্সকে ক্যাশ করে যাতে চাইল্ডে প্রপ হিসেবে ফাংশন যাওয়ার সময় রি-রেন্ডার এড়ানো যায়। প্রতিটি মেমোইজেশন মেমোরিতে স্পেস নেয় এবং ডিপেনডেন্সি তুলনা করতে সিপিইউ ব্যবহার করে, তাই ভারী কম্পুটেশন বা অপটিমাইজড চাইল্ড ছাড়া সাধারণ কাজে এটি ব্যবহারে উল্টো পারফরম্যান্স কমে।",
          "e": "useMemo memoizes the returned result of an expensive calculation, whereas useCallback memoizes the function definition itself across renders. Premature or unnecessary usage can degrade performance because comparing dependencies and maintaining internal memo caches consumes memory and CPU cycles.",
          "code": "const memoizedValue = useMemo(() => computeHeavyData(list), [list]);\nconst memoizedFn = useCallback((id: string) => handleItem(id), []);"
        },
        {
          "lvl": "lvl2",
          "q": "Custom Hook কী এবং কখন আমাদের একটি কাস্টম হুক তৈরি করা উচিত?",
          "m": "Custom Hook হলো একটি জাভাস্ক্রিপ্ট ফাংশন যার নাম 'use' দিয়ে শুরু হয় এবং এর ভেতর রিঅ্যাক্টের বিল্ট-ইন হুকগুলো (useState, useEffect ইত্যাদি) কল করা যায়। যখন একাধিক কম্পোনেন্টে একই স্টেটফুল লজিক বারবার প্রয়োজন হয় (যেমন: উইন্ডো সাইজ ট্র্যাক করা, লোকাল স্টোরেজ সিঙ্ক, বা ডেটা ফেচিং), তখন কোড ডুপ্লিকেশন এড়াতে আমরা কাস্টম হুক তৈরি করি।",
          "b": "কাস্টম হুক হলো এমন একটি পুনঃব্যবহারযোগ্য জাভাস্ক্রিপ্ট ফাংশন যা রিঅ্যাক্টের অন্যান্য হুক ব্যবহার করে স্টেটফুল লজিক শেয়ার করে। একই লজিক একাধিক কম্পোনেন্টে কপি-পেস্ট না করে আলাদা ফাইলে কাস্টম হুক বানিয়ে পরিষ্কার আর্কিটেকচার তৈরি করা যায়।",
          "e": "A Custom Hook is a reusable JavaScript function whose name starts with 'use' and can invoke other React hooks. We create custom hooks to extract and share stateful logic across multiple components (e.g., useWindowSize, useLocalStorage, useDebounce) without duplicating code.",
          "code": "function useDebounce<T>(value: T, delay: number): T {\n  const [debounced, setDebounced] = useState(value);\n  useEffect(() => {\n    const handler = setTimeout(() => setDebounced(value), delay);\n    return () => clearTimeout(handler);\n  }, [value, delay]);\n  return debounced;\n}"
        },
        {
          "lvl": "lvl2",
          "q": "React.memo কীভাবে কাজ করে এবং এটি কখন ব্যবহার করা ফলপ্রসূ?",
          "m": "React.memo হলো একটি Higher Order Component (HOC) যা চাইল্ড কম্পোনেন্টকে র্যাপ করে। যদি কম্পোনেন্টের প্রপস পরিবর্তন না হয়, তাহলে প্যারেন্ট রি-রেন্ডার হলেও চাইল্ড কম্পোনেন্ট রি-রেন্ডার হবে না (Shallow comparison)। এটি ব্যবহার করা ফলপ্রসূ যখন চাইল্ড কম্পোনেন্টটি অনেক বড় বা ভারী UI রেন্ডার করে এবং প্যারেন্ট ঘন ঘন রি-রেন্ডার হয়। তবে প্রপস হিসেবে আন-মেমোইজড অবজেক্ট বা ফাংশন পাস করলে React.memo কোনো কাজ করে না।",
          "b": "React.memo একটি উচ্চতর কম্পোনেন্ট যা প্রপস পরিবর্তন না হলে কম্পোনেন্টকে পুনরায় রেন্ডার হওয়া থেকে বিরত রাখে। এটি প্রপসের শ্যালো তুলনা করে। যেসব কম্পোনেন্টের রেন্ডারিং ভারী এবং একই প্রপস নিয়ে বারবার রেন্ডার হয়, সেগুলোতে React.memo ব্যবহারে রেন্ডারিং পারফরম্যান্স অনেক বৃদ্ধি পায়।",
          "e": "React.memo is a higher-order component that memoizes the rendered output of a component. If its props have not changed (via shallow comparison), React skips rendering that component. It is effective for heavy UI components whose parent re-renders frequently with unchanged props.",
          "code": "const ProductCard = React.memo(({ item }: { item: Product }) => {\n  return <div className='card'>{item.title}</div>;\n});"
        },
        {
          "lvl": "lvl2",
          "q": "React-এ Batching কী এবং React 18-এর Automatic Batching কীভাবে কাজ করে?",
          "m": "Batching হলো একাধিক স্টেট আপডেটকে একসাথে গ্রুপ করে মাত্র একবার কম্পোনেন্ট রি-রেন্ডার করার মেকানিজম। React 17 বা আগের ভার্সনে শুধুমাত্র রিঅ্যাক্ট ইভেন্ট হ্যান্ডলারের ভেতরে ব্যাচিং হতো; কিন্তু setTimeout, Promise বা ফেচ রিকোয়েস্টের ভেতর স্টেট চেঞ্জ করলে প্রতিটির জন্য আলাদা রেন্ডার হতো। React 18-এ 'Automatic Batching' আনা হয়েছে, যার ফলে প্রমিজ, টাইমআউট বা নেটিভ ইভেন্টেও সব স্টেট আপডেট স্বয়ংক্রিয়ভাবে একটি মাত্র রেন্ডারে ব্যাচ হয়।",
          "b": "ব্যাচিং হলো পারফরম্যান্স অপটিমাইজেশনের কৌশল যেখানে একাধিক স্টেট আপডেটকে একটিমাত্র রেন্ডার সাইকেলে সম্পন্ন করা হয়। রিঅ্যাক্ট ১৮-এর অটোমেটিক ব্যাচিংয়ের কারণে প্রমিজ, টাইমআউট বা অ্যাসিনক্রোনাস কলের ভেতরেও একাধিক স্টেট পরিবর্তন করলে ব্রাউজারে মাত্র একবার রি-রেন্ডার হয়।",
          "e": "Batching is when React groups multiple state updates into a single re-render for better performance. In React 18, Automatic Batching applies across all contexts—including promises, setTimeout, and native event listeners—ensuring consistent single re-renders.",
          "code": "// React 18: Only 1 re-render occurs\nsetTimeout(() => {\n  setCount(c => c + 1);\n  setFlag(f => !f);\n}, 1000);"
        },
        {
          "lvl": "lvl3",
          "q": "React 19-এর Actions এবং `useActionState`, `useOptimistic` কীভাবে ট্র্যাডিশনাল ফর্ম ও এপিআই সাবমিশনকে পরিবর্তন করেছে?",
          "m": "আগে ফর্ম সাবমিট করার সময় আমাদের ম্যানুয়ালি `const [loading, setLoading] = useState(false)` এবং ট্রাই-ক্যাচ দিয়ে এরর স্টেট ম্যানেজ করতে হতো। React 19-এ আসিনক্রোনাস ফাংশনকে ট্রানজিশন বা অ্যাকশন হিসেবে পাস করা যায়। `useActionState` স্বয়ংক্রিয়ভাবে অ্যাকশনের পেন্ডিং স্টেট, রেসপন্স ডাটা ও এরর রিটার্ন করে। আর `useOptimistic` দিয়ে সার্ভার রেসপন্স আসার আগেই UI-তে ডেটা আপডেট দেখিয়ে দেওয়া যায় (যেমন লাইক বাটন বা কার্ট আইটেম), আর ফেইল করলে নিজে থেকেই রোলব্যাক করে।",
          "b": "রিঅ্যাক্ট ১৯-এ ফর্ম ও সার্ভার মিউটেশনকে সহজ করতে অ্যাকশন ধারণা এসেছে। useActionState অ্যাসিনক্রোনাস অ্যাকশনের লোডিং স্টেট, ফর্ম স্টেট এবং এরর নিজে থেকেই পরিচালনা করে। useOptimistic হুকের মাধ্যমে নেটওয়ার্ক রিকোয়েস্ট চলাকালীন ব্যবহারকারীকে তৎক্ষণাৎ সফলতার প্রিভিউ দেখানো যায়, যা ইউজার এক্সপেরিয়েন্সকে অনেক বেশি রেসপনসিভ করে।",
          "e": "React 19 Actions streamline asynchronous form mutations. useActionState automatically manages the pending state, errors, and returned payload of an async action without boilerplate useState calls. useOptimistic allows instant UI updates before the server responds, automatically rolling back if the network request fails.",
          "tip": "NT Tech-এর টেক লিডরা নতুন React 19 ও Next.js 15+ এর আধুনিক ফিচারগুলো ইন্টারভিউতে খুব বেশি পছন্দ করে।"
        },
        {
          "lvl": "lvl3",
          "q": "Concurrent React এবং Fiber Architecture-এর অভ্যন্তরীণ মেকানিজম কী? কীভাবে এটি UI থ্রেডকে ব্লক না করে কাজ করে?",
          "m": "React 16-এর আগে Stack Reconciler ছিল সিনক্রোনাস ও রিকার্সিভ, যার কারণে বড় কম্পোনেন্ট ট্রিতে রেন্ডারিং শুরু হলে জাভাস্ক্রিপ্ট মেইন থ্রেড ব্লক হয়ে ফ্রেম ড্রপ হতো। React Fiber প্রতিটি কম্পোনেন্টকে একটি 'Fiber Node' ইউনিটে ভাগ করে, যা একটি ভার্চুয়াল কল স্ট্যাকের মতো কাজ করে। এটি টাইম স্লাইসিং (Time Slicing) সমর্থন করে, অর্থাৎ ব্রাউজার ফ্রেম শেষ হওয়ার আগে কাজ পজ করে মেইন থ্রেডকে ইউজার ইনপুট বা অ্যানিমেশন হ্যান্ডেল করতে ছেড়ে দেয় এবং পরে বাকি কাজ শেষ করে।",
          "b": "কনকারেন্ট রিঅ্যাক্টের মূল ভিত্তি হলো ফাইবার আর্কিটেকচার। এটি রেন্ডারিং কাজকে ছোট ছোট এককে বিভক্ত করে যা বিরতি দেওয়া, অগ্রাধিকার ভিত্তিতে পরিবর্তন করা এবং বাতিল করা যায়। ফলে ভারী রেন্ডারিংয়ের সময়ও ব্রাউজারের মেইন থ্রেড ইউজার ক্লিক বা স্ক্রলিংয়ে সাড়া দিতে পারে এবং ফ্রেম ড্রপ হয় না।",
          "e": "Fiber is a complete rewrite of React's reconciler enabling incremental rendering. Each Fiber is a unit of work that can be paused, prioritized, or aborted. Through Cooperative Scheduling and Time Slicing, Concurrent React yields execution back to the browser main thread to handle high-priority interactions like clicks and typing.",
          "tip": "ইন্টারভিউতে 'Time Slicing', 'Interruptible Rendering', এবং 'Priority Lanes' টার্মগুলো ব্যাখ্যা করবে।"
        },
        {
          "lvl": "lvl3",
          "q": "React-এ `useTransition` এবং `useDeferredValue`-এর মধ্যে পার্থক্য কী এবং কখন কোনটি ব্যবহার করবে?",
          "m": "`useTransition` ব্যবহার করা হয় যখন কোনো 'স্টেট আপডেটিং ফাংশন' নিজেই কম প্রায়োরিটির হয় (যেমন: ট্যাব সুইচ বা বড় লিস্ট ফিল্টার)। এটি আমাদের `isPending` স্টেট দেয়। আর `useDeferredValue` ব্যবহার করা হয় যখন কোনো 'ভ্যালু' অন্য প্যারেন্ট বা প্রপস থেকে আসে এবং আমরা ওই ভ্যালুটার রেন্ডারিং একটু ডিফার বা পিছিয়ে দিতে চাই। দুটিই ইনপুট টাইপিং বা কীবোর্ড রেসপন্সকে মেইন থ্রেডে স্মুথ রাখতে ব্যবহার করা হয়।",
          "b": "useTransition হুকটি সরাসরি স্টেট পরিবর্তনের কোডকে কম অগ্রাধিকারপ্রাপ্ত হিসেবে চিহ্নিত করে এবং লোডিং স্টেট ট্র্যাক করতে isPending ফ্ল্যাগ দেয়। অন্যদিকে useDeferredValue কোনো পরিবর্তনশীল মানের আপডেটকে ব্রাউজার খালি থাকা পর্যন্ত স্থগিত রাখে। উভয় হুকই ব্যবহারকারীর ইনপুট আটকে যাওয়া রোধ করতে ব্যবহৃত হয়।",
          "e": "useTransition wraps state-updating dispatch calls to mark them as non-urgent transitions and provides an isPending boolean. useDeferredValue wraps a value directly (e.g. from props) to defer updating dependent UI until high-priority renders finish.",
          "code": "const [isPending, startTransition] = useTransition();\nstartTransition(() => setFilteredList(heavyFilter(data)));"
        },
        {
          "lvl": "lvl3",
          "q": "React 19-এ নতুন `use()` হুকের কাজ কী এবং এটি কনভেনশনাল হুকগুলোর রুলস কীভাবে ব্রেক করে?",
          "m": "React 19-এর `use()` হুক দিয়ে কন্ডিশনাল স্টেটমেন্ট (যেমন if-block) বা লুপের ভেতরেও সরাসরি প্রমিজ (Promise) অথবা কনটেক্সট (Context) রিড করা যায়! সাধারণ হুকগুলো কম্পোনেন্টের টপ লেভেলে কল করতে হতো, কিন্তু `use()` হুককে কন্ডিশনের ভেতরে কল করা যায়। যখন `use(promise)` কল করা হয়, প্রমিজ রিজলভ না হওয়া পর্যন্ত React নিকটস্থ Suspense বাউন্ডারিতে ফলব্যাক দেখায়।",
          "b": "রিঅ্যাক্ট ১৯-এ প্রবর্তিত `use()` একটি বিশেষ হুক যা শর্তযুক্ত স্টেটমেন্টের ভিতরেও প্রমিজ এবং কনটেক্সট রিড করতে পারে। এটি হুকের সাধারণ নিয়মের ব্যতিক্রম। প্রমিজের সাথে ব্যবহারের সময় এটি সাসপেন্সের সাথে সমন্বয় করে ডাটা লোড না হওয়া পর্যন্ত লোডার প্রদর্শন করে।",
          "e": "The `use()` API reads resources like Promises and Context conditionally inside if-statements or loops. Unlike traditional hooks, it can be called conditionally. When reading a promise, it integrates with React Suspense to pause rendering until the promise resolves.",
          "code": "function Profile({ userPromise }: { userPromise: Promise<User> }) {\n  const user = use(userPromise); // Pauses render until resolved\n  return <h1>{user.name}</h1>;\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Server Components (RSC) এবং Client Components-এর ইন্টারনাল বান্ডলিং ও ডেটা এক্সচেঞ্জ আর্কিটেকচার কীভাবে কাজ করে?",
          "m": "Server Components শুধুমাত্র সার্ভারে রান হয় এবং এদের কোনো জাভাস্ক্রিপ্ট কোড ক্লায়েন্ট বান্ডেলে যায় না (Zero Bundle Size)। সার্ভার কম্পোনেন্ট রেন্ডার হয়ে একটি স্পেশাল JSON ফরম্যাট (RSC Payload) তৈরি করে ক্লায়েন্টে পাঠায়। ক্লায়েন্ট কম্পোনেন্টে `\"use client\"` ডিরেক্টিভ দেওয়া থাকে, যার কোড ব্রাউজারে হাইড্রেট হয়। সার্ভার কম্পোনেন্ট থেকে ক্লায়েন্টে প্রপস পাস করার সময় ডাটা অবশ্যই সিরিয়ালাইজেবল (Serializable) হতে হয়—কোনো ফাংশন সরাসরি পাস করা যায় না।",
          "b": "সার্ভার কম্পোনেন্ট ক্লায়েন্টের জাভাস্ক্রিপ্ট বান্ডেল সাইজ শূন্য রাখে কারণ এটি শুধুমাত্র সার্ভার এনভায়রনমেন্টে এক্সিকিউট হয়। এর আউটপুট আরএসসি পেলোড হিসেবে ব্রাউজারে পাঠানো হয়। ব্রাউজার ক্লায়েন্ট কম্পোনেন্টগুলোকে হাইড্রেট করে এবং এই পেলোডের সাথে যুক্ত করে। প্রপস হিসেবে কেবলমাত্র সিরিয়ালাইজ যোগ্য ডাটা পাঠানো যায়।",
          "e": "Server Components execute strictly on the server and emit an RSC Payload (a specialized JSON tree) without shipping component JS to the client. Client components declared with 'use client' hydrate on the client. Props passed from RSC to Client Components must be serializable.",
          "tip": "সার্ভার এবং ক্লায়েন্টের বাউন্ডারি পরিষ্কার রাখা Next.js আর্কিটেকচারের সবচেয়ে বড় ইন্টারভিউ প্রশ্ন।"
        },
        {
          "lvl": "situation",
          "q": "একটি বড় টেবিল স্ক্রিনে ১০০০+ রো রেন্ডার হচ্ছে এবং টাইপ করার সময় সার্চ ইনপুট অত্যন্ত ল্যাগ করছে। তুমি কীভাবে এই সমস্যার সমাধান করবে?",
          "m": "এখানে মূল সমস্যা দুটি: এক, সার্চ ইনপুটের প্রতি কিস্ট্রোকে ১০০০টি রো রি-রেন্ডার হচ্ছে; দুই, DOM-এ একসাথে এত নোড ব্রাউজার হ্যান্ডেল করতে পারছে না। সমাধান: (১) সার্চ ইনপুটে `useDeferredValue` অথবা `useTransition` ব্যবহার করব যাতে টাইপিং স্টেটকে সর্বোচ্চ প্রায়োরিটি দেওয়া হয় এবং লিস্ট ফিল্টারিং লো প্রায়োরিটিতে চলে। (২) পুরো ১০০০ রো DOM-এ না দিয়ে `@tanstack/react-virtual` দিয়ে Virtualization করব, যাতে শুধু স্ক্রিনে দৃশ্যমান ২০–২৫টি রো রেন্ডার হয়। (৩) টেবিল রো কম্পোনেন্টগুলোকে `React.memo` করব।",
          "b": "এই পরিস্থিতি সমাধানের জন্য প্রথমে আমরা ভার্চুয়ালাইজেশন (react-virtualized বা tanstack virtual) ব্যবহার করব, যাতে স্ক্রিনে যে কয়েকটি রো দেখা যায় শুধু সেগুলোর ডম নোড তৈরি হয়। দ্বিতীয়ত, সার্চ ফিল্টারিংয়ের জন্য useTransition অথবা useDeferredValue ব্যবহার করব যাতে কিবোর্ড টাইপিং আটকে না গিয়ে মসৃণ থাকে। এছাড়া কিবোর্ড ইনপুটে ৩০০ মিলিসেকেন্ড ডিবউন্সিং দিতে পারি।",
          "e": "I would tackle this with two key techniques: first, DOM virtualization using libraries like TanStack Virtual to only mount the visible rows in the viewport instead of 1000 DOM nodes. Second, use React 18/19's useTransition or useDeferredValue to prioritize user typing over the expensive list re-calculation, accompanied by debouncing on the search input.",
          "code": "const [query, setQuery] = useState('');\nconst deferredQuery = useDeferredValue(query);\n// Filter list using deferredQuery"
        },
        {
          "lvl": "situation",
          "q": "ব্যবহারকারী দ্রুত একাধিক ফিল্টার বাটনে ক্লিক করলে পূর্বের এপিআই রিকোয়েস্টগুলো লেট রেসপন্স দিয়ে বর্তমান স্ক্রিনের ডেটাকে ওভাররাইট করে ফেলে (Race Condition)। কীভাবে এটি সমাধান করবে?",
          "m": "এটি একটি ক্লাসিক Race Condition বাগ। সমাধান হলো এপিআই কলের জন্য `AbortController` ব্যবহার করা। প্রতিবার নতুন রিকোয়েস্ট পাঠানোর আগে পূর্বের রিকোয়েস্টকে `controller.abort()` দিয়ে ক্যানসেল করে দিতে হবে। অথবা TanStack Query (React Query) ব্যবহার করলে এটি স্বয়ংক্রিয়ভাবে আউট-অফ-অর্ডার রেসপন্স বাতিল করে কেবল লেটেস্ট রিকোয়েস্টের ক্যাশ ডাটা UI-তে দেখায়।",
          "b": "রেস কন্ডিশন প্রতিরোধ করতে ব্রাউজারের AbortController এপিআই ব্যবহার করে প্রতিটি নতুন রিকোয়েস্ট শুরুর আগে পূর্ববর্তী রিকোয়েস্ট বাতিল করতে হবে। অথবা রিকোয়েস্ট আইডির সাথে একটি রিঅ্যাক্ট রিফারেন্স (useRef) রেখে রেসপন্স আসার সময় চেক করা যায় যে এটি সর্বশেষ প্রেরিত রিকোয়েস্ট কি না।",
          "e": "This race condition is solved by instantiating an AbortController inside useEffect and aborting previous pending requests in the effect cleanup. Alternatively, TanStack Query handles request cancellation and latest query deduplication out of the box.",
          "code": "useEffect(() => {\n  const controller = new AbortController();\n  fetch(`/api/items?filter=${filter}`, { signal: controller.signal })\n    .then(res => res.json())\n    .then(setData)\n    .catch(err => { if (err.name !== 'AbortError') handleError(err); });\n  return () => controller.abort();\n}, [filter]);"
        },
        {
          "lvl": "situation",
          "q": "একটি কম্পোনেন্ট আনমাউন্ট হয়ে যাওয়ার পরেও এপিআই রেসপন্স এসে `setState` কল করায় কনসোলে মেমোরি লিক ওয়ার্নিং আসছে। কীভাবে সমাধান করবে?",
          "m": "React 18-এ এই ওয়ার্নিংটি মূলত সাইলেন্ট করা হলেও আর্কিটেকচারালি এটি খারাপ কারণ অপ্রয়োজনীয় মেমোরি আটকে থাকে। সমাধান: (১) AbortController দিয়ে আনমাউন্টে রিকোয়েস্ট ক্যানসেল করা, (২) একটি মাউন্টেড রেফারেন্স `isMounted = useRef(true)` রাখা এবং ক্লিনআপে `isMounted.current = false` করে `if (isMounted.current) setState(...)` চেক করা।",
          "b": "কম্পোনেন্ট আনমাউন্ট হওয়ার পর স্টেট আপডেট প্রতিরোধ করতে ক্লিনআপ ফাংশনে একটি বুলিয়ান ফ্ল্যাগ বা AbortController সিগন্যাল ব্যবহার করতে হবে যাতে রেসপন্স ডাটা হ্যান্ডলারটি শুধুমাত্র কম্পোনেন্ট জীবিত থাকলেই এক্সিকিউট হয়।",
          "e": "Solve this by cancelling in-flight promises via AbortController in useEffect's cleanup function, or guarding state updates with a mounted ref flag to verify the component is still mounted before setting state.",
          "code": "useEffect(() => {\n  let isMounted = true;\n  apiCall().then(data => { if (isMounted) setState(data); });\n  return () => { isMounted = false; };\n}, []);"
        },
        {
          "lvl": "situation",
          "q": "তোমার অ্যাপে একটি ড্যাশবোর্ড উইজেট প্রতি ৩ সেকেন্ড পর পর পল করে ডাটা আনে, কিন্তু ইউজার অন্য ট্যাবে গেলে অপ্রয়োজনীয় ব্যাকগ্রাউন্ড রিকোয়েস্ট ব্যান্ডউইথ নষ্ট করে। কীভাবে সমাধান করবে?",
          "m": "আমরা ব্রাউজারের `Page Visibility API` ব্যবহার করব (`document.hidden` বা `visibilitychange` ইভেন্ট লিসেনার)। ইউজার যখন ট্যাবে থাকবে না তখন টাইমার পজ রাখব এবং ট্যাবে ফিরে আসলে সাথে সাথে একবার রিফ্রেশ করে আবার পোboundaries চালু করব। TanStack Query-তে এটি `refetchOnWindowFocus: true` দিয়ে বিল্ট-ইন হ্যান্ডেল করা থাকে।",
          "b": "ব্রাউজারের পেজ ভিজিবিলিটি এপিআই ব্যবহার করে ট্যাব নিষ্ক্রিয় থাকা অবস্থায় পোলিং স্থগিত রাখতে হবে। যখন ব্যবহারকারী পুনরায় ট্যাবে ফিরে আসবে, তখনই কেবল সর্বশেষ ডেটা আনার জন্য নতুন রিকোয়েস্ট পাঠানো হবে।",
          "e": "Use the browser's Page Visibility API listening to the 'visibilitychange' event to pause polling when document.hidden is true, resuming when visible. TanStack Query automatically provides this behavior via refetchOnWindowFocus.",
          "code": "useEffect(() => {\n  const handleVisibility = () => {\n    if (document.hidden) stopPolling();\n    else startPolling();\n  };\n  document.addEventListener('visibilitychange', handleVisibility);\n  return () => document.removeEventListener('visibilitychange', handleVisibility);\n}, []);"
        },
        {
          "lvl": "situation",
          "q": "একটি নেস্টেড ড্রপডাউন মেনু যখন স্ক্রিনের একদম ডানে বা নিচে ওপেন হয়, তখন স্ক্রিন কেটে যায় বা স্ক্রলবার তৈরি হয়। হুক দিয়ে কীভাবে পজিশনিং হ্যান্ডেল করবে?",
          "m": "আমরা একটি কাস্টম হুক `useClickOutsideAndPosition` তৈরি করব যা `getBoundingClientRect()` দিয়ে ট্রিগার বাটন এবং ভিউপোর্টের উচ্চতা ও প্রস্থ চেক করবে। ড্রপডাউন ওপেন হওয়ার সময় যদি নিচে জায়গা না থাকে তবে `top` না দিয়ে `bottom` এ ফ্লিপ করবে এবং ডানে জায়গা না থাকলে বামে অ্যালাইন করবে। অথবা সরাসরি React Portal এবং Floating UI / Radix Popper ব্যবহার করব।",
          "b": "কাস্টম হুকের মাধ্যমে এলিমেন্টের getBoundingClientRect হিসাব করে ভিউপোর্টের সীমানা চেক করতে হবে। পর্যাপ্ত জায়গা না থাকলে ড্রপডাউনের পজিশন স্বয়ংক্রিয়ভাবে রিভার্স বা ফ্লিপ করতে হবে অথবা রিঅ্যাক্ট পোর্টাল দিয়ে বডির নিচে রেন্ডার করে ফিক্সড পজিশনিং দিতে হবে।",
          "e": "Compute bounds using getBoundingClientRect() inside a custom positioning hook to dynamically flip placement (e.g. from bottom to top or right to left) based on remaining viewport space, or render through a React Portal using Floating UI.",
          "code": "const rect = buttonRef.current.getBoundingClientRect();\nconst spaceBelow = window.innerHeight - rect.bottom;\nconst shouldFlipTop = spaceBelow < dropdownHeight;"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ বারকোড স্ক্যানার দিয়ে প্রতি সেকেন্ডে ৫-১০টি আইটেম দ্রুত স্ক্যান করার সময় কার্ট স্টেট মিস হওয়া বা ল্যাগ কীভাবে রোধ করেছিলে?",
          "m": "বারকোড স্ক্যানার সরাসরি কীবোর্ড এমুলেটর হিসেবে দ্রুত ক্যারেক্টার পাঠায়। সাধারণ onChange বা useState দিলে প্রতি ক্যারেক্টারে রি-রেন্ডার হয়ে কার্ট আটকে যায়। সমাধান: (১) গ্লোবাল কীবোর্ড ইভেন্টে বাফার রেখে যখন 'Enter' (স্ক্যান কমপ্লিট) আসে, তখন পুরো বারকোড একসাথে ধরি। (২) কার্ট মিউটেশনে `useReducer` দিয়ে অ্যাকশন প্রসেস করি এবং দ্রুত স্ক্যানগুলোর জন্য একটি মাইক্রোটাস্ক কিউ (Queue) রাখি যাতে আগের আইটেম যোগ হওয়ার আগেই পরেরটা মিস না হয়। (৩) কার্ট আইটেম লিস্টে মেমোইজড রো কম্পোনেন্ট ব্যবহার করায় POS ইন্টারফেসে ৬০ FPS স্মুথ থাকে।",
          "b": "দোকানি পিওএসে উচ্চগতির বারকোড স্ক্যানিং সামলাতে আমরা কীবোর্ড বাফারিং লজিক তৈরি করেছিলাম যা এন্টার চাপার পর সম্পূর্ণ বারকোড একসাথে শনাক্ত করে। দ্রুত একাধিক স্ক্যানের ক্ষেত্রে স্টেট লস ঠেকাতে useReducer এর ডিসপ্যাচ কিউ এবং মেমোইজড কম্পোনেন্ট ব্যবহার করে তাৎক্ষণিক বিলিং নিশ্চিত করা হয়েছিল।",
          "e": "In Dokani POS, barcode scanners rapidly emulate keystrokes. We implemented a keyboard buffer capturing the full barcode until the carriage return character. State mutations were driven by useReducer with a synchronous action queue, combined with memoized table rows to sustain 60fps under intensive checkout.",
          "tip": "বারকোড স্ক্যানার যে কোনো সাধারণ কীবোর্ডের মতো KeyDown ইভেন্ট ফায়ার করে—এই বাস্তব অভিজ্ঞতা ইন্টারভিউয়ারের কাছে তোমার প্রজেক্টের গভীরতা প্রমাণ করবে।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর অফলাইন ক্যাশিং ও নেটওয়ার্ক ড্রপ হলে রিঅ্যাক্ট অ্যাপ কীভাবে ডাটা হারানো ছাড়া ব্যাকগ্রাউন্ডে সিঙ্ক করে?",
          "m": "দোকানদার যখন সেলস বিল করছে তখন ইন্টারনেট চলে গেলেও যাতে ক্যাশ কাউন্টার বন্ধ না হয়, সেজন্য আমরা IndexedDB (via Dexie.js) এ সেলস অর্ডার তৎক্ষণাৎ লোকালি সেভ করি। রিঅ্যাক্ট লেয়ারে `navigator.onLine` এবং Service Worker ব্যাকগ্রাউন্ড সিঙ্ক দিয়ে কানেকশন ব্যাক আসার সাথে সাথে অফলাইন কিউতে জমে থাকা ট্রানজিশনগুলো সার্ভারে ব্যাচ আকারে পোস্ট করি এবং লোকাল রেকর্ডকে 'Synced' স্ট্যাটাস দিই।",
          "b": "ইন্টারনেট বিচ্ছিন্ন হলেও বিক্রি চালু রাখতে আমরা ব্রাউজারের ইনডেক্সড-ডিবি (IndexedDB) ব্যবহার করে অফলাইন অর্ডার সংরক্ষণ করি। সংযোগ পুনরুদ্ধার হলে ব্যাকগ্রাউন্ড সিঙ্ক প্রসেস স্বয়ংক্রিয়ভাবে পেন্ডিং বিলগুলো সার্ভারে পাঠিয়ে ডাটাবেজ আপডেট নিশ্চিত করে।",
          "e": "To support offline retail operations in Dokani, sales transactions are instantly committed to browser IndexedDB. Upon network restoration, an optimistic queue synchronizes local orders in batches to the backend API without freezing the UI thread.",
          "code": "window.addEventListener('online', () => syncPendingOfflineOrders());"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD ই-লার্নিং পোর্টালে ভিডিও লেকচার চলাকালীন প্লেব্যাক পজিশন প্রতি ৫ সেকেন্ডে অটো-সেভ করতে গিয়ে সার্ভারে অপ্রয়োজনীয় ওভারহেড কীভাবে অপটিমাইজ করেছিলে?",
          "m": "ভিডিও প্লেয়ারের `onTimeUpdate` প্রতি ২৫০ মিলিসেকেন্ডে ফায়ার হয়। যদি প্রতিবার এপিআই কল করতাম তবে হাজার হাজার ছাত্রের জন্য সার্ভার ক্র্যাশ করত। সমাধান: (১) আমরা একটি কাস্টম `useThrottledCallback` তৈরি করি যা লোকাল মেমোরি ও লোকালস্টোরেজে প্রতি ৫ সেকেন্ডে টাইমস্ট্যাম্প রাখে। (২) কেবল ভিডিও পজ হলে বা পেজ ক্লোজ (`beforeunload`) করার সময় `navigator.sendBeacon` দিয়ে সার্ভারে চূড়ান্ত ওয়াচ-টাইম সেভ করি, ফলে ৯৫% সার্ভার রিকোয়েস্ট কমে যায়।",
          "b": "ভিডিওর অন-টাইম-আপডেট ইভেন্টে প্রতিমুহূর্তে সার্ভার কল না করে আমরা ক্লায়েন্ট সাইডে থ্রটলিং ব্যবহার করেছিলাম। লোকালস্টোরেজে সময় জমিয়ে রেখে শুধুমাত্র ভিডিও পজ বা ট্যাব বন্ধের মুহূর্তে sendBeacon এর মাধ্যমে সার্ভারে ডাটা পাঠিয়ে সার্ভারের লোড বহুলাংশে কমানো হয়েছিল।",
          "e": "Instead of firing API requests on continuous onTimeUpdate events, we throttled client-side tracking to localStorage and dispatched the final playback timestamp to the server only on video pause or page unload via navigator.sendBeacon.",
          "tip": "ইন্টারভিউতে `navigator.sendBeacon` এর কথা বললে বোঝা যায় তুমি প্রোডাকশন ট্রাফিক ও পারফরম্যান্স অপটিমাইজেশনে দক্ষ।"
        },
        {
          "lvl": "realworld",
          "q": "বড় কোনো ই-কমার্স বা মার্কেটপ্লেস অ্যাপে হাজার হাজার পণ্যের ইমেজ লোড করার সময় ব্রাউজার মেমোরি ও ব্যান্ডউইথ কীভাবে অপটিমাইজ করবে?",
          "m": "সমাধান: (১) ইমেজগুলোকে `loading='lazy'` এবং Next.js-এর `<Image>` কম্পোনেন্ট দিয়ে WebP/AVIF ফরম্যাটে অটোমেটিক রেসপনসিভ সাইজিংয়ে সার্ভ করব। (২) Blur-up প্লেসহোল্ডার (LQIP - Low Quality Image Placeholder) ব্যবহার করব যাতে লেআউট শিফট (CLS - Cumulative Layout Shift) ০ থাকে। (৩) স্ক্রিনের বাইরে থাকা ইমেজের জন্য `IntersectionObserver` দিয়ে কেবল ভিউপোর্টে আসার ১০০ পিক্সেল আগে ফেচ ট্রিগার করব।",
          "b": "উচ্চ ব্যান্ডউইথ সাশ্রয়ের জন্য আধুনিক WebP বা AVIF ফরম্যাট, লেজি লোডিং এবং ইন্টারসেকশন অবজারভার ব্যবহার করা হয়। নেক্সট জেএস ইমেজ কম্পোনেন্ট স্বয়ংক্রিয়ভাবে ডিভাইসের রেজোলিউশন অনুযায়ী অপটিমাইজড ছবি সরবরাহ করে এবং লেআউট শিফট প্রতিরোধ করে।",
          "e": "Leverage Next.js Image with modern formats (AVIF/WebP), responsive srcSet generation, priority attributes for above-the-fold hero images, and blur-up placeholders to eliminate Cumulative Layout Shift (CLS) while minimizing bandwidth.",
          "code": "<Image src={product.img} alt={product.title} width={400} height={300} placeholder='blur' blurDataURL={product.blur} />"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর থার্মাল প্রিন্টার ইন্টারফেসে প্রিন্ট ডায়ালগ ওপেন করার সময় রিঅ্যাক্ট অ্যাপ ফ্রিজ হওয়া কীভাবে টেকনিক্যালি এড়ানো হয়েছিল?",
          "m": "ব্রাউজারের `window.print()` একটি সিনক্রোনাস ব্লকিং কল যা চললে জাভাস্ক্রিপ্ট ইভেন্ট লুপ সম্পূর্ণ পজ হয়ে যায়। সমাধান: (১) আমরা প্রিন্ট রিকোয়েস্টকে একটি হিডেন `<iframe>` এর ভেতর প্রিন্ট স্টাইলশিট সহ ইনজেক্ট করি। (২) আধুনিক থার্মাল ক্যাশ ড্রয়ার ও প্রিন্টারের জন্য Web Bluetooth API অথবা লোকাল নোড ভিত্তিক প্রিন্টিং এজেন্টের মাধ্যমে র কাঁচা ESC/POS বাইট কোড সকেট দিয়ে পাঠিয়েছি, ফলে ব্রাউজারের কোনো ডিফল্ট প্রিন্ট ডায়ালগ ছাড়াই ১ মিলি-সেকেন্ডে ইনভয়েস বের হয়ে আসে।",
          "b": "window.print() ব্রাউজারের মেইন থ্রেডকে ব্লক করে রাখে। দোকানি সিস্টেমে আমরা আইফ্রেম কৌশল অথবা লোকাল সার্ভারে সরাসরি ইএসসি/পিওএস (ESC/POS) কমান্ড পাঠিয়ে ব্যাকগ্রাউন্ডে সাইড-ইফেক্ট ছাড়া তাৎক্ষণিক থার্মাল রসিদ প্রিন্ট করার ব্যবস্থা করেছিলাম।",
          "e": "Since window.print() is a synchronous blocking API, we isolated print layouts inside a detached hidden iframe or bypassed the browser dialog entirely by streaming raw ESC/POS commands directly over WebUSB / local microservices for instantaneous thermal receipts.",
          "tip": "থার্মাল প্রিন্টারে ESC/POS কমান্ড দিয়ে র প্রিন্টিং করার এই বাস্তব উদাহরণ যেকোনো সিনিয়র ইন্টারভিউতে অবিশ্বাস্য প্লাস পয়েন্ট।"
        }
      ]
    },
    {
      "id": "nextjs-app-router",
      "name": "Next.js 15+ App Router & Architecture",
      "desc": "App Router, Server Components (RSC), Client Components, SSR, SSG, ISR, Server Actions, Caching Lifecycle, Middleware",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Next.js-এর Pages Router এবং App Router-এর মধ্যে প্রধান পার্থক্য কী এবং App Router কেন আধুনিক স্ট্যান্ডার্ড?",
          "m": "Pages Router-এ ফাইল বেসড রাউটিং ছিল `pages/` ডিরেক্টরিতে এবং প্রতিটি পেজ ছিল মূলত ক্লায়েন্ট কম্পোনেন্ট যেখানে SSR-এর জন্য getServerSideProps লাগত। আর App Router (`app/` ডিরেক্টরি) তৈরি হয়েছে React Server Components (RSC) এর ওপর ভিত্তি করে। এতে বাই-ডিফল্ট সব কম্পোনেন্ট সার্ভারেই রেন্ডার হয়, নেস্টেড লেআউট (`layout.tsx`) সমর্থন করে, ডেটা ফেচিং সরাসরি কম্পোনেন্টে `async/await` দিয়ে করা যায় এবং ব্রাউজারে অপ্রয়োজনীয় জাভাস্ক্রিপ্ট পাঠানো লাগে না।",
          "b": "অ্যাপ রাউটার এবং পেজেস রাউটারের মূল পার্থক্য হলো সার্ভার কম্পোনেন্টের ব্যবহার। অ্যাপ রাউটারে বাই-ডিফল্ট সব কম্পোনেন্ট সার্ভার কম্পোনেন্ট হিসেবে কাজ করে, যা ক্লায়েন্ট বান্ডেল সাইজ অনেক কমিয়ে দেয়। তাছাড়া নেস্টেড লেআউট, স্ট্রিমিং এবং এরর বাউন্ডারি অ্যাপ রাউটারে স্বয়ংক্রিয়ভাবে পরিচালিত হয়।",
          "e": "Pages Router operates primarily around client-side rendering with getServerSideProps / getStaticProps APIs, whereas App Router is built on React Server Components (RSC). In App Router, components are server-first by default, supporting nested layouts, streaming via Suspense, and co-located loading and error states.",
          "tip": "ইন্টারভিউতে স্পষ্ট বলবে: 'Next.js 14/15-এ App Router হলো প্রোডাকশন স্ট্যান্ডার্ড এবং বাই-ডিফল্ট সব কম্পোনেন্ট সার্ভার কম্পোনেন্ট'।"
        },
        {
          "lvl": "lvl1",
          "q": "Next.js-এ Server Components এবং Client Components-এর মধ্যে পার্থক্য কী? কখন `'use client'` দিতে হয়?",
          "m": "Server Components (বাই-ডিফল্ট) কেবল সার্ভারে এক্সিকিউট হয়; এগুলোতে কোনো স্টেট (`useState`), ইফেক্ট (`useEffect`), বা ব্রাউজার ইভেন্ট হ্যান্ডলার (`onClick`) ব্যবহার করা যায় না। আর যখনই আমাদের ইউজার ইন্টারঅ্যাকশন (যেমন বাটন ক্লিক, ফর্ম ইনপুট, লোকাল স্টোরেজ এক্সেস বা রিঅ্যাক্ট হুক) প্রয়োজন হয়, তখন ফাইলের সবার ওপরে `'use client'` ডিরেক্টিভ দিতে হয়।",
          "b": "সার্ভার কম্পোনেন্ট সার্ভারে রেন্ডার হয়ে কেবল এইচটিএমএল ও আরএসসি ডাটা ব্রাউজারে পাঠায়। ক্লায়েন্ট কম্পোনেন্টে ইন্টারঅ্যাক্টিভিটি, ইভেন্ট লিসেনার এবং হুক ব্যবহার করা যায়। ফাইলের একদম শুরুতে 'use client' লিখে রিঅ্যাক্টকে জানাতে হয় যে এই কম্পোনেন্টটি ব্রাউজারে হাইড্রেট হবে।",
          "e": "Server Components run exclusively on the server with zero client JS footprint, but cannot use hooks, state, or DOM event listeners. Client Components, marked with 'use client' at the top of the file, are hydrated in the browser to enable interactivity, state, and client hooks.",
          "code": "'use client';\nimport { useState } from 'react';\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;\n}"
        },
        {
          "lvl": "lvl1",
          "q": "Next.js-এ রেন্ডারিং স্ট্র্যাটেজি: SSR, SSG, এবং ISR-এর মধ্যে মূল পার্থক্য কী?",
          "m": "SSR (Server-Side Rendering) প্রতিটা ইউজারের রিকোয়েস্টে অন-ডিমান্ড সার্ভারে পেজ তৈরি করে। SSG (Static Site Generation) বিল্ড টাইমে একবারেই সব পেজ এইচটিএমএল আকারে বানিয়ে রাখে যা খুব দ্রুত লোড হয়। আর ISR (Incremental Static Regeneration) হলো দুটির হাইব্রিড—বিল্ডের পর পেজ স্ট্যাটিক থাকে, কিন্তু ব্যাকগ্রাউন্ডে নির্দিষ্ট সময় পর পর (যেমন `revalidate: 60`) পেজকে আবার রি-জেনারেট করে নতুন ডাটা দিয়ে ক্যাশ আপডেট করে।",
          "b": "এসএসআর প্রতিটি ব্যবহারকারীর রিকোয়েস্টে লাইভ ডাটা দিয়ে সার্ভারে পেজ রেন্ডার করে। এসএসজি বিল্ডের সময় স্ট্যাটিক এইচটিএমএল তৈরি করে যা সিডিএন থেকে দ্রুততম গতিতে সার্ভ হয়। আইএসআর স্ট্যাটিক পেজকে পুনরায় সম্পূর্ণ বিল্ড না করেই ব্যাকগ্রাউন্ডে নির্দিষ্ট সময় পরপর স্বয়ংক্রিয়ভাবে রিভ্যালিডেট করে ক্যাশ আপডেট করে।",
          "e": "SSR renders HTML dynamically on every request. SSG pre-renders static HTML at build time for blistering CDN speeds. ISR combines the best of both by statically caching pages while regenerating them in the background at specified intervals (e.g., every 60s) without rebuilding the whole app.",
          "code": "// ISR in Next.js App Router:\nexport const revalidate = 60; // Revalidate every 60 seconds"
        },
        {
          "lvl": "lvl1",
          "q": "Next.js-এর স্পেশাল ফাইল কনভেনশনগুলো কী কী (layout, page, loading, error, not-found)?",
          "m": "App Router-এ নির্দিষ্ট ফাইলের নাম দিয়ে স্পেশাল রাউটিং লজিক হয়: `page.tsx` হলো মূল রাউটের UI; `layout.tsx` একাধিক পেজের কমন লেআউট যা পেজ ট্রানজিশনে রি-রেন্ডার হয় না; `loading.tsx` হলো স্বয়ংক্রিয় Suspense ফলব্যাক যা পেজ লোড হওয়ার সময় স্কেলেটন দেখায়; `error.tsx` হলো এরর বাউন্ডারি যা রানিং এরর ক্যাচ করে; এবং `not-found.tsx` হলো ৪MD পেজের জন্য ফলব্যাক UI।",
          "b": "নেক্সট জেএস ফোল্ডার ভিত্তিক স্পেশাল ফাইল আর্কিটেকচার মেনে চলে: page.tsx রাউটের দৃশ্যমান পৃষ্ঠা, layout.tsx স্থায়ী কাঠামো বা লেআউট, loading.tsx লোডিং স্কেলেটন, error.tsx রানটাইম এরর হ্যান্ডলিং বাউন্ডারি, এবং not-found.tsx ৪০৪ পেজের কাস্টম ইন্টারফেস প্রদান করে।",
          "e": "Next.js App Router reserves special file names: page.tsx defines the unique route UI, layout.tsx wraps pages and preserves state across navigations, loading.tsx sets an automatic React Suspense boundary, error.tsx acts as a Client Component error boundary, and not-found.tsx handles 404 views.",
          "tip": "error.tsx ফাইলটি অবশ্যই ক্লায়েন্ট কম্পোনেন্ট হতে হবে (`'use client'`), অন্যথায় নেক্সট জেএস বিল্ড এরর দেবে।"
        },
        {
          "lvl": "lvl1",
          "q": "Next.js App Router-এ সরাসরি সার্ভার কম্পোনেন্টে কীভাবে ডাটা ফেচ করা হয়?",
          "m": "সার্ভার কম্পোনেন্টে সরাসরি সাধারণ `async/await` এবং নেটিভ `fetch()` ব্যবহার করা যায়। কোনো useEffect বা axios লাগে না। নেক্সট জেএস ফেচ এপিআইকে এক্সটেন্ড করেছে, যার ফলে আমরা ক্যাশিং অপশন খুব সহজে সেট করতে পারি (যেমন: `{ cache: 'no-store' }` ফর ডায়নামিক ডাটা অথবা `{ next: { revalidate: 3600 } }` ফর ক্যাশড ডাটা)।",
          "b": "সার্ভার কম্পোনেন্টে কোনো useEffect ছাড়াই সরাসরি async ফাংশন লিখে নেটিভ fetch কল করা যায়। নেক্সট জেএস ফেচ রিকোয়েস্টকে ক্যাশ এবং রিভ্যালিডেশন সুবিধাসহ অপটিমাইজ করে সরবরাহ করে।",
          "e": "Server Components natively support async/await. You can directly fetch data inside the component body using extended fetch(), configuring caching behaviors with { cache: 'no-store' } or { next: { revalidate: 3600 } }.",
          "code": "export default async function ProductPage({ params }: { params: { id: string } }) {\n  const res = await fetch(`https://api.dokani.com/products/${params.id}`);\n  const product = await res.json();\n  return <div>{product.name}</div>;\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Next.js-এর Server Actions কী এবং কীভাবে এটি ফর্ম সাবমিশন বা মিউটেশনকে সহজ করে?",
          "m": "Server Actions হলো সার্ভার-সাইড অ্যাসিনক্রোনাস ফাংশন যা সরাসরি কম্পোনেন্ট ফাইল থেকে বা সার্ভার অ্যাকশন ফাইল (`'use server'`) থেকে কল করা যায়। আলাদা কোনো API রাউট (`/api/items`) তৈরি না করেই ক্লায়েন্ট ফর্ম থেকে সরাসরি সার্ভারে ডাটাবেজ অপারেশন চালানো যায়। সাবমিশনের পর `revalidatePath('/dashboard')` কল করলে UI-তে তৎক্ষণাৎ ক্যাশ আপডেট হয়ে যায়।",
          "b": "সার্ভার অ্যাকশন হলো সার্ভারে এক্সিকিউট হওয়া ফাংশন যা 'use server' দিয়ে চিহ্নিত করা হয়। এর মাধ্যমে ক্লায়েন্ট ফর্ম সরাসরি সার্ভার ফাংশন কল করে ডাটাবেজ আপডেট করতে পারে, ফলে আলাদা এপিআই হ্যান্ডলার তৈরির ঝামেলা থাকে না।",
          "e": "Server Actions are asynchronous functions executed on the server, marked with 'use server'. They allow direct server-side mutations from client forms or event handlers without writing dedicated REST API routes, followed by instant cache invalidation via revalidatePath.",
          "code": "'use server';\nimport { revalidatePath } from 'next/cache';\nexport async function createItem(formData: FormData) {\n  const title = formData.get('title');\n  await db.item.create({ data: { title } });\n  revalidatePath('/items');\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Next.js Middleware কী এবং এটি রিকোয়েস্ট লাইফসাইকেলে কখন এক্সিকিউট হয়?",
          "m": "Middleware হলো একটি এজ-ফাংশন (Edge Function) যা রিকোয়েস্ট কমপ্লিট হওয়ার আগেই রিকোয়েস্ট ও রেসপন্সের মাঝখানে রান হয় (যেমন রুট ডিরেক্টরিতে `middleware.ts`)। এটি মূলত অথেনটিকেশন চেক, কুকি ভেরিফিকেশন, ইউজার রোল অনুযায়ী রিডাইরেক্ট করা, অথবা জিও-লোকেশন অনুযায়ী হেডার সেট করার জন্য ব্যবহার করা হয়। এটি পুরো পেজ রেন্ডার হওয়ার আগেই এক্সিকিউট হয়, তাই পারফরম্যান্স অত্যন্ত দ্রুত।",
          "b": "মিডলওয়্যার হলো এমন কোড যা কোনো রিকোয়েস্ট মূল পেজ বা এপিআইতে পৌঁছানোর আগেই ইন্টারসেপ্ট করে। এটি ব্যবহারকারীর সেশন বা টোকেন যাচাই করে সুরক্ষিত রাউটে প্রবেশের অনুমতি দেয় অথবা লগইন পেজে রিডাইরেক্ট করে।",
          "e": "Next.js Middleware (middleware.ts) runs on Edge runtime before a request completes. It intercepts incoming HTTP requests to handle route protection, JWT authentication checks, response header manipulation, and conditional redirects.",
          "code": "export function middleware(request: NextRequest) {\n  const token = request.cookies.get('token')?.value;\n  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {\n    return NextResponse.redirect(new URL('/login', request.url));\n  }\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Next.js 15-এ Caching বিহেভিয়ারে কী বড় পরিবর্তন এসেছে (Uncached by Default)?",
          "m": "Next.js 14-এ fetch রিকোয়েস্ট এবং রাউট হ্যান্ডলারগুলো বাই-ডিফল্ট অ্যাগ্রেসিভ ক্যাশিং করত (`force-cache`)। এতে অনেক ডেভেলপার ডাইনামিক ডেটা মিস করত বা অপ্রত্যাশিত পুরানো ডাটা পেত। Next.js 15-এ এটিকে রিভার্স করে 'Uncached by Default' করা হয়েছে—এখন fetch রিকোয়েস্ট, `GET` রাউট হ্যান্ডলার এবং ক্লায়েন্ট নেভিগেশন ক্যাশ বাই-ডিফল্ট ক্যাশ হয় না, যদি না ডেভেলপার স্পষ্টভাবে ক্যাশ করতে বলে।",
          "b": "নেক্সট জেএস ১৫-এ ডিফল্ট ক্যাশিং নীতি পরিবর্তন করে বাই-ডিফল্ট ক্যাশিং বন্ধ করা হয়েছে। আগে ফেচ রিকোয়েস্ট স্বয়ংক্রিয়ভাবে ক্যাশ হয়ে যেত, কিন্তু নতুন ভার্সনে ডেভেলপার স্পষ্ট নির্দেশ না দেওয়া পর্যন্ত ডাটা ক্যাশ হয় না, ফলে লাইভ ডাটা সবসময় আপ-টু-ডেট থাকে।",
          "e": "In Next.js 15, caching defaults shifted from aggressively cached to uncached by default. Fetch requests, GET Route Handlers, and client-side page router navigations no longer cache unless explicitly configured with cache: 'force-cache' or revalidate settings.",
          "tip": "Next.js 15 এর আন-ক্যাশড ডিফল্ট বিহেভিয়ার ইন্টারভিউতে বললে ইন্টারভিউয়ার বুঝবে তুমি একদম লেটেস্ট রিলিজের সাথে আপ-টু-ডেট।"
        },
        {
          "lvl": "lvl2",
          "q": "Dynamic Routes এবং Catch-all Routes কীভাবে তৈরি করতে হয় (`[id]` vs `[...slug]` vs `[[...slug]]`)?",
          "m": "সাধারণ সিঙ্গেল প্যারামিটারের জন্য ফোল্ডারের নাম হয় `[id]` (যেমন `/products/123`)। Catch-all Routes-এর জন্য নাম হয় `[...slug]` যা একাধিক সেগমেন্ট ম্যাচ করে (যেমন `/docs/setup/install` ধরবে `params.slug = ['setup', 'install']`)। আর Optional Catch-all এর জন্য ডাবল ব্র্যাকেট `[[...slug]]` ব্যবহার করা হয়, যা এমনকি বেস পাথ `/docs` কেও ম্যাচ করতে পারে।",
          "b": "ডায়নামিক রাউটিংয়ে [id] একক প্যারামিটার ধারণ করে। [...slug] একাধিক নেস্টেড সেগমেন্টকে অ্যারে আকারে ক্যাচ করে। আর [[...slug]] অপশনাল ক্যাচ-অল হিসেবে কাজ করে যা প্যারামিটার ছাড়া মূল ইউআরএলটিকেও রেন্ডার করতে পারে।",
          "e": "Single dynamic routes use [id], while catch-all routes use [...slug] to match nested sub-paths as an array (e.g. /docs/a/b). Optional catch-all [[...slug]] matches both nested segments and the base path itself without parameters.",
          "code": "// /app/shop/[...slug]/page.tsx:\n// Matches /shop/clothing, /shop/clothing/shirts\nexport default function Page({ params }: { params: { slug: string[] } }) { ... }"
        },
        {
          "lvl": "lvl2",
          "q": "Route Handlers (`route.ts`) কী এবং এটি কীভাবে ট্র্যাডিশনাল Express.js এপিআই-এর মতো কাজ করে?",
          "m": "Route Handlers হলো App Router-এর ব্যাকএন্ড এপিআই হ্যান্ডলার। ফোল্ডারের ভেতরে `route.ts` ফাইলে আমরা স্ট্যান্ডার্ড HTTP মেথড ফাংশন এক্সপোর্ট করি: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`। এটি Web Request এবং Response অবজেক্ট ব্যবহার করে, যার ফলে কোনো এক্সপ্রেস বা আলাদা নোড সার্ভার ছাড়াই Next.js-এর ভেতরেই সম্পূর্ণ সুরক্ষিত REST API বিল্ড করা যায়।",
          "b": "রাউট হ্যান্ডলার হলো নেক্সট জেএস-এর বিল্ট-ইন ব্যাকএন্ড এপিআই কাঠামো। app ডিরেক্টরির ভেতরে route.ts ফাইল তৈরি করে GET, POST ইত্যাদি মেথড এক্সপোর্ট করে যেকোনো রেস্ট এপিআই বা ওয়েবহুক এন্ডপয়েন্ট হ্যান্ডেল করা যায়।",
          "e": "Route Handlers (route.ts) replace API routes in App Router. They export standard HTTP method functions (GET, POST, DELETE, etc.) utilizing the Web Request and Response standards to power backend endpoints or webhooks inside Next.js.",
          "code": "export async function GET(request: Request) {\n  const data = await fetchUsers();\n  return Response.json({ success: true, data });\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Streaming SSR এবং React Suspense কীভাবে Time to First Byte (TTFB) এবং First Contentful Paint (FCP) উন্নত করে?",
          "m": "ট্র্যাডিশনাল SSR-এ পুরো পেজের সব ডেটা ফেচ শেষ না হওয়া পর্যন্ত সার্ভার কোনো HTML রেসপন্স পাঠাতে পারত না, ফলে স্লো এপিআই থাকলে ইউজার সাদা স্ক্রিন দেখে বসে থাকত। Streaming SSR-এ নেক্সট সার্ভার তৎক্ষণাৎ পেজের প্রাথমিক শেল/লেআউট ব্রাউজারে স্ট্রীম করে দেয় (ফাস্ট TTFB ও FCP)। এরপর ভারী ডাটা কম্পোনেন্টগুলোকে `<Suspense fallback={<Skeleton />}>` এ র্যাপ করা থাকলে ব্যাকগ্রাউন্ডে ডাটা রেডি হওয়া মাত্র একই HTTP কানেকশনে চঙ্ক আকারে পাঠিয়ে ক্লায়েন্টের স্ক্রিনে রিপ্লেস করে দেয়।",
          "b": "স্ট্রিমিং এসএসআর সার্ভারকে সম্পূর্ণ পেজ একসাথে তৈরি করার অপেক্ষা না করে প্রস্তুত অংশগুলো ধাপে ধাপে ব্রাউজারে পাঠাতে সাহায্য করে। সাসপেন্স ফলব্যাকের মাধ্যমে ব্যবহারকারী তৎক্ষণাৎ প্রাথমিক ইন্টারফেস ও লোডার দেখতে পায়, ফলে টিটিএফবি এবং এফসিপি মেট্রিক্স অত্যন্ত চমৎকার থাকে।",
          "e": "Traditional SSR blocks until the slowest query resolves before sending any HTML. Streaming SSR with React Suspense chunks HTML output, immediately dispatching static navigation shells to the client, then streaming resolved dynamic components over the same stream as their promises fulfill.",
          "code": "<Suspense fallback={<InvoiceSkeleton />}>\n  <InvoiceList tenantId={id} />\n</Suspense>"
        },
        {
          "lvl": "lvl3",
          "q": "Next.js-এর ৪ স্তরের ক্যাশিং আর্কিটেকচার (Request Memoization, Data Cache, Full Route Cache, Router Cache) কীভাবে ইন্টারনালি অপারেট করে?",
          "m": "নেক্সট জেএস-এ ৪টি লেয়ার থাকে: (১) Request Memoization: একই রেন্ডার পাসে একাধিক কম্পোনেন্টে একই ফেচ কল থাকলে রিকোয়েস্টকে ডিডুপ্লিকেট করে। (২) Data Cache: সার্ভার সাইডে ডেটা পারসিস্ট করে যা রিকোয়েস্ট ও ডিপ্লয়মেন্টের পরেও টিকে থাকে (revalidate না হওয়া পর্যন্ত)। (৩) Full Route Cache: বিল্ড টাইমে বা ISR-এ পুরো রেন্ডার করা HTML এবং RSC পেলোড সার্ভারে ক্যাশ করে। (৪) Router Cache: ক্লায়েন্ট ব্রাউজারের ইন-মেমোরি ক্যাশ যা ইউজার এক পেজ থেকে অন্য পেজে নেভিগেট করার সময় প্রিলোডেড পেজগুলোকে চোখের পলকে দেখায়।",
          "b": "নেক্সট জেএস-এর ক্যাশিং চারটি স্তরে বিভক্ত: রিকোয়েস্ট মেমোইজেশন একই রিকোয়েস্টে বারবার ডাটা ফেচিং এড়ায়; ডাটা ক্যাশ সার্ভার লেভেলে ডাটা জমিয়ে রাখে; ফুল রাউট ক্যাশ সম্পূর্ণ পেজের আউটপুট ক্যাশ করে; এবং রাউটার ক্যাশ ব্রাউজারের মেমোরিতে প্রিফেচ করা পেজ সংরক্ষণ করে ইনস্ট্যান্ট নেভিগেশন দেয়।",
          "e": "The 4 caching layers comprise: Request Memoization (deduplicating identical fetch calls within one render cycle), Data Cache (persisting fetched data across requests on the server), Full Route Cache (caching pre-rendered HTML and RSC payloads), and Router Cache (in-memory client-side cache storing visited route segments).",
          "tip": "ক্যাশিং আর্কিটেকচারের এই ৪টি লেয়ার ব্যাখ্যা করতে পারা সিনিয়র বা লিড ফুল-স্ট্যাক রোলের জন্য গোল্ডেন অ্যান্সার।"
        },
        {
          "lvl": "lvl3",
          "q": "Parallel Routes (`@modal`) এবং Intercepting Routes (`(.)photos/[id]`) ব্যবহার করে ইনস্টাগ্রাম-স্টাইল ফটো মডাল কীভাবে আর্কিটেক্ট করা যায়?",
          "m": "Parallel Routes দিয়ে একটি লেআউটের ভেতর একাধিক স্লট প্যারাল্যালি রেন্ডার করা যায় (যেমন `@modal`)। আর Intercepting Routes দিয়ে ক্লায়েন্ট সাইড নেভিগেশনের সময় রাউটকে ইন্টারসেপ্ট করে কারেন্ট পেজের ওপর মডাল হিসেবে ওপেন করানো যায় (`(.)photos/123`), অথচ ব্রাউজার ইউআরএল বদলে যায় এবং শেয়ারেবল হয়। আবার ইউজার পেজ হার্ড রিফ্রেশ (`F5`) দিলে তখন মডাল না দেখিয়ে সম্পূর্ণ ফুল-পেজ ফটো ভিউ রেন্ডার হয়।",
          "b": "প্যারালাল রাউট ও ইন্টারসেপ্টিং রাউটের সমন্বয়ে ইনস্টাগ্রাম স্টাইল মডাল তৈরি করা হয়। হোমপেজ থেকে কোনো ছবিতে ক্লিক করলে ইন্টারসেপ্টিং রাউট পেজ পরিবর্তন না করে হোমপেজের উপরেই সুন্দর মডাল পপআপ দেখায় এবং ইউআরএল আপডেট করে; কিন্তু একই ইউআরএল সরাসরি ব্রাউজারে রিফ্রেশ করলে মূল ডেডিকেটেড পেজটি ওপেন হয়।",
          "e": "Parallel Routes render multiple independent slots simultaneously within the same layout, while Intercepting Routes intercept client navigation to display the target route as an overlay modal inside the current context. Hard refreshes bypass the interception and render the standalone full page.",
          "code": "// Directory Structure:\n// app/feed/@modal/(.)post/[id]/page.tsx\n// app/feed/post/[id]/page.tsx"
        },
        {
          "lvl": "lvl3",
          "q": "Next.js App Router-এ Security: Server Action Injection এবং CSRF Attack কীভাবে প্রতিরোধ করবে?",
          "m": "যেহেতু Server Actions ক্লায়েন্ট থেকে POST রিকোয়েস্ট হিসেবে ইনভোক হয়, তাই সিকিউরিটি রিস্ক থাকে। সমাধান: (১) Next.js বিল্ট-ইনভাবে Host এবং Origin হেডার চেক করে CSRF প্রতিরোধ করে। (২) প্রতিটা Server Action-এর শুরুতে ইউজার সেশন ও রোল ভ্যালিডেট করতে হবে (`const session = await getSession(); if (!session) throw new Error()`)। (৩) ইনপুট ডাটাকে অবশ্যই Zod দিয়ে কঠোরভাবে পার্স ও স্যানিটাইজ করতে হবে যাতে প্যারামিটার টেম্পারিং বা ইনজেকশন না হতে পারে।",
          "b": "সার্ভার অ্যাকশন সুরক্ষায় নেক্সট জেএস নিজে থেকেই অরিজিন ও হোস্ট হেডার মিলিয়ে সিএসআরএফ প্রতিরোধ করে। এছাড়াও প্রতিটি সার্ভার অ্যাকশনের ভেতরে কঠোর সেশন যাচাইকরণ, রোল চেক এবং Zod দিয়ে ইনপুট ডাটা স্যানিটাইজ করা বাধ্যতামূলক।",
          "e": "Next.js mitigates CSRF attacks by matching Origin and Host headers on Server Action POST requests. Developers must additionally authenticate sessions inside each action, verify RBAC authorizations, and enforce strict input schema parsing with Zod before database operations.",
          "code": "export async function deleteOrder(id: string) {\n  'use server';\n  const session = await auth();\n  if (session?.user.role !== 'ADMIN') throw new Error('Unauthorized');\n  await db.order.delete({ where: { id } });\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Partial Prerendering (PPR) কী এবং এটি আধুনিক নেক্সট জেএস অ্যাপ্লিকেশনে কীভাবে আলটিমেট হাইব্রিড পারফরম্যান্স প্রদান করে?",
          "m": "Partial Prerendering (PPR) হলো একই রাউটের ভেতর স্ট্যাটিক ও ডায়নামিক রেন্ডারিংয়ের নিখুঁত সমন্বয়। বিল্ড টাইমে পেজের সব স্ট্যাটিক অংশ (যেমন ন্যাভবার, ব্যানার, ফুটার) প্রি-রেন্ডার হয়ে স্ট্যাটিক শেলের মতো এজ ক্যাশে থাকে। আর পেজের ভেতরের ডায়নামিক কম্পোনেন্টগুলো (যেমন ইউজারের কার্ট বা রিকমেন্ডেশন) `<Suspense>` এর ভেতরে থাকে। ইউজার যখন ভিজিট করে, স্ট্যাটিক শেল নিমেষেই লোড হয় এবং ডায়নামিক অংশ একই সাথে প্যারালালে স্ট্রীম হয়ে পূরণ হয়।",
          "b": "পার্শিয়াল প্রিরেন্ডারিং এমন একটি আধুনিক প্রযুক্তি যা একটি একক ওয়েব পেজে স্ট্যাটিক ও ডায়নামিক কন্টেন্টকে একত্রে পাওয়ারফুল করে। পেজের স্ট্যাটিক কাঠামোগুলো বিল্ড টাইমে সিডিএন-এ সংরক্ষিত থাকে এবং ব্যবহারকারী ঢোকার পর শুধুমাত্র ডায়নামিক অংশগুলো সার্ভার থেকে স্ট্রীম হয়ে স্ক্রিনে বসে যায়।",
          "e": "Partial Prerendering combines static and dynamic rendering within the exact same route. Next.js serves a pre-rendered static shell instantaneously from the edge, while streaming asynchronous dynamic holes wrapped in Suspense boundaries in parallel without separate client waterfall requests.",
          "tip": "PPR হলো Next.js-এর মোস্ট অ্যাডভান্সড আর্কিটেকচারাল ফিচারগুলোর একটি।"
        },
        {
          "lvl": "situation",
          "q": "Next.js অ্যাপে লগইন করার পর কুকি সেট হলেও রাউটার রিডাইরেক্টে ড্যাশবোর্ড পেজ পুরানো আন-অথোরাইজড স্টেট ক্যাশ দেখাচ্ছে। কীভাবে ফিক্স করবে?",
          "m": "এটি ঘটে Router Cache-এর কারণে, কারণ নেক্সট জেএস ক্লায়েন্টে পেজ প্রিফেচ ক্যাশ করে রাখে। সমাধান: (১) লগইনের পর ক্লায়েন্ট সাইডে `router.push('/dashboard')` ডাকার সাথে সাথে বা আগে `router.refresh()` কল করতে হবে যাতে ক্লায়েন্ট রাউটার ক্যাশ ইনভ্যালিডেট হয়। (২) Server Action-এ লগইন করলে সেখানে `revalidatePath('/', 'layout')` দিতে হবে যাতে সার্ভার সাইডের ক্যাশড লেআউট এবং কুকি সেশন রি-ইভালুয়েট হয়।",
          "b": "ক্লায়েন্ট রাউটার ক্যাশের কারণে এই সমস্যা দেখা দেয়। লগইন সফল হওয়ার পর router.refresh() কল করতে হবে যাতে ব্রাউজারের ইন-মেমোরি ক্যাশ বাতিল হয়ে নতুন কুকিসহ সার্ভার থেকে আপডেটেড স্টেট আসে।",
          "e": "This occurs due to the client Router Cache. Fix this by invoking router.refresh() alongside router.push(), or calling revalidatePath('/', 'layout') inside the login Server Action to invalidate client cache trees and force cookie re-evaluation.",
          "code": "const handleLogin = async () => {\n  await loginAction(creds);\n  router.refresh();\n  router.push('/dashboard');\n};"
        },
        {
          "lvl": "situation",
          "q": "প্রোডাকশন বিল্ডে একটি পেজ স্ট্যাটিক রেন্ডার হতে গিয়ে `cookies()` বা `headers()` ব্যবহারের কারণে বিল্ড এরর দিচ্ছে। কীভাবে সমাধান করবে?",
          "m": "যেহেতু `cookies()` এবং `headers()` রানটাইম রিকোয়েস্টের ওপর নির্ভরশীল, তাই নেক্সট জেএস বুঝতে পারে এটি স্ট্যাটিকালি বিল্ড করা সম্ভব নয়। সমাধান: পেজ ফাইলে স্পষ্টভাবে ডাইনামিক রেন্ডারিং ডিক্লেয়ার করতে হবে: `export const dynamic = 'force-dynamic'` অথবা ওই ডেটা রিডিং অংশটুকুকে `<Suspense>` এর ভেতরে একটি সার্ভার কম্পোনেন্টে আলাদা করতে হবে।",
          "b": "কুকি বা হেডার রানটাইম ডাটা। বিল্ডের সময় এগুলো পাওয়া যায় না বিধায় পেজকে ডায়নামিক ঘোষণা করতে হবে `export const dynamic = 'force-dynamic'` লিখে, অথবা সাসপেন্স বাউন্ডারি ব্যবহার করে ডায়নামিক অংশের রেন্ডারিং আলাদা করতে হবে।",
          "e": "Calling dynamic APIs like cookies() or headers() opts a route out of static generation. Add `export const dynamic = 'force-dynamic'` to the route segment config, or isolate the dynamic read inside a Suspense-wrapped Server Component.",
          "code": "export const dynamic = 'force-dynamic';\nimport { cookies } from 'next/headers';"
        },
        {
          "lvl": "situation",
          "q": "একটি ডায়নামিক ই-কমার্স প্রোডাক্ট পেজে ১ লক্ষ পণ্য রয়েছে। বিল্ড টাইমে সব পেজ SSG করতে গেলে বিল্ড টাইম ঘণ্টার পর ঘণ্টা আটকে থাকে। সমাধান কী?",
          "m": "সব ১ লক্ষ পেজ একসাথে প্রি-রেন্ডার করা যাবে না। সমাধান: `generateStaticParams()`-এ শুধুমাত্র টপ ১০০ বা ১০০০ সর্বাধিক বিক্রিত পণ্যের স্লাগ রিটার্ন করব। বাকি পণ্যের জন্য `export const dynamicParams = true` রাখব, যাতে ব্যবহারকারী কোনো আন-জেনারেটেড পেজে প্রথমবার ঢুকলে সার্ভার অন-ডিমান্ড পেজটি রেন্ডার করে ক্যাশে জমা করবে এবং পরবর্তী সকল ইউজার ক্যাশ থেকে দ্রুত পাবে।",
          "b": "এক লক্ষ পণ্য বিল্ড টাইমে জেনারেট না করে কেবল শীর্ষ জনপ্রিয় ১০০০টি পণ্যের জন্য generateStaticParams চালাবো। dynamicParams = true রেখে বাকি পণ্যগুলো যখন গ্রাহক প্রথম ভিজিট করবে তখন ব্যাকগ্রাউন্ডে আইএসআর (ISR) পদ্ধতিতে রেন্ডার হয়ে স্থায়ীভাবে ক্যাশ হয়ে যাবে।",
          "e": "Pre-render only the top 1,000 high-traffic products at build time using generateStaticParams(), leaving export const dynamicParams = true. Unrendered pages will be rendered on-demand upon first visit and subsequently cached via ISR.",
          "code": "export async function generateStaticParams() {\n  const topProducts = await getTopProducts(1000);\n  return topProducts.map(p => ({ id: p.id }));\n}\nexport const dynamicParams = true;"
        },
        {
          "lvl": "situation",
          "q": "একটি ক্লায়েন্ট কম্পোনেন্টে বড় ডেট-পিকার বা চার্ট লাইব্রেরি ব্যবহার করায় ইনিশিয়াল বান্ডেল সাইজ অনেক বেড়ে গেছে। কীভাবে অপটিমাইজ করবে?",
          "m": "আমরা Next.js-এর `dynamic()` ইমপোর্ট (Dynamic Import / Code Splitting) ব্যবহার করব। এতে চার্ট কম্পোনেন্টটি আলাদা জাভাস্ক্রিপ্ট চাঙ্কে ভাগ হয়ে যাবে এবং পেজ লোডের সময় মেইন থ্রেডে আসবে না, শুধুমাত্র ইউজার যখন চার্ট ট্যাবে স্ক্রল বা ক্লিক করবে তখনই ডাউনলোড হবে। সার্ভার রেন্ডারিং এড়াতে `{ ssr: false }` ব্যবহার করব।",
          "b": "বড় লাইব্রেরির জন্য নেক্সট জেএস-এর ডায়নামিক ইমপোর্ট ব্যবহার করতে হবে। এতে কম্পোনেন্টটি পৃথক জাভাস্ক্রিপ্ট বান্ডেলে বিভক্ত হয় এবং প্রয়োজন ছাড়া লোড হয় না, ফলে প্রাথমিক পেজ লোড অত্যন্ত দ্রুত হয়।",
          "e": "Utilize Next.js dynamic() imports with `{ ssr: false }` to code-split the heavyweight charting or date-picker library into an isolated chunk loaded on-demand only when rendered.",
          "code": "import dynamic from 'next/dynamic';\nconst SalesChart = dynamic(() => import('@/components/SalesChart'), {\n  ssr: false,\n  loading: () => <p>Loading Chart...</p>\n});"
        },
        {
          "lvl": "situation",
          "q": "Vercel-এ ডেপ্লয় করার পর Server Action কল করলে `Payload Too Large (413)` এরর আসছে ফাইল আপলোডের সময়। সমাধান কী?",
          "m": "Next.js Server Actions-এর একটি ডিফল্ট বডি সাইজ লিমিট থাকে (ডিফল্ট ১MB)। সমাধান: (১) `next.config.js`-এ `serverActions.bodySizeLimit` বাড়িয়ে ১০MB বা প্রয়োজনীয় সাইজ দিতে পারি। (২) প্রোডাকশন বেস্ট প্র্যাকটিস হলো বড় ফাইল সরাসরি সার্ভার অ্যাকশনে না পাঠিয়ে AWS S3 বা Supabase Storage-এর প্রে-সাইন্ড ইউআরএল (Presigned URL) নিয়ে ক্লায়েন্ট থেকে সরাসরি ক্লাউড স্টোরেজে আপলোড করা।",
          "b": "নেক্সট জেএস সার্ভার অ্যাকশনের ডিফল্ট বডি সাইজ লিমিট ১ মেগাবাইট। next.config.js এ লিমিট বাড়ানো যায় অথবা আরও ভালো সমাধান হলো ক্লায়েন্ট সাইড থেকে সরাসরি প্রি-সাইন্ড ইউআরএল দিয়ে অ্যামাজন এসথ্রি বা ক্লাউড স্টোরেজে ফাইল আপলোড করা।",
          "e": "Configure bodySizeLimit under experimental.serverActions in next.config.js to increase upload limits, or ideally, generate pre-signed S3 upload URLs to stream large media files directly from the browser to cloud buckets.",
          "code": "// next.config.js\nmodule.exports = {\n  experimental: {\n    serverActions: {\n      bodySizeLimit: '10mb'\n    }\n  }\n};"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর মাল্টি-টেন্যান্ট SaaS অ্যাপ্লিকেশনে সাবডোমেন (`tenant.dokani.com`) কীভাবে Next.js Middleware দিয়ে ডায়নামিকভাবে রাউট করা হয়েছে?",
          "m": "আমরা `middleware.ts`-এ আগত রিকোয়েস্টের `host` হেডার রিড করি। যদি হোস্ট `tenant.dokani.com` হয়, তখন সাবডোমেন অংশটি এক্সট্র্যাক্ট করে `NextResponse.rewrite()` দিয়ে ইন্টারনালি `/tenants/[tenant]/...` ডিরেক্টরিতে রিরাইট করি। ইউজার ব্রাউজারের ইউআরএল বারে সাবডোমেনই দেখতে পায়, কিন্তু নেক্সট জেএস ইন্টারনালি টেন্যান্টের স্পেসিফিক পেজ রেন্ডার করে।",
          "b": "দোকানি অ্যাপে মাল্টি-টেন্যান্সি পরিচালনার জন্য মিডলওয়্যারে হোস্ট হেডার বিশ্লেষণ করে সাবডোমেন বের করা হয়। এরপর ইন্টারনাল রিরাইট (NextResponse.rewrite) ব্যবহার করে রিকোয়েস্টকে নির্দিষ্ট টেন্যান্টের ফোল্ডারে রি-রুট করা হয় যাতে ব্যবহারকারীর সাবডোমেন বজায় থাকে।",
          "e": "In Dokani POS SaaS, middleware inspects the host header from request.headers, extracts the tenant subdomain, and dynamically rewrites the path internally to `/tenants/${subdomain}${path}` while preserving the custom subdomain in the user's browser address bar.",
          "tip": "মাল্টি-টেন্যান্ট SaaS-এ সাবডোমেন রাউটিং আর্কিটেকচার হলো যে কোনো হাই-লেভেল ফুল-স্ট্যাক রোলের অন্যতম কঠিন ইন্টারভিউ প্রশ্ন।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ শত শত স্টোরের ইনভেন্টরি ও সেলস ড্যাশবোর্ডে SEO এবং সোশ্যাল প্রিভিউ (OG Images) কীভাবে অটোমেটিক ডায়নামিক জেনারেট করেছিলে?",
          "m": "আমরা Next.js App Router-এর `generateMetadata()` এবং `@vercel/og` (`ImageResponse`) ব্যবহার করেছি। প্রতিটি স্টোর ও পণ্যের জন্য টাইটেল ও মেটা ডেসক্রিপশন সার্ভার সাইডে ফেচ করে ডায়নামিক এসইও ট্যাগ বসানো হয়। আর `opengraph-image.tsx` ফাইলের ভেতর JSX দিয়ে লাইভ স্টোর লোগো ও প্রোডাক্ট প্রাইস সহ রিয়েল-টাইম ইমেজ রেন্ডার হয়, যা ফেসবুকে শেয়ার করলে চমৎকার কার্ড দেখায়।",
          "b": "আমরা নেক্সট জেএস অ্যাপ রাউটারের generateMetadata ফাংশন এবং opengraph-image.tsx ব্যবহার করে প্রতি স্টোরের জন্য লাইভ মেটাডাটা ও ইমেজ রেসপন্স তৈরি করেছি। ফলে সোশ্যাল মিডিয়াতে শেয়ারের সময় ডায়নামিক ব্যানার ও এসইও ট্যাগ প্রদর্শিত হয়।",
          "e": "We leveraged generateMetadata() for server-evaluated OpenGraph tags and dynamically composed social preview banners using Next.js ImageResponse (Satori-powered edge JSX-to-PNG renderer) in opengraph-image.tsx.",
          "code": "export async function generateMetadata({ params }): Promise<Metadata> {\n  const store = await getStore(params.tenant);\n  return { title: `${store.name} | Dokani POS`, description: store.bio };\n}"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD লার্নিং প্ল্যাটফর্মে লাইভ এক্সাম চলাকালীন স্টুডেন্টদের কোশ্চেন পেপারে চিটিং ঠেকাতে Next.js আর্কিটেকচারে কী ধরনের প্রটেকশন নেওয়া হয়েছিল?",
          "m": "সমাধান: (১) এক্সাম পেপার কখনোই ক্লায়েন্টে একবারে সম্পূর্ণ পাঠানো হতো না; Next.js Server Components এবং Server Actions দিয়ে প্রতিটা প্রশ্ন আলাদা ফেচ হতো এবং আগের প্রশ্নের উত্তর জমা হওয়ার পরই পরবর্তী প্রশ্ন স্ট্রীম হতো। (২) মিডলওয়্যারে সিঙ্গেল অ্যাক্টিভ ব্রাউজার সেশন লক করা হয়েছিল যাতে অন্য ট্যাব বা ডিভাইস থেকে একই অ্যাকাউন্টে ঢোকা মাত্র এক্সাম অটো-সাবমিট হয়ে যায়।",
          "b": "পিটিটিএবিডি অনলাইন পরীক্ষায় অসদুপায় রুখতে সার্ভার কম্পোনেন্টের সাহায্যে প্রতি ধাপে মাত্র একটি প্রশ্ন সরবরাহ করা হতো। মিডলওয়্যার দিয়ে মাল্টিপল ব্রাউজার ট্যাব এবং ভিন্ন আইপি সনাক্ত করে সেশন তাৎক্ষণিক লক করার নিরাপত্তা ব্যবস্থা নিশ্চিত করা হয়েছিল।",
          "e": "In PTTABD exams, the entire question bank was never delivered to the client DOM. Instead, Server Components yielded strictly one active question at a time via Server Actions. Middleware tracked single active browser session locks via Redis.",
          "tip": "ইন্টারভিউতে বলতে পারো: 'ক্লায়েন্ট সাইড বান্ডেলে কখনোই ফুল অ্যান্সার কি বা আন-রেন্ডারড প্রশ্ন এক্সপোজ করা যাবে না'।"
        },
        {
          "lvl": "realworld",
          "q": "Next.js অ্যাপ্লিকেশনে Core Web Vitals (LCP, FID/INP, CLS) অপটিমাইজ করে গুগল লাইটহাউসে স্কোর ৯০+ কীভাবে বজায় রেখেছিলে?",
          "m": "অপটিমাইজেশন স্টেপস: (১) LCP (Largest Contentful Paint): হিরো সেকশনের মূল ব্যানার ইমেজে `priority` অ্যাট্রিবিউট দিয়ে প্রি-লোড করেছি এবং ফন্টগুলো `next/font` দিয়ে সেলফ-হোস্টেড করেছি যাতে কোনো FOIT/FOUT না হয়। (২) INP (Interaction to Next Paint): হেভি জাভাস্ক্রিপ্ট এক্সিকিউশন `useTransition` এবং ওয়েব ওয়ার্কারে সরিয়ে মেইন থ্রেড ফাঁকা রেখেছি। (৩) CLS (Cumulative Layout Shift): সব ইমেজ ও ব্যানারে ফিক্সড অ্যাসপেক্ট রেশিও এবং কন্টেইনার ডাইমেনশন দিয়ে লেআউট শিফট ০ করেছি।",
          "b": "কোর ওয়েব ভাইটালস অপটিমাইজেশনে আমরা next/font দিয়ে গুগল ফন্ট লোকালি হোস্ট করেছি, হিরো ইমেজে priority ট্যাগ দিয়ে দ্রুততম সময়ে এলসিপি সম্পন্ন করেছি এবং কন্টেইনারের সাইজ নির্দিষ্ট রেখে লেআউট শিফট শূন্যে নামিয়ে এনেছি।",
          "e": "Optimized Core Web Vitals by: (1) self-hosting Google fonts via next/font to eradicate layout jumps, (2) adding priority to above-the-fold hero images for sub-1.2s LCP, (3) keeping INP under 100ms by offloading non-urgent state to useTransition, and (4) reserving aspect-ratio boxes to keep CLS at 0.",
          "code": "import { Inter } from 'next/font/google';\nconst inter = Inter({ subsets: ['latin'], display: 'swap' });"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর সেলস সামারি ড্যাশবোর্ডে রিয়েল-টাইম ডাটা আপডেট দেখাতে Server-Sent Events (SSE) বনাম WebSockets-এর মধ্যে Next.js-এ কোনটি বেছে নিয়েছিলে এবং কেন?",
          "m": "যেহেতু সেলস ড্যাশবোর্ডে সার্ভার থেকে ক্লায়েন্টে শুধুই আপডেট পুশ করা প্রয়োজন (ইউজার ড্যাশবোর্ড থেকে ব্যাকগ্রাউন্ডে ঘন ঘন ডেটা পাঠায় না), তাই আমরা Route Handlers ব্যবহার করে Server-Sent Events (SSE) বেছে নিয়েছিলাম। SSE সাধারণ HTTP/2 কানেকশনের ওপর রান করে, স্বয়ংক্রিয়ভাবে রিকানেক্ট করে এবং ফুল-ডুপ্লেক্স ওয়েবসকেটের তুলনায় সার্ভার রিসোর্স ও ফায়ারওয়াল ওভারহেড অনেক কমায়।",
          "b": "দোকানি বিক্রয় ড্যাশবোর্ডে কেবল সার্ভার থেকে তথ্য ক্লায়েন্টে পাঠানোর প্রয়োজন হওয়ায় আমরা এসএসই (Server-Sent Events) বেছে নিয়েছিলাম। এটি এইচটিটিপি/২ প্রোটোকলে মসৃণভাবে চলে এবং সার্ভারে অতিরিক্ত মেমোরি খরচ না করে লাইভ নোটিফিকেশন প্রদান করে।",
          "e": "For Dokani's live sales feed, we chose Server-Sent Events (SSE) over WebSockets because metrics flow unidirectionally from server to client. Built atop standard HTTP/2, SSE offers native browser reconnection handling with lighter server memory overhead.",
          "tip": "ইন্টারভিউতে 'Unidirectional data push' এর জন্য SSE যে WebSockets-এর চেয়ে হালকা ও ক্লিন আর্কিটেকচার, এটি উল্লেখ করলে টেক লিডরা খুব মুগ্ধ হন।"
        }
      ]
    },
    {
      "id": "javascript-es6-web",
      "name": "JavaScript (ES6+) & Web Core",
      "desc": "ES6+ Features, Closures, Scopes, Prototypes, Event Loop, Promises, Async/Await, Web APIs, Memory Management",
      "items": [
        {
          "lvl": "lvl1",
          "q": "JavaScript-এ `var`, `let`, এবং `const`-এর মধ্যে মূল পার্থক্য কী?",
          "m": "`var` হলো Function-scoped এবং এটি উইন্ডো অবজেক্টে অ্যাটাচ হয় ও Hoisting-এর সময় `undefined` দিয়ে ইনিশিয়ালাইজ হয়, যা বাগে ফেলে। আর `let` এবং `const` হলো Block-scoped (`{}`) এবং এগুলো Hoisting হলেও ইনিশিয়ালাইজেশনের আগ পর্যন্ত Temporal Dead Zone (TDZ)-এ থাকে। `let`-এর মান পরবর্তীতে রি-অ্যাসাইন করা যায়, কিন্তু `const`-এর ভ্যারিয়েবল রেফারেন্স রি-অ্যাসাইন করা যায় না।",
          "b": "var ফাংশন-স্কোপড এবং এটি হোইস্টিংয়ের শিকার হয়ে আনডিফাইন্ড ভ্যালু পায়। অন্যদিকে let এবং const ব্লক-স্কোপড এবং এরা টেম্পোরাল ডেড জোন (TDZ) মেনে চলে। let এর মান পরিবর্তন করা গেলেও const দিয়ে ঘোষিত ভ্যারিয়েবলের মান পুনঃনির্ধারণ করা যায় না।",
          "e": "var is function-scoped and hoisted with undefined initialization. let and const are block-scoped and live in the Temporal Dead Zone (TDZ) prior to declaration. let variables can be reassigned, whereas const bindings are immutable.",
          "tip": "কখনোই var ব্যবহার করবে না; সবসময় const ডিফল্ট এবং পরিবর্তনশীল মানে let ব্যবহার করবে।"
        },
        {
          "lvl": "lvl1",
          "q": "JavaScript Closure কী এবং বাস্তব প্রজেক্টে এর একটি সহজ উদাহরণ দাও?",
          "m": "Closure হলো এমন একটি মেকানিজম যেখানে একটি ইনার ফাংশন তার আউটার ফাংশন এক্সিকিউট হয়ে শেষ হয়ে যাওয়ার পরেও আউটার ফাংশনের ভ্যারিয়েবল স্কোপ মনে রাখে এবং অ্যাক্সেস করতে পারে। যেমন: প্রাইভেট কাউন্টার ভ্যারিয়েবল তৈরি করতে বা ডেটা হাইড করতে ক্লোজার ব্যবহার করা হয়।",
          "b": "ক্লোজার হলো জাভাস্ক্রিপ্টের এমন একটি বৈশিষ্ট্য যেখানে একটি অভ্যন্তরীণ ফাংশন তার বাইরের ফাংশনের স্কোপ শেষ হয়ে যাওয়ার পরেও সেই স্কোপের চলকগুলোকে মেমরিতে ধরে রাখতে ও ব্যবহার করতে পারে। ডাটা প্রাইভেসি এবং কাস্টম ফাংশন তৈরিতে ক্লোজার অপরিহার্য।",
          "e": "A closure is the combination of a function bundled together with references to its surrounding lexical environment. It gives an inner function access to an outer function's scope even after the outer function has returned.",
          "code": "function createCounter() {\n  let count = 0; // Private variable via closure\n  return () => ++count;\n}\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2"
        },
        {
          "lvl": "lvl1",
          "q": "Arrow Function এবং Regular Function-এর মধ্যে `this` কিওয়ার্ড কীভাবে ভিন্নভাবে আচরণ করে?",
          "m": "Regular Function-এ `this` নির্ধারিত হয় ফাংশনটি 'কীভাবে কল করা হয়েছে' তার ওপর (Dynamic Scoping)। কিন্তু Arrow Function-এর নিজস্ব কোনো `this` বা `arguments` অবজেক্ট থাকে না; এটি তার আশপাশের লেক্সিক্যাল স্কোপ (Lexical Scope) থেকে প্যারেন্টের `this` ধার করে। একারণে ইভেন্ট লিসেনার বা কলব্যাকে অ্যারো ফাংশন ব্যবহার করলে `this` লস্ট হওয়ার ভয় থাকে না।",
          "b": "রেগুলার ফাংশনে this এর মান রানটাইমে ফাংশন কলিং কনটেক্সটের ওপর নির্ভর করে পরিবর্তিত হয়। অন্যদিকে অ্যারো ফাংশনের নিজস্ব this থাকে না; এটি তার চারপাশের লেক্সিক্যাল পরিবেশ থেকে this এর মান গ্রহণ করে।",
          "e": "Regular functions define this based on how and where they are invoked (dynamic binding). Arrow functions do not bind their own this; instead, they capture the this value of the enclosing lexical execution context.",
          "code": "const obj = {\n  name: 'Dokani',\n  greet: function() { setTimeout(() => console.log(this.name), 100); }\n};\nobj.greet(); // Logs 'Dokani'"
        },
        {
          "lvl": "lvl1",
          "q": "JavaScript-এ `==` (Loose Equality) এবং `===` (Strict Equality)-এর মধ্যে পার্থক্য কী?",
          "m": "`==` তুলনা করার আগে দুটি অপারেন্ডকে টাইপ কনভার্সন (Type Coercion বা কাস্টিং) করে সমান করার চেষ্টা করে, যেমন `5 == '5'` সত্য (true) রিটার্ন করে। আর `===` কোনো টাইপ কনভার্সন করে না; মান এবং ডেটা টাইপ দুটোই হুবহু এক হতে হয়, তাই `5 === '5'` মিথ্যা (false) রিটার্ন করে।",
          "b": "ডাবল সমান (==) অপারেন্ড দুটির টাইপ রূপান্তর বা টাইপ কোরশন করে মান পরীক্ষা করে। ট্রিপল সমান (===) কঠোর সমতা রক্ষা করে, অর্থাৎ মান এবং ডেটা টাইপ উভয়ই অভিন্ন না হলে সত্য ফলাফল দেয় না।",
          "e": "The loose equality operator (==) performs implicit type coercion prior to comparison (e.g. 0 == false is true). The strict equality operator (===) compares both value and data type without coercion, making it safer and deterministic.",
          "tip": "প্রোডাকশন কোডে সবসময় ট্রিপল সমান (===) ব্যবহার করা স্ট্যান্ডার্ড ইন্ডাস্ট্রি প্র্যাকটিস।"
        },
        {
          "lvl": "lvl1",
          "q": "Array Methods: `map`, `filter`, এবং `reduce`-এর মধ্যে মৌলিক পার্থক্য কী?",
          "m": "`map` অ্যারের প্রতিটি উপাদানকে ট্রান্সফর্ম করে একই লেন্থের নতুন অ্যারে দেয়। `filter` শর্ত পূরণকারী উপাদানগুলোকে নিয়ে ছোট বা সমান দৈর্ঘ্যের নতুন অ্যারে দেয়। আর `reduce` পুরো অ্যারের উপাদানগুলোকে একটি মাত্র ফলাফলে (যেমন মোট যোগফল, অবজেক্ট বা গ্রুপিং) রূপান্তর করে। কোনোটিই মূল অ্যারেকে মিউটেট করে না।",
          "b": "map প্রতিটি উপাদানের ওপর ফাংশন চালিয়ে নতুন সমদৈর্ঘ্যের অ্যারে তৈরি করে। filter শর্তযুক্ত সত্য উপাদান নিয়ে ফিল্টার করা অ্যারে প্রদান করে। reduce পুরো অ্যারের মানগুলো একত্রিত করে একটি চূড়ান্ত ফলাফল রিটার্ন করে।",
          "e": "map transforms every element into a new array of identical length. filter returns a subset array matching a predicate. reduce folds the array elements into a single accumulated result (e.g., number, object, or grouped dictionary).",
          "code": "const total = [10, 20, 30].reduce((acc, curr) => acc + curr, 0); // 60"
        },
        {
          "lvl": "lvl2",
          "q": "JavaScript Event Loop কীভাবে Call Stack, Web APIs, Task Queue, এবং Microtask Queue পরিচালনা করে?",
          "m": "কল স্ট্যাকে সিনক্রোনাস কোড একটার পর একটা এক্সিকিউট হয়। কোনো অ্যাসিনক্রোনাস কাজ আসলে (যেমন fetch, setTimeout) তা Web APIs ব্যাকগ্রাউন্ডে হ্যান্ডেল করে। কাজ শেষ হলে setTimeout যায় Task/Macrotask Queue-তে, আর Promises (`.then`), MutationObserver এবং `queueMicrotask` যায় Microtask Queue-তে। কল স্ট্যাক খালি হলে ইভেন্ট লুপ আগে মাইক্রোটাস্ক কিউ-এর সব কাজ শেষ করে, তারপর ম্যাক্রোটাস্ক কিউ থেকে একটি কাজ তোলে।",
          "b": "ইভেন্ট লুপ হলো জাভাস্ক্রিপ্টের নন-ব্লকিং অ্যাসিনক্রোনাস হৃদপিণ্ড। কল স্ট্যাক ফাঁকা হলে এটি প্রথমে মাইক্রোটাস্ক কিউ (প্রমিজ) এর কাজগুলো সম্পন্ন করে এবং এরপর ম্যাক্রোটাস্ক কিউ (সেটটাইমআউট) এর কাজগুলো স্ট্যাকে তুলে দেয়।",
          "e": "The Event Loop monitors the Call Stack and task queues. When the stack clears, it drains all jobs from the Microtask Queue (Promise callbacks, queueMicrotask) before processing the next pending task from the Macrotask Queue (setTimeout, I/O events).",
          "tip": "Promise সবসময় setTimeout-এর আগে এক্সিকিউট হয় কারণ Microtask Queue-এর প্রায়োরিটি বেশি।"
        },
        {
          "lvl": "lvl2",
          "q": "`Promise.all`, `Promise.allSettled`, `Promise.race`, এবং `Promise.any`-এর ব্যবহারের ক্ষেত্র কী?",
          "m": "(১) `Promise.all`: সবগুলো সফল হতে হবে, একটা ফেইল করলেই পুরোটা ফেইল (সব প্যারালাল ফেচের জন্য)। (২) `Promise.allSettled`: সবগুলো রেজাল্ট শেষ হওয়া পর্যন্ত অপেক্ষা করে, ফেইল বা পাস যাই হোক প্রতিটার স্ট্যাটাস অবজেক্ট দেয় (ব্যাচ রিপোর্ট তৈরিতে)। (৩) `Promise.race`: যে প্রমিজটি সবার আগে সেটল হবে (পাস বা ফেইল) তার রেজাল্ট দেয় (টাইমআউট ট্র্যাকিংয়ে)। (৪) `Promise.any`: সবার প্রথম যে কোনো একটি সফল (resolve) হলেই রিটার্ন করে, সবগুলো ফেইল করলে AggregateError দেয়।",
          "b": "Promise.all সবগুলো সফলতার ওপর নির্ভরশীল। Promise.allSettled সাফল্য বা ব্যর্থতা নির্বিশেষে সবগুলোর চূড়ান্ত রিপোর্ট দেয়। Promise.race দ্রুততম ফিনিশ হওয়া ফলাফল নেয়। Promise.any প্রথম সফল হওয়া প্রমিজকে গ্রহণ করে।",
          "e": "Promise.all fails fast if any reject. Promise.allSettled waits for all promises to settle regardless of outcome. Promise.race settles with the very first promise that fulfills or rejects. Promise.any returns the first successfully fulfilled promise.",
          "code": "const results = await Promise.allSettled([fetchUsers(), fetchOrders()]);"
        },
        {
          "lvl": "lvl2",
          "q": "JavaScript-এ Prototype এবং Prototypal Inheritance কীভাবে কাজ করে?",
          "m": "জাভাস্ক্রিপ্টে ক্লাসিকাল অবজেক্ট-ওরিয়েন্টেড ক্লাসের মতো ইনহেরিট্যান্স হয় না; এখানে প্রতিটি অবজেক্টের একটি ইন্টারনাল হিডেন প্রপার্টি থাকে যাকে `[[Prototype]]` বলে (অ্যাক্সেসযোগ্য via `__proto__`)। যখন কোনো অবজেক্টে একটি প্রপার্টি খোঁজা হয়, জাভাস্ক্রিপ্ট প্রথমে অবজেক্টের ভেতর খোঁজে, না পেলে তার প্রোটোটাইপে যায়, এভাবে `null` না পাওয়া পর্যন্ত প্রোটোটাইপ চেইনে উপরে ওঠে। ES6 `class` সিনট্যাক্স মূলত এই প্রোটোটাইপাল মেকানিজমের ওপর সুগার কোট (Syntactic Sugar)।",
          "b": "জাভাস্ক্রিপ্টের ইনহেরিট্যান্স প্রোটোটাইপ চেইনের ওপর ভিত্তি করে কাজ করে। প্রতিটি অবজেক্ট তার প্রোটোটাইপ থেকে মেথড ও প্রপার্টি ধার করে। ক্লাস সিনট্যাক্স মূলত প্রোটোটাইপাল ইনহেরিট্যান্সেরই একটি সহজ উপস্থাপন মাত্র।",
          "e": "JavaScript uses prototypal inheritance where objects inherit directly from other objects via a hidden [[Prototype]] link. Property lookups traverse up the prototype chain until the property is found or the chain ends at Object.prototype (null).",
          "code": "const animal = { walk: () => 'walking' };\nconst dog = Object.create(animal);\nconsole.log(dog.walk()); // 'walking' via prototype chain"
        },
        {
          "lvl": "lvl2",
          "q": "JavaScript-এ Debounce এবং Throttle-এর মধ্যে পার্থক্য কী এবং কখন কোনটি ব্যবহার করবে?",
          "m": "Debounce ইভেন্ট ফায়ারিং বন্ধ হওয়ার পর নির্দিষ্ট সময় অপেক্ষা করে মাত্র একবার ফাংশন রান করায় (যেমন: সার্চ ইনপুটে টাইপিং শেষ হওয়া পর্যন্ত অপেক্ষা করা)। আর Throttle একটি নির্দিষ্ট সময় পরপর (যেমন প্রতি ৩০০ মিলিসেকেন্ডে) নিয়মিত ফাংশনটিকে সর্বোচ্চ একবার রান করতে দেয়, ব্যবহারকারী বিরতি না দিলেও (যেমন: উইন্ডো স্ক্রল বা উইন্ডো রিসাইজ হ্যান্ডলিংয়ে)।",
          "b": "ডিবউন্স ব্যবহারকারীর ইনপুট দেওয়া শেষ হওয়ার পর নির্দিষ্ট সময় পর্যন্ত অপেক্ষা করে একবার এক্সিকিউট হয়। অন্যদিকে থ্রটল নির্দিষ্ট বিরতিতে নিয়মিত একবার করে কাজ করতে দেয়, স্ক্রলিং বা রিসাইজিং ইভেন্টে ব্রাউজার ক্র্যাশ প্রতিরোধে এটি ব্যবহৃত হয়।",
          "e": "Debouncing delays invoking a function until after a specific duration has passed since the last trigger (ideal for search autocomplete). Throttling limits function execution to at most once per defined time interval (ideal for infinite scroll or resize handlers).",
          "code": "function debounce(fn, ms) {\n  let t; return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Deep Copy এবং Shallow Copy-এর মধ্যে পার্থক্য কী এবং JavaScript-এ নির্ভুল Deep Clone কীভাবে করা যায়?",
          "m": "Shallow Copy শুধু টপ লেভেলের প্রপার্টি কপি করে, কিন্তু ভেতরের নেস্টেড অবজেক্টগুলোর রেফারেন্স এক রেখে দেয় (`{ ...obj }` বা `Object.assign()`), ফলে নেস্টেড ডাটা পরিবর্তন করলে মূলে পরিবর্তন হয়ে যায়। Deep Copy নেস্টেড প্রতিটি লেভেলের একদম স্বাধীন নতুন কপি তৈরি করে। আধুনিক জাভাস্ক্রিপ্টে নেটিভ `structuredClone(obj)` মেথড দিয়ে পারফেক্ট ডিপ কপি করা যায়, যা Date, Map, Set ও Circular References ও হ্যান্ডেল করতে পারে (যা `JSON.parse(JSON.stringify())` পারে না)।",
          "b": "শ্যালো কপি শুধুমাত্র প্রথম স্তরের মান নকল করে কিন্তু গভীর নেস্টেড অবজেক্টের মেমোরি রেফারেন্স শেয়ার করে। ডিপ কপি প্রতিটি নেস্টেড অংশের সম্পূর্ণ আলাদা মেমোরি কপি তৈরি করে। আধুনিক ব্রাউজারে structuredClone() দিয়ে নিখুঁত ডিপ কপি করা যায়।",
          "e": "Shallow copy copies top-level properties but retains nested object references. Deep copy recursively duplicates all nested references. The modern standard is structuredClone(), which natively handles nested structures, Maps, Sets, and circular references unlike JSON.parse/stringify.",
          "code": "const clonedUser = structuredClone(originalUser);"
        },
        {
          "lvl": "lvl3",
          "q": "JavaScript Memory Leaks কেন হয় এবং V8 ইঞ্জিনের Garbage Collection মেকানিজম (Mark-and-Sweep) কীভাবে কাজ করে?",
          "m": "V8 ইঞ্জিন মেমোরি ক্লিয়ারের জন্য 'Mark-and-Sweep' অ্যালগরিদম ব্যবহার করে। এটি রুট অবজেক্ট (উইন্ডো বা গ্লোবাল) থেকে শুরু করে রেফারেন্সড অবজেক্টগুলোকে মার্ক করে এবং আন-রিচেবল অবজেক্টগুলোকে মেমোরি থেকে সুইপ বা ডিলিট করে দেয়। মেমোরি লিক ঘটে যখন: (১) গ্লোবাল ভ্যারিয়েবলে অপ্রয়োজনীয় ডাটা পুশ করা হয়, (২) আনক্লিনড `setInterval` চলতে থাকে, (৩) রিমুভ করা DOM নোডের ওপর ক্লোজার বা ইভেন্ট লিসেনার রেফারেন্স ধরে রাখে, বা (৪) `WeakMap`/`WeakSet` ব্যবহার না করে সাধারণ ম্যাপে অবজেক্ট কি রাখা হয়।",
          "b": "জাভাস্ক্রিপ্ট ভি-৮ ইঞ্জিন মার্ক-অ্যান্ড-সুইপ কৌশলে যেসব অবজেক্টের রুট রেফারেন্স নেই সেগুলোকে মেমোরি থেকে মুছে ফেলে। মেমোরি লিক হয় যখন অপ্রয়োজনীয় ইভেন্ট লিসেনার, টাইমার বা সাইকেল রেফারেন্স ডিলিট না হয়ে মেমোরিতে জীবিত থাকে।",
          "e": "V8 utilizes a generational Mark-and-Sweep garbage collector. Starting from roots, reachable nodes are marked while unreferenced memory is swept. Leaks occur due to accidental global variables, uncleared timers, lingering event listeners on detached DOM trees, or improper closure retainers.",
          "tip": "অবজেক্ট কি-ভিত্তিক ক্যাশিং করার সময় WeakMap ব্যবহার করলে অবজেক্ট গারবেজ কালেক্টেড হতে পারে।"
        },
        {
          "lvl": "lvl3",
          "q": "JavaScript Generators (`function*`) এবং Iterators আর্কিটেকচার কীভাবে কাজ করে এবং এদের বাস্তব ব্যবহার কী?",
          "m": "Generator হলো এমন একটি ফাংশন যা এক্সিকিউশনের মাঝখানে পজ (Pause) হতে পারে এবং পরবর্তীতে আবার যেখান থেকে থেমেছিল সেখান থেকে রেজুমে (Resume) করা যায় `yield` কিওয়ার্ডের মাধ্যমে। এটি একটি Iterator অবজেক্ট প্রদান করে যাতে `{ value, done }` থাকে। ইনফাইনাইট সিকোয়েন্স তৈরি করতে, বিশাল ডাটাবেজ রেকর্ড স্ট্রিম করে মেমোরি বাঁচিয়ে প্রসেস করতে বা Redux-Saga এর মতো জটিল অ্যাসিঙ্ক ফ্লো নিয়ন্ত্রণে জেনারেটর ব্যবহার করা হয়।",
          "b": "জেনারেটর ফাংশন yield কিওয়ার্ডের মাধ্যমে কাজের মাঝে থেমে যেতে পারে এবং প্রয়োজনমতো পুনরায় চালু হতে পারে। এটি মেমোরিতে একসাথে পুরো ডাটা না নিয়ে চাঙ্ক আকারে একটার পর একটা রেকর্ড অলসভাবে প্রসেস করার জন্য মেমোরি ফ্রেন্ডলি সমাধান দেয়।",
          "e": "Generators (function*) yield execution control back to the caller and maintain internal state until next() is called. They implement the Iterable protocol ({ value, done }) to process infinite data streams, evaluate lazy collections, or orchestrate complex async flows like Redux Saga.",
          "code": "function* idGenerator() {\n  let id = 1;\n  while (true) yield id++;\n}\nconst gen = idGenerator();\ngen.next().value; // 1\ngen.next().value; // 2"
        },
        {
          "lvl": "lvl3",
          "q": "JavaScript Proxy এবং Reflect API কীভাবে অবজেক্টের ইন্টারনাল অপারেশন ইন্টারসেপ্ট ও মেটাপ্রোগ্রামিং করতে সাহায্য করে?",
          "m": "Proxy অবজেক্টের ওপর যেকোনো অ্যাকশন (যেমন প্রপার্টি গেট, সেট, ডিলিট, ফাংশন কল ইত্যাদি) ইন্টারসেপ্ট করার জন্য 'Traps' বসাতে দেয়। আর `Reflect` এই ইন্টারসেপ্টেড ট্র্যাপগুলোর ডিফল্ট বিহেভিয়ার নিখুঁতভাবে এক্সিকিউট করতে সাহায্য করে। Vue 3-এর সম্পূর্ণ রিয়্যাক্টিভিটি সিস্টেম এবং MobX এই Proxy মেকানিজমের ওপর ভিত্তি করে তৈরি, যেখানে স্টেট পরিবর্তন হওয়া মাত্র স্বয়ংক্রিয়ভাবে নোটিফিকেশন ফায়ার হয়।",
          "b": "প্রক্সি এপিআই দিয়ে কোনো অবজেক্টের ভেতর ডাটা রিড, রাইট বা ডিলিট করার মুহূর্তে কাস্টম কোড বা ভ্যালিডেশন চালানো যায়। রিফ্লেক্ট এপিআই এর সাথে মিলিত হয়ে এটি মেটাপ্রোগ্রামিং এবং লাইভ ডাটা পর্যবেক্ষণ সিস্টেমে ব্যবহৃত হয়।",
          "e": "A Proxy wraps an object to intercept and redefine fundamental operations (get, set, deleteProperty) using traps. The Reflect API provides static methods matching these traps to forward operations cleanly. Libraries like Vue 3 reactivity rely heavily on Proxies.",
          "code": "const validator = new Proxy({}, {\n  set(target, prop, val) {\n    if (prop === 'age' && val < 0) throw new TypeError('Invalid age');\n    return Reflect.set(target, prop, val);\n  }\n});"
        },
        {
          "lvl": "lvl3",
          "q": "Web Workers কী এবং ভারী ক্যালকুলেশন ব্রাউজারের মেইন থ্রেড ব্লক না করে কীভাবে মাল্টি-থ্রেডিংয়ে রান করানো যায়?",
          "m": "যেহেতু জাভাস্ক্রিপ্ট সিঙ্গেল-থ্রেডেড, তাই কোটি কোটি ডাটা ক্যালকুলেট বা ইমেজ প্রসেসিং করতে গেলে ব্রাউজার ফ্রিজ হয়ে যায়। Web Workers সম্পূর্ণ আলাদা ব্যাকগ্রাউন্ড ওএস থ্রেডে চলে। মেইন থ্রেড থেকে `postMessage()` দিয়ে ডেটা পাঠানো হয় এবং ওয়ার্কার `onmessage` ইভেন্টে ডাটা রিসিভ করে প্রসেস শেষ হলে আবার মেইন থ্রেডে মেসেজ পাঠায়। তবে Web Workers সরাসরি DOM অ্যাক্সেস করতে পারে না।",
          "b": "ওয়েব ওয়ার্কার ব্রাউজারের মূল থ্রেডের বাইরে আলাদা ব্যাকগ্রাউন্ড থ্রেডে কোড এক্সিকিউট করে। ভারী হিসাব-নিকাশ ওয়ার্কারে পাঠিয়ে দিলে ব্যবহারকারীর ইন্টারফেস মসৃণ থাকে। মেসেজ আদান-প্রদানের জন্য postMessage এবং onmessage ব্যবহৃত হয়।",
          "e": "Web Workers provide true multithreading in browsers by executing scripts in isolated background threads separate from the main execution thread. Communication uses serialized message passing via postMessage, keeping the UI at 60fps without DOM access privileges.",
          "code": "// worker.js:\nonmessage = (e) => { postMessage(heavyMath(e.data)); };"
        },
        {
          "lvl": "lvl3",
          "q": "JavaScript-এ Tail Call Optimization (TCO) এবং Call Stack Overflow কীভাবে কাজ করে?",
          "m": "যখন কোনো রিকার্সিভ ফাংশন গভীর থেকে গভীরে কল হতে থাকে, প্রতি কলের জন্য নতুন স্ট্যাক ফ্রেম তৈরি হয়। স্ট্যাক সাইজের লিমিট অতিক্রম করলে 'Maximum call stack size exceeded' এরর আসে। Tail Call Optimization হলো এমন একটি কম্পাইলার অপটিমাইজেশন যেখানে ফাংশনের রিটার্ন স্টেটমেন্টে অন্য কোনো কাজের সাথে যোগ না হয়ে একদম শেষ অপারেশন হিসেবে নিজেই কল হয় (যেমন `return recurse(n-1, acc)`), ফলে নতুন ফ্রেম না খুলে পূর্বের ফ্রেমেই কাজ সম্পন্ন হয়। তবে ব্রাউজারগুলোতে এটি সীমিত, তাই বাস্তব কোডে রিকার্শনের বদলে Trampoline বা সাধারণ লুপ ব্যবহার করা শ্রেয়।",
          "b": "গভীর রিকার্শনের কারণে কল স্ট্যাকের সীমা পার হয়ে গেলে স্ট্যাক ওভারফ্লো হয়। টেইল কল অপটিমাইজেশনে রিকার্সিভ কলটি রিটার্নের শেষ অপারেশনে রাখলে পূর্বের স্ট্যাক ফ্রেম পুনর্ব্যবহার করা যায়। বাস্তব অ্যাপে রিকার্শনের ঝুঁকি এড়াতে লুপ বা ট্রাম্পোলিন কৌশল ব্যবহার করা হয়।",
          "e": "Deep recursion without termination bounds causes Call Stack Overflow. Tail Call Optimization (TCO) reuses the current stack frame if the recursive call is in the strict tail position (return fn()), preventing stack growth, though iterative loops remain the preferred defensive pattern in JavaScript.",
          "tip": "বড় ডাটাবেজ ট্রাভার্সালে রিকার্শন দিয়ে স্ট্যাক ব্লো না করে লুপ বা স্ট্যাক অ্যারে ব্যবহার করার যুক্তি দেওয়া প্রফেশনালিজম প্রকাশ করে।"
        },
        {
          "lvl": "situation",
          "q": "ব্যবহারকারী একটি ডেটা এক্সপোর্ট বাটনে ক্লিক করায় ১০ লক্ষ রেকর্ড ফিল্টার হতে গিয়ে পুরো ব্রাউজার ১০ সেকেন্ড ফ্রিজ হয়ে 'Page Unresponsive' দেখাচ্ছে। কীভাবে তাৎক্ষণিক ফিক্স করবে?",
          "m": "সমাধান: (১) মেইন থ্রেডে এই ভারী লুপ চালানো যাবে না। আমরা পুরো ফিল্টারিং টাস্কটিকে একটি Web Worker-এ পাঠিয়ে দেব। (২) যদি Web Worker সেটআপ ছাড়া দ্রুত ফিক্স করতে হয়, তবে অ্যারে প্রসেসিংকে ছোট ছোট চাঙ্কে (যেমন প্রতি ১০০টি রেকর্ড) ভাগ করে `requestIdleCallback` অথবা `setTimeout(..., 0)` দিয়ে টাইম-স্লাইসিং করব, যাতে প্রতি চাঙ্কের পর মেইন থ্রেড ইউজার ইন্টারঅ্যাকশন হ্যান্ডেল করার সুযোগ পায়।",
          "b": "ব্রাউজার ফ্রিজ হওয়া ঠেকাতে প্রসেসিংটিকে ওয়েব ওয়ার্কারে পাঠাতে হবে। বিকল্পভাবে, টাইম-স্লাইসিং পদ্ধতির মাধ্যমে অ্যারে প্রসেসকে ছোট ভাগে ভাগ করে requestIdleCallback দিয়ে ব্রাউজারের অলস সময়ে সম্পন্ন করতে হবে যাতে UI মসৃণ থাকে।",
          "e": "Offload the 1M-record filter operation to a dedicated Web Worker. Alternatively, chunk array processing via Time-Slicing using requestIdleCallback or recursive setTimeout(0) yielding execution control periodically to the UI event loop.",
          "code": "function processChunk(items, index = 0) {\n  const chunk = items.slice(index, index + 500);\n  doWork(chunk);\n  if (index + 500 < items.length) {\n    setTimeout(() => processChunk(items, index + 500), 0);\n  }\n}"
        },
        {
          "lvl": "situation",
          "q": "একটি থার্ড-পার্টি লাইব্রেরি উইন্ডো অবজেক্টে গ্লোবাল ভ্যারিয়েবল পলুট করে আমাদের প্রোডাকশন কোডের মেথডকে ওভাররাইট করে ফেলছে। কীভাবে এটি আইসোলেট করবে?",
          "m": "সমাধান: (১) লাইব্রেরির কোডকে একটি IIFE (Immediately Invoked Function Expression) এর ভেতর র্যাপ করব বা ES Modules (`type='module'`) ব্যবহার করব যাতে নিজস্ব স্কোপ তৈরি হয়। (২) আরও স্ট্রং সিকিউরিটি আইসোলেশনের জন্য একটি স্যান্ডবক্সড `<iframe>` অথবা Shadow Realm ব্যবহার করে লাইব্রেরিটিকে আলাদা গ্লোবাল কনটেক্সটে এক্সিকিউট করব এবং শুধু প্রয়োজনীয় রেজাল্ট মেসেজের মাধ্যমে আদান-প্রদান করব।",
          "b": "থার্ড পার্টি লাইব্রেরির হস্তক্ষেপ রোধ করতে IIFE মডিউল প্যাটার্ন অথবা একটি স্যান্ডবক্সড আইফ্রেম ব্যবহার করে লাইব্রেরিটির রানটাইম স্কোপ আলাদা রাখতে হবে যাতে মূল উইন্ডো অবজেক্টের ক্ষতি না হয়।",
          "e": "Isolate intrusive scripts using Immediately Invoked Function Expressions (IIFE), enforce ES Module boundaries, or execute the code inside a sandboxed iframe to shield the host window's global namespace from prototype poisoning.",
          "code": "(function(window, document) {\n  // Isolated scope\n  const privateLib = {};\n})(Object.create(window), document);"
        },
        {
          "lvl": "situation",
          "q": "ডাটাবেজ থেকে পাওয়া অবজেক্টে Circular Reference (ঘূর্ণায়মান রেফারেন্স: A রেফার করে B-কে, B রেফার করে A-কে) থাকায় `JSON.stringify(data)` ক্র্যাশ করছে। সমাধান কী?",
          "m": "সমাধান: (১) নেটিভ `JSON.stringify`-এর দ্বিতীয় প্যারামিটারে একটি কাস্টম 'Replacer' ফাংশন পাস করব যা একটি `WeakSet`-এ ভিজিট করা অবজেক্ট রেফারেন্সগুলো ট্র্যাক করবে; যদি কোনো অবজেক্ট আগেই সেটে থাকে তবে `undefined` রিটার্ন করবে। (২) অথবা `flatted` লাইব্রেরি ব্যবহার করব যা সার্কুলার অবজেক্টকে নিখুঁতভাবে সিরিয়ালাইজ ও ডিসিরিয়ালাইজ করতে পারে।",
          "b": "সার্কুলার রেফারেন্স সমাধানের জন্য JSON.stringify এর রিপ্লেসার ফাংশনে একটি WeakSet ব্যবহার করে ডুপ্লিকেট রেফারেন্স বাদ দিতে হবে, অথবা flatted লাইব্রেরি ব্যবহার করতে হবে।",
          "e": "Resolve circular serialization errors by passing a custom replacer to JSON.stringify utilizing a WeakSet to detect and omit previously visited references, or use the 'flatted' library.",
          "code": "function safeStringify(obj) {\n  const seen = new WeakSet();\n  return JSON.stringify(obj, (k, v) => {\n    if (typeof v === 'object' && v !== null) {\n      if (seen.has(v)) return;\n      seen.add(v);\n    }\n    return v;\n  });\n}"
        },
        {
          "lvl": "situation",
          "q": "ব্যবহারকারী অফলাইনে চলে গেলে কিছু Ajax কল ফেইল করে এরর দিচ্ছে। জাভাস্ক্রিপ্ট লেয়ারে অটোমেটিক নেটওয়ার্ক রিকানেকশন ও রিট্রাই মেকানিজম কীভাবে লিখবে?",
          "m": "আমরা একটি 'Exponential Backoff Retry' ইউটিলিটি ফাংশন লিখব। রিকোয়েস্ট ফেইল করলে এটি ১ সেকেন্ড, ২ সেকেন্ড, ৪ সেকেন্ড এভাবে ওয়েট করে সর্বোচ্চ ৩ বার রিট্রাই করবে। সাথে `window.addEventListener('online')` লিসেনার রাখব যাতে ডিভাইস নেটওয়ার্কে ফেরা মাত্রই পেন্ডিং রিকোয়েস্ট তৎক্ষণাৎ ফায়ার হয়।",
          "b": "এক্সপোনেনশিয়াল ব্যাকঅফ কৌশল ব্যবহার করে পর্যায়ক্রমিক বিরতিতে ৩ বার রিট্রাই করার লজিক লিখতে হবে এবং অনলাইন ইভেন্ট লিসেনারের মাধ্যমে সংযোগ পাওয়ার সাথে সাথে রিকোয়েস্ট এক্সিকিউট করতে হবে।",
          "e": "Implement an asynchronous wrapper featuring Exponential Backoff with jitter, retrying failed promises with increasing delays while listening to the 'online' window event to flush retries upon reconnect.",
          "code": "async function fetchWithRetry(url, retries = 3, delay = 1000) {\n  try { return await fetch(url); }\n  catch (err) {\n    if (retries === 0) throw err;\n    await new Promise(r => setTimeout(r, delay));\n    return fetchWithRetry(url, retries - 1, delay * 2);\n  }\n}"
        },
        {
          "lvl": "situation",
          "q": "স্ক্রিনে কোটি টাকার ট্রানজাকশনে `0.1 + 0.2 === 0.30000000000000004` আসায় ফিন্যান্সিয়াল ক্যালকুলেশনে ভুল ব্যালেন্স দেখাচ্ছে। জাভাস্ক্রিপ্টে এই ফ্লোটিং পয়েন্ট বাগ কীভাবে হ্যান্ডেল করবে?",
          "m": "জাভাস্ক্রিপ্ট IEEE 754 Floating Point স্ট্যান্ডার্ড ব্যবহার করে, যার কারণে বাইনারি ফ্র্যাকশনে কিছু দশমিক পুরোপুরি রিপ্রেজেন্ট হতে পারে না। সমাধান: (১) ফিন্যান্সিয়াল ক্যালকুলেশনে কখনোই সরাসরি দশমিক রাখবেন না; সব টাকাকে পয়সায় (Cents / Poisha) কনভার্ট করে পূর্ণসংখ্যায় (Integer) গুণ/ভাগ করে শেষে ১০০ দিয়ে ভাগ করে ফরম্যাট করব। (২) বড় টাকার অঙ্কের জন্য `BigInt` অথবা `decimal.js` / `currency.js` লাইব্রেরি ব্যবহার করব।",
          "b": "জাভাস্ক্রিপ্টের আইইইই ৭৫৪ ফ্লোটিং পয়েন্ট বাগকে হ্যান্ডেল করতে সব আর্থিক হিসাব পয়সায় রূপান্তর করে পূর্ণসংখ্যা হিসেবে গণনা করতে হবে অথবা decimal.js এর মতো নির্ভরযোগ্য লাইব্রেরি ব্যবহার করতে হবে।",
          "e": "JavaScript adheres to IEEE 754 floating-point standards causing precision loss. In financial apps, store and calculate amounts strictly as smallest integer units (e.g., Poisha/Cents) before formatting, or use arbitrary-precision libraries like decimal.js.",
          "code": "const addMoney = (a, b) => Math.round(a * 100 + b * 100) / 100;\nconsole.log(addMoney(0.1, 0.2)); // 0.3"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ শত শত প্রোডাক্ট দিয়ে ইনভয়েস তৈরি করার সময় মোট ভ্যাট, ডিসকাউন্ট ও কাস্টমার বাকি টাকার নিখুঁত হিসাব কীভাবে জাভাস্ক্রিপ্টে অপটিমাইজ করেছিলে?",
          "m": "ইনভয়েসে আইটেম লেভেল ডিসকাউন্ট, ক্যাটাগরি লেভেল ভ্যাট এবং স্পেশাল কুপন থাকে। আমরা একটি পিওর ফাংশনাল পাইপলাইন তৈরি করেছিলাম যা `Array.reduce` দিয়ে একটি মাত্র পাসে সাবটোটাল, মোট ডিসকাউন্ট ও ভ্যাট হিসাব করে। এছাড়া প্রতিটি মানকে ইনটিজার পয়সায় রেখে ফাইনাল রিটার্নে `Intl.NumberFormat('bn-BD', { style: 'currency', currency: 'BDT' })` দিয়ে লোকাল বাংলাদেশি মুদ্রায় নিখুঁতভাবে ফরম্যাট করেছি।",
          "b": "দোকানি পিওএসে ভ্যাট ও ডিসকাউন্ট ক্যালকুলেশনকে পিওর পাইপলাইন ফাংশন দিয়ে একটিমাত্র লুপে সম্পন্ন করা হয়েছিল। ভগ্নাংশের ঝামেলা দূর করতে পয়সায় হিসাব সম্পন্ন করে ব্রাউজারের নেটিভ Intl.NumberFormat এপিআই দিয়ে বাংলাদেশি মুদ্রায় ফরম্যাট করা হয়েছিল।",
          "e": "In Dokani POS, an invoice calculation pipeline evaluated item-level taxes and store discounts in a single functional reduce pass, storing values as integer units and outputting localized Bengali currency via Intl.NumberFormat.",
          "tip": "ইন্টারভিউতে `Intl.NumberFormat` এবং `Intl.DateTimeFormat` এর মতো নেটিভ ব্রাউজার এপিআই ব্যবহারের কথা বললে প্রমাণিত হয় তুমি কোনো থার্ড-পার্টি অতিরিক্ত বান্ডেল সাইজ না বাড়িয়ে আধুনিক জাভাস্ক্রিপ্ট ব্যবহার করতে জানো।"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে হাজার হাজার ছাত্রের পিডিএফ সার্টিফিকেট ব্রাউজার থেকেই ক্লায়েন্ট-সাইডে রেন্ডার করে ডাউনলোড করাতে গিয়ে মেমোরি ও পারফরম্যান্স কীভাবে ম্যানেজ করেছিলে?",
          "m": "সার্ভারে পিডিএফ জেনারেট করলে সিপিইউ ও মেমোরি লোড বেড়ে ক্র্যাশ হওয়ার ঝুঁকি থাকে। আমরা ক্লায়েন্ট-সাইডে `pdf-lib` এবং HTML Canvas ব্যবহার করেছি। ব্যাকগ্রাউন্ডে ক্যানভাসে ছাত্রের নাম ও কিউআর কোড বসিয়ে বাইনারি অ্যারে বাফার (Uint8Array) তৈরি করা হয় এবং `URL.createObjectURL(blob)` দিয়ে সরাসরি ব্রাউজার মেমোরি থেকে ডাউনলোড লিংক দেওয়া হয়। ডাউনলোড শেষ হওয়া মাত্র `URL.revokeObjectURL(url)` কল করে ব্রাউজার মেমোরি তৎক্ষণাৎ ফ্রি করা হয়েছিল।",
          "b": "সার্ভারের লোড বাঁচাতে আমরা ক্লায়েন্টে ক্যানভাস ও pdf-lib দিয়ে সার্টিফিকেট তৈরি করেছিলাম। ব্লব অবজেক্ট থেকে ডাউনলোড লিংক বানিয়ে কাজ শেষ হওয়ামাত্র revokeObjectURL দিয়ে মেমোরি ক্লিনআপ করে উচ্চ কর্মক্ষমতা বজায় রাখা হয়েছিল।",
          "e": "To alleviate backend load in PTTABD, student certificates were rendered client-side on canvas using binary Uint8Array buffers. Instant downloads were triggered via URL.createObjectURL(blob) followed immediately by URL.revokeObjectURL to reclaim memory.",
          "code": "const url = URL.createObjectURL(blob);\ndownloadAnchor.href = url;\ndownloadAnchor.click();\nURL.revokeObjectURL(url); // Prevent memory leak"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর লাইভ সেলস কাউন্টারে বারবার কাস্টমার এন্ট্রি ও কার্ট ক্লিয়ার করার সময় ব্রাউজার মেমোরি প্রোফাইলিং করে অবজেক্ট লিক কীভাবে ডিবাগ করেছিলে?",
          "m": "আমরা ক্রোম ডেভটুলসের 'Memory Tab' ওপেন করে ৩টি 'Heap Snapshot' ক্যাপচার করি: (১) কার্ট খালি থাকা অবস্থায়, (২) ৫০টি পণ্য কার্টে যোগ করার পর, (৩) কার্ট সম্পূর্ণ ক্লিয়ার করার পর। স্ন্যাপশটগুলোর ভেতর 'Comparison' ভিউ দিয়ে চেক করে দেখতে পাই কিছু Unbound Event Listener এবং লোকাল স্টোরেজ ওয়াচার ডিটাচড DOM নোড মেমোরিতে ধরে রেখেছিল। সেগুলো ক্লিনআপ ফাংশন দিয়ে রিমুভ করার পর হিপ সাইজ সম্পূর্ণ ফ্ল্যাট হয়ে যায়।",
          "b": "ক্রোম ডেভটুলসের হিপ স্ন্যাপশট ও কমপ্যারিসন ভিউ ব্যবহার করে আমরা ডিটাচড ডম উপাদান এবং বন্ধ না করা ইভেন্ট লিসেনার শনাক্ত করেছিলাম। সেগুলো ক্লিনআপ করে মেমোরি লিক নির্মূল করা হয়।",
          "e": "Diagnosed memory leaks in Dokani's cart session by taking Heap Snapshots in Chrome DevTools before and after cart resets. Comparison views isolated detached DOM trees retained by lingering event listeners, which we systematically sanitized via cleanup unbinds.",
          "tip": "ইন্টারভিউতে Chrome DevTools Memory Profiling এবং Heap Snapshot নেওয়ার অভিজ্ঞতা সিনিয়র রোলে বিরাট ইমপ্যাক্ট তৈরি করে।"
        },
        {
          "lvl": "realworld",
          "q": "ব্রাউজারে বড় সাইজের ফাইল (যেমন ৫০০MB ব্যাকআপ বা ভিডিও) আপলোড করার সময় মেমোরি ওভারফ্লো এড়াতে জাভাস্ক্রিপ্ট File API এবং Chunking কীভাবে ব্যবহার করেছিলে?",
          "m": "পুরো ফাইলকে একসাথে মেমোরিতে রিড করলে ব্রাউজার ট্যাব ক্র্যাশ করে। আমরা `file.slice(start, end)` মেথড ব্যবহার করে ফাইলটিকে ৫MB সাইজের ছোট ছোট ব্লব (Blob Chunks) এ ভাগ করেছি। এরপর প্রতিটি চাঙ্ক ক্রমান্বয়ে সার্ভারে পাঠাই। সার্ভার সবগুলো চাঙ্ক পেয়ে মার্চ করে মূল ফাইল তৈরি করে। এর ফলে আপলোডের মাঝে ইন্টারনেট ড্রপ হলেও ইউজার যেখান থেকে থেমেছিল সেখান থেকেই রেজুমে করতে পেরেছে।",
          "b": "বড় ফাইল আপলোডে ব্রাউজার ক্র্যাশ ঠেকাতে আমরা file.slice দিয়ে ফাইলটিকে ৫ মেগাবাইটের চাঙ্কে বিভক্ত করে ধাপে ধাপে আপলোড করেছি। এতে মেমোরি সাশ্রয় হয় এবং বিরতির পর পুনরায় আপলোড চালিয়ে যাওয়ার সুবিধা তৈরি হয়।",
          "e": "Prevented browser crashes by slicing large media files into 5MB Blob chunks via the File API. Chunks were uploaded sequentially with retry handling, allowing chunk resumption upon network interruptions.",
          "code": "const chunk = file.slice(offset, offset + CHUNK_SIZE);"
        },
        {
          "lvl": "realworld",
          "q": "JavaScript-এ আধুনিক ব্রাউজার স্টোরেজ অপশনগুলোর (Cookie, localStorage, sessionStorage, IndexedDB) বাস্তব ব্যবহারের আর্কিটেকচার কীভাবে নির্ধারণ করবে?",
          "m": "আর্কিটেকচারাল ম্যাপিং: (১) `HttpOnly Secure Cookie`: সংবেদনশীল JWT Auth টোকেন সংরক্ষণের জন্য (XSS এট্যাক থেকে ১০০% সুরক্ষিত)। (২) `localStorage`: ইউজার থিম প্রেফারেন্স (Dark/Light) বা সাইডবার স্টেট (৫MB পর্যন্ত নন-সেনসিটিভ ডাটা)। (৩) `sessionStorage`: সিঙ্গেল সেশন ফর্ম উইজার্ড বা ওটিপি ভেরিফিকেশন স্টেপ। (৪) `IndexedDB`: অফলাইন স্টোরেজ, হাজার হাজার ক্যাটালগ প্রোডাক্ট বা অফলাইন বিলিং রেকর্ড (৫০MB+ স্ট্রাকচার্ড NoSQL ডাটা ও ইন্ডেক্সিং সাপোর্ট)।",
          "b": "সুরক্ষিত অথেনটিকেশনে HttpOnly কুকি, ইউজার সেটিংসের জন্য লোকালস্টোরেজ, ক্ষণস্থায়ী সেশনে সেশনস্টোরেজ এবং অফলাইন বিশাল ডাটাবেজ সংরক্ষণের জন্য ইনডেক্সড-ডিবি ব্যবহার করাই স্ট্যান্ডার্ড আর্কিটেকচার।",
          "e": "Architectural storage tiering: HttpOnly cookies for secure JWT session tokens (immune to client XSS), localStorage for UI themes/prefs, sessionStorage for ephemeral single-tab form wizards, and IndexedDB for offline product catalogs and heavy offline transaction stores.",
          "tip": "কখনোই JWT টোকেন localStorage-এ রাখবে না—এই পয়েন্টটি ইন্টারভিউতে জোর দিয়ে বলবে।"
        }
      ]
    },
    {
      "id": "typescript-core",
      "name": "TypeScript & Type Safety",
      "desc": "Static Typing, Interface vs Type, Generics, Utility Types, Discriminated Unions, Type Narrowing, Strict Mode",
      "items": [
        {
          "lvl": "lvl1",
          "q": "TypeScript-এ `type` এবং `interface`-এর মধ্যে মৌলিক পার্থক্য কী এবং কখন কোনটি ব্যবহার করবে?",
          "m": "দুটিই অবজেক্টের শেপ ডিফাইন করতে পারে। কিন্তু `interface` কে 'Declaration Merging' করা যায় (একই নামের দুটি ইন্টারফেস নিজে থেকেই এক হয়ে যায়) এবং এটি `extends` দিয়ে অবজেক্ট ওরিয়েন্টেড স্টাইলে এক্সটেন্ড করা সহজ—তাই পাবলিক লাইব্রেরি বা অবজেক্টের জন্য ইন্টারফেস বেস্ট। আর `type` দিয়ে Union (`type A = 'active' | 'inactive'`), Intersection, Tuples এবং প্রিমিটিভ এলিয়াস ডিফাইন করা যায় যা ইন্টারফেসে সরাসরি সম্ভব নয়।",
          "b": "ইন্টারফেস ডিক্লারেশন মার্জিং সমর্থন করে এবং অবজেক্টের কাঠামো তৈরিতে বেশি উপযোগী। অন্যদিকে টাইপ অ্যালিয়াস দিয়ে ইউনিয়ন, টাপল এবং জটিল কম্বাইন্ড টাইপ তৈরি করা যায়। রিঅ্যাক্ট কম্পোনেন্টের প্রপস ও অবজেক্টে ইন্টারফেস এবং ইউনিয়ন ও স্টেট টাইপে type ব্যবহার করা ভালো প্র্যাকটিস।",
          "e": "Interfaces support declaration merging and extend cleanly for OOP object models, making them ideal for public APIs and object contracts. Type aliases can express unions, primitives, tuples, and mapped types which interfaces cannot natively do.",
          "code": "type Status = 'PENDING' | 'PAID'; // Union with type\ninterface User { id: string; name: string; } // Interface"
        },
        {
          "lvl": "lvl1",
          "q": "TypeScript-এ `any`, `unknown`, এবং `never`-এর মধ্যে পার্থক্য কী?",
          "m": "`any` টাইপস্ক্রিপ্টের পুরো টাইপ-চেকিং সিস্টেম বন্ধ করে দেয়, যা রানটাইম বাগের ঝুঁকি বাড়ায়। `unknown` হলো টাইপ-সেফ অল্টারনেটিভ; এতে যেকোনো ভ্যালু রাখা যায়, কিন্তু টাইপ ন্যারোয়িং (যেমন `typeof` বা `instanceof`) না করা পর্যন্ত এর ওপর কোনো মেথড কল বা অপারেশন চালানো যায় না। আর `never` নির্দেশ করে এমন মান যা কখনোই ঘটতে পারে না (যেমন এমন ফাংশন যা সবসময় এরর থ্রো করে বা ইনফাইনাইট লুপে চলে)।",
          "b": "any টাইপ সেফটি পুরোপুরি নিষ্ক্রিয় করে দেয়। unknown নিরাপদ বিকল্প যা ন্যারো বা যাচাই ছাড়া অপারেশন চালাতে দেয় না। never এমন অবস্থাকে বোঝায় যা কখনই তৈরি হওয়া সম্ভব নয় বা কোনো মান রিটার্ন করে না।",
          "e": "any turns off all type checking. unknown is a type-safe counterpart requiring type narrowing before property access or invocation. never represents values that never occur, such as functions that always throw or infinite loops.",
          "code": "function throwErr(msg: string): never { throw new Error(msg); }"
        },
        {
          "lvl": "lvl1",
          "q": "TypeScript-এ `strict: true` ফ্ল্যাগ অন করার সুবিধা কী এবং এর মধ্যে কোন কোন রুল সক্রিয় হয়?",
          "m": "`tsconfig.json`-এ `strict: true` দিলে টাইপস্ক্রিপ্টের সর্বোচ্চ টাইপ সেফটি সক্রিয় হয়। এর প্রধান রুলগুলো হলো: (১) `noImplicitAny`: টাইপ না দিলে যেন ভুলেও `any` ইনফার না করে, (২) `strictNullChecks`: ভ্যারিয়েবলে `null` বা `undefined` থাকলে সরাসরি মেথড কল ব্লক করে, (৩) `strictFunctionTypes`: ফাংশন প্যারামিটারের টাইপ কঠোরভাবে চেক করে, (৪) `alwaysStrict`: কোড সবসময় ES5 'use strict' মোডে আউটপুট দেয়।",
          "b": "strict মোড অন করলে প্রজেক্টে কঠোর টাইপ ভ্যালিডেশন চালু হয়। এটি কোনো ভ্যারিয়েবলকে স্বয়ংক্রিয়ভাবে any হতে দেয় না এবং নাল বা আনডিফাইন্ড ভ্যালুর কারণে ব্রাউজারে ক্র্যাশ হওয়া পুরোপুরি রোধ করে।",
          "e": "Enabling strict: true activates the strictest compiler family of checks, including noImplicitAny, strictNullChecks, strictFunctionTypes, and strictBindCallApply, preventing null dereferencing and untyped variables at compile-time.",
          "tip": "ইন্টারভিউতে বলবে: 'প্রোডাকশন-গ্রেড এন্টারপ্রাইজ প্রজেক্টে strict: true রাখা বাধ্যতামূলক স্ট্যান্ডার্ড'।"
        },
        {
          "lvl": "lvl1",
          "q": "TypeScript Generics কী এবং এটি কোড রি-ইউজেবিলিটিতে কীভাবে সাহায্য করে?",
          "m": "Generics হলো এমন একটি ফিচার যার মাধ্যমে ফাংশন, ইন্টারফেস বা ক্লাসে টাইপকে একটি ভ্যারিয়েবল বা প্যারামিটারের মতো পাস করা যায় (`<T>`)। অর্থাৎ কোনো নির্দিষ্ট হার্ডকোডেড টাইপ না দিয়ে টাইপ সেফটি বজায় রেখে বিভিন্ন ডেটা টাইপের সাথে একই কোড পুনর্ব্যবহার করা যায়। যেমন: এপিআই রেসপন্স র‍্যাপার বা অ্যারে ফিল্টার ইউটিলিটি।",
          "b": "জেনেরিক্স টাইপস্ক্রিপ্টে টাইপকে প্যারামিটার হিসেবে ব্যবহারের সুযোগ দেয়। ফলে একটিমাত্র ফাংশন বা কম্পোনেন্ট দিয়ে টাইপ সেফটি অক্ষুণ্ণ রেখে বিভিন্ন ধরনের ডাটা টাইপের সাথে নিরাপদ কাজ করা যায়।",
          "e": "Generics enable creating reusable components, functions, or interfaces that work over a variety of types while maintaining compile-time type safety. Type parameters (e.g. <T>) are supplied at invocation time.",
          "code": "function wrapInArray<T>(item: T): T[] {\n  return [item];\n}\nconst nums = wrapInArray(10); // number[]\nconst strs = wrapInArray('NT'); // string[]"
        },
        {
          "lvl": "lvl1",
          "q": "TypeScript-এ `Optional Chaining (?.)` এবং `Nullish Coalescing (??)` অপারেটর কীভাবে কাজ করে?",
          "m": "Optional Chaining (`obj?.user?.name`) চেক করে কোনো প্রপার্টি `null` বা `undefined` কিনা; যদি হয় তবে এরর না ছুড়ে শান্তভাবে `undefined` রিটার্ন করে। আর Nullish Coalescing (`a ?? b`) শুধুমাত্র তখনই ডানপাশের ফলব্যাক ভ্যালু `b` নেয় যদি বাঁপাশের মান `null` অথবা `undefined` হয়। সাধারণ লজিক্যাল অর (`a || b`) কিন্তু `0`, `\"\"`, বা `false` কেউ ফলসি ধরে ফলব্যাক নিয়ে নেয়, যা নিউমেরিক ডাটায় বাগ তৈরি করে।",
          "b": "অপশনাল চেইনিং নাল পয়েন্টার এরর প্রতিরোধ করে নিরাপদভাবে নেস্টেড অবজেক্ট রিড করে। নালিশ কোলেসিং শুধুমাত্র নাল অথবা আনডিফাইন্ড হলেই ফলব্যাক মান দেয়, ফলে শূন্য (0) বা ফাঁকা স্ট্রিং নিরাপদে বজায় থাকে।",
          "e": "Optional chaining (?.) safely short-circuits property lookups if an intermediate reference is nullish. Nullish coalescing (??) provides a fallback value strictly when the left-hand operand is null or undefined, preserving 0, false, and empty strings.",
          "code": "const count = 0;\nconsole.log(count || 10); // 10 (Oops! 0 considered falsy)\nconsole.log(count ?? 10); // 0 (Correct!)"
        },
        {
          "lvl": "lvl2",
          "q": "TypeScript-এর সবচেয়ে বহুল ব্যবহৃত Utility Types: `Partial`, `Pick`, `Omit`, `Record`, এবং `Readonly`-এর কাজ কী?",
          "m": "(১) `Partial<T>`: সব প্রপার্টিকে অপশনাল (`?`) করে (যেমন প্যাচ বা আপডেট ফর্মে)। (২) `Pick<T, 'id' | 'name'>`: শুধুমাত্র নির্দিষ্ট প্রপার্টিগুলো বেছে নিয়ে নতুন টাইপ বানায়। (৩) `Omit<T, 'password'>`: নির্দিষ্ট প্রপার্টি বাদ দিয়ে বাকিগুলো রাখে। (৪) `Record<K, T>`: অবজেক্টের কী এবং ভ্যালুর নির্দিষ্ট টাইপ ডিফাইন করে (যেমন ডিকশনারি)। (৫) `Readonly<T>`: প্রপার্টিগুলোকে শুধু রিড-অনলি করে যাতে মিউটেট না করা যায়।",
          "b": "ইউটিলিটি টাইপগুলো বিদ্যমান টাইপকে দ্রুত রূপান্তর করে: Partial সব প্রপার্টি অপশনাল করে, Pick নির্দিষ্ট প্রপার্টিগুলো গ্রহণ করে, Omit নির্দিষ্ট প্রপার্টিগুলো বাদ দেয়, Record কি ও ভ্যালু জোড়ার টাইপ নির্ধারণ করে এবং Readonly মান পরিবর্তন বন্ধ করে দেয়।",
          "e": "TypeScript utility types transform existing types: Partial<T> marks all properties optional, Pick<T, K> extracts a subset of properties, Omit<T, K> drops specified properties, Record<K, T> types key-value maps, and Readonly<T> freezes properties.",
          "code": "type UpdateUserDto = Partial<Omit<User, 'id' | 'createdAt'>>;\ntype CacheStore = Record<string, Product>;"
        },
        {
          "lvl": "lvl2",
          "q": "TypeScript-এ Discriminated Unions (Tagged Unions) কী এবং এটি জটিল স্টেট হ্যান্ডলিংয়ে কীভাবে সাহায্য করে?",
          "m": "Discriminated Union হলো এমন একাধিক অবজেক্ট টাইপের ইউনিয়ন যাতে একটি কমন লিটারাল প্রপার্টি থাকে (যেমন `status` বা `type` ট্যাগ)। এর বড় সুবিধা হলো: যখন আমরা `switch(state.status)` বা `if` চেক করি, টাইপস্ক্রিপ্ট স্বয়ংক্রিয়ভাবে নিশ্চিত করে ওই ব্লকের ভেতরে কোন কোন প্রপার্টি এক্সিস্ট করে। ফলে ভুল স্টেট প্রপার্টি এক্সেস করার কোনো সুযোগ থাকে না।",
          "b": "ডিসক্রিমিনেটেড ইউনিয়ন হলো একটি সাধারণ ট্যাগযুক্ত প্রপার্টি বিশিষ্ট অবজেক্টের সমন্বয়। এর মাধ্যমে সুইচ কেস বা কন্ডিশনাল চেকের সময় টাইপস্ক্রিপ্ট স্বয়ংক্রিয়ভাবে অবজেক্টের সঠিক গঠন যাচাই করে টাইপ সেফটি দেয়।",
          "e": "A Discriminated Union combines types that share a common single-literal discriminant property (e.g. status: 'loading' | 'success' | 'error'). TypeScript uses this tag to exhaustively narrow down the exact shape of an object within conditionals.",
          "code": "type AsyncState =\n  | { status: 'loading' }\n  | { status: 'success'; data: User[] }\n  | { status: 'error'; error: string };"
        },
        {
          "lvl": "lvl2",
          "q": "Type Narrowing কী এবং `typeof`, `instanceof`, এবং Custom Type Guard (`is`) কীভাবে কাজ করে?",
          "m": "Type Narrowing হলো টাইপস্ক্রিপ্টের কম্পাইলারকে একটি ব্রড বা ওয়াইড টাইপ থেকে আরও স্পেসিফিক টাইপে নিশ্চয়তা দেওয়া। প্রিমটিভ ডেটার জন্য `typeof x === 'string'`, ক্লাসের জন্য `x instanceof Date` এবং জটিল অবজেক্ট বা ইন্টারফেসের জন্য কাস্টম টাইপ গার্ড ফাংশন যাতে রিটার্ন টাইপ হয় `item is Admin` ব্যবহার করা হয়।",
          "b": "টাইপ ন্যারোয়িং কোনো সাধারণ টাইপকে যাচাই করে সুনির্দিষ্ট টাইপে সংকুচিত করে। কাস্টম টাইপ গার্ড ফাংশনে 'param is Type' রিটার্ন লিখে টাইপস্ক্রিপ্ট কম্পাইলারকে শতভাগ নিশ্চিত করা যায় যে ভ্যারিয়েবলটি কাঙ্ক্ষিত কাঠামোর।",
          "e": "Type Narrowing refines a variable from a broader type to a specific type using conditional guards. Aside from typeof and instanceof, custom type guards use type predicates (e.g. `val is Order`) to inform the compiler after runtime checks.",
          "code": "function isAxiosError(err: unknown): err is AxiosError {\n  return !!err && typeof err === 'object' && 'isAxiosError' in err;\n}"
        },
        {
          "lvl": "lvl2",
          "q": "TypeScript-এ `as const` (Const Assertions) কী এবং এটি অবজেক্ট বা অ্যারেতে কী পরিবর্তন আনে?",
          "m": "`as const` যোগ করলে টাইপস্ক্রিপ্ট ওই অবজেক্ট বা অ্যারেকে জেনেরিক টাইপ (যেমন string বা number) না ভেবে হুবহু লিটারাল টাইপ (Literal Type) হিসেবে লক করে এবং প্রতিটি প্রপার্টিকে ডিপ `readonly` করে দেয়। যেমন `const roles = ['admin', 'manager'] as const;` করলে টাইপ হবে `readonly ['admin', 'manager']`, যার ফলে আমরা সহজেই `type Role = typeof roles[number]` দিয়ে ইউনিয়ন টাইপ বের করে নিতে পারি।",
          "b": "as const কোনো ভ্যারিয়েবলের মানকে পরিবর্তনাতীত লিটারাল টাইপে রূপান্তর করে এবং এর অভ্যন্তরীণ মানগুলোকে রিড-অনলি হিসেবে ফ্রিজ করে। এটি এনামের চমৎকার বিকল্প হিসেবে ইউনিয়ন টাইপ তৈরি করতে ব্যবহৃত হয়।",
          "e": "Const assertion (`as const`) tells the compiler to infer the narrowest literal type for expressions, rendering object properties deeply readonly and turning arrays into readonly tuples rather than mutable general types.",
          "code": "const ROLES = ['SUPER_ADMIN', 'CASHIER', 'MANAGER'] as const;\ntype Role = typeof ROLES[number]; // 'SUPER_ADMIN' | 'CASHIER' | 'MANAGER'"
        },
        {
          "lvl": "lvl2",
          "q": "TypeScript-এ Type Assertion (`as Type`) এবং Type Casting-এর মধ্যে পার্থক্য কী এবং কখন এটি বিপদজনক?",
          "m": "টাইপস্ক্রিপ্ট রানটাইমে কোনো কোড এক্সিকিউট করে না; তাই `as Type` কোনো আসল ডেটা কাস্টিং নয়, এটি কেবল কম্পাইলারকে জোর করে বলা যে 'আমি জানি এটার টাইপ কী, তুমি এরর দেওয়া বন্ধ করো'। এটি বিপদজনক কারণ যদি রানটাইমে অবজেক্টের স্ট্রাকচার ভিন্ন হয়, তাহলে কোড ব্রাউজারে ক্র্যাশ করবে অথচ বিল্ড টাইমে টাইপস্ক্রিপ্ট কোনো এরর ধরবে না। তাই `as` ব্যবহারের চেয়ে Zod দিয়ে রানটাইম ভ্যালিডেশন করা শতভাগ নিরাপদ।",
          "b": "টাইপ অ্যাসার্শন (as) শুধুমাত্র কম্পাইলারকে নীরব করার একটি উপায়, এটি রানটাইমে আসল ডেটা পরিবর্তন বা যাচাই করে না। ভুল অ্যাসার্শনের কারণে রানটাইমে অপ্রত্যাশিত ক্র্যাশ হতে পারে, তাই Zod এর মতো স্কিমা ভ্যালিডেটর ব্যবহার করা শ্রেয়।",
          "e": "Type assertion (`as Type`) is a compile-time override that forces the compiler to treat a value as a specified type without performing runtime conversion. It is dangerous if overused because runtime shape mismatches bypass compiler errors silently.",
          "tip": "কখনোই অন্ধভাবে `as any` বা আন-ভ্যালিডেটেড `as Type` লিখবে না; ইন্টারভিউতে Zod ভ্যালিডেশনকে অগ্রাধিকার দেবে।"
        },
        {
          "lvl": "lvl3",
          "q": "TypeScript Conditional Types এবং `infer` কিওয়ার্ড কীভাবে অ্যাডভান্সড মেটাপ্রোগ্রামিংয়ে কাজ করে?",
          "m": "Conditional Types ত্রিমাত্রিক টার্নারি অপারেটরের মতো কাজ করে: `T extends U ? X : Y`। আর `infer` কিওয়ার্ডটি কন্ডিশনাল টাইপের ভেতর থেকে কোনো অভ্যন্তরীণ টাইপ ভ্যারিয়েবলকে নিজে থেকেই এক্সট্র্যাক্ট বা ডিডিউস করার সুযোগ দেয়। যেমন: কোনো ফাংশনের রিটার্ন টাইপ (`ReturnType<T>`) বা প্রমিজের ভেতরের রেজলভড টাইপ (`Awaited<T>`) বের করতে `infer` ব্যবহার করা হয়।",
          "b": "কন্ডিশনাল টাইপ শর্ত অনুযায়ী ভিন্ন ভিন্ন টাইপ প্রদান করে। infer কিওয়ার্ড ব্যবহার করে আমরা কোনো বিদ্যমান ফাংশন বা প্রমিজের ভেতরের গভীর টাইপ এক্সট্র্যাক্ট করে নিয়ে আসতে পারি।",
          "e": "Conditional Types choose between two types based on a relationship test (`T extends U ? X : Y`). The infer keyword introduces a type variable within the conditional clause to extract internal types dynamically, as seen in standard ReturnType<T> and Parameters<T> implementations.",
          "code": "type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\ntype Fn = () => { id: number };\ntype Result = MyReturnType<Fn>; // { id: number }"
        },
        {
          "lvl": "lvl3",
          "q": "TypeScript Mapped Types এবং Template Literal Types কীভাবে ডায়নামিক এপিআই ও ইভেন্ট হ্যান্ডলার টাইপ করতে ব্যবহৃত হয়?",
          "m": "Mapped Types বিদ্যমান টাইপের প্রতিটা কি-র ওপর লুপ চালিয়ে নতুন টাইপ তৈরি করে (`[K in keyof T]`)। আর Template Literal Types স্ট্রিং কম্বিনেশন দিয়ে নতুন লিটারাল ইউনিয়ন তৈরি করে। যেমন: আমাদের যদি ইভেন্ট থাকে `'click' | 'hover'`, আমরা ব্যাকটিক দিয়ে নিমেষেই তৈরি করতে পারি `on${Capitalize<Event>}` যা `'onClick' | 'onHover'` টাইপ তৈরি করবে।",
          "b": "ম্যাপড টাইপ অবজেক্টের প্রতিটি কি-র ওপর লুপ চালিয়ে রূপান্তর ঘটায়। টেমপ্লেট লিটারাল টাইপ স্ট্রিং ফরম্যাটিংয়ের সাহায্যে ডায়নামিক ইভেন্ট লিসেনার বা ইউআরএল পাথের জন্য স্বয়ংক্রিয় টাইপ তৈরি করতে পারে।",
          "e": "Mapped Types iterate over keys using the index signature `[K in keyof T]`. Template Literal Types combine string literals with type unions to construct typed event handlers (e.g., `on${Capitalize<Event>}`) or typed route parameters dynamically.",
          "code": "type Event = 'change' | 'submit';\ntype Handlers = { [K in Event as `on${Capitalize<K>}`]: () => void };\n// Result: { onChange: () => void; onSubmit: () => void }"
        },
        {
          "lvl": "lvl3",
          "q": "TypeScript-এ Covariance এবং Contravariance কী এবং ফাংশন প্যারামিটারে `strictFunctionTypes` কীভাবে কাজ করে?",
          "m": "Covariance মানে হলো যদি টাইপ A সাবটাইপ B হয়, তবে তাদের কম্পোজিট টাইপও একই ডিরেকশনে আচরণ করে (যেমন রিটার্ন টাইপ)। Contravariance মানে এর উল্টো ডিরেকশনে আচরণ করা (ফাংশন প্যারামিটার)। `strictFunctionTypes: true` অন থাকলে টাইপস্ক্রিপ্ট ফাংশন আর্গুমেন্টে কনট্রাভ্যারিয়েন্ট চেকিং নিশ্চিত করে, ফলে সাব-ক্লাসের ফাংশনকে এমন কোনো প্যারামিটার পাস করতে দেয় না যা সুপার-ক্লাস হ্যান্ডেল করতে পারবে না।",
          "b": "ফাংশনের রিটার্ন টাইপ কোভ্যারিয়েন্ট এবং প্যারামিটার টাইপ কনট্রাভ্যারিয়েন্ট আচরণ করে। strictFunctionTypes ফ্ল্যাগ চালু থাকলে ফাংশন প্যারামিটারে ভুল সাবটাইপ বা ইনভ্যালিড ডাটা পাস হওয়া বন্ধ করে নির্ভুল টাইপ সেফটি বজায় থাকে।",
          "e": "Covariance preserves subtyping direction (e.g. return types), whereas contravariance reverses it (e.g. function arguments). Under strictFunctionTypes, method parameter types are checked contravariantly rather than bivariantly to prevent runtime parameter passing failures.",
          "tip": "এটি একটি প্রিমিয়াম লেভেলের থিওরিটিকাল টাইপ-সিস্টেম প্রশ্ন যা আর্কিটেক্ট বা স্টাফ ইঞ্জিনিয়ার ইন্টারভিউতে জিজ্ঞাসা করা হয়।"
        },
        {
          "lvl": "lvl3",
          "q": "Exhaustiveness Checking কী এবং `never` টাইপ ব্যবহার করে সুইচ কেসে মিসিং স্টেট কীভাবে কম্পাইল টাইমে ধরা যায়?",
          "m": "যখন আমরা কোনো Union State (যেমন অর্ডার স্ট্যাটাস) সুইচ কেসে হ্যান্ডেল করি, ভবিষ্যতে যদি নতুন কোনো স্ট্যাটাস যোগ করা হয়, তা হয়তো ডেভেলপার কোনো পেজে হ্যান্ডেল করতে ভুলে যেতে পারে। Exhaustiveness Checking-এ সুইচের `default` ব্লকে একটি ফাংশন রাখা হয় যা প্যারামিটার হিসেবে `never` নেয় (`assertNever(val)`। যদি কোনো কেস মিস হয়, টাইপস্ক্রিপ্ট কম্পাইল টাইমে এরর ছুড়ে বলবে যে এই মিসিং স্টেটটি never-এ অ্যাসাইন করা সম্ভব নয়।",
          "b": "এক্সহস্টিভনেস চেকিং সুইচ কেসে সব সম্ভাব্য স্টেট কভার করা হয়েছে কিনা তা নিশ্চিত করে। ডিফল্ট কেসে never টাইপের একটি ফাংশন কল দিয়ে রাখলে কোনো নতুন স্টেট হ্যান্ডেল করতে ভুলে গেলে সাথে সাথে বিল্ড এরর দেখা যায়।",
          "e": "Exhaustive checking ensures all variants of a union are handled. Assigning the unhandled value to a helper function accepting `never` in the default case forces a compiler error if a new union variant is added without being handled in the switch.",
          "code": "function assertNever(x: never): never {\n  throw new Error(`Unhandled union case: ${x}`);\n}\nswitch (action.type) {\n  case 'A': break;\n  case 'B': break;\n  default: assertNever(action); // Compile error if new action added!\n}"
        },
        {
          "lvl": "lvl3",
          "q": "Branded Types (Nominal Typing) কী এবং সাধারণ Primitive ভ্যারিয়েবল যেমন `UserId` বনাম `OrderId` মিক্সড আপ হওয়া রোধে এটি কীভাবে সাহায্য করে?",
          "m": "টাইপস্ক্রিপ্ট মূলত Structural Typing (Duck Typing) ব্যবহার করে; তাই দুটি `string` টাইপ থাকলে ভুল করে ইউজারের আইডি অর্ডারের আইডিতে পাস করলেও টাইপস্ক্রিপ্ট এরর ধরে না। Branded Types একটি ইউনিক ফিল্ড বা সিম্বল ট্যাগ যোগ করে (`__brand: 'UserId'`) একটি প্রিমিটিভ টাইপকে নামবাচক বা নমিনাল টাইপে রূপান্তর করে। এর ফলে দুটোই স্ট্রিং হওয়া সত্ত্বেও টাইপস্ক্রিপ্ট ভুল আইডি অ্যাসাইনমেন্ট ব্লক করে দেয়।",
          "b": "ব্র্যান্ডেড টাইপ স্ট্রাকচারাল টাইপিংকে নমিনাল বা নামবাচক টাইপিংয়ে রূপান্তর করে। এর মাধ্যমে একাধিক স্ট্রিং আইডির মধ্যে অমিল তৈরি করে এক ধরনের আইডির জায়গায় অন্য আইডি ভুলে পাস হওয়া শতভাগ প্রতিরোধ করা যায়।",
          "e": "TypeScript uses structural typing where identical shapes are interchangeable. Branded Types intersect primitives with a unique compile-time tag (e.g. string & { readonly __brand: unique symbol }) to simulate nominal typing and prevent accidentally passing an OrderId where a UserId is expected.",
          "code": "type UserId = string & { readonly __brand: 'UserId' };\ntype OrderId = string & { readonly __brand: 'OrderId' };\nlet u: UserId = 'u123' as UserId;\nlet o: OrderId = u; // Error: Type UserId is not assignable to OrderId!"
        },
        {
          "lvl": "situation",
          "q": "প্রজেক্টে একটি থার্ড-পার্টি লাইব্রেরি ইন্সটল করেছ যার কোনো `@types` ডিক্লারেশন ফাইল নেই এবং টাইপস্ক্রিপ্ট `Could not find a declaration file` এরর দিচ্ছে। কীভাবে সমাধান করবে?",
          "m": "সমাধান: (১) প্রজেক্টের রুট বা `src/types/` ডিরেক্টরিতে একটি `global.d.ts` ফাইল তৈরি করব। (২) সেখানে `declare module 'library-name';` লিখে মডিউলটিকে অ্যাম্বিয়েন্ট টাইপ ডিক্লেয়ার করব। (৩) যদি লাইব্রেরির মেথডগুলোর স্ট্রাকচার আমাদের জানা থাকে, তবে তার ভেতরের এক্সপোর্ট করা ফাংশন ও অবজেক্টগুলোর নির্দিষ্ট ইন্টারফেস ডিক্লেয়ার করব। (৪) `tsconfig.json`-এর `include` বা `typeRoots`-এ সেই পাথ অ্যাড করব।",
          "b": "লাইব্রেরির টাইপ ফাইল না থাকলে src/types ফোল্ডারে global.d.ts তৈরি করে declare module 'লাইব্রেরি-নাম' লিখে টাইপস্ক্রিপ্টকে জানাতে হবে। প্রয়োজনে ভেতরের ফাংশনগুলোর কাস্টম ইন্টারফেস লিখে টাইপ সেফটি দেওয়া যায়।",
          "e": "Resolve missing type declarations by authoring an ambient declaration file (`types/global.d.ts`) containing `declare module 'untyped-pkg';` with typed interface stubs, and ensuring the directory is listed under include or typeRoots in tsconfig.json.",
          "code": "// src/types/declarations.d.ts:\ndeclare module 'legacy-barcode-scanner' {\n  export function scan(): Promise<string>;\n}"
        },
        {
          "lvl": "situation",
          "q": "একটি জেনেরিক API ক্লায়েন্ট ফাংশন লিখছ যা যে কোনো এন্ডপয়েন্ট থেকে ডাটা আনে, কিন্তু রিটার্ন টাইপ ঠিকমতো ইনফারিং হচ্ছে না এবং সবসময় `unknown` আসছে। কীভাবে জেনেরিক টাইপ এনফোর্স করবে?",
          "m": "ফাংশনে জেনেরিক টাইপ প্যারামিটার `<T>` ডিক্লেয়ার করতে হবে এবং প্রমিজের রিটার্ন টাইপ হিসেবে `Promise<T>` এনফোর্স করতে হবে। কল করার সময় ডেভেলপার ডেটার টাইপ পাস করতে পারবে (`apiClient<User[]>('/users')`), আর যদি Zod স্কিমা পাস করা যায়, তবে Zod এর `z.infer<typeof schema>` দিয়ে স্বয়ংক্রিয়ভাবে রিটার্ন টাইপ ইনফার করা সম্ভব।",
          "b": "এপিআই ফাংশনে জেনেরিক <T> যুক্ত করে Promise<T> রিটার্ন টাইপ দিতে হবে। আরও আধুনিক সমাধানে Zod স্কিমা গ্রহণ করে স্কিমার ইনফার করা টাইপ স্বয়ংক্রিয়ভাবে রিটার্ন টাইপ হিসেবে প্রদান করা যায়।",
          "e": "Expose a generic type parameter `<T>` returning `Promise<T>`. For ultimate resilience, accept a Zod schema parameter and infer the return type dynamically via `z.infer<TSchema>` ensuring verified runtime data matches compile-time typing.",
          "code": "async function apiFetch<T>(url: string): Promise<T> {\n  const res = await fetch(url);\n  return res.json() as Promise<T>;\n}"
        },
        {
          "lvl": "situation",
          "q": "একটি বড় লিগ্যাসি জাভাস্ক্রিপ্ট প্রজেক্টকে টাইপস্ক্রিপ্টে মাইগ্রেট করতে হবে, কিন্তু এক রাতে সব ফাইলে টাইপ দেওয়া অসম্ভব। ধাপে ধাপে মাইগ্রেশন স্ট্র্যাটেজি কী হবে?",
          "m": "মাইগ্রেশন স্টেপস: (১) `tsconfig.json`-এ `\"allowJs\": true`, `\"checkJs\": false`, এবং প্রাথমিক পর্যায়ে `\"noImplicitAny\": false` রাখব যাতে既存 `.js` ফাইলগুলো পাশাপাশি রান হতে পারে। (২) কোর ইউটিলিটি, শেয়ার্ড ডাটাবেজ মডেল এবং ইন্টারফেস ফাইলগুলো দিয়ে মাইগ্রেশন শুরু করব (`.ts` এ কনভার্ট)। (৩) নতুন যে কোডই লেখা হবে তা অবশ্যই স্ট্রিক্ট টাইপস্ক্রিপ্টে লিখতে হবে। (৪) পর্যায়ক্রমে প্রতি স্প্রিন্টে ফাইলগুলো রিফ্যাক্টর করে শেষে `checkJs: true` এবং `strict: true` অন করব।",
          "b": "ধাপে ধাপে মাইগ্রেশনের জন্য tsconfig ফাইলে allowJs চালু রাখতে হবে। প্রথমে কমন টাইপস এবং ইউটিলিটি ফাইলগুলো টাইপস্ক্রিপ্টে কনভার্ট করতে হবে। নতুন সব ফিচার শুধুমাত্র .ts বা .tsx ফাইলে লিখতে হবে এবং ধীরে ধীরে লিগ্যাসি কোড রিফ্যাক্টর করতে হবে।",
          "e": "Gradual migration strategy: enable allowJs: true in tsconfig.json while temporarily disabling noImplicitAny. Convert shared models, schemas, and utility functions first. Enforce pure TypeScript on all newly written code, incrementally transitioning legacy files over sprints until strict: true is achieved.",
          "tip": "কখনোই 'বিগ ব্যাং' একবারে সব ফাইল কনভার্ট করতে যাবে না; স্টেপ বাই স্টেপ allowJs দিয়ে মাইগ্রেশন প্র্যাকটিকাল ইঞ্জিনিয়ারিং প্রদর্শন করে।"
        },
        {
          "lvl": "situation",
          "q": "একটি অবজেক্টের কী (Key) ডায়নামিকালি অ্যাক্সেস করতে গিয়ে টাইপস্ক্রিপ্ট এরর দিচ্ছে: `Element implicitly has an 'any' type because expression of type 'string' can't be used to index type`। কীভাবে সমাধান করবে?",
          "m": "কারণ জাভাস্ক্রিপ্টে যে কোনো সাধারণ `string` টাইপ ওই অবজেক্টের নির্দিষ্ট কি-র বাইরেও হতে পারে। সমাধান: (১) কি-র টাইপকে ন্যারো করে `keyof typeof obj` কাস্ট করতে হবে (`const key = 'name' as keyof typeof obj`)। (২) অবজেক্ট ডিক্লারেশনের সময় `Record<string, unknown>` বা ইনডেক্স সিগনেচার `[key: string]: any` ব্যবহার করা যায়।",
          "b": "সাধারণ স্ট্রিং টাইপ অবজেক্টের নির্দিষ্ট কি নাও হতে পারে। সমাধান হলো keyof typeof দিয়ে কি-র টাইপ কঠোরভাবে নির্দিষ্ট করা অথবা অবজেক্টে ইনডেক্স সিগনেচার ব্যবহার করা।",
          "e": "Index access requires keys to be members of `keyof typeof obj`. Type the lookup string as `keyof typeof obj`, or add an index signature `[key: string]: ValueType` to the target object interface.",
          "code": "const colors = { red: '#f00', blue: '#00f' };\nfunction getColor(key: string) {\n  return colors[key as keyof typeof colors];\n}"
        },
        {
          "lvl": "situation",
          "q": "একটি কম্পোনেন্ট প্রপসে এমন একটি টাইপ পাঠাতে চাও যা হয় `{ type: 'CREDIT'; cardNo: string }` হবে অথবা `{ type: 'CASH'; tenderAmount: number }` হবে, কিন্তু দুটো একসাথে থাকা চলবে না। কীভাবে টাইপ ডিফাইন করবে?",
          "m": "আমরা একটি 'Discriminated Union' টাইপ ব্যবহার করব। কখনোই সবগুলো ফিল্ডকে একটি মাত্র অবজেক্টে অপশনাল (`?`) করে রাখা যাবে না, কারণ তাহলে ইউজার ক্রেডিট কার্ড ছাড়া কার্ড নম্বর বা ক্যাশ ছাড়া কার্ড নাম্বার মিক্স করে দিতে পারে। ডিসক্রিমিনেটেড ইউনিয়ন করলে টাইপস্ক্রিপ্ট শতভাগ নিশ্চিত করবে যে `type === 'CREDIT'` হলে শুধু কার্ড নম্বরই প্রযোজ্য এবং ক্যাশ হলে টেন্ডার অ্যামাউন্ট প্রযোজ্য।",
          "b": "সব প্রপার্টি অপশনাল না রেখে একটি ডিসক্রিমিনেটেড ইউনিয়ন তৈরি করতে হবে। এতে ক্রেডিট সিলেক্ট করলে কার্ড নম্বর ফিল্ড বাধ্যতামূলক হবে এবং ক্যাশ সিলেক্ট করলে টেন্ডার অ্যামাউন্ট বাধ্যতামূলক হবে, যা ভুল কম্বিনেশন প্রতিরোধ করে।",
          "e": "Define a Discriminated Union type rather than an omnibus interface with optional properties. This strictly forbids invalid cross-variant state configurations.",
          "code": "type PaymentMethod =\n  | { type: 'CREDIT'; cardNo: string; expiry: string }\n  | { type: 'CASH'; tenderAmount: number };"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর ব্যাকএন্ড থেকে আসা ডায়নামিক প্রোডাক্ট ডাটা এবং স্টক ট্রানজাকশনকে রানটাইমে ভ্যালিডেট করার সাথে সাথে টাইপস্ক্রিপ্ট টাইপ কীভাবে Zod দিয়ে সিঙ্ক করেছিলে?",
          "m": "আমরা 'Single Source of Truth' প্যাটার্ন ব্যবহার করেছি। কোনো ডুপ্লিকেট টাইপস্ক্রিপ্ট ইন্টারফেস না লিখে আমরা Zod স্কিমা তৈরি করেছি (`ProductSchema = z.object({...})`) এবং `z.infer<typeof ProductSchema>` ব্যবহার করে স্বয়ংক্রিয়ভাবে টাইপস্ক্রিপ্ট টাইপ তৈরি করেছি। এর ফলে এপিআই রেসপন্স যখন ক্লায়েন্টে আসে, স্কিমা রানটাইমে ডাটা ভ্যালিডেট করে এবং কম্পাইল টাইমে টাইপস্ক্রিপ্ট শতভাগ নিখুঁত টাইপ সেফটি দেয়—কোনো ডুপ্লিকেট কোড লিখতে হয় না।",
          "b": "দোকানি অ্যাপে আমরা Zod স্কিমা দিয়ে রানটাইম যাচাইকরণ এবং টাইপস্ক্রিপ্ট টাইপ জেনারেশন সিঙ্ক করেছি। z.infer ব্যবহার করে স্কিমা থেকেই টাইপ এক্সট্র্যাক্ট করায় কোনো ডেটা অমিল বা ডুপ্লিকেশন ছাড়াই সম্পূর্ণ টাইপ সেফটি বজায় ছিল।",
          "e": "In Dokani POS, we adhered to the Single Source of Truth principle by pairing Zod runtime schemas with `z.infer<typeof Schema>` to generate compile-time TypeScript types automatically, eliminating drift between validation schemas and static types.",
          "code": "import { z } from 'zod';\nexport const ProductSchema = z.object({\n  id: z.string().uuid(),\n  name: z.string().min(2),\n  price: z.number().positive(),\n  stock: z.number().int()\n});\nexport type Product = z.infer<typeof ProductSchema>;"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ মাল্টি-টেন্যান্ট রোল বেসড সিস্টেমে (`SUPER_ADMIN`, `STORE_OWNER`, `CASHIER`) পারমিশন টাইপ সেফটি কীভাবে আর্কিটেক্ট করেছিলে?",
          "m": "আমরা একটি ম্যাট্রিক্স টাইপ আর্কিটেকচার তৈরি করেছি: `type Permission = 'sales:create' | 'inventory:edit' | 'reports:view' | 'settings:update';`। এবং `type RolePermissions = Record<Role, readonly Permission[]>` দিয়ে রোল ম্যাপিং তৈরি করেছি। এর ফলে রিঅ্যাক্ট কম্পোনেন্টে `<HasPermission permission='inventory:edit'>` কল করার সময় কোনো টাইপো হওয়ার সুযোগ থাকে না—ভুল পারমিশন নাম লিখলে কম্পাইলার সাথে সাথে লাল এরর ধরে ফেলে।",
          "b": "আমরা পারমিশনের জন্য স্ট্রিক্ট ইউনিয়ন টাইপ এবং রেকর্ডের সাহায্যে রোল পারমিশন ম্যাট্রিক্স তৈরি করেছি। এর ফলে কোডে পারমিশন যাচাইয়ের সময় কোনো ভুল স্ট্রিং বা টাইপো লিখলে টাইপস্ক্রিপ্ট সাথে সাথে কম্পাইল এরর প্রদর্শন করে।",
          "e": "We created a strongly-typed RBAC matrix in Dokani using string literal union permissions and a typed `Record<Role, readonly Permission[]>` map. UI permission guards verify permissions with full IDE autocomplete and zero typo risk.",
          "tip": "টাইপস্ক্রিপ্ট দিয়ে পারমিশন স্ট্রিং টাইপ-সেফ করা এন্টারপ্রাইজ সিস্টেমের একটি চমৎকার উদাহরণ।"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে ভিডিও লেকচার, কুইজ এবং অ্যাসাইনমেন্টের মতো ভিন্ন ভিন্ন কোর্স কনটেন্টের জন্য পলিমরফিক রিঅ্যাক্ট কম্পোনেন্ট টাইপ কীভাবে ডিজাইন করেছিলে?",
          "m": "আমরা Discriminated Union এবং Generic Props আর্কিটেকচার ব্যবহার করেছি: প্রতিটি কনটেন্ট আইটেমের একটি `type: 'VIDEO' | 'QUIZ' | 'ASSIGNMENT'` ট্যাগ ছিল। এরপর একটি কমন `<ContentRenderer item={content} />` কম্পোনেন্টে যখন আইটেমের টাইপ চেক করা হতো, টাইপস্ক্রিপ্ট সাথে সাথে নিশ্চিত করত যে কুইজ হলে `questions` প্রপার্টি আছে এবং ভিডিও হলে `videoDuration` ও `streamUrl` প্রপার্টি আছে।",
          "b": "পিটিটিএবিডি কোর্স উপাদানের জন্য পলিমরফিক টাইপিং ব্যবহার করা হয়েছিল। কন্টেন্টের ক্যাটাগরি অনুসারে টাইপস্ক্রিপ্ট অটোমেটিকভাবে ভিডিও, কুইজ বা অ্যাসাইনমেন্টের নির্দিষ্ট প্রপার্টিগুলোকে নিশ্চিত করত।",
          "e": "For PTTABD's heterogeneous course modules, we modeled course contents using a polymorphic discriminated union. A generic renderer component narrowed props based on the discriminatory `type` discriminator.",
          "code": "type ContentItem =\n  | { type: 'VIDEO'; url: string; duration: number }\n  | { type: 'QUIZ'; questions: Question[]; passMarks: number };"
        },
        {
          "lvl": "realworld",
          "q": "Next.js 15 App Router-এ সার্ভার অ্যাকশন এবং ক্লায়েন্ট কম্পোনেন্টের মধ্যে টাইপ সেফটি এনফোর্স করতে কী লাইব্রেরি বা প্যাটার্ন ব্যবহার করেছিলে?",
          "m": "আমরা `next-safe-action` লাইব্রেরি এবং Zod ব্যবহার করেছি। এটি সার্ভার অ্যাকশনকে ইনপুট স্কিমা দিয়ে র্যাপ করে এবং ক্লায়েন্টে একটি টাইপড হুক `useAction(action)` প্রদান করে যাতে `execute(data)`, `isPending`, এবং সার্ভার থেকে রিটার্ন হওয়া `result.data` শতভাগ টাইপ-সেফ থাকে। কোনো ম্যানুয়াল `any` বা টাইপ কাস্টিং প্রয়োজন হয় না।",
          "b": "নেক্সট জেএস অ্যাপ রাউটারে আমরা next-safe-action এবং Zod ব্যবহার করেছি। এটি সার্ভার অ্যাকশনে কঠোর ইনপুট ভ্যালিডেশন এবং ক্লায়েন্ট সাইডে এক্সিকিউশনের সময় স্বয়ংক্রিয় টাইপ সেফটি নিশ্চিত করে।",
          "e": "We integrated next-safe-action with Zod in Next.js. This enforces schema validation on Server Action payloads on the server while exposing fully typed `useAction` hooks on the client for end-to-end type safety.",
          "code": "export const addCustomerAction = actionClient\n  .schema(CustomerInputSchema)\n  .action(async ({ parsedInput: input }) => {\n    return await db.customer.create({ data: input });\n  });"
        },
        {
          "lvl": "realworld",
          "q": "টাইপস্ক্রিপ্ট কম্পাইলেশন স্পিড এবং প্রোডাকশন বিল্ড পারফরম্যান্স অপটিমাইজ করতে `tsconfig.json`-এ কোন কোন সেটিংস ফাইন-টিউন করেছিলে?",
          "m": "বড় প্রজেক্টে টাইপস্ক্রিপ্ট স্লো বিল্ড রোধে আমরা: (১) `\"skipLibCheck\": true` অন করেছি যাতে `node_modules`-এর লাখ লাখ টাইপ ফাইল বারবার স্ক্যান না করে, (২) `\"incremental\": true` সক্রিয় করেছি যাতে শুধু পরিবর্তিত ফাইলের ক্যাশড কম্পাইলেশন হয়, (৩) বিল্ড টুল হিসেবে টাইপস্ক্রিপ্টের ভারী `tsc` এমিটারের বদলে SWC / esbuild ব্যবহার করেছি যা মাত্র কয়েক মিলিসেকেন্ডে ট্রান্সপাইল করে, আর টাইপ চেকিং আলাদা `tsc --noEmit` দিয়ে CI/CD পাইপলাইনে চালিয়েছি।",
          "b": "টাইপস্ক্রিপ্ট বিল্ডের গতি বাড়াতে আমরা skipLibCheck ও incremental ক্যাশিং অন করেছি। ট্রান্সপাইলিংয়ের জন্য দ্রুতগতির SWC বা esbuild ব্যবহার করে শুধুমাত্র টাইপ চেকিংয়ের জন্য tsc --noEmit কমান্ড সিআই/সিডি পাইপলাইনে রাখা হয়েছিল।",
          "e": "Optimized TypeScript build speed by setting skipLibCheck: true and incremental: true in tsconfig.json. In production builds, SWC/esbuild handled blistering-fast transpilation, while static type-checking was isolated to non-blocking CI runs via `tsc --noEmit`.",
          "tip": "কখনোই প্রোডাকশন বিল্ডে ট্রান্সপাইলেশনের জন্য tsc চালাবে না; SWC বা esbuild ব্যবহারের কথা বলা আধুনিক ইঞ্জিনিয়ারিং মাইন্ডসেট প্রকাশ করে।"
        }
      ]
    },
    {
      "id": "tailwind-responsive-ui",
      "name": "Tailwind CSS & Responsive UI",
      "desc": "Tailwind CSS, HTML5 Semantic Elements, CSS3 Flexbox & Grid, Mobile-First Design, Container Queries, Dark Mode",
      "items": [
        {
          "lvl": "lvl1",
          "q": "HTML5-এ Semantic Elements (header, nav, main, section, article, aside, footer) ব্যবহারের গুরুত্ব কী?",
          "m": "Semantic Elements কোডের অর্থ ও কাঠামো স্পষ্ট করে। সাধারণ `<div>` বা `<span>`-এর কোনো অর্থ থাকে না, কিন্তু সেমান্টিক ট্যাগ ব্যবহার করলে: (১) সার্চ ইঞ্জিন ক্রলার (Google SEO) পেজের কনটেন্ট হায়ারার্কি সহজে ইনডেক্স করতে পারে, (২) স্ক্রিন রিডার (Screen Readers) দৃষ্টিপ্রতিবন্ধী ইউজারদের জন্য অ্যাক্সেসিবিলিটি (A11y) নিশ্চিত করে, (৩) কোড রিডেবিলিটি ও মেইনটেনিবিলিটি অনেক সহজ হয়।",
          "b": "এইচটিএমএল৫ সেমান্টিক উপাদানগুলো ব্রাউজার এবং সার্চ ইঞ্জিনকে পেজের বিভিন্ন অংশের অর্থ ও ভূমিকা স্পষ্টভাবে বুঝিয়ে দেয়। এটি এসইও র্যাংকিং বাড়াতে এবং স্ক্রিন রিডারের সাহায্যে প্রতিবন্ধী ব্যক্তিদের জন্য ওয়েবসাইটের অ্যাক্সেসিবিলিটি নিশ্চিত করতে অত্যন্ত জরুরি।",
          "e": "Semantic HTML elements convey structural meaning to both browsers and developers. They drastically boost SEO indexing by search engine crawlers, enable accessibility (A11y) via screen readers, and establish clean document hierarchy without excessive div bloat.",
          "tip": "কখনোই পুরো পেজ div দিয়ে ভরিয়ে ফেলবে না; প্রধান কনটেন্টে <main>, ন্যাভবারে <nav>, সাইডবারে <aside> ব্যবহার করবে।"
        },
        {
          "lvl": "lvl1",
          "q": "CSS3 Flexbox এবং CSS Grid-এর মধ্যে মূল পার্থক্য কী এবং কখন কোনটি ব্যবহার করবে?",
          "m": "Flexbox হলো One-Dimensional (১ডি) লেআউট সিস্টেম—এটি হয় রো (Row) অথবা কলাম (Column) বরাবর একটি ডিরেকশনে কাজ করে (যেমন ন্যাভবার, বাটন গ্রুপ, আইকন এলাইনমেন্ট)। আর CSS Grid হলো Two-Dimensional (২ডি) লেআউট সিস্টেম—এটি একই সাথে রো এবং কলাম উভয় বরাবর কাজ করে (যেমন পুরো ড্যাশবোর্ড লেআউট, প্রোডাক্ট গ্যালারি, জটিল ডাটা গ্রিড)।",
          "b": "ফ্লেক্সবক্স একমাত্রিক বিন্যাসে কাজ করে, অর্থাৎ রো অথবা কলামের যেকোনো একদিকে উপাদান সাজাতে উপযোগী। গ্রিড দ্বিমাত্রিক বিন্যাস যেখানে একই সাথে রো এবং কলামের সমন্বয়ে পূর্ণাঙ্গ জটিল ওয়েব লেআউট তৈরি করা যায়।",
          "e": "Flexbox is a one-dimensional layout system designed for distributing space along either a row or a column (ideal for navbars, toolbars, alignment). CSS Grid is a two-dimensional layout system handling both rows and columns concurrently (ideal for page dashboards and card grids).",
          "code": "/* Flex: 1D */\n.nav { display: flex; justify-content: space-between; align-items: center; }\n/* Grid: 2D */\n.dashboard { display: grid; grid-template-columns: 260px 1fr; }"
        },
        {
          "lvl": "lvl1",
          "q": "Mobile-First Responsive Design নীতি কী এবং Tailwind CSS কীভাবে এটি হ্যান্ডেল করে?",
          "m": "Mobile-First নীতি অনুযায়ী প্রথমে ছোট মোবাইল স্ক্রিনের জন্য বেস CSS বা ডিফল্ট স্টাইল লেখা হয়। এরপর স্ক্রিন সাইজ যত বড় হতে থাকে, `min-width` মিডিয়া কোয়েরি দিয়ে অতিরিক্ত স্টাইল যোগ করা হয়। Tailwind CSS পুরোপুরি Mobile-First: কোনো প্রিফিক্স ছাড়া ক্লাস লিখলে (যেমন `text-sm p-4`) তা মোবাইলের জন্য অ্যাপ্লাই হয়, আর ব্রেকপয়েন্ট যোগ করলে (যেমন `md:text-base md:p-8`) তা শুধুমাত্র মাঝারি বা বড় স্ক্রিনে সক্রিয় হয়।",
          "b": "মোবাইল-ফার্স্ট ডিজাইনে প্রথমে মোবাইলের জন্য ডিফল্ট সিএসএস লেখা হয় এবং বড় স্ক্রিনের জন্য পর্যায়ক্রমে min-width মিডিয়া কোয়েরি যোগ করা হয়। টেলউইন্ড সিএসএস ডিফল্টভাবে মোবাইল-ফার্স্ট মেনে চলে, যেখানে প্রিফিক্স ছাড়া ক্লাসগুলো মোবাইলের জন্য এবং sm:, md:, lg: বড় স্ক্রিনের জন্য প্রযোজ্য হয়।",
          "e": "Mobile-first design prioritizes designing for mobile viewports initially using min-width media queries for larger screens. In Tailwind CSS, un-prefixed utilities apply to mobile viewports, while responsive prefixes (sm:, md:, lg:, xl:) take effect strictly at their min-width breakpoints.",
          "code": "<div className='w-full md:w-1/2 lg:w-1/3'>Responsive Card</div>"
        },
        {
          "lvl": "lvl1",
          "q": "Tailwind CSS-এ `clsx` এবং `tailwind-merge` (`cn` helper function) কেন সবসময় ব্যবহার করা উচিত?",
          "m": "Tailwind-এ ডায়নামিক ক্লাস যোগ করার সময় স্ট্রিং কনক্যাটেনেশন করলে ক্লাস কনফ্লিক্ট হয় (যেমন প্যারেন্ট পাঠালো `p-4` আর চাইল্ডে ডিফল্ট আছে `p-2`)। CSS স্পেসিফিসিটি নিয়মে কোনটি জিতবে তা আনপ্রেডিক্টেবল হয়ে যায়। `clsx` কন্ডিশনাল ক্লাস হ্যান্ডেল করে, আর `tailwind-merge` একই ধরণের কনফ্লিক্টিং ক্লাসের ভেতর শেষের ক্লাসটিকে জয়ী করে অন্যগুলোকে স্বয়ংক্রিয়ভাবে রিমুভ করে। আমরা দুটিকে মিলিয়ে `cn()` হেল্পার ফাংশন ব্যবহার করি।",
          "b": "টেলউইন্ডে শর্তসাপেক্ষে ক্লাস যোগ এবং পরস্পরবিরোধী ক্লাসের সংঘাত এড়াতে clsx এবং tailwind-merge ব্যবহৃত হয়। cn() হেল্পার ফাংশনের মাধ্যমে অপ্রয়োজনীয় ডুপ্লিকেট ক্লাস মুছে ফেলে নিশ্চিতভাবে সঠিক ক্লাস প্রয়োগ করা যায়।",
          "e": "Using string concatenation for dynamic classes leads to CSS conflicts. `clsx` allows conditional class toggling, while `tailwind-merge` resolves conflicting utilities (e.g. p-4 vs p-2) by keeping the latter. The standard `cn()` helper combines both for bulletproof component styling.",
          "code": "import { clsx, type ClassValue } from 'clsx';\nimport { twMerge } from 'tailwind-merge';\nexport function cn(...inputs: ClassValue[]) {\n  return twMerge(clsx(inputs));\n}"
        },
        {
          "lvl": "lvl1",
          "q": "CSS Box Model-এর উপাদানগুলো কী কী এবং `box-sizing: border-box` এর গুরুত্ব কী?",
          "m": "CSS Box Model-এ ৪টি অংশ থাকে: Content, Padding, Border, এবং Margin। ডিফল্ট `content-box`-এ প্যাডিং বা বর্ডার দিলে উপাদানের মোট সাইজ বেড়ে যায় (Width + Padding + Border), ফলে লেআউট ভেঙে যায়। আর `box-sizing: border-box` দিলে প্যাডিং এবং বর্ডার এলিমেন্টের নির্দিষ্ট Width ও Height-এর ভেতরেই হিসাব হয়, বাইরে বাড়ে না। আধুনিক ব্রাউজার এবং Tailwind CSS ডিফল্টভাবে সব এলিমেন্টে `border-box` রিসেট ব্যবহার করে।",
          "b": "বক্স মডেলের ৪টি স্তর হলো কন্টেন্ট, প্যাডিং, বর্ডার এবং মার্জিন। box-sizing: border-box নিশ্চিত করে যে প্যাডিং এবং বর্ডার বাড়ালেও উপাদানের মোট প্রস্থ বা উচ্চতা বৃদ্ধি না পেয়ে সীমানার ভেতরেই সমন্বিত থাকে।",
          "e": "The CSS Box Model consists of Content, Padding, Border, and Margin. Default `content-box` expands element dimensions when padding or borders are applied. `border-box` confines padding and border inside the declared width/height, preventing layout breakages.",
          "tip": "টেলউইন্ড সিএসএস ডিফল্টভাবে প্রি-ফ্লাইট রিসেটে `box-sizing: border-box` প্রয়োগ করে রাখে।"
        },
        {
          "lvl": "lvl2",
          "q": "Tailwind CSS v4-এর নতুন CSS-first কনফিগারেশন এবং `@theme` ডিরেক্টিভ কীভাবে কাজ করে?",
          "m": "Tailwind v4-এ পুরানো জাভাস্ক্রিপ্ট ফাইল `tailwind.config.js` সম্পূর্ণ বিদায় নিয়েছে! এর বদলে এটি পুরোপুরি CSS-first আর্কিটেকচার গ্রহণ করেছে। সরাসরি আপনার মূল `globals.css` ফাইলের ভেতরে `@import 'tailwindcss';` দিয়ে এবং `@theme { --color-primary: #10b981; }` ডিরেক্টিভ দিয়ে ডিজাইন টোকেন, কালার, ফন্ট ও স্পেসিং ডিফাইন করা যায়। এটি Lightning CSS ইঞ্জিন ব্যবহার করায় কম্পাইলেশন আগের চেয়ে ১০ গুণ দ্রুত হয়।",
          "b": "টেলউইন্ড ৪ ভার্সনে tailwind.config.js ফাইলের প্রয়োজন নেই। সরাসরি সিএসএস ফাইলের ভেতর @theme ডিরেক্টিভের মাধ্যমে সমস্ত ভ্যারিয়েবল, রঙ এবং ফন্ট সংজ্ঞায়িত করা যায়, যা লাইটনিং সিএসএস ইঞ্জিনের কারণে অতি দ্রুত কম্পাইল হয়।",
          "e": "Tailwind CSS v4 replaces JavaScript configuration files (tailwind.config.js) with a CSS-first model using the @theme directive inside CSS files, powered by the high-performance Lightning CSS engine for sub-millisecond builds.",
          "code": "@import 'tailwindcss';\n@theme {\n  --color-brand: #0f172a;\n  --font-display: 'Inter', sans-serif;\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Tailwind CSS-এ Dark Mode কীভাবে আর্কিটেক্ট করবে (Class Strategy vs Media Query Strategy)?",
          "m": "Media Query Strategy ব্রাউজার বা অপারেটিং সিস্টেমের সিস্টেম ডার্ক থিমের ওপর নির্ভর করে (`prefers-color-scheme`)। কিন্তু প্রফেশনাল ওয়েব অ্যাপে আমরা Class Strategy (`darkMode: 'selector'` বা `'class'`) ব্যবহার করি। এতে `<html>` ট্যাগে একটি `.dark` ক্লাস টগল করে আমরা ইউজারকে ম্যানুয়ালি ডার্ক ও লাইট মোড সুইচের পূর্ণ স্বাধীনতা দিই এবং ইউজারের পছন্দ `localStorage`-এ সেভ করে রাখি।",
          "b": "ডার্ক মোডে ক্লাস স্ট্র্যাটেজি ব্যবহার করে html ট্যাগে dark ক্লাস বসিয়ে পুরো পেজের রঙ পরিবর্তন করা হয়। এটি ব্যবহারকারীকে ম্যানুয়ালি থিম পরিবর্তনের সুবিধা দেয় যা সিস্টেম প্রেফারেন্সের চেয়ে অনেক বেশি নমনীয়।",
          "e": "The class strategy toggles a `.dark` class on the root <html> element, giving users manual control over UI themes persisted in localStorage, rather than being locked strictly to the OS-level prefers-color-scheme media query.",
          "code": "<html className={isDark ? 'dark' : ''}>\n  <div className='bg-white text-black dark:bg-slate-900 dark:text-white'>Content</div>\n</html>"
        },
        {
          "lvl": "lvl2",
          "q": "CSS Container Queries কী এবং সাধারণ Media Queries-এর চেয়ে এটি কম্পোনেন্ট-বেসড আর্কিটেকচারে কেন সেরা?",
          "m": "Media Queries শুধুমাত্র পুরো ব্রাউজার স্ক্রিন বা ভিউপোর্টের প্রস্থের ওপর ভিত্তি করে স্টাইল পরিবর্তন করতে পারে। কিন্তু একটি কার্ড কম্পোনেন্ট সাইডবারে বসলে ছোট দেখাবে আবার মেইন বডিতে বসলে বড় দেখাবে—অথচ ব্রাউজার স্ক্রিন সাইজ এক! Container Queries (`@container` / Tailwind `@container`) এলিমেন্টের নিজস্ব প্যারেন্ট কন্টেইনারের সাইজের ওপর ভিত্তি করে রেসপনসিভ স্টাইল অ্যাপ্লাই করে, যা স্বয়ংসম্পূর্ণ রি-ইউজেবল কম্পোনেন্ট তৈরিতে যুগান্তকারী।",
          "b": "কন্টেইনার কোয়েরি পুরো ব্রাউজার স্ক্রিনের বদলে কম্পোনেন্টের মূল কন্টেইনারের প্রস্থ মেপে রেসপনসিভ স্টাইল প্রয়োগ করে। ফলে একটি কার্ড সাইডবার বা মূল কন্টেন্টে যেখানেই বসুক না কেন, নিজস্ব জায়গার ওপর ভিত্তি করে সুন্দরভাবে বিন্যস্ত হয়।",
          "e": "Container Queries evaluate the dimensions of the parent container rather than the entire browser viewport. In component-driven architectures, this enables cards or widgets to adapt their layout based on where they are placed (e.g. sidebar vs full main column).",
          "code": "<div className='@container'>\n  <div className='flex flex-col @md:flex-row'>Responsive to Container</div>\n</div>"
        },
        {
          "lvl": "lvl2",
          "q": "CSS Specificity (স্পেসিফিসিটি) কীভাবে গণনা করা হয় এবং `!important` ব্যবহার করা কেন ক্ষতিকর?",
          "m": "Specificity গণনা হয় ৪টি ক্যাটাগরিতে (Inline Styles > IDs > Classes/Attributes/Pseudo-classes > Elements)। `!important` দিলে তা সব স্বাভাবিক স্পেসিফিসিটি রুলকে জোরপূর্বক ওভাররাইড করে। অতিরিক্ত `!important` ব্যবহার করলে সিএসএস ক্যাস্কেডিং নষ্ট হয়, ভবিষ্যতে স্টাইল পরিবর্তন অসম্ভব জটিল হয়ে পড়ে এবং কোড আন-মেইনটেইনেবল হয়ে যায়। Tailwind-এ স্পেসিফিসিটি ফিক্স করতে কাস্টম ক্লাস বা `@layer utilities` ব্যবহার করা উচিত।",
          "b": "সিএসএস স্পেসিফিসিটি উপাদান, ক্লাস, আইডি এবং ইনলাইন স্টাইলের অগ্রাধিকারের ভিত্তিতে নির্ধারিত হয়। !important স্বাভাবিক নিয়ম ভেঙে ফেলে এবং কোডবেজকে জটিল ও ভবিষ্যৎ আপডেটের অনুপযোগী করে তোলে।",
          "e": "Specificity follows a hierarchy: Inline (1000) > ID (100) > Class/Attribute (10) > Element (1). Relying on !important breaks the natural CSS cascade, creating specificity wars that make long-term UI maintenance brittle.",
          "tip": "কখনোই কুইক ফিক্স হিসেবে !important ক্লাস্টার তৈরি করবে না; স্পেসিফিসিটি বা সিএসএস আর্কিটেকচার ঠিক করবে।"
        },
        {
          "lvl": "lvl2",
          "q": "CSS Grid-এ `minmax()`, `auto-fit`, এবং `auto-fill` ব্যবহার করে মিডিয়া কোয়েরি ছাড়া স্বয়ংক্রিয় রেসপনসিভ কার্ড গ্রিড কীভাবে তৈরি করা যায়?",
          "m": "আমরা কোনো `@media` ব্রেকপয়েন্ট না লিখেও সম্পূর্ণ রেসপনসিভ গ্রিড বানাতে পারি: `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));`। এখানে `minmax(280px, 1fr)` নিশ্চিত করে প্রতিটি কার্ডের মিনিমাম সাইজ ২৮০ পিক্সেল থাকবে কিন্তু স্ক্রিনে জায়গা থাকলে সমানভাবে বড় হবে। আর `auto-fit` কলামের খালি জায়গা স্ট্রেচ করে পুরো প্রস্থ পূরণ করে। Tailwind-এ এটি `grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]` দিয়ে লেখা যায়।",
          "b": "রিপিট, অটো-ফিট এবং মিনম্যাক্স সমন্বয়ে কোনো মিডিয়া কোয়েরি ছাড়াই স্বয়ংক্রিয় কার্ড গ্রিড তৈরি করা যায়। প্রতিটি কার্ডের সর্বনিম্ন মাপ নিশ্চিত রেখে অতিরিক্ত ফাঁকা জায়গা স্বয়ংক্রিয়ভাবে পূর্ণ হয়।",
          "e": "Using `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` creates an intrinsically responsive grid without writing a single media query. Columns automatically wrap when the viewport narrows and expand proportionally to fill available space.",
          "code": "<div className='grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4'>\n  {items.map(item => <Card key={item.id} />)}\n</div>"
        },
        {
          "lvl": "lvl3",
          "q": "Tailwind CSS এবং Modern CSS-এ `@layer` (Cascade Layers: base, components, utilities) কীভাবে কাজ করে?",
          "m": "CSS Cascade Layers (`@layer`) স্টাইলের অগ্রাধিকার বা ক্যাস্কেডিং অর্ডারকে কঠোরভাবে নিয়ন্ত্রণ করে। Tailwind-এ ৩টি স্তর থাকে: `@layer base` (HTML এলিমেন্টের ডিফল্ট রিসেট), `@layer components` (কম্পোনেন্ট ক্লাস যেমন বাটন, কার্ড), এবং `@layer utilities` (ইউটিলিটি ক্লাস যেমন মার্জিন, প্যাডিং)। এর ফলে একটি সাধারণ ইউটিলিটি ক্লাস (যেমন `mt-4`) সবসময় কম্পোনেন্ট ক্লাসের চেয়ে বেশি প্রায়োরিটি পায়, কোনো স্পেসিফিসিটি হ্যাক ছাড়াই।",
          "b": "ক্যাস্কেড লেয়ার সিএসএসের অগ্রাধিকারের স্তর সাজায়। টেলউইন্ডে বেইস, কম্পোনেন্টস এবং ইউটিলিটিজ লেয়ারের মাধ্যমে নিশ্চিত করা হয় যে যেকোনো ইউটিলিটি ক্লাস অনায়াসে কম্পোনেন্ট ক্লাসের স্টাইল ওভাররাইড করতে পারে।",
          "e": "CSS Cascade Layers (@layer) structure style precedence regardless of selector specificity. In Tailwind, utilities layer styles always triumph over components layer styles, which in turn override base resets, establishing predictable cascades.",
          "code": "@layer components {\n  .btn-primary {\n    @apply px-4 py-2 bg-blue-600 text-white rounded;\n  }\n}"
        },
        {
          "lvl": "lvl3",
          "q": "GPU Acceleration এবং Hardware-Accelerated CSS Animations কীভাবে স্মুথ ৬০ FPS ফ্রেমরেট নিশ্চিত করে?",
          "m": "CSS-এ `top`, `left`, `width`, `height` পরিবর্তন করলে ব্রাউজারকে পুরো DOM লেআউট (Layout/Reflow) এবং পেইন্ট (Paint) রি-ক্যালকুলেট করতে হয় যা CPU-র ওপর চাপ ফেলে এবং ফ্রেম ড্রপ করায়। কিন্তু `transform` (যেমন `translate3d`, `scale`) এবং `opacity` ব্যবহার করলে ব্রাউজার এলিমেন্টটিকে আলাদা 'Compositor Layer'-এ তুলে সরাসরি গ্রাফিক্স কার্ড (GPU)-এ রেন্ডার করে। এতে কোনো রিফ্লো বা রি-পেইন্ট ছাড়াই মাখনের মতো ৬০–১২০ FPS স্মুথ অ্যানিমেশন পাওয়া যায়।",
          "b": "জিপিইউ এক্সিলারেশন অ্যানিমেশনের জন্য সিপিইউর বদলে গ্রাফিক্স কার্ড ব্যবহার করে। transform এবং opacity প্রপার্টি ব্যবহার করলে ব্রাউজারকে ডম রিফ্লো করতে হয় না, সরাসরি কম্পোজিটর লেয়ারের মাধ্যমে ৬০ এফপিএস স্মুথ অ্যানিমেশন কার্যকর হয়।",
          "e": "Mutating layout properties (top, left, width) triggers expensive browser Reflow and Paint cycles. Hardware-accelerated properties (transform, opacity) offload work to the GPU via the Compositor thread, sustaining 60fps animations without stalling the main UI thread.",
          "code": "/* Smooth 60FPS: */\n.slide-in { transform: translate3d(0, 0, 0); will-change: transform; }"
        },
        {
          "lvl": "lvl3",
          "q": "CSS Subgrid কী এবং নেস্টেড কার্ডের হেডার বা ফুটারকে প্যারেন্ট গ্রিডের লাইনের সাথে কীভাবে পুরোপুরি অ্যালাইন করা যায়?",
          "m": "আগে যখন কোনো গ্রিড আইটেমের ভেতরে নেস্টেড চাইল্ড থাকত, চাইল্ডের নিজস্ব গ্রিড থাকত এবং প্যারেন্ট গ্রিডের ট্র্যাকের সাথে মেলা অসম্ভব ছিল (যেমন ভিন্ন দৈর্ঘ্যের টাইটেলের কারণে কার্ডের বাটনগুলো অসমান লাইনে থাকত)। CSS `subgrid` (`grid-template-rows: subgrid;`) চাইল্ড এলিমেন্টকে অনুমতি দেয় প্যারেন্টের গ্রিড ট্র্যাক সরাসরি ধার নিতে। এর ফলে প্রতিটি কার্ডের কনটেন্ট সাইজ ভিন্ন হলেও সব কার্ডের ফুটার ও বাটন হুবহু একই সমান্তরাল লাইনে স্ন্যাপ করে।",
          "b": "সাবগ্রিড চাইল্ড কম্পোনেন্টকে তার প্যারেন্ট গ্রিডের সারি এবং কলামের লাইনগুলো সরাসরি ব্যবহার করার সুযোগ দেয়। ফলে ভিন্ন ভিন্ন টেক্সটের দৈর্ঘ্য থাকা সত্ত্বেও কার্ডের বাটনগুলো পুরোপুরি এক সমান লাইনে বিন্যস্ত থাকে।",
          "e": "CSS Subgrid allows nested child grid items to inherit and participate directly in the parent grid's row and column tracks, ensuring that headers, descriptions, and action buttons align horizontally across varying card contents.",
          "code": ".card { display: grid; grid-row: span 3; grid-template-rows: subgrid; }"
        },
        {
          "lvl": "lvl3",
          "q": "Tailwind CSS-এ Custom Plugins এবং Dynamic Design Tokens কীভাবে এন্টারপ্রাইজ স্কেলে মেইনটেইন করা যায়?",
          "m": "এন্টারপ্রাইজ অ্যাপ্লিকেশনে একাধিক ব্র্যান্ড বা থিমের জন্য আমরা Tailwind Plugin আর্কিটেকচার ব্যবহার করি। `plugin(({ addUtilities, matchUtilities, theme }) => ...)` দিয়ে ডায়নামিক ইউটিলিটি জেনারেট করা যায়। সাথে CSS ভ্যারিয়েবল (`var(--primary)`) ভিত্তিক ডিজাইন টোকেন ব্যবহার করলে রানটাইমে ক্লায়েন্টের কাস্টম ব্র্যান্ড কালার বদলালেও টেলউইন্ডের সম্পূর্ণ বিল্ড সাইজ বৃদ্ধি না পেয়ে মাত্র একটি CSS ক্লাসে থিম সুইচ করা যায়।",
          "b": "এন্টারপ্রাইজ স্কেলে আমরা টেলউইন্ড প্লাগিন ও সিএসএস ভ্যারিয়েবল ব্যবহার করে ডায়নামিক ডিজাইন টোকেন তৈরি করি। এর ফলে রানটাইমে সম্পূর্ণ থিম পরিবর্তন করা যায় এবং কোডবেজ অত্যন্ত সুসংগঠিত থাকে।",
          "e": "Enterprise design systems implement custom Tailwind plugins via `addUtilities` and dynamic CSS custom properties (`var(--primary)`). This maintains consistent tokens across themes while keeping stylesheet sizes minimal.",
          "code": "const plugin = require('tailwindcss/plugin');\nmodule.exports = plugin(({ addUtilities }) => {\n  addUtilities({ '.scrollbar-none': { 'scrollbar-width': 'none' } });\n});"
        },
        {
          "lvl": "lvl3",
          "q": "CSS Text Truncation এবং Multi-line Clamp কীভাবে হ্যান্ডেল করবে যাতে বিভিন্ন ব্রাউজারে টেক্সট ভেঙে না যায়?",
          "m": "সিঙ্গেল লাইন টেক্সটের জন্য Tailwind-এ `truncate` ক্লাস ব্যবহার করা হয় (`overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`)। আর মাল্টি-লাইন ট্রাংকেশনের জন্য (যেমন কার্ডের ডেসক্রিপশন সর্বোচ্চ ৩ লাইনে কেটে `...` দেখানো) `line-clamp-3` ব্যবহার করা হয় যা ইন্টারনালি WebKit Line Clamp প্রপার্টি (`display: -webkit-box; -webkit-box-orient: vertical;`) ব্যবহার করে সব আধুনিক ব্রাউজারে পারফেক্টলি সাপোর্ট করে।",
          "b": "এক লাইনের টেক্সট কাটতে truncate এবং একাধিক লাইনের জন্য line-clamp ইউটিলিটি ব্যবহার করা হয়। এটি নির্দিষ্ট লাইনের পর টেক্সট কেটে উপবৃত্তাকার চিহ্ন (...) প্রদর্শন করে লেআউট পরিপাটি রাখে।",
          "e": "For single-line clipping, use `truncate` (ellipsis with no-wrap). For multi-line boundaries, leverage `line-clamp-{n}` which utilizes WebKit box orientation standards to cleanly truncate paragraphs after n lines.",
          "code": "<p className='line-clamp-2 text-slate-600'>Long product description...</p>"
        },
        {
          "lvl": "situation",
          "q": "মোবাইল ভিউতে সাফারি ব্রাউজারে নিচের অ্যাড্রেস বারের কারণে `100vh` দিলে স্ক্রিনের নিচের বাটন কেটে যায় বা লুকায়িত থাকে। কীভাবে ফিক্স করবে?",
          "m": "এটি মোবাইল সাফারির ক্লাসিক ভিউপোর্ট সমস্যা, কারণ সাফারির ডায়নামিক অ্যাড্রেস বার এক্সপ্যান্ড বা কলাপ্স হলে আসল দৃশ্যমান উচ্চতা কমে যায়। সমাধান: (১) CSS-এর নতুন ভিউপোর্ট ইউনিট `100dvh` (Dynamic Viewport Height) অথবা `100svh` (Small Viewport Height) ব্যবহার করব। (২) Tailwind-এ সরাসরি `h-dvh` বা `min-h-dvh` লিখলে যেকোনো মোবাইল ব্রাউজারে অ্যাড্রেস বারের সাথে নিজে থেকেই উচ্চতা অ্যাডজাস্ট হয়ে যায় এবং বাটন সবসময় দৃশ্যমান থাকে।",
          "b": "মোবাইল সাফারিতে অ্যাড্রেস বারের ঝামেলা এড়াতে 100vh এর বদলে আধুনিক 100dvh (Dynamic Viewport Height) ব্যবহার করতে হবে। টেলউইন্ডের h-dvh ক্লাস এটি নিখুঁতভাবে সমাধান করে।",
          "e": "Mobile Safari's dynamic navigation bar causes 100vh to overflow the visible viewport. Resolve this by switching to Dynamic Viewport units (`100dvh` or Tailwind's `h-dvh`) which dynamically recalculate height as address bars collapse.",
          "code": "<div className='min-h-dvh flex flex-col justify-between'>Full Mobile Screen</div>"
        },
        {
          "lvl": "situation",
          "q": "একটি ডেটা টেবিল মোবাইল স্ক্রিনে উপচে পড়ছে (Overflow) এবং পুরো পেজের বডি ডানে-বামে হরিজোন্টাল স্ক্রল হয়ে লেআউট ভেঙে দিচ্ছে। সমাধান কী?",
          "m": "টেবিলের প্যারেন্ট কন্টেইনারে `overflow-x-auto` এবং `max-w-full` দিতে হবে, এবং মূল বডি বা পেজ লেআউটে `overflow-x-hidden` এনফোর্স করতে হবে। টেবিলে `whitespace-nowrap` রাখব যাতে সেলগুলো ভেঙে না যায় এবং ব্যবহারকারী টেবিলটির ভেতরেই মসৃণভাবে শুধু টেবিল স্ক্রল করতে পারে, পুরো পেজ নয়।",
          "b": "পুরো পেজ হরিজোন্টালি স্ক্রল হওয়া রোধে টেবিলটিকে একটি ডিভে মুড়ে overflow-x-auto দিতে হবে এবং মূল পেজে overflow-x-hidden নিশ্চিত করতে হবে যাতে শুধুমাত্র টেবিলটি স্ক্রল হয়।",
          "e": "Wrap the table in a responsive container styled with `overflow-x-auto` and `w-full` while applying `whitespace-nowrap` to table cells. Guard the outer layout container with `overflow-x-hidden`.",
          "code": "<div className='w-full overflow-x-auto rounded-lg border'>\n  <table className='w-full text-left whitespace-nowrap'>...</table>\n</div>"
        },
        {
          "lvl": "situation",
          "q": "টেলউইন্ড সিএসএস দিয়ে ডায়নামিক ক্লাস লিখতে গিয়ে যেমন `bg-${color}-500` দিলে প্রোডাকশন বিল্ডে কোনো ব্যাকগ্রাউন্ড রঙ আসছে না। কারণ কী এবং সমাধান কী?",
          "m": "কারণ হলো Tailwind CSS বিল্ড টাইমে রেগুলার এক্সপ্রেশন দিয়ে সোর্স কোডের র ফাইলগুলো স্ক্যান করে সরাসরি পুরো ক্লাসের নাম খোঁজে (Purge / Tree Shaking)। স্ট্রিং ইন্টারপোলেশন (`bg-${color}-500`) করলে বিল্ড টুল বুঝতে পারে না কোন ক্লাসটি প্রয়োজন, তাই CSS ফাইলে সেই ক্লাস জেনারেট করে না। সমাধান: ডায়নামিক ক্লাসের সম্পূর্ণ নাম একটি অবজেক্ট ম্যাপে রাখতে হবে (`const colorMap = { red: 'bg-red-500', blue: 'bg-blue-500' }`) অথবা ইনলাইন স্টাইল দিতে হবে।",
          "b": "টেলউইন্ড কম্পাইলার কোড স্ক্যান করে সম্পূর্ণ ক্লাসের নাম খোঁজে। স্ট্রিং কনক্যাটেনেশন করলে টেলউইন্ড ক্লাসটি সনাক্ত করতে পারে না এবং সিএসএস থেকে বাদ দেয়। সমাধান হলো ক্লাসের সম্পূর্ণ নাম ম্যাপিং অবজেক্টে লিখে রাখা।",
          "e": "Tailwind's build engine scans source files using static string matching. String interpolations like `bg-${color}-500` cannot be extracted at build time and get purged. Map complete, unbroken class names in a dictionary object.",
          "code": "const COLOR_CLASSES = {\n  primary: 'bg-emerald-500',\n  danger: 'bg-rose-500'\n};\n<div className={COLOR_CLASSES[status]} />"
        },
        {
          "lvl": "situation",
          "q": "একটি মডাল পপআপ ওপেন করার পর পেজের পেছনের বডি এখনো স্ক্রল হচ্ছে (Background Scroll Leaking)। কীভাবে সমাধান করবে?",
          "m": "সমাধান: মডাল মাউন্ট হওয়ার সাথে সাথে আমরা জাভাস্ক্রিপ্ট ইফেক্ট দিয়ে `document.body.style.overflow = 'hidden'` করব এবং মডাল ক্লোজ বা আনমাউন্ট হলে ক্লিনআপ ফাংশনে `document.body.style.overflow = 'unset'` করে দেব। অথবা আধুনিক Radix UI / Headless UI ডায়ালগ ব্যবহার করব যা এটি স্বয়ংক্রিয়ভাবে স্ক্রল-লক এবং স্ক্রলবার উইডথ অফসেট সহ হ্যান্ডেল করে।",
          "b": "মডাল ওপেন থাকা অবস্থায় পেছনের বডি স্ক্রল বন্ধ করতে body উপাদানে overflow: hidden প্রয়োগ করতে হবে এবং মডাল বন্ধ হওয়ার সাথে সাথে তা ক্লিনআপ করে পূর্বাবস্থায় ফিরিয়ে নিতে হবে।",
          "e": "Lock the background by setting document.body.style.overflow = 'hidden' when the modal mounts, and restoring it to 'unset' in the effect cleanup. Radix UI handles this automatically along with scrollbar width compensation.",
          "code": "useEffect(() => {\n  document.body.style.overflow = 'hidden';\n  return () => { document.body.style.overflow = 'unset'; };\n}, []);"
        },
        {
          "lvl": "situation",
          "q": "ট্যাবলেট স্ক্রিনে (৭৬৮px থেকে ১০২৪px) সাইডবার মেনু ওপেন থাকলে মেইন কনটেন্টের টেক্সট সংকুচিত হয়ে ভেঙে যাচ্ছে। কীভাবে হ্যান্ডেল করবে?",
          "m": "সমাধান: ট্যাবলেটে সাইডবার সবসময় স্ক্রিনে ফিক্সড না রেখে 'Collapsible Sidebar Drawer' প্যাটার্ন করব। ট্যাবলেট স্ক্রিনে সাইডবার ডিফল্টভাবে হিডেন থাকবে এবং হ্যামবার্গার বাটনে ক্লিকে ওভারলে হিসেবে ভেসে উঠবে। আর ডেস্কটপে (`lg:`) স্ক্রিনে আসলে স্বয়ংক্রিয়ভাবে পার্মানেন্ট লেফট কলামে ফিক্সড হয়ে যাবে।",
          "b": "ট্যাবলেটে সাইডবার স্থায়ীভাবে জায়গা দখল না করে ড্রয়ার মেনু হিসেবে কাজ করবে। বড় ডেস্কটপ স্ক্রিনে এটি স্থায়ী থাকবে কিন্তু ট্যাবলেটে হ্যামবার্গার বাটনের মাধ্যমে স্লাইড-ইন হয়ে ভেসে উঠবে।",
          "e": "Implement a responsive drawer pattern: render the sidebar as an off-canvas slide-out sheet on tablets and mobile with backdrop blur, transitioning to a persistent static flex column only on larger desktop screens (`lg:block`).",
          "code": "<aside className='fixed inset-y-0 z-50 lg:static lg:block'>{...}</aside>"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর দ্রুতগতির ক্যাশ কাউন্টার ইন্টারফেসে টাচ-স্ক্রিন ডিভাইস এবং ডেস্কটপ মনিটর উভয়ের জন্য পারফেক্ট UI কীভাবে ডিজাইন করেছিলে?",
          "m": "টাচ স্ক্রিনের জন্য আমরা Tailwind-এর `touch-manipulation` এবং মিনিমাম ৪৪px x ৪৪px সাইজের 'Hit Targets' নিশ্চিত করেছি যাতে আঙুল দিয়ে দ্রুত ট্যাপ করলে ভুল ক্লিক না হয়। একই সাথে ডেস্কটপে কীবোর্ড শর্টকাট (`F2` ফর বিল, `F4` ফর পেমেন্ট) এবং মাউস হোভার স্টেটস নিশ্চিত করেছি। টাচ ডিভাইসে ডাবল-ট্যাপ জুম বন্ধ করতে `touch-action: manipulation` ব্যবহার করা হয়েছিল।",
          "b": "দোকানি টাচ পিওএসের জন্য আমরা বড় বড় বাটন ও টাচ টার্গেট নিশ্চিত করেছি যাতে ক্যাশিয়ার আঙুল দিয়ে দ্রুত পণ্য যোগ করতে পারে। একই সাথে কীবোর্ড নেভিগেশন ও শর্টকাট সমর্থন দিয়ে ডেস্কটপ ও টাচ উভয়ের সেরা অভিজ্ঞতা দেওয়া হয়েছে।",
          "e": "In Dokani POS, touch monitors required minimum 48px hit targets, generous button padding, and touch-action: manipulation to eliminate mobile 300ms double-tap zoom delays, while concurrently exposing hotkey tooltips on desktop hover.",
          "tip": "ক্যাশ কাউন্টারের টাচস্ক্রিনে ছোট বাটন বানালে ক্যাশিয়ারের বিলিং স্লো হয়ে যায়—এই বাস্তব ইউজার এক্সপেরিয়েন্স তুলে ধরা চমৎকার দিক।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর ৫০+ কাস্টমাইজড রিপোর্ট টেবিলে প্রিন্টিংয়ের জন্য `@media print` CSS আর্কিটেকচার কীভাবে তৈরি করেছিলে?",
          "m": "প্রিন্ট ডায়ালগ ওপেন হলে ব্রাউজার সাইডবার, ন্যাভবার এবং অ্যাকশন বাটনগুলোও প্রিন্ট করার চেষ্টা করে। আমরা Tailwind-এর `print:hidden` ক্লাস দিয়ে সব UI কন্ট্রোল লুকিয়ে ফেলি এবং `print:block` দিয়ে হিডেন ইনভয়েস লেআউট সক্রিয় করি। সাথে পেজ ব্রেক কন্ট্রোল করতে `break-inside-avoid` এবং `break-after-page` ব্যবহার করেছি যাতে টেবিলের কোনো রো মাঝখান থেকে ছিঁড়ে অন্য পৃষ্ঠায় না যায়।",
          "b": "প্রিন্ট অপটিমাইজেশনে আমরা print:hidden দিয়ে সাইডবার ও বাটন লুকিয়ে শুধুমাত্র বিলের অংশ প্রিন্ট করার ব্যবস্থা করেছি। break-inside-avoid সিএসএস দিয়ে টেবিলের রো দুই পৃষ্ঠার মাঝে কেটে যাওয়া রোধ করা হয়েছিল।",
          "e": "Engineered print layouts using Tailwind's print modifiers (`print:hidden` for UI shells, `print:block` for receipts), coupled with `break-inside-avoid` and `page-break-inside: avoid` to keep transaction rows intact across paper boundaries.",
          "code": "<div className='print:hidden'>Sidebar</div>\n<div className='hidden print:block font-mono'>Thermal Receipt Layout</div>"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে বাংলা ফন্ট (SolaimanLipi / Hind Siliguri) এবং ইংরেজি ফন্টের জন্য অপটিমাইজড টাইপোগ্রাফি সিস্টেম কীভাবে আর্কিটেক্ট করেছিলে?",
          "m": "বাংলা ফন্টে অনেক সময় লাইন হাইট ও লেটার স্পেসিং অসমান দেখায়। আমরা `next/font/google` দিয়ে Hind Siliguri এবং Inter ফন্টকে CSS ভ্যারিয়েবল আকারে লোড করেছি (`--font-bangla`, `--font-english`)। এরপর Tailwind-এ কাস্টম ফন্ট ফ্যামিলি ডিক্লেয়ার করে বাংলা টেক্সটে `font-bangla leading-relaxed tracking-normal` এনফোর্স করেছি যাতে যুক্তাক্ষরগুলো চমৎকারভাবে ফুটে ওঠে এবং কোনো লেআউট শিফট না হয়।",
          "b": "পিটিটিএবিডিতে বাংলা যুক্তাক্ষরের সঠিক প্রদর্শনে আমরা হিন্দ শিলিগুড়ি ফন্টকে অপটিমাইজড লাইন-হাইটের সাথে যুক্ত করেছি। সিএসএস ভ্যারিয়েবলের মাধ্যমে ইংরেজি ও বাংলা উভয়ের জন্য সামঞ্জস্যপূর্ণ ফন্ট সিস্টেম নিশ্চিত করা হয়েছিল।",
          "e": "Configured dual typography tokens in Tailwind with `next/font`: Hind Siliguri for Bengali typography with relaxed leading to prevent ligature collisions, alongside Inter for English numeral parity, zeroing layout shift via font-display: swap.",
          "code": "// globals.css\nbody { font-family: var(--font-english), var(--font-bangla), sans-serif; }"
        },
        {
          "lvl": "realworld",
          "q": "একটি ড্যাশবোর্ডে লাইভ ডাটা আপডেটের সময় মাইক্রো-অ্যানিমেশন (Pulse, Shimmer Skeleton, Smooth Fade) কীভাবে ব্যাটারি ও পারফরম্যান্স বাঁচিয়ে ইমপ্লিমেন্ট করবে?",
          "m": "সমাধান: (১) লোডিংয়ের সময় স্ট্যাটিক স্পিনারের বদলে Tailwind-এর `animate-pulse` সমৃদ্ধ স্কেলেটন কার্ড ব্যবহার করব। (২) ব্যবহারকারী যদি ওএস-এ 'Reduce Motion' সক্রিয় করে রাখে, তবে অ্যাক্সেসিবিলিটি নিশ্চিত করতে `motion-reduce:animate-none` ব্যবহার করব যাতে অতিরিক্ত অ্যানিমেশন না চলে। (৩) সব ট্রানজিশনে শুধু `transform` এবং `opacity` ব্যবহার করব যাতে কোনো সিপিইউ ওভারহেড ছাড়া ব্যাটারি সাশ্রয়ী হয়।",
          "b": "লাইভ আপডেটে আমরা টেলউইন্ডের পালস অ্যানিমেশন সমৃদ্ধ স্কেলেটন লোডার ব্যবহার করি। ব্যবহারকারীর সুবিধা অনুযায়ী motion-reduce সমর্থন নিশ্চিত করা হয় এবং জিপিইউ নির্ভর প্রপার্টি ব্যবহারের মাধ্যমে ব্যাটারি খরচ ন্যূনতম রাখা হয়।",
          "e": "Implemented animated shimmer skeletons using Tailwind's `animate-pulse` paired with strict `motion-reduce:animate-none` checks for accessibility. Constrained micro-transitions to transform and opacity to respect battery life and GPU budgets.",
          "code": "<div className='h-4 bg-slate-200 rounded animate-pulse motion-reduce:animate-none' />"
        },
        {
          "lvl": "realworld",
          "q": "Tailwind CSS প্রোডাকশন আউটপুট সিএসএস ফাইল সাইজ ১০MB থেকে কমিয়ে ৫০KB-এর নিচে কীভাবে নিশ্চিত করেছিলে?",
          "m": "Tailwind CSS v3/v4-এ জাস্ট-ইন-টাইম (JIT) ইঞ্জিন ব্যবহৃত হয়। এটি সোর্স কোডে ব্যবহৃত ক্লাসগুলোর বাইরে কোনো অপ্রয়োজনীয় CSS বান্ডেলে অন্তর্ভুক্ত করে না। আমরা `content` কনফিগারেশনে নিখুঁত পাথ সেট করেছি (`./src/**/*.{js,ts,jsx,tsx}`) এবং প্রোডাকশন বিল্ডে PostCSS ও cssnano দিয়ে কম্প্রেশন করেছি। ব্রাউজারে Gzip/Brotli কম্প্রেশন সহ ফাইনাল সিএসএস সাইজ মাত্র ১২–১৫ কিলোবাইটে নেমে এসেছিল।",
          "b": "টেলউইন্ডের জেআইটি ইঞ্জিন এবং সুনির্দিষ্ট কনটেন্ট পাথের মাধ্যমে শুধুমাত্র ব্যবহৃত ক্লাসগুলো সিএসএসে রাখা হয়। প্রোডাকশনে সিএসএসন্যানো এবং ব্রটলি কম্প্রেশন চালিয়ে ফাইনাল ফাইলের আকার মাত্র ১৫ কিলোবাইটে নামিয়ে আনা হয়েছিল।",
          "e": "Leveraged Tailwind's JIT compiler by configuring precise content globs to only compile used utility classes. Minification via cssnano combined with Brotli compression on the edge CDN yielded a sub-15KB production stylesheet.",
          "tip": "টেলউইন্ড প্রোডাকশনে ভারী হয় না বরং ব্রটলি কম্প্রেশনে পুরো সাইটের CSS মাত্র ১০-১৫ KB হয়—এই ডাটা ইন্টারভিউয়ারকে আশ্বস্ত করে।"
        }
      ]
    },
    {
      "id": "state-context-mgmt",
      "name": "State Management & Context API",
      "desc": "Context API, Prop Drilling, Zustand, Redux Toolkit, Server State (TanStack Query) vs Client State, Selectors",
      "items": [
        {
          "lvl": "lvl1",
          "q": "React-এ Prop Drilling কী এবং কীভাবে Context API এই সমস্যার সমাধান করে?",
          "m": "Prop Drilling হলো যখন কোনো ডেটা বা ফাংশন টপ-লেভেল কম্পোনেন্ট থেকে অনেকগুলো ইন্টারমিডিয়েট চাইল্ড কম্পোনেন্টের মধ্য দিয়ে নিচে পাস করতে হয়, যদিও মাঝখানের কম্পোনেন্টগুলোর সেই ডেটার কোনো প্রয়োজন নেই। এটি কোডবেজকে জটিল ও ভঙ্গুর করে তোলে। Context API একটি গ্লোবাল ডাটা পাইপলাইনের মতো কাজ করে, যার ফলে যেকোনো নেস্টেড চাইল্ড সরাসরি `useContext()` দিয়ে মাঝখানের কোনো কম্পোনেন্টকে বিরক্ত না করেই ডাটা অ্যাক্সেস করতে পারে।",
          "b": "প্রপ ড্রিলিং হলো অপ্রয়োজনীয় মধ্যবর্তী কম্পোনেন্টের মধ্য দিয়ে প্রপস পাস করে নিচের কম্পোনেন্টে পৌঁছানোর সমস্যা। কনটেক্সট এপিআই গ্লোবাল স্টেট সরবরাহের মাধ্যমে যেকোনো স্তরের কম্পোনেন্টকে সরাসরি useContext হুকের সাহায্যে ডাটা গ্রহণের সুযোগ দিয়ে কোড পরিষ্কার রাখে।",
          "e": "Prop Drilling is the tedious process of passing props through intermediary components that don't need them just to deliver data to a deeply nested child. The Context API circumvents this by exposing a Provider that any descendant can consume directly via useContext().",
          "code": "const ThemeContext = createContext('dark');\nfunction Child() {\n  const theme = useContext(ThemeContext); // Direct access without drilling\n  return <div>{theme}</div>;\n}"
        },
        {
          "lvl": "lvl1",
          "q": "Client State এবং Server State-এর মধ্যে মৌলিক পার্থক্য কী?",
          "m": "Client State হলো সম্পূর্ণ ব্রাউজারের নিজস্ব সিঙ্ক্রোনাস UI স্টেট—যেমন মডাল ওপেন আছে কি না, সাইডবার টগল, বা ডার্ক মোড প্রেফারেন্স। আর Server State হলো রিমোট ডাটাবেজে থাকা অ্যাসিঙ্ক ডাটা যা অন্য কোনো ইউজারও যেকোনো সময় পরিবর্তন করতে পারে—যেমন প্রোডাক্ট লিস্ট, ইনভেন্টরি স্টক বা সেলস রেকর্ড। ক্লায়েন্ট স্টেটকে Zustand/Context দিয়ে এবং সার্ভার স্টেটকে TanStack Query (React Query) বা SWR দিয়ে হ্যান্ডেল করা আধুনিক স্ট্যান্ডার্ড।",
          "b": "ক্লায়েন্ট স্টেট হলো ব্রাউজারের নিজস্ব ইন্টারফেস অবস্থা যেমন ড্রপডাউন খোলা কি না। অন্যদিকে সার্ভার স্টেট হলো ডাটাবেজ থেকে এপিআইর মাধ্যমে আসা তথ্য যা একাধিক ব্যবহারকারী দ্বারা পরিবর্তিত হতে পারে। সার্ভার স্টেট ক্যাশিং, রিফেচিং ও সিঙ্কের জন্য রিঅ্যাক্ট কোয়েরি ব্যবহার করা সর্বোত্তম।",
          "e": "Client State represents synchronous browser UI data owned entirely by the client (e.g. modal open state). Server State represents asynchronous remote persistence (e.g. database orders) that is shared across users, requiring caching, invalidation, and background synchronization.",
          "tip": "কখনোই এপিআই ডেটা ম্যানুয়ালি Redux-এ রেখে রিফেচ ম্যানেজ করবে না; সার্ভার স্টেটের জন্য TanStack Query ব্যবহার করা সেরা অভ্যাস।"
        },
        {
          "lvl": "lvl1",
          "q": "Zustand কী এবং এটি কেন আধুনিক রিঅ্যাক্ট প্রজেক্টে Redux-এর চেয়ে বেশি জনপ্রিয় হচ্ছে?",
          "m": "Zustand হলো একটি আল্ট্রা-লাইটওয়েট (~১KB) স্টেট ম্যানেজমেন্ট লাইব্রেরি। Redux-এর মতো এতে কোনো জটিল Boilerplate (Actions, Reducers, Dispatchers, Providers) লাগে না। সরাসরি একটি হুক তৈরি করে পুরো অ্যাপের যেকোনো জায়গা থেকে স্টেট রিড এবং আপডেট করা যায়। সবচেয়ে বড় সুবিধা হলো এতে কোনো `<Provider>` র্যাপার লাগে না এবং এটি নিখুঁত সিলেক্টর ভিত্তিক অটোমেটিক রি-রেন্ডার অপটিমাইজেশন দেয়।",
          "b": "জুস্ট্যান্ড একটি অতি হালকা ও দ্রুতগতির স্টেট ম্যানেজমেন্ট টুল। রিডাক্সের মতো বড় বড় একশন ও রিডিউসার লেখার ঝামেলা ছাড়াই সরাসরি হুক বানিয়ে স্টেট পরিচালনা করা যায়। কোনো প্রোভাইডার ছাড়াই এটি কাজ করে এবং মেমোরি ব্যবহারে অত্যন্ত দক্ষ।",
          "e": "Zustand is a minimalistic (~1KB) state management solution built on React hooks without boilerplate. Unlike Redux, it requires no Provider wrappers, actions, or dispatch ceremonies, providing atomic selector-based subscriptions out of the box.",
          "code": "import { create } from 'zustand';\nexport const useCartStore = create((set) => ({\n  items: [],\n  addItem: (item) => set((state) => ({ items: [...state.items, item] }))\n}));"
        },
        {
          "lvl": "lvl1",
          "q": "React-এ `useReducer` কখন `useState`-এর চেয়ে বেশি উপযোগী?",
          "m": "যখন কোনো কম্পোনেন্টে একাধিক সম্পর্কিত স্টেট থাকে এবং স্টেটের পরবর্তী মান আগের মানের ওপর জটিল নিয়মে নির্ভর করে (যেমন: মাল্টি-স্টেপ চেকআউট ফর্ম বা জটিল কার্ট ক্যালকুলেশন), তখন `useReducer` ব্যবহার করা বেস্ট। এটি সব স্টেট মিউটেশন লজিককে একটি সিঙ্গেল 'Reducer Function'-এ একত্রিত করে, যা টেস্ট করা খুব সহজ এবং কম্পোনেন্টের UI থেকে বিজনেস লজিক আলাদা রাখে।",
          "b": "জটিল স্টেট ট্রানজিশন এবং একাধিক আন্তঃসম্পর্কিত স্টেট ভ্যারিয়েবল পরিচালনার জন্য useReducer উপযোগী। এটি কম্পোনেন্টের রেন্ডার অংশ থেকে স্টেট রূপান্তরের লজিক আলাদা করে একটি সুস্পষ্ট রিডিউসার ফাংশনে আবদ্ধ রাখে।",
          "e": "useReducer is preferred over useState when dealing with complex state transitions involving multiple sub-values, interdependent state logic, or when next state depends tightly on previous state, centralizing logic into a pure reducer function.",
          "code": "const [state, dispatch] = useReducer(cartReducer, initialState);\ndispatch({ type: 'ADD_ITEM', payload: product });"
        },
        {
          "lvl": "lvl1",
          "q": "Context API ব্যবহারে সবচেয়ে বড় পারফরম্যান্স সমস্যা কী?",
          "m": "সবচেয়ে বড় সমস্যা হলো: যখনই Context Provider-এর মান সামান্যও পরিবর্তিত হয়, ওই কনটেক্সট ব্যবহারকারী প্রতিটি চাইল্ড কম্পোনেন্ট স্বয়ংক্রিয়ভাবে রি-রেন্ডার হয়—এমনকি চাইল্ডটি যদি ওই পরিবর্তিত ফিল্ডটি ব্যবহার নাও করে! কনটেক্সটে সিলেক্টর ভিত্তিক ফাইন-গ্রেইন্ড সাবস্ক্রিপশন নেই। সমাধান হলো কনটেক্সটকে ছোট ছোট ভাগে স্প্লিট করা (যেমন UserContext এবং ThemeContext আলাদা করা)।",
          "b": "কনটেক্সট এপিআইর মূল দুর্বলতা হলো এর যেকোনো একটি প্রপার্টি পরিবর্তন হলে সংশ্লিষ্ট সমস্ত কনজিউমার কম্পোনেন্ট অপ্রয়োজনীয়ভাবে রি-রেন্ডার হয়ে যায়। এটি বড় অ্যাপের কর্মক্ষমতা ধীরগতির করতে পারে।",
          "e": "The primary drawback of Context API is that any state mutation on the Provider triggers an unconditional re-render of every subscribed consumer component, lacking granular field-level selector subscriptions.",
          "tip": "ইন্টারভিউতে 'Unnecessary re-renders of all consumers' উল্লেখ করে কনটেক্সট স্প্লিটিং সমাধান দেবে।"
        },
        {
          "lvl": "lvl2",
          "q": "Redux Toolkit (RTK) এবং RTK Query কী এবং এটি ট্র্যাডিশনাল Redux-এর জটিলতা কীভাবে দূর করেছে?",
          "m": "আগে সাধারণ Redux-এ Action Types, Action Creators, Reducers এবং Thunks লিখতে শত শত লাইন বয়লারপ্লেট কোড লাগত। Redux Toolkit এনেছে `createSlice`—যা স্বয়ংক্রিয়ভাবে অ্যাকশন ও রিডিউসার জেনারেট করে এবং ইন্টারনালি Immer লাইব্রেরি ব্যবহার করায় সরাসরি মিউটেটিং সিনট্যাক্সে (`state.count++`) ইমিউটেবল স্টেট আপডেট করা যায়। আর RTK Query ডেটা ফেচিং, ক্যাশিং এবং অটোমেটিক রিফেচিংকে বিল্ট-ইন হ্যান্ডেল করে।",
          "b": "রিডাক্স টুলকিট createSlice এর মাধ্যমে অ্যাকশন ও রিডিউসার একসাথে তৈরি করে কোডের আকার অনেক ছোট করে দিয়েছে। ইমার লাইব্রেরির কারণে জটিল অবজেক্ট কপি না করে সরাসরি মান পরিবর্তন করা যায় এবং আরটিকে কোয়েরি দিয়ে স্বয়ংক্রিয় এপিআই ক্যাশিং নিশ্চিত হয়।",
          "e": "Redux Toolkit (RTK) eliminates legacy Redux boilerplate via `createSlice`, which integrates Immer to permit direct mutation syntax safely, and `configureStore` with preconfigured middleware. RTK Query handles automated server caching and invalidation.",
          "code": "const cartSlice = createSlice({\n  name: 'cart',\n  initialState: { items: [] },\n  reducers: {\n    addItem: (state, action) => { state.items.push(action.payload); } // Immer handles immutability\n  }\n});"
        },
        {
          "lvl": "lvl2",
          "q": "Zustand-এ Selectors কীভাবে অপ্রয়োজনীয় রি-রেন্ডার রোধ করে এবং `useShallow` হুকের কাজ কী?",
          "m": "Zustand-এ পুরো স্টোর সাবস্ক্রাইব না করে আমরা নির্দিষ্ট সিলেক্টর পাস করি (`useCartStore(state => state.total)`। এতে স্টোরের অন্যান্য প্রপার্টি পরিবর্তন হলেও এই কম্পোনেন্ট কোনো রি-রেন্ডার হবে না। আর যখন আমরা সিলেক্টর থেকে একাধিক প্রপার্টি একসাথে রিটার্ন করি (`state => ({ count: state.count, name: state.name })`), প্রতি রেন্ডারে নতুন অবজেক্ট রেফারেন্স তৈরি হয়ে রি-রেন্ডার হতে পারে—এখানে Zustand-এর `useShallow` ব্যবহার করলে অবজেক্টের ভেতরের মান তুলনা করে অপ্রয়োজনীয় রেন্ডার পুরোপুরি ব্লক করে।",
          "b": "সিলেক্টরের মাধ্যমে জুস্ট্যান্ড শুধুমাত্র নির্দিষ্ট প্রপার্টি পরিবর্তনের সময় কম্পোনেন্টকে রি-রেন্ডার করায়। useShallow হুক অবজেক্ট বা অ্যারে সিলেক্টরের ক্ষেত্রে অগভীর সমতা যাচাই করে বাড়তি রেন্ডারিং প্রতিরোধ করে।",
          "e": "Zustand selectors ensure components re-render strictly when their selected state slice mutates. Returning multiple fields produces new object references; wrapping the selector with `useShallow` performs shallow equality comparisons to avoid unwanted re-renders.",
          "code": "import { useShallow } from 'zustand/react/shallow';\nconst { count, total } = useCartStore(useShallow(s => ({ count: s.count, total: s.total })));"
        },
        {
          "lvl": "lvl2",
          "q": "TanStack Query (React Query)-এর ক্যাশিং মেকানিজম: `staleTime` বনাম `gcTime` (পুরানো cacheTime)-এর মধ্যে পার্থক্য কী?",
          "m": "`staleTime` নির্দেশ করে একটি ফেচ করা ডাটা কতক্ষণ পর্যন্ত 'তাজা বা ফ্রেশ' থাকবে। staleTime থাকা অবস্থায় পেজে ফিরে আসলে বা রি-রেন্ডার হলেও কোনো নতুন নেটওয়ার্ক রিকোয়েস্ট যাবে না। আর `gcTime` (Garbage Collection Time) নির্দেশ করে যখন কোনো কম্পোনেন্ট ওই ডাটা আর ব্যবহার করছে না (Unmounted), তখন মেমোরি ক্যাশে ডাটাটি কতক্ষণ টিকে থাকবে গারবেজ কালেক্ট হয়ে মুছে যাওয়ার আগে।",
          "b": "staleTime হলো ডেটা ফ্রেশ থাকার সময়সীমা যার মধ্যে কোনো নতুন এপিআই রিকোয়েস্ট পাঠানো হয় না। gcTime হলো মেমোরিতে অব্যবহৃত ডাটা জমিয়ে রাখার সর্বোচ্চ সময়, যা পার হলে ক্যাশ পুরোপুরি মুছে যায়।",
          "e": "staleTime defines the duration data is considered fresh before becoming stale; stale queries trigger background refetches. gcTime defines the duration unused cached queries persist in memory before being garbage collected.",
          "code": "const { data } = useQuery({\n  queryKey: ['products'],\n  queryFn: fetchProducts,\n  staleTime: 1000 * 60 * 5, // Fresh for 5 mins\n  gcTime: 1000 * 60 * 30    // Persisted in cache for 30 mins\n});"
        },
        {
          "lvl": "lvl2",
          "q": "React Context-কে কীভাবে 'State and Dispatch Splitting' প্যাটার্নে অপটিমাইজ করা যায়?",
          "m": "যেসব কম্পোনেন্ট শুধু ডাটা রিড করে তারা স্টেট ব্যবহার করে, আর যেসব কম্পোনেন্ট শুধু ডাটা আপডেট করে (যেমন বাটন) তাদের পুরো স্টেটের দরকার নেই—শুধু ডিসপ্যাচ দরকার। আমরা দুটি আলাদা কনটেক্সট তৈরি করি: `StateContext` এবং `DispatchContext`। ফলে যখন স্টেট আপডেট হয়, শুধু StateContext-এর সাবস্ক্রাইবাররা রি-রেন্ডার হয়; কিন্তু অ্যাকশন বাটনগুলো (DispatchContext) রি-রেন্ডার থেকে শতভাগ রেহাই পায়।",
          "b": "স্টেট এবং ডিসপ্যাচ কনটেক্সট আলাদা করে ফেললে যেসব বাটন বা কন্ট্রোলার শুধু অ্যাকশন ফায়ার করে তারা অপ্রয়োজনীয় রি-রেন্ডারিং থেকে সুরক্ষিত থাকে, ফলে পারফরম্যান্স নাটকীয়ভাবে বৃদ্ধি পায়।",
          "e": "Splitting context into a DataContext and an ActionContext isolates state mutations from consumers that only need dispatch triggers. Consumers calling dispatch never re-render when underlying state data mutates.",
          "code": "const StateCtx = createContext(null);\nconst DispatchCtx = createContext(null);\n// Buttons only consume DispatchCtx without re-rendering on data updates!"
        },
        {
          "lvl": "lvl2",
          "q": "State Management-এ 'Immutability' কেন গুরুত্বপূর্ণ এবং জাভাস্ক্রিপ্ট রেফারেন্স তুলনা কীভাবে কাজ করে?",
          "m": "React স্টেট পরিবর্তিত হয়েছে কি না তা বোঝার জন্য 'Shallow Equality' (মেমোরি রেফারেন্স তুলনা: `prev !== next`) চালায়। আমরা যদি সরাসরি কোনো অবজেক্ট বা অ্যারেকে মিউটেট করি (যেমন `user.name = 'x'` বা `arr.push(1)`), মেমোরি অ্যাড্রেস একই থেকে যায়। ফলে রিঅ্যাক্ট মনে করে কোনো পরিবর্তন হয়নি এবং কম্পোনেন্ট রি-রেন্ডার হয় না। ইমিউটেবিলিটি মেনে নতুন রেফারেন্স (`{ ...user, name: 'x' }`) পাঠালে রিঅ্যাক্ট সাথে সাথে স্টেট চেঞ্জ ধরতে পারে।",
          "b": "রিঅ্যাক্ট মেমোরি রেফারেন্সের অগভীর তুলনা করে স্টেট পরিবর্তন নির্ধারণ করে। সরাসরি অবজেক্ট পরিবর্তন করলে মেমোরি ঠিকানা একই থাকায় রিঅ্যাক্ট পরিবর্তন বুঝতে পারে না, তাই সবসময় নতুন অবজেক্ট বা অ্যারে কপি রিটার্ন করতে হয়।",
          "e": "React relies on shallow reference equality (`oldState !== newState`) for change detection. Mutating existing objects in-place preserves memory references, leading React to bypass re-renders. Producing immutable new objects guarantees deterministic reactivity.",
          "tip": "ইন্টারভিউতে 'Referential Equality' এবং 'Shallow Comparison' ব্যাখ্যা করলে ফান্ডামেন্টাল ক্লিয়ার প্রমাণ হয়।"
        },
        {
          "lvl": "lvl3",
          "q": "Zustand-এ Middleware আর্কিটেকচার (Persist, DevTools, Immer) কীভাবে কাজ করে এবং কাস্টম মিডলওয়্যার কীভাবে লেখা যায়?",
          "m": "Zustand-এর মিডলওয়্যার হলো একটি হায়ার-অর্ডার ফাংশন যা আসল `set`, `get` এবং `api` মেথডকে র‍্যাপ করে। `persist` লোকালস্টোরেজে স্টেট সেভ এবং হাইড্রেট করে, `devtools` রিডাক্স ডেভটুলস এক্সটেনশনের সাথে কানেক্ট করে, আর `immer` ড্রাফট মিউটেশন সহজ করে। কাস্টম মিডলওয়্যার লিখে আমরা যেকোনো অ্যাকশনের আগে ও পরে লগিং, অ্যানালিটিক্স ট্র্যাক বা টোকেন ভ্যালিডেশন স্বয়ংক্রিয়ভাবে চালাতে পারি।",
          "b": "জুস্ট্যান্ড মিডলওয়্যার সেট ফাংশনকে ইন্টারসেপ্ট করে অতিরিক্ত ক্ষমতা যোগ করে। পারসিস্ট মিডলওয়্যার ব্রাউজার স্টোরেজের সাথে সিঙ্ক করে এবং কাস্টম মিডলওয়্যার দিয়ে সেন্ট্রালাইজড লগিং ও অডিট ট্র্যাক নিশ্চিত করা যায়।",
          "e": "Zustand middlewares are higher-order wrappers intercepting `set` and `get` operations. Built-in middlewares include persist (syncing to storage), devtools (Redux DevTools wiring), and immer. Custom middlewares enable logging, performance telemetry, or global state synchronization.",
          "code": "export const useStore = create(devtools(persist(immer((set) => ({\n  // store definition\n})), { name: 'app-storage' })));"
        },
        {
          "lvl": "lvl3",
          "q": "Optimistic Updates কীভাবে TanStack Query-তে ইমপ্লিমেন্ট করা হয় এবং মিউটেশন ফেইল করলে রোলব্যাক কীভাবে নিশ্চিত করবে?",
          "m": "অ্যাসিনক্রোনাস নেটওয়ার্ক রিকোয়েস্ট সফল হওয়ার অপেক্ষা না করে তৎক্ষণাৎ ইউজার ইন্টারফেসে ডাটা আপডেট দেখিয়ে দেওয়াকে Optimistic Update বলে। TanStack Query-তে: (১) `onMutate`-এ চলমান কোয়েরি ক্যানসেল করি (`cancelQueries`), (২) আগের স্টেট স্ন্যাপশট হিসেবে সেভ করে রিটার্ন করি, (৩) ক্যাশ অপটিমিস্টিকালি আপডেট করি (`setQueryData`), (৪) যদি রিকোয়েস্ট ফেইল করে (`onError`), তবে স্ন্যাপশট থেকে আগের ডাটা রোলব্যাক করি, (৫) শেষে `onSettled`-এ সার্ভার থেকে ফ্রেশ ডাটা রিভ্যালিডেট করি।",
          "b": "অপটিমিস্টিক আপডেটে সার্ভার রেসপন্সের আগেই ইন্টারফেস আপডেট হয়ে যায়। অন-মিউটেট হুকে আগের স্টেটের স্ন্যাপশট রেখে দেওয়া হয়, যাতে এপিআই ফেইল করলে অন-এরর হুকে তৎক্ষণাৎ রোলব্যাক করে পূর্বের সঠিক অবস্থা ফিরিয়ে আনা যায়।",
          "e": "Optimistic updates predict success by modifying cached data instantaneously inside `onMutate`, returning a rollback snapshot context. If `onError` triggers, the cached state reverts cleanly to the snapshot, finalized by `onSettled` cache invalidation.",
          "code": "const mutation = useMutation({\n  mutationFn: updateTodo,\n  onMutate: async (newTodo) => {\n    await queryClient.cancelQueries(['todos']);\n    const previous = queryClient.getQueryData(['todos']);\n    queryClient.setQueryData(['todos'], old => [...old, newTodo]);\n    return { previous };\n  },\n  onError: (err, newTodo, context) => {\n    queryClient.setQueryData(['todos'], context.previous); // Rollback\n  }\n});"
        },
        {
          "lvl": "lvl3",
          "q": "Micro-frontends বা বিভিন্ন ফ্রেমওয়ার্কের মধ্যে ক্রস-অ্যাপ্লিকেশন গ্লোবাল স্টেট সিঙ্ক কীভাবে করা যায়?",
          "m": "যেহেতু বিভিন্ন মাইক্রো-অ্যাপ আলাদা আলাদা জাভাস্ক্রিপ্ট বান্ডেল ও ভিন্ন ফ্রেমওয়ার্কে (একটি React, অন্যটি Vue) থাকতে পারে, তাই ইন্টারনাল রিঅ্যাক্ট স্টেট দিয়ে সিঙ্ক করা যায় না। সমাধান: (১) ব্রাউজারের নেটিভ `CustomEvent` এবং `window.dispatchEvent` / `addEventListener` ব্যবহার করা। (২) ক্রস-ট্যাব সিঙ্কের জন্য `BroadcastChannel API` ব্যবহার করা। (৩) একটি কাস্টম Pub-Sub ইভেন্ট বাস তৈরি করা যা ফ্রেমওয়ার্ক অ্যাগনস্টিক।",
          "b": "মাইক্রো-ফ্রন্টএন্ডের মধ্যে স্টেট শেয়ার করতে ব্রাউজারের কাস্টম ইভেন্ট এবং ব্রডকাস্ট চ্যানেল এপিআই ব্যবহার করা হয়। এটি কোনো নির্দিষ্ট ফ্রেমওয়ার্কের ওপর নির্ভরশীল না হয়ে স্বয়ংক্রিয়ভাবে বিভিন্ন অ্যাপের মধ্যে ডাটা বিনিময় করে।",
          "e": "Synchronizing state across decoupled micro-frontends relies on framework-agnostic browser communication channels: dispatching `CustomEvent` on the window object or broadcasting updates across tabs and micro-apps using the `BroadcastChannel` API.",
          "code": "const channel = new BroadcastChannel('auth_channel');\nchannel.postMessage({ type: 'USER_LOGOUT' });\nchannel.onmessage = (e) => handleRemoteEvent(e.data);"
        },
        {
          "lvl": "lvl3",
          "q": "React 18-এর `useSyncExternalStore` হুকের উদ্দেশ্য কী এবং এটি লাইব্রেরি ডেভেলপারদের 'Tearing' সমস্যা কীভাবে সমাধান করে?",
          "m": "'Tearing' হলো এমন একটি ভিজ্যুয়াল বাগ যেখানে কনকারেন্ট রিঅ্যাক্টের ইন্টারাপ্টেবল রেন্ডারিং চলাকালীন একটি কম্পোনেন্ট এক্সটারনাল স্টোরের পুরানো মান রেন্ডার করে এবং অন্য কম্পোনেন্ট একই সাথে নতুন মান রেন্ডার করে, ফলে স্ক্রিনে অসংলগ্ন ডেটা দেখা যায়। React 18-এর `useSyncExternalStore` এক্সটারনাল স্টোর (যেমন Zustand, Redux, বা ব্রাউজার স্টোরেজ) সাবস্ক্রাইব করার জন্য একটি অফিসিয়াল সিনক্রোনাস এপিআই দেয়, যা টিয়ারিং পুরোপুরি নির্মূল করে।",
          "b": "কনকারেন্ট রেন্ডারিংয়ের সময় এক্সটারনাল স্টেট পরিবর্তনের ফলে স্ক্রিনে অমিল ডাটা বা টিয়ারিং সৃষ্টি হতে পারে। useSyncExternalStore হুকটি বাহ্যিক স্টোরের সাথে সিনক্রোনাস সংযোগ রক্ষা করে টিয়ারিং প্রতিরোধ করে।",
          "e": "Tearing occurs in Concurrent React when an external store mutates midway through an interrupted render, causing different UI nodes to reflect mismatched data. `useSyncExternalStore` provides a safe synchronous bridge to external stores to eliminate tearing.",
          "code": "const state = useSyncExternalStore(store.subscribe, store.getSnapshot);"
        },
        {
          "lvl": "lvl3",
          "q": "State Normalization (স্বাভাবিকীকরণ) কী এবং নেস্টেড রিলেশনাল ডেটার ক্ষেত্রে ফ্ল্যাট স্টেট স্ট্রাকচার কেন জরুরি?",
          "m": "যদি এপিআই থেকে নেস্টেড ডেটা আসে (যেমন: Authors -> Posts -> Comments), তখন কোনো কমেন্ট এডিট করতে গেলে পুরো নেস্টেড অবজেক্ট ট্রি ট্রাভার্স করে ডিপ মিউটেশন করতে হয় যা খুব স্লো ও বাগে ভরা। State Normalization-এ ডেটাকে ডাটাবেজ টেবিলের মতো ফ্ল্যাট করে আইডি ভিত্তিক নরমালাইজ করা হয়: `{ byId: { 1: { ... } }, allIds: [1, 2] }` (যেমন `normalizr` বা RTK-এর `createEntityAdapter`)। এর ফলে `O(1)` কমপ্লেক্সিটিতে যেকোনো রেকর্ড তৎক্ষণাৎ আপডেট বা রিড করা যায়।",
          "b": "স্টেট নরমালাইজেশন হলো জটিল নেস্টেড অবজেক্টকে ডাটাবেজের মতো আইডি ভিত্তিক ফ্ল্যাট টেবিলে রূপান্তর করা। এর ফলে যেকোনো গভীর ডাটা খোঁজা বা আপডেট করা অত্যন্ত সহজ ও দ্রুতগতির (O(1)) হয়।",
          "e": "Normalizing state involves flattening relational entities into dictionaries indexed by IDs (`byId` and `allIds`), mirroring database schemas. This eliminates deeply nested object updates, enabling O(1) mutations via libraries like RTK's `createEntityAdapter`.",
          "tip": "ইন্টারভিউতে 'createEntityAdapter' এবং 'Normalized State Structure' উল্লেখ করা অনেক বড় টেকনিক্যাল প্লাস পয়েন্ট।"
        },
        {
          "lvl": "situation",
          "q": "একটি কার্ট অ্যাপ্লিকেশনে ব্যবহারকারী পরপর ৩টি আইটেম দ্রুত ডিলিট করল, কিন্তু স্টেট অ্যাসিঙ্ক হওয়ার কারণে একটি ডিলিট অন্যটিকে ওভাররাইট করে শেষ আইটেমটি আবার কার্টে ফেরত চলে এলো। সমাধান কী?",
          "m": "এটি ঘটে যখন স্টেটের আগের মানের ওপর নির্ভর করার সময় ডিরেক্ট ভ্যালু পাস করা হয় (`setCart(cart.filter(...))`। যেহেতু React স্টেট আপডেট ব্যাচ হতে পারে, `cart` ভ্যারিয়েবলটি স্টেটের লেটেস্ট মান নাও হতে পারে। সমাধান: সবসময় 'Functional State Updater' ব্যবহার করতে হবে: `setCart(prev => prev.filter(...))` অথবা `useReducer` / Zustand ব্যবহার করতে হবে যা নিশ্চিত করে প্রতি অ্যাকশন সবসময় লেটেস্ট স্টেটের ওপর রান করে।",
          "b": "স্টেটের পূর্ববর্তী মানের সঠিক হিসাব রাখতে সরাসরি ভ্যালু না পাঠিয়ে ফাংশনাল আপডেটার `setCart(prev => ...)` ব্যবহার করতে হবে। এতে একের পর এক সব ডিলিট অ্যাকশন সঠিক ক্রমানুসারে নির্বাহ হয়।",
          "e": "Direct state references become stale during batched updates. Resolve this by always using functional state updaters (`setState(prev => ...)`), ensuring mutations operate predictably on the atomic latest state.",
          "code": "const removeItem = (id: string) => {\n  setCart(prevCart => prevCart.filter(item => item.id !== id));\n};"
        },
        {
          "lvl": "situation",
          "q": "তোমার প্রজেক্টে একটি গ্লোবাল ইউজার অবজেক্ট রয়েছে। যখনই ইউজার প্রফাইল ফটো আপডেট করে, পুরো অ্যাপ্লিকেশনের সব কম্পোনেন্ট রি-রেন্ডার হয়ে স্ক্রিন ফ্লিকার করে। কীভাবে সমাধান করবে?",
          "m": "কারণ সব কম্পোনেন্ট পুরো `user` অবজেক্টকে একসাথে সাবস্ক্রাইব করে রেখেছিল। সমাধান: (১) Zustand-এ সিলেক্টর ব্যবহার করে প্রতিটি কম্পোনেন্টকে শুধু তার প্রয়োজনীয় ফিল্ড সাবস্ক্রাইব করানো (`useUserStore(s => s.name)`। এতে শুধু ফটো কম্পোনেন্টটি রি-রেন্ডার হবে, বাকি পুরো অ্যাপ সম্পূর্ণ অপরিবর্তিত থাকবে। (২) Context হলে ইউজার ডাটাকে স্প্লিট করে শুধু ইমেজ স্টেটকে আলাদা কনটেক্সটে রাখা।",
          "b": "পুরো ইউজার অবজেক্ট সাবস্ক্রাইব না করে শুধুমাত্র প্রয়োজনীয় ফিল্ডের জন্য সিলেক্টর ব্যবহার করতে হবে। জুস্ট্যান্ড সিলেক্টরের সাহায্যে কেবল ফটো কম্পোনেন্ট রি-রেন্ডার হবে, পুরো অ্যাপ অক্ষত থাকবে।",
          "e": "Components were subscribed to the monolithic user object. Refactor subscriptions using fine-grained Zustand selectors so that components only re-render if their subscribed primitive slice (e.g. avatarUrl) specifically changes.",
          "code": "const avatar = useUserStore(state => state.user.avatarUrl); // Only re-renders on avatar changes"
        },
        {
          "lvl": "situation",
          "q": "একটি সার্চ এপিআই থেকে ডেটা লোড করার সময় একই সাথে ৩টি ভিন্ন কম্পোনেন্ট একই এপিআই এন্ডপয়েন্টে আলাদা আলাদা রিকোয়েস্ট পাঠিয়ে সার্ভার ওভারলোড করছে। কীভাবে রিকোয়েস্ট ডিডুপ্লিকেট করবে?",
          "m": "আমরা TanStack Query (React Query) ব্যবহার করব। এতে প্রতিটি কোয়েরির একটি ইউনিক `queryKey: ['users', searchQuery]` থাকে। একাধিক কম্পোনেন্ট একই সময়ে একই কি দিয়ে `useQuery` কল করলেও TanStack Query নেটওয়ার্কে মাত্র একটি রিকোয়েস্ট পাঠায় এবং রেসপন্স আসার পর স্বয়ংক্রিয়ভাবে সব কম্পোনেন্টে ডেটা ডিস্ট্রিবিউট করে (Request Deduplication)।",
          "b": "ট্যানস্ট্যাক কোয়েরি একই queryKey যুক্ত একাধিক রিকোয়েস্টকে স্বয়ংক্রিয়ভাবে একত্রিত করে মাত্র একটি নেটওয়ার্ক কল পাঠায় এবং প্রাপ্ত ফলাফল সব কম্পোনেন্টে শেয়ার করে রিকোয়েস্ট ডুপ্লিকেশন রোধ করে।",
          "e": "Implement TanStack Query with co-located query keys (`queryKey: ['users', query]`). TanStack Query automatically deduplicates concurrent in-flight requests, sharing one promise across all subscriber components.",
          "code": "const { data } = useQuery({ queryKey: ['search', term], queryFn: () => fetchSearch(term) });"
        },
        {
          "lvl": "situation",
          "q": "ব্রাউজার রিফ্রেশ দেওয়ার পর Zustand স্টোরের ডেটা হারিয়ে যাচ্ছে এবং ইউজার লগআউট হয়ে যাচ্ছে। কীভাবে স্টেট পারসিস্ট করবে?",
          "m": "আমরা Zustand-এর বিল্ট-ইন `persist` মিডলওয়্যার ব্যবহার করব। এটি স্টোরের যেকোনো অংশকে `localStorage` বা `sessionStorage`-এ JSON আকারে স্বয়ংক্রিয়ভাবে সিঙ্ক করে এবং অ্যাপ লোড হওয়ার সময় মেমোরিতে রি-হাইড্রেট করে। সংবেদনশীল ডেটা বাদ দিতে `partialize` অপশন ব্যবহার করব যাতে শুধু নিরাপদ ফিল্ডগুলো সেভ হয়।",
          "b": "জুস্ট্যান্ডের পারসিস্ট মিডলওয়্যার ব্যবহার করে স্টেট লোকালস্টোরেজে সংরক্ষণ করতে হবে। partialize অপশনের মাধ্যমে নির্দিষ্ট প্রয়োজনীয় ফিল্ডগুলো ব্রাউজারে ধরে রেখে রিফ্রেশের পরেও লগইন সেশন অক্ষুণ্ণ রাখা যায়।",
          "e": "Wrap the Zustand store definition in the `persist` middleware, utilizing the `partialize` option to selectively sync non-sensitive state fields to localStorage with automatic rehydration upon page reload.",
          "code": "export const useAuthStore = create(persist((set) => ({\n  user: null,\n  setUser: (u) => set({ user: u })\n}), {\n  name: 'auth-storage',\n  partialize: (state) => ({ user: state.user })\n}));"
        },
        {
          "lvl": "situation",
          "q": "মোবাইল ডিভাইসে ব্যাক বাটন চাপলে ব্যবহারকারী পূর্বের ফিল্টার করা সার্চ রেজাল্ট হারিয়ে ফেলে। স্টেটকে কীভাবে ব্রাউজার হিস্ট্রি ও URL-এর সাথে সিঙ্ক করবে?",
          "m": "সমাধান: সার্চ ফিল্টার, সর্টিং এবং পেজিনেশন স্টেটকে কোনো ইন্টারনাল রিঅ্যাক্ট মেমোরি স্টেটে না রেখে 'URL Search Params' (`?q=laptop&page=2&sort=price_asc`) হিসেবে সেভ করব। Next.js-এর `useSearchParams()` এবং `useRouter()` দিয়ে URL আপডেট করব। এর ফলে ব্যাক বাটন চাপলেও ব্রাউজার হিস্ট্রি থেকে পারফেক্ট ফিল্টারড স্টেট লোড হবে এবং যেকোনো লিংক সরাসরি অন্য কারও সাথে শেয়ার করা যাবে।",
          "b": "সার্চ এবং ফিল্টারের অবস্থা রিঅ্যাক্ট মেমরিতে না রেখে ইউআরএল প্যারামসে (URL Search Params) সংরক্ষণ করতে হবে। এতে ব্যাক বাটনে ক্লিক করলে পূর্বের ফিল্টার সংরক্ষিত থাকে এবং পেজটি সহজে শেয়ারযোগ্য হয়।",
          "e": "Treat the URL Search Params as the single source of truth for filters, paging, and sorting. Utilizing `useSearchParams` and `useRouter` ensures natural browser history navigation, back-button resilience, and deep-link shareability.",
          "code": "const searchParams = useSearchParams();\nconst query = searchParams.get('q') || '';"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর দ্রুতগতির কার্ট মডিউলে Zustand বনাম Redux Toolkit নির্বাচনের পেছনের আর্কিটেকচারাল কারণ কী ছিল?",
          "m": "Dokani POS-এ আমাদের মূল লক্ষ্য ছিল: সাব-মিলিসেকেন্ড রেন্ডারিং স্পিড, জিরো বয়লারপ্লেট এবং অফলাইন IndexedDB-এর সাথে তাৎক্ষণিক সিঙ্ক্রোনাইজেশন। Redux Toolkit চমৎকার হলেও এর হেভি ফাইল সাইজ এবং অতিরিক্ত অ্যাকশন/ডিসপ্যাচ লেয়ার ক্যাশ কাউন্টারের দ্রুতগতির বারকোড স্ক্যানিংয়ে অপ্রয়োজনীয় ওভারহেড তৈরি করছিল। Zustand মাত্র ১KB হওয়ায় এবং কোনো `<Provider>` ছাড়া সরাসরি হুক ভিত্তিক সিলেক্টর সাবস্ক্রিপশন দেওয়ায় আমরা ৬০ FPS পারফরম্যান্স অর্জন করেছি।",
          "b": "দোকানি পিওএসে আমরা জুস্ট্যান্ড বেছে নিয়েছিলাম কারণ এর অতি হালকা সাইজ (১কেবি) এবং কোনো বয়লারপ্লেট ছাড়াই সরাসরি হুক কল করার সুবিধা। এটি ক্যাশ কাউন্টারে বারকোড স্ক্যানিংয়ের গতিকে সর্বোচ্চ মাত্রায় সচল রেখেছিল।",
          "e": "For Dokani POS, we selected Zustand over Redux Toolkit because of its microscopic ~1KB footprint, lack of Context Provider overhead, and atomic selectors capable of sustaining fluid 60fps renders during rapid barcode checkouts.",
          "tip": "ইন্টারভিউতে যেকোনো টেকনোলজি বেছে নেওয়ার সময় 'Trade-offs' এবং 'কেন RTK বাদ দিয়ে Zustand নিলাম' তা স্পষ্টভাবে বলা প্রফেশনাল আর্কিটেক্টের পরিচয়।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ একই সাথে ৫টি ভিন্ন স্টোরের সেলস ট্যাব খোলা থাকলে তাদের স্টেট আইসোলেশন ও ডেটা লিকেজ কীভাবে সমাধান করেছিলে?",
          "m": "মাল্টি-স্টোর ক্যাশিয়ারিংয়ের জন্য আমরা স্টোর-আইডি ভিত্তিক 'Dynamic Keyed Store' প্যাটার্ন ব্যবহার করেছি। গ্লোবাল স্টেটে ফ্ল্যাট কার্ট না রেখে `Record<StoreId, CartState>` স্ট্রাকচার রেখেছি। যখন ইউজার ট্যাব বদলায়, কারেন্ট স্টোর আইডি দিয়ে সংশ্লিষ্ট কার্ট সিলেক্ট হয়। এর ফলে এক দোকানের বিক্রি বা প্রোডাক্ট কখনোই অন্য দোকানের অ্যাকাউন্টের সাথে মিশে ডেটা করাপ্ট করেনি।",
          "b": "একাধিক স্টোরের সেলস ট্যাব আলাদা রাখতে আমরা স্টোর আইডি ভিত্তিক কি-যুক্ত স্টেট কাঠামো ব্যবহার করেছিলাম। ফলে প্রতি দোকানের পণ্য ও হিসাব সম্পূর্ণ পৃথক বাক্সে সুরক্ষিত ছিল এবং কোনো তথ্য মিশ্রণ ঘটেনি।",
          "e": "Handled multi-store sales tabs in Dokani by structuring cart state as a dictionary keyed by Store ID (`Record<StoreId, CartState>`). Active tabs subscribed strictly to their partitioned slice, eradicating cross-tenant data bleed.",
          "code": "const currentCart = useCartStore(state => state.carts[activeStoreId] || defaultCart);"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে ১ ঘণ্টার লম্বা অনলাইন এমসিকিউ পরীক্ষার সময় ইন্টারনেট হঠাৎ চলে গেলে স্টুডেন্টের ড্রাফট উত্তরগুলো স্টেট ম্যানেজমেন্টে কীভাবে প্রটেক্ট করেছিলে?",
          "m": "আমরা একটি 'Dual-Tier Write' স্টেট আর্কিটেকচার বানিয়েছিলাম। প্রতিটি অপশন সিলেক্টের সাথে সাথে: (১) Zustand স্টেট তৎক্ষণাৎ লোকালস্টোরেজ ও IndexedDB-তে ড্রাফট অ্যান্সার সেভ করে, (২) ব্যাকগ্রাউন্ডে TanStack Query Mutation দিয়ে এপিআইতে পাঠায়। যদি ইন্টারনেট ফেইল করে, UI-তে অফলাইন ব্যাজ দেখায় কিন্তু স্টুডেন্ট পরীক্ষা চালিয়ে যেতে পারে। ইন্টারনেট ব্যাক আসলে ড্রাফট উত্তরগুলো স্বয়ংক্রিয়ভাবে সার্ভারে সিঙ্ক হয়ে যায়।",
          "b": "অনলাইন পরীক্ষার সময় ইন্টারনেট সংযোগ বিচ্ছিন্ন হলেও উত্তর যাতে না হারায়, সেজন্য প্রতিটি ক্লিক ইনডেক্সড-ডিবিতে সংরক্ষিত হতো। সংযোগ ফেরার সাথে সাথে ব্যাকগ্রাউন্ড সিঙ্ক দিয়ে সব উত্তর সার্ভারে জমা হতো।",
          "e": "Guarded PTTABD student exam states via dual-tier persistence: every MCQ choice was committed instantly to IndexedDB before dispatching async network mutations. Network drops triggered an offline buffer queue that flushed pending answers upon reconnect.",
          "tip": "অফলাইন এক্সাম সেফটি এবং লোকাল স্টোরেজ ফলব্যাক রিয়েল-ওয়ার্ল্ড এড-টেক অ্যাপ্লিকেশনের অত্যন্ত গুরুত্বপূর্ণ কেস স্টাডি।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ শত শত প্রোডাক্ট ক্যাটাগরির ফিল্টারিং এবং সর্টিং স্টেট হ্যান্ডেল করার সময় মেমোরি ও CPU থ্রটলিং রোধে কী কৌশল প্রয়োগ করেছিলে?",
          "m": "সমাধান: (১) ফিল্টারিংয়ের মূল ক্যালকুলেশন `useMemo` দিয়ে ক্যাশ করেছি যা কেবল ফিল্টার ট্যাগ পরিবর্তন হলেই রি-ক্যালকুলেট হয়। (২) ক্যাটাগরি ট্রিতে দ্রুত লুকআপের জন্য অ্যারের বদলে একটি `Map` এবং `Set` ডেটা স্ট্রাকচার ব্যবহার করেছি যাতে `O(1)` সময়ে চেক করা যায় কোনো প্রোডাক্ট নির্বাচিত ক্যাটাগরিতে পড়ে কি না। (৩) ইনপুট ফিল্টারে ৩০০ মিলিসেকেন্ড ডিবউন্সিং দিয়ে অপ্রয়োজনীয় স্টেট চেঞ্জ এড়িয়েছি।",
          "b": "প্রোডাক্ট ফিল্টারিংয়ে আমরা অ্যারের বদলে হ্যাশ ম্যাপ এবং সেট ব্যবহার করে O(1) গতিতে ফিল্টারিং নিশ্চিত করেছি। useMemo এবং ডিবউন্সিংয়ের সাহায্যে অপ্রয়োজনীয় সিপিইউ হিসাব প্রতিরোধ করা হয়েছিল।",
          "e": "Optimized catalog filtering by indexing categories into Hash Sets for O(1) membership lookups inside a useMemo pipeline, backed by debounced state dispatches to bypass redundant intermediate calculations.",
          "code": "const selectedCategorySet = useMemo(() => new Set(selectedCategories), [selectedCategories]);"
        },
        {
          "lvl": "realworld",
          "q": "প্রোডাকশন ড্যাশবোর্ডে WebSocket দিয়ে প্রতি সেকেন্ডে শত শত লাইভ ট্রেড/সেলস আপডেট আসার সময় রিঅ্যাক্ট স্টেটকে 'Throttled Batch Buffer' দিয়ে কীভাবে ক্র্যাশ হওয়া থেকে বাঁচাবে?",
          "m": "যদি প্রতি সকেট মেসেজে সরাসরি `setState` কল করা হয়, তবে প্রতি সেকেন্ডে শত শত রি-রেন্ডার হয়ে পুরো ব্রাউজার ক্র্যাশ করবে। সমাধান: আমরা একটি ইন-মেমোরি বাফার অ্যারে রাখব যাতে ইনকামিং সকেট মেসেজ পুশ হবে। এরপর `requestAnimationFrame` অথবা একটি ৩০০ মিলিসেকেন্ডের থ্রটল টাইমার দিয়ে বাফারের সব জমে থাকা মেসেজ একসাথে ব্যাচ করে রিঅ্যাক্ট স্টেটে পুশ করব। এতে ১ সেকেন্ডে ১০০ বারের বদলে মাত্র ৩-৪ বার রি-রেন্ডার হবে অথচ ইউজার লাইভ আপডেট দেখবে।",
          "b": "প্রতিটি ওয়েবসকেট মেসেজে রিঅ্যাক্ট স্টেট আপডেট না করে একটি ইন-মেমোরি বাফারে ডাটা জমিয়ে রেখে requestAnimationFrame বা ৩০০ মিলিসেকেন্ডের থ্রটল বিরতিতে ব্যাচ আকারে স্টেট আপডেট করতে হবে যাতে ব্রাউজার ক্র্যাশ না করে।",
          "e": "Avoid firing setState on every raw WebSocket frame. Instead, accumulate socket payloads in a mutable buffer array and flush them to React state in batches at 300ms throttled intervals via `requestAnimationFrame` to maintain smooth 60fps rendering.",
          "code": "let buffer = [];\nws.onmessage = (e) => { buffer.push(JSON.parse(e.data)); };\nsetInterval(() => {\n  if (buffer.length > 0) {\n    setLiveFeed(prev => [...buffer, ...prev].slice(0, 50));\n    buffer = [];\n  }\n}, 300);"
        }
      ]
    },
    {
      "id": "forms-validation-zod",
      "name": "Form Handling & Zod Validation",
      "desc": "React Hook Form, Controlled vs Uncontrolled Inputs, Zod Schema Validation, Complex Dynamic Fields, Multi-step Forms",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Controlled Components এবং Uncontrolled Components-এর মধ্যে পার্থক্য কী এবং পারফরম্যান্সে কে এগিয়ে?",
          "m": "Controlled Component-এ ইনপুট ফিল্ডের মান রিঅ্যাক্ট স্টেট (`useState`) দ্বারা সরাসরি নিয়ন্ত্রিত হয় এবং প্রতি কিস্ট্রোকে কম্পোনেন্ট রি-রেন্ডার হয়। আর Uncontrolled Component-এ ইনপুটের মান সরাসরি ব্রাউজার DOM নিজে ধরে রাখে এবং শুধুমাত্র সাবমিটের সময় `useRef` বা FormData দিয়ে মান রিড করা হয়। পারফরম্যান্সে Uncontrolled Component অনেক এগিয়ে কারণ এটি টাইপ করার সময় কোনো রি-রেন্ডার করায় না। React Hook Form ইন্টারনালি Uncontrolled পদ্ধতি ব্যবহার করে সর্বোচ্চ স্পিড দেয়।",
          "b": "কন্ট্রোল্ড কম্পোনেন্টে প্রতি কিস্ট্রোকে রিঅ্যাক্ট স্টেট আপডেট ও রি-রেন্ডার হয়। আনকন্ট্রোল্ড কম্পোনেন্টে ডম নিজে ইনপুটের মান বজায় রাখে এবং রি-রেন্ডার ছাড়া সরাসরি রিফারেন্সের মাধ্যমে মান সংগ্রহ করা হয়, যা পারফরম্যান্সে অনেক দ্রুতগতির।",
          "e": "Controlled components bind input values to React state, re-rendering on every keystroke. Uncontrolled components let the DOM manage input state, accessing values via refs or FormData. Uncontrolled components are significantly faster as they eliminate re-renders, which React Hook Form exploits.",
          "code": "// Controlled:\n<input value={val} onChange={e => setVal(e.target.value)} />\n// Uncontrolled:\n<input ref={inputRef} />"
        },
        {
          "lvl": "lvl1",
          "q": "React Hook Form কেন সাধারণ ফর্ম লাইব্রেরির (যেমন Formik) চেয়ে দ্রুত এবং আধুনিক স্ট্যান্ডার্ড?",
          "m": "React Hook Form ইনপুটগুলোতে আনকন্ট্রোল্ড রেফারেন্স (`ref`) ব্যবহার করে। Formik প্রতি ক্যারেক্টার টাইপিংয়ে পুরো ফর্মকে বারবার রি-রেন্ডার করত, যার ফলে ৫০টি ফিল্ডের বড় ফর্মে দৃশ্যমান ল্যাগ হতো। React Hook Form শুধুমাত্র যখন কোনো নির্দিষ্ট ফিল্ডে ভ্যালিডেশন এরর আসে কেবল তখনই আইসোলেটেডভাবে সেই এরর মেসেজটি রেন্ডার করে, পুরো ফর্ম কখনোই রি-রেন্ডার হয় না। সাথে এর বান্ডেল সাইজ অত্যন্ত ছোট (~৮KB)।",
          "b": "রিঅ্যাক্ট হুক ফর্ম আনকন্ট্রোল্ড ডম রেফারেন্স ব্যবহার করায় টাইপিংয়ের সময় অপ্রয়োজনীয় রি-রেন্ডার এড়ায়। এটি পুরো ফর্ম রি-রেন্ডার না করে কেবল আক্রান্ত ফিল্ডকে আপডেট করে, যার ফলে বড় ফর্মেও কোনো ল্যাগ ছাড়াই তাৎক্ষণিক প্রতিক্রিয়া পাওয়া যায়।",
          "e": "React Hook Form relies on uncontrolled inputs via ref subscriptions, eliminating full-form re-renders on keystrokes that plagued Formik. It isolates re-renders strictly to fields exhibiting validation changes with a minimal ~8KB bundle size.",
          "tip": "ইন্টারভিউতে বলবে: 'React Hook Form isolates re-renders at the individual field level using uncontrolled inputs'."
        },
        {
          "lvl": "lvl1",
          "q": "Zod কী এবং এটি কীভাবে রানটাইম ডাটা ভ্যালিডেশন নিশ্চিত করে?",
          "m": "Zod হলো একটি TypeScript-first স্কিমা ডিক্লারেশন এবং ভ্যালিডেশন লাইব্রেরি। টাইপস্ক্রিপ্ট টাইপগুলো বিল্ড টাইমে কম্পাইল হয়ে গায়েব হয়ে যায় এবং রানটাইমে কোনো ডেটা গার্ড করতে পারে না। Zod রানটাইমে ইনকামিং ডাটা (ফর্ম ইনপুট বা ব্যাকএন্ড এপিআই রেসপন্স) চেক করে দেখে যে সেটি ডিক্লেয়ার করা স্কিমার নিয়মের সাথে মিলছে কি না। না মিললে স্পষ্ট এরর অবজেক্ট দেয় এবং মিললে ক্লিন টাইপড ডাটা পার্স করে রিটার্ন করে।",
          "b": "Zod রানটাইম ডাটা যাচাইকরণ লাইব্রেরি। যেহেতু টাইপস্ক্রিপ্ট শুধুমাত্র বিল্ডের সময় কাজ করে, Zod রানটাইমে ব্যবহারকারীর দেওয়া ডাটা বা এপিআই রেসপন্স নির্ভুলভাবে স্কিমা অনুযায়ী যাচাই করে নিরাপদ রাখে।",
          "e": "Zod is a TypeScript-first schema declaration and runtime validation library. While TypeScript checks types statically at compile time, Zod parses and validates untrusted runtime inputs (forms, API payloads), throwing descriptive errors on schema violations.",
          "code": "import { z } from 'zod';\nconst UserSchema = z.object({\n  email: z.string().email('Invalid email address'),\n  age: z.number().min(18, 'Must be at least 18')\n});"
        },
        {
          "lvl": "lvl1",
          "q": "React Hook Form-এর সাথে Zod কীভাবে `@hookform/resolvers/zod` দিয়ে ইন্টিগ্রেট করা হয়?",
          "m": "আমরা `useForm` হুকের ভেতরে `resolver: zodResolver(MySchema)` পাস করি। এর ফলে ইউজার যখন ফর্ম সাবমিট করে বা টাইপ করে, React Hook Form ব্যাকগ্রাউন্ডে Zod স্কিমা দিয়ে ইনপুট ডাটা রানটাইমে পার্স করে। কোনো ফিল্ড অমান্য হলে Zod-এর এরর মেসেজ সরাসরি `formState.errors` অবজেক্টে পপুলেট হয়ে যায় যা দিয়ে সুন্দর লাল এরর দেখানো যায়।",
          "b": "zodResolver ইন্টিগ্রেশনের মাধ্যমে রিঅ্যাক্ট হুক ফর্ম স্বয়ংক্রিয়ভাবে Zod স্কিমা দিয়ে ফর্ম ডাটা যাচাই করে। কোনো ভুল থাকলে formState.errors এ মেসেজ পাঠিয়ে ইউজার ইন্টারফেসে নিখুঁত এরর প্রদর্শনে সাহায্য করে।",
          "e": "Integrate React Hook Form with Zod via `zodResolver(Schema)` passed to `useForm`. This wires up automatic schema validation on submit or blur, populating `formState.errors` with strongly typed validation messages.",
          "code": "import { useForm } from 'react-hook-form';\nimport { zodResolver } from '@hookform/resolvers/zod';\nconst { register, handleSubmit, formState: { errors } } = useForm({\n  resolver: zodResolver(LoginSchema)\n});"
        },
        {
          "lvl": "lvl1",
          "q": "ফর্ম সাবমিশনের সময় `e.preventDefault()` কেন ব্যবহার করা আবশ্যক?",
          "m": "HTML ফর্ম বাই-ডিফল্ট সাবমিট হলে ব্রাউজার পুরো পেজ রিফ্রেশ করে এবং অ্যাকশন ইউআরএলে একটি নতুন HTTP GET/POST রিকোয়েস্ট পাঠায়। সিঙ্গেল পেজ অ্যাপ্লিকেশনে (SPA) পুরো পেজ রিফ্রেশ হলে অ্যাপের স্টেট ও মেমোরি ডেটা হারিয়ে যায়। `e.preventDefault()` ব্রাউজারের এই ডিফল্ট সাবমিশন ও পেজ রিলোড বন্ধ করে দেয়, ফলে আমরা জাভাস্ক্রিপ্ট দিয়ে শান্তভাবে অ্যাসিঙ্ক এপিআই কল চালাতে পারি।",
          "b": "ডিফল্ট ব্রাউজার ফর্ম সাবমিট হলে পেজ রিলোড হয়ে যায়, ফলে অ্যাপের মেমোরি ও স্টেট মুছে যায়। e.preventDefault() এই রিলোড বন্ধ করে দিয়ে ব্যাকগ্রাউন্ডে অ্যাসিনক্রোনাস এপিআই রিকোয়েস্ট চালানোর সুযোগ দেয়।",
          "e": "Default HTML form submissions trigger browser page reloads. In Single Page Applications, `e.preventDefault()` halts default reload mechanics, enabling JavaScript to asynchronously handle payloads via fetch or Server Actions.",
          "code": "const onSubmit = (e: React.FormEvent) => {\n  e.preventDefault();\n  // Handle async API call\n};"
        },
        {
          "lvl": "lvl2",
          "q": "Zod-এ `refine` এবং `superRefine` ব্যবহার করে কাস্টম ক্রস-ফিল্ড ভ্যালিডেশন (যেমন পাসওয়ার্ড কনফার্মেশন) কীভাবে করবে?",
          "m": "যখন কোনো ভ্যালিডেশন দুটি ভিন্ন ফিল্ডের ওপর নির্ভর করে (যেমন `password` এবং `confirmPassword` সমান হতে হবে), তখন অবজেক্ট স্কিমার শেষে `.refine((data) => data.password === data.confirmPassword, { message: 'Passwords must match', path: ['confirmPassword'] })` ব্যবহার করা হয়। আর একাধিক জটিল ফিল্ড লেভেলে কাস্টম ডায়নামিক এরর অ্যাসাইন করতে `superRefine((data, ctx) => ...)` ব্যবহার করা হয়।",
          "b": "পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মেলানোর মতো ক্রস-ফিল্ড যাচাইয়ের জন্য Zod এর refine মেথড ব্যবহার করা হয়। path নির্ধারণ করে দিলে সরাসরি নির্দিষ্ট কনফার্ম পাসওয়ার্ড ফিল্ডের নিচে কাস্টম এরর মেসেজ প্রদর্শিত হয়।",
          "e": "Cross-field validations (e.g. password confirmation) are declared using Zod's `.refine()` on the parent schema object. Target the specific input field by designating `{ path: ['confirmPassword'] }` so the error attaches directly to the appropriate input UI.",
          "code": "const RegisterSchema = z.object({\n  password: z.string().min(8),\n  confirmPassword: z.string()\n}).refine(d => d.password === d.confirmPassword, {\n  message: 'Passwords do not match',\n  path: ['confirmPassword']\n});"
        },
        {
          "lvl": "lvl2",
          "q": "React Hook Form-এ Dynamic Arrays বা একাধিক রো যোগ/বিয়োগ করার জন্য `useFieldArray` কীভাবে কাজ করে?",
          "m": "ইনভয়েসে একাধিক প্রোডাক্ট রো বা অর্ডারে আইটেম লিস্ট ডায়নামিকালি অ্যাড ও রিমুভ করার জন্য `useFieldArray` ব্যবহার করা হয়। এটি আমাদের `{ fields, append, remove, move }` মেথড দেয়। গুরুত্বপূর্ণ বিষয় হলো: প্রতিটি রো রেন্ডার করার সময় অবশ্যই `key={field.id}` দিতে হবে (অ্যারে ইনডেক্স নয়!), কারণ React Hook Form ইন্টারনালি প্রতিটি রো-কে একটি ইন্টারনাল ইউনিক আইডি দিয়ে ট্র্যাক করে যাতে ফিল্ড রিমুভ বা সর্ট করলেও স্টেট নষ্ট না হয়।",
          "b": "ইনভয়েসে ডায়নামিক রো বা আইটেম যোগ-বিয়োগের জন্য useFieldArray ব্যবহৃত হয়। এটি append ও remove মেথড দেয়। রো রেন্ডারের সময় key হিসেবে field.id দেওয়া বাধ্যতামূলক যাতে অভ্যন্তরীণ রেফারেন্স নিখুঁত থাকে।",
          "e": "Dynamic sub-forms (e.g. invoice line items) are powered by `useFieldArray`. It supplies helper methods like append(), remove(), and swap(). Developers must assign `key={field.id}` rather than map indices to preserve uncontrolled input identity.",
          "code": "const { fields, append, remove } = useFieldArray({ control, name: 'items' });\n// <button onClick={() => append({ name: '', qty: 1 })}>Add Item</button>"
        },
        {
          "lvl": "lvl2",
          "q": "React Hook Form-এ কাস্টম UI লাইব্রেরি কম্পোনেন্ট (যেমন Radix UI Select, DatePicker) ইন্টিগ্রেট করতে `<Controller>` কম্পোনেন্ট কীভাবে ব্যবহৃত হয়?",
          "m": "অনেক থার্ড-পার্টি লাইব্রেরি (যেমন Radix UI, Ant Design, Material UI Select) সরাসরি নেটিভ HTML `<input>` নয় এবং তাদের নিজস্ব কাস্টম ড্রপডাউন স্টেট থাকে যাতে সরাসরি `register()` এর র ref পাস করা যায় না। `<Controller>` একটি র্যাপার হিসেবে কাজ করে যা তার `render={({ field }) => ...}` প্রপের মাধ্যমে `field.onChange`, `field.onBlur`, এবং `field.value` প্রোভাইড করে কাস্টম কম্পোনেন্টকে React Hook Form-এর সাথে টাইটলি বাইন্ড করে।",
          "b": "কাস্টম ড্রপডাউন বা ডেটপিকারের মতো নন-নেটিভ উপাদানে সরাসরি ref কাজ না করায় Controller কম্পোনেন্ট ব্যবহার করা হয়। এটি render প্রপের সাহায্যে কাস্টম কম্পোনেন্টকে ফর্মের ইন্টারনাল স্টেটের সাথে সমন্বয় করে।",
          "e": "Third-party components lacking standard ref interfaces (e.g., Radix Select, date pickers) cannot use direct register(). The `<Controller>` component bridges this via its `render` prop, injecting controlled handlers (`field.onChange`, `field.value`) cleanly.",
          "code": "<Controller\n  control={control}\n  name='category'\n  render={({ field }) => (\n    <Select value={field.value} onValueChange={field.onChange} />\n  )}\n/>"
        },
        {
          "lvl": "lvl2",
          "q": "Zod Schema Transformations (`coerce`, `transform`) কীভাবে ব্যবহার করে ইনপুট টাইপ সেনিটাইজ করা যায়?",
          "m": "HTML ইনপুট সবসময় ভ্যালু স্ট্রিং (`\"123\"`) হিসেবে রিটার্ন করে, এমনকি `type='number'` দিলেও। Zod-এ `z.coerce.number()` ব্যবহার করলে স্ট্রিং মান স্বয়ংক্রিয়ভাবে আসল জাভাস্ক্রিপ্ট সংখ্যায় রূপান্তর হয়। আবার `.transform(val => val.trim().toLowerCase())` ব্যবহার করে ইউজারের ইনপুট থেকে অতিরিক্ত স্পেস বাদ দিয়ে লোয়ারকেস করে ডাটাবেজে পাঠানোর আগে স্যানিটাইজ করা যায়।",
          "b": "এইচটিএমএল ইনপুট সাধারণত স্ট্রিং মান দেয়। Zod এর coerce.number স্বয়ংক্রিয়ভাবে স্ট্রিংটিকে সংখ্যায় রূপান্তর করে এবং transform মেথড দিয়ে টেক্সট ট্রিম ও লোয়ারকেস করে নিখুঁত স্যানিটাইজেশন সম্পন্ন করা যায়।",
          "e": "HTML inputs default to string values. `z.coerce.number()` coerces input strings to actual numbers automatically. Chaining `.transform()` allows stripping whitespace, trimming casing, or sanitizing strings directly within the validation pipeline.",
          "code": "const PriceSchema = z.object({\n  price: z.coerce.number().positive(),\n  code: z.string().transform(s => s.trim().toUpperCase())\n});"
        },
        {
          "lvl": "lvl2",
          "q": "React Hook Form-এ `formState` ডি-স্ট্রাকচার করার সময় পারফরম্যান্স অপটিমাইজেশন নিয়ম কী?",
          "m": "React Hook Form-এর `formState` একটি Proxy অবজেক্ট। আপনি যদি `const { isSubmitting, isDirty, isValid } = formState` ডি-স্ট্রাকচার করেন, তবে শুধুমাত্র যে ফিল্ডগুলো ডি-স্ট্রাকচার করেছেন সেগুলোর জন্যই রিঅ্যাক্ট সাবস্ক্রাইব করবে। কিন্তু যদি পুরো `formState` অবজেক্ট সরাসরি কোনো হুকে পাস করেন বা আন-ডি-স্ট্রাকচার্ড রাখেন, তবে প্রতিটি অভ্যন্তরীণ স্টেট পরিবর্তনে কম্পোনেন্ট অপ্রয়োজনীয়ভাবে রি-রেন্ডার হতে পারে। তাই শুধু প্রয়োজনীয় ফিল্ডগুলোই সরাসরি ডি-স্ট্রাকচার করা উচিত।",
          "b": "formState প্রক্সি অবজেক্ট হিসেবে কাজ করে। শুধুমাত্র প্রয়োজনীয় ফিল্ডগুলো ডি-স্ট্রাকচার করলে রিঅ্যাক্ট হুক ফর্ম কেবল সেই ইভেন্টগুলোর জন্যই কম্পোনেন্ট আপডেট করে, ফলে অপ্রয়োজনীয় রেন্ডারিং সম্পূর্ণ বন্ধ থাকে।",
          "e": "React Hook Form's `formState` is wrapped in a Proxy that tracks subscribed properties. Destructure strictly the flags you need (e.g. `{ errors, isSubmitting }`) to instruct the engine to only trigger component renders when those specific flags change.",
          "tip": "কখনোই পুরো formState অবজেক্টকে একবারে পাস করবে না; সবসময় নির্দিষ্ট প্রপার্টি ডি-স্ট্রাকচার করবে।"
        },
        {
          "lvl": "lvl3",
          "q": "মাল্টি-স্টেপ উইজার্ড ফর্মে (Multi-Step Form) স্টেট লস ছাড়া ধাপে ধাপে Zod ভ্যালিডেশন কীভাবে আর্কিটেক্ট করবে?",
          "m": "সমাধান: (১) পুরো ফর্মের জন্য একটি প্যারেন্ট Zod স্কিমা থাকবে, যাকে ধাপে ধাপে ভাগ করার জন্য `Step1Schema`, `Step2Schema` ইত্যাদি সাব-স্কিমায় স্প্লিট করব। (২) পরবর্তী স্টেপে যাওয়ার আগে React Hook Form-এর `trigger(['field1', 'field2'])` কল করে শুধুমাত্র বর্তমান স্টেপের ফিল্ডগুলো ভ্যালিডেট করব। (৩) পুরো ফর্মের স্টেট প্যারেন্ট Zustand স্টোরে বা `useForm` এর প্যারেন্ট কম্পোনেন্টে ধরে রাখব যাতে স্টেপ ১ থেকে স্টেপ ২-এ গেলে ডেটা অক্ষত থাকে।",
          "b": "মাল্টি-স্টেপ ফর্মে প্রতিটি ধাপের জন্য পৃথক Zod স্কিমা তৈরি করে trigger() মেথডের মাধ্যমে বর্তমান ধাপের ফিল্ডগুলো যাচাই করে পরবর্তী ধাপে যেতে দেওয়া হয়। কেন্দ্রীয় স্টেট বা জাস্ট্যান্ডের সাহায্যে পেজগুলোর ডাটা ধরে রাখা হয়।",
          "e": "Decompose a multi-step form into segmented sub-schemas merged via Zod. When stepping forward, execute `trigger(['currentFields'])` to strictly validate the active step's inputs while preserving accumulated values in a parent Zustand store or form context.",
          "code": "const handleNext = async () => {\n  const isValid = await trigger(['fullName', 'email']);\n  if (isValid) setStep(s => s + 1);\n};"
        },
        {
          "lvl": "lvl3",
          "q": "অ্যাসিঙ্ক Zod ভ্যালিডেশন (`refine(async () => ...)`): ইউজারনেম বা ইমেইল ইউনিক কি না তা ডেটাবেজ চেক করার সময় রিকোয়েস্ট ফ্লাডিং কীভাবে রোধ করবে?",
          "m": "যদি ইনপুটের প্রতি কিস্ট্রোকে অ্যাসিঙ্ক Zod স্কিমা রান করে তবে ডাটাবেজে হাজার হাজার কোয়েরি গিয়ে সার্ভার ডাউন হবে। সমাধান: (১) React Hook Form-এর মোড `mode: 'onBlur'` রাখব যাতে ইউজার টাইপিং শেষ করে ইনপুট ফিল্ড থেকে বের হলে কেবল একবার ভ্যালিডেশন চলে। (২) কাস্টম ডিবউন্সড এপিআই চেক করব যাতে ৩০০ মিলিসেকেন্ড টাইপিং পজ না হওয়া পর্যন্ত ডাটাবেজে কোনো কল না যায়। (৩) অলরেডি চেক করা রেজাল্ট ইন-মেমোরি সেটে ক্যাশ রাখব।",
          "b": "ডাটাবেজে অতিরিক্ত রিকোয়েস্ট পাঠানো ঠেকাতে ফর্মের মোড onBlur করে দিতে হবে যাতে ইনপুট ছাড়ার পর যাচাই হয়। টাইপিংয়ের সময় ৩০০ মিলিসেকেন্ড ডিবউন্সিং দিয়ে এপিআই কল নিয়ন্ত্রণ করতে হবে।",
          "e": "Throttle database uniqueness checks by setting `mode: 'onBlur'` in useForm. Couple the async Zod refine validator with an in-memory cache and a 300ms debounce function to eradicate database connection exhaustion.",
          "code": "const UsernameSchema = z.string().refine(async (name) => {\n  const available = await checkUsernameApi(name);\n  return available;\n}, 'Username already taken');"
        },
        {
          "lvl": "lvl3",
          "q": "Dynamic Conditional Schemas: ব্যবহারকারী ড্রপডাউনে যে অপশন সিলেক্ট করবে তার ওপর ভিত্তি করে Zod স্কিমা ও ফর্ম ফিল্ড কীভাবে ডায়নামিকালি পরিবর্তন করবে?",
          "m": "Zod-এর `discriminatedUnion` অথবা কন্ডিশনাল চেকিং ব্যবহার করব। যেমন পেমেন্ট টাইপ যদি `'BKASH'` হয় তবে `bkashNumber` ও `trxId` ফিল্ড বাধ্যতামূলক হবে; আর যদি `'CASH'` হয় তবে কোনো ট্রানজাকশন আইডি ফিল্ড থাকবে না। React Hook Form-এ `useWatch({ name: 'paymentType' })` দিয়ে সিলেক্টেড টাইপ ওয়াচ করব এবং কন্ডিশন অনুযায়ী UI-তে সংশ্লিষ্ট ইনপুট ফিল্ডগুলো রেন্ডার করব।",
          "b": "ড্রপডাউন পছন্দের ওপর ভিত্তি করে ফর্ম ফিল্ড পরিবর্তন করতে Zod এর discriminatedUnion এবং রিঅ্যাক্ট হুক ফর্মের useWatch ব্যবহার করা হয়। বিকাশ সিলেক্ট করলে ট্রানজাকশন আইডি আবশ্যক হবে এবং ক্যাশ সিলেক্ট করলে তা বাদ থাকবে।",
          "e": "Model conditional form fields using Zod's `discriminatedUnion`. On the UI side, subscribe to the controlling selector with `useWatch({ name: 'type' })` to conditionally mount dependent input groups while keeping validation tightly coupled.",
          "code": "const FormSchema = z.discriminatedUnion('method', [\n  z.object({ method: z.literal('BKASH'), trxId: z.string().min(8) }),\n  z.object({ method: z.literal('CASH'), receivedAmount: z.number() })\n]);"
        },
        {
          "lvl": "lvl3",
          "q": "React Hook Form-এ ১০০+ ফিল্ড বিশিষ্ট এন্টারপ্রাইজ ফর্মে কীভাবে Field-Level Subscriptions নিশ্চিত করে রেন্ডার সাইকেল অপটিমাইজ করবে?",
          "m": "কখনোই পুরো ফর্ম স্টেট রিড করার জন্য `watch()` প্যারামিটার ছাড়া কল করা যাবে না (কারণ এটি পুরো ফর্মকে রি-রেন্ডার করায়)। সমাধান: (১) শুধুমাত্র নির্দিষ্ট ফিল্ডের জন্য `useWatch({ name: 'targetField' })` ব্যবহার করব। (২) প্রতিটি ফিল্ড গ্রুপকে আলাদা মেমোইজড চাইল্ড কম্পোনেন্টে স্প্লিট করব। (৩) `formState.dirtyFields` এবং `formState.touchedFields` ব্যবহার করে শুধুমাত্র স্পর্শ করা ফিল্ডগুলো প্রসেস করব।",
          "b": "শত শত ফিল্ডের ফর্মে সাধারণ watch() কল পরিহার করে useWatch হুকের সাহায্যে শুধুমাত্র নির্দিষ্ট ফিল্ডের পরিবর্তন ট্র্যাক করতে হবে। ফিল্ডগুলোকে মেমোইজড কম্পোনেন্টে ভাগ করে দিলে পারফরম্যান্স অপটিমাইজড থাকে।",
          "e": "Avoid calling parameter-less `watch()` which registers a global subscription. Instead, use localized `useWatch({ name: 'field' })` within isolated child components, ensuring re-render boundaries stay strictly isolated to the dependent DOM subtree.",
          "tip": "ইন্টারভিউতে 'useWatch vs watch()' এর পারফরম্যান্স পার্থক্য তুলে ধরা সিনিয়র ফ্রন্টএন্ড ইঞ্জিনিয়ারের সিগনেচার দক্ষতা।"
        },
        {
          "lvl": "lvl3",
          "q": "Server-side Validation Error Mapping: ব্যাকএন্ড থেকে আসা ফিল্ড-লেভেল এরর (যেমন: `{ errors: { email: 'Already registered' } }`) কীভাবে স্বয়ংক্রিয়ভাবে ফর্মের সংশ্লিষ্ট ফিল্ডে সেট করবে?",
          "m": "আমরা React Hook Form-এর `setError` মেথড ব্যবহার করব। ব্যাকএন্ড এপিআই যদি 422 বা 400 এররে ফিল্ড-ম্যাপ পাঠায়, আমরা সেই অবজেক্টের ওপর লুপ চালিয়ে `setError(fieldName as any, { type: 'server', message: errMsg })` কল করব। সাথে `setFocus(fieldName)` কল করে স্বয়ংক্রিয়ভাবে প্রথম ভুল ফিল্ডটিতে ব্রাউজার কার্সর ফোকাস করে দেব যাতে ইউজার সাথে সাথে কারেকশন করতে পারে।",
          "b": "ব্যাকএন্ডের এরর অবজেক্টের ওপর লুপ চালিয়ে রিঅ্যাক্ট হুক ফর্মের setError মেথড দিয়ে সংশ্লিষ্ট ফিল্ডে এরর মেসেজ সেট করা হয়। setFocus এর মাধ্যমে স্বয়ংক্রিয়ভাবে কার্সর এরর হওয়া ফিল্ডে নিয়ে যাওয়া যায়।",
          "e": "Map backend API 422 error dictionaries directly into React Hook Form via `setError(fieldName, { type: 'server', message })`. Pair this with `setFocus(firstErrorField)` to provide seamless accessibility and instant user correction.",
          "code": "const onSubmit = async (data: FormValues) => {\n  const res = await api.post('/register', data);\n  if (res.error) {\n    Object.entries(res.error.fields).forEach(([field, msg]) => {\n      setError(field as any, { type: 'server', message: msg as string });\n    });\n  }\n};"
        },
        {
          "lvl": "situation",
          "q": "ইউজার একটি বিশাল ফর্ম ফিলাপ করার পর ভুল করে ব্রাউজার রিফ্রেশ বা ব্যাক বাটন চাপলে তার সমস্ত টাইপ করা ডেটা হারিয়ে যায়। কীভাবে এটি অটোমেটিক ড্রাফট ও প্রটেক্ট করবে?",
          "m": "সমাধান: (১) আমরা `useForm` এর সাথে `useWatch` ব্যবহার করে একটি কাস্টম ইফেক্টে ড্রাফট ডাটাকে লোকালস্টোরেজে ডিবউন্সড আকারে সেভ করব। (২) ফর্ম মাউন্ট হওয়ার সময় `defaultValues` হিসেবে লোকালস্টোরেজ থেকে ডাটা লোড করব। (৩) `window.addEventListener('beforeunload')` লিসেনার দিয়ে যদি `formState.isDirty` সত্য হয়, তবে ব্রাউজারে একটি 'Changes you made may not be saved' ডায়ালগ দেখাব। সফল সাবমিটের পর ড্রাফট ক্লিয়ার করে দেব।",
          "b": "ড্রাফট ডাটা বাঁচাতে লোকালস্টোরেজে ডিবউন্সড অটো-সেভ রাখতে হবে। isDirty ফ্ল্যাগ সত্য থাকলে beforeunload ইভেন্টের সাহায্যে ব্যবহারকারী পেজ ছাড়ার আগে সতর্কবার্তা প্রদর্শন নিশ্চিত করতে হবে।",
          "e": "Implement auto-saving drafts to localStorage via a debounced watcher, loading them into defaultValues on mount. Guard accidental navigation by listening to `beforeunload` when `formState.isDirty` is true.",
          "code": "useEffect(() => {\n  const handleBeforeUnload = (e: BeforeUnloadEvent) => {\n    if (isDirty) e.preventDefault();\n  };\n  window.addEventListener('beforeunload', handleBeforeUnload);\n  return () => window.removeEventListener('beforeunload', handleBeforeUnload);\n}, [isDirty]);"
        },
        {
          "lvl": "situation",
          "q": "ব্যবহারকারী সাবমিট বাটনে দ্রুত ৩-৪ বার ডাবল-ক্লিক করায় ব্যাকএন্ডে ৩টি ডুপ্লিকেট অ্যাকাউন্ট বা অর্ডার তৈরি হয়ে গেছে। ফ্রন্টএন্ড ফর্ম হ্যান্ডলিংয়ে কীভাবে এটি রোধ করবে?",
          "m": "সমাধান: (১) `formState.isSubmitting` সত্য থাকলে সাবমিট বাটনকে সাথে সাথে `disabled` এবং লোডিং স্পিনার দেখাব (`<button disabled={isSubmitting}>`)। (২) সাবমিট ফাংশনে একটি রিঅ্যাক্ট রেফারেন্স `isSubmittingRef.current` দিয়ে সিঙ্ক্রোনাস গার্ড দেব। (৩) ব্যাকএন্ডে একটি ইউনিক Idempotency Key (যেমন UUID) হেডার হিসেবে পাঠাব যাতে প্রথম রিকোয়েস্ট প্রসেস হওয়ার পর পরবর্তী ডুপ্লিকেট রিকোয়েস্টগুলো কোনো পরিবর্তন ছাড়াই ইগনোর হয়।",
          "b": "ডাবল ক্লিক প্রতিরোধে isSubmitting ফ্ল্যাগ চলাকালীন সাবমিট বাটনটি disabled রাখতে হবে। পাশাপাশি ব্যাকএন্ডে আইডেমপোটেন্সি কি পাঠিয়ে একাধিক ডুপ্লিকেট রেকর্ড তৈরি হওয়া শতভাগ বন্ধ করতে হবে।",
          "e": "Disable the submit button when `formState.isSubmitting` is true. Additionally, generate a unique Idempotency Key on initial submit passed via headers to ensure subsequent clicks are safely ignored by the backend.",
          "code": "<button type='submit' disabled={isSubmitting} className='btn-primary'>\n  {isSubmitting ? 'Processing...' : 'Submit Order'}\n</button>"
        },
        {
          "lvl": "situation",
          "q": "একটি ডায়নামিক ইনভয়েস ফর্মে ইউজার যখন কোনো প্রোডাক্ট রো ডিলিট করে, তখন ক্যালকুলেশন সামারি স্বয়ংক্রিয়ভাবে রিক্যালকুলেট হতে ভুলে যায় বা পুরানো টোটাল দেখায়। সমাধান কী?",
          "m": "কারণ টোটাল ক্যালকুলেশন লজিকটি রিঅ্যাক্ট স্টেটে আলাদাভাবে রাখা হয়েছিল যা ফিল্ড রিমুভ হওয়ার সাথে সিঙ্ক হয়নি। সমাধান: কখনোই টোটাল অ্যামাউন্ট আলাদা `useState`-এ রাখবেন না; এটি একটি 'Derived State'। আমরা `useWatch({ control, name: 'items' })` দিয়ে লাইভ আইটেম অ্যারেটি শুনব এবং `useMemo` দিয়ে সরাসরি `items.reduce(...)` করে লাইভ টোটাল হিসাব করব। ফিল্ড অ্যাড বা ডিলিট হওয়া মাত্র টোটাল মিলি-সেকেন্ডে স্বয়ংক্রিয়ভাবে আপডেট হয়ে যাবে।",
          "b": "মোট টাকা আলাদা স্টেটে না রেখে ড্রাইভড স্টেট হিসেবে গণনা করতে হবে। useWatch দিয়ে আইটেম অ্যারের পরিবর্তনের ওপর useMemo লুপ চালিয়ে লাইভ টোটাল বের করলে রো যোগ বা মুছে ফেলার সাথে সাথে সঠিক হিসাব পাওয়া যায়।",
          "e": "Avoid keeping calculated invoice totals in independent state. Treat totals as Derived State by computing them via useMemo over items extracted directly from `useWatch({ name: 'items' })`. Mutations to the array instantly re-evaluate the sum.",
          "code": "const items = useWatch({ control, name: 'items' }) || [];\nconst grandTotal = useMemo(() => items.reduce((s, i) => s + (i.price * i.qty || 0), 0), [items]);"
        },
        {
          "lvl": "situation",
          "q": "মোবাইল ভিউতে বড় ফর্ম স্ক্রল করার সময় ইউজার সাবমিট দিলে ফর্ম সাবমিট হয় না, কিন্তু কোনো এরর মেসেজও চোখে পড়ে না কারণ ভুল ফিল্ডটি স্ক্রিনের অনেক উপরে লুকানো। কীভাবে সমাধান করবে?",
          "m": "React Hook Form-এর `handleSubmit` এর সেকেন্ড প্যারামিটার হিসেবে একটি `onError` কলব্যাক পাস করা যায় (`handleSubmit(onSuccess, onError)`। যখন কোনো ভ্যালিডেশন এরর হবে, আমরা প্রথম এরর ফিল্ডের এলিমেন্টটি খুঁজে বের করব এবং `element.scrollIntoView({ behavior: 'smooth', block: 'center' })` কল করব ও ইনপুটে ফোকাস দেব। এছাড়া React Hook Form-এর ডিফল্ট অপশন `shouldFocusError: true` নিশ্চিত করব।",
          "b": "ভুল ফিল্ড স্ক্রিনে খুঁজে পেতে shouldFocusError: true অন রাখতে হবে অথবা onError কলব্যাকে প্রথম এরর ফিল্ডের কাছে scrollIntoView দিয়ে স্মুথ স্ক্রলিং করিয়ে ফোকাস দিতে হবে।",
          "e": "Ensure `shouldFocusError: true` is configured in useForm, or capture errors inside handleSubmit's onError handler and scroll the first invalid field smoothly into the viewport center via `element.scrollIntoView({ behavior: 'smooth' })`.",
          "code": "const onError = (errors) => {\n  const firstKey = Object.keys(errors)[0];\n  const el = document.querySelector(`[name=\"${firstKey}\"]`);\n  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });\n};"
        },
        {
          "lvl": "situation",
          "q": "ব্যবহারকারী একটি ফাইলে ১০MB-র বেশি বড় ইমেজ আপলোড করলে ক্লায়েন্ট সাইডেই ইনস্ট্যান্ট Zod ভ্যালিডেশন কীভাবে আটকাবে সার্ভারে পাঠানোর আগেই?",
          "m": "আমরা Zod স্কিমায় কাস্টম ফাইল ভ্যালিডেশন লিখব: `z.instanceof(File)` দিয়ে চেক করব। এরপর `.refine(f => f.size <= 5 * 1024 * 1024, 'File size must be under 5MB')` এবং `.refine(f => ['image/jpeg', 'image/png', 'image/webp'].includes(f.type), 'Only JPEG, PNG, and WebP are allowed')` লাগাব। ফলে ইউজার ড্রপডাউন বা ফাইল পিকারে ভুল ফাইল সিলেক্ট করা মাত্রই স্ক্রিনে তাৎক্ষণিক লাল এরর মেসেজ আসবে।",
          "b": "ক্লায়েন্ট সাইডেই ফাইল আটকানোর জন্য Zod এর refine মেথডে ফাইলের সাইজ ৫ মেগাবাইট এবং টাইপ জেপিইজি বা পিএনজি কিনা তা নিশ্চিত করতে হবে। এতে ভুল ফাইল সার্ভারে যাওয়ার আগেই আটকে যায়।",
          "e": "Validate file objects client-side in Zod using `z.instanceof(File)` combined with `.refine()` rules testing `file.size` against byte thresholds and checking `file.type` against allowed MIME types.",
          "code": "const AvatarSchema = z.object({\n  file: z.instanceof(File)\n    .refine(f => f.size <= 5 * 1024 * 1024, 'Max 5MB')\n    .refine(f => ['image/png', 'image/jpeg'].includes(f.type), 'Only PNG/JPEG')\n});"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর দ্রুতগতির সেলস ইনভয়েস এন্ট্রিতে কীবোর্ড শর্টকাট (Enter চাপলে পরবর্তী ফিল্ডে অটো-ফোকাস) React Hook Form-এ কীভাবে ইমপ্লিমেন্ট করেছিলে?",
          "m": "ক্যাশ কাউন্টারে মাউস দিয়ে ক্লিকে সময় নষ্ট হয়। আমরা একটি কাস্টম কীবোর্ড নেভিগেশন হুক বানিয়েছিলাম: প্রতিটি ইনপুটে `onKeyDown` লিসেনারে ইউজার 'Enter' চাপলে ইভেন্ট প্রিভেন্ট করে পরবর্তী ইনপুটের `ref`-এ স্বয়ংক্রিয়ভাবে `.focus()` কল করে (যেমন: বারকোড -> পরিমাণ -> ডিসকাউন্ট -> পে বাটন)। আর ডিসকাউন্ট ফিল্ডে এন্টার চাপলে সরাসরি ক্যাশ পেমেন্ট ডায়ালগ পপআপ ওপেন হতো।",
          "b": "দোকানি ক্যাশ কাউন্টারে দ্রুত কাজের জন্য এন্টার চাপলে পরবর্তী ফিল্ডে ফোকাস যাওয়ার কীবোর্ড নেভিগেশন তৈরি করা হয়েছিল। এর ফলে ক্যাশিয়ার মাউস ছাড়া শুধুমাত্র কীবোর্ড দিয়ে চোখের পলকে বিল সম্পন্ন করতে পেরেছে।",
          "e": "In Dokani POS, keyboard-only cashier ergonomics were achieved by intercepting Enter key events to advance `.focus()` sequentially down the input chain (Barcode -> Quantity -> Discount -> Tender), culminating in automatic checkout modal launch.",
          "tip": "ক্যাশ কাউন্টারের জন্য মাউসলেস কীবোর্ড নেভিগেশন অত্যন্ত বাস্তব ও প্রশংসনীয় একটি ফিচার।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ কাস্টমার বাকি বা লেজার ফর্মে বাংলাদেশি মোবাইল নম্বর (+8801...) ও এনআইডি (NID) ভ্যালিডেশন Zod স্কিমায় কীভাবে কঠোরভাবে নিশ্চিত করেছিলে?",
          "m": "আমরা বাংলাদেশি রেগুলার এক্সপ্রেশন সমৃদ্ধ Zod স্কিমা লিখেছি: ফোন নম্বরের জন্য `z.string().regex(/^(?:\\+?88|0088)?01[3-9]\\d{8}$/, 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন')`। আর জাতীয় পরিচয়পত্রের জন্য ১০ ডিজিট (স্মার্ট কার্ড) অথবা ১৩/১৭ ডিজিটের লিগ্যাসি এনআইডি নম্বর চেক করার জন্য কাস্টম রিজেক্স ও লাহন অ্যালগরিদম ভ্যালিডেশন ব্যবহার করেছি।",
          "b": "বাংলাদেশি ফোন নম্বর যাচাইয়ে আমরা 013 থেকে 019 পর্যন্ত ১১ ডিজিটের সুনির্দিষ্ট রিজেক্স এবং স্মার্ট এনআইডি যাচাইয়ের জন্য ১০ বা ১৭ ডিজিটের কাস্টম Zod স্কিমা তৈরি করে নির্ভুল তথ্য সংগ্রহ নিশ্চিত করেছি।",
          "e": "Enforced strict Bangladeshi customer onboarding rules using specialized Zod regex patterns: validating 11-digit mobile numbers matching operators `01[3-9]` with optional +88 prefixes, and validating 10-digit Smart NID or 17-digit legacy national IDs.",
          "code": "export const BdPhoneSchema = z.string().regex(\n  /^(?:\\+?88|0088)?01[3-9]\\d{8}$/,\n  'সঠিক বাংলাদেশি মোবাইল নম্বর প্রদান করুন'\n);"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে শিক্ষকের কোর্স ক্রিয়েশন ফর্মে ড্র্যাগ-অ্যান্ড-ড্রপ লেকচার সাজানো এবং মডিউল নেস্টিং কীভাবে React Hook Form-এ অপটিমাইজ করেছিলে?",
          "m": "কোর্সের ভেতর চ্যাপ্টার এবং চ্যাপ্টারের ভেতর লেকচার—এটি একটি 'Nested Field Array' সমস্যা। আমরা `@hello-pangea/dnd` (বা dnd-kit) এর সাথে React Hook Form-এর নেস্টেড `useFieldArray` ইন্টিগ্রেট করেছি। ড্র্যাগ অ্যান্ড ড্রপ শেষ হলে `move(sourceIndex, destinationIndex)` কল করা হতো। পুরো ফর্মকে রি-রেন্ডার না করে শুধুমাত্র পরিবর্তিত মডিউল অংশের ইনডেক্স আপডেট করে স্মুথ ৬০ FPS ড্র্যাগিং নিশ্চিত করা হয়েছিল।",
          "b": "পিটিটিএবিডি কোর্স তৈরিতে নেস্টেড useFieldArray এবং ড্র্যাগ-অ্যান্ড-ড্রপ লাইব্রেরি সমন্বয় করে চ্যাপ্টার ও লেকচারের ক্রম পরিবর্তন পরিচালনা করা হয়েছিল। move মেথড ব্যবহারের ফলে সম্পূর্ণ ফর্ম অক্ষত রেখে দ্রুততম সময়ে ইন্ডেক্সিং সম্পন্ন হতো।",
          "e": "Handled deeply nested chapters and video lectures in PTTABD by pairing dnd-kit with nested `useFieldArray` instances. Calling `move()` reordered array items cleanly without re-rendering the outer layout shell.",
          "code": "const { fields: chapters, move: moveChapter } = useFieldArray({ control, name: 'chapters' });"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ একই ফর্মে হাজার হাজার ভ্যারিয়েন্ট বিশিষ্ট পণ্যের বাল্ক এক্সেল/CSV ইমপোর্ট ভ্যালিডেশন কীভাবে Zod দিয়ে হ্যান্ডেল করেছিলে?",
          "m": "ব্যবহারকারী যখন এক্সেলে ১০০০ প্রোডাক্টের তালিকা আপলোড করে, ব্রাউজারে `PapaParse` দিয়ে CSV-কে JSON অবজেক্টের অ্যারেতে কনভার্ট করি। এরপর `z.array(ProductSchema).safeParse(records)` দিয়ে ব্যাচ ভ্যালিডেশন চালাই। Zod-এর `error.issues` থেকে প্রতিটি রো নম্বরের সাথে ভুলের বর্ণনা (যেমন: 'Row 14: Invalid price', 'Row 89: Duplicate SKU') স্ক্রিনে একটি সুন্দর প্রিভিউ টেবিলে তুলে ধরি, যাতে ইউজার ফিক্স করে তবেই আপলোড সম্পন্ন করতে পারে।",
          "b": "বাল্ক সিএসভি আপলোডে PapaParse দিয়ে ডাটা রূপান্তর করে Zod এর z.array().safeParse চালানো হতো। কোনো ত্রুটি থাকলে রো নম্বরসহ নির্দিষ্ট ভুলের তালিকা স্ক্রিনে টেবিল আকারে তুলে ধরে ভুল তথ্য ডাটাবেজে যাওয়া প্রতিরোধ করা হয়েছিল।",
          "e": "Processed 1,000+ item Excel imports in Dokani by converting CSV rows via PapaParse into JSON, evaluating records concurrently with `z.array(ProductSchema).safeParse()`. Formatted Zod issue paths into a human-readable grid identifying exact erroneous line numbers.",
          "tip": "ইন্টারভিউতে 'Bulk CSV validation with PapaParse and Zod safeParse' বলার অভিজ্ঞতা ব্যাকএন্ড ও ফ্রন্টএন্ড উভয়ের গভীরতা তুলে ধরে।"
        },
        {
          "lvl": "realworld",
          "q": "React Hook Form এবং Zod ব্যবহারের ফলে প্রজেক্টের ফর্ম মেইনটেনিবিলিটি ও কোড রিডাকশনে কী বাস্তব ইমপ্যাক্ট পড়েছিল?",
          "m": "আমাদের কোডবেজে ফর্ম সংক্রান্ত বয়লারপ্লেট কোড প্রায় ৬০% কমে গিয়েছিল! আগে প্রতিটি ইনপুটের জন্য আলাদা `useState`, `errorState`, `handleChange` এবং ম্যানুয়াল `if/else` ভ্যালিডেশন লিখতে হতো যা প্রতি ফর্মে ৩০০+ লাইন হয়ে যেত। Zod স্কিমা ব্যবহারের পর টাইপস্ক্রিপ্ট টাইপ, ফ্রন্টএন্ড ফর্ম ভ্যালিডেশন এবং ব্যাকএন্ড API কন্ট্রোলার ভ্যালিডেশন—সবকিছু একটি মাত্র সেন্ট্রালাইজড স্কিমা থেকে পরিচালিত হয়েছে। ফলে বাগ সংখ্যা নাটকীয়ভাবে কমে প্রোডাকশন রিলিজ অনেক দ্রুত হয়েছে।",
          "b": "রিঅ্যাক্ট হুক ফর্ম এবং Zod ব্যবহারে কোডের আকার ৬০% কমেছিল। ম্যানুয়াল স্টেট ও ভ্যালিডেশন লেখার বদলে একটিমাত্র কেন্দ্রীয় স্কিমা দিয়ে ফ্রন্টএন্ড ও ব্যাকএন্ড উভয় স্থান পরিচালিত হওয়ায় বাগ হ্রাস পেয়ে উন্নয়ন গতিশীল হয়েছিল।",
          "e": "Adopting React Hook Form and Zod slashed form boilerplate by 60%. Replacing manual state hooks with single-source-of-truth Zod schemas harmonized client form validations and server-side API guards under identical contracts.",
          "tip": "বিজনেস এবং প্রোডাক্টিভিটি ইমপ্যাক্ট (যেমন ৬০% বয়লারপ্লেট হ্রাস) উল্লেখ করা সিনিয়র ইঞ্জিনিয়ারের নেতৃত্ব প্রকাশ করে।"
        }
      ]
    },
    {
      "id": "api-auth-rbac-dashboard",
      "name": "REST API Integration, RBAC & Dashboard UI",
      "desc": "REST APIs, Axios Interceptors, JWT Token Handling, Refresh Tokens, RBAC Guards, Dashboard Component Architecture, Micro-frontends",
      "items": [
        {
          "lvl": "lvl1",
          "q": "REST API কী এবং প্রধান HTTP মেথডগুলোর (GET, POST, PUT, PATCH, DELETE) সুনির্দিষ্ট ব্যবহার কী?",
          "m": "REST (Representational State Transfer) হলো একটি আর্কিটেকচারাল স্টাইল যা ক্লায়েন্ট ও সার্ভারের মধ্যে স্ট্যান্ডার্ড HTTP প্রোটোকলে ডেটা আদান-প্রদান করে। (১) `GET`: ডাটা রিড করা (Safe ও Idempotent)। (২) `POST`: নতুন রিসোর্স তৈরি করা (Non-idempotent)। (৩) `PUT`: বিদ্যমান পুরো রিসোর্সকে সম্পূর্ণ রিপ্লেস করা। (৪) `PATCH`: রিসোর্সের আংশিক বা কিছু ফিল্ড আপডেট করা। (৫) `DELETE`: রিসোর্স মুছে ফেলা।",
          "b": "রেস্ট এপিআই ক্লায়েন্ট ও সার্ভারের মধ্যে মানসম্মত প্রোটোকল। GET তথ্য পড়তে, POST নতুন ডাটা তৈরি করতে, PUT সম্পূর্ণ রেকর্ড প্রতিস্থাপন করতে, PATCH আংশিক সংশোধন করতে এবং DELETE তথ্য মুছে ফেলতে ব্যবহৃত হয়।",
          "e": "REST leverages standard HTTP verbs: GET reads resources idempotently; POST creates entities; PUT completely overwrites an existing resource; PATCH partially updates specific fields; and DELETE removes resources.",
          "tip": "PUT এবং PATCH-এর পার্থক্য ইন্টারভিউতে খুব বেশি জানতে চায় (PUT সম্পূর্ণ রিপ্লেস, PATCH আংশিক আপডেট)।"
        },
        {
          "lvl": "lvl1",
          "q": "Authentication (অথেনটিকেশন) এবং Authorization (অথোরাইজেশন)-এর মধ্যে মৌলিক পার্থক্য কী?",
          "m": "Authentication হলো 'তুমি কে?' তা প্রমাণ করা—যেমন ইউজার তার ইমেইল ও পাসওয়ার্ড বা ওটিপি দিয়ে প্রমাণ করে যে সে ওই অ্যাকাউন্টের আসল ব্যক্তি। আর Authorization হলো 'তোমার কী কী করার অধিকার আছে?' তা যাচাই করা—যেমন একজন লগইন করা ইউজার সাধারণ ক্যাশিয়ার হতে পারে, কিন্তু সে মালিকের প্রফিট রিপোর্ট ডিলিট করার অধিকার রাখে কি না, তা হলো অথোরাইজেশন বা পারমিশন।",
          "b": "অথেনটিকেশন যাচাই করে ব্যবহারকারীর আসল পরিচয় (যেমন লগইন)। অথোরাইজেশন যাচাই করে সেই ব্যবহারকারী নির্দিষ্ট ফিচার বা ডাটা দেখার ও পরিবর্তন করার অনুমতি রাখে কি না (যেমন রোল ও পারমিশন)।",
          "e": "Authentication validates identity ('Who are you?'), achieved via login credentials, JWTs, or biometric tokens. Authorization verifies privileges ('What are you permitted to do?'), restricting system resources based on roles and permissions.",
          "code": "// 401 Unauthorized = Authentication failure (Who are you?)\n// 403 Forbidden = Authorization failure (You lack permission!)"
        },
        {
          "lvl": "lvl1",
          "q": "Role-Based Access Control (RBAC) কী এবং ফ্রন্টএন্ড UI-তে এটি কীভাবে কাজ করে?",
          "m": "RBAC হলো এমন একটি সিকিউরিটি মডেল যেখানে ইউজারদের নির্দিষ্ট রোল (যেমন: `SUPER_ADMIN`, `STORE_OWNER`, `CASHIER`, `USER`) দেওয়া হয় এবং প্রতিটি রোলের সাথে কিছু পারমিশন ম্যাপিং থাকে। ফ্রন্টএন্ডে আমরা ইউজার রোলের ওপর ভিত্তি করে সাইডবার মেনু হাইড/শো করি, অ্যাকশন বাটন ডিসেবল করি এবং সুরক্ষিত রাউটে প্রবেশের আগে রাউট গার্ড বা মিডলওয়্যারে রোল চেক করি।",
          "b": "আরবিএসি হলো রোলের ওপর ভিত্তি করে এক্সেস নিয়ন্ত্রণের পদ্ধতি। ফ্রন্টএন্ডে ব্যবহারকারীর রোলের ওপর নির্ভর করে নির্দিষ্ট মেনু ও বাটন দৃশ্যমান বা লুকায়িত রাখা হয় এবং সুরক্ষিত পেজে প্রবেশের অনুমতি দেওয়া হয়।",
          "e": "Role-Based Access Control (RBAC) assigns users discrete roles paired with predefined permission sets. Frontend applications use RBAC to dynamically render sidebar items, guard private routes, and disable privileged action buttons.",
          "code": "const canEditInventory = ['SUPER_ADMIN', 'STORE_OWNER'].includes(user.role);"
        },
        {
          "lvl": "lvl1",
          "q": "Component-Based Architecture কী এবং এটি আধুনিক ওয়েব ডেভেলপমেন্টে কোড রিইউজেবিলিটি কীভাবে নিশ্চিত করে?",
          "m": "Component-Based Architecture হলো পুরো জটিল ইউজার ইন্টারফেসকে ছোট ছোট, স্বাধীন ও পুনঃব্যবহারযোগ্য ব্লকে (Components) বিভক্ত করার পদ্ধতি (যেমন: Button, Modal, Card, Table)। প্রতিটি কম্পোনেন্টের নিজস্ব কাঠামো, স্টাইল ও লজিক থাকে। এর ফলে একটি বাটন কম্পোনেন্ট পরিবর্তন করলে পুরো সাইটের সব জায়গায় আপডেট হয়ে যায়, কোড ডুপ্লিকেশন শূন্যে নামে এবং টেস্টিং অনেক সহজ হয়।",
          "b": "কম্পোনেন্ট ভিত্তিক আর্কিটেকচার হলো বড় ইন্টারফেসকে ছোট স্বাধীন ও পুনঃব্যবহারযোগ্য অংশে বিভক্ত করা। এর ফলে কোড পুনরাবৃত্তি রোধ হয়, রক্ষণাবেক্ষণ সহজ হয় এবং পুরো প্রজেক্টে ডিজাইনের সামঞ্জস্য বজায় থাকে।",
          "e": "Component-Based Architecture decomposes monolithic UIs into modular, self-contained, and reusable pieces encapsulation markup, styles, and logic. This guarantees DRY code, simplifies testing, and accelerates UI iteration.",
          "tip": "ইন্টারভিউতে 'Atomic Design Pattern' (Atoms, Molecules, Organisms) এর রেফারেন্স দিতে পারো।"
        },
        {
          "lvl": "lvl1",
          "q": "Axios এবং ব্রাউজারের নেটিভ `fetch()` এর মধ্যে মূল পার্থক্য কী?",
          "m": "Axios-এ বাই-ডিফল্ট স্বয়ংক্রিয় JSON ডেটা রূপান্তর (Transform) হয়, যেখানে fetch-এ ম্যানুয়ালি `res.json()` করতে হয়। Axios ইন্টারসেপ্টরস (Interceptors) সমর্থন করে যাতে গ্লোবাল টোকেন ইনজেকশন ও এরর হ্যান্ডলিং খুব সহজ। Axios যেকোনো 4xx বা 5xx HTTP এররে প্রমিজ রিজেক্ট করে (`catch` ব্লকে পাঠায়), কিন্তু `fetch()` কেবল নেটওয়ার্ক ডাউন হলেই রিজেক্ট করে—404 বা 500 পেলেও সফল (`ok: false`) হিসেবে প্রমিজ রিজলভ করে ম্যানুয়াল চেক করায়।",
          "b": "অ্যাক্সিওস স্বয়ংক্রিয়ভাবে JSON রূপান্তর করে এবং 4xx/5xx স্ট্যাটাস কোডে প্রমিজ রিজেক্ট করে। এছাড়া অ্যাক্সিওসে রিকোয়েস্ট ও রেসপন্স ইন্টারসেপ্টর সুবিধা রয়েছে যা গ্লোবাল টোকেন যোগ করতে সাহায্য করে।",
          "e": "Axios automatically transforms JSON, rejects promises on 4xx/5xx HTTP errors, supports request/response interceptors, and simplifies upload progress. Native fetch resolves on 4xx/5xx (requiring manual `res.ok` checks) and requires manual JSON serialization.",
          "code": "// Fetch requires: if (!res.ok) throw Error()\n// Axios handles it cleanly via catch(err => ...)"
        },
        {
          "lvl": "lvl2",
          "q": "Axios Interceptors কী এবং রিকোয়েস্ট ও রেসপন্স সাইকেলে এটি কীভাবে টোকেন ইনজেকশন ও সেন্ট্রালাইজড এরর হ্যান্ডলিং করে?",
          "m": "Axios Interceptor হলো একটি মিডলওয়্যারের মতো যা নেটওয়ার্ক রিকোয়েস্ট বের হওয়ার আগে এবং রেসপন্স আসার ঠিক পরে কোড এক্সিকিউট করতে পারে। রিকোয়েস্ট ইন্টারসেপ্টরে আমরা স্বয়ংক্রিয়ভাবে হেডারে `Authorization: Bearer <token>` ইনজেক্ট করি যাতে প্রতি এপিআই কলে ম্যানুয়ালি টোকেন লিখতে না হয়। আর রেসপন্স ইন্টারসেপ্টরে কোনো 401 Unauthorized আসলে সাইলেন্টলি রিফ্রেশ টোকেন কল করি বা লগআউট করাই এবং সেন্ট্রালাইজড টোস্ট নোটিফিকেশন দেখাই।",
          "b": "অ্যাক্সিওস ইন্টারসেপ্টর রিকোয়েস্ট যাওয়ার আগে স্বয়ংক্রিয়ভাবে অথেনটিকেশন টোকেন যোগ করে এবং রেসপন্স আসার পর সেন্ট্রালাইজড পদ্ধতিতে এরর বা টোকেন মেয়াদোত্তীর্ণ হওয়ার ঘটনা সমাধান করে।",
          "e": "Axios interceptors intercept HTTP calls globally. Request interceptors attach `Authorization: Bearer ${token}` headers dynamically. Response interceptors handle global error logging, unauthorized 401 handling, and automatic token refresh workflows.",
          "code": "axiosInstance.interceptors.request.use((config) => {\n  const token = getToken();\n  if (token) config.headers.Authorization = `Bearer ${token}`;\n  return config;\n});"
        },
        {
          "lvl": "lvl2",
          "q": "সাইলেন্ট রিফ্রেশ টোকেন রোটেশন (Silent Refresh Token Rotation) কীভাবে কাজ করে যখন অ্যাক্সেস টোকেনের মেয়াদ শেষ হয়ে যায়?",
          "m": "অ্যাক্সেস টোকেনের আয়ু কম থাকে (যেমন ১৫ মিনিট) এবং রিফ্রেশ টোকেনের আয়ু বেশি থাকে (যেমন ৭ দিন)। যখন কোনো এপিআই কল 401 Unauthorized এরর পায়, ফ্রন্টএন্ড রেসপন্স ইন্টারসেপ্টর ফেইলিং রিকোয়েস্টটি পজ করে ব্যাকগ্রাউন্ডে `/api/auth/refresh` এন্ডপয়েন্টে রিফ্রেশ টোকেন পাঠিয়ে নতুন অ্যাক্সেস টোকেন আনে। নতুন টোকেন পাওয়ার পর পজ থাকা পূর্বের অরিজিনাল রিকোয়েস্টটি আবার স্বয়ংক্রিয়ভাবে রি-ট্রাই করে—ইউজার কোনো ইন্টারাপশন ছাড়াই কাজ চালিয়ে যায়।",
          "b": "অ্যাক্সেস টোকেনের মেয়াদ শেষ হলে 401 এরর পাওয়ার সাথে সাথে ব্যাকগ্রাউন্ডে রিফ্রেশ টোকেন পাঠিয়ে নতুন টোকেন সংগ্রহ করা হয়। এরপর মুলতবি থাকা রিকোয়েস্টটি পুনরায় চালিয়ে ব্যবহারকারীকে নিরবচ্ছিন্ন সেবা দেওয়া হয়।",
          "e": "When an API request returns a 401 status, the response interceptor enqueues pending calls and triggers a silent POST to the refresh token endpoint. Upon receiving a fresh access token, it updates local state and replays the original requests transparently.",
          "tip": "রিফ্রেশ টোকেন রোটেশনের আর্কিটেকচার ইন্টারভিউতে ফুল-স্ট্যাক ও ফ্রন্টএন্ড উভয়ের জন্য টপ প্রায়োরিটি প্রশ্ন।"
        },
        {
          "lvl": "lvl2",
          "q": "Protected Route Guards কীভাবে Next.js App Router এবং React Router-এ ইমপ্লিমেন্ট করা হয়?",
          "m": "Next.js App Router-এ আমরা `middleware.ts`-এ রুট গার্ড বসাই যা এজ রানটাইমে রান হয়। ইউজার কুকিতে ভ্যালিড সেশন টোকেন না থাকলে পেজ রেন্ডার হওয়ার আগেই `/login?redirect=/dashboard` এ রিডাইরেক্ট করে দেয়। আর সাধারণ ক্লায়েন্ট-সাইড রিঅ্যাক্টে আমরা একটি `<ProtectedRoute>` র্যাপার কম্পোনেন্ট বানাই যা অথেনটিকেশন স্টেট চেক করে; লগইন না থাকলে `<Navigate to='/login' replace />` রিটার্ন করে।",
          "b": "প্রোটেক্টেড রাউট সুরক্ষায় নেক্সট জেএস মিডলওয়্যারে কুকি যাচাই করে লগইন ছাড়া ব্যবহারকারীকে লগইন পেজে পাঠিয়ে দেয়। ক্লায়েন্ট অ্যাপে একটি উচ্চতর কম্পোনেন্ট দিয়ে অথ স্টেট পরীক্ষা করে প্রবেশাধিকার দেওয়া হয়।",
          "e": "In Next.js App Router, Protected Routes are guarded globally at the edge via middleware.ts, redirecting unauthorized traffic before hitting page renderers. Client-side React implements `<ProtectedRoute>` wrappers inspecting auth state context.",
          "code": "export function ProtectedRoute({ children }: { children: ReactNode }) {\n  const { user, loading } = useAuth();\n  if (loading) return <Spinner />;\n  return user ? <>{children}</> : <Navigate to='/login' replace />;\n}"
        },
        {
          "lvl": "lvl2",
          "q": "Cross-Site Scripting (XSS) এবং Cross-Site Request Forgery (CSRF) থেকে টোকেন সুরক্ষিত রাখার সেরা আর্কিটেকচার কী?",
          "m": "যদি JWT টোকেন `localStorage`-এ রাখা হয়, তবে সাইটে কোনো দূষিত জাভাস্ক্রিপ্ট ইনজেক্ট হলে (XSS) হ্যাকার সহজেই `localStorage.getItem('token')` দিয়ে টোকেন চুরি করে নিতে পারে। সেরা সমাধান হলো: (১) রিফ্রেশ টোকেনকে `HttpOnly, Secure, SameSite=Strict` কুকিতে রাখা যা জাভাস্ক্রিপ্ট পড়তে পারে না (XSS প্রতিরোধ)। (২) অ্যাক্সেস টোকেনকে কেবল ব্রাউজার মেমোরিতে (ইন-মেমোরি ভ্যারিয়েবল) রাখা। (৩) কুকি ভিত্তিক রিকোয়েস্টে CSRF প্রটেকশনের জন্য কাস্টম CSRF হেডার বা SameSite কুকি ফ্ল্যাগ এনফোর্স করা।",
          "b": "এক্সএসএস আক্রমণ ঠেকাতে টোকেন কখনোই লোকালস্টোরেজে রাখা উচিত নয়। রিফ্রেশ টোকেন HttpOnly Secure কুকিতে রাখতে হবে যা জাভাস্ক্রিপ্ট পড়তে পারে না, এবং অ্যাক্সেস টোকেন ব্রাউজার মেমরিতে সাময়িকভাবে সংরক্ষণ করতে হবে।",
          "e": "Mitigate XSS by never storing auth tokens in localStorage where malicious scripts can exfiltrate them. Store long-lived refresh tokens in HttpOnly, Secure, SameSite cookies inaccessible to JavaScript, maintaining short-lived access tokens solely in client memory.",
          "tip": "কখনোই localStorage-এ টোকেন রাখার পক্ষে যুক্তি দেবে না; HttpOnly কুকির গুরুত্ব স্পষ্টভাবে বলবে।"
        },
        {
          "lvl": "lvl2",
          "q": "ড্যাশবোর্ড UI ডিজাইনে 'Compound Components Pattern' কীভাবে কোডকে ফ্লেক্সিবল ও পরিষ্কার রাখে?",
          "m": "Compound Components হলো এমন একটি প্যাটার্ন যেখানে একাধিক কম্পোনেন্ট একসাথে একটি সুসংগত স্টেট শেয়ার করে কাজ করে (যেমন HTML `<select>` এবং `<option>` এর মতো)। যেমন: `<Card><Card.Header /><Card.Body /><Card.Footer /></Card>`। এটি কম্পোনেন্টের অভ্যন্তরীণ স্টেটকে চাইল্ডদের মধ্যে শেয়ার করার জন্য React Context ব্যবহার করে। এর ফলে ইউজার যে কোনো ক্রমে চাইল্ডগুলো সাজাতে পারে কোনো প্রপ ড্রিলিং ছাড়াই।",
          "b": "কম্পাউন্ড কম্পোনেন্ট প্যাটার্নে একাধিক কম্পোনেন্ট মিলে একটি একক কাজ সম্পন্ন করে এবং অভ্যন্তরীণ কনটেক্সট শেয়ার করে। এর ফলে প্যারেন্ট ও চাইল্ড কম্পোনেন্টের ভেতরে প্রপস পাস না করেই অত্যন্ত নমনীয় লেআউট তৈরি করা যায়।",
          "e": "The Compound Components pattern shares state implicitly among a set of related components via Context (exemplified by native `<select>` and `<option>`). It decouples UI structure from rendering logic, affording maximum layout flexibility.",
          "code": "const Card = ({ children }) => <div className='card'>{children}</div>;\nCard.Header = ({ children }) => <div className='card-hdr'>{children}</div>;\nCard.Body = ({ children }) => <div className='card-bdy'>{children}</div>;"
        },
        {
          "lvl": "lvl3",
          "q": "Axios Interceptor-এ একাধিক সমসাময়িক (Concurrent) 401 রিকোয়েস্ট আসার সময় রিফ্রেশ টোকেন কল মাত্র একবার কীভাবে হ্যান্ডেল করবে (Request Queueing)?",
          "m": "যখন একই সাথে ৫টি এপিআই কল 401 পায়, যদি ৫টিই আলাদা আলাদা রিফ্রেশ টোকেন রিকোয়েস্ট পাঠায় তবে সার্ভারে টোকেন ইনভ্যালিড হয়ে লকআউট হবে। সমাধান: আমরা একটি বুলিয়ান ফ্ল্যাগ `isRefreshing` এবং একটি প্রমিজ কলব্যাক কিউ (`failedQueue = []`) রাখব। প্রথম 401 কলটি রিফ্রেশ টোকেন ফেচ শুরু করবে এবং বাকি ৪টি কলকে কিউতে পুশ করে হোল্ড রাখবে। রিফ্রেশ সফল হওয়া মাত্র কিউয়ের সব প্রমিজকে নতুন টোকেন দিয়ে রিজলভ করে একযোগে রিকানেক্ট করে দেওয়া হবে।",
          "b": "একসাথে একাধিক 401 এরর আসলে যাতে বারবার রিফ্রেশ টোকেন কল না যায়, সেজন্য একটি কিউ ও isRefreshing ফ্ল্যাগ রাখতে হয়। প্রথম কলটি টোকেন রিফ্রেশ শেষ করার পর বাকি সব পেন্ডিং কলকে নতুন টোকেন দিয়ে একসাথে রি-ট্রাই করানো হয়।",
          "e": "Concurrent 401s risk multiple refresh calls causing token invalidation. Resolve this by employing an `isRefreshing` semaphore and a subscriber promise queue. The first failing call requests the refresh while subsequent calls subscribe to the queue, replaying concurrently once resolved.",
          "code": "let isRefreshing = false;\nlet failedQueue: Array<{ resolve: Function, reject: Function }> = [];\n// Queue failed requests until token resolves"
        },
        {
          "lvl": "lvl3",
          "q": "Fine-Grained Attribute-Based Access Control (ABAC) কীভাবে রিঅ্যাক্ট ফ্রন্টএন্ডে ইমপ্লিমেন্ট করা যায়?",
          "m": "RBAC শুধুমাত্র ইউজারের রোলের ওপর নির্ভর করে, কিন্তু ABAC কনটেক্সচুয়াল অ্যাট্রিবিউট চেক করে (যেমন: 'ইউজার ম্যানেজার হলেও সে শুধুমাত্র তার নিজস্ব ব্রাঞ্চের ডাটা এডিট করতে পারবে এবং শুধু অফিস আওয়ারে')। আমরা CASL লাইব্রেরি (`@casl/react`) অথবা একটি কাস্টম পলিসি ইঞ্জিন ব্যবহার করি: `ability.can('update', subject('Store', { ownerId: store.ownerId }))`। এটি ফ্রন্টএন্ডে সূক্ষ্মতম ডাইনামিক ডেটা-ওনারশিপ পারমিশন কার্যকর করে।",
          "b": "এবিএসি কেবল রোলের ওপর নয়, বরং ডাটার মালিকানা এবং পরিবেশের নিয়মের ওপর ভিত্তি করে এক্সেস দেয়। CASL লাইব্রেরির মাধ্যমে ফ্রন্টএন্ডে ইউজার শুধুমাত্র নিজের ব্রাঞ্চ বা রেকর্ডের ওপর অ্যাকশন চালাতে পারে কিনা তা নিশ্চিত করা যায়।",
          "e": "Attribute-Based Access Control (ABAC) evaluates contextual rules beyond static roles, such as record ownership and dynamic timestamps. Using libraries like CASL, the UI evaluates permissions dynamically (`ability.can('edit', subject)`).",
          "code": "import { Can } from '@casl/react';\n<Can I='delete' this={currentInvoice}>\n  <button className='btn-danger'>Delete Invoice</button>\n</Can>"
        },
        {
          "lvl": "lvl3",
          "q": "ড্যাশবোর্ড অ্যাপ্লিকেশনে 'Micro-Frontends' আর্কিটেকচার Webpack 5 Module Federation দিয়ে কীভাবে ডিজাইন করা যায়?",
          "m": "বড় সংস্থায় ড্যাশবোর্ডের ইনভেন্টরি, সেলস এবং এইচআর আলাদা টিম আলাদা রিপোজিটরিতে তৈরি করে। Webpack 5 Module Federation ব্যবহার করে প্রতিটি মাইক্রো-অ্যাপকে একটি রিমোট এন্ট্রি (`remoteEntry.js`) হিসেবে বিল্ড ও ডেপ্লয় করা হয়। মূল হোস্ট শেল অ্যাপ রানটাইমে কোনো আইফ্রেম ছাড়াই ওই রিমোট কম্পোনেন্টগুলোকে ডায়নামিকালি লোড করে এবং রিঅ্যাক্ট ও টেলউইন্ডের কমন ডিপেনডেন্সিগুলো শেয়ার করে মেমোরি বাঁচায়।",
          "b": "মডিউল ফেডারেশন বিভিন্ন প্রজেক্টের কম্পোনেন্টগুলোকে রানটাইমে সরাসরি একে অপরের সাথে যুক্ত করার সুযোগ দেয়। ফলে একাধিক টিম স্বাধীনভাবে ডিপ্লয় করতে পারে এবং মূল ড্যাশবোর্ড কোনো রিলোড ছাড়াই রিমোট কম্পোনেন্টগুলো মসৃণভাবে রেন্ডার করে।",
          "e": "Webpack 5 Module Federation enables independent codebases to expose and consume modules at runtime across isolated deployments. Host applications dynamically mount remote components without iframes while sharing core dependencies like React and Tailwind.",
          "tip": "Module Federation এবং Micro-frontends আর্কিটেকচার এন্টারপ্রাইজ সিস্টেম ডিজাইনে লিড পদের জন্য অত্যন্ত আকর্ষণীয়।"
        },
        {
          "lvl": "lvl3",
          "q": "Frontend API Caching ও SWR (Stale-While-Revalidate) আরএফসি প্রোটোকল কীভাবে কাজ করে?",
          "m": "HTTP RFC 5861 স্ট্যান্ডার্ড অনুযায়ী SWR স্ট্র্যাটেজি প্রথমে ব্রাউজার ক্যাশে থাকা পুরানো (Stale) ডেটা ইউজারকে তাৎক্ষণিক চোখের পলকে স্ক্রিনে দেখায় (জিরো লোডিং টাইম)। এরপর ব্যাকগ্রাউন্ডে নিরবে সার্ভারে এপিআই কল চালিয়ে ফ্রেশ ডেটা ফেচ করে (Revalidate)। ডাটা আসার পর ক্যাশ আপডেট করে স্ক্রিনের দৃশ্যমান পরিবর্তন স্মুথলি রিফ্লেক্ট করে। এর ফলে ইউজারকে কখনোই ফাঁকা লোডার বা স্পিনার দেখে অপেক্ষা করতে হয় না।",
          "b": "SWR কৌশল প্রথমে ক্যাশে থাকা আগের ডাটা তৎক্ষণাৎ ব্যবহারকারীকে প্রদর্শন করে। একই সাথে ব্যাকগ্রাউন্ডে নতুন ডাটা ফেচ করে ক্যাশ ও স্ক্রিন আপডেট করে, ফলে ব্যবহারকারীকে কোনো লোডিং স্পিনার দেখতে হয় না।",
          "e": "The Stale-While-Revalidate (RFC 5861) protocol delivers instantaneous UI feedback by immediately rendering cached stale data while dispatching an asynchronous revalidation fetch to reconcile the cache with upstream changes.",
          "code": "import useSWR from 'swr';\nconst { data, error, isLoading } = useSWR('/api/analytics', fetcher);"
        },
        {
          "lvl": "lvl3",
          "q": "Dashboard Data Visualization-এ হাজার হাজার লাইভ চার্ট ডেটা পয়েন্ট রেন্ডার করার সময় Canvas বনাম SVG-এর আর্কিটেকচারাল সিদ্ধান্ত কী হবে?",
          "m": "SVG প্রতিটি ডেটা পয়েন্টের জন্য আলাদা আলাদা DOM নোড তৈরি করে। ১০০০-এর বেশি ডেটা পয়েন্ট থাকলে ব্রাউজার ডম ট্রি ভারী হয়ে ল্যাগ করে এবং ফ্রেম ড্রপ হয়। কিন্তু HTML Canvas হলো পিক্সেল-বেসড বিটম্যাপ—তাতে ১০ লক্ষ ডেটা পয়েন্ট থাকলেও DOM-এ মাত্র একটি `<canvas>` নোড থাকে। তাই জটিল অ্যানিমেশন ও লাইভ হাই-ফ্রিকোয়েন্সি স্টক বা আইওটি চার্টের জন্য Canvas (যেমন Chart.js বা ECharts) বেছে নেব; আর সিম্পল ইন্টারেক্টিভ ও অ্যাক্সেসিবল চার্টের জন্য SVG (যেমন Recharts) ব্যবহার করব।",
          "b": "এসভিজি প্রতি ডেটা পয়েন্টে ডম নোড তৈরি করে যা হাজার হাজার রেকর্ডে ব্রাউজার স্লো করে দেয়। ক্যানভাস মাত্র একটি একক নোডে পিক্সেল ড্র করে, ফলে লক্ষাধিক লাইভ ডেটা থাকলেও কোনো ফ্রেম ড্রপ ছাড়াই মসৃণ পারফরম্যান্স নিশ্চিত হয়।",
          "e": "SVG generates distinct DOM nodes per data point, inducing performance bottlenecks beyond 1,000 entities. Canvas draws directly to a pixel bitmap under a single DOM node, handling millions of live telemetry coordinates with ease. Use Canvas for dense live feeds and SVG for declarative UI widgets.",
          "tip": "চার্ট সিলেকশনে 'DOM Node overhead in SVG vs Bitmap rendering in Canvas' ব্যাখ্যা করা নিখুঁত সিনিয়র ডিসিশন।"
        },
        {
          "lvl": "situation",
          "q": "ইউজার ড্যাশবোর্ডে কাজ করতে করতে ব্রাউজার ট্যাব ২০ মিনিট খোলা রেখে অন্য ট্যাবে চলে গেল। ফিরে এসে কোনো অ্যাকশন নেওয়ার সময় তার সেশন এক্সপায়ার হয়ে সব ড্রাফট হারিয়ে যাওয়ার ঝুঁকিতে পড়ল। কীভাবে ফিক্স করবে?",
          "m": "সমাধান: (১) আমরা ব্রাউজারের `Page Visibility API` এবং একটি সেশন অ্যাক্টিভিটি টাইমার ব্যবহার করব। (২) ট্যাব ফিরে আসলে যদি টোকেনের মেয়াদ উত্তীর্ণের কাছাকাছি থাকে, তবে ব্যাকগ্রাউন্ডে সাইলেন্টলি রিফ্রেশ টোকেন কল করে নতুন সেশন রিনিউ করব। (৩) যদি রিফ্রেশ টোকেনও মেয়াদোত্তীর্ণ হয়ে যায়, তবে ইউজারকে লগআউট করার আগে একটি 'Session Expired' মডাল দেখাব যাতে সে পাসওয়ার্ড দিয়ে সেশন রিনিউ করতে পারে এবং তার স্ক্রিনের ফর্মের ড্রাফট ডেটা সম্পূর্ণ অক্ষত থাকে।",
          "b": "ট্যাব ফিরে পাওয়ার পর সেশন শেষ হওয়ার আগেই সাইলেন্ট টোকেন রিফ্রেশ চালাতে হবে। যদি লগইন আবশ্যক হয়, তবে ড্রাফট ডাটা না মুছে স্ক্রিনের ওপরেই সেশন এক্সপায়ার্ড মডাল পপআপ করে পাসওয়ার্ড দিয়ে সেশন চালু রাখতে দিতে হবে।",
          "e": "Listen to the `visibilitychange` event to inspect session validity upon tab refocus, preemptively triggering a silent token refresh. If the refresh window elapsed, launch an in-place re-authentication modal preserving existing form state.",
          "code": "if (isTokenExpiringSoon()) await silentRefresh();"
        },
        {
          "lvl": "situation",
          "q": "একটি এপিআই এন্ডপয়েন্ট মাঝে মাঝে 500 Internal Server Error অথবা 504 Gateway Timeout দিচ্ছে এবং ব্যবহারকারী ব্রোকেন UI দেখে বিভ্রান্ত হচ্ছে। ক্লায়েন্ট এপিআই লেয়ারে কীভাবে রেজিলিয়েন্স আনবে?",
          "m": "সমাধান: (১) Axios বা TanStack Query-তে অটোমেটিক ৩ বার এক্সপোনেনশিয়াল ব্যাকঅফ রিট্রাই সেট করব। (২) গ্লোবাল এরর বাউন্ডারি এবং টোস্ট নোটিফিকেশনে স্পষ্ট ভাষায় ইউজার ফ্রেন্ডলি মেসেজ দেখাব ('সার্ভারে কাজ চলছে, কিছুক্ষণ পর আবার চেষ্টা করুন')। (৩) সার্কিট ব্রেকার প্যাটার্ন অনুযায়ী সার্ভার ডাউন থাকলে বারবার রিকোয়েস্ট পাঠানো সাময়িকভাবে পজ রাখব যাতে ক্লাউড সার্ভার ট্রাফিকের চাপে আরও বেশি ক্র্যাশ না করে।",
          "b": "এপিআই রেজিলিয়েন্স বাড়াতে ৩ বার অটো-রিট্রাই কনফিগার করতে হবে। ব্যর্থ হলে ব্যবহারকারীকে স্পষ্ট নির্দেশনামূলক বার্তা দিয়ে একটি 'পুনরায় চেষ্টা করুন' বাটন দিতে হবে যাতে ইউজার অভিজ্ঞতা বজায় থাকে।",
          "e": "Configure automatic exponential retries for 5xx errors via TanStack Query. Display user-friendly fallback boundaries featuring actionable retry buttons while employing circuit breakers to halt repeated failing network spam.",
          "code": "const { data, refetch } = useQuery({\n  queryKey: ['sales'],\n  queryFn: fetchSales,\n  retry: 3,\n  retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000)\n});"
        },
        {
          "lvl": "situation",
          "q": "একজন ব্যবহারকারী ব্রাউজারের ডেভটুলস দিয়ে লোকাল স্টোরেজে তার রোল `'CASHIER'` থেকে বদলে ম্যানুয়ালি `'SUPER_ADMIN'` করে ফেলল। কীভাবে ফ্রন্টএন্ড এবং ব্যাকএন্ড এই হ্যাক প্রতিরোধ করবে?",
          "m": "প্রথম নিয়ম: ফ্রন্টএন্ড সিকিউরিটি শুধুমাত্র ইউজার ইন্টারফেস প্রদর্শনের জন্য; আসল সিকিউরিটি সবসময় ব্যাকএন্ডে থাকে। ফ্রন্টএন্ডে রোল পরিবর্তন করলেও যখনই সে কোনো অ্যাডমিন এপিআই কল করবে, সার্ভার ইনকামিং JWT টোকেনের ক্রিপ্টোগ্রাফিক ডিজিটাল সিগনেচার (Secret Key) ভ্যালিডেট করবে। টোকেনের ভেতরের রোল পরিবর্তন করার ক্ষমতা ব্রাউজারের নেই। সার্ভার সাথে সাথে সিগনেচার মিসম্যাচ দেখে `403 Forbidden` রিটার্ন করবে এবং অ্যাকাউন্ট সাসপেন্ড করবে।",
          "b": "লোকাল স্টোরেজ পরিবর্তন করলেও ব্যাকএন্ড প্রতিটি এপিআই রিকোয়েস্টে ক্রিপ্টোগ্রাফিক ডিজিটাল সিগনেচার যাচাই করে। সার্ভারের সিক্রেট কি ছাড়া টোকেন এডিট করা অসম্ভব হওয়ায় কোনো হ্যাক কার্যকর হবে না এবং সার্ভার তৎক্ষণাৎ 403 এরর দিয়ে রিকোয়েস্ট আটকে দেবে।",
          "e": "Client-side manipulation cannot forge cryptographic JWT signatures signed by the backend secret. When manipulated roles attempt administrative API calls, the backend rejects the invalid token signature with a 403 Forbidden, rendering client-side spoofing harmless.",
          "tip": "ইন্টারভিউতে বলবে: 'Never trust client-side state. The frontend controls visibility, but the backend strictly guarantees security'."
        },
        {
          "lvl": "situation",
          "q": "ড্যাশবোর্ডের বিভিন্ন পেজ নেভিগেট করার সময় পূর্বের পেজের চলমান ভারী এপিআই রিকোয়েস্টগুলো ব্যাকগ্রাউন্ডে চলতে থেকে ব্যান্ডউইথ নষ্ট করছে। সমাধান কী?",
          "m": "আমরা `AbortController` ব্যবহার করব। প্রতিটি পেজ বা কম্পোনেন্ট আনমাউন্ট হওয়ার সময় তার অ্যাসিনক্রোনাস রিকোয়েস্টগুলোর সিগন্যালে `controller.abort()` ফায়ার করব। TanStack Query ব্যবহার করলে এটি স্বয়ংক্রিয়ভাবে কম্পোনেন্ট আনমাউন্টে চলমান নেটওয়ার্ক ফেচিং বাতিল করে দেয়, ফলে ব্যান্ডউইথ সাশ্রয় হয়।",
          "b": "পেজ পরিবর্তনের সময় পূর্বের এপিআই কল বাতিল করতে AbortController এর সিগন্যাল ব্যবহার করতে হবে যাতে কম্পোনেন্ট আনমাউন্ট হওয়ার সাথে সাথে ব্রাউজার অপ্রয়োজনীয় নেটওয়ার্ক রিকোয়েস্ট ড্রপ করে দেয়।",
          "e": "Attach an AbortController signal to ongoing fetch calls and trigger `controller.abort()` in the unmount cleanup cycle. TanStack Query automatically aborts unmounted in-flight requests natively.",
          "code": "const controller = new AbortController();\naxios.get('/api/heavy-report', { signal: controller.signal });\n// On unmount: controller.abort();"
        },
        {
          "lvl": "situation",
          "q": "বিভিন্ন ক্লায়েন্টের ড্যাশবোর্ডে তাদের নিজস্ব ব্র্যান্ডিং (লোগো, থিম কালার, কাস্টম উইজেট) রানটাইমে ডায়নামিকালি লোড করতে হবে। কীভাবে ফ্রন্টএন্ড আর্কিটেকচার ডিজাইন করবে?",
          "m": "আমরা 'Dynamic Theme Injection & Component Factory' প্যাটার্ন ব্যবহার করব। ব্যবহারকারী লগইন করার পর টেন্যান্ট প্রোফাইল থেকে ব্র্যান্ড কালার কোড ও উইজেট কনফিগ ফেচ করে রুট এলিমেন্টের CSS ভ্যারিয়েবলে ইনজেক্ট করব (`document.documentElement.style.setProperty('--brand-color', config.primaryColor)`। আর উইজেটগুলোর জন্য একটি ডায়নামিক কম্পোনেন্ট রেজিস্ট্রি রাখব যা কনফিগ অ্যারের ওপর ভিত্তি করে নির্দিষ্ট উইজেট রেন্ডার করবে।",
          "b": "ডায়নামিক ব্র্যান্ডিংয়ের জন্য সিএসএস কাস্টম প্রপার্টি (CSS Variables) রানটাইমে ইনজেক্ট করা হয়। কম্পোনেন্ট ফ্যাক্টরির মাধ্যমে কনফিগারেশন অনুযায়ী সঠিক উইজেটগুলো ড্যাশবোর্ডে মাউন্ট করা হয়।",
          "e": "Inject tenant branding at runtime by assigning CSS custom properties (`--brand-primary`) to the document root based on the authenticated tenant's configuration payload, pairing with a dynamic component registry to render tenant-selected widgets.",
          "code": "document.documentElement.style.setProperty('--brand-color', tenant.primaryColor);"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর মাল্টি-স্টোর SaaS-এ ক্যাশিয়ার, ম্যানেজার এবং সুপার অ্যাডমিনের জন্য ড্যাশবোর্ড মেনু ও পারমিশন সিস্টেম কীভাবে আর্কিটেক্ট করেছিলে?",
          "m": "আমরা একটি সেন্ট্রালাইজড `NavigationSchema` তৈরি করেছি যেখানে প্রতিটি রুটের জন্য প্রয়োজনীয় পারমিশন তালিকাভুক্ত ছিল: যেমন `{ path: '/reports', permission: 'reports:view' }`। সাইডবার রেন্ডার করার সময় ইউজারের JWT টোকেন থেকে ডিকোড করা পারমিশন সেটের সাথে ফিল্টার করে কেবল অনুমোদিত মেনুগুলোই দেখানো হতো। ক্যাশিয়ার যখন ঢুকত, সে শুধু POS বিলিং এবং সেলস হিস্ট্রি দেখতে পেত; ইনভেন্টরি এডিট বা প্রফিট রিপোর্ট তার ইন্টারফেসে সম্পূর্ণ অদৃশ্য থাকত।",
          "b": "দোকানি সিস্টেমে আমরা নেভিগেশন স্কিমা ও পারমিশন সেটের সমন্বয়ে মেনু ফিল্টারিং নিশ্চিত করেছি। ক্যাশিয়ার কেবল বিক্রয় ও বিলিং মেনু পেত, অন্যদিকে মুনাফা ও ইনভেন্টরির মতো সংবেদনশীল মেনুগুলো শুধুমাত্র মালিক ও ম্যানেজারের জন্য দৃশ্যমান হতো।",
          "e": "In Dokani POS SaaS, navigation trees were filtered against the user's decoded permission array at the layout boundary. Cashiers received only billing routes while financial reports and purchase ledgers were culled entirely from the DOM.",
          "tip": "ক্যাশিয়ারের স্ক্রিনে আনঅথোরাইজড অপশন লুকানো এবং ব্যাকএন্ডে গার্ড রাখা রিয়েল-লাইফ পজ আর্কিটেকচারের ক্লাসিক উদাহরণ।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এ শত শত সেলস ইনভয়েস ডেটা টেবিল রেন্ডার করার সময় কলাম সর্টিং, পেজিনেশন এবং গ্লোবাল সার্চ কীভাবে এপিআই-এর সাথে অপটিমাইজ করেছিলে?",
          "m": "আমরা TanStack Table v8 এর সাথে TanStack Query ইন্টিগ্রেট করেছি। লোকাল সাইড ফিল্টারিং না করে আমরা সার্ভার-সাইড পেজিনেশন ও সর্টিং করেছি (`/api/invoices?page=1&limit=25&sort=createdAt&order=desc&q=term`)। সার্চ ইনপুটে ৩০০ মিলিসেকেন্ড ডিবউন্সিং রেখেছি। আর প্রি-ফেচিং আর্কিটেকচার দিয়ে ইউজার যখন পেজ ১-এ থাকে, আমরা ব্যাকগ্রাউন্ডে পেজ ২-এর ডেটা প্রি-ফেচ করে রেখেছি—ফলে পরবর্তী পেজে ক্লিক করা মাত্র জিরো ল্যাগে চোখের পলকে টেবিল রেন্ডার হয়েছে।",
          "b": "দোকানি ইনভয়েস টেবিলে সার্ভার-সাইড পেজিনেশন ও ডিবউন্সড সার্চ ব্যবহার করা হয়েছিল। ট্যানস্ট্যাক টেবিল ও কোয়েরির সমন্বয়ে পরবর্তী পেজের ডেটা প্রি-ফেচ করে রাখায় পেজ পরিবর্তনে কোনো লোডিং সময় লাগত না।",
          "e": "Paired TanStack Table v8 with TanStack Query for server-side pagination and debounced searching. Implemented query prefetching for adjacent pages (`page + 1`), giving cashiers instantaneous, zero-latency pagination transitions.",
          "code": "queryClient.prefetchQuery(['invoices', page + 1], () => fetchInvoices(page + 1));"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে লাইভ ক্লাস চলাকালীন শিক্ষক ও ছাত্রের রোল পারমিশন এবং ভিডিও স্ট্রিমিং অ্যাক্সেস কন্ট্রোল ফ্রন্টএন্ডে কীভাবে সুরক্ষিত রাখা হয়েছিল?",
          "m": "আমরা WebRTC এবং Socket.io-তে রোল-বেসড চ্যানেল আর্কিটেকচার ব্যবহার করেছি। শিক্ষক লগইন করলে তাকে হোস্ট অথেনটিকেশন কি দেওয়া হতো যা দিয়ে সে স্ক্রিন শেয়ার, মিউট অল এবং রেকর্ড অপশন পেত। ছাত্ররা শুধু লিসেনার রোলে জয়েন করতে পারত। ক্লাসের সময় শেষ হলে সার্ভার থেকে ব্রডকাস্ট মেসেজ আসার সাথে সাথে ফ্রন্টএন্ড প্লেয়ার সুরক্ষিতভাবে আনমাউন্ট হয়ে ফিডব্যাক ফর্মে রিডাইরেক্ট হতো।",
          "b": "পিটিটিএবিডি লাইভ ক্লাসে শিক্ষককে হোস্ট কি দিয়ে সম্পূর্ণ নিয়ন্ত্রণ দেওয়া হতো এবং ছাত্ররা অডিয়েন্স পারমিশনে ক্লাসে অংশগ্রহণ করত। সেশন শেষ হওয়ামাত্র স্বয়ংক্রিয়ভাবে ভিডিও প্লেয়ার বন্ধ হয়ে স্টুডেন্ট ফিডব্যাক পেজে চলে যেত।",
          "e": "Enforced WebRTC / Socket.io channel authorization in PTTABD: instructors were granted host tokens enabling screen sharing and participant muting, whereas students were restricted to subscriber sinks with automated session termination.",
          "tip": "এড-টেক অ্যাপ্লিকেশনে হোস্ট বনাম পার্টিসিপেন্ট রোল সেগ্রিগেশন চমৎকার প্রোডাকশন অভিজ্ঞতা তুলে ধরে।"
        },
        {
          "lvl": "realworld",
          "q": "ড্যাশবোর্ডের বিভিন্ন উইজেট থেকে এপিআই কল করার সময় গ্লোবাল লোডিং স্পিনার পুরো স্ক্রিন ফ্রিজ না করে কীভাবে মাইক্রো-লোডিং স্টেট ম্যানেজ করেছিলে?",
          "m": "আমরা একটি ফুল-স্ক্রিন ব্লকিং স্পিনারের বদলে 'Skeleton Shimmer + Localized Loading Spinners' আর্কিটেকচার ব্যবহার করেছি। ড্যাশবোর্ডের প্রতিটি কার্ড বা উইজেট ছিল সম্পূর্ণ স্বাধীন এবং তার নিজস্ব ডেটা ফেচিং স্টেট নিয়ন্ত্রণ করত। এর ফলে সেলস চার্ট লোড হতে দেরি হলেও ইনভেন্টরি উইজেট বা নোটিফিকেশন বার তৎক্ষণাৎ দৃশ্যমান ছিল—ইউজারের ব্রাউজিং কখনোই ব্লক হয়নি।",
          "b": "পুরো স্ক্রিন ফ্রিজ না করে প্রতিটি উইজেটে আলাদা স্কেলেটন লোডার ব্যবহার করা হয়েছিল। একটি উইজেটের ডাটা স্লো থাকলেও অন্য উইজেটগুলো স্বাধীনভাবে রেন্ডার হয়ে ইউজারকে কাজ চালিয়ে যাওয়ার পূর্ণ স্বাধীনতা দিয়েছিল।",
          "e": "Abolished monolithic screen-blocking loaders in favor of localized, widget-scoped Skeleton loaders powered by React Suspense boundaries. Sluggish endpoints were isolated without delaying peer dashboard metrics.",
          "code": "<div className='grid grid-cols-3'>\n  <Suspense fallback={<CardSkeleton />}><SalesWidget /></Suspense>\n  <Suspense fallback={<CardSkeleton />}><StockWidget /></Suspense>\n</div>"
        },
        {
          "lvl": "realworld",
          "q": "Git & GitHub টিম ওয়ার্কফ্লো: বড় ড্যাশবোর্ড প্রজেক্টে ৫ জন ডেভেলপারের সমান্তরাল ফিচারে কাজ করার সময় কোড কনফ্লিক্ট রোধ ও কোয়ালিটি কীভাবে নিশ্চিত করেছিলে?",
          "m": "আমরা 'GitHub Flow & Trunk-Based Development' মেনে চলেছি: (১) মূল `main` ব্রাঞ্চে সরাসরি পুশ কঠোরভাবে ব্লক করা ছিল (`Branch Protection Rules`)। (২) প্রতিটি ফিচারের জন্য আলাদা ব্রাঞ্চ (`feat/pos-cart`, `fix/login-token`) খুলে Pull Request (PR) তৈরি করা হতো। (৩) GitHub Actions CI পাইপলাইনে স্বয়ংক্রিয়ভাবে `npm run lint`, `tsc --noEmit`, এবং টেস্ট কেস রান হতো; কোনো একটি ফেইল করলে পিআর মার্জ ব্লক থাকত। (৪) ন্যূনতম ১ জন সিনিয়র ইঞ্জিনিয়ারের অনুমোদন ছাড়া কোড মার্জ হতো না।",
          "b": "টিম ওয়ার্কফ্লোতে আমরা গিটহাব ব্রাঞ্চ প্রটেকশন রুলস প্রয়োগ করেছি। প্রতিটি ফিচারের জন্য আলাদা পিআর (PR) এবং সিআই পাইপলাইনে লিন্ট ও টাইপস্ক্রিপ্ট টাইপ চেক সফল হওয়া বাধ্যতামূলক ছিল। কোড রিভিউয়ের মাধ্যমে সর্বোচ্চ গুণমান রক্ষা করা হয়েছিল।",
          "e": "Enforced trunk-based GitHub flow with protected main branches, requiring feature branches (`feat/pos-cart`), mandatory PR reviews, and automated GitHub Actions CI checking ESLint, TypeScript types (`tsc --noEmit`), and unit tests prior to merge.",
          "tip": "ইন্টারভিউতে ব্রাঞ্চিং স্ট্র্যাটেজি, পিআর রিভিউ কালচার এবং সিআই গেট চেকিংয়ের কথা বলা টিম লিডারশিপের প্রমাণ দেয়।"
        }
      ]
    },
    {
      "id": "git-frontend-testing",
      "name": "Git, GitHub & Automated Testing (Jest, RTL, Playwright)",
      "desc": "Git Branching, PRs, Merge Conflicts, Unit Testing with Jest, Integration Testing with RTL, E2E Testing with Playwright, CI Quality Gates",
      "items": [
        {
          "lvl": "lvl1",
          "q": "Git-এ `git pull` এবং `git fetch`-এর মধ্যে মৌলিক পার্থক্য কী?",
          "m": "`git fetch` রিমোট রিপোজিটরি (GitHub) থেকে লেটেস্ট কমিট, ব্রাঞ্চ ও মেটাডাটা লোকাল মেশিনে ডাউনলোড করে কিন্তু আপনার বর্তমান লোকাল ওয়ার্কিং কোডে কোনো পরিবর্তন বা মার্জ করে না। আর `git pull` মূলত দুটি কমান্ডের কম্বিনেশন: এটি প্রথমে `git fetch` চালায় এবং সাথে সাথে স্বয়ংক্রিয়ভাবে কারেন্ট লোকাল ব্রাঞ্চে রিমোট কোড `git merge` (বা rebase) করে দেয়। নিরাপদ কাজের জন্য প্রথমে fetch করে পার্থক্য দেখে নিয়ে তারপর pull করা শ্রেয়।",
          "b": "git fetch শুধুমাত্র রিমোট সার্ভার থেকে নতুন তথ্য ডাউনলোড করে কিন্তু লোকাল কোডে কোনো পরিবর্তন ঘটায় না। অন্যদিকে git pull স্বয়ংক্রিয়ভাবে ফেচ করার পর বর্তমান ব্রাঞ্চে রিমোট কোড মার্জ করে দেয়।",
          "e": "git fetch downloads recent remote commits and refs without touching your local working directory. git pull is shorthand for running git fetch immediately followed by git merge, updating your working branch directly.",
          "tip": "কখনোই ব্লাইন্ডলি সরাসরি pull না করে আগে fetch ও diff চেক করা সিনিয়র ইঞ্জিনিয়ারের ভালো অভ্যাস।"
        },
        {
          "lvl": "lvl1",
          "q": "Unit Testing, Integration Testing, এবং End-to-End (E2E) Testing-এর মধ্যে পার্থক্য কী (Testing Pyramid)?",
          "m": "Testing Pyramid অনুযায়ী: (১) Unit Testing (Jest / Vitest): ছোট ছোট একক ফাংশন বা আইসোলেটেড লজিক টেস্ট করে (খুব দ্রুত ও সস্তা)। (২) Integration Testing (React Testing Library): একাধিক কম্পোনেন্ট বা হুক ও এপিআই মক একসাথে কীভাবে ইন্টারেক্ট করে তা টেস্ট করে (মাঝারি স্পিড)। (৩) E2E Testing (Playwright / Cypress): বাস্তব ব্রাউজার ওপেন করে একজন সাধারণ ইউজারের মতো লগইন থেকে শুরু করে পেমেন্ট পর্যন্ত পুরো ফ্লো টেস্ট করে (সবচেয়ে বাস্তবসম্মত কিন্তু ধীরগতির ও রিসোর্স-হেভি)।",
          "b": "ইউনিট টেস্ট ক্ষুদ্রতম স্বাধীন ফাংশন যাচাই করে। ইন্টিগ্রেশন টেস্ট একাধিক কম্পোনেন্টের যৌথ কার্যকারিতা পরীক্ষা করে। এবং এন্ড-টু-এন্ড (E2E) টেস্ট বাস্তব ব্রাউজারে প্রকৃত ব্যবহারকারীর পুরো যাত্রা ও অভিজ্ঞতা যাচাই করে।",
          "e": "Unit testing tests isolated functions in memory. Integration testing (React Testing Library) verifies interactions between multiple cooperating components and mocked APIs. End-to-End testing (Playwright) drives real headless browsers through full user journeys.",
          "code": "// Unit: test(sum(1, 2)).toBe(3)\n// Integration: render(<LoginForm />) -> fireEvent -> expect(msg)\n// E2E: page.goto('/login') -> page.fill('#email') -> page.click('button')"
        },
        {
          "lvl": "lvl1",
          "q": "React Testing Library (RTL)-এর মূল দর্শন কী এবং 'Test user behavior, not implementation details' বলতে কী বোঝায়?",
          "m": "RTL-এর মূল নীতি হলো: ইউজার স্ক্রিনে যা দেখে এবং যেভাবে ব্যবহার করে, টেস্ট কেসও হুবহু সেভাবেই টেস্ট করবে। কম্পোনেন্টের অভ্যন্তরীণ স্টেট ভ্যারিয়েবলের নাম কী (`state.count`) বা মেথডের নাম কী—তা টেস্ট করার বদলে ইউজার বাটনে ক্লিক করতে পারছে কি না (`screen.getByRole('button', { name: /submit/i })`) এবং স্ক্রিনে প্রত্যাশিত টেক্সট ফুটে উঠেছে কি না, তা টেস্ট করা। এর ফলে কোড রিফ্যাক্টর করলেও টেস্ট কেস অহেতুক ফেইল করে না।",
          "b": "রিঅ্যাক্ট টেস্টিং লাইব্রেরির দর্শন হলো বাস্তবায়ন পদ্ধতির বদলে ব্যবহারকারীর আচরণ পরীক্ষা করা। অভ্যন্তরীণ স্টেট না দেখে ব্যবহারকারী যেভাবে বাটন বা টেক্সট দেখে ইন্টারেক্ট করে, টেস্টেও হুবহু সেই আচরণ যাচাই করা হয়।",
          "e": "RTL encourages testing how users interact with the interface rather than probing internal component implementation details (like state names or private methods). Querying by accessibility roles (`getByRole`) guarantees resilience across internal code refactors.",
          "code": "test('renders greeting on click', async () => {\n  render(<Greeting />);\n  await userEvent.click(screen.getByRole('button', { name: /greet/i }));\n  expect(screen.getByText(/hello jahid/i)).toBeInTheDocument();\n});"
        },
        {
          "lvl": "lvl1",
          "q": "Git-এ `git merge` এবং `git rebase`-এর মধ্যে পার্থক্য কী এবং কখন কোনটি ব্যবহার করবে?",
          "m": "`git merge` দুটি ব্রাঞ্চের ইতিহাস মিলিয়ে একটি নতুন 'Merge Commit' তৈরি করে। এতে মূল হিস্ট্রির কোনো পরিবর্তন হয় না কিন্তু হিস্ট্রি ব্রাঞ্চিং ট্রিতে এলোমেলো ও মেলা জটিল হতে পারে। আর `git rebase` আপনার ফিচার ব্রাঞ্চের সব কমিটকে টার্গেট ব্রাঞ্চের সর্বশেষ কমিটের ওপরে নিয়ে রি-প্লে করে একটি নিখুঁত সরলরৈখিক (Linear) হিস্ট্রি তৈরি করে। দলগত মেইন ব্রাঞ্চে রিবেস করা নিষিদ্ধ, কিন্তু নিজের ফিচার ব্রাঞ্চ আপডেট করার জন্য রিবেস বেস্ট প্র্যাকটিস।",
          "b": "git merge একটি অতিরিক্ত মার্জ কমিটের মাধ্যমে শাখাগুলো যুক্ত করে। git rebase বর্তমান শাখার সব কমিটকে টার্গেট শাখার মাথার ওপর নতুন করে সাজিয়ে সম্পূর্ণ সোজা ও পরিপাটি লিনিয়ার হিস্ট্রি তৈরি করে।",
          "e": "git merge creates an explicit merge commit preserving the exact chronological non-linear branch graph. git rebase rewrites project history by replaying your branch commits on top of the target base tip, yielding a clean linear log.",
          "tip": "কখনোই পাবলিক বা শেয়ার্ড ব্রাঞ্চে (main/dev) rebase চালাবে না—এটি গোল্ডেন রুল।"
        },
        {
          "lvl": "lvl1",
          "q": "Playwright কী এবং এটি কেন Cypress বা Selenium-এর চেয়ে আধুনিক E2E টেস্টিংয়ে এগিয়ে?",
          "m": "Playwright হলো মাইক্রোসফটের তৈরি একটি আধুনিক এন্ড-টু-এন্ড অটোমেশন টেস্ট ফ্রেমওয়ার্ক। সুবিধা: (১) এটি একই সাথে Chromium, Firefox, এবং WebKit (Safari) ইঞ্জিন সাপোর্ট করে। (২) অটো-ওয়েটিং (Auto-waiting): এলিমেন্ট দৃশ্যমান ও ক্লিকেবল না হওয়া পর্যন্ত নিজে থেকেই অপেক্ষা করে, কোনো ম্যানুয়াল `sleep()` লাগে না। (৩) মাল্টি-ট্যাব, মাল্টি-ইউজার সেশন প্যারালালে টেস্ট করতে পারে। (৪) সুপার ফাস্ট এক্সিকিউশন ও ট্রেস ভিউয়ার (Trace Viewer) সুবিধা।",
          "b": "প্লেরাইট ক্রোম, ফায়ারফক্স ও সাফারি তিনটিতেই কাজ করে। কোনো অতিরিক্ত স্লিপ ছাড়াই এটি উপাদান প্রস্তুত হওয়া পর্যন্ত স্বয়ংক্রিয়ভাবে অপেক্ষা করে এবং একাধিক ট্যাব ও ডিভাইসে প্যারালাল টেস্টিং চালানোর সুবিধা দেয়।",
          "e": "Playwright is a modern E2E testing framework supporting Chromium, Firefox, and WebKit out of the box. It features automatic waiting (eliminating flaky timeouts), parallel browser contexts, mobile device emulation, and rich trace recording.",
          "code": "test('login flow', async ({ page }) => {\n  await page.goto('https://dokani.bip.sg/login');\n  await page.fill('input[name=\"phone\"]', '01712345678');\n  await page.click('button[type=\"submit\"]');\n  await expect(page).toHaveURL('/dashboard');\n});"
        },
        {
          "lvl": "lvl2",
          "q": "React Testing Library-তে এপিআই কল মক করার জন্য Mock Service Worker (MSW) কেন `jest.mock()` এর চেয়ে বহুগুণ শ্রেষ্ঠ?",
          "m": "`jest.mock('axios')` বা ফেচ মক করলে শুধু জাভাস্ক্রিপ্ট মেথডটি প্যাচ হয়, যা বাস্তব নেটওয়ার্ক লেয়ারের বাস্তবসম্মত আচরণ টেস্ট করতে পারে না। MSW (Mock Service Worker) নেটওয়ার্ক লেয়ারে (Service Worker / Node interceptor) রিকোয়েস্ট ইন্টারসেপ্ট করে। ফলে আপনার অ্যাক্সিওস কনফিগারেশন, ইন্টারসেপ্টরস, হেডার এবং নেটওয়ার্ক সিরিয়ালাইজেশন হুবহু আসল সার্ভারের মতো কার্যকর থাকে। কোড রিফ্যাক্টর করে অ্যাক্সিওস বাদ দিয়ে fetch ব্যবহার করলেও MSW টেস্ট কেসগুলো একটুও ব্রেক করে না।",
          "b": "এমএসডব্লিউ নেটওয়ার্ক স্তরে এপিআই কল ইন্টারসেপ্ট করে, ফলে কোনো কোড পরিবর্তন ছাড়াই বাস্তব সার্ভারের মতো রেসপন্স মক করা যায়। এটি লাইব্রেরি পরিবর্তনের পরেও টেস্ট কেসকে ১০০% কার্যকর রাখে।",
          "e": "MSW intercepts HTTP traffic at the network transport layer via Service Workers rather than patching JavaScript modules with jest.mock(). This keeps real Axios interceptors and serialization active, allowing refactors without breaking tests.",
          "code": "import { http, HttpResponse } from 'msw';\nimport { setupServer } from 'msw/node';\nexport const server = setupServer(\n  http.get('/api/user', () => HttpResponse.json({ name: 'Jahid' }))\n);"
        },
        {
          "lvl": "lvl2",
          "q": "Git Stash কী এবং অসম্পূর্ণ ফিচারে কাজ করার সময় জরুরি হটফিক্স এলে কীভাবে `stash pop` ও `stash apply` ব্যবহার করবে?",
          "m": "Git Stash বর্তমান অসম্পূর্ণ পরিবর্তনগুলোকে (মডিফাইড ও স্টেজেড ফাইল) একটি অস্থায়ী শেলফে জমিয়ে রেখে আপনার ওয়ার্কিং ডিরেক্টরিকে একদম ক্লিন স্টেটে ফিরিয়ে নেয় (`git stash save 'wip'`। এরপর আপনি নিশ্চিন্তে `main` ব্রাঞ্চে গিয়ে জরুরি বাগ ফিক্স করে পুশ করতে পারেন। কাজ শেষে আবার আপনার ফিচারে ফিরে এসে `git stash pop` (স্ট্যাশ ফিরিয়ে এনে শেলফ থেকে ডিলিট করা) অথবা `git stash apply` (শেলফে কপি রেখে কোড ফেরত আনা) চালাতে পারেন।",
          "b": "git stash অসম্পূর্ণ কোডকে সাময়িক বাক্সে সংরক্ষণ করে ওয়ার্কিং ব্রাঞ্চ পরিষ্কার করে দেয়। হটফিক্স শেষ করে পুনরায় ফিরে এসে git stash pop দিলে আগের অসম্পূর্ণ কোডটি ফিরিয়ে আনা যায়।",
          "e": "git stash shelving saves your uncommitted local modifications and reverts the working directory to clean HEAD. After switching branches and completing an urgent hotfix, `git stash pop` restores the stashed work and deletes it from the stash list.",
          "code": "git stash push -m 'WIP Cart Feature'\ngit checkout main && git checkout -b hotfix/bug\n# fix & commit...\ngit checkout feat/cart && git stash pop"
        },
        {
          "lvl": "lvl2",
          "q": "React Testing Library-তে Async উপাদান টেস্ট করতে `waitFor` এবং `findBy*` কুয়েরি কীভাবে কাজ করে?",
          "m": "যে উপাদানগুলো অ্যাসিঙ্ক এপিআই রেসপন্সের পর রেন্ডার হয়, সেগুলোর জন্য `getBy*` দিলে সাথে সাথে ক্র্যাশ করবে কারণ উপাদানটি তৎক্ষণাৎ ডমে নেই। `findBy*` (যেমন `findByRole`, `findByText`) একটি প্রমিজ রিটার্ন করে এবং উপাদানটি ডমে মাউন্ট হওয়া পর্যন্ত নির্দিষ্ট সময় (ডিফল্ট ১০০০ms) অপেক্ষা করে। আর কাস্টম অ্যাসিনক্রোনাস অ্যাসার্শন টেস্টের জন্য `await waitFor(() => expect(...).toBe(...))` ব্যবহার করা হয়।",
          "b": "অ্যাসিনক্রোনাস উপাদান টেস্ট করতে findBy কুয়েরি ব্যবহার করতে হয় কারণ এটি উপাদানটি ডমে না আসা পর্যন্ত অপেক্ষা করে। এছাড়া waitFor ব্লক দিয়ে যেকোনো স্টেট রূপান্তর সম্পন্ন হওয়া পর্যন্ত অপেক্ষা করা যায়।",
          "e": "Asynchronous DOM updates cannot be caught by synchronous `getBy*` queries. `findBy*` queries return promises that poll the DOM until the matching node renders. Alternatively, `waitFor(() => expect(...))` polls an assertion until it passes or times out.",
          "code": "test('displays invoice after api load', async () => {\n  render(<InvoiceView id='1' />);\n  const invoiceHeading = await screen.findByRole('heading', { name: /invoice #1/i });\n  expect(invoiceHeading).toBeInTheDocument();\n});"
        },
        {
          "lvl": "lvl2",
          "q": "Git Commit Convention (Conventional Commits: feat, fix, chore, refactor, docs) কেন জরুরি এবং সিআই অটোমেশনে এর ভূমিকা কী?",
          "m": "Conventional Commits একটি স্ট্যান্ডার্ড মেসেজ ফরম্যাট বজায় রাখে (`feat: add pos barcode scanner`, `fix: token refresh loop`)। এর বড় সুবিধা হলো: (১) টিমের যে কেউ গিট হিস্ট্রি পড়েই তাৎক্ষণিক বুঝতে পারে কী পরিবর্তন হয়েছে। (২) Semantic Release টুলস স্বয়ংক্রিয়ভাবে কমিট হিস্ট্রি পড়ে সেমান্টিক ভার্সন (`v1.2.0` vs `v1.2.1`) বাম্প করতে পারে এবং স্বয়ংক্রিয়ভাবে প্রোডাকশন `CHANGELOG.md` জেনারেট করতে পারে।",
          "b": "কনভেনশনাল কমিটস নিয়মের মাধ্যমে কমিট মেসেজ অর্থবহ রাখা হয়। সিআই/সিডি অটোমেশন এই মেসেজগুলো বিশ্লেষণ করে স্বয়ংক্রিয়ভাবে সফটওয়্যারের ভার্সন আপডেট এবং চেঞ্জলগ প্রস্তুত করে।",
          "e": "Conventional Commits enforce structured commit logs (`type(scope): description`). Automated CI tools (e.g. Semantic Release) parse these prefixes to automate semantic version bumps (Major/Minor/Patch) and generate release changelogs without human intervention.",
          "tip": "কখনোই 'fixed bug' বা 'update code' লিখবে না; সবসময় 'fix(auth): resolve silent refresh 401 loop' ফরম্যাট অনুসরণ করবে।"
        },
        {
          "lvl": "lvl2",
          "q": "Playwright-এ Authentication State ক্যাশ করে কীভাবে টেস্ট স্পিড ১০ গুণ বাড়ানো যায় (`storageState`)?",
          "m": "যদি ১০০টি E2E টেস্ট থাকে এবং প্রতি টেস্টের শুরুতে ব্রাউজার ওপেন করে নতুন করে ইউজারনেম-পাসওয়ার্ড দিয়ে লগইন করতে হয়, তবে টেস্ট রান হতে আধ ঘণ্টা লাগবে। সমাধান: Playwright-এর 'Global Setup'-এ একবার মাত্র লগইন করে ব্রাউজারের কুকিজ ও লোকালস্টোরেজ একটি JSON ফাইলে সেভ করা হয় (`storageState: 'auth.json'`)। এরপর বাকি সব টেস্ট সেই সেভ করা অথেনটিকেটেড সেশন রিইউজ করে সরাসরি ড্যাশবোর্ড থেকে টেস্ট শুরু করে।",
          "b": "প্রতি টেস্টে নতুন করে লগইন না করে একবার লগইন করে সেশন storageState ফাইলে সেভ রাখা হয়। পরবর্তী টেস্টগুলো সেই কুকি রিইউজ করে সরাসরি লগইন করা অবস্থায় দ্রুত শুরু হতে পারে।",
          "e": "Avoid re-running slow UI login forms before every test. Playwright captures signed cookies and storage in a global setup script via `storageState: 'auth.json'`, letting subsequent parallel test workers boot directly into authenticated dashboard states.",
          "code": "// playwright.config.ts\nuse: { storageState: 'playwright/.auth/user.json' }"
        },
        {
          "lvl": "lvl3",
          "q": "Flaky Tests (কখনো পাস কখনো ফেইল হওয়া টেস্ট) কেন তৈরি হয় এবং E2E ও ইন্টিগ্রেশন টেস্টে ফ্ল্যাকিনেস নির্মূলের কৌশল কী?",
          "m": "ফ্ল্যাকিনেসের প্রধান কারণগুলো হলো: (১) হার্ডকোডেড `sleep(2000)` বা ভুল টাইমআউট, (২) নেটওয়ার্ক রেস কন্ডিশন বা রিকোয়েস্ট অর্ডার অমিল, (৩) টেস্টগুলোর মধ্যে শেয়ার্ড স্টেট (এক টেস্টের ডেটা অন্য টেস্টকে প্রভাবিত করা)। নির্মূল কৌশল: (১) কখনোই টাইমআউট না দিয়ে ইভেন্ট-ড্রিভেন অ্যাসার্শন ব্যবহার করা (যেমন Playwright auto-wait বা RTL findBy), (২) প্রতিটি টেস্টের আগে ডাটাবেজ বা মক স্টেট সম্পূর্ণ রিসেট করা (Test Isolation), (৩) নেটওয়ার্ক কলের জন্য MSW বা নেটওয়ার্ক রেসপন্স ইন্টারসেপ্টর নিশ্চিত করা।",
          "b": "ফ্ল্যাকি টেস্ট এড়াতে হার্ডকোডেড স্লিপ পরিহার করে অটো-ওয়েট ও ইভেন্ট-ড্রিভেন অ্যাসার্শন ব্যবহার করতে হবে। প্রতি টেস্টকে সম্পূর্ণ স্বাধীন (আইসোলেটেড) রাখতে হবে যাতে পূর্ববর্তী টেস্টের ডাটা পরবর্তী টেস্টে কোনো প্রভাব না ফেলে।",
          "e": "Flakiness arises from hardcoded sleep delays, race conditions, and shared global state across test runs. Eliminate flakiness by enforcing test isolation (ephemeral states per worker), leveraging auto-waiting locators, and intercepting network traffic deterministically.",
          "tip": "ইন্টারভিউতে 'Never use sleep() in E2E tests, always await state conditions' নীতি জোর দিয়ে বলবে।"
        },
        {
          "lvl": "lvl3",
          "q": "Git Rebase Conflict রেজোলিউশন: জটিল রিবেস কনফ্লিক্ট কীভাবে সমাধান করে সেফলি পুশ করতে হয় (`--force-with-lease`)?",
          "m": "রিবেস করার সময় কনফ্লিক্ট আসলে গিট পজ করে কনফ্লিক্ট ফাইলগুলো মার্ক করে। স্টেপস: (১) কনফ্লিক্টিং ফাইলগুলো ওপেন করে ম্যানুয়ালি মার্কার (`<<<<<<<`, `=======`, `>>>>>>>`) সরিয়ে সঠিক কোড ঠিক করি। (২) সমাধানকৃত ফাইলগুলো `git add .` করি। (৩) কখনোই `git commit` দেব না; শুধু `git rebase --continue` দেব। (৪) রিমোটে পুশ করার সময় কখনোই ক্ষতিকর `git push -f` দেব না; সবসময় `git push --force-with-lease` দেব, যা নিশ্চিত করে আপনার অগোচরে রিমোটে অন্য কারো পুশ করা কমিট থাকলে তা দুর্ঘটনাবশত মুছে যাবে না।",
          "b": "রিবেস কনফ্লিক্ট মেটাতে ফাইল ঠিক করে git add করে git rebase --continue দিতে হবে। কোড রিমোটে পাঠানোর সময় git push --force-with-lease ব্যবহার করতে হবে যা অন্যের পুশ করা কোড মুছে যাওয়া থেকে রক্ষা করে।",
          "e": "Resolve rebase conflicts by editing markers, staging via `git add`, and executing `git rebase --continue`. When pushing upstream, always use `--force-with-lease` instead of `-f` to prevent clobbering upstream commits pushed concurrently by teammates.",
          "code": "git add .\ngit rebase --continue\ngit push origin feat/pos --force-with-lease"
        },
        {
          "lvl": "lvl3",
          "q": "Visual Regression Testing কী এবং Playwright-এর `toHaveScreenshot()` কীভাবে পিক্সেল-লেভেল ইউআই রিগ্রেশন ধরে ফেলে?",
          "m": "Visual Regression Testing কোডের ফাংশনাল লজিকের পাশাপাশি স্ক্রিনের ডিজাইন পিক্সেল নিখুঁত আছে কি না তা টেস্ট করে। Playwright পেজের একটি গোল্ডেন বেসলাইন স্ক্রিনশট সেভ করে রাখে। পরবর্তীতে কোনো সিএসএস বা কোড পরিবর্তনের পর নতুন স্ক্রিনশট তুলে দুটির মধ্যে পিক্সেল-বাই-পিক্সেল তুলনা করে (`expect(page).toHaveScreenshot()`)। কোনো বাটন ২ পিক্সেল সরে গেলে বা কালার শেড বদলে গেলে টেস্ট সাথে সাথে ফেইল করে দুটি ছবির ভিজ্যুয়াল ডিফারেন্স (Diff) হাইলাইট করে দেখায়।",
          "b": "ভিজ্যুয়াল রিগ্রেশন টেস্টিং পূর্বের রেফারেন্স স্ক্রিনশটের সাথে বর্তমান স্ক্রিনশট মিলিয়ে পিক্সেল পর্যায়ের অমিল পরীক্ষা করে। সিএসএসের কারণে কোনো উপাদান স্থানচ্যুত বা বিকৃত হলে প্লেরাইট তা মুহূর্তের মধ্যে শনাক্ত করে।",
          "e": "Visual regression testing compares rendered UI screenshots against baseline snapshots pixel-by-pixel using Playwright's `expect(page).toHaveScreenshot()`. Any layout shift, color drift, or component distortion fails the test, emitting a highlighted visual diff artifact.",
          "code": "test('dashboard visual comparison', async ({ page }) => {\n  await page.goto('/dashboard');\n  await expect(page).toHaveScreenshot('dashboard-baseline.png');\n});"
        },
        {
          "lvl": "lvl3",
          "q": "GitHub Actions CI পাইপলাইনে প্যারালাল টেস্ট এক্সেকিউশন ও ম্যাট্রিক্স স্ট্র্যাটেজি কীভাবে সেটআপ করবে?",
          "m": "বড় টেস্ট স্যুট সিঙ্গেল মেশিনে রান করলে ৩০-৪০ মিনিট সময় নেয়। GitHub Actions-এ আমরা `matrix` এবং `shard` স্ট্র্যাটেজি ব্যবহার করি: টেস্ট স্যুটকে ৪টি প্যারালাল ভার্চুয়াল মেশিনে ভাগ করে দিই (`shard: [1/4, 2/4, 3/4, 4/4]`)। প্রতিটি মেশিন একই সাথে একটি অংশে টেস্ট চালায়। টেস্ট শেষ হলে সব রিপোর্টকে একটি সিঙ্গেল আর্টিকেলে মার্জ করে গিটহাবে আপলোড করে। এর ফলে সম্পূর্ণ টেস্ট রান টাইম ৪০ মিনিট থেকে কমে মাত্র ৭ মিনিটে নেমে আসে।",
          "b": "গিটহাব অ্যাকশনসে ম্যাট্রিক্স ও শার্ডিং স্ট্র্যাটেজি ব্যবহার করে টেস্ট স্যুটকে একাধিক ভার্চুয়াল মেশিনে একযোগে প্যারালালে চালানো হয়। এর ফলে টেস্ট শেষ হওয়ার সময় ৭৫% পর্যন্ত কমে দ্রুত সিআই ফিডব্যাক পাওয়া যায়।",
          "e": "Parallelize continuous integration workflows in GitHub Actions using test sharding (`--shard=1/4`). A build matrix spawns independent parallel VM runners executing disjoint test suites simultaneously, slashing CI execution time from 40m down to under 7m.",
          "code": "# .github/workflows/ci.yml\nstrategy:\n  matrix:\n    shardIndex: [1, 2, 3, 4]\n    shardTotal: [4]\nrun: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}"
        },
        {
          "lvl": "lvl3",
          "q": "Git Bisect কী এবং প্রোডাকশনে কয়েক সপ্তাহ আগে আসা কোনো রহস্যময় রিগ্রেশন বাগ বাইনারি সার্চ দিয়ে কীভাবে দ্রুত খুঁজে বের করবে?",
          "m": "`git bisect` হলো গিট-এর একটি জাদুকরী বাইনারি সার্চ টুল। আপনি গিটকে একটি খারাপ কমিট (`git bisect bad` - যেখানে বাগ আছে) এবং একটি পুরানো ভালো কমিট (`git bisect good v1.0` - যেখানে বাগ ছিল না) চিহ্নিত করে দেবেন। গিট স্বয়ংক্রিয়ভাবে মাঝখানের কমিট চেকআউট করবে। আপনি সেখানে টেস্ট রান করবেন এবং `good` বা `bad` বলবেন। মাত্র ৮-১০টি বাইনারি পদক্ষেপে গিট শত শত কমিটের ভেতর থেকে ঠিক কোন কমিটটিতে এবং কে ওই বাগটি ঢুকিয়েছিল তা নির্ভুলভাবে চিহ্নিত করে দেবে।",
          "b": "git bisect বাইনারি সার্চ অ্যালগরিদম ব্যবহার করে শত শত কমিটের মধ্য থেকে সুনির্দিষ্ট ত্রুটিযুক্ত কমিটটি চোখের পলকে শনাক্ত করে। এটি রহস্যময় পুরোনো বাগ দ্রুত ধরতে অসাধারণ কার্যকর।",
          "e": "git bisect performs an automated binary search through commit history to isolate the precise commit introducing a regression. By tagging known 'good' and 'bad' points, it checks out midpoints iteratively, locating elusive defects across hundreds of commits in logarithmic time.",
          "tip": "ইন্টারভিউতে 'git bisect' এর বাস্তব উদাহরণ দেওয়া সিনিয়র ইঞ্জিনিয়ারদের ডিবাগিং ম্যাচিউরিটির চূড়ান্ত নিদর্শন।"
        },
        {
          "lvl": "situation",
          "q": "একজন জুনিয়র ডেভেলপার ভুল করে মেইন ব্রাঞ্চে পাসওয়ার্ড ও ডাটাবেজ সিক্রেট কি সহ কমিট পুশ করে ফেলেছে। তাৎক্ষণিকভাবে কীভাবে এই সিকিউরিটি ডিজাস্টার হ্যান্ডেল করবে?",
          "m": "তাত্ক্ষণিক পদক্ষেপ: (১) সবার আগে ডাটাবেজ বা ক্লাউড কনসোলে গিয়ে ওই কম্প্রোমাইজড পাসওয়ার্ডটি সাথে সাথে রোটেট/রিভোক করব (কারণ গিট হিস্ট্রি মুছলেও ইতিমধ্যে কেউ স্ক্র্যাপ করে ফেলতে পারে)। (২) সাধারণ নতুন কমিট দিলে হিস্ট্রি থেকে সিক্রেট মুছে যায় না; তাই `git-filter-repo` অথবা BFG Repo-Cleaner ব্যবহার করে পুরো গিট হিস্ট্রি থেকে ওই ফাইল ও সিক্রেট সম্পূর্ণ স্ক্রাব করে মুছে ফেলব। (৩) ফিউচার প্রিভেনশনের জন্য `git-secrets` বা `trufflehog` প্রি-কমিট হুক বসাব।",
          "b": "প্রথমেই অবিলম্বে ডাটাবেজের পাসওয়ার্ড বদলে ফেলতে হবে যাতে পুরানো কি অকার্যকর হয়। এরপর BFG Repo-Cleaner দিয়ে সম্পূর্ণ গিট হিস্ট্রি থেকে সিক্রেট ডিলিট করে দিতে হবে এবং প্রি-কমিট হুক দিয়ে ভবিষ্যতে সিক্রেট পুশ ঠেকানোর ব্যবস্থা করতে হবে।",
          "e": "Immediate action: rotate and invalidate the exposed secret immediately at the provider level. Next, purge the secret completely from git history using `git-filter-repo` or BFG Repo-Cleaner. Install pre-commit secret scanners (e.g. GitGuardian or TruffleHog) to prevent recurrences.",
          "tip": "সর্বপ্রথম পাসওয়ার্ড রোটেট করার কথা বলা সবচেয়ে গুরুত্বপূর্ণ—কারণ সিক্রেট একবার পুশ হলে তা ইতিমধ্যেই কম্প্রোমাইজড।"
        },
        {
          "lvl": "situation",
          "q": "একটি পুল রিকোয়েস্টে (PR) ১০টি কনফ্লিক্টিং ফাইল রয়েছে এবং মেইন ব্রাঞ্চের সাথে ফিচার ব্রাঞ্চের বিশাল ফারাক তৈরি হয়েছে। কীভাবে নিরাপদে এই মার্জ কনফ্লিক্ট মিটিয়ে টিম কোড সেভ করবে?",
          "m": "সমাধান: (১) মূল ফিচার ব্রাঞ্চের একটি ব্যাকআপ ডুপ্লিকেট ব্রাঞ্চ বানিয়ে রাখব (`git checkout -b feat-backup`) যাতে কোনো কিছু ভুল হলে রিকভার করা যায়। (২) মূল ব্রাঞ্চের সর্বশেষ আপডেট ফেচ করব (`git fetch origin main`)। (৩) ফিচার ব্রাঞ্চে `git merge origin/main` (বা rebase) চালাব। (৪) VS Code-এর 3-way Merge Editor ব্যবহার করে প্রতিটি কনফ্লিক্টিং ফাইলের ইনকামিং বনাম কারেন্ট কোড পরীক্ষা করে প্রয়োজনীয় অংশ রাখব। (৫) সম্পূর্ণ টেস্ট স্যুট রান করে নিশ্চিত করব সব টেস্ট পাস করেছে।",
          "b": "প্রথমে বর্তমান ব্রাঞ্চের একটি ব্যাকআপ ব্রাঞ্চ তৈরি করে নিতে হবে। এরপর ভিএস কোডের থ্রি-ওয়ে মার্জ এডিটর দিয়ে প্রতিটি ফাইলের পরিবর্তন মনোযোগ সহকারে মিলিয়ে কনফ্লিক্ট সমাধান করতে হবে এবং সবশেষে টেস্ট চালিয়ে নির্ভুলতা নিশ্চিত করতে হবে।",
          "e": "Create a local safety branch copy first (`git checkout -b feature-backup`). Fetch the latest upstream main and initiate the merge. Use VS Code's 3-way Merge Editor to inspect incoming versus current code blocks, validating resolution integrity by executing full test suites.",
          "code": "git branch backup-feat\ngit fetch origin\ngit merge origin/main\n# Resolve conflicts in VS Code, run npm test"
        },
        {
          "lvl": "situation",
          "q": "Playwright E2E টেস্ট লোকাল মেশিনে ১০০% পাস করে কিন্তু GitHub Actions CI সার্ভারে রেন্ডার টাইমিং বা রিসোর্স পার্থক্যের কারণে ফেইল করে। কীভাবে ফিক্স করবে?",
          "m": "কারণ: সিআই সার্ভারের সিপিইউ দুর্বল থাকে এবং হেডলেস মোডে অ্যানিমেশন ও ফন্ট রেন্ডার সামান্য ধীরে হয়। সমাধান: (১) Playwright কনফিগারেশনে `actionTimeout` ও `expect` টাইমআউট সিআই এনভায়রনমেন্টের জন্য সামান্য বাড়িয়ে দেব (`isCI ? 10000 : 5000`)। (২) CSS ট্রানজিশন ও অ্যানিমেশন সিআই মোডে ডিসেবল করে দেব (`disableAnimations: true`)। (৩) ফেইলিং টেস্টের জন্য Playwright-এর ট্রেস ফাইল (`trace: 'retain-on-failure'`) ডাউনলোড করে লোকাল মেশিনে `npx playwright show-trace trace.zip` দিয়ে টাইমলাইন ও স্ক্রিনশট ফ্রেম-বাই-ফ্রেম দেখে মূল রুট কজ শনাক্ত করব।",
          "b": "সিআই সার্ভারে পারফরম্যান্স পার্থক্যের কারণে টেস্ট ফেইল করলে সিআই মোডের জন্য টাইমআউট কিছুটা বাড়াতে হবে এবং অ্যানিমেশন নিষ্ক্রিয় করতে হবে। ফেইল হওয়া টেস্টের ট্রেস ফাইল ডাউনলোড করে লোকাল মেশিনে প্লেরাইট ট্রেস ভিউয়ারে ফ্রেম বাই ফ্রেম বিশ্লেষণ করে রুট কজ সমাধান করতে হবে।",
          "e": "CI runners possess lower compute budgets inducing render micro-delays. Configure `actionTimeout` higher in CI, disable CSS animations globally, and enable `trace: 'retain-on-failure'`. Inspect failing CI traces locally via `npx playwright show-trace trace.zip` to pinpoint timing divergences.",
          "code": "use: {\n  trace: 'retain-on-failure',\n  video: 'retain-on-failure'\n}"
        },
        {
          "lvl": "situation",
          "q": "কমিট করার পর মনে পড়ল কমিট মেসেজে ভুল হয়েছে অথবা স্টেজিংয়ে একটি ফাইল যোগ করতে ভুলে গিয়েছ। নতুন কমিট ছাড়া পূর্বের কমিট কীভাবে আপডেট করবে?",
          "m": "আমরা `git commit --amend` ব্যবহার করব। যদি কোনো ফাইল বাদ পড়ে থাকে, তবে ফাইলটি `git add omitted-file.ts` করব এবং তারপর `git commit --amend --no-edit` দিলে আগের কমিটের ভেতরেই ফাইলটি সাইলেন্টলি ইনক্লুড হয়ে যাবে। আর শুধু মেসেজ পরিবর্তন করতে হলে `git commit --amend -m 'new message'` ব্যবহার করব। তবে কমিট যদি ইতিমধ্যেই রিমোটে পুশ হয়ে গিয়ে থাকে তবে সাবধানতার সাথে টিমকে অবগত করে `--force-with-lease` দিতে হবে।",
          "b": "পূর্বের কমিটে ফাইল যোগ বা মেসেজ পরিবর্তন করতে git commit --amend ব্যবহার করা হয়। নতুন কমিট না বানিয়ে আগের কমিটেই পরিবর্তনগুলো একীভূত করা যায়।",
          "e": "Stage the forgotten file via `git add` and run `git commit --amend --no-edit` to merge it directly into the preceding commit without adding a separate commit hash. For message alterations, invoke `git commit --amend -m 'corrected text'`.",
          "code": "git add forgotten-file.ts\ngit commit --amend --no-edit"
        },
        {
          "lvl": "situation",
          "q": "টিমে দ্রুত ফিচার ডেলিভারি করতে গিয়ে টেস্ট কভারেজ কমে যাচ্ছে এবং বারবার রিগ্রেশন বাগ প্রোডাকশনে যাচ্ছে। কোড কোয়ালিটি রক্ষার জন্য কী গিটহাব রুলস এনফোর্স করবে?",
          "m": "আমরা GitHub Repo-তে ৩টি কঠোর সুরক্ষা রুল এনফোর্স করব: (১) `Branch Protection Rules`: `main` ব্রাঞ্চে সরাসরি পুশ ব্লক থাকবে এবং যে কোনো পিআরে অন্তত একজন রিভিউয়ারের অ্যাপ্রুভাল বাধ্যতামূলক হবে। (২) `Status Checks Must Pass`: GitHub Actions CI-তে ESLint, TypeScript টাইপ-চেক এবং Jest/Playwright টেস্ট গ্রিন টিক ছাড়া মার্জ বাটন ডিসেবল থাকবে। (৩) `Codecov / Jest Coverage Gate`: নতুন কোডে টেস্ট কভারেজ ন্যূনতম ৮০%-এর নিচে নামলে স্বয়ংক্রিয়ভাবে পিআর ব্লক হবে।",
          "b": "কোড মান সুরক্ষায় ব্রাঞ্চ প্রটেকশন রুলস অন করে সরাসরি পুশ বন্ধ করতে হবে। সিআই পাইপলাইনে লিন্ট ও টেস্ট পাস হওয়া এবং কোডকভ দিয়ে ন্যূনতম ৮০% টেস্ট কভারেজ পূরণ হওয়া বাধ্যতামূলক করতে হবে।",
          "e": "Establish strict quality gates: require branch protection blocking direct commits to main, mandate positive PR approvals, enforce passing CI checks (linting, type-checks, E2E suites), and set Codecov minimum threshold gates (e.g., 80% coverage) before PR merges are unlocked.",
          "tip": "সিআই স্ট্যাটাস চেক এবং পিআর প্রটেকশন রুলসের বাস্তব পলিসি বর্ণনা করা যেকোনো টিমের সিনিয়র লিড পদের জন্য আদর্শ।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর দ্রুতগতির চেকআউট ফ্লোতে Playwright E2E টেস্ট কীভাবে সম্পূর্ণ অটোমেটেড করেছিলে?",
          "m": "আমরা একটি পূর্ণাঙ্গ E2E পাইপলাইন তৈরি করেছিলাম: (১) প্লেরাইট ব্রাউজার ওপেন করে ক্যাশিয়ার ক্রেডেনশিয়াল দিয়ে লগইন করে। (২) টেস্ট ক্যাটালগ থেকে বারকোড স্ক্যান এমুলেট করে ৩টি প্রোডাক্ট কার্টে যোগ করে। (৩) কুপন কোড ইনপুট দেয় এবং মোট টাকার হিসাব (ভ্যাট ও ডিসকাউন্ট) মিলিয়ে দেখে। (৪) ক্যাশ পেমেন্ট ডায়ালগে টাকার অঙ্ক দিয়ে 'Complete Sale' বাটনে ক্লিক করে। (৫) টেস্ট নিশ্চিত করে যে ব্যাকএন্ড ইনভয়েস সফল হয়েছে এবং থার্মাল প্রিন্ট ডায়ালগ ট্রিগার হয়েছে। সম্পূর্ণ ফ্লো মাত্র ৪ সেকেন্ডে রান হয়ে কোনো বাগ থাকলে তৎক্ষণাৎ রিপোর্ট দেয়।",
          "b": "দোকানি চেকআউটে প্লেরাইট টেস্ট স্বয়ংক্রিয়ভাবে ক্যাশিয়ার লগইন, বারকোড স্ক্যানিং, কার্ট হিসাব এবং বিক্রয় চূড়ান্ত করার সম্পূর্ণ প্রক্রিয়া ৪ সেকেন্ডে পরীক্ষা করত। কোনো একটি গণনা ভুল হলে টেস্ট ফেইল হয়ে বাগ প্রতিরোধ নিশ্চিত করত।",
          "e": "Automated Dokani POS checkout via Playwright: driving the browser through authentication, barcode entry simulations, invoice VAT/discount assertions, cash tendering, and thermal print trigger validations in sub-4-second automated runs.",
          "tip": "বাস্তব পিওএস ফ্লোতে প্লেরাইট দিয়ে বারকোড থেকে পেমেন্ট পর্যন্ত অটোমেটেড টেস্টের কথা বললে টেকনিক্যাল ইন্টারভিউয়ার পুরো মুগ্ধ হয়ে যাবে।"
        },
        {
          "lvl": "realworld",
          "q": "Dokani POS-এর অফলাইন সেলস সিঙ্ক মডিউলে Network Disconnect ও Reconnect টেস্ট করতে Playwright কীভাবে ব্যবহার করেছিলে?",
          "m": "Playwright-এর `page.context().setOffline(true)` এপিআই ব্যবহার করে আমরা কৃত্রিমভাবে ইন্টারনেট ড্রপ এমুলেট করি। অফলাইনে থাকা অবস্থায় ক্যাশিয়ার ২টি সেলস বিল সম্পন্ন করে এবং টেস্ট ভ্যালিডেট করে যে সেলস ডাটা ব্রাউজারের IndexedDB-তে পেন্ডিং ব্যাজ সহ সেভ হয়েছে। এরপর `setOffline(false)` করে ইন্টারনেট পুনরায় চালু করি এবং টেস্ট ভ্যালিডেট করে যে ব্যাকগ্রাউন্ড সিঙ্ক স্বয়ংক্রিয়ভাবে ট্রিগার হয়ে সার্ভারে ডাটা পৌঁছেছে এবং পেন্ডিং ব্যাজ 'Synced' এ রূপান্তরিত হয়েছে।",
          "b": "প্লেরাইটের setOffline এপিআই ব্যবহার করে আমরা ইন্টারনেট বন্ধ করে অফলাইন বিক্রি পরীক্ষা করেছি। পুনরায় সংযোগ দিয়ে ব্যাকগ্রাউন্ড সিঙ্ক সঠিকভাবে ডাটাবেজ আপডেট করেছে কিনা তা স্বয়ংক্রিয়ভাবে যাচাই করা হয়েছিল।",
          "e": "Tested Dokani's offline resilience by toggling `context.setOffline(true)`. The test completed offline sales, asserted IndexedDB storage, restored connectivity with `setOffline(false)`, and verified optimistic sync reconciliations against the server.",
          "code": "await page.context().setOffline(true);\nawait page.click('#pay-btn');\nawait expect(page.locator('.offline-badge')).toBeVisible();\nawait page.context().setOffline(false);\nawait expect(page.locator('.synced-badge')).toBeVisible();"
        },
        {
          "lvl": "realworld",
          "q": "PTTABD প্ল্যাটফর্মে লাইভ এক্সাম মডিউলের টাইমার ও অটো-সাবমিট লজিক টেস্ট করতে Jest Fake Timers (`jest.useFakeTimers()`) কীভাবে ব্যবহার করেছিলে?",
          "m": "লাইভ এক্সামের টাইমার ১ ঘণ্টার (৩৬০০ সেকেন্ড)। টেস্টে সত্যি সত্যি ১ ঘণ্টা বসে থাকা অসম্ভব। আমরা Jest-এর `jest.useFakeTimers()` ব্যবহার করেছি। কম্পোনেন্ট মাউন্ট করে আমরা `jest.advanceTimersByTime(1000 * 60 * 60)` কল করে ঘড়ির সময় মুহূর্তের মধ্যে ১ ঘণ্টা সামনে এগিয়ে নিয়ে যাই। এরপর টেস্ট অ্যাসার্ট করে যে এক্সাম ফর্মটি নিজে থেকেই ডিসেবল হয়েছে এবং সার্ভারে `autoSubmitExam()` কল ট্রিগার হয়েছে। সম্পূর্ণ ১ ঘণ্টার টেস্ট মাত্র ২০ মিলিসেকেন্ডে শেষ হয়!`,",
          "b": "পিটিটিএবিডি পরীক্ষার ১ ঘণ্টার কাউন্টডাউন টেস্টে জেস্টের ফেইক টাইমার ব্যবহার করা হয়েছিল। advanceTimersByTime দিয়ে সময় মুহূর্তেই ১ ঘণ্টা বাড়িয়ে দিয়ে স্বয়ংক্রিয় পরীক্ষার খাতা জমা হওয়ার লজিক মাত্র কয়েক মিলিসেকেন্ডে নির্ভুলভাবে পরীক্ষা করা সম্ভব হয়েছিল।",
          "e": "Tested PTTABD's 1-hour exam countdown with `jest.useFakeTimers()`. Advancing the virtual clock via `jest.advanceTimersByTime(3600000)` instantly triggered the automated submission handler, validating timeout defenses in sub-20ms executions.",
          "code": "jest.useFakeTimers();\nrender(<ExamSession duration={3600} />);\nact(() => { jest.advanceTimersByTime(3600000); });\nexpect(screen.getByText(/exam auto-submitted/i)).toBeInTheDocument();"
        },
        {
          "lvl": "realworld",
          "q": "Husky এবং lint-staged দিয়ে লোকাল প্রি-কমিট (pre-commit) হুক কীভাবে কনফিগার করেছিলে যাতে ত্রুটিপূর্ণ কোড কোনোভাবেই গিটে পুশ না হয়?",
          "m": "আমরা প্রজেক্টে Husky এবং `lint-staged` সেটআপ করেছি। ডেভেলপার যখনই `git commit` দেয়, হুকটি স্বয়ংক্রিয়ভাবে সক্রিয় হয়ে শুধুমাত্র স্টেজে থাকা পরিবর্তিত ফাইলগুলোর ওপর ESLint (`eslint --fix`), Prettier ফরম্যাটিং এবং TypeScript টাইপ চেকিং রান করায়। কোনো ফাইলে লিন্ট এরর বা টাইপস্ক্রিপ্ট টাইপো থাকলে কমিটটি সাথে সাথে ব্লক হয়ে যায় এবং ত্রুটি স্ক্রিনে ভেসে ওঠে। ফলে টিমের কেউই ভুল বা আন-ফরম্যাটেড কোড গিটহাবে পুশ করতে পারত না।",
          "b": "আমরা হাস্কি এবং লিন্ট-স্টেজের মাধ্যমে প্রি-কমিট হুক তৈরি করেছি। কোড কমিট করার সাথে সাথে স্বয়ংক্রিয়ভাবে লিন্ট ও ফরম্যাটিং চেক হয়; কোনো ত্রুটি থাকলে কমিট বাতিল হয়ে যায়, ফলে গিটহাবে সবসময় পরিষ্কার ও মানসম্পন্ন কোড নিশ্চিত থাকে।",
          "e": "Configured Husky with lint-staged to run pre-commit hooks executing ESLint auto-fixes, Prettier formatting, and TypeScript compilation (`tsc --noEmit`) strictly against staged files, aborting commits if lint or type violations occur.",
          "code": "// package.json\n\"lint-staged\": {\n  \"*.{ts,tsx}\": [\"eslint --fix\", \"prettier --write\"]\n}"
        },
        {
          "lvl": "realworld",
          "q": "World Corp Digital বা আধুনিক রিমোট ফুল-স্ট্যাক টিমে Pull Request (PR) কোড রিভিউয়ের জন্য তোমার স্ট্যান্ডার্ড চেকলিস্ট কী?",
          "m": "আমার পিআর রিভিউ স্ট্যান্ডার্ড চেকলিস্ট: (১) আর্কিটেকচার ও বিজনেস লজিক সঠিক কি না, (২) কোনো অপ্রয়োজনীয় রি-রেন্ডার বা মেমোরি লিক আছে কি না, (৩) ইনপুট ভ্যালিডেশন (Zod) এবং টাইপস্ক্রিপ্ট টাইপ সেফটি নিশ্চিত কি না (কোনো `any` নেই তো?), (৪) কোনো গোপন পাসওয়ার্ড বা API কি হার্ডকোড করা হয়েছে কি না, (৫) মোবাইল রেসপনসিভনেস ও অ্যাক্সেসিবিলিটি (A11y) ঠিক আছে কি না, (৬) নতুন ফিচারের জন্য যথাযথ Jest/Playwright টেস্ট যোগ করা হয়েছে কি না।",
          "b": "আমার কোড রিভিউ চেকলিস্টে থাকে: আর্কিটেকচারাল নির্ভুলতা, পারফরম্যান্স ও মেমোরি লিক পরীক্ষা, কঠোর টাইপ সেফটি, কোনো হার্ডকোডেড সিক্রেট অনুপস্থিতি, মোবাইল রেসপনসিভনেস এবং পর্যাপ্ত টেস্ট কেসের উপস্থিতি।",
          "e": "My comprehensive PR review checklist evaluates: (1) Architecture adherence & clean separation of concerns, (2) Re-render overheads & memory leaks, (3) Strict typing without `any` bypasses, (4) Absence of hardcoded credentials, (5) Responsive layouts & A11y, and (6) Adequate test coverage via unit and E2E specs.",
          "tip": "একটি স্ট্রাকচার্ড পিআর রিভিউ চেকলিস্ট উপস্থাপন করা সিনিয়র ও লিড পদের জন্য অত্যন্ত আকর্ষণীয়।"
        }
      ]
    }
  ]
};
