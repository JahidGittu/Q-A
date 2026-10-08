// Topic 9: Supabase & Row-Level Security (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "supabase-rls-mastery",
  name: "Supabase & Postgres Row-Level Security (RLS)",
  desc: "Supabase Backend, GoTrue Auth, auth.uid(), RLS Policies, Anon vs Service Role, Realtime CDC, Database Triggers",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Supabase কী এবং এটি ট্র্যাডিশনাল Firebase বা কাস্টম ব্যাকএন্ডের চেয়ে কেন ডেভেলপারদের কাছে জনপ্রিয়?",
      m: "Supabase হলো একটি ওপেন-সোর্স Firebase বিকল্প যা সম্পূর্ণভাবে প্রোডাকশন-গ্রেড PostgreSQL ডেটাবেজের ওপর নির্মিত। Firebase-এর মতো প্রোপাইটরি NoSQL লকিংয়ের পরিবর্তে Supabase একটি ফুল PostgreSQL দেয়—সাথে বিল্ট-ইন Auth (GoTrue), অটো-জেনারেটেড RESTful API (PostgREST), Realtime WebSockets, এবং S3-কমপ্যাটিবল Storage। সবচেয়ে বড় সুবিধা: ডেটাবেজটি ১০০% ওপেন স্ট্যান্ডার্ড এসকিউএল হওয়ায় যেকোনো সময় ভেন্ডর-লকইন ছাড়া নিজস্ব সার্ভারে সেলফ-হোস্ট করা যায় এবং জটিল রিলেশনাল কুয়েরি ও ACID ট্রানজ্যাকশন সাপোর্ট করে।",
      b: "সুপাবেস হলো একটি ওপেন-সোর্স ব্যাকএন্ড প্ল্যাটফর্ম যা পোস্টগ্রেস ডেটাবেজের ওপর ভিত্তি করে অথেনটিকেশন, রিয়েলটাইম লিসেনার, অটো-জেনারেটেড এপিআই এবং ফাইল স্টোরেজের সুবিধা দেয়। এটি ফায়ারবেসের মতো কোনো ভেন্ডর-লকইন ছাড়াই পূর্ণাঙ্গ SQL শক্তি প্রদান করে।",
      e: "Supabase is an open-source Firebase alternative built natively on top of production PostgreSQL. It bundles GoTrue authentication, instant PostgREST APIs, Realtime WebSocket change streams, and storage, avoiding vendor lock-in while leveraging SQL relational power.",
      tip: "বলো: 'Supabase provides Firebase-like developer velocity backed by the industrial power of PostgreSQL.'"
    },
    {
      lvl: "lvl1",
      q: "Supabase-এ Row-Level Security (RLS) কেন ডিফল্টভাবে চালু রাখা বাধ্যতামূলক?",
      m: "Supabase তার PostgREST ইঞ্জিনের মাধ্যমে সরাসরি ব্রাউজার বা ফ্রন্টএন্ড থেকে ডেটাবেজে কুয়েরি করার সুবিধা দেয় (`supabase.from('products').select('*')`)। যদি টেবিলে RLS অন না থাকে, তবে যে কেউ ব্রাউজার কনসোল বা পোস্টম্যান থেকে আপনার এনন কি (Anon Key) ব্যবহার করে পুরো টেবিলের সংবেদনশীল ডেটা পড়া, পরিবর্তন বা ডিলিট করে দিতে পারবে! RLS চালু থাকলে ডেটাবেজ প্রতিটি কুয়েরিকে কঠোর সিকিউরিটি পলিসি দিয়ে আটকে দেয়, ফলে শুধুমাত্র অথেনটিকেটেড ও অনুমতিপ্রাপ্ত ইউজারই তার নির্দিষ্ট ডেটা দেখতে পারে।",
      b: "সুপাবেসে ফ্রন্টএন্ড থেকে সরাসরি ডাটাবেজে কুয়েরি পাঠানো যায়। তাই RLS বন্ধ থাকলে যে কেউ সম্পূর্ণ টেবিলের তথ্য চুরি বা মুছে ফেলতে পারে। তথ্যের নিরাপত্তা নিশ্চিত করতে RLS চালু রাখা বাধ্যতামূলক।",
      e: "Because Supabase exposes PostgreSQL directly to the client via PostgREST, leaving RLS disabled enables any anonymous client holding the public key to perform unrestricted reads, writes, and deletes. RLS enforces kernel-level authorization policies on every query.",
      code: "ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;"
    },
    {
      lvl: "lvl1",
      q: "Supabase RLS পলিসিতে `auth.uid()` এবং `auth.jwt()` হেল্পার ফাংশনগুলোর কাজ কী?",
      m: "(১) `auth.uid()`: এটি বর্তমান লগইন করা ইউজারের ইউনিক UUID রিটার্ন করে যা Supabase Auth টোকেন থেকে সংগৃহীত। যেমন ইউজারের প্রোফাইল দেখতে পলিসি লিখি: `USING (id = auth.uid())`। (২) `auth.jwt()`: এটি ডিকোড করা সম্পূর্ণ JWT অবজেক্ট রিটার্ন করে। এর মাধ্যমে টোকেনের ভেতরের কাস্টম ক্লেইমস (যেমন `role`, `tenant_id`, `is_admin`) রিড করে অ্যাডভান্সড রোল-বেসড পলিসি তৈরি করা যায়: `USING ((auth.jwt() ->> 'role') = 'ADMIN')`।",
      b: "auth.uid() বর্তমান লগইন করা ইউজারের আইডি প্রদান করে এবং auth.jwt() সম্পূর্ণ টোকেন মেটাডেটা দেয়। এর মাধ্যমে ইউজারের রোল ও টেন্যান্ট চেক করে নিখুঁত নিরাপত্তা পলিসি তৈরি করা হয়।",
      e: "auth.uid() extracts the authenticated user's unique UUID from the active session context. auth.jwt() exposes the full decoded JSON Web Token payload, enabling policies to validate custom claims like user roles or tenant IDs.",
      code: "CREATE POLICY \"Users can view own profile\" ON profiles\nFOR SELECT USING (id = auth.uid());"
    },
    {
      lvl: "lvl1",
      q: "Supabase-এ 'anon' Key এবং 'service_role' Key-এর মধ্যে পার্থক্য কী এবং কোন কি-টি কখনোই ক্লায়েন্টে পাঠানো যাবে না?",
      m: "(১) `anon key`: এটি একটি পাবলিক কি যা ব্রাউজার, মোবাইল অ্যাপ ও ফ্রন্টএন্ডে নিরাপদে ব্যবহার করা যায়। এই কি দিয়ে করা সব রিকোয়েস্ট কঠোরভাবে ডেটাবেজের RLS পলিসি মেনে চলে। (২) `service_role key`: এটি একটি সুপার-অ্যাডমিন মাস্টার কি যা ডেটাবেজের সমস্ত RLS পলিসি সম্পূর্ণ বাইপাস করে ফুল অ্যাক্সেস পায়! এই কি-টি কখনোই ক্লায়েন্ট বা ব্রাউজারে পাঠানো যাবে না—এটি সবসময় সিকিউর ব্যাকএন্ড সার্ভার বা ক্লাউড ফাংশনের প্রাইভেট এনভায়রনমেন্ট ভ্যারিয়েবলে রাখতে হবে। ব্রাউজারে লিক হলে সম্পূর্ণ সিস্টেম কম্প্রোমাইজ হবে।",
      b: "anon key ফ্রন্টএন্ডে ব্যবহার করা যায় এবং এটি RLS মেনে চলে। service_role key সম্পূর্ণ RLS বাইপাস করে সব ডেটা অ্যাক্সেস করতে পারে, তাই এটি কখনোই ফ্রন্টএন্ডে প্রকাশ করা যাবে না—শুধুমাত্র সিকিউর ব্যাকএন্ডে রাখতে হবে।",
      e: "The anon key is public for client-side usage and strictly abides by RLS policies. The service_role key is a master secret that completely bypasses all RLS policies; it must NEVER be exposed to clients and kept solely within secure backend environments.",
      tip: "ইন্টারভিউতে 'service_role key bypasses RLS and must strictly stay server-side' সতর্কবাণীটি দেবে।"
    },
    {
      lvl: "lvl1",
      q: "PostgreSQL RLS-এ `USING` এবং `WITH CHECK` ক্লজের মধ্যে পার্থক্য কী?",
      m: "(১) `USING`: এটি ডেটা ফিল্টার বা পড়ার জন্য ব্যবহৃত হয় (`SELECT`, `DELETE`, এবং `UPDATE`-এর পুরনো রো ফিল্টার করার সময়)। এটি নির্ধারণ করে কোন কোন রো ইউজার দেখতে বা অ্যাক্সেস করতে পারবে। (২) `WITH CHECK`: এটি নতুন ডেটা তৈরি বা পরিবর্তনের পর ভ্যালিডেট করতে ব্যবহৃত হয় (`INSERT` এবং `UPDATE`-এর নতুন রো)। এটি নিশ্চিত করে যে ইউজার এমন কোনো ডেটা ইনসার্ট বা পরিবর্তন করতে পারবে না যা পলিসির শর্ত ভঙ্গ করে (যেমন অন্যের `user_id` বসিয়ে ইনসার্ট করা)।",
      b: "USING ক্লজ ডেটা পড়া বা সিলেক্ট করার শর্ত নির্ধারণ করে। আর WITH CHECK ক্লজ নতুন ডেটা ইনসার্ট বা আপডেটের পর নতুন মান বৈধ কি না তা যাচাই করে।",
      e: "The USING clause defines which existing rows are visible for SELECT, UPDATE, and DELETE operations. The WITH CHECK clause enforces validation criteria on new or mutated rows during INSERT and UPDATE operations to prevent saving illegal records.",
      code: "CREATE POLICY \"Users can update own rows\" ON posts\nFOR UPDATE \nUSING (author_id = auth.uid()) \nWITH CHECK (author_id = auth.uid());"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Supabase-এ Role-Based Access Control (RBAC) পলিসি কীভাবে ডিজাইন করবে?",
      m: "আমরা ইউজারের রোল (যেমন `ADMIN`, `MANAGER`, `CASHIER`) সংরক্ষণ করতে পারি `auth.users` মেটাডেটাতে অথবা একটি ডেডিকেটেড `user_roles` টেবিলে। এরপর RLS পলিসিতে চেক করি: `CREATE POLICY admin_all ON orders FOR ALL TO authenticated USING ((auth.jwt() -> 'app_metadata' ->> 'role') = 'ADMIN');`। এর ফলে অ্যাডমিনরা সব রো দেখতে ও এডিট করতে পারবে, আর সাধারণ ইউজারদের জন্য আলাদা পলিসিতে শুধু তাদের নিজস্ব অর্ডারের অ্যাক্সেস সীমাবদ্ধ থাকবে।",
      b: "JWT টোকেনের app_metadata থেকে role রিড করে RLS পলিসিতে শর্ত দেওয়া হয়। ফলে অ্যাডমিন সব ডেটা ম্যানেজ করতে পারে আর সাধারণ ইউজার শুধু নিজের ডেটা দেখার অনুমতি পায়।",
      e: "Implement RBAC by embedding roles inside the user's app_metadata claim on auth.users. Write targeted RLS policies inspecting auth.jwt() -> 'app_metadata' ->> 'role' to grant elevated permissions to roles like ADMIN or MANAGER.",
      code: "CREATE POLICY \"Admins full access\" ON products\nFOR ALL TO authenticated\nUSING ((auth.jwt()->'app_metadata'->>'role') = 'admin');"
    },
    {
      lvl: "lvl2",
      q: "Supabase Realtime Subscriptions কীভাবে কাজ করে এবং ডেটাবেজে চেঞ্জ হলে ব্রাউজারে কীভাবে লাইভ আপডেট আসে?",
      m: "Supabase Realtime কাজ করে PostgreSQL-এর বিল্ট-ইন 'Logical Replication' এবং চেঞ্জ ডেটা ক্যাপচার (CDC) মেকানিজমের ওপর। যখন ডেটাবেজে কোনো রো ইনসার্ট বা আপডেট হয়, পোস্টগ্রেসের `supabase_realtime` পাবলিকেশন একটি বাইনারি স্ট্রিম ফায়ার করে। Supabase Realtime ক্লাস্টার (Elixir/Phoenix ভিত্তিক) এই স্ট্রিমটি গ্রহণ করে এবং সংযুক্ত ব্রাউজারগুলোর WebSocket চ্যানেলে লাইভ JSON ইভেন্ট ব্রডকাস্ট করে। ফ্রন্টএন্ডে `supabase.channel().on('postgres_changes', ...).subscribe()` দিয়ে রিয়েলটাইম লিসেন করা যায়।",
      b: "সুপাবেস রিয়েলটাইম পোস্টগ্রেস লজিক্যাল রেপ্লিকেশন ও চেঞ্জ ডেটা ক্যাপচার ব্যবহার করে। ডেটাবেজে পরিবর্তন হওয়া মাত্রই ফিনিক্স ওয়েব-সকেটের মাধ্যমে ব্রাউজারে তাৎক্ষণিক ইভেন্ট পুশ করে।",
      e: "Supabase Realtime leverages PostgreSQL Logical Replication publications (supabase_realtime). An Elixir Phoenix backend consumes the replication WAL stream and broadcasts mutated payloads across connected WebSockets to active client listeners in real time.",
      code: "const sub = supabase.channel('orders')\n  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'orders' }, payload => {\n    console.log('New Order:', payload.new);\n  }).subscribe();"
    },
    {
      lvl: "lvl2",
      q: "Supabase Database Triggers ও Functions (PL/pgSQL) কীভাবে নতুন ইউজার রেজিস্ট্রেশনের সময় স্বয়ংক্রিয়ভাবে পাবলিক প্রোফাইল তৈরি করে?",
      m: "যখন কোনো ইউজার Supabase Auth দিয়ে সাইন আপ করে, তখন ডেটা জমা হয় প্রাইভেট `auth.users` টেবিলে। পাবলিক ফ্রন্টএন্ড সরাসরি `auth.users` রিড করতে পারে না। সমাধান: আমরা একটি PL/pgSQL ফাংশন তৈরি করি `handle_new_user()` যা `public.profiles` টেবিলে স্বয়ংক্রিয়ভাবে নতুন রো ইনসার্ট করে। এরপর একটি ট্রিগার বসাই: `CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_user();`। এর ফলে সাইন আপ হওয়ার ১ মিলিসেকেন্ডের মধ্যে পাবলিক প্রোফাইল প্রস্তুত হয়ে যায় কোনো ব্যাকএন্ড কোড ছাড়াই।",
      b: "auth.users টেবিলে নতুন ইউজার ইনসার্ট হওয়ার সাথে সাথে ডাটাবেজ ট্রিগার ফায়ার করে public.profiles টেবিলে প্রোফাইল রো তৈরি করে দেয়। এর ফলে কোনো ব্যাকএন্ড ছাড়াই প্রোফাইল অটো-ক্রিয়েট হয়।",
      e: "Create a PostgreSQL PL/pgSQL function triggered AFTER INSERT on auth.users. The trigger extracts NEW.id and NEW.email to insert a matching row into public.profiles, abstracting profile provisioning entirely to the database tier.",
      code: "CREATE OR REPLACE FUNCTION public.handle_new_user()\nRETURNS TRIGGER AS $$\nBEGIN\n  INSERT INTO public.profiles (id, email, full_name)\n  VALUES (new.id, new.email, new.raw_user_meta_data->>'full_name');\n  RETURN NEW;\nEND;\n$$ LANGUAGE plpgsql SECURITY DEFINER;\nCREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users\nFOR EACH ROW EXECUTE FUNCTION public.handle_new_user();"
    },
    {
      lvl: "lvl2",
      q: "PostgreSQL Functions-এ `SECURITY DEFINER` বনাম `SECURITY INVOKER`-এর মধ্যে পার্থক্য কী এবং সিকিউরিটি ঝুঁকি কী?",
      m: "(১) `SECURITY INVOKER` (ডিফল্ট): ফাংশনটি যিনি কল করছেন (Invoker) তার পারমিশন ও RLS রুলস অনুযায়ী এক্সিকিউট হয়। (২) `SECURITY DEFINER`: ফাংশনটি যিনি তৈরি করেছেন (Creator/Superuser) তার সর্বোচ্চ পারমিশন নিয়ে এক্সিকিউট হয়—অর্থাৎ এটি কলারের সমস্ত RLS পলিসি সম্পূর্ণ বাইপাস করে! ঝুঁকি: যদি কোনো হ্যাকার `SECURITY DEFINER` ফাংশনে ম্যালিশিয়াস প্যারামিটার পাস করতে পারে, তবে সে ডেটাবেজের যেকোনো টেবিল এক্সেস করে ফেলতে পারে। প্রিভেনশন: ফাংশনের ভেতরে কঠোর ইনপুট ভ্যালিডেশন এবং `SET search_path = public` স্পষ্টভাবে কনফিগার করতে হবে।",
      b: "SECURITY INVOKER কলকারীর পারমিশন অনুযায়ী চলে। SECURITY DEFINER নির্মাতার সুপার-অ্যাডমিন পারমিশন নিয়ে RLS বাইপাস করে চলে। তাই ডিফেইনার ফাংশনে কঠোর প্যারামিটার চেক এবং search_path সেট করা আবশ্যক।",
      e: "SECURITY INVOKER executes with the calling user's restricted privileges, adhering to their RLS policies. SECURITY DEFINER executes with the function creator's elevated privileges (bypassing the invoker's RLS constraints). Always guard DEFINER functions with explicit search_paths to prevent privilege escalation attacks.",
      code: "CREATE FUNCTION promote_user(target_id UUID)\nRETURNS VOID SECURITY DEFINER SET search_path = public AS $$ ... $$ LANGUAGE plpgsql;"
    },
    {
      lvl: "lvl2",
      q: "Supabase Edge Functions (Deno/TypeScript) কখন ব্যবহার করবে এবং ডেটাবেজের সাথে এর ইন্টারঅ্যাকশন কেমন?",
      m: "Edge Functions হলো বিশ্বব্যাপী ডিস্ট্রিবিউটেড সার্ভারলেস ফাংশন (Deno রানটাইম)। যখন কোনো কাজ সরাসরি ব্রাউজার বা RLS পলিসির মাধ্যমে করা যায় না—যেমন: Stripe পেমেন্ট গেটওয়ের সিক্রেট কি হ্যান্ডেল করা, পাসওয়ার্ডবিহীন ম্যাজিক লিঙ্ক পাঠানো, থার্ড পার্টি সেন্ডগ্রিড ইমেইল পাঠানো, বা ভারী বিজনেস লজিক সম্পাদন করা—তখন Edge Functions ব্যবহৃত হয়। এটি `supabase-js` ক্লায়েন্ট দিয়ে `service_role` কি ব্যবহার করে নিরাপদে ডেটাবেজ অ্যাক্সেস করতে পারে।",
      b: "স্ট্রাইপ পেমেন্ট হ্যান্ডেল করা, ইমেইল পাঠানো বা সিক্রেট কি লুকানোর মতো ব্যাকএন্ড কাজের জন্য Supabase Edge Functions ব্যবহার করা হয়। এটি কোনো সার্ভার ছাড়াই গ্লোবালি ডিনো রানটাইমে চলে।",
      e: "Supabase Edge Functions are globally distributed serverless TypeScript functions running on Deno. They execute secure backend logic that cannot reside in clients: verifying third-party webhooks (Stripe/bKash), sending transactional emails, or running batch operations with the service_role key.",
      code: "import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';\nserve(async (req) => {\n  return new Response(JSON.stringify({ message: 'Hello from Edge' }), { headers: { 'Content-Type': 'application/json' } });\n});"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "Supabase RLS-এ Subquery পারফরম্যান্স অপটিমাইজেশন: কেন পলিসিতে `EXISTS (SELECT 1 ...)` স্লো হতে পারে এবং কীভাবে ফিক্স করবে?",
      m: "যদি কোনো টেবিলে ১ লক্ষ রো থাকে এবং RLS পলিসিতে লেখা হয় `USING (EXISTS (SELECT 1 FROM team_members WHERE team_id = orders.team_id AND user_id = auth.uid()))`, তবে পোস্টগ্রেস প্রতিটি রোর জন্য বারবার ওই সাব-কুয়েরি চালাতে পারে (Correlated Subquery Overhead), যা কুয়েরিকে চরম স্লো করে দেয়। সমাধান: (১) `auth.jwt()`-তে সরাসরি ইউজারের `team_id` কাস্টম ক্লেইম হিসেবে ইনজেক্ট করা—যাতে কোনো ডেটাবেজ সাব-কুয়েরি ছাড়াই মেমোরি থেকে পলিসি চেক হয়ে যায়। (২) অথবা একটি `SECURITY DEFINER` STABLE ক্যাশড ফাংশন তৈরি করা যা মেমোরিতে মেম্বারশিপ যাচাই করে।",
      b: "RLS পলিসিতে প্রতি রোর জন্য সাব-কুয়েরি চললে পারফরম্যান্স ধ্বংস হয়। JWT টোকেনে সরাসরি team_id রেখে মেমোরি থেকে চেক করলে অথবা STABLE ফাংশন ব্যবহার করলে পারফরম্যান্স ১০০ গুণ বাড়ে।",
      e: "Correlated subqueries in RLS USING clauses execute once per evaluated row, bottlenecking bulk scans. Mitigate by embedding team/organization IDs directly inside the user's JWT claims upon login, or caching lookups using a STABLE helper function that evaluates once per query.",
      code: "-- Fast JWT-based policy:\nCREATE POLICY team_policy ON orders\nFOR ALL USING (team_id = (auth.jwt()->'app_metadata'->>'team_id')::uuid);"
    },
    {
      lvl: "lvl3",
      q: "Supabase Storage-এ Bucket Security ও Row-Level Security Policies কীভাবে ডিজাইন করবে?",
      m: "Supabase Storage ফাইল সংরক্ষণের পাশাপাশি প্রতিটি ফাইলের মেটাডেটা `storage.objects` নামক একটি অভ্যন্তরীণ PostgreSQL টেবিলে সংরক্ষণ করে। এর মানে হলো: আপনি সাধারণ টেবিলের মতোই ফাইল বালতির ওপরেও RLS পলিসি লিখতে পারেন! যেমন: একজন ইউজার কেবল তার নিজস্ব ফোল্ডারের ফাইল আপলোড বা ডিলিট করতে পারবে। পলিসিতে আমরা চেক করি: `bucket_id = 'avatars' AND (storage.foldername(name))[1] = auth.uid()::text`। এর ফলে কোনো ইউজার অন্য কোনো ইউজারের আপলোড করা ফাইলে হস্তক্ষেপ করতে পারে না।",
      b: "সুপাবেস স্টোরেজ ফাইলগুলোর তথ্য storage.objects টেবিলে রাখে। ফলে ফোল্ডার পাথ চেক করে (storage.foldername) নিজস্ব ফোল্ডারে ফাইল সেভ ও ডিলিট করার RLS পলিসি লিখে নিখুঁত ফাইল সিকিউরিটি নিশ্চিত করা যায়।",
      e: "Supabase Storage backs file metadata via the storage.objects PostgreSQL table, permitting full RLS policies over binary assets. Restrict folder uploads via storage.foldername(name)[1] === auth.uid()::text, guaranteeing users can only read and mutate their isolated user folders.",
      code: "CREATE POLICY \"Allow individual folder access\" ON storage.objects\nFOR ALL USING (\n  bucket_id = 'user-files' AND\n  (storage.foldername(name))[1] = auth.uid()::text\n);"
    },
    {
      lvl: "lvl3",
      q: "Database Webhooks (pg_net) কীভাবে কাজ করে এবং ডেটাবেজ ইভেন্টে এক্সটারনাল এপিআই কীভাবে কল করে?",
      m: "Supabase Database Webhooks পোস্টগ্রেসের `pg_net` এক্সটেনশন ব্যবহার করে। যখন কোনো টেবিলে নির্দিষ্ট ইভেন্ট (INSERT, UPDATE, DELETE) ঘটে, তখন পোস্টগ্রেস কোনো ব্লকিং ছাড়াই অ্যাসিনক্রোনাস HTTP POST রিকোয়েস্ট পাঠায় কোনো এক্সটারনাল এপিআই এন্ডপয়েন্টে (যেমন নোড সার্ভার, স্ল্যাক চ্যানেল, বা ক্লাউড ফাংশন)। পে-লোডে পুরনো এবং নতুন রোর ডেটা (`OLD` এবং `NEW`) স্বয়ংক্রিয়ভাবে থাকে। এটি ডাটাবেজ ট্রানজ্যাকশন শেষ হওয়ার পর নন-ব্লকিংভাবে চলে, ফলে মূল কুয়েরির ল্যাটেন্সিতে কোনো প্রভাব পড়ে না।",
      b: "pg_net এক্সটেনশন ব্যবহার করে ডেটাবেজে পরিবর্তন হওয়ার সাথে সাথে স্বয়ংক্রিয়ভাবে বাইরের যেকোনো সার্ভারে HTTP রিকোয়েস্ট পাঠানো যায়। এটি কোনো ব্লকিং ছাড়াই ব্যাকগ্রাউন্ডে চলে।",
      e: "Supabase Database Webhooks use the asynchronous pg_net extension to dispatch HTTP POST requests directly from PostgreSQL triggers upon table mutations. Operating asynchronously out-of-band, webhook dispatch introduces zero transaction latency to client mutations.",
      tip: "বলো: 'Database webhooks dispatch asynchronous HTTP requests via pg_net without stalling the write transaction.'"
    },
    {
      lvl: "lvl3",
      q: "Multi-Tenant SaaS অ্যাপ্লিকেশনে Supabase দিয়ে কীভাবে Tenant Isolation পলিসি লিখবে?",
      m: "সুপাবেসে টেন্যান্ট আইসোলেশনের জন্য ইউজারের লগইন টোকেনে `tenant_id` সংরক্ষিত থাকে। টেবিলে RLS পলিসি লেখা হয়: `CREATE POLICY tenant_isolation ON invoices FOR ALL USING (tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::uuid) WITH CHECK (tenant_id = (auth.jwt() -> 'app_metadata' ->> 'tenant_id')::uuid);`। এটি নিশ্চিত করে যে ফ্রন্টএন্ড বা ব্যাকএন্ড থেকে যেই কুয়েরি করুক না কেন, ইউজার শুধুমাত্র তার নিজের টেন্যান্টের ডেটাই দেখতে পাবে এবং নতুন রেকর্ড ইনসার্ট করার সময়ও টেন্যান্ট আইডি বাধ্যতামূলকভাবে ম্যাচ করতে হবে।",
      b: "JWT টোকেনের app_metadata থেকে tenant_id ম্যাচ করে USING এবং WITH CHECK পলিসি লিখলে মাল্টি-টেন্যান্ট ডেটাবেজে কোনো টেন্যান্টের ডেটা অন্য কারও কাছে যাওয়ার সুযোগ থাকে না।",
      e: "Enforce multi-tenant isolation in Supabase by extracting tenant_id from the user's auth.jwt() claims in both USING and WITH CHECK clauses, ensuring zero data crosstalk across merchant organizations.",
      code: "CREATE POLICY tenant_guard ON orders\nFOR ALL USING (tenant_id = (auth.jwt()->'app_metadata'->>'tenant_id')::uuid)\nWITH CHECK (tenant_id = (auth.jwt()->'app_metadata'->>'tenant_id')::uuid);"
    },
    {
      lvl: "lvl3",
      q: "Supabase Realtime-এ Row-Level Security (RLS) কীভাবে প্রয়োগ হয় যাতে অন্য ইউজারের ডেটা ব্রাউজার সকেটে না যায়?",
      m: "Supabase Realtime v2+ পোস্টগ্রেস RLS-এর সাথে পূর্ণাঙ্গভাবে ইন্টিগ্রেটেড। যখন ক্লায়েন্ট কোনো টেবিলে পরিবর্তন শোনার জন্য কানেক্ট করে, সে তার JWT অথেনটিকেশন টোকেন পাঠায়। রিয়েলটাইম সার্ভার প্রতিটি চেঞ্জ ইভেন্ট ব্রডকাস্ট করার আগে ইউজারের টোকেন দিয়ে পোস্টগ্রেস RLS পলিসি ইভ্যালুয়েট করে। যদি ওই রোর জন্য ইউজারের SELECT পারমিশন না থাকে, তবে রিয়েলটাইম সার্ভার ফিল্টার আউট করে দেয় এবং ওই ইভেন্টটি কখনোই ব্রাউজারে যায় না। ফলে ব্রাউজার কেবল নিজের অনুমোদিত ডেটারই লাইভ আপডেট পায়।",
      b: "সুপাবেস রিয়েলটাইম স্বয়ংক্রিয়ভাবে RLS পলিসি মেনে চলে। কোনো ইউজারের যদি ডাটা দেখার SELECT পারমিশন না থাকে, তবে সেই ডেটা পরিবর্তন হলেও ব্রাউজার সকেটে কোনো ইভেন্ট যায় না।",
      e: "Supabase Realtime v2 evaluates PostgreSQL RLS policies against the client's JWT credentials before dispatching change events over the WebSocket connection. If an authenticated user lacks SELECT permissions for a mutated row, the payload is suppressed, eliminating data leaks.",
      tip: "ইন্টারভিউতে 'Realtime v2 respects RLS policies before streaming payloads over WebSockets' উল্লেখ করবে।"
    },

    // --- SITUATION BASED (5 Questions) ---
    {
      lvl: "situation",
      q: "পরিস্থিতি: একজন জুনিয়র ডেভেলপার ফ্রন্টএন্ড কোডে `const { data } = await supabase.from('users').select('*')` কল করল, কিন্তু রেসপন্সে খালি অ্যারে `[]` ফিরল অথচ টেবিলে হাজার হাজার ইউজার আছে! কোনো এরর নেই। কারণ কী এবং কীভাবে ফিক্স করবে?",
      m: "সমস্যার কারণ: টেবিলে RLS অন করা হয়েছে ঠিকই, কিন্তু কোনো `SELECT` পলিসি লেখা হয়নি! পোস্টগ্রেসে RLS সক্রিয় থাকলে এবং কোনো পলিসি না থাকলে ডেটাবেজ কোনো এরর দেয় না—বরং সিকিউরিটির স্বার্থে সাইলেন্টলি ০টি রো রিটার্ন করে (ডিফল্ট ডিনাই)। সমাধান: টেবিলে উপযুক্ত SELECT পলিসি তৈরি করতে হবে (যেমন পাবলিক ডেটার জন্য `FOR SELECT USING (true)` অথবা ওনারশিপ ডেটার জন্য `FOR SELECT USING (id = auth.uid())`)।",
      b: "RLS সক্রিয় থাকা অবস্থায় কোনো SELECT পলিসি ডিফাইন না করলে ডাটাবেজ সাইলেন্টলি খালি অ্যারে রিটার্ন করে। টেবিলে উপযুক্ত SELECT পলিসি যোগ করলেই ডেটা দেখতে পাওয়া যাবে।",
      e: "When RLS is enabled without an active matching SELECT policy, PostgreSQL's default-deny security model silently returns an empty array ([]) with zero errors. Fix by declaring an explicit SELECT policy matching the intended authorization criteria.",
      code: "CREATE POLICY \"Allow authenticated read\" ON users\nFOR SELECT TO authenticated USING (true);"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: ফ্রন্টএন্ড কোডে ভুলবশত `SUPABASE_SERVICE_ROLE_KEY` গিটহাব পাবলিক রিপোজিটরিতে পুশ হয়ে গেছে। কী কী তাৎক্ষণিক পদক্ষেপ নেবে?",
      m: "জরুরি পদক্ষেপসমূহ: (১) মুহূর্তের মধ্যে Supabase ড্যাশবোর্ডে গিয়ে `Settings > API`-তে ঢুকে `Service Role Key` রোটেট (Roll Key) করে নতুন কি জেনারেট করব—যাতে পুরনো লিক হওয়া কি-টি অবিলম্বে বাতিল হয়ে যায়। (২) প্রোডাকশন এনভায়রনমেন্ট ভ্যারিয়েবলে নতুন কি আপডেট করে অ্যাপ রিস্টার্ট করব। (৩) GitGuardian বা BFG Repo-Cleaner দিয়ে গিট হিস্ট্রি থেকে সিক্রেট পার্জ করব। (৪) ডেটাবেজ অডিট লগে চেক করব এই সময়ের মধ্যে কোনো অননুমোদিত বাল্ক এক্সপোর্ট বা ডাটা ড্রপ কুয়েরি চালানো হয়েছে কি না।",
      b: "তাৎক্ষণিকভাবে সুপাবেস ড্যাশবোর্ড থেকে সার্ভিস রোল কি রোল/রোটেট করে পুরনো কি বাতিল করতে হবে। ব্যাকএন্ডে নতুন কি আপডেট করে গিট হিস্ট্রি পরিষ্কার করতে হবে এবং ডেটাবেজ অডিট লগ পর্যবেক্ষণ করতে হবে।",
      e: "Immediately regenerate the Service Role Key within the Supabase dashboard to invalidate the exposed credential globally. Deploy the new key to production environment variables, scrub Git history using BFG Repo-Cleaner, and audit database query logs for unauthorized intrusion.",
      tip: "বলো: 'Immediate key rotation in Supabase console, followed by Git secret purge and audit log inspection.'"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: তোমার টিমের একজন ডেভেলপার ফ্রন্টএন্ড থেকে ইনভয়েস স্ট্যাটাস 'PENDING' থেকে 'PAID'-এ আপডেট করার কোড লিখেছে। কিন্তু একজন সাধারণ কাস্টমার ব্রাউজার থেকে রিকোয়েস্ট পাঠিয়ে পেমেন্ট ছাড়াই ইনভয়েস 'PAID' করে দিচ্ছে! কীভাবে RLS দিয়ে এটি প্রতিরোধ করবে?",
      m: "মারাত্মক আর্কিটেকচারাল ভুল: ক্লায়েন্টকে সরাসরি সংবেদনশীল `status` ফিল্ড আপডেট করার অনুমতি দেওয়া হয়েছে! সমাধান: (১) সাধারণ ইউজারের জন্য UPDATE পলিসিতে শুধুমাত্র নন-সংবেদনশীল ফিল্ড এলাও করব অথবা `status` ফিল্ডের পরিবর্তন ব্লক করব: `WITH CHECK (status = (SELECT status FROM invoices WHERE id = invoices.id))`। (২) ইনভয়েস স্ট্যাটাস 'PAID' করার ক্ষমতা সম্পূর্ণভাবে ফ্রন্টএন্ড থেকে কেড়ে নিয়ে একটি সুরক্ষিত ব্যাকএন্ড Edge Function বা নোড সার্ভারে স্থানান্তর করতে হবে—যেখানে বিকাশ/স্ট্রাইপ পেমেন্ট সফল হওয়ার পরই কেবল `service_role` দিয়ে স্ট্যাটাস আপডেট হবে।",
      b: "কাস্টমার যেন নিজে স্ট্যাটাস আপডেট করতে না পারে সেজন্য RLS পলিসিতে শর্ত দিতে হবে এবং স্ট্যাটাস পেইড করার কাজটি ক্লায়েন্ট থেকে সরিয়ে সার্ভার-সাইড পেমেন্ট ভেরিফিকেশন ফাংশনে স্থানান্তর করতে হবে।",
      e: "Revoke client permissions to update the sensitive status column via RLS policies. Confine payment confirmation logic to an Edge Function or secure server that updates status exclusively after verifying genuine payment gateway callbacks.",
      code: "CREATE POLICY \"Customers can only update notes\" ON invoices\nFOR UPDATE USING (customer_id = auth.uid())\nWITH CHECK (status = 'PENDING'); -- Disallow self-marking as PAID"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: ড্যাশবোর্ডে পেজ রিফ্রেশ না করেই নতুন অর্ডার লাইভ দেখানোর জন্য Supabase Realtime সাবস্ক্রিপশন ব্যবহার করা হয়েছে, কিন্তু প্রোডাকশনে একই অর্ডারের ইভেন্ট একাধিকবার আসছে এবং ডুপ্লিকেট নোটিফিকেশন দেখাচ্ছে। কীভাবে ফিক্স করবে?",
      m: "কারণসমূহ: (১) React কম্পোনেন্টে `useEffect`-এর ভেতর সাবস্ক্রিপশন তৈরির পর ক্লিনআপ ফাংশন দেওয়া হয়নি, ফলে প্রতিটি রি-রেন্ডারে নতুন WebSocket চ্যানেল তৈরি হয়ে ডুপ্লিকেট লিসেনার বসছে। (২) ব্যাকএন্ডে একই ট্রানজ্যাকশনে একাধিক UPDATE কল হওয়ায় একাধিক CDC ইভেন্ট ফায়ার হচ্ছে। ফিক্স: (১) React-এ অবশ্যই `return () => { supabase.removeChannel(channel); }` ক্লিনআপ রিটার্ন করতে হবে। (২) ফ্রন্টএন্ড স্টেটে অর্ডার পুশ করার আগে একটি ইউনিক সেট বা `id` দিয়ে ডি-ডুপ্লিকেশন চেক করতে হবে: `if (!existingIds.has(newOrder.id)) { ... }`।",
      b: "useEffect-এ চ্যানেল ক্লিনআপ না করায় এবং স্টেট আপডেটে আইডি চেক না করায় ডুপ্লিকেট ইভেন্ট আসছে। removeChannel দিয়ে আনমাউন্টে ক্লিনআপ এবং আইডির ভিত্তিতে ডি-ডুপ্লিকেশন করলেই সমস্যা সমাধান হবে।",
      e: "The duplicate notifications stem from missing React useEffect subscription cleanups upon re-renders. Always return a cleanup function invoking supabase.removeChannel(channel), and enforce an in-memory Set or Map deduplication filter on incoming event IDs before state injection.",
      code: "useEffect(() => {\n  const channel = supabase.channel('orders')\n    .on('postgres_changes', { event: 'INSERT', table: 'orders' }, handleNewOrder)\n    .subscribe();\n  return () => { supabase.removeChannel(channel); }; // Crucial cleanup!\n}, []);"
    },
    {
      lvl: "situation",
      q: "পরিস্থিতি: Supabase RLS ব্যবহারের পর একটি পেজে ৫০টি প্রোডাক্ট রেন্ডার করতে গিয়ে এপিআই রেসপন্স টাইম ৫০০ms থেকে বেড়ে ৩.৫ সেকেন্ড হয়ে গেছে। কুয়েরি প্ল্যানে কী খুঁজবে এবং কীভাবে ফিক্স করবে?",
      m: "তদন্ত: `EXPLAIN ANALYZE SELECT * FROM products;` চালালে দেখা যাবে RLS পলিসির ভেতরে থাকা ইউজার রোল চেক করার ফাংশনটি প্রতিটি রোর জন্য ৫০ বার রান হচ্ছে এবং প্রতিবার ফুল টেবিল স্ক্যান করছে। ফিক্স: (১) RLS পলিসিতে ব্যবহৃত কলামগুলোতে (যেমন `created_by`, `org_id`) B-Tree ইনডেক্স নিশ্চিত করা। (২) পলিসির ভেতরের সাব-কুয়েরিকে একটি `SECURITY DEFINER STABLE` ফাংশন দিয়ে র‍্যাপ করা—যাতে পোস্টগ্রেস পুরো কুয়েরির জন্য ফাংশনটি মাত্র একবার রান করে রেজাল্ট ক্যাশ করে রাখে এবং ৫০ বার না চালায়। রেসপন্স টাইম সাথে সাথে ২০ মিলিসেকেন্ডে নেমে আসবে।",
      b: "RLS পলিসির ভেতরে থাকা ফাংশন প্রতিটি রোর জন্য বারবার চলায় কুয়েরি স্লো হয়েছিল। ফাংশনটিকে STABLE মার্ক করলে পোস্টগ্রেস এটি একবার এক্সিকিউট করে ক্যাশ করে রাখে এবং কুয়েরি তাৎক্ষণিক দ্রুত হয়।",
      e: "The latency surge occurs because an unindexed RLS policy subquery evaluates on every single row scan. Wrap the authorization lookup inside a STABLE SQL function; the planner executes STABLE functions once per transaction statement rather than once per row.",
      code: "CREATE OR REPLACE FUNCTION get_current_user_role()\nRETURNS TEXT STABLE LANGUAGE sql AS $$\n  SELECT role FROM user_roles WHERE user_id = auth.uid();\n$$;"
    },

    // --- REAL WORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা (Dokani SaaS): Dokani-তে ক্যাশিয়ার, ইনভেন্টরি ম্যানেজার এবং শপ ওনারের জন্য Supabase RLS দিয়ে গ্র্যানুলার এক্সেস পলিসি কীভাবে সাজানো হয়েছে?",
      m: "দোকানি পিওএসে পোস্টগ্রেস RLS দিয়ে ৩ স্তরের রোল-বেসড পলিসি কার্যকর: (১) `CASHIER`: শুধুমাত্র সেলস ইনভয়েস তৈরি করতে পারে (`INSERT`) এবং সেলসের হিস্ট্রি দেখতে পারে (`SELECT`), কিন্তু প্রোডাক্টের কস্ট প্রাইস বা প্রফিট মার্জিন দেখতে পারে না এবং কোনো পুরনো ইনভয়েস এডিট বা ডিলিট করতে পারে না (`UPDATE/DELETE denied`)। (২) `MANAGER`: প্রোডাক্ট স্টক আপডেট ও ক্যাটালগ এডিট করতে পারে কিন্তু ফিনান্সিয়াল লেজার বা দোকান ডিলিট করতে পারে না। (৩) `OWNER`: সমস্ত টেবিল, প্রফিট-লস অ্যানালিটিক্স এবং সেটিংসে পূর্ণ অধিকার রাখে। এই পলিসি ডেটাবেজ লেভেলে সুরক্ষিত থাকায় ফ্রন্টএন্ড কোডে কোনো বাগ থাকলেও নিরাপত্তা কখনো লঙ্ঘন হয় না।",
      b: "দোকানিতে RLS দিয়ে ক্যাশিয়ারকে শুধু সেলস করা ও দেখার অনুমতি দেওয়া হয়েছে (দাম পরিবর্তন বা ডিলিট নিষিদ্ধ), ম্যানেজারকে স্টক ম্যানেজ করার এবং ওনারকে সমস্ত রিপোর্টিং দেখার পূর্ণ অধিকার দিয়ে ডেটাবেজ লেভেলে নিরাপত্তা সুরক্ষিত রাখা হয়েছে।",
      e: "In Dokani POS, granular RLS policies govern organizational roles: CASHIERs hold INSERT/SELECT privileges strictly over invoices with cost prices masked; MANAGERs possess inventory mutation rights; OWNERs retain overarching financial ledger and analytical access.",
      tip: "দোকানির এই ৩-লেভেল রোল সেপারেশন (Cashier vs Manager vs Owner) বাস্তব এন্টারপ্রাইজ সিস্টেমের ক্লাসিক উদাহরণ।"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Supabase-এ OAuth (Google, GitHub) লগইনের পর অটোমেটিক ইউজার অনবোর্ডিং ও রোল অ্যাসাইনমেন্ট কীভাবে হ্যান্ডেল করবে?",
      m: "ইউজার যখন Google দিয়ে সাইন আপ করে: (১) Supabase Auth স্বয়ংক্রিয়ভাবে `auth.users` টেবিলে গুগলের তথ্য (ইমেইল, নাম, এভাটার) ইনসার্ট করে। (২) আমাদের ডেটাবেজ ট্রিগার `on_auth_user_created` ফায়ার হয়। (৩) ট্রিগারটি চেক করে ইউজারের কোনো ইনভাইটেশন টোকেন আছে কি না; না থাকলে সে একটি নতুন টেন্যান্ট তৈরি করে এবং ইউজারকে `OWNER` রোল দেয়। (৪) যদি ইনভাইটেশন থাকে, সে সংশ্লিষ্ট কোম্পানিতে ইউজারকে `CASHIER` রোলে জয়েন করায়। পুরো প্রক্রিয়াটি ক্লায়েন্টের কোনো ইন্টারভেনশন ছাড়াই এক ট্রানজ্যাকশনে সম্পন্ন হয়।",
      b: "গুগল সাইনআপের পর ডেটাবেজ ট্রিগার স্বয়ংক্রিয়ভাবে ইউজারের প্রোফাইল তৈরি করে, ইনভাইটেশন যাচাই করে কোম্পানি ও রোল অ্যাসাইন করে দেয়। ক্লায়েন্ট কোড ছাড়াই ব্যাকগ্রাউন্ডে পুরো প্রক্রিয়া সম্পন্ন হয়।",
      e: "Upon OAuth completion, an asynchronous PostgreSQL trigger on auth.users inspects invitation metadata, provisions the public profile, creates or associates tenant organizations, and assigns initial RBAC roles in a single database step.",
      code: "CREATE TRIGGER on_oauth_signup AFTER INSERT ON auth.users\nFOR EACH ROW EXECUTE FUNCTION handle_oauth_onboarding();"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Supabase Auth-এ কাস্টম JWT Claims ইনজেকশন (Custom Access Tokens) কীভাবে কনফিগার করবে?",
      m: "Supabase v2-এ কাস্টম JWT ক্লেইমস ইনজেক্ট করার জন্য 'Custom Access Token (Auth Hook)' ব্যবহার করা হয়। আমরা একটি PostgreSQL ফাংশন লিখি যা Supabase Auth-এর `auth.jwt_attribute` হুকে রেজিস্টার করা থাকে। যখনই ইউজার লগইন করে বা টোকেন রিফ্রেশ হয়, এই হুকটি স্বয়ংক্রিয়ভাবে ইউজারের ডাটাবেজ টেবিল থেকে `tenant_id`, `role`, এবং `permissions` অ্যারে তুলে এনে JWT-র ভেতর ইনজেক্ট করে এনকোড করে দেয়। ফলে ফ্রন্টএন্ড এবং RLS পলিসি প্রতি রিকোয়েস্টে কোনো অতিরিক্ত ডেটাবেজ কুয়েরি ছাড়াই মুহূর্তেই ইউজারের পারমিশন ভ্যালিডেট করতে পারে।",
      b: "সুপাবেস অ্যাথ হুক ব্যবহার করে লগইনের সময় টোকেনের ভেতর tenant_id ও role ইনজেক্ট করা হয়। ফলে এপিআই এবং RLS কোনো অতিরিক্ত কুয়েরি ছাড়াই টোকেন দেখে ইউজারের রোল যাচাই করতে পারে।",
      e: "Configure Supabase Custom Access Token Hooks via PL/pgSQL. The auth hook intercepts token signing during login, querying user roles and tenant IDs and embedding them directly into the signed JWT payload, eliminating runtime database lookups during RLS evaluation.",
      code: "CREATE OR REPLACE FUNCTION custom_access_token_hook(event jsonb)\nRETURNS jsonb LANGUAGE plpgsql STABLE AS $$\n  -- Injects tenant_id and role into event->'claims'\n$$;"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Supabase-এ Soft Delete আর্কিটেকচার এবং RLS পলিসির সমন্বয় কীভাবে করবে?",
      m: "সফট ডিলিটের জন্য প্রতিটি টেবিলে `deleted_at TIMESTAMPTZ` ফিল্ড রাখা হয়। এরপর RLS পলিসিতে স্বাভাবিক শর্তের সাথে `AND deleted_at IS NULL` যুক্ত করা হয়। যখন কোনো ইউজার কোনো রো 'ডিলিট' করে, ক্লায়েন্ট আসলে `UPDATE products SET deleted_at = NOW()` চালায়। RLS পলিসির কারণে এর পর থেকে সাধারণ কোনো কুয়েরিতে ডিলিট হওয়া রেকর্ডগুলো আর আসবে না। কিন্তু অ্যাডমিন বা অডিট ট্রেইলের জন্য আলাদা সার্ভিস রোল কুয়েরি দিয়ে যেকোনো সময় মুছে যাওয়া ডেটা ফিরিয়ে আনা (Restore) সম্ভব হয়।",
      b: "সফট ডিলিটের ক্ষেত্রে RLS পলিসিতে deleted_at IS NULL শর্ত জুড়ে দেওয়া হয়। ফলে ডিলিট হওয়া রেকর্ড স্বাভাবিক কুয়েরিতে অদৃশ্য থাকে কিন্তু ব্যাকআপ ও অডিটের জন্য ডাটাবেজে স্থায়ীভাবে সংরক্ষিত থাকে।",
      e: "Coupling Soft Deletion with RLS requires appending AND deleted_at IS NULL to the SELECT/UPDATE USING policies. Deleting an entity mutates deleted_at = NOW(), instantly rendering the record invisible to normal tenants while preserving historical auditability.",
      code: "CREATE POLICY \"Active products only\" ON products\nFOR SELECT USING (\n  tenant_id = (auth.jwt()->'app_metadata'->>'tenant_id')::uuid AND\n  deleted_at IS NULL\n);"
    },
    {
      lvl: "realworld",
      q: "বাস্তব অভিজ্ঞতা: Supabase প্রোডাকশন ডেটাবেজ মাইগ্রেশন ও লোকাল ডেভেলপমেন্ট ওয়ার্কফ্লো (Supabase CLI) কীভাবে পরিচালিত হয়?",
      m: "প্রোডাকশন ডেটাবেজে সরাসরি ড্যাশবোর্ড থেকে চেঞ্জ করা সম্পূর্ণ নিষিদ্ধ! আমরা `supabase init` এবং Docker দিয়ে লোকাল ডেটাবেজ চালাই। সব স্কিমা ও RLS পলিসির পরিবর্তন `supabase db diff -f add_orders_rls` কমান্ড দিয়ে ভার্সন-কন্ট্রোল্ড SQL মাইগ্রেশন ফাইল হিসেবে গিটহাবে কমিট করা হয়। এরপর GitHub Actions CI/CD পাইপলাইনে টেস্ট চালানো হয় এবং `supabase db push` কমান্ড দিয়ে স্বয়ংক্রিয়ভাবে প্রোডাকশন ডাটাবেজে মাইগ্রেশন অ্যাপ্লাই করা হয়। এটি কোনো অপ্রত্যাশিত ম্যানুয়াল ত্রুটি ছাড়া ১০০% নিরাপদ ও ট্র্যাকড ডিপ্লয়মেন্ট নিশ্চিত করে।",
      b: "প্রোডাকশনে ম্যানুয়াল চেঞ্জ নিষিদ্ধ। লোকাল ডকার ও Supabase CLI দিয়ে কাজ করে supabase db diff দিয়ে মাইগ্রেশন ফাইল তৈরি করা হয় এবং গিটহাব অ্যাকশন দিয়ে প্রোডাকশনে অটো-মাইগ্রেট করা হয়।",
      e: "Enforce strict CI/CD with the Supabase CLI: develop locally against Docker containers, capture declarative schema/RLS changes using supabase db diff, commit migrations to Git, and apply them automatically to production environments via GitHub Actions with supabase db push.",
      tip: "বলো: 'We strictly prohibit dashboard mutations; all schema and RLS policies are version-controlled via Supabase CLI migrations in CI/CD.'"
    }
  ]
};
