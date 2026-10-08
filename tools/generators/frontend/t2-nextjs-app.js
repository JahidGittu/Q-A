// Topic 2: Next.js 15+ App Router & Architecture (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "nextjs-app-router",
  name: "Next.js 15+ App Router & Architecture",
  desc: "App Router, Server Components (RSC), Client Components, SSR, SSG, ISR, Server Actions, Caching Lifecycle, Middleware",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Next.js-এর Pages Router এবং App Router-এর মধ্যে প্রধান পার্থক্য কী এবং App Router কেন আধুনিক স্ট্যান্ডার্ড?",
      m: "Pages Router-এ ফাইল বেসড রাউটিং ছিল `pages/` ডিরেক্টরিতে এবং প্রতিটি পেজ ছিল মূলত ক্লায়েন্ট কম্পোনেন্ট যেখানে SSR-এর জন্য getServerSideProps লাগত। আর App Router (`app/` ডিরেক্টরি) তৈরি হয়েছে React Server Components (RSC) এর ওপর ভিত্তি করে। এতে বাই-ডিফল্ট সব কম্পোনেন্ট সার্ভারেই রেন্ডার হয়, নেস্টেড লেআউট (`layout.tsx`) সমর্থন করে, ডেটা ফেচিং সরাসরি কম্পোনেন্টে `async/await` দিয়ে করা যায় এবং ব্রাউজারে অপ্রয়োজনীয় জাভাস্ক্রিপ্ট পাঠানো লাগে না।",
      b: "অ্যাপ রাউটার এবং পেজেস রাউটারের মূল পার্থক্য হলো সার্ভার কম্পোনেন্টের ব্যবহার। অ্যাপ রাউটারে বাই-ডিফল্ট সব কম্পোনেন্ট সার্ভার কম্পোনেন্ট হিসেবে কাজ করে, যা ক্লায়েন্ট বান্ডেল সাইজ অনেক কমিয়ে দেয়। তাছাড়া নেস্টেড লেআউট, স্ট্রিমিং এবং এরর বাউন্ডারি অ্যাপ রাউটারে স্বয়ংক্রিয়ভাবে পরিচালিত হয়।",
      e: "Pages Router operates primarily around client-side rendering with getServerSideProps / getStaticProps APIs, whereas App Router is built on React Server Components (RSC). In App Router, components are server-first by default, supporting nested layouts, streaming via Suspense, and co-located loading and error states.",
      tip: "ইন্টারভিউতে স্পষ্ট বলবে: 'Next.js 14/15-এ App Router হলো প্রোডাকশন স্ট্যান্ডার্ড এবং বাই-ডিফল্ট সব কম্পোনেন্ট সার্ভার কম্পোনেন্ট'।"
    },
    {
      lvl: "lvl1",
      q: "Next.js-এ Server Components এবং Client Components-এর মধ্যে পার্থক্য কী? কখন `'use client'` দিতে হয়?",
      m: "Server Components (বাই-ডিফল্ট) কেবল সার্ভারে এক্সিকিউট হয়; এগুলোতে কোনো স্টেট (`useState`), ইফেক্ট (`useEffect`), বা ব্রাউজার ইভেন্ট হ্যান্ডলার (`onClick`) ব্যবহার করা যায় না। আর যখনই আমাদের ইউজার ইন্টারঅ্যাকশন (যেমন বাটন ক্লিক, ফর্ম ইনপুট, লোকাল স্টোরেজ এক্সেস বা রিঅ্যাক্ট হুক) প্রয়োজন হয়, তখন ফাইলের সবার ওপরে `'use client'` ডিরেক্টিভ দিতে হয়।",
      b: "সার্ভার কম্পোনেন্ট সার্ভারে রেন্ডার হয়ে কেবল এইচটিএমএল ও আরএসসি ডাটা ব্রাউজারে পাঠায়। ক্লায়েন্ট কম্পোনেন্টে ইন্টারঅ্যাক্টিভিটি, ইভেন্ট লিসেনার এবং হুক ব্যবহার করা যায়। ফাইলের একদম শুরুতে 'use client' লিখে রিঅ্যাক্টকে জানাতে হয় যে এই কম্পোনেন্টটি ব্রাউজারে হাইড্রেট হবে।",
      e: "Server Components run exclusively on the server with zero client JS footprint, but cannot use hooks, state, or DOM event listeners. Client Components, marked with 'use client' at the top of the file, are hydrated in the browser to enable interactivity, state, and client hooks.",
      code: "'use client';\nimport { useState } from 'react';\nexport function Counter() {\n  const [count, setCount] = useState(0);\n  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;\n}"
    },
    {
      lvl: "lvl1",
      q: "Next.js-এ রেন্ডারিং স্ট্র্যাটেজি: SSR, SSG, এবং ISR-এর মধ্যে মূল পার্থক্য কী?",
      m: "SSR (Server-Side Rendering) প্রতিটা ইউজারের রিকোয়েস্টে অন-ডিমান্ড সার্ভারে পেজ তৈরি করে। SSG (Static Site Generation) বিল্ড টাইমে একবারেই সব পেজ এইচটিএমএল আকারে বানিয়ে রাখে যা খুব দ্রুত লোড হয়। আর ISR (Incremental Static Regeneration) হলো দুটির হাইব্রিড—বিল্ডের পর পেজ স্ট্যাটিক থাকে, কিন্তু ব্যাকগ্রাউন্ডে নির্দিষ্ট সময় পর পর (যেমন `revalidate: 60`) পেজকে আবার রি-জেনারেট করে নতুন ডাটা দিয়ে ক্যাশ আপডেট করে।",
      b: "এসএসআর প্রতিটি ব্যবহারকারীর রিকোয়েস্টে লাইভ ডাটা দিয়ে সার্ভারে পেজ রেন্ডার করে। এসএসজি বিল্ডের সময় স্ট্যাটিক এইচটিএমএল তৈরি করে যা সিডিএন থেকে দ্রুততম গতিতে সার্ভ হয়। আইএসআর স্ট্যাটিক পেজকে পুনরায় সম্পূর্ণ বিল্ড না করেই ব্যাকগ্রাউন্ডে নির্দিষ্ট সময় পরপর স্বয়ংক্রিয়ভাবে রিভ্যালিডেট করে ক্যাশ আপডেট করে।",
      e: "SSR renders HTML dynamically on every request. SSG pre-renders static HTML at build time for blistering CDN speeds. ISR combines the best of both by statically caching pages while regenerating them in the background at specified intervals (e.g., every 60s) without rebuilding the whole app.",
      code: "// ISR in Next.js App Router:\nexport const revalidate = 60; // Revalidate every 60 seconds"
    },
    {
      lvl: "lvl1",
      q: "Next.js-এর স্পেশাল ফাইল কনভেনশনগুলো কী কী (layout, page, loading, error, not-found)?",
      m: "App Router-এ নির্দিষ্ট ফাইলের নাম দিয়ে স্পেশাল রাউটিং লজিক হয়: `page.tsx` হলো মূল রাউটের UI; `layout.tsx` একাধিক পেজের কমন লেআউট যা পেজ ট্রানজিশনে রি-রেন্ডার হয় না; `loading.tsx` হলো স্বয়ংক্রিয় Suspense ফলব্যাক যা পেজ লোড হওয়ার সময় স্কেলেটন দেখায়; `error.tsx` হলো এরর বাউন্ডারি যা রানিং এরর ক্যাচ করে; এবং `not-found.tsx` হলো ৪MD পেজের জন্য ফলব্যাক UI।",
      b: "নেক্সট জেএস ফোল্ডার ভিত্তিক স্পেশাল ফাইল আর্কিটেকচার মেনে চলে: page.tsx রাউটের দৃশ্যমান পৃষ্ঠা, layout.tsx স্থায়ী কাঠামো বা লেআউট, loading.tsx লোডিং স্কেলেটন, error.tsx রানটাইম এরর হ্যান্ডলিং বাউন্ডারি, এবং not-found.tsx ৪০৪ পেজের কাস্টম ইন্টারফেস প্রদান করে।",
      e: "Next.js App Router reserves special file names: page.tsx defines the unique route UI, layout.tsx wraps pages and preserves state across navigations, loading.tsx sets an automatic React Suspense boundary, error.tsx acts as a Client Component error boundary, and not-found.tsx handles 404 views.",
      tip: "error.tsx ফাইলটি অবশ্যই ক্লায়েন্ট কম্পোনেন্ট হতে হবে (`'use client'`), অন্যথায় নেক্সট জেএস বিল্ড এরর দেবে।"
    },
    {
      lvl: "lvl1",
      q: "Next.js App Router-এ সরাসরি সার্ভার কম্পোনেন্টে কীভাবে ডাটা ফেচ করা হয়?",
      m: "সার্ভার কম্পোনেন্টে সরাসরি সাধারণ `async/await` এবং নেটিভ `fetch()` ব্যবহার করা যায়। কোনো useEffect বা axios লাগে না। নেক্সট জেএস ফেচ এপিআইকে এক্সটেন্ড করেছে, যার ফলে আমরা ক্যাশিং অপশন খুব সহজে সেট করতে পারি (যেমন: `{ cache: 'no-store' }` ফর ডায়নামিক ডাটা অথবা `{ next: { revalidate: 3600 } }` ফর ক্যাশড ডাটা)।",
      b: "সার্ভার কম্পোনেন্টে কোনো useEffect ছাড়াই সরাসরি async ফাংশন লিখে নেটিভ fetch কল করা যায়। নেক্সট জেএস ফেচ রিকোয়েস্টকে ক্যাশ এবং রিভ্যালিডেশন সুবিধাসহ অপটিমাইজ করে সরবরাহ করে।",
      e: "Server Components natively support async/await. You can directly fetch data inside the component body using extended fetch(), configuring caching behaviors with { cache: 'no-store' } or { next: { revalidate: 3600 } }.",
      code: "export default async function ProductPage({ params }: { params: { id: string } }) {\n  const res = await fetch(`https://api.dokani.com/products/${params.id}`);\n  const product = await res.json();\n  return <div>{product.name}</div>;\n}"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Next.js-এর Server Actions কী এবং কীভাবে এটি ফর্ম সাবমিশন বা মিউটেশনকে সহজ করে?",
      m: "Server Actions হলো সার্ভার-সাইড অ্যাসিনক্রোনাস ফাংশন যা সরাসরি কম্পোনেন্ট ফাইল থেকে বা সার্ভার অ্যাকশন ফাইল (`'use server'`) থেকে কল করা যায়। আলাদা কোনো API রাউট (`/api/items`) তৈরি না করেই ক্লায়েন্ট ফর্ম থেকে সরাসরি সার্ভারে ডাটাবেজ অপারেশন চালানো যায়। সাবমিশনের পর `revalidatePath('/dashboard')` কল করলে UI-তে তৎক্ষণাৎ ক্যাশ আপডেট হয়ে যায়।",
      b: "সার্ভার অ্যাকশন হলো সার্ভারে এক্সিকিউট হওয়া ফাংশন যা 'use server' দিয়ে চিহ্নিত করা হয়। এর মাধ্যমে ক্লায়েন্ট ফর্ম সরাসরি সার্ভার ফাংশন কল করে ডাটাবেজ আপডেট করতে পারে, ফলে আলাদা এপিআই হ্যান্ডলার তৈরির ঝামেলা থাকে না।",
      e: "Server Actions are asynchronous functions executed on the server, marked with 'use server'. They allow direct server-side mutations from client forms or event handlers without writing dedicated REST API routes, followed by instant cache invalidation via revalidatePath.",
      code: "'use server';\nimport { revalidatePath } from 'next/cache';\nexport async function createItem(formData: FormData) {\n  const title = formData.get('title');\n  await db.item.create({ data: { title } });\n  revalidatePath('/items');\n}"
    },
    {
      lvl: "lvl2",
      q: "Next.js Middleware কী এবং এটি রিকোয়েস্ট লাইফসাইকেলে কখন এক্সিকিউট হয়?",
      m: "Middleware হলো একটি এজ-ফাংশন (Edge Function) যা রিকোয়েস্ট কমপ্লিট হওয়ার আগেই রিকোয়েস্ট ও রেসপন্সের মাঝখানে রান হয় (যেমন রুট ডিরেক্টরিতে `middleware.ts`)। এটি মূলত অথেনটিকেশন চেক, কুকি ভেরিফিকেশন, ইউজার রোল অনুযায়ী রিডাইরেক্ট করা, অথবা জিও-লোকেশন অনুযায়ী হেডার সেট করার জন্য ব্যবহার করা হয়। এটি পুরো পেজ রেন্ডার হওয়ার আগেই এক্সিকিউট হয়, তাই পারফরম্যান্স অত্যন্ত দ্রুত।",
      b: "মিডলওয়্যার হলো এমন কোড যা কোনো রিকোয়েস্ট মূল পেজ বা এপিআইতে পৌঁছানোর আগেই ইন্টারসেপ্ট করে। এটি ব্যবহারকারীর সেশন বা টোকেন যাচাই করে সুরক্ষিত রাউটে প্রবেশের অনুমতি দেয় অথবা লগইন পেজে রিডাইরেক্ট করে।",
      e: "Next.js Middleware (middleware.ts) runs on Edge runtime before a request completes. It intercepts incoming HTTP requests to handle route protection, JWT authentication checks, response header manipulation, and conditional redirects.",
      code: "export function middleware(request: NextRequest) {\n  const token = request.cookies.get('token')?.value;\n  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {\n    return NextResponse.redirect(new URL('/login', request.url));\n  }\n}"
    },
    {
      lvl: "lvl2",
      q: "Next.js 15-এ Caching বিহেভিয়ারে কী বড় পরিবর্তন এসেছে (Uncached by Default)?",
      m: "Next.js 14-এ fetch রিকোয়েস্ট এবং রাউট হ্যান্ডলারগুলো বাই-ডিফল্ট অ্যাগ্রেসিভ ক্যাশিং করত (`force-cache`)। এতে অনেক ডেভেলপার ডাইনামিক ডেটা মিস করত বা অপ্রত্যাশিত পুরানো ডাটা পেত। Next.js 15-এ এটিকে রিভার্স করে 'Uncached by Default' করা হয়েছে—এখন fetch রিকোয়েস্ট, `GET` রাউট হ্যান্ডলার এবং ক্লায়েন্ট নেভিগেশন ক্যাশ বাই-ডিফল্ট ক্যাশ হয় না, যদি না ডেভেলপার স্পষ্টভাবে ক্যাশ করতে বলে।",
      b: "নেক্সট জেএস ১৫-এ ডিফল্ট ক্যাশিং নীতি পরিবর্তন করে বাই-ডিফল্ট ক্যাশিং বন্ধ করা হয়েছে। আগে ফেচ রিকোয়েস্ট স্বয়ংক্রিয়ভাবে ক্যাশ হয়ে যেত, কিন্তু নতুন ভার্সনে ডেভেলপার স্পষ্ট নির্দেশ না দেওয়া পর্যন্ত ডাটা ক্যাশ হয় না, ফলে লাইভ ডাটা সবসময় আপ-টু-ডেট থাকে।",
      e: "In Next.js 15, caching defaults shifted from aggressively cached to uncached by default. Fetch requests, GET Route Handlers, and client-side page router navigations no longer cache unless explicitly configured with cache: 'force-cache' or revalidate settings.",
      tip: "Next.js 15 এর আন-ক্যাশড ডিফল্ট বিহেভিয়ার ইন্টারভিউতে বললে ইন্টারভিউয়ার বুঝবে তুমি একদম লেটেস্ট রিলিজের সাথে আপ-টু-ডেট।"
    },
    {
      lvl: "lvl2",
      q: "Dynamic Routes এবং Catch-all Routes কীভাবে তৈরি করতে হয় (`[id]` vs `[...slug]` vs `[[...slug]]`)?",
      m: "সাধারণ সিঙ্গেল প্যারামিটারের জন্য ফোল্ডারের নাম হয় `[id]` (যেমন `/products/123`)। Catch-all Routes-এর জন্য নাম হয় `[...slug]` যা একাধিক সেগমেন্ট ম্যাচ করে (যেমন `/docs/setup/install` ধরবে `params.slug = ['setup', 'install']`)। আর Optional Catch-all এর জন্য ডাবল ব্র্যাকেট `[[...slug]]` ব্যবহার করা হয়, যা এমনকি বেস পাথ `/docs` কেও ম্যাচ করতে পারে।",
      b: "ডায়নামিক রাউটিংয়ে [id] একক প্যারামিটার ধারণ করে। [...slug] একাধিক নেস্টেড সেগমেন্টকে অ্যারে আকারে ক্যাচ করে। আর [[...slug]] অপশনাল ক্যাচ-অল হিসেবে কাজ করে যা প্যারামিটার ছাড়া মূল ইউআরএলটিকেও রেন্ডার করতে পারে।",
      e: "Single dynamic routes use [id], while catch-all routes use [...slug] to match nested sub-paths as an array (e.g. /docs/a/b). Optional catch-all [[...slug]] matches both nested segments and the base path itself without parameters.",
      code: "// /app/shop/[...slug]/page.tsx:\n// Matches /shop/clothing, /shop/clothing/shirts\nexport default function Page({ params }: { params: { slug: string[] } }) { ... }"
    },
    {
      lvl: "lvl2",
      q: "Route Handlers (`route.ts`) কী এবং এটি কীভাবে ট্র্যাডিশনাল Express.js এপিআই-এর মতো কাজ করে?",
      m: "Route Handlers হলো App Router-এর ব্যাকএন্ড এপিআই হ্যান্ডলার। ফোল্ডারের ভেতরে `route.ts` ফাইলে আমরা স্ট্যান্ডার্ড HTTP মেথড ফাংশন এক্সপোর্ট করি: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`। এটি Web Request এবং Response অবজেক্ট ব্যবহার করে, যার ফলে কোনো এক্সপ্রেস বা আলাদা নোড সার্ভার ছাড়াই Next.js-এর ভেতরেই সম্পূর্ণ সুরক্ষিত REST API বিল্ড করা যায়।",
      b: "রাউট হ্যান্ডলার হলো নেক্সট জেএস-এর বিল্ট-ইন ব্যাকএন্ড এপিআই কাঠামো। app ডিরেক্টরির ভেতরে route.ts ফাইল তৈরি করে GET, POST ইত্যাদি মেথড এক্সপোর্ট করে যেকোনো রেস্ট এপিআই বা ওয়েবহুক এন্ডপয়েন্ট হ্যান্ডেল করা যায়।",
      e: "Route Handlers (route.ts) replace API routes in App Router. They export standard HTTP method functions (GET, POST, DELETE, etc.) utilizing the Web Request and Response standards to power backend endpoints or webhooks inside Next.js.",
      code: "export async function GET(request: Request) {\n  const data = await fetchUsers();\n  return Response.json({ success: true, data });\n}"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Streaming SSR এবং React Suspense কীভাবে Time to First Byte (TTFB) এবং First Contentful Paint (FCP) উন্নত করে?",
      m: "ট্র্যাডিশনাল SSR-এ পুরো পেজের সব ডেটা ফেচ শেষ না হওয়া পর্যন্ত সার্ভার কোনো HTML রেসপন্স পাঠাতে পারত না, ফলে স্লো এপিআই থাকলে ইউজার সাদা স্ক্রিন দেখে বসে থাকত। Streaming SSR-এ নেক্সট সার্ভার তৎক্ষণাৎ পেজের প্রাথমিক শেল/লেআউট ব্রাউজারে স্ট্রীম করে দেয় (ফাস্ট TTFB ও FCP)। এরপর ভারী ডাটা কম্পোনেন্টগুলোকে `<Suspense fallback={<Skeleton />}>` এ র্যাপ করা থাকলে ব্যাকগ্রাউন্ডে ডাটা রেডি হওয়া মাত্র একই HTTP কানেকশনে চঙ্ক আকারে পাঠিয়ে ক্লায়েন্টের স্ক্রিনে রিপ্লেস করে দেয়।",
      b: "স্ট্রিমিং এসএসআর সার্ভারকে সম্পূর্ণ পেজ একসাথে তৈরি করার অপেক্ষা না করে প্রস্তুত অংশগুলো ধাপে ধাপে ব্রাউজারে পাঠাতে সাহায্য করে। সাসপেন্স ফলব্যাকের মাধ্যমে ব্যবহারকারী তৎক্ষণাৎ প্রাথমিক ইন্টারফেস ও লোডার দেখতে পায়, ফলে টিটিএফবি এবং এফসিপি মেট্রিক্স অত্যন্ত চমৎকার থাকে।",
      e: "Traditional SSR blocks until the slowest query resolves before sending any HTML. Streaming SSR with React Suspense chunks HTML output, immediately dispatching static navigation shells to the client, then streaming resolved dynamic components over the same stream as their promises fulfill.",
      code: "<Suspense fallback={<InvoiceSkeleton />}>\n  <InvoiceList tenantId={id} />\n</Suspense>"
    },
    {
      lvl: "lvl3",
      q: "Next.js-এর ৪ স্তরের ক্যাশিং আর্কিটেকচার (Request Memoization, Data Cache, Full Route Cache, Router Cache) কীভাবে ইন্টারনালি অপারেট করে?",
      m: "নেক্সট জেএস-এ ৪টি লেয়ার থাকে: (১) Request Memoization: একই রেন্ডার পাসে একাধিক কম্পোনেন্টে একই ফেচ কল থাকলে রিকোয়েস্টকে ডিডুপ্লিকেট করে। (২) Data Cache: সার্ভার সাইডে ডেটা পারসিস্ট করে যা রিকোয়েস্ট ও ডিপ্লয়মেন্টের পরেও টিকে থাকে (revalidate না হওয়া পর্যন্ত)। (৩) Full Route Cache: বিল্ড টাইমে বা ISR-এ পুরো রেন্ডার করা HTML এবং RSC পেলোড সার্ভারে ক্যাশ করে। (৪) Router Cache: ক্লায়েন্ট ব্রাউজারের ইন-মেমোরি ক্যাশ যা ইউজার এক পেজ থেকে অন্য পেজে নেভিগেট করার সময় প্রিলোডেড পেজগুলোকে চোখের পলকে দেখায়।",
      b: "নেক্সট জেএস-এর ক্যাশিং চারটি স্তরে বিভক্ত: রিকোয়েস্ট মেমোইজেশন একই রিকোয়েস্টে বারবার ডাটা ফেচিং এড়ায়; ডাটা ক্যাশ সার্ভার লেভেলে ডাটা জমিয়ে রাখে; ফুল রাউট ক্যাশ সম্পূর্ণ পেজের আউটপুট ক্যাশ করে; এবং রাউটার ক্যাশ ব্রাউজারের মেমোরিতে প্রিফেচ করা পেজ সংরক্ষণ করে ইনস্ট্যান্ট নেভিগেশন দেয়।",
      e: "The 4 caching layers comprise: Request Memoization (deduplicating identical fetch calls within one render cycle), Data Cache (persisting fetched data across requests on the server), Full Route Cache (caching pre-rendered HTML and RSC payloads), and Router Cache (in-memory client-side cache storing visited route segments).",
      tip: "ক্যাশিং আর্কিটেকচারের এই ৪টি লেয়ার ব্যাখ্যা করতে পারা সিনিয়র বা লিড ফুল-স্ট্যাক রোলের জন্য গোল্ডেন অ্যান্সার।"
    },
    {
      lvl: "lvl3",
      q: "Parallel Routes (`@modal`) এবং Intercepting Routes (`(.)photos/[id]`) ব্যবহার করে ইনস্টাগ্রাম-স্টাইল ফটো মডাল কীভাবে আর্কিটেক্ট করা যায়?",
      m: "Parallel Routes দিয়ে একটি লেআউটের ভেতর একাধিক স্লট প্যারাল্যালি রেন্ডার করা যায় (যেমন `@modal`)। আর Intercepting Routes দিয়ে ক্লায়েন্ট সাইড নেভিগেশনের সময় রাউটকে ইন্টারসেপ্ট করে কারেন্ট পেজের ওপর মডাল হিসেবে ওপেন করানো যায় (`(.)photos/123`), অথচ ব্রাউজার ইউআরএল বদলে যায় এবং শেয়ারেবল হয়। আবার ইউজার পেজ হার্ড রিফ্রেশ (`F5`) দিলে তখন মডাল না দেখিয়ে সম্পূর্ণ ফুল-পেজ ফটো ভিউ রেন্ডার হয়।",
      b: "প্যারালাল রাউট ও ইন্টারসেপ্টিং রাউটের সমন্বয়ে ইনস্টাগ্রাম স্টাইল মডাল তৈরি করা হয়। হোমপেজ থেকে কোনো ছবিতে ক্লিক করলে ইন্টারসেপ্টিং রাউট পেজ পরিবর্তন না করে হোমপেজের উপরেই সুন্দর মডাল পপআপ দেখায় এবং ইউআরএল আপডেট করে; কিন্তু একই ইউআরএল সরাসরি ব্রাউজারে রিফ্রেশ করলে মূল ডেডিকেটেড পেজটি ওপেন হয়।",
      e: "Parallel Routes render multiple independent slots simultaneously within the same layout, while Intercepting Routes intercept client navigation to display the target route as an overlay modal inside the current context. Hard refreshes bypass the interception and render the standalone full page.",
      code: "// Directory Structure:\n// app/feed/@modal/(.)post/[id]/page.tsx\n// app/feed/post/[id]/page.tsx"
    },
    {
      lvl: "lvl3",
      q: "Next.js App Router-এ Security: Server Action Injection এবং CSRF Attack কীভাবে প্রতিরোধ করবে?",
      m: "যেহেতু Server Actions ক্লায়েন্ট থেকে POST রিকোয়েস্ট হিসেবে ইনভোক হয়, তাই সিকিউরিটি রিস্ক থাকে। সমাধান: (১) Next.js বিল্ট-ইনভাবে Host এবং Origin হেডার চেক করে CSRF প্রতিরোধ করে। (২) প্রতিটা Server Action-এর শুরুতে ইউজার সেশন ও রোল ভ্যালিডেট করতে হবে (`const session = await getSession(); if (!session) throw new Error()`)। (৩) ইনপুট ডাটাকে অবশ্যই Zod দিয়ে কঠোরভাবে পার্স ও স্যানিটাইজ করতে হবে যাতে প্যারামিটার টেম্পারিং বা ইনজেকশন না হতে পারে।",
      b: "সার্ভার অ্যাকশন সুরক্ষায় নেক্সট জেএস নিজে থেকেই অরিজিন ও হোস্ট হেডার মিলিয়ে সিএসআরএফ প্রতিরোধ করে। এছাড়াও প্রতিটি সার্ভার অ্যাকশনের ভেতরে কঠোর সেশন যাচাইকরণ, রোল চেক এবং Zod দিয়ে ইনপুট ডাটা স্যানিটাইজ করা বাধ্যতামূলক।",
      e: "Next.js mitigates CSRF attacks by matching Origin and Host headers on Server Action POST requests. Developers must additionally authenticate sessions inside each action, verify RBAC authorizations, and enforce strict input schema parsing with Zod before database operations.",
      code: "export async function deleteOrder(id: string) {\n  'use server';\n  const session = await auth();\n  if (session?.user.role !== 'ADMIN') throw new Error('Unauthorized');\n  await db.order.delete({ where: { id } });\n}"
    },
    {
      lvl: "lvl3",
      q: "Partial Prerendering (PPR) কী এবং এটি আধুনিক নেক্সট জেএস অ্যাপ্লিকেশনে কীভাবে আলটিমেট হাইব্রিড পারফরম্যান্স প্রদান করে?",
      m: "Partial Prerendering (PPR) হলো একই রাউটের ভেতর স্ট্যাটিক ও ডায়নামিক রেন্ডারিংয়ের নিখুঁত সমন্বয়। বিল্ড টাইমে পেজের সব স্ট্যাটিক অংশ (যেমন ন্যাভবার, ব্যানার, ফুটার) প্রি-রেন্ডার হয়ে স্ট্যাটিক শেলের মতো এজ ক্যাশে থাকে। আর পেজের ভেতরের ডায়নামিক কম্পোনেন্টগুলো (যেমন ইউজারের কার্ট বা রিকমেন্ডেশন) `<Suspense>` এর ভেতরে থাকে। ইউজার যখন ভিজিট করে, স্ট্যাটিক শেল নিমেষেই লোড হয় এবং ডায়নামিক অংশ একই সাথে প্যারালালে স্ট্রীম হয়ে পূরণ হয়।",
      b: "পার্শিয়াল প্রিরেন্ডারিং এমন একটি আধুনিক প্রযুক্তি যা একটি একক ওয়েব পেজে স্ট্যাটিক ও ডায়নামিক কন্টেন্টকে একত্রে পাওয়ারফুল করে। পেজের স্ট্যাটিক কাঠামোগুলো বিল্ড টাইমে সিডিএন-এ সংরক্ষিত থাকে এবং ব্যবহারকারী ঢোকার পর শুধুমাত্র ডায়নামিক অংশগুলো সার্ভার থেকে স্ট্রীম হয়ে স্ক্রিনে বসে যায়।",
      e: "Partial Prerendering combines static and dynamic rendering within the exact same route. Next.js serves a pre-rendered static shell instantaneously from the edge, while streaming asynchronous dynamic holes wrapped in Suspense boundaries in parallel without separate client waterfall requests.",
      tip: "PPR হলো Next.js-এর মোস্ট অ্যাডভান্সড আর্কিটেকচারাল ফিচারগুলোর একটি।"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "Next.js অ্যাপে লগইন করার পর কুকি সেট হলেও রাউটার রিডাইরেক্টে ড্যাশবোর্ড পেজ পুরানো আন-অথোরাইজড স্টেট ক্যাশ দেখাচ্ছে। কীভাবে ফিক্স করবে?",
      m: "এটি ঘটে Router Cache-এর কারণে, কারণ নেক্সট জেএস ক্লায়েন্টে পেজ প্রিফেচ ক্যাশ করে রাখে। সমাধান: (১) লগইনের পর ক্লায়েন্ট সাইডে `router.push('/dashboard')` ডাকার সাথে সাথে বা আগে `router.refresh()` কল করতে হবে যাতে ক্লায়েন্ট রাউটার ক্যাশ ইনভ্যালিডেট হয়। (২) Server Action-এ লগইন করলে সেখানে `revalidatePath('/', 'layout')` দিতে হবে যাতে সার্ভার সাইডের ক্যাশড লেআউট এবং কুকি সেশন রি-ইভালুয়েট হয়।",
      b: "ক্লায়েন্ট রাউটার ক্যাশের কারণে এই সমস্যা দেখা দেয়। লগইন সফল হওয়ার পর router.refresh() কল করতে হবে যাতে ব্রাউজারের ইন-মেমোরি ক্যাশ বাতিল হয়ে নতুন কুকিসহ সার্ভার থেকে আপডেটেড স্টেট আসে।",
      e: "This occurs due to the client Router Cache. Fix this by invoking router.refresh() alongside router.push(), or calling revalidatePath('/', 'layout') inside the login Server Action to invalidate client cache trees and force cookie re-evaluation.",
      code: "const handleLogin = async () => {\n  await loginAction(creds);\n  router.refresh();\n  router.push('/dashboard');\n};"
    },
    {
      lvl: "situation",
      q: "প্রোডাকশন বিল্ডে একটি পেজ স্ট্যাটিক রেন্ডার হতে গিয়ে `cookies()` বা `headers()` ব্যবহারের কারণে বিল্ড এরর দিচ্ছে। কীভাবে সমাধান করবে?",
      m: "যেহেতু `cookies()` এবং `headers()` রানটাইম রিকোয়েস্টের ওপর নির্ভরশীল, তাই নেক্সট জেএস বুঝতে পারে এটি স্ট্যাটিকালি বিল্ড করা সম্ভব নয়। সমাধান: পেজ ফাইলে স্পষ্টভাবে ডাইনামিক রেন্ডারিং ডিক্লেয়ার করতে হবে: `export const dynamic = 'force-dynamic'` অথবা ওই ডেটা রিডিং অংশটুকুকে `<Suspense>` এর ভেতরে একটি সার্ভার কম্পোনেন্টে আলাদা করতে হবে।",
      b: "কুকি বা হেডার রানটাইম ডাটা। বিল্ডের সময় এগুলো পাওয়া যায় না বিধায় পেজকে ডায়নামিক ঘোষণা করতে হবে `export const dynamic = 'force-dynamic'` লিখে, অথবা সাসপেন্স বাউন্ডারি ব্যবহার করে ডায়নামিক অংশের রেন্ডারিং আলাদা করতে হবে।",
      e: "Calling dynamic APIs like cookies() or headers() opts a route out of static generation. Add `export const dynamic = 'force-dynamic'` to the route segment config, or isolate the dynamic read inside a Suspense-wrapped Server Component.",
      code: "export const dynamic = 'force-dynamic';\nimport { cookies } from 'next/headers';"
    },
    {
      lvl: "situation",
      q: "একটি ডায়নামিক ই-কমার্স প্রোডাক্ট পেজে ১ লক্ষ পণ্য রয়েছে। বিল্ড টাইমে সব পেজ SSG করতে গেলে বিল্ড টাইম ঘণ্টার পর ঘণ্টা আটকে থাকে। সমাধান কী?",
      m: "সব ১ লক্ষ পেজ একসাথে প্রি-রেন্ডার করা যাবে না। সমাধান: `generateStaticParams()`-এ শুধুমাত্র টপ ১০০ বা ১০০০ সর্বাধিক বিক্রিত পণ্যের স্লাগ রিটার্ন করব। বাকি পণ্যের জন্য `export const dynamicParams = true` রাখব, যাতে ব্যবহারকারী কোনো আন-জেনারেটেড পেজে প্রথমবার ঢুকলে সার্ভার অন-ডিমান্ড পেজটি রেন্ডার করে ক্যাশে জমা করবে এবং পরবর্তী সকল ইউজার ক্যাশ থেকে দ্রুত পাবে।",
      b: "এক লক্ষ পণ্য বিল্ড টাইমে জেনারেট না করে কেবল শীর্ষ জনপ্রিয় ১০০০টি পণ্যের জন্য generateStaticParams চালাবো। dynamicParams = true রেখে বাকি পণ্যগুলো যখন গ্রাহক প্রথম ভিজিট করবে তখন ব্যাকগ্রাউন্ডে আইএসআর (ISR) পদ্ধতিতে রেন্ডার হয়ে স্থায়ীভাবে ক্যাশ হয়ে যাবে।",
      e: "Pre-render only the top 1,000 high-traffic products at build time using generateStaticParams(), leaving export const dynamicParams = true. Unrendered pages will be rendered on-demand upon first visit and subsequently cached via ISR.",
      code: "export async function generateStaticParams() {\n  const topProducts = await getTopProducts(1000);\n  return topProducts.map(p => ({ id: p.id }));\n}\nexport const dynamicParams = true;"
    },
    {
      lvl: "situation",
      q: "একটি ক্লায়েন্ট কম্পোনেন্টে বড় ডেট-পিকার বা চার্ট লাইব্রেরি ব্যবহার করায় ইনিশিয়াল বান্ডেল সাইজ অনেক বেড়ে গেছে। কীভাবে অপটিমাইজ করবে?",
      m: "আমরা Next.js-এর `dynamic()` ইমপোর্ট (Dynamic Import / Code Splitting) ব্যবহার করব। এতে চার্ট কম্পোনেন্টটি আলাদা জাভাস্ক্রিপ্ট চাঙ্কে ভাগ হয়ে যাবে এবং পেজ লোডের সময় মেইন থ্রেডে আসবে না, শুধুমাত্র ইউজার যখন চার্ট ট্যাবে স্ক্রল বা ক্লিক করবে তখনই ডাউনলোড হবে। সার্ভার রেন্ডারিং এড়াতে `{ ssr: false }` ব্যবহার করব।",
      b: "বড় লাইব্রেরির জন্য নেক্সট জেএস-এর ডায়নামিক ইমপোর্ট ব্যবহার করতে হবে। এতে কম্পোনেন্টটি পৃথক জাভাস্ক্রিপ্ট বান্ডেলে বিভক্ত হয় এবং প্রয়োজন ছাড়া লোড হয় না, ফলে প্রাথমিক পেজ লোড অত্যন্ত দ্রুত হয়।",
      e: "Utilize Next.js dynamic() imports with `{ ssr: false }` to code-split the heavyweight charting or date-picker library into an isolated chunk loaded on-demand only when rendered.",
      code: "import dynamic from 'next/dynamic';\nconst SalesChart = dynamic(() => import('@/components/SalesChart'), {\n  ssr: false,\n  loading: () => <p>Loading Chart...</p>\n});"
    },
    {
      lvl: "situation",
      q: "Vercel-এ ডেপ্লয় করার পর Server Action কল করলে `Payload Too Large (413)` এরর আসছে ফাইল আপলোডের সময়। সমাধান কী?",
      m: "Next.js Server Actions-এর একটি ডিফল্ট বডি সাইজ লিমিট থাকে (ডিফল্ট ১MB)। সমাধান: (১) `next.config.js`-এ `serverActions.bodySizeLimit` বাড়িয়ে ১০MB বা প্রয়োজনীয় সাইজ দিতে পারি। (২) প্রোডাকশন বেস্ট প্র্যাকটিস হলো বড় ফাইল সরাসরি সার্ভার অ্যাকশনে না পাঠিয়ে AWS S3 বা Supabase Storage-এর প্রে-সাইন্ড ইউআরএল (Presigned URL) নিয়ে ক্লায়েন্ট থেকে সরাসরি ক্লাউড স্টোরেজে আপলোড করা।",
      b: "নেক্সট জেএস সার্ভার অ্যাকশনের ডিফল্ট বডি সাইজ লিমিট ১ মেগাবাইট। next.config.js এ লিমিট বাড়ানো যায় অথবা আরও ভালো সমাধান হলো ক্লায়েন্ট সাইড থেকে সরাসরি প্রি-সাইন্ড ইউআরএল দিয়ে অ্যামাজন এসথ্রি বা ক্লাউড স্টোরেজে ফাইল আপলোড করা।",
      e: "Configure bodySizeLimit under experimental.serverActions in next.config.js to increase upload limits, or ideally, generate pre-signed S3 upload URLs to stream large media files directly from the browser to cloud buckets.",
      code: "// next.config.js\nmodule.exports = {\n  experimental: {\n    serverActions: {\n      bodySizeLimit: '10mb'\n    }\n  }\n};"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর মাল্টি-টেন্যান্ট SaaS অ্যাপ্লিকেশনে সাবডোমেন (`tenant.dokani.com`) কীভাবে Next.js Middleware দিয়ে ডায়নামিকভাবে রাউট করা হয়েছে?",
      m: "আমরা `middleware.ts`-এ আগত রিকোয়েস্টের `host` হেডার রিড করি। যদি হোস্ট `tenant.dokani.com` হয়, তখন সাবডোমেন অংশটি এক্সট্র্যাক্ট করে `NextResponse.rewrite()` দিয়ে ইন্টারনালি `/tenants/[tenant]/...` ডিরেক্টরিতে রিরাইট করি। ইউজার ব্রাউজারের ইউআরএল বারে সাবডোমেনই দেখতে পায়, কিন্তু নেক্সট জেএস ইন্টারনালি টেন্যান্টের স্পেসিফিক পেজ রেন্ডার করে।",
      b: "দোকানি অ্যাপে মাল্টি-টেন্যান্সি পরিচালনার জন্য মিডলওয়্যারে হোস্ট হেডার বিশ্লেষণ করে সাবডোমেন বের করা হয়। এরপর ইন্টারনাল রিরাইট (NextResponse.rewrite) ব্যবহার করে রিকোয়েস্টকে নির্দিষ্ট টেন্যান্টের ফোল্ডারে রি-রুট করা হয় যাতে ব্যবহারকারীর সাবডোমেন বজায় থাকে।",
      e: "In Dokani POS SaaS, middleware inspects the host header from request.headers, extracts the tenant subdomain, and dynamically rewrites the path internally to `/tenants/${subdomain}${path}` while preserving the custom subdomain in the user's browser address bar.",
      tip: "মাল্টি-টেন্যান্ট SaaS-এ সাবডোমেন রাউটিং আর্কিটেকচার হলো যে কোনো হাই-লেভেল ফুল-স্ট্যাক রোলের অন্যতম কঠিন ইন্টারভিউ প্রশ্ন।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ শত শত স্টোরের ইনভেন্টরি ও সেলস ড্যাশবোর্ডে SEO এবং সোশ্যাল প্রিভিউ (OG Images) কীভাবে অটোমেটিক ডায়নামিক জেনারেট করেছিলে?",
      m: "আমরা Next.js App Router-এর `generateMetadata()` এবং `@vercel/og` (`ImageResponse`) ব্যবহার করেছি। প্রতিটি স্টোর ও পণ্যের জন্য টাইটেল ও মেটা ডেসক্রিপশন সার্ভার সাইডে ফেচ করে ডায়নামিক এসইও ট্যাগ বসানো হয়। আর `opengraph-image.tsx` ফাইলের ভেতর JSX দিয়ে লাইভ স্টোর লোগো ও প্রোডাক্ট প্রাইস সহ রিয়েল-টাইম ইমেজ রেন্ডার হয়, যা ফেসবুকে শেয়ার করলে চমৎকার কার্ড দেখায়।",
      b: "আমরা নেক্সট জেএস অ্যাপ রাউটারের generateMetadata ফাংশন এবং opengraph-image.tsx ব্যবহার করে প্রতি স্টোরের জন্য লাইভ মেটাডাটা ও ইমেজ রেসপন্স তৈরি করেছি। ফলে সোশ্যাল মিডিয়াতে শেয়ারের সময় ডায়নামিক ব্যানার ও এসইও ট্যাগ প্রদর্শিত হয়।",
      e: "We leveraged generateMetadata() for server-evaluated OpenGraph tags and dynamically composed social preview banners using Next.js ImageResponse (Satori-powered edge JSX-to-PNG renderer) in opengraph-image.tsx.",
      code: "export async function generateMetadata({ params }): Promise<Metadata> {\n  const store = await getStore(params.tenant);\n  return { title: `${store.name} | Dokani POS`, description: store.bio };\n}"
    },
    {
      lvl: "realworld",
      q: "PTTABD লার্নিং প্ল্যাটফর্মে লাইভ এক্সাম চলাকালীন স্টুডেন্টদের কোশ্চেন পেপারে চিটিং ঠেকাতে Next.js আর্কিটেকচারে কী ধরনের প্রটেকশন নেওয়া হয়েছিল?",
      m: "সমাধান: (১) এক্সাম পেপার কখনোই ক্লায়েন্টে একবারে সম্পূর্ণ পাঠানো হতো না; Next.js Server Components এবং Server Actions দিয়ে প্রতিটা প্রশ্ন আলাদা ফেচ হতো এবং আগের প্রশ্নের উত্তর জমা হওয়ার পরই পরবর্তী প্রশ্ন স্ট্রীম হতো। (২) মিডলওয়্যারে সিঙ্গেল অ্যাক্টিভ ব্রাউজার সেশন লক করা হয়েছিল যাতে অন্য ট্যাব বা ডিভাইস থেকে একই অ্যাকাউন্টে ঢোকা মাত্র এক্সাম অটো-সাবমিট হয়ে যায়।",
      b: "পিটিটিএবিডি অনলাইন পরীক্ষায় অসদুপায় রুখতে সার্ভার কম্পোনেন্টের সাহায্যে প্রতি ধাপে মাত্র একটি প্রশ্ন সরবরাহ করা হতো। মিডলওয়্যার দিয়ে মাল্টিপল ব্রাউজার ট্যাব এবং ভিন্ন আইপি সনাক্ত করে সেশন তাৎক্ষণিক লক করার নিরাপত্তা ব্যবস্থা নিশ্চিত করা হয়েছিল।",
      e: "In PTTABD exams, the entire question bank was never delivered to the client DOM. Instead, Server Components yielded strictly one active question at a time via Server Actions. Middleware tracked single active browser session locks via Redis.",
      tip: "ইন্টারভিউতে বলতে পারো: 'ক্লায়েন্ট সাইড বান্ডেলে কখনোই ফুল অ্যান্সার কি বা আন-রেন্ডারড প্রশ্ন এক্সপোজ করা যাবে না'।"
    },
    {
      lvl: "realworld",
      q: "Next.js অ্যাপ্লিকেশনে Core Web Vitals (LCP, FID/INP, CLS) অপটিমাইজ করে গুগল লাইটহাউসে স্কোর ৯০+ কীভাবে বজায় রেখেছিলে?",
      m: "অপটিমাইজেশন স্টেপস: (১) LCP (Largest Contentful Paint): হিরো সেকশনের মূল ব্যানার ইমেজে `priority` অ্যাট্রিবিউট দিয়ে প্রি-লোড করেছি এবং ফন্টগুলো `next/font` দিয়ে সেলফ-হোস্টেড করেছি যাতে কোনো FOIT/FOUT না হয়। (২) INP (Interaction to Next Paint): হেভি জাভাস্ক্রিপ্ট এক্সিকিউশন `useTransition` এবং ওয়েব ওয়ার্কারে সরিয়ে মেইন থ্রেড ফাঁকা রেখেছি। (৩) CLS (Cumulative Layout Shift): সব ইমেজ ও ব্যানারে ফিক্সড অ্যাসপেক্ট রেশিও এবং কন্টেইনার ডাইমেনশন দিয়ে লেআউট শিফট ০ করেছি।",
      b: "কোর ওয়েব ভাইটালস অপটিমাইজেশনে আমরা next/font দিয়ে গুগল ফন্ট লোকালি হোস্ট করেছি, হিরো ইমেজে priority ট্যাগ দিয়ে দ্রুততম সময়ে এলসিপি সম্পন্ন করেছি এবং কন্টেইনারের সাইজ নির্দিষ্ট রেখে লেআউট শিফট শূন্যে নামিয়ে এনেছি।",
      e: "Optimized Core Web Vitals by: (1) self-hosting Google fonts via next/font to eradicate layout jumps, (2) adding priority to above-the-fold hero images for sub-1.2s LCP, (3) keeping INP under 100ms by offloading non-urgent state to useTransition, and (4) reserving aspect-ratio boxes to keep CLS at 0.",
      code: "import { Inter } from 'next/font/google';\nconst inter = Inter({ subsets: ['latin'], display: 'swap' });"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এর সেলস সামারি ড্যাশবোর্ডে রিয়েল-টাইম ডাটা আপডেট দেখাতে Server-Sent Events (SSE) বনাম WebSockets-এর মধ্যে Next.js-এ কোনটি বেছে নিয়েছিলে এবং কেন?",
      m: "যেহেতু সেলস ড্যাশবোর্ডে সার্ভার থেকে ক্লায়েন্টে শুধুই আপডেট পুশ করা প্রয়োজন (ইউজার ড্যাশবোর্ড থেকে ব্যাকগ্রাউন্ডে ঘন ঘন ডেটা পাঠায় না), তাই আমরা Route Handlers ব্যবহার করে Server-Sent Events (SSE) বেছে নিয়েছিলাম। SSE সাধারণ HTTP/2 কানেকশনের ওপর রান করে, স্বয়ংক্রিয়ভাবে রিকানেক্ট করে এবং ফুল-ডুপ্লেক্স ওয়েবসকেটের তুলনায় সার্ভার রিসোর্স ও ফায়ারওয়াল ওভারহেড অনেক কমায়।",
      b: "দোকানি বিক্রয় ড্যাশবোর্ডে কেবল সার্ভার থেকে তথ্য ক্লায়েন্টে পাঠানোর প্রয়োজন হওয়ায় আমরা এসএসই (Server-Sent Events) বেছে নিয়েছিলাম। এটি এইচটিটিপি/২ প্রোটোকলে মসৃণভাবে চলে এবং সার্ভারে অতিরিক্ত মেমোরি খরচ না করে লাইভ নোটিফিকেশন প্রদান করে।",
      e: "For Dokani's live sales feed, we chose Server-Sent Events (SSE) over WebSockets because metrics flow unidirectionally from server to client. Built atop standard HTTP/2, SSE offers native browser reconnection handling with lighter server memory overhead.",
      tip: "ইন্টারভিউতে 'Unidirectional data push' এর জন্য SSE যে WebSockets-এর চেয়ে হালকা ও ক্লিন আর্কিটেকচার, এটি উল্লেখ করলে টেক লিডরা খুব মুগ্ধ হন।"
    }
  ]
};
