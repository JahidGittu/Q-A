// Topic 8: REST API Integration, RBAC & Client Architecture (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "api-auth-rbac-dashboard",
  name: "REST API Integration, RBAC & Dashboard UI",
  desc: "REST APIs, Axios Interceptors, JWT Token Handling, Refresh Tokens, RBAC Guards, Dashboard Component Architecture, Micro-frontends",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "REST API কী এবং প্রধান HTTP মেথডগুলোর (GET, POST, PUT, PATCH, DELETE) সুনির্দিষ্ট ব্যবহার কী?",
      m: "REST (Representational State Transfer) হলো একটি আর্কিটেকচারাল স্টাইল যা ক্লায়েন্ট ও সার্ভারের মধ্যে স্ট্যান্ডার্ড HTTP প্রোটোকলে ডেটা আদান-প্রদান করে। (১) `GET`: ডাটা রিড করা (Safe ও Idempotent)। (২) `POST`: নতুন রিসোর্স তৈরি করা (Non-idempotent)। (৩) `PUT`: বিদ্যমান পুরো রিসোর্সকে সম্পূর্ণ রিপ্লেস করা। (৪) `PATCH`: রিসোর্সের আংশিক বা কিছু ফিল্ড আপডেট করা। (৫) `DELETE`: রিসোর্স মুছে ফেলা।",
      b: "রেস্ট এপিআই ক্লায়েন্ট ও সার্ভারের মধ্যে মানসম্মত প্রোটোকল। GET তথ্য পড়তে, POST নতুন ডাটা তৈরি করতে, PUT সম্পূর্ণ রেকর্ড প্রতিস্থাপন করতে, PATCH আংশিক সংশোধন করতে এবং DELETE তথ্য মুছে ফেলতে ব্যবহৃত হয়।",
      e: "REST leverages standard HTTP verbs: GET reads resources idempotently; POST creates entities; PUT completely overwrites an existing resource; PATCH partially updates specific fields; and DELETE removes resources.",
      tip: "PUT এবং PATCH-এর পার্থক্য ইন্টারভিউতে খুব বেশি জানতে চায় (PUT সম্পূর্ণ রিপ্লেস, PATCH আংশিক আপডেট)।"
    },
    {
      lvl: "lvl1",
      q: "Authentication (অথেনটিকেশন) এবং Authorization (অথোরাইজেশন)-এর মধ্যে মৌলিক পার্থক্য কী?",
      m: "Authentication হলো 'তুমি কে?' তা প্রমাণ করা—যেমন ইউজার তার ইমেইল ও পাসওয়ার্ড বা ওটিপি দিয়ে প্রমাণ করে যে সে ওই অ্যাকাউন্টের আসল ব্যক্তি। আর Authorization হলো 'তোমার কী কী করার অধিকার আছে?' তা যাচাই করা—যেমন একজন লগইন করা ইউজার সাধারণ ক্যাশিয়ার হতে পারে, কিন্তু সে মালিকের প্রফিট রিপোর্ট ডিলিট করার অধিকার রাখে কি না, তা হলো অথোরাইজেশন বা পারমিশন।",
      b: "অথেনটিকেশন যাচাই করে ব্যবহারকারীর আসল পরিচয় (যেমন লগইন)। অথোরাইজেশন যাচাই করে সেই ব্যবহারকারী নির্দিষ্ট ফিচার বা ডাটা দেখার ও পরিবর্তন করার অনুমতি রাখে কি না (যেমন রোল ও পারমিশন)।",
      e: "Authentication validates identity ('Who are you?'), achieved via login credentials, JWTs, or biometric tokens. Authorization verifies privileges ('What are you permitted to do?'), restricting system resources based on roles and permissions.",
      code: "// 401 Unauthorized = Authentication failure (Who are you?)\n// 403 Forbidden = Authorization failure (You lack permission!)"
    },
    {
      lvl: "lvl1",
      q: "Role-Based Access Control (RBAC) কী এবং ফ্রন্টএন্ড UI-তে এটি কীভাবে কাজ করে?",
      m: "RBAC হলো এমন একটি সিকিউরিটি মডেল যেখানে ইউজারদের নির্দিষ্ট রোল (যেমন: `SUPER_ADMIN`, `STORE_OWNER`, `CASHIER`, `USER`) দেওয়া হয় এবং প্রতিটি রোলের সাথে কিছু পারমিশন ম্যাপিং থাকে। ফ্রন্টএন্ডে আমরা ইউজার রোলের ওপর ভিত্তি করে সাইডবার মেনু হাইড/শো করি, অ্যাকশন বাটন ডিসেবল করি এবং সুরক্ষিত রাউটে প্রবেশের আগে রাউট গার্ড বা মিডলওয়্যারে রোল চেক করি।",
      b: "আরবিএসি হলো রোলের ওপর ভিত্তি করে এক্সেস নিয়ন্ত্রণের পদ্ধতি। ফ্রন্টএন্ডে ব্যবহারকারীর রোলের ওপর নির্ভর করে নির্দিষ্ট মেনু ও বাটন দৃশ্যমান বা লুকায়িত রাখা হয় এবং সুরক্ষিত পেজে প্রবেশের অনুমতি দেওয়া হয়।",
      e: "Role-Based Access Control (RBAC) assigns users discrete roles paired with predefined permission sets. Frontend applications use RBAC to dynamically render sidebar items, guard private routes, and disable privileged action buttons.",
      code: "const canEditInventory = ['SUPER_ADMIN', 'STORE_OWNER'].includes(user.role);"
    },
    {
      lvl: "lvl1",
      q: "Component-Based Architecture কী এবং এটি আধুনিক ওয়েব ডেভেলপমেন্টে কোড রিইউজেবিলিটি কীভাবে নিশ্চিত করে?",
      m: "Component-Based Architecture হলো পুরো জটিল ইউজার ইন্টারফেসকে ছোট ছোট, স্বাধীন ও পুনঃব্যবহারযোগ্য ব্লকে (Components) বিভক্ত করার পদ্ধতি (যেমন: Button, Modal, Card, Table)। প্রতিটি কম্পোনেন্টের নিজস্ব কাঠামো, স্টাইল ও লজিক থাকে। এর ফলে একটি বাটন কম্পোনেন্ট পরিবর্তন করলে পুরো সাইটের সব জায়গায় আপডেট হয়ে যায়, কোড ডুপ্লিকেশন শূন্যে নামে এবং টেস্টিং অনেক সহজ হয়।",
      b: "কম্পোনেন্ট ভিত্তিক আর্কিটেকচার হলো বড় ইন্টারফেসকে ছোট স্বাধীন ও পুনঃব্যবহারযোগ্য অংশে বিভক্ত করা। এর ফলে কোড পুনরাবৃত্তি রোধ হয়, রক্ষণাবেক্ষণ সহজ হয় এবং পুরো প্রজেক্টে ডিজাইনের সামঞ্জস্য বজায় থাকে।",
      e: "Component-Based Architecture decomposes monolithic UIs into modular, self-contained, and reusable pieces encapsulation markup, styles, and logic. This guarantees DRY code, simplifies testing, and accelerates UI iteration.",
      tip: "ইন্টারভিউতে 'Atomic Design Pattern' (Atoms, Molecules, Organisms) এর রেফারেন্স দিতে পারো।"
    },
    {
      lvl: "lvl1",
      q: "Axios এবং ব্রাউজারের নেটিভ `fetch()` এর মধ্যে মূল পার্থক্য কী?",
      m: "Axios-এ বাই-ডিফল্ট স্বয়ংক্রিয় JSON ডেটা রূপান্তর (Transform) হয়, যেখানে fetch-এ ম্যানুয়ালি `res.json()` করতে হয়। Axios ইন্টারসেপ্টরস (Interceptors) সমর্থন করে যাতে গ্লোবাল টোকেন ইনজেকশন ও এরর হ্যান্ডলিং খুব সহজ। Axios যেকোনো 4xx বা 5xx HTTP এররে প্রমিজ রিজেক্ট করে (`catch` ব্লকে পাঠায়), কিন্তু `fetch()` কেবল নেটওয়ার্ক ডাউন হলেই রিজেক্ট করে—404 বা 500 পেলেও সফল (`ok: false`) হিসেবে প্রমিজ রিজলভ করে ম্যানুয়াল চেক করায়।",
      b: "অ্যাক্সিওস স্বয়ংক্রিয়ভাবে JSON রূপান্তর করে এবং 4xx/5xx স্ট্যাটাস কোডে প্রমিজ রিজেক্ট করে। এছাড়া অ্যাক্সিওসে রিকোয়েস্ট ও রেসপন্স ইন্টারসেপ্টর সুবিধা রয়েছে যা গ্লোবাল টোকেন যোগ করতে সাহায্য করে।",
      e: "Axios automatically transforms JSON, rejects promises on 4xx/5xx HTTP errors, supports request/response interceptors, and simplifies upload progress. Native fetch resolves on 4xx/5xx (requiring manual `res.ok` checks) and requires manual JSON serialization.",
      code: "// Fetch requires: if (!res.ok) throw Error()\n// Axios handles it cleanly via catch(err => ...)"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Axios Interceptors কী এবং রিকোয়েস্ট ও রেসপন্স সাইকেলে এটি কীভাবে টোকেন ইনজেকশন ও সেন্ট্রালাইজড এরর হ্যান্ডলিং করে?",
      m: "Axios Interceptor হলো একটি মিডলওয়্যারের মতো যা নেটওয়ার্ক রিকোয়েস্ট বের হওয়ার আগে এবং রেসপন্স আসার ঠিক পরে কোড এক্সিকিউট করতে পারে। রিকোয়েস্ট ইন্টারসেপ্টরে আমরা স্বয়ংক্রিয়ভাবে হেডারে `Authorization: Bearer <token>` ইনজেক্ট করি যাতে প্রতি এপিআই কলে ম্যানুয়ালি টোকেন লিখতে না হয়। আর রেসপন্স ইন্টারসেপ্টরে কোনো 401 Unauthorized আসলে সাইলেন্টলি রিফ্রেশ টোকেন কল করি বা লগআউট করাই এবং সেন্ট্রালাইজড টোস্ট নোটিফিকেশন দেখাই।",
      b: "অ্যাক্সিওস ইন্টারসেপ্টর রিকোয়েস্ট যাওয়ার আগে স্বয়ংক্রিয়ভাবে অথেনটিকেশন টোকেন যোগ করে এবং রেসপন্স আসার পর সেন্ট্রালাইজড পদ্ধতিতে এরর বা টোকেন মেয়াদোত্তীর্ণ হওয়ার ঘটনা সমাধান করে।",
      e: "Axios interceptors intercept HTTP calls globally. Request interceptors attach `Authorization: Bearer ${token}` headers dynamically. Response interceptors handle global error logging, unauthorized 401 handling, and automatic token refresh workflows.",
      code: "axiosInstance.interceptors.request.use((config) => {\n  const token = getToken();\n  if (token) config.headers.Authorization = `Bearer ${token}`;\n  return config;\n});"
    },
    {
      lvl: "lvl2",
      q: "সাইলেন্ট রিফ্রেশ টোকেন রোটেশন (Silent Refresh Token Rotation) কীভাবে কাজ করে যখন অ্যাক্সেস টোকেনের মেয়াদ শেষ হয়ে যায়?",
      m: "অ্যাক্সেস টোকেনের আয়ু কম থাকে (যেমন ১৫ মিনিট) এবং রিফ্রেশ টোকেনের আয়ু বেশি থাকে (যেমন ৭ দিন)। যখন কোনো এপিআই কল 401 Unauthorized এরর পায়, ফ্রন্টএন্ড রেসপন্স ইন্টারসেপ্টর ফেইলিং রিকোয়েস্টটি পজ করে ব্যাকগ্রাউন্ডে `/api/auth/refresh` এন্ডপয়েন্টে রিফ্রেশ টোকেন পাঠিয়ে নতুন অ্যাক্সেস টোকেন আনে। নতুন টোকেন পাওয়ার পর পজ থাকা পূর্বের অরিজিনাল রিকোয়েস্টটি আবার স্বয়ংক্রিয়ভাবে রি-ট্রাই করে—ইউজার কোনো ইন্টারাপশন ছাড়াই কাজ চালিয়ে যায়।",
      b: "অ্যাক্সেস টোকেনের মেয়াদ শেষ হলে 401 এরর পাওয়ার সাথে সাথে ব্যাকগ্রাউন্ডে রিফ্রেশ টোকেন পাঠিয়ে নতুন টোকেন সংগ্রহ করা হয়। এরপর মুলতবি থাকা রিকোয়েস্টটি পুনরায় চালিয়ে ব্যবহারকারীকে নিরবচ্ছিন্ন সেবা দেওয়া হয়।",
      e: "When an API request returns a 401 status, the response interceptor enqueues pending calls and triggers a silent POST to the refresh token endpoint. Upon receiving a fresh access token, it updates local state and replays the original requests transparently.",
      tip: "রিফ্রেশ টোকেন রোটেশনের আর্কিটেকচার ইন্টারভিউতে ফুল-স্ট্যাক ও ফ্রন্টএন্ড উভয়ের জন্য টপ প্রায়োরিটি প্রশ্ন।"
    },
    {
      lvl: "lvl2",
      q: "Protected Route Guards কীভাবে Next.js App Router এবং React Router-এ ইমপ্লিমেন্ট করা হয়?",
      m: "Next.js App Router-এ আমরা `middleware.ts`-এ রুট গার্ড বসাই যা এজ রানটাইমে রান হয়। ইউজার কুকিতে ভ্যালিড সেশন টোকেন না থাকলে পেজ রেন্ডার হওয়ার আগেই `/login?redirect=/dashboard` এ রিডাইরেক্ট করে দেয়। আর সাধারণ ক্লায়েন্ট-সাইড রিঅ্যাক্টে আমরা একটি `<ProtectedRoute>` র্যাপার কম্পোনেন্ট বানাই যা অথেনটিকেশন স্টেট চেক করে; লগইন না থাকলে `<Navigate to='/login' replace />` রিটার্ন করে।",
      b: "প্রোটেক্টেড রাউট সুরক্ষায় নেক্সট জেএস মিডলওয়্যারে কুকি যাচাই করে লগইন ছাড়া ব্যবহারকারীকে লগইন পেজে পাঠিয়ে দেয়। ক্লায়েন্ট অ্যাপে একটি উচ্চতর কম্পোনেন্ট দিয়ে অথ স্টেট পরীক্ষা করে প্রবেশাধিকার দেওয়া হয়।",
      e: "In Next.js App Router, Protected Routes are guarded globally at the edge via middleware.ts, redirecting unauthorized traffic before hitting page renderers. Client-side React implements `<ProtectedRoute>` wrappers inspecting auth state context.",
      code: "export function ProtectedRoute({ children }: { children: ReactNode }) {\n  const { user, loading } = useAuth();\n  if (loading) return <Spinner />;\n  return user ? <>{children}</> : <Navigate to='/login' replace />;\n}"
    },
    {
      lvl: "lvl2",
      q: "Cross-Site Scripting (XSS) এবং Cross-Site Request Forgery (CSRF) থেকে টোকেন সুরক্ষিত রাখার সেরা আর্কিটেকচার কী?",
      m: "যদি JWT টোকেন `localStorage`-এ রাখা হয়, তবে সাইটে কোনো দূষিত জাভাস্ক্রিপ্ট ইনজেক্ট হলে (XSS) হ্যাকার সহজেই `localStorage.getItem('token')` দিয়ে টোকেন চুরি করে নিতে পারে। সেরা সমাধান হলো: (১) রিফ্রেশ টোকেনকে `HttpOnly, Secure, SameSite=Strict` কুকিতে রাখা যা জাভাস্ক্রিপ্ট পড়তে পারে না (XSS প্রতিরোধ)। (২) অ্যাক্সেস টোকেনকে কেবল ব্রাউজার মেমোরিতে (ইন-মেমোরি ভ্যারিয়েবল) রাখা। (৩) কুকি ভিত্তিক রিকোয়েস্টে CSRF প্রটেকশনের জন্য কাস্টম CSRF হেডার বা SameSite কুকি ফ্ল্যাগ এনফোর্স করা।",
      b: "এক্সএসএস আক্রমণ ঠেকাতে টোকেন কখনোই লোকালস্টোরেজে রাখা উচিত নয়। রিফ্রেশ টোকেন HttpOnly Secure কুকিতে রাখতে হবে যা জাভাস্ক্রিপ্ট পড়তে পারে না, এবং অ্যাক্সেস টোকেন ব্রাউজার মেমরিতে সাময়িকভাবে সংরক্ষণ করতে হবে।",
      e: "Mitigate XSS by never storing auth tokens in localStorage where malicious scripts can exfiltrate them. Store long-lived refresh tokens in HttpOnly, Secure, SameSite cookies inaccessible to JavaScript, maintaining short-lived access tokens solely in client memory.",
      tip: "কখনোই localStorage-এ টোকেন রাখার পক্ষে যুক্তি দেবে না; HttpOnly কুকির গুরুত্ব স্পষ্টভাবে বলবে।"
    },
    {
      lvl: "lvl2",
      q: "ড্যাশবোর্ড UI ডিজাইনে 'Compound Components Pattern' কীভাবে কোডকে ফ্লেক্সিবল ও পরিষ্কার রাখে?",
      m: "Compound Components হলো এমন একটি প্যাটার্ন যেখানে একাধিক কম্পোনেন্ট একসাথে একটি সুসংগত স্টেট শেয়ার করে কাজ করে (যেমন HTML `<select>` এবং `<option>` এর মতো)। যেমন: `<Card><Card.Header /><Card.Body /><Card.Footer /></Card>`। এটি কম্পোনেন্টের অভ্যন্তরীণ স্টেটকে চাইল্ডদের মধ্যে শেয়ার করার জন্য React Context ব্যবহার করে। এর ফলে ইউজার যে কোনো ক্রমে চাইল্ডগুলো সাজাতে পারে কোনো প্রপ ড্রিলিং ছাড়াই।",
      b: "কম্পাউন্ড কম্পোনেন্ট প্যাটার্নে একাধিক কম্পোনেন্ট মিলে একটি একক কাজ সম্পন্ন করে এবং অভ্যন্তরীণ কনটেক্সট শেয়ার করে। এর ফলে প্যারেন্ট ও চাইল্ড কম্পোনেন্টের ভেতরে প্রপস পাস না করেই অত্যন্ত নমনীয় লেআউট তৈরি করা যায়।",
      e: "The Compound Components pattern shares state implicitly among a set of related components via Context (exemplified by native `<select>` and `<option>`). It decouples UI structure from rendering logic, affording maximum layout flexibility.",
      code: "const Card = ({ children }) => <div className='card'>{children}</div>;\nCard.Header = ({ children }) => <div className='card-hdr'>{children}</div>;\nCard.Body = ({ children }) => <div className='card-bdy'>{children}</div>;"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Axios Interceptor-এ একাধিক সমসাময়িক (Concurrent) 401 রিকোয়েস্ট আসার সময় রিফ্রেশ টোকেন কল মাত্র একবার কীভাবে হ্যান্ডেল করবে (Request Queueing)?",
      m: "যখন একই সাথে ৫টি এপিআই কল 401 পায়, যদি ৫টিই আলাদা আলাদা রিফ্রেশ টোকেন রিকোয়েস্ট পাঠায় তবে সার্ভারে টোকেন ইনভ্যালিড হয়ে লকআউট হবে। সমাধান: আমরা একটি বুলিয়ান ফ্ল্যাগ `isRefreshing` এবং একটি প্রমিজ কলব্যাক কিউ (`failedQueue = []`) রাখব। প্রথম 401 কলটি রিফ্রেশ টোকেন ফেচ শুরু করবে এবং বাকি ৪টি কলকে কিউতে পুশ করে হোল্ড রাখবে। রিফ্রেশ সফল হওয়া মাত্র কিউয়ের সব প্রমিজকে নতুন টোকেন দিয়ে রিজলভ করে একযোগে রিকানেক্ট করে দেওয়া হবে।",
      b: "একসাথে একাধিক 401 এরর আসলে যাতে বারবার রিফ্রেশ টোকেন কল না যায়, সেজন্য একটি কিউ ও isRefreshing ফ্ল্যাগ রাখতে হয়। প্রথম কলটি টোকেন রিফ্রেশ শেষ করার পর বাকি সব পেন্ডিং কলকে নতুন টোকেন দিয়ে একসাথে রি-ট্রাই করানো হয়।",
      e: "Concurrent 401s risk multiple refresh calls causing token invalidation. Resolve this by employing an `isRefreshing` semaphore and a subscriber promise queue. The first failing call requests the refresh while subsequent calls subscribe to the queue, replaying concurrently once resolved.",
      code: "let isRefreshing = false;\nlet failedQueue: Array<{ resolve: Function, reject: Function }> = [];\n// Queue failed requests until token resolves"
    },
    {
      lvl: "lvl3",
      q: "Fine-Grained Attribute-Based Access Control (ABAC) কীভাবে রিঅ্যাক্ট ফ্রন্টএন্ডে ইমপ্লিমেন্ট করা যায়?",
      m: "RBAC শুধুমাত্র ইউজারের রোলের ওপর নির্ভর করে, কিন্তু ABAC কনটেক্সচুয়াল অ্যাট্রিবিউট চেক করে (যেমন: 'ইউজার ম্যানেজার হলেও সে শুধুমাত্র তার নিজস্ব ব্রাঞ্চের ডাটা এডিট করতে পারবে এবং শুধু অফিস আওয়ারে')। আমরা CASL লাইব্রেরি (`@casl/react`) অথবা একটি কাস্টম পলিসি ইঞ্জিন ব্যবহার করি: `ability.can('update', subject('Store', { ownerId: store.ownerId }))`। এটি ফ্রন্টএন্ডে সূক্ষ্মতম ডাইনামিক ডেটা-ওনারশিপ পারমিশন কার্যকর করে।",
      b: "এবিএসি কেবল রোলের ওপর নয়, বরং ডাটার মালিকানা এবং পরিবেশের নিয়মের ওপর ভিত্তি করে এক্সেস দেয়। CASL লাইব্রেরির মাধ্যমে ফ্রন্টএন্ডে ইউজার শুধুমাত্র নিজের ব্রাঞ্চ বা রেকর্ডের ওপর অ্যাকশন চালাতে পারে কিনা তা নিশ্চিত করা যায়।",
      e: "Attribute-Based Access Control (ABAC) evaluates contextual rules beyond static roles, such as record ownership and dynamic timestamps. Using libraries like CASL, the UI evaluates permissions dynamically (`ability.can('edit', subject)`).",
      code: "import { Can } from '@casl/react';\n<Can I='delete' this={currentInvoice}>\n  <button className='btn-danger'>Delete Invoice</button>\n</Can>"
    },
    {
      lvl: "lvl3",
      q: "ড্যাশবোর্ড অ্যাপ্লিকেশনে 'Micro-Frontends' আর্কিটেকচার Webpack 5 Module Federation দিয়ে কীভাবে ডিজাইন করা যায়?",
      m: "বড় সংস্থায় ড্যাশবোর্ডের ইনভেন্টরি, সেলস এবং এইচআর আলাদা টিম আলাদা রিপোজিটরিতে তৈরি করে। Webpack 5 Module Federation ব্যবহার করে প্রতিটি মাইক্রো-অ্যাপকে একটি রিমোট এন্ট্রি (`remoteEntry.js`) হিসেবে বিল্ড ও ডেপ্লয় করা হয়। মূল হোস্ট শেল অ্যাপ রানটাইমে কোনো আইফ্রেম ছাড়াই ওই রিমোট কম্পোনেন্টগুলোকে ডায়নামিকালি লোড করে এবং রিঅ্যাক্ট ও টেলউইন্ডের কমন ডিপেনডেন্সিগুলো শেয়ার করে মেমোরি বাঁচায়।",
      b: "মডিউল ফেডারেশন বিভিন্ন প্রজেক্টের কম্পোনেন্টগুলোকে রানটাইমে সরাসরি একে অপরের সাথে যুক্ত করার সুযোগ দেয়। ফলে একাধিক টিম স্বাধীনভাবে ডিপ্লয় করতে পারে এবং মূল ড্যাশবোর্ড কোনো রিলোড ছাড়াই রিমোট কম্পোনেন্টগুলো মসৃণভাবে রেন্ডার করে।",
      e: "Webpack 5 Module Federation enables independent codebases to expose and consume modules at runtime across isolated deployments. Host applications dynamically mount remote components without iframes while sharing core dependencies like React and Tailwind.",
      tip: "Module Federation এবং Micro-frontends আর্কিটেকচার এন্টারপ্রাইজ সিস্টেম ডিজাইনে লিড পদের জন্য অত্যন্ত আকর্ষণীয়।"
    },
    {
      lvl: "lvl3",
      q: "Frontend API Caching ও SWR (Stale-While-Revalidate) আরএফসি প্রোটোকল কীভাবে কাজ করে?",
      m: "HTTP RFC 5861 স্ট্যান্ডার্ড অনুযায়ী SWR স্ট্র্যাটেজি প্রথমে ব্রাউজার ক্যাশে থাকা পুরানো (Stale) ডেটা ইউজারকে তাৎক্ষণিক চোখের পলকে স্ক্রিনে দেখায় (জিরো লোডিং টাইম)। এরপর ব্যাকগ্রাউন্ডে নিরবে সার্ভারে এপিআই কল চালিয়ে ফ্রেশ ডেটা ফেচ করে (Revalidate)। ডাটা আসার পর ক্যাশ আপডেট করে স্ক্রিনের দৃশ্যমান পরিবর্তন স্মুথলি রিফ্লেক্ট করে। এর ফলে ইউজারকে কখনোই ফাঁকা লোডার বা স্পিনার দেখে অপেক্ষা করতে হয় না।",
      b: "SWR কৌশল প্রথমে ক্যাশে থাকা আগের ডাটা তৎক্ষণাৎ ব্যবহারকারীকে প্রদর্শন করে। একই সাথে ব্যাকগ্রাউন্ডে নতুন ডাটা ফেচ করে ক্যাশ ও স্ক্রিন আপডেট করে, ফলে ব্যবহারকারীকে কোনো লোডিং স্পিনার দেখতে হয় না।",
      e: "The Stale-While-Revalidate (RFC 5861) protocol delivers instantaneous UI feedback by immediately rendering cached stale data while dispatching an asynchronous revalidation fetch to reconcile the cache with upstream changes.",
      code: "import useSWR from 'swr';\nconst { data, error, isLoading } = useSWR('/api/analytics', fetcher);"
    },
    {
      lvl: "lvl3",
      q: "Dashboard Data Visualization-এ হাজার হাজার লাইভ চার্ট ডেটা পয়েন্ট রেন্ডার করার সময় Canvas বনাম SVG-এর আর্কিটেকচারাল সিদ্ধান্ত কী হবে?",
      m: "SVG প্রতিটি ডেটা পয়েন্টের জন্য আলাদা আলাদা DOM নোড তৈরি করে। ১০০০-এর বেশি ডেটা পয়েন্ট থাকলে ব্রাউজার ডম ট্রি ভারী হয়ে ল্যাগ করে এবং ফ্রেম ড্রপ হয়। কিন্তু HTML Canvas হলো পিক্সেল-বেসড বিটম্যাপ—তাতে ১০ লক্ষ ডেটা পয়েন্ট থাকলেও DOM-এ মাত্র একটি `<canvas>` নোড থাকে। তাই জটিল অ্যানিমেশন ও লাইভ হাই-ফ্রিকোয়েন্সি স্টক বা আইওটি চার্টের জন্য Canvas (যেমন Chart.js বা ECharts) বেছে নেব; আর সিম্পল ইন্টারেক্টিভ ও অ্যাক্সেসিবল চার্টের জন্য SVG (যেমন Recharts) ব্যবহার করব।",
      b: "এসভিজি প্রতি ডেটা পয়েন্টে ডম নোড তৈরি করে যা হাজার হাজার রেকর্ডে ব্রাউজার স্লো করে দেয়। ক্যানভাস মাত্র একটি একক নোডে পিক্সেল ড্র করে, ফলে লক্ষাধিক লাইভ ডেটা থাকলেও কোনো ফ্রেম ড্রপ ছাড়াই মসৃণ পারফরম্যান্স নিশ্চিত হয়।",
      e: "SVG generates distinct DOM nodes per data point, inducing performance bottlenecks beyond 1,000 entities. Canvas draws directly to a pixel bitmap under a single DOM node, handling millions of live telemetry coordinates with ease. Use Canvas for dense live feeds and SVG for declarative UI widgets.",
      tip: "চার্ট সিলেকশনে 'DOM Node overhead in SVG vs Bitmap rendering in Canvas' ব্যাখ্যা করা নিখুঁত সিনিয়র ডিসিশন।"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "ইউজার ড্যাশবোর্ডে কাজ করতে করতে ব্রাউজার ট্যাব ২০ মিনিট খোলা রেখে অন্য ট্যাবে চলে গেল। ফিরে এসে কোনো অ্যাকশন নেওয়ার সময় তার সেশন এক্সপায়ার হয়ে সব ড্রাফট হারিয়ে যাওয়ার ঝুঁকিতে পড়ল। কীভাবে ফিক্স করবে?",
      m: "সমাধান: (১) আমরা ব্রাউজারের `Page Visibility API` এবং একটি সেশন অ্যাক্টিভিটি টাইমার ব্যবহার করব। (২) ট্যাব ফিরে আসলে যদি টোকেনের মেয়াদ উত্তীর্ণের কাছাকাছি থাকে, তবে ব্যাকগ্রাউন্ডে সাইলেন্টলি রিফ্রেশ টোকেন কল করে নতুন সেশন রিনিউ করব। (৩) যদি রিফ্রেশ টোকেনও মেয়াদোত্তীর্ণ হয়ে যায়, তবে ইউজারকে লগআউট করার আগে একটি 'Session Expired' মডাল দেখাব যাতে সে পাসওয়ার্ড দিয়ে সেশন রিনিউ করতে পারে এবং তার স্ক্রিনের ফর্মের ড্রাফট ডেটা সম্পূর্ণ অক্ষত থাকে।",
      b: "ট্যাব ফিরে পাওয়ার পর সেশন শেষ হওয়ার আগেই সাইলেন্ট টোকেন রিফ্রেশ চালাতে হবে। যদি লগইন আবশ্যক হয়, তবে ড্রাফট ডাটা না মুছে স্ক্রিনের ওপরেই সেশন এক্সপায়ার্ড মডাল পপআপ করে পাসওয়ার্ড দিয়ে সেশন চালু রাখতে দিতে হবে।",
      e: "Listen to the `visibilitychange` event to inspect session validity upon tab refocus, preemptively triggering a silent token refresh. If the refresh window elapsed, launch an in-place re-authentication modal preserving existing form state.",
      code: "if (isTokenExpiringSoon()) await silentRefresh();"
    },
    {
      lvl: "situation",
      q: "একটি এপিআই এন্ডপয়েন্ট মাঝে মাঝে 500 Internal Server Error অথবা 504 Gateway Timeout দিচ্ছে এবং ব্যবহারকারী ব্রোকেন UI দেখে বিভ্রান্ত হচ্ছে। ক্লায়েন্ট এপিআই লেয়ারে কীভাবে রেজিলিয়েন্স আনবে?",
      m: "সমাধান: (১) Axios বা TanStack Query-তে অটোমেটিক ৩ বার এক্সপোনেনশিয়াল ব্যাকঅফ রিট্রাই সেট করব। (২) গ্লোবাল এরর বাউন্ডারি এবং টোস্ট নোটিফিকেশনে স্পষ্ট ভাষায় ইউজার ফ্রেন্ডলি মেসেজ দেখাব ('সার্ভারে কাজ চলছে, কিছুক্ষণ পর আবার চেষ্টা করুন')। (৩) সার্কিট ব্রেকার প্যাটার্ন অনুযায়ী সার্ভার ডাউন থাকলে বারবার রিকোয়েস্ট পাঠানো সাময়িকভাবে পজ রাখব যাতে ক্লাউড সার্ভার ট্রাফিকের চাপে আরও বেশি ক্র্যাশ না করে।",
      b: "এপিআই রেজিলিয়েন্স বাড়াতে ৩ বার অটো-রিট্রাই কনফিগার করতে হবে। ব্যর্থ হলে ব্যবহারকারীকে স্পষ্ট নির্দেশনামূলক বার্তা দিয়ে একটি 'পুনরায় চেষ্টা করুন' বাটন দিতে হবে যাতে ইউজার অভিজ্ঞতা বজায় থাকে।",
      e: "Configure automatic exponential retries for 5xx errors via TanStack Query. Display user-friendly fallback boundaries featuring actionable retry buttons while employing circuit breakers to halt repeated failing network spam.",
      code: "const { data, refetch } = useQuery({\n  queryKey: ['sales'],\n  queryFn: fetchSales,\n  retry: 3,\n  retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000)\n});"
    },
    {
      lvl: "situation",
      q: "একজন ব্যবহারকারী ব্রাউজারের ডেভটুলস দিয়ে লোকাল স্টোরেজে তার রোল `'CASHIER'` থেকে বদলে ম্যানুয়ালি `'SUPER_ADMIN'` করে ফেলল। কীভাবে ফ্রন্টএন্ড এবং ব্যাকএন্ড এই হ্যাক প্রতিরোধ করবে?",
      m: "প্রথম নিয়ম: ফ্রন্টএন্ড সিকিউরিটি শুধুমাত্র ইউজার ইন্টারফেস প্রদর্শনের জন্য; আসল সিকিউরিটি সবসময় ব্যাকএন্ডে থাকে। ফ্রন্টএন্ডে রোল পরিবর্তন করলেও যখনই সে কোনো অ্যাডমিন এপিআই কল করবে, সার্ভার ইনকামিং JWT টোকেনের ক্রিপ্টোগ্রাফিক ডিজিটাল সিগনেচার (Secret Key) ভ্যালিডেট করবে। টোকেনের ভেতরের রোল পরিবর্তন করার ক্ষমতা ব্রাউজারের নেই। সার্ভার সাথে সাথে সিগনেচার মিসম্যাচ দেখে `403 Forbidden` রিটার্ন করবে এবং অ্যাকাউন্ট সাসপেন্ড করবে।",
      b: "লোকাল স্টোরেজ পরিবর্তন করলেও ব্যাকএন্ড প্রতিটি এপিআই রিকোয়েস্টে ক্রিপ্টোগ্রাফিক ডিজিটাল সিগনেচার যাচাই করে। সার্ভারের সিক্রেট কি ছাড়া টোকেন এডিট করা অসম্ভব হওয়ায় কোনো হ্যাক কার্যকর হবে না এবং সার্ভার তৎক্ষণাৎ 403 এরর দিয়ে রিকোয়েস্ট আটকে দেবে।",
      e: "Client-side manipulation cannot forge cryptographic JWT signatures signed by the backend secret. When manipulated roles attempt administrative API calls, the backend rejects the invalid token signature with a 403 Forbidden, rendering client-side spoofing harmless.",
      tip: "ইন্টারভিউতে বলবে: 'Never trust client-side state. The frontend controls visibility, but the backend strictly guarantees security'."
    },
    {
      lvl: "situation",
      q: "ড্যাশবোর্ডের বিভিন্ন পেজ নেভিগেট করার সময় পূর্বের পেজের চলমান ভারী এপিআই রিকোয়েস্টগুলো ব্যাকগ্রাউন্ডে চলতে থেকে ব্যান্ডউইথ নষ্ট করছে। সমাধান কী?",
      m: "আমরা `AbortController` ব্যবহার করব। প্রতিটি পেজ বা কম্পোনেন্ট আনমাউন্ট হওয়ার সময় তার অ্যাসিনক্রোনাস রিকোয়েস্টগুলোর সিগন্যালে `controller.abort()` ফায়ার করব। TanStack Query ব্যবহার করলে এটি স্বয়ংক্রিয়ভাবে কম্পোনেন্ট আনমাউন্টে চলমান নেটওয়ার্ক ফেচিং বাতিল করে দেয়, ফলে ব্যান্ডউইথ সাশ্রয় হয়।",
      b: "পেজ পরিবর্তনের সময় পূর্বের এপিআই কল বাতিল করতে AbortController এর সিগন্যাল ব্যবহার করতে হবে যাতে কম্পোনেন্ট আনমাউন্ট হওয়ার সাথে সাথে ব্রাউজার অপ্রয়োজনীয় নেটওয়ার্ক রিকোয়েস্ট ড্রপ করে দেয়।",
      e: "Attach an AbortController signal to ongoing fetch calls and trigger `controller.abort()` in the unmount cleanup cycle. TanStack Query automatically aborts unmounted in-flight requests natively.",
      code: "const controller = new AbortController();\naxios.get('/api/heavy-report', { signal: controller.signal });\n// On unmount: controller.abort();"
    },
    {
      lvl: "situation",
      q: "বিভিন্ন ক্লায়েন্টের ড্যাশবোর্ডে তাদের নিজস্ব ব্র্যান্ডিং (লোগো, থিম কালার, কাস্টম উইজেট) রানটাইমে ডায়নামিকালি লোড করতে হবে। কীভাবে ফ্রন্টএন্ড আর্কিটেকচার ডিজাইন করবে?",
      m: "আমরা 'Dynamic Theme Injection & Component Factory' প্যাটার্ন ব্যবহার করব। ব্যবহারকারী লগইন করার পর টেন্যান্ট প্রোফাইল থেকে ব্র্যান্ড কালার কোড ও উইজেট কনফিগ ফেচ করে রুট এলিমেন্টের CSS ভ্যারিয়েবলে ইনজেক্ট করব (`document.documentElement.style.setProperty('--brand-color', config.primaryColor)`। আর উইজেটগুলোর জন্য একটি ডায়নামিক কম্পোনেন্ট রেজিস্ট্রি রাখব যা কনফিগ অ্যারের ওপর ভিত্তি করে নির্দিষ্ট উইজেট রেন্ডার করবে।",
      b: "ডায়নামিক ব্র্যান্ডিংয়ের জন্য সিএসএস কাস্টম প্রপার্টি (CSS Variables) রানটাইমে ইনজেক্ট করা হয়। কম্পোনেন্ট ফ্যাক্টরির মাধ্যমে কনফিগারেশন অনুযায়ী সঠিক উইজেটগুলো ড্যাশবোর্ডে মাউন্ট করা হয়।",
      e: "Inject tenant branding at runtime by assigning CSS custom properties (`--brand-primary`) to the document root based on the authenticated tenant's configuration payload, pairing with a dynamic component registry to render tenant-selected widgets.",
      code: "document.documentElement.style.setProperty('--brand-color', tenant.primaryColor);"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর মাল্টি-স্টোর SaaS-এ ক্যাশিয়ার, ম্যানেজার এবং সুপার অ্যাডমিনের জন্য ড্যাশবোর্ড মেনু ও পারমিশন সিস্টেম কীভাবে আর্কিটেক্ট করেছিলে?",
      m: "আমরা একটি সেন্ট্রালাইজড `NavigationSchema` তৈরি করেছি যেখানে প্রতিটি রুটের জন্য প্রয়োজনীয় পারমিশন তালিকাভুক্ত ছিল: যেমন `{ path: '/reports', permission: 'reports:view' }`। সাইডবার রেন্ডার করার সময় ইউজারের JWT টোকেন থেকে ডিকোড করা পারমিশন সেটের সাথে ফিল্টার করে কেবল অনুমোদিত মেনুগুলোই দেখানো হতো। ক্যাশিয়ার যখন ঢুকত, সে শুধু POS বিলিং এবং সেলস হিস্ট্রি দেখতে পেত; ইনভেন্টরি এডিট বা প্রফিট রিপোর্ট তার ইন্টারফেসে সম্পূর্ণ অদৃশ্য থাকত।",
      b: "দোকানি সিস্টেমে আমরা নেভিগেশন স্কিমা ও পারমিশন সেটের সমন্বয়ে মেনু ফিল্টারিং নিশ্চিত করেছি। ক্যাশিয়ার কেবল বিক্রয় ও বিলিং মেনু পেত, অন্যদিকে মুনাফা ও ইনভেন্টরির মতো সংবেদনশীল মেনুগুলো শুধুমাত্র মালিক ও ম্যানেজারের জন্য দৃশ্যমান হতো।",
      e: "In Dokani POS SaaS, navigation trees were filtered against the user's decoded permission array at the layout boundary. Cashiers received only billing routes while financial reports and purchase ledgers were culled entirely from the DOM.",
      tip: "ক্যাশিয়ারের স্ক্রিনে আনঅথোরাইজড অপশন লুকানো এবং ব্যাকএন্ডে গার্ড রাখা রিয়েল-লাইফ পজ আর্কিটেকচারের ক্লাসিক উদাহরণ।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ শত শত সেলস ইনভয়েস ডেটা টেবিল রেন্ডার করার সময় কলাম সর্টিং, পেজিনেশন এবং গ্লোবাল সার্চ কীভাবে এপিআই-এর সাথে অপটিমাইজ করেছিলে?",
      m: "আমরা TanStack Table v8 এর সাথে TanStack Query ইন্টিগ্রেট করেছি। লোকাল সাইড ফিল্টারিং না করে আমরা সার্ভার-সাইড পেজিনেশন ও সর্টিং করেছি (`/api/invoices?page=1&limit=25&sort=createdAt&order=desc&q=term`)। সার্চ ইনপুটে ৩০০ মিলিসেকেন্ড ডিবউন্সিং রেখেছি। আর প্রি-ফেচিং আর্কিটেকচার দিয়ে ইউজার যখন পেজ ১-এ থাকে, আমরা ব্যাকগ্রাউন্ডে পেজ ২-এর ডেটা প্রি-ফেচ করে রেখেছি—ফলে পরবর্তী পেজে ক্লিক করা মাত্র জিরো ল্যাগে চোখের পলকে টেবিল রেন্ডার হয়েছে।",
      b: "দোকানি ইনভয়েস টেবিলে সার্ভার-সাইড পেজিনেশন ও ডিবউন্সড সার্চ ব্যবহার করা হয়েছিল। ট্যানস্ট্যাক টেবিল ও কোয়েরির সমন্বয়ে পরবর্তী পেজের ডেটা প্রি-ফেচ করে রাখায় পেজ পরিবর্তনে কোনো লোডিং সময় লাগত না।",
      e: "Paired TanStack Table v8 with TanStack Query for server-side pagination and debounced searching. Implemented query prefetching for adjacent pages (`page + 1`), giving cashiers instantaneous, zero-latency pagination transitions.",
      code: "queryClient.prefetchQuery(['invoices', page + 1], () => fetchInvoices(page + 1));"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে লাইভ ক্লাস চলাকালীন শিক্ষক ও ছাত্রের রোল পারমিশন এবং ভিডিও স্ট্রিমিং অ্যাক্সেস কন্ট্রোল ফ্রন্টএন্ডে কীভাবে সুরক্ষিত রাখা হয়েছিল?",
      m: "আমরা WebRTC এবং Socket.io-তে রোল-বেসড চ্যানেল আর্কিটেকচার ব্যবহার করেছি। শিক্ষক লগইন করলে তাকে হোস্ট অথেনটিকেশন কি দেওয়া হতো যা দিয়ে সে স্ক্রিন শেয়ার, মিউট অল এবং রেকর্ড অপশন পেত। ছাত্ররা শুধু লিসেনার রোলে জয়েন করতে পারত। ক্লাসের সময় শেষ হলে সার্ভার থেকে ব্রডকাস্ট মেসেজ আসার সাথে সাথে ফ্রন্টএন্ড প্লেয়ার সুরক্ষিতভাবে আনমাউন্ট হয়ে ফিডব্যাক ফর্মে রিডাইরেক্ট হতো।",
      b: "পিটিটিএবিডি লাইভ ক্লাসে শিক্ষককে হোস্ট কি দিয়ে সম্পূর্ণ নিয়ন্ত্রণ দেওয়া হতো এবং ছাত্ররা অডিয়েন্স পারমিশনে ক্লাসে অংশগ্রহণ করত। সেশন শেষ হওয়ামাত্র স্বয়ংক্রিয়ভাবে ভিডিও প্লেয়ার বন্ধ হয়ে স্টুডেন্ট ফিডব্যাক পেজে চলে যেত।",
      e: "Enforced WebRTC / Socket.io channel authorization in PTTABD: instructors were granted host tokens enabling screen sharing and participant muting, whereas students were restricted to subscriber sinks with automated session termination.",
      tip: "এড-টেক অ্যাপ্লিকেশনে হোস্ট বনাম পার্টিসিপেন্ট রোল সেগ্রিগেশন চমৎকার প্রোডাকশন অভিজ্ঞতা তুলে ধরে।"
    },
    {
      lvl: "realworld",
      q: "ড্যাশবোর্ডের বিভিন্ন উইজেট থেকে এপিআই কল করার সময় গ্লোবাল লোডিং স্পিনার পুরো স্ক্রিন ফ্রিজ না করে কীভাবে মাইক্রো-লোডিং স্টেট ম্যানেজ করেছিলে?",
      m: "আমরা একটি ফুল-স্ক্রিন ব্লকিং স্পিনারের বদলে 'Skeleton Shimmer + Localized Loading Spinners' আর্কিটেকচার ব্যবহার করেছি। ড্যাশবোর্ডের প্রতিটি কার্ড বা উইজেট ছিল সম্পূর্ণ স্বাধীন এবং তার নিজস্ব ডেটা ফেচিং স্টেট নিয়ন্ত্রণ করত। এর ফলে সেলস চার্ট লোড হতে দেরি হলেও ইনভেন্টরি উইজেট বা নোটিফিকেশন বার তৎক্ষণাৎ দৃশ্যমান ছিল—ইউজারের ব্রাউজিং কখনোই ব্লক হয়নি।",
      b: "পুরো স্ক্রিন ফ্রিজ না করে প্রতিটি উইজেটে আলাদা স্কেলেটন লোডার ব্যবহার করা হয়েছিল। একটি উইজেটের ডাটা স্লো থাকলেও অন্য উইজেটগুলো স্বাধীনভাবে রেন্ডার হয়ে ইউজারকে কাজ চালিয়ে যাওয়ার পূর্ণ স্বাধীনতা দিয়েছিল।",
      e: "Abolished monolithic screen-blocking loaders in favor of localized, widget-scoped Skeleton loaders powered by React Suspense boundaries. Sluggish endpoints were isolated without delaying peer dashboard metrics.",
      code: "<div className='grid grid-cols-3'>\n  <Suspense fallback={<CardSkeleton />}><SalesWidget /></Suspense>\n  <Suspense fallback={<CardSkeleton />}><StockWidget /></Suspense>\n</div>"
    },
    {
      lvl: "realworld",
      q: "Git & GitHub টিম ওয়ার্কফ্লো: বড় ড্যাশবোর্ড প্রজেক্টে ৫ জন ডেভেলপারের সমান্তরাল ফিচারে কাজ করার সময় কোড কনফ্লিক্ট রোধ ও কোয়ালিটি কীভাবে নিশ্চিত করেছিলে?",
      m: "আমরা 'GitHub Flow & Trunk-Based Development' মেনে চলেছি: (১) মূল `main` ব্রাঞ্চে সরাসরি পুশ কঠোরভাবে ব্লক করা ছিল (`Branch Protection Rules`)। (২) প্রতিটি ফিচারের জন্য আলাদা ব্রাঞ্চ (`feat/pos-cart`, `fix/login-token`) খুলে Pull Request (PR) তৈরি করা হতো। (৩) GitHub Actions CI পাইপলাইনে স্বয়ংক্রিয়ভাবে `npm run lint`, `tsc --noEmit`, এবং টেস্ট কেস রান হতো; কোনো একটি ফেইল করলে পিআর মার্জ ব্লক থাকত। (৪) ন্যূনতম ১ জন সিনিয়র ইঞ্জিনিয়ারের অনুমোদন ছাড়া কোড মার্জ হতো না।",
      b: "টিম ওয়ার্কফ্লোতে আমরা গিটহাব ব্রাঞ্চ প্রটেকশন রুলস প্রয়োগ করেছি। প্রতিটি ফিচারের জন্য আলাদা পিআর (PR) এবং সিআই পাইপলাইনে লিন্ট ও টাইপস্ক্রিপ্ট টাইপ চেক সফল হওয়া বাধ্যতামূলক ছিল। কোড রিভিউয়ের মাধ্যমে সর্বোচ্চ গুণমান রক্ষা করা হয়েছিল।",
      e: "Enforced trunk-based GitHub flow with protected main branches, requiring feature branches (`feat/pos-cart`), mandatory PR reviews, and automated GitHub Actions CI checking ESLint, TypeScript types (`tsc --noEmit`), and unit tests prior to merge.",
      tip: "ইন্টারভিউতে ব্রাঞ্চিং স্ট্র্যাটেজি, পিআর রিভিউ কালচার এবং সিআই গেট চেকিংয়ের কথা বলা টিম লিডারশিপের প্রমাণ দেয়।"
    }
  ]
};
