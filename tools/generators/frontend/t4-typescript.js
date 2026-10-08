// Topic 4: TypeScript & Type Safety (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "typescript-core",
  name: "TypeScript & Type Safety",
  desc: "Static Typing, Interface vs Type, Generics, Utility Types, Discriminated Unions, Type Narrowing, Strict Mode",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "TypeScript-এ `type` এবং `interface`-এর মধ্যে মৌলিক পার্থক্য কী এবং কখন কোনটি ব্যবহার করবে?",
      m: "দুটিই অবজেক্টের শেপ ডিফাইন করতে পারে। কিন্তু `interface` কে 'Declaration Merging' করা যায় (একই নামের দুটি ইন্টারফেস নিজে থেকেই এক হয়ে যায়) এবং এটি `extends` দিয়ে অবজেক্ট ওরিয়েন্টেড স্টাইলে এক্সটেন্ড করা সহজ—তাই পাবলিক লাইব্রেরি বা অবজেক্টের জন্য ইন্টারফেস বেস্ট। আর `type` দিয়ে Union (`type A = 'active' | 'inactive'`), Intersection, Tuples এবং প্রিমিটিভ এলিয়াস ডিফাইন করা যায় যা ইন্টারফেসে সরাসরি সম্ভব নয়।",
      b: "ইন্টারফেস ডিক্লারেশন মার্জিং সমর্থন করে এবং অবজেক্টের কাঠামো তৈরিতে বেশি উপযোগী। অন্যদিকে টাইপ অ্যালিয়াস দিয়ে ইউনিয়ন, টাপল এবং জটিল কম্বাইন্ড টাইপ তৈরি করা যায়। রিঅ্যাক্ট কম্পোনেন্টের প্রপস ও অবজেক্টে ইন্টারফেস এবং ইউনিয়ন ও স্টেট টাইপে type ব্যবহার করা ভালো প্র্যাকটিস।",
      e: "Interfaces support declaration merging and extend cleanly for OOP object models, making them ideal for public APIs and object contracts. Type aliases can express unions, primitives, tuples, and mapped types which interfaces cannot natively do.",
      code: "type Status = 'PENDING' | 'PAID'; // Union with type\ninterface User { id: string; name: string; } // Interface"
    },
    {
      lvl: "lvl1",
      q: "TypeScript-এ `any`, `unknown`, এবং `never`-এর মধ্যে পার্থক্য কী?",
      m: "`any` টাইপস্ক্রিপ্টের পুরো টাইপ-চেকিং সিস্টেম বন্ধ করে দেয়, যা রানটাইম বাগের ঝুঁকি বাড়ায়। `unknown` হলো টাইপ-সেফ অল্টারনেটিভ; এতে যেকোনো ভ্যালু রাখা যায়, কিন্তু টাইপ ন্যারোয়িং (যেমন `typeof` বা `instanceof`) না করা পর্যন্ত এর ওপর কোনো মেথড কল বা অপারেশন চালানো যায় না। আর `never` নির্দেশ করে এমন মান যা কখনোই ঘটতে পারে না (যেমন এমন ফাংশন যা সবসময় এরর থ্রো করে বা ইনফাইনাইট লুপে চলে)।",
      b: "any টাইপ সেফটি পুরোপুরি নিষ্ক্রিয় করে দেয়। unknown নিরাপদ বিকল্প যা ন্যারো বা যাচাই ছাড়া অপারেশন চালাতে দেয় না। never এমন অবস্থাকে বোঝায় যা কখনই তৈরি হওয়া সম্ভব নয় বা কোনো মান রিটার্ন করে না।",
      e: "any turns off all type checking. unknown is a type-safe counterpart requiring type narrowing before property access or invocation. never represents values that never occur, such as functions that always throw or infinite loops.",
      code: "function throwErr(msg: string): never { throw new Error(msg); }"
    },
    {
      lvl: "lvl1",
      q: "TypeScript-এ `strict: true` ফ্ল্যাগ অন করার সুবিধা কী এবং এর মধ্যে কোন কোন রুল সক্রিয় হয়?",
      m: "`tsconfig.json`-এ `strict: true` দিলে টাইপস্ক্রিপ্টের সর্বোচ্চ টাইপ সেফটি সক্রিয় হয়। এর প্রধান রুলগুলো হলো: (১) `noImplicitAny`: টাইপ না দিলে যেন ভুলেও `any` ইনফার না করে, (২) `strictNullChecks`: ভ্যারিয়েবলে `null` বা `undefined` থাকলে সরাসরি মেথড কল ব্লক করে, (৩) `strictFunctionTypes`: ফাংশন প্যারামিটারের টাইপ কঠোরভাবে চেক করে, (৪) `alwaysStrict`: কোড সবসময় ES5 'use strict' মোডে আউটপুট দেয়।",
      b: "strict মোড অন করলে প্রজেক্টে কঠোর টাইপ ভ্যালিডেশন চালু হয়। এটি কোনো ভ্যারিয়েবলকে স্বয়ংক্রিয়ভাবে any হতে দেয় না এবং নাল বা আনডিফাইন্ড ভ্যালুর কারণে ব্রাউজারে ক্র্যাশ হওয়া পুরোপুরি রোধ করে।",
      e: "Enabling strict: true activates the strictest compiler family of checks, including noImplicitAny, strictNullChecks, strictFunctionTypes, and strictBindCallApply, preventing null dereferencing and untyped variables at compile-time.",
      tip: "ইন্টারভিউতে বলবে: 'প্রোডাকশন-গ্রেড এন্টারপ্রাইজ প্রজেক্টে strict: true রাখা বাধ্যতামূলক স্ট্যান্ডার্ড'।"
    },
    {
      lvl: "lvl1",
      q: "TypeScript Generics কী এবং এটি কোড রি-ইউজেবিলিটিতে কীভাবে সাহায্য করে?",
      m: "Generics হলো এমন একটি ফিচার যার মাধ্যমে ফাংশন, ইন্টারফেস বা ক্লাসে টাইপকে একটি ভ্যারিয়েবল বা প্যারামিটারের মতো পাস করা যায় (`<T>`)। অর্থাৎ কোনো নির্দিষ্ট হার্ডকোডেড টাইপ না দিয়ে টাইপ সেফটি বজায় রেখে বিভিন্ন ডেটা টাইপের সাথে একই কোড পুনর্ব্যবহার করা যায়। যেমন: এপিআই রেসপন্স র‍্যাপার বা অ্যারে ফিল্টার ইউটিলিটি।",
      b: "জেনেরিক্স টাইপস্ক্রিপ্টে টাইপকে প্যারামিটার হিসেবে ব্যবহারের সুযোগ দেয়। ফলে একটিমাত্র ফাংশন বা কম্পোনেন্ট দিয়ে টাইপ সেফটি অক্ষুণ্ণ রেখে বিভিন্ন ধরনের ডাটা টাইপের সাথে নিরাপদ কাজ করা যায়।",
      e: "Generics enable creating reusable components, functions, or interfaces that work over a variety of types while maintaining compile-time type safety. Type parameters (e.g. <T>) are supplied at invocation time.",
      code: "function wrapInArray<T>(item: T): T[] {\n  return [item];\n}\nconst nums = wrapInArray(10); // number[]\nconst strs = wrapInArray('NT'); // string[]"
    },
    {
      lvl: "lvl1",
      q: "TypeScript-এ `Optional Chaining (?.)` এবং `Nullish Coalescing (??)` অপারেটর কীভাবে কাজ করে?",
      m: "Optional Chaining (`obj?.user?.name`) চেক করে কোনো প্রপার্টি `null` বা `undefined` কিনা; যদি হয় তবে এরর না ছুড়ে শান্তভাবে `undefined` রিটার্ন করে। আর Nullish Coalescing (`a ?? b`) শুধুমাত্র তখনই ডানপাশের ফলব্যাক ভ্যালু `b` নেয় যদি বাঁপাশের মান `null` অথবা `undefined` হয়। সাধারণ লজিক্যাল অর (`a || b`) কিন্তু `0`, `\"\"`, বা `false` কেউ ফলসি ধরে ফলব্যাক নিয়ে নেয়, যা নিউমেরিক ডাটায় বাগ তৈরি করে।",
      b: "অপশনাল চেইনিং নাল পয়েন্টার এরর প্রতিরোধ করে নিরাপদভাবে নেস্টেড অবজেক্ট রিড করে। নালিশ কোলেসিং শুধুমাত্র নাল অথবা আনডিফাইন্ড হলেই ফলব্যাক মান দেয়, ফলে শূন্য (0) বা ফাঁকা স্ট্রিং নিরাপদে বজায় থাকে।",
      e: "Optional chaining (?.) safely short-circuits property lookups if an intermediate reference is nullish. Nullish coalescing (??) provides a fallback value strictly when the left-hand operand is null or undefined, preserving 0, false, and empty strings.",
      code: "const count = 0;\nconsole.log(count || 10); // 10 (Oops! 0 considered falsy)\nconsole.log(count ?? 10); // 0 (Correct!)"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "TypeScript-এর সবচেয়ে বহুল ব্যবহৃত Utility Types: `Partial`, `Pick`, `Omit`, `Record`, এবং `Readonly`-এর কাজ কী?",
      m: "(১) `Partial<T>`: সব প্রপার্টিকে অপশনাল (`?`) করে (যেমন প্যাচ বা আপডেট ফর্মে)। (২) `Pick<T, 'id' | 'name'>`: শুধুমাত্র নির্দিষ্ট প্রপার্টিগুলো বেছে নিয়ে নতুন টাইপ বানায়। (৩) `Omit<T, 'password'>`: নির্দিষ্ট প্রপার্টি বাদ দিয়ে বাকিগুলো রাখে। (৪) `Record<K, T>`: অবজেক্টের কী এবং ভ্যালুর নির্দিষ্ট টাইপ ডিফাইন করে (যেমন ডিকশনারি)। (৫) `Readonly<T>`: প্রপার্টিগুলোকে শুধু রিড-অনলি করে যাতে মিউটেট না করা যায়।",
      b: "ইউটিলিটি টাইপগুলো বিদ্যমান টাইপকে দ্রুত রূপান্তর করে: Partial সব প্রপার্টি অপশনাল করে, Pick নির্দিষ্ট প্রপার্টিগুলো গ্রহণ করে, Omit নির্দিষ্ট প্রপার্টিগুলো বাদ দেয়, Record কি ও ভ্যালু জোড়ার টাইপ নির্ধারণ করে এবং Readonly মান পরিবর্তন বন্ধ করে দেয়।",
      e: "TypeScript utility types transform existing types: Partial<T> marks all properties optional, Pick<T, K> extracts a subset of properties, Omit<T, K> drops specified properties, Record<K, T> types key-value maps, and Readonly<T> freezes properties.",
      code: "type UpdateUserDto = Partial<Omit<User, 'id' | 'createdAt'>>;\ntype CacheStore = Record<string, Product>;"
    },
    {
      lvl: "lvl2",
      q: "TypeScript-এ Discriminated Unions (Tagged Unions) কী এবং এটি জটিল স্টেট হ্যান্ডলিংয়ে কীভাবে সাহায্য করে?",
      m: "Discriminated Union হলো এমন একাধিক অবজেক্ট টাইপের ইউনিয়ন যাতে একটি কমন লিটারাল প্রপার্টি থাকে (যেমন `status` বা `type` ট্যাগ)। এর বড় সুবিধা হলো: যখন আমরা `switch(state.status)` বা `if` চেক করি, টাইপস্ক্রিপ্ট স্বয়ংক্রিয়ভাবে নিশ্চিত করে ওই ব্লকের ভেতরে কোন কোন প্রপার্টি এক্সিস্ট করে। ফলে ভুল স্টেট প্রপার্টি এক্সেস করার কোনো সুযোগ থাকে না।",
      b: "ডিসক্রিমিনেটেড ইউনিয়ন হলো একটি সাধারণ ট্যাগযুক্ত প্রপার্টি বিশিষ্ট অবজেক্টের সমন্বয়। এর মাধ্যমে সুইচ কেস বা কন্ডিশনাল চেকের সময় টাইপস্ক্রিপ্ট স্বয়ংক্রিয়ভাবে অবজেক্টের সঠিক গঠন যাচাই করে টাইপ সেফটি দেয়।",
      e: "A Discriminated Union combines types that share a common single-literal discriminant property (e.g. status: 'loading' | 'success' | 'error'). TypeScript uses this tag to exhaustively narrow down the exact shape of an object within conditionals.",
      code: "type AsyncState =\n  | { status: 'loading' }\n  | { status: 'success'; data: User[] }\n  | { status: 'error'; error: string };"
    },
    {
      lvl: "lvl2",
      q: "Type Narrowing কী এবং `typeof`, `instanceof`, এবং Custom Type Guard (`is`) কীভাবে কাজ করে?",
      m: "Type Narrowing হলো টাইপস্ক্রিপ্টের কম্পাইলারকে একটি ব্রড বা ওয়াইড টাইপ থেকে আরও স্পেসিফিক টাইপে নিশ্চয়তা দেওয়া। প্রিমটিভ ডেটার জন্য `typeof x === 'string'`, ক্লাসের জন্য `x instanceof Date` এবং জটিল অবজেক্ট বা ইন্টারফেসের জন্য কাস্টম টাইপ গার্ড ফাংশন যাতে রিটার্ন টাইপ হয় `item is Admin` ব্যবহার করা হয়।",
      b: "টাইপ ন্যারোয়িং কোনো সাধারণ টাইপকে যাচাই করে সুনির্দিষ্ট টাইপে সংকুচিত করে। কাস্টম টাইপ গার্ড ফাংশনে 'param is Type' রিটার্ন লিখে টাইপস্ক্রিপ্ট কম্পাইলারকে শতভাগ নিশ্চিত করা যায় যে ভ্যারিয়েবলটি কাঙ্ক্ষিত কাঠামোর।",
      e: "Type Narrowing refines a variable from a broader type to a specific type using conditional guards. Aside from typeof and instanceof, custom type guards use type predicates (e.g. `val is Order`) to inform the compiler after runtime checks.",
      code: "function isAxiosError(err: unknown): err is AxiosError {\n  return !!err && typeof err === 'object' && 'isAxiosError' in err;\n}"
    },
    {
      lvl: "lvl2",
      q: "TypeScript-এ `as const` (Const Assertions) কী এবং এটি অবজেক্ট বা অ্যারেতে কী পরিবর্তন আনে?",
      m: "`as const` যোগ করলে টাইপস্ক্রিপ্ট ওই অবজেক্ট বা অ্যারেকে জেনেরিক টাইপ (যেমন string বা number) না ভেবে হুবহু লিটারাল টাইপ (Literal Type) হিসেবে লক করে এবং প্রতিটি প্রপার্টিকে ডিপ `readonly` করে দেয়। যেমন `const roles = ['admin', 'manager'] as const;` করলে টাইপ হবে `readonly ['admin', 'manager']`, যার ফলে আমরা সহজেই `type Role = typeof roles[number]` দিয়ে ইউনিয়ন টাইপ বের করে নিতে পারি।",
      b: "as const কোনো ভ্যারিয়েবলের মানকে পরিবর্তনাতীত লিটারাল টাইপে রূপান্তর করে এবং এর অভ্যন্তরীণ মানগুলোকে রিড-অনলি হিসেবে ফ্রিজ করে। এটি এনামের চমৎকার বিকল্প হিসেবে ইউনিয়ন টাইপ তৈরি করতে ব্যবহৃত হয়।",
      e: "Const assertion (`as const`) tells the compiler to infer the narrowest literal type for expressions, rendering object properties deeply readonly and turning arrays into readonly tuples rather than mutable general types.",
      code: "const ROLES = ['SUPER_ADMIN', 'CASHIER', 'MANAGER'] as const;\ntype Role = typeof ROLES[number]; // 'SUPER_ADMIN' | 'CASHIER' | 'MANAGER'"
    },
    {
      lvl: "lvl2",
      q: "TypeScript-এ Type Assertion (`as Type`) এবং Type Casting-এর মধ্যে পার্থক্য কী এবং কখন এটি বিপদজনক?",
      m: "টাইপস্ক্রিপ্ট রানটাইমে কোনো কোড এক্সিকিউট করে না; তাই `as Type` কোনো আসল ডেটা কাস্টিং নয়, এটি কেবল কম্পাইলারকে জোর করে বলা যে 'আমি জানি এটার টাইপ কী, তুমি এরর দেওয়া বন্ধ করো'। এটি বিপদজনক কারণ যদি রানটাইমে অবজেক্টের স্ট্রাকচার ভিন্ন হয়, তাহলে কোড ব্রাউজারে ক্র্যাশ করবে অথচ বিল্ড টাইমে টাইপস্ক্রিপ্ট কোনো এরর ধরবে না। তাই `as` ব্যবহারের চেয়ে Zod দিয়ে রানটাইম ভ্যালিডেশন করা শতভাগ নিরাপদ।",
      b: "টাইপ অ্যাসার্শন (as) শুধুমাত্র কম্পাইলারকে নীরব করার একটি উপায়, এটি রানটাইমে আসল ডেটা পরিবর্তন বা যাচাই করে না। ভুল অ্যাসার্শনের কারণে রানটাইমে অপ্রত্যাশিত ক্র্যাশ হতে পারে, তাই Zod এর মতো স্কিমা ভ্যালিডেটর ব্যবহার করা শ্রেয়।",
      e: "Type assertion (`as Type`) is a compile-time override that forces the compiler to treat a value as a specified type without performing runtime conversion. It is dangerous if overused because runtime shape mismatches bypass compiler errors silently.",
      tip: "কখনোই অন্ধভাবে `as any` বা আন-ভ্যালিডেটেড `as Type` লিখবে না; ইন্টারভিউতে Zod ভ্যালিডেশনকে অগ্রাধিকার দেবে।"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "TypeScript Conditional Types এবং `infer` কিওয়ার্ড কীভাবে অ্যাডভান্সড মেটাপ্রোগ্রামিংয়ে কাজ করে?",
      m: "Conditional Types ত্রিমাত্রিক টার্নারি অপারেটরের মতো কাজ করে: `T extends U ? X : Y`। আর `infer` কিওয়ার্ডটি কন্ডিশনাল টাইপের ভেতর থেকে কোনো অভ্যন্তরীণ টাইপ ভ্যারিয়েবলকে নিজে থেকেই এক্সট্র্যাক্ট বা ডিডিউস করার সুযোগ দেয়। যেমন: কোনো ফাংশনের রিটার্ন টাইপ (`ReturnType<T>`) বা প্রমিজের ভেতরের রেজলভড টাইপ (`Awaited<T>`) বের করতে `infer` ব্যবহার করা হয়।",
      b: "কন্ডিশনাল টাইপ শর্ত অনুযায়ী ভিন্ন ভিন্ন টাইপ প্রদান করে। infer কিওয়ার্ড ব্যবহার করে আমরা কোনো বিদ্যমান ফাংশন বা প্রমিজের ভেতরের গভীর টাইপ এক্সট্র্যাক্ট করে নিয়ে আসতে পারি।",
      e: "Conditional Types choose between two types based on a relationship test (`T extends U ? X : Y`). The infer keyword introduces a type variable within the conditional clause to extract internal types dynamically, as seen in standard ReturnType<T> and Parameters<T> implementations.",
      code: "type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;\ntype Fn = () => { id: number };\ntype Result = MyReturnType<Fn>; // { id: number }"
    },
    {
      lvl: "lvl3",
      q: "TypeScript Mapped Types এবং Template Literal Types কীভাবে ডায়নামিক এপিআই ও ইভেন্ট হ্যান্ডলার টাইপ করতে ব্যবহৃত হয়?",
      m: "Mapped Types বিদ্যমান টাইপের প্রতিটা কি-র ওপর লুপ চালিয়ে নতুন টাইপ তৈরি করে (`[K in keyof T]`)। আর Template Literal Types স্ট্রিং কম্বিনেশন দিয়ে নতুন লিটারাল ইউনিয়ন তৈরি করে। যেমন: আমাদের যদি ইভেন্ট থাকে `'click' | 'hover'`, আমরা ব্যাকটিক দিয়ে নিমেষেই তৈরি করতে পারি `on${Capitalize<Event>}` যা `'onClick' | 'onHover'` টাইপ তৈরি করবে।",
      b: "ম্যাপড টাইপ অবজেক্টের প্রতিটি কি-র ওপর লুপ চালিয়ে রূপান্তর ঘটায়। টেমপ্লেট লিটারাল টাইপ স্ট্রিং ফরম্যাটিংয়ের সাহায্যে ডায়নামিক ইভেন্ট লিসেনার বা ইউআরএল পাথের জন্য স্বয়ংক্রিয় টাইপ তৈরি করতে পারে।",
      e: "Mapped Types iterate over keys using the index signature `[K in keyof T]`. Template Literal Types combine string literals with type unions to construct typed event handlers (e.g., `on${Capitalize<Event>}`) or typed route parameters dynamically.",
      code: "type Event = 'change' | 'submit';\ntype Handlers = { [K in Event as `on${Capitalize<K>}`]: () => void };\n// Result: { onChange: () => void; onSubmit: () => void }"
    },
    {
      lvl: "lvl3",
      q: "TypeScript-এ Covariance এবং Contravariance কী এবং ফাংশন প্যারামিটারে `strictFunctionTypes` কীভাবে কাজ করে?",
      m: "Covariance মানে হলো যদি টাইপ A সাবটাইপ B হয়, তবে তাদের কম্পোজিট টাইপও একই ডিরেকশনে আচরণ করে (যেমন রিটার্ন টাইপ)। Contravariance মানে এর উল্টো ডিরেকশনে আচরণ করা (ফাংশন প্যারামিটার)। `strictFunctionTypes: true` অন থাকলে টাইপস্ক্রিপ্ট ফাংশন আর্গুমেন্টে কনট্রাভ্যারিয়েন্ট চেকিং নিশ্চিত করে, ফলে সাব-ক্লাসের ফাংশনকে এমন কোনো প্যারামিটার পাস করতে দেয় না যা সুপার-ক্লাস হ্যান্ডেল করতে পারবে না।",
      b: "ফাংশনের রিটার্ন টাইপ কোভ্যারিয়েন্ট এবং প্যারামিটার টাইপ কনট্রাভ্যারিয়েন্ট আচরণ করে। strictFunctionTypes ফ্ল্যাগ চালু থাকলে ফাংশন প্যারামিটারে ভুল সাবটাইপ বা ইনভ্যালিড ডাটা পাস হওয়া বন্ধ করে নির্ভুল টাইপ সেফটি বজায় থাকে।",
      e: "Covariance preserves subtyping direction (e.g. return types), whereas contravariance reverses it (e.g. function arguments). Under strictFunctionTypes, method parameter types are checked contravariantly rather than bivariantly to prevent runtime parameter passing failures.",
      tip: "এটি একটি প্রিমিয়াম লেভেলের থিওরিটিকাল টাইপ-সিস্টেম প্রশ্ন যা আর্কিটেক্ট বা স্টাফ ইঞ্জিনিয়ার ইন্টারভিউতে জিজ্ঞাসা করা হয়।"
    },
    {
      lvl: "lvl3",
      q: "Exhaustiveness Checking কী এবং `never` টাইপ ব্যবহার করে সুইচ কেসে মিসিং স্টেট কীভাবে কম্পাইল টাইমে ধরা যায়?",
      m: "যখন আমরা কোনো Union State (যেমন অর্ডার স্ট্যাটাস) সুইচ কেসে হ্যান্ডেল করি, ভবিষ্যতে যদি নতুন কোনো স্ট্যাটাস যোগ করা হয়, তা হয়তো ডেভেলপার কোনো পেজে হ্যান্ডেল করতে ভুলে যেতে পারে। Exhaustiveness Checking-এ সুইচের `default` ব্লকে একটি ফাংশন রাখা হয় যা প্যারামিটার হিসেবে `never` নেয় (`assertNever(val)`। যদি কোনো কেস মিস হয়, টাইপস্ক্রিপ্ট কম্পাইল টাইমে এরর ছুড়ে বলবে যে এই মিসিং স্টেটটি never-এ অ্যাসাইন করা সম্ভব নয়।",
      b: "এক্সহস্টিভনেস চেকিং সুইচ কেসে সব সম্ভাব্য স্টেট কভার করা হয়েছে কিনা তা নিশ্চিত করে। ডিফল্ট কেসে never টাইপের একটি ফাংশন কল দিয়ে রাখলে কোনো নতুন স্টেট হ্যান্ডেল করতে ভুলে গেলে সাথে সাথে বিল্ড এরর দেখা যায়।",
      e: "Exhaustive checking ensures all variants of a union are handled. Assigning the unhandled value to a helper function accepting `never` in the default case forces a compiler error if a new union variant is added without being handled in the switch.",
      code: "function assertNever(x: never): never {\n  throw new Error(`Unhandled union case: ${x}`);\n}\nswitch (action.type) {\n  case 'A': break;\n  case 'B': break;\n  default: assertNever(action); // Compile error if new action added!\n}"
    },
    {
      lvl: "lvl3",
      q: "Branded Types (Nominal Typing) কী এবং সাধারণ Primitive ভ্যারিয়েবল যেমন `UserId` বনাম `OrderId` মিক্সড আপ হওয়া রোধে এটি কীভাবে সাহায্য করে?",
      m: "টাইপস্ক্রিপ্ট মূলত Structural Typing (Duck Typing) ব্যবহার করে; তাই দুটি `string` টাইপ থাকলে ভুল করে ইউজারের আইডি অর্ডারের আইডিতে পাস করলেও টাইপস্ক্রিপ্ট এরর ধরে না। Branded Types একটি ইউনিক ফিল্ড বা সিম্বল ট্যাগ যোগ করে (`__brand: 'UserId'`) একটি প্রিমিটিভ টাইপকে নামবাচক বা নমিনাল টাইপে রূপান্তর করে। এর ফলে দুটোই স্ট্রিং হওয়া সত্ত্বেও টাইপস্ক্রিপ্ট ভুল আইডি অ্যাসাইনমেন্ট ব্লক করে দেয়।",
      b: "ব্র্যান্ডেড টাইপ স্ট্রাকচারাল টাইপিংকে নমিনাল বা নামবাচক টাইপিংয়ে রূপান্তর করে। এর মাধ্যমে একাধিক স্ট্রিং আইডির মধ্যে অমিল তৈরি করে এক ধরনের আইডির জায়গায় অন্য আইডি ভুলে পাস হওয়া শতভাগ প্রতিরোধ করা যায়।",
      e: "TypeScript uses structural typing where identical shapes are interchangeable. Branded Types intersect primitives with a unique compile-time tag (e.g. string & { readonly __brand: unique symbol }) to simulate nominal typing and prevent accidentally passing an OrderId where a UserId is expected.",
      code: "type UserId = string & { readonly __brand: 'UserId' };\ntype OrderId = string & { readonly __brand: 'OrderId' };\nlet u: UserId = 'u123' as UserId;\nlet o: OrderId = u; // Error: Type UserId is not assignable to OrderId!"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "প্রজেক্টে একটি থার্ড-পার্টি লাইব্রেরি ইন্সটল করেছ যার কোনো `@types` ডিক্লারেশন ফাইল নেই এবং টাইপস্ক্রিপ্ট `Could not find a declaration file` এরর দিচ্ছে। কীভাবে সমাধান করবে?",
      m: "সমাধান: (১) প্রজেক্টের রুট বা `src/types/` ডিরেক্টরিতে একটি `global.d.ts` ফাইল তৈরি করব। (২) সেখানে `declare module 'library-name';` লিখে মডিউলটিকে অ্যাম্বিয়েন্ট টাইপ ডিক্লেয়ার করব। (৩) যদি লাইব্রেরির মেথডগুলোর স্ট্রাকচার আমাদের জানা থাকে, তবে তার ভেতরের এক্সপোর্ট করা ফাংশন ও অবজেক্টগুলোর নির্দিষ্ট ইন্টারফেস ডিক্লেয়ার করব। (৪) `tsconfig.json`-এর `include` বা `typeRoots`-এ সেই পাথ অ্যাড করব।",
      b: "লাইব্রেরির টাইপ ফাইল না থাকলে src/types ফোল্ডারে global.d.ts তৈরি করে declare module 'লাইব্রেরি-নাম' লিখে টাইপস্ক্রিপ্টকে জানাতে হবে। প্রয়োজনে ভেতরের ফাংশনগুলোর কাস্টম ইন্টারফেস লিখে টাইপ সেফটি দেওয়া যায়।",
      e: "Resolve missing type declarations by authoring an ambient declaration file (`types/global.d.ts`) containing `declare module 'untyped-pkg';` with typed interface stubs, and ensuring the directory is listed under include or typeRoots in tsconfig.json.",
      code: "// src/types/declarations.d.ts:\ndeclare module 'legacy-barcode-scanner' {\n  export function scan(): Promise<string>;\n}"
    },
    {
      lvl: "situation",
      q: "একটি জেনেরিক API ক্লায়েন্ট ফাংশন লিখছ যা যে কোনো এন্ডপয়েন্ট থেকে ডাটা আনে, কিন্তু রিটার্ন টাইপ ঠিকমতো ইনফারিং হচ্ছে না এবং সবসময় `unknown` আসছে। কীভাবে জেনেরিক টাইপ এনফোর্স করবে?",
      m: "ফাংশনে জেনেরিক টাইপ প্যারামিটার `<T>` ডিক্লেয়ার করতে হবে এবং প্রমিজের রিটার্ন টাইপ হিসেবে `Promise<T>` এনফোর্স করতে হবে। কল করার সময় ডেভেলপার ডেটার টাইপ পাস করতে পারবে (`apiClient<User[]>('/users')`), আর যদি Zod স্কিমা পাস করা যায়, তবে Zod এর `z.infer<typeof schema>` দিয়ে স্বয়ংক্রিয়ভাবে রিটার্ন টাইপ ইনফার করা সম্ভব।",
      b: "এপিআই ফাংশনে জেনেরিক <T> যুক্ত করে Promise<T> রিটার্ন টাইপ দিতে হবে। আরও আধুনিক সমাধানে Zod স্কিমা গ্রহণ করে স্কিমার ইনফার করা টাইপ স্বয়ংক্রিয়ভাবে রিটার্ন টাইপ হিসেবে প্রদান করা যায়।",
      e: "Expose a generic type parameter `<T>` returning `Promise<T>`. For ultimate resilience, accept a Zod schema parameter and infer the return type dynamically via `z.infer<TSchema>` ensuring verified runtime data matches compile-time typing.",
      code: "async function apiFetch<T>(url: string): Promise<T> {\n  const res = await fetch(url);\n  return res.json() as Promise<T>;\n}"
    },
    {
      lvl: "situation",
      q: "একটি বড় লিগ্যাসি জাভাস্ক্রিপ্ট প্রজেক্টকে টাইপস্ক্রিপ্টে মাইগ্রেট করতে হবে, কিন্তু এক রাতে সব ফাইলে টাইপ দেওয়া অসম্ভব। ধাপে ধাপে মাইগ্রেশন স্ট্র্যাটেজি কী হবে?",
      m: "মাইগ্রেশন স্টেপস: (১) `tsconfig.json`-এ `\"allowJs\": true`, `\"checkJs\": false`, এবং প্রাথমিক পর্যায়ে `\"noImplicitAny\": false` রাখব যাতে既存 `.js` ফাইলগুলো পাশাপাশি রান হতে পারে। (২) কোর ইউটিলিটি, শেয়ার্ড ডাটাবেজ মডেল এবং ইন্টারফেস ফাইলগুলো দিয়ে মাইগ্রেশন শুরু করব (`.ts` এ কনভার্ট)। (৩) নতুন যে কোডই লেখা হবে তা অবশ্যই স্ট্রিক্ট টাইপস্ক্রিপ্টে লিখতে হবে। (৪) পর্যায়ক্রমে প্রতি স্প্রিন্টে ফাইলগুলো রিফ্যাক্টর করে শেষে `checkJs: true` এবং `strict: true` অন করব।",
      b: "ধাপে ধাপে মাইগ্রেশনের জন্য tsconfig ফাইলে allowJs চালু রাখতে হবে। প্রথমে কমন টাইপস এবং ইউটিলিটি ফাইলগুলো টাইপস্ক্রিপ্টে কনভার্ট করতে হবে। নতুন সব ফিচার শুধুমাত্র .ts বা .tsx ফাইলে লিখতে হবে এবং ধীরে ধীরে লিগ্যাসি কোড রিফ্যাক্টর করতে হবে।",
      e: "Gradual migration strategy: enable allowJs: true in tsconfig.json while temporarily disabling noImplicitAny. Convert shared models, schemas, and utility functions first. Enforce pure TypeScript on all newly written code, incrementally transitioning legacy files over sprints until strict: true is achieved.",
      tip: "কখনোই 'বিগ ব্যাং' একবারে সব ফাইল কনভার্ট করতে যাবে না; স্টেপ বাই স্টেপ allowJs দিয়ে মাইগ্রেশন প্র্যাকটিকাল ইঞ্জিনিয়ারিং প্রদর্শন করে।"
    },
    {
      lvl: "situation",
      q: "একটি অবজেক্টের কী (Key) ডায়নামিকালি অ্যাক্সেস করতে গিয়ে টাইপস্ক্রিপ্ট এরর দিচ্ছে: `Element implicitly has an 'any' type because expression of type 'string' can't be used to index type`। কীভাবে সমাধান করবে?",
      m: "কারণ জাভাস্ক্রিপ্টে যে কোনো সাধারণ `string` টাইপ ওই অবজেক্টের নির্দিষ্ট কি-র বাইরেও হতে পারে। সমাধান: (১) কি-র টাইপকে ন্যারো করে `keyof typeof obj` কাস্ট করতে হবে (`const key = 'name' as keyof typeof obj`)। (২) অবজেক্ট ডিক্লারেশনের সময় `Record<string, unknown>` বা ইনডেক্স সিগনেচার `[key: string]: any` ব্যবহার করা যায়।",
      b: "সাধারণ স্ট্রিং টাইপ অবজেক্টের নির্দিষ্ট কি নাও হতে পারে। সমাধান হলো keyof typeof দিয়ে কি-র টাইপ কঠোরভাবে নির্দিষ্ট করা অথবা অবজেক্টে ইনডেক্স সিগনেচার ব্যবহার করা।",
      e: "Index access requires keys to be members of `keyof typeof obj`. Type the lookup string as `keyof typeof obj`, or add an index signature `[key: string]: ValueType` to the target object interface.",
      code: "const colors = { red: '#f00', blue: '#00f' };\nfunction getColor(key: string) {\n  return colors[key as keyof typeof colors];\n}"
    },
    {
      lvl: "situation",
      q: "একটি কম্পোনেন্ট প্রপসে এমন একটি টাইপ পাঠাতে চাও যা হয় `{ type: 'CREDIT'; cardNo: string }` হবে অথবা `{ type: 'CASH'; tenderAmount: number }` হবে, কিন্তু দুটো একসাথে থাকা চলবে না। কীভাবে টাইপ ডিফাইন করবে?",
      m: "আমরা একটি 'Discriminated Union' টাইপ ব্যবহার করব। কখনোই সবগুলো ফিল্ডকে একটি মাত্র অবজেক্টে অপশনাল (`?`) করে রাখা যাবে না, কারণ তাহলে ইউজার ক্রেডিট কার্ড ছাড়া কার্ড নম্বর বা ক্যাশ ছাড়া কার্ড নাম্বার মিক্স করে দিতে পারে। ডিসক্রিমিনেটেড ইউনিয়ন করলে টাইপস্ক্রিপ্ট শতভাগ নিশ্চিত করবে যে `type === 'CREDIT'` হলে শুধু কার্ড নম্বরই প্রযোজ্য এবং ক্যাশ হলে টেন্ডার অ্যামাউন্ট প্রযোজ্য।",
      b: "সব প্রপার্টি অপশনাল না রেখে একটি ডিসক্রিমিনেটেড ইউনিয়ন তৈরি করতে হবে। এতে ক্রেডিট সিলেক্ট করলে কার্ড নম্বর ফিল্ড বাধ্যতামূলক হবে এবং ক্যাশ সিলেক্ট করলে টেন্ডার অ্যামাউন্ট বাধ্যতামূলক হবে, যা ভুল কম্বিনেশন প্রতিরোধ করে।",
      e: "Define a Discriminated Union type rather than an omnibus interface with optional properties. This strictly forbids invalid cross-variant state configurations.",
      code: "type PaymentMethod =\n  | { type: 'CREDIT'; cardNo: string; expiry: string }\n  | { type: 'CASH'; tenderAmount: number };"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর ব্যাকএন্ড থেকে আসা ডায়নামিক প্রোডাক্ট ডাটা এবং স্টক ট্রানজাকশনকে রানটাইমে ভ্যালিডেট করার সাথে সাথে টাইপস্ক্রিপ্ট টাইপ কীভাবে Zod দিয়ে সিঙ্ক করেছিলে?",
      m: "আমরা 'Single Source of Truth' প্যাটার্ন ব্যবহার করেছি। কোনো ডুপ্লিকেট টাইপস্ক্রিপ্ট ইন্টারফেস না লিখে আমরা Zod স্কিমা তৈরি করেছি (`ProductSchema = z.object({...})`) এবং `z.infer<typeof ProductSchema>` ব্যবহার করে স্বয়ংক্রিয়ভাবে টাইপস্ক্রিপ্ট টাইপ তৈরি করেছি। এর ফলে এপিআই রেসপন্স যখন ক্লায়েন্টে আসে, স্কিমা রানটাইমে ডাটা ভ্যালিডেট করে এবং কম্পাইল টাইমে টাইপস্ক্রিপ্ট শতভাগ নিখুঁত টাইপ সেফটি দেয়—কোনো ডুপ্লিকেট কোড লিখতে হয় না।",
      b: "দোকানি অ্যাপে আমরা Zod স্কিমা দিয়ে রানটাইম যাচাইকরণ এবং টাইপস্ক্রিপ্ট টাইপ জেনারেশন সিঙ্ক করেছি। z.infer ব্যবহার করে স্কিমা থেকেই টাইপ এক্সট্র্যাক্ট করায় কোনো ডেটা অমিল বা ডুপ্লিকেশন ছাড়াই সম্পূর্ণ টাইপ সেফটি বজায় ছিল।",
      e: "In Dokani POS, we adhered to the Single Source of Truth principle by pairing Zod runtime schemas with `z.infer<typeof Schema>` to generate compile-time TypeScript types automatically, eliminating drift between validation schemas and static types.",
      code: "import { z } from 'zod';\nexport const ProductSchema = z.object({\n  id: z.string().uuid(),\n  name: z.string().min(2),\n  price: z.number().positive(),\n  stock: z.number().int()\n});\nexport type Product = z.infer<typeof ProductSchema>;"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ মাল্টি-টেন্যান্ট রোল বেসড সিস্টেমে (`SUPER_ADMIN`, `STORE_OWNER`, `CASHIER`) পারমিশন টাইপ সেফটি কীভাবে আর্কিটেক্ট করেছিলে?",
      m: "আমরা একটি ম্যাট্রিক্স টাইপ আর্কিটেকচার তৈরি করেছি: `type Permission = 'sales:create' | 'inventory:edit' | 'reports:view' | 'settings:update';`। এবং `type RolePermissions = Record<Role, readonly Permission[]>` দিয়ে রোল ম্যাপিং তৈরি করেছি। এর ফলে রিঅ্যাক্ট কম্পোনেন্টে `<HasPermission permission='inventory:edit'>` কল করার সময় কোনো টাইপো হওয়ার সুযোগ থাকে না—ভুল পারমিশন নাম লিখলে কম্পাইলার সাথে সাথে লাল এরর ধরে ফেলে।",
      b: "আমরা পারমিশনের জন্য স্ট্রিক্ট ইউনিয়ন টাইপ এবং রেকর্ডের সাহায্যে রোল পারমিশন ম্যাট্রিক্স তৈরি করেছি। এর ফলে কোডে পারমিশন যাচাইয়ের সময় কোনো ভুল স্ট্রিং বা টাইপো লিখলে টাইপস্ক্রিপ্ট সাথে সাথে কম্পাইল এরর প্রদর্শন করে।",
      e: "We created a strongly-typed RBAC matrix in Dokani using string literal union permissions and a typed `Record<Role, readonly Permission[]>` map. UI permission guards verify permissions with full IDE autocomplete and zero typo risk.",
      tip: "টাইপস্ক্রিপ্ট দিয়ে পারমিশন স্ট্রিং টাইপ-সেফ করা এন্টারপ্রাইজ সিস্টেমের একটি চমৎকার উদাহরণ।"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে ভিডিও লেকচার, কুইজ এবং অ্যাসাইনমেন্টের মতো ভিন্ন ভিন্ন কোর্স কনটেন্টের জন্য পলিমরফিক রিঅ্যাক্ট কম্পোনেন্ট টাইপ কীভাবে ডিজাইন করেছিলে?",
      m: "আমরা Discriminated Union এবং Generic Props আর্কিটেকচার ব্যবহার করেছি: প্রতিটি কনটেন্ট আইটেমের একটি `type: 'VIDEO' | 'QUIZ' | 'ASSIGNMENT'` ট্যাগ ছিল। এরপর একটি কমন `<ContentRenderer item={content} />` কম্পোনেন্টে যখন আইটেমের টাইপ চেক করা হতো, টাইপস্ক্রিপ্ট সাথে সাথে নিশ্চিত করত যে কুইজ হলে `questions` প্রপার্টি আছে এবং ভিডিও হলে `videoDuration` ও `streamUrl` প্রপার্টি আছে।",
      b: "পিটিটিএবিডি কোর্স উপাদানের জন্য পলিমরফিক টাইপিং ব্যবহার করা হয়েছিল। কন্টেন্টের ক্যাটাগরি অনুসারে টাইপস্ক্রিপ্ট অটোমেটিকভাবে ভিডিও, কুইজ বা অ্যাসাইনমেন্টের নির্দিষ্ট প্রপার্টিগুলোকে নিশ্চিত করত।",
      e: "For PTTABD's heterogeneous course modules, we modeled course contents using a polymorphic discriminated union. A generic renderer component narrowed props based on the discriminatory `type` discriminator.",
      code: "type ContentItem =\n  | { type: 'VIDEO'; url: string; duration: number }\n  | { type: 'QUIZ'; questions: Question[]; passMarks: number };"
    },
    {
      lvl: "realworld",
      q: "Next.js 15 App Router-এ সার্ভার অ্যাকশন এবং ক্লায়েন্ট কম্পোনেন্টের মধ্যে টাইপ সেফটি এনফোর্স করতে কী লাইব্রেরি বা প্যাটার্ন ব্যবহার করেছিলে?",
      m: "আমরা `next-safe-action` লাইব্রেরি এবং Zod ব্যবহার করেছি। এটি সার্ভার অ্যাকশনকে ইনপুট স্কিমা দিয়ে র্যাপ করে এবং ক্লায়েন্টে একটি টাইপড হুক `useAction(action)` প্রদান করে যাতে `execute(data)`, `isPending`, এবং সার্ভার থেকে রিটার্ন হওয়া `result.data` শতভাগ টাইপ-সেফ থাকে। কোনো ম্যানুয়াল `any` বা টাইপ কাস্টিং প্রয়োজন হয় না।",
      b: "নেক্সট জেএস অ্যাপ রাউটারে আমরা next-safe-action এবং Zod ব্যবহার করেছি। এটি সার্ভার অ্যাকশনে কঠোর ইনপুট ভ্যালিডেশন এবং ক্লায়েন্ট সাইডে এক্সিকিউশনের সময় স্বয়ংক্রিয় টাইপ সেফটি নিশ্চিত করে।",
      e: "We integrated next-safe-action with Zod in Next.js. This enforces schema validation on Server Action payloads on the server while exposing fully typed `useAction` hooks on the client for end-to-end type safety.",
      code: "export const addCustomerAction = actionClient\n  .schema(CustomerInputSchema)\n  .action(async ({ parsedInput: input }) => {\n    return await db.customer.create({ data: input });\n  });"
    },
    {
      lvl: "realworld",
      q: "টাইপস্ক্রিপ্ট কম্পাইলেশন স্পিড এবং প্রোডাকশন বিল্ড পারফরম্যান্স অপটিমাইজ করতে `tsconfig.json`-এ কোন কোন সেটিংস ফাইন-টিউন করেছিলে?",
      m: "বড় প্রজেক্টে টাইপস্ক্রিপ্ট স্লো বিল্ড রোধে আমরা: (১) `\"skipLibCheck\": true` অন করেছি যাতে `node_modules`-এর লাখ লাখ টাইপ ফাইল বারবার স্ক্যান না করে, (২) `\"incremental\": true` সক্রিয় করেছি যাতে শুধু পরিবর্তিত ফাইলের ক্যাশড কম্পাইলেশন হয়, (৩) বিল্ড টুল হিসেবে টাইপস্ক্রিপ্টের ভারী `tsc` এমিটারের বদলে SWC / esbuild ব্যবহার করেছি যা মাত্র কয়েক মিলিসেকেন্ডে ট্রান্সপাইল করে, আর টাইপ চেকিং আলাদা `tsc --noEmit` দিয়ে CI/CD পাইপলাইনে চালিয়েছি।",
      b: "টাইপস্ক্রিপ্ট বিল্ডের গতি বাড়াতে আমরা skipLibCheck ও incremental ক্যাশিং অন করেছি। ট্রান্সপাইলিংয়ের জন্য দ্রুতগতির SWC বা esbuild ব্যবহার করে শুধুমাত্র টাইপ চেকিংয়ের জন্য tsc --noEmit কমান্ড সিআই/সিডি পাইপলাইনে রাখা হয়েছিল।",
      e: "Optimized TypeScript build speed by setting skipLibCheck: true and incremental: true in tsconfig.json. In production builds, SWC/esbuild handled blistering-fast transpilation, while static type-checking was isolated to non-blocking CI runs via `tsc --noEmit`.",
      tip: "কখনোই প্রোডাকশন বিল্ডে ট্রান্সপাইলেশনের জন্য tsc চালাবে না; SWC বা esbuild ব্যবহারের কথা বলা আধুনিক ইঞ্জিনিয়ারিং মাইন্ডসেট প্রকাশ করে।"
    }
  ]
};
