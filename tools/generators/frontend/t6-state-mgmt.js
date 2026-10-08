// Topic 6: State Management & Context API (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "state-context-mgmt",
  name: "State Management & Context API",
  desc: "Context API, Prop Drilling, Zustand, Redux Toolkit, Server State (TanStack Query) vs Client State, Selectors",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "React-এ Prop Drilling কী এবং কীভাবে Context API এই সমস্যার সমাধান করে?",
      m: "Prop Drilling হলো যখন কোনো ডেটা বা ফাংশন টপ-লেভেল কম্পোনেন্ট থেকে অনেকগুলো ইন্টারমিডিয়েট চাইল্ড কম্পোনেন্টের মধ্য দিয়ে নিচে পাস করতে হয়, যদিও মাঝখানের কম্পোনেন্টগুলোর সেই ডেটার কোনো প্রয়োজন নেই। এটি কোডবেজকে জটিল ও ভঙ্গুর করে তোলে। Context API একটি গ্লোবাল ডাটা পাইপলাইনের মতো কাজ করে, যার ফলে যেকোনো নেস্টেড চাইল্ড সরাসরি `useContext()` দিয়ে মাঝখানের কোনো কম্পোনেন্টকে বিরক্ত না করেই ডাটা অ্যাক্সেস করতে পারে।",
      b: "প্রপ ড্রিলিং হলো অপ্রয়োজনীয় মধ্যবর্তী কম্পোনেন্টের মধ্য দিয়ে প্রপস পাস করে নিচের কম্পোনেন্টে পৌঁছানোর সমস্যা। কনটেক্সট এপিআই গ্লোবাল স্টেট সরবরাহের মাধ্যমে যেকোনো স্তরের কম্পোনেন্টকে সরাসরি useContext হুকের সাহায্যে ডাটা গ্রহণের সুযোগ দিয়ে কোড পরিষ্কার রাখে।",
      e: "Prop Drilling is the tedious process of passing props through intermediary components that don't need them just to deliver data to a deeply nested child. The Context API circumvents this by exposing a Provider that any descendant can consume directly via useContext().",
      code: "const ThemeContext = createContext('dark');\nfunction Child() {\n  const theme = useContext(ThemeContext); // Direct access without drilling\n  return <div>{theme}</div>;\n}"
    },
    {
      lvl: "lvl1",
      q: "Client State এবং Server State-এর মধ্যে মৌলিক পার্থক্য কী?",
      m: "Client State হলো সম্পূর্ণ ব্রাউজারের নিজস্ব সিঙ্ক্রোনাস UI স্টেট—যেমন মডাল ওপেন আছে কি না, সাইডবার টগল, বা ডার্ক মোড প্রেফারেন্স। আর Server State হলো রিমোট ডাটাবেজে থাকা অ্যাসিঙ্ক ডাটা যা অন্য কোনো ইউজারও যেকোনো সময় পরিবর্তন করতে পারে—যেমন প্রোডাক্ট লিস্ট, ইনভেন্টরি স্টক বা সেলস রেকর্ড। ক্লায়েন্ট স্টেটকে Zustand/Context দিয়ে এবং সার্ভার স্টেটকে TanStack Query (React Query) বা SWR দিয়ে হ্যান্ডেল করা আধুনিক স্ট্যান্ডার্ড।",
      b: "ক্লায়েন্ট স্টেট হলো ব্রাউজারের নিজস্ব ইন্টারফেস অবস্থা যেমন ড্রপডাউন খোলা কি না। অন্যদিকে সার্ভার স্টেট হলো ডাটাবেজ থেকে এপিআইর মাধ্যমে আসা তথ্য যা একাধিক ব্যবহারকারী দ্বারা পরিবর্তিত হতে পারে। সার্ভার স্টেট ক্যাশিং, রিফেচিং ও সিঙ্কের জন্য রিঅ্যাক্ট কোয়েরি ব্যবহার করা সর্বোত্তম।",
      e: "Client State represents synchronous browser UI data owned entirely by the client (e.g. modal open state). Server State represents asynchronous remote persistence (e.g. database orders) that is shared across users, requiring caching, invalidation, and background synchronization.",
      tip: "কখনোই এপিআই ডেটা ম্যানুয়ালি Redux-এ রেখে রিফেচ ম্যানেজ করবে না; সার্ভার স্টেটের জন্য TanStack Query ব্যবহার করা সেরা অভ্যাস।"
    },
    {
      lvl: "lvl1",
      q: "Zustand কী এবং এটি কেন আধুনিক রিঅ্যাক্ট প্রজেক্টে Redux-এর চেয়ে বেশি জনপ্রিয় হচ্ছে?",
      m: "Zustand হলো একটি আল্ট্রা-লাইটওয়েট (~১KB) স্টেট ম্যানেজমেন্ট লাইব্রেরি। Redux-এর মতো এতে কোনো জটিল Boilerplate (Actions, Reducers, Dispatchers, Providers) লাগে না। সরাসরি একটি হুক তৈরি করে পুরো অ্যাপের যেকোনো জায়গা থেকে স্টেট রিড এবং আপডেট করা যায়। সবচেয়ে বড় সুবিধা হলো এতে কোনো `<Provider>` র্যাপার লাগে না এবং এটি নিখুঁত সিলেক্টর ভিত্তিক অটোমেটিক রি-রেন্ডার অপটিমাইজেশন দেয়।",
      b: "জুস্ট্যান্ড একটি অতি হালকা ও দ্রুতগতির স্টেট ম্যানেজমেন্ট টুল। রিডাক্সের মতো বড় বড় একশন ও রিডিউসার লেখার ঝামেলা ছাড়াই সরাসরি হুক বানিয়ে স্টেট পরিচালনা করা যায়। কোনো প্রোভাইডার ছাড়াই এটি কাজ করে এবং মেমোরি ব্যবহারে অত্যন্ত দক্ষ।",
      e: "Zustand is a minimalistic (~1KB) state management solution built on React hooks without boilerplate. Unlike Redux, it requires no Provider wrappers, actions, or dispatch ceremonies, providing atomic selector-based subscriptions out of the box.",
      code: "import { create } from 'zustand';\nexport const useCartStore = create((set) => ({\n  items: [],\n  addItem: (item) => set((state) => ({ items: [...state.items, item] }))\n}));"
    },
    {
      lvl: "lvl1",
      q: "React-এ `useReducer` কখন `useState`-এর চেয়ে বেশি উপযোগী?",
      m: "যখন কোনো কম্পোনেন্টে একাধিক সম্পর্কিত স্টেট থাকে এবং স্টেটের পরবর্তী মান আগের মানের ওপর জটিল নিয়মে নির্ভর করে (যেমন: মাল্টি-স্টেপ চেকআউট ফর্ম বা জটিল কার্ট ক্যালকুলেশন), তখন `useReducer` ব্যবহার করা বেস্ট। এটি সব স্টেট মিউটেশন লজিককে একটি সিঙ্গেল 'Reducer Function'-এ একত্রিত করে, যা টেস্ট করা খুব সহজ এবং কম্পোনেন্টের UI থেকে বিজনেস লজিক আলাদা রাখে।",
      b: "জটিল স্টেট ট্রানজিশন এবং একাধিক আন্তঃসম্পর্কিত স্টেট ভ্যারিয়েবল পরিচালনার জন্য useReducer উপযোগী। এটি কম্পোনেন্টের রেন্ডার অংশ থেকে স্টেট রূপান্তরের লজিক আলাদা করে একটি সুস্পষ্ট রিডিউসার ফাংশনে আবদ্ধ রাখে।",
      e: "useReducer is preferred over useState when dealing with complex state transitions involving multiple sub-values, interdependent state logic, or when next state depends tightly on previous state, centralizing logic into a pure reducer function.",
      code: "const [state, dispatch] = useReducer(cartReducer, initialState);\ndispatch({ type: 'ADD_ITEM', payload: product });"
    },
    {
      lvl: "lvl1",
      q: "Context API ব্যবহারে সবচেয়ে বড় পারফরম্যান্স সমস্যা কী?",
      m: "সবচেয়ে বড় সমস্যা হলো: যখনই Context Provider-এর মান সামান্যও পরিবর্তিত হয়, ওই কনটেক্সট ব্যবহারকারী প্রতিটি চাইল্ড কম্পোনেন্ট স্বয়ংক্রিয়ভাবে রি-রেন্ডার হয়—এমনকি চাইল্ডটি যদি ওই পরিবর্তিত ফিল্ডটি ব্যবহার নাও করে! কনটেক্সটে সিলেক্টর ভিত্তিক ফাইন-গ্রেইন্ড সাবস্ক্রিপশন নেই। সমাধান হলো কনটেক্সটকে ছোট ছোট ভাগে স্প্লিট করা (যেমন UserContext এবং ThemeContext আলাদা করা)।",
      b: "কনটেক্সট এপিআইর মূল দুর্বলতা হলো এর যেকোনো একটি প্রপার্টি পরিবর্তন হলে সংশ্লিষ্ট সমস্ত কনজিউমার কম্পোনেন্ট অপ্রয়োজনীয়ভাবে রি-রেন্ডার হয়ে যায়। এটি বড় অ্যাপের কর্মক্ষমতা ধীরগতির করতে পারে।",
      e: "The primary drawback of Context API is that any state mutation on the Provider triggers an unconditional re-render of every subscribed consumer component, lacking granular field-level selector subscriptions.",
      tip: "ইন্টারভিউতে 'Unnecessary re-renders of all consumers' উল্লেখ করে কনটেক্সট স্প্লিটিং সমাধান দেবে।"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Redux Toolkit (RTK) এবং RTK Query কী এবং এটি ট্র্যাডিশনাল Redux-এর জটিলতা কীভাবে দূর করেছে?",
      m: "আগে সাধারণ Redux-এ Action Types, Action Creators, Reducers এবং Thunks লিখতে শত শত লাইন বয়লারপ্লেট কোড লাগত। Redux Toolkit এনেছে `createSlice`—যা স্বয়ংক্রিয়ভাবে অ্যাকশন ও রিডিউসার জেনারেট করে এবং ইন্টারনালি Immer লাইব্রেরি ব্যবহার করায় সরাসরি মিউটেটিং সিনট্যাক্সে (`state.count++`) ইমিউটেবল স্টেট আপডেট করা যায়। আর RTK Query ডেটা ফেচিং, ক্যাশিং এবং অটোমেটিক রিফেচিংকে বিল্ট-ইন হ্যান্ডেল করে।",
      b: "রিডাক্স টুলকিট createSlice এর মাধ্যমে অ্যাকশন ও রিডিউসার একসাথে তৈরি করে কোডের আকার অনেক ছোট করে দিয়েছে। ইমার লাইব্রেরির কারণে জটিল অবজেক্ট কপি না করে সরাসরি মান পরিবর্তন করা যায় এবং আরটিকে কোয়েরি দিয়ে স্বয়ংক্রিয় এপিআই ক্যাশিং নিশ্চিত হয়।",
      e: "Redux Toolkit (RTK) eliminates legacy Redux boilerplate via `createSlice`, which integrates Immer to permit direct mutation syntax safely, and `configureStore` with preconfigured middleware. RTK Query handles automated server caching and invalidation.",
      code: "const cartSlice = createSlice({\n  name: 'cart',\n  initialState: { items: [] },\n  reducers: {\n    addItem: (state, action) => { state.items.push(action.payload); } // Immer handles immutability\n  }\n});"
    },
    {
      lvl: "lvl2",
      q: "Zustand-এ Selectors কীভাবে অপ্রয়োজনীয় রি-রেন্ডার রোধ করে এবং `useShallow` হুকের কাজ কী?",
      m: "Zustand-এ পুরো স্টোর সাবস্ক্রাইব না করে আমরা নির্দিষ্ট সিলেক্টর পাস করি (`useCartStore(state => state.total)`। এতে স্টোরের অন্যান্য প্রপার্টি পরিবর্তন হলেও এই কম্পোনেন্ট কোনো রি-রেন্ডার হবে না। আর যখন আমরা সিলেক্টর থেকে একাধিক প্রপার্টি একসাথে রিটার্ন করি (`state => ({ count: state.count, name: state.name })`), প্রতি রেন্ডারে নতুন অবজেক্ট রেফারেন্স তৈরি হয়ে রি-রেন্ডার হতে পারে—এখানে Zustand-এর `useShallow` ব্যবহার করলে অবজেক্টের ভেতরের মান তুলনা করে অপ্রয়োজনীয় রেন্ডার পুরোপুরি ব্লক করে।",
      b: "সিলেক্টরের মাধ্যমে জুস্ট্যান্ড শুধুমাত্র নির্দিষ্ট প্রপার্টি পরিবর্তনের সময় কম্পোনেন্টকে রি-রেন্ডার করায়। useShallow হুক অবজেক্ট বা অ্যারে সিলেক্টরের ক্ষেত্রে অগভীর সমতা যাচাই করে বাড়তি রেন্ডারিং প্রতিরোধ করে।",
      e: "Zustand selectors ensure components re-render strictly when their selected state slice mutates. Returning multiple fields produces new object references; wrapping the selector with `useShallow` performs shallow equality comparisons to avoid unwanted re-renders.",
      code: "import { useShallow } from 'zustand/react/shallow';\nconst { count, total } = useCartStore(useShallow(s => ({ count: s.count, total: s.total })));"
    },
    {
      lvl: "lvl2",
      q: "TanStack Query (React Query)-এর ক্যাশিং মেকানিজম: `staleTime` বনাম `gcTime` (পুরানো cacheTime)-এর মধ্যে পার্থক্য কী?",
      m: "`staleTime` নির্দেশ করে একটি ফেচ করা ডাটা কতক্ষণ পর্যন্ত 'তাজা বা ফ্রেশ' থাকবে। staleTime থাকা অবস্থায় পেজে ফিরে আসলে বা রি-রেন্ডার হলেও কোনো নতুন নেটওয়ার্ক রিকোয়েস্ট যাবে না। আর `gcTime` (Garbage Collection Time) নির্দেশ করে যখন কোনো কম্পোনেন্ট ওই ডাটা আর ব্যবহার করছে না (Unmounted), তখন মেমোরি ক্যাশে ডাটাটি কতক্ষণ টিকে থাকবে গারবেজ কালেক্ট হয়ে মুছে যাওয়ার আগে।",
      b: "staleTime হলো ডেটা ফ্রেশ থাকার সময়সীমা যার মধ্যে কোনো নতুন এপিআই রিকোয়েস্ট পাঠানো হয় না। gcTime হলো মেমোরিতে অব্যবহৃত ডাটা জমিয়ে রাখার সর্বোচ্চ সময়, যা পার হলে ক্যাশ পুরোপুরি মুছে যায়।",
      e: "staleTime defines the duration data is considered fresh before becoming stale; stale queries trigger background refetches. gcTime defines the duration unused cached queries persist in memory before being garbage collected.",
      code: "const { data } = useQuery({\n  queryKey: ['products'],\n  queryFn: fetchProducts,\n  staleTime: 1000 * 60 * 5, // Fresh for 5 mins\n  gcTime: 1000 * 60 * 30    // Persisted in cache for 30 mins\n});"
    },
    {
      lvl: "lvl2",
      q: "React Context-কে কীভাবে 'State and Dispatch Splitting' প্যাটার্নে অপটিমাইজ করা যায়?",
      m: "যেসব কম্পোনেন্ট শুধু ডাটা রিড করে তারা স্টেট ব্যবহার করে, আর যেসব কম্পোনেন্ট শুধু ডাটা আপডেট করে (যেমন বাটন) তাদের পুরো স্টেটের দরকার নেই—শুধু ডিসপ্যাচ দরকার। আমরা দুটি আলাদা কনটেক্সট তৈরি করি: `StateContext` এবং `DispatchContext`। ফলে যখন স্টেট আপডেট হয়, শুধু StateContext-এর সাবস্ক্রাইবাররা রি-রেন্ডার হয়; কিন্তু অ্যাকশন বাটনগুলো (DispatchContext) রি-রেন্ডার থেকে শতভাগ রেহাই পায়।",
      b: "স্টেট এবং ডিসপ্যাচ কনটেক্সট আলাদা করে ফেললে যেসব বাটন বা কন্ট্রোলার শুধু অ্যাকশন ফায়ার করে তারা অপ্রয়োজনীয় রি-রেন্ডারিং থেকে সুরক্ষিত থাকে, ফলে পারফরম্যান্স নাটকীয়ভাবে বৃদ্ধি পায়।",
      e: "Splitting context into a DataContext and an ActionContext isolates state mutations from consumers that only need dispatch triggers. Consumers calling dispatch never re-render when underlying state data mutates.",
      code: "const StateCtx = createContext(null);\nconst DispatchCtx = createContext(null);\n// Buttons only consume DispatchCtx without re-rendering on data updates!"
    },
    {
      lvl: "lvl2",
      q: "State Management-এ 'Immutability' কেন গুরুত্বপূর্ণ এবং জাভাস্ক্রিপ্ট রেফারেন্স তুলনা কীভাবে কাজ করে?",
      m: "React স্টেট পরিবর্তিত হয়েছে কি না তা বোঝার জন্য 'Shallow Equality' (মেমোরি রেফারেন্স তুলনা: `prev !== next`) চালায়। আমরা যদি সরাসরি কোনো অবজেক্ট বা অ্যারেকে মিউটেট করি (যেমন `user.name = 'x'` বা `arr.push(1)`), মেমোরি অ্যাড্রেস একই থেকে যায়। ফলে রিঅ্যাক্ট মনে করে কোনো পরিবর্তন হয়নি এবং কম্পোনেন্ট রি-রেন্ডার হয় না। ইমিউটেবিলিটি মেনে নতুন রেফারেন্স (`{ ...user, name: 'x' }`) পাঠালে রিঅ্যাক্ট সাথে সাথে স্টেট চেঞ্জ ধরতে পারে।",
      b: "রিঅ্যাক্ট মেমোরি রেফারেন্সের অগভীর তুলনা করে স্টেট পরিবর্তন নির্ধারণ করে। সরাসরি অবজেক্ট পরিবর্তন করলে মেমোরি ঠিকানা একই থাকায় রিঅ্যাক্ট পরিবর্তন বুঝতে পারে না, তাই সবসময় নতুন অবজেক্ট বা অ্যারে কপি রিটার্ন করতে হয়।",
      e: "React relies on shallow reference equality (`oldState !== newState`) for change detection. Mutating existing objects in-place preserves memory references, leading React to bypass re-renders. Producing immutable new objects guarantees deterministic reactivity.",
      tip: "ইন্টারভিউতে 'Referential Equality' এবং 'Shallow Comparison' ব্যাখ্যা করলে ফান্ডামেন্টাল ক্লিয়ার প্রমাণ হয়।"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Zustand-এ Middleware আর্কিটেকচার (Persist, DevTools, Immer) কীভাবে কাজ করে এবং কাস্টম মিডলওয়্যার কীভাবে লেখা যায়?",
      m: "Zustand-এর মিডলওয়্যার হলো একটি হায়ার-অর্ডার ফাংশন যা আসল `set`, `get` এবং `api` মেথডকে র‍্যাপ করে। `persist` লোকালস্টোরেজে স্টেট সেভ এবং হাইড্রেট করে, `devtools` রিডাক্স ডেভটুলস এক্সটেনশনের সাথে কানেক্ট করে, আর `immer` ড্রাফট মিউটেশন সহজ করে। কাস্টম মিডলওয়্যার লিখে আমরা যেকোনো অ্যাকশনের আগে ও পরে লগিং, অ্যানালিটিক্স ট্র্যাক বা টোকেন ভ্যালিডেশন স্বয়ংক্রিয়ভাবে চালাতে পারি।",
      b: "জুস্ট্যান্ড মিডলওয়্যার সেট ফাংশনকে ইন্টারসেপ্ট করে অতিরিক্ত ক্ষমতা যোগ করে। পারসিস্ট মিডলওয়্যার ব্রাউজার স্টোরেজের সাথে সিঙ্ক করে এবং কাস্টম মিডলওয়্যার দিয়ে সেন্ট্রালাইজড লগিং ও অডিট ট্র্যাক নিশ্চিত করা যায়।",
      e: "Zustand middlewares are higher-order wrappers intercepting `set` and `get` operations. Built-in middlewares include persist (syncing to storage), devtools (Redux DevTools wiring), and immer. Custom middlewares enable logging, performance telemetry, or global state synchronization.",
      code: "export const useStore = create(devtools(persist(immer((set) => ({\n  // store definition\n})), { name: 'app-storage' })));"
    },
    {
      lvl: "lvl3",
      q: "Optimistic Updates কীভাবে TanStack Query-তে ইমপ্লিমেন্ট করা হয় এবং মিউটেশন ফেইল করলে রোলব্যাক কীভাবে নিশ্চিত করবে?",
      m: "অ্যাসিনক্রোনাস নেটওয়ার্ক রিকোয়েস্ট সফল হওয়ার অপেক্ষা না করে তৎক্ষণাৎ ইউজার ইন্টারফেসে ডাটা আপডেট দেখিয়ে দেওয়াকে Optimistic Update বলে। TanStack Query-তে: (১) `onMutate`-এ চলমান কোয়েরি ক্যানসেল করি (`cancelQueries`), (২) আগের স্টেট স্ন্যাপশট হিসেবে সেভ করে রিটার্ন করি, (৩) ক্যাশ অপটিমিস্টিকালি আপডেট করি (`setQueryData`), (৪) যদি রিকোয়েস্ট ফেইল করে (`onError`), তবে স্ন্যাপশট থেকে আগের ডাটা রোলব্যাক করি, (৫) শেষে `onSettled`-এ সার্ভার থেকে ফ্রেশ ডাটা রিভ্যালিডেট করি।",
      b: "অপটিমিস্টিক আপডেটে সার্ভার রেসপন্সের আগেই ইন্টারফেস আপডেট হয়ে যায়। অন-মিউটেট হুকে আগের স্টেটের স্ন্যাপশট রেখে দেওয়া হয়, যাতে এপিআই ফেইল করলে অন-এরর হুকে তৎক্ষণাৎ রোলব্যাক করে পূর্বের সঠিক অবস্থা ফিরিয়ে আনা যায়।",
      e: "Optimistic updates predict success by modifying cached data instantaneously inside `onMutate`, returning a rollback snapshot context. If `onError` triggers, the cached state reverts cleanly to the snapshot, finalized by `onSettled` cache invalidation.",
      code: "const mutation = useMutation({\n  mutationFn: updateTodo,\n  onMutate: async (newTodo) => {\n    await queryClient.cancelQueries(['todos']);\n    const previous = queryClient.getQueryData(['todos']);\n    queryClient.setQueryData(['todos'], old => [...old, newTodo]);\n    return { previous };\n  },\n  onError: (err, newTodo, context) => {\n    queryClient.setQueryData(['todos'], context.previous); // Rollback\n  }\n});"
    },
    {
      lvl: "lvl3",
      q: "Micro-frontends বা বিভিন্ন ফ্রেমওয়ার্কের মধ্যে ক্রস-অ্যাপ্লিকেশন গ্লোবাল স্টেট সিঙ্ক কীভাবে করা যায়?",
      m: "যেহেতু বিভিন্ন মাইক্রো-অ্যাপ আলাদা আলাদা জাভাস্ক্রিপ্ট বান্ডেল ও ভিন্ন ফ্রেমওয়ার্কে (একটি React, অন্যটি Vue) থাকতে পারে, তাই ইন্টারনাল রিঅ্যাক্ট স্টেট দিয়ে সিঙ্ক করা যায় না। সমাধান: (১) ব্রাউজারের নেটিভ `CustomEvent` এবং `window.dispatchEvent` / `addEventListener` ব্যবহার করা। (২) ক্রস-ট্যাব সিঙ্কের জন্য `BroadcastChannel API` ব্যবহার করা। (৩) একটি কাস্টম Pub-Sub ইভেন্ট বাস তৈরি করা যা ফ্রেমওয়ার্ক অ্যাগনস্টিক।",
      b: "মাইক্রো-ফ্রন্টএন্ডের মধ্যে স্টেট শেয়ার করতে ব্রাউজারের কাস্টম ইভেন্ট এবং ব্রডকাস্ট চ্যানেল এপিআই ব্যবহার করা হয়। এটি কোনো নির্দিষ্ট ফ্রেমওয়ার্কের ওপর নির্ভরশীল না হয়ে স্বয়ংক্রিয়ভাবে বিভিন্ন অ্যাপের মধ্যে ডাটা বিনিময় করে।",
      e: "Synchronizing state across decoupled micro-frontends relies on framework-agnostic browser communication channels: dispatching `CustomEvent` on the window object or broadcasting updates across tabs and micro-apps using the `BroadcastChannel` API.",
      code: "const channel = new BroadcastChannel('auth_channel');\nchannel.postMessage({ type: 'USER_LOGOUT' });\nchannel.onmessage = (e) => handleRemoteEvent(e.data);"
    },
    {
      lvl: "lvl3",
      q: "React 18-এর `useSyncExternalStore` হুকের উদ্দেশ্য কী এবং এটি লাইব্রেরি ডেভেলপারদের 'Tearing' সমস্যা কীভাবে সমাধান করে?",
      m: "'Tearing' হলো এমন একটি ভিজ্যুয়াল বাগ যেখানে কনকারেন্ট রিঅ্যাক্টের ইন্টারাপ্টেবল রেন্ডারিং চলাকালীন একটি কম্পোনেন্ট এক্সটারনাল স্টোরের পুরানো মান রেন্ডার করে এবং অন্য কম্পোনেন্ট একই সাথে নতুন মান রেন্ডার করে, ফলে স্ক্রিনে অসংলগ্ন ডেটা দেখা যায়। React 18-এর `useSyncExternalStore` এক্সটারনাল স্টোর (যেমন Zustand, Redux, বা ব্রাউজার স্টোরেজ) সাবস্ক্রাইব করার জন্য একটি অফিসিয়াল সিনক্রোনাস এপিআই দেয়, যা টিয়ারিং পুরোপুরি নির্মূল করে।",
      b: "কনকারেন্ট রেন্ডারিংয়ের সময় এক্সটারনাল স্টেট পরিবর্তনের ফলে স্ক্রিনে অমিল ডাটা বা টিয়ারিং সৃষ্টি হতে পারে। useSyncExternalStore হুকটি বাহ্যিক স্টোরের সাথে সিনক্রোনাস সংযোগ রক্ষা করে টিয়ারিং প্রতিরোধ করে।",
      e: "Tearing occurs in Concurrent React when an external store mutates midway through an interrupted render, causing different UI nodes to reflect mismatched data. `useSyncExternalStore` provides a safe synchronous bridge to external stores to eliminate tearing.",
      code: "const state = useSyncExternalStore(store.subscribe, store.getSnapshot);"
    },
    {
      lvl: "lvl3",
      q: "State Normalization (স্বাভাবিকীকরণ) কী এবং নেস্টেড রিলেশনাল ডেটার ক্ষেত্রে ফ্ল্যাট স্টেট স্ট্রাকচার কেন জরুরি?",
      m: "যদি এপিআই থেকে নেস্টেড ডেটা আসে (যেমন: Authors -> Posts -> Comments), তখন কোনো কমেন্ট এডিট করতে গেলে পুরো নেস্টেড অবজেক্ট ট্রি ট্রাভার্স করে ডিপ মিউটেশন করতে হয় যা খুব স্লো ও বাগে ভরা। State Normalization-এ ডেটাকে ডাটাবেজ টেবিলের মতো ফ্ল্যাট করে আইডি ভিত্তিক নরমালাইজ করা হয়: `{ byId: { 1: { ... } }, allIds: [1, 2] }` (যেমন `normalizr` বা RTK-এর `createEntityAdapter`)। এর ফলে `O(1)` কমপ্লেক্সিটিতে যেকোনো রেকর্ড তৎক্ষণাৎ আপডেট বা রিড করা যায়।",
      b: "স্টেট নরমালাইজেশন হলো জটিল নেস্টেড অবজেক্টকে ডাটাবেজের মতো আইডি ভিত্তিক ফ্ল্যাট টেবিলে রূপান্তর করা। এর ফলে যেকোনো গভীর ডাটা খোঁজা বা আপডেট করা অত্যন্ত সহজ ও দ্রুতগতির (O(1)) হয়।",
      e: "Normalizing state involves flattening relational entities into dictionaries indexed by IDs (`byId` and `allIds`), mirroring database schemas. This eliminates deeply nested object updates, enabling O(1) mutations via libraries like RTK's `createEntityAdapter`.",
      tip: "ইন্টারভিউতে 'createEntityAdapter' এবং 'Normalized State Structure' উল্লেখ করা অনেক বড় টেকনিক্যাল প্লাস পয়েন্ট।"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "একটি কার্ট অ্যাপ্লিকেশনে ব্যবহারকারী পরপর ৩টি আইটেম দ্রুত ডিলিট করল, কিন্তু স্টেট অ্যাসিঙ্ক হওয়ার কারণে একটি ডিলিট অন্যটিকে ওভাররাইট করে শেষ আইটেমটি আবার কার্টে ফেরত চলে এলো। সমাধান কী?",
      m: "এটি ঘটে যখন স্টেটের আগের মানের ওপর নির্ভর করার সময় ডিরেক্ট ভ্যালু পাস করা হয় (`setCart(cart.filter(...))`। যেহেতু React স্টেট আপডেট ব্যাচ হতে পারে, `cart` ভ্যারিয়েবলটি স্টেটের লেটেস্ট মান নাও হতে পারে। সমাধান: সবসময় 'Functional State Updater' ব্যবহার করতে হবে: `setCart(prev => prev.filter(...))` অথবা `useReducer` / Zustand ব্যবহার করতে হবে যা নিশ্চিত করে প্রতি অ্যাকশন সবসময় লেটেস্ট স্টেটের ওপর রান করে।",
      b: "স্টেটের পূর্ববর্তী মানের সঠিক হিসাব রাখতে সরাসরি ভ্যালু না পাঠিয়ে ফাংশনাল আপডেটার `setCart(prev => ...)` ব্যবহার করতে হবে। এতে একের পর এক সব ডিলিট অ্যাকশন সঠিক ক্রমানুসারে নির্বাহ হয়।",
      e: "Direct state references become stale during batched updates. Resolve this by always using functional state updaters (`setState(prev => ...)`), ensuring mutations operate predictably on the atomic latest state.",
      code: "const removeItem = (id: string) => {\n  setCart(prevCart => prevCart.filter(item => item.id !== id));\n};"
    },
    {
      lvl: "situation",
      q: "তোমার প্রজেক্টে একটি গ্লোবাল ইউজার অবজেক্ট রয়েছে। যখনই ইউজার প্রফাইল ফটো আপডেট করে, পুরো অ্যাপ্লিকেশনের সব কম্পোনেন্ট রি-রেন্ডার হয়ে স্ক্রিন ফ্লিকার করে। কীভাবে সমাধান করবে?",
      m: "কারণ সব কম্পোনেন্ট পুরো `user` অবজেক্টকে একসাথে সাবস্ক্রাইব করে রেখেছিল। সমাধান: (১) Zustand-এ সিলেক্টর ব্যবহার করে প্রতিটি কম্পোনেন্টকে শুধু তার প্রয়োজনীয় ফিল্ড সাবস্ক্রাইব করানো (`useUserStore(s => s.name)`। এতে শুধু ফটো কম্পোনেন্টটি রি-রেন্ডার হবে, বাকি পুরো অ্যাপ সম্পূর্ণ অপরিবর্তিত থাকবে। (২) Context হলে ইউজার ডাটাকে স্প্লিট করে শুধু ইমেজ স্টেটকে আলাদা কনটেক্সটে রাখা।",
      b: "পুরো ইউজার অবজেক্ট সাবস্ক্রাইব না করে শুধুমাত্র প্রয়োজনীয় ফিল্ডের জন্য সিলেক্টর ব্যবহার করতে হবে। জুস্ট্যান্ড সিলেক্টরের সাহায্যে কেবল ফটো কম্পোনেন্ট রি-রেন্ডার হবে, পুরো অ্যাপ অক্ষত থাকবে।",
      e: "Components were subscribed to the monolithic user object. Refactor subscriptions using fine-grained Zustand selectors so that components only re-render if their subscribed primitive slice (e.g. avatarUrl) specifically changes.",
      code: "const avatar = useUserStore(state => state.user.avatarUrl); // Only re-renders on avatar changes"
    },
    {
      lvl: "situation",
      q: "একটি সার্চ এপিআই থেকে ডেটা লোড করার সময় একই সাথে ৩টি ভিন্ন কম্পোনেন্ট একই এপিআই এন্ডপয়েন্টে আলাদা আলাদা রিকোয়েস্ট পাঠিয়ে সার্ভার ওভারলোড করছে। কীভাবে রিকোয়েস্ট ডিডুপ্লিকেট করবে?",
      m: "আমরা TanStack Query (React Query) ব্যবহার করব। এতে প্রতিটি কোয়েরির একটি ইউনিক `queryKey: ['users', searchQuery]` থাকে। একাধিক কম্পোনেন্ট একই সময়ে একই কি দিয়ে `useQuery` কল করলেও TanStack Query নেটওয়ার্কে মাত্র একটি রিকোয়েস্ট পাঠায় এবং রেসপন্স আসার পর স্বয়ংক্রিয়ভাবে সব কম্পোনেন্টে ডেটা ডিস্ট্রিবিউট করে (Request Deduplication)।",
      b: "ট্যানস্ট্যাক কোয়েরি একই queryKey যুক্ত একাধিক রিকোয়েস্টকে স্বয়ংক্রিয়ভাবে একত্রিত করে মাত্র একটি নেটওয়ার্ক কল পাঠায় এবং প্রাপ্ত ফলাফল সব কম্পোনেন্টে শেয়ার করে রিকোয়েস্ট ডুপ্লিকেশন রোধ করে।",
      e: "Implement TanStack Query with co-located query keys (`queryKey: ['users', query]`). TanStack Query automatically deduplicates concurrent in-flight requests, sharing one promise across all subscriber components.",
      code: "const { data } = useQuery({ queryKey: ['search', term], queryFn: () => fetchSearch(term) });"
    },
    {
      lvl: "situation",
      q: "ব্রাউজার রিফ্রেশ দেওয়ার পর Zustand স্টোরের ডেটা হারিয়ে যাচ্ছে এবং ইউজার লগআউট হয়ে যাচ্ছে। কীভাবে স্টেট পারসিস্ট করবে?",
      m: "আমরা Zustand-এর বিল্ট-ইন `persist` মিডলওয়্যার ব্যবহার করব। এটি স্টোরের যেকোনো অংশকে `localStorage` বা `sessionStorage`-এ JSON আকারে স্বয়ংক্রিয়ভাবে সিঙ্ক করে এবং অ্যাপ লোড হওয়ার সময় মেমোরিতে রি-হাইড্রেট করে। সংবেদনশীল ডেটা বাদ দিতে `partialize` অপশন ব্যবহার করব যাতে শুধু নিরাপদ ফিল্ডগুলো সেভ হয়।",
      b: "জুস্ট্যান্ডের পারসিস্ট মিডলওয়্যার ব্যবহার করে স্টেট লোকালস্টোরেজে সংরক্ষণ করতে হবে। partialize অপশনের মাধ্যমে নির্দিষ্ট প্রয়োজনীয় ফিল্ডগুলো ব্রাউজারে ধরে রেখে রিফ্রেশের পরেও লগইন সেশন অক্ষুণ্ণ রাখা যায়।",
      e: "Wrap the Zustand store definition in the `persist` middleware, utilizing the `partialize` option to selectively sync non-sensitive state fields to localStorage with automatic rehydration upon page reload.",
      code: "export const useAuthStore = create(persist((set) => ({\n  user: null,\n  setUser: (u) => set({ user: u })\n}), {\n  name: 'auth-storage',\n  partialize: (state) => ({ user: state.user })\n}));"
    },
    {
      lvl: "situation",
      q: "মোবাইল ডিভাইসে ব্যাক বাটন চাপলে ব্যবহারকারী পূর্বের ফিল্টার করা সার্চ রেজাল্ট হারিয়ে ফেলে। স্টেটকে কীভাবে ব্রাউজার হিস্ট্রি ও URL-এর সাথে সিঙ্ক করবে?",
      m: "সমাধান: সার্চ ফিল্টার, সর্টিং এবং পেজিনেশন স্টেটকে কোনো ইন্টারনাল রিঅ্যাক্ট মেমোরি স্টেটে না রেখে 'URL Search Params' (`?q=laptop&page=2&sort=price_asc`) হিসেবে সেভ করব। Next.js-এর `useSearchParams()` এবং `useRouter()` দিয়ে URL আপডেট করব। এর ফলে ব্যাক বাটন চাপলেও ব্রাউজার হিস্ট্রি থেকে পারফেক্ট ফিল্টারড স্টেট লোড হবে এবং যেকোনো লিংক সরাসরি অন্য কারও সাথে শেয়ার করা যাবে।",
      b: "সার্চ এবং ফিল্টারের অবস্থা রিঅ্যাক্ট মেমরিতে না রেখে ইউআরএল প্যারামসে (URL Search Params) সংরক্ষণ করতে হবে। এতে ব্যাক বাটনে ক্লিক করলে পূর্বের ফিল্টার সংরক্ষিত থাকে এবং পেজটি সহজে শেয়ারযোগ্য হয়।",
      e: "Treat the URL Search Params as the single source of truth for filters, paging, and sorting. Utilizing `useSearchParams` and `useRouter` ensures natural browser history navigation, back-button resilience, and deep-link shareability.",
      code: "const searchParams = useSearchParams();\nconst query = searchParams.get('q') || '';"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর দ্রুতগতির কার্ট মডিউলে Zustand বনাম Redux Toolkit নির্বাচনের পেছনের আর্কিটেকচারাল কারণ কী ছিল?",
      m: "Dokani POS-এ আমাদের মূল লক্ষ্য ছিল: সাব-মিলিসেকেন্ড রেন্ডারিং স্পিড, জিরো বয়লারপ্লেট এবং অফলাইন IndexedDB-এর সাথে তাৎক্ষণিক সিঙ্ক্রোনাইজেশন। Redux Toolkit চমৎকার হলেও এর হেভি ফাইল সাইজ এবং অতিরিক্ত অ্যাকশন/ডিসপ্যাচ লেয়ার ক্যাশ কাউন্টারের দ্রুতগতির বারকোড স্ক্যানিংয়ে অপ্রয়োজনীয় ওভারহেড তৈরি করছিল। Zustand মাত্র ১KB হওয়ায় এবং কোনো `<Provider>` ছাড়া সরাসরি হুক ভিত্তিক সিলেক্টর সাবস্ক্রিপশন দেওয়ায় আমরা ৬০ FPS পারফরম্যান্স অর্জন করেছি।",
      b: "দোকানি পিওএসে আমরা জুস্ট্যান্ড বেছে নিয়েছিলাম কারণ এর অতি হালকা সাইজ (১কেবি) এবং কোনো বয়লারপ্লেট ছাড়াই সরাসরি হুক কল করার সুবিধা। এটি ক্যাশ কাউন্টারে বারকোড স্ক্যানিংয়ের গতিকে সর্বোচ্চ মাত্রায় সচল রেখেছিল।",
      e: "For Dokani POS, we selected Zustand over Redux Toolkit because of its microscopic ~1KB footprint, lack of Context Provider overhead, and atomic selectors capable of sustaining fluid 60fps renders during rapid barcode checkouts.",
      tip: "ইন্টারভিউতে যেকোনো টেকনোলজি বেছে নেওয়ার সময় 'Trade-offs' এবং 'কেন RTK বাদ দিয়ে Zustand নিলাম' তা স্পষ্টভাবে বলা প্রফেশনাল আর্কিটেক্টের পরিচয়।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ একই সাথে ৫টি ভিন্ন স্টোরের সেলস ট্যাব খোলা থাকলে তাদের স্টেট আইসোলেশন ও ডেটা লিকেজ কীভাবে সমাধান করেছিলে?",
      m: "মাল্টি-স্টোর ক্যাশিয়ারিংয়ের জন্য আমরা স্টোর-আইডি ভিত্তিক 'Dynamic Keyed Store' প্যাটার্ন ব্যবহার করেছি। গ্লোবাল স্টেটে ফ্ল্যাট কার্ট না রেখে `Record<StoreId, CartState>` স্ট্রাকচার রেখেছি। যখন ইউজার ট্যাব বদলায়, কারেন্ট স্টোর আইডি দিয়ে সংশ্লিষ্ট কার্ট সিলেক্ট হয়। এর ফলে এক দোকানের বিক্রি বা প্রোডাক্ট কখনোই অন্য দোকানের অ্যাকাউন্টের সাথে মিশে ডেটা করাপ্ট করেনি।",
      b: "একাধিক স্টোরের সেলস ট্যাব আলাদা রাখতে আমরা স্টোর আইডি ভিত্তিক কি-যুক্ত স্টেট কাঠামো ব্যবহার করেছিলাম। ফলে প্রতি দোকানের পণ্য ও হিসাব সম্পূর্ণ পৃথক বাক্সে সুরক্ষিত ছিল এবং কোনো তথ্য মিশ্রণ ঘটেনি।",
      e: "Handled multi-store sales tabs in Dokani by structuring cart state as a dictionary keyed by Store ID (`Record<StoreId, CartState>`). Active tabs subscribed strictly to their partitioned slice, eradicating cross-tenant data bleed.",
      code: "const currentCart = useCartStore(state => state.carts[activeStoreId] || defaultCart);"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে ১ ঘণ্টার লম্বা অনলাইন এমসিকিউ পরীক্ষার সময় ইন্টারনেট হঠাৎ চলে গেলে স্টুডেন্টের ড্রাফট উত্তরগুলো স্টেট ম্যানেজমেন্টে কীভাবে প্রটেক্ট করেছিলে?",
      m: "আমরা একটি 'Dual-Tier Write' স্টেট আর্কিটেকচার বানিয়েছিলাম। প্রতিটি অপশন সিলেক্টের সাথে সাথে: (১) Zustand স্টেট তৎক্ষণাৎ লোকালস্টোরেজ ও IndexedDB-তে ড্রাফট অ্যান্সার সেভ করে, (২) ব্যাকগ্রাউন্ডে TanStack Query Mutation দিয়ে এপিআইতে পাঠায়। যদি ইন্টারনেট ফেইল করে, UI-তে অফলাইন ব্যাজ দেখায় কিন্তু স্টুডেন্ট পরীক্ষা চালিয়ে যেতে পারে। ইন্টারনেট ব্যাক আসলে ড্রাফট উত্তরগুলো স্বয়ংক্রিয়ভাবে সার্ভারে সিঙ্ক হয়ে যায়।",
      b: "অনলাইন পরীক্ষার সময় ইন্টারনেট সংযোগ বিচ্ছিন্ন হলেও উত্তর যাতে না হারায়, সেজন্য প্রতিটি ক্লিক ইনডেক্সড-ডিবিতে সংরক্ষিত হতো। সংযোগ ফেরার সাথে সাথে ব্যাকগ্রাউন্ড সিঙ্ক দিয়ে সব উত্তর সার্ভারে জমা হতো।",
      e: "Guarded PTTABD student exam states via dual-tier persistence: every MCQ choice was committed instantly to IndexedDB before dispatching async network mutations. Network drops triggered an offline buffer queue that flushed pending answers upon reconnect.",
      tip: "অফলাইন এক্সাম সেফটি এবং লোকাল স্টোরেজ ফলব্যাক রিয়েল-ওয়ার্ল্ড এড-টেক অ্যাপ্লিকেশনের অত্যন্ত গুরুত্বপূর্ণ কেস স্টাডি।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ শত শত প্রোডাক্ট ক্যাটাগরির ফিল্টারিং এবং সর্টিং স্টেট হ্যান্ডেল করার সময় মেমোরি ও CPU থ্রটলিং রোধে কী কৌশল প্রয়োগ করেছিলে?",
      m: "সমাধান: (১) ফিল্টারিংয়ের মূল ক্যালকুলেশন `useMemo` দিয়ে ক্যাশ করেছি যা কেবল ফিল্টার ট্যাগ পরিবর্তন হলেই রি-ক্যালকুলেট হয়। (২) ক্যাটাগরি ট্রিতে দ্রুত লুকআপের জন্য অ্যারের বদলে একটি `Map` এবং `Set` ডেটা স্ট্রাকচার ব্যবহার করেছি যাতে `O(1)` সময়ে চেক করা যায় কোনো প্রোডাক্ট নির্বাচিত ক্যাটাগরিতে পড়ে কি না। (৩) ইনপুট ফিল্টারে ৩০০ মিলিসেকেন্ড ডিবউন্সিং দিয়ে অপ্রয়োজনীয় স্টেট চেঞ্জ এড়িয়েছি।",
      b: "প্রোডাক্ট ফিল্টারিংয়ে আমরা অ্যারের বদলে হ্যাশ ম্যাপ এবং সেট ব্যবহার করে O(1) গতিতে ফিল্টারিং নিশ্চিত করেছি। useMemo এবং ডিবউন্সিংয়ের সাহায্যে অপ্রয়োজনীয় সিপিইউ হিসাব প্রতিরোধ করা হয়েছিল।",
      e: "Optimized catalog filtering by indexing categories into Hash Sets for O(1) membership lookups inside a useMemo pipeline, backed by debounced state dispatches to bypass redundant intermediate calculations.",
      code: "const selectedCategorySet = useMemo(() => new Set(selectedCategories), [selectedCategories]);"
    },
    {
      lvl: "realworld",
      q: "প্রোডাকশন ড্যাশবোর্ডে WebSocket দিয়ে প্রতি সেকেন্ডে শত শত লাইভ ট্রেড/সেলস আপডেট আসার সময় রিঅ্যাক্ট স্টেটকে 'Throttled Batch Buffer' দিয়ে কীভাবে ক্র্যাশ হওয়া থেকে বাঁচাবে?",
      m: "যদি প্রতি সকেট মেসেজে সরাসরি `setState` কল করা হয়, তবে প্রতি সেকেন্ডে শত শত রি-রেন্ডার হয়ে পুরো ব্রাউজার ক্র্যাশ করবে। সমাধান: আমরা একটি ইন-মেমোরি বাফার অ্যারে রাখব যাতে ইনকামিং সকেট মেসেজ পুশ হবে। এরপর `requestAnimationFrame` অথবা একটি ৩০০ মিলিসেকেন্ডের থ্রটল টাইমার দিয়ে বাফারের সব জমে থাকা মেসেজ একসাথে ব্যাচ করে রিঅ্যাক্ট স্টেটে পুশ করব। এতে ১ সেকেন্ডে ১০০ বারের বদলে মাত্র ৩-৪ বার রি-রেন্ডার হবে অথচ ইউজার লাইভ আপডেট দেখবে।",
      b: "প্রতিটি ওয়েবসকেট মেসেজে রিঅ্যাক্ট স্টেট আপডেট না করে একটি ইন-মেমোরি বাফারে ডাটা জমিয়ে রেখে requestAnimationFrame বা ৩০০ মিলিসেকেন্ডের থ্রটল বিরতিতে ব্যাচ আকারে স্টেট আপডেট করতে হবে যাতে ব্রাউজার ক্র্যাশ না করে।",
      e: "Avoid firing setState on every raw WebSocket frame. Instead, accumulate socket payloads in a mutable buffer array and flush them to React state in batches at 300ms throttled intervals via `requestAnimationFrame` to maintain smooth 60fps rendering.",
      code: "let buffer = [];\nws.onmessage = (e) => { buffer.push(JSON.parse(e.data)); };\nsetInterval(() => {\n  if (buffer.length > 0) {\n    setLiveFeed(prev => [...buffer, ...prev].slice(0, 50));\n    buffer = [];\n  }\n}, 300);"
    }
  ]
};
