// Topic 7: Form Handling & Zod Validation (25 Questions: 5 lvl1, 5 lvl2, 5 lvl3, 5 situation, 5 realworld)
module.exports = {
  id: "forms-validation-zod",
  name: "Form Handling & Zod Validation",
  desc: "React Hook Form, Controlled vs Uncontrolled Inputs, Zod Schema Validation, Complex Dynamic Fields, Multi-step Forms",
  items: [
    // --- LEVEL 1 (5 Questions) ---
    {
      lvl: "lvl1",
      q: "Controlled Components এবং Uncontrolled Components-এর মধ্যে পার্থক্য কী এবং পারফরম্যান্সে কে এগিয়ে?",
      m: "Controlled Component-এ ইনপুট ফিল্ডের মান রিঅ্যাক্ট স্টেট (`useState`) দ্বারা সরাসরি নিয়ন্ত্রিত হয় এবং প্রতি কিস্ট্রোকে কম্পোনেন্ট রি-রেন্ডার হয়। আর Uncontrolled Component-এ ইনপুটের মান সরাসরি ব্রাউজার DOM নিজে ধরে রাখে এবং শুধুমাত্র সাবমিটের সময় `useRef` বা FormData দিয়ে মান রিড করা হয়। পারফরম্যান্সে Uncontrolled Component অনেক এগিয়ে কারণ এটি টাইপ করার সময় কোনো রি-রেন্ডার করায় না। React Hook Form ইন্টারনালি Uncontrolled পদ্ধতি ব্যবহার করে সর্বোচ্চ স্পিড দেয়।",
      b: "কন্ট্রোল্ড কম্পোনেন্টে প্রতি কিস্ট্রোকে রিঅ্যাক্ট স্টেট আপডেট ও রি-রেন্ডার হয়। আনকন্ট্রোল্ড কম্পোনেন্টে ডম নিজে ইনপুটের মান বজায় রাখে এবং রি-রেন্ডার ছাড়া সরাসরি রিফারেন্সের মাধ্যমে মান সংগ্রহ করা হয়, যা পারফরম্যান্সে অনেক দ্রুতগতির।",
      e: "Controlled components bind input values to React state, re-rendering on every keystroke. Uncontrolled components let the DOM manage input state, accessing values via refs or FormData. Uncontrolled components are significantly faster as they eliminate re-renders, which React Hook Form exploits.",
      code: "// Controlled:\n<input value={val} onChange={e => setVal(e.target.value)} />\n// Uncontrolled:\n<input ref={inputRef} />"
    },
    {
      lvl: "lvl1",
      q: "React Hook Form কেন সাধারণ ফর্ম লাইব্রেরির (যেমন Formik) চেয়ে দ্রুত এবং আধুনিক স্ট্যান্ডার্ড?",
      m: "React Hook Form ইনপুটগুলোতে আনকন্ট্রোল্ড রেফারেন্স (`ref`) ব্যবহার করে। Formik প্রতি ক্যারেক্টার টাইপিংয়ে পুরো ফর্মকে বারবার রি-রেন্ডার করত, যার ফলে ৫০টি ফিল্ডের বড় ফর্মে দৃশ্যমান ল্যাগ হতো। React Hook Form শুধুমাত্র যখন কোনো নির্দিষ্ট ফিল্ডে ভ্যালিডেশন এরর আসে কেবল তখনই আইসোলেটেডভাবে সেই এরর মেসেজটি রেন্ডার করে, পুরো ফর্ম কখনোই রি-রেন্ডার হয় না। সাথে এর বান্ডেল সাইজ অত্যন্ত ছোট (~৮KB)।",
      b: "রিঅ্যাক্ট হুক ফর্ম আনকন্ট্রোল্ড ডম রেফারেন্স ব্যবহার করায় টাইপিংয়ের সময় অপ্রয়োজনীয় রি-রেন্ডার এড়ায়। এটি পুরো ফর্ম রি-রেন্ডার না করে কেবল আক্রান্ত ফিল্ডকে আপডেট করে, যার ফলে বড় ফর্মেও কোনো ল্যাগ ছাড়াই তাৎক্ষণিক প্রতিক্রিয়া পাওয়া যায়।",
      e: "React Hook Form relies on uncontrolled inputs via ref subscriptions, eliminating full-form re-renders on keystrokes that plagued Formik. It isolates re-renders strictly to fields exhibiting validation changes with a minimal ~8KB bundle size.",
      tip: "ইন্টারভিউতে বলবে: 'React Hook Form isolates re-renders at the individual field level using uncontrolled inputs'."
    },
    {
      lvl: "lvl1",
      q: "Zod কী এবং এটি কীভাবে রানটাইম ডাটা ভ্যালিডেশন নিশ্চিত করে?",
      m: "Zod হলো একটি TypeScript-first স্কিমা ডিক্লারেশন এবং ভ্যালিডেশন লাইব্রেরি। টাইপস্ক্রিপ্ট টাইপগুলো বিল্ড টাইমে কম্পাইল হয়ে গায়েব হয়ে যায় এবং রানটাইমে কোনো ডেটা গার্ড করতে পারে না। Zod রানটাইমে ইনকামিং ডাটা (ফর্ম ইনপুট বা ব্যাকএন্ড এপিআই রেসপন্স) চেক করে দেখে যে সেটি ডিক্লেয়ার করা স্কিমার নিয়মের সাথে মিলছে কি না। না মিললে স্পষ্ট এরর অবজেক্ট দেয় এবং মিললে ক্লিন টাইপড ডাটা পার্স করে রিটার্ন করে।",
      b: "Zod রানটাইম ডাটা যাচাইকরণ লাইব্রেরি। যেহেতু টাইপস্ক্রিপ্ট শুধুমাত্র বিল্ডের সময় কাজ করে, Zod রানটাইমে ব্যবহারকারীর দেওয়া ডাটা বা এপিআই রেসপন্স নির্ভুলভাবে স্কিমা অনুযায়ী যাচাই করে নিরাপদ রাখে।",
      e: "Zod is a TypeScript-first schema declaration and runtime validation library. While TypeScript checks types statically at compile time, Zod parses and validates untrusted runtime inputs (forms, API payloads), throwing descriptive errors on schema violations.",
      code: "import { z } from 'zod';\nconst UserSchema = z.object({\n  email: z.string().email('Invalid email address'),\n  age: z.number().min(18, 'Must be at least 18')\n});"
    },
    {
      lvl: "lvl1",
      q: "React Hook Form-এর সাথে Zod কীভাবে `@hookform/resolvers/zod` দিয়ে ইন্টিগ্রেট করা হয়?",
      m: "আমরা `useForm` হুকের ভেতরে `resolver: zodResolver(MySchema)` পাস করি। এর ফলে ইউজার যখন ফর্ম সাবমিট করে বা টাইপ করে, React Hook Form ব্যাকগ্রাউন্ডে Zod স্কিমা দিয়ে ইনপুট ডাটা রানটাইমে পার্স করে। কোনো ফিল্ড অমান্য হলে Zod-এর এরর মেসেজ সরাসরি `formState.errors` অবজেক্টে পপুলেট হয়ে যায় যা দিয়ে সুন্দর লাল এরর দেখানো যায়।",
      b: "zodResolver ইন্টিগ্রেশনের মাধ্যমে রিঅ্যাক্ট হুক ফর্ম স্বয়ংক্রিয়ভাবে Zod স্কিমা দিয়ে ফর্ম ডাটা যাচাই করে। কোনো ভুল থাকলে formState.errors এ মেসেজ পাঠিয়ে ইউজার ইন্টারফেসে নিখুঁত এরর প্রদর্শনে সাহায্য করে।",
      e: "Integrate React Hook Form with Zod via `zodResolver(Schema)` passed to `useForm`. This wires up automatic schema validation on submit or blur, populating `formState.errors` with strongly typed validation messages.",
      code: "import { useForm } from 'react-hook-form';\nimport { zodResolver } from '@hookform/resolvers/zod';\nconst { register, handleSubmit, formState: { errors } } = useForm({\n  resolver: zodResolver(LoginSchema)\n});"
    },
    {
      lvl: "lvl1",
      q: "ফর্ম সাবমিশনের সময় `e.preventDefault()` কেন ব্যবহার করা আবশ্যক?",
      m: "HTML ফর্ম বাই-ডিফল্ট সাবমিট হলে ব্রাউজার পুরো পেজ রিফ্রেশ করে এবং অ্যাকশন ইউআরএলে একটি নতুন HTTP GET/POST রিকোয়েস্ট পাঠায়। সিঙ্গেল পেজ অ্যাপ্লিকেশনে (SPA) পুরো পেজ রিফ্রেশ হলে অ্যাপের স্টেট ও মেমোরি ডেটা হারিয়ে যায়। `e.preventDefault()` ব্রাউজারের এই ডিফল্ট সাবমিশন ও পেজ রিলোড বন্ধ করে দেয়, ফলে আমরা জাভাস্ক্রিপ্ট দিয়ে শান্তভাবে অ্যাসিঙ্ক এপিআই কল চালাতে পারি।",
      b: "ডিফল্ট ব্রাউজার ফর্ম সাবমিট হলে পেজ রিলোড হয়ে যায়, ফলে অ্যাপের মেমোরি ও স্টেট মুছে যায়। e.preventDefault() এই রিলোড বন্ধ করে দিয়ে ব্যাকগ্রাউন্ডে অ্যাসিনক্রোনাস এপিআই রিকোয়েস্ট চালানোর সুযোগ দেয়।",
      e: "Default HTML form submissions trigger browser page reloads. In Single Page Applications, `e.preventDefault()` halts default reload mechanics, enabling JavaScript to asynchronously handle payloads via fetch or Server Actions.",
      code: "const onSubmit = (e: React.FormEvent) => {\n  e.preventDefault();\n  // Handle async API call\n};"
    },

    // --- LEVEL 2 (5 Questions) ---
    {
      lvl: "lvl2",
      q: "Zod-এ `refine` এবং `superRefine` ব্যবহার করে কাস্টম ক্রস-ফিল্ড ভ্যালিডেশন (যেমন পাসওয়ার্ড কনফার্মেশন) কীভাবে করবে?",
      m: "যখন কোনো ভ্যালিডেশন দুটি ভিন্ন ফিল্ডের ওপর নির্ভর করে (যেমন `password` এবং `confirmPassword` সমান হতে হবে), তখন অবজেক্ট স্কিমার শেষে `.refine((data) => data.password === data.confirmPassword, { message: 'Passwords must match', path: ['confirmPassword'] })` ব্যবহার করা হয়। আর একাধিক জটিল ফিল্ড লেভেলে কাস্টম ডায়নামিক এরর অ্যাসাইন করতে `superRefine((data, ctx) => ...)` ব্যবহার করা হয়।",
      b: "পাসওয়ার্ড ও কনফার্ম পাসওয়ার্ড মেলানোর মতো ক্রস-ফিল্ড যাচাইয়ের জন্য Zod এর refine মেথড ব্যবহার করা হয়। path নির্ধারণ করে দিলে সরাসরি নির্দিষ্ট কনফার্ম পাসওয়ার্ড ফিল্ডের নিচে কাস্টম এরর মেসেজ প্রদর্শিত হয়।",
      e: "Cross-field validations (e.g. password confirmation) are declared using Zod's `.refine()` on the parent schema object. Target the specific input field by designating `{ path: ['confirmPassword'] }` so the error attaches directly to the appropriate input UI.",
      code: "const RegisterSchema = z.object({\n  password: z.string().min(8),\n  confirmPassword: z.string()\n}).refine(d => d.password === d.confirmPassword, {\n  message: 'Passwords do not match',\n  path: ['confirmPassword']\n});"
    },
    {
      lvl: "lvl2",
      q: "React Hook Form-এ Dynamic Arrays বা একাধিক রো যোগ/বিয়োগ করার জন্য `useFieldArray` কীভাবে কাজ করে?",
      m: "ইনভয়েসে একাধিক প্রোডাক্ট রো বা অর্ডারে আইটেম লিস্ট ডায়নামিকালি অ্যাড ও রিমুভ করার জন্য `useFieldArray` ব্যবহার করা হয়। এটি আমাদের `{ fields, append, remove, move }` মেথড দেয়। গুরুত্বপূর্ণ বিষয় হলো: প্রতিটি রো রেন্ডার করার সময় অবশ্যই `key={field.id}` দিতে হবে (অ্যারে ইনডেক্স নয়!), কারণ React Hook Form ইন্টারনালি প্রতিটি রো-কে একটি ইন্টারনাল ইউনিক আইডি দিয়ে ট্র্যাক করে যাতে ফিল্ড রিমুভ বা সর্ট করলেও স্টেট নষ্ট না হয়।",
      b: "ইনভয়েসে ডায়নামিক রো বা আইটেম যোগ-বিয়োগের জন্য useFieldArray ব্যবহৃত হয়। এটি append ও remove মেথড দেয়। রো রেন্ডারের সময় key হিসেবে field.id দেওয়া বাধ্যতামূলক যাতে অভ্যন্তরীণ রেফারেন্স নিখুঁত থাকে।",
      e: "Dynamic sub-forms (e.g. invoice line items) are powered by `useFieldArray`. It supplies helper methods like append(), remove(), and swap(). Developers must assign `key={field.id}` rather than map indices to preserve uncontrolled input identity.",
      code: "const { fields, append, remove } = useFieldArray({ control, name: 'items' });\n// <button onClick={() => append({ name: '', qty: 1 })}>Add Item</button>"
    },
    {
      lvl: "lvl2",
      q: "React Hook Form-এ কাস্টম UI লাইব্রেরি কম্পোনেন্ট (যেমন Radix UI Select, DatePicker) ইন্টিগ্রেট করতে `<Controller>` কম্পোনেন্ট কীভাবে ব্যবহৃত হয়?",
      m: "অনেক থার্ড-পার্টি লাইব্রেরি (যেমন Radix UI, Ant Design, Material UI Select) সরাসরি নেটিভ HTML `<input>` নয় এবং তাদের নিজস্ব কাস্টম ড্রপডাউন স্টেট থাকে যাতে সরাসরি `register()` এর র ref পাস করা যায় না। `<Controller>` একটি র্যাপার হিসেবে কাজ করে যা তার `render={({ field }) => ...}` প্রপের মাধ্যমে `field.onChange`, `field.onBlur`, এবং `field.value` প্রোভাইড করে কাস্টম কম্পোনেন্টকে React Hook Form-এর সাথে টাইটলি বাইন্ড করে।",
      b: "কাস্টম ড্রপডাউন বা ডেটপিকারের মতো নন-নেটিভ উপাদানে সরাসরি ref কাজ না করায় Controller কম্পোনেন্ট ব্যবহার করা হয়। এটি render প্রপের সাহায্যে কাস্টম কম্পোনেন্টকে ফর্মের ইন্টারনাল স্টেটের সাথে সমন্বয় করে।",
      e: "Third-party components lacking standard ref interfaces (e.g., Radix Select, date pickers) cannot use direct register(). The `<Controller>` component bridges this via its `render` prop, injecting controlled handlers (`field.onChange`, `field.value`) cleanly.",
      code: "<Controller\n  control={control}\n  name='category'\n  render={({ field }) => (\n    <Select value={field.value} onValueChange={field.onChange} />\n  )}\n/>"
    },
    {
      lvl: "lvl2",
      q: "Zod Schema Transformations (`coerce`, `transform`) কীভাবে ব্যবহার করে ইনপুট টাইপ সেনিটাইজ করা যায়?",
      m: "HTML ইনপুট সবসময় ভ্যালু স্ট্রিং (`\"123\"`) হিসেবে রিটার্ন করে, এমনকি `type='number'` দিলেও। Zod-এ `z.coerce.number()` ব্যবহার করলে স্ট্রিং মান স্বয়ংক্রিয়ভাবে আসল জাভাস্ক্রিপ্ট সংখ্যায় রূপান্তর হয়। আবার `.transform(val => val.trim().toLowerCase())` ব্যবহার করে ইউজারের ইনপুট থেকে অতিরিক্ত স্পেস বাদ দিয়ে লোয়ারকেস করে ডাটাবেজে পাঠানোর আগে স্যানিটাইজ করা যায়।",
      b: "এইচটিএমএল ইনপুট সাধারণত স্ট্রিং মান দেয়। Zod এর coerce.number স্বয়ংক্রিয়ভাবে স্ট্রিংটিকে সংখ্যায় রূপান্তর করে এবং transform মেথড দিয়ে টেক্সট ট্রিম ও লোয়ারকেস করে নিখুঁত স্যানিটাইজেশন সম্পন্ন করা যায়।",
      e: "HTML inputs default to string values. `z.coerce.number()` coerces input strings to actual numbers automatically. Chaining `.transform()` allows stripping whitespace, trimming casing, or sanitizing strings directly within the validation pipeline.",
      code: "const PriceSchema = z.object({\n  price: z.coerce.number().positive(),\n  code: z.string().transform(s => s.trim().toUpperCase())\n});"
    },
    {
      lvl: "lvl2",
      q: "React Hook Form-এ `formState` ডি-স্ট্রাকচার করার সময় পারফরম্যান্স অপটিমাইজেশন নিয়ম কী?",
      m: "React Hook Form-এর `formState` একটি Proxy অবজেক্ট। আপনি যদি `const { isSubmitting, isDirty, isValid } = formState` ডি-স্ট্রাকচার করেন, তবে শুধুমাত্র যে ফিল্ডগুলো ডি-স্ট্রাকচার করেছেন সেগুলোর জন্যই রিঅ্যাক্ট সাবস্ক্রাইব করবে। কিন্তু যদি পুরো `formState` অবজেক্ট সরাসরি কোনো হুকে পাস করেন বা আন-ডি-স্ট্রাকচার্ড রাখেন, তবে প্রতিটি অভ্যন্তরীণ স্টেট পরিবর্তনে কম্পোনেন্ট অপ্রয়োজনীয়ভাবে রি-রেন্ডার হতে পারে। তাই শুধু প্রয়োজনীয় ফিল্ডগুলোই সরাসরি ডি-স্ট্রাকচার করা উচিত।",
      b: "formState প্রক্সি অবজেক্ট হিসেবে কাজ করে। শুধুমাত্র প্রয়োজনীয় ফিল্ডগুলো ডি-স্ট্রাকচার করলে রিঅ্যাক্ট হুক ফর্ম কেবল সেই ইভেন্টগুলোর জন্যই কম্পোনেন্ট আপডেট করে, ফলে অপ্রয়োজনীয় রেন্ডারিং সম্পূর্ণ বন্ধ থাকে।",
      e: "React Hook Form's `formState` is wrapped in a Proxy that tracks subscribed properties. Destructure strictly the flags you need (e.g. `{ errors, isSubmitting }`) to instruct the engine to only trigger component renders when those specific flags change.",
      tip: "কখনোই পুরো formState অবজেক্টকে একবারে পাস করবে না; সবসময় নির্দিষ্ট প্রপার্টি ডি-স্ট্রাকচার করবে।"
    },

    // --- LEVEL 3 (5 Questions) ---
    {
      lvl: "lvl3",
      q: "মাল্টি-স্টেপ উইজার্ড ফর্মে (Multi-Step Form) স্টেট লস ছাড়া ধাপে ধাপে Zod ভ্যালিডেশন কীভাবে আর্কিটেক্ট করবে?",
      m: "সমাধান: (১) পুরো ফর্মের জন্য একটি প্যারেন্ট Zod স্কিমা থাকবে, যাকে ধাপে ধাপে ভাগ করার জন্য `Step1Schema`, `Step2Schema` ইত্যাদি সাব-স্কিমায় স্প্লিট করব। (২) পরবর্তী স্টেপে যাওয়ার আগে React Hook Form-এর `trigger(['field1', 'field2'])` কল করে শুধুমাত্র বর্তমান স্টেপের ফিল্ডগুলো ভ্যালিডেট করব। (৩) পুরো ফর্মের স্টেট প্যারেন্ট Zustand স্টোরে বা `useForm` এর প্যারেন্ট কম্পোনেন্টে ধরে রাখব যাতে স্টেপ ১ থেকে স্টেপ ২-এ গেলে ডেটা অক্ষত থাকে।",
      b: "মাল্টি-স্টেপ ফর্মে প্রতিটি ধাপের জন্য পৃথক Zod স্কিমা তৈরি করে trigger() মেথডের মাধ্যমে বর্তমান ধাপের ফিল্ডগুলো যাচাই করে পরবর্তী ধাপে যেতে দেওয়া হয়। কেন্দ্রীয় স্টেট বা জাস্ট্যান্ডের সাহায্যে পেজগুলোর ডাটা ধরে রাখা হয়।",
      e: "Decompose a multi-step form into segmented sub-schemas merged via Zod. When stepping forward, execute `trigger(['currentFields'])` to strictly validate the active step's inputs while preserving accumulated values in a parent Zustand store or form context.",
      code: "const handleNext = async () => {\n  const isValid = await trigger(['fullName', 'email']);\n  if (isValid) setStep(s => s + 1);\n};"
    },
    {
      lvl: "lvl3",
      q: "অ্যাসিঙ্ক Zod ভ্যালিডেশন (`refine(async () => ...)`): ইউজারনেম বা ইমেইল ইউনিক কি না তা ডেটাবেজ চেক করার সময় রিকোয়েস্ট ফ্লাডিং কীভাবে রোধ করবে?",
      m: "যদি ইনপুটের প্রতি কিস্ট্রোকে অ্যাসিঙ্ক Zod স্কিমা রান করে তবে ডাটাবেজে হাজার হাজার কোয়েরি গিয়ে সার্ভার ডাউন হবে। সমাধান: (১) React Hook Form-এর মোড `mode: 'onBlur'` রাখব যাতে ইউজার টাইপিং শেষ করে ইনপুট ফিল্ড থেকে বের হলে কেবল একবার ভ্যালিডেশন চলে। (২) কাস্টম ডিবউন্সড এপিআই চেক করব যাতে ৩০০ মিলিসেকেন্ড টাইপিং পজ না হওয়া পর্যন্ত ডাটাবেজে কোনো কল না যায়। (৩) অলরেডি চেক করা রেজাল্ট ইন-মেমোরি সেটে ক্যাশ রাখব।",
      b: "ডাটাবেজে অতিরিক্ত রিকোয়েস্ট পাঠানো ঠেকাতে ফর্মের মোড onBlur করে দিতে হবে যাতে ইনপুট ছাড়ার পর যাচাই হয়। টাইপিংয়ের সময় ৩০০ মিলিসেকেন্ড ডিবউন্সিং দিয়ে এপিআই কল নিয়ন্ত্রণ করতে হবে।",
      e: "Throttle database uniqueness checks by setting `mode: 'onBlur'` in useForm. Couple the async Zod refine validator with an in-memory cache and a 300ms debounce function to eradicate database connection exhaustion.",
      code: "const UsernameSchema = z.string().refine(async (name) => {\n  const available = await checkUsernameApi(name);\n  return available;\n}, 'Username already taken');"
    },
    {
      lvl: "lvl3",
      q: "Dynamic Conditional Schemas: ব্যবহারকারী ড্রপডাউনে যে অপশন সিলেক্ট করবে তার ওপর ভিত্তি করে Zod স্কিমা ও ফর্ম ফিল্ড কীভাবে ডায়নামিকালি পরিবর্তন করবে?",
      m: "Zod-এর `discriminatedUnion` অথবা কন্ডিশনাল চেকিং ব্যবহার করব। যেমন পেমেন্ট টাইপ যদি `'BKASH'` হয় তবে `bkashNumber` ও `trxId` ফিল্ড বাধ্যতামূলক হবে; আর যদি `'CASH'` হয় তবে কোনো ট্রানজাকশন আইডি ফিল্ড থাকবে না। React Hook Form-এ `useWatch({ name: 'paymentType' })` দিয়ে সিলেক্টেড টাইপ ওয়াচ করব এবং কন্ডিশন অনুযায়ী UI-তে সংশ্লিষ্ট ইনপুট ফিল্ডগুলো রেন্ডার করব।",
      b: "ড্রপডাউন পছন্দের ওপর ভিত্তি করে ফর্ম ফিল্ড পরিবর্তন করতে Zod এর discriminatedUnion এবং রিঅ্যাক্ট হুক ফর্মের useWatch ব্যবহার করা হয়। বিকাশ সিলেক্ট করলে ট্রানজাকশন আইডি আবশ্যক হবে এবং ক্যাশ সিলেক্ট করলে তা বাদ থাকবে।",
      e: "Model conditional form fields using Zod's `discriminatedUnion`. On the UI side, subscribe to the controlling selector with `useWatch({ name: 'type' })` to conditionally mount dependent input groups while keeping validation tightly coupled.",
      code: "const FormSchema = z.discriminatedUnion('method', [\n  z.object({ method: z.literal('BKASH'), trxId: z.string().min(8) }),\n  z.object({ method: z.literal('CASH'), receivedAmount: z.number() })\n]);"
    },
    {
      lvl: "lvl3",
      q: "React Hook Form-এ ১০০+ ফিল্ড বিশিষ্ট এন্টারপ্রাইজ ফর্মে কীভাবে Field-Level Subscriptions নিশ্চিত করে রেন্ডার সাইকেল অপটিমাইজ করবে?",
      m: "কখনোই পুরো ফর্ম স্টেট রিড করার জন্য `watch()` প্যারামিটার ছাড়া কল করা যাবে না (কারণ এটি পুরো ফর্মকে রি-রেন্ডার করায়)। সমাধান: (১) শুধুমাত্র নির্দিষ্ট ফিল্ডের জন্য `useWatch({ name: 'targetField' })` ব্যবহার করব। (২) প্রতিটি ফিল্ড গ্রুপকে আলাদা মেমোইজড চাইল্ড কম্পোনেন্টে স্প্লিট করব। (৩) `formState.dirtyFields` এবং `formState.touchedFields` ব্যবহার করে শুধুমাত্র স্পর্শ করা ফিল্ডগুলো প্রসেস করব।",
      b: "শত শত ফিল্ডের ফর্মে সাধারণ watch() কল পরিহার করে useWatch হুকের সাহায্যে শুধুমাত্র নির্দিষ্ট ফিল্ডের পরিবর্তন ট্র্যাক করতে হবে। ফিল্ডগুলোকে মেমোইজড কম্পোনেন্টে ভাগ করে দিলে পারফরম্যান্স অপটিমাইজড থাকে।",
      e: "Avoid calling parameter-less `watch()` which registers a global subscription. Instead, use localized `useWatch({ name: 'field' })` within isolated child components, ensuring re-render boundaries stay strictly isolated to the dependent DOM subtree.",
      tip: "ইন্টারভিউতে 'useWatch vs watch()' এর পারফরম্যান্স পার্থক্য তুলে ধরা সিনিয়র ফ্রন্টএন্ড ইঞ্জিনিয়ারের সিগনেচার দক্ষতা।"
    },
    {
      lvl: "lvl3",
      q: "Server-side Validation Error Mapping: ব্যাকএন্ড থেকে আসা ফিল্ড-লেভেল এরর (যেমন: `{ errors: { email: 'Already registered' } }`) কীভাবে স্বয়ংক্রিয়ভাবে ফর্মের সংশ্লিষ্ট ফিল্ডে সেট করবে?",
      m: "আমরা React Hook Form-এর `setError` মেথড ব্যবহার করব। ব্যাকএন্ড এপিআই যদি 422 বা 400 এররে ফিল্ড-ম্যাপ পাঠায়, আমরা সেই অবজেক্টের ওপর লুপ চালিয়ে `setError(fieldName as any, { type: 'server', message: errMsg })` কল করব। সাথে `setFocus(fieldName)` কল করে স্বয়ংক্রিয়ভাবে প্রথম ভুল ফিল্ডটিতে ব্রাউজার কার্সর ফোকাস করে দেব যাতে ইউজার সাথে সাথে কারেকশন করতে পারে।",
      b: "ব্যাকএন্ডের এরর অবজেক্টের ওপর লুপ চালিয়ে রিঅ্যাক্ট হুক ফর্মের setError মেথড দিয়ে সংশ্লিষ্ট ফিল্ডে এরর মেসেজ সেট করা হয়। setFocus এর মাধ্যমে স্বয়ংক্রিয়ভাবে কার্সর এরর হওয়া ফিল্ডে নিয়ে যাওয়া যায়।",
      e: "Map backend API 422 error dictionaries directly into React Hook Form via `setError(fieldName, { type: 'server', message })`. Pair this with `setFocus(firstErrorField)` to provide seamless accessibility and instant user correction.",
      code: "const onSubmit = async (data: FormValues) => {\n  const res = await api.post('/register', data);\n  if (res.error) {\n    Object.entries(res.error.fields).forEach(([field, msg]) => {\n      setError(field as any, { type: 'server', message: msg as string });\n    });\n  }\n};"
    },

    // --- SITUATION (5 Questions) ---
    {
      lvl: "situation",
      q: "ইউজার একটি বিশাল ফর্ম ফিলাপ করার পর ভুল করে ব্রাউজার রিফ্রেশ বা ব্যাক বাটন চাপলে তার সমস্ত টাইপ করা ডেটা হারিয়ে যায়। কীভাবে এটি অটোমেটিক ড্রাফট ও প্রটেক্ট করবে?",
      m: "সমাধান: (১) আমরা `useForm` এর সাথে `useWatch` ব্যবহার করে একটি কাস্টম ইফেক্টে ড্রাফট ডাটাকে লোকালস্টোরেজে ডিবউন্সড আকারে সেভ করব। (২) ফর্ম মাউন্ট হওয়ার সময় `defaultValues` হিসেবে লোকালস্টোরেজ থেকে ডাটা লোড করব। (৩) `window.addEventListener('beforeunload')` লিসেনার দিয়ে যদি `formState.isDirty` সত্য হয়, তবে ব্রাউজারে একটি 'Changes you made may not be saved' ডায়ালগ দেখাব। সফল সাবমিটের পর ড্রাফট ক্লিয়ার করে দেব।",
      b: "ড্রাফট ডাটা বাঁচাতে লোকালস্টোরেজে ডিবউন্সড অটো-সেভ রাখতে হবে। isDirty ফ্ল্যাগ সত্য থাকলে beforeunload ইভেন্টের সাহায্যে ব্যবহারকারী পেজ ছাড়ার আগে সতর্কবার্তা প্রদর্শন নিশ্চিত করতে হবে।",
      e: "Implement auto-saving drafts to localStorage via a debounced watcher, loading them into defaultValues on mount. Guard accidental navigation by listening to `beforeunload` when `formState.isDirty` is true.",
      code: "useEffect(() => {\n  const handleBeforeUnload = (e: BeforeUnloadEvent) => {\n    if (isDirty) e.preventDefault();\n  };\n  window.addEventListener('beforeunload', handleBeforeUnload);\n  return () => window.removeEventListener('beforeunload', handleBeforeUnload);\n}, [isDirty]);"
    },
    {
      lvl: "situation",
      q: "ব্যবহারকারী সাবমিট বাটনে দ্রুত ৩-৪ বার ডাবল-ক্লিক করায় ব্যাকএন্ডে ৩টি ডুপ্লিকেট অ্যাকাউন্ট বা অর্ডার তৈরি হয়ে গেছে। ফ্রন্টএন্ড ফর্ম হ্যান্ডলিংয়ে কীভাবে এটি রোধ করবে?",
      m: "সমাধান: (১) `formState.isSubmitting` সত্য থাকলে সাবমিট বাটনকে সাথে সাথে `disabled` এবং লোডিং স্পিনার দেখাব (`<button disabled={isSubmitting}>`)। (২) সাবমিট ফাংশনে একটি রিঅ্যাক্ট রেফারেন্স `isSubmittingRef.current` দিয়ে সিঙ্ক্রোনাস গার্ড দেব। (৩) ব্যাকএন্ডে একটি ইউনিক Idempotency Key (যেমন UUID) হেডার হিসেবে পাঠাব যাতে প্রথম রিকোয়েস্ট প্রসেস হওয়ার পর পরবর্তী ডুপ্লিকেট রিকোয়েস্টগুলো কোনো পরিবর্তন ছাড়াই ইগনোর হয়।",
      b: "ডাবল ক্লিক প্রতিরোধে isSubmitting ফ্ল্যাগ চলাকালীন সাবমিট বাটনটি disabled রাখতে হবে। পাশাপাশি ব্যাকএন্ডে আইডেমপোটেন্সি কি পাঠিয়ে একাধিক ডুপ্লিকেট রেকর্ড তৈরি হওয়া শতভাগ বন্ধ করতে হবে।",
      e: "Disable the submit button when `formState.isSubmitting` is true. Additionally, generate a unique Idempotency Key on initial submit passed via headers to ensure subsequent clicks are safely ignored by the backend.",
      code: "<button type='submit' disabled={isSubmitting} className='btn-primary'>\n  {isSubmitting ? 'Processing...' : 'Submit Order'}\n</button>"
    },
    {
      lvl: "situation",
      q: "একটি ডায়নামিক ইনভয়েস ফর্মে ইউজার যখন কোনো প্রোডাক্ট রো ডিলিট করে, তখন ক্যালকুলেশন সামারি স্বয়ংক্রিয়ভাবে রিক্যালকুলেট হতে ভুলে যায় বা পুরানো টোটাল দেখায়। সমাধান কী?",
      m: "কারণ টোটাল ক্যালকুলেশন লজিকটি রিঅ্যাক্ট স্টেটে আলাদাভাবে রাখা হয়েছিল যা ফিল্ড রিমুভ হওয়ার সাথে সিঙ্ক হয়নি। সমাধান: কখনোই টোটাল অ্যামাউন্ট আলাদা `useState`-এ রাখবেন না; এটি একটি 'Derived State'। আমরা `useWatch({ control, name: 'items' })` দিয়ে লাইভ আইটেম অ্যারেটি শুনব এবং `useMemo` দিয়ে সরাসরি `items.reduce(...)` করে লাইভ টোটাল হিসাব করব। ফিল্ড অ্যাড বা ডিলিট হওয়া মাত্র টোটাল মিলি-সেকেন্ডে স্বয়ংক্রিয়ভাবে আপডেট হয়ে যাবে।",
      b: "মোট টাকা আলাদা স্টেটে না রেখে ড্রাইভড স্টেট হিসেবে গণনা করতে হবে। useWatch দিয়ে আইটেম অ্যারের পরিবর্তনের ওপর useMemo লুপ চালিয়ে লাইভ টোটাল বের করলে রো যোগ বা মুছে ফেলার সাথে সাথে সঠিক হিসাব পাওয়া যায়।",
      e: "Avoid keeping calculated invoice totals in independent state. Treat totals as Derived State by computing them via useMemo over items extracted directly from `useWatch({ name: 'items' })`. Mutations to the array instantly re-evaluate the sum.",
      code: "const items = useWatch({ control, name: 'items' }) || [];\nconst grandTotal = useMemo(() => items.reduce((s, i) => s + (i.price * i.qty || 0), 0), [items]);"
    },
    {
      lvl: "situation",
      q: "মোবাইল ভিউতে বড় ফর্ম স্ক্রল করার সময় ইউজার সাবমিট দিলে ফর্ম সাবমিট হয় না, কিন্তু কোনো এরর মেসেজও চোখে পড়ে না কারণ ভুল ফিল্ডটি স্ক্রিনের অনেক উপরে লুকানো। কীভাবে সমাধান করবে?",
      m: "React Hook Form-এর `handleSubmit` এর সেকেন্ড প্যারামিটার হিসেবে একটি `onError` কলব্যাক পাস করা যায় (`handleSubmit(onSuccess, onError)`। যখন কোনো ভ্যালিডেশন এরর হবে, আমরা প্রথম এরর ফিল্ডের এলিমেন্টটি খুঁজে বের করব এবং `element.scrollIntoView({ behavior: 'smooth', block: 'center' })` কল করব ও ইনপুটে ফোকাস দেব। এছাড়া React Hook Form-এর ডিফল্ট অপশন `shouldFocusError: true` নিশ্চিত করব।",
      b: "ভুল ফিল্ড স্ক্রিনে খুঁজে পেতে shouldFocusError: true অন রাখতে হবে অথবা onError কলব্যাকে প্রথম এরর ফিল্ডের কাছে scrollIntoView দিয়ে স্মুথ স্ক্রলিং করিয়ে ফোকাস দিতে হবে।",
      e: "Ensure `shouldFocusError: true` is configured in useForm, or capture errors inside handleSubmit's onError handler and scroll the first invalid field smoothly into the viewport center via `element.scrollIntoView({ behavior: 'smooth' })`.",
      code: "const onError = (errors) => {\n  const firstKey = Object.keys(errors)[0];\n  const el = document.querySelector(`[name=\"${firstKey}\"]`);\n  el?.scrollIntoView({ behavior: 'smooth', block: 'center' });\n};"
    },
    {
      lvl: "situation",
      q: "ব্যবহারকারী একটি ফাইলে ১০MB-র বেশি বড় ইমেজ আপলোড করলে ক্লায়েন্ট সাইডেই ইনস্ট্যান্ট Zod ভ্যালিডেশন কীভাবে আটকাবে সার্ভারে পাঠানোর আগেই?",
      m: "আমরা Zod স্কিমায় কাস্টম ফাইল ভ্যালিডেশন লিখব: `z.instanceof(File)` দিয়ে চেক করব। এরপর `.refine(f => f.size <= 5 * 1024 * 1024, 'File size must be under 5MB')` এবং `.refine(f => ['image/jpeg', 'image/png', 'image/webp'].includes(f.type), 'Only JPEG, PNG, and WebP are allowed')` লাগাব। ফলে ইউজার ড্রপডাউন বা ফাইল পিকারে ভুল ফাইল সিলেক্ট করা মাত্রই স্ক্রিনে তাৎক্ষণিক লাল এরর মেসেজ আসবে।",
      b: "ক্লায়েন্ট সাইডেই ফাইল আটকানোর জন্য Zod এর refine মেথডে ফাইলের সাইজ ৫ মেগাবাইট এবং টাইপ জেপিইজি বা পিএনজি কিনা তা নিশ্চিত করতে হবে। এতে ভুল ফাইল সার্ভারে যাওয়ার আগেই আটকে যায়।",
      e: "Validate file objects client-side in Zod using `z.instanceof(File)` combined with `.refine()` rules testing `file.size` against byte thresholds and checking `file.type` against allowed MIME types.",
      code: "const AvatarSchema = z.object({\n  file: z.instanceof(File)\n    .refine(f => f.size <= 5 * 1024 * 1024, 'Max 5MB')\n    .refine(f => ['image/png', 'image/jpeg'].includes(f.type), 'Only PNG/JPEG')\n});"
    },

    // --- REALWORLD (5 Questions) ---
    {
      lvl: "realworld",
      q: "Dokani POS-এর দ্রুতগতির সেলস ইনভয়েস এন্ট্রিতে কীবোর্ড শর্টকাট (Enter চাপলে পরবর্তী ফিল্ডে অটো-ফোকাস) React Hook Form-এ কীভাবে ইমপ্লিমেন্ট করেছিলে?",
      m: "ক্যাশ কাউন্টারে মাউস দিয়ে ক্লিকে সময় নষ্ট হয়। আমরা একটি কাস্টম কীবোর্ড নেভিগেশন হুক বানিয়েছিলাম: প্রতিটি ইনপুটে `onKeyDown` লিসেনারে ইউজার 'Enter' চাপলে ইভেন্ট প্রিভেন্ট করে পরবর্তী ইনপুটের `ref`-এ স্বয়ংক্রিয়ভাবে `.focus()` কল করে (যেমন: বারকোড -> পরিমাণ -> ডিসকাউন্ট -> পে বাটন)। আর ডিসকাউন্ট ফিল্ডে এন্টার চাপলে সরাসরি ক্যাশ পেমেন্ট ডায়ালগ পপআপ ওপেন হতো।",
      b: "দোকানি ক্যাশ কাউন্টারে দ্রুত কাজের জন্য এন্টার চাপলে পরবর্তী ফিল্ডে ফোকাস যাওয়ার কীবোর্ড নেভিগেশন তৈরি করা হয়েছিল। এর ফলে ক্যাশিয়ার মাউস ছাড়া শুধুমাত্র কীবোর্ড দিয়ে চোখের পলকে বিল সম্পন্ন করতে পেরেছে।",
      e: "In Dokani POS, keyboard-only cashier ergonomics were achieved by intercepting Enter key events to advance `.focus()` sequentially down the input chain (Barcode -> Quantity -> Discount -> Tender), culminating in automatic checkout modal launch.",
      tip: "ক্যাশ কাউন্টারের জন্য মাউসলেস কীবোর্ড নেভিগেশন অত্যন্ত বাস্তব ও প্রশংসনীয় একটি ফিচার।"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ কাস্টমার বাকি বা লেজার ফর্মে বাংলাদেশি মোবাইল নম্বর (+8801...) ও এনআইডি (NID) ভ্যালিডেশন Zod স্কিমায় কীভাবে কঠোরভাবে নিশ্চিত করেছিলে?",
      m: "আমরা বাংলাদেশি রেগুলার এক্সপ্রেশন সমৃদ্ধ Zod স্কিমা লিখেছি: ফোন নম্বরের জন্য `z.string().regex(/^(?:\\+?88|0088)?01[3-9]\\d{8}$/, 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন')`। আর জাতীয় পরিচয়পত্রের জন্য ১০ ডিজিট (স্মার্ট কার্ড) অথবা ১৩/১৭ ডিজিটের লিগ্যাসি এনআইডি নম্বর চেক করার জন্য কাস্টম রিজেক্স ও লাহন অ্যালগরিদম ভ্যালিডেশন ব্যবহার করেছি।",
      b: "বাংলাদেশি ফোন নম্বর যাচাইয়ে আমরা 013 থেকে 019 পর্যন্ত ১১ ডিজিটের সুনির্দিষ্ট রিজেক্স এবং স্মার্ট এনআইডি যাচাইয়ের জন্য ১০ বা ১৭ ডিজিটের কাস্টম Zod স্কিমা তৈরি করে নির্ভুল তথ্য সংগ্রহ নিশ্চিত করেছি।",
      e: "Enforced strict Bangladeshi customer onboarding rules using specialized Zod regex patterns: validating 11-digit mobile numbers matching operators `01[3-9]` with optional +88 prefixes, and validating 10-digit Smart NID or 17-digit legacy national IDs.",
      code: "export const BdPhoneSchema = z.string().regex(\n  /^(?:\\+?88|0088)?01[3-9]\\d{8}$/,\n  'সঠিক বাংলাদেশি মোবাইল নম্বর প্রদান করুন'\n);"
    },
    {
      lvl: "realworld",
      q: "PTTABD প্ল্যাটফর্মে শিক্ষকের কোর্স ক্রিয়েশন ফর্মে ড্র্যাগ-অ্যান্ড-ড্রপ লেকচার সাজানো এবং মডিউল নেস্টিং কীভাবে React Hook Form-এ অপটিমাইজ করেছিলে?",
      m: "কোর্সের ভেতর চ্যাপ্টার এবং চ্যাপ্টারের ভেতর লেকচার—এটি একটি 'Nested Field Array' সমস্যা। আমরা `@hello-pangea/dnd` (বা dnd-kit) এর সাথে React Hook Form-এর নেস্টেড `useFieldArray` ইন্টিগ্রেট করেছি। ড্র্যাগ অ্যান্ড ড্রপ শেষ হলে `move(sourceIndex, destinationIndex)` কল করা হতো। পুরো ফর্মকে রি-রেন্ডার না করে শুধুমাত্র পরিবর্তিত মডিউল অংশের ইনডেক্স আপডেট করে স্মুথ ৬০ FPS ড্র্যাগিং নিশ্চিত করা হয়েছিল।",
      b: "পিটিটিএবিডি কোর্স তৈরিতে নেস্টেড useFieldArray এবং ড্র্যাগ-অ্যান্ড-ড্রপ লাইব্রেরি সমন্বয় করে চ্যাপ্টার ও লেকচারের ক্রম পরিবর্তন পরিচালনা করা হয়েছিল। move মেথড ব্যবহারের ফলে সম্পূর্ণ ফর্ম অক্ষত রেখে দ্রুততম সময়ে ইন্ডেক্সিং সম্পন্ন হতো।",
      e: "Handled deeply nested chapters and video lectures in PTTABD by pairing dnd-kit with nested `useFieldArray` instances. Calling `move()` reordered array items cleanly without re-rendering the outer layout shell.",
      code: "const { fields: chapters, move: moveChapter } = useFieldArray({ control, name: 'chapters' });"
    },
    {
      lvl: "realworld",
      q: "Dokani POS-এ একই ফর্মে হাজার হাজার ভ্যারিয়েন্ট বিশিষ্ট পণ্যের বাল্ক এক্সেল/CSV ইমপোর্ট ভ্যালিডেশন কীভাবে Zod দিয়ে হ্যান্ডেল করেছিলে?",
      m: "ব্যবহারকারী যখন এক্সেলে ১০০০ প্রোডাক্টের তালিকা আপলোড করে, ব্রাউজারে `PapaParse` দিয়ে CSV-কে JSON অবজেক্টের অ্যারেতে কনভার্ট করি। এরপর `z.array(ProductSchema).safeParse(records)` দিয়ে ব্যাচ ভ্যালিডেশন চালাই। Zod-এর `error.issues` থেকে প্রতিটি রো নম্বরের সাথে ভুলের বর্ণনা (যেমন: 'Row 14: Invalid price', 'Row 89: Duplicate SKU') স্ক্রিনে একটি সুন্দর প্রিভিউ টেবিলে তুলে ধরি, যাতে ইউজার ফিক্স করে তবেই আপলোড সম্পন্ন করতে পারে।",
      b: "বাল্ক সিএসভি আপলোডে PapaParse দিয়ে ডাটা রূপান্তর করে Zod এর z.array().safeParse চালানো হতো। কোনো ত্রুটি থাকলে রো নম্বরসহ নির্দিষ্ট ভুলের তালিকা স্ক্রিনে টেবিল আকারে তুলে ধরে ভুল তথ্য ডাটাবেজে যাওয়া প্রতিরোধ করা হয়েছিল।",
      e: "Processed 1,000+ item Excel imports in Dokani by converting CSV rows via PapaParse into JSON, evaluating records concurrently with `z.array(ProductSchema).safeParse()`. Formatted Zod issue paths into a human-readable grid identifying exact erroneous line numbers.",
      tip: "ইন্টারভিউতে 'Bulk CSV validation with PapaParse and Zod safeParse' বলার অভিজ্ঞতা ব্যাকএন্ড ও ফ্রন্টএন্ড উভয়ের গভীরতা তুলে ধরে।"
    },
    {
      lvl: "realworld",
      q: "React Hook Form এবং Zod ব্যবহারের ফলে প্রজেক্টের ফর্ম মেইনটেনিবিলিটি ও কোড রিডাকশনে কী বাস্তব ইমপ্যাক্ট পড়েছিল?",
      m: "আমাদের কোডবেজে ফর্ম সংক্রান্ত বয়লারপ্লেট কোড প্রায় ৬০% কমে গিয়েছিল! আগে প্রতিটি ইনপুটের জন্য আলাদা `useState`, `errorState`, `handleChange` এবং ম্যানুয়াল `if/else` ভ্যালিডেশন লিখতে হতো যা প্রতি ফর্মে ৩০০+ লাইন হয়ে যেত। Zod স্কিমা ব্যবহারের পর টাইপস্ক্রিপ্ট টাইপ, ফ্রন্টএন্ড ফর্ম ভ্যালিডেশন এবং ব্যাকএন্ড API কন্ট্রোলার ভ্যালিডেশন—সবকিছু একটি মাত্র সেন্ট্রালাইজড স্কিমা থেকে পরিচালিত হয়েছে। ফলে বাগ সংখ্যা নাটকীয়ভাবে কমে প্রোডাকশন রিলিজ অনেক দ্রুত হয়েছে।",
      b: "রিঅ্যাক্ট হুক ফর্ম এবং Zod ব্যবহারে কোডের আকার ৬০% কমেছিল। ম্যানুয়াল স্টেট ও ভ্যালিডেশন লেখার বদলে একটিমাত্র কেন্দ্রীয় স্কিমা দিয়ে ফ্রন্টএন্ড ও ব্যাকএন্ড উভয় স্থান পরিচালিত হওয়ায় বাগ হ্রাস পেয়ে উন্নয়ন গতিশীল হয়েছিল।",
      e: "Adopting React Hook Form and Zod slashed form boilerplate by 60%. Replacing manual state hooks with single-source-of-truth Zod schemas harmonized client form validations and server-side API guards under identical contracts.",
      tip: "বিজনেস এবং প্রোডাক্টিভিটি ইমপ্যাক্ট (যেমন ৬০% বয়লারপ্লেট হ্রাস) উল্লেখ করা সিনিয়র ইঞ্জিনিয়ারের নেতৃত্ব প্রকাশ করে।"
    }
  ]
};
